@echo off
REM Hesabro-one local dev runner (no Docker) — wrapper for dev-local.ps1
REM Usage: dev-local.bat [-Stop] | dev-local.bat -BackendPort 8000 -FrontendPort 8080
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0dev-local.ps1" %*
