<template>
  <a
    v-if="!items || items.length === 0"
    :href="urlPath"
    class="item-level-2 item-levels"
    :class="[isActive ? 'active' : '', locked ? 'locked' : '']"
  >
    <div
      class="pnd-d-flex pnd-flex-1 pnd-align-items-center"
      style="white-space: nowrap; min-width: 0"
    >
      <div class="dot"></div>
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
      class="item-level-2 item-levels"
      :class="[isActive ? 'active' : '', locked ? 'locked' : '']"
      @click="$emit('toggleMenu', id)"
    >
      <div class="dot"></div>
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
        class="fas fa-chevron-down toggle-icon-level-2 transition"
        :class="{ 'rotate-180': isOpen }"
      ></i>
    </div>
    <div class="submenu-wrapper" :class="{ 'expand': isOpen }">
      <div class="submenu-level-2 submenu-inner">
        <LevelThree
          v-for="(item, index) in items"
          :key="item.id"
          :url="item.url"
          :text="item.label"
          :locked="false"
          :isActive="activeItems.length > 0 && activeItems[0] === item.id"
        >
        </LevelThree>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import IconSvg from "../IconSvg.vue";
import LevelThree from "./LevelThree.vue";
import { useAppStore } from "../../app/store";
import { normalizeRoute } from "../../helpers/helperString";

let urlPath = ref("");
const { getConfig } = useAppStore();
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
});

onMounted(() => {
  if (!props.items || props.items.length === 0) {
    let route = props.url || "";
    urlPath.value = props.locked
      ? "javascript:void(0)"
      : getConfig.baseUrl + "/" + normalizeRoute(route)
  }
});
</script>
