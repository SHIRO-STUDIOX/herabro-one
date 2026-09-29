import { Icon } from '@iconify/vue';
import { toPersianNumber } from '@/utils/formatters';
const __VLS_props = withDefaults(defineProps(), { plans: () => [] });
function quotaText(value) {
    if (value === 'UNLIMITED')
        return 'نامحدود';
    if (value === 0)
        return '—';
    return toPersianNumber(value);
}
const rows = [
    { label: 'سقف فاکتور ماهانه', get: (p) => quotaText(p.features.maxInvoicesMonthly) },
    { label: 'تعداد انبار', get: (p) => quotaText(p.features.maxWarehouses) },
    { label: 'چک فعال', get: (p) => quotaText(p.features.maxActiveCheques) },
    { label: 'تعداد کاربر', get: (p) => quotaText(p.features.maxUsers) },
    { label: 'خزانه‌داری چندسطری', get: (p) => p.features.hasLineTreasury },
    { label: 'حواله بین انبارها', get: (p) => p.features.hasMultiWarehouseTransfer },
    { label: 'گردش کامل وضعیت چک', get: (p) => p.features.hasAdvancedChequeWorkflow },
];
const __VLS_defaults = { plans: () => [] };
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
    ...{ class: "w-full bg-white-80 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 overflow-x-auto font-sans select-none" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-100 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
    ...{ class: "w-full min-w-[560px] text-xs font-dots-1 border-collapse" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[560px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-collapse']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
    ...{ class: "border-b border-primary-8" },
});
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
    ...{ class: "text-right py-2 pl-2 font-semibold text-primary-60 w-[220px]" },
});
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[220px]']} */ ;
for (const [plan] of __VLS_vFor((__VLS_ctx.plans))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        key: (plan.id),
        ...{ class: "text-center py-2 font-extrabold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (plan.title);
    // @ts-ignore
    [plans,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
for (const [row] of __VLS_vFor((__VLS_ctx.rows))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
        key: (row.label),
        ...{ class: "border-b border-primary-6 last:border-none" },
    });
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['last:border-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
        ...{ class: "text-right py-2 pl-2 font-medium text-primary-80" },
    });
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    (row.label);
    for (const [plan] of __VLS_vFor((__VLS_ctx.plans))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            key: (plan.id),
            ...{ class: "text-center py-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        if (typeof row.get(plan) === 'boolean') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "inline-flex justify-center" },
            });
            /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            let __VLS_0;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
                icon: (row.get(plan)
                    ? 'solar:check-circle-bold-duotone'
                    : 'solar:close-circle-bold-duotone'),
                ...{ class: "w-4.5 h-4.5" },
                ...{ class: (row.get(plan) ? 'text-success-100' : 'text-primary-40') },
            }));
            const __VLS_2 = __VLS_1({
                icon: (row.get(plan)
                    ? 'solar:check-circle-bold-duotone'
                    : 'solar:close-circle-bold-duotone'),
                ...{ class: "w-4.5 h-4.5" },
                ...{ class: (row.get(plan) ? 'text-success-100' : 'text-primary-40') },
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "font-mono font-bold text-primary-100" },
            });
            /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
            (row.get(plan));
        }
        // @ts-ignore
        [plans, rows,];
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
