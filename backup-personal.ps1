# ==============================================================================
# Script: backup-personal.ps1
# Description: Automated personal backup for Hesabro-one (Root, Backend, Frontend)
# Ensures 'origin' (company repository) is NEVER touched. Only pushes to 'personal'.
# ==============================================================================

[CmdletBinding()]
param (
    [string]$CommitMessage = ""
)

$rootDir = $PSScriptRoot
$backendDir = Join-Path $rootDir "hesabro-one-backend-django"
$frontendDir = Join-Path $rootDir "hesabro-one-frontend-vue"
$configFile = Join-Path $rootDir "backup-config.json"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "    Personal Backup Automation for Hesabro-one          " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Load Remote Configuration
if (-not (Test-Path $configFile)) {
    Write-Host "[ERROR] Configuration file backup-config.json not found!" -ForegroundColor Red
    exit 1
}

$config = Get-Content -Raw $configFile | ConvertFrom-Json

function Sync-PersonalRepo {
    param (
        [string]$RepoName,
        [string]$RepoPath,
        [string]$RemoteUrl
    )

    Write-Host "`n--------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "Processing: $RepoName" -ForegroundColor Yellow
    Write-Host "Path: $RepoPath" -ForegroundColor DarkGray

    if (-not (Test-Path $RepoPath)) {
        Write-Host "[-] Path not found: $RepoPath" -ForegroundColor Red
        return
    }

    Push-Location $RepoPath
    try {
        # Check if git repository exists
        $null = git rev-parse --is-inside-work-tree 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[-] Directory $RepoName is not a git repository!" -ForegroundColor Red
            return
        }

        # Check or configure 'personal' remote
        if ([string]::IsNullOrWhiteSpace($RemoteUrl)) {
            $existingRemote = git remote get-url personal 2>$null
            if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($existingRemote)) {
                Write-Host "[!] 'personal' remote is not configured for $RepoName." -ForegroundColor Yellow
                Write-Host "    Please set remote URL in backup-config.json or run:" -ForegroundColor DarkGray
                Write-Host "    git remote add personal YOUR_REPO_URL" -ForegroundColor DarkCyan
                return
            }
        } else {
            $existingRemote = git remote get-url personal 2>$null
            if ($LASTEXITCODE -ne 0) {
                Write-Host "[+] Adding 'personal' remote: $RemoteUrl" -ForegroundColor Cyan
                git remote add personal $RemoteUrl
            } elseif ($existingRemote -ne $RemoteUrl) {
                Write-Host "[*] Updating 'personal' remote URL to: $RemoteUrl" -ForegroundColor Cyan
                git remote set-url personal $RemoteUrl
            }
        }

        # Verify current branch
        $currentBranch = git rev-parse --abbrev-ref HEAD 2>$null
        if ([string]::IsNullOrWhiteSpace($currentBranch) -or $currentBranch -eq "HEAD") {
            $currentBranch = "master"
        }
        Write-Host "[i] Current branch: $currentBranch" -ForegroundColor Cyan

        # Check uncommitted changes
        $status = git status --porcelain
        if (-not [string]::IsNullOrWhiteSpace($status)) {
            Write-Host "[+] Staging new local changes..." -ForegroundColor Magenta
            git add .
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
            $msg = if ([string]::IsNullOrWhiteSpace($CommitMessage)) { "Personal Backup - $timestamp" } else { "$CommitMessage - $timestamp" }
            git commit -m $msg
        } else {
            Write-Host "[i] No new changes to commit." -ForegroundColor Gray
        }

        # Push securely ONLY to 'personal'
        Write-Host "[>] Pushing to 'personal' remote ($currentBranch)..." -ForegroundColor Green
        git push personal $currentBranch

        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Backup of $RepoName completed successfully." -ForegroundColor Green
        } else {
            Write-Host "[FAIL] Push failed for $RepoName." -ForegroundColor Red
        }

    } catch {
        Write-Host "[-] Error during $RepoName : $_" -ForegroundColor Red
    } finally {
        Pop-Location
    }
}

# Run for all 3 repos
Sync-PersonalRepo -RepoName "Root Repository (Hesabro-one)" -RepoPath $rootDir -RemoteUrl $config.root_remote
Sync-PersonalRepo -RepoName "Backend (hesabro-one-backend-django)" -RepoPath $backendDir -RemoteUrl $config.backend_remote
Sync-PersonalRepo -RepoName "Frontend (hesabro-one-frontend-vue)" -RepoPath $frontendDir -RemoteUrl $config.frontend_remote

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  Backup process finished.                              " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
