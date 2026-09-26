<template>
  <a class="sidebar-header" :class="isCollapse ? 'collapsed': ''" :href="getConfig.indexUrl">
    <div class="logo-item">
      <IconSvg class="logo-icon svg" :name="getConfig.logoPath" />
    </div>
    <div class="sidebar-header-text" dir="rtl">
      <span class="sidebar-header-title">{{ getConfig.appName }}</span>
      <span class="sidebar-header-desc">{{ getConfig.appDesc }}</span>
    </div>
  </a>
</template>

<script setup>
import { useAppStore } from "../app/store";
import IconSvg from "./IconSvg.vue";
const { getConfig } = useAppStore();

const props = defineProps({
  isCollapse: {
    type: Boolean,
    required: true,
  },
});

</script>
