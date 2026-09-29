import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { formatCurrency, toPersianNumber } from '@/utils/formatters';
const props = withDefaults(defineProps(), { cycle: 'MONTHLY', isCurrent: false, disabled: false });
const __VLS_emit = defineEmits();
const plan = computed(() => props.plan);
const planIcons = {
    FREE: 'solar:leaf-bold-duotone',
    PERSONAL: 'solar:user-bold-duotone',
    SHOP: 'solar:shop-bold-duotone',
    BUSINESS: 'solar:buildings-bold-duotone',
};
const planIcon = computed(() => planIcons[plan.value.id]);
const effectiveMonthly = computed(() => Math.round(plan.value.annualPrice / 12));
function quotaText(value) {
    if (value === 'UNLIMITED')
        return 'نامحدود';
    if (value === 0)
        return 'ندارد';
    return toPersianNumber(value);
}
const limitRows = computed(() => {
    const f = plan.value.features;
    return [
        { label: 'فاکتور ماهانه', value: quotaText(f.maxInvoicesMonthly), ok: f.maxInvoicesMonthly !== 0 },
        { label: 'انبار', value: quotaText(f.maxWarehouses), ok: f.maxWarehouses > 0 },
        { label: 'چک فعال', value: quotaText(f.maxActiveCheques), ok: f.maxActiveCheques !== 0 },
        { label: 'کاربر', value: quotaText(f.maxUsers), ok: true },
        { label: 'خزانه‌داری چندسطری', value: f.hasLineTreasury ? 'دارد' : 'ندارد', ok: f.hasLineTreasury },
        { label: 'حواله بین انبارها', value: f.hasMultiWarehouseTransfer ? 'دارد' : 'ندارد', ok: f.hasMultiWarehouseTransfer },
        { label: 'گردش کامل وضعیت چک', value: f.hasAdvancedChequeWorkflow ? 'دارد' : 'ندارد', ok: f.hasAdvancedChequeWorkflow },
    ];
});
const __VLS_defaults = { cycle: 'MONTHLY', isCurrent: false, disabled: false };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full bg-white-80 backdrop-blur-md border rounded-2xl p-5 flex flex-col gap-2.5 font-sans select-none relative transition-all duration-300" },
    ...{ class: (__VLS_ctx.isCurrent ? '!border-secondary-100 ring-1 ring-secondary-100/20' : '!border-transparent') },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
if (__VLS_ctx.plan.isPopular) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute -top-2.5 right-4" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['-top-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-4']} */ ;
    const __VLS_0 = BaseBadge || BaseBadge;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        type: "secondary",
        styleType: "fill",
        size: "2xs",
        showStartIcon: (true),
        startIcon: "solar:medal-ribbon-bold-duotone",
    }));
    const __VLS_2 = __VLS_1({
        type: "secondary",
        styleType: "fill",
        size: "2xs",
        showStartIcon: (true),
        startIcon: "solar:medal-ribbon-bold-duotone",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    // @ts-ignore
    [isCurrent, plan,];
    var __VLS_3;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between w-full pt-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5 min-w-0" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    icon: (__VLS_ctx.planIcon),
    ...{ class: "w-5 h-5 text-primary-100 shrink-0" },
}));
const __VLS_8 = __VLS_7({
    icon: (__VLS_ctx.planIcon),
    ...{ class: "w-5 h-5 text-primary-100 shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col min-w-0" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm font-extrabold text-primary-100 font-dots-1 leading-5 truncate" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.plan.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs text-primary-60 font-dots-1 truncate" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.plan.targetAudience);
if (__VLS_ctx.isCurrent) {
    const __VLS_11 = BaseBadge || BaseBadge;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        type: "success",
        styleType: "soft",
        size: "2xs",
        showStartIcon: (true),
        startIcon: "solar:check-circle-bold-duotone",
    }));
    const __VLS_13 = __VLS_12({
        type: "success",
        styleType: "soft",
        size: "2xs",
        showStartIcon: (true),
        startIcon: "solar:check-circle-bold-duotone",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    const { default: __VLS_16 } = __VLS_14.slots;
    // @ts-ignore
    [isCurrent, plan, plan, planIcon,];
    var __VLS_14;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col gap-0.5 w-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (__VLS_ctx.cycle === 'MONTHLY') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-baseline gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xl font-black font-mono text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.formatCurrency(__VLS_ctx.plan.monthlyPrice));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs font-bold text-primary-60 font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-baseline gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xl font-black font-mono text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.formatCurrency(__VLS_ctx.effectiveMonthly));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs font-bold text-primary-60 font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2 flex-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-mono text-primary-40 line-through" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['line-through']} */ ;
    (__VLS_ctx.formatCurrency(__VLS_ctx.plan.monthlyPrice * 12));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-mono font-bold text-secondary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
    (__VLS_ctx.formatCurrency(__VLS_ctx.plan.annualPrice));
}
const __VLS_17 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ...{ 'onClick': {} },
    type: "primary",
    styleType: "fill",
    size: "md",
    ...{ class: "w-full !rounded-full text-xs font-semibold" },
    disabled: (__VLS_ctx.isCurrent || __VLS_ctx.disabled),
    showEndIcon: (!__VLS_ctx.isCurrent),
    endIcon: "solar:arrow-up-bold",
}));
const __VLS_19 = __VLS_18({
    ...{ 'onClick': {} },
    type: "primary",
    styleType: "fill",
    size: "md",
    ...{ class: "w-full !rounded-full text-xs font-semibold" },
    disabled: (__VLS_ctx.isCurrent || __VLS_ctx.disabled),
    showEndIcon: (!__VLS_ctx.isCurrent),
    endIcon: "solar:arrow-up-bold",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
const __VLS_23 = {
    /** @type {typeof __VLS_22.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.$emit('upgrade', __VLS_ctx.plan.id));
        // @ts-ignore
        [isCurrent, isCurrent, plan, plan, plan, plan, cycle, formatCurrency, formatCurrency, formatCurrency, formatCurrency, effectiveMonthly, disabled, $emit,];
    },
};
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['!rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
const { default: __VLS_24 } = __VLS_20.slots;
(__VLS_ctx.isCurrent ? 'پلن فعال شما' : `ارتقا به ${__VLS_ctx.plan.title}`);
// @ts-ignore
[isCurrent, plan,];
var __VLS_20;
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "flex flex-col w-full pt-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
for (const [row] of __VLS_vFor((__VLS_ctx.limitRows))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (row.label),
        ...{ class: "flex items-center justify-between gap-2 py-2 text-xs font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center gap-1.5 min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        icon: (row.ok ? 'solar:check-circle-bold-duotone' : 'solar:close-circle-bold-duotone'),
        ...{ class: "w-4 h-4 shrink-0" },
        ...{ class: (row.ok ? 'text-success-100' : 'text-primary-40') },
    }));
    const __VLS_27 = __VLS_26({
        icon: (row.ok ? 'solar:check-circle-bold-duotone' : 'solar:close-circle-bold-duotone'),
        ...{ class: "w-4 h-4 shrink-0" },
        ...{ class: (row.ok ? 'text-success-100' : 'text-primary-40') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-80 font-medium truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (row.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-bold text-primary-100 whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    (row.value);
    // @ts-ignore
    [limitRows,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
