import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import QuickActionButton from '@/components/ui/QuickActionButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const props = withDefaults(defineProps(), {
    variant: 'auto',
    isOpen: undefined,
    icon: 'solar:bolt-bold-duotone',
    activeIcon: 'solar:close-circle-bold-duotone',
    enableElevationOnHover: true,
    disabled: false,
    radius: 180,
    openStaggerMs: 22,
    closeStaggerMs: 18,
    closeOnActionClick: true,
    showBackdrop: false,
    layout: 'radial',
});
const emit = defineEmits();
const defaultActions = [
    {
        id: 'new-doc',
        label: 'سند جدید',
        path: '/documents',
        icon: 'solar:document-add-linear',
        hoverIcon: 'solar:document-add-bold-duotone',
    },
    {
        id: 'new-treasury',
        label: 'دریافت / پرداخت',
        path: '/treasury',
        icon: 'solar:wallet-money-linear',
        hoverIcon: 'solar:wallet-money-bold-duotone',
    },
    {
        id: 'new-invoice',
        label: 'فاکتور جدید',
        path: '/invoices',
        icon: 'solar:cart-large-2-linear',
        hoverIcon: 'solar:cart-large-2-bold-duotone',
    },
    {
        id: 'new-cheque',
        label: 'چک دریافتی',
        path: '/cheques/receivable',
        icon: 'solar:card-recive-linear',
        hoverIcon: 'solar:card-recive-bold-duotone',
    },
    {
        id: 'new-product',
        label: 'کالای جدید',
        path: '/products',
        icon: 'solar:box-minimalistic-linear',
        hoverIcon: 'solar:box-minimalistic-bold-duotone',
    },
    {
        id: 'new-account',
        label: 'حساب جدید',
        path: '/accounts',
        icon: 'solar:user-plus-linear',
        hoverIcon: 'solar:user-plus-bold-duotone',
    },
];
const localIsOpen = ref(false);
const isHovered = ref(false);
const isLocallyOpen = computed({
    get: () => (props.isOpen !== undefined ? props.isOpen : localIsOpen.value),
    set: (val) => {
        localIsOpen.value = val;
        emit('update:isOpen', val);
        emit('toggle', val);
    },
});
const effectiveVariant = computed(() => {
    if (props.variant === 'active' || (props.variant === 'auto' && isLocallyOpen.value))
        return 'active';
    if (props.variant === 'hover')
        return 'hover';
    if (props.variant === 'main')
        return 'main';
    return 'auto';
});
const nodeId = computed(() => {
    if (effectiveVariant.value === 'hover')
        return '474:90418';
    if (effectiveVariant.value === 'active')
        return '474:90419';
    return '474:90420';
});
const resolvedActions = computed(() => {
    return props.actions && props.actions.length > 0 ? props.actions : defaultActions;
});
// Calculate positions for each action item based on layout
const actionPositions = computed(() => {
    const list = resolvedActions.value;
    const count = list.length;
    if (count === 0)
        return [];
    const isVertical = props.layout === 'vertical';
    const baseRadius = props.radius || 180;
    const rx = props.radiusX ?? Math.round(baseRadius * 1.38);
    const ry = props.radiusY ?? baseRadius;
    // Optimized angle distribution for aesthetic balance and clean spacing at apex
    const presetAngles = {
        1: [90],
        2: [60, 120],
        3: [30, 90, 150],
        4: [20, 65, 115, 160],
        5: [15, 52, 90, 128, 165],
        6: [10, 40, 70, 110, 140, 170],
    };
    return list.map((item, idx) => {
        let x = 0;
        let y = 0;
        let angleDeg = 90;
        if (isVertical) {
            const initialOffset = 72;
            const gap = 56;
            x = 0;
            y = -(initialOffset + idx * gap);
        }
        else {
            const angles = presetAngles[count];
            if (angles && angles[idx] !== undefined) {
                angleDeg = angles[idx];
            }
            else if (count > 1) {
                const startAngle = 10;
                const endAngle = 170;
                angleDeg = startAngle + (idx * (endAngle - startAngle)) / (count - 1);
            }
            const rad = (angleDeg * Math.PI) / 180;
            x = Math.round(rx * Math.cos(rad));
            y = Math.round(-ry * Math.sin(rad));
        }
        return {
            ...item,
            x,
            y,
            angleDeg,
            openDelay: idx * props.openStaggerMs,
            closeDelay: (count - 1 - idx) * props.closeStaggerMs,
        };
    });
});
const handleClick = (e) => {
    if (props.disabled)
        return;
    if (props.variant === 'auto') {
        isLocallyOpen.value = !isLocallyOpen.value;
    }
    emit('click', e);
};
const closeMenu = () => {
    isLocallyOpen.value = false;
};
const handleActionClick = (item) => {
    if (item.disabled || item.isSoon)
        return;
    if (item.onClick) {
        item.onClick();
    }
    emit('action-click', item);
    if (props.closeOnActionClick) {
        closeMenu();
    }
};
// Close on Escape key
const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isLocallyOpen.value) {
        closeMenu();
    }
};
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
const __VLS_defaults = {
    variant: 'auto',
    isOpen: undefined,
    icon: 'solar:bolt-bold-duotone',
    activeIcon: 'solar:close-circle-bold-duotone',
    enableElevationOnHover: true,
    disabled: false,
    radius: 180,
    openStaggerMs: 22,
    closeStaggerMs: 18,
    closeOnActionClick: true,
    showBackdrop: false,
    layout: 'radial',
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
    ...{ class: "relative inline-flex items-center justify-center font-sans select-none shrink-0" },
    ...{ class: ([
            // Container slot height
            'h-[72px] w-[56px]',
        ]) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[72px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[56px]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 w-0 h-0" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-0']} */ ;
for (const [item, idx] of __VLS_vFor((__VLS_ctx.actionPositions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (item.id),
        ...{ class: "absolute top-0 left-0 transition-[transform,opacity] duration-220 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] origin-center whitespace-nowrap" },
        ...{ style: ({
                transform: __VLS_ctx.isLocallyOpen
                    ? `translate3d(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px), 0) scale(1)`
                    : 'translate3d(-50%, -50%, 0) scale(0.3)',
                opacity: __VLS_ctx.isLocallyOpen ? 1 : 0,
                transitionDelay: __VLS_ctx.isLocallyOpen ? `${item.openDelay}ms` : `${item.closeDelay}ms`,
                pointerEvents: __VLS_ctx.isLocallyOpen ? 'auto' : 'none',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-[transform,opacity]']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-220']} */ ;
    /** @type {__VLS_StyleScopedClasses['ease-[cubic-bezier(0.16,1,0.3,1)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['will-change-[transform,opacity]']} */ ;
    /** @type {__VLS_StyleScopedClasses['origin-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    var __VLS_0 = {
        action: (item),
        index: (idx),
        isOpen: (__VLS_ctx.isLocallyOpen),
    };
    const __VLS_2 = QuickActionButton;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
        ...{ 'onClick': {} },
        label: (item.label),
        icon: (item.icon),
        hoverIcon: (item.hoverIcon),
        isSoon: (item.isSoon),
        soonLabel: (item.soonLabel),
        variant: (item.variant || 'auto'),
        disabled: (item.disabled),
    }));
    const __VLS_4 = __VLS_3({
        ...{ 'onClick': {} },
        label: (item.label),
        icon: (item.icon),
        hoverIcon: (item.hoverIcon),
        isSoon: (item.isSoon),
        soonLabel: (item.soonLabel),
        variant: (item.variant || 'auto'),
        disabled: (item.disabled),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    let __VLS_7;
    const __VLS_8 = {
        /** @type {typeof __VLS_7.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.handleActionClick(item));
            // @ts-ignore
            [actionPositions, isLocallyOpen, isLocallyOpen, isLocallyOpen, isLocallyOpen, isLocallyOpen, handleActionClick,];
        },
    };
    var __VLS_5;
    var __VLS_6;
    // @ts-ignore
    [];
}
var __VLS_9 = {
    isOpen: (__VLS_ctx.isLocallyOpen),
    toggle: (__VLS_ctx.handleClick),
};
const __VLS_11 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    text: (__VLS_ctx.isLocallyOpen ? 'بستن منو' : 'عملیات سریع'),
}));
const __VLS_13 = __VLS_12({
    text: (__VLS_ctx.isLocallyOpen ? 'بستن منو' : 'عملیات سریع'),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onMouseenter: (...[$event]) => {
            return (__VLS_ctx.isHovered = true);
            // @ts-ignore
            [isLocallyOpen, isLocallyOpen, handleClick, handleClick, isHovered,];
        } },
    ...{ onMouseleave: (...[$event]) => {
            return (__VLS_ctx.isHovered = false);
            // @ts-ignore
            [isHovered,];
        } },
    type: "button",
    'data-trigger': "true",
    disabled: (__VLS_ctx.disabled),
    ...{ class: "absolute w-14 h-14 min-w-[56px] min-h-[56px] rounded-full flex items-center justify-center p-3 cursor-pointer outline-none select-none transition-all duration-300 ease-out border border-white-24 text-white-100 group z-30" },
    ...{ class: ([
            // Background Gradient
            'bg-gradient-to-b from-primary-60 to-primary-100',
            // Variant & Dynamic Elevation State Classes
            __VLS_ctx.effectiveVariant === 'hover'
                ? 'top-0 shadow-[0px_8px_32px_0px_var(--color-primary-40)] scale-105'
                : __VLS_ctx.effectiveVariant === 'active' || __VLS_ctx.isLocallyOpen
                    ? 'top-4 shadow-[0px_0px_80px_20px_var(--color-primary-40)]'
                    : __VLS_ctx.enableElevationOnHover
                        ? 'top-4 shadow-2xs hover:top-0 hover:shadow-[0px_8px_32px_0px_var(--color-primary-40)] hover:scale-105 active:scale-95'
                        : 'top-4 shadow-2xs active:scale-95',
            __VLS_ctx.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        ]) },
    'data-node-id': (__VLS_ctx.nodeId),
    'data-name': (__VLS_ctx.effectiveVariant === 'hover'
        ? 'flash-butt-hover'
        : __VLS_ctx.effectiveVariant === 'active' || __VLS_ctx.isLocallyOpen
            ? 'flash-butt-active'
            : 'flash-butt-main'),
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[56px]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[56px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white-24']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-primary-60']} */ ;
/** @type {__VLS_StyleScopedClasses['to-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300 ease-out" },
    ...{ class: ([
            __VLS_ctx.effectiveVariant === 'active' || __VLS_ctx.isLocallyOpen ? 'rotate-90 scale-110' : 'rotate-0',
        ]) },
    'data-name': "Widget",
});
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
var __VLS_17 = {
    isOpen: (__VLS_ctx.isLocallyOpen),
};
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    icon: (__VLS_ctx.effectiveVariant === 'active' || __VLS_ctx.isLocallyOpen ? __VLS_ctx.activeIcon : __VLS_ctx.icon),
    ...{ class: "w-6 h-6 text-white-100" },
}));
const __VLS_21 = __VLS_20({
    icon: (__VLS_ctx.effectiveVariant === 'active' || __VLS_ctx.isLocallyOpen ? __VLS_ctx.activeIcon : __VLS_ctx.icon),
    ...{ class: "w-6 h-6 text-white-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
// @ts-ignore
[isLocallyOpen, isLocallyOpen, isLocallyOpen, isLocallyOpen, isLocallyOpen, disabled, disabled, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, effectiveVariant, enableElevationOnHover, nodeId, activeIcon, icon,];
var __VLS_14;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    to: "body",
}));
const __VLS_26 = __VLS_25({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    name: "fade",
}));
const __VLS_32 = __VLS_31({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
if (__VLS_ctx.isLocallyOpen && __VLS_ctx.showBackdrop) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.closeMenu) },
        ...{ class: "fixed inset-0 z-20 bg-black-32/15 transition-opacity duration-200" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black-32/15']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
}
// @ts-ignore
[isLocallyOpen, showBackdrop, closeMenu,];
var __VLS_33;
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_10 = __VLS_9, __VLS_18 = __VLS_17;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
