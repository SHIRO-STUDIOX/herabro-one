from django.test import TestCase
from django.db import IntegrityError
from apps.subscriptions_admin.models import AdminPlan

class FeaturedPlanConstraintTestCase(TestCase):
    def test_single_featured_plan_constraint_enforced_by_db(self):
        # Create first featured plan
        plan_1 = AdminPlan.objects.create(
            slug='plan-one',
            title='پلن اول',
            is_featured=True,
            featured_badge_text='ویژه ۱'
        )
        self.assertTrue(plan_1.is_featured)

        # Attempt to create second featured plan directly in DB
        with self.assertRaises(IntegrityError):
            AdminPlan.objects.create(
                slug='plan-two',
                title='پلن دوم',
                is_featured=True,
                featured_badge_text='ویژه ۲'
            )

    def test_multiple_non_featured_plans_allowed(self):
        # Multiple plans with is_featured=False must be permitted
        plan_a = AdminPlan.objects.create(slug='plan-a', title='پلن A', is_featured=False)
        plan_b = AdminPlan.objects.create(slug='plan-b', title='پلن B', is_featured=False)
        self.assertFalse(plan_a.is_featured)
        self.assertFalse(plan_b.is_featured)
