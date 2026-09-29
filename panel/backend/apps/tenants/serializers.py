from rest_framework import serializers
from .models import TenantRecord

class TenantRecordSerializer(serializers.ModelSerializer):
    account_type_display = serializers.CharField(source='get_account_type_display', read_only=True)
    subscription_status_display = serializers.CharField(source='get_subscription_status_display', read_only=True)

    class Meta:
        model = TenantRecord
        fields = [
            'id', 'core_tenant_id', 'title', 'slug', 'owner_mobile',
            'account_type', 'account_type_display',
            'subscription_status', 'subscription_status_display',
            'current_plan_slug', 'subscription_expires_at',
            'used_invoices_count', 'max_invoices_limit',
            'is_suspended', 'suspension_reason',
            'synced_at', 'created_at'
        ]
        read_only_fields = ['id', 'synced_at', 'created_at']

class SuspendTenantSerializer(serializers.Serializer):
    reason = serializers.CharField(required=False, allow_blank=True, default='')

class ManualOverridePlanSerializer(serializers.Serializer):
    plan_slug = serializers.CharField(required=True)
    days = serializers.IntegerField(required=False, default=30, min_value=1)
    invoices_limit = serializers.IntegerField(required=False, min_value=0)
