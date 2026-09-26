import streamlit as st
import pandas as pd
import time
import os
import sys

# Ensure current directory is on sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from config import (
    DEFAULT_REPORT_FILE, FARO_BASE_URL, FARO_SESSION_COOKIE,
    FARO_CSRF_TOKEN, FARO_AUTH_TOKEN
)
from core.parser import ReportParser
from core.faro_client import FaroClient
from core.state_manager import StateManager
from core.sync_engine import SyncEngine

# Streamlit page setup
st.set_page_config(
    page_title="ربات ثبت خودکار گزارش کار فارو",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom RTL styling
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
    
    html, body, [class*="css"], [class*="st-"] {
        font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif !important;
        direction: rtl;
        text-align: right;
    }
    
    .stMetric {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 12px 16px;
    }
    .metric-card {
        padding: 14px 18px;
        border-radius: 12px;
        color: #fff;
        margin-bottom: 10px;
    }
    .metric-total { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
    .metric-pending { background: linear-gradient(135deg, #10b981, #047857); }
    .metric-duplicate { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .metric-other { background: linear-gradient(135deg, #64748b, #475569); }
    
    .stAlert {
        direction: rtl;
        text-align: right;
    }
    
    .badge-tag {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 9999px;
        font-size: 0.82rem;
        font-weight: 500;
    }
    .badge-pending { background-color: #d1fae5; color: #065f46; }
    .badge-duplicate { background-color: #fef3c7; color: #92400e; }
    .badge-synced { background-color: #dbeafe; color: #1e40af; }
</style>
""", unsafe_allow_html=True)

# Initialize Session State
if "state_manager" not in st.session_state:
    st.session_state.state_manager = StateManager(os.path.join(CURRENT_DIR, "sync_state.db"))
if "all_tasks" not in st.session_state:
    st.session_state.all_tasks = []
if "faro_boards" not in st.session_state:
    st.session_state.faro_boards = []
if "faro_columns" not in st.session_state:
    st.session_state.faro_columns = []
if "connection_tested" not in st.session_state:
    st.session_state.connection_tested = False
if "connection_valid" not in st.session_state:
    st.session_state.connection_valid = False

# Load Report File
report_file_path = DEFAULT_REPORT_FILE
if not os.path.exists(report_file_path):
    # Try alternative relative path
    alt_path = os.path.abspath(os.path.join(CURRENT_DIR, "project-report.md"))
    if os.path.exists(alt_path):
        report_file_path = alt_path

if not st.session_state.all_tasks and os.path.exists(report_file_path):
    parser = ReportParser(report_file_path)
    st.session_state.all_tasks = parser.parse()

# ----------------- SIDEBAR: Faro Connection & Settings -----------------
with st.sidebar:
    st.title("⚙️ تنظیمات اتصال فارو")
    st.markdown("مشخصات اتصال به API پلتفرم فارو (`tasks.md`)")

    base_url = st.text_input(
        "آدرس سرور فارو (Base URL)", 
        value=FARO_BASE_URL,
        placeholder="https://faro.ir",
        help="آدرس اصلی سرور فارو بدون نیاز به /api/v1 (پیشوند /api/v1 طبق مستندات tasks.md به صورت خودکار به اندپوینت‌ها متصل می‌شود)."
    )
    session_cookie = st.text_input(
        "کوکی نشست (sessionid یا کل رشته Cookie)", 
        value=FARO_SESSION_COOKIE, 
        type="password", 
        help="می‌توانید فقط مقدار sessionid را وارد کنید یا کل رشته هدر Cookie را از تب Network مرورگر کپی و اینجا پیست کنید."
    )
    csrf_token = st.text_input(
        "توکن CSRF (csrftoken)", 
        value=FARO_CSRF_TOKEN, 
        type="password",
        help="مقدار csrftoken جهت متدهای POST (در صورت کپی کردن کل رشته کوکی، خودکار استخراج می‌شود)"
    )
    auth_token = st.text_input(
        "توکن احراز هویت / Bearer Token (در صورت وجود)", 
        value=FARO_AUTH_TOKEN, 
        type="password",
        help="اگر سامانه از JWT یا Bearer token استفاده می‌کند، آن را اینجا وارد کنید."
    )

    with st.expander("❓ راهنمای کپی سریع کوکی / توکن از مرورگر"):
        st.markdown("""
        **مطمئن‌ترین روش:**
        1. در مرورگر وارد حساب فارو شوید و به صفحه تسک‌ها بروید.
        2. کلید `F12` را بزنید و به تب **Network** بروید.
        3. صفحه را یک‌بار رفرش (`F5`) کنید.
        4. روی یکی از درخواست‌های لیست (مثل `boards` یا `tasks` یا هر درخواست دیگر) کلیک کنید.
        5. در تب **Headers**، به بخش **Request Headers** بروید:
           - مقدار هدر **`Cookie:`** را کامل کپی کرده و در فیلد کوکی بالا پیست کنید.
           - یا اگر هدر **`Authorization:`** وجود دارد، مقدار توکن آن را در فیلد توکن وارد نمایید.
        """)

    faro_client = FaroClient(
        base_url=base_url,
        session_cookie=session_cookie,
        csrf_token=csrf_token,
        auth_token=auth_token
    )

    col_conn1, col_conn2 = st.columns(2)
    with col_conn1:
        if st.button("🔌 تست اتصال", use_container_width=True):
            with st.spinner("در حال ارتباط با فارو..."):
                conn_res = faro_client.check_connection()
                st.session_state.connection_tested = True
                if conn_res["success"]:
                    st.session_state.connection_valid = True
                    st.session_state.faro_boards = faro_client.get_boards()
                    st.success(f"اتصال برقرار شد! ({conn_res.get('boards_count', 0)} بورد)")
                else:
                    st.session_state.connection_valid = False
                    st.error(conn_res["message"])

    with col_conn2:
        if st.button("🔄 تازه‌سازی", use_container_width=True):
            if st.session_state.connection_valid:
                st.session_state.faro_boards = faro_client.get_boards()
                st.info("لیست بوردها به‌روز شد.")
            else:
                st.warning("ابتدا اتصال را برقرار کنید.")

    st.divider()

    # Board and Column Selector
    selected_board_id = None
    selected_column_id = None

    if st.session_state.faro_boards:
        board_options = {b.get("name") or b.get("title") or f"بورد #{b.get('id')}": str(b.get("id")) 
                         for b in st.session_state.faro_boards}
        selected_board_name = st.selectbox("بورد مقصد در فارو:", list(board_options.keys()))
        selected_board_id = board_options.get(selected_board_name)

        if selected_board_id:
            cols = faro_client.get_board_columns(selected_board_id)
            if cols:
                col_options = {"(پیش‌فرض سیستم)": None}
                col_options.update({c.get("name") or c.get("title") or f"ستون #{c.get('id')}": str(c.get("id")) 
                                   for c in cols})
                selected_col_name = st.selectbox("ستون کانبان پیش‌فرض:", list(col_options.keys()))
                selected_column_id = col_options.get(selected_col_name)
    else:
        st.caption("ℹ️ در صورت عدم انتخاب بورد، تسک‌ها به صورت عمومی در `/api/v1/tasks/items/` ثبت خواهند شد.")

    st.divider()
    st.markdown("#### 📂 فایل منبع گزارش")
    st.caption(f"`{os.path.basename(report_file_path)}` ({len(st.session_state.all_tasks)} تسک بارگذاری شده)")
    
    if st.button("🧹 پاکسازی تاریخچه محلی سینک", help="ریست کردن دیتابیس ثبت‌های قبلی"):
        st.session_state.state_manager.clear_all()
        st.success("تاریخچه محلی ریست شد.")
        st.rerun()

# ----------------- MAIN CONTENT AREA -----------------
st.title("🤖 ربات خودکار ثبت گزارش کارها در فارو")
st.markdown("استخراج هوشمند از `project-report.md`، بررسی تکرارها از روی سامانه فارو و ثبت بر اساس روزهای انتخابی")

# Initialize Engine
sync_engine = SyncEngine(
    faro_client=faro_client if (st.session_state.connection_valid or session_cookie or auth_token) else None,
    state_manager=st.session_state.state_manager
)

# Extract unique dates
all_dates = sorted(list({t["date"] for t in st.session_state.all_tasks}), reverse=True)

# ----------------- SECTION 1: Date Filter Selection -----------------
st.subheader("📅 مرحله ۱: انتخاب روزهای کاری جهت ورود به فارو")

date_counts = {}
for t in st.session_state.all_tasks:
    date_counts[t["date"]] = date_counts.get(t["date"], 0) + 1

formatted_date_options = {d: f"{d} ({date_counts.get(d, 0)} گزارش)" for d in all_dates}

col_date_btn1, col_date_btn2, col_date_info = st.columns([1, 1, 3])
with col_date_btn1:
    select_all = st.button("انتخاب همه روزها", use_container_width=True)
with col_date_btn2:
    deselect_all = st.button("لغو انتخاب همه", use_container_width=True)

if "selected_dates_state" not in st.session_state:
    # Default to the most recent date
    st.session_state.selected_dates_state = [all_dates[0]] if all_dates else []

if select_all:
    st.session_state.selected_dates_state = all_dates
if deselect_all:
    st.session_state.selected_dates_state = []

selected_dates = st.multiselect(
    "روزهایی که می‌خواهید تسک‌های آن‌ها در فارو ثبت شود را انتخاب کنید:",
    options=all_dates,
    default=st.session_state.selected_dates_state,
    format_func=lambda d: formatted_date_options.get(d, d)
)
st.session_state.selected_dates_state = selected_dates

# Analyze tasks based on selected dates and Faro duplicates
with st.spinner("در حال بررسی تسک‌ها و تطبیق تکرارها با فارو..."):
    analysis = sync_engine.analyze_tasks(
        all_tasks=st.session_state.all_tasks,
        selected_dates=selected_dates,
        board_id=selected_board_id
    )

pending_tasks = analysis["pending_tasks"]
duplicate_tasks = analysis["duplicate_tasks"]
other_date_tasks = analysis["other_date_tasks"]

# ----------------- METRIC CARDS -----------------
st.divider()
st.subheader("📊 آمار و وضعیت تطبیق گزارش‌ها")

m_col1, m_col2, m_col3, m_col4 = st.columns(4)
with m_col1:
    st.markdown(f"""
    <div class="metric-card metric-total">
        <div style="font-size: 0.9rem; opacity: 0.9;">کل گزارش‌های فایل</div>
        <div style="font-size: 2rem; font-weight: 700;">{len(st.session_state.all_tasks)}</div>
    </div>
    """, unsafe_allow_html=True)

with m_col2:
    st.markdown(f"""
    <div class="metric-card metric-pending">
        <div style="font-size: 0.9rem; opacity: 0.9;">آماده ثبت (جدید در روزهای انتخابی)</div>
        <div style="font-size: 2rem; font-weight: 700;">{len(pending_tasks)}</div>
    </div>
    """, unsafe_allow_html=True)

with m_col3:
    st.markdown(f"""
    <div class="metric-card metric-duplicate">
        <div style="font-size: 0.9rem; opacity: 0.9;">موجود / تکراری در فارو</div>
        <div style="font-size: 2rem; font-weight: 700;">{len(duplicate_tasks)}</div>
    </div>
    """, unsafe_allow_html=True)

with m_col4:
    st.markdown(f"""
    <div class="metric-card metric-other">
        <div style="font-size: 0.9rem; opacity: 0.9;">سایر روزها (خارج از فیلتر)</div>
        <div style="font-size: 2rem; font-weight: 700;">{len(other_date_tasks)}</div>
    </div>
    """, unsafe_allow_html=True)

if not selected_dates:
    st.warning("⚠️ هیچ روزی انتخاب نشده است. لطفاً حداقل یک روز را از منوی بالا انتخاب کنید.")

# ----------------- TABS: List, Duplicates, and Bot Execution -----------------
tab_pending, tab_duplicates, tab_runner = st.tabs([
    f"📋 گزارش‌های آماده ثبت ({len(pending_tasks)})",
    f"⚠️ موارد تکراری و ثبت‌شده در فارو ({len(duplicate_tasks)})",
    "🚀 پنل اجرای خودکار ربات"
])

# TAB 1: PENDING TASKS
with tab_pending:
    st.markdown("##### تسک‌هایی که در فارو ثبت نشده‌اند و با روزهای انتخابی مطابقت دارند:")
    if pending_tasks:
        for idx, task in enumerate(pending_tasks):
            with st.expander(f"📌 [{task['date']}] {task['title']}"):
                col_t1, col_t2 = st.columns([4, 1])
                with col_t1:
                    st.markdown(f"**وضعیت:** {task['status']} | **زمان ثبت:** {task['time']}")
                    st.markdown(f"**توضیحات:**\n{task['description']}")
                with col_t2:
                    if st.button("ثبت تکی در فارو", key=f"single_sync_{task['hash']}"):
                        with st.spinner("در حال ثبت تسک..."):
                            sync_res = sync_engine.sync_single_task(
                                task=task,
                                board_id=selected_board_id,
                                column_id=selected_column_id,
                                dry_run=False
                            )
                            if sync_res["success"]:
                                st.success(sync_res["message"])
                                time.sleep(1)
                                st.rerun()
                            else:
                                st.error(sync_res["message"])
    else:
        st.info("هیچ تسک ثبت‌نشده‌ای برای روزهای انتخابی وجود ندارد.")

# TAB 2: DUPLICATES / EXISTING TASKS
with tab_duplicates:
    st.markdown("##### این موارد قبلاً در فارو ثبت شده‌اند و جهت جلوگیری از تکرار فیلتر شدند:")
    if duplicate_tasks:
        for task in duplicate_tasks:
            src = task.get("duplicate_source", "فارو")
            fid = task.get("faro_task_id")
            fid_text = f" (شناسه در فارو: {fid})" if fid else ""
            with st.expander(f"🔒 [{task['date']}] {task['title']} — [منبع تشخیص: {src}{fid_text}]"):
                st.markdown(f"**وضعیت:** {task['status']} | **زمان ثبت:** {task['time']}")
                st.markdown(f"**توضیحات:**\n{task['description']}")
    else:
        st.success("هیچ مورد تکراری برای روزهای انتخابی یافت نشد.")

# TAB 3: BOT RUNNER
with tab_runner:
    st.subheader("⚡ اجرای ربات ثبت خودکار")
    st.markdown("""
    ربات تسک‌های آماده را یکی پس از دیگری در فارو ثبت می‌کند.
    شما می‌توانید ابتدا حالت **اجرای تستی (Dry Run)** را فعال کنید تا عملکرد آن را بدون تغییر در فارو مشاهده نمایید.
    """)

    col_r1, col_r2 = st.columns(2)
    with col_r1:
        dry_run_mode = st.checkbox("آزمایشی (Dry Run) — بدون ایجاد تسک واقعی در فارو", value=False)
    with col_r2:
        delay_seconds = st.slider("تاخیر بین هر درخواست (ثانیه):", min_value=0.1, max_value=3.0, value=0.5, step=0.1,
                                 help="جهت رعایت محدودیت نرخ (Rate Limit) سرور فارو")

    if len(pending_tasks) == 0:
        st.info("تسک آماده‌ای برای ثبت وجود ندارد.")
    else:
        btn_label = f"🚀 شروع ثبت خودکار {len(pending_tasks)} تسک در فارو"
        if dry_run_mode:
            btn_label = f"🧪 اجرای تستی برای {len(pending_tasks)} تسک (بدون تغییر در فارو)"

        start_bot = st.button(btn_label, type="primary", use_container_width=True)

        if start_bot:
            st.divider()
            progress_bar = st.progress(0.0)
            status_text = st.empty()
            log_container = st.container(height=320)

            success_count = 0
            fail_count = 0

            for i, task in enumerate(pending_tasks):
                percent = (i + 1) / len(pending_tasks)
                progress_bar.progress(percent)
                status_text.markdown(f"**در حال پردازش ({i+1} از {len(pending_tasks)}):** {task['title'][:50]}...")

                res = sync_engine.sync_single_task(
                    task=task,
                    board_id=selected_board_id,
                    column_id=selected_column_id,
                    dry_run=dry_run_mode
                )

                with log_container:
                    if res["success"]:
                        success_count += 1
                        st.markdown(f"✅ **[{task['date']}]** `{task['title']}` — {res['message']}")
                    else:
                        fail_count += 1
                        st.markdown(f"❌ **[{task['date']}]** `{task['title']}` — {res['message']}")

                time.sleep(delay_seconds)

            progress_bar.progress(1.0)
            status_text.empty()

            if fail_count == 0:
                st.balloons()
                st.success(f"🎉 عملیات با موفقیت به پایان رسید! {success_count} تسک با موفقیت پردازش شد.")
            else:
                st.warning(f"عملیات به پایان رسید: {success_count} تسک موفق و {fail_count} تسک با خطا مواجه شد.")
