from django.test import TestCase
from django.core.exceptions import ValidationError
from apps.affiliate.validators import validate_iranian_sheba

class ShebaValidatorTestCase(TestCase):
    def test_valid_sheba(self):
        # Valid Iranian Sheba calculated via ISO 7064 Mod-97
        # Account: 0170000000010032420001 -> Check digits: 42
        valid_sheba = "IR420170000000010032420001"
        try:
            validate_iranian_sheba(valid_sheba)
        except ValidationError:
            self.fail(f"Valid Sheba {valid_sheba} raised ValidationError unexpectedly!")

    def test_invalid_sheba_prefix(self):
        with self.assertRaises(ValidationError) as cm:
            validate_iranian_sheba("US730170000000010032420001")
        self.assertIn("با IR آغاز شده", str(cm.exception))

    def test_invalid_sheba_length(self):
        with self.assertRaises(ValidationError) as cm:
            validate_iranian_sheba("IR7301700000000100324200")
        self.assertIn("دقیقا ۲۶ کاراکتر", str(cm.exception))

    def test_invalid_sheba_non_digit_characters(self):
        with self.assertRaises(ValidationError) as cm:
            validate_iranian_sheba("IR7301700000000100324200AB")
        self.assertIn("ارقام عددی", str(cm.exception))

    def test_invalid_sheba_checksum(self):
        # Wrong check digits (99 instead of 73)
        with self.assertRaises(ValidationError) as cm:
            validate_iranian_sheba("IR990170000000010032420001")
        self.assertIn("خطای Checksum", str(cm.exception))
