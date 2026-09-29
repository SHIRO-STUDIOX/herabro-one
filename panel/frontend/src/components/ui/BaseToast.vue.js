import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const props = withDefaults(defineProps(), {
    modelValue: true,
    type: 'primary',
    styleType: 'glass',
    size: 'md',
    title: '',
    message: '',
    icon: '',
    showIcon: true,
    closable: true,
    showProgress: true,
    actionLabel: '',
    actionIcon: '',
    duration: 0,
    fixed: false,
    position: 'top-center',
});
const emit = defineEmits();
const __VLS_slots = defineSlots();
const internalVisible = ref(props.modelValue);
let timer = null;
const isVisible = computed({
    get: () => internalVisible.value,
    set: (val) => {
        internalVisible.value = val;
        emit('update:modelValue', val);
    },
});
watch(() => props.modelValue, (newVal) => {
    internalVisible.value = newVal;
    if (newVal && props.duration > 0) {
        startTimer();
    }
});
const startTimer = () => {
    clearTimer();
    if (props.duration > 0) {
        timer = setTimeout(() => {
            handleCloseClick();
        }, props.duration);
    }
};
const clearTimer = () => {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
};
onMounted(() => {
    if (props.duration > 0 && isVisible.value) {
        startTimer();
    }
});
onBeforeUnmount(() => {
    clearTimer();
});
const handleCloseClick = () => {
    isVisible.value = false;
    emit('close');
};
const handleActionClick = () => {
    emit('action');
};
// Icon auto-resolution based on type
const resolvedIcon = computed(() => {
    if (props.icon)
        return props.icon;
    switch (props.type) {
        case 'success':
            return 'solar:check-circle-bold-duotone';
        case 'error':
            return 'solar:close-circle-bold-duotone';
        case 'warning':
            return 'solar:danger-triangle-bold-duotone';
        case 'info':
            return 'solar:info-circle-bold-duotone';
        case 'secondary':
            return 'solar:star-bold-duotone';
        case 'accent':
            return 'solar:shield-check-bold-duotone';
        case 'primary':
        default:
            return 'solar:bell-bing-bold-duotone';
    }
});
// Container Sizing Classes
const containerSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-4 py-2.5 gap-2.5 text-xs';
        case 'lg':
            return 'px-6 py-4.5 gap-4 text-base';
        case 'md':
        default:
            return 'px-5 py-3.5 gap-3.5 text-sm';
    }
});
// Rounded Classes (Always rounded on mobile & desktop for floating appearance)
const roundedClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'rounded-xl';
        case 'lg':
            return 'rounded-3xl';
        case 'md':
        default:
            return 'rounded-2xl';
    }
});
const iconRoundedClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'rounded-lg';
        case 'lg':
            return 'rounded-2xl';
        case 'md':
        default:
            return 'rounded-xl';
    }
});
// Icon Wrapper Size Classes
const iconWrapperSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-7 h-7';
        case 'lg':
            return 'w-10 h-10';
        case 'md':
        default:
            return 'w-8 h-8';
    }
});
const iconDimensions = computed(() => {
    let px = '20px';
    if (props.size === 'sm')
        px = '16px';
    if (props.size === 'lg')
        px = '24px';
    return { width: px, height: px };
});
// Fixed Positioning Classes (Floating with margins on mobile and desktop)
const fixedPositionClasses = computed(() => {
    const base = 'fixed z-[100] shadow-2xl transition-all duration-300';
    switch (props.position) {
        case 'top-left':
            return `${base} top-4 left-4 right-4 sm:right-auto sm:w-auto sm:max-w-md sm:top-6 sm:left-6`;
        case 'top-right':
            return `${base} top-4 right-4 left-4 sm:left-auto sm:w-auto sm:max-w-md sm:top-6 sm:right-6`;
        case 'top-center':
            return `${base} top-4 sm:top-[124px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[340px]`;
        case 'bottom-right':
            return `${base} bottom-4 right-4 left-4 sm:left-auto sm:w-auto sm:max-w-md sm:bottom-6 sm:right-6`;
        case 'bottom-center':
            return `${base} bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[340px] sm:bottom-6`;
        case 'bottom-left':
            return `${base} bottom-4 left-4 right-4 sm:right-auto sm:w-auto sm:max-w-md sm:bottom-6 sm:left-6`;
        default:
            return `${base} top-4 sm:top-[124px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[340px]`;
    }
});
// Dynamic Transition Name based on position or inline
const transitionName = computed(() => {
    if (!props.fixed)
        return 'toast-fade';
    if (props.position.startsWith('top'))
        return 'toast-slide-down';
    return 'toast-slide-up';
});
// Style and Color Mapping
const containerStyleClasses = computed(() => {
    const t = props.type;
    const s = props.styleType;
    if (s === 'fill') {
        switch (t) {
            case 'secondary':
                return 'bg-secondary-100 text-white-100 shadow-md border border-secondary-80';
            case 'accent':
                return 'bg-accent-100 text-white-100 shadow-md border border-accent-80';
            case 'info':
                return 'bg-info-100 text-white-100 shadow-md border border-info-80';
            case 'success':
                return 'bg-success-100 text-white-100 shadow-md border border-success-80';
            case 'warning':
                return 'bg-warning-100 text-white-100 shadow-md border border-warning-80';
            case 'error':
                return 'bg-error-100 text-white-100 shadow-md border border-error-80';
            case 'primary':
            default:
                return 'bg-primary-100 text-white-100 shadow-md border border-primary-80';
        }
    }
    if (s === 'soft') {
        switch (t) {
            case 'secondary':
                return 'bg-secondary-8 text-secondary-100 border border-secondary-24';
            case 'accent':
                return 'bg-accent-8 text-accent-100 border border-accent-24';
            case 'info':
                return 'bg-info-8 text-info-100 border border-info-24';
            case 'success':
                return 'bg-success-8 text-success-100 border border-success-24';
            case 'warning':
                return 'bg-warning-8 text-warning-100 border border-warning-24';
            case 'error':
                return 'bg-error-8 text-error-100 border border-error-24';
            case 'primary':
            default:
                return 'bg-primary-8 text-primary-100 border border-primary-24';
        }
    }
    if (s === 'outline') {
        switch (t) {
            case 'secondary':
                return 'bg-white-100 text-black-100 border-2 border-secondary-100 shadow-sm';
            case 'accent':
                return 'bg-white-100 text-black-100 border-2 border-accent-100 shadow-sm';
            case 'info':
                return 'bg-white-100 text-black-100 border-2 border-info-100 shadow-sm';
            case 'success':
                return 'bg-white-100 text-black-100 border-2 border-success-100 shadow-sm';
            case 'warning':
                return 'bg-white-100 text-black-100 border-2 border-warning-100 shadow-sm';
            case 'error':
                return 'bg-white-100 text-black-100 border-2 border-error-100 shadow-sm';
            case 'primary':
            default:
                return 'bg-white-100 text-black-100 border-2 border-primary-100 shadow-sm';
        }
    }
    // Default: 'glass' (Glassmorphism with blurred white backdrop & subtle token border)
    return 'bg-white-80 backdrop-blur-md border border-black-12 shadow-xl text-black-100';
});
const customContainerStyles = computed(() => {
    if (props.styleType === 'glass') {
        return {
            borderColor: `var(--color-${props.type}-24, rgba(0, 0, 0, 0.12))`,
        };
    }
    return {};
});
// Icon Wrapper Styles
const iconWrapperStyleClasses = computed(() => {
    const t = props.type;
    const s = props.styleType;
    if (s === 'fill') {
        return 'bg-white-24 text-white-100';
    }
    if (s === 'soft') {
        switch (t) {
            case 'secondary':
                return 'bg-secondary-12 text-secondary-100';
            case 'accent':
                return 'bg-accent-12 text-accent-100';
            case 'info':
                return 'bg-info-12 text-info-100';
            case 'success':
                return 'bg-success-12 text-success-100';
            case 'warning':
                return 'bg-warning-12 text-warning-100';
            case 'error':
                return 'bg-error-12 text-error-100';
            case 'primary':
            default:
                return 'bg-primary-12 text-primary-100';
        }
    }
    // Glass or Outline
    switch (t) {
        case 'secondary':
            return 'bg-secondary-12 text-secondary-100';
        case 'accent':
            return 'bg-accent-12 text-accent-100';
        case 'info':
            return 'bg-info-12 text-info-100';
        case 'success':
            return 'bg-success-12 text-success-100';
        case 'warning':
            return 'bg-warning-12 text-warning-100';
        case 'error':
            return 'bg-error-12 text-error-100';
        case 'primary':
        default:
            return 'bg-primary-12 text-primary-100';
    }
});
const customIconStyles = computed(() => {
    return {};
});
// Title Typography Classes
const titleTextClasses = computed(() => {
    if (props.styleType === 'fill') {
        return props.size === 'lg' ? 'text-base font-bold text-white-100' : 'text-sm sm:text-base font-bold text-white-100';
    }
    if (props.styleType === 'soft') {
        return props.size === 'lg' ? 'text-base font-black' : 'text-sm sm:text-base font-bold';
    }
    return props.size === 'lg' ? 'text-base font-bold text-black-100' : 'text-sm sm:text-base font-bold text-black-100';
});
// Message Typography Classes
const messageTextClasses = computed(() => {
    if (props.styleType === 'fill') {
        return props.size === 'lg' ? 'text-sm text-white-90 font-medium' : 'text-xs sm:text-sm text-white-90 font-medium';
    }
    if (props.styleType === 'soft') {
        return props.size === 'lg' ? 'text-sm opacity-90 font-medium' : 'text-xs sm:text-sm opacity-90 font-medium';
    }
    return props.size === 'lg' ? 'text-sm text-black-80 font-medium' : 'text-xs sm:text-sm text-black-80 font-medium';
});
// Progress Bar Color Classes
const progressBarColorClasses = computed(() => {
    if (props.styleType === 'fill') {
        return 'bg-white-100/40';
    }
    switch (props.type) {
        case 'secondary':
            return 'bg-secondary-100';
        case 'accent':
            return 'bg-accent-100';
        case 'info':
            return 'bg-info-100';
        case 'success':
            return 'bg-success-100';
        case 'warning':
            return 'bg-warning-100';
        case 'error':
            return 'bg-error-100';
        case 'primary':
        default:
            return 'bg-primary-100';
    }
});
// Action Button Classes
const actionButtonClasses = computed(() => {
    const t = props.type;
    const s = props.styleType;
    if (s === 'fill') {
        return 'bg-white-100 text-black-100 hover:bg-white-80 shadow-xs';
    }
    switch (t) {
        case 'secondary':
            return 'bg-secondary-100 text-white-100 hover:bg-secondary-80';
        case 'accent':
            return 'bg-accent-100 text-white-100 hover:bg-accent-80';
        case 'info':
            return 'bg-info-100 text-white-100 hover:bg-info-80';
        case 'success':
            return 'bg-success-100 text-white-100 hover:bg-success-80';
        case 'warning':
            return 'bg-warning-100 text-white-100 hover:bg-warning-80';
        case 'error':
            return 'bg-error-100 text-white-100 hover:bg-error-80';
        case 'primary':
        default:
            return 'bg-primary-100 text-white-100 hover:bg-primary-80';
    }
});
// Close Button Classes
const closeButtonClasses = computed(() => {
    if (props.styleType === 'fill') {
        return 'text-white-100 hover:bg-white-12';
    }
    return 'text-black-40 hover:text-black-100 hover:bg-black-6';
});
const __VLS_defaults = {
    modelValue: true,
    type: 'primary',
    styleType: 'glass',
    size: 'md',
    title: '',
    message: '',
    icon: '',
    showIcon: true,
    closable: true,
    showProgress: true,
    actionLabel: '',
    actionIcon: '',
    duration: 0,
    fixed: false,
    position: 'top-center',
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: (__VLS_ctx.transitionName),
}));
const __VLS_2 = __VLS_1({
    name: (__VLS_ctx.transitionName),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.isVisible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([
                // Layout and Base styles
                'font-sans select-none flex items-center transition-all duration-300',
                __VLS_ctx.fixed ? __VLS_ctx.fixedPositionClasses : 'w-full',
                __VLS_ctx.containerSizeClasses,
                __VLS_ctx.containerStyleClasses,
                __VLS_ctx.roundedClasses,
            ]) },
        ...{ style: (__VLS_ctx.customContainerStyles) },
        dir: "rtl",
        role: "alert",
    });
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    if (__VLS_ctx.showIcon || __VLS_ctx.$slots.icon) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "shrink-0 flex items-center justify-center transition-transform" },
            ...{ class: ([__VLS_ctx.iconWrapperSizeClasses, __VLS_ctx.iconWrapperStyleClasses, __VLS_ctx.iconRoundedClasses]) },
            ...{ style: (__VLS_ctx.customIconStyles) },
        });
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots.icon)({});
        let __VLS_7;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            icon: (__VLS_ctx.resolvedIcon),
            ...{ style: (__VLS_ctx.iconDimensions) },
        }));
        const __VLS_9 = __VLS_8({
            icon: (__VLS_ctx.resolvedIcon),
            ...{ style: (__VLS_ctx.iconDimensions) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 flex flex-col justify-center min-w-0 pr-1 text-right" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['pr-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    if (__VLS_ctx.title || __VLS_ctx.$slots.title) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({
            ...{ class: (['font-bold font-dots-1 leading-tight truncate', __VLS_ctx.titleTextClasses]) },
        });
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots.title)({});
        (__VLS_ctx.title);
    }
    if (__VLS_ctx.message || __VLS_ctx.$slots.default) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: (['font-dots-1 leading-relaxed whitespace-pre-wrap', __VLS_ctx.title ? 'mt-0.5' : '', __VLS_ctx.messageTextClasses]) },
        });
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
        /** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots['default'])({});
        (__VLS_ctx.message);
    }
    if (__VLS_ctx.actionLabel || __VLS_ctx.$slots.action) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "shrink-0 flex items-center mr-2" },
        });
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots.action)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.handleActionClick) },
            type: "button",
            ...{ class: "px-2.5 py-1 rounded-xl text-xs font-bold font-dots-1 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs" },
            ...{ class: (__VLS_ctx.actionButtonClasses) },
        });
        /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
        if (__VLS_ctx.actionIcon) {
            let __VLS_15;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
                icon: (__VLS_ctx.actionIcon),
                ...{ class: "w-3.5 h-3.5" },
            }));
            const __VLS_17 = __VLS_16({
                icon: (__VLS_ctx.actionIcon),
                ...{ class: "w-3.5 h-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.actionLabel);
    }
    if (__VLS_ctx.closable || __VLS_ctx.$slots.close) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "shrink-0 flex items-center mr-1" },
        });
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots.close)({});
        const __VLS_21 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
            text: "بستن اعلان",
        }));
        const __VLS_23 = __VLS_22({
            text: "بستن اعلان",
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        const { default: __VLS_26 } = __VLS_24.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.handleCloseClick) },
            type: "button",
            title: "بستن اعلان",
            ...{ class: "w-6.5 h-6.5 rounded-lg transition-all cursor-pointer flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-black-6 active:scale-95" },
            ...{ class: (__VLS_ctx.closeButtonClasses) },
            'aria-label': "بستن اعلان",
        });
        /** @type {__VLS_StyleScopedClasses['w-6.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-black-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-3.5 h-3.5" },
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2.2",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M18 6 6 18",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "m6 6 12 12",
        });
        // @ts-ignore
        [transitionName, isVisible, fixed, fixedPositionClasses, containerSizeClasses, containerStyleClasses, roundedClasses, customContainerStyles, showIcon, $slots, $slots, $slots, $slots, $slots, iconWrapperSizeClasses, iconWrapperStyleClasses, iconRoundedClasses, customIconStyles, resolvedIcon, iconDimensions, title, title, title, titleTextClasses, message, message, messageTextClasses, actionLabel, actionLabel, handleActionClick, actionButtonClasses, actionIcon, actionIcon, closable, handleCloseClick, closeButtonClasses,];
        var __VLS_24;
    }
    if (__VLS_ctx.duration > 0 && __VLS_ctx.showProgress) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute bottom-0 inset-x-0 h-1 bg-black-6 overflow-hidden rounded-b-2xl" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-black-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-full toast-progress-bar rounded-b-2xl" },
            ...{ class: (__VLS_ctx.progressBarColorClasses) },
            ...{ style: ({ animationDuration: `${__VLS_ctx.duration}ms` }) },
        });
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['toast-progress-bar']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
    }
}
// @ts-ignore
[duration, duration, showProgress, progressBarColorClasses,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
