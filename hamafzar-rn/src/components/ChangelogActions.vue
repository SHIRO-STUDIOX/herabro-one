<template>
  <div class="hrn-actions-container">
    <!-- Close Button (outside, top) -->
    <div
      class="hrn-action-button close-btn"
      @click="$emit('close')"
      title="بستن"
    >
      <Icon icon="solar:close-circle-bold-duotone" class="text-error-100" />
    </div>

    <!-- Capsule for sizes and new tab (middle) -->
    <div v-if="shouldShowCapsule" class="hrn-action-capsule">
      <!-- Sizes (only on Desktop, width > 768) -->
      <template v-if="width > 768">
        <div
          class="capsule-icon-wrapper"
          :class="{ active: modelValue === 'small' }"
          @click="updateSize('small')"
          title="سایز کوچک"
        >
          <Icon icon="solar:minimize-square-minimalistic-outline" />
        </div>
        <div
          class="capsule-icon-wrapper"
          :class="{ active: modelValue === 'medium' }"
          @click="updateSize('medium')"
          title="سایز متوسط"
        >
          <Icon icon="solar:maximize-square-minimalistic-outline" />
        </div>
        <div
          class="capsule-icon-wrapper"
          :class="{ active: modelValue === 'large' }"
          @click="updateSize('large')"
          title="سایز بزرگ"
        >
          <Icon icon="solar:maximize-square-3-outline" />
        </div>
      </template>

      <!-- Divider line between sizes and new tab if both present -->
      <div v-if="showNewTab && width > 768" class="capsule-divider"></div>

      <!-- New Tab (Desktop & Mobile if enabled) -->
      <div
        v-if="showNewTab"
        class="capsule-icon-wrapper newtab-btn"
        @click="openNewTab"
        title="باز کردن در صفحه جدید"
      >
        <Icon icon="solar:square-share-line-outline" />
      </div>
    </div>

    <!-- Refresh Button (outside, bottom) -->
    <div
      v-if="showRefresh"
      class="hrn-action-button refresh-btn"
      @click="$emit('refresh')"
      title="به‌روزرسانی"
    >
      <Icon icon="solar:restart-bold" class="text-primary-100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useWindowSize } from '../composables/useWindowSize'
import type { ChangelogPanelSize } from '../types'

const props = withDefaults(
  defineProps<{
    modelValue?: ChangelogPanelSize
    showNewTab?: boolean
    newTabLink?: string
    showRefresh?: boolean
  }>(),
  {
    modelValue: 'small',
    showNewTab: false,
    newTabLink: '',
    showRefresh: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', size: ChangelogPanelSize): void
  (e: 'close'): void
  (e: 'refresh'): void
}>()

const { width } = useWindowSize()

const shouldShowCapsule = computed(() => {
  if (width.value > 768) {
    return true
  }
  return props.showNewTab
})

const updateSize = (newSize: ChangelogPanelSize) => {
  emit('update:modelValue', newSize)
}

const openNewTab = () => {
  if (props.newTabLink) {
    window.open(props.newTabLink, '_blank')
  }
}
</script>

<style scoped>
.hrn-actions-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.hrn-action-button {
  background: var(--white-100, #ffffff);
  width: 44px;
  height: 44px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 24px 0px var(--primary-6, rgba(0, 0, 0, 0.06));
  border: 1px solid var(--primary-8, rgba(0, 0, 0, 0.08));
  transition: all 0.2s ease;
  font-size: 20px;
}

.hrn-action-button:hover {
  filter: brightness(0.95);
  transform: scale(1.03);
}

.hrn-action-button :deep(svg) {
  width: 1.2em !important;
  height: 1.2em !important;
}

.hrn-action-capsule {
  background: var(--white-100, #ffffff);
  border-radius: 99px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 0px 24px 0px var(--primary-6, rgba(0, 0, 0, 0.06));
  border: 1px solid var(--primary-8, rgba(0, 0, 0, 0.08));
  width: 44px;
}

.capsule-icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-40, rgba(0, 0, 0, 0.4));
  transition: all 0.2s ease;
  font-size: 20px;
}

.capsule-icon-wrapper:hover {
  color: var(--primary-80, rgba(0, 0, 0, 0.8));
  background-color: var(--primary-6, rgba(0, 0, 0, 0.06));
}

.capsule-icon-wrapper.active {
  color: var(--primary-100, rgba(73, 64, 109, 1));
  background-color: var(--primary-8, rgba(0, 0, 0, 0.08));
}

.capsule-icon-wrapper :deep(svg) {
  width: 1em !important;
  height: 1em !important;
}

.capsule-divider {
  width: 24px;
  height: 1px;
  background-color: var(--primary-12, rgba(0, 0, 0, 0.12));
  margin: 2px 0;
}

.refresh-btn {
  color: var(--primary-100, #49406d);
}

.close-btn {
  color: var(--error-100, #b84242);
}

.newtab-btn {
  color: var(--primary-100, #49406d);
}

@media only screen and (max-width: 768px) {
  .hrn-actions-container {
    flex-direction: row;
    gap: 8px;
  }
  .hrn-action-capsule {
    flex-direction: row;
    height: 44px;
    width: auto;
    border-radius: 99px;
    padding: 6px;
  }
  .capsule-divider {
    width: 1px;
    height: 24px;
    margin: 0 2px;
  }
}
</style>
