<template>
  <BaseTooltip :text="resolvedTooltip" :placement="tooltipPlacement" :disabled="!resolvedTooltip">
    <div
      v-bind="chipAttrs"
      class="inline-flex items-center justify-center transition-all duration-150 select-none font-sans text-right shrink-0"
      :class="[
        sizeClasses,
        shapeClasses,
        themeStateClasses,
        computedDisabled
          ? 'cursor-not-allowed pointer-events-none opacity-32 text-black-32 bg-transparent border-black-8'
          : 'cursor-pointer active:scale-[0.97]',
      ]"
      dir="rtl"
      @click="handleClick"
    >
      <!-- Start Icon (Right side in RTL) -->
      <Icon
        v-if="showStartIcon && (startIcon || $slots.startIcon)"
        :icon="startIcon || 'solar:tag-bold-duotone'"
        class="shrink-0 transition-opacity"
        :class="iconSizeClasses"
      />
      <slot name="startIcon"></slot>

      <!-- Main Label Text -->
      <span class="truncate font-dots-1" :class="labelFontClasses">
        <slot>{{ label }}</slot>
      </span>

      <!-- End Icon / Remove Button (Left side in RTL) -->
      <BaseTooltip v-if="removable" text="حذف">
        <button
          type="button"
          class="shrink-0 flex items-center justify-center transition-colors rounded-full hover:opacity-100 opacity-70 p-0.5 cursor-pointer ml-0.5"
          @click.stop="handleRemove"
        >
          <Icon icon="solar:close-circle-bold" :class="removeIconSizeClasses" />
        </button>
      </BaseTooltip>
      <template v-else-if="showEndIcon && (endIcon || $slots.endIcon)">
        <Icon
          :icon="endIcon || 'solar:alt-arrow-left-linear'"
          class="shrink-0 opacity-70"
          :class="iconSizeClasses"
        />
        <slot name="endIcon"></slot>
      </template>
    </div>
  </BaseTooltip>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export type ChipSize = 'sm' | 'md'
export type ChipVariant = 'fill' | 'outline'
export type ChipType = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type ChipState = 'enabled' | 'hovered' | 'selected' | 'disabled' | ''

export interface BaseChipProps {
  /** Size variant: 'sm' (24px height) or 'md' (32px height) */
  size?: ChipSize
  /** Style variant: 'fill' (soft background fill) or 'outline' (border outline) */
  variant?: ChipVariant
  /** Color theme type: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' */
  type?: ChipType
  /** Pill shape toggle (true = rounded-full 9999px, false = rounded-lg 8px) */
  pill?: boolean
  /** Explicit test state override: 'enabled' | 'hovered' | 'selected' | 'disabled' | '' */
  state?: ChipState
  /** Main chip text label */
  label?: string
  /** Start icon name */
  startIcon?: string
  /** End icon name */
  endIcon?: string
  /** Show start icon */
  showStartIcon?: boolean
  /** Show end icon */
  showEndIcon?: boolean
  /** Enable close X remove button */
  removable?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Selected active state */
  selected?: boolean
  /** Design-system tooltip text (falls back to native `title` attr) */
  tooltip?: string
  /** Tooltip placement */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<BaseChipProps>(), {
  size: 'md',
  variant: 'fill',
  type: 'primary',
  pill: true,
  state: '',
  label: 'برچسب',
  startIcon: '',
  endIcon: '',
  showStartIcon: false,
  showEndIcon: false,
  removable: false,
  disabled: false,
  selected: false,
  tooltip: '',
  tooltipPlacement: 'top',
})

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

// Tooltip: explicit prop wins, otherwise upgrade native `title` fallthrough attr
const resolvedTooltip = computed(() => props.tooltip || (attrs.title as string) || '')
const chipAttrs = computed(() => {
  const { title: _title, ...rest } = attrs
  return rest
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'remove', event: MouseEvent): void
}>()

// Computed disabled check
const computedDisabled = computed(() => {
  if (props.state === 'disabled') return true
  if (props.state === 'enabled' || props.state === 'selected' || props.state === 'hovered')
    return false
  return props.disabled
})

// Effective state
const effectiveState = computed(() => {
  if (props.state) return props.state
  if (computedDisabled.value) return 'disabled'
  if (props.selected) return 'selected'
  return 'enabled'
})

// Size container classes (sm: 24px / h-6, md: 32px / h-8 matching Figma Node 4:29175)
const sizeClasses = computed(() => {
  if (props.size === 'sm') {
    return 'h-6 h-[24px] min-h-[24px] max-h-[24px] px-2.5 gap-1 text-xs'
  }
  // md size (32px height)
  return 'h-8 h-[32px] min-h-[32px] max-h-[32px] px-3.5 gap-1.5 text-xs sm:text-sm'
})

// Icon sizing
const iconSizeClasses = computed(() => {
  return props.size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
})

const removeIconSizeClasses = computed(() => {
  return props.size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'
})

// Font sizing and weight
const labelFontClasses = computed(() => {
  const isBold = effectiveState.value === 'selected' || effectiveState.value === 'hovered'
  const weightClass = isBold ? 'font-bold' : 'font-medium'
  return props.size === 'sm'
    ? `text-xs leading-4 ${weightClass}`
    : `text-xs sm:text-sm leading-4.5 ${weightClass}`
})

// Shape classes (Pill vs Low Radius)
const shapeClasses = computed(() => {
  return props.pill ? 'rounded-full' : 'rounded-lg'
})

// Theme, Variant, and State Classes matching Figma Node 4:29175 Token Definitions
const themeStateClasses = computed(() => {
  const st = effectiveState.value
  const tp = props.type
  const vr = props.variant

  if (st === 'disabled') {
    return 'opacity-32 text-black-32 bg-transparent border border-black-8 cursor-not-allowed'
  }

  // Define Theme Token Map for 7 Colors
  const tokens: Record<
    ChipType,
    {
      fillBg: string
      fillHoverBg: string
      fillSelectBg: string
      fillBorder: string
      text: string
      outlineBorder: string
      outlineHoverBg: string
      outlineSelectBg: string
    }
  > = {
    primary: {
      fillBg: 'bg-primary-8',
      fillHoverBg: 'bg-primary-12',
      fillSelectBg: 'bg-primary-12',
      fillBorder: 'border border-primary-24',
      text: 'text-primary-100',
      outlineBorder: 'border border-primary-24',
      outlineHoverBg: 'bg-primary-6',
      outlineSelectBg: 'bg-primary-12',
    },
    secondary: {
      fillBg: 'bg-secondary-8',
      fillHoverBg: 'bg-secondary-12',
      fillSelectBg: 'bg-secondary-12',
      fillBorder: 'border border-secondary-24',
      text: 'text-secondary-100',
      outlineBorder: 'border border-secondary-24',
      outlineHoverBg: 'bg-secondary-6',
      outlineSelectBg: 'bg-secondary-12',
    },
    accent: {
      fillBg: 'bg-[#0e7490]/10',
      fillHoverBg: 'bg-[#0e7490]/15',
      fillSelectBg: 'bg-[#0e7490]/20',
      fillBorder: 'border border-[#0e7490]/30',
      text: 'text-[#0e7490]',
      outlineBorder: 'border border-[#0e7490]/30',
      outlineHoverBg: 'bg-[#0e7490]/8',
      outlineSelectBg: 'bg-[#0e7490]/15',
    },
    info: {
      fillBg: 'bg-[#2590b8]/10',
      fillHoverBg: 'bg-[#2590b8]/15',
      fillSelectBg: 'bg-[#2590b8]/20',
      fillBorder: 'border border-[#2590b8]/30',
      text: 'text-[#2590b8]',
      outlineBorder: 'border border-[#2590b8]/30',
      outlineHoverBg: 'bg-[#2590b8]/8',
      outlineSelectBg: 'bg-[#2590b8]/15',
    },
    success: {
      fillBg: 'bg-[#16a34a]/10',
      fillHoverBg: 'bg-[#16a34a]/15',
      fillSelectBg: 'bg-[#16a34a]/20',
      fillBorder: 'border border-[#16a34a]/30',
      text: 'text-[#16a34a]',
      outlineBorder: 'border border-[#16a34a]/30',
      outlineHoverBg: 'bg-[#16a34a]/8',
      outlineSelectBg: 'bg-[#16a34a]/15',
    },
    warning: {
      fillBg: 'bg-[#d97706]/10',
      fillHoverBg: 'bg-[#d97706]/15',
      fillSelectBg: 'bg-[#d97706]/20',
      fillBorder: 'border border-[#d97706]/30',
      text: 'text-[#d97706]',
      outlineBorder: 'border border-[#d97706]/30',
      outlineHoverBg: 'bg-[#d97706]/8',
      outlineSelectBg: 'bg-[#d97706]/15',
    },
    error: {
      fillBg: 'bg-error-8',
      fillHoverBg: 'bg-error-12',
      fillSelectBg: 'bg-error-12',
      fillBorder: 'border border-error-24',
      text: 'text-error-100',
      outlineBorder: 'border border-error-24',
      outlineHoverBg: 'bg-error-6',
      outlineSelectBg: 'bg-error-12',
    },
  }

  const tk = tokens[tp] || tokens.primary

  if (vr === 'outline') {
    if (st === 'selected') {
      return `${tk.outlineSelectBg} ${tk.text} ${tk.outlineBorder} font-bold shadow-2xs`
    }
    if (st === 'hovered') {
      return `${tk.outlineHoverBg} ${tk.text} ${tk.outlineBorder} font-bold`
    }
    return `bg-transparent ${tk.text} ${tk.outlineBorder} hover:${tk.outlineHoverBg}`
  }

  // Fill Style (Default)
  if (st === 'selected') {
    return `${tk.fillSelectBg} ${tk.text} ${tk.fillBorder} font-bold shadow-2xs`
  }
  if (st === 'hovered') {
    return `${tk.fillHoverBg} ${tk.text} font-bold`
  }
  return `${tk.fillBg} ${tk.text} hover:${tk.fillHoverBg}`
})

const handleClick = (e: MouseEvent) => {
  if (computedDisabled.value) return
  emit('click', e)
}

const handleRemove = (e: MouseEvent) => {
  if (computedDisabled.value) return
  emit('remove', e)
}
</script>
