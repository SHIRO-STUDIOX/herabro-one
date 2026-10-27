<template>
  <Teleport to="body" :disabled="!teleport">
    <div
      v-if="effectiveOpen"
      class="hrn-global-blur-wrapper"
      @click="handleBackdropClick"
    ></div>

    <div
      class="hrn-drawer-root"
      :class="{
        'is-open': effectiveOpen,
        [`size-${panelSize}`]: true,
      }"
      dir="rtl"
    >
      <div class="hrn-drawer-content" :class="`size-${panelSize}`">
        <!-- Detail View -->
        <ChangelogDetail
          v-if="selectedChangelog"
          :selected-changelog="selectedChangelog"
          :detail-loading="detailLoading"
          @back="goBack"
          @close="closeDrawer"
          @refresh="refreshChangelogs"
          @navigate="(url) => $emit('navigate', url)"
        />

        <!-- List View -->
        <div v-else class="list-wrapper">
          <ComplexCardHeader
            :start-icon="alarmBold"
            start-icon-bg-color="bg-info-8"
            start-icon-text-color="text-info-100"
            :title="title"
            :subtitle="subtitle"
            style="margin: 20px !important"
          >
            <!-- Header Mobile Controls -->
            <div class="header-mobile-actions">
              <button
                type="button"
                class="mobile-action-btn refresh-btn"
                @click.stop="refreshChangelogs"
                title="به‌روزرسانی"
              >
                <Icon icon="solar:restart-bold" />
              </button>
              <button
                type="button"
                class="mobile-action-btn close-btn"
                @click.stop="closeDrawer"
                title="بستن"
              >
                <Icon icon="solar:close-circle-bold-duotone" />
              </button>
            </div>
          </ComplexCardHeader>

          <div class="hrn-divider"></div>

          <!-- Changelogs Container -->
          <div
            class="changelog-container hide-scrollbar"
            @scroll="handleScroll"
          >
            <!-- Loading Skeleton -->
            <div
              v-if="loading && changelogs.length === 0"
              class="changelog-content"
            >
              <div class="changelog-timeline">
                <div class="changelog-timeline-bar"></div>
              </div>
              <div class="changelog-items">
                <div v-for="n in 3" :key="n" class="changelog-item">
                  <div class="changelog-info">
                    <div class="changelog-header" style="gap: 8px;">
                      <span class="skeleton" style="width: 80px; height: 16px;"></span>
                      <span class="skeleton" style="width: 60px; height: 16px; border-radius: 999px;"></span>
                    </div>
                    <div class="changelog-body" style="margin-top: 6px;">
                      <div class="skeleton" style="width: 70%; height: 22px;"></div>
                      <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
                        <div class="skeleton" style="width: 100%; height: 14px;"></div>
                        <div class="skeleton" style="width: 100%; height: 14px;"></div>
                        <div class="skeleton" style="width: 60%; height: 14px;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="changelog-thumbnail">
                    <div class="skeleton" style="width: 100%; height: 100%; border-radius: 12px;"></div>
                  </div>
                  <div class="changelog-dot">
                    <div class="skeleton" style="width: 6px; height: 6px; border-radius: 50%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error && changelogs.length === 0" class="hrn-error-box">
              <span>{{ error }}</span>
              <button class="btn-retry" @click="refreshChangelogs">تلاش مجدد</button>
            </div>

            <!-- Empty State -->
            <div v-else-if="changelogs.length === 0 && !loading" class="hrn-empty-box">
              تغییری برای نمایش وجود ندارد
            </div>

            <!-- Content State -->
            <div v-else class="changelog-content">
              <!-- Timeline Bar -->
              <div class="changelog-timeline">
                <div class="changelog-timeline-bar"></div>
              </div>

              <!-- Items List -->
              <div class="changelog-items">
                <div
                  v-for="(item, index) in changelogs"
                  :key="item.id ?? index"
                  class="changelog-item"
                  :class="`type-${item.type}`"
                  @click="selectChangelog(item)"
                >
                  <div class="changelog-info">
                    <div class="changelog-header">
                      <span class="changelog-date">{{ item.date }}</span>
                      <span class="changelog-badge">نسخه {{ item.version }}</span>
                    </div>
                    <div class="changelog-body">
                      <h5 class="changelog-title">{{ item.title }}</h5>
                      <p class="changelog-desc">{{ item.description }}</p>
                    </div>
                  </div>

                  <div v-if="item.thumbnail" class="changelog-thumbnail">
                    <img :src="item.thumbnail" :alt="item.title" />
                  </div>

                  <div class="changelog-dot"></div>
                </div>

                <!-- Skeleton for next page loading -->
                <template v-if="loadingMore">
                  <div class="changelog-item">
                    <div class="changelog-info">
                      <div class="changelog-header" style="gap: 8px;">
                        <span class="skeleton" style="width: 80px; height: 16px;"></span>
                        <span class="skeleton" style="width: 60px; height: 16px; border-radius: 999px;"></span>
                      </div>
                      <div class="changelog-body" style="margin-top: 6px;">
                        <div class="skeleton" style="width: 70%; height: 22px;"></div>
                        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
                          <div class="skeleton" style="width: 100%; height: 14px;"></div>
                          <div class="skeleton" style="width: 60%; height: 14px;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="changelog-thumbnail">
                      <div class="skeleton" style="width: 100%; height: 100%; border-radius: 12px;"></div>
                    </div>
                    <div class="changelog-dot">
                      <div class="skeleton" style="width: 6px; height: 6px; border-radius: 50%;"></div>
                    </div>
                  </div>
                </template>

                <!-- Load More Error -->
                <div v-if="loadMoreError" class="changelog-load-more-error">
                  <span>خطا در دریافت اطلاعات صفحات بعدی</span>
                  <button class="btn-retry" @click="retryLoadMore">تلاش مجدد</button>
                </div>
              </div>
            </div>

            <!-- Reached End Text -->
            <div v-if="reachedEnd && changelogs.length > 0" class="changelog-reached-end" style="margin-top: 24px;">
              به انتهای لیست رسیدید
            </div>
          </div>
        </div>

        <!-- Floating Desktop Actions (small, medium, large, refresh, close) -->
        <ChangelogActions
          v-model="panelSize"
          :show-refresh="true"
          class="hrn-floating-actions"
          @close="closeDrawer"
          @refresh="refreshChangelogs"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import ComplexCardHeader from './ComplexCardHeader.vue'
import ChangelogDetail from './ChangelogDetail.vue'
import ChangelogActions from './ChangelogActions.vue'
import { useChangelog } from '../composables/useChangelog'
import type { ChangelogItem, ChangelogPanelSize } from '../types'

const props = withDefaults(
  defineProps<{
    open?: boolean
    teleport?: boolean
    title?: string
    subtitle?: string
  }>(),
  {
    open: undefined,
    teleport: true,
    title: 'تغییرات اخیر',
    subtitle: 'نمایش نسخه‌های منتشر شده و تغییرات آن',
  },
)

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'navigate', url: string): void
}>()

const store = useChangelog()

const alarmBold = 'solar:bell-bold'

const effectiveOpen = computed({
  get: () => (props.open !== undefined ? props.open : store.isOpen.value),
  set: (val: boolean) => {
    emit('update:open', val)
    if (val) {
      store.openDrawer()
    } else {
      store.closeDrawer()
    }
  },
})

const panelSize = computed({
  get: () => store.panelSize.value,
  set: (val: ChangelogPanelSize) => store.setPanelSize(val),
})

const changelogs = computed(() => store.changelogs.value)
const selectedChangelog = computed(() => store.selectedChangelog.value)
const loading = computed(() => store.loading.value)
const loadingMore = computed(() => store.loadingMore.value)
const detailLoading = computed(() => store.detailLoading.value)
const error = computed(() => store.error.value)
const loadMoreError = computed(() => store.loadMoreError.value)
const reachedEnd = computed(() => store.reachedEnd.value)

onMounted(() => {
  store.fetchChangelogs()
})

watch(
  () => props.open,
  (newVal) => {
    if (newVal === true) {
      store.openDrawer()
    } else if (newVal === false) {
      store.closeDrawer()
    }
  },
)

const handleBackdropClick = () => {
  closeDrawer()
}

const closeDrawer = () => {
  effectiveOpen.value = false
  store.closeDrawer()
}

const selectChangelog = (item: ChangelogItem) => {
  store.selectChangelog(item)
}

const goBack = () => {
  store.goBack()
}

const refreshChangelogs = () => {
  store.refresh()
}

const retryLoadMore = () => {
  store.retryLoadMore()
}

const handleScroll = (event: Event) => {
  const container = event.target as HTMLElement
  if (!container) return

  const threshold = 50
  const isNearBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight <= threshold

  if (isNearBottom) {
    store.fetchNextPage()
  }
}
</script>

<style scoped>
.hrn-drawer-root {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  pointer-events: none;
  direction: rtl;
}

.hrn-drawer-root.is-open {
  pointer-events: auto;
}

.hrn-drawer-content {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: -460px;
  top: 68px;
  bottom: 12px;
  width: 402px;
  background-color: #ffffff;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 24px;
  box-shadow: 0px 0px 24px 0px var(--primary-12, rgba(0, 0, 0, 0.12));
  visibility: hidden;
  z-index: 1000;
  direction: rtl;
  overflow: visible;

  @media only screen and (max-width: 768px) {
    position: fixed;
    left: 12px !important;
    right: 12px !important;
    top: 68px !important;
    bottom: 68px !important;
    width: auto !important;
    height: auto !important;
    transform: translateY(100%);
  }
}

.hrn-drawer-root.is-open .hrn-drawer-content {
  left: 68px;
  opacity: 1;
  visibility: visible;

  @media only screen and (max-width: 768px) {
    left: 12px !important;
    transform: translateY(0);
  }
}

.hrn-drawer-root.is-open .hrn-drawer-content.size-small {
  width: 402px;
}

.hrn-drawer-root.is-open .hrn-drawer-content.size-medium {
  width: calc(50vw - 68px + 28px);
}

.hrn-drawer-root.is-open .hrn-drawer-content.size-large {
  width: calc(100vw - 136px);
}

.hrn-floating-actions {
  position: absolute;
  right: -52px;
  top: 20px;
  gap: 12px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    display: none !important;
  }
}

.hrn-divider {
  min-height: 1px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--primary-12, rgba(0, 0, 0, 0.12));
  margin: 0;
}

.hrn-error-box,
.hrn-empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 12px;
  color: var(--primary-60, rgba(0, 0, 0, 0.6));
  font-size: 14px;
  font-weight: 600;
}

.hrn-error-box {
  color: var(--error-100, #b84242);
}

.btn-retry {
  background: var(--primary-12, rgba(0, 0, 0, 0.12));
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-100, #49406d);
  transition: all 0.2s ease;
}

.btn-retry:hover {
  background: var(--primary-24, rgba(0, 0, 0, 0.24));
}

.changelog-load-more-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: var(--error-100, #b84242);
  font-size: 12px;
  font-weight: 600;
  gap: 4px;
}

.hide-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
  }
}
</style>
