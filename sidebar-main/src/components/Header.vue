<template>
  <header class="pnd-header pnd-row pnd-m-0">
    <SidebarHeader :isCollapse="isCollapse" />
    <div class="nav-bar" :class="isCollapse ? 'collapsed' : ''">
      <div class="menu circle-button" @click="$emit('toggleSidebar')">
        <span class="text-primary-60 svg">
          <IconSvg name="arrow_right.svg" />
        </span>
      </div>
      <NavbarMenu />
      <div style="width: 100%">
      </div>
      <div class="pnd-d-flex">
        <button
          type="button"
          class="svg text-primary-60 circle-button pnd-tooltip"
          :data-tooltip="ctrlSymbol + ' + K'"
          id="search-btn"
          @click="triggerCtrlK"
        >
          <IconSvg name="search_bold.svg" />
        </button>
        <NavbarProfile />
      </div>
    </div>
  </header>
</template>

<script setup>
import IconSvg from "./IconSvg.vue";
import NavbarMenu from "./NavbarMenu.vue";
import SidebarHeader from "./SidebarHeader.vue";
import NavbarProfile from "./NavbarProfile.vue";
import { getCtrlSymbol } from "../helpers/helperPlatform";
import { useAppStore } from "../app/store";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    required: true,
  },
});
const { toggleSearchbar } = useAppStore();
const ctrlSymbol = getCtrlSymbol();
function triggerCtrlK() {
  // toggleSearchbar();
  const event = new KeyboardEvent("keydown", {
    key: "k",
    code: "KeyK",
    ctrlKey: ctrlSymbol.toLowerCase() == "ctrl",
    metaKey: ctrlSymbol == "⌘",
    bubbles: true,
  });
  document.dispatchEvent(event);
}

</script>
