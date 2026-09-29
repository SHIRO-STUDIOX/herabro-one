<template>
  <div class="flex flex-col items-center gap-2 w-full select-none">
    <div
      class="h-10 bg-white-80 border border-primary-8 rounded-full p-1 flex items-center gap-1 w-full max-w-[360px]"
      role="tablist"
    >
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="tab"
        :aria-selected="modelValue === option.value"
        class="flex-1 h-8 rounded-full flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer outline-none font-dots-1"
        :class="
          modelValue === option.value
            ? 'bg-primary-100 text-white-100 font-bold shadow-2xs'
            : 'text-primary-60 hover:text-primary-100 font-medium'
        "
        @click="$emit('update:modelValue', option.value)"
      >
        <Icon :icon="option.icon" class="w-4 h-4 shrink-0" />
        {{ option.label }}
      </button>
    </div>
    <BaseBadge
      v-if="modelValue === 'ANNUAL'"
      type="primary"
      style-type="soft"
      size="2xs"
      :show-start-icon="true"
      start-icon="solar:gift-bold-duotone"
    >
      ۲ ماه هدیه
    </BaseBadge>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import type { BillingCycle } from '@/types/subscription'

withDefaults(
  defineProps<{
    modelValue?: BillingCycle
  }>(),
  { modelValue: 'MONTHLY' },
)

defineEmits<{
  (e: 'update:modelValue', value: BillingCycle): void
}>()

const options: { value: BillingCycle; label: string; icon: string }[] = [
  { value: 'MONTHLY', label: 'پرداخت ماهانه', icon: 'solar:calendar-linear' },
  { value: 'ANNUAL', label: 'پرداخت سالانه', icon: 'solar:calendar-date-bold-duotone' },
]
</script>
