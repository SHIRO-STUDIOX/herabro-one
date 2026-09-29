import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { adminApiService } from '@/services/adminApiService';
const router = useRouter();
const mobile = ref('09120000000');
const password = ref('Admin@123456');
const loading = ref(false);
const errorMessage = ref('');
async function handleLogin() {
    errorMessage.value = '';
    loading.value = true;
    try {
        await adminApiService.login(mobile.value.trim(), password.value);
        router.push('/admin/dashboard');
    }
    catch (err) {
        errorMessage.value =
            err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.detail ||
                'اطلاعات ورود نامعتبر است یا ارتباط با سرویس ادمین برقرار نشد.';
    }
    finally {
        loading.value = false;
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen w-full bg-primary-1/30 flex items-center justify-center p-4 font-sans select-none" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-1/30']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full max-w-md bg-white-100 rounded-3xl border border-primary-8 p-8 flex flex-col gap-6 shadow-2xl text-right" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-center text-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-14 h-14 rounded-2xl bg-primary-100 text-white-100 flex items-center justify-center shadow-md" },
});
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:shield-keyhole-bold-duotone",
    ...{ class: "w-8 h-8 text-white-100" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:shield-keyhole-bold-duotone",
    ...{ class: "w-8 h-8 text-white-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-base sm:text-lg font-black text-primary-100 mt-2" },
});
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-xs text-primary-60" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3.5 bg-error-6 border border-error-12 rounded-xl text-xs text-error-100 font-bold flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['p-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-error-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-error-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-error-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        icon: "solar:danger-triangle-bold",
        ...{ class: "w-4 h-4 shrink-0" },
    }));
    const __VLS_7 = __VLS_6({
        icon: "solar:danger-triangle-bold",
        ...{ class: "w-4 h-4 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.errorMessage);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleLogin) },
    ...{ class: "flex flex-col gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
const __VLS_10 = BaseInput;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.mobile),
    title: "شماره همراه مدیر",
    placeholder: "مثلاً 09120000000",
    size: "lg",
    ...{ class: "font-mono text-center tracking-wider" },
    required: true,
    showStartIcon: true,
    startIcon: "solar:phone-bold-duotone",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.mobile),
    title: "شماره همراه مدیر",
    placeholder: "مثلاً 09120000000",
    size: "lg",
    ...{ class: "font-mono text-center tracking-wider" },
    required: true,
    showStartIcon: true,
    startIcon: "solar:phone-bold-duotone",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
const __VLS_15 = BaseInput;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    modelValue: (__VLS_ctx.password),
    type: "password",
    title: "رمز عبور ادمین",
    placeholder: "کلمه عبور امنیتی",
    size: "lg",
    ...{ class: "font-mono" },
    required: true,
    showStartIcon: true,
    startIcon: "solar:lock-keyhole-bold-duotone",
}));
const __VLS_17 = __VLS_16({
    modelValue: (__VLS_ctx.password),
    type: "password",
    title: "رمز عبور ادمین",
    placeholder: "کلمه عبور امنیتی",
    size: "lg",
    ...{ class: "font-mono" },
    required: true,
    showStartIcon: true,
    startIcon: "solar:lock-keyhole-bold-duotone",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pt-2" },
});
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
const __VLS_20 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    ...{ 'onClick': {} },
    size: "lg",
    variant: "primary",
    loading: (__VLS_ctx.loading),
    ...{ class: "w-full" },
    startIcon: "solar:login-2-bold",
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    size: "lg",
    variant: "primary",
    loading: (__VLS_ctx.loading),
    ...{ class: "w-full" },
    startIcon: "solar:login-2-bold",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_25;
const __VLS_26 = {
    /** @type {typeof __VLS_25.click} */
    onClick: (__VLS_ctx.handleLogin),
};
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
const { default: __VLS_27 } = __VLS_23.slots;
// @ts-ignore
[errorMessage, errorMessage, handleLogin, handleLogin, mobile, password, loading,];
var __VLS_23;
var __VLS_24;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-center pt-2 border-t border-primary-6" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    to: "/sandbox/admin-backoffice",
    ...{ class: "text-xs font-bold text-primary-80 hover:text-primary-100 hover:underline inline-flex items-center gap-1" },
}));
const __VLS_30 = __VLS_29({
    to: "/sandbox/admin-backoffice",
    ...{ class: "text-xs font-bold text-primary-80 hover:text-primary-100 hover:underline inline-flex items-center gap-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
const { default: __VLS_33 } = __VLS_31.slots;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    icon: "solar:test-tube-minimalistic-bold-duotone",
    ...{ class: "w-4 h-4" },
}));
const __VLS_36 = __VLS_35({
    icon: "solar:test-tube-minimalistic-bold-duotone",
    ...{ class: "w-4 h-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
// @ts-ignore
[];
var __VLS_31;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
