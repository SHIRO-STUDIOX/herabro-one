<template>
  <header
    class="w-full h-17 py-3 px-3 lg:px-4 flex items-center justify-between select-none font-sans relative z-20 shrink-0"
    dir="rtl"
  >
    <!-- Right side: Sidebar toggle button & Page Title -->
    <div class="flex items-center gap-3">
      <!-- Desktop Sidebar Toggle Button (Radial Gradient Pill) -->
      <BaseTooltip :text="layoutStore.isSidebarCollapsed ? 'باز کردن منو' : 'جمع کردن منو'">
        <button
          type="button"
          class="w-11 h-11 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group outline-none"
          style="
            background-image: radial-gradient(
              ellipse at 50% 100%,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0) 100%
            );
          "
          @click="layoutStore.toggleSidebar()"
        >
          <Icon
            icon="solar:hamburger-menu-bold-duotone"
            class="w-5 h-5 text-primary-100 opacity-70 group-hover:opacity-100 transition-all"
          />
        </button>
      </BaseTooltip>

      <!-- Page / System Identity -->
      <div class="flex flex-col text-right">
        <div class="flex items-center gap-2">
          <span class="text-sm sm:text-base font-black text-primary-100 font-dots-1 leading-5">
            پنل راهبری و مدیریت ارشد حسابرو وان
          </span>
          <span class="text-2xs font-mono font-bold px-2 py-0.5 rounded-full bg-primary-6 text-primary-100 border border-primary-12">
            Backoffice API :8001
          </span>
        </div>
        <span class="text-2xs text-primary-60 font-dots-1">
          نظارت بر مستأجران، افیلیت، سطوح اشتراک و امنیت هسته
        </span>
      </div>
    </div>

    <!-- Left side: Live API status, Role Badge & User Profile Dropdown -->
    <div class="flex items-center gap-2.5 sm:gap-3">
      <!-- Live API Status Indicator -->
      <div
        class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white-100 shadow-2xs text-2xs font-medium"
        style="
          background-image: radial-gradient(
            ellipse at 50% 100%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
        "
      >
        <span class="w-2 h-2 rounded-full bg-success-100 animate-pulse" />
        <span class="text-primary-80 font-dots-1">سرویس ادمین:</span>
        <span class="font-mono font-bold text-success-100">آنلاین</span>
      </div>

      <!-- Role Badge -->
      <BaseBadge
        :type="roleBadgeType"
        style-type="soft"
        size="sm"
        show-start-icon
        :start-icon="roleIcon"
      >
        {{ roleDisplay }}
      </BaseBadge>

      <!-- User Profile Dropdown / Card -->
      <UserProfileDropdown
        :user-name="admin?.username || 'مدیر سیستم'"
        :phone-number="admin?.mobile || '09120000000'"
        @logout="$emit('logout')"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useLayoutStore } from '@/stores/layout';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import UserProfileDropdown from '@/components/layout/UserProfileDropdown.vue';
import type { AdminProfile, AdminRole } from '@/types/admin';

const props = defineProps<{
  admin?: AdminProfile | null;
  currentRole: AdminRole;
}>();

defineEmits<{
  (e: 'logout'): void;
}>();

const layoutStore = useLayoutStore();

const roleDisplay = computed(() => {
  switch (props.currentRole) {
    case 'SUPER_ADMIN':
      return 'راهبر ارشد';
    case 'SUPPORT_AGENT':
      return 'کارشناس پشتیبانی';
    case 'SALES_MANAGER':
      return 'مدیر فروش و افیلیت';
    default:
      return 'کاربر مدیر';
  }
});

const roleBadgeType = computed<'primary' | 'secondary' | 'warning' | 'info'>(() => {
  switch (props.currentRole) {
    case 'SUPER_ADMIN':
      return 'primary';
    case 'SUPPORT_AGENT':
      return 'secondary';
    case 'SALES_MANAGER':
      return 'warning';
    default:
      return 'info';
  }
});

const roleIcon = computed(() => {
  switch (props.currentRole) {
    case 'SUPER_ADMIN':
      return 'solar:shield-check-bold';
    case 'SUPPORT_AGENT':
      return 'solar:headphones-round-bold';
    case 'SALES_MANAGER':
      return 'solar:chart-square-bold';
    default:
      return 'solar:user-bold';
  }
});
</script>
