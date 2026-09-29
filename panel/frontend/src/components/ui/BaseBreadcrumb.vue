<template>
  <nav
    class="flex items-center gap-2 font-sans select-none flex-wrap"
    dir="rtl"
    :data-node-id="resolvedLevel === 'two' ? '4:29142' : '4:29138'"
    data-name="Breadcrumb Component"
    aria-label="Breadcrumb"
  >
    <!-- 1. Home Icon (Figma Node 4:29141 / 4:29147: 14×14px - First on Right in RTL) -->
    <div
      v-if="showHome"
      class="flex items-center justify-center shrink-0 w-3.5 h-3.5"
      :data-node-id="resolvedLevel === 'two' ? '4:29147' : '4:29141'"
      data-name="Home Angle"
    >
      <slot name="home">
        <BaseTooltip v-if="homePath" text="صفحه اصلی">
          <router-link
            :to="homePath"
            class="w-3.5 h-3.5 flex items-center justify-center text-primary-40 hover:text-primary-80 transition-colors outline-none"
          >
            <Icon :icon="homeIcon" class="w-3.5 h-3.5" />
          </router-link>
        </BaseTooltip>
        <BaseTooltip v-else text="صفحه اصلی">
          <button
            type="button"
            class="w-3.5 h-3.5 flex items-center justify-center text-primary-40 hover:text-primary-80 transition-colors cursor-pointer outline-none p-0 bg-transparent border-0"
            @click="emit('home-click')"
          >
            <Icon :icon="homeIcon" class="w-3.5 h-3.5" />
          </button>
        </BaseTooltip>
      </slot>
    </div>

    <!-- Separator Arrow after Home Icon -->
    <div
      v-if="showSeparators && showHome"
      class="flex items-center justify-center shrink-0 w-3.5 h-3.5 text-primary-40"
      data-name="Alt Arrow Left"
    >
      <slot name="separator">
        <Icon icon="solar:alt-arrow-left-linear" class="w-3.5 h-3.5 text-primary-40" />
      </slot>
    </div>

    <!-- 2. Intermediate / Parent Pages (Figma Node 4:29145: 14px font-bold text-primary-60) -->
    <template v-if="resolvedParentItems.length > 0">
      <template v-for="(item, idx) in resolvedParentItems" :key="idx">
        <!-- Parent Page Title -->
        <div
          class="flex items-center justify-end shrink-0"
          data-node-id="4:29145"
          data-name="Text Component"
        >
          <slot name="item" :item="item" :index="idx">
            <router-link
              v-if="item.path"
              :to="item.path"
              class="text-xs sm:text-sm font-bold text-primary-60 hover:text-primary-100 font-dots-1 leading-[18px] whitespace-nowrap transition-colors outline-none"
            >
              {{ item.title }}
            </router-link>
            <button
              v-else
              type="button"
              class="text-xs sm:text-sm font-bold text-primary-60 hover:text-primary-100 font-dots-1 leading-[18px] whitespace-nowrap transition-colors cursor-pointer outline-none bg-transparent border-0 p-0"
              @click="emit('item-click', item)"
            >
              {{ item.title }}
            </button>
          </slot>
        </div>

        <!-- Separator Arrow after Parent Page (Figma Node 4:29146) -->
        <div
          v-if="showSeparators"
          class="flex items-center justify-center shrink-0 w-3.5 h-3.5 text-primary-40"
          data-node-id="4:29146"
          data-name="Alt Arrow Left"
        >
          <slot name="separator">
            <Icon icon="solar:alt-arrow-left-linear" class="w-3.5 h-3.5 text-primary-40" />
          </slot>
        </div>
      </template>
    </template>

    <!-- 3. Current / Active Page Title (Figma Node 4:29139 / 4:29143: 18px font-extrabold text-primary-100) -->
    <div
      class="flex items-center justify-end shrink-0"
      :data-node-id="resolvedLevel === 'two' ? '4:29143' : '4:29139'"
      data-name="Text Component"
    >
      <slot name="current" :title="resolvedCurrentTitle">
        <h1
          v-if="asHeading"
          class="text-base sm:text-lg font-extrabold text-primary-100 font-dots-1 leading-6 whitespace-nowrap m-0 p-0"
        >
          {{ resolvedCurrentTitle }}
        </h1>
        <span
          v-else
          class="text-base sm:text-lg font-extrabold text-primary-100 font-dots-1 leading-6 whitespace-nowrap"
        >
          {{ resolvedCurrentTitle }}
        </span>
      </slot>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

export type BreadcrumbLevel = 'one' | 'two'

export interface BreadcrumbItem {
  title: string
  path?: string
}

export interface BaseBreadcrumbProps {
  /** Current / Active Page Title */
  title?: string
  /** Breadcrumb Level Variant (Figma: 'one' | 'two') */
  level?: BreadcrumbLevel
  /** Parent Page Title for Level Two */
  parentTitle?: string
  /** Parent Page Path for Level Two */
  parentPath?: string
  /** Array of parent items for multi-level navigation */
  items?: BreadcrumbItem[]
  /** Home route path (default: '/') */
  homePath?: string
  /** Home Icon Name (Figma: 'solar:home-2-bold-duotone' / 'solar:home-angle-bold-duotone') */
  homeIcon?: string
  /** Whether to show the home icon */
  showHome?: boolean
  /** Whether to show separator arrows */
  showSeparators?: boolean
  /** Render active title as <h1> */
  asHeading?: boolean
}

const props = withDefaults(defineProps<BaseBreadcrumbProps>(), {
  title: 'عنوان',
  level: 'one',
  parentTitle: '',
  parentPath: '',
  items: () => [],
  homePath: '',
  homeIcon: 'solar:home-2-bold-duotone',
  showHome: true,
  showSeparators: true,
  asHeading: true,
})

const emit = defineEmits<{
  (e: 'home-click'): void
  (e: 'item-click', item: BreadcrumbItem): void
}>()

const resolvedCurrentTitle = computed(() => props.title || 'عنوان')

const resolvedLevel = computed<BreadcrumbLevel>(() => {
  if (props.level) return props.level
  if (props.items && props.items.length > 0) return 'two'
  if (props.parentTitle) return 'two'
  return 'one'
})

const resolvedParentItems = computed<BreadcrumbItem[]>(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  if (props.parentTitle) {
    return [{ title: props.parentTitle, path: props.parentPath }]
  }
  if (props.level === 'two') {
    return [{ title: 'عنوان', path: props.parentPath }]
  }
  return []
})
</script>
