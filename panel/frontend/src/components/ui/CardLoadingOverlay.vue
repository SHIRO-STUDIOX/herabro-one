<template>
  <AnimatePresence>
    <motion.div
      v-if="show || !absolute"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.25 }"
      :class="[
        absolute
          ? 'absolute inset-0 z-30 bg-white-80 backdrop-blur-md'
          : 'relative w-full bg-white-100 shadow-[0px_4px_12px_rgba(73,64,109,0.08)] min-h-[140px]',
        'rounded-2xl border border-solid border-primary-12 flex flex-col items-center justify-center px-4 py-6 gap-3 select-none',
      ]"
      dir="rtl"
      @click.stop
    >
      <div class="flex flex-col gap-1 items-center justify-center shrink-0">
        <!-- Lucide Loader Spinner (success color #41a375) -->
        <Icon
          icon="lucide:loader"
          width="32"
          height="32"
          class="text-success-100 animate-spin shrink-0"
          style="width: 32px; height: 32px"
        />

        <!-- Title -->
        <p
          class="font-bold text-xs leading-[18px] text-primary-100 text-center whitespace-nowrap font-dots-0"
        >
          لطفا صبر کنید
        </p>
      </div>

      <!-- Subtitle -->
      <p class="font-medium text-xs leading-[20px] text-primary-60 text-center w-full font-dots-0">
        در حال انتقال به وضعیت جدید..
      </p>
    </motion.div>
  </AnimatePresence>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { motion, AnimatePresence } from 'motion-v'

withDefaults(
  defineProps<{
    show?: boolean
    absolute?: boolean
  }>(),
  {
    show: true,
    absolute: true,
  },
)
</script>
