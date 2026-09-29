import { computed } from 'vue';
import { Icon } from '@iconify/vue';
const __VLS_slots = defineSlots();
const props = withDefaults(defineProps(), {
    styleType: 'soft',
    size: 'sm',
    type: 'primary',
    showStartIcon: false,
    showLabel: true,
    startIcon: '',
    borderStyle: 'solid',
});
const borderStyleClass = computed(() => {
    switch (props.borderStyle) {
        case 'dashed':
            return 'border-dashed';
        case 'dotted':
            return 'border-dotted';
        case 'none':
            return 'border-none';
        case 'solid':
        default:
            return 'border-solid';
    }
});
// Size & Typography mapping
const sizeClasses = computed(() => {
    switch (props.size) {
        case '2xs':
            // 2xs: h-16px, px-4px, font-size 10px (text-2xs), font-weight 600
            return 'h-4 px-1 text-[10px] font-semibold';
        case 'xs':
            // xs: h-16px, px-6px, font-size 12px (text-xs), font-weight 600
            return 'h-4 px-1.5 text-xs font-semibold';
        case 'lg':
            // lg: h-40px, px-8px, font-size 14px (text-sm), font-weight 700
            return 'h-10 px-2.5 text-sm font-bold';
        case 'sm':
        default:
            // sm: h-24px, px-6px, font-size 12px (text-xs), font-weight 600
            return 'h-6 px-1.5 text-xs font-semibold';
    }
});
// Icon Sizes mapping
const iconSizeStyle = computed(() => {
    let size = '12px';
    if (props.size === '2xs')
        size = '8px';
    else if (props.size === 'xs')
        size = '10px';
    else if (props.size === 'lg')
        size = '20px';
    return { width: size, height: size };
});
// Variant (Style & Color Type) mapping
const variantClasses = computed(() => {
    const style = props.styleType;
    const colorType = props.type;
    // Fill Style (Solid color bg, white text)
    if (style === 'fill') {
        switch (colorType) {
            case 'secondary':
                return 'bg-secondary-100 text-white-100';
            case 'accent':
                return 'bg-accent-100 text-white-100';
            case 'info':
                return 'bg-info-100 text-white-100';
            case 'success':
                return 'bg-success-100 text-white-100';
            case 'warning':
                return 'bg-warning-100 text-white-100';
            case 'error':
                return 'bg-error-100 text-white-100';
            case 'white':
                return 'bg-white-100 text-black-100 border-black-12';
            case 'primary':
            default:
                return 'bg-primary-100 text-white-100';
        }
    }
    // Soft Style (Light opacity bg, solid color text, backdrop-blur)
    if (style === 'soft') {
        switch (colorType) {
            case 'primary':
                return 'backdrop-blur-md bg-primary-6 text-primary-100';
            case 'secondary':
                return 'backdrop-blur-md bg-secondary-8 text-secondary-100';
            case 'accent':
                return 'backdrop-blur-md bg-accent-6 text-accent-100';
            case 'info':
                return 'backdrop-blur-md bg-info-8 text-info-100';
            case 'success':
                return 'backdrop-blur-md bg-success-8 text-success-100';
            case 'warning':
                return 'backdrop-blur-md bg-warning-8 text-warning-100';
            case 'error':
                return 'backdrop-blur-md bg-error-6 text-error-100';
            case 'white':
                // white soft badge in Figma uses 40% white opacity background (bg-white-40) and primary text
                return 'backdrop-blur-md bg-white-40 text-primary-100';
            default:
                return 'backdrop-blur-md bg-primary-6 text-primary-100';
        }
    }
    return '';
});
const __VLS_defaults = {
    styleType: 'soft',
    size: 'sm',
    type: 'primary',
    showStartIcon: false,
    showLabel: true,
    startIcon: '',
    borderStyle: 'solid',
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
if (__VLS_ctx.showLabel || __VLS_ctx.showStartIcon) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([
                // Base styles
                'inline-flex items-center justify-center font-sans select-none rounded-full shrink-0 border border-transparent',
                __VLS_ctx.borderStyleClass,
                // Dynamic sizing and styling classes
                __VLS_ctx.sizeClasses,
                __VLS_ctx.variantClasses,
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-transparent']} */ ;
    if (__VLS_ctx.showStartIcon || __VLS_ctx.$slots.start) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "inline-flex items-center justify-center shrink-0" },
            ...{ class: ([
                    // Spacing between start icon and text
                    __VLS_ctx.showLabel && __VLS_ctx.$slots.default ? 'ml-1' : '',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots.start)({});
        let __VLS_1;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_2 = __VLS_asFunctionalComponent1(__VLS_1, new __VLS_1({
            icon: (__VLS_ctx.startIcon || 'solar:bell-bing-bold-duotone'),
            ...{ style: (__VLS_ctx.iconSizeStyle) },
        }));
        const __VLS_3 = __VLS_2({
            icon: (__VLS_ctx.startIcon || 'solar:bell-bing-bold-duotone'),
            ...{ style: (__VLS_ctx.iconSizeStyle) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_2));
    }
    if (__VLS_ctx.showLabel && __VLS_ctx.$slots.default) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "whitespace-nowrap leading-none" },
        });
        /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots['default'])({});
    }
}
// @ts-ignore
[showLabel, showLabel, showLabel, showStartIcon, showStartIcon, borderStyleClass, sizeClasses, variantClasses, $slots, $slots, $slots, startIcon, iconSizeStyle,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
