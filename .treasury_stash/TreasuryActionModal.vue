<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/40 backdrop-blur-sm overflow-y-auto"
        dir="rtl"
        @click.self="handleClose"
      >
        <div class="w-full max-w-[478px] my-auto">
          <TransactionFormModal
            :initial-mode="initialMode"
            :title="title"
            :subtitle="subtitle"
            :doc-number="docNumber"
            :header-icon="headerIcon"
            :counterparties="counterparties"
            :bank-accounts="bankAccounts"
            :cash-boxes="cashBoxes"
            :expense-categories="expenseCategories"
            :default-party-id="defaultPartyId"
            :default-bank-id="defaultBankId"
            :default-cash-box-id="defaultCashBoxId"
            :default-amount="defaultAmount"
            :default-date="defaultDate"
            :default-tracking-number="defaultTrackingNumber"
            :default-description="defaultDescription"
            :default-payment-method="defaultPaymentMethod"
            :loading="loading"
            :is-submitting="isSubmitting"
            @close="handleClose"
            @add-counterparty="$emit('add-counterparty')"
            @mode-change="(m) => $emit('mode-change', m)"
            @submit="(payload) => $emit('submit', payload)"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import TransactionFormModal, {
  type TransactionMode,
  type PaymentMethodType,
  type CounterpartyOption,
  type BankAccountOption,
  type CashBoxOption,
  type ExpenseCategoryOption
} from '@/components/transaction/TransactionFormModal.vue'

export interface TreasuryActionModalProps {
  isOpen: boolean
  initialMode?: TransactionMode
  title?: string
  subtitle?: string
  docNumber?: string | number
  headerIcon?: string
  counterparties?: CounterpartyOption[]
  bankAccounts?: BankAccountOption[]
  cashBoxes?: CashBoxOption[]
  expenseCategories?: ExpenseCategoryOption[]
  defaultPartyId?: string | number
  defaultBankId?: string | number
  defaultCashBoxId?: string | number
  defaultAmount?: number | string
  defaultDate?: string
  defaultTrackingNumber?: string
  defaultDescription?: string
  defaultPaymentMethod?: PaymentMethodType
  loading?: boolean
  isSubmitting?: boolean
}

import type { TransactionSubmitPayload } from '@/components/transaction/TransactionFormModal.vue'

defineProps<TreasuryActionModalProps>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  close: []
  'add-counterparty': []
  'mode-change': [mode: TransactionMode]
  submit: [payload: TransactionSubmitPayload]
}>()

const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>
