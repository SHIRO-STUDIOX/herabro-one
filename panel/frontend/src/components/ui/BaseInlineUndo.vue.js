import { computed } from 'vue';
import BaseInlineDelete from '@/components/ui/BaseInlineDelete.vue';
const props = withDefaults(defineProps(), {
    confirmText: '',
    targetLabel: 'پیش‌نویس',
    tooltip: 'لغو تایید و بازگشت',
    timeout: 3000,
    disabled: false,
    icon: 'solar:restart-bold',
    iconClass: 'w-3.5 h-3.5',
    buttonClass: '',
    capsuleClass: '',
});
const __VLS_emit = defineEmits();
const resolvedConfirmText = computed(() => {
    if (props.confirmText)
        return props.confirmText;
    if (props.targetLabel)
        return `بازگشت به ${props.targetLabel}؟`;
    return 'بازگشت به وضعیت قبلی؟';
});
const __VLS_defaults = {
    confirmText: '',
    targetLabel: 'پیش‌نویس',
    tooltip: 'لغو تایید و بازگشت',
    timeout: 3000,
    disabled: false,
    icon: 'solar:restart-bold',
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
const __VLS_0 = BaseInlineDelete;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    ...{ 'onToggle': {} },
    variant: "undo",
    confirmText: (__VLS_ctx.resolvedConfirmText),
    tooltip: (__VLS_ctx.tooltip),
    timeout: (__VLS_ctx.timeout),
    disabled: (__VLS_ctx.disabled),
    icon: (__VLS_ctx.icon),
    iconClass: (__VLS_ctx.iconClass),
    buttonClass: (__VLS_ctx.buttonClass),
    capsuleClass: (__VLS_ctx.capsuleClass),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    ...{ 'onToggle': {} },
    variant: "undo",
    confirmText: (__VLS_ctx.resolvedConfirmText),
    tooltip: (__VLS_ctx.tooltip),
    timeout: (__VLS_ctx.timeout),
    disabled: (__VLS_ctx.disabled),
    icon: (__VLS_ctx.icon),
    iconClass: (__VLS_ctx.iconClass),
    buttonClass: (__VLS_ctx.buttonClass),
    capsuleClass: (__VLS_ctx.capsuleClass),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.confirm} */
    onConfirm: (...[$event]) => {
        return (__VLS_ctx.$emit('confirm'));
        // @ts-ignore
        [resolvedConfirmText, tooltip, timeout, disabled, icon, iconClass, buttonClass, capsuleClass, $emit,];
    },
};
const __VLS_7 = {
    /** @type {typeof __VLS_5.cancel} */
    onCancel: (...[$event]) => {
        return (__VLS_ctx.$emit('cancel'));
        // @ts-ignore
        [$emit,];
    },
};
const __VLS_8 = {
    /** @type {typeof __VLS_5.toggle} */
    onToggle: ((open) => __VLS_ctx.$emit('toggle', open)),
};
var __VLS_9;
var __VLS_3;
var __VLS_4;
// @ts-ignore
[$emit,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
