import { Icon } from '@iconify/vue';
import { motion, AnimatePresence } from 'motion-v';
const __VLS_props = withDefaults(defineProps(), {
    show: true,
    absolute: true,
});
const __VLS_defaults = {
    show: true,
    absolute: true,
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.AnimatePresence | typeof __VLS_components.AnimatePresence} */
AnimatePresence;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.show || !__VLS_ctx.absolute) {
    const __VLS_7 = (__VLS_ctx.motion.div) || (__VLS_ctx.motion.div);
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onClick': {} },
        initial: ({ opacity: 0 }),
        animate: ({ opacity: 1 }),
        exit: ({ opacity: 0 }),
        transition: ({ duration: 0.25 }),
        ...{ class: ([
                __VLS_ctx.absolute
                    ? 'absolute inset-0 z-30 bg-white-80 backdrop-blur-md'
                    : 'relative w-full bg-white-100 shadow-[0px_4px_12px_rgba(73,64,109,0.08)] min-h-[140px]',
                'rounded-2xl border border-solid border-primary-12 flex flex-col items-center justify-center px-4 py-6 gap-3 select-none',
            ]) },
        dir: "rtl",
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
        initial: ({ opacity: 0 }),
        animate: ({ opacity: 1 }),
        exit: ({ opacity: 0 }),
        transition: ({ duration: 0.25 }),
        ...{ class: ([
                __VLS_ctx.absolute
                    ? 'absolute inset-0 z-30 bg-white-80 backdrop-blur-md'
                    : 'relative w-full bg-white-100 shadow-[0px_4px_12px_rgba(73,64,109,0.08)] min-h-[140px]',
                'rounded-2xl border border-solid border-primary-12 flex flex-col items-center justify-center px-4 py-6 gap-3 select-none',
            ]) },
        dir: "rtl",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = {
        /** @type {typeof __VLS_12.click} */
        onClick: () => { },
    };
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    const { default: __VLS_14 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col gap-1 items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        icon: "lucide:loader",
        width: "32",
        height: "32",
        ...{ class: "text-success-100 animate-spin shrink-0" },
        ...{ style: {} },
    }));
    const __VLS_17 = __VLS_16({
        icon: "lucide:loader",
        width: "32",
        height: "32",
        ...{ class: "text-success-100 animate-spin shrink-0" },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    /** @type {__VLS_StyleScopedClasses['text-success-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "font-bold text-xs leading-[18px] text-primary-100 text-center whitespace-nowrap font-dots-0" },
    });
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "font-medium text-xs leading-[20px] text-primary-60 text-center w-full font-dots-0" },
    });
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[20px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-0']} */ ;
    // @ts-ignore
    [show, absolute, absolute, motion, motion,];
    var __VLS_10;
    var __VLS_11;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
