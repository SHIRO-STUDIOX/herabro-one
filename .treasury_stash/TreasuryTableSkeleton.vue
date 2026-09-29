<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right animate-pulse" dir="rtl">
    <!-- Toolbar Skeleton -->
    <div class="w-full bg-white-100 rounded-2xl border border-primary-6 p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xs">
      <div class="flex items-center gap-2">
        <BaseSkeleton width="32px" height="32px" rounded="lg" />
        <BaseSkeleton width="180px" height="16px" rounded="md" />
      </div>
      <div class="flex items-center gap-2">
        <BaseSkeleton width="120px" height="36px" rounded="xl" />
        <BaseSkeleton width="36px" height="36px" rounded="xl" />
        <BaseSkeleton width="36px" height="36px" rounded="xl" />
        <BaseSkeleton width="36px" height="36px" rounded="xl" />
      </div>
    </div>

    <!-- Table Card Skeleton -->
    <div class="w-full bg-white-100 rounded-2xl overflow-hidden border border-primary-6 flex flex-col shadow-2xs">
      <!-- Header Row Skeleton -->
      <div class="w-full h-12 bg-primary-6/40 border-b border-primary-6 flex items-center shrink-0 px-3 gap-3">
        <div class="w-10 flex items-center justify-center">
          <BaseSkeleton width="16px" height="16px" rounded="sm" />
        </div>
        <div class="w-[110px]"><BaseSkeleton width="70px" height="14px" rounded="md" /></div>
        <div class="w-[110px]"><BaseSkeleton width="50px" height="14px" rounded="md" /></div>
        <div class="flex-1 min-w-[200px]"><BaseSkeleton width="120px" height="14px" rounded="md" /></div>
        <div class="w-[140px]"><BaseSkeleton width="80px" height="14px" rounded="md" /></div>
        <div class="flex-1 min-w-[180px]"><BaseSkeleton width="100px" height="14px" rounded="md" /></div>
        <div class="w-[130px]"><BaseSkeleton width="75px" height="14px" rounded="md" /></div>
        <div class="w-[110px]"><BaseSkeleton width="60px" height="14px" rounded="md" /></div>
        <div class="w-[120px] flex justify-end"><BaseSkeleton width="50px" height="14px" rounded="md" /></div>
      </div>

      <!-- Table Rows Skeleton -->
      <div class="w-full flex flex-col divide-y divide-primary-6">
        <div 
          v-for="row in rows" 
          :key="'treasury-skel-row-' + row" 
          class="w-full h-14 flex items-center px-3 gap-3"
        >
          <!-- Checkbox -->
          <div class="w-10 flex items-center justify-center">
            <BaseSkeleton width="16px" height="16px" rounded="sm" />
          </div>

          <!-- Tracking -->
          <div class="w-[110px]">
            <BaseSkeleton width="65px" height="14px" rounded="md" />
          </div>

          <!-- Date -->
          <div class="w-[110px]">
            <BaseSkeleton width="75px" height="14px" rounded="md" />
          </div>

          <!-- Type & Party -->
          <div class="flex-1 min-w-[200px] flex items-center gap-2">
            <BaseSkeleton width="55px" height="20px" rounded="full" />
            <BaseSkeleton width="110px" height="14px" rounded="md" />
          </div>

          <!-- Amount -->
          <div class="w-[140px]">
            <BaseSkeleton width="90px" height="15px" rounded="md" />
          </div>

          <!-- Description -->
          <div class="flex-1 min-w-[180px]">
            <BaseSkeleton width="130px" height="13px" rounded="md" />
          </div>

          <!-- Created At -->
          <div class="w-[130px]">
            <BaseSkeleton width="85px" height="13px" rounded="md" />
          </div>

          <!-- Created By -->
          <div class="w-[110px]">
            <BaseSkeleton width="60px" height="13px" rounded="md" />
          </div>

          <!-- Actions -->
          <div class="w-[120px] flex items-center justify-end gap-1.5">
            <BaseSkeleton width="24px" height="24px" rounded="full" />
            <BaseSkeleton width="24px" height="24px" rounded="full" />
            <BaseSkeleton width="24px" height="24px" rounded="full" />
            <BaseSkeleton width="24px" height="24px" rounded="full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue'

withDefaults(defineProps<{
  rows?: number
}>(), {
  rows: 6
})
</script>
