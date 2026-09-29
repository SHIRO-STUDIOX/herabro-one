<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    <!-- Header Toolbar -->
    <div class="h-14 px-4 sm:px-5 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex items-center justify-between shadow-2xs font-dots-1">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0">
          <Icon icon="solar:history-bold-duotone" class="w-4.5 h-4.5 shrink-0" />
        </div>
        <h3 class="text-xs sm:text-sm font-extrabold text-primary-100">گزارش جامع وقایع و رهگیری حسابرسی (Audit Trail)</h3>
      </div>

      <div class="flex items-center gap-2">
        <BaseTooltip text="به‌روزرسانی لاگ‌ها">
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

        <div class="w-48 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            زمان دقیق رویداد
          </span>
        </div>

        <div class="w-40 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            کارمند مجری
          </span>
        </div>

        <div class="w-48 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            نوع عملیات (Action)
          </span>
        </div>

        <div class="flex-1 min-w-[180px] pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            هدف عملیات (Target)
          </span>
        </div>

        <div class="w-36 pr-3 flex items-center justify-start text-right">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-right">
            آدرس IP
          </span>
        </div>

        <div class="w-24 pl-2 pr-3 flex items-center justify-end text-left shrink-0">
          <span class="text-xs font-bold text-primary-60 leading-4 font-dots-1 whitespace-nowrap text-left">
            جزئیات
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && logs.length === 0" class="w-full py-16 flex flex-col items-center justify-center gap-3 text-primary-60">
        <div class="w-12 h-12 rounded-full bg-primary-6 flex items-center justify-center text-primary-80">
          <Icon icon="solar:shield-check-linear" class="w-6 h-6" />
        </div>
        <span class="text-xs font-bold font-dots-1">هیچ رخداد امنیتی ثبت نشده است</span>
      </div>

      <!-- Table Rows Container -->
      <div v-else class="w-full flex flex-col divide-y divide-primary-6 overflow-x-auto">
        <div
          v-for="(log, idx) in logs"
          :key="log.id"
          class="w-full h-14 flex items-center transition-colors duration-150 hover:bg-primary-1/60 group select-none"
        >
          <!-- Index -->
          <div class="w-10 self-stretch bg-primary-1/50 border-l border-primary-6 flex items-center justify-center shrink-0">
            <span class="text-xs font-bold text-primary-60 font-dots-1 select-none">
              {{ toPersianNumber(idx + 1) }}
            </span>
          </div>

          <!-- Timestamp -->
          <div class="w-48 pr-3 flex items-center justify-start text-xs font-mono text-primary-80">
            {{ formatDateTime(log.timestamp) }}
          </div>

          <!-- Staff Username & Role -->
          <div class="w-40 pr-3 flex flex-col justify-center">
            <span class="text-xs font-bold font-dots-1 text-primary-100 truncate">{{ log.staff_username || 'سیستم / ادمین' }}</span>
            <span class="text-2xs font-mono text-primary-40">{{ log.staff_role || 'SUPER_ADMIN' }}</span>
          </div>

          <!-- Action Badge -->
          <div class="w-48 pr-3 flex items-center">
            <BaseBadge :type="getActionBadgeType(log.action_type)" size="2xs" style-type="soft">
              {{ log.action_type }}
            </BaseBadge>
          </div>

          <!-- Target Object -->
          <div class="flex-1 min-w-[180px] pr-3 text-xs font-mono text-primary-80 truncate">
            {{ log.target_object }}
          </div>

          <!-- IP Address -->
          <div class="w-36 pr-3 text-xs font-mono font-medium text-primary-60">
            {{ log.ip_address }}
          </div>

          <!-- Small Action Button: View Details -->
          <div class="w-24 pl-2 pr-3 flex items-center justify-end shrink-0">
            <BaseTooltip text="مشاهده متادیتا و جزئیات">
              <button
                type="button"
                class="w-6 h-6 min-w-[24px] rounded-full bg-primary-8 hover:bg-primary-12 active:scale-90 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none shadow-2xs"
                @click="openDetails(log)"
              >
                <Icon icon="solar:eye-bold" class="w-3.5 h-3.5" />
              </button>
            </BaseTooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- Metadata Details Modal (Hesabro Standard) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedLog"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black-32/50 backdrop-blur-sm overflow-y-auto"
          dir="rtl"
          @click.self="selectedLog = null"
        >
          <div
            class="w-full max-w-[540px] my-auto bg-white-60 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2 text-right select-none font-sans relative transition-all duration-300"
            dir="rtl"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between w-full h-10 gap-6">
              <div class="flex items-center gap-3 flex-1 min-w-0 h-10">
                <div class="w-10 h-10 min-w-10 min-h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0">
                  <Icon icon="solar:document-text-bold-duotone" class="w-5 h-5 shrink-0" />
                </div>
                <div class="flex flex-col items-start justify-center min-w-0">
                  <span class="text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap">
                    جزئیات وقایع حسابرسی #{{ selectedLog.id }}
                  </span>
                  <span class="text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap truncate max-w-full">
                    عملیات: {{ selectedLog.action_type }}
                  </span>
                </div>
              </div>

              <!-- Close Button -->
              <BaseTooltip text="بستن">
                <button
                  type="button"
                  class="w-6 h-6 min-w-[24px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                  @click="selectedLog = null"
                >
                  <Icon icon="solar:close-circle-linear" class="w-3.5 h-3.5" />
                </button>
              </BaseTooltip>
            </div>

            <!-- Body -->
            <div class="w-full bg-white-80 rounded-xl p-3 flex flex-col gap-2.5">
              <div class="flex items-center justify-between text-xs font-dots-1 border-b border-primary-6 pb-2">
                <span class="text-primary-60">هدف عملیات:</span>
                <span class="font-mono font-bold text-primary-100">{{ selectedLog.target_object }}</span>
              </div>
              <div class="flex items-center justify-between text-xs font-dots-1 border-b border-primary-6 pb-2">
                <span class="text-primary-60">آدرس IP درخواست‌دهنده:</span>
                <span class="font-mono text-primary-80">{{ selectedLog.ip_address }}</span>
              </div>
              <span class="text-xs font-bold text-primary-80 font-dots-1 mt-1">متادیتای فیلترشده (Payload):</span>
              <pre class="w-full p-3 bg-white-100 border border-primary-6 rounded-xl text-2xs font-mono text-primary-100 overflow-x-auto max-h-48" dir="ltr">{{ JSON.stringify(selectedLog.details, null, 2) }}</pre>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 w-full pt-0.5">
              <BaseButton
                type="primary"
                style-type="outline"
                size="md"
                class="!w-[84px] text-xs font-semibold shrink-0"
                @click="selectedLog = null"
              >
                بستن
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue';
import { toPersianNumber } from '@/utils/formatters';
import type { SecurityAuditLogItem } from '@/types/admin';

defineProps<{
  logs: SecurityAuditLogItem[];
  loading?: boolean;
}>();

defineEmits<{
  (e: 'refresh'): void;
}>();

const selectedLog = ref<SecurityAuditLogItem | null>(null);

function openDetails(log: SecurityAuditLogItem) {
  selectedLog.value = log;
}

function formatDateTime(timestamp: string): string {
  try {
    const d = new Date(timestamp);
    return `${d.toLocaleDateString('fa-IR')} ${d.toLocaleTimeString('fa-IR')}`;
  } catch {
    return timestamp;
  }
}

function getActionBadgeType(action: string): 'primary' | 'secondary' | 'warning' | 'error' | 'info' {
  if (action.includes('IMPERSONATE')) return 'warning';
  if (action.includes('PAYOUT')) return 'secondary';
  if (action.includes('SUSPEND')) return 'error';
  if (action.includes('ACTIVATE')) return 'secondary';
  if (action.includes('OVERRIDE')) return 'primary';
  return 'info';
}
</script>
