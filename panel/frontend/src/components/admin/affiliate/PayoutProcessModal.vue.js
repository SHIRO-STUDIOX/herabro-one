import { reactive, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import { toPersianNumber } from '@/utils/formatters';
const props = defineProps();
const emit = defineEmits();
const form = reactive({
    amount_rial: 0,
    tracking_code: '',
    notes: '',
});
watch(() => props.partner, (p) => {
    if (p) {
        form.amount_rial = p.wallet_balance_rial;
        form.tracking_code = '';
        form.notes = '';
    }
}, { immediate: true });
const isFormValid = computed(() => {
    if (!props.partner)
        return false;
    return (form.amount_rial > 0 &&
        form.amount_rial <= props.partner.wallet_balance_rial &&
        form.tracking_code.trim().length >= 4);
});
function handleClose() {
    emit('update:modelValue', false);
}
function handleSubmit() {
    if (!props.partner || !isFormValid.value)
        return;
    emit('submit', {
        amount_rial: form.amount_rial,
        tracking_code: form.tracking_code.trim(),
        notes: form.notes.trim(),
    });
}
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "fade",
}));
const __VLS_8 = __VLS_7({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.modelValue && __VLS_ctx.partner) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.handleClose) },
        ...{ class: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/50 backdrop-blur-sm overflow-y-auto" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black-32/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "w-full max-w-[500px] my-auto bg-white-60 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 text-right select-none font-sans relative transition-all duration-300" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[500px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['my-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between w-full h-10 gap-6" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3 flex-1 min-w-0 h-10" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-10 h-10 min-w-10 min-h-10 rounded-full bg-success-6 text-success-100 border border-success-12 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-success-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-success-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-success-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        icon: "solar:card-send-bold-duotone",
        ...{ class: "w-5 h-5 shrink-0" },
    }));
    const __VLS_14 = __VLS_13({
        icon: "solar:card-send-bold-duotone",
        ...{ class: "w-5 h-5 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-start justify-center min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
    (__VLS_ctx.partner.name);
    const __VLS_17 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        text: "بستن",
    }));
    const __VLS_19 = __VLS_18({
        text: "بستن",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    const { default: __VLS_22 } = __VLS_20.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleClose) },
        type: "button",
        ...{ class: "w-6 h-6 min-w-[24px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none" },
    });
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        icon: "solar:close-circle-linear",
        ...{ class: "w-3.5 h-3.5" },
    }));
    const __VLS_25 = __VLS_24({
        icon: "solar:close-circle-linear",
        ...{ class: "w-3.5 h-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    // @ts-ignore
    [modelValue, partner, partner, handleClose, handleClose,];
    var __VLS_20;
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: "w-full bg-white-80 rounded-xl p-3 flex flex-col gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3 bg-white-100 border border-primary-6 rounded-xl flex flex-col gap-2 text-xs font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-black text-success-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-success-100']} */ ;
    (__VLS_ctx.toPersianNumber(__VLS_ctx.partner.wallet_balance_rial.toLocaleString('fa-IR')));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between border-t border-primary-6 pt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-bold text-primary-100 tracking-wider" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
    (__VLS_ctx.partner.sheba_number);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_28 = BaseInput;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        modelValue: (__VLS_ctx.form.amount_rial),
        modelModifiers: { number: true, },
        type: "number",
        title: "مبلغ حواله تسویه (ریال) *",
        placeholder: "مبلغ مورد نظر برای تسویه",
        ...{ class: "font-mono" },
        required: true,
    }));
    const __VLS_30 = __VLS_29({
        modelValue: (__VLS_ctx.form.amount_rial),
        modelModifiers: { number: true, },
        type: "number",
        title: "مبلغ حواله تسویه (ریال) *",
        placeholder: "مبلغ مورد نظر برای تسویه",
        ...{ class: "font-mono" },
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-3xs text-primary-40 mt-1 block font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-3xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_33 = BaseInput;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        modelValue: (__VLS_ctx.form.tracking_code),
        title: "شماره پیگیری تراکنش بانکی / فیش پایا *",
        placeholder: "مثلاً PAYA-982347102",
        ...{ class: "font-mono" },
        required: true,
    }));
    const __VLS_35 = __VLS_34({
        modelValue: (__VLS_ctx.form.tracking_code),
        title: "شماره پیگیری تراکنش بانکی / فیش پایا *",
        placeholder: "مثلاً PAYA-982347102",
        ...{ class: "font-mono" },
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "text-xs font-bold text-primary-80 mb-1.5 block font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        value: (__VLS_ctx.form.notes),
        rows: "2",
        placeholder: "توضیحات تکمیلی یا شماره نامه مالی...",
        ...{ class: "w-full p-2.5 rounded-xl border border-primary-12 bg-white-100 text-xs font-medium text-primary-100 placeholder:text-primary-40 outline-none focus:border-secondary-100 transition-colors resize-none font-dots-1" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:border-secondary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-end gap-2 w-full pt-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-0.5']} */ ;
    const __VLS_38 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "outline",
        size: "md",
        disabled: (__VLS_ctx.loading),
        ...{ class: "!w-[84px] text-xs font-semibold shrink-0" },
    }));
    const __VLS_40 = __VLS_39({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "outline",
        size: "md",
        disabled: (__VLS_ctx.loading),
        ...{ class: "!w-[84px] text-xs font-semibold shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    let __VLS_43;
    const __VLS_44 = {
        /** @type {typeof __VLS_43.click} */
        onClick: (__VLS_ctx.handleClose),
    };
    /** @type {__VLS_StyleScopedClasses['!w-[84px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const { default: __VLS_45 } = __VLS_41.slots;
    // @ts-ignore
    [partner, partner, handleClose, handleSubmit, toPersianNumber, form, form, form, loading,];
    var __VLS_41;
    var __VLS_42;
    const __VLS_46 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "fill",
        size: "md",
        loading: (__VLS_ctx.loading),
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.loading),
        showEndIcon: (!__VLS_ctx.loading),
        endIcon: "solar:card-send-bold",
        ...{ class: "!w-[130px] text-xs font-semibold shrink-0" },
    }));
    const __VLS_48 = __VLS_47({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "fill",
        size: "md",
        loading: (__VLS_ctx.loading),
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.loading),
        showEndIcon: (!__VLS_ctx.loading),
        endIcon: "solar:card-send-bold",
        ...{ class: "!w-[130px] text-xs font-semibold shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_51;
    const __VLS_52 = {
        /** @type {typeof __VLS_51.click} */
        onClick: (__VLS_ctx.handleSubmit),
    };
    /** @type {__VLS_StyleScopedClasses['!w-[130px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const { default: __VLS_53 } = __VLS_49.slots;
    // @ts-ignore
    [handleSubmit, loading, loading, loading, isFormValid,];
    var __VLS_49;
    var __VLS_50;
}
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
