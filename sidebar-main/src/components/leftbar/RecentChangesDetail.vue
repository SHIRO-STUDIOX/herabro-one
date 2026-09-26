<template>
  <div class="detail-wrapper">
    <ComplexCardHeader
      :startIcon="arrowRightBold"
      startIconBgColor="bg-info-8"
      startIconTextColor="text-info-100"
      :title="selectedChangelog.title"
      subtitle="نمایش جزئیات آخرین تغییرات"
      clickable
      @click="emit('back')"
      style="margin: 20px !important"
    >
      <div class="detail-header-left">
        <span
          class="detail-header-badge"
          :class="`type-${selectedChangelog.type}`"
          >{{ selectedChangelog.date }}</span
        >
        <span
          class="detail-header-badge"
          :class="`type-${selectedChangelog.type}`"
          >نسخه {{ selectedChangelog.version }}</span
        >
      </div>
    </ComplexCardHeader>
    <div class="divider"></div>

    <!-- ! Detail Content Container -->
    <div class="detail-container pnd-scrollable hide-scrollbar">
      <!-- ! Thumbnail & Caption (Instantly rendered from list state, no skeletons) -->
      <div class="detail-media">
        <div class="detail-thumbnail">
          <img :src="selectedChangelog.thumbnail" alt="thumbnail" />
        </div>
        <span class="detail-caption">{{ selectedChangelog.caption }}</span>
      </div>

      <!-- ! Loading Skeleton for Detail Contents -->
      <template v-if="detailLoading">
        <!-- Intro skeleton -->
        <div class="detail-intro">
          <div class="skeleton" style="width: 100%; height: 16px;"></div>
          <div class="skeleton" style="width: 100%; height: 16px; margin-top: 6px;"></div>
          <div class="skeleton" style="width: 75%; height: 16px; margin-top: 6px;"></div>
        </div>
        
        <!-- Section skeleton (x2) -->
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
                    <div class="skeleton" style="width: 50%; height: 14px; margin-top: 4px;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- ! Actual Detail Contents -->
      <template v-else>
        <!-- ! Introduction -->
        <div v-if="selectedChangelog.intro" class="detail-intro">
          <p>{{ selectedChangelog.intro }}</p>
        </div>

        <!-- ! Sections Content (Features, Improvements, Bugfixes, Notes) -->
        <div
          v-for="section in sections"
          :key="section.key"
          v-show="
            selectedChangelog[section.key] &&
            selectedChangelog[section.key].length > 0
          "
          class="detail-section"
          :class="`type-${section.type}`"
        >
          <div class="detail-section-content">
            <!-- ! Section Header -->
            <div class="detail-section-header">
              <!-- ! Icon & Start of Timeline -->
              <div class="detail-section-timeline">
                <div class="detail-section-icon-badge">
                  <PSvg :svg="section.icon" />
                </div>
                <div class="detail-section-bar"></div>
              </div>

              <!-- ! Title -->
              <h4 class="detail-section-title">{{ section.title }}</h4>
            </div>

            <!-- ! Items List -->
            <div class="detail-section-list">
              <div
                v-for="(item, idx) in selectedChangelog[section.key]"
                :key="idx"
                class="detail-item-wrapper"
              >
                <div class="cluster-link-svg-wrapper">
                  <IconSvg name="cluster-link.svg" />
                </div>

                <div class="detail-item-content-box">
                  <div class="detail-item-node">
                    <div class="detail-item-number">{{ idx + 1 }}</div>
                    <div v-if="item.module" class="detail-item-module-badge">
                      <img
                        v-if="item.moduleIcon && (item.moduleIcon.startsWith('http') || item.moduleIcon.includes('/'))"
                        :src="item.moduleIcon"
                        class="detail-item-module-icon-img"
                        style="width: 14px; height: 14px; object-fit: contain; margin-left: 4px;"
                      />
                      <IconSvg
                        v-else-if="item.moduleIcon"
                        :name="item.moduleIcon"
                        class="detail-item-module-icon"
                      />
                      <span class="detail-item-module-text">{{
                        item.module
                      }}</span>
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

        <!-- ! Summary -->
        <div v-if="selectedChangelog.summary" class="detail-summary">
          <p>{{ selectedChangelog.summary }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import IconSvg from "../IconSvg.vue";
import ComplexCardHeader from "../ComplexCardHeader.vue";
import arrowRightBold from "pandora-icons/arrowRightBold";
import { useWindowSize } from "@vueuse/core";
import { PSvg } from "pandora-design-system";

import starBold from "pandora-icons/starBold";
import graphUpBold from "pandora-icons/graphUpBold";
import bugMinimalisticBold from "pandora-icons/bugMinimalisticBold";
import notesMinimalisticBold from "pandora-icons/notesMinimalisticBold";

const { width } = useWindowSize();
const emit = defineEmits(["back"]);
const props = defineProps({
  selectedChangelog: {
    type: Object,
    required: true,
  },
  detailLoading: {
    type: Boolean,
    default: false,
  },
});

const sections = [
  {
    key: "features",
    title: "قابلیت‌های جدید",
    icon: starBold,
    type: "success",
  },
  {
    key: "improvements",
    title: "بهبودها",
    icon: graphUpBold,
    type: "info",
  },
  {
    key: "bugfixes",
    title: "رفع خطا و باگ‌ها",
    icon: bugMinimalisticBold,
    type: "error",
  },
  {
    key: "notes",
    title: "یادداشت‌ها",
    icon: notesMinimalisticBold,
    type: "warning",
  },
];

const getNavigationUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  const atIdx = segments.findIndex(s => s.startsWith('@'));
  if (atIdx !== -1) {
    const prefixSegments = segments.slice(0, atIdx + 1);
    return `${origin}/${prefixSegments.join('/')}/${cleanPath}`;
  }
  
  return `${origin}/${cleanPath}`;
};
</script>

<style scoped>
@import "../../assets/css/recent-changes-detail.css";
@import "../../assets/css/recent-changes-skeleton.css";
</style>
