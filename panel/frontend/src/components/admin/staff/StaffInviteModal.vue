<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/50 backdrop-blur-sm overflow-y-auto"
        dir="rtl"
        @click.self="handleClose"
      >
        <div
          class="w-full max-w-[500px] my-auto bg-white-60 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 text-right select-none font-sans relative transition-all duration-300"
          dir="rtl"
          @click.stop
        >
          <!-- LAYER 1: Header Section -->
          <div class="flex items-center justify-between w-full h-10 gap-6">
            <div class="flex items-center gap-3 flex-1 min-w-0 h-10">
              <div
                class="w-10 h-10 min-w-10 min-h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0"
              >
                <Icon icon="solar:user-plus-bold-duotone" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col items-start justify-center min-w-0">
                <span class="text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap">
                  تعریف دسترسی ادمین جدید
                </span>
                <span class="text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full">
                  انتساب نقش و مجوزهای نظارتی به همکار
                </span>
              </div>
            </div>

            <!-- Close Button -->
            <BaseTooltip text="بستن">
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                @click="handleClose"
              >
                <Icon icon="solar:close-circle-linear" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>
          </div>

          <!-- LAYER 2: Form Card -->
          <form class="w-full bg-white-80 rounded-xl p-3 flex flex-col gap-3" @submit.prevent="handleSubmit">
            <!-- Mobile -->
            <div>
              <BaseInput
                v-model="form.mobile"
                title="شماره همراه جهت ورود به پنل *"
                placeholder="مثلاً 09121234567"
                class="font-mono"
                required
              />
            </div>

            <!-- Username & Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BaseInput
                v-model="form.username"
                title="نام کاربری (انگلیسی) *"
                placeholder="مثلاً support_2"
                class="font-mono"
                required
              />
              <BaseInput
                v-model="form.first_name"
                title="نام و نام خانوادگی"
                placeholder="مثلاً علی رضایی"
              />
            </div>

            <!-- Password -->
            <div>
              <BaseInput
                v-model="form.password"
                type="password"
                title="کلمه عبور ورود *"
                placeholder="حداقل ۸ کاراکتر امن"
                required
              />
            </div>

            <!-- Role Selector -->
            <div>
              <label class="text-xs font-bold text-primary-80 mb-1.5 block font-dots-1">نقش سازمانی و سطح دسترسی *</label>
              <BaseSelect
                v-model="form.role"
                :options="roleOptions"
                placeholder="انتخاب نقش"
                size="md"
              />
            </div>
          </form>

          <!-- LAYER 3: Footer Actions -->
          <div class="flex items-center justify-end gap-2 w-full pt-0.5">
            <BaseButton
              type="primary"
              style-type="outline"
              size="md"
              :disabled="loading"
              class="!w-[84px] text-xs font-semibold shrink-0"
              @click="handleClose"
            >
              انصراف
            </BaseButton>

            <BaseButton
              type="primary"
              style-type="fill"
              size="md"
              :loading="loading"
              :disabled="!isFormValid || loading"
              :show-end-icon="!loading"
              end-icon="solar:check-read-bold"
              class="!w-[130px] text-xs font-semibold shrink-0"
              @click="handleSubmit"
            >
              ایجاد حساب مدیر
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import type { AdminRole } from '@/types/admin';

const props = defineProps<{
  modelValue: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', payload: Record<string, unknown>): void;
}>();

const form = reactive({
  mobile: '',
  username: '',
  first_name: '',
  password: '',
  role: 'SUPPORT_AGENT' as AdminRole,
});

const roleOptions = [
  { value: 'SUPER_ADMIN', label: 'راهبر ارشد سیستم (Super Admin - دسترسی کامل)' },
  { value: 'SUPPORT_AGENT', label: 'کارشناس پشتیبانی (Support Agent - جعل هویت و نظارت)' },
  { value: 'SALES_MANAGER', label: 'مدیر فروش (Sales Manager - کدهای تخفیف و افیلیت)' },
];

const isFormValid = computed(() => {
  return (
    form.mobile.trim().length >= 10 &&
    form.username.trim().length >= 3 &&
    form.password.length >= 8 &&
    Boolean(form.role)
  );
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.mobile = '';
      form.username = '';
      form.first_name = '';
      form.password = '';
      form.role = 'SUPPORT_AGENT';
    }
  }
);

function handleClose() {
  emit('update:modelValue', false);
}

function handleSubmit() {
  if (!isFormValid.value) return;
  emit('submit', {
    mobile: form.mobile.trim(),
    username: form.username.trim().toLowerCase(),
    first_name: form.first_name.trim(),
    password: form.password,
    role: form.role,
  });
}
</script>
