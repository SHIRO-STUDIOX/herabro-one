from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    AdminLoginView, AdminMeView, AdminStaffViewSet, SecurityAuditLogViewSet
)

router = DefaultRouter()
router.register(r'staff', AdminStaffViewSet, basename='admin-staff')
router.register(r'audit-logs', SecurityAuditLogViewSet, basename='admin-audit-logs')

urlpatterns = [
    path('auth/login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='admin-token-refresh'),
    path('auth/me/', AdminMeView.as_view(), name='admin-me'),
    path('', include(router.urls)),
]
