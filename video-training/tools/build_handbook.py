"""Build and validate the Persian source-based Faro production handbook.

Run from the repository root with Python 3. No network or service mutations.
Only files in the handbook output folder are written.
"""
import csv
import base64
import hashlib
import html
import json
import re
import subprocess
import sys
import zipfile
from collections import Counter
from pathlib import Path

from evidence_map import EXTRAS, SOURCES
from scenario_data import SCENARIOS
from hesabro_one_scenarios import SCENARIOS as HESABRO_SCENARIOS

sys.stdout.reconfigure(encoding='utf-8')
SCRIPT_DIR = Path(__file__).resolve().parent
OUT = SCRIPT_DIR.parent
PARENT = OUT.parent
ROOT = PARENT if (PARENT / 'pubspec.yaml').is_file() else PARENT / 'faro-flutter'
if not (ROOT / 'pubspec.yaml').is_file():
    raise RuntimeError(f'Cannot find Faro source repository next to handbook: {OUT}')
FA = json.loads((ROOT / 'assets/l10n/fa.json').read_text(encoding='utf-8'))
SOURCE_REFS = {}

def loc(key):
    value = FA
    for part in key.split('.'):
        value = value[part]
    assert isinstance(value, str), key
    return value

def write_csv(name, columns, rows):
    with (OUT / name).open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.writer(stream)
        writer.writerow(columns)
        writer.writerows(rows)

def esc(value):
    return str(value).replace('|', '¦').replace('\n', ' / ')

def table(headers, rows):
    return '\n'.join(['| ' + ' | '.join(map(esc, headers)) + ' |',
        '| ' + ' | '.join('---' for _ in headers) + ' |'] +
        ['| ' + ' | '.join(map(esc, row)) + ' |' for row in rows]) + '\n'

for alias, (relative, marker) in SOURCES.items():
    path = ROOT / relative
    assert path.is_file(), f'Missing source {alias}: {relative}'
    lines = path.read_text(encoding='utf-8').splitlines()
    line = next((i for i, value in enumerate(lines, 1) if marker in value), None)
    assert line, f'Missing source marker {alias}: {marker}'
    SOURCE_REFS[alias] = dict(path=relative, line=line, marker=marker,
        sha256=hashlib.sha256(path.read_bytes()).hexdigest())

def ref(alias):
    item = SOURCE_REFS[alias]
    link = Path(__import__('os').path.relpath(ROOT / item['path'], OUT)).as_posix()
    return f"[{item['path']}:{item['line']}]({link}#L{item['line']})"

def refs(aliases):
    return '؛ '.join(ref(alias) for alias in aliases)

def normalize(text):
    # Labels corrected after tracing the reachable ProfileView and fa.json.
    replacements = {
        '09 و ده رقم بعد از آن': '09 و نه رقم بعد از آن',
        'تب ارسالی؛ عنوان از mail.folder_outbox': 'خروجی',
        'تب دریافتی از mail.folder_inbox': 'ورودی',
        'دریافتی؛ از mail.folder_inbox': 'ورودی',
        'تب بایگانی از mail.folder_archived': 'بایگانی',
        '/mail → دریافتی': '/mail → ورودی',
        "'دریافتی'": "'ورودی'",
        'ردیف تغییر پوسته با آیکون ماه': 'تم؛ ردیف دارای آیکون ماه',
        'دکمهٔ تأیید با کلید time_picker.confirm': 'تأیید',
        'دکمهٔ ذخیره از workspace.settings_tab.save_button': 'ذخیره تغییرات',
        'توضیح با هوش مصنوعی؛ متن دقیق از chat.explain_with_ai': 'توضیح با هوش مصنوعی',
        'کارت حساب و پنجره': 'دکمهٔ مشخصات در کارت حساب و پنجره',
        'کارت انتشار پاییز': 'ردیف انتشار پاییز',
        'منوی سه‌نقطهٔ کارت انتشار پاییز': 'منوی سه‌نقطهٔ ردیف انتشار پاییز',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

for scenario in SCENARIOS:
    for key in ['title', 'publish', 'goal', 'route', 'prerequisite', 'risks', 'hook', 'result', 'ending']:
        scenario[key] = normalize(scenario[key])
    scenario['steps'] = [tuple(normalize(value) for value in row) for row in scenario['steps']]
    scenario['data'] = [tuple(normalize(value) for value in row) for row in scenario['data']]
    assert scenario['sources'] and all(x in SOURCES for x in scenario['sources'])

# Reachable profile controls differ from the dormant ProjectsView.
SCENARIOS[3]['steps'][0] = ('/profile', 'مشخصات در کارت حساب', 'کلیک', '—',
    'پنجرهٔ پروفایل در زبانهٔ مشخصات کاربری باز می‌شود.', 'دکمهٔ مشخصات در کارت حساب',
    'از صفحهٔ حساب، مشخصات رو باز می‌کنیم.')
SCENARIOS[4]['steps'][0] = ('/profile', 'نشست‌ها در کارت حساب', 'کلیک', '—',
    'پنجرهٔ پروفایل در زبانهٔ نشست‌های فعال باز می‌شود.', 'دکمهٔ نشست‌ها در کارت حساب',
    'از کارت حساب، نشست‌ها رو باز می‌کنیم.')
SCENARIOS[7]['route'] = '/profile?tab=projects → پروژه‌ها'
SCENARIOS[7]['steps'][0] = ('/profile → زبانهٔ پروژه‌ها', 'دکمهٔ مثبت با tooltip ایجاد پروژه',
    'کلیک روی مثبت کنار فیلترهای پروژه', '—', 'فرم ایجاد پروژه جدید باز می‌شود.',
    'مثبت و tooltip ایجاد پروژه', 'از تب پروژه‌ها، دکمهٔ ایجاد پروژه رو می‌زنیم.')
for index in [7, 8, 9, 10, 26]:
    SCENARIOS[index]['prerequisite'] += ' از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید؛ ممکن است صفحه ابتدا فضاهای کاری را نشان دهد.'
    SCENARIOS[index]['sources'] = list(dict.fromkeys(['profile'] + SCENARIOS[index]['sources']))
SCENARIOS[10]['sources'] += ['project_settings_dropdown']
SCENARIOS[10]['risks'] += ' مسیر فعلی ProjectSettingsDropdown است؛ EditProjectDialog قدیمی مرجع کنترل‌های این برداشت نیست. پیام موفقیت قبل از پایان callback ممکن است دیده شود؛ بازخوانی سرور ضروری است.'
SCENARIOS[15]['prerequisite'] += ' پاسخ هدف باید آخرین پیام کامل گفت‌وگو باشد؛ callback تولید مجدد فقط برای آخرین پاسخ وصل است.'
SCENARIOS[22]['route'] = '/chat → /ai/conversation/new → گفت‌وگوی ایجادشده'
SCENARIOS[22]['steps'][1] = ('منوی پیام', 'توضیح با هوش مصنوعی', 'کلیک', '—',
    'گفت‌وگوی تازه باز می‌شود و درخواست توضیح به‌طور خودکار در همان گفتگو فرستاده می‌شود.',
    'گزینهٔ جادویی و مقصد AI', 'توضیح با هوش مصنوعی رو می‌زنیم؛ درخواست توضیح خودکار ارسال می‌شه.')
SCENARIOS[22]['risks'] = 'این انتقال در callback _explainWithAi اثبات شده؛ موفقیت در اجرا هنوز آزموده نشده است. اگر پاسخ AI دیگری در حال تولید باشد عملیات با خطای مشغول متوقف می‌شود. در این برداشت فایل و گفت‌وگوی موجود انتخاب نشوند.'
SCENARIOS[26]['steps'][1] = ('نمای پروژه', 'تخته در تب‌های ابزار پروژه', 'کلیک', '—',
    'تختهٔ همان پروژه باز می‌شود.', 'تب تخته و نام پروژه',
    'از ابزارهای همین پروژه، تخته رو انتخاب می‌کنیم.')
SCENARIOS[26]['sources'] += ['project_tools']
SCENARIOS[26]['risks'] = 'نبود بورد یا منع مجوز باید پیش از ضبط حل شود؛ ستون با ایجاد بورد یا workflow جدید یکی نیست. کنترل واقعی ورود به این نمای پروژه «تخته» است.'
for scenario in SCENARIOS:
    scenario['sources'] = list(dict.fromkeys(scenario['sources']))
    # Correct only control cells; prose may naturally describe received letters.
    scenario['steps'] = [tuple('ورودی' if i == 1 and value == 'دریافتی' else value
                              for i, value in enumerate(row)) for row in scenario['steps']]

RESET = {
 'V01':'حساب آزمون خارج از نشست باشد؛ شماره و کد را پیش از برداشت آماده کنید و کد قبلی را استفاده نکنید.',
 'V02':'فضای آزمایشگاه محصول را دوباره فعال و فیلد جست‌وجو را خالی کنید.',
 'V03':'تم روشن را از کنترل حالت انتخاب کنید؛ زبان فارسی و نوار کناری باز باشند.',
 'V04':'نام و بیوگرافی حساب مصرفی را به دادهٔ پایه برگردانید؛ نام کاربری معتبر را دست نزنید.',
 'V05':'نشست دوم آزمایشی را باز نگه دارید؛ هیچ نشست واقعی وارد قاب نشود.',
 'V06':'برای برداشت مجدد فضای مصرفی تازه آماده کنید؛ حذف فضای مشترک برای reset انجام نشود.',
 'V07':'از یک حساب آموزشی هنوز دعوت‌نشده استفاده کنید یا وضعیت دعوت را توسط مسئول محیط بازتنظیم کنید.',
 'V08':'نام پروژهٔ هدف در محیط برداشت موجود نباشد؛ پروژهٔ مشترک سناریوهای دیگر حذف نشود.',
 'V09':'سنجاق پروژه را بردارید و فیلتر همه را فعال کنید.',
 'V10':'عضو نمونه هنوز عضو پروژه نباشد؛ عضویت فضای کاری او فعال بماند.',
 'V11':'توضیح پروژهٔ کپی را به متن پایه برگردانید و تب اطلاعات کلی را باز نگه دارید.',
 'V12':'به /ai برگردید؛ ورودی متن و پیوست خالی و مدل معتبر منتخب باشد.',
 'V13':'مدل اول برگهٔ برداشت را دوباره فعال کنید؛ هیچ پیامی لازم نیست ارسال شود.',
 'V14':'پیوست‌های staged و متن ورودی را خالی کنید؛ فایل نمونه روی دستگاه موجود باشد.',
 'V15':'فهرست گفتگوها باز و جست‌وجو خالی باشد؛ عنوان نمونه همان عنوان ثبت‌شده باقی بماند.',
 'V16':'گفت‌وگوی کپی دارای آخرین پاسخ کامل باز شود؛ کلیپ‌بورد و ویرایشگر مقصد فقط دادهٔ نمونه داشته باشند.',
 'V17':'فرم گفت‌وگو بسته و هیچ متنی در composer اتاق مقصد باقی نمانده باشد؛ پیام تکراری به مخاطب واقعی ارسال نشود.',
 'V18':'برای برداشت تازه، موضوع مصرفی یکتا آماده کنید؛ از اتاق واقعی چیزی پاک نشود.',
 'V19':'اگر ساخت گروه موفق و افزودن عضو ناموفق بود، همان گروه را بررسی کنید؛ تا رفع وضعیت گروه تازه نسازید.',
 'V20':'حالت پاسخ composer را لغو کنید؛ پیام مرجع نمونه در تاریخچه باقی بماند.',
 'V21':'پنجرهٔ فوروارد و مقصدها پاک باشند؛ پیام نمونهٔ مبدأ موجود بماند.',
 'V22':'فایل و متن staged را پاک کنید؛ فایل نمونه را بازنویسی نکنید.',
 'V23':'هیچ جریان AI در حال تولید نباشد؛ پیام آموزشی بدون فایل در اتاق مبدأ حاضر باشد.',
 'V24':'برای هر برداشت وظیفهٔ مصرفی مستقل آماده کنید؛ عنوان، مسئول و ستون را از پیش بررسی کنید.',
 'V25':'مهلت و یادآوری وظیفهٔ کپی پاک باشند؛ فردا و زمان ساعت دستگاه دوباره بررسی شوند.',
 'V26':'از وظیفهٔ کپی بدون چک‌لیست استفاده کنید؛ موارد مشترک آموزشی دیگر حذف نشوند.',
 'V27':'ستون بازبینی در بورد کپی موجود نباشد؛ ستون دارای کارهای دیگر حذف نشود.',
 'V28':'کارت نمونه را به برای انجام برگردانید و ثبت تغییر را قبل از شروع برداشت بررسی کنید.',
 'V29':'جست‌وجو خالی، تب وظایف من و ترتیب جدیدترین فعال باشند؛ سه وظیفه به حساب جاری محول باشند.',
 'V30':'ورودی و مرجع پاسخ خالی باشند؛ گزارش‌های تکراری را فقط در کپی مصرفی مدیریت کنید.',
 'V31':'پیش‌نویس عملیات create در همین فضا بررسی یا پاک شود؛ هیچ گیرندهٔ قبلی باقی نماند.',
 'V32':'پوشهٔ ورودی و جست‌وجوی خالی؛ نامهٔ نمونه برای حساب ضبط قابل مشاهده باشد.',
 'V33':'نامهٔ تازهٔ نیازمند پاراف برای حساب ضبط بسازید؛ پاراف ثبت‌شده را قابل بازگردانی فرض نکنید.',
 'V34':'ورودی مکاتبات و مرجع پاسخ خالی باشند؛ همان نامهٔ آموزشی باز شود.',
 'V35':'پنجره‌های چاپ بسته و نامهٔ نمونه آماده باشد؛ هیچ چاپ واقعی برای reset انجام نشود.',
 'V36':'پنجرهٔ جست‌وجو بسته و آخرین scope پاک باشد؛ وظیفهٔ نمونه قابل مشاهده باشد.',
 'V37':'پیش‌نویس ارجاع همان parent خالی و فهرست گیرندگان بدون انتخاب قبلی باشد.',
 'V38':'نامهٔ نمونه از بایگانی خارج و پوشهٔ ورودی با جست‌وجوی خالی باز باشد.',
 'V39':'راهنمای میانبر بسته، نوار کناری باز و فوکوس خارج از ورودی باشد.',
 'V40':'توضیح فضای مصرفی را به متن پایه برگردانید؛ از ناحیهٔ حساس استفاده نکنید.',
 'V41':'دستورالعمل AI پروژهٔ مصرفی به متن پایه برگردد؛ از پروژهٔ واقعی برای آزمایش استفاده نشود.',
 'V42':'فایل هم‌نام در پروژهٔ مصرفی نباشد؛ فایل مشترک یا دانشی مورد استفادهٔ دیگران حذف نشود.',
}

FEATURE_HEADERS = ['Feature ID','نام قابلیت','ماژول','مسیر صفحه','نقش کاربری','هدف قابلیت',
                   'اقدامات کاربر','پیش‌نیازها','سطح پیچیدگی','ارزش آموزشی','شواهد سورس‌کد','وضعیت بررسی','سناریو یا دلیل عدم تولید']
feature_rows = []
for s in SCENARIOS:
    feature_rows.append([f"F{len(feature_rows)+1:03}", s['title'], s['module'], s['route'],
        s['role'], s['goal'], ' ← '.join(row[1] for row in s['steps']), s['prerequisite'],
        s['level'], 'زیاد' if s['priority']=='P0' else 'متوسط', refs(s['sources']),
        'کد تأییدشده؛ اجرا نیازمند تست' if s['id']!='V42' else 'کد موجود؛ ناسازگاری متن و API؛ توقف انتشار تا تست', s['id']])
for row in EXTRAS:
    title,module,route,role,goal,actions,pre,level,value,evidence,status,relation = row
    feature_rows.append([f'F{len(feature_rows)+1:03}',title,module,route,role,goal,actions,pre,level,value,refs(evidence),status,relation])
write_csv('feature-inventory.csv', FEATURE_HEADERS, feature_rows)

PLAN_HEADERS = ['شناسه','عنوان ویدیو','ماژول','هدف آموزشی','سطح','زمان تخمینی به ثانیه','اولویت','پیش‌نیاز']
plan_rows = [[s['id'],s['publish'],s['module'],s['goal'],s['level'],s['duration'],s['priority'],s['prerequisite']] for s in SCENARIOS]
write_csv('curriculum.csv', PLAN_HEADERS, plan_rows)

def friendly_text(value):
    replacements = (
        ('/profile?tab=projects', 'صفحهٔ حساب، زبانهٔ «پروژه‌ها»'),
        ('/projects/:projectId/board', 'تختهٔ پروژهٔ انتخاب‌شده'),
        ('/projects/:projectId', 'پروژهٔ انتخاب‌شده'),
        ('/ai/conversation/new', 'گفت‌وگوی جدید هوش مصنوعی'),
        ('/ai/conversation/:conversationId', 'گفت‌وگوی هوش مصنوعی'),
        ('/tasks/:taskId', 'وظیفهٔ انتخاب‌شده'),
        ('/profile', 'صفحهٔ حساب'),
        ('/login', 'صفحهٔ ورود'),
        ('/ai', 'صفحهٔ هوش مصنوعی'),
        ('/chat', 'گفت‌وگوها'),
        ('/tasks', 'وظایف'),
        ('/mail', 'نامه‌ها'),
        ('/search', 'جست‌وجوی سراسری'),
    )
    for route, label in replacements:
        value = value.replace(route, label)
    return value


def friendly_text(value):
    replacements = (
        ('/profile?tab=projects', 'صفحهٔ حساب، زبانهٔ «پروژه‌ها»'),
        ('/projects/:projectId/board', 'تختهٔ پروژهٔ انتخاب‌شده'),
        ('/projects/:projectId', 'پروژهٔ انتخاب‌شده'),
        ('/ai/conversation/new', 'گفت‌وگوی جدید هوش مصنوعی'),
        ('/ai/conversation/:conversationId', 'گفت‌وگوی هوش مصنوعی'),
        ('/tasks/:taskId', 'وظیفهٔ انتخاب‌شده'),
        ('/profile', 'صفحهٔ حساب'),
        ('/login', 'صفحهٔ ورود'),
        ('/ai', 'صفحهٔ هوش مصنوعی'),
        ('/chat', 'گفت‌وگوها'),
        ('/tasks', 'وظایف'),
        ('/mail', 'نامه‌ها'),
        ('/search', 'جست‌وجوی سراسری'),
    )
    for route, label in replacements:
        value = value.replace(route, label)
    return value


def friendly_text(value):
    replacements = (
        ('/profile?tab=projects', 'صفحهٔ حساب، زبانهٔ «پروژه‌ها»'),
        ('/projects/:projectId/board', 'تختهٔ پروژهٔ انتخاب‌شده'),
        ('/projects/:projectId', 'پروژهٔ انتخاب‌شده'),
        ('/ai/conversation/new', 'گفت‌وگوی جدید هوش مصنوعی'),
        ('/ai/conversation/:conversationId', 'گفت‌وگوی هوش مصنوعی'),
        ('/tasks/:taskId', 'وظیفهٔ انتخاب‌شده'),
        ('/profile', 'صفحهٔ حساب'),
        ('/login', 'صفحهٔ ورود'),
        ('/ai', 'صفحهٔ هوش مصنوعی'),
        ('/chat', 'گفت‌وگوها'),
        ('/tasks', 'وظایف'),
        ('/mail', 'نامه‌ها'),
        ('/search', 'جست‌وجوی سراسری'),
    )
    for route, label in replacements:
        value = value.replace(route, label)
    return value


def friendly_page(page):
    return friendly_text(page)


def start_navigation(page):
    if page.startswith('/profile') or '/projects/' in page:
        return 'از نوار کناری «پروژه‌ها» را باز کنید و زبانهٔ «پروژه‌ها» را انتخاب کنید.'
    if page.startswith('/ai'):
        return 'از نوار کناری «هوش مصنوعی» را باز کنید.'
    if page.startswith('/chat'):
        return 'از نوار کناری «گفت‌وگوها» را باز کنید.'
    if page.startswith('/tasks'):
        return 'از نوار کناری «وظایف» را باز کنید.'
    if page.startswith('/mail'):
        return 'از نوار کناری «نامه‌ها» را باز کنید.'
    return ''


def timings(s):
    duration = s['duration']
    hook = 3 if duration<=40 else 4
    intro = 3 if duration<=50 else (5 if duration>=80 else 4)
    result = max(5, min(10, round(duration*.1)))
    end = 3 if duration<=50 else (5 if duration>=80 else 4)
    action = duration-hook-intro-result-end
    base, extra = divmod(action, len(s['steps']))
    times = [base + (i<extra) for i in range(len(s['steps']))]
    return hook,intro,result,end,times

NARRATION_TEXT = {}
def scenario_markdown(s):
    hook,intro,result,end,step_times = timings(s)
    start = hook + intro
    rows = []
    for index,(row,seconds) in enumerate(zip(s['steps'],step_times),1):
        page,control,action,data,outcome,focus,narration = row
        rows.append([f'{index} · {start}–{start+seconds} ثانیه',friendly_page(page),control,action,data,friendly_text(outcome),focus,friendly_text(narration)])
        start += seconds
    expected = friendly_text(s['steps'][-1][4])
    narration = [s['hook'], s['goal'] + ' را در این آموزش دنبال می‌کنیم.']
    # Natural spoken intros, avoiding a formal sentence mechanically copied from metadata.
    intros = {
        'V01':'با حساب آموزشی، مراحل ورود رو انجام می‌دیم.',
        'V02':'فضای کاری مقصد رو با هم انتخاب می‌کنیم.',
        'V03':'این بار حالت روشن رو به تاریک تغییر می‌دیم.',
        'V04':'نام و توضیح حساب آموزشی رو به‌روز می‌کنیم.',
        'V05':'دستگاه فعلی و اتصال دوم حساب رو بررسی می‌کنیم.',
        'V06':'یک فضای آموزشی تازه برای تیم می‌سازیم.',
        'V07':'سارا رو با نقش عضو به فضای آموزشی دعوت می‌کنیم.',
        'V08':'یک پروژهٔ نمونه برای انتشار پاییز می‌سازیم.',
        'V09':'پروژهٔ انتشار پاییز رو سنجاق می‌کنیم.',
        'V10':'عضویت سارا در همین پروژه رو تنظیم می‌کنیم.',
        'V11':'توضیح پروژه رو بدون ساختن پروژهٔ تازه تغییر می‌دیم.',
        'V12':'یک درخواست مشخص برای آماده‌سازی ضبط می‌فرستیم.',
        'V13':'مدل در دسترس رو از فهرست حساب انتخاب می‌کنیم.',
        'V14':'فایل آموزشی رو همراه یک درخواست روشن می‌فرستیم.',
        'V15':'این بار از جست‌وجوی فهرست گفتگوها استفاده می‌کنیم.',
        'V16':'روی آخرین پاسخ کامل گفتگو کار می‌کنیم.',
        'V17':'یک پیام مستقیم به حساب آزمایشی سارا می‌فرستیم.',
        'V18':'برای بازبینی ویدیو، یک گفت‌وگوی موضوعی می‌سازیم.',
        'V19':'گروه رو با دو حساب آموزشی آماده می‌کنیم.',
        'V20':'به یک پیام مشخص در گروه پاسخ می‌دیم.',
        'V21':'پیام نمونه رو همراه یک یادداشت منتقل می‌کنیم.',
        'V22':'فایل آموزشی رو همراه توضیح می‌فرستیم.',
        'V23':'از منوی همون پیام، توضیح هوش مصنوعی رو می‌گیریم.',
        'V24':'کار رو با پروژه و مسئول مشخص ثبت می‌کنیم.',
        'V25':'برای وظیفهٔ نمونه، دو زمان مستقل می‌گذاریم.',
        'V26':'دو قدم روشن به چک‌لیست همین وظیفه اضافه می‌کنیم.',
        'V27':'ستون بازبینی رو به بورد موجود اضافه می‌کنیم.',
        'V28':'کارت نمونه رو از برای انجام به بازبینی می‌بریم.',
        'V29':'با جست‌وجو و مرتب‌سازی، فهرست رو مرور می‌کنیم.',
        'V30':'یک گزارش کوتاه از کار انجام‌شده ثبت می‌کنیم.',
        'V31':'یک نامهٔ نمونه برای حساب آموزشی سارا می‌فرستیم.',
        'V32':'نامه رو از روی پوشه و موضوع پیدا می‌کنیم.',
        'V33':'روی نامهٔ آموزشی، پاراف و نظر ثبت می‌کنیم.',
        'V34':'پاسخ رو داخل مکاتبات همون نامه می‌نویسیم.',
        'V35':'بدون چاپ فیزیکی، پیش‌نمایش نامه رو می‌بینیم.',
        'V36':'با صفحه‌کلید به یک وظیفهٔ مشخص می‌رسیم.',
        'V37':'نامه رو برای بررسی به حساب آموزشی امیر ارجاع می‌دیم.',
        'V38':'نامهٔ نمونه رو بایگانی و دوباره برمی‌گردونیم.',
        'V39':'راهنمای میانبرها رو باز می‌کنیم و یک مورد رو امتحان می‌کنیم.',
        'V40':'توضیح فضای کاری آموزشی رو به‌روز می‌کنیم.',
        'V41':'برای لحن و شکل خروجی، دستورالعمل پروژه می‌نویسیم.',
        'V42':'فایل نمونه رو می‌فرستیم و وضعیت پردازش رو بررسی می‌کنیم.',
    }
    narration[1] = intros[s['id']]
    narration += [row[-1] for row in s['steps']] + [s['result'],s['ending']]
    NARRATION_TEXT[s['id']] = '\n'.join(narration)
    words = sum(len(x.split()) for x in narration)
    # Each section corresponds directly to the user's required A–G structure.
    return f'''## {s['id']} {s['title']}

### A شناسنامه سناریو

{table(['فیلد','مقدار'], [
    ['عنوان اصلی',s['title']],['عنوان انتشار',s['publish']],['ماژول',s['module']],
    ['هدف آموزشی',s['goal']],['مخاطب','کاربران فارسی‌زبان دسکتاپ و نقش مشخص‌شده در همین شناسنامه'],
    ['نقش موردنیاز',s['role']],['سطح',s['level']],['زمان هدف',str(s['duration'])+' ثانیه'],
    ['اولویت',s['priority']],['مسیر دقیق',s['route']],['پیش‌نیاز',s['prerequisite']],
    ['نتیجهٔ یادگیری',s['goal']],['وضعیت','کد بررسی شده؛ اجرای تعاملی هنوز تأیید نشده' if s['id']!='V42' else 'توقف انتشار تا رفع ابهام پایگاه دانش و آزمون اجرایی']])}

شواهد همان نسخه: {refs(s['sources'])}

### B آماده‌سازی محیط ضبط

با نقش «{s['role']}» وارد محیط آموزشی شوید. {friendly_text(s['prerequisite'])}

وضعیت آغاز: {friendly_page(s['steps'][0][0])} باز باشد؛ کنترل «{s['steps'][0][1]}» در قاب قابل دیدن باشد. {start_navigation(s['steps'][0][0])} زبان فارسی، تم و اندازهٔ پنجره مطابق استاندارد مجموعه ثابت باشند. مودال، راهنمای شناور و جست‌وجوی باقی‌مانده از برداشت قبلی بسته یا پاک شوند.

بازآماده‌سازی برای برداشت مجدد: {friendly_text(RESET[s['id']])}

خطاها و شرط توقف: {friendly_text(s['risks'])}

### C داده‌های آزمایشی

{table(['فیلد','مقدار آزمایشی','اعتبار و وابستگی'],s['data'])}

### D راهنمای گام‌به‌گام ضبط

مسیر اجرای ساده‌تر برای ضبط در جدول اول آمده است. نام کنترل و متن ورودی را همان‌طور که نوشته شده دنبال کنید؛ جدول دقیق UI در ادامه برای بررسی جزئیات و تدوین است.

{table(['گام','کجا بروم؟','روی چه چیزی بزنم؟','چه کاری انجام بدهم؟','چه چیزی باید ببینم؟'], [[str(i),friendly_page(row[0]),row[1],row[2] + (('؛ «'+row[3]+'» را وارد کنید') if row[3] != '—' else ''),friendly_text(row[4])] for i,row in enumerate(s['steps'],1)])}

زمان‌های جدول دقیق UI، زمان نهایی تدوین هستند و شامل شروع و پایان مستقل زیر نمی‌شوند. انتظار شبکه پس از نشان‌دادن آغاز آن کوتاه شود؛ نتیجهٔ همان درخواست در قاب باقی بماند. متن و جای عناصر سیستم‌عامل با برگهٔ برداشت تطبیق داده شوند.

{table(['مرحله و زمان','مسیر یا صفحه','عنصر UI و متن کنترل','تعامل ضبط‌کننده','دادهٔ تست','خروجی مورد انتظار','تمرکز تصویر','نریشن هماهنگ'],rows)}

### E متن آمادهٔ گویندگی

هوک از ۰ تا {hook} ثانیه: «{s['hook']}»

معرفی مسئله از {hook} تا {hook+intro} ثانیه: «{intros[s['id']]}»

آموزش عملی از {hook+intro} تا {start} ثانیه:

«{' '.join(row[-1] for row in s['steps'])}»

نمایش نتیجه از {start} تا {start+result} ثانیه: «{s['result']}»

پایان از {start+result} تا {s['duration']} ثانیه: «{s['ending']}»

متن حدود {words} واژه دارد؛ برآورد {words/s['duration']:.2f} واژه در ثانیه شامل مکث‌هاست. گوینده فقط همین پنج بخش را به ترتیب بخواند؛ نریشن جدول تکرار همین بخش عملی است. زمان واقعی با یک خوانش آزمایشی کنترل شود.

### F شات‌لیست و تدوین

{table(['بازه','نما و حرکت','کلیک یا مکث و تدوین'],[
    [f'۰–{hook}', 'نمای آغاز از '+friendly_page(s['steps'][0][0]), 'متن روی تصویر: '+s['publish']+'؛ هوک همزمان خوانده شود.'],
    [f'{hook}–{hook+intro}', 'یک نمای معرف از نام فضا یا رکورد و کنترل شروع', 'حرکت کوتاه موس تا '+s['steps'][0][1]+'؛ قبل از کلیک مکث کوتاه.'],
    [f'{hook+intro}–{start}', 'نماهای مرحله‌ای مطابق ستون تمرکز تصویر', 'روی '+s['steps'][min(1,len(s['steps'])-1)][1]+' نمای نزدیک؛ هنگام تایپ طولانی فقط تصویر سریع‌تر شود. بازشدن منو و نتیجه در نماهای پیوسته بمانند.'],
    [f'{start}–{start+result}', 'نمای نهایی از '+s['steps'][-1][6], 'موس از روی متن کنار برود؛ '+expected],
    [f'{start+result}–{s["duration"]}', 'حفظ نمای نهایی و پایان آرام', 'پایان با برش ساده؛ CTA همان جملهٔ پایانی، بدون پوشاندن نتیجه.']])}

نسخهٔ عمودی: کنترل «{s['steps'][0][1]}» و نتیجهٔ «{s['steps'][-1][6]}» در دو نمای نزدیک با یک نمای معرف کوتاه از صفحه ضبط شوند. اگر مسیر کشیدن کارت یا رابطهٔ دو پنل لازم است، هر دو در یک قاب باقی بمانند. پیشنهاد زوم فقط با حفظ نام رکورد و متن کنترل اجرا شود.

### G کنترل کیفیت همان سناریو

- [ ] نسخه و کامیت اجراشده با نسخهٔ سند تطبیق داده و نام آزمونگر ثبت شد.
- [ ] صفحهٔ آغاز «{friendly_page(s['steps'][0][0])}» و کنترل «{s['steps'][0][1]}» در اجرای واقعی وجود دارند.
- [ ] نقش «{s['role']}» و داده‌های بخش C پیش از برداشت تأیید شدند.
- [ ] تمام اقدام‌های جدول یک بار در محیط آموزشی اجرا شدند؛ تفاوت‌ها پیش از ضبط اصلاح شدند.
- [ ] نتیجهٔ واقعی با این انتظار تطبیق دارد: {expected}
- [ ] شرط‌های توقف بررسی شدند: {friendly_text(s['risks'])}
- [ ] ویدیو فقط این پیام اصلی را آموزش می‌دهد: {s['goal']}.
- [ ] هوک خوانا و اختصاصی است؛ نریشن هر کلیک با همان تصویر هماهنگ است.
- [ ] جمع زمان‌ها {s['duration']} ثانیه است و خوانش واقعی گوینده نیز اندازه‌گیری شد.
- [ ] نام حساب، شماره، کد، توکن، مسیر شخصی فایل و محتوای واقعی در نسخهٔ انتشار دیده نمی‌شوند.
- [ ] برگهٔ {s['id']} در recording-verification.csv با شاهد واقعی تکمیل شد؛ کادرهای این سند از پیش تأییدشده نیستند.

''', words

report = (OUT / 'tools/report_intro.md').read_text(encoding='utf-8')
report = report.replace('۴۰', '۴۲')
report = report.replace('V23 افزون بر آن به تأیید مسیر دقیق انتقال بین چت و AI نیاز دارد.',
    'V42 افزون بر آن به رفع ابهام دامنهٔ پایگاه دانش و تطبیق متن UI با API نیاز دارد.')
report = report.replace('V40 مدیریت تکمیلی فضای کاری.', 'V40 مدیریت تکمیلی فضای کاری و V41 و V42 تنظیمات AI پروژه هستند.')
report = report.replace('business/:id در قالب businesses/:id/', 'businesses/:id/')
report = re.sub(r'\{\{ref:([a-z_]+)\}\}',lambda match:ref(match[1]),report)
report = report.replace('{{inventory}}',table(FEATURE_HEADERS,feature_rows))
report = report.replace('{{curriculum}}',table(PLAN_HEADERS,plan_rows))
report += '\nدر مسیر فعلی پروژه‌ها، ProfileView از ProjectsFilterTabs و ProjectListRow استفاده می‌کند. کنترل تغییر نمای لیستی و شبکه‌ای و مرتب‌سازی ProjectsHeader قدیمی به این مسیر وصل نیستند؛ این دو مورد در فهرست قابلیت‌ها با وضعیت مسیر اثبات‌نشده ثبت شده‌اند. دکمهٔ ساخت پروژه در این صفحه آیکون مثبت با tooltip «ایجاد پروژه» است. همچنین دکمه‌های کارت حساب «مشخصات» و «نشست‌ها»، و عنوان تب بورد «تخته» هستند. '+refs(['profile','project_tools'])+'\n\n'
word_counts = {}
for scenario in SCENARIOS:
    part,words = scenario_markdown(scenario)
    report += part
    word_counts[scenario['id']] = words

report += '\n## فهرست شواهد قابل بازبینی\n\n'
report += table(['کد شاهد','فایل و خط','عبارت لنگر'],[[alias,ref(alias),v['marker']] for alias,v in SOURCE_REFS.items()])
report += '\n## نگه‌داری سند\n\nاگر نسخهٔ برنامه عوض شد، ابتدا route، متن ترجمه‌ها و callback سناریوهای متأثر بازبینی شوند. تولید دوبارهٔ فایل‌ها با tools/build_handbook.py صرفاً خروجی سند را به‌روز می‌کند و آزمون UI نیست. پس از هر تغییر کد، شاهدهای فایل و hash در evidence-index.json کنترل و برگهٔ اجرای مربوطه دوباره تکمیل شود. سند فعلی هیچ داده‌ای در سرویس فارو ایجاد نکرده و فایل‌های اصلی برنامه را تغییر نداده است.\n'

# Hesabro One production frontend audit and recording scenarios.
frontend_root = OUT.parent / 'hesabro-one-frontend-vue'
frontend_commit = subprocess.check_output(['git','-c',f'safe.directory={frontend_root.as_posix()}','-C',str(frontend_root),'rev-parse','HEAD'],text=True).strip()
def h1_ref(path, marker):
    source = frontend_root / 'src' / path
    lines = source.read_text(encoding='utf-8').splitlines()
    number = next((i for i,line in enumerate(lines,1) if marker in line), None)
    if number is None: raise RuntimeError(f'Missing Hesabro source marker {path}: {marker}')
    relative = Path(__import__('os').path.relpath(source, OUT)).as_posix()
    return f"[{path}:{number}]({relative}#L{number})"
def h1_html_text(value):
    return html.escape(value).replace('&lt;','&lt;')
def build_h1_content():
    rows=[]; copy_lines=[]; cards=[]; md=['# حسابرو وان — راهنمای تولید ویدیو','',f'ممیزی فرانت production در `{frontend_commit}` انجام شده است. محیط اصلی `src/views` و مسیرهای قابل‌دسترسی router مبنا هستند؛ sandbox و showcase از این مجموعه کنار گذاشته شده‌اند. تعداد سناریوهای پیشنهادی: **{len(HESABRO_SCENARIOS)} ویدیو**. مسیرهای اجرایی و نتیجه‌ها باید پیش از ضبط در محیط آموزشی آزموده شوند.','']
    for sid,title,description,route,source,marker,prereq,steps,result,risk in HESABRO_SCENARIOS:
        view_path = source if source.startswith('components/') else (('views/' + source) if not source.startswith('views/') else source)
        view_path = view_path if view_path.endswith('.vue') else view_path+'.vue'
        route_ref = h1_ref('router/index.ts', f"path: '{route.split('?')[0]}'") if route.startswith('/') and route.split('/')[1] not in ('invoices',) else h1_ref('router/index.ts', "path: '/'")
        view_ref = h1_ref(view_path,marker)
        steps_html=''.join(f'<li>{html.escape(step)}</li>' for step in steps)
        narration=' '.join([description]+steps+[result])
        cards.append(f'<section class="scenario h1-scenario" id="{sid.lower()}" data-title="{html.escape(title,quote=True)}"><h2>{sid} · {html.escape(title)}</h2><p><strong>هدف:</strong> {html.escape(description)}</p><p><strong>مسیر:</strong> <code dir="ltr">{html.escape(route)}</code></p><p><strong>پیش‌نیاز:</strong> {html.escape(prereq)}</p><h3>مراحل ضبط</h3><ol>{steps_html}</ol><p><strong>انتظار از نتیجه:</strong> {html.escape(result)}</p><p><strong>شرط ضبط و توقف:</strong> {html.escape(risk)}</p><details><summary>شواهد سورس فرانت</summary><p>{route_ref}؛ {view_ref}</p></details><div class="narration-tools"><button class="copy-narration" data-script="{html.escape(narration,quote=True)}" type="button">کپی نریشن این ویدیو</button><span class="copy-status" aria-live="polite"></span></div></section>')
        rows.append(f'<tr class="h1-task-list-row"><td>{sid}</td><td>{html.escape(title)}</td><td>{html.escape(description)}</td></tr>')
        copy_lines.append(f'{title} — {description}')
        md += [f'## {sid} {title}','','**توضیح کوتاه:** '+description,'',f'**مسیر:** `{route}`','',f'**پیش‌نیاز:** {prereq}','','### مراحل ضبط','']
        md += [f'{i}. {html.escape(step)}' for i,step in enumerate(steps,1)]
        md += ['',f'**نتیجهٔ مورد انتظار:** {result}','','**شرط ضبط/توقف:** '+risk,'',f'**شاهد:** {route_ref}؛ {view_ref}','','### نریشن پیشنهادی','',narration,'']
    task = '<section id="h1-task-list" class="task-list-panel"><h2>فهرست عنوان و توضیح کوتاه ویدیوهای حسابرو وان</h2><p>این فهرست برای انتقال به لیست تسک یا ارائه به کارفرما آماده شده است.</p><div class="task-list-actions"><button class="copy-h1-task-list" type="button" data-copy-text="' + html.escape('\n'.join(copy_lines),quote=True) + '">کپی عنوان و توضیح همهٔ ویدیوها</button><span class="h1-task-copy-status" aria-live="polite"></span></div><div class="table-scroll task-list-table"><table><thead><tr><th>شناسه</th><th>عنوان ویدیو</th><th>توضیح کوتاه</th></tr></thead><tbody>' + ''.join(rows) + '</tbody></table></div></section>'
    return task+''.join(cards), '\n'.join(md), '\n'.join(copy_lines)
h1_rendered, h1_markdown, h1_task_copy = build_h1_content()
report += '\n\n'+h1_markdown+'\n'
write_csv('hesabro-one-curriculum.csv',['شناسه','عنوان ویدیو','توضیح کوتاه','مسیر','پیش‌نیاز','نتیجه','شرط ضبط/توقف'],[[s[0],s[1],s[2],s[3],s[6],s[8],s[9]] for s in HESABRO_SCENARIOS])
(OUT / 'FARO_VIDEO_PRODUCTION_HANDBOOK_FA.md').write_text(report,encoding='utf-8')


# Build a searchable local HTML document with no remote resources or telemetry.
def inline(value):
    value = html.escape(value)
    value = re.sub(r'`([^`]+)`',r'<code dir="ltr">\1</code>',value)
    value = re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',value)
    value = re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<a href="\2">\1</a>',value)
    return value

heading_count = 0
toc = []
def render_markdown(text):
    global heading_count
    active_video = None
    lines = text.splitlines()
    chunks=[]
    index=0
    while index<len(lines):
        line=lines[index]
        if not line.strip():
            index+=1
            continue
        if line.startswith('|'):
            block=[]
            while index<len(lines) and lines[index].startswith('|'):
                block.append([v.strip() for v in lines[index].strip('|').split('|')]); index+=1
            assert len(block)>=2
            headers=block[0]; rows=block[2:]
            assert all(len(row)==len(headers) for row in rows)
            kind=('quick steps' if headers[0]=='گام' else ('wide steps' if headers[0]=='مرحله و زمان' else ('wide' if len(headers)>=7 else 'normal')))
            if kind=='wide':
                chunks.append('<p class="muted">برای خواندن همهٔ ستون‌های این جدول، داخل جدول به چپ و راست حرکت کنید.</p>')
            chunks.append(f'<div class="table-scroll {kind}" tabindex="0" role="region" aria-label="جدول قابل پیمایش"><table><thead><tr>'+''.join('<th>'+inline(v)+'</th>' for v in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td data-label="'+html.escape(headers[column],quote=True)+'">'+inline(v)+'</td>' for column,v in enumerate(row))+'</tr>' for row in rows)+'</tbody></table></div>')
            continue
        heading=re.match(r'^(#{1,3}) (.+)$',line)
        if heading:
            level=len(heading[1]); title=heading[2]
            match=re.match(r'(V\d+) ',title)
            if level == 2 and match:
                active_video = match[1]
            if level == 2 and match:
                active_video = match[1]
            if level == 2 and match:
                active_video = match[1]
            if level == 2 and match:
                active_video = match[1]
            if level == 2 and match:
                active_video = match[1]
            if level == 2 and match:
                active_video = match[1]
            if level == 2 and match:
                active_video = match[1]
            ident=match[1].lower() if match else f's{heading_count}'
            heading_count+=1
            if level<=2: toc.append((ident,title, bool(match)))
            chunks.append(f'<h{level} id="{ident}">'+inline(title)+f'</h{level}>')
            if level == 3 and title.startswith('E متن آمادهٔ گویندگی') and active_video in NARRATION_TEXT:
                script = html.escape(NARRATION_TEXT[active_video], quote=True)
                chunks.append('<div class="narration-tools"><button class="copy-narration" type="button" data-script="'+script+'">کپی متن نریشن</button><span class="copy-status" aria-live="polite"></span></div>')
            index+=1
            continue
        if line.startswith('- [ ] '):
            checks=[]
            while index<len(lines) and lines[index].startswith('- [ ] '):
                checks.append('<li><span aria-hidden="true">☐</span> '+inline(lines[index][6:])+'</li>');index+=1
            chunks.append('<ul class="checks">'+''.join(checks)+'</ul>');continue
        paragraph=[]
        while index<len(lines) and lines[index].strip() and not lines[index].startswith(('#','|','- [ ] ')):
            paragraph.append(lines[index]);index+=1
        chunks.append('<p>'+inline(' '.join(paragraph))+'</p>')
    return '\n'.join(chunks)

rendered = render_markdown(report)
sections = re.split(r'(?=<h2 id="v\d+">)',rendered)
wrapped=[]
for part in sections:
    match=re.match(r'<h2 id="(v\d+)">([^<]+)',part)
    if match:
        # Final evidence appendices do not become part of the last scenario.
        tail=re.split(r'(?=<h2 id="s\d+">)',part,maxsplit=1)
        wrapped.append('<section class="scenario" data-title="'+html.escape(match[2],quote=True)+'">'+tail[0]+'</section>')
        if len(tail)>1:wrapped.append(tail[1])
    else:wrapped.append(part)
rendered='\n'.join(wrapped)
task_rows=[]
task_copy_lines=[]
for scenario in SCENARIOS:
    title=scenario['publish']
    description=scenario['goal']
    task_rows.append('<tr class="task-list-row"><td>'+scenario['id']+'</td><td>'+inline(title)+'</td><td>'+inline(description)+'</td></tr>')
    task_copy_lines.append(title+' — '+description)
task_copy_text='\n'.join(task_copy_lines)
task_list_html='''<section id="task-list" class="task-list-panel" aria-labelledby="task-list-heading"><h2 id="task-list-heading">فهرست عنوان و توضیح کوتاه ویدیوها</h2><p>این فهرست برای انتقال به لیست تسک یا ارائه به کارفرما آماده شده است؛ هر ردیف یک عنوان و توضیح یک‌خطی دارد.</p><div class="task-list-actions"><button class="copy-task-list" type="button" data-copy-text="'''+html.escape(task_copy_text,quote=True)+'''">کپی همهٔ عنوان‌ها و توضیحات</button><span class="task-list-copy-status" aria-live="polite"></span></div><div class="table-scroll task-list-table" tabindex="0" role="region" aria-label="فهرست عنوان و توضیح ویدیوها"><table><thead><tr><th>شناسه</th><th>عنوان ویدیو</th><th>توضیح کوتاه</th></tr></thead><tbody>'''+''.join(task_rows)+'''</tbody></table></div></section>'''
if rendered.count('<section class="scenario"') != len(SCENARIOS): raise RuntimeError('scenario wrappers changed')
rendered=rendered.replace('<section class="scenario"',task_list_html+'<section class="scenario"',1)
nav='<a href="#task-list" class="task-list-link">فهرست عنوان و توضیح برای تسک</a>'+''.join('<a href="#'+ident+'" class="'+('video-link' if video else '')+'">'+inline(title)+'</a>' for ident,title,video in toc)
html_doc='''<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>راهنمای اجرایی تولید ویدیوهای آموزشی فارو</title>
<style>
.app-tabs{display:flex;gap:8px}.app-tab{font:inherit;cursor:pointer;background:#eef1f6;border:1px solid #cbd3df;border-radius:7px;padding:7px 16px}.app-tab.active{background:#234b8a;color:#fff;border-color:#234b8a}.app-panel[hidden]{display:none}.hesabro-nav{margin-top:20px;border-top:1px solid #dde1e8;padding-top:12px}.hesabro-nav strong{display:block;padding:5px 12px}.h1-scenario{border:1px solid #dfe3e9;border-radius:8px;padding:16px 20px;margin:22px 0}.h1-scenario h2{margin-top:4px}.h1-scenario li{margin:8px 0}.h1-scenario details{font-size:13px}.copy-h1-task-list{font:inherit;cursor:pointer;color:#fff;background:#234b8a;border:1px solid #234b8a;border-radius:6px;padding:8px 16px}
@font-face{font-family:Faro;src:url('../../assets/fonts/IRANYekanX/IRANYekanXVFaNumVF.ttf')}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:100px}body{margin:0;background:#f4f5f7;color:#20232b;font-family:Faro,'Segoe UI',Tahoma,sans-serif;line-height:1.95;font-size:15px}.toolbar{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:15px 26px;background:#fff;border-bottom:1px solid #dde1e8}.toolbar strong{font-size:18px}.toolbar input{font:inherit;min-width:250px;flex:1;max-width:520px;border:1px solid #b9c0cb;border-radius:7px;padding:9px 12px}.toolbar button{font:inherit;cursor:pointer;background:#fff;border:1px solid #b9c0cb;border-radius:6px;padding:8px 14px}.layout{display:grid;grid-template-columns:270px minmax(0,1fr);gap:24px;max-width:1800px;margin:auto;padding:24px}aside{position:sticky;top:110px;height:calc(100vh - 135px);overflow:auto;padding:8px 0 24px}aside a{display:block;text-decoration:none;color:#313b4f;padding:5px 12px;border-radius:5px;font-size:13px}aside a:hover{background:#e4e9f2}aside .video-link{border-right:2px solid #b0bdd5;margin:3px 0}main{min-width:0;background:#fff;padding:30px 36px;border:1px solid #e1e5eb;border-radius:8px}h1{font-size:29px;line-height:1.7;margin:0 0 22px;color:#111}h2{font-size:23px;line-height:1.7;margin:48px 0 16px;border-top:1px solid #dfe3e9;padding-top:24px;color:#111}h3{font-size:18px;margin:27px 0 12px;color:#111}p{margin:12px 0 18px}a{color:#234b8a;overflow-wrap:anywhere}code{font-family:Consolas,monospace;font-size:.9em;unicode-bidi:isolate;background:#f4f5f8;padding:1px 4px;border-radius:3px}.table-scroll{overflow-x:auto;margin:18px 0 28px;max-width:100%;border:1px solid #d4dbe5;border-radius:5px}table{border-collapse:collapse;width:100%;font-size:13px;line-height:1.85}th,td{border:1px solid #d9dfe7;padding:11px 13px;text-align:right;vertical-align:top;min-width:90px;overflow-wrap:anywhere}th{background:#e7edf5;font-weight:700;color:#141e2f}tr:nth-child(even) td{background:#fafbfd}.wide table{min-width:1800px}.wide th:nth-child(1),.wide td:nth-child(1){min-width:100px;width:105px}.wide td{min-width:170px}.normal td:first-child{width:23%;min-width:135px}ul.checks{padding:0;list-style:none}ul.checks li{margin:10px 0}section.scenario{padding-bottom:25px}.badge{color:#596778;font-size:13px}#status{font-size:13px;color:#596778}.hidden{display:none!important}.muted{color:#596778}@media(max-width:1000px){.layout{grid-template-columns:1fr;padding:10px}aside{position:static;height:220px;border-bottom:1px solid #ddd}main{padding:20px}h1{font-size:24px}.toolbar{padding:12px}.toolbar strong{font-size:15px}}@media print{.toolbar,aside{display:none}.layout{display:block;padding:0}main{border:0;padding:0}body{background:#fff;font-size:11pt}.table-scroll{overflow:visible;border:0}.wide table{min-width:0;font-size:7pt}.wide td,.wide th{min-width:0;padding:4px;word-break:break-word}h2,h3{break-after:avoid}tr{break-inside:avoid}a{color:#000;text-decoration:none}section.scenario{break-before:page}h2{margin-top:12px} @page{size:A3 landscape;margin:15mm}}
</style></head><body><header class="toolbar"><strong>راهنمای تولید ویدیو</strong><div class="app-tabs" role="tablist" aria-label="انتخاب محصول"><button class="app-tab active" id="tab-faro" role="tab" aria-selected="true" aria-controls="panel-faro" data-app="faro">فارو</button><button class="app-tab" id="tab-hesabro" role="tab" aria-selected="false" aria-controls="panel-hesabro" data-app="hesabro">حسابرو وان</button></div><input id="find" type="search" aria-label="فیلتر سناریوها" placeholder="جست‌وجو در سناریوها با عنوان یا متن…"><button id="clear" type="button">نمایش همه</button><span id="status">۴۲ سناریو</span><span class="badge">نسخه 0.1.3+13 · مبنای کد 4086c13d</span></header><div class="layout"><aside aria-label="فهرست سند"><div class="faro-nav">'''+nav+'''</div><div class="hesabro-nav hidden"><strong>حسابرو وان</strong><a href="#h1-task-list">فهرست عنوان و توضیح برای تسک</a>'''+''.join('<a class="video-link" href="#'+s[0].lower()+'">'+s[0]+' '+inline(s[1])+'</a>' for s in HESABRO_SCENARIOS)+'''</div></aside><main><div id="panel-faro" class="app-panel active">'''+rendered+'''</div><div id="panel-hesabro" class="app-panel" hidden><h1>حسابرو وان — سناریوهای ویدیوی آموزشی</h1><p class="muted">ممیزی فرانت production در کامیت '''+frontend_commit+'''؛ '''+str(len(HESABRO_SCENARIOS))+''' ویدیو. سناریوها بر پایهٔ مسیرها و کنترل‌های موجود در سورس نوشته شده‌اند و نتیجهٔ تعاملی باید در محیط آموزشی تأیید شود.</p>'''+h1_rendered+'''</div></main></div><script>
const input=document.getElementById('find');const links=[...document.querySelectorAll('.video-link')];let activeApp='faro';function activePanel(){return document.getElementById(activeApp==='faro'?'panel-faro':'panel-hesabro')}document.querySelectorAll('.app-tab').forEach(tab=>tab.addEventListener('click',()=>{activeApp=tab.dataset.app;document.querySelectorAll('.app-tab').forEach(x=>{const on=x===tab;x.classList.toggle('active',on);x.setAttribute('aria-selected',String(on))});document.querySelectorAll('.app-panel').forEach(x=>{x.hidden=x.id!==(activeApp==='faro'?'panel-faro':'panel-hesabro');x.classList.toggle('active',!x.hidden)});document.querySelectorAll('.hesabro-nav').forEach(x=>x.classList.toggle('hidden',activeApp!=='hesabro'));document.querySelectorAll('.faro-nav').forEach(x=>x.classList.toggle('hidden',activeApp!=='faro'));filter()}));function currentSections(){return [...activePanel().querySelectorAll('.scenario')]}
function norm(t){return t.replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/\u200c/g,' ').toLowerCase().trim()}
function filter(){const query=norm(input.value);const sections=currentSections();let count=0;sections.forEach(section=>{const show=!query||norm(section.textContent).includes(query);section.classList.toggle('hidden',!show);if(show)count++});links.forEach(link=>{const heading=document.querySelector(link.getAttribute('href'));const navApp=link.closest('.hesabro-nav')?'hesabro':'faro';link.classList.toggle('hidden',navApp!==activeApp||!!heading&&heading.closest('.scenario').classList.contains('hidden'))});document.getElementById('status').textContent=count+' سناریو از '+sections.length}
input.addEventListener('input',filter);document.getElementById('clear').addEventListener('click',()=>{input.value='';filter()});filter();filter();filter();filter();filter();filter();filter();filter();filter();filter();filter();filter();filter();
async function copyText(text){if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return}const area=document.createElement('textarea');area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();const ok=document.execCommand('copy');area.remove();if(!ok)throw new Error('copy failed')}
document.querySelectorAll('.copy-narration').forEach(button=>button.addEventListener('click',async()=>{const status=button.parentElement.querySelector('.copy-status');try{await copyText(button.dataset.script);status.textContent='نریشن کامل کپی شد.';button.textContent='کپی شد';setTimeout(()=>{button.textContent='کپی متن نریشن';status.textContent=''},2200)}catch(error){status.textContent='کپی خودکار انجام نشد؛ متن بخش E را دستی انتخاب کنید.'}}));
const h1TaskButton=document.querySelector('.copy-h1-task-list');h1TaskButton.addEventListener('click',async()=>{const status=document.querySelector('.h1-task-copy-status');try{await copyText(h1TaskButton.dataset.copyText);status.textContent='فهرست حسابرو وان کپی شد.'}catch(error){status.textContent='کپی خودکار انجام نشد؛ جدول را دستی انتخاب کنید.'}});const taskListButton=document.querySelector('.copy-task-list');taskListButton.addEventListener('click',async()=>{const status=document.querySelector('.task-list-copy-status');try{await copyText(taskListButton.dataset.copyText);status.textContent='فهرست ۴۲ ویدیو کپی شد.';taskListButton.textContent='فهرست کپی شد';setTimeout(()=>{taskListButton.textContent='کپی همهٔ عنوان‌ها و توضیحات';status.textContent=''},2200)}catch(error){status.textContent='کپی خودکار انجام نشد؛ متن جدول را دستی انتخاب کنید.'}});
</script></body></html>'''
font_data=base64.b64encode((ROOT/'assets/fonts/IRANYekanX/IRANYekanXVFaNumVF.ttf').read_bytes()).decode('ascii')
html_doc=html_doc.replace("url('../../assets/fonts/IRANYekanX/IRANYekanXVFaNumVF.ttf')", "url('data:font/ttf;base64,"+font_data+"')")
html_doc=html_doc.replace('</style>', '''
@media screen and (max-width:1600px){.steps{border:0;overflow:visible}.steps table,.steps tbody{display:block;min-width:0;width:100%}.steps thead{display:none}.steps tr{display:grid;grid-template-columns:1fr 1fr;border:1px solid #d9dfe7;border-radius:6px;margin:16px 0;overflow:hidden}.steps td,.steps th,.steps td:nth-child(1){display:block;min-width:0;width:auto;border:0;border-bottom:1px solid #e1e5eb;padding:12px 16px;background:#fff}.steps td:first-child{grid-column:1/-1;background:#e7edf5;font-weight:700}.steps td::before{content:attr(data-label);display:block;color:#596778;font-size:11px;margin-bottom:4px;font-weight:600}.steps td:nth-child(even){border-left:1px solid #e1e5eb}}
@media screen and (max-width:650px){.steps tr{grid-template-columns:1fr}.steps td{grid-column:1/-1}}
</style>''')
html_doc=html_doc.replace('scroll-behavior:smooth','scroll-behavior:auto')
html_doc=html_doc.replace('</style>', '.narration-tools{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:12px 0 18px}.copy-narration{font:inherit;cursor:pointer;color:#fff;background:#234b8a;border:1px solid #234b8a;border-radius:6px;padding:8px 16px}.copy-narration:hover{background:#173969}.copy-status{font-size:13px;color:#216e39}.quick{background:#f6f8fb}.quick table{min-width:0}.quick th,.quick td{min-width:100px}.quick td:first-child{width:48px;min-width:48px}.quick td:nth-child(2){min-width:125px}.task-list-panel{margin:28px 0 50px;padding:18px 22px;background:#f7f9fc;border:1px solid #d9e0ea;border-radius:8px}.task-list-panel h2{margin-top:4px;border-top:0;padding-top:0}.task-list-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:14px 0}.copy-task-list{font:inherit;cursor:pointer;color:#fff;background:#234b8a;border:1px solid #234b8a;border-radius:6px;padding:8px 16px}.copy-task-list:hover{background:#173969}.task-list-copy-status{font-size:13px;color:#216e39}.task-list-table table{min-width:760px}.task-list-table td:first-child{min-width:70px;width:80px}.task-list-table td:nth-child(2){min-width:270px}.task-list-table td:nth-child(3){min-width:330px}.task-list-link{font-weight:700;border-right:3px solid #234b8a;margin-bottom:10px!important}</style>',1)
(OUT / 'FARO_VIDEO_PRODUCTION_HANDBOOK_FA.html').write_text(html_doc,encoding='utf-8')

# Translation use catalogue: candidates, not an assertion of reachable features.
controls=[]
unresolved=[]
for path in sorted((ROOT/'lib').rglob('*.dart')):
    for line_number,line in enumerate(path.read_text(encoding='utf-8').splitlines(),1):
        for key in re.findall(r"['\"]([a-z_]+(?:\.[a-z0-9_]+)+)['\"]",line):
            try:value=loc(key)
            except (KeyError,TypeError,AssertionError):continue
            controls.append([path.relative_to(ROOT).as_posix(),line_number,key,value])
write_csv('ui-controls.csv',['فایل','خط','کلید ترجمه','متن فارسی'],controls)
write_csv('source-evidence.csv',['شاهد','فایل','خط','لنگر','SHA256'],[[alias,v['path'],v['line'],v['marker'],v['sha256']] for alias,v in SOURCE_REFS.items()])
write_csv('recording-verification.csv',
    ['شناسه','عنوان','وضعیت','تاریخ آزمون','آزمونگر','نسخه و کامیت اجراشده','فضای آموزشی و شناسه غیرمحرمانه رکورد','نقش و مجوز واقعی','متغیرهای اجباری پیش از ضبط','نتیجه واقعی و تفاوت با سند','شاهد اجرای واقعی','تصمیم آماده یا متوقف'],
    [[s['id'],s['title'],'در انتظار اجرای آزمایشی','','','','','',
      ('نام مدل مبدأ و مقصد' if s['id']=='V13' else 'نام دکمه و رابط چاپ سیستم' if s['id']=='V35' else 'دامنه واقعی پایگاه دانش و رفع ناسازگاری UI با API' if s['id']=='V42' else 'شناسه‌های واقعی رکورد و تاریخ روز ضبط در صورت نیاز'),
      '','',''] for s in SCENARIOS])
write_csv('narration-timing.csv',['شناسه','مدت هدف','هوک','معرفی','عملی','نتیجه','پایان','واژه','واژه بر ثانیه','آزمون خوانش واقعی'],
    [[s['id'],s['duration'],timings(s)[0],timings(s)[1],sum(timings(s)[4]),timings(s)[2],timings(s)[3],word_counts[s['id']],round(word_counts[s['id']]/s['duration'],2),'انجام نشده'] for s in SCENARIOS])

assets=OUT/'assets'
assets.mkdir(exist_ok=True)
(assets/'sample-brief.txt').write_text('برنامه نمونه تولید آموزش فارو\nهدف: تهیه یک ویدیوی کوتاه درباره شروع کار\nاقدام اول: آماده‌سازی حساب‌ها و داده‌های آموزشی\nاقدام دوم: ضبط کلیک‌ها و نمایش نتیجه واقعی\nاقدام سوم: بازبینی نریشن و تدوین نهایی\nتمام نام‌ها و اطلاعات این فایل نمونه آموزشی هستند.\n',encoding='utf-8')

checks=[]
def check(name,value):
    checks.append(dict(check=name,passed=bool(value)))
    assert value,name
check('حداقل پانزده سناریوی مستقل',len(SCENARIOS)>=15)
check('فهرست سناریوهای حسابرو وان با شناسه یکتا',len(HESABRO_SCENARIOS)>=20 and len({s[0] for s in HESABRO_SCENARIOS})==len(HESABRO_SCENARIOS))
check('همه شواهد حسابرو وان به فایل موجود وصل هستند',all((frontend_root/'src'/(s[4] if s[4].startswith('components/') else 'views/'+s[4])).is_file() for s in HESABRO_SCENARIOS))
check('شناسه یکتای سناریوها',len({s['id'] for s in SCENARIOS})==len(SCENARIOS))
check('شناسه یکتای قابلیت‌ها',len({r[0] for r in feature_rows})==len(feature_rows))
check('شاهد معتبر فایل و خط برای تمام سناریوها',all(s['sources'] for s in SCENARIOS))
check('ساختار A تا G برای همه سناریوها',all(all(f'### {letter} ' in scenario_markdown(s)[0] for letter in 'ABCDEFG') for s in SCENARIOS))
check('جمع مدت بخش‌ها برابر مدت هدف',all(sum(timings(s)[:4])+sum(timings(s)[4])==s['duration'] for s in SCENARIOS))
check('زمان مثبت تمام مرحله‌ها',all(all(x>0 for x in timings(s)[4]) for s in SCENARIOS))
check('هوک‌های غیرتکراری',len({s['hook'] for s in SCENARIOS})==len(SCENARIOS))
check('برآورد نریشن حداکثر ۲٫۷ واژه در ثانیه',all(word_counts[s['id']]/s['duration']<=2.7 for s in SCENARIOS))
check('بدون placeholder تولید سند',not re.search(r'\{\{[^}]+\}\}',report))
check('تعداد بخش‌های HTML برابر سناریوها',html_doc.count('class="scenario"')==len(SCENARIOS))
check('تب، سناریوها و دکمهٔ کپی حسابرو وان در HTML',html_doc.count('class="scenario h1-scenario"')==len(HESABRO_SCENARIOS) and 'tab-hesabro' in html_doc and 'copy-h1-task-list' in html_doc)
check('بدون منبع راه دور در HTML',not re.search(r'(?:src|href)=[\"\']https?://',html_doc))
check('عناوین ستون جدول مرحله‌ها',all(len(row)==7 for s in SCENARIOS for row in s['steps']))
check('کپی نریشن همه ویدیوها',html_doc.count('class="copy-narration"')==len(SCENARIOS)+len(HESABRO_SCENARIOS))
check('فهرست کپی عنوان و توضیح همه ویدیوها',html_doc.count('class="task-list-row"')==len(SCENARIOS) and html_doc.count('class="copy-task-list"')==1 and 'copyTaskList' not in html_doc and 'copy-task-list' in html_doc)
check('کپی فهرست به کلیپ‌بورد', 'taskListButton.dataset.copyText' in html_doc and 'navigator.clipboard.writeText' in html_doc)
check('راهنمای ساده همه ویدیوها',html_doc.count('class="table-scroll quick steps"')==len(SCENARIOS))
check('کپی در فایل محلی', 'navigator.clipboard.writeText' in html_doc and "document.execCommand('copy')" in html_doc)
check('فایل نمونه کوچک و در حد نامه',0<(assets/'sample-brief.txt').stat().st_size<100*1024*1024)
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
summary=dict(date='2026-10-25',version='0.1.3+13',commit=commit,scenario_count=len(SCENARIOS),hesabro_one_scenario_count=len(HESABRO_SCENARIOS),hesabro_one_frontend_commit=frontend_commit,total_video_count=len(SCENARIOS)+len(HESABRO_SCENARIOS),
    feature_count=len(feature_rows),source_anchor_count=len(SOURCE_REFS),ui_control_occurrences=len(controls),
    recording_seconds=sum(s['duration'] for s in SCENARIOS),runtime_ui_tested=False,repo_tests_run=False,
    checks=checks,counts_by_module=dict(Counter(s['module'] for s in SCENARIOS)))
(OUT/'validation-report.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'evidence-index.json').write_text(json.dumps(SOURCE_REFS,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k not in ['checks','counts_by_module']},ensure_ascii=False,indent=2))
print('All',len(checks),'document checks passed. Runtime UI is NOT tested.')
with zipfile.ZipFile(OUT/'FARO_TRAINING_PRODUCTION_PACKAGE.zip','w',zipfile.ZIP_DEFLATED) as bundle:
    for item in sorted(OUT.rglob('*')):
        if item.is_file() and item.name != 'FARO_TRAINING_PRODUCTION_PACKAGE.zip' and '__pycache__' not in item.parts:
            bundle.write(item,Path('faro-training')/item.relative_to(OUT))
print('Updated production package archive.')
