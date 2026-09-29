<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full select-none font-sans" dir="rtl">
    
    <!-- 1. Total Receipts Card -->
    <div class="bg-white-100 border border-primary-8 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-2xs relative overflow-hidden transition-all duration-200 hover:shadow-xs group">
      <div class="absolute top-0 inset-x-0 h-1 bg-info-100" />
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-info-8 text-info-100 flex items-center justify-center shrink-0 border border-info-12">
            <Icon icon="solar:card-receive-bold-duotone" class="w-5 h-5" />
          </div>
          <div class="flex flex-col text-right">
            <span class="text-xs font-bold text-primary-80 font-dots-1">مجموع دریافتی‌ها</span>
            <span class="text-[11px] font-medium text-primary-40 font-dots-1">
              {{ toPersianNumber(receiptsCount) }} تراکنش ثبت‌شده
            </span>
          </div>
        </div>
        <span class="text-[10px] font-bold text-info-100 bg-info-8 px-2 py-0.5 rounded-md border border-info-12 font-dots-1">
          ورودی
        </span>
      </div>

      <div class="flex items-baseline justify-between w-full pt-1 border-t border-primary-6">
        <span class="text-lg sm:text-xl font-black text-info-100 font-dots-1 tracking-tight">
          {{ formatCurrency(totalReceipts) }}
        </span>
        <span class="text-xs font-semibold text-primary-60 font-dots-1">
          ریال
        </span>
      </div>
    </div>

    <!-- 2. Total Payments Card -->
    <div class="bg-white-100 border border-primary-8 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-2xs relative overflow-hidden transition-all duration-200 hover:shadow-xs group">
      <div class="absolute top-0 inset-x-0 h-1 bg-secondary-100" />
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-secondary-8 text-secondary-100 flex items-center justify-center shrink-0 border border-secondary-12">
            <Icon icon="solar:card-send-bold-duotone" class="w-5 h-5" />
          </div>
          <div class="flex flex-col text-right">
            <span class="text-xs font-bold text-primary-80 font-dots-1">مجموع پرداختی‌ها</span>
            <span class="text-[11px] font-medium text-primary-40 font-dots-1">
              {{ toPersianNumber(paymentsCount) }} تراکنش ثبت‌شده
            </span>
          </div>
        </div>
        <span class="text-[10px] font-bold text-secondary-100 bg-secondary-8 px-2 py-0.5 rounded-md border border-secondary-12 font-dots-1">
          خروجی
        </span>
      </div>

      <div class="flex items-baseline justify-between w-full pt-1 border-t border-primary-6">
        <span class="text-lg sm:text-xl font-black text-secondary-100 font-dots-1 tracking-tight">
          {{ formatCurrency(totalPayments) }}
        </span>
        <span class="text-xs font-semibold text-primary-60 font-dots-1">
          ریال
        </span>
      </div>
    </div>

    <!-- 3. Total Expenses Card -->
    <div class="bg-white-100 border border-primary-8 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-2xs relative overflow-hidden transition-all duration-200 hover:shadow-xs group">
      <div class="absolute top-0 inset-x-0 h-1 bg-warning-100" />
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-warning-8 text-warning-100 flex items-center justify-center shrink-0 border border-warning-12">
            <Icon icon="solar:document-text-bold-duotone" class="w-5 h-5" />
          </div>
          <div class="flex flex-col text-right">
            <span class="text-xs font-bold text-primary-80 font-dots-1">مجموع هزینه‌ها</span>
            <span class="text-[11px] font-medium text-primary-40 font-dots-1">
              {{ toPersianNumber(expensesCount) }} ردیف هزینه
            </span>
          </div>
        </div>
        <span class="text-[10px] font-bold text-warning-100 bg-warning-8 px-2 py-0.5 rounded-md border border-warning-12 font-dots-1">
          مصرفی
        </span>
      </div>

      <div class="flex items-baseline justify-between w-full pt-1 border-t border-primary-6">
        <span class="text-lg sm:text-xl font-black text-warning-100 font-dots-1 tracking-tight">
          {{ formatCurrency(totalExpenses) }}
        </span>
        <span class="text-xs font-semibold text-primary-60 font-dots-1">
          ریال
        </span>
      </div>
    </div>

    <!-- 4. Net Cashflow / Treasury Balance Card -->
    <div class="bg-white-100 border border-primary-8 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-2xs relative overflow-hidden transition-all duration-200 hover:shadow-xs group">
      <div 
        class="absolute top-0 inset-x-0 h-1"
        :class="netCashflow >= 0 ? 'bg-success-100' : 'bg-error-100'"
      />
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2.5">
          <div 
            class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border"
            :class="netCashflow >= 0 ? 'bg-success-8 text-success-100 border-success-12' : 'bg-error-8 text-error-100 border-error-12'"
          >
            <Icon icon="solar:wallet-money-bold-duotone" class="w-5 h-5" />
          </div>
          <div class="flex flex-col text-right">
            <span class="text-xs font-bold text-primary-80 font-dots-1">تراز نقدینگی</span>
            <span class="text-[11px] font-medium text-primary-40 font-dots-1">
              دریافت - (پرداخت + هزینه)
            </span>
          </div>
        </div>
        <span 
          class="text-[10px] font-bold px-2 py-0.5 rounded-md border font-dots-1"
          :class="netCashflow >= 0 ? 'text-success-100 bg-success-8 border-success-12' : 'text-error-100 bg-error-8 border-error-12'"
        >
          {{ netCashflow >= 0 ? 'تراز مثبت' : 'کسری' }}
        </span>
      </div>

      <div class="flex items-baseline justify-between w-full pt-1 border-t border-primary-6">
        <span 
          class="text-lg sm:text-xl font-black font-dots-1 tracking-tight"
          :class="netCashflow >= 0 ? 'text-success-100' : 'text-error-100'"
        >
          {{ formatCurrency(netCashflow) }}
        </span>
        <span class="text-xs font-semibold text-primary-60 font-dots-1">
          ریال
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { toPersianNumber, formatCurrency } from '@/utils/formatters'

export interface TreasurySummaryProps {
  totalReceipts?: number
  totalPayments?: number
  totalExpenses?: number
  receiptsCount?: number
  paymentsCount?: number
  expensesCount?: number
}

const props = withDefaults(defineProps<TreasurySummaryProps>(), {
  totalReceipts: 0,
  totalPayments: 0,
  totalExpenses: 0,
  receiptsCount: 0,
  paymentsCount: 0,
  expensesCount: 0
})

const netCashflow = computed(() => {
  return props.totalReceipts - (props.totalPayments + props.totalExpenses)
})
</script>
