from django.urls import path, include

urlpatterns = [
    # Staff RBAC, Auth & Audit Logs
    path('api/v1/admin/', include('apps.staff_rbac.urls')),

    # Tenants Management
    path('api/v1/admin/tenants/', include('apps.tenants.urls')),

    # Affiliates, Promo Codes & Payouts
    path('api/v1/admin/', include('apps.affiliate.urls')),

    # Subscriptions & Plans Studio
    path('api/v1/admin/plans/', include('apps.subscriptions_admin.urls')),

    # Core Integrations & Inbound Webhooks
    path('api/v1/admin/integrations/', include('apps.integrations.urls')),
]
