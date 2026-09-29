import { ref } from 'vue';
import { Icon } from '@iconify/vue';
const props = defineProps();
const emit = defineEmits();
const isDraggingOver = ref(false);
const availableModules = [
    { id: 'sales', label: 'فروش و صدور فاکتور', icon: 'solar:bill-list-bold-duotone' },
    { id: 'inventory', label: 'انبارداری و چند انباری', icon: 'solar:box-minimalistic-bold-duotone' },
    { id: 'cheques', label: 'مدیریت چک‌های صیادی', icon: 'solar:card-2-bold-duotone' },
    { id: 'treasury', label: 'خزانه‌داری و گردش وجوه', icon: 'solar:wallet-2-bold-duotone' },
    { id: 'accounting_advanced', label: 'حسابداری دوبل پیشرفته', icon: 'solar:calculator-bold-duotone' },
    { id: 'pos_integration', label: 'اتصال به کارتخوان (POS)', icon: 'solar:card-receive-bold-duotone' },
    { id: 'tax_system', label: 'سامانه مودیان مالیاتی', icon: 'solar:document-text-bold-duotone' },
    { id: 'multi_user', label: 'کاربری تیمی و سطوح دسترسی', icon: 'solar:users-group-two-rounded-bold-duotone' },
    { id: 'sms_gateway', label: 'سامانه اطلاع‌رسانی پیامکی', icon: 'solar:chat-round-dots-bold-duotone' },
];
function getModuleLabel(id) {
    const m = availableModules.find((x) => x.id === id);
    return m ? m.label : id;
}
function getModuleIcon(id) {
    const m = availableModules.find((x) => x.id === id);
    return m ? m.icon : 'solar:widget-2-bold-duotone';
}
function onDragStart(event, moduleId) {
    if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', moduleId);
    }
}
function onDrop(event) {
    isDraggingOver.value = false;
    if (event.dataTransfer) {
        const moduleId = event.dataTransfer.getData('text/plain');
        if (moduleId && !props.modelValue.includes(moduleId)) {
            emit('update:modelValue', [...props.modelValue, moduleId]);
        }
    }
}
function addModule(id) {
    if (!props.modelValue.includes(id)) {
        emit('update:modelValue', [...props.modelValue, id]);
    }
}
function removeModule(id) {
    emit('update:modelValue', props.modelValue.filter((x) => x !== id));
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
    ...{ class: "w-full flex flex-col gap-3 font-sans select-none text-right" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "text-xs font-extrabold text-primary-80 flex items-center gap-1.5" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:box-minimalistic-bold-duotone",
    ...{ class: "w-4 h-4 text-primary-100" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:box-minimalistic-bold-duotone",
    ...{ class: "w-4 h-4 text-primary-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs text-primary-40" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-4 bg-primary-1/30 rounded-2xl border border-primary-6 flex flex-col gap-2.5" },
});
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-1/30']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-bold text-primary-60" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
for (const [mod] of __VLS_vFor((__VLS_ctx.availableModules))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onDragstart: (...[$event]) => {
                return (__VLS_ctx.onDragStart($event, mod.id));
                // @ts-ignore
                [availableModules, onDragStart,];
            } },
        ...{ onClick: (...[$event]) => {
                return (__VLS_ctx.addModule(mod.id));
                // @ts-ignore
                [addModule,];
            } },
        key: (mod.id),
        draggable: "true",
        ...{ class: "px-3 py-2 rounded-xl border border-primary-8 bg-white-100 text-xs font-medium text-primary-100 flex items-center gap-2 cursor-grab active:cursor-grabbing hover:border-primary-100 hover:shadow-2xs transition-all select-none" },
        ...{ class: ({ 'opacity-40 pointer-events-none': __VLS_ctx.modelValue.includes(mod.id) }) },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-grab']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:cursor-grabbing']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-primary-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:shadow-2xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        icon: (mod.icon),
        ...{ class: "w-4 h-4 text-primary-60" },
    }));
    const __VLS_7 = __VLS_6({
        icon: (mod.icon),
        ...{ class: "w-4 h-4 text-primary-60" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (mod.label);
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        icon: "solar:add-circle-linear",
        ...{ class: "w-3.5 h-3.5 text-primary-40 mr-1" },
    }));
    const __VLS_12 = __VLS_11({
        icon: "solar:add-circle-linear",
        ...{ class: "w-3.5 h-3.5 text-primary-40 mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
    // @ts-ignore
    [modelValue,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onDragover: (...[$event]) => {
            return (__VLS_ctx.isDraggingOver = true);
            // @ts-ignore
            [isDraggingOver,];
        } },
    ...{ onDragleave: (...[$event]) => {
            return (__VLS_ctx.isDraggingOver = false);
            // @ts-ignore
            [isDraggingOver,];
        } },
    ...{ onDrop: (__VLS_ctx.onDrop) },
    ...{ class: "p-4 rounded-2xl border-2 border-dashed transition-all duration-200 min-h-[140px] flex flex-col gap-2.5 justify-start" },
    ...{ class: (__VLS_ctx.isDraggingOver ? 'border-primary-100 bg-primary-1/60 scale-[1.01]' : 'border-primary-12 bg-white-100') },
});
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[140px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-bold text-primary-60" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-60']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-mono font-bold text-primary-100" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
(__VLS_ctx.modelValue.length);
if (__VLS_ctx.modelValue.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 flex flex-col items-center justify-center text-primary-40 py-6 text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        icon: "solar:archive-down-minimlistic-linear",
        ...{ class: "w-7 h-7 text-primary-20 mb-1" },
    }));
    const __VLS_17 = __VLS_16({
        icon: "solar:archive-down-minimlistic-linear",
        ...{ class: "w-7 h-7 text-primary-20 mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-2xs" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-wrap gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    for (const [modId] of __VLS_vFor((__VLS_ctx.modelValue))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (modId),
            ...{ class: "px-3 py-2 rounded-xl bg-primary-6 border border-primary-12 text-xs font-bold text-primary-100 flex items-center gap-2 transition-all shadow-2xs" },
        });
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
        let __VLS_20;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
            icon: (__VLS_ctx.getModuleIcon(modId)),
            ...{ class: "w-4 h-4 text-primary-100" },
        }));
        const __VLS_22 = __VLS_21({
            icon: (__VLS_ctx.getModuleIcon(modId)),
            ...{ class: "w-4 h-4 text-primary-100" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.getModuleLabel(modId));
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.modelValue.length === 0))
                        throw 0;
                    return (__VLS_ctx.removeModule(modId));
                    // @ts-ignore
                    [modelValue, modelValue, modelValue, isDraggingOver, onDrop, getModuleIcon, getModuleLabel, removeModule,];
                } },
            type: "button",
            ...{ class: "w-4 h-4 rounded-full bg-primary-12 text-primary-80 hover:text-error-100 hover:bg-error-6 flex items-center justify-center transition-colors cursor-pointer outline-none mr-1" },
        });
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-80']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-error-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-error-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        let __VLS_25;
        /** @ts-ignore @type { | typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
            icon: "solar:close-circle-bold",
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_27 = __VLS_26({
            icon: "solar:close-circle-bold",
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
