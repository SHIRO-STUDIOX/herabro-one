import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import BaseDropdownItem from './BaseDropdownItem.vue';
import BaseChip from './BaseChip.vue';
import BaseTooltip from './BaseTooltip.vue';
const props = withDefaults(defineProps(), {
    modelValue: undefined,
    options: () => [],
    title: 'عنوان',
    placeholder: '',
    titleState: 'in',
    required: false,
    size: '2xl',
    rounded: false,
    disabled: false,
    multiple: false,
    showStartIcon: false,
    startIcon: '',
    clearable: false,
    searchable: false,
    error: '',
    hint: '',
    hasShadow: true,
    fixedSize: false,
    state: '',
    expanded: null,
    filled: null,
    id: '',
    placement: 'auto',
});
const emit = defineEmits();
const containerRef = ref(null);
const triggerRef = ref(null);
const menuRef = ref(null);
const isOpenInternal = ref(false);
const searchQuery = ref('');
const actualPlacement = ref(props.placement === 'top' ? 'top' : 'bottom');
const menuRect = ref({ top: 0, left: 0, width: 0 });
const MENU_GAP = 6;
const MENU_MAX_HEIGHT = 256;
const menuStyle = computed(() => ({
    top: `${menuRect.value.top}px`,
    left: `${menuRect.value.left}px`,
    width: `${menuRect.value.width}px`,
    transformOrigin: actualPlacement.value === 'top' ? 'bottom center' : 'top center',
}));
const updateMenuRect = () => {
    if (typeof window === 'undefined')
        return;
    const anchor = triggerRef.value ?? containerRef.value;
    if (!anchor)
        return;
    const rect = anchor.getBoundingClientRect();
    const menuH = menuRef.value?.offsetHeight || MENU_MAX_HEIGHT;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const preferTop = props.placement === 'top' ||
        (props.placement === 'auto' &&
            spaceBelow < Math.min(menuH + MENU_GAP, MENU_MAX_HEIGHT + MENU_GAP) &&
            spaceAbove > spaceBelow);
    actualPlacement.value = preferTop ? 'top' : 'bottom';
    menuRect.value = {
        width: rect.width,
        left: rect.left,
        top: preferTop ? Math.max(8, rect.top - menuH - MENU_GAP) : rect.bottom + MENU_GAP,
    };
};
const updatePlacement = () => {
    updateMenuRect();
};
const selectId = props.id || `select-${Math.random().toString(36).substring(2, 9)}`;
// Normalize options list into BaseDropdownOption format
const normalizedOptions = computed(() => {
    return props.options.map((opt) => {
        if (typeof opt === 'string' || typeof opt === 'number') {
            return { label: String(opt), value: opt };
        }
        return opt;
    });
});
// Filtered options based on search query
const filteredOptions = computed(() => {
    if (!searchQuery.value)
        return normalizedOptions.value;
    const q = searchQuery.value.toLowerCase();
    return normalizedOptions.value.filter((opt) => opt.label.toLowerCase().includes(q));
});
// Computed disabled state
const computedDisabled = computed(() => {
    if (props.state === 'disabled')
        return true;
    if (props.state === 'enabled')
        return false;
    return props.disabled;
});
// Effective expanded state (for showcase matrix or interactive toggle)
const isMenuOpen = computed(() => {
    if (props.expanded !== null && props.expanded !== undefined) {
        return props.expanded;
    }
    return isOpenInternal.value;
});
// Check if filled
const isFilled = computed(() => {
    if (props.filled !== null && props.filled !== undefined) {
        return props.filled;
    }
    if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.length > 0;
    }
    return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '';
});
// Floating label active condition
const isFloating = computed(() => {
    if (props.titleState !== 'in')
        return false;
    return isFilled.value || isMenuOpen.value;
});
// Floating label top position per size variant matching 14 Figma nodes
const floatingLabelPositionClasses = computed(() => {
    if (!isFloating.value) {
        return 'top-1/2 -translate-y-1/2 text-sm font-medium';
    }
    switch (props.size) {
        case 'xs':
            return 'top-0.5 text-[9px] font-semibold';
        case 'lg':
            return 'top-0.5 text-2xs font-semibold';
        case '3xl':
            return 'top-1.5 text-xs font-semibold';
        case '2xl':
        default:
            return 'top-1 text-2xs font-semibold';
    }
});
const selectedTextPaddingTopClass = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'pt-2.5';
        case 'lg':
            return 'pt-3';
        case '3xl':
            return 'pt-4';
        case '2xl':
        default:
            return 'pt-3.5';
    }
});
// Selected options list for multi-select
const selectedOptions = computed(() => {
    if (!props.multiple || !Array.isArray(props.modelValue))
        return [];
    return normalizedOptions.value.filter((opt) => props.modelValue.includes(opt.value));
});
// Display label text
const displayLabelText = computed(() => {
    if (!isFilled.value) {
        return props.placeholder || (props.titleState === 'out' ? props.title : '') || 'انتخاب کنید...';
    }
    if (props.multiple) {
        return selectedOptions.value.map((o) => o.label).join('، ');
    }
    const match = normalizedOptions.value.find((o) => o.value === props.modelValue);
    return match ? match.label : String(props.modelValue);
});
// Label typography styling matching exact 14 Figma nodes (14px text-sm leading-4.5 across lg/2xl/3xl, font-medium 500 across unfilled and filled states)
const displayLabelClasses = computed(() => {
    const sz = props.size;
    const fontSize = sz === 'xs' ? 'text-xs leading-4' : 'text-sm leading-4.5';
    if (computedDisabled.value) {
        return `${fontSize} font-medium text-black-32`;
    }
    if (isFilled.value) {
        return `${fontSize} font-medium text-primary-100`;
    }
    return `${fontSize} font-medium text-primary-40`;
});
// Corner radius matching size variant
const triggerRadiusClass = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'rounded-lg px-2';
        case 'lg':
        case '2xl':
            return 'rounded-[10px] px-3';
        case '3xl':
            return 'rounded-xl px-4';
        default:
            return 'rounded-[10px] px-3';
    }
});
// Trigger Sizing matching 14 Figma nodes (xs: 32px, lg: 40px, 2xl: 48px, 3xl: 56px)
const triggerSizeClasses = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'h-8 text-xs';
        case 'lg':
            return 'h-10 text-sm';
        case '3xl':
            return 'h-14 text-sm sm:text-base';
        case '2xl':
        default:
            return 'h-12 text-sm';
    }
});
// Trigger state colors and borders matching Figma and Hesabro design tokens
const triggerStateClasses = computed(() => {
    if (computedDisabled.value) {
        return 'bg-black-6 border-transparent text-black-32';
    }
    if (props.error) {
        return 'bg-white-100 border-error-100 ring-2 ring-error-8/10 text-primary-100';
    }
    if (isMenuOpen.value) {
        return 'bg-white-100 border-primary-100 ring-4 ring-primary-6 text-primary-100';
    }
    return 'bg-white-100 border-primary-12 hover:border-primary-32 text-primary-100';
});
const toggleDropdown = () => {
    if (computedDisabled.value)
        return;
    isOpenInternal.value = !isOpenInternal.value;
};
watch(isMenuOpen, (open) => {
    if (open) {
        // Wait for the teleported menu to exist so its real height is measurable,
        // then clamp it inside the viewport (also flipped above when needed).
        nextTick(() => {
            updateMenuRect();
            nextTick(() => updateMenuRect());
        });
    }
});
const repositionOnViewportChange = () => {
    if (isMenuOpen.value)
        updateMenuRect();
};
const closeDropdown = () => {
    isOpenInternal.value = false;
};
const isOptionSelected = (val) => {
    if (props.multiple && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(val);
    }
    return props.modelValue === val;
};
const selectOption = (option) => {
    if (option.disabled || computedDisabled.value)
        return;
    if (props.multiple) {
        const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
        const idx = current.indexOf(option.value);
        if (idx >= 0) {
            current.splice(idx, 1);
        }
        else {
            current.push(option.value);
        }
        emit('update:modelValue', current);
        emit('change', current);
    }
    else {
        emit('update:modelValue', option.value);
        emit('change', option.value);
        isOpenInternal.value = false;
    }
};
const removeOption = (val) => {
    if (!props.multiple || !Array.isArray(props.modelValue))
        return;
    const next = props.modelValue.filter((item) => item !== val);
    emit('update:modelValue', next);
    emit('change', next);
};
const clearSelection = () => {
    const emptyVal = props.multiple ? [] : undefined;
    emit('update:modelValue', emptyVal);
    emit('change', emptyVal);
};
// Click outside handler (menu is teleported: check both trigger + menu)
const handleClickOutside = (e) => {
    const target = e.target;
    const insideTrigger = containerRef.value?.contains(target);
    const insideMenu = menuRef.value?.contains(target);
    if (!insideTrigger && !insideMenu) {
        isOpenInternal.value = false;
    }
};
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', repositionOnViewportChange);
    window.addEventListener('scroll', repositionOnViewportChange, { capture: true, passive: true });
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', repositionOnViewportChange);
    window.removeEventListener('scroll', repositionOnViewportChange, { capture: true });
});
const __VLS_defaults = {
    modelValue: undefined,
    options: () => [],
    title: 'عنوان',
    placeholder: '',
    titleState: 'in',
    required: false,
    size: '2xl',
    rounded: false,
    disabled: false,
    multiple: false,
    showStartIcon: false,
    startIcon: '',
    clearable: false,
    searchable: false,
    error: '',
    hint: '',
    hasShadow: true,
    fixedSize: false,
    state: '',
    expanded: null,
    filled: null,
    id: '',
    placement: 'auto',
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
/** @type {__VLS_StyleScopedClasses['no-scrollbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "containerRef",
    ...{ class: "relative w-full font-sans text-right select-none" },
    ...{ class: ([__VLS_ctx.isMenuOpen ? 'z-[9999]' : 'z-auto']) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
if (__VLS_ctx.titleState === 'out' && (__VLS_ctx.title || __VLS_ctx.$slots.title)) {
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
        for: (__VLS_ctx.selectId),
        ...{ class: "text-sm font-semibold font-dots-1 inline-flex items-center gap-0.5" },
        ...{ class: ([__VLS_ctx.computedDisabled ? 'text-black-32' : __VLS_ctx.error ? 'text-error-80' : 'text-primary-80']) },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
    var __VLS_0 = {};
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.toggleDropdown) },
    ...{ onKeydown: (__VLS_ctx.toggleDropdown) },
    ...{ onKeydown: (__VLS_ctx.toggleDropdown) },
    ...{ onKeydown: (__VLS_ctx.closeDropdown) },
    id: (__VLS_ctx.selectId),
    ref: "triggerRef",
    tabindex: "0",
    ...{ class: "relative flex items-center justify-between border border-solid transition-all duration-200" },
    ...{ class: ([
            __VLS_ctx.triggerSizeClasses,
            __VLS_ctx.triggerStateClasses,
            __VLS_ctx.rounded ? 'rounded-full px-4' : __VLS_ctx.triggerRadiusClass,
            __VLS_ctx.computedDisabled
                ? 'cursor-not-allowed pointer-events-none'
                : 'cursor-pointer active:scale-[0.995]',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
if (__VLS_ctx.startIcon || __VLS_ctx.$slots.startIcon) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shrink-0 flex items-center justify-center text-primary-40 ml-2" },
        ...{ class: (__VLS_ctx.computedDisabled ? 'opacity-32' : 'opacity-80') },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
    var __VLS_2 = {};
    let __VLS_4;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent1(__VLS_4, new __VLS_4({
        icon: (__VLS_ctx.startIcon),
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_6 = __VLS_5({
        icon: (__VLS_ctx.startIcon),
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative flex-1 min-w-0 h-full flex flex-col justify-center overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
if (__VLS_ctx.titleState === 'in' && (__VLS_ctx.title || __VLS_ctx.$slots.title)) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "absolute right-0 origin-top-right transition-all duration-200 ease-out select-none pointer-events-none font-dots-1 inline-flex items-center gap-0.5" },
        ...{ class: ([
                __VLS_ctx.floatingLabelPositionClasses,
                __VLS_ctx.computedDisabled ? 'text-black-32' : __VLS_ctx.error ? 'text-error-80' : 'text-primary-40',
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
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
    var __VLS_9 = {};
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex items-center gap-1.5 transition-all duration-200" },
    ...{ class: (__VLS_ctx.titleState === 'in' && __VLS_ctx.isFloating ? __VLS_ctx.selectedTextPaddingTopClass : '') },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
if (__VLS_ctx.multiple && Array.isArray(__VLS_ctx.modelValue) && __VLS_ctx.modelValue.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['no-scrollbar']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
    for (const [val] of __VLS_vFor((__VLS_ctx.selectedOptions))) {
        const __VLS_11 = BaseChip;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
            ...{ 'onRemove': {} },
            key: (String(val.value)),
            label: (val.label),
            size: "sm",
            type: "primary",
            variant: "fill",
            pill: (false),
            removable: (true),
        }));
        const __VLS_13 = __VLS_12({
            ...{ 'onRemove': {} },
            key: (String(val.value)),
            label: (val.label),
            size: "sm",
            type: "primary",
            variant: "fill",
            pill: (false),
            removable: (true),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        let __VLS_16;
        const __VLS_17 = {
            /** @type {typeof __VLS_16.remove} */
            onRemove: (...[$event]) => {
                if (!(__VLS_ctx.multiple && Array.isArray(__VLS_ctx.modelValue) && __VLS_ctx.modelValue.length > 0))
                    throw 0;
                return (__VLS_ctx.removeOption(val.value));
                // @ts-ignore
                [isMenuOpen, titleState, titleState, titleState, title, title, title, title, $slots, $slots, $slots, selectId, selectId, computedDisabled, computedDisabled, computedDisabled, computedDisabled, error, error, required, required, toggleDropdown, toggleDropdown, toggleDropdown, closeDropdown, triggerSizeClasses, triggerStateClasses, rounded, triggerRadiusClass, startIcon, startIcon, floatingLabelPositionClasses, isFloating, selectedTextPaddingTopClass, multiple, modelValue, modelValue, selectedOptions, removeOption,];
            },
        };
        var __VLS_14;
        var __VLS_15;
        // @ts-ignore
        [];
    }
}
else {
    if (__VLS_ctx.isFilled || __VLS_ctx.titleState === 'out' || (__VLS_ctx.titleState === 'in' && __VLS_ctx.isFloating)) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "truncate font-dots-1" },
            ...{ class: (__VLS_ctx.displayLabelClasses) },
        });
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        (__VLS_ctx.displayLabelText);
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "shrink-0 flex items-center gap-1 mr-2" },
});
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
if (__VLS_ctx.clearable && __VLS_ctx.isFilled && !__VLS_ctx.computedDisabled) {
    const __VLS_18 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        text: "پاک کردن انتخاب",
    }));
    const __VLS_20 = __VLS_19({
        text: "پاک کردن انتخاب",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.clearSelection) },
        type: "button",
        ...{ class: "p-0.5 rounded-md text-primary-40 hover:text-error-100 transition-colors cursor-pointer" },
    });
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-error-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        icon: "solar:close-circle-bold",
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_26 = __VLS_25({
        icon: "solar:close-circle-bold",
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    // @ts-ignore
    [titleState, titleState, computedDisabled, isFloating, isFilled, isFilled, displayLabelClasses, displayLabelText, clearable, clearSelection,];
    var __VLS_21;
}
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    icon: "solar:alt-arrow-down-linear",
    ...{ class: "w-4 h-4 transition-transform duration-200 shrink-0" },
    ...{ class: ([
            __VLS_ctx.isMenuOpen ? 'rotate-180 text-secondary-100' : 'text-primary-40',
            __VLS_ctx.computedDisabled ? 'opacity-32' : 'opacity-80',
        ]) },
}));
const __VLS_31 = __VLS_30({
    icon: "solar:alt-arrow-down-linear",
    ...{ class: "w-4 h-4 transition-transform duration-200 shrink-0" },
    ...{ class: ([
            __VLS_ctx.isMenuOpen ? 'rotate-180 text-secondary-100' : 'text-primary-40',
            __VLS_ctx.computedDisabled ? 'opacity-32' : 'opacity-80',
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-1 text-xs font-bold text-error-100 font-dots-1 flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-error-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        icon: "solar:danger-circle-bold",
        ...{ class: "w-3.5 h-3.5 shrink-0" },
    }));
    const __VLS_36 = __VLS_35({
        icon: "solar:danger-circle-bold",
        ...{ class: "w-3.5 h-3.5 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.error);
}
else if (__VLS_ctx.hint) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-1 text-2xs font-semibold text-primary-60 font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    (__VLS_ctx.hint);
}
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    to: "body",
}));
const __VLS_41 = __VLS_40({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    name: "fade-slide",
    type: "transition",
}));
const __VLS_47 = __VLS_46({
    name: "fade-slide",
    type: "transition",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
if (__VLS_ctx.isMenuOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "menuRef",
        ...{ class: "fixed z-[9999] bg-white-100 border border-primary-12 rounded-2xl p-2 flex flex-col gap-1 backdrop-blur-md font-sans" },
        ...{ style: (__VLS_ctx.menuStyle) },
        ...{ class: ([
                __VLS_ctx.hasShadow ? 'shadow-lg shadow-black-6/20' : 'shadow-none',
                __VLS_ctx.fixedSize
                    ? 'max-h-none h-auto overflow-visible'
                    : 'max-h-64 overflow-y-auto no-scrollbar',
            ]) },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-[9999]']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    if (__VLS_ctx.searchable) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "p-1 mb-1" },
        });
        /** @type {__VLS_StyleScopedClasses['p-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "relative w-full flex items-center" },
        });
        /** @type {__VLS_StyleScopedClasses['relative']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onClick: () => { } },
            value: (__VLS_ctx.searchQuery),
            type: "text",
            placeholder: "برچسب",
            ...{ class: "w-full h-8 pl-3 pr-8 rounded-lg bg-white-100 border border-primary-12 text-xs font-medium text-primary-100 placeholder-primary-40 outline-none focus:border-primary-100 focus:ring-2 focus:ring-primary-6 font-dots-1 transition-all" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['pl-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['placeholder-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:border-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-primary-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        let __VLS_51;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
            icon: "solar:magnifer-linear",
            ...{ class: "w-3.5 h-3.5 text-primary-40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" },
        }));
        const __VLS_53 = __VLS_52({
            icon: "solar:magnifer-linear",
            ...{ class: "w-3.5 h-3.5 text-primary-40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_52));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['right-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
        /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
        /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    }
    if (__VLS_ctx.filteredOptions.length > 0) {
        for (const [option] of __VLS_vFor((__VLS_ctx.filteredOptions))) {
            const __VLS_56 = BaseDropdownItem || BaseDropdownItem;
            // @ts-ignore
            const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
                ...{ 'onClick': {} },
                key: (String(option.value)),
                label: (option.label),
                secondaryLabel: (option.secondaryLabel),
                startIcon: (option.icon),
                showStartIcon: (!!option.icon),
                keyboardShortcut: (option.kbd || option.keyboardShortcut),
                showKeyboardShortcut: (!!(option.kbd || option.keyboardShortcut)),
                type: (option.type || 'primary'),
                selected: (__VLS_ctx.isOptionSelected(option.value)),
                disabled: (option.disabled),
                size: (__VLS_ctx.size === 'xs' ? 'xs' : 'sm'),
            }));
            const __VLS_58 = __VLS_57({
                ...{ 'onClick': {} },
                key: (String(option.value)),
                label: (option.label),
                secondaryLabel: (option.secondaryLabel),
                startIcon: (option.icon),
                showStartIcon: (!!option.icon),
                keyboardShortcut: (option.kbd || option.keyboardShortcut),
                showKeyboardShortcut: (!!(option.kbd || option.keyboardShortcut)),
                type: (option.type || 'primary'),
                selected: (__VLS_ctx.isOptionSelected(option.value)),
                disabled: (option.disabled),
                size: (__VLS_ctx.size === 'xs' ? 'xs' : 'sm'),
            }, ...__VLS_functionalComponentArgsRest(__VLS_57));
            let __VLS_61;
            const __VLS_62 = {
                /** @type {typeof __VLS_61.click} */
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isMenuOpen))
                        throw 0;
                    if (!(__VLS_ctx.filteredOptions.length > 0))
                        throw 0;
                    return (__VLS_ctx.selectOption(option));
                    // @ts-ignore
                    [isMenuOpen, isMenuOpen, computedDisabled, error, error, hint, hint, menuStyle, hasShadow, fixedSize, searchable, searchQuery, filteredOptions, filteredOptions, isOptionSelected, size, selectOption,];
                },
            };
            const { default: __VLS_63 } = __VLS_59.slots;
            if (__VLS_ctx.multiple) {
                {
                    const { endIcon: __VLS_64 } = __VLS_59.slots;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                        ...{ class: "w-4 h-4 rounded-md border flex items-center justify-center transition-all ml-1 shrink-0" },
                        ...{ class: (__VLS_ctx.isOptionSelected(option.value)
                                ? 'bg-primary-100 border-primary-100 text-white-100'
                                : 'border-primary-24 bg-white-100') },
                    });
                    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
                    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
                    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
                    /** @type {__VLS_StyleScopedClasses['border']} */ ;
                    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
                    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
                    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
                    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
                    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
                    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
                    if (__VLS_ctx.isOptionSelected(option.value)) {
                        let __VLS_65;
                        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
                        Icon;
                        // @ts-ignore
                        const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
                            icon: "solar:check-bold",
                            ...{ class: "w-3 h-3" },
                        }));
                        const __VLS_67 = __VLS_66({
                            icon: "solar:check-bold",
                            ...{ class: "w-3 h-3" },
                        }, ...__VLS_functionalComponentArgsRest(__VLS_66));
                        /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
                        /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
                    }
                    // @ts-ignore
                    [multiple, isOptionSelected, isOptionSelected,];
                }
            }
            // @ts-ignore
            [];
            var __VLS_59;
            var __VLS_60;
            // @ts-ignore
            [];
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "px-3 py-4 text-center text-xs font-bold text-primary-40 font-dots-1" },
        });
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    }
}
// @ts-ignore
[];
var __VLS_48;
// @ts-ignore
[];
var __VLS_42;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_10 = __VLS_9;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
