import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
const props = withDefaults(defineProps(), {
    variant: 'auto',
    label: 'سند جدید',
    icon: 'solar:document-add-linear',
    hoverIcon: 'solar:document-add-bold-duotone',
    isSoon: false,
    soonLabel: 'به زودی',
    disabled: false,
});
const emit = defineEmits();
const isHovered = ref(false);
const effectiveVariant = computed(() => {
    if (props.isSoon || props.variant === 'soon')
        return 'soon';
    if (props.variant === 'hover')
        return 'hover';
    if (props.variant === 'main')
        return 'main';
    return 'auto';
});
const nodeId = computed(() => {
    if (effectiveVariant.value === 'hover')
        return '474:85326';
    if (effectiveVariant.value === 'soon')
        return '474:85327';
    return '474:85328';
});
const handleClick = (e) => {
    if (props.disabled || effectiveVariant.value === 'soon')
        return;
    emit('click', e);
};
const __VLS_defaults = {
    variant: 'auto',
    label: 'سند جدید',
    icon: 'solar:document-add-linear',
    hoverIcon: 'solar:document-add-bold-duotone',
    isSoon: false,
    soonLabel: 'به زودی',
    disabled: false,
};
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
    ...{ class: "relative inline-flex shrink-0 font-sans select-none" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onMouseenter: (...[$event]) => {
            return (__VLS_ctx.isHovered = true);
            // @ts-ignore
            [handleClick, isHovered,];
        } },
    ...{ onMouseleave: (...[$event]) => {
            return (__VLS_ctx.isHovered = false);
            // @ts-ignore
            [isHovered,];
        } },
    type: "button",
    disabled: (__VLS_ctx.disabled || __VLS_ctx.isSoon),
    ...{ class: "h-9 min-w-[111px] px-4 py-2 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 outline-none select-none relative z-10 group" },
    ...{ class: ([
            // Background Gradient
            'bg-gradient-to-b from-white/24 to-white/80 backdrop-blur-sm shadow-2xs',
            // Variant Styles
            __VLS_ctx.effectiveVariant === 'hover'
                ? 'border-2 border-dashed border-primary-24 font-extrabold active:scale-95'
                : __VLS_ctx.effectiveVariant === 'soon'
                    ? 'border border-white-100 font-semibold opacity-90 cursor-default'
                    : 'border border-white-100 font-semibold hover:border-2 hover:border-dashed hover:border-primary-24 hover:font-extrabold active:scale-95',
            __VLS_ctx.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        ]) },
    'data-node-id': (__VLS_ctx.nodeId),
    'data-name': (__VLS_ctx.effectiveVariant === 'hover'
        ? 'Fast-butt-hover'
        : __VLS_ctx.effectiveVariant === 'soon'
            ? 'Fast-butt-soon'
            : 'Fast-butt-main'),
});
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[111px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white/24']} */ ;
/** @type {__VLS_StyleScopedClasses['to-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-primary-80 font-dots-1 leading-4 whitespace-nowrap transition-all duration-150" },
    ...{ class: ([
            __VLS_ctx.effectiveVariant === 'hover' || __VLS_ctx.isHovered
                ? 'font-extrabold text-primary-100'
                : 'font-semibold',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
var __VLS_0 = {};
(__VLS_ctx.label);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-5 h-5 flex items-center justify-center shrink-0 text-primary-80 transition-transform duration-150" },
    ...{ class: (__VLS_ctx.effectiveVariant === 'hover' || __VLS_ctx.isHovered ? 'text-primary-100 scale-105' : '') },
});
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
var __VLS_2 = {};
let __VLS_4;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent1(__VLS_4, new __VLS_4({
    icon: (__VLS_ctx.effectiveVariant === 'hover' || __VLS_ctx.isHovered ? __VLS_ctx.hoverIcon || __VLS_ctx.icon : __VLS_ctx.icon),
    ...{ class: "w-5 h-5" },
}));
const __VLS_6 = __VLS_5({
    icon: (__VLS_ctx.effectiveVariant === 'hover' || __VLS_ctx.isHovered ? __VLS_ctx.hoverIcon || __VLS_ctx.icon : __VLS_ctx.icon),
    ...{ class: "w-5 h-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
if (__VLS_ctx.effectiveVariant === 'soon') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute -top-2.5 left-1.5 z-20 pointer-events-none" },
        'data-node-id': "474:85279",
        'data-name': "Badge Component",
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['-top-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    const __VLS_9 = BaseBadge || BaseBadge;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        type: "warning",
        size: "2xs",
        styleType: "soft",
        ...{ class: "!h-4 !min-w-[24px] !px-1 shadow-2xs font-semibold text-[10px] backdrop-blur-md" },
    }));
    const __VLS_11 = __VLS_10({
        type: "warning",
        size: "2xs",
        styleType: "soft",
        ...{ class: "!h-4 !min-w-[24px] !px-1 shadow-2xs font-semibold text-[10px] backdrop-blur-md" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    /** @type {__VLS_StyleScopedClasses['!h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['!min-w-[24px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['!px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    const { default: __VLS_14 } = __VLS_12.slots;
    (__VLS_ctx.soonLabel);
    // @ts-ignore
    [isHovered, isHovered, isHovered, disabled, disabled, isSoon, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, nodeId, label, hoverIcon, icon, icon, soonLabel,];
    var __VLS_12;
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
