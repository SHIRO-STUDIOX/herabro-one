import { ref, computed } from 'vue'
import type {
  ChangelogItem,
  ChangelogPanelSize,
  HamafzarRNConfig,
} from '../types'
import { changelogService, ChangelogService } from '../api/changelogService'

const DEFAULT_STORAGE_KEY = 'hamafzar_last_seen_changelog_version'

// Shared reactive state across components
const isOpen = ref(false)
const panelSize = ref<ChangelogPanelSize>('small')
const changelogs = ref<ChangelogItem[]>([])
const selectedChangelog = ref<ChangelogItem | null>(null)
const clickedItem = ref<ChangelogItem | null>(null)
const loading = ref(false)
const loadingMore = ref(false)
const detailLoading = ref(false)
const error = ref<string | null>(null)
const loadMoreError = ref(false)
const nextUrl = ref<string | null>(null)
const reachedEnd = ref(false)

const currentStorageKey = ref(DEFAULT_STORAGE_KEY)
const lastSeenVersion = ref<string | null>(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem(currentStorageKey.value)
    : null,
)

const activeConfig = ref<HamafzarRNConfig>({
  appSlug: 'hesabro-one',
})

export function configureHamafzarRN(config: HamafzarRNConfig) {
  activeConfig.value = { ...activeConfig.value, ...config }
  changelogService.setConfig(activeConfig.value)
  if (config.storageKey) {
    currentStorageKey.value = config.storageKey
    if (typeof localStorage !== 'undefined') {
      lastSeenVersion.value = localStorage.getItem(currentStorageKey.value)
    }
  }
}

export function useChangelog(customService?: ChangelogService) {
  const service = customService || changelogService

  const latestVersion = computed(() => {
    return changelogs.value[0]?.version || null
  })

  const hasUnread = computed(() => {
    if (!latestVersion.value) return false
    return lastSeenVersion.value !== latestVersion.value
  })

  function markAsRead() {
    if (latestVersion.value) {
      lastSeenVersion.value = latestVersion.value
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(currentStorageKey.value, latestVersion.value)
      }
    }
  }

  function setPanelSize(size: ChangelogPanelSize) {
    panelSize.value = size
  }

  function openDrawer() {
    isOpen.value = true
    markAsRead()
    if (changelogs.value.length === 0) {
      fetchChangelogs()
    }
  }

  function closeDrawer() {
    isOpen.value = false
    selectedChangelog.value = null
    clickedItem.value = null
  }

  function toggleDrawer() {
    if (isOpen.value) {
      closeDrawer()
    } else {
      openDrawer()
    }
  }

  async function fetchChangelogs(force = false) {
    if (changelogs.value.length > 0 && !force) {
      return
    }

    loading.value = true
    error.value = null
    reachedEnd.value = false
    nextUrl.value = null
    loadMoreError.value = false

    try {
      const res = await service.getChangelogs()
      changelogs.value = res.items
      nextUrl.value = res.nextUrl
      reachedEnd.value = !res.nextUrl
    } catch (err: any) {
      error.value = err.message || 'خطا در دریافت لیست تغییرات اخیر'
      changelogs.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchNextPage() {
    if (
      !nextUrl.value ||
      loadingMore.value ||
      loading.value ||
      loadMoreError.value
    )
      return

    loadingMore.value = true
    loadMoreError.value = false

    try {
      const res = await service.getChangelogs(nextUrl.value)
      if (res.items.length === 0) {
        reachedEnd.value = true
        nextUrl.value = null
      } else {
        changelogs.value.push(...res.items)
        nextUrl.value = res.nextUrl
        reachedEnd.value = !res.nextUrl
      }
    } catch (err) {
      console.error('[hamafzar-rn] Failed to load more changelogs:', err)
      loadMoreError.value = true
    } finally {
      loadingMore.value = false
    }
  }

  function retryLoadMore() {
    loadMoreError.value = false
    fetchNextPage()
  }

  async function selectChangelog(item: ChangelogItem) {
    clickedItem.value = item
    detailLoading.value = true

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      ;(document as any).startViewTransition(() => {
        selectedChangelog.value = item
      })
    } else {
      selectedChangelog.value = item
    }

    try {
      const full = await service.getChangelogDetail(item.id, item)
      if (full) {
        selectedChangelog.value = full
      }
    } catch (e) {
      console.error('[hamafzar-rn] Failed to fetch full changelog detail:', e)
    } finally {
      detailLoading.value = false
    }
  }

  function goBack() {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      const transition = (document as any).startViewTransition(() => {
        selectedChangelog.value = null
      })
      transition?.finished?.then(() => {
        clickedItem.value = null
      })
    } else {
      selectedChangelog.value = null
      clickedItem.value = null
    }
  }

  function refresh() {
    if (selectedChangelog.value) {
      selectChangelog(clickedItem.value || selectedChangelog.value)
    } else {
      fetchChangelogs(true)
    }
  }

  return {
    isOpen,
    panelSize,
    changelogs,
    selectedChangelog,
    clickedItem,
    loading,
    loadingMore,
    detailLoading,
    error,
    loadMoreError,
    nextUrl,
    reachedEnd,
    hasUnread,
    latestVersion,
    activeConfig,
    markAsRead,
    setPanelSize,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    fetchChangelogs,
    fetchNextPage,
    retryLoadMore,
    selectChangelog,
    goBack,
    refresh,
  }
}
