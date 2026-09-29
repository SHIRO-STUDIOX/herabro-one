import { computed, ref, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const VARIANT_DEFAULTS = {
    delete: {
        icon: 'solar:trash-bin-trash-bold-duotone',
        confirmText: 'آیا مطمئنید؟',
        tooltip: '',
        actionTitle: 'تایید حذف',
    },
    approve: {
        icon: 'solar:check-bold',
        confirmText: 'تایید شود؟',
        tooltip: 'تایید',
        actionTitle: 'تایید نهایی',
    },
    undo: {
        icon: 'solar:restart-bold',
        confirmText: 'بازگشت به پیش‌نویس؟',
        tooltip: 'لغو تایید و بازگشت',
        actionTitle: 'لغو تایید',
    },
};
const VARIANT_TONES = {
    delete: {
        solid: 'bg-error-100',
        solidHover: 'hover:bg-error-100/90',
        softHover: 'hover:bg-error-8 hover:text-error-100',
        track: 'bg-error-100/20',
        fill: 'bg-error-100',
    },
    approve: {
        solid: 'bg-success-100',
        solidHover: 'hover:bg-success-100/90',
        softHover: 'hover:bg-success-8 hover:text-success-100',
        track: 'bg-success-100/20',
        fill: 'bg-success-100',
    },
    undo: {
        solid: 'bg-warning-100',
        solidHover: 'hover:bg-warning-100/90',
        softHover: 'hover:bg-warning-8 hover:text-warning-100',
        track: 'bg-warning-100/20',
        fill: 'bg-warning-100',
    },
};
const props = withDefaults(defineProps(), {
    variant: 'delete',
    confirmText: '',
    timeout: 3000,
    disabled: false,
    tooltip: '',
    icon: '',
    iconClass: 'w-3.5 h-3.5',
    buttonClass: '',
    capsuleClass: '',
});
const variantDefaults = computed(() => VARIANT_DEFAULTS[props.variant]);
const tone = computed(() => VARIANT_TONES[props.variant]);
const activeIcon = computed(() => props.icon || variantDefaults.value.icon);
const activeConfirmText = computed(() => props.confirmText || variantDefaults.value.confirmText);
const activeTooltip = computed(() => props.tooltip || variantDefaults.value.tooltip);
const activeActionTitle = computed(() => variantDefaults.value.actionTitle);
const emit = defineEmits();
const isConfirming = ref(false);
const containerRef = ref(null);
const progressPercent = ref(100);
let timer = null;
let intervalTimer = null;
const TICK_INTERVAL = 50;
const clearTimers = () => {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    if (intervalTimer) {
        clearInterval(intervalTimer);
        intervalTimer = null;
    }
};
const handleClickOutside = (e) => {
    if (isConfirming.value && containerRef.value && !containerRef.value.contains(e.target)) {
        cancelAction();
    }
};
const handleKeyDown = (e) => {
    if (isConfirming.value && e.key === 'Escape') {
        cancelAction();
    }
};
const handleButtonClick = () => {
    if (props.disabled)
        return;
    if (!isConfirming.value) {
        startConfirm();
    }
    else {
        confirmAction();
    }
};
const startConfirm = () => {
    if (props.disabled)
        return;
    isConfirming.value = true;
    progressPercent.value = 100;
    emit('toggle', true);
    // Start progress bar countdown
    const startTime = Date.now();
    intervalTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, props.timeout - elapsed);
        progressPercent.value = (remaining / props.timeout) * 100;
    }, TICK_INTERVAL);
    // Auto revert after timeout with smooth collapse animation
    timer = setTimeout(() => {
        cancelAction();
    }, props.timeout);
    // Listeners
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
};
const cancelAction = () => {
    clearTimers();
    isConfirming.value = false;
    progressPercent.value = 100;
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeyDown);
    emit('toggle', false);
    emit('cancel');
};
const confirmAction = () => {
    clearTimers();
    isConfirming.value = false;
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeyDown);
    emit('toggle', false);
    emit('confirm');
};
onBeforeUnmount(() => {
    clearTimers();
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeyDown);
});
const __VLS_defaults = {
    variant: 'delete',
    confirmText: '',
    timeout: 3000,
    disabled: false,
    tooltip: '',
    icon: '',
    iconClass: 'w-3.5 h-3.5',
    buttonClass: '',
    capsuleClass: '',
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
    ...{ onClick: () => { } },
    ref: "containerRef",
    ...{ class: "relative inline-flex items-center select-none" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
const __VLS_0 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    text: (__VLS_ctx.activeTooltip),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.isConfirming || !__VLS_ctx.activeTooltip),
}));
const __VLS_2 = __VLS_1({
    text: (__VLS_ctx.activeTooltip),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.isConfirming || !__VLS_ctx.activeTooltip),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    dir: "ltr",
    ...{ class: ([
            'h-6 rounded-full inline-flex items-center overflow-hidden transition-all duration-250 ease-out relative',
            __VLS_ctx.isConfirming ? 'bg-primary-8 shadow-2xs' : 'bg-transparent',
            __VLS_ctx.disabled ? 'opacity-35 cursor-not-allowed pointer-events-none' : '',
            __VLS_ctx.capsuleClass,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-250']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleButtonClick) },
    type: "button",
    disabled: (__VLS_ctx.disabled),
    ...{ class: ([
            'w-6 h-6 min-w-[24px] rounded-full flex items-center justify-center transition-all duration-200 outline-none shrink-0 cursor-pointer',
            __VLS_ctx.isConfirming
                ? `${__VLS_ctx.tone.solid} text-white-100 ${__VLS_ctx.tone.solidHover} active:scale-90 shadow-xs`
                : `bg-primary-8 ${__VLS_ctx.tone.softHover} active:scale-90 text-primary-80`,
            __VLS_ctx.buttonClass,
        ]) },
    title: (__VLS_ctx.isConfirming ? __VLS_ctx.activeActionTitle : __VLS_ctx.activeTooltip),
});
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    icon: (__VLS_ctx.activeIcon),
    ...{ class: ([
            __VLS_ctx.iconClass,
            __VLS_ctx.isConfirming ? 'text-white-100' : '',
            'transition-colors duration-200 shrink-0',
        ]) },
}));
const __VLS_8 = __VLS_7({
    icon: (__VLS_ctx.activeIcon),
    ...{ class: ([
            __VLS_ctx.iconClass,
            __VLS_ctx.isConfirming ? 'text-white-100' : '',
            'transition-colors duration-200 shrink-0',
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    name: "capsule-slide",
}));
const __VLS_13 = __VLS_12({
    name: "capsule-slide",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
if (__VLS_ctx.isConfirming) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.confirmAction) },
        dir: "rtl",
        ...{ class: "overflow-hidden flex items-center cursor-pointer select-none" },
    });
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[11px] font-bold font-dots-1 text-primary-80 whitespace-nowrap select-none leading-none pr-2 pl-2.5" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['pr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['pl-2.5']} */ ;
    (__VLS_ctx.activeConfirmText);
}
// @ts-ignore
[activeTooltip, activeTooltip, activeTooltip, disabled, disabled, disabled, isConfirming, isConfirming, isConfirming, isConfirming, isConfirming, isConfirming, capsuleClass, handleButtonClick, tone, tone, tone, buttonClass, activeActionTitle, activeIcon, iconClass, confirmAction, activeConfirmText,];
var __VLS_14;
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    name: "fade",
}));
const __VLS_19 = __VLS_18({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
if (__VLS_ctx.isConfirming) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute bottom-0 right-0 left-0 h-[1.5px] pointer-events-none overflow-hidden" },
        ...{ class: (__VLS_ctx.tone.track) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[1.5px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-full transition-all ease-linear" },
        ...{ class: (__VLS_ctx.tone.fill) },
        ...{ style: ({
                width: `${__VLS_ctx.progressPercent}%`,
                transitionDuration: `${__VLS_ctx.TICK_INTERVAL}ms`,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['ease-linear']} */ ;
}
// @ts-ignore
[isConfirming, tone, tone, progressPercent, TICK_INTERVAL,];
var __VLS_20;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
