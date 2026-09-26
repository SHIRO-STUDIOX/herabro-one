<template>
  <div class="sidebar-scroll-content" dir="ltr">
    <div dir="rtl" style="padding-bottom: 32px">
      <LevelOne
        v-for="(item, index) in items"
        :key="item.id"
        :id="item.id"
        :url="item.url"
        :text="item.label"
        :icon="item?.icon"
        :items="item.items"
        :locked="false"
        :isOpen="selectedItem == item.id"
        :isActive="
          selectedItem == item.id ||
          (selectedItem < 0 &&
            activeItems &&
            activeItems.length > 0 &&
            activeItems[0] === item.id)
        "
        :activeItems="
          activeItems && activeItems.length > 1 && activeItems[0] === item.id
            ? activeItems.slice(1)
            : []
        "
        :isCollapse="isCollapse"
        @toggleMenu="toggleMenu"
        @requestTempExpand="emit('requestTempExpand')"
      >
      </LevelOne>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LevelOne from "./LevelOne.vue";

const emit = defineEmits(["requestTempExpand"]);

// VUE-TODO: REMOVE AFTER CONVERT HEADER TO VUE ↓
import { useMutationObserver } from "@vueuse/core";
const sidebarElement = ref(null);
// VUE-TODO: REMOVE AFTER CONVERT HEADER TO VUE ↑

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  activeItems: {
    type: Array,
    required: true,
  },
  isCollapse: {
    type: Boolean,
    required: true,
  },
});

let selectedItem = ref(-1);

onMounted(() => {
  if (props.activeItems && props.activeItems.length > 0) {
    selectedItem.value = props.activeItems[0];
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

});

const toggleMenu = (itemId) => {
  if (props.locked) return;
  selectedItem.value = selectedItem.value == itemId ? -1 : itemId;
};
</script>
