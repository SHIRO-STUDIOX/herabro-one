import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
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
// Navigation & Roles
const activeTab = ref('tenants');
const currentRole = ref('SUPER_ADMIN');
const apiConnected = ref(false);
const adminProfile = ref({
    id: 1,
    username: 'superadmin',
    mobile: '09120000000',
    role: 'SUPER_ADMIN',
    is_active: true,
});
// Impersonation
const isImpersonating = ref(false);
const impersonatedTenant = ref(null);
const impersonationTicket = ref(null);
// State Data
const tenants = ref([]);
const partners = ref([]);
const promoCodes = ref([]);
const plans = ref([]);
const staffList = ref([]);
const auditLogs = ref([]);
// Loadings & Modals
const loadingTenants = ref(false);
const loadingAffiliates = ref(false);
const loadingPromoCodes = ref(false);
const loadingStaff = ref(false);
const loadingAuditLogs = ref(false);
const actionLoading = ref(false);
const selectedTenant = ref(null);
const drawerOpen = ref(false);
const overrideModalOpen = ref(false);
const selectedPartner = ref(null);
const payoutModalOpen = ref(false);
const promoModalOpen = ref(false);
const staffModalOpen = ref(false);
// Inspector
const lastEventTitle = ref('راه‌اندازی سندباکس');
const lastEventPayload = ref({
    role: currentRole.value,
    timestamp: new Date().toISOString(),
    ready: true,
});
const navItems = [
    { id: 'tenants', label: 'مدیریت مستأجران و فضاها', icon: 'solar:shop-2-bold-duotone' },
    { id: 'affiliate', label: 'همکاران فروش و تسویه', icon: 'solar:wallet-money-bold-duotone' },
    { id: 'plans', label: 'استودیوی پلن‌ها و تعرفه‌ها', icon: 'solar:layers-minimalistic-bold-duotone' },
    { id: 'staff', label: 'تیم مدیریت و لاگ‌های امنیتی', icon: 'solar:shield-check-bold-duotone' },
];
onMounted(async () => {
    await checkApiHealthAndLoad();
});
async function checkApiHealthAndLoad() {
    try {
        const data = await adminApiService.getTenants();
        apiConnected.value = true;
        tenants.value = data.results || data;
        lastEventTitle.value = 'اتصال موفقیت‌آمیز به بک‌اند پورت 8001';
        lastEventPayload.value = { api_status: 'ONLINE', tenants_count: tenants.value.length };
    }
    catch {
        apiConnected.value = false;
        loadLocalFallbackTenants();
    }
    loadAffiliates();
    loadPromoCodes();
    loadPlans();
    loadStaff();
    loadAuditLogs();
}
function onRoleChanged(role) {
    currentRole.value = role;
    adminProfile.value.role = role;
    lastEventTitle.value = `تغییر نقش تستی به ${role}`;
    lastEventPayload.value = { role, permissions_updated: true };
}
// 1. Tenants Methods
async function loadTenants() {
    loadingTenants.value = true;
    try {
        const data = await adminApiService.getTenants();
        tenants.value = data.results || data;
        apiConnected.value = true;
    }
    catch {
        loadLocalFallbackTenants();
    }
    finally {
        loadingTenants.value = false;
    }
}
function loadLocalFallbackTenants() {
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
function openTenantDrawer(tenant) {
    selectedTenant.value = tenant;
    drawerOpen.value = true;
    lastEventTitle.value = `مشاهده جزئیات مستأجر ${tenant.title}`;
    lastEventPayload.value = tenant;
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
        lastEventTitle.value = `تمدید دستی پلن ${selectedTenant.value.title}`;
        lastEventPayload.value = payload;
        await loadTenants();
    }
    catch (err) {
        // In offline mock mode, update locally
        selectedTenant.value.current_plan_slug = payload.plan_slug;
        selectedTenant.value.max_invoices_limit = payload.invoices_limit;
        overrideModalOpen.value = false;
        lastEventTitle.value = `تمدید دستی پلن (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = payload;
    }
    finally {
        actionLoading.value = false;
    }
}
async function toggleTenantSuspend(tenant) {
    try {
        if (tenant.is_suspended) {
            await adminApiService.activateTenant(tenant.id);
            tenant.is_suspended = false;
            tenant.subscription_status = 'ACTIVE';
            lastEventTitle.value = `رفع تعلیق مستأجر ${tenant.title}`;
        }
        else {
            await adminApiService.suspendTenant(tenant.id, 'نقض قوانین در سندباکس');
            tenant.is_suspended = true;
            tenant.subscription_status = 'SUSPENDED';
            lastEventTitle.value = `مسدودسازی مستأجر ${tenant.title}`;
        }
        lastEventPayload.value = { tenant_id: tenant.id, is_suspended: tenant.is_suspended };
    }
    catch {
        tenant.is_suspended = !tenant.is_suspended;
        tenant.subscription_status = tenant.is_suspended ? 'SUSPENDED' : 'ACTIVE';
        lastEventTitle.value = `تغییر وضعیت مسدودسازی (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = { tenant_id: tenant.id, is_suspended: tenant.is_suspended };
    }
}
async function startImpersonate(tenant) {
    try {
        const res = await adminApiService.impersonateTenant(tenant.id);
        impersonationTicket.value = res;
        impersonatedTenant.value = tenant;
        isImpersonating.value = true;
        lastEventTitle.value = `صدور تیکت Impersonate برای ${tenant.title}`;
        lastEventPayload.value = res;
    }
    catch {
        // Mock simulation
        impersonationTicket.value = {
            ticket: 'imp_mock_token_928374',
            impersonation_url: 'http://localhost:3000/auth/impersonate-callback?ticket=mock',
            core_tenant_id: tenant.core_tenant_id,
            admin_staff_id: 1,
            role: currentRole.value,
            is_impersonated: true,
            expires_at: new Date(Date.now() + 900000).toISOString(),
            ttl_seconds: 900,
        };
        impersonatedTenant.value = tenant;
        isImpersonating.value = true;
        lastEventTitle.value = `شبیه‌سازی ورود نظارتی (Impersonate)`;
        lastEventPayload.value = impersonationTicket.value;
    }
}
function exitImpersonation() {
    isImpersonating.value = false;
    impersonatedTenant.value = null;
    impersonationTicket.value = null;
    lastEventTitle.value = 'خروج از حالت ورود پشتیبان';
    lastEventPayload.value = { status: 'EXITED' };
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
        .catch(() => {
        partners.value.push({
            id: Date.now(),
            name,
            mobile,
            promo_code_prefix: name.slice(0, 4).toUpperCase(),
            commission_type: 'PERCENT',
            commission_value: 15,
            sheba_number: 'IR420170000000010032420001',
            wallet_balance_rial: 0,
            is_active: true,
            created_at: new Date().toISOString(),
        });
    });
}
async function handlePayoutSubmit(payload) {
    if (!selectedPartner.value)
        return;
    actionLoading.value = true;
    try {
        await adminApiService.executePayout(selectedPartner.value.id, payload);
        payoutModalOpen.value = false;
        lastEventTitle.value = `ثبت حواله تسویه پایا برای ${selectedPartner.value.name}`;
        lastEventPayload.value = payload;
        await loadAffiliates();
    }
    catch (err) {
        // Offline simulated deduction
        selectedPartner.value.wallet_balance_rial -= payload.amount_rial;
        payoutModalOpen.value = false;
        lastEventTitle.value = `تسویه پایا (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = payload;
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
        lastEventTitle.value = `ساخت کد تخفیف جدید ${payload.code}`;
        lastEventPayload.value = payload;
        await loadPromoCodes();
    }
    catch {
        promoCodes.value.push({
            id: Date.now(),
            code: payload.code || 'COUPON',
            discount_percent: payload.discount_percent || 0,
            discount_amount_rial: payload.discount_amount_rial || 0,
            max_uses: payload.max_uses || 100,
            used_count: 0,
            is_active: true,
        });
        promoModalOpen.value = false;
        lastEventTitle.value = `ساخت کد تخفیف (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = payload;
    }
    finally {
        actionLoading.value = false;
    }
}
async function togglePromoCode(id, isActive) {
    try {
        await adminApiService.togglePromoCode(id, isActive);
        lastEventTitle.value = `تغییر وضعیت کد تخفیف #${id} به ${isActive ? 'فعال' : 'غیرفعال'}`;
        lastEventPayload.value = { id, is_active: isActive };
    }
    catch {
        const p = promoCodes.value.find((x) => x.id === id);
        if (p)
            p.is_active = isActive;
        lastEventTitle.value = `تغییر وضعیت کد تخفیف #${id} (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = { id, is_active: isActive };
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
        lastEventTitle.value = `ذخیره پلن استودیو: ${planData.title}`;
        lastEventPayload.value = planData;
        await loadPlans();
    }
    catch {
        lastEventTitle.value = `ذخیره پلن استودیو (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = planData;
    }
    finally {
        actionLoading.value = false;
    }
}
async function handleSetFeatured(planId, badgeText) {
    try {
        await adminApiService.setFeaturedPlan(planId, badgeText);
        lastEventTitle.value = `اعمال نشان پلن اصلی پلتفرم برای پلن #${planId}`;
        lastEventPayload.value = { plan_id: planId, badge_text: badgeText };
        await loadPlans();
    }
    catch {
        plans.value.forEach((p) => {
            p.is_featured = p.id === planId;
            if (p.is_featured)
                p.featured_badge_text = badgeText;
        });
        lastEventTitle.value = `سوییچ پلن اصلی به #${planId} (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = { plan_id: planId, badge_text: badgeText };
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
        lastEventTitle.value = `تعریف کارمند ادمین جدید: @${payload.username}`;
        lastEventPayload.value = payload;
        await loadStaff();
    }
    catch {
        staffList.value.push({
            id: Date.now(),
            username: String(payload.username || 'admin'),
            mobile: String(payload.mobile || '09120000000'),
            role: payload.role,
            is_active: true,
        });
        staffModalOpen.value = false;
        lastEventTitle.value = `تعریف کارمند ادمین (شبیه‌سازی آفلاین)`;
        lastEventPayload.value = payload;
    }
    finally {
        actionLoading.value = false;
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex flex-col font-sans select-none text-right" },
    dir: "rtl",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full bg-primary-100 text-white-100 px-6 py-3 flex items-center justify-between shadow-md shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-7 h-7 rounded-lg bg-white-20 flex items-center justify-center text-white-100" },
});
/** @type {__VLS_StyleScopedClasses['w-7']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: "solar:test-tube-minimalistic-bold-duotone",
    ...{ class: "w-4 h-4 text-white-100" },
}));
const __VLS_2 = __VLS_1({
    icon: "solar:test-tube-minimalistic-bold-duotone",
    ...{ class: "w-4 h-4 text-white-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs font-black" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-mono px-2 py-0.5 rounded-full bg-white-12 text-white-80" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-80']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5 text-2xs font-medium text-white-80" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-80']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "w-2.5 h-2.5 rounded-full" },
    ...{ class: (__VLS_ctx.apiConnected ? 'bg-success-100 animate-pulse' : 'bg-warning-100') },
});
/** @type {__VLS_StyleScopedClasses['w-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-mono font-bold" },
    ...{ class: (__VLS_ctx.apiConnected ? 'text-success-100' : 'text-warning-100') },
});
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
(__VLS_ctx.apiConnected ? 'متصل (Online)' : 'شبیه‌سازی آفلاین (Mocked)');
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link'] | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components['router-link']} */
routerLink;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    to: "/admin/dashboard",
    ...{ class: "text-2xs font-bold text-white-100 bg-white-12 hover:bg-white-20 px-3 py-1.5 rounded-xl transition-all" },
}));
const __VLS_7 = __VLS_6({
    to: "/admin/dashboard",
    ...{ class: "text-2xs font-bold text-white-100 bg-white-12 hover:bg-white-20 px-3 py-1.5 rounded-xl transition-all" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-12']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white-20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
const { default: __VLS_10 } = __VLS_8.slots;
// @ts-ignore
[apiConnected, apiConnected, apiConnected,];
var __VLS_8;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-[calc(100vh-48px)] flex flex-col overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['h-[calc(100vh-48px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
const __VLS_11 = AdminAppShell || AdminAppShell;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
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
const __VLS_13 = __VLS_12({
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
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_16;
const __VLS_17 = {
    /** @type {typeof __VLS_16.changeRole} */
    onChangeRole: (__VLS_ctx.onRoleChanged),
};
const __VLS_18 = {
    /** @type {typeof __VLS_16.exitImpersonation} */
    onExitImpersonation: (__VLS_ctx.exitImpersonation),
};
const __VLS_19 = {
    /** @type {typeof __VLS_16.logout} */
    onLogout: (...[$event]) => {
        return (__VLS_ctx.activeTab = 'tenants');
        // @ts-ignore
        [activeTab, activeTab, currentRole, navItems, adminProfile, isImpersonating, impersonatedTenant, impersonationTicket, impersonationTicket, onRoleChanged, exitImpersonation,];
    },
};
const { default: __VLS_20 } = __VLS_14.slots;
if (__VLS_ctx.activeTab === 'tenants') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col gap-6" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    const __VLS_21 = TenantDirectoryTable;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        ...{ 'onSelect': {} },
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        ...{ 'onToggleSuspend': {} },
        ...{ 'onRefresh': {} },
        tenants: (__VLS_ctx.tenants),
        loading: (__VLS_ctx.loadingTenants),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onSelect': {} },
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        ...{ 'onToggleSuspend': {} },
        ...{ 'onRefresh': {} },
        tenants: (__VLS_ctx.tenants),
        loading: (__VLS_ctx.loadingTenants),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_26;
    const __VLS_27 = {
        /** @type {typeof __VLS_26.select} */
        onSelect: (__VLS_ctx.openTenantDrawer),
    };
    const __VLS_28 = {
        /** @type {typeof __VLS_26.impersonate} */
        onImpersonate: (__VLS_ctx.startImpersonate),
    };
    const __VLS_29 = {
        /** @type {typeof __VLS_26.overridePlan} */
        onOverridePlan: (__VLS_ctx.openOverrideModal),
    };
    const __VLS_30 = {
        /** @type {typeof __VLS_26.toggleSuspend} */
        onToggleSuspend: (__VLS_ctx.toggleTenantSuspend),
    };
    const __VLS_31 = {
        /** @type {typeof __VLS_26.refresh} */
        onRefresh: (__VLS_ctx.loadTenants),
    };
    var __VLS_24;
    var __VLS_25;
    const __VLS_32 = TenantDetailDrawer;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        modelValue: (__VLS_ctx.drawerOpen),
        tenant: (__VLS_ctx.selectedTenant),
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onImpersonate': {} },
        ...{ 'onOverridePlan': {} },
        modelValue: (__VLS_ctx.drawerOpen),
        tenant: (__VLS_ctx.selectedTenant),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_37;
    const __VLS_38 = {
        /** @type {typeof __VLS_37.impersonate} */
        onImpersonate: (__VLS_ctx.startImpersonate),
    };
    const __VLS_39 = {
        /** @type {typeof __VLS_37.overridePlan} */
        onOverridePlan: (__VLS_ctx.openOverrideModal),
    };
    var __VLS_35;
    var __VLS_36;
    const __VLS_40 = ManualPlanOverrideModal;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.overrideModalOpen),
        tenant: (__VLS_ctx.selectedTenant),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.overrideModalOpen),
        tenant: (__VLS_ctx.selectedTenant),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_45;
    const __VLS_46 = {
        /** @type {typeof __VLS_45.submit} */
        onSubmit: (__VLS_ctx.handlePlanOverride),
    };
    var __VLS_43;
    var __VLS_44;
}
else if (__VLS_ctx.activeTab === 'affiliate') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col gap-8" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
    const __VLS_47 = AffiliatePartnersTable;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        ...{ 'onPayout': {} },
        ...{ 'onCreatePartner': {} },
        ...{ 'onRefresh': {} },
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.loadingAffiliates),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_49 = __VLS_48({
        ...{ 'onPayout': {} },
        ...{ 'onCreatePartner': {} },
        ...{ 'onRefresh': {} },
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.loadingAffiliates),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    let __VLS_52;
    const __VLS_53 = {
        /** @type {typeof __VLS_52.payout} */
        onPayout: (__VLS_ctx.openPayoutModal),
    };
    const __VLS_54 = {
        /** @type {typeof __VLS_52.createPartner} */
        onCreatePartner: (__VLS_ctx.openPartnerModal),
    };
    const __VLS_55 = {
        /** @type {typeof __VLS_52.refresh} */
        onRefresh: (__VLS_ctx.loadAffiliates),
    };
    var __VLS_50;
    var __VLS_51;
    const __VLS_56 = PromoCodesTable;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
        ...{ 'onCreate': {} },
        ...{ 'onToggle': {} },
        ...{ 'onRefresh': {} },
        promoCodes: (__VLS_ctx.promoCodes),
        loading: (__VLS_ctx.loadingPromoCodes),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onCreate': {} },
        ...{ 'onToggle': {} },
        ...{ 'onRefresh': {} },
        promoCodes: (__VLS_ctx.promoCodes),
        loading: (__VLS_ctx.loadingPromoCodes),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_61;
    const __VLS_62 = {
        /** @type {typeof __VLS_61.create} */
        onCreate: (__VLS_ctx.openPromoCodeModal),
    };
    const __VLS_63 = {
        /** @type {typeof __VLS_61.toggle} */
        onToggle: (__VLS_ctx.togglePromoCode),
    };
    const __VLS_64 = {
        /** @type {typeof __VLS_61.refresh} */
        onRefresh: (__VLS_ctx.loadPromoCodes),
    };
    var __VLS_59;
    var __VLS_60;
    const __VLS_65 = PayoutProcessModal;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.payoutModalOpen),
        partner: (__VLS_ctx.selectedPartner),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_67 = __VLS_66({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.payoutModalOpen),
        partner: (__VLS_ctx.selectedPartner),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    let __VLS_70;
    const __VLS_71 = {
        /** @type {typeof __VLS_70.submit} */
        onSubmit: (__VLS_ctx.handlePayoutSubmit),
    };
    var __VLS_68;
    var __VLS_69;
    const __VLS_72 = PromoCodeFormModal;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.promoModalOpen),
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_74 = __VLS_73({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.promoModalOpen),
        partners: (__VLS_ctx.partners),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    let __VLS_77;
    const __VLS_78 = {
        /** @type {typeof __VLS_77.submit} */
        onSubmit: (__VLS_ctx.handlePromoCodeSubmit),
    };
    var __VLS_75;
    var __VLS_76;
}
else if (__VLS_ctx.activeTab === 'plans') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    const __VLS_79 = PlanStudioCanvas;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        ...{ 'onSave': {} },
        ...{ 'onSetFeatured': {} },
        existingPlans: (__VLS_ctx.plans),
        saving: (__VLS_ctx.actionLoading),
    }));
    const __VLS_81 = __VLS_80({
        ...{ 'onSave': {} },
        ...{ 'onSetFeatured': {} },
        existingPlans: (__VLS_ctx.plans),
        saving: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    let __VLS_84;
    const __VLS_85 = {
        /** @type {typeof __VLS_84.save} */
        onSave: (__VLS_ctx.handlePlanSave),
    };
    const __VLS_86 = {
        /** @type {typeof __VLS_84.setFeatured} */
        onSetFeatured: (__VLS_ctx.handleSetFeatured),
    };
    var __VLS_82;
    var __VLS_83;
}
else if (__VLS_ctx.activeTab === 'staff') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full flex flex-col gap-8" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
    const __VLS_87 = StaffManagementTable;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
        ...{ 'onCreateStaff': {} },
        ...{ 'onRefresh': {} },
        staffList: (__VLS_ctx.staffList),
        loading: (__VLS_ctx.loadingStaff),
        currentRole: (__VLS_ctx.currentRole),
    }));
    const __VLS_89 = __VLS_88({
        ...{ 'onCreateStaff': {} },
        ...{ 'onRefresh': {} },
        staffList: (__VLS_ctx.staffList),
        loading: (__VLS_ctx.loadingStaff),
        currentRole: (__VLS_ctx.currentRole),
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    let __VLS_92;
    const __VLS_93 = {
        /** @type {typeof __VLS_92.createStaff} */
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
            [activeTab, activeTab, activeTab, activeTab, currentRole, currentRole, currentRole, currentRole, tenants, loadingTenants, openTenantDrawer, startImpersonate, startImpersonate, openOverrideModal, openOverrideModal, toggleTenantSuspend, loadTenants, drawerOpen, selectedTenant, selectedTenant, overrideModalOpen, actionLoading, actionLoading, actionLoading, actionLoading, handlePlanOverride, partners, partners, loadingAffiliates, openPayoutModal, openPartnerModal, loadAffiliates, promoCodes, loadingPromoCodes, openPromoCodeModal, togglePromoCode, loadPromoCodes, payoutModalOpen, selectedPartner, handlePayoutSubmit, promoModalOpen, handlePromoCodeSubmit, plans, handlePlanSave, handleSetFeatured, staffList, loadingStaff, staffModalOpen,];
        },
    };
    const __VLS_94 = {
        /** @type {typeof __VLS_92.refresh} */
        onRefresh: (__VLS_ctx.loadStaff),
    };
    var __VLS_90;
    var __VLS_91;
    if (__VLS_ctx.currentRole !== 'SALES_MANAGER') {
        const __VLS_95 = SecurityAuditLogTable;
        // @ts-ignore
        const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
            ...{ 'onRefresh': {} },
            logs: (__VLS_ctx.auditLogs),
            loading: (__VLS_ctx.loadingAuditLogs),
        }));
        const __VLS_97 = __VLS_96({
            ...{ 'onRefresh': {} },
            logs: (__VLS_ctx.auditLogs),
            loading: (__VLS_ctx.loadingAuditLogs),
        }, ...__VLS_functionalComponentArgsRest(__VLS_96));
        let __VLS_100;
        const __VLS_101 = {
            /** @type {typeof __VLS_100.refresh} */
            onRefresh: (__VLS_ctx.loadAuditLogs),
        };
        var __VLS_98;
        var __VLS_99;
    }
    const __VLS_102 = StaffInviteModal;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.staffModalOpen),
        loading: (__VLS_ctx.actionLoading),
    }));
    const __VLS_104 = __VLS_103({
        ...{ 'onSubmit': {} },
        modelValue: (__VLS_ctx.staffModalOpen),
        loading: (__VLS_ctx.actionLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    let __VLS_107;
    const __VLS_108 = {
        /** @type {typeof __VLS_107.submit} */
        onSubmit: (__VLS_ctx.handleStaffCreate),
    };
    var __VLS_105;
    var __VLS_106;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-12 p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col gap-3 shadow-2xs" },
});
/** @type {__VLS_StyleScopedClasses['mt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xs']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between border-b border-primary-6 pb-2.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_109;
/** @ts-ignore @type { | typeof __VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
    icon: "solar:code-scan-bold-duotone",
    ...{ class: "w-5 h-5 text-primary-100" },
}));
const __VLS_111 = __VLS_110({
    icon: "solar:code-scan-bold-duotone",
    ...{ class: "w-5 h-5 text-primary-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
    ...{ class: "text-xs font-black text-primary-100" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xs font-mono text-primary-40" },
});
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-40']} */ ;
(__VLS_ctx.lastEventTitle || 'بارگذاری اولیه داده‌ها');
__VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
    ...{ class: "w-full p-4 rounded-xl bg-primary-1/60 border border-primary-8 text-2xs font-mono text-primary-100 overflow-x-auto text-left leading-relaxed max-h-64" },
    dir: "ltr",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-1/60']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-64']} */ ;
(JSON.stringify(__VLS_ctx.lastEventPayload, null, 2));
// @ts-ignore
[currentRole, actionLoading, staffModalOpen, loadStaff, auditLogs, loadingAuditLogs, loadAuditLogs, handleStaffCreate, lastEventTitle, lastEventPayload,];
var __VLS_14;
var __VLS_15;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
