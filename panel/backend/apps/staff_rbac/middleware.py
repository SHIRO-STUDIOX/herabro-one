import json
from django.utils.deprecation import MiddlewareMixin
from .models import SecurityAuditLog, AdminStaff

SENSITIVE_KEYS = {'password', 'token', 'secret', 'sheba', 'access', 'refresh', 'service_token'}

def mask_sensitive_data(data):
    """Recursively mask sensitive fields in dictionaries/lists."""
    if isinstance(data, dict):
        masked = {}
        for key, value in data.items():
            if any(sensitive in key.lower() for sensitive in SENSITIVE_KEYS):
                masked[key] = '***'
            elif isinstance(value, (dict, list)):
                masked[key] = mask_sensitive_data(value)
            else:
                masked[key] = value
        return masked
    elif isinstance(data, list):
        return [mask_sensitive_data(item) for item in data]
    return data

def get_client_ip(request):
    """Extract real client IP considering reverse proxies."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '127.0.0.1')

class AuditLogMiddleware(MiddlewareMixin):
    """
    Automatic Audit Trail Middleware:
    Audits mutating HTTP methods (POST, PUT, PATCH, DELETE) executed by authenticated AdminStaff.
    Masks sensitive fields and safely handles file uploads.
    """
    MUTATING_METHODS = {'POST', 'PUT', 'PATCH', 'DELETE'}

    def process_response(self, request, response):
        if request.method not in self.MUTATING_METHODS:
            return response

        # Skip login endpoints to prevent logging authentication attempt bodies (or keep simple log)
        if '/admin/auth/login' in request.path:
            return response

        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return response

        try:
            admin_staff = getattr(user, 'admin_profile', None)
        except Exception:
            admin_staff = None

        if not admin_staff:
            return response

        # Extract payload
        payload_details = {}
        content_type = request.content_type or ''

        if 'application/json' in content_type:
            try:
                body = request.body.decode('utf-8') if hasattr(request, 'body') else '{}'
                data = json.loads(body) if body else {}
                payload_details = mask_sensitive_data(data)
            except Exception:
                payload_details = {'error': 'Could not parse JSON body'}
        elif 'multipart/form-data' in content_type:
            data = request.POST.dict()
            for file_field in request.FILES:
                data[file_field] = f"<File: {request.FILES[file_field].name}>"
            payload_details = mask_sensitive_data(data)
        else:
            payload_details = mask_sensitive_data(request.POST.dict())

        # Determine target object and action type
        path = request.path
        action_type = f"{request.method} {path}"
        target_object = path

        # Try to obtain structured context if view set it on request
        if hasattr(request, '_audit_action_type'):
            action_type = request._audit_action_type
        if hasattr(request, '_audit_target_object'):
            target_object = request._audit_target_object

        SecurityAuditLog.objects.create(
            admin_staff=admin_staff,
            action_type=action_type,
            target_object=str(target_object)[:255],
            ip_address=get_client_ip(request),
            details={
                'method': request.method,
                'path': path,
                'status_code': response.status_code,
                'payload': payload_details
            }
        )

        return response
