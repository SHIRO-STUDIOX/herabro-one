<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    <!-- Header Toolbar -->
    <div class="h-14 px-4 sm:px-5 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0">
          <Icon icon="solar:users-group-rounded-bold-duotone" class="w-4.5 h-4.5 shrink-0" />
        </div>
        <h3 class="text-xs sm:text-sm font-extrabold text-primary-100">فهرست اعضای تیم مدیریت و کارشناسان پلتفرم</h3>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton
          v-if="canManageStaff"
          size="sm"
          type="primary"
          style-type="fill"
          start-icon="solar:user-plus-bold-duotone"
          class="!rounded-full text-xs font-semibold"
          @click="$emit('createStaff')"
        >
          افزودن مدیر جدید
        </BaseButton>

        <BaseTooltip text="به‌روزرسانی">
          <button
            type="button"
            class="w-9 h-9 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none text-primary-100"
            style="
              background-image: radial-gradient(
                ellipse at 50% 100%,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            "
            @click="$emit('refresh')"
          >
            <Icon icon="solar:restart-bold" class="w-4 h-4" :class="loading ? 'animate-spin' : ''" />
          </button>
        </BaseTooltip>
      </div>
    </div>

    <!-- Table Container (Hesabro Standard) -->
    <div class="w-full bg-white-100 rounded-2xl overflow-hidden border border-primary-6 flex flex-col relative transition-all duration-200 shadow-xs">
      <CardLoadingOverlay v-if="loading" />

      <!-- Top Table Header Row -->
      <div class="w-full h-12 bg-white-100 border-b border-primary-6 flex items-center shrink-0">
        <div class="w-10 self-stretch bg-primary-1/60 border-l border-primary-6 flex items-center justify-center shrink-0 text-xs font-bold text-primary-60 font-dots-1 select-none">
          #
        </div>

        <div class="flex-1 min-w-[180px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            نام و نام خانوادگی / نام کاربری
          </span>
        </div>

        <div class="w-40 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            شماره همراه ورود
          </span>
        </div>

        <div class="w-44 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            نقش و سطح دسترسی
          </span>
        </div>

        <div class="w-28 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            وضعیت دسترسی
          </span>
        </div>

        <div class="w-36 pl-3 pr-3 flex items-center justify-end text-left shrink-0">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-left">
            تاریخ عضویت
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && staffList.length === 0" class="w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60">
        <div class="w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80">
          <Icon icon="solar:user-block-linear" class="w-6 h-6" />
        </div>
        <span class="text-xs font-bold font-dots-1">هیچ مدیری تعریف نشده است</span>
      </div>

      <!-- Table Rows Container -->
      <div v-else class="w-full flex flex-col divide-y divide-primary-6 overflow-x-auto">
        <div
          v-for="(staff, idx) in staffList"
          :key="staff.id"
          class="w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none"
        >
          <!-- Index -->
          <div class="w-10 self-stretch bg-primary-1/50 border-l border-primary-6 flex items-center justify-center shrink-0">
            <span class="text-xs font-bold text-primary-60 font-dots-1 select-none">
              {{ toPersianNumber(idx + 1) }}
            </span>
          </div>

          <!-- Name & Username -->
          <div class="flex-1 min-w-[180px] pr-3 flex items-center gap-2 overflow-hidden">
            <div class="w-7 h-7 rounded-full bg-secondary-6 text-secondary-100 flex items-center justify-center shrink-0">
              <Icon icon="solar:user-bold" class="w-4 h-4" />
            </div>
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-xs sm:text-sm font-extrabold font-dots-1 text-primary-100 group-hover:text-secondary-100 transition-colors truncate">
                {{ staff.first_name || staff.last_name ? `${staff.first_name || ''} ${staff.last_name || ''}` : staff.username }}
              </span>
              <span class="text-2xs font-mono text-primary-60 truncate">
                @{{ staff.username }}
              </span>
            </div>
          </div>

          <!-- Mobile -->
          <div class="w-40 pr-3 flex items-center justify-start text-xs font-mono font-bold text-primary-80">
            {{ toPersianNumber(staff.mobile) }}
          </div>

          <!-- Role Badge -->
          <div class="w-44 pr-3 flex items-center justify-center">
            <BaseBadge :type="getRoleBadgeType(staff.role)" size="2xs" style-type="soft">
              {{ getRoleDisplay(staff.role) }}
            </BaseBadge>
          </div>

          <!-- Active Status Badge -->
          <div class="w-28 pr-3 flex items-center justify-center">
            <BaseBadge :type="staff.is_active ? 'success' : 'error'" size="2xs" style-type="soft">
              {{ staff.is_active ? 'فعال' : 'مسدود' }}
            </BaseBadge>
          </div>

          <!-- Created Date -->
          <div class="w-36 pl-3 pr-3 flex items-center justify-end text-xs font-mono text-primary-60">
            {{ staff.date_joined ? new Date(staff.date_joined).toLocaleDateString('fa-IR') : '—' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
import type { AdminProfile, AdminRole } from '@/types/admin';

const props = defineProps<{
  staffList: AdminProfile[];
  loading?: boolean;
  currentRole: AdminRole;
}>();

defineEmits<{
  (e: 'createStaff'): void;
  (e: 'refresh'): void;
}>();

const canManageStaff = computed(() => props.currentRole === 'SUPER_ADMIN');

function getRoleDisplay(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'راهبر ارشد سیستم';
    case 'SUPPORT_AGENT':
      return 'کارشناس پشتیبانی';
    case 'SALES_MANAGER':
      return 'مدیر فروش و افیلیت';
    default:
      return role;
  }
}

function getRoleBadgeType(role: string): 'primary' | 'secondary' | 'warning' | 'info' {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'primary';
    case 'SUPPORT_AGENT':
      return 'secondary';
    case 'SALES_MANAGER':
      return 'warning';
    default:
      return 'info';
  }
}
</script>
