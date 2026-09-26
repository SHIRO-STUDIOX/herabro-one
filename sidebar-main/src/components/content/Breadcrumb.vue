<template>
  <div class="pnd-column pnd-flex-grow-1" style="gap: 4px; min-width: 0;">
    <div
      class="pnd-d-flex pnd-align-items-center"
      style="min-width: 0"
      v-if="getConfig.breadcrumb && getConfig.breadcrumb.length > 0"
    >
      <ul class="pnd-breadcrumb">
        <li class="pnd-breadcrumb-home">
          <a :href="getConfig.indexUrl">
            <IconSvg class="icon svg" name="home.svg" />
          </a>
        </li>

        <li
          class="pnd-breadcrumb-item"
          v-for="(item, index) in getConfig.breadcrumb"
          :key="index"
          :class="{ active: index === getConfig.breadcrumb.length - 1 }"
        >
          <div class="pnd-row pnd-align-items-center">
            <IconSvg name="arrow_left.svg" />
            <a
              v-if="typeof item === 'object'"
              :href="
                item?.fullUrl ??
                getConfig.baseUrl + '/' + normalizeRoute(item.url)
              "
            >
              <template v-if="index < getConfig.breadcrumb.length - 1">
                <span class="pnd-mobile-hidden">{{ item.label }}</span>
                <PSvg
                  class="pnd-mobile-only"
                  :svg="menuDotsBoldDuotone"
                  style="color: #4ade80; font-size: 20px"
                />
              </template>
              <template v-else>
                <span class="pnd-breadcrumb-active-text">{{ item.label }}</span>
              </template>
            </a>
            <span v-else class="pnd-text-start">
              <template v-if="index < getConfig.breadcrumb.length - 1">
                <span class="pnd-mobile-hidden">{{ item }}</span>
                <PSvg
                  class="pnd-mobile-only"
                  :svg="menuDotsBoldDuotone"
                  style="color: #4ade80; font-size: 20px"
                />
              </template>
              <template v-else>
                <span class="pnd-breadcrumb-active-text">{{ item }}</span>
              </template>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <span class="breadcrumb-desc pnd-mobile-hidden">{{
      getConfig.breadcrumbDesc
    }}</span>
  </div>
</template>

<script setup>
import IconSvg from "../IconSvg.vue";
import { PSvg } from "pandora-design-system";
import menuDotsBoldDuotone from "pandora-icons/menuDotsBoldDuotone";
import { useAppStore } from "../../app/store";
import { normalizeRoute } from "../../helpers/helperString";
import { useWindowSize } from "@vueuse/core";
import { onMounted, ref } from "vue";
const { getConfig } = useAppStore();
const { width } = useWindowSize();
const breadCrumbs = ref([]);


onMounted(() => {
  breadCrumbs.value = getConfig.breadcrumb;
  if (width.value <= 768) {
    if (breadCrumbs.value.length >= 3) {
      breadCrumbs.value.splice(1, breadCrumbs.value.length - 2);
    }
  }
});
</script>



<style scoped>
@media only screen and (max-width: 768px) {
  .pnd-mobile-hidden {
    display: none !important;
  }
  .pnd-mobile-only {
    display: flex !important;
  }
}
.pnd-mobile-only {
  display: none;
}
</style>
