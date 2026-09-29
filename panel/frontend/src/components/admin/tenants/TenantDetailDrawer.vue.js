import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const __VLS_props = defineProps();
const emit = defineEmits();
function handleClose() {
    emit('update:modelValue', false);
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "fade",
}));
const __VLS_8 = __VLS_7({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.modelValue && __VLS_ctx.tenant) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.handleClose) },
        ...{ class: "fixed inset-0 z-50 bg-black-32/50 backdrop-blur-sm flex justify-start" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black-32/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "transform translate-x-full",
        enterToClass: "transform translate-x-0",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "transform translate-x-0",
        leaveToClass: "transform translate-x-full",
    }));
    const __VLS_14 = __VLS_13({
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "transform translate-x-full",
        enterToClass: "transform translate-x-0",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "transform translate-x-0",
        leaveToClass: "transform translate-x-full",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "w-full max-w-md h-full bg-surface-100 border-l border-primary-8 shadow-2xl flex flex-col font-sans select-none text-right overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-surface-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-l']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-16 px-5 border-b border-primary-6 flex items-center justify-between shrink-0 bg-white-80 backdrop-blur-md" },
    });
    /** @type {__VLS_StyleScopedClasses['h-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-10 h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-secondary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-secondary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        icon: "solar:shop-2-bold-duotone",
        ...{ class: "w-5 h-5 text-secondary-100" },
    }));
    const __VLS_20 = __VLS_19({
        icon: "solar:shop-2-bold-duotone",
        ...{ class: "w-5 h-5 text-secondary-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm font-extrabold text-primary-100 font-dots-1 leading-5 truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (__VLS_ctx.tenant.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs font-mono text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    (__VLS_ctx.tenant.slug);
    const __VLS_23 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        text: "بستن",
    }));
    const __VLS_25 = __VLS_24({
        text: "بستن",
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    const { default: __VLS_28 } = __VLS_26.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleClose) },
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
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        icon: "solar:close-circle-linear",
        ...{ class: "w-3.5 h-3.5" },
    }));
    const __VLS_31 = __VLS_30({
        icon: "solar:close-circle-linear",
        ...{ class: "w-3.5 h-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    // @ts-ignore
    [modelValue, tenant, tenant, tenant, handleClose, handleClose,];
    var __VLS_26;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 p-4 overflow-y-auto flex flex-col gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3.5 rounded-xl bg-white-100 border border-primary-6 flex flex-col gap-2.5 shadow-2xs" },
    });
    /** @type {__VLS_StyleScopedClasses['p-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-xs font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-semibold text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    const __VLS_34 = BaseBadge || BaseBadge;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        type: (__VLS_ctx.tenant.is_suspended ? 'error' : __VLS_ctx.tenant.subscription_status === 'ACTIVE' ? 'success' : 'warning'),
        size: "2xs",
        styleType: "soft",
    }));
    const __VLS_36 = __VLS_35({
        type: (__VLS_ctx.tenant.is_suspended ? 'error' : __VLS_ctx.tenant.subscription_status === 'ACTIVE' ? 'success' : 'warning'),
        size: "2xs",
        styleType: "soft",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    const { default: __VLS_39 } = __VLS_37.slots;
    (__VLS_ctx.tenant.is_suspended ? 'تعلیق شده' : __VLS_ctx.tenant.subscription_status_display || __VLS_ctx.tenant.subscription_status);
    // @ts-ignore
    [tenant, tenant, tenant, tenant, tenant,];
    var __VLS_37;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-xs font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-semibold text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-bold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.tenant.current_plan_slug || 'free');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-xs font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-semibold text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono text-primary-80" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    (__VLS_ctx.tenant.created_at ? new Date(__VLS_ctx.tenant.created_at).toLocaleDateString('fa-IR') : '—');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-xs font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-semibold text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-bold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.tenant.subscription_expires_at ? new Date(__VLS_ctx.tenant.subscription_expires_at).toLocaleDateString('fa-IR') : 'نامحدود');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3.5 rounded-xl bg-white-100 border border-primary-6 flex flex-col gap-2.5 shadow-2xs font-dots-1 text-xs" },
    });
    /** @type {__VLS_StyleScopedClasses['p-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-bold text-primary-80 border-b border-primary-6 pb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
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
    (__VLS_ctx.tenant.owner_mobile);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono text-primary-80" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    (__VLS_ctx.tenant.id);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono text-primary-80" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    (new Date(__VLS_ctx.tenant.created_at).toLocaleDateString('fa-IR'));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3.5 rounded-xl bg-white-100 border border-primary-6 flex flex-col gap-3 shadow-2xs font-dots-1 text-xs" },
    });
    /** @type {__VLS_StyleScopedClasses['p-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-bold text-primary-80 border-b border-primary-6 pb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-2xs font-mono" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-bold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.tenant.used_invoices_count);
    (__VLS_ctx.tenant.max_invoices_limit || 'نامحدود');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full h-2 bg-primary-6 rounded-full overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-full rounded-full transition-all duration-300" },
        ...{ class: (__VLS_ctx.tenant.max_invoices_limit && __VLS_ctx.tenant.used_invoices_count >= __VLS_ctx.tenant.max_invoices_limit ? 'bg-error-100' : 'bg-secondary-100') },
        ...{ style: ({ width: `${Math.min(100, (__VLS_ctx.tenant.used_invoices_count / (__VLS_ctx.tenant.max_invoices_limit || 1)) * 100)}%` }) },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-4 border-t border-primary-6 bg-white-80 backdrop-blur-md flex items-center justify-end gap-2 shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const __VLS_40 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        size: "md",
        type: "primary",
        styleType: "outline",
        startIcon: "solar:pen-bold-duotone",
        ...{ class: "flex-1 text-xs font-semibold" },
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        size: "md",
        type: "primary",
        styleType: "outline",
        startIcon: "solar:pen-bold-duotone",
        ...{ class: "flex-1 text-xs font-semibold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_45;
    const __VLS_46 = {
        /** @type {typeof __VLS_45.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.modelValue && __VLS_ctx.tenant))
                throw 0;
            __VLS_ctx.$emit('overridePlan', __VLS_ctx.tenant);
            __VLS_ctx.handleClose();
            // @ts-ignore
            [tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, tenant, handleClose, $emit,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    const { default: __VLS_47 } = __VLS_43.slots;
    // @ts-ignore
    [];
    var __VLS_43;
    var __VLS_44;
    const __VLS_48 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        size: "md",
        type: "primary",
        styleType: "fill",
        startIcon: "solar:login-2-bold-duotone",
        ...{ class: "flex-1 text-xs font-semibold" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        size: "md",
        type: "primary",
        styleType: "fill",
        startIcon: "solar:login-2-bold-duotone",
        ...{ class: "flex-1 text-xs font-semibold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_53;
    const __VLS_54 = {
        /** @type {typeof __VLS_53.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.modelValue && __VLS_ctx.tenant))
                throw 0;
            __VLS_ctx.$emit('impersonate', __VLS_ctx.tenant);
            __VLS_ctx.handleClose();
            // @ts-ignore
            [tenant, handleClose, $emit,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    const { default: __VLS_55 } = __VLS_51.slots;
    // @ts-ignore
    [];
    var __VLS_51;
    var __VLS_52;
    // @ts-ignore
    [];
    var __VLS_15;
}
// @ts-ignore
[];
var __VLS_9;
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
