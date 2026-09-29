from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AffiliatePartnerViewSet, PromoCodeViewSet

router = DefaultRouter()
router.register(r'affiliates', AffiliatePartnerViewSet, basename='affiliates')
router.register(r'promo-codes', PromoCodeViewSet, basename='promo-codes')

urlpatterns = [
    path('', include(router.urls)),
]
