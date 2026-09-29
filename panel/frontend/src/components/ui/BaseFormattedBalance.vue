<template>
  <div class="flex items-baseline gap-1">
    <span
      class="font-mono font-black tabular-nums tracking-tight truncate"
      :class="[textSizeClass, colorClass]"
    >
      {{ formattedAmount }}
    </span>
    <span
      v-if="showSuffix"
      class="text-2xs font-bold font-dots-1 shrink-0 text-primary-60"
    >
      {{ suffix }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency } from '@/utils/formatters'

export interface BaseFormattedBalanceProps {
  amount: number | string | undefined | null
  size?: 'xs' | 'sm' | 'base' | 'lg'
  showSuffix?: boolean
  suffix?: string
  showAbs?: boolean
  useParenthesis?: boolean
}

const props = withDefaults(defineProps<BaseFormattedBalanceProps>(), {
  size: 'xs',
  showSuffix: true,
  suffix: 'ریال',
  showAbs: false,
  useParenthesis: false,
})

const numAmount = computed(() => Number(props.amount) || 0)

const colorClass = computed(() => {
  if (numAmount.value > 0) return 'text-success-100'
  if (numAmount.value < 0) return 'text-error-100'
  return 'text-primary-100'
})

const textSizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'text-xs'
    case 'sm': return 'text-sm'
    case 'base': return 'text-base'
    case 'lg': return 'text-lg'
    default: return 'text-xs'
  }
})

const formattedAmount = computed(() => {
  if (props.useParenthesis && numAmount.value < 0) {
    return `(${formatCurrency(numAmount.value)})`
  }
  const val = props.showAbs ? Math.abs(numAmount.value) : numAmount.value
  return formatCurrency(val)
})
</script>
