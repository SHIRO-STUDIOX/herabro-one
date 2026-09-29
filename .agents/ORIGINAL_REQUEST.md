# Original User Request

## 2026-09-01T11:01:48Z

This is a single self-contained task; keep it small and focused.
یکپارچهسازی کامل و مستقل فرانتاند Vue 3 (hesabro-one) و بکاند Django (hesabro-one-backend-django) در یک مخزن و ساختار اجرایی واحد تحت عنوان hesabro-platform با Docker، مدیریت مشترک محیطها، پروکسی معکوس Nginx، احراز هویت یکپارچه و تستهای کامل بدون دستکاری پروژههای اولیه.

Working directory: d:/Projects/Hesabro-one/hesabro-platform
Integrity mode: development

## Requirements

### R1. ایزولاسیون و عدم تغییر سورسهای اصلی (Read-Only Isolation)
پروژههای موجود در مسیرهای `d:/Projects/Hesabro-one/hesabro-one` و `d:/Projects/Hesabro-one/hesabro-one-backend-django` باید ۱۰۰٪ بدون تغییر و دستنخورده باقی بمانند. تمام تغییرات، کپیها، تنظیمات و خروجیها در دایرکتوری جدید `d:/Projects/Hesabro-one/hesabro-platform` قرار میگیرند.

### R2. ساختار پروژه یکپارچه (Unified Project Structure)
پروژه جدید `hesabro-platform` در مسیر `d:/Projects/Hesabro-one/hesabro-platform` با ساختار زیر ایجاد شود:
- `backend/`: شامل کل کدهای بکاند جنگو و تنظیمات
- `frontend/`: شامل کل کدهای فرانتاند Vue 3 و کانفیگها
- `docker/`: شامل داکرفایلهای تفکیکشده برای Backend، Frontend و Nginx
- `docker-compose.yml`, `docker-compose.dev.yml`, `docker-compose.prod.yml`
- `.env.example`, `.gitignore`, `Makefile`, `README.md`

### R3. یکپارچهسازی و تطبیق قرارداد API (API Integration & Client)
کلاینت فرانتاند و کدهای سرویس باید بدون URLهای سختکد (مانند localhost یا 127.0.0.1) از طریق Reverse Proxy و متغیر محیطی `VITE_API_BASE_URL` با اندپوینتهای بکاند در مسیرهای `/api/` و `/admin/` ارتباط برقرار کنند و تمام جریانهای احراز هویت (OTP، لاگین، Onboarding، رفرش توکن) به صورت End-to-End هماهنگ باشند.

### R4. معماری Docker و اجرای تکدستوری (Dockerization & Single-Command Run)
پشتیبانی کامل از دو حالت توسعه (Development با Hot Reload و Live Volume) و تولید (Production با بیلد بهینهشده و WSGI/Gunicorn) با یک دستور مشخص (`make dev` یا `docker compose up --build`). سرویسهای PostgreSQL 17 و Redis 7 باید دارای Health Check و Volumeهای ماندگار باشند.

## Acceptance Criteria

### ۱. یکپارچگی سورسهای اصلی
- [ ] پروژههای مبدأ `hesabro-one/` و `hesabro-one-backend-django/` هیچ تغییری نکرده باشند.

### ۲. بیلد و تایپچک
- [ ] اجرای `npm run build` در `frontend/` پروژه جدید با خروجی موفق در `dist/`.
- [ ] اجرای `npm run type-check` بدون هیچ خطایی پایان یابد.
- [ ] اجرای `python manage.py check` در بکاند بدون خطا تایید شود.

### ۳. تستهای خودکار
- [ ] تمام ۷۷ تست واحد فرانتاند (`npm run test:unit -- --run`) با موفقیت پاس شوند.
- [ ] ساختار و فایلهای اجرایی سیستم بررسی و تایید شوند.

### ۴. راهاندازی و کانفیگ Docker
- [ ] دستور `docker compose -f docker-compose.yml -f docker-compose.dev.yml config` بدون خطای سینتکس تایید شود.
- [ ] فایلهای `.env.example` و مستندات `README.md` و `Makefile` به صورت کامل در دسترس باشند.
