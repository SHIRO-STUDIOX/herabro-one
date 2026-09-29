<template>
  <div
    v-if="showLabel || showStartIcon"
    :class="[
      // Base styles
      'inline-flex items-center justify-center font-sans select-none rounded-full shrink-0 border border-transparent',
      borderStyleClass,

      // Dynamic sizing and styling classes
      sizeClasses,
      variantClasses,
    ]"
  >
    <!-- Start Icon (RTL: Renders on the RIGHT) -->
    <span
      v-if="showStartIcon || $slots.start"
      class="inline-flex items-center justify-center shrink-0"
      :class="[
        // Spacing between start icon and text
        showLabel && $slots.default ? 'ml-1' : '',
      ]"
    >
      <slot name="start">
        <Icon :icon="startIcon || 'solar:bell-bing-bold-duotone'" :style="iconSizeStyle" />
      </slot>
    </span>

    <!-- Badge Text (Label) -->
    <span v-if="showLabel && $slots.default" class="whitespace-nowrap leading-none">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

export interface BaseBadgeProps {
  styleType?: 'soft' | 'fill'
  size?: '2xs' | 'xs' | 'sm' | 'lg'
  type?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'white'
  showStartIcon?: boolean
  showLabel?: boolean
  startIcon?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
}

defineSlots<{
  default?: (props: {}) => any
  start?: (props: {}) => any
}>()

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  styleType: 'soft',
  size: 'sm',
  type: 'primary',
  showStartIcon: false,
  showLabel: true,
  startIcon: '',
  borderStyle: 'solid',
})

const borderStyleClass = computed(() => {
  switch (props.borderStyle) {
    case 'dashed':
      return 'border-dashed'
    case 'dotted':
      return 'border-dotted'
    case 'none':
      return 'border-none'
    case 'solid':
    default:
      return 'border-solid'
  }
})

// Size & Typography mapping
const sizeClasses = computed(() => {
  switch (props.size) {
    case '2xs':
      // 2xs: h-16px, px-4px, font-size 10px (text-2xs), font-weight 600
      return 'h-4 px-1 text-[10px] font-semibold'
    case 'xs':
      // xs: h-16px, px-6px, font-size 12px (text-xs), font-weight 600
      return 'h-4 px-1.5 text-xs font-semibold'
    case 'lg':
      // lg: h-40px, px-8px, font-size 14px (text-sm), font-weight 700
      return 'h-10 px-2.5 text-sm font-bold'
    case 'sm':
    default:
      // sm: h-24px, px-6px, font-size 12px (text-xs), font-weight 600
      return 'h-6 px-1.5 text-xs font-semibold'
  }
})

// Icon Sizes mapping
const iconSizeStyle = computed(() => {
  let size = '12px'
  if (props.size === '2xs') size = '8px'
  else if (props.size === 'xs') size = '10px'
  else if (props.size === 'lg') size = '20px'
  return { width: size, height: size }
})

// Variant (Style & Color Type) mapping
const variantClasses = computed(() => {
  const style = props.styleType
  const colorType = props.type

  // Fill Style (Solid color bg, white text)
  if (style === 'fill') {
    switch (colorType) {
      case 'secondary':
        return 'bg-secondary-100 text-white-100'
      case 'accent':
        return 'bg-accent-100 text-white-100'
      case 'info':
        return 'bg-info-100 text-white-100'
      case 'success':
        return 'bg-success-100 text-white-100'
      case 'warning':
        return 'bg-warning-100 text-white-100'
      case 'error':
        return 'bg-error-100 text-white-100'
      case 'white':
        return 'bg-white-100 text-black-100 border-black-12'
      case 'primary':
      default:
        return 'bg-primary-100 text-white-100'
    }
  }

  // Soft Style (Light opacity bg, solid color text, backdrop-blur)
  if (style === 'soft') {
    switch (colorType) {
      case 'primary':
        return 'backdrop-blur-md bg-primary-6 text-primary-100'
      case 'secondary':
        return 'backdrop-blur-md bg-secondary-8 text-secondary-100'
      case 'accent':
        return 'backdrop-blur-md bg-accent-6 text-accent-100'
      case 'info':
        return 'backdrop-blur-md bg-info-8 text-info-100'
      case 'success':
        return 'backdrop-blur-md bg-success-8 text-success-100'
      case 'warning':
        return 'backdrop-blur-md bg-warning-8 text-warning-100'
      case 'error':
        return 'backdrop-blur-md bg-error-6 text-error-100'
      case 'white':
        // white soft badge in Figma uses 40% white opacity background (bg-white-40) and primary text
        return 'backdrop-blur-md bg-white-40 text-primary-100'
      default:
        return 'backdrop-blur-md bg-primary-6 text-primary-100'
    }
  }

  return ''
})
</script>
