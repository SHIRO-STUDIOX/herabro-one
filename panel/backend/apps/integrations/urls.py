from django.urls import path
from .webhooks import CoreWebhookView

urlpatterns = [
    path('webhook/core-event/', CoreWebhookView.as_view(), name='core-webhook-event'),
]
