<template>
  <div class="relative inline-flex shrink-0 font-sans select-none" dir="rtl">
    <button
      type="button"
      :disabled="disabled || isSoon"
      class="h-9 min-w-[111px] px-4 py-2 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 outline-none select-none relative z-10 group"
      :class="[
        // Background Gradient
        'bg-gradient-to-b from-white/24 to-white/80 backdrop-blur-sm shadow-2xs',

        // Variant Styles
        effectiveVariant === 'hover'
          ? 'border-2 border-dashed border-primary-24 font-extrabold active:scale-95'
          : effectiveVariant === 'soon'
            ? 'border border-white-100 font-semibold opacity-90 cursor-default'
            : 'border border-white-100 font-semibold hover:border-2 hover:border-dashed hover:border-primary-24 hover:font-extrabold active:scale-95',

        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
      ]"
      :data-node-id="nodeId"
      :data-name="
        effectiveVariant === 'hover'
          ? 'Fast-butt-hover'
          : effectiveVariant === 'soon'
            ? 'Fast-butt-soon'
            : 'Fast-butt-main'
      "
      @click="handleClick"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Label Text (Right in RTL / First child) -->
      <span
        class="text-xs text-primary-80 font-dots-1 leading-4 whitespace-nowrap transition-all duration-150"
        :class="[
          effectiveVariant === 'hover' || isHovered
            ? 'font-extrabold text-primary-100'
            : 'font-semibold',
        ]"
      >
        <slot>{{ label }}</slot>
      </span>

      <!-- Icon (Left in RTL / Second child) -->
      <div
        class="w-5 h-5 flex items-center justify-center shrink-0 text-primary-80 transition-transform duration-150"
        :class="effectiveVariant === 'hover' || isHovered ? 'text-primary-100 scale-105' : ''"
      >
        <slot name="icon">
          <Icon
            :icon="effectiveVariant === 'hover' || isHovered ? hoverIcon || icon : icon"
            class="w-5 h-5"
          />
        </slot>
      </div>
    </button>

    <!-- Coming Soon Badge (Figma Node 474:85279) -->
    <div
      v-if="effectiveVariant === 'soon'"
      class="absolute -top-2.5 left-1.5 z-20 pointer-events-none"
      data-node-id="474:85279"
      data-name="Badge Component"
    >
      <BaseBadge
        type="warning"
        size="2xs"
        style-type="soft"
        class="!h-4 !min-w-[24px] !px-1 shadow-2xs font-semibold text-[10px] backdrop-blur-md"
      >
        {{ soonLabel }}
      </BaseBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

export type QuickActionVariant = 'main' | 'hover' | 'soon' | 'auto'

export interface QuickActionButtonProps {
  /** Explicit variant: 'main' (enabled solid) | 'hover' (dashed extrabold) | 'soon' (with badge) | 'auto' (natural CSS hover) */
  variant?: QuickActionVariant
  /** Main button label text */
  label?: string
  /** Icon name (Iconify string) */
  icon?: string
  /** Hover state icon override (optional bold duotone icon) */
  hoverIcon?: string
  /** Toggle coming soon badge */
  isSoon?: boolean
  /** Coming soon badge label text */
  soonLabel?: string
  /** Disabled state */
  disabled?: boolean
}

const props = withDefaults(defineProps<QuickActionButtonProps>(), {
  variant: 'auto',
  label: 'سند جدید',
  icon: 'solar:document-add-linear',
  hoverIcon: 'solar:document-add-bold-duotone',
  isSoon: false,
  soonLabel: 'به زودی',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isHovered = ref(false)

const effectiveVariant = computed(() => {
  if (props.isSoon || props.variant === 'soon') return 'soon'
  if (props.variant === 'hover') return 'hover'
  if (props.variant === 'main') return 'main'
  return 'auto'
})

const nodeId = computed(() => {
  if (effectiveVariant.value === 'hover') return '474:85326'
  if (effectiveVariant.value === 'soon') return '474:85327'
  return '474:85328'
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled || effectiveVariant.value === 'soon') return
  emit('click', e)
}
</script>
