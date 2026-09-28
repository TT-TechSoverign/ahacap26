<#
.SYNOPSIS
    Cybersecurity & Root Repository Secret Scanner for Affordable Home A/C
.DESCRIPTION
    Comprehensive 5-stage audit: scans tracked files, git diffs, git commit history,
    entire repository working tree from root, and client-side NEXT_PUBLIC_ variables
    for private keys, live Stripe keys, hardcoded credentials, and untracked leaks.
#>

param(
    [switch]$FullRepo = $true
)

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  [SHIELD] AHAC CYBERSECURITY ROOT SECURITY SCANNER" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$patterns = @(
    @{ Name = "Stripe Live Secret Key"; Pattern = 'sk_live_[0-9a-zA-Z]{20,}' },
    @{ Name = "Stripe Restricted Key"; Pattern = 'rk_live_[0-9a-zA-Z]{20,}' },
    @{ Name = "Private RSA/EC/SSH Key"; Pattern = '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----' },
    @{ Name = "AWS Access Key"; Pattern = 'AKIA[0-9A-Z]{16}' },
    @{ Name = "Google API Key"; Pattern = 'AIzaSy[0-9a-zA-Z_-]{33}' },
    @{ Name = "Hardcoded Database URI with Password"; Pattern = 'postgresql(\+asyncpg)?://(?!(\$|\{|\%|user:password|crm_user:PASSWORD|crm_user:YOUR_SUPER_SECRET_KEY))[^:]+:(?!(\$|\{|\%|password|PASSWORD))[^@]+@[^/]+' }
)

$violations = @()

# 1. Check for tracked .env / sensitive files in Git
Write-Host "[1/5] Checking Git tracked files for sensitive credentials..." -ForegroundColor Yellow
$trackedFiles = git ls-files
$sensitivePatterns = @('.env', '.env.local', '.env.production', '*.pem', '*.key', '*.p12', '*.sqlite', '*.sqlite3')

foreach ($pattern in $sensitivePatterns) {
    $matches = $trackedFiles | Where-Object { $_ -like $pattern -and $_ -notlike "*.example" -and $_ -notlike "*.sample" }
    foreach ($m in $matches) {
        $violations += "Dangerous file tracked in Git: $m"
    }
}

# 2. Check staged changes (excluding this scanner script)
Write-Host "[2/5] Scanning Git diff & staged files..." -ForegroundColor Yellow
$stagedDiff = git diff --staged -- ":!scripts/scan-secrets.ps1"
foreach ($p in $patterns) {
    if ($stagedDiff -match $p.Pattern) {
        $violations += "Staged diff contains $($p.Name)!"
    }
}

# 3. Check commit history (last 50 commits, excluding this scanner script)
Write-Host "[3/5] Scanning Git commit history (last 50 commits)..." -ForegroundColor Yellow
$recentLogs = git log -n 50 -p -- ":!scripts/scan-secrets.ps1"
foreach ($p in $patterns) {
    if ($recentLogs -match $p.Pattern) {
        $violations += "Recent commit history contains $($p.Name)!"
    }
}

# 4. Full Working Tree Static Scan from Root
Write-Host "[4/5] Scanning full working tree from repository root..." -ForegroundColor Yellow
$excludedDirs = @('.git', 'node_modules', '.next', '__pycache__', '.venv', 'dist', 'build', '.idea', '.vscode')
$targetExtensions = @('*.py', '*.ts', '*.tsx', '*.js', '*.json', '*.ps1', '*.sh', '*.yml', '*.yaml')

$filesToScan = Get-ChildItem -Path . -Recurse -File -Include $targetExtensions -ErrorAction SilentlyContinue | Where-Object {
    $filePath = $_.FullName
    $relPath = Resolve-Path -Path $filePath -Relative
    $isExcluded = $false
    foreach ($d in $excludedDirs) {
        if ($filePath -like "*\$d\*" -or $filePath -like "*/$d/*") {
            $isExcluded = $true
            break
        }
    }
    # Exclude scanner itself, example templates, test artifacts, lockfiles, and gitignored local env files
    if ($relPath -like "*scripts*scan-secrets.ps1" -or $relPath -like "*.example" -or $relPath -like "*pnpm-lock.yaml" -or $relPath -like "*.env*") {
        $isExcluded = $true
    }
    -not $isExcluded
}

Write-Host "      Auditing $($filesToScan.Count) source and configuration files..." -ForegroundColor DarkGray
foreach ($file in $filesToScan) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        if (-not $content) { continue }
        foreach ($p in $patterns) {
            if ($content -match $p.Pattern) {
                $rel = Resolve-Path -Path $file.FullName -Relative
                $violations += "File contains $($p.Name): $rel"
            }
        }
    } catch {
        # File read exception (e.g. locked or binary)
    }
}

# 5. Next.js Public Client Bundle Inspection (NEXT_PUBLIC_ variable audit)
Write-Host "[5/5] Auditing client-side bundle exposure (NEXT_PUBLIC_ variables)..." -ForegroundColor Yellow
$forbiddenClientPatterns = @(
    'NEXT_PUBLIC_.*SECRET',
    'NEXT_PUBLIC_.*PASSWORD',
    'NEXT_PUBLIC_.*PRIVATE',
    'NEXT_PUBLIC_.*DATABASE',
    'NEXT_PUBLIC_.*KEY.*=.*sk_live',
    'NEXT_PUBLIC_.*KEY.*=.*rk_live'
)

$nextFiles = Get-ChildItem -Path @("apps/web", "apps/dev-os") -Recurse -File -Include @('*.ts', '*.tsx', '*.js') -ErrorAction SilentlyContinue | Where-Object {
    $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.next*"
}

foreach ($f in $nextFiles) {
    try {
        $content = [System.IO.File]::ReadAllText($f.FullName)
        if (-not $content) { continue }
        foreach ($fp in $forbiddenClientPatterns) {
            if ($content -match $fp) {
                $rel = Resolve-Path -Path $f.FullName -Relative
                $violations += "Client file exposes dangerous NEXT_PUBLIC_ variable: $rel"
            }
        }
    } catch {
        # Skip unreadable
    }
}

Write-Host ""
if ($violations.Count -eq 0) {
    Write-Host "[CLEAN] Zero leaked secrets, credentials, or compromising files detected across entire repository root!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "[ALERT] CYBERSECURITY ALERT: Security violations detected!" -ForegroundColor Red
    foreach ($v in $violations) {
        Write-Host "   - $v" -ForegroundColor Red
    }
    Write-Host "==================================================" -ForegroundColor Cyan
    exit 1
}
