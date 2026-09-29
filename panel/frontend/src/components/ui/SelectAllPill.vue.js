import { computed } from 'vue';
import BaseCheckbox from './BaseCheckbox.vue';
const props = withDefaults(defineProps(), {
    modelValue: false,
    label: 'انتخاب کل',
    disabled: false,
});
const emit = defineEmits();
const stateClasses = computed(() => {
    if (props.disabled) {
        return 'bg-black-6 border-black-8 text-black-32 cursor-not-allowed';
    }
    if (props.modelValue) {
        return 'bg-secondary-6 border-transparent text-secondary-100 hover:bg-secondary-12';
    }
    else {
        return 'bg-white-100 border-primary-6 text-primary-100 hover:border-primary-12';
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
    label: 'انتخاب کل',
    disabled: false,
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
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggleCheck) },
    ...{ class: ([
            // Base styles matching Figma SelectAllRow (h-24px, px-8px, py-4px, rounded-full, gap-4px)
            'inline-flex items-center justify-center gap-1 h-6 px-2 py-1 rounded-full border border-solid transition-all duration-300 select-none outline-none cursor-pointer',
            __VLS_ctx.stateClasses,
        ]) },
    disabled: (__VLS_ctx.disabled),
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
const __VLS_0 = BaseCheckbox;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.modelValue),
    size: "12",
    disabled: (__VLS_ctx.disabled),
    ...{ class: "pointer-events-none" },
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.modelValue),
    size: "12",
    disabled: (__VLS_ctx.disabled),
    ...{ class: "pointer-events-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[10px] font-semibold leading-3.5 font-dots-1 transition-colors whitespace-nowrap" },
});
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
(__VLS_ctx.label);
// @ts-ignore
[toggleCheck, stateClasses, disabled, disabled, modelValue, label,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
