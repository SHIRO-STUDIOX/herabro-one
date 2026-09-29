import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BadgeDropdownPicker from '@/components/ui/BadgeDropdownPicker.vue';
import BadgeScrollStrip from '@/components/ui/BadgeScrollStrip.vue';
import { semanticColors, } from '@/types/badge';
const props = withDefaults(defineProps(), {
    modelValue: () => [],
    badges: () => [],
    label: '',
    placeholder: 'الصاق برچسب...',
    hint: '',
    error: '',
    required: false,
    disabled: false,
    allowCreate: true,
    removable: false,
    getUsageCount: () => 0,
});
const emit = defineEmits();
const dropdownPickerRef = ref(null);
const selectedBadgeList = computed(() => {
    return props.badges.filter((b) => props.modelValue.includes(b.id));
});
const getColorOption = (key) => {
    return semanticColors.find((c) => c.key === key) ?? semanticColors[0];
};
const getBadgeClasses = (colorKey) => {
    const opt = getColorOption(colorKey);
    return `!h-6 !px-2.5 text-xs font-bold font-dots-1 leading-none ${opt.outlineClass}`;
};
const handleUpdateValue = (val) => {
    emit('update:modelValue', val);
};
const handleChange = (val) => {
    emit('change', val);
};
const handleCreateBadge = (badge) => {
    emit('create-badge', badge);
};
const removeBadge = (badgeId) => {
    const updated = props.modelValue.filter((id) => id !== badgeId);
    emit('update:modelValue', updated);
    emit('change', updated);
};
const clearAll = () => {
    emit('update:modelValue', []);
    emit('change', []);
};
const openPicker = () => {
    dropdownPickerRef.value?.openDropdown?.();
};
const __VLS_exposed = {
    openPicker,
};
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    modelValue: () => [],
    badges: () => [],
    label: '',
    placeholder: 'الصاق برچسب...',
    hint: '',
    error: '',
    required: false,
    disabled: false,
    allowCreate: true,
    removable: false,
    getUsageCount: () => 0,
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
    ...{ class: "flex flex-col w-full text-right font-sans select-none" },
    ...{ class: ({ 'opacity-60 pointer-events-none': __VLS_ctx.disabled }) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
if (__VLS_ctx.label || __VLS_ctx.$slots.label || __VLS_ctx.hint || __VLS_ctx.$slots.hint) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mb-1.5 w-full select-none" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "text-xs sm:text-sm font-semibold text-primary-80 font-dots-1 flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    var __VLS_0 = {};
    (__VLS_ctx.label);
    if (__VLS_ctx.required) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-error-100 font-bold leading-none select-none" },
        });
        /** @type {__VLS_StyleScopedClasses['text-error-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    }
    if (__VLS_ctx.hint || __VLS_ctx.$slots.hint) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-2xs text-primary-40 font-dots-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        var __VLS_2 = {};
        (__VLS_ctx.hint);
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative flex items-center gap-2 w-full h-10 min-h-[40px] px-2 rounded-xl bg-primary-6/60 hover:bg-primary-6/80 border border-dashed transition-all duration-200 overflow-hidden" },
    ...{ class: ([
            __VLS_ctx.error
                ? 'border-error-100 bg-error-6/20'
                : 'border-primary-16 hover:border-primary-24 focus-within:border-primary-60 focus-within:ring-1 focus-within:ring-primary-12',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6/60']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-6/80']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
const __VLS_4 = BadgeDropdownPicker;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent1(__VLS_4, new __VLS_4({
    ...{ 'onUpdate:modelValue': {} },
    ...{ 'onChange': {} },
    ...{ 'onCreateBadge': {} },
    ref: "dropdownPickerRef",
    modelValue: (__VLS_ctx.modelValue),
    badges: (__VLS_ctx.badges),
    title: (__VLS_ctx.label || 'الصاق برچسب'),
    allowCreate: (__VLS_ctx.allowCreate),
    getUsageCount: (__VLS_ctx.getUsageCount),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onUpdate:modelValue': {} },
    ...{ 'onChange': {} },
    ...{ 'onCreateBadge': {} },
    ref: "dropdownPickerRef",
    modelValue: (__VLS_ctx.modelValue),
    badges: (__VLS_ctx.badges),
    title: (__VLS_ctx.label || 'الصاق برچسب'),
    allowCreate: (__VLS_ctx.allowCreate),
    getUsageCount: (__VLS_ctx.getUsageCount),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_9;
const __VLS_10 = {
    /** @type {typeof __VLS_9.'update:modelValue'} */
    'onUpdate:modelValue': (__VLS_ctx.handleUpdateValue),
};
const __VLS_11 = {
    /** @type {typeof __VLS_9.change} */
    onChange: (__VLS_ctx.handleChange),
};
const __VLS_12 = {
    /** @type {typeof __VLS_9.createBadge} */
    onCreateBadge: (__VLS_ctx.handleCreateBadge),
};
var __VLS_13;
var __VLS_7;
var __VLS_8;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 min-w-0 flex items-center" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
if (__VLS_ctx.selectedBadgeList.length > 0) {
    const __VLS_15 = BadgeScrollStrip || BadgeScrollStrip;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        ...{ class: "w-full" },
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    const { default: __VLS_20 } = __VLS_18.slots;
    for (const [badge] of __VLS_vFor((__VLS_ctx.selectedBadgeList))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (badge.id),
            ...{ class: "inline-flex items-center gap-1 group/item shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['group/item']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        const __VLS_21 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
            type: (__VLS_ctx.getColorOption(badge.color).badgeType),
            styleType: "soft",
            size: "sm",
            borderStyle: "dashed",
            ...{ class: (__VLS_ctx.getBadgeClasses(badge.color)) },
        }));
        const __VLS_23 = __VLS_22({
            type: (__VLS_ctx.getColorOption(badge.color).badgeType),
            styleType: "soft",
            size: "sm",
            borderStyle: "dashed",
            ...{ class: (__VLS_ctx.getBadgeClasses(badge.color)) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        const { default: __VLS_26 } = __VLS_24.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (badge.title);
        // @ts-ignore
        [disabled, label, label, label, $slots, $slots, $slots, hint, hint, hint, required, error, modelValue, badges, allowCreate, getUsageCount, handleUpdateValue, handleChange, handleCreateBadge, selectedBadgeList, selectedBadgeList, getColorOption, getBadgeClasses,];
        var __VLS_24;
        if (!__VLS_ctx.disabled && __VLS_ctx.removable) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.selectedBadgeList.length > 0))
                            throw 0;
                        if (!(!__VLS_ctx.disabled && __VLS_ctx.removable))
                            throw 0;
                        return (__VLS_ctx.removeBadge(badge.id));
                        // @ts-ignore
                        [disabled, removable, removeBadge,];
                    } },
                type: "button",
                ...{ class: "w-4 h-4 rounded-full -ms-2 me-0.5 bg-primary-12 hover:bg-error-80 text-primary-80 hover:text-white-100 flex items-center justify-center transition-all cursor-pointer outline-none active:scale-95" },
                title: ('حذف ' + badge.title),
                'aria-label': ('حذف برچسب ' + badge.title),
            });
            /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['-ms-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['me-0.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-primary-12']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-error-80']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-white-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-2.5 h-2.5" },
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2.5",
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
            });
            /** @type {__VLS_StyleScopedClasses['w-2.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-2.5']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                d: "M18 6 6 18",
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                d: "m6 6 12 12",
            });
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_18;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (__VLS_ctx.openPicker) },
        ...{ class: "text-xs text-primary-40 font-dots-1 cursor-pointer hover:text-primary-60 transition-colors select-none truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (__VLS_ctx.placeholder);
}
if (__VLS_ctx.selectedBadgeList.length > 1 && !__VLS_ctx.disabled && __VLS_ctx.removable) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.clearAll) },
        type: "button",
        ...{ class: "shrink-0 w-5 h-5 rounded-full hover:bg-primary-12 active:scale-95 text-primary-40 hover:text-error-100 flex items-center justify-center transition-all cursor-pointer outline-none" },
        title: "حذف همه برچسب‌ها",
        'aria-label': "حذف همه برچسب‌ها",
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-error-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3 h-3" },
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M18 6 6 18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "m6 6 12 12",
    });
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs text-error-80 font-medium font-dots-1 mt-1 flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-error-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        icon: "solar:danger-circle-bold",
        ...{ class: "w-3.5 h-3.5 shrink-0" },
    }));
    const __VLS_29 = __VLS_28({
        icon: "solar:danger-circle-bold",
        ...{ class: "w-3.5 h-3.5 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.error);
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_14 = __VLS_13;
// @ts-ignore
[disabled, error, error, selectedBadgeList, removable, openPicker, placeholder, clearAll,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => __VLS_exposed,
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
