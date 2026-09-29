from django.core.exceptions import ValidationError

def validate_iranian_sheba(value: str):
    """
    اعتبارسنجی استاندارد شماره شبا با الگوریتم Mod-97 (ISO 7064)
    فرمت: IR + ۲ رقم کنترلی + ۲۲ رقم شماره حساب
    """
    if not value or not isinstance(value, str):
        raise ValidationError('شماره شبا الزامی است.')

    val = value.strip().upper()
    if not val.startswith('IR') or len(val) != 26:
        raise ValidationError('شماره شبا باید با IR آغاز شده و دقیقا ۲۶ کاراکتر باشد.')

    if not val[2:].isdigit():
        raise ValidationError('۲۴ کاراکتر پس از IR باید ارقام عددی باشند.')

    # تبدیل به رشته عددی با جابجایی ۴ کاراکتر اول به انتها
    # I = 18, R = 27
    numeric_string = val[4:] + '1827' + val[2:4]
    if int(numeric_string) % 97 != 1:
        raise ValidationError('ساختار شماره شبا معتبر نمی‌باشد (خطای Checksum).')
