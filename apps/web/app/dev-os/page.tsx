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
    Move
} from 'lucide-react';

// --- TYPES ---

interface NodePosition {
    id: string;
    title: string;
    x: number;
    y: number;
    w: number;
    color: string;
    minimized: boolean;
}

const DEFAULT_NODES: NodePosition[] = [
    { id: 'analytics', title: 'Funnel Telemetry & Conversion Stream', x: 60, y: 80, w: 540, color: 'cyan', minimized: false },
    { id: 'orders', title: 'Live Orders & Stripe Reconcile Hub', x: 640, y: 80, w: 560, color: 'emerald', minimized: false },
    { id: 'financials', title: 'Accounting & Hawaii GET Tax Ledger (4.712%)', x: 1240, y: 80, w: 500, color: 'amber', minimized: false },
    { id: 'cro', title: 'Window AC & Mini-Split CRO Metadata Engine', x: 60, y: 740, w: 720, color: 'violet', minimized: false },
    { id: 'infrastructure', title: 'Containerized Infrastructure & Health Node', x: 820, y: 740, w: 680, color: 'sky', minimized: false },
];

export default function DevOsPage() {
    // --- AUTHENTICATION STATE ---
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
    const [loginEmail, setLoginEmail] = useState<string>('irasmussenjobs@gmail.com');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    // --- CANVAS VIEWPORT STATE ---
    const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 30 });
    const [zoom, setZoom] = useState<number>(0.85);
    const [isDraggingCanvas, setIsDraggingCanvas] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    // --- NODE POSITIONS ---
    const [nodes, setNodes] = useState<NodePosition[]>(DEFAULT_NODES);
    const [activeDragNode, setActiveDragNode] = useState<string | null>(null);
    const [nodeDragOffset, setNodeDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // --- DATA FEEDS ---
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [ordersData, setOrdersData] = useState<any[]>([]);
    const [financialsData, setFinancialsData] = useState<any>(null);
    const [infrastructureData, setInfrastructureData] = useState<any>(null);
    const [croData, setCroData] = useState<any>(null);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isReconciling, setIsReconciling] = useState<boolean>(false);
    const [reconcileAudit, setReconcileAudit] = useState<any>(null);
    const [activeTabCro, setActiveTabCro] = useState<number>(0);
    const [copiedText, setCopiedText] = useState<string | null>(null);

    // --- INITIALIZE & CHECK AUTH ---
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/v1/dev-os/auth/me', { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated) {
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                setCheckingAuth(false);
            }
        };
        checkAuth();

        // Restore layout from localStorage if available
        try {
            const savedLayout = localStorage.getItem('ahac_dev_os_layout_v2');
            if (savedLayout) {
                const parsed = JSON.parse(savedLayout);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNodes(parsed);
                }
            }
        } catch (e) {
            // Ignore parse errors
        }
    }, []);

    // Save layout changes to localStorage
    const saveLayout = (updatedNodes: NodePosition[]) => {
        setNodes(updatedNodes);
        try {
            localStorage.setItem('ahac_dev_os_layout_v2', JSON.stringify(updatedNodes));
        } catch (e) {}
    };

    // --- DATA FETCHING ---
    const fetchAllData = useCallback(async () => {
        if (!isAuthenticated) return;
        setIsRefreshing(true);
        try {
            const [anaRes, ordRes, finRes, infRes, croRes] = await Promise.all([
                fetch('/api/v1/dev-os/analytics/overview', { credentials: 'include' }),
                fetch('/api/v1/dev-os/orders', { credentials: 'include' }),
                fetch('/api/v1/dev-os/financials', { credentials: 'include' }),
                fetch('/api/v1/dev-os/infrastructure', { credentials: 'include' }),
                fetch('/api/v1/dev-os/cro/metadata', { credentials: 'include' })
            ]);

            if (anaRes.ok) setAnalyticsData(await anaRes.json());
            if (ordRes.ok) {
                const ord = await ordRes.json();
                setOrdersData(ord.orders || []);
            }
            if (finRes.ok) setFinancialsData(await finRes.json());
            if (infRes.ok) setInfrastructureData(await infRes.json());
            if (croRes.ok) setCroData(await croRes.json());
        } catch (err) {
            console.error("Dev OS data sync error:", err);
        } finally {
            setIsRefreshing(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllData();
            const interval = setInterval(fetchAllData, 20000); // Poll every 20s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, fetchAllData]);

    // --- AUTH LOGIN ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        try {
            const res = await fetch('/api/v1/dev-os/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || 'Authentication failed');
            }

            setIsAuthenticated(true);
        } catch (err: any) {
            setLoginError(err.message || 'Access Denied: Master authentication required');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/v1/dev-os/auth/logout', { method: 'POST', credentials: 'include' });
        } catch (e) {}
        setIsAuthenticated(false);
    };

    // --- 1-CLICK STRIPE RECONCILE ---
    const handleTriggerReconcile = async () => {
        setIsReconciling(true);
        setReconcileAudit(null);
        try {
            const res = await fetch('/api/v1/dev-os/orders/reconcile', {
                method: 'POST',
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setReconcileAudit(data.audit);
                // Refresh orders
                fetchAllData();
            }
        } catch (err) {
            console.error("Reconciliation error:", err);
        } finally {
            setIsReconciling(false);
        }
    };

    // --- CANVAS PAN & ZOOM INTERACTION ---
    const handleWheel = (e: React.WheelEvent) => {
        // Prevent scrolling page
        e.preventDefault();
        const zoomFactor = -e.deltaY * 0.0015;
        const newZoom = Math.min(Math.max(zoom + zoomFactor, 0.35), 1.8);
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setPan(prev => ({
            x: mouseX - (mouseX - prev.x) * (newZoom / zoom),
            y: mouseY - (mouseY - prev.y) * (newZoom / zoom),
        }));
        setZoom(newZoom);
    };

    const handleMouseDownCanvas = (e: React.MouseEvent) => {
        // Only trigger canvas drag if clicked directly on canvas background
        if ((e.target as HTMLElement).classList.contains('canvas-surface') || e.button === 1) {
            setIsDraggingCanvas(true);
            setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDraggingCanvas) {
            setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        } else if (activeDragNode) {
            const dx = (e.clientX - nodeDragOffset.x) / zoom;
            const dy = (e.clientY - nodeDragOffset.y) / zoom;
            saveLayout(
                nodes.map(n => n.id === activeDragNode ? { ...n, x: dx, y: dy } : n)
            );
        }
    };

    const handleMouseUp = () => {
        setIsDraggingCanvas(false);
        setActiveDragNode(null);
    };

    const startDragNode = (e: React.MouseEvent, nodeId: string) => {
        e.stopPropagation();
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;
        setActiveDragNode(nodeId);
        setNodeDragOffset({
            x: e.clientX - (node.x * zoom),
            y: e.clientY - (node.y * zoom)
        });
    };

    const toggleMinimizeNode = (nodeId: string) => {
        saveLayout(
            nodes.map(n => n.id === nodeId ? { ...n, minimized: !n.minimized } : n)
        );
    };

    const resetView = () => {
        setPan({ x: 40, y: 30 });
        setZoom(0.85);
    };

    const jumpToNode = (nodeId: string) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setPan({
            x: (rect.width / 2) - (node.x * zoom) - ((node.w * zoom) / 2),
            y: (rect.height / 2) - (node.y * zoom) - 150
        });
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
    };

    // --- CHECKING AUTH SCREEN ---
    if (checkingAuth) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-cyan-400 font-mono">
                <RefreshCw className="size-8 animate-spin mb-4" />
                <div className="text-xs uppercase tracking-[0.3em]">Initializing Secure Dev OS Node...</div>
            </div>
        );
    }

    // --- MASTER LOGIN GATE ---
    if (!isAuthenticated) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
                {/* Background ambient grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                            <Terminal className="size-5" />
                        </div>
                        <div>
                            <h1 className="font-header font-black text-lg text-white tracking-wider uppercase">DEV OS // MASTER ACCESS</h1>
                            <p className="text-[11px] font-mono text-slate-400">Hostinger Oahu VPS • Airtight Terminal Gate</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                                Master Identity
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                                />
                                <Lock className="size-4 text-cyan-400 absolute right-3 top-3" />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono mt-1 block">Restricted strictly to irasmussenjobs@gmail.com</span>
                        </div>

                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                                Master Password / Key
                            </label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Enter secure master key"
                                required
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-400"
                            />
                        </div>

                        {loginError && (
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                                <AlertCircle className="size-4 shrink-0" />
                                <span>{loginError}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-header font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoggingIn ? (
                                <>
                                    <RefreshCw className="size-4 animate-spin" /> Authenticating...
                                </>
                            ) : (
                                <>
                                    <Unlock className="size-4" /> Authenticate Master Session
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>SHA-256 Signed Cookie</span>
                        <span>Oahu Node CT-36775</span>
                    </div>
                </div>
            </div>
        );
    }

    // --- INFINITE CANVAS WORKSPACE ---
    return (
        <div
            className="h-screen w-screen overflow-hidden relative select-none bg-slate-950"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
        >
            {/* CANVAS HUD TOP BAR */}
            <header className="absolute top-0 left-0 right-0 h-14 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="size-3 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="font-header font-black text-sm tracking-wider uppercase text-white">
                            DEV OS // MASTER HUB
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold uppercase">
                            Infinite Canvas
                        </span>
                    </div>

                    <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-slate-800 text-xs font-mono text-slate-400">
                        <span>Master:</span>
                        <span className="text-cyan-400 font-bold">irasmussenjobs@gmail.com</span>
                    </div>
                </div>

                {/* Quick Navigation Node Jump Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    {nodes.map(n => (
                        <button
                            key={n.id}
                            onClick={() => jumpToNode(n.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
                        >
                            {n.id.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleTriggerReconcile}
                        disabled={isReconciling}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                        title="Run On-Demand Stripe Order Auto-Reconciliation"
                    >
                        <RefreshCw className={`size-3.5 ${isReconciling ? 'animate-spin' : ''}`} />
                        <span>{isReconciling ? 'Syncing...' : '1-Click Reconcile'}</span>
                    </button>

                    <button
                        onClick={fetchAllData}
                        disabled={isRefreshing}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Refresh All Feeds"
                    >
                        <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
                    </button>

                    <button
                        onClick={resetView}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Reset Canvas View"
                    >
                        <RotateCcw className="size-4" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-mono font-bold transition-all"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* CANVAS WORKSPACE SURFACE */}
            <div
                ref={canvasRef}
                onMouseDown={handleMouseDownCanvas}
                className="canvas-surface absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, #334155 1.5px, transparent 1.5px),
                        linear-gradient(to right, rgba(30, 41, 59, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(30, 41, 59, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: `${40 * zoom}px ${40 * zoom}px, ${200 * zoom}px ${200 * zoom}px, ${200 * zoom}px ${200 * zoom}px`,
                    backgroundPosition: `${pan.x}px ${pan.y}px`,
                }}
            >
                {/* TRANSFORM WRAPPER CONTAINING ALL NODES */}
                <div
                    className="absolute top-0 left-0 transition-none pointer-events-none"
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: '0 0',
                    }}
                >
                    {/* NODE 1: FUNNEL TELEMETRY & CONVERSION STREAM */}
                    <div
                        className="pointer-events-auto absolute bg-slate-900/95 border border-cyan-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col"
                        style={{
                            left: nodes.find(n => n.id === 'analytics')?.x || 60,
                            top: nodes.find(n => n.id === 'analytics')?.y || 80,
                            width: nodes.find(n => n.id === 'analytics')?.w || 540,
                        }}
                    >
                        {/* Node Drag Handle Header */}
                        <div
                            onMouseDown={(e) => startDragNode(e, 'analytics')}
                            className="p-4 bg-slate-950/80 border-b border-slate-800 rounded-t-2xl cursor-move flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="size-3 rounded-full bg-cyan-400"></div>
                                <span className="font-header font-bold text-xs uppercase tracking-wider text-cyan-300">
                                    Funnel Telemetry & Conversion Stream
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleMinimizeNode('analytics')}
                                    className="text-slate-400 hover:text-white"
                                >
                                    {nodes.find(n => n.id === 'analytics')?.minimized ? <Maximize2 className="size-3.5" /> : <Minimize2 className="size-3.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Node Body */}
                        {!nodes.find(n => n.id === 'analytics')?.minimized && (
                            <div className="p-5 space-y-5 text-slate-200">
                                {/* Funnel KPIs Grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                                        <div className="text-[10px] font-mono uppercase text-slate-400">Mini-Split Views</div>
                                        <div className="text-xl font-header font-black text-cyan-400 mt-1">
                                            {analyticsData?.funnels?.mini_split_maintenance?.views_or_interactions || 0}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                                        <div className="text-[10px] font-mono uppercase text-slate-400">Symptoms Flagged</div>
                                        <div className="text-xl font-header font-black text-amber-400 mt-1">
                                            {analyticsData?.funnels?.mini_split_maintenance?.symptom_checks || 0}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                                        <div className="text-[10px] font-mono uppercase text-slate-400">Window AC Dropoffs</div>
                                        <div className="text-xl font-header font-black text-emerald-400 mt-1">
                                            {analyticsData?.funnels?.window_ac_dropoff?.dropoff_book_clicks || 0}
                                        </div>
                                    </div>
                                </div>

                                {/* Active Funnel Breakdown */}
                                <div className="space-y-3">
                                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                                        Funnel Conversion Intent
                                    </div>

                                    {/* Mini Split Maintenance */}
                                    <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-bold text-white">Mini-Split Deep Clean Calculator</span>
                                            <span className="text-cyan-400 font-mono font-bold">
                                                {analyticsData?.funnels?.mini_split_maintenance?.conversion_intent || 0}% Intent
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-cyan-400 rounded-full"
                                                style={{ width: `${Math.min(analyticsData?.funnels?.mini_split_maintenance?.conversion_intent || 0, 100)}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                            <span>Tier Toggles: {analyticsData?.tallies?.maintenance_tier_toggle || 0}</span>
                                            <span>CTAs Clicked: {analyticsData?.tallies?.maintenance_book_click || 0}</span>
                                        </div>
                                    </div>

                                    {/* Window AC Warehouse Drop-Off */}
                                    <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-bold text-white">Waipahu Window AC $275 Teardown</span>
                                            <span className="text-emerald-400 font-mono font-bold">
                                                {analyticsData?.funnels?.window_ac_dropoff?.conversion_intent || 0}% Intent
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-400 rounded-full"
                                                style={{ width: `${Math.min(analyticsData?.funnels?.window_ac_dropoff?.conversion_intent || 0, 100)}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                            <span>BTU Selected: {analyticsData?.tallies?.window_ac_btu_select || 0}</span>
                                            <span>Drop-Offs Booked: {analyticsData?.tallies?.window_ac_dropoff_book_click || 0}</span>
                                        </div>
                                    </div>

                                    {/* Sizing Wizard */}
                                    <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-bold text-white">Oahu AC Sizing Load Calculator</span>
                                            <span className="text-violet-400 font-mono font-bold">
                                                {analyticsData?.tallies?.sizing_load_calculated || 0} Calculations
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                            <span>Cart Adds: {analyticsData?.tallies?.sizing_add_to_cart || 0}</span>
                                            <span>Pro Lead Tickets: {analyticsData?.tallies?.sizing_pro_lead_click || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Live Telemetry Beacon Log */}
                                <div>
                                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center justify-between">
                                        <span>Live Beacon Events Stream</span>
                                        <span className="text-[10px] text-cyan-400">Auto-Buffer</span>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-[11px] pr-1">
                                        {analyticsData?.recent_events?.length > 0 ? (
                                            analyticsData.recent_events.map((ev: any, idx: number) => (
                                                <div key={idx} className="p-2 bg-slate-950/70 border border-slate-800/80 rounded-lg flex items-center justify-between">
                                                    <div>
                                                        <span className="text-cyan-300 font-bold">{ev.event_name}</span>
                                                        <span className="text-slate-500 text-[9px] ml-2">{ev.path}</span>
                                                    </div>
                                                    <span className="text-slate-500 text-[9px]">
                                                        {new Date(ev.timestamp).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-slate-500 text-xs italic">
                                                Telemetry buffer listening for user interactions...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* NODE 2: LIVE ORDERS & STRIPE RECONCILE HUB */}
                    <div
                        className="pointer-events-auto absolute bg-slate-900/95 border border-emerald-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col"
                        style={{
                            left: nodes.find(n => n.id === 'orders')?.x || 640,
                            top: nodes.find(n => n.id === 'orders')?.y || 80,
                            width: nodes.find(n => n.id === 'orders')?.w || 560,
                        }}
                    >
                        <div
                            onMouseDown={(e) => startDragNode(e, 'orders')}
                            className="p-4 bg-slate-950/80 border-b border-slate-800 rounded-t-2xl cursor-move flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="size-3 rounded-full bg-emerald-400"></div>
                                <span className="font-header font-bold text-xs uppercase tracking-wider text-emerald-300">
                                    Live Orders & Stripe Reconcile Hub ({ordersData.length})
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleMinimizeNode('orders')}
                                    className="text-slate-400 hover:text-white"
                                >
                                    {nodes.find(n => n.id === 'orders')?.minimized ? <Maximize2 className="size-3.5" /> : <Minimize2 className="size-3.5" />}
                                </button>
                            </div>
                        </div>

                        {!nodes.find(n => n.id === 'orders')?.minimized && (
                            <div className="p-5 space-y-4 text-slate-200">
                                {/* Reconcile Status Notice if just ran */}
                                {reconcileAudit && (
                                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300 space-y-1">
                                        <div className="font-bold flex items-center gap-1.5">
                                            <Check className="size-4" /> Stripe Reconciliation Completed
                                        </div>
                                        <div>
                                            Sessions Scanned: {reconcileAudit.scanned || 0} • Recovered: {reconcileAudit.recovered?.length || 0}
                                        </div>
                                    </div>
                                )}

                                {/* Orders Scroll List */}
                                <div className="max-h-[500px] overflow-y-auto space-y-3 pr-1">
                                    {ordersData.map((order) => (
                                        <div
                                            key={order.id}
                                            className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all space-y-2.5"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-bold text-white text-sm">
                                                        {order.id}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                                                        order.status === 'PAID'
                                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <span className="font-header font-black text-white text-base">
                                                    {order.total_formatted}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                                                <div>
                                                    <span className="text-slate-500">Customer: </span>
                                                    <strong className="text-slate-200">{order.customer_name}</strong>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500">Email: </span>
                                                    <span className="text-cyan-400">{order.customer_email}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500">Fulfillment: </span>
                                                    <span className="uppercase text-emerald-300 font-bold">{order.fulfillment_mode}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500">Date: </span>
                                                    <span>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</span>
                                                </div>
                                            </div>

                                            {/* Stripe PID */}
                                            {order.stripe_pid && (
                                                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                                                    <span>PID: {order.stripe_pid}</span>
                                                    <button
                                                        onClick={() => copyToClipboard(order.stripe_pid, `pid_${order.id}`)}
                                                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                                    >
                                                        {copiedText === `pid_${order.id}` ? <Check className="size-3" /> : <Copy className="size-3" />}
                                                        <span>Copy</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* NODE 3: ACCOUNTING & HAWAII GET TAX LEDGER */}
                    <div
                        className="pointer-events-auto absolute bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col"
                        style={{
                            left: nodes.find(n => n.id === 'financials')?.x || 1240,
                            top: nodes.find(n => n.id === 'financials')?.y || 80,
                            width: nodes.find(n => n.id === 'financials')?.w || 500,
                        }}
                    >
                        <div
                            onMouseDown={(e) => startDragNode(e, 'financials')}
                            className="p-4 bg-slate-950/80 border-b border-slate-800 rounded-t-2xl cursor-move flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="size-3 rounded-full bg-amber-400"></div>
                                <span className="font-header font-bold text-xs uppercase tracking-wider text-amber-300">
                                    Accounting & Hawaii GET Tax (4.712%)
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleMinimizeNode('financials')}
                                    className="text-slate-400 hover:text-white"
                                >
                                    {nodes.find(n => n.id === 'financials')?.minimized ? <Maximize2 className="size-3.5" /> : <Minimize2 className="size-3.5" />}
                                </button>
                            </div>
                        </div>

                        {!nodes.find(n => n.id === 'financials')?.minimized && (
                            <div className="p-5 space-y-5 text-slate-200">
                                {/* Gross & Net Big Numbers */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                                        <div className="text-[10px] font-mono uppercase text-slate-400">Gross Sales Volume</div>
                                        <div className="text-2xl font-header font-black text-white mt-1">
                                            {financialsData?.summary?.gross_formatted || '$0.00'}
                                        </div>
                                        <div className="text-[10px] font-mono text-slate-500 mt-1">
                                            {financialsData?.summary?.order_count || 0} Paid Orders
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                                        <div className="text-[10px] font-mono uppercase text-emerald-400">Net Estimated Payout</div>
                                        <div className="text-2xl font-header font-black text-emerald-400 mt-1">
                                            {financialsData?.summary?.net_formatted || '$0.00'}
                                        </div>
                                        <div className="text-[10px] font-mono text-slate-500 mt-1">
                                            Post-Tax & Pmt Fees
                                        </div>
                                    </div>
                                </div>

                                {/* Hawaii Tax & Stripe Fee Breakdown */}
                                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3 text-xs font-mono">
                                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                        <span className="text-slate-400">Hawaii General Excise Tax:</span>
                                        <span className="font-bold text-amber-400">
                                            {financialsData?.summary?.hawaii_get_tax_formatted || '$0.00'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                        <span className="text-slate-400">GET Rate Surcharge:</span>
                                        <span className="text-slate-300">4.712% (Oahu County)</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                        <span className="text-slate-400">Stripe Processing Fees:</span>
                                        <span className="font-bold text-rose-400">
                                            -{financialsData?.summary?.stripe_fees_formatted || '$0.00'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-slate-400">Effective Payout Margin:</span>
                                        <span className="font-bold text-emerald-400">~92.3% Net</span>
                                    </div>
                                </div>

                                {/* Pickup vs Delivery Split */}
                                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                                    <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                                        <div className="text-slate-400 text-[10px] uppercase flex items-center gap-1">
                                            <Warehouse className="size-3 text-cyan-400" /> Waipahu Pickup
                                        </div>
                                        <div className="text-base font-bold text-white mt-1">
                                            {financialsData?.breakdown?.pickup?.volume_formatted || '$0.00'}
                                        </div>
                                        <div className="text-[10px] text-slate-500">
                                            {financialsData?.breakdown?.pickup?.count || 0} Units
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                                        <div className="text-slate-400 text-[10px] uppercase flex items-center gap-1">
                                            <Truck className="size-3 text-cyan-400" /> Island Delivery
                                        </div>
                                        <div className="text-base font-bold text-white mt-1">
                                            {financialsData?.breakdown?.delivery?.volume_formatted || '$0.00'}
                                        </div>
                                        <div className="text-[10px] text-slate-500">
                                            {financialsData?.breakdown?.delivery?.count || 0} Orders
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* NODE 4: WINDOW AC & MINI-SPLIT CRO METADATA ENGINE */}
                    <div
                        className="pointer-events-auto absolute bg-slate-900/95 border border-violet-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col"
                        style={{
                            left: nodes.find(n => n.id === 'cro')?.x || 60,
                            top: nodes.find(n => n.id === 'cro')?.y || 740,
                            width: nodes.find(n => n.id === 'cro')?.w || 720,
                        }}
                    >
                        <div
                            onMouseDown={(e) => startDragNode(e, 'cro')}
                            className="p-4 bg-slate-950/80 border-b border-slate-800 rounded-t-2xl cursor-move flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="size-3 rounded-full bg-violet-400"></div>
                                <span className="font-header font-bold text-xs uppercase tracking-wider text-violet-300">
                                    Window AC & Mini-Split CRO Metadata Engine
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleMinimizeNode('cro')}
                                    className="text-slate-400 hover:text-white"
                                >
                                    {nodes.find(n => n.id === 'cro')?.minimized ? <Maximize2 className="size-3.5" /> : <Minimize2 className="size-3.5" />}
                                </button>
                            </div>
                        </div>

                        {!nodes.find(n => n.id === 'cro')?.minimized && (
                            <div className="p-5 space-y-5 text-slate-200">
                                {/* Tab Selector */}
                                <div className="flex gap-2">
                                    {croData?.recommendations?.map((rec: any, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTabCro(idx)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                                                activeTabCro === idx
                                                    ? 'bg-violet-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                                                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {rec.target_page}
                                        </button>
                                    ))}
                                </div>

                                {croData?.recommendations?.[activeTabCro] && (
                                    <div className="space-y-4">
                                        {/* Google SERP Live Snippet Simulator */}
                                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1 font-sans">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                                                <span className="text-emerald-400">https://www.affordablehome-ac.com</span>
                                                <span className="text-slate-600">&rsaquo;</span>
                                                <span>{croData.recommendations[activeTabCro].target_page.replace('/', '')}</span>
                                            </div>
                                            <h4 className="text-base text-cyan-400 hover:underline font-medium cursor-pointer">
                                                {croData.recommendations[activeTabCro].optimized_title}
                                            </h4>
                                            <p className="text-xs text-slate-300 leading-relaxed font-light">
                                                {croData.recommendations[activeTabCro].optimized_meta_desc}
                                            </p>
                                        </div>

                                        {/* Conversion Intent Hooks */}
                                        <div className="space-y-2">
                                            <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">
                                                High-Intent Oahu Conversion Hooks:
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {croData.recommendations[activeTabCro].intent_hooks.map((hook: string, hIdx: number) => (
                                                    <div
                                                        key={hIdx}
                                                        className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs font-mono text-cyan-300 flex items-center justify-between"
                                                    >
                                                        <span>{hook}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(hook, `hook_${hIdx}`)}
                                                            className="text-slate-500 hover:text-white ml-2"
                                                        >
                                                            {copiedText === `hook_${hIdx}` ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Uplift Indicator */}
                                        <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-xl flex items-center justify-between text-xs font-mono">
                                            <span className="text-violet-300">Projected CTR & Window Unit Sales Uplift:</span>
                                            <span className="font-bold text-emerald-400 text-sm">{croData.recommendations[activeTabCro].estimated_ctr_uplift}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* NODE 5: CONTAINERIZED INFRASTRUCTURE & HEALTH */}
                    <div
                        className="pointer-events-auto absolute bg-slate-900/95 border border-sky-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col"
                        style={{
                            left: nodes.find(n => n.id === 'infrastructure')?.x || 820,
                            top: nodes.find(n => n.id === 'infrastructure')?.y || 740,
                            width: nodes.find(n => n.id === 'infrastructure')?.w || 680,
                        }}
                    >
                        <div
                            onMouseDown={(e) => startDragNode(e, 'infrastructure')}
                            className="p-4 bg-slate-950/80 border-b border-slate-800 rounded-t-2xl cursor-move flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="size-3 rounded-full bg-sky-400"></div>
                                <span className="font-header font-bold text-xs uppercase tracking-wider text-sky-300">
                                    Containerized Infrastructure & Health Node
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleMinimizeNode('infrastructure')}
                                    className="text-slate-400 hover:text-white"
                                >
                                    {nodes.find(n => n.id === 'infrastructure')?.minimized ? <Maximize2 className="size-3.5" /> : <Minimize2 className="size-3.5" />}
                                </button>
                            </div>
                        </div>

                        {!nodes.find(n => n.id === 'infrastructure')?.minimized && (
                            <div className="p-5 space-y-5 text-slate-200">
                                {/* Docker Containers Matrix */}
                                <div className="space-y-2.5">
                                    <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">
                                        Hostinger Docker Container Matrix (31.220.53.132)
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {infrastructureData?.containers?.map((c: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold text-white text-xs">{c.name}</span>
                                                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                        {c.status}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-mono">{c.service}</div>
                                                <div className="text-[10px] text-cyan-400 font-mono">Port: {c.port} &rarr; {c.internal_port}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Automated Database Backup Status */}
                                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs font-mono">
                                    <div className="flex items-center justify-between text-cyan-300 font-bold uppercase">
                                        <span className="flex items-center gap-1.5">
                                            <Database className="size-4 text-cyan-400" /> PostgreSQL Daily Rolling Backups
                                        </span>
                                        <span className="text-emerald-400">Active</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-slate-400 text-[11px]">
                                        <div>Script: <strong className="text-slate-300">/etc/cron.daily/backup-ahac-db</strong></div>
                                        <div>Retention: <strong className="text-slate-300">14-Day Gzip Rolling</strong></div>
                                        <div>Target: <strong className="text-slate-300">/var/backups/ahac_db</strong></div>
                                        <div>PostgreSQL: <strong className="text-emerald-400">prod-db:5432</strong></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MINI-MAP (Bottom Right Radar) */}
            <div className="absolute bottom-6 right-6 w-56 h-40 bg-slate-900/90 border border-slate-800/90 rounded-xl shadow-2xl backdrop-blur-md p-2 z-50 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-800">
                    <span>Radar Map (1:20)</span>
                    <span className="text-cyan-400">{Math.round(zoom * 100)}%</span>
                </div>

                {/* Radar Grid Mini Representation */}
                <div className="relative flex-1 my-1 bg-slate-950 rounded border border-slate-800/80 overflow-hidden">
                    {/* Nodes Mini Markers */}
                    {nodes.map(n => (
                        <div
                            key={n.id}
                            className="absolute rounded border text-[7px] font-mono overflow-hidden flex items-center justify-center"
                            style={{
                                left: `${(n.x / 2000) * 100}%`,
                                top: `${(n.y / 1500) * 100}%`,
                                width: `${(n.w / 2000) * 100}%`,
                                height: '22%',
                                borderColor: n.color === 'cyan' ? '#06b6d4' : n.color === 'emerald' ? '#10b981' : n.color === 'amber' ? '#f59e0b' : '#8b5cf6',
                                backgroundColor: n.color === 'cyan' ? 'rgba(6,182,212,0.2)' : 'rgba(16,185,129,0.2)'
                            }}
                            onClick={() => jumpToNode(n.id)}
                        >
                            <span className="text-[6px] text-slate-300 uppercase">{n.id}</span>
                        </div>
                    ))}
                </div>

                {/* Controls HUD */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-slate-400">
                    <button
                        onClick={() => setZoom(z => Math.min(z + 0.15, 1.8))}
                        className="p-1 hover:text-white"
                        title="Zoom In"
                    >
                        <ZoomIn className="size-3.5" />
                    </button>
                    <button
                        onClick={() => setZoom(z => Math.max(z - 0.15, 0.35))}
                        className="p-1 hover:text-white"
                        title="Zoom Out"
                    >
                        <ZoomOut className="size-3.5" />
                    </button>
                    <button
                        onClick={resetView}
                        className="p-1 hover:text-white"
                        title="Reset View"
                    >
                        <RotateCcw className="size-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
