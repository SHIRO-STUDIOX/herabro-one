"""Local-only geo data loader (SQLite-compatible).

Why this file exists:
  apps/geo/management/commands/load_geo_data.py executes each .sql file
  with a SINGLE cursor.execute() and uses the Postgres-only NOW() function.
  That works on PostgreSQL but fails on SQLite:
    - "You can only execute one statement at a time."
    - "no such function: NOW"

This helper does the same job in a backend-agnostic way WITHOUT touching
any tracked source file: it splits the .sql files into single statements
and rewrites NOW() -> CURRENT_TIMESTAMP (valid in both SQLite and Postgres).

Usage (from repo root):
  .\\hesabro-one-backend-django\\.venv-local\\Scripts\\python.exe load-geo-local.py [--force]

Env vars are optional; sensible local defaults are applied when missing.
"""
import os
import sys

BACKEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                           'hesabro-one-backend-django')

# Local-only defaults (do NOT write to .env file; process env only).
LOCAL_DB = os.path.join(BACKEND_DIR, 'db-local.sqlite3')
os.environ.setdefault('SECRET_KEY', 'django-insecure-local-qc-only')
os.environ.setdefault('DEBUG', 'True')
os.environ.setdefault('DATABASE_URL', 'sqlite:///' + LOCAL_DB.replace('\\', '/'))
os.environ.setdefault('USE_LOCAL_CACHE', 'True')
os.environ.setdefault('REDIS_URL', 'dummy://')
os.environ.setdefault('ALLOWED_HOSTS', 'localhost,127.0.0.1')
os.environ.setdefault('CORS_ALLOWED_ORIGINS',
                      'http://127.0.0.1:8080,http://localhost:8080')

sys.path.insert(0, BACKEND_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'local_qc_settings')

import django  # noqa: E402

django.setup()

from django.db import connection  # noqa: E402
from geo.models import Province  # noqa: E402


def run_sql_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Postgres -> portable: NOW() exists in Postgres only;
    # CURRENT_TIMESTAMP works in both Postgres and SQLite.
    content = content.replace('NOW()', 'CURRENT_TIMESTAMP')
    statements = [s.strip() for s in content.split(';') if s.strip()]
    with connection.cursor() as cursor:
        for stmt in statements:
            cursor.execute(stmt)
    return len(statements)


def main():
    force = '--force' in sys.argv[1:]
    if Province.all_objects.exists() and not force:
        print('Geo data already loaded. Use --force to reload.')
        return 0

    data_dir = os.path.join(BACKEND_DIR, 'apps', 'geo', 'data')
    provinces_sql = os.path.join(data_dir, 'provinces.sql')
    cities_sql = os.path.join(data_dir, 'cities.sql')
    if not os.path.exists(provinces_sql) or not os.path.exists(cities_sql):
        print('ERROR: provinces.sql or cities.sql not found in apps/geo/data/')
        return 1

    print('Loading provinces...')
    n1 = run_sql_file(provinces_sql)
    print('Loading cities...')
    n2 = run_sql_file(cities_sql)

    from geo.models import City  # noqa: E402
    print(f'Done: {n1 + n2} statements | '
          f'provinces={Province.all_objects.count()} '
          f'cities={City.all_objects.count()}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
