<template>
  <div class="leftbar-item" :class="{ active: open }">
    <div
      data-tooltip="تغییرات اخیر"
      class="pnd-tooltip leftbar-icon"
      :class="{ active: open }"
      @click="openCloseContent()"
      style="display: flex; align-items: center; justify-content: center;"
    >
      <PSvg :svg="alarmBoldDuotone" />
    </div>
    <div class="leftbar-content" :class="['size-' + panelSize]">
      <!-- ! Detail View Component -->
      <RecentChangesDetail
        v-if="selectedChangelog"
        :selectedChangelog="selectedChangelog"
        :detailLoading="detailLoading"
        @back="goBack"
      />

      <!-- ! List View -->
      <div v-else class="list-wrapper">
        <ComplexCardHeader
          :startIcon="alarmBold"
          startIconBgColor="bg-info-8"
          startIconTextColor="text-info-100"
          title="تغییرات اخیر"
          subtitle="نمایش نسخه‌های منتشر شده و تغییرات آن"
          style="margin: 20px !important"
        />

        <div class="divider"></div>

        <!-- ! Loading State -->
        <div v-if="loading" class="changelog-container pnd-scrollable hide-scrollbar">
          <div class="changelog-content">
            <div class="changelog-timeline">
              <div class="changelog-timeline-bar"></div>
            </div>
            <div class="changelog-items">
              <div v-for="n in 4" :key="n" class="changelog-item">
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
        </div>

        <!-- ! Error State -->
        <div v-else-if="error" class="changelog-container">
          <div style="text-align: center; color: var(--error-100); padding: 20px; font-weight: bold; direction: rtl;">
            {{ error || 'خطا در دریافت اطلاعات' }}
          </div>
        </div>

        <!-- ! Content -->
        <div v-else class="changelog-container pnd-scrollable hide-scrollbar" @scroll="handleScroll">
          <div class="changelog-content">
            <!-- ! Vertical Timeline Bar -->
            <div class="changelog-timeline">
              <div class="changelog-timeline-bar"></div>
            </div>

            <!-- ! Items -->
            <div class="changelog-items">
              <div
                v-for="(item, index) in changelogs"
                :key="index"
                class="changelog-item"
                :class="`type-${item.type}`"
                @click="selectChangelog(item)"
              >
                <!-- ! Main Information -->
                <div class="changelog-info">
                  <!-- ! Date & Version Badge -->
                  <div class="changelog-header">
                    <span class="changelog-date">{{ item.date }}</span>
                    <span class="changelog-badge">نسخه {{ item.version }}</span>
                  </div>

                  <!-- ! Title & Description -->
                  <div class="changelog-body">
                    <h5 class="changelog-title">{{ item.title }}</h5>
                    <p class="changelog-desc">{{ item.description }}</p>
                  </div>
                </div>

                <!-- ! Thumbnail -->
                <div class="changelog-thumbnail">
                  <img
                    :src="item.thumbnail"
                    :alt="item.title"
                    :style="
                      clickedItem === item
                        ? 'view-transition-name: hero-thumbnail'
                        : ''
                    "
                  />
                </div>

                <!-- ! Timeline Dot -->
                <div class="changelog-dot"></div>
              </div>

              <!-- ! Skeleton Loader for Loading More -->
              <template v-if="loadingMore">
                <div v-for="n in 2" :key="'skeleton-' + n" class="changelog-item">
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
              </template>

              <!-- ! Error loading more -->
              <div v-if="loadMoreError" class="changelog-load-more-error">
                <span>خطا در دریافت اطلاعات صفحات بعدی</span>
                <button class="btn-retry" @click="retryLoadMore">تلاش مجدد</button>
              </div>

            </div>
          </div>

          <!-- ! Reached End Text -->
          <div v-if="reachedEnd" class="changelog-reached-end" style="margin-top: 24px;">
            به انتهای لیست رسیدید
          </div>
        </div>
      </div>

      <!-- ! Actions -->
      <LeftbarActions
        v-model="panelSize"
        :showRefresh="true"
        class="leftbar-actions"
        @close="openCloseContent()"
        @refresh="refreshChangelogs"
      />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "../../app/store";
import { ref, watch, computed } from "vue";
import { PSvg } from "pandora-design-system";
import alarmBold from "pandora-icons/alarmBold";
import alarmBoldDuotone from "pandora-icons/alarmBoldDuotone";
import ComplexCardHeader from "../ComplexCardHeader.vue";
import RecentChangesDetail from "./RecentChangesDetail.vue";
import { useWindowSize } from "@vueuse/core";
import LeftbarActions from "./LeftbarActions.vue";

const appStore = useAppStore();
const { width } = useWindowSize();
const panelSize = ref("small");
const emit = defineEmits(["update:open"]);
const props = defineProps({
  open: Boolean,
});

const selectedChangelog = ref(null);
const clickedItem = ref(null);
const changelogs = ref([]);
const loading = ref(false);
const error = ref(null);
const detailLoading = ref(false);
const nextUrl = ref(null);
const loadingMore = ref(false);
const reachedEnd = ref(false);
const loadMoreError = ref(false);

const priorityToType = {
  'HIGH': 'error',
  'MEDIUM': 'warning',
  'LOW': 'info',
};

const mapVersionToChangelog = (apiItem) => {
  const features = [];
  const improvements = [];
  const bugfixes = [];
  const notes = [];
  
  (apiItem.details || []).forEach((detail, idx) => {
    const mapped = {
      id: detail.id || idx + 1,
      module: detail.module_name || '',
      moduleIcon: detail.module_icon || '',
      title: detail.title || '',
      description: detail.explanation || '',
      linkText: detail.path_name || detail.path || '',
      linkUrl: detail.path || '',
    };
    
    switch (detail.type) {
      case 'NEW_FEATURE':
        features.push(mapped);
        break;
      case 'IMPROVEMENT':
        improvements.push(mapped);
        break;
      case 'BUGFIX':
        bugfixes.push(mapped);
        break;
      case 'NOTE':
        notes.push(mapped);
        break;
    }
  });
  
  return {
    id: apiItem.id,
    version: apiItem.version || '',
    date: apiItem.release_date || '',
    title: apiItem.title || apiItem.version || '',
    description: apiItem.introduction || '',
    thumbnail: apiItem.thumbnail || '',
    type: priorityToType[apiItem.priority] || 'secondary',
    caption: apiItem.thumbnail_caption || '',
    intro: apiItem.introduction || '',
    features,
    improvements,
    bugfixes,
    notes,
    summary: apiItem.summary || '',
  };
};

const cleanNextUrl = (url) => {
  if (!url) return null;
  const initialUrl = appStore.getConfig?.changelogVersionsApiUrl;
  if (initialUrl && initialUrl.startsWith('https://') && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

const fetchChangelogs = async () => {
  const url = appStore.getConfig?.changelogVersionsApiUrl;
  if (!url) return;
  
  loading.value = true;
  error.value = null;
  reachedEnd.value = false;
  nextUrl.value = null;
  loadMoreError.value = false;
  
  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch changelogs');
    const data = await response.json();
    const versionsList = Array.isArray(data) ? data : (data.results || []);
    changelogs.value = versionsList.map(item => mapVersionToChangelog(item));
    nextUrl.value = cleanNextUrl(data.next);
    reachedEnd.value = !data.next;
  } catch (e) {
    error.value = e.message;
    changelogs.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchNextPage = async () => {
  if (!nextUrl.value || loadingMore.value || loading.value || loadMoreError.value) return;
  
  loadingMore.value = true;
  loadMoreError.value = false;
  
  try {
    const response = await fetch(nextUrl.value, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch more changelogs');
    const data = await response.json();
    const versionsList = Array.isArray(data) ? data : (data.results || []);
    const newItems = versionsList.map(item => mapVersionToChangelog(item));
    
    if (newItems.length === 0) {
      reachedEnd.value = true;
      nextUrl.value = null;
    } else {
      changelogs.value.push(...newItems);
      nextUrl.value = cleanNextUrl(data.next);
      reachedEnd.value = !data.next;
    }
  } catch (e) {
    console.error('Failed to fetch more changelogs:', e);
    loadMoreError.value = true;
  } finally {
    loadingMore.value = false;
  }
};

const retryLoadMore = () => {
  loadMoreError.value = false;
  fetchNextPage();
};

const handleScroll = (event) => {
  const container = event.target;
  if (!container) return;
  
  const threshold = 50; // pixels before bottom
  const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
  
  if (isNearBottom) {
    fetchNextPage();
  }
};

const selectChangelog = async (item) => {
  clickedItem.value = item;
  detailLoading.value = true;
  
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      selectedChangelog.value = item;
    });
  } else {
    selectedChangelog.value = item;
  }
  
  const urlTemplate = appStore.getConfig?.changelogVersionDetailApiUrl;
  if (urlTemplate && item.id) {
    try {
      const url = urlTemplate.replace(':id', item.id);
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const detailData = await response.json();
        const fullItem = mapVersionToChangelog(detailData);
        
        if (item.title) {
          fullItem.title = item.title;
        }
        
        selectedChangelog.value = fullItem;
        detailLoading.value = false;
        return;
      }
    } catch (e) {
      console.error('Failed to fetch changelog detail:', e);
    }
  }
  detailLoading.value = false;
};

// Reset selected changelog and panel size on panel close
watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      fetchChangelogs();
    } else {
      selectedChangelog.value = null;
      clickedItem.value = null;
      panelSize.value = "small";
      changelogs.value = [];
      nextUrl.value = null;
      loadingMore.value = false;
      reachedEnd.value = false;
      loadMoreError.value = false;
    }
  },
);

const goBack = () => {
  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      selectedChangelog.value = null;
    });
    transition.finished.then(() => {
      clickedItem.value = null;
    });
  } else {
    selectedChangelog.value = null;
    clickedItem.value = null;
  }
};

const openCloseContent = () => {
  emit("update:open", !props.open);
};

const refreshChangelogs = () => {
  if (selectedChangelog.value) {
    selectChangelog(clickedItem.value || selectedChangelog.value);
  } else {
    fetchChangelogs();
  }
};
</script>

<style scoped>
@import "../../assets/css/recent-changes-list.css";
@import "../../assets/css/recent-changes-skeleton.css";
</style>

<style>
@import "../../assets/css/recent-changes-transitions.css";
</style>
