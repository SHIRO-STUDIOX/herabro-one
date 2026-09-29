from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminPlanViewSet

router = DefaultRouter()
router.register(r'', AdminPlanViewSet, basename='plans')

urlpatterns = [
    path('', include(router.urls)),
]
