<template>
  <div class="flex flex-col w-full" :class="[disabled ? 'pointer-events-none' : '']" dir="rtl">
    <!-- Label & Link (For Outside titleState) -->
    <div
      v-if="titleState === 'out' && (title || linkLabel || $slots.title || $slots.link)"
      class="flex items-center justify-between mb-1.5 w-full select-none"
    >
      <!-- Title / Label (Right in RTL) -->
      <label
        v-if="title || $slots.title"
        :for="inputId"
        class="text-sm font-semibold inline-flex items-center gap-0.5"
        :class="[disabled ? 'text-black-32' : error ? 'text-error-80' : 'text-primary-80']"
      >
        <slot name="title">{{ title }}</slot>
        <span v-if="required" class="text-error-100 font-bold leading-none select-none mr-0.5"
          >*</span
        >
      </label>

      <!-- Link (Left in RTL) -->
      <span class="inline-flex items-center">
        <slot name="link">
          <button
            v-if="linkLabel"
            type="button"
            class="text-xs font-semibold cursor-pointer transition-colors outline-none"
            :class="[
              disabled
                ? 'text-black-32'
                : 'text-primary-100 hover:text-secondary-100 active:scale-95',
            ]"
            @click="$emit('link-click')"
          >
            {{ linkLabel }}
          </button>
        </slot>
      </span>
    </div>

    <!-- Main Content Input Container -->
    <div
      class="relative flex items-center w-full border border-solid transition-all duration-200"
      :class="[
        // Size-specific height and padding
        sizeContentClasses,

        // Shape corner radius
        rounded ? 'rounded-full px-4' : 'rounded-[10px] px-3',

        // State-specific colors and borders
        borderClasses,
      ]"
    >
      <!-- Start Icon (Right side in RTL) -->
      <span
        v-if="showStartIcon || $slots.start"
        class="inline-flex items-center justify-center shrink-0 select-none"
        :class="[disabled ? 'opacity-32' : 'opacity-40 text-primary-100']"
      >
        <slot name="start">
          <Icon
            :icon="startIcon || 'solar:magnifer-linear'"
            :class="size === '3xl' ? 'w-5 h-5' : 'w-4 h-4'"
          />
        </slot>
      </span>

      <!-- Middle Input + Floating Label Area -->
      <div class="relative flex-1 h-full min-w-0">
        <!-- Floating Label (For Inside titleState) -->
        <label
          v-if="titleState === 'in' && (title || $slots.title)"
          :for="inputId"
          class="absolute right-0 origin-top-right transition-all duration-200 ease-out select-none pointer-events-none inline-flex items-center gap-0.5"
          :class="[
            isFloating ? floatingLabelPositionClasses : centeredLabelPositionClasses,
            disabled ? 'text-black-32' : error ? 'text-error-80' : 'text-primary-40',
          ]"
        >
          <slot name="title">{{ title }}</slot>
          <span v-if="required" class="text-error-100 font-bold leading-none select-none mr-0.5"
            >*</span
          >
        </label>

        <!-- The Actual Input Element -->
        <input
          :id="inputId"
          ref="inputRef"
          :type="type"
          :inputmode="inputmode"
          :value="modelValue"
          :disabled="disabled"
          :placeholder="computedPlaceholder"
          class="w-full h-full bg-transparent border-none outline-none font-sans text-sm font-medium transition-all duration-200 leading-none"
          :class="[
            type === 'number' || type === 'email'
              ? 'text-left [direction:ltr]'
              : type === 'tel'
                ? 'tel-input'
                : 'text-right',
            // Padding adjustments for floating label
            titleState === 'in' ? inputPaddingClasses : '',
            disabled
              ? 'text-black-32 placeholder-black-32'
              : 'text-primary-80 placeholder-primary-40',
          ]"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>

      <!-- End Icon (Left side in RTL) -->
      <span
        v-if="showEndIcon || $slots.end"
        class="inline-flex items-center justify-center shrink-0 cursor-pointer select-none"
        :class="[
          disabled
            ? 'opacity-32'
            : 'opacity-40 hover:opacity-100 text-primary-100 transition-opacity',
        ]"
        @click="$emit('end-icon-click')"
      >
        <slot name="end">
          <Icon :icon="endIcon || 'solar:plain-2-linear'" class="w-4 h-4" />
        </slot>
      </span>
    </div>

    <!-- Hint & Error Labels below the input -->
    <div
      v-if="(hint || error) && (showHint || showError)"
      class="flex flex-col gap-[2px] items-start px-3 mt-1.5 select-none"
    >
      <!-- Hint Label (Normal info) -->
      <span
        v-if="hint && showHint && !error"
        class="text-[10px] font-medium leading-[14px]"
        :class="[disabled ? 'text-black-32' : 'text-primary-40']"
      >
        {{ hint }}
      </span>

      <!-- Error Label (Highest priority) -->
      <span v-if="error && showError" class="text-[10px] font-medium leading-[14px] text-error-80">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    // Model value binding
    modelValue?: string | number
    // HTML input type
    type?: string
    // inputmode attribute
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    // Size: lg (40px), 2xl (48px), 3xl (56px)
    size?: 'lg' | '2xl' | '3xl'
    // Label / title text
    title?: string
    // Label Position: 'in' (floating inside) | 'out' (static outside above input)
    titleState?: 'in' | 'out'
    // Required field indicator
    required?: boolean
    // Pill shape vs standard rounded-xl
    rounded?: boolean
    // Disabled state
    disabled?: boolean
    // Error message
    error?: string
    // Visibility of error message
    showError?: boolean
    // Hint message
    hint?: string
    // Visibility of hint message
    showHint?: boolean
    // Visibility and names of standard icons
    showStartIcon?: boolean
    showEndIcon?: boolean
    startIcon?: string
    endIcon?: string
    // Optional button link label and behavior (when titleState is 'out')
    linkLabel?: string
    // Custom placeholder (only visible when label is floating or titleState is 'out')
    placeholder?: string
    // Optional custom ID for accessibility
    id?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    size: '2xl',
    title: '',
    titleState: 'in',
    required: false,
    rounded: false,
    disabled: false,
    error: '',
    showError: true,
    hint: '',
    showHint: true,
    showStartIcon: false,
    showEndIcon: false,
    startIcon: '',
    endIcon: '',
    linkLabel: '',
    placeholder: '',
    id: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'input', event: Event): void
  (e: 'link-click'): void
  (e: 'end-icon-click'): void
}>()

// Define slots for TypeScript compilation safety
defineSlots<{
  title?: () => any
  link?: () => any
  start?: () => any
  end?: () => any
}>()

// Internal state tracking
const isFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// ID generation for accessibility
const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`

// Has value check
const hasValue = computed(() => {
  return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''
})

// Floating trigger check
const isFloating = computed(() => {
  return isFocused.value || hasValue.value
})

// Computed placeholder logic
const computedPlaceholder = computed(() => {
  if (props.titleState === 'in') {
    // Show placeholder only when floating (focused/filled) to avoid collision
    return isFloating.value ? props.placeholder : ''
  }
  return props.placeholder
})

// Sizing Content classes
const sizeContentClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'h-10 min-h-[40px]'
    case '3xl':
      return 'h-14 min-h-[56px]'
    case '2xl':
    default:
      return 'h-12 min-h-[48px]'
  }
})

// Input Padding top/bottom logic when label is floating inside
const inputPaddingClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'pt-3.5 pb-0.5'
    case '3xl':
      return 'pt-5 pb-1.5'
    case '2xl':
    default:
      return 'pt-4.5 pb-1'
  }
})

// Label positions (Centered vs Floating)
const centeredLabelPositionClasses = computed(() => {
  return 'top-1/2 -translate-y-1/2 text-sm'
})

const floatingLabelPositionClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'top-1 translate-y-0 text-[10px] scale-90'
    case '3xl':
      return 'top-2 translate-y-0 text-[10px] scale-90'
    case '2xl':
    default:
      return 'top-1.5 translate-y-0 text-[10px] scale-90'
  }
})

// Border and Background classes matching design system
const borderClasses = computed(() => {
  if (props.disabled) {
    return 'bg-black-6 border-transparent'
  }
  if (props.error) {
    return 'bg-white-100 border-error-100 ring-2 ring-error-8/10'
  }
  if (isFocused.value) {
    return 'bg-white-100 border-primary-100 ring-4 ring-primary-6'
  }
  return 'bg-white-100 border-primary-12 hover:border-primary-32'
})

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

defineExpose({
  inputRef,
})
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera input reset */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Tel input dynamic alignment */
.tel-input {
  text-align: right !important;
  direction: rtl !important;
}
.tel-input:not(:placeholder-shown) {
  text-align: left !important;
  direction: ltr !important;
}
</style>
