<template>
  <div
    :class="[
      'select-none shrink-0 pointer-events-none',
      animate ? 'animate-shimmer' : 'bg-primary-6',
      roundedClass,
      customClass,
    ]"
    :style="customStyle"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BaseSkeletonProps {
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  animate?: boolean
  class?: string
}

const props = withDefaults(defineProps<BaseSkeletonProps>(), {
  width: '100%',
  height: '16px',
  rounded: 'md',
  animate: true,
  class: '',
})

const roundedClass = computed(() => {
  switch (props.rounded) {
    case 'none':
      return 'rounded-none'
    case 'xs':
      return 'rounded-xs'
    case 'sm':
      return 'rounded-sm'
    case 'md':
      return 'rounded-md'
    case 'lg':
      return 'rounded-lg'
    case 'xl':
      return 'rounded-xl'
    case '2xl':
      return 'rounded-2xl'
    case '3xl':
      return 'rounded-3xl'
    case 'full':
      return 'rounded-full'
    default:
      return 'rounded-md'
  }
})

const customClass = computed(() => props.class)

const customStyle = computed(() => {
  const w = typeof props.width === 'number' ? `${props.width}px` : props.width
  const h = typeof props.height === 'number' ? `${props.height}px` : props.height
  return {
    width: w,
    height: h,
  }
})
</script>
