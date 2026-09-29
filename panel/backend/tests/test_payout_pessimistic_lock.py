from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from apps.affiliate.models import AffiliatePartner, PayoutTransaction
from apps.affiliate.views import execute_payout
from apps.staff_rbac.models import AdminStaff

class PayoutPessimisticLockTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='admin_test', password='password123')
        self.admin_staff = AdminStaff.objects.create(
            user=self.user,
            role='SUPER_ADMIN',
            mobile='09129999999'
        )
        self.partner = AffiliatePartner.objects.create(
            name='تست همکار',
            mobile='09128888888',
            promo_code_prefix='TESTP',
            commission_type='PERCENT',
            commission_value=10,
            wallet_balance_rial=10000000,  # 10,000,000 Rial
            sheba_number='IR420170000000010032420001'
        )

    def test_successful_payout(self):
        payout = execute_payout(
            partner_id=self.partner.id,
            amount_rial=4000000,
            tracking_code='PAYA-1111',
            admin_staff=self.admin_staff
        )
        self.partner.refresh_from_db()
        self.assertEqual(self.partner.wallet_balance_rial, 6000000)
        self.assertEqual(payout.amount_rial, 4000000)
        self.assertEqual(payout.tracking_code, 'PAYA-1111')

    def test_payout_exceeding_wallet_balance_fails(self):
        # Trying to payout 15,000,000 Rial when balance is 10,000,000
        with self.assertRaises(ValidationError) as cm:
            execute_payout(
                partner_id=self.partner.id,
                amount_rial=15000000,
                tracking_code='PAYA-FAIL',
                admin_staff=self.admin_staff
            )
        self.assertIn("مانده موجودی کیف پول", str(cm.exception))
        self.partner.refresh_from_db()
        self.assertEqual(self.partner.wallet_balance_rial, 10000000)
        self.assertEqual(PayoutTransaction.objects.count(), 0)

    def test_sequential_double_payout_protection(self):
        # 1st payout: 8,000,000 (succeeds, remaining: 2,000,000)
        execute_payout(
            partner_id=self.partner.id,
            amount_rial=8000000,
            tracking_code='PAYA-1',
            admin_staff=self.admin_staff
        )
        # 2nd payout: 3,000,000 (must fail due to insufficient funds)
        with self.assertRaises(ValidationError):
            execute_payout(
                partner_id=self.partner.id,
                amount_rial=3000000,
                tracking_code='PAYA-2',
                admin_staff=self.admin_staff
            )
        self.partner.refresh_from_db()
        self.assertEqual(self.partner.wallet_balance_rial, 2000000)
        self.assertEqual(PayoutTransaction.objects.count(), 1)
