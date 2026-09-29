<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen && transaction"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/40 backdrop-blur-sm overflow-y-auto"
        dir="rtl"
        @click.self="handleClose"
      >
        <div class="w-full max-w-[500px] bg-white-100 border border-primary-8 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 text-right select-none font-sans relative shadow-2xl overflow-hidden my-auto">
          
          <!-- Thematic Top-Left Corner Gradient Effect -->
          <div 
            class="absolute top-0 left-0 w-44 h-32 pointer-events-none transition-all duration-300 z-0"
            :class="[
              transaction.type === 'receive' ? 'bg-gradient-to-br from-info-24 via-info-6 to-transparent' :
              transaction.type === 'payment' ? 'bg-gradient-to-br from-secondary-24 via-secondary-6 to-transparent' :
              'bg-gradient-to-br from-warning-24 via-warning-6 to-transparent'
            ]"
          />

          <!-- Header -->
          <div class="flex items-center justify-between w-full h-10 shrink-0 gap-3 pt-1 relative z-10">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                :class="[
                  transaction.type === 'receive' ? 'bg-info-8 text-info-100 border-info-24' :
                  transaction.type === 'payment' ? 'bg-secondary-8 text-secondary-100 border-secondary-24' :
                  'bg-warning-8 text-warning-100 border-warning-24'
                ]"
              >
                <Icon :icon="voucherIcon" class="w-5 h-5" />
              </div>
              <div class="flex flex-col text-right truncate">
                <h3 class="text-sm font-extrabold text-primary-100 font-dots-1 truncate">
                  {{ voucherTitle }}
                </h3>
                <span class="text-xs font-mono font-medium text-primary-60 font-dots-1">
                  پیگیری: {{ toPersianNumber(transaction.trackingNumber || transaction.id) }}
                </span>
              </div>
            </div>

            <!-- Status Badge & Close -->
            <div class="flex items-center gap-2">
              <span 
                class="text-[10px] font-bold px-2.5 py-0.5 rounded-full font-dots-1 border"
                :class="statusBadgeClass"
              >
                {{ statusLabel }}
              </span>
              <button
                type="button"
                class="w-8 h-8 rounded-lg text-primary-60 hover:text-primary-100 hover:bg-primary-6 flex items-center justify-center cursor-pointer transition-colors"
                @click="handleClose"
              >
                <Icon icon="solar:close-circle-linear" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Amount Banner -->
          <div 
            class="w-full rounded-xl p-3 flex flex-col items-center justify-center gap-1 border"
            :class="[
              transaction.type === 'receive' ? 'bg-info-8 border-info-24 text-info-100' :
              transaction.type === 'payment' ? 'bg-secondary-8 border-secondary-24 text-secondary-100' :
              'bg-warning-8 border-warning-24 text-warning-100'
            ]"
          >
            <span class="text-2xs font-bold font-dots-1 opacity-80">
              {{ transaction.type === 'receive' ? 'مبلغ واریزی دریافتی' : (transaction.type === 'payment' ? 'مبلغ پرداختی خروجی' : 'مبلغ هزینه قطعی') }}
            </span>
            <div class="flex items-baseline gap-1.5 font-dots-1">
              <span class="text-2xl font-black tracking-tight">
                {{ formatCurrency(transaction.amount) }}
              </span>
              <span class="text-xs font-bold">ریال</span>
            </div>
            <span class="text-2xs font-medium font-dots-1 opacity-90 text-center">
              {{ convertNumberToPersianWords(transaction.amount) }} ریال
            </span>
          </div>

          <!-- Key Details Grid -->
          <div class="w-full bg-primary-6/60 rounded-xl p-3 flex flex-col gap-2 text-xs font-dots-1 border border-primary-6">
            <div class="flex items-center justify-between pb-1.5 border-b border-primary-8">
              <span class="text-primary-60 font-medium">طرف‌حساب / ردیف:</span>
              <span class="text-primary-100 font-bold">{{ transaction.partyName || transaction.title }}</span>
            </div>

            <div class="flex items-center justify-between pb-1.5 border-b border-primary-8">
              <span class="text-primary-60 font-medium">روش تسویه:</span>
              <span class="text-primary-100 font-bold">
                {{ transaction.paymentMethod === 'cash' ? 'دخل نقد (صندوق)' : 'کارتخوان / بانک' }}
              </span>
            </div>

            <div v-if="transaction.accountTitle" class="flex items-center justify-between pb-1.5 border-b border-primary-8">
              <span class="text-primary-60 font-medium">حساب / صندوق مقصد:</span>
              <span class="text-primary-100 font-bold">{{ transaction.accountTitle }}</span>
            </div>

            <div class="flex items-center justify-between pb-1.5 border-b border-primary-8">
              <span class="text-primary-60 font-medium">تاریخ ثبت تراکنش:</span>
              <span class="text-primary-100 font-bold">{{ toPersianNumber(transaction.date) }}</span>
            </div>

            <div class="flex items-center justify-between pb-1.5 border-b border-primary-8">
              <span class="text-primary-60 font-medium">زمان ثبت سیستمی:</span>
              <span class="text-primary-100 font-bold">{{ toPersianNumber(transaction.createdAt) }}</span>
            </div>

            <div class="flex items-center justify-between pb-1.5 border-b border-primary-8">
              <span class="text-primary-60 font-medium">ثبت شده توسط:</span>
              <span class="text-primary-100 font-bold">{{ transaction.createdBy }}</span>
            </div>

            <div class="flex flex-col gap-1 pt-0.5">
              <span class="text-primary-60 font-medium">شرح / بابت:</span>
              <p class="text-primary-100 font-medium leading-5 bg-white-80 p-2 rounded-lg border border-primary-8">
                {{ transaction.description || 'توضیحاتی ثبت نشده است.' }}
              </p>
            </div>
          </div>

          <!-- Signatures Section -->
          <div class="grid grid-cols-2 gap-3 w-full py-1 text-2xs text-primary-60 font-dots-1">
            <div class="border border-dashed border-primary-12 rounded-xl p-2.5 text-center flex flex-col justify-between h-20 bg-white-60">
              <span>امضای تحویل‌دهنده</span>
              <div class="border-b border-primary-12 border-dashed"></div>
            </div>
            <div class="border border-dashed border-primary-12 rounded-xl p-2.5 text-center flex flex-col justify-between h-20 bg-white-60">
              <span>امضای تحویل‌گیرنده / صندوقدار</span>
              <div class="border-b border-primary-12 border-dashed"></div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-2 w-full pt-1">
            <BaseButton
              type="primary"
              style-type="outline"
              size="sm"
              class="!w-[84px] !h-6 text-xs font-semibold font-dots-1 shrink-0"
              @click="handleClose"
            >
              <span>بستن</span>
            </BaseButton>
            <BaseButton
              type="primary"
              style-type="fill"
              size="sm"
              :show-start-icon="true"
              start-icon="solar:printer-bold"
              class="!min-w-[104px] !h-6 px-3 text-xs font-semibold font-dots-1 shrink-0 shadow-xs"
              @click="$emit('print', transaction)"
            >
              <span>چاپ فیش رسمی</span>
            </BaseButton>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { TreasuryTransactionItem } from '@/components/treasury/TreasuryTable.vue'
import { toPersianNumber, formatCurrency, convertNumberToPersianWords } from '@/utils/formatters'

const props = defineProps<{
  isOpen: boolean
  transaction: TreasuryTransactionItem | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
  (e: 'print', transaction: TreasuryTransactionItem): void
}>()

const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
}

const voucherTitle = computed(() => {
  if (!props.transaction) return 'فیش خزانه‌داری'
  if (props.transaction.type === 'receive') return 'رسید دریافت وجه (خزانه‌داری)'
  if (props.transaction.type === 'payment') return 'رسید پرداخت وجه (خزانه‌داری)'
  return 'برگه سند ثبت هزینه'
})

const voucherIcon = computed(() => {
  if (!props.transaction) return 'solar:document-text-bold-duotone'
  if (props.transaction.type === 'receive') return 'solar:card-receive-bold-duotone'
  if (props.transaction.type === 'payment') return 'solar:card-send-bold-duotone'
  return 'solar:document-text-bold-duotone'
})

const statusBadgeClass = computed(() => {
  if (props.transaction?.status === 'voided') {
    return 'bg-error-8 text-error-100 border-error-12'
  }
  return 'bg-success-8 text-success-100 border-success-12'
})

const statusLabel = computed(() => {
  if (props.transaction?.status === 'voided') return 'باطل‌شده'
  return 'تایید شده'
})
</script>
