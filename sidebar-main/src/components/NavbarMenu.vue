<template>
  <ul style="padding: 0 !important; margin-left: 6px">
    <li
      class="drop-down"
      :class="mobileMode ? 'mobile' : ''"
      id="menu-button"
      @mouseenter="openMenu"
      @mouseleave="closeMenu"
      @click="toggleMenu"
      :style="[
        { position: 'relative' },
        { 'cursor': getConfig.modules.length > 1 ? 'pointer' : 'default' },
        mobileMode ? {} : { 'padding': '12px' }
      ]"
    >
      <a class="pnd-d-flex pnd-align-items-center" style="gap: 6px" v-if="!mobileMode">
        <span class="button-text" style="color: white">
          {{ activeModule?.label ?? "سایر" }}
        </span>
        <i
          v-if="getConfig.modules && getConfig.modules.length > 1"
          class="fas fa-chevron-down toggle-icon"
          style="color: white"
          :class="{ 'rotate-180': open }"
        ></i>
      </a>
      <a
        v-else
        class="circle-button pnd-solid pnd-border-none bg-secondary-100 text-white-100 pnd-m-0 pnd-d-flex pnd-align-items-center"
      >
        <span class="svg">
          <IconSvg
            v-if="activeModule?.icon?.toString().trim().toLowerCase().endsWith('.svg')"
            class="svg module-icon pnd-d-flex pnd-justify-content-center"
            :name="(width < 768) && open ? 'close.svg': activeModule.icon"
          />

          <IconSvg
            v-else-if="(width < 768) && open"
            class="svg module-icon pnd-d-flex pnd-justify-content-center"
            name="close.svg"
          />

          <span v-else class="svg module-icon" v-html="activeModule?.icon ?? getConfig.modules[0].icon"> </span>
        </span>
      </a>
      <transition :name="width < 768 ? 'navbar-menu-transition' : ''">
        <div class="menu-card-container" v-if="open">
          <div class="menu-card" dir="rtl">
            <ComplexCardHeader
              :title="getConfig.menuCardTitle || getConfig.navbarMenuTitle || 'ابزارها'"
              :subtitle="getConfig.menuCardSubtitle || getConfig.navbarMenuSubtitle || 'کاوش در میان بازارچه‌ای از ابزارها'"
              :startIcon="getConfig.menuCardIcon || 'tools.svg'"
            />
            <div class="divider" style="margin: 12px 0 0 0px"></div>
            <div style="position: relative">
              <div class="pnd-gradient-top"></div>
              <div class="pnd-gradient-bottom"></div>
              <div
                ref="menuContent"
                id="menu-card-content"
                class="hide-scrollbar mirror-gradient"
                style="height: 344px; overflow-y: auto; padding-top: 8px"
              >
                <div
                  v-for="(chunk, i) in chunks"
                  :key="i"
                  class="pnd-row pnd-justify-start"
                  style="
                    gap: 8px !important;
                    min-height: 96px;
                    margin-right: auto;
                    margin-left: auto;
                  "
                  :style="i != chunks.length - 1 ? '' : 'margin-bottom:12px'"
                >
                  <a
                    v-for="(item, j) in chunk"
                    :key="j"
                    class="module-card"
                    :class="{
                      locked: !item.hasAccess,
                      active: item.id === activeModule?.id,
                    }"
                    :href="item.hasAccess ? item.url : 'javascript:void(0)'"
                  >
                    <span v-if="!item.hasAccess" class="lock-icon svg">
                      <IconSvg name="lock.svg" />
                    </span>
                    <div
                      class="pnd-d-flex pnd-flex-column pnd-align-items-center"
                      style="cursor: pointer"
                    >
                      <IconSvg
                        v-if="
                          item?.icon
                            ?.toString()
                            .trim()
                            .toLowerCase()
                            .endsWith('.svg')
                        "
                        class="svg module-icon pnd-d-flex pnd-justify-content-center"
                        :name="item.icon"
                      />
                      <span v-else class="svg module-icon" v-html="item.icon">
                      </span>
                      <span class="module-text">{{ item.label }}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import ComplexCardHeader from "./ComplexCardHeader.vue";
import { useAppStore } from "../app/store";
import IconSvg from "./IconSvg.vue";
import { useModuleHelpers } from "../composables/useModuleHelpers";
const { getConfig } = useAppStore();
const { activeModule } = useModuleHelpers();
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();
const menuContent = ref(null);
const menuButton = ref(null);

const emit = defineEmits(["update:open"]);

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  mobileMode: {
    type: Boolean,
    default: false,
  },
});

const chunks = computed(() => {
  const modules = getConfig.modules || [];
  const result = [];
  for (let i = 0; i < modules.length; i += 3) {
    result.push(modules.slice(i, i + 3));
  }
  return result;
});

const toggleMenu = () => {
  if (width.value < 768) {
    emit("update:open", !props.open);
  }
};

const openMenu = () => {
  if (getConfig.modules.length < 2) return;
  if (width.value > 768) {
    emit("update:open", true);
  }
};

const closeMenu = () => {
  if (getConfig.modules.length < 2) return;
  if (width.value > 768) {
    emit("update:open", false);
  }
};
</script>

<style scoped>
.navbar-menu-transition-enter-active,
.navbar-menu-transition-leave-active {
  transition: all 0.3s ease;
}

.navbar-menu-transition-enter-from,
.navbar-menu-transition-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(24px);
}

.navbar-menu-transition-enter-to,
.navbar-menu-transition-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
