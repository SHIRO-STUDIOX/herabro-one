<template>
  <div
    class="w-full min-h-14 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 overflow-visible bg-transparent py-4 lg:py-0"
    data-name="BasePagination"
  >
    <!-- Right Side (RTL): Page Size Dropdown & Range Counter -->
    <div class="flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-6 shrink-0 w-full lg:w-auto">
      <!-- Page Size Selector Dropdown -->
      <div class="flex items-center gap-2 w-full sm:w-auto min-w-[140px] sm:min-w-[160px]">
        <BaseDropdown
          :model-value="pageSize"
          :options="pageSizeOptions"
          placeholder="تعداد ردیف در صفحه"
          size="lg"
          title="تعداد ردیف"
          title-state="in"
          :show-start-icon="false"
          placement="top"
          class="w-full"
          @update:modelValue="handlePageSizeChange"
        />
      </div>

      <!-- Record Range Text -->
      <span class="text-sm font-semibold text-primary-80 font-dots-1 whitespace-nowrap">
        نمایش {{ toPersianNumber(displayedRangeStart) }} تا
        {{ toPersianNumber(displayedRangeEnd) }} از کل {{ toPersianNumber(totalCount) }} {{ entityName }}
      </span>
    </div>

    <!-- Left Side (RTL): Pagination Buttons Bar -->
    <div class="flex items-center justify-center gap-3 shrink-0 w-full lg:w-auto">
      <div
        class="h-10 bg-white-80 border border-primary-6 rounded-[10px] p-2 flex items-center gap-1 font-dots-1"
      >
        <!-- Next Arrow (Right Arrow in RTL) -->
        <BaseTooltip text="صفحه بعدی">
          <button
            type="button"
            :disabled="currentPage >= totalPages"
            class="w-6 h-6 rounded-md border border-primary-6 flex items-center justify-center transition-all cursor-pointer outline-none hover:bg-primary-6 disabled:opacity-40 disabled:cursor-not-allowed text-primary-80"
            @click="handlePageChange(currentPage + 1)"
          >
            <Icon icon="solar:alt-arrow-right-linear" class="w-3.5 h-3.5" />
          </button>
        </BaseTooltip>

        <!-- Page Numbers List -->
        <template v-for="(p, pIdx) in paginationRange" :key="pIdx">
          <!-- Ellipsis -->
          <div
            v-if="p === '...'"
            class="w-6 h-6 flex items-center justify-center text-xs font-semibold text-primary-40 select-none"
          >
            ...
          </div>

          <!-- Page Number Button -->
          <button
            v-else
            type="button"
            :class="[
              'w-6 h-6 rounded-md text-sm font-semibold flex items-center justify-center transition-all cursor-pointer outline-none',
              Number(p) === currentPage
                ? 'bg-secondary-100 text-white-100 shadow-xs'
                : 'border border-primary-6 text-primary-60 hover:bg-primary-6 hover:text-primary-100',
            ]"
            @click="handlePageChange(Number(p))"
          >
            {{ toPersianNumber(p) }}
          </button>
        </template>

        <!-- Prev Arrow (Left Arrow in RTL) -->
        <BaseTooltip text="صفحه قبلی">
          <button
            type="button"
            :disabled="currentPage <= 1"
            class="w-6 h-6 rounded-md border border-primary-6 flex items-center justify-center transition-all cursor-pointer outline-none hover:bg-primary-6 disabled:opacity-40 disabled:cursor-not-allowed text-primary-80"
            @click="handlePageChange(currentPage - 1)"
          >
            <Icon icon="solar:alt-arrow-left-linear" class="w-3.5 h-3.5" />
          </button>
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import { toPersianNumber } from '@/utils/formatters'

export interface BasePaginationProps {
  currentPage: number
  pageSize: number
  totalCount: number
  pageSizeOptions?: Array<{ label: string; value: number | string }>
  entityName?: string
}

const props = withDefaults(defineProps<BasePaginationProps>(), {
  currentPage: 1,
  pageSize: 25,
  totalCount: 0,
  entityName: 'مورد',
  pageSizeOptions: () => [
    { label: '۱۰ ردیف در صفحه', value: 10 },
    { label: '۲۵ ردیف در صفحه', value: 25 },
    { label: '۵۰ ردیف در صفحه', value: 50 },
    { label: '۱۰۰ ردیف در صفحه', value: 100 },
  ],
})

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
}>()

// Pagination Range Calculation
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalCount / props.pageSize))
})

const displayedRangeStart = computed(() => {
  if (props.totalCount === 0) return 0
  return (props.currentPage - 1) * props.pageSize + 1
})

const displayedRangeEnd = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalCount)
})

const paginationRange = computed(() => {
  const current = props.currentPage
  const total = totalPages.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, '...', total]
  }
  if (current >= total - 2) {
    return [1, '...', total - 2, total - 1, total]
  }
  return [1, '...', current - 1, current, current + 1, '...', total]
})

// Event Handlers
const handlePageChange = (page: number) => {
  if (page !== props.currentPage && page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}

const handlePageSizeChange = (size: number) => {
  if (size !== props.pageSize) {
    emit('update:pageSize', size)
  }
}
</script>
