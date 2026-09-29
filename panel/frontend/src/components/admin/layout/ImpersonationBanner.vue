<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-full opacity-0"
  >
    <div
      v-if="active"
      class="sticky top-0 z-50 w-full bg-warning-6 border-b border-warning-24 px-4 py-2.5 flex items-center justify-between text-warning-100 font-sans shadow-sm select-none"
      dir="rtl"
    >
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-warning-12 border border-warning-24 flex items-center justify-center shrink-0">
          <Icon icon="solar:shield-warning-bold-duotone" class="w-4 h-4 text-warning-100" />
        </div>
        <div class="flex items-center gap-2 flex-wrap text-xs sm:text-sm font-medium">
          <span>شما در حال بررسی نظارتی پنل مستأجر</span>
          <span class="font-bold underline decoration-warning-40 text-warning-100">«{{ tenantTitle }}»</span>
          <span>هستید.</span>
          <span v-if="expiresAt" class="text-xs text-warning-80 mr-2">
            (انقضای جلسه: <span class="font-mono">{{ expiresAt }}</span>)
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton
          size="sm"
          variant="secondary"
          start-icon="solar:logout-2-linear"
          @click="$emit('exit')"
        >
          خروج و بازگشت به پنل ادمین
        </BaseButton>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import BaseButton from '@/components/ui/BaseButton.vue';

defineProps<{
  active: boolean;
  tenantTitle?: string;
  expiresAt?: string;
}>();

defineEmits<{
  (e: 'exit'): void;
}>();
</script>
