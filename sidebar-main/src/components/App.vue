<template>
  <div v-if="isReady">
    <!-- // VUE-TODO: MUST ADD ↓ -->
    <!-- <Header @toggleSidebar="toggleSidebar" :isCollapse="isCollapse" /> -->
    <!-- // VUE-TODO: MUST ADD ↑ -->
    <teleport to="#vue-breadcrumb">
      <ContentHeader />
    </teleport>
    <teleport
      v-if="appStore.getConfig.modules && appStore.getConfig.modules.length > 0"
      to="#navbar-menu-target"
    >
      <NavbarMenu v-model:open="isMenuOpen" />
    </teleport>
    <teleport to="#business-info-target">
      <NavbarSwitcher v-if="appStore.getConfig.switcher" />
    </teleport>
    <teleport to="#profile-menu-target">
      <NavbarProfile />
    </teleport>
    <Sidebar
      :isCollapse="isCollapse"
      @requestTempExpand="handleTempExpand"
      @sidebarMouseLeave="sidebarMouseLeave"
      @closeSidebar="closeSidebar"
    />
    <Searchbar
      v-model:open="isSearchbarOpen"
      v-model:size="searchbarSize"
      :baseUrl="appStore.getConfig.baseUrl"
      :modules="appStore.getConfig.modules"
      :moduleItems="moduleItems"
      :menuActionsUrl="appStore.getConfig.sidebarMenuActionsApiUrl"
      :externalSearch="searchbarSearch"
      :specialMinChars="searchbarMinCharacters"
    />

    <!-- VUE-TODO: Add after hesabro tests -->
    <LeftBar ref="leftBarRef" v-model:open="isLeftbarOpen"></LeftBar>

    <Footer
      v-if="width < 768"
      :isSidebarCollapse="isCollapse"
      :isLeftbarOpen="isLeftbarOpen"
      @toggleSidebar="toggleSidebar"
      @toggleLeftbar="toggleLeftbar"
    ></Footer>
  </div>
</template>

<script setup>
import { useAppStore } from "../app/store.js";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import ContentHeader from "./content/ContentHeader.vue";
import Sidebar from "./sidebar/Sidebar.vue";
import Searchbar from "./Searchbar.vue";
import LeftBar from "./leftbar/LeftBar.vue";
import Footer from "./Footer.vue";
import NavbarMenu from "./NavbarMenu.vue";
import { normalizeRoute } from "../helpers/helperString.js";
import { useWindowSize } from "@vueuse/core";
import NavbarProfile from "./NavbarProfile.vue";
import NavbarSwitcher from "./NavbarSwitcher.vue";

const { width } = useWindowSize();
const props = defineProps({
  sidebarConfig: {
    type: Object,
    required: true,
  },
});

const moduleItems = ref([]);
const isSearchbarOpen = ref(false);
const searchbarSearch = ref("");
const searchbarSize = ref();
const searchbarMinCharacters = ref(2);
const isQuickActionOpen = ref(false);
const isReady = ref(false);
const isCollapse = ref(false);
const isTempExpanded = ref(false);
const isMenuOpen = ref(false);
const isLeftbarOpen = ref(false);
const leftBarRef = ref(null);
const appStore = useAppStore();

let pageWrapperContainer = null;
let businessCard = null;

// VUE-TODO: MUST REMOVE ↓
let sidebarHeader = null;
let navbar = null;
let sidebar = ref();
// VUE-TODO: MUST REMOVE ↑
let footer = null;

onMounted(async () => {
  // set all config from yii2

  if (width.value > 768) {
    isLeftbarOpen.value = true;
  }

  let config = props.sidebarConfig;
  if (config.baseUrl) {
    config.baseUrl = normalizeRoute(config.baseUrl);
  }
  appStore.setAllConfig(config);

  // read module items from local storage for search
  try {
    const localStorageModulesKey =
      appStore.getConfig.localStorageKey ?? "module-items";
    moduleItems.value = JSON.parse(
      localStorage.getItem(localStorageModulesKey) || "[]",
    );
  } catch (e) {
    moduleItems.value = [];
  }

  // handle collapse - expand
  isCollapse.value = localStorage.getItem("is_sidebar_collapse") === "true";
  if (width.value < 768) {
    isCollapse.value = true;
  }
  pageWrapperContainer = document.querySelector(".page-wrapper-container");
  businessCard = document.querySelector(".business-info");

  // VUE-TODO: MUST REMOVE ↓
  sidebarHeader = document.querySelector(".sidebar-header");
  navbar = document.querySelector(".nav-bar");
  setTimeout(() => {
    sidebar.value = document.querySelector(".sidebar");
  }, 150);
  // VUE-TODO: MUST REMOVE ↑

  footer = document.querySelector(".pnd-footer");

  if (isCollapse.value) {
    if (pageWrapperContainer) {
      pageWrapperContainer.classList.add("collapsed");
    }
    if (footer) {
      footer.classList.add("collapsed");
    }
  }
  isReady.value = true;

  watch(
    () => appStore.getConfig?.colors,
    (colors) => {
      if (!colors) return;
      document.documentElement.style.setProperty(
        "--primary-rgb",
        colors.primary,
      );
      document.documentElement.style.setProperty("--white-rgb", colors.white);
      document.documentElement.style.setProperty(
        "--surface-rgb",
        colors.background,
      );
      if (colors.error) {
        document.documentElement.style.setProperty("--error-rgb", colors.error);
      }
      document.documentElement.style.setProperty(
        "--secondary-rgb",
        colors.secondary,
      );
      if (colors.accent) {
        document.documentElement.style.setProperty(
          "--accent-rgb",
          colors.accent,
        );
      }
    },
    { immediate: true },
  );

  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("openSearchbar", (e) => {
    openSearchbarWithSelect2(e.detail ?? {});
  });
  window.addEventListener("setPageActions", (e) => {
    appStore.setPageActions(e.detail?.actions || []);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("openSearchbar", openSearchbarWithSelect2);
});

watch(isSearchbarOpen, (value) => {
  if (value) {
    isQuickActionOpen.value = false;
    appStore.openSearchbar();
  } else {
    appStore.closeSearchbar();
  }
});

watch(isQuickActionOpen, (value) => {
  if (value) {
    isSearchbarOpen.value = false;
    appStore.closeSearchbar();
  }
});

watch(
  () => appStore.isSearchbarVisible,
  (state) => {
    isSearchbarOpen.value = state;
  },
);

watch(
  () => appStore.getConfig?.moduleItems,
  (newVal) => {
    moduleItems.value = newVal;
  },
  { immediate: true },
);

watch(
  () => width.value,
  (newWidth, oldWidth) => {
    if (oldWidth !== undefined) {
      const wasMobile = oldWidth <= 768;
      const isMobileNow = newWidth <= 768;
      if (wasMobile !== isMobileNow) {
        if (isMobileNow) {
          isLeftbarOpen.value = false;
        } else {
          isLeftbarOpen.value = true;
        }
      }
    }
  }
);

watch(isLeftbarOpen, (newVal) => {
  if (!pageWrapperContainer) {
    pageWrapperContainer = document.querySelector(".page-wrapper-container");
  }
  if (pageWrapperContainer) {
    if (newVal && width.value < 768) {
      pageWrapperContainer.classList.add("leftbar");
    } else {
      pageWrapperContainer.classList.remove("leftbar");
    }
  }
  if (newVal) {
    document.documentElement.classList.add("leftbar-open");
    if (width.value < 768 && leftBarRef.value) {
      leftBarRef.value.closeLeftbar();
    }
  } else {
    document.documentElement.classList.remove("leftbar-open");
  }
}, { immediate: true });

watch(isCollapse, (newVal) => {
  if (newVal) {
    document.documentElement.classList.remove("sidebar-open");
  } else {
    document.documentElement.classList.add("sidebar-open");
    if (width.value < 768) {
      isLeftbarOpen.value = false;
      if (leftBarRef.value) {
        leftBarRef.value.closeLeftbar();
      }
    }
  }
}, { immediate: true });

const toggleLeftbar = () => {
  if (!isLeftbarOpen.value && !isCollapse.value) {
    toggleSidebar();
  }
  isLeftbarOpen.value = !isLeftbarOpen.value;
};

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value;
  isTempExpanded.value = false;
  if (width.value > 768) {
    localStorage.setItem("is_sidebar_collapse", isCollapse.value);
  } else {
    localStorage.setItem("is_sidebar_collapse", true);
  }
  if (pageWrapperContainer) {
    pageWrapperContainer.classList.toggle("collapsed");
    if (isLeftbarOpen.value) {
      toggleLeftbar();
    }
  }
  if (footer) {
    footer.classList.toggle("collapsed");
    fixed;
  }
};

const handleTempExpand = () => {
  const isDomCollapsed = sidebar.value?.classList.contains("collapsed");
  if (!isCollapse.value && !isDomCollapsed) return;
  isCollapse.value = false;
  isTempExpanded.value = true;
  if (pageWrapperContainer) {
    pageWrapperContainer.classList.remove("collapsed");
  }
  businessCard = document.querySelector(".business-info");
  if (businessCard) {
    businessCard.classList.remove("collapsed");
  }
  if (footer) {
    footer.classList.remove("collapsed");
  }

  // VUE-TODO: MUST REMOVE ↓
  if (sidebarHeader) sidebarHeader.classList.remove("collapsed");
  if (navbar) navbar.classList.remove("collapsed");
  if (sidebar.value) sidebar.value.classList.remove("collapsed");
  // VUE-TODO: MUST REMOVE ↑
};
const sidebarMouseLeave = (force = false) => {
  if (width.value < 768 && !force) return;
  if (!force && localStorage.getItem("is_sidebar_collapse") === "false" && !isTempExpanded.value) return;
  isCollapse.value = true;
  isTempExpanded.value = false;
  const tooltip = document.querySelector(".tooltip.show");
  if (tooltip && tooltip.matches(":hover")) return;
  if (pageWrapperContainer) {
    pageWrapperContainer.classList.add("collapsed");
  }
  if (businessCard) {
    businessCard.classList.add("collapsed");
  }
  if (footer) {
    footer.classList.add("collapsed");
  }

  // VUE-TODO: MUST REMOVE ↓
  if (sidebarHeader) sidebarHeader.classList.add("collapsed");
  if (navbar) navbar.classList.add("collapsed");
  if (sidebar.value) sidebar.value.classList.add("collapsed");
  // VUE-TODO: MUST REMOVE ↑
};

const closeSidebar = () => {
  sidebarMouseLeave(true);
};

const handleKeydown = async (e) => {
  if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
    e.preventDefault();
    searchbarSearch.value = "";
    isSearchbarOpen.value = !isSearchbarOpen.value;
  }
};

const openSearchbarWithSelect2 = (config) => {
  searchbarSearch.value = config.search;
  searchbarMinCharacters.value = config.minSearchCharacters;
  isSearchbarOpen.value = !isSearchbarOpen.value;
  searchbarSize.value = config?.size;
};
</script>
<style>
@import url("../../node_modules/pandora-design-system/dist/main.css");
</style>
