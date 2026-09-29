<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div class="flex items-center justify-between w-full">
      <span class="text-xs font-semibold text-primary-80 font-dots-1 flex items-center gap-1.5">
        <Icon :icon="icon" class="w-4 h-4 text-primary-60 shrink-0" />
        {{ label }}
      </span>
      <span class="text-2xs font-mono font-bold" :class="valueTone">
        {{ usedDisplay }} <span class="text-primary-40 font-medium">از</span> {{ maxDisplay }}
      </span>
    </div>
    <div
      class="w-full h-2 rounded-full bg-primary-6 overflow-hidden"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="barTone"
        :style="{ width: `${percent}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { toPersianNumber } from '@/utils/formatters'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: string
    used?: number
    max?: number | 'UNLIMITED'
  }>(),
  { label: '', icon: 'solar:chart-bold-duotone', used: 0, max: 100 },
)

const percent = computed(() => {
  if (props.max === 'UNLIMITED') return 0
  if (!props.max || props.max <= 0) return 0
  return Math.min(100, Math.round((props.used / props.max) * 100))
})

const isUnlimited = computed(() => props.max === 'UNLIMITED')

const usedDisplay = computed(() => toPersianNumber(props.used))
const maxDisplay = computed(() =>
  isUnlimited.value ? 'نامحدود' : toPersianNumber(props.max as number),
)

/** Brand → warning (≥70%) → error (≥100%). */
const barTone = computed(() => {
  if (isUnlimited.value) return 'bg-secondary-100'
  if (percent.value >= 100) return 'bg-error-100'
  if (percent.value >= 70) return 'bg-warning-100'
  return 'bg-secondary-100'
})

const valueTone = computed(() => {
  if (!isUnlimited.value && percent.value >= 100) return 'text-error-100'
  if (!isUnlimited.value && percent.value >= 70) return 'text-warning-100'
  return 'text-primary-100'
})
</script>
