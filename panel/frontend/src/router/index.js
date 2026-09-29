import { createRouter, createWebHistory } from 'vue-router';
import AdminLoginView from '@/views/admin/AdminLoginView.vue';
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import AdminBackofficeSandboxView from '@/views/sandbox/AdminBackofficeSandboxView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/admin',
        },
        {
            path: '/login',
            name: 'admin-login',
            component: AdminLoginView,
            meta: { requiresAuth: false },
        },
        {
            path: '/admin',
            name: 'admin-dashboard',
            component: AdminDashboardView,
            meta: { requiresAuth: true },
        },
        {
            path: '/sandbox',
            name: 'admin-sandbox',
            component: AdminBackofficeSandboxView,
            meta: { requiresAuth: false },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/admin',
        },
    ],
});
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('hesabro_admin_access_token');
    if (to.meta.requiresAuth && !token) {
        next({ name: 'admin-login' });
    }
    else if (to.name === 'admin-login' && token) {
        next({ name: 'admin-dashboard' });
    }
    else {
        next();
    }
});
export default router;
