<template>
  <div
    class="global-blur-wrapper"
    v-if="isMenuOpen || isQuickActionOpen"
    @click.stop="closeMenus()"
  ></div>
  <div
    class="pnd-footer-mobile pnd-d-flex pnd-flex-row pnd-align-items-center pnd-justify-between"
  >
    <div class="pnd-d-flex pnd-flex-row" style="width: 33%; gap: 12px">
      <div class="circle-button pnd-m-0" @click="$emit('toggleSidebar')">
        <span class="text-primary-60 svg">
          <IconSvg :name="isSidebarCollapse ? 'hamburger.svg' : 'close.svg'" />
        </span>
      </div>
    </div>
    <div
      class="pnd-d-flex pnd-flex-row pnd-justify-content-center"
      style="gap: 8px; width: 34%"
    >
      <NavbarMenu
        class="pnd-m-0"
        v-model:open="isMenuOpen"
        :mobileMode="true"
      ></NavbarMenu>
      
      <QuickAction
        class="pnd-m-0"
        v-model:open="isQuickActionOpen"
        :items="appStore.getConfig.quickActionItems"
      />
      <div
        class="circle-button pnd-m-0 pnd-solid pnd-border-none bg-secondary-100"
        @click="toggleSearchbar"
      >
        <span class="text-white-100 svg">
          <IconSvg :name="isSearchbarOpen ? 'close.svg' : 'search_bold.svg'" />
        </span>
      </div>
    </div>
    <div
      class="pnd-justify-end pnd-d-flex pnd-flex-row"
      style="width: 33%; gap: 12px"
    >
      <div class="circle-button pnd-m-0" @click="$emit('toggleLeftbar')">
        <span class="text-primary-60 svg">
          <IconSvg :name="!isLeftbarOpen ? 'leftbar.svg' : 'close.svg'" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import IconSvg from "./IconSvg.vue";
import NavbarMenu from "./NavbarMenu.vue";
import QuickAction from "./QuickAction.vue";
import { useAppStore } from "../app/store.js";

const appStore = useAppStore();
const isMenuOpen = ref(false);
const isQuickActionOpen = ref(false);
const isSearchbarOpen = ref(false);

const closeMenus = () => {
  isMenuOpen.value = false;
  isQuickActionOpen.value = false;
  isSearchbarOpen.value = false;
};

watch(isMenuOpen, (val) => {
  if (val) {
    toggleSearchbar(false);
    isQuickActionOpen.value = false;
  }
  
});

watch(isSearchbarOpen, (val) => {
  if (val) {
    isMenuOpen.value = false;
    isQuickActionOpen.value = false;
  }
});

watch(isQuickActionOpen, (val) => {
  if (val) {
    toggleSearchbar(false);
    isMenuOpen.value = false;
  }
});

watch(
  () => appStore.isSearchbarVisible,
  (state) => 
  {
    toggleSearchbar(state);
  }
);

const toggleSearchbar = (open = null) => {
  if (open == true){
    appStore.openSearchbar();
  } else if (open == false) {
    appStore.closeSearchbar();
  } else {
    appStore.toggleSearchbar();
  }
  isSearchbarOpen.value = appStore.isSearchbarVisible;
};

const props = defineProps({
  isSidebarCollapse: {
    type: Boolean,
    required: true,
  },
  isLeftbarOpen: {
    type: Boolean,
    required: true,
  },
});
</script>
