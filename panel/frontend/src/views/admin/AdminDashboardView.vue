<template>
  <AdminAppShell
    v-model:active-tab="activeTab"
    :current-role="currentRole"
    :nav-items="navItems"
    :admin="adminProfile"
    :is-impersonating="isImpersonating"
    :impersonated-tenant-title="impersonatedTenant?.title"
    :impersonation-expires-at="impersonationTicket?.expires_at ? new Date(impersonationTicket.expires_at).toLocaleTimeString('fa-IR') : undefined"
    @change-role="currentRole = $event"
    @exit-impersonation="exitImpersonation"
    @logout="handleLogout"
  >
    <!-- Tab 1: Tenants & Spaces Directory -->
    <div v-if="activeTab === 'tenants'" class="w-full flex flex-col gap-6">
      <TenantDirectoryTable
        :tenants="tenants"
        :loading="loadingTenants"
        :current-role="currentRole"
        @select="openTenantDrawer"
        @impersonate="startImpersonate"
        @override-plan="openOverrideModal"
        @toggle-suspend="toggleTenantSuspend"
        @refresh="loadTenants"
      />

      <!-- Tenant Detail Drawer -->
      <TenantDetailDrawer
        v-model="drawerOpen"
        :tenant="selectedTenant"
        @impersonate="startImpersonate"
        @override-plan="openOverrideModal"
      />

      <!-- Manual Plan Override Modal -->
      <ManualPlanOverrideModal
        v-model="overrideModalOpen"
        :tenant="selectedTenant"
        :loading="actionLoading"
        @submit="handlePlanOverride"
      />
    </div>

    <!-- Tab 2: Affiliate & Promo Codes -->
    <div v-else-if="activeTab === 'affiliate'" class="w-full flex flex-col gap-8">
      <!-- Partners & Wallet -->
      <AffiliatePartnersTable
        :partners="partners"
        :loading="loadingAffiliates"
        :current-role="currentRole"
        @payout="openPayoutModal"
        @create-partner="openPartnerModal"
        @refresh="loadAffiliates"
      />

      <!-- Promo Codes Table -->
      <PromoCodesTable
        :promo-codes="promoCodes"
        :loading="loadingPromoCodes"
        :current-role="currentRole"
        @create="openPromoCodeModal"
        @toggle="togglePromoCode"
        @refresh="loadPromoCodes"
      />

      <!-- Payout Modal -->
      <PayoutProcessModal
        v-model="payoutModalOpen"
        :partner="selectedPartner"
        :loading="actionLoading"
        @submit="handlePayoutSubmit"
      />

      <!-- Promo Code Form Modal -->
      <PromoCodeFormModal
        v-model="promoModalOpen"
        :partners="partners"
        :loading="actionLoading"
        @submit="handlePromoCodeSubmit"
      />
    </div>

    <!-- Tab 3: Dynamic Plans Studio -->
    <div v-else-if="activeTab === 'plans'" class="w-full">
      <PlanStudioCanvas
        :existing-plans="plans"
        :saving="actionLoading"
        @save="handlePlanSave"
        @set-featured="handleSetFeatured"
      />
    </div>

    <!-- Tab 4: Staff & Security Audit Trail -->
    <div v-else-if="activeTab === 'staff'" class="w-full flex flex-col gap-8">
      <StaffManagementTable
        :staff-list="staffList"
        :loading="loadingStaff"
        :current-role="currentRole"
        @create-staff="staffModalOpen = true"
        @refresh="loadStaff"
      />

      <SecurityAuditLogTable
        v-if="currentRole !== 'SALES_MANAGER'"
        :logs="auditLogs"
        :loading="loadingAuditLogs"
        @refresh="loadAuditLogs"
      />

      <!-- Staff Invite Modal -->
      <StaffInviteModal
        v-model="staffModalOpen"
        :loading="actionLoading"
        @submit="handleStaffCreate"
      />
    </div>
  </AdminAppShell>
</template>

<script setup lang="ts">
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
import type {
  AdminProfile,
  AdminRole,
  TenantRecordItem,
  AffiliatePartnerItem,
  PromoCodeItem,
  AdminPlanItem,
  SecurityAuditLogItem,
  ImpersonationTicketResponse,
} from '@/types/admin';

const router = useRouter();

// State
const activeTab = ref('tenants');
const currentRole = ref<AdminRole>('SUPER_ADMIN');
const adminProfile = ref<AdminProfile | null>(null);

// Impersonation state
const isImpersonating = ref(false);
const impersonatedTenant = ref<TenantRecordItem | null>(null);
const impersonationTicket = ref<ImpersonationTicketResponse | null>(null);

// Data
const tenants = ref<TenantRecordItem[]>([]);
const partners = ref<AffiliatePartnerItem[]>([]);
const promoCodes = ref<PromoCodeItem[]>([]);
const plans = ref<AdminPlanItem[]>([]);
const staffList = ref<AdminProfile[]>([]);
const auditLogs = ref<SecurityAuditLogItem[]>([]);

// Loadings
const loadingTenants = ref(false);
const loadingAffiliates = ref(false);
const loadingPromoCodes = ref(false);
const loadingStaff = ref(false);
const loadingAuditLogs = ref(false);
const actionLoading = ref(false);

// Modals
const selectedTenant = ref<TenantRecordItem | null>(null);
const drawerOpen = ref(false);
const overrideModalOpen = ref(false);

const selectedPartner = ref<AffiliatePartnerItem | null>(null);
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
  } catch {
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
    tenants.value = data.results || (data as unknown as TenantRecordItem[]);
  } catch (err) {
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
  } finally {
    loadingTenants.value = false;
  }
}

function openTenantDrawer(tenant: TenantRecordItem) {
  selectedTenant.value = tenant;
  drawerOpen.value = true;
}

function openOverrideModal(tenant: TenantRecordItem) {
  selectedTenant.value = tenant;
  overrideModalOpen.value = true;
}

async function handlePlanOverride(payload: { plan_slug: string; days: number; invoices_limit: number }) {
  if (!selectedTenant.value) return;
  actionLoading.value = true;
  try {
    await adminApiService.manualOverridePlan(selectedTenant.value.id, payload);
    overrideModalOpen.value = false;
    await loadTenants();
  } catch (err: any) {
    alert(err.response?.data?.detail || 'خطا در اعمال تغییرات پلن مستأجر.');
  } finally {
    actionLoading.value = false;
  }
}

async function toggleTenantSuspend(tenant: TenantRecordItem) {
  try {
    if (tenant.is_suspended) {
      await adminApiService.activateTenant(tenant.id);
    } else {
      const reason = prompt('لطفاً دلیل مسدودسازی را وارد کنید:', 'نقض قوانین پلتفرم حسابرو وان') || '';
      await adminApiService.suspendTenant(tenant.id, reason);
    }
    await loadTenants();
  } catch (err: any) {
    alert(err.response?.data?.detail || 'خطا در تغییر وضعیت مسدودسازی مستأجر.');
  }
}

async function startImpersonate(tenant: TenantRecordItem) {
  try {
    const res = await adminApiService.impersonateTenant(tenant.id);
    impersonationTicket.value = res;
    impersonatedTenant.value = tenant;
    isImpersonating.value = true;
  } catch (err: any) {
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
    partners.value = data.results || (data as unknown as AffiliatePartnerItem[]);
  } catch {
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
  } finally {
    loadingAffiliates.value = false;
  }
}

function openPayoutModal(partner: AffiliatePartnerItem) {
  selectedPartner.value = partner;
  payoutModalOpen.value = true;
}

function openPartnerModal() {
  const name = prompt('نام همکار جدید:');
  if (!name) return;
  const mobile = prompt('شماره همراه:');
  if (!mobile) return;
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

async function handlePayoutSubmit(payload: { amount_rial: number; tracking_code: string; notes: string }) {
  if (!selectedPartner.value) return;
  actionLoading.value = true;
  try {
    await adminApiService.executePayout(selectedPartner.value.id, payload);
    payoutModalOpen.value = false;
    await loadAffiliates();
  } catch (err: any) {
    alert(err.response?.data?.amount_rial || err.response?.data?.detail || 'خطا در ثبت تسویه پایا.');
  } finally {
    actionLoading.value = false;
  }
}

// 3. Promo Codes
async function loadPromoCodes() {
  loadingPromoCodes.value = true;
  try {
    const data = await adminApiService.getPromoCodes();
    promoCodes.value = data.results || (data as unknown as PromoCodeItem[]);
  } catch {
    promoCodes.value = [
      { id: 1, code: 'ALIM1405', partner_name: 'علی محمدی', discount_percent: 15, discount_amount_rial: 0, max_uses: 200, used_count: 42, is_active: true },
      { id: 2, code: 'PERSIAN20', partner_name: 'شرکت بازاریابی پرشین', discount_percent: 20, discount_amount_rial: 0, max_uses: 500, used_count: 118, is_active: true },
    ];
  } finally {
    loadingPromoCodes.value = false;
  }
}

function openPromoCodeModal() {
  promoModalOpen.value = true;
}

async function handlePromoCodeSubmit(payload: Partial<PromoCodeItem>) {
  actionLoading.value = true;
  try {
    await adminApiService.createPromoCode(payload);
    promoModalOpen.value = false;
    await loadPromoCodes();
  } catch (err: any) {
    alert(JSON.stringify(err.response?.data || 'خطا در ثبت کد تخفیف.'));
  } finally {
    actionLoading.value = false;
  }
}

async function togglePromoCode(id: number, isActive: boolean) {
  try {
    await adminApiService.togglePromoCode(id, isActive);
    await loadPromoCodes();
  } catch (err: any) {
    alert(err.response?.data?.detail || 'خطا در تغییر وضعیت کد تخفیف.');
  }
}

// 4. Plans Studio
async function loadPlans() {
  try {
    const data = await adminApiService.getPlans();
    plans.value = data.results || (data as unknown as AdminPlanItem[]);
  } catch {
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

async function handlePlanSave(planData: Partial<AdminPlanItem>) {
  actionLoading.value = true;
  try {
    if (planData.id) {
      await adminApiService.updatePlan(planData.id, planData);
    } else {
      await adminApiService.createPlan(planData);
    }
    alert('پلن با موفقیت در پایگاه داده ذخیره و منتشر شد.');
    await loadPlans();
  } catch (err: any) {
    alert(JSON.stringify(err.response?.data || 'خطا در ذخیره پلن استودیو.'));
  } finally {
    actionLoading.value = false;
  }
}

async function handleSetFeatured(planId: number, badgeText: string) {
  try {
    await adminApiService.setFeaturedPlan(planId, badgeText);
    await loadPlans();
  } catch (err: any) {
    alert(err.response?.data?.detail || 'خطا در تنظیم پلن برگزیده.');
  }
}

// 5. Staff & Audit Logs
async function loadStaff() {
  loadingStaff.value = true;
  try {
    const data = await adminApiService.getStaff();
    staffList.value = data.results || (data as unknown as AdminProfile[]);
  } catch {
    staffList.value = [
      { id: 1, username: 'superadmin', mobile: '09120000000', role: 'SUPER_ADMIN', role_display: 'مدیر ارشد', is_active: true },
      { id: 2, username: 'support_agent', mobile: '09121111111', role: 'SUPPORT_AGENT', role_display: 'کارشناس پشتیبانی', is_active: true },
      { id: 3, username: 'sales_manager', mobile: '09122222222', role: 'SALES_MANAGER', role_display: 'مدیر فروش', is_active: true },
    ];
  } finally {
    loadingStaff.value = false;
  }
}

async function loadAuditLogs() {
  loadingAuditLogs.value = true;
  try {
    const data = await adminApiService.getAuditLogs();
    auditLogs.value = data.results || (data as unknown as SecurityAuditLogItem[]);
  } catch {
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
  } finally {
    loadingAuditLogs.value = false;
  }
}

async function handleStaffCreate(payload: Record<string, unknown>) {
  actionLoading.value = true;
  try {
    await adminApiService.createStaff(payload);
    staffModalOpen.value = false;
    await loadStaff();
  } catch (err: any) {
    alert(JSON.stringify(err.response?.data || 'خطا در تعریف دسترسی مدیر جدید.'));
  } finally {
    actionLoading.value = false;
  }
}

function handleLogout() {
  adminApiService.logout();
  router.push('/admin/login');
}
</script>
