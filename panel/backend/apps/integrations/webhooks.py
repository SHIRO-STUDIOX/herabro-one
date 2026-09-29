import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from apps.tenants.models import TenantRecord
from .security import verify_hmac_signature

class CoreWebhookView(APIView):
    """
    Inbound Webhook receiver for real-time events pushed by Hesabro One Core.
    Secured via HMAC-SHA256 signature in X-Hesabro-Signature header.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        signature = request.headers.get('X-Hesabro-Signature', '')
        raw_body = request.body

        if not verify_hmac_signature(raw_body, signature):
            return Response(
                {"error": "امضای وب‌هوک معتبر نمی‌باشد (Invalid HMAC Signature)."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            payload = json.loads(raw_body.decode('utf-8'))
        except Exception:
            return Response({"error": "فرمت JSON نامعتبر است."}, status=status.HTTP_400_BAD_REQUEST)

        event_type = payload.get('event_type')
        data = payload.get('data', {})

        if event_type == 'TENANT_REGISTERED':
            TenantRecord.objects.update_or_create(
                core_tenant_id=data.get('core_tenant_id'),
                defaults={
                    'title': data.get('title', 'فروشگاه جدید'),
                    'slug': data.get('slug', f"tenant-{data.get('core_tenant_id')}"),
                    'owner_mobile': data.get('owner_mobile', ''),
                    'account_type': data.get('account_type', 'BUSINESS'),
                    'subscription_status': data.get('subscription_status', 'ACTIVE'),
                    'current_plan_slug': data.get('current_plan_slug', 'free'),
                    'max_invoices_limit': data.get('max_invoices_limit', 100),
                }
            )
        elif event_type == 'USAGE_UPDATED':
            core_id = data.get('core_tenant_id')
            if core_id:
                TenantRecord.objects.filter(core_tenant_id=core_id).update(
                    used_invoices_count=data.get('used_invoices_count', 0),
                    subscription_status=data.get('subscription_status', 'ACTIVE'),
                )
        elif event_type == 'TENANT_SUSPENDED':
            core_id = data.get('core_tenant_id')
            if core_id:
                TenantRecord.objects.filter(core_tenant_id=core_id).update(
                    is_suspended=data.get('is_suspended', True),
                    suspension_reason=data.get('reason', '')
                )

        return Response({"status": "received", "event_type": event_type}, status=status.HTTP_200_OK)
