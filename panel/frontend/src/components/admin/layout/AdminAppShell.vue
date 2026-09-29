<template>
  <div
    class="w-full h-screen bg-surface-100 flex overflow-hidden font-sans select-none text-right relative"
    dir="rtl"
  >
    <!-- Right Sidebar (Redesigned with Collapsible AppSidebar styling & SidebarItem) -->
    <AdminSidebar
      :active-tab="activeTab"
      :current-role="currentRole"
      :nav-items="navItems"
      @update:active-tab="$emit('update:activeTab', $event)"
      @change-role="$emit('changeRole', $event)"
    />

    <!-- Center Column: Header + Main Frame with Rounded-4xl Container -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
      <!-- Top Header -->
      <AdminHeader
        :admin="admin"
        :current-role="currentRole"
        @logout="$emit('logout')"
      />

      <!-- Impersonation Banner (if active) -->
      <ImpersonationBanner
        v-if="isImpersonating"
        :active="Boolean(isImpersonating)"
        :tenant-title="impersonatedTenantTitle"
        :expires-at="impersonationExpiresAt"
        @exit="$emit('exitImpersonation')"
      />

      <!-- Main Application Shell Frame (rounded-4xl bg-white-60 with progressive blur overlays) -->
      <main
        class="flex-1 min-h-0 bg-white-60 flex flex-col overflow-hidden relative rounded-4xl mb-3 mx-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu shadow-card"
      >
        <!-- Top progressive blur/fade overlay -->
        <div
          v-if="showTopFade"
          class="pointer-events-none absolute inset-x-0 top-0 z-20"
          aria-hidden="true"
        >
          <div
            class="h-10 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]"
          />
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-b from-white-100/80 via-white-100/40 to-transparent"
          />
        </div>

        <!-- Scrollable Main Content -->
        <div
          ref="contentScrollRef"
          class="flex-1 h-full overflow-y-auto p-4 sm:p-6 relative rounded-4xl"
          @scroll="updateScrollState"
        >
          <slot />
        </div>

        <!-- Bottom progressive blur/fade overlay -->
        <div
          v-if="showBottomFade"
          class="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          aria-hidden="true"
        >
          <div
            class="h-12 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_15%,transparent_95%)]"
          />
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-t from-white-100/80 via-white-100/40 to-transparent"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminSidebar from './AdminSidebar.vue';
import AdminHeader from './AdminHeader.vue';
import ImpersonationBanner from './ImpersonationBanner.vue';
import type { AdminProfile, AdminRole } from '@/types/admin';

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
  admin?: AdminProfile | null;
  isImpersonating?: boolean;
  impersonatedTenantTitle?: string;
  impersonationExpiresAt?: string;
}>();

defineEmits<{
  (e: 'update:activeTab', id: string): void;
  (e: 'changeRole', role: AdminRole): void;
  (e: 'exitImpersonation'): void;
  (e: 'logout'): void;
}>();

const contentScrollRef = ref<HTMLElement | null>(null);
const showTopFade = ref(false);
const showBottomFade = ref(false);

function updateScrollState() {
  if (!contentScrollRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = contentScrollRef.value;
  showTopFade.value = scrollTop > 12;
  showBottomFade.value = scrollHeight - (scrollTop + clientHeight) > 12;
}
</script>
