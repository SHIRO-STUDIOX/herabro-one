<template>
  <!-- Shared table bottom surface: dashed quick-add action + pagination/content -->
  <!-- Hidden entirely when the list is empty (empty-status is shown instead) -->
  <div
    v-if="!isEmpty"
    class="w-full bg-white-40 border border-primary-6 rounded-2xl p-1.5 sm:p-2 flex flex-col gap-2 select-none transition-all duration-200"
    data-name="BottomSurface"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Quick-add button label (optional) */
    label?: string
    /** Quick-add button icon (optional) */
    icon?: string
    /** Tooltip text (optional) */
    tooltip?: string
    /** Whether action was shown */
    showAction?: boolean
    /** When true (empty list / empty-status shown), the whole surface is hidden */
    isEmpty?: boolean
  }>(),
  { label: '', icon: '', tooltip: '', showAction: false, isEmpty: false },
)

defineEmits<{
  (e: 'create'): void
}>()

defineSlots<{
  action?: (props: { create?: () => void }) => any
  default?: (props: {}) => any
}>()
</script>

