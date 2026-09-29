from rest_framework import views, viewsets, permissions, status, filters
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from .models import AdminStaff, SecurityAuditLog
from .serializers import (
    AdminLoginSerializer, AdminStaffSerializer, SecurityAuditLogSerializer
)
from .permissions import IsSuperAdmin, AuditLogPermission, get_admin_profile

class AdminLoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class AdminMeView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = get_admin_profile(request)
        if not profile:
            return Response({'detail': 'پروفایل ادمین یافت نشد.'}, status=status.HTTP_403_FORBIDDEN)

        return Response({
            'id': profile.id,
            'username': request.user.username,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
            'mobile': profile.mobile,
            'role': profile.role,
            'role_display': profile.get_role_display(),
            'is_active': profile.is_active,
            'permissions': {
                'can_manage_staff': profile.role == 'SUPER_ADMIN',
                'can_manage_plans': profile.role == 'SUPER_ADMIN',
                'can_payout': profile.role == 'SUPER_ADMIN',
                'can_impersonate': profile.role in ['SUPER_ADMIN', 'SUPPORT_AGENT'],
                'can_suspend': profile.role in ['SUPER_ADMIN', 'SUPPORT_AGENT'],
                'can_manage_promo': profile.role in ['SUPER_ADMIN', 'SALES_MANAGER'],
            }
        })

class AdminStaffViewSet(viewsets.ModelViewSet):
    """
    CRUD for admin staff. Accessible only by SUPER_ADMIN.
    """
    queryset = AdminStaff.objects.select_related('user').all()
    serializer_class = AdminStaffSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['role', 'is_active']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'mobile']

class AuditLogFilter(django_filters.FilterSet):
    date_from = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='gte')
    date_to = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='lte')

    class Meta:
        model = SecurityAuditLog
        fields = ['admin_staff', 'action_type', 'date_from', 'date_to']

class SecurityAuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only view for audit logs.
    SUPER_ADMIN: all logs.
    SUPPORT_AGENT: only their own logs.
    SALES_MANAGER: forbidden.
    """
    serializer_class = SecurityAuditLogSerializer
    permission_classes = [permissions.IsAuthenticated, AuditLogPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = AuditLogFilter
    search_fields = ['action_type', 'target_object', 'ip_address']
    ordering_fields = ['timestamp']
    ordering = ['-timestamp']

    def get_queryset(self):
        profile = get_admin_profile(self.request)
        if not profile:
            return SecurityAuditLog.objects.none()

        if profile.role == 'SUPER_ADMIN':
            return SecurityAuditLog.objects.select_related('admin_staff__user').all()
        elif profile.role == 'SUPPORT_AGENT':
            return SecurityAuditLog.objects.select_related('admin_staff__user').filter(admin_staff=profile)
        return SecurityAuditLog.objects.none()
