from django.db import models
from django.contrib.auth.models import User

class AdminStaff(models.Model):
    ROLE_CHOICES = [
        ('SUPER_ADMIN', 'مدیر ارشد'),
        ('SUPPORT_AGENT', 'کارشناس پشتیبانی'),
        ('SALES_MANAGER', 'مدیر فروش'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    mobile = models.CharField(max_length=20, unique=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'کارمند ادمین'
        verbose_name_plural = 'کارمندان ادمین'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} ({self.get_role_display()})"

class SecurityAuditLog(models.Model):
    admin_staff = models.ForeignKey(AdminStaff, on_delete=models.SET_NULL, null=True, related_name='audit_logs')
    action_type = models.CharField(max_length=100, db_index=True)
    target_object = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    details = models.JSONField(default=dict)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = 'لاگ حسابرسی امنیتی'
        verbose_name_plural = 'لاگ‌های حسابرسی امنیتی'
        ordering = ['-timestamp']

    def __str__(self):
        staff_name = self.admin_staff.user.username if self.admin_staff else 'سیستم / حذف شده'
        return f"[{self.timestamp:%Y-%m-%d %H:%M:%S}] {staff_name} -> {self.action_type}"
