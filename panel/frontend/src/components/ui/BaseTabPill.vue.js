const __VLS_props = withDefaults(defineProps(), {
    label: '',
    active: false,
    disabled: false,
});
const __VLS_emit = defineEmits();
const __VLS_defaults = {
    label: '',
    active: false,
    disabled: false,
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
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.$emit('click', $event));
            // @ts-ignore
            [$emit,];
        } },
    type: "button",
    ...{ class: "inline-flex items-center justify-center gap-1 h-6 px-[6px] rounded-full border border-solid select-none transition-all duration-200 cursor-pointer focus:outline-none font-dots-1 shrink-0" },
    ...{ class: ([
            __VLS_ctx.active
                ? 'bg-primary-100 border-primary-100 text-white-100 shadow-2xs'
                : 'bg-white-100 border-primary-12 text-primary-100 hover:bg-surface-50 hover:border-primary-24 active:scale-95',
            __VLS_ctx.disabled ? 'opacity-50 pointer-events-none' : '',
        ]) },
    disabled: (__VLS_ctx.disabled),
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[6px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-semibold leading-4 font-dots-1 text-center whitespace-nowrap" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
var __VLS_0 = {};
(__VLS_ctx.label);
if (__VLS_ctx.count !== undefined && __VLS_ctx.count !== null) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "inline-flex items-center justify-center px-1 py-0.2 text-[10px] font-bold leading-3 rounded-full shrink-0 font-dots-1" },
        ...{ class: (__VLS_ctx.active ? 'bg-white-100/20 text-white-100' : 'bg-primary-6 text-primary-100') },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0.2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    (__VLS_ctx.count);
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[active, active, disabled, disabled, label, count, count, count,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
