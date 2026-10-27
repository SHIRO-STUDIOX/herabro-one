<template>
  <div ref="containerRef" class="relative inline-block text-right font-sans select-none" dir="rtl">
    <!-- Trigger Slot or Default Trigger Button -->
    <div ref="triggerRef" class="inline-flex items-center" @click="toggleDropdown">
      <slot
        name="trigger"
        :is-open="isOpen"
        :toggle="toggleDropdown"
        :active-filters-count="activeFiltersCount"
      >
        <button
          type="button"
          class="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold select-none shrink-0 transition-all duration-200 cursor-pointer active:scale-95 outline-none whitespace-nowrap border"
          :class="[
            activeFiltersCount > 0
              ? 'bg-secondary-8 hover:bg-secondary-16 text-secondary-100 border-secondary-100/30 ring-1 ring-secondary-100/20 shadow-2xs'
              : 'bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100 border-primary-12',
            isOpen ? 'ring-2 ring-primary-16' : ''
          ]"
        >
          <Icon icon="solar:tuning-2-bold-duotone" class="w-4 h-4 shrink-0" />
          <span>{{ label }}</span>
          <BaseBadge
            v-if="activeFiltersCount > 0"
            size="2xs"
            type="secondary"
            style-type="soft"
            class="font-mono font-bold"
          >
            {{ toPersianNumber(activeFiltersCount) }}
          </BaseBadge>
        </button>
      </slot>
    </div>

    <!-- Dropdown Popover / Modal Overlay -->
    <Teleport to="body">
      <!-- Backdrop Overlay for Mobile Dialog Mode -->
      <Transition name="dialog-backdrop">
        <div
          v-if="isOpen && isMobile"
          class="fixed inset-0 z-[9998] bg-black-20/40 backdrop-blur-sm transition-opacity"
          @click="closeDropdown"
        />
      </Transition>

      <Transition :name="isMobile ? 'dialog-pop' : 'dropdown-popover'">
        <div
          v-if="isOpen"
          ref="dropdownMenuRef"
          :style="isMobile ? undefined : dropdownPositionStyle"
          :class="[
            'fixed z-[9990] bg-white-60 backdrop-blur-xl rounded-2xl p-3 flex flex-col gap-2.5 text-right font-sans select-none transition-all duration-200',
            isMobile
              ? 'inset-x-3 bottom-3 sm:inset-0 m-auto w-[calc(100vw-24px)] max-w-[420px] h-fit max-h-[88dvh] overflow-y-auto no-scrollbar'
              : 'w-[460px] max-w-[calc(100vw-32px)] max-h-[min(580px,calc(100vh-32px))]'
          ]"
          dir="rtl"
          role="dialog"
          :aria-modal="isMobile"
          @click.stop
        >
          <!-- 1. Header (Inspired by BadgeDropdownPicker design) -->
          <div class="flex items-center justify-between pb-1 shrink-0">
            <div class="flex items-center gap-2 min-w-0">
              <div
                class="w-6.5 h-6.5 rounded-full bg-primary-6 text-primary-100 flex items-center justify-center shrink-0"
              >
                <Icon icon="solar:tuning-2-bold-duotone" class="w-3.5 h-3.5" />
              </div>
              <span class="text-xs font-bold text-primary-100 font-dots-1 truncate">
                {{ title }}
              </span>
              <BaseBadge
                v-if="activeFiltersCount > 0"
                type="secondary"
                style-type="soft"
                size="2xs"
                class="font-mono font-bold shrink-0"
              >
                {{ toPersianNumber(activeFiltersCount) }} فیلتر فعال
              </BaseBadge>
            </div>

            <!-- Close Button -->
            <button
              type="button"
              class="w-6 h-6 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-100 hover:bg-primary-12 active:scale-90 transition-all cursor-pointer outline-none shrink-0"
              title="بستن (Esc)"
              @click="closeDropdown"
            >
              <Icon icon="solar:close-circle-linear" class="w-4 h-4" />
            </button>
          </div>

          <!-- 2. Form Body (Scrollable container for small screens) -->
          <div class="flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto no-scrollbar px-0.5 py-0.5">
            <!-- Fields Section (Row 1 to Row 4: ID, Type, Status, Date, Description) with bg-white-80 -->
            <div class="flex flex-col gap-2 p-2.5 rounded-xl bg-white-80">
              <!-- Row 1: ID / Doc Number & Systemic Status -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <!-- Field 1: ID / Document Number -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:hashtag-square-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>شناسه / شماره سند</span>
                  </label>
                  <div class="relative flex items-center">
                    <input
                      v-model="localFilters.id"
                      type="text"
                      placeholder="مثلاً: 1045"
                      class="w-full h-7.5 px-2.5 text-xs font-mono rounded-xl bg-white-100 border border-primary-12 text-primary-100 placeholder:text-2xs placeholder:font-sans placeholder:text-primary-40 outline-none focus:border-secondary-100 focus:ring-1 focus:ring-secondary-100/20 transition-all"
                      @keydown.enter.prevent="handleApply"
                    />
                    <button
                      v-if="localFilters.id"
                      type="button"
                      class="absolute left-2 text-primary-40 hover:text-primary-80 cursor-pointer"
                      @click="localFilters.id = ''"
                    >
                      <Icon icon="solar:close-circle-linear" class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <!-- Field 2: Is Systemic (سیستمی / دستی) -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:cpu-bolt-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>نوع ثبت (سیستمی)</span>
                  </label>
                  <BaseDropdown
                    v-model="localFilters.isSystemic"
                    :options="systemicOptions"
                    size="xs"
                    title=""
                    title-state="out"
                    :menu-min-width="210"
                  />
                </div>
              </div>

              <!-- Row 2: Document Type & Status -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <!-- Field 3: Document Type (نوع سند) -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:documents-minimalistic-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>نوع سند</span>
                  </label>
                  <BaseDropdown
                    v-model="localFilters.type"
                    :options="documentTypeDropdownOptions"
                    size="xs"
                    title=""
                    title-state="out"
                    placeholder="همه انواع اسناد"
                    :filled="true"
                    :searchable="true"
                    :menu-min-width="230"
                  />
                </div>

                <!-- Field 4: Status (وضعیت سند) -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:check-read-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>وضعیت سند</span>
                  </label>
                  <BaseDropdown
                    v-model="localFilters.status"
                    :options="statusOptions"
                    size="xs"
                    title=""
                    title-state="out"
                    :menu-min-width="190"
                  />
                </div>
              </div>

              <!-- Row 3: Date Range (از تاریخ / تا تاریخ) with DatePickerModal -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <!-- From Date -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:calendar-date-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>از تاریخ سند</span>
                  </label>
                  <div class="relative flex items-center">
                    <input
                      v-model="localFilters.fromDate"
                      type="text"
                      placeholder="۱۴۰۳/۰۱/۰۱"
                      class="w-full h-7.5 px-2.5 pl-8 text-xs font-mono rounded-xl bg-white-100 border border-primary-12 text-primary-100 placeholder:text-2xs placeholder:font-sans placeholder:text-primary-40 outline-none focus:border-secondary-100 focus:ring-1 focus:ring-secondary-100/20 transition-all cursor-pointer"
                      @click="openFromDatePicker"
                    />
                    <button
                      type="button"
                      class="absolute left-1.5 p-1 text-primary-40 hover:text-primary-100 hover:bg-primary-6 rounded-md transition-all cursor-pointer"
                      title="انتخاب از تقویم"
                      @click="openFromDatePicker"
                    >
                      <Icon icon="solar:calendar-linear" class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- To Date -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:calendar-date-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>تا تاریخ سند</span>
                  </label>
                  <div class="relative flex items-center">
                    <input
                      v-model="localFilters.toDate"
                      type="text"
                      placeholder="۱۴۰۳/۱۲/۲۹"
                      class="w-full h-7.5 px-2.5 pl-8 text-xs font-mono rounded-xl bg-white-100 border border-primary-12 text-primary-100 placeholder:text-2xs placeholder:font-sans placeholder:text-primary-40 outline-none focus:border-secondary-100 focus:ring-1 focus:ring-secondary-100/20 transition-all cursor-pointer"
                      @click="openToDatePicker"
                    />
                    <button
                      type="button"
                      class="absolute left-1.5 p-1 text-primary-40 hover:text-primary-100 hover:bg-primary-6 rounded-md transition-all cursor-pointer"
                      title="انتخاب از تقویم"
                      @click="openToDatePicker"
                    >
                      <Icon icon="solar:calendar-linear" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Row 4: Description Input -->
              <div class="flex flex-col gap-0.5">
                <label class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                  <Icon icon="solar:document-text-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                  <span>شرح یا توضیحات سند</span>
                </label>
                <div class="relative flex items-center">
                  <input
                    v-model="localFilters.description"
                    type="text"
                    placeholder="جستجو در متن شرح سند..."
                    class="w-full h-7.5 pr-2.5 pl-7 text-xs rounded-xl bg-white-100 border border-primary-12 text-primary-100 placeholder:text-2xs placeholder:text-primary-40 outline-none focus:border-secondary-100 focus:ring-1 focus:ring-secondary-100/20 transition-all"
                    @keydown.enter.prevent="handleApply"
                  />
                  <button
                    v-if="localFilters.description"
                    type="button"
                    class="absolute left-2 text-primary-40 hover:text-primary-80 cursor-pointer"
                    @click="localFilters.description = ''"
                  >
                    <Icon icon="solar:close-circle-linear" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Row 5: Badges Filter (BaseBadgeField Component) -->
            <div class="flex flex-col gap-0.5">
              <BaseBadgeField
                v-model="badgeFieldModel"
                :badges="badgeFieldItems"
                placeholder="انتخاب برچسب‌ها جهت فیلتر..."
                :allow-create="false"
                :removable="true"
              >
                <template #label>
                  <span class="text-2xs font-bold text-primary-70 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:tag-bold-duotone" class="w-3.5 h-3.5 text-primary-50" />
                    <span>فیلتر برچسب‌ها</span>
                  </span>
                </template>
              </BaseBadgeField>
            </div>

            <!-- Row 6: Fiscal Year Scope (Creative card design with interactive toggle) -->
            <div
              class="flex items-center justify-between p-2 px-2.5 rounded-xl transition-all duration-200 select-none cursor-pointer"
              :class="[
                localFilters.inSelectedFiscalYear
                  ? 'bg-primary-6/60 hover:bg-primary-6/80'
                  : 'bg-white-40 hover:bg-white-80'
              ]"
              @click="localFilters.inSelectedFiscalYear = !localFilters.inSelectedFiscalYear"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div
                  class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  :class="[
                    localFilters.inSelectedFiscalYear
                      ? 'bg-primary-100 text-white-100'
                      : 'bg-primary-8 text-primary-60'
                  ]"
                >
                  <Icon
                    :icon="localFilters.inSelectedFiscalYear ? 'solar:calendar-mark-bold-duotone' : 'solar:calendar-linear'"
                    class="w-3.5 h-3.5"
                  />
                </div>
                <span class="text-2xs font-bold text-primary-100 font-dots-1 select-none">
                  جستجو در سال مالی انتخابی
                </span>
              </div>

              <!-- Switch & Badge on the left (RTL) -->
              <div class="flex items-center gap-1.5 shrink-0" @click.stop>
                <BaseBadge
                  :type="localFilters.inSelectedFiscalYear ? 'primary' : 'neutral'"
                  style-type="soft"
                  size="2xs"
                  class="font-dots-1 font-semibold hidden sm:inline-flex"
                >
                  {{ localFilters.inSelectedFiscalYear ? 'سال فعال' : 'همه سال‌ها' }}
                </BaseBadge>
                <BaseSwitch
                  v-model="localFilters.inSelectedFiscalYear"
                  size="sm"
                  type="primary"
                />
              </div>
            </div>
          </div>

          <!-- 3. Minimal Footer Actions (Matching BadgeDropdownPicker design) -->
          <div class="flex items-center justify-between pt-1 mt-0.5 text-2xs font-sans shrink-0">
            <!-- Right (RTL): Reset Filters -->
            <button
              type="button"
              class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-primary-60 hover:text-error-100 hover:bg-error-100/10 active:scale-95 transition-all cursor-pointer font-bold font-dots-1 outline-none"
              :disabled="activeFiltersCount === 0"
              :class="activeFiltersCount === 0 ? 'opacity-35 pointer-events-none' : ''"
              @click="handleReset"
            >
              <Icon icon="solar:restart-bold" class="w-3.5 h-3.5" />
              <span>بازنشانی فیلترها</span>
            </button>

            <!-- Left (RTL): Cancel & Apply -->
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                class="px-2.5 py-1 rounded-lg text-primary-70 hover:bg-primary-6 hover:text-primary-100 active:scale-95 transition-all cursor-pointer font-bold font-dots-1 outline-none"
                @click="closeDropdown"
              >
                انصراف
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-1 px-3.5 py-1 rounded-lg bg-primary-100 hover:bg-primary-80 text-white-100 active:scale-95 shadow-xs transition-all cursor-pointer font-bold font-dots-1 outline-none"
                @click="handleApply"
              >
                <Icon icon="solar:magnifer-bold" class="w-3.5 h-3.5" />
                <span>اعمال جستجو</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Date Picker Modals for From / To Date -->
      <DatePickerModal
        v-model:is-open="isFromDatePickerOpen"
        :current-value="localFilters.fromDate"
        :z-index="10005"
        @confirm="handleFromDateConfirm"
      />
      <DatePickerModal
        v-model:is-open="isToDatePickerOpen"
        :current-value="localFilters.toDate"
        :z-index="10005"
        @confirm="handleToDateConfirm"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseBadgeField from '@/components/ui/BaseBadgeField.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import BaseSwitch from '@/components/ui/BaseSwitch.vue'
import DatePickerModal, { type DatePickerResult } from '@/components/base/DatePickerModal.vue'
import { DOCUMENT_TYPE_LABELS } from '@/api/types'
import { semanticColors, type ColorOption } from '@/types/badge'
import { toPersianNumber } from '@/utils/formatters'

export interface DocumentAdvancedFilters {
  id: string
  isSystemic: 'all' | 'systemic' | 'manual'
  type: string
  status: 'all' | 'DRAFT' | 'APPROVED'
  fromDate: string
  toDate: string
  description: string
  tagIds: (string | number)[]
  inSelectedFiscalYear: boolean
}

export interface BadgeItem {
  id: string | number
  title: string
  color?: string
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    /** Trigger button label */
    label?: string
    /** Popover Title */
    title?: string
    /** Current filters state */
    modelValue?: Partial<DocumentAdvancedFilters>
    /** Available tags list */
    badges?: BadgeItem[]
    /** Controlled open state */
    open?: boolean
  }>(),
  {
    label: 'جستجو پیشرفته',
    title: 'جستجوی پیشرفته اسناد',
    modelValue: () => ({}),
    badges: () => [],
    open: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', filters: DocumentAdvancedFilters): void
  (e: 'update:open', isOpen: boolean): void
  (e: 'search', filters: DocumentAdvancedFilters): void
  (e: 'reset'): void
  (e: 'create-badge', badge: { title: string; color: string }): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownMenuRef = ref<HTMLElement | null>(null)
const internalOpen = ref(false)
const isMobile = ref(false)
const dropdownPositionStyle = ref<Record<string, string>>({})

// Date Picker modal reactive states
const isFromDatePickerOpen = ref(false)
const isToDatePickerOpen = ref(false)

const openFromDatePicker = () => {
  isFromDatePickerOpen.value = true
}

const openToDatePicker = () => {
  isToDatePickerOpen.value = true
}

const handleFromDateConfirm = (res: DatePickerResult) => {
  localFilters.value.fromDate = res.persianShortDate
}

const handleToDateConfirm = (res: DatePickerResult) => {
  localFilters.value.toDate = res.persianShortDate
}

// Helpers for Badge styling matching Badges & Tags Studio
const getColorOption = (key?: string): ColorOption => {
  return semanticColors.find((c) => c.key === key) ?? semanticColors[0]!
}

const getBadgeClasses = (colorKey?: string): string => {
  const opt = getColorOption(colorKey)
  return `!h-6 !px-2.5 text-xs font-bold font-dots-1 leading-none ${opt.outlineClass}`
}

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640
  }
}

const isOpen = computed({
  get: () => (props.open !== undefined ? props.open : internalOpen.value),
  set: (val: boolean) => {
    internalOpen.value = val
    emit('update:open', val)
  },
})

const defaultFilters: DocumentAdvancedFilters = {
  id: '',
  isSystemic: 'all',
  type: '',
  status: 'all',
  fromDate: '',
  toDate: '',
  description: '',
  tagIds: [],
  inSelectedFiscalYear: true,
}

const localFilters = ref<DocumentAdvancedFilters>({
  ...defaultFilters,
  ...props.modelValue,
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localFilters.value = {
        ...defaultFilters,
        ...newVal,
      }
    }
  },
  { deep: true },
)

const documentTypeOptions = computed(() => DOCUMENT_TYPE_LABELS)

// Dropdown options matching Hesabro design system standards
const systemicOptions = [
  { label: 'همه اسناد (دستی و سیستمی)', value: 'all', icon: 'solar:layers-minimalistic-linear' },
  { label: 'فقط اسناد دستی (حسابدار)', value: 'manual', icon: 'solar:user-hand-up-linear' },
  { label: 'فقط اسناد سیستمی (اتوماتیک)', value: 'systemic', icon: 'solar:cpu-bolt-linear' },
]

const documentTypeDropdownOptions = computed(() => [
  { label: 'همه انواع اسناد', value: '', icon: 'solar:documents-minimalistic-linear' },
  ...Object.entries(documentTypeOptions.value).map(([key, label]) => ({
    label,
    value: key,
    icon: 'solar:document-text-linear',
  })),
])

const statusOptions = [
  { label: 'همه وضعیت‌ها', value: 'all', icon: 'solar:list-check-linear' },
  { label: 'تایید شده', value: 'APPROVED', icon: 'solar:check-circle-bold' },
  { label: 'پیش‌نویس', value: 'DRAFT', icon: 'solar:document-outline' },
]

const extraCreatedBadges = ref<BadgeItem[]>([])

const availableBadges = computed<BadgeItem[]>(() => {
  const baseList: BadgeItem[] =
    props.badges && props.badges.length > 0
      ? props.badges
      : [
          { id: 'badge-vip', title: 'مشتری خوش‌حساب', color: 'primary' },
          { id: 'badge-settled', title: 'تسویه‌شده', color: 'success' },
          { id: 'badge-urgent', title: 'پیگیری فوری', color: 'error' },
          { id: 'badge-inquiry', title: 'در انتظار پاسخ', color: 'warning' },
          { id: 'badge-legal', title: 'واحد حقوقی', color: 'info' },
          { id: 'badge-archive', title: 'بایگانی‌شده', color: 'neutral' },
        ]

  return [...baseList, ...extraCreatedBadges.value]
})

// Adapt availableBadges to typed BadgeItem[] for BaseBadgeField
const badgeFieldItems = computed<any[]>(() => {
  return availableBadges.value.map((b) => ({
    id: String(b.id),
    title: b.title,
    color: (b.color as any) || 'primary',
  }))
})

// Two-way binding model between BaseBadgeField string[] and localFilters.tagIds
const badgeFieldModel = computed<string[]>({
  get: () => localFilters.value.tagIds.map((id) => String(id)),
  set: (val: string[]) => {
    localFilters.value.tagIds = val
  },
})

const activeFiltersCount = computed(() => {
  let count = 0
  const f = localFilters.value
  if (f.id && f.id.trim() !== '') count++
  if (f.isSystemic && f.isSystemic !== 'all') count++
  if (f.type && f.type !== '') count++
  if (f.status && f.status !== 'all') count++
  if (f.fromDate && f.fromDate.trim() !== '') count++
  if (f.toDate && f.toDate.trim() !== '') count++
  if (f.description && f.description.trim() !== '') count++
  if (f.tagIds && f.tagIds.length > 0) count += f.tagIds.length
  if (!f.inSelectedFiscalYear) count++ // deviation from default
  return count
})

const calculatePosition = () => {
  if (isMobile.value || !triggerRef.value) return

  const rect = triggerRef.value.getBoundingClientRect()
  const dropdownWidth = 460
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const menuH =
    dropdownMenuRef.value?.offsetHeight && dropdownMenuRef.value.offsetHeight > 100
      ? dropdownMenuRef.value.offsetHeight
      : 480

  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top

  // Prefer opening upwards if not enough room below and there is more room above
  const openUpwards = spaceBelow < menuH + 16 && spaceAbove > spaceBelow

  let top = openUpwards ? rect.top - menuH - 8 : rect.bottom + 8

  // Viewport vertical clamping: ensure dropdown stays comfortably within [16px, viewportHeight - menuH - 16px]
  const minTop = 16
  const maxTop = Math.max(minTop, viewportHeight - menuH - 16)
  top = Math.max(minTop, Math.min(top, maxTop))

  // Horizontal positioning in RTL:
  // Align right edge of popover with right edge of trigger
  let left = rect.right - dropdownWidth
  const minLeft = 16
  const maxLeft = Math.max(minLeft, viewportWidth - dropdownWidth - 16)
  left = Math.max(minLeft, Math.min(left, maxLeft))

  dropdownPositionStyle.value = {
    top: `${Math.round(top)}px`,
    left: `${Math.round(left)}px`,
  }
}

watch(isOpen, async (val) => {
  if (val) {
    checkMobile()
    await nextTick()
    calculatePosition()
    requestAnimationFrame(() => {
      calculatePosition()
    })
  }
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const openDropdown = () => {
  isOpen.value = true
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleReset = () => {
  localFilters.value = { ...defaultFilters }
  emit('update:modelValue', { ...defaultFilters })
  emit('reset')
}

const handleApply = () => {
  const filtersCopy = { ...localFilters.value }
  emit('update:modelValue', filtersCopy)
  emit('search', filtersCopy)
  closeDropdown()
}

const handleClickOutside = (e: MouseEvent) => {
  if (!isOpen.value) return
  if (isFromDatePickerOpen.value || isToDatePickerOpen.value) return
  const target = e.target as HTMLElement | null
  if (!target) return

  // Check if click was inside container trigger or dropdown modal
  if (
    containerRef.value?.contains(target) ||
    dropdownMenuRef.value?.contains(target)
  ) {
    return
  }

  // Check if click was inside any child teleported dropdown menu, item, or date picker modal
  if (
    target.closest?.('[data-name="Date Picker Modal"]') ||
    target.closest?.('[data-dropdown-item-index]') ||
    target.closest?.('.fixed.z-\\[9999\\]') ||
    target.closest?.('.fixed.z-\\[10005\\]')
  ) {
    return
  }

  closeDropdown()
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeDropdown()
  }
}

onMounted(() => {
  checkMobile()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', checkMobile)
    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition, true)
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
    window.removeEventListener('resize', calculatePosition)
    window.removeEventListener('scroll', calculatePosition, true)
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
  }
})

defineExpose({
  open: openDropdown,
  close: closeDropdown,
  toggle: toggleDropdown,
  reset: handleReset,
  apply: handleApply,
  filters: localFilters,
})
</script>

<style scoped>
.dropdown-popover-enter-active,
.dropdown-popover-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-popover-enter-from,
.dropdown-popover-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.dialog-pop-enter-active,
.dialog-pop-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-pop-enter-from,
.dialog-pop-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

.dialog-backdrop-enter-active,
.dialog-backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-backdrop-enter-from,
.dialog-backdrop-leave-to {
  opacity: 0;
}
</style>
