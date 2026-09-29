/**
 * Billing & Subscriptions module — canonical type definitions.
 * All monetary values are in Rial (ریال). Shamsi date strings are display-only.
 */

export type PlanTierKey = 'FREE' | 'PERSONAL' | 'SHOP' | 'BUSINESS'

export type BillingCycle = 'MONTHLY' | 'ANNUAL'

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'TRIAL'

export interface PlanFeatureLimit {
  maxInvoicesMonthly: number | 'UNLIMITED'
  maxWarehouses: number
  maxActiveCheques: number | 'UNLIMITED'
  maxUsers: number
  hasLineTreasury: boolean
  hasMultiWarehouseTransfer: boolean
  hasAdvancedChequeWorkflow: boolean
}

export interface PlanDefinition {
  id: PlanTierKey
  title: string
  targetAudience: string
  monthlyPrice: number // Rial
  annualPrice: number // Rial — Monthly × 10 (2 gifted months)
  annualDiscountPercent: number
  features: PlanFeatureLimit
  isPopular?: boolean
}

export interface QuotaUsage {
  usedInvoices: number
  maxInvoices: number | 'UNLIMITED'
  usedWarehouses: number
  maxWarehouses: number
  usedUsers: number
  maxUsers: number
}

export interface ActiveSubscription {
  id: string
  planKey: PlanTierKey
  cycle: BillingCycle
  status: SubscriptionStatus
  startDate: string // Shamsi display string
  endDate: string // Shamsi display string
  daysRemaining: number
  paidAmount: number // amount paid at cycle start, Rial
  quotas: QuotaUsage
}

export interface ProrationCalculationResult {
  currentPlanDailyRate: number
  daysRemaining: number
  remainingCredit: number // unused credit from the current plan
  targetPlanGrossPrice: number
  annualDiscountAmount: number
  finalPayableAmount: number // net invoice amount, Rial (>= 0)
  storedCredit: number // carried over when the math goes negative
}

export interface BillingHistoryItem {
  id: string
  paidAt: string // Shamsi display string
  planTitle: string
  cycle: BillingCycle
  amount: number // Rial
  status: 'PAID' | 'PENDING' | 'FAILED'
}

export interface GatewayPayload {
  subscriptionId: string
  fromPlan: PlanTierKey
  toPlan: PlanTierKey
  cycle: BillingCycle
  grossAmount: number
  discountAmount: number
  prorationCredit: number
  couponCode?: string
  couponDiscount: number
  payableAmount: number
  storedCredit: number
  currency: 'IRR'
}

export const CYCLE_DAYS: Record<BillingCycle, number> = {
  MONTHLY: 30,
  ANNUAL: 365,
}

export const CYCLE_LABELS: Record<BillingCycle, string> = {
  MONTHLY: 'ماهانه',
  ANNUAL: 'سالانه',
}

export const PLAN_LABELS: Record<PlanTierKey, string> = {
  FREE: 'رایگان',
  PERSONAL: 'شخصی',
  SHOP: 'مغازه ساده',
  BUSINESS: 'کسب‌وکار پویا',
}

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  ACTIVE: 'فعال',
  EXPIRING_SOON: 'رو به اتمام',
  EXPIRED: 'منقضی‌شده',
  TRIAL: 'آزمایشی',
}

/** Catalog of the 4 plan tiers. Annual = Monthly × 10 (2 gifted months). */
export const PLAN_DEFINITIONS: readonly PlanDefinition[] = [
  {
    id: 'FREE',
    title: 'رایگان',
    targetAudience: 'آشنایی با حسابرو',
    monthlyPrice: 0,
    annualPrice: 0,
    annualDiscountPercent: 0,
    features: {
      maxInvoicesMonthly: 20,
      maxWarehouses: 0,
      maxActiveCheques: 0,
      maxUsers: 1,
      hasLineTreasury: false,
      hasMultiWarehouseTransfer: false,
      hasAdvancedChequeWorkflow: false,
    },
  },
  {
    id: 'PERSONAL',
    title: 'شخصی',
    targetAudience: 'فریلنسرها و مشاغل فردی',
    monthlyPrice: 490000,
    annualPrice: 4900000,
    annualDiscountPercent: 17,
    features: {
      maxInvoicesMonthly: 0,
      maxWarehouses: 0,
      maxActiveCheques: 10,
      maxUsers: 1,
      hasLineTreasury: true,
      hasMultiWarehouseTransfer: false,
      hasAdvancedChequeWorkflow: false,
    },
  },
  {
    id: 'SHOP',
    title: 'مغازه ساده',
    targetAudience: 'فروشگاه‌های خرده‌فروشی',
    monthlyPrice: 990000,
    annualPrice: 9900000,
    annualDiscountPercent: 17,
    isPopular: true,
    features: {
      maxInvoicesMonthly: 200,
      maxWarehouses: 1,
      maxActiveCheques: 50,
      maxUsers: 2,
      hasLineTreasury: true,
      hasMultiWarehouseTransfer: false,
      hasAdvancedChequeWorkflow: false,
    },
  },
  {
    id: 'BUSINESS',
    title: 'کسب‌وکار پویا',
    targetAudience: 'شرکت‌ها و زنجیره‌های فروش',
    monthlyPrice: 2490000,
    annualPrice: 24900000,
    annualDiscountPercent: 17,
    features: {
      maxInvoicesMonthly: 'UNLIMITED',
      maxWarehouses: 3,
      maxActiveCheques: 'UNLIMITED',
      maxUsers: 5,
      hasLineTreasury: true,
      hasMultiWarehouseTransfer: true,
      hasAdvancedChequeWorkflow: true,
    },
  },
] as const

export function getPlanDefinition(planKey: PlanTierKey): PlanDefinition {
  const found = PLAN_DEFINITIONS.find((p) => p.id === planKey)
  if (!found) throw new Error(`Unknown plan tier: ${planKey}`)
  return found
}

/** Gross price of a plan for the given cycle (before proration credit). */
export function getPlanCyclePrice(planKey: PlanTierKey, cycle: BillingCycle): number {
  const plan = getPlanDefinition(planKey)
  return cycle === 'ANNUAL' ? plan.annualPrice : plan.monthlyPrice
}
