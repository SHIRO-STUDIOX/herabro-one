import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    width: '100%',
    height: '16px',
    rounded: 'md',
    animate: true,
    class: '',
});
const roundedClass = computed(() => {
    switch (props.rounded) {
        case 'none':
            return 'rounded-none';
        case 'xs':
            return 'rounded-xs';
        case 'sm':
            return 'rounded-sm';
        case 'md':
            return 'rounded-md';
        case 'lg':
            return 'rounded-lg';
        case 'xl':
            return 'rounded-xl';
        case '2xl':
            return 'rounded-2xl';
        case '3xl':
            return 'rounded-3xl';
        case 'full':
            return 'rounded-full';
        default:
            return 'rounded-md';
    }
});
const customClass = computed(() => props.class);
const customStyle = computed(() => {
    const w = typeof props.width === 'number' ? `${props.width}px` : props.width;
    const h = typeof props.height === 'number' ? `${props.height}px` : props.height;
    return {
        width: w,
        height: h,
    };
});
const __VLS_defaults = {
    width: '100%',
    height: '16px',
    rounded: 'md',
    animate: true,
    class: '',
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: ([
            'select-none shrink-0 pointer-events-none',
            __VLS_ctx.animate ? 'animate-shimmer' : 'bg-primary-6',
            __VLS_ctx.roundedClass,
            __VLS_ctx.customClass,
        ]) },
    ...{ style: (__VLS_ctx.customStyle) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
// @ts-ignore
[animate, roundedClass, customClass, customStyle,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
