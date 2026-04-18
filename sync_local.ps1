<#
.SYNOPSIS
Enforces the AHAC Twin Architecture strict sync protocol before local development.

.DESCRIPTION
This script prevents developers from accidentally pushing outdated local code to live main/staging.
It forces a fetch and pulls the latest from the remote staging and main branches into the local branches.
#>

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  AHAC Twin Architecture Local Sync" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "This ensures your local environment strictly mirrors remote staging & main." -ForegroundColor Yellow

# Ensure we're in the git root
if (!(Test-Path ".git")) {
    Write-Host "[ERROR] Must run from the root directory of the repository." -ForegroundColor Red
    exit 1
}

Write-Host "`n[1/3] Fetching all remote changes..." -ForegroundColor Blue
git fetch --all

Write-Host "`n[2/3] Syncing local 'staging' branch..." -ForegroundColor Blue
git checkout staging
git pull origin staging --ff-only
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Fast-forward failed for staging. You may have divergent local commits." -ForegroundColor Yellow
}

Write-Host "`n[3/3] Syncing local 'main' branch..." -ForegroundColor Blue
git checkout main
git pull origin main --ff-only
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Fast-forward failed for main. You may have divergent local commits." -ForegroundColor Yellow
}

Write-Host "`n✅ Local synchronization complete. You are clear to develop." -ForegroundColor Green
Write-Host "⚠️ Remember: NEVER push local main directly to origin/main. Let Staging deployments handle the pipeline." -ForegroundColor Yellow
