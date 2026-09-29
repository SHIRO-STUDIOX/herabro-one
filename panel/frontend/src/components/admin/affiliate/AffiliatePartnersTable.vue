<template>
  <div class="w-full flex flex-col gap-4 font-sans select-none text-right" dir="rtl">
    <!-- Stat Cards Header (Hesabro Standard) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- Total Commission/Sales -->
      <div class="p-4 rounded-2xl bg-white-80 backdrop-blur-md border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs font-semibold text-primary-60">کل تراز معوق قابل تسویه</span>
          <span class="text-lg font-mono font-black text-primary-100">
            {{ formatRial(totalPendingBalance) }} <span class="text-xs font-sans font-medium text-primary-60">ریال</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0">
          <Icon icon="solar:wallet-money-bold-duotone" class="w-5 h-5 shrink-0" />
        </div>
      </div>

      <!-- Active Partners -->
      <div class="p-4 rounded-2xl bg-white-80 backdrop-blur-md border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs font-semibold text-primary-60">تعداد همکاران فروش فعال</span>
          <span class="text-lg font-mono font-black text-success-100">
            {{ toPersianNumber(activePartnersCount) }} <span class="text-xs font-sans font-medium text-primary-60">همکار</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-success-6 text-success-100 border border-success-12 flex items-center justify-center shrink-0">
          <Icon icon="solar:users-group-two-rounded-bold-duotone" class="w-5 h-5 shrink-0" />
        </div>
      </div>

      <!-- Total Payouts Executed -->
      <div class="p-4 rounded-2xl bg-white-80 backdrop-blur-md border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs font-semibold text-primary-60">تعداد کل تراکنش‌های پایا</span>
          <span class="text-lg font-mono font-black text-primary-100">
            {{ toPersianNumber(totalPayoutsCount) }} <span class="text-xs font-sans font-medium text-primary-60">تراکنش</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-info-6 text-info-100 border border-info-12 flex items-center justify-center shrink-0">
          <Icon icon="solar:card-transfer-bold-duotone" class="w-5 h-5 shrink-0" />
        </div>
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

        <div class="flex-1 min-w-[180px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            نام شریک تجاری / کد
          </span>
        </div>

        <div class="w-36 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            شماره موبایل
          </span>
        </div>

        <div class="w-60 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            شماره شبا (ISO 7064)
          </span>
        </div>

        <div class="w-28 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            درصد پورسانت
          </span>
        </div>

        <div class="w-44 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            مانده کیف پول
          </span>
        </div>

        <div class="w-[100px] pl-2 pr-3 flex items-center justify-end text-left shrink-0">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-left">
            عملیات
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && partners.length === 0" class="w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60">
        <div class="w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80">
          <Icon icon="solar:users-group-two-rounded-bold-duotone" class="w-6 h-6" />
        </div>
        <span class="text-xs font-bold font-dots-1">همکاری ثبت نشده است</span>
      </div>

      <!-- Table Rows Container -->
      <div v-else class="w-full flex flex-col divide-y divide-primary-6 overflow-x-auto">
        <div
          v-for="(partner, idx) in partners"
          :key="partner.id"
          class="w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none"
        >
          <!-- Index -->
          <div class="w-10 self-stretch bg-primary-1/50 border-l border-primary-6 flex items-center justify-center shrink-0">
            <span class="text-xs font-bold text-primary-60 font-dots-1 select-none">
              {{ toPersianNumber(idx + 1) }}
            </span>
          </div>

          <!-- Partner Name & Code -->
          <div class="flex-1 min-w-[180px] pr-3 flex items-center gap-2 overflow-hidden">
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-xs sm:text-sm font-extrabold font-dots-1 text-primary-100 group-hover:text-secondary-100 transition-colors truncate">
                {{ partner.name }}
              </span>
              <span class="text-2xs font-mono text-primary-60 truncate">
                پیشوند کد: {{ partner.promo_code_prefix }}
              </span>
            </div>
          </div>

          <!-- Mobile -->
          <div class="w-36 pr-3 flex items-center justify-start text-xs font-mono font-bold text-primary-80">
            {{ toPersianNumber(partner.mobile) }}
          </div>

          <!-- Sheba Number -->
          <div class="w-60 pr-3 flex items-center justify-start text-xs font-mono font-semibold text-primary-100 tracking-wider">
            {{ partner.sheba_number }}
          </div>

          <!-- Commission Rate -->
          <div class="w-28 pr-3 flex items-center justify-center">
            <BaseBadge type="secondary" size="2xs" style-type="soft">
              <span v-if="partner.commission_type === 'PERCENT'">{{ toPersianNumber(partner.commission_value) }}%</span>
              <span v-else class="font-mono">{{ toPersianNumber(partner.commission_value.toLocaleString('fa-IR')) }} ریال</span>
            </BaseBadge>
          </div>

          <!-- Wallet Balance -->
          <div class="w-44 pr-3 flex items-center justify-start font-mono text-xs font-bold" :class="partner.wallet_balance_rial > 0 ? 'text-success-100' : 'text-primary-40'">
            {{ formatRial(partner.wallet_balance_rial) }} <span class="text-3xs font-sans text-primary-60 mr-1">ریال</span>
          </div>

          <!-- Action Button: Payout -->
          <div class="w-[100px] pl-2 pr-3 flex items-center justify-end gap-1.5 shrink-0">
            <BaseTooltip v-if="canManage" :text="partner.wallet_balance_rial > 0 ? 'ثبت حواله تسویه پورسانت' : 'کیف پول فاقد مانده قابل تسویه'">
              <button
                type="button"
                :disabled="partner.wallet_balance_rial <= 0"
                class="w-6 h-6 min-w-[24px] rounded-full active:scale-90 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                :class="partner.wallet_balance_rial > 0 ? 'bg-success-8 hover:bg-success-12 text-success-100' : 'bg-primary-4 text-primary-30 cursor-not-allowed opacity-40'"
                @click="$emit('payout', partner)"
              >
                <Icon icon="solar:card-send-bold-duotone" class="w-3.5 h-3.5" />
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
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
import type { AffiliatePartnerItem, AdminRole } from '@/types/admin';

const props = defineProps<{
  partners: AffiliatePartnerItem[];
  loading?: boolean;
  currentRole: AdminRole;
}>();

defineEmits<{
  (e: 'payout', partner: AffiliatePartnerItem): void;
  (e: 'createPartner'): void;
  (e: 'refresh'): void;
}>();

const canManage = computed(() => {
  return props.currentRole === 'SUPER_ADMIN' || props.currentRole === 'SALES_MANAGER';
});

const totalPendingBalance = computed(() => {
  return props.partners.reduce((sum, p) => sum + (p.wallet_balance_rial || 0), 0);
});

const activePartnersCount = computed(() => {
  return props.partners.filter((p) => p.is_active).length;
});

const totalPayoutsCount = computed(() => {
  return props.partners.reduce((sum, p) => sum + (p.payouts?.length || 0), 0);
});

function formatRial(amount: number): string {
  return toPersianNumber(amount.toLocaleString('fa-IR'));
}
</script>
