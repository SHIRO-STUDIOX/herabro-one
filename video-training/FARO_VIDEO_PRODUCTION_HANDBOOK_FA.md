# راهنمای اجرایی تولید ویدیوهای آموزشی فارو

این سند برای ضبط‌کنندهٔ صفحه، گوینده، تدوینگر و بازبین محصول نوشته شده است. بسته شامل نقشهٔ قابلیت‌ها، برنامهٔ انتشار و ۴۲ سناریوی مستقل با مراحل ضبط، دادهٔ نمونه، نریشن و شات‌لیست است. مبنای تحلیل نسخهٔ 0.1.3+13 روی شاخهٔ main و کامیت 4086c13d است؛ تاریخ بررسی ۲۰۲۶/۱۰/۲۵ است.

**وضعیت تحویل:** نگارش سند و بررسی استاتیک کد انجام شده است. اجرای تعاملی برنامه، اتصال به سرور، ورود با OTP، ارسال پیام و نامه، تست مجوزها و ضبط ویدیو در این کار انجام نشده‌اند. بنابراین هیچ سناریویی مهر «اجرای موفق در محصول» ندارد. نتیجه‌های نوشته‌شده، رفتار مورد انتظار بر پایهٔ کد هستند؛ برگهٔ تأیید اجرای هر برداشت باید پیش از ضبط پر شود. آزمون‌های موجود مخزن نیز در این نوبت اجرا نشده‌اند و وجود آن‌ها به‌عنوان نتیجهٔ آزمون گزارش نشده است.

این نسخه برای آماده‌سازی و آزمون برداشت کامل است. آماده‌بودن هر ویدیو برای انتشار، به تطبیق کنترل‌ها و موفقیت مسیر در محیط آموزشی وابسته است. سند عمداً قابلیت «بزودی» را به آموزش عملی تبدیل نمی‌کند. متغیرهایی مانند شناسهٔ واقعی پروژه، نام مدل مجاز و دکمه‌های پنجرهٔ چاپ سیستم باید پیش از برداشت در برگهٔ آماده‌سازی ثبت شوند؛ هیچ مقدار حدسی جای آن‌ها گذاشته نشده است.

## راه استفاده از بسته

۱. مسئول محصول، محیط آموزشی و حساب‌های آزمایشی را با مشخصات بخش آماده‌سازی فراهم کند. ۲. ضبط‌کننده، سناریوی انتخابی را یک بار بدون ضبط اجرا و در `recording-verification.csv` نتیجه را ثبت کند. ۳. در صورت تفاوت UI، پیش از ضبط، مرحله و نریشن همان سناریو با نسخهٔ اجرا تطبیق داده شوند. ۴. ضبط تصویر با زمان‌های جدول انجام شود. ۵. گوینده متن بخش نریشن را بخواند و تدوینگر از شات‌لیست استفاده کند. ۶. بازبین، کنترل کیفیت همان سناریو را تکمیل کند.

برای خواندن، نسخهٔ HTML راست‌به‌چپ مناسب است. نسخهٔ Markdown متن قابل ویرایش و مرجع محتوایی است. `feature-inventory.csv` تمام ستون‌های نقشهٔ قابلیت‌ها را دارد. `curriculum.csv` برنامهٔ ویدیوها و `ui-controls.csv` متن کنترل‌های ترجمه‌شده با محل استفاده در کد را ثبت می‌کنند. جدول کنترل‌ها یک نمایهٔ نامزدهای رابط است و هر ردیف آن به‌تنهایی به معنی قابلیت قابل استفاده نیست.

## روش بررسی و حدود شواهد

بررسی از زنجیرهٔ Route و پوسته به View، callback، ViewModel، اعتبارسنجی، Repository و endpoint پیش رفته است. متن کنترل‌های کلیدی با `assets/l10n/fa.json` تطبیق داده شده است. برای مسیرهای مهم، وضعیت خالی، حالت بارگذاری، خطا، پیش‌نویس، مجوز و نتیجهٔ مورد انتظار بررسی شده‌اند. نمایهٔ ترجمه‌ها به شکل ماشینی از تمام فایل‌های Dart زیر lib استخراج شده؛ تحلیل دستی روی مسیرهای اصلی این سند متمرکز است. این کار، ممیزی امنیتی یا اثبات نبود خطا در تمام خطوط مخزن نیست.

طبقه‌بندی شواهد به این صورت است: «کد تأییدشده» یعنی کنترل و منطق مرتبط در نسخهٔ مبنا دیده شده‌اند؛ «اجرا نیازمند تست» یعنی نتیجهٔ واقعی به سرور، حساب، OS یا داده وابسته است؛ «نامشخص» یعنی زنجیرهٔ قابل استفادهٔ UI ثابت نشده؛ «بزودی یا placeholder» یعنی مسیر در این نسخه آموزش عملی ندارد. هیچ ادعای موفقیت اجرایی از روی نام فایل یا endpoint تنها ساخته نشده است.

سورس Backend در این مخزن مبنای بررسی حاضر در دسترس نیست. مسیرهای API و قراردادهای DTO قابل مشاهده‌اند؛ زبان، چارچوب، ساختار دیتابیس و صحت استقرار Backend از این شواهد قابل تعیین نیستند.

## معماری و ساختار محصول

فارو یک برنامهٔ Flutter با Dart است. محدودیت SDK در pubspec برابر ^3.13.0 است. مدیریت وضعیت با Riverpod، مسیریابی با go_router، ارتباط HTTP با Dio و بومی‌سازی با easy_localization انجام می‌شود. نسخهٔ فارسی و RTL محور این بسته است؛ برنامه منابع فارسی، عربی و انگلیسی دارد. ویندوز، macOS، لینوکس و مسیرهای وب و موبایل در کد دیده می‌شوند؛ برداشت مبنا برای دسکتاپ ویندوز طراحی شده و موفقیت اجرای سایر سیستم‌ها ادعا نشده است.

`lib/app` شامل bootstrap، router، shell، registry، theme و ویجت‌های مشترک است. `lib/core` شبکه، ذخیره‌سازی، سرویس‌های سیستم‌عامل، خطا، لاگ، تنظیمات و میانبرها را در بر می‌گیرد. `lib/features` شامل auth، profile، projects، ai، chat، tasks، mail، search، notifications، release و cloud است. `assets/l10n` مرجع متن‌های ترجمه‌شده، و `test` شامل آزمون‌های unit و widget و سایر آزمون‌های موجود است.

الگوی غالب، feature-first و MVVM است: View اقدام را به Notifier یا ViewModel می‌فرستد؛ ViewModel وضعیت را مدیریت و Repository را فراخوانی می‌کند. برای ماژول‌های اصلی پیاده‌سازی Mock و Dio وجود دارد. نمونهٔ روشن انتخاب Mock در Repository جست‌وجو دیده می‌شود. Mock برای آماده‌سازی نمایشی مفید است، ولی پاسخ شبکه، مجوز واقعی، بارگذاری فایل و تحویل پیام را ثابت نمی‌کند. [lib/features/search/repositories/search_repository.dart:16](../faro-flutter/lib/features/search/repositories/search_repository.dart#L16) [lib/app/bootstrap.dart:53](../faro-flutter/lib/app/bootstrap.dart#L53) [lib/core/network/network_service.dart:23](../faro-flutter/lib/core/network/network_service.dart#L23)

سلسله‌مراتب داده در معماری پروژه از کاربر و عضویت در فضای کاری به پروژه، و در مدل‌های پیشرفته به بخش، جریان کاری، بورد، ستون و وظیفه می‌رسد. وجود این مدل‌ها با امکان ایجاد همهٔ آن‌ها در UI یکسان نیست. در فرم فعلی ایجاد و ویرایش پروژه، بخش‌بندی و جریان‌های کاری با «بزودی» نمایش داده می‌شود. بورد و ستون‌های پروژه مسیر اجرایی جدا دارند. [lib/features/projects/views/widgets/create_project_dialog.dart:94](../faro-flutter/lib/features/projects/views/widgets/create_project_dialog.dart#L94) [lib/features/tasks/task_board/views/task_board_view.dart:138](../faro-flutter/lib/features/tasks/task_board/views/task_board_view.dart#L138)

پوستهٔ دسکتاپ نوار کناری، انتخابگر فضای کاری، ایجاد آیتم، ابزارها، پروژه‌های سنجاق‌شده و تنظیمات را یکپارچه می‌کند. مودال‌ها در ناوبری اصلی ظاهر می‌شوند و معمولاً URL جدا ندارند؛ بنابراین در سناریوها هم Route و هم مسیر منو نوشته شده است. پنجره‌های ثانویه و Quick Prompt در کد bootstrap و سرویس هماهنگ‌کننده دیده می‌شوند و پیش از ساخت آموزش مستقل به آزمون دسکتاپ نیاز دارند. [lib/app/shell/views/app_shell_view.dart:49](../faro-flutter/lib/app/shell/views/app_shell_view.dart#L49) [lib/features/ai/quick_prompt/services/quick_ai_prompt_coordinator.dart:451](../faro-flutter/lib/features/ai/quick_prompt/services/quick_ai_prompt_coordinator.dart#L451)

## مسیرهای واقعی و مقصدهای کاربر

| مسیر | مقصد و رفتار فعلی | روش ورود پیشنهادی ضبط | محدودیت |
|---|---|---|---|
| /login | ورود، کد تایید و در صورت نیاز تکمیل مشخصات | حساب آزمون خارج‌شده | OTP وابسته به سرور است |
| / | کاربر واردشده به /ai هدایت می‌شود | برای آموزش داشبورد استفاده نشود | خانه مستقل آماده نیست |
| /profile | صفحهٔ حساب و فضاها و پروژه‌ها در چیدمان فعلی | گزینهٔ پروژه‌ها یا مسیر حساب | RouteNames.projects نیز همین مسیر است |
| /projects | هدایت به /profile | به جای آن صفحهٔ پروژه‌ها باز شود | مقصد مستقل نیست |
| /projects/:projectId | ورودی پروژه | انتخاب کارت پروژه | شناسه از دادهٔ واقعی محیط آزمون |
| /ai | فهرست و شروع گفت‌وگوی هوش مصنوعی | هوش‌مصنوعی در نوار کناری | مدل و سهمیه باید موجود باشد |
| /ai/conversation/:conversationId | جزئیات گفت‌وگو | انتخاب گفت‌وگوی مجاز | نیازمند دسترسی همان گفتگو |
| /projects/:projectId/ai | AI در زمینهٔ پروژه | ابزار AI پروژه | دسترسی پروژه لازم است |
| /projects/:projectId/ai/conversation/:conversationId | گفت‌وگوی AI پروژه | نتیجهٔ گفت‌وگو در پروژه | دو شناسه نباید ساختگی باشند |
| /chat و /projects/:projectId/chat | گفت‌وگو و زمینهٔ پروژه | ابزار گفت‌وگو یا پروژه | انتخاب اتاق در state و query قابل انجام است |
| /tasks و /projects/:projectId/tasks | فهرست وظایف عمومی یا پروژه | وظایف و پروژه | محدودهٔ تب و مجوز مهم است |
| /board | ورودی بورد بر اساس پروژهٔ انتخابی | بورد همان پروژه | بدون پروژه مقصد می‌تواند فهرست پروژه‌ها باشد |
| /projects/:projectId/board | بورد پروژه | انتخاب پروژه سپس نمای بورد | بورد و ستون‌ها باید وجود داشته باشند |
| /projects/:projectId/calendar | TasksPlaceholderView | آموزش عملی ساخته نشود | تقویم واقعی تأیید نشده |
| /mail | نامه‌ها و مودال جزئیات | نامه در نوار کناری | پلن و canMail و خطای سرور ممکن است دسترسی را ببندند |
| /cloud | CloudPlaceholderView | آموزش عملی ساخته نشود | فضای ابری بزودی است |
| /search | با احراز هویت به /ai هدایت می‌شود | Ctrl+K یا کنترل جست‌وجوی پوسته | از مسیر مستقیم در ویدیو استفاده نشود |
| /notes | فقط در registry به‌عنوان ابزار آینده دیده شد | آموزش ساخته نشود | Route فعال هم‌نام در router حاضر نیست |

مرجع جدول Routeهای ثبت‌شده است؛ فقط نام ثابت Route ملاک قرار نگرفته است. [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) [lib/app/router/route_names.dart:2](../faro-flutter/lib/app/router/route_names.dart#L2) [lib/app/registry/module_registry.dart:29](../faro-flutter/lib/app/registry/module_registry.dart#L29)

برای لینک رکوردها، کد تبدیل مسیرهای `businesses/:businessId/farochat/rooms/:roomId` و پیام مشخص آن اتاق، `businesses/:businessId/tasks/items/:taskId`، `businesses/:businessId/letters/:letterId` و `businesses/:businessId/projects/:projectId` را به مسیرهای داخلی دارد. در اجرای آموزشی، queryهای `room`، `task` و `letter` می‌توانند انتخاب مقصد را منتقل کنند. این مسیرها مجوز مشاهده ایجاد نمی‌کنند. لینک نمونه باید از همان محیط و رکورد مجاز گرفته شود. [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39)

## نقش‌ها و سطح دسترسی

| حوزه | کنترل قابل مشاهده در کد | نتیجه برای آموزش |
|---|---|---|
| عضویت فضای کاری | role، userRole، owner و manager و member و guest | عنوان نقش به‌تنهایی جای permission را نمی‌گیرد |
| مدیریت پروژه | canManageProjects و AppPermissionGuard | ایجاد، ویرایش، آرشیو و عملیات مربوطه با حساب مجاز ضبط شوند |
| اعضای فضای کاری | canManageMembers؛ کنترل مالک و حساب جاری | برای تغییر نقش و حذف، عضو آزمایشی غیرمالک انتخاب شود |
| تنظیمات فضای کاری | isManager و guard مربوطه | ویدیوی تنظیمات با حساب مدیر یا مالک آماده شود |
| چت | canChat و وضعیت اجازهٔ ارسال اتاق | کانال ممکن است ارسال را به مدیر محدود کند |
| اشتراک پروژه | نقش واقعی عضو پروژه و fallback فضای کاری | مدیر پروژه و عضو مشاهده‌گر جداگانه بررسی شوند |
| وظیفه | canEdit و canChangeStatus روی دادهٔ همان وظیفه | وجود یک دکمه در یک وظیفه به معنی امکان همان کار روی همهٔ وظایف نیست |
| نامه | canMail، isMailEnabled، نتیجهٔ پلن سرور | دسترسی پیش از تولید سناریوهای نامه تأیید شود |
| پاراف و بایگانی | myRecipient، needsParaf و canLabel | حساب گیرنده و وضعیت همان نامه در آماده‌سازی ثبت شود |

کد guard سمت کلاینت برای تنظیم تجربهٔ کاربر است؛ مرجع نهایی پذیرش عملیات، پاسخ سرویس است. نقش‌های پیش‌فرض بعضی مدل‌ها نباید به‌جای دادهٔ واقعی سرور استفاده شوند. [lib/app/shell/models/app_workspace_model.dart:8](../faro-flutter/lib/app/shell/models/app_workspace_model.dart#L8) [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40) [lib/features/projects/views/widgets/share_project_dialog.dart:63](../faro-flutter/lib/features/projects/views/widgets/share_project_dialog.dart#L63) [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283) [lib/features/mail/views/widgets/letter_context_menu.dart:12](../faro-flutter/lib/features/mail/views/widgets/letter_context_menu.dart#L12)

## ارتباط با سرویس‌ها و وابستگی‌های اجرایی

| ماژول | قرارداد قابل مشاهدهٔ API | اتصال UI و نتیجهٔ مورد انتظار | شرط آزمون |
|---|---|---|---|
| ورود | auth/request-otp/ و auth/mobile/verify-otp/ | شماره و کد به نشست معتبر منجر می‌شوند | سرویس پیامک، کد جاری، حساب معتبر |
| حساب | auth/profile/، auth/avatar/ و auth/devices/ | مشخصات، آواتار و نشست‌ها | پاسخ واقعی و مجوز حساب |
| فضای کاری | businesses/، businesses/:id/ و members/ | ساخت، تنظیمات، دعوت و نقش | عضویت، guard و اجازهٔ سرور |
| پروژه | businesses/:id/projects/ و members/ | ساخت پروژه و عضویت پروژه | پروژهٔ نمونه و نقش درست |
| AI | models/، conversations/new/ و conversations/:id/ | مدل فعال، ساخت و ادامهٔ گفتگو | سهمیه، مدل مجاز و سرویس پاسخ |
| چت | businesses/:id/farochat/rooms/ و messages/ | اتاق، پیام، پاسخ و پیوست | عضویت و اجازهٔ ارسال؛ WebSocket برای به‌روزرسانی زنده |
| وظایف | tasks/feed/، tasks/items/، move/، checklist/، comments/ و tasks/boards/ | فهرست، ایجاد، انتقال، چک‌لیست، گزارش و ستون | businessId، پروژه، مسئول و metadata معتبر |
| نامه‌ها | businesses/:id/letters/، :letterId/reply/ و forward/ | ایجاد، پاسخ و ارجاع | گیرندگان مجاز، پلن فعال و نشست معتبر |
| عملیات نامه | recipients/:recipientId/action/، :letterId/label/ و ai-assist/ | پاراف، خوانده‌شدن، بایگانی، برچسب و نگارش AI | شناسهٔ گیرنده با شناسهٔ نامه اشتباه نشود |
| جست‌وجو | tasks/feed/ با فیلتر، سایر نتایج از دادهٔ محلی موجود | پنجرهٔ scopeدار با guard درخواست | نتیجهٔ وظایف سرور و دادهٔ بارگیری‌شدهٔ هر محدوده |
| اعلان و release | notifications و سرویس بررسی نسخه | رویدادها و دروازهٔ راه‌اندازی | UI کامل و رفتار OS باید جدا آزموده شوند |

مسیرها نسبی به baseUrl تنظیم‌شدهٔ برنامه هستند؛ این سند میزبان یا توکن را منتشر نمی‌کند. APIهای تعریف‌شده اما فاقد مسیر UI اثبات‌شده، مانند برخی عملیات پیشرفتهٔ چت، خودکار وارد فهرست آموزش نشده‌اند. [lib/core/network/api_endpoints.dart:5](../faro-flutter/lib/core/network/api_endpoints.dart#L5) [lib/features/mail/repositories/dio_letters_repository.dart:16](../faro-flutter/lib/features/mail/repositories/dio_letters_repository.dart#L16) [lib/features/search/repositories/search_repository.dart:16](../faro-flutter/lib/features/search/repositories/search_repository.dart#L16) [lib/core/network/network_service.dart:23](../faro-flutter/lib/core/network/network_service.dart#L23)

## نقشهٔ تجربهٔ کاربر و وضعیت‌های مرزی

| جریان | راه اصلی | حالت خالی یا خطا | نکتهٔ ضبط |
|---|---|---|---|
| ورود | شماره ← درخواست کد ← کد ← حساب | قالب شماره، کد منقضی، شمارنده، نیاز به تکمیل پروفایل | حساب موجود و پوشش شماره و کد |
| انتخاب فضا | نام فضا ← جست‌وجو ← انتخاب | عضویت ناموجود، دعوت در انتظار، بارگیری | نام فضا را ابتدا و انتها نشان دهید |
| پروژه | فهرست ← ساخت یا منوی کارت ← عملیات | عنوان خالی، آفلاین، مجوز کم | پروژه و فضای فعال در قاب معلوم باشند |
| گفت‌وگوی AI | مدل ← متن و پیوست ← ارسال ← پاسخ | مدل خالی، سهمیه، آفلاین، فایل ناسازگار | انتظار کوتاه شود؛ متن پاسخ قطعی فرض نشود |
| چت مستقیم | همکار ← ادامه ← نوع ← شروع ← پیام | همکار ناموجود، اجازهٔ ارسال، پیام ناموفق | هویت گیرنده پیش از ارسال خوانا باشد |
| گروه | نوع گروه ← عنوان ← اعضا ← ساخت | ساخت موفق و افزودن عضو ناموفق | پس از خطا، گروه تکراری نسازید |
| وظیفه | عنوان ← پروژه ← مسئول ← ستون ← ایجاد | metadata ناموفق، نبود پروژه یا مسئول | حساب جاری ممکن است مسئول پیش‌فرض باشد |
| ویرایش وظیفه | جزئیات ← ویرایش ← تغییر ← ذخیره | canEdit false، خطای ذخیره | تغییر پیش‌نویس با ثبت نهایی فرق دارد |
| بورد | پروژه ← بورد ← کشیدن کارت ← پاسخ سرور | حرکت خوش‌بینانه و rollback، نبود بورد | پس از ثبت، بازخوانی نشان داده شود |
| یادآوری | تاریخ ← ساعت ← آینده‌بودن ← ذخیره | زمان گذشته و مجوز اعلان OS | نمایش اعلان روی همهٔ دستگاه‌ها وعده داده نشود |
| نامهٔ جدید | موضوع ← گیرنده ← متن ← ارسال | گیرندهٔ ردشده، پلن غیرفعال، فایل بیش از حد | لیست گیرندگان قبل از ارسال بررسی شود |
| پاسخ نامه | نامه ← مکاتبات ← متن ← ارسال | رشتهٔ نامعتبر یا دسترسی منقضی | پاسخ در پنل مکاتبات انجام می‌شود |
| پاراف | نامهٔ نیازمند پاراف ← نظر ← ثبت ← بازخوانی | نبود needsParaf؛ خطای سرور | بستن مودال، اثبات ثبت نیست |
| جست‌وجو | Ctrl+K ← محدوده ← عبارت ← انتخاب | عبارت زیر دو نویسه، نتیجهٔ خالی، خطای feed | خطای جست‌وجو را نتیجهٔ خالی معرفی نکنید |

منوهای پیام چت و AI با راست‌کلیک، منوی سه‌نقطهٔ پروژه، ورودی‌های گیره یا مثبت و کنترل‌های آیکونی هدر از تعامل‌های کم‌نمایان مهم‌اند. در ضبط، یک مکث کوتاه پیش از کلیک و نمای نزدیک پس از بازشدن منو برای قابل کشف‌شدن آن‌ها لازم است. برای کنترل آیکونی، شکل و جای کنترل و tooltip در جدول ذکر شده؛ نام دکمهٔ ساختگی به UI نسبت داده نشده است.

در نمای باریک ممکن است پنل‌ها به زبانه تبدیل شوند. سناریوهای این بسته روی نمای دسکتاپ پهن نوشته شده‌اند؛ هر جا پنل از ابتدا دیده می‌شود، کلیک زبانهٔ مربوطه لازم نیست. این تفاوت به‌خصوص در جزئیات وظیفه و مکاتبات نامه مهم است. نسخهٔ موبایل باید برداشت و QA مستقل داشته باشد، نه برش تصادفی تصویر دسکتاپ.

## یافته‌های مؤثر بر صحت آموزش

۱. فضای ابری، یادداشت، خانه، تقویم پروژه و فعال‌سازی بخش‌ها و جریان‌های کاری در وضعیت آمادهٔ آموزش عملی نیستند. ۲. لانچر عمومی پلن و کیف‌پول به toast «بزودی» می‌رسد؛ داشتن endpoint مالی یا تب داخلی برای ساخت آموزش خرید کافی نیست. ۳. پیام صوتی چت در ورودی فعلی «بزودی» است. کد صوت در سایر بخش‌ها به آن تعمیم داده نشده است. [lib/app/registry/module_registry.dart:29](../faro-flutter/lib/app/registry/module_registry.dart#L29) [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550) [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)

۴. منوی مرتب‌سازی وظایف فقط جدیدترین، تاریخ سررسید و عنوان را ارائه می‌کند؛ وجود priority و created در enum به معنی گزینهٔ قابل انتخاب نیست. ۵. پاسخ نامه در پنل مکاتبات از ورودی مشترک چت فرستاده می‌شود. ۶. چک‌لیست، زیر‌وظیفهٔ مستقل نیست. ۷. کپی لینک پروژه لزوماً لینک عمومی یا اعطای مجوز ایجاد نمی‌کند. [lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart:331](../faro-flutter/lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart#L331) [lib/features/mail/views/widgets/letter_reply_chat_panel.dart:65](../faro-flutter/lib/features/mail/views/widgets/letter_reply_chat_panel.dart#L65) [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283) [lib/app/shell/views/widgets/project_header/project_share_dropdown.dart:322](../faro-flutter/lib/app/shell/views/widgets/project_header/project_share_dropdown.dart#L322)

۸. تنظیمات فضای کاری می‌تواند پیش از پایان callback والد پیام موفقیت نمایش دهد. برای آموزش، بازخوانی داده ملاک ثبت است. ۹. فرم ساخت فضای کاری، مقدار slug را در _handleCreate ارسال نمی‌کند؛ آموزش ساخت URL اختصاصی بر پایهٔ این فیلد طراحی نشده است. ۱۰. پیش‌نویس نامه در نشست جاری و به تفکیک فضا، حالت و پیام والد نگه داشته می‌شود؛ این رفتار ذخیرهٔ دائمی روی سرور نیست. [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart:138](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart#L138) [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550) [lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart:169](../faro-flutter/lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart#L169) [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213)

۱۱. حد پیوست هر فایل نامه در کد 100 × 1024 × 1024 بایت است؛ متن UI «۱۰۰ مگابایت» می‌گوید. این حد به چت و AI تعمیم داده نشده است. ۱۲. دریافت‌کنندگان پاسخ نامه از پیام مرجع توسط سرور محاسبه می‌شوند؛ فرم انتخاب مخاطبِ نامهٔ جدید را برای پاسخ نشان ندهید. [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43) [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253) [lib/features/mail/views/widgets/letter_reply_chat_panel.dart:65](../faro-flutter/lib/features/mail/views/widgets/letter_reply_chat_panel.dart#L65)

## آماده‌سازی بازتولیدپذیر محیط آموزشی

مسئول محیط، سه حساب تحت اختیار تیم با نام‌های «نگار آموزشی»، «سارا نمونه» و «امیر نمونه» آماده کند. نام‌های کاربری پیشنهادی negar_demo، sara_demo و amir_demo فقط fixture هستند؛ اگر قبلاً اشغال‌اند، شناسهٔ واقعی حساب آزمایشی در برگهٔ برداشت جایگزین شود. شماره، رمز، کد جاری و توکن در فایل‌های بسته ذخیره نمی‌شوند. شناسهٔ کاربر یا عضو را از نتیجهٔ واقعی همان محیط بگیرید؛ UUID فرضی قابل استفاده نیست.

| ترتیب آماده‌سازی | دادهٔ لازم | روش و کنترل صحت |
|---|---|---|
| ۱ | سه حساب آموزشی موجود | ورود جداگانه؛ تکمیل نام و نام کاربری؛ ثبت فقط شناسهٔ غیرمحرمانه |
| ۲ | استودیو آموزش فارو و آزمایشگاه محصول | ساخت یا آماده‌سازی توسط مدیر محیط؛ کنترل عضویت حساب ضبط |
| ۳ | عضویت سارا و امیر | دعوت و پذیرش از حساب‌های آزمون؛ وضعیت فعال کنترل شود |
| ۴ | پروژهٔ انتشار پاییز | در استودیو آموزش فارو؛ حساب ضبط مدیر و همکاران عضو پروژه |
| ۵ | بورد و ستون‌ها | برای انجام، در حال انجام، بازبینی؛ اگر backend بورد پیش‌فرض نمی‌سازد، مسئول محیط بورد معتبر را آماده کند |
| ۶ | وظایف | بازبینی سناریوی شروع کار؛ بازبینی متن معرفی؛ بازبینی خروجی تصویر؛ مهلت‌های امروز، فردا و بدون زمان‌بندی |
| ۷ | دادهٔ چت | گفت‌وگوی مستقیم با سارا؛ گروه تیم تولید آموزش؛ پیام‌های نمونهٔ درج‌شده در سناریوها |
| ۸ | دادهٔ AI | مدل مجاز و سهمیه؛ گفت‌وگویی با عنوان شامل ضبط؛ فایل sample-brief.txt |
| ۹ | نامه‌ها | یک نامهٔ ورودی برای نگار؛ یک نامهٔ خروجی؛ نامهٔ تأیید برنامه ضبط نیازمند پاراف نگار |
| ۱۰ | تنظیمات برداشت | فارسی، RTL، تم روشن، تقویم یکسان، زمان سیستم صحیح، نوار کناری باز |

این ترتیب یک دستور seed خودکار یا ادعای ایجاد داده در سرور نیست. سناریوها مستقل‌اند: مسئول ضبط باید fixture هر سناریو را قبل از برداشت آماده کند و لازم نیست مخاطب ویدیوهای قبلی را دیده باشد. برای ویدیوهای ساخت، نام هدف نباید از قبل وجود داشته باشد؛ برای ویدیوهای ویرایش، دادهٔ پایه از پیش موجود است. هر ویدیو روی کپی یا محیط مصرفی آماده شود تا reset یک برداشت، سناریوی دیگری را خراب نکند.

برای سررسیدها و یادآوری‌ها از امروز و فردای روز ضبط استفاده کنید و تاریخ حاصل را در برگهٔ برداشت بنویسید. تاریخ ثابت این سند به محیط آینده تحمیل نشود. ساعت یادآوری باید در آینده باشد. تمام حساب‌ها، فایل‌ها، متن‌ها و گیرندگان این بسته نمایشی‌اند؛ محتوای واقعی مشتری یا تیم وارد قاب نشود.

## استاندارد ضبط و تدوین

مبنای پیشنهادی ضبط، پنجرهٔ دسکتاپ ۱۹۲۰×۱۰۸۰، نسبت ۱۶:۹ و ۳۰ فریم بر ثانیه است. این‌ها استاندارد تولید پیشنهادی‌اند، نه اندازهٔ اجباری برنامه. اندازهٔ متن و مقیاس سیستم در کل مجموعه یکسان باشد. نشانگر موس خوانا و حرکت‌ها کوتاه و پیوسته باشند. صدای اعلان‌ها و داده‌های واقعی خارج از محیط آموزشی وارد ضبط نشوند.

برای نسخهٔ عمودی ۹:۱۶، از ضبط مستقل یا قاب‌بندی برنامه‌ریزی‌شده استفاده کنید: ابتدا نمای معرف کوتاه از کل صفحه؛ سپس برش کنترل هدف و نتیجه. در بورد، هر دو ستون و مسیر کشیدن باید در قاب باشند؛ اگر نمی‌گنجند، بورد با زوم کلی خود برنامه و سپس برداشت نزدیک مرحله‌به‌مرحله نشان داده شود. در فرم نامه، موضوع، گیرنده و متن در نماهای جدا با حفظ جهت حرکت ضبط شوند. صرفاً برش وسط تصویر، نام فضا و مقصد عملیات را حذف می‌کند و قابل قبول نیست.

زمان هدف سناریوها ۴۲ تا ۹۰ ثانیه است. آموزش ساده با دادهٔ آماده کوتاه‌تر و فرم چندمرحله‌ای بلندتر طراحی شده است. زمان مرحله‌ها مربوط به نسخهٔ تدوین‌شده است؛ تایپ طولانی را می‌توان با نمایش کوتاه شروع تایپ و ادامهٔ سریع‌تر نشان داد. نریشن روی تایپ سریع‌شده همچنان با سرعت طبیعی خوانده شود. انتظار شبکه را پس از نمایش آغاز بارگذاری کوتاه کنید؛ نتیجه باید از همان عملیات باشد.

در نسخهٔ تدوین، محل کلیک مهم یک مکث کوتاه داشته باشد. زوم حدود ۱۲۵ تا ۱۵۰ درصد فقط وقتی مفید است که متن کنترل و نام رکورد همراه آن خوانا بمانند. عدد زوم پیشنهادی است و نباید باعث بریدن مقصد شود. متن روی تصویر کوتاه و حداکثر یک مفهوم در هر لحظه باشد. از transition تزئینی بین کلیک و نتیجه استفاده نشود؛ برش ساده برای حذف انتظار کافی است.

نریشن هر سناریو شامل هوک، معرفی هدف، متن هماهنگ مرحله‌ها، نمایش نتیجه و پایان است. بخش گویندگی همان متن جدول را با ترتیب نهایی یکجا بازنویسی می‌کند؛ دوبار پشت سر هم خوانده نمی‌شود. مدت هر بخش و برآورد واژه‌ها در سند ثبت شده و جمع مرحله‌ها با زمان هدف کنترل می‌شود. گوینده باید یک بار متن را با سرعت طبیعی بخواند؛ تفاوت واقعی با زمان هدف در تدوین یا متن اصلاح شود.

## دروازهٔ آمادگی هر برداشت

هر ردیف `recording-verification.csv` در ابتدا «در انتظار اجرای آزمایشی» است. مسئول آزمون باید نسخه و کامیت برنامهٔ اجراشده، تاریخ آزمون، نام فضای آموزشی، شناسهٔ غیرمحرمانهٔ پروژه یا اتاق یا نامه، نقش و مجوز، نام کنترل‌های متغیر، نتیجهٔ واقعی، مسیر شاهد تصویری و تصمیم آماده یا متوقف را ثبت کند. رسیدن به آخرین صفحه بدون بررسی نتیجه، موفقیت محسوب نمی‌شود.

اگر یک کنترل در UI وجود نداشت، گزینه غیرفعال بود، API خطا داد، نتیجه با جدول تفاوت داشت یا گیرندهٔ صحیح در دسترس نبود، سناریو متوقف می‌شود. تیم محصول باید تفاوت را روشن کند و متن یا fixture قبل از ضبط اصلاح شود. برای سناریوهای دارای متغیر اجباری، باقی‌ماندن متغیر بدون مقدار یعنی برداشت هنوز آماده نیست. جایگزینی یک رفتار ناموفق با تصویر موفق از برداشت دیگر مجاز نیست.

برای انتشار، مسیر و کنترل‌ها، اعتبار داده، ثبت نتیجه، هماهنگی نریشن، خوانایی قاب، زمان‌بندی، پیام آموزشی واحد و نبود دادهٔ حساس باید همگی بررسی شوند. این سند چک‌لیست را آماده می‌کند؛ هیچ کادر تأییدی بدون اجرای مربوطه از پیش تیک نخورده است.

## نقشهٔ کامل قابلیت‌ها

جدول زیر به همراه CSV هم‌نام، تمام قابلیت‌های استخراج‌شده در دامنهٔ بررسی را ثبت می‌کند. ردیف‌های کد تأییدشده همچنان به تست اجرایی نیاز دارند. قابلیت‌های کم‌اولویت، عملیات حذف و نامزدهای فاقد مسیر اثبات‌شده، با دلیل عدم ساخت سناریوی ضبط پایه مشخص شده‌اند. شمار سناریوها از دامنهٔ واقعی ماژول‌ها به دست آمده، نه صرفاً حداقل پانزده ویدیو.

| Feature ID | نام قابلیت | ماژول | مسیر صفحه | نقش کاربری | هدف قابلیت | اقدامات کاربر | پیش‌نیازها | سطح پیچیدگی | ارزش آموزشی | شواهد سورس‌کد | وضعیت بررسی | سناریو یا دلیل عدم تولید |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F001 | ورود با کد یکبارمصرف | شروع کار | /login | دارندهٔ حساب آزمایشی | ورود به حساب موجود با شمارهٔ موبایل و کد شش‌رقمی | شماره موبایل ← دریافت کد تایید ← کد ۶ رقمی ← صفحهٔ هوش‌مصنوعی | حساب آزمایشی با پروفایل تکمیل‌شده و سیم‌کارت تحت اختیار تیم؛ کد معتبر از محیط آزمون. این سناریو وابستگی به ویدیوی دیگری ندارد. | ساده | زیاد | [lib/features/auth/views/login_view.dart:21](../faro-flutter/lib/features/auth/views/login_view.dart#L21)؛ [lib/features/auth/views/widgets/auth_phone_step.dart:55](../faro-flutter/lib/features/auth/views/widgets/auth_phone_step.dart#L55)؛ [lib/features/auth/views/widgets/auth_otp_step.dart:114](../faro-flutter/lib/features/auth/views/widgets/auth_otp_step.dart#L114)؛ [lib/features/auth/view_models/auth_view_model.dart:111](../faro-flutter/lib/features/auth/view_models/auth_view_model.dart#L111) | کد تأییدشده؛ اجرا نیازمند تست | V01 |
| F002 | تغییر فضای کاری | فضای کاری | /ai | عضو دو فضای کاری | انتخاب آگاهانهٔ فضای کاری و تشخیص تغییر محدودهٔ داده‌ها | نام فضای کاری در بالای نوار کناری ← جست‌وجو در فضاهای کاری... ← استودیو آموزش فارو ← نام فضای کاری انتخاب‌شده | دو فضای کاری مستقل با نام‌های «استودیو آموزش فارو» و «آزمایشگاه محصول»؛ عضویت حساب ضبط در هر دو تأیید شده باشد. | ساده | زیاد | [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324)؛ [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74) | کد تأییدشده؛ اجرا نیازمند تست | V02 |
| F003 | تغییر ظاهر برنامه | تنظیمات | /ai | کاربر واردشده | تغییر حالت روشن و تاریک با کنترل واقعی نوار کناری | نوار کناری ← تم؛ ردیف دارای آیکون ماه ← محتوای برنامه ← کنترل سه‌حالتهٔ پوسته | نوار کناری باز و زبان فارسی فعال باشد؛ حالت اولیه روشن ثبت شود. تنظیم تقویم یا فونت جزو این ویدیو نیست. | ساده | متوسط | [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643)؛ [lib/core/services/app_settings_service.dart:336](../faro-flutter/lib/core/services/app_settings_service.dart#L336) | کد تأییدشده؛ اجرا نیازمند تست | V03 |
| F004 | ویرایش مشخصات حساب | حساب کاربری | /profile → مشخصات کاربری | صاحب حساب آزمایشی | ویرایش نام، نام خانوادگی و بیوگرافی و ذخیرهٔ تغییرات | مشخصات در کارت حساب ← نام ← نام خانوادگی ← درباره من / بیوگرافی ← ذخیره تغییرات | حساب اختصاصی ضبط؛ نام کاربری فعلی معتبر باقی بماند. شمارهٔ موبایل در کادر انتشار پوشانده شود. | ساده | متوسط | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart:136](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart#L136)؛ [lib/app/shell/views/widgets/project_header/user_profile/user_profile_details_tab.dart:104](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_details_tab.dart#L104) | کد تأییدشده؛ اجرا نیازمند تست | V04 |
| F005 | بررسی نشست‌های فعال | حساب کاربری | /profile → نشست‌های فعال | صاحب حساب آزمایشی | تشخیص دستگاه جاری و سایر نشست‌های حساب | نشست‌ها در کارت حساب ← نشست و دستگاه فعلی ← سایر دستگاه‌های متصل ← خروج از نشست | یک نشست دوم فقط برای همین حساب آزمایشی از قبل ایجاد شده باشد؛ اطلاعات IP و دستگاه‌های واقعی در قاب انتشار نباشد. | ساده | متوسط | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart:43](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart#L43)؛ [lib/features/auth/repositories/dio_auth_repository.dart:28](../faro-flutter/lib/features/auth/repositories/dio_auth_repository.dart#L28) | کد تأییدشده؛ اجرا نیازمند تست | V05 |
| F006 | ساخت فضای کاری | فضای کاری | /ai → منوی ایجاد آیتم | حساب مجاز به ایجاد فضای کاری در سرور | ایجاد فضای کاری مستقل با عنوان و توضیح نمایشی | فلش کنار دکمهٔ اصلی ایجاد در نوار کناری ← فضای کاری جدید ← عنوان فضای کاری (مثلاً: تیم طراحی، توسعه محصول...) ← توضیح مختصری درباره فضای کاری و اهداف تیم بنویسید... ← ایجاد فضای کاری | حساب تیم ضبط و دسترسی شبکه؛ نام مشابه در محیط آموزشی وجود نداشته باشد. هیچ همکاری در این برداشت دعوت نشود. | ساده | زیاد | [lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart:169](../faro-flutter/lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart#L169)؛ [lib/app/shell/views/widgets/sidebar/sidebar_create_dropdown.dart:184](../faro-flutter/lib/app/shell/views/widgets/sidebar/sidebar_create_dropdown.dart#L184)؛ [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74) | کد تأییدشده؛ اجرا نیازمند تست | V06 |
| F007 | دعوت همکار به فضای کاری | فضای کاری | /ai → منوی فضای کاری → اعضا و دسترسی‌ها | کاربر با canManageMembers | ارسال دعوت به حساب آزمایشی موجود از بخش اعضا | نام فضای کاری ← اعضا و دسترسی‌ها ← شماره تلفن، ایمیل یا نام کاربری... ← نقش کنار دعوت ← دعوت | فضای «استودیو آموزش فارو» فعال؛ حساب آزمون «سارا نمونه» با شناسهٔ آموزشی sara_demo از قبل موجود و هنوز عضو نباشد؛ دعوت فقط در محیط آموزشی. | متوسط | زیاد | [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324)؛ [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart:267](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart#L267)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35) | کد تأییدشده؛ اجرا نیازمند تست | V07 |
| F008 | ایجاد پروژه | پروژه‌ها | /profile?tab=projects → پروژه‌ها | کاربر با canManageProjects | ایجاد پروژه با عنوان و توضیحات در فضای کاری انتخاب‌شده | دکمهٔ مثبت با tooltip ایجاد پروژه ← فیلد نام پروژه ← فیلد توضیحات پروژه ← ایجاد پروژه ← ردیف انتشار پاییز | فضای استودیو آموزش فارو فعال؛ پروژهٔ «انتشار پاییز» از قبل وجود نداشته باشد. فرم مستقل از ویدیوهای قبل قابل آماده‌سازی است. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. | ساده | زیاد | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634)؛ [lib/features/projects/views/widgets/create_project_dialog.dart:94](../faro-flutter/lib/features/projects/views/widgets/create_project_dialog.dart#L94)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13)؛ [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | V08 |
| F009 | سنجاق و پیداکردن پروژه | پروژه‌ها | /profile | عضو دارای دسترسی به پروژه | سنجاق‌کردن پروژه و استفاده از فیلتر سنجاق‌شده‌ها | منوی سه‌نقطهٔ ردیف انتشار پاییز ← سنجاق کردن ← سنجاق‌شده‌ها ← پروژه‌های سنجاق‌شده | پروژهٔ انتشار پاییز موجود و سنجاق‌نشده؛ فیلتر فهرست روی همه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. | ساده | متوسط | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224)؛ [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634)؛ [lib/features/projects/views/projects_view.dart:56](../faro-flutter/lib/features/projects/views/projects_view.dart#L56)؛ [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643) | کد تأییدشده؛ اجرا نیازمند تست | V09 |
| F010 | دعوت عضو به پروژه | پروژه‌ها | /profile → منوی پروژه → اشتراک‌گذاری | مدیر یا مالک پروژه با مجوز لازم | دعوت عضو مشخص به پروژه و تشخیص تفاوت دسترسی پروژه و فضا | منوی سه‌نقطهٔ انتشار پاییز ← اشتراک‌گذاری ← با نام، تلفن همراه، ایمیل و آیدی... ← عنوان شغلی (اختیاری) ← دعوت | سارا نمونه عضو فعال فضای کاری باشد، ولی هنوز در پروژهٔ انتشار پاییز عضو نباشد؛ حساب ضبط مدیر پروژه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. | متوسط | متوسط | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/share_project_dialog.dart:63](../faro-flutter/lib/features/projects/views/widgets/share_project_dialog.dart#L63)؛ [lib/app/shell/views/widgets/project_header/project_share_dropdown.dart:322](../faro-flutter/lib/app/shell/views/widgets/project_header/project_share_dropdown.dart#L322)؛ [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | V10 |
| F011 | ویرایش مشخصات پروژه | پروژه‌ها | /profile → پروژه → تنظیمات | مدیر یا مالک پروژه با canManageProjects | تغییر توضیح پروژه بدون ساخت پروژهٔ تکراری | منوی سه‌نقطهٔ انتشار پاییز ← تنظیمات ← فیلد توضیحات ← ذخیره تغییرات ← توضیحات پروژه | انتشار پاییز موجود؛ توضیح اولیه «هماهنگی محتوای آموزشی نسخه پاییز» باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. | ساده | متوسط | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/edit_project_dialog.dart:134](../faro-flutter/lib/features/projects/views/widgets/edit_project_dialog.dart#L134)؛ [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10)؛ [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13)؛ [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533) | کد تأییدشده؛ اجرا نیازمند تست | V11 |
| F012 | شروع گفت‌وگو با هوش مصنوعی | هوش مصنوعی | /ai → /ai/conversation/:conversationId | عضو با مدل فعال و سهمیهٔ قابل استفاده | ارسال یک درخواست فارسی و مشاهدهٔ پاسخ در گفت‌وگوی جدید | پیام خود را بنویسید... ← پیام خود را بنویسید... ← ارسال ← پاسخ مدل ← پاسخ نهایی | فضای آموزشی فعال؛ حداقل یک مدل متنی در فهرست مدل‌ها موجود؛ نشست و اعتبار سرویس معتبر. متن پاسخ از پیش قطعی نیست. | ساده | زیاد | [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811)؛ [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26)؛ [lib/features/ai/ai_conversation/views/ai_conversation_view.dart:40](../faro-flutter/lib/features/ai/ai_conversation/views/ai_conversation_view.dart#L40)؛ [lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart:29](../faro-flutter/lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart#L29) | کد تأییدشده؛ اجرا نیازمند تست | V12 |
| F013 | انتخاب مدل هوش مصنوعی | هوش مصنوعی | /ai | عضو با دسترسی به دست‌کم دو مدل | انتخاب مدل موجود از فهرست واقعی حساب | کپسول نام مدل کنار ورودی پیام ← فهرست مدل‌ها ← ردیف مدل مقصد ثبت‌شده در برگهٔ برداشت ← کپسول نام مدل | فهرست مدل‌های همان فضای کاری بارگیری شده باشد؛ نام دو مدل قابل دسترس در برگهٔ برداشت ثبت شود؛ نام تجاری ثابتی فرض نشود. | ساده | متوسط | [lib/features/ai/project_ai_chat/views/widgets/ai_model_switcher_dropdown.dart:445](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_model_switcher_dropdown.dart#L445)؛ [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26)؛ [lib/features/ai/project_ai_chat/repositories/dio_ai_chat_repository.dart:16](../faro-flutter/lib/features/ai/project_ai_chat/repositories/dio_ai_chat_repository.dart#L16) | کد تأییدشده؛ اجرا نیازمند تست | V13 |
| F014 | پیوست فایل به درخواست هوش مصنوعی | هوش مصنوعی | /ai | عضو با مدل پشتیبان پیوست | انتخاب پیوست متنی و ارسال همراه درخواست | افزودن فایل با آیکون گیره یا مثبت ← پیوست فایل ← نام فایل و دکمهٔ بازکردن سیستم ← پیام خود را بنویسید... ← ارسال | فایل sample-brief.txt از پوشهٔ assets همین بسته؛ مدل منتخب باید نوع فایل را در محیط اجرایی بپذیرد. آزمون سازگاری فایل پیش از ضبط الزامی است. | متوسط | متوسط | [lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart:138](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart#L138)؛ [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811)؛ [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30) | کد تأییدشده؛ اجرا نیازمند تست | V14 |
| F015 | پیداکردن گفت‌وگوی قبلی هوش مصنوعی | هوش مصنوعی | /ai | عضو دارای دسترسی به گفت‌وگوی نمونه | جست‌وجو در فهرست گفت‌وگوها و بازکردن نتیجه | جست‌وجو در گفت‌وگوها... ← گفت‌وگوی دارای ضبط در عنوان ← عنوان همان گفت‌وگو ← پیام‌های ذخیره‌شده | یک گفت‌وگوی نمونه با عنوان شامل «ضبط» از قبل در فهرست همان فضای کاری وجود داشته باشد؛ عنوان را در محیط آزمون بررسی کنید؛ تغییر نام در UI این نسخه فرض نشود. | ساده | متوسط | [lib/features/ai/project_ai_chat/views/widgets/ai_search_filter_bar.dart:27](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_search_filter_bar.dart#L27)؛ [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26)؛ [lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart:17](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart#L17) | کد تأییدشده؛ اجرا نیازمند تست | V15 |
| F016 | تولید مجدد و کپی پاسخ | هوش مصنوعی | /ai/conversation/:conversationId | عضو مجاز گفت‌وگو با مدل و سهمیهٔ فعال | درخواست تولید مجدد پاسخ و کپی متن از کنترل واقعی پیام | منوی پیام پاسخ با راست‌کلیک ← تولید مجدد پاسخ ← پاسخ مدل ← منوی راست‌کلیک → کپی متن ← صفحهٔ خالی | گفت‌وگوی نمونه دارای یک پیام کاربر و پاسخ کامل؛ جریان پاسخ در حال تولید نباشد. بازتولید ممکن است سهمیه مصرف کند. پاسخ هدف باید آخرین پیام کامل گفت‌وگو باشد؛ callback تولید مجدد فقط برای آخرین پاسخ وصل است. | متوسط | متوسط | [lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart:103](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart#L103)؛ [lib/features/ai/ai_conversation/views/ai_conversation_view.dart:40](../faro-flutter/lib/features/ai/ai_conversation/views/ai_conversation_view.dart#L40)؛ [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30) | کد تأییدشده؛ اجرا نیازمند تست | V16 |
| F017 | شروع گفت‌وگوی مستقیم | گفت‌وگو | /chat | عضو با canChat و دسترسی به همکار | انتخاب همکار و شروع پیام مستقیم در دو مرحلهٔ واقعی فرم | گفت‌وگو جدید در نوار کناری ← جستجوی همکار... ← ادامه ← گفت‌وگوی مستقیم و سپس شروع گفت‌وگو ← پیام خود را بگذارید... ← ارسال پیام | سارا نمونه عضو فعال فضای آموزشی باشد؛ فهرست همکاران بارگیری شود. وجود گفت‌وگوی مستقیم قبلی مانع نیست؛ همان اتاق ممکن است باز شود. | ساده | زیاد | [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/views/chat_view.dart:41](../faro-flutter/lib/features/chat/views/chat_view.dart#L41)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29) | کد تأییدشده؛ اجرا نیازمند تست | V17 |
| F018 | ایجاد گفت‌وگوی موضوعی | گفت‌وگو | /chat | عضو با canChat | ساخت گفت‌وگوی موضوعی با همکار مشخص و عنوان مستقل | گفت‌وگو جدید ← جستجوی همکار... ← ادامه ← گفت‌وگوی موضوعی ← عنوان موضوع ← شروع گفت‌وگو | سارا نمونه عضو فعال باشد؛ موضوع «بازبینی ویدیوی شروع کار» هنوز ساخته نشده باشد. | ساده | متوسط | [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29)؛ [lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart:17](../faro-flutter/lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart#L17) | کد تأییدشده؛ اجرا نیازمند تست | V18 |
| F019 | ساخت گروه آموزشی | گفت‌وگو | /chat → گفت‌وگوی جدید | عضو مجاز ساخت گروه در سرور و canChat | ساخت اتاق گروهی و اضافه‌کردن اعضای منتخب | گفت‌وگو جدید ← ساخت گروه ← عنوان گروه ← ردیف سارا نمونه ← جستجوی همکار... و ردیف امیر نمونه ← شروع گفت‌وگو | دو حساب سارا نمونه و امیر نمونه عضو فعال فضا باشند؛ هیچ گروه هم‌نامی وجود نداشته باشد. ابتدا ساخت گروه و سپس افزودن اعضا در سرور انجام می‌شود. | متوسط | متوسط | [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29)؛ [lib/features/chat/views/widgets/chat_room_details_dialog.dart:38](../faro-flutter/lib/features/chat/views/widgets/chat_room_details_dialog.dart#L38) | کد تأییدشده؛ اجرا نیازمند تست | V19 |
| F020 | پاسخ به یک پیام مشخص | گفت‌وگو | /chat → اتاق تیم تولید آموزش | عضو اتاق با اجازهٔ ارسال | ارسال پاسخ نقل‌قول‌شده به پیام قبلی | ردیف تیم تولید آموزش ← حباب نسخه اول سناریو آماده است. ← پاسخ ← پیام خود را بگذارید... ← ارسال پیام | اتاق آزمایشی با پیام «نسخه اول سناریو آماده است.» از سارا نمونه؛ حساب ضبط عضو اتاق باشد. | ساده | زیاد | [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/views/widgets/chat_message_list_section.dart:1444](../faro-flutter/lib/features/chat/views/widgets/chat_message_list_section.dart#L1444)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | V20 |
| F021 | فوروارد پیام به همکار | گفت‌وگو | /chat | عضو اتاق مبدأ با مجوز ارسال به مقصد | ارسال مجدد پیام به مقصد انتخاب‌شده همراه یادداشت اختیاری | حباب پیام نمونه ← فوروارد ← یادداشت اختیاری ← جست‌وجو... و ردیف امیر نمونه ← ارسال ← پیام منتقل‌شده | پیام نمونه در اتاق آموزشی؛ امیر نمونه مقصد مجاز و فعال باشد. گیرنده فقط حساب آزمون باشد. | متوسط | متوسط | [lib/features/chat/views/widgets/forward_message_dialog.dart:119](../faro-flutter/lib/features/chat/views/widgets/forward_message_dialog.dart#L119)؛ [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | V21 |
| F022 | ارسال فایل در گفت‌وگو | گفت‌وگو | /chat → تیم تولید آموزش | عضو اتاق با امکان ارسال | انتخاب فایل، نوشتن توضیح و ارسال پیوست در اتاق | افزودن پیوست یا فایل ← پیوست فایل ← sample-brief.txt ← پیام خود را بگذارید... ← ارسال پیام | فایل sample-brief.txt موجود؛ اتاق فقط شامل حساب‌های آزمون. هیچ فایل سیستمی یا سند شخصی انتخاب نشود. | ساده | متوسط | [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)؛ [lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart:140](../faro-flutter/lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart#L140)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | V22 |
| F023 | توضیح پیام با هوش مصنوعی | گفت‌وگو و هوش مصنوعی | /chat → /ai/conversation/new → گفت‌وگوی ایجادشده | کاربر مجاز چت و هوش مصنوعی با سهمیهٔ فعال | انتقال یک پیام نمونه از منوی چت به جریان توضیح هوش مصنوعی | حباب برنامه ضبط ← توضیح با هوش مصنوعی ← پیام منتقل‌شده ← پاسخ مدل | پیام «برنامه ضبط: آماده‌سازی داده، ضبط تصویر، بازبینی نریشن و تدوین.» در اتاق آموزشی؛ متن فقط نمونه باشد. مدل متنی قابل استفاده. | متوسط | متوسط | [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/views/chat_view.dart:41](../faro-flutter/lib/features/chat/views/chat_view.dart#L41)؛ [lib/features/chat/services/chat_ai_attachment_service.dart:9](../faro-flutter/lib/features/chat/services/chat_ai_attachment_service.dart#L9)؛ [lib/features/chat/views/widgets/chat_message_list_section.dart:1444](../faro-flutter/lib/features/chat/views/widgets/chat_message_list_section.dart#L1444) | کد تأییدشده؛ اجرا نیازمند تست | V23 |
| F024 | ایجاد وظیفه در پروژه | وظایف | /tasks | عضو مجاز ایجاد وظیفه؛ مجوز نهایی از سرور | ثبت وظیفه با عنوان، توضیح، پروژه و مسئول انجام مشخص | ایجاد وظیفه ← عنوان ← توضیحات ← پروژه ← مسئول انجام → افزودن مسئول انجام ← لیست تخته ← ایجاد وظیفه ← بازبینی سناریوی شروع کار | پروژهٔ انتشار پاییز و حساب سارا نمونه موجود؛ پروژه حداقل یک بورد و ستون «برای انجام» داشته باشد؛ اطلاعات فرم بدون خطا بارگیری شوند. | متوسط | زیاد | [lib/features/tasks/task_creation/views/task_creation_dialog.dart:207](../faro-flutter/lib/features/tasks/task_creation/views/task_creation_dialog.dart#L207)؛ [lib/features/tasks/task_creation/view_models/task_creation_view_model.dart:533](../faro-flutter/lib/features/tasks/task_creation/view_models/task_creation_view_model.dart#L533)؛ [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283) | کد تأییدشده؛ اجرا نیازمند تست | V24 |
| F025 | تنظیم مهلت و یادآوری وظیفه | وظایف | /tasks → جزئیات وظیفه | کاربر با task.canEdit | تنظیم سررسید فردا و یادآوری فردا ساعت ۱۰ برای وظیفهٔ موجود | بازبینی سناریوی شروع کار ← ویرایش با آیکون مداد ← انتخاب تاریخ → فردا ← انتخاب یادآوری → فردا ← ساعت و دقیقه ← تأیید ← ذخیره تغییرات ← مهلت انجام تا و یادآوری | وظیفهٔ بازبینی سناریوی شروع کار موجود، قابل ویرایش و بدون یادآوری؛ ساعت و منطقهٔ زمانی رایانه درست باشد. اعلان محلی فقط روی دستگاه فعلی ارزیابی می‌شود. | متوسط | متوسط | [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/app/widgets/app_task_date_menu.dart:8](../faro-flutter/lib/app/widgets/app_task_date_menu.dart#L8)؛ [lib/app/widgets/app_task_reminder_field.dart:14](../faro-flutter/lib/app/widgets/app_task_reminder_field.dart#L14)؛ [lib/app/widgets/app_time_picker_dialog.dart:336](../faro-flutter/lib/app/widgets/app_time_picker_dialog.dart#L336) | کد تأییدشده؛ اجرا نیازمند تست | V25 |
| F026 | ساخت چک‌لیست وظیفه | وظایف | /tasks → جزئیات وظیفه | کاربر با task.canEdit | افزودن دو مورد به چک‌لیست و ثبت تکمیل یک مورد | ویرایش ← افزودن مورد به چک‌لیست... ← عنوان مورد جدید... و تأیید ← افزودن مورد به چک‌لیست... و تأیید ← ذخیره تغییرات ← مربع کنار بررسی ترتیب کلیک‌ها | وظیفهٔ نمونه بدون مورد چک‌لیست؛ کاربر اجازهٔ ویرایش دارد. موارد مشابه از برداشت قبل باقی نمانده باشند. | متوسط | متوسط | [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/features/tasks/task_detail/view_models/task_detail_view_model.dart:27](../faro-flutter/lib/features/tasks/task_detail/view_models/task_detail_view_model.dart#L27) | کد تأییدشده؛ اجرا نیازمند تست | V26 |
| F027 | افزودن ستون به بورد | بورد پروژه | /projects/:projectId/board | کاربر با canManageProjects | ساخت ستون با عنوان مشخص در بورد موجود پروژه | ردیف انتشار پاییز ← تخته در تب‌های ابزار پروژه ← افزودن لیست جدید ← نام لیست ← ایجاد لیست ← ستون بازبینی | شناسهٔ پروژهٔ انتشار پاییز از انتخاب پروژه به دست آید؛ بورد موجود و ستون «بازبینی» ناموجود باشد؛ ایجاد جریان کاری جدید موضوع این ویدیو نیست. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. | متوسط | متوسط | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/tasks/task_board/views/task_board_view.dart:138](../faro-flutter/lib/features/tasks/task_board/views/task_board_view.dart#L138)؛ [lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart:112](../faro-flutter/lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart#L112)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39)؛ [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40)؛ [lib/app/shell/views/widgets/project_header/project_tool_tabs.dart:13](../faro-flutter/lib/app/shell/views/widgets/project_header/project_tool_tabs.dart#L13) | کد تأییدشده؛ اجرا نیازمند تست | V27 |
| F028 | جابجایی کارت بین ستون‌ها | بورد پروژه | /projects/:projectId/board | عضو مجاز جابه‌جایی وظیفه در سرور | انتقال وظیفه از ستون برای انجام به بازبینی و بررسی ماندگاری | عنوان پروژه و دو ستون ← کارت بازبینی سناریوی شروع کار ← ناحیهٔ کارت‌های بازبینی ← همان کارت ← Ctrl+R | همان بورد با ستون‌های «برای انجام» و «بازبینی»؛ کارت «بازبینی سناریوی شروع کار» در برای انجام؛ هر دو ستون در قاب دیده شوند. | متوسط | زیاد | [lib/features/tasks/task_board/views/task_board_view.dart:138](../faro-flutter/lib/features/tasks/task_board/views/task_board_view.dart#L138)؛ [lib/features/tasks/task_board/views/widgets/board_column_widget.dart:209](../faro-flutter/lib/features/tasks/task_board/views/widgets/board_column_widget.dart#L209)؛ [lib/features/tasks/task_board/views/widgets/board_task_item.dart:400](../faro-flutter/lib/features/tasks/task_board/views/widgets/board_task_item.dart#L400)؛ [lib/features/tasks/task_board/view_models/task_board_view_model.dart:330](../faro-flutter/lib/features/tasks/task_board/view_models/task_board_view_model.dart#L330) | کد تأییدشده؛ اجرا نیازمند تست | V28 |
| F029 | جست‌وجو و مرتب‌سازی وظایف | وظایف | /tasks | عضو دارای دسترسی به وظایف نمونه | محدودکردن فهرست وظایف با جست‌وجو و مرتب‌سازی سررسید | وظایف من ← جستجو در وظایف… ← کپسول مرتب‌سازی با متن جدیدترین ← تاریخ سررسید ← ردیف بازبینی سناریوی شروع کار | حداقل سه وظیفهٔ حساب ضبط با عنوان شامل «بازبینی» و مهلت‌های متفاوت وجود داشته باشند؛ تب وظایف من فعال باشد. | ساده | متوسط | [lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart:331](../faro-flutter/lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart#L331)؛ [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27)؛ [lib/features/tasks/tasks_overview/view_models/tasks_overview_view_model.dart:22](../faro-flutter/lib/features/tasks/tasks_overview/view_models/tasks_overview_view_model.dart#L22) | کد تأییدشده؛ اجرا نیازمند تست | V29 |
| F030 | ثبت گزارش روی وظیفه | وظایف | /tasks → جزئیات وظیفه → گفت‌وگو و گزارش‌ها | کاربر مجاز مشاهده و ثبت گزارش وظیفه در سرور | نوشتن گزارش متنی در رشتهٔ گفت‌وگوی وظیفه | بازبینی سناریوی شروع کار ← گفت‌وگو و گزارش‌ها؛ در دسکتاپ پنل گفت‌وگو ← گزارش‌ها ← پیام خود را بگذارید... ← ارسال پیام ← فعالیت‌ها | وظیفهٔ نمونه موجود؛ حساب ضبط دسترسی دارد؛ رشتهٔ گزارش فقط شامل محتوای آزمایشی باشد. | ساده | زیاد | [lib/features/tasks/task_detail/views/task_detail_dialog.dart:18](../faro-flutter/lib/features/tasks/task_detail/views/task_detail_dialog.dart#L18)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart:192](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart#L192)؛ [lib/features/tasks/task_detail/view_models/task_detail_view_model.dart:27](../faro-flutter/lib/features/tasks/task_detail/view_models/task_detail_view_model.dart#L27)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690) | کد تأییدشده؛ اجرا نیازمند تست | V30 |
| F031 | ارسال نامهٔ اداری | نامه‌ها | /mail | کاربر با canMail و گیرندهٔ واجد شرایط | ساخت نامهٔ جدید و ارسال به یک گیرندهٔ آموزشی | نامه جدید ← موضوع ← گیرندگان → افزودن گیرنده ← متن نامه را بنویسید… ← موضوع، گیرنده و درخواست پاراف ← ارسال ← خروجی | نامه در پلن فضای کاری فعال باشد؛ سارا نمونه گیرندهٔ معتبر و حساب ضبط مجاز ارسال باشد؛ پیش‌نویس قبلی همین عملیات پاک یا بررسی شود. | متوسط | زیاد | [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157)؛ [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253)؛ [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43)؛ [lib/features/mail/repositories/dio_letters_repository.dart:16](../faro-flutter/lib/features/mail/repositories/dio_letters_repository.dart#L16) | کد تأییدشده؛ اجرا نیازمند تست | V31 |
| F032 | پیداکردن نامه و تغییر پوشه | نامه‌ها | /mail | عضو دارای دسترسی نامه و نامهٔ نمونه | انتخاب پوشه و جست‌وجو با موضوع نامه | ورودی ← جستجو در نامه‌ها… ← برنامه ضبط آموزش شروع کار ← مشخصات ← حذف عبارت جست‌وجو | حداقل یک نامهٔ دریافتی با موضوع برنامه ضبط آموزش شروع کار برای حساب ضبط موجود باشد؛ فرستنده یک حساب آزمایشی دیگر باشد. | ساده | متوسط | [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157)؛ [lib/features/mail/views/widgets/mail_header.dart:60](../faro-flutter/lib/features/mail/views/widgets/mail_header.dart#L60)؛ [lib/features/mail/view_models/mail_view_model.dart:16](../faro-flutter/lib/features/mail/view_models/mail_view_model.dart#L16)؛ [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141) | کد تأییدشده؛ اجرا نیازمند تست | V32 |
| F033 | ثبت پاراف نامه | نامه‌ها | /mail → جزئیات نامه | گیرندهٔ همان نامه با needsParaf | ثبت پاراف روی نامه‌ای که برای کاربر جاری نیازمند پاراف است | نامهٔ تأیید برنامه ضبط ← ثبت پاراف با آیکون تیک ← یادداشت پاراف (اختیاری) ← ثبت پاراف ← اطلاعات گیرنده یا پاراف در مشخصات | نامهٔ نمونه از حساب آزمون دیگر با درخواست پاراف فعال برای حساب ضبط ارسال شده باشد؛ حساب ضبط هنوز روی آن پاراف ثبت نکرده باشد. | متوسط | متوسط | [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/widgets/record_paraf_dialog.dart:63](../faro-flutter/lib/features/mail/views/widgets/record_paraf_dialog.dart#L63)؛ [lib/features/mail/view_models/letter_detail_view_model.dart:38](../faro-flutter/lib/features/mail/view_models/letter_detail_view_model.dart#L38)؛ [lib/features/mail/models/letter_model.dart:5](../faro-flutter/lib/features/mail/models/letter_model.dart#L5) | کد تأییدشده؛ اجرا نیازمند تست | V33 |
| F034 | پاسخ در مکاتبات نامه | نامه‌ها | /mail → جزئیات نامه → مکاتبات | کاربر مجاز پاسخ در نامهٔ آموزشی | ثبت پاسخ متنی در پنل مکاتبات نامهٔ موجود | برنامه ضبط آموزش شروع کار ← مکاتبات ← گیرندگان ← پیام خود را بگذارید... ← ارسال پیام | نامهٔ «برنامه ضبط آموزش شروع کار» برای حساب ضبط موجود؛ رشتهٔ مکاتبات دسترس‌پذیر باشد. مخاطبان پاسخ را سرور از پیام مرجع تعیین می‌کند. | ساده | زیاد | [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/widgets/letter_reply_chat_panel.dart:65](../faro-flutter/lib/features/mail/views/widgets/letter_reply_chat_panel.dart#L65)؛ [lib/features/mail/view_models/letter_detail_view_model.dart:38](../faro-flutter/lib/features/mail/view_models/letter_detail_view_model.dart#L38)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43) | کد تأییدشده؛ اجرا نیازمند تست | V34 |
| F035 | نمای چاپ نامه | نامه‌ها | /mail → جزئیات نامه → چاپ نامه | عضو دارای دسترسی به نامه | بازکردن مسیر چاپ و بازبینی پیش‌نمایش خروجی | نامهٔ نمونه ← چاپ نامه با آیکون چاپگر ← پیش‌نمایش سند ← صفحات سند ← انصراف سیستم؛ متن دقیق پیش از ضبط ثبت شود | نامهٔ نمونه با متن فارسی موجود؛ سرویس چاپ سیستم در دسترس باشد؛ هیچ چاپگر واقعی برای ارسال خودکار انتخاب نشود. ضبط تا پیش‌نمایش ادامه دارد. | ساده | متوسط | [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/services/letter_print_service.dart:12](../faro-flutter/lib/features/mail/services/letter_print_service.dart#L12) | کد تأییدشده؛ اجرا نیازمند تست | V35 |
| F036 | جست‌وجوی سراسری با صفحه‌کلید | جست‌وجو | هر صفحه → پنجرهٔ Ctrl+K | کاربر واردشده دارای دسترسی به وظیفهٔ نمونه | بازکردن جست‌وجوی سراسری، محدودکردن به وظایف و بازکردن نتیجه | Ctrl+K ← گزینهٔ وظایف ← Tab ← جستجو در فارو؛ پروژه، وظیفه یا فرمان… ← بازبینی سناریوی شروع کار ← عنوان وظیفه | وظیفهٔ بازبینی سناریوی شروع کار موجود و قابل مشاهده باشد؛ پنجرهٔ دیگری باز نباشد؛ نتیجهٔ سرور جست‌وجوی وظایف در دسترس باشد. | متوسط | زیاد | [lib/core/shortcuts/app_shortcuts.dart:15](../faro-flutter/lib/core/shortcuts/app_shortcuts.dart#L15)؛ [lib/features/search/views/search_view.dart:206](../faro-flutter/lib/features/search/views/search_view.dart#L206)؛ [lib/features/search/view_models/search_view_model.dart:27](../faro-flutter/lib/features/search/view_models/search_view_model.dart#L27)؛ [lib/features/search/repositories/search_repository.dart:16](../faro-flutter/lib/features/search/repositories/search_repository.dart#L16)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | کد تأییدشده؛ اجرا نیازمند تست | V36 |
| F037 | ارجاع نامه به همکار | نامه‌ها | /mail → جزئیات نامه → ارجاع | کاربر مجاز ارجاع نامه با دسترسی mail | ارجاع نامهٔ موجود به گیرندهٔ آزمایشی همراه یادداشت | ارجاع با آیکون پیکان ← گیرندگان → افزودن گیرنده ← یادداشت ارجاع ← گیرنده و یادداشت ← ارسال | نامهٔ برنامه ضبط آموزش شروع کار قابل دسترس؛ امیر نمونه عضو واجد شرایط فضا باشد؛ پیش‌نویس ارجاع همین نامه از قبل خالی باشد. | متوسط | متوسط | [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253)؛ [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43) | کد تأییدشده؛ اجرا نیازمند تست | V37 |
| F038 | بایگانی و بازگرداندن نامه | نامه‌ها | /mail | گیرندهٔ نامه با قابلیت بایگانی | بایگانی نامهٔ دریافتی و بازگرداندن آن از پوشهٔ بایگانی | ردیف نامهٔ نمونه ← بایگانی ← بایگانی ← منوی راست‌کلیک → خروج از بایگانی ← ورودی | نامهٔ دریافتی نمونه برای حساب ضبط و خارج از بایگانی؛ حساب صرفاً فرستنده نباشد. | ساده | متوسط | [lib/features/mail/views/widgets/letter_context_menu.dart:12](../faro-flutter/lib/features/mail/views/widgets/letter_context_menu.dart#L12)؛ [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157)؛ [lib/features/mail/view_models/mail_view_model.dart:16](../faro-flutter/lib/features/mail/view_models/mail_view_model.dart#L16)؛ [lib/features/mail/models/letter_model.dart:5](../faro-flutter/lib/features/mail/models/letter_model.dart#L5) | کد تأییدشده؛ اجرا نیازمند تست | V38 |
| F039 | مرجع میانبرها و بازکردن نوار کناری | افزایش سرعت | هر صفحه → Ctrl+/ | کاربر واردشده در نسخهٔ دسکتاپ | بازکردن راهنمای میانبر و استفاده از میانبر نوار کناری | Ctrl+/ ← میانبر جست‌وجو و نوار کناری ← Esc ← Ctrl+B ← Ctrl+B | هیچ ورودی متن فوکوس نداشته باشد؛ چیدمان ویندوز با صفحه‌کلید لاتین برای نمایش کلیدها؛ قاب دسکتاپ باز باشد. | ساده | متوسط | [lib/core/shortcuts/app_shortcuts.dart:15](../faro-flutter/lib/core/shortcuts/app_shortcuts.dart#L15)؛ [lib/core/shortcuts/app_shortcuts_dialog.dart:33](../faro-flutter/lib/core/shortcuts/app_shortcuts_dialog.dart#L33)؛ [lib/app/shell/views/app_shell_view.dart:49](../faro-flutter/lib/app/shell/views/app_shell_view.dart#L49) | کد تأییدشده؛ اجرا نیازمند تست | V39 |
| F040 | ویرایش توضیح فضای کاری | فضای کاری | /ai → منوی فضای کاری → تنظیمات | مدیر یا مالک با isManager | ویرایش توضیحات فضای کاری و بررسی ماندگاری پس از بازخوانی | نام فضای کاری ← تنظیمات ← توضیحات فضای کاری ← ذخیره تغییرات ← Ctrl+R و بازگشایی تنظیمات | استودیو آموزش فارو فعال؛ حساب مجاز مدیریت؛ هیچ عملیات حذف یا ترک فضا در این برداشت اجرا نشود. | متوسط | متوسط | [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart:138](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart#L138)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550)؛ [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35) | کد تأییدشده؛ اجرا نیازمند تست | V40 |
| F041 | تنظیم دستورالعمل هوش مصنوعی پروژه | پروژه و هوش مصنوعی | /profile?tab=projects → تنظیمات پروژه → هوش مصنوعی | مدیر یا مالک پروژه | نوشتن و ذخیرهٔ دستورالعمل سیستم در تنظیمات AI پروژه | منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات ← هوش مصنوعی ← دستورالعمل سیستم (System Prompt) ← ذخیره تغییرات ← همان فیلد دستورالعمل سیستم | پروژهٔ انتشار پاییز موجود؛ دستورالعمل قبلی خالی یا متن پایهٔ آموزشی باشد؛ حساب مدیر پروژه. تأثیر روی پاسخ‌های قدیمی در این ویدیو ادعا نمی‌شود. | متوسط | متوسط | [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10)؛ [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35) | کد تأییدشده؛ اجرا نیازمند تست | V41 |
| F042 | بارگذاری فایل دانشی پروژه | پروژه و هوش مصنوعی | /profile?tab=projects → تنظیمات → هوش مصنوعی | مدیر پروژه با مجوز فایل و سرویس RAG | بارگذاری فایل دانشی و تشخیص تفاوت بارگذاری و آماده‌بودن پردازش | منوی ردیف انتشار پاییز → تنظیمات ← هوش مصنوعی ← بارگذاری فایل دانشی ← sample-brief.txt ← ردیف sample-brief.txt ← در حال پردازش یا آماده استفاده یا خطا در پردازش | فایل sample-brief.txt موجود؛ پروژهٔ انتشار پاییز مجاز بارگذاری فایل باشد. endpoint پروژه و نوشتهٔ جدید UI دربارهٔ پایگاه دانش فضای کاری باید پیش از انتشار با محیط واقعی تطبیق داده شوند. | پیشرفته | متوسط | [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533)؛ [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35)؛ [lib/core/network/api_endpoints.dart:5](../faro-flutter/lib/core/network/api_endpoints.dart#L5) | کد موجود؛ ناسازگاری متن و API؛ توقف انتشار تا تست | V42 |
| F043 | ارسال مجدد کد ورود | حساب | /login | دارندهٔ شمارهٔ آزمون | دریافت کد تازه | پایان شمارنده ← ارسال مجدد کد | پایان مهلت ارسال مجدد | ساده | متوسط | [lib/features/auth/views/widgets/auth_otp_step.dart:114](../faro-flutter/lib/features/auth/views/widgets/auth_otp_step.dart#L114)؛ [lib/features/auth/view_models/auth_view_model.dart:111](../faro-flutter/lib/features/auth/view_models/auth_view_model.dart#L111) | کد تأییدشده؛ اجرا نیازمند تست | V01 |
| F044 | تکمیل پروفایل در ورود اول | حساب | /login | حساب تازه | تکمیل حساب اولیه | نام، نام خانوادگی و نام کاربری ← ثبت | پاسخ سرور با نیاز به تکمیل پروفایل | ساده | زیاد | [lib/features/auth/views/login_view.dart:21](../faro-flutter/lib/features/auth/views/login_view.dart#L21)؛ [lib/features/auth/view_models/auth_view_model.dart:111](../faro-flutter/lib/features/auth/view_models/auth_view_model.dart#L111) | کد تأییدشده؛ اجرا نیازمند تست | گسترش فصل شروع کار |
| F045 | تغییر و برش آواتار | حساب | مودال مشخصات کاربری | صاحب حساب | نمایهٔ تصویری حساب | انتخاب تصویر ← برش ← بارگذاری | تصویر ساختگی و دسترسی فایل | متوسط | متوسط | [lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart:136](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart#L136) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V04 |
| F046 | خاتمهٔ یک نشست یا سایر نشست‌ها | حساب | مودال نشست‌های فعال | صاحب حساب | مدیریت دستگاه‌های متصل | خروج از نشست یا خروج همه نشست‌ها ← تأیید | نشست دوم حساب آموزشی | متوسط | زیاد | [lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart:43](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart#L43) | کد تأییدشده؛ اجرا نیازمند تست | اشاره در V05؛ اجرای مستقل پس از تست |
| F047 | خروج از حساب | حساب | نوار کناری یا کارت پروفایل | کاربر جاری | پایان نشست فعلی | خروج ← تأیید | امکان ورود مجدد حساب آزمون | ساده | متوسط | [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643)؛ [lib/features/auth/view_models/auth_view_model.dart:111](../faro-flutter/lib/features/auth/view_models/auth_view_model.dart#L111) | کد تأییدشده؛ اجرا نیازمند تست | ضمیمهٔ شروع کار |
| F048 | تغییر زبان | تنظیمات | نوار کناری | کاربر جاری | انتخاب زبان محیط | کلیک زبان در چرخهٔ fa سپس ar سپس en | کنترل ترجمه و چیدمان مقصد | ساده | متوسط | [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643)؛ [lib/app/bootstrap.dart:53](../faro-flutter/lib/app/bootstrap.dart#L53) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V03 |
| F049 | سنجاق فضای کاری | فضای کاری | منوی فضای کاری | عضو فضا | دسترسی سریع به فضا | کنترل سنجاق ردیف فضا | دست‌کم دو فضای کاری | ساده | متوسط | [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V02 |
| F050 | قبول یا رد دعوت فضای کاری | فضای کاری | منوی فضای کاری ← دعوت‌های در انتظار | دعوت‌شده | تعیین عضویت در تیم | قبول یا رد ← تأیید | دعوت واقعی در محیط آموزشی | متوسط | زیاد | [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V07 |
| F051 | تغییر نقش و دسترسی عضو فضای کاری | فضای کاری | اعضا و دسترسی‌ها | canManageMembers؛ محدودیت مالک و حساب جاری | تعیین دسترسی همکار | ویرایش نقش یا دسترسی ← ذخیره تغییرات | عضو غیرمالک آزمایشی | پیشرفته | زیاد | [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart:267](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart#L267)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550)؛ [lib/app/shell/models/app_workspace_model.dart:8](../faro-flutter/lib/app/shell/models/app_workspace_model.dart#L8) | کد تأییدشده؛ اجرا نیازمند تست | مرحلهٔ پیشرفته پس از V07 |
| F052 | حذف عضو فضای کاری | فضای کاری | اعضا و دسترسی‌ها | مدیر مجاز؛ عضو غیرمالک | قطع دسترسی عضو | کنترل حذف عضو ← تأیید | حساب آزمایشی قابل دعوت مجدد | متوسط | متوسط | [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart:267](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart#L267)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550) | کد تأییدشده؛ اجرا نیازمند تست | مستقل؛ عملیات تغییردهندهٔ دسترسی |
| F053 | لوگوی فضای کاری | فضای کاری | مدیریت فضای کاری | مدیر مجاز | تغییر هویت تصویری تیم | انتخاب لوگو یا حذف تصویر | تصویر آزمایشی | متوسط | متوسط | [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V40 |
| F054 | ترک یا حذف فضای کاری | فضای کاری | تنظیمات ← ناحیه حساس | مالک برای حذف؛ نقش مجاز برای ترک | پایان دسترسی یا حذف فضا | ترک یا حذف دائمی ← تأیید | فضای کاملاً مصرفی آموزشی | پیشرفته | متوسط | [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart:138](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart#L138)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550) | کد تأییدشده؛ اجرا نیازمند تست | از بستهٔ ضبط پایه کنار گذاشته شده |
| F055 | آرشیو و بازگردانی پروژه | پروژه‌ها | /profile ← منوی پروژه | canManageProjects | کنارگذاشتن پروژهٔ پایان‌یافته | آرشیو کردن ← آرشیوشده‌ها ← خروج از آرشیو | پروژهٔ نمونه | متوسط | زیاد | [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224)؛ [lib/features/projects/views/projects_view.dart:56](../faro-flutter/lib/features/projects/views/projects_view.dart#L56) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V09 |
| F056 | حذف پروژه | پروژه‌ها | /profile ← منوی پروژه | canManageProjects و مجوز سرور | حذف پروژهٔ مصرفی | حذف ← تأیید | پروژهٔ مستقل قابل حذف | متوسط | متوسط | [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13) | کد تأییدشده؛ اجرا نیازمند تست | از بستهٔ ضبط پایه کنار گذاشته شده |
| F057 | نمای لیستی و شبکه‌ای پروژه‌ها | پروژه‌ها | ProjectsView قدیمی؛ Route فعلی به ProfileView می‌رود | نامشخص | تغییر شیوهٔ مرور پروژه‌ها در نمای قدیمی | کنترل نمای لیستی یا شبکه‌ای در ProjectsHeader | اثبات مسیر فعال به ProjectsView لازم است | ساده | متوسط | [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634)؛ [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | کد موجود؛ مسیر UI فعلی اثبات نشده | سناریو ساخته نشد |
| F058 | مرتب‌سازی پروژه‌ها | پروژه‌ها | ProjectsHeader قدیمی؛ در تب فعلی پروفایل ارائه نشده | نامشخص | مرور با ترتیب دلخواه در نمای قدیمی | انتخاب معیار در کنترل قدیمی | اثبات دسترسی از Route فعال لازم است | ساده | متوسط | [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634)؛ [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | کد موجود؛ مسیر UI فعلی اثبات نشده | سناریو ساخته نشد |
| F059 | تغییر نقش یا حذف عضو پروژه | پروژه‌ها | اشتراک‌گذاری پروژه | مدیر پروژه؛ غیرمالک و غیرخود | مدیریت عضویت پروژه | ویرایش دسترسی یا حذف ← ذخیره | عضو نمونهٔ غیرمالک | پیشرفته | زیاد | [lib/features/projects/views/widgets/share_project_dialog.dart:63](../faro-flutter/lib/features/projects/views/widgets/share_project_dialog.dart#L63)؛ [lib/app/shell/views/widgets/project_header/project_share_dropdown.dart:322](../faro-flutter/lib/app/shell/views/widgets/project_header/project_share_dropdown.dart#L322) | کد تأییدشده؛ اجرا نیازمند تست | مرحلهٔ پیشرفتهٔ V10 |
| F060 | کپی لینک پروژه | پروژه‌ها | اعضای پروژه | دارندهٔ دسترسی | ارجاع به پروژه | کپی لینک | پروژهٔ قابل دسترس | ساده | متوسط | [lib/app/shell/views/widgets/project_header/project_share_dropdown.dart:322](../faro-flutter/lib/app/shell/views/widgets/project_header/project_share_dropdown.dart#L322) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V10؛ لینک مجوز عمومی نیست |
| F061 | اشتراک‌گذاری و حذف گفت‌وگوی AI | هوش مصنوعی | هدر گفت‌وگو یا منوی ردیف | صاحب دسترسی لازم | اشتراک مرجع یا پاک‌سازی گفتگو | اشتراک‌گذاری یا حذف ← تأیید | گفت‌وگوی مصرفی | متوسط | متوسط | [lib/features/ai/ai_conversation/views/widgets/ai_conversation_header.dart:168](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_conversation_header.dart#L168)؛ [lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart:17](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart#L17) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V15؛ دسترسی لینک نیازمند تست |
| F062 | ویرایش درخواست و بازخورد پاسخ AI | هوش مصنوعی | منوی پیام هوش مصنوعی | کاربر مجاز پیام | اصلاح درخواست یا ثبت بازخورد | ویرایش پیام یا پسندیدن و نپسندیدن | پیام کامل؛ callback فعال | متوسط | زیاد | [lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart:103](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart#L103)؛ [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V16 |
| F063 | توقف تولید پاسخ AI | هوش مصنوعی | ورودی هنگام streaming | کاربر صاحب جریان | قطع تولید جاری | توقف تولید پاسخ | پاسخ در حال تولید | ساده | متوسط | [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811)؛ [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V12 |
| F064 | اشاره به پروژه در درخواست AI | هوش مصنوعی | منوی پیوست ← پروژه | عضو پروژه | افزودن زمینهٔ پروژه | انتخاب پروژه و بررسی تگ | پروژهٔ مجاز و زمینهٔ قابل استفاده | پیشرفته | زیاد | [lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart:138](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart#L138)؛ [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811) | کد تأییدشده؛ اجرا نیازمند تست | پس از V14؛ کیفیت زمینه نیازمند تست |
| F065 | پنجرهٔ پرسش سریع دسکتاپ | هوش مصنوعی | Quick Prompt مستقل | کاربر دسکتاپ با نشست معتبر | پرسش سریع بیرون پنجرهٔ اصلی | فراخوانی پنجرهٔ سریع و ارسال | ثبت hotkey، مجوز OS و هماهنگی نشست | پیشرفته | زیاد | [lib/features/ai/quick_prompt/services/quick_ai_prompt_coordinator.dart:451](../faro-flutter/lib/features/ai/quick_prompt/services/quick_ai_prompt_coordinator.dart#L451) | کد تأییدشده؛ اجرا نیازمند تست | فعلاً خارج اولویت؛ آزمون چندپنجره لازم |
| F066 | ساخت کانال | گفت‌وگو | گفت‌وگوی جدید ← ساخت کانال | مجوز سرور و canChat | اعلان گروهی با ارسال مدیر | ساخت کانال ← عنوان و اعضا | حساب‌های آموزشی و کنترل canPost | متوسط | زیاد | [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart:17](../faro-flutter/lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart#L17) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V19 |
| F067 | اطلاعات اتاق و مدیریت اعضا | گفت‌وگو | مشخصات گفت‌وگو | نقش مجاز همان اتاق | مرور یا مدیریت اعضای اتاق | مشخصات گفت‌وگو ← اعضا | گروه آزمایشی | متوسط | زیاد | [lib/features/chat/views/widgets/chat_room_details_dialog.dart:38](../faro-flutter/lib/features/chat/views/widgets/chat_room_details_dialog.dart#L38)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V19 |
| F068 | خروج یا حذف گفت‌وگو | گفت‌وگو | منوی اتاق | نقش مجاز بر اساس نوع اتاق | ترک گروه یا حذف گفت‌وگو | خروج از گروه یا کانال؛ حذف گفت‌وگو ← تأیید | اتاق مصرفی آموزشی | متوسط | متوسط | [lib/features/chat/views/widgets/chat_room_context_menu.dart:37](../faro-flutter/lib/features/chat/views/widgets/chat_room_context_menu.dart#L37) | کد تأییدشده؛ اجرا نیازمند تست | مستقل از ضبط پایه |
| F069 | اشاره به شخص یا رکورد در پیام | گفت‌وگو | منوی ورودی گفت‌وگو | عضو مجاز اتاق | ارجاع دقیق به فرد یا کار | فراخوانی شخص، پروژه، وظیفه یا نامه | رکورد و عضو قابل دسترسی | متوسط | زیاد | [lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart:140](../faro-flutter/lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart#L140)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V22 |
| F070 | کپی متن و مدیریت فایل پیام | گفت‌وگو | راست‌کلیک پیام | دسترسی پیام و فایل | استفادهٔ محلی از محتوا | کپی متن، کپی فایل، ذخیره در یا نمایش در پوشه | فایل بارگیری‌شده و کنترل OS | متوسط | متوسط | [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/views/widgets/chat_message_list_section.dart:1444](../faro-flutter/lib/features/chat/views/widgets/chat_message_list_section.dart#L1444) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V22 |
| F071 | حذف پیام | گفت‌وگو | منوی پیام با callback حذف | مجوز حذف همان پیام | پاک‌سازی پیام نمونه | حذف پیام | پیام مصرفی با مجوز سرور | متوسط | متوسط | [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | مستقل؛ بازیابی ادعا نشود |
| F072 | خواندن و جست‌وجوی پیام اتاق | گفت‌وگو | /chat | عضو اتاق | پیگیری تاریخچه و رسید خواندن | کنترل جست‌وجوی اتاق؛ بررسی وضعیت پیام | تاریخچه و دو حساب آموزشی | متوسط | زیاد | [lib/features/chat/views/chat_view.dart:41](../faro-flutter/lib/features/chat/views/chat_view.dart#L41)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V20؛ معنای دقیق رسید در اجرا |
| F073 | تکمیل وظیفه و پیگیری روزانه | وظایف | /tasks و جزئیات | task.canChangeStatus | اعلام انجام کار و مرور روزانه | کنترل وضعیت ← انجام شده روزانه | وظیفهٔ قابل تغییر وضعیت | متوسط | زیاد | [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart:331](../faro-flutter/lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart#L331)؛ [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V28؛ ستون دلخواه معادل تکمیل نیست |
| F074 | برچسب وظیفه | وظایف | فرم ساخت و ویرایش | مجوز task.canEdit برای ویرایش | دسته‌بندی وظایف | افزودن برچسب یا انتخاب موجود | برچسب نمونه و مجوز سرور | متوسط | زیاد | [lib/features/tasks/task_creation/views/task_creation_dialog.dart:207](../faro-flutter/lib/features/tasks/task_creation/views/task_creation_dialog.dart#L207)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/features/tasks/task_creation/view_models/task_creation_view_model.dart:533](../faro-flutter/lib/features/tasks/task_creation/view_models/task_creation_view_model.dart#L533) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V24 |
| F075 | پیوست وظیفه و مرور فایل‌ها | وظایف | ساخت وظیفه یا جزئیات ← فایل‌ها | مجوز وظیفه و فایل | نگهداری سند مربوط به کار | افزودن فایل پیوست یا همه فایل‌ها | فایل نمونه و مجوز بارگیری | متوسط | زیاد | [lib/features/tasks/task_creation/views/task_creation_dialog.dart:207](../faro-flutter/lib/features/tasks/task_creation/views/task_creation_dialog.dart#L207)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart:192](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart#L192) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V30 |
| F076 | حذف وظیفه | وظایف | جزئیات ← حذف | task.canEdit و مجوز سرور | حذف کار مصرفی | حذف ← تأیید | وظیفهٔ نمونه مستقل | متوسط | متوسط | [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/features/tasks/task_detail/view_models/task_detail_view_model.dart:27](../faro-flutter/lib/features/tasks/task_detail/view_models/task_detail_view_model.dart#L27) | کد تأییدشده؛ اجرا نیازمند تست | مستقل از ضبط پایه |
| F077 | ویرایش و حذف ستون بورد | بورد | منوی ستون | canManageProjects و مجوز سرور | اصلاح ساختار بورد | تنظیمات یا حذف لیست | ستون مصرفی و بررسی اثر روی کارت‌ها | متوسط | زیاد | [lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart:112](../faro-flutter/lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart#L112)؛ [lib/features/tasks/task_board/view_models/task_board_view_model.dart:330](../faro-flutter/lib/features/tasks/task_board/view_models/task_board_view_model.dart#L330) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V27؛ اثر حذف نیازمند تست |
| F078 | پیگیری از دیگران و دسته‌بندی زمانی وظایف | وظایف | /tasks | عضو دارای دادهٔ مربوطه | مرور کارهای سپرده‌شده و موعدها | پیگیری از دیگران؛ معوق، امروز، بدون زمان‌بندی، آینده، تکمیل‌شده | کارهای متنوع نمونه | متوسط | زیاد | [lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart:331](../faro-flutter/lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart#L331)؛ [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V24 و V29 |
| F079 | پیوست و قالب‌بندی نامه | نامه‌ها | فرم نامه | canMail | ارسال سند و متن خوانا | افزودن پیوست؛ پررنگ؛ فهرست؛ پیوند | فایل کمتر یا مساوی ۱۰۰ MiB و لینک مجاز | متوسط | زیاد | [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V31 |
| F080 | نگارش نامه با AI | نامه‌ها | فرم نامه ← نگارش با AI | مجوز نامه و سرویس AI | دریافت پیش‌نویس پیشنهادی | نگارش با AI ← بررسی پیش‌نمایش ← پذیرش | موضوع یا متن اولیه و سهمیه | پیشرفته | زیاد | [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253)؛ [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213) | کد تأییدشده؛ اجرا نیازمند تست | پس از V31؛ انتشار متن منوط به بازبینی |
| F081 | برچسب‌گذاری نامه | نامه‌ها | منوی نامه یا هدر جزئیات | canLabel در نامه | دسته‌بندی مکاتبات | برچسب‌گذاری ← انتخاب برچسب | نامهٔ مجاز | متوسط | متوسط | [lib/features/mail/views/widgets/letter_context_menu.dart:12](../faro-flutter/lib/features/mail/views/widgets/letter_context_menu.dart#L12)؛ [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/widgets/mail_label_menu.dart:7](../faro-flutter/lib/features/mail/views/widgets/mail_label_menu.dart#L7) | کد تأییدشده؛ اجرا نیازمند تست | مکمل V32 |
| F082 | مشاهده‌کنندگان و خوانده‌شدن نامه | نامه‌ها | منوی نامه | دارندهٔ دسترسی مجاز | پیگیری مشاهدهٔ مکاتبه | مشاهده‌کنندگان؛ علامت‌گذاری خوانده یا نخوانده | نامهٔ نمونه با دریافت‌کننده | متوسط | زیاد | [lib/features/mail/views/widgets/letter_context_menu.dart:12](../faro-flutter/lib/features/mail/views/widgets/letter_context_menu.dart#L12)؛ [lib/features/mail/models/letter_model.dart:5](../faro-flutter/lib/features/mail/models/letter_model.dart#L5) | کد تأییدشده؛ اجرا نیازمند تست | گسترش V32؛ به معنی تأیید محتوا نیست |
| F083 | اتصال زنده و اعلان‌ها | اعلان | پوسته و لینک رکورد | کاربر احرازشده با مجوز منبع | پیگیری رویداد و رفتن به رکورد | مشاهده اعلان و بازکردن لینک مجاز | WebSocket و مجوز OS یا مرورگر | پیشرفته | زیاد | [lib/features/notifications/view_models/notifications_view_model.dart:30](../faro-flutter/lib/features/notifications/view_models/notifications_view_model.dart#L30)؛ [lib/core/network/api_endpoints.dart:5](../faro-flutter/lib/core/network/api_endpoints.dart#L5) | کد سرویس تأییدشده؛ مسیر کامل UI نیازمند تست | در انتظار آزمون اجرایی |
| F084 | بررسی نسخه و نگه‌داری | راه‌اندازی | AppStartupGate | کاربر برنامه | آگاهی از نسخهٔ ناسازگار یا نگه‌داری | مشاهده وضعیت startup یا بروزرسانی | پاسخ سرویس release و نوع سیستم‌عامل | متوسط | متوسط | [lib/features/release/views/app_startup_gate.dart:13](../faro-flutter/lib/features/release/views/app_startup_gate.dart#L13) | کد تأییدشده؛ اجرا نیازمند تست | نباید وضعیت سرور واقعی را برای ضبط تغییر داد |
| F085 | فضای ابری | ابزار آینده | /cloud | — | قابلیت آینده | کلیک فعلی فقط وضعیت بزودی یا placeholder | پیاده‌سازی کامل موجود نیست | — | — | [lib/app/registry/module_registry.dart:29](../faro-flutter/lib/app/registry/module_registry.dart#L29)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | بزودی؛ آموزش عملی منتشر نشود | حذف از برنامه آموزشی |
| F086 | یادداشت‌ها | ابزار آینده | /notes در registry؛ مسیر فعال ثبت نشده | — | قابلیت آینده | کنترل بزودی | پیاده‌سازی کامل موجود نیست | — | — | [lib/app/registry/module_registry.dart:29](../faro-flutter/lib/app/registry/module_registry.dart#L29)؛ [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643) | بزودی؛ آموزش عملی منتشر نشود | حذف از برنامه آموزشی |
| F087 | داشبورد خانه | ابزار آینده | / با هدایت به /ai | — | نمای آینده | کنترل خانه با بزودی | مسیر عملی مستقل فعال نیست | — | — | [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | بزودی؛ آموزش عملی منتشر نشود | حذف از برنامه آموزشی |
| F088 | تقویم پروژه | ابزار آینده | /projects/:projectId/calendar | — | نمای تقویم آینده | مسیر به TasksPlaceholderView می‌رسد | پیاده‌سازی واقعی تقویم تأیید نشده | — | — | [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | placeholder؛ آموزش عملی منتشر نشود | حذف از برنامه آموزشی |
| F089 | بخش‌بندی و جریان‌های کاری | ابزار آینده | ساخت یا ویرایش پروژه | — | ساختار پیشرفتهٔ آینده | کلید غیرفعال یا toast بزودی | وجود مدل و دیالوگ اثبات ورود فعال نیست | — | — | [lib/features/projects/views/widgets/create_project_dialog.dart:94](../faro-flutter/lib/features/projects/views/widgets/create_project_dialog.dart#L94)؛ [lib/features/projects/views/widgets/edit_project_dialog.dart:134](../faro-flutter/lib/features/projects/views/widgets/edit_project_dialog.dart#L134) | بزودی؛ آموزش عملی منتشر نشود | حذف از برنامه آموزشی |
| F090 | پلن اشتراک و کیف‌پول | ابزار آینده | منوی فضای کاری | — | مدیریت مالی آینده در این ورودی | لانچرهای plans و wallet فعلاً toast بزودی | endpoint یا تب داخلی اثبات دسترسی کاربر نیست | — | — | [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550)؛ [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324)؛ [lib/core/network/api_endpoints.dart:5](../faro-flutter/lib/core/network/api_endpoints.dart#L5) | ورودی عمومی بزودی؛ آموزش پرداخت منتشر نشود | حذف از برنامه آموزشی |
| F091 | پیام صوتی چت | ابزار آینده | ورودی چت | — | ضبط صوت آینده | آیکون فعلی toast بزودی | کنترل ضبط فعال نیست | — | — | [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690) | بزودی؛ آموزش عملی منتشر نشود | حذف از برنامه آموزشی |
| F092 | ویرایش پیام چت و تغییر نام گفتگو | نیازمند اثبات | API یا repository بدون مسیر UI تأییدشده | نامشخص | نامزد بررسی بعدی | مسیر کاربر در منوی فعلی اثبات نشده | endpoint یا متد به‌تنهایی کافی نیست | — | — | [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/ai/ai_conversation/views/widgets/ai_conversation_header.dart:168](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_conversation_header.dart#L168)؛ [lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart:29](../faro-flutter/lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart#L29) | نامشخص؛ سناریوی اجرایی ساخته نشد | حذف تا اثبات UI |


## برنامهٔ مجموعه آموزشی

ترتیب پیشنهادی انتشار در هر فصل از معرفی و مشاهده به ایجاد و سپس مدیریت می‌رود. V01 تا V11 شروع کار، حساب و تیم هستند؛ V12 تا V16 هوش مصنوعی؛ V17 تا V23 گفت‌وگو؛ V24 تا V30 وظایف و بورد؛ V31 تا V35 و V37 تا V38 نامه؛ V36 و V39 سرعت کار؛ V40 مدیریت تکمیلی فضای کاری و V41 و V42 تنظیمات AI پروژه هستند. P0 برای مسیرهای اصلی راه‌اندازی و کار روزمره، و P1 برای آموزش‌های تکمیلی است. اجرا یا انتشار یک ویدیو به تماشای ویدیوهای قبلی وابسته نیست؛ fixture لازم در شناسنامه نوشته شده است.

| شناسه | عنوان ویدیو | ماژول | هدف آموزشی | سطح | زمان تخمینی به ثانیه | اولویت | پیش‌نیاز |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V01 | ورود به فارو در چند قدم | شروع کار | ورود به حساب موجود با شمارهٔ موبایل و کد شش‌رقمی | ساده | 45 | P0 | حساب آزمایشی با پروفایل تکمیل‌شده و سیم‌کارت تحت اختیار تیم؛ کد معتبر از محیط آزمون. این سناریو وابستگی به ویدیوی دیگری ندارد. |
| V02 | قبل از شروع مطمئن شو در تیم درست هستی | فضای کاری | انتخاب آگاهانهٔ فضای کاری و تشخیص تغییر محدودهٔ داده‌ها | ساده | 40 | P0 | دو فضای کاری مستقل با نام‌های «استودیو آموزش فارو» و «آزمایشگاه محصول»؛ عضویت حساب ضبط در هر دو تأیید شده باشد. |
| V03 | ظاهر فارو رو برای خودت تنظیم کن | تنظیمات | تغییر حالت روشن و تاریک با کنترل واقعی نوار کناری | ساده | 40 | P1 | نوار کناری باز و زبان فارسی فعال باشد؛ حالت اولیه روشن ثبت شود. تنظیم تقویم یا فونت جزو این ویدیو نیست. |
| V04 | مشخصات حسابت رو کامل و به‌روز نگه دار | حساب کاربری | ویرایش نام، نام خانوادگی و بیوگرافی و ذخیرهٔ تغییرات | ساده | 60 | P1 | حساب اختصاصی ضبط؛ نام کاربری فعلی معتبر باقی بماند. شمارهٔ موبایل در کادر انتشار پوشانده شود. |
| V05 | حسابت روی چه دستگاه‌هایی بازه؟ | حساب کاربری | تشخیص دستگاه جاری و سایر نشست‌های حساب | ساده | 45 | P1 | یک نشست دوم فقط برای همین حساب آزمایشی از قبل ایجاد شده باشد؛ اطلاعات IP و دستگاه‌های واقعی در قاب انتشار نباشد. |
| V06 | برای تیمت یک فضای کاری بساز | فضای کاری | ایجاد فضای کاری مستقل با عنوان و توضیح نمایشی | ساده | 60 | P0 | حساب تیم ضبط و دسترسی شبکه؛ نام مشابه در محیط آموزشی وجود نداشته باشد. هیچ همکاری در این برداشت دعوت نشود. |
| V07 | همکارت رو به فضای درست دعوت کن | فضای کاری | ارسال دعوت به حساب آزمایشی موجود از بخش اعضا | متوسط | 65 | P0 | فضای «استودیو آموزش فارو» فعال؛ حساب آزمون «سارا نمونه» با شناسهٔ آموزشی sara_demo از قبل موجود و هنوز عضو نباشد؛ دعوت فقط در محیط آموزشی. |
| V08 | کارهای یک هدف رو داخل یک پروژه جمع کن | پروژه‌ها | ایجاد پروژه با عنوان و توضیحات در فضای کاری انتخاب‌شده | ساده | 60 | P0 | فضای استودیو آموزش فارو فعال؛ پروژهٔ «انتشار پاییز» از قبل وجود نداشته باشد. فرم مستقل از ویدیوهای قبل قابل آماده‌سازی است. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| V09 | پروژهٔ پرکارت همیشه دم دست باشه | پروژه‌ها | سنجاق‌کردن پروژه و استفاده از فیلتر سنجاق‌شده‌ها | ساده | 45 | P1 | پروژهٔ انتشار پاییز موجود و سنجاق‌نشده؛ فیلتر فهرست روی همه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| V10 | فضای کاری مشترک، دسترسی پروژهٔ مشخص | پروژه‌ها | دعوت عضو مشخص به پروژه و تشخیص تفاوت دسترسی پروژه و فضا | متوسط | 65 | P1 | سارا نمونه عضو فعال فضای کاری باشد، ولی هنوز در پروژهٔ انتشار پاییز عضو نباشد؛ حساب ضبط مدیر پروژه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| V11 | اسم و توضیح پروژه رو به‌روز کن | پروژه‌ها | تغییر توضیح پروژه بدون ساخت پروژهٔ تکراری | ساده | 55 | P1 | انتشار پاییز موجود؛ توضیح اولیه «هماهنگی محتوای آموزشی نسخه پاییز» باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| V12 | از یک درخواست روشن به پاسخ قابل استفاده برس | هوش مصنوعی | ارسال یک درخواست فارسی و مشاهدهٔ پاسخ در گفت‌وگوی جدید | ساده | 65 | P0 | فضای آموزشی فعال؛ حداقل یک مدل متنی در فهرست مدل‌ها موجود؛ نشست و اعتبار سرویس معتبر. متن پاسخ از پیش قطعی نیست. |
| V13 | قبل از ارسال، مدل فعال رو بررسی کن | هوش مصنوعی | انتخاب مدل موجود از فهرست واقعی حساب | ساده | 40 | P1 | فهرست مدل‌های همان فضای کاری بارگیری شده باشد؛ نام دو مدل قابل دسترس در برگهٔ برداشت ثبت شود؛ نام تجاری ثابتی فرض نشود. |
| V14 | به‌جای توضیح طولانی، فایل نمونه رو هم بفرست | هوش مصنوعی | انتخاب پیوست متنی و ارسال همراه درخواست | متوسط | 65 | P1 | فایل sample-brief.txt از پوشهٔ assets همین بسته؛ مدل منتخب باید نوع فایل را در محیط اجرایی بپذیرد. آزمون سازگاری فایل پیش از ضبط الزامی است. |
| V15 | گفت‌وگوی قبلیت رو دوباره پیدا کن | هوش مصنوعی | جست‌وجو در فهرست گفت‌وگوها و بازکردن نتیجه | ساده | 45 | P1 | یک گفت‌وگوی نمونه با عنوان شامل «ضبط» از قبل در فهرست همان فضای کاری وجود داشته باشد؛ عنوان را در محیط آزمون بررسی کنید؛ تغییر نام در UI این نسخه فرض نشود. |
| V16 | یک پاسخ دیگه بگیر و متنش رو بردار | هوش مصنوعی | درخواست تولید مجدد پاسخ و کپی متن از کنترل واقعی پیام | متوسط | 65 | P1 | گفت‌وگوی نمونه دارای یک پیام کاربر و پاسخ کامل؛ جریان پاسخ در حال تولید نباشد. بازتولید ممکن است سهمیه مصرف کند. پاسخ هدف باید آخرین پیام کامل گفت‌وگو باشد؛ callback تولید مجدد فقط برای آخرین پاسخ وصل است. |
| V17 | یک گفت‌وگوی مشخص با همکارت شروع کن | گفت‌وگو | انتخاب همکار و شروع پیام مستقیم در دو مرحلهٔ واقعی فرم | ساده | 70 | P0 | سارا نمونه عضو فعال فضای آموزشی باشد؛ فهرست همکاران بارگیری شود. وجود گفت‌وگوی مستقیم قبلی مانع نیست؛ همان اتاق ممکن است باز شود. |
| V18 | موضوع‌های کاری رو از هم جدا نگه دار | گفت‌وگو | ساخت گفت‌وگوی موضوعی با همکار مشخص و عنوان مستقل | ساده | 65 | P1 | سارا نمونه عضو فعال باشد؛ موضوع «بازبینی ویدیوی شروع کار» هنوز ساخته نشده باشد. |
| V19 | هماهنگی چندنفره رو در یک گروه جمع کن | گفت‌وگو | ساخت اتاق گروهی و اضافه‌کردن اعضای منتخب | متوسط | 70 | P1 | دو حساب سارا نمونه و امیر نمونه عضو فعال فضا باشند؛ هیچ گروه هم‌نامی وجود نداشته باشد. ابتدا ساخت گروه و سپس افزودن اعضا در سرور انجام می‌شود. |
| V20 | جوابت رو به همون پیام وصل کن | گفت‌وگو | ارسال پاسخ نقل‌قول‌شده به پیام قبلی | ساده | 55 | P0 | اتاق آزمایشی با پیام «نسخه اول سناریو آماده است.» از سارا نمونه؛ حساب ضبط عضو اتاق باشد. |
| V21 | یک پیام رو با زمینهٔ لازم منتقل کن | گفت‌وگو | ارسال مجدد پیام به مقصد انتخاب‌شده همراه یادداشت اختیاری | متوسط | 70 | P1 | پیام نمونه در اتاق آموزشی؛ امیر نمونه مقصد مجاز و فعال باشد. گیرنده فقط حساب آزمون باشد. |
| V22 | فایل نمونه رو کنار پیام تیم بفرست | گفت‌وگو | انتخاب فایل، نوشتن توضیح و ارسال پیوست در اتاق | ساده | 60 | P1 | فایل sample-brief.txt موجود؛ اتاق فقط شامل حساب‌های آزمون. هیچ فایل سیستمی یا سند شخصی انتخاب نشود. |
| V23 | از متن گفت‌وگو به توضیح قابل فهم برس | گفت‌وگو و هوش مصنوعی | انتقال یک پیام نمونه از منوی چت به جریان توضیح هوش مصنوعی | متوسط | 55 | P1 | پیام «برنامه ضبط: آماده‌سازی داده، ضبط تصویر، بازبینی نریشن و تدوین.» در اتاق آموزشی؛ متن فقط نمونه باشد. مدل متنی قابل استفاده. |
| V24 | یک کار مشخص رو به وظیفه تبدیل کن | وظایف | ثبت وظیفه با عنوان، توضیح، پروژه و مسئول انجام مشخص | متوسط | 90 | P0 | پروژهٔ انتشار پاییز و حساب سارا نمونه موجود؛ پروژه حداقل یک بورد و ستون «برای انجام» داشته باشد؛ اطلاعات فرم بدون خطا بارگیری شوند. |
| V25 | مهلت انجام و یادآوری رو جدا تنظیم کن | وظایف | تنظیم سررسید فردا و یادآوری فردا ساعت ۱۰ برای وظیفهٔ موجود | متوسط | 90 | P1 | وظیفهٔ بازبینی سناریوی شروع کار موجود، قابل ویرایش و بدون یادآوری؛ ساعت و منطقهٔ زمانی رایانه درست باشد. اعلان محلی فقط روی دستگاه فعلی ارزیابی می‌شود. |
| V26 | یک کار بزرگ رو به قدم‌های روشن تقسیم کن | وظایف | افزودن دو مورد به چک‌لیست و ثبت تکمیل یک مورد | متوسط | 75 | P1 | وظیفهٔ نمونه بدون مورد چک‌لیست؛ کاربر اجازهٔ ویرایش دارد. موارد مشابه از برداشت قبل باقی نمانده باشند. |
| V27 | مرحلهٔ بازبینی رو به بورد اضافه کن | بورد پروژه | ساخت ستون با عنوان مشخص در بورد موجود پروژه | متوسط | 65 | P1 | شناسهٔ پروژهٔ انتشار پاییز از انتخاب پروژه به دست آید؛ بورد موجود و ستون «بازبینی» ناموجود باشد؛ ایجاد جریان کاری جدید موضوع این ویدیو نیست. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| V28 | مرحلهٔ کار رو با کشیدن کارت تغییر بده | بورد پروژه | انتقال وظیفه از ستون برای انجام به بازبینی و بررسی ماندگاری | متوسط | 55 | P0 | همان بورد با ستون‌های «برای انجام» و «بازبینی»؛ کارت «بازبینی سناریوی شروع کار» در برای انجام؛ هر دو ستون در قاب دیده شوند. |
| V29 | وظیفهٔ موردنظر رو سریع‌تر پیدا کن | وظایف | محدودکردن فهرست وظایف با جست‌وجو و مرتب‌سازی سررسید | ساده | 55 | P1 | حداقل سه وظیفهٔ حساب ضبط با عنوان شامل «بازبینی» و مهلت‌های متفاوت وجود داشته باشند؛ تب وظایف من فعال باشد. |
| V30 | پیشرفت کار رو کنار خود وظیفه ثبت کن | وظایف | نوشتن گزارش متنی در رشتهٔ گفت‌وگوی وظیفه | ساده | 65 | P0 | وظیفهٔ نمونه موجود؛ حساب ضبط دسترسی دارد؛ رشتهٔ گزارش فقط شامل محتوای آزمایشی باشد. |
| V31 | موضوع، گیرنده و متن رو در یک نامه ثبت کن | نامه‌ها | ساخت نامهٔ جدید و ارسال به یک گیرندهٔ آموزشی | متوسط | 85 | P0 | نامه در پلن فضای کاری فعال باشد؛ سارا نمونه گیرندهٔ معتبر و حساب ضبط مجاز ارسال باشد؛ پیش‌نویس قبلی همین عملیات پاک یا بررسی شود. |
| V32 | نامهٔ موردنظر رو از بین مکاتبات پیدا کن | نامه‌ها | انتخاب پوشه و جست‌وجو با موضوع نامه | ساده | 55 | P1 | حداقل یک نامهٔ دریافتی با موضوع برنامه ضبط آموزش شروع کار برای حساب ضبط موجود باشد؛ فرستنده یک حساب آزمایشی دیگر باشد. |
| V33 | نظر و تأییدت رو روی نامه ثبت کن | نامه‌ها | ثبت پاراف روی نامه‌ای که برای کاربر جاری نیازمند پاراف است | متوسط | 60 | P1 | نامهٔ نمونه از حساب آزمون دیگر با درخواست پاراف فعال برای حساب ضبط ارسال شده باشد؛ حساب ضبط هنوز روی آن پاراف ثبت نکرده باشد. |
| V34 | پاسخ نامه رو در همون رشته ادامه بده | نامه‌ها | ثبت پاسخ متنی در پنل مکاتبات نامهٔ موجود | ساده | 60 | P0 | نامهٔ «برنامه ضبط آموزش شروع کار» برای حساب ضبط موجود؛ رشتهٔ مکاتبات دسترس‌پذیر باشد. مخاطبان پاسخ را سرور از پیام مرجع تعیین می‌کند. |
| V35 | نسخهٔ قابل چاپ نامه رو بررسی کن | نامه‌ها | بازکردن مسیر چاپ و بازبینی پیش‌نمایش خروجی | ساده | 55 | P1 | نامهٔ نمونه با متن فارسی موجود؛ سرویس چاپ سیستم در دسترس باشد؛ هیچ چاپگر واقعی برای ارسال خودکار انتخاب نشود. ضبط تا پیش‌نمایش ادامه دارد. |
| V36 | با یک میانبر به کار موردنظر برس | جست‌وجو | بازکردن جست‌وجوی سراسری، محدودکردن به وظایف و بازکردن نتیجه | متوسط | 65 | P0 | وظیفهٔ بازبینی سناریوی شروع کار موجود و قابل مشاهده باشد؛ پنجرهٔ دیگری باز نباشد؛ نتیجهٔ سرور جست‌وجوی وظایف در دسترس باشد. |
| V37 | نامه رو با درخواست روشن ارجاع بده | نامه‌ها | ارجاع نامهٔ موجود به گیرندهٔ آزمایشی همراه یادداشت | متوسط | 60 | P1 | نامهٔ برنامه ضبط آموزش شروع کار قابل دسترس؛ امیر نمونه عضو واجد شرایط فضا باشد؛ پیش‌نویس ارجاع همین نامه از قبل خالی باشد. |
| V38 | نامهٔ پیگیری‌شده رو از فهرست جاری کنار بگذار | نامه‌ها | بایگانی نامهٔ دریافتی و بازگرداندن آن از پوشهٔ بایگانی | ساده | 60 | P1 | نامهٔ دریافتی نمونه برای حساب ضبط و خارج از بایگانی؛ حساب صرفاً فرستنده نباشد. |
| V39 | میانبرهای فارو رو از داخل خودش پیدا کن | افزایش سرعت | بازکردن راهنمای میانبر و استفاده از میانبر نوار کناری | ساده | 45 | P1 | هیچ ورودی متن فوکوس نداشته باشد؛ چیدمان ویندوز با صفحه‌کلید لاتین برای نمایش کلیدها؛ قاب دسکتاپ باز باشد. |
| V40 | هدف فضای تیم رو در تنظیمات روشن نگه دار | فضای کاری | ویرایش توضیحات فضای کاری و بررسی ماندگاری پس از بازخوانی | متوسط | 65 | P1 | استودیو آموزش فارو فعال؛ حساب مجاز مدیریت؛ هیچ عملیات حذف یا ترک فضا در این برداشت اجرا نشود. |
| V41 | لحن دستیار پروژه رو روشن تعریف کن | پروژه و هوش مصنوعی | نوشتن و ذخیرهٔ دستورالعمل سیستم در تنظیمات AI پروژه | متوسط | 65 | P1 | پروژهٔ انتشار پاییز موجود؛ دستورالعمل قبلی خالی یا متن پایهٔ آموزشی باشد؛ حساب مدیر پروژه. تأثیر روی پاسخ‌های قدیمی در این ویدیو ادعا نمی‌شود. |
| V42 | سند نمونه رو برای پردازش دانشی آماده کن | پروژه و هوش مصنوعی | بارگذاری فایل دانشی و تشخیص تفاوت بارگذاری و آماده‌بودن پردازش | پیشرفته | 70 | P1 | فایل sample-brief.txt موجود؛ پروژهٔ انتشار پاییز مجاز بارگذاری فایل باشد. endpoint پروژه و نوشتهٔ جدید UI دربارهٔ پایگاه دانش فضای کاری باید پیش از انتشار با محیط واقعی تطبیق داده شوند. |


## سناریوهای اجرایی ضبط

سناریوها در ادامه با ساختار یکسان نوشته شده‌اند. وضعیت همه در زمان تحویل «شواهد کد موجود و اجرای محصول نیازمند تست» است؛ V42 افزون بر آن به رفع ابهام دامنهٔ پایگاه دانش و تطبیق متن UI با API نیاز دارد. متن کنترل‌های سیستم و مدل‌های موجود در سرویس، فقط پس از ثبت مقدار واقعی در برگهٔ برداشت قطعی می‌شود.

در مسیر فعلی پروژه‌ها، ProfileView از ProjectsFilterTabs و ProjectListRow استفاده می‌کند. کنترل تغییر نمای لیستی و شبکه‌ای و مرتب‌سازی ProjectsHeader قدیمی به این مسیر وصل نیستند؛ این دو مورد در فهرست قابلیت‌ها با وضعیت مسیر اثبات‌نشده ثبت شده‌اند. دکمهٔ ساخت پروژه در این صفحه آیکون مثبت با tooltip «ایجاد پروژه» است. همچنین دکمه‌های کارت حساب «مشخصات» و «نشست‌ها»، و عنوان تب بورد «تخته» هستند. [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/shell/views/widgets/project_header/project_tool_tabs.dart:13](../faro-flutter/lib/app/shell/views/widgets/project_header/project_tool_tabs.dart#L13)

## V01 ورود با کد یکبارمصرف

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ورود با کد یکبارمصرف |
| عنوان انتشار | ورود به فارو در چند قدم |
| ماژول | شروع کار |
| هدف آموزشی | ورود به حساب موجود با شمارهٔ موبایل و کد شش‌رقمی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | دارندهٔ حساب آزمایشی |
| سطح | ساده |
| زمان هدف | 45 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /login |
| پیش‌نیاز | حساب آزمایشی با پروفایل تکمیل‌شده و سیم‌کارت تحت اختیار تیم؛ کد معتبر از محیط آزمون. این سناریو وابستگی به ویدیوی دیگری ندارد. |
| نتیجهٔ یادگیری | ورود به حساب موجود با شمارهٔ موبایل و کد شش‌رقمی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/auth/views/login_view.dart:21](../faro-flutter/lib/features/auth/views/login_view.dart#L21)؛ [lib/features/auth/views/widgets/auth_phone_step.dart:55](../faro-flutter/lib/features/auth/views/widgets/auth_phone_step.dart#L55)؛ [lib/features/auth/views/widgets/auth_otp_step.dart:114](../faro-flutter/lib/features/auth/views/widgets/auth_otp_step.dart#L114)؛ [lib/features/auth/view_models/auth_view_model.dart:111](../faro-flutter/lib/features/auth/view_models/auth_view_model.dart#L111)

### B آماده‌سازی محیط ضبط

با نقش «دارندهٔ حساب آزمایشی» وارد محیط آموزشی شوید. حساب آزمایشی با پروفایل تکمیل‌شده و سیم‌کارت تحت اختیار تیم؛ کد معتبر از محیط آزمون. این سناریو وابستگی به ویدیوی دیگری ندارد.

وضعیت آغاز: صفحهٔ ورود باز باشد؛ کنترل «شماره موبایل» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: حساب آزمون خارج از نشست باشد؛ شماره و کد را پیش از برداشت آماده کنید و کد قبلی را استفاده نکنید.

خطاها و شرط توقف: حساب تازه ممکن است به تکمیل اطلاعات هدایت شود؛ آن حساب برای این برداشت مناسب نیست. ارسال مجدد کد تا پایان شمارنده در دسترس نیست. کد منقضی یا نادرست را با تدوین موفق جلوه ندهید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| شماره موبایل | شمارهٔ حساب اختصاصی تیم ضبط | عدد ساختگی ثابت وارد نکنید؛ قالب مجاز 09 و نه رقم بعد از آن یا 9 و نه رقم بعد از آن است. |
| کد تایید | کد شش‌رقمی همان نوبت | کد و شماره در نسخهٔ انتشار پوشانده شوند؛ مقدار در سند ذخیره نشود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ ورود | شماره موبایل | کلیک و تایپ؛ «شمارهٔ حساب آزمون» را وارد کنید | دکمهٔ دریافت کد قابل استفاده می‌شود. |
| 2 | صفحهٔ ورود | دریافت کد تایید | کلیک | مرحلهٔ کد تایید باز می‌شود؛ خطای شبکه مانع ادامه است. |
| 3 | مرحلهٔ کد تایید | کد ۶ رقمی | تایپ کد جاری؛ «کد معتبر همان درخواست» را وارد کنید | تأیید کد و ورود آغاز می‌شود؛ ورودی شش‌رقمی می‌تواند خودکار ارسال شود. |
| 4 | پس از ورود | صفحهٔ هوش‌مصنوعی | مکث؛ حذف انتظار در تدوین | حساب موجود به مسیر صفحهٔ هوش مصنوعی می‌رسد. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 7–15 ثانیه | صفحهٔ ورود | شماره موبایل | کلیک و تایپ | شمارهٔ حساب آزمون | دکمهٔ دریافت کد قابل استفاده می‌شود. | فیلد با پوشش شماره | برای ورود، شمارهٔ حساب آزمایشی رو در این قسمت وارد می‌کنیم. |
| 2 · 15–23 ثانیه | صفحهٔ ورود | دریافت کد تایید | کلیک | — | مرحلهٔ کد تایید باز می‌شود؛ خطای شبکه مانع ادامه است. | دکمه و عنوان مرحله | دریافت کد تایید رو می‌زنیم تا به مرحلهٔ بعد برسیم. |
| 3 · 23–30 ثانیه | مرحلهٔ کد تایید | کد ۶ رقمی | تایپ کد جاری | کد معتبر همان درخواست | تأیید کد و ورود آغاز می‌شود؛ ورودی شش‌رقمی می‌تواند خودکار ارسال شود. | کادر کد با پوشش کامل | کدی که برای همین ورود دریافت کردیم رو وارد می‌کنیم. |
| 4 · 30–37 ثانیه | پس از ورود | صفحهٔ هوش‌مصنوعی | مکث؛ حذف انتظار در تدوین | — | حساب موجود به مسیر صفحهٔ هوش مصنوعی می‌رسد. | قاب کامل همراه نام فضای کاری | وقتی کد تأیید بشه، وارد محیط اصلی فارو می‌شیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «اولین قدم کار با فارو، ورود به حسابه.»

معرفی مسئله از 4 تا 7 ثانیه: «با حساب آموزشی، مراحل ورود رو انجام می‌دیم.»

آموزش عملی از 7 تا 37 ثانیه:

«برای ورود، شمارهٔ حساب آزمایشی رو در این قسمت وارد می‌کنیم. دریافت کد تایید رو می‌زنیم تا به مرحلهٔ بعد برسیم. کدی که برای همین ورود دریافت کردیم رو وارد می‌کنیم. وقتی کد تأیید بشه، وارد محیط اصلی فارو می‌شیم.»

نمایش نتیجه از 37 تا 42 ثانیه: «حالا محیط اصلی و فضای کاری رو می‌بینیم.»

پایان از 42 تا 45 ثانیه: «از اینجا می‌تونیم ابزار موردنیازمون رو انتخاب کنیم.»

متن حدود 72 واژه دارد؛ برآورد 1.60 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ ورود | متن روی تصویر: ورود به فارو در چند قدم؛ هوک همزمان خوانده شود. |
| 4–7 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا شماره موبایل؛ قبل از کلیک مکث کوتاه. |
| 7–37 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی دریافت کد تایید نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 37–42 | نمای نهایی از وقتی کد تأیید بشه، وارد محیط اصلی فارو می‌شیم. | موس از روی متن کنار برود؛ حساب موجود به مسیر صفحهٔ هوش مصنوعی می‌رسد. |
| 42–45 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «شماره موبایل» و نتیجهٔ «وقتی کد تأیید بشه، وارد محیط اصلی فارو می‌شیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ ورود» و کنترل «شماره موبایل» در اجرای واقعی وجود دارند.
- [ ] نقش «دارندهٔ حساب آزمایشی» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: حساب موجود به مسیر صفحهٔ هوش مصنوعی می‌رسد.
- [ ] شرط‌های توقف بررسی شدند: حساب تازه ممکن است به تکمیل اطلاعات هدایت شود؛ آن حساب برای این برداشت مناسب نیست. ارسال مجدد کد تا پایان شمارنده در دسترس نیست. کد منقضی یا نادرست را با تدوین موفق جلوه ندهید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ورود به حساب موجود با شمارهٔ موبایل و کد شش‌رقمی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 45 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V01 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V02 تغییر فضای کاری

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | تغییر فضای کاری |
| عنوان انتشار | قبل از شروع مطمئن شو در تیم درست هستی |
| ماژول | فضای کاری |
| هدف آموزشی | انتخاب آگاهانهٔ فضای کاری و تشخیص تغییر محدودهٔ داده‌ها |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو دو فضای کاری |
| سطح | ساده |
| زمان هدف | 40 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /ai |
| پیش‌نیاز | دو فضای کاری مستقل با نام‌های «استودیو آموزش فارو» و «آزمایشگاه محصول»؛ عضویت حساب ضبط در هر دو تأیید شده باشد. |
| نتیجهٔ یادگیری | انتخاب آگاهانهٔ فضای کاری و تشخیص تغییر محدودهٔ داده‌ها |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324)؛ [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74)

### B آماده‌سازی محیط ضبط

با نقش «عضو دو فضای کاری» وارد محیط آموزشی شوید. دو فضای کاری مستقل با نام‌های «استودیو آموزش فارو» و «آزمایشگاه محصول»؛ عضویت حساب ضبط در هر دو تأیید شده باشد.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «نام فضای کاری در بالای نوار کناری» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: فضای آزمایشگاه محصول را دوباره فعال و فیلد جست‌وجو را خالی کنید.

خطاها و شرط توقف: اگر مقصد در فهرست نیست، عضویت یا دعوت در انتظار را بررسی کنید؛ وجود یک نام در دعوت‌ها به معنی عضویت فعال نیست. فهرست خالی را با دادهٔ تیم دیگر پر نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| فضای مبدأ | آزمایشگاه محصول | ابتدای برداشت فعال باشد. |
| فضای مقصد | استودیو آموزش فارو | حداقل یک پروژهٔ نمونه داشته باشد. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | نام فضای کاری در بالای نوار کناری | کلیک؛ «آزمایشگاه محصول» را وارد کنید | منوی فضای کاری باز می‌شود. |
| 2 | منوی فضای کاری | جست‌وجو در فضاهای کاری... | تایپ؛ «استودیو آموزش» را وارد کنید | فهرست فضاهای دیگر محدود می‌شود. |
| 3 | سایر فضاهای کاری | استودیو آموزش فارو | کلیک روی ردیف | فضای کاری انتخاب می‌شود؛ داده‌ها دوباره بارگذاری می‌شوند. |
| 4 | صفحهٔ هوش مصنوعی | نام فضای کاری انتخاب‌شده | مکث | نام مقصد در هدر دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 6–13 ثانیه | صفحهٔ هوش مصنوعی | نام فضای کاری در بالای نوار کناری | کلیک | آزمایشگاه محصول | منوی فضای کاری باز می‌شود. | بالای نوار کناری | اول نام فضای کاری فعلی رو از بالای نوار کناری باز می‌کنیم. |
| 2 · 13–20 ثانیه | منوی فضای کاری | جست‌وجو در فضاهای کاری... | تایپ | استودیو آموزش | فهرست فضاهای دیگر محدود می‌شود. | فیلد و نتیجه | برای پیدا کردن تیم موردنظر، بخشی از اسمش رو می‌نویسیم. |
| 3 · 20–26 ثانیه | سایر فضاهای کاری | استودیو آموزش فارو | کلیک روی ردیف | — | فضای کاری انتخاب می‌شود؛ داده‌ها دوباره بارگذاری می‌شوند. | ردیف انتخاب و سپس هدر | استودیو آموزش فارو رو انتخاب می‌کنیم و منتظر بارگذاری می‌مونیم. |
| 4 · 26–32 ثانیه | صفحهٔ هوش مصنوعی | نام فضای کاری انتخاب‌شده | مکث | — | نام مقصد در هدر دیده می‌شود. | نام فضا و فهرست محتوا | نام بالای صفحه نشون می‌ده الان داخل کدوم فضای کاری هستیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 3 ثانیه: «اطلاعات تیمت رو پیدا نمی‌کنی؟ اول فضای کاری رو بررسی کن.»

معرفی مسئله از 3 تا 6 ثانیه: «فضای کاری مقصد رو با هم انتخاب می‌کنیم.»

آموزش عملی از 6 تا 32 ثانیه:

«اول نام فضای کاری فعلی رو از بالای نوار کناری باز می‌کنیم. برای پیدا کردن تیم موردنظر، بخشی از اسمش رو می‌نویسیم. استودیو آموزش فارو رو انتخاب می‌کنیم و منتظر بارگذاری می‌مونیم. نام بالای صفحه نشون می‌ده الان داخل کدوم فضای کاری هستیم.»

نمایش نتیجه از 32 تا 37 ثانیه: «الان داده‌های فضای استودیو آموزش فارو رو داریم می‌بینیم.»

پایان از 37 تا 40 ثانیه: «قبل از ساخت هر آیتم، همین نام رو بررسی کن.»

متن حدود 81 واژه دارد؛ برآورد 2.02 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–3 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: قبل از شروع مطمئن شو در تیم درست هستی؛ هوک همزمان خوانده شود. |
| 3–6 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نام فضای کاری در بالای نوار کناری؛ قبل از کلیک مکث کوتاه. |
| 6–32 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی جست‌وجو در فضاهای کاری... نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 32–37 | نمای نهایی از نام بالای صفحه نشون می‌ده الان داخل کدوم فضای کاری هستیم. | موس از روی متن کنار برود؛ نام مقصد در هدر دیده می‌شود. |
| 37–40 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نام فضای کاری در بالای نوار کناری» و نتیجهٔ «نام بالای صفحه نشون می‌ده الان داخل کدوم فضای کاری هستیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «نام فضای کاری در بالای نوار کناری» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو دو فضای کاری» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: نام مقصد در هدر دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: اگر مقصد در فهرست نیست، عضویت یا دعوت در انتظار را بررسی کنید؛ وجود یک نام در دعوت‌ها به معنی عضویت فعال نیست. فهرست خالی را با دادهٔ تیم دیگر پر نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتخاب آگاهانهٔ فضای کاری و تشخیص تغییر محدودهٔ داده‌ها.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 40 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V02 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V03 تغییر ظاهر برنامه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | تغییر ظاهر برنامه |
| عنوان انتشار | ظاهر فارو رو برای خودت تنظیم کن |
| ماژول | تنظیمات |
| هدف آموزشی | تغییر حالت روشن و تاریک با کنترل واقعی نوار کناری |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر واردشده |
| سطح | ساده |
| زمان هدف | 40 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /ai |
| پیش‌نیاز | نوار کناری باز و زبان فارسی فعال باشد؛ حالت اولیه روشن ثبت شود. تنظیم تقویم یا فونت جزو این ویدیو نیست. |
| نتیجهٔ یادگیری | تغییر حالت روشن و تاریک با کنترل واقعی نوار کناری |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643)؛ [lib/core/services/app_settings_service.dart:336](../faro-flutter/lib/core/services/app_settings_service.dart#L336)

### B آماده‌سازی محیط ضبط

با نقش «کاربر واردشده» وارد محیط آموزشی شوید. نوار کناری باز و زبان فارسی فعال باشد؛ حالت اولیه روشن ثبت شود. تنظیم تقویم یا فونت جزو این ویدیو نیست.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «نوار کناری» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: تم روشن را از کنترل حالت انتخاب کنید؛ زبان فارسی و نوار کناری باز باشند.

خطاها و شرط توقف: کلیک‌های متوالی روی ردیف چرخهٔ روشن ← تاریک ← سیستم ← روشن دارند؛ منوی کشویی فرضی نسازید. برچسب فارسی از settings.theme در پیوست کنترل‌ها بررسی شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| حالت اولیه | روشن | پیش از برداشت تنظیم شود. |
| حالت مقصد | تاریک | کنترل حالت ظاهری انتخاب شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | نوار کناری | فشردن Ctrl+B فقط اگر نوار بسته است | عنوان‌های تنظیمات قابل دیدن هستند. |
| 2 | بخش تنظیمات | تم؛ ردیف دارای آیکون ماه | کلیک روی خود ردیف از حالت روشن | themeMode از روشن به تاریک می‌رود. |
| 3 | همان صفحه | محتوای برنامه | مکث | رنگ سطوح و متن مطابق تم تغییر می‌کند. |
| 4 | بخش تنظیمات | کنترل سه‌حالتهٔ پوسته | اشاره بدون تغییر | گزینه‌های روشن، تاریک و سیستم قابل تشخیص‌اند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 6–13 ثانیه | صفحهٔ هوش مصنوعی | نوار کناری | فشردن Ctrl+B فقط اگر نوار بسته است | — | عنوان‌های تنظیمات قابل دیدن هستند. | نمای کامل نوار | نوار کناری رو باز می‌کنیم تا تنظیمات ظاهری دیده بشه. |
| 2 · 13–20 ثانیه | بخش تنظیمات | تم؛ ردیف دارای آیکون ماه | کلیک روی خود ردیف از حالت روشن | — | themeMode از روشن به تاریک می‌رود. | ردیف ماه و سطح صفحه | از ردیف پوسته، حالت تاریک رو فعال می‌کنیم. |
| 3 · 20–26 ثانیه | همان صفحه | محتوای برنامه | مکث | — | رنگ سطوح و متن مطابق تم تغییر می‌کند. | قاب کامل | رنگ محیط عوض می‌شه و محتوا در همون صفحه باقی می‌مونه. |
| 4 · 26–32 ثانیه | بخش تنظیمات | کنترل سه‌حالتهٔ پوسته | اشاره بدون تغییر | — | گزینه‌های روشن، تاریک و سیستم قابل تشخیص‌اند. | کلید سه‌حالته | از همین کنترل می‌تونی حالت روشن یا هماهنگ با سیستم رو هم انتخاب کنی. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 3 ثانیه: «کار طولانی با صفحه؟ ظاهر برنامه رو متناسب با محیط تنظیم کن.»

معرفی مسئله از 3 تا 6 ثانیه: «این بار حالت روشن رو به تاریک تغییر می‌دیم.»

آموزش عملی از 6 تا 32 ثانیه:

«نوار کناری رو باز می‌کنیم تا تنظیمات ظاهری دیده بشه. از ردیف پوسته، حالت تاریک رو فعال می‌کنیم. رنگ محیط عوض می‌شه و محتوا در همون صفحه باقی می‌مونه. از همین کنترل می‌تونی حالت روشن یا هماهنگ با سیستم رو هم انتخاب کنی.»

نمایش نتیجه از 32 تا 37 ثانیه: «حالا فارو با ظاهر تاریک نمایش داده می‌شه.»

پایان از 37 تا 40 ثانیه: «برای ضبط بقیهٔ آموزش‌ها، ظاهر یکسانی نگه داریم.»

متن حدود 80 واژه دارد؛ برآورد 2.00 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–3 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: ظاهر فارو رو برای خودت تنظیم کن؛ هوک همزمان خوانده شود. |
| 3–6 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نوار کناری؛ قبل از کلیک مکث کوتاه. |
| 6–32 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی تم؛ ردیف دارای آیکون ماه نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 32–37 | نمای نهایی از از همین کنترل می‌تونی حالت روشن یا هماهنگ با سیستم رو هم انتخاب کنی. | موس از روی متن کنار برود؛ گزینه‌های روشن، تاریک و سیستم قابل تشخیص‌اند. |
| 37–40 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نوار کناری» و نتیجهٔ «از همین کنترل می‌تونی حالت روشن یا هماهنگ با سیستم رو هم انتخاب کنی.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «نوار کناری» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر واردشده» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: گزینه‌های روشن، تاریک و سیستم قابل تشخیص‌اند.
- [ ] شرط‌های توقف بررسی شدند: کلیک‌های متوالی روی ردیف چرخهٔ روشن ← تاریک ← سیستم ← روشن دارند؛ منوی کشویی فرضی نسازید. برچسب فارسی از settings.theme در پیوست کنترل‌ها بررسی شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: تغییر حالت روشن و تاریک با کنترل واقعی نوار کناری.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 40 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V03 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V04 ویرایش مشخصات حساب

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ویرایش مشخصات حساب |
| عنوان انتشار | مشخصات حسابت رو کامل و به‌روز نگه دار |
| ماژول | حساب کاربری |
| هدف آموزشی | ویرایش نام، نام خانوادگی و بیوگرافی و ذخیرهٔ تغییرات |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | صاحب حساب آزمایشی |
| سطح | ساده |
| زمان هدف | 60 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile → مشخصات کاربری |
| پیش‌نیاز | حساب اختصاصی ضبط؛ نام کاربری فعلی معتبر باقی بماند. شمارهٔ موبایل در کادر انتشار پوشانده شود. |
| نتیجهٔ یادگیری | ویرایش نام، نام خانوادگی و بیوگرافی و ذخیرهٔ تغییرات |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart:136](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart#L136)؛ [lib/app/shell/views/widgets/project_header/user_profile/user_profile_details_tab.dart:104](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_details_tab.dart#L104)

### B آماده‌سازی محیط ضبط

با نقش «صاحب حساب آزمایشی» وارد محیط آموزشی شوید. حساب اختصاصی ضبط؛ نام کاربری فعلی معتبر باقی بماند. شمارهٔ موبایل در کادر انتشار پوشانده شود.

وضعیت آغاز: صفحهٔ حساب باز باشد؛ کنترل «مشخصات در کارت حساب» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: نام و بیوگرافی حساب مصرفی را به دادهٔ پایه برگردانید؛ نام کاربری معتبر را دست نزنید.

خطاها و شرط توقف: نام و نام خانوادگی الزامی‌اند؛ نام کاربری حداقل سه کاراکتر است. شمارهٔ موبایل در این فرم قابل تغییر نیست؛ ادعای تغییر شماره نکنید. ایمیل نامعتبر ذخیره را متوقف می‌کند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| نام | نگار | غیرخالی |
| نام خانوادگی | آموزشی | غیرخالی |
| درباره من / بیوگرافی | هماهنگ‌کنندهٔ آموزش فارو | متن نمایشی |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب | مشخصات در کارت حساب | کلیک | پنجرهٔ پروفایل در زبانهٔ مشخصات کاربری باز می‌شود. |
| 2 | مشخصات کاربری | نام | انتخاب متن و تایپ؛ «نگار» را وارد کنید | فیلد نام تغییر می‌کند. |
| 3 | مشخصات کاربری | نام خانوادگی | انتخاب متن و تایپ؛ «آموزشی» را وارد کنید | فیلد معتبر می‌ماند. |
| 4 | مشخصات کاربری | درباره من / بیوگرافی | اسکرول در فرم و تایپ؛ «هماهنگ‌کنندهٔ آموزش فارو» را وارد کنید | تغییرات آمادهٔ ذخیره می‌شوند. |
| 5 | پنجرهٔ پروفایل | ذخیره تغییرات | کلیک | پیام به‌روزرسانی مشخصات نمایش داده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | صفحهٔ حساب | مشخصات در کارت حساب | کلیک | — | پنجرهٔ پروفایل در زبانهٔ مشخصات کاربری باز می‌شود. | دکمهٔ مشخصات در کارت حساب | از صفحهٔ حساب، مشخصات رو باز می‌کنیم. |
| 2 · 17–26 ثانیه | مشخصات کاربری | نام | انتخاب متن و تایپ | نگار | فیلد نام تغییر می‌کند. | فیلد نام | نام نمایشی رو به نگار تغییر می‌دیم. |
| 3 · 26–34 ثانیه | مشخصات کاربری | نام خانوادگی | انتخاب متن و تایپ | آموزشی | فیلد معتبر می‌ماند. | نام خانوادگی | نام خانوادگی رو هم برای حساب آموزشی کامل می‌کنیم. |
| 4 · 34–42 ثانیه | مشخصات کاربری | درباره من / بیوگرافی | اسکرول در فرم و تایپ | هماهنگ‌کنندهٔ آموزش فارو | تغییرات آمادهٔ ذخیره می‌شوند. | فیلد بیوگرافی | در بیوگرافی، یک توضیح کوتاه دربارهٔ نقشمون می‌نویسیم. |
| 5 · 42–50 ثانیه | پنجرهٔ پروفایل | ذخیره تغییرات | کلیک | — | پیام به‌روزرسانی مشخصات نمایش داده می‌شود. | دکمه و اعلان موفقیت | ذخیره تغییرات رو می‌زنیم تا مشخصات جدید ثبت بشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «همکارات تو رو با چه اسمی می‌بینن؟»

معرفی مسئله از 4 تا 8 ثانیه: «نام و توضیح حساب آموزشی رو به‌روز می‌کنیم.»

آموزش عملی از 8 تا 50 ثانیه:

«از صفحهٔ حساب، مشخصات رو باز می‌کنیم. نام نمایشی رو به نگار تغییر می‌دیم. نام خانوادگی رو هم برای حساب آموزشی کامل می‌کنیم. در بیوگرافی، یک توضیح کوتاه دربارهٔ نقشمون می‌نویسیم. ذخیره تغییرات رو می‌زنیم تا مشخصات جدید ثبت بشه.»

نمایش نتیجه از 50 تا 56 ثانیه: «مشخصات جدید ذخیره شده و حساب آمادهٔ کاره.»

پایان از 56 تا 60 ثانیه: «اطلاعات این صفحه رو هر وقت لازم شد به‌روز کن.»

متن حدود 73 واژه دارد؛ برآورد 1.22 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب | متن روی تصویر: مشخصات حسابت رو کامل و به‌روز نگه دار؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا مشخصات در کارت حساب؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی نام نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از ذخیره تغییرات رو می‌زنیم تا مشخصات جدید ثبت بشه. | موس از روی متن کنار برود؛ پیام به‌روزرسانی مشخصات نمایش داده می‌شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «مشخصات در کارت حساب» و نتیجهٔ «ذخیره تغییرات رو می‌زنیم تا مشخصات جدید ثبت بشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب» و کنترل «مشخصات در کارت حساب» در اجرای واقعی وجود دارند.
- [ ] نقش «صاحب حساب آزمایشی» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پیام به‌روزرسانی مشخصات نمایش داده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: نام و نام خانوادگی الزامی‌اند؛ نام کاربری حداقل سه کاراکتر است. شمارهٔ موبایل در این فرم قابل تغییر نیست؛ ادعای تغییر شماره نکنید. ایمیل نامعتبر ذخیره را متوقف می‌کند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ویرایش نام، نام خانوادگی و بیوگرافی و ذخیرهٔ تغییرات.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V04 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V05 بررسی نشست‌های فعال

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | بررسی نشست‌های فعال |
| عنوان انتشار | حسابت روی چه دستگاه‌هایی بازه؟ |
| ماژول | حساب کاربری |
| هدف آموزشی | تشخیص دستگاه جاری و سایر نشست‌های حساب |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | صاحب حساب آزمایشی |
| سطح | ساده |
| زمان هدف | 45 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile → نشست‌های فعال |
| پیش‌نیاز | یک نشست دوم فقط برای همین حساب آزمایشی از قبل ایجاد شده باشد؛ اطلاعات IP و دستگاه‌های واقعی در قاب انتشار نباشد. |
| نتیجهٔ یادگیری | تشخیص دستگاه جاری و سایر نشست‌های حساب |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart:43](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart#L43)؛ [lib/features/auth/repositories/dio_auth_repository.dart:28](../faro-flutter/lib/features/auth/repositories/dio_auth_repository.dart#L28)

### B آماده‌سازی محیط ضبط

با نقش «صاحب حساب آزمایشی» وارد محیط آموزشی شوید. یک نشست دوم فقط برای همین حساب آزمایشی از قبل ایجاد شده باشد؛ اطلاعات IP و دستگاه‌های واقعی در قاب انتشار نباشد.

وضعیت آغاز: صفحهٔ حساب باز باشد؛ کنترل «نشست‌ها در کارت حساب» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: نشست دوم آزمایشی را باز نگه دارید؛ هیچ نشست واقعی وارد قاب نشود.

خطاها و شرط توقف: این ویدیو مشاهده است؛ پایان نشست در برداشت اجرا نمی‌شود. اگر هیچ نشست دیگری وجود ندارد، وضعیت خالی «دستگاه متصل دیگری وجود ندارد» را جداگانه نمایش دهید؛ نشست جعلی نسازید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| نشست جاری | برنامهٔ ضبط روی ویندوز | باید با برچسب این دستگاه نمایش داده شود. |
| نشست دوم | مرورگر آزمون | پیش از ضبط باز شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب | نشست‌ها در کارت حساب | کلیک | پنجرهٔ پروفایل در زبانهٔ نشست‌های فعال باز می‌شود. |
| 2 | نشست‌های فعال | نشست و دستگاه فعلی | مکث | دستگاه جاری با برچسب این دستگاه دیده می‌شود. |
| 3 | نشست‌های فعال | سایر دستگاه‌های متصل | اسکرول محدود؛ «مرورگر آزمون» را وارد کنید | نشست دوم و آخرین فعالیتش دیده می‌شوند. |
| 4 | ردیف نشست دوم | خروج از نشست | اشارهٔ موس بدون کلیک | کنترل پایان‌دادن نشست مشخص می‌شود؛ هیچ نشستی بسته نمی‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 7–15 ثانیه | صفحهٔ حساب | نشست‌ها در کارت حساب | کلیک | — | پنجرهٔ پروفایل در زبانهٔ نشست‌های فعال باز می‌شود. | دکمهٔ نشست‌ها در کارت حساب | از کارت حساب، نشست‌ها رو باز می‌کنیم. |
| 2 · 15–23 ثانیه | نشست‌های فعال | نشست و دستگاه فعلی | مکث | — | دستگاه جاری با برچسب این دستگاه دیده می‌شود. | کارت نشست جاری | این کارت، دستگاهیه که همین حالا باهاش وارد شدیم. |
| 3 · 23–30 ثانیه | نشست‌های فعال | سایر دستگاه‌های متصل | اسکرول محدود | مرورگر آزمون | نشست دوم و آخرین فعالیتش دیده می‌شوند. | ردیف نشست آزمایشی | پایین‌تر، بقیهٔ دستگاه‌ها و زمان آخرین فعالیتشون رو می‌بینیم. |
| 4 · 30–37 ثانیه | ردیف نشست دوم | خروج از نشست | اشارهٔ موس بدون کلیک | — | کنترل پایان‌دادن نشست مشخص می‌شود؛ هیچ نشستی بسته نمی‌شود. | دکمهٔ ردیف | برای بستن یک اتصال، گزینهٔ خروج از نشست هم اینجا قرار داره. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «یادت نیست حسابت روی کدوم دستگاه باز مونده؟»

معرفی مسئله از 4 تا 7 ثانیه: «دستگاه فعلی و اتصال دوم حساب رو بررسی می‌کنیم.»

آموزش عملی از 7 تا 37 ثانیه:

«از کارت حساب، نشست‌ها رو باز می‌کنیم. این کارت، دستگاهیه که همین حالا باهاش وارد شدیم. پایین‌تر، بقیهٔ دستگاه‌ها و زمان آخرین فعالیتشون رو می‌بینیم. برای بستن یک اتصال، گزینهٔ خروج از نشست هم اینجا قرار داره.»

نمایش نتیجه از 37 تا 42 ثانیه: «حالا می‌تونیم دستگاه فعلی رو از اتصال‌های دیگه تشخیص بدیم.»

پایان از 42 تا 45 ثانیه: «نشست ناشناس رو بررسی کن و بعد دربارهٔ بستن اون تصمیم بگیر.»

متن حدود 76 واژه دارد؛ برآورد 1.69 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب | متن روی تصویر: حسابت روی چه دستگاه‌هایی بازه؟؛ هوک همزمان خوانده شود. |
| 4–7 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نشست‌ها در کارت حساب؛ قبل از کلیک مکث کوتاه. |
| 7–37 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی نشست و دستگاه فعلی نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 37–42 | نمای نهایی از برای بستن یک اتصال، گزینهٔ خروج از نشست هم اینجا قرار داره. | موس از روی متن کنار برود؛ کنترل پایان‌دادن نشست مشخص می‌شود؛ هیچ نشستی بسته نمی‌شود. |
| 42–45 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نشست‌ها در کارت حساب» و نتیجهٔ «برای بستن یک اتصال، گزینهٔ خروج از نشست هم اینجا قرار داره.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب» و کنترل «نشست‌ها در کارت حساب» در اجرای واقعی وجود دارند.
- [ ] نقش «صاحب حساب آزمایشی» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: کنترل پایان‌دادن نشست مشخص می‌شود؛ هیچ نشستی بسته نمی‌شود.
- [ ] شرط‌های توقف بررسی شدند: این ویدیو مشاهده است؛ پایان نشست در برداشت اجرا نمی‌شود. اگر هیچ نشست دیگری وجود ندارد، وضعیت خالی «دستگاه متصل دیگری وجود ندارد» را جداگانه نمایش دهید؛ نشست جعلی نسازید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: تشخیص دستگاه جاری و سایر نشست‌های حساب.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 45 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V05 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V06 ساخت فضای کاری

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ساخت فضای کاری |
| عنوان انتشار | برای تیمت یک فضای کاری بساز |
| ماژول | فضای کاری |
| هدف آموزشی | ایجاد فضای کاری مستقل با عنوان و توضیح نمایشی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | حساب مجاز به ایجاد فضای کاری در سرور |
| سطح | ساده |
| زمان هدف | 60 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /ai → منوی ایجاد آیتم |
| پیش‌نیاز | حساب تیم ضبط و دسترسی شبکه؛ نام مشابه در محیط آموزشی وجود نداشته باشد. هیچ همکاری در این برداشت دعوت نشود. |
| نتیجهٔ یادگیری | ایجاد فضای کاری مستقل با عنوان و توضیح نمایشی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart:169](../faro-flutter/lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart#L169)؛ [lib/app/shell/views/widgets/sidebar/sidebar_create_dropdown.dart:184](../faro-flutter/lib/app/shell/views/widgets/sidebar/sidebar_create_dropdown.dart#L184)؛ [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74)

### B آماده‌سازی محیط ضبط

با نقش «حساب مجاز به ایجاد فضای کاری در سرور» وارد محیط آموزشی شوید. حساب تیم ضبط و دسترسی شبکه؛ نام مشابه در محیط آموزشی وجود نداشته باشد. هیچ همکاری در این برداشت دعوت نشود.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «فلش کنار دکمهٔ اصلی ایجاد در نوار کناری» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: برای برداشت مجدد فضای مصرفی تازه آماده کنید؛ حذف فضای مشترک برای reset انجام نشود.

خطاها و شرط توقف: فیلد شناسه در UI هست اما _handleCreate مقدار slug را ارسال نمی‌کند؛ از آموزش تعیین URL اختصاصی خودداری شود. تغییر خودکار فضای فعال فقط پس از مشاهدهٔ نتیجه تأیید شود؛ برای ادامه در صورت لزوم V02 اجرا شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| عنوان فضای کاری | استودیو آموزش فارو | غیرخالی |
| توضیح | محیط نمونه برای تولید آموزش‌های فارو | اختیاری؛ به instructions ارسال می‌شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | فلش کنار دکمهٔ اصلی ایجاد در نوار کناری | کلیک | منوی ایجاد آیتم باز می‌شود. |
| 2 | منوی ایجاد | فضای کاری جدید | کلیک | پنجرهٔ ایجاد فضای کاری جدید باز می‌شود. |
| 3 | ایجاد فضای کاری جدید | عنوان فضای کاری (مثلاً: تیم طراحی، توسعه محصول...) | تایپ؛ «استودیو آموزش فارو» را وارد کنید | عنوان در فرم قرار می‌گیرد. |
| 4 | همان پنجره | توضیح مختصری درباره فضای کاری و اهداف تیم بنویسید... | تایپ؛ «محیط نمونه برای تولید آموزش‌های فارو» را وارد کنید | توضیح فرم تکمیل می‌شود. |
| 5 | همان پنجره | ایجاد فضای کاری | کلیک و انتظار پاسخ | پنجره بسته و اعلان ایجاد با نام فضا دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | صفحهٔ هوش مصنوعی | فلش کنار دکمهٔ اصلی ایجاد در نوار کناری | کلیک | — | منوی ایجاد آیتم باز می‌شود. | بالای نوار کناری | فلش کنار دکمهٔ ایجاد رو می‌زنیم تا گزینه‌های بیشتر رو ببینیم. |
| 2 · 17–26 ثانیه | منوی ایجاد | فضای کاری جدید | کلیک | — | پنجرهٔ ایجاد فضای کاری جدید باز می‌شود. | گزینه و عنوان پنجره | فضای کاری جدید رو انتخاب می‌کنیم. |
| 3 · 26–34 ثانیه | ایجاد فضای کاری جدید | عنوان فضای کاری (مثلاً: تیم طراحی، توسعه محصول...) | تایپ | استودیو آموزش فارو | عنوان در فرم قرار می‌گیرد. | فیلد عنوان | اسم مشخصی برای تیم می‌نویسیم: استودیو آموزش فارو. |
| 4 · 34–42 ثانیه | همان پنجره | توضیح مختصری درباره فضای کاری و اهداف تیم بنویسید... | تایپ | محیط نمونه برای تولید آموزش‌های فارو | توضیح فرم تکمیل می‌شود. | فیلد توضیح | یک توضیح کوتاه هم دربارهٔ کاربرد این فضا اضافه می‌کنیم. |
| 5 · 42–50 ثانیه | همان پنجره | ایجاد فضای کاری | کلیک و انتظار پاسخ | — | پنجره بسته و اعلان ایجاد با نام فضا دیده می‌شود. | دکمه و اعلان | ایجاد فضای کاری رو می‌زنیم؛ نتیجه رو از پیام موفقیت بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «وقتی یک تیم تازه شروع می‌شه، اطلاعاتش رو کجا جمع کنیم؟»

معرفی مسئله از 4 تا 8 ثانیه: «یک فضای آموزشی تازه برای تیم می‌سازیم.»

آموزش عملی از 8 تا 50 ثانیه:

«فلش کنار دکمهٔ ایجاد رو می‌زنیم تا گزینه‌های بیشتر رو ببینیم. فضای کاری جدید رو انتخاب می‌کنیم. اسم مشخصی برای تیم می‌نویسیم: استودیو آموزش فارو. یک توضیح کوتاه هم دربارهٔ کاربرد این فضا اضافه می‌کنیم. ایجاد فضای کاری رو می‌زنیم؛ نتیجه رو از پیام موفقیت بررسی می‌کنیم.»

نمایش نتیجه از 50 تا 56 ثانیه: «فضای کاری جدید ساخته شد.»

پایان از 56 تا 60 ثانیه: «در آموزش بعد، دعوت همکارها رو می‌بینیم.»

متن حدود 77 واژه دارد؛ برآورد 1.28 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: برای تیمت یک فضای کاری بساز؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا فلش کنار دکمهٔ اصلی ایجاد در نوار کناری؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی فضای کاری جدید نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از ایجاد فضای کاری رو می‌زنیم؛ نتیجه رو از پیام موفقیت بررسی می‌کنیم. | موس از روی متن کنار برود؛ پنجره بسته و اعلان ایجاد با نام فضا دیده می‌شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «فلش کنار دکمهٔ اصلی ایجاد در نوار کناری» و نتیجهٔ «ایجاد فضای کاری رو می‌زنیم؛ نتیجه رو از پیام موفقیت بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «فلش کنار دکمهٔ اصلی ایجاد در نوار کناری» در اجرای واقعی وجود دارند.
- [ ] نقش «حساب مجاز به ایجاد فضای کاری در سرور» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پنجره بسته و اعلان ایجاد با نام فضا دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: فیلد شناسه در UI هست اما _handleCreate مقدار slug را ارسال نمی‌کند؛ از آموزش تعیین URL اختصاصی خودداری شود. تغییر خودکار فضای فعال فقط پس از مشاهدهٔ نتیجه تأیید شود؛ برای ادامه در صورت لزوم V02 اجرا شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ایجاد فضای کاری مستقل با عنوان و توضیح نمایشی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V06 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V07 دعوت همکار به فضای کاری

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | دعوت همکار به فضای کاری |
| عنوان انتشار | همکارت رو به فضای درست دعوت کن |
| ماژول | فضای کاری |
| هدف آموزشی | ارسال دعوت به حساب آزمایشی موجود از بخش اعضا |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر با canManageMembers |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /ai → منوی فضای کاری → اعضا و دسترسی‌ها |
| پیش‌نیاز | فضای «استودیو آموزش فارو» فعال؛ حساب آزمون «سارا نمونه» با شناسهٔ آموزشی sara_demo از قبل موجود و هنوز عضو نباشد؛ دعوت فقط در محیط آموزشی. |
| نتیجهٔ یادگیری | ارسال دعوت به حساب آزمایشی موجود از بخش اعضا |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324)؛ [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart:267](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart#L267)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35)

### B آماده‌سازی محیط ضبط

با نقش «کاربر با canManageMembers» وارد محیط آموزشی شوید. فضای «استودیو آموزش فارو» فعال؛ حساب آزمون «سارا نمونه» با شناسهٔ آموزشی sara_demo از قبل موجود و هنوز عضو نباشد؛ دعوت فقط در محیط آموزشی.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «نام فضای کاری» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: از یک حساب آموزشی هنوز دعوت‌نشده استفاده کنید یا وضعیت دعوت را توسط مسئول محیط بازتنظیم کنید.

خطاها و شرط توقف: دعوت به معنی عضویت فعال نیست. دعوت تکراری، شناسهٔ ناموجود و نداشتن مجوز باید برداشت را متوقف کنند. وضعیت pending ممکن است برای کاربران غیرمدیر نمایش داده نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| شناسه همکار | sara_demo | حساب تحت اختیار تیم که از قبل ثبت شده است. |
| نقش | عضو | نقش پیش‌فرض را پیش از ارسال بررسی کنید. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | نام فضای کاری | کلیک؛ «استودیو آموزش فارو» را وارد کنید | منوی فضای کاری باز می‌شود. |
| 2 | منوی فضای کاری | اعضا و دسترسی‌ها | کلیک | پنجرهٔ مدیریت روی بخش اعضا باز می‌شود. |
| 3 | اعضا | شماره تلفن، ایمیل یا نام کاربری... | تایپ و انتخاب نتیجهٔ دایرکتوری؛ «sara_demo» را وارد کنید | حساب سارا نمونه برای دعوت انتخاب می‌شود. |
| 4 | فرم دعوت | نقش کنار دعوت | بررسی و انتخاب عضو در صورت نیاز؛ «عضو» را وارد کنید | نقش دعوت عضو است. |
| 5 | فرم دعوت | دعوت | کلیک | درخواست ارسال و فهرست یا وضعیت در انتظار تأیید به‌روز می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ هوش مصنوعی | نام فضای کاری | کلیک | استودیو آموزش فارو | منوی فضای کاری باز می‌شود. | عنوان فضا | اول مطمئن می‌شیم فضای استودیو آموزش فارو فعاله. |
| 2 · 18–28 ثانیه | منوی فضای کاری | اعضا و دسترسی‌ها | کلیک | — | پنجرهٔ مدیریت روی بخش اعضا باز می‌شود. | گزینه و عنوان اعضا | از منوی فضا، اعضا و دسترسی‌ها رو باز می‌کنیم. |
| 3 · 28–37 ثانیه | اعضا | شماره تلفن، ایمیل یا نام کاربری... | تایپ و انتخاب نتیجهٔ دایرکتوری | sara_demo | حساب سارا نمونه برای دعوت انتخاب می‌شود. | فیلد و هویت نتیجه | نام کاربری حساب آموزشی سارا رو جست‌وجو و نتیجه رو انتخاب می‌کنیم. |
| 4 · 37–46 ثانیه | فرم دعوت | نقش کنار دعوت | بررسی و انتخاب عضو در صورت نیاز | عضو | نقش دعوت عضو است. | کنترل نقش | نقش رو روی عضو نگه می‌داریم. |
| 5 · 46–55 ثانیه | فرم دعوت | دعوت | کلیک | — | درخواست ارسال و فهرست یا وضعیت در انتظار تأیید به‌روز می‌شود. | دکمه و ردیف دعوت | دعوت رو ارسال می‌کنیم؛ پذیرش اون باید از حساب سارا انجام بشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «فضای کاری آماده‌ست؛ حالا نوبت اضافه‌کردن همکاره.»

معرفی مسئله از 4 تا 8 ثانیه: «سارا رو با نقش عضو به فضای آموزشی دعوت می‌کنیم.»

آموزش عملی از 8 تا 55 ثانیه:

«اول مطمئن می‌شیم فضای استودیو آموزش فارو فعاله. از منوی فضا، اعضا و دسترسی‌ها رو باز می‌کنیم. نام کاربری حساب آموزشی سارا رو جست‌وجو و نتیجه رو انتخاب می‌کنیم. نقش رو روی عضو نگه می‌داریم. دعوت رو ارسال می‌کنیم؛ پذیرش اون باید از حساب سارا انجام بشه.»

نمایش نتیجه از 55 تا 61 ثانیه: «دعوت ارسال شد؛ عضویت نهایی به پذیرش همکار بستگی داره.»

پایان از 61 تا 65 ثانیه: «همیشه قبل از دعوت، هویت و نقش رو بررسی کن.»

متن حدود 84 واژه دارد؛ برآورد 1.29 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: همکارت رو به فضای درست دعوت کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نام فضای کاری؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی اعضا و دسترسی‌ها نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از دعوت رو ارسال می‌کنیم؛ پذیرش اون باید از حساب سارا انجام بشه. | موس از روی متن کنار برود؛ درخواست ارسال و فهرست یا وضعیت در انتظار تأیید به‌روز می‌شود. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نام فضای کاری» و نتیجهٔ «دعوت رو ارسال می‌کنیم؛ پذیرش اون باید از حساب سارا انجام بشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «نام فضای کاری» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر با canManageMembers» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: درخواست ارسال و فهرست یا وضعیت در انتظار تأیید به‌روز می‌شود.
- [ ] شرط‌های توقف بررسی شدند: دعوت به معنی عضویت فعال نیست. دعوت تکراری، شناسهٔ ناموجود و نداشتن مجوز باید برداشت را متوقف کنند. وضعیت pending ممکن است برای کاربران غیرمدیر نمایش داده نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ارسال دعوت به حساب آزمایشی موجود از بخش اعضا.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V07 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V08 ایجاد پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ایجاد پروژه |
| عنوان انتشار | کارهای یک هدف رو داخل یک پروژه جمع کن |
| ماژول | پروژه‌ها |
| هدف آموزشی | ایجاد پروژه با عنوان و توضیحات در فضای کاری انتخاب‌شده |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر با canManageProjects |
| سطح | ساده |
| زمان هدف | 60 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /profile?tab=projects → پروژه‌ها |
| پیش‌نیاز | فضای استودیو آموزش فارو فعال؛ پروژهٔ «انتشار پاییز» از قبل وجود نداشته باشد. فرم مستقل از ویدیوهای قبل قابل آماده‌سازی است. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| نتیجهٔ یادگیری | ایجاد پروژه با عنوان و توضیحات در فضای کاری انتخاب‌شده |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634)؛ [lib/features/projects/views/widgets/create_project_dialog.dart:94](../faro-flutter/lib/features/projects/views/widgets/create_project_dialog.dart#L94)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13)؛ [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40)

### B آماده‌سازی محیط ضبط

با نقش «کاربر با canManageProjects» وارد محیط آموزشی شوید. فضای استودیو آموزش فارو فعال؛ پروژهٔ «انتشار پاییز» از قبل وجود نداشته باشد. فرم مستقل از ویدیوهای قبل قابل آماده‌سازی است. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد.

وضعیت آغاز: صفحهٔ حساب → زبانهٔ پروژه‌ها باز باشد؛ کنترل «دکمهٔ مثبت با tooltip ایجاد پروژه» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: نام پروژهٔ هدف در محیط برداشت موجود نباشد؛ پروژهٔ مشترک سناریوهای دیگر حذف نشود.

خطاها و شرط توقف: عنوان فارسی دقیق کنترل‌های فرم با کلیدهای projects.create_dialog در پیوست کنترل‌ها ثبت شده است. گزینهٔ بخش‌ها و جریان‌های کاری در این فرم «بزودی» است و نباید فعال نشان داده شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| نام پروژه | انتشار پاییز | غیرخالی |
| توضیحات | هماهنگی محتوای آموزشی نسخه پاییز | اختیاری |
| رنگ و آیکون | پیش‌فرض | برای برداشت پایه تغییر ندهید. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب → زبانهٔ پروژه‌ها | دکمهٔ مثبت با tooltip ایجاد پروژه | کلیک روی مثبت کنار فیلترهای پروژه | فرم ایجاد پروژه جدید باز می‌شود. |
| 2 | فرم ساخت پروژه | فیلد نام پروژه | تایپ؛ «انتشار پاییز» را وارد کنید | نام وارد می‌شود. |
| 3 | فرم ساخت پروژه | فیلد توضیحات پروژه | تایپ؛ «هماهنگی محتوای آموزشی نسخه پاییز» را وارد کنید | توضیحات آمادهٔ ارسال است. |
| 4 | پایین فرم | ایجاد پروژه | کلیک | درخواست ساخت ارسال و در موفقیت پنجره بسته می‌شود. |
| 5 | صفحهٔ حساب | ردیف انتشار پاییز | مکث و سپس کلیک روی عنوان | پروژه در فهرست دیده می‌شود و انتخاب آن ممکن است نمای پروژه را باز کند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | صفحهٔ حساب → زبانهٔ پروژه‌ها | دکمهٔ مثبت با tooltip ایجاد پروژه | کلیک روی مثبت کنار فیلترهای پروژه | — | فرم ایجاد پروژه جدید باز می‌شود. | مثبت و tooltip ایجاد پروژه | از تب پروژه‌ها، دکمهٔ ایجاد پروژه رو می‌زنیم. |
| 2 · 17–26 ثانیه | فرم ساخت پروژه | فیلد نام پروژه | تایپ | انتشار پاییز | نام وارد می‌شود. | عنوان فرم | اسم پروژه رو انتشار پاییز می‌گذاریم. |
| 3 · 26–34 ثانیه | فرم ساخت پروژه | فیلد توضیحات پروژه | تایپ | هماهنگی محتوای آموزشی نسخه پاییز | توضیحات آمادهٔ ارسال است. | دو فیلد اصلی | در توضیحات مشخص می‌کنیم این پروژه برای چه کاریه. |
| 4 · 34–42 ثانیه | پایین فرم | ایجاد پروژه | کلیک | — | درخواست ساخت ارسال و در موفقیت پنجره بسته می‌شود. | دکمهٔ ثبت | پروژه رو ثبت می‌کنیم و منتظر تأیید می‌مونیم. |
| 5 · 42–50 ثانیه | صفحهٔ حساب | ردیف انتشار پاییز | مکث و سپس کلیک روی عنوان | — | پروژه در فهرست دیده می‌شود و انتخاب آن ممکن است نمای پروژه را باز کند. | کارت تازه | پروژهٔ جدید در فهرست قرار گرفته و آمادهٔ ادامهٔ کاره. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «برای یک هدف مشترک، از یک پروژهٔ مشخص شروع کنیم.»

معرفی مسئله از 4 تا 8 ثانیه: «یک پروژهٔ نمونه برای انتشار پاییز می‌سازیم.»

آموزش عملی از 8 تا 50 ثانیه:

«از تب پروژه‌ها، دکمهٔ ایجاد پروژه رو می‌زنیم. اسم پروژه رو انتشار پاییز می‌گذاریم. در توضیحات مشخص می‌کنیم این پروژه برای چه کاریه. پروژه رو ثبت می‌کنیم و منتظر تأیید می‌مونیم. پروژهٔ جدید در فهرست قرار گرفته و آمادهٔ ادامهٔ کاره.»

نمایش نتیجه از 50 تا 56 ثانیه: «پروژهٔ انتشار پاییز ساخته شد.»

پایان از 56 تا 60 ثانیه: «حالا می‌تونیم اعضا و وظایف این پروژه رو تنظیم کنیم.»

متن حدود 73 واژه دارد؛ برآورد 1.22 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب → زبانهٔ پروژه‌ها | متن روی تصویر: کارهای یک هدف رو داخل یک پروژه جمع کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا دکمهٔ مثبت با tooltip ایجاد پروژه؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی فیلد نام پروژه نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از پروژهٔ جدید در فهرست قرار گرفته و آمادهٔ ادامهٔ کاره. | موس از روی متن کنار برود؛ پروژه در فهرست دیده می‌شود و انتخاب آن ممکن است نمای پروژه را باز کند. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «دکمهٔ مثبت با tooltip ایجاد پروژه» و نتیجهٔ «پروژهٔ جدید در فهرست قرار گرفته و آمادهٔ ادامهٔ کاره.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب → زبانهٔ پروژه‌ها» و کنترل «دکمهٔ مثبت با tooltip ایجاد پروژه» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر با canManageProjects» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پروژه در فهرست دیده می‌شود و انتخاب آن ممکن است نمای پروژه را باز کند.
- [ ] شرط‌های توقف بررسی شدند: عنوان فارسی دقیق کنترل‌های فرم با کلیدهای projects.create_dialog در پیوست کنترل‌ها ثبت شده است. گزینهٔ بخش‌ها و جریان‌های کاری در این فرم «بزودی» است و نباید فعال نشان داده شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ایجاد پروژه با عنوان و توضیحات در فضای کاری انتخاب‌شده.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V08 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V09 سنجاق و پیداکردن پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | سنجاق و پیداکردن پروژه |
| عنوان انتشار | پروژهٔ پرکارت همیشه دم دست باشه |
| ماژول | پروژه‌ها |
| هدف آموزشی | سنجاق‌کردن پروژه و استفاده از فیلتر سنجاق‌شده‌ها |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو دارای دسترسی به پروژه |
| سطح | ساده |
| زمان هدف | 45 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile |
| پیش‌نیاز | پروژهٔ انتشار پاییز موجود و سنجاق‌نشده؛ فیلتر فهرست روی همه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| نتیجهٔ یادگیری | سنجاق‌کردن پروژه و استفاده از فیلتر سنجاق‌شده‌ها |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224)؛ [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634)؛ [lib/features/projects/views/projects_view.dart:56](../faro-flutter/lib/features/projects/views/projects_view.dart#L56)؛ [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643)

### B آماده‌سازی محیط ضبط

با نقش «عضو دارای دسترسی به پروژه» وارد محیط آموزشی شوید. پروژهٔ انتشار پاییز موجود و سنجاق‌نشده؛ فیلتر فهرست روی همه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد.

وضعیت آغاز: صفحهٔ حساب باز باشد؛ کنترل «منوی سه‌نقطهٔ ردیف انتشار پاییز» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: سنجاق پروژه را بردارید و فیلتر همه را فعال کنید.

خطاها و شرط توقف: موفقیت را با باقی‌ماندن کارت زیر فیلتر بررسی کنید؛ فقط تغییر ظاهری آیکون کافی نیست. در حالت آفلاین عملیات ممکن است متوقف شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| پروژه | انتشار پاییز | در فهرست قابل دسترس باشد. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب | منوی سه‌نقطهٔ ردیف انتشار پاییز | کلیک | منوی پروژه باز می‌شود. |
| 2 | منوی پروژه | سنجاق کردن | کلیک | وضعیت سنجاق تغییر می‌کند. |
| 3 | هدر فهرست پروژه‌ها | سنجاق‌شده‌ها | کلیک | فقط پروژه‌های سنجاق‌شده نمایش داده می‌شوند. |
| 4 | نوار کناری | پروژه‌های سنجاق‌شده | اشاره و مکث؛ «انتشار پاییز» را وارد کنید | پروژه در فهرست سنجاق‌شده‌ها قابل مشاهده است. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 7–15 ثانیه | صفحهٔ حساب | منوی سه‌نقطهٔ ردیف انتشار پاییز | کلیک | — | منوی پروژه باز می‌شود. | کارت پروژه | منوی سه‌نقطهٔ پروژهٔ پرکارمون رو باز می‌کنیم. |
| 2 · 15–23 ثانیه | منوی پروژه | سنجاق کردن | کلیک | — | وضعیت سنجاق تغییر می‌کند. | گزینهٔ سنجاق | سنجاق کردن رو انتخاب می‌کنیم. |
| 3 · 23–30 ثانیه | هدر فهرست پروژه‌ها | سنجاق‌شده‌ها | کلیک | — | فقط پروژه‌های سنجاق‌شده نمایش داده می‌شوند. | فیلتر و کارت نتیجه | با فیلتر سنجاق‌شده‌ها، همین پروژه‌ها رو یکجا می‌بینیم. |
| 4 · 30–37 ثانیه | نوار کناری | پروژه‌های سنجاق‌شده | اشاره و مکث | انتشار پاییز | پروژه در فهرست سنجاق‌شده‌ها قابل مشاهده است. | نوار کناری و کارت | پروژه از نوار کناری هم سریع‌تر در دسترس قرار می‌گیره. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «هر بار بین پروژه‌ها دنبال همون یکی می‌گردی؟»

معرفی مسئله از 4 تا 7 ثانیه: «پروژهٔ انتشار پاییز رو سنجاق می‌کنیم.»

آموزش عملی از 7 تا 37 ثانیه:

«منوی سه‌نقطهٔ پروژهٔ پرکارمون رو باز می‌کنیم. سنجاق کردن رو انتخاب می‌کنیم. با فیلتر سنجاق‌شده‌ها، همین پروژه‌ها رو یکجا می‌بینیم. پروژه از نوار کناری هم سریع‌تر در دسترس قرار می‌گیره.»

نمایش نتیجه از 37 تا 42 ثانیه: «پروژهٔ پرکارمون سنجاق شده و راحت‌تر پیدا می‌شه.»

پایان از 42 تا 45 ثانیه: «برای برداشتنش، از همون منو برداشتن سنجاق رو بزن.»

متن حدود 61 واژه دارد؛ برآورد 1.36 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب | متن روی تصویر: پروژهٔ پرکارت همیشه دم دست باشه؛ هوک همزمان خوانده شود. |
| 4–7 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا منوی سه‌نقطهٔ ردیف انتشار پاییز؛ قبل از کلیک مکث کوتاه. |
| 7–37 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی سنجاق کردن نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 37–42 | نمای نهایی از پروژه از نوار کناری هم سریع‌تر در دسترس قرار می‌گیره. | موس از روی متن کنار برود؛ پروژه در فهرست سنجاق‌شده‌ها قابل مشاهده است. |
| 42–45 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «منوی سه‌نقطهٔ ردیف انتشار پاییز» و نتیجهٔ «پروژه از نوار کناری هم سریع‌تر در دسترس قرار می‌گیره.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب» و کنترل «منوی سه‌نقطهٔ ردیف انتشار پاییز» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو دارای دسترسی به پروژه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پروژه در فهرست سنجاق‌شده‌ها قابل مشاهده است.
- [ ] شرط‌های توقف بررسی شدند: موفقیت را با باقی‌ماندن کارت زیر فیلتر بررسی کنید؛ فقط تغییر ظاهری آیکون کافی نیست. در حالت آفلاین عملیات ممکن است متوقف شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: سنجاق‌کردن پروژه و استفاده از فیلتر سنجاق‌شده‌ها.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 45 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V09 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V10 دعوت عضو به پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | دعوت عضو به پروژه |
| عنوان انتشار | فضای کاری مشترک، دسترسی پروژهٔ مشخص |
| ماژول | پروژه‌ها |
| هدف آموزشی | دعوت عضو مشخص به پروژه و تشخیص تفاوت دسترسی پروژه و فضا |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | مدیر یا مالک پروژه با مجوز لازم |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile → منوی پروژه → اشتراک‌گذاری |
| پیش‌نیاز | سارا نمونه عضو فعال فضای کاری باشد، ولی هنوز در پروژهٔ انتشار پاییز عضو نباشد؛ حساب ضبط مدیر پروژه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| نتیجهٔ یادگیری | دعوت عضو مشخص به پروژه و تشخیص تفاوت دسترسی پروژه و فضا |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/share_project_dialog.dart:63](../faro-flutter/lib/features/projects/views/widgets/share_project_dialog.dart#L63)؛ [lib/app/shell/views/widgets/project_header/project_share_dropdown.dart:322](../faro-flutter/lib/app/shell/views/widgets/project_header/project_share_dropdown.dart#L322)؛ [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40)

### B آماده‌سازی محیط ضبط

با نقش «مدیر یا مالک پروژه با مجوز لازم» وارد محیط آموزشی شوید. سارا نمونه عضو فعال فضای کاری باشد، ولی هنوز در پروژهٔ انتشار پاییز عضو نباشد؛ حساب ضبط مدیر پروژه باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد.

وضعیت آغاز: صفحهٔ حساب باز باشد؛ کنترل «منوی سه‌نقطهٔ انتشار پاییز» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: عضو نمونه هنوز عضو پروژه نباشد؛ عضویت فضای کاری او فعال بماند.

خطاها و شرط توقف: کپی لینک به‌تنهایی مجوز دسترسی ایجاد نمی‌کند. فهرست یا سرور می‌تواند دعوت را رد کند. مالک یا عضو جاری را موضوع آموزش حذف یا تغییر نقش قرار ندهید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| عضو | sara_demo | حساب سارا نمونه در دایرکتوری |
| عنوان شغلی | بازبین آموزش | اختیاری |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب | منوی سه‌نقطهٔ انتشار پاییز | کلیک | منوی پروژه باز می‌شود. |
| 2 | منوی پروژه | اشتراک‌گذاری | کلیک | پنجرهٔ اعضای پروژه باز می‌شود. |
| 3 | اعضای پروژه | با نام، تلفن همراه، ایمیل و آیدی... | تایپ و انتخاب نتیجه؛ «sara_demo» را وارد کنید | همکار برای دعوت انتخاب می‌شود. |
| 4 | اعضای پروژه | عنوان شغلی (اختیاری) | تایپ؛ «بازبین آموزش» را وارد کنید | عنوان شغلی درج می‌شود. |
| 5 | اعضای پروژه | دعوت | کلیک | اعلان دعوت موفق یا ردیف عضو به‌روز می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ حساب | منوی سه‌نقطهٔ انتشار پاییز | کلیک | — | منوی پروژه باز می‌شود. | کارت پروژه | منوی پروژهٔ انتشار پاییز رو باز می‌کنیم. |
| 2 · 18–28 ثانیه | منوی پروژه | اشتراک‌گذاری | کلیک | — | پنجرهٔ اعضای پروژه باز می‌شود. | عنوان اعضای پروژه | اشتراک‌گذاری رو می‌زنیم تا اعضای همین پروژه رو ببینیم. |
| 3 · 28–37 ثانیه | اعضای پروژه | با نام، تلفن همراه، ایمیل و آیدی... | تایپ و انتخاب نتیجه | sara_demo | همکار برای دعوت انتخاب می‌شود. | فیلد و حساب انتخاب‌شده | حساب سارا رو جست‌وجو و از فهرست انتخاب می‌کنیم. |
| 4 · 37–46 ثانیه | اعضای پروژه | عنوان شغلی (اختیاری) | تایپ | بازبین آموزش | عنوان شغلی درج می‌شود. | فیلد عنوان | عنوان شغلی رو بازبین آموزش می‌گذاریم. |
| 5 · 46–55 ثانیه | اعضای پروژه | دعوت | کلیک | — | اعلان دعوت موفق یا ردیف عضو به‌روز می‌شود. | دعوت و فهرست اعضا | دعوت رو می‌زنیم و نتیجه رو در فهرست اعضای پروژه بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «عضو تیم بودن، همیشه به معنی عضویت در هر پروژه نیست.»

معرفی مسئله از 4 تا 8 ثانیه: «عضویت سارا در همین پروژه رو تنظیم می‌کنیم.»

آموزش عملی از 8 تا 55 ثانیه:

«منوی پروژهٔ انتشار پاییز رو باز می‌کنیم. اشتراک‌گذاری رو می‌زنیم تا اعضای همین پروژه رو ببینیم. حساب سارا رو جست‌وجو و از فهرست انتخاب می‌کنیم. عنوان شغلی رو بازبین آموزش می‌گذاریم. دعوت رو می‌زنیم و نتیجه رو در فهرست اعضای پروژه بررسی می‌کنیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «دسترسی سارا به پروژه از همین پنجره مدیریت می‌شه.»

پایان از 61 تا 65 ثانیه: «قبل از دعوت، مطمئن شو پروژهٔ درست رو باز کردی.»

متن حدود 81 واژه دارد؛ برآورد 1.25 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب | متن روی تصویر: فضای کاری مشترک، دسترسی پروژهٔ مشخص؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا منوی سه‌نقطهٔ انتشار پاییز؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی اشتراک‌گذاری نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از دعوت رو می‌زنیم و نتیجه رو در فهرست اعضای پروژه بررسی می‌کنیم. | موس از روی متن کنار برود؛ اعلان دعوت موفق یا ردیف عضو به‌روز می‌شود. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «منوی سه‌نقطهٔ انتشار پاییز» و نتیجهٔ «دعوت رو می‌زنیم و نتیجه رو در فهرست اعضای پروژه بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب» و کنترل «منوی سه‌نقطهٔ انتشار پاییز» در اجرای واقعی وجود دارند.
- [ ] نقش «مدیر یا مالک پروژه با مجوز لازم» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: اعلان دعوت موفق یا ردیف عضو به‌روز می‌شود.
- [ ] شرط‌های توقف بررسی شدند: کپی لینک به‌تنهایی مجوز دسترسی ایجاد نمی‌کند. فهرست یا سرور می‌تواند دعوت را رد کند. مالک یا عضو جاری را موضوع آموزش حذف یا تغییر نقش قرار ندهید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: دعوت عضو مشخص به پروژه و تشخیص تفاوت دسترسی پروژه و فضا.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V10 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V11 ویرایش مشخصات پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ویرایش مشخصات پروژه |
| عنوان انتشار | اسم و توضیح پروژه رو به‌روز کن |
| ماژول | پروژه‌ها |
| هدف آموزشی | تغییر توضیح پروژه بدون ساخت پروژهٔ تکراری |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | مدیر یا مالک پروژه با canManageProjects |
| سطح | ساده |
| زمان هدف | 55 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile → پروژه → تنظیمات |
| پیش‌نیاز | انتشار پاییز موجود؛ توضیح اولیه «هماهنگی محتوای آموزشی نسخه پاییز» باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| نتیجهٔ یادگیری | تغییر توضیح پروژه بدون ساخت پروژهٔ تکراری |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/projects/views/widgets/edit_project_dialog.dart:134](../faro-flutter/lib/features/projects/views/widgets/edit_project_dialog.dart#L134)؛ [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10)؛ [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13)؛ [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533)

### B آماده‌سازی محیط ضبط

با نقش «مدیر یا مالک پروژه با canManageProjects» وارد محیط آموزشی شوید. انتشار پاییز موجود؛ توضیح اولیه «هماهنگی محتوای آموزشی نسخه پاییز» باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد.

وضعیت آغاز: صفحهٔ حساب باز باشد؛ کنترل «منوی سه‌نقطهٔ انتشار پاییز» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: توضیح پروژهٔ کپی را به متن پایه برگردانید و تب اطلاعات کلی را باز نگه دارید.

خطاها و شرط توقف: فرم ممکن است برای مشاهده‌گر فقط خواندنی باشد. در صورت نبود مجوز برداشت متوقف شود. کنترل پیشرفتهٔ «بزودی» آموزش داده نشود. مسیر فعلی ProjectSettingsDropdown است؛ EditProjectDialog قدیمی مرجع کنترل‌های این برداشت نیست. پیام موفقیت قبل از پایان callback ممکن است دیده شود؛ بازخوانی سرور ضروری است.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| توضیحات جدید | تولید و بازبینی ویدیوهای آموزشی نسخه پاییز | نام پروژه تغییر نکند. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب | منوی سه‌نقطهٔ انتشار پاییز | کلیک | منوی کارت باز می‌شود. |
| 2 | منوی کارت | تنظیمات | کلیک | فرم تنظیمات یا ویرایش پروژه باز می‌شود. |
| 3 | تنظیمات پروژه | فیلد توضیحات | انتخاب متن و تایپ؛ «تولید و بازبینی ویدیوهای آموزشی نسخه پاییز» را وارد کنید | فرم دارای تغییر ذخیره‌نشده می‌شود. |
| 4 | تنظیمات پروژه | ذخیره تغییرات | کلیک | درخواست ویرایش موفق می‌شود و توضیح جدید برمی‌گردد. |
| 5 | کارت پروژه یا بازگشایی تنظیمات | توضیحات پروژه | بازگشایی و مکث | متن جدید همچنان موجود است. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | صفحهٔ حساب | منوی سه‌نقطهٔ انتشار پاییز | کلیک | — | منوی کارت باز می‌شود. | کارت | منوی پروژه رو باز می‌کنیم. |
| 2 · 16–24 ثانیه | منوی کارت | تنظیمات | کلیک | — | فرم تنظیمات یا ویرایش پروژه باز می‌شود. | منو و عنوان فرم | تنظیمات رو انتخاب می‌کنیم. |
| 3 · 24–31 ثانیه | تنظیمات پروژه | فیلد توضیحات | انتخاب متن و تایپ | تولید و بازبینی ویدیوهای آموزشی نسخه پاییز | فرم دارای تغییر ذخیره‌نشده می‌شود. | توضیح | توضیح پروژه رو با هدف فعلی تیم هماهنگ می‌کنیم. |
| 4 · 31–38 ثانیه | تنظیمات پروژه | ذخیره تغییرات | کلیک | — | درخواست ویرایش موفق می‌شود و توضیح جدید برمی‌گردد. | دکمه و اعلان | ذخیره تغییرات رو می‌زنیم. |
| 5 · 38–45 ثانیه | کارت پروژه یا بازگشایی تنظیمات | توضیحات پروژه | بازگشایی و مکث | — | متن جدید همچنان موجود است. | متن ثبت‌شده | دوباره بررسی می‌کنیم که توضیح جدید ثبت شده باشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «هدف پروژه تغییر کرده؟ لازم نیست پروژهٔ تازه‌ای بسازی.»

معرفی مسئله از 4 تا 8 ثانیه: «توضیح پروژه رو بدون ساختن پروژهٔ تازه تغییر می‌دیم.»

آموزش عملی از 8 تا 45 ثانیه:

«منوی پروژه رو باز می‌کنیم. تنظیمات رو انتخاب می‌کنیم. توضیح پروژه رو با هدف فعلی تیم هماهنگ می‌کنیم. ذخیره تغییرات رو می‌زنیم. دوباره بررسی می‌کنیم که توضیح جدید ثبت شده باشه.»

نمایش نتیجه از 45 تا 51 ثانیه: «توضیح پروژهٔ فعلی به‌روز شد.»

پایان از 51 تا 55 ثانیه: «اسم و ظاهر پروژه رو هم از همین فرم مدیریت کن.»

متن حدود 65 واژه دارد؛ برآورد 1.18 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب | متن روی تصویر: اسم و توضیح پروژه رو به‌روز کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا منوی سه‌نقطهٔ انتشار پاییز؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی تنظیمات نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از دوباره بررسی می‌کنیم که توضیح جدید ثبت شده باشه. | موس از روی متن کنار برود؛ متن جدید همچنان موجود است. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «منوی سه‌نقطهٔ انتشار پاییز» و نتیجهٔ «دوباره بررسی می‌کنیم که توضیح جدید ثبت شده باشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب» و کنترل «منوی سه‌نقطهٔ انتشار پاییز» در اجرای واقعی وجود دارند.
- [ ] نقش «مدیر یا مالک پروژه با canManageProjects» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: متن جدید همچنان موجود است.
- [ ] شرط‌های توقف بررسی شدند: فرم ممکن است برای مشاهده‌گر فقط خواندنی باشد. در صورت نبود مجوز برداشت متوقف شود. کنترل پیشرفتهٔ «بزودی» آموزش داده نشود. مسیر فعلی ProjectSettingsDropdown است؛ EditProjectDialog قدیمی مرجع کنترل‌های این برداشت نیست. پیام موفقیت قبل از پایان callback ممکن است دیده شود؛ بازخوانی سرور ضروری است.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: تغییر توضیح پروژه بدون ساخت پروژهٔ تکراری.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V11 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V12 شروع گفت‌وگو با هوش مصنوعی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | شروع گفت‌وگو با هوش مصنوعی |
| عنوان انتشار | از یک درخواست روشن به پاسخ قابل استفاده برس |
| ماژول | هوش مصنوعی |
| هدف آموزشی | ارسال یک درخواست فارسی و مشاهدهٔ پاسخ در گفت‌وگوی جدید |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو با مدل فعال و سهمیهٔ قابل استفاده |
| سطح | ساده |
| زمان هدف | 65 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /ai → /ai/conversation/:conversationId |
| پیش‌نیاز | فضای آموزشی فعال؛ حداقل یک مدل متنی در فهرست مدل‌ها موجود؛ نشست و اعتبار سرویس معتبر. متن پاسخ از پیش قطعی نیست. |
| نتیجهٔ یادگیری | ارسال یک درخواست فارسی و مشاهدهٔ پاسخ در گفت‌وگوی جدید |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811)؛ [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26)؛ [lib/features/ai/ai_conversation/views/ai_conversation_view.dart:40](../faro-flutter/lib/features/ai/ai_conversation/views/ai_conversation_view.dart#L40)؛ [lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart:29](../faro-flutter/lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart#L29)

### B آماده‌سازی محیط ضبط

با نقش «عضو با مدل فعال و سهمیهٔ قابل استفاده» وارد محیط آموزشی شوید. فضای آموزشی فعال؛ حداقل یک مدل متنی در فهرست مدل‌ها موجود؛ نشست و اعتبار سرویس معتبر. متن پاسخ از پیش قطعی نیست.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «پیام خود را بنویسید...» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: به صفحهٔ هوش مصنوعی برگردید؛ ورودی متن و پیوست خالی و مدل معتبر منتخب باشد.

خطاها و شرط توقف: پاسخ مدل تضمینی نیست؛ اگر پنج بند نداد، عنوان و نریشن را با خروجی واقعی هماهنگ کنید. خطای سهمیه، آفلاین یا مدل ناموجود را با پاسخ ساختگی جایگزین نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| متن درخواست | برای تولید یک ویدیوی آموزشی یک‌دقیقه‌ای، یک چک‌لیست پنج‌موردی آماده‌سازی ضبط بنویس. | درخواست بدون دادهٔ محرمانه |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | پیام خود را بنویسید... | کلیک | ورودی پیام فوکوس می‌گیرد. |
| 2 | ورودی هوش مصنوعی | پیام خود را بنویسید... | تایپ؛ «برای تولید یک ویدیوی آموزشی یک‌دقیقه‌ای، یک چک‌لیست پنج‌موردی آماده‌سازی ضبط بنویس.» را وارد کنید | متن آمادهٔ ارسال و دکمه فعال است. |
| 3 | ورودی هوش مصنوعی | ارسال | کلیک | گفت‌وگو ایجاد و صفحهٔ آن باز می‌شود. |
| 4 | صفحهٔ هوش مصنوعی/conversation/:id | پاسخ مدل | انتظار تا پایان؛ حذف انتظار اضافی | پاسخ متنی نمایش داده می‌شود؛ متن وابسته به مدل است. |
| 5 | گفت‌وگوی هوش مصنوعی | پاسخ نهایی | اسکرول آرام در صورت نیاز | چک‌لیست پیشنهادی در قاب خواناست. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ هوش مصنوعی | پیام خود را بنویسید... | کلیک | — | ورودی پیام فوکوس می‌گیرد. | کادر پیام | در صفحهٔ هوش مصنوعی، درخواست رو از همین کادر می‌نویسیم. |
| 2 · 18–28 ثانیه | ورودی هوش مصنوعی | پیام خود را بنویسید... | تایپ | برای تولید یک ویدیوی آموزشی یک‌دقیقه‌ای، یک چک‌لیست پنج‌موردی آماده‌سازی ضبط بنویس. | متن آمادهٔ ارسال و دکمه فعال است. | متن کامل درخواست | هدف، زمان و شکل خروجی رو مشخص می‌کنیم تا درخواست روشن باشه. |
| 3 · 28–37 ثانیه | ورودی هوش مصنوعی | ارسال | کلیک | — | گفت‌وگو ایجاد و صفحهٔ آن باز می‌شود. | دکمه و اولین پیام | ارسال رو می‌زنیم تا گفت‌وگوی جدید شروع بشه. |
| 4 · 37–46 ثانیه | صفحهٔ هوش مصنوعی/conversation/:id | پاسخ مدل | انتظار تا پایان؛ حذف انتظار اضافی | — | پاسخ متنی نمایش داده می‌شود؛ متن وابسته به مدل است. | بخش پاسخ | منتظر پاسخ می‌مونیم و بعد محتوای پیشنهادی رو می‌خونیم. |
| 5 · 46–55 ثانیه | گفت‌وگوی هوش مصنوعی | پاسخ نهایی | اسکرول آرام در صورت نیاز | — | چک‌لیست پیشنهادی در قاب خواناست. | پنج بند پاسخ در صورت تولید | قبل از استفاده، موارد پیشنهادی رو با نیاز ضبط خودمون بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «قبل از ضبط، چیزی از قلم افتاده؟ از یک چک‌لیست شروع کنیم.»

معرفی مسئله از 4 تا 8 ثانیه: «یک درخواست مشخص برای آماده‌سازی ضبط می‌فرستیم.»

آموزش عملی از 8 تا 55 ثانیه:

«در صفحهٔ هوش مصنوعی، درخواست رو از همین کادر می‌نویسیم. هدف، زمان و شکل خروجی رو مشخص می‌کنیم تا درخواست روشن باشه. ارسال رو می‌زنیم تا گفت‌وگوی جدید شروع بشه. منتظر پاسخ می‌مونیم و بعد محتوای پیشنهادی رو می‌خونیم. قبل از استفاده، موارد پیشنهادی رو با نیاز ضبط خودمون بررسی می‌کنیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «یک پیشنهاد اولیه داریم که باید بازبینی و متناسب‌سازی بشه.»

پایان از 61 تا 65 ثانیه: «برای نتیجهٔ بهتر، درخواستت رو دقیق و روشن بنویس.»

متن حدود 89 واژه دارد؛ برآورد 1.37 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: از یک درخواست روشن به پاسخ قابل استفاده برس؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا پیام خود را بنویسید...؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی پیام خود را بنویسید... نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از قبل از استفاده، موارد پیشنهادی رو با نیاز ضبط خودمون بررسی می‌کنیم. | موس از روی متن کنار برود؛ چک‌لیست پیشنهادی در قاب خواناست. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «پیام خود را بنویسید...» و نتیجهٔ «قبل از استفاده، موارد پیشنهادی رو با نیاز ضبط خودمون بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «پیام خود را بنویسید...» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو با مدل فعال و سهمیهٔ قابل استفاده» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: چک‌لیست پیشنهادی در قاب خواناست.
- [ ] شرط‌های توقف بررسی شدند: پاسخ مدل تضمینی نیست؛ اگر پنج بند نداد، عنوان و نریشن را با خروجی واقعی هماهنگ کنید. خطای سهمیه، آفلاین یا مدل ناموجود را با پاسخ ساختگی جایگزین نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ارسال یک درخواست فارسی و مشاهدهٔ پاسخ در گفت‌وگوی جدید.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V12 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V13 انتخاب مدل هوش مصنوعی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | انتخاب مدل هوش مصنوعی |
| عنوان انتشار | قبل از ارسال، مدل فعال رو بررسی کن |
| ماژول | هوش مصنوعی |
| هدف آموزشی | انتخاب مدل موجود از فهرست واقعی حساب |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو با دسترسی به دست‌کم دو مدل |
| سطح | ساده |
| زمان هدف | 40 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /ai |
| پیش‌نیاز | فهرست مدل‌های همان فضای کاری بارگیری شده باشد؛ نام دو مدل قابل دسترس در برگهٔ برداشت ثبت شود؛ نام تجاری ثابتی فرض نشود. |
| نتیجهٔ یادگیری | انتخاب مدل موجود از فهرست واقعی حساب |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/ai/project_ai_chat/views/widgets/ai_model_switcher_dropdown.dart:445](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_model_switcher_dropdown.dart#L445)؛ [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26)؛ [lib/features/ai/project_ai_chat/repositories/dio_ai_chat_repository.dart:16](../faro-flutter/lib/features/ai/project_ai_chat/repositories/dio_ai_chat_repository.dart#L16)

### B آماده‌سازی محیط ضبط

با نقش «عضو با دسترسی به دست‌کم دو مدل» وارد محیط آموزشی شوید. فهرست مدل‌های همان فضای کاری بارگیری شده باشد؛ نام دو مدل قابل دسترس در برگهٔ برداشت ثبت شود؛ نام تجاری ثابتی فرض نشود.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «کپسول نام مدل کنار ورودی پیام» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: مدل اول برگهٔ برداشت را دوباره فعال کنید؛ هیچ پیامی لازم نیست ارسال شود.

خطاها و شرط توقف: متغیر مدل مقصد باید پیش از ضبط پر شود؛ بدون دو مدل، برداشت این ویدیو آماده نیست. برچسب هوشمندترین معیار قطعی کیفیت یا مقایسهٔ علمی محسوب نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| مدل مبدأ | نام واقعی مدل اول در محیط آزمون | در برگهٔ برداشت ثبت شود. |
| مدل مقصد | نام واقعی مدل دوم در همان فهرست | متغیر اجباری پیش از ضبط است. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | کپسول نام مدل کنار ورودی پیام | کلیک | پنجرهٔ مدل‌های هوش مصنوعی باز می‌شود. |
| 2 | مدل‌های هوش مصنوعی | فهرست مدل‌ها | اسکرول کوتاه در صورت نیاز | مدل‌های مجاز حساب دیده می‌شوند. |
| 3 | فهرست مدل‌ها | ردیف مدل مقصد ثبت‌شده در برگهٔ برداشت | کلیک؛ «نام واقعی مدل دوم» را وارد کنید | مدل انتخاب می‌شود و کنترل بسته می‌شود. |
| 4 | صفحهٔ هوش مصنوعی | کپسول نام مدل | مکث | نام مدل انتخاب‌شده در ورودی دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 6–13 ثانیه | صفحهٔ هوش مصنوعی | کپسول نام مدل کنار ورودی پیام | کلیک | — | پنجرهٔ مدل‌های هوش مصنوعی باز می‌شود. | نام مدل فعال | قبل از ارسال، روی نام مدل فعال کلیک می‌کنیم. |
| 2 · 13–20 ثانیه | مدل‌های هوش مصنوعی | فهرست مدل‌ها | اسکرول کوتاه در صورت نیاز | — | مدل‌های مجاز حساب دیده می‌شوند. | فهرست و نام مدل‌ها | اینجا مدل‌هایی رو می‌بینیم که برای این فضا در دسترسن. |
| 3 · 20–26 ثانیه | فهرست مدل‌ها | ردیف مدل مقصد ثبت‌شده در برگهٔ برداشت | کلیک | نام واقعی مدل دوم | مدل انتخاب می‌شود و کنترل بسته می‌شود. | ردیف مقصد | مدل موردنظر رو از همین فهرست انتخاب می‌کنیم. |
| 4 · 26–32 ثانیه | صفحهٔ هوش مصنوعی | کپسول نام مدل | مکث | — | نام مدل انتخاب‌شده در ورودی دیده می‌شود. | نام تازه | نام کنار کادر پیام رو بررسی می‌کنیم تا انتخابمون مشخص باشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 3 ثانیه: «می‌خوای بدونی درخواست بعدی با کدوم مدل ارسال می‌شه؟»

معرفی مسئله از 3 تا 6 ثانیه: «مدل در دسترس رو از فهرست حساب انتخاب می‌کنیم.»

آموزش عملی از 6 تا 32 ثانیه:

«قبل از ارسال، روی نام مدل فعال کلیک می‌کنیم. اینجا مدل‌هایی رو می‌بینیم که برای این فضا در دسترسن. مدل موردنظر رو از همین فهرست انتخاب می‌کنیم. نام کنار کادر پیام رو بررسی می‌کنیم تا انتخابمون مشخص باشه.»

نمایش نتیجه از 32 تا 37 ثانیه: «مدل فعال عوض شد؛ هنوز پیامی ارسال نکردیم.»

پایان از 37 تا 40 ثانیه: «دسترسی مدل‌ها ممکنه بین فضاهای کاری فرق داشته باشه.»

متن حدود 73 واژه دارد؛ برآورد 1.82 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–3 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: قبل از ارسال، مدل فعال رو بررسی کن؛ هوک همزمان خوانده شود. |
| 3–6 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا کپسول نام مدل کنار ورودی پیام؛ قبل از کلیک مکث کوتاه. |
| 6–32 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی فهرست مدل‌ها نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 32–37 | نمای نهایی از نام کنار کادر پیام رو بررسی می‌کنیم تا انتخابمون مشخص باشه. | موس از روی متن کنار برود؛ نام مدل انتخاب‌شده در ورودی دیده می‌شود. |
| 37–40 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «کپسول نام مدل کنار ورودی پیام» و نتیجهٔ «نام کنار کادر پیام رو بررسی می‌کنیم تا انتخابمون مشخص باشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «کپسول نام مدل کنار ورودی پیام» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو با دسترسی به دست‌کم دو مدل» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: نام مدل انتخاب‌شده در ورودی دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: متغیر مدل مقصد باید پیش از ضبط پر شود؛ بدون دو مدل، برداشت این ویدیو آماده نیست. برچسب هوشمندترین معیار قطعی کیفیت یا مقایسهٔ علمی محسوب نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتخاب مدل موجود از فهرست واقعی حساب.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 40 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V13 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V14 پیوست فایل به درخواست هوش مصنوعی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | پیوست فایل به درخواست هوش مصنوعی |
| عنوان انتشار | به‌جای توضیح طولانی، فایل نمونه رو هم بفرست |
| ماژول | هوش مصنوعی |
| هدف آموزشی | انتخاب پیوست متنی و ارسال همراه درخواست |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو با مدل پشتیبان پیوست |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /ai |
| پیش‌نیاز | فایل sample-brief.txt از پوشهٔ assets همین بسته؛ مدل منتخب باید نوع فایل را در محیط اجرایی بپذیرد. آزمون سازگاری فایل پیش از ضبط الزامی است. |
| نتیجهٔ یادگیری | انتخاب پیوست متنی و ارسال همراه درخواست |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart:138](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart#L138)؛ [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811)؛ [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30)

### B آماده‌سازی محیط ضبط

با نقش «عضو با مدل پشتیبان پیوست» وارد محیط آموزشی شوید. فایل sample-brief.txt از پوشهٔ assets همین بسته؛ مدل منتخب باید نوع فایل را در محیط اجرایی بپذیرد. آزمون سازگاری فایل پیش از ضبط الزامی است.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «افزودن فایل با آیکون گیره یا مثبت» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پیوست‌های staged و متن ورودی را خالی کنید؛ فایل نمونه روی دستگاه موجود باشد.

خطاها و شرط توقف: وجود دکمهٔ پیوست تضمین پشتیبانی تمام مدل‌ها از همهٔ فرمت‌ها نیست. اگر سرور فایل را رد کرد، این سناریو تا انتخاب فایل و مدل سازگار نیازمند تست می‌ماند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| فایل | sample-brief.txt | فایل UTF-8 بدون دادهٔ واقعی |
| درخواست | از فایل پیوست، سه اقدام بعدی تیم را استخراج کن. | همراه فایل ارسال شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | افزودن فایل با آیکون گیره یا مثبت | کلیک | منوی پیوست باز می‌شود. |
| 2 | منوی پیوست | پیوست فایل | کلیک | انتخابگر فایل سیستم باز می‌شود. |
| 3 | انتخابگر سیستم | نام فایل و دکمهٔ بازکردن سیستم | انتخاب و تأیید؛ «sample-brief.txt» را وارد کنید | تراشهٔ فایل به ورودی اضافه می‌شود. |
| 4 | ورودی هوش مصنوعی | پیام خود را بنویسید... | تایپ؛ «از فایل پیوست، سه اقدام بعدی تیم را استخراج کن.» را وارد کنید | متن همراه فایل آماده است. |
| 5 | ورودی هوش مصنوعی | ارسال | کلیک و انتظار | فایل و پیام ارسال می‌شوند و پاسخ یا خطای پذیرش نمایش داده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ هوش مصنوعی | افزودن فایل با آیکون گیره یا مثبت | کلیک | — | منوی پیوست باز می‌شود. | کنترل پیوست | برای اضافه‌کردن سند، منوی افزودن فایل رو باز می‌کنیم. |
| 2 · 18–28 ثانیه | منوی پیوست | پیوست فایل | کلیک | — | انتخابگر فایل سیستم باز می‌شود. | گزینهٔ پیوست | پیوست فایل رو انتخاب می‌کنیم. |
| 3 · 28–37 ثانیه | انتخابگر سیستم | نام فایل و دکمهٔ بازکردن سیستم | انتخاب و تأیید | sample-brief.txt | تراشهٔ فایل به ورودی اضافه می‌شود. | فقط نام فایل؛ مسیر شخصی پوشیده | فایل نمونهٔ همین آموزش رو انتخاب می‌کنیم. |
| 4 · 37–46 ثانیه | ورودی هوش مصنوعی | پیام خود را بنویسید... | تایپ | از فایل پیوست، سه اقدام بعدی تیم را استخراج کن. | متن همراه فایل آماده است. | تراشهٔ فایل و متن | دقیق می‌گیم از محتوای فایل چه خروجی‌ای می‌خوایم. |
| 5 · 46–55 ثانیه | ورودی هوش مصنوعی | ارسال | کلیک و انتظار | — | فایل و پیام ارسال می‌شوند و پاسخ یا خطای پذیرش نمایش داده می‌شود. | پیام دارای پیوست و پاسخ | ارسال رو می‌زنیم و پاسخ رو با متن فایل مقایسه می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «اطلاعات درخواستت داخل یک فایل آماده‌ست؟»

معرفی مسئله از 4 تا 8 ثانیه: «فایل آموزشی رو همراه یک درخواست روشن می‌فرستیم.»

آموزش عملی از 8 تا 55 ثانیه:

«برای اضافه‌کردن سند، منوی افزودن فایل رو باز می‌کنیم. پیوست فایل رو انتخاب می‌کنیم. فایل نمونهٔ همین آموزش رو انتخاب می‌کنیم. دقیق می‌گیم از محتوای فایل چه خروجی‌ای می‌خوایم. ارسال رو می‌زنیم و پاسخ رو با متن فایل مقایسه می‌کنیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «درخواست همراه فایل ارسال شد؛ نتیجه رو با خود فایل می‌سنجیم.»

پایان از 61 تا 65 ثانیه: «قبل از ارسال هر فایل، محتوای اون رو بررسی کن.»

متن حدود 75 واژه دارد؛ برآورد 1.15 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: به‌جای توضیح طولانی، فایل نمونه رو هم بفرست؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا افزودن فایل با آیکون گیره یا مثبت؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی پیوست فایل نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از ارسال رو می‌زنیم و پاسخ رو با متن فایل مقایسه می‌کنیم. | موس از روی متن کنار برود؛ فایل و پیام ارسال می‌شوند و پاسخ یا خطای پذیرش نمایش داده می‌شود. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «افزودن فایل با آیکون گیره یا مثبت» و نتیجهٔ «ارسال رو می‌زنیم و پاسخ رو با متن فایل مقایسه می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «افزودن فایل با آیکون گیره یا مثبت» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو با مدل پشتیبان پیوست» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: فایل و پیام ارسال می‌شوند و پاسخ یا خطای پذیرش نمایش داده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: وجود دکمهٔ پیوست تضمین پشتیبانی تمام مدل‌ها از همهٔ فرمت‌ها نیست. اگر سرور فایل را رد کرد، این سناریو تا انتخاب فایل و مدل سازگار نیازمند تست می‌ماند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتخاب پیوست متنی و ارسال همراه درخواست.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V14 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V15 پیداکردن گفت‌وگوی قبلی هوش مصنوعی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | پیداکردن گفت‌وگوی قبلی هوش مصنوعی |
| عنوان انتشار | گفت‌وگوی قبلیت رو دوباره پیدا کن |
| ماژول | هوش مصنوعی |
| هدف آموزشی | جست‌وجو در فهرست گفت‌وگوها و بازکردن نتیجه |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو دارای دسترسی به گفت‌وگوی نمونه |
| سطح | ساده |
| زمان هدف | 45 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /ai |
| پیش‌نیاز | یک گفت‌وگوی نمونه با عنوان شامل «ضبط» از قبل در فهرست همان فضای کاری وجود داشته باشد؛ عنوان را در محیط آزمون بررسی کنید؛ تغییر نام در UI این نسخه فرض نشود. |
| نتیجهٔ یادگیری | جست‌وجو در فهرست گفت‌وگوها و بازکردن نتیجه |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/ai/project_ai_chat/views/widgets/ai_search_filter_bar.dart:27](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_search_filter_bar.dart#L27)؛ [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26)؛ [lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart:17](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart#L17)

### B آماده‌سازی محیط ضبط

با نقش «عضو دارای دسترسی به گفت‌وگوی نمونه» وارد محیط آموزشی شوید. یک گفت‌وگوی نمونه با عنوان شامل «ضبط» از قبل در فهرست همان فضای کاری وجود داشته باشد؛ عنوان را در محیط آزمون بررسی کنید؛ تغییر نام در UI این نسخه فرض نشود.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «جست‌وجو در گفت‌وگوها...» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: فهرست گفتگوها باز و جست‌وجو خالی باشد؛ عنوان نمونه همان عنوان ثبت‌شده باقی بماند.

خطاها و شرط توقف: عنوان گفت‌وگو ممکن است خودکار تولید شود؛ واژهٔ جست‌وجو را با عنوان واقعی نمونه هماهنگ کنید. نتیجهٔ خالی را به معنی حذف داده قطعی معرفی نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| جست‌وجو | ضبط | باید با عنوان گفت‌وگوی موجود تطبیق داشته باشد. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | جست‌وجو در گفت‌وگوها... | کلیک و تایپ؛ «ضبط» را وارد کنید | جست‌وجوی فهرست پس از وقفهٔ کوتاه آغاز می‌شود. |
| 2 | فهرست نتایج | گفت‌وگوی دارای ضبط در عنوان | انتظار تا بارگذاری | فهرست به نتایج مرتبط محدود می‌شود. |
| 3 | ردیف گفت‌وگو | عنوان همان گفت‌وگو | کلیک | صفحهٔ گفت‌وگوی قبلی باز می‌شود. |
| 4 | گفت‌وگوی قبلی | پیام‌های ذخیره‌شده | مکث | تاریخچهٔ همان گفت‌وگو قابل خواندن است. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 7–15 ثانیه | صفحهٔ هوش مصنوعی | جست‌وجو در گفت‌وگوها... | کلیک و تایپ | ضبط | جست‌وجوی فهرست پس از وقفهٔ کوتاه آغاز می‌شود. | جست‌وجوی فهرست | در جست‌وجوی گفت‌وگوها، یک کلمه از عنوان رو می‌نویسیم. |
| 2 · 15–23 ثانیه | فهرست نتایج | گفت‌وگوی دارای ضبط در عنوان | انتظار تا بارگذاری | — | فهرست به نتایج مرتبط محدود می‌شود. | ردیف دارای عنوان | نتیجه‌ای رو پیدا می‌کنیم که عنوانش با موضوعمون مطابقت داره. |
| 3 · 23–30 ثانیه | ردیف گفت‌وگو | عنوان همان گفت‌وگو | کلیک | — | صفحهٔ گفت‌وگوی قبلی باز می‌شود. | عنوان و اولین پیام | روی عنوان کلیک می‌کنیم تا پیام‌های قبلی باز بشن. |
| 4 · 30–37 ثانیه | گفت‌وگوی قبلی | پیام‌های ذخیره‌شده | مکث | — | تاریخچهٔ همان گفت‌وگو قابل خواندن است. | پیام نمونه | با بررسی پیام‌ها مطمئن می‌شیم گفت‌وگوی درست رو باز کردیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «پاسخ قبلی خوب بود، ولی یادت نیست کجاست؟»

معرفی مسئله از 4 تا 7 ثانیه: «این بار از جست‌وجوی فهرست گفتگوها استفاده می‌کنیم.»

آموزش عملی از 7 تا 37 ثانیه:

«در جست‌وجوی گفت‌وگوها، یک کلمه از عنوان رو می‌نویسیم. نتیجه‌ای رو پیدا می‌کنیم که عنوانش با موضوعمون مطابقت داره. روی عنوان کلیک می‌کنیم تا پیام‌های قبلی باز بشن. با بررسی پیام‌ها مطمئن می‌شیم گفت‌وگوی درست رو باز کردیم.»

نمایش نتیجه از 37 تا 42 ثانیه: «گفت‌وگوی قبلی دوباره در دسترسه.»

پایان از 42 تا 45 ثانیه: «یک کلمهٔ مشخص از عنوان، شروع خوبی برای جست‌وجوه.»

متن حدود 68 واژه دارد؛ برآورد 1.51 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: گفت‌وگوی قبلیت رو دوباره پیدا کن؛ هوک همزمان خوانده شود. |
| 4–7 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا جست‌وجو در گفت‌وگوها...؛ قبل از کلیک مکث کوتاه. |
| 7–37 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی گفت‌وگوی دارای ضبط در عنوان نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 37–42 | نمای نهایی از با بررسی پیام‌ها مطمئن می‌شیم گفت‌وگوی درست رو باز کردیم. | موس از روی متن کنار برود؛ تاریخچهٔ همان گفت‌وگو قابل خواندن است. |
| 42–45 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «جست‌وجو در گفت‌وگوها...» و نتیجهٔ «با بررسی پیام‌ها مطمئن می‌شیم گفت‌وگوی درست رو باز کردیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «جست‌وجو در گفت‌وگوها...» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو دارای دسترسی به گفت‌وگوی نمونه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: تاریخچهٔ همان گفت‌وگو قابل خواندن است.
- [ ] شرط‌های توقف بررسی شدند: عنوان گفت‌وگو ممکن است خودکار تولید شود؛ واژهٔ جست‌وجو را با عنوان واقعی نمونه هماهنگ کنید. نتیجهٔ خالی را به معنی حذف داده قطعی معرفی نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: جست‌وجو در فهرست گفت‌وگوها و بازکردن نتیجه.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 45 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V15 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V16 تولید مجدد و کپی پاسخ

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | تولید مجدد و کپی پاسخ |
| عنوان انتشار | یک پاسخ دیگه بگیر و متنش رو بردار |
| ماژول | هوش مصنوعی |
| هدف آموزشی | درخواست تولید مجدد پاسخ و کپی متن از کنترل واقعی پیام |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو مجاز گفت‌وگو با مدل و سهمیهٔ فعال |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /ai/conversation/:conversationId |
| پیش‌نیاز | گفت‌وگوی نمونه دارای یک پیام کاربر و پاسخ کامل؛ جریان پاسخ در حال تولید نباشد. بازتولید ممکن است سهمیه مصرف کند. پاسخ هدف باید آخرین پیام کامل گفت‌وگو باشد؛ callback تولید مجدد فقط برای آخرین پاسخ وصل است. |
| نتیجهٔ یادگیری | درخواست تولید مجدد پاسخ و کپی متن از کنترل واقعی پیام |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart:103](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart#L103)؛ [lib/features/ai/ai_conversation/views/ai_conversation_view.dart:40](../faro-flutter/lib/features/ai/ai_conversation/views/ai_conversation_view.dart#L40)؛ [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30)

### B آماده‌سازی محیط ضبط

با نقش «عضو مجاز گفت‌وگو با مدل و سهمیهٔ فعال» وارد محیط آموزشی شوید. گفت‌وگوی نمونه دارای یک پیام کاربر و پاسخ کامل؛ جریان پاسخ در حال تولید نباشد. بازتولید ممکن است سهمیه مصرف کند. پاسخ هدف باید آخرین پیام کامل گفت‌وگو باشد؛ callback تولید مجدد فقط برای آخرین پاسخ وصل است.

وضعیت آغاز: صفحهٔ هوش مصنوعی/conversation/:id باز باشد؛ کنترل «منوی پیام پاسخ با راست‌کلیک» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: گفت‌وگوی کپی دارای آخرین پاسخ کامل باز شود؛ کلیپ‌بورد و ویرایشگر مقصد فقط دادهٔ نمونه داشته باشند.

خطاها و شرط توقف: سیم‌کشی callback تولید مجدد در نمای گفت‌وگو بررسی شود؛ اگر گزینه برای پیام انتخابی فعال نیست ضبط متوقف شود. هیچ وعده‌ای دربارهٔ بهترشدن خودکار پاسخ ندهید. ویرایشگر محلی از قبل خالی و بدون فایل واقعی باشد.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| پیام نمونه | پنج نکته برای آماده‌سازی ضبط صفحه بنویس. | پاسخ از قبل در گفت‌وگو باشد. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی/conversation/:id | منوی پیام پاسخ با راست‌کلیک | راست‌کلیک روی متن پاسخ | منوی پیام مدل باز می‌شود. |
| 2 | منوی پاسخ | تولید مجدد پاسخ | کلیک | تولید نسخهٔ جدید پاسخ آغاز می‌شود. |
| 3 | گفت‌وگو | پاسخ مدل | انتظار تا پایان | پاسخ جدید نمایش داده می‌شود؛ تفاوت محتوایی تضمین‌شده نیست. |
| 4 | متن پاسخ کامل | منوی راست‌کلیک → کپی متن | راست‌کلیک و انتخاب کپی متن | متن در کلیپ‌بورد قرار می‌گیرد. |
| 5 | ویرایشگر متن خالی خارج برنامه | صفحهٔ خالی | Ctrl+V فقط در ویرایشگر محلی آموزشی | متن کپی‌شده قابل مشاهده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ هوش مصنوعی/conversation/:id | منوی پیام پاسخ با راست‌کلیک | راست‌کلیک روی متن پاسخ | — | منوی پیام مدل باز می‌شود. | پاسخ و منو | روی پاسخ راست‌کلیک می‌کنیم تا گزینه‌های همون پیام باز بشه. |
| 2 · 18–28 ثانیه | منوی پاسخ | تولید مجدد پاسخ | کلیک | — | تولید نسخهٔ جدید پاسخ آغاز می‌شود. | گزینه و ناحیهٔ پاسخ | تولید مجدد پاسخ رو انتخاب می‌کنیم. |
| 3 · 28–37 ثانیه | گفت‌وگو | پاسخ مدل | انتظار تا پایان | — | پاسخ جدید نمایش داده می‌شود؛ تفاوت محتوایی تضمین‌شده نیست. | پاسخ تازه | صبر می‌کنیم پاسخ کامل بشه؛ بعد متنش رو بازبینی می‌کنیم. |
| 4 · 37–46 ثانیه | متن پاسخ کامل | منوی راست‌کلیک → کپی متن | راست‌کلیک و انتخاب کپی متن | — | متن در کلیپ‌بورد قرار می‌گیرد. | گزینهٔ کپی | از منوی پاسخ، کپی متن رو می‌زنیم. |
| 5 · 46–55 ثانیه | ویرایشگر متن خالی خارج برنامه | صفحهٔ خالی | Ctrl+V فقط در ویرایشگر محلی آموزشی | — | متن کپی‌شده قابل مشاهده می‌شود. | دو خط اول متن | با جای‌گذاری در یک صفحهٔ خالی، نتیجهٔ کپی رو بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «می‌خوای یک نسخهٔ دیگه از پاسخ رو بررسی کنی؟»

معرفی مسئله از 4 تا 8 ثانیه: «روی آخرین پاسخ کامل گفتگو کار می‌کنیم.»

آموزش عملی از 8 تا 55 ثانیه:

«روی پاسخ راست‌کلیک می‌کنیم تا گزینه‌های همون پیام باز بشه. تولید مجدد پاسخ رو انتخاب می‌کنیم. صبر می‌کنیم پاسخ کامل بشه؛ بعد متنش رو بازبینی می‌کنیم. از منوی پاسخ، کپی متن رو می‌زنیم. با جای‌گذاری در یک صفحهٔ خالی، نتیجهٔ کپی رو بررسی می‌کنیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «پاسخ رو بازتولید کردیم و متنش آمادهٔ استفاده‌ست.»

پایان از 61 تا 65 ثانیه: «قبل از استفادهٔ نهایی، محتوای پاسخ رو خودت بازبینی کن.»

متن حدود 78 واژه دارد؛ برآورد 1.20 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی/conversation/:id | متن روی تصویر: یک پاسخ دیگه بگیر و متنش رو بردار؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا منوی پیام پاسخ با راست‌کلیک؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی تولید مجدد پاسخ نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از با جای‌گذاری در یک صفحهٔ خالی، نتیجهٔ کپی رو بررسی می‌کنیم. | موس از روی متن کنار برود؛ متن کپی‌شده قابل مشاهده می‌شود. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «منوی پیام پاسخ با راست‌کلیک» و نتیجهٔ «با جای‌گذاری در یک صفحهٔ خالی، نتیجهٔ کپی رو بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی/conversation/:id» و کنترل «منوی پیام پاسخ با راست‌کلیک» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو مجاز گفت‌وگو با مدل و سهمیهٔ فعال» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: متن کپی‌شده قابل مشاهده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: سیم‌کشی callback تولید مجدد در نمای گفت‌وگو بررسی شود؛ اگر گزینه برای پیام انتخابی فعال نیست ضبط متوقف شود. هیچ وعده‌ای دربارهٔ بهترشدن خودکار پاسخ ندهید. ویرایشگر محلی از قبل خالی و بدون فایل واقعی باشد.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: درخواست تولید مجدد پاسخ و کپی متن از کنترل واقعی پیام.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V16 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V17 شروع گفت‌وگوی مستقیم

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | شروع گفت‌وگوی مستقیم |
| عنوان انتشار | یک گفت‌وگوی مشخص با همکارت شروع کن |
| ماژول | گفت‌وگو |
| هدف آموزشی | انتخاب همکار و شروع پیام مستقیم در دو مرحلهٔ واقعی فرم |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو با canChat و دسترسی به همکار |
| سطح | ساده |
| زمان هدف | 70 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /chat |
| پیش‌نیاز | سارا نمونه عضو فعال فضای آموزشی باشد؛ فهرست همکاران بارگیری شود. وجود گفت‌وگوی مستقیم قبلی مانع نیست؛ همان اتاق ممکن است باز شود. |
| نتیجهٔ یادگیری | انتخاب همکار و شروع پیام مستقیم در دو مرحلهٔ واقعی فرم |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/views/chat_view.dart:41](../faro-flutter/lib/features/chat/views/chat_view.dart#L41)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29)

### B آماده‌سازی محیط ضبط

با نقش «عضو با canChat و دسترسی به همکار» وارد محیط آموزشی شوید. سارا نمونه عضو فعال فضای آموزشی باشد؛ فهرست همکاران بارگیری شود. وجود گفت‌وگوی مستقیم قبلی مانع نیست؛ همان اتاق ممکن است باز شود.

وضعیت آغاز: گفت‌وگوها باز باشد؛ کنترل «گفت‌وگو جدید در نوار کناری» در قاب قابل دیدن باشد. از نوار کناری «گفت‌وگوها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: فرم گفت‌وگو بسته و هیچ متنی در composer اتاق مقصد باقی نمانده باشد؛ پیام تکراری به مخاطب واقعی ارسال نشود.

خطاها و شرط توقف: این سند مجوز ارسال به افراد واقعی نیست؛ ضبط‌کننده فقط حساب‌های آزمایشی را انتخاب کند. انتخاب مستقیم ممکن است اتاق موجود را باز کند؛ ساخت اتاق تکراری ادعا نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| همکار | سارا نمونه | حساب sara_demo |
| پیام | سلام سارا، فایل برنامه ضبط را امروز بررسی می‌کنیم. | فقط به حساب آزمون ارسال شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | گفت‌وگوها | گفت‌وگو جدید در نوار کناری | کلیک | پنجرهٔ گفت‌وگوی جدید باز می‌شود. |
| 2 | گفت‌وگوی جدید | جستجوی همکار... | تایپ و کلیک روی ردیف؛ «سارا نمونه» را وارد کنید | همکار انتخاب می‌شود. |
| 3 | انتخاب همکار | ادامه | کلیک | مرحلهٔ انتخاب مستقیم یا موضوعی ظاهر می‌شود. |
| 4 | انتخاب نوع | گفت‌وگوی مستقیم و سپس شروع گفت‌وگو | انتخاب و کلیک | اتاق مستقیم موجود یا تازه باز می‌شود. |
| 5 | اتاق سارا نمونه | پیام خود را بگذارید... | تایپ؛ «سلام سارا، فایل برنامه ضبط را امروز بررسی می‌کنیم.» را وارد کنید | متن در ورودی قرار می‌گیرد. |
| 6 | همان اتاق | ارسال پیام | کلیک | پیام در تاریخچهٔ همان اتاق دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | گفت‌وگوها | گفت‌وگو جدید در نوار کناری | کلیک | — | پنجرهٔ گفت‌وگوی جدید باز می‌شود. | دکمه و پنجره | از بخش گفت‌وگو، گفت‌وگوی جدید رو باز می‌کنیم. |
| 2 · 17–26 ثانیه | گفت‌وگوی جدید | جستجوی همکار... | تایپ و کلیک روی ردیف | سارا نمونه | همکار انتخاب می‌شود. | هویت همکار | سارا نمونه رو جست‌وجو و انتخاب می‌کنیم. |
| 3 · 26–35 ثانیه | انتخاب همکار | ادامه | کلیک | — | مرحلهٔ انتخاب مستقیم یا موضوعی ظاهر می‌شود. | دکمه و دو نوع گفت‌وگو | ادامه رو می‌زنیم تا نوع گفت‌وگو رو انتخاب کنیم. |
| 4 · 35–43 ثانیه | انتخاب نوع | گفت‌وگوی مستقیم و سپس شروع گفت‌وگو | انتخاب و کلیک | — | اتاق مستقیم موجود یا تازه باز می‌شود. | نوع و نام هدر اتاق | گفت‌وگوی مستقیم رو انتخاب می‌کنیم و شروع رو می‌زنیم. |
| 5 · 43–51 ثانیه | اتاق سارا نمونه | پیام خود را بگذارید... | تایپ | سلام سارا، فایل برنامه ضبط را امروز بررسی می‌کنیم. | متن در ورودی قرار می‌گیرد. | هدر گیرنده و ورودی | قبل از نوشتن پیام، نام گیرنده رو یک بار دیگه بررسی می‌کنیم. |
| 6 · 51–59 ثانیه | همان اتاق | ارسال پیام | کلیک | — | پیام در تاریخچهٔ همان اتاق دیده می‌شود. | حباب پیام تازه | پیام رو ارسال می‌کنیم و ثبتش رو در گفت‌وگو می‌بینیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «برای هماهنگی دونفره، از کجا شروع کنیم؟»

معرفی مسئله از 4 تا 8 ثانیه: «یک پیام مستقیم به حساب آزمایشی سارا می‌فرستیم.»

آموزش عملی از 8 تا 59 ثانیه:

«از بخش گفت‌وگو، گفت‌وگوی جدید رو باز می‌کنیم. سارا نمونه رو جست‌وجو و انتخاب می‌کنیم. ادامه رو می‌زنیم تا نوع گفت‌وگو رو انتخاب کنیم. گفت‌وگوی مستقیم رو انتخاب می‌کنیم و شروع رو می‌زنیم. قبل از نوشتن پیام، نام گیرنده رو یک بار دیگه بررسی می‌کنیم. پیام رو ارسال می‌کنیم و ثبتش رو در گفت‌وگو می‌بینیم.»

نمایش نتیجه از 59 تا 66 ثانیه: «پیام در گفت‌وگوی مستقیم با سارا ثبت شد.»

پایان از 66 تا 70 ثانیه: «برای موضوع‌های مستقل، گفت‌وگوی موضوعی رو هم ببین.»

متن حدود 86 واژه دارد؛ برآورد 1.23 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از گفت‌وگوها | متن روی تصویر: یک گفت‌وگوی مشخص با همکارت شروع کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا گفت‌وگو جدید در نوار کناری؛ قبل از کلیک مکث کوتاه. |
| 8–59 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی جستجوی همکار... نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 59–66 | نمای نهایی از پیام رو ارسال می‌کنیم و ثبتش رو در گفت‌وگو می‌بینیم. | موس از روی متن کنار برود؛ پیام در تاریخچهٔ همان اتاق دیده می‌شود. |
| 66–70 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «گفت‌وگو جدید در نوار کناری» و نتیجهٔ «پیام رو ارسال می‌کنیم و ثبتش رو در گفت‌وگو می‌بینیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «گفت‌وگوها» و کنترل «گفت‌وگو جدید در نوار کناری» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو با canChat و دسترسی به همکار» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پیام در تاریخچهٔ همان اتاق دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: این سند مجوز ارسال به افراد واقعی نیست؛ ضبط‌کننده فقط حساب‌های آزمایشی را انتخاب کند. انتخاب مستقیم ممکن است اتاق موجود را باز کند؛ ساخت اتاق تکراری ادعا نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتخاب همکار و شروع پیام مستقیم در دو مرحلهٔ واقعی فرم.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 70 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V17 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V18 ایجاد گفت‌وگوی موضوعی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ایجاد گفت‌وگوی موضوعی |
| عنوان انتشار | موضوع‌های کاری رو از هم جدا نگه دار |
| ماژول | گفت‌وگو |
| هدف آموزشی | ساخت گفت‌وگوی موضوعی با همکار مشخص و عنوان مستقل |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو با canChat |
| سطح | ساده |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /chat |
| پیش‌نیاز | سارا نمونه عضو فعال باشد؛ موضوع «بازبینی ویدیوی شروع کار» هنوز ساخته نشده باشد. |
| نتیجهٔ یادگیری | ساخت گفت‌وگوی موضوعی با همکار مشخص و عنوان مستقل |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29)؛ [lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart:17](../faro-flutter/lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart#L17)

### B آماده‌سازی محیط ضبط

با نقش «عضو با canChat» وارد محیط آموزشی شوید. سارا نمونه عضو فعال باشد؛ موضوع «بازبینی ویدیوی شروع کار» هنوز ساخته نشده باشد.

وضعیت آغاز: گفت‌وگوها باز باشد؛ کنترل «گفت‌وگو جدید» در قاب قابل دیدن باشد. از نوار کناری «گفت‌وگوها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: برای برداشت تازه، موضوع مصرفی یکتا آماده کنید؛ از اتاق واقعی چیزی پاک نشود.

خطاها و شرط توقف: موضوع خالی با پیام خطا متوقف می‌شود. این ویدیو ساخت گروه نیست؛ تعداد اعضا یا سطح دسترسی گروهی را به گفت‌وگوی موضوعی نسبت ندهید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| همکار | سارا نمونه | حساب آزمون |
| عنوان موضوع | بازبینی ویدیوی شروع کار | برای موضوع غیرخالی لازم است. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | گفت‌وگوها | گفت‌وگو جدید | کلیک | فرم انتخاب همکار باز می‌شود. |
| 2 | گفت‌وگوی جدید | جستجوی همکار... | تایپ و انتخاب؛ «سارا نمونه» را وارد کنید | همکار انتخاب می‌شود. |
| 3 | همان پنجره | ادامه | کلیک | نوع گفت‌وگو قابل انتخاب می‌شود. |
| 4 | انتخاب نوع | گفت‌وگوی موضوعی | انتخاب | فیلد عنوان موضوع فعال می‌شود. |
| 5 | عنوان موضوع | عنوان موضوع | تایپ؛ «بازبینی ویدیوی شروع کار» را وارد کنید | عنوان فرم تکمیل می‌شود. |
| 6 | پایین پنجره | شروع گفت‌وگو | کلیک | اتاق موضوعی با عنوان واردشده باز می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | گفت‌وگوها | گفت‌وگو جدید | کلیک | — | فرم انتخاب همکار باز می‌شود. | دکمهٔ نوار کناری | برای یک موضوع مستقل، گفت‌وگوی جدید رو باز می‌کنیم. |
| 2 · 16–24 ثانیه | گفت‌وگوی جدید | جستجوی همکار... | تایپ و انتخاب | سارا نمونه | همکار انتخاب می‌شود. | نتیجهٔ انتخاب‌شده | سارا رو به‌عنوان همکار این گفت‌وگو انتخاب می‌کنیم. |
| 3 · 24–32 ثانیه | همان پنجره | ادامه | کلیک | — | نوع گفت‌وگو قابل انتخاب می‌شود. | دکمه | ادامه رو می‌زنیم. |
| 4 · 32–40 ثانیه | انتخاب نوع | گفت‌وگوی موضوعی | انتخاب | — | فیلد عنوان موضوع فعال می‌شود. | گزینه و فیلد | این بار گفت‌وگوی موضوعی رو انتخاب می‌کنیم. |
| 5 · 40–48 ثانیه | عنوان موضوع | عنوان موضوع | تایپ | بازبینی ویدیوی شروع کار | عنوان فرم تکمیل می‌شود. | عنوان کامل | موضوع رو دقیق می‌نویسیم تا بعداً راحت پیداش کنیم. |
| 6 · 48–55 ثانیه | پایین پنجره | شروع گفت‌وگو | کلیک | — | اتاق موضوعی با عنوان واردشده باز می‌شود. | هدر اتاق موضوعی | شروع گفت‌وگو رو می‌زنیم و عنوان موضوع رو در هدر می‌بینیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «چند بحث مختلف توی یک گفت‌وگو گم شده؟»

معرفی مسئله از 4 تا 8 ثانیه: «برای بازبینی ویدیو، یک گفت‌وگوی موضوعی می‌سازیم.»

آموزش عملی از 8 تا 55 ثانیه:

«برای یک موضوع مستقل، گفت‌وگوی جدید رو باز می‌کنیم. سارا رو به‌عنوان همکار این گفت‌وگو انتخاب می‌کنیم. ادامه رو می‌زنیم. این بار گفت‌وگوی موضوعی رو انتخاب می‌کنیم. موضوع رو دقیق می‌نویسیم تا بعداً راحت پیداش کنیم. شروع گفت‌وگو رو می‌زنیم و عنوان موضوع رو در هدر می‌بینیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «حالا این بحث، عنوان و فضای مشخص خودش رو داره.»

پایان از 61 تا 65 ثانیه: «برای هر بحث مستقل، موضوعی روشن انتخاب کن.»

متن حدود 80 واژه دارد؛ برآورد 1.23 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از گفت‌وگوها | متن روی تصویر: موضوع‌های کاری رو از هم جدا نگه دار؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا گفت‌وگو جدید؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی جستجوی همکار... نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از شروع گفت‌وگو رو می‌زنیم و عنوان موضوع رو در هدر می‌بینیم. | موس از روی متن کنار برود؛ اتاق موضوعی با عنوان واردشده باز می‌شود. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «گفت‌وگو جدید» و نتیجهٔ «شروع گفت‌وگو رو می‌زنیم و عنوان موضوع رو در هدر می‌بینیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «گفت‌وگوها» و کنترل «گفت‌وگو جدید» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو با canChat» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: اتاق موضوعی با عنوان واردشده باز می‌شود.
- [ ] شرط‌های توقف بررسی شدند: موضوع خالی با پیام خطا متوقف می‌شود. این ویدیو ساخت گروه نیست؛ تعداد اعضا یا سطح دسترسی گروهی را به گفت‌وگوی موضوعی نسبت ندهید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ساخت گفت‌وگوی موضوعی با همکار مشخص و عنوان مستقل.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V18 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V19 ساخت گروه آموزشی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ساخت گروه آموزشی |
| عنوان انتشار | هماهنگی چندنفره رو در یک گروه جمع کن |
| ماژول | گفت‌وگو |
| هدف آموزشی | ساخت اتاق گروهی و اضافه‌کردن اعضای منتخب |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو مجاز ساخت گروه در سرور و canChat |
| سطح | متوسط |
| زمان هدف | 70 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /chat → گفت‌وگوی جدید |
| پیش‌نیاز | دو حساب سارا نمونه و امیر نمونه عضو فعال فضا باشند؛ هیچ گروه هم‌نامی وجود نداشته باشد. ابتدا ساخت گروه و سپس افزودن اعضا در سرور انجام می‌شود. |
| نتیجهٔ یادگیری | ساخت اتاق گروهی و اضافه‌کردن اعضای منتخب |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192)؛ [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29)؛ [lib/features/chat/views/widgets/chat_room_details_dialog.dart:38](../faro-flutter/lib/features/chat/views/widgets/chat_room_details_dialog.dart#L38)

### B آماده‌سازی محیط ضبط

با نقش «عضو مجاز ساخت گروه در سرور و canChat» وارد محیط آموزشی شوید. دو حساب سارا نمونه و امیر نمونه عضو فعال فضا باشند؛ هیچ گروه هم‌نامی وجود نداشته باشد. ابتدا ساخت گروه و سپس افزودن اعضا در سرور انجام می‌شود.

وضعیت آغاز: گفت‌وگوها باز باشد؛ کنترل «گفت‌وگو جدید» در قاب قابل دیدن باشد. از نوار کناری «گفت‌وگوها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: اگر ساخت گروه موفق و افزودن عضو ناموفق بود، همان گروه را بررسی کنید؛ تا رفع وضعیت گروه تازه نسازید.

خطاها و شرط توقف: ساخت گروه و افزودن اعضا دو درخواست جدا هستند؛ شکست مرحلهٔ دوم ممکن است گروه ساخته‌شده باقی بگذارد. پیش از برداشت مجدد، فهرست و اعضای گروه را بررسی کنید؛ گروه تکراری نسازید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| عنوان گروه | تیم تولید آموزش | غیرخالی |
| اعضا | سارا نمونه؛ امیر نمونه | دو حساب آزمایشی تحت اختیار تیم |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | گفت‌وگوها | گفت‌وگو جدید | کلیک | پنجرهٔ ساخت گفت‌وگو باز می‌شود. |
| 2 | پایین پنجرهٔ گفت‌وگوی جدید | ساخت گروه | کلیک | فرم گروه با عنوان گروه و انتخاب چندعضوی نمایش داده می‌شود. |
| 3 | فرم گروه | عنوان گروه | تایپ؛ «تیم تولید آموزش» را وارد کنید | عنوان گروه درج می‌شود. |
| 4 | فهرست اعضا | ردیف سارا نمونه | انتخاب؛ «سارا نمونه» را وارد کنید | عضو اول در انتخاب چندتایی علامت می‌خورد. |
| 5 | فهرست اعضا | جستجوی همکار... و ردیف امیر نمونه | جست‌وجو و انتخاب؛ «امیر نمونه» را وارد کنید | عضو دوم هم انتخاب می‌شود. |
| 6 | فرم گروه | شروع گفت‌وگو | کلیک | پس از موفقیت ساخت و افزودن اعضا، اتاق گروه باز می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | گفت‌وگوها | گفت‌وگو جدید | کلیک | — | پنجرهٔ ساخت گفت‌وگو باز می‌شود. | عنوان فرم | از گفت‌وگوی جدید، ساخت گروه رو شروع می‌کنیم. |
| 2 · 17–26 ثانیه | پایین پنجرهٔ گفت‌وگوی جدید | ساخت گروه | کلیک | — | فرم گروه با عنوان گروه و انتخاب چندعضوی نمایش داده می‌شود. | گزینهٔ ساخت گروه | گزینهٔ ساخت گروه رو انتخاب می‌کنیم. |
| 3 · 26–35 ثانیه | فرم گروه | عنوان گروه | تایپ | تیم تولید آموزش | عنوان گروه درج می‌شود. | فیلد عنوان | اسم گروه رو تیم تولید آموزش می‌گذاریم. |
| 4 · 35–43 ثانیه | فهرست اعضا | ردیف سارا نمونه | انتخاب | سارا نمونه | عضو اول در انتخاب چندتایی علامت می‌خورد. | ردیف سارا | سارا رو به اعضای گروه اضافه می‌کنیم. |
| 5 · 43–51 ثانیه | فهرست اعضا | جستجوی همکار... و ردیف امیر نمونه | جست‌وجو و انتخاب | امیر نمونه | عضو دوم هم انتخاب می‌شود. | انتخاب اعضا | امیر رو هم از همون فهرست انتخاب می‌کنیم. |
| 6 · 51–59 ثانیه | فرم گروه | شروع گفت‌وگو | کلیک | — | پس از موفقیت ساخت و افزودن اعضا، اتاق گروه باز می‌شود. | هدر تیم تولید آموزش | شروع گفت‌وگو رو می‌زنیم و منتظر می‌مونیم گروه آماده بشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «هماهنگی چند نفر رو کجا متمرکز کنیم؟»

معرفی مسئله از 4 تا 8 ثانیه: «گروه رو با دو حساب آموزشی آماده می‌کنیم.»

آموزش عملی از 8 تا 59 ثانیه:

«از گفت‌وگوی جدید، ساخت گروه رو شروع می‌کنیم. گزینهٔ ساخت گروه رو انتخاب می‌کنیم. اسم گروه رو تیم تولید آموزش می‌گذاریم. سارا رو به اعضای گروه اضافه می‌کنیم. امیر رو هم از همون فهرست انتخاب می‌کنیم. شروع گفت‌وگو رو می‌زنیم و منتظر می‌مونیم گروه آماده بشه.»

نمایش نتیجه از 59 تا 66 ثانیه: «گروه تیم تولید آموزش آمادهٔ هماهنگیه.»

پایان از 66 تا 70 ثانیه: «پیش از ارسال پیام، اعضای گروه رو بررسی کن.»

متن حدود 76 واژه دارد؛ برآورد 1.09 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از گفت‌وگوها | متن روی تصویر: هماهنگی چندنفره رو در یک گروه جمع کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا گفت‌وگو جدید؛ قبل از کلیک مکث کوتاه. |
| 8–59 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی ساخت گروه نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 59–66 | نمای نهایی از شروع گفت‌وگو رو می‌زنیم و منتظر می‌مونیم گروه آماده بشه. | موس از روی متن کنار برود؛ پس از موفقیت ساخت و افزودن اعضا، اتاق گروه باز می‌شود. |
| 66–70 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «گفت‌وگو جدید» و نتیجهٔ «شروع گفت‌وگو رو می‌زنیم و منتظر می‌مونیم گروه آماده بشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «گفت‌وگوها» و کنترل «گفت‌وگو جدید» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو مجاز ساخت گروه در سرور و canChat» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پس از موفقیت ساخت و افزودن اعضا، اتاق گروه باز می‌شود.
- [ ] شرط‌های توقف بررسی شدند: ساخت گروه و افزودن اعضا دو درخواست جدا هستند؛ شکست مرحلهٔ دوم ممکن است گروه ساخته‌شده باقی بگذارد. پیش از برداشت مجدد، فهرست و اعضای گروه را بررسی کنید؛ گروه تکراری نسازید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ساخت اتاق گروهی و اضافه‌کردن اعضای منتخب.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 70 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V19 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V20 پاسخ به یک پیام مشخص

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | پاسخ به یک پیام مشخص |
| عنوان انتشار | جوابت رو به همون پیام وصل کن |
| ماژول | گفت‌وگو |
| هدف آموزشی | ارسال پاسخ نقل‌قول‌شده به پیام قبلی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو اتاق با اجازهٔ ارسال |
| سطح | ساده |
| زمان هدف | 55 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /chat → اتاق تیم تولید آموزش |
| پیش‌نیاز | اتاق آزمایشی با پیام «نسخه اول سناریو آماده است.» از سارا نمونه؛ حساب ضبط عضو اتاق باشد. |
| نتیجهٔ یادگیری | ارسال پاسخ نقل‌قول‌شده به پیام قبلی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/views/widgets/chat_message_list_section.dart:1444](../faro-flutter/lib/features/chat/views/widgets/chat_message_list_section.dart#L1444)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40)

### B آماده‌سازی محیط ضبط

با نقش «عضو اتاق با اجازهٔ ارسال» وارد محیط آموزشی شوید. اتاق آزمایشی با پیام «نسخه اول سناریو آماده است.» از سارا نمونه؛ حساب ضبط عضو اتاق باشد.

وضعیت آغاز: گفت‌وگوها باز باشد؛ کنترل «ردیف تیم تولید آموزش» در قاب قابل دیدن باشد. از نوار کناری «گفت‌وگوها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: حالت پاسخ composer را لغو کنید؛ پیام مرجع نمونه در تاریخچه باقی بماند.

خطاها و شرط توقف: گزینهٔ پاسخ فقط با callback و اجازهٔ ارسال نمایش داده می‌شود؛ پیام حذف‌شده یا اتاق فقط‌خواندنی برای ضبط مناسب نیست. این قابلیت با گفت‌وگوی موضوعی تفاوت دارد.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| پیام مبدأ | نسخه اول سناریو آماده است. | از قبل در اتاق باشد. |
| پاسخ | ممنون، تا ساعت ۱۵ بازبینی می‌کنم. | برای حساب‌های آموزشی |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | گفت‌وگوها | ردیف تیم تولید آموزش | کلیک | پیام‌های گروه باز می‌شوند. |
| 2 | پیام مبدأ | حباب نسخه اول سناریو آماده است. | راست‌کلیک | منوی همان پیام باز می‌شود. |
| 3 | منوی پیام | پاسخ | کلیک | پیش‌نمایش پیام مرجع بالای ورودی ظاهر می‌شود. |
| 4 | ورودی اتاق | پیام خود را بگذارید... | تایپ؛ «ممنون، تا ساعت ۱۵ بازبینی می‌کنم.» را وارد کنید | متن همراه مرجع آماده است. |
| 5 | ورودی اتاق | ارسال پیام | کلیک | پیام تازه با پیش‌نمایش مرجع در تاریخچه دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | گفت‌وگوها | ردیف تیم تولید آموزش | کلیک | — | پیام‌های گروه باز می‌شوند. | نام اتاق و پیام مبدأ | اتاق آموزشی رو باز می‌کنیم و پیام موردنظر رو پیدا می‌کنیم. |
| 2 · 16–24 ثانیه | پیام مبدأ | حباب نسخه اول سناریو آماده است. | راست‌کلیک | — | منوی همان پیام باز می‌شود. | حباب و منو | روی همون پیام راست‌کلیک می‌کنیم. |
| 3 · 24–31 ثانیه | منوی پیام | پاسخ | کلیک | — | پیش‌نمایش پیام مرجع بالای ورودی ظاهر می‌شود. | گزینه و نوار پاسخ | پاسخ رو می‌زنیم تا مرجع جواب مشخص باشه. |
| 4 · 31–38 ثانیه | ورودی اتاق | پیام خود را بگذارید... | تایپ | ممنون، تا ساعت ۱۵ بازبینی می‌کنم. | متن همراه مرجع آماده است. | نوار مرجع و متن | جواب رو در کادر می‌نویسیم. |
| 5 · 38–45 ثانیه | ورودی اتاق | ارسال پیام | کلیک | — | پیام تازه با پیش‌نمایش مرجع در تاریخچه دیده می‌شود. | پیام پاسخ | ارسال رو می‌زنیم؛ حالا معلومه جواب مربوط به کدوم پیامه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «وقتی چند بحث همزمانه، یک جواب کوتاه ممکنه مبهم باشه.»

معرفی مسئله از 4 تا 8 ثانیه: «به یک پیام مشخص در گروه پاسخ می‌دیم.»

آموزش عملی از 8 تا 45 ثانیه:

«اتاق آموزشی رو باز می‌کنیم و پیام موردنظر رو پیدا می‌کنیم. روی همون پیام راست‌کلیک می‌کنیم. پاسخ رو می‌زنیم تا مرجع جواب مشخص باشه. جواب رو در کادر می‌نویسیم. ارسال رو می‌زنیم؛ حالا معلومه جواب مربوط به کدوم پیامه.»

نمایش نتیجه از 45 تا 51 ثانیه: «جواب ما به پیام مشخص وصل شده.»

پایان از 51 تا 55 ثانیه: «با پاسخ مستقیم، پیگیری بحث برای بقیه هم راحت‌تر می‌شه.»

متن حدود 74 واژه دارد؛ برآورد 1.35 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از گفت‌وگوها | متن روی تصویر: جوابت رو به همون پیام وصل کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ردیف تیم تولید آموزش؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی حباب نسخه اول سناریو آماده است. نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از ارسال رو می‌زنیم؛ حالا معلومه جواب مربوط به کدوم پیامه. | موس از روی متن کنار برود؛ پیام تازه با پیش‌نمایش مرجع در تاریخچه دیده می‌شود. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ردیف تیم تولید آموزش» و نتیجهٔ «ارسال رو می‌زنیم؛ حالا معلومه جواب مربوط به کدوم پیامه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «گفت‌وگوها» و کنترل «ردیف تیم تولید آموزش» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو اتاق با اجازهٔ ارسال» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پیام تازه با پیش‌نمایش مرجع در تاریخچه دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: گزینهٔ پاسخ فقط با callback و اجازهٔ ارسال نمایش داده می‌شود؛ پیام حذف‌شده یا اتاق فقط‌خواندنی برای ضبط مناسب نیست. این قابلیت با گفت‌وگوی موضوعی تفاوت دارد.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ارسال پاسخ نقل‌قول‌شده به پیام قبلی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V20 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V21 فوروارد پیام به همکار

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | فوروارد پیام به همکار |
| عنوان انتشار | یک پیام رو با زمینهٔ لازم منتقل کن |
| ماژول | گفت‌وگو |
| هدف آموزشی | ارسال مجدد پیام به مقصد انتخاب‌شده همراه یادداشت اختیاری |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو اتاق مبدأ با مجوز ارسال به مقصد |
| سطح | متوسط |
| زمان هدف | 70 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /chat |
| پیش‌نیاز | پیام نمونه در اتاق آموزشی؛ امیر نمونه مقصد مجاز و فعال باشد. گیرنده فقط حساب آزمون باشد. |
| نتیجهٔ یادگیری | ارسال مجدد پیام به مقصد انتخاب‌شده همراه یادداشت اختیاری |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/forward_message_dialog.dart:119](../faro-flutter/lib/features/chat/views/widgets/forward_message_dialog.dart#L119)؛ [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40)

### B آماده‌سازی محیط ضبط

با نقش «عضو اتاق مبدأ با مجوز ارسال به مقصد» وارد محیط آموزشی شوید. پیام نمونه در اتاق آموزشی؛ امیر نمونه مقصد مجاز و فعال باشد. گیرنده فقط حساب آزمون باشد.

وضعیت آغاز: اتاق آموزشی باز باشد؛ کنترل «حباب پیام نمونه» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پنجرهٔ فوروارد و مقصدها پاک باشند؛ پیام نمونهٔ مبدأ موجود بماند.

خطاها و شرط توقف: ممکن است اتاق مستقیم مقصد هنگام ارسال ایجاد شود. به معنی دسترسی گیرنده به کل اتاق مبدأ نیست. هیچ دادهٔ واقعی تیم برای نمونه فوروارد نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| پیام مبدأ | نسخه اول سناریو آماده است. | بدون محتوای واقعی |
| یادداشت اختیاری | لطفاً بخش شروع ویدیو را بررسی کن. | متن همراه پیام |
| مقصد | امیر نمونه | هویت مقصد بررسی شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | اتاق آموزشی | حباب پیام نمونه | راست‌کلیک | منوی پیام باز می‌شود. |
| 2 | منوی پیام | فوروارد | کلیک | پنجرهٔ ارسال مجدد پیام باز می‌شود. |
| 3 | ارسال مجدد پیام | یادداشت اختیاری | تایپ؛ «لطفاً بخش شروع ویدیو را بررسی کن.» را وارد کنید | یادداشت همراه پیام آماده است. |
| 4 | همان پنجره | جست‌وجو... و ردیف امیر نمونه | تایپ و انتخاب؛ «امیر نمونه» را وارد کنید | مقصد انتخاب می‌شود. |
| 5 | ارسال مجدد پیام | ارسال | کلیک | پیام به مقصد انتخاب‌شده ارسال می‌شود؛ اعلان یا بسته‌شدن پنجره بررسی شود. |
| 6 | گفت‌وگوها → گفت‌وگوی امیر نمونه | پیام منتقل‌شده | بازکردن مقصد و مکث | اصل پیام و یادداشت در اتاق مقصد قابل مشاهده‌اند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | اتاق آموزشی | حباب پیام نمونه | راست‌کلیک | — | منوی پیام باز می‌شود. | حباب | منوی پیامی رو باز می‌کنیم که می‌خوایم منتقلش کنیم. |
| 2 · 17–26 ثانیه | منوی پیام | فوروارد | کلیک | — | پنجرهٔ ارسال مجدد پیام باز می‌شود. | گزینه و عنوان پنجره | فوروارد رو انتخاب می‌کنیم. |
| 3 · 26–35 ثانیه | ارسال مجدد پیام | یادداشت اختیاری | تایپ | لطفاً بخش شروع ویدیو را بررسی کن. | یادداشت همراه پیام آماده است. | فیلد یادداشت | با یک یادداشت کوتاه می‌گیم از گیرنده چه کاری می‌خوایم. |
| 4 · 35–43 ثانیه | همان پنجره | جست‌وجو... و ردیف امیر نمونه | تایپ و انتخاب | امیر نمونه | مقصد انتخاب می‌شود. | هویت مقصد | امیر نمونه رو پیدا می‌کنیم و مقصد رو بررسی می‌کنیم. |
| 5 · 43–51 ثانیه | ارسال مجدد پیام | ارسال | کلیک | — | پیام به مقصد انتخاب‌شده ارسال می‌شود؛ اعلان یا بسته‌شدن پنجره بررسی شود. | دکمه و نتیجه | ارسال رو می‌زنیم. |
| 6 · 51–59 ثانیه | گفت‌وگوها → گفت‌وگوی امیر نمونه | پیام منتقل‌شده | بازکردن مقصد و مکث | — | اصل پیام و یادداشت در اتاق مقصد قابل مشاهده‌اند. | محتوای مقصد | در گفت‌وگوی مقصد، پیام و یادداشت رو بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «همکارت باید یک پیام رو ببینه، ولی زمینهٔ بحث رو نداره؟»

معرفی مسئله از 4 تا 8 ثانیه: «پیام نمونه رو همراه یک یادداشت منتقل می‌کنیم.»

آموزش عملی از 8 تا 59 ثانیه:

«منوی پیامی رو باز می‌کنیم که می‌خوایم منتقلش کنیم. فوروارد رو انتخاب می‌کنیم. با یک یادداشت کوتاه می‌گیم از گیرنده چه کاری می‌خوایم. امیر نمونه رو پیدا می‌کنیم و مقصد رو بررسی می‌کنیم. ارسال رو می‌زنیم. در گفت‌وگوی مقصد، پیام و یادداشت رو بررسی می‌کنیم.»

نمایش نتیجه از 59 تا 66 ثانیه: «پیام همراه توضیح لازم به مقصد آموزشی منتقل شد.»

پایان از 66 تا 70 ثانیه: «همیشه قبل از ارسال مجدد، گیرنده رو دوباره بررسی کن.»

متن حدود 83 واژه دارد؛ برآورد 1.19 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از اتاق آموزشی | متن روی تصویر: یک پیام رو با زمینهٔ لازم منتقل کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا حباب پیام نمونه؛ قبل از کلیک مکث کوتاه. |
| 8–59 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی فوروارد نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 59–66 | نمای نهایی از در گفت‌وگوی مقصد، پیام و یادداشت رو بررسی می‌کنیم. | موس از روی متن کنار برود؛ اصل پیام و یادداشت در اتاق مقصد قابل مشاهده‌اند. |
| 66–70 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «حباب پیام نمونه» و نتیجهٔ «در گفت‌وگوی مقصد، پیام و یادداشت رو بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «اتاق آموزشی» و کنترل «حباب پیام نمونه» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو اتاق مبدأ با مجوز ارسال به مقصد» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: اصل پیام و یادداشت در اتاق مقصد قابل مشاهده‌اند.
- [ ] شرط‌های توقف بررسی شدند: ممکن است اتاق مستقیم مقصد هنگام ارسال ایجاد شود. به معنی دسترسی گیرنده به کل اتاق مبدأ نیست. هیچ دادهٔ واقعی تیم برای نمونه فوروارد نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ارسال مجدد پیام به مقصد انتخاب‌شده همراه یادداشت اختیاری.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 70 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V21 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V22 ارسال فایل در گفت‌وگو

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ارسال فایل در گفت‌وگو |
| عنوان انتشار | فایل نمونه رو کنار پیام تیم بفرست |
| ماژول | گفت‌وگو |
| هدف آموزشی | انتخاب فایل، نوشتن توضیح و ارسال پیوست در اتاق |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو اتاق با امکان ارسال |
| سطح | ساده |
| زمان هدف | 60 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /chat → تیم تولید آموزش |
| پیش‌نیاز | فایل sample-brief.txt موجود؛ اتاق فقط شامل حساب‌های آزمون. هیچ فایل سیستمی یا سند شخصی انتخاب نشود. |
| نتیجهٔ یادگیری | انتخاب فایل، نوشتن توضیح و ارسال پیوست در اتاق |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)؛ [lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart:140](../faro-flutter/lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart#L140)؛ [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40)

### B آماده‌سازی محیط ضبط

با نقش «عضو اتاق با امکان ارسال» وارد محیط آموزشی شوید. فایل sample-brief.txt موجود؛ اتاق فقط شامل حساب‌های آزمون. هیچ فایل سیستمی یا سند شخصی انتخاب نشود.

وضعیت آغاز: اتاق آموزشی باز باشد؛ کنترل «افزودن پیوست یا فایل» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: فایل و متن staged را پاک کنید؛ فایل نمونه را بازنویسی نکنید.

خطاها و شرط توقف: این ویدیو پیام صوتی نیست؛ کنترل ضبط صوت چت در این نسخه «بزودی» است. حد حجم مشخصی برای تمام فایل‌های چت از محدودیت نامه‌ها تعمیم ندهید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| فایل | sample-brief.txt | از assets بسته |
| پیام | برنامه نمونه ضبط برای بازبینی پیوست شد. | توضیح همراه فایل |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | اتاق آموزشی | افزودن پیوست یا فایل | کلیک روی آیکون | منوی پیوست باز می‌شود. |
| 2 | منوی پیوست | پیوست فایل | کلیک | انتخابگر سیستم باز می‌شود. |
| 3 | انتخابگر سیستم | sample-brief.txt | انتخاب و بازکردن؛ «sample-brief.txt» را وارد کنید | فایل در ورودی آمادهٔ ارسال دیده می‌شود. |
| 4 | ورودی گفت‌وگو | پیام خود را بگذارید... | تایپ؛ «برنامه نمونه ضبط برای بازبینی پیوست شد.» را وارد کنید | متن و فایل در ورودی حاضرند. |
| 5 | ورودی گفت‌وگو | ارسال پیام | کلیک و انتظار بارگذاری | پیام دارای پیوست در تاریخچه ثبت می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | اتاق آموزشی | افزودن پیوست یا فایل | کلیک روی آیکون | — | منوی پیوست باز می‌شود. | کنترل کنار ورودی | از کنار کادر پیام، افزودن پیوست یا فایل رو باز می‌کنیم. |
| 2 · 17–26 ثانیه | منوی پیوست | پیوست فایل | کلیک | — | انتخابگر سیستم باز می‌شود. | گزینهٔ فایل | پیوست فایل رو انتخاب می‌کنیم. |
| 3 · 26–34 ثانیه | انتخابگر سیستم | sample-brief.txt | انتخاب و بازکردن | sample-brief.txt | فایل در ورودی آمادهٔ ارسال دیده می‌شود. | نام فایل | فایل نمونه رو انتخاب می‌کنیم و نامش رو بررسی می‌کنیم. |
| 4 · 34–42 ثانیه | ورودی گفت‌وگو | پیام خود را بگذارید... | تایپ | برنامه نمونه ضبط برای بازبینی پیوست شد. | متن و فایل در ورودی حاضرند. | نام فایل و توضیح | یک توضیح هم کنار فایل می‌نویسیم. |
| 5 · 42–50 ثانیه | ورودی گفت‌وگو | ارسال پیام | کلیک و انتظار بارگذاری | — | پیام دارای پیوست در تاریخچه ثبت می‌شود. | حباب دارای فایل | ارسال رو می‌زنیم و منتظر می‌مونیم فایل ثبت بشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «فایل بدون توضیح، برای تیم مبهم می‌مونه.»

معرفی مسئله از 4 تا 8 ثانیه: «فایل آموزشی رو همراه توضیح می‌فرستیم.»

آموزش عملی از 8 تا 50 ثانیه:

«از کنار کادر پیام، افزودن پیوست یا فایل رو باز می‌کنیم. پیوست فایل رو انتخاب می‌کنیم. فایل نمونه رو انتخاب می‌کنیم و نامش رو بررسی می‌کنیم. یک توضیح هم کنار فایل می‌نویسیم. ارسال رو می‌زنیم و منتظر می‌مونیم فایل ثبت بشه.»

نمایش نتیجه از 50 تا 56 ثانیه: «فایل نمونه کنار توضیحش در اتاق ثبت شد.»

پایان از 56 تا 60 ثانیه: «نام و محتوای فایل رو قبل از ارسال بررسی کن.»

متن حدود 72 واژه دارد؛ برآورد 1.20 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از اتاق آموزشی | متن روی تصویر: فایل نمونه رو کنار پیام تیم بفرست؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا افزودن پیوست یا فایل؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی پیوست فایل نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از ارسال رو می‌زنیم و منتظر می‌مونیم فایل ثبت بشه. | موس از روی متن کنار برود؛ پیام دارای پیوست در تاریخچه ثبت می‌شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «افزودن پیوست یا فایل» و نتیجهٔ «ارسال رو می‌زنیم و منتظر می‌مونیم فایل ثبت بشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «اتاق آموزشی» و کنترل «افزودن پیوست یا فایل» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو اتاق با امکان ارسال» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پیام دارای پیوست در تاریخچه ثبت می‌شود.
- [ ] شرط‌های توقف بررسی شدند: این ویدیو پیام صوتی نیست؛ کنترل ضبط صوت چت در این نسخه «بزودی» است. حد حجم مشخصی برای تمام فایل‌های چت از محدودیت نامه‌ها تعمیم ندهید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتخاب فایل، نوشتن توضیح و ارسال پیوست در اتاق.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V22 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V23 توضیح پیام با هوش مصنوعی

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | توضیح پیام با هوش مصنوعی |
| عنوان انتشار | از متن گفت‌وگو به توضیح قابل فهم برس |
| ماژول | گفت‌وگو و هوش مصنوعی |
| هدف آموزشی | انتقال یک پیام نمونه از منوی چت به جریان توضیح هوش مصنوعی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر مجاز چت و هوش مصنوعی با سهمیهٔ فعال |
| سطح | متوسط |
| زمان هدف | 55 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /chat → /ai/conversation/new → گفت‌وگوی ایجادشده |
| پیش‌نیاز | پیام «برنامه ضبط: آماده‌سازی داده، ضبط تصویر، بازبینی نریشن و تدوین.» در اتاق آموزشی؛ متن فقط نمونه باشد. مدل متنی قابل استفاده. |
| نتیجهٔ یادگیری | انتقال یک پیام نمونه از منوی چت به جریان توضیح هوش مصنوعی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41)؛ [lib/features/chat/views/chat_view.dart:41](../faro-flutter/lib/features/chat/views/chat_view.dart#L41)؛ [lib/features/chat/services/chat_ai_attachment_service.dart:9](../faro-flutter/lib/features/chat/services/chat_ai_attachment_service.dart#L9)؛ [lib/features/chat/views/widgets/chat_message_list_section.dart:1444](../faro-flutter/lib/features/chat/views/widgets/chat_message_list_section.dart#L1444)

### B آماده‌سازی محیط ضبط

با نقش «کاربر مجاز چت و هوش مصنوعی با سهمیهٔ فعال» وارد محیط آموزشی شوید. پیام «برنامه ضبط: آماده‌سازی داده، ضبط تصویر، بازبینی نریشن و تدوین.» در اتاق آموزشی؛ متن فقط نمونه باشد. مدل متنی قابل استفاده.

وضعیت آغاز: اتاق آموزشی باز باشد؛ کنترل «حباب برنامه ضبط» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: هیچ جریان AI در حال تولید نباشد؛ پیام آموزشی بدون فایل در اتاق مبدأ حاضر باشد.

خطاها و شرط توقف: این انتقال در callback _explainWithAi اثبات شده؛ موفقیت در اجرا هنوز آزموده نشده است. اگر پاسخ AI دیگری در حال تولید باشد عملیات با خطای مشغول متوقف می‌شود. در این برداشت فایل و گفت‌وگوی موجود انتخاب نشوند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| پیام نمونه | برنامه ضبط: آماده‌سازی داده، ضبط تصویر، بازبینی نریشن و تدوین. | از قبل توسط حساب آزمون ارسال شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | اتاق آموزشی | حباب برنامه ضبط | راست‌کلیک | منوی پیام باز می‌شود. |
| 2 | منوی پیام | توضیح با هوش مصنوعی | کلیک | گفت‌وگوی تازه باز می‌شود و درخواست توضیح به‌طور خودکار در همان گفتگو فرستاده می‌شود. |
| 3 | گفت‌وگوی هوش مصنوعی | پیام منتقل‌شده | مکث و بررسی | متن نمونه در زمینهٔ درخواست دیده می‌شود. |
| 4 | گفت‌وگوی هوش مصنوعی | پاسخ مدل | انتظار تا تکمیل | توضیح مدل یا خطای سرویس نمایش داده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | اتاق آموزشی | حباب برنامه ضبط | راست‌کلیک | — | منوی پیام باز می‌شود. | حباب و منو | روی پیام نمونه راست‌کلیک می‌کنیم. |
| 2 · 18–27 ثانیه | منوی پیام | توضیح با هوش مصنوعی | کلیک | — | گفت‌وگوی تازه باز می‌شود و درخواست توضیح به‌طور خودکار در همان گفتگو فرستاده می‌شود. | گزینهٔ جادویی و مقصد AI | توضیح با هوش مصنوعی رو می‌زنیم؛ درخواست توضیح خودکار ارسال می‌شه. |
| 3 · 27–36 ثانیه | گفت‌وگوی هوش مصنوعی | پیام منتقل‌شده | مکث و بررسی | — | متن نمونه در زمینهٔ درخواست دیده می‌شود. | متن ورودی یا پیام ساخته‌شده | اول بررسی می‌کنیم همون متن نمونه منتقل شده باشه. |
| 4 · 36–45 ثانیه | گفت‌وگوی هوش مصنوعی | پاسخ مدل | انتظار تا تکمیل | — | توضیح مدل یا خطای سرویس نمایش داده می‌شود. | پاسخ نهایی | بعد توضیح مدل رو می‌خونیم و با پیام اصلی می‌سنجیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «یک پیام فشرده رو می‌خوای روشن‌تر بفهمی؟»

معرفی مسئله از 4 تا 8 ثانیه: «از منوی همون پیام، توضیح هوش مصنوعی رو می‌گیریم.»

آموزش عملی از 8 تا 45 ثانیه:

«روی پیام نمونه راست‌کلیک می‌کنیم. توضیح با هوش مصنوعی رو می‌زنیم؛ درخواست توضیح خودکار ارسال می‌شه. اول بررسی می‌کنیم همون متن نمونه منتقل شده باشه. بعد توضیح مدل رو می‌خونیم و با پیام اصلی می‌سنجیم.»

نمایش نتیجه از 45 تا 51 ثانیه: «از پیام نمونه به توضیح پیشنهادی مدل رسیدیم.»

پایان از 51 تا 55 ثانیه: «توضیح مدل رو جایگزین بررسی متن اصلی نکن.»

متن حدود 67 واژه دارد؛ برآورد 1.22 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از اتاق آموزشی | متن روی تصویر: از متن گفت‌وگو به توضیح قابل فهم برس؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا حباب برنامه ضبط؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی توضیح با هوش مصنوعی نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از بعد توضیح مدل رو می‌خونیم و با پیام اصلی می‌سنجیم. | موس از روی متن کنار برود؛ توضیح مدل یا خطای سرویس نمایش داده می‌شود. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «حباب برنامه ضبط» و نتیجهٔ «بعد توضیح مدل رو می‌خونیم و با پیام اصلی می‌سنجیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «اتاق آموزشی» و کنترل «حباب برنامه ضبط» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر مجاز چت و هوش مصنوعی با سهمیهٔ فعال» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: توضیح مدل یا خطای سرویس نمایش داده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: این انتقال در callback _explainWithAi اثبات شده؛ موفقیت در اجرا هنوز آزموده نشده است. اگر پاسخ AI دیگری در حال تولید باشد عملیات با خطای مشغول متوقف می‌شود. در این برداشت فایل و گفت‌وگوی موجود انتخاب نشوند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتقال یک پیام نمونه از منوی چت به جریان توضیح هوش مصنوعی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V23 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V24 ایجاد وظیفه در پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ایجاد وظیفه در پروژه |
| عنوان انتشار | یک کار مشخص رو به وظیفه تبدیل کن |
| ماژول | وظایف |
| هدف آموزشی | ثبت وظیفه با عنوان، توضیح، پروژه و مسئول انجام مشخص |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو مجاز ایجاد وظیفه؛ مجوز نهایی از سرور |
| سطح | متوسط |
| زمان هدف | 90 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /tasks |
| پیش‌نیاز | پروژهٔ انتشار پاییز و حساب سارا نمونه موجود؛ پروژه حداقل یک بورد و ستون «برای انجام» داشته باشد؛ اطلاعات فرم بدون خطا بارگیری شوند. |
| نتیجهٔ یادگیری | ثبت وظیفه با عنوان، توضیح، پروژه و مسئول انجام مشخص |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/tasks/task_creation/views/task_creation_dialog.dart:207](../faro-flutter/lib/features/tasks/task_creation/views/task_creation_dialog.dart#L207)؛ [lib/features/tasks/task_creation/view_models/task_creation_view_model.dart:533](../faro-flutter/lib/features/tasks/task_creation/view_models/task_creation_view_model.dart#L533)؛ [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)

### B آماده‌سازی محیط ضبط

با نقش «عضو مجاز ایجاد وظیفه؛ مجوز نهایی از سرور» وارد محیط آموزشی شوید. پروژهٔ انتشار پاییز و حساب سارا نمونه موجود؛ پروژه حداقل یک بورد و ستون «برای انجام» داشته باشد؛ اطلاعات فرم بدون خطا بارگیری شوند.

وضعیت آغاز: وظایف باز باشد؛ کنترل «ایجاد وظیفه» در قاب قابل دیدن باشد. از نوار کناری «وظایف» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: برای هر برداشت وظیفهٔ مصرفی مستقل آماده کنید؛ عنوان، مسئول و ستون را از پیش بررسی کنید.

خطاها و شرط توقف: تب «وظایف من» ممکن است وظیفه‌ای را که فقط به سارا محول شده نشان ندهد؛ از پیگیری از دیگران یا بورد پروژه بررسی کنید. نبود پروژه یا خطای metadata ایجاد را متوقف می‌کند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| عنوان | بازبینی سناریوی شروع کار | غیرخالی |
| توضیحات | متن نریشن و ترتیب کلیک‌ها با نسخه فعلی فارو تطبیق داده شود. | متن نمایشی |
| پروژه | انتشار پاییز | حتماً صریح انتخاب و کنترل شود. |
| مسئول انجام | سارا نمونه | فهرست چندانتخابی؛ حساب جاری پیش‌فرض ممکن است انتخاب باشد. |
| لیست تخته | برای انجام | ستون از قبل موجود |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | وظایف | ایجاد وظیفه | کلیک | فرم ایجاد وظیفه جدید باز می‌شود. |
| 2 | فرم ایجاد | عنوان | تایپ؛ «بازبینی سناریوی شروع کار» را وارد کنید | عنوان معتبر می‌شود. |
| 3 | فرم ایجاد | توضیحات | تایپ؛ «متن نریشن و ترتیب کلیک‌ها با نسخه فعلی فارو تطبیق داده شود.» را وارد کنید | شرح ثبت می‌شود. |
| 4 | فرم ایجاد | پروژه | بازکردن و انتخاب؛ «انتشار پاییز» را وارد کنید | بورد، ستون‌ها و اعضای پروژه بارگیری می‌شوند. |
| 5 | فرم ایجاد | مسئول انجام → افزودن مسئول انجام | بازکردن و انتخاب سارا؛ برداشتن حساب جاری اگر انتخاب است؛ «سارا نمونه» را وارد کنید | فقط سارا به‌عنوان مسئول این نمونه انتخاب شده است. |
| 6 | فرم ایجاد | لیست تخته | انتخاب؛ «برای انجام» را وارد کنید | ستون مقصد مشخص می‌شود. |
| 7 | پایین فرم | ایجاد وظیفه | کلیک | پیام وظیفه با موفقیت ایجاد شد نمایش داده می‌شود. |
| 8 | پروژه یا پیگیری از دیگران | بازبینی سناریوی شروع کار | بازکردن نتیجه | جزئیات عنوان، پروژه و مسئول قابل بررسی‌اند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 9–18 ثانیه | وظایف | ایجاد وظیفه | کلیک | — | فرم ایجاد وظیفه جدید باز می‌شود. | دکمه و فرم | از وظایف، ایجاد وظیفه رو می‌زنیم. |
| 2 · 18–27 ثانیه | فرم ایجاد | عنوان | تایپ | بازبینی سناریوی شروع کار | عنوان معتبر می‌شود. | فیلد عنوان | عنوان رو طوری می‌نویسیم که خود کار مشخص باشه. |
| 3 · 27–36 ثانیه | فرم ایجاد | توضیحات | تایپ | متن نریشن و ترتیب کلیک‌ها با نسخه فعلی فارو تطبیق داده شود. | شرح ثبت می‌شود. | شرح وظیفه | در توضیحات، نتیجه‌ای رو که انتظار داریم می‌نویسیم. |
| 4 · 36–44 ثانیه | فرم ایجاد | پروژه | بازکردن و انتخاب | انتشار پاییز | بورد، ستون‌ها و اعضای پروژه بارگیری می‌شوند. | نام پروژهٔ انتخابی | پروژهٔ انتشار پاییز رو انتخاب و نامش رو بررسی می‌کنیم. |
| 5 · 44–52 ثانیه | فرم ایجاد | مسئول انجام → افزودن مسئول انجام | بازکردن و انتخاب سارا؛ برداشتن حساب جاری اگر انتخاب است | سارا نمونه | فقط سارا به‌عنوان مسئول این نمونه انتخاب شده است. | نام مسئول و فهرست انتخاب | مسئول این کار رو سارا می‌گذاریم و انتخاب‌های اضافی رو برمی‌داریم. |
| 6 · 52–60 ثانیه | فرم ایجاد | لیست تخته | انتخاب | برای انجام | ستون مقصد مشخص می‌شود. | نام ستون | وظیفه رو در لیست برای انجام قرار می‌دیم. |
| 7 · 60–68 ثانیه | پایین فرم | ایجاد وظیفه | کلیک | — | پیام وظیفه با موفقیت ایجاد شد نمایش داده می‌شود. | دکمه و اعلان | ایجاد وظیفه رو می‌زنیم تا کار ثبت بشه. |
| 8 · 68–76 ثانیه | پروژه یا پیگیری از دیگران | بازبینی سناریوی شروع کار | بازکردن نتیجه | — | جزئیات عنوان، پروژه و مسئول قابل بررسی‌اند. | سه فیلد ذخیره‌شده | در جزئیات، پروژه و مسئول ثبت‌شده رو دوباره بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «یک کار وقتی قابل پیگیریه که عنوان و مسئولش روشن باشه.»

معرفی مسئله از 4 تا 9 ثانیه: «کار رو با پروژه و مسئول مشخص ثبت می‌کنیم.»

آموزش عملی از 9 تا 76 ثانیه:

«از وظایف، ایجاد وظیفه رو می‌زنیم. عنوان رو طوری می‌نویسیم که خود کار مشخص باشه. در توضیحات، نتیجه‌ای رو که انتظار داریم می‌نویسیم. پروژهٔ انتشار پاییز رو انتخاب و نامش رو بررسی می‌کنیم. مسئول این کار رو سارا می‌گذاریم و انتخاب‌های اضافی رو برمی‌داریم. وظیفه رو در لیست برای انجام قرار می‌دیم. ایجاد وظیفه رو می‌زنیم تا کار ثبت بشه. در جزئیات، پروژه و مسئول ثبت‌شده رو دوباره بررسی می‌کنیم.»

نمایش نتیجه از 76 تا 85 ثانیه: «وظیفه با پروژه و مسئول مشخص ثبت شد.»

پایان از 85 تا 90 ثانیه: «در قدم بعد، می‌تونیم مهلت انجام رو تنظیم کنیم.»

متن حدود 107 واژه دارد؛ برآورد 1.19 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از وظایف | متن روی تصویر: یک کار مشخص رو به وظیفه تبدیل کن؛ هوک همزمان خوانده شود. |
| 4–9 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ایجاد وظیفه؛ قبل از کلیک مکث کوتاه. |
| 9–76 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی عنوان نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 76–85 | نمای نهایی از در جزئیات، پروژه و مسئول ثبت‌شده رو دوباره بررسی می‌کنیم. | موس از روی متن کنار برود؛ جزئیات عنوان، پروژه و مسئول قابل بررسی‌اند. |
| 85–90 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ایجاد وظیفه» و نتیجهٔ «در جزئیات، پروژه و مسئول ثبت‌شده رو دوباره بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «وظایف» و کنترل «ایجاد وظیفه» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو مجاز ایجاد وظیفه؛ مجوز نهایی از سرور» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: جزئیات عنوان، پروژه و مسئول قابل بررسی‌اند.
- [ ] شرط‌های توقف بررسی شدند: تب «وظایف من» ممکن است وظیفه‌ای را که فقط به سارا محول شده نشان ندهد؛ از پیگیری از دیگران یا بورد پروژه بررسی کنید. نبود پروژه یا خطای metadata ایجاد را متوقف می‌کند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ثبت وظیفه با عنوان، توضیح، پروژه و مسئول انجام مشخص.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 90 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V24 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V25 تنظیم مهلت و یادآوری وظیفه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | تنظیم مهلت و یادآوری وظیفه |
| عنوان انتشار | مهلت انجام و یادآوری رو جدا تنظیم کن |
| ماژول | وظایف |
| هدف آموزشی | تنظیم سررسید فردا و یادآوری فردا ساعت ۱۰ برای وظیفهٔ موجود |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر با task.canEdit |
| سطح | متوسط |
| زمان هدف | 90 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /tasks → جزئیات وظیفه |
| پیش‌نیاز | وظیفهٔ بازبینی سناریوی شروع کار موجود، قابل ویرایش و بدون یادآوری؛ ساعت و منطقهٔ زمانی رایانه درست باشد. اعلان محلی فقط روی دستگاه فعلی ارزیابی می‌شود. |
| نتیجهٔ یادگیری | تنظیم سررسید فردا و یادآوری فردا ساعت ۱۰ برای وظیفهٔ موجود |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/app/widgets/app_task_date_menu.dart:8](../faro-flutter/lib/app/widgets/app_task_date_menu.dart#L8)؛ [lib/app/widgets/app_task_reminder_field.dart:14](../faro-flutter/lib/app/widgets/app_task_reminder_field.dart#L14)؛ [lib/app/widgets/app_time_picker_dialog.dart:336](../faro-flutter/lib/app/widgets/app_time_picker_dialog.dart#L336)

### B آماده‌سازی محیط ضبط

با نقش «کاربر با task.canEdit» وارد محیط آموزشی شوید. وظیفهٔ بازبینی سناریوی شروع کار موجود، قابل ویرایش و بدون یادآوری؛ ساعت و منطقهٔ زمانی رایانه درست باشد. اعلان محلی فقط روی دستگاه فعلی ارزیابی می‌شود.

وضعیت آغاز: وظایف یا بورد پروژه باز باشد؛ کنترل «بازبینی سناریوی شروع کار» در قاب قابل دیدن باشد. از نوار کناری «وظایف» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: مهلت و یادآوری وظیفهٔ کپی پاک باشند؛ فردا و زمان ساعت دستگاه دوباره بررسی شوند.

خطاها و شرط توقف: زمان گذشته پذیرفته نمی‌شود. ذخیرهٔ زمان به معنی تأیید نمایش اعلان روی همهٔ دستگاه‌ها نیست؛ پیام «یادآوری ذخیره شد، اما سیستم‌عامل اجازهٔ زمان‌بندی اعلان را نداد» نباید مخفی شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| مهلت انجام تا | فردا نسبت به روز ضبط | تاریخ تقویمی در برگهٔ برداشت ثبت شود. |
| یادآوری | فردا ساعت ۱۰:۰۰ | همواره در آینده؛ مستقل از مهلت |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | وظایف یا بورد پروژه | بازبینی سناریوی شروع کار | کلیک | جزئیات وظیفه باز می‌شود. |
| 2 | جزئیات وظیفه | ویرایش با آیکون مداد | کلیک | فیلدها قابل ویرایش می‌شوند. |
| 3 | ردیف مهلت انجام تا | انتخاب تاریخ → فردا | کلیک و انتخاب؛ «فردا» را وارد کنید | سررسید روی تاریخ فردا قرار می‌گیرد. |
| 4 | ردیف یادآوری | انتخاب یادآوری → فردا | کلیک و انتخاب؛ «فردا» را وارد کنید | پنجرهٔ انتخاب ساعت باز می‌شود. |
| 5 | انتخاب ساعت | ساعت و دقیقه | تنظیم؛ «۱۰ و ۰۰» را وارد کنید | ساعت انتخاب‌شده ۱۰:۰۰ می‌شود. |
| 6 | انتخاب ساعت | تأیید | کلیک | تاریخ و ساعت در ردیف یادآوری دیده می‌شود. |
| 7 | جزئیات در حالت ویرایش | ذخیره تغییرات | کلیک | اطلاعات ذخیره می‌شوند؛ ممکن است اعلان مجوز سیستم ظاهر شود. |
| 8 | جزئیات ذخیره‌شده | مهلت انجام تا و یادآوری | مکث | هر دو مقدار قابل مشاهده‌اند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 9–18 ثانیه | وظایف یا بورد پروژه | بازبینی سناریوی شروع کار | کلیک | — | جزئیات وظیفه باز می‌شود. | عنوان وظیفه | جزئیات همون وظیفه رو باز می‌کنیم. |
| 2 · 18–27 ثانیه | جزئیات وظیفه | ویرایش با آیکون مداد | کلیک | — | فیلدها قابل ویرایش می‌شوند. | کنترل و فیلدها | ویرایش رو می‌زنیم تا تاریخ‌ها قابل تغییر بشن. |
| 3 · 27–36 ثانیه | ردیف مهلت انجام تا | انتخاب تاریخ → فردا | کلیک و انتخاب | فردا | سررسید روی تاریخ فردا قرار می‌گیرد. | ردیف مهلت | برای مهلت انجام، فردا رو انتخاب می‌کنیم. |
| 4 · 36–44 ثانیه | ردیف یادآوری | انتخاب یادآوری → فردا | کلیک و انتخاب | فردا | پنجرهٔ انتخاب ساعت باز می‌شود. | ردیف یادآوری و پنجره ساعت | یادآوری رو جدا باز می‌کنیم و تاریخ فردا رو می‌دیم. |
| 5 · 44–52 ثانیه | انتخاب ساعت | ساعت و دقیقه | تنظیم | ۱۰ و ۰۰ | ساعت انتخاب‌شده ۱۰:۰۰ می‌شود. | ورودی ساعت | ساعت یادآوری رو روی ده صبح تنظیم می‌کنیم. |
| 6 · 52–60 ثانیه | انتخاب ساعت | تأیید | کلیک | — | تاریخ و ساعت در ردیف یادآوری دیده می‌شود. | زمان انتخاب‌شده | انتخاب ساعت رو تأیید می‌کنیم. |
| 7 · 60–68 ثانیه | جزئیات در حالت ویرایش | ذخیره تغییرات | کلیک | — | اطلاعات ذخیره می‌شوند؛ ممکن است اعلان مجوز سیستم ظاهر شود. | ذخیره و نتیجه | ذخیره تغییرات رو می‌زنیم و نتیجه رو بررسی می‌کنیم. |
| 8 · 68–76 ثانیه | جزئیات ذخیره‌شده | مهلت انجام تا و یادآوری | مکث | — | هر دو مقدار قابل مشاهده‌اند. | دو ردیف کنار هم | مهلت و یادآوری دو تنظیم جدا هستن؛ هر دو رو کنترل می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «تاریخ انجام کار با زمان یادآوری یکی نیست.»

معرفی مسئله از 4 تا 9 ثانیه: «برای وظیفهٔ نمونه، دو زمان مستقل می‌گذاریم.»

آموزش عملی از 9 تا 76 ثانیه:

«جزئیات همون وظیفه رو باز می‌کنیم. ویرایش رو می‌زنیم تا تاریخ‌ها قابل تغییر بشن. برای مهلت انجام، فردا رو انتخاب می‌کنیم. یادآوری رو جدا باز می‌کنیم و تاریخ فردا رو می‌دیم. ساعت یادآوری رو روی ده صبح تنظیم می‌کنیم. انتخاب ساعت رو تأیید می‌کنیم. ذخیره تغییرات رو می‌زنیم و نتیجه رو بررسی می‌کنیم. مهلت و یادآوری دو تنظیم جدا هستن؛ هر دو رو کنترل می‌کنیم.»

نمایش نتیجه از 76 تا 85 ثانیه: «برای کار، هم سررسید داریم و هم یادآوری مشخص.»

پایان از 85 تا 90 ثانیه: «نمایش اعلان به اجازه و تنظیمات سیستم‌عامل هم وابسته‌ست.»

متن حدود 98 واژه دارد؛ برآورد 1.09 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از وظایف یا بورد پروژه | متن روی تصویر: مهلت انجام و یادآوری رو جدا تنظیم کن؛ هوک همزمان خوانده شود. |
| 4–9 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا بازبینی سناریوی شروع کار؛ قبل از کلیک مکث کوتاه. |
| 9–76 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی ویرایش با آیکون مداد نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 76–85 | نمای نهایی از مهلت و یادآوری دو تنظیم جدا هستن؛ هر دو رو کنترل می‌کنیم. | موس از روی متن کنار برود؛ هر دو مقدار قابل مشاهده‌اند. |
| 85–90 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «بازبینی سناریوی شروع کار» و نتیجهٔ «مهلت و یادآوری دو تنظیم جدا هستن؛ هر دو رو کنترل می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «وظایف یا بورد پروژه» و کنترل «بازبینی سناریوی شروع کار» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر با task.canEdit» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: هر دو مقدار قابل مشاهده‌اند.
- [ ] شرط‌های توقف بررسی شدند: زمان گذشته پذیرفته نمی‌شود. ذخیرهٔ زمان به معنی تأیید نمایش اعلان روی همهٔ دستگاه‌ها نیست؛ پیام «یادآوری ذخیره شد، اما سیستم‌عامل اجازهٔ زمان‌بندی اعلان را نداد» نباید مخفی شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: تنظیم سررسید فردا و یادآوری فردا ساعت ۱۰ برای وظیفهٔ موجود.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 90 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V25 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V26 ساخت چک‌لیست وظیفه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ساخت چک‌لیست وظیفه |
| عنوان انتشار | یک کار بزرگ رو به قدم‌های روشن تقسیم کن |
| ماژول | وظایف |
| هدف آموزشی | افزودن دو مورد به چک‌لیست و ثبت تکمیل یک مورد |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر با task.canEdit |
| سطح | متوسط |
| زمان هدف | 75 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /tasks → جزئیات وظیفه |
| پیش‌نیاز | وظیفهٔ نمونه بدون مورد چک‌لیست؛ کاربر اجازهٔ ویرایش دارد. موارد مشابه از برداشت قبل باقی نمانده باشند. |
| نتیجهٔ یادگیری | افزودن دو مورد به چک‌لیست و ثبت تکمیل یک مورد |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283)؛ [lib/features/tasks/task_detail/view_models/task_detail_view_model.dart:27](../faro-flutter/lib/features/tasks/task_detail/view_models/task_detail_view_model.dart#L27)

### B آماده‌سازی محیط ضبط

با نقش «کاربر با task.canEdit» وارد محیط آموزشی شوید. وظیفهٔ نمونه بدون مورد چک‌لیست؛ کاربر اجازهٔ ویرایش دارد. موارد مشابه از برداشت قبل باقی نمانده باشند.

وضعیت آغاز: جزئیات وظیفه باز باشد؛ کنترل «ویرایش» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: از وظیفهٔ کپی بدون چک‌لیست استفاده کنید؛ موارد مشترک آموزشی دیگر حذف نشوند.

خطاها و شرط توقف: افزودن موارد در حالت ویرایش پیش‌نویس است و ذخیره لازم دارد. تکمیل چک‌لیست لزوماً وضعیت کل وظیفه را تکمیل نمی‌کند. چک‌لیست را زیر‌وظیفهٔ مستقل با مسئول جدا معرفی نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| مورد اول | بررسی ترتیب کلیک‌ها | ابتدا ناتمام |
| مورد دوم | بازخوانی نریشن | ناتمام |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | جزئیات وظیفه | ویرایش | کلیک | حالت ویرایش فعال می‌شود. |
| 2 | بخش چک‌لیست | افزودن مورد به چک‌لیست... | کلیک | ورودی عنوان مورد جدید باز می‌شود. |
| 3 | ورودی چک‌لیست | عنوان مورد جدید... و تأیید | تایپ و تأیید؛ «بررسی ترتیب کلیک‌ها» را وارد کنید | مورد اول به پیش‌نویس اضافه می‌شود. |
| 4 | چک‌لیست | افزودن مورد به چک‌لیست... و تأیید | کلیک، تایپ و تأیید؛ «بازخوانی نریشن» را وارد کنید | مورد دوم هم به پیش‌نویس اضافه می‌شود. |
| 5 | جزئیات وظیفه | ذخیره تغییرات | کلیک | هر دو مورد در وظیفه ذخیره می‌شوند. |
| 6 | چک‌لیست ذخیره‌شده | مربع کنار بررسی ترتیب کلیک‌ها | کلیک | مورد اول انجام‌شده و شمارنده یک از دو می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | جزئیات وظیفه | ویرایش | کلیک | — | حالت ویرایش فعال می‌شود. | دکمهٔ مداد | جزئیات وظیفه رو در حالت ویرایش باز می‌کنیم. |
| 2 · 18–27 ثانیه | بخش چک‌لیست | افزودن مورد به چک‌لیست... | کلیک | — | ورودی عنوان مورد جدید باز می‌شود. | عنوان بخش و ورودی | در چک‌لیست، افزودن مورد رو می‌زنیم. |
| 3 · 27–36 ثانیه | ورودی چک‌لیست | عنوان مورد جدید... و تأیید | تایپ و تأیید | بررسی ترتیب کلیک‌ها | مورد اول به پیش‌نویس اضافه می‌شود. | ردیف اول | اولین قدم رو بررسی ترتیب کلیک‌ها می‌گذاریم. |
| 4 · 36–45 ثانیه | چک‌لیست | افزودن مورد به چک‌لیست... و تأیید | کلیک، تایپ و تأیید | بازخوانی نریشن | مورد دوم هم به پیش‌نویس اضافه می‌شود. | دو ردیف چک‌لیست | یک قدم مستقل هم برای بازخوانی نریشن اضافه می‌کنیم. |
| 5 · 45–54 ثانیه | جزئیات وظیفه | ذخیره تغییرات | کلیک | — | هر دو مورد در وظیفه ذخیره می‌شوند. | دکمهٔ ذخیره | تغییرات رو ذخیره می‌کنیم. |
| 6 · 54–63 ثانیه | چک‌لیست ذخیره‌شده | مربع کنار بررسی ترتیب کلیک‌ها | کلیک | — | مورد اول انجام‌شده و شمارنده یک از دو می‌شود. | تیک و شمارنده | وقتی قدم اول انجام شد، تیکش می‌زنیم و پیشرفت رو می‌بینیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: ««بازبینی سناریو» دقیقاً شامل چه قدم‌هایی می‌شه؟»

معرفی مسئله از 4 تا 8 ثانیه: «دو قدم روشن به چک‌لیست همین وظیفه اضافه می‌کنیم.»

آموزش عملی از 8 تا 63 ثانیه:

«جزئیات وظیفه رو در حالت ویرایش باز می‌کنیم. در چک‌لیست، افزودن مورد رو می‌زنیم. اولین قدم رو بررسی ترتیب کلیک‌ها می‌گذاریم. یک قدم مستقل هم برای بازخوانی نریشن اضافه می‌کنیم. تغییرات رو ذخیره می‌کنیم. وقتی قدم اول انجام شد، تیکش می‌زنیم و پیشرفت رو می‌بینیم.»

نمایش نتیجه از 63 تا 71 ثانیه: «دو قدم مشخص داریم و تکمیل هرکدوم جدا دیده می‌شه.»

پایان از 71 تا 75 ثانیه: «چک‌لیست رو از قدم‌های قابل انجام بساز.»

متن حدود 78 واژه دارد؛ برآورد 1.04 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از جزئیات وظیفه | متن روی تصویر: یک کار بزرگ رو به قدم‌های روشن تقسیم کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ویرایش؛ قبل از کلیک مکث کوتاه. |
| 8–63 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی افزودن مورد به چک‌لیست... نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 63–71 | نمای نهایی از وقتی قدم اول انجام شد، تیکش می‌زنیم و پیشرفت رو می‌بینیم. | موس از روی متن کنار برود؛ مورد اول انجام‌شده و شمارنده یک از دو می‌شود. |
| 71–75 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ویرایش» و نتیجهٔ «وقتی قدم اول انجام شد، تیکش می‌زنیم و پیشرفت رو می‌بینیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «جزئیات وظیفه» و کنترل «ویرایش» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر با task.canEdit» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: مورد اول انجام‌شده و شمارنده یک از دو می‌شود.
- [ ] شرط‌های توقف بررسی شدند: افزودن موارد در حالت ویرایش پیش‌نویس است و ذخیره لازم دارد. تکمیل چک‌لیست لزوماً وضعیت کل وظیفه را تکمیل نمی‌کند. چک‌لیست را زیر‌وظیفهٔ مستقل با مسئول جدا معرفی نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: افزودن دو مورد به چک‌لیست و ثبت تکمیل یک مورد.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 75 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V26 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V27 افزودن ستون به بورد

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | افزودن ستون به بورد |
| عنوان انتشار | مرحلهٔ بازبینی رو به بورد اضافه کن |
| ماژول | بورد پروژه |
| هدف آموزشی | ساخت ستون با عنوان مشخص در بورد موجود پروژه |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر با canManageProjects |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /projects/:projectId/board |
| پیش‌نیاز | شناسهٔ پروژهٔ انتشار پاییز از انتخاب پروژه به دست آید؛ بورد موجود و ستون «بازبینی» ناموجود باشد؛ ایجاد جریان کاری جدید موضوع این ویدیو نیست. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد. |
| نتیجهٔ یادگیری | ساخت ستون با عنوان مشخص در بورد موجود پروژه |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60)؛ [lib/features/tasks/task_board/views/task_board_view.dart:138](../faro-flutter/lib/features/tasks/task_board/views/task_board_view.dart#L138)؛ [lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart:112](../faro-flutter/lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart#L112)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39)؛ [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40)؛ [lib/app/shell/views/widgets/project_header/project_tool_tabs.dart:13](../faro-flutter/lib/app/shell/views/widgets/project_header/project_tool_tabs.dart#L13)

### B آماده‌سازی محیط ضبط

با نقش «کاربر با canManageProjects» وارد محیط آموزشی شوید. شناسهٔ پروژهٔ انتشار پاییز از انتخاب پروژه به دست آید؛ بورد موجود و ستون «بازبینی» ناموجود باشد؛ ایجاد جریان کاری جدید موضوع این ویدیو نیست. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد.

وضعیت آغاز: صفحهٔ حساب باز باشد؛ کنترل «ردیف انتشار پاییز» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: ستون بازبینی در بورد کپی موجود نباشد؛ ستون دارای کارهای دیگر حذف نشود.

خطاها و شرط توقف: نبود بورد یا منع مجوز باید پیش از ضبط حل شود؛ ستون با ایجاد بورد یا workflow جدید یکی نیست. کنترل واقعی ورود به این نمای پروژه «تخته» است.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| نام لیست | بازبینی | عنوان غیرخالی |
| رنگ و آیکون | پیش‌فرض | در برداشت پایه تغییر نکند. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب | ردیف انتشار پاییز | کلیک و انتخاب پروژه | زمینهٔ پروژه فعال می‌شود. |
| 2 | نمای پروژه | تخته در تب‌های ابزار پروژه | کلیک | تختهٔ همان پروژه باز می‌شود. |
| 3 | انتهای ستون‌های بورد | افزودن لیست جدید | اسکرول افقی و کلیک | فرم ایجاد لیست جدید باز می‌شود. |
| 4 | ایجاد لیست جدید | نام لیست | تایپ؛ «بازبینی» را وارد کنید | عنوان لیست آماده می‌شود. |
| 5 | فرم لیست | ایجاد لیست | کلیک | ستون در بورد ایجاد و اعلان موفقیت نمایش داده می‌شود. |
| 6 | بورد پروژه | ستون بازبینی | مکث | عنوان ستون تازه در بورد قابل مشاهده است. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | صفحهٔ حساب | ردیف انتشار پاییز | کلیک و انتخاب پروژه | — | زمینهٔ پروژه فعال می‌شود. | نام پروژه در هدر | پروژهٔ انتشار پاییز رو انتخاب می‌کنیم. |
| 2 · 16–24 ثانیه | نمای پروژه | تخته در تب‌های ابزار پروژه | کلیک | — | تختهٔ همان پروژه باز می‌شود. | تب تخته و نام پروژه | از ابزارهای همین پروژه، تخته رو انتخاب می‌کنیم. |
| 3 · 24–32 ثانیه | انتهای ستون‌های بورد | افزودن لیست جدید | اسکرول افقی و کلیک | — | فرم ایجاد لیست جدید باز می‌شود. | کنترل انتهای بورد | در انتهای ستون‌ها، افزودن لیست جدید رو می‌زنیم. |
| 4 · 32–40 ثانیه | ایجاد لیست جدید | نام لیست | تایپ | بازبینی | عنوان لیست آماده می‌شود. | فیلد نام | اسم این مرحله رو بازبینی می‌گذاریم. |
| 5 · 40–48 ثانیه | فرم لیست | ایجاد لیست | کلیک | — | ستون در بورد ایجاد و اعلان موفقیت نمایش داده می‌شود. | دکمه و ستون تازه | ایجاد لیست رو می‌زنیم. |
| 6 · 48–55 ثانیه | بورد پروژه | ستون بازبینی | مکث | — | عنوان ستون تازه در بورد قابل مشاهده است. | ستون جدید و همسایه‌ها | حالا یک مرحلهٔ مشخص برای کارهای منتظر بازبینی داریم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «کار انجام شده، ولی هنوز باید بازبینی بشه؟»

معرفی مسئله از 4 تا 8 ثانیه: «ستون بازبینی رو به بورد موجود اضافه می‌کنیم.»

آموزش عملی از 8 تا 55 ثانیه:

«پروژهٔ انتشار پاییز رو انتخاب می‌کنیم. از ابزارهای همین پروژه، تخته رو انتخاب می‌کنیم. در انتهای ستون‌ها، افزودن لیست جدید رو می‌زنیم. اسم این مرحله رو بازبینی می‌گذاریم. ایجاد لیست رو می‌زنیم. حالا یک مرحلهٔ مشخص برای کارهای منتظر بازبینی داریم.»

نمایش نتیجه از 55 تا 61 ثانیه: «ستون بازبینی به بورد پروژه اضافه شد.»

پایان از 61 تا 65 ثانیه: «در آموزش بعد، یک کارت رو به این مرحله منتقل می‌کنیم.»

متن حدود 75 واژه دارد؛ برآورد 1.15 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب | متن روی تصویر: مرحلهٔ بازبینی رو به بورد اضافه کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ردیف انتشار پاییز؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی تخته در تب‌های ابزار پروژه نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از حالا یک مرحلهٔ مشخص برای کارهای منتظر بازبینی داریم. | موس از روی متن کنار برود؛ عنوان ستون تازه در بورد قابل مشاهده است. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ردیف انتشار پاییز» و نتیجهٔ «حالا یک مرحلهٔ مشخص برای کارهای منتظر بازبینی داریم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب» و کنترل «ردیف انتشار پاییز» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر با canManageProjects» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: عنوان ستون تازه در بورد قابل مشاهده است.
- [ ] شرط‌های توقف بررسی شدند: نبود بورد یا منع مجوز باید پیش از ضبط حل شود؛ ستون با ایجاد بورد یا workflow جدید یکی نیست. کنترل واقعی ورود به این نمای پروژه «تخته» است.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ساخت ستون با عنوان مشخص در بورد موجود پروژه.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V27 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V28 جابجایی کارت بین ستون‌ها

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | جابجایی کارت بین ستون‌ها |
| عنوان انتشار | مرحلهٔ کار رو با کشیدن کارت تغییر بده |
| ماژول | بورد پروژه |
| هدف آموزشی | انتقال وظیفه از ستون برای انجام به بازبینی و بررسی ماندگاری |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو مجاز جابه‌جایی وظیفه در سرور |
| سطح | متوسط |
| زمان هدف | 55 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /projects/:projectId/board |
| پیش‌نیاز | همان بورد با ستون‌های «برای انجام» و «بازبینی»؛ کارت «بازبینی سناریوی شروع کار» در برای انجام؛ هر دو ستون در قاب دیده شوند. |
| نتیجهٔ یادگیری | انتقال وظیفه از ستون برای انجام به بازبینی و بررسی ماندگاری |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/tasks/task_board/views/task_board_view.dart:138](../faro-flutter/lib/features/tasks/task_board/views/task_board_view.dart#L138)؛ [lib/features/tasks/task_board/views/widgets/board_column_widget.dart:209](../faro-flutter/lib/features/tasks/task_board/views/widgets/board_column_widget.dart#L209)؛ [lib/features/tasks/task_board/views/widgets/board_task_item.dart:400](../faro-flutter/lib/features/tasks/task_board/views/widgets/board_task_item.dart#L400)؛ [lib/features/tasks/task_board/view_models/task_board_view_model.dart:330](../faro-flutter/lib/features/tasks/task_board/view_models/task_board_view_model.dart#L330)

### B آماده‌سازی محیط ضبط

با نقش «عضو مجاز جابه‌جایی وظیفه در سرور» وارد محیط آموزشی شوید. همان بورد با ستون‌های «برای انجام» و «بازبینی»؛ کارت «بازبینی سناریوی شروع کار» در برای انجام؛ هر دو ستون در قاب دیده شوند.

وضعیت آغاز: بورد انتشار پاییز باز باشد؛ کنترل «عنوان پروژه و دو ستون» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: کارت نمونه را به برای انجام برگردانید و ثبت تغییر را قبل از شروع برداشت بررسی کنید.

خطاها و شرط توقف: جابه‌جایی نمایشی می‌تواند خوش‌بینانه باشد؛ ماندگاری بعد از پاسخ و بازخوانی شرط تأیید است. نام ستون دلخواه به معنی وضعیت سیستمی completed نیست.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| کارت | بازبینی سناریوی شروع کار | در ستون مبدأ |
| مبدأ | برای انجام | از قبل موجود |
| مقصد | بازبینی | از قبل موجود |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | بورد انتشار پاییز | عنوان پروژه و دو ستون | مکث | مبدأ و مقصد روشن‌اند. |
| 2 | ستون برای انجام | کارت بازبینی سناریوی شروع کار | گرفتن کارت با موس | پیش‌نمایش کشیدن کارت فعال می‌شود. |
| 3 | بین دو ستون | ناحیهٔ کارت‌های بازبینی | کشیدن و رهاکردن؛ «مقصد بازبینی» را وارد کنید | کارت در مقصد ظاهر و درخواست انتقال ارسال می‌شود. |
| 4 | ستون بازبینی | همان کارت | انتظار پاسخ؛ بدون کلیک اضافه | کارت پس از پاسخ سرور در مقصد باقی می‌ماند یا خطا ظاهر می‌شود. |
| 5 | بورد پروژه | Ctrl+R | تازه‌سازی پس از اتمام درخواست | کارت همچنان در بازبینی است. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | بورد انتشار پاییز | عنوان پروژه و دو ستون | مکث | — | مبدأ و مقصد روشن‌اند. | دو ستون و عنوان | اول پروژه، کارت و ستون مقصد رو بررسی می‌کنیم. |
| 2 · 16–24 ثانیه | ستون برای انجام | کارت بازبینی سناریوی شروع کار | گرفتن کارت با موس | — | پیش‌نمایش کشیدن کارت فعال می‌شود. | کارت مبدأ | کارت رو با موس می‌گیریم. |
| 3 · 24–31 ثانیه | بین دو ستون | ناحیهٔ کارت‌های بازبینی | کشیدن و رهاکردن | مقصد بازبینی | کارت در مقصد ظاهر و درخواست انتقال ارسال می‌شود. | مسیر حرکت پیوسته | کارت رو داخل ناحیهٔ ستون بازبینی رها می‌کنیم. |
| 4 · 31–38 ثانیه | ستون بازبینی | همان کارت | انتظار پاسخ؛ بدون کلیک اضافه | — | کارت پس از پاسخ سرور در مقصد باقی می‌ماند یا خطا ظاهر می‌شود. | کارت مقصد | یک لحظه صبر می‌کنیم تا ثبت جابه‌جایی هم تأیید بشه. |
| 5 · 38–45 ثانیه | بورد پروژه | Ctrl+R | تازه‌سازی پس از اتمام درخواست | — | کارت همچنان در بازبینی است. | مبدأ خالی و مقصد | با تازه‌سازی بررسی می‌کنیم کارت در مرحلهٔ جدید باقی مونده باشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «وضعیت کار عوض شده، ولی بورد هنوز همون قبلیه؟»

معرفی مسئله از 4 تا 8 ثانیه: «کارت نمونه رو از برای انجام به بازبینی می‌بریم.»

آموزش عملی از 8 تا 45 ثانیه:

«اول پروژه، کارت و ستون مقصد رو بررسی می‌کنیم. کارت رو با موس می‌گیریم. کارت رو داخل ناحیهٔ ستون بازبینی رها می‌کنیم. یک لحظه صبر می‌کنیم تا ثبت جابه‌جایی هم تأیید بشه. با تازه‌سازی بررسی می‌کنیم کارت در مرحلهٔ جدید باقی مونده باشه.»

نمایش نتیجه از 45 تا 51 ثانیه: «کارت بعد از تازه‌سازی در ستون بازبینی باقی مونده.»

پایان از 51 تا 55 ثانیه: «حرکت روی صفحه رو با ثبت موفق عملیات اشتباه نگیریم.»

متن حدود 80 واژه دارد؛ برآورد 1.45 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از بورد انتشار پاییز | متن روی تصویر: مرحلهٔ کار رو با کشیدن کارت تغییر بده؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا عنوان پروژه و دو ستون؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی کارت بازبینی سناریوی شروع کار نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از با تازه‌سازی بررسی می‌کنیم کارت در مرحلهٔ جدید باقی مونده باشه. | موس از روی متن کنار برود؛ کارت همچنان در بازبینی است. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «عنوان پروژه و دو ستون» و نتیجهٔ «با تازه‌سازی بررسی می‌کنیم کارت در مرحلهٔ جدید باقی مونده باشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «بورد انتشار پاییز» و کنترل «عنوان پروژه و دو ستون» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو مجاز جابه‌جایی وظیفه در سرور» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: کارت همچنان در بازبینی است.
- [ ] شرط‌های توقف بررسی شدند: جابه‌جایی نمایشی می‌تواند خوش‌بینانه باشد؛ ماندگاری بعد از پاسخ و بازخوانی شرط تأیید است. نام ستون دلخواه به معنی وضعیت سیستمی completed نیست.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتقال وظیفه از ستون برای انجام به بازبینی و بررسی ماندگاری.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V28 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V29 جست‌وجو و مرتب‌سازی وظایف

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | جست‌وجو و مرتب‌سازی وظایف |
| عنوان انتشار | وظیفهٔ موردنظر رو سریع‌تر پیدا کن |
| ماژول | وظایف |
| هدف آموزشی | محدودکردن فهرست وظایف با جست‌وجو و مرتب‌سازی سررسید |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو دارای دسترسی به وظایف نمونه |
| سطح | ساده |
| زمان هدف | 55 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /tasks |
| پیش‌نیاز | حداقل سه وظیفهٔ حساب ضبط با عنوان شامل «بازبینی» و مهلت‌های متفاوت وجود داشته باشند؛ تب وظایف من فعال باشد. |
| نتیجهٔ یادگیری | محدودکردن فهرست وظایف با جست‌وجو و مرتب‌سازی سررسید |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart:331](../faro-flutter/lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart#L331)؛ [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27)؛ [lib/features/tasks/tasks_overview/view_models/tasks_overview_view_model.dart:22](../faro-flutter/lib/features/tasks/tasks_overview/view_models/tasks_overview_view_model.dart#L22)

### B آماده‌سازی محیط ضبط

با نقش «عضو دارای دسترسی به وظایف نمونه» وارد محیط آموزشی شوید. حداقل سه وظیفهٔ حساب ضبط با عنوان شامل «بازبینی» و مهلت‌های متفاوت وجود داشته باشند؛ تب وظایف من فعال باشد.

وضعیت آغاز: وظایف باز باشد؛ کنترل «وظایف من» در قاب قابل دیدن باشد. از نوار کناری «وظایف» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: جست‌وجو خالی، تب وظایف من و ترتیب جدیدترین فعال باشند؛ سه وظیفه به حساب جاری محول باشند.

خطاها و شرط توقف: گزینه‌های priority و created در enum هستند اما منوی فعلی فقط جدیدترین، تاریخ سررسید و عنوان را ارائه می‌کند. ترتیب دقیق بین گروه‌های معوق و آینده را بدون اجرای نمونه تضمین نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| جست‌وجو | بازبینی | حداقل دو نتیجه داشته باشد. |
| مرتب‌سازی | تاریخ سررسید | از سه گزینهٔ واقعاً ارائه‌شده |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | وظایف | وظایف من | کلیک | فهرست مربوط به حساب جاری انتخاب می‌شود. |
| 2 | هدر وظایف | جستجو در وظایف… | تایپ؛ «بازبینی» را وارد کنید | نتایج مطابق عبارت محدود می‌شوند. |
| 3 | هدر وظایف | کپسول مرتب‌سازی با متن جدیدترین | کلیک | منوی مرتب‌سازی باز می‌شود. |
| 4 | مرتب‌سازی | تاریخ سررسید | انتخاب | ترتیب نتایج بر اساس گزینهٔ سررسید تغییر می‌کند. |
| 5 | فهرست نتایج | ردیف بازبینی سناریوی شروع کار | کلیک | جزئیات همان وظیفه باز می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | وظایف | وظایف من | کلیک | — | فهرست مربوط به حساب جاری انتخاب می‌شود. | تب فعال | اول مشخص می‌کنیم در وظایف من جست‌وجو می‌کنیم. |
| 2 · 16–24 ثانیه | هدر وظایف | جستجو در وظایف… | تایپ | بازبینی | نتایج مطابق عبارت محدود می‌شوند. | جست‌وجو و نتایج | بخشی از عنوان کار رو می‌نویسیم. |
| 3 · 24–31 ثانیه | هدر وظایف | کپسول مرتب‌سازی با متن جدیدترین | کلیک | — | منوی مرتب‌سازی باز می‌شود. | منوی سه‌گزینه‌ای | منوی مرتب‌سازی رو باز می‌کنیم. |
| 4 · 31–38 ثانیه | مرتب‌سازی | تاریخ سررسید | انتخاب | — | ترتیب نتایج بر اساس گزینهٔ سررسید تغییر می‌کند. | گزینه و دو ردیف نتیجه | تاریخ سررسید رو انتخاب می‌کنیم. |
| 5 · 38–45 ثانیه | فهرست نتایج | ردیف بازبینی سناریوی شروع کار | کلیک | — | جزئیات همان وظیفه باز می‌شود. | عنوان وظیفه | از نتیجه‌ها، وظیفهٔ موردنظر رو باز می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «بین چندین کار، دنبال یک وظیفهٔ مشخصی؟»

معرفی مسئله از 4 تا 8 ثانیه: «با جست‌وجو و مرتب‌سازی، فهرست رو مرور می‌کنیم.»

آموزش عملی از 8 تا 45 ثانیه:

«اول مشخص می‌کنیم در وظایف من جست‌وجو می‌کنیم. بخشی از عنوان کار رو می‌نویسیم. منوی مرتب‌سازی رو باز می‌کنیم. تاریخ سررسید رو انتخاب می‌کنیم. از نتیجه‌ها، وظیفهٔ موردنظر رو باز می‌کنیم.»

نمایش نتیجه از 45 تا 51 ثانیه: «جست‌وجو نتیجه‌ها رو محدود کرد و مرتب‌سازی ترتیبشون رو عوض کرد.»

پایان از 51 تا 55 ثانیه: «برای پیدا کردن کار، اول محدوده و بعد عبارت رو بررسی کن.»

متن حدود 69 واژه دارد؛ برآورد 1.25 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از وظایف | متن روی تصویر: وظیفهٔ موردنظر رو سریع‌تر پیدا کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا وظایف من؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی جستجو در وظایف… نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از از نتیجه‌ها، وظیفهٔ موردنظر رو باز می‌کنیم. | موس از روی متن کنار برود؛ جزئیات همان وظیفه باز می‌شود. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «وظایف من» و نتیجهٔ «از نتیجه‌ها، وظیفهٔ موردنظر رو باز می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «وظایف» و کنترل «وظایف من» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو دارای دسترسی به وظایف نمونه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: جزئیات همان وظیفه باز می‌شود.
- [ ] شرط‌های توقف بررسی شدند: گزینه‌های priority و created در enum هستند اما منوی فعلی فقط جدیدترین، تاریخ سررسید و عنوان را ارائه می‌کند. ترتیب دقیق بین گروه‌های معوق و آینده را بدون اجرای نمونه تضمین نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: محدودکردن فهرست وظایف با جست‌وجو و مرتب‌سازی سررسید.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V29 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V30 ثبت گزارش روی وظیفه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ثبت گزارش روی وظیفه |
| عنوان انتشار | پیشرفت کار رو کنار خود وظیفه ثبت کن |
| ماژول | وظایف |
| هدف آموزشی | نوشتن گزارش متنی در رشتهٔ گفت‌وگوی وظیفه |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر مجاز مشاهده و ثبت گزارش وظیفه در سرور |
| سطح | ساده |
| زمان هدف | 65 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /tasks → جزئیات وظیفه → گفت‌وگو و گزارش‌ها |
| پیش‌نیاز | وظیفهٔ نمونه موجود؛ حساب ضبط دسترسی دارد؛ رشتهٔ گزارش فقط شامل محتوای آزمایشی باشد. |
| نتیجهٔ یادگیری | نوشتن گزارش متنی در رشتهٔ گفت‌وگوی وظیفه |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/tasks/task_detail/views/task_detail_dialog.dart:18](../faro-flutter/lib/features/tasks/task_detail/views/task_detail_dialog.dart#L18)؛ [lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart:192](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart#L192)؛ [lib/features/tasks/task_detail/view_models/task_detail_view_model.dart:27](../faro-flutter/lib/features/tasks/task_detail/view_models/task_detail_view_model.dart#L27)؛ [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690)

### B آماده‌سازی محیط ضبط

با نقش «کاربر مجاز مشاهده و ثبت گزارش وظیفه در سرور» وارد محیط آموزشی شوید. وظیفهٔ نمونه موجود؛ حساب ضبط دسترسی دارد؛ رشتهٔ گزارش فقط شامل محتوای آزمایشی باشد.

وضعیت آغاز: وظایف یا بورد باز باشد؛ کنترل «بازبینی سناریوی شروع کار» در قاب قابل دیدن باشد. از نوار کناری «وظایف» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: ورودی و مرجع پاسخ خالی باشند؛ گزارش‌های تکراری را فقط در کپی مصرفی مدیریت کنید.

خطاها و شرط توقف: وجود canPost در ویجت به معنی تضمین مجوز سرور نیست. گزارش با تکمیل خودکار وظیفه یا تغییر ستون یکی نیست. اگر تب‌ها در نمای پهن همزمان دیده می‌شوند، کلیک زبانهٔ اصلی حذف شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| گزارش | ترتیب کلیک‌ها بررسی شد؛ بازخوانی نریشن در مرحله بعد انجام می‌شود. | متن کامل قابل مشاهده |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | وظایف یا بورد | بازبینی سناریوی شروع کار | کلیک | جزئیات وظیفه باز می‌شود. |
| 2 | جزئیات وظیفه | گفت‌وگو و گزارش‌ها؛ در دسکتاپ پنل گفت‌وگو | انتخاب زبانه فقط اگر پنل دیده نمی‌شود | بخش پیام‌ها و گزارش‌ها دیده می‌شود. |
| 3 | پنل گزارش | گزارش‌ها | انتخاب | رشتهٔ گزارش‌های وظیفه فعال است. |
| 4 | ورودی پایین پنل | پیام خود را بگذارید... | تایپ؛ «ترتیب کلیک‌ها بررسی شد؛ بازخوانی نریشن در مرحله بعد انجام می‌شود.» را وارد کنید | گزارش آمادهٔ ارسال است. |
| 5 | ورودی گزارش | ارسال پیام | کلیک | گزارش پس از پاسخ موفق در تاریخچه دیده می‌شود. |
| 6 | پنل وظیفه | فعالیت‌ها | کلیک و اشاره | رویدادهای ثبت‌شدهٔ وظیفه در تب مجزا دیده می‌شوند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | وظایف یا بورد | بازبینی سناریوی شروع کار | کلیک | — | جزئیات وظیفه باز می‌شود. | عنوان | وظیفهٔ موردنظر رو باز می‌کنیم. |
| 2 · 16–24 ثانیه | جزئیات وظیفه | گفت‌وگو و گزارش‌ها؛ در دسکتاپ پنل گفت‌وگو | انتخاب زبانه فقط اگر پنل دیده نمی‌شود | — | بخش پیام‌ها و گزارش‌ها دیده می‌شود. | عنوان پنل | به بخش گفت‌وگو و گزارش‌های همین وظیفه می‌ریم. |
| 3 · 24–32 ثانیه | پنل گزارش | گزارش‌ها | انتخاب | — | رشتهٔ گزارش‌های وظیفه فعال است. | تب گزارش‌ها | تب گزارش‌ها رو انتخاب می‌کنیم. |
| 4 · 32–40 ثانیه | ورودی پایین پنل | پیام خود را بگذارید... | تایپ | ترتیب کلیک‌ها بررسی شد؛ بازخوانی نریشن در مرحله بعد انجام می‌شود. | گزارش آمادهٔ ارسال است. | متن گزارش | می‌نویسیم چه کاری انجام شده و قدم بعدی چیه. |
| 5 · 40–48 ثانیه | ورودی گزارش | ارسال پیام | کلیک | — | گزارش پس از پاسخ موفق در تاریخچه دیده می‌شود. | پیام ثبت‌شده | ارسال رو می‌زنیم تا گزارش کنار خود وظیفه بمونه. |
| 6 · 48–55 ثانیه | پنل وظیفه | فعالیت‌ها | کلیک و اشاره | — | رویدادهای ثبت‌شدهٔ وظیفه در تب مجزا دیده می‌شوند. | تب فعالیت‌ها | گزارش متنی با فهرست فعالیت‌های خودکار وظیفه فرق داره. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «همکارت برای فهمیدن پیشرفت کار باید کجا رو ببینه؟»

معرفی مسئله از 4 تا 8 ثانیه: «یک گزارش کوتاه از کار انجام‌شده ثبت می‌کنیم.»

آموزش عملی از 8 تا 55 ثانیه:

«وظیفهٔ موردنظر رو باز می‌کنیم. به بخش گفت‌وگو و گزارش‌های همین وظیفه می‌ریم. تب گزارش‌ها رو انتخاب می‌کنیم. می‌نویسیم چه کاری انجام شده و قدم بعدی چیه. ارسال رو می‌زنیم تا گزارش کنار خود وظیفه بمونه. گزارش متنی با فهرست فعالیت‌های خودکار وظیفه فرق داره.»

نمایش نتیجه از 55 تا 61 ثانیه: «گزارش پیشرفت داخل خود وظیفه ثبت شد.»

پایان از 61 تا 65 ثانیه: «گزارش رو روشن بنویس: انجام‌شده و قدم بعدی.»

متن حدود 77 واژه دارد؛ برآورد 1.18 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از وظایف یا بورد | متن روی تصویر: پیشرفت کار رو کنار خود وظیفه ثبت کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا بازبینی سناریوی شروع کار؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی گفت‌وگو و گزارش‌ها؛ در دسکتاپ پنل گفت‌وگو نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از گزارش متنی با فهرست فعالیت‌های خودکار وظیفه فرق داره. | موس از روی متن کنار برود؛ رویدادهای ثبت‌شدهٔ وظیفه در تب مجزا دیده می‌شوند. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «بازبینی سناریوی شروع کار» و نتیجهٔ «گزارش متنی با فهرست فعالیت‌های خودکار وظیفه فرق داره.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «وظایف یا بورد» و کنترل «بازبینی سناریوی شروع کار» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر مجاز مشاهده و ثبت گزارش وظیفه در سرور» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: رویدادهای ثبت‌شدهٔ وظیفه در تب مجزا دیده می‌شوند.
- [ ] شرط‌های توقف بررسی شدند: وجود canPost در ویجت به معنی تضمین مجوز سرور نیست. گزارش با تکمیل خودکار وظیفه یا تغییر ستون یکی نیست. اگر تب‌ها در نمای پهن همزمان دیده می‌شوند، کلیک زبانهٔ اصلی حذف شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: نوشتن گزارش متنی در رشتهٔ گفت‌وگوی وظیفه.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V30 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V31 ارسال نامهٔ اداری

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ارسال نامهٔ اداری |
| عنوان انتشار | موضوع، گیرنده و متن رو در یک نامه ثبت کن |
| ماژول | نامه‌ها |
| هدف آموزشی | ساخت نامهٔ جدید و ارسال به یک گیرندهٔ آموزشی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر با canMail و گیرندهٔ واجد شرایط |
| سطح | متوسط |
| زمان هدف | 85 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /mail |
| پیش‌نیاز | نامه در پلن فضای کاری فعال باشد؛ سارا نمونه گیرندهٔ معتبر و حساب ضبط مجاز ارسال باشد؛ پیش‌نویس قبلی همین عملیات پاک یا بررسی شود. |
| نتیجهٔ یادگیری | ساخت نامهٔ جدید و ارسال به یک گیرندهٔ آموزشی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157)؛ [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253)؛ [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43)؛ [lib/features/mail/repositories/dio_letters_repository.dart:16](../faro-flutter/lib/features/mail/repositories/dio_letters_repository.dart#L16)

### B آماده‌سازی محیط ضبط

با نقش «کاربر با canMail و گیرندهٔ واجد شرایط» وارد محیط آموزشی شوید. نامه در پلن فضای کاری فعال باشد؛ سارا نمونه گیرندهٔ معتبر و حساب ضبط مجاز ارسال باشد؛ پیش‌نویس قبلی همین عملیات پاک یا بررسی شود.

وضعیت آغاز: نامه‌ها باز باشد؛ کنترل «نامه جدید» در قاب قابل دیدن باشد. از نوار کناری «نامه‌ها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پیش‌نویس عملیات create در همین فضا بررسی یا پاک شود؛ هیچ گیرندهٔ قبلی باقی نماند.

خطاها و شرط توقف: وجود گزینهٔ نامه در نوار کناری تضمین مجوز پلن نیست. گیرنده هنگام ارسال دوباره با سرور تطبیق داده می‌شود. متن HTML پاک‌سازی می‌شود؛ پیش‌نویس در نشست فعلی می‌تواند باقی بماند و ذخیرهٔ دائمی پیش‌نویس ادعا نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| موضوع | برنامه ضبط آموزش شروع کار | غیرخالی و کمتر از ۵۰۰ کاراکتر |
| گیرنده | سارا نمونه | حساب sara_demo |
| متن | سلام سارا، لطفاً سناریوی آموزش شروع کار را تا فردا بازبینی کن. سپاس از همکاری شما. | متن کامل نمونه |
| درخواست پاراف | خاموش | پاراف در ویدیوی مستقل آموزش داده می‌شود. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | نامه‌ها | نامه جدید | کلیک | فرم ایجاد و ارسال نامه باز می‌شود. |
| 2 | فرم نامه | موضوع | تایپ؛ «برنامه ضبط آموزش شروع کار» را وارد کنید | موضوع در فرم ثبت می‌شود. |
| 3 | فرم نامه | گیرندگان → افزودن گیرنده | بازکردن انتخابگر و انتخاب حساب؛ «سارا نمونه» را وارد کنید | تراشهٔ سارا در گیرندگان دیده می‌شود. |
| 4 | فرم نامه | متن نامه را بنویسید… | تایپ؛ «سلام سارا، لطفاً سناریوی آموزش شروع کار را تا فردا بازبینی کن. سپاس از همکاری شما.» را وارد کنید | متن در ویرایشگر قرار می‌گیرد. |
| 5 | فرم نامه | موضوع، گیرنده و درخواست پاراف | بازبینی بدون کلیک اضافه؛ «درخواست پاراف خاموش» را وارد کنید | هیچ گیرندهٔ اضافی انتخاب نشده است. |
| 6 | پایین فرم | ارسال | کلیک و انتظار | واجدشرایط‌بودن گیرنده بررسی و اعلان نامه با موفقیت ارسال شد نمایش داده می‌شود. |
| 7 | نامه‌ها | خروجی | انتخاب و بازکردن موضوع؛ «برنامه ضبط آموزش شروع کار» را وارد کنید | نامه در فهرست ارسال‌شده دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 9–18 ثانیه | نامه‌ها | نامه جدید | کلیک | — | فرم ایجاد و ارسال نامه باز می‌شود. | دکمه و عنوان فرم | از نامه‌ها، نامه جدید رو باز می‌کنیم. |
| 2 · 18–27 ثانیه | فرم نامه | موضوع | تایپ | برنامه ضبط آموزش شروع کار | موضوع در فرم ثبت می‌شود. | موضوع | موضوع رو مشخص و قابل جست‌وجو می‌نویسیم. |
| 3 · 27–36 ثانیه | فرم نامه | گیرندگان → افزودن گیرنده | بازکردن انتخابگر و انتخاب حساب | سارا نمونه | تراشهٔ سارا در گیرندگان دیده می‌شود. | هویت گیرنده | سارا نمونه رو از فهرست گیرنده‌ها انتخاب می‌کنیم. |
| 4 · 36–45 ثانیه | فرم نامه | متن نامه را بنویسید… | تایپ | سلام سارا، لطفاً سناریوی آموزش شروع کار را تا فردا بازبینی کن. سپاس از همکاری شما. | متن در ویرایشگر قرار می‌گیرد. | بدنهٔ نامه | در متن، درخواست و زمان مورد انتظار رو روشن می‌نویسیم. |
| 5 · 45–54 ثانیه | فرم نامه | موضوع، گیرنده و درخواست پاراف | بازبینی بدون کلیک اضافه | درخواست پاراف خاموش | هیچ گیرندهٔ اضافی انتخاب نشده است. | سه بخش فرم | قبل از ارسال، موضوع و گیرنده رو دوباره کنترل می‌کنیم. |
| 6 · 54–63 ثانیه | پایین فرم | ارسال | کلیک و انتظار | — | واجدشرایط‌بودن گیرنده بررسی و اعلان نامه با موفقیت ارسال شد نمایش داده می‌شود. | دکمه و اعلان | ارسال رو می‌زنیم و منتظر پیام موفقیت می‌مونیم. |
| 7 · 63–72 ثانیه | نامه‌ها | خروجی | انتخاب و بازکردن موضوع | برنامه ضبط آموزش شروع کار | نامه در فهرست ارسال‌شده دیده می‌شود. | موضوع و گیرندهٔ ثبت‌شده | در نامه‌های ارسالی، نتیجهٔ ثبت رو بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «یک درخواست رسمی رو چطور قابل پیگیری کنیم؟»

معرفی مسئله از 4 تا 9 ثانیه: «یک نامهٔ نمونه برای حساب آموزشی سارا می‌فرستیم.»

آموزش عملی از 9 تا 72 ثانیه:

«از نامه‌ها، نامه جدید رو باز می‌کنیم. موضوع رو مشخص و قابل جست‌وجو می‌نویسیم. سارا نمونه رو از فهرست گیرنده‌ها انتخاب می‌کنیم. در متن، درخواست و زمان مورد انتظار رو روشن می‌نویسیم. قبل از ارسال، موضوع و گیرنده رو دوباره کنترل می‌کنیم. ارسال رو می‌زنیم و منتظر پیام موفقیت می‌مونیم. در نامه‌های ارسالی، نتیجهٔ ثبت رو بررسی می‌کنیم.»

نمایش نتیجه از 72 تا 80 ثانیه: «نامه با موضوع و گیرندهٔ مشخص ارسال شد.»

پایان از 80 تا 85 ثانیه: «برای پیگیری بعدی، همین موضوع رو جست‌وجو کن.»

متن حدود 90 واژه دارد؛ برآورد 1.06 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از نامه‌ها | متن روی تصویر: موضوع، گیرنده و متن رو در یک نامه ثبت کن؛ هوک همزمان خوانده شود. |
| 4–9 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نامه جدید؛ قبل از کلیک مکث کوتاه. |
| 9–72 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی موضوع نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 72–80 | نمای نهایی از در نامه‌های ارسالی، نتیجهٔ ثبت رو بررسی می‌کنیم. | موس از روی متن کنار برود؛ نامه در فهرست ارسال‌شده دیده می‌شود. |
| 80–85 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نامه جدید» و نتیجهٔ «در نامه‌های ارسالی، نتیجهٔ ثبت رو بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «نامه‌ها» و کنترل «نامه جدید» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر با canMail و گیرندهٔ واجد شرایط» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: نامه در فهرست ارسال‌شده دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: وجود گزینهٔ نامه در نوار کناری تضمین مجوز پلن نیست. گیرنده هنگام ارسال دوباره با سرور تطبیق داده می‌شود. متن HTML پاک‌سازی می‌شود؛ پیش‌نویس در نشست فعلی می‌تواند باقی بماند و ذخیرهٔ دائمی پیش‌نویس ادعا نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ساخت نامهٔ جدید و ارسال به یک گیرندهٔ آموزشی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 85 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V31 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V32 پیداکردن نامه و تغییر پوشه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | پیداکردن نامه و تغییر پوشه |
| عنوان انتشار | نامهٔ موردنظر رو از بین مکاتبات پیدا کن |
| ماژول | نامه‌ها |
| هدف آموزشی | انتخاب پوشه و جست‌وجو با موضوع نامه |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو دارای دسترسی نامه و نامهٔ نمونه |
| سطح | ساده |
| زمان هدف | 55 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /mail |
| پیش‌نیاز | حداقل یک نامهٔ دریافتی با موضوع برنامه ضبط آموزش شروع کار برای حساب ضبط موجود باشد؛ فرستنده یک حساب آزمایشی دیگر باشد. |
| نتیجهٔ یادگیری | انتخاب پوشه و جست‌وجو با موضوع نامه |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157)؛ [lib/features/mail/views/widgets/mail_header.dart:60](../faro-flutter/lib/features/mail/views/widgets/mail_header.dart#L60)؛ [lib/features/mail/view_models/mail_view_model.dart:16](../faro-flutter/lib/features/mail/view_models/mail_view_model.dart#L16)؛ [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)

### B آماده‌سازی محیط ضبط

با نقش «عضو دارای دسترسی نامه و نامهٔ نمونه» وارد محیط آموزشی شوید. حداقل یک نامهٔ دریافتی با موضوع برنامه ضبط آموزش شروع کار برای حساب ضبط موجود باشد؛ فرستنده یک حساب آزمایشی دیگر باشد.

وضعیت آغاز: نامه‌ها باز باشد؛ کنترل «ورودی» در قاب قابل دیدن باشد. از نوار کناری «نامه‌ها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پوشهٔ ورودی و جست‌وجوی خالی؛ نامهٔ نمونه برای حساب ضبط قابل مشاهده باشد.

خطاها و شرط توقف: خواندن نامه می‌تواند وضعیت نخوانده را تغییر دهد؛ برای برداشت تکراری نمونه را بازتنظیم کنید. جست‌وجو را جست‌وجوی قطعی در متن تمام پیوست‌ها معرفی نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| پوشه | ورودی | عنوان نهایی در پیوست کنترل‌ها ثبت شده است. |
| عبارت | برنامه ضبط | با موضوع نمونه مطابقت دارد. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | نامه‌ها | ورودی | انتخاب | فهرست پوشهٔ inbox فعال می‌شود. |
| 2 | هدر نامه‌ها | جستجو در نامه‌ها… | تایپ؛ «برنامه ضبط» را وارد کنید | فهرست بر اساس عبارت جست‌وجو بارگیری می‌شود. |
| 3 | فهرست نتایج | برنامه ضبط آموزش شروع کار | کلیک روی ردیف | جزئیات نامه باز می‌شود. |
| 4 | جزئیات نامه | مشخصات | مکث | موضوع، فرستنده و اطلاعات نامه دیده می‌شوند. |
| 5 | بازگشت به فهرست | حذف عبارت جست‌وجو | پاک‌کردن متن ورودی پس از بستن پنجره؛ «رشتهٔ خالی» را وارد کنید | فهرست کامل همان پوشه برمی‌گردد. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | نامه‌ها | ورودی | انتخاب | — | فهرست پوشهٔ inbox فعال می‌شود. | تب‌های نامه | اول پوشهٔ نامه‌های دریافتی رو انتخاب می‌کنیم. |
| 2 · 16–24 ثانیه | هدر نامه‌ها | جستجو در نامه‌ها… | تایپ | برنامه ضبط | فهرست بر اساس عبارت جست‌وجو بارگیری می‌شود. | ورودی و نتایج | بخشی از موضوع نامه رو جست‌وجو می‌کنیم. |
| 3 · 24–31 ثانیه | فهرست نتایج | برنامه ضبط آموزش شروع کار | کلیک روی ردیف | — | جزئیات نامه باز می‌شود. | موضوع و فرستنده | نامهٔ موردنظر رو از روی موضوع و فرستنده تشخیص می‌دیم. |
| 4 · 31–38 ثانیه | جزئیات نامه | مشخصات | مکث | — | موضوع، فرستنده و اطلاعات نامه دیده می‌شوند. | موضوع و متن | داخل نامه هم موضوع و متن رو بررسی می‌کنیم. |
| 5 · 38–45 ثانیه | بازگشت به فهرست | حذف عبارت جست‌وجو | پاک‌کردن متن ورودی پس از بستن پنجره | رشتهٔ خالی | فهرست کامل همان پوشه برمی‌گردد. | ورودی خالی و فهرست | برای دیدن همهٔ نامه‌های پوشه، عبارت جست‌وجو رو پاک می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «موضوع نامه یادت هست، اما خودش رو پیدا نمی‌کنی؟»

معرفی مسئله از 4 تا 8 ثانیه: «نامه رو از روی پوشه و موضوع پیدا می‌کنیم.»

آموزش عملی از 8 تا 45 ثانیه:

«اول پوشهٔ نامه‌های دریافتی رو انتخاب می‌کنیم. بخشی از موضوع نامه رو جست‌وجو می‌کنیم. نامهٔ موردنظر رو از روی موضوع و فرستنده تشخیص می‌دیم. داخل نامه هم موضوع و متن رو بررسی می‌کنیم. برای دیدن همهٔ نامه‌های پوشه، عبارت جست‌وجو رو پاک می‌کنیم.»

نمایش نتیجه از 45 تا 51 ثانیه: «با انتخاب پوشه و جست‌وجوی موضوع، نامه رو پیدا کردیم.»

پایان از 51 تا 55 ثانیه: «نتیجهٔ خالی رو اول با تغییر پوشه و عبارت بررسی کن.»

متن حدود 82 واژه دارد؛ برآورد 1.49 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از نامه‌ها | متن روی تصویر: نامهٔ موردنظر رو از بین مکاتبات پیدا کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ورودی؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی جستجو در نامه‌ها… نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از برای دیدن همهٔ نامه‌های پوشه، عبارت جست‌وجو رو پاک می‌کنیم. | موس از روی متن کنار برود؛ فهرست کامل همان پوشه برمی‌گردد. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ورودی» و نتیجهٔ «برای دیدن همهٔ نامه‌های پوشه، عبارت جست‌وجو رو پاک می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «نامه‌ها» و کنترل «ورودی» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو دارای دسترسی نامه و نامهٔ نمونه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: فهرست کامل همان پوشه برمی‌گردد.
- [ ] شرط‌های توقف بررسی شدند: خواندن نامه می‌تواند وضعیت نخوانده را تغییر دهد؛ برای برداشت تکراری نمونه را بازتنظیم کنید. جست‌وجو را جست‌وجوی قطعی در متن تمام پیوست‌ها معرفی نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: انتخاب پوشه و جست‌وجو با موضوع نامه.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V32 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V33 ثبت پاراف نامه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ثبت پاراف نامه |
| عنوان انتشار | نظر و تأییدت رو روی نامه ثبت کن |
| ماژول | نامه‌ها |
| هدف آموزشی | ثبت پاراف روی نامه‌ای که برای کاربر جاری نیازمند پاراف است |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | گیرندهٔ همان نامه با needsParaf |
| سطح | متوسط |
| زمان هدف | 60 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /mail → جزئیات نامه |
| پیش‌نیاز | نامهٔ نمونه از حساب آزمون دیگر با درخواست پاراف فعال برای حساب ضبط ارسال شده باشد؛ حساب ضبط هنوز روی آن پاراف ثبت نکرده باشد. |
| نتیجهٔ یادگیری | ثبت پاراف روی نامه‌ای که برای کاربر جاری نیازمند پاراف است |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/widgets/record_paraf_dialog.dart:63](../faro-flutter/lib/features/mail/views/widgets/record_paraf_dialog.dart#L63)؛ [lib/features/mail/view_models/letter_detail_view_model.dart:38](../faro-flutter/lib/features/mail/view_models/letter_detail_view_model.dart#L38)؛ [lib/features/mail/models/letter_model.dart:5](../faro-flutter/lib/features/mail/models/letter_model.dart#L5)

### B آماده‌سازی محیط ضبط

با نقش «گیرندهٔ همان نامه با needsParaf» وارد محیط آموزشی شوید. نامهٔ نمونه از حساب آزمون دیگر با درخواست پاراف فعال برای حساب ضبط ارسال شده باشد؛ حساب ضبط هنوز روی آن پاراف ثبت نکرده باشد.

وضعیت آغاز: نامه‌ها باز باشد؛ کنترل «نامهٔ تأیید برنامه ضبط» در قاب قابل دیدن باشد. از نوار کناری «نامه‌ها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: نامهٔ تازهٔ نیازمند پاراف برای حساب ضبط بسازید؛ پاراف ثبت‌شده را قابل بازگردانی فرض نکنید.

خطاها و شرط توقف: آیکون پاراف شرطی است و برای همهٔ نامه‌ها نمایش ندارد. پاراف را امضای دیجیتال دارای اعتبار حقوقی معرفی نکنید. بسته‌شدن مودال به‌تنهایی اثبات ثبت در سرور نیست؛ نتیجه باید دوباره خوانده شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| موضوع نامه | تأیید برنامه ضبط | نامهٔ دریافتی نیازمند پاراف |
| یادداشت پاراف | بررسی شد؛ ترتیب مراحل برای ضبط تأیید است. | نظر نمونهٔ آموزشی |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | نامه‌ها | نامهٔ تأیید برنامه ضبط | بازکردن | جزئیات نامه باز می‌شود. |
| 2 | هدر جزئیات | ثبت پاراف با آیکون تیک | کلیک | پنجرهٔ ثبت پاراف باز می‌شود. |
| 3 | ثبت پاراف | یادداشت پاراف (اختیاری) | تایپ؛ «بررسی شد؛ ترتیب مراحل برای ضبط تأیید است.» را وارد کنید | متن یادداشت در فرم قرار می‌گیرد. |
| 4 | پنجرهٔ پاراف | ثبت پاراف | کلیک | پنجره بسته و درخواست paraf به سرور ارسال می‌شود. |
| 5 | جزئیات نامه | اطلاعات گیرنده یا پاراف در مشخصات | بررسی پس از بازخوانی | ثبت نظر و وضعیت پاراف در دادهٔ تازه مشاهده می‌شود؛ نمایش دقیق اجرایی کنترل شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | نامه‌ها | نامهٔ تأیید برنامه ضبط | بازکردن | — | جزئیات نامه باز می‌شود. | موضوع و متن | نامه‌ای رو باز می‌کنیم که برای ما درخواست پاراف داره. |
| 2 · 17–26 ثانیه | هدر جزئیات | ثبت پاراف با آیکون تیک | کلیک | — | پنجرهٔ ثبت پاراف باز می‌شود. | آیکون و عنوان پنجره | از بالای نامه، ثبت پاراف رو می‌زنیم. |
| 3 · 26–34 ثانیه | ثبت پاراف | یادداشت پاراف (اختیاری) | تایپ | بررسی شد؛ ترتیب مراحل برای ضبط تأیید است. | متن یادداشت در فرم قرار می‌گیرد. | فیلد یادداشت | نظر کوتاه و مشخصمون رو در یادداشت می‌نویسیم. |
| 4 · 34–42 ثانیه | پنجرهٔ پاراف | ثبت پاراف | کلیک | — | پنجره بسته و درخواست paraf به سرور ارسال می‌شود. | دکمه و بازگشت به نامه | ثبت پاراف رو می‌زنیم و منتظر نتیجه می‌مونیم. |
| 5 · 42–50 ثانیه | جزئیات نامه | اطلاعات گیرنده یا پاراف در مشخصات | بررسی پس از بازخوانی | — | ثبت نظر و وضعیت پاراف در دادهٔ تازه مشاهده می‌شود؛ نمایش دقیق اجرایی کنترل شود. | وضعیت همان گیرنده | بعد از ثبت، وضعیت و نظر خودمون رو در اطلاعات نامه بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «نامه رو دیدی؛ چطور نظرت هم قابل پیگیری بمونه؟»

معرفی مسئله از 4 تا 8 ثانیه: «روی نامهٔ آموزشی، پاراف و نظر ثبت می‌کنیم.»

آموزش عملی از 8 تا 50 ثانیه:

«نامه‌ای رو باز می‌کنیم که برای ما درخواست پاراف داره. از بالای نامه، ثبت پاراف رو می‌زنیم. نظر کوتاه و مشخصمون رو در یادداشت می‌نویسیم. ثبت پاراف رو می‌زنیم و منتظر نتیجه می‌مونیم. بعد از ثبت، وضعیت و نظر خودمون رو در اطلاعات نامه بررسی می‌کنیم.»

نمایش نتیجه از 50 تا 56 ثانیه: «پاراف این نامه برای حساب آموزشی ثبت شد.»

پایان از 56 تا 60 ثانیه: «پاراف رو فقط روی نامه‌ای ثبت کن که محتوایش رو بررسی کردی.»

متن حدود 83 واژه دارد؛ برآورد 1.38 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از نامه‌ها | متن روی تصویر: نظر و تأییدت رو روی نامه ثبت کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نامهٔ تأیید برنامه ضبط؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی ثبت پاراف با آیکون تیک نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از بعد از ثبت، وضعیت و نظر خودمون رو در اطلاعات نامه بررسی می‌کنیم. | موس از روی متن کنار برود؛ ثبت نظر و وضعیت پاراف در دادهٔ تازه مشاهده می‌شود؛ نمایش دقیق اجرایی کنترل شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نامهٔ تأیید برنامه ضبط» و نتیجهٔ «بعد از ثبت، وضعیت و نظر خودمون رو در اطلاعات نامه بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «نامه‌ها» و کنترل «نامهٔ تأیید برنامه ضبط» در اجرای واقعی وجود دارند.
- [ ] نقش «گیرندهٔ همان نامه با needsParaf» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: ثبت نظر و وضعیت پاراف در دادهٔ تازه مشاهده می‌شود؛ نمایش دقیق اجرایی کنترل شود.
- [ ] شرط‌های توقف بررسی شدند: آیکون پاراف شرطی است و برای همهٔ نامه‌ها نمایش ندارد. پاراف را امضای دیجیتال دارای اعتبار حقوقی معرفی نکنید. بسته‌شدن مودال به‌تنهایی اثبات ثبت در سرور نیست؛ نتیجه باید دوباره خوانده شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ثبت پاراف روی نامه‌ای که برای کاربر جاری نیازمند پاراف است.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V33 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V34 پاسخ در مکاتبات نامه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | پاسخ در مکاتبات نامه |
| عنوان انتشار | پاسخ نامه رو در همون رشته ادامه بده |
| ماژول | نامه‌ها |
| هدف آموزشی | ثبت پاسخ متنی در پنل مکاتبات نامهٔ موجود |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر مجاز پاسخ در نامهٔ آموزشی |
| سطح | ساده |
| زمان هدف | 60 ثانیه |
| اولویت | P0 |
| مسیر دقیق | /mail → جزئیات نامه → مکاتبات |
| پیش‌نیاز | نامهٔ «برنامه ضبط آموزش شروع کار» برای حساب ضبط موجود؛ رشتهٔ مکاتبات دسترس‌پذیر باشد. مخاطبان پاسخ را سرور از پیام مرجع تعیین می‌کند. |
| نتیجهٔ یادگیری | ثبت پاسخ متنی در پنل مکاتبات نامهٔ موجود |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/widgets/letter_reply_chat_panel.dart:65](../faro-flutter/lib/features/mail/views/widgets/letter_reply_chat_panel.dart#L65)؛ [lib/features/mail/view_models/letter_detail_view_model.dart:38](../faro-flutter/lib/features/mail/view_models/letter_detail_view_model.dart#L38)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43)

### B آماده‌سازی محیط ضبط

با نقش «کاربر مجاز پاسخ در نامهٔ آموزشی» وارد محیط آموزشی شوید. نامهٔ «برنامه ضبط آموزش شروع کار» برای حساب ضبط موجود؛ رشتهٔ مکاتبات دسترس‌پذیر باشد. مخاطبان پاسخ را سرور از پیام مرجع تعیین می‌کند.

وضعیت آغاز: نامه‌ها باز باشد؛ کنترل «برنامه ضبط آموزش شروع کار» در قاب قابل دیدن باشد. از نوار کناری «نامه‌ها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: ورودی مکاتبات و مرجع پاسخ خالی باشند؛ همان نامهٔ آموزشی باز شود.

خطاها و شرط توقف: در این نسخه پاسخ اصلی از ChatInputBar پنل مکاتبات ارسال می‌شود؛ دکمهٔ پاسخ فرضی در هدر اختراع نشود. گیرندگان پاسخ دستی مانند نامهٔ جدید انتخاب نمی‌شوند؛ سرور آن‌ها را محاسبه می‌کند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| متن پاسخ | سناریو بررسی شد. نسخه اصلاح‌شده تا فردا آماده می‌شود. | پیام نمونه در همان رشته |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | نامه‌ها | برنامه ضبط آموزش شروع کار | بازکردن | نامه باز می‌شود. |
| 2 | جزئیات نامه | مکاتبات | انتخاب در چیدمان فشرده؛ در دسکتاپ پنل موجود بررسی شود | رشتهٔ مکاتبات و ورودی قابل دیدن است. |
| 3 | پنل مکاتبات | گیرندگان | مشاهده و مکث | مخاطبان رشته یا پیام مرجع قابل بررسی‌اند. |
| 4 | پایین پنل | پیام خود را بگذارید... | تایپ؛ «سناریو بررسی شد. نسخه اصلاح‌شده تا فردا آماده می‌شود.» را وارد کنید | پاسخ آمادهٔ ارسال است. |
| 5 | ورودی مکاتبات | ارسال پیام | کلیک و انتظار | پس از تأیید سرور، پاسخ در رشته دیده و ورودی پاک می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | نامه‌ها | برنامه ضبط آموزش شروع کار | بازکردن | — | نامه باز می‌شود. | عنوان نامه | نامهٔ موردنظر رو باز می‌کنیم. |
| 2 · 17–26 ثانیه | جزئیات نامه | مکاتبات | انتخاب در چیدمان فشرده؛ در دسکتاپ پنل موجود بررسی شود | — | رشتهٔ مکاتبات و ورودی قابل دیدن است. | عنوان مکاتبات | به بخش مکاتبات همین نامه می‌ریم. |
| 3 · 26–34 ثانیه | پنل مکاتبات | گیرندگان | مشاهده و مکث | — | مخاطبان رشته یا پیام مرجع قابل بررسی‌اند. | نام گیرندگان | قبل از نوشتن، مخاطبان مکاتبه رو بررسی می‌کنیم. |
| 4 · 34–42 ثانیه | پایین پنل | پیام خود را بگذارید... | تایپ | سناریو بررسی شد. نسخه اصلاح‌شده تا فردا آماده می‌شود. | پاسخ آمادهٔ ارسال است. | متن پاسخ | پاسخ رو کوتاه و مرتبط با همین نامه می‌نویسیم. |
| 5 · 42–50 ثانیه | ورودی مکاتبات | ارسال پیام | کلیک و انتظار | — | پس از تأیید سرور، پاسخ در رشته دیده و ورودی پاک می‌شود. | پیام تازه در رشته | ارسال رو می‌زنیم و ثبت پاسخ در مکاتبات رو می‌بینیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «برای پاسخ‌دادن به نامه، لازم نیست یک موضوع تازه بسازی.»

معرفی مسئله از 4 تا 8 ثانیه: «پاسخ رو داخل مکاتبات همون نامه می‌نویسیم.»

آموزش عملی از 8 تا 50 ثانیه:

«نامهٔ موردنظر رو باز می‌کنیم. به بخش مکاتبات همین نامه می‌ریم. قبل از نوشتن، مخاطبان مکاتبه رو بررسی می‌کنیم. پاسخ رو کوتاه و مرتبط با همین نامه می‌نویسیم. ارسال رو می‌زنیم و ثبت پاسخ در مکاتبات رو می‌بینیم.»

نمایش نتیجه از 50 تا 56 ثانیه: «پاسخ در رشتهٔ همون نامه باقی موند.»

پایان از 56 تا 60 ثانیه: «همیشه قبل از ارسال، مخاطبان پیام مرجع رو بررسی کن.»

متن حدود 72 واژه دارد؛ برآورد 1.20 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از نامه‌ها | متن روی تصویر: پاسخ نامه رو در همون رشته ادامه بده؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا برنامه ضبط آموزش شروع کار؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی مکاتبات نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از ارسال رو می‌زنیم و ثبت پاسخ در مکاتبات رو می‌بینیم. | موس از روی متن کنار برود؛ پس از تأیید سرور، پاسخ در رشته دیده و ورودی پاک می‌شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «برنامه ضبط آموزش شروع کار» و نتیجهٔ «ارسال رو می‌زنیم و ثبت پاسخ در مکاتبات رو می‌بینیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «نامه‌ها» و کنترل «برنامه ضبط آموزش شروع کار» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر مجاز پاسخ در نامهٔ آموزشی» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: پس از تأیید سرور، پاسخ در رشته دیده و ورودی پاک می‌شود.
- [ ] شرط‌های توقف بررسی شدند: در این نسخه پاسخ اصلی از ChatInputBar پنل مکاتبات ارسال می‌شود؛ دکمهٔ پاسخ فرضی در هدر اختراع نشود. گیرندگان پاسخ دستی مانند نامهٔ جدید انتخاب نمی‌شوند؛ سرور آن‌ها را محاسبه می‌کند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ثبت پاسخ متنی در پنل مکاتبات نامهٔ موجود.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V34 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V35 نمای چاپ نامه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | نمای چاپ نامه |
| عنوان انتشار | نسخهٔ قابل چاپ نامه رو بررسی کن |
| ماژول | نامه‌ها |
| هدف آموزشی | بازکردن مسیر چاپ و بازبینی پیش‌نمایش خروجی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | عضو دارای دسترسی به نامه |
| سطح | ساده |
| زمان هدف | 55 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /mail → جزئیات نامه → چاپ نامه |
| پیش‌نیاز | نامهٔ نمونه با متن فارسی موجود؛ سرویس چاپ سیستم در دسترس باشد؛ هیچ چاپگر واقعی برای ارسال خودکار انتخاب نشود. ضبط تا پیش‌نمایش ادامه دارد. |
| نتیجهٔ یادگیری | بازکردن مسیر چاپ و بازبینی پیش‌نمایش خروجی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/services/letter_print_service.dart:12](../faro-flutter/lib/features/mail/services/letter_print_service.dart#L12)

### B آماده‌سازی محیط ضبط

با نقش «عضو دارای دسترسی به نامه» وارد محیط آموزشی شوید. نامهٔ نمونه با متن فارسی موجود؛ سرویس چاپ سیستم در دسترس باشد؛ هیچ چاپگر واقعی برای ارسال خودکار انتخاب نشود. ضبط تا پیش‌نمایش ادامه دارد.

وضعیت آغاز: نامه‌ها باز باشد؛ کنترل «نامهٔ نمونه» در قاب قابل دیدن باشد. از نوار کناری «نامه‌ها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پنجره‌های چاپ بسته و نامهٔ نمونه آماده باشد؛ هیچ چاپ واقعی برای reset انجام نشود.

خطاها و شرط توقف: رابط چاپ و ذخیرهٔ PDF تابع سیستم‌عامل است؛ نام دکمهٔ ذخیره یا مسیر سیستم از سورس Flutter قابل اثبات نیست و باید در برگهٔ برداشت پر شود. خطای ساخت چاپ باید برداشت را متوقف کند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| نامه | برنامه ضبط آموزش شروع کار | موضوع، متن، فرستنده و گیرندگان نمونه |
| مقصد چاپ | پیش‌نمایش سیستم؛ بدون ارسال به چاپگر | متن دکمه‌های سیستم وابسته به OS است. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | نامه‌ها | نامهٔ نمونه | بازکردن | جزئیات نامه باز می‌شود. |
| 2 | هدر جزئیات | چاپ نامه با آیکون چاپگر | کلیک | PDF نامه ساخته و رابط چاپ سیستم فراخوانی می‌شود. |
| 3 | رابط چاپ سیستم | پیش‌نمایش سند | انتظار و مشاهده | خروجی با متن فارسی و اطلاعات نامه دیده می‌شود. |
| 4 | پیش‌نمایش | صفحات سند | مرور صفحه‌ها در صورت چندصفحه‌ای بودن | متن و مکاتبات چاپ‌شده خوانا هستند. |
| 5 | رابط چاپ سیستم | انصراف سیستم؛ متن دقیق پیش از ضبط ثبت شود | بستن بدون چاپ فیزیکی | به برنامه بازمی‌گردد؛ هیچ خروجی فیزیکی ایجاد نشده است. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | نامه‌ها | نامهٔ نمونه | بازکردن | — | جزئیات نامه باز می‌شود. | موضوع نامه | نامه‌ای رو باز می‌کنیم که نسخهٔ قابل چاپش رو لازم داریم. |
| 2 · 16–24 ثانیه | هدر جزئیات | چاپ نامه با آیکون چاپگر | کلیک | — | PDF نامه ساخته و رابط چاپ سیستم فراخوانی می‌شود. | آیکون چاپگر | چاپ نامه رو از بالای پنجره می‌زنیم. |
| 3 · 24–31 ثانیه | رابط چاپ سیستم | پیش‌نمایش سند | انتظار و مشاهده | — | خروجی با متن فارسی و اطلاعات نامه دیده می‌شود. | صفحهٔ خروجی | در پیش‌نمایش، موضوع و متن رو بررسی می‌کنیم. |
| 4 · 31–38 ثانیه | پیش‌نمایش | صفحات سند | مرور صفحه‌ها در صورت چندصفحه‌ای بودن | — | متن و مکاتبات چاپ‌شده خوانا هستند. | سرصفحه و انتهای متن | اگر سند چند صفحه داره، همهٔ صفحه‌ها رو مرور می‌کنیم. |
| 5 · 38–45 ثانیه | رابط چاپ سیستم | انصراف سیستم؛ متن دقیق پیش از ضبط ثبت شود | بستن بدون چاپ فیزیکی | — | به برنامه بازمی‌گردد؛ هیچ خروجی فیزیکی ایجاد نشده است. | بازگشت به نامه | در این آموزش فقط پیش‌نمایش رو دیدیم و به نامه برمی‌گردیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «نامه روی صفحه آماده‌ست؛ نسخهٔ قابل چاپش چطوره؟»

معرفی مسئله از 4 تا 8 ثانیه: «بدون چاپ فیزیکی، پیش‌نمایش نامه رو می‌بینیم.»

آموزش عملی از 8 تا 45 ثانیه:

«نامه‌ای رو باز می‌کنیم که نسخهٔ قابل چاپش رو لازم داریم. چاپ نامه رو از بالای پنجره می‌زنیم. در پیش‌نمایش، موضوع و متن رو بررسی می‌کنیم. اگر سند چند صفحه داره، همهٔ صفحه‌ها رو مرور می‌کنیم. در این آموزش فقط پیش‌نمایش رو دیدیم و به نامه برمی‌گردیم.»

نمایش نتیجه از 45 تا 51 ثانیه: «پیش‌نمایش خروجی رو از نظر متن و اطلاعات نامه بررسی کردیم.»

پایان از 51 تا 55 ثانیه: «قبل از چاپ نهایی، همهٔ صفحه‌ها رو مرور کن.»

متن حدود 82 واژه دارد؛ برآورد 1.49 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از نامه‌ها | متن روی تصویر: نسخهٔ قابل چاپ نامه رو بررسی کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نامهٔ نمونه؛ قبل از کلیک مکث کوتاه. |
| 8–45 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی چاپ نامه با آیکون چاپگر نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 45–51 | نمای نهایی از در این آموزش فقط پیش‌نمایش رو دیدیم و به نامه برمی‌گردیم. | موس از روی متن کنار برود؛ به برنامه بازمی‌گردد؛ هیچ خروجی فیزیکی ایجاد نشده است. |
| 51–55 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نامهٔ نمونه» و نتیجهٔ «در این آموزش فقط پیش‌نمایش رو دیدیم و به نامه برمی‌گردیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «نامه‌ها» و کنترل «نامهٔ نمونه» در اجرای واقعی وجود دارند.
- [ ] نقش «عضو دارای دسترسی به نامه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: به برنامه بازمی‌گردد؛ هیچ خروجی فیزیکی ایجاد نشده است.
- [ ] شرط‌های توقف بررسی شدند: رابط چاپ و ذخیرهٔ PDF تابع سیستم‌عامل است؛ نام دکمهٔ ذخیره یا مسیر سیستم از سورس Flutter قابل اثبات نیست و باید در برگهٔ برداشت پر شود. خطای ساخت چاپ باید برداشت را متوقف کند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: بازکردن مسیر چاپ و بازبینی پیش‌نمایش خروجی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 55 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V35 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V36 جست‌وجوی سراسری با صفحه‌کلید

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | جست‌وجوی سراسری با صفحه‌کلید |
| عنوان انتشار | با یک میانبر به کار موردنظر برس |
| ماژول | جست‌وجو |
| هدف آموزشی | بازکردن جست‌وجوی سراسری، محدودکردن به وظایف و بازکردن نتیجه |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر واردشده دارای دسترسی به وظیفهٔ نمونه |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P0 |
| مسیر دقیق | هر صفحه → پنجرهٔ Ctrl+K |
| پیش‌نیاز | وظیفهٔ بازبینی سناریوی شروع کار موجود و قابل مشاهده باشد؛ پنجرهٔ دیگری باز نباشد؛ نتیجهٔ سرور جست‌وجوی وظایف در دسترس باشد. |
| نتیجهٔ یادگیری | بازکردن جست‌وجوی سراسری، محدودکردن به وظایف و بازکردن نتیجه |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/core/shortcuts/app_shortcuts.dart:15](../faro-flutter/lib/core/shortcuts/app_shortcuts.dart#L15)؛ [lib/features/search/views/search_view.dart:206](../faro-flutter/lib/features/search/views/search_view.dart#L206)؛ [lib/features/search/view_models/search_view_model.dart:27](../faro-flutter/lib/features/search/view_models/search_view_model.dart#L27)؛ [lib/features/search/repositories/search_repository.dart:16](../faro-flutter/lib/features/search/repositories/search_repository.dart#L16)؛ [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39)

### B آماده‌سازی محیط ضبط

با نقش «کاربر واردشده دارای دسترسی به وظیفهٔ نمونه» وارد محیط آموزشی شوید. وظیفهٔ بازبینی سناریوی شروع کار موجود و قابل مشاهده باشد؛ پنجرهٔ دیگری باز نباشد؛ نتیجهٔ سرور جست‌وجوی وظایف در دسترس باشد.

وضعیت آغاز: صفحهٔ هوش مصنوعی یا صفحهٔ حساب باز باشد؛ کنترل «Ctrl+K» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پنجرهٔ جست‌وجو بسته و آخرین scope پاک باشد؛ وظیفهٔ نمونه قابل مشاهده باشد.

خطاها و شرط توقف: به جست‌وجوی سراسری مستقیم نروید؛ redirect فعلی آن را به صفحهٔ هوش مصنوعی می‌فرستد. متن کوتاه‌تر از دو نویسه در منطق جست‌وجو فیلتر محسوب نمی‌شود. نتایج پروژه و گفتگو و نامه بیشتر از داده‌های محلی و وظایف از جست‌وجوی سرور تأمین می‌شوند؛ جست‌وجوی جامع تمام داده‌های سرور ادعا نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| عبارت | بازبینی | حداقل دو نویسه |
| محدوده | وظایف | از گزینهٔ scope در پنجره |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی یا صفحهٔ حساب | Ctrl+K | فشردن میانبر | پنجرهٔ جست‌وجو در فارو باز می‌شود. |
| 2 | جست‌وجوی سراسری | گزینهٔ وظایف | انتخاب با کلید پایین تا ردیف وظایف | ردیف وظایف انتخاب می‌شود. |
| 3 | ردیف وظایف | Tab | فشردن | محدودهٔ وظایف به‌صورت تراشه اعمال می‌شود. |
| 4 | ورودی جست‌وجو | جستجو در فارو؛ پروژه، وظیفه یا فرمان… | تایپ؛ «بازبینی» را وارد کنید | نتایج وظایف بعد از جست‌وجوی سرور ظاهر می‌شوند. |
| 5 | فهرست نتیجه | بازبینی سناریوی شروع کار | انتخاب با کلید بالا یا پایین و Enter | جزئیات وظیفهٔ انتخاب‌شده باز می‌شود. |
| 6 | جزئیات وظیفه | عنوان وظیفه | مکث | همان عنوان و اطلاعات نمونه دیده می‌شوند. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–16 ثانیه | صفحهٔ هوش مصنوعی یا صفحهٔ حساب | Ctrl+K | فشردن میانبر | — | پنجرهٔ جست‌وجو در فارو باز می‌شود. | پنجرهٔ جست‌وجو | با کنترل و کی، جست‌وجوی سراسری رو باز می‌کنیم. |
| 2 · 16–24 ثانیه | جست‌وجوی سراسری | گزینهٔ وظایف | انتخاب با کلید پایین تا ردیف وظایف | — | ردیف وظایف انتخاب می‌شود. | ردیف انتخاب‌شده | گزینهٔ وظایف رو در فهرست انتخاب می‌کنیم. |
| 3 · 24–32 ثانیه | ردیف وظایف | Tab | فشردن | — | محدودهٔ وظایف به‌صورت تراشه اعمال می‌شود. | تراشهٔ محدوده | با تب، جست‌وجو رو وارد محدودهٔ وظایف می‌کنیم. |
| 4 · 32–40 ثانیه | ورودی جست‌وجو | جستجو در فارو؛ پروژه، وظیفه یا فرمان… | تایپ | بازبینی | نتایج وظایف بعد از جست‌وجوی سرور ظاهر می‌شوند. | عبارت و نتایج | عبارت بازبینی رو می‌نویسیم و منتظر نتیجه می‌مونیم. |
| 5 · 40–48 ثانیه | فهرست نتیجه | بازبینی سناریوی شروع کار | انتخاب با کلید بالا یا پایین و Enter | — | جزئیات وظیفهٔ انتخاب‌شده باز می‌شود. | نتیجه و عنوان وظیفه | با کلیدها نتیجه رو انتخاب می‌کنیم و اینتر می‌زنیم. |
| 6 · 48–55 ثانیه | جزئیات وظیفه | عنوان وظیفه | مکث | — | همان عنوان و اطلاعات نمونه دیده می‌شوند. | عنوان مقصد | عنوان مقصد رو بررسی می‌کنیم تا مطمئن بشیم درست رسیدیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «لازم نیست برای هر کار چند منو رو باز کنی.»

معرفی مسئله از 4 تا 8 ثانیه: «با صفحه‌کلید به یک وظیفهٔ مشخص می‌رسیم.»

آموزش عملی از 8 تا 55 ثانیه:

«با کنترل و کی، جست‌وجوی سراسری رو باز می‌کنیم. گزینهٔ وظایف رو در فهرست انتخاب می‌کنیم. با تب، جست‌وجو رو وارد محدودهٔ وظایف می‌کنیم. عبارت بازبینی رو می‌نویسیم و منتظر نتیجه می‌مونیم. با کلیدها نتیجه رو انتخاب می‌کنیم و اینتر می‌زنیم. عنوان مقصد رو بررسی می‌کنیم تا مطمئن بشیم درست رسیدیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «با یک جست‌وجو به جزئیات وظیفه رسیدیم.»

پایان از 61 تا 65 ثانیه: «در مک، به‌جای کنترل از کلید کامند استفاده کن.»

متن حدود 84 واژه دارد؛ برآورد 1.29 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی یا صفحهٔ حساب | متن روی تصویر: با یک میانبر به کار موردنظر برس؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا Ctrl+K؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی گزینهٔ وظایف نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از عنوان مقصد رو بررسی می‌کنیم تا مطمئن بشیم درست رسیدیم. | موس از روی متن کنار برود؛ همان عنوان و اطلاعات نمونه دیده می‌شوند. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «Ctrl+K» و نتیجهٔ «عنوان مقصد رو بررسی می‌کنیم تا مطمئن بشیم درست رسیدیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی یا صفحهٔ حساب» و کنترل «Ctrl+K» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر واردشده دارای دسترسی به وظیفهٔ نمونه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: همان عنوان و اطلاعات نمونه دیده می‌شوند.
- [ ] شرط‌های توقف بررسی شدند: به جست‌وجوی سراسری مستقیم نروید؛ redirect فعلی آن را به صفحهٔ هوش مصنوعی می‌فرستد. متن کوتاه‌تر از دو نویسه در منطق جست‌وجو فیلتر محسوب نمی‌شود. نتایج پروژه و گفتگو و نامه بیشتر از داده‌های محلی و وظایف از جست‌وجوی سرور تأمین می‌شوند؛ جست‌وجوی جامع تمام داده‌های سرور ادعا نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: بازکردن جست‌وجوی سراسری، محدودکردن به وظایف و بازکردن نتیجه.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V36 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V37 ارجاع نامه به همکار

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ارجاع نامه به همکار |
| عنوان انتشار | نامه رو با درخواست روشن ارجاع بده |
| ماژول | نامه‌ها |
| هدف آموزشی | ارجاع نامهٔ موجود به گیرندهٔ آزمایشی همراه یادداشت |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر مجاز ارجاع نامه با دسترسی mail |
| سطح | متوسط |
| زمان هدف | 60 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /mail → جزئیات نامه → ارجاع |
| پیش‌نیاز | نامهٔ برنامه ضبط آموزش شروع کار قابل دسترس؛ امیر نمونه عضو واجد شرایط فضا باشد؛ پیش‌نویس ارجاع همین نامه از قبل خالی باشد. |
| نتیجهٔ یادگیری | ارجاع نامهٔ موجود به گیرندهٔ آزمایشی همراه یادداشت |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141)؛ [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253)؛ [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213)؛ [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43)

### B آماده‌سازی محیط ضبط

با نقش «کاربر مجاز ارجاع نامه با دسترسی mail» وارد محیط آموزشی شوید. نامهٔ برنامه ضبط آموزش شروع کار قابل دسترس؛ امیر نمونه عضو واجد شرایط فضا باشد؛ پیش‌نویس ارجاع همین نامه از قبل خالی باشد.

وضعیت آغاز: جزئیات نامه باز باشد؛ کنترل «ارجاع با آیکون پیکان» در قاب قابل دیدن باشد.  زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: پیش‌نویس ارجاع همان parent خالی و فهرست گیرندگان بدون انتخاب قبلی باشد.

خطاها و شرط توقف: ارجاع با پاسخ داخل مکاتبات فرق دارد. متن body جدید در payload ارجاع ارسال نمی‌شود و note استفاده می‌شود؛ آموزش ویرایش اصل نامه در ارجاع اشتباه است. ارسال فقط به حساب‌های آزمایشی.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| گیرندهٔ ارجاع | امیر نمونه | حساب amir_demo |
| یادداشت ارجاع | لطفاً امکان اجرای ضبط در روز آینده را بررسی کن. | متن همراه ارجاع |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | جزئیات نامه | ارجاع با آیکون پیکان | کلیک | فرم ارجاع و ارسال رونوشت باز می‌شود. |
| 2 | فرم ارجاع | گیرندگان → افزودن گیرنده | جست‌وجو و انتخاب؛ «امیر نمونه» را وارد کنید | گیرنده در فرم درج می‌شود. |
| 3 | فرم ارجاع | یادداشت ارجاع | تایپ؛ «لطفاً امکان اجرای ضبط در روز آینده را بررسی کن.» را وارد کنید | یادداشت به پیش‌نویس اضافه می‌شود. |
| 4 | فرم ارجاع | گیرنده و یادداشت | بازبینی | مقصد و درخواست درست‌اند. |
| 5 | فرم ارجاع | ارسال | کلیک و انتظار | در موفقیت اعلان ارسال و بازخوانی رشته انجام می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | جزئیات نامه | ارجاع با آیکون پیکان | کلیک | — | فرم ارجاع و ارسال رونوشت باز می‌شود. | آیکون و فرم | از بالای نامه، ارجاع رو انتخاب می‌کنیم. |
| 2 · 17–26 ثانیه | فرم ارجاع | گیرندگان → افزودن گیرنده | جست‌وجو و انتخاب | امیر نمونه | گیرنده در فرم درج می‌شود. | نام گیرنده | امیر نمونه رو به‌عنوان گیرنده انتخاب می‌کنیم. |
| 3 · 26–34 ثانیه | فرم ارجاع | یادداشت ارجاع | تایپ | لطفاً امکان اجرای ضبط در روز آینده را بررسی کن. | یادداشت به پیش‌نویس اضافه می‌شود. | متن یادداشت | در یادداشت می‌گیم دقیقاً چه بررسی‌ای لازم داریم. |
| 4 · 34–42 ثانیه | فرم ارجاع | گیرنده و یادداشت | بازبینی | — | مقصد و درخواست درست‌اند. | نام و یادداشت | قبل از ارسال، مقصد و متن رو دوباره می‌خونیم. |
| 5 · 42–50 ثانیه | فرم ارجاع | ارسال | کلیک و انتظار | — | در موفقیت اعلان ارسال و بازخوانی رشته انجام می‌شود. | دکمه و نتیجه | ارسال رو می‌زنیم و ثبت ارجاع رو بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «نامه رو باید همکار دیگه‌ای پیگیری کنه؟»

معرفی مسئله از 4 تا 8 ثانیه: «نامه رو برای بررسی به حساب آموزشی امیر ارجاع می‌دیم.»

آموزش عملی از 8 تا 50 ثانیه:

«از بالای نامه، ارجاع رو انتخاب می‌کنیم. امیر نمونه رو به‌عنوان گیرنده انتخاب می‌کنیم. در یادداشت می‌گیم دقیقاً چه بررسی‌ای لازم داریم. قبل از ارسال، مقصد و متن رو دوباره می‌خونیم. ارسال رو می‌زنیم و ثبت ارجاع رو بررسی می‌کنیم.»

نمایش نتیجه از 50 تا 56 ثانیه: «نامه همراه یادداشت مشخص ارجاع شد.»

پایان از 56 تا 60 ثانیه: «یادداشت ارجاع رو به یک درخواست قابل انجام تبدیل کن.»

متن حدود 73 واژه دارد؛ برآورد 1.22 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از جزئیات نامه | متن روی تصویر: نامه رو با درخواست روشن ارجاع بده؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ارجاع با آیکون پیکان؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی گیرندگان → افزودن گیرنده نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از ارسال رو می‌زنیم و ثبت ارجاع رو بررسی می‌کنیم. | موس از روی متن کنار برود؛ در موفقیت اعلان ارسال و بازخوانی رشته انجام می‌شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ارجاع با آیکون پیکان» و نتیجهٔ «ارسال رو می‌زنیم و ثبت ارجاع رو بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «جزئیات نامه» و کنترل «ارجاع با آیکون پیکان» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر مجاز ارجاع نامه با دسترسی mail» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: در موفقیت اعلان ارسال و بازخوانی رشته انجام می‌شود.
- [ ] شرط‌های توقف بررسی شدند: ارجاع با پاسخ داخل مکاتبات فرق دارد. متن body جدید در payload ارجاع ارسال نمی‌شود و note استفاده می‌شود؛ آموزش ویرایش اصل نامه در ارجاع اشتباه است. ارسال فقط به حساب‌های آزمایشی.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ارجاع نامهٔ موجود به گیرندهٔ آزمایشی همراه یادداشت.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V37 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V38 بایگانی و بازگرداندن نامه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | بایگانی و بازگرداندن نامه |
| عنوان انتشار | نامهٔ پیگیری‌شده رو از فهرست جاری کنار بگذار |
| ماژول | نامه‌ها |
| هدف آموزشی | بایگانی نامهٔ دریافتی و بازگرداندن آن از پوشهٔ بایگانی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | گیرندهٔ نامه با قابلیت بایگانی |
| سطح | ساده |
| زمان هدف | 60 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /mail |
| پیش‌نیاز | نامهٔ دریافتی نمونه برای حساب ضبط و خارج از بایگانی؛ حساب صرفاً فرستنده نباشد. |
| نتیجهٔ یادگیری | بایگانی نامهٔ دریافتی و بازگرداندن آن از پوشهٔ بایگانی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/mail/views/widgets/letter_context_menu.dart:12](../faro-flutter/lib/features/mail/views/widgets/letter_context_menu.dart#L12)؛ [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157)؛ [lib/features/mail/view_models/mail_view_model.dart:16](../faro-flutter/lib/features/mail/view_models/mail_view_model.dart#L16)؛ [lib/features/mail/models/letter_model.dart:5](../faro-flutter/lib/features/mail/models/letter_model.dart#L5)

### B آماده‌سازی محیط ضبط

با نقش «گیرندهٔ نامه با قابلیت بایگانی» وارد محیط آموزشی شوید. نامهٔ دریافتی نمونه برای حساب ضبط و خارج از بایگانی؛ حساب صرفاً فرستنده نباشد.

وضعیت آغاز: نامه‌ها → ورودی باز باشد؛ کنترل «ردیف نامهٔ نمونه» در قاب قابل دیدن باشد. از نوار کناری «نامه‌ها» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: نامهٔ نمونه از بایگانی خارج و پوشهٔ ورودی با جست‌وجوی خالی باز باشد.

خطاها و شرط توقف: کنترل read/archive برای گیرنده شرطی است. این عملیات را حذف دائمی یا بایگانی برای تمام اعضای سازمان معرفی نکنید. اگر ردیف به علت جست‌وجوی فعال دیده نمی‌شود، اول عبارت را پاک کنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| موضوع نمونه | برنامه ضبط آموزش شروع کار | نامهٔ دریافتی قابل بایگانی |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | نامه‌ها → ورودی | ردیف نامهٔ نمونه | راست‌کلیک | منوی نامه باز می‌شود. |
| 2 | منوی نامه | بایگانی | کلیک و انتظار | وضعیت بایگانی ثبت و فهرست به‌روز می‌شود. |
| 3 | هدر نامه‌ها | بایگانی | انتخاب | فهرست نامه‌های بایگانی‌شده باز می‌شود. |
| 4 | ردیف بایگانی‌شده | منوی راست‌کلیک → خروج از بایگانی | راست‌کلیک و انتخاب | نامه از بایگانی خارج می‌شود. |
| 5 | هدر نامه‌ها | ورودی | انتخاب و بررسی | نامه دوباره در پوشهٔ مربوطه دیده می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | نامه‌ها → ورودی | ردیف نامهٔ نمونه | راست‌کلیک | — | منوی نامه باز می‌شود. | ردیف و منو | روی نامهٔ دریافتی راست‌کلیک می‌کنیم. |
| 2 · 17–26 ثانیه | منوی نامه | بایگانی | کلیک و انتظار | — | وضعیت بایگانی ثبت و فهرست به‌روز می‌شود. | گزینه و ردیف | بایگانی رو می‌زنیم تا نامه از پیگیری جاری کنار بره. |
| 3 · 26–34 ثانیه | هدر نامه‌ها | بایگانی | انتخاب | — | فهرست نامه‌های بایگانی‌شده باز می‌شود. | تب بایگانی | از تب بایگانی، همون نامه رو پیدا می‌کنیم. |
| 4 · 34–42 ثانیه | ردیف بایگانی‌شده | منوی راست‌کلیک → خروج از بایگانی | راست‌کلیک و انتخاب | — | نامه از بایگانی خارج می‌شود. | گزینهٔ بازگرداندن | برای برگردوندن، خروج از بایگانی رو انتخاب می‌کنیم. |
| 5 · 42–50 ثانیه | هدر نامه‌ها | ورودی | انتخاب و بررسی | — | نامه دوباره در پوشهٔ مربوطه دیده می‌شود. | ردیف برگشته | در دریافتی، برگشت نامه رو بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «نامه انجام شده، ولی هنوز جلوی چشمه؟»

معرفی مسئله از 4 تا 8 ثانیه: «نامهٔ نمونه رو بایگانی و دوباره برمی‌گردونیم.»

آموزش عملی از 8 تا 50 ثانیه:

«روی نامهٔ دریافتی راست‌کلیک می‌کنیم. بایگانی رو می‌زنیم تا نامه از پیگیری جاری کنار بره. از تب بایگانی، همون نامه رو پیدا می‌کنیم. برای برگردوندن، خروج از بایگانی رو انتخاب می‌کنیم. در دریافتی، برگشت نامه رو بررسی می‌کنیم.»

نمایش نتیجه از 50 تا 56 ثانیه: «بایگانی و بازگرداندن رو روی نامهٔ نمونه انجام دادیم.»

پایان از 56 تا 60 ثانیه: «بایگانی با حذف نامه فرق داره.»

متن حدود 67 واژه دارد؛ برآورد 1.12 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از نامه‌ها → ورودی | متن روی تصویر: نامهٔ پیگیری‌شده رو از فهرست جاری کنار بگذار؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا ردیف نامهٔ نمونه؛ قبل از کلیک مکث کوتاه. |
| 8–50 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی بایگانی نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 50–56 | نمای نهایی از در دریافتی، برگشت نامه رو بررسی می‌کنیم. | موس از روی متن کنار برود؛ نامه دوباره در پوشهٔ مربوطه دیده می‌شود. |
| 56–60 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «ردیف نامهٔ نمونه» و نتیجهٔ «در دریافتی، برگشت نامه رو بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «نامه‌ها → ورودی» و کنترل «ردیف نامهٔ نمونه» در اجرای واقعی وجود دارند.
- [ ] نقش «گیرندهٔ نامه با قابلیت بایگانی» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: نامه دوباره در پوشهٔ مربوطه دیده می‌شود.
- [ ] شرط‌های توقف بررسی شدند: کنترل read/archive برای گیرنده شرطی است. این عملیات را حذف دائمی یا بایگانی برای تمام اعضای سازمان معرفی نکنید. اگر ردیف به علت جست‌وجوی فعال دیده نمی‌شود، اول عبارت را پاک کنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: بایگانی نامهٔ دریافتی و بازگرداندن آن از پوشهٔ بایگانی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 60 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V38 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V39 مرجع میانبرها و بازکردن نوار کناری

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | مرجع میانبرها و بازکردن نوار کناری |
| عنوان انتشار | میانبرهای فارو رو از داخل خودش پیدا کن |
| ماژول | افزایش سرعت |
| هدف آموزشی | بازکردن راهنمای میانبر و استفاده از میانبر نوار کناری |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | کاربر واردشده در نسخهٔ دسکتاپ |
| سطح | ساده |
| زمان هدف | 45 ثانیه |
| اولویت | P1 |
| مسیر دقیق | هر صفحه → Ctrl+/ |
| پیش‌نیاز | هیچ ورودی متن فوکوس نداشته باشد؛ چیدمان ویندوز با صفحه‌کلید لاتین برای نمایش کلیدها؛ قاب دسکتاپ باز باشد. |
| نتیجهٔ یادگیری | بازکردن راهنمای میانبر و استفاده از میانبر نوار کناری |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/core/shortcuts/app_shortcuts.dart:15](../faro-flutter/lib/core/shortcuts/app_shortcuts.dart#L15)؛ [lib/core/shortcuts/app_shortcuts_dialog.dart:33](../faro-flutter/lib/core/shortcuts/app_shortcuts_dialog.dart#L33)؛ [lib/app/shell/views/app_shell_view.dart:49](../faro-flutter/lib/app/shell/views/app_shell_view.dart#L49)

### B آماده‌سازی محیط ضبط

با نقش «کاربر واردشده در نسخهٔ دسکتاپ» وارد محیط آموزشی شوید. هیچ ورودی متن فوکوس نداشته باشد؛ چیدمان ویندوز با صفحه‌کلید لاتین برای نمایش کلیدها؛ قاب دسکتاپ باز باشد.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «Ctrl+/» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: راهنمای میانبر بسته، نوار کناری باز و فوکوس خارج از ورودی باشد.

خطاها و شرط توقف: فقط داشتن constant در AppShortcuts اثبات binding فعال نیست؛ سیم‌کشی در app_shell_view و دیالوگ میانبر بررسی شده اما رفتار سیستم‌عامل نیازمند اجراست. میانبرهای Quit یا بستن نشست را برای نمونه آزمایش نکنید.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| میانبر راهنما | Ctrl+/ | در مک Cmd+/ |
| میانبر نوار کناری | Ctrl+B | در مک Cmd+B |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | Ctrl+/ | فشردن میانبر | راهنمای میانبرهای صفحه‌کلید باز می‌شود. |
| 2 | راهنمای میانبرها | میانبر جست‌وجو و نوار کناری | اسکرول کوتاه و اشاره؛ «Ctrl+K و Ctrl+B» را وارد کنید | کلیدهای ثبت‌شده قابل مشاهده‌اند. |
| 3 | راهنمای میانبرها | Esc | فشردن | راهنما بسته می‌شود. |
| 4 | صفحهٔ هوش مصنوعی | Ctrl+B | فشردن | نوار کناری جمع می‌شود. |
| 5 | صفحهٔ هوش مصنوعی | Ctrl+B | فشردن دوباره | نوار دوباره باز می‌شود. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 7–13 ثانیه | صفحهٔ هوش مصنوعی | Ctrl+/ | فشردن میانبر | — | راهنمای میانبرهای صفحه‌کلید باز می‌شود. | پنجرهٔ راهنما | با کنترل و اسلش، راهنمای میانبرها رو باز می‌کنیم. |
| 2 · 13–19 ثانیه | راهنمای میانبرها | میانبر جست‌وجو و نوار کناری | اسکرول کوتاه و اشاره | Ctrl+K و Ctrl+B | کلیدهای ثبت‌شده قابل مشاهده‌اند. | دو میانبر در راهنما | میانبرهای موردنیازمون رو از همین راهنما می‌خونیم. |
| 3 · 19–25 ثانیه | راهنمای میانبرها | Esc | فشردن | — | راهنما بسته می‌شود. | بازگشت به صفحه | با اسکیپ به صفحه برمی‌گردیم. |
| 4 · 25–31 ثانیه | صفحهٔ هوش مصنوعی | Ctrl+B | فشردن | — | نوار کناری جمع می‌شود. | لبهٔ نوار و محتوای صفحه | با کنترل و بی، نوار کناری رو جمع می‌کنیم. |
| 5 · 31–37 ثانیه | صفحهٔ هوش مصنوعی | Ctrl+B | فشردن دوباره | — | نوار دوباره باز می‌شود. | نوار بازشده | با همون میانبر، دوباره بازش می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «میانبرها رو حفظ نیستی؟ لازم نیست حدس بزنی.»

معرفی مسئله از 4 تا 7 ثانیه: «راهنمای میانبرها رو باز می‌کنیم و یک مورد رو امتحان می‌کنیم.»

آموزش عملی از 7 تا 37 ثانیه:

«با کنترل و اسلش، راهنمای میانبرها رو باز می‌کنیم. میانبرهای موردنیازمون رو از همین راهنما می‌خونیم. با اسکیپ به صفحه برمی‌گردیم. با کنترل و بی، نوار کناری رو جمع می‌کنیم. با همون میانبر، دوباره بازش می‌کنیم.»

نمایش نتیجه از 37 تا 42 ثانیه: «راهنمای میانبرها رو پیدا کردیم و یکی رو امتحان کردیم.»

پایان از 42 تا 45 ثانیه: «در مک، کلیدهای نمایش‌داده‌شدهٔ همون نسخه رو دنبال کن.»

متن حدود 74 واژه دارد؛ برآورد 1.64 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: میانبرهای فارو رو از داخل خودش پیدا کن؛ هوک همزمان خوانده شود. |
| 4–7 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا Ctrl+/؛ قبل از کلیک مکث کوتاه. |
| 7–37 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی میانبر جست‌وجو و نوار کناری نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 37–42 | نمای نهایی از با همون میانبر، دوباره بازش می‌کنیم. | موس از روی متن کنار برود؛ نوار دوباره باز می‌شود. |
| 42–45 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «Ctrl+/» و نتیجهٔ «با همون میانبر، دوباره بازش می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «Ctrl+/» در اجرای واقعی وجود دارند.
- [ ] نقش «کاربر واردشده در نسخهٔ دسکتاپ» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: نوار دوباره باز می‌شود.
- [ ] شرط‌های توقف بررسی شدند: فقط داشتن constant در AppShortcuts اثبات binding فعال نیست؛ سیم‌کشی در app_shell_view و دیالوگ میانبر بررسی شده اما رفتار سیستم‌عامل نیازمند اجراست. میانبرهای Quit یا بستن نشست را برای نمونه آزمایش نکنید.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: بازکردن راهنمای میانبر و استفاده از میانبر نوار کناری.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 45 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V39 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V40 ویرایش توضیح فضای کاری

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | ویرایش توضیح فضای کاری |
| عنوان انتشار | هدف فضای تیم رو در تنظیمات روشن نگه دار |
| ماژول | فضای کاری |
| هدف آموزشی | ویرایش توضیحات فضای کاری و بررسی ماندگاری پس از بازخوانی |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | مدیر یا مالک با isManager |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /ai → منوی فضای کاری → تنظیمات |
| پیش‌نیاز | استودیو آموزش فارو فعال؛ حساب مجاز مدیریت؛ هیچ عملیات حذف یا ترک فضا در این برداشت اجرا نشود. |
| نتیجهٔ یادگیری | ویرایش توضیحات فضای کاری و بررسی ماندگاری پس از بازخوانی |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart:138](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart#L138)؛ [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550)؛ [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35)

### B آماده‌سازی محیط ضبط

با نقش «مدیر یا مالک با isManager» وارد محیط آموزشی شوید. استودیو آموزش فارو فعال؛ حساب مجاز مدیریت؛ هیچ عملیات حذف یا ترک فضا در این برداشت اجرا نشود.

وضعیت آغاز: صفحهٔ هوش مصنوعی باز باشد؛ کنترل «نام فضای کاری» در قاب قابل دیدن باشد. از نوار کناری «هوش مصنوعی» را باز کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: توضیح فضای مصرفی را به متن پایه برگردانید؛ از ناحیهٔ حساس استفاده نکنید.

خطاها و شرط توقف: ویجت تنظیمات قبل از تکمیل callback والد می‌تواند toast موفقیت نشان دهد؛ بنابراین فقط toast ملاک نیست. URL Slug در UI هست ولی تضمین آدرس اختصاصی از این فرم داده نشود. ناحیهٔ حساس از قاب این ویدیو خارج بماند.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| توضیحات فضای کاری | تیم نمونه برای تولید، ضبط و بازبینی آموزش‌های فارو | متن آموزشی |
| عنوان فضای کاری | استودیو آموزش فارو | در این برداشت تغییر نکند. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ هوش مصنوعی | نام فضای کاری | کلیک | منوی فضای کاری باز می‌شود. |
| 2 | منوی فضای کاری | تنظیمات | کلیک | پنجرهٔ مدیریت روی تب تنظیمات باز می‌شود. |
| 3 | تنظیمات فضای کاری | توضیحات فضای کاری | انتخاب متن و تایپ؛ «تیم نمونه برای تولید، ضبط و بازبینی آموزش‌های فارو» را وارد کنید | تغییرات آمادهٔ ذخیره هستند. |
| 4 | پایین پنجره | ذخیره تغییرات | کلیک و انتظار | callback ذخیره به والد ارسال می‌شود؛ درخواست سرور باید کامل شود. |
| 5 | صفحهٔ هوش مصنوعی | Ctrl+R و بازگشایی تنظیمات | تازه‌سازی و دوباره بازکردن همان منو | متن تازه باید بعد از بازخوانی هم باقی مانده باشد. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ هوش مصنوعی | نام فضای کاری | کلیک | — | منوی فضای کاری باز می‌شود. | عنوان فضای فعال | منوی فضای کاری فعال رو باز می‌کنیم. |
| 2 · 18–28 ثانیه | منوی فضای کاری | تنظیمات | کلیک | — | پنجرهٔ مدیریت روی تب تنظیمات باز می‌شود. | عنوان تنظیمات | تنظیمات رو انتخاب می‌کنیم. |
| 3 · 28–37 ثانیه | تنظیمات فضای کاری | توضیحات فضای کاری | انتخاب متن و تایپ | تیم نمونه برای تولید، ضبط و بازبینی آموزش‌های فارو | تغییرات آمادهٔ ذخیره هستند. | فیلد توضیحات | هدف این فضای کاری رو با یک توضیح کوتاه به‌روز می‌کنیم. |
| 4 · 37–46 ثانیه | پایین پنجره | ذخیره تغییرات | کلیک و انتظار | — | callback ذخیره به والد ارسال می‌شود؛ درخواست سرور باید کامل شود. | دکمه و پیام نتیجه | ذخیره رو می‌زنیم و منتظر پایان عملیات می‌مونیم. |
| 5 · 46–55 ثانیه | صفحهٔ هوش مصنوعی | Ctrl+R و بازگشایی تنظیمات | تازه‌سازی و دوباره بازکردن همان منو | — | متن تازه باید بعد از بازخوانی هم باقی مانده باشد. | فیلد بازخوانی‌شده | تنظیمات رو دوباره باز می‌کنیم تا ماندگاری توضیح رو بررسی کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «این فضای کاری برای چه هدفی ساخته شده؟»

معرفی مسئله از 4 تا 8 ثانیه: «توضیح فضای کاری آموزشی رو به‌روز می‌کنیم.»

آموزش عملی از 8 تا 55 ثانیه:

«منوی فضای کاری فعال رو باز می‌کنیم. تنظیمات رو انتخاب می‌کنیم. هدف این فضای کاری رو با یک توضیح کوتاه به‌روز می‌کنیم. ذخیره رو می‌زنیم و منتظر پایان عملیات می‌مونیم. تنظیمات رو دوباره باز می‌کنیم تا ماندگاری توضیح رو بررسی کنیم.»

نمایش نتیجه از 55 تا 61 ثانیه: «توضیح هدف تیم بعد از بازخوانی هم قابل مشاهده‌ست.»

پایان از 61 تا 65 ثانیه: «عنوان و توضیح روشن، انتخاب فضای درست رو ساده‌تر می‌کنه.»

متن حدود 75 واژه دارد؛ برآورد 1.15 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ هوش مصنوعی | متن روی تصویر: هدف فضای تیم رو در تنظیمات روشن نگه دار؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا نام فضای کاری؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی تنظیمات نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از تنظیمات رو دوباره باز می‌کنیم تا ماندگاری توضیح رو بررسی کنیم. | موس از روی متن کنار برود؛ متن تازه باید بعد از بازخوانی هم باقی مانده باشد. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «نام فضای کاری» و نتیجهٔ «تنظیمات رو دوباره باز می‌کنیم تا ماندگاری توضیح رو بررسی کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ هوش مصنوعی» و کنترل «نام فضای کاری» در اجرای واقعی وجود دارند.
- [ ] نقش «مدیر یا مالک با isManager» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: متن تازه باید بعد از بازخوانی هم باقی مانده باشد.
- [ ] شرط‌های توقف بررسی شدند: ویجت تنظیمات قبل از تکمیل callback والد می‌تواند toast موفقیت نشان دهد؛ بنابراین فقط toast ملاک نیست. URL Slug در UI هست ولی تضمین آدرس اختصاصی از این فرم داده نشود. ناحیهٔ حساس از قاب این ویدیو خارج بماند.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: ویرایش توضیحات فضای کاری و بررسی ماندگاری پس از بازخوانی.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V40 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V41 تنظیم دستورالعمل هوش مصنوعی پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | تنظیم دستورالعمل هوش مصنوعی پروژه |
| عنوان انتشار | لحن دستیار پروژه رو روشن تعریف کن |
| ماژول | پروژه و هوش مصنوعی |
| هدف آموزشی | نوشتن و ذخیرهٔ دستورالعمل سیستم در تنظیمات AI پروژه |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | مدیر یا مالک پروژه |
| سطح | متوسط |
| زمان هدف | 65 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile?tab=projects → تنظیمات پروژه → هوش مصنوعی |
| پیش‌نیاز | پروژهٔ انتشار پاییز موجود؛ دستورالعمل قبلی خالی یا متن پایهٔ آموزشی باشد؛ حساب مدیر پروژه. تأثیر روی پاسخ‌های قدیمی در این ویدیو ادعا نمی‌شود. |
| نتیجهٔ یادگیری | نوشتن و ذخیرهٔ دستورالعمل سیستم در تنظیمات AI پروژه |
| وضعیت | کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده |


شواهد همان نسخه: [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10)؛ [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533)؛ [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35)

### B آماده‌سازی محیط ضبط

با نقش «مدیر یا مالک پروژه» وارد محیط آموزشی شوید. پروژهٔ انتشار پاییز موجود؛ دستورالعمل قبلی خالی یا متن پایهٔ آموزشی باشد؛ حساب مدیر پروژه. تأثیر روی پاسخ‌های قدیمی در این ویدیو ادعا نمی‌شود.

وضعیت آغاز: صفحهٔ حساب، زبانهٔ «پروژه‌ها» باز باشد؛ کنترل «منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: دستورالعمل AI پروژهٔ مصرفی به متن پایه برگردد؛ از پروژهٔ واقعی برای آزمایش استفاده نشود.

خطاها و شرط توقف: toast تنظیمات پروژه هم به‌تنهایی اثبات ذخیرهٔ سرور نیست. تنظیمات از دو مسیر به updateProject می‌رسد؛ ماندگاری باید در اجرا کنترل شود. رفتار مدل و استفاده از systemPrompt در سرویس تولید از این فرم به‌تنهایی تضمین نمی‌شود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| دستورالعمل سیستم | پاسخ‌ها را فارسی، روشن و کوتاه بنویس. برای برنامه‌ریزی ضبط، اقدامات را به ترتیب اجرا فهرست کن. | بدون دادهٔ محرمانه |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب، زبانهٔ «پروژه‌ها» | منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات | بازکردن | تنظیمات پروژه باز می‌شود. |
| 2 | تنظیمات پروژه | هوش مصنوعی | انتخاب زبانه | بخش دستورالعمل و پایگاه دانش دیده می‌شود. |
| 3 | زبانهٔ هوش مصنوعی | دستورالعمل سیستم (System Prompt) | انتخاب متن و تایپ؛ «پاسخ‌ها را فارسی، روشن و کوتاه بنویس. برای برنامه‌ریزی ضبط، اقدامات را به ترتیب اجرا فهرست کن.» را وارد کنید | متن در پیش‌نویس تنظیمات قرار می‌گیرد. |
| 4 | تنظیمات پروژه | ذخیره تغییرات | کلیک و انتظار | تغییرات به callback ذخیره ارسال می‌شوند؛ موفقیت سرور باید جدا بررسی شود. |
| 5 | تنظیمات پروژه پس از بازخوانی | همان فیلد دستورالعمل سیستم | بستن، تازه‌سازی و بازگشایی | متن ذخیره‌شده باید پابرجا باشد. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–18 ثانیه | صفحهٔ حساب، زبانهٔ «پروژه‌ها» | منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات | بازکردن | — | تنظیمات پروژه باز می‌شود. | نام پروژه و عنوان تنظیمات | تنظیمات پروژهٔ انتشار پاییز رو باز می‌کنیم. |
| 2 · 18–28 ثانیه | تنظیمات پروژه | هوش مصنوعی | انتخاب زبانه | — | بخش دستورالعمل و پایگاه دانش دیده می‌شود. | تب هوش مصنوعی | به زبانهٔ هوش مصنوعی می‌ریم. |
| 3 · 28–37 ثانیه | زبانهٔ هوش مصنوعی | دستورالعمل سیستم (System Prompt) | انتخاب متن و تایپ | پاسخ‌ها را فارسی، روشن و کوتاه بنویس. برای برنامه‌ریزی ضبط، اقدامات را به ترتیب اجرا فهرست کن. | متن در پیش‌نویس تنظیمات قرار می‌گیرد. | فیلد دستورالعمل | لحن و شکل خروجی موردنیاز پروژه رو مشخص می‌کنیم. |
| 4 · 37–46 ثانیه | تنظیمات پروژه | ذخیره تغییرات | کلیک و انتظار | — | تغییرات به callback ذخیره ارسال می‌شوند؛ موفقیت سرور باید جدا بررسی شود. | ذخیره | تغییرات رو ذخیره می‌کنیم. |
| 5 · 46–55 ثانیه | تنظیمات پروژه پس از بازخوانی | همان فیلد دستورالعمل سیستم | بستن، تازه‌سازی و بازگشایی | — | متن ذخیره‌شده باید پابرجا باشد. | متن بازخوانی‌شده | با بازکردن دوباره بررسی می‌کنیم که متن واقعاً ثبت شده باشه. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «برای پاسخ‌های این پروژه چه لحنی می‌خوای؟»

معرفی مسئله از 4 تا 8 ثانیه: «برای لحن و شکل خروجی، دستورالعمل پروژه می‌نویسیم.»

آموزش عملی از 8 تا 55 ثانیه:

«تنظیمات پروژهٔ انتشار پاییز رو باز می‌کنیم. به زبانهٔ هوش مصنوعی می‌ریم. لحن و شکل خروجی موردنیاز پروژه رو مشخص می‌کنیم. تغییرات رو ذخیره می‌کنیم. با بازکردن دوباره بررسی می‌کنیم که متن واقعاً ثبت شده باشه.»

نمایش نتیجه از 55 تا 61 ثانیه: «دستورالعمل پروژه بعد از بازخوانی قابل مشاهده‌ست.»

پایان از 61 تا 65 ثانیه: «نتیجهٔ عملی رو در یک گفت‌وگوی تازه و با بازبینی پاسخ بسنج.»

متن حدود 70 واژه دارد؛ برآورد 1.08 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب، زبانهٔ «پروژه‌ها» | متن روی تصویر: لحن دستیار پروژه رو روشن تعریف کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات؛ قبل از کلیک مکث کوتاه. |
| 8–55 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی هوش مصنوعی نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 55–61 | نمای نهایی از با بازکردن دوباره بررسی می‌کنیم که متن واقعاً ثبت شده باشه. | موس از روی متن کنار برود؛ متن ذخیره‌شده باید پابرجا باشد. |
| 61–65 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات» و نتیجهٔ «با بازکردن دوباره بررسی می‌کنیم که متن واقعاً ثبت شده باشه.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب، زبانهٔ «پروژه‌ها»» و کنترل «منوی سه‌نقطهٔ ردیف انتشار پاییز → تنظیمات» در اجرای واقعی وجود دارند.
- [ ] نقش «مدیر یا مالک پروژه» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: متن ذخیره‌شده باید پابرجا باشد.
- [ ] شرط‌های توقف بررسی شدند: toast تنظیمات پروژه هم به‌تنهایی اثبات ذخیرهٔ سرور نیست. تنظیمات از دو مسیر به updateProject می‌رسد؛ ماندگاری باید در اجرا کنترل شود. رفتار مدل و استفاده از systemPrompt در سرویس تولید از این فرم به‌تنهایی تضمین نمی‌شود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: نوشتن و ذخیرهٔ دستورالعمل سیستم در تنظیمات AI پروژه.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 65 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V41 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

## V42 بارگذاری فایل دانشی پروژه

### A شناسنامه سناریو

| فیلد | مقدار |
| --- | --- |
| عنوان اصلی | بارگذاری فایل دانشی پروژه |
| عنوان انتشار | سند نمونه رو برای پردازش دانشی آماده کن |
| ماژول | پروژه و هوش مصنوعی |
| هدف آموزشی | بارگذاری فایل دانشی و تشخیص تفاوت بارگذاری و آماده‌بودن پردازش |
| مخاطب | کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه |
| نقش موردنیاز | مدیر پروژه با مجوز فایل و سرویس RAG |
| سطح | پیشرفته |
| زمان هدف | 70 ثانیه |
| اولویت | P1 |
| مسیر دقیق | /profile?tab=projects → تنظیمات → هوش مصنوعی |
| پیش‌نیاز | فایل sample-brief.txt موجود؛ پروژهٔ انتشار پاییز مجاز بارگذاری فایل باشد. endpoint پروژه و نوشتهٔ جدید UI دربارهٔ پایگاه دانش فضای کاری باید پیش از انتشار با محیط واقعی تطبیق داده شوند. |
| نتیجهٔ یادگیری | بارگذاری فایل دانشی و تشخیص تفاوت بارگذاری و آماده‌بودن پردازش |
| وضعیت | توقف انتشار تا رفع ابهام پایگاه دانش و آزمون اجرایی |


شواهد همان نسخه: [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533)؛ [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10)؛ [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35)؛ [lib/core/network/api_endpoints.dart:5](../faro-flutter/lib/core/network/api_endpoints.dart#L5)

### B آماده‌سازی محیط ضبط

با نقش «مدیر پروژه با مجوز فایل و سرویس RAG» وارد محیط آموزشی شوید. فایل sample-brief.txt موجود؛ پروژهٔ انتشار پاییز مجاز بارگذاری فایل باشد. endpoint پروژه و نوشتهٔ جدید UI دربارهٔ پایگاه دانش فضای کاری باید پیش از انتشار با محیط واقعی تطبیق داده شوند.

وضعیت آغاز: صفحهٔ حساب، زبانهٔ «پروژه‌ها» باز باشد؛ کنترل «منوی ردیف انتشار پاییز → تنظیمات» در قاب قابل دیدن باشد. از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید. زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: فایل هم‌نام در پروژهٔ مصرفی نباشد؛ فایل مشترک یا دانشی مورد استفادهٔ دیگران حذف نشود.

خطاها و شرط توقف: متن UI می‌گوید پایگاه دانش در سطح فضای کاری ساخته می‌شود، اما این کنترل هنوز getProjectFiles و uploadProjectFile را صدا می‌زند. این ناسازگاری باید در اجرای محصول روشن شود؛ تا آن زمان ویدیو متوقف برای انتشار است. انتقال خودکار دانش به هر مدل یا تضمین کیفیت پاسخ ادعا نشود.

### C داده‌های آزمایشی

| فیلد | مقدار آزمایشی | اعتبار و وابستگی |
| --- | --- | --- |
| فایل دانشی | sample-brief.txt | پسوند txt در فهرست مجاز انتخابگر است؛ پردازش سرویس جداست. |


### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

| گام | کجا بروم؟ | روی چه چیزی بزنم؟ | چه کاری انجام بدهم؟ | چه چیزی باید ببینم؟ |
| --- | --- | --- | --- | --- |
| 1 | صفحهٔ حساب، زبانهٔ «پروژه‌ها» | منوی ردیف انتشار پاییز → تنظیمات | بازکردن | پنجرهٔ تنظیمات همان پروژه باز می‌شود. |
| 2 | تنظیمات پروژه | هوش مصنوعی | انتخاب زبانه | بخش پایگاه دانش و فایل‌ها نمایش داده می‌شود. |
| 3 | پایگاه دانش | بارگذاری فایل دانشی | کلیک | انتخابگر فایل باز می‌شود. |
| 4 | انتخابگر سیستم | sample-brief.txt | انتخاب و تأیید؛ «sample-brief.txt» را وارد کنید | بارگذاری شروع و پیشرفت ارسال نشان داده می‌شود. |
| 5 | فهرست فایل دانشی | ردیف sample-brief.txt | انتظار پاسخ بارگذاری | فایل در فهرست اضافه می‌شود؛ وضعیت پردازش ممکن است هنوز آماده نباشد. |
| 6 | همان ردیف | در حال پردازش یا آماده استفاده یا خطا در پردازش | مشاهده تا وضعیت واقعی؛ زمان انتظار با برش کوتاه شود | وضعیت واقعی دیده می‌شود؛ فقط در حالت آماده استفاده برداشت موفق ادامه می‌یابد. |


زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

| مرحله و زمان | مسیر یا صفحه | عنصر UI و متن کنترل | تعامل ضبط‌کننده | دادهٔ تست | خروجی مورد انتظار | تمرکز تصویر | نریشن هماهنگ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 8–17 ثانیه | صفحهٔ حساب، زبانهٔ «پروژه‌ها» | منوی ردیف انتشار پاییز → تنظیمات | بازکردن | — | پنجرهٔ تنظیمات همان پروژه باز می‌شود. | نام پروژه | تنظیمات همین پروژه رو باز می‌کنیم. |
| 2 · 17–26 ثانیه | تنظیمات پروژه | هوش مصنوعی | انتخاب زبانه | — | بخش پایگاه دانش و فایل‌ها نمایش داده می‌شود. | عنوان پایگاه دانش | از زبانهٔ هوش مصنوعی به بخش پایگاه دانش می‌رسیم. |
| 3 · 26–35 ثانیه | پایگاه دانش | بارگذاری فایل دانشی | کلیک | — | انتخابگر فایل باز می‌شود. | دکمهٔ بارگذاری | بارگذاری فایل دانشی رو انتخاب می‌کنیم. |
| 4 · 35–43 ثانیه | انتخابگر سیستم | sample-brief.txt | انتخاب و تأیید | sample-brief.txt | بارگذاری شروع و پیشرفت ارسال نشان داده می‌شود. | نام فایل و درصد پیشرفت | فایل آموزشی رو انتخاب می‌کنیم و ارسال رو می‌بینیم. |
| 5 · 43–51 ثانیه | فهرست فایل دانشی | ردیف sample-brief.txt | انتظار پاسخ بارگذاری | — | فایل در فهرست اضافه می‌شود؛ وضعیت پردازش ممکن است هنوز آماده نباشد. | ردیف و نشان وضعیت | ثبت فایل با آماده‌شدن محتوای دانشی فرق داره. |
| 6 · 51–59 ثانیه | همان ردیف | در حال پردازش یا آماده استفاده یا خطا در پردازش | مشاهده تا وضعیت واقعی؛ زمان انتظار با برش کوتاه شود | — | وضعیت واقعی دیده می‌شود؛ فقط در حالت آماده استفاده برداشت موفق ادامه می‌یابد. | نشان وضعیت | قبل از استفاده، وضعیت پردازش رو از کنار همین فایل بررسی می‌کنیم. |


### E متن آمادهٔ گویندگی

هوک از ۰ تا 4 ثانیه: «فایل ارسال شد؛ یعنی هوش مصنوعی همین حالا آمادهٔ استفاده از اونه؟»

معرفی مسئله از 4 تا 8 ثانیه: «فایل نمونه رو می‌فرستیم و وضعیت پردازش رو بررسی می‌کنیم.»

آموزش عملی از 8 تا 59 ثانیه:

«تنظیمات همین پروژه رو باز می‌کنیم. از زبانهٔ هوش مصنوعی به بخش پایگاه دانش می‌رسیم. بارگذاری فایل دانشی رو انتخاب می‌کنیم. فایل آموزشی رو انتخاب می‌کنیم و ارسال رو می‌بینیم. ثبت فایل با آماده‌شدن محتوای دانشی فرق داره. قبل از استفاده، وضعیت پردازش رو از کنار همین فایل بررسی می‌کنیم.»

نمایش نتیجه از 59 تا 66 ثانیه: «وضعیت فایل رو جدا از موفقیت بارگذاری بررسی کردیم.»

پایان از 66 تا 70 ثانیه: «تا وقتی پردازش آماده نیست، استفادهٔ موفق از محتوا رو وعده ندیم.»

متن حدود 93 واژه دارد؛ برآورد 1.33 واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

| بازه | نما و حرکت | کلیک یا مکث و تدوین |
| --- | --- | --- |
| ۰–4 | نمای آغاز از صفحهٔ حساب، زبانهٔ «پروژه‌ها» | متن روی تصویر: سند نمونه رو برای پردازش دانشی آماده کن؛ هوک همزمان خوانده شود. |
| 4–8 | یک نمای معرف از نام فضا یا رکورد و کنترل شروع | حرکت کوتاه موس تا منوی ردیف انتشار پاییز → تنظیمات؛ قبل از کلیک مکث کوتاه. |
| 8–59 | نماهای مرحله‌ای مطابق ستون تمرکز تصویر | روی هوش مصنوعی نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند. |
| 59–66 | نمای نهایی از قبل از استفاده، وضعیت پردازش رو از کنار همین فایل بررسی می‌کنیم. | موس از روی متن کنار برود؛ وضعیت واقعی دیده می‌شود؛ فقط در حالت آماده استفاده برداشت موفق ادامه می‌یابد. |
| 66–70 | حفظ نمای نهایی و پایان آرام | پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه. |


نسخهٔ عمودی: کنترل «منوی ردیف انتشار پاییز → تنظیمات» و نتیجهٔ «قبل از استفاده، وضعیت پردازش رو از کنار همین فایل بررسی می‌کنیم.» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «صفحهٔ حساب، زبانهٔ «پروژه‌ها»» و کنترل «منوی ردیف انتشار پاییز → تنظیمات» در اجرای واقعی وجود دارند.
- [ ] نقش «مدیر پروژه با مجوز فایل و سرویس RAG» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: وضعیت واقعی دیده می‌شود؛ فقط در حالت آماده استفاده برداشت موفق ادامه می‌یابد.
- [ ] شرط‌های توقف بررسی شدند: متن UI می‌گوید پایگاه دانش در سطح فضای کاری ساخته می‌شود، اما این کنترل هنوز getProjectFiles و uploadProjectFile را صدا می‌زند. این ناسازگاری باید در اجرای محصول روشن شود؛ تا آن زمان ویدیو متوقف برای انتشار است. انتقال خودکار دانش به هر مدل یا تضمین کیفیت پاسخ ادعا نشود.
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: بارگذاری فایل دانشی و تشخیص تفاوت بارگذاری و آماده‌بودن پردازش.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها 70 ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ V42 در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.


## فهرست شواهد قابل بازبینی

| کد شاهد | فایل و خط | عبارت لنگر |
| --- | --- | --- |
| router | [lib/app/router/app_router.dart:39](../faro-flutter/lib/app/router/app_router.dart#L39) | final appRouterProvider |
| routes | [lib/app/router/route_names.dart:2](../faro-flutter/lib/app/router/route_names.dart#L2) | abstract final class RouteNames |
| modules | [lib/app/registry/module_registry.dart:29](../faro-flutter/lib/app/registry/module_registry.dart#L29) | defaultModules |
| app_shell | [lib/app/shell/views/app_shell_view.dart:49](../faro-flutter/lib/app/shell/views/app_shell_view.dart#L49) | class AppShellView |
| sidebar | [lib/app/shell/views/widgets/sidebar/app_sidebar.dart:643](../faro-flutter/lib/app/shell/views/widgets/sidebar/app_sidebar.dart#L643) | 'settings.language' |
| sidebar_create | [lib/app/shell/views/widgets/sidebar/sidebar_create_dropdown.dart:184](../faro-flutter/lib/app/shell/views/widgets/sidebar/sidebar_create_dropdown.dart#L184) | 'sidebar.cta.new_workspace' |
| settings | [lib/core/services/app_settings_service.dart:336](../faro-flutter/lib/core/services/app_settings_service.dart#L336) | class AppSettings |
| permissions | [lib/app/shell/utils/app_permission_guard.dart:40](../faro-flutter/lib/app/shell/utils/app_permission_guard.dart#L40) | checkManageProjects |
| workspace_model | [lib/app/shell/models/app_workspace_model.dart:8](../faro-flutter/lib/app/shell/models/app_workspace_model.dart#L8) | class AppWorkspaceModel |
| workspace_selector | [lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart:324](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_selector_dropdown.dart#L324) | 'workspace.members_permissions' |
| workspace_create | [lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart:169](../faro-flutter/lib/app/shell/views/widgets/sidebar/create_workspace_dialog.dart#L169) | Future<void> _handleCreate |
| workspace_members | [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart:267](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_members_tab.dart#L267) | Future<void> _handleInvite |
| workspace_settings | [lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart:138](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management/workspace_settings_tab.dart#L138) | Future<void> _handleSave |
| workspace_management | [lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart:550](../faro-flutter/lib/app/shell/views/widgets/sidebar/workspace_management_dialog.dart#L550) | Future<void> _handleSaveSettings |
| shell_vm | [lib/app/shell/view_models/shell_view_model.dart:74](../faro-flutter/lib/app/shell/view_models/shell_view_model.dart#L74) | class ShellViewModel |
| shell_repo | [lib/app/shell/repositories/dio_shell_repository.dart:35](../faro-flutter/lib/app/shell/repositories/dio_shell_repository.dart#L35) | class DioShellRepository |
| profile | [lib/features/profile/views/profile_view.dart:60](../faro-flutter/lib/features/profile/views/profile_view.dart#L60) | class ProfileView |
| user_dialog | [lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart:136](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_dialog.dart#L136) | Future<bool> _handleSaveProfile |
| user_details | [lib/app/shell/views/widgets/project_header/user_profile/user_profile_details_tab.dart:104](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_profile_details_tab.dart#L104) | bool get _isUsernameValid |
| user_sessions | [lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart:43](../faro-flutter/lib/app/shell/views/widgets/project_header/user_profile/user_active_sessions_tab.dart#L43) | Future<void> _handleTerminateSession |
| auth_login | [lib/features/auth/views/login_view.dart:21](../faro-flutter/lib/features/auth/views/login_view.dart#L21) | class LoginView |
| auth_phone | [lib/features/auth/views/widgets/auth_phone_step.dart:55](../faro-flutter/lib/features/auth/views/widgets/auth_phone_step.dart#L55) | 'auth.phone_label' |
| auth_otp | [lib/features/auth/views/widgets/auth_otp_step.dart:114](../faro-flutter/lib/features/auth/views/widgets/auth_otp_step.dart#L114) | Future<void> _handleVerify |
| auth_vm | [lib/features/auth/view_models/auth_view_model.dart:111](../faro-flutter/lib/features/auth/view_models/auth_view_model.dart#L111) | Future<bool> sendOtp |
| auth_repo | [lib/features/auth/repositories/dio_auth_repository.dart:28](../faro-flutter/lib/features/auth/repositories/dio_auth_repository.dart#L28) | class DioAuthRepository |
| projects_header | [lib/features/projects/views/widgets/projects_header.dart:634](../faro-flutter/lib/features/projects/views/widgets/projects_header.dart#L634) | 'projects.new_project_button' |
| project_create | [lib/features/projects/views/widgets/create_project_dialog.dart:94](../faro-flutter/lib/features/projects/views/widgets/create_project_dialog.dart#L94) | Future<void> _handleSubmit |
| project_edit | [lib/features/projects/views/widgets/edit_project_dialog.dart:134](../faro-flutter/lib/features/projects/views/widgets/edit_project_dialog.dart#L134) | Future<void> _handleSubmit |
| project_settings | [lib/features/projects/views/widgets/project_settings_dialog.dart:10](../faro-flutter/lib/features/projects/views/widgets/project_settings_dialog.dart#L10) | showProjectSettingsDialog |
| project_settings_dropdown | [lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart:533](../faro-flutter/lib/app/shell/views/widgets/project_header/project_settings_dropdown.dart#L533) | void _handleSave |
| project_tools | [lib/app/shell/views/widgets/project_header/project_tool_tabs.dart:13](../faro-flutter/lib/app/shell/views/widgets/project_header/project_tool_tabs.dart#L13) | class ProjectToolTabs |
| project_context | [lib/features/projects/views/widgets/project_context_menu_button.dart:224](../faro-flutter/lib/features/projects/views/widgets/project_context_menu_button.dart#L224) | 'projects.pin_project' |
| project_share | [lib/features/projects/views/widgets/share_project_dialog.dart:63](../faro-flutter/lib/features/projects/views/widgets/share_project_dialog.dart#L63) | Future<void> _handleInvite |
| project_share_dropdown | [lib/app/shell/views/widgets/project_header/project_share_dropdown.dart:322](../faro-flutter/lib/app/shell/views/widgets/project_header/project_share_dropdown.dart#L322) | void _handleInvite |
| projects_view | [lib/features/projects/views/projects_view.dart:56](../faro-flutter/lib/features/projects/views/projects_view.dart#L56) | Future<void> _handleToggleArchive |
| projects_vm | [lib/features/projects/view_models/projects_view_model.dart:13](../faro-flutter/lib/features/projects/view_models/projects_view_model.dart#L13) | class ProjectsViewModel |
| ai_prompt | [lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart:811](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_prompt_input_bar.dart#L811) | void _handleSubmit |
| ai_vm | [lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart:26](../faro-flutter/lib/features/ai/project_ai_chat/view_models/project_ai_chat_view_model.dart#L26) | class ProjectAiChatViewModel |
| ai_conversation | [lib/features/ai/ai_conversation/views/ai_conversation_view.dart:40](../faro-flutter/lib/features/ai/ai_conversation/views/ai_conversation_view.dart#L40) | class AiConversationView |
| ai_conversation_vm | [lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart:30](../faro-flutter/lib/features/ai/ai_conversation/view_models/ai_conversation_view_model.dart#L30) | class AiConversationViewModel |
| ai_repo | [lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart:29](../faro-flutter/lib/features/ai/ai_conversation/repositories/dio_ai_conversation_repository.dart#L29) | class DioAiConversationRepository |
| ai_models | [lib/features/ai/project_ai_chat/repositories/dio_ai_chat_repository.dart:16](../faro-flutter/lib/features/ai/project_ai_chat/repositories/dio_ai_chat_repository.dart#L16) | class DioAiChatRepository |
| ai_model | [lib/features/ai/project_ai_chat/views/widgets/ai_model_switcher_dropdown.dart:445](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_model_switcher_dropdown.dart#L445) | 'ai.model_switcher_title' |
| ai_attachment | [lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart:138](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_attachment_menu_dropdown.dart#L138) | 'ai.attachments.file' |
| ai_filter | [lib/features/ai/project_ai_chat/views/widgets/ai_search_filter_bar.dart:27](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_search_filter_bar.dart#L27) | 'ai.search_placeholder' |
| ai_list | [lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart:17](../faro-flutter/lib/features/ai/project_ai_chat/views/widgets/ai_chat_list_section.dart#L17) | class AiChatListSection |
| ai_message_menu | [lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart:103](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_message_context_menu.dart#L103) | 'ai.context_menu.regenerate' |
| ai_header | [lib/features/ai/ai_conversation/views/widgets/ai_conversation_header.dart:168](../faro-flutter/lib/features/ai/ai_conversation/views/widgets/ai_conversation_header.dart#L168) | 'ai.share_conversation' |
| chat_new | [lib/features/chat/views/widgets/new_chat_dialog.dart:192](../faro-flutter/lib/features/chat/views/widgets/new_chat_dialog.dart#L192) | Future<void> _handleSubmit |
| chat_view | [lib/features/chat/views/chat_view.dart:41](../faro-flutter/lib/features/chat/views/chat_view.dart#L41) | class ChatView |
| chat_input | [lib/features/chat/views/widgets/chat_input_bar.dart:690](../faro-flutter/lib/features/chat/views/widgets/chat_input_bar.dart#L690) | void _handleSubmit |
| chat_attachment | [lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart:140](../faro-flutter/lib/features/chat/views/widgets/chat_attachment_menu_dropdown.dart#L140) | 'ai.attachments.file' |
| chat_message_menu | [lib/features/chat/views/widgets/chat_message_context_menu.dart:41](../faro-flutter/lib/features/chat/views/widgets/chat_message_context_menu.dart#L41) | class ChatMessageContextMenu |
| chat_messages | [lib/features/chat/views/widgets/chat_message_list_section.dart:1444](../faro-flutter/lib/features/chat/views/widgets/chat_message_list_section.dart#L1444) | showChatMessageContextMenu( |
| chat_forward | [lib/features/chat/views/widgets/forward_message_dialog.dart:119](../faro-flutter/lib/features/chat/views/widgets/forward_message_dialog.dart#L119) | Future<void> _handleForward |
| chat_room_details | [lib/features/chat/views/widgets/chat_room_details_dialog.dart:38](../faro-flutter/lib/features/chat/views/widgets/chat_room_details_dialog.dart#L38) | showChatRoomDetailsDialog |
| chat_room_context | [lib/features/chat/views/widgets/chat_room_context_menu.dart:37](../faro-flutter/lib/features/chat/views/widgets/chat_room_context_menu.dart#L37) | showLeaveChatDialog |
| chat_inbox_vm | [lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart:29](../faro-flutter/lib/features/chat/chat_inbox/view_models/chat_inbox_view_model.dart#L29) | class ChatInboxViewModel |
| chat_inbox_repo | [lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart:17](../faro-flutter/lib/features/chat/chat_inbox/repositories/dio_chat_inbox_repository.dart#L17) | class DioChatInboxRepository |
| chat_conversation_vm | [lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart:40](../faro-flutter/lib/features/chat/chat_conversation/view_models/chat_conversation_view_model.dart#L40) | class ChatConversationViewModel |
| chat_ai_attachment | [lib/features/chat/services/chat_ai_attachment_service.dart:9](../faro-flutter/lib/features/chat/services/chat_ai_attachment_service.dart#L9) | class ChatAiAttachmentService |
| task_create | [lib/features/tasks/task_creation/views/task_creation_dialog.dart:207](../faro-flutter/lib/features/tasks/task_creation/views/task_creation_dialog.dart#L207) | Future<void> _handleSubmit |
| task_create_vm | [lib/features/tasks/task_creation/view_models/task_creation_view_model.dart:533](../faro-flutter/lib/features/tasks/task_creation/view_models/task_creation_view_model.dart#L533) | String? validate() |
| task_overview | [lib/features/tasks/tasks_overview/views/tasks_overview_view.dart:27](../faro-flutter/lib/features/tasks/tasks_overview/views/tasks_overview_view.dart#L27) | class TasksOverviewView |
| task_overview_vm | [lib/features/tasks/tasks_overview/view_models/tasks_overview_view_model.dart:22](../faro-flutter/lib/features/tasks/tasks_overview/view_models/tasks_overview_view_model.dart#L22) | class TasksOverviewViewModel |
| task_header | [lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart:331](../faro-flutter/lib/features/tasks/tasks_overview/views/widgets/tasks_overview_header.dart#L331) | _sortOptions |
| task_detail | [lib/features/tasks/task_detail/views/task_detail_dialog.dart:18](../faro-flutter/lib/features/tasks/task_detail/views/task_detail_dialog.dart#L18) | showTaskDetailDialog |
| task_detail_panel | [lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart:283](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_sidebar_panel.dart#L283) | Future<void> _handleSaveAllChanges |
| task_detail_vm | [lib/features/tasks/task_detail/view_models/task_detail_view_model.dart:27](../faro-flutter/lib/features/tasks/task_detail/view_models/task_detail_view_model.dart#L27) | class TaskDetailViewModel |
| task_chat | [lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart:192](../faro-flutter/lib/features/tasks/task_detail/views/widgets/task_detail_chat_panel.dart#L192) | Future<void> _send |
| task_date | [lib/app/widgets/app_task_date_menu.dart:8](../faro-flutter/lib/app/widgets/app_task_date_menu.dart#L8) | showTaskDateMenu |
| task_reminder | [lib/app/widgets/app_task_reminder_field.dart:14](../faro-flutter/lib/app/widgets/app_task_reminder_field.dart#L14) | class AppTaskReminderField |
| time_picker | [lib/app/widgets/app_time_picker_dialog.dart:336](../faro-flutter/lib/app/widgets/app_time_picker_dialog.dart#L336) | 'time_picker.confirm' |
| task_board | [lib/features/tasks/task_board/views/task_board_view.dart:138](../faro-flutter/lib/features/tasks/task_board/views/task_board_view.dart#L138) | void _handleNewColumn |
| task_board_vm | [lib/features/tasks/task_board/view_models/task_board_view_model.dart:330](../faro-flutter/lib/features/tasks/task_board/view_models/task_board_view_model.dart#L330) | Future<void> moveTaskCard |
| board_column_create | [lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart:112](../faro-flutter/lib/features/tasks/task_board/views/widgets/create_or_edit_column_dialog.dart#L112) | Future<void> _handleSubmit |
| board_column | [lib/features/tasks/task_board/views/widgets/board_column_widget.dart:209](../faro-flutter/lib/features/tasks/task_board/views/widgets/board_column_widget.dart#L209) | DragTarget<TaskModel> |
| board_card | [lib/features/tasks/task_board/views/widgets/board_task_item.dart:400](../faro-flutter/lib/features/tasks/task_board/views/widgets/board_task_item.dart#L400) | Draggable<TaskModel> |
| tasks_repo | [lib/features/tasks/repositories/dio_tasks_repository.dart:24](../faro-flutter/lib/features/tasks/repositories/dio_tasks_repository.dart#L24) | class DioTasksRepository |
| mail_inbox | [lib/features/mail/views/mail_inbox_view.dart:157](../faro-flutter/lib/features/mail/views/mail_inbox_view.dart#L157) | Future<void> _newLetter |
| mail_composer | [lib/features/mail/views/letter_composer_dialog.dart:253](../faro-flutter/lib/features/mail/views/letter_composer_dialog.dart#L253) | Future<void> _send |
| mail_composer_vm | [lib/features/mail/view_models/letter_composer_view_model.dart:213](../faro-flutter/lib/features/mail/view_models/letter_composer_view_model.dart#L213) | Future<String?> send |
| mail_input | [lib/features/mail/models/letter_input_model.dart:43](../faro-flutter/lib/features/mail/models/letter_input_model.dart#L43) | String? validate |
| mail_repo | [lib/features/mail/repositories/dio_letters_repository.dart:16](../faro-flutter/lib/features/mail/repositories/dio_letters_repository.dart#L16) | class DioLettersRepository |
| mail_header | [lib/features/mail/views/widgets/mail_header.dart:60](../faro-flutter/lib/features/mail/views/widgets/mail_header.dart#L60) | class MailFolderTabs |
| mail_vm | [lib/features/mail/view_models/mail_view_model.dart:16](../faro-flutter/lib/features/mail/view_models/mail_view_model.dart#L16) | class MailViewModel |
| mail_detail | [lib/features/mail/views/letter_detail_dialog.dart:141](../faro-flutter/lib/features/mail/views/letter_detail_dialog.dart#L141) | Future<void> _print |
| mail_paraf | [lib/features/mail/views/widgets/record_paraf_dialog.dart:63](../faro-flutter/lib/features/mail/views/widgets/record_paraf_dialog.dart#L63) | void _handleSave |
| mail_detail_vm | [lib/features/mail/view_models/letter_detail_view_model.dart:38](../faro-flutter/lib/features/mail/view_models/letter_detail_view_model.dart#L38) | class LetterDetailViewModel |
| mail_model | [lib/features/mail/models/letter_model.dart:5](../faro-flutter/lib/features/mail/models/letter_model.dart#L5) | enum LetterFolderModel |
| mail_reply | [lib/features/mail/views/widgets/letter_reply_chat_panel.dart:65](../faro-flutter/lib/features/mail/views/widgets/letter_reply_chat_panel.dart#L65) | Future<void> _send |
| mail_print | [lib/features/mail/services/letter_print_service.dart:12](../faro-flutter/lib/features/mail/services/letter_print_service.dart#L12) | class LetterPrintService |
| mail_context | [lib/features/mail/views/widgets/letter_context_menu.dart:12](../faro-flutter/lib/features/mail/views/widgets/letter_context_menu.dart#L12) | class LetterContextMenu |
| mail_label | [lib/features/mail/views/widgets/mail_label_menu.dart:7](../faro-flutter/lib/features/mail/views/widgets/mail_label_menu.dart#L7) | showMailLabelMenu |
| search_view | [lib/features/search/views/search_view.dart:206](../faro-flutter/lib/features/search/views/search_view.dart#L206) | Future<void> _open |
| search_vm | [lib/features/search/view_models/search_view_model.dart:27](../faro-flutter/lib/features/search/view_models/search_view_model.dart#L27) | class SearchViewModel |
| search_repo | [lib/features/search/repositories/search_repository.dart:16](../faro-flutter/lib/features/search/repositories/search_repository.dart#L16) | class DioSearchRepository |
| shortcuts | [lib/core/shortcuts/app_shortcuts.dart:15](../faro-flutter/lib/core/shortcuts/app_shortcuts.dart#L15) | static const search |
| shortcut_dialog | [lib/core/shortcuts/app_shortcuts_dialog.dart:33](../faro-flutter/lib/core/shortcuts/app_shortcuts_dialog.dart#L33) | class AppShortcutsDialog |
| api | [lib/core/network/api_endpoints.dart:5](../faro-flutter/lib/core/network/api_endpoints.dart#L5) | abstract final class ApiEndpoints |
| network | [lib/core/network/network_service.dart:23](../faro-flutter/lib/core/network/network_service.dart#L23) | class NetworkService |
| bootstrap | [lib/app/bootstrap.dart:53](../faro-flutter/lib/app/bootstrap.dart#L53) | Future<void> bootstrap |
| quick_prompt | [lib/features/ai/quick_prompt/services/quick_ai_prompt_coordinator.dart:451](../faro-flutter/lib/features/ai/quick_prompt/services/quick_ai_prompt_coordinator.dart#L451) | Future<void> showQuickPrompt |
| notifications | [lib/features/notifications/view_models/notifications_view_model.dart:30](../faro-flutter/lib/features/notifications/view_models/notifications_view_model.dart#L30) | class NotificationsViewModel |
| release | [lib/features/release/views/app_startup_gate.dart:13](../faro-flutter/lib/features/release/views/app_startup_gate.dart#L13) | class AppStartupGate |

## نگه‌داری سند

اگر نسخهٔ برنامه عوض شد، ابتدا route، متن ترجمه‌ها و callback سناریوهای متأثر بازبینی شوند. تولید دوبارهٔ فایل‌ها با tools/build_handbook.py صرفاً خروجی سند را به‌روز می‌کند و آزمون UI نیست. پس از هر تغییر کد، شاهدهای فایل و hash در evidence-index.json کنترل و برگهٔ اجرای مربوطه دوباره تکمیل شود. سند فعلی هیچ داده‌ای در سرویس فارو ایجاد نکرده و فایل‌های اصلی برنامه را تغییر نداده است.


# حسابرو وان — راهنمای تولید ویدیو

ممیزی فرانت production در `d68a40f4af3c7f8528e7ef124e9c48baf099d465` انجام شده است. محیط اصلی `src/views` و مسیرهای قابل‌دسترسی router مبنا هستند؛ sandbox و showcase از این مجموعه کنار گذاشته شده‌اند. تعداد سناریوهای پیشنهادی: **28 ویدیو**. مسیرهای اجرایی و نتیجه‌ها باید پیش از ضبط در محیط آموزشی آزموده شوند.

## H01 ورود به حسابرو وان

**توضیح کوتاه:** ورود با شماره، دریافت کد تأیید و ورود به محیط حسابرو وان را نشان می‌دهد.

**مسیر:** `/login`

**پیش‌نیاز:** شمارهٔ آموزشی و کد معتبر از پیش آماده باشد. از کد واقعی یا حساب مشتری استفاده نکنید.

### مراحل ضبط

1. صفحه ورود را باز کنید.
2. شمارهٔ آموزشی را وارد و ارسال کنید.
3. کد یک‌بارمصرف را وارد و تأیید کنید.
4. ورود موفق و مقصدی را که برنامه باز می‌کند نشان دهید.

**نتیجهٔ مورد انتظار:** ورود موفق و انتقال به صفحهٔ بعدیِ تعیین‌شده برای وضعیت حساب.

**شرط ضبط/توقف:** حساب آموزشی با نشست خروج‌شده.

**شاهد:** [router/index.ts:10](../hesabro-one-frontend-vue/src/router/index.ts#L10)؛ [views/LoginView.vue:28](../hesabro-one-frontend-vue/src/views/LoginView.vue#L28)

### نریشن پیشنهادی

ورود با شماره، دریافت کد تأیید و ورود به محیط حسابرو وان را نشان می‌دهد. صفحه ورود را باز کنید. شمارهٔ آموزشی را وارد و ارسال کنید. کد یک‌بارمصرف را وارد و تأیید کنید. ورود موفق و مقصدی را که برنامه باز می‌کند نشان دهید. ورود موفق و انتقال به صفحهٔ بعدیِ تعیین‌شده برای وضعیت حساب.

## H02 تکمیل اطلاعات هویتی

**توضیح کوتاه:** فرم تکمیل نام و نام خانوادگی و ذخیرهٔ اطلاعات حساب را آموزش می‌دهد.

**مسیر:** `/profile/complete`

**پیش‌نیاز:** حساب آموزشی وارد شده باشد و اطلاعات هویتی آن ناقص باشد.

### مراحل ضبط

1. صفحهٔ تکمیل اطلاعات را باز کنید.
2. نام و نام خانوادگی آموزشی را وارد کنید.
3. ذخیره را بزنید و مقصد بعدی را نشان دهید.

**نتیجهٔ مورد انتظار:** پیام ذخیره و هدایت بعدی مطابق وضعیت حساب نمایش داده شود.

**شرط ضبط/توقف:** از نام واقعی افراد استفاده نشود.

**شاهد:** [router/index.ts:26](../hesabro-one-frontend-vue/src/router/index.ts#L26)؛ [views/ProfileCompleteView.vue:18](../hesabro-one-frontend-vue/src/views/ProfileCompleteView.vue#L18)

### نریشن پیشنهادی

فرم تکمیل نام و نام خانوادگی و ذخیرهٔ اطلاعات حساب را آموزش می‌دهد. صفحهٔ تکمیل اطلاعات را باز کنید. نام و نام خانوادگی آموزشی را وارد کنید. ذخیره را بزنید و مقصد بعدی را نشان دهید. پیام ذخیره و هدایت بعدی مطابق وضعیت حساب نمایش داده شود.

## H03 ساخت دفتر حساب در شروع کار

**توضیح کوتاه:** فرایند انتخاب نوع و ثبت دفتر حساب در مراحل آغازین را نشان می‌دهد.

**مسیر:** `/onboarding`

**پیش‌نیاز:** حساب بدون دفتر فعال و دادهٔ آزمایشی کسب‌وکار آماده باشد.

### مراحل ضبط

1. مراحل راه‌اندازی را به ترتیب کامل کنید.
2. نوع/اطلاعات درخواست‌شده را وارد کنید.
3. ثبت نهایی را انجام دهید و دفتر فعال را نشان دهید.

**نتیجهٔ مورد انتظار:** دفتر ساخته‌شده و مرحلهٔ بعدی onboarding طبق پاسخ سرویس دیده شود.

**شرط ضبط/توقف:** ساخت دفتر روی حساب آموزشی جداگانه انجام شود.

**شاهد:** [router/index.ts:20](../hesabro-one-frontend-vue/src/router/index.ts#L20)؛ [views/OnboardingView.vue:20](../hesabro-one-frontend-vue/src/views/OnboardingView.vue#L20)

### نریشن پیشنهادی

فرایند انتخاب نوع و ثبت دفتر حساب در مراحل آغازین را نشان می‌دهد. مراحل راه‌اندازی را به ترتیب کامل کنید. نوع/اطلاعات درخواست‌شده را وارد کنید. ثبت نهایی را انجام دهید و دفتر فعال را نشان دهید. دفتر ساخته‌شده و مرحلهٔ بعدی onboarding طبق پاسخ سرویس دیده شود.

## H04 انتخاب دفتر حساب و سال مالی فعال

**توضیح کوتاه:** نحوهٔ تغییر دفتر حساب یا سال مالی فعال از انتخابگر بالای برنامه را آموزش می‌دهد.

**مسیر:** `جداکنندهٔ دفتر/سال در سربرگ؛ سپس /`

**پیش‌نیاز:** حداقل دو دفتر یا سال مالی آموزشی در دسترس باشد.

### مراحل ضبط

1. انتخابگر سربرگ را باز کنید.
2. دفتر حساب مقصد را انتخاب کنید.
3. در صورت نیاز فهرست سال مالی را باز و سال آموزشی را انتخاب کنید.
4. نام دفتر و سال فعال را در سربرگ کنترل کنید.

**نتیجهٔ مورد انتظار:** برنامه به زمینهٔ انتخاب‌شده منتقل و نام فعال در سربرگ به‌روز شود.

**شرط ضبط/توقف:** هشدار دهید هر ثبت بعدی در دفتر و سال انتخاب‌شده انجام می‌شود.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [components/layout/BusinessSelectorDropdown.vue:73](../hesabro-one-frontend-vue/src/components/layout/BusinessSelectorDropdown.vue#L73)

### نریشن پیشنهادی

نحوهٔ تغییر دفتر حساب یا سال مالی فعال از انتخابگر بالای برنامه را آموزش می‌دهد. انتخابگر سربرگ را باز کنید. دفتر حساب مقصد را انتخاب کنید. در صورت نیاز فهرست سال مالی را باز و سال آموزشی را انتخاب کنید. نام دفتر و سال فعال را در سربرگ کنترل کنید. برنامه به زمینهٔ انتخاب‌شده منتقل و نام فعال در سربرگ به‌روز شود.

## H05 مرور داشبورد مالی

**توضیح کوتاه:** نمای کلی داشبورد و خلاصهٔ مالی قابل مشاهده در خانهٔ برنامه را معرفی می‌کند.

**مسیر:** `/`

**پیش‌نیاز:** دفتر و سال مالی آزمایشی فعال و دادهٔ نمایشی موجود باشد.

### مراحل ضبط

1. از منوی کناری داشبورد را باز کنید.
2. کارت‌های خلاصه و بخش‌های قابل مشاهده را مرور کنید.
3. در صورت وجود، وضعیت بارگذاری یا خالی را نشان دهید.

**نتیجهٔ مورد انتظار:** خلاصهٔ مالی مربوط به دفتر فعال دیده شود.

**شرط ضبط/توقف:** اعداد نمونه یا ناشناس باشند؛ خروجی هر کارت پیش از ضبط اجرا بررسی شود.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/HomeView.vue:7](../hesabro-one-frontend-vue/src/views/HomeView.vue#L7)

### نریشن پیشنهادی

نمای کلی داشبورد و خلاصهٔ مالی قابل مشاهده در خانهٔ برنامه را معرفی می‌کند. از منوی کناری داشبورد را باز کنید. کارت‌های خلاصه و بخش‌های قابل مشاهده را مرور کنید. در صورت وجود، وضعیت بارگذاری یا خالی را نشان دهید. خلاصهٔ مالی مربوط به دفتر فعال دیده شود.

## H06 ثبت و بازبینی سند حسابداری

**توضیح کوتاه:** ساخت سند، مشاهدهٔ جزئیات و جست‌وجوی اسناد را در یک مسیر پایه توضیح می‌دهد.

**مسیر:** `/documents`

**پیش‌نیاز:** دفتر آموزشی، طرف‌حساب و دادهٔ سند متوازن و مجاز برای ثبت آماده باشد.

### مراحل ضبط

1. اسناد حسابداری را باز کنید و «ایجاد سند» را بزنید.
2. فیلدهای فرم را با دادهٔ آموزشی تکمیل و ذخیره کنید.
3. سند ثبت‌شده را از فهرست باز کنید.
4. با جست‌وجو یا فیلتر شرح، همان سند را پیدا کنید.

**نتیجهٔ مورد انتظار:** سند در فهرست دیده شود و جزئیات همان شناسه باز شود.

**شرط ضبط/توقف:** ثبت سند، اثر مالی دارد؛ فقط روی محیط آموزشی انجام شود.

**شاهد:** [router/index.ts:38](../hesabro-one-frontend-vue/src/router/index.ts#L38)؛ [views/DocumentsView.vue:9](../hesabro-one-frontend-vue/src/views/DocumentsView.vue#L9)

### نریشن پیشنهادی

ساخت سند، مشاهدهٔ جزئیات و جست‌وجوی اسناد را در یک مسیر پایه توضیح می‌دهد. اسناد حسابداری را باز کنید و «ایجاد سند» را بزنید. فیلدهای فرم را با دادهٔ آموزشی تکمیل و ذخیره کنید. سند ثبت‌شده را از فهرست باز کنید. با جست‌وجو یا فیلتر شرح، همان سند را پیدا کنید. سند در فهرست دیده شود و جزئیات همان شناسه باز شود.

## H07 مدیریت حساب‌ها و اشخاص

**توضیح کوتاه:** جست‌وجو و ایجاد یا ویرایش حساب و بررسی کد حساب را نشان می‌دهد.

**مسیر:** `/accounts`

**پیش‌نیاز:** رکورد آموزشی قابل ویرایش و سطح دسترسی حسابداری فراهم باشد.

### مراحل ضبط

1. مدیریت حساب‌ها را باز کنید.
2. با عنوان یا کد جست‌وجو و فیلترهای پیشرفته را مرور کنید.
3. فرم ساخت یا ویرایش را باز و دادهٔ آموزشی را ذخیره کنید.
4. نتیجه را در فهرست و کد حساب کنترل کنید.

**نتیجهٔ مورد انتظار:** رکورد در فهرست با دادهٔ به‌روز دیده شود.

**شرط ضبط/توقف:** حذف حساب در ویدیو انجام نشود؛ کدها و نام‌ها ساختگی باشند.

**شاهد:** [router/index.ts:44](../hesabro-one-frontend-vue/src/router/index.ts#L44)؛ [views/AccountsView.vue:10](../hesabro-one-frontend-vue/src/views/AccountsView.vue#L10)

### نریشن پیشنهادی

جست‌وجو و ایجاد یا ویرایش حساب و بررسی کد حساب را نشان می‌دهد. مدیریت حساب‌ها را باز کنید. با عنوان یا کد جست‌وجو و فیلترهای پیشرفته را مرور کنید. فرم ساخت یا ویرایش را باز و دادهٔ آموزشی را ذخیره کنید. نتیجه را در فهرست و کد حساب کنترل کنید. رکورد در فهرست با دادهٔ به‌روز دیده شود.

## H08 مشاهدهٔ دفتر کل یک حساب

**توضیح کوتاه:** مسیر مشاهدهٔ گردش ریز حساب را از حساب یا مسیر مستقیم دفتر کل نشان می‌دهد.

**مسیر:** `/ledger`

**پیش‌نیاز:** حساب دارای چند سند آموزشی و شناسهٔ امن در دسترس باشد.

### مراحل ضبط

1. دفتر کل را باز کنید یا از حساب آموزشی به دفتر کل بروید.
2. بازهٔ زمانی و فیلترهای موجود را بررسی کنید.
3. یک ردیف را انتخاب و مانده/جزئیات قابل نمایش را نشان دهید.

**نتیجهٔ مورد انتظار:** ردیف‌های دفتر کل و مانده با حساب منتخب تطبیق داشته باشد.

**شرط ضبط/توقف:** نمایش دفتر کل در این build در router ثبت است؛ دسترسی مستقیم و دادهٔ نتیجه پیش از انتشار باید آزموده شود.

**شاهد:** [router/index.ts:62](../hesabro-one-frontend-vue/src/router/index.ts#L62)؛ [views/AccountLedgerView.vue:5](../hesabro-one-frontend-vue/src/views/AccountLedgerView.vue#L5)

### نریشن پیشنهادی

مسیر مشاهدهٔ گردش ریز حساب را از حساب یا مسیر مستقیم دفتر کل نشان می‌دهد. دفتر کل را باز کنید یا از حساب آموزشی به دفتر کل بروید. بازهٔ زمانی و فیلترهای موجود را بررسی کنید. یک ردیف را انتخاب و مانده/جزئیات قابل نمایش را نشان دهید. ردیف‌های دفتر کل و مانده با حساب منتخب تطبیق داشته باشد.

## H09 گزارش گردش حساب و چاپ

**توضیح کوتاه:** فیلتر تاریخ و حساب و بازکردن چاپ گزارش گردش را آموزش می‌دهد.

**مسیر:** `/turnover`

**پیش‌نیاز:** حساب و تراکنش آزمایشی با تاریخ مشخص در دفتر آموزشی وجود داشته باشد.

### مراحل ضبط

1. گزارش گردش حساب را باز کنید.
2. حساب و بازهٔ زمانی را انتخاب و فیلتر کنید.
3. نتیجه را بررسی کنید و دکمهٔ چاپ را باز کنید.
4. پیش‌نمایش چاپ را بدون چاپ فیزیکی نشان دهید.

**نتیجهٔ مورد انتظار:** گزارش متناسب با فیلتر و پیش‌نمایش چاپ نمایش داده شود.

**شرط ضبط/توقف:** چاپ سیستم وابسته به مرورگر/سیستم‌عامل است؛ ابتدا در محیط ضبط کنترل شود.

**شاهد:** [router/index.ts:50](../hesabro-one-frontend-vue/src/router/index.ts#L50)؛ [views/TurnoverView.vue:8](../hesabro-one-frontend-vue/src/views/TurnoverView.vue#L8)

### نریشن پیشنهادی

فیلتر تاریخ و حساب و بازکردن چاپ گزارش گردش را آموزش می‌دهد. گزارش گردش حساب را باز کنید. حساب و بازهٔ زمانی را انتخاب و فیلتر کنید. نتیجه را بررسی کنید و دکمهٔ چاپ را باز کنید. پیش‌نمایش چاپ را بدون چاپ فیزیکی نشان دهید. گزارش متناسب با فیلتر و پیش‌نمایش چاپ نمایش داده شود.

## H10 ثبت دریافت یا پرداخت نقدی

**توضیح کوتاه:** ایجاد و بازبینی یک تراکنش خزانه را با فیلتر جست‌وجو نشان می‌دهد.

**مسیر:** `/treasury`

**پیش‌نیاز:** حساب بانکی/صندوق و دستهٔ سند آموزشی معتبر باشد.

### مراحل ضبط

1. دریافت و پرداخت را باز کنید.
2. فرم تراکنش را باز و دریافت یا پرداخت را انتخاب کنید.
3. مبلغ و شرح آموزشی را وارد و ثبت کنید.
4. تراکنش را در فهرست جست‌وجو و مشاهده کنید.

**نتیجهٔ مورد انتظار:** تراکنش ثبت‌شده در فهرست مربوط دیده شود.

**شرط ضبط/توقف:** تراکنش اثر مالی دارد؛ از دفتر و حساب آزمایشی استفاده شود.

**شاهد:** [router/index.ts:56](../hesabro-one-frontend-vue/src/router/index.ts#L56)؛ [views/TreasuryView.vue:8](../hesabro-one-frontend-vue/src/views/TreasuryView.vue#L8)

### نریشن پیشنهادی

ایجاد و بازبینی یک تراکنش خزانه را با فیلتر جست‌وجو نشان می‌دهد. دریافت و پرداخت را باز کنید. فرم تراکنش را باز و دریافت یا پرداخت را انتخاب کنید. مبلغ و شرح آموزشی را وارد و ثبت کنید. تراکنش را در فهرست جست‌وجو و مشاهده کنید. تراکنش ثبت‌شده در فهرست مربوط دیده شود.

## H11 مرور چک‌های دریافتنی

**توضیح کوتاه:** فهرست چک‌های دریافتی و فیلتر وضعیت و سررسید را توضیح می‌دهد.

**مسیر:** `/cheques/receivable`

**پیش‌نیاز:** چک‌های آموزشی در چند وضعیت و با سررسیدهای مختلف وجود داشته باشند.

### مراحل ضبط

1. چک‌های دریافتنی را باز کنید.
2. فیلتر وضعیت چک را باز و یک وضعیت را انتخاب کنید.
3. فیلتر موعد سررسید را تنظیم کنید.
4. فهرست و نتیجهٔ پاک‌کردن فیلتر را نشان دهید.

**نتیجهٔ مورد انتظار:** فهرست با معیارهای انتخاب‌شده محدود شود.

**شرط ضبط/توقف:** تغییر وضعیت چک ممکن است اثر عملیاتی داشته باشد؛ این ویدیو فقط فهرست و فیلتر را نمایش دهد.

**شاهد:** [router/index.ts:186](../hesabro-one-frontend-vue/src/router/index.ts#L186)؛ [views/cheques/ReceivedChequesView.vue:23](../hesabro-one-frontend-vue/src/views/cheques/ReceivedChequesView.vue#L23)

### نریشن پیشنهادی

فهرست چک‌های دریافتی و فیلتر وضعیت و سررسید را توضیح می‌دهد. چک‌های دریافتنی را باز کنید. فیلتر وضعیت چک را باز و یک وضعیت را انتخاب کنید. فیلتر موعد سررسید را تنظیم کنید. فهرست و نتیجهٔ پاک‌کردن فیلتر را نشان دهید. فهرست با معیارهای انتخاب‌شده محدود شود.

## H12 ثبت و پیگیری چک پرداختنی

**توضیح کوتاه:** فرم ثبت چک پرداختنی و فهرست سررسید و وضعیت آن را آموزش می‌دهد.

**مسیر:** `/cheques/payable`

**پیش‌نیاز:** چک و حساب طرف آموزشی و دسترسی ثبت آماده باشد.

### مراحل ضبط

1. چک‌های پرداختنی را باز کنید.
2. فرم ثبت را باز و اطلاعات چک آزمایشی را وارد کنید.
3. ذخیره کنید و چک را با فیلتر وضعیت یا سررسید پیدا کنید.

**نتیجهٔ مورد انتظار:** چک آموزشی ثبت و در فهرست قابل جست‌وجو شود.

**شرط ضبط/توقف:** از صدور یا تسویهٔ چک واقعی خودداری شود؛ مرحلهٔ ثبت را فقط روی دادهٔ آزمایشی ضبط کنید.

**شاهد:** [router/index.ts:192](../hesabro-one-frontend-vue/src/router/index.ts#L192)؛ [views/cheques/PayableChequesView.vue:23](../hesabro-one-frontend-vue/src/views/cheques/PayableChequesView.vue#L23)

### نریشن پیشنهادی

فرم ثبت چک پرداختنی و فهرست سررسید و وضعیت آن را آموزش می‌دهد. چک‌های پرداختنی را باز کنید. فرم ثبت را باز و اطلاعات چک آزمایشی را وارد کنید. ذخیره کنید و چک را با فیلتر وضعیت یا سررسید پیدا کنید. چک آموزشی ثبت و در فهرست قابل جست‌وجو شود.

## H13 ساخت فاکتور فروش

**توضیح کوتاه:** ایجاد فاکتور فروش و بررسی اقلام و خلاصهٔ مبلغ را شرح می‌دهد.

**مسیر:** `/invoices/sales`

**پیش‌نیاز:** مشتری، کالا و انبار آموزشی آماده باشد؛ محیط آزمایشی فعال باشد.

### مراحل ضبط

1. فاکتورهای فروش را باز کنید و ساخت فاکتور را بزنید.
2. مشتری، کالا، تعداد و اطلاعات لازم فرم را وارد کنید.
3. مبلغ‌های محاسبه‌شده را بازبینی و ثبت کنید.
4. فاکتور را از فهرست باز کنید.

**نتیجهٔ مورد انتظار:** فاکتور فروش با اقلام و خلاصهٔ مالی نمایش داده شود.

**شرط ضبط/توقف:** ثبت فاکتور ممکن است موجودی/مانده را تغییر دهد؛ از دادهٔ آموزشی استفاده شود.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/invoices/BaseInvoicesView.vue:147](../hesabro-one-frontend-vue/src/views/invoices/BaseInvoicesView.vue#L147)

### نریشن پیشنهادی

ایجاد فاکتور فروش و بررسی اقلام و خلاصهٔ مبلغ را شرح می‌دهد. فاکتورهای فروش را باز کنید و ساخت فاکتور را بزنید. مشتری، کالا، تعداد و اطلاعات لازم فرم را وارد کنید. مبلغ‌های محاسبه‌شده را بازبینی و ثبت کنید. فاکتور را از فهرست باز کنید. فاکتور فروش با اقلام و خلاصهٔ مالی نمایش داده شود.

## H14 ساخت فاکتور خرید

**توضیح کوتاه:** ثبت فاکتور خرید، انتخاب کالا و بازبینی جزئیات ثبت را آموزش می‌دهد.

**مسیر:** `/invoices/purchases`

**پیش‌نیاز:** فروشنده، کالا و انبار آموزشی فعال باشد.

### مراحل ضبط

1. فاکتورهای خرید را باز کنید.
2. فرم ثبت را باز و فروشنده و اقلام آزمایشی را وارد کنید.
3. خلاصهٔ فاکتور را بازبینی و ثبت کنید.
4. جزئیات فاکتور را از فهرست باز کنید.

**نتیجهٔ مورد انتظار:** فاکتور خرید در فهرست و صفحهٔ جزئیات دیده شود.

**شرط ضبط/توقف:** ثبت خرید روی انبار و مانده اثر دارد؛ محیط آموزشی الزامی است.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/invoices/BaseInvoicesView.vue:147](../hesabro-one-frontend-vue/src/views/invoices/BaseInvoicesView.vue#L147)

### نریشن پیشنهادی

ثبت فاکتور خرید، انتخاب کالا و بازبینی جزئیات ثبت را آموزش می‌دهد. فاکتورهای خرید را باز کنید. فرم ثبت را باز و فروشنده و اقلام آزمایشی را وارد کنید. خلاصهٔ فاکتور را بازبینی و ثبت کنید. جزئیات فاکتور را از فهرست باز کنید. فاکتور خرید در فهرست و صفحهٔ جزئیات دیده شود.

## H15 ثبت مرجوعی از فروش

**توضیح کوتاه:** ساخت و بازبینی فاکتور مرجوعی فروش را با دادهٔ تمرینی توضیح می‌دهد.

**مسیر:** `/invoices/sales-return`

**پیش‌نیاز:** فاکتور فروش مبدأ و کالاهای آموزشی برای مرجوعی آماده باشند.

### مراحل ضبط

1. مرجوعی از فروش را باز کنید.
2. فرم مرجوعی را شروع و اطلاعات مبدأ/اقلام را وارد کنید.
3. خلاصه و تعداد مرجوعی را بازبینی و ثبت کنید.
4. جزئیات رکورد را بازبینی کنید.

**نتیجهٔ مورد انتظار:** رکورد مرجوعی در فهرست و جزئیات همان نوع دیده شود.

**شرط ضبط/توقف:** اثر مالی و موجودی دارد؛ فقط در محیط آموزشی و با مرجع قابل بازگردانی اجرا شود.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/invoices/BaseInvoicesView.vue:147](../hesabro-one-frontend-vue/src/views/invoices/BaseInvoicesView.vue#L147)

### نریشن پیشنهادی

ساخت و بازبینی فاکتور مرجوعی فروش را با دادهٔ تمرینی توضیح می‌دهد. مرجوعی از فروش را باز کنید. فرم مرجوعی را شروع و اطلاعات مبدأ/اقلام را وارد کنید. خلاصه و تعداد مرجوعی را بازبینی و ثبت کنید. جزئیات رکورد را بازبینی کنید. رکورد مرجوعی در فهرست و جزئیات همان نوع دیده شود.

## H16 ثبت مرجوعی از خرید

**توضیح کوتاه:** ایجاد مرجوعی خرید و یافتن رکورد ثبت‌شده را مرحله‌به‌مرحله نشان می‌دهد.

**مسیر:** `/invoices/purchases-return`

**پیش‌نیاز:** فاکتور خرید مبدأ و کالای آموزشی قابل برگشت موجود باشد.

### مراحل ضبط

1. مرجوعی از خرید را باز کنید.
2. فرم را با مرجع و اقلام آموزشی تکمیل کنید.
3. خلاصه را کنترل و ثبت کنید.
4. مرجوعی ثبت‌شده را باز کنید.

**نتیجهٔ مورد انتظار:** رکورد مرجوعی خرید با نوع و وضعیت درست نمایش داده شود.

**شرط ضبط/توقف:** اجرای ثبت تنها در دفتر تمرینی مجاز است.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/invoices/BaseInvoicesView.vue:147](../hesabro-one-frontend-vue/src/views/invoices/BaseInvoicesView.vue#L147)

### نریشن پیشنهادی

ایجاد مرجوعی خرید و یافتن رکورد ثبت‌شده را مرحله‌به‌مرحله نشان می‌دهد. مرجوعی از خرید را باز کنید. فرم را با مرجع و اقلام آموزشی تکمیل کنید. خلاصه را کنترل و ثبت کنید. مرجوعی ثبت‌شده را باز کنید. رکورد مرجوعی خرید با نوع و وضعیت درست نمایش داده شود.

## H17 بازبینی، ویرایش و حذف فاکتور

**توضیح کوتاه:** فهرست فاکتورها، جزئیات، ویرایش و تأیید حذف را در محیط آموزشی مرور می‌کند.

**مسیر:** `جزئیات /invoices/{type}/:id`

**پیش‌نیاز:** فاکتور کاملاً آزمایشی و قابل حذف، با شناسهٔ غیرحساس در دسترس باشد.

### مراحل ضبط

1. فاکتور را از فهرست باز کنید.
2. تاریخ، طرف‌حساب، مانده و وضعیت را در جزئیات مرور کنید.
3. ویرایش را باز کنید و یک فیلد بی‌اثر آموزشی را تغییر دهید.
4. پنجرهٔ حذف را نشان دهید و فقط در صورت اجازهٔ آزمون، حذف آزمایشی را تأیید کنید.

**نتیجهٔ مورد انتظار:** جزئیات/ویرایش به همان فاکتور مربوط باشند؛ حذف فقط با تأیید UI انجام شود.

**شرط ضبط/توقف:** حذف فاکتور برگشت‌ناپذیر یا محدود به وضعیت است؛ ضبط حذف پیش‌فرض ندارد.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/invoices/InvoiceDetailsView.vue:41](../hesabro-one-frontend-vue/src/views/invoices/InvoiceDetailsView.vue#L41)

### نریشن پیشنهادی

فهرست فاکتورها، جزئیات، ویرایش و تأیید حذف را در محیط آموزشی مرور می‌کند. فاکتور را از فهرست باز کنید. تاریخ، طرف‌حساب، مانده و وضعیت را در جزئیات مرور کنید. ویرایش را باز کنید و یک فیلد بی‌اثر آموزشی را تغییر دهید. پنجرهٔ حذف را نشان دهید و فقط در صورت اجازهٔ آزمون، حذف آزمایشی را تأیید کنید. جزئیات/ویرایش به همان فاکتور مربوط باشند؛ حذف فقط با تأیید UI انجام شود.

## H18 گزارش اقلام خرید و فروش

**توضیح کوتاه:** جست‌وجو و فیلتر گزارش اقلام بر اساس نوع و شماره فاکتور را معرفی می‌کند.

**مسیر:** `/invoices/report`

**پیش‌نیاز:** دادهٔ خرید و فروش آموزشی در محدودهٔ تاریخ مشخص موجود باشد.

### مراحل ضبط

1. گزارش خرید و فروش را باز کنید.
2. نوع گزارش را از گزینه‌های موجود انتخاب کنید.
3. کالا یا شمارهٔ فاکتور را جست‌وجو کنید و فیلترهای پیشرفته را ببینید.
4. یک ردیف را باز و فاکتور مبدأ را نشان دهید.

**نتیجهٔ مورد انتظار:** نتیجهٔ گزارش با نوع و عبارت جست‌وجو هماهنگ باشد.

**شرط ضبط/توقف:** فقط گزارش و ناوبری را نمایش دهید؛ رکوردی را از این نما تغییر ندهید.

**شاهد:** [router/index.ts:32](../hesabro-one-frontend-vue/src/router/index.ts#L32)؛ [views/invoices/InvoiceItemsReportView.vue:14](../hesabro-one-frontend-vue/src/views/invoices/InvoiceItemsReportView.vue#L14)

### نریشن پیشنهادی

جست‌وجو و فیلتر گزارش اقلام بر اساس نوع و شماره فاکتور را معرفی می‌کند. گزارش خرید و فروش را باز کنید. نوع گزارش را از گزینه‌های موجود انتخاب کنید. کالا یا شمارهٔ فاکتور را جست‌وجو کنید و فیلترهای پیشرفته را ببینید. یک ردیف را باز و فاکتور مبدأ را نشان دهید. نتیجهٔ گزارش با نوع و عبارت جست‌وجو هماهنگ باشد.

## H19 مدیریت دسته‌بندی کالاها

**توضیح کوتاه:** ساخت، ویرایش، جست‌وجو و حذف کنترل‌شدهٔ دسته‌بندی را معرفی می‌کند.

**مسیر:** `/categories`

**پیش‌نیاز:** دسته‌بندی‌های آموزشی بدون کالاهای واقعی در دسترس باشد.

### مراحل ضبط

1. دسته‌بندی کالاها را باز کنید.
2. یک دسته‌بندی آموزشی ایجاد کنید یا مورد آماده را ویرایش کنید.
3. نتیجه را در فهرست جست‌وجو کنید.
4. فقط اگر حذف مجاز و داده قابل پاکسازی است، تأیید حذف را نشان دهید.

**نتیجهٔ مورد انتظار:** دستهٔ ذخیره‌شده در فهرست پیدا شود.

**شرط ضبط/توقف:** حذف دسته‌بندی دارای وابستگی ممکن است رد شود؛ مسیر حذف را تنها با دادهٔ مستقل آزمون کنید.

**شاهد:** [router/index.ts:116](../hesabro-one-frontend-vue/src/router/index.ts#L116)؛ [views/CategoriesView.vue:10](../hesabro-one-frontend-vue/src/views/CategoriesView.vue#L10)

### نریشن پیشنهادی

ساخت، ویرایش، جست‌وجو و حذف کنترل‌شدهٔ دسته‌بندی را معرفی می‌کند. دسته‌بندی کالاها را باز کنید. یک دسته‌بندی آموزشی ایجاد کنید یا مورد آماده را ویرایش کنید. نتیجه را در فهرست جست‌وجو کنید. فقط اگر حذف مجاز و داده قابل پاکسازی است، تأیید حذف را نشان دهید. دستهٔ ذخیره‌شده در فهرست پیدا شود.

## H20 تعریف و ویرایش کالا

**توضیح کوتاه:** فیلدهای اصلی کالا و ذخیرهٔ آن را در فهرست کالاها توضیح می‌دهد.

**مسیر:** `/products`

**پیش‌نیاز:** دسته‌بندی و واحد کالا در دفتر آزمایشی ایجاد شده باشد.

### مراحل ضبط

1. کالاها را باز کنید.
2. فرم ساخت را باز و اطلاعات کالای آموزشی را وارد کنید.
3. ذخیره کنید و با فهرست جست‌وجو همان کالا را بیابید.
4. ویرایش را باز کنید و نتیجهٔ به‌روزرسانی را کنترل کنید.

**نتیجهٔ مورد انتظار:** کالا در فهرست با مقدار ذخیره‌شده دیده شود.

**شرط ضبط/توقف:** از شناسه، قیمت و کالای تجاری واقعی استفاده نشود.

**شاهد:** [router/index.ts:122](../hesabro-one-frontend-vue/src/router/index.ts#L122)؛ [views/ProductsView.vue:10](../hesabro-one-frontend-vue/src/views/ProductsView.vue#L10)

### نریشن پیشنهادی

فیلدهای اصلی کالا و ذخیرهٔ آن را در فهرست کالاها توضیح می‌دهد. کالاها را باز کنید. فرم ساخت را باز و اطلاعات کالای آموزشی را وارد کنید. ذخیره کنید و با فهرست جست‌وجو همان کالا را بیابید. ویرایش را باز کنید و نتیجهٔ به‌روزرسانی را کنترل کنید. کالا در فهرست با مقدار ذخیره‌شده دیده شود.

## H21 مدیریت انبارها

**توضیح کوتاه:** ایجاد یا ویرایش انبار و بررسی فهرست انبارها را نشان می‌دهد.

**مسیر:** `/warehouses`

**پیش‌نیاز:** دفتر آزمایشی و مجوز انبارداری فعال باشد.

### مراحل ضبط

1. انبارها را باز کنید.
2. فرم ایجاد یا ویرایش را باز کنید.
3. یک انبار نمونه را ثبت کنید.
4. فهرست را بررسی و در صورت نیاز جست‌وجو کنید.

**نتیجهٔ مورد انتظار:** انبار با نام آزمایشی در فهرست دیده شود.

**شرط ضبط/توقف:** از انبار عملیاتی واقعی استفاده نکنید.

**شاهد:** [router/index.ts:104](../hesabro-one-frontend-vue/src/router/index.ts#L104)؛ [views/WarehousesView.vue:10](../hesabro-one-frontend-vue/src/views/WarehousesView.vue#L10)

### نریشن پیشنهادی

ایجاد یا ویرایش انبار و بررسی فهرست انبارها را نشان می‌دهد. انبارها را باز کنید. فرم ایجاد یا ویرایش را باز کنید. یک انبار نمونه را ثبت کنید. فهرست را بررسی و در صورت نیاز جست‌وجو کنید. انبار با نام آزمایشی در فهرست دیده شود.

## H22 ثبت حوالهٔ انبار

**توضیح کوتاه:** ثبت حواله و مشاهدهٔ وضعیت و امکان ویرایش بر اساس وضعیت را شرح می‌دهد.

**مسیر:** `/inventory/operations`

**پیش‌نیاز:** انبار و کالا با موجودی آموزشی و مجوز موجودی آماده باشد.

### مراحل ضبط

1. حواله‌های انبار را باز کنید.
2. فرم حواله را با نوع عملیات، انبار و کالای آزمایشی پر کنید.
3. حواله را ذخیره و در فهرست پیدا کنید.
4. وضعیت را بررسی کنید؛ اگر قفل است فقط پیام غیرقابل ویرایش را نشان دهید.

**نتیجهٔ مورد انتظار:** حوالهٔ جدید در فهرست نمایش داده شود و محدودیت وضعیت روشن باشد.

**شرط ضبط/توقف:** حواله روی موجودی اثر می‌گذارد؛ هیچ عملیات را روی موجودی واقعی اجرا نکنید.

**شاهد:** [router/index.ts:98](../hesabro-one-frontend-vue/src/router/index.ts#L98)؛ [views/InventoryOperationsView.vue:10](../hesabro-one-frontend-vue/src/views/InventoryOperationsView.vue#L10)

### نریشن پیشنهادی

ثبت حواله و مشاهدهٔ وضعیت و امکان ویرایش بر اساس وضعیت را شرح می‌دهد. حواله‌های انبار را باز کنید. فرم حواله را با نوع عملیات، انبار و کالای آزمایشی پر کنید. حواله را ذخیره و در فهرست پیدا کنید. وضعیت را بررسی کنید؛ اگر قفل است فقط پیام غیرقابل ویرایش را نشان دهید. حوالهٔ جدید در فهرست نمایش داده شود و محدودیت وضعیت روشن باشد.

## H23 افزودن کاربر و تنظیم دسترسی

**توضیح کوتاه:** دعوت/افزودن کاربر، فیلتر دسترسی و ویرایش نقش عضو را آموزش می‌دهد.

**مسیر:** `/users`

**پیش‌نیاز:** حساب عضو آزمایشی و نقش مالک/مدیر مجاز در دفتر تمرینی موجود باشد.

### مراحل ضبط

1. لیست کاربران را باز کنید.
2. فیلتر دسترسی را مرور کنید.
3. افزودن کاربر را باز و شناسهٔ آموزشی را ثبت کنید.
4. نقش عضو غیرمالک را ویرایش و نتیجه را کنترل کنید.

**نتیجهٔ مورد انتظار:** عضو آموزشی با سطح دسترسی انتخاب‌شده دیده شود.

**شرط ضبط/توقف:** مالک دفتر قابل ویرایش نیست؛ دعوت به نشانی واقعی ارسال نشود.

**شاهد:** [router/index.ts:110](../hesabro-one-frontend-vue/src/router/index.ts#L110)؛ [views/UsersView.vue:15](../hesabro-one-frontend-vue/src/views/UsersView.vue#L15)

### نریشن پیشنهادی

دعوت/افزودن کاربر، فیلتر دسترسی و ویرایش نقش عضو را آموزش می‌دهد. لیست کاربران را باز کنید. فیلتر دسترسی را مرور کنید. افزودن کاربر را باز و شناسهٔ آموزشی را ثبت کنید. نقش عضو غیرمالک را ویرایش و نتیجه را کنترل کنید. عضو آموزشی با سطح دسترسی انتخاب‌شده دیده شود.

## H24 ساخت و مدیریت سال مالی

**توضیح کوتاه:** ساخت، بستن یا بازگشایی سال مالی و انتقال به اسناد را توضیح می‌دهد.

**مسیر:** `/settings/fiscal-years`

**پیش‌نیاز:** دفتر آموزشی با سال مالی قابل ایجاد یا نمونهٔ قابل بستن باشد.

### مراحل ضبط

1. مدیریت سال‌های مالی را باز کنید.
2. فرم ساخت سال را باز و بازهٔ آزمایشی وارد کنید.
3. سال را ثبت و فهرست را بررسی کنید.
4. در صورت نیاز، کنترل بستن/بازگشایی را فقط روی رکورد آموزشی نشان دهید.

**نتیجهٔ مورد انتظار:** سال مالی در فهرست دیده شود؛ پیام و مسیر بعد از عملیات کنترل شود.

**شرط ضبط/توقف:** بستن سال ممکن است ثبت‌ها را محدود کند؛ از سال واقعی استفاده نشود.

**شاهد:** [router/index.ts:86](../hesabro-one-frontend-vue/src/router/index.ts#L86)؛ [views/settings/FiscalYearsView.vue:8](../hesabro-one-frontend-vue/src/views/settings/FiscalYearsView.vue#L8)

### نریشن پیشنهادی

ساخت، بستن یا بازگشایی سال مالی و انتقال به اسناد را توضیح می‌دهد. مدیریت سال‌های مالی را باز کنید. فرم ساخت سال را باز و بازهٔ آزمایشی وارد کنید. سال را ثبت و فهرست را بررسی کنید. در صورت نیاز، کنترل بستن/بازگشایی را فقط روی رکورد آموزشی نشان دهید. سال مالی در فهرست دیده شود؛ پیام و مسیر بعد از عملیات کنترل شود.

## H25 تنظیمات دفتر حساب

**توضیح کوتاه:** ویرایش اطلاعات و دسته‌بندی دفتر فعال را با کنترل نام فعلی نشان می‌دهد.

**مسیر:** `/settings/businesses`

**پیش‌نیاز:** نقش مالک در دفتر تمرینی فعال باشد.

### مراحل ضبط

1. تنظیمات دفتر حساب را باز کنید.
2. نام دفتر و سال فعال را کنترل کنید.
3. یک توضیح/نام آزمایشی را تغییر دهید و ذخیره کنید.
4. مقدار ذخیره‌شده و پیام را بررسی کنید.

**نتیجهٔ مورد انتظار:** نام یا مشخصهٔ دفتر پس از ذخیره به‌روز شود.

**شرط ضبط/توقف:** دسترسی این صفحه مالک‌محور است؛ اطلاعات دفتر واقعی در تصویر نباشد.

**شاهد:** [router/index.ts:68](../hesabro-one-frontend-vue/src/router/index.ts#L68)؛ [views/settings/BusinessesView.vue:8](../hesabro-one-frontend-vue/src/views/settings/BusinessesView.vue#L8)

### نریشن پیشنهادی

ویرایش اطلاعات و دسته‌بندی دفتر فعال را با کنترل نام فعلی نشان می‌دهد. تنظیمات دفتر حساب را باز کنید. نام دفتر و سال فعال را کنترل کنید. یک توضیح/نام آزمایشی را تغییر دهید و ذخیره کنید. مقدار ذخیره‌شده و پیام را بررسی کنید. نام یا مشخصهٔ دفتر پس از ذخیره به‌روز شود.

## H26 تنظیمات حساب کاربری و خروج

**توضیح کوتاه:** زبان برنامه، دفترهای کاربر، تغییر گذرواژه و خروج را در صفحهٔ پروفایل معرفی می‌کند.

**مسیر:** `/settings/profile`

**پیش‌نیاز:** حساب آموزشی با نشست فعال و گذرواژهٔ قابل تغییر در دسترس باشد.

### مراحل ضبط

1. تنظیمات حساب را باز کنید.
2. زبان نمایش و دفترهای مرتبط را مرور کنید.
3. در صورت نیاز پنجرهٔ گذرواژه را فقط تا قبل از ذخیره نشان دهید.
4. منوی خروج را باز و خروج از حساب آموزشی را انجام دهید.

**نتیجهٔ مورد انتظار:** پروفایل و گزینه‌های حساب دیده شوند؛ پس از خروج صفحهٔ ورود باز شود.

**شرط ضبط/توقف:** گذرواژه در تصویر یا نریشن گفته نشود؛ تغییر آن فقط با دادهٔ آزمایشی.

**شاهد:** [router/index.ts:80](../hesabro-one-frontend-vue/src/router/index.ts#L80)؛ [views/settings/ProfileView.vue:100](../hesabro-one-frontend-vue/src/views/settings/ProfileView.vue#L100)

### نریشن پیشنهادی

زبان برنامه، دفترهای کاربر، تغییر گذرواژه و خروج را در صفحهٔ پروفایل معرفی می‌کند. تنظیمات حساب را باز کنید. زبان نمایش و دفترهای مرتبط را مرور کنید. در صورت نیاز پنجرهٔ گذرواژه را فقط تا قبل از ذخیره نشان دهید. منوی خروج را باز و خروج از حساب آموزشی را انجام دهید. پروفایل و گزینه‌های حساب دیده شوند؛ پس از خروج صفحهٔ ورود باز شود.

## H27 بررسی اشتراک حسابرو وان

**توضیح کوتاه:** مقایسهٔ پلن‌ها و تغییر دورهٔ پرداخت را بدون خرید واقعی مرور می‌کند.

**مسیر:** `/settings/subscription`

**پیش‌نیاز:** دفتر آزمایشی دارای مجوز مشاهدهٔ اشتراک فعال باشد.

### مراحل ضبط

1. اشتراک دفتر حساب را باز کنید.
2. دفتر فعال و دورهٔ پرداخت را نشان دهید.
3. گزینه‌های ماهانه و سالانه و جدول مقایسه را مرور کنید.
4. پنجرهٔ checkout را در صورت نیاز باز کنید اما پرداخت را نهایی نکنید.

**نتیجهٔ مورد انتظار:** جدول پلن‌ها و وضعیت فعلی قابل مشاهده باشد.

**شرط ضبط/توقف:** هیچ پرداخت یا تمدیدی انجام نشود؛ قیمت و شرایط قبل از انتشار در محیط جاری بازبینی شوند.

**شاهد:** [router/index.ts:92](../hesabro-one-frontend-vue/src/router/index.ts#L92)؛ [views/settings/SubscriptionView.vue:39](../hesabro-one-frontend-vue/src/views/settings/SubscriptionView.vue#L39)

### نریشن پیشنهادی

مقایسهٔ پلن‌ها و تغییر دورهٔ پرداخت را بدون خرید واقعی مرور می‌کند. اشتراک دفتر حساب را باز کنید. دفتر فعال و دورهٔ پرداخت را نشان دهید. گزینه‌های ماهانه و سالانه و جدول مقایسه را مرور کنید. پنجرهٔ checkout را در صورت نیاز باز کنید اما پرداخت را نهایی نکنید. جدول پلن‌ها و وضعیت فعلی قابل مشاهده باشد.

## H28 مشاهدهٔ پورتال میهمان

**توضیح کوتاه:** نمای فقط‌خواندنی میهمان برای مرور سال مالی، حساب و ردیف‌های قابل مشاهده را معرفی می‌کند.

**مسیر:** `/guest`

**پیش‌نیاز:** دفتر میهمان آزمایشی با مجوز read-only و دادهٔ ساختگی آماده باشد.

### مراحل ضبط

1. با حساب میهمان وارد شوید.
2. سال مالی را از فهرست انتخاب کنید.
3. حساب را انتخاب و ردیف‌های نمایش‌داده‌شده را مرور کنید.
4. بازگشت به دفتر از کنترل صفحه را نشان دهید.

**نتیجهٔ مورد انتظار:** فقط داده‌های مجاز میهمان نمایش داده شود و امکان ویرایش وجود نداشته باشد.

**شرط ضبط/توقف:** سناریو فقط‌خواندنی است؛ هویت و دادهٔ واقعی مالک پوشانده شود.

**شاهد:** [router/index.ts:74](../hesabro-one-frontend-vue/src/router/index.ts#L74)؛ [views/guest/GuestPortalView.vue:241](../hesabro-one-frontend-vue/src/views/guest/GuestPortalView.vue#L241)

### نریشن پیشنهادی

نمای فقط‌خواندنی میهمان برای مرور سال مالی، حساب و ردیف‌های قابل مشاهده را معرفی می‌کند. با حساب میهمان وارد شوید. سال مالی را از فهرست انتخاب کنید. حساب را انتخاب و ردیف‌های نمایش‌داده‌شده را مرور کنید. بازگشت به دفتر از کنترل صفحه را نشان دهید. فقط داده‌های مجاز میهمان نمایش داده شود و امکان ویرایش وجود نداشته باشد.

