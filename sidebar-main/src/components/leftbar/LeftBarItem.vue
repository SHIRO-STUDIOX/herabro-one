<template>
  <div class="leftbar-item" :class="{ active: open }">
    <a
      v-if="type == 'link' || type == 'modal'"
      :href="link"
      v-bind="extraProps"
      :target="newtab ? '_blank' : ''"
    >
      <IconSvg
        :data-tooltip="title"
        :name="icon"
        class="pnd-tooltip leftbar-icon"
      ></IconSvg>
    </a>
    <IconSvg
      v-else-if="type == 'iframe'"
      :data-tooltip="title"
      :name="icon"
      class="pnd-tooltip leftbar-icon"
      :class="{ active: open }"
      @click="openCloseContent()"
    ></IconSvg>
    <div v-if="type == 'iframe'" class="leftbar-content" @click.stop :class="['size-' + panelSize]">
      <div v-if="loading" class="leftbar-loader">
        <span>در حال بارگزاری ...</span>
        <Loader></Loader>
      </div>
      <iframe
        v-if="open || iframeLoaded"
        class="leftbar-iframe"
        ref="iframeEl"
        :src="link"
        frameborder="0"
        @load="onIframeLoad"
      ></iframe>
      <LeftbarActions
        v-model="panelSize"
        :showNewTab="newtab"
        :newTabLink="link"
        class="leftbar-actions"
        @close="openCloseContent()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import IconSvg from "../IconSvg.vue";
import { useWindowSize } from "@vueuse/core";
import Loader from "../Loader.vue";
import LeftbarActions from "./LeftbarActions.vue";

const loading = ref(true);
const iframeLoaded = ref(false);
const panelSize = ref("small");
const iframeEl = ref(null);
const { width } = useWindowSize();
const emit = defineEmits(["toggleStatus"]);
const onIframeLoad = () => {
  loading.value = false;
  iframeLoaded.value = true;
  if (iframeEl.value) {
    iframeEl.value.classList.add("show");
  }
};
const props = defineProps({
  title: String,
  icon: String,
  open: Boolean,
  extraProps: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String, // link - modal - iframe
    default: "link",
  },
  link: {
    type: String,
    default: "",
  },
  newtab: {
    type: Boolean,
    default: false,
  },
});

const closeLeftbar = () => {
  if (!iframeLoaded.value) {
    loading.value = true;
  }
  emit("toggleStatus", null);
};

const openCloseContent = () => {
  emit("toggleStatus", props.title);
};

watch(
  () => props.open,
  (newVal) => {
    if (!newVal) {
      panelSize.value = "small";
    }
  }
);
</script>
