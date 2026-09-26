<template>
  <ul ref="target" class="corner-button" style="padding: 0 !important">
    <li
      class="drop-down"
      @mouseleave="checkLeave"
      @mouseenter="openProfileMenu"
      @click="toggleProfileMenu"
      style="
        position: relative;
        padding: 12px;
        cursor: pointer;
        max-height: 44px;
      "
    >
      <a
        id="profileDropdown"
        class="pnd-d-flex pnd-align-items-center"
        style="flex-wrap: nowrap; white-space: nowrap"
      >
        <IconSvg
          class="text-primary-60 svg pnd-d-flex"
          name="user.svg"
        ></IconSvg>

        <span
          class="pnd-hidden-tablet button-text"
          style="margin: 0 6px 0 12px; white-space: nowrap"
          >{{ displayName }}
        </span>
        <i
          class="pnd-hidden-tablet fas fa-chevron-down toggle-icon"
          :class="{ 'rotate-180': hover }"
        ></i>
      </a>
      <div v-if="hover" class="profile-card" style="position: absolute">
        <div class="profile-card-content" dir="rtl">
          <ComplexCardHeader
            :title="getConfig.fullName"
            :subtitle="getConfig.mobile"
            startIcon="user.svg"
          />
          <div class="divider" style="margin: 12px 0px"></div>
          <div class="pnd-d-flex pnd-flex-column" style="gap: 4px !important">
            <LinkItem
              v-for="(item, index) in getConfig.profileMenuItems"
              :key="index"
              v-bind="
                item.content
                  ? { content: item.content }
                  : { startIcon: item.icon, text: item.text, url: item.url }
              "
            />
          </div>
          <div class="divider" style="margin: 12px 0px"></div>
          <div id="logout-container">
            <a
              :href="getConfig.logoutUrl"
              data-method="post"
              id="logout"
              class="link-option-text"
              >خروج از حساب کاربری
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useAppStore } from "../app/store";
  import IconSvg from "./IconSvg.vue";
  import ComplexCardHeader from "./ComplexCardHeader.vue";
  import LinkItem from "./LinkItem.vue";
  import { useWindowSize, onClickOutside } from "@vueuse/core";

  const { width } = useWindowSize();
  const { getConfig } = useAppStore();

  const hover = ref(false);
  const isDropdownOpen = ref(false);
  const isProfileMenuOpen = ref(false);
  const target = ref(null);

  onClickOutside(
    target,
    () => {
      setTimeout(() => {
        isProfileMenuOpen.value = false;
        hover.value = false;
      }, 10);
    }
  );

  const displayName = computed(() => {
  return getConfig.lastName || getConfig.fullName; 
});

  function openProfileMenu() {
    if (width.value < 768) return;
    isProfileMenuOpen.value = true;
    hover.value = true;
  }

  function toggleProfileMenu() {
    if (width.value > 768) return;
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
    hover.value = isProfileMenuOpen.value;
  }

  function checkLeave(e) {
    if (width.value < 768) return;
    isProfileMenuOpen.value = false;
    setTimeout(() => {
      if (!isDropdownOpen.value && !isProfileMenuOpen.value) {
        hover.value = false;
      }
    }, 20);
  }
</script>
