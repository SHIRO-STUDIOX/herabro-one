import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    modelValue: false,
    size: '16',
    disabled: false,
    color: 'secondary',
});
const emit = defineEmits();
const sizeClasses = computed(() => {
    return props.size === '12' ? 'w-3 h-3' : 'w-4 h-4';
});
const stateClasses = computed(() => {
    if (props.disabled) {
        return 'bg-black-6 border-black-8 cursor-not-allowed text-black-32';
    }
    if (props.modelValue) {
        return props.color === 'primary'
            ? 'bg-primary-100 border-primary-100'
            : 'bg-secondary-100 border-secondary-100';
    }
    else {
        return 'bg-white-100 border-primary-12 hover:border-primary-24';
    }
});
const toggleCheck = () => {
    if (props.disabled)
        return;
    const newVal = !props.modelValue;
    emit('update:modelValue', newVal);
    emit('change', newVal);
};
const __VLS_defaults = {
    modelValue: false,
    size: '16',
    disabled: false,
    color: 'secondary',
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.toggleCheck) },
    ...{ class: ([
            // Base styles matching Figma Checkbox (16px or 12px, rounded 4px)
            'border border-solid flex items-center justify-center shrink-0 transition-all duration-200 select-none cursor-pointer rounded-[4px]',
            __VLS_ctx.sizeClasses,
            __VLS_ctx.stateClasses,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[4px]']} */ ;
if (__VLS_ctx.modelValue) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        viewBox: (__VLS_ctx.size === '12' ? '0 0 12 12' : '0 0 16 16'),
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...{ class: "text-white-100 shrink-0" },
        ...{ class: (__VLS_ctx.size === '12' ? 'w-2 h-2' : 'w-2.5 h-2.5') },
    });
    /** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    if (__VLS_ctx.size === '12') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M2.5 6L4.5 8L9.5 3",
            stroke: "currentColor",
            'stroke-width': "1.6",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M3.5 8L6.5 11L12.5 4.5",
            stroke: "currentColor",
            'stroke-width': "2",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
    }
}
// @ts-ignore
[toggleCheck, sizeClasses, stateClasses, modelValue, size, size, size,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
