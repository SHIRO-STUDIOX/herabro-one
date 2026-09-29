<template>
  <!-- Card-Only Mode (Figma Node 21:33964 standalone for Sandbox / Showcase) -->
  <div
    v-if="mode === 'card-only'"
    class="w-[304px] bg-white-100 border border-primary-8 rounded-3xl pt-5 pb-4 px-5 flex flex-col gap-3 font-sans select-none text-right shadow-card drop-shadow-[0px_0px_12px_var(--color-primary-6)] relative z-20"
    dir="rtl"
    data-node-id="21:33964"
    data-name="Profile Dropdown Card"
  >
    <div
      class="h-10 flex items-center justify-between gap-3 w-full shrink-0"
      data-node-id="1545:57160"
      data-name="General Header Component"
    >
      <!-- Avatar Section (RTL End / Right) -->
      <div
        class="w-10 h-10 min-w-[40px] rounded-full border border-primary-12 flex items-center justify-center shrink-0 overflow-hidden bg-primary-6"
      >
        <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="w-full h-full object-cover" />
        <Icon v-else icon="solar:user-bold-duotone" class="w-5 h-5 text-primary-100" />
      </div>

      <!-- User Text Info (RTL Start / Left of Avatar) -->
      <div class="flex-1 flex flex-col items-end justify-center min-w-0">
        <span
          class="text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] truncate w-full text-right"
        >
          {{ displayFullName }}
        </span>
        <span
          class="text-sm font-medium text-primary-60 font-dots-1 leading-[18px] truncate w-full text-right"
          dir="ltr"
        >
          {{ displayPhone }}
        </span>
      </div>
    </div>

    <!-- Divider Spacer 1 -->
    <div class="h-px bg-primary-8 rounded-lg w-full shrink-0" data-node-id="21:33970" />

    <!-- Menu Items List -->
    <div class="flex flex-col gap-1 w-full shrink-0" data-node-id="21:33973" data-name="Items">
      <!-- Item 1: User Profile Info -->
      <!-- <BaseDropdownItem
        label="اطلاعات کاربری"
        start-icon="solar:user-circle-bold-duotone"
        size="md"
        data-node-id="21:33974"
        @click="handleSelect('profile')"
      >
        <template #endIcon>
          <BaseBadge size="2xs" style-type="soft" type="primary">
            به‌زودی
          </BaseBadge>
        </template>
      </BaseDropdownItem> -->

      <!-- Item 2: Businesses (Active) -->
      <BaseDropdownItem
        label="کسب‌وکارها"
        start-icon="solar:shop-2-bold-duotone"
        size="md"
        @click="handleSelect('businesses')"
      />

      <!-- Item 3: Dark Theme Switch -->
      <BaseDropdownItem
        label="تم تاریک"
        start-icon="solar:moon-bold-duotone"
        size="md"
        data-node-id="21:33975"
        @click="handleSelect('theme')"
      >
        <template #endIcon>
          <BaseBadge size="2xs" style-type="soft" type="primary"> به‌زودی </BaseBadge>
        </template>
      </BaseDropdownItem>

      <!-- Item 4: Settings -->
      <BaseDropdownItem
        label="تنظیمات"
        start-icon="solar:settings-bold-duotone"
        size="md"
        data-node-id="21:33976"
        @click="handleSelect('settings')"
      >
        <template #endIcon>
          <BaseBadge size="2xs" style-type="soft" type="primary"> به‌زودی </BaseBadge>
        </template>
      </BaseDropdownItem>
    </div>

    <!-- Divider Spacer 2 -->
    <div class="h-px bg-primary-8 rounded-lg w-full shrink-0" data-node-id="21:33977" />

    <!-- Logout Action Item -->
    <BaseDropdownItem
      label="خروج از حساب کاربری"
      type="error"
      :centered="true"
      size="md"
      data-node-id="21:33978"
      @click="handleLogout"
    />
  </div>

  <!-- Button-Only Mode (Figma Node 21:33962 standalone for Sandbox / Showcase) -->
  <button
    v-else-if="mode === 'button-only'"
    type="button"
    class="h-11 px-2.5 sm:px-3.5 rounded-full border border-white-100 flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer outline-none select-none shadow-2xs group"
    style="
      background-image: radial-gradient(
        ellipse at 50% 100%,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    "
    dir="rtl"
    data-node-id="21:33962"
    data-name="Button Component"
    @click="toggleMenu"
  >
    <!-- Avatar Icon (Right in RTL) -->
    <div
      class="w-5 h-5 text-primary-100 opacity-80 group-hover:opacity-100 flex items-center justify-center shrink-0"
    >
      <Icon icon="solar:user-bold-duotone" class="w-5 h-5" />
    </div>

    <!-- Display Name (Center in RTL) -->
    <span
      class="px-1 text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] whitespace-nowrap"
    >
      {{ displayShortName }}
    </span>

    <!-- Arrow Down (Left in RTL) -->
    <Icon
      icon="solar:alt-arrow-down-bold"
      class="w-3.5 h-3.5 text-primary-60 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200"
      :class="internalIsOpen ? 'rotate-180' : ''"
    />
  </button>

  <!-- Full Interactive Dropdown Mode (Default in AppHeader) -->
  <div
    v-else
    ref="containerRef"
    class="relative inline-flex items-center select-none font-sans"
    dir="rtl"
  >
    <!-- Mobile Profile Trigger (< lg) -->
    <BaseTooltip text="پروفایل کاربر">
      <button
        type="button"
        class="flex lg:hidden w-11 h-11 rounded-full border border-white-100 items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs outline-none"
        style="
          background-image: radial-gradient(
            ellipse at 50% 100%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
        "
        aria-label="پروفایل کاربر"
        @click="toggleMenu"
      >
        <Icon icon="solar:user-bold-duotone" class="w-5 h-5 text-primary-100 opacity-80" />
      </button>
    </BaseTooltip>

    <!-- Desktop Profile Pill Trigger (>= lg - Figma Node 21:33962) -->
    <button
      type="button"
      class="hidden lg:flex h-11 px-2.5 sm:px-3.5 rounded-full border border-white-100 items-center justify-center gap-1 sm:gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer outline-none select-none shadow-2xs group"
      style="
        background-image: radial-gradient(
          ellipse at 50% 100%,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      "
      data-node-id="21:33962"
      @click="toggleMenu"
    >
      <div
        class="w-5 h-5 text-primary-100 opacity-80 group-hover:opacity-100 flex items-center justify-center shrink-0"
      >
        <Icon icon="solar:user-bold-duotone" class="w-5 h-5" />
      </div>
      <span
        class="px-1 text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] whitespace-nowrap"
      >
        {{ displayShortName }}
      </span>
      <Icon
        icon="solar:alt-arrow-down-bold"
        class="w-3.5 h-3.5 text-primary-60 opacity-60 group-hover:opacity-100 shrink-0 transition-transform duration-200"
        :class="internalIsOpen ? 'rotate-180' : ''"
      />
    </button>

    <!-- Floating Dropdown Card (Figma Node 21:33964) -->
    <Transition name="dropdown">
      <div
        v-if="internalIsOpen"
        class="absolute left-0 top-full mt-2 w-[304px] bg-white-100 border border-primary-8 rounded-3xl pt-5 pb-4 px-5 flex flex-col gap-3 font-sans select-none text-right shadow-card drop-shadow-[0px_0px_12px_var(--color-primary-6)] z-50 origin-top-left"
        dir="rtl"
        data-node-id="21:33964"
      >
        <!-- Header Section (Figma Node 1545:57160) -->
        <div
          class="h-10 flex items-center justify-between gap-3 w-full shrink-0"
          data-node-id="1545:57160"
        >
          <!-- Avatar Section -->
          <div
            class="w-10 h-10 min-w-[40px] rounded-full border border-primary-12 flex items-center justify-center shrink-0 overflow-hidden bg-primary-6"
          >
            <img
              v-if="userAvatar"
              :src="userAvatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <Icon v-else icon="solar:user-bold-duotone" class="w-5 h-5 text-primary-100" />
          </div>

          <!-- User Details -->
          <div class="flex-1 flex flex-col items-end justify-center min-w-0">
            <span
              class="text-base font-extrabold text-primary-100 font-dots-1 leading-[22px] truncate w-full text-right"
            >
              {{ displayFullName }}
            </span>
            <span
              v-if="displayPhone"
              class="text-sm font-medium text-primary-60 font-dots-1 leading-[18px] truncate w-full text-right"
              dir="ltr"
            >
              {{ displayPhone }}
            </span>
          </div>
        </div>

        <!-- Divider Spacer 1 -->
        <div class="h-px bg-primary-8 rounded-lg w-full shrink-0" data-node-id="21:33970" />

        <!-- Menu Items -->
        <div class="flex flex-col gap-1 w-full shrink-0" data-node-id="21:33973">
          <!-- Item 1: User Profile Info -->
          <!-- <BaseDropdownItem
            label="اطلاعات کاربری"
            start-icon="solar:user-circle-bold-duotone"
            size="md"
            data-node-id="21:33974"
            @click="handleSelect('profile')"
          >
            <template #endIcon>
              <BaseBadge size="2xs" style-type="soft" type="primary">
                به‌زودی
              </BaseBadge>
            </template>
          </BaseDropdownItem> -->

          <!-- Item 2: Businesses (Active) -->
          <BaseDropdownItem
            label="کسب‌وکارها"
            start-icon="solar:shop-2-bold-duotone"
            size="md"
            @click="handleSelect('businesses')"
          />

          <!-- Item 3: Dark Theme Switch -->
          <!-- <BaseDropdownItem
            label="تم تاریک"
            start-icon="solar:moon-bold-duotone"
            size="md"
            data-node-id="21:33975"
            @click="handleSelect('theme')"
          >
            <template #endIcon>
              <BaseBadge size="2xs" style-type="soft" type="primary">
                به‌زودی
              </BaseBadge>
            </template>
          </BaseDropdownItem> -->

          <!-- Item 4: Settings -->
          <!-- <BaseDropdownItem
            label="تنظیمات"
            start-icon="solar:settings-bold-duotone"
            size="md"
            data-node-id="21:33976"
            @click="handleSelect('settings')"
          >
            <template #endIcon>
              <BaseBadge size="2xs" style-type="soft" type="primary">
                به‌زودی
              </BaseBadge>
            </template>
          </BaseDropdownItem> -->
        </div>

        <!-- Divider Spacer 2 -->
        <div class="h-px bg-primary-8 rounded-lg w-full shrink-0" data-node-id="21:33977" />

        <!-- Logout Item -->
        <BaseDropdownItem
          label="خروج از حساب کاربری"
          type="error"
          :centered="true"
          size="md"
          data-node-id="21:33978"
          @click="handleLogout"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import BaseDropdownItem from '@/components/ui/BaseDropdownItem.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import { useAuthStore } from '@/stores/auth'

export interface UserProfileDropdownProps {
  /** Display mode: 'dropdown' (interactive popover) | 'card-only' (open card) | 'button-only' (closed pill) */
  mode?: 'dropdown' | 'card-only' | 'button-only'
  /** Controlled open state */
  isOpen?: boolean
  /** Short display name for closed button (e.g. "وصال‌طلب") */
  userName?: string
  /** Full name for card header (e.g. "محمد عرفان وصال‌طلب") */
  userFullName?: string
  /** Phone number for card header (e.g. "۰۹۱۴۰۹۵۸۶۸۲") */
  userPhone?: string
  /** Avatar image URL */
  userAvatar?: string
  /** Dark mode state */
  isDark?: boolean
}

const props = withDefaults(defineProps<UserProfileDropdownProps>(), {
  mode: 'dropdown',
  isOpen: undefined,
  userName: '',
  userFullName: '',
  userPhone: '',
  userAvatar: '',
  isDark: false,
})

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'update:isDark', value: boolean): void
  (e: 'select', key: string): void
  (e: 'logout'): void
}>()

const authStore = useAuthStore()
const containerRef = ref<HTMLElement | null>(null)

// Internal open state for uncontrolled usage
const localIsOpen = ref(false)
const internalIsOpen = computed({
  get: () => (props.isOpen !== undefined ? props.isOpen : localIsOpen.value),
  set: (val: boolean) => {
    localIsOpen.value = val
    emit('update:isOpen', val)
  },
})

// Internal dark state
const localIsDark = ref(props.isDark)
watch(
  () => props.isDark,
  (val) => {
    localIsDark.value = val
  },
)
const internalIsDark = computed({
  get: () => (props.isDark !== undefined ? props.isDark : localIsDark.value),
  set: (val: boolean) => {
    localIsDark.value = val
    emit('update:isDark', val)
  },
})

// Name & Phone computations
const displayShortName = computed(() => {
  if (props.userName) return props.userName
  if (authStore.currentUser?.lastName) return authStore.currentUser.lastName
  if (authStore.currentUser?.firstName) return authStore.currentUser.firstName
  if (authStore.currentUser?.mobile) return authStore.currentUser.mobile
  return 'کاربر'
})

const displayFullName = computed(() => {
  if (props.userFullName) return props.userFullName
  if (authStore.currentUser?.firstName && authStore.currentUser?.lastName) {
    return `${authStore.currentUser.firstName} ${authStore.currentUser.lastName}`
  }
  if (authStore.currentUser?.firstName) return authStore.currentUser.firstName
  if (authStore.currentUser?.mobile) return authStore.currentUser.mobile
  return 'کاربر گرامی'
})

const displayPhone = computed(() => {
  if (props.userPhone) return props.userPhone
  if (authStore.currentUser?.mobile) return authStore.currentUser.mobile
  return ''
})

const toggleMenu = () => {
  internalIsOpen.value = !internalIsOpen.value
}

const toggleDark = (val: boolean) => {
  internalIsDark.value = val
  emit('select', 'theme')
}

const handleSelect = (key: string) => {
  emit('select', key)
  if (key !== 'theme') {
    internalIsOpen.value = false
  }
}

const handleLogout = () => {
  emit('logout')
  internalIsOpen.value = false
}

// Click outside & Escape key listeners
const handleClickOutside = (e: MouseEvent) => {
  if (props.mode !== 'dropdown') return
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    internalIsOpen.value = false
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (props.mode !== 'dropdown') return
  if (e.key === 'Escape' && internalIsOpen.value) {
    internalIsOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
</style>
