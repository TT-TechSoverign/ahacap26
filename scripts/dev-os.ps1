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
            Write-Host "   Security:   agent_security_shield, agent_commit_sentinel, agent_compliance_auditor, agent_perimeter_auditor" -ForegroundColor Yellow
            Write-Host "   Commerce:   agent_funnel_telemetry, agent_cro_optimizer, agent_revenue_reconciler" -ForegroundColor Yellow
            Write-Host "   Growth:     agent_seo_metadata, agent_oahu_grounding, agent_market_research, agent_heco_rebate_strategist, agent_gsc_ga4_analytics, agent_schema_metadata_engine, agent_high_intent_planner" -ForegroundColor Yellow
            Write-Host "   CRM:        agent_crm_dispatch, agent_customer_lifecycle, agent_intake_triage" -ForegroundColor Yellow
            Write-Host "   Deployment: agent_deployment_guardian, agent_build_qa, agent_regression_sentinel" -ForegroundColor Yellow
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
        Write-Host "[*] Dispatching full fleet: Running All 24 Specialized Agents sequentially..." -ForegroundColor Yellow
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

    "analytics" {
        Write-Host "[*] Querying GSC + GA4 Continuous Analytics Telemetry from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/analytics/gsc-ga4" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  SEARCH CONSOLE & GA4 CONTINUOUS TELEMETRY" -ForegroundColor Cyan
            Write-Host "  Period: $($resp.reporting_period) | Updated: $($resp.timestamp)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            Write-Host "`nSEARCH CONSOLE HIGH-IMPRESSION QUERY CLUSTERS:" -ForegroundColor Yellow
            foreach ($q in $resp.gsc_clusters) {
                Write-Host "  - '$($q.query)' [Category: $($q.category)]" -ForegroundColor White
                Write-Host "      Impressions: $($q.monthly_impressions) | Clicks: $($q.monthly_clicks) | CTR: $($q.ctr_percent)% | Avg Rank: $($q.avg_position)" -ForegroundColor Cyan
                Write-Host "      Diagnosis:   $($q.diagnosis)" -ForegroundColor DarkGray
                Write-Host "      Target Page: $($q.target_page)" -ForegroundColor Green
            }

            Write-Host "`nGA4 STORE & SERVICE FUNNEL TELEMETRY:" -ForegroundColor Yellow
            Write-Host "  Sessions: $($resp.ga4_funnel.total_sessions) | Bounce Rate: $($resp.ga4_funnel.bounce_rate_pct)%" -ForegroundColor White
            Write-Host "  Shop Product Views: $($resp.ga4_funnel.shop_views)" -ForegroundColor White
            Write-Host "  Drop-off at Model/Voltage Selection: $($resp.ga4_funnel.voltage_model_dropoff_pct)% (Root Cause: 230V outlet hesitation)" -ForegroundColor Red
            Write-Host "  Cart Additions: $($resp.ga4_funnel.add_to_cart_count)" -ForegroundColor Cyan
            Write-Host "  Checkout Starts: $($resp.ga4_funnel.checkout_starts) | Completed Orders: $($resp.ga4_funnel.completed_orders)" -ForegroundColor Green
            Write-Host "  Online Shop Conversion Rate: $($resp.ga4_funnel.shop_conversion_rate_pct)%" -ForegroundColor Green

            Write-Host "`nREVENUE IMPACT OPPORTUNITY:" -ForegroundColor Magenta
            Write-Host "  $($resp.revenue_opportunity.detail)" -ForegroundColor Green
            Write-Host "  Estimated Monthly Revenue Unlock: $($resp.revenue_opportunity.monthly_unlock_potential)" -ForegroundColor Yellow
        } catch {
            Write-Host "[ERR] Failed to query analytics: $_" -ForegroundColor Red
        }
    }

    "recommendations" {
        Write-Host "[*] Streaming Continuous CRO & Landing Page Optimization Recommendations..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/analytics/recommendations" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  CONTINUOUS CRO OPTIMIZATION STREAM (ACTIVE RECOMMENDATIONS)" -ForegroundColor Cyan
            Write-Host "  Active Recommendations: $($resp.total_recommendations) | Target Engine: Continuous CRO Loop" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            foreach ($rec in $resp.recommendations) {
                $priorityColor = if ($rec.priority -eq "CRITICAL") { "Red" } elseif ($rec.priority -eq "HIGH") { "Yellow" } else { "Cyan" }
                Write-Host "`n  [$($rec.priority)] $($rec.title) (ID: $($rec.id))" -ForegroundColor $priorityColor
                Write-Host "    Target URL: $($rec.target_route)" -ForegroundColor White
                Write-Host "    Problem:    $($rec.problem)" -ForegroundColor DarkGray
                Write-Host "    Action:     $($rec.action)" -ForegroundColor Green
                Write-Host "    Expected Impact: $($rec.expected_impact)" -ForegroundColor Yellow
                Write-Host "    Status:     $($rec.status)" -ForegroundColor Cyan
            }
        } catch {
            Write-Host "[ERR] Failed to query recommendations: $_" -ForegroundColor Red
        }
    }

    "high-intent-pages" {
        Write-Host "[*] Querying High-Intent Landing Page Catalog from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/high-intent-pages" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  HIGH-INTENT SEO & CRO LANDING PAGE CATALOG" -ForegroundColor Cyan
            Write-Host "  Total Deployed/Planned Pages: $($resp.total_pages)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            foreach ($pg in $resp.pages) {
                $statusColor = if ($pg.status -eq "PRODUCTION") { "Green" } elseif ($pg.status -eq "IN_DEVELOPMENT") { "Yellow" } else { "Cyan" }
                Write-Host "`n  [$($pg.status)] $($pg.title)" -ForegroundColor $statusColor
                Write-Host "    Route:        $($pg.route)" -ForegroundColor White
                Write-Host "    Search Intent:$($pg.target_intent)" -ForegroundColor DarkGray
                Write-Host "    Conversion:   $($pg.conversion_bridge)" -ForegroundColor Green
                Write-Host "    Schema:       $($pg.schema_types -join ', ')" -ForegroundColor DarkCyan
                Write-Host "    Projected CVR:$($pg.projected_cvr)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "[ERR] Failed to query high-intent pages: $_" -ForegroundColor Red
        }
    }

    "schema-catalog" {
        Write-Host "[*] Querying Google Rich Results Schema Catalog from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/analytics/schema-catalog" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  STRUCTURED SCHEMA & RICH SERP CATALOG" -ForegroundColor Cyan
            Write-Host "  Total Schemas: $($resp.total_schemas) | Rich Results Compliance: $($resp.rich_results_ready)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            foreach ($sc in $resp.schemas) {
                Write-Host "`n  - $($sc.route) ($($sc.schema_type))" -ForegroundColor Yellow
                Write-Host "      Name:        $($sc.name)" -ForegroundColor White
                Write-Host "      SERP Badge:  $($sc.rich_snippet_benefit)" -ForegroundColor Green
            }
        } catch {
            Write-Host "[ERR] Failed to query schema catalog: $_" -ForegroundColor Red
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

    "brain-timeline" {
        Write-Host "[*] Querying Master Brain Historical Timeline from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/brain/timeline" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  MASTER PROJECTS BRAIN: COMPLETE CHRONICLE (v$($resp.brain_version))" -ForegroundColor Cyan
            Write-Host "  Total Epochs: $($resp.total_phases) | Milestones: $($resp.commit_milestones.Count)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            foreach ($p in $resp.timeline) {
                Write-Host "`n  [$($p.phase_id)] $($p.title)" -ForegroundColor Yellow
                Write-Host "    Timeframe: $($p.timeframe) | Commits: $($p.commit_start)$(if ($p.commit_end) { ' -> ' + $p.commit_end })" -ForegroundColor Cyan
                Write-Host "    Milestone: $($p.milestone)" -ForegroundColor White
                Write-Host "    Impact:    $($p.impact)" -ForegroundColor Green
            }

            Write-Host "`nKEY COMMIT MILESTONES (1,334+ COMMITS LINEAGE):" -ForegroundColor Magenta
            foreach ($cm in $resp.commit_milestones) {
                Write-Host "  $($cm.hash) ($($cm.date)): $($cm.message)" -ForegroundColor DarkCyan
            }
        } catch {
            Write-Host "[ERR] Error querying timeline: $_" -ForegroundColor Red
        }
    }

    "inject-history" {
        Write-Host "[*] Dispatching Swarm Memory Injection into Master Brain..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/brain/inject-history" -Method POST -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  [OK] MASTER BRAIN FULL HISTORY INJECTION COMPLETED!" -ForegroundColor Green
            Write-Host "  Brain Version: $($resp.brain_version)" -ForegroundColor Cyan
            Write-Host "  Timeline Phases Ingested: $($resp.timeline_phases_count)" -ForegroundColor Green
            Write-Host "  Knowledge Categories: $($resp.knowledge_categories_count)" -ForegroundColor Green
            Write-Host "  Swarm Events Injected: $($resp.injected_events_count)" -ForegroundColor Yellow
            Write-Host "  Synapses Energized: $($resp.synapses_energized)" -ForegroundColor Cyan
            Write-Host "  Perimeter Status: $($resp.perimeter_status)" -ForegroundColor Yellow
            Write-Host "========================================================" -ForegroundColor Magenta

            Write-Host "`nRECENT BRAIN COGNITION STREAM:" -ForegroundColor Yellow
            foreach ($th in $resp.recent_thoughts) {
                Write-Host "  [$($th.type)] $($th.source) ($($th.timestamp)):" -ForegroundColor DarkCyan
                Write-Host "      $($th.thought)" -ForegroundColor White
            }
        } catch {
            Write-Host "[ERR] History injection failed: $_" -ForegroundColor Red
        }
    }

    "sops" {
        Write-Host "[*] Querying Standard Operating Procedures (SOPs) from Server..." -ForegroundColor Yellow
        try {
            $resp = Invoke-RestMethod -Uri "$ServerUrl/agents/sops" -Method GET -Headers $headers
            Write-Host "`n========================================================" -ForegroundColor Magenta
            Write-Host "  SOVEREIGN TIER STANDARD OPERATING PROCEDURES (SOPS)" -ForegroundColor Cyan
            Write-Host "  Total Registered SOPs: $($resp.total_sops)" -ForegroundColor Green
            Write-Host "========================================================" -ForegroundColor Magenta

            if ($Target) {
                $targetKey = $Target.ToLower()
                $sop = $null
                if ($resp.sops.PSObject.Properties.Name -contains $targetKey) {
                    $sop = $resp.sops.$targetKey
                } else {
                    foreach ($prop in $resp.sops.PSObject.Properties) {
                        if ($prop.Value.code -and $prop.Value.code.ToLower() -eq $targetKey) {
                            $sop = $prop.Value
                            break
                        }
                    }
                }
                if ($sop) {
                    Write-Host "`n  [$($sop.code)] $($sop.title)" -ForegroundColor Yellow
                    Write-Host "  Domain: $($sop.domain) | Supervisor: $($sop.supervisor)" -ForegroundColor Cyan
                    Write-Host "  Mandate: $($sop.mandate)" -ForegroundColor White
                    Write-Host "`n  TOKEN EFFICIENCY POLICY:" -ForegroundColor Green
                    Write-Host "    $($sop.token_efficiency_policy)" -ForegroundColor DarkGray
                    Write-Host "`n  OAHU GROUNDING:" -ForegroundColor Yellow
                    Write-Host "    $($sop.oahu_grounding)" -ForegroundColor DarkCyan
                    Write-Host "`n  EXECUTION STEPS:" -ForegroundColor White
                    foreach ($st in $sop.execution_steps) {
                        Write-Host "    [$($st.step)] $($st.title)" -ForegroundColor Cyan
                        Write-Host "        $($st.description)" -ForegroundColor DarkGray
                        Write-Host "        Verification: $($st.verification)" -ForegroundColor Green
                    }
                    Write-Host "`n  INPUTS:  $($sop.inputs -join '; ')" -ForegroundColor DarkGray
                    Write-Host "  OUTPUTS: $($sop.outputs -join '; ')" -ForegroundColor DarkGray
                    Write-Host "`n  CONTINGENCY PROTOCOL:" -ForegroundColor Red
                    Write-Host "    $($sop.contingency_protocol)" -ForegroundColor Yellow
                } else {
                    Write-Host "[!] SOP not found for target: $Target" -ForegroundColor Red
                }
            } else {
                Write-Host "`nSUB-MASTER SOPS (6):" -ForegroundColor Magenta
                foreach ($prop in $resp.sops.PSObject.Properties) {
                    if ($prop.Name -like "submaster_*") {
                        $s = $prop.Value
                        Write-Host "  - [$($s.code)] $($s.title) ($($s.domain))" -ForegroundColor Yellow
                        Write-Host "      Mandate: $($s.mandate)" -ForegroundColor DarkGray
                    }
                }
                Write-Host "`nSPECIALIZED AGENT SOPS (24):" -ForegroundColor Magenta
                foreach ($prop in $resp.sops.PSObject.Properties) {
                    if ($prop.Name -notlike "submaster_*") {
                        $s = $prop.Value
                        Write-Host "  - [$($s.code)] $($s.title) [Domain: $($s.domain)]" -ForegroundColor Cyan
                        Write-Host "      Token Policy: $($s.token_efficiency_policy)" -ForegroundColor DarkGray
                    }
                }
                Write-Host "`nTip: Run '.\scripts\dev-os.ps1 sops <id>' to view full step-by-step dossier." -ForegroundColor DarkCyan
            }
        } catch {
            Write-Host "[ERR] Failed to query SOPs: $_" -ForegroundColor Red
        }
    }

    "scan-secrets" {
        powershell -ExecutionPolicy Bypass -File .\scripts\scan-secrets.ps1
    }

    default {
        Write-Host "Available Commands:" -ForegroundColor Yellow
        Write-Host "  brain                      - Query Master Projects Brain, synapses, and cognitive thought stream"
        Write-Host "  brain-knowledge            - Query grounded knowledge graph (architecture, Oahu economics, CRO)"
        Write-Host "  brain-timeline             - Display complete chronological history from inception to current"
        Write-Host "  inject-history             - Dispatch swarm memory injection into Master Brain"
        Write-Host "  brain-sync [thought]       - Client-initiated outbound push of directive/thought to Master Brain"
        Write-Host "  inspect [id]               - Deep inspection of sub-master or agent synapse and security perimeter"
        Write-Host "  tree                       - Display complete hierarchical Agent Org Tree (6 Sub-Masters, 24 Agents)"
        Write-Host "  status                     - Query fleet status and active agents"
        Write-Host "  sops [id]                  - View Standard Operating Procedures (all 30 dossiers or specific agent)"
        Write-Host "  run-submaster [name]       - Dispatch a Category Sub-Master suite (infra, security, commerce, growth, crm, deploy)"
        Write-Host "  run-agent [agent_id]       - Trigger a single on-demand agent"
        Write-Host "  run-fleet                  - Sequentially execute all 24 agents"
        Write-Host "  analytics                  - Display Google Search Console & GA4 continuous telemetry & conversion drop-offs"
        Write-Host "  recommendations            - Stream active continuous CRO, schema, and UI/content optimization suggestions"
        Write-Host "  high-intent-pages          - Inspect high-converting landing pages catalog and deployment status"
        Write-Host "  schema-catalog             - Inspect Google rich result schemas across all production routes"
        Write-Host "  waterfall                  - Display 5-stage By Appointment First conversion waterfall"
        Write-Host "  reconcile                  - Trigger on-demand Stripe auto-reconciliation"
        Write-Host "  verify-live                - Run 3-stage live deployment swarm check"
        Write-Host "  scan-secrets               - Run local git repository secret scanner"
    }
}

Write-Host "========================================================" -ForegroundColor Cyan
