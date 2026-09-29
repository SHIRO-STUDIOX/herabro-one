import { computed, useAttrs } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const props = withDefaults(defineProps(), {
    size: 'md',
    variant: 'fill',
    type: 'primary',
    pill: true,
    state: '',
    label: 'برچسب',
    startIcon: '',
    endIcon: '',
    showStartIcon: false,
    showEndIcon: false,
    removable: false,
    disabled: false,
    selected: false,
    tooltip: '',
    tooltipPlacement: 'top',
});
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
// Tooltip: explicit prop wins, otherwise upgrade native `title` fallthrough attr
const resolvedTooltip = computed(() => props.tooltip || attrs.title || '');
const chipAttrs = computed(() => {
    const { title: _title, ...rest } = attrs;
    return rest;
});
const emit = defineEmits();
// Computed disabled check
const computedDisabled = computed(() => {
    if (props.state === 'disabled')
        return true;
    if (props.state === 'enabled' || props.state === 'selected' || props.state === 'hovered')
        return false;
    return props.disabled;
});
// Effective state
const effectiveState = computed(() => {
    if (props.state)
        return props.state;
    if (computedDisabled.value)
        return 'disabled';
    if (props.selected)
        return 'selected';
    return 'enabled';
});
// Size container classes (sm: 24px / h-6, md: 32px / h-8 matching Figma Node 4:29175)
const sizeClasses = computed(() => {
    if (props.size === 'sm') {
        return 'h-6 h-[24px] min-h-[24px] max-h-[24px] px-2.5 gap-1 text-xs';
    }
    // md size (32px height)
    return 'h-8 h-[32px] min-h-[32px] max-h-[32px] px-3.5 gap-1.5 text-xs sm:text-sm';
});
// Icon sizing
const iconSizeClasses = computed(() => {
    return props.size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
});
const removeIconSizeClasses = computed(() => {
    return props.size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';
});
// Font sizing and weight
const labelFontClasses = computed(() => {
    const isBold = effectiveState.value === 'selected' || effectiveState.value === 'hovered';
    const weightClass = isBold ? 'font-bold' : 'font-medium';
    return props.size === 'sm'
        ? `text-xs leading-4 ${weightClass}`
        : `text-xs sm:text-sm leading-4.5 ${weightClass}`;
});
// Shape classes (Pill vs Low Radius)
const shapeClasses = computed(() => {
    return props.pill ? 'rounded-full' : 'rounded-lg';
});
// Theme, Variant, and State Classes matching Figma Node 4:29175 Token Definitions
const themeStateClasses = computed(() => {
    const st = effectiveState.value;
    const tp = props.type;
    const vr = props.variant;
    if (st === 'disabled') {
        return 'opacity-32 text-black-32 bg-transparent border border-black-8 cursor-not-allowed';
    }
    // Define Theme Token Map for 7 Colors
    const tokens = {
        primary: {
            fillBg: 'bg-primary-8',
            fillHoverBg: 'bg-primary-12',
            fillSelectBg: 'bg-primary-12',
            fillBorder: 'border border-primary-24',
            text: 'text-primary-100',
            outlineBorder: 'border border-primary-24',
            outlineHoverBg: 'bg-primary-6',
            outlineSelectBg: 'bg-primary-12',
        },
        secondary: {
            fillBg: 'bg-secondary-8',
            fillHoverBg: 'bg-secondary-12',
            fillSelectBg: 'bg-secondary-12',
            fillBorder: 'border border-secondary-24',
            text: 'text-secondary-100',
            outlineBorder: 'border border-secondary-24',
            outlineHoverBg: 'bg-secondary-6',
            outlineSelectBg: 'bg-secondary-12',
        },
        accent: {
            fillBg: 'bg-[#0e7490]/10',
            fillHoverBg: 'bg-[#0e7490]/15',
            fillSelectBg: 'bg-[#0e7490]/20',
            fillBorder: 'border border-[#0e7490]/30',
            text: 'text-[#0e7490]',
            outlineBorder: 'border border-[#0e7490]/30',
            outlineHoverBg: 'bg-[#0e7490]/8',
            outlineSelectBg: 'bg-[#0e7490]/15',
        },
        info: {
            fillBg: 'bg-[#2590b8]/10',
            fillHoverBg: 'bg-[#2590b8]/15',
            fillSelectBg: 'bg-[#2590b8]/20',
            fillBorder: 'border border-[#2590b8]/30',
            text: 'text-[#2590b8]',
            outlineBorder: 'border border-[#2590b8]/30',
            outlineHoverBg: 'bg-[#2590b8]/8',
            outlineSelectBg: 'bg-[#2590b8]/15',
        },
        success: {
            fillBg: 'bg-[#16a34a]/10',
            fillHoverBg: 'bg-[#16a34a]/15',
            fillSelectBg: 'bg-[#16a34a]/20',
            fillBorder: 'border border-[#16a34a]/30',
            text: 'text-[#16a34a]',
            outlineBorder: 'border border-[#16a34a]/30',
            outlineHoverBg: 'bg-[#16a34a]/8',
            outlineSelectBg: 'bg-[#16a34a]/15',
        },
        warning: {
            fillBg: 'bg-[#d97706]/10',
            fillHoverBg: 'bg-[#d97706]/15',
            fillSelectBg: 'bg-[#d97706]/20',
            fillBorder: 'border border-[#d97706]/30',
            text: 'text-[#d97706]',
            outlineBorder: 'border border-[#d97706]/30',
            outlineHoverBg: 'bg-[#d97706]/8',
            outlineSelectBg: 'bg-[#d97706]/15',
        },
        error: {
            fillBg: 'bg-error-8',
            fillHoverBg: 'bg-error-12',
            fillSelectBg: 'bg-error-12',
            fillBorder: 'border border-error-24',
            text: 'text-error-100',
            outlineBorder: 'border border-error-24',
            outlineHoverBg: 'bg-error-6',
            outlineSelectBg: 'bg-error-12',
        },
    };
    const tk = tokens[tp] || tokens.primary;
    if (vr === 'outline') {
        if (st === 'selected') {
            return `${tk.outlineSelectBg} ${tk.text} ${tk.outlineBorder} font-bold shadow-2xs`;
        }
        if (st === 'hovered') {
            return `${tk.outlineHoverBg} ${tk.text} ${tk.outlineBorder} font-bold`;
        }
        return `bg-transparent ${tk.text} ${tk.outlineBorder} hover:${tk.outlineHoverBg}`;
    }
    // Fill Style (Default)
    if (st === 'selected') {
        return `${tk.fillSelectBg} ${tk.text} ${tk.fillBorder} font-bold shadow-2xs`;
    }
    if (st === 'hovered') {
        return `${tk.fillHoverBg} ${tk.text} font-bold`;
    }
    return `${tk.fillBg} ${tk.text} hover:${tk.fillHoverBg}`;
});
const handleClick = (e) => {
    if (computedDisabled.value)
        return;
    emit('click', e);
};
const handleRemove = (e) => {
    if (computedDisabled.value)
        return;
    emit('remove', e);
};
const __VLS_defaults = {
    size: 'md',
    variant: 'fill',
    type: 'primary',
    pill: true,
    state: '',
    label: 'برچسب',
    startIcon: '',
    endIcon: '',
    showStartIcon: false,
    showEndIcon: false,
    removable: false,
    disabled: false,
    selected: false,
    tooltip: '',
    tooltipPlacement: 'top',
};
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
const __VLS_0 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    text: (__VLS_ctx.resolvedTooltip),
    placement: (__VLS_ctx.tooltipPlacement),
    disabled: (!__VLS_ctx.resolvedTooltip),
}));
const __VLS_2 = __VLS_1({
    text: (__VLS_ctx.resolvedTooltip),
    placement: (__VLS_ctx.tooltipPlacement),
    disabled: (!__VLS_ctx.resolvedTooltip),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...(__VLS_ctx.chipAttrs),
    ...{ class: "inline-flex items-center justify-center transition-all duration-150 select-none font-sans text-right shrink-0" },
    ...{ class: ([
            __VLS_ctx.sizeClasses,
            __VLS_ctx.shapeClasses,
            __VLS_ctx.themeStateClasses,
            __VLS_ctx.computedDisabled
                ? 'cursor-not-allowed pointer-events-none opacity-32 text-black-32 bg-transparent border-black-8'
                : 'cursor-pointer active:scale-[0.97]',
        ]) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
if (__VLS_ctx.showStartIcon && (__VLS_ctx.startIcon || __VLS_ctx.$slots.startIcon)) {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        icon: (__VLS_ctx.startIcon || 'solar:tag-bold-duotone'),
        ...{ class: "shrink-0 transition-opacity" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }));
    const __VLS_9 = __VLS_8({
        icon: (__VLS_ctx.startIcon || 'solar:tag-bold-duotone'),
        ...{ class: "shrink-0 transition-opacity" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
}
var __VLS_12 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "truncate font-dots-1" },
    ...{ class: (__VLS_ctx.labelFontClasses) },
});
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
var __VLS_14 = {};
(__VLS_ctx.label);
if (__VLS_ctx.removable) {
    const __VLS_16 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        text: "حذف",
    }));
    const __VLS_18 = __VLS_17({
        text: "حذف",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    const { default: __VLS_21 } = __VLS_19.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleRemove) },
        type: "button",
        ...{ class: "shrink-0 flex items-center justify-center transition-colors rounded-full hover:opacity-100 opacity-70 p-0.5 cursor-pointer ml-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-0.5']} */ ;
    let __VLS_22;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        icon: "solar:close-circle-bold",
        ...{ class: (__VLS_ctx.removeIconSizeClasses) },
    }));
    const __VLS_24 = __VLS_23({
        icon: "solar:close-circle-bold",
        ...{ class: (__VLS_ctx.removeIconSizeClasses) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    // @ts-ignore
    [resolvedTooltip, resolvedTooltip, tooltipPlacement, handleClick, chipAttrs, sizeClasses, shapeClasses, themeStateClasses, computedDisabled, showStartIcon, startIcon, startIcon, $slots, iconSizeClasses, labelFontClasses, label, removable, handleRemove, removeIconSizeClasses,];
    var __VLS_19;
}
else if (__VLS_ctx.showEndIcon && (__VLS_ctx.endIcon || __VLS_ctx.$slots.endIcon)) {
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-left-linear'),
        ...{ class: "shrink-0 opacity-70" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }));
    const __VLS_29 = __VLS_28({
        icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-left-linear'),
        ...{ class: "shrink-0 opacity-70" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
    var __VLS_32 = {};
}
// @ts-ignore
[$slots, iconSizeClasses, showEndIcon, endIcon, endIcon,];
var __VLS_3;
// @ts-ignore
var __VLS_13 = __VLS_12, __VLS_15 = __VLS_14, __VLS_33 = __VLS_32;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
