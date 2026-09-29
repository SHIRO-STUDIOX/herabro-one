<template>
  <BaseBadge
    :type="badgeType"
    style-type="soft"
    size="xs"
    :show-start-icon="true"
    :start-icon="badgeIcon"
  >
    {{ STATUS_LABELS[status] }}
  </BaseBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { STATUS_LABELS, type SubscriptionStatus } from '@/types/subscription'

const props = withDefaults(
  defineProps<{
    status?: SubscriptionStatus
  }>(),
  { status: 'ACTIVE' },
)

const badgeType = computed(() => {
  switch (props.status) {
    case 'ACTIVE':
      return 'success'
    case 'EXPIRING_SOON':
      return 'warning'
    case 'EXPIRED':
      return 'error'
    case 'TRIAL':
      return 'info'
    default:
      return 'primary'
  }
})

const badgeIcon = computed(() => {
  switch (props.status) {
    case 'ACTIVE':
      return 'solar:check-circle-bold-duotone'
    case 'EXPIRING_SOON':
      return 'solar:alarm-bold-duotone'
    case 'EXPIRED':
      return 'solar:close-circle-bold-duotone'
    case 'TRIAL':
      return 'solar:gift-bold-duotone'
    default:
      return 'solar:medal-ribbon-bold-duotone'
  }
})
</script>
