<template>
  <aside
    :class="[
      'h-full bg-surface-100 flex flex-col justify-between select-none font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu z-30 overflow-hidden relative',
      'lg:relative lg:shrink-0 lg:z-20',
      'max-lg:fixed max-lg:right-0 max-lg:top-17 max-lg:h-[calc(100dvh-68px)] max-lg:pb-[80px]',
      layoutStore.isSidebarCollapsed
        ? 'lg:w-[68px] lg:max-w-[68px] lg:opacity-100 lg:py-3 lg:px-3 max-lg:w-0 max-lg:opacity-0 max-lg:p-0 max-lg:pointer-events-none'
        : 'w-[248px] max-w-[248px] opacity-100 pt-3 px-3 lg:pb-3',
    ]"
    dir="rtl"
  >
    <!-- Scrollable nav zone with top/bottom blur overlay -->
    <div class="relative flex-1 min-h-0 flex flex-col">
      <!-- Top blur/fade overlay -->
      <Transition name="sidebar-fade">
        <div
          v-if="showTopFade"
          class="pointer-events-none absolute inset-x-0 top-0 z-10"
          aria-hidden="true"
        >
          <div
            class="h-10 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]"
          />
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-b from-surface-100 via-surface-100/70 to-transparent"
          />
        </div>
      </Transition>

      <div
        ref="navScrollRef"
        dir="ltr"
        class="sidebar-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain"
        @scroll="updateScrollState"
      >
        <div dir="rtl" class="flex flex-col gap-5 h-auto min-h-full px-0 py-0 pb-2">
          <!-- Hesabro Brand Header Block -->
          <div class="hidden lg:flex items-center justify-between transition-all duration-300">
            <div class="flex items-center gap-3 w-full">
              <!-- Brand Logo Icon Button with Radial Gradient -->
              <div
                class="w-11 h-11 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 shadow-2xs"
                style="
                  background-image: radial-gradient(
                    ellipse at 50% 100%,
                    rgba(255, 255, 255, 1) 0%,
                    rgba(255, 255, 255, 0) 100%
                  );
                "
              >
                <AppLogo class="w-7 h-7 text-primary-100" />
              </div>

              <!-- Expanded Brand Text -->
              <div v-if="!layoutStore.isSidebarCollapsed" class="flex flex-col text-right truncate">
                <h1 class="text-base font-black text-primary-100 font-dots-1 leading-5">
                  حسابرو وان
                </h1>
                <p class="text-2xs font-semibold text-primary-60 font-dots-1 leading-3.5">
                  مدیریت ارشد پلتفرم
                </p>
              </div>
            </div>
          </div>

          <!-- Main Navigation Items using SidebarItem -->
          <nav class="flex flex-col gap-1.5">
            <SidebarItem
              v-for="item in navItems"
              :key="item.id"
              :title="item.label"
              :icon="item.icon"
              type="main"
              level="one"
              :state="activeTab === item.id ? 'selected' : 'enabled'"
              :expanded="!layoutStore.isSidebarCollapsed"
              :show-badge="item.badge !== undefined"
              :badge-text="String(item.badge || '')"
              @click="$emit('update:activeTab', item.id)"
            />
          </nav>
        </div>
      </div>

      <!-- Bottom blur/fade overlay -->
      <Transition name="sidebar-fade">
        <div
          v-if="showBottomFade"
          class="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          aria-hidden="true"
        >
          <div
            class="h-10 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_15%,transparent_95%)]"
          />
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-t from-surface-100 via-surface-100/70 to-transparent"
          />
        </div>
      </Transition>
    </div>

    <!-- Bottom Role Switcher & Environment Pill -->
    <div
      v-if="!layoutStore.isSidebarCollapsed"
      class="mt-3 p-3 bg-white-80 border border-primary-8 rounded-2xl flex flex-col gap-2 shrink-0 select-none shadow-2xs"
    >
      <div class="flex items-center justify-between text-2xs">
        <span class="text-primary-60 font-medium">نقش فعلی:</span>
        <span class="font-mono font-bold text-primary-100">{{ currentRole }}</span>
      </div>
      <div class="grid grid-cols-3 gap-1">
        <button
          type="button"
          class="py-1 px-1 text-center rounded-lg text-2xs font-medium transition-all cursor-pointer border"
          :class="currentRole === 'SUPER_ADMIN' ? 'bg-primary-100 text-white-100 border-primary-100 font-bold' : 'bg-white-100 border-primary-8 text-primary-60 hover:bg-primary-6'"
          @click="$emit('changeRole', 'SUPER_ADMIN')"
        >
          ارشد
        </button>
        <button
          type="button"
          class="py-1 px-1 text-center rounded-lg text-2xs font-medium transition-all cursor-pointer border"
          :class="currentRole === 'SUPPORT_AGENT' ? 'bg-primary-100 text-white-100 border-primary-100 font-bold' : 'bg-white-100 border-primary-8 text-primary-60 hover:bg-primary-6'"
          @click="$emit('changeRole', 'SUPPORT_AGENT')"
        >
          پشتیبان
        </button>
        <button
          type="button"
          class="py-1 px-1 text-center rounded-lg text-2xs font-medium transition-all cursor-pointer border"
          :class="currentRole === 'SALES_MANAGER' ? 'bg-primary-100 text-white-100 border-primary-100 font-bold' : 'bg-white-100 border-primary-8 text-primary-60 hover:bg-primary-6'"
          @click="$emit('changeRole', 'SALES_MANAGER')"
        >
          فروش
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout';
import AppLogo from '@/components/layout/AppLogo.vue';
import SidebarItem from '@/components/ui/SidebarItem.vue';
import type { AdminRole } from '@/types/admin';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number | string;
}

defineProps<{
  activeTab: string;
  currentRole: AdminRole;
  navItems: NavItem[];
}>();

defineEmits<{
  (e: 'update:activeTab', id: string): void;
  (e: 'changeRole', role: AdminRole): void;
}>();

const layoutStore = useLayoutStore();
const navScrollRef = ref<HTMLElement | null>(null);
const showTopFade = ref(false);
const showBottomFade = ref(false);

function updateScrollState() {
  if (!navScrollRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = navScrollRef.value;
  showTopFade.value = scrollTop > 8;
  showBottomFade.value = scrollHeight - (scrollTop + clientHeight) > 8;
}
</script>

<style scoped>
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(25, 91, 105, 0.2) transparent;
}
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(25, 91, 105, 0.2);
  border-radius: 4px;
}
</style>
