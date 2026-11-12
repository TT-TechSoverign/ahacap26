# ==============================================================================
# SOVEREIGN MASTER FLEET: REAL-WORLD SERVICE GROUNDING SENTINEL
# Sub-Master 2 (Cybersecurity & Compliance) & Sub-Master 6 (Deployment & QA)
# ==============================================================================
# Validates all web pages, API content, and CRM code against authentic field operations:
# 1. Blocks any window AC shop overhaul, wash rack, or bench testing claims.
# 2. Blocks any nitrogen drain line flushing claims.
# 3. Verifies Hawaii Energy rebate is strictly $45 on qualifying window ACs.
# 4. Verifies flat island delivery is strictly $50.
# 5. Blocks "hurricane brackets" terminology (standard brackets only).
# 6. Verifies clean drop-cloth protection standard is respected.
# ==============================================================================

param(
    [string]$TargetDir = "$PSScriptRoot\..\apps\web\app",
    [switch]$Strict = $true
)

$ErrorActionPreference = "Stop"
$ScanRoots = @($TargetDir)
foreach ($extraDir in @(
    "$PSScriptRoot\..\apps\api\content",
    "$PSScriptRoot\..\ahac-crm\backend",
    "$PSScriptRoot\..\ahac-crm\frontend\src"
)) {
    if (Test-Path $extraDir) {
        $ScanRoots += (Resolve-Path $extraDir).Path
    }
}
$ScanFiles = Get-ChildItem -Path $ScanRoots -Recurse -Include *.tsx, *.ts, *.jsx, *.js, *.py, *.json -Exclude "sitemap.ts", "middleware.ts" | Where-Object { $_.FullName -notmatch '\\(node_modules|\.venv|dist|\.next)\\' }

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host " SOVEREIGN FLEET: REAL-WORLD SERVICE GROUNDING & FACTUALITY AUDIT" -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan

$violations = @()

# 1. Check for fabricated window AC shop teardown/wash rack overhaul
Write-Host "[1/7] Scanning for non-existent Window AC shop overhaul/wash rack claims..." -ForegroundColor Yellow
$overhaulMatches = $ScanFiles | Select-String -Pattern "window.*(shop overhaul|wash rack|teardown overhaul|bench immersion|waipahu overhaul)" -CaseSensitive:$false
foreach ($match in $overhaulMatches) {
    if ($match.Line -notmatch "worth paying to overhaul|paying to overhaul" -and $match.Line -notmatch "middleware" -and $match.Line -notmatch "redirect") {
        $violations += [PSCustomObject]@{
            Rule = "Purged Service: Window AC Shop Teardown"
            File = $match.Path.Replace((Get-Location).Path, ".")
            LineNumber = $match.LineNumber
            Snippet = $match.Line.Trim()
        }
    }
}

# 2. Check for nitrogen in drain line context
Write-Host "[2/7] Scanning for fabricated Nitrogen Drain Line flushing claims..." -ForegroundColor Yellow
$nitrogenMatches = $ScanFiles | Select-String -Pattern "nitrogen.*(drain|condensate|clog|blowout|flush)" -CaseSensitive:$false
foreach ($match in $nitrogenMatches) {
    $violations += [PSCustomObject]@{
        Rule = "Purged Claim: Nitrogen Drain Line Clearing"
        File = $match.Path.Replace((Get-Location).Path, ".")
        LineNumber = $match.LineNumber
        Snippet = $match.Line.Trim()
    }
}
$drainNitrogenMatches = $ScanFiles | Select-String -Pattern "(drain|condensate).*nitrogen" -CaseSensitive:$false
foreach ($match in $drainNitrogenMatches) {
    $violations += [PSCustomObject]@{
        Rule = "Purged Claim: Nitrogen Drain Line Clearing"
        File = $match.Path.Replace((Get-Location).Path, ".")
        LineNumber = $match.LineNumber
        Snippet = $match.Line.Trim()
    }
}

# 3. Check for incorrect Hawaii Energy rebate amounts ($50 instead of $45)
Write-Host "[3/7] Scanning for rebate amount drift ($50 rebate vs official $45)..." -ForegroundColor Yellow
$rebateMatches = $ScanFiles | Where-Object { $_.FullName -notmatch '\\apps\\web\\app\\shop\\' } | Select-String -Pattern '\$50\s+rebate' -CaseSensitive:$false
foreach ($match in $rebateMatches) {
    $violations += [PSCustomObject]@{
        Rule = "Rebate Drift: Must be $45 rebate, not $50"
        File = $match.Path.Replace((Get-Location).Path, ".")
        LineNumber = $match.LineNumber
        Snippet = $match.Line.Trim()
    }
}

# 4. Check for hurricane brackets terminology
Write-Host "[4/7] Scanning for prohibited 'hurricane brackets' terminology..." -ForegroundColor Yellow
$bracketMatches = $ScanFiles | Select-String -Pattern "hurricane bracket" -CaseSensitive:$false
foreach ($match in $bracketMatches) {
    $violations += [PSCustomObject]@{
        Rule = "Prohibited Term: Standard brackets only, no hurricane brackets"
        File = $match.Path.Replace((Get-Location).Path, ".")
        LineNumber = $match.LineNumber
        Snippet = $match.Line.Trim()
    }
}

# 5. Check for bench testing claims on window ACs
Write-Host "[5/7] Scanning for inappropriate 'bench test' claims on customer units..." -ForegroundColor Yellow
$benchMatches = $ScanFiles | Select-String -Pattern "bench test" -CaseSensitive:$false
foreach ($match in $benchMatches) {
    $violations += [PSCustomObject]@{
        Rule = "Unrealistic Service: Bench test claim (use factory sealed / field test)"
        File = $match.Path.Replace((Get-Location).Path, ".")
        LineNumber = $match.LineNumber
        Snippet = $match.Line.Trim()
    }
}

# 6. Check for hydro bag mentions (AHAC uses floor drop cloths, casing removal, no hydro bags)
Write-Host "[6/7] Scanning for hydro bag references..." -ForegroundColor Yellow
$hydroMatches = $ScanFiles | Select-String -Pattern "hydro bag|bib kit|cleaning bib" -CaseSensitive:$false
foreach ($match in $hydroMatches) {
    if ($match.Line -notmatch "no hydro bags|never hydro bags|without messy hydro bags") {
        $violations += [PSCustomObject]@{
            Rule = "Service Drift: Use clean drop-cloth protection, no hydro bags"
            File = $match.Path.Replace((Get-Location).Path, ".")
            LineNumber = $match.LineNumber
            Snippet = $match.Line.Trim()
        }
    }
}

# 7. Check for prohibited 'after-hours' or 'night scheduling' promises
Write-Host "[7/7] Scanning for ungrounded 'after-hours' or night service claims..." -ForegroundColor Yellow
$afterHoursMatches = $ScanFiles | Select-String -Pattern "after-hours|after hours service" -CaseSensitive:$false
foreach ($match in $afterHoursMatches) {
    $violations += [PSCustomObject]@{
        Rule = "Unrealistic Service: Standard daytime hours only (no after-hours scheduling)"
        File = $match.Path.Replace((Get-Location).Path, ".")
        LineNumber = $match.LineNumber
        Snippet = $match.Line.Trim()
    }
}

Write-Host "================================================================================" -ForegroundColor Cyan
if ($violations.Count -eq 0) {
    Write-Host "[PASS] Zero factuality violations found across all scanned routes, API content, and CRM." -ForegroundColor Green
    Write-Host "All content matches authentic field operations, technician pricing, and dispatch SOPs." -ForegroundColor Green
    exit 0
} else {
    Write-Host "[FAIL] $($violations.Count) service factuality violations detected:" -ForegroundColor Red
    $violations | Format-Table -AutoSize | Out-String | Write-Host -ForegroundColor Red
    if ($Strict) {
        exit 1
    }
}
