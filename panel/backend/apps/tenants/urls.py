from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantRecordViewSet

router = DefaultRouter()
router.register(r'', TenantRecordViewSet, basename='tenants')

urlpatterns = [
    path('', include(router.urls)),
]
