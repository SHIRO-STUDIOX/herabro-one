from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from apps.staff_rbac.models import AdminStaff
from apps.subscriptions_admin.models import AdminPlan, PlanBillingCycle
from apps.affiliate.models import AffiliatePartner, PromoCode
from apps.tenants.models import TenantRecord

def generate_valid_sheba(account_22_digits: str) -> str:
    temp_num = int(account_22_digits + '182700')
    remainder = temp_num % 97
    check_digits = 98 - remainder
    return f"IR{check_digits:02d}{account_22_digits}"

class Command(BaseCommand):
    help = 'Seeds initial administrative staff, default subscription plans, and affiliate partners'

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Starting admin backoffice database seed...'))

        # 1. Create Admin Staff Roles
        staff_data = [
            {
                'username': 'superadmin',
                'mobile': '09120000000',
                'password': 'Admin@123456',
                'role': 'SUPER_ADMIN',
                'first_name': 'مدیر ارشد',
                'last_name': 'سیستم',
                'email': 'superadmin@hesabro.ir'
            },
            {
                'username': 'support_agent',
                'mobile': '09121111111',
                'password': 'Support@123456',
                'role': 'SUPPORT_AGENT',
                'first_name': 'کارشناس',
                'last_name': 'پشتیبانی',
                'email': 'support@hesabro.ir'
            },
            {
                'username': 'sales_manager',
                'mobile': '09122222222',
                'password': 'Sales@123456',
                'role': 'SALES_MANAGER',
                'first_name': 'مدیر',
                'last_name': 'فروش و بازاریابی',
                'email': 'sales@hesabro.ir'
            },
        ]

        for item in staff_data:
            user, created = User.objects.get_or_create(
                username=item['username'],
                defaults={
                    'email': item['email'],
                    'first_name': item['first_name'],
                    'last_name': item['last_name'],
                    'is_staff': True,
                    'is_superuser': item['role'] == 'SUPER_ADMIN',
                }
            )
            user.set_password(item['password'])
            user.save()

            admin_staff, _ = AdminStaff.objects.update_or_create(
                user=user,
                defaults={
                    'mobile': item['mobile'],
                    'role': item['role'],
                    'is_active': True
                }
            )
            self.stdout.write(self.style.SUCCESS(f"  [OK] Admin Staff created: {admin_staff.user.username} (Mobile: {admin_staff.mobile})"))

        # 2. Create Default Subscription Plans
        plans_data = [
            {
                'slug': 'free',
                'title': 'پلن رایگان (شروع سریع)',
                'description': 'پلن آزمایشی جهت آشنایی با امکانات نرم‌افزار',
                'is_featured': False,
                'featured_badge_text': '',
                'max_invoices_monthly': 100,
                'max_warehouses': 1,
                'max_users': 1,
                'max_cheques': 10,
                'active_features_json': ['sales', 'accounting_basic'],
                'cycles': [
                    {'months_count': 1, 'base_price_rial': 0, 'discount_percent': 0, 'final_price_rial': 0}
                ]
            },
            {
                'slug': 'personal-pro',
                'title': 'پلن حرفه‌ای شخصی',
                'description': 'مناسب برای فریلنسرها و کسب‌وکارهای خدماتی تک‌نفره',
                'is_featured': False,
                'featured_badge_text': '',
                'max_invoices_monthly': 500,
                'max_warehouses': 2,
                'max_users': 2,
                'max_cheques': 50,
                'active_features_json': ['sales', 'accounting_advanced', 'cheques', 'reports'],
                'cycles': [
                    {'months_count': 1, 'base_price_rial': 4900000, 'discount_percent': 0, 'final_price_rial': 4900000},
                    {'months_count': 3, 'base_price_rial': 14700000, 'discount_percent': 10, 'final_price_rial': 13230000},
                    {'months_count': 12, 'base_price_rial': 58800000, 'discount_percent': 20, 'final_price_rial': 47040000},
                ]
            },
            {
                'slug': 'shop-standard',
                'title': 'پلن استاندارد مغازه و فروشگاه',
                'description': 'کامل‌ترین بسته برای فروشگاه‌ها و اصناف با قابلیت انبارداری و اتصال به کارتخوان',
                'is_featured': True,
                'featured_badge_text': 'پیشنهاد ویژه اصناف',
                'max_invoices_monthly': None,  # Unlimited
                'max_warehouses': 5,
                'max_users': 5,
                'max_cheques': None,
                'active_features_json': ['sales', 'inventory', 'pos_integration', 'tax_system', 'multi_user'],
                'cycles': [
                    {'months_count': 1, 'base_price_rial': 9900000, 'discount_percent': 0, 'final_price_rial': 9900000},
                    {'months_count': 3, 'base_price_rial': 29700000, 'discount_percent': 10, 'final_price_rial': 26730000},
                    {'months_count': 6, 'base_price_rial': 59400000, 'discount_percent': 15, 'final_price_rial': 50490000},
                    {'months_count': 12, 'base_price_rial': 118800000, 'discount_percent': 20, 'final_price_rial': 95040000},
                ]
            }
        ]

        # Reset featured flag before creating
        AdminPlan.objects.filter(is_featured=True).update(is_featured=False)

        for p_info in plans_data:
            cycles = p_info.pop('cycles')
            plan, _ = AdminPlan.objects.update_or_create(
                slug=p_info['slug'],
                defaults=p_info
            )
            for c_info in cycles:
                PlanBillingCycle.objects.update_or_create(
                    plan=plan,
                    months_count=c_info['months_count'],
                    defaults=c_info
                )
            self.stdout.write(self.style.SUCCESS(f"  [OK] Plan seeded: {plan.slug} ({plan.title})"))

        # 3. Create Sample Affiliate Partners
        sheba_partner_1 = generate_valid_sheba('0170000000010032420001')
        sheba_partner_2 = generate_valid_sheba('0540000000020088990002')

        partners_data = [
            {
                'name': 'علی محمدی (همکار درصدی)',
                'mobile': '09123333333',
                'promo_code_prefix': 'ALIM',
                'commission_type': 'PERCENT',
                'commission_value': 15,
                'wallet_balance_rial': 25000000,
                'sheba_number': sheba_partner_1,
                'promo_codes': [
                    {'code': 'ALIM1405', 'discount_percent': 15, 'discount_amount_rial': 0, 'max_uses': 200}
                ]
            },
            {
                'name': 'شرکت بازاریابی پرشین',
                'mobile': '09124444444',
                'promo_code_prefix': 'PERSIAN',
                'commission_type': 'FIXED',
                'commission_value': 500000,
                'wallet_balance_rial': 50000000,
                'sheba_number': sheba_partner_2,
                'promo_codes': [
                    {'code': 'PERSIAN20', 'discount_percent': 20, 'discount_amount_rial': 0, 'max_uses': 500}
                ]
            }
        ]

        for part_info in partners_data:
            codes = part_info.pop('promo_codes')
            partner, _ = AffiliatePartner.objects.update_or_create(
                mobile=part_info['mobile'],
                defaults=part_info
            )
            for code_info in codes:
                PromoCode.objects.update_or_create(
                    code=code_info['code'],
                    defaults={
                        'partner': partner,
                        'discount_percent': code_info['discount_percent'],
                        'discount_amount_rial': code_info['discount_amount_rial'],
                        'max_uses': code_info['max_uses'],
                    }
                )
            self.stdout.write(self.style.SUCCESS(f"  [OK] Affiliate Partner seeded: {partner.name} (Sheba: {partner.sheba_number})"))

        # 4. Create Sample Tenants for immediate frontend testability
        tenants_data = [
            {
                'core_tenant_id': 'core-ten-uuid-001',
                'title': 'سوپرمارکت و هایپر بهار',
                'slug': 'hyper-bahar',
                'owner_mobile': '09125555555',
                'account_type': 'BUSINESS',
                'subscription_status': 'ACTIVE',
                'current_plan_slug': 'shop-standard',
                'used_invoices_count': 342,
                'max_invoices_limit': 1000,
                'subscription_expires_at': datetime.now() + timedelta(days=75)
            },
            {
                'core_tenant_id': 'core-ten-uuid-002',
                'title': 'بوتیک پوشاک شیک‌پوشان',
                'slug': 'shik-poshan',
                'owner_mobile': '09126666666',
                'account_type': 'BUSINESS',
                'subscription_status': 'EXPIRING',
                'current_plan_slug': 'personal-pro',
                'used_invoices_count': 480,
                'max_invoices_limit': 500,
                'subscription_expires_at': datetime.now() + timedelta(days=3)
            },
        ]

        for t_info in tenants_data:
            tenant, _ = TenantRecord.objects.update_or_create(
                core_tenant_id=t_info['core_tenant_id'],
                defaults=t_info
            )
            self.stdout.write(self.style.SUCCESS(f"  [OK] Tenant seeded: {tenant.title} ({tenant.slug})"))

        self.stdout.write(self.style.SUCCESS('\nSuccessfully completed seeding admin backoffice service data!'))
