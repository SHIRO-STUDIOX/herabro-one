import { ChangelogItem } from '../types';
type __VLS_Props = {
    selectedChangelog: ChangelogItem;
    detailLoading?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    back: (...args: any[]) => void;
    navigate: (...args: any[]) => void;
    close: (...args: any[]) => void;
    refresh: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onBack?: ((...args: any[]) => any) | undefined;
    onNavigate?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onRefresh?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
