<template>
  <div
    class="w-full h-full min-h-screen overflow-y-auto p-3 sm:p-6 md:p-8 bg-surface-100 flex flex-col items-center justify-start gap-6 font-sans text-right select-none"
    dir="rtl"
  >
    <!-- Header & Sandbox Control Bar -->
    <header
      class="w-full max-w-[1160px] bg-white-80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-primary-8 flex flex-col gap-4 shadow-sm"
    >
      <div class="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-primary-6">
        <div class="flex items-center gap-3">
          <div
            class="w-11 h-11 rounded-2xl bg-primary-8 text-primary-100 flex items-center justify-center border border-primary-16 shadow-2xs"
          >
            <Icon icon="solar:calculator-bold-duotone" class="w-7 h-7 text-primary-100" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-black text-black-100 font-dots-1">
                سندباکس مهندسی کیپد مالی و ماشین‌حساب موبایل (FinancialKeypad)
              </h1>
              <span
                class="px-2 py-0.5 rounded-full bg-success-8 text-success-100 border border-success-16 text-2xs font-mono font-bold"
              >
                v1.0 Mobile-Thumb-Ergonomics
              </span>
            </div>
            <p class="text-xs text-black-60 font-dots-1 mt-0.5">
              آزمایش ارگونومی شست، ترنزیشن شیت، محاسبه درجا، انیمیشن لرزش و مقیاس‌پذیری فونت در ویوپورت‌های استاندارد
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <!-- Reset State -->
          <BaseButton
            type="primary"
            style-type="outline"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:restart-bold"
            class="font-dots-1 text-xs font-semibold !h-8 px-3 !rounded-xl"
            @click="resetSandbox"
          >
            <span>بازنشانی سندباکس</span>
          </BaseButton>
        </div>
      </div>

      <!-- Controls: Mobile Width & Test Mode Switchers -->
      <div class="flex items-center justify-between flex-wrap gap-3">
        <!-- Viewport Width Presets -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-xs font-bold text-black-60 font-dots-1 ms-1">عرض شبیه‌ساز:</span>
          <button
            type="button"
            v-for="vp in viewportPresets"
            :key="vp.width"
            @click="selectedViewportWidth = vp.width"
            :class="[
              'h-8 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-1.5',
              selectedViewportWidth === vp.width
                ? 'bg-primary-100 text-white-100 border-primary-100 shadow-xs'
                : 'bg-white-80 text-black-60 border-black-12 hover:bg-white-100 hover:text-black-100',
            ]"
          >
            <Icon :icon="vp.icon" class="w-3.5 h-3.5" />
            <span>{{ vp.label }} ({{ vp.width }}px)</span>
          </button>
        </div>

        <!-- Render Mode Switcher: Bottom Sheet vs Inline -->
        <div class="flex items-center gap-1.5 bg-black-6 p-1 rounded-xl border border-black-8">
          <button
            type="button"
            @click="displayMode = 'sheet'"
            :class="[
              'h-7 px-2.5 rounded-lg text-xs font-dots-1 font-bold transition-all cursor-pointer flex items-center gap-1.5',
              displayMode === 'sheet'
                ? 'bg-white-100 text-primary-100 shadow-2xs'
                : 'text-black-60 hover:text-black-100',
            ]"
          >
            <Icon icon="solar:maximize-square-minimalistic-bold-duotone" class="w-3.5 h-3.5" />
            <span>شیت شناور (Bottom Sheet)</span>
          </button>
          <button
            type="button"
            @click="displayMode = 'inline'"
            :class="[
              'h-7 px-2.5 rounded-lg text-xs font-dots-1 font-bold transition-all cursor-pointer flex items-center gap-1.5',
              displayMode === 'inline'
                ? 'bg-white-100 text-primary-100 shadow-2xs'
                : 'text-black-60 hover:text-black-100',
            ]"
          >
            <Icon icon="solar:widget-3-bold-duotone" class="w-3.5 h-3.5" />
            <span>کیپد درجا (Inline)</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Preset Test Scenarios Strip -->
    <div
      class="w-full max-w-[1160px] bg-white-60 rounded-2xl p-3 border border-primary-8 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-2xs"
    >
      <span class="text-xs font-bold text-black-80 font-dots-1 shrink-0 flex items-center gap-1">
        <Icon icon="solar:test-tube-bold-duotone" class="w-4 h-4 text-secondary-100" />
        سناریوهای آزمون خودکار:
      </span>

      <button
        type="button"
        v-for="scenario in testScenarios"
        :key="scenario.id"
        @click="runScenario(scenario)"
        class="h-8 px-3 rounded-xl bg-white-100 hover:bg-primary-6 border border-primary-12 text-black-80 hover:text-primary-100 text-xs font-dots-1 font-semibold transition-all shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 active:scale-95"
      >
        <Icon :icon="scenario.icon" class="w-3.5 h-3.5 text-primary-80" />
        <span>{{ scenario.title }}</span>
      </button>
    </div>

    <!-- Main Content Workspace -->
    <main class="w-full max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Column: Realistic Phone Simulator (7 Columns on Large Screens) -->
      <section
        class="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#1a1a1a] rounded-3xl border border-[#333] shadow-xl relative min-h-[640px]"
      >
        <div class="text-xs text-white-40 font-mono mb-3 flex items-center gap-2">
          <Icon icon="solar:smartphone-bold-duotone" class="w-4 h-4 text-[#0d99ff]" />
          <span>Device Simulation Frame: {{ selectedViewportWidth }}px</span>
        </div>

        <!-- Phone Mockup Container -->
        <div
          class="bg-surface-100 rounded-[38px] border-4 border-[#2b2b2b] shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300"
          :style="{
            width: `${selectedViewportWidth}px`,
            minHeight: '620px',
            maxHeight: '660px',
          }"
        >
          <!-- Phone Status Bar & Dynamic Island / Notch -->
          <div
            class="w-full h-9 bg-surface-100 px-6 flex items-center justify-between text-[11px] font-mono text-black-60 shrink-0 select-none border-b border-black-6"
            dir="ltr"
          >
            <span>09:41</span>
            <div class="w-20 h-4 bg-black-100 rounded-full" />
            <div class="flex items-center gap-1.5 text-black-60">
              <Icon icon="solar:wi-fi-bold" class="w-3.5 h-3.5" />
              <Icon icon="solar:battery-charge-bold" class="w-3.5 h-3.5" />
            </div>
          </div>

          <!-- Phone Inner Content App Form Area -->
          <div class="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            <!-- Simulated Transaction Form -->
            <div class="bg-white-100 p-4 rounded-2xl border border-black-8 shadow-2xs flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-black-6 pb-2">
                <span class="text-xs font-bold text-black-80 font-dots-1">ثبت سند دریافت/پرداخت</span>
                <span class="px-2 py-0.5 rounded-md bg-secondary-8 text-secondary-100 text-2xs font-bold font-dots-1">
                  فرم موبایل
                </span>
              </div>

              <!-- Beneficiary / Contact Field -->
              <div class="flex flex-col gap-1">
                <label class="text-2xs text-black-60 font-dots-1">طرف حساب / مشتری:</label>
                <div class="h-9 px-3 bg-surface-100 rounded-xl border border-black-8 flex items-center text-xs font-medium text-black-80">
                  فروشگاه ابزارآلات برادران احمدی
                </div>
              </div>

              <!-- Native Keyboard Suppress Field (Readonly click-to-open keypad) -->
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-2xs font-bold text-primary-100 font-dots-1 flex items-center gap-1">
                    <Icon icon="solar:wallet-money-bold-duotone" class="w-3.5 h-3.5" />
                    <span>مبلغ تراکنش (ریال):</span>
                  </label>
                  <span class="text-3xs text-black-40 font-dots-1">لمس جهت باز شدن کیپد</span>
                </div>

                <!-- Input with inputmode="none" and readonly to prevent native OS keyboard -->
                <button
                  type="button"
                  @click="isSheetOpen = true"
                  class="w-full h-12 px-3.5 bg-surface-100 hover:bg-white-80 border-2 border-primary-24 hover:border-primary-100 rounded-xl flex items-center justify-between text-start cursor-pointer transition-all active:scale-[0.99] group shadow-2xs"
                >
                  <span
                    class="font-mono font-bold text-base tracking-tight"
                    :class="[currentAmount > 0 ? 'text-black-100' : 'text-black-40']"
                    dir="ltr"
                  >
                    {{ currentAmount > 0 ? formatCurrency(currentAmount) : '۰' }}
                  </span>

                  <div class="flex items-center gap-1.5 text-xs text-primary-80 font-dots-1">
                    <span>ریال</span>
                    <Icon
                      icon="solar:alt-arrow-left-linear"
                      class="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                    />
                  </div>
                </button>

                <!-- Words equivalent under form field -->
                <div class="text-2xs text-black-60 font-dots-1 px-1 mt-0.5">
                  معادل حروفی:
                  <span class="font-bold text-primary-100">
                    {{ currentAmount > 0 ? getPersianWords(currentAmount) : 'صفر ریال' }}
                  </span>
                </div>
              </div>

              <!-- Description Field -->
              <div class="flex flex-col gap-1">
                <label class="text-2xs text-black-60 font-dots-1">بابت / شرح:</label>
                <div class="h-9 px-3 bg-surface-100 rounded-xl border border-black-8 flex items-center text-xs text-black-60">
                  تسویه فاکتور فروش شماره ۱۴۰۵
                </div>
              </div>
            </div>

            <!-- Inline Keypad (If in inline display mode) -->
            <div v-if="displayMode === 'inline'" class="w-full mt-auto">
              <FinancialKeypad
                v-model="currentAmount"
                :inline="true"
                title="کیپد مالی درجا"
                currency="rial"
                @submit="handleFinalSubmit"
              />
            </div>
          </div>

          <!-- Bottom Sheet Mode Keypad (Rendered inside the phone simulator) -->
          <FinancialKeypad
            v-if="displayMode === 'sheet'"
            v-model="currentAmount"
            v-model:is-open="isSheetOpen"
            :inline="false"
            title="ماشین‌حساب و کیپد مالی"
            currency="rial"
            @submit="handleFinalSubmit"
          />

          <!-- Home Indicator (Safe Area Simulator) -->
          <div class="w-full h-5 flex items-center justify-center bg-surface-100 shrink-0 pb-1">
            <div class="w-32 h-1 bg-black-24 rounded-full" />
          </div>
        </div>
      </section>

      <!-- Right Column: Verification Stats, Guide & Audit Logs (5 Columns on Large Screens) -->
      <section class="lg:col-span-5 flex flex-col gap-4">
        <!-- Card 1: Live Telemetry & Inspector -->
        <div class="bg-white-80 backdrop-blur-md rounded-2xl p-4 border border-primary-8 flex flex-col gap-3 shadow-xs">
          <div class="flex items-center justify-between pb-2 border-b border-primary-6">
            <div class="flex items-center gap-2">
              <Icon icon="solar:radar-bold-duotone" class="w-5 h-5 text-[#0d99ff]" />
              <h2 class="text-xs font-bold text-black-100 font-dots-1">تله‌متری وضعیت لحظه‌ای کیپد</h2>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-primary-6 text-primary-100 text-2xs font-mono font-bold">
              {{ currentAmount }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-2xs">
            <div class="p-2.5 rounded-xl bg-surface-100 border border-black-8 flex flex-col gap-1">
              <span class="text-black-40 font-dots-1">مبلغ به ریال:</span>
              <span class="font-mono font-bold text-sm text-black-100 text-start" dir="ltr">
                {{ formatCurrency(currentAmount) }} ریال
              </span>
            </div>

            <div class="p-2.5 rounded-xl bg-surface-100 border border-black-8 flex flex-col gap-1">
              <span class="text-black-40 font-dots-1">معادل به تومان:</span>
              <span class="font-mono font-bold text-sm text-success-100 text-start" dir="ltr">
                {{ formatCurrency(Math.floor(currentAmount / 10)) }} تومان
              </span>
            </div>
          </div>

          <div class="p-2.5 rounded-xl bg-surface-100 border border-black-8 flex flex-col gap-1 text-2xs">
            <span class="text-black-40 font-dots-1">معادل کامل فارسی و ریالی:</span>
            <span class="font-bold text-primary-100 font-dots-1 leading-relaxed">
              {{ getPersianWords(currentAmount) }}
            </span>
          </div>

          <!-- Open Sheet Button -->
          <BaseButton
            v-if="displayMode === 'sheet'"
            type="primary"
            style-type="fill"
            size="md"
            class="w-full !rounded-xl font-dots-1 font-bold !h-10 mt-1"
            :show-start-icon="true"
            start-icon="solar:calculator-minimalistic-bold-duotone"
            @click="isSheetOpen = true"
          >
            <span>باز کردن شیت کیپد مالی</span>
          </BaseButton>
        </div>

        <!-- Card 2: Ergonomic Specs Checklist -->
        <div class="bg-white-80 backdrop-blur-md rounded-2xl p-4 border border-primary-8 flex flex-col gap-2.5 shadow-xs">
          <div class="flex items-center gap-2 pb-2 border-b border-primary-6">
            <Icon icon="solar:checklist-minimalistic-bold-duotone" class="w-5 h-5 text-success-100" />
            <h3 class="text-xs font-bold text-black-100 font-dots-1">چک‌لیست استانداردهای ارگونومی شست</h3>
          </div>

          <ul class="flex flex-col gap-2 text-2xs text-black-80 font-dots-1">
            <li class="flex items-start gap-2">
              <Icon icon="solar:check-circle-bold" class="w-4 h-4 text-success-100 shrink-0 mt-0.5" />
              <span><strong>استقرار در یک‌سوم پایین:</strong> دسترسی سریع شست بدون کشیدگی تاندون (Thumb Strain).</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="solar:check-circle-bold" class="w-4 h-4 text-success-100 shrink-0 mt-0.5" />
              <span><strong>کلیدهای ۰۰ و ۰۰۰ زیر ۱ تا ۳:</strong> حداقل مسافت جابجایی دست برای ورود سریع صفرهای ریالی.</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="solar:check-circle-bold" class="w-4 h-4 text-success-100 shrink-0 mt-0.5" />
              <span><strong>کلید تایید دوبرابری (۱۱۶px):</strong> لمس تضمینی و بدون خطا با شست راست یا چپ.</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="solar:check-circle-bold" class="w-4 h-4 text-success-100 shrink-0 mt-0.5" />
              <span><strong>سرکوب کیبورد سیستمی:</strong> باز نشدن کیبورد گوشی و جلوگیری از پرش و تغییر سایز صفحه.</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="solar:check-circle-bold" class="w-4 h-4 text-success-100 shrink-0 mt-0.5" />
              <span><strong>انیمیشن لرزش و مقیاس فونت:</strong> محافظت از سرریز ۱۲ رقمی و عدم اسکرول افقی.</span>
            </li>
          </ul>
        </div>

        <!-- Card 3: Action Audit History Logs -->
        <div class="bg-white-80 backdrop-blur-md rounded-2xl p-4 border border-primary-8 flex flex-col gap-2.5 shadow-xs">
          <div class="flex items-center justify-between pb-2 border-b border-primary-6">
            <div class="flex items-center gap-2">
              <Icon icon="solar:history-bold-duotone" class="w-5 h-5 text-secondary-100" />
              <h3 class="text-xs font-bold text-black-100 font-dots-1">تاریخچه رویدادها و تست‌ها</h3>
            </div>
            <button
              type="button"
              @click="auditLogs = []"
              class="text-3xs text-black-40 hover:text-error-100 font-dots-1 cursor-pointer"
            >
              پاکسازی لاگ
            </button>
          </div>

          <div class="max-h-36 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
            <div
              v-for="(log, idx) in auditLogs"
              :key="idx"
              class="p-2 rounded-lg bg-surface-100 border border-black-6 flex items-center justify-between text-2xs"
            >
              <span class="text-black-80 font-dots-1">{{ log.text }}</span>
              <span class="text-black-40 font-mono text-3xs" dir="ltr">{{ log.time }}</span>
            </div>
            <div v-if="auditLogs.length === 0" class="text-center py-3 text-black-40 text-2xs font-dots-1">
              هنوز رویدادی ثبت نشده است.
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FinancialKeypad from '@/components/ui/FinancialKeypad.vue'
import {
  formatCurrency,
  convertNumberToPersianWords,
} from '@/utils/formatters'

interface ViewportPreset {
  width: number
  label: string
  icon: string
}

const viewportPresets: ViewportPreset[] = [
  { width: 360, label: 'اندروید اقتصادی', icon: 'solar:smartphone-2-linear' },
  { width: 390, label: 'آیفون استاندارد', icon: 'solar:smartphone-linear' },
  { width: 430, label: 'آیفون پرو مکس', icon: 'solar:smartphone-update-linear' },
]

const props = defineProps<{
  statusId?: string
}>()

const selectedViewportWidth = ref<number>(390)
const displayMode = ref<'sheet' | 'inline'>('sheet')
const isSheetOpen = ref(true)
const currentAmount = ref<number>(4850000)

// React to Sandbox Status changes from right sidebar
watch(
  () => props.statusId,
  (newStatus) => {
    if (!newStatus) return
    if (newStatus === 'single-thumb') {
      displayMode.value = 'sheet'
      currentAmount.value = 4850000
      isSheetOpen.value = true
      addLog('فعال‌سازی وضعیت: تست ثبت تک‌دستی (۴ -> ۸ -> ۵ -> ۰۰۰)')
    } else if (newStatus === 'calculation') {
      displayMode.value = 'sheet'
      currentAmount.value = 65000
      isSheetOpen.value = true
      addLog('فعال‌سازی وضعیت: تست خرید ترکیبی (۲۵,۰۰۰ + ۴۰,۰۰۰ = ۶۵,۰۰۰)')
    } else if (newStatus === 'edge-cases') {
      displayMode.value = 'sheet'
      currentAmount.value = 1000000000000
      isSheetOpen.value = true
      addLog('فعال‌سازی وضعیت: آزمون سرریز ۱۲ رقمی و خطای تقسیم بر صفر')
    } else if (newStatus === 'inline-mode') {
      displayMode.value = 'inline'
      currentAmount.value = 4850000
      addLog('فعال‌سازی وضعیت: حالت کیپد درجا (Inline Keypad)')
    } else if (newStatus === 'mobile-simulator' || newStatus === 'default' || newStatus === 'sheet') {
      displayMode.value = 'sheet'
      isSheetOpen.value = true
    }
  },
  { immediate: true },
)

interface AuditLog {
  text: string
  time: string
}
const auditLogs = ref<AuditLog[]>([
  { text: 'سندباکس راه‌اندازی شد (مقدار اولیه: ۴,۸۵۰,۰۰۰ ریال)', time: new Date().toLocaleTimeString('fa-IR') },
])

function addLog(text: string) {
  auditLogs.value.unshift({
    text,
    time: new Date().toLocaleTimeString('fa-IR'),
  })
}

function handleFinalSubmit(val: number) {
  addLog(`مبلغ نهایی تایید شد: ${formatCurrency(val)} ریال`)
}

function getPersianWords(amount: number): string {
  if (amount === 0) return 'صفر ریال'
  const toman = Math.floor(amount / 10)
  const words = convertNumberToPersianWords(toman)
  return `${words} تومان / ${formatCurrency(amount)} ریال`
}

function resetSandbox() {
  currentAmount.value = 0
  isSheetOpen.value = true
  addLog('سندباکس بازنشانی شد.')
}

interface TestScenario {
  id: string
  title: string
  icon: string
  run: () => void
}

const testScenarios: TestScenario[] = [
  {
    id: 'single-thumb',
    title: 'تست ثبت ۴,۸۵۰,۰۰۰ ریال (۴ لمس)',
    icon: 'solar:hand-stars-bold-duotone',
    run: () => {
      currentAmount.value = 4850000
      isSheetOpen.value = true
      addLog('سناریو ۱: درج مبلغ ۴,۸۵۰,۰۰۰ ریال با شست (۴ -> ۸ -> ۵ -> ۰۰۰ -> تایید)')
    },
  },
  {
    id: 'calculation',
    title: 'تست خرید ترکیبی (۲۵هزار + ۴۰هزار)',
    icon: 'solar:calculator-bold-duotone',
    run: () => {
      currentAmount.value = 65000
      isSheetOpen.value = true
      addLog('سناریو ۲: محاسبه خرید ترکیبی ۲۵,۰۰۰ + ۴۰,۰۰۰ = ۶۵,۰۰۰ ریال')
    },
  },
  {
    id: 'divide-zero',
    title: 'تست خطای تقسیم بر صفر',
    icon: 'solar:danger-circle-bold-duotone',
    run: () => {
      currentAmount.value = 0
      isSheetOpen.value = true
      addLog('سناریو ۳: آزمون تقسیم بر صفر (بررسی متن قرمز و قفل شدن دکمه مساوی)')
    },
  },
  {
    id: 'overflow',
    title: 'تست سرریز ۱۲ رقمی (۱۰۰ میلیارد تومان)',
    icon: 'solar:layers-minimalistic-bold-duotone',
    run: () => {
      currentAmount.value = 1000000000000
      isSheetOpen.value = true
      addLog('سناریو ۴: آزمون سرریز ۱۲ رقمی و عدم اسکرول افقی با مقیاس فونت نرم')
    },
  },
]

function runScenario(s: TestScenario) {
  s.run()
}
</script>
