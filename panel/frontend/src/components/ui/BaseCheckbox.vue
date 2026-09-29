<template>
  <div
    :class="[
      // Base styles matching Figma Checkbox (16px or 12px, rounded 4px)
      'border border-solid flex items-center justify-center shrink-0 transition-all duration-200 select-none cursor-pointer rounded-[4px]',
      sizeClasses,
      stateClasses,
    ]"
    @click="toggleCheck"
  >
    <!-- Clean White Checkmark SVG Vector (Renders when checked) -->
    <svg
      v-if="modelValue"
      :viewBox="size === '12' ? '0 0 12 12' : '0 0 16 16'"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="text-white-100 shrink-0"
      :class="size === '12' ? 'w-2 h-2' : 'w-2.5 h-2.5'"
    >
      <path
        v-if="size === '12'"
        d="M2.5 6L4.5 8L9.5 3"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        v-else
        d="M3.5 8L6.5 11L12.5 4.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * BaseCheckbox Component
 *
 * Reusable checkbox matching Figma Design node 1597:10138.
 * Supports size 16px & 12px, Active/Unselected/Inactive states.
 * Design tokens: Pandora360 Design System
 */

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    size?: '12' | '16'
    disabled?: boolean
    color?: 'primary' | 'secondary'
  }>(),
  {
    modelValue: false,
    size: '16',
    disabled: false,
    color: 'secondary',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const sizeClasses = computed(() => {
  return props.size === '12' ? 'w-3 h-3' : 'w-4 h-4'
})

const stateClasses = computed(() => {
  if (props.disabled) {
    return 'bg-black-6 border-black-8 cursor-not-allowed text-black-32'
  }

  if (props.modelValue) {
    return props.color === 'primary'
      ? 'bg-primary-100 border-primary-100'
      : 'bg-secondary-100 border-secondary-100'
  } else {
    return 'bg-white-100 border-primary-12 hover:border-primary-24'
  }
})

const toggleCheck = () => {
  if (props.disabled) return
  const newVal = !props.modelValue
  emit('update:modelValue', newVal)
  emit('change', newVal)
}
</script>
