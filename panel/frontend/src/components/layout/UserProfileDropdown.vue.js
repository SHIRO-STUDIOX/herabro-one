import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import BaseDropdownItem from '@/components/ui/BaseDropdownItem.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import { useAuthStore } from '@/stores/auth';
const props = withDefaults(defineProps(), {
    mode: 'dropdown',
    isOpen: undefined,
    userName: '',
    userFullName: '',
    userPhone: '',
    userAvatar: '',
    isDark: false,
});
const emit = defineEmits();
const authStore = useAuthStore();
const containerRef = ref(null);
// Internal open state for uncontrolled usage
const localIsOpen = ref(false);
const internalIsOpen = computed({
    get: () => (props.isOpen !== undefined ? props.isOpen : localIsOpen.value),
    set: (val) => {
        localIsOpen.value = val;
        emit('update:isOpen', val);
    },
});
// Internal dark state
const localIsDark = ref(props.isDark);
watch(() => props.isDark, (val) => {
    localIsDark.value = val;
});
const internalIsDark = computed({
    get: () => (props.isDark !== undefined ? props.isDark : localIsDark.value),
    set: (val) => {
        localIsDark.value = val;
        emit('update:isDark', val);
    },
});
// Name & Phone computations
const displayShortName = computed(() => {
    if (props.userName)
        return props.userName;
    if (authStore.currentUser?.lastName)
        return authStore.currentUser.lastName;
    if (authStore.currentUser?.firstName)
        return authStore.currentUser.firstName;
    if (authStore.currentUser?.mobile)
        return authStore.currentUser.mobile;
    return 'کاربر';
});
const displayFullName = computed(() => {
    if (props.userFullName)
        return props.userFullName;
    if (authStore.currentUser?.firstName && authStore.currentUser?.lastName) {
        return `${authStore.currentUser.firstName} ${authStore.currentUser.lastName}`;
    }
    if (authStore.currentUser?.firstName)
        return authStore.currentUser.firstName;
    if (authStore.currentUser?.mobile)
        return authStore.currentUser.mobile;
    return 'کاربر گرامی';
});
const displayPhone = computed(() => {
    if (props.userPhone)
        return props.userPhone;
    if (authStore.currentUser?.mobile)
        return authStore.currentUser.mobile;
    return '';
});
const toggleMenu = () => {
    internalIsOpen.value = !internalIsOpen.value;
};
const toggleDark = (val) => {
    internalIsDark.value = val;
    emit('select', 'theme');
};
const handleSelect = (key) => {
    emit('select', key);
    if (key !== 'theme') {
        internalIsOpen.value = false;
    }
};
const handleLogout = () => {
    emit('logout');
    internalIsOpen.value = false;
};
// Click outside & Escape key listeners
const handleClickOutside = (e) => {
    if (props.mode !== 'dropdown')
        return;
    if (containerRef.value && !containerRef.value.contains(e.target)) {
        internalIsOpen.value = false;
    }
};
const handleKeydown = (e) => {
    if (props.mode !== 'dropdown')
        return;
    if (e.key === 'Escape' && internalIsOpen.value) {
        internalIsOpen.value = false;
    }
};
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeydown);
});
const __VLS_defaults = {
    mode: 'dropdown',
    isOpen: undefined,
    userName: '',
    userFullName: '',
    userPhone: '',
    userAvatar: '',
    isDark: false,
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
if (__VLS_ctx.mode === 'card-only') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-[304px] bg-white-100 border border-primary-8 rounded-3xl pt-5 pb-4 px-5 flex flex-col gap-3 font-sans select-none text-right shadow-card drop-shadow-[0px_0px_12px_var(--color-primary-6)] relative z-20" },
        dir: "rtl",
        'data-node-id': "21:33964",
        'data-name': "Profile Dropdown Card",
    });
    /** @type {__VLS_StyleScopedClasses['w-[304px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['drop-shadow-[0px_0px_12px_var(--color-primary-6)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-10 flex items-center justify-between gap-3 w-full shrink-0" },
        'data-node-id': "1545:57160",
        'data-name': "General Header Component",
    });
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-10 h-10 min-w-[40px] rounded-full border border-primary-12 flex items-center justify-center shrink-0 overflow-hidden bg-primary-6" },
    });
    /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[40px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
    if (__VLS_ctx.userAvatar) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: (__VLS_ctx.userAvatar),
            alt: "Avatar",
            ...{ class: "w-full h-full object-cover" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    }
    else {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            icon: "solar:user-bold-duotone",
            ...{ class: "w-5 h-5 text-primary-100" },
        }));
        const __VLS_2 = __VLS_1({
            icon: "solar:user-bold-duotone",
            ...{ class: "w-5 h-5 text-primary-100" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 flex flex-col items-end justify-center min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] truncate w-full text-right" },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[22px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    (__VLS_ctx.displayFullName);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm font-medium text-primary-60 font-dots-1 leading-[18px] truncate w-full text-right" },
        dir: "ltr",
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    (__VLS_ctx.displayPhone);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-px bg-primary-8 rounded-lg w-full shrink-0" },
        'data-node-id': "21:33970",
    });
    /** @type {__VLS_StyleScopedClasses['h-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col gap-1 w-full shrink-0" },
        'data-node-id': "21:33973",
        'data-name': "Items",
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const __VLS_5 = BaseDropdownItem;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        ...{ 'onClick': {} },
        label: "کسب‌وکارها",
        startIcon: "solar:shop-2-bold-duotone",
        size: "md",
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onClick': {} },
        label: "کسب‌وکارها",
        startIcon: "solar:shop-2-bold-duotone",
        size: "md",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_10;
    const __VLS_11 = {
        /** @type {typeof __VLS_10.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.mode === 'card-only'))
                throw 0;
            return (__VLS_ctx.handleSelect('businesses'));
            // @ts-ignore
            [mode, userAvatar, userAvatar, displayFullName, displayPhone, handleSelect,];
        },
    };
    var __VLS_8;
    var __VLS_9;
    const __VLS_12 = BaseDropdownItem || BaseDropdownItem;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        ...{ 'onClick': {} },
        label: "تم تاریک",
        startIcon: "solar:moon-bold-duotone",
        size: "md",
        dataNodeId: "21:33975",
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onClick': {} },
        label: "تم تاریک",
        startIcon: "solar:moon-bold-duotone",
        size: "md",
        dataNodeId: "21:33975",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_17;
    const __VLS_18 = {
        /** @type {typeof __VLS_17.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.mode === 'card-only'))
                throw 0;
            return (__VLS_ctx.handleSelect('theme'));
            // @ts-ignore
            [handleSelect,];
        },
    };
    const { default: __VLS_19 } = __VLS_15.slots;
    {
        const { endIcon: __VLS_20 } = __VLS_15.slots;
        const __VLS_21 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
            size: "2xs",
            styleType: "soft",
            type: "primary",
        }));
        const __VLS_23 = __VLS_22({
            size: "2xs",
            styleType: "soft",
            type: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        const { default: __VLS_26 } = __VLS_24.slots;
        // @ts-ignore
        [];
        var __VLS_24;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_15;
    var __VLS_16;
    const __VLS_27 = BaseDropdownItem || BaseDropdownItem;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ 'onClick': {} },
        label: "تنظیمات",
        startIcon: "solar:settings-bold-duotone",
        size: "md",
        dataNodeId: "21:33976",
    }));
    const __VLS_29 = __VLS_28({
        ...{ 'onClick': {} },
        label: "تنظیمات",
        startIcon: "solar:settings-bold-duotone",
        size: "md",
        dataNodeId: "21:33976",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_32;
    const __VLS_33 = {
        /** @type {typeof __VLS_32.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.mode === 'card-only'))
                throw 0;
            return (__VLS_ctx.handleSelect('settings'));
            // @ts-ignore
            [handleSelect,];
        },
    };
    const { default: __VLS_34 } = __VLS_30.slots;
    {
        const { endIcon: __VLS_35 } = __VLS_30.slots;
        const __VLS_36 = BaseBadge || BaseBadge;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
            size: "2xs",
            styleType: "soft",
            type: "primary",
        }));
        const __VLS_38 = __VLS_37({
            size: "2xs",
            styleType: "soft",
            type: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        const { default: __VLS_41 } = __VLS_39.slots;
        // @ts-ignore
        [];
        var __VLS_39;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_30;
    var __VLS_31;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-px bg-primary-8 rounded-lg w-full shrink-0" },
        'data-node-id': "21:33977",
    });
    /** @type {__VLS_StyleScopedClasses['h-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    const __VLS_42 = BaseDropdownItem;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        ...{ 'onClick': {} },
        label: "خروج از حساب کاربری",
        type: "error",
        centered: (true),
        size: "md",
        dataNodeId: "21:33978",
    }));
    const __VLS_44 = __VLS_43({
        ...{ 'onClick': {} },
        label: "خروج از حساب کاربری",
        type: "error",
        centered: (true),
        size: "md",
        dataNodeId: "21:33978",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    let __VLS_47;
    const __VLS_48 = {
        /** @type {typeof __VLS_47.click} */
        onClick: (__VLS_ctx.handleLogout),
    };
    var __VLS_45;
    var __VLS_46;
}
else if (__VLS_ctx.mode === 'button-only') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggleMenu) },
        type: "button",
        ...{ class: "h-11 px-2.5 sm:px-3.5 rounded-full border border-white-100 flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer outline-none select-none shadow-2xs group" },
        ...{ style: {} },
        dir: "rtl",
        'data-node-id': "21:33962",
        'data-name': "Button Component",
    });
    /** @type {__VLS_StyleScopedClasses['h-11']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:scale-[1.02]']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-5 h-5 text-primary-100 opacity-80 group-hover:opacity-100 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        icon: "solar:user-bold-duotone",
        ...{ class: "w-5 h-5" },
    }));
    const __VLS_51 = __VLS_50({
        icon: "solar:user-bold-duotone",
        ...{ class: "w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "px-1 text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[22px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    (__VLS_ctx.displayShortName);
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        icon: "solar:alt-arrow-down-bold",
        ...{ class: "w-3.5 h-3.5 text-primary-60 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200" },
        ...{ class: (__VLS_ctx.internalIsOpen ? 'rotate-180' : '') },
    }));
    const __VLS_56 = __VLS_55({
        icon: "solar:alt-arrow-down-bold",
        ...{ class: "w-3.5 h-3.5 text-primary-60 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200" },
        ...{ class: (__VLS_ctx.internalIsOpen ? 'rotate-180' : '') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "containerRef",
        ...{ class: "relative inline-flex items-center select-none font-sans" },
        dir: "rtl",
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
    const __VLS_59 = BaseTooltip || BaseTooltip;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
        text: "پروفایل کاربر",
    }));
    const __VLS_61 = __VLS_60({
        text: "پروفایل کاربر",
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    const { default: __VLS_64 } = __VLS_62.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggleMenu) },
        type: "button",
        ...{ class: "flex lg:hidden w-11 h-11 rounded-full border border-white-100 items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none" },
        ...{ style: {} },
        'aria-label': "پروفایل کاربر",
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-11']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-11']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    let __VLS_65;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
        icon: "solar:user-bold-duotone",
        ...{ class: "w-5 h-5 text-primary-100 opacity-80" },
    }));
    const __VLS_67 = __VLS_66({
        icon: "solar:user-bold-duotone",
        ...{ class: "w-5 h-5 text-primary-100 opacity-80" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
    // @ts-ignore
    [mode, handleLogout, toggleMenu, toggleMenu, displayShortName, internalIsOpen,];
    var __VLS_62;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggleMenu) },
        type: "button",
        ...{ class: "hidden lg:flex h-11 px-2.5 sm:px-3.5 rounded-full border border-white-100 items-center justify-center gap-1 sm:gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer outline-none select-none shadow-2xs group" },
        ...{ style: {} },
        'data-node-id': "21:33962",
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-11']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:scale-[1.02]']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-5 h-5 text-primary-100 opacity-80 group-hover:opacity-100 flex items-center justify-center shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    let __VLS_70;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        icon: "solar:user-bold-duotone",
        ...{ class: "w-5 h-5" },
    }));
    const __VLS_72 = __VLS_71({
        icon: "solar:user-bold-duotone",
        ...{ class: "w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "px-1 text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-[22px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    (__VLS_ctx.displayShortName);
    let __VLS_75;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
        icon: "solar:alt-arrow-down-bold",
        ...{ class: "w-3.5 h-3.5 text-primary-60 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200" },
        ...{ class: (__VLS_ctx.internalIsOpen ? 'rotate-180' : '') },
    }));
    const __VLS_77 = __VLS_76({
        icon: "solar:alt-arrow-down-bold",
        ...{ class: "w-3.5 h-3.5 text-primary-60 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200" },
        ...{ class: (__VLS_ctx.internalIsOpen ? 'rotate-180' : '') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    let __VLS_80;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
        name: "dropdown",
    }));
    const __VLS_82 = __VLS_81({
        name: "dropdown",
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    const { default: __VLS_85 } = __VLS_83.slots;
    if (__VLS_ctx.internalIsOpen) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute left-0 top-full mt-2 w-[304px] bg-white-100 border border-primary-8 rounded-3xl pt-5 pb-4 px-5 flex flex-col gap-3 font-sans select-none text-right shadow-card drop-shadow-[0px_0px_12px_var(--color-primary-6)] z-50 origin-top-left" },
            dir: "rtl",
            'data-node-id': "21:33964",
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-[304px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
        /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['drop-shadow-[0px_0px_12px_var(--color-primary-6)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
        /** @type {__VLS_StyleScopedClasses['origin-top-left']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "h-10 flex items-center justify-between gap-3 w-full shrink-0" },
            'data-node-id': "1545:57160",
        });
        /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-10 h-10 min-w-[40px] rounded-full border border-primary-12 flex items-center justify-center shrink-0 overflow-hidden bg-primary-6" },
        });
        /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-[40px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
        if (__VLS_ctx.userAvatar) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                src: (__VLS_ctx.userAvatar),
                alt: "Avatar",
                ...{ class: "w-full h-full object-cover" },
            });
            /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
        }
        else {
            let __VLS_86;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
                icon: "solar:user-bold-duotone",
                ...{ class: "w-5 h-5 text-primary-100" },
            }));
            const __VLS_88 = __VLS_87({
                icon: "solar:user-bold-duotone",
                ...{ class: "w-5 h-5 text-primary-100" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_87));
            /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex-1 flex flex-col items-end justify-center min-w-0" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] truncate w-full text-right" },
        });
        /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['leading-[22px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        (__VLS_ctx.displayFullName);
        if (__VLS_ctx.displayPhone) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-sm font-medium text-primary-60 font-dots-1 leading-[18px] truncate w-full text-right" },
                dir: "ltr",
            });
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
            (__VLS_ctx.displayPhone);
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-px bg-primary-8 rounded-lg w-full shrink-0" },
            'data-node-id': "21:33970",
        });
        /** @type {__VLS_StyleScopedClasses['h-px']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col gap-1 w-full shrink-0" },
            'data-node-id': "21:33973",
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        const __VLS_91 = BaseDropdownItem;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
            ...{ 'onClick': {} },
            label: "کسب‌وکارها",
            startIcon: "solar:shop-2-bold-duotone",
            size: "md",
        }));
        const __VLS_93 = __VLS_92({
            ...{ 'onClick': {} },
            label: "کسب‌وکارها",
            startIcon: "solar:shop-2-bold-duotone",
            size: "md",
        }, ...__VLS_functionalComponentArgsRest(__VLS_92));
        let __VLS_96;
        const __VLS_97 = {
            /** @type {typeof __VLS_96.click} */
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.mode === 'card-only'))
                    throw 0;
                if (!!(__VLS_ctx.mode === 'button-only'))
                    throw 0;
                if (!(__VLS_ctx.internalIsOpen))
                    throw 0;
                return (__VLS_ctx.handleSelect('businesses'));
                // @ts-ignore
                [userAvatar, userAvatar, displayFullName, displayPhone, displayPhone, handleSelect, toggleMenu, displayShortName, internalIsOpen, internalIsOpen,];
            },
        };
        var __VLS_94;
        var __VLS_95;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-px bg-primary-8 rounded-lg w-full shrink-0" },
            'data-node-id': "21:33977",
        });
        /** @type {__VLS_StyleScopedClasses['h-px']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        const __VLS_98 = BaseDropdownItem;
        // @ts-ignore
        const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
            ...{ 'onClick': {} },
            label: "خروج از حساب کاربری",
            type: "error",
            centered: (true),
            size: "md",
            dataNodeId: "21:33978",
        }));
        const __VLS_100 = __VLS_99({
            ...{ 'onClick': {} },
            label: "خروج از حساب کاربری",
            type: "error",
            centered: (true),
            size: "md",
            dataNodeId: "21:33978",
        }, ...__VLS_functionalComponentArgsRest(__VLS_99));
        let __VLS_103;
        const __VLS_104 = {
            /** @type {typeof __VLS_103.click} */
            onClick: (__VLS_ctx.handleLogout),
        };
        var __VLS_101;
        var __VLS_102;
    }
    // @ts-ignore
    [handleLogout,];
    var __VLS_83;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
