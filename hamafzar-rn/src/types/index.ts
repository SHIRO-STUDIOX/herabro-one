export type ChangelogType = 'success' | 'warning' | 'error' | 'info' | 'secondary'

export type ChangelogDetailType = 'NEW_FEATURE' | 'IMPROVEMENT' | 'BUGFIX' | 'NOTE'

export type ChangelogPriority = 'HIGH' | 'MEDIUM' | 'LOW'

export type ChangelogPanelSize = 'small' | 'medium' | 'large'

export interface ChangelogDetailItem {
  id: string | number
  module: string
  moduleIcon?: string
  title: string
  description: string
  linkText?: string
  linkUrl?: string
}

export interface ChangelogItem {
  id: string | number
  version: string
  date: string
  title: string
  description: string
  thumbnail?: string
  caption?: string
  intro?: string
  type: ChangelogType
  priority?: ChangelogPriority
  features: ChangelogDetailItem[]
  improvements: ChangelogDetailItem[]
  bugfixes: ChangelogDetailItem[]
  notes: ChangelogDetailItem[]
  summary?: string
}

export interface ChangelogApiDetailRaw {
  id?: string | number
  type: ChangelogDetailType
  module_name?: string
  module_icon?: string
  title: string
  explanation: string
  path?: string
  path_name?: string
}

export interface ChangelogApiItemRaw {
  id: string | number
  version: string
  release_date: string
  title?: string
  introduction?: string
  thumbnail?: string
  thumbnail_caption?: string
  priority?: ChangelogPriority
  summary?: string
  details?: ChangelogApiDetailRaw[]
}

export interface ChangelogApiResponse {
  results?: ChangelogApiItemRaw[]
  next?: string | null
  count?: number
}

export interface HamafzarRNConfig {
  /**
   * Slug of the app in Hamafzar API (e.g. 'hesabro-one', 'panel', etc.)
   * Default: 'hesabro-one'
   */
  appSlug?: string

  /**
   * Complete custom API URL for fetching changelogs list.
   * If provided, overrides appSlug.
   */
  apiUrl?: string

  /**
   * Complete custom API URL template for fetching changelog detail.
   * E.g. 'https://backend-hamafzar.avapardaz.ir/api/avapardaz/hesabro-one/changelog/detail/:id/'
   */
  detailApiUrl?: string

  /**
   * LocalStorage key to save the last viewed version.
   * Default: 'hamafzar_last_seen_changelog_version'
   */
  storageKey?: string

  /**
   * Custom callback invoked when user clicks an internal link in changelog detail.
   */
  onNavigate?: (url: string) => void
}
