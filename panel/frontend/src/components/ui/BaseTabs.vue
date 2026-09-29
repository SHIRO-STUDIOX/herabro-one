<template>
  <!-- BaseTabs: Grouped tabs component for filter bars & segmented switching -->
  <div
    class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 select-none w-full dir-rtl"
    dir="rtl"
  >
    <BaseTabPill
      v-for="tab in tabs"
      :key="tab.id"
      :label="tab.label"
      :active="modelValue === tab.id"
      :icon="tab.icon"
      :count="tab.count"
      :disabled="tab.disabled"
      @click="handleSelect(tab.id)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseTabPill from './BaseTabPill.vue'

export interface TabItem {
  id: string | number
  label: string
  icon?: string
  count?: number | string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** Selected tab ID (v-model) */
    modelValue?: string | number
    /** Array of tab items */
    tabs?: TabItem[]
  }>(),
  {
    modelValue: '',
    tabs: () => [],
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', tabId: string | number): void
}>()

const handleSelect = (id: string | number) => {
  if (props.modelValue !== id) {
    emit('update:modelValue', id)
    emit('change', id)
  }
}
</script>
