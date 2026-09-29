import { computed, useAttrs } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const __VLS_slots = defineSlots();
const props = withDefaults(defineProps(), {
    variant: '',
    styleType: 'fill',
    size: 'md',
    type: 'primary',
    roundedFull: false,
    rounded: false,
    disabled: false,
    loading: false,
    showStartIcon: false,
    showEndIcon: false,
    startIcon: '',
    endIcon: '',
});
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
// Tooltip: explicit prop wins, otherwise upgrade native `title` fallthrough attr
// into the design-system tooltip (native title is suppressed to avoid double tooltips).
const resolvedTooltip = computed(() => props.tooltip || attrs.title || '');
const resolvedPlacement = computed(() => props.tooltipPlacement || 'top');
const tooltipPlacement = resolvedPlacement;
const buttonAttrs = computed(() => {
    const { title: _title, ...rest } = attrs;
    return rest;
});
const isRoundedFull = computed(() => Boolean(props.roundedFull || props.rounded));
// Resolve type and styleType based on backward compatibility with 'variant' prop
const resolvedType = computed(() => {
    if (props.variant === 'secondary')
        return 'secondary';
    if (props.variant === 'error')
        return 'error';
    return props.type;
});
const resolvedStyle = computed(() => {
    if (props.variant === 'outline' || props.variant === 'ghost')
        return 'outline';
    if (props.variant === 'fill')
        return 'fill';
    return props.styleType;
});
// 1. Size & Typography mapping
const sizeClasses = computed(() => {
    const roundedClass = isRoundedFull.value
        ? ''
        : (() => {
            switch (props.size) {
                case 'sm':
                    return 'rounded-md';
                case 'lg':
                    return 'rounded-[10px]';
                case 'xl':
                    return 'rounded-[10px]';
                case '3xl':
                    return 'rounded-xl';
                case 'md':
                default:
                    return 'rounded-lg';
            }
        })();
    switch (props.size) {
        case 'sm':
            // sm: h-24px, px-6px, rounded-md (6px), font-size 12px (text-xs), weight 600
            return `h-6 px-1.5 text-xs font-semibold ${roundedClass} leading-none`;
        case 'lg':
            // lg: h-40px, px-8px, rounded-2lg (10px), font-size 14px (text-sm), weight 700
            return `h-10 px-2 text-sm font-bold ${roundedClass} leading-none`;
        case 'xl':
            // xl: h-44px, px-10px, rounded-2lg (10px), font-size 16px (text-base), weight 800
            return `h-11 px-2.5 text-base font-extrabold ${roundedClass} leading-none`;
        case '3xl':
            // 3xl: h-56px, px-12px, rounded-xl (12px), font-size 18px (text-lg), weight 800
            return `h-14 px-3 text-lg font-extrabold ${roundedClass} leading-none`;
        case 'md':
        default:
            // md: h-36px, px-12px, rounded-lg (8px), font-size 14px (text-sm), weight 500 (standard default)
            return `h-9 px-3 text-sm font-medium ${roundedClass}`;
    }
});
// 2. Icon Sizes mapping
const startIconSizeStyle = computed(() => {
    let size = '20px';
    if (props.size === 'sm')
        size = '12px';
    else if (props.size === 'md')
        size = '16px';
    else if (props.size === '3xl')
        size = '24px';
    return { width: size, height: size };
});
const endIconSizeStyle = computed(() => {
    let size = '12px';
    if (props.size === 'sm')
        size = '10px';
    else if (props.size === 'md')
        size = '14px';
    else if (props.size === 'xl')
        size = '14px';
    else if (props.size === '3xl')
        size = '16px';
    return { width: size, height: size };
});
// 3. Variant & Color mapping
const variantClasses = computed(() => {
    const style = resolvedStyle.value;
    const colorType = resolvedType.value;
    // Glassy styling
    if (style === 'glassy') {
        switch (colorType) {
            case 'secondary':
                return 'backdrop-blur-md bg-secondary-6 border-secondary-32 text-secondary-100 hover:bg-secondary-12 active:bg-secondary-24';
            case 'accent':
                return 'backdrop-blur-md bg-accent-6 border-accent-32 text-accent-100 hover:bg-accent-12 active:bg-accent-24';
            case 'info':
                return 'backdrop-blur-md bg-info-6 border-info-32 text-info-100 hover:bg-info-12 active:bg-info-24';
            case 'success':
                return 'backdrop-blur-md bg-success-6 border-success-32 text-success-100 hover:bg-success-12 active:bg-success-24';
            case 'warning':
                return 'backdrop-blur-md bg-warning-6 border-warning-32 text-warning-100 hover:bg-warning-12 active:bg-warning-24';
            case 'error':
                return 'backdrop-blur-md bg-error-6 border-error-32 text-error-100 hover:bg-error-12 active:bg-error-24';
            case 'white':
                return 'backdrop-blur-md bg-white-6 border-white-40 text-primary-100 hover:bg-white-12 active:bg-white-24 disabled:bg-black-6 disabled:border-black-8 disabled:text-black-32';
            case 'primary':
            default:
                return 'backdrop-blur-md bg-primary-6 border-primary-32 text-primary-100 hover:bg-primary-12 active:bg-primary-24';
        }
    }
    // Outline styling
    if (style === 'outline') {
        switch (colorType) {
            case 'secondary':
                return 'bg-white-100 border border-secondary-12 text-secondary-100 hover:bg-secondary-6 active:bg-secondary-12';
            case 'accent':
                return 'bg-white-100 border border-accent-12 text-accent-100 hover:bg-accent-6 active:bg-accent-12';
            case 'info':
                return 'bg-white-100 border border-info-12 text-info-100 hover:bg-info-8 active:bg-info-12';
            case 'success':
                return 'bg-white-100 border border-success-12 text-success-100 hover:bg-success-8 active:bg-success-12';
            case 'warning':
                return 'bg-white-100 border border-warning-12 text-warning-100 hover:bg-warning-8 active:bg-warning-12';
            case 'error':
                return 'bg-white-100 border border-error-12 text-error-100 hover:bg-error-6 active:bg-error-12';
            case 'white':
                return 'bg-white-12 border border-white-24 text-white-100 hover:bg-white-24 active:bg-white-32';
            case 'primary':
            default:
                return 'bg-white-100 border border-primary-12 text-primary-100 hover:bg-primary-6 active:bg-primary-12';
        }
    }
    // Fill styling (Default)
    switch (colorType) {
        case 'secondary':
            return 'bg-secondary-100 border-secondary-100 text-white-100 hover:bg-secondary-80 active:bg-secondary-100';
        case 'accent':
            return 'bg-accent-100 border-accent-100 text-white-100 hover:bg-accent-80 active:bg-accent-100';
        case 'info':
            return 'bg-info-100 border-info-100 text-white-100 hover:bg-info-80 active:bg-info-100';
        case 'success':
            return 'bg-success-100 border-success-100 text-white-100 hover:bg-success-80 active:bg-success-100';
        case 'warning':
            return 'bg-warning-100 border-warning-100 text-white-100 hover:bg-warning-80 active:bg-warning-100';
        case 'error':
            return 'bg-error-100 border-error-100 text-white-100 hover:bg-error-80 active:bg-error-100';
        case 'white':
            return 'bg-white-100 border-black-12 text-black-100 hover:bg-surface-100 active:bg-white-100';
        case 'primary':
        default:
            return 'bg-primary-100 border-primary-100 text-white-100 hover:bg-primary-80 active:bg-primary-100';
    }
});
// Custom inline styles (like glassy radial background highlight)
const customStyles = computed(() => {
    if (resolvedStyle.value === 'glassy' && resolvedType.value === 'white' && !props.disabled) {
        return {
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 100%)',
        };
    }
    return {};
});
const __VLS_defaults = {
    variant: '',
    styleType: 'fill',
    size: 'md',
    type: 'primary',
    roundedFull: false,
    rounded: false,
    disabled: false,
    loading: false,
    showStartIcon: false,
    showEndIcon: false,
    startIcon: '',
    endIcon: '',
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
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...(__VLS_ctx.buttonAttrs),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.loading),
    ...{ class: ([
            // Base styles
            'inline-flex items-center justify-center font-sans transition-all duration-200 outline-none select-none border border-solid',
            __VLS_ctx.disabled || __VLS_ctx.loading
                ? 'bg-black-6 border-black-8 text-black-32 cursor-not-allowed opacity-80'
                : 'cursor-pointer active:scale-95',
            // Dynamic Classes for sizes and styles
            __VLS_ctx.sizeClasses,
            __VLS_ctx.disabled || __VLS_ctx.loading ? '' : __VLS_ctx.variantClasses,
            __VLS_ctx.isRoundedFull ? 'rounded-full' : '',
        ]) },
    ...{ style: (__VLS_ctx.customStyles) },
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
if (__VLS_ctx.loading || __VLS_ctx.showStartIcon || __VLS_ctx.$slots.start) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "inline-flex items-center justify-center shrink-0" },
        ...{ class: ([
                // Spacing between start icon and text
                __VLS_ctx.$slots.default ? 'ml-1.5' : '',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    if (__VLS_ctx.loading) {
        let __VLS_7;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            icon: "solar:spinner-bold-duotone",
            ...{ class: "animate-spin" },
            ...{ style: (__VLS_ctx.startIconSizeStyle) },
        }));
        const __VLS_9 = __VLS_8({
            icon: "solar:spinner-bold-duotone",
            ...{ class: "animate-spin" },
            ...{ style: (__VLS_ctx.startIconSizeStyle) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    }
    else {
        __VLS_asFunctionalSlot(__VLS_slots.start)({});
        let __VLS_13;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
            icon: (__VLS_ctx.startIcon || 'solar:widget-2-bold-duotone'),
            ...{ style: (__VLS_ctx.startIconSizeStyle) },
        }));
        const __VLS_15 = __VLS_14({
            icon: (__VLS_ctx.startIcon || 'solar:widget-2-bold-duotone'),
            ...{ style: (__VLS_ctx.startIconSizeStyle) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
}
if (__VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "whitespace-nowrap select-none" },
    });
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots['default'])({});
}
if (__VLS_ctx.showEndIcon || __VLS_ctx.$slots.end) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "inline-flex items-center justify-center shrink-0" },
        ...{ class: ([
                // Spacing between text and end icon
                __VLS_ctx.$slots.default ? 'mr-1.5' : '',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.end)({});
    let __VLS_20;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-down-bold'),
        ...{ style: (__VLS_ctx.endIconSizeStyle) },
    }));
    const __VLS_22 = __VLS_21({
        icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-down-bold'),
        ...{ style: (__VLS_ctx.endIconSizeStyle) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
// @ts-ignore
[resolvedTooltip, resolvedTooltip, tooltipPlacement, buttonAttrs, disabled, disabled, disabled, loading, loading, loading, loading, loading, sizeClasses, variantClasses, isRoundedFull, customStyles, showStartIcon, $slots, $slots, $slots, $slots, $slots, startIconSizeStyle, startIconSizeStyle, startIcon, showEndIcon, endIcon, endIconSizeStyle,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
