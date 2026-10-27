<template>
  <aside
    class="w-68 bg-[#2c2c2c] border-r border-[#383838] flex flex-col shrink-0 p-3 gap-3 overflow-y-auto z-20 font-sans select-none"
    dir="rtl"
  >
    <!-- Search Filter Input -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="جستجوی لایه‌ها..."
        class="w-full bg-[#1e1e1e] border border-[#383838] rounded-lg px-2.5 py-1.5 text-xs text-white-100 placeholder-white-40 outline-none focus:border-[#0d99ff] transition-colors font-dots-1"
      />
      <Icon
        icon="solar:magnifer-linear"
        class="w-3.5 h-3.5 text-white-40 absolute left-2.5 top-1/2 -translate-y-1/2"
      />
    </div>

    <!-- Category Switcher Tabs: Tokens vs Primitives vs Components vs Pages -->
    <div
      class="grid grid-cols-4 p-1 bg-[#1e1e1e] rounded-lg border border-[#383838] text-xs font-dots-1 gap-1"
    >
      <button
        type="button"
        @click="selectedCategory = 'tokens'"
        :class="[
          'py-1 px-1 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
          selectedCategory === 'tokens'
            ? 'bg-[#0d99ff] text-white-100 shadow-sm'
            : 'text-white-60 hover:text-white-100 hover:bg-white-6',
        ]"
        title="توکن‌های طراحی (رنگ، فونت، آیکون، ردیوس، فواصل)"
      >
        <Icon icon="solar:palette-2-bold-duotone" class="w-3 h-3" />
        <span>توکن‌ها</span>
      </button>

      <button
        type="button"
        @click="selectedCategory = 'primitives'"
        :class="[
          'py-1 px-1 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
          selectedCategory === 'primitives'
            ? 'bg-[#0d99ff] text-white-100 shadow-sm'
            : 'text-white-60 hover:text-white-100 hover:bg-white-6',
        ]"
        title="کامپوننت‌های پایه دیزاین سیستم"
      >
        <Icon icon="solar:cursor-square-bold-duotone" class="w-3 h-3" />
        <span>پایه‌ها</span>
      </button>

      <button
        type="button"
        @click="selectedCategory = 'components'"
        :class="[
          'py-1 px-1 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
          selectedCategory === 'components'
            ? 'bg-[#0d99ff] text-white-100 shadow-sm'
            : 'text-white-60 hover:text-white-100 hover:bg-white-6',
        ]"
        title="کامپوننت‌های ماژولار بیزینس"
      >
        <Icon icon="solar:widget-bold-duotone" class="w-3 h-3" />
        <span>ماژول‌ها</span>
      </button>

      <button
        type="button"
        @click="selectedCategory = 'pages'"
        :class="[
          'py-1 px-1 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
          selectedCategory === 'pages'
            ? 'bg-[#0d99ff] text-white-100 shadow-sm'
            : 'text-white-60 hover:text-white-100 hover:bg-white-6',
        ]"
        title="صفحات کامل روت‌ها"
      >
        <Icon icon="solar:window-frame-bold-duotone" class="w-3 h-3" />
        <span>صفحات</span>
      </button>
    </div>

    <!-- Layers Header -->
    <div class="flex flex-col gap-1">
      <div
        class="flex items-center justify-between px-2 py-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
      >
        <span>
          {{
            selectedCategory === 'tokens'
              ? 'توکن‌های بنیادین سیستم طراحی'
              : selectedCategory === 'primitives'
                ? 'اتم‌ها و پریمیتیوهای پایه'
                : selectedCategory === 'pages'
                  ? 'صفحات کامل سامانه'
                  : 'کامپوننت‌های ماژولار'
          }}
          ({{ displayedItems.length }})
        </span>
        <Icon
          :icon="
            selectedCategory === 'tokens'
              ? 'solar:palette-2-bold-duotone'
              : selectedCategory === 'primitives'
                ? 'solar:cursor-square-bold-duotone'
                : selectedCategory === 'pages'
                  ? 'solar:window-frame-bold-duotone'
                  : 'solar:layers-bold-duotone'
          "
          class="w-3.5 h-3.5 text-white-40"
        />
      </div>

      <!-- Component / Page Layer List -->
      <div class="flex flex-col gap-1">
        <button
          v-for="item in displayedItems"
          :key="item.id"
          type="button"
          @click="$emit('selectComponent', item.id)"
          :class="[
            'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-right cursor-pointer',
            activeComponentId === item.id
              ? 'bg-[#0d99ff] text-white-100 font-bold shadow-sm'
              : 'text-white-60 hover:text-white-100 hover:bg-white-6',
          ]"
        >
          <div class="flex items-center gap-2 truncate">
            <span class="text-2xs font-mono opacity-80">
              {{ selectedCategory === 'pages' ? '🗔' : '❖' }}
            </span>
            <span class="truncate font-dots-1">{{ item.name }}</span>
          </div>
          <span
            v-if="item.tag"
            class="text-2xs font-mono px-1.5 py-0.5 rounded bg-black-24 text-white-60 shrink-0"
          >
            {{ item.tag }}
          </span>
        </button>

        <div
          v-if="displayedItems.length === 0"
          class="py-6 text-center text-white-40 text-xs font-dots-1"
        >
          موردی یافت نشد.
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { ComponentRegistryItem, SidebarCategoryType } from '../types/sandbox'

const props = defineProps<{
  allComponents: ComponentRegistryItem[]
  activeComponentId: string
}>()

defineEmits<{
  selectComponent: [id: string]
}>()

const searchQuery = ref('')
const selectedCategory = ref<SidebarCategoryType>('primitives')

// Auto-switch sidebar tab category to match the currently active component
watch(
  () => props.activeComponentId,
  (newId) => {
    if (!newId) return
    const currentComp = props.allComponents.find((c) => c.id === newId)
    if (currentComp && currentComp.category) {
      selectedCategory.value = currentComp.category
    }
  },
  { immediate: true },
)

const displayedItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return props.allComponents.filter((item) => {
    const matchesCategory = item.category === selectedCategory.value
    if (!matchesCategory) return false
    if (!query) return true
    return (
      item.name.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    )
  })
})
</script>
