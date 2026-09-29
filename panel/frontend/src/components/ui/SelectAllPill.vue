<template>
  <button
    :class="[
      // Base styles matching Figma SelectAllRow (h-24px, px-8px, py-4px, rounded-full, gap-4px)
      'inline-flex items-center justify-center gap-1 h-6 px-2 py-1 rounded-full border border-solid transition-all duration-300 select-none outline-none cursor-pointer',
      stateClasses,
    ]"
    :disabled="disabled"
    dir="rtl"
    @click="toggleCheck"
  >
    <!-- Checkbox Component (Size 12px, 1st child in RTL renders on the right) -->
    <BaseCheckbox
      :model-value="modelValue"
      size="12"
      :disabled="disabled"
      class="pointer-events-none"
    />

    <!-- Pill Label (10px, font-semibold, leading-3.5) -->
    <span
      class="text-[10px] font-semibold leading-3.5 font-dots-1 transition-colors whitespace-nowrap"
    >
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCheckbox from './BaseCheckbox.vue'

/**
 * SelectAllPill Component
 *
 * Reusable Select-All row pill matching Figma Design node 1623:10315.
 * Features customizable label ("انتخاب کل" / "انتخاب همه") and toggles active state.
 * Design tokens: Pandora360 Design System
 */

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    label: 'انتخاب کل',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const stateClasses = computed(() => {
  if (props.disabled) {
    return 'bg-black-6 border-black-8 text-black-32 cursor-not-allowed'
  }

  if (props.modelValue) {
    return 'bg-secondary-6 border-transparent text-secondary-100 hover:bg-secondary-12'
  } else {
    return 'bg-white-100 border-primary-6 text-primary-100 hover:border-primary-12'
  }
})

const toggleCheck = () => {
  if (props.disabled) return
  const newVal = !props.modelValue
  emit('update:modelValue', newVal)
  emit('change', newVal)
}
</script>
