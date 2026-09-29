"""
Production settings for Hesabro Admin Backoffice API service.
"""
from .base import *

DEBUG = False

# Production PostgreSQL database
DATABASES = {
    'default': env.db('DATABASE_URL')
}

# Strict security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
