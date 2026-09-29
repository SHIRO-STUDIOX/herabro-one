import { computed } from 'vue';
import { Icon } from '@iconify/vue';
const props = withDefaults(defineProps(), {
    modelValue: false,
    checked: false,
    label: '',
    labelPosition: 'right',
    size: 'md',
    color: 'secondary',
    disabled: false,
    loading: false,
    icon: '',
    activeIcon: '',
    inactiveIcon: '',
});
const emit = defineEmits();
const isChecked = computed(() => {
    return props.modelValue || props.checked;
});
const handleChange = (e) => {
    if (props.disabled || props.loading)
        return;
    const target = e.target;
    const newVal = target.checked;
    emit('update:modelValue', newVal);
    emit('update:checked', newVal);
    emit('change', newVal);
};
// Track dimensions (width × height)
const trackSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-8 h-4.5 min-w-[32px]'; // 32 × 18 px
        case 'lg':
            return 'w-13 h-7.5 min-w-[52px]'; // 52 × 30 px
        case 'md':
        default:
            return 'w-10.5 h-6 min-w-[42px]'; // 42 × 24 px
    }
});
// Thumb Knob dimensions
const thumbSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-3.5 h-3.5 min-w-[14px]'; // 14 × 14 px
        case 'lg':
            return 'w-6 h-6 min-w-[24px]'; // 24 × 24 px
        case 'md':
        default:
            return 'w-5 h-5 min-w-[20px]'; // 20 × 20 px
    }
});
// Thumb translation for RTL layout
const thumbTranslateClasses = computed(() => {
    if (!isChecked.value) {
        return 'translate-x-0';
    }
    switch (props.size) {
        case 'sm':
            return '-translate-x-3.5';
        case 'lg':
            return '-translate-x-5.5';
        case 'md':
        default:
            return '-translate-x-4.5';
    }
});
// Active track colors
const activeTrackClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'bg-primary-100 border-primary-100 shadow-inner';
        case 'accent':
            return 'bg-accent-100 border-accent-100 shadow-inner';
        case 'success':
            return 'bg-success-100 border-success-100 shadow-inner';
        case 'warning':
            return 'bg-warning-100 border-warning-100 shadow-inner';
        case 'error':
            return 'bg-error-100 border-error-100 shadow-inner';
        case 'secondary':
        default:
            return 'bg-secondary-100 border-secondary-100 shadow-inner';
    }
});
// Inactive track colors
const inactiveTrackClasses = computed(() => {
    return 'bg-primary-12 border-primary-12 hover:bg-primary-16';
});
// Icon Size in thumb
const iconSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-2.5 h-2.5';
        case 'lg':
            return 'w-4 h-4';
        case 'md':
        default:
            return 'w-3 h-3';
    }
});
// Active icon color
const activeIconColorClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'text-primary-100';
        case 'accent':
            return 'text-accent-100';
        case 'success':
            return 'text-success-100';
        case 'warning':
            return 'text-warning-100';
        case 'error':
            return 'text-error-100';
        case 'secondary':
        default:
            return 'text-secondary-100';
    }
});
const inactiveIconColorClasses = computed(() => {
    return 'text-primary-40';
});
// Label text sizes
const labelSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'text-2xs';
        case 'lg':
            return 'text-sm';
        case 'md':
        default:
            return 'text-xs';
    }
});
const __VLS_defaults = {
    modelValue: false,
    checked: false,
    label: '',
    labelPosition: 'right',
    size: 'md',
    color: 'secondary',
    disabled: false,
    loading: false,
    icon: '',
    activeIcon: '',
    inactiveIcon: '',
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
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "inline-flex items-center gap-2 select-none font-sans" },
    ...{ class: ([
            __VLS_ctx.disabled || __VLS_ctx.loading ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
            __VLS_ctx.labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
        ]) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    type: "checkbox",
    role: "switch",
    checked: (__VLS_ctx.isChecked),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.loading),
    'aria-checked': (__VLS_ctx.isChecked),
    ...{ class: "sr-only" },
});
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative rounded-full transition-all duration-200 ease-in-out shrink-0 flex items-center p-0.5 border" },
    ...{ class: ([
            __VLS_ctx.trackSizeClasses,
            __VLS_ctx.isChecked ? __VLS_ctx.activeTrackClasses : __VLS_ctx.inactiveTrackClasses,
            __VLS_ctx.disabled || __VLS_ctx.loading ? '' : 'active:scale-[0.97]',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center bg-white-100" },
    ...{ class: ([__VLS_ctx.thumbSizeClasses, __VLS_ctx.thumbTranslateClasses]) },
});
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
if (__VLS_ctx.loading) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        icon: "solar:spinner-bold-duotone",
        ...{ class: "animate-spin text-primary-60" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }));
    const __VLS_2 = __VLS_1({
        icon: "solar:spinner-bold-duotone",
        ...{ class: "animate-spin text-primary-60" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
}
else if (__VLS_ctx.isChecked && (__VLS_ctx.activeIcon || __VLS_ctx.icon)) {
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        icon: (__VLS_ctx.activeIcon || __VLS_ctx.icon),
        ...{ class: ([__VLS_ctx.iconSizeClasses, __VLS_ctx.activeIconColorClasses]) },
    }));
    const __VLS_7 = __VLS_6({
        icon: (__VLS_ctx.activeIcon || __VLS_ctx.icon),
        ...{ class: ([__VLS_ctx.iconSizeClasses, __VLS_ctx.activeIconColorClasses]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
else if (!__VLS_ctx.isChecked && (__VLS_ctx.inactiveIcon || __VLS_ctx.icon)) {
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        icon: (__VLS_ctx.inactiveIcon || __VLS_ctx.icon),
        ...{ class: ([__VLS_ctx.iconSizeClasses, __VLS_ctx.inactiveIconColorClasses]) },
    }));
    const __VLS_12 = __VLS_11({
        icon: (__VLS_ctx.inactiveIcon || __VLS_ctx.icon),
        ...{ class: ([__VLS_ctx.iconSizeClasses, __VLS_ctx.inactiveIconColorClasses]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
if (__VLS_ctx.label || __VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-dots-1 transition-colors" },
        ...{ class: ([
                __VLS_ctx.labelSizeClasses,
                __VLS_ctx.isChecked ? 'text-primary-100 font-bold' : 'text-primary-60 font-medium',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    var __VLS_15 = {};
    (__VLS_ctx.label);
}
// @ts-ignore
var __VLS_16 = __VLS_15;
// @ts-ignore
[disabled, disabled, disabled, loading, loading, loading, loading, labelPosition, handleChange, isChecked, isChecked, isChecked, isChecked, isChecked, isChecked, trackSizeClasses, activeTrackClasses, inactiveTrackClasses, thumbSizeClasses, thumbTranslateClasses, iconSizeClasses, iconSizeClasses, iconSizeClasses, activeIcon, activeIcon, icon, icon, icon, icon, activeIconColorClasses, inactiveIcon, inactiveIcon, inactiveIconColorClasses, label, label, $slots, labelSizeClasses,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
