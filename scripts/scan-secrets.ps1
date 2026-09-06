<#
.SYNOPSIS
    Cybersecurity & Git Secret Scanner for Affordable Home A/C
.DESCRIPTION
    Scans staged files, recent commits, and tracked files for private keys,
    live Stripe keys, hardcoded passwords, and untracked environment leaks.
#>

param(
    [switch]$FullRepo = $false
)

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  [SHIELD] AHAC CYBERSECURITY & SECRET SCANNER" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$patterns = @(
    @{ Name = "Stripe Live Secret Key"; Pattern = 'sk_live_[0-9a-zA-Z]{20,}' },
    @{ Name = "Stripe Restricted Key"; Pattern = 'rk_live_[0-9a-zA-Z]{20,}' },
    @{ Name = "Private RSA/EC/SSH Key"; Pattern = '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----' },
    @{ Name = "AWS Access Key"; Pattern = 'AKIA[0-9A-Z]{16}' },
    @{ Name = "Hardcoded Database URI with Password"; Pattern = 'postgresql(\+asyncpg)?://(?!(\$|\{|\%))[^:]+:(?!(\$|\{|\%))[^@]+@[^/]+' }
)

$violations = @()

# 1. Check for tracked .env files in Git
Write-Host "[1/3] Checking Git tracked files for sensitive files..." -ForegroundColor Yellow
$trackedFiles = git ls-files
$sensitivePatterns = @('.env', '.env.local', '.env.production', '*.pem', '*.key', '*.p12')

foreach ($pattern in $sensitivePatterns) {
    $matches = $trackedFiles | Where-Object { $_ -like $pattern -and $_ -notlike "*.example" -and $_ -notlike "*.sample" }
    foreach ($m in $matches) {
        $violations += "Dangerous file tracked in Git: $m"
    }
}

# 2. Check staged changes (excluding this script itself)
Write-Host "[2/3] Scanning Git diff & staged files..." -ForegroundColor Yellow
$stagedDiff = git diff --staged -- ":!scripts/scan-secrets.ps1"
foreach ($p in $patterns) {
    if ($stagedDiff -match $p.Pattern) {
        $violations += "Staged diff contains $($p.Name)!"
    }
}

# 3. Check recent commits (last 10, excluding this script itself)
Write-Host "[3/3] Scanning last 10 git commits for leaked secrets..." -ForegroundColor Yellow
$recentLogs = git log -n 10 -p -- ":!scripts/scan-secrets.ps1"
foreach ($p in $patterns) {
    if ($recentLogs -match $p.Pattern) {
        $violations += "Recent commit history contains $($p.Name)!"
    }
}

Write-Host ""
if ($violations.Count -eq 0) {
    Write-Host "[CLEAN] Zero leaked secrets or compromising files detected!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "[ALERT] CYBERSECURITY ALERT: Secret leaks detected!" -ForegroundColor Red
    foreach ($v in $violations) {
        Write-Host "   - $v" -ForegroundColor Red
    }
    Write-Host "==================================================" -ForegroundColor Cyan
    exit 1
}
