<template>
  <div class="w-full h-full min-h-screen overflow-y-auto p-3 sm:p-6 md:p-8 bg-surface-100 flex flex-col items-center justify-start gap-6 font-sans text-right select-none" dir="rtl">
    
    <!-- 1. Top Simulation Control Panel -->
    <div class="w-full max-w-[1280px] bg-white-80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-primary-8 flex flex-col gap-4 shadow-sm">
      
      <!-- Bar Header: Title, Badges & Links -->
      <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-primary-6">
        <div class="flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-success-100 animate-pulse"></span>
          <h2 class="text-xs sm:text-sm font-extrabold text-primary-100 font-dots-1">
            کنترل‌پنل شبیه‌سازی ماژول جامع خزانه‌داری (Treasury Sandbox Studio)
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 text-2xs font-mono font-bold bg-primary-6 text-primary-80 rounded-lg border border-primary-12">
            کل تراکنش‌ها: {{ toPersianNumber(transactionsList.length) }}
          </span>
          <router-link
            to="/documents"
            class="px-2.5 py-1 rounded-lg bg-primary-8 hover:bg-primary-12 text-primary-80 hover:text-primary-100 text-2xs font-bold font-dots-1 flex items-center gap-1 transition-colors"
          >
            <span>جدول مرجع اسناد</span>
            <Icon icon="solar:arrow-left-bold" class="w-3 h-3" />
          </router-link>
        </div>
      </div>

      <!-- Quick Action Controls & Simulation Triggers -->
      <div class="flex items-center justify-between gap-3 flex-wrap text-xs font-semibold font-dots-1">
        
        <!-- Group 1: Modal Direct Open Triggers -->
        <div class="flex items-center gap-2 flex-wrap">
          <!-- Open Receipt Modal -->
          <BaseButton
            type="primary"
            style-type="fill"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:card-receive-bold-duotone"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl shadow-xs"
            @click="openModalWithMode('receive')"
          >
            <span>باز کردن مودال دریافت</span>
          </BaseButton>

          <!-- Open Payment Modal -->
          <BaseButton
            type="primary"
            style-type="fill"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:card-send-bold-duotone"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl shadow-xs"
            @click="openModalWithMode('payment')"
          >
            <span>باز کردن مودال پرداخت</span>
          </BaseButton>

          <!-- Open Expense Modal -->
          <BaseButton
            type="primary"
            style-type="fill"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:document-text-bold-duotone"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl shadow-xs"
            @click="openModalWithMode('expense')"
          >
            <span>باز کردن مودال هزینه</span>
          </BaseButton>
        </div>

        <!-- Group 2: Simulation Toggles & Controls -->
        <div class="flex items-center gap-2 flex-wrap mr-auto">
          <!-- Loading Skeleton State Toggle -->
          <BaseButton
            type="primary"
            :style-type="simulateLoading ? 'fill' : 'outline'"
            size="sm"
            :show-start-icon="true"
            :start-icon="simulateLoading ? 'solar:spinner-bold-duotone' : 'solar:play-circle-linear'"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl"
            @click="toggleSimulateLoading"
          >
            <span>{{ simulateLoading ? 'اسکلتون: فعال' : 'شبیه‌سازی اسکلتون' }}</span>
          </BaseButton>

          <!-- Empty State Toggle -->
          <BaseButton
            type="primary"
            :style-type="simulateEmpty ? 'fill' : 'outline'"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:box-minimalistic-bold-duotone"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl"
            @click="toggleSimulateEmpty"
          >
            <span>{{ simulateEmpty ? 'وضعیت خالی: فعال' : 'شبیه‌سازی وضعیت خالی' }}</span>
          </BaseButton>

          <!-- Reset Mock Data Button -->
          <BaseButton
            type="primary"
            style-type="outline"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:restart-bold"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl"
            title="بازنشانی اطلاعات به حالت ماک اولیه"
            @click="resetMockData"
          >
            <span>بازنشانی داده‌ها</span>
          </BaseButton>
        </div>

      </div>

    </div>

    <!-- 2. Summary Cards Section -->
    <div class="w-full max-w-[1280px]">
      <TreasurySummaryCards
        :total-receipts="summaryStats.totalReceipts"
        :total-payments="summaryStats.totalPayments"
        :total-expenses="summaryStats.totalExpenses"
        :receipts-count="summaryStats.receiptsCount"
        :payments-count="summaryStats.paymentsCount"
        :expenses-count="summaryStats.expensesCount"
      />
    </div>

    <!-- 3. Treasury Table Section (Skeleton or Data Table) -->
    <div class="w-full max-w-[1280px]">
      <Transition name="fade-slide" mode="out-in">
        <!-- Skeleton View -->
        <TreasuryTableSkeleton v-if="simulateLoading" key="skeleton" :rows="6" />

        <!-- Actual Table View -->
        <TreasuryTable
          v-else
          key="table"
          :transactions="filteredTransactions"
          :current-page="currentPage"
          :page-size="pageSize"
          :total-count="filteredTransactions.length"
          :search-query="searchQuery"
          @create="openModalWithMode('receive')"
          @view="handleViewTransaction"
          @edit="handleEditTransaction"
          @void="handleVoidTransaction"
          @history="handleHistoryTransaction"
          @update:current-page="(p) => currentPage = p"
          @update:page-size="(s) => pageSize = s"
          @update:search-query="handleSearchQuery"
          @filter-type="handleFilterType"
          @export-excel="handleExportExcel"
          @batch-print="handleBatchPrint"
          @bulk-print="handleBulkPrint"
          @bulk-export="handleBulkExport"
          @bulk-void="handleBulkVoid"
        />
      </Transition>
    </div>

    <!-- 4. Interactive Action Log Stream Panel -->
    <div class="w-full max-w-[1280px] bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 p-4 flex flex-col gap-3 shadow-xs font-dots-1">
      <div class="flex items-center justify-between pb-2 border-b border-primary-6">
        <div class="flex items-center gap-2">
          <Icon icon="solar:clipboard-list-bold-duotone" class="w-4 h-4 text-primary-80" />
          <h3 class="text-xs sm:text-sm font-bold text-primary-100">
            لاگ رویدادها و اکشن‌های زنده (Live Action Logger)
          </h3>
          <span class="text-2xs px-2 py-0.5 rounded-md bg-primary-6 text-primary-60 font-mono">
            {{ actionLogs.length }} رویداد
          </span>
        </div>

        <button
          type="button"
          class="text-2xs text-primary-60 hover:text-primary-100 hover:underline cursor-pointer"
          @click="actionLogs = []"
        >
          پاک کردن تاریخچه لاگ
        </button>
      </div>

      <!-- Log Entries Container -->
      <div class="flex flex-col gap-1.5 max-h-48 overflow-y-auto font-mono text-2xs p-1">
        <div 
          v-if="actionLogs.length === 0" 
          class="text-primary-40 py-4 text-center font-sans text-xs"
        >
          هنوز رویدادی ثبت نشده است. روی دکمه‌های جدول یا مودال کلیک کنید تا وقایع در اینجا ثبت شوند.
        </div>
        <div
          v-for="(log, idx) in actionLogs"
          :key="'log-' + idx"
          class="flex items-center gap-2.5 p-2 rounded-lg transition-colors"
          :class="getLogItemClass(log.type)"
        >
          <span class="opacity-60 text-[10px] shrink-0 font-mono">[{{ log.time }}]</span>
          <span class="font-bold shrink-0 font-sans">({{ log.action }}):</span>
          <span class="truncate font-sans flex-1">{{ log.message }}</span>
        </div>
      </div>
    </div>

    <!-- 5. Treasury Action Modal (Create / Edit) -->
    <TreasuryActionModal
      v-model:is-open="isActionModalOpen"
      :initial-mode="modalInitialMode"
      :title="editingItem ? `ویرایش ${editingItem.title || editingItem.trackingNumber}` : undefined"
      :doc-number="editingItem ? editingItem.trackingNumber : 'TR-10500'"
      :default-amount="editingItem ? editingItem.amount : ''"
      :default-description="editingItem ? editingItem.description : ''"
      :default-date="editingItem ? editingItem.date : '۱۴۰۵/۰۵/۱۷'"
      :default-payment-method="editingItem?.paymentMethod || 'pos_bank'"
      @submit="handleTransactionSubmit"
      @close="editingItem = null"
    />

    <!-- 6. Treasury Voucher Modal (Details / Print) -->
    <TreasuryVoucherModal
      v-model:is-open="isVoucherModalOpen"
      :transaction="selectedTransactionForVoucher"
      @print="handlePrintVoucher"
    />

    <!-- 7. Treasury History Modal -->
    <TreasuryHistoryModal
      v-model:is-open="isHistoryModalOpen"
      :transaction="selectedTransactionForHistory"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import TreasurySummaryCards from '@/components/treasury/TreasurySummaryCards.vue'
import TreasuryTable, { type TreasuryTransactionItem } from '@/components/treasury/TreasuryTable.vue'
import TreasuryTableSkeleton from '@/components/treasury/TreasuryTableSkeleton.vue'
import TreasuryActionModal from '@/components/treasury/TreasuryActionModal.vue'
import TreasuryVoucherModal from '@/components/treasury/TreasuryVoucherModal.vue'
import TreasuryHistoryModal from '@/components/treasury/TreasuryHistoryModal.vue'
import type { TransactionMode } from '@/components/transaction/TransactionFormModal.vue'
import { toPersianNumber, formatCurrency } from '@/utils/formatters'
import { useToast } from '@/composables/useToast'

const toast = useToast()

// Simulation States
const simulateLoading = ref(false)
const simulateEmpty = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const activeFilter = ref('all')

// Modal States
const isActionModalOpen = ref(false)
const modalInitialMode = ref<TransactionMode>('receive')
const editingItem = ref<TreasuryTransactionItem | null>(null)

const isVoucherModalOpen = ref(false)
const selectedTransactionForVoucher = ref<TreasuryTransactionItem | null>(null)

const isHistoryModalOpen = ref(false)
const selectedTransactionForHistory = ref<TreasuryTransactionItem | null>(null)

// Comprehensive Initial Mock Dataset (9 rows covering all requirements)
const INITIAL_MOCK_DATA: TreasuryTransactionItem[] = [
  {
    id: '1',
    trackingNumber: 'TR-10491',
    date: '۱۴۰۵/۰۵/۱۴',
    type: 'receive',
    partyName: 'وحید مومنی',
    title: 'دریافت از شخص وحید مومنی',
    amount: 35000000,
    description: 'تسویه فاکتور فروش شماره ۱۴۰۱ و حق‌العمل بازاریابی',
    createdAt: '۱۰:۱۵ ۱۴۰۵/۰۵/۱۴',
    createdBy: 'فاطمه حسینی',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک سامان — پوز فروشگاه (۸۸۱۴)'
  },
  {
    id: '2',
    trackingNumber: 'TR-10492',
    date: '۱۴۰۵/۰۵/۱۴',
    type: 'payment',
    partyName: 'شرکت فناوری پارس',
    title: 'پرداخت به تامین‌کننده شرکت فناوری پارس',
    amount: 82000000,
    description: 'خرید تجهیزات سرور و کابل‌کشی شبکه دفتر مرکزی',
    createdAt: '۱۱:۳۰ ۱۴۰۵/۰۵/۱۴',
    createdBy: 'علیرضا باقری',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک ملت — جاری مرکزی (۲۴۸۹)'
  },
  {
    id: '3',
    trackingNumber: 'TR-10493',
    date: '۱۴۰۵/۰۵/۱۵',
    type: 'expense',
    partyName: 'قبض برق و آب مغازه',
    title: 'هزینه قبض برق و آب مغازه',
    amount: 4500000,
    description: 'پرداخت صورتحساب دوره تابستان مصرف برق شعبه مرکزی',
    createdAt: '۱۳:۰۰ ۱۴۰۵/۰۵/۱۵',
    createdBy: 'مدیر سیستم',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک ملت — جاری مرکزی (۲۴۸۹)'
  },
  {
    id: '4',
    trackingNumber: 'TR-10494',
    date: '۱۴۰۵/۰۵/۱۵',
    type: 'receive',
    partyName: 'فروشگاه نیکو گستر',
    title: 'دریافت از فروشگاه نیکو گستر',
    amount: 150000000,
    description: 'پیش‌پرداخت قرارداد تامین کالا و قطعات مصرفی',
    createdAt: '۱۴:۴۵ ۱۴۰۵/۰۵/۱۵',
    createdBy: 'فاطمه حسینی',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک ملی — حساب سپرده (۴۴۰۱)'
  },
  {
    id: '5',
    trackingNumber: 'TR-10495',
    date: '۱۴۰۵/۰۵/۱۶',
    type: 'payment',
    partyName: 'تولیدی کارتن آریا',
    title: 'پرداخت فاکتور خرید مواد اولیه',
    amount: 65400000,
    description: 'تسویه حساب تامین‌کننده کارتن و بسته‌بندی صادراتی',
    createdAt: '۰۹:۲۰ ۱۴۰۵/۰۵/۱۶',
    createdBy: 'علیرضا باقری',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک ملت — جاری مرکزی (۲۴۸۹)'
  },
  {
    id: '6',
    trackingNumber: 'TR-10496',
    date: '۱۴۰۵/۰۵/۱۶',
    type: 'expense',
    partyName: 'حقوق و دستمزد کارشناس فنی',
    title: 'هزینه حقوق و دستمزد کارشناس',
    amount: 120000000,
    description: 'مساعده و حقوق مردادماه کارشناس ارشد پشتیبانی نرم‌افزار',
    createdAt: '۱۱:۰۰ ۱۴۰۵/۰۵/۱۶',
    createdBy: 'مدیر سیستم',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک ملت — جاری مرکزی (۲۴۸۹)'
  },
  {
    id: '7',
    trackingNumber: 'TR-10497',
    date: '۱۴۰۵/۰۵/۱۶',
    type: 'expense',
    partyName: 'اجاره دفتر مرکزی',
    title: 'هزینه اجاره دفتر مرکزی',
    amount: 250000000,
    description: 'اجاره‌بهای ماهانه دفتر مرکزی طبق قرارداد موجر',
    createdAt: '۱۲:۱۵ ۱۴۰۵/۰۵/۱۶',
    createdBy: 'مدیر سیستم',
    status: 'confirmed',
    paymentMethod: 'pos_bank',
    accountTitle: 'بانک سامان — پوز فروشگاه (۸۸۱۴)'
  },
  {
    id: '8',
    trackingNumber: 'TR-10498',
    date: '۱۴۰۵/۰۵/۱۶',
    type: 'payment',
    partyName: 'تسویه پیش‌فاکتور کنسل‌شده',
    title: 'پرداخت بابت استرداد پیش‌فاکتور (باطل‌شده)',
    amount: 18000000,
    description: 'فسخ قرارداد خدمات به درخواست مشتری و صدور سند برگشت',
    createdAt: '۱۵:۴۰ ۱۴۰۵/۰۵/۱۶',
    createdBy: 'علیرضا باقری',
    status: 'voided',
    paymentMethod: 'cash',
    accountTitle: 'صندوق فروشگاه مرکزی'
  },
  {
    id: '9',
    trackingNumber: 'TR-10499',
    date: '۱۴۰۵/۰۵/۱۷',
    type: 'receive',
    partyName: 'مهدی احمدی',
    title: 'دریافت نقدی از مهدی احمدی',
    amount: 12000000,
    description: 'تسویه حساب الباقی مانده بدهی به صورت نقد',
    createdAt: '۱۶:۰۴ ۱۴۰۵/۰۵/۱۷',
    createdBy: 'فاطمه حسینی',
    status: 'confirmed',
    paymentMethod: 'cash',
    accountTitle: 'صندوق دم‌دستی / دخل نقد'
  }
]

const transactionsList = ref<TreasuryTransactionItem[]>([...INITIAL_MOCK_DATA])

// Action Logs
export interface ActionLogItem {
  time: string
  action: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

const actionLogs = ref<ActionLogItem[]>([
  {
    time: new Date().toLocaleTimeString('fa-IR'),
    action: 'راه‌اندازی سندباکس',
    message: 'ماژول خزانه‌داری با ۹ تراکنش نمونه در محیط ایزوله راه‌اندازی گردید.',
    type: 'info'
  }
])

const addLog = (action: string, message: string, type: ActionLogItem['type'] = 'info') => {
  actionLogs.value.unshift({
    time: new Date().toLocaleTimeString('fa-IR'),
    action,
    message,
    type
  })
}

const getLogItemClass = (type: ActionLogItem['type']) => {
  switch (type) {
    case 'success': return 'bg-success-8 text-success-100 border-r-2 border-success-100'
    case 'warning': return 'bg-warning-8 text-warning-100 border-r-2 border-warning-100'
    case 'error': return 'bg-error-8 text-error-100 border-r-2 border-error-100'
    case 'info':
    default: return 'bg-info-8 text-info-100 border-r-2 border-info-100'
  }
}

// Filtered Transactions
const filteredTransactions = computed(() => {
  if (simulateEmpty.value) return []
  
  return transactionsList.value.filter(item => {
    // Filter Type
    if (activeFilter.value === 'voided') {
      if (item.status !== 'voided') return false
    } else if (activeFilter.value !== 'all') {
      if (item.type !== activeFilter.value) return false
    }

    // Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchTrack = item.trackingNumber.toLowerCase().includes(q)
      const matchParty = (item.partyName || '').toLowerCase().includes(q)
      const matchDesc = (item.description || '').toLowerCase().includes(q)
      const matchTitle = (item.title || '').toLowerCase().includes(q)
      if (!matchTrack && !matchParty && !matchDesc && !matchTitle) return false
    }

    return true
  })
})

// Summary Stats
const summaryStats = computed(() => {
  let totalReceipts = 0
  let totalPayments = 0
  let totalExpenses = 0
  let receiptsCount = 0
  let paymentsCount = 0
  let expensesCount = 0

  // Calculate from active confirmed transactions
  transactionsList.value.forEach(item => {
    if (item.status === 'voided') return
    if (item.type === 'receive') {
      totalReceipts += item.amount
      receiptsCount++
    } else if (item.type === 'payment') {
      totalPayments += item.amount
      paymentsCount++
    } else if (item.type === 'expense') {
      totalExpenses += item.amount
      expensesCount++
    }
  })

  return {
    totalReceipts,
    totalPayments,
    totalExpenses,
    receiptsCount,
    paymentsCount,
    expensesCount
  }
})

// Handlers
const openModalWithMode = (mode: TransactionMode) => {
  editingItem.value = null
  modalInitialMode.value = mode
  isActionModalOpen.value = true
  addLog('باز کردن فرم', `مودال عملیات در تب "${mode === 'receive' ? 'دریافت' : (mode === 'payment' ? 'پرداخت' : 'هزینه')}" باز شد.`, 'info')
}

const toggleSimulateLoading = () => {
  simulateLoading.value = !simulateLoading.value
  addLog('تغییر وضعیت شبیه‌سازی', `حالت اسکلتون لودینگ ${simulateLoading.value ? 'فعال' : 'غیرفعال'} شد.`, 'warning')
}

const toggleSimulateEmpty = () => {
  simulateEmpty.value = !simulateEmpty.value
  addLog('تغییر وضعیت شبیه‌سازی', `حالت جدول خالی ${simulateEmpty.value ? 'فعال' : 'غیرفعال'} شد.`, 'warning')
}

const resetMockData = () => {
  transactionsList.value = [...INITIAL_MOCK_DATA]
  simulateLoading.value = false
  simulateEmpty.value = false
  searchQuery.value = ''
  activeFilter.value = 'all'
  addLog('بازنشانی اطلاعات', 'داده‌های تستی خزانه‌داری به حالت پیش‌فرض بازگردانده شدند.', 'info')
  toast.success('داده‌های ماک خزانه‌داری بازنشانی شدند.')
}

const handleSearchQuery = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
  addLog('جستجو در جدول', `کلیدواژه "${query}" اعمال شد.`, 'info')
}

const handleFilterType = (type: string) => {
  activeFilter.value = type
  currentPage.value = 1
  addLog('فیلتر نوع تراکنش', `فیلتر روی دسته "${type}" قرار گرفت.`, 'info')
}

const handleViewTransaction = (item: TreasuryTransactionItem) => {
  selectedTransactionForVoucher.value = item
  isVoucherModalOpen.value = true
  addLog('مشاهده فیش', `فیش تراکنش ${item.trackingNumber} مشاهده گردید.`, 'info')
}

const handleEditTransaction = (item: TreasuryTransactionItem) => {
  editingItem.value = item
  modalInitialMode.value = item.type
  isActionModalOpen.value = true
  addLog('ویرایش تراکنش', `فرم ویرایش برای تراکنش ${item.trackingNumber} باز شد.`, 'info')
}

const handleVoidTransaction = (item: TreasuryTransactionItem) => {
  const index = transactionsList.value.findIndex(t => t.id === item.id)
  if (index !== -1) {
    const updated = { ...transactionsList.value[index]!, status: 'voided' as const }
    transactionsList.value.splice(index, 1, updated)
    addLog('ابطال تراکنش', `تراکنش ${item.trackingNumber} با موفقیت ابطال شد.`, 'error')
    toast.error(`تراکنش ${item.trackingNumber} باطل شد.`)
  }
}

const handleHistoryTransaction = (item: TreasuryTransactionItem) => {
  selectedTransactionForHistory.value = item
  isHistoryModalOpen.value = true
  addLog('مشاهده تاریخچه', `تاریخچه تغییرات و سند حسابداری برای ${item.trackingNumber} بررسی شد.`, 'info')
}

const handlePrintVoucher = (item: TreasuryTransactionItem) => {
  addLog('چاپ فیش رسمی', `دستور چاپ برای فیش ${item.trackingNumber} صادر گردید.`, 'success')
  toast.success(`فیش ${item.trackingNumber} جهت چاپ ارسال شد.`)
}

const handleExportExcel = () => {
  addLog('خروجی اکسل', `خروجی اکسل از ${filteredTransactions.value.length} رکورد تهیه گردید.`, 'success')
  toast.success('فایل خروجی اکسل آماده بارگیری شد.')
}

const handleBatchPrint = () => {
  addLog('چاپ دسته‌ای', `دستور چاپ گروهی برای کلیه رکوردهای فیلترشده صادر گردید.`, 'success')
  toast.info('فرایند چاپ گروهی اسناد آغاز شد.')
}

const handleBulkPrint = (ids: (string | number)[]) => {
  addLog('چاپ گروهی انتخابی', `${ids.length} مورد برای چاپ گروهی ارسال شد.`, 'success')
  toast.success(`${toPersianNumber(ids.length)} مورد جهت چاپ ارسال شد.`)
}

const handleBulkExport = (ids: (string | number)[]) => {
  addLog('خروجی گروهی انتخابی', `${ids.length} مورد انتخابی خروجی گرفته شد.`, 'success')
  toast.success(`خروجی ${toPersianNumber(ids.length)} مورد با موفقیت ایجاد شد.`)
}

const handleBulkVoid = (ids: (string | number)[]) => {
  transactionsList.value = transactionsList.value.map(t => {
    if (ids.includes(t.id)) {
      return { ...t, status: 'voided' as const }
    }
    return t
  })
  addLog('ابطال گروهی', `${ids.length} تراکنش انتخاب‌شده به وضعیت باطل‌شده تغییر یافتند.`, 'error')
  toast.error(`${toPersianNumber(ids.length)} تراکنش باطل شدند.`)
}

const handleTransactionSubmit = (payload: {
  mode: TransactionMode
  partyId?: string | number
  expenseCategory?: string
  amount: number
  paymentMethod: 'cash' | 'pos_bank'
  bankId?: string | number
  cashBoxId?: string | number
  trackingNumber?: string
  date: string
  description: string
}) => {
  if (editingItem.value) {
    // Update existing item
    const index = transactionsList.value.findIndex(t => t.id === editingItem.value!.id)
    if (index !== -1) {
      transactionsList.value[index] = {
        ...transactionsList.value[index]!,
        type: payload.mode,
        amount: payload.amount,
        date: payload.date,
        description: payload.description,
        paymentMethod: payload.paymentMethod
      }
      addLog('به‌روزرسانی تراکنش', `اطلاعات تراکنش ${editingItem.value.trackingNumber} با موفقیت به‌روزرسانی شد.`, 'success')
      toast.success('اطلاعات با موفقیت ذخیره شد.')
    }
    editingItem.value = null
  } else {
    // Create new transaction
    const newId = String(Date.now()).slice(-5)
    const newTracking = `TR-${Math.floor(10500 + Math.random() * 500)}`
    const newItem: TreasuryTransactionItem = {
      id: newId,
      trackingNumber: newTracking,
      date: payload.date || '۱۴۰۵/۰۵/۱۷',
      type: payload.mode,
      partyName: payload.mode === 'expense' ? `هزینه (${payload.expenseCategory || 'سایر'})` : 'طرف‌حساب جدید',
      title: payload.mode === 'expense' ? `ثبت هزینه ${payload.expenseCategory || ''}` : `عملیات ${payload.mode === 'receive' ? 'دریافت' : 'پرداخت'} وجه`,
      amount: payload.amount,
      description: payload.description || 'تراکنش جدید ثبت‌شده در سندباکس',
      createdAt: 'همین الان',
      createdBy: 'کاربر جاری',
      status: 'confirmed',
      paymentMethod: payload.paymentMethod,
      accountTitle: payload.paymentMethod === 'cash' ? 'صندوق فروشگاه مرکزی' : 'بانک ملت — جاری مرکزی'
    }

    transactionsList.value.unshift(newItem)
    addLog('ثبت رویداد جدید', `تراکنش جدید با شماره ${newTracking} و مبلغ ${formatCurrency(payload.amount)} ریال ثبت شد.`, 'success')
    toast.success('تراکنش جدید با موفقیت در خزانه‌داری ثبت شد.')
  }

  isActionModalOpen.value = false
}
</script>
