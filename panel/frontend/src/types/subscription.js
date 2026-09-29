/**
 * Billing & Subscriptions module — canonical type definitions.
 * All monetary values are in Rial (ریال). Shamsi date strings are display-only.
 */
export const CYCLE_DAYS = {
    MONTHLY: 30,
    ANNUAL: 365,
};
export const CYCLE_LABELS = {
    MONTHLY: 'ماهانه',
    ANNUAL: 'سالانه',
};
export const PLAN_LABELS = {
    FREE: 'رایگان',
    PERSONAL: 'شخصی',
    SHOP: 'مغازه ساده',
    BUSINESS: 'کسب‌وکار پویا',
};
export const STATUS_LABELS = {
    ACTIVE: 'فعال',
    EXPIRING_SOON: 'رو به اتمام',
    EXPIRED: 'منقضی‌شده',
    TRIAL: 'آزمایشی',
};
/** Catalog of the 4 plan tiers. Annual = Monthly × 10 (2 gifted months). */
export const PLAN_DEFINITIONS = [
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
];
export function getPlanDefinition(planKey) {
    const found = PLAN_DEFINITIONS.find((p) => p.id === planKey);
    if (!found)
        throw new Error(`Unknown plan tier: ${planKey}`);
    return found;
}
/** Gross price of a plan for the given cycle (before proration credit). */
export function getPlanCyclePrice(planKey, cycle) {
    const plan = getPlanDefinition(planKey);
    return cycle === 'ANNUAL' ? plan.annualPrice : plan.monthlyPrice;
}
