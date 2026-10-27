<template>
  <!-- Modal Mode: Bottom Sheet with Backdrop -->
  <Teleport to="body" :disabled="inline">
    <Transition name="keypad-sheet">
      <div
        v-if="isOpen || inline"
        :class="[
          inline
            ? 'w-full max-w-md mx-auto relative select-none'
            : 'fixed inset-0 z-50 flex flex-col justify-end select-none',
        ]"
        dir="rtl"
      >
        <!-- Backdrop Overlay (Modal Mode only) -->
        <div
          v-if="!inline"
          class="fixed inset-0 bg-black-100/50 backdrop-blur-xs transition-opacity duration-200"
          @click="handleClose"
        />

        <!-- Bottom Sheet Container (Ergonomic Thumb Zone) -->
        <div
          ref="sheetRef"
          class="relative w-full max-w-md mx-auto bg-surface-100 border border-black-8 shadow-2xl flex flex-col overflow-hidden transition-transform duration-200"
          :class="[
            inline ? 'rounded-3xl' : 'rounded-t-3xl max-h-[490px]',
            'pb-[env(safe-area-inset-bottom,16px)]',
          ]"
          :style="sheetTransformStyle"
        >
          <!-- 1. Header & Drag Handle (Swipe-Down Area) -->
          <div
            class="w-full flex flex-col items-center pt-2.5 pb-1 px-4 cursor-grab active:cursor-grabbing touch-none select-none"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <!-- Handle Capsule (40px x 4px) -->
            <div
              v-if="!inline"
              class="w-10 h-1 bg-black-24 rounded-full transition-opacity hover:opacity-100"
              title="برای بستن به پایین بکشید"
            />
          </div>

          <!-- 2. Display Block (88px Height Display Box) -->
          <div class="px-4 pt-1.5 pb-2">
            <div
              class="w-full h-[88px] px-2 py-1 flex flex-col justify-between transition-all"
              :class="[isShaking ? 'animate-shake' : '']"
            >
              <!-- History / Formula Line (18px height) -->
              <div
                class="h-[18px] text-xs font-mono text-black-40 text-end truncate tracking-wider"
                dir="ltr"
              >
                {{ historyFormulaText }}
              </div>

              <!-- Live Numeric Display (Scaled Font to Prevent Horizontal Scroll) -->
              <div
                class="flex items-center justify-end font-mono font-black text-black-100 tracking-tight transition-all duration-200 select-all"
                :class="[
                  displayDigitsCount > 8 ? 'text-[22px]' : 'text-[30px]',
                ]"
                dir="ltr"
              >
                <span class="leading-none truncate">{{ formattedCurrentDisplay }}</span>
                <span class="text-2xs font-sans font-medium text-black-40 ms-1.5">
                  {{ currency === 'toman' ? 'تومان' : 'ریال' }}
                </span>
              </div>

              <!-- Equivalent Persian Words & Toman/Rial Line (13px Font) -->
              <div
                class="h-[18px] text-[13px] font-dots-1 text-start truncate leading-tight flex items-center gap-1"
                :class="[
                  isDivideByZero
                    ? 'text-error-100 font-bold'
                    : 'text-primary-60 font-medium',
                ]"
              >
                <Icon
                  v-if="isDivideByZero"
                  icon="solar:danger-triangle-bold-duotone"
                  class="w-3.5 h-3.5 shrink-0"
                />
                <Icon
                  v-else
                  icon="solar:check-circle-bold-duotone"
                  class="w-3.5 h-3.5 shrink-0 text-primary-60"
                />
                <span class="truncate">{{ wordsEquivalentText }}</span>
              </div>
            </div>
          </div>

          <!-- 3. Thumb Presets Strip (Height: 36px) -->
          <div v-if="showPresets" class="px-4 pt-2.5 pb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              v-for="preset in defaultPresets"
              :key="preset.value"
              type="button"
              @click="applyPreset(preset.value)"
              class="h-8 px-3 rounded-full bg-white-80 text-black-80 hover:bg-white-100 active:scale-95 active:bg-black-6 transition-all text-xs font-dots-1 select-none flex items-center justify-center shrink-0 cursor-pointer font-semibold"
            >
              {{ preset.label }}
            </button>

            <!-- Rounding Action Chip -->
            <button
              type="button"
              @click="roundCurrentValue"
              class="h-8 px-3 rounded-full bg-primary-6 text-primary-100 hover:bg-primary-12 active:scale-95 transition-all text-xs font-dots-1 select-none flex items-center justify-center shrink-0 cursor-pointer font-bold gap-1"
            >
              <Icon icon="solar:magic-stick-3-bold-duotone" class="w-3.5 h-3.5 text-primary-80" />
              <span>رُند کردن</span>
            </button>
          </div>

          <!-- 4. 4x4 Numeric & Calculation Matrix Layout -->
          <div class="px-4 pt-1 pb-3">
            <div class="grid grid-cols-4 gap-1.5">
              <!-- Row 1: Controls & Operators (Height 54px - bg-white-60 without border/shadow) -->
              <!-- C (Clear) -->
              <button
                type="button"
                @click="handleClear"
                class="h-[54px] rounded-xl bg-white-60 hover:bg-white-80 active:scale-95 text-black-80 font-bold text-base transition-all flex items-center justify-center cursor-pointer select-none"
                title="پاک کردن کامل"
              >
                C
              </button>

              <!-- ÷ (Division) -->
              <button
                type="button"
                @click="handleOperator('÷')"
                :class="[
                  'h-[54px] rounded-xl font-mono text-lg font-bold transition-all flex items-center justify-center cursor-pointer select-none active:scale-95',
                  pendingOperator === '÷'
                    ? 'bg-primary-100 text-white-100 shadow-sm'
                    : 'bg-white-60 text-primary-100 hover:bg-white-80',
                ]"
                title="تقسیم"
              >
                ÷
              </button>

              <!-- × (Multiplication) -->
              <button
                type="button"
                @click="handleOperator('×')"
                :class="[
                  'h-[54px] rounded-xl font-mono text-lg font-bold transition-all flex items-center justify-center cursor-pointer select-none active:scale-95',
                  pendingOperator === '×'
                    ? 'bg-primary-100 text-white-100 shadow-sm'
                    : 'bg-white-60 text-primary-100 hover:bg-white-80',
                ]"
                title="ضرب"
              >
                ×
              </button>

              <!-- ⌫ (Backspace with Long-Press Dynamics) -->
              <button
                type="button"
                @click="handleBackspaceClick"
                @mousedown="startBackspaceHold"
                @mouseup="stopBackspaceHold"
                @mouseleave="stopBackspaceHold"
                @touchstart.passive="startBackspaceHold"
                @touchend="stopBackspaceHold"
                @touchcancel="stopBackspaceHold"
                class="h-[54px] rounded-xl bg-white-60 hover:bg-white-80 active:scale-95 text-error-100 font-bold transition-all flex items-center justify-center cursor-pointer select-none"
                title="حذف (نگه داشتن: پاک شدن کل)"
              >
                <Icon icon="solar:backspace-bold-duotone" class="w-6 h-6" />
              </button>

              <!-- Row 2: 7, 8, 9, - (Numbers: bg-white-100 without border/shadow) -->
              <button
                type="button"
                @click="appendDigit('7')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۷
              </button>
              <button
                type="button"
                @click="appendDigit('8')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۸
              </button>
              <button
                type="button"
                @click="appendDigit('9')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۹
              </button>
              <!-- - (Subtraction) -->
              <button
                type="button"
                @click="handleOperator('-')"
                :class="[
                  'h-[54px] rounded-xl font-mono text-xl font-bold transition-all flex items-center justify-center cursor-pointer select-none active:scale-95',
                  pendingOperator === '-'
                    ? 'bg-primary-100 text-white-100 shadow-sm'
                    : 'bg-white-60 text-primary-100 hover:bg-white-80',
                ]"
                title="تفریق"
              >
                −
              </button>

              <!-- Row 3: 4, 5, 6, + -->
              <button
                type="button"
                @click="appendDigit('4')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۴
              </button>
              <button
                type="button"
                @click="appendDigit('5')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۵
              </button>
              <button
                type="button"
                @click="appendDigit('6')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۶
              </button>
              <!-- + (Addition) -->
              <button
                type="button"
                @click="handleOperator('+')"
                :class="[
                  'h-[54px] rounded-xl font-mono text-xl font-bold transition-all flex items-center justify-center cursor-pointer select-none active:scale-95',
                  pendingOperator === '+'
                    ? 'bg-primary-100 text-white-100 shadow-sm'
                    : 'bg-white-60 text-primary-100 hover:bg-white-80',
                ]"
                title="جمع"
              >
                +
              </button>

              <!-- Rows 4 & 5: 1, 2, 3 and 00, 0, 000 with 2-row Submit/Equals Button -->
              <!-- Row 4 Numbers -->
              <button
                type="button"
                @click="appendDigit('1')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۱
              </button>
              <button
                type="button"
                @click="appendDigit('2')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۲
              </button>
              <button
                type="button"
                @click="appendDigit('3')"
                class="h-[54px] rounded-xl bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 font-mono font-bold text-xl transition-all flex items-center justify-center cursor-pointer select-none"
              >
                ۳
              </button>

              <!-- Submit / Equals Button (Spans 2 Rows vertically - Height ~116px) -->
              <button
                type="button"
                :disabled="isDivideByZero"
                @click="handleSubmitOrCalculate"
                :class="[
                  'row-span-2 rounded-xl transition-all flex flex-col items-center justify-center select-none active:scale-95 cursor-pointer',
                  isDivideByZero
                    ? 'bg-black-12 text-black-32 cursor-not-allowed opacity-60'
                    : pendingOperator
                      ? 'bg-primary-80 hover:bg-primary-100 text-white-100'
                      : 'bg-primary-60 hover:bg-primary-80 text-primary-100',
                ]"
                :title="pendingOperator ? 'محاسبه نتیجه' : 'ثبت نهایی مبلغ'"
              >
                <!-- Equals State -->
                <template v-if="pendingOperator">
                  <span class="font-mono text-3xl font-bold leading-none">=</span>
                  <span class="text-[11px] font-dots-1 mt-1 opacity-90">محاسبه</span>
                </template>

                <!-- Final Submit State -->
                <template v-else>
                  <Icon icon="solar:check-read-bold" class="w-7 h-7" />
                  <span class="text-sm font-bold font-dots-1 mt-1 tracking-wide">ثبت</span>
                </template>
              </button>

              <!-- Row 5: 00, 0, 000 (Optimized Thumb Travel under 1-3 - bg-white-100 without border/shadow) -->
              <button
                type="button"
                :disabled="isZeroDisabled"
                @click="appendMultiZero('00')"
                :class="[
                  'h-[54px] rounded-xl font-mono font-bold text-lg transition-all flex items-center justify-center select-none',
                  isZeroDisabled
                    ? 'bg-white-100/50 text-black-24 cursor-not-allowed'
                    : 'bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 cursor-pointer',
                ]"
              >
                ۰۰
              </button>
              <button
                type="button"
                :disabled="isZeroDisabled"
                @click="appendDigit('0')"
                :class="[
                  'h-[54px] rounded-xl font-mono font-bold text-xl transition-all flex items-center justify-center select-none',
                  isZeroDisabled
                    ? 'bg-white-100/50 text-black-24 cursor-not-allowed'
                    : 'bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 cursor-pointer',
                ]"
              >
                ۰
              </button>
              <button
                type="button"
                :disabled="isZeroDisabled"
                @click="appendMultiZero('000')"
                :class="[
                  'h-[54px] rounded-xl font-mono font-bold text-base transition-all flex items-center justify-center select-none',
                  isZeroDisabled
                    ? 'bg-white-100/50 text-black-24 cursor-not-allowed'
                    : 'bg-white-100 hover:bg-white-80 active:scale-95 text-black-100 cursor-pointer',
                ]"
              >
                ۰۰۰
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import {
  formatCurrency,
  convertNumberToPersianWords,
  toPersianNumber,
  parseFormattedNumber,
} from '@/utils/formatters'

export interface FinancialKeypadProps {
  modelValue?: number | string
  isOpen?: boolean
  inline?: boolean
  currency?: 'rial' | 'toman'
  maxDigits?: number
  title?: string
  showPresets?: boolean
}

const props = withDefaults(defineProps<FinancialKeypadProps>(), {
  modelValue: 0,
  isOpen: false,
  inline: false,
  currency: 'rial',
  maxDigits: 12,
  title: 'ثبت مبلغ درجا',
  showPresets: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'update:isOpen', value: boolean): void
  (e: 'submit', value: number): void
  (e: 'close'): void
}>()

// Internal calculation & input state
const currentDigits = ref<string>('')
const storedOperand = ref<number | null>(null)
const pendingOperator = ref<'+' | '-' | '×' | '÷' | null>(null)
const isDivideByZero = ref(false)
const isShaking = ref(false)

// Drag-to-dismiss state
const sheetRef = ref<HTMLElement | null>(null)
const touchStartY = ref(0)
const dragOffsetY = ref(0)
const isDragging = ref(false)

// Backspace long-press timer
let backspaceTimer: ReturnType<typeof setTimeout> | null = null
let isLongPressTriggered = false

// Sync initial value from modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    const parsed = parseFormattedNumber(newVal)
    if (parsed > 0) {
      currentDigits.value = String(parsed)
    } else {
      currentDigits.value = ''
    }
  },
  { immediate: true },
)

// Haptic feedback utility
function triggerHaptic(duration = 8) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration)
    } catch {
      // Ignore vibration errors if unsupported or blocked
    }
  }
}

// Shake animation on overflow limit
function triggerShake() {
  triggerHaptic(20)
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 350)
}

// Current numerical value of active digits
const activeNumericValue = computed<number>(() => {
  if (!currentDigits.value) return 0
  return Number(currentDigits.value) || 0
})

// Number of digits typed so far
const displayDigitsCount = computed(() => {
  return currentDigits.value.length
})

// Consecutive Zero Disabler: if input is empty or "0", disable 0, 00, 000 to prevent "0005"
const isZeroDisabled = computed(() => {
  return currentDigits.value === '' || currentDigits.value === '0'
})

// Formatted live number with 3-digit comma separators
const formattedCurrentDisplay = computed(() => {
  if (isDivideByZero.value) return 'خطا'
  if (!currentDigits.value) return '۰'
  return formatCurrency(activeNumericValue.value)
})

// History / Formula calculation display (e.g. "۱۸۰,۰۰۰ + ۴۵,۰۰۰")
const historyFormulaText = computed(() => {
  if (storedOperand.value !== null && pendingOperator.value) {
    const formattedStored = formatCurrency(storedOperand.value)
    const op = pendingOperator.value
    if (currentDigits.value) {
      return `${formattedStored} ${op} ${formatCurrency(activeNumericValue.value)}`
    }
    return `${formattedStored} ${op}`
  }
  return ''
})

// Equivalent Persian words & currency conversion text
const wordsEquivalentText = computed(() => {
  if (isDivideByZero.value) {
    return 'تقسیم بر صفر مجاز نیست'
  }

  const num = activeNumericValue.value
  if (num === 0) {
    return props.currency === 'toman' ? 'صفر تومان' : 'صفر ریال'
  }

  if (props.currency === 'rial') {
    const tomanValue = Math.floor(num / 10)
    const tomanWords = convertNumberToPersianWords(tomanValue)
    const rialFormatted = formatCurrency(num)
    if (tomanValue > 0) {
      return `${tomanWords} تومان / ${rialFormatted} ریال`
    }
    return `${rialFormatted} ریال`
  } else {
    const words = convertNumberToPersianWords(num)
    return `${words} تومان`
  }
})

// Default preset chips (+50k, +100k, +500k)
const defaultPresets = computed(() => {
  const isRial = props.currency === 'rial'
  return [
    { label: isRial ? '+۵۰ هزار' : '+۵ هزار', value: isRial ? 50000 : 5000 },
    { label: isRial ? '+۱۰۰ هزار' : '+۱۰ هزار', value: isRial ? 100000 : 10000 },
    { label: isRial ? '+۵۰۰ هزار' : '+۵۰ هزار', value: isRial ? 500000 : 50000 },
  ]
})

// Digit Entry
function appendDigit(d: string) {
  triggerHaptic()
  isDivideByZero.value = false

  // Zero overflow check (limit 12 digits = 100 Billion Tomans / 1 Trillion Rials)
  if (currentDigits.value.length >= props.maxDigits) {
    triggerShake()
    return
  }

  // Prevent leading zeroes
  if (currentDigits.value === '0') {
    currentDigits.value = d
  } else {
    currentDigits.value += d
  }
}

// Multi-zero entry ('00', '000')
function appendMultiZero(zeros: string) {
  triggerHaptic()
  isDivideByZero.value = false

  if (isZeroDisabled.value) return

  if (currentDigits.value.length + zeros.length > props.maxDigits) {
    triggerShake()
    return
  }

  currentDigits.value += zeros
}

// Operator handling (+, -, ×, ÷)
function handleOperator(op: '+' | '-' | '×' | '÷') {
  triggerHaptic()
  isDivideByZero.value = false

  // If we already have a pending operator and user typed digits, calculate first!
  if (pendingOperator.value && storedOperand.value !== null && currentDigits.value) {
    calculateInternalResult()
  }

  if (storedOperand.value === null) {
    storedOperand.value = activeNumericValue.value
  }

  pendingOperator.value = op
  currentDigits.value = ''
}

// Internal arithmetic evaluation
function calculateInternalResult(): boolean {
  if (storedOperand.value === null || !pendingOperator.value) return true

  const a = storedOperand.value
  const b = activeNumericValue.value
  let res = 0

  if (pendingOperator.value === '+') {
    res = a + b
  } else if (pendingOperator.value === '-') {
    res = Math.max(0, a - b)
  } else if (pendingOperator.value === '×') {
    res = a * b
  } else if (pendingOperator.value === '÷') {
    if (b === 0) {
      isDivideByZero.value = true
      triggerHaptic(30)
      return false
    }
    res = Math.floor(a / b)
  }

  storedOperand.value = null
  pendingOperator.value = null
  currentDigits.value = String(res)
  return true
}

// Action: Submit or Calculate
function handleSubmitOrCalculate() {
  triggerHaptic(12)

  // If pending operator exists, perform calculation first
  if (pendingOperator.value) {
    const success = calculateInternalResult()
    if (!success) return
    return
  }

  // Final Submit
  const finalVal = activeNumericValue.value
  emit('update:modelValue', finalVal)
  emit('submit', finalVal)

  if (!props.inline) {
    handleClose()
  }
}

// Action: Clear (C)
function handleClear() {
  triggerHaptic()
  currentDigits.value = ''
  storedOperand.value = null
  pendingOperator.value = null
  isDivideByZero.value = false
}

// Action: Backspace Single Click
function handleBackspaceClick() {
  if (isLongPressTriggered) {
    isLongPressTriggered = false
    return
  }

  triggerHaptic()
  isDivideByZero.value = false

  if (currentDigits.value.length > 0) {
    currentDigits.value = currentDigits.value.slice(0, -1)
  } else if (pendingOperator.value) {
    // Cancel pending operator
    pendingOperator.value = null
    if (storedOperand.value !== null) {
      currentDigits.value = String(storedOperand.value)
      storedOperand.value = null
    }
  }
}

// Backspace Long-Press Dynamics (>400ms clears all with vibration)
function startBackspaceHold() {
  isLongPressTriggered = false
  backspaceTimer = setTimeout(() => {
    isLongPressTriggered = true
    handleClear()
    triggerHaptic(30)
  }, 400)
}

function stopBackspaceHold() {
  if (backspaceTimer) {
    clearTimeout(backspaceTimer)
    backspaceTimer = null
  }
}

// Preset button clicked (+50k, etc.)
function applyPreset(amount: number) {
  triggerHaptic()
  isDivideByZero.value = false
  const current = activeNumericValue.value
  const newVal = current + amount

  const strVal = String(newVal)
  if (strVal.length > props.maxDigits) {
    triggerShake()
    return
  }
  currentDigits.value = strVal
}

// Rounding Chip
function roundCurrentValue() {
  triggerHaptic()
  isDivideByZero.value = false
  const val = activeNumericValue.value
  if (val === 0) return

  let step = 10000
  if (val >= 10000000) step = 1000000
  else if (val >= 1000000) step = 100000
  else if (val >= 100000) step = 50000

  const rounded = Math.ceil(val / step) * step
  const strVal = String(rounded)
  if (strVal.length > props.maxDigits) {
    triggerShake()
    return
  }
  currentDigits.value = strVal
}

// Swipe-Down To Dismiss Logic (>60px down dismisses sheet)
function handleTouchStart(e: TouchEvent) {
  if (props.inline) return
  if (e.touches[0]) {
    touchStartY.value = e.touches[0].clientY
    isDragging.value = true
  }
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging.value || props.inline) return
  if (e.touches[0]) {
    const delta = e.touches[0].clientY - touchStartY.value
    if (delta > 0) {
      dragOffsetY.value = delta
    }
  }
}

function handleTouchEnd() {
  if (!isDragging.value || props.inline) return
  isDragging.value = false

  if (dragOffsetY.value > 60) {
    handleClose()
  }
  dragOffsetY.value = 0
}

const sheetTransformStyle = computed(() => {
  if (props.inline || dragOffsetY.value <= 0) return {}
  return {
    transform: `translateY(${dragOffsetY.value}px)`,
  }
})

// Close sheet handler
function handleClose() {
  emit('update:isOpen', false)
  emit('close')
}

onUnmounted(() => {
  if (backspaceTimer) clearTimeout(backspaceTimer)
})
</script>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-4px);
  }
  40%,
  80% {
    transform: translateX(4px);
  }
}

.animate-shake {
  animation: shake 0.35s ease-in-out;
}

/* Sheet Transitions */
.keypad-sheet-enter-active,
.keypad-sheet-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.keypad-sheet-enter-from,
.keypad-sheet-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
