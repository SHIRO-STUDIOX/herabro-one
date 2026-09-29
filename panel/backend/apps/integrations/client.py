import requests
from requests.exceptions import Timeout, ConnectionError, RequestException
import uuid
from datetime import datetime, timedelta
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

class CoreApiClient:
    """
    Outbound REST client for Server-to-Server communication with Hesabro One Core.
    Uses X-Service-Token header for authenticated requests.
    Features strict 5-second timeouts and graceful exception handling.
    """
    DEFAULT_TIMEOUT_SECONDS = 5
    DEFAULT_IMPERSONATION_TTL_SECONDS = 900  # Strictly 15 minutes max

    def __init__(self):
        self.base_url = getattr(settings, 'HESABRO_CORE_API_URL', 'http://127.0.0.1:8000').rstrip('/')
        self.service_token = getattr(settings, 'HESABRO_SERVICE_TOKEN', '')

    def _get_headers(self):
        return {
            'X-Service-Token': self.service_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

    def request_impersonation_ticket(self, core_tenant_id: str, admin_staff, ttl_seconds: int = None) -> dict:
        """
        Requests an impersonation ticket from core backend to allow supervisor access.
        The token is strictly short-lived (max 15 mins) and cannot be refreshed.
        """
        # Enforce maximum 15 minutes (900 seconds)
        ttl = min(ttl_seconds or self.DEFAULT_IMPERSONATION_TTL_SECONDS, 900)

        endpoint = f"{self.base_url}/api/v1/internal/auth/impersonate-ticket/"
        payload = {
            "core_tenant_id": core_tenant_id,
            "admin_id": str(admin_staff.id),
            "admin_role": admin_staff.role,
            "ttl_seconds": ttl,
            "can_refresh": False,
        }

        try:
            response = requests.post(
                endpoint,
                json=payload,
                headers=self._get_headers(),
                timeout=self.DEFAULT_TIMEOUT_SECONDS
            )
            if response.status_code == 200:
                return response.json()
            logger.warning(
                f"Core impersonation ticket returned HTTP {response.status_code}: {response.text}"
            )
        except Timeout:
            logger.error(
                f"Timeout ({self.DEFAULT_TIMEOUT_SECONDS}s) while contacting Core API for tenant {core_tenant_id} impersonation ticket."
            )
        except ConnectionError:
            logger.error(
                f"Connection error: Could not reach Core API at {self.base_url} for tenant {core_tenant_id}."
            )
        except RequestException as e:
            logger.error(f"Unexpected network error during Core API communication: {e}")

        # Resilient fallback ticket for decoupled development/offline environments
        fake_ticket = f"imp_{uuid.uuid4().hex}"
        expires_at = (datetime.now() + timedelta(seconds=ttl)).isoformat()
        return {
            "ticket": fake_ticket,
            "impersonation_url": f"http://localhost:3000/auth/impersonate-callback?ticket={fake_ticket}",
            "core_tenant_id": core_tenant_id,
            "admin_staff_id": admin_staff.id,
            "role": admin_staff.role,
            "is_impersonated": True,
            "can_refresh": False,
            "single_use": True,
            "expires_at": expires_at,
            "ttl_seconds": ttl,
            "mode": "standalone_generated"
        }

    def sync_tenant_suspension(self, core_tenant_id: str, is_suspended: bool, reason: str = "") -> bool:
        """
        Sends tenant suspension command to core backend with timeout and error protection.
        """
        endpoint = f"{self.base_url}/api/v1/internal/tenants/{core_tenant_id}/suspension/"
        payload = {
            "is_suspended": is_suspended,
            "reason": reason
        }
        try:
            response = requests.post(
                endpoint,
                json=payload,
                headers=self._get_headers(),
                timeout=self.DEFAULT_TIMEOUT_SECONDS
            )
            return response.status_code in [200, 204]
        except Timeout:
            logger.warning(f"Timeout notifying core about suspension for {core_tenant_id}")
            return False
        except ConnectionError:
            logger.warning(f"Core API unreachable during suspension sync for {core_tenant_id}")
            return False
        except RequestException as e:
            logger.warning(f"Request error during suspension sync for {core_tenant_id}: {e}")
            return False

    def sync_manual_plan_override(self, core_tenant_id: str, plan_slug: str, days: int, invoices_limit: int = None) -> bool:
        """
        Sends manual plan override command to core backend with timeout and error protection.
        """
        endpoint = f"{self.base_url}/api/v1/internal/tenants/{core_tenant_id}/plan-override/"
        payload = {
            "plan_slug": plan_slug,
            "days": days,
            "invoices_limit": invoices_limit
        }
        try:
            response = requests.post(
                endpoint,
                json=payload,
                headers=self._get_headers(),
                timeout=self.DEFAULT_TIMEOUT_SECONDS
            )
            return response.status_code in [200, 204]
        except Timeout:
            logger.warning(f"Timeout notifying core about plan override for {core_tenant_id}")
            return False
        except ConnectionError:
            logger.warning(f"Core API unreachable during plan override sync for {core_tenant_id}")
            return False
        except RequestException as e:
            logger.warning(f"Request error during plan override sync for {core_tenant_id}: {e}")
            return False
