import axios from 'axios';
const ADMIN_API_BASE_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://127.0.0.1:8001/api/v1/admin';
export const adminApiClient = axios.create({
    baseURL: ADMIN_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
// اینترسپتور ارسال توکن مجزای ادمین
adminApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('hesabro_admin_access_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// اینترسپتور تمدید خودکار توکن در صورت 401
adminApiClient.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('hesabro_admin_refresh_token');
        if (refreshToken) {
            try {
                const res = await axios.post(`${ADMIN_API_BASE_URL}/auth/refresh/`, {
                    refresh: refreshToken,
                });
                const newAccess = res.data.access;
                localStorage.setItem('hesabro_admin_access_token', newAccess);
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                }
                return adminApiClient(originalRequest);
            }
            catch {
                localStorage.removeItem('hesabro_admin_access_token');
                localStorage.removeItem('hesabro_admin_refresh_token');
            }
        }
    }
    return Promise.reject(error);
});
export const adminApiService = {
    // Auth
    async login(mobile, password) {
        const res = await adminApiClient.post('/auth/login/', { mobile, password });
        const data = res.data;
        if (data.access) {
            localStorage.setItem('hesabro_admin_access_token', data.access);
            localStorage.setItem('hesabro_admin_refresh_token', data.refresh);
        }
        return data;
    },
    async getMe() {
        const res = await adminApiClient.get('/auth/me/');
        return res.data;
    },
    logout() {
        localStorage.removeItem('hesabro_admin_access_token');
        localStorage.removeItem('hesabro_admin_refresh_token');
    },
    // Tenants
    async getTenants(params) {
        const res = await adminApiClient.get('/tenants/', { params });
        return res.data;
    },
    async suspendTenant(id, reason) {
        const res = await adminApiClient.post(`/tenants/${id}/suspend/`, { reason });
        return res.data;
    },
    async activateTenant(id) {
        const res = await adminApiClient.post(`/tenants/${id}/activate/`);
        return res.data;
    },
    async impersonateTenant(id) {
        const res = await adminApiClient.post(`/tenants/${id}/impersonate/`);
        return res.data;
    },
    async manualOverridePlan(id, payload) {
        const res = await adminApiClient.post(`/tenants/${id}/manual-override-plan/`, payload);
        return res.data;
    },
    // Affiliates
    async getAffiliates(params) {
        const res = await adminApiClient.get('/affiliates/', { params });
        return res.data;
    },
    async createAffiliate(payload) {
        const res = await adminApiClient.post('/affiliates/', payload);
        return res.data;
    },
    async executePayout(partnerId, payload) {
        const res = await adminApiClient.post(`/affiliates/${partnerId}/payout/`, payload);
        return res.data;
    },
    // Promo Codes
    async getPromoCodes(params) {
        const res = await adminApiClient.get('/promo-codes/', { params });
        return res.data;
    },
    async createPromoCode(payload) {
        const res = await adminApiClient.post('/promo-codes/', payload);
        return res.data;
    },
    async togglePromoCode(id, isActive) {
        const res = await adminApiClient.patch(`/promo-codes/${id}/`, { is_active: isActive });
        return res.data;
    },
    // Subscriptions & Plans Studio
    async getPlans(params) {
        const res = await adminApiClient.get('/plans/', { params });
        return res.data;
    },
    async createPlan(payload) {
        const res = await adminApiClient.post('/plans/', payload);
        return res.data;
    },
    async updatePlan(id, payload) {
        const res = await adminApiClient.put(`/plans/${id}/`, payload);
        return res.data;
    },
    async setFeaturedPlan(id, featuredBadgeText) {
        const res = await adminApiClient.post(`/plans/${id}/set-featured/`, {
            featured_badge_text: featuredBadgeText,
        });
        return res.data;
    },
    // Staff & RBAC
    async getStaff(params) {
        const res = await adminApiClient.get('/staff/', { params });
        return res.data;
    },
    async createStaff(payload) {
        const res = await adminApiClient.post('/staff/', payload);
        return res.data;
    },
    // Audit Logs
    async getAuditLogs(params) {
        const res = await adminApiClient.get('/audit-logs/', { params });
        return res.data;
    },
};
