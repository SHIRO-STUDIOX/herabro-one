<template>
  <div
    class="relative inline-flex items-center justify-center font-sans select-none shrink-0"
    :class="[
      // Container slot height
      'h-[72px] w-[56px]',
    ]"
    dir="rtl"
  >
    <!-- Semi-Circle Arc Radial Action Items Container -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 w-0 h-0"
      aria-hidden="true"
    >
      <div
        v-for="(item, idx) in actionPositions"
        :key="item.id"
        class="absolute top-0 left-0 transition-[transform,opacity] duration-220 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] origin-center whitespace-nowrap"
        :style="{
          transform: isLocallyOpen
            ? `translate3d(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px), 0) scale(1)`
            : 'translate3d(-50%, -50%, 0) scale(0.3)',
          opacity: isLocallyOpen ? 1 : 0,
          transitionDelay: isLocallyOpen ? `${item.openDelay}ms` : `${item.closeDelay}ms`,
          pointerEvents: isLocallyOpen ? 'auto' : 'none',
        }"
      >
        <slot name="action" :action="item" :index="idx" :is-open="isLocallyOpen">
          <QuickActionButton
            :label="item.label"
            :icon="item.icon"
            :hover-icon="item.hoverIcon"
            :is-soon="item.isSoon"
            :soon-label="item.soonLabel"
            :variant="item.variant || 'auto'"
            :disabled="item.disabled"
            @click="handleActionClick(item)"
          />
        </slot>
      </div>
    </div>

    <!-- Main Trigger Button -->
    <slot name="trigger" :is-open="isLocallyOpen" :toggle="handleClick">
      <BaseTooltip :text="isLocallyOpen ? 'بستن منو' : 'عملیات سریع'">
        <button
          type="button"
          data-trigger="true"
          :disabled="disabled"
          class="absolute w-14 h-14 min-w-[56px] min-h-[56px] rounded-full flex items-center justify-center p-3 cursor-pointer outline-none select-none transition-all duration-300 ease-out border border-white-24 text-white-100 group z-30"
          :class="[
            // Background Gradient
            'bg-gradient-to-b from-primary-60 to-primary-100',

            // Variant & Dynamic Elevation State Classes
            effectiveVariant === 'hover'
              ? 'top-0 shadow-[0px_8px_32px_0px_var(--color-primary-40)] scale-105'
              : effectiveVariant === 'active' || isLocallyOpen
                ? 'top-4 shadow-[0px_0px_80px_20px_var(--color-primary-40)]'
                : enableElevationOnHover
                  ? 'top-4 shadow-2xs hover:top-0 hover:shadow-[0px_8px_32px_0px_var(--color-primary-40)] hover:scale-105 active:scale-95'
                  : 'top-4 shadow-2xs active:scale-95',

            disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
          ]"
          :data-node-id="nodeId"
          :data-name="
            effectiveVariant === 'hover'
              ? 'flash-butt-hover'
              : effectiveVariant === 'active' || isLocallyOpen
                ? 'flash-butt-active'
                : 'flash-butt-main'
          "
          @click="handleClick"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <!-- Center Icon with Smooth Rotation Transition -->
          <div
            class="w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300 ease-out"
            :class="[
              effectiveVariant === 'active' || isLocallyOpen ? 'rotate-90 scale-110' : 'rotate-0',
            ]"
            data-name="Widget"
          >
            <slot :is-open="isLocallyOpen">
              <Icon
                :icon="effectiveVariant === 'active' || isLocallyOpen ? activeIcon : icon"
                class="w-6 h-6 text-white-100"
              />
            </slot>
          </div>
        </button>
      </BaseTooltip>
    </slot>

    <!-- Optional Backdrop Click Outside -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isLocallyOpen && showBackdrop"
          class="fixed inset-0 z-20 bg-black-32/15 transition-opacity duration-200"
          @click="closeMenu"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import QuickActionButton, { type QuickActionVariant } from '@/components/ui/QuickActionButton.vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export type QuickMenuTriggerVariant = 'main' | 'hover' | 'active' | 'auto'

export interface QuickMenuItem {
  id: string
  label: string
  path?: string
  icon?: string
  hoverIcon?: string
  isSoon?: boolean
  soonLabel?: string
  variant?: QuickActionVariant
  disabled?: boolean
  onClick?: () => void
}

export interface QuickMenuTriggerProps {
  /** Explicit test variant: 'main' (default top-4) | 'hover' (elevated top-0) | 'active' (aura glow with close X) | 'auto' (interactive) */
  variant?: QuickMenuTriggerVariant
  /** Controlled open state */
  isOpen?: boolean
  /** Default closed icon */
  icon?: string
  /** Active opened icon */
  activeIcon?: string
  /** Whether to elevate upwards by 16px on hover */
  enableElevationOnHover?: boolean
  /** Disabled state */
  disabled?: boolean
  /** List of radial actions to display in semi-circle arc */
  actions?: QuickMenuItem[]
  /** Radius of semi-circle arc in pixels (default: 180) */
  radius?: number
  /** Horizontal radius override for elliptical arc (default: radius * 1.38) */
  radiusX?: number
  /** Vertical radius override for elliptical arc (default: radius) */
  radiusY?: number
  /** Stagger delay step for opening animation in ms (default: 22) */
  openStaggerMs?: number
  /** Stagger delay step for closing animation in ms (default: 18) */
  closeStaggerMs?: number
  /** Whether to automatically close menu when an action item is clicked (default: true) */
  closeOnActionClick?: boolean
  /** Whether to show a semi-transparent backdrop when open (default: true) */
  showBackdrop?: boolean
  /** Layout mode for actions */
  layout?: 'radial' | 'vertical'
}

const props = withDefaults(defineProps<QuickMenuTriggerProps>(), {
  variant: 'auto',
  isOpen: undefined,
  icon: 'solar:bolt-bold-duotone',
  activeIcon: 'solar:close-circle-bold-duotone',
  enableElevationOnHover: true,
  disabled: false,
  radius: 180,
  openStaggerMs: 22,
  closeStaggerMs: 18,
  closeOnActionClick: true,
  showBackdrop: false,
  layout: 'radial',
})

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'click', event: MouseEvent): void
  (e: 'toggle', value: boolean): void
  (e: 'action-click', item: QuickMenuItem): void
}>()

const defaultActions: QuickMenuItem[] = [
  {
    id: 'new-doc',
    label: 'سند جدید',
    path: '/documents',
    icon: 'solar:document-add-linear',
    hoverIcon: 'solar:document-add-bold-duotone',
  },
  {
    id: 'new-treasury',
    label: 'دریافت / پرداخت',
    path: '/treasury',
    icon: 'solar:wallet-money-linear',
    hoverIcon: 'solar:wallet-money-bold-duotone',
  },
  {
    id: 'new-invoice',
    label: 'فاکتور جدید',
    path: '/invoices',
    icon: 'solar:cart-large-2-linear',
    hoverIcon: 'solar:cart-large-2-bold-duotone',
  },
  {
    id: 'new-cheque',
    label: 'چک دریافتی',
    path: '/cheques/receivable',
    icon: 'solar:card-recive-linear',
    hoverIcon: 'solar:card-recive-bold-duotone',
  },
  {
    id: 'new-product',
    label: 'کالای جدید',
    path: '/products',
    icon: 'solar:box-minimalistic-linear',
    hoverIcon: 'solar:box-minimalistic-bold-duotone',
  },
  {
    id: 'new-account',
    label: 'حساب جدید',
    path: '/accounts',
    icon: 'solar:user-plus-linear',
    hoverIcon: 'solar:user-plus-bold-duotone',
  },
]

const localIsOpen = ref(false)
const isHovered = ref(false)

const isLocallyOpen = computed({
  get: () => (props.isOpen !== undefined ? props.isOpen : localIsOpen.value),
  set: (val: boolean) => {
    localIsOpen.value = val
    emit('update:isOpen', val)
    emit('toggle', val)
  },
})

const effectiveVariant = computed(() => {
  if (props.variant === 'active' || (props.variant === 'auto' && isLocallyOpen.value))
    return 'active'
  if (props.variant === 'hover') return 'hover'
  if (props.variant === 'main') return 'main'
  return 'auto'
})

const nodeId = computed(() => {
  if (effectiveVariant.value === 'hover') return '474:90418'
  if (effectiveVariant.value === 'active') return '474:90419'
  return '474:90420'
})

const resolvedActions = computed(() => {
  return props.actions && props.actions.length > 0 ? props.actions : defaultActions
})

// Calculate positions for each action item based on layout
const actionPositions = computed(() => {
  const list = resolvedActions.value
  const count = list.length
  if (count === 0) return []

  const isVertical = props.layout === 'vertical'
  const baseRadius = props.radius || 180
  const rx = props.radiusX ?? Math.round(baseRadius * 1.38)
  const ry = props.radiusY ?? baseRadius

  // Optimized angle distribution for aesthetic balance and clean spacing at apex
  const presetAngles: Record<number, number[]> = {
    1: [90],
    2: [60, 120],
    3: [30, 90, 150],
    4: [20, 65, 115, 160],
    5: [15, 52, 90, 128, 165],
    6: [10, 40, 70, 110, 140, 170],
  }

  return list.map((item, idx) => {
    let x = 0
    let y = 0
    let angleDeg = 90

    if (isVertical) {
      const initialOffset = 72
      const gap = 56
      x = 0
      y = -(initialOffset + idx * gap)
    } else {
      const angles = presetAngles[count]
      if (angles && angles[idx] !== undefined) {
        angleDeg = angles[idx]
      } else if (count > 1) {
        const startAngle = 10
        const endAngle = 170
        angleDeg = startAngle + (idx * (endAngle - startAngle)) / (count - 1)
      }
      const rad = (angleDeg * Math.PI) / 180
      x = Math.round(rx * Math.cos(rad))
      y = Math.round(-ry * Math.sin(rad))
    }

    return {
      ...item,
      x,
      y,
      angleDeg,
      openDelay: idx * props.openStaggerMs,
      closeDelay: (count - 1 - idx) * props.closeStaggerMs,
    }
  })
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return
  if (props.variant === 'auto') {
    isLocallyOpen.value = !isLocallyOpen.value
  }
  emit('click', e)
}

const closeMenu = () => {
  isLocallyOpen.value = false
}

const handleActionClick = (item: QuickMenuItem) => {
  if (item.disabled || item.isSoon) return
  if (item.onClick) {
    item.onClick()
  }
  emit('action-click', item)
  if (props.closeOnActionClick) {
    closeMenu()
  }
}

// Close on Escape key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isLocallyOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
