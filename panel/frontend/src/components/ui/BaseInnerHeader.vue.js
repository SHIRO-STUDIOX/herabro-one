import { ref, computed, watch, onMounted, onUnmounted, useSlots, nextTick } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBreadcrumb from '@/components/ui/BaseBreadcrumb.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
const props = withDefaults(defineProps(), {
    title: '',
    parentTitle: '',
    parentPath: '',
    showHome: true,
    showSearch: true,
    modelValue: undefined,
    search: undefined,
    searchLabel: 'جستجو',
    searchTooltip: 'جستجو',
    searchPlaceholder: 'جستجو...',
    searchOpen: undefined,
    autoCollapseSearch: true,
    mobileFloatingSearch: true,
    floatingSearch: undefined,
    searchResults: () => [],
    searchLoading: false,
    searchEmptyText: 'موردی یافت نشد',
    showCreate: true,
    createLabel: 'ایجاد',
    createTooltip: 'ایجاد جدید',
    showFilter: true,
    filterLabel: 'فیلتر',
    filterTooltip: 'فیلترها',
    filterActive: false,
    filterOpen: undefined,
    showMenu: true,
    menuTooltip: 'عملیات بیشتر',
});
const emit = defineEmits();
const slots = useSlots();
const __VLS_slots = defineSlots();
const searchContainerRef = ref(null);
const searchInputRef = ref(null);
const mobileSearchInputRef = ref(null);
const floatingModalRef = ref(null);
const internalSearchQuery = ref('');
const internalSearchOpen = ref(false);
const isMobile = ref(false);
const checkMobile = () => {
    if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth < 640;
    }
};
const isFloatingActive = computed(() => {
    if (props.floatingSearch !== undefined) {
        return props.floatingSearch;
    }
    return props.mobileFloatingSearch && isMobile.value;
});
const searchQuery = computed({
    get: () => {
        if (props.modelValue !== undefined)
            return props.modelValue;
        if (props.search !== undefined)
            return props.search;
        return internalSearchQuery.value;
    },
    set: (val) => {
        internalSearchQuery.value = val;
        emit('update:modelValue', val);
        emit('update:search', val);
        emit('search', val);
    },
});
const filteredResults = computed(() => {
    if (!props.searchResults || props.searchResults.length === 0)
        return [];
    const query = searchQuery.value.trim().toLowerCase();
    if (!query)
        return props.searchResults;
    return props.searchResults.filter((item) => {
        const titleMatch = item.title ? item.title.toLowerCase().includes(query) : false;
        const subtitleMatch = item.subtitle ? item.subtitle.toLowerCase().includes(query) : false;
        const badgeMatch = item.badge ? item.badge.toLowerCase().includes(query) : false;
        return titleMatch || subtitleMatch || badgeMatch;
    });
});
const isSearchOpen = computed({
    get: () => (props.searchOpen !== undefined ? props.searchOpen : internalSearchOpen.value),
    set: (val) => {
        internalSearchOpen.value = val;
        emit('update:searchOpen', val);
        if (val) {
            emit('search-open');
            nextTick(() => {
                if (isFloatingActive.value) {
                    mobileSearchInputRef.value?.focus();
                }
                else {
                    searchInputRef.value?.focus();
                }
            });
        }
        else {
            emit('search-close');
        }
    },
});
watch(() => props.searchOpen, (val) => {
    if (val) {
        nextTick(() => {
            if (isFloatingActive.value) {
                mobileSearchInputRef.value?.focus();
            }
            else {
                searchInputRef.value?.focus();
            }
        });
    }
});
const openSearch = () => {
    isSearchOpen.value = true;
};
const closeSearch = () => {
    isSearchOpen.value = false;
};
const clearSearch = () => {
    searchQuery.value = '';
    emit('search-clear');
    nextTick(() => {
        if (isFloatingActive.value) {
            mobileSearchInputRef.value?.focus();
        }
        else {
            searchInputRef.value?.focus();
        }
    });
};
const handleSearchContainerClick = () => {
    if (!isSearchOpen.value) {
        openSearch();
    }
    else if (isFloatingActive.value) {
        closeSearch();
    }
};
const handleIconClick = () => {
    if (!isSearchOpen.value) {
        openSearch();
    }
    else {
        if (isFloatingActive.value) {
            closeSearch();
        }
        else {
            if (searchQuery.value) {
                emit('search-submit', searchQuery.value);
            }
            else {
                closeSearch();
            }
        }
    }
};
const handleSelectResult = (item) => {
    if (item.action) {
        item.action();
    }
    emit('select-result', item);
    closeSearch();
};
const handleEscKey = () => {
    if (searchQuery.value) {
        clearSearch();
    }
    else {
        closeSearch();
    }
};
const handleEnterKey = () => {
    emit('search-submit', searchQuery.value);
};
const filterContainerRef = ref(null);
const internalFilterOpen = ref(false);
const isFilterMenuOpen = computed({
    get: () => (props.filterOpen !== undefined ? props.filterOpen : internalFilterOpen.value),
    set: (val) => {
        internalFilterOpen.value = val;
        emit('update:filterOpen', val);
    },
});
const handleCreateClick = () => {
    emit('create');
};
const handleFilterClick = () => {
    if (slots['filter-menu']) {
        isFilterMenuOpen.value = !isFilterMenuOpen.value;
    }
    emit('filter');
};
const closeFilterMenu = () => {
    isFilterMenuOpen.value = false;
};
const handleClickOutside = (e) => {
    const target = e.target;
    if (isFilterMenuOpen.value &&
        filterContainerRef.value &&
        !filterContainerRef.value.contains(target)) {
        closeFilterMenu();
    }
    if (!isFloatingActive.value &&
        isSearchOpen.value &&
        props.autoCollapseSearch &&
        searchContainerRef.value &&
        !searchContainerRef.value.contains(target)) {
        if (!searchQuery.value) {
            closeSearch();
        }
    }
};
onMounted(() => {
    checkMobile();
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', checkMobile);
    }
    document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
    }
    document.removeEventListener('click', handleClickOutside);
});
const __VLS_defaults = {
    title: '',
    parentTitle: '',
    parentPath: '',
    showHome: true,
    showSearch: true,
    modelValue: undefined,
    search: undefined,
    searchLabel: 'جستجو',
    searchTooltip: 'جستجو',
    searchPlaceholder: 'جستجو...',
    searchOpen: undefined,
    autoCollapseSearch: true,
    mobileFloatingSearch: true,
    floatingSearch: undefined,
    searchResults: () => [],
    searchLoading: false,
    searchEmptyText: 'موردی یافت نشد',
    showCreate: true,
    createLabel: 'ایجاد',
    createTooltip: 'ایجاد جدید',
    showFilter: true,
    filterLabel: 'فیلتر',
    filterTooltip: 'فیلترها',
    filterActive: false,
    filterOpen: undefined,
    showMenu: true,
    menuTooltip: 'عملیات بیشتر',
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
    ...{ class: "flex items-center justify-between w-full gap-3" },
    'data-name': "Inner Header",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-w-0 flex-1" },
});
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
const __VLS_0 = BaseBreadcrumb;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    title: (__VLS_ctx.title),
    level: (__VLS_ctx.parentTitle ? 'two' : 'one'),
    parentTitle: (__VLS_ctx.parentTitle),
    parentPath: (__VLS_ctx.parentPath),
    showHome: (__VLS_ctx.showHome),
}));
const __VLS_2 = __VLS_1({
    title: (__VLS_ctx.title),
    level: (__VLS_ctx.parentTitle ? 'two' : 'one'),
    parentTitle: (__VLS_ctx.parentTitle),
    parentPath: (__VLS_ctx.parentPath),
    showHome: (__VLS_ctx.showHome),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5 shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalSlot(__VLS_slots.actions)({});
if (__VLS_ctx.showCreate) {
    const __VLS_6 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.createTooltip),
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.createTooltip),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleCreateClick) },
        type: "button",
        ...{ class: "group h-9 w-9 hover:w-[96px] hover:pe-3 min-h-9 rounded-full bg-primary-100 hover:bg-primary-80 active:scale-95 text-white-100 flex items-center justify-start transition-all duration-300 cursor-pointer outline-none shadow-xs overflow-hidden whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:w-[96px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:pe-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-9 h-9 min-w-9 min-h-9 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        icon: "solar:add-bold",
        ...{ class: "w-4.5 h-4.5" },
    }));
    const __VLS_14 = __VLS_13({
        icon: "solar:add-bold",
        ...{ class: "w-4.5 h-4.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden pointer-events-none" },
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
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    (__VLS_ctx.createLabel);
    // @ts-ignore
    [title, parentTitle, parentTitle, parentPath, showHome, showCreate, createTooltip, handleCreateClick, createLabel,];
    var __VLS_9;
}
if (__VLS_ctx.showSearch) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "searchContainerRef",
        ...{ class: "relative flex items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots.search)({
        isOpen: (__VLS_ctx.isSearchOpen),
        query: (__VLS_ctx.searchQuery),
        open: (__VLS_ctx.openSearch),
        close: (__VLS_ctx.closeSearch),
        clear: (__VLS_ctx.clearSearch),
    });
    const __VLS_18 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        text: (__VLS_ctx.searchTooltip),
        disabled: (__VLS_ctx.isSearchOpen && !__VLS_ctx.isFloatingActive),
    }));
    const __VLS_20 = __VLS_19({
        text: (__VLS_ctx.searchTooltip),
        disabled: (__VLS_ctx.isSearchOpen && !__VLS_ctx.isFloatingActive),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.handleSearchContainerClick) },
        ...{ class: "group h-9 min-h-9 rounded-full flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none overflow-hidden whitespace-nowrap cursor-pointer" },
        ...{ class: ([
                __VLS_ctx.isSearchOpen && !__VLS_ctx.isFloatingActive
                    ? 'w-52 sm:w-64 md:w-72 bg-white-100 border border-primary-12 shadow-xs ring-2 ring-primary-100/10 focus-within:border-secondary-100 focus-within:ring-secondary-100/20 text-primary-100 cursor-default'
                    : __VLS_ctx.isSearchOpen && __VLS_ctx.isFloatingActive
                        ? 'w-9 bg-white-100 border border-secondary-100 shadow-xs ring-2 ring-secondary-100/20 text-secondary-100'
                        : 'w-9 hover:w-[96px] hover:pe-3 bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100 active:scale-95'
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['ease-[cubic-bezier(0.16,1,0.3,1)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleIconClick) },
        type: "button",
        tabindex: (__VLS_ctx.isSearchOpen && !__VLS_ctx.isFloatingActive ? -1 : 0),
        'aria-label': (__VLS_ctx.searchTooltip),
        ...{ class: "w-9 h-9 min-w-9 min-h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer outline-none" },
        ...{ class: ([
                __VLS_ctx.isSearchOpen
                    ? 'text-secondary-100 -rotate-12 scale-105 hover:opacity-80'
                    : 'text-primary-80 group-hover:text-primary-100 group-hover:scale-110'
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        icon: (__VLS_ctx.isSearchOpen ? 'solar:magnifer-bold' : 'solar:magnifer-bold-duotone'),
        ...{ class: "w-4.5 h-4.5 shrink-0 transition-transform duration-300" },
    }));
    const __VLS_26 = __VLS_25({
        icon: (__VLS_ctx.isSearchOpen ? 'solar:magnifer-bold' : 'solar:magnifer-bold-duotone'),
        ...{ class: "w-4.5 h-4.5 shrink-0 transition-transform duration-300" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    if (!__VLS_ctx.isSearchOpen) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden pointer-events-none" },
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
        /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
        (__VLS_ctx.searchLabel);
    }
    else if (!__VLS_ctx.isFloatingActive) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: () => { } },
            ...{ class: "flex-1 min-w-0 flex items-center h-full pe-1 transition-opacity duration-200" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['pe-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onKeydown: (__VLS_ctx.handleEscKey) },
            ...{ onKeydown: (__VLS_ctx.handleEnterKey) },
            ref: "searchInputRef",
            value: (__VLS_ctx.searchQuery),
            type: "text",
            placeholder: (__VLS_ctx.searchPlaceholder),
            ...{ class: "w-full h-full bg-transparent border-none outline-none text-xs font-sans text-primary-100 placeholder:text-primary-40 ps-0.5 pe-1 select-text" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['placeholder:text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['ps-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['pe-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-text']} */ ;
        if (__VLS_ctx.searchQuery) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (__VLS_ctx.clearSearch) },
                type: "button",
                ...{ class: "w-5 h-5 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-80 hover:bg-primary-6 active:scale-90 transition-all shrink-0 mx-0.5 outline-none cursor-pointer" },
                title: "پاک کردن متن",
            });
            /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-primary-80']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-primary-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['mx-0.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            let __VLS_29;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
                icon: "solar:close-circle-bold",
                ...{ class: "w-3.5 h-3.5" },
            }));
            const __VLS_31 = __VLS_30({
                icon: "solar:close-circle-bold",
                ...{ class: "w-3.5 h-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_30));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.closeSearch) },
            type: "button",
            ...{ class: "w-6 h-6 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-100 hover:bg-primary-12 active:scale-90 transition-all shrink-0 outline-none cursor-pointer me-1" },
            title: "بستن جستجو (Esc)",
        });
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['me-1']} */ ;
        let __VLS_34;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
            icon: "solar:close-circle-linear",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_36 = __VLS_35({
            icon: "solar:close-circle-linear",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    }
    // @ts-ignore
    [showSearch, isSearchOpen, isSearchOpen, isSearchOpen, isSearchOpen, isSearchOpen, isSearchOpen, isSearchOpen, isSearchOpen, searchQuery, searchQuery, searchQuery, openSearch, closeSearch, closeSearch, clearSearch, clearSearch, searchTooltip, searchTooltip, isFloatingActive, isFloatingActive, isFloatingActive, isFloatingActive, isFloatingActive, handleSearchContainerClick, handleIconClick, searchLabel, handleEscKey, handleEnterKey, searchPlaceholder,];
    var __VLS_21;
}
if (__VLS_ctx.showFilter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "filterContainerRef",
        ...{ class: "relative" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    const __VLS_39 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        text: (__VLS_ctx.filterTooltip),
    }));
    const __VLS_41 = __VLS_40({
        text: (__VLS_ctx.filterTooltip),
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleFilterClick) },
        type: "button",
        ...{ class: "group h-9 w-9 hover:w-[96px] hover:pe-3 min-h-9 rounded-full flex items-center justify-start transition-all duration-300 cursor-pointer outline-none active:scale-95 overflow-hidden whitespace-nowrap" },
        ...{ class: (__VLS_ctx.filterActive || __VLS_ctx.isFilterMenuOpen
                ? 'bg-secondary-100 text-white-100 shadow-xs ring-1 ring-secondary-100/30'
                : 'bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100') },
    });
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:w-[96px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:pe-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-9 h-9 min-w-9 min-h-9 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        icon: "solar:filter-bold-duotone",
        ...{ class: "w-4.5 h-4.5" },
    }));
    const __VLS_47 = __VLS_46({
        icon: "solar:filter-bold-duotone",
        ...{ class: "w-4.5 h-4.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden pointer-events-none" },
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
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    (__VLS_ctx.filterLabel);
    // @ts-ignore
    [showFilter, filterTooltip, handleFilterClick, filterActive, isFilterMenuOpen, filterLabel,];
    var __VLS_42;
    let __VLS_50;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
        name: "dropdown",
    }));
    const __VLS_52 = __VLS_51({
        name: "dropdown",
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    const { default: __VLS_55 } = __VLS_53.slots;
    if (__VLS_ctx.$slots['filter-menu'] && __VLS_ctx.isFilterMenuOpen) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute left-0 top-full mt-2 bg-white-100 border border-primary-8 rounded-2xl p-1.5 shadow-card z-50 select-none font-sans text-right" },
            dir: "rtl",
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        __VLS_asFunctionalSlot(__VLS_slots['filter-menu'])({
            close: (__VLS_ctx.closeFilterMenu),
            isOpen: (__VLS_ctx.isFilterMenuOpen),
        });
    }
    // @ts-ignore
    [isFilterMenuOpen, isFilterMenuOpen, $slots, closeFilterMenu,];
    var __VLS_53;
}
if (__VLS_ctx.showMenu) {
    const __VLS_57 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        text: (__VLS_ctx.menuTooltip),
    }));
    const __VLS_59 = __VLS_58({
        text: (__VLS_ctx.menuTooltip),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    const { default: __VLS_62 } = __VLS_60.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showMenu))
                    throw 0;
                return (__VLS_ctx.$emit('menu'));
                // @ts-ignore
                [showMenu, menuTooltip, $emit,];
            } },
        type: "button",
        ...{ class: "w-9 h-9 min-w-9 min-h-9 rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none" },
    });
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-9']} */ ;
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
    let __VLS_63;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        icon: "solar:menu-dots-bold",
        ...{ class: "w-4.5 h-4.5" },
    }));
    const __VLS_65 = __VLS_64({
        icon: "solar:menu-dots-bold",
        ...{ class: "w-4.5 h-4.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    // @ts-ignore
    [];
    var __VLS_60;
}
__VLS_asFunctionalSlot(__VLS_slots.extra)({});
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    to: "body",
}));
const __VLS_71 = __VLS_70({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    name: "floating-search",
}));
const __VLS_77 = __VLS_76({
    name: "floating-search",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
if (__VLS_ctx.isSearchOpen && __VLS_ctx.isFloatingActive) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "fixed inset-0 z-[9999] flex flex-col items-center justify-start p-3 sm:p-6" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-[9999]']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:p-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.closeSearch) },
        ...{ class: "fixed inset-0 bg-black-32/50 backdrop-blur-sm transition-opacity" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black-32/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ref: "floatingModalRef",
        ...{ class: "relative z-10 w-full max-w-md bg-white-80 backdrop-blur-xl border border-primary-8 rounded-2xl shadow-card overflow-hidden flex flex-col max-h-[75vh] transition-all font-sans" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-[75vh]']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2.5 p-3 sm:p-3.5 border-b border-primary-8 bg-white-60 backdrop-blur-md" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:p-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center shrink-0 border bg-primary-6 text-secondary-100 border-primary-12 shadow-2xs" },
    });
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[36px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    let __VLS_81;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
        icon: "solar:magnifer-bold-duotone",
        ...{ class: "w-4.5 h-4.5" },
    }));
    const __VLS_83 = __VLS_82({
        icon: "solar:magnifer-bold-duotone",
        ...{ class: "w-4.5 h-4.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onKeydown: (__VLS_ctx.closeSearch) },
        ...{ onKeydown: (__VLS_ctx.handleEnterKey) },
        ref: "mobileSearchInputRef",
        value: (__VLS_ctx.searchQuery),
        type: "text",
        placeholder: (__VLS_ctx.searchPlaceholder || 'جستجو در این بخش...'),
        ...{ class: "flex-1 min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm font-sans text-primary-100 placeholder:text-primary-40 select-text" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-text']} */ ;
    if (__VLS_ctx.searchLoading) {
        let __VLS_86;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
            icon: "solar:restart-bold",
            ...{ class: "w-4 h-4 text-primary-40 animate-spin shrink-0" },
        }));
        const __VLS_88 = __VLS_87({
            icon: "solar:restart-bold",
            ...{ class: "w-4 h-4 text-primary-40 animate-spin shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_87));
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    }
    if (__VLS_ctx.searchQuery) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.clearSearch) },
            type: "button",
            ...{ class: "w-6 h-6 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-80 active:scale-90 transition-all shrink-0 outline-none cursor-pointer" },
            title: "پاک کردن متن",
        });
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['active:scale-90']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        let __VLS_91;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
            icon: "solar:close-circle-bold",
            ...{ class: "w-4 h-4" },
        }));
        const __VLS_93 = __VLS_92({
            icon: "solar:close-circle-bold",
            ...{ class: "w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_92));
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.closeSearch) },
        type: "button",
        ...{ class: "w-7 h-7 min-w-[28px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shrink-0" },
        title: "بستن (Esc)",
    });
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[28px]']} */ ;
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
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_96;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
        icon: "solar:close-circle-linear",
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_98 = __VLS_97({
        icon: "solar:close-circle-linear",
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-y-auto max-h-[50vh] p-2 flex flex-col gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-[50vh]']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    __VLS_asFunctionalSlot(__VLS_slots['search-results'])({
        results: (__VLS_ctx.filteredResults),
        query: (__VLS_ctx.searchQuery),
        close: (__VLS_ctx.closeSearch),
        select: (__VLS_ctx.handleSelectResult),
    });
    if (__VLS_ctx.filteredResults.length > 0) {
        for (const [item] of __VLS_vFor((__VLS_ctx.filteredResults))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isSearchOpen && __VLS_ctx.isFloatingActive))
                            throw 0;
                        if (!(__VLS_ctx.filteredResults.length > 0))
                            throw 0;
                        return (__VLS_ctx.handleSelectResult(item));
                        // @ts-ignore
                        [isSearchOpen, searchQuery, searchQuery, searchQuery, closeSearch, closeSearch, closeSearch, closeSearch, clearSearch, isFloatingActive, handleEnterKey, searchPlaceholder, searchLoading, filteredResults, filteredResults, filteredResults, handleSelectResult, handleSelectResult,];
                    } },
                key: (item.id),
                type: "button",
                ...{ class: "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-6 active:bg-primary-12 transition-all cursor-pointer group text-right outline-none" },
            });
            /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-primary-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['active:bg-primary-12']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['group']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center gap-2.5 min-w-0 flex-1" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "w-7 h-7 min-w-[28px] rounded-lg bg-primary-6 border border-primary-12 text-primary-80 group-hover:text-secondary-100 group-hover:bg-secondary-100/10 group-hover:border-secondary-100/20 flex items-center justify-center shrink-0 transition-colors" },
            });
            /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-[28px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
            /** @type {__VLS_StyleScopedClasses['border']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:text-secondary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:bg-secondary-100/10']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:border-secondary-100/20']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            let __VLS_102;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
                icon: (item.icon || 'solar:document-text-bold-duotone'),
                ...{ class: "w-4 h-4 shrink-0 transition-transform group-hover:scale-105" },
            }));
            const __VLS_104 = __VLS_103({
                icon: (item.icon || 'solar:document-text-bold-duotone'),
                ...{ class: "w-4 h-4 shrink-0 transition-transform group-hover:scale-105" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_103));
            /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:scale-105']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex flex-col min-w-0 flex-1" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs font-bold text-primary-100 truncate group-hover:text-secondary-100 transition-colors" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:text-secondary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            (item.title);
            if (item.subtitle) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "text-2xs text-primary-40 truncate mt-0.5" },
                });
                /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
                /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
                /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
                /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
                (item.subtitle);
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center gap-2 shrink-0" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            if (item.badge) {
                const __VLS_107 = BaseBadge || BaseBadge;
                // @ts-ignore
                const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
                    size: "2xs",
                    type: (item.badgeType || 'secondary'),
                }));
                const __VLS_109 = __VLS_108({
                    size: "2xs",
                    type: (item.badgeType || 'secondary'),
                }, ...__VLS_functionalComponentArgsRest(__VLS_108));
                const { default: __VLS_112 } = __VLS_110.slots;
                (item.badge);
                // @ts-ignore
                [];
                var __VLS_110;
            }
            let __VLS_113;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({
                icon: "solar:alt-arrow-left-linear",
                ...{ class: "w-3.5 h-3.5 text-primary-24 group-hover:text-secondary-100 group-hover:-translate-x-0.5 transition-all" },
            }));
            const __VLS_115 = __VLS_114({
                icon: "solar:alt-arrow-left-linear",
                ...{ class: "w-3.5 h-3.5 text-primary-24 group-hover:text-secondary-100 group-hover:-translate-x-0.5 transition-all" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_114));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-24']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:text-secondary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:-translate-x-0.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            // @ts-ignore
            [];
        }
    }
    else if (__VLS_ctx.searchQuery) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col items-center justify-center py-8 px-4 text-center text-primary-40" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        let __VLS_118;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
            icon: "solar:magnifer-bold-duotone",
            ...{ class: "w-9 h-9 mb-1.5 opacity-40 text-primary-40" },
        }));
        const __VLS_120 = __VLS_119({
            icon: "solar:magnifer-bold-duotone",
            ...{ class: "w-9 h-9 mb-1.5 opacity-40 text-primary-40" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_119));
        /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs font-bold text-primary-80" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        (__VLS_ctx.searchEmptyText);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-3xs text-primary-40 mt-1 font-dots-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-3xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col items-center justify-center py-7 px-4 text-center text-primary-40" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        let __VLS_123;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
            icon: "solar:magnifer-bold-duotone",
            ...{ class: "w-8 h-8 mb-1.5 text-secondary-100 opacity-40" },
        }));
        const __VLS_125 = __VLS_124({
            icon: "solar:magnifer-bold-duotone",
            ...{ class: "w-8 h-8 mb-1.5 text-secondary-100 opacity-40" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_124));
        /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-secondary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs font-medium text-primary-60" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-3xs text-primary-40 mt-0.5" },
        });
        /** @type {__VLS_StyleScopedClasses['text-3xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    }
    if (__VLS_ctx.filteredResults.length > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "px-3.5 py-2 bg-primary-4/80 border-t border-primary-8 flex items-center justify-between text-3xs text-primary-40 font-dots-1" },
        });
        /** @type {__VLS_StyleScopedClasses['px-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-4/80']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-3xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "flex items-center gap-1.5" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "w-1.5 h-1.5 rounded-full bg-secondary-100" },
        });
        /** @type {__VLS_StyleScopedClasses['w-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-secondary-100']} */ ;
        (__VLS_ctx.filteredResults.length);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "font-mono text-primary-40" },
        });
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    }
}
// @ts-ignore
[searchQuery, filteredResults, filteredResults, searchEmptyText,];
var __VLS_78;
// @ts-ignore
[];
var __VLS_72;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
