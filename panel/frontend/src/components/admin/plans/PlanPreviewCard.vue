<template>
  <div class="w-full flex flex-col items-center gap-4 text-right select-none font-sans" dir="rtl">
    <!-- Billing Cycle Switcher from feature/plans -->
    <BillingCycleSwitcher v-model="selectedCycle" />

    <!-- Authentic Hesabro PlanTierCard from feature/plans -->
    <div class="w-full max-w-sm">
      <PlanTierCard
        :plan="adaptedPlan"
        :cycle="selectedCycle"
        :is-current="false"
        :disabled="false"
      />
    </div>

    <!-- Admin Indicator Notice -->
    <div class="w-full max-w-sm p-3 rounded-2xl bg-primary-6/60 border border-primary-12 text-2xs text-primary-80 flex items-center justify-between">
      <span class="font-medium font-dots-1">پیش‌نمایش کاتالوگ فرانت‌هسته:</span>
      <span class="font-mono font-bold text-primary-100">Live Preview</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BillingCycleSwitcher from '@/components/subscription/BillingCycleSwitcher.vue';
import PlanTierCard from '@/components/subscription/PlanTierCard.vue';
import type { BillingCycle, PlanDefinition, PlanTierKey } from '@/types/subscription';
import type { AdminPlanItem } from '@/types/admin';

const props = defineProps<{
  plan: Partial<AdminPlanItem>;
}>();

const selectedCycle = ref<BillingCycle>('MONTHLY');

// Map AdminPlanItem from Admin Backoffice to canonical PlanDefinition for PlanTierCard
const adaptedPlan = computed<PlanDefinition>(() => {
  const p = props.plan;

  // Determine Monthly & Annual prices
  const monthlyCycle = p.billing_cycles?.find((c) => c.months_count === 1);
  const annualCycle = p.billing_cycles?.find((c) => c.months_count === 12);

  const monthlyPrice = monthlyCycle ? Number(monthlyCycle.final_price_rial) : 990000;
  const annualPrice = annualCycle ? Number(annualCycle.final_price_rial) : monthlyPrice * 10;
  const annualDiscount = monthlyPrice > 0 ? Math.round((1 - annualPrice / (monthlyPrice * 12)) * 100) : 0;

  // Derive PlanTierKey
  let tierKey: PlanTierKey = 'SHOP';
  const slugUpper = (p.slug || '').toUpperCase();
  if (slugUpper.includes('FREE')) tierKey = 'FREE';
  else if (slugUpper.includes('PERSONAL')) tierKey = 'PERSONAL';
  else if (slugUpper.includes('BUSINESS')) tierKey = 'BUSINESS';
  else if (slugUpper.includes('SHOP')) tierKey = 'SHOP';

  return {
    id: tierKey,
    title: p.title || 'پلن جدید',
    targetAudience: p.description || 'مناسب کسب‌وکارها و اصناف',
    monthlyPrice,
    annualPrice,
    annualDiscountPercent: annualDiscount > 0 ? annualDiscount : 17,
    isPopular: Boolean(p.is_featured),
    features: {
      maxInvoicesMonthly: p.max_invoices_monthly ?? 'UNLIMITED',
      maxWarehouses: p.max_warehouses ?? 0,
      maxActiveCheques: p.max_cheques ?? 'UNLIMITED',
      maxUsers: p.max_users ?? 1,
      hasLineTreasury: p.active_features_json?.includes('line_treasury') || true,
      hasMultiWarehouseTransfer: p.active_features_json?.includes('multi_warehouse_transfer') || false,
      hasAdvancedChequeWorkflow: p.active_features_json?.includes('advanced_cheque_workflow') || false,
    },
  };
});
</script>
