import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { toPersianNumber } from '@/utils/formatters';
const props = withDefaults(defineProps(), { label: '', icon: 'solar:chart-bold-duotone', used: 0, max: 100 });
const percent = computed(() => {
    if (props.max === 'UNLIMITED')
        return 0;
    if (!props.max || props.max <= 0)
        return 0;
    return Math.min(100, Math.round((props.used / props.max) * 100));
});
const isUnlimited = computed(() => props.max === 'UNLIMITED');
const usedDisplay = computed(() => toPersianNumber(props.used));
const maxDisplay = computed(() => isUnlimited.value ? 'نامحدود' : toPersianNumber(props.max));
/** Brand → warning (≥70%) → error (≥100%). */
const barTone = computed(() => {
    if (isUnlimited.value)
        return 'bg-secondary-100';
    if (percent.value >= 100)
        return 'bg-error-100';
    if (percent.value >= 70)
        return 'bg-warning-100';
    return 'bg-secondary-100';
});
const valueTone = computed(() => {
    if (!isUnlimited.value && percent.value >= 100)
        return 'text-error-100';
    if (!isUnlimited.value && percent.value >= 70)
        return 'text-warning-100';
    return 'text-primary-100';
});
const __VLS_defaults = { label: '', icon: 'solar:chart-bold-duotone', used: 0, max: 100 };
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
    ...{ class: "flex flex-col gap-1.5 w-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between w-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-semibold text-primary-80 font-dots-1 flex items-center gap-1.5" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.icon),
    ...{ class: "w-4 h-4 text-primary-60 shrink-0" },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.icon),
    ...{ class: "w-4 h-4 text-primary-60 shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
(__VLS_ctx.label);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-mono font-bold" },
    ...{ class: (__VLS_ctx.valueTone) },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
(__VLS_ctx.usedDisplay);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-primary-40 font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
(__VLS_ctx.maxDisplay);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full h-2 rounded-full bg-primary-6 overflow-hidden" },
    role: "progressbar",
    'aria-valuenow': (__VLS_ctx.percent),
    'aria-valuemin': "0",
    'aria-valuemax': "100",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "h-full rounded-full transition-all duration-300" },
    ...{ class: (__VLS_ctx.barTone) },
    ...{ style: ({ width: `${__VLS_ctx.percent}%` }) },
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
// @ts-ignore
[icon, label, valueTone, usedDisplay, maxDisplay, percent, percent, barTone,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
