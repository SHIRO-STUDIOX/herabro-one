import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
const props = defineProps();
const emit = defineEmits();
function getCycleName(months) {
    switch (months) {
        case 1:
            return '۱ ماهه (ماهانه)';
        case 3:
            return '۳ ماهه (فصلی)';
        case 6:
            return '۶ ماهه (نیم‌سال)';
        case 12:
            return '۱۲ ماهه (سالانه)';
        default:
            return `${months} ماهه`;
    }
}
function updateFinalPrice(cycle) {
    const base = Number(cycle.base_price_rial) || 0;
    const disc = Number(cycle.discount_percent) || 0;
    const discAmount = Math.floor((base * disc) / 100);
    cycle.final_price_rial = Math.max(0, base - discAmount);
    emit('update:cycles', [...props.cycles]);
}
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
    ...{ class: "w-full flex flex-col gap-3 font-sans select-none text-right" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "text-xs font-extrabold text-primary-80 flex items-center gap-1.5" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:tag-price-bold-duotone",
    ...{ class: "w-4 h-4 text-primary-100" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:tag-price-bold-duotone",
    ...{ class: "w-4 h-4 text-primary-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs text-primary-40" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full bg-white-100 rounded-2xl border border-primary-6 flex flex-col overflow-hidden shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full h-10 bg-primary-1/40 border-b border-primary-6 flex items-center px-4 text-2xs font-extrabold text-primary-60 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-1/40']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-28" },
});
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 min-w-[140px]" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[140px]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-28 text-center" },
});
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-44 text-left" },
});
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
for (const [cycle] of __VLS_vFor((__VLS_ctx.cycles))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (cycle.months_count),
        ...{ class: "w-full h-14 border-b border-primary-6 flex items-center px-4 hover:bg-primary-1/20 transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-14']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-1/20']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-28 text-xs font-bold text-primary-100 flex items-center gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        icon: "solar:calendar-date-bold-duotone",
        ...{ class: "w-4 h-4 text-primary-40" },
    }));
    const __VLS_7 = __VLS_6({
        icon: "solar:calendar-date-bold-duotone",
        ...{ class: "w-4 h-4 text-primary-40" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    (__VLS_ctx.getCycleName(cycle.months_count));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 min-w-[140px] pl-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[140px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
    const __VLS_10 = BaseInput;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        ...{ 'onInput': {} },
        modelValue: (cycle.base_price_rial),
        type: "number",
        placeholder: "مثلاً 10,000,000",
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_12 = __VLS_11({
        ...{ 'onInput': {} },
        modelValue: (cycle.base_price_rial),
        type: "number",
        placeholder: "مثلاً 10,000,000",
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    let __VLS_15;
    const __VLS_16 = {
        /** @type {typeof __VLS_15.input} */
        onInput: (...[$event]) => {
            return (__VLS_ctx.updateFinalPrice(cycle));
            // @ts-ignore
            [cycles, getCycleName, updateFinalPrice,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    var __VLS_13;
    var __VLS_14;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-28 px-2 flex justify-center" },
    });
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    const __VLS_17 = BaseInput;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        ...{ 'onInput': {} },
        modelValue: (cycle.discount_percent),
        type: "number",
        placeholder: "0",
        ...{ class: "font-mono text-center text-xs" },
        max: (100),
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onInput': {} },
        modelValue: (cycle.discount_percent),
        type: "number",
        placeholder: "0",
        ...{ class: "font-mono text-center text-xs" },
        max: (100),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_22;
    const __VLS_23 = {
        /** @type {typeof __VLS_22.input} */
        onInput: (...[$event]) => {
            return (__VLS_ctx.updateFinalPrice(cycle));
            // @ts-ignore
            [updateFinalPrice,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    var __VLS_20;
    var __VLS_21;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-44 flex flex-col items-end justify-center font-mono" },
    });
    /** @type {__VLS_StyleScopedClasses['w-44']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-extrabold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    ((cycle.final_price_rial || 0).toLocaleString('fa-IR'));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs font-sans text-primary-40" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
