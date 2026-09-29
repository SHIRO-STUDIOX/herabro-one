import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout';
import AppLogo from '@/components/layout/AppLogo.vue';
import SidebarItem from '@/components/ui/SidebarItem.vue';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const layoutStore = useLayoutStore();
const navScrollRef = ref(null);
const showTopFade = ref(false);
const showBottomFade = ref(false);
function updateScrollState() {
    if (!navScrollRef.value)
        return;
    const { scrollTop, scrollHeight, clientHeight } = navScrollRef.value;
    showTopFade.value = scrollTop > 8;
    showBottomFade.value = scrollHeight - (scrollTop + clientHeight) > 8;
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
/** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: ([
            'h-full bg-surface-100 flex flex-col justify-between select-none font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu z-30 overflow-hidden relative',
            'lg:relative lg:shrink-0 lg:z-20',
            'max-lg:fixed max-lg:right-0 max-lg:top-17 max-lg:h-[calc(100dvh-68px)] max-lg:pb-[80px]',
            __VLS_ctx.layoutStore.isSidebarCollapsed
                ? 'lg:w-[68px] lg:max-w-[68px] lg:opacity-100 lg:py-3 lg:px-3 max-lg:w-0 max-lg:opacity-0 max-lg:p-0 max-lg:pointer-events-none'
                : 'w-[248px] max-w-[248px] opacity-100 pt-3 px-3 lg:pb-3',
        ]) },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-[cubic-bezier(0.16,1,0.3,1)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transform-gpu']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:relative']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:top-17']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:h-[calc(100dvh-68px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:pb-[80px]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative flex-1 min-h-0 flex flex-col" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "sidebar-fade",
}));
const __VLS_2 = __VLS_1({
    name: "sidebar-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.showTopFade) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pointer-events-none absolute inset-x-0 top-0 z-10" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-10 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]" },
    });
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-[6px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['[mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 h-full w-full bg-gradient-to-b from-surface-100 via-surface-100/70 to-transparent" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['from-surface-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['via-surface-100/70']} */ ;
    /** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
}
// @ts-ignore
[layoutStore, showTopFade,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onScroll: (__VLS_ctx.updateScrollState) },
    ref: "navScrollRef",
    dir: "ltr",
    ...{ class: "sidebar-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain" },
});
/** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['overscroll-contain']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    dir: "rtl",
    ...{ class: "flex flex-col gap-5 h-auto min-h-full px-0 py-0 pb-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hidden lg:flex items-center justify-between transition-all duration-300" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 w-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-11 h-11 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 shadow-2xs" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-11']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
const __VLS_6 = AppLogo;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "w-7 h-7 text-primary-100" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "w-7 h-7 text-primary-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['w-7']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
if (!__VLS_ctx.layoutStore.isSidebarCollapsed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col text-right truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-base font-black text-primary-100 font-dots-1 leading-5" },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-2xs font-semibold text-primary-60 font-dots-1 leading-3.5" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-3.5']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "flex flex-col gap-1.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.navItems))) {
    const __VLS_11 = SidebarItem;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        ...{ 'onClick': {} },
        key: (item.id),
        title: (item.label),
        icon: (item.icon),
        type: "main",
        level: "one",
        state: (__VLS_ctx.activeTab === item.id ? 'selected' : 'enabled'),
        expanded: (!__VLS_ctx.layoutStore.isSidebarCollapsed),
        showBadge: (item.badge !== undefined),
        badgeText: (String(item.badge || '')),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        key: (item.id),
        title: (item.label),
        icon: (item.icon),
        type: "main",
        level: "one",
        state: (__VLS_ctx.activeTab === item.id ? 'selected' : 'enabled'),
        expanded: (!__VLS_ctx.layoutStore.isSidebarCollapsed),
        showBadge: (item.badge !== undefined),
        badgeText: (String(item.badge || '')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_16;
    const __VLS_17 = {
        /** @type {typeof __VLS_16.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.$emit('update:activeTab', item.id));
            // @ts-ignore
            [layoutStore, layoutStore, updateScrollState, navItems, activeTab, $emit,];
        },
    };
    var __VLS_14;
    var __VLS_15;
    // @ts-ignore
    [];
}
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    name: "sidebar-fade",
}));
const __VLS_20 = __VLS_19({
    name: "sidebar-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
if (__VLS_ctx.showBottomFade) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "pointer-events-none absolute inset-x-0 bottom-0 z-10" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-10 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_15%,transparent_95%)]" },
    });
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['backdrop-blur-[6px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['[mask-image:linear-gradient(to_top,black_15%,transparent_95%)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 h-full w-full bg-gradient-to-t from-surface-100 via-surface-100/70 to-transparent" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['from-surface-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['via-surface-100/70']} */ ;
    /** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
}
// @ts-ignore
[showBottomFade,];
var __VLS_21;
if (!__VLS_ctx.layoutStore.isSidebarCollapsed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 p-3 bg-white-80 border border-primary-8 rounded-2xl flex flex-col gap-2 shrink-0 select-none shadow-2xs" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between text-2xs" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-primary-60 font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-mono font-bold text-primary-100" },
    });
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    (__VLS_ctx.currentRole);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-3 gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.layoutStore.isSidebarCollapsed))
                    throw 0;
                return (__VLS_ctx.$emit('changeRole', 'SUPER_ADMIN'));
                // @ts-ignore
                [layoutStore, $emit, currentRole,];
            } },
        type: "button",
        ...{ class: "py-1 px-1 text-center rounded-lg text-2xs font-medium transition-all cursor-pointer border" },
        ...{ class: (__VLS_ctx.currentRole === 'SUPER_ADMIN' ? 'bg-primary-100 text-white-100 border-primary-100 font-bold' : 'bg-white-100 border-primary-8 text-primary-60 hover:bg-primary-6') },
    });
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.layoutStore.isSidebarCollapsed))
                    throw 0;
                return (__VLS_ctx.$emit('changeRole', 'SUPPORT_AGENT'));
                // @ts-ignore
                [$emit, currentRole,];
            } },
        type: "button",
        ...{ class: "py-1 px-1 text-center rounded-lg text-2xs font-medium transition-all cursor-pointer border" },
        ...{ class: (__VLS_ctx.currentRole === 'SUPPORT_AGENT' ? 'bg-primary-100 text-white-100 border-primary-100 font-bold' : 'bg-white-100 border-primary-8 text-primary-60 hover:bg-primary-6') },
    });
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.layoutStore.isSidebarCollapsed))
                    throw 0;
                return (__VLS_ctx.$emit('changeRole', 'SALES_MANAGER'));
                // @ts-ignore
                [$emit, currentRole,];
            } },
        type: "button",
        ...{ class: "py-1 px-1 text-center rounded-lg text-2xs font-medium transition-all cursor-pointer border" },
        ...{ class: (__VLS_ctx.currentRole === 'SALES_MANAGER' ? 'bg-primary-100 text-white-100 border-primary-100 font-bold' : 'bg-white-100 border-primary-8 text-primary-60 hover:bg-primary-6') },
    });
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
}
// @ts-ignore
[currentRole,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
