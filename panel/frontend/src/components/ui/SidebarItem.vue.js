import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import SidebarItemBadge from './SidebarItemBadge.vue';
const props = withDefaults(defineProps(), {
    title: 'عنوان',
    icon: 'solar:widget-5-bold-duotone',
    type: 'main',
    level: 'one',
    state: 'enabled',
    expanded: true,
    selected: false,
    disabled: false,
    showBadge: false,
    badgeText: '',
    showEndIcon: false,
    endIcon: 'solar:alt-arrow-down-bold',
    hasSubItems: false,
    isSubMenuOpen: false,
    tag: 'button',
    href: undefined,
});
const emit = defineEmits();
// Determine if the item is selected/active either from selected prop or state prop
const isSelected = computed(() => props.selected || props.state === 'selected');
// Dynamic Tailwind CSS classes based on states & type
const stateClasses = computed(() => {
    const isSel = isSelected.value;
    if (props.type === 'main') {
        if (isSel) {
            return 'border border-solid border-white-100 shadow-[0px_0px_24px_0px_rgba(73,64,109,0.06)] text-primary-100 font-extrabold';
        }
        if (props.state === 'hovered') {
            return 'bg-primary-6 text-primary-80';
        }
        return 'bg-transparent text-primary-60 hover:bg-primary-6 hover:text-primary-80';
    }
    // Inside type styling
    if (props.type === 'inside') {
        if (isSel) {
            return 'bg-accent-6 border border-solid border-accent-6 text-accent-100 font-bold';
        }
        if (props.state === 'hovered') {
            return 'bg-black-6 text-accent-80';
        }
        return 'bg-transparent text-primary-60 hover:bg-black-6 hover:text-accent-80';
    }
    return '';
});
// Glassy radial background highlight for Level 1 selected state matching Figma node 37:24365 & 37:24342
const selectedRadialStyle = computed(() => {
    if (isSelected.value && props.type === 'main' && props.level === 'one') {
        if (props.expanded) {
            return {
                backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 224 44' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(11.2 5.9543e-7 -2.0326e-7 4.3891 112 44)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>")`,
            };
        }
        return {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.2 5.9543e-7 -3.9927e-8 4.3891 22 44)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>")`,
        };
    }
    return {};
});
const handleClick = (e) => {
    if (!props.disabled) {
        emit('click', e);
    }
};
const __VLS_defaults = {
    title: 'عنوان',
    icon: 'solar:widget-5-bold-duotone',
    type: 'main',
    level: 'one',
    state: 'enabled',
    expanded: true,
    selected: false,
    disabled: false,
    showBadge: false,
    badgeText: '',
    showEndIcon: false,
    endIcon: 'solar:alt-arrow-down-bold',
    hasSubItems: false,
    isSubMenuOpen: false,
    tag: 'button',
    href: undefined,
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
const __VLS_0 = (__VLS_ctx.tag);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    href: (__VLS_ctx.href),
    disabled: (__VLS_ctx.disabled),
    ...{ class: ([
            // Base layout & transition
            'group relative inline-flex items-center text-right font-sans transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none select-none cursor-pointer border border-transparent box-border',
            __VLS_ctx.disabled ? 'opacity-40 pointer-events-none cursor-not-allowed' : '',
            // Collapsed vs Expanded Container Sizing & Radii
            !__VLS_ctx.expanded ? 'justify-center p-3 rounded-4xl h-[44px] w-[44px]' : 'w-full gap-2 px-3',
            // Level & Type specific heights and rounded styles (Figma node 37:24365 / 37:24331)
            __VLS_ctx.expanded && __VLS_ctx.type === 'main' && __VLS_ctx.level === 'one' ? 'h-[44px] rounded-full' : '',
            __VLS_ctx.expanded && __VLS_ctx.type === 'inside' && __VLS_ctx.level === 'one' ? 'h-[36px] px-3 rounded-[10px]' : '',
            __VLS_ctx.expanded && __VLS_ctx.level === 'two' ? 'h-[32px] pl-4 pr-[22px] rounded-lg' : '',
            __VLS_ctx.expanded && __VLS_ctx.level === 'three' ? 'h-[32px] pl-4 pr-[44px] rounded-lg' : '',
            // State Classes (enabled, hovered, selected)
            __VLS_ctx.stateClasses,
        ]) },
    ...{ style: (__VLS_ctx.selectedRadialStyle) },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    href: (__VLS_ctx.href),
    disabled: (__VLS_ctx.disabled),
    ...{ class: ([
            // Base layout & transition
            'group relative inline-flex items-center text-right font-sans transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none select-none cursor-pointer border border-transparent box-border',
            __VLS_ctx.disabled ? 'opacity-40 pointer-events-none cursor-not-allowed' : '',
            // Collapsed vs Expanded Container Sizing & Radii
            !__VLS_ctx.expanded ? 'justify-center p-3 rounded-4xl h-[44px] w-[44px]' : 'w-full gap-2 px-3',
            // Level & Type specific heights and rounded styles (Figma node 37:24365 / 37:24331)
            __VLS_ctx.expanded && __VLS_ctx.type === 'main' && __VLS_ctx.level === 'one' ? 'h-[44px] rounded-full' : '',
            __VLS_ctx.expanded && __VLS_ctx.type === 'inside' && __VLS_ctx.level === 'one' ? 'h-[36px] px-3 rounded-[10px]' : '',
            __VLS_ctx.expanded && __VLS_ctx.level === 'two' ? 'h-[32px] pl-4 pr-[22px] rounded-lg' : '',
            __VLS_ctx.expanded && __VLS_ctx.level === 'three' ? 'h-[32px] pl-4 pr-[44px] rounded-lg' : '',
            // State Classes (enabled, hovered, selected)
            __VLS_ctx.stateClasses,
        ]) },
    ...{ style: (__VLS_ctx.selectedRadialStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.handleClick),
};
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-0']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-0']} */ ;
/** @type {__VLS_StyleScopedClasses['active:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['box-border']} */ ;
const { default: __VLS_8 } = __VLS_3.slots;
if (!__VLS_ctx.expanded) {
    var __VLS_9 = {};
    let __VLS_11;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        icon: (__VLS_ctx.icon || 'solar:widget-5-bold-duotone'),
        ...{ class: "w-5 h-5 shrink-0 transition-all duration-200" },
        ...{ class: ([
                __VLS_ctx.isSelected
                    ? 'text-primary-100 opacity-100 scale-105'
                    : 'text-primary-60 group-hover:text-primary-100 opacity-80',
            ]) },
    }));
    const __VLS_13 = __VLS_12({
        icon: (__VLS_ctx.icon || 'solar:widget-5-bold-duotone'),
        ...{ class: "w-5 h-5 shrink-0 transition-all duration-200" },
        ...{ class: ([
                __VLS_ctx.isSelected
                    ? 'text-primary-100 opacity-100 scale-105'
                    : 'text-primary-60 group-hover:text-primary-100 opacity-80',
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
}
else {
    if (__VLS_ctx.level === 'one') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "inline-flex items-center justify-center shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        var __VLS_16 = {};
        let __VLS_18;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            icon: (__VLS_ctx.icon || 'solar:widget-5-bold-duotone'),
            ...{ class: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" },
            ...{ class: ([
                    __VLS_ctx.isSelected
                        ? 'text-primary-100 opacity-100'
                        : __VLS_ctx.state === 'hovered'
                            ? 'text-primary-80 opacity-80'
                            : 'text-primary-60 opacity-60',
                ]) },
        }));
        const __VLS_20 = __VLS_19({
            icon: (__VLS_ctx.icon || 'solar:widget-5-bold-duotone'),
            ...{ class: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" },
            ...{ class: ([
                    __VLS_ctx.isSelected
                        ? 'text-primary-100 opacity-100'
                        : __VLS_ctx.state === 'hovered'
                            ? 'text-primary-80 opacity-80'
                            : 'text-primary-60 opacity-60',
                ]) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:scale-105']} */ ;
    }
    else if (__VLS_ctx.level === 'two' || __VLS_ctx.level === 'three') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "w-1 h-1 rounded-full shrink-0 transition-all duration-200" },
            ...{ class: ([__VLS_ctx.isSelected ? 'bg-accent-100 scale-125' : 'bg-primary-60 group-hover:bg-accent-80']) },
        });
        /** @type {__VLS_StyleScopedClasses['w-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex-1 truncate text-right font-dots-1 transition-colors" },
        ...{ class: ([
                __VLS_ctx.type === 'main' && __VLS_ctx.level === 'one' && __VLS_ctx.isSelected
                    ? 'text-base font-extrabold text-primary-100 leading-[22px]'
                    : '',
                __VLS_ctx.type === 'main' && __VLS_ctx.level === 'one' && !__VLS_ctx.isSelected
                    ? 'text-sm font-semibold text-primary-60 group-hover:text-primary-80 leading-[18px]'
                    : '',
                __VLS_ctx.type === 'inside' && __VLS_ctx.isSelected ? 'text-sm font-bold text-accent-100 leading-[18px]' : '',
                __VLS_ctx.type === 'inside' && !__VLS_ctx.isSelected
                    ? 'text-sm font-semibold text-primary-60 group-hover:text-accent-80 leading-[18px]'
                    : '',
                (__VLS_ctx.level === 'two' || __VLS_ctx.level === 'three') && __VLS_ctx.isSelected
                    ? 'text-sm font-bold text-primary-100 leading-[18px]'
                    : '',
                (__VLS_ctx.level === 'two' || __VLS_ctx.level === 'three') && !__VLS_ctx.isSelected
                    ? 'text-sm font-semibold text-primary-60 group-hover:text-primary-80 leading-[18px]'
                    : '',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    var __VLS_23 = {};
    (__VLS_ctx.title || 'عنوان');
    if (__VLS_ctx.showBadge || __VLS_ctx.badgeText) {
        const __VLS_25 = SidebarItemBadge || SidebarItemBadge;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
            label: (__VLS_ctx.badgeText || 'عنوان'),
            state: (__VLS_ctx.isSelected ? 'selected' : __VLS_ctx.state === 'hovered' ? 'hovered' : 'enabled'),
        }));
        const __VLS_27 = __VLS_26({
            label: (__VLS_ctx.badgeText || 'عنوان'),
            state: (__VLS_ctx.isSelected ? 'selected' : __VLS_ctx.state === 'hovered' ? 'hovered' : 'enabled'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        const { default: __VLS_30 } = __VLS_28.slots;
        var __VLS_31 = {};
        (__VLS_ctx.badgeText || 'عنوان');
        // @ts-ignore
        [tag, href, disabled, disabled, expanded, expanded, expanded, expanded, expanded, expanded, type, type, type, type, type, type, level, level, level, level, level, level, level, level, level, level, level, level, level, stateClasses, selectedRadialStyle, handleClick, icon, icon, isSelected, isSelected, isSelected, isSelected, isSelected, isSelected, isSelected, isSelected, isSelected, isSelected, state, state, title, showBadge, badgeText, badgeText, badgeText,];
        var __VLS_28;
    }
    if (__VLS_ctx.showEndIcon || __VLS_ctx.hasSubItems) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "inline-flex items-center justify-center shrink-0 transition-transform duration-200 opacity-60" },
            ...{ class: ([
                    __VLS_ctx.isSubMenuOpen
                        ? 'rotate-180 text-primary-100 opacity-100'
                        : 'text-primary-60 group-hover:text-primary-80',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        var __VLS_33 = {};
        let __VLS_35;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
            icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-down-bold'),
            ...{ class: "w-3 h-3" },
        }));
        const __VLS_37 = __VLS_36({
            icon: (__VLS_ctx.endIcon || 'solar:alt-arrow-down-bold'),
            ...{ class: "w-3 h-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    }
}
// @ts-ignore
[showEndIcon, hasSubItems, isSubMenuOpen, endIcon,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_10 = __VLS_9, __VLS_17 = __VLS_16, __VLS_24 = __VLS_23, __VLS_32 = __VLS_31, __VLS_34 = __VLS_33;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
