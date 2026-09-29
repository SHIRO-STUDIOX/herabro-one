import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const props = withDefaults(defineProps(), {
    modelValue: '',
    options: () => [],
    hideLabelsOnMobile: false,
    disabled: false,
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
    options: () => [],
    hideLabelsOnMobile: false,
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full h-8 bg-primary-6 p-1 rounded-full flex items-center justify-between gap-1 shrink-0 font-dots-1 select-none" },
    'data-name': "SegmentedTabs",
    dir: "rtl",
    role: "tablist",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
for (const [option] of __VLS_vFor((__VLS_ctx.options))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
        key: (option.id),
    });
    if (option.tooltip) {
        const __VLS_0 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            text: (option.tooltip),
        }));
        const __VLS_2 = __VLS_1({
            text: (option.tooltip),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const { default: __VLS_5 } = __VLS_3.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(option.tooltip))
                        throw 0;
                    return (__VLS_ctx.handleSelect(option.id));
                    // @ts-ignore
                    [options, handleSelect,];
                } },
            type: "button",
            role: "tab",
            'aria-selected': (__VLS_ctx.modelValue === option.id),
            disabled: (__VLS_ctx.disabled),
            ...{ class: ([
                    'h-full flex-1 px-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer outline-none whitespace-nowrap',
                    __VLS_ctx.modelValue === option.id
                        ? 'bg-black-100 text-white-100 shadow-xs'
                        : 'text-black-60 hover:text-black-100 hover:bg-white-100 active:scale-95',
                    __VLS_ctx.disabled ? 'opacity-50 pointer-events-none' : '',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
        if (option.icon) {
            let __VLS_6;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
                icon: (option.icon),
                ...{ class: "w-3.5 h-3.5 shrink-0" },
            }));
            const __VLS_8 = __VLS_7({
                icon: (option.icon),
                ...{ class: "w-3.5 h-3.5 shrink-0" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_7));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (__VLS_ctx.hideLabelsOnMobile ? 'hidden sm:inline' : '') },
        });
        (option.label);
        // @ts-ignore
        [modelValue, modelValue, disabled, disabled, hideLabelsOnMobile,];
        var __VLS_3;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(option.tooltip))
                        throw 0;
                    return (__VLS_ctx.handleSelect(option.id));
                    // @ts-ignore
                    [handleSelect,];
                } },
            type: "button",
            role: "tab",
            'aria-selected': (__VLS_ctx.modelValue === option.id),
            disabled: (__VLS_ctx.disabled),
            ...{ class: ([
                    'h-full flex-1 px-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer outline-none whitespace-nowrap',
                    __VLS_ctx.modelValue === option.id
                        ? 'bg-black-100 text-white-100 shadow-xs'
                        : 'text-black-60 hover:text-black-100 hover:bg-white-100 active:scale-95',
                    __VLS_ctx.disabled ? 'opacity-50 pointer-events-none' : '',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
        if (option.icon) {
            let __VLS_11;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
                icon: (option.icon),
                ...{ class: "w-3.5 h-3.5 shrink-0" },
            }));
            const __VLS_13 = __VLS_12({
                icon: (option.icon),
                ...{ class: "w-3.5 h-3.5 shrink-0" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_12));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (__VLS_ctx.hideLabelsOnMobile ? 'hidden sm:inline' : '') },
        });
        (option.label);
    }
    // @ts-ignore
    [modelValue, modelValue, disabled, disabled, hideLabelsOnMobile,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
