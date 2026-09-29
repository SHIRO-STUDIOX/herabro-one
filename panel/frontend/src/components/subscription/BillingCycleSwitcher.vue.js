import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
const __VLS_props = withDefaults(defineProps(), { modelValue: 'MONTHLY' });
const __VLS_emit = defineEmits();
const options = [
    { value: 'MONTHLY', label: 'پرداخت ماهانه', icon: 'solar:calendar-linear' },
    { value: 'ANNUAL', label: 'پرداخت سالانه', icon: 'solar:calendar-date-bold-duotone' },
];
const __VLS_defaults = { modelValue: 'MONTHLY' };
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
    ...{ class: "flex flex-col items-center gap-2 w-full select-none" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-10 bg-white-80 border border-primary-8 rounded-full p-1 flex items-center gap-1 w-full max-w-[360px]" },
    role: "tablist",
});
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[360px]']} */ ;
for (const [option] of __VLS_vFor((__VLS_ctx.options))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                return (__VLS_ctx.$emit('update:modelValue', option.value));
                // @ts-ignore
                [options, $emit,];
            } },
        key: (option.value),
        type: "button",
        role: "tab",
        'aria-selected': (__VLS_ctx.modelValue === option.value),
        ...{ class: "flex-1 h-8 rounded-full flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer outline-none font-dots-1" },
        ...{ class: (__VLS_ctx.modelValue === option.value
                ? 'bg-primary-100 text-white-100 font-bold shadow-2xs'
                : 'text-primary-60 hover:text-primary-100 font-medium') },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        icon: (option.icon),
        ...{ class: "w-4 h-4 shrink-0" },
    }));
    const __VLS_2 = __VLS_1({
        icon: (option.icon),
        ...{ class: "w-4 h-4 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    (option.label);
    // @ts-ignore
    [modelValue, modelValue,];
}
if (__VLS_ctx.modelValue === 'ANNUAL') {
    const __VLS_5 = BaseBadge || BaseBadge;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        type: "primary",
        styleType: "soft",
        size: "2xs",
        showStartIcon: (true),
        startIcon: "solar:gift-bold-duotone",
    }));
    const __VLS_7 = __VLS_6({
        type: "primary",
        styleType: "soft",
        size: "2xs",
        showStartIcon: (true),
        startIcon: "solar:gift-bold-duotone",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_10 } = __VLS_8.slots;
    // @ts-ignore
    [modelValue,];
    var __VLS_8;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
