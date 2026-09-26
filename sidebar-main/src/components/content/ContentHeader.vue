<template>
  <div class="pnd-row pnd-justify-between" style="gap: 12px">
    <Breadcrumb></Breadcrumb>
    <div
      class="pnd-row pnd-justify-content-start pnd-align-items-center pnd-action-buttons"
      style="gap: 6px"
    >
      <!-- ! Page Actions -->
      <template v-if="!isMobile">
        <template
          v-for="(action, index) in appStore.pageActions"
          :key="'page-action-' + index"
        >
          <!-- ! Dropdown action (has children) -->
          <div
            v-if="action.children && action.children.length > 0"
            class="pnd-tooltip"
            :data-tooltip="
              action.icon && action.icon.includes('fa-filter') && isFiltered
                ? 'جست‌وجو (فیلتر شده)'
                : action.tooltip
            "
          >
            <PMenu
              :items="buildMenuItems(action.children)"
              v-model="pageActionMenuOpen[index]"
            >
              <template #trigger>
                <PButton
                  :disabled="
                    action.disabled === 'selection'
                      ? !appStore.anyRowSelected
                      : action.disabled
                  "
                  :fill="action.outline === false"
                  :outline="action.outline !== false"
                  :type="
                    action.icon &&
                    (action.icon.includes('filter') ||
                      action.icon.includes('fa-filter') ||
                      action.icon.includes('magnifer')) &&
                    isFiltered
                      ? 'info'
                      : action.btnType || 'white'
                  "
                  :style="{
                    padding: '12px 0',
                    width: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                  }"
                  v-bind="action.attrs || {}"
                >
                  <template #start>
                    <span
                      v-if="
                        action.icon &&
                        (action.icon.includes('<svg') ||
                          action.icon.includes('<span'))
                      "
                      v-html="action.icon"
                    ></span>
                    <i v-else :class="action.icon"></i>
                  </template>
                </PButton>
              </template>
            </PMenu>
          </div>
          <!-- Simple action button -->
          <div
            v-else
            class="pnd-tooltip"
            :data-tooltip="
              action.icon &&
              (action.icon.includes('filter') ||
                action.icon.includes('fa-filter') ||
                action.icon.includes('magnifer')) &&
              isFiltered
                ? 'جست‌وجو (فیلتر شده)'
                : action.tooltip
            "
          >
            <PButton
              :disabled="
                action.disabled === 'selection'
                  ? !appStore.anyRowSelected
                  : action.disabled
              "
              :fill="action.outline === false"
              :outline="action.outline !== false"
              :type="
                action.icon &&
                (action.icon.includes('filter') ||
                  action.icon.includes('fa-filter') ||
                  action.icon.includes('magnifer')) &&
                isFiltered
                  ? 'info'
                  : action.btnType || 'white'
              "
              :style="{
                padding: '12px 0',
                width: '40px',
                display: 'flex',
                justifyContent: 'center',
              }"
              v-bind="action.attrs || {}"
              @click="handlePageAction(action)"
            >
              <template #start>
                <span
                  v-if="
                    action.icon &&
                    (action.icon.includes('<svg') ||
                      action.icon.includes('<span'))
                  "
                  v-html="action.icon"
                ></span>
                <i v-else :class="action.icon"></i>
              </template>
            </PButton>
          </div>
        </template>

        <!-- ! Divider between page actions and fixed buttons -->
        <div
          v-if="appStore.pageActions && appStore.pageActions.length > 0"
          class="pnd-header-divider"
        ></div>

        <!-- ! Special Search -->
        <div class="pnd-tooltip" data-tooltip="جست‌وجوهای ویژه">
          <PMenu
            v-if="allSearchItems && allSearchItems.length > 0"
            :items="allSearchItems"
            v-model="isOpen"
          >
            <template #trigger="{ isOpen }">
              <PButton
                outline
                type="warning"
                :style="{
                  padding: '12px 0',
                  width: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                }"
              >
                <template #start>
                  <PSvg :svg="starBoldDuotone" />
                </template>
              </PButton>
            </template>
          </PMenu>
        </div>
      </template>

      <!-- ! More Options -->
      <div class="pnd-tooltip" data-tooltip="گزینه‌های بیشتر">
        <PMenu :items="moreMenuItems" v-model="isMoreMenuOpen">
          <template #trigger>
            <PButton
              outline
              type="white"
              :style="{
                padding: '12px 0',
                width: '40px',
                display: 'flex',
                justifyContent: 'center',
              }"
            >
              <template #start>
                <PSvg :svg="menuDots2BoldDuotone" />
              </template>
            </PButton>
          </template>
        </PMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./Breadcrumb.vue";
import {
  PButton,
  PMenu,
  PSvg,
  IPMenuItemProps,
  MenuItem,
} from "pandora-design-system";
import { useAppStore } from "../../app/store";
import starBoldDuotone from "pandora-icons/starBoldDuotone";
import starOutline from "pandora-icons/starOutline";
import disketteOutline from "pandora-icons/disketteOutline";
import filterOutline from "pandora-icons/filterOutline";
import magniferOutline from "pandora-icons/magniferOutline";
import addCircleOutline from "pandora-icons/addCircleOutline";
import tuning3Outline from "pandora-icons/tuning3Outline";
import menuDots2BoldDuotone from "pandora-icons/menuDots2BoldDuotone";
import bookOutline from "pandora-icons/bookOutline";
import shieldCheckOutline from "pandora-icons/shieldCheckOutline";
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  computed,
  reactive,
  nextTick,
} from "vue";
import { handleTooltip } from "../../helpers/handleTooltip";
import { useWindowSize } from "@vueuse/core";

const appStore = useAppStore();
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 1280);
const isOpen = ref(false);
const isMoreMenuOpen = ref(false);
const isFiltered = ref(false);
const pageActionMenuOpen = reactive<Record<number, boolean>>({});
const allSearchItems = ref<IPMenuItemProps[]>([]);
const hasPatternSearch = ref(false);
const hasPatternSave = ref(false);

watch(isMoreMenuOpen, (newVal) => {
  if (newVal) {
    hasPatternSearch.value = !!document.querySelector(
      ".ag-pattern-search-trigger:not(.ag-pattern-search-save)",
    );
    const saveBtn = document.querySelector(
      ".ag-pattern-search-save",
    ) as HTMLElement;
    const saveWrap = saveBtn?.closest(".pnd-tooltip") as HTMLElement;

    // Check inline style instead of computed style, because stylesheet overrides it with display: none !important
    hasPatternSave.value =
      !!saveBtn && !!saveWrap && saveWrap.style.display !== "none";
  }
});
const allModuleSearches = ref();
const permissionsMenuItems = ref<MenuItem[]>([]);
const permissions = ref([]);

const handlePageAction = (action: any, isMenuItem: boolean = false) => {
  window.dispatchEvent(
    new CustomEvent("pageActionTriggered", {
      detail: { action },
    }),
  );

  if (
    action.url &&
    action.url !== "javascript:void(0)" &&
    action.url !== "javascript:void()" &&
    action.url !== "javascript:void(0);" &&
    action.url !== "javascript:void();" &&
    !action.url.startsWith("javascript:void")
  ) {
    window.location.href = action.url;
    return;
  }

  if (action.attrs) {
    // Only perform programmatic click if it's NOT a standard Bootstrap toggle
    // OR if it's a menu item (which doesn't have its own DOM element for Bootstrap to bind to).
    // Top-level PButtons already have Bootstrap bindings, so we avoid double-triggering them.
    const isBootstrapToggle =
      action.attrs["data-toggle"] === "collapse" ||
      action.attrs["data-toggle"] === "modal";

    if (isMenuItem || !isBootstrapToggle) {
      const a = document.createElement("a");
      a.href = action.url || "javascript:void(0)";
      const attrs = action.attrs as Record<string, string>;
      for (const key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          a.setAttribute(key, attrs[key]);
        }
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
};

const buildMenuItems = (children: any[]): MenuItem[] => {
  return children.map((child) => {
    if (child.separator) {
      return { separator: true } as any;
    }
    const menuItem: MenuItem = {
      title: child.label,
      type: child.type,
      startIcon:
        typeof child.icon === "string" && child.icon.includes("fa-")
          ? `<i class="${child.icon}"></i>`
          : child.icon,
      disabled:
        child.disabled === "selection"
          ? !appStore.anyRowSelected
          : child.disabled === true,
    };
    if (child.children && child.children.length > 0) {
      menuItem.children = buildMenuItems(child.children);
    } else {
      menuItem.action = () => {
        handlePageAction(child, true);
      };
    }
    return menuItem;
  });
};

const moreMenuItems = computed(() => {
  const items: MenuItem[] = [];

  if (isMobile.value) {
    let addedAny = false;

    // 1. Add Pattern Search & Save (Funnel and print/save buttons) - AT THE VERY TOP!
    if (hasPatternSave.value) {
      items.push({
        title: "ذخیره جست‌وجوی فعلی",
        startIcon: disketteOutline,
        action: () => {
          const btn = document.querySelector(
            ".ag-pattern-search-save",
          ) as HTMLElement;
          if (btn) btn.click();
          isMoreMenuOpen.value = false;
        },
      });
      addedAny = true;
    }

    if (hasPatternSearch.value) {
      items.push({
        title: "جست‌وجوهای ذخیره‌شده",
        startIcon: filterOutline,
        action: () => {
          const btn = document.querySelector(
            ".ag-pattern-search-trigger:not(.ag-pattern-search-save)",
          ) as HTMLElement;
          if (btn) btn.click();
          isMoreMenuOpen.value = false;
        },
      });
      addedAny = true;
    }

    // 2. Add Page Actions
    if (appStore.pageActions && appStore.pageActions.length > 0) {
      appStore.pageActions.forEach((action: any, index: number) => {
        let actionIcon = action.icon;
        if (typeof actionIcon === "string") {
          const lowerIcon = actionIcon.toLowerCase();
          if (lowerIcon.includes("plus") || lowerIcon.includes("fa-plus")) {
            actionIcon = addCircleOutline;
          } else if (
            lowerIcon.includes("tuning") ||
            lowerIcon.includes("fa-cog") ||
            lowerIcon.includes("fa-cogs") ||
            lowerIcon.includes("fa-sliders")
          ) {
            actionIcon = tuning3Outline;
          } else if (
            lowerIcon.includes("magnifer") ||
            lowerIcon.includes("search") ||
            lowerIcon.includes("fa-search") ||
            lowerIcon.includes("fa-magnifying-glass")
          ) {
            actionIcon = magniferOutline;
          } else if (actionIcon.includes("fa-")) {
            actionIcon = `<i class="${actionIcon}"></i>`;
          }
        }

        if (action.children && action.children.length > 0) {
          items.push({
            title: action.tooltip || action.label,
            type: action.type,
            startIcon: actionIcon,
            disabled:
              action.disabled === "selection"
                ? !appStore.anyRowSelected
                : action.disabled === true,
            children: buildMenuItems(action.children),
          });
        } else {
          items.push({
            title: action.tooltip || action.label,
            type: action.type,
            startIcon: actionIcon,
            disabled:
              action.disabled === "selection"
                ? !appStore.anyRowSelected
                : action.disabled === true,
            action: () => {
              handlePageAction(action, true);
              isMoreMenuOpen.value = false;
            },
          });
        }
      });
      addedAny = true;
    }

    // 3. Add Special Search (Star button)
    if (allSearchItems.value && allSearchItems.value.length > 0) {
      if (addedAny) {
        items.push({ separator: true } as any);
      }
      items.push({
        title: "جست‌وجوهای ویژه",
        startIcon: starOutline,
        children: allSearchItems.value.map((item) => {
          if (item.separator) {
            return { separator: true } as any;
          }
          return {
            title: item.title,
            action: () => {
              if (item.action) {
                item.action();
              }
              isMoreMenuOpen.value = false;
            },
          };
        }),
      });
      addedAny = true;
    }

    // Add separator between consolidated items and normal items (Help / Permissions)
    if (addedAny) {
      items.push({ separator: true } as any);
    }
  }

  // 3. Normal More Options (Help & Permissions)
  items.push({
    title: "راهنمایی",
    startIcon: bookOutline,
    action: () => {
      appStore.openFaqModal();
      isMoreMenuOpen.value = false;
    },
  });

  if (permissionsMenuItems.value.length > 0) {
    items.push({
      title: "دسترسی‌ها",
      startIcon: shieldCheckOutline,
      children: permissionsMenuItems.value,
    });
  }

  return items;
});

watch(isFiltered, () => {
  nextTick(() => {
    handleTooltip();
  });
});

watch(
  () => appStore.pageActions,
  () => {
    nextTick(() => {
      handleTooltip();
    });
  },
  { deep: true, immediate: true },
);

watch(
  () => appStore.activeModuleKey,
  (key) => {
    if (
      key != null &&
      allModuleSearches.value &&
      Object.prototype.hasOwnProperty.call(allModuleSearches.value, key)
    ) {
      let moduleSearches = allModuleSearches.value[key];

      if (moduleSearches.length > 0) {
        allSearchItems.value.push({ separator: true });
      }
      moduleSearches.forEach((item) => {
        allSearchItems.value.push({
          title: item.title,
          action: () => {
            const event = new CustomEvent("openSearchbar", {
              detail: {
                search: item.searchTitle,
                size: item?.size ?? "md",
                minSearchCharacters: item.minSearchCharacters ?? 2,
              },
            });

            window.dispatchEvent(event);
            isOpen.value = false;
          },
        });
      });
    }
  },
);

const transformPermissionItems = (items: any[]): MenuItem[] => {
  return items.map((item) => {
    const menuItem: MenuItem = {
      title: item.title,
    };

    if (item.children && item.children.length > 0) {
      menuItem.children = transformPermissionItems(item.children);
    } else {
      menuItem.action = () => {
        const a = document.createElement("a");
        if (item.props && typeof item.props === "object") {
          for (const key in item.props) {
            if (Object.prototype.hasOwnProperty.call(item.props, key)) {
              a.setAttribute(key, item.props[key]);
            }
          }
        }
        a.href ||= "javascript:void(0)";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        isMoreMenuOpen.value = false;
      };
    }
    return menuItem;
  });
};

const checkFilters = () => {
  const detect = () => {
    const params = new URLSearchParams(window.location.search);
    let active = false;
    params.forEach((value, key) => {
      const trimmedValue = typeof value === "string" ? value.trim() : value;
      if (
        !active &&
        key.toLowerCase().indexOf("search") !== -1 &&
        trimmedValue &&
        trimmedValue !== "0" &&
        trimmedValue !== "null" &&
        trimmedValue !== "undefined"
      ) {
        active = true;
      }
    });
    isFiltered.value = active;
  };

  detect();
  // Multiple checks to handle URL stabilization
  setTimeout(detect, 100);
  setTimeout(detect, 500);
  setTimeout(detect, 1000);
};

const handleSelectionChange = (event: any) => {
  appStore.setAnyRowSelected(event.detail.selectedCount > 0);
};

onBeforeUnmount(() => {
  if (typeof (window as any).$ !== "undefined") {
    (window as any).$(document).off("pjax:end pjax:complete", checkFilters);
  }
  window.removeEventListener("popstate", checkFilters);
  window.removeEventListener("refreshFilters", checkFilters);
  window.removeEventListener("agGridSelectionChanged", handleSelectionChange);
});

onMounted(() => {
  checkFilters();
  if (typeof (window as any).$ !== "undefined") {
    (window as any).$(document).on("pjax:end pjax:complete", checkFilters);
  }
  window.addEventListener("popstate", checkFilters);
  window.addEventListener("refreshFilters", checkFilters);
  window.addEventListener("agGridSelectionChanged", handleSelectionChange);

  allModuleSearches.value =
    appStore.getConfig.modulesFrequentlyUsedSearch ?? [];

  let fixedFrequentlyUsedSearch =
    appStore.getConfig.fixedFrequentlyUsedSearch ?? [];

  fixedFrequentlyUsedSearch.forEach((item) => {
    allSearchItems.value.push({
      title: item.title,
      action: () => {
        const event = new CustomEvent("openSearchbar", {
          detail: {
            search: item.searchTitle,
            size: item?.size,
            minSearchCharacters: item.minSearchCharacters ?? 2,
          },
        });

        window.dispatchEvent(event);
        isOpen.value = false;
      },
    });
  });
  permissions.value = appStore.getConfig.permissions;
  permissionsMenuItems.value = transformPermissionItems(permissions.value);
});
</script>

<style scoped>
.pnd-header-divider {
  width: 1px;
  height: 20px;
  background-color: var(--primary-12);
  margin: 0 8px;
}
@media only screen and (max-width: 768px) {
  .pnd-action-buttons {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
  }
}
.pnd-action-buttons :deep(svg),
.pnd-action-buttons :deep(span) {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pnd-action-buttons :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
