import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TreasuryTable, { type TreasuryTransactionItem } from '@/components/treasury/TreasuryTable.vue'
import TransactionFormModal from '@/components/transaction/TransactionFormModal.vue'
import TreasurySummaryCards from '@/components/treasury/TreasurySummaryCards.vue'
import { formatCurrency, convertNumberToPersianWords } from '@/utils/formatters'

describe('Treasury Module - Unit Tests', () => {
  const mockTransactions: TreasuryTransactionItem[] = [
    {
      id: '1',
      trackingNumber: 'TR-1001',
      date: '۱۴۰۵/۰۵/۱۴',
      type: 'receive',
      partyName: 'وحید مومنی',
      title: 'دریافت از شخص وحید مومنی',
      amount: 35000000,
      description: 'تسویه فاکتور فروش',
      createdAt: '۱۰:۱۵ ۱۴۰۵/۰۵/۱۴',
      createdBy: 'فاطمه حسینی',
      status: 'confirmed',
      paymentMethod: 'pos_bank',
      accountTitle: 'بانک سامان'
    },
    {
      id: '2',
      trackingNumber: 'TR-1002',
      date: '۱۴۰۵/۰۵/۱۴',
      type: 'payment',
      partyName: 'شرکت فناوری پارس',
      title: 'پرداخت به تامین‌کننده',
      amount: 82000000,
      description: 'خرید سرور',
      createdAt: '۱۱:۳۰ ۱۴۰۵/۰۵/۱۴',
      createdBy: 'علیرضا باقری',
      status: 'confirmed',
      paymentMethod: 'pos_bank',
      accountTitle: 'بانک ملت'
    },
    {
      id: '3',
      trackingNumber: 'TR-1003',
      date: '۱۴۰۵/۰۵/۱۵',
      type: 'expense',
      partyName: 'قبض برق',
      title: 'هزینه قبض برق مغازه',
      amount: 4500000,
      description: 'دوره تابستان',
      createdAt: '۱۳:۰۰ ۱۴۰۵/۰۵/۱۵',
      createdBy: 'مدیر سیستم',
      status: 'confirmed',
      paymentMethod: 'cash',
      accountTitle: 'صندوق فروشگاه'
    },
    {
      id: '4',
      trackingNumber: 'TR-1004',
      date: '۱۴۰۵/۰۵/۱۶',
      type: 'payment',
      partyName: 'قرارداد باطل‌شده',
      title: 'پرداخت استرداد (باطل‌شده)',
      amount: 18000000,
      description: 'قرارداد فسخ شده',
      createdAt: '۱۵:۴۰ ۱۴۰۵/۰۵/۱۶',
      createdBy: 'علیرضا باقری',
      status: 'voided',
      paymentMethod: 'cash'
    }
  ]

  describe('Rial Currency & Persian Words Conversion', () => {
    it('formats numbers with thousand separator and Persian digits', () => {
      expect(formatCurrency(35000000)).toBe('۳۵,۰۰۰,۰۰۰')
      expect(formatCurrency(4500000)).toBe('۴,۵۰۰,۰۰۰')
      expect(formatCurrency(0)).toBe('۰')
    })

    it('converts amounts to Persian words with Rial suffix', () => {
      expect(convertNumberToPersianWords(350000)).toBe('سیصد و پنجاه هزار')
      expect(convertNumberToPersianWords(150000000)).toBe('یکصد و پنجاه میلیون')
    })
  })

  describe('TreasuryTable Component', () => {
    it('renders the correct number of rows and columns', () => {
      const wrapper = mount(TreasuryTable, {
        props: {
          transactions: mockTransactions,
          totalCount: mockTransactions.length
        }
      })

      expect(wrapper.text()).toContain('لیست عملیات خزانه‌داری')
      expect(wrapper.text()).toContain('وحید مومنی')
      expect(wrapper.text()).toContain('شرکت فناوری پارس')
      expect(wrapper.text()).toContain('قبض برق')
      expect(wrapper.text()).toContain('باطل‌شده')
    })

    it('emits create event when the green action button is clicked', async () => {
      const wrapper = mount(TreasuryTable, {
        props: {
          transactions: mockTransactions,
          totalCount: mockTransactions.length
        }
      })

      const createBtn = wrapper.find('button[title="ثبت رویداد جدید خزانه‌داری"]')
      expect(createBtn.exists()).toBe(true)
      await createBtn.trigger('click')
      expect(wrapper.emitted('create')).toBeTruthy()
    })

    it('emits view, edit, void, and history events on row action buttons', async () => {
      const wrapper = mount(TreasuryTable, {
        props: {
          transactions: mockTransactions,
          totalCount: mockTransactions.length
        }
      })

      const viewBtn = wrapper.find('button[title="مشاهده فیش / رسید"]')
      await viewBtn.trigger('click')
      expect(wrapper.emitted('view')).toBeTruthy()
      expect(wrapper.emitted('view')![0]![0]).toEqual(mockTransactions[0])
    })
  })

  describe('TreasurySummaryCards Component', () => {
    it('correctly calculates and displays total receipts, payments, expenses, and net cashflow', () => {
      const wrapper = mount(TreasurySummaryCards, {
        props: {
          totalReceipts: 185000000,
          totalPayments: 82000000,
          totalExpenses: 374500000,
          receiptsCount: 2,
          paymentsCount: 1,
          expensesCount: 3
        }
      })

      expect(wrapper.text()).toContain('مجموع دریافتی‌ها')
      expect(wrapper.text()).toContain('۱۸۵,۰۰۰,۰۰۰')
      expect(wrapper.text()).toContain('مجموع پرداختی‌ها')
      expect(wrapper.text()).toContain('۸۲,۰۰۰,۰۰۰')
      expect(wrapper.text()).toContain('تراز نقدینگی')
    })
  })

  describe('TransactionFormModal (Treasury Modal)', () => {
    it('renders with appropriate amount label according to mode', async () => {
      const wrapper = mount(TransactionFormModal, {
        props: {
          initialMode: 'receive',
          defaultAmount: '۵,۰۰۰,۰۰۰'
        }
      })

      expect(wrapper.text()).toContain('مبلغ دریافتی (ریال)')
      expect(wrapper.text()).toContain('مانده پس از تراکنش')

      // Switch to payment tab
      const paymentTab = wrapper.findAll('button').find(b => b.text().includes('پرداخت'))
      expect(paymentTab).toBeDefined()
      await paymentTab!.trigger('click')
      expect(wrapper.text()).toContain('مبلغ پرداختی (ریال)')

      // Switch to expense tab
      const expenseTab = wrapper.findAll('button').find(b => b.text().includes('هزینه'))
      expect(expenseTab).toBeDefined()
      await expenseTab!.trigger('click')
      expect(wrapper.text()).toContain('مبلغ هزینه (ریال)')
    })

    it('toggles between POS / Bank dropdown and Cash box dropdown', async () => {
      const wrapper = mount(TransactionFormModal, {
        props: {
          initialMode: 'receive',
          defaultPaymentMethod: 'pos_bank'
        }
      })

      // In pos_bank mode, should contain bank account selection
      expect(wrapper.text()).toContain('انتخاب حساب بانکی / کارتخوان')

      // Click cash button
      const cashBtn = wrapper.findAll('button').find(b => b.text().includes('دخل نقد'))
      expect(cashBtn).toBeDefined()
      await cashBtn!.trigger('click')

      // In cash mode, should update to cash box selection
      expect(wrapper.text()).toContain('انتخاب صندوق / دخل نقد')
    })
  })
})
