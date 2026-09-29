<template>
  <div
    class="w-full bg-white-80 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 overflow-x-auto font-sans select-none"
  >
    <span class="text-xs font-bold text-primary-100 font-dots-1">مقایسه کامل دسترسی‌ها</span>
    <table class="w-full min-w-[560px] text-xs font-dots-1 border-collapse">
      <thead>
        <tr class="border-b border-primary-8">
          <th class="text-right py-2 pl-2 font-semibold text-primary-60 w-[220px]">قابلیت</th>
          <th
            v-for="plan in plans"
            :key="plan.id"
            class="text-center py-2 font-extrabold text-primary-100"
          >
            {{ plan.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.label"
          class="border-b border-primary-6 last:border-none"
        >
          <td class="text-right py-2 pl-2 font-medium text-primary-80">{{ row.label }}</td>
          <td v-for="plan in plans" :key="plan.id" class="text-center py-2">
            <span v-if="typeof row.get(plan) === 'boolean'" class="inline-flex justify-center">
              <Icon
                :icon="
                  row.get(plan)
                    ? 'solar:check-circle-bold-duotone'
                    : 'solar:close-circle-bold-duotone'
                "
                class="w-4.5 h-4.5"
                :class="row.get(plan) ? 'text-success-100' : 'text-primary-40'"
              />
            </span>
            <span v-else class="font-mono font-bold text-primary-100">
              {{ row.get(plan) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { toPersianNumber } from '@/utils/formatters'
import type { PlanDefinition } from '@/types/subscription'

withDefaults(
  defineProps<{
    plans?: readonly PlanDefinition[] | PlanDefinition[]
  }>(),
  { plans: () => [] },
)

function quotaText(value: number | 'UNLIMITED'): string {
  if (value === 'UNLIMITED') return 'نامحدود'
  if (value === 0) return '—'
  return toPersianNumber(value)
}

const rows: { label: string; get: (p: PlanDefinition) => string | boolean }[] = [
  { label: 'سقف فاکتور ماهانه', get: (p) => quotaText(p.features.maxInvoicesMonthly) },
  { label: 'تعداد انبار', get: (p) => quotaText(p.features.maxWarehouses) },
  { label: 'چک فعال', get: (p) => quotaText(p.features.maxActiveCheques) },
  { label: 'تعداد کاربر', get: (p) => quotaText(p.features.maxUsers) },
  { label: 'خزانه‌داری چندسطری', get: (p) => p.features.hasLineTreasury },
  { label: 'حواله بین انبارها', get: (p) => p.features.hasMultiWarehouseTransfer },
  { label: 'گردش کامل وضعیت چک', get: (p) => p.features.hasAdvancedChequeWorkflow },
]
</script>
