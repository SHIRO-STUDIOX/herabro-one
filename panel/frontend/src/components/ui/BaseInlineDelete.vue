<template>
  <div ref="containerRef" class="relative inline-flex items-center select-none" @click.stop>
    <BaseTooltip :text="activeTooltip" :disabled="disabled || isConfirming || !activeTooltip">
      <!-- Capsule Container: dir="ltr" pins icon on left and animates to/from right -->
      <div
        dir="ltr"
        :class="[
          'h-6 rounded-full inline-flex items-center overflow-hidden transition-all duration-250 ease-out relative',
          isConfirming ? 'bg-primary-8 shadow-2xs' : 'bg-transparent',
          disabled ? 'opacity-35 cursor-not-allowed pointer-events-none' : '',
          capsuleClass,
        ]"
      >
        <!-- Icon Button (Anchored on the left) -->
        <button
          type="button"
          :disabled="disabled"
          :class="[
            'w-6 h-6 min-w-[24px] rounded-full flex items-center justify-center transition-all duration-200 outline-none shrink-0 cursor-pointer',
            isConfirming
              ? `${tone.solid} text-white-100 ${tone.solidHover} active:scale-90 shadow-xs`
              : `bg-primary-8 ${tone.softHover} active:scale-90 text-primary-80`,
            buttonClass,
          ]"
          :title="isConfirming ? activeActionTitle : activeTooltip"
          @click="handleButtonClick"
        >
          <Icon
            :icon="activeIcon"
            :class="[
              iconClass,
              isConfirming ? 'text-white-100' : '',
              'transition-colors duration-200 shrink-0',
            ]"
          />
        </button>

        <!-- Expanding & Collapsing Text with Vue Transition (expands to the right, closes to the left) -->
        <Transition name="capsule-slide">
          <div
            v-if="isConfirming"
            dir="rtl"
            class="overflow-hidden flex items-center cursor-pointer select-none"
            @click="confirmAction"
          >
            <span
              class="text-[11px] font-bold font-dots-1 text-primary-80 whitespace-nowrap select-none leading-none pr-2 pl-2.5"
            >
              {{ activeConfirmText }}
            </span>
          </div>
        </Transition>

        <!-- Micro-Countdown Progress Bar at the bottom -->
        <Transition name="fade">
          <div
            v-if="isConfirming"
            class="absolute bottom-0 right-0 left-0 h-[1.5px] pointer-events-none overflow-hidden"
            :class="tone.track"
          >
            <div
              class="h-full transition-all ease-linear"
              :class="tone.fill"
              :style="{
                width: `${progressPercent}%`,
                transitionDuration: `${TICK_INTERVAL}ms`,
              }"
            />
          </div>
        </Transition>
      </div>
    </BaseTooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export type InlineActionVariant = 'delete' | 'approve' | 'undo'

export interface InlineActionTone {
  solid: string
  solidHover: string
  softHover: string
  track: string
  fill: string
}

const VARIANT_DEFAULTS: Record<
  InlineActionVariant,
  { icon: string; confirmText: string; tooltip: string; actionTitle: string }
> = {
  delete: {
    icon: 'solar:trash-bin-trash-bold-duotone',
    confirmText: 'آیا مطمئنید؟',
    tooltip: '',
    actionTitle: 'تایید حذف',
  },
  approve: {
    icon: 'solar:check-bold',
    confirmText: 'تایید شود؟',
    tooltip: 'تایید',
    actionTitle: 'تایید نهایی',
  },
  undo: {
    icon: 'solar:restart-bold',
    confirmText: 'بازگشت به پیش‌نویس؟',
    tooltip: 'لغو تایید و بازگشت',
    actionTitle: 'لغو تایید',
  },
}

const VARIANT_TONES: Record<InlineActionVariant, InlineActionTone> = {
  delete: {
    solid: 'bg-error-100',
    solidHover: 'hover:bg-error-100/90',
    softHover: 'hover:bg-error-8 hover:text-error-100',
    track: 'bg-error-100/20',
    fill: 'bg-error-100',
  },
  approve: {
    solid: 'bg-success-100',
    solidHover: 'hover:bg-success-100/90',
    softHover: 'hover:bg-success-8 hover:text-success-100',
    track: 'bg-success-100/20',
    fill: 'bg-success-100',
  },
  undo: {
    solid: 'bg-warning-100',
    solidHover: 'hover:bg-warning-100/90',
    softHover: 'hover:bg-warning-8 hover:text-warning-100',
    track: 'bg-warning-100/20',
    fill: 'bg-warning-100',
  },
}

export interface BaseInlineDeleteProps {
  variant?: InlineActionVariant
  confirmText?: string
  timeout?: number
  disabled?: boolean
  tooltip?: string
  icon?: string
  iconClass?: string
  buttonClass?: string
  capsuleClass?: string
}

const props = withDefaults(defineProps<BaseInlineDeleteProps>(), {
  variant: 'delete',
  confirmText: '',
  timeout: 3000,
  disabled: false,
  tooltip: '',
  icon: '',
  iconClass: 'w-3.5 h-3.5',
  buttonClass: '',
  capsuleClass: '',
})

const variantDefaults = computed(() => VARIANT_DEFAULTS[props.variant])
const tone = computed<InlineActionTone>(() => VARIANT_TONES[props.variant])
const activeIcon = computed(() => props.icon || variantDefaults.value.icon)
const activeConfirmText = computed(() => props.confirmText || variantDefaults.value.confirmText)
const activeTooltip = computed(() => props.tooltip || variantDefaults.value.tooltip)
const activeActionTitle = computed(() => variantDefaults.value.actionTitle)

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'toggle', isOpen: boolean): void
}>()

const isConfirming = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const progressPercent = ref(100)

let timer: ReturnType<typeof setTimeout> | null = null
let intervalTimer: ReturnType<typeof setInterval> | null = null
const TICK_INTERVAL = 50

const clearTimers = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (intervalTimer) {
    clearInterval(intervalTimer)
    intervalTimer = null
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (isConfirming.value && containerRef.value && !containerRef.value.contains(e.target as Node)) {
    cancelAction()
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (isConfirming.value && e.key === 'Escape') {
    cancelAction()
  }
}

const handleButtonClick = () => {
  if (props.disabled) return
  if (!isConfirming.value) {
    startConfirm()
  } else {
    confirmAction()
  }
}

const startConfirm = () => {
  if (props.disabled) return
  isConfirming.value = true
  progressPercent.value = 100
  emit('toggle', true)

  // Start progress bar countdown
  const startTime = Date.now()
  intervalTimer = setInterval(() => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, props.timeout - elapsed)
    progressPercent.value = (remaining / props.timeout) * 100
  }, TICK_INTERVAL)

  // Auto revert after timeout with smooth collapse animation
  timer = setTimeout(() => {
    cancelAction()
  }, props.timeout)

  // Listeners
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeyDown)
}

const cancelAction = () => {
  clearTimers()
  isConfirming.value = false
  progressPercent.value = 100
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
  emit('toggle', false)
  emit('cancel')
}

const confirmAction = () => {
  clearTimers()
  isConfirming.value = false
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
  emit('toggle', false)
  emit('confirm')
}

onBeforeUnmount(() => {
  clearTimers()
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Expand to the right and collapse from the right back into the icon */
.capsule-slide-enter-active,
.capsule-slide-leave-active {
  transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  max-width: 120px;
  opacity: 1;
  transform-origin: left center;
}

.capsule-slide-enter-from,
.capsule-slide-leave-to {
  max-width: 0;
  opacity: 0;
  transform: scaleX(0.4);
  transform-origin: left center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
