<template>
  <div
    class="flex items-center transition-all duration-150 select-none font-sans text-right"
    :class="[
      sizeClasses,
      stateClasses,
      centered ? 'justify-center text-center' : 'justify-between text-right',
      computedDisabled
        ? 'cursor-not-allowed pointer-events-none opacity-32 text-black-32 bg-transparent'
        : 'cursor-pointer active:scale-[0.995]',
    ]"
    dir="rtl"
    @click="handleClick"
  >
    <!-- Right Section in RTL: Start Icon & Label -->
    <div
      class="flex items-center gap-1.5 truncate min-w-0"
      :class="centered ? 'justify-center w-full' : 'flex-1'"
    >
      <!-- Start Icon -->
      <Icon
        v-if="showStartIcon && (startIcon || $slots.startIcon)"
        :icon="startIcon || 'solar:user-circle-bold-duotone'"
        class="shrink-0 transition-opacity"
        :class="iconSizeClasses"
      />
      <slot name="startIcon"></slot>

      <!-- Main Label Text -->
      <span class="truncate font-dots-1" :class="labelFontClasses">
        <slot>{{ label }}</slot>
      </span>
    </div>

    <!-- Left Section in RTL: Secondary Label / KBD Shortcuts / Switch / End Icon -->
    <div
      v-if="
        !centered &&
        (showSecondaryLabel ||
          secondaryLabel ||
          showKeyboardShortcut ||
          keyboardShortcut ||
          showSwitchButton ||
          showEndIcon ||
          endIcon ||
          $slots.endIcon)
      "
      class="flex items-center gap-1.5 shrink-0 mr-2"
    >
      <!-- Secondary Label Text -->
      <span
        v-if="showSecondaryLabel || secondaryLabel"
        class="text-2xs font-medium opacity-60 font-dots-1 truncate"
      >
        {{ secondaryLabel }}
      </span>

      <!-- KBD Keyboard Shortcuts -->
      <div v-if="showKeyboardShortcut || keyboardShortcut" class="flex items-center gap-1 dir-ltr">
        <span
          v-for="(key, idx) in kbdKeys"
          :key="idx"
          class="h-6 min-w-[24px] px-1.5 rounded-md text-xs font-bold font-mono bg-primary-6 border border-primary-8 text-primary-40 shadow-2xs flex items-center justify-center leading-none"
        >
          {{ key }}
        </span>
      </div>

      <!-- Mini Switch Button -->
      <div
        v-if="showSwitchButton"
        class="w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer flex items-center"
        :class="switchValue ? 'bg-primary-100 justify-end' : 'bg-primary-12 justify-start'"
        @click.stop="handleSwitchToggle"
      >
        <div class="w-3 h-3 rounded-full bg-white-100 shadow-xs"></div>
      </div>

      <!-- End Arrow Icon -->
      <Icon
        v-if="(showEndIcon || endIcon) && !$slots.endIcon"
        :icon="endIcon || 'solar:alt-arrow-left-linear'"
        class="w-3 h-3 opacity-60 shrink-0"
      />
      <slot name="endIcon"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

export interface BaseDropdownItemProps {
  /** Size variant matching Figma spec: 'xs' (20px) | 'sm' (28px) | 'md' (32px) */
  size?: 'xs' | 'sm' | 'md'
  /** Color theme type: 'primary' | 'secondary' | 'error' */
  type?: 'primary' | 'secondary' | 'error'
  /** Explicit state override for design system testing: 'enabled' | 'hovered' | 'selected' | 'disabled' */
  state?: 'enabled' | 'hovered' | 'selected' | 'disabled' | ''
  /** Main label title */
  label?: string
  /** Secondary subtitle label */
  secondaryLabel?: string
  /** Start icon name */
  startIcon?: string
  /** End icon name */
  endIcon?: string
  /** Show start icon */
  showStartIcon?: boolean
  /** Show end icon */
  showEndIcon?: boolean
  /** Show secondary label */
  showSecondaryLabel?: boolean
  /** Keyboard shortcut text (e.g. '⌘+S' or 'Ctrl+C' or array) */
  keyboardShortcut?: string | string[]
  /** Show keyboard shortcut badge */
  showKeyboardShortcut?: boolean
  /** Show mini toggle switch button */
  showSwitchButton?: boolean
  /** Mini switch value */
  switchValue?: boolean
  /** Centered content alignment */
  centered?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Selected active state */
  selected?: boolean
}

const props = withDefaults(defineProps<BaseDropdownItemProps>(), {
  size: 'sm',
  type: 'primary',
  state: '',
  label: 'برچسب',
  secondaryLabel: '',
  startIcon: '',
  endIcon: '',
  showStartIcon: true,
  showEndIcon: false,
  showSecondaryLabel: false,
  keyboardShortcut: '',
  showKeyboardShortcut: false,
  showSwitchButton: false,
  switchValue: false,
  centered: false,
  disabled: false,
  selected: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'update:switchValue', value: boolean): void
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

// KBD Keys array
const kbdKeys = computed(() => {
  if (Array.isArray(props.keyboardShortcut)) return props.keyboardShortcut
  if (typeof props.keyboardShortcut === 'string' && props.keyboardShortcut) {
    return props.keyboardShortcut.split('+').map((k) => k.trim())
  }
  return []
})

// Size container classes (xs: 20px, sm: 28px, md: 32px matching Figma Node 21:33974)
const sizeClasses = computed(() => {
  if (props.size === 'xs') {
    return 'h-5 h-[20px] min-h-[20px] max-h-[20px] px-2 gap-1 rounded-lg text-xs'
  }
  if (props.size === 'md') {
    return 'h-8 h-[32px] min-h-[32px] max-h-[32px] px-2 gap-1.5 rounded-md text-xs sm:text-sm'
  }
  // sm size (28px height)
  return 'h-7 h-[28px] min-h-[28px] max-h-[28px] px-2.5 gap-1.5 rounded-lg text-xs sm:text-sm'
})

// Icon sizing
const iconSizeClasses = computed(() => {
  return props.size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'
})

// Font sizing and weight
const labelFontClasses = computed(() => {
  const isBold = effectiveState.value === 'selected' || effectiveState.value === 'hovered'
  const weightClass = isBold ? 'font-bold' : 'font-semibold'
  return props.size === 'xs'
    ? `text-2xs leading-4 ${weightClass}`
    : `text-xs sm:text-sm leading-4.5 ${weightClass}`
})

// State & Type classes matching Figma Node 3:17561
const stateClasses = computed(() => {
  const st = effectiveState.value
  const tp = props.type

  if (st === 'disabled') {
    return 'opacity-32 text-black-32 bg-transparent cursor-not-allowed'
  }

  // Type: Error (#dc2626)
  if (tp === 'error') {
    if (st === 'selected') {
      return 'bg-error-12 text-error-100 border border-error-12 font-bold'
    }
    if (st === 'hovered') {
      return 'bg-error-6 text-error-100 font-bold'
    }
    return 'text-error-100 bg-transparent hover:bg-error-6'
  }

  // Type: Secondary (#6750a4)
  if (tp === 'secondary') {
    if (st === 'selected') {
      return 'bg-secondary-12 text-secondary-100 border border-secondary-12 font-bold'
    }
    if (st === 'hovered') {
      return 'bg-secondary-6 text-secondary-100 font-bold'
    }
    return 'text-secondary-100 bg-transparent hover:bg-secondary-6'
  }

  // Type: Primary (Default Hesabro Token)
  if (st === 'selected') {
    return 'bg-primary-8 text-primary-100 font-bold'
  }
  if (st === 'hovered') {
    return 'bg-primary-6 text-primary-100 font-bold'
  }
  return 'text-primary-100 bg-transparent hover:bg-primary-6'
})

const handleClick = (e: MouseEvent) => {
  if (computedDisabled.value) return
  if (props.showSwitchButton) {
    emit('update:switchValue', !props.switchValue)
  }
  emit('click', e)
}

const handleSwitchToggle = () => {
  if (computedDisabled.value) return
  emit('update:switchValue', !props.switchValue)
}
</script>
