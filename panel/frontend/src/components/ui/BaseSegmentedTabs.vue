<template>
  <!-- BaseSegmentedTabs: Neutral segmented control for 2+ view/mode switching -->
  <!-- Borderless white container; active option is dark neutral, inactive are muted -->
  <!-- Tokens: Pandora360 Design System (black / white) -->
  <div
    class="w-full h-8 bg-primary-6 p-1 rounded-full flex items-center justify-between gap-1 shrink-0 font-dots-1 select-none"
    data-name="SegmentedTabs"
    dir="rtl"
    role="tablist"
  >
    <template v-for="option in options" :key="option.id">
      <BaseTooltip v-if="option.tooltip" :text="option.tooltip">
        <button
          type="button"
          role="tab"
          :aria-selected="modelValue === option.id"
          :disabled="disabled"
          :class="[
            'h-full flex-1 px-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer outline-none whitespace-nowrap',
            modelValue === option.id
              ? 'bg-black-100 text-white-100 shadow-xs'
              : 'text-black-60 hover:text-black-100 hover:bg-white-100 active:scale-95',
            disabled ? 'opacity-50 pointer-events-none' : '',
          ]"
          @click="handleSelect(option.id)"
        >
          <Icon v-if="option.icon" :icon="option.icon" class="w-3.5 h-3.5 shrink-0" />
          <span :class="hideLabelsOnMobile ? 'hidden sm:inline' : ''">{{ option.label }}</span>
        </button>
      </BaseTooltip>
      <button
        v-else
        type="button"
        role="tab"
        :aria-selected="modelValue === option.id"
        :disabled="disabled"
        :class="[
          'h-full flex-1 px-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer outline-none whitespace-nowrap',
          modelValue === option.id
            ? 'bg-black-100 text-white-100 shadow-xs'
            : 'text-black-60 hover:text-black-100 hover:bg-white-100 active:scale-95',
          disabled ? 'opacity-50 pointer-events-none' : '',
        ]"
        @click="handleSelect(option.id)"
      >
        <Icon v-if="option.icon" :icon="option.icon" class="w-3.5 h-3.5 shrink-0" />
        <span :class="hideLabelsOnMobile ? 'hidden sm:inline' : ''">{{ option.label }}</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export interface SegmentedOption {
  id: string | number
  label: string
  icon?: string
  tooltip?: string
}

const props = withDefaults(
  defineProps<{
    /** Selected option ID (v-model) */
    modelValue?: string | number
    /** List of segmented options */
    options?: SegmentedOption[]
    /** Hide text labels on mobile, keep icons only */
    hideLabelsOnMobile?: boolean
    /** Disabled state for the whole control */
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    options: () => [],
    hideLabelsOnMobile: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const handleSelect = (id: string | number) => {
  if (props.modelValue !== id) {
    emit('update:modelValue', id)
    emit('change', id)
  }
}
</script>
