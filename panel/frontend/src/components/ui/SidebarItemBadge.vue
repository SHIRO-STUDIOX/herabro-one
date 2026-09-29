<template>
  <div
    :class="[
      'inline-flex items-center justify-center h-5 px-3 rounded-full shrink-0 transition-all duration-200 select-none',
      stateClasses,
    ]"
  >
    <span
      class="text-xs font-bold leading-4 font-dots-1 text-center whitespace-nowrap"
      :class="textClasses"
    >
      <slot>
        {{ label || 'عنوان' }}
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SidebarItemBadgeProps {
  /** Badge text label */
  label?: string | number
  /** State variant matching Figma node 37:24439: 'enabled', 'hovered', 'selected' */
  state?: 'enabled' | 'hovered' | 'selected'
}

const props = withDefaults(defineProps<SidebarItemBadgeProps>(), {
  label: 'عنوان',
  state: 'enabled',
})

const stateClasses = computed(() => {
  switch (props.state) {
    case 'selected':
      return 'bg-primary-100'
    case 'hovered':
      return 'bg-primary-12'
    case 'enabled':
    default:
      return 'bg-primary-6'
  }
})

const textClasses = computed(() => {
  switch (props.state) {
    case 'selected':
      return 'text-white-100'
    case 'hovered':
      return 'text-primary-100'
    case 'enabled':
    default:
      return 'text-primary-80'
  }
})
</script>
