from django.db import transaction
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from .models import AffiliatePartner, PromoCode, PayoutTransaction
from .serializers import (
    AffiliatePartnerSerializer, PromoCodeSerializer,
    PayoutTransactionSerializer, ExecutePayoutSerializer
)
from apps.staff_rbac.permissions import AffiliateAccessPermission, get_admin_profile

@transaction.atomic
def execute_payout(partner_id, amount_rial, tracking_code, admin_staff, notes=""):
    """
    Pessimistic-locked atomic execution of affiliate payout to prevent race conditions.
    """
    partner = AffiliatePartner.objects.select_for_update().get(id=partner_id)
    if partner.wallet_balance_rial < amount_rial:
        raise ValidationError({"amount_rial": "مبلغ تسویه از مانده موجودی کیف پول بیشتر است."})

    partner.wallet_balance_rial -= amount_rial
    partner.save(update_fields=['wallet_balance_rial'])

    payout = PayoutTransaction.objects.create(
        partner=partner,
        amount_rial=amount_rial,
        tracking_code=tracking_code,
        sheba_snapshot=partner.sheba_number,
        paid_by=admin_staff,
        notes=notes
    )
    return payout

class AffiliatePartnerViewSet(viewsets.ModelViewSet):
    """
    Affiliates & Wallet Management ViewSet:
    - Lists partners and pending balances
    - Executes atomic payouts with pessimistic locking
    """
    queryset = AffiliatePartner.objects.prefetch_related('payouts').all()
    serializer_class = AffiliatePartnerSerializer
    permission_classes = [permissions.IsAuthenticated, AffiliateAccessPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['commission_type', 'is_active']
    search_fields = ['name', 'mobile', 'promo_code_prefix', 'sheba_number']
    ordering_fields = ['created_at', 'wallet_balance_rial']
    ordering = ['-created_at']

    @action(detail=True, methods=['post'], url_path='payout')
    def payout(self, request, pk=None):
        partner = self.get_object()
        admin_staff = get_admin_profile(request)

        serializer = ExecutePayoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        amount_rial = serializer.validated_data['amount_rial']
        tracking_code = serializer.validated_data['tracking_code']
        notes = serializer.validated_data.get('notes', '')

        payout = execute_payout(
            partner_id=partner.id,
            amount_rial=amount_rial,
            tracking_code=tracking_code,
            admin_staff=admin_staff,
            notes=notes
        )

        request._audit_action_type = 'PAYOUT_PROCEED'
        request._audit_target_object = f"Partner:{partner.id}:{partner.name} - Amount:{amount_rial:,} RLS"

        return Response({
            'detail': 'تسویه حساب پایا با موفقیت ثبت گردید.',
            'payout': PayoutTransactionSerializer(payout).data,
            'new_wallet_balance_rial': partner.wallet_balance_rial
        }, status=status.HTTP_201_CREATED)

class PromoCodeViewSet(viewsets.ModelViewSet):
    """
    Promo Codes Management ViewSet:
    - Lists codes with usage stats
    - Create/Update/Toggle codes
    """
    queryset = PromoCode.objects.select_related('partner').all()
    serializer_class = PromoCodeSerializer
    permission_classes = [permissions.IsAuthenticated, AffiliateAccessPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active', 'partner']
    search_fields = ['code', 'partner__name']
    ordering_fields = ['created_at', 'used_count']
    ordering = ['-created_at']
