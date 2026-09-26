#Requires -Version 5.1
<#
.SYNOPSIS
  Opens Windows Firewall inbound for Hesabro local dev (phone-on-LAN testing).

.DESCRIPTION
  Adds (idempotently) inbound TCP allow rules for the backend + frontend
  ports. Must run AS ADMINISTRATOR (right-click -> Run as Administrator).
  Safe to re-run; existing rules with the same name are removed first.

.USAGE
  Right-click -> Run with PowerShell as Administrator
  Or: powershell -ExecutionPolicy Bypass -File .\allow-lan-firewall.ps1
  Or custom ports: .\allow-lan-firewall.ps1 -BackendPort 8000 -FrontendPort 8080
#>
param(
  [int]$BackendPort = 8000,
  [int]$FrontendPort = 8080
)

$ErrorActionPreference = 'Stop'

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
  ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
  Write-Host ''
  Write-Host '  !! NOT running as Administrator.' -ForegroundColor Red
  Write-Host '  Right-click this file -> "Run with PowerShell as Administrator",' -ForegroundColor Yellow
  Write-Host '  approve the UAC prompt, then re-run.' -ForegroundColor Yellow
  Write-Host ''
  Read-Host 'Press Enter to exit'
  exit 1
}

foreach ($port in @($BackendPort, $FrontendPort)) {
  $name = "hesabro-dev-$port"
  # Idempotent: drop old rule(s) with the same name first (ignore errors).
  Remove-NetFirewallRule -DisplayName $name -ErrorAction SilentlyContinue
  netsh advfirewall firewall add rule name="$name" dir=in action=allow protocol=TCP localport=$port | Out-Null
  Write-Host "  [+] allowed inbound TCP $port  (rule: $name)" -ForegroundColor Green
}

Write-Host ''
Write-Host '  Current hesabro rules:' -ForegroundColor Cyan
Get-NetFirewallRule -DisplayName 'hesabro-dev-*' -ErrorAction SilentlyContinue |
  Format-Table DisplayName, Enabled, Direction, Action -AutoSize | Out-String | Write-Host
Write-Host 'Done. Keep this window; now test on the phone.' -ForegroundColor Green
