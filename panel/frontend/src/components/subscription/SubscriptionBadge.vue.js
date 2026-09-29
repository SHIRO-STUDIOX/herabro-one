import { computed } from 'vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import { STATUS_LABELS } from '@/types/subscription';
const props = withDefaults(defineProps(), { status: 'ACTIVE' });
const badgeType = computed(() => {
    switch (props.status) {
        case 'ACTIVE':
            return 'success';
        case 'EXPIRING_SOON':
            return 'warning';
        case 'EXPIRED':
            return 'error';
        case 'TRIAL':
            return 'info';
        default:
            return 'primary';
    }
});
const badgeIcon = computed(() => {
    switch (props.status) {
        case 'ACTIVE':
            return 'solar:check-circle-bold-duotone';
        case 'EXPIRING_SOON':
            return 'solar:alarm-bold-duotone';
        case 'EXPIRED':
            return 'solar:close-circle-bold-duotone';
        case 'TRIAL':
            return 'solar:gift-bold-duotone';
        default:
            return 'solar:medal-ribbon-bold-duotone';
    }
});
const __VLS_defaults = { status: 'ACTIVE' };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = BaseBadge || BaseBadge;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    type: (__VLS_ctx.badgeType),
    styleType: "soft",
    size: "xs",
    showStartIcon: (true),
    startIcon: (__VLS_ctx.badgeIcon),
}));
const __VLS_2 = __VLS_1({
    type: (__VLS_ctx.badgeType),
    styleType: "soft",
    size: "xs",
    showStartIcon: (true),
    startIcon: (__VLS_ctx.badgeIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
(__VLS_ctx.STATUS_LABELS[__VLS_ctx.status]);
// @ts-ignore
[badgeType, badgeIcon, STATUS_LABELS, status,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
