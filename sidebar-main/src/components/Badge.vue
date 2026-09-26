<template>
  <div
    class="pnd-badge-wrapper"
    :class="ltr? 'pnd-ltr' : 'pnd-rtl'"
    style="width: max-content"
    :style="{ color: badgeColor, gap: text.length > 0 ? '6px' : '0' }"
  >
    <slot v-if="circle || icon" name="icon">
      <div
        v-if="circle"
        class="pnd-help-badge-icon"
        :style="{ backgroundColor: badgeColor }"
      ></div>
      <IconSvg v-else class="svg" :name="icon"></IconSvg>
    </slot>
    <span v-if="text" :style="{ color: badgeColor }">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import IconSvg from "./IconSvg.vue";

const props = defineProps({
  icon: { type: String, default: "" },
  text: { type: String, default: "" },
  color: { type: String, required: true },
  circle: { type: Boolean, default: false },
  ltr: { type: Boolean, default: false },
});

const badgeColor = ref();

onMounted(() => {
  if (props.color?.startsWith("#")) {
    badgeColor.value = props.color;
  } else {
    const root = document.documentElement;
    badgeColor.value = getComputedStyle(root)
      .getPropertyValue("--" + props.color + "-100")
      .trim();
  }
});
</script>
