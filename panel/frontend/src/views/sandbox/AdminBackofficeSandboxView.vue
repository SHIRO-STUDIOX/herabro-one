<template>
  <div class="w-full flex flex-col font-sans select-none text-right" dir="rtl">
    <!-- Top Sandbox Environment Header -->
    <div class="w-full bg-primary-100 text-white-100 px-6 py-3 flex items-center justify-between shadow-md shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-white-20 flex items-center justify-center text-white-100">
          <Icon icon="solar:test-tube-minimalistic-bold-duotone" class="w-4 h-4 text-white-100" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-black">محیط سندباکس و آزمایشی پنل مدیریت ارشد</span>
          <span class="text-2xs font-mono px-2 py-0.5 rounded-full bg-white-12 text-white-80">
            Hesabro Admin Backoffice Sandbox
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- Backend API Status Indicator -->
        <div class="flex items-center gap-1.5 text-2xs font-medium text-white-80">
          <span
            class="w-2.5 h-2.5 rounded-full"
            :class="apiConnected ? 'bg-success-100 animate-pulse' : 'bg-warning-100'"
          />
          <span>وضعیت وب‌سرویس پورت 8001:</span>
          <span class="font-mono font-bold" :class="apiConnected ? 'text-success-100' : 'text-warning-100'">
            {{ apiConnected ? 'متصل (Online)' : 'شبیه‌سازی آفلاین (Mocked)' }}
          </span>
        </div>

        <router-link
          to="/admin/dashboard"
          class="text-2xs font-bold text-white-100 bg-white-12 hover:bg-white-20 px-3 py-1.5 rounded-xl transition-all"
        >
          ورود به نمای عملیاتی داشبورد
        </router-link>
      </div>
    </div>

    <!-- App Shell Wrapper with Navigation and Active Tab Switch -->
    <div class="h-[calc(100vh-48px)] flex flex-col overflow-hidden">
      <AdminAppShell
        v-model:active-tab="activeTab"
        :current-role="currentRole"
        :nav-items="navItems"
        :admin="adminProfile"
        :is-impersonating="isImpersonating"
        :impersonated-tenant-title="impersonatedTenant?.title"
        :impersonation-expires-at="impersonationTicket?.expires_at ? new Date(impersonationTicket.expires_at).toLocaleTimeString('fa-IR') : undefined"
        @change-role="onRoleChanged"
        @exit-impersonation="exitImpersonation"
        @logout="activeTab = 'tenants'"
      >
        <!-- Tab 1: Tenants -->
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

          <TenantDetailDrawer
            v-model="drawerOpen"
            :tenant="selectedTenant"
            @impersonate="startImpersonate"
            @override-plan="openOverrideModal"
          />

          <ManualPlanOverrideModal
            v-model="overrideModalOpen"
            :tenant="selectedTenant"
            :loading="actionLoading"
            @submit="handlePlanOverride"
          />
        </div>

        <!-- Tab 2: Affiliate & Promo Codes -->
        <div v-else-if="activeTab === 'affiliate'" class="w-full flex flex-col gap-8">
          <AffiliatePartnersTable
            :partners="partners"
            :loading="loadingAffiliates"
            :current-role="currentRole"
            @payout="openPayoutModal"
            @create-partner="openPartnerModal"
            @refresh="loadAffiliates"
          />

          <PromoCodesTable
            :promo-codes="promoCodes"
            :loading="loadingPromoCodes"
            :current-role="currentRole"
            @create="openPromoCodeModal"
            @toggle="togglePromoCode"
            @refresh="loadPromoCodes"
          />

          <PayoutProcessModal
            v-model="payoutModalOpen"
            :partner="selectedPartner"
            :loading="actionLoading"
            @submit="handlePayoutSubmit"
          />

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

        <!-- Tab 4: Staff & Audit Trail -->
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

          <StaffInviteModal
            v-model="staffModalOpen"
            :loading="actionLoading"
            @submit="handleStaffCreate"
          />
        </div>

        <!-- Real-time JSON Inspection Panel at Bottom of Sandbox -->
        <div class="mt-12 p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col gap-3 shadow-2xs">
          <div class="flex items-center justify-between border-b border-primary-6 pb-2.5">
            <div class="flex items-center gap-2">
              <Icon icon="solar:code-scan-bold-duotone" class="w-5 h-5 text-primary-100" />
              <h4 class="text-xs font-black text-primary-100">
                جعبه بازرسی بلادرنگ تعاملات سندباکس (Live JSON Inspector)
              </h4>
            </div>
            <span class="text-2xs font-mono text-primary-40">
              آخرین رویداد: {{ lastEventTitle || 'بارگذاری اولیه داده‌ها' }}
            </span>
          </div>

          <pre class="w-full p-4 rounded-xl bg-primary-1/60 border border-primary-8 text-2xs font-mono text-primary-100 overflow-x-auto text-left leading-relaxed max-h-64" dir="ltr">{{ JSON.stringify(lastEventPayload, null, 2) }}</pre>
        </div>
      </AdminAppShell>
    </div>
  </div>
</template>

<script setup lang="ts">
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

// Navigation & Roles
const activeTab = ref('tenants');
const currentRole = ref<AdminRole>('SUPER_ADMIN');
const apiConnected = ref(false);

const adminProfile = ref<AdminProfile>({
  id: 1,
  username: 'superadmin',
  mobile: '09120000000',
  role: 'SUPER_ADMIN',
  is_active: true,
});

// Impersonation
const isImpersonating = ref(false);
const impersonatedTenant = ref<TenantRecordItem | null>(null);
const impersonationTicket = ref<ImpersonationTicketResponse | null>(null);

// State Data
const tenants = ref<TenantRecordItem[]>([]);
const partners = ref<AffiliatePartnerItem[]>([]);
const promoCodes = ref<PromoCodeItem[]>([]);
const plans = ref<AdminPlanItem[]>([]);
const staffList = ref<AdminProfile[]>([]);
const auditLogs = ref<SecurityAuditLogItem[]>([]);

// Loadings & Modals
const loadingTenants = ref(false);
const loadingAffiliates = ref(false);
const loadingPromoCodes = ref(false);
const loadingStaff = ref(false);
const loadingAuditLogs = ref(false);
const actionLoading = ref(false);

const selectedTenant = ref<TenantRecordItem | null>(null);
const drawerOpen = ref(false);
const overrideModalOpen = ref(false);

const selectedPartner = ref<AffiliatePartnerItem | null>(null);
const payoutModalOpen = ref(false);
const promoModalOpen = ref(false);
const staffModalOpen = ref(false);

// Inspector
const lastEventTitle = ref('راه‌اندازی سندباکس');
const lastEventPayload = ref<Record<string, unknown>>({
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
    tenants.value = data.results || (data as unknown as TenantRecordItem[]);
    lastEventTitle.value = 'اتصال موفقیت‌آمیز به بک‌اند پورت 8001';
    lastEventPayload.value = { api_status: 'ONLINE', tenants_count: tenants.value.length };
  } catch {
    apiConnected.value = false;
    loadLocalFallbackTenants();
  }

  loadAffiliates();
  loadPromoCodes();
  loadPlans();
  loadStaff();
  loadAuditLogs();
}

function onRoleChanged(role: AdminRole) {
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
    tenants.value = data.results || (data as unknown as TenantRecordItem[]);
    apiConnected.value = true;
  } catch {
    loadLocalFallbackTenants();
  } finally {
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

function openTenantDrawer(tenant: TenantRecordItem) {
  selectedTenant.value = tenant;
  drawerOpen.value = true;
  lastEventTitle.value = `مشاهده جزئیات مستأجر ${tenant.title}`;
  lastEventPayload.value = tenant as unknown as Record<string, unknown>;
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
    lastEventTitle.value = `تمدید دستی پلن ${selectedTenant.value.title}`;
    lastEventPayload.value = payload;
    await loadTenants();
  } catch (err: any) {
    // In offline mock mode, update locally
    selectedTenant.value.current_plan_slug = payload.plan_slug;
    selectedTenant.value.max_invoices_limit = payload.invoices_limit;
    overrideModalOpen.value = false;
    lastEventTitle.value = `تمدید دستی پلن (شبیه‌سازی آفلاین)`;
    lastEventPayload.value = payload;
  } finally {
    actionLoading.value = false;
  }
}

async function toggleTenantSuspend(tenant: TenantRecordItem) {
  try {
    if (tenant.is_suspended) {
      await adminApiService.activateTenant(tenant.id);
      tenant.is_suspended = false;
      tenant.subscription_status = 'ACTIVE';
      lastEventTitle.value = `رفع تعلیق مستأجر ${tenant.title}`;
    } else {
      await adminApiService.suspendTenant(tenant.id, 'نقض قوانین در سندباکس');
      tenant.is_suspended = true;
      tenant.subscription_status = 'SUSPENDED';
      lastEventTitle.value = `مسدودسازی مستأجر ${tenant.title}`;
    }
    lastEventPayload.value = { tenant_id: tenant.id, is_suspended: tenant.is_suspended };
  } catch {
    tenant.is_suspended = !tenant.is_suspended;
    tenant.subscription_status = tenant.is_suspended ? 'SUSPENDED' : 'ACTIVE';
    lastEventTitle.value = `تغییر وضعیت مسدودسازی (شبیه‌سازی آفلاین)`;
    lastEventPayload.value = { tenant_id: tenant.id, is_suspended: tenant.is_suspended };
  }
}

async function startImpersonate(tenant: TenantRecordItem) {
  try {
    const res = await adminApiService.impersonateTenant(tenant.id);
    impersonationTicket.value = res;
    impersonatedTenant.value = tenant;
    isImpersonating.value = true;
    lastEventTitle.value = `صدور تیکت Impersonate برای ${tenant.title}`;
    lastEventPayload.value = res as unknown as Record<string, unknown>;
  } catch {
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
    lastEventPayload.value = impersonationTicket.value as unknown as Record<string, unknown>;
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

async function handlePayoutSubmit(payload: { amount_rial: number; tracking_code: string; notes: string }) {
  if (!selectedPartner.value) return;
  actionLoading.value = true;
  try {
    await adminApiService.executePayout(selectedPartner.value.id, payload);
    payoutModalOpen.value = false;
    lastEventTitle.value = `ثبت حواله تسویه پایا برای ${selectedPartner.value.name}`;
    lastEventPayload.value = payload;
    await loadAffiliates();
  } catch (err: any) {
    // Offline simulated deduction
    selectedPartner.value.wallet_balance_rial -= payload.amount_rial;
    payoutModalOpen.value = false;
    lastEventTitle.value = `تسویه پایا (شبیه‌سازی آفلاین)`;
    lastEventPayload.value = payload;
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
    lastEventTitle.value = `ساخت کد تخفیف جدید ${payload.code}`;
    lastEventPayload.value = payload as unknown as Record<string, unknown>;
    await loadPromoCodes();
  } catch {
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
    lastEventPayload.value = payload as unknown as Record<string, unknown>;
  } finally {
    actionLoading.value = false;
  }
}

async function togglePromoCode(id: number, isActive: boolean) {
  try {
    await adminApiService.togglePromoCode(id, isActive);
    lastEventTitle.value = `تغییر وضعیت کد تخفیف #${id} به ${isActive ? 'فعال' : 'غیرفعال'}`;
    lastEventPayload.value = { id, is_active: isActive };
  } catch {
    const p = promoCodes.value.find((x) => x.id === id);
    if (p) p.is_active = isActive;
    lastEventTitle.value = `تغییر وضعیت کد تخفیف #${id} (شبیه‌سازی آفلاین)`;
    lastEventPayload.value = { id, is_active: isActive };
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
    lastEventTitle.value = `ذخیره پلن استودیو: ${planData.title}`;
    lastEventPayload.value = planData as unknown as Record<string, unknown>;
    await loadPlans();
  } catch {
    lastEventTitle.value = `ذخیره پلن استودیو (شبیه‌سازی آفلاین)`;
    lastEventPayload.value = planData as unknown as Record<string, unknown>;
  } finally {
    actionLoading.value = false;
  }
}

async function handleSetFeatured(planId: number, badgeText: string) {
  try {
    await adminApiService.setFeaturedPlan(planId, badgeText);
    lastEventTitle.value = `اعمال نشان پلن اصلی پلتفرم برای پلن #${planId}`;
    lastEventPayload.value = { plan_id: planId, badge_text: badgeText };
    await loadPlans();
  } catch {
    plans.value.forEach((p) => {
      p.is_featured = p.id === planId;
      if (p.is_featured) p.featured_badge_text = badgeText;
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
    lastEventTitle.value = `تعریف کارمند ادمین جدید: @${payload.username}`;
    lastEventPayload.value = payload;
    await loadStaff();
  } catch {
    staffList.value.push({
      id: Date.now(),
      username: String(payload.username || 'admin'),
      mobile: String(payload.mobile || '09120000000'),
      role: payload.role as AdminRole,
      is_active: true,
    });
    staffModalOpen.value = false;
    lastEventTitle.value = `تعریف کارمند ادمین (شبیه‌سازی آفلاین)`;
    lastEventPayload.value = payload;
  } finally {
    actionLoading.value = false;
  }
}
</script>
