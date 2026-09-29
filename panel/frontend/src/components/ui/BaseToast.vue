<template>
  <Transition :name="transitionName">
    <div
      v-if="isVisible"
      :class="[
        // Layout and Base styles
        'font-sans select-none flex items-center transition-all duration-300',
        fixed ? fixedPositionClasses : 'w-full',
        containerSizeClasses,
        containerStyleClasses,
        roundedClasses,
      ]"
      :style="customContainerStyles"
      dir="rtl"
      role="alert"
    >
      <!-- Icon Container -->
      <div
        v-if="showIcon || $slots.icon"
        class="shrink-0 flex items-center justify-center transition-transform"
        :class="[iconWrapperSizeClasses, iconWrapperStyleClasses, iconRoundedClasses]"
        :style="customIconStyles"
      >
        <slot name="icon">
          <Icon :icon="resolvedIcon" :style="iconDimensions" />
        </slot>
      </div>

      <!-- Content Area (Title & Message / Default Slot) -->
      <div class="flex-1 flex flex-col justify-center min-w-0 pr-1 text-right">
        <!-- Title -->
        <h5
          v-if="title || $slots.title"
          :class="['font-bold font-dots-1 leading-tight truncate', titleTextClasses]"
        >
          <slot name="title">{{ title }}</slot>
        </h5>

        <!-- Message / Description -->
        <div
          v-if="message || $slots.default"
          :class="['font-dots-1 leading-relaxed whitespace-pre-wrap', title ? 'mt-0.5' : '', messageTextClasses]"
        >
          <slot>{{ message }}</slot>
        </div>
      </div>

      <!-- Optional Action Button -->
      <div v-if="actionLabel || $slots.action" class="shrink-0 flex items-center mr-2">
        <slot name="action">
          <button
            type="button"
            class="px-2.5 py-1 rounded-xl text-xs font-bold font-dots-1 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
            :class="actionButtonClasses"
            @click="handleActionClick"
          >
            <Icon v-if="actionIcon" :icon="actionIcon" class="w-3.5 h-3.5" />
            <span>{{ actionLabel }}</span>
          </button>
        </slot>
      </div>

      <!-- Close Button (Simple Cross 'X') -->
      <div v-if="closable || $slots.close" class="shrink-0 flex items-center mr-1">
        <slot name="close">
          <BaseTooltip text="بستن اعلان">
            <button
              type="button"
              title="بستن اعلان"
              class="w-6.5 h-6.5 rounded-lg transition-all cursor-pointer flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-black-6 active:scale-95"
              :class="closeButtonClasses"
              aria-label="بستن اعلان"
              @click="handleCloseClick"
            >
              <svg
                class="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </BaseTooltip>
        </slot>
      </div>

      <!-- Linear Countdown Timer -->
      <div
        v-if="duration > 0 && showProgress"
        class="absolute bottom-0 inset-x-0 h-1 bg-black-6 overflow-hidden rounded-b-2xl"
      >
        <div
          class="h-full toast-progress-bar rounded-b-2xl"
          :class="progressBarColorClasses"
          :style="{ animationDuration: `${duration}ms` }"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export type ToastType =
  'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type ToastStyle = 'glass' | 'soft' | 'fill' | 'outline'
export type ToastSize = 'sm' | 'md' | 'lg'
export type ToastPosition =
  'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'top-center' | 'bottom-center'

export interface BaseToastProps {
  modelValue?: boolean
  type?: ToastType
  styleType?: ToastStyle
  size?: ToastSize
  title?: string
  message?: string
  icon?: string
  showIcon?: boolean
  closable?: boolean
  showProgress?: boolean
  actionLabel?: string
  actionIcon?: string
  duration?: number
  fixed?: boolean
  position?: ToastPosition
}

const props = withDefaults(defineProps<BaseToastProps>(), {
  modelValue: true,
  type: 'primary',
  styleType: 'glass',
  size: 'md',
  title: '',
  message: '',
  icon: '',
  showIcon: true,
  closable: true,
  showProgress: true,
  actionLabel: '',
  actionIcon: '',
  duration: 0,
  fixed: false,
  position: 'top-center',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'action'): void
}>()

defineSlots<{
  default?: (props: {}) => any
  title?: (props: {}) => any
  icon?: (props: {}) => any
  action?: (props: {}) => any
  close?: (props: {}) => any
}>()

const internalVisible = ref(props.modelValue)
let timer: ReturnType<typeof setTimeout> | null = null

const isVisible = computed({
  get: () => internalVisible.value,
  set: (val: boolean) => {
    internalVisible.value = val
    emit('update:modelValue', val)
  },
})

watch(
  () => props.modelValue,
  (newVal) => {
    internalVisible.value = newVal
    if (newVal && props.duration > 0) {
      startTimer()
    }
  },
)

const startTimer = () => {
  clearTimer()
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleCloseClick()
    }, props.duration)
  }
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(() => {
  if (props.duration > 0 && isVisible.value) {
    startTimer()
  }
})

onBeforeUnmount(() => {
  clearTimer()
})

const handleCloseClick = () => {
  isVisible.value = false
  emit('close')
}

const handleActionClick = () => {
  emit('action')
}

// Icon auto-resolution based on type
const resolvedIcon = computed(() => {
  if (props.icon) return props.icon
  switch (props.type) {
    case 'success':
      return 'solar:check-circle-bold-duotone'
    case 'error':
      return 'solar:close-circle-bold-duotone'
    case 'warning':
      return 'solar:danger-triangle-bold-duotone'
    case 'info':
      return 'solar:info-circle-bold-duotone'
    case 'secondary':
      return 'solar:star-bold-duotone'
    case 'accent':
      return 'solar:shield-check-bold-duotone'
    case 'primary':
    default:
      return 'solar:bell-bing-bold-duotone'
  }
})

// Container Sizing Classes
const containerSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-2.5 gap-2.5 text-xs'
    case 'lg':
      return 'px-6 py-4.5 gap-4 text-base'
    case 'md':
    default:
      return 'px-5 py-3.5 gap-3.5 text-sm'
  }
})

// Rounded Classes (Always rounded on mobile & desktop for floating appearance)
const roundedClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'rounded-xl'
    case 'lg':
      return 'rounded-3xl'
    case 'md':
    default:
      return 'rounded-2xl'
  }
})

const iconRoundedClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'rounded-lg'
    case 'lg':
      return 'rounded-2xl'
    case 'md':
    default:
      return 'rounded-xl'
  }
})

// Icon Wrapper Size Classes
const iconWrapperSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-7 h-7'
    case 'lg':
      return 'w-10 h-10'
    case 'md':
    default:
      return 'w-8 h-8'
  }
})

const iconDimensions = computed(() => {
  let px = '20px'
  if (props.size === 'sm') px = '16px'
  if (props.size === 'lg') px = '24px'
  return { width: px, height: px }
})

// Fixed Positioning Classes (Floating with margins on mobile and desktop)
const fixedPositionClasses = computed(() => {
  const base = 'fixed z-[100] shadow-2xl transition-all duration-300'
  switch (props.position) {
    case 'top-left':
      return `${base} top-4 left-4 right-4 sm:right-auto sm:w-auto sm:max-w-md sm:top-6 sm:left-6`
    case 'top-right':
      return `${base} top-4 right-4 left-4 sm:left-auto sm:w-auto sm:max-w-md sm:top-6 sm:right-6`
    case 'top-center':
      return `${base} top-4 sm:top-[124px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[340px]`
    case 'bottom-right':
      return `${base} bottom-4 right-4 left-4 sm:left-auto sm:w-auto sm:max-w-md sm:bottom-6 sm:right-6`
    case 'bottom-center':
      return `${base} bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[340px] sm:bottom-6`
    case 'bottom-left':
      return `${base} bottom-4 left-4 right-4 sm:right-auto sm:w-auto sm:max-w-md sm:bottom-6 sm:left-6`
    default:
      return `${base} top-4 sm:top-[124px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[340px]`
  }
})

// Dynamic Transition Name based on position or inline
const transitionName = computed(() => {
  if (!props.fixed) return 'toast-fade'
  if (props.position.startsWith('top')) return 'toast-slide-down'
  return 'toast-slide-up'
})

// Style and Color Mapping
const containerStyleClasses = computed(() => {
  const t = props.type
  const s = props.styleType

  if (s === 'fill') {
    switch (t) {
      case 'secondary':
        return 'bg-secondary-100 text-white-100 shadow-md border border-secondary-80'
      case 'accent':
        return 'bg-accent-100 text-white-100 shadow-md border border-accent-80'
      case 'info':
        return 'bg-info-100 text-white-100 shadow-md border border-info-80'
      case 'success':
        return 'bg-success-100 text-white-100 shadow-md border border-success-80'
      case 'warning':
        return 'bg-warning-100 text-white-100 shadow-md border border-warning-80'
      case 'error':
        return 'bg-error-100 text-white-100 shadow-md border border-error-80'
      case 'primary':
      default:
        return 'bg-primary-100 text-white-100 shadow-md border border-primary-80'
    }
  }

  if (s === 'soft') {
    switch (t) {
      case 'secondary':
        return 'bg-secondary-8 text-secondary-100 border border-secondary-24'
      case 'accent':
        return 'bg-accent-8 text-accent-100 border border-accent-24'
      case 'info':
        return 'bg-info-8 text-info-100 border border-info-24'
      case 'success':
        return 'bg-success-8 text-success-100 border border-success-24'
      case 'warning':
        return 'bg-warning-8 text-warning-100 border border-warning-24'
      case 'error':
        return 'bg-error-8 text-error-100 border border-error-24'
      case 'primary':
      default:
        return 'bg-primary-8 text-primary-100 border border-primary-24'
    }
  }

  if (s === 'outline') {
    switch (t) {
      case 'secondary':
        return 'bg-white-100 text-black-100 border-2 border-secondary-100 shadow-sm'
      case 'accent':
        return 'bg-white-100 text-black-100 border-2 border-accent-100 shadow-sm'
      case 'info':
        return 'bg-white-100 text-black-100 border-2 border-info-100 shadow-sm'
      case 'success':
        return 'bg-white-100 text-black-100 border-2 border-success-100 shadow-sm'
      case 'warning':
        return 'bg-white-100 text-black-100 border-2 border-warning-100 shadow-sm'
      case 'error':
        return 'bg-white-100 text-black-100 border-2 border-error-100 shadow-sm'
      case 'primary':
      default:
        return 'bg-white-100 text-black-100 border-2 border-primary-100 shadow-sm'
    }
  }

  // Default: 'glass' (Glassmorphism with blurred white backdrop & subtle token border)
  return 'bg-white-80 backdrop-blur-md border border-black-12 shadow-xl text-black-100'
})

const customContainerStyles = computed(() => {
  if (props.styleType === 'glass') {
    return {
      borderColor: `var(--color-${props.type}-24, rgba(0, 0, 0, 0.12))`,
    }
  }
  return {}
})

// Icon Wrapper Styles
const iconWrapperStyleClasses = computed(() => {
  const t = props.type
  const s = props.styleType

  if (s === 'fill') {
    return 'bg-white-24 text-white-100'
  }

  if (s === 'soft') {
    switch (t) {
      case 'secondary':
        return 'bg-secondary-12 text-secondary-100'
      case 'accent':
        return 'bg-accent-12 text-accent-100'
      case 'info':
        return 'bg-info-12 text-info-100'
      case 'success':
        return 'bg-success-12 text-success-100'
      case 'warning':
        return 'bg-warning-12 text-warning-100'
      case 'error':
        return 'bg-error-12 text-error-100'
      case 'primary':
      default:
        return 'bg-primary-12 text-primary-100'
    }
  }

  // Glass or Outline
  switch (t) {
    case 'secondary':
      return 'bg-secondary-12 text-secondary-100'
    case 'accent':
      return 'bg-accent-12 text-accent-100'
    case 'info':
      return 'bg-info-12 text-info-100'
    case 'success':
      return 'bg-success-12 text-success-100'
    case 'warning':
      return 'bg-warning-12 text-warning-100'
    case 'error':
      return 'bg-error-12 text-error-100'
    case 'primary':
    default:
      return 'bg-primary-12 text-primary-100'
  }
})

const customIconStyles = computed(() => {
  return {}
})

// Title Typography Classes
const titleTextClasses = computed(() => {
  if (props.styleType === 'fill') {
    return props.size === 'lg' ? 'text-base font-bold text-white-100' : 'text-sm sm:text-base font-bold text-white-100'
  }
  if (props.styleType === 'soft') {
    return props.size === 'lg' ? 'text-base font-black' : 'text-sm sm:text-base font-bold'
  }
  return props.size === 'lg' ? 'text-base font-bold text-black-100' : 'text-sm sm:text-base font-bold text-black-100'
})

// Message Typography Classes
const messageTextClasses = computed(() => {
  if (props.styleType === 'fill') {
    return props.size === 'lg' ? 'text-sm text-white-90 font-medium' : 'text-xs sm:text-sm text-white-90 font-medium'
  }
  if (props.styleType === 'soft') {
    return props.size === 'lg' ? 'text-sm opacity-90 font-medium' : 'text-xs sm:text-sm opacity-90 font-medium'
  }
  return props.size === 'lg' ? 'text-sm text-black-80 font-medium' : 'text-xs sm:text-sm text-black-80 font-medium'
})

// Progress Bar Color Classes
const progressBarColorClasses = computed(() => {
  if (props.styleType === 'fill') {
    return 'bg-white-100/40'
  }
  switch (props.type) {
    case 'secondary':
      return 'bg-secondary-100'
    case 'accent':
      return 'bg-accent-100'
    case 'info':
      return 'bg-info-100'
    case 'success':
      return 'bg-success-100'
    case 'warning':
      return 'bg-warning-100'
    case 'error':
      return 'bg-error-100'
    case 'primary':
    default:
      return 'bg-primary-100'
  }
})

// Action Button Classes
const actionButtonClasses = computed(() => {
  const t = props.type
  const s = props.styleType

  if (s === 'fill') {
    return 'bg-white-100 text-black-100 hover:bg-white-80 shadow-xs'
  }
  switch (t) {
    case 'secondary':
      return 'bg-secondary-100 text-white-100 hover:bg-secondary-80'
    case 'accent':
      return 'bg-accent-100 text-white-100 hover:bg-accent-80'
    case 'info':
      return 'bg-info-100 text-white-100 hover:bg-info-80'
    case 'success':
      return 'bg-success-100 text-white-100 hover:bg-success-80'
    case 'warning':
      return 'bg-warning-100 text-white-100 hover:bg-warning-80'
    case 'error':
      return 'bg-error-100 text-white-100 hover:bg-error-80'
    case 'primary':
    default:
      return 'bg-primary-100 text-white-100 hover:bg-primary-80'
  }
})

// Close Button Classes
const closeButtonClasses = computed(() => {
  if (props.styleType === 'fill') {
    return 'text-white-100 hover:bg-white-12'
  }
  return 'text-black-40 hover:text-black-100 hover:bg-black-6'
})
</script>

<style scoped>
/* Linear Progress Bar Animation */
@keyframes toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.toast-progress-bar {
  animation: toast-progress linear forwards;
}

/* Slide Up Transition (Bottom positions) */
.toast-slide-up-enter-active,
.toast-slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-up-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}
.toast-slide-up-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

/* Slide Down Transition (Top positions) */
.toast-slide-down-enter-active,
.toast-slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-24px) scale(0.96);
}
.toast-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.96);
}

/* Inline Fade Transition */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease-out;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
