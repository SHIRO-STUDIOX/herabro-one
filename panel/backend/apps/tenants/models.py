import uuid
from django.db import models

class TenantRecord(models.Model):
    ACCOUNT_TYPE_CHOICES = [
        ('PERSONAL', 'شخصی'),
        ('BUSINESS', 'کسب‌وکار'),
    ]
    STATUS_CHOICES = [
        ('ACTIVE', 'فعال'),
        ('EXPIRING', 'در آستانه انقضا'),
        ('EXPIRED', 'منقضی'),
        ('SUSPENDED', 'مسدود'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    core_tenant_id = models.CharField(max_length=64, unique=True, db_index=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=120, unique=True)
    owner_mobile = models.CharField(max_length=20, db_index=True)
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES)
    subscription_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')
    current_plan_slug = models.CharField(max_length=100, blank=True, null=True)
    subscription_expires_at = models.DateTimeField(blank=True, null=True)
    used_invoices_count = models.PositiveIntegerField(default=0)
    max_invoices_limit = models.PositiveIntegerField(default=100)
    is_suspended = models.BooleanField(default=False, db_index=True)
    suspension_reason = models.TextField(blank=True, null=True)
    synced_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'سند مستأجر'
        verbose_name_plural = 'مستأجران پلتفرم'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.slug}) - {self.get_subscription_status_display()}"
