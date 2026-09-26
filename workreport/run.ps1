Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  ربات خودکار ثبت گزارش کار در فارو (Streamlit)" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

# Check if streamlit is available
$streamlit = Get-Command streamlit -ErrorAction SilentlyContinue
if (-not $streamlit) {
    Write-Host "[INFO] در حال نصب نیازمندی‌های پروژه..." -ForegroundColor Yellow
    python -m pip install -r requirements.txt
}

Write-Host "[INFO] در حال اجرای رابط کاربری Streamlit..." -ForegroundColor Green
streamlit run app.py
