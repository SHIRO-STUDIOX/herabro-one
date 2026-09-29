<template>
  <div
    ref="containerRef"
    class="relative w-full font-sans text-right select-none"
    :class="[isMenuOpen ? 'z-[9999]' : 'z-auto']"
    dir="rtl"
  >
    <!-- Label / Title Above Dropdown Field (if titleState is 'out') -->
    <div
      v-if="titleState === 'out' && (title || $slots.title)"
      class="flex items-center justify-between mb-1.5 w-full select-none"
    >
      <label
        :for="selectId"
        class="text-sm font-semibold font-dots-1 inline-flex items-center gap-0.5"
        :class="[computedDisabled ? 'text-black-32' : error ? 'text-error-80' : 'text-primary-80']"
      >
        <slot name="title">{{ title }}</slot>
        <span v-if="required" class="text-error-100 font-bold leading-none select-none mr-0.5"
          >*</span
        >
      </label>
    </div>

    <!-- Main Select Trigger Box -->
    <div
      :id="selectId"
      ref="triggerRef"
      tabindex="0"
      class="relative flex items-center justify-between border border-solid transition-all duration-200"
      :class="[
        triggerSizeClasses,
        triggerStateClasses,
        rounded ? 'rounded-full px-4' : triggerRadiusClass,
        computedDisabled
          ? 'cursor-not-allowed pointer-events-none'
          : 'cursor-pointer active:scale-[0.995]',
      ]"
      @click="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
    >
      <!-- Start Icon (Optional - Only rendered when startIcon prop or slot is provided) -->
      <div
        v-if="startIcon || $slots.startIcon"
        class="shrink-0 flex items-center justify-center text-primary-40 ml-2"
        :class="computedDisabled ? 'opacity-32' : 'opacity-80'"
      >
        <slot name="startIcon">
          <Icon :icon="startIcon" class="w-4 h-4" />
        </slot>
      </div>

      <!-- Center Text Area (Floating Label + Placeholder / Selected Value(s)) -->
      <div class="relative flex-1 min-w-0 h-full flex flex-col justify-center overflow-hidden">
        <!-- Floating Label (Inside mode when titleState === 'in') -->
        <label
          v-if="titleState === 'in' && (title || $slots.title)"
          class="absolute right-0 origin-top-right transition-all duration-200 ease-out select-none pointer-events-none font-dots-1 inline-flex items-center gap-0.5"
          :class="[
            floatingLabelPositionClasses,
            computedDisabled ? 'text-black-32' : error ? 'text-error-80' : 'text-primary-40',
          ]"
        >
          <slot name="title">{{ title }}</slot>
          <span v-if="required" class="text-error-100 font-bold leading-none select-none mr-0.5"
            >*</span
          >
        </label>

        <!-- Selected Values or Placeholder -->
        <div
          class="w-full flex items-center gap-1.5 transition-all duration-200"
          :class="titleState === 'in' && isFloating ? selectedTextPaddingTopClass : ''"
        >
          <!-- Multiple Select Chips/Badges using BaseChip Primitive (Atomic Design) -->
          <template v-if="multiple && Array.isArray(modelValue) && modelValue.length > 0">
            <div class="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              <BaseChip
                v-for="val in selectedOptions"
                :key="String(val.value)"
                :label="val.label"
                size="sm"
                type="primary"
                variant="fill"
                :pill="false"
                :removable="true"
                @remove.stop="removeOption(val.value)"
              />
            </div>
          </template>

          <!-- Single Select or Unfilled Placeholder -->
          <template v-else>
            <span
              v-if="isFilled || titleState === 'out' || (titleState === 'in' && isFloating)"
              class="truncate font-dots-1"
              :class="displayLabelClasses"
            >
              {{ displayLabelText }}
            </span>
          </template>
        </div>
      </div>

      <!-- Action Icons (Clear button & Chevron Arrow - Left side in RTL) -->
      <div class="shrink-0 flex items-center gap-1 mr-2">
        <!-- Clearable X Button -->
        <BaseTooltip v-if="clearable && isFilled && !computedDisabled" text="پاک کردن انتخاب">
          <button
            type="button"
            class="p-0.5 rounded-md text-primary-40 hover:text-error-100 transition-colors cursor-pointer"
            @click.stop="clearSelection"
          >
            <Icon icon="solar:close-circle-bold" class="w-4 h-4" />
          </button>
        </BaseTooltip>

        <!-- Dropdown Chevron Arrow Indicator -->
        <Icon
          icon="solar:alt-arrow-down-linear"
          class="w-4 h-4 transition-transform duration-200 shrink-0"
          :class="[
            isMenuOpen ? 'rotate-180 text-secondary-100' : 'text-primary-40',
            computedDisabled ? 'opacity-32' : 'opacity-80',
          ]"
        />
      </div>
    </div>

    <!-- Error or Hint Subtext -->
    <p
      v-if="error"
      class="mt-1 text-xs font-bold text-error-100 font-dots-1 flex items-center gap-1"
    >
      <Icon icon="solar:danger-circle-bold" class="w-3.5 h-3.5 shrink-0" />
      <span>{{ error }}</span>
    </p>
    <p v-else-if="hint" class="mt-1 text-2xs font-semibold text-primary-60 font-dots-1">
      {{ hint }}
    </p>

    <!-- Dropdown Options Popup Menu (Teleported to body: escapes overflow/stacking clips) -->
    <Teleport to="body">
      <Transition name="fade-slide" type="transition">
        <div
          v-if="isMenuOpen"
          ref="menuRef"
          class="fixed z-[9999] bg-white-100 border border-primary-12 rounded-2xl p-2 flex flex-col gap-1 backdrop-blur-md font-sans"
          :style="menuStyle"
          :class="[
            hasShadow ? 'shadow-lg shadow-black-6/20' : 'shadow-none',
            fixedSize
              ? 'max-h-none h-auto overflow-visible'
              : 'max-h-64 overflow-y-auto no-scrollbar',
          ]"
          dir="rtl"
        >
          <!-- Search Filter Input Header (Figma Node 3955:2682 - Pure White Background bg-white-100 & 8px rounded-lg) -->
          <div v-if="searchable" class="p-1 mb-1">
            <div class="relative w-full flex items-center">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="برچسب"
                class="w-full h-8 pl-3 pr-8 rounded-lg bg-white-100 border border-primary-12 text-xs font-medium text-primary-100 placeholder-primary-40 outline-none focus:border-primary-100 focus:ring-2 focus:ring-primary-6 font-dots-1 transition-all"
                @click.stop
              />
              <Icon
                icon="solar:magnifer-linear"
                class="w-3.5 h-3.5 text-primary-40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <!-- Options List using BaseDropdownItem Component -->
          <template v-if="filteredOptions.length > 0">
            <BaseDropdownItem
              v-for="option in filteredOptions"
              :key="String(option.value)"
              :label="option.label"
              :secondary-label="option.secondaryLabel"
              :start-icon="option.icon"
              :show-start-icon="!!option.icon"
              :keyboard-shortcut="option.kbd || option.keyboardShortcut"
              :show-keyboard-shortcut="!!(option.kbd || option.keyboardShortcut)"
              :type="option.type || 'primary'"
              :selected="isOptionSelected(option.value)"
              :disabled="option.disabled"
              :size="size === 'xs' ? 'xs' : 'sm'"
              @click="selectOption(option)"
            >
              <template v-if="multiple" #endIcon>
                <div
                  class="w-4 h-4 rounded-md border flex items-center justify-center transition-all ml-1 shrink-0"
                  :class="
                    isOptionSelected(option.value)
                      ? 'bg-primary-100 border-primary-100 text-white-100'
                      : 'border-primary-24 bg-white-100'
                  "
                >
                  <Icon
                    v-if="isOptionSelected(option.value)"
                    icon="solar:check-bold"
                    class="w-3 h-3"
                  />
                </div>
              </template>
            </BaseDropdownItem>
          </template>

          <!-- Empty Options Fallback -->
          <div v-else class="px-3 py-4 text-center text-xs font-bold text-primary-40 font-dots-1">
            گزینه‌ای یافت نشد
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseDropdownItem from './BaseDropdownItem.vue'
import BaseChip from './BaseChip.vue'
import BaseTooltip from './BaseTooltip.vue'

export interface BaseDropdownOption {
  label: string
  value: any
  disabled?: boolean
  icon?: string
  [key: string]: any
}

// Backward compatibility alias
export type SelectOption = BaseDropdownOption

export interface BaseDropdownProps {
  /** Bound v-model value (string/number or Array for multiple mode) */
  modelValue?: any
  /** Options list (array of objects or strings) */
  options?: Array<BaseDropdownOption | string>
  /** Field title or placeholder */
  title?: string
  placeholder?: string
  /** Title placement: 'out' (above) or 'in' (inside trigger) */
  titleState?: 'in' | 'out'
  /** Required field indicator */
  required?: boolean
  /** Size variant: 'xs' (32px), 'lg' (40px), '2xl' (48px), '3xl' (56px) */
  size?: 'xs' | 'lg' | '2xl' | '3xl'
  /** Rounded pill shape option */
  rounded?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Multiple selection mode */
  multiple?: boolean
  /** Show start icon */
  showStartIcon?: boolean
  /** Start icon name */
  startIcon?: string
  /** Allow clearing selection */
  clearable?: boolean
  /** Allow searching options */
  searchable?: boolean
  /** Validation error message */
  error?: string
  /** Helper hint message */
  hint?: string
  /** Popup menu container shadow variant (Figma Node 3:17505 hasShadow prop) */
  hasShadow?: boolean
  /** Popup menu container height mode: false = scrollable (max-h-64), true = fixed fit content (Figma Node 3:17505 fixedSize prop) */
  fixedSize?: boolean
  /** Explicit test state override for design system testing: 'enabled' | 'disabled' | '' */
  state?: 'enabled' | 'disabled' | ''
  /** Explicit test expanded state override: boolean or null */
  expanded?: boolean | null
  /** Explicit test filled state override: boolean or null */
  filled?: boolean | null
  /** Element ID */
  id?: string
  /** Dropdown menu placement direction: 'bottom' | 'top' | 'auto' */
  placement?: 'bottom' | 'top' | 'auto'
}

// Backward compatibility alias
export type BaseSelectProps = BaseDropdownProps

const props = withDefaults(defineProps<BaseDropdownProps>(), {
  modelValue: undefined,
  options: () => [],
  title: 'عنوان',
  placeholder: '',
  titleState: 'in',
  required: false,
  size: '2xl',
  rounded: false,
  disabled: false,
  multiple: false,
  showStartIcon: false,
  startIcon: '',
  clearable: false,
  searchable: false,
  error: '',
  hint: '',
  hasShadow: true,
  fixedSize: false,
  state: '',
  expanded: null,
  filled: null,
  id: '',
  placement: 'auto',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const isOpenInternal = ref(false)
const searchQuery = ref('')
const actualPlacement = ref<'top' | 'bottom'>(props.placement === 'top' ? 'top' : 'bottom')
const menuRect = ref({ top: 0, left: 0, width: 0 })

const MENU_GAP = 6
const MENU_MAX_HEIGHT = 256

const menuStyle = computed(() => ({
  top: `${menuRect.value.top}px`,
  left: `${menuRect.value.left}px`,
  width: `${menuRect.value.width}px`,
  transformOrigin: actualPlacement.value === 'top' ? 'bottom center' : 'top center',
}))

const updateMenuRect = () => {
  if (typeof window === 'undefined') return
  const anchor = triggerRef.value ?? containerRef.value
  if (!anchor) return
  const rect = anchor.getBoundingClientRect()
  const menuH = menuRef.value?.offsetHeight || MENU_MAX_HEIGHT
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const preferTop =
    props.placement === 'top' ||
    (props.placement === 'auto' &&
      spaceBelow < Math.min(menuH + MENU_GAP, MENU_MAX_HEIGHT + MENU_GAP) &&
      spaceAbove > spaceBelow)
  actualPlacement.value = preferTop ? 'top' : 'bottom'
  menuRect.value = {
    width: rect.width,
    left: rect.left,
    top: preferTop ? Math.max(8, rect.top - menuH - MENU_GAP) : rect.bottom + MENU_GAP,
  }
}

const updatePlacement = () => {
  updateMenuRect()
}

const selectId = props.id || `select-${Math.random().toString(36).substring(2, 9)}`

// Normalize options list into BaseDropdownOption format
const normalizedOptions = computed<BaseDropdownOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt }
    }
    return opt
  })
})

// Filtered options based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) return normalizedOptions.value
  const q = searchQuery.value.toLowerCase()
  return normalizedOptions.value.filter((opt) => opt.label.toLowerCase().includes(q))
})

// Computed disabled state
const computedDisabled = computed(() => {
  if (props.state === 'disabled') return true
  if (props.state === 'enabled') return false
  return props.disabled
})

// Effective expanded state (for showcase matrix or interactive toggle)
const isMenuOpen = computed(() => {
  if (props.expanded !== null && props.expanded !== undefined) {
    return props.expanded
  }
  return isOpenInternal.value
})

// Check if filled
const isFilled = computed(() => {
  if (props.filled !== null && props.filled !== undefined) {
    return props.filled
  }
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''
})

// Floating label active condition
const isFloating = computed(() => {
  if (props.titleState !== 'in') return false
  return isFilled.value || isMenuOpen.value
})

// Floating label top position per size variant matching 14 Figma nodes
const floatingLabelPositionClasses = computed(() => {
  if (!isFloating.value) {
    return 'top-1/2 -translate-y-1/2 text-sm font-medium'
  }
  switch (props.size) {
    case 'xs':
      return 'top-0.5 text-[9px] font-semibold'
    case 'lg':
      return 'top-0.5 text-2xs font-semibold'
    case '3xl':
      return 'top-1.5 text-xs font-semibold'
    case '2xl':
    default:
      return 'top-1 text-2xs font-semibold'
  }
})

const selectedTextPaddingTopClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'pt-2.5'
    case 'lg':
      return 'pt-3'
    case '3xl':
      return 'pt-4'
    case '2xl':
    default:
      return 'pt-3.5'
  }
})

// Selected options list for multi-select
const selectedOptions = computed<BaseDropdownOption[]>(() => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return []
  return normalizedOptions.value.filter((opt) => props.modelValue.includes(opt.value))
})

// Display label text
const displayLabelText = computed(() => {
  if (!isFilled.value) {
    return props.placeholder || (props.titleState === 'out' ? props.title : '') || 'انتخاب کنید...'
  }
  if (props.multiple) {
    return selectedOptions.value.map((o) => o.label).join('، ')
  }
  const match = normalizedOptions.value.find((o) => o.value === props.modelValue)
  return match ? match.label : String(props.modelValue)
})

// Label typography styling matching exact 14 Figma nodes (14px text-sm leading-4.5 across lg/2xl/3xl, font-medium 500 across unfilled and filled states)
const displayLabelClasses = computed(() => {
  const sz = props.size
  const fontSize = sz === 'xs' ? 'text-xs leading-4' : 'text-sm leading-4.5'

  if (computedDisabled.value) {
    return `${fontSize} font-medium text-black-32`
  }
  if (isFilled.value) {
    return `${fontSize} font-medium text-primary-100`
  }
  return `${fontSize} font-medium text-primary-40`
})

// Corner radius matching size variant
const triggerRadiusClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'rounded-lg px-2'
    case 'lg':
    case '2xl':
      return 'rounded-[10px] px-3'
    case '3xl':
      return 'rounded-xl px-4'
    default:
      return 'rounded-[10px] px-3'
  }
})

// Trigger Sizing matching 14 Figma nodes (xs: 32px, lg: 40px, 2xl: 48px, 3xl: 56px)
const triggerSizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-8 text-xs'
    case 'lg':
      return 'h-10 text-sm'
    case '3xl':
      return 'h-14 text-sm sm:text-base'
    case '2xl':
    default:
      return 'h-12 text-sm'
  }
})

// Trigger state colors and borders matching Figma and Hesabro design tokens
const triggerStateClasses = computed(() => {
  if (computedDisabled.value) {
    return 'bg-black-6 border-transparent text-black-32'
  }
  if (props.error) {
    return 'bg-white-100 border-error-100 ring-2 ring-error-8/10 text-primary-100'
  }
  if (isMenuOpen.value) {
    return 'bg-white-100 border-primary-100 ring-4 ring-primary-6 text-primary-100'
  }
  return 'bg-white-100 border-primary-12 hover:border-primary-32 text-primary-100'
})

const toggleDropdown = () => {
  if (computedDisabled.value) return
  isOpenInternal.value = !isOpenInternal.value
}

watch(isMenuOpen, (open) => {
  if (open) {
    // Wait for the teleported menu to exist so its real height is measurable,
    // then clamp it inside the viewport (also flipped above when needed).
    nextTick(() => {
      updateMenuRect()
      nextTick(() => updateMenuRect())
    })
  }
})

const repositionOnViewportChange = () => {
  if (isMenuOpen.value) updateMenuRect()
}

const closeDropdown = () => {
  isOpenInternal.value = false
}

const isOptionSelected = (val: any) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(val)
  }
  return props.modelValue === val
}

const selectOption = (option: BaseDropdownOption) => {
  if (option.disabled || computedDisabled.value) return

  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const idx = current.indexOf(option.value)
    if (idx >= 0) {
      current.splice(idx, 1)
    } else {
      current.push(option.value)
    }
    emit('update:modelValue', current)
    emit('change', current)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpenInternal.value = false
  }
}

const removeOption = (val: any) => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return
  const next = props.modelValue.filter((item: any) => item !== val)
  emit('update:modelValue', next)
  emit('change', next)
}

const clearSelection = () => {
  const emptyVal = props.multiple ? [] : undefined
  emit('update:modelValue', emptyVal)
  emit('change', emptyVal)
}

// Click outside handler (menu is teleported: check both trigger + menu)
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  const insideTrigger = containerRef.value?.contains(target)
  const insideMenu = menuRef.value?.contains(target)
  if (!insideTrigger && !insideMenu) {
    isOpenInternal.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', repositionOnViewportChange)
  window.addEventListener('scroll', repositionOnViewportChange, { capture: true, passive: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', repositionOnViewportChange)
  window.removeEventListener('scroll', repositionOnViewportChange, { capture: true } as any)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Hide scrollbar for clean aesthetic */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
