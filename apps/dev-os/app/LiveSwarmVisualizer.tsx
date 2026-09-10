'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Brain,
    Shield,
    Cpu,
    Zap,
    CheckCircle2,
    AlertTriangle,
    RefreshCw,
    Terminal,
    Rocket,
    Activity,
    Layers,
    Server,
    Database,
    Search,
    DollarSign,
    Users,
    ChevronRight,
    Play,
    Clock,
    Lock,
    Eye,
    Maximize2,
    Minimize2,
    Radio
} from 'lucide-react';

export interface LiveSwarmProps {
    brainData: any;
    agents: any[];
    submasters: any[];
    onRefresh: () => Promise<void>;
    onLog: (msg: string) => void;
    onInspectAgent?: (agent: any) => void;
}

interface DeploymentStageResult {
    passed: boolean;
    name: string;
    agents: Record<string, any>;
}

interface DeploymentVerificationData {
    status: string;
    overall_status: string;
    all_stages_passed: boolean;
    elapsed_ms: number;
    verified_at: string;
    stages?: {
        stage_1_pre_deploy?: DeploymentStageResult;
        stage_2_build_containers?: DeploymentStageResult;
        stage_3_host_regression?: DeploymentStageResult;
    };
}

export default function LiveSwarmVisualizer({
    brainData,
    agents,
    submasters,
    onRefresh,
    onLog,
    onInspectAgent
}: LiveSwarmProps) {
    const [activeSubmasterId, setActiveSubmasterId] = useState<string | null>(null);
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    const [firingId, setFiringId] = useState<string | null>(null);
    const [firingType, setFiringType] = useState<'agent' | 'submaster' | 'fleet' | 'deploy' | null>(null);
    const [recentFiringResult, setRecentFiringResult] = useState<any>(null);
    
    // 3-Stage Deployment State
    const [isDeploying, setIsDeploying] = useState<boolean>(false);
    const [deployStep, setDeployStep] = useState<number>(0);
    const [deployResult, setDeployResult] = useState<DeploymentVerificationData | null>(null);

    // Thought injection
    const [customThought, setCustomThought] = useState<string>('');
    const [injectingThought, setInjectingThought] = useState<boolean>(false);

    // Auto-refresh interval toggle
    const [autoSync, setAutoSync] = useState<boolean>(true);
    const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

    // Auto-polling for thoughts and state
    useEffect(() => {
        if (!autoSync) return;
        const timer = setInterval(() => {
            onRefresh().catch(() => {});
            setLastSyncTime(new Date().toLocaleTimeString());
        }, 8000);
        return () => clearInterval(timer);
    }, [autoSync, onRefresh]);

    // Format submasters with children
    const organizedSubmasters = useMemo(() => {
        return (submasters || []).map(sm => {
            const childList = (agents || []).filter(a => a.supervisor === sm.id);
            return {
                ...sm,
                child_agents: childList
            };
        });
    }, [submasters, agents]);

    // Submaster Category Meta Mapping
    const getSubmasterStyle = (id: string) => {
        switch (id) {
            case 'submaster_infrastructure':
                return { color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20', icon: Server };
            case 'submaster_security_compliance':
                return { color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20', icon: Shield };
            case 'submaster_commerce_telemetry':
                return { color: 'text-violet-400', border: 'border-violet-500/40', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/20', icon: DollarSign };
            case 'submaster_growth_grounding':
                return { color: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', glow: 'shadow-cyan-500/20', icon: Search };
            case 'submaster_crm_operations':
                return { color: 'text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/20', icon: Users };
            case 'submaster_deployment_quality':
                return { color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20', icon: Rocket };
            default:
                return { color: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', glow: 'shadow-cyan-500/20', icon: Cpu };
        }
    };

    // Trigger Individual Agent
    const fireAgent = async (agentId: string) => {
        setFiringId(agentId);
        setFiringType('agent');
        setRecentFiringResult(null);
        onLog(`⚡ [LIVE SWARM] Firing satellite node [${agentId}]...`);
        try {
            const start = performance.now();
            const res = await fetch(`/api/v1/dev-os/agents/run/${agentId}`, { method: 'POST' });
            const data = await res.json();
            const latency = Math.round(performance.now() - start);
            setRecentFiringResult({ id: agentId, type: 'agent', latency, data });
            onLog(`✅ [LIVE SWARM] Node [${agentId}] responded in ${latency}ms -> ${data.status || 'SUCCESS'}`);
            await onRefresh();
        } catch (e: any) {
            onLog(`❌ [LIVE SWARM] Node [${agentId}] execution failed: ${e.message}`);
        } finally {
            setFiringId(null);
            setFiringType(null);
        }
    };

    // Trigger Submaster Suite
    const fireSubmaster = async (smId: string) => {
        setFiringId(smId);
        setFiringType('submaster');
        setRecentFiringResult(null);
        onLog(`⚡ [LIVE SWARM] Awakening Sub-Master Suite [${smId}]...`);
        try {
            const start = performance.now();
            const res = await fetch(`/api/v1/dev-os/agents/submasters/run/${smId}`, { method: 'POST' });
            const data = await res.json();
            const latency = Math.round(performance.now() - start);
            setRecentFiringResult({ id: smId, type: 'submaster', latency, data });
            onLog(`✅ [LIVE SWARM] Sub-Master [${smId}] executed ${Object.keys(data.results || {}).length} agents in ${latency}ms.`);
            await onRefresh();
        } catch (e: any) {
            onLog(`❌ [LIVE SWARM] Sub-Master [${smId}] failed: ${e.message}`);
        } finally {
            setFiringId(null);
            setFiringType(null);
        }
    };

    // Trigger Full 24-Agent Fleet Swarm
    const fireFleetSwarm = async () => {
        setFiringId('fleet');
        setFiringType('fleet');
        setRecentFiringResult(null);
        onLog('⚡ [LIVE SWARM] Awakening COMPLETE 24-AGENT SOVEREIGN FLEET...');
        try {
            const start = performance.now();
            const res = await fetch('/api/v1/dev-os/agents/run-all', { method: 'POST' });
            const data = await res.json();
            const latency = Math.round(performance.now() - start);
            setRecentFiringResult({ id: 'fleet', type: 'fleet', latency, data });
            onLog(`✅ [LIVE SWARM] Sovereign Fleet completed in ${latency}ms. All healthy: ${data.all_healthy}`);
            await onRefresh();
        } catch (e: any) {
            onLog(`❌ [LIVE SWARM] Fleet swarm failed: ${e.message}`);
        } finally {
            setFiringId(null);
            setFiringType(null);
        }
    };

    // Trigger 3-Stage Deployment Verification Swarm
    const executeDeploymentVerification = async () => {
        setIsDeploying(true);
        setDeployStep(1);
        setDeployResult(null);
        onLog('🚀 [DEPLOYMENT SWARM] Stage 1: Initializing Perimeter Armor & Git Security Audit...');

        try {
            // Stage 1 animation interval
            const t1 = setTimeout(() => setDeployStep(2), 600);
            const t2 = setTimeout(() => setDeployStep(3), 1200);

            const res = await fetch('/api/v1/dev-os/deployment/verify', { method: 'POST' });
            clearTimeout(t1);
            clearTimeout(t2);

            if (res.ok) {
                const data: DeploymentVerificationData = await res.json();
                setDeployResult(data);
                setDeployStep(3);
                onLog(`✅ [DEPLOYMENT SWARM] All 3 Stages Verified in ${data.elapsed_ms}ms: ${data.overall_status}`);
                await onRefresh();
            } else {
                onLog(`❌ [DEPLOYMENT SWARM] Verification failed with HTTP ${res.status}`);
            }
        } catch (e: any) {
            onLog(`❌ [DEPLOYMENT SWARM] Verification error: ${e.message}`);
        } finally {
            setIsDeploying(false);
        }
    };

    // Push Cognitive Thought to Master Brain
    const handlePushThought = async () => {
        if (!customThought.trim()) return;
        setInjectingThought(true);
        try {
            const res = await fetch('/api/v1/dev-os/brain/perimeter/push-directive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ directive: customThought.trim(), source: 'dev_os_swarm_hud' })
            });
            if (res.ok) {
                onLog(`🧠 [BRAIN SYNAPSE] Injected cognitive directive: "${customThought}"`);
                setCustomThought('');
                await onRefresh();
            }
        } catch (e: any) {
            onLog(`❌ Brain injection error: ${e.message}`);
        } finally {
            setInjectingThought(false);
        }
    };

    const recentThoughts = brainData?.recent_thoughts || [];

    return (
        <div className="flex flex-col gap-6 w-full text-slate-100 font-sans select-none">
            {/* Top Swarm Telemetry Control Bar */}
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Master Brain Core Pulse */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex size-14 items-center justify-center">
                            {/* Animated Pulse Rings */}
                            <div className={`absolute inset-0 rounded-2xl bg-cyan-500/20 blur-md ${firingType ? 'animate-ping' : 'animate-pulse'}`} />
                            <div className="relative flex size-14 items-center justify-center rounded-2xl border border-cyan-400/50 bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 text-cyan-300 shadow-lg shadow-cyan-500/30">
                                <Brain className={`size-7 ${firingType ? 'animate-bounce text-cyan-200' : 'text-cyan-400'}`} />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-black tracking-wider text-white">
                                    SOVEREIGN NEURAL SWARM
                                </h2>
                                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    {brainData?.status || 'ARMED_AND_SYNAPSED'}
                                </span>
                                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                                    {agents?.length || 24} NODES ACTIVE
                                </span>
                            </div>
                            <p className="mt-0.5 font-mono text-xs text-slate-400">
                                Master Brain Core &bull; 6 Sub-Master Hubs &bull; Live Telemetry Circuit
                            </p>
                        </div>
                    </div>

                    {/* Center / Right: Primary Swarm Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* 3-Stage Deployment Verify Button */}
                        <button
                            onClick={executeDeploymentVerification}
                            disabled={isDeploying || !!firingType}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition shadow-lg ${
                                isDeploying
                                    ? 'border border-amber-500/50 bg-amber-500/20 text-amber-300 animate-pulse'
                                    : 'border border-emerald-500/50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20'
                            }`}
                        >
                            <Rocket className={`size-4 ${isDeploying ? 'animate-spin' : ''}`} />
                            {isDeploying ? 'VERIFYING 3 STAGES...' : 'VERIFY DEPLOYMENT SWARM 🚀'}
                        </button>

                        {/* Fire Fleet Swarm Button */}
                        <button
                            onClick={fireFleetSwarm}
                            disabled={!!firingType || isDeploying}
                            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-bold transition shadow-lg ${
                                firingType === 'fleet'
                                    ? 'border border-cyan-400 bg-cyan-500/20 text-cyan-200 animate-pulse'
                                    : 'border border-cyan-500/40 bg-slate-800 text-cyan-300 hover:bg-slate-700 shadow-cyan-500/10'
                            }`}
                        >
                            <Zap className={`size-4 ${firingType === 'fleet' ? 'animate-bounce' : 'text-amber-400'}`} />
                            FIRE ALL 24 AGENTS ⚡
                        </button>

                        {/* Auto-Sync Toggle & Refresh */}
                        <button
                            onClick={() => setAutoSync(prev => !prev)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2.5 font-mono text-xs transition ${
                                autoSync
                                    ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                            }`}
                            title="Toggle 8s auto-refresh of swarm telemetry"
                        >
                            <Radio className={`size-3.5 ${autoSync ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                            <span>{autoSync ? 'AUTO-SYNC ON' : 'PAUSED'}</span>
                        </button>

                        <button
                            onClick={async () => {
                                await onRefresh();
                                setLastSyncTime(new Date().toLocaleTimeString());
                            }}
                            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 font-mono text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition"
                        >
                            <RefreshCw className="size-3.5" />
                            <span>{lastSyncTime}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 3-Stage Deployment Swarm Live Pipeline Banner */}
            {(isDeploying || deployResult) && (
                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-950 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-400">
                                <Rocket className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-mono text-sm font-black tracking-wider text-white">
                                    3-STAGE DEPLOYMENT VERIFICATION PIPELINE
                                </h3>
                                <p className="font-mono text-xs text-slate-400">
                                    Zero-Downtime Non-Regression Guard &bull; Synchronized via Redis
                                </p>
                            </div>
                        </div>

                        {deployResult && (
                            <div className="flex items-center gap-3 font-mono text-xs">
                                <span className={`px-3 py-1 rounded-full font-bold border ${
                                    deployResult.all_stages_passed
                                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                        : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                                }`}>
                                    {deployResult.overall_status}
                                </span>
                                <span className="text-slate-400 flex items-center gap-1">
                                    <Clock className="size-3.5" />
                                    {deployResult.elapsed_ms}ms
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 3 Pipeline Stage Visual Cards */}
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* STAGE 1 */}
                        <div className={`rounded-xl border p-4 transition-all duration-300 ${
                            deployStep >= 1
                                ? 'border-cyan-500/50 bg-cyan-950/20 shadow-lg shadow-cyan-500/10'
                                : 'border-slate-800 bg-slate-900/40 opacity-60'
                        }`}>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                                <div className="flex items-center gap-2">
                                    <Shield className="size-4 text-cyan-400" />
                                    <span className="font-mono text-xs font-bold text-cyan-300">STAGE 1</span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400">PERIMETER ARMOR</span>
                            </div>
                            <p className="mt-2 text-xs font-semibold text-white">
                                Perimeter Armor & Git Security
                            </p>
                            <div className="mt-3 space-y-1.5">
                                {['agent_security_shield', 'agent_commit_sentinel', 'agent_db_guardian', 'agent_perimeter_auditor'].map(agentName => {
                                    const stageAgents = deployResult?.stages?.stage_1_pre_deploy?.agents;
                                    const agentData = stageAgents?.[agentName];
                                    return (
                                        <div key={agentName} className="flex items-center justify-between font-mono text-[11px] px-2 py-1 rounded bg-slate-900/80 border border-slate-800">
                                            <span className="text-slate-300 truncate max-w-[140px]">{agentName.replace('agent_', '')}</span>
                                            <span className={`text-[10px] font-bold ${
                                                agentData?.status ? 'text-emerald-400' : deployStep >= 1 ? 'text-cyan-400 animate-pulse' : 'text-slate-500'
                                            }`}>
                                                {agentData?.status || (deployStep >= 1 ? 'CHECKING...' : 'QUEUED')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* STAGE 2 */}
                        <div className={`rounded-xl border p-4 transition-all duration-300 ${
                            deployStep >= 2
                                ? 'border-amber-500/50 bg-amber-950/20 shadow-lg shadow-amber-500/10'
                                : 'border-slate-800 bg-slate-900/40 opacity-60'
                        }`}>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                                <div className="flex items-center gap-2">
                                    <Cpu className="size-4 text-amber-400" />
                                    <span className="font-mono text-xs font-bold text-amber-300">STAGE 2</span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400">CONTAINERS & SCHEMA</span>
                            </div>
                            <p className="mt-2 text-xs font-semibold text-white">
                                Build QA & Schema Metadata
                            </p>
                            <div className="mt-3 space-y-1.5">
                                {['agent_build_qa', 'agent_container_sentinel', 'agent_schema_metadata_engine'].map(agentName => {
                                    const stageAgents = deployResult?.stages?.stage_2_build_containers?.agents;
                                    const agentData = stageAgents?.[agentName];
                                    return (
                                        <div key={agentName} className="flex items-center justify-between font-mono text-[11px] px-2 py-1 rounded bg-slate-900/80 border border-slate-800">
                                            <span className="text-slate-300 truncate max-w-[140px]">{agentName.replace('agent_', '')}</span>
                                            <span className={`text-[10px] font-bold ${
                                                agentData?.status ? 'text-emerald-400' : deployStep >= 2 ? 'text-amber-400 animate-pulse' : 'text-slate-500'
                                            }`}>
                                                {agentData?.status || (deployStep >= 2 ? 'TESTING...' : 'QUEUED')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* STAGE 3 */}
                        <div className={`rounded-xl border p-4 transition-all duration-300 ${
                            deployStep >= 3
                                ? 'border-emerald-500/50 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                                : 'border-slate-800 bg-slate-900/40 opacity-60'
                        }`}>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                                <div className="flex items-center gap-2">
                                    <Activity className="size-4 text-emerald-400" />
                                    <span className="font-mono text-xs font-bold text-emerald-300">STAGE 3</span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400">HOST & NON-REGRESSION</span>
                            </div>
                            <p className="mt-2 text-xs font-semibold text-white">
                                Zero-Downtime Host & Telemetry
                            </p>
                            <div className="mt-3 space-y-1.5">
                                {['agent_host_sentinel', 'agent_regression_sentinel', 'agent_funnel_telemetry', 'agent_crm_dispatch'].map(agentName => {
                                    const stageAgents = deployResult?.stages?.stage_3_host_regression?.agents;
                                    const agentData = stageAgents?.[agentName];
                                    return (
                                        <div key={agentName} className="flex items-center justify-between font-mono text-[11px] px-2 py-1 rounded bg-slate-900/80 border border-slate-800">
                                            <span className="text-slate-300 truncate max-w-[140px]">{agentName.replace('agent_', '')}</span>
                                            <span className={`text-[10px] font-bold ${
                                                agentData?.status ? 'text-emerald-400' : deployStep >= 3 ? 'text-emerald-400 animate-pulse' : 'text-slate-500'
                                            }`}>
                                                {agentData?.status || (deployStep >= 3 ? 'VERIFYING...' : 'QUEUED')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Interactive Swarm Grid & Satellite Hubs */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left 2 Cols: 6 Sub-Master Clusters & Click-to-Fire Nodes */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <Layers className="size-5 text-cyan-400" />
                                <div>
                                    <h3 className="font-mono text-sm font-black uppercase tracking-wider text-white">
                                        6 Sub-Master Clusters &bull; 24 Satellite Agents
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Click any node to trigger on-demand execution with live latency telemetry
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-slate-800 px-3 py-1 font-mono text-xs text-slate-300 border border-slate-700">
                                Redis Synced
                            </span>
                        </div>

                        {/* Clusters Grid */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            {organizedSubmasters.map(sm => {
                                const style = getSubmasterStyle(sm.id);
                                const SmIcon = style.icon;
                                const isSubmasterFiring = firingId === sm.id && firingType === 'submaster';
                                const isExpanded = activeSubmasterId === sm.id;

                                return (
                                    <div
                                        key={sm.id}
                                        className={`rounded-xl border transition-all duration-200 bg-slate-950/60 p-4 ${
                                            isExpanded
                                                ? `${style.border} ring-1 ring-cyan-500/30 bg-slate-900/90`
                                                : 'border-slate-800/80 hover:border-slate-700'
                                        }`}
                                    >
                                        {/* Submaster Card Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`flex size-9 items-center justify-center rounded-lg border ${style.border} ${style.bg} ${style.color}`}>
                                                    <SmIcon className={`size-4 ${isSubmasterFiring ? 'animate-spin' : ''}`} />
                                                </div>
                                                <div>
                                                    <h4 className="font-mono text-xs font-bold text-white tracking-wide">
                                                        {sm.name}
                                                    </h4>
                                                    <span className="font-mono text-[10px] text-slate-400">
                                                        {sm.child_agents?.length || 0} Satellite Nodes
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Submaster Run Button */}
                                            <button
                                                onClick={() => fireSubmaster(sm.id)}
                                                disabled={!!firingType}
                                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition ${
                                                    isSubmasterFiring
                                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                                                }`}
                                                title="Execute entire sub-master suite"
                                            >
                                                <Play className="size-2.5 fill-current" />
                                                {isSubmasterFiring ? 'RUNNING' : 'RUN SUITE'}
                                            </button>
                                        </div>

                                        {/* Satellite Agent Nodes Grid */}
                                        <div className="mt-3.5 space-y-2">
                                            {sm.child_agents?.map((agent: any) => {
                                                const isAgentFiring = firingId === agent.id && firingType === 'agent';
                                                const isSelected = selectedAgentId === agent.id;
                                                const lastAuditStatus = agent.last_audit?.status || 'ARMED';

                                                return (
                                                    <div
                                                        key={agent.id}
                                                        onClick={() => setSelectedAgentId(agent.id)}
                                                        className={`flex items-center justify-between rounded-lg px-3 py-2 border transition-all cursor-pointer ${
                                                            isAgentFiring
                                                                ? 'border-amber-500/60 bg-amber-500/10'
                                                                : isSelected
                                                                ? 'border-cyan-500/60 bg-cyan-950/30'
                                                                : 'border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <div className={`size-2 rounded-full ${
                                                                isAgentFiring
                                                                    ? 'bg-amber-400 animate-ping'
                                                                    : lastAuditStatus === 'ARMED' || lastAuditStatus === 'CLEAN' || lastAuditStatus === 'HEALTHY'
                                                                    ? 'bg-emerald-400'
                                                                    : 'bg-cyan-400'
                                                            }`} />
                                                            <span className="font-mono text-xs text-slate-200 truncate">
                                                                {agent.name}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                                                                {lastAuditStatus}
                                                            </span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    fireAgent(agent.id);
                                                                }}
                                                                disabled={!!firingType}
                                                                className="flex items-center justify-center size-6 rounded bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white transition"
                                                                title={`Quick-fire ${agent.id}`}
                                                            >
                                                                <Zap className="size-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Live Firing Telemetry Banner if an agent just ran */}
                    {recentFiringResult && (
                        <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-emerald-400" />
                                    <span className="font-mono text-xs font-bold text-white">
                                        TELEMETRY RESPONSE: [{recentFiringResult.id}]
                                    </span>
                                </div>
                                <span className="font-mono text-xs text-cyan-400 flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {recentFiringResult.latency}ms
                                </span>
                            </div>
                            <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-cyan-300/90 border border-slate-800">
                                {JSON.stringify(recentFiringResult.data, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Right Col: Live Master Brain Cognitive Stream */}
                <div className="space-y-6">
                    {/* Live Cognitive Feed */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md flex flex-col h-full">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <Brain className="size-4 text-cyan-400" />
                                <h3 className="font-mono text-xs font-black uppercase tracking-wider text-white">
                                    Live Cognitive Stream
                                </h3>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                {recentThoughts.length} EVENTS
                            </span>
                        </div>

                        {/* Scrolling Thought Stream */}
                        <div className="mt-4 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                            {recentThoughts.length === 0 ? (
                                <div className="p-6 text-center font-mono text-xs text-slate-500">
                                    No cognitive thoughts recorded yet. Dispatch an agent or verification swarm above.
                                </div>
                            ) : (
                                [...recentThoughts].reverse().map((th: any, idx: number) => {
                                    const eventType = th.event_type || 'THOUGHT';
                                    return (
                                        <div
                                            key={idx}
                                            className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 hover:border-slate-700 transition"
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                                                    {eventType}
                                                </span>
                                                <span className="font-mono text-[10px] text-slate-500">
                                                    {th.timestamp ? new Date(th.timestamp).toLocaleTimeString() : 'RECENT'}
                                                </span>
                                            </div>
                                            <p className="font-mono text-xs text-slate-300 leading-relaxed break-words">
                                                {th.thought}
                                            </p>
                                            {th.source && (
                                                <div className="mt-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                                    <span>SRC:</span>
                                                    <span className="text-slate-400">{th.source}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Cognitive Thought Injection Input */}
                        <div className="mt-4 pt-4 border-t border-slate-800">
                            <label className="font-mono text-[10px] text-slate-400 block mb-1.5 uppercase">
                                Push Cognitive Directive to Brain Synapse:
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={customThought}
                                    onChange={(e) => setCustomThought(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePushThought()}
                                    placeholder="Enter directive or strategic insight..."
                                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                                />
                                <button
                                    onClick={handlePushThought}
                                    disabled={injectingThought || !customThought.trim()}
                                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono text-xs font-bold transition disabled:opacity-50"
                                >
                                    PUSH
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
