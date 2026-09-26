<template>
  <a
    v-if="!items || items.length === 0"
    :href="urlPath"
    class="item-level-1 item-levels pnd-tooltip"
    :class="[isActive ? 'active' : '', locked ? 'locked' : '']"
    :data-tooltip="isActuallyCollapsed ? text : ''"
  >
    <div
      class="pnd-d-flex pnd-flex-1"
      style="white-space: nowrap; min-width: 0"
    >
      <span class="sidebar-icon">
        <span v-if="(!icon || icon == '') && activeModuleIcon">
          <span
            v-if="
              activeModuleIcon && (activeModuleIcon.toString().startsWith('<') || activeModuleIcon.includes(':'))
            "
            v-html="activeModuleIcon"
          ></span>
          <IconSvg v-else :name="activeModuleIcon" />
        </span>
        <span v-else-if="icon && icon.trim().startsWith('<')" class="svg" v-html="icon"></span>
        <span v-else-if="icon && (icon.trim().toLowerCase().endsWith('.svg') || (icon.includes(':') && !icon.trim().startsWith('<')))">
          <IconSvg :name="icon" />
        </span>
        <i v-else :class="icon"></i>
      </span>
      <div class="sidebar-text">
        <span class="scroll-text">{{ text }}</span>
      </div>
    </div>
    <div
      v-if="locked"
      class="svg lock-icon pnd-d-flex"
      style="flex: 0 0 auto; width: max-content"
    >
      <IconSvg name="lock.svg" />
    </div>
  </a>
  <section v-else>
    <div
      class="item-level-1 item-levels pnd-tooltip"
      :class="[isActive ? 'active' : '', locked ? 'locked' : '']"
      :data-tooltip="isActuallyCollapsed ? text : ''"
      @click="handleClick(id)"
    >
      <span class="sidebar-icon">
        <!--has icon content-->
        <span
          v-if="icon && icon.trim().startsWith('<')"
          class="svg"
          v-html="icon"
        >
        </span>

        <!--has icon filename-->
        <span v-else-if="icon && (icon.trim().toLowerCase().endsWith('.svg') || (icon.includes(':') && !icon.trim().startsWith('<')))">
          <IconSvg :name="icon" />
        </span>

        <!--has activemodule icon content-->
        <span
          v-else-if="
            (!icon || icon == '') &&
            activeModuleIcon &&
            activeModuleIcon.trim().startsWith('<')
          "
          v-html="activeModuleIcon"
        >
        </span>

        <!--has activemodule icon filename-->
        <span
          v-else-if="
            (!icon || icon == '') &&
            activeModuleIcon &&
            activeModuleIcon.trim().toLowerCase().endsWith('.svg')
          "
        >
          <IconSvg :name="activeModuleIcon" />
        </span>
        <i v-else :class="icon"></i>
      </span>
      <div class="sidebar-text">
        <span class="scroll-text">{{ text }}</span>
      </div>
      <div
        v-if="locked"
        class="svg lock-icon pnd-d-flex"
        style="flex: 0 0 auto; width: max-content"
      >
        <IconSvg name="lock.svg" />
      </div>
      <i
        v-else
        class="fas fa-chevron-down toggle-icon-level-1 transition"
        :class="isOpen ? 'rotate-180' : ''"
      ></i>
    </div>
    <div class="submenu-wrapper" :class="{ 'expand': isOpen }">
      <div class="submenu-level-1 submenu-inner">
        <LevelTwo
          v-for="(item, index) in items"
          :key="item.id"
          :id="item.id"
          :url="item.url"
          :text="item.label"
          :items="item.items"
          :locked="false"
          :isOpen="selectedItem == item.id"
          :isActive="
            selectedItem == item.id ||
            (selectedItem < 0 &&
              activeItems.length > 0 &&
              activeItems[0] === item.id)
          "
          :activeItems="
            activeItems && activeItems.length > 1 && activeItems[0] === item.id
              ? activeItems.slice(1)
              : []
          "
          @toggleMenu="toggleMenu"
        >
        </LevelTwo>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import IconSvg from "../IconSvg.vue";
import LevelTwo from "./LevelTwo.vue";
import { useAppStore } from "../../app/store";
import { useModuleHelpers } from "../../composables/useModuleHelpers";

// VUE-TODO: REMOVE AFTER CONVERT HEADER TO VUE ↓
import { useMutationObserver } from "@vueuse/core";
import { normalizeRoute } from "../../helpers/helperString";
const sidebarElement = ref(null);
// VUE-TODO: REMOVE AFTER CONVERT HEADER TO VUE ↑

const urlPath = ref("");
const { getConfig } = useAppStore();
const { activeModule } = useModuleHelpers();
const activeModuleIcon = ref(activeModule?.value?.icon ?? null)
const emit = defineEmits(["toggleMenu", "requestTempExpand"]);
const props = defineProps({
  id: Number,
  text: String,
  icon: String,
  url: String,
  items: Array,
  activeItems: Array,
  locked: Boolean,
  isOpen: Boolean,
  isActive: Boolean,
  isCollapse: Boolean,
});
let selectedItem = ref(-1);
const isActuallyCollapsed = ref(props.isCollapse);

watch(() => props.isCollapse, (val) => {
  isActuallyCollapsed.value = val;
});

onMounted(() => {
  if (props.activeItems.length > 0) {
    selectedItem.value = props.activeItems[0];
  }
  if (!props.items || props.items.length === 0) {
    let route = props.url || "";
    urlPath.value = props.locked
      ? "javascript:void(0)"
      : getConfig.baseUrl + "/" + normalizeRoute(route);
  }

  // VUE-TODO: REMOVE AFTER CONVERT HEADER TO VUE ↓
  sidebarElement.value = document.querySelector(".sidebar");
  if (sidebarElement.value) {
    if (sidebarElement.value.classList.contains("collapsed")) {
      selectedItem.value = -1;
    }
    useMutationObserver(
      sidebarElement.value,
      (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const isCollapsed =
              sidebarElement.value.classList.contains("collapsed");
            isActuallyCollapsed.value = isCollapsed;
            if (isCollapsed) {
              selectedItem.value = -1;
            }
          }
        });
      },
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );
  }
  // VUE-TODO: REMOVE AFTER CONVERT HEADER TO VUE ↑
});

const toggleMenu = (itemId) => {
  if (props.locked) return;
  selectedItem.value = selectedItem.value == itemId ? -1 : itemId;
};

const handleClick = (itemId) => {
  if (props.locked) return;
  const isCollapsed = sidebarElement.value?.classList.contains("collapsed");
  if (isCollapsed) {
    emit("requestTempExpand");
  }
  emit("toggleMenu", itemId);
};
</script>
