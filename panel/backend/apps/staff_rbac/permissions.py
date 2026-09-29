from rest_framework import permissions

def get_admin_profile(request):
    """Helper to safely fetch admin_profile if user is authenticated."""
    if not request.user or not request.user.is_authenticated:
        return None
    try:
        profile = request.user.admin_profile
        return profile if profile.is_active else None
    except Exception:
        return None

class IsAdminStaff(permissions.BasePermission):
    """Allows access only to active admin staff."""
    def has_permission(self, request, view):
        profile = get_admin_profile(request)
        return profile is not None

class IsSuperAdmin(permissions.BasePermission):
    """Allows access only to SUPER_ADMIN role."""
    def has_permission(self, request, view):
        profile = get_admin_profile(request)
        return bool(profile and profile.role == 'SUPER_ADMIN')

class TenantAccessPermission(permissions.BasePermission):
    """
    RBAC for Tenants:
    - GET (List/Detail): Allowed for SUPER_ADMIN, SUPPORT_AGENT, SALES_MANAGER
    - POST/PUT/DELETE/Actions (Suspend, Impersonate, Override): Allowed for SUPER_ADMIN and SUPPORT_AGENT
    """
    def has_permission(self, request, view):
        profile = get_admin_profile(request)
        if not profile:
            return False
        
        if request.method in permissions.SAFE_METHODS:
            return True
            
        return profile.role in ['SUPER_ADMIN', 'SUPPORT_AGENT']

class AffiliateAccessPermission(permissions.BasePermission):
    """
    RBAC for Affiliates & Promo Codes:
    - View affiliates/promo codes: All
    - Manage promo codes: SUPER_ADMIN, SALES_MANAGER
    - Execute payout: SUPER_ADMIN ONLY
    """
    def has_permission(self, request, view):
        profile = get_admin_profile(request)
        if not profile:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        if getattr(view, 'action', None) == 'payout':
            return profile.role == 'SUPER_ADMIN'

        # Other modifications (like creating/updating promo codes or affiliate partners)
        return profile.role in ['SUPER_ADMIN', 'SALES_MANAGER']

class PlanStudioPermission(permissions.BasePermission):
    """
    RBAC for Plans:
    - Safe methods (GET): All roles can view
    - Mutations (POST, PUT, DELETE, set-featured): SUPER_ADMIN ONLY
    """
    def has_permission(self, request, view):
        profile = get_admin_profile(request)
        if not profile:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        return profile.role == 'SUPER_ADMIN'

class AuditLogPermission(permissions.BasePermission):
    """
    RBAC for Audit Logs:
    - SUPER_ADMIN: Can view all audit logs
    - SUPPORT_AGENT: Can view only their own logs
    - SALES_MANAGER: Forbidden
    """
    def has_permission(self, request, view):
        profile = get_admin_profile(request)
        if not profile:
            return False
        return profile.role in ['SUPER_ADMIN', 'SUPPORT_AGENT']
