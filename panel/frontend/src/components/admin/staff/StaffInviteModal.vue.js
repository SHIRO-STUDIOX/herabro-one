import { reactive, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const props = defineProps();
const emit = defineEmits();
const form = reactive({
    mobile: '',
    username: '',
    first_name: '',
    password: '',
    role: 'SUPPORT_AGENT',
});
const roleOptions = [
    { value: 'SUPER_ADMIN', label: 'راهبر ارشد سیستم (Super Admin - دسترسی کامل)' },
    { value: 'SUPPORT_AGENT', label: 'کارشناس پشتیبانی (Support Agent - جعل هویت و نظارت)' },
    { value: 'SALES_MANAGER', label: 'مدیر فروش (Sales Manager - کدهای تخفیف و افیلیت)' },
];
const isFormValid = computed(() => {
    return (form.mobile.trim().length >= 10 &&
        form.username.trim().length >= 3 &&
        form.password.length >= 8 &&
        Boolean(form.role));
});
watch(() => props.modelValue, (val) => {
    if (val) {
        form.mobile = '';
        form.username = '';
        form.first_name = '';
        form.password = '';
        form.role = 'SUPPORT_AGENT';
    }
});
function handleClose() {
    emit('update:modelValue', false);
}
function handleSubmit() {
    if (!isFormValid.value)
        return;
    emit('submit', {
        mobile: form.mobile.trim(),
        username: form.username.trim().toLowerCase(),
        first_name: form.first_name.trim(),
        password: form.password,
        role: form.role,
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
if (__VLS_ctx.modelValue) {
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
        ...{ class: "w-10 h-10 min-w-10 min-h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-secondary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-secondary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        icon: "solar:user-plus-bold-duotone",
        ...{ class: "w-5 h-5 shrink-0" },
    }));
    const __VLS_14 = __VLS_13({
        icon: "solar:user-plus-bold-duotone",
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
    [modelValue, handleClose, handleClose,];
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_28 = BaseInput;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        modelValue: (__VLS_ctx.form.mobile),
        title: "شماره همراه جهت ورود به پنل *",
        placeholder: "مثلاً 09121234567",
        ...{ class: "font-mono" },
        required: true,
    }));
    const __VLS_30 = __VLS_29({
        modelValue: (__VLS_ctx.form.mobile),
        title: "شماره همراه جهت ورود به پنل *",
        placeholder: "مثلاً 09121234567",
        ...{ class: "font-mono" },
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    const __VLS_33 = BaseInput;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        modelValue: (__VLS_ctx.form.username),
        title: "نام کاربری (انگلیسی) *",
        placeholder: "مثلاً support_2",
        ...{ class: "font-mono" },
        required: true,
    }));
    const __VLS_35 = __VLS_34({
        modelValue: (__VLS_ctx.form.username),
        title: "نام کاربری (انگلیسی) *",
        placeholder: "مثلاً support_2",
        ...{ class: "font-mono" },
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    const __VLS_38 = BaseInput;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
        modelValue: (__VLS_ctx.form.first_name),
        title: "نام و نام خانوادگی",
        placeholder: "مثلاً علی رضایی",
    }));
    const __VLS_40 = __VLS_39({
        modelValue: (__VLS_ctx.form.first_name),
        title: "نام و نام خانوادگی",
        placeholder: "مثلاً علی رضایی",
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_43 = BaseInput;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
        modelValue: (__VLS_ctx.form.password),
        type: "password",
        title: "کلمه عبور ورود *",
        placeholder: "حداقل ۸ کاراکتر امن",
        required: true,
    }));
    const __VLS_45 = __VLS_44({
        modelValue: (__VLS_ctx.form.password),
        type: "password",
        title: "کلمه عبور ورود *",
        placeholder: "حداقل ۸ کاراکتر امن",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
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
    const __VLS_48 = BaseSelect;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        modelValue: (__VLS_ctx.form.role),
        options: (__VLS_ctx.roleOptions),
        placeholder: "انتخاب نقش",
        size: "md",
    }));
    const __VLS_50 = __VLS_49({
        modelValue: (__VLS_ctx.form.role),
        options: (__VLS_ctx.roleOptions),
        placeholder: "انتخاب نقش",
        size: "md",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-end gap-2 w-full pt-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-0.5']} */ ;
    const __VLS_53 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "outline",
        size: "md",
        disabled: (__VLS_ctx.loading),
        ...{ class: "!w-[84px] text-xs font-semibold shrink-0" },
    }));
    const __VLS_55 = __VLS_54({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "outline",
        size: "md",
        disabled: (__VLS_ctx.loading),
        ...{ class: "!w-[84px] text-xs font-semibold shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    let __VLS_58;
    const __VLS_59 = {
        /** @type {typeof __VLS_58.click} */
        onClick: (__VLS_ctx.handleClose),
    };
    /** @type {__VLS_StyleScopedClasses['!w-[84px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const { default: __VLS_60 } = __VLS_56.slots;
    // @ts-ignore
    [handleClose, handleSubmit, form, form, form, form, form, roleOptions, loading,];
    var __VLS_56;
    var __VLS_57;
    const __VLS_61 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "fill",
        size: "md",
        loading: (__VLS_ctx.loading),
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.loading),
        showEndIcon: (!__VLS_ctx.loading),
        endIcon: "solar:check-read-bold",
        ...{ class: "!w-[130px] text-xs font-semibold shrink-0" },
    }));
    const __VLS_63 = __VLS_62({
        ...{ 'onClick': {} },
        type: "primary",
        styleType: "fill",
        size: "md",
        loading: (__VLS_ctx.loading),
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.loading),
        showEndIcon: (!__VLS_ctx.loading),
        endIcon: "solar:check-read-bold",
        ...{ class: "!w-[130px] text-xs font-semibold shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    let __VLS_66;
    const __VLS_67 = {
        /** @type {typeof __VLS_66.click} */
        onClick: (__VLS_ctx.handleSubmit),
    };
    /** @type {__VLS_StyleScopedClasses['!w-[130px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const { default: __VLS_68 } = __VLS_64.slots;
    // @ts-ignore
    [handleSubmit, loading, loading, loading, isFormValid,];
    var __VLS_64;
    var __VLS_65;
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
