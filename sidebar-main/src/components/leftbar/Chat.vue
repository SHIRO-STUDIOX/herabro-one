<template>
  <div class="leftbar-item" :class="{ active: open }">
    <IconSvg
      data-tooltip="گفت‌وگوی آنلاین"
      name="chat.svg"
      class="pnd-tooltip leftbar-icon"
      :class="{ active: open }"
      @click="toggleChat()"
    ></IconSvg>
    <div class="leftbar-content" @click.stop :class="['size-' + panelSize]">
      <div v-if="loading" class="leftbar-loader">
        <span>در حال بارگزاری ...</span>
        <Loader></Loader>
      </div>
      <LeftbarActions
        v-model="panelSize"
        :showNewTab="true"
        :newTabLink="link"
        :showRefresh="true"
        class="leftbar-actions"
        @close="toggleChat()"
        @refresh="refreshChat()"
      />
      <iframe
        v-if="link && (open || iframeLoaded)"
        class="leftbar-iframe"
        ref="iframeEl"
        :src="link"
        frameborder="0"
        @load="onIframeLoad"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import IconSvg from "../IconSvg.vue";
import { useAppStore } from "../../app/store";
import { computed, ref, watch } from "vue";
import Loader from "../Loader.vue";
import { storeToRefs } from "pinia";
import { useWindowSize } from "@vueuse/core";
import LeftbarActions from "./LeftbarActions.vue";

const { width } = useWindowSize();
const appStore = useAppStore();

const token = ref(null);
const link = ref(null);
const iframeLoaded = ref(false);
const loading = ref(true);
const iframeEl = ref(null);
const panelSize = ref("small");
const emit = defineEmits(["update:open"]);
const props = defineProps({
  open: Boolean,
});

const onIframeLoad = () => {
  loading.value = false;
  iframeLoaded.value = true;
  if (iframeEl.value) {
    iframeEl.value.classList.add("show");
  }
};

const localOpen = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("update:open", value);
  },
});

/**
 * Helper to determine if a URL points to an external origin
 *
 * @param {string} targetUrl The URL to test
 * @returns {boolean} True if the URL belongs to an external domain
 */
const isExternalUrl = (targetUrl) => {
  if (!targetUrl || typeof targetUrl !== "string") {
    return false;
  }
  try {
    if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
      const parsedUrl = new URL(targetUrl, window.location.href);
      const baseUrl = appStore.getConfig?.baseUrl;
      const baseHost = baseUrl
        ? new URL(baseUrl, window.location.href).host
        : window.location.host;
      // If host is different from current window host and configured baseUrl host, it is external
      return parsedUrl.host !== window.location.host && parsedUrl.host !== baseHost;
    }
    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Refreshes chat session by clearing current tokens and refetching
 */
const refreshChat = async () => {
  loading.value = true;
  token.value = null;
  link.value = null;
  await createLink();
};

const toggleChat = async () => {
  const rawUrl = appStore.getConfig?.chatTokenUrl;
  const isExternal =
    isExternalUrl(rawUrl) ||
    appStore.getConfig?.chatNewTab === true ||
    appStore.getConfig?.chatExternal === true;

  if (isExternal) {
    // 1. Immediately open new tab in the synchronous user click handler
    if (rawUrl) {
      window.open(rawUrl, "_blank");
    }

    // 2. Along with requesting: Send asynchronous background HTTP request (e.g. for ticket initialization or tracking)
    if (rawUrl) {
      try {
        fetch(rawUrl, { method: "GET", mode: "no-cors" }).catch(() => {});
      } catch (err) {
        // Suppress network/CORS error for external endpoints
      }
    }

    // Do not open the slide-out panel since user was directed to the new tab
    return;
  }

  // Standard internal token workflow (backward compatibility for existing projects)
  if (!iframeLoaded.value) {
    loading.value = true;
  }

  localOpen.value = !localOpen.value;
};

let isFetching = false;
const createLink = async () => {
  if (token.value || isFetching) {
    return;
  }
  isFetching = true;
  const url = appStore.getConfig?.chatTokenUrl;
  if (!url) {
    isFetching = false;
    return;
  }

  // If external URL was passed, set it directly as link
  if (isExternalUrl(url)) {
    link.value = url;
    loading.value = false;
    iframeLoaded.value = true;
    isFetching = false;
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.token) {
      token.value = data.token;
      link.value = "https://crm.avapardaz.ir/client/sso/" + token.value;
    } else if (data.url || data.link) {
      link.value = data.url || data.link;
    }
  } catch (error) {
    console.error("Error fetching chat token:", error);
  } finally {
    isFetching = false;
  }
};

watch(() => props.open, (newVal) => {
  if (newVal) {
    if (!token.value) {
      loading.value = true;
      createLink();
    }
  } else {
    panelSize.value = "small";
  }
});
</script>
