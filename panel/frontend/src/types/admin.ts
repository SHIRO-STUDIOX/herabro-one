export type AdminRole = 'SUPER_ADMIN' | 'SUPPORT_AGENT' | 'SALES_MANAGER';
export type TenantAccountType = 'PERSONAL' | 'BUSINESS';
export type SubscriptionStatus = 'ACTIVE' | 'EXPIRING' | 'EXPIRED' | 'SUSPENDED';

export interface AdminProfile {
  id: number;
  username: string;
  mobile: string;
  role: AdminRole;
  role_display?: string;
  is_active: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  date_joined?: string;
}

export interface TenantRecordItem {
  id: string;
  core_tenant_id: string;
  title: string;
  slug: string;
  owner_mobile: string;
  account_type: TenantAccountType;
  account_type_display?: string;
  subscription_status: SubscriptionStatus;
  subscription_status_display?: string;
  current_plan_slug: string | null;
  subscription_expires_at: string | null;
  used_invoices_count: number;
  max_invoices_limit: number;
  is_suspended: boolean;
  suspension_reason?: string | null;
  created_at: string;
}

export interface AffiliatePartnerItem {
  id: number;
  name: string;
  mobile: string;
  promo_code_prefix: string;
  commission_type: 'PERCENT' | 'FIXED';
  commission_type_display?: string;
  commission_value: number;
  wallet_balance_rial: number;
  sheba_number: string;
  is_active: boolean;
  payouts?: unknown[];
  created_at: string;
}

export interface PromoCodeItem {
  id: number;
  code: string;
  partner?: number | null;
  partner_id?: number | null;
  partner_name?: string | null;
  discount_percent: number;
  discount_amount_rial: number;
  max_uses: number;
  used_count: number;
  valid_until?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface PlanBillingCycleItem {
  id?: number;
  months_count: 1 | 3 | 6 | 12;
  months_display?: string;
  base_price_rial: number;
  discount_percent: number;
  final_price_rial: number;
}

export interface AdminPlanItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  is_featured: boolean;
  featured_badge_text: string;
  max_invoices_monthly: number | null;
  max_warehouses: number | null;
  max_users: number | null;
  max_cheques: number | null;
  active_features_json: string[];
  billing_cycles: PlanBillingCycleItem[];
  is_active: boolean;
}

export interface SecurityAuditLogItem {
  id: number;
  admin_staff?: number | null;
  staff_username?: string;
  staff_role?: string;
  action_type: string;
  target_object: string;
  ip_address: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface ImpersonationTicketResponse {
  ticket: string;
  impersonation_url: string;
  core_tenant_id: string;
  admin_staff_id: number;
  role: string;
  is_impersonated: boolean;
  can_refresh?: boolean;
  single_use?: boolean;
  expires_at: string;
  ttl_seconds: number;
  mode?: string;
}
