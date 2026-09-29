import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
const props = defineProps();
const __VLS_emit = defineEmits();
const searchQuery = ref('');
const accountTypeFilter = ref('ALL');
const statusFilter = ref('');
const statusOptions = [
    { value: '', label: 'همه وضعیت‌ها' },
    { value: 'active', label: 'فعال' },
    { value: 'trial', label: 'آزمایشی' },
    { value: 'expired', label: 'منقضی‌شده' },
    { value: 'suspended', label: 'تعلیق‌شده' },
];
const canOperate = computed(() => {
    return props.currentRole === 'SUPER_ADMIN' || props.currentRole === 'SUPPORT_AGENT';
});
const filteredTenants = computed(() => {
    return props.tenants.filter((t) => {
        // Search query
        const q = searchQuery.value.trim().toLowerCase();
        const matchesQuery = !q ||
            t.title.toLowerCase().includes(q) ||
            t.slug.toLowerCase().includes(q) ||
            t.owner_mobile.includes(q);
        // Account Type
        const matchesAccountType = accountTypeFilter.value === 'ALL' || t.account_type === accountTypeFilter.value;
        // Status
        let matchesStatus = true;
        if (statusFilter.value === 'suspended') {
            matchesStatus = t.is_suspended;
        }
        else if (statusFilter.value) {
            matchesStatus = t.subscription_status === statusFilter.value && !t.is_suspended;
        }
        return matchesQuery && matchesAccountType && matchesStatus;
    });
});
function getStatusLabel(status, isSuspended) {
    if (isSuspended)
        return 'تعلیق‌شده';
    switch (status) {
        case 'active':
            return 'فعال';
        case 'trial':
            return 'آزمایشی';
        case 'expired':
            return 'منقضی‌شده';
        default:
            return status;
    }
}
function getStatusBadgeType(status, isSuspended) {
    if (isSuspended)
        return 'error';
    switch (status) {
        case 'active':
            return 'success';
        case 'trial':
            return 'secondary';
        case 'expired':
            return 'warning';
        default:
            return 'secondary';
    }
}
function getUsageTextColor(used, limit) {
    if (!limit)
        return 'text-success-100 font-bold';
    const ratio = used / limit;
    if (ratio >= 0.9)
        return 'text-error-100 font-bold';
    if (ratio >= 0.7)
        return 'text-warning-100 font-bold';
    return 'text-primary-80';
}
function getUsageBarColor(used, limit) {
    if (!limit)
        return 'bg-success-100';
    const ratio = used / limit;
    if (ratio >= 0.9)
        return 'bg-error-100';
    if (ratio >= 0.7)
        return 'bg-warning-100';
    return 'bg-secondary-100';
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
    ...{ class: "w-full bg-white-80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-primary-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full md:w-80" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-80']} */ ;
const __VLS_0 = BaseInput;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.searchQuery),
    placeholder: "جستجو در عنوان، شناسه، موبایل...",
    showStartIcon: true,
    startIcon: "solar:magnifer-linear",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.searchQuery),
    placeholder: "جستجو در عنوان، شناسه، موبایل...",
    showStartIcon: true,
    startIcon: "solar:magnifer-linear",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center bg-white-100 p-1 rounded-full border border-primary-8 text-xs font-bold font-dots-1 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.accountTypeFilter = 'ALL');
            // @ts-ignore
            [searchQuery, accountTypeFilter,];
        } },
    type: "button",
    ...{ class: "px-3 py-1 rounded-full transition-all cursor-pointer outline-none" },
    ...{ class: (__VLS_ctx.accountTypeFilter === 'ALL' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100') },
});
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.accountTypeFilter = 'BUSINESS');
            // @ts-ignore
            [accountTypeFilter, accountTypeFilter,];
        } },
    type: "button",
    ...{ class: "px-3 py-1 rounded-full transition-all cursor-pointer outline-none" },
    ...{ class: (__VLS_ctx.accountTypeFilter === 'BUSINESS' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100') },
});
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.accountTypeFilter = 'PERSONAL');
            // @ts-ignore
            [accountTypeFilter, accountTypeFilter,];
        } },
    type: "button",
    ...{ class: "px-3 py-1 rounded-full transition-all cursor-pointer outline-none" },
    ...{ class: (__VLS_ctx.accountTypeFilter === 'PERSONAL' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100') },
});
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-36" },
});
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
const __VLS_5 = BaseSelect;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.statusFilter),
    options: (__VLS_ctx.statusOptions),
    placeholder: "وضعیت اشتراک",
    size: "sm",
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.statusFilter),
    options: (__VLS_ctx.statusOptions),
    placeholder: "وضعیت اشتراک",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    text: "به‌روزرسانی جدول",
}));
const __VLS_12 = __VLS_11({
    text: "به‌روزرسانی جدول",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_15 } = __VLS_13.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.$emit('refresh'));
            // @ts-ignore
            [accountTypeFilter, statusFilter, statusOptions, $emit,];
        } },
    type: "button",
    ...{ class: "w-10 h-10 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none group text-primary-100" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
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
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    icon: "solar:restart-bold",
    ...{ class: "w-4 h-4 transition-transform duration-500" },
    ...{ class: (__VLS_ctx.loading ? 'animate-spin' : 'group-hover:rotate-180') },
}));
const __VLS_18 = __VLS_17({
    icon: "solar:restart-bold",
    ...{ class: "w-4 h-4 transition-transform duration-500" },
    ...{ class: (__VLS_ctx.loading ? 'animate-spin' : 'group-hover:rotate-180') },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
// @ts-ignore
[loading,];
var __VLS_13;
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
    const __VLS_21 = CardLoadingOverlay;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
    const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
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
    ...{ class: "flex-1 min-w-[200px] pr-3 flex items-center justify-start text-right" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[200px]']} */ ;
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
    ...{ class: "w-32 pr-3 flex items-center justify-center text-center" },
});
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
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
    ...{ class: "w-[140px] pl-2 pr-3 flex items-center justify-end text-left shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-[140px]']} */ ;
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
if (!__VLS_ctx.loading && __VLS_ctx.filteredTenants.length === 0) {
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
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        icon: "solar:folder-with-files-bold-duotone",
        ...{ class: "w-6 h-6" },
    }));
    const __VLS_28 = __VLS_27({
        icon: "solar:folder-with-files-bold-duotone",
        ...{ class: "w-6 h-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-bold font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-2xs text-primary-40 font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
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
    for (const [tenant, idx] of __VLS_vFor((__VLS_ctx.filteredTenants))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.loading && __VLS_ctx.filteredTenants.length === 0))
                        throw 0;
                    return (__VLS_ctx.$emit('select', tenant));
                    // @ts-ignore
                    [$emit, loading, loading, filteredTenants, filteredTenants,];
                } },
            key: (tenant.id),
            ...{ class: "w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none cursor-pointer" },
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
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
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
            ...{ class: "flex-1 min-w-[200px] pr-3 flex items-center gap-2 overflow-hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-[200px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
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
        (tenant.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-2xs font-mono text-primary-60 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (tenant.slug);
        (tenant.current_plan_slug || 'free');
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-36 pr-3 flex items-center justify-start text-xs font-mono font-bold text-primary-80" },
        });
        /** @type {__VLS_StyleScopedClasses['w-36']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        (__VLS_ctx.toPersianNumber(tenant.owner_mobile));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-28 pr-3 flex items-center justify-center" },
        });
        /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        const __VLS_31 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            type: (tenant.account_type === 'BUSINESS' ? 'primary' : 'secondary'),
            size: "2xs",
            styleType: "soft",
        }));
        const __VLS_33 = __VLS_32({
            type: (tenant.account_type === 'BUSINESS' ? 'primary' : 'secondary'),
            size: "2xs",
            styleType: "soft",
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        const { default: __VLS_36 } = __VLS_34.slots;
        (tenant.account_type === 'BUSINESS' ? 'کسب‌وکار' : 'شخصی');
        // @ts-ignore
        [toPersianNumber, toPersianNumber,];
        var __VLS_34;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-32 pr-3 flex items-center justify-center" },
        });
        /** @type {__VLS_StyleScopedClasses['w-32']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        const __VLS_37 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
            type: (__VLS_ctx.getStatusBadgeType(tenant.subscription_status, tenant.is_suspended)),
            size: "2xs",
            styleType: "soft",
        }));
        const __VLS_39 = __VLS_38({
            type: (__VLS_ctx.getStatusBadgeType(tenant.subscription_status, tenant.is_suspended)),
            size: "2xs",
            styleType: "soft",
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        const { default: __VLS_42 } = __VLS_40.slots;
        (__VLS_ctx.getStatusLabel(tenant.subscription_status, tenant.is_suspended));
        // @ts-ignore
        [getStatusBadgeType, getStatusLabel,];
        var __VLS_40;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-44 pr-3 flex flex-col justify-center gap-1 font-dots-1" },
        });
        /** @type {__VLS_StyleScopedClasses['w-44']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-between text-2xs font-mono" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (__VLS_ctx.getUsageTextColor(tenant.used_invoices_count, tenant.max_invoices_limit)) },
        });
        (__VLS_ctx.toPersianNumber(tenant.used_invoices_count));
        (tenant.max_invoices_limit ? __VLS_ctx.toPersianNumber(tenant.max_invoices_limit) : 'نامحدود');
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-primary-40" },
        });
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        (__VLS_ctx.toPersianNumber(Math.round((tenant.used_invoices_count / (tenant.max_invoices_limit || 1)) * 100)));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-full h-1.5 bg-primary-6 rounded-full overflow-hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-full rounded-full transition-all duration-300" },
            ...{ class: (__VLS_ctx.getUsageBarColor(tenant.used_invoices_count, tenant.max_invoices_limit)) },
            ...{ style: ({ width: `${Math.min(100, (tenant.used_invoices_count / (tenant.max_invoices_limit || 1)) * 100)}%` }) },
        });
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: () => { } },
            ...{ class: "w-[140px] pl-2 pr-3 flex items-center justify-end gap-1.5 shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-[140px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        if (__VLS_ctx.canOperate) {
            const __VLS_43 = BaseTooltip || BaseTooltip;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
                text: "ورود نظارتی به حساب (Impersonate)",
            }));
            const __VLS_45 = __VLS_44({
                text: "ورود نظارتی به حساب (Impersonate)",
            }, ...__VLS_functionalComponentArgsRest(__VLS_44));
            const { default: __VLS_48 } = __VLS_46.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.loading && __VLS_ctx.filteredTenants.length === 0))
                            throw 0;
                        if (!(__VLS_ctx.canOperate))
                            throw 0;
                        return (__VLS_ctx.$emit('impersonate', tenant));
                        // @ts-ignore
                        [$emit, toPersianNumber, toPersianNumber, toPersianNumber, getUsageTextColor, getUsageBarColor, canOperate,];
                    } },
                type: "button",
                ...{ class: "w-6 h-6 min-w-[24px] rounded-full bg-secondary-8 hover:bg-secondary-12 active:scale-90 text-secondary-100 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs" },
            });
            /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-secondary-8']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-secondary-12']} */ ;
            /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
            let __VLS_49;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
                icon: "solar:login-2-bold-duotone",
                ...{ class: "w-3.5 h-3.5" },
            }));
            const __VLS_51 = __VLS_50({
                icon: "solar:login-2-bold-duotone",
                ...{ class: "w-3.5 h-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_50));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            // @ts-ignore
            [];
            var __VLS_46;
        }
        if (__VLS_ctx.canOperate) {
            const __VLS_54 = BaseTooltip || BaseTooltip;
            // @ts-ignore
            const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
                text: "تغییر دستی پلن",
            }));
            const __VLS_56 = __VLS_55({
                text: "تغییر دستی پلن",
            }, ...__VLS_functionalComponentArgsRest(__VLS_55));
            const { default: __VLS_59 } = __VLS_57.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.loading && __VLS_ctx.filteredTenants.length === 0))
                            throw 0;
                        if (!(__VLS_ctx.canOperate))
                            throw 0;
                        return (__VLS_ctx.$emit('overridePlan', tenant));
                        // @ts-ignore
                        [$emit, canOperate,];
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
            let __VLS_60;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
                icon: "solar:pen-bold-duotone",
                ...{ class: "w-3.5 h-3.5" },
            }));
            const __VLS_62 = __VLS_61({
                icon: "solar:pen-bold-duotone",
                ...{ class: "w-3.5 h-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            // @ts-ignore
            [];
            var __VLS_57;
        }
        if (__VLS_ctx.canOperate) {
            const __VLS_65 = BaseTooltip || BaseTooltip;
            // @ts-ignore
            const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
                text: (tenant.is_suspended ? 'فعال‌سازی مجدد حساب' : 'تعلیق حساب مستأجر'),
            }));
            const __VLS_67 = __VLS_66({
                text: (tenant.is_suspended ? 'فعال‌سازی مجدد حساب' : 'تعلیق حساب مستأجر'),
            }, ...__VLS_functionalComponentArgsRest(__VLS_66));
            const { default: __VLS_70 } = __VLS_68.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.loading && __VLS_ctx.filteredTenants.length === 0))
                            throw 0;
                        if (!(__VLS_ctx.canOperate))
                            throw 0;
                        return (__VLS_ctx.$emit('toggleSuspend', tenant));
                        // @ts-ignore
                        [$emit, canOperate,];
                    } },
                type: "button",
                ...{ class: "w-6 h-6 min-w-[24px] rounded-full active:scale-90 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs" },
                ...{ class: (tenant.is_suspended ? 'bg-success-8 hover:bg-success-12 text-success-100' : 'bg-warning-8 hover:bg-warning-12 text-warning-100') },
            });
            /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
            let __VLS_71;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
                icon: (tenant.is_suspended ? 'solar:play-circle-bold-duotone' : 'solar:pause-circle-bold-duotone'),
                ...{ class: "w-3.5 h-3.5" },
            }));
            const __VLS_73 = __VLS_72({
                icon: (tenant.is_suspended ? 'solar:play-circle-bold-duotone' : 'solar:pause-circle-bold-duotone'),
                ...{ class: "w-3.5 h-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_72));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            // @ts-ignore
            [];
            var __VLS_68;
        }
        const __VLS_76 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
            text: "مشاهده جزئیات مستأجر",
        }));
        const __VLS_78 = __VLS_77({
            text: "مشاهده جزئیات مستأجر",
        }, ...__VLS_functionalComponentArgsRest(__VLS_77));
        const { default: __VLS_81 } = __VLS_79.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.loading && __VLS_ctx.filteredTenants.length === 0))
                        throw 0;
                    return (__VLS_ctx.$emit('select', tenant));
                    // @ts-ignore
                    [$emit,];
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
        let __VLS_82;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
            icon: "solar:eye-bold",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_84 = __VLS_83({
            icon: "solar:eye-bold",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_83));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        // @ts-ignore
        [];
        var __VLS_79;
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
