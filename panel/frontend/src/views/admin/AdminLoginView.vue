<template>
  <div class="min-h-screen w-full bg-primary-1/30 flex items-center justify-center p-4 font-sans select-none" dir="rtl">
    <div class="w-full max-w-md bg-white-100 rounded-3xl border border-primary-8 p-8 flex flex-col gap-6 shadow-2xl text-right">
      <!-- Brand Logo & Header -->
      <div class="flex flex-col items-center text-center gap-2">
        <div class="w-14 h-14 rounded-2xl bg-primary-100 text-white-100 flex items-center justify-center shadow-md">
          <Icon icon="solar:shield-keyhole-bold-duotone" class="w-8 h-8 text-white-100" />
        </div>
        <h1 class="text-base sm:text-lg font-black text-primary-100 mt-2">
          ورود به پنل مدیریت ارشد حسابرو وان
        </h1>
        <p class="text-xs text-primary-60">
          دسترسی اختصاصی راهبران سامانه و کارشناسان پشتیبانی
        </p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="p-3.5 bg-error-6 border border-error-12 rounded-xl text-xs text-error-100 font-bold flex items-center gap-2"
      >
        <Icon icon="solar:danger-triangle-bold" class="w-4 h-4 shrink-0" />
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <BaseInput
            v-model="mobile"
            title="شماره همراه مدیر"
            placeholder="مثلاً 09120000000"
            size="lg"
            class="font-mono text-center tracking-wider"
            required
            show-start-icon
            start-icon="solar:phone-bold-duotone"
          />
        </div>

        <div>
          <BaseInput
            v-model="password"
            type="password"
            title="رمز عبور ادمین"
            placeholder="کلمه عبور امنیتی"
            size="lg"
            class="font-mono"
            required
            show-start-icon
            start-icon="solar:lock-keyhole-bold-duotone"
          />
        </div>

        <div class="pt-2">
          <BaseButton
            size="lg"
            variant="primary"
            :loading="loading"
            class="w-full"
            start-icon="solar:login-2-bold"
            @click="handleLogin"
          >
            ورود به سامانه نظارتی
          </BaseButton>
        </div>
      </form>

      <!-- Sandbox Link Hint -->
      <div class="text-center pt-2 border-t border-primary-6">
        <router-link
          to="/sandbox/admin-backoffice"
          class="text-xs font-bold text-primary-80 hover:text-primary-100 hover:underline inline-flex items-center gap-1"
        >
          <Icon icon="solar:test-tube-minimalistic-bold-duotone" class="w-4 h-4" />
          ورود به محیط سندباکس و آزمایشی پنل
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { adminApiService } from '@/services/adminApiService';

const router = useRouter();

const mobile = ref('09120000000');
const password = ref('Admin@123456');
const loading = ref(false);
const errorMessage = ref('');

async function handleLogin() {
  errorMessage.value = '';
  loading.value = true;
  try {
    await adminApiService.login(mobile.value.trim(), password.value);
    router.push('/admin/dashboard');
  } catch (err: any) {
    errorMessage.value =
      err.response?.data?.non_field_errors?.[0] ||
      err.response?.data?.detail ||
      'اطلاعات ورود نامعتبر است یا ارتباط با سرویس ادمین برقرار نشد.';
  } finally {
    loading.value = false;
  }
}
</script>
