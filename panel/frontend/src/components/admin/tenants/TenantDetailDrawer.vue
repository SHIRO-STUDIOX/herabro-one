<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue && tenant"
        class="fixed inset-0 z-50 bg-black-32/50 backdrop-blur-sm flex justify-start"
        dir="rtl"
        @click.self="handleClose"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform translate-x-full"
          enter-to-class="transform translate-x-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-x-0"
          leave-to-class="transform translate-x-full"
        >
          <div
            class="w-full max-w-md h-full bg-surface-100 border-l border-primary-8 shadow-2xl flex flex-col font-sans select-none text-right overflow-hidden"
            @click.stop
          >
            <!-- Drawer Header (Hesabro Standard) -->
            <div class="h-16 px-5 border-b border-primary-6 flex items-center justify-between shrink-0 bg-white-80 backdrop-blur-md">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0">
                  <Icon icon="solar:shop-2-bold-duotone" class="w-5 h-5 text-secondary-100" />
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-extrabold text-primary-100 font-dots-1 leading-5 truncate">{{ tenant.title }}</span>
                  <span class="text-2xs font-mono text-primary-60">{{ tenant.slug }}</span>
                </div>
              </div>

              <BaseTooltip text="بستن">
                <button
                  type="button"
                  class="w-6 h-6 min-w-[24px] rounded-full bg-primary-6 hover:bg-primary-12 active:scale-95 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                  @click="handleClose"
                >
                  <Icon icon="solar:close-circle-linear" class="w-3.5 h-3.5" />
                </button>
              </BaseTooltip>
            </div>

            <!-- Drawer Body -->
            <div class="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              <!-- Status Overview Card -->
              <div class="p-3.5 rounded-xl bg-white-100 border border-primary-6 flex flex-col gap-2.5 shadow-2xs">
                <div class="flex items-center justify-between text-xs font-dots-1">
                  <span class="font-semibold text-primary-60">وضعیت کلی اشتراک:</span>
                  <BaseBadge
                    :type="tenant.is_suspended ? 'error' : tenant.subscription_status === 'ACTIVE' ? 'success' : 'warning'"
                    size="2xs"
                    style-type="soft"
                  >
                    {{ tenant.is_suspended ? 'تعلیق شده' : tenant.subscription_status_display || tenant.subscription_status }}
                  </BaseBadge>
                </div>

                <div class="flex items-center justify-between text-xs font-dots-1">
                  <span class="font-semibold text-primary-60">سطح پلن فعال:</span>
                  <span class="font-mono font-bold text-primary-100">{{ tenant.current_plan_slug || 'free' }}</span>
                </div>

                <div class="flex items-center justify-between text-xs font-dots-1">
                  <span class="font-semibold text-primary-60">تاریخ ثبت نام:</span>
                  <span class="font-mono text-primary-80">{{ tenant.created_at ? new Date(tenant.created_at).toLocaleDateString('fa-IR') : '—' }}</span>
                </div>

                <div class="flex items-center justify-between text-xs font-dots-1">
                  <span class="font-semibold text-primary-60">تاریخ انقضای پلن:</span>
                  <span class="font-mono font-bold text-primary-100">{{ tenant.subscription_expires_at ? new Date(tenant.subscription_expires_at).toLocaleDateString('fa-IR') : 'نامحدود' }}</span>
                </div>
              </div>

              <!-- Owner Identity Card -->
              <div class="p-3.5 rounded-xl bg-white-100 border border-primary-6 flex flex-col gap-2.5 shadow-2xs font-dots-1 text-xs">
                <span class="font-bold text-primary-80 border-b border-primary-6 pb-2">اطلاعات راهبر / مالک</span>
                <div class="flex items-center justify-between">
                  <span class="text-primary-60">شماره همراه:</span>
                  <span class="font-mono font-bold text-primary-100">{{ tenant.owner_mobile }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-primary-60">شناسه سیستمی مستأجر:</span>
                  <span class="font-mono text-primary-80">{{ tenant.id }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-primary-60">تاریخ ثبت نام در پلتفرم:</span>
                  <span class="font-mono text-primary-80">{{ new Date(tenant.created_at).toLocaleDateString('fa-IR') }}</span>
                </div>
              </div>

              <!-- Quota Consumptions Progress -->
              <div class="p-3.5 rounded-xl bg-white-100 border border-primary-6 flex flex-col gap-3 shadow-2xs font-dots-1 text-xs">
                <span class="font-bold text-primary-80 border-b border-primary-6 pb-2">سهمیه‌ها و مصرف ماه جاری</span>
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center justify-between text-2xs font-mono">
                    <span class="text-primary-60">فاکتورهای صادر شده:</span>
                    <span class="font-bold text-primary-100">{{ tenant.used_invoices_count }} / {{ tenant.max_invoices_limit || 'نامحدود' }}</span>
                  </div>
                  <div class="w-full h-2 bg-primary-6 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-300"
                      :class="tenant.max_invoices_limit && tenant.used_invoices_count >= tenant.max_invoices_limit ? 'bg-error-100' : 'bg-secondary-100'"
                      :style="{ width: `${Math.min(100, (tenant.used_invoices_count / (tenant.max_invoices_limit || 1)) * 100)}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Drawer Footer Actions -->
            <div class="p-4 border-t border-primary-6 bg-white-80 backdrop-blur-md flex items-center justify-end gap-2 shrink-0">
              <BaseButton
                size="md"
                type="primary"
                style-type="outline"
                start-icon="solar:pen-bold-duotone"
                class="flex-1 text-xs font-semibold"
                @click="$emit('overridePlan', tenant); handleClose()"
              >
                تغییر پلن
              </BaseButton>

              <BaseButton
                size="md"
                type="primary"
                style-type="fill"
                start-icon="solar:login-2-bold-duotone"
                class="flex-1 text-xs font-semibold"
                @click="$emit('impersonate', tenant); handleClose()"
              >
                ورود نظارتی
              </BaseButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import type { TenantRecordItem } from '@/types/admin';

defineProps<{
  modelValue: boolean;
  tenant: TenantRecordItem | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'impersonate', tenant: TenantRecordItem): void;
  (e: 'overridePlan', tenant: TenantRecordItem): void;
}>();

function handleClose() {
  emit('update:modelValue', false);
}
</script>
