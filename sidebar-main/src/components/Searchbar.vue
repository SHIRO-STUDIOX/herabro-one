<template>
  <Transition name="fade">
    <div v-show="isOpen" class="global-blur-wrapper" @click="updateOpen(false)">
      <Transition name="slide">
        <div
          v-show="isOpen"
          id="global-search-modal"
          class="selectable-group"
          :class="size ? size : ''"
          @click.stop
        >
          <div class="searchbar-wrapper">
            <div class="pnd-d-flex pnd-w-100 pnd-align-items-center">
              <IconSvg
                class="search-icon svg"
                :class="specialSelected || search.length >= 2 ? 'typing' : ''"
                name="search_outline.svg"
              ></IconSvg>
              <span
                class="special-item text-white-100"
                :class="specialSelected ? 'show' : ''"
                style="box-shadow: none"
                >{{ specialSelected }}</span
              >
              <input
                id="searchInput"
                class="searchbar"
                type="text"
                v-model="search"
                :placeholder="
                  specialAction
                    ? specialAction.placeholder + ' ...'
                    : 'به دنبال چه چیزی هستید؟...'
                "
                autocomplete="off"
              />
              <div
                v-if="search.length == 0"
                class="pnd-d-flex"
                style="gap: 4px"
              >
                <div class="shortcut">
                  <span>K</span>
                </div>
                <div class="shortcut">
                  <span>{{ ctrlSymbol }}</span>
                </div>
              </div>
              <div v-else class="pnd-d-flex" style="gap: 4px">
                <div class="shortcut">
                  <span>Esc</span>
                </div>
              </div>
              <div
                v-if="loading"
                style="
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0px;
                  width: calc(100% - 10px);
                  margin: 0 auto;
                "
              >
                <Loader></Loader>
              </div>
            </div>
          </div>

          <div
            v-if="(specialSelected ? (hasSpecialLoaded && !loading) || specialResult?.length > 0 : canSearch())"
            id="result-card"
            class="hide-scrollbar"
            ref="resultCardContainer"
          >
            <CardHeader icon="list_check.svg" text="نتایج" :shortcuts="['⇅']" />
            <div class="result-card-content">
              <div
                v-if="!specialSelected"
                v-for="(module, moduleIndex) in filteredModules"
                :key="module.label"
                class="pnd-d-flex pnd-flex-column"
                style="margin-bottom: 12px; gap: 4px"
              >
                <a
                  :href="module.url"
                  class="selectable module-name-icon"
                  :class="{
                    selected: selectedIndex === getGlobalIndex(moduleIndex, -1),
                  }"
                  :ref="
                    (el) =>
                      setSelectableItemRef(el, getGlobalIndex(moduleIndex, -1))
                  "
                >
                  <span
                    class="icon svg"
                    v-if="module.icon && module.icon.trim().startsWith('<')"
                    v-html="module.icon"
                  ></span>
                  <IconSvg
                    v-else
                    class="icon svg"
                    :name="module.icon"
                  ></IconSvg>
                  <span
                    class="name"
                    v-html="highlightText(module.label, search)"
                  ></span>
                </a>
                <div
                  v-for="(item, itemIndex) in module.items"
                  :key="item.id"
                  class="pnd-d-flex pnd-flex-column"
                  style="gap: 4px"
                >
                  <a
                    style="justify-content: space-between; padding-right: 28px"
                    class="pnd-d-flex pnd-items"
                    :class="{
                      locked: item.lock,
                      selectable: !item.lock,
                      selected:
                        selectedIndex ===
                        getGlobalIndex(moduleIndex, itemIndex),
                      special: item.has_action,
                    }"
                    :href="createItemUrl(item)"
                    :ref="
                      (el) =>
                        !item.lock &&
                        setSelectableItemRef(
                          el,
                          getGlobalIndex(moduleIndex, itemIndex),
                        )
                    "
                  >
                    <span
                      class="pnd-ellipsis"
                      style="font-size: 14px"
                      v-html="highlightText(item.label, search)"
                    ></span>
                    <div class="pnd-d-flex pnd-align-items-center">
                      <IconSvg
                        v-if="!item.lock && item.has_action"
                        class="star-item iconsvg"
                        name="star.svg"
                      ></IconSvg>

                      <span
                        v-if="!item.lock && !item.has_action"
                        class="search-breadcrumb"
                        :class="{
                          'show-breadcrumb':
                            selectedIndex ===
                            getGlobalIndex(moduleIndex, itemIndex),
                        }"
                        >{{ item.breadcrumb }}</span
                      >

                      <IconSvg
                        class="icon svg"
                        :name="item.lock ? 'lock.svg' : 'arrow_left.svg'"
                      ></IconSvg>
                    </div>
                  </a>
                </div>
              </div>
              <div
                v-if="!specialSelected && filteredModules.length === 0"
                class="pnd-w-100 pnd-h-100"
                style="padding: 24px 0"
              >
                <EmptyState
                  icon="search-empty.svg"
                  title="نتیجه‌ای یافت نشد!"
                  :subtitle="`عبارت «${search.length > 20 ? search.substring(0, 20) + '...' : search}» با هیچ گزینه‌ای مطابقت نداشت.\nلطفاً مطمئن شوید که عبارت خود را به درستی وارد کرده‌اید.`"
                />
              </div>
              <div
                v-if="specialSelected && specialResult.length > 0"
                class="pnd-d-flex pnd-flex-column"
                style="gap: 4px"
              >
                <a
                  v-for="(result, idx) in specialResult"
                  :key="result.id"
                  class="pnd-items selectable"
                  :class="{
                    selected: selectedIndex === idx,
                  }"
                  :href="createItemUrl(result)"
                  style="font-size: 14px"
                  :ref="(el) => setSelectableItemRef(el, idx)"
                >
                  <span
                    class="pnd-special-search-item name text-nowrap pnd-row pnd-flex-grow-1"
                  >
                    <span
                      class="pnd-special-search-text"
                      style="margin-right: 5px"
                      >{{ idx + 1 }}) {{ result.text }}</span
                    >
                  </span>

                  <Badge
                    v-if="result.color"
                    :color="result.color"
                    :circle="specialResultHelp.length > 0"
                    ltr
                    :text="result.badgeText ?? ''"
                  />
                  <IconSvg class="icon svg" name="arrow_left.svg"></IconSvg>
                </a>
              </div>
              <div
                v-if="specialSelected && specialResult.length === 0 && !loading"
                class="pnd-w-100 pnd-h-100"
                style="padding: 24px 0"
              >
                <EmptyState
                  icon="search-empty.svg"
                  title="نتیجه‌ای یافت نشد!"
                  :subtitle="`عبارت «${search.length > 20 ? search.substring(0, 20) + '...' : search}» با هیچ گزینه‌ای مطابقت نداشت.\nلطفاً مطمئن شوید که عبارت خود را به درستی وارد کرده‌اید.`"
                />
              </div>
            </div>
          </div>
          <div
            id="searchbar-bottom-gradient"
            class="pnd-gradient-bottom"
            v-if="
              ((specialSelected ? (hasSpecialLoaded && !loading) || specialResult?.length > 0 : canSearch())) &&
              specialResultHelp.length == 0
            "
          ></div>

          <div id="help" v-if="specialResultHelp.length > 0 && specialResult.length > 0">
            <CardHeader icon="tips.svg" text="راهنمای نتایج" />
            <div class="content">
              <div class="pnd-row content-row pnd-justify-content-center">
                <Badge
                  v-for="badgeItem in specialResultHelp"
                  :key="badgeItem.color"
                  :color="badgeItem.color"
                  :text="badgeItem.text"
                  circle
                />
              </div>
            </div>
          </div>
          <div
            id="tips"
            v-if="
              (search.length < 2 && !specialAction) ||
              (externalSearch && specialSelected)
            "
          >
            <CardHeader icon="tips.svg" text="ترفندهای جست‌و‌جوی سریع‌تر" />
            <div class="content">
              <div class="pnd-row content-row">
                <div>
                  <span class="focus">1. </span>
                  باز کردن سریع‌تر
                  <span class="focus">منوی جست‌و‌جو</span>
                  با کلید میانبر
                </div>
                <div class="keys">
                  <span>K</span>
                  <span>{{ ctrlSymbol }}</span>
                </div>
              </div>
              <div class="divider"></div>
              <div class="pnd-row content-row">
                <div>
                  <span class="focus">2. </span>
                  ورود سریع به صفحه
                  <span class="focus">جزئیات</span>
                  با
                </div>
                <div class="keys">
                  <span class="text">Tab</span>
                  بر روی نتیجه‌ی
                  <span class="text" style="padding-top: 2px; gap: 4px"
                    >ویژه <i class="fas fa-star"></i
                  ></span>
                  و جست‌و‌جو بر اساس راهنما
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, computed, onUnmounted } from "vue";
import IconSvg from "./IconSvg.vue";
import Badge from "./Badge.vue";
import CardHeader from "./CardHeader.vue";
import EmptyState from "./EmptyState.vue";
import { searchInMenu, highlightText } from "../helpers/handleSearch";
import { getCtrlSymbol } from "../helpers/helperPlatform";
import Loader from "./Loader.vue";
import { normalizeRoute } from "../helpers/helperString";

const props = defineProps({
  open: { type: Boolean, default: false },
  baseUrl: { type: String, default: "" },
  modules: { type: Array, default: [] },
  moduleItems: { type: Array, default: [] },
  menuActionsUrl: { type: String, default: null },
  externalSearch: { type: String, default: "" },
  specialMinChars: { type: Number, default: 2 },
  size: { type: String, required: false },
});

const emit = defineEmits(["update:open", "update:size"]);
const loading = ref(false);
const search = ref(props.externalSearch);
const realSearch = ref("");
const filteredModules = ref([]);
const selectedIndex = ref(-1);
const specialSelected = ref();
const specialAction = ref();
const specialResult = ref([]);
const specialResultHelp = ref([]);
const hasSpecialLoaded = ref(false);
const resultCardContainer = ref(null);
const ctrlSymbol = getCtrlSymbol();
const selectableItemsMap = new Map();
let abortController = null;
let debounceTimer = null;

const setSelectableItemRef = (el, index) => {
  if (el) {
    selectableItemsMap.set(index, el);
  } else {
    selectableItemsMap.delete(index);
  }
};
const allSelectableItems = computed(() => {
  const items = [];
  let currentGlobalIndex = 0;

  filteredModules.value.forEach((module) => {
    items.push({
      type: "module",
      data: module,
      globalIndex: currentGlobalIndex,
    });
    currentGlobalIndex++;

    module.items.forEach((item) => {
      if (!item.lock) {
        items.push({
          type: "item",
          data: item,
          globalIndex: currentGlobalIndex,
        });
        currentGlobalIndex++;
      }
    });
  });
  return items;
});

const isOpen = ref(false);

const updateOpen = (val) => {
  if (!val) {
    selectedIndex.value = -1;
    specialSelected.value = null;
    specialAction.value = null;
    specialResultHelp.value = [];
    specialResult.value = [];
    hasSpecialLoaded.value = false;
  }
  isOpen.value = val;
  emit("update:open", val);
};

const getGlobalIndex = (moduleIndex, itemIndex) => {
  let globalIdx = 0;
  if (!filteredModules.value || filteredModules.value.length === 0) {
    return -1;
  }

  for (let m = 0; m < moduleIndex; m++) {
    if (m >= filteredModules.value.length) {
      break;
    }

    const currentModule = filteredModules.value[m];
    if (currentModule && currentModule.items) {
      globalIdx += 1;
      globalIdx += currentModule.items.filter((i) => !i.lock).length;
    } else {
    }
  }

  if (itemIndex === -1) {
    return globalIdx;
  } else {
    if (moduleIndex >= filteredModules.value.length) {
      return -1;
    }
    const targetModule = filteredModules.value[moduleIndex];
    if (!targetModule || !targetModule.items) {
      return -1;
    }

    globalIdx += 1;
    for (let i = 0; i < itemIndex; i++) {
      if (i >= targetModule.items.length) {
        break;
      }
      if (!targetModule.items[i].lock) {
        globalIdx += 1;
      }
    }
    return globalIdx;
  }
};

const handleKeydown = async (e) => {
  if (e.key === "Tab") {
    e.stopPropagation();
    e.preventDefault();
  }
  if (e.key === "Backspace") {
    if (specialSelected.value && search.value.length == 0) {
      e.preventDefault();
      if (props.externalSearch) {
        return;
      }
      specialSelected.value = null;
      specialAction.value = null;
      search.value = realSearch.value;
      emit("update:size", null);
    } else if (search.value.length == 1) {
      if (specialSelected.value) {
        specialResult.value = [];
        specialResultHelp.value = [];
        hasSpecialLoaded.value = false;
      } else {
        filteredModules.value = [];
      }
    }
  } else if (e.key === "Escape") {
    if (search.value.length == 0) {
      specialSelected.value = null;
      specialResult.value = [];
      specialResultHelp.value = [];
      updateOpen(false);
      selectedIndex.value = -1;
      search.value = "";
    }
    search.value = "";
  } else if (
    isOpen.value &&
    (allSelectableItems.value.length > 0 || specialSelected.value)
  ) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (specialSelected.value) {
        selectedIndex.value =
          (selectedIndex.value + 1) % specialResult.value.length;
      } else {
        selectedIndex.value =
          (selectedIndex.value + 1) % allSelectableItems.value.length;
      }
      scrollToSelectedItem();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (specialSelected.value) {
        selectedIndex.value =
          (selectedIndex.value - 1 + specialResult.value.length) %
          specialResult.value.length;
      } else {
        selectedIndex.value =
          (selectedIndex.value - 1 + allSelectableItems.value.length) %
          allSelectableItems.value.length;
      }
      scrollToSelectedItem();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex.value !== -1) {
        let selectedItemData = null;
        if (specialSelected.value) {
          selectedItemData = specialResult.value[selectedIndex.value];
        } else {
          selectedItemData = allSelectableItems.value[selectedIndex.value];
        }
        if (selectedItemData) {
          const selectedElement = selectableItemsMap.get(
            specialSelected
              ? selectedIndex.value
              : selectedItemData.globalIndex,
          );
          if (selectedElement) {
            selectedElement.click();
            updateOpen(false);
            search.value = "";
            selectedIndex.value = -1;
          }
        }
      }
    } else if (e.key === "Tab") {
      e.stopPropagation();
      e.preventDefault();
      if (selectedIndex.value !== -1) {
        const selectedItemData = allSelectableItems.value[selectedIndex.value];
        if (
          selectedItemData &&
          selectedItemData.data &&
          selectedItemData.data.has_action
        ) {
          specialSelected.value = selectedItemData.data.label;
          realSearch.value = search.value;
          loading.value = true;
          search.value = "";

          emit("update:size", props.size ?? "lg");
          const response = await fetch(
            props.menuActionsUrl + "?id=" + selectedItemData.data.id,
          );
          if (response.ok) {
            specialAction.value = await response.json();
            selectedIndex.value = -1;
          }
          loading.value = false;
        }
      }
    }
  }
};

const createItemUrl = (item) => {
  if (specialAction.value) {
    let schema = specialAction.value.item_url_schema;
    const keys = specialAction.value.item_url_key;
    const keyList = keys.split(",").map((k) => k.trim());

    let url = schema;
    keyList.forEach((key) => {
      url = url.replaceAll(":" + key, item[key] ?? item.id);
    });

    return normalizeRoute(props.baseUrl) + "/" + url;
  }
  return item.lock
    ? "javascript:void(0)"
    : normalizeRoute(props.baseUrl) + "/" + normalizeRoute(item.url);
};

const toggleSearchbar = () => {
  updateOpen(!isOpen.value);
  if (isOpen.value) {
    nextTick(() => {
      const input = document.getElementById("searchInput");
      if (input) input.focus();
      selectedIndex.value = -1;
    });
  }
};

function scrollToSelectedItem() {
  if (selectedIndex.value === -1 || !resultCardContainer.value) return;
  nextTick(() => {
    let selectedItemData;
    if (specialSelected.value) {
      selectedItemData = specialResult.value[selectedIndex.value];
    } else {
      selectedItemData = allSelectableItems.value[selectedIndex.value];
    }
    if (!selectedItemData) return;

    const selectedElement = selectableItemsMap.get(
      specialSelected ? selectedIndex.value : selectedItemData.globalIndex,
    );

    if (!selectedElement) {
      return;
    }

    const container = resultCardContainer.value;
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

onMounted(() => {
  watch(
    () => props.open,
    (val) => {
      isOpen.value = val;
      if (isOpen.value) {
        selectedIndex.value = -1;
        specialSelected.value = null;
        specialAction.value = null;
        specialResult.value = [];
        specialResultHelp.value = [];
        hasSpecialLoaded.value = false;
        document.addEventListener("keydown", handleKeydown);
        setTimeout(() => {
          const input = document.getElementById("searchInput");
          if (input) input.focus();
        }, 100);
      }
    },
    { immediate: true },
  );
});

const handleScrollText = () => {
  setTimeout(() => {
    const searchResultItems = document.querySelectorAll(
      ".result-card-content .pnd-items",
    );

    searchResultItems.forEach((item) => {
      const container = item.querySelector(".pnd-special-search-item");
      const scrollText = item.querySelector(".pnd-special-search-text");
      if (!scrollText || !container) return;

      item._scrollTimer = null;

      item.addEventListener("mouseenter", () => {
        if (item._scrollTimer) {
          clearTimeout(item._scrollTimer);
          item._scrollTimer = null;
        }

        const itemWidth = container.offsetWidth;
        const childWidth = scrollText.offsetWidth;
        let diff = childWidth - itemWidth;

        if (diff > -5) {
          diff = diff + 20;
          let duration = (diff * 1.2) / 120;

          scrollText.style.setProperty("--scroll-dist", diff + "px");
          scrollText.style.setProperty("--scroll-duration", duration + "s");

          scrollText.classList.add("scrollable");
          scrollText.classList.add("pnd-inline-block");

          requestAnimationFrame(() => {
            scrollText.classList.add("scrolling");
          });
        }
      });

      item.addEventListener("mouseleave", () => {
        scrollText.classList.remove("scrolling");

        const itemWidth = container.offsetWidth;
        const childWidth = scrollText.offsetWidth;
        let diff = childWidth - itemWidth;
        let duration = (diff * 1.5) / 120;

        item._scrollTimer = setTimeout(() => {
          if (!item.matches(":hover")) {
            scrollText.classList.remove("scrollable");
            scrollText.classList.remove("pnd-inline-block");
          }
          item._scrollTimer = null;
        }, duration * 1065);
      });
    });
  }, 200);
};
const canSearch = () => {
  return (
    search.value.length >= (specialSelected.value ? props.specialMinChars : 2)
  );
};

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

watch(
  search,
  (newVal) => {
    selectableItemsMap.clear();

    if (newVal.length >= props.specialMinChars) {
      if (specialSelected.value) {
        if (abortController) {
          abortController.abort("request canceled");
          abortController = null;
        }
        clearTimeout(debounceTimer);
        loading.value = true;
        debounceTimer = setTimeout(async () => {
          let fullUrl =
            props.baseUrl +
            "/" +
            specialAction.value.api_schema.replace(
              ":" + specialAction.value.api_key,
              search.value,
            );

          abortController = new AbortController();

          try {
            const response = await fetch(fullUrl, {
              signal: abortController.signal,
            });

            if (response.ok) {
              const data = await response.json();
              if (data) {
                specialResult.value = Array.isArray(data) ? data : (data.results || []);
                specialResultHelp.value = Array.isArray(data) ? [] : (data.statuses ?? []);
              } else {
                specialResult.value = [];
                specialResultHelp.value = [];
              }
              hasSpecialLoaded.value = true;
              selectedIndex.value = 0;
              handleScrollText();
            }
          } catch (e) {
          } finally {
            loading.value = false;
          }
        }, 400);
      } else {
        filteredModules.value = searchInMenu(
          props.modules,
          props.moduleItems,
          newVal,
        );

        for (let i = 0; i < filteredModules.value.length; i++) {
          filteredModules.value[i].items = filteredModules.value[i].items.sort(
            (item1, item2) => {
              return item2.has_action && !item1.has_action ? 1 : -1;
            },
          );
        }
        selectedIndex.value = -1;

        nextTick(() => {
          if (allSelectableItems.value.length > 0) {
            selectedIndex.value = 0;
            let childIndex = -1;

            for (let i = 0; i < filteredModules.value.length; i++) {
              childIndex += 1;
              if (props.externalSearch) {
                let found = false;
                for (
                  let j = 0;
                  j < filteredModules.value[i].items?.length ?? 0;
                  j++
                ) {
                  childIndex += 1;
                  if (
                    filteredModules.value[i].items[j].label ==
                    props.externalSearch
                  ) {
                    found = true;
                    break;
                  }
                }
                if (found) {
                  break;
                }
              } else if (filteredModules.value[i].items?.length > 0) {
                childIndex += 1;
                break;
              }
            }

            selectedIndex.value = childIndex;
            scrollToSelectedItem();
          }
        });
      }
    } else if (specialSelected.value) {
      // Search text is below minimum chars - cancel pending requests but keep existing results
      if (abortController) {
        abortController.abort("request canceled");
        abortController = null;
      }
      clearTimeout(debounceTimer);
      loading.value = false;
    }
  },
  { immediate: true },
);
watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      toggleSearchbar();
      if (props.externalSearch) {
        search.value = props.externalSearch;
        specialSelected.value = true;
        emit("update:size", props.size ?? "lg");
        setTimeout(() => {
          const event = new KeyboardEvent("keydown", {
            key: "Tab",
            code: "Tab",
            keyCode: 9,
            which: 9,
            bubbles: true,
          });

          document.dispatchEvent(event);
        }, 100); // 100ms delay
      }
    } else {
      emit("update:size", null);
      search.value = "";
      selectedIndex.value = -1;
      selectableItemsMap.clear();
    }
  },
);
</script>

<style scoped>
/* Animations  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
