<template>
  <ul
    ref="target"
    class="corner-button"
    style="padding: 0 !important; margin-left: 12px"
  >
    <li
      class="drop-down switcher-dropdown-item"
      @mouseleave="checkLeave"
      @mouseenter="openSwitcherMenu"
      @click="toggleSwitcherMenu"
      :style="'cursor:' + (switcher.items?.length > 0 ? 'pointer' : 'default')"
    >
      <div
        v-if="width > 1280"
        class="pnd-d-flex pnd-flex-row pnd-align-items-center switcher-info-trigger"
        style="gap: 12px"
      >
        <div
          v-if="switcher.title"
          class="pnd-d-flex pnd-flex-row pnd-align-items-center"
        >
          <span class="button-text">{{ switcher.title }}</span>
        </div>
        <div
          v-else
          class="pnd-d-flex pnd-flex-row pnd-align-items-center"
          style="gap: 12px"
        >
          <!-- type of title is object (year-branch-business) -->
          <span
            class="business-year"
            style="
              font-weight: 700;
              font-size: 14px;
              white-space: nowrap;
              color: var(--primary-80);
            "
            >{{ year }}</span
          >
          <div
            class="v-divider"
            style="height: 20px; border-left: 1px solid var(--primary-12)"
          ></div>
          <div
            class="pnd-d-flex pnd-flex-column"
            style="gap: 2px; max-width: 196px; text-align: right"
          >
            <span
              class="business-name pnd-ellipsis pnd-tooltip"
              :data-tooltip="id"
              style="
                font-size: 12px;
                font-weight: 800;
                color: var(--primary-80);
              "
            >
              {{ name }}
            </span>
            <span
              class="business-branch pnd-ellipsis"
              style="
                font-size: 10px;
                color: var(--primary-80);
                font-weight: 500;
                color: var(--primary-60);
              "
            >
              {{ branch }}
            </span>
          </div>
        </div>
        <i
          v-if="switcher.items?.length > 0"
          class="pnd-hidden-mobile fas fa-chevron-down toggle-icon"
          :class="{ 'rotate-180': hover }"
        ></i>
      </div>
      <a
        v-else
        class="pnd-d-flex pnd-align-items-center"
        style="flex-wrap: nowrap; white-space: nowrap"
      >
        <IconSvg
          class="text-primary-60 svg pnd-d-flex"
          name="branch.svg"
        ></IconSvg>
      </a>

      <div v-if="hover" class="switcher-card">
        <div class="switcher-card-content" dir="rtl">
          <TextInput
            v-if="switcher.items && switcher.items.length > 5"
            placeholder="جستجو"
            style="margin-bottom: 8px"
            v-model="search"
          />
          <div
            v-if="switcher.items && switcher.items.length > 0"
            class="switcher-items"
            dir="ltr"
            style="margin-bottom: 8px"
          >
            <div class="pnd-d-flex pnd-flex-column" dir="rtl">
              <div v-for="(item, index) in switcher.items" :key="index">
                <LinkItem
                  v-if="item['text'].includes(search)"
                  :text="item['text']"
                  :url="needsToSendToken ? null : item['url']"
                  :active="item['active']"
                  :endIcon="
                    loadingIndex === index
                      ? 'fas fa-spinner fa-spin'
                      : item['active']
                        ? 'fas fa-check text-secondary-100'
                        : 'fas fa-arrow-left'
                  "
                  @click="
                    !item['active'] && openUrlWithToken(item['url'], index)
                  "
                />
              </div>
            </div>
          </div>
          <div
            v-if="switcher.hasOwnProperty('client')"
            class="pnd-d-flex pnd-flex-column"
            style="gap: 12px"
          >
            <div class="switcher">
              <ComplexCardHeader
                startIcon="branch.svg"
                :title="switcher.client?.text ?? '-'"
                subtitle="کسب‌و‌کار شما"
              />
            </div>
            <div
              class="pnd-d-flex pnd-row"
              style="gap: 8px"
              v-if="
                switcher.hasOwnProperty('yearsDropDown') ||
                switcher.hasOwnProperty('branchesDropDown')
              "
            >
              <div
                class="pnd-flex-1"
                v-if="switcher.hasOwnProperty('yearsDropDown')"
              >
                <PDropdown
                  size="md"
                  :title="switcher.yearsDropDown?.title"
                  :options="switcher.yearsDropDown?.items"
                  :model-value="switcher.yearsDropDown?.selectedValue"
                  @on-options-hover="optionsHover"
                  @on-options-leave="optionsLeave"
                  @update:model-value="callYearApi"
                >
                </PDropdown>
              </div>
              <div
                class="pnd-flex-1"
                v-if="switcher.hasOwnProperty('branchesDropDown')"
              >
                <PDropdown
                  size="md"
                  :title="switcher.branchesDropDown?.title"
                  :options="switcher.branchesDropDown?.items"
                  @update:model-value="callBranchApi"
                  :model-value="switcher.branchesDropDown?.selectedValue"
                  @on-options-hover="optionsHover"
                  @on-options-leave="optionsLeave"
                >
                </PDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useAppStore } from "../app/store";
import IconSvg from "./IconSvg.vue";
import ComplexCardHeader from "./ComplexCardHeader.vue";
import { useWindowSize, onClickOutside } from "@vueuse/core";
import { PDropdown } from "pandora-design-system";
import LinkItem from "./LinkItem.vue";
import TextInput from "./TextInput.vue";

const { width } = useWindowSize();
const appStore = useAppStore();

const hover = ref(false);
const isDropdownOpen = ref(false);
const isSwitcherMenuOpen = ref(false);
const target = ref(null);

const year = ref("");
const name = ref("");
const id = ref("");
const search = ref("");
const branch = ref("");
const switcher = ref({});
const needsToSendToken = ref(false);
const loadingIndex = ref(-1);

onMounted(() => {
  updateSwitchersInfo();
});

function updateSwitchersInfo() {
  if (appStore.getConfig.switcher) {
    switcher.value = appStore.getConfig.switcher;

    if (switcher.value.itemsApiUrl) {
      getSwitcherItems(switcher.value.itemsApiUrl);
    }
  } else if (
    !switcher.value?.client ||
    !switcher.value?.yearsDropDown?.items ||
    !switcher.value?.branchesDropDown?.items
  ) {
    return;
  }
  name.value = switcher.value?.client?.text;
  id.value = switcher.value?.client?.id ?? "";

  let yearItem = switcher.value?.yearsDropDown?.items.find(
    (item) => item.value == switcher.value?.yearsDropDown.selectedValue,
  );
  year.value = yearItem?.key;

  let branchItem = switcher.value?.branchesDropDown?.items.find(
    (item) => item.value == switcher.value?.branchesDropDown.selectedValue,
  );
  branch.value = branchItem?.key;
}

onClickOutside(
  target,
  () => {
    setTimeout(() => {
      closeSwitcherMenu();
    }, 10);
  },
  {
    ignore: [".switcher-info-trigger"],
  },
);

watch(
  () => appStore.isSwitcherMenuVisible,
  (state) => {
    if (state == true) {
      setTimeout(() => {
        openSwitcherMenu();
      }, 15);
    } else {
      closeSwitcherMenu();
    }
  },
);

async function openUrlWithToken(url, index) {
  try {
    if (loadingIndex.value >= 0) {
      return;
    }
    loadingIndex.value = index;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const redirectUrl = data.response?.redirect_url;

    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    } else {
      console.error("No redirect URL found");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadingIndex.value = -1;
  }
}

async function getSwitcherItems(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.error("خطا در پاسخ سرور:", await response.status);
  } else {
    needsToSendToken.value = true;
    let data = await response.json();
    switcher.value.items = data["links"];
  }
}

async function callYearApi(val) {
  try {
    const response = await fetch(
      switcher.value?.yearsDropDown.apiSchema?.replace(":id", val),
    );
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function callBranchApi(val) {
  try {
    const response = await fetch(
      switcher.value?.branchesDropDown.apiSchema?.replace(":id", val),
    );
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function openSwitcherMenu() {
  if (
    switcher.value.items?.length == 0 &&
    !switcher.value.yearsDropDown &&
    !switcher.value.branchesDropDown
  )
    return;
  if (width.value < 768) return;
  isSwitcherMenuOpen.value = true;
  hover.value = true;
}

function closeSwitcherMenu() {
  isSwitcherMenuOpen.value = false;
  hover.value = false;
  search.value = "";
}

function toggleSwitcherMenu() {
  if (width.value <= 768) {
    isSwitcherMenuOpen.value = !isSwitcherMenuOpen.value;
    hover.value = isSwitcherMenuOpen.value;
    if (!isSwitcherMenuOpen.value) {
      search.value = "";
    }
  }
}

function checkLeave() {
  if (width.value < 768) return;
  isSwitcherMenuOpen.value = false;
  setTimeout(() => {
    if (!isDropdownOpen.value && !isSwitcherMenuOpen.value) {
      hover.value = false;
      search.value = "";
    }
  }, 50);
}

function optionsHover() {
  if (
    switcher.value.items?.length == 0 &&
    !switcher.value.yearsDropDown &&
    !switcher.value.branchesDropDown
  )
    return;
  isDropdownOpen.value = true;
}

function optionsLeave() {
  if (
    switcher.value.items?.length == 0 &&
    !switcher.value.yearsDropDown &&
    !switcher.value.branchesDropDown
  )
    return;
  isDropdownOpen.value = false;
  checkLeave();
}
</script>

<style scoped>
.switcher-dropdown-item {
  position: relative;
  padding: 0 16px;
  cursor: pointer;
  min-height: 44px;
  display: flex;
  align-items: center;
}

@media (max-width: 1280px) {
  .switcher-dropdown-item {
    padding: 0 !important;
    width: 44px;
    justify-content: center;
  }
}

.switcher-info-trigger {
  user-select: none;
}
</style>
