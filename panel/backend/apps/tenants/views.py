from datetime import datetime, timedelta
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import TenantRecord
from .serializers import (
    TenantRecordSerializer, SuspendTenantSerializer, ManualOverridePlanSerializer
)
from apps.staff_rbac.permissions import TenantAccessPermission, get_admin_profile
from apps.staff_rbac.models import SecurityAuditLog
from apps.integrations.client import CoreApiClient

class TenantRecordViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Tenants Management ViewSet:
    - Lists & retrieves tenants with filtering/searching
    - Suspend/Activate tenants
    - Impersonate login tickets
    - Manual plan overrides
    """
    queryset = TenantRecord.objects.all()
    serializer_class = TenantRecordSerializer
    permission_classes = [permissions.IsAuthenticated, TenantAccessPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['account_type', 'subscription_status', 'is_suspended']
    search_fields = ['title', 'slug', 'owner_mobile', 'core_tenant_id']
    ordering_fields = ['created_at', 'used_invoices_count', 'title']
    ordering = ['-created_at']

    @action(detail=True, methods=['post'], url_path='suspend')
    def suspend(self, request, pk=None):
        tenant = self.get_object()
        serializer = SuspendTenantSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reason = serializer.validated_data.get('reason', '')

        tenant.is_suspended = True
        tenant.subscription_status = 'SUSPENDED'
        tenant.suspension_reason = reason
        tenant.save(update_fields=['is_suspended', 'subscription_status', 'suspension_reason'])

        # Sync with Core API
        client = CoreApiClient()
        client.sync_tenant_suspension(tenant.core_tenant_id, is_suspended=True, reason=reason)

        # Context for Audit Middleware
        request._audit_action_type = 'SUSPEND_TENANT'
        request._audit_target_object = f"Tenant:{tenant.id}:{tenant.slug}"

        return Response({
            'detail': f'مستأجر {tenant.title} با موفقیت مسدود گردید.',
            'tenant': TenantRecordSerializer(tenant).data
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='activate')
    def activate(self, request, pk=None):
        tenant = self.get_object()
        tenant.is_suspended = False
        tenant.subscription_status = 'ACTIVE'
        tenant.suspension_reason = ''
        tenant.save(update_fields=['is_suspended', 'subscription_status', 'suspension_reason'])

        # Sync with Core API
        client = CoreApiClient()
        client.sync_tenant_suspension(tenant.core_tenant_id, is_suspended=False, reason='')

        request._audit_action_type = 'ACTIVATE_TENANT'
        request._audit_target_object = f"Tenant:{tenant.id}:{tenant.slug}"

        return Response({
            'detail': f'مستأجر {tenant.title} رفع مسدودی شد.',
            'tenant': TenantRecordSerializer(tenant).data
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='impersonate')
    def impersonate(self, request, pk=None):
        tenant = self.get_object()
        admin_staff = get_admin_profile(request)
        if not admin_staff:
            return Response({'detail': 'پروفایل ادمین معتبر نیست.'}, status=status.HTTP_403_FORBIDDEN)

        # Request ticket from Core
        client = CoreApiClient()
        ticket_data = client.request_impersonation_ticket(
            core_tenant_id=tenant.core_tenant_id,
            admin_staff=admin_staff,
            ttl_seconds=900
        )

        # Explicitly log security event
        request._audit_action_type = 'IMPERSONATE_TENANT'
        request._audit_target_object = f"Tenant:{tenant.id}:{tenant.slug}"

        return Response(ticket_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='manual-override-plan')
    def manual_override_plan(self, request, pk=None):
        tenant = self.get_object()
        serializer = ManualOverridePlanSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        plan_slug = serializer.validated_data['plan_slug']
        days = serializer.validated_data.get('days', 30)
        invoices_limit = serializer.validated_data.get('invoices_limit')

        tenant.current_plan_slug = plan_slug
        now = datetime.now()
        base_expire = tenant.subscription_expires_at if (tenant.subscription_expires_at and tenant.subscription_expires_at > now) else now
        tenant.subscription_expires_at = base_expire + timedelta(days=days)
        tenant.subscription_status = 'ACTIVE'
        if invoices_limit is not None:
            tenant.max_invoices_limit = invoices_limit

        tenant.save(update_fields=[
            'current_plan_slug', 'subscription_expires_at',
            'subscription_status', 'max_invoices_limit'
        ])

        # Sync to Core
        client = CoreApiClient()
        client.sync_manual_plan_override(tenant.core_tenant_id, plan_slug, days, invoices_limit)

        request._audit_action_type = 'MANUAL_OVERRIDE_PLAN'
        request._audit_target_object = f"Tenant:{tenant.id}:{tenant.slug}"

        return Response({
            'detail': f'پلن مستأجر به {plan_slug} با موفقیت تمدید شد.',
            'tenant': TenantRecordSerializer(tenant).data
        }, status=status.HTTP_200_OK)
