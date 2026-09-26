<template>
  <div v-if="isOpen && width > 768" class="global-blur-wrapper" @click="closeQuickAction"></div>

  <div v-if="items.length > 0" id="quick-action-container">
    <div
      id="quick-action-button"
      :class="[{ active: isOpen }]"
      @click="toggleQuickAction"
    >
      <IconSvg :name="isOpen? 'close.svg': 'quick_action.svg'" />
    </div>

    <transition
      :name="
        width > 768
          ? 'quick-action-card-transition'
          : 'quick-action-card-transition-mobile'
      "
      @after-enter="onAfterEnter"QuickAction
    >
      <div
        id="quick-action-card"
        class="result-card-content pnd-p-0"
        v-show="isOpen"
      >
        <div
          id="card-result"
          class="pnd-scrollable hide-scrollbar"
          ref="scrollableRef"
        >
          <CardHeader
            icon="quick_action.svg"
            text="دسترسی سریع"
          />
          <div id="quick-action-card-body">
            <a
              v-for="(item, index) in items"
              :key="index"
              :href="!item?.lock ? (item.url ?? 'javascript:void(0)'): 'javascript:void(0)'"
              @click.prevent="handleItemClick(item)"
              :class="[
                'pnd-d-flex pnd-items selectable',
                { selected: selectedIndex === index },
                { locked: item?.lock }
              ]"
              :style="getItemStyle(index)"
              :ref="(el) => setSelectableItemRef(el, index)"
              v-bind="item.params || {}"
            >
              <span style="font-size: 14px">{{ item.title }}</span>
              <div>
                <IconSvg name="arrow_left.svg"></IconSvg>
              </div>
            </a>
          </div>
        </div>
        <div class="pnd-gradient-bottom"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, nextTick } from "vue";
import IconSvg from "./IconSvg.vue";
import CardHeader from "./CardHeader.vue";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

const props = defineProps({
  items: { type: Array, default: [] },
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["update:open"]);
const isOpen = ref(false);
const scrollableRef = ref(null);

const selectedIndex = ref(-1);
const selectableItemsMap = new Map();

const setSelectableItemRef = (el, index) => {
  if (el) {
    selectableItemsMap.set(index, el);
  } else {
    selectableItemsMap.delete(index);
  }
};

function onAfterEnter() {
  if (props.items.length > 0) {
    selectedIndex.value = 0;
    scrollToSelectedItem();
  }
}

function onAfterLeave() {
  if (scrollableRef.value) scrollableRef.value.scrollTop = 0;
  selectedIndex.value = -1;
}

function handleKeydown(e) {
  if (!isOpen.value || props.items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
    scrollToSelectedItem();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex.value =
      (selectedIndex.value - 1 + props.items.length) % props.items.length;
    scrollToSelectedItem();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (selectedIndex.value !== -1) {
      const selectedItem = props.items[selectedIndex.value];
      if (selectedItem) {
        handleActionSelect(selectedItem);
      }
    }
  } else if (e.key === "Escape") {
    closeQuickAction();
  }
}

function scrollToSelectedItem() {
  if (selectedIndex.value === -1 || !scrollableRef.value) return;

  nextTick(() => {
    const selectedElement = selectableItemsMap.get(selectedIndex.value);
    if (!selectedElement) return;

    const container = scrollableRef.value;
    const header = container.querySelector(".pnd-card-header");
    const headerHeight = header ? header.offsetHeight : 0;

    const containerRect = container.getBoundingClientRect();
    const selectedItemRect = selectedElement.getBoundingClientRect();

    const itemTopRelativeToContainer = selectedItemRect.top - containerRect.top;
    const itemBottomRelativeToContainer =
      selectedItemRect.bottom - containerRect.top;
    const visibleContainerTop = headerHeight;
    const visibleContainerBottom = container.clientHeight;

    if (itemTopRelativeToContainer < visibleContainerTop) {
      container.scrollTop += itemTopRelativeToContainer - headerHeight;
    } else if (itemBottomRelativeToContainer > visibleContainerBottom) {
      container.scrollTop +=
        itemBottomRelativeToContainer - visibleContainerBottom + 24;
    }
  });
}

function handleActionSelect(item) {
  if (!item.url) return;
  window.location.href = item.url;
  closeQuickAction();
}

function handleItemClick(item) {
  if (!item?.lock) {
    handleActionSelect(item);
  }
}

onMounted(() => {
  watch(
    () => props.open,
    (val) => {
      isOpen.value = val;
    },
    { immediate: true }
  );
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

function toggleQuickAction() {
  emit("update:open", !isOpen.value);
}

function closeQuickAction() {
  if (isOpen.value) {
    emit("update:open", false);
  }
}

function getItemStyle(idx) {
  let style = "justify-content: space-between; margin:0px 16px;";
  if (idx === props.items.length - 1) {
    style += " margin-bottom:20px !important;";
  }
  return style;
}
</script>

<style scoped>
.quick-action-card-transition-enter-from,
.quick-action-card-transition-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(24px) !important;
}

.quick-action-card-transition-enter-to,
.quick-action-card-transition-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0) !important;
}

.quick-action-card-transition-mobile-enter-from,
.quick-action-card-transition-mobile-leave-to {
  opacity: 0;
  transform: translateY(24px) !important;
}

.quick-action-card-transition-mobile-enter-to,
.quick-action-card-transition-mobile-leave-from {
  opacity: 1;
  transform: translateY(0) !important;
}
</style>
