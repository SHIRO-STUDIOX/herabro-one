<template>
  <div
    class="w-full bg-white-80 backdrop-blur-md border border-primary-8 rounded-2xl p-3 flex flex-col gap-2.5 font-sans select-none"
  >
    <!-- Header: plan title + badge -->
    <div class="flex items-center justify-between w-full h-10 gap-6">
      <div class="flex items-center gap-3 flex-1 min-w-0 h-10">
        <div
          class="w-10 h-10 min-w-10 min-h-10 rounded-full bg-secondary-6 text-secondary-100 border border-secondary-12 flex items-center justify-center shrink-0"
        >
          <Icon icon="solar:medal-ribbon-bold-duotone" class="w-5 h-5" />
        </div>
        <div class="flex flex-col items-start justify-center min-w-0">
          <div class="flex items-center gap-2">
            <span
              class="text-sm font-extrabold text-primary-100 leading-[18px] font-dots-1 whitespace-nowrap"
            >
              پلن {{ planTitle }}
            </span>
            <SubscriptionBadge :status="subscription.status" />
          </div>
          <span class="text-xs font-medium text-primary-60 leading-4 font-dots-1 whitespace-nowrap">
            چرخه {{ cycleLabel }}
          </span>
        </div>
      </div>
    </div>

    <!-- Countdown -->
    <div class="w-full bg-white-100 border border-primary-8 rounded-xl p-3 flex items-center justify-between gap-2">
      <div class="flex flex-col gap-0.5">
        <span class="text-2xs font-medium text-primary-60 font-dots-1">روزهای باقیمانده</span>
        <span class="text-xl font-black font-mono text-primary-100">
          {{ toPersianNumber(daysLeft) }}
        </span>
      </div>
      <div class="flex flex-col items-end gap-1 text-2xs font-dots-1">
        <span class="text-primary-60">
          شروع: <span class="font-mono font-bold text-primary-80">{{ subscription.startDate }}</span>
        </span>
        <span class="text-primary-60">
          انقضا: <span class="font-mono font-bold text-primary-80">{{ subscription.endDate }}</span>
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-2 w-full">
      <BaseButton
        type="primary"
        style-type="outline"
        size="md"
        class="!w-[130px] text-xs font-semibold shrink-0"
        :show-end-icon="true"
        end-icon="solar:restart-bold-duotone"
        @click="$emit('renew')"
      >
        تمدید پلن فعلی
      </BaseButton>
      <BaseButton
        type="secondary"
        style-type="fill"
        size="md"
        class="!w-[150px] text-xs font-semibold shrink-0"
        :show-end-icon="true"
        end-icon="solar:arrow-up-bold-duotone"
        @click="$emit('upgrade')"
      >
        ارتقای پلن
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SubscriptionBadge from '@/components/subscription/SubscriptionBadge.vue'
import { toPersianNumber } from '@/utils/formatters'
import {
  CYCLE_LABELS,
  PLAN_LABELS,
  type ActiveSubscription,
} from '@/types/subscription'

const props = withDefaults(
  defineProps<{
    subscription?: ActiveSubscription
  }>(),
  { subscription: undefined },
)

defineEmits<{
  (e: 'renew'): void
  (e: 'upgrade'): void
}>()

const subscription = computed(() => props.subscription as ActiveSubscription)
const planTitle = computed(() => PLAN_LABELS[subscription.value.planKey])
const cycleLabel = computed(() => CYCLE_LABELS[subscription.value.cycle])
const daysLeft = computed(() => Math.max(0, subscription.value.daysRemaining))
</script>
