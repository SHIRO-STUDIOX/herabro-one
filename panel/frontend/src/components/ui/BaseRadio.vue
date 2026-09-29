<template>
  <label
    :for="radioId"
    class="inline-flex items-center transition-all duration-200 select-none font-sans text-right"
    :class="[
      containerClasses,
      computedDisabled
        ? 'cursor-not-allowed pointer-events-none'
        : 'cursor-pointer active:scale-[0.99]',
    ]"
    dir="rtl"
  >
    <!-- Radio Circle Indicator (Right side in RTL) -->
    <div
      class="shrink-0 rounded-full border-solid transition-all duration-200 flex items-center justify-center"
      :class="circleClasses"
    >
      <input
        :id="radioId"
        type="radio"
        :name="name"
        :value="value"
        :checked="isSelected"
        :disabled="computedDisabled"
        class="sr-only"
        @change="handleChange"
      />
    </div>

    <!-- Label / Title Text (Left side in RTL) -->
    <span
      v-if="showLabel && (title || label || $slots.default)"
      class="font-dots-1 whitespace-nowrap truncate flex-1 min-w-0"
      :class="labelClasses"
    >
      <slot>{{ title || label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BaseRadioProps {
  /** Value bound via v-model */
  modelValue?: any
  /** Specific option value when used in a group */
  value?: any
  /** Size variant matching Figma spec: 'xs' (inline 16px), 'lg' (card 40px), '2xl' (card 48px) */
  size?: 'xs' | 'lg' | '2xl'
  /** Explicit state override for design system testing: 'enabled' | 'selected' | 'disabled' */
  state?: 'enabled' | 'selected' | 'disabled' | ''
  /** Title or label text */
  title?: string
  label?: string
  /** Show or hide label */
  showLabel?: boolean
  /** Disabled state boolean */
  disabled?: boolean
  /** Primary or Secondary color theme */
  color?: 'secondary' | 'primary'
  /** Form input name */
  name?: string
  /** Accessibility element ID */
  id?: string
}

const props = withDefaults(defineProps<BaseRadioProps>(), {
  modelValue: undefined,
  value: true,
  size: 'xs',
  state: '',
  title: '',
  label: '',
  showLabel: true,
  disabled: false,
  color: 'secondary',
  name: '',
  id: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}>()

// Random unique ID for accessibility if not provided
const radioId = props.id || `radio-${Math.random().toString(36).substring(2, 9)}`

// Computed selection check
const isSelected = computed(() => {
  if (props.state === 'selected') return true
  if (props.state === 'enabled' || props.state === 'disabled') return false

  if (props.modelValue === undefined || props.modelValue === null) return false
  if (typeof props.modelValue === 'boolean') return props.modelValue === true
  return props.modelValue === props.value
})

// Computed disabled check
const computedDisabled = computed(() => {
  if (props.state === 'disabled') return true
  if (props.state === 'enabled' || props.state === 'selected') return false
  return props.disabled
})

// Effective state name ('disabled' | 'selected' | 'enabled')
const effectiveState = computed(() => {
  if (props.state) return props.state
  if (computedDisabled.value) return 'disabled'
  if (isSelected.value) return 'selected'
  return 'enabled'
})

// Container styling based on size and state (matching Figma Node 2:392)
const containerClasses = computed(() => {
  const st = effectiveState.value
  const sz = props.size

  if (sz === 'xs') {
    // Inline XS layout (height 18px, gap 8px, no background border)
    return 'h-4.5 gap-2 w-auto justify-between'
  }

  if (sz === 'lg') {
    // Card LG layout (height 40px, rounded-2lg 10px, px 12px, gap 8px)
    const baseCard = 'h-10 px-3 rounded-[10px] gap-2 border border-solid w-full justify-between'
    if (st === 'disabled') {
      return `${baseCard} bg-black-6 border-black-8`
    }
    if (st === 'selected') {
      return props.color === 'primary'
        ? `${baseCard} bg-primary-6 border-primary-12`
        : `${baseCard} bg-secondary-8 border-secondary-12`
    }
    // enabled
    return `${baseCard} bg-white-100 border-primary-12 hover:border-primary-24`
  }

  // Card 2XL layout (height 48px, rounded-2lg 10px, px 16px, gap 10px)
  const baseCard2xl = 'h-12 px-4 rounded-[10px] gap-2.5 border border-solid w-full justify-between'
  if (st === 'disabled') {
    return `${baseCard2xl} bg-black-6 border-black-8`
  }
  if (st === 'selected') {
    return props.color === 'primary'
      ? `${baseCard2xl} bg-primary-6 border-primary-12`
      : `${baseCard2xl} bg-secondary-8 border-secondary-12`
  }
  // enabled
  return `${baseCard2xl} bg-white-100 border-primary-12 hover:border-primary-24`
})

// Typography classes matching Figma specs
const labelClasses = computed(() => {
  const st = effectiveState.value
  const sz = props.size

  if (sz === '2xl') {
    // 2xl size: text-base (16px), weight 700, leading 22px
    const font2xl = 'text-base font-bold leading-[22px]'
    if (st === 'disabled') return `${font2xl} text-black-32`
    if (st === 'selected') {
      return props.color === 'primary'
        ? `${font2xl} text-primary-100`
        : `${font2xl} text-secondary-100`
    }
    return `${font2xl} text-primary-80`
  }

  // lg and xs sizes: text-sm (14px), weight 600, leading 18px
  const fontSm = 'text-sm font-semibold leading-[18px]'
  if (st === 'disabled') return `${fontSm} text-black-32`
  if (st === 'selected') {
    return props.color === 'primary' ? `${fontSm} text-primary-100` : `${fontSm} text-secondary-100`
  }
  return `${fontSm} text-primary-80`
})

// Radio Circle indicator styling matching Figma Node 2:392
const circleClasses = computed(() => {
  const st = effectiveState.value
  const sz = props.size

  // Circle Dimensions
  const circleSize = sz === '2xl' ? 'w-5 h-5 min-w-[20px]' : 'w-4 h-4 min-w-[16px]'

  if (st === 'disabled') {
    return `${circleSize} bg-black-6 border border-black-12`
  }

  if (st === 'selected') {
    // Selected state ring styling
    const ringBorder = sz === '2xl' ? 'border-[6px]' : 'border-[5px]'
    const activeColor = props.color === 'primary' ? 'border-primary-100' : 'border-secondary-100'
    return `${circleSize} bg-white-100 ${ringBorder} ${activeColor}`
  }

  // Enabled / Unselected
  return `${circleSize} bg-white-100 border border-primary-24 hover:border-primary-40`
})

const handleChange = () => {
  if (computedDisabled.value) return
  const val = props.value !== undefined ? props.value : true
  emit('update:modelValue', val)
  emit('change', val)
}
</script>
