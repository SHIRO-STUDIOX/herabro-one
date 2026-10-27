<template>
  <div class="detail-wrapper">
    <!-- Header -->
    <ComplexCardHeader
      :start-icon="arrowRightBold"
      start-icon-bg-color="bg-info-8"
      start-icon-text-color="text-info-100"
      :title="selectedChangelog.title || `انتشار نسخه ${selectedChangelog.version}`"
      :subtitle="selectedChangelog.date"
      :clickable="true"
      style="margin: 20px !important"
      @click="$emit('back')"
    >
      <div class="detail-header-left">
        <!-- Badge -->
        <span
          class="detail-header-badge"
          :class="`type-${selectedChangelog.type}`"
        >
          نسخه {{ selectedChangelog.version }}
        </span>

        <!-- Mobile Quick Actions -->
        <div class="header-mobile-actions">
          <button
            type="button"
            class="mobile-action-btn refresh-btn"
            @click.stop="$emit('refresh')"
            title="به‌روزرسانی"
          >
            <Icon icon="solar:restart-bold" />
          </button>
          <button
            type="button"
            class="mobile-action-btn close-btn"
            @click.stop="$emit('close')"
            title="بستن"
          >
            <Icon icon="solar:close-circle-bold-duotone" />
          </button>
        </div>
      </div>
    </ComplexCardHeader>

    <div class="hrn-divider"></div>

    <div class="detail-container hide-scrollbar">
      <!-- Media Header (Thumbnail & Caption) -->
      <div v-if="selectedChangelog.thumbnail" class="detail-media">
        <div class="detail-thumbnail">
          <img
            :src="selectedChangelog.thumbnail"
            :alt="selectedChangelog.title"
          />
        </div>
        <p v-if="selectedChangelog.caption" class="detail-caption">
          {{ selectedChangelog.caption }}
        </p>
      </div>

      <!-- Loading Skeleton for Detail Contents -->
      <template v-if="detailLoading">
        <div class="detail-intro">
          <div class="skeleton" style="width: 100%; height: 16px;"></div>
          <div class="skeleton" style="width: 100%; height: 16px; margin-top: 6px;"></div>
          <div class="skeleton" style="width: 75%; height: 16px; margin-top: 6px;"></div>
        </div>

        <div v-for="n in 2" :key="n" class="detail-section">
          <div class="detail-section-content">
            <div class="detail-section-header" style="gap: 8px;">
              <div class="detail-section-timeline">
                <div class="skeleton" style="width: 24px; height: 24px; border-radius: 50%;"></div>
              </div>
              <div class="skeleton" style="width: 120px; height: 24px;"></div>
            </div>
            <div class="detail-section-list">
              <div v-for="m in 2" :key="m" class="detail-item-wrapper" style="padding-right: 12px;">
                <div class="detail-item-content-box">
                  <div class="detail-item-node" style="gap: 4px;">
                    <div class="skeleton" style="width: 24px; height: 16px; border-radius: 99px;"></div>
                    <div class="skeleton" style="width: 80px; height: 16px; border-radius: 99px;"></div>
                  </div>
                  <div class="detail-item-content" style="margin-top: 8px;">
                    <div class="skeleton" style="width: 80%; height: 18px;"></div>
                    <div class="skeleton" style="width: 100%; height: 14px; margin-top: 6px;"></div>
                    <div class="skeleton" style="width: 100%; height: 14px; margin-top: 4px;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Actual Detail Contents -->
      <template v-else>
        <!-- Introduction -->
        <div v-if="selectedChangelog.intro" class="detail-intro">
          <p>{{ selectedChangelog.intro }}</p>
        </div>

        <!-- Sections Content (Features, Improvements, Bugfixes, Notes) -->
        <div
          v-for="section in sections"
          :key="section.key"
          v-show="
            (selectedChangelog as any)[section.key] &&
            (selectedChangelog as any)[section.key].length > 0
          "
          class="detail-section"
          :class="`type-${section.type}`"
        >
          <div class="detail-section-content">
            <!-- Section Header -->
            <div class="detail-section-header">
              <!-- Icon & Timeline -->
              <div class="detail-section-timeline">
                <div class="detail-section-icon-badge">
                  <Icon :icon="section.icon" />
                </div>
                <div class="detail-section-bar"></div>
              </div>

              <!-- Title -->
              <h4 class="detail-section-title">{{ section.title }}</h4>
            </div>

            <!-- Items List -->
            <div class="detail-section-list">
              <div
                v-for="(item, idx) in (selectedChangelog as any)[section.key]"
                :key="idx"
                class="detail-item-wrapper"
              >
                <div class="cluster-link-svg-wrapper">
                  <ClusterLinkSvg />
                </div>

                <div class="detail-item-content-box">
                  <div class="detail-item-node">
                    <div class="detail-item-number">{{ Number(idx) + 1 }}</div>
                    <div v-if="item.module" class="detail-item-module-badge">
                      <img
                        v-if="item.moduleIcon && (item.moduleIcon.startsWith('http') || item.moduleIcon.includes('/'))"
                        :src="item.moduleIcon"
                        class="detail-item-module-icon-img"
                        style="width: 14px; height: 14px; object-fit: contain; margin-left: 4px;"
                      />
                      <Icon
                        v-else-if="item.moduleIcon"
                        :icon="item.moduleIcon"
                        class="detail-item-module-icon"
                      />
                      <span class="detail-item-module-text">{{ item.module }}</span>
                    </div>
                  </div>

                  <div class="detail-item-content">
                    <h5 class="detail-item-title">{{ item.title }}</h5>
                    <p class="detail-item-desc">{{ item.description }}</p>
                    <a
                      v-if="item.linkText && item.linkUrl"
                      :href="getNavigationUrl(item.linkUrl)"
                      class="detail-item-button"
                      style="text-decoration: none;"
                      @click.prevent="handleLinkClick(item.linkUrl)"
                    >
                      <span>{{ item.linkText }}</span>
                    </a>
                    <div
                      v-else-if="item.linkText"
                      class="detail-item-button"
                      style="cursor: default;"
                    >
                      <span>{{ item.linkText }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div v-if="selectedChangelog.summary" class="detail-summary">
          <p>{{ selectedChangelog.summary }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ComplexCardHeader from './ComplexCardHeader.vue'
import ClusterLinkSvg from './ClusterLinkSvg.vue'
import type { ChangelogItem } from '../types'
import { useChangelog } from '../composables/useChangelog'

const emit = defineEmits(['back', 'navigate', 'close', 'refresh'])
defineProps<{
  selectedChangelog: ChangelogItem
  detailLoading?: boolean
}>()

const { activeConfig } = useChangelog()

const arrowRightBold = 'solar:arrow-right-bold'
const starBold = 'solar:star-bold'
const graphUpBold = 'solar:chart-2-bold'
const bugMinimalisticBold = 'solar:bug-minimalistic-bold'
const notesMinimalisticBold = 'solar:notes-minimalistic-bold'

const sections = [
  {
    key: 'features',
    title: 'قابلیت‌های جدید',
    icon: starBold,
    type: 'success',
  },
  {
    key: 'improvements',
    title: 'بهبودها',
    icon: graphUpBold,
    type: 'info',
  },
  {
    key: 'bugfixes',
    title: 'رفع خطا و باگ‌ها',
    icon: bugMinimalisticBold,
    type: 'error',
  },
  {
    key: 'notes',
    title: 'یادداشت‌ها',
    icon: notesMinimalisticBold,
    type: 'warning',
  },
]

const getNavigationUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    const pathname = window.location.pathname
    const segments = pathname.split('/').filter(Boolean)

    const atIdx = segments.findIndex((s) => s.startsWith('@'))
    if (atIdx !== -1) {
      const prefixSegments = segments.slice(0, atIdx + 1)
      return `${origin}/${prefixSegments.join('/')}/${cleanPath}`
    }

    return `${origin}/${cleanPath}`
  }
  return `/${cleanPath}`
}

const handleLinkClick = (path: string) => {
  if (!path) return
  if (path.startsWith('http://') || path.startsWith('https://')) {
    window.open(path, '_blank')
    return
  }

  // If host app provided custom onNavigate handler
  if (activeConfig.value.onNavigate) {
    activeConfig.value.onNavigate(path)
  }

  emit('navigate', path)
}
</script>

<style scoped>
.hrn-divider {
  min-height: 1px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--primary-12, rgba(0, 0, 0, 0.12));
  margin: 0;
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
