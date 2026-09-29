import json
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.http import HttpResponse
from apps.staff_rbac.models import AdminStaff, SecurityAuditLog
from apps.staff_rbac.middleware import AuditLogMiddleware, mask_sensitive_data

class AuditMiddlewareMaskingTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.middleware = AuditLogMiddleware(get_response=lambda r: HttpResponse(status=201))
        self.user = User.objects.create_user(username='auditor', password='password123')
        self.admin_staff = AdminStaff.objects.create(
            user=self.user,
            role='SUPER_ADMIN',
            mobile='09127777777'
        )

    def test_mask_sensitive_data_helper(self):
        sample_payload = {
            'username': 'john',
            'password': 'secret_password_123',
            'token': 'jwt_super_secret',
            'service_token': 's2s_key_1050',
            'sheba_number': 'IR730170000000010032420001',
            'nested': {
                'secret_key': 'topsecret',
                'amount_rial': 5000000
            }
        }
        masked = mask_sensitive_data(sample_payload)
        self.assertEqual(masked['password'], '***')
        self.assertEqual(masked['token'], '***')
        self.assertEqual(masked['service_token'], '***')
        self.assertEqual(masked['sheba_number'], '***')
        self.assertEqual(masked['nested']['secret_key'], '***')
        self.assertEqual(masked['username'], 'john')
        self.assertEqual(masked['nested']['amount_rial'], 5000000)

    def test_audit_log_created_and_masked_on_mutating_request(self):
        body = {
            'username': 'new_staff',
            'password': 'PlainPassword123',
            'role': 'SUPPORT_AGENT',
            'mobile': '09121234567'
        }
        request = self.factory.post(
            '/api/v1/admin/staff/',
            data=json.dumps(body),
            content_type='application/json'
        )
        request.user = self.user

        response = HttpResponse(status=201)
        self.middleware.process_response(request, response)

        # Check log in DB
        log = SecurityAuditLog.objects.filter(admin_staff=self.admin_staff).first()
        self.assertIsNotNone(log)
        self.assertIn('payload', log.details)
        payload = log.details['payload']
        self.assertEqual(payload['password'], '***')
        self.assertEqual(payload['mobile'], '09121234567')
        self.assertEqual(payload['role'], 'SUPPORT_AGENT')
