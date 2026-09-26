<template>
  <div v-if="openItem" class="global-blur-wrapper" @click="closeLeftbar"></div>
  <div class="left-bar" :class="{ show: open }">
    <Chat v-if="appStore.getConfig.chatTokenUrl" v-model:open="isChatOpen"> </Chat>
    <Education
      icon="education.svg"
      v-model:open="isEducationOpen"
      @openChatbox="openChatbox"
    >
    </Education>

    <LeftBarItem
      v-for="(item, index) in items"
      :key="index"
      :open="index == openIndex"
      :title="item.title"
      :icon="item.icon"
      :type="item.type"
      :link="item.link"
      :newtab="item?.newtab"
      :extraProps="item.props ?? null"
      @toggleStatus="toggleStatus"
    />

    <RecentChanges
      v-if="appStore.getConfig?.changelogVersionsApiUrl && appStore.getConfig?.changelogVersionDetailApiUrl"
      v-model:open="isRecentChangesOpen"
    >
    </RecentChanges>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import LeftBarItem from "./LeftBarItem.vue";
import Education from "./Education.vue";
import RecentChanges from "./RecentChanges.vue";
import { useAppStore } from "../../app/store.js";
import Chat from "./Chat.vue";
import { useWindowSize } from "@vueuse/core";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:open"]);
const { width } = useWindowSize();

const appStore = useAppStore();
const { closeFaqModal } = appStore;
const openIndex = ref(-1);
const isChatOpen = ref(false);
const items = ref([]);
const isEducationOpen = ref(false);
const isRecentChangesOpen = ref(false);
const openItem = ref(false);

watch(isChatOpen, (newVal) => {
  if (newVal == true) {
    openIndex.value = -1;
    openItem.value = true;
    isEducationOpen.value = false;
    isRecentChangesOpen.value = false;
    closeFaqModal();
    if (width.value < 768) {
      emit("update:open", false);
    }
  } else {
    setTimeout(() => {
      if(!isEducationOpen.value && !isRecentChangesOpen.value && openIndex.value < 0) {
        openItem.value = false;
      } 
    }, 100);
  }
});

watch(isEducationOpen, (newVal) => {
  if (newVal == true) {
    openIndex.value = -1;
    openItem.value = true;
    isChatOpen.value = false;
    isRecentChangesOpen.value = false;
    if (width.value < 768) {
      emit("update:open", false);
    }
  } else {
    setTimeout(() => {
      if(!isChatOpen.value && !isRecentChangesOpen.value && openIndex.value < 0) {
        openItem.value = false;
      } 
    }, 100);
  }
});

watch(isRecentChangesOpen, (newVal) => {
  if (newVal == true) {
    openIndex.value = -1;
    openItem.value = true;
    isChatOpen.value = false;
    isEducationOpen.value = false;
    closeFaqModal();
    if (width.value < 768) {
      emit("update:open", false);
    }
  } else {
    setTimeout(() => {
      if(!isChatOpen.value && !isEducationOpen.value && openIndex.value < 0) {
        openItem.value = false;
      } 
    }, 100);
  }
});

watch(
  () => appStore.getConfig?.leftbarItems,
  (newItems) => {
    items.value = newItems || [];
  },
  { immediate: true }
);

const openChatbox = () => {
  isEducationOpen.value = false;
  isChatOpen.value = true;
}

const closeLeftbar = () => {
  isChatOpen.value = false;
  isEducationOpen.value = false;
  isRecentChangesOpen.value = false;
  openIndex.value = -1;
  openItem.value = false;
  closeFaqModal();
};

const toggleStatus = (title) => {
  if (!title) {
    openIndex.value = -1;
    return;
  }
  const index = items.value.findIndex((item) => item.title === title);
  openIndex.value = index == openIndex.value ? -1 : index;
  if (openIndex.value >= 0) {
    closeFaqModal();
    isChatOpen.value = false;
    isEducationOpen.value = false;
    isRecentChangesOpen.value = false;
    openItem.value = true;
    if (width.value < 768) {
      emit("update:open", false);
    }
  } else {
    openItem.value = false;
  }
};

defineExpose({
  closeLeftbar
});
</script>
