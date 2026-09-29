import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import BaseInlineDelete from '@/components/ui/BaseInlineDelete.vue';
import { toPersianNumber } from '@/utils/formatters';
import { semanticColors, } from '@/views/sandbox/BadgeSandboxView.vue';
const props = withDefaults(defineProps(), {
    modelValue: () => [],
    badges: () => [],
    title: 'الصاق برچسب',
    allowCreate: true,
    getUsageCount: () => 0,
});
const emit = defineEmits();
const activeDeleteBadgeId = ref(null);
const editingBadgeId = ref(null);
// Open / Close state
const isOpen = ref(false);
const containerRef = ref(null);
const triggerRef = ref(null);
const dropdownMenuRef = ref(null);
const searchInputRef = ref(null);
const createTitleInputRef = ref(null);
// Position state for floating popover
const dropdownPositionStyle = ref({});
// Search & Create states
const searchQuery = ref('');
const isCreating = ref(false);
const newBadgeTitle = ref('');
const newBadgeColor = ref('primary');
// Local copy of selections
const selectedBadgeIds = ref([...props.modelValue]);
// Badges list progressive blur scroll state
const badgesListScrollRef = ref(null);
const showTopListFade = ref(false);
const showBottomListFade = ref(false);
const updateBadgesListScrollState = () => {
    const el = badgesListScrollRef.value;
    if (!el) {
        showTopListFade.value = false;
        showBottomListFade.value = false;
        return;
    }
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 4) {
        showTopListFade.value = false;
        showBottomListFade.value = false;
        return;
    }
    showTopListFade.value = el.scrollTop > 4;
    showBottomListFade.value = el.scrollTop < max - 4;
};
watch(() => props.modelValue, (newVal) => {
    selectedBadgeIds.value = [...newVal];
}, { deep: true });
const isBadgeSelected = (badgeId) => selectedBadgeIds.value.includes(badgeId);
const toggleBadge = (badgeId) => {
    const index = selectedBadgeIds.value.indexOf(badgeId);
    if (index >= 0) {
        selectedBadgeIds.value.splice(index, 1);
    }
    else {
        selectedBadgeIds.value.push(badgeId);
    }
    emit('update:modelValue', [...selectedBadgeIds.value]);
    emit('change', [...selectedBadgeIds.value]);
};
const clearAllSelections = () => {
    selectedBadgeIds.value = [];
    emit('update:modelValue', []);
    emit('change', []);
};
const getColorOption = (key) => {
    return semanticColors.find((c) => c.key === key) ?? semanticColors[0];
};
// Exactly preserves the standard badge size and dashed styling
const getBadgeClasses = (colorKey) => {
    const opt = getColorOption(colorKey);
    return `!h-6 !px-2.5 text-xs font-bold font-dots-1 leading-none ${opt.outlineClass}`;
};
const getUsage = (badgeId) => {
    return props.getUsageCount(badgeId);
};
const filteredBadges = computed(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q)
        return props.badges;
    return props.badges.filter((b) => b.title.toLowerCase().includes(q));
});
watch(filteredBadges, () => {
    nextTick(() => {
        updateBadgesListScrollState();
        setTimeout(updateBadgesListScrollState, 80);
    });
});
const validationError = computed(() => {
    if (!newBadgeTitle.value)
        return '';
    const t = newBadgeTitle.value.trim();
    if (t.length < 2)
        return 'عنوان برچسب باید حداقل ۲ کاراکتر باشد';
    if (t.length > 24)
        return 'حداکثر طول مجاز ۲۴ کاراکتر است';
    if (props.badges.some((b) => b.id !== editingBadgeId.value && b.title.trim().toLowerCase() === t.toLowerCase())) {
        return 'این عنوان قبلاً ثبت شده است';
    }
    return '';
});
const isQuickCreateValid = computed(() => {
    const t = newBadgeTitle.value.trim();
    return (t.length >= 2 &&
        t.length <= 24 &&
        !props.badges.some((b) => b.id !== editingBadgeId.value && b.title.trim().toLowerCase() === t.toLowerCase()));
});
const toggleCreateMode = () => {
    isCreating.value = !isCreating.value;
    if (isCreating.value) {
        editingBadgeId.value = null;
        newBadgeTitle.value = '';
        newBadgeColor.value = 'primary';
        nextTick(() => {
            createTitleInputRef.value?.focus();
        });
    }
    else {
        editingBadgeId.value = null;
    }
};
const handleEditBadge = (badge) => {
    editingBadgeId.value = badge.id;
    newBadgeTitle.value = badge.title;
    newBadgeColor.value = badge.color;
    isCreating.value = true;
    emit('edit-badge', badge);
    nextTick(() => {
        createTitleInputRef.value?.focus();
    });
};
const handleDeleteBadge = (badge) => {
    const selIdx = selectedBadgeIds.value.indexOf(badge.id);
    if (selIdx >= 0) {
        selectedBadgeIds.value.splice(selIdx, 1);
        emit('update:modelValue', [...selectedBadgeIds.value]);
        emit('change', [...selectedBadgeIds.value]);
    }
    emit('delete-badge', badge.id);
};
const handleQuickSaveBadge = () => {
    if (!isQuickCreateValid.value)
        return;
    const title = newBadgeTitle.value.trim();
    const color = newBadgeColor.value;
    if (editingBadgeId.value) {
        emit('update-badge', { id: editingBadgeId.value, title, color });
        editingBadgeId.value = null;
    }
    else {
        emit('create-badge', { title, color });
    }
    newBadgeTitle.value = '';
    isCreating.value = false;
};
// Positioning logic with dynamic measurement
const updatePosition = () => {
    if (!triggerRef.value)
        return;
    const rect = triggerRef.value.getBoundingClientRect();
    const menuWidth = dropdownMenuRef.value?.offsetWidth || 320;
    const menuHeight = dropdownMenuRef.value?.offsetHeight || 320;
    const spacing = 6;
    let top = rect.bottom + spacing;
    let left = rect.right - menuWidth;
    // Boundaries check
    if (left < 10)
        left = 10;
    if (left + menuWidth > window.innerWidth - 10) {
        left = window.innerWidth - menuWidth - 10;
    }
    // If opening downwards overflows the bottom of screen, open upwards
    if (top + menuHeight > window.innerHeight - 10 && rect.top > menuHeight + spacing) {
        top = rect.top - menuHeight - spacing;
    }
    dropdownPositionStyle.value = {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
    };
};
const toggleDropdown = () => {
    if (isOpen.value) {
        closeDropdown();
    }
    else {
        openDropdown();
    }
};
const openDropdown = () => {
    selectedBadgeIds.value = [...props.modelValue];
    searchQuery.value = '';
    isCreating.value = false;
    updatePosition();
    isOpen.value = true;
    nextTick(() => {
        updatePosition();
        updateBadgesListScrollState();
        searchInputRef.value?.focus();
    });
};
const closeDropdown = () => {
    isOpen.value = false;
    isCreating.value = false;
};
const confirmAndClose = () => {
    closeDropdown();
};
// Click outside handler
const handleClickOutside = (e) => {
    if (!isOpen.value)
        return;
    const target = e.target;
    if (containerRef.value?.contains(target) ||
        dropdownMenuRef.value?.contains(target)) {
        return;
    }
    closeDropdown();
};
// Handle scroll/resize for popover
const handleScrollOrResize = () => {
    if (isOpen.value) {
        updatePosition();
    }
};
onMounted(() => {
    document.addEventListener('click', handleClickOutside, true);
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
});
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside, true);
    window.removeEventListener('resize', handleScrollOrResize);
    window.removeEventListener('scroll', handleScrollOrResize);
});
const __VLS_defaults = {
    modelValue: () => [],
    badges: () => [],
    title: 'الصاق برچسب',
    allowCreate: true,
    getUsageCount: () => 0,
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
/** @type {__VLS_StyleScopedClasses['no-scrollbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "containerRef",
    ...{ class: "relative inline-block text-right font-sans select-none" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.toggleDropdown) },
    ref: "triggerRef",
    ...{ class: "inline-flex items-center" },
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
var __VLS_0 = {
    isOpen: (__VLS_ctx.isOpen),
    toggle: (__VLS_ctx.toggleDropdown),
    hasBadges: (__VLS_ctx.modelValue.length > 0),
};
const __VLS_2 = BaseTooltip || BaseTooltip;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
    text: (__VLS_ctx.isOpen
        ? 'بستن'
        : (__VLS_ctx.modelValue.length > 0 ? 'ویرایش برچسب‌ها' : 'الصاق برچسب')),
}));
const __VLS_4 = __VLS_3({
    text: (__VLS_ctx.isOpen
        ? 'بستن'
        : (__VLS_ctx.modelValue.length > 0 ? 'ویرایش برچسب‌ها' : 'الصاق برچسب')),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
const { default: __VLS_7 } = __VLS_5.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "w-6 h-6 rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 border border-primary-12 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shrink-0" },
    ...{ class: ({ 'bg-primary-12 text-primary-100 ring-2 ring-primary-16': __VLS_ctx.isOpen }) },
    'aria-label': (__VLS_ctx.modelValue.length > 0 ? 'ویرایش برچسب‌ها' : 'الصاق برچسب'),
});
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-12']} */ ;
/** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-primary-16']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    icon: (__VLS_ctx.isOpen
        ? 'solar:close-circle-linear'
        : (__VLS_ctx.modelValue.length > 0 ? 'solar:pen-linear' : 'solar:add-linear')),
    ...{ class: "w-3.5 h-3.5" },
}));
const __VLS_10 = __VLS_9({
    icon: (__VLS_ctx.isOpen
        ? 'solar:close-circle-linear'
        : (__VLS_ctx.modelValue.length > 0 ? 'solar:pen-linear' : 'solar:add-linear')),
    ...{ class: "w-3.5 h-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
// @ts-ignore
[toggleDropdown, toggleDropdown, isOpen, isOpen, isOpen, isOpen, modelValue, modelValue, modelValue, modelValue,];
var __VLS_5;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    to: "body",
}));
const __VLS_15 = __VLS_14({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    name: "dropdown-popover",
}));
const __VLS_21 = __VLS_20({
    name: "dropdown-popover",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ref: "dropdownMenuRef",
        ...{ style: (__VLS_ctx.dropdownPositionStyle) },
        ...{ class: "fixed z-[9999] w-80 max-w-[calc(100vw-24px)] bg-white-80 backdrop-blur-xl border border-primary-12 rounded-2xl p-2.5 shadow-xl flex flex-col gap-2 text-right font-sans select-none transition-all duration-200" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-[9999]']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[calc(100vw-24px)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1.5 min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        icon: "solar:tag-bold-duotone",
        ...{ class: "w-4 h-4 text-primary-100 shrink-0" },
    }));
    const __VLS_27 = __VLS_26({
        icon: "solar:tag-bold-duotone",
        ...{ class: "w-4 h-4 text-primary-100 shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-bold text-primary-100 font-dots-1 truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (__VLS_ctx.title);
    if (__VLS_ctx.selectedBadgeIds.length > 0) {
        const __VLS_30 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
            type: "primary",
            styleType: "soft",
            size: "2xs",
            ...{ class: "font-mono font-bold shrink-0" },
        }));
        const __VLS_32 = __VLS_31({
            type: "primary",
            styleType: "soft",
            size: "2xs",
            ...{ class: "font-mono font-bold shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        const { default: __VLS_35 } = __VLS_33.slots;
        (__VLS_ctx.toPersianNumber(__VLS_ctx.selectedBadgeIds.length));
        // @ts-ignore
        [isOpen, dropdownPositionStyle, title, selectedBadgeIds, selectedBadgeIds, toPersianNumber,];
        var __VLS_33;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.closeDropdown) },
        type: "button",
        ...{ class: "w-5 h-5 rounded-full bg-primary-8 hover:bg-primary-16 active:scale-95 text-primary-70 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shrink-0" },
        title: "بستن",
    });
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-70']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3 h-3" },
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2.2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M18 6 6 18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "m6 6 12 12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1.5 w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative flex-1" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ref: "searchInputRef",
        value: (__VLS_ctx.searchQuery),
        type: "text",
        placeholder: "جستجوی برچسب...",
        ...{ class: "w-full h-8 pr-7 pl-2 text-xs font-medium rounded-xl bg-white-100 border border-primary-12 text-primary-100 placeholder:text-[11px] placeholder:font-normal placeholder:text-primary-40 outline-none focus:border-primary-80 focus:ring-1 focus:ring-primary-12 transition-all" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['pr-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:text-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:font-normal']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:border-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:ring-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute right-2 top-2 text-primary-40 pointer-events-none" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    let __VLS_36;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        icon: "solar:magnifer-linear",
        ...{ class: "w-3.5 h-3.5" },
    }));
    const __VLS_38 = __VLS_37({
        icon: "solar:magnifer-linear",
        ...{ class: "w-3.5 h-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    if (__VLS_ctx.searchQuery) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        throw 0;
                    if (!(__VLS_ctx.searchQuery))
                        throw 0;
                    return (__VLS_ctx.searchQuery = '');
                    // @ts-ignore
                    [closeDropdown, searchQuery, searchQuery, searchQuery,];
                } },
            type: "button",
            ...{ class: "absolute left-2 top-2 text-primary-40 hover:text-primary-80 cursor-pointer" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['left-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        let __VLS_41;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
            icon: "solar:close-circle-linear",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_43 = __VLS_42({
            icon: "solar:close-circle-linear",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_42));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    }
    const __VLS_46 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        text: (__VLS_ctx.isCreating ? 'بستن فرم' : 'ساخت برچسب جدید'),
    }));
    const __VLS_48 = __VLS_47({
        text: (__VLS_ctx.isCreating ? 'بستن فرم' : 'ساخت برچسب جدید'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    const { default: __VLS_51 } = __VLS_49.slots;
    if (__VLS_ctx.allowCreate) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.toggleCreateMode) },
            type: "button",
            'aria-label': "ساخت برچسب جدید",
            ...{ class: "group h-8 w-8 hover:w-[78px] min-h-8 rounded-full active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer outline-none overflow-hidden whitespace-nowrap shrink-0" },
            ...{ class: ([
                    __VLS_ctx.isCreating
                        ? 'bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100 border border-primary-12 shadow-none'
                        : 'bg-primary-100 hover:bg-primary-80 text-white-100 shadow-xs',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['group']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:w-[78px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        let __VLS_52;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
            icon: (__VLS_ctx.isCreating ? 'solar:alt-arrow-up-linear' : 'solar:add-bold'),
            ...{ class: "w-4 h-4 shrink-0" },
        }));
        const __VLS_54 = __VLS_53({
            icon: (__VLS_ctx.isCreating ? 'solar:alt-arrow-up-linear' : 'solar:add-bold'),
            ...{ class: "w-4 h-4 shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['max-w-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:max-w-16']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:ms-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        (__VLS_ctx.isCreating ? 'بستن' : 'افزودن');
    }
    // @ts-ignore
    [isCreating, isCreating, isCreating, isCreating, allowCreate, toggleCreateMode,];
    var __VLS_49;
    let __VLS_57;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        name: "expand-fast",
    }));
    const __VLS_59 = __VLS_58({
        name: "expand-fast",
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    const { default: __VLS_62 } = __VLS_60.slots;
    if (__VLS_ctx.isCreating) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-full p-2.5 rounded-xl bg-white-60 border border-primary-8 flex flex-col gap-2 font-sans" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col gap-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-between" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10.5px] font-semibold text-primary-70" },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10.5px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-70']} */ ;
        (__VLS_ctx.editingBadgeId ? 'ویرایش عنوان برچسب' : 'عنوان برچسب');
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "font-mono text-[9px] font-semibold text-primary-40 leading-none" },
        });
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[9px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
        (__VLS_ctx.toPersianNumber(__VLS_ctx.newBadgeTitle.length));
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onKeydown: (__VLS_ctx.handleQuickSaveBadge) },
            ref: "createTitleInputRef",
            value: (__VLS_ctx.newBadgeTitle),
            type: "text",
            minlength: "2",
            maxlength: "24",
            placeholder: "عنوان برچسب را وارد کنید...",
            ...{ class: "w-full h-8 px-2.5 text-xs rounded-lg bg-white-100 border text-primary-100 placeholder:text-[10.5px] placeholder:font-normal placeholder:text-primary-40 outline-none transition-colors border-primary-12 focus:border-primary-80 focus:ring-1 focus:ring-primary-6" },
            ...{ class: ([
                    __VLS_ctx.validationError
                        ? '!border-error-100 focus:!ring-1 focus:!ring-error-12'
                        : '',
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['placeholder:text-[10.5px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['placeholder:font-normal']} */ ;
        /** @type {__VLS_StyleScopedClasses['placeholder:text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:border-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-primary-6']} */ ;
        if (__VLS_ctx.validationError) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-[9.5px] text-error-100 font-medium font-dots-1 leading-tight pt-0.5" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[9.5px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-error-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
            /** @type {__VLS_StyleScopedClasses['pt-0.5']} */ ;
            (__VLS_ctx.validationError);
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-[9px] text-primary-40 font-dots-1 leading-tight pt-0.5" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[9px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
            /** @type {__VLS_StyleScopedClasses['pt-0.5']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-between pt-0.5" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['pt-0.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-1.5" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        for (const [color] of __VLS_vFor((__VLS_ctx.semanticColors))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isOpen))
                            throw 0;
                        if (!(__VLS_ctx.isCreating))
                            throw 0;
                        return (__VLS_ctx.newBadgeColor = color.key);
                        // @ts-ignore
                        [toPersianNumber, isCreating, editingBadgeId, newBadgeTitle, newBadgeTitle, handleQuickSaveBadge, validationError, validationError, validationError, semanticColors, newBadgeColor,];
                    } },
                key: (color.key),
                type: "button",
                ...{ class: "w-5.5 h-5.5 rounded-full border border-black-12 cursor-pointer transition-all flex items-center justify-center outline-none shrink-0" },
                ...{ class: ([
                        color.bgClass,
                        'hover:scale-110 active:scale-95',
                        __VLS_ctx.newBadgeColor === color.key
                            ? 'ring-2 ring-offset-1 ring-primary-100 scale-105 shadow-xs'
                            : 'opacity-85 hover:opacity-100',
                    ]) },
                title: (color.label),
            });
            /** @type {__VLS_StyleScopedClasses['w-5.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-5.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['border']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-black-12']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:scale-110']} */ ;
            /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
            if (__VLS_ctx.newBadgeColor === color.key) {
                let __VLS_63;
                /** @ts-ignore @type { | typeof __VLS_components.Icon} */
                Icon;
                // @ts-ignore
                const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
                    icon: "solar:check-bold",
                    ...{ class: "w-2.5 h-2.5 text-white-100" },
                }));
                const __VLS_65 = __VLS_64({
                    icon: "solar:check-bold",
                    ...{ class: "w-2.5 h-2.5 text-white-100" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_64));
                /** @type {__VLS_StyleScopedClasses['w-2.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['h-2.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
            }
            // @ts-ignore
            [newBadgeColor, newBadgeColor,];
        }
        const __VLS_68 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
            text: (__VLS_ctx.editingBadgeId ? 'ذخیره تغییرات' : 'افزودن برچسب'),
        }));
        const __VLS_70 = __VLS_69({
            text: (__VLS_ctx.editingBadgeId ? 'ذخیره تغییرات' : 'افزودن برچسب'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        const { default: __VLS_73 } = __VLS_71.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.handleQuickSaveBadge) },
            type: "button",
            'aria-label': (__VLS_ctx.editingBadgeId ? 'ذخیره تغییرات' : 'افزودن برچسب'),
            disabled: (!__VLS_ctx.isQuickCreateValid),
            ...{ class: "w-7 h-7 rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none border border-primary-12 disabled:opacity-30 disabled:pointer-events-none shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
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
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['disabled:opacity-30']} */ ;
        /** @type {__VLS_StyleScopedClasses['disabled:pointer-events-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        let __VLS_74;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
            icon: "solar:check-bold",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_76 = __VLS_75({
            icon: "solar:check-bold",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_75));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
        (__VLS_ctx.editingBadgeId ? 'ذخیره' : 'افزودن');
        // @ts-ignore
        [editingBadgeId, editingBadgeId, editingBadgeId, handleQuickSaveBadge, isQuickCreateValid,];
        var __VLS_71;
    }
    // @ts-ignore
    [];
    var __VLS_60;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative w-full overflow-hidden rounded-xl" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    let __VLS_79;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        name: "fade",
    }));
    const __VLS_81 = __VLS_80({
        name: "fade",
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    const { default: __VLS_84 } = __VLS_82.slots;
    if (__VLS_ctx.showTopListFade) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "pointer-events-none absolute inset-x-0 top-0 z-10 rounded-t-xl overflow-hidden" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-t-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-6 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)]" },
        });
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['backdrop-blur-[6px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['[mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)]']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "absolute inset-0 h-full w-full bg-gradient-to-b from-white-80 via-white-60/80 to-transparent" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
        /** @type {__VLS_StyleScopedClasses['from-white-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['via-white-60/80']} */ ;
        /** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
    }
    // @ts-ignore
    [showTopListFade,];
    var __VLS_82;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onScroll: (__VLS_ctx.updateBadgesListScrollState) },
        ref: "badgesListScrollRef",
        ...{ class: "flex flex-col gap-0.5 max-h-52 overflow-y-auto no-scrollbar py-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-52']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['no-scrollbar']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
    for (const [badge] of __VLS_vFor((__VLS_ctx.filteredBadges))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        throw 0;
                    return (__VLS_ctx.toggleBadge(badge.id));
                    // @ts-ignore
                    [updateBadgesListScrollState, filteredBadges, toggleBadge,];
                } },
            key: (badge.id),
            ...{ class: "flex items-center justify-between p-1.5 px-2 rounded-xl hover:bg-primary-6/60 transition-colors duration-150 group cursor-pointer" },
            ...{ class: (__VLS_ctx.isBadgeSelected(badge.id) ? 'bg-primary-6/50' : '') },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary-6/60']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
        /** @type {__VLS_StyleScopedClasses['group']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-2.5 cursor-pointer flex-1 min-w-0" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
        const __VLS_85 = BaseCheckbox;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
            ...{ 'onClick': {} },
            modelValue: (__VLS_ctx.isBadgeSelected(badge.id)),
        }));
        const __VLS_87 = __VLS_86({
            ...{ 'onClick': {} },
            modelValue: (__VLS_ctx.isBadgeSelected(badge.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
        let __VLS_90;
        const __VLS_91 = {
            /** @type {typeof __VLS_90.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    throw 0;
                return (__VLS_ctx.toggleBadge(badge.id));
                // @ts-ignore
                [toggleBadge, isBadgeSelected, isBadgeSelected,];
            },
        };
        var __VLS_88;
        var __VLS_89;
        const __VLS_92 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
            type: (__VLS_ctx.getColorOption(badge.color).badgeType),
            styleType: "soft",
            size: "sm",
            borderStyle: "dashed",
            ...{ class: (__VLS_ctx.getBadgeClasses(badge.color)) },
        }));
        const __VLS_94 = __VLS_93({
            type: (__VLS_ctx.getColorOption(badge.color).badgeType),
            styleType: "soft",
            size: "sm",
            borderStyle: "dashed",
            ...{ class: (__VLS_ctx.getBadgeClasses(badge.color)) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        const { default: __VLS_97 } = __VLS_95.slots;
        (badge.title);
        // @ts-ignore
        [getColorOption, getBadgeClasses,];
        var __VLS_95;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: () => { } },
            ...{ class: "flex items-center gap-1 shrink-0 transition-opacity" },
            ...{ class: (__VLS_ctx.activeDeleteBadgeId === badge.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100') },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
        const __VLS_98 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
            text: "ویرایش برچسب",
        }));
        const __VLS_100 = __VLS_99({
            text: "ویرایش برچسب",
        }, ...__VLS_functionalComponentArgsRest(__VLS_99));
        const { default: __VLS_103 } = __VLS_101.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        throw 0;
                    return (__VLS_ctx.handleEditBadge(badge));
                    // @ts-ignore
                    [activeDeleteBadgeId, handleEditBadge,];
                } },
            type: "button",
            'aria-label': "ویرایش برچسب",
            ...{ class: "w-6 h-6 min-w-[24px] rounded-full bg-primary-6 hover:bg-secondary-8 text-primary-80 hover:text-secondary-100 active:scale-90 flex items-center justify-center transition-all cursor-pointer outline-none shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-[24px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-secondary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-secondary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        let __VLS_104;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
            icon: "solar:pen-bold-duotone",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_106 = __VLS_105({
            icon: "solar:pen-bold-duotone",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_105));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        // @ts-ignore
        [];
        var __VLS_101;
        const __VLS_109 = BaseInlineDelete;
        // @ts-ignore
        const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
            ...{ 'onToggle': {} },
            ...{ 'onConfirm': {} },
            tooltip: "حذف برچسب",
            confirmText: "حذف؟",
            timeout: (3000),
        }));
        const __VLS_111 = __VLS_110({
            ...{ 'onToggle': {} },
            ...{ 'onConfirm': {} },
            tooltip: "حذف برچسب",
            confirmText: "حذف؟",
            timeout: (3000),
        }, ...__VLS_functionalComponentArgsRest(__VLS_110));
        let __VLS_114;
        const __VLS_115 = {
            /** @type {typeof __VLS_114.toggle} */
            onToggle: ((isOpen) => (__VLS_ctx.activeDeleteBadgeId = isOpen ? badge.id : null)),
        };
        const __VLS_116 = {
            /** @type {typeof __VLS_114.confirm} */
            onConfirm: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    throw 0;
                return (__VLS_ctx.handleDeleteBadge(badge));
                // @ts-ignore
                [activeDeleteBadgeId, handleDeleteBadge,];
            },
        };
        var __VLS_112;
        var __VLS_113;
        // @ts-ignore
        [];
    }
    if (__VLS_ctx.filteredBadges.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "py-4 text-center text-primary-40 text-2xs font-dots-1" },
        });
        /** @type {__VLS_StyleScopedClasses['py-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    }
    let __VLS_117;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
        name: "fade",
    }));
    const __VLS_119 = __VLS_118({
        name: "fade",
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    const { default: __VLS_122 } = __VLS_120.slots;
    if (__VLS_ctx.showBottomListFade) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "pointer-events-none absolute inset-x-0 bottom-0 z-10 rounded-b-xl overflow-hidden" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-b-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-6 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_20%,transparent_95%)]" },
        });
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['backdrop-blur-[6px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['[mask-image:linear-gradient(to_top,black_20%,transparent_95%)]']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "absolute inset-0 h-full w-full bg-gradient-to-t from-white-80 via-white-60/80 to-transparent" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
        /** @type {__VLS_StyleScopedClasses['from-white-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['via-white-60/80']} */ ;
        /** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
    }
    // @ts-ignore
    [filteredBadges, showBottomListFade,];
    var __VLS_120;
    if (__VLS_ctx.selectedBadgeIds.length > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-end pt-1 w-full text-2xs font-sans" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.clearAllSelections) },
            type: "button",
            ...{ class: "group inline-flex items-center cursor-pointer outline-none active:scale-95 transition-all" },
            title: "لغو انتخاب برچسب‌ها",
        });
        /** @type {__VLS_StyleScopedClasses['group']} */ ;
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        const __VLS_123 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
            type: "error",
            styleType: "soft",
            size: "xs",
            showStartIcon: true,
            startIcon: "solar:trash-bin-minimalistic-linear",
            ...{ class: "cursor-pointer border border-error-12 group-hover:bg-error-12 group-hover:border-error-24 transition-colors font-medium !px-2 !h-5" },
        }));
        const __VLS_125 = __VLS_124({
            type: "error",
            styleType: "soft",
            size: "xs",
            showStartIcon: true,
            startIcon: "solar:trash-bin-minimalistic-linear",
            ...{ class: "cursor-pointer border border-error-12 group-hover:bg-error-12 group-hover:border-error-24 transition-colors font-medium !px-2 !h-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_124));
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-error-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:bg-error-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:border-error-24']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['!px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['!h-5']} */ ;
        const { default: __VLS_128 } = __VLS_126.slots;
        // @ts-ignore
        [selectedBadgeIds, clearAllSelections,];
        var __VLS_126;
    }
}
// @ts-ignore
[];
var __VLS_22;
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
