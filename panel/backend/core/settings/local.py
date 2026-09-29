"""
Local development settings for Hesabro Admin Backoffice API service.
"""
from .base import *

DEBUG = True

# Database-per-service: Dedicated SQLite for local/testing or PostgreSQL if specified
DATABASES = {
    'default': env.db(
        'DATABASE_URL',
        default=f'sqlite:///{BASE_DIR / "admin_backoffice.sqlite3"}'
    )
}
