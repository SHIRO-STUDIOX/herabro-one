<template>
  <div
    class="w-full bg-white-80 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-3 font-sans select-none"
  >
    <span class="text-xs font-bold text-primary-100 font-dots-1">مصرف سهمیه‌ها</span>
    <QuotaProgressBar
      label="فاکتورهای صادرشده"
      icon="solar:document-text-bold-duotone"
      :used="quotas.usedInvoices"
      :max="quotas.maxInvoices"
    />
    <QuotaProgressBar
      label="انبارهای فعال"
      icon="solar:box-minimalistic-bold-duotone"
      :used="quotas.usedWarehouses"
      :max="quotas.maxWarehouses"
    />
    <QuotaProgressBar
      label="کاربران فعال"
      icon="solar:users-group-two-rounded-bold-duotone"
      :used="quotas.usedUsers"
      :max="quotas.maxUsers"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QuotaProgressBar from '@/components/subscription/QuotaProgressBar.vue'
import type { QuotaUsage } from '@/types/subscription'

const props = withDefaults(
  defineProps<{
    quotas?: QuotaUsage
  }>(),
  {
    quotas: () => ({
      usedInvoices: 0,
      maxInvoices: 20,
      usedWarehouses: 0,
      maxWarehouses: 1,
      usedUsers: 1,
      maxUsers: 1,
    }),
  },
)

const quotas = computed(() => props.quotas)
</script>
