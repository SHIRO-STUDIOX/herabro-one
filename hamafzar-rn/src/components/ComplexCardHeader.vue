<template>
  <div
    class="hrn-complex-card-header"
    :class="{ 'has-extra': $slots.default }"
    style="direction: rtl"
  >
    <div
      :class="[
        startIconBgColor,
        startIconTextColor,
        'start-header-icon',
        { 'clickable-icon': clickable },
      ]"
      @click="clickable && $emit('click')"
    >
      <span v-if="isSvgString" class="svg" v-html="props.startIcon"></span>
      <Icon v-else-if="props.startIcon" :icon="resolvedIcon" />
    </div>
    <div class="header-content">
      <span class="text-title">{{ props.title }}</span>
      <div class="text-subtitle">{{ props.subtitle }}</div>
    </div>
    <!-- Slot for extra items like close/refresh buttons -->
    <div v-if="$slots.default" class="header-extra">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    startIcon?: any
    startIconBgColor?: string
    startIconTextColor?: string
    title?: string
    subtitle?: string
    clickable?: boolean
  }>(),
  {
    startIconBgColor: 'bg-secondary-8',
    startIconTextColor: 'text-secondary-100',
    title: '',
    subtitle: '',
    clickable: false,
  },
)

defineEmits<{
  (e: 'click'): void
}>()

const isSvgString = computed(() => {
  if (typeof props.startIcon === 'string') {
    return (
      props.startIcon.trim().startsWith('<') ||
      props.startIcon.includes('<svg') ||
      props.startIcon.includes('<path')
    );
  }
  return false
})

const resolvedIcon = computed(() => {
  if (typeof props.startIcon === 'string') {
    if (props.startIcon.includes(':')) return props.startIcon
    if (props.startIcon === 'arrowRightBold') return 'solar:arrow-right-bold'
    if (props.startIcon === 'alarmBold') return 'solar:bell-bold'
    return `solar:${props.startIcon}`
  }
  return 'solar:bell-bold'
})
</script>

<style scoped>
.hrn-complex-card-header {
  display: grid !important;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 12px;
  width: auto;
  box-sizing: border-box;
}

.hrn-complex-card-header.has-extra {
  grid-template-columns: auto minmax(0, 1fr) auto;
}

.start-header-icon {
  width: 40px !important;
  height: 40px !important;
  aspect-ratio: 1/1;
  border-radius: 148px;
  font-size: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--info-8, rgba(37, 144, 184, 0.08));
  color: var(--info-100, rgb(37, 144, 184));
}

.clickable-icon {
  cursor: pointer !important;
}

.header-content {
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header-content .text-title,
.header-content .text-subtitle {
  width: 100%;
  text-align: right;
}

.header-extra {
  justify-self: end;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 0;
}

.text-title {
  color: var(--primary-100);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
  display: block;
}

.text-subtitle {
  overflow: hidden;
  white-space: nowrap;
  color: var(--primary-60);
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}
</style>
