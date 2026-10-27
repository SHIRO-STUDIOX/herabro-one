<template>
  <div
    class="flex flex-col w-full text-right font-sans select-none"
    :class="{ 'opacity-60 pointer-events-none': disabled }"
    dir="rtl"
  >
    <!-- 1. Field Label & Helper (Outside like BaseInput) -->
    <div
      v-if="label || $slots.label || hint || $slots.hint"
      class="flex items-center justify-between mb-1.5 w-full select-none"
    >
      <label
        class="text-xs font-semibold text-primary-80 font-dots-1 flex items-center gap-1"
        :class="labelClass"
      >
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="text-error-100 font-bold leading-none select-none">*</span>
      </label>

      <span v-if="hint || $slots.hint" class="text-2xs text-primary-40 font-dots-1">
        <slot name="hint">{{ hint }}</slot>
      </span>
    </div>

    <!-- 2. Main Field Box (Same height as BaseInput: h-10, dashed border, subtle primary background) -->
    <div
      class="relative flex items-center gap-2 w-full h-10 min-h-[40px] px-2 rounded-xl bg-primary-6/60 hover:bg-primary-6/80 border border-dashed transition-all duration-200 overflow-hidden"
      :class="[
        error
          ? 'border-error-100 bg-error-6/20'
          : 'border-primary-16 hover:border-primary-24 focus-within:border-primary-60 focus-within:ring-1 focus-within:ring-primary-12',
      ]"
    >
      <!-- Right (RTL): Add / Manage Badge Dropdown Button -->
      <BadgeDropdownPicker
        ref="dropdownPickerRef"
        :model-value="modelValue"
        :badges="badges"
        :title="label || 'الصاق برچسب'"
        :allow-create="allowCreate"
        :get-usage-count="getUsageCount"
        @update:model-value="handleUpdateValue"
        @change="handleChange"
        @create-badge="handleCreateBadge"
      />

      <!-- Left of button: Scrollable Badges or Empty Placeholder -->
      <div class="flex-1 min-w-0 flex items-center">
        <!-- If badges are selected: Horizontal scrollable badges with progressive blur & hover arrows -->
        <BadgeScrollStrip v-if="selectedBadgeList.length > 0" class="w-full">
          <div
            v-for="badge in selectedBadgeList"
            :key="badge.id"
            class="inline-flex items-center gap-1 group/item shrink-0"
          >
            <BaseBadge
              :type="getColorOption(badge.color).badgeType"
              style-type="soft"
              size="sm"
              border-style="dashed"
              :class="getBadgeClasses(badge.color)"
            >
              <span>{{ badge.title }}</span>
            </BaseBadge>

            <!-- Quick Remove Cross on individual badge -->
            <button
              v-if="!disabled && removable"
              type="button"
              class="w-4 h-4 rounded-full -ms-2 me-0.5 bg-primary-12 hover:bg-error-80 text-primary-80 hover:text-white-100 flex items-center justify-center transition-all cursor-pointer outline-none active:scale-95"
              :title="'حذف ' + badge.title"
              :aria-label="'حذف برچسب ' + badge.title"
              @click.stop="removeBadge(badge.id)"
            >
              <svg
                class="w-2.5 h-2.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </BadgeScrollStrip>

        <!-- Empty State Placeholder (Clickable to trigger dropdown) -->
        <span
          v-else
          class="text-xs text-primary-40 font-dots-1 cursor-pointer hover:text-primary-60 transition-colors select-none truncate"
          @click="openPicker"
        >
          {{ placeholder }}
        </span>
      </div>

      <!-- Quick Clear All Button (appears when multiple badges are selected and removable) -->
      <button
        v-if="selectedBadgeList.length > 1 && !disabled && removable"
        type="button"
        class="shrink-0 w-5 h-5 rounded-full hover:bg-primary-12 active:scale-95 text-primary-40 hover:text-error-100 flex items-center justify-center transition-all cursor-pointer outline-none"
        title="حذف همه برچسب‌ها"
        aria-label="حذف همه برچسب‌ها"
        @click.stop="clearAll"
      >
        <svg
          class="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <!-- 3. Error Message below input -->
    <span v-if="error" class="text-2xs text-error-80 font-medium font-dots-1 mt-1 flex items-center gap-1">
      <Icon icon="solar:danger-circle-bold" class="w-3.5 h-3.5 shrink-0" />
      <span>{{ error }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BadgeDropdownPicker from '@/components/ui/BadgeDropdownPicker.vue'
import BadgeScrollStrip from '@/components/ui/BadgeScrollStrip.vue'
import {
  semanticColors,
  type BadgeItem,
  type BadgeColorToken,
  type ColorOption,
} from '@/types/badge'

interface Props {
  modelValue?: string[]
  badges: BadgeItem[]
  label?: string
  labelClass?: string
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  allowCreate?: boolean
  removable?: boolean
  getUsageCount?: (badgeId: string) => number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  badges: () => [],
  label: '',
  labelClass: '',
  placeholder: 'الصاق برچسب...',
  hint: '',
  error: '',
  required: false,
  disabled: false,
  allowCreate: true,
  removable: false,
  getUsageCount: () => 0,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
  (e: 'create-badge', badge: { title: string; color: BadgeColorToken }): void
}>()

const dropdownPickerRef = ref<InstanceType<typeof BadgeDropdownPicker> | null>(null)

const selectedBadgeList = computed(() => {
  return props.badges.filter((b) => props.modelValue.includes(b.id))
})

const getColorOption = (key: BadgeColorToken): ColorOption => {
  return semanticColors.find((c) => c.key === key) ?? semanticColors[0]!
}

const getBadgeClasses = (colorKey: BadgeColorToken): string => {
  const opt = getColorOption(colorKey)
  return `!h-6 !px-2.5 text-xs font-bold font-dots-1 leading-none ${opt.outlineClass}`
}

const handleUpdateValue = (val: string[]) => {
  emit('update:modelValue', val)
}

const handleChange = (val: string[]) => {
  emit('change', val)
}

const handleCreateBadge = (badge: { title: string; color: BadgeColorToken }) => {
  emit('create-badge', badge)
}

const removeBadge = (badgeId: string) => {
  const updated = props.modelValue.filter((id) => id !== badgeId)
  emit('update:modelValue', updated)
  emit('change', updated)
}

const clearAll = () => {
  emit('update:modelValue', [])
  emit('change', [])
}

const openPicker = () => {
  dropdownPickerRef.value?.openDropdown?.()
}

defineExpose({
  openPicker,
})
</script>
