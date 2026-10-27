import { ChangelogPanelSize } from '../types';
type __VLS_Props = {
    modelValue?: ChangelogPanelSize;
    showNewTab?: boolean;
    newTabLink?: string;
    showRefresh?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    close: () => any;
    refresh: () => any;
    "update:modelValue": (size: ChangelogPanelSize) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    onRefresh?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((size: ChangelogPanelSize) => any) | undefined;
}>, {
    modelValue: ChangelogPanelSize;
    showNewTab: boolean;
    newTabLink: string;
    showRefresh: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
