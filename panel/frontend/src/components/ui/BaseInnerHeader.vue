<template>
  <!-- Inner content header: title block (RTL start) + action buttons (RTL end) -->
  <div class="flex items-center justify-between w-full gap-3" data-name="Inner Header">
    <!-- Right (RTL start): breadcrumb navigation -->
    <div class="min-w-0 flex-1">
      <BaseBreadcrumb
        :title="title"
        :level="parentTitle ? 'two' : 'one'"
        :parent-title="parentTitle"
        :parent-path="parentPath"
        :show-home="showHome"
      />
    </div>

    <!-- Left (RTL end): create + search + filter + menu buttons -->
    <div class="flex items-center gap-1.5 shrink-0">
      <slot name="actions">
        <!-- 1. Create Action Button (Placed first) -->
        <BaseTooltip v-if="showCreate" :text="createTooltip">
          <button
            type="button"
            class="group h-9 w-9 hover:w-[96px] hover:pe-3 min-h-9 rounded-full bg-primary-100 hover:bg-primary-80 active:scale-95 text-white-100 flex items-center justify-start transition-all duration-300 cursor-pointer outline-none shadow-xs overflow-hidden whitespace-nowrap"
            @click="handleCreateClick"
          >
            <div class="w-9 h-9 min-w-9 min-h-9 flex items-center justify-center shrink-0">
              <Icon icon="solar:add-bold" class="w-4.5 h-4.5" />
            </div>
            <span
              class="max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden pointer-events-none"
            >
              {{ createLabel }}
            </span>
          </button>
        </BaseTooltip>

        <!-- 2. Search Action & Animated Expandable Field (Placed after create) -->
        <div
          v-if="showSearch"
          ref="searchContainerRef"
          class="relative flex items-center"
        >
          <slot
            name="search"
            :is-open="isSearchOpen"
            :query="searchQuery"
            :open="openSearch"
            :close="closeSearch"
            :clear="clearSearch"
          >
            <BaseTooltip :text="searchTooltip" :disabled="isSearchOpen && !isFloatingActive">
              <div
                class="group h-9 min-h-9 rounded-full flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none overflow-hidden whitespace-nowrap cursor-pointer"
                :class="[
                  isSearchOpen && !isFloatingActive
                    ? 'w-52 sm:w-64 md:w-72 bg-white-100 border border-primary-12 shadow-xs ring-2 ring-primary-100/10 focus-within:border-secondary-100 focus-within:ring-secondary-100/20 text-primary-100 cursor-default'
                    : isSearchOpen && isFloatingActive
                      ? 'w-9 bg-white-100 border border-secondary-100 shadow-xs ring-2 ring-secondary-100/20 text-secondary-100'
                      : 'w-9 hover:w-[96px] hover:pe-3 bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100 active:scale-95'
                ]"
                @click="handleSearchContainerClick"
              >
                <!-- Animated Search Icon -->
                <button
                  type="button"
                  :tabindex="isSearchOpen && !isFloatingActive ? -1 : 0"
                  :aria-label="searchTooltip"
                  class="w-9 h-9 min-w-9 min-h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer outline-none"
                  :class="[
                    isSearchOpen
                      ? 'text-secondary-100 -rotate-12 scale-105 hover:opacity-80'
                      : 'text-primary-80 group-hover:text-primary-100 group-hover:scale-110'
                  ]"
                  @click.stop="handleIconClick"
                >
                  <Icon
                    :icon="isSearchOpen ? 'solar:magnifer-bold' : 'solar:magnifer-bold-duotone'"
                    class="w-4.5 h-4.5 shrink-0 transition-transform duration-300"
                  />
                </button>

                <!-- Collapsed Hover Label -->
                <span
                  v-if="!isSearchOpen"
                  class="max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden pointer-events-none"
                >
                  {{ searchLabel }}
                </span>

                <!-- Expanded Input Container (Desktop inline mode only) -->
                <div
                  v-else-if="!isFloatingActive"
                  class="flex-1 min-w-0 flex items-center h-full pe-1 transition-opacity duration-200"
                  @click.stop
                >
                  <input
                    ref="searchInputRef"
                    v-model="searchQuery"
                    type="text"
                    :placeholder="searchPlaceholder"
                    class="w-full h-full bg-transparent border-none outline-none text-xs font-sans text-primary-100 placeholder:text-primary-40 ps-0.5 pe-1 select-text"
                    @keydown.esc="handleEscKey"
                    @keydown.enter="handleEnterKey"
                  />

                  <!-- Clear text button -->
                  <button
                    v-if="searchQuery"
                    type="button"
                    class="w-5 h-5 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-80 hover:bg-primary-6 active:scale-90 transition-all shrink-0 mx-0.5 outline-none cursor-pointer"
                    title="پاک کردن متن"
                    @click.stop="clearSearch"
                  >
                    <Icon icon="solar:close-circle-bold" class="w-3.5 h-3.5" />
                  </button>

                  <!-- Close / Collapse Button -->
                  <button
                    type="button"
                    class="w-6 h-6 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-100 hover:bg-primary-12 active:scale-90 transition-all shrink-0 outline-none cursor-pointer me-1"
                    title="بستن جستجو (Esc)"
                    @click.stop="closeSearch"
                  >
                    <Icon icon="solar:close-circle-linear" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </BaseTooltip>
          </slot>
        </div>

        <!-- 3. Filter Action & Dropdown -->
        <div v-if="showFilter" ref="filterContainerRef" class="relative">
          <BaseTooltip :text="filterTooltip">
            <button
              type="button"
              class="group h-9 w-9 hover:w-[96px] hover:pe-3 min-h-9 rounded-full flex items-center justify-start transition-all duration-300 cursor-pointer outline-none active:scale-95 overflow-hidden whitespace-nowrap"
              :class="
                filterActive || isFilterMenuOpen
                  ? 'bg-secondary-100 text-white-100 shadow-xs ring-1 ring-secondary-100/30'
                  : 'bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100'
              "
              @click="handleFilterClick"
            >
              <div class="w-9 h-9 min-w-9 min-h-9 flex items-center justify-center shrink-0">
                <Icon icon="solar:filter-bold-duotone" class="w-4.5 h-4.5" />
              </div>
              <span
                class="max-w-0 opacity-0 group-hover:max-w-16 group-hover:opacity-100 group-hover:ms-1 transition-all duration-300 text-xs font-bold font-dots-1 overflow-hidden pointer-events-none"
              >
                {{ filterLabel }}
              </span>
            </button>
          </BaseTooltip>

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div
              v-if="$slots['filter-menu'] && isFilterMenuOpen"
              class="absolute left-0 top-full mt-2 bg-white-100 border border-primary-8 rounded-2xl p-1.5 shadow-card z-50 select-none font-sans text-right"
              dir="rtl"
            >
              <slot name="filter-menu" :close="closeFilterMenu" :is-open="isFilterMenuOpen" />
            </div>
          </Transition>
        </div>

        <!-- 4. Menu Action -->
        <BaseTooltip v-if="showMenu" :text="menuTooltip">
          <button
            type="button"
            class="w-9 h-9 min-w-9 min-h-9 rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none"
            @click="$emit('menu')"
          >
            <Icon icon="solar:menu-dots-bold" class="w-4.5 h-4.5" />
          </button>
        </BaseTooltip>
      </slot>
      <slot name="extra" />
    </div>

    <!-- Mobile / Floating Search Modal Overlay (Inspired by Modal Design System) -->
    <Teleport to="body">
      <Transition name="floating-search">
        <div
          v-if="isSearchOpen && isFloatingActive"
          class="fixed inset-0 z-[9999] flex flex-col items-center justify-start p-3 sm:p-6"
          dir="rtl"
        >
          <!-- Modal-style Backdrop with blur -->
          <div
            class="fixed inset-0 bg-black-32/50 backdrop-blur-sm transition-opacity"
            @click="closeSearch"
          />

          <!-- Floating Modal Card (Styled after Hesabro modal design system) -->
          <div
            ref="floatingModalRef"
            class="relative z-10 w-full max-w-md bg-white-80 backdrop-blur-xl border border-primary-8 rounded-2xl shadow-card overflow-hidden flex flex-col max-h-[75vh] transition-all font-sans"
            @click.stop
          >
            <!-- Modal-style Search Header -->
            <div class="flex items-center gap-2.5 p-3 sm:p-3.5 border-b border-primary-8 bg-white-60 backdrop-blur-md">
              <div
                class="w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center shrink-0 border bg-primary-6 text-secondary-100 border-primary-12 shadow-2xs"
              >
                <Icon icon="solar:magnifer-bold-duotone" class="w-4.5 h-4.5" />
              </div>

              <input
                ref="mobileSearchInputRef"
                v-model="searchQuery"
                type="text"
                :placeholder="searchPlaceholder || 'جستجو در این بخش...'"
                class="flex-1 min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm font-sans text-primary-100 placeholder:text-primary-40 select-text"
                @keydown.esc="closeSearch"
                @keydown.enter="handleEnterKey"
              />

              <!-- Loading spinner -->
              <Icon
                v-if="searchLoading"
                icon="solar:restart-bold"
                class="w-4 h-4 text-primary-40 animate-spin shrink-0"
              />

              <!-- Clear Query Button -->
              <button
                v-if="searchQuery"
                type="button"
                class="w-6 h-6 rounded-full flex items-center justify-center text-primary-40 hover:text-primary-80 active:scale-90 transition-all shrink-0 outline-none cursor-pointer"
                title="پاک کردن متن"
                @click="clearSearch"
              >
                <Icon icon="solar:close-circle-bold" class="w-4 h-4" />
              </button>

              <!-- Modal Close Button (Circular, standard modal style) -->
              <button
                type="button"
                class="w-7 h-7 min-w-[28px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shrink-0"
                title="بستن (Esc)"
                @click="closeSearch"
              >
                <Icon icon="solar:close-circle-linear" class="w-4 h-4" />
              </button>
            </div>

            <!-- Simplified Internal Search Results List (No dividing lines between items) -->
            <div class="flex-1 overflow-y-auto max-h-[50vh] p-2 flex flex-col gap-1">
              <slot
                name="search-results"
                :results="filteredResults"
                :query="searchQuery"
                :close="closeSearch"
                :select="handleSelectResult"
              >
                <!-- Render list of search results without divider lines -->
                <template v-if="filteredResults.length > 0">
                  <button
                    v-for="item in filteredResults"
                    :key="item.id"
                    type="button"
                    class="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-6 active:bg-primary-12 transition-all cursor-pointer group text-right outline-none"
                    @click="handleSelectResult(item)"
                  >
                    <!-- Icon + Title + Subtitle -->
                    <div class="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        class="w-7 h-7 min-w-[28px] rounded-lg bg-primary-6 border border-primary-12 text-primary-80 group-hover:text-secondary-100 group-hover:bg-secondary-100/10 group-hover:border-secondary-100/20 flex items-center justify-center shrink-0 transition-colors"
                      >
                        <Icon
                          :icon="item.icon || 'solar:document-text-bold-duotone'"
                          class="w-4 h-4 shrink-0 transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div class="flex flex-col min-w-0 flex-1">
                        <span class="text-xs font-bold text-primary-100 truncate group-hover:text-secondary-100 transition-colors">
                          {{ item.title }}
                        </span>
                        <span
                          v-if="item.subtitle"
                          class="text-2xs text-primary-40 truncate mt-0.5"
                        >
                          {{ item.subtitle }}
                        </span>
                      </div>
                    </div>

                    <!-- Badge & Action Chevron from Design System -->
                    <div class="flex items-center gap-2 shrink-0">
                      <BaseBadge
                        v-if="item.badge"
                        size="2xs"
                        :type="(item.badgeType as any) || 'secondary'"
                      >
                        {{ item.badge }}
                      </BaseBadge>
                      <Icon
                        icon="solar:alt-arrow-left-linear"
                        class="w-3.5 h-3.5 text-primary-24 group-hover:text-secondary-100 group-hover:-translate-x-0.5 transition-all"
                      />
                    </div>
                  </button>
                </template>

                <!-- Clean simple empty state with Design System duotone icon -->
                <div
                  v-else-if="searchQuery"
                  class="flex flex-col items-center justify-center py-8 px-4 text-center text-primary-40"
                >
                  <Icon icon="solar:magnifer-bold-duotone" class="w-9 h-9 mb-1.5 opacity-40 text-primary-40" />
                  <span class="text-xs font-bold text-primary-80">{{ searchEmptyText }}</span>
                  <span class="text-3xs text-primary-40 mt-1 font-dots-1">عبارت دیگری را امتحان کنید</span>
                </div>

                <!-- Empty prompt -->
                <div
                  v-else
                  class="flex flex-col items-center justify-center py-7 px-4 text-center text-primary-40"
                >
                  <Icon icon="solar:magnifer-bold-duotone" class="w-8 h-8 mb-1.5 text-secondary-100 opacity-40" />
                  <span class="text-xs font-medium text-primary-60">جستجو در این صفحه</span>
                  <span class="text-3xs text-primary-40 mt-0.5">عبارت مورد نظر خود را تایپ کنید...</span>
                </div>
              </slot>
            </div>

            <!-- Modal-style footer indicator -->
            <div
              v-if="filteredResults.length > 0"
              class="px-3.5 py-2 bg-primary-4/80 border-t border-primary-8 flex items-center justify-between text-3xs text-primary-40 font-dots-1"
            >
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-100" />
                {{ filteredResults.length }} مورد یافت شد
              </span>
              <span class="font-mono text-primary-40">Esc برای بستن</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, useSlots, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import BaseBreadcrumb from '@/components/ui/BaseBreadcrumb.vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

export interface SearchResultItem {
  id: string | number
  title: string
  subtitle?: string
  badge?: string
  badgeType?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'white' | 'neutral'
  icon?: string
  action?: () => void
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    /** Current page title (breadcrumb active title) */
    title?: string
    /** Parent page title (enables level-two breadcrumb) */
    parentTitle?: string
    /** Parent page path */
    parentPath?: string
    /** Show the home icon in the breadcrumb */
    showHome?: boolean
    /** Show the search button & expanding input */
    showSearch?: boolean
    /** Search input value (v-model, v-model:search) */
    modelValue?: string
    search?: string
    /** Search button label on hover when collapsed */
    searchLabel?: string
    /** Search button tooltip */
    searchTooltip?: string
    /** Search input placeholder */
    searchPlaceholder?: string
    /** Controlled open state for search input */
    searchOpen?: boolean
    /** Auto-collapse search when clicking outside (only if empty) */
    autoCollapseSearch?: boolean
    /** Enable floating search overlay on mobile screens (< 640px) */
    mobileFloatingSearch?: boolean
    /** Force floating search regardless of screen size (useful for sandbox/modal views) */
    floatingSearch?: boolean
    /** Search results array to display in the floating modal */
    searchResults?: SearchResultItem[]
    /** Loading state for search results */
    searchLoading?: boolean
    /** Empty results text */
    searchEmptyText?: string
    /** Show the plus (create) button */
    showCreate?: boolean
    /** Create button label on hover */
    createLabel?: string
    /** Create button tooltip */
    createTooltip?: string
    /** Show the filter button */
    showFilter?: boolean
    /** Filter button label on hover */
    filterLabel?: string
    /** Filter button tooltip */
    filterTooltip?: string
    /** Highlight the filter button as active */
    filterActive?: boolean
    /** Controlled open state for the filter dropdown */
    filterOpen?: boolean
    /** Show the three-dot menu button */
    showMenu?: boolean
    /** Menu button tooltip */
    menuTooltip?: string
  }>(),
  {
    title: '',
    parentTitle: '',
    parentPath: '',
    showHome: true,
    showSearch: true,
    modelValue: undefined,
    search: undefined,
    searchLabel: 'جستجو',
    searchTooltip: 'جستجو',
    searchPlaceholder: 'جستجو...',
    searchOpen: undefined,
    autoCollapseSearch: true,
    mobileFloatingSearch: true,
    floatingSearch: undefined,
    searchResults: () => [],
    searchLoading: false,
    searchEmptyText: 'موردی یافت نشد',
    showCreate: true,
    createLabel: 'ایجاد',
    createTooltip: 'ایجاد جدید',
    showFilter: true,
    filterLabel: 'فیلتر',
    filterTooltip: 'فیلترها',
    filterActive: false,
    filterOpen: undefined,
    showMenu: true,
    menuTooltip: 'عملیات بیشتر',
  },
)

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'filter'): void
  (e: 'update:filterOpen', val: boolean): void
  (e: 'menu'): void
  (e: 'update:modelValue', val: string): void
  (e: 'update:search', val: string): void
  (e: 'update:searchOpen', val: boolean): void
  (e: 'search', query: string): void
  (e: 'search-submit', query: string): void
  (e: 'search-clear'): void
  (e: 'search-open'): void
  (e: 'search-close'): void
  (e: 'select-result', item: SearchResultItem): void
}>()

const slots = useSlots()

defineSlots<{
  actions?: (props: {}) => any
  extra?: (props: {}) => any
  'filter-menu'?: (props: { close: () => void; isOpen: boolean }) => any
  search?: (props: {
    isOpen: boolean
    query: string
    open: () => void
    close: () => void
    clear: () => void
  }) => any
  'search-results'?: (props: {
    results: SearchResultItem[]
    query: string
    close: () => void
    select: (item: SearchResultItem) => void
  }) => any
}>()

const searchContainerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const mobileSearchInputRef = ref<HTMLInputElement | null>(null)
const floatingModalRef = ref<HTMLElement | null>(null)
const internalSearchQuery = ref('')
const internalSearchOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640
  }
}

const isFloatingActive = computed(() => {
  if (props.floatingSearch !== undefined) {
    return props.floatingSearch
  }
  return props.mobileFloatingSearch && isMobile.value
})

const searchQuery = computed({
  get: () => {
    if (props.modelValue !== undefined) return props.modelValue
    if (props.search !== undefined) return props.search
    return internalSearchQuery.value
  },
  set: (val: string) => {
    internalSearchQuery.value = val
    emit('update:modelValue', val)
    emit('update:search', val)
    emit('search', val)
  },
})

const filteredResults = computed(() => {
  if (!props.searchResults || props.searchResults.length === 0) return []
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.searchResults
  return props.searchResults.filter((item) => {
    const titleMatch = item.title ? item.title.toLowerCase().includes(query) : false
    const subtitleMatch = item.subtitle ? item.subtitle.toLowerCase().includes(query) : false
    const badgeMatch = item.badge ? item.badge.toLowerCase().includes(query) : false
    return titleMatch || subtitleMatch || badgeMatch
  })
})

const isSearchOpen = computed({
  get: () => (props.searchOpen !== undefined ? props.searchOpen : internalSearchOpen.value),
  set: (val: boolean) => {
    internalSearchOpen.value = val
    emit('update:searchOpen', val)
    if (val) {
      emit('search-open')
      nextTick(() => {
        if (isFloatingActive.value) {
          mobileSearchInputRef.value?.focus()
        } else {
          searchInputRef.value?.focus()
        }
      })
    } else {
      emit('search-close')
    }
  },
})

watch(
  () => props.searchOpen,
  (val) => {
    if (val) {
      nextTick(() => {
        if (isFloatingActive.value) {
          mobileSearchInputRef.value?.focus()
        } else {
          searchInputRef.value?.focus()
        }
      })
    }
  },
)

const openSearch = () => {
  isSearchOpen.value = true
}

const closeSearch = () => {
  isSearchOpen.value = false
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search-clear')
  nextTick(() => {
    if (isFloatingActive.value) {
      mobileSearchInputRef.value?.focus()
    } else {
      searchInputRef.value?.focus()
    }
  })
}

const handleSearchContainerClick = () => {
  if (!isSearchOpen.value) {
    openSearch()
  } else if (isFloatingActive.value) {
    closeSearch()
  }
}

const handleIconClick = () => {
  if (!isSearchOpen.value) {
    openSearch()
  } else {
    if (isFloatingActive.value) {
      closeSearch()
    } else {
      if (searchQuery.value) {
        emit('search-submit', searchQuery.value)
      } else {
        closeSearch()
      }
    }
  }
}

const handleSelectResult = (item: SearchResultItem) => {
  if (item.action) {
    item.action()
  }
  emit('select-result', item)
  closeSearch()
}

const handleEscKey = () => {
  if (searchQuery.value) {
    clearSearch()
  } else {
    closeSearch()
  }
}

const handleEnterKey = () => {
  emit('search-submit', searchQuery.value)
}

const filterContainerRef = ref<HTMLElement | null>(null)
const internalFilterOpen = ref(false)

const isFilterMenuOpen = computed({
  get: () => (props.filterOpen !== undefined ? props.filterOpen : internalFilterOpen.value),
  set: (val: boolean) => {
    internalFilterOpen.value = val
    emit('update:filterOpen', val)
  },
})

const handleCreateClick = () => {
  emit('create')
}

const handleFilterClick = () => {
  if (slots['filter-menu']) {
    isFilterMenuOpen.value = !isFilterMenuOpen.value
  }
  emit('filter')
}

const closeFilterMenu = () => {
  isFilterMenuOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node

  if (
    isFilterMenuOpen.value &&
    filterContainerRef.value &&
    !filterContainerRef.value.contains(target)
  ) {
    closeFilterMenu()
  }

  if (
    !isFloatingActive.value &&
    isSearchOpen.value &&
    props.autoCollapseSearch &&
    searchContainerRef.value &&
    !searchContainerRef.value.contains(target)
  ) {
    if (!searchQuery.value) {
      closeSearch()
    }
  }
}

onMounted(() => {
  checkMobile()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', checkMobile)
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
  }
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.floating-search-enter-active,
.floating-search-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-search-enter-from,
.floating-search-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
}
</style>
