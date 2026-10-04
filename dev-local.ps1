<#
.SYNOPSIS
  Hesabro-one local dev runner — WITHOUT Docker (lightweight QC mode).
  Runs Django (SQLite + LocMemCache) and Vite (HMR) side-by-side.

.DESCRIPTION
  - Does NOT touch docker files, .env, or production settings.
  - Backend env is injected in-process only (django-environ keeps OS env
    over .env file), using a SEPARATE sqlite file: db-local.sqlite3
  - Frontend uses Vite dev + HMR; /api /admin /static /media are proxied
    to Django (see vite.config.ts proxy block).
  - Opens two new windows (backend + frontend) so logs stay visible.

.USAGE
  powershell -ExecutionPolicy Bypass -File .\dev-local.ps1
  powershell -ExecutionPolicy Bypass -File .\dev-local.ps1 -Stop   # stop both
  Or just double-click dev-local.bat

.PARAMETER BackendPort
.PARAMETER FrontendPort
.PARAMETER SkipInstall
.PARAMETER NoMigrate
.PARAMETER Stop
.PARAMETER Lan
  Exposes dev servers on the LAN (0.0.0.0) so a phone on the same
  Wi-Fi/LAN can open the Vite URL. Without -Lan everything stays on
  127.0.0.1 (loopback only, phone cannot reach it).

.USAGE-LAN
  powershell -ExecutionPolicy Bypass -File .\dev-local.ps1 -Lan
  # then on the phone (same Wi-Fi): http://<PC-LAN-IP>:8080
#>
param(
  [int]$BackendPort = 8000,
  [int]$FrontendPort = 8080,
  [switch]$SkipInstall,
  [switch]$NoMigrate,
  [switch]$Stop,
  [switch]$Lan,
  [string]$LanIp
)

$ErrorActionPreference = 'Stop'
$Root        = $PSScriptRoot
$BackendDir  = Join-Path $Root 'hesabro-one-backend-django'
$FrontendDir = Join-Path $Root 'hesabro-one-frontend-vue'
$VenvDir     = Join-Path $BackendDir '.venv-local'
$VenvPython  = Join-Path $VenvDir 'Scripts\python.exe'
$PidFile     = Join-Path $Root '.dev-local.pids.json'
$LocalDb     = Join-Path $BackendDir 'db-local.sqlite3'

function Write-Step([string]$msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }

function Get-LanIp {
  # 1. Look for active physical network adapter with default gateway (avoids VPN, vEthernet, loopback)
  try {
    $adapter = Get-NetIPConfiguration -ErrorAction SilentlyContinue |
      Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -eq 'Up' -and $_.InterfaceAlias -notmatch 'vEthernet|Virtual|VPN|Loopback|Windscribe|PPP' } |
      Select-Object -First 1
    if ($adapter -and $adapter.IPv4Address.IPAddress) {
      $candidate = $adapter.IPv4Address.IPAddress | Where-Object { $_ -notlike '127.*' -and $_ -notlike '169.254.*' } | Select-Object -First 1
      if ($candidate) { return $candidate }
    }
  } catch { }

  # 2. Instant local adapter detection via UDP routing table
  try {
    $client = [System.Net.Sockets.UdpClient]::new()
    $client.Connect('8.8.8.8', 53)
    $ip = $client.Client.LocalEndPoint.Address.ToString()
    $client.Dispose()
    if ($ip -and $ip -notlike '127.*' -and $ip -notlike '169.254.*' -and $ip -notlike '10.*') {
      return $ip
    }
  } catch { }

  # 3. Fallback to local host entry resolution
  try {
    $ips = [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) |
      Where-Object { $_.AddressFamily -eq 'InterNetwork' } |
      ForEach-Object { $_.IPAddressToString } |
      Where-Object { $_ -notlike '127.*' -and $_ -notlike '169.254.*' -and $_ -notlike '192.168.160.*' }
    if ($ips) { return $ips[0] }
  } catch { }

  return '127.0.0.1'
}

# ── Stop mode ──────────────────────────────────────────────
if ($Stop) {
  Write-Step 'Stopping local dev processes...'
  if (Test-Path -LiteralPath $PidFile) {
    try {
      $pids = Get-Content -LiteralPath $PidFile -Raw | ConvertFrom-Json
      if ($pids.backendPort) { $BackendPort = [int]$pids.backendPort }
      if ($pids.frontendPort) { $FrontendPort = [int]$pids.frontendPort }
      foreach ($id in @($pids.backend, $pids.frontend)) {
        if ($id) { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue; Write-Host "  killed PID $id" }
      }
    } catch { Write-Warning "Could not parse $PidFile : $_" }
    Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue
  } else {
    Write-Host '  No .dev-local.pids.json found. Close the backend/frontend windows manually.'
  }
  # Fallback: kill anything remaining on dev ports using fast netstat
  try {
    $conns = netstat -ano | Select-String ":$BackendPort\s|:$FrontendPort\s"
    $portPids = @()
    foreach ($line in $conns) {
      $parts = ($line.ToString().Trim() -split '\s+')
      if ($parts.Length -ge 5 -and $parts[4] -match '^\d+$') {
        $portPids += [int]$parts[4]
      }
    }
    $portPids | Select-Object -Unique | ForEach-Object {
      if ($_ -and $_ -ne $PID -and $_ -gt 4) {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
        Write-Host "  killed process on port (PID $_)"
      }
    }
  } catch {}
  Write-Host 'Done.' -ForegroundColor Green
  return
}

# ── Preconditions ──────────────────────────────────────────
Write-Step 'Checking prerequisites'
try { $pyVer = & python --version 2>&1 } catch { throw 'python not found in PATH. Install Python 3.12/3.13.' }
try { $nodeVer = & node --version 2>&1 } catch { throw 'node not found in PATH. Install Node 22+.' }
try { & npm --version 2>&1 | Out-Null } catch { throw 'npm not found in PATH.' }
Write-Host "  $pyVer | node $nodeVer"
if (-not (Test-Path -LiteralPath $BackendDir))  { throw "Backend dir missing: $BackendDir" }
if (-not (Test-Path -LiteralPath $FrontendDir)) { throw "Frontend dir missing: $FrontendDir" }

function Test-PortAvailable([int]$port) {
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
    $listener.Start()
    $listener.Stop()
    return $true
  } catch {
    return $false
  }
}

function Find-AvailablePort([int]$startPort) {
  $p = $startPort
  while ($p -lt ($startPort + 100)) {
    if (Test-PortAvailable $p) { return $p }
    $p++
  }
  return $startPort
}

if (-not (Test-PortAvailable $BackendPort)) {
  $altPort = Find-AvailablePort $BackendPort
  Write-Warning "Port $BackendPort is not accessible (reserved by Windows/Hyper-V/WinNAT or in use)."
  Write-Host "  Automatically switched BackendPort: $BackendPort -> $altPort" -ForegroundColor Yellow
  $BackendPort = $altPort
}
if (-not (Test-PortAvailable $FrontendPort)) {
  $altPort = Find-AvailablePort $FrontendPort
  Write-Warning "Port $FrontendPort is not accessible or already in use."
  Write-Host "  Automatically switched FrontendPort: $FrontendPort -> $altPort" -ForegroundColor Yellow
  $FrontendPort = $altPort
}

# ── Local-only env (process scope, .env file untouched) ────
# NOTE: django-environ gives OS env priority over the .env file,
# so these override the docker-oriented .env (db/redis hosts).
# -Lan mode: bind 0.0.0.0 + allow the PC's LAN IP in
# ALLOWED_HOSTS / CORS / CSRF so the phone's browser is accepted.
# Phone -> Vite (LAN IP:FrontendPort) -> proxy -> Django (127.0.0.1:BackendPort)
# works because the proxy hop runs on this PC; the frontend client itself
# uses relative /api URLs (window.location.origin), so no frontend code change
# is needed.
$BindHost = '127.0.0.1'
if ($Lan -or $LanIp) {
  $Lan = $true
  if (-not $LanIp) {
    $LanIp = Get-LanIp
  }
  if (-not $LanIp) { throw 'Could not detect LAN IP. Connect to Wi-Fi/LAN and retry (or pass -LanIp manually).' }
  $BindHost = '0.0.0.0'
}
$env:SECRET_KEY            = if ($env:SECRET_KEY) { $env:SECRET_KEY } else { 'django-insecure-local-qc-only-secret-key-hesabro-one-32bytes-min' }
$env:DEBUG                = 'True'
$env:DATABASE_URL         = "sqlite:///$($LocalDb -replace '\\','/')"
$env:USE_LOCAL_CACHE      = 'True'
$env:REDIS_URL            = 'dummy://'
$env:ALLOWED_HOSTS        = if ($Lan) { "localhost,127.0.0.1,$LanIp,*" } else { 'localhost,127.0.0.1' }
$env:CORS_ALLOWED_ORIGINS = if ($Lan) {
  "http://127.0.0.1:$FrontendPort,http://localhost:$FrontendPort,http://${LanIp}:$FrontendPort"
} else {
  "http://127.0.0.1:$FrontendPort,http://localhost:$FrontendPort"
}
$env:CORS_ALLOW_ALL_ORIGINS = 'True'
$env:CSRF_TRUSTED_ORIGINS = if ($Lan) {
  "http://127.0.0.1:$FrontendPort,http://localhost:$FrontendPort,http://${LanIp}:$FrontendPort,http://127.0.0.1:$BackendPort,http://localhost:$BackendPort,http://${LanIp}:$BackendPort"
} else {
  "http://127.0.0.1:$FrontendPort,http://localhost:$FrontendPort,http://127.0.0.1:$BackendPort,http://localhost:$BackendPort"
}
$env:BACKEND_URL          = "http://127.0.0.1:$BackendPort"
# Untracked local settings shim (local_qc_settings.py); manage.py honors it
# via setdefault, so no tracked file is modified.
$env:DJANGO_SETTINGS_MODULE = 'local_qc_settings'
$env:ACCESS_TOKEN_LIFETIME  = if ($env:ACCESS_TOKEN_LIFETIME)  { $env:ACCESS_TOKEN_LIFETIME } else { '15' }
$env:REFRESH_TOKEN_LIFETIME = if ($env:REFRESH_TOKEN_LIFETIME) { $env:REFRESH_TOKEN_LIFETIME } else { '7' }

Write-Host "  DB      : $env:DATABASE_URL"
Write-Host "  Cache   : LocMem (USE_LOCAL_CACHE=1, no Redis needed)"
Write-Host "  Bind    : $BindHost $(if ($Lan) { "(LAN mode, IP=$LanIp)" } else { '(loopback only)' })"
Write-Host "  Backend : http://127.0.0.1:$BackendPort"
Write-Host "  Frontend: http://127.0.0.1:$FrontendPort (HMR)"
if ($Lan) {
  Write-Host "  Phone   : http://${LanIp}:$FrontendPort  (same Wi-Fi, phone browser)" -ForegroundColor Yellow
}

# ── Backend venv + deps ────────────────────────────────────
if (-not (Test-Path -LiteralPath $VenvPython)) {
  Write-Step "Creating venv at $VenvDir"
  & python -m venv $VenvDir
} else { Write-Step 'Venv exists, reusing' }

if (-not $SkipInstall) {
  $needsInstall = $false
  try {
    $null = & $VenvPython -c "import django" 2>&1
    if ($LASTEXITCODE -ne 0) { $needsInstall = $true }
  } catch { $needsInstall = $true }

  if ($needsInstall) {
    Write-Step 'Installing backend requirements (venv)'
    & $VenvPython -m pip install -r (Join-Path $BackendDir 'requirements.txt')
  } else {
    Write-Host '  Backend dependencies already satisfied in venv.'
  }
} else { Write-Step 'Skipping pip install (-SkipInstall)' }

if (-not $NoMigrate) {
  Write-Step 'Running migrations (local sqlite)'
  Push-Location $BackendDir
  try {
    & $VenvPython 'manage.py' migrate --noinput
    if (-not (Test-Path -LiteralPath $LocalDb)) {
      Write-Step 'Loading geo data via local helper'
      try { & $VenvPython (Join-Path $Root 'load-geo-local.py') }
      catch { Write-Warning "geo load skipped/failed: $_" }
    }
  } finally {
    Pop-Location
  }
} else { Write-Step 'Skipping migrations (-NoMigrate)' }

# ── Frontend deps ──────────────────────────────────────────
if (-not (Test-Path -LiteralPath (Join-Path $FrontendDir 'node_modules'))) {
  Write-Step 'Installing frontend deps (npm ci)'
  & npm --prefix $FrontendDir ci
} else { Write-Step 'Frontend node_modules exists, skipping install' }

# ── Launch both in new windows ─────────────────────────────
# NOTE: child windows inherit this process's $env: (set above), so no inline
# env assignments are needed. We write tiny launcher files and run them with
# -File (robust) instead of -Command strings (fragile quoting), and invoke
# the Vite binary directly with node — `npm run dev -- --host/--port` does
# NOT forward --flags to vite when called from PowerShell (verified).
Write-Step 'Starting backend + frontend (new windows)'

function New-Launcher([string]$Path, [string[]]$Lines) {
  ($Lines -join "`r`n" + "`r`n") | Set-Content -LiteralPath $Path -Encoding utf8
}
function Quote-PS([string]$s) { "'" + ($s -replace "'", "''") + "'" }

$nodeExe  = (Get-Command node -ErrorAction Stop).Source
$viteBin  = Join-Path $FrontendDir 'node_modules\vite\bin\vite.js'
if (-not (Test-Path -LiteralPath $viteBin)) { throw "Vite binary not found: $viteBin (run npm ci first)" }

$backendLauncher  = Join-Path $Root '.dev-local.backend.ps1'
$frontendLauncher = Join-Path $Root '.dev-local.frontend.ps1'

New-Launcher $backendLauncher @(
  '# Auto-generated by dev-local.ps1 — do not edit.'
  "`$env:DJANGO_SETTINGS_MODULE = 'local_qc_settings'"
  "`$env:SECRET_KEY = $(Quote-PS $env:SECRET_KEY)"
  "`$env:DEBUG = 'True'"
  "`$env:DATABASE_URL = $(Quote-PS $env:DATABASE_URL)"
  "`$env:USE_LOCAL_CACHE = 'True'"
  "`$env:REDIS_URL = 'dummy://'"
  "`$env:ALLOWED_HOSTS = $(Quote-PS $env:ALLOWED_HOSTS)"
  "`$env:CORS_ALLOWED_ORIGINS = $(Quote-PS $env:CORS_ALLOWED_ORIGINS)"
  "`$env:CSRF_TRUSTED_ORIGINS = $(Quote-PS $env:CSRF_TRUSTED_ORIGINS)"
  "`$env:BACKEND_URL = $(Quote-PS $env:BACKEND_URL)"
  "Set-Location -LiteralPath $(Quote-PS $BackendDir)"
  "& $(Quote-PS $VenvPython) 'manage.py' runserver ${BindHost}:$BackendPort --noreload --skip-checks"
)
New-Launcher $frontendLauncher @(
  '# Auto-generated by dev-local.ps1 — do not edit.'
  "`$env:BACKEND_URL = $(Quote-PS $env:BACKEND_URL)"
  "Set-Location -LiteralPath $(Quote-PS $FrontendDir)"
  # Untracked wrapper config (vite.dev-local.config.ts) adds the /api proxy;
  # the project's own vite.config.ts stays untouched.
  # NOTE: --host 0.0.0.0 in -Lan mode lets the phone reach Vite; the /api
  # proxy hop still targets 127.0.0.1:BackendPort on this PC, and the frontend
  # uses relative /api URLs so no code change is needed for LAN.
  "& $(Quote-PS $nodeExe) $(Quote-PS $viteBin) --config $(Quote-PS (Join-Path $FrontendDir 'vite.dev-local.config.ts')) --host $BindHost --port $FrontendPort"
)

# Single-string ArgumentList with explicit quoting and ExecutionPolicy Bypass.
$backendProc  = Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -File `"$backendLauncher`"" -PassThru -WindowStyle Normal
$frontendProc = Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -File `"$frontendLauncher`"" -PassThru -WindowStyle Normal

@{ backend = $backendProc.Id; frontend = $frontendProc.Id; backendPort = $BackendPort; frontendPort = $FrontendPort } | ConvertTo-Json | Set-Content -LiteralPath $PidFile -Encoding utf8
Write-Host "  backend window PID : $($backendProc.Id)"
Write-Host "  frontend window PID: $($frontendProc.Id)"
Write-Host "  PIDs saved to .dev-local.pids.json (use -Stop to kill)"

# ── Health check backend ───────────────────────────────────
Write-Step "Waiting for backend on 127.0.0.1:$BackendPort (max ~60s)"
$ok = $false
for ($i = 0; $i -lt 30; $i++) {
  try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:$BackendPort/admin/login/?" -UseBasicParsing -TimeoutSec 3
    if ($r.StatusCode -in 200,302) { $ok = $true; break }
  } catch { Start-Sleep -Seconds 2 }
}
if ($ok) { Write-Host '  Backend is UP.' -ForegroundColor Green }
else { Write-Warning 'Backend did not answer yet — check the backend window log.' }

Write-Host ''
Write-Host '══════════════════════════════════════════════' -ForegroundColor Green
Write-Host "  Frontend (HMR) : http://127.0.0.1:$FrontendPort" -ForegroundColor Green
Write-Host "  Backend API    : http://127.0.0.1:$BackendPort/api/" -ForegroundColor Green
Write-Host "  Django admin   : http://127.0.0.1:$BackendPort/admin/" -ForegroundColor Green
if ($Lan) {
  Write-Host "  Phone frontend : http://${LanIp}:$FrontendPort" -ForegroundColor Yellow
  Write-Host "  Phone backend  : http://${LanIp}:$BackendPort/api/ (direct, optional)" -ForegroundColor Yellow
  Write-Host '  Phone + PC must be on the SAME Wi-Fi/LAN. If the phone cannot connect,' -ForegroundColor Yellow
  Write-Host '  allow Windows Firewall inbound for the two ports (run once as Admin):' -ForegroundColor Yellow
  Write-Host "    netsh advfirewall firewall add rule name=`"hesabro-dev-$FrontendPort`" dir=in action=allow protocol=TCP localport=$FrontendPort" -ForegroundColor Yellow
  Write-Host "    netsh advfirewall firewall add rule name=`"hesabro-dev-$BackendPort`" dir=in action=allow protocol=TCP localport=$BackendPort" -ForegroundColor Yellow
}
Write-Host '  Edit any file in src/ -> browser updates instantly.' -ForegroundColor Green
Write-Host '  Stop with: .\dev-local.ps1 -Stop  (or dev-local.bat -Stop)' -ForegroundColor Yellow
Write-Host '══════════════════════════════════════════════' -ForegroundColor Green
