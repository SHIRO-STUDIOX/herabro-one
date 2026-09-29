<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    <!-- Header Toolbar -->
    <div class="h-14 px-4 sm:px-5 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0">
          <Icon icon="solar:ticket-sale-bold-duotone" class="w-4.5 h-4.5 shrink-0" />
        </div>
        <h3 class="text-xs sm:text-sm font-extrabold text-primary-100">کدهای تخفیف و کوپن‌های تشویقی پلتفرم</h3>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton
          v-if="canManage"
          size="sm"
          type="primary"
          style-type="fill"
          start-icon="solar:add-circle-linear"
          class="!rounded-full text-xs font-semibold"
          @click="$emit('create')"
        >
          کد تخفیف جدید
        </BaseButton>

        <BaseTooltip text="به‌روزرسانی">
          <button
            type="button"
            class="w-9 h-9 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none text-primary-100"
            style="
              background-image: radial-gradient(
                ellipse at 50% 100%,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            "
            @click="$emit('refresh')"
          >
            <Icon icon="solar:restart-bold" class="w-4 h-4" :class="loading ? 'animate-spin' : ''" />
          </button>
        </BaseTooltip>
      </div>
    </div>

    <!-- Table Container (Hesabro Standard) -->
    <div class="w-full bg-white-100 rounded-2xl overflow-hidden border border-primary-6 flex flex-col relative transition-all duration-200 shadow-xs">
      <CardLoadingOverlay v-if="loading" />

      <!-- Top Table Header Row -->
      <div class="w-full h-12 bg-white-100 border-b border-primary-6 flex items-center shrink-0">
        <div class="w-10 self-stretch bg-primary-1/60 border-l border-primary-6 flex items-center justify-center shrink-0 text-xs font-bold text-primary-60 font-dots-1 select-none">
          #
        </div>

        <div class="w-44 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            کد تخفیف (Coupon)
          </span>
        </div>

        <div class="flex-1 min-w-[160px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            همکار منتسب
          </span>
        </div>

        <div class="w-36 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            میزان تخفیف
          </span>
        </div>

        <div class="w-44 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            مصرف / سقف مجاز
          </span>
        </div>

        <div class="w-28 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            وضعیت
          </span>
        </div>

        <div class="w-28 pl-2 pr-3 flex items-center justify-end text-left shrink-0">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-left">
            فعال‌سازی
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && promoCodes.length === 0" class="w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60">
        <div class="w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80">
          <Icon icon="solar:ticket-linear" class="w-6 h-6" />
        </div>
        <span class="text-xs font-bold font-dots-1">هیچ کد تخفیفی تاکنون تعریف نشده است</span>
      </div>

      <!-- Table Rows Container -->
      <div v-else class="w-full flex flex-col divide-y divide-primary-6 overflow-x-auto">
        <div
          v-for="(promo, idx) in promoCodes"
          :key="promo.id"
          class="w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none"
        >
          <!-- Index -->
          <div class="w-10 self-stretch bg-primary-1/50 border-l border-primary-6 flex items-center justify-center shrink-0">
            <span class="text-xs font-bold text-primary-60 font-dots-1 select-none">
              {{ toPersianNumber(idx + 1) }}
            </span>
          </div>

          <!-- Coupon Code -->
          <div class="w-44 pr-3 flex items-center gap-1.5 font-mono font-bold text-xs text-primary-100">
            <Icon icon="solar:copy-linear" class="w-3.5 h-3.5 text-primary-40 group-hover:text-primary-80" />
            <span class="tracking-wider">{{ promo.code }}</span>
          </div>

          <!-- Partner Name -->
          <div class="flex-1 min-w-[160px] pr-3 text-xs font-dots-1 font-bold text-primary-80 truncate">
            {{ promo.partner_name || 'کد عمومی بدون معرف' }}
          </div>

          <!-- Discount Amount / Percent -->
          <div class="w-36 pr-3 flex items-center justify-center">
            <BaseBadge type="secondary" size="2xs" style-type="soft">
              <span v-if="promo.discount_percent > 0">{{ toPersianNumber(promo.discount_percent) }}% تخفیف</span>
              <span v-else class="font-mono">{{ toPersianNumber(promo.discount_amount_rial.toLocaleString('fa-IR')) }} ریال</span>
            </BaseBadge>
          </div>

          <!-- Usage Count -->
          <div class="w-44 pr-3 flex items-center justify-center text-xs font-mono font-medium text-primary-80">
            {{ toPersianNumber(promo.used_count) }} / {{ promo.max_uses ? toPersianNumber(promo.max_uses) : 'نامحدود' }}
          </div>

          <!-- Status Badge -->
          <div class="w-28 pr-3 flex items-center justify-center">
            <BaseBadge :type="promo.is_active ? 'success' : 'warning'" size="2xs" style-type="soft">
              {{ promo.is_active ? 'فعال' : 'غیرفعال' }}
            </BaseBadge>
          </div>

          <!-- Small Action Button: Toggle Active -->
          <div class="w-28 pl-2 pr-3 flex items-center justify-end gap-1.5 shrink-0">
            <BaseTooltip :text="promo.is_active ? 'غیرفعال کردن کد' : 'فعال کردن کد'">
              <button
                type="button"
                :disabled="!canManage"
                class="w-6 h-6 min-w-[24px] rounded-full active:scale-90 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                :class="promo.is_active ? 'bg-success-8 hover:bg-success-12 text-success-100' : 'bg-primary-6 hover:bg-primary-12 text-primary-40'"
                @click="$emit('toggleActive', promo)"
              >
                <Icon :icon="promo.is_active ? 'solar:check-circle-bold-duotone' : 'solar:close-circle-bold-duotone'" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
import type { PromoCodeItem, AdminRole } from '@/types/admin';

const props = defineProps<{
  promoCodes: PromoCodeItem[];
  loading?: boolean;
  currentRole: AdminRole;
}>();

defineEmits<{
  (e: 'create'): void;
  (e: 'refresh'): void;
  (e: 'toggleActive', promo: PromoCodeItem): void;
}>();

const canManage = computed(() => {
  return props.currentRole === 'SUPER_ADMIN' || props.currentRole === 'SALES_MANAGER';
});
</script>
