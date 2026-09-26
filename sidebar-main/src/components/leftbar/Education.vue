<template>
  <div class="leftbar-item" :class="{ active: open }">
    <IconSvg
      data-tooltip="سوالات متداول"
      :name="icon"
      class="pnd-tooltip leftbar-icon"
      :class="{ active: open }"
      @click="openCloseContent()"
    ></IconSvg>
    <div class="leftbar-content" :class="['size-' + panelSize]">
      <div v-if="loading" class="leftbar-loader">
        <span>در حال بارگذاری ...</span>
        <Loader></Loader>
      </div>
      <template v-else>
        <ComplexCardHeader
          startIcon="question-bold.svg"
          startIconBgColor="bg-accent-6"
          startIconTextColor="text-accent-100"
          title="سوالات متداول"
          :subtitle="appStore.getActiveSidebarItemId?.label ?? ''"
          style="margin: 20px !important"
        />
        <div class="divider"></div>
        <div
          class="pnd-scrollable hide-scrollbar pnd-d-flex pnd-flex-column"
          style="padding: 20px 20px 80px 20px; gap: 24px"
          id="faq-container"
        >
          <template
            v-if="(faqs ?? []).length > 0"
            v-for="(faq, i) in faqs ?? []"
            :key="i"
          >
            <div :id="`sidebar-faq-${i}`">
              <FaqItem
                @toggle="toggleFaqItem(i)"
                :expand="exapndId == i"
                :question="faq.question"
                :answer="faq.answer"
                :relatedId="faq.related_id"
                :tags="faq?.tags ?? []"
              ></FaqItem>
            </div>
            <div v-if="i < faqs.length - 1" class="divider"></div>
          </template>
          <div v-else class="pnd-w-100 pnd-h-100" style="padding-bottom: 8vh">
            <EmptyState
              icon="inbox_empty.svg"
              title="نتیجه‌ای یافت نشد!"
              subtitle="سوالی برای این صفحه ایجاد نشده است."
            >
            </EmptyState>
          </div>
          <div
            style="
              width: max-content;
              position: absolute;
              left: 20px;
              bottom: 20px;
            "
          >
            <PButton
              size="md"
              outline
              :start-icon="questionIcon"
              type="white"
              style="padding: 8px 12px !important; backdrop-filter: blur(16px)"
              @click="openChatbox()"
            >
              <span class="pnd-mx-auto">سوال دیگری دارید؟</span>
            </PButton>
          </div>
        </div>
      </template>

      <LeftbarActions
        v-model="panelSize"
        class="leftbar-actions"
        @close="openCloseContent()"
      />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "../../app/store";
import { onMounted, onUnmounted, ref, watch } from "vue";
import IconSvg from "../IconSvg.vue";
import Loader from "../Loader.vue";
import ComplexCardHeader from "../ComplexCardHeader.vue";
import FaqItem from "./FaqItem.vue";
import EmptyState from "../EmptyState.vue";
import questionIcon from "../../assets/icons/question-bold.svg?raw";
import { PButton } from "pandora-design-system";
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";
import LeftbarActions from "./LeftbarActions.vue";

const appStore = useAppStore();
const { isFaqModalVisible } = storeToRefs(appStore);
const { width } = useWindowSize();
const loading = ref(true);
const panelSize = ref("small");
const faqs = ref(null);
const exapndId = ref(-1);
const selectedRelatedId = ref(null);
const emit = defineEmits(["openChatbox", "update:open"]);
const props = defineProps({
  icon: String,
  open: Boolean,
});

onMounted(() => {
  window.addEventListener("open-leftbar-faq", handleLeftbarFaq);
});

onUnmounted(() => {
  window.removeEventListener("open-leftbar-faq", handleLeftbarFaq);
});

watch(isFaqModalVisible, (value) => {
  emit("update:open", value);
});

watch(
  () => props.open,
  (value) => {
    if (!value) {
      panelSize.value = "small";
      selectedRelatedId.value = null;
      exapndId.value = -1;
    } else if (value && faqs.value == null) {
      loadData();
    } else {
      // value is true and faqs exists
      findSelectedItem();
    }
  },
);

const openChatbox = () => {
  emit("openChatbox");
};

const handleLeftbarFaq = (event) => {
  selectedRelatedId.value = event.detail.id;
  emit("update:open", true);
};

const loadData = async () => {
  loading.value = true;
  if (appStore.getActiveSidebarItemId?.id) {
    const response = await fetch(
      appStore.getConfig.educationApiUrl +
        "?relationId=" +
        appStore.getActiveSidebarItemId.key,
    );
    if (!response.ok) {
      console.error("خطا در پاسخ سرور:", await response.status);
    } else {
      let data = await response.json();
      let tags = data.tags;
      faqs.value = data.faqs;
      tags.forEach((tag) => {
        for (let i = 0; i < faqs.value.length; i++) {
          const faq = faqs.value[i];
          if (faq.id == tag.item_id) {
            if (!faq.tags) faq.tags = [];
            faq.tags.push({
              id: tag.id,
              title: tag.tag.title,
              color: tag.tag.color,
            });
          }
        }
      });
      findSelectedItem();
    }
  } else {
    findSelectedItem();
  }
  loading.value = false;
};

const findSelectedItem = () => {
  // from event
  if (selectedRelatedId.value) {
    for (var i = 0; i < faqs.value.length; i++) {
      const faq = faqs.value[i];
      if (selectedRelatedId.value == faq.related_model_id) {
        exapndId.value = i;
        var foundId = i.toString();
        setTimeout(() => {
          document
            .getElementById(`sidebar-faq-${foundId}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
        break;
      }
    }
  } else {
    setTimeout(() => {
        const container = document.querySelector(".pnd-scrollable");
        if (container) {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
  }
};
const toggleFaqItem = (i) => {
  if (exapndId.value == i) {
    exapndId.value = -1;
  } else {
    exapndId.value = i;
  }
};

const openCloseContent = () => {
  emit("update:open", !props.open);
};
</script>
