import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useLayoutStore } from '@/stores/layout';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import UserProfileDropdown from '@/components/layout/UserProfileDropdown.vue';
const props = defineProps();
const __VLS_emit = defineEmits();
const layoutStore = useLayoutStore();
const roleDisplay = computed(() => {
    switch (props.currentRole) {
        case 'SUPER_ADMIN':
            return 'راهبر ارشد';
        case 'SUPPORT_AGENT':
            return 'کارشناس پشتیبانی';
        case 'SALES_MANAGER':
            return 'مدیر فروش و افیلیت';
        default:
            return 'کاربر مدیر';
    }
});
const roleBadgeType = computed(() => {
    switch (props.currentRole) {
        case 'SUPER_ADMIN':
            return 'primary';
        case 'SUPPORT_AGENT':
            return 'secondary';
        case 'SALES_MANAGER':
            return 'warning';
        default:
            return 'info';
    }
});
const roleIcon = computed(() => {
    switch (props.currentRole) {
        case 'SUPER_ADMIN':
            return 'solar:shield-check-bold';
        case 'SUPPORT_AGENT':
            return 'solar:headphones-round-bold';
        case 'SALES_MANAGER':
            return 'solar:chart-square-bold';
        default:
            return 'solar:user-bold';
    }
});
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
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "w-full h-17 py-3 px-3 lg:px-4 flex items-center justify-between select-none font-sans relative z-20 shrink-0" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-17']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const __VLS_0 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    text: (__VLS_ctx.layoutStore.isSidebarCollapsed ? 'باز کردن منو' : 'جمع کردن منو'),
}));
const __VLS_2 = __VLS_1({
    text: (__VLS_ctx.layoutStore.isSidebarCollapsed ? 'باز کردن منو' : 'جمع کردن منو'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.layoutStore.toggleSidebar());
            // @ts-ignore
            [layoutStore, layoutStore,];
        } },
    type: "button",
    ...{ class: "w-11 h-11 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group outline-none" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-11']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    icon: "solar:hamburger-menu-bold-duotone",
    ...{ class: "w-5 h-5 text-primary-100 opacity-70 group-hover:opacity-100 transition-all" },
}));
const __VLS_8 = __VLS_7({
    icon: "solar:hamburger-menu-bold-duotone",
    ...{ class: "w-5 h-5 text-primary-100 opacity-70 group-hover:opacity-100 transition-all" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col text-right" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm sm:text-base font-black text-primary-100 font-dots-1 leading-5" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-mono font-bold px-2 py-0.5 rounded-full bg-primary-6 text-primary-100 border border-primary-12" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs text-primary-60 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2.5 sm:gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white-100 shadow-2xs text-2xs font-medium" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "w-2 h-2 rounded-full bg-success-100 animate-pulse" },
});
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-success-100']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-primary-80 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-mono font-bold text-success-100" },
});
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-success-100']} */ ;
const __VLS_11 = BaseBadge || BaseBadge;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    type: (__VLS_ctx.roleBadgeType),
    styleType: "soft",
    size: "sm",
    showStartIcon: true,
    startIcon: (__VLS_ctx.roleIcon),
}));
const __VLS_13 = __VLS_12({
    type: (__VLS_ctx.roleBadgeType),
    styleType: "soft",
    size: "sm",
    showStartIcon: true,
    startIcon: (__VLS_ctx.roleIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
(__VLS_ctx.roleDisplay);
// @ts-ignore
[roleBadgeType, roleIcon, roleDisplay,];
var __VLS_14;
const __VLS_17 = UserProfileDropdown;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ...{ 'onLogout': {} },
    userName: (__VLS_ctx.admin?.username || 'مدیر سیستم'),
    phoneNumber: (__VLS_ctx.admin?.mobile || '09120000000'),
}));
const __VLS_19 = __VLS_18({
    ...{ 'onLogout': {} },
    userName: (__VLS_ctx.admin?.username || 'مدیر سیستم'),
    phoneNumber: (__VLS_ctx.admin?.mobile || '09120000000'),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
const __VLS_23 = {
    /** @type {typeof __VLS_22.logout} */
    onLogout: (...[$event]) => {
        return (__VLS_ctx.$emit('logout'));
        // @ts-ignore
        [admin, admin, $emit,];
    },
};
var __VLS_20;
var __VLS_21;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
