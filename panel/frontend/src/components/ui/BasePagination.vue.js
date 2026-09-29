import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import { toPersianNumber } from '@/utils/formatters';
const props = withDefaults(defineProps(), {
    currentPage: 1,
    pageSize: 25,
    totalCount: 0,
    entityName: 'مورد',
    pageSizeOptions: () => [
        { label: '۱۰ ردیف در صفحه', value: 10 },
        { label: '۲۵ ردیف در صفحه', value: 25 },
        { label: '۵۰ ردیف در صفحه', value: 50 },
        { label: '۱۰۰ ردیف در صفحه', value: 100 },
    ],
});
const emit = defineEmits();
// Pagination Range Calculation
const totalPages = computed(() => {
    return Math.max(1, Math.ceil(props.totalCount / props.pageSize));
});
const displayedRangeStart = computed(() => {
    if (props.totalCount === 0)
        return 0;
    return (props.currentPage - 1) * props.pageSize + 1;
});
const displayedRangeEnd = computed(() => {
    return Math.min(props.currentPage * props.pageSize, props.totalCount);
});
const paginationRange = computed(() => {
    const current = props.currentPage;
    const total = totalPages.value;
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
        return [1, 2, 3, '...', total];
    }
    if (current >= total - 2) {
        return [1, '...', total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
});
// Event Handlers
const handlePageChange = (page) => {
    if (page !== props.currentPage && page >= 1 && page <= totalPages.value) {
        emit('update:currentPage', page);
    }
};
const handlePageSizeChange = (size) => {
    if (size !== props.pageSize) {
        emit('update:pageSize', size);
    }
};
const __VLS_defaults = {
    currentPage: 1,
    pageSize: 25,
    totalCount: 0,
    entityName: 'مورد',
    pageSizeOptions: () => [
        { label: '۱۰ ردیف در صفحه', value: 10 },
        { label: '۲۵ ردیف در صفحه', value: 25 },
        { label: '۵۰ ردیف در صفحه', value: 50 },
        { label: '۱۰۰ ردیف در صفحه', value: 100 },
    ],
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
    ...{ class: "w-full min-h-14 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 overflow-visible bg-transparent py-4 lg:py-0" },
    'data-name': "BasePagination",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-visible']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-6 shrink-0 w-full lg:w-auto" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col-reverse']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-auto']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 w-full sm:w-auto min-w-[140px] sm:min-w-[160px]" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[140px]']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:min-w-[160px]']} */ ;
const __VLS_0 = BaseDropdown;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.pageSize),
    options: (__VLS_ctx.pageSizeOptions),
    placeholder: "تعداد ردیف در صفحه",
    size: "lg",
    title: "تعداد ردیف",
    titleState: "in",
    showStartIcon: (false),
    placement: "top",
    ...{ class: "w-full" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.pageSize),
    options: (__VLS_ctx.pageSizeOptions),
    placeholder: "تعداد ردیف در صفحه",
    size: "lg",
    title: "تعداد ردیف",
    titleState: "in",
    showStartIcon: (false),
    placement: "top",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.'update:modelValue'} */
    'onUpdate:modelValue': (__VLS_ctx.handlePageSizeChange),
};
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm font-semibold text-primary-80 font-dots-1 whitespace-nowrap" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
(__VLS_ctx.toPersianNumber(__VLS_ctx.displayedRangeStart));
(__VLS_ctx.toPersianNumber(__VLS_ctx.displayedRangeEnd));
(__VLS_ctx.toPersianNumber(__VLS_ctx.totalCount));
(__VLS_ctx.entityName);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-center gap-3 shrink-0 w-full lg:w-auto" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-auto']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-10 bg-white-80 border border-primary-6 rounded-[10px] p-2 flex items-center gap-1 font-dots-1" },
});
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
const __VLS_7 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    text: "صفحه بعدی",
}));
const __VLS_9 = __VLS_8({
    text: "صفحه بعدی",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.handlePageChange(__VLS_ctx.currentPage + 1));
            // @ts-ignore
            [pageSize, pageSizeOptions, handlePageSizeChange, toPersianNumber, toPersianNumber, toPersianNumber, displayedRangeStart, displayedRangeEnd, totalCount, entityName, handlePageChange, currentPage,];
        } },
    type: "button",
    disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
    ...{ class: "w-6 h-6 rounded-md border border-primary-6 flex items-center justify-center transition-all cursor-pointer outline-none hover:bg-primary-6 disabled:opacity-40 disabled:cursor-not-allowed text-primary-80" },
});
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    icon: "solar:alt-arrow-right-linear",
    ...{ class: "w-3.5 h-3.5" },
}));
const __VLS_15 = __VLS_14({
    icon: "solar:alt-arrow-right-linear",
    ...{ class: "w-3.5 h-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
// @ts-ignore
[currentPage, totalPages,];
var __VLS_10;
for (const [p, pIdx] of __VLS_vFor((__VLS_ctx.paginationRange))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
        key: (pIdx),
    });
    if (p === '...') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-6 h-6 flex items-center justify-center text-xs font-semibold text-primary-40 select-none" },
        });
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(p === '...'))
                        throw 0;
                    return (__VLS_ctx.handlePageChange(Number(p)));
                    // @ts-ignore
                    [handlePageChange, paginationRange,];
                } },
            type: "button",
            ...{ class: ([
                    'w-6 h-6 rounded-md text-sm font-semibold flex items-center justify-center transition-all cursor-pointer outline-none',
                    Number(p) === __VLS_ctx.currentPage
                        ? 'bg-secondary-100 text-white-100 shadow-xs'
                        : 'border border-primary-6 text-primary-60 hover:bg-primary-6 hover:text-primary-100',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        (__VLS_ctx.toPersianNumber(p));
    }
    // @ts-ignore
    [toPersianNumber, currentPage,];
}
const __VLS_18 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    text: "صفحه قبلی",
}));
const __VLS_20 = __VLS_19({
    text: "صفحه قبلی",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.handlePageChange(__VLS_ctx.currentPage - 1));
            // @ts-ignore
            [handlePageChange, currentPage,];
        } },
    type: "button",
    disabled: (__VLS_ctx.currentPage <= 1),
    ...{ class: "w-6 h-6 rounded-md border border-primary-6 flex items-center justify-center transition-all cursor-pointer outline-none hover:bg-primary-6 disabled:opacity-40 disabled:cursor-not-allowed text-primary-80" },
});
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    icon: "solar:alt-arrow-left-linear",
    ...{ class: "w-3.5 h-3.5" },
}));
const __VLS_26 = __VLS_25({
    icon: "solar:alt-arrow-left-linear",
    ...{ class: "w-3.5 h-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
// @ts-ignore
[currentPage,];
var __VLS_21;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
