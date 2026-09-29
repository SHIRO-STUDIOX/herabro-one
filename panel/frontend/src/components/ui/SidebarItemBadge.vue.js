import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    label: 'عنوان',
    state: 'enabled',
});
const stateClasses = computed(() => {
    switch (props.state) {
        case 'selected':
            return 'bg-primary-100';
        case 'hovered':
            return 'bg-primary-12';
        case 'enabled':
        default:
            return 'bg-primary-6';
    }
});
const textClasses = computed(() => {
    switch (props.state) {
        case 'selected':
            return 'text-white-100';
        case 'hovered':
            return 'text-primary-100';
        case 'enabled':
        default:
            return 'text-primary-80';
    }
});
const __VLS_defaults = {
    label: 'عنوان',
    state: 'enabled',
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
    ...{ class: ([
            'inline-flex items-center justify-center h-5 px-3 rounded-full shrink-0 transition-all duration-200 select-none',
            __VLS_ctx.stateClasses,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold leading-4 font-dots-1 text-center whitespace-nowrap" },
    ...{ class: (__VLS_ctx.textClasses) },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
var __VLS_0 = {};
(__VLS_ctx.label || 'عنوان');
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[stateClasses, textClasses, label,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
