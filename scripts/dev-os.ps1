<#
.SYNOPSIS
    Dev OS Local-to-Server Master CLI Bridge
.DESCRIPTION
    Enables local terminal and Antigravity AI to interact with the Hostinger VPS
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
Write-Host "  [MASTER] AHAC DEV OS - MASTER CLI BRIDGE" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

switch ($Command.ToLower()) {
    "status" {
        Write-Host "[*] Querying Agent OS Fleet Status from Server..." -ForegroundColor Yellow
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
            Write-Host "[!] Error querying server: $_" -ForegroundColor Red
        }
    }

    "run-agent" {
        if (-not $Target) {
            Write-Host "[!] Usage: .\scripts\dev-os.ps1 run-agent <agent_id>" -ForegroundColor Red
            Write-Host "   Available: agent_host_sentinel, agent_container_sentinel, agent_db_guardian, agent_revenue_reconciler, agent_funnel_telemetry, agent_seo_metadata, agent_security_shield, agent_deployment_guardian" -ForegroundColor Yellow
            return
        }
        Write-Host "[*] Triggering Agent: $Target on Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/run/$Target" -Method POST -Headers $headers
            Write-Host "[OK] Agent Execution Completed at $($resp.executed_at):" -ForegroundColor Green
            $resp.result | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[!] Agent run failed: $_" -ForegroundColor Red
        }
    }

    "run-fleet" {
        Write-Host "[*] Dispatching full fleet: Running All 8 Monitoring Agents sequentially..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/run-all" -Method POST -Headers $headers
            Write-Host "[OK] Fleet Audit Completed at $($resp.executed_at) (All Healthy: $($resp.all_healthy)):" -ForegroundColor Green
            $resp.fleet_report | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[!] Fleet audit failed: $_" -ForegroundColor Red
        }
    }

    "reconcile" {
        Write-Host "[*] Triggering 1-Click Stripe Order Reconciler on Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/orders/reconcile" -Method POST -Headers $headers
            Write-Host "[OK] Reconciliation Completed:" -ForegroundColor Green
            $resp.audit | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[!] Reconcile failed: $_" -ForegroundColor Red
        }
    }

    "verify-live" {
        Write-Host "[*] Running 3-Stage Deployment Swarm Verification..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/deployment/verify" -Method POST -Headers $headers
            Write-Host "[OK] Deployment Swarm Result ($($resp.overall_status)):" -ForegroundColor Green
            $resp | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[!] Deployment verification failed: $_" -ForegroundColor Red
        }
    }

    "tree" {
        Write-Host "[*] Querying Complete Hierarchical Agent Org Tree from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/tree" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  SOVEREIGN MASTER: $($resp.master.name) ($($resp.master.owner))" -ForegroundColor Cyan
            Write-Host "  Status: [$($resp.master.status)] | Mode: $($resp.master.fleet_mode)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            foreach ($sm in $resp.submasters) {
                Write-Host "`n  [SUB-MASTER] $($sm.name) ($($sm.id))" -ForegroundColor Yellow
                Write-Host "    Scope: $($sm.scope)" -ForegroundColor DarkGray
                Write-Host "    Lifecycle: [$($sm.lifecycle)]" -ForegroundColor $(if ($sm.lifecycle -eq "ACTIVE") { "Green" } else { "Gray" })
                Write-Host "    Supervised Agents:" -ForegroundColor White
                foreach ($ca in $sm.child_agents) {
                    $cCol = if ($ca.lifecycle -eq "ACTIVE") { "Green" } else { "DarkGray" }
                    Write-Host "      └─ [$($ca.lifecycle)] $($ca.name) ($($ca.id))" -ForegroundColor $cCol
                    Write-Host "           Scope: $($ca.scope)" -ForegroundColor DarkGray
                    Write-Host "           Last Run: $($ca.last_run_at)" -ForegroundColor DarkGray
                }
            }
        } catch {
            Write-Host "[!] Error querying agent tree: $_" -ForegroundColor Red
        }
    }

    "run-submaster" {
        if (-not $Target) {
            Write-Host "[!] Usage: .\scripts\dev-os.ps1 run-submaster <commerce|infra|growth|security>" -ForegroundColor Red
            return
        }
        $targetMap = @{
            "commerce" = "submaster_commerce_telemetry"
            "infra" = "submaster_infrastructure"
            "growth" = "submaster_growth_grounding"
            "security" = "submaster_security_deployment"
        }
        $smId = if ($targetMap.ContainsKey($Target.ToLower())) { $targetMap[$Target.ToLower()] } else { $Target }
        Write-Host "[*] Dispatching Category Sub-Master: $smId on Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/submasters/run/$smId" -Method POST -Headers $headers
            Write-Host "[OK] Sub-Master Execution Completed for $($resp.submaster_name):" -ForegroundColor Green
            $resp.results | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[!] Sub-master run failed: $_" -ForegroundColor Red
        }
    }

    "waterfall" {
        Write-Host "[*] Querying Multi-Funnel Visual Conversion Waterfall..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/analytics/overview" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Cyan
            Write-Host "  MULTI-FUNNEL REAL-WORLD CONVERSION WATERFALL" -ForegroundColor Cyan
            Write-Host "========================================================" -ForegroundColor Cyan
            foreach ($step in $resp.waterfall) {
                Write-Host "`n  Step $($step.step): $($step.name)" -ForegroundColor White
                Write-Host "    $($step.desc)" -ForegroundColor DarkGray
                Write-Host "    Volume: $($step.count) | Retention: $($step.retention_pct)% | Drop-off: $($step.dropoff_pct)%" -ForegroundColor $(if ($step.step -eq 5) { "Green" } else { "Cyan" })
            }
            Write-Host "`nEFFICIENCY METRICS:" -ForegroundColor Yellow
            Write-Host "  Beacon Ingestion Latency: $($resp.efficiency.beacon_ingestion_latency_ms)ms"
            Write-Host "  Buffer Capacity: $($resp.efficiency.buffer_capacity)"
            Write-Host "  Storage Safety: $($resp.efficiency.buffer_health)"

            Write-Host "`nOAHU CONVERSION TECHNIQUES PLAYBOOK:" -ForegroundColor Magenta
            foreach ($p in $resp.cro_playbook) {
                Write-Host "  - [$($p.impact)] $($p.title)" -ForegroundColor Green
                Write-Host "      $($p.detail)" -ForegroundColor DarkGray
            }
        } catch {
            Write-Host "[!] Error querying waterfall: $_" -ForegroundColor Red
        }
    }

    "scan-secrets" {
        powershell -ExecutionPolicy Bypass -File .\scripts\scan-secrets.ps1
    }

    default {
        Write-Host "Available Commands:" -ForegroundColor Yellow
        Write-Host "  tree                       - Display complete hierarchical Agent Org Tree"
        Write-Host "  status                     - Query fleet status and active agents"
        Write-Host "  run-submaster <name>       - Dispatch a Category Sub-Master suite (commerce, infra, growth, security)"
        Write-Host "  run-agent <agent_id>       - Trigger a single on-demand agent"
        Write-Host "  run-fleet                  - Sequentially execute all 10 agents"
        Write-Host "  waterfall                  - Display 5-stage visual conversion waterfall"
        Write-Host "  reconcile                  - Trigger on-demand Stripe auto-reconciliation"
        Write-Host "  verify-live                - Run 3-stage live deployment swarm check"
        Write-Host "  scan-secrets               - Run local git repository secret scanner"
    }
}

Write-Host "========================================================" -ForegroundColor Cyan
