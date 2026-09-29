<template>
  <div
    class="w-full bg-white-80 backdrop-blur-md border rounded-2xl p-5 flex flex-col gap-2.5 font-sans select-none relative transition-all duration-300"
    :class="isCurrent ? '!border-secondary-100 ring-1 ring-secondary-100/20' : '!border-transparent'"
  >
    <!-- Popular ribbon -->
    <div v-if="plan.isPopular" class="absolute -top-2.5 right-4">
      <BaseBadge
        type="secondary"
        style-type="fill"
        size="2xs"
        :show-start-icon="true"
        start-icon="solar:medal-ribbon-bold-duotone"
      >
        پیشنهاد حسابرو
      </BaseBadge>
    </div>

    <!-- Title row -->
    <div class="flex items-center justify-between w-full pt-1">
      <div class="flex items-center gap-1.5 min-w-0">
        <Icon :icon="planIcon" class="w-5 h-5 text-primary-100 shrink-0" />
        <div class="flex flex-col min-w-0">
          <span class="text-sm font-extrabold text-primary-100 font-dots-1 leading-5 truncate">
            {{ plan.title }}
          </span>
          <span class="text-2xs text-primary-60 font-dots-1 truncate">
            {{ plan.targetAudience }}
          </span>
        </div>
      </div>
      <BaseBadge
        v-if="isCurrent"
        type="success"
        style-type="soft"
        size="2xs"
        :show-start-icon="true"
        start-icon="solar:check-circle-bold-duotone"
      >
        پلن فعلی
      </BaseBadge>
    </div>

    <!-- Price block -->
    <div class="flex flex-col gap-0.5 w-full">
      <template v-if="cycle === 'MONTHLY'">
        <div class="flex items-baseline gap-1.5">
          <span class="text-xl font-black font-mono text-primary-100">
            {{ formatCurrency(plan.monthlyPrice) }}
          </span>
          <span class="text-2xs font-bold text-primary-60 font-dots-1">ریال / ماه</span>
        </div>
      </template>
      <template v-else>
        <div class="flex items-baseline gap-1.5">
          <span class="text-xl font-black font-mono text-primary-100">
            {{ formatCurrency(effectiveMonthly) }}
          </span>
          <span class="text-2xs font-bold text-primary-60 font-dots-1">ریال / ماه</span>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-mono text-primary-40 line-through">
            {{ formatCurrency(plan.monthlyPrice * 12) }}
          </span>
          <span class="text-xs font-mono font-bold text-secondary-100">
            {{ formatCurrency(plan.annualPrice) }} ریال سالانه
          </span>
        </div>
      </template>
    </div>

    <!-- Action (primary, right under the price) -->
    <BaseButton
      type="primary"
      style-type="fill"
      size="md"
      class="w-full !rounded-full text-xs font-semibold"
      :disabled="isCurrent || disabled"
      :show-end-icon="!isCurrent"
      end-icon="solar:arrow-up-bold"
      @click="$emit('upgrade', plan.id)"
    >
      {{ isCurrent ? 'پلن فعال شما' : `ارتقا به ${plan.title}` }}
    </BaseButton>

    <!-- Feature options: label + tick on the right, value on the left -->
    <ul class="flex flex-col w-full pt-1">
      <li
        v-for="row in limitRows"
        :key="row.label"
        class="flex items-center justify-between gap-2 py-2 text-xs font-dots-1"
      >
        <span class="flex items-center gap-1.5 min-w-0">
          <Icon
            :icon="row.ok ? 'solar:check-circle-bold-duotone' : 'solar:close-circle-bold-duotone'"
            class="w-4 h-4 shrink-0"
            :class="row.ok ? 'text-success-100' : 'text-primary-40'"
          />
          <span class="text-primary-80 font-medium truncate">{{ row.label }}</span>
        </span>
        <span class="font-mono font-bold text-primary-100 whitespace-nowrap">{{ row.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { formatCurrency, toPersianNumber } from '@/utils/formatters'
import type { BillingCycle, PlanDefinition, PlanTierKey } from '@/types/subscription'

const props = withDefaults(
  defineProps<{
    plan?: PlanDefinition
    cycle?: BillingCycle
    isCurrent?: boolean
    disabled?: boolean
  }>(),
  { cycle: 'MONTHLY', isCurrent: false, disabled: false },
)

defineEmits<{
  (e: 'upgrade', planId: PlanTierKey): void
}>()

const plan = computed(() => props.plan as PlanDefinition)

const planIcons: Record<PlanTierKey, string> = {
  FREE: 'solar:leaf-bold-duotone',
  PERSONAL: 'solar:user-bold-duotone',
  SHOP: 'solar:shop-bold-duotone',
  BUSINESS: 'solar:buildings-bold-duotone',
}

const planIcon = computed(() => planIcons[plan.value.id])

const effectiveMonthly = computed(() => Math.round(plan.value.annualPrice / 12))

function quotaText(value: number | 'UNLIMITED'): string {
  if (value === 'UNLIMITED') return 'نامحدود'
  if (value === 0) return 'ندارد'
  return toPersianNumber(value)
}

const limitRows = computed(() => {
  const f = plan.value.features
  return [
    { label: 'فاکتور ماهانه', value: quotaText(f.maxInvoicesMonthly), ok: f.maxInvoicesMonthly !== 0 },
    { label: 'انبار', value: quotaText(f.maxWarehouses), ok: f.maxWarehouses > 0 },
    { label: 'چک فعال', value: quotaText(f.maxActiveCheques), ok: f.maxActiveCheques !== 0 },
    { label: 'کاربر', value: quotaText(f.maxUsers), ok: true },
    { label: 'خزانه‌داری چندسطری', value: f.hasLineTreasury ? 'دارد' : 'ندارد', ok: f.hasLineTreasury },
    { label: 'حواله بین انبارها', value: f.hasMultiWarehouseTransfer ? 'دارد' : 'ندارد', ok: f.hasMultiWarehouseTransfer },
    { label: 'گردش کامل وضعیت چک', value: f.hasAdvancedChequeWorkflow ? 'دارد' : 'ندارد', ok: f.hasAdvancedChequeWorkflow },
  ]
})
</script>
