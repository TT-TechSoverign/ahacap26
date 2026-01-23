# Verification Script for Affordable Home A/C
# Runs TypeScript checks to catch syntax and type errors.

$WebPath = Join-Path $PSScriptRoot "apps/web"

Write-Host "--- Starting TypeScript Verification for apps/web ---" -ForegroundColor Cyan

Push-Location $WebPath
pnpm tsc --noEmit
$TscStatus = $LASTEXITCODE
Pop-Location

if ($TscStatus -eq 0) {
    Write-Host "✅ Verification Successful: No Type Errors Found." -ForegroundColor Green
}
else {
    Write-Host "❌ Verification Failed: TypeScript detected errors." -ForegroundColor Red
    exit 1
}
