import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminAppShell from '@/components/admin/layout/AdminAppShell.vue';
import TenantDirectoryTable from '@/components/admin/tenants/TenantDirectoryTable.vue';
import TenantDetailDrawer from '@/components/admin/tenants/TenantDetailDrawer.vue';
import ManualPlanOverrideModal from '@/components/admin/tenants/ManualPlanOverrideModal.vue';
import AffiliatePartnersTable from '@/components/admin/affiliate/AffiliatePartnersTable.vue';
import PromoCodesTable from '@/components/admin/affiliate/PromoCodesTable.vue';
import PayoutProcessModal from '@/components/admin/affiliate/PayoutProcessModal.vue';
import PromoCodeFormModal from '@/components/admin/affiliate/PromoCodeFormModal.vue';
import PlanStudioCanvas from '@/components/admin/plans/PlanStudioCanvas.vue';
import StaffManagementTable from '@/components/admin/staff/StaffManagementTable.vue';
import SecurityAuditLogTable from '@/components/admin/staff/SecurityAuditLogTable.vue';
import StaffInviteModal from '@/components/admin/staff/StaffInviteModal.vue';
import { adminApiService } from '@/services/adminApiService';
const router = useRouter();
// State
const activeTab = ref('tenants');
const currentRole = ref('SUPER_ADMIN');
const adminProfile = ref(null);
// Impersonation state
const isImpersonating = ref(false);
const impersonatedTenant = ref(null);
const impersonationTicket = ref(null);
// Data
const tenants = ref([]);
const partners = ref([]);
const promoCodes = ref([]);
const plans = ref([]);
const staffList = ref([]);
const auditLogs = ref([]);
// Loadings
const loadingTenants = ref(false);
const loadingAffiliates = ref(false);
const loadingPromoCodes = ref(false);
const loadingStaff = ref(false);
const loadingAuditLogs = ref(false);
const actionLoading = ref(false);
// Modals
const selectedTenant = ref(null);
const drawerOpen = ref(false);
const overrideModalOpen = ref(false);
const selectedPartner = ref(null);
const payoutModalOpen = ref(false);
const promoModalOpen = ref(false);
const staffModalOpen = ref(false);
const navItems = [
    { id: 'tenants', label: 'مدیریت مستأجران و فضاها', icon: 'solar:shop-2-bold-duotone' },
    { id: 'affiliate', label: 'همکاران فروش و تسویه', icon: 'solar:wallet-money-bold-duotone' },
    { id: 'plans', label: 'استودیوی پلن‌ها و تعرفه‌ها', icon: 'solar:layers-minimalistic-bold-duotone' },
    { id: 'staff', label: 'تیم مدیریت و لاگ‌های امنیتی', icon: 'solar:shield-check-bold-duotone' },
];
onMounted(async () => {
    try {
        const me = await adminApiService.getMe();
        adminProfile.value = me;
        currentRole.value = me.role;
    }
    catch {
        // If running in decoupled mode without active login session, keep superadmin profile
        adminProfile.value = {
            id: 1,
            username: 'superadmin',
            mobile: '09120000000',
            role: 'SUPER_ADMIN',
            is_active: true,
        };
    }
    loadAllData();
});
async function loadAllData() {
    loadTenants();
    loadAffiliates();
    loadPromoCodes();
    loadPlans();
    loadStaff();
    loadAuditLogs();
}
// 1. Tenants Methods
async function loadTenants() {
    loadingTenants.value = true;
    try {
        const data = await adminApiService.getTenants();
        tenants.value = data.results || data;
    }
    catch (err) {
        console.warn('Could not load tenants from API, using fallback data:', err);
        tenants.value = [
            {
                id: 'ten-1',
                core_tenant_id: 'core-ten-uuid-001',
                title: 'سوپرمارکت و هایپر بهار',
                slug: 'hyper-bahar',
                owner_mobile: '09125555555',
                account_type: 'BUSINESS',
                subscription_status: 'ACTIVE',
                current_plan_slug: 'shop-standard',
                subscription_expires_at: new Date(Date.now() + 75 * 86400000).toISOString(),
                used_invoices_count: 342,
                max_invoices_limit: 1000,
                is_suspended: false,
                created_at: new Date().toISOString(),
            },
            {
                id: 'ten-2',
                core_tenant_id: 'core-ten-uuid-002',
                title: 'بوتیک پوشاک شیک‌پوشان',
                slug: 'shik-poshan',
                owner_mobile: '09126666666',
                account_type: 'BUSINESS',
                subscription_status: 'EXPIRING',
                current_plan_slug: 'personal-pro',
                subscription_expires_at: new Date(Date.now() + 3 * 86400000).toISOString(),
                used_invoices_count: 480,
                max_invoices_limit: 500,
                is_suspended: false,
                created_at: new Date().toISOString(),
            },
        ];
    }
    finally {
        loadingTenants.value = false;
    }
}
function openTenantDrawer(tenant) {
    selectedTenant.value = tenant;
    drawerOpen.value = true;
}
function openOverrideModal(tenant) {
    selectedTenant.value = tenant;
    overrideModalOpen.value = true;
}
async function handlePlanOverride(payload) {
    if (!selectedTenant.value)
        return;
    actionLoading.value = true;
    try {
        await adminApiService.manualOverridePlan(selectedTenant.value.id, payload);
        overrideModalOpen.value = false;
        await loadTenants();
    }
    catch (err) {
        alert(err.response?.data?.detail || 'خطا در اعمال تغییرات پلن مستأجر.');
    }
    finally {
        actionLoading.value = false;
    }
}
async function toggleTenantSuspend(tenant) {
    try {
        if (tenant.is_suspended) {
            await adminApiService.activateTenant(tenant.id);
        }
        else {
            const reason = prompt('لطفاً دلیل مسدودسازی را وارد کنید:', 'نقض قوانین پلتفرم حسابرو وان') || '';
            await adminApiService.suspendTenant(tenant.id, reason);
        }
        await loadTenants();
    }
    catch (err) {
        alert(err.response?.data?.detail || 'خطا در تغییر وضعیت مسدودسازی مستأجر.');
    }
}
async function startImpersonate(tenant) {
    try {
        const res = await adminApiService.impersonateTenant(tenant.id);
        impersonationTicket.value = res;
        impersonatedTenant.value = tenant;
        isImpersonating.value = true;
    }
    catch (err) {
        alert(err.response?.data?.detail || 'خطا در صدور تیکت نظارتی ورود به حساب.');
    }
}
function exitImpersonation() {
    isImpersonating.value = false;
    impersonatedTenant.value = null;
    impersonationTicket.value = null;
}
// 2. Affiliate Methods
async function loadAffiliates() {
    loadingAffiliates.value = true;
    try {
        const data = await adminApiService.getAffiliates();
        partners.value = data.results || data;
    }
    catch {
        partners.value = [
            {
                id: 1,
                name: 'علی محمدی (همکار درصدی)',
                mobile: '09123333333',
                promo_code_prefix: 'ALIM',
                commission_type: 'PERCENT',
                commission_value: 15,
                wallet_balance_rial: 25000000,
                sheba_number: 'IR420170000000010032420001',
                is_active: true,
                created_at: new Date().toISOString(),
            },
            {
                id: 2,
                name: 'شرکت بازاریابی پرشین',
                mobile: '09124444444',
                promo_code_prefix: 'PERSIAN',
                commission_type: 'FIXED',
                commission_value: 500000,
                wallet_balance_rial: 50000000,
                sheba_number: 'IR750540000000020088990002',
                is_active: true,
                created_at: new Date().toISOString(),
            },
        ];
    }
    finally {
        loadingAffiliates.value = false;
    }
}
function openPayoutModal(partner) {
    selectedPartner.value = partner;
    payoutModalOpen.value = true;
}
function openPartnerModal() {
    const name = prompt('نام همکار جدید:');
    if (!name)
        return;
    const mobile = prompt('شماره همراه:');
    if (!mobile)
        return;
    adminApiService
        .createAffiliate({
        name,
        mobile,
        promo_code_prefix: name.slice(0, 4).toUpperCase(),
        commission_type: 'PERCENT',
        commission_value: 15,
        sheba_number: 'IR420170000000010032420001',
        wallet_balance_rial: 0,
    })
        .then(() => loadAffiliates())
        .catch((err) => alert(JSON.stringify(err.response?.data || err.message)));
}
async function handlePayoutSubmit(payload) {
    if (!selectedPartner.value)
        return;
    actionLoading.value = true;
    try {
        await adminApiService.executePayout(selectedPartner.value.id, payload);
        payoutModalOpen.value = false;
        await loadAffiliates();
    }
    catch (err) {
        alert(err.response?.data?.amount_rial || err.response?.data?.detail || 'خطا در ثبت تسویه پایا.');
    }
    finally {
        actionLoading.value = false;
    }
}
// 3. Promo Codes
async function loadPromoCodes() {
    loadingPromoCodes.value = true;
    try {
        const data = await adminApiService.getPromoCodes();
        promoCodes.value = data.results || data;
    }
    catch {
        promoCodes.value = [
            { id: 1, code: 'ALIM1405', partner_name: 'علی محمدی', discount_percent: 15, discount_amount_rial: 0, max_uses: 200, used_count: 42, is_active: true },
            { id: 2, code: 'PERSIAN20', partner_name: 'شرکت بازاریابی پرشین', discount_percent: 20, discount_amount_rial: 0, max_uses: 500, used_count: 118, is_active: true },
        ];
    }
    finally {
        loadingPromoCodes.value = false;
    }
}
function openPromoCodeModal() {
    promoModalOpen.value = true;
}
async function handlePromoCodeSubmit(payload) {
    actionLoading.value = true;
    try {
        await adminApiService.createPromoCode(payload);
        promoModalOpen.value = false;
        await loadPromoCodes();
    }
    catch (err) {
        alert(JSON.stringify(err.response?.data || 'خطا در ثبت کد تخفیف.'));
    }
    finally {
        actionLoading.value = false;
    }
}
async function togglePromoCode(id, isActive) {
    try {
        await adminApiService.togglePromoCode(id, isActive);
        await loadPromoCodes();
    }
    catch (err) {
        alert(err.response?.data?.detail || 'خطا در تغییر وضعیت کد تخفیف.');
    }
}
// 4. Plans Studio
async function loadPlans() {
    try {
        const data = await adminApiService.getPlans();
        plans.value = data.results || data;
    }
    catch {
        plans.value = [
            {
                id: 1,
                slug: 'free',
                title: 'پلن رایگان (شروع سریع)',
                description: 'پلن آزمایشی جهت آشنایی با امکانات نرم‌افزار',
                is_featured: false,
                featured_badge_text: '',
                max_invoices_monthly: 100,
                max_warehouses: 1,
                max_users: 1,
                max_cheques: 10,
                active_features_json: ['sales'],
                billing_cycles: [{ months_count: 1, base_price_rial: 0, discount_percent: 0, final_price_rial: 0 }],
                is_active: true,
            },
            {
                id: 2,
                slug: 'shop-standard',
                title: 'پلن استاندارد مغازه و فروشگاه',
                description: 'کامل‌ترین بسته برای فروشگاه‌ها و اصناف با قابلیت انبارداری و اتصال به کارتخوان',
                is_featured: true,
                featured_badge_text: 'پیشنهاد ویژه اصناف',
                max_invoices_monthly: null,
                max_warehouses: 5,
                max_users: 5,
                max_cheques: null,
                active_features_json: ['sales', 'inventory', 'pos_integration', 'tax_system', 'multi_user'],
                billing_cycles: [
                    { months_count: 1, base_price_rial: 9900000, discount_percent: 0, final_price_rial: 9900000 },
                    { months_count: 3, base_price_rial: 29700000, discount_percent: 10, final_price_rial: 26730000 },
                    { months_count: 6, base_price_rial: 59400000, discount_percent: 15, final_price_rial: 50490000 },
                    { months_count: 12, base_price_rial: 118800000, discount_percent: 20, final_price_rial: 95040000 },
                ],
                is_active: true,
            },
        ];
    }
}
async function handlePlanSave(planData) {
    actionLoading.value = true;
    try {
        if (planData.id) {
            await adminApiService.updatePlan(planData.id, planData);
        }
        else {
            await adminApiService.createPlan(planData);
        }
        alert('پلن با موفقیت در پایگاه داده ذخیره و منتشر شد.');
        await loadPlans();
    }
    catch (err) {
        alert(JSON.stringify(err.response?.data || 'خطا در ذخیره پلن استودیو.'));
    }
    finally {
        actionLoading.value = false;
    }
}
async function handleSetFeatured(planId, badgeText) {
    try {
        await adminApiService.setFeaturedPlan(planId, badgeText);
        await loadPlans();
    }
    catch (err) {
        alert(err.response?.data?.detail || 'خطا در تنظیم پلن برگزیده.');
    }
}
// 5. Staff & Audit Logs
async function loadStaff() {
    loadingStaff.value = true;
    try {
        const data = await adminApiService.getStaff();
        staffList.value = data.results || data;
    }
    catch {
        staffList.value = [
            { id: 1, username: 'superadmin', mobile: '09120000000', role: 'SUPER_ADMIN', role_display: 'مدیر ارشد', is_active: true },
            { id: 2, username: 'support_agent', mobile: '09121111111', role: 'SUPPORT_AGENT', role_display: 'کارشناس پشتیبانی', is_active: true },
            { id: 3, username: 'sales_manager', mobile: '09122222222', role: 'SALES_MANAGER', role_display: 'مدیر فروش', is_active: true },
        ];
    }
    finally {
        loadingStaff.value = false;
    }
}
async function loadAuditLogs() {
    loadingAuditLogs.value = true;
    try {
        const data = await adminApiService.getAuditLogs();
        auditLogs.value = data.results || data;
    }
    catch {
        auditLogs.value = [
            {
                id: 1,
                staff_username: 'superadmin',
                staff_role: 'SUPER_ADMIN',
                action_type: 'SET_FEATURED_PLAN',
                target_object: 'Plan:2:shop-standard',
                ip_address: '127.0.0.1',
                details: { method: 'POST', path: '/api/v1/admin/plans/2/set-featured/', status_code: 200, payload: { featured_badge_text: 'پیشنهاد ویژه اصناف' } },
                timestamp: new Date().toISOString(),
            },
            {
                id: 2,
                staff_username: 'support_agent',
                staff_role: 'SUPPORT_AGENT',
                action_type: 'IMPERSONATE_TENANT',
                target_object: 'Tenant:ten-1:hyper-bahar',
                ip_address: '127.0.0.1',
                details: { method: 'POST', path: '/api/v1/admin/tenants/ten-1/impersonate/', status_code: 200, payload: {} },
                timestamp: new Date(Date.now() - 3600000).toISOString(),
            },
        ];
    }
    finally {
        loadingAuditLogs.value = false;
    }
}
async function handleStaffCreate(payload) {
    actionLoading.value = true;
    try {
        await adminApiService.createStaff(payload);
        staffModalOpen.value = false;
        await loadStaff();
    }
    catch (err) {
        alert(JSON.stringify(err.response?.data || 'خطا در تعریف دسترسی مدیر جدید.'));
    }
    finally {
        actionLoading.value = false;
    }
}
function handleLogout() {
    adminApiService.logout();
    router.push('/admin/login');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = AdminAppShell || AdminAppShell;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onChangeRole': {} },
    ...{ 'onExitImpersonation': {} },
    ...{ 'onLogout': {} },
    activeTab: (__VLS_ctx.activeTab),
    currentRole: (__VLS_ctx.currentRole),
    navItems: (__VLS_ctx.navItems),
    admin: (__VLS_ctx.adminProfile),
    isImpersonating: (__VLS_ctx.isImpersonating),
    impersonatedTenantTitle: (__VLS_ctx.impersonatedTenant?.title),
    impersonationExpiresAt: (__VLS_ctx.impersonationTicket?.expires_at ? new Date(__VLS_ctx.impersonationTicket.expires_at).toLocaleTimeString('fa-IR') : undefined),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onChangeRole': {} },
    ...{ 'onExitImpersonation': {} },
    ...{ 'onLogout': {} },
    activeTab: (__VLS_ctx.activeTab),
    currentRole: (__VLS_ctx.currentRole),
    navItems: (__VLS_ctx.navItems),
    admin: (__VLS_ctx.adminProfile),
    isImpersonating: (__VLS_ctx.isImpersonating),
    impersonatedTenantTitle: (__VLS_ctx.impersonatedTenant?.title),
    impersonationExpiresAt: (__VLS_ctx.impersonationTicket?.expires_at ? new Date(__VLS_ctx.impersonationTicket.expires_at).toLocaleTimeString('fa-IR') : undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.changeRole} */
    onChangeRole: (...[$event]) => {
        return (__VLS_ctx.currentRole = $event);
        // @ts-ignore
        [activeTab, currentRole, currentRole, navItems, adminProfile, isImpersonating, impersonatedTenant, impersonationTicket, impersonationTicket,];
    },
};
const __VLS_7 = {
    /** @type {typeof __VLS_5.exitImpersonation} */
    onExitImpersonation: (__VLS_ctx.exitImpersonation),
};
const __VLS_8 = {
    /** @type {typeof __VLS_5.logout} */
    onLogout: (__VLS_ctx.handleLogout),
};
var __VLS_9;
const { default: __VLS_10 } = __VLS_3.slots;
if (__VLS_ctx.activeTab === 'tenants') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col gap-6" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    const __VLS_11 = TenantDirectoryTable;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        ...{ 'onSelect': {} },
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        ...{ 'onToggleSuspend': {} },
        ...{ 'onRefresh': {} },
        tenants: (__VLS_ctx.tenants),
        loading: (__VLS_ctx.loadingTenants),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onSelect': {} },
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        ...{ 'onToggleSuspend': {} },
        ...{ 'onRefresh': {} },
        tenants: (__VLS_ctx.tenants),
        loading: (__VLS_ctx.loadingTenants),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_16;
    const __VLS_17 = {
        /** @type {typeof __VLS_16.select} */
        onSelect: (__VLS_ctx.openTenantDrawer),
    };
    const __VLS_18 = {
        /** @type {typeof __VLS_16.impersonate} */
        onImpersonate: (__VLS_ctx.startImpersonate),
    };
    const __VLS_19 = {
        /** @type {typeof __VLS_16.overridePlan} */
        onOverridePlan: (__VLS_ctx.openOverrideModal),
    };
    const __VLS_20 = {
        /** @type {typeof __VLS_16.toggleSuspend} */
        onToggleSuspend: (__VLS_ctx.toggleTenantSuspend),
    };
    const __VLS_21 = {
        /** @type {typeof __VLS_16.refresh} */
        onRefresh: (__VLS_ctx.loadTenants),
    };
    var __VLS_14;
    var __VLS_15;
    const __VLS_22 = TenantDetailDrawer;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        modelValue: (__VLS_ctx.drawerOpen),
        tenant: (__VLS_ctx.selectedTenant),
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        modelValue: (__VLS_ctx.drawerOpen),
        tenant: (__VLS_ctx.selectedTenant),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = {
        /** @type {typeof __VLS_27.impersonate} */
        onImpersonate: (__VLS_ctx.startImpersonate),
    };
    const __VLS_29 = {
        /** @type {typeof __VLS_27.overridePlan} */
        onOverridePlan: (__VLS_ctx.openOverrideModal),
    };
    var __VLS_25;
    var __VLS_26;
    const __VLS_30 = ManualPlanOverrideModal;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.overrideModalOpen),
        tenant: (__VLS_ctx.selectedTenant),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_32 = __VLS_31({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.overrideModalOpen),
        tenant: (__VLS_ctx.selectedTenant),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    let __VLS_35;
    const __VLS_36 = {
        /** @type {typeof __VLS_35.submit} */
        onSubmit: (__VLS_ctx.handlePlanOverride),
    };
    var __VLS_33;
    var __VLS_34;
}
else if (__VLS_ctx.activeTab === 'affiliate') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col gap-8" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
    const __VLS_37 = AffiliatePartnersTable;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        ...{ 'onPayout': {} },
        ...{ 'onCreatePartner': {} },
        ...{ 'onRefresh': {} },
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.loadingAffiliates),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onPayout': {} },
        ...{ 'onCreatePartner': {} },
        ...{ 'onRefresh': {} },
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.loadingAffiliates),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_42;
    const __VLS_43 = {
        /** @type {typeof __VLS_42.payout} */
        onPayout: (__VLS_ctx.openPayoutModal),
    };
    const __VLS_44 = {
        /** @type {typeof __VLS_42.createPartner} */
        onCreatePartner: (__VLS_ctx.openPartnerModal),
    };
    const __VLS_45 = {
        /** @type {typeof __VLS_42.refresh} */
        onRefresh: (__VLS_ctx.loadAffiliates),
    };
    var __VLS_40;
    var __VLS_41;
    const __VLS_46 = PromoCodesTable;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        ...{ 'onCreate': {} },
        ...{ 'onToggle': {} },
        ...{ 'onRefresh': {} },
        promoCodes: (__VLS_ctx.promoCodes),
        loading: (__VLS_ctx.loadingPromoCodes),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_48 = __VLS_47({
        ...{ 'onCreate': {} },
        ...{ 'onToggle': {} },
        ...{ 'onRefresh': {} },
        promoCodes: (__VLS_ctx.promoCodes),
        loading: (__VLS_ctx.loadingPromoCodes),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_51;
    const __VLS_52 = {
        /** @type {typeof __VLS_51.create} */
        onCreate: (__VLS_ctx.openPromoCodeModal),
    };
    const __VLS_53 = {
        /** @type {typeof __VLS_51.toggle} */
        onToggle: (__VLS_ctx.togglePromoCode),
    };
    const __VLS_54 = {
        /** @type {typeof __VLS_51.refresh} */
        onRefresh: (__VLS_ctx.loadPromoCodes),
    };
    var __VLS_49;
    var __VLS_50;
    const __VLS_55 = PayoutProcessModal;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.payoutModalOpen),
        partner: (__VLS_ctx.selectedPartner),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_57 = __VLS_56({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.payoutModalOpen),
        partner: (__VLS_ctx.selectedPartner),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    let __VLS_60;
    const __VLS_61 = {
        /** @type {typeof __VLS_60.submit} */
        onSubmit: (__VLS_ctx.handlePayoutSubmit),
    };
    var __VLS_58;
    var __VLS_59;
    const __VLS_62 = PromoCodeFormModal;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.promoModalOpen),
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_64 = __VLS_63({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.promoModalOpen),
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    let __VLS_67;
    const __VLS_68 = {
        /** @type {typeof __VLS_67.submit} */
        onSubmit: (__VLS_ctx.handlePromoCodeSubmit),
    };
    var __VLS_65;
    var __VLS_66;
}
else if (__VLS_ctx.activeTab === 'plans') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    const __VLS_69 = PlanStudioCanvas;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        ...{ 'onSave': {} },
        ...{ 'onSetFeatured': {} },
        existingPlans: (__VLS_ctx.plans),
        saving: (__VLS_ctx.actionLoading),
    }));
    const __VLS_71 = __VLS_70({
        ...{ 'onSave': {} },
        ...{ 'onSetFeatured': {} },
        existingPlans: (__VLS_ctx.plans),
        saving: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    let __VLS_74;
    const __VLS_75 = {
        /** @type {typeof __VLS_74.save} */
        onSave: (__VLS_ctx.handlePlanSave),
    };
    const __VLS_76 = {
        /** @type {typeof __VLS_74.setFeatured} */
        onSetFeatured: (__VLS_ctx.handleSetFeatured),
    };
    var __VLS_72;
    var __VLS_73;
}
else if (__VLS_ctx.activeTab === 'staff') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col gap-8" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
    const __VLS_77 = StaffManagementTable;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        ...{ 'onCreateStaff': {} },
        ...{ 'onRefresh': {} },
        staffList: (__VLS_ctx.staffList),
        loading: (__VLS_ctx.loadingStaff),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_79 = __VLS_78({
        ...{ 'onCreateStaff': {} },
        ...{ 'onRefresh': {} },
        staffList: (__VLS_ctx.staffList),
        loading: (__VLS_ctx.loadingStaff),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    let __VLS_82;
    const __VLS_83 = {
        /** @type {typeof __VLS_82.createStaff} */
        onCreateStaff: (...[$event]) => {
            if (!!(__VLS_ctx.activeTab === 'tenants'))
                throw 0;
            if (!!(__VLS_ctx.activeTab === 'affiliate'))
                throw 0;
            if (!!(__VLS_ctx.activeTab === 'plans'))
                throw 0;
            if (!(__VLS_ctx.activeTab === 'staff'))
                throw 0;
            return (__VLS_ctx.staffModalOpen = true);
            // @ts-ignore
            [activeTab, activeTab, activeTab, activeTab, currentRole, currentRole, currentRole, currentRole, exitImpersonation, handleLogout, tenants, loadingTenants, openTenantDrawer, startImpersonate, startImpersonate, openOverrideModal, openOverrideModal, toggleTenantSuspend, loadTenants, drawerOpen, selectedTenant, selectedTenant, overrideModalOpen, actionLoading, actionLoading, actionLoading, actionLoading, handlePlanOverride, partners, partners, loadingAffiliates, openPayoutModal, openPartnerModal, loadAffiliates, promoCodes, loadingPromoCodes, openPromoCodeModal, togglePromoCode, loadPromoCodes, payoutModalOpen, selectedPartner, handlePayoutSubmit, promoModalOpen, handlePromoCodeSubmit, plans, handlePlanSave, handleSetFeatured, staffList, loadingStaff, staffModalOpen,];
        },
    };
    const __VLS_84 = {
        /** @type {typeof __VLS_82.refresh} */
        onRefresh: (__VLS_ctx.loadStaff),
    };
    var __VLS_80;
    var __VLS_81;
    if (__VLS_ctx.currentRole !== 'SALES_MANAGER') {
        const __VLS_85 = SecurityAuditLogTable;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
            ...{ 'onRefresh': {} },
            logs: (__VLS_ctx.auditLogs),
            loading: (__VLS_ctx.loadingAuditLogs),
        }));
        const __VLS_87 = __VLS_86({
            ...{ 'onRefresh': {} },
            logs: (__VLS_ctx.auditLogs),
            loading: (__VLS_ctx.loadingAuditLogs),
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
        let __VLS_90;
        const __VLS_91 = {
            /** @type {typeof __VLS_90.refresh} */
            onRefresh: (__VLS_ctx.loadAuditLogs),
        };
        var __VLS_88;
        var __VLS_89;
    }
    const __VLS_92 = StaffInviteModal;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.staffModalOpen),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_94 = __VLS_93({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.staffModalOpen),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    let __VLS_97;
    const __VLS_98 = {
        /** @type {typeof __VLS_97.submit} */
        onSubmit: (__VLS_ctx.handleStaffCreate),
    };
    var __VLS_95;
    var __VLS_96;
}
// @ts-ignore
[currentRole, actionLoading, staffModalOpen, loadStaff, auditLogs, loadingAuditLogs, loadAuditLogs, handleStaffCreate,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
