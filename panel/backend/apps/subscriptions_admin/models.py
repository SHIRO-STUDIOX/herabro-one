from django.db import models

class AdminPlan(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, default='')
    is_featured = models.BooleanField(default=False, db_index=True)
    featured_badge_text = models.CharField(max_length=100, blank=True, default='')
    max_invoices_monthly = models.PositiveIntegerField(null=True, blank=True)
    max_warehouses = models.PositiveIntegerField(null=True, blank=True)
    max_users = models.PositiveIntegerField(null=True, blank=True)
    max_cheques = models.PositiveIntegerField(null=True, blank=True)
    active_features_json = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'پلن اشتراک'
        verbose_name_plural = 'پلن‌های اشتراک'
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['is_featured'],
                condition=models.Q(is_featured=True),
                name='unique_single_featured_plan_constraint'
            )
        ]

    def __str__(self):
        featured_label = f" [⭐ {self.featured_badge_text or 'پلن اصلی'}]" if self.is_featured else ""
        return f"{self.title} ({self.slug}){featured_label}"

class PlanBillingCycle(models.Model):
    CYCLE_CHOICES = [
        (1, '۱ ماهه'),
        (3, '۳ ماهه'),
        (6, '۶ ماهه'),
        (12, '۱۲ ماهه'),
    ]
    plan = models.ForeignKey(AdminPlan, on_delete=models.CASCADE, related_name='billing_cycles')
    months_count = models.PositiveSmallIntegerField(choices=CYCLE_CHOICES)
    base_price_rial = models.BigIntegerField()
    discount_percent = models.PositiveSmallIntegerField(default=0)
    final_price_rial = models.BigIntegerField()

    class Meta:
        verbose_name = 'دوره قیمت‌گذاری پلن'
        verbose_name_plural = 'دوره‌های قیمت‌گذاری پلن'
        unique_together = ('plan', 'months_count')
        ordering = ['months_count']

    def __str__(self):
        return f"{self.plan.title} - {self.get_months_count_display()}: {self.final_price_rial:,} ریال"

    def save(self, *args, **kwargs):
        # Auto calculate final price based on base price and discount percent if not strictly provided
        if not self.final_price_rial or self.final_price_rial == 0:
            discount_amount = (self.base_price_rial * self.discount_percent) // 100
            self.final_price_rial = self.base_price_rial - discount_amount
        super().save(*args, **kwargs)
