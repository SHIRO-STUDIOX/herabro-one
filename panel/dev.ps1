<#
.SYNOPSIS
    Hesabro Admin Backoffice Monorepo Dev Runner
.DESCRIPTION
    Runs Backend (Django :8001) and Frontend (Vite :5173) together or individually.
.EXAMPLE
    .\dev.ps1             # Runs both backend and frontend concurrently
    .\dev.ps1 -Backend    # Runs backend only
    .\dev.ps1 -Frontend   # Runs frontend only
#>

param (
    [switch]$Backend,
    [switch]$Frontend
)

$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $PSScriptRoot

$PythonExe = "$PSScriptRoot\..\hesabro-one-backend-django\.venv-local\Scripts\python.exe"
if (-not (Test-Path $PythonExe)) {
    $PythonExe = "python"
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Hesabro Admin Backoffice Monorepo Dev Environment     " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

if ($Backend -and -not $Frontend) {
    Write-Host "[Backend] Starting Django API on http://127.0.0.1:8001..." -ForegroundColor Green
    & $PythonExe backend/manage.py runserver 127.0.0.1:8001
    exit
}

if ($Frontend -and -not $Backend) {
    Write-Host "[Frontend] Starting Vite on http://127.0.0.1:5173..." -ForegroundColor Green
    Set-Location "$PSScriptRoot\frontend"
    npm run dev
    exit
}

# Run both concurrently in Windows
Write-Host "[1/2] Launching Backend (Django on :8001) in background process..." -ForegroundColor Green
$backendProc = Start-Process -FilePath $PythonExe -ArgumentList "backend\manage.py runserver 127.0.0.1:8001" -PassThru -NoNewWindow

Write-Host "[2/2] Launching Frontend (Vite on :5173)..." -ForegroundColor Green
try {
    Set-Location "$PSScriptRoot\frontend"
    npm run dev
}
finally {
    if ($backendProc -and -not $backendProc.HasExited) {
        Write-Host "Stopping backend process (PID: $($backendProc.Id))..." -ForegroundColor Yellow
        Stop-Process -Id $backendProc.Id -Force -ErrorAction SilentlyContinue
    }
}
