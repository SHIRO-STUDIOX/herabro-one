import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSwitch from '@/components/ui/BaseSwitch.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import FeatureMatrixTable from '@/components/subscription/FeatureMatrixTable.vue';
import PlanModuleDropZone from './PlanModuleDropZone.vue';
import PlanBillingCyclesTable from './PlanBillingCyclesTable.vue';
import PlanPreviewCard from './PlanPreviewCard.vue';
import { PLAN_DEFINITIONS } from '@/types/subscription';
const previewMode = ref('card');
const props = defineProps();
const emit = defineEmits();
const currentPlan = reactive({
    id: undefined,
    slug: 'shop-standard',
    title: 'پلن استاندارد مغازه و فروشگاه',
    description: 'کامل‌ترین بسته برای فروشگاه‌ها و اصناف با قابلیت انبارداری و اتصال به کارتخوان',
    is_featured: true,
    featured_badge_text: 'پیشنهاد ویژه اصناف',
    max_invoices_monthly: null,
    max_warehouses: 5,
    max_users: 5,
    max_cheques: null,
    active_features_json: ['sales', 'inventory', 'pos_integration', 'tax_system', 'multi_user'],
    billing_cycles: [
        { months_count: 1, base_price_rial: 9900000, discount_percent: 0, final_price_rial: 9900000 },
        { months_count: 3, base_price_rial: 29700000, discount_percent: 10, final_price_rial: 26730000 },
        { months_count: 6, base_price_rial: 59400000, discount_percent: 15, final_price_rial: 50490000 },
        { months_count: 12, base_price_rial: 118800000, discount_percent: 20, final_price_rial: 95040000 },
    ],
    is_active: true,
});
function selectPlan(plan) {
    Object.assign(currentPlan, JSON.parse(JSON.stringify(plan)));
}
function initNewPlan() {
    currentPlan.id = undefined;
    currentPlan.slug = '';
    currentPlan.title = '';
    currentPlan.description = '';
    currentPlan.is_featured = false;
    currentPlan.featured_badge_text = '';
    currentPlan.max_invoices_monthly = 500;
    currentPlan.max_warehouses = 1;
    currentPlan.max_users = 1;
    currentPlan.max_cheques = 20;
    currentPlan.active_features_json = ['sales'];
    currentPlan.billing_cycles = [
        { months_count: 1, base_price_rial: 5000000, discount_percent: 0, final_price_rial: 5000000 },
        { months_count: 3, base_price_rial: 15000000, discount_percent: 10, final_price_rial: 13500000 },
        { months_count: 12, base_price_rial: 60000000, discount_percent: 20, final_price_rial: 48000000 },
    ];
    currentPlan.is_active = true;
}
function onFeaturedToggle(val) {
    if (val && currentPlan.id) {
        emit('setFeatured', currentPlan.id, currentPlan.featured_badge_text || '');
    }
}
function savePlan() {
    emit('save', JSON.parse(JSON.stringify(currentPlan)));
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex flex-col gap-6 font-sans select-none text-right" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-10 h-10 rounded-xl bg-primary-6 text-primary-100 flex items-center justify-center shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:layers-minimalistic-bold-duotone",
    ...{ class: "w-5 h-5 text-primary-100" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:layers-minimalistic-bold-duotone",
    ...{ class: "w-5 h-5 text-primary-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-sm font-extrabold text-primary-100" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs text-primary-60" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
for (const [p] of __VLS_vFor((__VLS_ctx.existingPlans))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                return (__VLS_ctx.selectPlan(p));
                // @ts-ignore
                [existingPlans, selectPlan,];
            } },
        key: (p.id),
        type: "button",
        ...{ class: "px-3 py-1.5 rounded-xl border text-xs font-bold transition-all" },
        ...{ class: (__VLS_ctx.currentPlan.slug === p.slug ? 'bg-primary-100 text-white-100 border-primary-100' : 'bg-primary-1/40 border-primary-8 text-primary-80 hover:bg-primary-6') },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    if (p.is_featured) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ml-1 text-warning-100" },
        });
        /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-warning-100']} */ ;
    }
    (p.title);
    // @ts-ignore
    [currentPlan,];
}
const __VLS_5 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    size: "sm",
    variant: "secondary",
    startIcon: "solar:add-circle-linear",
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    size: "sm",
    variant: "secondary",
    startIcon: "solar:add-circle-linear",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
const __VLS_11 = {
    /** @type {typeof __VLS_10.click} */
    onClick: (__VLS_ctx.initNewPlan),
};
const { default: __VLS_12 } = __VLS_8.slots;
// @ts-ignore
[initNewPlan,];
var __VLS_8;
var __VLS_9;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "lg:col-span-8 flex flex-col gap-5" },
});
/** @type {__VLS_StyleScopedClasses['lg:col-span-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col gap-4 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between border-b border-primary-6 pb-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-extrabold text-primary-80" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-bold" },
    ...{ class: (__VLS_ctx.currentPlan.is_featured ? 'text-primary-100' : 'text-primary-60') },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
const __VLS_13 = BaseSwitch;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.is_featured),
    size: "md",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.is_featured),
    size: "md",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
const __VLS_19 = {
    /** @type {typeof __VLS_18.'update:modelValue'} */
    'onUpdate:modelValue': (__VLS_ctx.onFeaturedToggle),
};
var __VLS_16;
var __VLS_17;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
const __VLS_20 = BaseInput;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.currentPlan.title),
    title: "عنوان پلن تجاری",
    placeholder: "مثلاً پلن استاندارد مغازه و فروشگاه",
    required: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.currentPlan.title),
    title: "عنوان پلن تجاری",
    placeholder: "مثلاً پلن استاندارد مغازه و فروشگاه",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_25 = BaseInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.currentPlan.slug),
    title: "شناسه انگلیسی یکتا (Slug)",
    placeholder: "مثلاً shop-standard",
    ...{ class: "font-mono" },
    required: true,
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.currentPlan.slug),
    title: "شناسه انگلیسی یکتا (Slug)",
    placeholder: "مثلاً shop-standard",
    ...{ class: "font-mono" },
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
const __VLS_30 = BaseInput;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.currentPlan.featured_badge_text),
    title: "متن روبان / نشان برگزیده (اختیاری)",
    placeholder: "مثلاً پیشنهاد ویژه اصناف",
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.currentPlan.featured_badge_text),
    title: "متن روبان / نشان برگزیده (اختیاری)",
    placeholder: "مثلاً پیشنهاد ویژه اصناف",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const __VLS_35 = BaseInput;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    modelValue: (__VLS_ctx.currentPlan.description),
    title: "توضیح کوتاه ویترین خریدار",
    placeholder: "توضیح کاربرد پلن برای مشتریان...",
}));
const __VLS_37 = __VLS_36({
    modelValue: (__VLS_ctx.currentPlan.description),
    title: "توضیح کوتاه ویترین خریدار",
    placeholder: "توضیح کاربرد پلن برای مشتریان...",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col gap-4 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-extrabold text-primary-80" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 sm:grid-cols-4 gap-3" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const __VLS_40 = BaseInput;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_invoices_monthly ?? undefined),
    type: "number",
    title: "فاکتور ماهانه",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}));
const __VLS_42 = __VLS_41({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_invoices_monthly ?? undefined),
    type: "number",
    title: "فاکتور ماهانه",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
const __VLS_46 = {
    /** @type {typeof __VLS_45.'update:modelValue'} */
    'onUpdate:modelValue': (...[$event]) => {
        return (__VLS_ctx.currentPlan.max_invoices_monthly = $event ? Number($event) : null);
        // @ts-ignore
        [currentPlan, currentPlan, currentPlan, currentPlan, currentPlan, currentPlan, currentPlan, currentPlan, onFeaturedToggle,];
    },
};
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
var __VLS_43;
var __VLS_44;
const __VLS_47 = BaseInput;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_warehouses ?? undefined),
    type: "number",
    title: "تعداد انبارها",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}));
const __VLS_49 = __VLS_48({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_warehouses ?? undefined),
    type: "number",
    title: "تعداد انبارها",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
const __VLS_53 = {
    /** @type {typeof __VLS_52.'update:modelValue'} */
    'onUpdate:modelValue': (...[$event]) => {
        return (__VLS_ctx.currentPlan.max_warehouses = $event ? Number($event) : null);
        // @ts-ignore
        [currentPlan, currentPlan,];
    },
};
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
var __VLS_50;
var __VLS_51;
const __VLS_54 = BaseInput;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_users ?? undefined),
    type: "number",
    title: "کاربران همزمان",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}));
const __VLS_56 = __VLS_55({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_users ?? undefined),
    type: "number",
    title: "کاربران همزمان",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
let __VLS_59;
const __VLS_60 = {
    /** @type {typeof __VLS_59.'update:modelValue'} */
    'onUpdate:modelValue': (...[$event]) => {
        return (__VLS_ctx.currentPlan.max_users = $event ? Number($event) : null);
        // @ts-ignore
        [currentPlan, currentPlan,];
    },
};
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
var __VLS_57;
var __VLS_58;
const __VLS_61 = BaseInput;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_cheques ?? undefined),
    type: "number",
    title: "سقف چک‌ها",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}));
const __VLS_63 = __VLS_62({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.max_cheques ?? undefined),
    type: "number",
    title: "سقف چک‌ها",
    placeholder: "نامحدود",
    ...{ class: "font-mono" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
let __VLS_66;
const __VLS_67 = {
    /** @type {typeof __VLS_66.'update:modelValue'} */
    'onUpdate:modelValue': (...[$event]) => {
        return (__VLS_ctx.currentPlan.max_cheques = $event ? Number($event) : null);
        // @ts-ignore
        [currentPlan, currentPlan,];
    },
};
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
var __VLS_64;
var __VLS_65;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 bg-white-100 rounded-2xl border border-primary-6 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
const __VLS_68 = PlanModuleDropZone;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.active_features_json || []),
}));
const __VLS_70 = __VLS_69({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentPlan.active_features_json || []),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_73;
const __VLS_74 = {
    /** @type {typeof __VLS_73.'update:modelValue'} */
    'onUpdate:modelValue': (...[$event]) => {
        return (__VLS_ctx.currentPlan.active_features_json = $event);
        // @ts-ignore
        [currentPlan, currentPlan,];
    },
};
var __VLS_71;
var __VLS_72;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 bg-white-100 rounded-2xl border border-primary-6 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
const __VLS_75 = PlanBillingCyclesTable;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    ...{ 'onUpdate:cycles': {} },
    cycles: (__VLS_ctx.currentPlan.billing_cycles || []),
}));
const __VLS_77 = __VLS_76({
    ...{ 'onUpdate:cycles': {} },
    cycles: (__VLS_ctx.currentPlan.billing_cycles || []),
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
let __VLS_80;
const __VLS_81 = {
    /** @type {typeof __VLS_80.'update:cycles'} */
    'onUpdate:cycles': (...[$event]) => {
        return (__VLS_ctx.currentPlan.billing_cycles = $event);
        // @ts-ignore
        [currentPlan, currentPlan,];
    },
};
var __VLS_78;
var __VLS_79;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-end gap-3 p-4 bg-white-100 rounded-2xl border border-primary-6 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
const __VLS_82 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    ...{ 'onClick': {} },
    size: "md",
    variant: "secondary",
}));
const __VLS_84 = __VLS_83({
    ...{ 'onClick': {} },
    size: "md",
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
let __VLS_87;
const __VLS_88 = {
    /** @type {typeof __VLS_87.click} */
    onClick: (__VLS_ctx.initNewPlan),
};
const { default: __VLS_89 } = __VLS_85.slots;
// @ts-ignore
[initNewPlan,];
var __VLS_85;
var __VLS_86;
const __VLS_90 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    ...{ 'onClick': {} },
    size: "md",
    variant: "primary",
    loading: (__VLS_ctx.saving),
    startIcon: "solar:disk-bold-duotone",
}));
const __VLS_92 = __VLS_91({
    ...{ 'onClick': {} },
    size: "md",
    variant: "primary",
    loading: (__VLS_ctx.saving),
    startIcon: "solar:disk-bold-duotone",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
let __VLS_95;
const __VLS_96 = {
    /** @type {typeof __VLS_95.click} */
    onClick: (__VLS_ctx.savePlan),
};
const { default: __VLS_97 } = __VLS_93.slots;
// @ts-ignore
[saving, savePlan,];
var __VLS_93;
var __VLS_94;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "lg:col-span-4 sticky top-6 flex flex-col gap-3" },
});
/** @type {__VLS_StyleScopedClasses['lg:col-span-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between p-1 bg-white-80 border border-primary-8 rounded-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.previewMode = 'card');
            // @ts-ignore
            [previewMode,];
        } },
    type: "button",
    ...{ class: "flex-1 py-1 px-2.5 rounded-full text-2xs font-bold transition-all cursor-pointer" },
    ...{ class: (__VLS_ctx.previewMode === 'card' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100') },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.previewMode = 'matrix');
            // @ts-ignore
            [previewMode, previewMode,];
        } },
    type: "button",
    ...{ class: "flex-1 py-1 px-2.5 rounded-full text-2xs font-bold transition-all cursor-pointer" },
    ...{ class: (__VLS_ctx.previewMode === 'matrix' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100') },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
if (__VLS_ctx.previewMode === 'card') {
    const __VLS_98 = PlanPreviewCard;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
        plan: (__VLS_ctx.currentPlan),
    }));
    const __VLS_100 = __VLS_99({
        plan: (__VLS_ctx.currentPlan),
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full bg-white-100 border border-primary-8 rounded-2xl p-3 shadow-2xs overflow-x-auto" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    const __VLS_103 = FeatureMatrixTable;
    // @ts-ignore
    const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
        plans: (__VLS_ctx.PLAN_DEFINITIONS),
    }));
    const __VLS_105 = __VLS_104({
        plans: (__VLS_ctx.PLAN_DEFINITIONS),
    }, ...__VLS_functionalComponentArgsRest(__VLS_104));
}
// @ts-ignore
[currentPlan, previewMode, previewMode, PLAN_DEFINITIONS,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
