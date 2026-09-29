"""
WSGI config for Hesabro Admin Backoffice API service.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.local')

application = get_wsgi_application()
