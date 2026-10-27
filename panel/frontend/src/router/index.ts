import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore, isTokenExpired } from '@/stores/auth'
import { httpClient } from '@/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/onboarding/type',
      name: 'onboarding-type',
      component: () => import('@/views/AccountTypeView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('@/views/OnboardingView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('@/views/DocumentsView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('@/views/AccountsView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/turnover',
      name: 'turnover',
      component: () => import('@/views/TurnoverView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: () => import('@/views/TreasuryView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: () => import('@/views/AccountLedgerView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/settings/businesses',
      name: 'settings-businesses',
      component: () => import('@/views/settings/BusinessesView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/settings/profile',
      name: 'settings-profile',
      component: () => import('@/views/settings/ProfileView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/settings/fiscal-years',
      name: 'settings-fiscal-years',
      component: () => import('@/views/settings/FiscalYearsView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/inventory/operations',
      name: 'inventory-operations',
      component: () => import('@/views/InventoryOperationsView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: () => import('@/views/WarehousesView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('@/views/InvoicesView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/cheques/receivable',
      name: 'cheques-receivable',
      component: () => import('@/views/cheques/ReceivedChequesView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/cheques/payable',
      name: 'cheques-payable',
      component: () => import('@/views/cheques/PayableChequesView.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/settings/users',
      redirect: '/users',
    },
    {
      path: '/sandbox',
      name: 'sandbox-main',
      component: () => import('@/apps/sandbox/App.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/treasury',
      name: 'sandbox-treasury',
      component: () => import('@/views/sandbox/TreasurySandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/cheques',
      name: 'sandbox-cheques',
      component: () => import('@/views/sandbox/ChequesSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/ledger',
      name: 'sandbox-ledger',
      component: () => import('@/views/sandbox/LedgerSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/members',
      name: 'sandbox-members',
      component: () => import('@/views/sandbox/MembersSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/settings',
      name: 'sandbox-settings',
      component: () => import('@/views/sandbox/SettingsSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/inventory',
      name: 'sandbox-inventory',
      component: () => import('@/views/sandbox/InventorySandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/sales',
      name: 'sandbox-sales',
      component: () => import('@/views/sandbox/SalesSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/profile',
      name: 'sandbox-profile',
      component: () => import('@/views/sandbox/SettingsSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/badges',
      name: 'sandbox-badges',
      component: () => import('@/views/sandbox/BadgeSandboxView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/sandbox/financial-keypad',
      name: 'sandbox-financial-keypad',
      component: () => import('@/apps/sandbox/App.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Guaranteed infinite-redirect-loop-free router guard with proactive session validation
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // 0. Free access to developer sandboxes, showcase modes, and admin backoffice routes
  if (
    import.meta.env.MODE === 'sandbox' ||
    import.meta.env.MODE === 'showcase' ||
    to.path.startsWith('/sandbox') ||
    to.path.startsWith('/admin')
  ) {
    return next()
  }

  // 1. If explicit expired flag is present on /login, force clean logout
  if (to.path === '/login' && to.query.expired === '1') {
    authStore.logout()
    return next()
  }

  // 2. Proactively check if refresh token is completely expired (e.g. after 7 days)
  if (authStore.refreshToken && isTokenExpired(authStore.refreshToken)) {
    authStore.logout()
    if (to.path !== '/login') {
      return next({ path: '/login', query: { expired: '1' } })
    }
    return next()
  }

  // 3. Proactively refresh access token BEFORE navigating to any protected route
  if (authStore.token && isTokenExpired(authStore.token) && authStore.refreshToken) {
    const refreshedToken = await httpClient.refreshAccessToken()
    if (!refreshedToken) {
      authStore.logout()
      if (to.path !== '/login') {
        return next({ path: '/login', query: { expired: '1' } })
      }
      return next()
    }
  }

  // 4. Unauthenticated user
  if (!authStore.isAuthenticated) {
    if (to.path !== '/login') return next({ path: '/login' })
    return next()
  }

  // 5. Authenticated user visiting /login
  if (to.path === '/login') {
    if (!authStore.hasActiveBusiness) {
      return next({ path: '/onboarding/type' })
    }
    return next({ path: '/' })
  }

  // 6. User needs onboarding (no active business)
  if (!authStore.hasActiveBusiness) {
    if (
      to.path !== '/onboarding' &&
      to.path !== '/onboarding/type' &&
      to.path !== '/settings/businesses'
    ) {
      return next({ path: '/onboarding/type' })
    }
    return next()
  }

  // 7. User already has active business trying to access onboarding
  if (to.path === '/onboarding' || to.path === '/onboarding/type') {
    return next({ path: '/' })
  }

  next()
})

export default router
