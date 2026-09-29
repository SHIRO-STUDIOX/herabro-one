<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    
    <!-- 1. Top Actions Toolbar (Breadcrumb + Actions) -->
    <div class="w-full bg-white-100 rounded-2xl border border-primary-6 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
      
      <!-- Right Side (RTL Start): Current Breadcrumb Navigation -->
      <div class="flex items-center gap-2 text-right min-w-0">
        <div class="w-8 h-8 rounded-lg bg-success-8 text-success-100 flex items-center justify-center shrink-0 border border-success-12">
          <Icon icon="solar:safe-square-bold-duotone" class="w-4 h-4" />
        </div>
        <div class="flex items-center gap-1.5 text-xs sm:text-sm font-dots-1 truncate">
          <span class="font-medium text-primary-60">حسابداری، دریافت و پرداخت</span>
          <Icon icon="solar:alt-arrow-left-linear" class="w-3.5 h-3.5 text-primary-40 shrink-0" />
          <span class="font-extrabold text-primary-100">لیست عملیات خزانه‌داری</span>
        </div>
      </div>

      <!-- Left Side (RTL End): Action Buttons Group -->
      <div class="flex items-center gap-2 justify-end shrink-0 flex-wrap">
        
        <!-- Main Action Button [ ➕ ] -->
        <BaseButton
          type="primary"
          style-type="fill"
          size="sm"
          :show-start-icon="true"
          start-icon="solar:add-circle-bold"
          class="font-dots-1 text-xs font-semibold !h-8 px-2.5 sm:px-3 !rounded-xl shadow-xs"
          title="ثبت رویداد جدید خزانه‌داری"
          @click="$emit('create')"
        >
          <span class="hidden sm:inline">ثبت عملیات جدید</span>
        </BaseButton>

        <!-- Advanced Filter Button (Funnel) -->
        <button
          type="button"
          class="w-9 h-9 rounded-xl border border-primary-12 bg-white-100 hover:bg-primary-6 active:scale-95 text-primary-80 flex items-center justify-center transition-all cursor-pointer outline-none"
          :class="isFilterOpen ? 'bg-primary-6 text-primary-100 border-primary-24 shadow-2xs' : ''"
          title="فیلتر پیشرفته"
          @click="toggleFilter"
        >
          <Icon icon="solar:filter-bold-duotone" class="w-4 h-4" />
        </button>

        <!-- Quick Search Toggle Button -->
        <button
          type="button"
          class="w-9 h-9 rounded-xl border border-primary-12 bg-white-100 hover:bg-primary-6 active:scale-95 text-primary-80 flex items-center justify-center transition-all cursor-pointer outline-none"
          :class="isSearchOpen ? 'bg-primary-6 text-primary-100 border-primary-24 shadow-2xs' : ''"
          title="جستجوی سریع"
          @click="toggleSearch"
        >
          <Icon icon="solar:magnifer-linear" class="w-4 h-4" />
        </button>

        <!-- Column Display Settings Button (Sliders) -->
        <div class="relative">
          <button
            type="button"
            class="w-9 h-9 rounded-xl border border-primary-12 bg-white-100 hover:bg-primary-6 active:scale-95 text-primary-80 flex items-center justify-center transition-all cursor-pointer outline-none"
            title="تنظیمات نمایش ستون‌ها"
            @click="isColumnMenuOpen = !isColumnMenuOpen"
          >
            <Icon icon="solar:tuning-2-bold-duotone" class="w-4 h-4" />
          </button>

          <!-- Column Toggle Dropdown Popover -->
          <div 
            v-if="isColumnMenuOpen" 
            class="absolute left-0 top-11 w-48 bg-white-100 rounded-xl border border-primary-12 shadow-lg p-2 flex flex-col gap-1.5 z-30 font-dots-1 text-xs"
            @click.stop
          >
            <span class="text-2xs font-bold text-primary-60 px-2 py-1 border-b border-primary-6">
              نمایش ستون‌های جدول
            </span>
            <label 
              v-for="col in configurableColumns" 
              :key="col.key"
              class="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-primary-6 cursor-pointer text-primary-80"
            >
              <span>{{ col.label }}</span>
              <BaseCheckbox
                :model-value="visibleColumns.includes(col.key)"
                size="12"
                @update:model-value="toggleColumn(col.key)"
              />
            </label>
          </div>
        </div>

        <!-- More Actions Dropdown Button (...) -->
        <div class="relative">
          <button
            type="button"
            class="w-9 h-9 rounded-xl border border-primary-12 bg-white-100 hover:bg-primary-6 active:scale-95 text-primary-80 flex items-center justify-center transition-all cursor-pointer outline-none"
            title="عملیات بیشتر (خروجی اکسل / چاپ)"
            @click="isMoreMenuOpen = !isMoreMenuOpen"
          >
            <Icon icon="solar:menu-dots-bold" class="w-4 h-4" />
          </button>

          <!-- More Actions Popover -->
          <div 
            v-if="isMoreMenuOpen" 
            class="absolute left-0 top-11 w-44 bg-white-100 rounded-xl border border-primary-12 shadow-lg p-1.5 flex flex-col gap-1 z-30 font-dots-1 text-xs"
            @click.stop
          >
            <button
              type="button"
              class="w-full h-8 px-2.5 rounded-lg hover:bg-primary-6 text-primary-80 hover:text-primary-100 flex items-center gap-2 cursor-pointer transition-colors text-right"
              @click="handleExportExcel"
            >
              <Icon icon="solar:file-spreadsheet-bold-duotone" class="w-4 h-4 text-success-100" />
              <span>خروجی اکسل (Excel)</span>
            </button>
            <button
              type="button"
              class="w-full h-8 px-2.5 rounded-lg hover:bg-primary-6 text-primary-80 hover:text-primary-100 flex items-center gap-2 cursor-pointer transition-colors text-right"
              @click="handleBatchPrint"
            >
              <Icon icon="solar:printer-bold-duotone" class="w-4 h-4 text-info-100" />
              <span>چاپ گروهی فیش‌ها</span>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- 1.1 Collapsible Search & Filter Bar -->
    <Transition name="fade">
      <div 
        v-if="isSearchOpen || isFilterOpen" 
        class="w-full bg-white-80 backdrop-blur-sm rounded-2xl border border-primary-6 p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs"
      >
        <!-- Search Input -->
        <div v-if="isSearchOpen" class="flex-1 min-w-[240px] max-w-md flex items-center gap-2">
          <div class="relative w-full">
            <BaseInput
              v-model="searchQueryInternal"
              placeholder="جستجو بر اساس شماره پیگیری، طرف‌حساب، شرح..."
              size="lg"
              :show-start-icon="true"
              start-icon="solar:magnifer-linear"
              @input="$emit('update:searchQuery', searchQueryInternal)"
            />
          </div>
        </div>

        <!-- Type Filter Pills -->
        <div v-if="isFilterOpen" class="flex items-center gap-1.5 flex-wrap">
          <span class="text-xs font-semibold text-primary-60 font-dots-1 ml-1">نوع عملیات:</span>
          <button
            v-for="f in filterTypes"
            :key="f.id"
            type="button"
            class="h-7 px-3 rounded-full text-xs font-bold font-dots-1 transition-all cursor-pointer flex items-center justify-center"
            :class="[
              activeFilterType === f.id
                ? 'bg-primary-100 text-white-100 shadow-2xs'
                : 'bg-primary-6 hover:bg-primary-12 text-primary-80 border border-primary-8'
            ]"
            @click="handleFilterTypeChange(f.id)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- 1.2 Bulk Selection Floating Bar -->
    <Transition name="fade">
      <div 
        v-if="selectedIds.length > 0"
        class="w-full bg-primary-100 text-white-100 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm font-dots-1"
      >
        <div class="flex items-center gap-2.5">
          <div class="w-6 h-6 rounded-md bg-white-20 flex items-center justify-center font-mono font-bold text-xs">
            {{ toPersianNumber(selectedIds.length) }}
          </div>
          <span class="text-xs font-bold">
            مورد برای عملیات گروهی انتخاب شده است
          </span>
        </div>

        <div class="flex items-center gap-2">
          <BaseButton
            type="primary"
            style-type="outline"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:printer-linear"
            class="!h-6 !text-white-100 !border-white-20 !bg-white-10 hover:!bg-white-20 text-2xs font-bold px-2 !rounded-md"
            @click="$emit('bulk-print', selectedIds)"
          >
            <span>چاپ گروهی</span>
          </BaseButton>

          <BaseButton
            type="primary"
            style-type="outline"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:file-download-linear"
            class="!h-6 !text-white-100 !border-white-20 !bg-white-10 hover:!bg-white-20 text-2xs font-bold px-2 !rounded-md"
            @click="$emit('bulk-export', selectedIds)"
          >
            <span>خروجی انتخابی</span>
          </BaseButton>

          <BaseButton
            type="error"
            style-type="fill"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:trash-bin-trash-linear"
            class="!h-6 text-2xs font-bold px-2 !rounded-md"
            @click="$emit('bulk-void', selectedIds)"
          >
            <span>ابطال گروهی</span>
          </BaseButton>

          <button
            type="button"
            class="h-6 w-6 rounded-md bg-white-10 hover:bg-white-20 text-white-80 hover:text-white-100 flex items-center justify-center cursor-pointer ml-1 text-xs"
            title="لغو انتخاب‌ها"
            @click="clearSelection"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>

    <!-- 2. Main Table Card Container (Matching DocumentsTable layout) -->
    <div class="w-full bg-white-100 rounded-2xl overflow-hidden border border-primary-6 flex flex-col relative transition-all duration-200 shadow-2xs">
      
      <!-- Top Table Header Row -->
      <div class="w-full h-12 bg-white-100 border-b border-primary-6 flex items-center shrink-0">
        
        <!-- 1. Row Selection Checkbox Header -->
        <div class="w-12 h-9 bg-primary-1 border-l border-primary-6 flex items-center justify-center shrink-0">
          <BaseCheckbox
            :model-value="isAllSelected"
            size="16"
            @update:model-value="toggleSelectAll"
          />
        </div>

        <!-- 2. ID / Tracking Number Column Header -->
        <div v-if="isColVisible('id')" class="w-[110px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            شماره پیگیری
          </span>
        </div>

        <!-- 3. Date Column Header -->
        <div v-if="isColVisible('date')" class="w-[110px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            تاریخ
          </span>
        </div>

        <!-- 4. Type & Party Column Header -->
        <div v-if="isColVisible('party')" class="flex-1 min-w-[210px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            نوع و طرف‌حساب
          </span>
        </div>

        <!-- 5. Amount Column Header -->
        <div v-if="isColVisible('amount')" class="w-[150px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            مبلغ (ریال)
          </span>
        </div>

        <!-- 6. Description Column Header -->
        <div v-if="isColVisible('description')" class="flex-1 min-w-[180px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            توضیحات
          </span>
        </div>

        <!-- 7. Created At Column Header -->
        <div v-if="isColVisible('createdAt')" class="w-[130px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            زمان ایجاد
          </span>
        </div>

        <!-- 8. Created By Column Header -->
        <div v-if="isColVisible('createdBy')" class="w-[110px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            ایجاد شده توسط
          </span>
        </div>

        <!-- 9. Actions Column Header (Fixed Left) -->
        <div class="w-[130px] pl-3 pr-2 flex items-center justify-start text-right">
          <span class="text-xs font-semibold text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            عملیات
          </span>
        </div>

      </div>

      <!-- Table Body Rows Container -->
      <div class="w-full flex flex-col divide-y divide-primary-6 overflow-x-auto min-h-[160px]">
        
        <!-- Empty State View -->
        <div 
          v-if="!loading && (!transactions || transactions.length === 0)"
          class="w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60"
        >
          <div class="w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80">
            <Icon icon="solar:folder-with-files-bold-duotone" class="w-6 h-6" />
          </div>
          <span class="text-xs font-bold font-dots-1">هیچ تراکنش خزانه‌داری یافت نشد</span>
          <p class="text-2xs text-primary-40 font-dots-1">
            با دکمه «ثبت عملیات جدید»، اولین رویداد دریافت، پرداخت یا هزینه را ثبت نمایید.
          </p>
        </div>

        <!-- Data Rows -->
        <template v-else>
          <div 
            v-for="(item, index) in transactions" 
            :key="item.id"
            class="w-full h-14 flex items-center transition-colors duration-150 group"
            :class="[
              item.status === 'voided' ? 'bg-primary-1/40 opacity-75' : 'hover:bg-primary-1/60',
              selectedIds.includes(item.id) ? 'bg-primary-6' : ''
            ]"
          >
            <!-- 1. Row Checkbox Cell -->
            <div class="w-12 h-[52px] bg-primary-1 border-l border-primary-6 flex items-center justify-center shrink-0">
              <BaseCheckbox
                :model-value="selectedIds.includes(item.id)"
                size="16"
                @update:model-value="toggleRowSelect(item.id)"
              />
            </div>

            <!-- 2. ID / Tracking Number -->
            <div v-if="isColVisible('id')" class="w-[110px] pr-3 flex items-center justify-start overflow-hidden">
              <button
                type="button"
                class="text-xs font-mono font-bold text-info-100 hover:underline cursor-pointer outline-none truncate"
                :title="`مشاهده جزئیات ${item.trackingNumber}`"
                @click="$emit('view', item)"
              >
                {{ toPersianNumber(item.trackingNumber || item.id) }}
              </button>
            </div>

            <!-- 3. Date -->
            <div v-if="isColVisible('date')" class="w-[110px] pr-3 flex items-center justify-start font-dots-1 text-xs font-medium text-primary-80">
              <span>{{ toPersianNumber(item.date) }}</span>
            </div>

            <!-- 4. Type & Counterparty -->
            <div v-if="isColVisible('party')" class="flex-1 min-w-[210px] pr-3 flex items-center gap-2 overflow-hidden font-dots-1">
              <!-- Type Badge -->
              <span 
                class="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border"
                :class="getTypeBadgeClass(item)"
              >
                {{ getTypeLabel(item) }}
              </span>

              <!-- Counterparty / Title Text -->
              <span class="text-xs font-semibold text-primary-100 truncate" :title="item.partyName || item.title">
                {{ item.partyName || item.title }}
              </span>
            </div>

            <!-- 5. Amount (Rial) -->
            <div v-if="isColVisible('amount')" class="w-[150px] pr-3 flex items-center justify-start font-dots-1">
              <span 
                class="text-xs font-bold leading-4"
                :class="[
                  item.status === 'voided' ? 'line-through text-primary-40' : getAmountColorClass(item)
                ]"
              >
                {{ getAmountPrefix(item) }} {{ formatCurrency(item.amount) }} ریال
              </span>
            </div>

            <!-- 6. Description -->
            <div v-if="isColVisible('description')" class="flex-1 min-w-[180px] pr-3 flex items-center justify-start overflow-hidden">
              <span class="text-xs font-medium text-primary-60 font-dots-1 truncate" :title="item.description">
                {{ item.description || '—' }}
              </span>
            </div>

            <!-- 7. Created At -->
            <div v-if="isColVisible('createdAt')" class="w-[130px] pr-3 flex items-center justify-start font-dots-1 text-xs font-medium text-primary-60">
              <span>{{ toPersianNumber(item.createdAt) }}</span>
            </div>

            <!-- 8. Created By -->
            <div v-if="isColVisible('createdBy')" class="w-[110px] pr-3 flex items-center justify-start font-dots-1 text-xs font-medium text-primary-80 truncate">
              <span :title="item.createdBy">{{ item.createdBy || 'سیستم' }}</span>
            </div>

            <!-- 9. Actions Column (Fixed Left: 4 Icons) -->
            <div class="w-[130px] pl-3 pr-2 flex items-center justify-start gap-1">
              
              <!-- 1. View Details (Eye) -->
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-info-8 hover:text-info-100 active:scale-90 text-primary-80 flex items-center justify-center transition-all cursor-pointer outline-none"
                title="مشاهده فیش / رسید"
                @click="$emit('view', item)"
              >
                <Icon icon="solar:eye-bold" class="w-3 h-3" />
              </button>

              <!-- 2. Edit (Pen) -->
              <button
                type="button"
                :disabled="item.status === 'voided'"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-primary-12 active:scale-90 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none disabled:opacity-30 disabled:pointer-events-none"
                title="ویرایش اطلاعات تراکنش"
                @click="$emit('edit', item)"
              >
                <Icon icon="solar:pen-bold-duotone" class="w-3 h-3" />
              </button>

              <!-- 3. Void (Trash / Cancel) -->
              <button
                type="button"
                :disabled="item.status === 'voided'"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-error-8 hover:text-error-100 active:scale-90 text-primary-80 flex items-center justify-center transition-all cursor-pointer outline-none disabled:opacity-30 disabled:pointer-events-none"
                :title="item.status === 'voided' ? 'تراکنش باطل شده است' : 'ابطال تراکنش'"
                @click="$emit('void', item)"
              >
                <Icon icon="solar:trash-bin-trash-bold-duotone" class="w-3 h-3" />
              </button>

              <!-- 4. History / Reversal Document (Rotate Left) -->
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-primary-12 active:scale-90 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                title="تاریخچه تغییرات / سند حسابداری برگشت"
                @click="$emit('history', item)"
              >
                <Icon icon="solar:restart-bold" class="w-3 h-3" />
              </button>

            </div>

          </div>
        </template>

      </div>
    </div>

    <!-- 3. Grid Pagination Footer (Matching DocumentsTable layout) -->
    <div class="w-full bg-white-100 border border-primary-6 rounded-xl overflow-hidden flex flex-col select-none transition-all duration-200 shadow-2xs">
      <div class="w-full h-14 flex items-center justify-between px-4 overflow-x-auto">
        
        <!-- Right Side (RTL): Page Size Dropdown & Range Counter -->
        <div class="flex items-center gap-4 sm:gap-6 shrink-0">
          <!-- Page Size Selector -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-primary-60 font-dots-1 whitespace-nowrap">
              تعداد در صفحه:
            </span>
            <select
              :value="pageSize"
              class="h-8 px-2 rounded-lg bg-primary-6 border border-primary-12 text-xs font-bold text-primary-100 font-dots-1 outline-none cursor-pointer"
              @change="(e) => $emit('update:pageSize', Number((e.target as HTMLSelectElement).value))"
            >
              <option :value="10">۱۰ ردیف</option>
              <option :value="25">۲۵ ردیف</option>
              <option :value="50">۵۰ ردیف</option>
            </select>
          </div>

          <!-- Range Text -->
          <span class="text-xs font-semibold text-primary-80 font-dots-1 whitespace-nowrap">
            نمایش {{ toPersianNumber(rangeStart) }} تا {{ toPersianNumber(rangeEnd) }} از کل {{ toPersianNumber(totalCount) }} مورد
          </span>
        </div>

        <!-- Left Side (RTL): Pagination Buttons Bar -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="h-9 bg-white-80 border border-primary-6 rounded-lg p-1 flex items-center gap-1 font-dots-1">
            <!-- Next Button (Right Arrow in RTL) -->
            <button
              type="button"
              :disabled="currentPage >= totalPages"
              class="w-7 h-7 rounded-md border border-primary-6 flex items-center justify-center transition-all cursor-pointer outline-none hover:bg-primary-6 disabled:opacity-30 disabled:cursor-not-allowed text-primary-80"
              title="صفحه بعدی"
              @click="$emit('update:currentPage', currentPage + 1)"
            >
              <Icon icon="solar:alt-arrow-right-linear" class="w-3.5 h-3.5" />
            </button>

            <!-- Page Number Indicator -->
            <span class="px-2.5 text-xs font-bold text-primary-100 font-dots-1">
              صفحه {{ toPersianNumber(currentPage) }} از {{ toPersianNumber(totalPages || 1) }}
            </span>

            <!-- Previous Button (Left Arrow in RTL) -->
            <button
              type="button"
              :disabled="currentPage <= 1"
              class="w-7 h-7 rounded-md border border-primary-6 flex items-center justify-center transition-all cursor-pointer outline-none hover:bg-primary-6 disabled:opacity-30 disabled:cursor-not-allowed text-primary-80"
              title="صفحه قبلی"
              @click="$emit('update:currentPage', currentPage - 1)"
            >
              <Icon icon="solar:alt-arrow-left-linear" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { toPersianNumber, formatCurrency } from '@/utils/formatters'

export type TreasuryTransactionType = 'receive' | 'payment' | 'expense'
export type TreasuryTransactionStatus = 'confirmed' | 'draft' | 'voided'

export interface TreasuryTransactionItem {
  id: string | number
  trackingNumber: string
  date: string
  type: TreasuryTransactionType
  partyName: string
  title?: string
  amount: number
  description: string
  createdAt: string
  createdBy: string
  status: TreasuryTransactionStatus
  paymentMethod?: 'cash' | 'pos_bank'
  accountTitle?: string
}

export interface TreasuryTableProps {
  transactions: TreasuryTransactionItem[]
  loading?: boolean
  currentPage?: number
  pageSize?: number
  totalCount?: number
  searchQuery?: string
}

const props = withDefaults(defineProps<TreasuryTableProps>(), {
  transactions: () => [],
  loading: false,
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  searchQuery: ''
})

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'view', item: TreasuryTransactionItem): void
  (e: 'edit', item: TreasuryTransactionItem): void
  (e: 'void', item: TreasuryTransactionItem): void
  (e: 'history', item: TreasuryTransactionItem): void
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
  (e: 'update:searchQuery', query: string): void
  (e: 'filter-type', type: string): void
  (e: 'export-excel'): void
  (e: 'batch-print'): void
  (e: 'bulk-print', ids: (string | number)[]): void
  (e: 'bulk-export', ids: (string | number)[]): void
  (e: 'bulk-void', ids: (string | number)[]): void
}>()

// Search & Filter UI States
const isSearchOpen = ref(false)
const isFilterOpen = ref(false)
const isColumnMenuOpen = ref(false)
const isMoreMenuOpen = ref(false)
const searchQueryInternal = ref(props.searchQuery)
const activeFilterType = ref('all')

const filterTypes = [
  { id: 'all', label: 'همه' },
  { id: 'receive', label: 'دریافت' },
  { id: 'payment', label: 'پرداخت' },
  { id: 'expense', label: 'هزینه' },
  { id: 'voided', label: 'باطل‌شده' }
]

const configurableColumns = [
  { key: 'id', label: 'شماره پیگیری' },
  { key: 'date', label: 'تاریخ' },
  { key: 'party', label: 'نوع و طرف‌حساب' },
  { key: 'amount', label: 'مبلغ' },
  { key: 'description', label: 'توضیحات' },
  { key: 'createdAt', label: 'زمان ایجاد' },
  { key: 'createdBy', label: 'ایجاد شده توسط' }
]

const visibleColumns = ref<string[]>([
  'id', 'date', 'party', 'amount', 'description', 'createdAt', 'createdBy'
])

const isColVisible = (key: string) => visibleColumns.value.includes(key)

const toggleColumn = (key: string) => {
  if (visibleColumns.value.includes(key)) {
    visibleColumns.value = visibleColumns.value.filter(k => k !== key)
  } else {
    visibleColumns.value.push(key)
  }
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value
}

const handleFilterTypeChange = (type: string) => {
  activeFilterType.value = type
  emit('filter-type', type)
}

// Row Selection States
const selectedIds = ref<(string | number)[]>([])

const isAllSelected = computed(() => {
  if (props.transactions.length === 0) return false
  return props.transactions.every(t => selectedIds.value.includes(t.id))
})

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedIds.value = props.transactions.map(t => t.id)
  } else {
    selectedIds.value = []
  }
}

const toggleRowSelect = (id: string | number) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter(item => item !== id)
  } else {
    selectedIds.value.push(id)
  }
}

const clearSelection = () => {
  selectedIds.value = []
}

// Type Badges & Colors
const getTypeBadgeClass = (item: TreasuryTransactionItem) => {
  if (item.status === 'voided') {
    return 'bg-error-8 text-error-100 border-error-12'
  }
  if (item.type === 'receive') {
    return 'bg-info-8 text-info-100 border-info-24'
  }
  if (item.type === 'payment') {
    return 'bg-secondary-8 text-secondary-100 border-secondary-24'
  }
  return 'bg-warning-8 text-warning-100 border-warning-24'
}

const getTypeLabel = (item: TreasuryTransactionItem) => {
  if (item.status === 'voided') return 'باطل‌شده'
  if (item.type === 'receive') return 'دریافت'
  if (item.type === 'payment') return 'پرداخت'
  return 'هزینه'
}

const getAmountColorClass = (item: TreasuryTransactionItem) => {
  if (item.type === 'receive') return 'text-success-100'
  if (item.type === 'payment') return 'text-secondary-100'
  return 'text-warning-100'
}

const getAmountPrefix = (item: TreasuryTransactionItem) => {
  if (item.type === 'receive') return '+'
  if (item.type === 'payment') return '-'
  return ''
}

// Pagination computations
const totalPages = computed(() => Math.ceil((props.totalCount || props.transactions.length) / props.pageSize) || 1)
const rangeStart = computed(() => ((props.currentPage - 1) * props.pageSize) + 1)
const rangeEnd = computed(() => Math.min(props.currentPage * props.pageSize, props.totalCount || props.transactions.length))

const handleExportExcel = () => {
  isMoreMenuOpen.value = false
  emit('export-excel')
}

const handleBatchPrint = () => {
  isMoreMenuOpen.value = false
  emit('batch-print')
}
</script>
