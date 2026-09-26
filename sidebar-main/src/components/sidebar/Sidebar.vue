<template>
  <div
    class="global-wrapper"
    style="right: 248px !important; margin-top: 68px"
    v-if="!isCollapse && width < 768"
    @click.stop="emit('closeSidebar')"
  ></div>
  <div ref="sidebar" class="sidebar" :class="isCollapse ? 'collapsed' : ''">
    <SidebarTree
      v-if="items != null"
      :items="items"
      :activeItems="activeItemIds"
      :isCollapse="isCollapse"
      @requestTempExpand="emit('requestTempExpand')"
    />
    <div
      v-else
      style="
        text-align: right;
        margin: 10px 10px 0 0;
        color: var(--primary-100);
      "
    >
      <span>در حال بارگزاری ...</span>
    </div>
    <div
      class="footer pnd-d-column"
      style="
        background: linear-gradient(
          180deg,
          var(--surface-0) 0%,
          var(--surface-100) 40%
        );
        gap: 2px;
      "
    >
      <div
        v-if="appStore.getConfig.poweredByAppName"
        class="pnd-d-flex pnd-justify-content-center pnd-align-items-center"
        style="height: 64px; gap: 4px; white-space: nowrap; overflow: hidden;"
        dir="rtl"
      >
        <span
          style="color: var(--primary-60); font-size: 12px; font-weight: 500"
          >توسعه توسط</span
        >
        <span
          style="color: var(--primary-80); font-size: 12px; font-weight: 700"
          >{{ appStore.getConfig.poweredByAppName }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "../../app/store";
import ComplexCardHeader from "../ComplexCardHeader.vue";
import { useActiveYiiAdapter } from "../../composables/useActiveYiiAdapter";
import { useModuleHelpers } from "../../composables/useModuleHelpers";
import SidebarTree from "./SidebarTree.vue";
import { handleTooltip } from "../../helpers/handleTooltip";
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from "vue";
import { normalizeRoute } from "../../helpers/helperString";
import { getPlatform } from "../../helpers/helperPlatform";
const { getActiveItems } = useActiveYiiAdapter();
const appStore = useAppStore();
const emit = defineEmits(["requestTempExpand", "sidebarMouseLeave", "closeSidebar"]);
import { useWindowSize } from "@vueuse/core";
import { PDropdown } from "pandora-design-system";
const { width } = useWindowSize();

const items = ref(null);
const activeItemIds = ref([]);
const sidebar = ref(null);
let sidebarLeaveTimeout = null;

const props = defineProps({
  isCollapse: {
    type: Boolean,
    required: true,
  },
});

const handleCtrlShiftR = (e) => {
  let ctrlKey = e.ctrlKey;
  if (getPlatform() === "mac") {
    ctrlKey = e.metaKey;
  }

  if (ctrlKey && e.shiftKey && e.code === "KeyR") {
    localStorage.setItem("last-fetch-sidebar", 0);
  }
};

onMounted(async () => {
  sidebar.value.addEventListener("mouseenter", handleMouseEnter);
  sidebar.value.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("keydown", handleCtrlShiftR);

  const localStorageModulesKey =
    appStore.getConfig.localStorageKey ?? "module-items";
  const localStorageLastFetchKey = "last-fetch-sidebar"; // time of last fetch sidebar items

  const now = Date.now();
  const savedTimestamp = localStorage.getItem(localStorageLastFetchKey);
  const CACHE_DURATION = 2 * 60 * 1000;
  const isCacheExpired =
    !savedTimestamp || now - parseInt(savedTimestamp, 10) > CACHE_DURATION;

  let allItems = [];
  if (localStorage.getItem(localStorageModulesKey)) {
    try {
      allItems = JSON.parse(localStorage.getItem(localStorageModulesKey));

      if (allItems.length > 0) {
        handleItemsAndActiveItems(allItems);
      }
    } catch (error) {
      console.error("Error parsing sidebar items from localStorage:", error);
      localStorage.removeItem(localStorageModulesKey);
    }
  }

  if (!localStorage.getItem(localStorageModulesKey) || isCacheExpired) {
    try {
      const response = await fetch(appStore.getConfig.sidebarTreeApiUrl);
      if (!response.ok) {
        console.error("خطا در پاسخ سرور:", response.status);
        return;
      } else {
        allItems = await response.json();
      }
      localStorage.setItem(localStorageModulesKey, JSON.stringify(allItems));
      appStore.setConfig("moduleItems", allItems);
      localStorage.setItem(localStorageLastFetchKey, now.toString());
      localStorage.removeItem("fetch_sidebar_items");

      if (allItems.length > 0) {
        handleItemsAndActiveItems(allItems);
      }
    } catch (error) {
      console.error("Error fetching sidebar items:", error);
    }
  }

  if (!activeItemIds.value) {
    activeItemIds.value = [];
  }
  await nextTick();
  handleTooltip();
});

onBeforeUnmount(() => {
  if (sidebar.value) {
    sidebar.value.removeEventListener("mouseenter", handleMouseEnter);
    sidebar.value.removeEventListener("mouseleave", handleMouseLeave);
    document.removeEventListener("keydown", handleCtrlShiftR);
  }
});

const handleMouseEnter = () => {
  clearTimeout(sidebarLeaveTimeout);
};

const handleMouseLeave = () => {
  sidebarLeaveTimeout = setTimeout(() => {
    emit("sidebarMouseLeave");
  }, 600);
};

const handleItemsAndActiveItems = (allItems) => {
  let activeItems = getActiveItems(allItems, appStore.getConfig.currentRoute); // handle with route and regex
  activeItemIds.value = activeItems?.map((item) => item.id);

  let activeModuleId = null; 

  if (activeItemIds.value && activeItemIds.value.length > 0) {
    const activeItem = allItems.find(
      // get level one active item to find module name for next step:
      (item) => item.id === activeItemIds.value[0],
    );
    activeModuleId = activeItem?.module;
  } else {
    const activeModule = appStore.getConfig.modules.find((item) => item.active); // get active module from config if not found in routes and regex
    activeModuleId = activeModule?.key ?? appStore.getConfig.modules[0]["key"];
  }
  if (activeModuleId) {
    appStore.setActiveModuleKey(activeModuleId);
    items.value = allItems.filter((item) => item.module === activeModuleId);

    let activeItemData = activeItems?.at(-1);
    appStore.setActiveSidebarItemId({
      id: activeItemData?.id,
      key: activeItemData?.key,
      label: activeItemData?.label,
    }); // for education api call base on active sidebar item id
  } else {
    items.value = [];
    console.warn("No active module detected!");
  }
};
</script>
