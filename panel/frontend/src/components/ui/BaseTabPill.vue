<template>
  <!-- BaseTabPill: Reusable individual tab button / pill component for tab bars -->
  <!-- Aligned with Figma Design Nodes 2155:15262, 2155:15263, 2155:15261 -->
  <!-- Tokens: Pandora360 Design System -->
  <button
    type="button"
    class="inline-flex items-center justify-center gap-1 h-6 px-[6px] rounded-full border border-solid select-none transition-all duration-200 cursor-pointer focus:outline-none font-dots-1 shrink-0"
    :class="[
      active
        ? 'bg-primary-100 border-primary-100 text-white-100 shadow-2xs'
        : 'bg-white-100 border-primary-12 text-primary-100 hover:bg-surface-50 hover:border-primary-24 active:scale-95',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ]"
    :disabled="disabled"
    dir="rtl"
    @click="$emit('click', $event)"
  >
    <!-- Tab Label Text (12px / text-xs / font-semibold / leading-4) -->
    <span class="text-xs font-semibold leading-4 font-dots-1 text-center whitespace-nowrap">
      <slot>{{ label }}</slot>
    </span>

    <!-- Optional Count Badge -->
    <span
      v-if="count !== undefined && count !== null"
      class="inline-flex items-center justify-center px-1 py-0.2 text-[10px] font-bold leading-3 rounded-full shrink-0 font-dots-1"
      :class="active ? 'bg-white-100/20 text-white-100' : 'bg-primary-6 text-primary-100'"
    >
      {{ count }}
    </span>
  </button>
</template>

<script setup lang="ts">
/**
 * BaseTabPill Component
 *
 * Reusable single tab pill component matching Figma design nodes (2155:15262, 2155:15263, 2155:15261).
 * Supports active vs inactive states with primary Pandora360 design tokens.
 */
withDefaults(
  defineProps<{
    /** Label text for the tab */
    label?: string
    /** Active state boolean */
    active?: boolean
    /** Iconify icon name (e.g. 'solar:clock-circle-bold-duotone') */
    icon?: string
    /** Count badge value */
    count?: number | string
    /** Disabled state boolean */
    disabled?: boolean
  }>(),
  {
    label: '',
    active: false,
    disabled: false,
  },
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>
