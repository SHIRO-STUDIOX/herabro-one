import { computed } from 'vue';
import { formatCurrency } from '@/utils/formatters';
const props = withDefaults(defineProps(), {
    size: 'xs',
    showSuffix: true,
    suffix: 'ریال',
    showAbs: false,
    useParenthesis: false,
});
const numAmount = computed(() => Number(props.amount) || 0);
const colorClass = computed(() => {
    if (numAmount.value > 0)
        return 'text-success-100';
    if (numAmount.value < 0)
        return 'text-error-100';
    return 'text-primary-100';
});
const textSizeClass = computed(() => {
    switch (props.size) {
        case 'xs': return 'text-xs';
        case 'sm': return 'text-sm';
        case 'base': return 'text-base';
        case 'lg': return 'text-lg';
        default: return 'text-xs';
    }
});
const formattedAmount = computed(() => {
    if (props.useParenthesis && numAmount.value < 0) {
        return `(${formatCurrency(numAmount.value)})`;
    }
    const val = props.showAbs ? Math.abs(numAmount.value) : numAmount.value;
    return formatCurrency(val);
});
const __VLS_defaults = {
    size: 'xs',
    showSuffix: true,
    suffix: 'ریال',
    showAbs: false,
    useParenthesis: false,
};
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
    ...{ class: "flex items-baseline gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-mono font-black tabular-nums tracking-tight truncate" },
    ...{ class: ([__VLS_ctx.textSizeClass, __VLS_ctx.colorClass]) },
});
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.formattedAmount);
if (__VLS_ctx.showSuffix) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs font-bold font-dots-1 shrink-0 text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    (__VLS_ctx.suffix);
}
// @ts-ignore
[textSizeClass, colorClass, formattedAmount, showSuffix, suffix,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
