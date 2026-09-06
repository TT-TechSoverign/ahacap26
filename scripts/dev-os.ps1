<#
.SYNOPSIS
    Dev OS Local-to-Server Master CLI Bridge
.DESCRIPTION
    Enables local terminal & Antigravity AI to interact with the Hostinger VPS
    prod-dev-os / prod-api containers, dispatch on-demand agents, and verify deployments.
#>

param(
    [Parameter(Position = 0)]
    [string]$Command = "status",

    [Parameter(Position = 1)]
    [string]$Target = "",

    [string]$ServerUrl = "https://www.affordablehome-ac.com/api/v1/dev-os",
    [string]$MasterKey = $env:DEV_OS_MASTER_PASSWORD
)

if (-not $MasterKey) {
    $MasterKey = "AhacMasterKey2026!Secured"
}

$headers = @{
    "X-Dev-OS-Key" = $MasterKey
    "Content-Type" = "application/json"
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  👑 AHAC DEV OS • MASTER CLI BRIDGE" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

switch ($Command.ToLower()) {
    "status" {
        Write-Host "📡 Querying Agent OS Fleet Status from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/status" -Method GET -Headers $headers
            Write-Host "`n[FLEET MODE]: $($resp.fleet_mode)" -ForegroundColor Green
            Write-Host "[TOTAL AGENTS]: $($resp.total_agents)" -ForegroundColor Green
            Write-Host "`nAGENTS STATUS:" -ForegroundColor White
            foreach ($a in $resp.agents) {
                $statusColor = if ($a.lifecycle -eq "ACTIVE") { "Green" } else { "Gray" }
                Write-Host "  - [$($a.lifecycle)] $($a.name) ($($a.id))" -ForegroundColor $statusColor
                Write-Host "      Scope: $($a.scope)" -ForegroundColor DarkGray
                Write-Host "      Last Run: $($a.last_run_at)" -ForegroundColor DarkGray
            }
        } catch {
            Write-Host "❌ Error querying server: $_" -ForegroundColor Red
        }
    }

    "run-agent" {
        if (-not $Target) {
            Write-Host "❌ Usage: .\scripts\dev-os.ps1 run-agent <agent_id>" -ForegroundColor Red
            Write-Host "   Available: agent_host_sentinel, agent_container_sentinel, agent_db_guardian, agent_revenue_reconciler, agent_funnel_telemetry, agent_seo_metadata, agent_security_shield, agent_deployment_guardian" -ForegroundColor Yellow
            return
        }
        Write-Host "⚡ Triggering Agent: $Target on Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/run/$Target" -Method POST -Headers $headers
            Write-Host "✅ Agent Execution Completed at $($resp.executed_at):" -ForegroundColor Green
            $resp.result | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "❌ Agent run failed: $_" -ForegroundColor Red
        }
    }

    "run-fleet" {
        Write-Host "⚡ Disagreeing full fleet: Running All 8 Monitoring Agents sequentially..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/run-all" -Method POST -Headers $headers
            Write-Host "✅ Fleet Audit Completed at $($resp.executed_at) (All Healthy: $($resp.all_healthy)):" -ForegroundColor Green
            $resp.fleet_report | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "❌ Fleet audit failed: $_" -ForegroundColor Red
        }
    }

    "reconcile" {
        Write-Host "💰 Triggering 1-Click Stripe Order Reconciler on Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/orders/reconcile" -Method POST -Headers $headers
            Write-Host "✅ Reconciliation Completed:" -ForegroundColor Green
            $resp.audit | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "❌ Reconcile failed: $_" -ForegroundColor Red
        }
    }

    "verify-live" {
        Write-Host "🚀 Running 3-Stage Deployment Swarm Verification..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/deployment/verify" -Method POST -Headers $headers
            Write-Host "✅ Deployment Swarm Result ($($resp.overall_status)):" -ForegroundColor Green
            $resp | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "❌ Deployment verification failed: $_" -ForegroundColor Red
        }
    }

    "scan-secrets" {
        powershell -ExecutionPolicy Bypass -File .\scripts\scan-secrets.ps1
    }

    default {
        Write-Host "Available Commands:" -ForegroundColor Yellow
        Write-Host "  status         - Query fleet status and active agents"
        Write-Host "  run-agent <id> - Trigger a single on-demand agent"
        Write-Host "  run-fleet      - Sequentially execute all 8 agents"
        Write-Host "  reconcile      - Trigger on-demand Stripe auto-reconciliation"
        Write-Host "  verify-live    - Run 3-stage live deployment swarm check"
        Write-Host "  scan-secrets   - Run local git repository secret scanner"
    }
}

Write-Host "========================================================" -ForegroundColor Cyan
