import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
const props = defineProps();
const __VLS_emit = defineEmits();
const canManageStaff = computed(() => props.currentRole === 'SUPER_ADMIN');
function getRoleDisplay(role) {
    switch (role) {
        case 'SUPER_ADMIN':
            return 'راهبر ارشد سیستم';
        case 'SUPPORT_AGENT':
            return 'کارشناس پشتیبانی';
        case 'SALES_MANAGER':
            return 'مدیر فروش و افیلیت';
        default:
            return role;
    }
}
function getRoleBadgeType(role) {
    switch (role) {
        case 'SUPER_ADMIN':
            return 'primary';
        case 'SUPPORT_AGENT':
            return 'secondary';
        case 'SALES_MANAGER':
            return 'warning';
        default:
            return 'info';
    }
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
    icon: "solar:users-group-rounded-bold-duotone",
    ...{ class: "w-4.5 h-4.5 shrink-0" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:users-group-rounded-bold-duotone",
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
if (__VLS_ctx.canManageStaff) {
    const __VLS_5 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        ...{ 'onClick': {} },
        size: "sm",
        type: "primary",
        styleType: "fill",
        startIcon: "solar:user-plus-bold-duotone",
        ...{ class: "!rounded-full text-xs font-semibold" },
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onClick': {} },
        size: "sm",
        type: "primary",
        styleType: "fill",
        startIcon: "solar:user-plus-bold-duotone",
        ...{ class: "!rounded-full text-xs font-semibold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_10;
    const __VLS_11 = {
        /** @type {typeof __VLS_10.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.canManageStaff))
                throw 0;
            return (__VLS_ctx.$emit('createStaff'));
            // @ts-ignore
            [canManageStaff, $emit,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['!rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    const { default: __VLS_12 } = __VLS_8.slots;
    // @ts-ignore
    [];
    var __VLS_8;
    var __VLS_9;
}
const __VLS_13 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    text: "به‌روزرسانی",
}));
const __VLS_15 = __VLS_14({
    text: "به‌روزرسانی",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
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
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    icon: "solar:restart-bold",
    ...{ class: "w-4 h-4" },
    ...{ class: (__VLS_ctx.loading ? 'animate-spin' : '') },
}));
const __VLS_21 = __VLS_20({
    icon: "solar:restart-bold",
    ...{ class: "w-4 h-4" },
    ...{ class: (__VLS_ctx.loading ? 'animate-spin' : '') },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
// @ts-ignore
[loading,];
var __VLS_16;
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
    const __VLS_24 = CardLoadingOverlay;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
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
    ...{ class: "w-44 pr-3 flex items-center justify-center text-center" },
});
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-28 pr-3 flex items-center justify-center text-center" },
});
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-36 pl-3 pr-3 flex items-center justify-end text-left shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-3']} */ ;
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
if (!__VLS_ctx.loading && __VLS_ctx.staffList.length === 0) {
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
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        icon: "solar:user-block-linear",
        ...{ class: "w-6 h-6" },
    }));
    const __VLS_31 = __VLS_30({
        icon: "solar:user-block-linear",
        ...{ class: "w-6 h-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
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
    for (const [staff, idx] of __VLS_vFor((__VLS_ctx.staffList))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (staff.id),
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
            ...{ class: "flex-1 min-w-[180px] pr-3 flex items-center gap-2 overflow-hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-[180px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-7 h-7 rounded-full bg-secondary-6 text-secondary-100 flex items-center justify-center shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-secondary-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        let __VLS_34;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
            icon: "solar:user-bold",
            ...{ class: "w-4 h-4" },
        }));
        const __VLS_36 = __VLS_35({
            icon: "solar:user-bold",
            ...{ class: "w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col gap-0.5 min-w-0 flex-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs sm:text-sm font-extrabold font-dots-1 text-primary-100 group-hover:text-secondary-100 transition-colors truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:text-secondary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (staff.first_name || staff.last_name ? `${staff.first_name || ''} ${staff.last_name || ''}` : staff.username);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-2xs font-mono text-primary-60 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (staff.username);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-40 pr-3 flex items-center justify-start text-xs font-mono font-bold text-primary-80" },
        });
        /** @type {__VLS_StyleScopedClasses['w-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        (__VLS_ctx.toPersianNumber(staff.mobile));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-44 pr-3 flex items-center justify-center" },
        });
        /** @type {__VLS_StyleScopedClasses['w-44']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        const __VLS_39 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
            type: (__VLS_ctx.getRoleBadgeType(staff.role)),
            size: "2xs",
            styleType: "soft",
        }));
        const __VLS_41 = __VLS_40({
            type: (__VLS_ctx.getRoleBadgeType(staff.role)),
            size: "2xs",
            styleType: "soft",
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        const { default: __VLS_44 } = __VLS_42.slots;
        (__VLS_ctx.getRoleDisplay(staff.role));
        // @ts-ignore
        [loading, loading, staffList, staffList, toPersianNumber, toPersianNumber, getRoleBadgeType, getRoleDisplay,];
        var __VLS_42;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-28 pr-3 flex items-center justify-center" },
        });
        /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        const __VLS_45 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
            type: (staff.is_active ? 'success' : 'error'),
            size: "2xs",
            styleType: "soft",
        }));
        const __VLS_47 = __VLS_46({
            type: (staff.is_active ? 'success' : 'error'),
            size: "2xs",
            styleType: "soft",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        const { default: __VLS_50 } = __VLS_48.slots;
        (staff.is_active ? 'فعال' : 'مسدود');
        // @ts-ignore
        [];
        var __VLS_48;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-36 pl-3 pr-3 flex items-center justify-end text-xs font-mono text-primary-60" },
        });
        /** @type {__VLS_StyleScopedClasses['w-36']} */ ;
        /** @type {__VLS_StyleScopedClasses['pl-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
        (staff.date_joined ? new Date(staff.date_joined).toLocaleDateString('fa-IR') : '—');
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
