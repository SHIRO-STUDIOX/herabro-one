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
          
          <!-- Header -->
          <div class="flex items-center justify-between w-full h-10 shrink-0 gap-3">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="w-10 h-10 rounded-full bg-primary-6 text-primary-100 flex items-center justify-center shrink-0 border border-primary-8">
                <Icon icon="solar:history-bold-duotone" class="w-5 h-5" />
              </div>
              <div class="flex flex-col text-right truncate">
                <h3 class="text-sm font-extrabold text-primary-100 font-dots-1 truncate">
                  تاریخچه تغییرات و سند حسابداری
                </h3>
                <span class="text-xs font-mono font-medium text-primary-60 font-dots-1">
                  پیگیری: {{ toPersianNumber(transaction.trackingNumber || transaction.id) }}
                </span>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-lg text-primary-60 hover:text-primary-100 hover:bg-primary-6 flex items-center justify-center cursor-pointer transition-colors"
              @click="handleClose"
            >
              <Icon icon="solar:close-circle-linear" class="w-5 h-5" />
            </button>
          </div>

          <!-- Linked Accounting Document Badge -->
          <div class="w-full bg-primary-6 rounded-xl p-3 flex items-center justify-between gap-2 border border-primary-8 font-dots-1">
            <div class="flex items-center gap-2">
              <Icon icon="solar:document-text-bold-duotone" class="w-5 h-5 text-primary-80" />
              <div class="flex flex-col text-right">
                <span class="text-xs font-bold text-primary-100">سند حسابداری متصل</span>
                <span class="text-2xs text-primary-60">سند شماره {{ toPersianNumber('۲۰۴۵۱') }} — ثبت خودکار دفتر روزنامه</span>
              </div>
            </div>
            <router-link
              to="/documents"
              class="px-2.5 py-1 rounded-lg bg-white-100 border border-primary-12 text-primary-80 hover:text-primary-100 text-2xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>مشاهده سند</span>
              <Icon icon="solar:arrow-left-linear" class="w-3 h-3" />
            </router-link>
          </div>

          <!-- Audit Timeline -->
          <div class="flex flex-col gap-3 w-full font-dots-1 text-xs py-1">
            <span class="text-2xs font-bold text-primary-60">گاه‌شمار رویدادها (Audit Trail):</span>

            <div class="flex flex-col gap-3 pr-2 border-r-2 border-primary-12">
              
              <!-- Event 1: Creation -->
              <div class="flex flex-col gap-0.5 relative pr-3">
                <div class="absolute -right-[11px] top-1 w-2.5 h-2.5 rounded-full bg-success-100 ring-4 ring-white-100"></div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-primary-100">ثبت اولیه در خزانه‌داری</span>
                  <span class="text-2xs text-primary-60 font-mono">{{ toPersianNumber(transaction.createdAt) }}</span>
                </div>
                <p class="text-2xs text-primary-60">
                  توسط کاربر {{ transaction.createdBy }} به مبلغ {{ formatCurrency(transaction.amount) }} ریال ثبت گردید.
                </p>
              </div>

              <!-- Event 2: Automatic Ledger Entry -->
              <div class="flex flex-col gap-0.5 relative pr-3">
                <div class="absolute -right-[11px] top-1 w-2.5 h-2.5 rounded-full bg-info-100 ring-4 ring-white-100"></div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-primary-100">صدور سند حسابداری دوبل</span>
                  <span class="text-2xs text-primary-60 font-mono">{{ toPersianNumber(transaction.createdAt) }}</span>
                </div>
                <p class="text-2xs text-primary-60">
                  ثبت بدهکار و بستانکار متوازن در حساب کل و معین به صورت سیستمی انجام شد.
                </p>
              </div>

              <!-- Event 3: If Voided or Modified -->
              <div v-if="transaction.status === 'voided'" class="flex flex-col gap-0.5 relative pr-3">
                <div class="absolute -right-[11px] top-1 w-2.5 h-2.5 rounded-full bg-error-100 ring-4 ring-white-100"></div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-error-100">ابطال تراکنش و صدور سند برگشت</span>
                  <span class="text-2xs text-primary-60 font-mono">۱۶:۳۰ ۱۴۰۵/۰۵/۱۶</span>
                </div>
                <p class="text-2xs text-primary-60">
                  تراکنش توسط کاربر مدیر ابطال و سند حسابداری برگشت (Reversal Entry) صادر شد.
                </p>
              </div>

            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end w-full pt-2 border-t border-primary-6">
            <BaseButton
              type="primary"
              style-type="outline"
              size="sm"
              class="!w-[84px] !h-6 text-xs font-semibold font-dots-1 shrink-0"
              @click="handleClose"
            >
              <span>بستن</span>
            </BaseButton>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { TreasuryTransactionItem } from '@/components/treasury/TreasuryTable.vue'
import { toPersianNumber, formatCurrency } from '@/utils/formatters'

defineProps<{
  isOpen: boolean
  transaction: TreasuryTransactionItem | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>
