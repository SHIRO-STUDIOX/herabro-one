<template>
  <div class="leftbar-actions-container">
    <!-- Close Button (outside, top) -->
    <div
      class="leftbar-action-button close-btn"
      @click="$emit('close')"
      title="بستن"
    >
      <PSvg :svg="closeCircleOutline" class="text-error-100" />
    </div>

    <!-- Capsule for sizes and new tab (middle) -->
    <div v-if="shouldShowCapsule" class="leftbar-action-capsule">
      <!-- Sizes (only on Desktop, width > 768) -->
      <template v-if="width > 768">
        <div
          class="capsule-icon-wrapper"
          :class="{ active: modelValue === 'small' }"
          @click="updateSize('small')"
          title="سایز کوچک"
        >
          <PSvg :svg="minimizeSquareMinimalisticOutline" />
        </div>
        <div
          class="capsule-icon-wrapper"
          :class="{ active: modelValue === 'medium' }"
          @click="updateSize('medium')"
          title="سایز متوسط"
        >
          <PSvg :svg="maximizeSquareMinimalisticOutline" />
        </div>
        <div
          class="capsule-icon-wrapper"
          :class="{ active: modelValue === 'large' }"
          @click="updateSize('large')"
          title="سایز بزرگ"
        >
          <PSvg :svg="maximizeSquare3Outline" />
        </div>
      </template>

      <!-- Divider line between sizes and new tab if both present -->
      <div v-if="showNewTab && width > 768" class="capsule-divider"></div>

      <!-- New Tab (Desktop & Mobile if enabled) -->
      <div
        v-if="showNewTab"
        class="capsule-icon-wrapper newtab-btn"
        @click="openNewTab"
        title="باز کردن در صفحه جدید"
      >
        <PSvg :svg="squareShareLineOutline" />
      </div>
    </div>

    <!-- Refresh Button (outside, bottom) -->
    <div
      v-if="showRefresh"
      class="leftbar-action-button refresh-btn"
      @click="$emit('refresh')"
      title="به‌روزرسانی"
    >
      <PSvg :svg="refreshCircle2Outline" class="text-primary-100" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { PSvg } from "pandora-design-system";

import closeCircleOutline from "pandora-icons/closeCircleOutline";
import minimizeSquareMinimalisticOutline from "pandora-icons/minimizeSquareMinimalisticOutline";
import maximizeSquareMinimalisticOutline from "pandora-icons/maximizeSquareMinimalisticOutline";
import maximizeSquare3Outline from "pandora-icons/maximizeSquare3Outline";
import squareShareLineOutline from "pandora-icons/squareShareLineOutline";
import refreshCircle2Outline from "pandora-icons/refreshCircle2Outline";

const props = defineProps({
  modelValue: {
    type: String,
    default: "small",
  },
  showNewTab: {
    type: Boolean,
    default: false,
  },
  newTabLink: {
    type: String,
    default: "",
  },
  showRefresh: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close", "refresh"]);

const { width } = useWindowSize();

const shouldShowCapsule = computed(() => {
  // On desktop, we always show size controls (at least the 3 size buttons)
  // On mobile, we only show it if new tab is enabled (since sizes are hidden on mobile)
  if (width.value > 768) {
    return true;
  }
  return props.showNewTab;
});

const updateSize = (newSize) => {
  emit("update:modelValue", newSize);
};

const openNewTab = () => {
  if (props.newTabLink) {
    window.open(props.newTabLink, "_blank");
  }
};
</script>

<style scoped>
.leftbar-actions-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.leftbar-action-button {
  background: var(--white-100);
  width: 44px;
  height: 44px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 24px 0px var(--primary-6);
  border: 1px solid var(--primary-8);
  transition: all 0.2s ease;
  font-size: 20px;
}

.leftbar-action-button:hover {
  filter: brightness(0.95);
}

.leftbar-action-button :deep(svg) {
  width: 1em !important;
  height: 1em !important;
}

.leftbar-action-capsule {
  background: var(--white-100);
  border-radius: 99px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 0px 24px 0px var(--primary-6);
  border: 1px solid var(--primary-8);
  width: 44px;
}

.capsule-icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-40);
  transition: all 0.2s ease;
  font-size: 20px;
}

.capsule-icon-wrapper:hover {
  color: var(--primary-80);
  background-color: var(--primary-6);
}

.capsule-icon-wrapper.active {
  color: var(--primary-100);
  background-color: var(--primary-8);
}

.capsule-icon-wrapper :deep(svg) {
  width: 1em !important;
  height: 1em !important;
}

.capsule-divider {
  width: 24px;
  height: 1px;
  background-color: var(--primary-12);
  margin: 2px 0;
}

.refresh-btn {
  color: var(--primary-100);
}

.newtab-btn {
  color: var(--primary-100);
}

@media only screen and (max-width: 768px) {
  .leftbar-actions-container {
    flex-direction: row;
    gap: 8px;
  }
  .leftbar-action-capsule {
    flex-direction: row;
    height: 44px;
    width: auto;
    border-radius: 99px;
    padding: 6px;
  }
  .capsule-divider {
    width: 1px;
    height: 24px;
    margin: 0 2px;
  }
}
</style>
