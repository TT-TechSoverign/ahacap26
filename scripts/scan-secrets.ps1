<#
.SYNOPSIS
    Cybersecurity, Secret & Email Fortress Scanner for Affordable Home A/C
.DESCRIPTION
    Comprehensive 6-stage audit: scans tracked files (root + ahac-crm submodule),
    git diffs, git commit history, entire repository working tree, client-side
    NEXT_PUBLIC_ variables, and public storefront email/mailto exposure.
#>

param(
    [switch]$FullRepo = $true
)

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  [SHIELD] AHAC CYBERSECURITY & EMAIL SCANNER v2.8.0" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$historyPatterns = @(
    @{ Name = "Stripe Live Secret Key"; Pattern = 'sk_live_[0-9a-zA-Z]{20,}' },
    @{ Name = "Stripe Restricted Key"; Pattern = 'rk_live_[0-9a-zA-Z]{20,}' },
    @{ Name = "Stripe Webhook Signing Secret"; Pattern = 'whsec_[0-9a-zA-Z]{24,}' },
    @{ Name = "GitHub Personal Access Token"; Pattern = '(ghp_[0-9a-zA-Z]{30,}|github_pat_[0-9a-zA-Z_]{40,})' },
    @{ Name = "Slack Bot/User Token"; Pattern = 'xox[baprs]-[0-9a-zA-Z-]{20,}' },
    @{ Name = "Private RSA/EC/SSH Key"; Pattern = '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----' },
    @{ Name = "AWS Access Key"; Pattern = 'AKIA[0-9A-Z]{16}' },
    @{ Name = "Google API Key"; Pattern = 'AIzaSy[0-9a-zA-Z_-]{33}' },
    @{ Name = "Hardcoded Database URI with Password"; Pattern = 'postgresql(\+asyncpg)?://(?!(\$|\{|\%|user:password|crm_user:PASSWORD|crm_user:YOUR_SUPER_SECRET_KEY))[^:]+:(?!(\$|\{|\%|password|PASSWORD))[^@]+@[^/]+' },
    @{ Name = "Hardcoded SSH / Paramiko Password"; Pattern = 'ssh\.connect\([^)]*password\s*=\s*["''][^"'']+["'']|secret\s*=\s*["'']#AHAC' }
)

$activeTreeExtraPatterns = @(
    @{ Name = "Retired Dev OS Fallback Key"; Pattern = 'AhacMasterKey2026!Secured' },
    @{ Name = "Retired CRM Seed Fallback Password"; Pattern = 'TerasightV4_Ahac_2026!' },
    @{ Name = "Static Placeholder JWT Secret"; Pattern = 'os\.environ\.get\(["'']JWT_SECRET["''],\s*["'']YOUR_SUPER_SECRET_KEY["'']\)' },
    @{ Name = "Hardcoded SQL Role Password or Data Dump"; Pattern = '(CREATE\s+ROLE\s+\w+\s+WITH\s+LOGIN\s+PASSWORD\s+''[^:'']+|COPY\s+public\.\w+\s+.*\s+FROM\s+stdin)' }
)

$allActivePatterns = $historyPatterns + $activeTreeExtraPatterns
$violations = @()

# 1. Check for tracked .env / sensitive files in Git (Root + Submodule)
Write-Host "[1/6] Checking Git tracked files (root + ahac-crm) for sensitive credentials..." -ForegroundColor Yellow
$trackedFiles = @(git -c core.fsmonitor=false ls-files)
if (Test-Path "ahac-crm/.git") {
    $crmTracked = git -C ahac-crm -c core.fsmonitor=false ls-files | ForEach-Object { "ahac-crm/$_" }
    $trackedFiles += $crmTracked
}
$sensitivePatterns = @('.env', '.env.local', '.env.production', '.env.staging', '*.pem', '*.key', '*.p12', '*.pfx', '*.sqlite', '*.sqlite3', '*dump*.sql', '*backup*.sql', '*.sql.gz', '*.bak')

foreach ($pattern in $sensitivePatterns) {
    $matches = $trackedFiles | Where-Object { $_ -like $pattern -and $_ -notlike "*.example" -and $_ -notlike "*.sample" }
    foreach ($m in $matches) {
        $violations += "Dangerous file tracked in Git: $m"
    }
}

# 2. Check staged changes (added lines only, excluding scanner scripts and binary docx files)
Write-Host "[2/6] Scanning Git diff & staged files (root + ahac-crm)..." -ForegroundColor Yellow
$stagedAddedLines = @(git -c core.fsmonitor=false diff --staged --no-textconv -- ":!scripts/scan-secrets.ps1" ":!scripts/security-email-audit.py" ":!*.docx") | Where-Object { $_ -match '^\+[^+]' }
if (Test-Path "ahac-crm/.git") {
    $crmStaged = @(git -C ahac-crm -c core.fsmonitor=false diff --staged --no-textconv -- ":!*.docx") | Where-Object { $_ -match '^\+[^+]' }
    $stagedAddedLines += $crmStaged
}
$stagedDiff = $stagedAddedLines -join "`n"
foreach ($p in $allActivePatterns) {
    if ($stagedDiff -cmatch $p.Pattern) {
        $violations += "Staged diff contains $($p.Name)!"
    }
}

# 3. Check commit history (added lines in last 50 commits)
Write-Host "[3/6] Scanning Git commit history (last 50 commits, root + ahac-crm)..." -ForegroundColor Yellow
$recentAddedLines = @(git -c core.fsmonitor=false log -n 50 -p --no-textconv -- ":!scripts/scan-secrets.ps1" ":!scripts/security-email-audit.py" ":!*.docx") | Where-Object { $_ -match '^\+[^+]' }
if (Test-Path "ahac-crm/.git") {
    $crmHistory = @(git -C ahac-crm -c core.fsmonitor=false log -n 50 -p --no-textconv -- ":!*.docx") | Where-Object { $_ -match '^\+[^+]' }
    $recentAddedLines += $crmHistory
}
$recentLogs = $recentAddedLines -join "`n"
foreach ($p in $historyPatterns) {
    if ($recentLogs -cmatch $p.Pattern) {
        $violations += "Recent commit history contains $($p.Name)!"
    }
}

# 4. Full Working Tree Static Scan from Root + Submodule
Write-Host "[4/6] Scanning full working tree (root + ahac-crm)..." -ForegroundColor Yellow
$excludedDirs = @('.git', 'node_modules', '.next', '__pycache__', '.venv', 'venv', 'dist', 'build', '.idea', '.vscode', '_private_portfolio', '_analytics_data', 'brain_exports_2026-06-21')
$validExtRegex = '\.(py|ts|tsx|js|jsx|json|ps1|sh|yml|yaml|md|sql)$'

$gitFiles = @(git -c core.fsmonitor=false ls-files --cached --others --exclude-standard)
if (Test-Path "ahac-crm/.git") {
    $crmWorkFiles = git -C ahac-crm -c core.fsmonitor=false ls-files --cached --others --exclude-standard | ForEach-Object { "ahac-crm/$_" }
    $gitFiles += $crmWorkFiles
}

$filesToScan = @()
foreach ($relPath in $gitFiles) {
    if ($relPath -notmatch $validExtRegex) { continue }
    $isExcluded = $false
    foreach ($d in $excludedDirs) {
        if ($relPath -like "$d/*" -or $relPath -like "*/$d/*") {
            $isExcluded = $true
            break
        }
    }
    if (
        $relPath -like "*scripts/scan-secrets.ps1" -or
        $relPath -like "*scripts/security-email-audit.py" -or
        $relPath -like "*.example" -or
        $relPath -like "*pnpm-lock.yaml" -or
        $relPath -like "*.env*"
    ) {
        $isExcluded = $true
    }
    if (-not $isExcluded -and (Test-Path -LiteralPath $relPath -PathType Leaf)) {
        $filesToScan += $relPath
    }
}

Write-Host "      Auditing $($filesToScan.Count) source, governance, and configuration files..." -ForegroundColor DarkGray
foreach ($rel in $filesToScan) {
    try {
        $content = [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $rel).Path)
        if (-not $content) { continue }
        $applicablePatterns = if ($rel -like "*.md") { $historyPatterns } else { $allActivePatterns }
        foreach ($p in $applicablePatterns) {
            if ($content -cmatch $p.Pattern) {
                $violations += "File contains $($p.Name): $rel"
            }
        }
    } catch {
        # Skip unreadable
    }
}

# 5. Next.js Public Client Bundle Inspection (NEXT_PUBLIC_ variable audit)
Write-Host "[5/6] Auditing client-side bundle exposure (NEXT_PUBLIC_ variables)..." -ForegroundColor Yellow
$forbiddenClientPatterns = @(
    'NEXT_PUBLIC_.*SECRET',
    'NEXT_PUBLIC_.*PASSWORD',
    'NEXT_PUBLIC_.*PRIVATE',
    'NEXT_PUBLIC_.*DATABASE',
    'NEXT_PUBLIC_.*KEY.*=.*sk_live',
    'NEXT_PUBLIC_.*KEY.*=.*rk_live'
)

$nextFiles = $filesToScan | Where-Object {
    ($_ -like "apps/web/*" -or $_ -like "apps/dev-os/*") -and ($_ -match '\.(ts|tsx|js)$')
}

foreach ($rel in $nextFiles) {
    try {
        $content = [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $rel).Path)
        if (-not $content) { continue }
        foreach ($fp in $forbiddenClientPatterns) {
            if ($content -match $fp) {
                $violations += "Client file exposes dangerous NEXT_PUBLIC_ variable: $rel"
            }
        }
    } catch {
        # Skip unreadable
    }
}

# 6. Public Storefront & CRM Client Bundle Email & Anti-Harvester Verification
Write-Host "[6/6] Verifying public storefront & CRM frontend email privacy & anti-harvester DOM shield..." -ForegroundColor Yellow
$privateEmailRegex = '(brian@affordablehome-ac\.com|irasmussenjobs@gmail\.com|airperfection\.itai@gmail\.com)'
$storefrontFiles = $filesToScan | Where-Object { $_ -like "apps/web/*" -or $_ -like "apps/dev-os/*" -or $_ -like "ahac-crm/frontend/*" }
foreach ($rel in $storefrontFiles) {
    try {
        $content = [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $rel).Path)
        if (-not $content) { continue }
        if ($content -imatch $privateEmailRegex) {
            $violations += "Public client bundle file contains private CEO/developer email: $rel"
        }
        if ($rel -like "apps/web/*" -and $rel -notlike "apps/web/app/admin/*" -and $rel -notlike "*ProtectedEmailLink.tsx") {
            if ($content -imatch 'mailto:\s*office@affordablehome-ac\.com') {
                $violations += "Unprotected raw mailto:office@affordablehome-ac.com link in public storefront: $rel"
            }
        }
    } catch {
        # Skip unreadable
    }
}

Write-Host ""
if ($violations.Count -eq 0) {
    Write-Host "[CLEAN] Zero leaked secrets, fallback passwords, or unprotected storefront emails across $($filesToScan.Count) files!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "[ALERT] CYBERSECURITY ALERT: $($violations.Count) violation(s) detected!" -ForegroundColor Red
    foreach ($v in $violations) {
        Write-Host "   - $v" -ForegroundColor Red
    }
    Write-Host "==================================================" -ForegroundColor Cyan
    exit 1
}
