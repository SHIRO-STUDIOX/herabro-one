import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const selectedLog = ref(null);
function openDetails(log) {
    selectedLog.value = log;
}
function formatDateTime(timestamp) {
    try {
        const d = new Date(timestamp);
        return `${d.toLocaleDateString('fa-IR')} ${d.toLocaleTimeString('fa-IR')}`;
    }
    catch {
        return timestamp;
    }
}
function getActionBadgeType(action) {
    if (action.includes('IMPERSONATE'))
        return 'warning';
    if (action.includes('PAYOUT'))
        return 'secondary';
    if (action.includes('SUSPEND'))
        return 'error';
    if (action.includes('ACTIVATE'))
        return 'secondary';
    if (action.includes('OVERRIDE'))
        return 'primary';
    return 'info';
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
    ...{ class: "h-14 px-4 sm:px-5 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-8 h-8 rounded-lg bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-secondary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-secondary-12']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:history-bold-duotone",
    ...{ class: "w-4.5 h-4.5 shrink-0" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:history-bold-duotone",
    ...{ class: "w-4.5 h-4.5 shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-xs sm:text-sm font-extrabold text-primary-100" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
const __VLS_5 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    text: "به‌روزرسانی لاگ‌ها",
}));
const __VLS_7 = __VLS_6({
    text: "به‌روزرسانی لاگ‌ها",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.$emit('refresh'));
            // @ts-ignore
            [$emit,];
        } },
    type: "button",
    ...{ class: "w-9 h-9 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none text-primary-100" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    icon: "solar:restart-bold",
    ...{ class: "w-4 h-4" },
    ...{ class: (__VLS_ctx.loading ? 'animate-spin' : '') },
}));
const __VLS_13 = __VLS_12({
    icon: "solar:restart-bold",
    ...{ class: "w-4 h-4" },
    ...{ class: (__VLS_ctx.loading ? 'animate-spin' : '') },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
// @ts-ignore
[loading,];
var __VLS_8;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full bg-white-100 rounded-2xl overflow-hidden border border-primary-6 flex flex-col relative transition-all duration-200 shadow-xs" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xs']} */ ;
if (__VLS_ctx.loading) {
    const __VLS_16 = CardLoadingOverlay;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({}));
    const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full h-12 bg-white-100 border-b border-primary-6 flex items-center shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-10 self-stretch bg-primary-1/60 border-l border-primary-6 flex items-center justify-center shrink-0 text-xs font-bold text-primary-60 font-dots-1 select-none" },
});
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['self-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-1/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-48 pr-3 flex items-center justify-start text-right" },
});
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-40 pr-3 flex items-center justify-start text-right" },
});
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-48 pr-3 flex items-center justify-start text-right" },
});
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 min-w-[180px] pr-3 flex items-center justify-start text-right" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[180px]']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-36 pr-3 flex items-center justify-start text-right" },
});
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-24 pl-2 pr-3 flex items-center justify-end text-left shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-left" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
if (!__VLS_ctx.loading && __VLS_ctx.logs.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80" },
    });
    /** @type {__VLS_StyleScopedClasses['w-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        icon: "solar:shield-check-linear",
        ...{ class: "w-6 h-6" },
    }));
    const __VLS_23 = __VLS_22({
        icon: "solar:shield-check-linear",
        ...{ class: "w-6 h-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-bold font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col divide-y divide-primary-6 overflow-x-auto" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['divide-y']} */ ;
    /** @type {__VLS_StyleScopedClasses['divide-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    for (const [log, idx] of __VLS_vFor((__VLS_ctx.logs))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (log.id),
            ...{ class: "w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-14']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary-1/60']} */ ;
        /** @type {__VLS_StyleScopedClasses['group']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-10 self-stretch bg-primary-1/50 border-l border-primary-6 flex items-center justify-center shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['self-stretch']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-1/50']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-l']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs font-bold text-primary-60 font-dots-1 select-none" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
        (__VLS_ctx.toPersianNumber(idx + 1));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-48 pr-3 flex items-center justify-start text-xs font-mono text-primary-80" },
        });
        /** @type {__VLS_StyleScopedClasses['w-48']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        (__VLS_ctx.formatDateTime(log.timestamp));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-40 pr-3 flex flex-col justify-center" },
        });
        /** @type {__VLS_StyleScopedClasses['w-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs font-bold font-dots-1 text-primary-100 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (log.staff_username || 'سیستم / ادمین');
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-2xs font-mono text-primary-40" },
        });
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        (log.staff_role || 'SUPER_ADMIN');
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-48 pr-3 flex items-center" },
        });
        /** @type {__VLS_StyleScopedClasses['w-48']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        const __VLS_26 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
            type: (__VLS_ctx.getActionBadgeType(log.action_type)),
            size: "2xs",
            styleType: "soft",
        }));
        const __VLS_28 = __VLS_27({
            type: (__VLS_ctx.getActionBadgeType(log.action_type)),
            size: "2xs",
            styleType: "soft",
        }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        const { default: __VLS_31 } = __VLS_29.slots;
        (log.action_type);
        // @ts-ignore
        [loading, loading, logs, logs, toPersianNumber, formatDateTime, getActionBadgeType,];
        var __VLS_29;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex-1 min-w-[180px] pr-3 text-xs font-mono text-primary-80 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-[180px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (log.target_object);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-36 pr-3 text-xs font-mono font-medium text-primary-60" },
        });
        /** @type {__VLS_StyleScopedClasses['w-36']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
        (log.ip_address);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-24 pl-2 pr-3 flex items-center justify-end shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-24']} */ ;
        /** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        const __VLS_32 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
            text: "مشاهده متادیتا و جزئیات",
        }));
        const __VLS_34 = __VLS_33({
            text: "مشاهده متادیتا و جزئیات",
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        const { default: __VLS_37 } = __VLS_35.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.loading && __VLS_ctx.logs.length === 0))
                        throw 0;
                    return (__VLS_ctx.openDetails(log));
                    // @ts-ignore
                    [openDetails,];
                } },
            type: "button",
            ...{ class: "w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-primary-12 active:scale-90 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs" },
        });
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
        let __VLS_38;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
            icon: "solar:eye-bold",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_40 = __VLS_39({
            icon: "solar:eye-bold",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        // @ts-ignore
        [];
        var __VLS_35;
        // @ts-ignore
        [];
    }
}
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    to: "body",
}));
const __VLS_45 = __VLS_44({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_46.slots;
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    name: "fade",
}));
const __VLS_51 = __VLS_50({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const { default: __VLS_54 } = __VLS_52.slots;
if (__VLS_ctx.selectedLog) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedLog))
                    throw 0;
                return (__VLS_ctx.selectedLog = null);
                // @ts-ignore
                [selectedLog, selectedLog,];
            } },
        ...{ class: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/50 backdrop-blur-sm overflow-y-auto" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black-32/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "w-full max-w-[540px] my-auto bg-white-60 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 text-right select-none font-sans relative transition-all duration-300" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[540px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['my-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between w-full h-10 gap-6" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3 flex-1 min-w-0 h-10" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-10 h-10 min-w-10 min-h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-secondary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-secondary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_55;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
        icon: "solar:document-text-bold-duotone",
        ...{ class: "w-5 h-5 shrink-0" },
    }));
    const __VLS_57 = __VLS_56({
        icon: "solar:document-text-bold-duotone",
        ...{ class: "w-5 h-5 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-start justify-center min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    (__VLS_ctx.selectedLog.id);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
    (__VLS_ctx.selectedLog.action_type);
    const __VLS_60 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
        text: "بستن",
    }));
    const __VLS_62 = __VLS_61({
        text: "بستن",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    const { default: __VLS_65 } = __VLS_63.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedLog))
                    throw 0;
                return (__VLS_ctx.selectedLog = null);
                // @ts-ignore
                [selectedLog, selectedLog, selectedLog,];
            } },
        type: "button",
        ...{ class: "w-6 h-6 min-w-[24px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none" },
    });
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    let __VLS_66;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        icon: "solar:close-circle-linear",
        ...{ class: "w-3.5 h-3.5" },
    }));
    const __VLS_68 = __VLS_67({
        icon: "solar:close-circle-linear",
        ...{ class: "w-3.5 h-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    // @ts-ignore
    [];
    var __VLS_63;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full bg-white-80 rounded-xl p-3 flex flex-col gap-2.5" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-xs font-dots-1 border-b border-primary-6 pb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-bold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.selectedLog.target_object);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-xs font-dots-1 border-b border-primary-6 pb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono text-primary-80" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    (__VLS_ctx.selectedLog.ip_address);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-bold text-primary-80 font-dots-1 mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
        ...{ class: "w-full p-3 bg-white-100 border border-primary-6 rounded-xl text-2xs font-mono text-primary-100 overflow-x-auto max-h-48" },
        dir: "ltr",
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-48']} */ ;
    (JSON.stringify(__VLS_ctx.selectedLog.details, null, 2));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-end gap-2 w-full pt-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-0.5']} */ ;
    const __VLS_71 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "outline",
        size: "md",
        ...{ class: "!w-[84px] text-xs font-semibold shrink-0" },
    }));
    const __VLS_73 = __VLS_72({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "outline",
        size: "md",
        ...{ class: "!w-[84px] text-xs font-semibold shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    let __VLS_76;
    const __VLS_77 = {
        /** @type {typeof __VLS_76.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.selectedLog))
                throw 0;
            return (__VLS_ctx.selectedLog = null);
            // @ts-ignore
            [selectedLog, selectedLog, selectedLog, selectedLog,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['!w-[84px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const { default: __VLS_78 } = __VLS_74.slots;
    // @ts-ignore
    [];
    var __VLS_74;
    var __VLS_75;
}
// @ts-ignore
[];
var __VLS_52;
// @ts-ignore
[];
var __VLS_46;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
