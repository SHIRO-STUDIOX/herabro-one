import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
const props = withDefaults(defineProps(), {
    title: 'عنوان',
    level: 'one',
    parentTitle: '',
    parentPath: '',
    items: () => [],
    homePath: '',
    homeIcon: 'solar:home-2-bold-duotone',
    showHome: true,
    showSeparators: true,
    asHeading: true,
});
const emit = defineEmits();
const resolvedCurrentTitle = computed(() => props.title || 'عنوان');
const resolvedLevel = computed(() => {
    if (props.level)
        return props.level;
    if (props.items && props.items.length > 0)
        return 'two';
    if (props.parentTitle)
        return 'two';
    return 'one';
});
const resolvedParentItems = computed(() => {
    if (props.items && props.items.length > 0) {
        return props.items;
    }
    if (props.parentTitle) {
        return [{ title: props.parentTitle, path: props.parentPath }];
    }
    if (props.level === 'two') {
        return [{ title: 'عنوان', path: props.parentPath }];
    }
    return [];
});
const __VLS_defaults = {
    title: 'عنوان',
    level: 'one',
    parentTitle: '',
    parentPath: '',
    items: () => [],
    homePath: '',
    homeIcon: 'solar:home-2-bold-duotone',
    showHome: true,
    showSeparators: true,
    asHeading: true,
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
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "flex items-center gap-2 font-sans select-none flex-wrap" },
    dir: "rtl",
    'data-node-id': (__VLS_ctx.resolvedLevel === 'two' ? '4:29142' : '4:29138'),
    'data-name': "Breadcrumb Component",
    'aria-label': "Breadcrumb",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
if (__VLS_ctx.showHome) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center shrink-0 w-3.5 h-3.5" },
        'data-node-id': (__VLS_ctx.resolvedLevel === 'two' ? '4:29147' : '4:29141'),
        'data-name': "Home Angle",
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    var __VLS_0 = {};
    if (__VLS_ctx.homePath) {
        const __VLS_2 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
            text: "صفحه اصلی",
        }));
        const __VLS_4 = __VLS_3({
            text: "صفحه اصلی",
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
        const { default: __VLS_7 } = __VLS_5.slots;
        let __VLS_8;
        /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
        routerLink;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
            to: (__VLS_ctx.homePath),
            ...{ class: "w-3.5 h-3.5 flex items-center justify-center text-primary-40 hover:text-primary-80 transition-colors outline-none" },
        }));
        const __VLS_10 = __VLS_9({
            to: (__VLS_ctx.homePath),
            ...{ class: "w-3.5 h-3.5 flex items-center justify-center text-primary-40 hover:text-primary-80 transition-colors outline-none" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        const { default: __VLS_13 } = __VLS_11.slots;
        let __VLS_14;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
            icon: (__VLS_ctx.homeIcon),
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_16 = __VLS_15({
            icon: (__VLS_ctx.homeIcon),
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        // @ts-ignore
        [resolvedLevel, resolvedLevel, showHome, homePath, homePath, homeIcon,];
        var __VLS_11;
        // @ts-ignore
        [];
        var __VLS_5;
    }
    else {
        const __VLS_19 = BaseTooltip || BaseTooltip;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
            text: "صفحه اصلی",
        }));
        const __VLS_21 = __VLS_20({
            text: "صفحه اصلی",
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        const { default: __VLS_24 } = __VLS_22.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showHome))
                        throw 0;
                    if (!!(__VLS_ctx.homePath))
                        throw 0;
                    return (__VLS_ctx.emit('home-click'));
                    // @ts-ignore
                    [emit,];
                } },
            type: "button",
            ...{ class: "w-3.5 h-3.5 flex items-center justify-center text-primary-40 hover:text-primary-80 transition-colors cursor-pointer outline-none p-0 bg-transparent border-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-0']} */ ;
        let __VLS_25;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
            icon: (__VLS_ctx.homeIcon),
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_27 = __VLS_26({
            icon: (__VLS_ctx.homeIcon),
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        // @ts-ignore
        [homeIcon,];
        var __VLS_22;
    }
}
if (__VLS_ctx.showSeparators && __VLS_ctx.showHome) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center shrink-0 w-3.5 h-3.5 text-primary-40" },
        'data-name': "Alt Arrow Left",
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    var __VLS_30 = {};
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        icon: "solar:alt-arrow-left-linear",
        ...{ class: "w-3.5 h-3.5 text-primary-40" },
    }));
    const __VLS_34 = __VLS_33({
        icon: "solar:alt-arrow-left-linear",
        ...{ class: "w-3.5 h-3.5 text-primary-40" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
}
if (__VLS_ctx.resolvedParentItems.length > 0) {
    for (const [item, idx] of __VLS_vFor((__VLS_ctx.resolvedParentItems))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.template)({
            key: (idx),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-end shrink-0" },
            'data-node-id': "4:29145",
            'data-name': "Text Component",
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        var __VLS_37 = {
            item: (item),
            index: (idx),
        };
        if (item.path) {
            let __VLS_39;
            /** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
            routerLink;
            // @ts-ignore
            const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
                to: (item.path),
                ...{ class: "text-xs sm:text-sm font-bold text-primary-60 hover:text-primary-100 font-dots-1 leading-[18px] whitespace-nowrap transition-colors outline-none" },
            }));
            const __VLS_41 = __VLS_40({
                to: (item.path),
                ...{ class: "text-xs sm:text-sm font-bold text-primary-60 hover:text-primary-100 font-dots-1 leading-[18px] whitespace-nowrap transition-colors outline-none" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_40));
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            const { default: __VLS_44 } = __VLS_42.slots;
            (item.title);
            // @ts-ignore
            [showHome, showSeparators, resolvedParentItems, resolvedParentItems,];
            var __VLS_42;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.resolvedParentItems.length > 0))
                            throw 0;
                        if (!!(item.path))
                            throw 0;
                        return (__VLS_ctx.emit('item-click', item));
                        // @ts-ignore
                        [emit,];
                    } },
                type: "button",
                ...{ class: "text-xs sm:text-sm font-bold text-primary-60 hover:text-primary-100 font-dots-1 leading-[18px] whitespace-nowrap transition-colors cursor-pointer outline-none bg-transparent border-0 p-0" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-primary-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-[18px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['p-0']} */ ;
            (item.title);
        }
        if (__VLS_ctx.showSeparators) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center justify-center shrink-0 w-3.5 h-3.5 text-primary-40" },
                'data-node-id': "4:29146",
                'data-name': "Alt Arrow Left",
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
            var __VLS_45 = {};
            let __VLS_47;
            /** @ts-ignore @type { | typeof __VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
                icon: "solar:alt-arrow-left-linear",
                ...{ class: "w-3.5 h-3.5 text-primary-40" },
            }));
            const __VLS_49 = __VLS_48({
                icon: "solar:alt-arrow-left-linear",
                ...{ class: "w-3.5 h-3.5 text-primary-40" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_48));
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
        }
        // @ts-ignore
        [showSeparators,];
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-end shrink-0" },
    'data-node-id': (__VLS_ctx.resolvedLevel === 'two' ? '4:29143' : '4:29139'),
    'data-name': "Text Component",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
var __VLS_52 = {
    title: (__VLS_ctx.resolvedCurrentTitle),
};
if (__VLS_ctx.asHeading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-base sm:text-lg font-extrabold text-primary-100 font-dots-1 leading-6 whitespace-nowrap m-0 p-0" },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['m-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0']} */ ;
    (__VLS_ctx.resolvedCurrentTitle);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-base sm:text-lg font-extrabold text-primary-100 font-dots-1 leading-6 whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-dots-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    (__VLS_ctx.resolvedCurrentTitle);
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_31 = __VLS_30, __VLS_38 = __VLS_37, __VLS_46 = __VLS_45, __VLS_53 = __VLS_52;
// @ts-ignore
[resolvedLevel, resolvedCurrentTitle, resolvedCurrentTitle, resolvedCurrentTitle, asHeading,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
