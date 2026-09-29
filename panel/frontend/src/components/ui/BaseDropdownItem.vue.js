import { computed } from 'vue';
import { Icon } from '@iconify/vue';
const props = withDefaults(defineProps(), {
    size: 'sm',
    type: 'primary',
    state: '',
    label: 'برچسب',
    secondaryLabel: '',
    startIcon: '',
    endIcon: '',
    showStartIcon: true,
    showEndIcon: false,
    showSecondaryLabel: false,
    keyboardShortcut: '',
    showKeyboardShortcut: false,
    showSwitchButton: false,
    switchValue: false,
    centered: false,
    disabled: false,
    selected: false,
});
const emit = defineEmits();
// Computed disabled check
const computedDisabled = computed(() => {
    if (props.state === 'disabled')
        return true;
    if (props.state === 'enabled' || props.state === 'selected' || props.state === 'hovered')
        return false;
    return props.disabled;
});
// Effective state
const effectiveState = computed(() => {
    if (props.state)
        return props.state;
    if (computedDisabled.value)
        return 'disabled';
    if (props.selected)
        return 'selected';
    return 'enabled';
});
// KBD Keys array
const kbdKeys = computed(() => {
    if (Array.isArray(props.keyboardShortcut))
        return props.keyboardShortcut;
    if (typeof props.keyboardShortcut === 'string' && props.keyboardShortcut) {
        return props.keyboardShortcut.split('+').map((k) => k.trim());
    }
    return [];
});
// Size container classes (xs: 20px, sm: 28px, md: 32px matching Figma Node 21:33974)
const sizeClasses = computed(() => {
    if (props.size === 'xs') {
        return 'h-5 h-[20px] min-h-[20px] max-h-[20px] px-2 gap-1 rounded-lg text-xs';
    }
    if (props.size === 'md') {
        return 'h-8 h-[32px] min-h-[32px] max-h-[32px] px-2 gap-1.5 rounded-md text-xs sm:text-sm';
    }
    // sm size (28px height)
    return 'h-7 h-[28px] min-h-[28px] max-h-[28px] px-2.5 gap-1.5 rounded-lg text-xs sm:text-sm';
});
// Icon sizing
const iconSizeClasses = computed(() => {
    return props.size === 'xs' ? 'w-3 h-3' : 'w-4 h-4';
});
// Font sizing and weight
const labelFontClasses = computed(() => {
    const isBold = effectiveState.value === 'selected' || effectiveState.value === 'hovered';
    const weightClass = isBold ? 'font-bold' : 'font-semibold';
    return props.size === 'xs'
        ? `text-2xs leading-4 ${weightClass}`
        : `text-xs sm:text-sm leading-4.5 ${weightClass}`;
});
// State & Type classes matching Figma Node 3:17561
const stateClasses = computed(() => {
    const st = effectiveState.value;
    const tp = props.type;
    if (st === 'disabled') {
        return 'opacity-32 text-black-32 bg-transparent cursor-not-allowed';
    }
    // Type: Error (#dc2626)
    if (tp === 'error') {
        if (st === 'selected') {
            return 'bg-error-12 text-error-100 border border-error-12 font-bold';
        }
        if (st === 'hovered') {
            return 'bg-error-6 text-error-100 font-bold';
        }
        return 'text-error-100 bg-transparent hover:bg-error-6';
    }
    // Type: Secondary (#6750a4)
    if (tp === 'secondary') {
        if (st === 'selected') {
            return 'bg-secondary-12 text-secondary-100 border border-secondary-12 font-bold';
        }
        if (st === 'hovered') {
            return 'bg-secondary-6 text-secondary-100 font-bold';
        }
        return 'text-secondary-100 bg-transparent hover:bg-secondary-6';
    }
    // Type: Primary (Default Hesabro Token)
    if (st === 'selected') {
        return 'bg-primary-8 text-primary-100 font-bold';
    }
    if (st === 'hovered') {
        return 'bg-primary-6 text-primary-100 font-bold';
    }
    return 'text-primary-100 bg-transparent hover:bg-primary-6';
});
const handleClick = (e) => {
    if (computedDisabled.value)
        return;
    if (props.showSwitchButton) {
        emit('update:switchValue', !props.switchValue);
    }
    emit('click', e);
};
const handleSwitchToggle = () => {
    if (computedDisabled.value)
        return;
    emit('update:switchValue', !props.switchValue);
};
const __VLS_defaults = {
    size: 'sm',
    type: 'primary',
    state: '',
    label: 'برچسب',
    secondaryLabel: '',
    startIcon: '',
    endIcon: '',
    showStartIcon: true,
    showEndIcon: false,
    showSecondaryLabel: false,
    keyboardShortcut: '',
    showKeyboardShortcut: false,
    showSwitchButton: false,
    switchValue: false,
    centered: false,
    disabled: false,
    selected: false,
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
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ class: "flex items-center transition-all duration-150 select-none font-sans text-right" },
    ...{ class: ([
            __VLS_ctx.sizeClasses,
            __VLS_ctx.stateClasses,
            __VLS_ctx.centered ? 'justify-center text-center' : 'justify-between text-right',
            __VLS_ctx.computedDisabled
                ? 'cursor-not-allowed pointer-events-none opacity-32 text-black-32 bg-transparent'
                : 'cursor-pointer active:scale-[0.995]',
        ]) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5 truncate min-w-0" },
    ...{ class: (__VLS_ctx.centered ? 'justify-center w-full' : 'flex-1') },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
if (__VLS_ctx.showStartIcon && (__VLS_ctx.startIcon || __VLS_ctx.$slots.startIcon)) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        icon: (__VLS_ctx.startIcon || 'solar:user-circle-bold-duotone'),
        ...{ class: "shrink-0 transition-opacity" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }));
    const __VLS_2 = __VLS_1({
        icon: (__VLS_ctx.startIcon || 'solar:user-circle-bold-duotone'),
        ...{ class: "shrink-0 transition-opacity" },
        ...{ class: (__VLS_ctx.iconSizeClasses) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
}
var __VLS_5 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "truncate font-dots-1" },
    ...{ class: (__VLS_ctx.labelFontClasses) },
});
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
var __VLS_7 = {};
(__VLS_ctx.label);
if (!__VLS_ctx.centered &&
    (__VLS_ctx.showSecondaryLabel ||
        __VLS_ctx.secondaryLabel ||
        __VLS_ctx.showKeyboardShortcut ||
        __VLS_ctx.keyboardShortcut ||
        __VLS_ctx.showSwitchButton ||
        __VLS_ctx.showEndIcon ||
        __VLS_ctx.endIcon ||
        __VLS_ctx.$slots.endIcon)) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1.5 shrink-0 mr-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    if (__VLS_ctx.showSecondaryLabel || __VLS_ctx.secondaryLabel) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-2xs font-medium opacity-60 font-dots-1 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (__VLS_ctx.secondaryLabel);
    }
    if (__VLS_ctx.showKeyboardShortcut || __VLS_ctx.keyboardShortcut) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-1 dir-ltr" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['dir-ltr']} */ ;
        for (const [key, idx] of __VLS_vFor((__VLS_ctx.kbdKeys))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                key: (idx),
                ...{ class: "h-6 min-w-[24px] px-1.5 rounded-md text-xs font-bold font-mono bg-primary-6 border border-primary-8 text-primary-40 shadow-2xs flex items-center justify-center leading-none" },
            });
            /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['border']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
            /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
            (key);
            // @ts-ignore
            [handleClick, sizeClasses, stateClasses, centered, centered, centered, computedDisabled, showStartIcon, startIcon, startIcon, $slots, $slots, iconSizeClasses, labelFontClasses, label, showSecondaryLabel, showSecondaryLabel, secondaryLabel, secondaryLabel, secondaryLabel, showKeyboardShortcut, showKeyboardShortcut, keyboardShortcut, keyboardShortcut, showSwitchButton, showEndIcon, endIcon, kbdKeys,];
        }
    }
    if (__VLS_ctx.showSwitchButton) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.handleSwitchToggle) },
            ...{ class: "w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer flex items-center" },
            ...{ class: (__VLS_ctx.switchValue ? 'bg-primary-100 justify-end' : 'bg-primary-12 justify-start') },
        });
        /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-3 h-3 rounded-full bg-white-100 shadow-xs" },
        });
        /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-xs']} */ ;
    }
    if ((__VLS_ctx.showEndIcon || __VLS_ctx.endIcon) && !__VLS_ctx.$slots.endIcon) {
        let __VLS_9;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
            icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-left-linear'),
            ...{ class: "w-3 h-3 opacity-60 shrink-0" },
        }));
        const __VLS_11 = __VLS_10({
            icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-left-linear'),
            ...{ class: "w-3 h-3 opacity-60 shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    }
    var __VLS_14 = {};
}
// @ts-ignore
var __VLS_6 = __VLS_5, __VLS_8 = __VLS_7, __VLS_15 = __VLS_14;
// @ts-ignore
[$slots, showSwitchButton, showEndIcon, endIcon, endIcon, handleSwitchToggle, switchValue,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
