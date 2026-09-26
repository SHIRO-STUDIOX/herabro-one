@echo off
chcp 65001 > nul
echo ========================================================
echo   ربات خودکار ثبت گزارش کار در فارو (Streamlit)
echo ========================================================

REM Check if streamlit is installed
python -m pip show streamlit > nul 2>&1
if errorlevel 1 (
    echo [INFO] در حال نصب وابستگی‌ها...
    python -m pip install -r requirements.txt
)

echo [INFO] در حال راه‌اندازی اپلیکیشن استریم‌لیت...
streamlit run app.py

pause
