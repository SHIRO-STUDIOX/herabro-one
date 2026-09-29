from rest_framework import serializers
from django.db import transaction
from .models import AdminPlan, PlanBillingCycle

class PlanBillingCycleSerializer(serializers.ModelSerializer):
    months_display = serializers.CharField(source='get_months_count_display', read_only=True)

    class Meta:
        model = PlanBillingCycle
        fields = [
            'id', 'months_count', 'months_display',
            'base_price_rial', 'discount_percent', 'final_price_rial'
        ]

    def validate(self, attrs):
        base_price = attrs.get('base_price_rial', 0)
        discount = attrs.get('discount_percent', 0)
        final_price = attrs.get('final_price_rial')

        if discount > 100:
            raise serializers.ValidationError({'discount_percent': 'درصد تخفیف نمی‌تواند بیش از ۱۰۰ باشد.'})

        # Calculate if final price is missing or 0
        if not final_price or final_price == 0:
            discount_amount = (base_price * discount) // 100
            attrs['final_price_rial'] = base_price - discount_amount

        return attrs

class AdminPlanSerializer(serializers.ModelSerializer):
    billing_cycles = PlanBillingCycleSerializer(many=True, required=False)

    class Meta:
        model = AdminPlan
        fields = [
            'id', 'slug', 'title', 'description', 'is_featured', 'featured_badge_text',
            'max_invoices_monthly', 'max_warehouses', 'max_users', 'max_cheques',
            'active_features_json', 'is_active', 'created_at', 'updated_at',
            'billing_cycles'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    @transaction.atomic
    def create(self, validated_data):
        cycles_data = validated_data.pop('billing_cycles', [])
        is_featured = validated_data.get('is_featured', False)

        if is_featured:
            # Demote any previously featured plan
            AdminPlan.objects.filter(is_featured=True).update(is_featured=False)

        plan = AdminPlan.objects.create(**validated_data)

        for cycle_data in cycles_data:
            PlanBillingCycle.objects.create(plan=plan, **cycle_data)

        return plan

    @transaction.atomic
    def update(self, instance, validated_data):
        cycles_data = validated_data.pop('billing_cycles', None)
        is_featured = validated_data.get('is_featured', instance.is_featured)

        if is_featured and not instance.is_featured:
            AdminPlan.objects.filter(is_featured=True).exclude(id=instance.id).update(is_featured=False)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if cycles_data is not None:
            # Synchronize cycles
            existing_cycles = {c.months_count: c for c in instance.billing_cycles.all()}
            incoming_months = set()

            for cycle_data in cycles_data:
                months = cycle_data['months_count']
                incoming_months.add(months)
                if months in existing_cycles:
                    existing_cycle = existing_cycles[months]
                    for c_attr, c_val in cycle_data.items():
                        setattr(existing_cycle, c_attr, c_val)
                    existing_cycle.save()
                else:
                    PlanBillingCycle.objects.create(plan=instance, **cycle_data)

            # Delete cycles not present in incoming payload
            instance.billing_cycles.exclude(months_count__in=incoming_months).delete()

        return instance
