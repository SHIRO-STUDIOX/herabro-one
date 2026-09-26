import os
from dotenv import load_dotenv

# Load from .env if present
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    load_dotenv(env_path)

DEFAULT_REPORT_FILE = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "project-report.md")
)

FARO_BASE_URL = os.getenv("FARO_BASE_URL", "https://faro.ir")
FARO_SESSION_COOKIE = os.getenv("FARO_SESSION_COOKIE", "")
FARO_CSRF_TOKEN = os.getenv("FARO_CSRF_TOKEN", "")
FARO_AUTH_TOKEN = os.getenv("FARO_AUTH_TOKEN", "")
FARO_DEFAULT_BOARD_ID = os.getenv("FARO_DEFAULT_BOARD_ID", "")
FARO_DEFAULT_COLUMN_ID = os.getenv("FARO_DEFAULT_COLUMN_ID", "")
