<template>
  <div
    class="complex-card-header pnd-m-0"
    :class="{ 'has-extra': $slots.default }"
    style="direction: rtl"
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
    <div class="header-content pnd-d-flex pnd-flex-column">
      <span class="text-title pnd-text-start">{{
        props.title
      }}</span>
      <div class="text-subtitle pnd-text-start">
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
.complex-card-header {
  display: grid !important;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 12px;
  width: auto;
  box-sizing: border-box;
}

.complex-card-header.has-extra {
  grid-template-columns: auto minmax(0, 1fr) auto;
}

.start-header-icon {
  flex-shrink: 0;
}

.clickable-icon {
  cursor: pointer !important;
}

.header-content {
  min-width: 0;
  overflow: hidden;
}

.header-content .text-title,
.header-content .text-subtitle {
  width: 100%;
}

.header-extra {
  justify-self: end;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 0;
}
</style>
