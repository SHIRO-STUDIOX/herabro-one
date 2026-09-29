<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue && partner"
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
                class="w-10 h-10 min-w-10 min-h-10 rounded-full bg-success-6 text-success-100 border border-success-12 flex items-center justify-center shrink-0"
              >
                <Icon icon="solar:card-send-bold-duotone" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col items-start justify-center min-w-0">
                <span class="text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap">
                  ثبت حواله تسویه پورسانت پایا
                </span>
                <span class="text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full">
                  در وجه: «{{ partner.name }}»
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
            <!-- Account & Sheba Preview Card -->
            <div class="p-3 bg-white-100 border border-primary-6 rounded-xl flex flex-col gap-2 text-xs font-dots-1">
              <div class="flex items-center justify-between">
                <span class="text-primary-60">مانده قابل تسویه کیف پول:</span>
                <span class="font-mono font-black text-success-100">
                  {{ toPersianNumber(partner.wallet_balance_rial.toLocaleString('fa-IR')) }} ریال
                </span>
              </div>

              <div class="flex items-center justify-between border-t border-primary-6 pt-2">
                <span class="text-primary-60">شماره شبای مقصد (تأیید Mod-97):</span>
                <span class="font-mono font-bold text-primary-100 tracking-wider">
                  {{ partner.sheba_number }}
                </span>
              </div>
            </div>

            <!-- Amount Input -->
            <div>
              <BaseInput
                v-model.number="form.amount_rial"
                type="number"
                title="مبلغ حواله تسویه (ریال) *"
                placeholder="مبلغ مورد نظر برای تسویه"
                class="font-mono"
                required
              />
              <span class="text-3xs text-primary-40 mt-1 block font-dots-1">
                حداکثر سقف مجاز: مانده فعلی کیف پول شریک تجاری
              </span>
            </div>

            <!-- Reference / Tracking Code -->
            <div>
              <BaseInput
                v-model="form.tracking_code"
                title="شماره پیگیری تراکنش بانکی / فیش پایا *"
                placeholder="مثلاً PAYA-982347102"
                class="font-mono"
                required
              />
            </div>

            <!-- Admin Note -->
            <div>
              <label class="text-xs font-bold text-primary-80 mb-1.5 block font-dots-1">یادداشت اداری (اختیاری)</label>
              <textarea
                v-model="form.notes"
                rows="2"
                placeholder="توضیحات تکمیلی یا شماره نامه مالی..."
                class="w-full p-2.5 rounded-xl border border-primary-12 bg-white-100 text-xs font-medium text-primary-100 placeholder:text-primary-40 outline-none focus:border-secondary-100 transition-colors resize-none font-dots-1"
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
              end-icon="solar:card-send-bold"
              class="!w-[130px] text-xs font-semibold shrink-0"
              @click="handleSubmit"
            >
              ثبت نهایی تسویه
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
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import { toPersianNumber } from '@/utils/formatters';
import type { AffiliatePartnerItem } from '@/types/admin';

const props = defineProps<{
  modelValue: boolean;
  partner: AffiliatePartnerItem | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', payload: { amount_rial: number; tracking_code: string; notes: string }): void;
}>();

const form = reactive({
  amount_rial: 0,
  tracking_code: '',
  notes: '',
});

watch(
  () => props.partner,
  (p) => {
    if (p) {
      form.amount_rial = p.wallet_balance_rial;
      form.tracking_code = '';
      form.notes = '';
    }
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  if (!props.partner) return false;
  return (
    form.amount_rial > 0 &&
    form.amount_rial <= props.partner.wallet_balance_rial &&
    form.tracking_code.trim().length >= 4
  );
});

function handleClose() {
  emit('update:modelValue', false);
}

function handleSubmit() {
  if (!props.partner || !isFormValid.value) return;
  emit('submit', {
    amount_rial: form.amount_rial,
    tracking_code: form.tracking_code.trim(),
    notes: form.notes.trim(),
  });
}
</script>
