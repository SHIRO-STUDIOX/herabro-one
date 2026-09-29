import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import SubscriptionBadge from '@/components/subscription/SubscriptionBadge.vue';
import { toPersianNumber } from '@/utils/formatters';
import { CYCLE_LABELS, PLAN_LABELS, } from '@/types/subscription';
const props = withDefaults(defineProps(), { subscription: undefined });
const __VLS_emit = defineEmits();
const subscription = computed(() => props.subscription);
const planTitle = computed(() => PLAN_LABELS[subscription.value.planKey]);
const cycleLabel = computed(() => CYCLE_LABELS[subscription.value.cycle]);
const daysLeft = computed(() => Math.max(0, subscription.value.daysRemaining));
const __VLS_defaults = { subscription: undefined };
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
    ...{ class: "w-full bg-white-80 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2.5 font-sans select-none" },
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
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:medal-ribbon-bold-duotone",
    ...{ class: "w-5 h-5" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:medal-ribbon-bold-duotone",
    ...{ class: "w-5 h-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-start justify-center min-w-0" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
(__VLS_ctx.planTitle);
const __VLS_5 = SubscriptionBadge;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    status: (__VLS_ctx.subscription.status),
}));
const __VLS_7 = __VLS_6({
    status: (__VLS_ctx.subscription.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
(__VLS_ctx.cycleLabel);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full bg-white-100 border border-primary-8 rounded-xl p-3 flex items-center justify-between gap-2" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col gap-0.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-medium text-primary-60 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xl font-black font-mono text-primary-100" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
(__VLS_ctx.toPersianNumber(__VLS_ctx.daysLeft));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-end gap-1 text-2xs font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-primary-60" },
});
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-mono font-bold text-primary-80" },
});
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
(__VLS_ctx.subscription.startDate);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-primary-60" },
});
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-mono font-bold text-primary-80" },
});
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
(__VLS_ctx.subscription.endDate);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-end gap-2 w-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
const __VLS_10 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    ...{ 'onClick': {} },
    type: "primary",
    styleType: "outline",
    size: "md",
    ...{ class: "!w-[130px] text-xs font-semibold shrink-0" },
    showEndIcon: (true),
    endIcon: "solar:restart-bold-duotone",
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClick': {} },
    type: "primary",
    styleType: "outline",
    size: "md",
    ...{ class: "!w-[130px] text-xs font-semibold shrink-0" },
    showEndIcon: (true),
    endIcon: "solar:restart-bold-duotone",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_15;
const __VLS_16 = {
    /** @type {typeof __VLS_15.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.$emit('renew'));
        // @ts-ignore
        [planTitle, subscription, subscription, subscription, cycleLabel, toPersianNumber, daysLeft, $emit,];
    },
};
/** @type {__VLS_StyleScopedClasses['!w-[130px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
const { default: __VLS_17 } = __VLS_13.slots;
// @ts-ignore
[];
var __VLS_13;
var __VLS_14;
const __VLS_18 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ 'onClick': {} },
    type: "secondary",
    styleType: "fill",
    size: "md",
    ...{ class: "!w-[150px] text-xs font-semibold shrink-0" },
    showEndIcon: (true),
    endIcon: "solar:arrow-up-bold-duotone",
}));
const __VLS_20 = __VLS_19({
    ...{ 'onClick': {} },
    type: "secondary",
    styleType: "fill",
    size: "md",
    ...{ class: "!w-[150px] text-xs font-semibold shrink-0" },
    showEndIcon: (true),
    endIcon: "solar:arrow-up-bold-duotone",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = {
    /** @type {typeof __VLS_23.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.$emit('upgrade'));
        // @ts-ignore
        [$emit,];
    },
};
/** @type {__VLS_StyleScopedClasses['!w-[150px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
const { default: __VLS_25 } = __VLS_21.slots;
// @ts-ignore
[];
var __VLS_21;
var __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
