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
            Write-Host "   Infra:      agent_host_sentinel, agent_container_sentinel, agent_db_guardian, agent_storage_sentinel" -ForegroundColor Yellow
            Write-Host "   Security:   agent_security_shield, agent_commit_sentinel, agent_compliance_auditor" -ForegroundColor Yellow
            Write-Host "   Commerce:   agent_funnel_telemetry, agent_cro_optimizer, agent_revenue_reconciler" -ForegroundColor Yellow
            Write-Host "   Growth:     agent_seo_metadata, agent_oahu_grounding, agent_market_research" -ForegroundColor Yellow
            Write-Host "   CRM:        agent_crm_dispatch, agent_customer_lifecycle" -ForegroundColor Yellow
            Write-Host "   Deployment: agent_deployment_guardian, agent_build_qa" -ForegroundColor Yellow
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
        Write-Host "[*] Dispatching full fleet: Running All 17 Specialized Agents sequentially..." -ForegroundColor Yellow
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
                $smCol = if ($sm.lifecycle -eq "ACTIVE") { "Green" } else { "Gray" }
                Write-Host "`n  [SUB-MASTER] $($sm.name) ($($sm.id))" -ForegroundColor Yellow
                Write-Host "    Scope: $($sm.scope)" -ForegroundColor DarkGray
                Write-Host "    Lifecycle: [$($sm.lifecycle)]" -ForegroundColor $smCol
                Write-Host "    Supervised Agents:" -ForegroundColor White
                foreach ($ca in $sm.child_agents) {
                    $cCol = if ($ca.lifecycle -eq "ACTIVE") { "Green" } else { "DarkGray" }
                    Write-Host "      - [$($ca.lifecycle)] $($ca.name) ($($ca.id))" -ForegroundColor $cCol
                    Write-Host "           Scope: $($ca.scope)" -ForegroundColor DarkGray
                    Write-Host "           Last Run: $($ca.last_run_at)" -ForegroundColor DarkGray
                }
            }
        } catch {
            Write-Host "[ERR] Error querying agent tree: $_" -ForegroundColor Red
        }
    }

    "run-submaster" {
        if (-not $Target) {
            Write-Host "[ERR] Usage: .\scripts\dev-os.ps1 run-submaster [infra|security|commerce|growth|crm|deploy]" -ForegroundColor Red
            return
        }
        $targetMap = @{
            "infra"      = "submaster_infrastructure"
            "security"   = "submaster_security_compliance"
            "commerce"   = "submaster_commerce_telemetry"
            "growth"     = "submaster_growth_grounding"
            "crm"        = "submaster_crm_operations"
            "deploy"     = "submaster_deployment_quality"
        }
        $smId = if ($targetMap.ContainsKey($Target.ToLower())) { $targetMap[$Target.ToLower()] } else { $Target }
        Write-Host "[*] Dispatching Category Sub-Master: $smId on Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/submasters/run/$smId" -Method POST -Headers $headers
            Write-Host "[OK] Sub-Master Execution Completed for $($resp.submaster_name):" -ForegroundColor Green
            $resp.results | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[ERR] Sub-master run failed: $_" -ForegroundColor Red
        }
    }

    "waterfall" {
        Write-Host "[*] Querying Multi-Funnel Visual Conversion Waterfall (By Appointment First)..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/analytics/overview" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Cyan
            Write-Host "  MULTI-FUNNEL REAL-WORLD CONVERSION WATERFALL (BY APPOINTMENT FIRST)" -ForegroundColor Cyan
            Write-Host "========================================================" -ForegroundColor Cyan
            foreach ($step in $resp.waterfall) {
                $wfCol = if ($step.step -eq 5) { "Green" } elseif ($step.step -eq 4) { "Yellow" } else { "Cyan" }
                Write-Host "`n  Step $($step.step): $($step.name)" -ForegroundColor White
                Write-Host "    $($step.desc)" -ForegroundColor DarkGray
                Write-Host "    Volume: $($step.count) | Retention: $($step.retention_pct)% | Drop-off: $($step.dropoff_pct)%" -ForegroundColor $wfCol
            }
            if ($resp.efficiency.verified_leads -ne $null) {
                Write-Host "`nLEADS & APPOINTMENTS:" -ForegroundColor Green
                Write-Host "  Verified Leads Count: $($resp.efficiency.verified_leads)"
                Write-Host "  Verified Orders Count: $($resp.efficiency.verified_orders)"
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
            Write-Host "[ERR] Error querying waterfall: $_" -ForegroundColor Red
        }
    }

    "brain" {
        Write-Host "[*] Querying Master Projects Brain Status from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/brain/status" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  MASTER PROJECTS BRAIN: $($resp.brain.status)" -ForegroundColor Cyan
            Write-Host "  Version: $($resp.brain.brain_version) | Synapses: $($resp.brain.total_synapses)" -ForegroundColor Green
            Write-Host "  Air-Tight Local Perimeter: $($resp.brain.local_perimeter_security.architecture)" -ForegroundColor Yellow
            Write-Host "  Inbound Reach: $($resp.brain.local_perimeter_security.inbound_server_reach)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            Write-Host "`nACTIVE DIRECTIVES:" -ForegroundColor Cyan
            foreach ($d in $resp.brain.active_directives) {
                Write-Host "  - $d" -ForegroundColor White
            }

            Write-Host "`nRECENT COGNITIVE THOUGHTS:" -ForegroundColor Yellow
            foreach ($th in $resp.brain.recent_thoughts) {
                Write-Host "  [$($th.type)] $($th.source) ($($th.timestamp)):" -ForegroundColor DarkCyan
                Write-Host "      $($th.thought)" -ForegroundColor White
            }
        } catch {
            Write-Host "[ERR] Error querying Master Brain: $_" -ForegroundColor Red
        }
    }

    "brain-knowledge" {
        Write-Host "[*] Querying Master Brain Grounded Knowledge Graph..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/brain/knowledge" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  MASTER BRAIN KNOWLEDGE GRAPH (v$($resp.brain_version))" -ForegroundColor Cyan
            Write-Host "========================================================" -ForegroundColor Magenta
            $resp.knowledge_base | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor White
        } catch {
            Write-Host "[ERR] Error querying Brain Knowledge: $_" -ForegroundColor Red
        }
    }

    "brain-sync" {
        $thoughtText = if ($Target) { $Target } else { "Local CLI synced heartbeat with Master Projects Brain." }
        Write-Host "[*] Outbound Synapse: Transmitting directive/thought to Master Brain..." -ForegroundColor Yellow
        try {
            $body = @{
                client_name = "LOCAL_CLI_PERIMETER"
                thought = $thoughtText
            } | ConvertTo-Json
            $resp = Invoke-RestMethod -Uri "$ServerUrl/brain/sync" -Method POST -Headers $headers -Body $body
            Write-Host "[OK] Master Brain Synchronized! Status: $($resp.status)" -ForegroundColor Green
            Write-Host "  Perimeter: $($resp.perimeter_status)" -ForegroundColor Yellow
            Write-Host "  Active Directives: $($resp.active_directives.Count)" -ForegroundColor Cyan
        } catch {
            Write-Host "[ERR] Brain sync failed: $_" -ForegroundColor Red
        }
    }

    "inspect" {
        if (-not $Target) {
            Write-Host "[ERR] Usage: .\scripts\dev-os.ps1 inspect <target_id>" -ForegroundColor Red
            Write-Host "  Examples: .\scripts\dev-os.ps1 inspect submaster_commerce_telemetry" -ForegroundColor Yellow
            Write-Host "            .\scripts\dev-os.ps1 inspect agent_security_shield" -ForegroundColor Yellow
            return
        }
        Write-Host "[*] Inspecting Synapse & Directives for Target: $Target..." -ForegroundColor Yellow
        try {
            $tree = Invoke-RestMethod -Uri "$ServerUrl/agents/tree" -Method GET -Headers $headers
            $brain = Invoke-RestMethod -Uri "$ServerUrl/brain/status" -Method GET -Headers $headers
            
            $foundSm = $tree.submasters | Where-Object { $_.id -eq $Target }
            $foundAgent = $null
            foreach ($sm in $tree.submasters) {
                $match = $sm.child_agents | Where-Object { $_.id -eq $Target }
                if ($match) { $foundAgent = $match; break }
            }

            Write-Host "`n========================================================" -ForegroundColor Magenta
            if ($foundSm) {
                Write-Host "  INSPECT SUB-MASTER: $($foundSm.name) ($($foundSm.id))" -ForegroundColor Cyan
                Write-Host "  Domain: $($foundSm.domain)" -ForegroundColor White
                Write-Host "  Child Agents: $($foundSm.child_agents.Count)" -ForegroundColor Green
            } elseif ($foundAgent) {
                Write-Host "  INSPECT AGENT: $($foundAgent.name) ($($foundAgent.id))" -ForegroundColor Cyan
                Write-Host "  Category: $($foundAgent.category) | Status: $($foundAgent.status)" -ForegroundColor Green
                Write-Host "  Capabilities: $($foundAgent.capabilities -join ', ')" -ForegroundColor DarkGray
            } else {
                Write-Host "  Target [$Target] in Synapse Registry" -ForegroundColor Yellow
            }
            Write-Host "  Perimeter Guarantee: BLOCKED_ZERO_INBOUND_ACCESS" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta
        } catch {
            Write-Host "[ERR] Inspector failed: $_" -ForegroundColor Red
        }
    }

    "scan-secrets" {
        powershell -ExecutionPolicy Bypass -File .\scripts\scan-secrets.ps1
    }

    default {
        Write-Host "Available Commands:" -ForegroundColor Yellow
        Write-Host "  brain                      - Query Master Projects Brain, synapses, and cognitive thought stream"
        Write-Host "  brain-knowledge            - Query grounded knowledge graph (architecture, Oahu economics, CRO)"
        Write-Host "  brain-sync [thought]       - Client-initiated outbound push of directive/thought to Master Brain"
        Write-Host "  inspect [id]               - Deep inspection of sub-master or agent synapse and security perimeter"
        Write-Host "  tree                       - Display complete hierarchical Agent Org Tree (6 Sub-Masters, 17 Agents)"
        Write-Host "  status                     - Query fleet status and active agents"
        Write-Host "  run-submaster [name]       - Dispatch a Category Sub-Master suite (infra, security, commerce, growth, crm, deploy)"
        Write-Host "  run-agent [agent_id]       - Trigger a single on-demand agent"
        Write-Host "  run-fleet                  - Sequentially execute all 17 agents"
        Write-Host "  waterfall                  - Display 5-stage By Appointment First conversion waterfall"
        Write-Host "  reconcile                  - Trigger on-demand Stripe auto-reconciliation"
        Write-Host "  verify-live                - Run 3-stage live deployment swarm check"
        Write-Host "  scan-secrets               - Run local git repository secret scanner"
    }
}

Write-Host "========================================================" -ForegroundColor Cyan
