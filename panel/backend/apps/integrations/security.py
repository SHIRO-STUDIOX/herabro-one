import hmac
import hashlib
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

def verify_hmac_signature(raw_body: bytes, signature_header: str) -> bool:
    """
    Verifies that the inbound webhook request has a valid HMAC-SHA256 signature
    matching the shared secret key.
    """
    if not signature_header:
        return False

    secret = getattr(settings, 'HESABRO_WEBHOOK_SECRET', '').encode('utf-8')
    computed_signature = hmac.new(secret, raw_body, hashlib.sha256).hexdigest()

    # Constant time comparison to prevent timing attacks
    return hmac.compare_digest(computed_signature, signature_header)
