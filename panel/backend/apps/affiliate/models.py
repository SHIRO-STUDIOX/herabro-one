from django.db import models
from .validators import validate_iranian_sheba

class AffiliatePartner(models.Model):
    COMMISSION_CHOICES = [
        ('PERCENT', 'درصدی'),
        ('FIXED', 'مبلغ ثابت'),
    ]
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20, unique=True)
    promo_code_prefix = models.SlugField(max_length=20, unique=True)
    commission_type = models.CharField(max_length=10, choices=COMMISSION_CHOICES)
    commission_value = models.PositiveIntegerField()
    wallet_balance_rial = models.BigIntegerField(default=0)
    sheba_number = models.CharField(max_length=26, validators=[validate_iranian_sheba])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'همکار فروش'
        verbose_name_plural = 'همکاران فروش'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.mobile}) - موجودی: {self.wallet_balance_rial:,} ریال"

class PromoCode(models.Model):
    code = models.SlugField(max_length=50, unique=True)
    partner = models.ForeignKey(
        AffiliatePartner,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='promo_codes'
    )
    discount_percent = models.PositiveSmallIntegerField(default=0)
    discount_amount_rial = models.BigIntegerField(default=0)
    max_uses = models.PositiveIntegerField(default=100)
    used_count = models.PositiveIntegerField(default=0)
    valid_until = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'کد تخفیف'
        verbose_name_plural = 'کدهای تخفیف'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.code} ({self.discount_percent}% / {self.discount_amount_rial:,} ریال)"

class PayoutTransaction(models.Model):
    partner = models.ForeignKey(AffiliatePartner, on_delete=models.PROTECT, related_name='payouts')
    amount_rial = models.BigIntegerField()
    tracking_code = models.CharField(max_length=100)
    sheba_snapshot = models.CharField(max_length=26)
    paid_by = models.ForeignKey('staff_rbac.AdminStaff', on_delete=models.SET_NULL, null=True, related_name='payouts')
    notes = models.TextField(blank=True, null=True)
    paid_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'تراکنش تسویه پایا'
        verbose_name_plural = 'تراکنش‌های تسویه پایا'
        ordering = ['-paid_at']

    def __str__(self):
        return f"تسویه {self.amount_rial:,} ریال به {self.partner.name} - پیگیری: {self.tracking_code}"
