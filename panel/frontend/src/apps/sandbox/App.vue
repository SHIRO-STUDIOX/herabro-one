<template>
  <div
    class="min-h-[100dvh] h-[100dvh] bg-[#1e1e1e] flex flex-col font-sans select-none overflow-hidden text-white-100"
    data-theme="hesabro"
    dir="rtl"
  >
    <!-- 1. Minimal Top Toolbar -->
    <SandboxTopToolbar
      v-model:active-viewport="activeViewport"
      v-model:active-height="activeHeight"
      v-model:canvas-bg="canvasBg"
      v-model:is-inspect-open="isInspectOpen"
      :viewports="viewports"
      :height-options="heightOptions"
    />

    <!-- 2. Main Studio Workspace (Right Statuses Sidebar + Center Canvas + Left Layers Sidebar) -->
    <div class="flex-1 flex overflow-hidden relative">
      <!-- RIGHT SIDEBAR: Component Statuses & Details Panel (در RTL سمت راست قرار می‌گیرد) -->
      <SandboxStatusesSidebar
        :active-component="activeComponent"
        :active-status-id="activeStatusId"
        @update:active-status-id="handleStatusChange"
      />

      <!-- CENTER VIEWPORT CANVAS (Figma Workspace) -->
      <SandboxCanvas
        :active-component="activeComponent"
        :active-component-id="activeComponentId"
        :active-status-id="activeStatusId"
        :active-viewport="activeViewport"
        :active-height="activeHeight"
        :canvas-bg="canvasBg"
        :viewports="viewports"
        :height-options="heightOptions"
      />

      <!-- LEFT SIDEBAR: Component Layers Panel (در RTL سمت چپ قرار می‌گیرد) -->
      <SandboxLayersSidebar
        :all-components="allComponentsRegistry"
        :active-component-id="activeComponentId"
        @select-component="selectComponent"
      />
    </div>

    <!-- 3. DevTools Inspect Drawer -->
    <SandboxInspectDrawer
      :is-open="isInspectOpen"
      :active-component="activeComponent"
      @close="isInspectOpen = false"
    />

    <!-- Global BaseToast Notification Container -->
    <Teleport to="body">
      <BaseToast
        v-if="toastStore.currentToast"
        :key="toastStore.currentToast.id"
        v-model="toastStore.isVisible"
        :type="toastStore.currentToast.type || 'primary'"
        :style-type="toastStore.currentToast.styleType || 'glass'"
        :size="toastStore.currentToast.size || 'md'"
        :title="toastStore.currentToast.title || ''"
        :message="toastStore.currentToast.message"
        :icon="toastStore.currentToast.icon"
        :show-icon="toastStore.currentToast.showIcon"
        :closable="toastStore.currentToast.closable"
        :action-label="toastStore.currentToast.actionLabel"
        :action-icon="toastStore.currentToast.actionIcon"
        :duration="toastStore.currentToast.duration"
        :fixed="true"
        :position="toastStore.currentToast.position || 'top-center'"
        @close="toastStore.hide"
        @action="toastStore.handleAction"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseToast from '@/components/ui/BaseToast.vue'
import { useToastStore } from '@/stores/toast'
import SandboxTopToolbar from './components/SandboxTopToolbar.vue'
import SandboxStatusesSidebar from './components/SandboxStatusesSidebar.vue'
import SandboxLayersSidebar from './components/SandboxLayersSidebar.vue'
import SandboxCanvas from './components/SandboxCanvas.vue'
import SandboxInspectDrawer from './components/SandboxInspectDrawer.vue'

import {
  allComponentsRegistry,
  viewports,
  heightOptions,
  type ViewportId,
  type HeightId,
  type CanvasBgType,
} from './registry'

const route = useRoute()
const router = useRouter()
const toastStore = useToastStore()

const activeViewport = ref<ViewportId>('desktop')
const activeHeight = ref<HeightId>('figma')
const canvasBg = ref<CanvasBgType>('grid')
const isInspectOpen = ref(false)

const activeComponentId = ref('base-button')
const activeStatusId = ref('variants')

const activeComponent = computed(() => {
  return allComponentsRegistry.find((c) => c.id === activeComponentId.value)
})

let isInternalNavigation = false

// Synchronize state from browser URL
const syncFromRoute = () => {
  if (isInternalNavigation) {
    isInternalNavigation = false
    return
  }

  const compQuery = route.query.component as string
  const statusQuery = route.query.status as string
  const stepQuery = route.query.step as string

  // 1. Direct path mappings
  if (route.path === '/login') {
    activeComponentId.value = 'login-interactive-flow'
    activeStatusId.value = stepQuery === '2' ? 'step-2' : 'step-1'
    return
  }
  if (route.path === '/onboarding') {
    activeComponentId.value = 'page-onboarding'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/documents') {
    activeComponentId.value = 'page-documents'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/accounts') {
    activeComponentId.value = 'page-accounts'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/turnover') {
    activeComponentId.value = 'page-turnover'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/treasury') {
    activeComponentId.value = 'page-treasury'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/ledger') {
    activeComponentId.value = 'page-ledger'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/users') {
    activeComponentId.value = 'page-users'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/settings/businesses') {
    activeComponentId.value = 'page-businesses'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/settings/fiscal-years') {
    activeComponentId.value = 'page-fiscal-years'
    activeStatusId.value = 'default'
    return
  }
  if (route.path === '/sandbox/treasury') {
    activeComponentId.value = 'treasury-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/cheques') {
    activeComponentId.value = 'cheques-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/ledger') {
    activeComponentId.value = 'ledger-sandbox'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/members') {
    activeComponentId.value = 'members-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/accounts') {
    activeComponentId.value = 'accounts-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/settings') {
    activeComponentId.value = 'settings-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/profile') {
    activeComponentId.value = 'profile-management'
    activeStatusId.value = statusQuery || 'profile'
    return
  }
  if (route.path === '/sandbox/inventory') {
    activeComponentId.value = 'inventory-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/sales') {
    activeComponentId.value = 'sales-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/badges') {
    activeComponentId.value = 'badges-management'
    activeStatusId.value = statusQuery || 'interactive'
    return
  }
  if (route.path === '/sandbox/financial-keypad') {
    activeComponentId.value = 'financial-keypad'
    activeStatusId.value = statusQuery || 'mobile-simulator'
    return
  }

  // 2. Query parameter: ?component=...&status=...
  if (compQuery) {
    const comp = allComponentsRegistry.find((c) => c.id === compQuery)
    if (comp) {
      activeComponentId.value = comp.id
      activeStatusId.value =
        statusQuery || comp.defaultStatusId || comp.statuses[0]?.id || 'default'
      return
    }
  }

  // 3. Fallback default
  if (!activeComponentId.value) {
    activeComponentId.value = 'base-button'
    activeStatusId.value = 'variants'
  }
}

// Push URL when user clicks components or changes statuses in Sandbox
const updateUrl = (id: string, statusId: string) => {
  isInternalNavigation = true

  if (id === 'login-interactive-flow' || id === 'page-login') {
    const step = statusId === 'step-2' ? '2' : '1'
    router.replace({ path: '/login', query: { step } })
    return
  }
  if (id === 'page-home') {
    router.replace({ path: '/', query: {} })
    return
  }
  if (id === 'page-documents') {
    router.replace({ path: '/documents', query: {} })
    return
  }
  if (id === 'page-accounts') {
    router.replace({ path: '/accounts', query: {} })
    return
  }
  if (id === 'page-treasury') {
    router.replace({ path: '/treasury', query: {} })
    return
  }
  if (id === 'page-turnover') {
    router.replace({ path: '/turnover', query: {} })
    return
  }
  if (id === 'page-ledger') {
    router.replace({ path: '/ledger', query: {} })
    return
  }
  if (id === 'page-onboarding') {
    router.replace({ path: '/onboarding', query: {} })
    return
  }
  if (id === 'page-businesses') {
    router.replace({ path: '/settings/businesses', query: {} })
    return
  }
  if (id === 'page-fiscal-years') {
    router.replace({ path: '/settings/fiscal-years', query: {} })
    return
  }
  if (id === 'page-users') {
    router.replace({ path: '/users', query: {} })
    return
  }
  if (id === 'financial-keypad') {
    router.replace({ path: '/sandbox/financial-keypad', query: { status: statusId } })
    return
  }

  // Otherwise, use / or /sandbox with ?component=...&status=...
  const basePath = route.path.startsWith('/sandbox') ? '/sandbox' : '/'
  router.replace({ path: basePath, query: { component: id, status: statusId } })
}

const selectComponent = (id: string) => {
  activeComponentId.value = id
  const comp = allComponentsRegistry.find((c) => c.id === id)
  if (comp) {
    activeStatusId.value = comp.defaultStatusId || comp.statuses[0]?.id || 'default'
  }
  updateUrl(activeComponentId.value, activeStatusId.value)
}

const handleStatusChange = (newStatus: string) => {
  activeStatusId.value = newStatus
  updateUrl(activeComponentId.value, newStatus)
}

watch(
  () => route.fullPath,
  () => {
    syncFromRoute()
  },
)

onMounted(() => {
  syncFromRoute()
})
</script>
