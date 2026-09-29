<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    <div class="flex items-center justify-between">
      <label class="text-xs font-extrabold text-primary-80 flex items-center gap-1.5">
        <Icon icon="solar:tag-price-bold-duotone" class="w-4 h-4 text-primary-100" />
        ماتریس دوره‌ها و قیمت‌گذاری ریالی
      </label>
      <span class="text-2xs text-primary-40">مبالغ بر پایه ریال با محاسبه خودکار تخفیف دوره‌ای</span>
    </div>

    <!-- Cycles Matrix Table -->
    <div class="w-full bg-white-100 rounded-2xl border border-primary-6 flex flex-col overflow-hidden shadow-2xs">
      <div class="w-full h-10 bg-primary-1/40 border-b border-primary-6 flex items-center px-4 text-2xs font-extrabold text-primary-60 font-dots-1">
        <div class="w-28">دوره زمانی</div>
        <div class="flex-1 min-w-[140px]">قیمت پایه (ریال)</div>
        <div class="w-28 text-center">تخفیف دوره (٪)</div>
        <div class="w-44 text-left">مبلغ نهایی دوره (ریال)</div>
      </div>

      <div
        v-for="cycle in cycles"
        :key="cycle.months_count"
        class="w-full h-14 border-b border-primary-6 flex items-center px-4 hover:bg-primary-1/20 transition-colors"
      >
        <!-- Duration Label -->
        <div class="w-28 text-xs font-bold text-primary-100 flex items-center gap-1.5">
          <Icon icon="solar:calendar-date-bold-duotone" class="w-4 h-4 text-primary-40" />
          {{ getCycleName(cycle.months_count) }}
        </div>

        <!-- Base Price Input -->
        <div class="flex-1 min-w-[140px] pl-4">
          <BaseInput
            v-model="cycle.base_price_rial"
            type="number"
            placeholder="مثلاً 10,000,000"
            class="font-mono text-xs"
            @input="updateFinalPrice(cycle)"
          />
        </div>

        <!-- Discount Percent Input -->
        <div class="w-28 px-2 flex justify-center">
          <BaseInput
            v-model="cycle.discount_percent"
            type="number"
            placeholder="0"
            class="font-mono text-center text-xs"
            :max="100"
            @input="updateFinalPrice(cycle)"
          />
        </div>

        <!-- Calculated Final Price Display -->
        <div class="w-44 flex flex-col items-end justify-center font-mono">
          <span class="text-xs font-extrabold text-primary-100">
            {{ (cycle.final_price_rial || 0).toLocaleString('fa-IR') }}
          </span>
          <span class="text-2xs font-sans text-primary-40">ریال بدون اعشار</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import type { PlanBillingCycleItem } from '@/types/admin';

const props = defineProps<{
  cycles: PlanBillingCycleItem[];
}>();

const emit = defineEmits<{
  (e: 'update:cycles', val: PlanBillingCycleItem[]): void;
}>();

function getCycleName(months: number) {
  switch (months) {
    case 1:
      return '۱ ماهه (ماهانه)';
    case 3:
      return '۳ ماهه (فصلی)';
    case 6:
      return '۶ ماهه (نیم‌سال)';
    case 12:
      return '۱۲ ماهه (سالانه)';
    default:
      return `${months} ماهه`;
  }
}

function updateFinalPrice(cycle: PlanBillingCycleItem) {
  const base = Number(cycle.base_price_rial) || 0;
  const disc = Number(cycle.discount_percent) || 0;
  const discAmount = Math.floor((base * disc) / 100);
  cycle.final_price_rial = Math.max(0, base - discAmount);
  emit('update:cycles', [...props.cycles]);
}
</script>
