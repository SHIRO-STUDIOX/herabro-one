from django.db import transaction
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import AdminPlan, PlanBillingCycle
from .serializers import AdminPlanSerializer
from apps.staff_rbac.permissions import PlanStudioPermission

class AdminPlanViewSet(viewsets.ModelViewSet):
    """
    Dynamic Plan Studio ViewSet:
    - Lists & retrieves plans with nested pricing cycles and active feature matrices
    - Creates and updates plans with atomic nested cycles
    - Provides set-featured action with atomic demotion of previous featured plan
    """
    queryset = AdminPlan.objects.prefetch_related('billing_cycles').all()
    serializer_class = AdminPlanSerializer
    permission_classes = [permissions.IsAuthenticated, PlanStudioPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_featured', 'is_active']
    search_fields = ['title', 'slug', 'description']
    ordering_fields = ['created_at', 'title']
    ordering = ['created_at']

    @action(detail=True, methods=['post'], url_path='set-featured')
    @transaction.atomic
    def set_featured(self, request, pk=None):
        plan = self.get_object()
        badge_text = request.data.get('featured_badge_text', plan.featured_badge_text or 'پیشنهاد ویژه پلتفرم')

        # Demote all other plans first
        AdminPlan.objects.filter(is_featured=True).exclude(id=plan.id).update(is_featured=False)

        plan.is_featured = True
        plan.featured_badge_text = badge_text
        plan.save(update_fields=['is_featured', 'featured_badge_text'])

        request._audit_action_type = 'SET_FEATURED_PLAN'
        request._audit_target_object = f"Plan:{plan.id}:{plan.slug}"

        return Response({
            'detail': f'پلن {plan.title} به عنوان پلن برگزیده (Featured) پلتفرم تنظیم شد.',
            'plan': AdminPlanSerializer(plan).data
        }, status=status.HTTP_200_OK)
