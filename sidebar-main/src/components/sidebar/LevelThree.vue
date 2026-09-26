<template>
  <a
    v-if="!items || items.length === 0"
    :href="urlPath"
    class="item-level-3 item-levels"
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import IconSvg from "../IconSvg.vue";
import { useAppStore } from "../../app/store";
import { normalizeRoute } from "../../helpers/helperString";
let urlPath = ref("");
const { getConfig } = useAppStore();
const props = defineProps({
  text: String,
  icon: String,
  url: String,
  locked: Boolean,
  isActive: Boolean,
});

onMounted(() => {
  let route = props.url || "";
    urlPath.value = props.locked
      ? "javascript:void(0)"
      : getConfig.baseUrl + "/" + normalizeRoute(route)
});
</script>
