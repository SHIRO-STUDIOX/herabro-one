<template>
  <label
    class="inline-flex items-center gap-2 select-none font-sans"
    :class="[
      disabled || loading ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
      labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
    ]"
    dir="rtl"
  >
    <!-- Hidden Accessible Checkbox Input -->
    <input
      type="checkbox"
      role="switch"
      :checked="isChecked"
      :disabled="disabled || loading"
      :aria-checked="isChecked"
      class="sr-only"
      @change="handleChange"
    />

    <!-- Switch Track (Background) -->
    <div
      class="relative rounded-full transition-all duration-200 ease-in-out shrink-0 flex items-center p-0.5 border"
      :class="[
        trackSizeClasses,
        isChecked ? activeTrackClasses : inactiveTrackClasses,
        disabled || loading ? '' : 'active:scale-[0.97]',
      ]"
    >
      <!-- Switch Thumb (Knob / Slider) -->
      <div
        class="rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center bg-white-100"
        :class="[thumbSizeClasses, thumbTranslateClasses]"
      >
        <!-- Loading Spinner in Knob -->
        <Icon
          v-if="loading"
          icon="solar:spinner-bold-duotone"
          class="animate-spin text-primary-60"
          :class="iconSizeClasses"
        />

        <!-- Active Icon -->
        <Icon
          v-else-if="isChecked && (activeIcon || icon)"
          :icon="activeIcon || icon"
          :class="[iconSizeClasses, activeIconColorClasses]"
        />

        <!-- Inactive Icon -->
        <Icon
          v-else-if="!isChecked && (inactiveIcon || icon)"
          :icon="inactiveIcon || icon"
          :class="[iconSizeClasses, inactiveIconColorClasses]"
        />
      </div>
    </div>

    <!-- Optional Label Text -->
    <span
      v-if="label || $slots.default"
      class="font-dots-1 transition-colors"
      :class="[
        labelSizeClasses,
        isChecked ? 'text-primary-100 font-bold' : 'text-primary-60 font-medium',
      ]"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

export type SwitchSize = 'sm' | 'md' | 'lg'
export type SwitchColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'

export interface BaseSwitchProps {
  modelValue?: boolean
  checked?: boolean
  label?: string
  labelPosition?: 'left' | 'right'
  size?: SwitchSize
  color?: SwitchColor
  disabled?: boolean
  loading?: boolean
  icon?: string
  activeIcon?: string
  inactiveIcon?: string
}

const props = withDefaults(defineProps<BaseSwitchProps>(), {
  modelValue: false,
  checked: false,
  label: '',
  labelPosition: 'right',
  size: 'md',
  color: 'secondary',
  disabled: false,
  loading: false,
  icon: '',
  activeIcon: '',
  inactiveIcon: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:checked', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const isChecked = computed(() => {
  return props.modelValue || props.checked
})

const handleChange = (e: Event) => {
  if (props.disabled || props.loading) return
  const target = e.target as HTMLInputElement
  const newVal = target.checked
  emit('update:modelValue', newVal)
  emit('update:checked', newVal)
  emit('change', newVal)
}

// Track dimensions (width × height)
const trackSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-4.5 min-w-[32px]' // 32 × 18 px
    case 'lg':
      return 'w-13 h-7.5 min-w-[52px]' // 52 × 30 px
    case 'md':
    default:
      return 'w-10.5 h-6 min-w-[42px]' // 42 × 24 px
  }
})

// Thumb Knob dimensions
const thumbSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-3.5 h-3.5 min-w-[14px]' // 14 × 14 px
    case 'lg':
      return 'w-6 h-6 min-w-[24px]' // 24 × 24 px
    case 'md':
    default:
      return 'w-5 h-5 min-w-[20px]' // 20 × 20 px
  }
})

// Thumb translation for RTL layout
const thumbTranslateClasses = computed(() => {
  if (!isChecked.value) {
    return 'translate-x-0'
  }
  switch (props.size) {
    case 'sm':
      return '-translate-x-3.5'
    case 'lg':
      return '-translate-x-5.5'
    case 'md':
    default:
      return '-translate-x-4.5'
  }
})

// Active track colors
const activeTrackClasses = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'bg-primary-100 border-primary-100 shadow-inner'
    case 'accent':
      return 'bg-accent-100 border-accent-100 shadow-inner'
    case 'success':
      return 'bg-success-100 border-success-100 shadow-inner'
    case 'warning':
      return 'bg-warning-100 border-warning-100 shadow-inner'
    case 'error':
      return 'bg-error-100 border-error-100 shadow-inner'
    case 'secondary':
    default:
      return 'bg-secondary-100 border-secondary-100 shadow-inner'
  }
})

// Inactive track colors
const inactiveTrackClasses = computed(() => {
  return 'bg-primary-12 border-primary-12 hover:bg-primary-16'
})

// Icon Size in thumb
const iconSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-2.5 h-2.5'
    case 'lg':
      return 'w-4 h-4'
    case 'md':
    default:
      return 'w-3 h-3'
  }
})

// Active icon color
const activeIconColorClasses = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'text-primary-100'
    case 'accent':
      return 'text-accent-100'
    case 'success':
      return 'text-success-100'
    case 'warning':
      return 'text-warning-100'
    case 'error':
      return 'text-error-100'
    case 'secondary':
    default:
      return 'text-secondary-100'
  }
})

const inactiveIconColorClasses = computed(() => {
  return 'text-primary-40'
})

// Label text sizes
const labelSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-2xs'
    case 'lg':
      return 'text-sm'
    case 'md':
    default:
      return 'text-xs'
  }
})
</script>
