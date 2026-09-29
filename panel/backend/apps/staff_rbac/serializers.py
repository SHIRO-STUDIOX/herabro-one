from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import AdminStaff, SecurityAuditLog

class AdminLoginSerializer(serializers.Serializer):
    mobile = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        mobile = attrs.get('mobile')
        password = attrs.get('password')

        try:
            admin_staff = AdminStaff.objects.select_related('user').get(mobile=mobile)
        except AdminStaff.DoesNotExist:
            raise serializers.ValidationError('شماره همراه یا کلمه عبور اشتباه است.')

        if not admin_staff.is_active or not admin_staff.user.is_active:
            raise serializers.ValidationError('حساب کاربری ادمین غیرفعال است.')

        user = authenticate(username=admin_staff.user.username, password=password)
        if not user:
            raise serializers.ValidationError('شماره همراه یا کلمه عبور اشتباه است.')

        refresh = RefreshToken.for_user(user)
        # Custom claims
        refresh['role'] = admin_staff.role
        refresh['mobile'] = admin_staff.mobile
        refresh['admin_staff_id'] = admin_staff.id

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': admin_staff.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'mobile': admin_staff.mobile,
                'role': admin_staff.role,
                'role_display': admin_staff.get_role_display(),
            }
        }

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class AdminStaffSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    username = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)
    first_name = serializers.CharField(write_only=True, required=False, default='')
    last_name = serializers.CharField(write_only=True, required=False, default='')
    email = serializers.EmailField(write_only=True, required=False, default='')

    class Meta:
        model = AdminStaff
        fields = [
            'id', 'user', 'role', 'mobile', 'is_active', 'created_at', 'updated_at',
            'username', 'password', 'first_name', 'last_name', 'email'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        username = validated_data.pop('username', None) or validated_data.get('mobile')
        password = validated_data.pop('password', 'Admin@123456')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        email = validated_data.pop('email', '')

        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        admin_staff = AdminStaff.objects.create(user=user, **validated_data)
        return admin_staff

class SecurityAuditLogSerializer(serializers.ModelSerializer):
    staff_username = serializers.CharField(source='admin_staff.user.username', read_only=True)
    staff_role = serializers.CharField(source='admin_staff.role', read_only=True)

    class Meta:
        model = SecurityAuditLog
        fields = [
            'id', 'admin_staff', 'staff_username', 'staff_role',
            'action_type', 'target_object', 'ip_address', 'details', 'timestamp'
        ]
