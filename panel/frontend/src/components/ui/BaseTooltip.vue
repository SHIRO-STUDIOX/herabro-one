<template>
  <span
    ref="rootEl"
    :class="[
      'base-tooltip items-center justify-center shrink-0 outline-none',
      hasTooltip ? 'inline-flex' : 'contents',
    ]"
    :tabindex="hasTooltip ? 0 : undefined"
    @mouseover="handleEnter"
    @mouseout="handleLeave"
    @focusin="handleEnter"
    @focusout="handleLeave"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @touchmove="handleTouchMove"
    @touchcancel="handleTouchEnd"
    @contextmenu="handleContextMenu"
  >
    <slot />
    <Teleport to="body">
      <Transition name="base-tooltip-fade">
        <span
          v-if="hasTooltip && isVisible"
          ref="bubbleEl"
          :class="[
            'pointer-events-none fixed whitespace-nowrap font-sans font-dots-1 rounded-full shadow-xs z-[9999]',
            sizeClasses,
            variantClasses,
          ]"
          :style="bubbleStyle"
          role="tooltip"
          dir="rtl"
        >
          <slot name="content">{{ text }}</slot>
        </span>
      </Transition>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, nextTick, onBeforeUnmount } from 'vue'

export interface BaseTooltipProps {
  text?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md'
  disabled?: boolean
  openOnClick?: boolean
  delay?: number
}

const props = withDefaults(defineProps<BaseTooltipProps>(), {
  text: '',
  placement: 'top',
  variant: 'dark',
  size: 'sm',
  disabled: false,
  openOnClick: false,
  delay: 0,
})

defineSlots<{
  default?: (props: {}) => any
  content?: (props: {}) => any
}>()

const slots = useSlots()

const hasTooltip = computed(() => !props.disabled && (!!props.text || !!slots.content))

const isHovered = ref(false)
const isClicked = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const bubbleEl = ref<HTMLElement | null>(null)
const bubblePos = ref({ top: -9999, left: -9999 })
let timer: ReturnType<typeof setTimeout> | null = null

let isTouch = false
let longPressTimer: ReturnType<typeof setTimeout> | null = null
let touchShowedTooltip = false
let touchDismissHandler: ((e: TouchEvent) => void) | null = null

const isVisible = computed(() => (props.openOnClick ? isClicked.value : isHovered.value))

const sizeClasses = computed(() => {
  return props.size === 'md'
    ? 'px-3.5 py-2 text-xs font-semibold leading-4'
    : 'px-3 py-1.5 text-2xs font-semibold leading-4'
})

const variantClasses = computed(() => {
  return props.variant === 'light'
    ? 'bg-white-100 text-black-100 border border-primary-8'
    : 'bg-black-100 text-white-100 border border-transparent'
})

const GAP = 8

function updatePosition() {
  const el = rootEl.value
  const bubble = bubbleEl.value
  if (!el || typeof window === 'undefined') return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  const bw = bubble ? bubble.offsetWidth : 0
  const bh = bubble ? bubble.offsetHeight : 0

  let top = 0
  let left = 0

  switch (props.placement) {
    case 'bottom':
      top = rect.bottom + GAP
      left = cx - bw / 2
      break
    case 'left':
      top = cy - bh / 2
      left = rect.left - GAP - bw
      break
    case 'right':
      top = cy - bh / 2
      left = rect.right + GAP
      break
    case 'top':
    default:
      top = rect.top - GAP - bh
      left = cx - bw / 2
      break
  }
  // Clamp inside viewport so the pill never goes off-screen
  const margin = 8
  if (bw > 0 && bh > 0) {
    left = Math.min(Math.max(left, margin), window.innerWidth - margin - bw)
    top = Math.min(Math.max(top, margin), window.innerHeight - margin - bh)
  } else {
    // Fallback if bubble is not rendered yet
    left = Math.min(Math.max(left, margin), window.innerWidth - margin)
    top = Math.min(Math.max(top, margin), window.innerHeight - margin)
  }
  bubblePos.value = { top, left }
}

const bubbleStyle = computed(() => ({
  top: `${bubblePos.value.top}px`,
  left: `${bubblePos.value.left}px`,
  maxWidth: '240px',
}))

function startTracking() {
  stopTracking()
  window.addEventListener('scroll', updatePosition, { capture: true, passive: true })
  window.addEventListener('resize', updatePosition)
}

function stopTracking() {
  window.removeEventListener('scroll', updatePosition, { capture: true })
  window.removeEventListener('resize', updatePosition)
}

function scheduleShow() {
  nextTick(() => {
    updatePosition()
    startTracking()
  })
}

function handleTouchStart() {
  if (props.disabled) return
  isTouch = true
  touchShowedTooltip = false
  if (longPressTimer) clearTimeout(longPressTimer)
  longPressTimer = setTimeout(() => {
    if (props.openOnClick) {
      isClicked.value = true
    } else {
      isHovered.value = true
    }
    touchShowedTooltip = true
    scheduleShow()
  }, 500)
}

function handleTouchMove() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

function handleTouchEnd() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }

  if (touchShowedTooltip) {
    setupTouchDismiss()
  }

  setTimeout(() => {
    isTouch = false
  }, 500)
}

function setupTouchDismiss() {
  if (touchDismissHandler)
    document.removeEventListener('touchstart', touchDismissHandler, { capture: true })

  touchDismissHandler = (e: TouchEvent) => {
    if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
      isHovered.value = false
      if (props.openOnClick) isClicked.value = false
      stopTracking()
      if (touchDismissHandler) {
        document.removeEventListener('touchstart', touchDismissHandler, { capture: true })
        touchDismissHandler = null
      }
    }
  }

  setTimeout(() => {
    if (touchDismissHandler) {
      document.addEventListener('touchstart', touchDismissHandler, { capture: true })
    }
  }, 10)
}

function handleContextMenu(e: Event) {
  if (isTouch && touchShowedTooltip) {
    e.preventDefault()
  }
}

function handleEnter() {
  if (props.disabled || props.openOnClick || isTouch) return
  if (timer) clearTimeout(timer)
  if (props.delay > 0) {
    timer = setTimeout(() => {
      isHovered.value = true
      scheduleShow()
    }, props.delay)
  } else {
    isHovered.value = true
    scheduleShow()
  }
}

function handleLeave(e?: FocusEvent | MouseEvent) {
  if (isTouch) return
  if (timer) clearTimeout(timer)
  // Ignore internal moves between trigger children (bubbling mouseout/focusout)
  const related = (e?.relatedTarget as Node | null) || null
  if (related && rootEl.value?.contains(related)) return
  isHovered.value = false
  stopTracking()
}

function handleClick() {
  if (props.disabled || !props.openOnClick || isTouch) return
  isClicked.value = !isClicked.value
  if (isClicked.value) scheduleShow()
  else stopTracking()
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  if (longPressTimer) clearTimeout(longPressTimer)
  if (touchDismissHandler)
    document.removeEventListener('touchstart', touchDismissHandler, { capture: true })
  stopTracking()
})
</script>

<style scoped>
.base-tooltip-fade-enter-active,
.base-tooltip-fade-leave-active {
  transition: opacity 0.15s ease;
}
.base-tooltip-fade-enter-from,
.base-tooltip-fade-leave-to {
  opacity: 0;
}
</style>
