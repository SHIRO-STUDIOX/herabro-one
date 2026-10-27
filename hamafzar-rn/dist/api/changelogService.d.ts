import { ChangelogApiItemRaw, ChangelogItem, HamafzarRNConfig } from '../types';
export declare function mapRawToChangelog(apiItem: ChangelogApiItemRaw): ChangelogItem;
export declare const MOCK_CHANGELOGS: ChangelogItem[];
export declare class ChangelogService {
    private _config;
    private _detailCache;
    constructor(config?: HamafzarRNConfig);
    setConfig(config: Partial<HamafzarRNConfig>): void;
    getConfig(): HamafzarRNConfig;
    getListUrl(): string;
    getDetailUrl(id: string | number): string;
    getDetailByChangelogUrl(id: string | number): string;
    getChangelogs(url?: string): Promise<{
        items: ChangelogItem[];
        nextUrl: string | null;
    }>;
    getChangelogDetail(id: string | number, existingItem?: ChangelogItem | null, customUrl?: string): Promise<ChangelogItem | null>;
}
export declare const changelogService: ChangelogService;
