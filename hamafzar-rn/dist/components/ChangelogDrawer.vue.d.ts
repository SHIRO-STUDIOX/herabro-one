type __VLS_Props = {
    open?: boolean;
    teleport?: boolean;
    title?: string;
    subtitle?: string;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    navigate: (url: string) => any;
    "update:open": (val: boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onNavigate?: ((url: string) => any) | undefined;
    "onUpdate:open"?: ((val: boolean) => any) | undefined;
}>, {
    title: string;
    subtitle: string;
    open: boolean;
    teleport: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
