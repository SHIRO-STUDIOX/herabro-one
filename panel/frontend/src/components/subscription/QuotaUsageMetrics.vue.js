import { computed } from 'vue';
import QuotaProgressBar from '@/components/subscription/QuotaProgressBar.vue';
const props = withDefaults(defineProps(), {
    quotas: () => ({
        usedInvoices: 0,
        maxInvoices: 20,
        usedWarehouses: 0,
        maxWarehouses: 1,
        usedUsers: 1,
        maxUsers: 1,
    }),
});
const quotas = computed(() => props.quotas);
const __VLS_defaults = {
    quotas: () => ({
        usedInvoices: 0,
        maxInvoices: 20,
        usedWarehouses: 0,
        maxWarehouses: 1,
        usedUsers: 1,
        maxUsers: 1,
    }),
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full bg-white-80 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-3 font-sans select-none" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold text-primary-100 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
const __VLS_0 = QuotaProgressBar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    label: "فاکتورهای صادرشده",
    icon: "solar:document-text-bold-duotone",
    used: (__VLS_ctx.quotas.usedInvoices),
    max: (__VLS_ctx.quotas.maxInvoices),
}));
const __VLS_2 = __VLS_1({
    label: "فاکتورهای صادرشده",
    icon: "solar:document-text-bold-duotone",
    used: (__VLS_ctx.quotas.usedInvoices),
    max: (__VLS_ctx.quotas.maxInvoices),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = QuotaProgressBar;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    label: "انبارهای فعال",
    icon: "solar:box-minimalistic-bold-duotone",
    used: (__VLS_ctx.quotas.usedWarehouses),
    max: (__VLS_ctx.quotas.maxWarehouses),
}));
const __VLS_7 = __VLS_6({
    label: "انبارهای فعال",
    icon: "solar:box-minimalistic-bold-duotone",
    used: (__VLS_ctx.quotas.usedWarehouses),
    max: (__VLS_ctx.quotas.maxWarehouses),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = QuotaProgressBar;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    label: "کاربران فعال",
    icon: "solar:users-group-two-rounded-bold-duotone",
    used: (__VLS_ctx.quotas.usedUsers),
    max: (__VLS_ctx.quotas.maxUsers),
}));
const __VLS_12 = __VLS_11({
    label: "کاربران فعال",
    icon: "solar:users-group-two-rounded-bold-duotone",
    used: (__VLS_ctx.quotas.usedUsers),
    max: (__VLS_ctx.quotas.maxUsers),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[quotas, quotas, quotas, quotas, quotas, quotas,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
