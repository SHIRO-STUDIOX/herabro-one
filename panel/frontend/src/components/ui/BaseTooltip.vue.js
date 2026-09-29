import { ref, computed, useSlots, nextTick, onBeforeUnmount } from 'vue';
const props = withDefaults(defineProps(), {
    text: '',
    placement: 'top',
    variant: 'dark',
    size: 'sm',
    disabled: false,
    openOnClick: false,
    delay: 0,
});
const __VLS_slots = defineSlots();
const slots = useSlots();
const hasTooltip = computed(() => !props.disabled && (!!props.text || !!slots.content));
const isHovered = ref(false);
const isClicked = ref(false);
const rootEl = ref(null);
const bubbleEl = ref(null);
const bubblePos = ref({ top: -9999, left: -9999 });
let timer = null;
let isTouch = false;
let longPressTimer = null;
let touchShowedTooltip = false;
let touchDismissHandler = null;
const isVisible = computed(() => (props.openOnClick ? isClicked.value : isHovered.value));
const sizeClasses = computed(() => {
    return props.size === 'md'
        ? 'px-3.5 py-2 text-xs font-semibold leading-4'
        : 'px-3 py-1.5 text-2xs font-semibold leading-4';
});
const variantClasses = computed(() => {
    return props.variant === 'light'
        ? 'bg-white-100 text-black-100 border border-primary-8'
        : 'bg-black-100 text-white-100 border border-transparent';
});
const GAP = 8;
function updatePosition() {
    const el = rootEl.value;
    const bubble = bubbleEl.value;
    if (!el || typeof window === 'undefined')
        return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const bw = bubble ? bubble.offsetWidth : 0;
    const bh = bubble ? bubble.offsetHeight : 0;
    let top = 0;
    let left = 0;
    switch (props.placement) {
        case 'bottom':
            top = rect.bottom + GAP;
            left = cx - bw / 2;
            break;
        case 'left':
            top = cy - bh / 2;
            left = rect.left - GAP - bw;
            break;
        case 'right':
            top = cy - bh / 2;
            left = rect.right + GAP;
            break;
        case 'top':
        default:
            top = rect.top - GAP - bh;
            left = cx - bw / 2;
            break;
    }
    // Clamp inside viewport so the pill never goes off-screen
    const margin = 8;
    if (bw > 0 && bh > 0) {
        left = Math.min(Math.max(left, margin), window.innerWidth - margin - bw);
        top = Math.min(Math.max(top, margin), window.innerHeight - margin - bh);
    }
    else {
        // Fallback if bubble is not rendered yet
        left = Math.min(Math.max(left, margin), window.innerWidth - margin);
        top = Math.min(Math.max(top, margin), window.innerHeight - margin);
    }
    bubblePos.value = { top, left };
}
const bubbleStyle = computed(() => ({
    top: `${bubblePos.value.top}px`,
    left: `${bubblePos.value.left}px`,
    maxWidth: '240px',
}));
function startTracking() {
    stopTracking();
    window.addEventListener('scroll', updatePosition, { capture: true, passive: true });
    window.addEventListener('resize', updatePosition);
}
function stopTracking() {
    window.removeEventListener('scroll', updatePosition, { capture: true });
    window.removeEventListener('resize', updatePosition);
}
function scheduleShow() {
    nextTick(() => {
        updatePosition();
        startTracking();
    });
}
function handleTouchStart() {
    if (props.disabled)
        return;
    isTouch = true;
    touchShowedTooltip = false;
    if (longPressTimer)
        clearTimeout(longPressTimer);
    longPressTimer = setTimeout(() => {
        if (props.openOnClick) {
            isClicked.value = true;
        }
        else {
            isHovered.value = true;
        }
        touchShowedTooltip = true;
        scheduleShow();
    }, 500);
}
function handleTouchMove() {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
}
function handleTouchEnd() {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    if (touchShowedTooltip) {
        setupTouchDismiss();
    }
    setTimeout(() => {
        isTouch = false;
    }, 500);
}
function setupTouchDismiss() {
    if (touchDismissHandler)
        document.removeEventListener('touchstart', touchDismissHandler, { capture: true });
    touchDismissHandler = (e) => {
        if (rootEl.value && !rootEl.value.contains(e.target)) {
            isHovered.value = false;
            if (props.openOnClick)
                isClicked.value = false;
            stopTracking();
            if (touchDismissHandler) {
                document.removeEventListener('touchstart', touchDismissHandler, { capture: true });
                touchDismissHandler = null;
            }
        }
    };
    setTimeout(() => {
        if (touchDismissHandler) {
            document.addEventListener('touchstart', touchDismissHandler, { capture: true });
        }
    }, 10);
}
function handleContextMenu(e) {
    if (isTouch && touchShowedTooltip) {
        e.preventDefault();
    }
}
function handleEnter() {
    if (props.disabled || props.openOnClick || isTouch)
        return;
    if (timer)
        clearTimeout(timer);
    if (props.delay > 0) {
        timer = setTimeout(() => {
            isHovered.value = true;
            scheduleShow();
        }, props.delay);
    }
    else {
        isHovered.value = true;
        scheduleShow();
    }
}
function handleLeave(e) {
    if (isTouch)
        return;
    if (timer)
        clearTimeout(timer);
    // Ignore internal moves between trigger children (bubbling mouseout/focusout)
    const related = e?.relatedTarget || null;
    if (related && rootEl.value?.contains(related))
        return;
    isHovered.value = false;
    stopTracking();
}
function handleClick() {
    if (props.disabled || !props.openOnClick || isTouch)
        return;
    isClicked.value = !isClicked.value;
    if (isClicked.value)
        scheduleShow();
    else
        stopTracking();
}
onBeforeUnmount(() => {
    if (timer)
        clearTimeout(timer);
    if (longPressTimer)
        clearTimeout(longPressTimer);
    if (touchDismissHandler)
        document.removeEventListener('touchstart', touchDismissHandler, { capture: true });
    stopTracking();
});
const __VLS_defaults = {
    text: '',
    placement: 'top',
    variant: 'dark',
    size: 'sm',
    disabled: false,
    openOnClick: false,
    delay: 0,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ onMouseover: (__VLS_ctx.handleEnter) },
    ...{ onMouseout: (__VLS_ctx.handleLeave) },
    ...{ onFocusin: (__VLS_ctx.handleEnter) },
    ...{ onFocusout: (__VLS_ctx.handleLeave) },
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onTouchstart: (__VLS_ctx.handleTouchStart) },
    ...{ onTouchend: (__VLS_ctx.handleTouchEnd) },
    ...{ onTouchmove: (__VLS_ctx.handleTouchMove) },
    ...{ onTouchcancel: (__VLS_ctx.handleTouchEnd) },
    ...{ onContextmenu: (__VLS_ctx.handleContextMenu) },
    ref: "rootEl",
    ...{ class: ([
            'base-tooltip items-center justify-center shrink-0 outline-none',
            __VLS_ctx.hasTooltip ? 'inline-flex' : 'contents',
        ]) },
    tabindex: (__VLS_ctx.hasTooltip ? 0 : undefined),
});
/** @type {__VLS_StyleScopedClasses['base-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
__VLS_asFunctionalSlot(__VLS_slots['default'])({});
let __VLS_1;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_2 = __VLS_asFunctionalComponent1(__VLS_1, new __VLS_1({
    to: "body",
}));
const __VLS_3 = __VLS_2({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_2));
const { default: __VLS_6 } = __VLS_4.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    name: "base-tooltip-fade",
}));
const __VLS_9 = __VLS_8({
    name: "base-tooltip-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
if (__VLS_ctx.hasTooltip && __VLS_ctx.isVisible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ref: "bubbleEl",
        ...{ class: ([
                'pointer-events-none fixed whitespace-nowrap font-sans font-dots-1 rounded-full shadow-xs z-[9999]',
                __VLS_ctx.sizeClasses,
                __VLS_ctx.variantClasses,
            ]) },
        ...{ style: (__VLS_ctx.bubbleStyle) },
        role: "tooltip",
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-[9999]']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.content)({});
    (__VLS_ctx.text);
}
// @ts-ignore
[handleEnter, handleEnter, handleLeave, handleLeave, handleClick, handleTouchStart, handleTouchEnd, handleTouchEnd, handleTouchMove, handleContextMenu, hasTooltip, hasTooltip, hasTooltip, isVisible, sizeClasses, variantClasses, bubbleStyle, text,];
var __VLS_10;
// @ts-ignore
[];
var __VLS_4;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
