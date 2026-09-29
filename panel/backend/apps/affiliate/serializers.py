from rest_framework import serializers
from .models import AffiliatePartner, PromoCode, PayoutTransaction

class PayoutTransactionSerializer(serializers.ModelSerializer):
    paid_by_name = serializers.CharField(source='paid_by.user.username', read_only=True)
    partner_name = serializers.CharField(source='partner.name', read_only=True)

    class Meta:
        model = PayoutTransaction
        fields = [
            'id', 'partner', 'partner_name', 'amount_rial', 'tracking_code',
            'sheba_snapshot', 'paid_by', 'paid_by_name', 'notes', 'paid_at'
        ]
        read_only_fields = ['id', 'sheba_snapshot', 'paid_by', 'paid_at']

class AffiliatePartnerSerializer(serializers.ModelSerializer):
    payouts = PayoutTransactionSerializer(many=True, read_only=True)
    commission_type_display = serializers.CharField(source='get_commission_type_display', read_only=True)

    class Meta:
        model = AffiliatePartner
        fields = [
            'id', 'name', 'mobile', 'promo_code_prefix',
            'commission_type', 'commission_type_display', 'commission_value',
            'wallet_balance_rial', 'sheba_number', 'is_active', 'created_at', 'payouts'
        ]
        read_only_fields = ['id', 'created_at']

class ExecutePayoutSerializer(serializers.Serializer):
    amount_rial = serializers.IntegerField(required=True, min_value=1)
    tracking_code = serializers.CharField(required=True, max_length=100)
    notes = serializers.CharField(required=False, allow_blank=True, default='')

class PromoCodeSerializer(serializers.ModelSerializer):
    partner_name = serializers.CharField(source='partner.name', read_only=True)

    class Meta:
        model = PromoCode
        fields = [
            'id', 'code', 'partner', 'partner_name', 'discount_percent',
            'discount_amount_rial', 'max_uses', 'used_count',
            'valid_until', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'used_count', 'created_at']

    def validate(self, attrs):
        discount_percent = attrs.get('discount_percent', getattr(self.instance, 'discount_percent', 0))
        discount_amount_rial = attrs.get('discount_amount_rial', getattr(self.instance, 'discount_amount_rial', 0))

        if discount_percent == 0 and discount_amount_rial == 0:
            raise serializers.ValidationError('حداقل یکی از مقادیر درصد تخفیف یا مبلغ ریالی باید بیشتر از صفر باشد.')

        if discount_percent > 100:
            raise serializers.ValidationError({'discount_percent': 'درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد.'})

        return attrs
