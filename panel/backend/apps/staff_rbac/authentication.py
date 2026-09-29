from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken
from django.conf import settings
from .models import AdminStaff

class AdminJWTAuthentication(JWTAuthentication):
    """
    Dedicated JWT Authentication for Admin Staff with separate signing key and profile validation.
    """
    def get_user(self, validated_token):
        user = super().get_user(validated_token)
        
        # Ensure user has an active AdminStaff profile
        try:
            admin_staff = user.admin_profile
            if not admin_staff.is_active or not user.is_active:
                raise AuthenticationFailed('حساب کاربری ادمین غیرفعال شده است.', code='admin_inactive')
        except AdminStaff.DoesNotExist:
            raise AuthenticationFailed('دسترسی به پنل مدیریت برای این کاربر تعریف نشده است.', code='not_admin')

        return user
