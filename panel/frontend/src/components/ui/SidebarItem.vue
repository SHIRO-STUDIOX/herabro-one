<template>
  <component
    :is="tag"
    :href="href"
    :disabled="disabled"
    :class="[
      // Base layout & transition
      'group relative inline-flex items-center text-right font-sans transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none select-none cursor-pointer border border-transparent box-border',
      disabled ? 'opacity-40 pointer-events-none cursor-not-allowed' : '',

      // Collapsed vs Expanded Container Sizing & Radii
      !expanded ? 'justify-center p-3 rounded-4xl h-[44px] w-[44px]' : 'w-full gap-2 px-3',

      // Level & Type specific heights and rounded styles (Figma node 37:24365 / 37:24331)
      expanded && type === 'main' && level === 'one' ? 'h-[44px] rounded-full' : '',
      expanded && type === 'inside' && level === 'one' ? 'h-[36px] px-3 rounded-[10px]' : '',
      expanded && level === 'two' ? 'h-[32px] pl-4 pr-[22px] rounded-lg' : '',
      expanded && level === 'three' ? 'h-[32px] pl-4 pr-[44px] rounded-lg' : '',

      // State Classes (enabled, hovered, selected)
      stateClasses,
    ]"
    :style="selectedRadialStyle"
    @click="handleClick"
  >
    <!-- Collapsed View (Icon only centered - 20x20px icon matching Figma 37:24342) -->
    <template v-if="!expanded">
      <slot name="icon">
        <Icon
          :icon="icon || 'solar:widget-5-bold-duotone'"
          class="w-5 h-5 shrink-0 transition-all duration-200"
          :class="[
            isSelected
              ? 'text-primary-100 opacity-100 scale-105'
              : 'text-primary-60 group-hover:text-primary-100 opacity-80',
          ]"
        />
      </slot>
    </template>

    <!-- Expanded View (Exact Figma RTL Order: 1. Main Icon [Right] -> 2. Title -> 3. Badge -> 4. End Arrow [Left]) -->
    <template v-else>
      <!-- 1. Start Main Icon (20x20px for Level 1) or Bullet Dot for Level 2/3 (Renders on the Right in RTL) -->
      <span v-if="level === 'one'" class="inline-flex items-center justify-center shrink-0">
        <slot name="icon">
          <Icon
            :icon="icon || 'solar:widget-5-bold-duotone'"
            class="w-5 h-5 transition-transform duration-200 group-hover:scale-105"
            :class="[
              isSelected
                ? 'text-primary-100 opacity-100'
                : state === 'hovered'
                  ? 'text-primary-80 opacity-80'
                  : 'text-primary-60 opacity-60',
            ]"
          />
        </slot>
      </span>

      <!-- Bullet Dot Indicator for Level 2 & 3 -->
      <span
        v-else-if="level === 'two' || level === 'three'"
        class="w-1 h-1 rounded-full shrink-0 transition-all duration-200"
        :class="[isSelected ? 'bg-accent-100 scale-125' : 'bg-primary-60 group-hover:bg-accent-80']"
      ></span>

      <!-- 2. Title / Label Text (flex-1 text-right font-dots-1) -->
      <span
        class="flex-1 truncate text-right font-dots-1 transition-colors"
        :class="[
          type === 'main' && level === 'one' && isSelected
            ? 'text-base font-extrabold text-primary-100 leading-[22px]'
            : '',
          type === 'main' && level === 'one' && !isSelected
            ? 'text-sm font-semibold text-primary-60 group-hover:text-primary-80 leading-[18px]'
            : '',
          type === 'inside' && isSelected ? 'text-sm font-bold text-accent-100 leading-[18px]' : '',
          type === 'inside' && !isSelected
            ? 'text-sm font-semibold text-primary-60 group-hover:text-accent-80 leading-[18px]'
            : '',
          (level === 'two' || level === 'three') && isSelected
            ? 'text-sm font-bold text-primary-100 leading-[18px]'
            : '',
          (level === 'two' || level === 'three') && !isSelected
            ? 'text-sm font-semibold text-primary-60 group-hover:text-primary-80 leading-[18px]'
            : '',
        ]"
      >
        <slot>
          {{ title || 'عنوان' }}
        </slot>
      </span>

      <!-- 3. Badge / Counter Component (SidebarItemBadge Node 37:24439) -->
      <SidebarItemBadge
        v-if="showBadge || badgeText"
        :label="badgeText || 'عنوان'"
        :state="isSelected ? 'selected' : state === 'hovered' ? 'hovered' : 'enabled'"
      >
        <slot name="badge">
          {{ badgeText || 'عنوان' }}
        </slot>
      </SidebarItemBadge>

      <!-- 4. Leftmost End Icon Arrow (12x12px icon with opacity-60 matching Figma Alt Arrow Down) -->
      <span
        v-if="showEndIcon || hasSubItems"
        class="inline-flex items-center justify-center shrink-0 transition-transform duration-200 opacity-60"
        :class="[
          isSubMenuOpen
            ? 'rotate-180 text-primary-100 opacity-100'
            : 'text-primary-60 group-hover:text-primary-80',
        ]"
      >
        <slot name="end-icon">
          <Icon :icon="endIcon || 'solar:alt-arrow-down-bold'" class="w-3 h-3" />
        </slot>
      </span>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import SidebarItemBadge from './SidebarItemBadge.vue'

export interface SidebarItemProps {
  /** Menu title / label text */
  title?: string
  /** Iconify icon string (e.g. 'solar:widget-5-bold-duotone') */
  icon?: string
  /** Sidebar item type: 'main' (top level) or 'inside' (inner level) */
  type?: 'main' | 'inside'
  /** Nesting depth level: 'one' (level 1), 'two' (level 2), 'three' (level 3) */
  level?: 'one' | 'two' | 'three'
  /** Explicit state: 'enabled' (inactive), 'hovered', 'selected' (active) */
  state?: 'enabled' | 'hovered' | 'selected'
  /** Whether the sidebar container is expanded (true) or collapsed icon-only (false) */
  expanded?: boolean
  /** Active / selected shortcut boolean flag */
  selected?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Show badge counter pill */
  showBadge?: boolean
  /** Badge text or number */
  badgeText?: string | number
  /** Show end dropdown arrow indicator */
  showEndIcon?: boolean
  /** Custom end icon string */
  endIcon?: string
  /** Indicates if this item has sub-menu items */
  hasSubItems?: boolean
  /** Sub-menu open state for rotating arrow */
  isSubMenuOpen?: boolean
  /** HTML Tag or RouterLink ('button', 'a', etc.) */
  tag?: string
  /** Link URL if tag is 'a' or router link */
  href?: string
}

const props = withDefaults(defineProps<SidebarItemProps>(), {
  title: 'عنوان',
  icon: 'solar:widget-5-bold-duotone',
  type: 'main',
  level: 'one',
  state: 'enabled',
  expanded: true,
  selected: false,
  disabled: false,
  showBadge: false,
  badgeText: '',
  showEndIcon: false,
  endIcon: 'solar:alt-arrow-down-bold',
  hasSubItems: false,
  isSubMenuOpen: false,
  tag: 'button',
  href: undefined,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Determine if the item is selected/active either from selected prop or state prop
const isSelected = computed(() => props.selected || props.state === 'selected')

// Dynamic Tailwind CSS classes based on states & type
const stateClasses = computed(() => {
  const isSel = isSelected.value

  if (props.type === 'main') {
    if (isSel) {
      return 'border border-solid border-white-100 shadow-[0px_0px_24px_0px_rgba(73,64,109,0.06)] text-primary-100 font-extrabold'
    }
    if (props.state === 'hovered') {
      return 'bg-primary-6 text-primary-80'
    }
    return 'bg-transparent text-primary-60 hover:bg-primary-6 hover:text-primary-80'
  }

  // Inside type styling
  if (props.type === 'inside') {
    if (isSel) {
      return 'bg-accent-6 border border-solid border-accent-6 text-accent-100 font-bold'
    }
    if (props.state === 'hovered') {
      return 'bg-black-6 text-accent-80'
    }
    return 'bg-transparent text-primary-60 hover:bg-black-6 hover:text-accent-80'
  }

  return ''
})

// Glassy radial background highlight for Level 1 selected state matching Figma node 37:24365 & 37:24342
const selectedRadialStyle = computed(() => {
  if (isSelected.value && props.type === 'main' && props.level === 'one') {
    if (props.expanded) {
      return {
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 224 44' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(11.2 5.9543e-7 -2.0326e-7 4.3891 112 44)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>")`,
      }
    }
    return {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.2 5.9543e-7 -3.9927e-8 4.3891 22 44)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>")`,
    }
  }
  return {}
})

const handleClick = (e: MouseEvent) => {
  if (!props.disabled) {
    emit('click', e)
  }
}
</script>
