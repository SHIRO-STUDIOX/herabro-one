import { Icon } from '@iconify/vue';
import BaseButton from '@/components/ui/BaseButton.vue';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
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
    enterActiveClass: "transition duration-300 ease-out",
    enterFromClass: "transform -translate-y-full opacity-0",
    enterToClass: "transform translate-y-0 opacity-100",
    leaveActiveClass: "transition duration-200 ease-in",
    leaveFromClass: "transform translate-y-0 opacity-100",
    leaveToClass: "transform -translate-y-full opacity-0",
}));
const __VLS_2 = __VLS_1({
    enterActiveClass: "transition duration-300 ease-out",
    enterFromClass: "transform -translate-y-full opacity-0",
    enterToClass: "transform translate-y-0 opacity-100",
    leaveActiveClass: "transition duration-200 ease-in",
    leaveFromClass: "transform translate-y-0 opacity-100",
    leaveToClass: "transform -translate-y-full opacity-0",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.active) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sticky top-0 z-50 w-full bg-warning-6 border-b border-warning-24 px-4 py-2.5 flex items-center justify-between text-warning-100 font-sans shadow-sm select-none" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['sticky']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-warning-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-warning-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-warning-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-8 h-8 rounded-full bg-warning-12 border border-warning-24 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-warning-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-warning-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        icon: "solar:shield-warning-bold-duotone",
        ...{ class: "w-4 h-4 text-warning-100" },
    }));
    const __VLS_8 = __VLS_7({
        icon: "solar:shield-warning-bold-duotone",
        ...{ class: "w-4 h-4 text-warning-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-warning-100']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2 flex-wrap text-xs sm:text-sm font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-bold underline decoration-warning-40 text-warning-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['underline']} */ ;
    /** @type {__VLS_StyleScopedClasses['decoration-warning-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-warning-100']} */ ;
    (__VLS_ctx.tenantTitle);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (__VLS_ctx.expiresAt) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-warning-80 mr-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-warning-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "font-mono" },
        });
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        (__VLS_ctx.expiresAt);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    const __VLS_11 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        ...{ 'onClick': {} },
        size: "sm",
        variant: "secondary",
        startIcon: "solar:logout-2-linear",
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        size: "sm",
        variant: "secondary",
        startIcon: "solar:logout-2-linear",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_16;
    const __VLS_17 = {
        /** @type {typeof __VLS_16.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.active))
                throw 0;
            return (__VLS_ctx.$emit('exit'));
            // @ts-ignore
            [active, tenantTitle, expiresAt, expiresAt, $emit,];
        },
    };
    const { default: __VLS_18 } = __VLS_14.slots;
    // @ts-ignore
    [];
    var __VLS_14;
    var __VLS_15;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
