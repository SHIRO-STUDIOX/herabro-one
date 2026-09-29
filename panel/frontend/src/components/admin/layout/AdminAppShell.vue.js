import { ref } from 'vue';
import AdminSidebar from './AdminSidebar.vue';
import AdminHeader from './AdminHeader.vue';
import ImpersonationBanner from './ImpersonationBanner.vue';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const contentScrollRef = ref(null);
const showTopFade = ref(false);
const showBottomFade = ref(false);
function updateScrollState() {
    if (!contentScrollRef.value)
        return;
    const { scrollTop, scrollHeight, clientHeight } = contentScrollRef.value;
    showTopFade.value = scrollTop > 12;
    showBottomFade.value = scrollHeight - (scrollTop + clientHeight) > 12;
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
    ...{ class: "w-full h-screen bg-surface-100 flex overflow-hidden font-sans select-none text-right relative" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
const __VLS_0 = AdminSidebar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:activeTab': {} },
    ...{ 'onChangeRole': {} },
    activeTab: (__VLS_ctx.activeTab),
    currentRole: (__VLS_ctx.currentRole),
    navItems: (__VLS_ctx.navItems),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:activeTab': {} },
    ...{ 'onChangeRole': {} },
    activeTab: (__VLS_ctx.activeTab),
    currentRole: (__VLS_ctx.currentRole),
    navItems: (__VLS_ctx.navItems),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.'update:activeTab'} */
    'onUpdate:activeTab': (...[$event]) => {
        return (__VLS_ctx.$emit('update:activeTab', $event));
        // @ts-ignore
        [activeTab, currentRole, navItems, $emit,];
    },
};
const __VLS_7 = {
    /** @type {typeof __VLS_5.changeRole} */
    onChangeRole: (...[$event]) => {
        return (__VLS_ctx.$emit('changeRole', $event));
        // @ts-ignore
        [$emit,];
    },
};
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 flex flex-col h-full min-w-0 overflow-hidden relative" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
const __VLS_8 = AdminHeader;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onLogout': {} },
    admin: (__VLS_ctx.admin),
    currentRole: (__VLS_ctx.currentRole),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onLogout': {} },
    admin: (__VLS_ctx.admin),
    currentRole: (__VLS_ctx.currentRole),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.logout} */
    onLogout: (...[$event]) => {
        return (__VLS_ctx.$emit('logout'));
        // @ts-ignore
        [currentRole, $emit, admin,];
    },
};
var __VLS_11;
var __VLS_12;
if (__VLS_ctx.isImpersonating) {
    const __VLS_15 = ImpersonationBanner;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        ...{ 'onExit': {} },
        active: (Boolean(__VLS_ctx.isImpersonating)),
        tenantTitle: (__VLS_ctx.impersonatedTenantTitle),
        expiresAt: (__VLS_ctx.impersonationExpiresAt),
    }));
    const __VLS_17 = __VLS_16({
        ...{ 'onExit': {} },
        active: (Boolean(__VLS_ctx.isImpersonating)),
        tenantTitle: (__VLS_ctx.impersonatedTenantTitle),
        expiresAt: (__VLS_ctx.impersonationExpiresAt),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_20;
    const __VLS_21 = {
        /** @type {typeof __VLS_20.exit} */
        onExit: (...[$event]) => {
            if (!(__VLS_ctx.isImpersonating))
                throw 0;
            return (__VLS_ctx.$emit('exitImpersonation'));
            // @ts-ignore
            [$emit, isImpersonating, isImpersonating, impersonatedTenantTitle, impersonationExpiresAt,];
        },
    };
    var __VLS_18;
    var __VLS_19;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "flex-1 min-h-0 bg-white-60 flex flex-col overflow-hidden relative rounded-4xl mb-3 mx-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu shadow-card" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-60']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-3']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-[cubic-bezier(0.16,1,0.3,1)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transform-gpu']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-card']} */ ;
if (__VLS_ctx.showTopFade) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pointer-events-none absolute inset-x-0 top-0 z-20" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-10 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]" },
    });
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-[6px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['[mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 h-full w-full bg-gradient-to-b from-white-100/80 via-white-100/40 to-transparent" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['from-white-100/80']} */ ;
    /** @type {__VLS_StyleScopedClasses['via-white-100/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onScroll: (__VLS_ctx.updateScrollState) },
    ref: "contentScrollRef",
    ...{ class: "flex-1 h-full overflow-y-auto p-4 sm:p-6 relative rounded-4xl" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
var __VLS_22 = {};
if (__VLS_ctx.showBottomFade) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pointer-events-none absolute inset-x-0 bottom-0 z-20" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-12 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_15%,transparent_95%)]" },
    });
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-[6px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['[mask-image:linear-gradient(to_top,black_15%,transparent_95%)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 h-full w-full bg-gradient-to-t from-white-100/80 via-white-100/40 to-transparent" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['from-white-100/80']} */ ;
    /** @type {__VLS_StyleScopedClasses['via-white-100/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
}
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[showTopFade, updateScrollState, showBottomFade,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
