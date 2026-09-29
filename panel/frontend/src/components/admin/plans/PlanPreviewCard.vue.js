import { ref, computed } from 'vue';
import BillingCycleSwitcher from '@/components/subscription/BillingCycleSwitcher.vue';
import PlanTierCard from '@/components/subscription/PlanTierCard.vue';
const props = defineProps();
const selectedCycle = ref('MONTHLY');
// Map AdminPlanItem from Admin Backoffice to canonical PlanDefinition for PlanTierCard
const adaptedPlan = computed(() => {
    const p = props.plan;
    // Determine Monthly & Annual prices
    const monthlyCycle = p.billing_cycles?.find((c) => c.months_count === 1);
    const annualCycle = p.billing_cycles?.find((c) => c.months_count === 12);
    const monthlyPrice = monthlyCycle ? Number(monthlyCycle.final_price_rial) : 990000;
    const annualPrice = annualCycle ? Number(annualCycle.final_price_rial) : monthlyPrice * 10;
    const annualDiscount = monthlyPrice > 0 ? Math.round((1 - annualPrice / (monthlyPrice * 12)) * 100) : 0;
    // Derive PlanTierKey
    let tierKey = 'SHOP';
    const slugUpper = (p.slug || '').toUpperCase();
    if (slugUpper.includes('FREE'))
        tierKey = 'FREE';
    else if (slugUpper.includes('PERSONAL'))
        tierKey = 'PERSONAL';
    else if (slugUpper.includes('BUSINESS'))
        tierKey = 'BUSINESS';
    else if (slugUpper.includes('SHOP'))
        tierKey = 'SHOP';
    return {
        id: tierKey,
        title: p.title || 'پلن جدید',
        targetAudience: p.description || 'مناسب کسب‌وکارها و اصناف',
        monthlyPrice,
        annualPrice,
        annualDiscountPercent: annualDiscount > 0 ? annualDiscount : 17,
        isPopular: Boolean(p.is_featured),
        features: {
            maxInvoicesMonthly: p.max_invoices_monthly ?? 'UNLIMITED',
            maxWarehouses: p.max_warehouses ?? 0,
            maxActiveCheques: p.max_cheques ?? 'UNLIMITED',
            maxUsers: p.max_users ?? 1,
            hasLineTreasury: p.active_features_json?.includes('line_treasury') || true,
            hasMultiWarehouseTransfer: p.active_features_json?.includes('multi_warehouse_transfer') || false,
            hasAdvancedChequeWorkflow: p.active_features_json?.includes('advanced_cheque_workflow') || false,
        },
    };
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex flex-col items-center gap-4 text-right select-none font-sans" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
const __VLS_0 = BillingCycleSwitcher;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.selectedCycle),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.selectedCycle),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full max-w-sm" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
const __VLS_5 = PlanTierCard;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    plan: (__VLS_ctx.adaptedPlan),
    cycle: (__VLS_ctx.selectedCycle),
    isCurrent: (false),
    disabled: (false),
}));
const __VLS_7 = __VLS_6({
    plan: (__VLS_ctx.adaptedPlan),
    cycle: (__VLS_ctx.selectedCycle),
    isCurrent: (false),
    disabled: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full max-w-sm p-3 rounded-2xl bg-primary-6/60 border border-primary-12 text-2xs text-primary-80 flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-medium font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-mono font-bold text-primary-100" },
});
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
// @ts-ignore
[selectedCycle, selectedCycle, adaptedPlan,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
