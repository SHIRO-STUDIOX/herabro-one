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
                <Icon icon="solar:ticket-sale-bold-duotone" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col items-start justify-center min-w-0">
                <span class="text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap">
                  تعریف کد تخفیف جدید
                </span>
                <span class="text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full">
                  صدور کوپن تخفیف درصدی یا ریالی
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
            <!-- Coupon Code -->
            <div>
              <BaseInput
                v-model="form.code"
                title="شناسه یا متن کد تخفیف *"
                placeholder="مثلاً NOROOZ1405"
                class="font-mono uppercase tracking-wider"
                required
              />
            </div>

            <!-- Partner Selection -->
            <div>
              <label class="text-xs font-bold text-primary-80 mb-1.5 block font-dots-1">انتساب به همکار فروش (اختیاری)</label>
              <BaseSelect
                v-model="form.partner_id"
                :options="partnerOptions"
                placeholder="کد عمومی (بدون همکار)"
                size="md"
              />
            </div>

            <!-- Discount Type Selection -->
            <div class="flex items-center p-1 bg-primary-6 border border-primary-8 rounded-xl w-full font-dots-1">
              <div
                class="flex-1 text-center py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200"
                :class="form.discount_type === 'PERCENT' ? 'bg-white text-primary-100 shadow-sm' : 'text-primary-40 hover:text-primary-80'"
                @click="form.discount_type = 'PERCENT'"
              >
                درصدی (%)
              </div>
              <div
                class="flex-1 text-center py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200"
                :class="form.discount_type === 'FIXED_RIAL' ? 'bg-white text-primary-100 shadow-sm' : 'text-primary-40 hover:text-primary-80'"
                @click="form.discount_type = 'FIXED_RIAL'"
              >
                مبلغ ثابت (ریال)
              </div>
            </div>

            <!-- Value Input -->
            <div>
              <BaseInput
                v-model.number="form.discount_value"
                type="number"
                :title="form.discount_type === 'PERCENT' ? 'درصد تخفیف (مثلاً 20)' : 'مبلغ تخفیف (ریال)'"
                placeholder="مقدار تخفیف"
                required
                class="font-mono"
              />
            </div>

            <!-- Limits (Max Uses & Expiration) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BaseInput
                v-model.number="form.max_uses"
                type="number"
                title="سقف دفعات استفاده"
                placeholder="خالی = نامحدود"
                class="font-mono"
              />
              <BaseInput
                v-model="form.valid_until"
                type="date"
                title="تاریخ پایان اعتبار"
                class="font-mono"
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
              ذخیره کد تخفیف
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
import type { AffiliatePartnerItem, PromoCodeItem } from '@/types/admin';

const props = defineProps<{
  modelValue: boolean;
  partners?: AffiliatePartnerItem[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', payload: Partial<PromoCodeItem>): void;
}>();

const form = reactive({
  code: '',
  partner_id: '' as string | number,
  discount_type: 'PERCENT' as 'PERCENT' | 'FIXED_RIAL',
  discount_value: 15,
  max_uses: undefined as number | undefined,
  valid_until: '',
});

const partnerOptions = computed(() => {
  const options = [{ value: '', label: 'کد عمومی (بدون همکار بازاریاب)' }];
  if (props.partners) {
    props.partners.forEach((p) => {
      options.push({ value: String(p.id), label: `${p.name} (${p.promo_code_prefix})` });
    });
  }
  return options;
});

const isFormValid = computed(() => {
  return form.code.trim().length >= 3 && form.discount_value > 0;
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.code = '';
      form.partner_id = '';
      form.discount_type = 'PERCENT';
      form.discount_value = 15;
      form.max_uses = undefined;
      form.valid_until = '';
    }
  }
);

function handleClose() {
  emit('update:modelValue', false);
}

function handleSubmit() {
  if (!isFormValid.value) return;
  emit('submit', {
    code: form.code.trim().toUpperCase(),
    partner_id: form.partner_id ? Number(form.partner_id) : null,
    discount_percent: form.discount_type === 'PERCENT' ? form.discount_value : 0,
    discount_amount_rial: form.discount_type === 'FIXED_RIAL' ? form.discount_value : 0,
    max_uses: form.max_uses || 100,
    valid_until: form.valid_until || null,
    is_active: true,
  });
}
</script>
