import { ChangelogItem, ChangelogPanelSize, HamafzarRNConfig } from '../types';
import { ChangelogService } from '../api/changelogService';
export declare function configureHamafzarRN(config: HamafzarRNConfig): void;
export declare function useChangelog(customService?: ChangelogService): {
    isOpen: import('vue').Ref<boolean, boolean>;
    panelSize: import('vue').Ref<ChangelogPanelSize, ChangelogPanelSize>;
    changelogs: import('vue').Ref<{
        id: string | number;
        version: string;
        date: string;
        title: string;
        description: string;
        thumbnail?: string | undefined;
        caption?: string | undefined;
        intro?: string | undefined;
        type: import('..').ChangelogType;
        priority?: import('..').ChangelogPriority | undefined;
        features: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        improvements: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        bugfixes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        notes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        summary?: string | undefined;
    }[], ChangelogItem[] | {
        id: string | number;
        version: string;
        date: string;
        title: string;
        description: string;
        thumbnail?: string | undefined;
        caption?: string | undefined;
        intro?: string | undefined;
        type: import('..').ChangelogType;
        priority?: import('..').ChangelogPriority | undefined;
        features: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        improvements: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        bugfixes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        notes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        summary?: string | undefined;
    }[]>;
    selectedChangelog: import('vue').Ref<{
        id: string | number;
        version: string;
        date: string;
        title: string;
        description: string;
        thumbnail?: string | undefined;
        caption?: string | undefined;
        intro?: string | undefined;
        type: import('..').ChangelogType;
        priority?: import('..').ChangelogPriority | undefined;
        features: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        improvements: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        bugfixes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        notes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        summary?: string | undefined;
    } | null, ChangelogItem | {
        id: string | number;
        version: string;
        date: string;
        title: string;
        description: string;
        thumbnail?: string | undefined;
        caption?: string | undefined;
        intro?: string | undefined;
        type: import('..').ChangelogType;
        priority?: import('..').ChangelogPriority | undefined;
        features: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        improvements: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        bugfixes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        notes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        summary?: string | undefined;
    } | null>;
    clickedItem: import('vue').Ref<{
        id: string | number;
        version: string;
        date: string;
        title: string;
        description: string;
        thumbnail?: string | undefined;
        caption?: string | undefined;
        intro?: string | undefined;
        type: import('..').ChangelogType;
        priority?: import('..').ChangelogPriority | undefined;
        features: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        improvements: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        bugfixes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        notes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        summary?: string | undefined;
    } | null, ChangelogItem | {
        id: string | number;
        version: string;
        date: string;
        title: string;
        description: string;
        thumbnail?: string | undefined;
        caption?: string | undefined;
        intro?: string | undefined;
        type: import('..').ChangelogType;
        priority?: import('..').ChangelogPriority | undefined;
        features: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        improvements: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        bugfixes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        notes: {
            id: string | number;
            module: string;
            moduleIcon?: string | undefined;
            title: string;
            description: string;
            linkText?: string | undefined;
            linkUrl?: string | undefined;
        }[];
        summary?: string | undefined;
    } | null>;
    loading: import('vue').Ref<boolean, boolean>;
    loadingMore: import('vue').Ref<boolean, boolean>;
    detailLoading: import('vue').Ref<boolean, boolean>;
    error: import('vue').Ref<string | null, string | null>;
    loadMoreError: import('vue').Ref<boolean, boolean>;
    nextUrl: import('vue').Ref<string | null, string | null>;
    reachedEnd: import('vue').Ref<boolean, boolean>;
    hasUnread: import('vue').ComputedRef<boolean>;
    latestVersion: import('vue').ComputedRef<string | null>;
    activeConfig: import('vue').Ref<{
        appSlug?: string | undefined;
        apiUrl?: string | undefined;
        detailApiUrl?: string | undefined;
        storageKey?: string | undefined;
        onNavigate?: ((url: string) => void) | undefined;
    }, HamafzarRNConfig | {
        appSlug?: string | undefined;
        apiUrl?: string | undefined;
        detailApiUrl?: string | undefined;
        storageKey?: string | undefined;
        onNavigate?: ((url: string) => void) | undefined;
    }>;
    markAsRead: () => void;
    setPanelSize: (size: ChangelogPanelSize) => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    fetchChangelogs: (force?: boolean) => Promise<void>;
    fetchNextPage: () => Promise<void>;
    retryLoadMore: () => void;
    selectChangelog: (item: ChangelogItem) => Promise<void>;
    goBack: () => void;
    refresh: () => void;
};
