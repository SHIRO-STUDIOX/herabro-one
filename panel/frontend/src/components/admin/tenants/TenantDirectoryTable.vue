<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    <!-- Toolbar Filters (Hesabro standard filter frame) -->
    <div class="w-full bg-white-80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-primary-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs">
      <!-- Search Input -->
      <div class="w-full md:w-80">
        <BaseInput
          v-model="searchQuery"
          placeholder="جستجو در عنوان، شناسه، موبایل..."
          show-start-icon
          start-icon="solar:magnifer-linear"
        />
      </div>

      <!-- Filters & Actions -->
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Account Type Filter Pills -->
        <div class="flex items-center bg-white-100 p-1 rounded-full border border-primary-8 text-xs font-bold font-dots-1 shadow-2xs">
          <button
            type="button"
            class="px-3 py-1 rounded-full transition-all cursor-pointer outline-none"
            :class="accountTypeFilter === 'ALL' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100'"
            @click="accountTypeFilter = 'ALL'"
          >
            همه حساب‌ها
          </button>
          <button
            type="button"
            class="px-3 py-1 rounded-full transition-all cursor-pointer outline-none"
            :class="accountTypeFilter === 'BUSINESS' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100'"
            @click="accountTypeFilter = 'BUSINESS'"
          >
            کسب‌وکار
          </button>
          <button
            type="button"
            class="px-3 py-1 rounded-full transition-all cursor-pointer outline-none"
            :class="accountTypeFilter === 'PERSONAL' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100'"
            @click="accountTypeFilter = 'PERSONAL'"
          >
            شخصی
          </button>
        </div>

        <!-- Status Filter Select -->
        <div class="w-36">
          <BaseSelect
            v-model="statusFilter"
            :options="statusOptions"
            placeholder="وضعیت اشتراک"
            size="sm"
          />
        </div>

        <!-- Refresh Button -->
        <BaseTooltip text="به‌روزرسانی جدول">
          <button
            type="button"
            class="w-10 h-10 rounded-full border border-white-100 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none group text-primary-100"
            style="
              background-image: radial-gradient(
                ellipse at 50% 100%,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            "
            @click="$emit('refresh')"
          >
            <Icon icon="solar:restart-bold" class="w-4 h-4 transition-transform duration-500" :class="loading ? 'animate-spin' : 'group-hover:rotate-180'" />
          </button>
        </BaseTooltip>
      </div>
    </div>

    <!-- Table Container (Hesabro DocumentsTable Frame Standard) -->
    <div class="w-full bg-white-100 rounded-2xl overflow-hidden border border-primary-6 flex flex-col relative transition-all duration-200 shadow-xs">
      <!-- Loading Overlay -->
      <CardLoadingOverlay v-if="loading" />

      <!-- Top Table Header Row -->
      <div class="w-full h-12 bg-white-100 border-b border-primary-6 flex items-center shrink-0">
        <!-- 1. Row Index Column Header (Separator) -->
        <div class="w-10 self-stretch bg-primary-1/60 border-l border-primary-6 flex items-center justify-center shrink-0 text-xs font-bold text-primary-60 font-dots-1 select-none">
          #
        </div>

        <!-- 2. Business Title & Slug Header -->
        <div class="flex-1 min-w-[200px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            عنوان کسب‌وکار / شناسه
          </span>
        </div>

        <!-- 3. Owner Mobile Header -->
        <div class="w-36 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            موبایل مالک
          </span>
        </div>

        <!-- 4. Account Type Header -->
        <div class="w-28 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            نوع اکانت
          </span>
        </div>

        <!-- 5. Subscription Status Header -->
        <div class="w-32 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            وضعیت اشتراک
          </span>
        </div>

        <!-- 6. Quota Usage Header -->
        <div class="w-44 pr-3 flex items-center justify-center text-center">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-center">
            مصرف فاکتور ماهانه
          </span>
        </div>

        <!-- 7. Actions Header -->
        <div class="w-[140px] pl-2 pr-3 flex items-center justify-end text-left shrink-0">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-left">
            عملیات
          </span>
        </div>
      </div>

      <!-- Empty State View -->
      <div
        v-if="!loading && filteredTenants.length === 0"
        class="w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60"
      >
        <div class="w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80">
          <Icon icon="solar:folder-with-files-bold-duotone" class="w-6 h-6" />
        </div>
        <span class="text-xs font-bold font-dots-1">هیچ مستأجری یافت نشد</span>
        <p class="text-2xs text-primary-40 font-dots-1">
          با تغییر فیلترهای جستجو مجدداً بررسی فرمایید.
        </p>
      </div>

      <!-- Table Rows Container -->
      <div v-else class="w-full flex flex-col divide-y divide-primary-6 overflow-x-auto">
        <div
          v-for="(tenant, idx) in filteredTenants"
          :key="tenant.id"
          class="w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none cursor-pointer"
          @click="$emit('select', tenant)"
        >
          <!-- 1. Row Index Cell (Separator) -->
          <div class="w-10 self-stretch bg-primary-1/50 border-l border-primary-6 flex items-center justify-center shrink-0">
            <span class="text-xs font-bold text-primary-60 font-dots-1 select-none">
              {{ toPersianNumber(idx + 1) }}
            </span>
          </div>

          <!-- 2. Title & Slug Cell -->
          <div class="flex-1 min-w-[200px] pr-3 flex items-center gap-2 overflow-hidden">
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-xs sm:text-sm font-extrabold font-dots-1 text-primary-100 group-hover:text-secondary-100 transition-colors truncate">
                {{ tenant.title }}
              </span>
              <span class="text-2xs font-mono text-primary-60 truncate">
                {{ tenant.slug }} ({{ tenant.current_plan_slug || 'free' }})
              </span>
            </div>
          </div>

          <!-- 3. Owner Mobile Cell -->
          <div class="w-36 pr-3 flex items-center justify-start text-xs font-mono font-bold text-primary-80">
            {{ toPersianNumber(tenant.owner_mobile) }}
          </div>

          <!-- 4. Account Type Badge Cell -->
          <div class="w-28 pr-3 flex items-center justify-center">
            <BaseBadge
              :type="tenant.account_type === 'BUSINESS' ? 'primary' : 'secondary'"
              size="2xs"
              style-type="soft"
            >
              {{ tenant.account_type === 'BUSINESS' ? 'کسب‌وکار' : 'شخصی' }}
            </BaseBadge>
          </div>

          <!-- 5. Subscription Status Badge Cell -->
          <div class="w-32 pr-3 flex items-center justify-center">
            <BaseBadge
              :type="getStatusBadgeType(tenant.subscription_status, tenant.is_suspended)"
              size="2xs"
              style-type="soft"
            >
              {{ getStatusLabel(tenant.subscription_status, tenant.is_suspended) }}
            </BaseBadge>
          </div>

          <!-- 6. Usage Quota Cell with Progress -->
          <div class="w-44 pr-3 flex flex-col justify-center gap-1 font-dots-1">
            <div class="flex items-center justify-between text-2xs font-mono">
              <span :class="getUsageTextColor(tenant.used_invoices_count, tenant.max_invoices_limit)">
                {{ toPersianNumber(tenant.used_invoices_count) }} / {{ tenant.max_invoices_limit ? toPersianNumber(tenant.max_invoices_limit) : 'نامحدود' }}
              </span>
              <span class="text-primary-40">
                {{ toPersianNumber(Math.round((tenant.used_invoices_count / (tenant.max_invoices_limit || 1)) * 100)) }}%
              </span>
            </div>
            <div class="w-full h-1.5 bg-primary-6 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="getUsageBarColor(tenant.used_invoices_count, tenant.max_invoices_limit)"
                :style="{ width: `${Math.min(100, (tenant.used_invoices_count / (tenant.max_invoices_limit || 1)) * 100)}%` }"
              />
            </div>
          </div>

          <!-- 7. Action Buttons Column (Matching Hesabro small round action buttons) -->
          <div class="w-[140px] pl-2 pr-3 flex items-center justify-end gap-1.5 shrink-0" @click.stop>
            <!-- Impersonate Button -->
            <BaseTooltip v-if="canOperate" text="ورود نظارتی به حساب (Impersonate)">
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-secondary-8 hover:bg-secondary-12 active:scale-90 text-secondary-100 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                @click="$emit('impersonate', tenant)"
              >
                <Icon icon="solar:login-2-bold-duotone" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>

            <!-- Plan Override Button -->
            <BaseTooltip v-if="canOperate" text="تغییر دستی پلن">
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-primary-12 active:scale-90 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                @click="$emit('overridePlan', tenant)"
              >
                <Icon icon="solar:pen-bold-duotone" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>

            <!-- Suspend / Activate Button -->
            <BaseTooltip v-if="canOperate" :text="tenant.is_suspended ? 'فعال‌سازی مجدد حساب' : 'تعلیق حساب مستأجر'">
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full active:scale-90 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                :class="tenant.is_suspended ? 'bg-success-8 hover:bg-success-12 text-success-100' : 'bg-warning-8 hover:bg-warning-12 text-warning-100'"
                @click="$emit('toggleSuspend', tenant)"
              >
                <Icon :icon="tenant.is_suspended ? 'solar:play-circle-bold-duotone' : 'solar:pause-circle-bold-duotone'" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>

            <!-- View Details Button -->
            <BaseTooltip text="مشاهده جزئیات مستأجر">
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-primary-12 active:scale-90 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                @click="$emit('select', tenant)"
              >
                <Icon icon="solar:eye-bold" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
import type { TenantRecordItem, AdminRole } from '@/types/admin';

const props = defineProps<{
  tenants: TenantRecordItem[];
  loading?: boolean;
  currentRole: AdminRole;
}>();

defineEmits<{
  (e: 'select', tenant: TenantRecordItem): void;
  (e: 'impersonate', tenant: TenantRecordItem): void;
  (e: 'overridePlan', tenant: TenantRecordItem): void;
  (e: 'toggleSuspend', tenant: TenantRecordItem): void;
  (e: 'refresh'): void;
}>();

const searchQuery = ref('');
const accountTypeFilter = ref<'ALL' | 'BUSINESS' | 'PERSONAL'>('ALL');
const statusFilter = ref('');

const statusOptions = [
  { value: '', label: 'همه وضعیت‌ها' },
  { value: 'active', label: 'فعال' },
  { value: 'trial', label: 'آزمایشی' },
  { value: 'expired', label: 'منقضی‌شده' },
  { value: 'suspended', label: 'تعلیق‌شده' },
];

const canOperate = computed(() => {
  return props.currentRole === 'SUPER_ADMIN' || props.currentRole === 'SUPPORT_AGENT';
});

const filteredTenants = computed(() => {
  return props.tenants.filter((t) => {
    // Search query
    const q = searchQuery.value.trim().toLowerCase();
    const matchesQuery =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.owner_mobile.includes(q);

    // Account Type
    const matchesAccountType =
      accountTypeFilter.value === 'ALL' || t.account_type === accountTypeFilter.value;

    // Status
    let matchesStatus = true;
    if (statusFilter.value === 'suspended') {
      matchesStatus = t.is_suspended;
    } else if (statusFilter.value) {
      matchesStatus = t.subscription_status === statusFilter.value && !t.is_suspended;
    }

    return matchesQuery && matchesAccountType && matchesStatus;
  });
});

function getStatusLabel(status: string, isSuspended: boolean): string {
  if (isSuspended) return 'تعلیق‌شده';
  switch (status) {
    case 'active':
      return 'فعال';
    case 'trial':
      return 'آزمایشی';
    case 'expired':
      return 'منقضی‌شده';
    default:
      return status;
  }
}

function getStatusBadgeType(status: string, isSuspended: boolean): 'success' | 'warning' | 'error' | 'secondary' {
  if (isSuspended) return 'error';
  switch (status) {
    case 'active':
      return 'success';
    case 'trial':
      return 'secondary';
    case 'expired':
      return 'warning';
    default:
      return 'secondary';
  }
}

function getUsageTextColor(used: number, limit: number | null): string {
  if (!limit) return 'text-success-100 font-bold';
  const ratio = used / limit;
  if (ratio >= 0.9) return 'text-error-100 font-bold';
  if (ratio >= 0.7) return 'text-warning-100 font-bold';
  return 'text-primary-80';
}

function getUsageBarColor(used: number, limit: number | null): string {
  if (!limit) return 'bg-success-100';
  const ratio = used / limit;
  if (ratio >= 0.9) return 'bg-error-100';
  if (ratio >= 0.7) return 'bg-warning-100';
  return 'bg-secondary-100';
}
</script>
