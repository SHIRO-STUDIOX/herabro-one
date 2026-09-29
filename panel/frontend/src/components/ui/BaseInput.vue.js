import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
const props = withDefaults(defineProps(), {
    modelValue: '',
    type: 'text',
    size: '2xl',
    title: '',
    titleState: 'in',
    required: false,
    rounded: false,
    disabled: false,
    error: '',
    showError: true,
    hint: '',
    showHint: true,
    showStartIcon: false,
    showEndIcon: false,
    startIcon: '',
    endIcon: '',
    linkLabel: '',
    placeholder: '',
    id: '',
});
const emit = defineEmits();
const __VLS_slots = defineSlots();
// Internal state tracking
const isFocused = ref(false);
const inputRef = ref(null);
// ID generation for accessibility
const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;
// Has value check
const hasValue = computed(() => {
    return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '';
});
// Floating trigger check
const isFloating = computed(() => {
    return isFocused.value || hasValue.value;
});
// Computed placeholder logic
const computedPlaceholder = computed(() => {
    if (props.titleState === 'in') {
        // Show placeholder only when floating (focused/filled) to avoid collision
        return isFloating.value ? props.placeholder : '';
    }
    return props.placeholder;
});
// Sizing Content classes
const sizeContentClasses = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'h-10 min-h-[40px]';
        case '3xl':
            return 'h-14 min-h-[56px]';
        case '2xl':
        default:
            return 'h-12 min-h-[48px]';
    }
});
// Input Padding top/bottom logic when label is floating inside
const inputPaddingClasses = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'pt-3.5 pb-0.5';
        case '3xl':
            return 'pt-5 pb-1.5';
        case '2xl':
        default:
            return 'pt-4.5 pb-1';
    }
});
// Label positions (Centered vs Floating)
const centeredLabelPositionClasses = computed(() => {
    return 'top-1/2 -translate-y-1/2 text-sm';
});
const floatingLabelPositionClasses = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'top-1 translate-y-0 text-[10px] scale-90';
        case '3xl':
            return 'top-2 translate-y-0 text-[10px] scale-90';
        case '2xl':
        default:
            return 'top-1.5 translate-y-0 text-[10px] scale-90';
    }
});
// Border and Background classes matching design system
const borderClasses = computed(() => {
    if (props.disabled) {
        return 'bg-black-6 border-transparent';
    }
    if (props.error) {
        return 'bg-white-100 border-error-100 ring-2 ring-error-8/10';
    }
    if (isFocused.value) {
        return 'bg-white-100 border-primary-100 ring-4 ring-primary-6';
    }
    return 'bg-white-100 border-primary-12 hover:border-primary-32';
});
// Event handlers
const handleInput = (event) => {
    const target = event.target;
    emit('update:modelValue', target.value);
    emit('input', event);
};
const handleFocus = (event) => {
    isFocused.value = true;
    emit('focus', event);
};
const handleBlur = (event) => {
    isFocused.value = false;
    emit('blur', event);
};
const __VLS_exposed = {
    inputRef,
};
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    modelValue: '',
    type: 'text',
    size: '2xl',
    title: '',
    titleState: 'in',
    required: false,
    rounded: false,
    disabled: false,
    error: '',
    showError: true,
    hint: '',
    showHint: true,
    showStartIcon: false,
    showEndIcon: false,
    startIcon: '',
    endIcon: '',
    linkLabel: '',
    placeholder: '',
    id: '',
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
/** @type {__VLS_StyleScopedClasses['tel-input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col w-full" },
    ...{ class: ([__VLS_ctx.disabled ? 'pointer-events-none' : '']) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (__VLS_ctx.titleState === 'out' && (__VLS_ctx.title || __VLS_ctx.linkLabel || __VLS_ctx.$slots.title || __VLS_ctx.$slots.link)) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mb-1.5 w-full select-none" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    if (__VLS_ctx.title || __VLS_ctx.$slots.title) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: (__VLS_ctx.inputId),
            ...{ class: "text-sm font-semibold inline-flex items-center gap-0.5" },
            ...{ class: ([__VLS_ctx.disabled ? 'text-black-32' : __VLS_ctx.error ? 'text-error-80' : 'text-primary-80']) },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots.title)({});
        (__VLS_ctx.title);
        if (__VLS_ctx.required) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-error-100 font-bold leading-none select-none mr-0.5" },
            });
            /** @type {__VLS_StyleScopedClasses['text-error-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['mr-0.5']} */ ;
        }
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "inline-flex items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.link)({});
    if (__VLS_ctx.linkLabel) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.titleState === 'out' && (__VLS_ctx.title || __VLS_ctx.linkLabel || __VLS_ctx.$slots.title || __VLS_ctx.$slots.link)))
                        throw 0;
                    if (!(__VLS_ctx.linkLabel))
                        throw 0;
                    return (__VLS_ctx.$emit('link-click'));
                    // @ts-ignore
                    [disabled, disabled, titleState, title, title, title, linkLabel, linkLabel, $slots, $slots, $slots, inputId, error, required, $emit,];
                } },
            type: "button",
            ...{ class: "text-xs font-semibold cursor-pointer transition-colors outline-none" },
            ...{ class: ([
                    __VLS_ctx.disabled
                        ? 'text-black-32'
                        : 'text-primary-100 hover:text-secondary-100 active:scale-95',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        (__VLS_ctx.linkLabel);
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative flex items-center w-full border border-solid transition-all duration-200" },
    ...{ class: ([
            // Size-specific height and padding
            __VLS_ctx.sizeContentClasses,
            // Shape corner radius
            __VLS_ctx.rounded ? 'rounded-full px-4' : 'rounded-[10px] px-3',
            // State-specific colors and borders
            __VLS_ctx.borderClasses,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
if (__VLS_ctx.showStartIcon || __VLS_ctx.$slots.start) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "inline-flex items-center justify-center shrink-0 select-none" },
        ...{ class: ([__VLS_ctx.disabled ? 'opacity-32' : 'opacity-40 text-primary-100']) },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.start)({});
    let __VLS_3;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent1(__VLS_3, new __VLS_3({
        icon: (__VLS_ctx.startIcon || 'solar:magnifer-linear'),
        ...{ class: (__VLS_ctx.size === '3xl' ? 'w-5 h-5' : 'w-4 h-4') },
    }));
    const __VLS_5 = __VLS_4({
        icon: (__VLS_ctx.startIcon || 'solar:magnifer-linear'),
        ...{ class: (__VLS_ctx.size === '3xl' ? 'w-5 h-5' : 'w-4 h-4') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative flex-1 h-full min-w-0" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
if (__VLS_ctx.titleState === 'in' && (__VLS_ctx.title || __VLS_ctx.$slots.title)) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.inputId),
        ...{ class: "absolute right-0 origin-top-right transition-all duration-200 ease-out select-none pointer-events-none inline-flex items-center gap-0.5" },
        ...{ class: ([
                __VLS_ctx.isFloating ? __VLS_ctx.floatingLabelPositionClasses : __VLS_ctx.centeredLabelPositionClasses,
                __VLS_ctx.disabled ? 'text-black-32' : __VLS_ctx.error ? 'text-error-80' : 'text-primary-40',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['origin-top-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.title)({});
    (__VLS_ctx.title);
    if (__VLS_ctx.required) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-error-100 font-bold leading-none select-none mr-0.5" },
        });
        /** @type {__VLS_StyleScopedClasses['text-error-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-0.5']} */ ;
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.handleInput) },
    ...{ onFocus: (__VLS_ctx.handleFocus) },
    ...{ onBlur: (__VLS_ctx.handleBlur) },
    id: (__VLS_ctx.inputId),
    ref: "inputRef",
    type: (__VLS_ctx.type),
    inputmode: (__VLS_ctx.inputmode),
    value: (__VLS_ctx.modelValue),
    disabled: (__VLS_ctx.disabled),
    placeholder: (__VLS_ctx.computedPlaceholder),
    ...{ class: "w-full h-full bg-transparent border-none outline-none font-sans text-sm font-medium transition-all duration-200 leading-none" },
    ...{ class: ([
            __VLS_ctx.type === 'number' || __VLS_ctx.type === 'email'
                ? 'text-left [direction:ltr]'
                : __VLS_ctx.type === 'tel'
                    ? 'tel-input'
                    : 'text-right',
            // Padding adjustments for floating label
            __VLS_ctx.titleState === 'in' ? __VLS_ctx.inputPaddingClasses : '',
            __VLS_ctx.disabled
                ? 'text-black-32 placeholder-black-32'
                : 'text-primary-80 placeholder-primary-40',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
if (__VLS_ctx.showEndIcon || __VLS_ctx.$slots.end) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showEndIcon || __VLS_ctx.$slots.end))
                    throw 0;
                return (__VLS_ctx.$emit('end-icon-click'));
                // @ts-ignore
                [disabled, disabled, disabled, disabled, disabled, titleState, titleState, title, title, linkLabel, $slots, $slots, $slots, inputId, inputId, error, required, $emit, sizeContentClasses, rounded, borderClasses, showStartIcon, startIcon, size, isFloating, floatingLabelPositionClasses, centeredLabelPositionClasses, handleInput, handleFocus, handleBlur, type, type, type, type, inputmode, modelValue, computedPlaceholder, inputPaddingClasses, showEndIcon,];
            } },
        ...{ class: "inline-flex items-center justify-center shrink-0 cursor-pointer select-none" },
        ...{ class: ([
                __VLS_ctx.disabled
                    ? 'opacity-32'
                    : 'opacity-40 hover:opacity-100 text-primary-100 transition-opacity',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.end)({});
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        icon: (__VLS_ctx.endIcon || 'solar:plain-2-linear'),
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_12 = __VLS_11({
        icon: (__VLS_ctx.endIcon || 'solar:plain-2-linear'),
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
}
if ((__VLS_ctx.hint || __VLS_ctx.error) && (__VLS_ctx.showHint || __VLS_ctx.showError)) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col gap-[2px] items-start px-3 mt-1.5 select-none" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-[2px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    if (__VLS_ctx.hint && __VLS_ctx.showHint && !__VLS_ctx.error) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-[10px] font-medium leading-[14px]" },
            ...{ class: ([__VLS_ctx.disabled ? 'text-black-32' : 'text-primary-40']) },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-[14px]']} */ ;
        (__VLS_ctx.hint);
    }
    if (__VLS_ctx.error && __VLS_ctx.showError) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-[10px] font-medium leading-[14px] text-error-80" },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-[14px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-error-80']} */ ;
        (__VLS_ctx.error);
    }
}
// @ts-ignore
[disabled, disabled, error, error, error, error, endIcon, hint, hint, hint, showHint, showHint, showError, showError,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => __VLS_exposed,
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
