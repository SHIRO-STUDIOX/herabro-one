import BaseTabPill from './BaseTabPill.vue';
const props = withDefaults(defineProps(), {
    modelValue: '',
    tabs: () => [],
});
const emit = defineEmits();
const handleSelect = (id) => {
    if (props.modelValue !== id) {
        emit('update:modelValue', id);
        emit('change', id);
    }
};
const __VLS_defaults = {
    modelValue: '',
    tabs: () => [],
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
    ...{ class: "flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 select-none w-full dir-rtl" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['no-scrollbar']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['dir-rtl']} */ ;
for (const [tab] of __VLS_vFor((__VLS_ctx.tabs))) {
    const __VLS_0 = BaseTabPill;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        key: (tab.id),
        label: (tab.label),
        active: (__VLS_ctx.modelValue === tab.id),
        icon: (tab.icon),
        count: (tab.count),
        disabled: (tab.disabled),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        key: (tab.id),
        label: (tab.label),
        active: (__VLS_ctx.modelValue === tab.id),
        icon: (tab.icon),
        count: (tab.count),
        disabled: (tab.disabled),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.handleSelect(tab.id));
            // @ts-ignore
            [tabs, modelValue, handleSelect,];
        },
    };
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
