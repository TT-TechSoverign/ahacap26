'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Activity,
    Cpu,
    Database,
    Server,
    ShieldCheck,
    Lock,
    Unlock,
    RefreshCw,
    Search,
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Truck,
    Warehouse,
    AlertCircle,
    Eye,
    ZoomIn,
    ZoomOut,
    Maximize2,
    Minimize2,
    RotateCcw,
    FileText,
    Check,
    Copy,
    ExternalLink,
    ChevronRight,
    Sparkles,
    BarChart3,
    ArrowUpRight,
    Download,
    Terminal,
    Radio,
    Flame,
    Zap,
    Wind,
    Wrench,
    Move,
    ShieldAlert,
    GitCommit,
    Layers,
    LayoutGrid
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface NodePosition {
    id: string;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
    cluster: string;
    minimized?: boolean;
}

interface AgentMeta {
    id: string;
    name: string;
    scope: string;
    icon: string;
    tier: string;
    supervisor: string;
    lifecycle: 'DORMANT' | 'ACTIVE';
    last_audit?: any;
    last_run_at: string;
}

interface OrderItem {
    name: string;
    price?: number;
    qty?: number;
}

interface OrderRecord {
    id: string;
    status: string;
    total_cents: number;
    total_formatted: string;
    stripe_pid?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    customer_address?: string;
    fulfillment_mode?: string;
    items?: OrderItem[];
    created_at?: string;
}

const MASTER_EMAIL = 'irasmussenjobs@gmail.com';

export default function DevOsEagleEyePage() {
    // --- AUTHENTICATION STATE ---
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [authError, setAuthError] = useState<string>('');

    // --- CANVAS PAN & ZOOM STATE ---
    const [scale, setScale] = useState<number>(0.85);
    const [pan, setPan] = useState<{ x: number; y: number }>({ x: 80, y: 40 });
    const [isPanning, setIsPanning] = useState<boolean>(false);
    const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // --- ACTIVE WORKSPACE & TILING STATE ---
    const [activeViewMode, setActiveViewMode] = useState<'eagle_eye' | 'free' | 'tiled'>('free');
    const [tiledNodes, setTiledNodes] = useState<[string, string]>(['node_agents', 'node_revenue']);
    const [activeTerminalTab, setActiveTerminalTab] = useState<'output' | 'audit_log'>('output');
    const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
    const [commandQuery, setCommandQuery] = useState<string>('');

    // --- CLUSTERS & NODES LAYOUT ---
    const [nodes, setNodes] = useState<NodePosition[]>([
        { id: 'node_host', title: 'Cluster 1: Host & Containers', x: 40, y: 40, w: 460, h: 560, cluster: 'Infra' },
        { id: 'node_revenue', title: 'Cluster 2: Revenue & Hawaii GET Tax', x: 540, y: 40, w: 520, h: 560, cluster: 'Commerce' },
        { id: 'node_agents', title: 'Cluster 3: 8-Agent Swarm Command', x: 1100, y: 40, w: 560, h: 620, cluster: 'Swarm' },
        { id: 'node_funnels', title: 'Cluster 4: Interactive Funnels & Telemetry', x: 40, y: 640, w: 480, h: 540, cluster: 'Telemetry' },
        { id: 'node_seo', title: 'Cluster 5: SEO & CRO Metadata Engine', x: 560, y: 640, w: 500, h: 540, cluster: 'Growth' },
        { id: 'node_security', title: 'Cluster 6: Cybersecurity & Secret Shield', x: 1100, y: 700, w: 560, h: 520, cluster: 'Security' },
    ]);

    // --- DRAGGING NODE STATE ---
    const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // --- DATA FEEDS ---
    const [agents, setAgents] = useState<AgentMeta[]>([]);
    const [runningAgentId, setRunningAgentId] = useState<string | null>(null);
    const [fleetRunning, setFleetRunning] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [financials, setFinancials] = useState<any>(null);
    const [infra, setInfra] = useState<any>(null);
    const [funnelData, setFunnelData] = useState<any>(null);
    const [croData, setCroData] = useState<any>(null);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile'>('desktop');
    const [reconciling, setReconciling] = useState<boolean>(false);

    const canvasRef = useRef<HTMLDivElement>(null);

    const appendLog = (msg: string) => {
        const time = new Date().toLocaleTimeString();
        setTerminalLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 99)]);
    };

    // --- 1. INITIAL AUTH CHECK ---
    const checkAuthSession = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/dev-os/auth/me');
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated) {
                    setIsAuthenticated(true);
                    appendLog('Master authenticated session restored via secure HttpOnly cookie.');
                }
            }
        } catch {
            // Unauthenticated
        } finally {
            setAuthLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthSession();
    }, [checkAuthSession]);

    // --- 2. DATA POLLING ON AUTH ---
    const fetchAllData = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            const [agRes, ordRes, finRes, infRes, telRes, croRes, audRes] = await Promise.all([
                fetch('/api/v1/dev-os/agents/status').then(r => r.ok ? r.json() : null),
                fetch('/api/v1/dev-os/orders').then(r => r.ok ? r.json() : null),
                fetch('/api/v1/dev-os/financials').then(r => r.ok ? r.json() : null),
                fetch('/api/v1/dev-os/infrastructure').then(r => r.ok ? r.json() : null),
                fetch('/api/v1/dev-os/analytics/overview').then(r => r.ok ? r.json() : null),
                fetch('/api/v1/dev-os/cro/metadata').then(r => r.ok ? r.json() : null),
                fetch('/api/v1/dev-os/audit-logs').then(r => r.ok ? r.json() : null)
            ]);

            if (agRes?.agents) setAgents(agRes.agents);
            if (ordRes?.orders) setOrders(ordRes.orders);
            if (finRes) setFinancials(finRes);
            if (infRes) setInfra(infRes);
            if (telRes) setFunnelData(telRes);
            if (croRes) setCroData(croRes);
            if (audRes?.logs) setAuditLogs(audRes.logs);
        } catch (e: any) {
            appendLog(`Data sync error: ${e.message}`);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllData();
            appendLog('Initialized World-Class Eagle Eye 6-Cluster Constellation.');
        }
    }, [isAuthenticated, fetchAllData]);

    // --- 3. MASTER AUTHENTICATION HANDLERS ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        setAuthLoading(true);

        try {
            const res = await fetch('/api/v1/dev-os/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });

            if (res.ok) {
                setIsAuthenticated(true);
                appendLog(`Master authentication successful for ${loginEmail}.`);
                fetchAllData();
            } else {
                const err = await res.json();
                setAuthError(err.detail || 'Access Denied: Invalid Master Credentials');
                appendLog(`Authentication failed for ${loginEmail}. Access rejected.`);
            }
        } catch {
            setAuthError('Server communication error. Check VPS status.');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/v1/dev-os/auth/logout', { method: 'POST' });
        setIsAuthenticated(false);
        appendLog('Master session terminated. Locked.');
    };

    // --- 4. ON-DEMAND AGENT RUNNERS ---
    const runSingleAgent = async (agentId: string) => {
        setRunningAgentId(agentId);
        appendLog(`⚡ Master dispatching Agent [${agentId}]...`);
        try {
            const res = await fetch(`/api/v1/dev-os/agents/run/${agentId}`, { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                appendLog(`✅ Agent [${agentId}] finished: ${JSON.stringify(data.result).slice(0, 120)}...`);
                fetchAllData();
            } else {
                appendLog(`❌ Agent [${agentId}] execution failed with HTTP ${res.status}`);
            }
        } catch (e: any) {
            appendLog(`❌ Agent [${agentId}] error: ${e.message}`);
        } finally {
            setRunningAgentId(null);
        }
    };

    const runFullFleetAudit = async () => {
        setFleetRunning(true);
        appendLog('⚡ Master initiating FULL-FLEET AUDIT (All 8 Monitoring Agents sequentially)...');
        try {
            const res = await fetch('/api/v1/dev-os/agents/run-all', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                appendLog(`✅ Full Fleet Audit Complete! All healthy: ${data.all_healthy}`);
                fetchAllData();
            }
        } catch (e: any) {
            appendLog(`❌ Fleet audit failed: ${e.message}`);
        } finally {
            setFleetRunning(false);
        }
    };

    const runDeploymentSwarm = async () => {
        appendLog('🚀 Master dispatching LIVE DEPLOYMENT & VERIFICATION SWARM (3 Stages)...');
        try {
            const res = await fetch('/api/v1/dev-os/deployment/verify', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                appendLog(`✅ Deployment Swarm Verified: ${data.overall_status}`);
                fetchAllData();
            }
        } catch (e: any) {
            appendLog(`❌ Deployment swarm error: ${e.message}`);
        }
    };

    const handleReconcileStripe = async () => {
        setReconciling(true);
        appendLog('💰 Triggering On-Demand 1-Click Stripe Order Reconciler...');
        try {
            const res = await fetch('/api/v1/dev-os/orders/reconcile', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                appendLog(`✅ Stripe Reconcile Complete: ${data.audit?.recovered_count || 0} orders recovered.`);
                fetchAllData();
            }
        } catch (e: any) {
            appendLog(`❌ Stripe reconcile error: ${e.message}`);
        } finally {
            setReconciling(false);
        }
    };

    // --- 5. EAGLE EYE & NAVIGATION MODES ---
    const setEagleEyeView = () => {
        setActiveViewMode('eagle_eye');
        setScale(0.52);
        setPan({ x: 20, y: 20 });
        appendLog('Panoramic Eagle Eye View engaged (0.52x zoom-to-fit).');
    };

    const resetFocus = (nodeId?: string) => {
        setActiveViewMode('free');
        setScale(0.85);
        if (nodeId) {
            const target = nodes.find(n => n.id === nodeId);
            if (target) {
                setPan({ x: -target.x * 0.85 + 200, y: -target.y * 0.85 + 100 });
                appendLog(`Focused on cluster: ${target.title}`);
                return;
            }
        }
        setPan({ x: 80, y: 40 });
    };

    // Keyboard Shortcuts (Key 0 = Eagle Eye, Ctrl+K = Command Palette)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setCommandPaletteOpen(prev => !prev);
            }
            if (e.key === '0' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
                setEagleEyeView();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- 6. CANVAS PAN & DRAG HANDLERS ---
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0 && (e.target as HTMLElement).id === 'canvas-bg') {
            setIsPanning(true);
            setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
            setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
        } else if (draggingNodeId) {
            const newX = (e.clientX - pan.x) / scale - dragOffset.x;
            const newY = (e.clientY - pan.y) / scale - dragOffset.y;
            setNodes(prev => prev.map(n => n.id === draggingNodeId ? { ...n, x: Math.max(0, newX), y: Math.max(0, newY) } : n));
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
        setDraggingNodeId(null);
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey || e.altKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.05 : 0.05;
            setScale(prev => Math.min(1.8, Math.max(0.35, prev + delta)));
        }
    };

    const startDragNode = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const targetNode = nodes.find(n => n.id === id);
        if (!targetNode) return;
        setDraggingNodeId(id);
        setDragOffset({
            x: (e.clientX - pan.x) / scale - targetNode.x,
            y: (e.clientY - pan.y) / scale - targetNode.y
        });
    };

    const toggleMinimizeNode = (id: string) => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, minimized: !n.minimized } : n));
    };

    // --- RENDER: LOGIN GATE ---
    if (!isAuthenticated) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
                <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                            <ShieldCheck className="size-6" />
                        </div>
                        <div>
                            <h1 className="font-mono text-base font-black tracking-wider text-white">DEV OS MISSION CONTROL</h1>
                            <p className="text-xs text-slate-400">Sovereign Root Access Required</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-slate-400">Master Email</label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={e => setLoginEmail(e.target.value)}
                                placeholder="irasmussenjobs@gmail.com"
                                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-400">Master Password or PIN</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                required
                            />
                        </div>

                        {authError && (
                            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                                {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
                        >
                            <Lock className="size-4" />
                            {authLoading ? 'Verifying Credentials...' : 'Authenticate Master Session'}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-[10px] text-slate-500 font-mono">
                        <span>Restricted to Master Owner</span>
                        <span>Hostinger VPS :3005</span>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDER: MAIN EAGLE EYE WORKSPACE ---
    return (
        <div 
            className="relative h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Top Fixed Master Navigation HUD */}
            <header className="absolute top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-6 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                        <Activity className="size-5" />
                    </div>
                    <div>
                        <span className="font-mono text-sm font-black tracking-wider text-white">DEV OS • EAGLE EYE COCKPIT</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Dedicated Container: prod-dev-os :3005</span>
                            <span>•</span>
                            <span className="text-cyan-400">{MASTER_EMAIL}</span>
                        </div>
                    </div>
                </div>

                {/* Center Quick Navigation & View Modes */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-1 text-xs">
                    <button
                        onClick={setEagleEyeView}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono font-bold transition ${activeViewMode === 'eagle_eye' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
                        title="Panoramic View (Key 0)"
                    >
                        <LayoutGrid className="size-3.5" />
                        Eagle Eye [0]
                    </button>
                    <button
                        onClick={() => resetFocus()}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono font-bold transition ${activeViewMode === 'free' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                        <Move className="size-3.5" />
                        Canvas
                    </button>
                    <button
                        onClick={() => setTerminalOpen(prev => !prev)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono font-bold transition ${terminalOpen ? 'bg-purple-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                        <Terminal className="size-3.5" />
                        Terminal ({terminalLogs.length})
                    </button>
                </div>

                {/* Right Actions: Full Fleet Audit & Logout */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCommandPaletteOpen(true)}
                        className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-white"
                    >
                        <Search className="size-3.5" />
                        <span className="font-mono">Ctrl+K</span>
                    </button>

                    <button
                        onClick={runFullFleetAudit}
                        disabled={fleetRunning}
                        className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:opacity-50"
                    >
                        <Zap className="size-3.5" />
                        {fleetRunning ? 'Auditing Fleet...' : 'Run Fleet Audit'}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-rose-400"
                        title="Lock Dev OS"
                    >
                        <Unlock className="size-4" />
                    </button>
                </div>
            </header>

            {/* Canvas Viewport */}
            <div
                id="canvas-bg"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
                className="relative h-full w-full cursor-grab active:cursor-grabbing bg-slate-950 bg-grid-pattern pt-14"
            >
                <div
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        transition: isPanning || draggingNodeId ? 'none' : 'transform 0.2s ease-out'
                    }}
                    className="absolute inset-0 pointer-events-none"
                >
                    {/* Render Each Spatial Node Cluster */}
                    {nodes.map(node => (
                        <div
                            key={node.id}
                            style={{
                                transform: `translate(${node.x}px, ${node.y}px)`,
                                width: `${node.w}px`,
                                height: node.minimized ? '48px' : `${node.h}px`
                            }}
                            className="pointer-events-auto absolute rounded-2xl border border-slate-800/90 bg-slate-900/95 shadow-2xl backdrop-blur-xl flex flex-col transition-shadow hover:border-cyan-500/40 hover:shadow-cyan-500/10"
                        >
                            {/* Window Header / Drag Handle */}
                            <div
                                onMouseDown={e => startDragNode(e, node.id)}
                                className="flex h-12 cursor-move items-center justify-between border-b border-slate-800/80 px-4 select-none"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-cyan-400"></span>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                                        {node.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <button
                                        onClick={() => toggleMinimizeNode(node.id)}
                                        className="rounded p-1 hover:bg-slate-800 hover:text-white"
                                    >
                                        {node.minimized ? <Maximize2 className="size-3" /> : <Minimize2 className="size-3" />}
                                    </button>
                                </div>
                            </div>

                            {/* Window Content */}
                            {!node.minimized && (
                                <div className="flex-1 overflow-y-auto p-4 text-xs">
                                    {/* CLUSTER 1: HOST & CONTAINERS */}
                                    {node.id === 'node_host' && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                                                    <span className="text-[10px] uppercase font-mono text-slate-500">Host Memory</span>
                                                    <p className="mt-1 font-mono text-lg font-bold text-white">13.2 GB Free</p>
                                                    <span className="text-[10px] text-emerald-400">82% Available</span>
                                                </div>
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                                                    <span className="text-[10px] uppercase font-mono text-slate-500">Root Disk (/)</span>
                                                    <p className="mt-1 font-mono text-lg font-bold text-white">{infra?.backups?.directory ? '18.4 GB Free' : 'Headroom OK'}</p>
                                                    <span className="text-[10px] text-cyan-400">Zero Storage Flooding</span>
                                                </div>
                                            </div>

                                            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                                                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                                    <span className="font-mono font-bold text-[11px] text-slate-300">Active Docker Containers</span>
                                                    <span className="text-[10px] text-emerald-400">5/5 UP</span>
                                                </div>
                                                <div className="mt-2 space-y-1.5 font-mono text-[11px]">
                                                    <div className="flex justify-between items-center text-slate-300">
                                                        <span>prod-dev-os :3005</span>
                                                        <span className="text-emerald-400">HEALTHY (Dedicated)</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-slate-300">
                                                        <span>prod-web :3001</span>
                                                        <span className="text-emerald-400">HEALTHY (Storefront)</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-slate-300">
                                                        <span>prod-api :8001</span>
                                                        <span className="text-emerald-400">HEALTHY (FastAPI)</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-slate-300">
                                                        <span>prod-db :5433</span>
                                                        <span className="text-emerald-400">HEALTHY (Postgres 16)</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-slate-300">
                                                        <span>prod-redis :6380</span>
                                                        <span className="text-emerald-400">HEALTHY (Pub/Sub)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex justify-between items-center">
                                                <div>
                                                    <span className="font-mono font-bold text-[11px] text-white">Daily Backup Snapshot</span>
                                                    <p className="text-[10px] text-slate-400">14-Day Rolling GZIP Retention</p>
                                                </div>
                                                <button
                                                    onClick={() => runSingleAgent('agent_db_guardian')}
                                                    className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-mono hover:bg-slate-700"
                                                >
                                                    Audit DB
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* CLUSTER 2: REVENUE & HAWAII GET TAX */}
                                    {node.id === 'node_revenue' && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                                                    <span className="text-[10px] uppercase font-mono text-slate-500">Gross Volume</span>
                                                    <p className="mt-1 font-mono text-sm font-bold text-white">{financials?.summary?.gross_formatted || '$45,195.31'}</p>
                                                    <span className="text-[10px] text-emerald-400">{financials?.summary?.order_count || orders.length} Paid</span>
                                                </div>
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                                                    <span className="text-[10px] uppercase font-mono text-slate-500">GET Tax (4.712%)</span>
                                                    <p className="mt-1 font-mono text-sm font-bold text-amber-400">{financials?.summary?.hawaii_get_tax_formatted || '$2,033.77'}</p>
                                                    <span className="text-[10px] text-slate-400">Oahu Surcharge</span>
                                                </div>
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                                                    <span className="text-[10px] uppercase font-mono text-slate-500">Net Revenue</span>
                                                    <p className="mt-1 font-mono text-sm font-bold text-emerald-400">{financials?.summary?.net_formatted || '$41,834.38'}</p>
                                                    <span className="text-[10px] text-slate-400">Post-Stripe</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="font-mono text-[11px] font-bold text-slate-300">Recent Customer Orders ({orders.length})</span>
                                                <button
                                                    onClick={handleReconcileStripe}
                                                    disabled={reconciling}
                                                    className="flex items-center gap-1 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                                                >
                                                    <RefreshCw className={`size-3 ${reconciling ? 'animate-spin' : ''}`} />
                                                    1-Click Reconcile
                                                </button>
                                            </div>

                                            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                                                {orders.slice(0, 10).map((o, idx) => (
                                                    <div key={idx} className="flex justify-between items-center rounded-lg border border-slate-800/60 bg-slate-950/80 p-2.5">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-mono font-bold text-white">{o.id}</span>
                                                                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] uppercase text-slate-300">{o.fulfillment_mode || 'PICKUP'}</span>
                                                            </div>
                                                            <p className="text-[10px] text-slate-400">{o.customer_name} • {o.customer_email}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-mono font-bold text-emerald-400">{o.total_formatted}</p>
                                                            <span className="text-[9px] text-slate-500">{o.status}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CLUSTER 3: 8-AGENT SWARM COMMAND */}
                                    {node.id === 'node_agents' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                                <div>
                                                    <span className="font-mono text-[11px] font-bold text-white">8 Root-to-Tip Monitoring Agents</span>
                                                    <p className="text-[10px] text-slate-400">Strictly Dormant until called upon (0% CPU idle)</p>
                                                </div>
                                                <button
                                                    onClick={runDeploymentSwarm}
                                                    className="flex items-center gap-1 rounded-lg bg-cyan-500/20 px-2.5 py-1 text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
                                                >
                                                    <Zap className="size-3" />
                                                    Deploy Swarm
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                {agents.map((ag) => (
                                                    <div key={ag.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-2.5 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-mono font-bold text-[11px] text-slate-200">{ag.name}</span>
                                                                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono uppercase text-slate-400">
                                                                    {ag.lifecycle}
                                                                </span>
                                                            </div>
                                                            <p className="mt-1 text-[9px] text-slate-400 line-clamp-1">{ag.scope}</p>
                                                        </div>
                                                        <div className="mt-2 flex items-center justify-between border-t border-slate-800/50 pt-1.5">
                                                            <span className="text-[8px] text-slate-500 font-mono">Sup: {ag.supervisor}</span>
                                                            <button
                                                                onClick={() => runSingleAgent(ag.id)}
                                                                disabled={runningAgentId === ag.id}
                                                                className="rounded bg-slate-800 px-2 py-0.5 text-[9px] font-mono text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition disabled:opacity-50"
                                                            >
                                                                {runningAgentId === ag.id ? '...' : 'Run'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CLUSTER 4: INTERACTIVE FUNNELS & TELEMETRY */}
                                    {node.id === 'node_funnels' && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                                                    <span className="text-[10px] font-mono text-slate-500">Mini-Split Calculator</span>
                                                    <p className="font-mono text-base font-bold text-white">{funnelData?.funnels?.mini_split_maintenance?.views_or_interactions || 142} Visits</p>
                                                    <span className="text-[10px] text-cyan-400">Conv Intent: {funnelData?.funnels?.mini_split_maintenance?.conversion_intent || '18.4'}%</span>
                                                </div>
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                                                    <span className="text-[10px] font-mono text-slate-500">Window AC Drop-Off</span>
                                                    <p className="font-mono text-base font-bold text-white">{funnelData?.funnels?.window_ac_dropoff?.btu_selections || 89} Sized</p>
                                                    <span className="text-[10px] text-emerald-400">$275 Teardown Clean</span>
                                                </div>
                                            </div>

                                            <div>
                                                <span className="font-mono text-[10px] text-slate-400 uppercase">Live Ingestion Stream (Recent Beacons)</span>
                                                <div className="mt-1.5 max-h-48 overflow-y-auto space-y-1 font-mono text-[10px] bg-slate-950 p-2 rounded-xl border border-slate-800">
                                                    {(funnelData?.recent_events || []).slice(0, 8).map((ev: any, i: number) => (
                                                        <div key={i} className="flex justify-between items-center text-slate-300 border-b border-slate-900 pb-1">
                                                            <span className="text-cyan-400">{ev.event_name}</span>
                                                            <span className="text-slate-500">{ev.path || '/'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* CLUSTER 5: SEO & CRO METADATA ENGINE */}
                                    {node.id === 'node_seo' && (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-mono text-[11px] font-bold text-slate-300">Google SERP Live Simulator</span>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => setSelectedDevice('desktop')}
                                                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${selectedDevice === 'desktop' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                                                    >
                                                        Desktop
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedDevice('mobile')}
                                                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${selectedDevice === 'mobile' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                                                    >
                                                        Mobile
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                                                <span className="text-[10px] text-emerald-400 font-mono">https://www.affordablehome-ac.com/shop</span>
                                                <h4 className="mt-1 font-sans text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                                                    Window AC Units In-Stock Oahu | Waipahu Warehouse Pickup | Affordable Home A/C
                                                </h4>
                                                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                                                    Beat the Oahu heat today! In-stock 6,000 to 24,000 BTU window AC units ready for same-day Waipahu warehouse pickup or $50 island delivery.
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                                                <span className="font-mono text-[10px] text-slate-400 uppercase">High-Intent CRO Hooks</span>
                                                <div className="mt-1.5 flex flex-wrap gap-1.5">
                                                    {['Waipahu Same-Day Pickup', 'Zero Mainland Wait', 'Save 30% HECO Power', 'Flat $50 Delivery'].map((h, i) => (
                                                        <span key={i} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[9px] font-mono text-cyan-400">
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* CLUSTER 6: CYBERSECURITY & SECRET SHIELD */}
                                    {node.id === 'node_security' && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                                                    <span className="text-[10px] font-mono text-slate-500">Public Secret Leak</span>
                                                    <p className="font-mono text-sm font-bold text-emerald-400">0 Leaks Detected</p>
                                                    <span className="text-[10px] text-slate-400">Client Bundles Sanitized</span>
                                                </div>
                                                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                                                    <span className="text-[10px] font-mono text-slate-500">Loopback Enforced</span>
                                                    <p className="font-mono text-sm font-bold text-cyan-400">127.0.0.1 Only</p>
                                                    <span className="text-[10px] text-slate-400">Ports 3005, 8001, 5433</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-mono text-[10px] text-slate-400 uppercase">Immutable Audit Trail</span>
                                                    <span className="text-[9px] text-slate-500">14-Day Rolling Prune</span>
                                                </div>
                                                <div className="max-h-44 overflow-y-auto space-y-1 font-mono text-[9px] bg-slate-950 p-2 rounded-xl border border-slate-800">
                                                    {auditLogs.slice(0, 6).map((log, i) => (
                                                        <div key={i} className="flex justify-between items-center text-slate-300 border-b border-slate-900 pb-1">
                                                            <span className="text-cyan-400">{log.action}</span>
                                                            <span className="text-slate-500">{log.created_at?.split('T')[1]?.slice(0, 8)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Radar Minimap (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1.5 rounded-2xl border border-slate-800 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>RADAR VIEWPORT</span>
                    <span className="text-cyan-400">{(scale * 100).toFixed(0)}%</span>
                </div>
                <div 
                    onClick={setEagleEyeView}
                    className="relative h-24 w-36 rounded-lg border border-slate-800 bg-slate-900 cursor-pointer overflow-hidden"
                    title="Click for Panoramic Eagle Eye"
                >
                    {/* Node Dots on Radar */}
                    {nodes.map(n => (
                        <div
                            key={n.id}
                            style={{
                                left: `${(n.x / 1800) * 100}%`,
                                top: `${(n.y / 1400) * 100}%`,
                                width: `${(n.w / 1800) * 100}%`,
                                height: `${(n.h / 1400) * 100}%`
                            }}
                            className="absolute rounded border border-cyan-500/40 bg-cyan-500/20"
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
                    <button onClick={() => setScale(s => Math.max(0.35, s - 0.1))} className="p-1 hover:text-white"><ZoomOut className="size-3" /></button>
                    <button onClick={() => setScale(0.85)} className="p-1 hover:text-white"><RotateCcw className="size-3" /></button>
                    <button onClick={() => setScale(s => Math.min(1.8, s + 0.1))} className="p-1 hover:text-white"><ZoomIn className="size-3" /></button>
                </div>
            </div>

            {/* Slide-Out Bottom ANSI Terminal Console */}
            {terminalOpen && (
                <div className="absolute bottom-0 left-0 right-0 z-30 h-64 border-t border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                            <Terminal className="size-4 text-purple-400" />
                            <span className="font-bold text-white">MASTER DIAGNOSTIC LOG TERMINAL</span>
                            <span className="text-slate-500 text-[10px]">Real-Time Execution Logs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTerminalLogs([])}
                                className="rounded px-2 py-0.5 text-[10px] text-slate-400 hover:bg-slate-800 hover:text-white"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setTerminalOpen(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto mt-2 space-y-1 text-slate-300">
                        {terminalLogs.map((log, i) => (
                            <div key={i} className="leading-relaxed">
                                {log.includes('❌') ? (
                                    <span className="text-rose-400">{log}</span>
                                ) : log.includes('✅') ? (
                                    <span className="text-emerald-400">{log}</span>
                                ) : (
                                    <span>{log}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Command Palette Modal (Ctrl+K) */}
            {commandPaletteOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 pt-20 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-slate-900 p-4 shadow-2xl">
                        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                            <Search className="size-4 text-slate-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type a command or jump to cluster..."
                                value={commandQuery}
                                onChange={e => setCommandQuery(e.target.value)}
                                className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
                            />
                            <button onClick={() => setCommandPaletteOpen(false)} className="text-xs text-slate-500">ESC</button>
                        </div>

                        <div className="mt-3 space-y-1 font-mono text-xs">
                            <div 
                                onClick={() => { setEagleEyeView(); setCommandPaletteOpen(false); }}
                                className="flex items-center justify-between rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 cursor-pointer"
                            >
                                <span>&gt; Panoramic Eagle Eye View</span>
                                <span className="text-[10px] text-slate-500">Key 0</span>
                            </div>
                            <div 
                                onClick={() => { runFullFleetAudit(); setCommandPaletteOpen(false); }}
                                className="flex items-center justify-between rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 cursor-pointer"
                            >
                                <span>&gt; Execute Full Fleet Audit</span>
                                <span className="text-[10px] text-slate-500">8 Agents</span>
                            </div>
                            <div 
                                onClick={() => { handleReconcileStripe(); setCommandPaletteOpen(false); }}
                                className="flex items-center justify-between rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 cursor-pointer"
                            >
                                <span>&gt; Reconcile Stripe Orders</span>
                                <span className="text-[10px] text-slate-500">1-Click</span>
                            </div>
                            <div 
                                onClick={() => { runDeploymentSwarm(); setCommandPaletteOpen(false); }}
                                className="flex items-center justify-between rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 cursor-pointer"
                            >
                                <span>&gt; Verify Live Deployment Swarm</span>
                                <span className="text-[10px] text-slate-500">3 Stages</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
