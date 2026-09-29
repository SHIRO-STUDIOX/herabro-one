<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue && tenant"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/50 backdrop-blur-sm overflow-y-auto"
        dir="rtl"
        @click.self="handleClose"
      >
        <div
          class="w-full max-w-[500px] my-auto bg-white-60 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 text-right select-none font-sans relative transition-all duration-300"
          dir="rtl"
          @click.stop
        >
          <!-- LAYER 1: Header Section (Hesabro Standard) -->
          <div class="flex items-center justify-between w-full h-10 gap-6">
            <div class="flex items-center gap-3 flex-1 min-w-0 h-10">
              <div
                class="w-10 h-10 min-w-10 min-h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0"
              >
                <Icon icon="solar:crown-bold-duotone" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col items-start justify-center min-w-0">
                <span class="text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap">
                  تغییر دستی پلن مستأجر
                </span>
                <span class="text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full">
                  فروشگاه: «{{ tenant.title }}»
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

          <!-- LAYER 2: Form Card (Inner white-80 card) -->
          <form class="w-full bg-white-80 rounded-xl p-3 flex flex-col gap-3" @submit.prevent="handleSubmit">
            <!-- Plan Selector -->
            <div>
              <label class="text-xs font-bold text-primary-80 mb-1.5 block font-dots-1">پلن اشتراک هدف *</label>
              <BaseSelect
                v-model="form.plan_slug"
                :options="planOptions"
                placeholder="انتخاب پلن جدید"
                size="md"
              />
            </div>

            <!-- Extension Days -->
            <div>
              <BaseInput
                v-model.number="form.days"
                type="number"
                title="تعداد روزهای اعتبار / تمدید"
                placeholder="مثلاً 30 یا 365 روز"
                required
                class="font-mono"
              />
            </div>

            <!-- Invoices Limit -->
            <div>
              <BaseInput
                v-model.number="form.invoices_limit"
                type="number"
                title="سقف فاکتور ماهانه مجاز"
                placeholder="مثلاً 500 یا 1000"
                class="font-mono"
                required
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
              اعمال تغییر پلن
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
import type { TenantRecordItem } from '@/types/admin';

const props = defineProps<{
  modelValue: boolean;
  tenant: TenantRecordItem | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', payload: { plan_slug: string; days: number; invoices_limit: number }): void;
}>();

const form = reactive({
  plan_slug: '',
  days: 30,
  invoices_limit: 1000,
});

const planOptions = [
  { value: 'free', label: 'رایگان (Free)' },
  { value: 'personal', label: 'شخصی (Personal)' },
  { value: 'shop-standard', label: 'مغازه ساده (Shop Standard)' },
  { value: 'business-pro', label: 'کسب‌وکار پویا (Business Pro)' },
];

watch(
  () => props.tenant,
  (t) => {
    if (t) {
      form.plan_slug = t.current_plan_slug || 'shop-standard';
      form.days = 30;
      form.invoices_limit = t.max_invoices_limit || 1000;
    }
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  return form.plan_slug && form.days > 0;
});

function handleClose() {
  emit('update:modelValue', false);
}

function handleSubmit() {
  if (!props.tenant || !isFormValid.value) return;
  emit('submit', {
    plan_slug: form.plan_slug,
    days: form.days,
    invoices_limit: form.invoices_limit,
  });
}
</script>
