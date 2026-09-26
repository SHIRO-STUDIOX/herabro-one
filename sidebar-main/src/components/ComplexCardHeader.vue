<template>
  <div
    class="pnd-row pnd-m-0 pnd-d-flex pnd-align-items-center pnd-justify-content-center"
    style="direction: rtl; flex-wrap: nowrap"
  >
    <div
      :class="[
        startIconBgColor,
        startIconTextColor,
        'start-header-icon pnd-d-flex pnd-align-items-center pnd-justify-content-center',
        { 'clickable-icon': clickable },
      ]"
      @click="clickable && $emit('click')"
    >
      <PSvg v-if="isPSvg" :svg="props.startIcon" />
      <IconSvg v-else :name="props.startIcon"></IconSvg>
    </div>
    <div class="col p-0 pnd-d-flex pnd-flex-column" style="margin-right: 12px">
      <span class="col-12 p-0 text-title pnd-text-start">{{
        props.title
      }}</span>
      <div class="col-12 p-0 text-subtitle pnd-text-start">
        {{ props.subtitle }}
      </div>
    </div>
    <!-- Slot for content to the left of the header -->
    <div
      v-if="$slots.default"
      class="header-extra pnd-d-flex pnd-align-items-center"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import IconSvg from "./IconSvg.vue";
import { PSvg } from "pandora-design-system";

const props = defineProps({
  startIcon: [String, Object],
  startIconBgColor: {
    type: String,
    default: "bg-secondary-8",
  },
  startIconTextColor: {
    type: String,
    default: "text-secondary-100",
  },
  title: String,
  subtitle: String,
  clickable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const isPSvg = computed(() => {
  if (!props.startIcon) return false;
  if (typeof props.startIcon === "object") return true;
  if (typeof props.startIcon === "string") {
    return (
      props.startIcon.trim().startsWith("<") ||
      props.startIcon.includes("<svg") ||
      props.startIcon.includes("<path")
    );
  }
  return false;
});
</script>

<style scoped>
.clickable-icon {
  cursor: pointer !important;
}
.header-extra {
  margin-right: auto;
  flex-shrink: 0;
}
</style>
