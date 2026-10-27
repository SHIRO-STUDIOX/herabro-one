<template>
  <Teleport to="body">
    <Transition name="fade">
      <!-- Modal Overlay / Backdrop -->
      <div
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black-32/50 backdrop-blur-sm overflow-y-auto"
        :class="zIndex ? '' : 'z-50'"
        :style="zIndex ? { zIndex: String(zIndex) } : undefined"
        dir="rtl"
        @click.self="handleClose"
      >
        <!-- Modal Box Dialog Container -->
        <div
          class="bg-white-60 backdrop-blur-md border border-primary-8 p-3 rounded-2xl w-full max-w-[300px] my-auto h-[384px] min-h-[384px] max-h-[432px] flex flex-col gap-2 relative transition-all duration-300"
          dir="rtl"
          data-name="Date Picker Modal"
          @click.stop
        >
          <!-- Jalali Calendar View Container -->
          <div class="w-full bg-transparent flex flex-col gap-1.5 overflow-hidden">
            <!-- Calendar Year / Month Selector Header -->
            <div
              class="flex items-center justify-between w-full"
            >
              <BaseTooltip :text="prevTooltip">
                <button
                  type="button"
                  class="p-1 hover:bg-surface-100 rounded-md transition-colors cursor-pointer"
                  @click="handlePrev"
                >
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    width="14"
                    height="14"
                    class="text-primary-100"
                  />
                </button>
              </BaseTooltip>

              <div class="flex items-center gap-1 select-none">
                <!-- Month Button -->
                <button
                  type="button"
                  class="flex items-center gap-1 text-2xs font-bold font-dots-1 rounded-md px-2 py-1 transition-all cursor-pointer outline-none"
                  :class="
                    currentView === 'months'
                      ? 'bg-primary-100 text-white-100 shadow-xs'
                      : 'text-primary-100 hover:bg-primary-6'
                  "
                  @click="toggleView('months')"
                >
                  {{ currentViewMonthName }}
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    width="12"
                    height="12"
                    class="transition-transform duration-200"
                    :class="[
                      currentView === 'months' ? 'rotate-180 text-white-100' : 'text-primary-60',
                    ]"
                  />
                </button>

                <!-- Year Button -->
                <button
                  type="button"
                  class="flex items-center gap-1 text-2xs font-bold font-dots-1 rounded-md px-2 py-1 transition-all cursor-pointer outline-none"
                  :class="
                    currentView === 'years'
                      ? 'bg-primary-100 text-white-100 shadow-xs'
                      : 'text-primary-100 hover:bg-primary-6'
                  "
                  @click="toggleView('years')"
                >
                  {{ toPersianNumber(viewYear) }}
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    width="12"
                    height="12"
                    class="transition-transform duration-200"
                    :class="[
                      currentView === 'years' ? 'rotate-180 text-white-100' : 'text-primary-60',
                    ]"
                  />
                </button>
              </div>

              <BaseTooltip :text="nextTooltip">
                <button
                  type="button"
                  class="p-1 hover:bg-surface-100 rounded-md transition-colors cursor-pointer"
                  @click="handleNext"
                >
                  <Icon
                    icon="solar:alt-arrow-left-linear"
                    width="14"
                    height="14"
                    class="text-primary-100"
                  />
                </button>
              </BaseTooltip>
            </div>

            <!-- Animated View Switcher: Days, Months, Years -->
            <div class="w-full h-[262px] relative overflow-hidden">
              <Transition name="view-fade" mode="out-in">
                <!-- Days View -->
                <div
                  v-if="currentView === 'days'"
                  key="days"
                  class="w-full h-full flex flex-col gap-1"
                >
                  <!-- Weekdays Row -->
                  <div class="grid grid-cols-7 gap-1 text-center w-full">
                    <span
                      v-for="wd in weekdays"
                      :key="wd"
                      class="text-[9px] font-bold text-primary-40 py-0.5 select-none"
                    >
                      {{ wd }}
                    </span>
                  </div>

                  <!-- Days Grid (fixed min-height for 6 rows so dialog doesn't resize between months) -->
                  <div
                    class="grid grid-cols-7 gap-1 text-center w-full min-h-[236px] content-start bg-transparent"
                  >
                    <!-- Padding days -->
                    <div
                      v-for="p in paddingDays"
                      :key="'pad-' + p"
                      class="aspect-square"
                    ></div>

                    <!-- Active days of the month -->
                    <button
                      v-for="day in daysInMonth"
                      :key="day"
                      type="button"
                      class="aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all font-dots-1 cursor-pointer"
                      :class="[
                        isSelectedDay(day)
                          ? 'bg-primary-60 text-white-100 shadow-xs'
                          : isToday(day)
                            ? 'border border-primary-30 text-primary-100 font-bold bg-primary-4 hover:bg-primary-8'
                            : 'text-primary-80 hover:bg-primary-6',
                      ]"
                      @click="selectDay(day)"
                    >
                      {{ toPersianNumber(day) }}
                    </button>
                  </div>
                </div>

                <!-- Months View -->
                <div
                  v-else-if="currentView === 'months'"
                  key="months"
                  class="w-full h-full flex items-center justify-center"
                >
                  <div class="grid grid-cols-3 gap-2 w-full p-1">
                    <button
                      v-for="(mName, idx) in monthsList"
                      :key="mName"
                      type="button"
                      class="h-11 rounded-xl flex items-center justify-center text-xs font-semibold font-dots-1 transition-all cursor-pointer"
                      :class="
                        viewMonth === idx + 1
                          ? 'bg-primary-100 text-white-100 shadow-sm font-bold'
                          : 'text-primary-80 hover:bg-primary-6 hover:text-primary-100'
                      "
                      @click="selectMonthView(idx + 1)"
                    >
                      {{ mName }}
                    </button>
                  </div>
                </div>

                <!-- Years View -->
                <div
                  v-else-if="currentView === 'years'"
                  key="years"
                  ref="yearsContainerRef"
                  class="w-full h-full overflow-y-auto custom-scrollbar p-1"
                >
                  <div class="grid grid-cols-3 gap-2 w-full">
                    <button
                      v-for="y in yearOptions"
                      :key="y"
                      :ref="(el) => setYearRef(el as HTMLElement | null, y)"
                      type="button"
                      class="h-10 rounded-xl flex items-center justify-center text-xs font-bold font-dots-1 transition-all cursor-pointer"
                      :class="
                        viewYear === y
                          ? 'bg-primary-100 text-white-100 shadow-sm font-bold'
                          : 'text-primary-80 hover:bg-primary-6 hover:text-primary-100'
                      "
                      @click="selectYearView(y)"
                    >
                      {{ toPersianNumber(y) }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Action Buttons Footer -->
          <div class="flex items-center justify-between w-full shrink-0 mt-auto">
            <!-- Today Button -->
            <button
              type="button"
              class="text-xs font-semibold text-primary-80 hover:text-primary-100 hover:bg-primary-6 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 outline-none"
              title="رفتن به تاریخ امروز"
              @click="goToToday"
            >
              <Icon
                icon="solar:calendar-date-linear"
                width="15"
                height="15"
                class="text-primary-60"
              />
              <span>امروز</span>
            </button>

            <div class="flex items-center gap-2">
              <!-- Cancel Button -->
              <BaseButton
                type="primary"
                style-type="outline"
                size="md"
                class="!w-[84px] text-xs font-semibold"
                @click="handleClose"
              >
                بستن
              </BaseButton>

              <!-- Submit Button -->
              <BaseButton
                type="primary"
                style-type="fill"
                size="md"
                class="!w-[84px] text-xs font-semibold"
                @click="handleSubmit"
              >
                تایید تاریخ
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { systemService } from '@/api'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export interface DatePickerResult {
  year: number
  month: number
  day: number
  formattedDate: string
  persianShortDate: string
}

const props = withDefaults(
  defineProps<{
    isOpen?: boolean
    initialYear?: number
    initialMonth?: number
    initialDay?: number
    currentValue?: string
    defaultToToday?: boolean
    zIndex?: number | string
  }>(),
  {
    isOpen: false,
    initialYear: undefined,
    initialMonth: undefined,
    initialDay: undefined,
    currentValue: '',
    defaultToToday: false,
    zIndex: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
  (e: 'confirm', data: DatePickerResult): void
}>()

// Persian Number Converter
const toPersianNumber = (num: number | string): string => {
  return String(num).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)] ?? d)
}

// Get local system Jalali date using standard Intl format
const getLocalSystemToday = (): { year: number; month: number; day: number } => {
  try {
    const formatter = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    const parts = formatter.formatToParts(new Date())
    const p: Record<string, string> = {}
    for (const part of parts) {
      p[part.type] = part.value
    }
    const year = Number(p.year)
    const month = Number(p.month)
    const day = Number(p.day)
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return { year, month, day }
    }
  } catch {
    // fallback
  }
  return { year: 1405, month: 7, day: 1 }
}

// Always fetch today date from server (systemService.getTime()), with graceful fallback to system local date
const fetchTodayFromServer = async (): Promise<{ year: number; month: number; day: number }> => {
  try {
    const { data } = await systemService.getTime()
    if (data?.jalali_year && data?.jalali_month && data?.jalali_day) {
      return {
        year: Number(data.jalali_year),
        month: Number(data.jalali_month),
        day: Number(data.jalali_day),
      }
    }
  } catch {
    // Network offline, sandbox, or endpoint failure: gracefully fallback to client system date
  }

  return getLocalSystemToday()
}

const todayDate = ref<{ year: number; month: number; day: number }>(getLocalSystemToday())

onMounted(async () => {
  const today = await fetchTodayFromServer()
  todayDate.value = today
  if (!props.currentValue && props.defaultToToday) {
    selectedYear.value = today.year
    selectedMonth.value = today.month
    selectedDay.value = today.day
    viewYear.value = today.year
    viewMonth.value = today.month
  }
})

// Calendar View Modes
type CalendarView = 'days' | 'months' | 'years'
const currentView = ref<CalendarView>('days')

// Calendar States: Selected Date (the actual chosen date)
const selectedYear = ref(props.initialYear ?? todayDate.value.year)
const selectedMonth = ref(props.initialMonth ?? todayDate.value.month)
const selectedDay = ref(props.initialDay ?? todayDate.value.day)

// Browsing States: View Date (the month/year currently being viewed)
const viewYear = ref(props.initialYear ?? todayDate.value.year)
const viewMonth = ref(props.initialMonth ?? todayDate.value.month)

const isToday = (day: number): boolean => {
  return (
    todayDate.value.year === viewYear.value &&
    todayDate.value.month === viewMonth.value &&
    todayDate.value.day === day
  )
}

const goToToday = async () => {
  const today = await fetchTodayFromServer()
  todayDate.value = today
  viewYear.value = today.year
  viewMonth.value = today.month
  selectedYear.value = today.year
  selectedMonth.value = today.month
  selectedDay.value = today.day
  currentView.value = 'days'
}

// Years container reference and active year reference for auto-scroll
const yearsContainerRef = ref<HTMLElement | null>(null)
let activeYearElement: HTMLElement | null = null

const setYearRef = (el: HTMLElement | null, y: number) => {
  if (y === viewYear.value) {
    activeYearElement = el
  }
}

const scrollToSelectedYear = () => {
  nextTick(() => {
    if (activeYearElement) {
      activeYearElement.scrollIntoView({ block: 'center', behavior: 'auto' })
    }
  })
}

const toggleView = (view: 'months' | 'years') => {
  if (currentView.value === view) {
    currentView.value = 'days'
  } else {
    currentView.value = view
    if (view === 'years') {
      scrollToSelectedYear()
    }
  }
}

// Wide range of years: 1300 to 1430 (suitable for manufacturing/production, historical, and future dates)
const yearOptions = computed(() => {
  const years: number[] = []
  for (let y = 1300; y <= 1430; y++) {
    years.push(y)
  }
  return years
})

const monthsList = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
]

const weekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

// Current view month name
const currentViewMonthName = computed(() => monthsList[viewMonth.value - 1] || 'شهریور')

// Jalali leap year calculation (standard 33-year cycle)
const isJalaliLeapYear = (jy: number): boolean => {
  const r = jy % 33
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(r)
}

// Days count in viewed Jalali month
const daysInMonth = computed(() => {
  if (viewMonth.value <= 6) return 31
  if (viewMonth.value <= 11) return 30
  return isJalaliLeapYear(viewYear.value) ? 30 : 29
})

// Jalali to Gregorian conversion for accurate day-of-week calculation across any year (1350-1420+)
const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
  let gy = jy <= 979 ? 621 : 1600
  jy -= jy <= 979 ? 0 : 979
  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186)
  gy += 400 * Math.floor(days / 146097)
  days %= 146097
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }
  gy += 4 * Math.floor(days / 1461)
  days %= 1461
  if (days > 365) {
    gy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  let gd = days + 1
  const salA = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]
  let gm = 0
  for (gm = 0; gm < 13; gm++) {
    const v = salA[gm] ?? 0
    if (gd <= v) break
    gd -= v
  }
  return { gy, gm, gd }
}

const getJalaliDayOfWeekIndex = (jy: number, jm: number, jd: number): number => {
  const g = jalaliToGregorian(jy, jm, jd)
  const d = new Date(g.gy, g.gm - 1, g.gd)
  return (d.getDay() + 1) % 7 // 0 = Saturday, 1 = Sunday, ..., 6 = Friday
}

// Calculate Day of Week Name
const getDayOfWeekName = (y: number, m: number, d: number) => {
  const daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
  const index = getJalaliDayOfWeekIndex(y, m, d)
  return daysOfWeek[index] ?? 'شنبه'
}

// Calculate padding cells based on day of week for 1st of current view month
const paddingDays = computed(() => {
  return getJalaliDayOfWeekIndex(viewYear.value, viewMonth.value, 1)
})

// Check if a day button is the currently selected date
const isSelectedDay = (day: number): boolean => {
  return (
    selectedDay.value === day &&
    selectedMonth.value === viewMonth.value &&
    selectedYear.value === viewYear.value
  )
}

// Formatted selected date string (long format)
const formattedSelectedDate = computed(() => {
  const dayName = getDayOfWeekName(selectedYear.value, selectedMonth.value, selectedDay.value)
  const monthName = monthsList[selectedMonth.value - 1] || 'شهریور'
  return `${dayName}، ${toPersianNumber(selectedDay.value)} ${monthName} ${toPersianNumber(selectedYear.value)}`
})

// Short Persian date format (e.g. ۱۴۰۵/۶/۶)
const persianShortDate = computed(() => {
  return `${toPersianNumber(selectedYear.value)}/${toPersianNumber(selectedMonth.value)}/${toPersianNumber(selectedDay.value)}`
})

// Day selection: updates the selected date to match current view
const selectDay = (day: number) => {
  selectedYear.value = viewYear.value
  selectedMonth.value = viewMonth.value
  selectedDay.value = day
}

// Month selection in months view: updates view month and returns to days view
const selectMonthView = (m: number) => {
  viewMonth.value = m
  currentView.value = 'days'
}

// Year selection in years view: updates view year and returns to days view
const selectYearView = (y: number) => {
  viewYear.value = y
  currentView.value = 'days'
}

const prevTooltip = computed(() => {
  if (currentView.value === 'days') return 'ماه قبل'
  if (currentView.value === 'months') return 'سال قبل'
  return 'دوره قبل'
})

const nextTooltip = computed(() => {
  if (currentView.value === 'days') return 'ماه بعد'
  if (currentView.value === 'months') return 'سال بعد'
  return 'دوره بعد'
})

const handlePrev = () => {
  if (currentView.value === 'days') {
    if (viewMonth.value > 1) {
      viewMonth.value--
    } else if (viewYear.value > 1300) {
      viewYear.value--
      viewMonth.value = 12
    }
  } else if (currentView.value === 'months') {
    if (viewYear.value > 1300) {
      viewYear.value--
    }
  } else if (currentView.value === 'years') {
    if (viewYear.value > 1310) {
      viewYear.value = Math.max(1300, viewYear.value - 12)
      scrollToSelectedYear()
    }
  }
}

const handleNext = () => {
  if (currentView.value === 'days') {
    if (viewMonth.value < 12) {
      viewMonth.value++
    } else if (viewYear.value < 1430) {
      viewYear.value++
      viewMonth.value = 1
    }
  } else if (currentView.value === 'months') {
    if (viewYear.value < 1430) {
      viewYear.value++
    }
  } else if (currentView.value === 'years') {
    if (viewYear.value < 1420) {
      viewYear.value = Math.min(1430, viewYear.value + 12)
      scrollToSelectedYear()
    }
  }
}

// Parse input string if provided
const parseDateString = (str: string) => {
  if (!str) return null
  const normalized = str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
  const parts = normalized
    .split(/[/\-.]/)
    .map(Number)
    .filter((n) => !isNaN(n))
  if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
    return { year: parts[0], month: parts[1], day: parts[2] }
  }
  return null
}

// Watch props to reset on open
watch(
  () => props.isOpen,
  async (newVal) => {
    currentView.value = 'days'
    if (newVal) {
      // Always fetch fresh date from server
      const today = await fetchTodayFromServer()
      todayDate.value = today

      if (props.currentValue) {
        const parsed = parseDateString(props.currentValue)
        if (parsed) {
          selectedYear.value = parsed.year
          selectedMonth.value = parsed.month
          selectedDay.value = parsed.day
          viewYear.value = parsed.year
          viewMonth.value = parsed.month
          return
        }
      }

      if (props.defaultToToday) {
        selectedYear.value = today.year
        selectedMonth.value = today.month
        selectedDay.value = today.day
        viewYear.value = today.year
        viewMonth.value = today.month
        return
      }

      selectedYear.value = props.initialYear ?? today.year
      selectedMonth.value = props.initialMonth ?? today.month
      selectedDay.value = props.initialDay ?? today.day
      viewYear.value = selectedYear.value
      viewMonth.value = selectedMonth.value
    }
  },
)

const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
}

const handleSubmit = () => {
  emit('confirm', {
    year: selectedYear.value,
    month: selectedMonth.value,
    day: selectedDay.value,
    formattedDate: formattedSelectedDate.value,
    persianShortDate: persianShortDate.value,
  })
  emit('update:isOpen', false)
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-24, rgba(45, 66, 76, 0.24)) transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 6px 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--primary-12, rgba(45, 66, 76, 0.12));
  border-radius: 999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--primary-24, rgba(45, 66, 76, 0.24));
}

.view-fade-enter-active,
.view-fade-leave-active {
  transition:
    opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.view-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.view-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
