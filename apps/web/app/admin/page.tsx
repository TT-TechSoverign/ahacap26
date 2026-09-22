'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import content from '@/lib/content/content.json';
import { AdminCalendar } from '@/components/AdminCalendar';
import { useContent } from '@/lib/context/ContentContext';
import NavbarV2 from '@/components/NavbarV2';
import { cn } from '@/lib/utils';
import { 
    Lock, 
    Settings, 
    Package, 
    Receipt, 
    Users, 
    Calendar, 
    Plus, 
    ShoppingBag, 
    LogOut, 
    Image as ImageIcon, 
    Edit, 
    Trash2, 
    Eye, 
    UserCog, 
    X, 
    ChevronDown, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Save, 
    CheckCircle2,
    Search,
    FileSpreadsheet,
    Download,
    RefreshCw,
    ExternalLink,
    Copy,
    Check,
    Truck,
    Ruler,
    Maximize2,
    Filter,
    AlertTriangle,
    Clock
} from 'lucide-react';

const TabIconMap = {
    inventory: Package,
    orders: Receipt,
    leads: Users,
    schedule: Calendar,
};

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    subcategory?: string;
    stock: number;
    image_url?: string;
    btu?: number;
    voltage?: string;
    coverage?: string;
    coverage_aham?: string;
    coverage_oahu?: string;
    sizing_notes?: string;
    min_window_height?: string;
    min_window_width?: string;
    max_window_width?: string;
    chassis_type?: string;
    shipping_weight?: string;
    ceer_rating?: string;
    dry_air_flow_cfm?: string;
    performance_specs?: string;
    key_spec?: string;
    noise_level?: string;
    dehumidification?: string;
    dimensions?: string;
    weight?: string;
    warranty?: string;
    promo_price?: number;
    discount_percent?: number;
}

interface Order {
    id: string;
    status: string;
    total_cents: number;
    customer_email?: string;
    customer_name?: string;
    customer_phone?: string;
    customer_address?: string;
    items_json?: string;
    fulfillment_mode?: string;
    created_at: string;
}

interface Lead {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    service_type: string;
    urgency: string;
    notes?: string;
    status: string;
    created_at: string;
}

type Tab = 'inventory' | 'orders' | 'leads' | 'schedule';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('inventory');
    const [error, setError] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [viewingLead, setViewingLead] = useState<Lead | null>(null);
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

    // Search and filter states
    const [inventorySearch, setInventorySearch] = useState('');
    const [inventoryCategory, setInventoryCategory] = useState<string>('ALL');

    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
    const [isReconciling, setIsReconciling] = useState(false);
    const [reconcileMessage, setReconcileMessage] = useState('');

    const [leadSearch, setLeadSearch] = useState('');
    const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');
    const [leadUrgencyFilter, setLeadUrgencyFilter] = useState<string>('ALL');

    const adminFetch = useCallback(async (url: string, options: RequestInit = {}) => {
        const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': token } : {}),
            ...options.headers,
        };
        try {
            const res = await fetch(url, { ...options, headers });
            if (res.status === 401) {
                sessionStorage.removeItem('admin_token');
                setIsAuthenticated(false);
            }
            return res;
        } catch (err) {
            console.error('Fetch error:', err);
            throw err;
        }
    }, []);

    // --- Scroll Sync Logic Removed ---

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/v1/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.token) {
                    sessionStorage.setItem('admin_token', data.token);
                }
                setIsAuthenticated(true);
                setError('');
            } else {
                setError('INVALID ACCESS CODE');
                setPin('');
            }
        } catch (err) {
            setError('CONNECTION ERROR');
            setPin('');
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/v1/admin/logout', { method: 'POST' });
        } catch (err) {}
        sessionStorage.removeItem('admin_token');
        setIsAuthenticated(false);
    };

    // Auto-check session on mount
    useEffect(() => {
        const token = sessionStorage.getItem('admin_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/products`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (err) {
            console.error('Failed to fetch products', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await adminFetch(`/api/v1/admin/orders`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    }, [adminFetch]);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await adminFetch(`/api/v1/admin/leads`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (err) {
            console.error('Failed to fetch leads', err);
        } finally {
            setLoading(false);
        }
    }, [adminFetch]);

    const refreshData = useCallback(() => {
        if (activeTab === 'inventory') fetchProducts();
        if (activeTab === 'orders') fetchOrders();
        if (activeTab === 'leads') fetchLeads();
    }, [activeTab, fetchProducts, fetchOrders, fetchLeads]);

    useEffect(() => {
        if (isAuthenticated) {
            refreshData();
        }
    }, [isAuthenticated, refreshData]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await adminFetch(`/api/v1/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) fetchProducts();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30 flex items-center justify-center">
                {/* Navbar Removed for Clean Login */}

                <div className="container mx-auto px-6 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md p-8 bg-[#0a0e14] border border-white/5 rounded-3xl shadow-2xl shadow-primary/5"
                    >
                        <div className="text-center mb-10">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-[0_0_20px_rgba(0,174,239,0.15)]">
                                <Lock className="size-8 text-primary" />
                            </div>
                            <h1 className="text-2xl font-header font-black uppercase tracking-tight mb-2 text-white">AHAC Admin</h1>
                            <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">Authorized Access Only</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-slate-400 text-[9px] font-black uppercase tracking-widest ml-1">4-Digit PIN or Master Password</label>
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className={cn(
                                        "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-700",
                                        pin.length <= 4 ? "text-xl tracking-[1em]" : "text-sm font-mono tracking-wider"
                                    )}
                                    maxLength={64}
                                    autoFocus
                                    placeholder="••••"
                                />
                            </div>
                            {error && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest text-center animate-pulse">{error}</p>}
                            <button className="w-full bg-primary text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/20 text-xs">
                                {content.admin.login.button}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-[9px] text-slate-700 font-bold uppercase tracking-widest border-t border-white/5 pt-4">
                            {content.admin.login.version}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans pb-20 pt-[40px]">
            {/* Admin Header - Static */}
            <header
                className="w-full bg-[#06090e]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-lg shadow-black/50 sticky top-0 z-40 mb-8"
            >
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="size-11 bg-gradient-to-tr from-primary to-[#00f3ff] rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/30"
                                >
                                    <Settings className="size-5 text-black" strokeWidth={2.5} />
                                </motion.div>
                                <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl -z-10 group-hover:bg-primary/40 transition-all duration-300" />
                            </div>
                            <div className="hidden sm:block">
                                <h2 className="text-white font-header font-black tracking-widest uppercase text-lg leading-none flex items-center gap-2">
                                    {content.admin.nav.title}
                                    <span className="inline-block size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                                </h2>
                                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 font-mono">{content.admin.nav.subtitle}</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <nav className="flex items-center bg-black/50 p-1.5 rounded-xl border border-white/5 relative w-full sm:w-auto justify-center sm:justify-start">
                            {(['inventory', 'orders', 'leads', 'schedule'] as const).map((tab) => {
                                const isActive = activeTab === tab;
                                const TabIcon = TabIconMap[tab];
                                return (
                                    <button
                                        key={tab}
                                        //@ts-ignore
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors z-10 flex items-center gap-1.5 ${
                                            isActive ? 'text-black font-extrabold' : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-admin-tab"
                                                className="absolute inset-0 bg-white rounded-lg -z-10 shadow-lg shadow-white/10"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <TabIcon className="size-4" />
                                        {tab === 'schedule' ? 'Schedule' : content.admin.tabs[tab as keyof typeof content.admin.tabs]}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <Link 
                            href="/dev-os" 
                            target="_blank"
                            className="text-cyan-400 hover:text-white transition-all text-[10px] font-mono font-bold uppercase tracking-widest border border-cyan-500/20 px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-500/40"
                            title="Open Dev OS Autonomous Brain & Swarm Fleet"
                        >
                            <span>Dev OS ↗</span>
                        </Link>
                        {activeTab === 'inventory' && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-white text-black px-6 py-2.5 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-2 shadow-lg shadow-white/5 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <Plus className="size-4" /> {content.admin.nav.add_product}
                            </button>
                        )}
                        <Link 
                            href="/shop" 
                            className="text-slate-300 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest border border-white/10 px-5 py-2.5 rounded-lg hidden md:flex items-center gap-1.5 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <ShoppingBag className="size-4" />
                            {content.admin.nav.view_shop}
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="size-11 flex items-center justify-center rounded-xl border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/40 transition-all hover:scale-105 active:scale-95"
                            title="Logout"
                        >
                            <LogOut className="size-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 pt-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {activeTab === 'inventory' && (
                        <>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{content.admin.stats.inventory.total}</p>
                                <p className="text-3xl text-white font-header font-bold">{products.length}</p>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{content.admin.stats.inventory.value}</p>
                                <p className="text-3xl text-primary font-header font-bold">${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}</p>
                            </div>
                        </>
                    )}
                    {activeTab === 'orders' && (
                        <>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{content.admin.stats.orders.total}</p>
                                <p className="text-3xl text-white font-header font-bold">{orders.length}</p>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{content.admin.stats.orders.revenue}</p>
                                <p className="text-3xl text-emerald-500 font-header font-bold">${orders.reduce((acc, o) => acc + (o.total_cents / 100), 0).toLocaleString()}</p>
                            </div>
                        </>
                    )}
                    {activeTab === 'leads' && (
                        <>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{content.admin.stats.leads.active}</p>
                                <p className="text-3xl text-white font-header font-bold">{leads.length}</p>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{content.admin.stats.leads.urgent}</p>
                                <p className="text-3xl text-red-500 font-header font-bold">{leads.filter(l => l.urgency === 'ASAP').length}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Content Views */}
                <div className="bg-[#0a0e14] border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
                    {loading && activeTab !== 'schedule' ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin size-8 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {activeTab === 'inventory' && (
                                <motion.div
                                    key="inventory"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    {/* Inventory Search & Category Controls */}
                                    <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01]">
                                        <div className="relative w-full md:w-80">
                                            <Search className="size-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input 
                                                type="text"
                                                placeholder="Search model, BTU, specs..."
                                                value={inventorySearch}
                                                onChange={(e) => setInventorySearch(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:border-primary/50 focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                                            {['ALL', 'dual_inverter', 'universal_fit', 'base', 'ge', 'casement'].map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setInventoryCategory(cat)}
                                                    className={cn(
                                                        "px-3 py-1.5 rounded-lg text-[9px] font-header font-black uppercase tracking-wider transition-all whitespace-nowrap",
                                                        inventoryCategory === cat 
                                                            ? "bg-primary text-black font-black shadow-sm" 
                                                            : "bg-white/5 text-slate-400 hover:text-white"
                                                    )}
                                                >
                                                    {cat === 'ALL' ? 'All Models' : cat.replace('_', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Desktop Table View */}
                                    <table className="w-full text-left border-collapse hidden md:table">
                                        <thead>
                                            <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-6 py-4">Image</th>
                                                <th className="px-6 py-4">Product Name &amp; Sizing</th>
                                                <th className="px-6 py-4 text-center">Category</th>
                                                <th className="px-6 py-4 text-right">Price</th>
                                                <th className="px-6 py-4 text-center">Stock</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredProducts.map(product => (
                                                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-6 py-5">
                                                        <div className="size-16 bg-black rounded-lg border border-white/10 overflow-hidden relative">
                                                            {product.image_url ? (
                                                                <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
                                                            ) : (
                                                                <div className="absolute inset-0 flex items-center justify-center text-slate-800">
                                                                    <ImageIcon className="size-8" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="text-white font-bold uppercase tracking-wide text-sm">{product.name}</div>
                                                        <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono mt-1">
                                                            <span className="text-slate-500">ID: {product.id}</span>
                                                            <span className="text-slate-400">• AHAM: {product.coverage_aham || product.coverage || 'Rated'}</span>
                                                            <span className="text-cyan-400">• Island: {product.coverage_oahu || 'Calibrated'}</span>
                                                            {product.min_window_height && (
                                                                <span className="text-emerald-400">• Min Win: {product.min_window_height} H</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className="px-2.5 py-1 bg-white/5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/10">
                                                            {product.subcategory || product.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-right font-header font-bold text-base text-white">
                                                        ${product.price.toFixed(2)}
                                                        {product.promo_price ? (
                                                            <div className="text-[10px] font-mono text-cyan-400 font-normal">
                                                                Promo: ${product.promo_price.toFixed(2)}
                                                            </div>
                                                        ) : null}
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <div className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-slate-400'}`}>{product.stock}</div>
                                                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                                {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => setEditingProduct(product)} className="size-9 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-black transition-all flex items-center justify-center" title="Edit Product Specs">
                                                                <Edit className="size-4" />
                                                            </button>
                                                            <button onClick={() => handleDelete(product.id)} className="size-9 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center justify-center" title="Delete Product">
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Mobile Stacked Card View */}
                                    <div className="md:hidden divide-y divide-white/5">
                                        {filteredProducts.map(product => (
                                            <div key={product.id} className="p-4 space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="size-16 bg-black rounded-lg border border-white/10 overflow-hidden relative shrink-0">
                                                        {product.image_url ? (
                                                            <Image src={product.image_url} alt={product.name} fill className="object-contain p-1" />
                                                        ) : (
                                                            <div className="absolute inset-0 flex items-center justify-center text-slate-800">
                                                                <ImageIcon className="size-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-white font-bold text-xs uppercase truncate">{product.name}</div>
                                                        <div className="text-primary font-header font-bold text-sm mt-0.5">
                                                            ${product.price.toFixed(2)}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500'}`}>
                                                                {product.stock} In Stock
                                                            </span>
                                                            <span className="text-[9px] font-mono text-slate-500">ID: {product.id}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <button onClick={() => setEditingProduct(product)} className="size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                                            <Edit className="size-3.5" />
                                                        </button>
                                                        <button onClick={() => handleDelete(product.id)} className="size-8 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center">
                                                            <Trash2 className="size-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[9px] font-mono space-y-0.5">
                                                    <div className="text-slate-400">AHAM: <span className="text-white">{product.coverage_aham || product.coverage || 'Rated'}</span></div>
                                                    <div className="text-cyan-400">Island: <span className="text-cyan-300 font-bold">{product.coverage_oahu || 'Calibrated'}</span></div>
                                                    {product.min_window_height && (
                                                        <div className="text-emerald-400">Min Win: <span className="text-emerald-300">{product.min_window_height} H</span></div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    {/* Orders Search, Filter & Action Bar */}
                                    <div className="p-4 md:p-6 border-b border-white/5 space-y-4 bg-white/[0.01]">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="relative w-full md:w-80">
                                                <Search className="size-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <input 
                                                    type="text"
                                                    placeholder="Search customer, email, order ID..."
                                                    value={orderSearch}
                                                    onChange={(e) => setOrderSearch(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:border-primary/50 focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                                <button
                                                    type="button"
                                                    onClick={handleReconcileStripe}
                                                    disabled={isReconciling}
                                                    className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-header font-black uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
                                                    title="Reconcile unrecorded orders with Stripe API"
                                                >
                                                    <RefreshCw className={cn("size-3.5", isReconciling && "animate-spin")} />
                                                    <span>{isReconciling ? 'Reconciling...' : 'Reconcile Stripe'}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleExportOrdersCsv}
                                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-header font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                                                    title="Export Orders CSV for Oahu GET Tax accounting"
                                                >
                                                    <Download className="size-3.5" />
                                                    <span>Export CSV</span>
                                                </button>
                                            </div>
                                        </div>

                                        {reconcileMessage && (
                                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium flex items-center justify-between">
                                                <span>✓ {reconcileMessage}</span>
                                                <button onClick={() => setReconcileMessage('')} className="text-emerald-500 hover:text-white">✕</button>
                                            </div>
                                        )}

                                        {/* Status Filter Pills */}
                                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                                            {['ALL', 'PAID', 'AWAIT_PAYMENT', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(st => (
                                                <button
                                                    key={st}
                                                    type="button"
                                                    onClick={() => setOrderStatusFilter(st)}
                                                    className={cn(
                                                        "px-3 py-1.5 rounded-lg text-[9px] font-header font-black uppercase tracking-wider transition-all whitespace-nowrap",
                                                        orderStatusFilter === st 
                                                            ? "bg-white text-black font-black shadow-sm" 
                                                            : "bg-white/5 text-slate-400 hover:text-white"
                                                    )}
                                                >
                                                    {st === 'ALL' ? 'All Orders' : st.replace('_', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Desktop Table */}
                                    <table className="w-full text-left border-collapse hidden md:table">
                                        <thead>
                                            <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-6 py-4">Order ID</th>
                                                <th className="px-6 py-4">Customer &amp; Fulfillment</th>
                                                <th className="px-6 py-4 text-center">Date</th>
                                                <th className="px-6 py-4 text-center">Status</th>
                                                <th className="px-6 py-4 text-right">Total &amp; GET Tax</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredOrders.map(order => {
                                                const total = order.total_cents / 100;
                                                const getTax = (total * 0.04712 / 1.04712).toFixed(2);
                                                return (
                                                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="px-6 py-5 font-mono text-[10px] text-primary">{order.id}</td>
                                                        <td className="px-6 py-5">
                                                            <div className="text-white font-bold">{order.customer_name || 'Anonymous User'}</div>
                                                            <div className="text-slate-500 text-[9px] font-black tracking-widest mt-0.5">{order.customer_email || 'No email provided'}</div>
                                                            <div className="mt-1.5">
                                                                {order.fulfillment_mode === 'delivery' ? (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                                        🚚 Oahu Delivery ($50)
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                                        📦 Waipahu Pickup ($0)
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-center text-[10px] text-slate-500 font-mono">
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-5 text-center">
                                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                order.status === 'SHIPPED' ? 'bg-primary/10 text-primary border-primary/20' :
                                                                    order.status === 'DELIVERED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                                        order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                                }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-5 text-right font-header font-bold text-white">
                                                            <div>${total.toFixed(2)}</div>
                                                            <div className="text-[9px] font-mono text-slate-500 font-normal">GET: ${getTax}</div>
                                                        </td>
                                                        <td className="px-6 py-5 text-right">
                                                            <button onClick={() => setViewingOrder(order)} className="size-9 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center ml-auto" title="View Manifest & Receipt">
                                                                <Eye className="size-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                    {/* Mobile Stacked Card View */}
                                    <div className="md:hidden divide-y divide-white/5">
                                        {filteredOrders.map(order => {
                                            const total = order.total_cents / 100;
                                            return (
                                                <div key={order.id} className="p-4 space-y-2.5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <div className="text-white font-bold text-xs">{order.customer_name || 'Anonymous User'}</div>
                                                            <div className="text-[9px] font-mono text-primary">{order.id}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-white font-header font-bold text-sm">${total.toFixed(2)}</div>
                                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${order.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-white/5 text-slate-400'}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between text-[9px] pt-1">
                                                        <span className="text-slate-400">{order.customer_email || 'No email'}</span>
                                                        <button onClick={() => setViewingOrder(order)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-cyan-400 font-mono rounded text-[9px] flex items-center gap-1">
                                                            <Eye className="size-3" /> Manifest
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'leads' && (
                                <motion.div
                                    key="leads"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    {/* Leads Search & Filter Controls */}
                                    <div className="p-4 md:p-6 border-b border-white/5 space-y-4 bg-white/[0.01]">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="relative w-full md:w-80">
                                                <Search className="size-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <input 
                                                    type="text"
                                                    placeholder="Search customer, phone, city, notes..."
                                                    value={leadSearch}
                                                    onChange={(e) => setLeadSearch(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:border-primary/50 focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                                                {['ALL', 'ASAP', 'NEW', 'CONTACTED', 'SCHEDULED', 'COMPLETED'].map(st => (
                                                    <button
                                                        key={st}
                                                        type="button"
                                                        onClick={() => {
                                                            if (st === 'ASAP') {
                                                                setLeadUrgencyFilter(leadUrgencyFilter === 'ASAP' ? 'ALL' : 'ASAP');
                                                            } else {
                                                                setLeadStatusFilter(st);
                                                            }
                                                        }}
                                                        className={cn(
                                                            "px-3 py-1.5 rounded-lg text-[9px] font-header font-black uppercase tracking-wider transition-all whitespace-nowrap",
                                                            (st === 'ASAP' && leadUrgencyFilter === 'ASAP') || (st !== 'ASAP' && leadStatusFilter === st && leadUrgencyFilter !== 'ASAP')
                                                                ? st === 'ASAP' ? "bg-red-500 text-white font-black" : "bg-primary text-black font-black shadow-sm"
                                                                : "bg-white/5 text-slate-400 hover:text-white"
                                                        )}
                                                    >
                                                        {st === 'ASAP' ? '⚡ Urgent (ASAP)' : st === 'ALL' ? 'All Leads' : st}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Table View */}
                                    <table className="w-full text-left border-collapse hidden md:table">
                                        <thead>
                                            <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-6 py-4">Requestor</th>
                                                <th className="px-6 py-4">Service Type</th>
                                                <th className="px-6 py-4 text-center">Urgency</th>
                                                <th className="px-6 py-4 text-center">Status</th>
                                                <th className="px-6 py-4 text-center">Date</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredLeads.map(lead => (
                                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-6 py-5">
                                                        <div className="text-white font-bold uppercase tracking-wide">{lead.first_name} {lead.last_name}</div>
                                                        <div className="text-slate-500 text-[9px] font-black tracking-widest mt-0.5">{lead.email}</div>
                                                        <div className="text-primary text-[9px] font-mono mt-0.5">{lead.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="text-slate-300 text-xs max-w-[220px] truncate">{lead.service_type}</div>
                                                        <div className="text-slate-500 text-[9px] mt-0.5">{lead.city || 'Oahu'}</div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className={cn(
                                                            "px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                                                            lead.urgency === 'ASAP' 
                                                                ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse" 
                                                                : "border-white/20 text-white/50 bg-white/5"
                                                        )}>
                                                            {lead.urgency || 'STANDARD'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]' :
                                                            lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                                lead.status === 'SCHEDULED' ? 'bg-primary/10 text-primary border-primary/20' :
                                                                    lead.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                        'bg-slate-500/10 text-slate-500 border-white/10'
                                                            }`}>
                                                            {lead.status || 'NEW'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-center text-[10px] text-slate-500 font-mono">
                                                        {new Date(lead.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <a href={`tel:${lead.phone}`} className="size-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center hover:bg-emerald-500/20" title="Call Lead">
                                                                <Phone className="size-3.5" />
                                                            </a>
                                                            <button onClick={() => setViewingLead(lead)} className="size-8 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center" title="Manage Lead Ticket">
                                                                <UserCog className="size-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Mobile Stacked Card View */}
                                    <div className="md:hidden divide-y divide-white/5">
                                        {filteredLeads.map(lead => (
                                            <div key={lead.id} className="p-4 space-y-2.5">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <div className="text-white font-bold text-xs uppercase">{lead.first_name} {lead.last_name}</div>
                                                        <div className="text-[10px] text-slate-400">{lead.service_type}</div>
                                                    </div>
                                                    <span className={cn(
                                                        "text-[8px] font-black uppercase px-2 py-0.5 rounded-full border",
                                                        lead.urgency === 'ASAP' ? "bg-red-500/10 text-red-400 border-red-500/30" : "bg-white/5 text-slate-400"
                                                    )}>
                                                        {lead.urgency || 'STANDARD'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between pt-1">
                                                    <a href={`tel:${lead.phone}`} className="text-[10px] font-mono text-primary flex items-center gap-1">
                                                        <Phone className="size-3" /> {lead.phone}
                                                    </a>
                                                    <button onClick={() => setViewingLead(lead)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white font-mono rounded text-[9px] flex items-center gap-1">
                                                        <UserCog className="size-3" /> Manage
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'schedule' && (
                                <ScheduleManager adminFetch={adminFetch} />
                            )}


                        </AnimatePresence>
                    )}
                </div>
            </main>


            {/* Modals */}
            <AnimatePresence>
                {
                    (isAdding || editingProduct) && (
                        <ProductModal
                            product={editingProduct || undefined}
                            adminFetch={adminFetch}
                            onClose={() => { setIsAdding(false); setEditingProduct(null); }}
                            onSave={() => { setIsAdding(false); setEditingProduct(null); fetchProducts(); }}
                        />
                    )
                }
                {
                    viewingLead && (
                        <LeadDetailModal
                            lead={viewingLead}
                            adminFetch={adminFetch}
                            onClose={() => setViewingLead(null)}
                            onSave={() => { setViewingLead(null); fetchLeads(); }}
                        />
                    )
                }
                {
                    viewingOrder && (
                        <OrderDetailModal
                            order={viewingOrder}
                            adminFetch={adminFetch}
                            onClose={() => setViewingOrder(null)}
                            onSave={() => { setViewingOrder(null); fetchOrders(); }}
                        />
                    )
                }
            </AnimatePresence >
        </div >
    );
}

function LeadDetailModal({ lead, adminFetch, onClose, onSave }: { lead: Lead, adminFetch: any, onClose: () => void, onSave: () => void }) {
    const [status, setStatus] = useState(lead.status);
    const [notes, setNotes] = useState(lead.notes || '');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleUpdate = async () => {
        setError('');
        try {
            const res = await adminFetch(`/api/v1/admin/leads/${lead.id}`, {
                method: 'PUT',
                body: JSON.stringify({ status, notes })
            });
            if (res.ok) {
                onSave();
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.detail || 'Failed to update lead details.');
            }
        } catch (err) {
            console.error('Update failed', err);
            setError('Connection error. Failed to reach the server.');
        }
    };

    const handleCopyDispatch = () => {
        const text = `📋 AHAC DISPATCH TICKET #${lead.id}
Customer: ${lead.first_name} ${lead.last_name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}, ${lead.city}, HI ${lead.zip}
Service: ${lead.service_type}
Urgency: ${lead.urgency}
Status: ${status}
Notes: ${notes || lead.notes || 'None'}
Created: ${new Date(lead.created_at).toLocaleString()}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lead.address}, ${lead.city}, HI ${lead.zip}`)}`;
    const emailSubject = encodeURIComponent(`Affordable Home A/C - Appointment Lead #${lead.id}`);
    const emailBody = encodeURIComponent(`Aloha ${lead.first_name},\n\nThank you for choosing Affordable Home A/C! We received your request for ${lead.service_type} in ${lead.city}.\n\nOur dispatch team is reviewing your schedule and will contact you directly at ${lead.phone}.\n\nMahalo,\nAffordable Home A/C Team\nOahu, Hawaii | Lic #CT-36775`);
    const mailtoUrl = `mailto:${lead.email}?subject=${emailSubject}&body=${emailBody}`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-2xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 my-auto">
                <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{content.admin.leads.modal.title}</h2>
                            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                ID #{lead.id}
                            </span>
                        </div>
                        <p className="text-slate-400 text-xs font-medium mt-1">
                            {lead.service_type} • <span className="font-bold text-amber-400">{lead.urgency}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-6">
                    {/* Quick 1-Click Action Dispatch Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center justify-center gap-2 py-3 px-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all"
                            title="Call Customer Immediately"
                        >
                            <Phone className="size-3.5" />
                            <span>Call</span>
                        </a>
                        <a
                            href={mailtoUrl}
                            className="flex items-center justify-center gap-2 py-3 px-3 bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all"
                            title="Send Pre-Drafted Aloha Email"
                        >
                            <Mail className="size-3.5" />
                            <span>Aloha Email</span>
                        </a>
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 px-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all"
                            title="Open in Google Maps"
                        >
                            <MapPin className="size-3.5" />
                            <span>Map Route</span>
                        </a>
                        <button
                            type="button"
                            onClick={handleCopyDispatch}
                            className={`flex items-center justify-center gap-2 py-3 px-3 border rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${
                                copied 
                                    ? 'bg-primary/20 border-primary text-primary' 
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}
                            title="Copy Complete Ticket to Clipboard"
                        >
                            {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
                            <span>{copied ? 'Copied!' : 'Copy Ticket'}</span>
                        </button>
                    </div>

                    {/* Status Row */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 shadow-inner">
                        <label className="text-primary text-[10px] font-black uppercase tracking-widest block mb-2.5">{content.admin.leads.modal.status}</label>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none font-bold uppercase tracking-widest text-xs shadow-lg"
                            >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="SCHEDULED">SCHEDULED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none size-4" />
                        </div>
                    </div>

                    {/* Details Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-3">
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block">{content.admin.leads.modal.contact_info}</label>
                            <div className="flex items-center gap-3">
                                <User className="text-primary size-4 shrink-0" />
                                <span className="text-white font-bold text-sm">{lead.first_name} {lead.last_name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-slate-400 size-4 shrink-0" />
                                <a href={mailtoUrl} className="text-slate-300 text-xs hover:text-primary transition-colors truncate">{lead.email}</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-slate-400 size-4 shrink-0" />
                                <a href={`tel:${lead.phone}`} className="text-slate-300 text-xs font-mono hover:text-primary transition-colors">{lead.phone}</a>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                            <div>
                                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">{content.admin.leads.modal.location}</label>
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-amber-400 size-4 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 text-xs leading-relaxed">{lead.address}, {lead.city}, HI {lead.zip}</span>
                                </div>
                            </div>
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary hover:underline mt-2"
                            >
                                <span>Open Google Maps Directions</span>
                                <ExternalLink className="size-3" />
                            </a>
                        </div>
                    </div>

                    {/* Notes Area */}
                    <div className="flex-1 flex flex-col pt-2 border-t border-white/5">
                        <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">{content.admin.leads.modal.notes}</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-primary/50 outline-none text-xs leading-relaxed resize-y min-h-[140px] shadow-inner font-sans"
                            placeholder="Add your internal notes, tracking IDs, technician assignment, or service updates here..."
                        ></textarea>
                    </div>
                </div>

                {error && (
                    <div className="mx-6 sm:mx-8 mb-4 text-red-500 text-xs font-bold uppercase tracking-wide bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                        {error}
                    </div>
                )}
                <div className="p-6 sm:p-8 border-t border-white/5 bg-white/[0.01] flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-slate-400 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/5">Close</button>
                    <button onClick={handleUpdate} className="flex-1 py-4 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 hover:bg-white transition-all">{content.admin.leads.modal.update}</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function OrderDetailModal({ order, adminFetch, onClose, onSave }: { order: Order, adminFetch: any, onClose: () => void, onSave: () => void }) {
    const [status, setStatus] = useState(order.status);
    const [error, setError] = useState('');
    const items = order.items_json ? JSON.parse(order.items_json) : [];
    
    // Parse the saved address JSON string if it exists
    let address = null;
    try {
        if (order.customer_address) {
            address = JSON.parse(order.customer_address);
        }
    } catch (e) {
        console.error("Failed to parse customer address", e);
    }

    const total = order.total_cents / 100;
    const getTax = (total * 0.04712 / 1.04712).toFixed(2);
    const subtotal = (total - parseFloat(getTax)).toFixed(2);
    const isPickup = order.fulfillment_mode === 'pickup';

    const handleUpdate = async () => {
        setError('');
        try {
            const res = await adminFetch(`/api/v1/admin/orders/${order.id}`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                onSave();
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.detail || 'Failed to update order status.');
            }
        } catch (err) {
            console.error('Update failed', err);
            setError('Connection error. Failed to reach the server.');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-2xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 max-h-[90vh] overflow-y-auto">
                <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] sticky top-0 z-10 backdrop-blur-lg">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{content.admin.orders.modal.title}</h2>
                            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono">
                                #{order.id.slice(-8)}
                            </span>
                        </div>
                        <p className="text-slate-400 text-xs mt-1">Full Order ID: <span className="font-mono text-slate-300">{order.id}</span></p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    {/* Fulfillment Mode Badge Banner */}
                    <div className={cn(
                        "p-4 rounded-2xl border flex items-center justify-between",
                        isPickup ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-sky-500/10 border-sky-500/30 text-sky-400"
                    )}>
                        <div className="flex items-center gap-3">
                            {isPickup ? <Package className="size-5" /> : <Truck className="size-5" />}
                            <div>
                                <p className="font-black text-xs uppercase tracking-wider">
                                    {isPickup ? "Waipahu Warehouse Pickup ($0.00)" : "Oahu Island-Wide Delivery ($50.00)"}
                                </p>
                                <p className="text-[11px] opacity-80 mt-0.5">
                                    {isPickup ? "94-1388 Moape St Unit 2, Waipahu, HI 96797" : "Direct delivery to customer residence across Oahu"}
                                </p>
                            </div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-current">
                            {isPickup ? "FREE PICKUP" : "DELIVERY"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">Customer Details</label>
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-2.5">
                                    <div className="flex items-center gap-3">
                                        <User className="text-primary size-4" />
                                        <span className="text-white font-bold text-sm">{order.customer_name || 'Anonymous User'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-slate-500 size-4" />
                                        <a href={`mailto:${order.customer_email}`} className="text-slate-300 text-xs hover:text-primary transition-colors">{order.customer_email || 'No email'}</a>
                                    </div>
                                    {order.customer_phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="text-slate-500 size-4" />
                                            <a href={`tel:${order.customer_phone}`} className="text-slate-300 text-xs font-mono hover:text-primary transition-colors">{order.customer_phone}</a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {address && address.line1 && (
                                <div>
                                    <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">Shipping / Service Address</label>
                                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                        <MapPin className="text-amber-400 size-4 shrink-0" />
                                        <div className="text-slate-300 text-xs">
                                            <div>{address.line1} {address.line2}</div>
                                            <div>{address.city}, {address.state} {address.postal_code}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">{content.admin.orders.modal.transition}</label>
                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-4">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none font-bold uppercase tracking-widest text-xs shadow-lg"
                                >
                                    <option value="AWAIT_PAYMENT">AWAIT PAYMENT</option>
                                    <option value="PAID">PAID</option>
                                    <option value="SHIPPED">SHIPPED</option>
                                    <option value="DELIVERED">DELIVERED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
                                <div className="text-[11px] text-slate-500 space-y-1">
                                    <p>Order Placed: <span className="text-slate-300">{new Date(order.created_at).toLocaleString()}</span></p>
                                    <p>Payment: <span className="text-emerald-400 font-bold">Stripe Verified</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Manifest & Oahu Tax Breakdown */}
                    <div>
                        <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-3">{content.admin.orders.modal.manifest}</label>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[8px] font-black uppercase text-slate-500 tracking-widest">
                                    <tr>
                                        <th className="px-5 py-3">Item</th>
                                        <th className="px-5 py-3 text-center">Qty</th>
                                        <th className="px-5 py-3 text-right">Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                                    {items.map((item: any, i: number) => (
                                        <tr key={i}>
                                            <td className="px-5 py-3.5 font-medium">{item.name || item.description}</td>
                                            <td className="px-5 py-3.5 text-center font-bold">{item.quantity || 1}</td>
                                            <td className="px-5 py-3.5 text-right font-mono">${((item.price || (item.amount_total / (item.quantity || 1))) / 100).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-white/[0.04] border-t border-white/10 text-xs">
                                    <tr className="text-slate-400">
                                        <td colSpan={2} className="px-5 py-2 text-right">Subtotal:</td>
                                        <td className="px-5 py-2 text-right font-mono text-slate-300">${subtotal}</td>
                                    </tr>
                                    <tr className="text-slate-400">
                                        <td colSpan={2} className="px-5 py-2 text-right">Oahu GET Tax (4.712%):</td>
                                        <td className="px-5 py-2 text-right font-mono text-amber-400/90">${getTax}</td>
                                    </tr>
                                    <tr className="border-t border-white/10 font-bold text-white uppercase text-sm">
                                        <td colSpan={2} className="px-5 py-3.5 text-right">Total:</td>
                                        <td className="px-5 py-3.5 text-right text-primary font-mono text-base">${total.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mx-6 sm:mx-8 mb-4 text-red-500 text-xs font-bold uppercase tracking-wide bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                        {error}
                    </div>
                )}
                <div className="p-6 sm:p-8 border-t border-white/5 bg-white/[0.01] flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-slate-400 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/5">Dismiss</button>
                    <button onClick={handleUpdate} className="flex-1 py-4 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 hover:bg-white transition-all">{content.admin.orders.modal.update_status}</button>
                </div>
            </motion.div>
        </motion.div>
    );
}




// AvailabilityManager removed


function ProductModal({ product, adminFetch, onClose, onSave }: { product?: Product, adminFetch: any, onClose: () => void, onSave: () => void }) {
    const [activeTab, setActiveTab] = useState<'basic' | 'specs' | 'fit'>('basic');
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price ? product.price.toString() : '',
        category: product?.category || 'WINDOW_AC',
        subcategory: product?.subcategory || 'dual_inverter',
        stock: product?.stock || 0,
        image_url: product?.image_url || '',
        btu: product?.btu || 0,
        voltage: product?.voltage || '',
        coverage: product?.coverage || '',
        coverage_aham: product?.coverage_aham || '',
        coverage_oahu: product?.coverage_oahu || '',
        sizing_notes: product?.sizing_notes || '',
        min_window_height: product?.min_window_height || '',
        min_window_width: product?.min_window_width || '',
        max_window_width: product?.max_window_width || '',
        chassis_type: product?.chassis_type || '',
        shipping_weight: product?.shipping_weight || '',
        ceer_rating: product?.ceer_rating || '',
        dry_air_flow_cfm: product?.dry_air_flow_cfm || '',
        performance_specs: product?.performance_specs || '',
        key_spec: product?.key_spec || '',
        noise_level: product?.noise_level || '',
        dehumidification: product?.dehumidification || '',
        dimensions: product?.dimensions || '',
        weight: product?.weight || '',
        warranty: product?.warranty || '',
        promo_price: product?.promo_price ? product.promo_price.toString() : '',
        discount_percent: product?.discount_percent ? product.discount_percent.toString() : ''
    });

    const [displayPrice, setDisplayPrice] = useState<string>(
        product?.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price) : ''
    );

    const [displayPromoPrice, setDisplayPromoPrice] = useState<string>(
        product?.promo_price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.promo_price) : ''
    );

    const cutawayImageMap: Record<number, string> = {
        1: '/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp',
        2: '/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp',
        3: '/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp',
        4: '/assets/window-unit-images/3d-fit/lw1222ivsm-window-fit-cutaway.webp',
        5: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        6: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        7: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        8: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        9: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        10: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        11: '/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp',
        12: '/assets/window-unit-images/3d-fit/lw1222ivsm-window-fit-cutaway.webp',
        13: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        14: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        15: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
        16: '/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp',
    };
    const activeCutaway = (product?.id && cutawayImageMap[product.id]) || '/assets/window-unit-images/3d-fit/lw1222ivsm-window-fit-cutaway.webp';

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawVal = e.target.value;
        const cleanNumStr = rawVal.replace(/[^0-9.]/g, '');
        const parts = cleanNumStr.split('.');
        let sanitized = parts[0];
        if (parts.length > 1) {
            sanitized += '.' + parts[1].slice(0, 2);
        }

        if (!sanitized) {
            setDisplayPrice('');
        } else {
            const splitSanitized = sanitized.split('.');
            const formattedInt = new Intl.NumberFormat('en-US').format(Number(splitSanitized[0]));
            let visualValue = '$' + formattedInt;
            if (splitSanitized[1] !== undefined) {
                visualValue += '.' + splitSanitized[1];
            } else if (sanitized.endsWith('.')) {
                visualValue += '.';
            }
            setDisplayPrice(visualValue);
        }
        setFormData({ ...formData, price: sanitized });
    };

    const handlePriceBlur = () => {
        const numericVal = parseFloat(formData.price) || 0;
        if (numericVal > 0 || formData.price !== '') {
            setDisplayPrice(
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericVal)
            );
        } else {
            setDisplayPrice('');
        }
    };

    const handlePromoPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawVal = e.target.value;
        const cleanNumStr = rawVal.replace(/[^0-9.]/g, '');
        const parts = cleanNumStr.split('.');
        let sanitized = parts[0];
        if (parts.length > 1) {
            sanitized += '.' + parts[1].slice(0, 2);
        }

        if (!sanitized) {
            setDisplayPromoPrice('');
        } else {
            const splitSanitized = sanitized.split('.');
            const formattedInt = new Intl.NumberFormat('en-US').format(Number(splitSanitized[0]));
            let visualValue = '$' + formattedInt;
            if (splitSanitized[1] !== undefined) {
                visualValue += '.' + splitSanitized[1];
            } else if (sanitized.endsWith('.')) {
                visualValue += '.';
            }
            setDisplayPromoPrice(visualValue);
        }
        setFormData({ ...formData, promo_price: sanitized });
    };

    const handlePromoPriceBlur = () => {
        const numericVal = parseFloat(formData.promo_price) || 0;
        if (numericVal > 0 || formData.promo_price !== '') {
            setDisplayPromoPrice(
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericVal)
            );
        } else {
            setDisplayPromoPrice('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const url = product
            ? `/api/v1/products/${product.id}`
            : `/api/v1/products`;

        const method = product ? 'PUT' : 'POST';

        // Prepare payload with all 10 Epoch 12 specs
        const payload = {
            ...formData,
            btu: formData.btu ? Number(formData.btu) : null,
            stock: Number(formData.stock) || 0,
            price: Math.round(parseFloat(formData.price || '0')),
            promo_price: formData.promo_price ? Math.round(parseFloat(formData.promo_price)) : null,
            discount_percent: formData.discount_percent ? parseInt(formData.discount_percent) : null
        };

        try {
            const res = await adminFetch(url, {
                method,
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                onSave();
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.detail || 'Failed to save product changes. Please check inputs.');
            }
        } catch (err) {
            console.error('Save failed', err);
            setError('Connection error. Failed to reach the server.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-3xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 max-h-[92vh] flex flex-col my-auto"
            >
                <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{product ? content.admin.products.modal.edit : content.admin.products.modal.new}</h2>
                            {product?.id && (
                                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                    ID #{product.id}
                                </span>
                            )}
                        </div>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">{content.admin.products.modal.subtitle}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                        <X className="size-5" />
                    </button>
                </div>

                {/* 3 Navigation Tabs */}
                <div className="px-6 sm:px-8 pt-4 flex gap-4 sm:gap-6 border-b border-white/5 overflow-x-auto">
                    <button
                        type="button"
                        onClick={() => setActiveTab('basic')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === 'basic' ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                        1. Basic Info
                        {activeTab === 'basic' && (
                            <motion.div layoutId="tab-highlight" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('specs')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === 'specs' ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                        2. Dual Sizing & Specs
                        {activeTab === 'specs' && (
                            <motion.div layoutId="tab-highlight" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('fit')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative shrink-0 flex items-center gap-1.5 ${activeTab === 'fit' ? 'text-primary font-black' : 'text-slate-500 hover:text-white'}`}
                    >
                        <Ruler className="size-3.5" />
                        <span>3. 3D Window Fit & Calipers</span>
                        {activeTab === 'fit' && (
                            <motion.div layoutId="tab-highlight" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                </div>

                <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'basic' && (
                            <motion.div
                                key="basic"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.name}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 text-sm"
                                            placeholder="e.g. LG Dual Inverter 12,000 BTU (LW1222IVSM)"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.price}</label>
                                        <input
                                            type="text"
                                            required
                                            value={displayPrice}
                                            onChange={handlePriceChange}
                                            onBlur={handlePriceBlur}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm font-mono"
                                            placeholder="$699.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Promotion Price (USD)</label>
                                        <input
                                            type="text"
                                            value={displayPromoPrice}
                                            onChange={handlePromoPriceChange}
                                            onBlur={handlePromoPriceBlur}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm font-mono"
                                            placeholder="e.g. $629.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Discount Percent (%)</label>
                                        <input
                                            type="number"
                                            value={formData.discount_percent}
                                            min={0}
                                            max={100}
                                            onChange={e => setFormData({ ...formData, discount_percent: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.stock}</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.stock}
                                            min={0}
                                            onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.category}</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all appearance-none text-sm"
                                        >
                                            <option value="WINDOW_AC">Window AC</option>
                                            <option value="SERVICE">Service</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Subcategory</label>
                                        <select
                                            value={formData.subcategory}
                                            onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all appearance-none text-sm"
                                        >
                                            <option value="dual_inverter">Dual Inverter</option>
                                            <option value="universal_fit">Universal Fit</option>
                                            <option value="base">Base</option>
                                            <option value="ge">GE</option>
                                            <option value="casement">Casement</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.image}</label>
                                        <input
                                            type="text"
                                            value={formData.image_url}
                                            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 text-xs font-mono"
                                            placeholder="/assets/window-unit-images/lg-units/..."
                                        />
                                    </div>
                                    {formData.image_url && (
                                        <div className="col-span-1 sm:col-span-2 bg-black rounded-2xl border border-white/10 p-4 flex items-center justify-center relative h-40">
                                            <Image
                                                src={formData.image_url}
                                                alt="Preview"
                                                fill
                                                className="object-contain"
                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'specs' && (
                            <motion.div
                                key="specs"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Cooling Capacity (BTU)</label>
                                        <input
                                            type="number"
                                            value={formData.btu}
                                            onChange={e => setFormData({ ...formData, btu: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm font-bold"
                                            placeholder="e.g. 12000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Voltage / Electrical</label>
                                        <input
                                            type="text"
                                            value={formData.voltage}
                                            onChange={e => setFormData({ ...formData, voltage: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 115V / 15 Amp"
                                        />
                                    </div>

                                    {/* Dual Sizing Architecture Fields */}
                                    <div className="space-y-2">
                                        <label className="text-emerald-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                            <span>🏭 AHAM Factory Certified Coverage</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.coverage_aham}
                                            onChange={e => setFormData({ ...formData, coverage_aham: e.target.value })}
                                            className="w-full bg-black/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-all text-sm"
                                            placeholder="e.g. Up to 550 sq. ft."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-amber-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                            <span>🌺 Island Microclimate Calibration™ Coverage</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.coverage_oahu}
                                            onChange={e => setFormData({ ...formData, coverage_oahu: e.target.value })}
                                            className="w-full bg-black/50 border border-amber-500/20 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 250–380 sq. ft."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">General Room Coverage Display</label>
                                        <input
                                            type="text"
                                            value={formData.coverage}
                                            onChange={e => setFormData({ ...formData, coverage: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="Up to 550 sq. ft. (AHAM) • 250–380 sq. ft. (Oahu Single-Wall)"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">CEER Rating</label>
                                        <input
                                            type="text"
                                            value={formData.ceer_rating}
                                            onChange={e => setFormData({ ...formData, ceer_rating: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 15.0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Noise Level</label>
                                        <input
                                            type="text"
                                            value={formData.noise_level}
                                            onChange={e => setFormData({ ...formData, noise_level: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 44 / 58 dB"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Dehumidification</label>
                                        <input
                                            type="text"
                                            value={formData.dehumidification}
                                            onChange={e => setFormData({ ...formData, dehumidification: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 3.3 Pts/Hr"
                                        />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Key Spec Highlight</label>
                                        <input
                                            type="text"
                                            value={formData.key_spec}
                                            onChange={e => setFormData({ ...formData, key_spec: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. Dual Inverter Compressor: Up to 40% Energy Savings"
                                        />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Performance Specs Summary</label>
                                        <textarea
                                            value={formData.performance_specs}
                                            onChange={e => setFormData({ ...formData, performance_specs: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all min-h-[70px] text-xs font-mono"
                                            placeholder="44dB Sleep Mode (CEER 15.0 / Energy Star Most Efficient 2026)"
                                        />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Dimensions</label>
                                        <input
                                            type="text"
                                            value={formData.dimensions}
                                            onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder='e.g. 15.0" H x 23.6" W x 24.8" D'
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Net Weight (lbs)</label>
                                        <input
                                            type="text"
                                            value={formData.weight}
                                            onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 81"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Warranty</label>
                                        <input
                                            type="text"
                                            value={formData.warranty}
                                            onChange={e => setFormData({ ...formData, warranty: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 1 YEAR LIMITED / 5 YR COMPRESSOR"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'fit' && (
                            <motion.div
                                key="fit"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                {/* Live 3D Spatial Window Fit Preview Card */}
                                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Live 3D Window Fit Preview</span>
                                        </div>
                                        <span className="text-[9px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                                            ⚡ Blender 4.1 Cycles Raytraced (&lt; 85 KB WebP)
                                        </span>
                                    </div>

                                    <div className="relative h-48 bg-black rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                                        <Image
                                            src={activeCutaway}
                                            alt="3D Spatial Cutaway"
                                            fill
                                            className="object-contain p-2"
                                        />
                                        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono text-slate-300">
                                            Min Opening: <span className="text-amber-400 font-bold">{formData.min_window_height || '15"'}</span> H × <span className="text-sky-400 font-bold">{formData.min_window_width || '27"'}–{formData.max_window_width || '39"'}</span> W
                                        </div>
                                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono text-emerald-400">
                                            {formData.chassis_type || 'Slide-Out Chassis'}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-amber-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                            <Ruler className="size-3" />
                                            <span>Min Window Opening Height</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.min_window_height}
                                            onChange={e => setFormData({ ...formData, min_window_height: e.target.value })}
                                            className="w-full bg-black/50 border border-amber-500/20 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 outline-none transition-all text-sm font-mono"
                                            placeholder='e.g. 15"'
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sky-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                            <Ruler className="size-3" />
                                            <span>Min Window Opening Width</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.min_window_width}
                                            onChange={e => setFormData({ ...formData, min_window_width: e.target.value })}
                                            className="w-full bg-black/50 border border-sky-500/20 rounded-xl px-4 py-3 text-white focus:border-sky-500/50 outline-none transition-all text-sm font-mono"
                                            placeholder='e.g. 27"'
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sky-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                            <Ruler className="size-3" />
                                            <span>Max Window Opening Width</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.max_window_width}
                                            onChange={e => setFormData({ ...formData, max_window_width: e.target.value })}
                                            className="w-full bg-black/50 border border-sky-500/20 rounded-xl px-4 py-3 text-white focus:border-sky-500/50 outline-none transition-all text-sm font-mono"
                                            placeholder='e.g. 39"'
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-emerald-400 text-[10px] font-black uppercase tracking-widest ml-1">Chassis Design Type</label>
                                        <input
                                            type="text"
                                            value={formData.chassis_type}
                                            onChange={e => setFormData({ ...formData, chassis_type: e.target.value })}
                                            className="w-full bg-black/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-all text-sm"
                                            placeholder="e.g. Slide-Out Chassis or Top-Mount Fixed"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Shipping Weight (lbs)</label>
                                        <input
                                            type="text"
                                            value={formData.shipping_weight}
                                            onChange={e => setFormData({ ...formData, shipping_weight: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 89"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Dry Air Flow (CFM)</label>
                                        <input
                                            type="text"
                                            value={formData.dry_air_flow_cfm}
                                            onChange={e => setFormData({ ...formData, dry_air_flow_cfm: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                                            placeholder="e.g. 260 CFM"
                                        />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <label className="text-primary text-[10px] font-black uppercase tracking-widest ml-1">Island Climate Sizing Notes / CEO Calibration</label>
                                        <textarea
                                            value={formData.sizing_notes}
                                            onChange={e => setFormData({ ...formData, sizing_notes: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all min-h-[90px] text-xs leading-relaxed"
                                            placeholder="Factory AHAM rated up to 550 sq. ft. Calibrated for 250–380 sq. ft. in typical Oahu homes with single-wall construction and moderate solar load."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <div className="text-red-500 text-xs font-bold uppercase tracking-wide bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex gap-4 border-t border-white/5">
                        <button type="button" onClick={onClose} className="flex-1 border border-white/10 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 transition-all text-xs">{content.admin.products.modal.cancel}</button>
                        <button type="submit" className="flex-2 bg-primary text-black font-black uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/20 text-xs">
                            {product ? content.admin.products.modal.save_edit : content.admin.products.modal.save_new}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}


function DateRangeInput({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: any) => void }) {
    const [showPicker, setShowPicker] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleApply = () => {
        if (!startDate || !endDate) return;
        
        const start = new Date(startDate + "T00:00:00");
        const end = new Date(endDate + "T00:00:00");
        
        const startMonth = start.toLocaleString('default', { month: 'short' });
        const startDay = start.getDate();
        const startYear = start.getFullYear();
        
        const endMonth = end.toLocaleString('default', { month: 'short' });
        const endDay = end.getDate();
        const endYear = end.getFullYear();
        
        let formatted = '';
        if (startYear === endYear) {
            if (startMonth === endMonth) {
                formatted = `${startMonth} ${startDay}-${endDay}, ${startYear}`;
            } else {
                formatted = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
            }
        } else {
            formatted = `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
        }
        
        onChange({ target: { name, value: formatted } });
        setShowPicker(false);
    };

    return (
        <div className="space-y-2">
            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{label}</label>
            <div className="relative flex items-center gap-2">
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                    placeholder="e.g. July 6-10, 2026"
                />
                <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="size-11 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-primary/20 hover:text-primary transition-all text-slate-400 shrink-0"
                    title="Select Date Range"
                >
                    <Calendar className="size-5" />
                </button>

                <AnimatePresence>
                    {showPicker && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-14 right-0 z-50 bg-[#0a0e14] border border-white/10 p-4 rounded-xl shadow-2xl shadow-black w-72"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-white">Select Dates</span>
                                <button type="button" onClick={() => setShowPicker(false)} className="text-slate-500 hover:text-white"><X className="size-4" /></button>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[9px] text-slate-500 uppercase font-black block mb-1">Start Date</label>
                                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-primary outline-none [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="text-[9px] text-slate-500 uppercase font-black block mb-1">End Date</label>
                                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-primary outline-none [color-scheme:dark]" />
                                </div>
                                <button type="button" onClick={handleApply} className="w-full mt-2 bg-primary text-black font-black uppercase text-[10px] tracking-wider py-2 rounded-lg hover:bg-white transition-all shadow-lg shadow-primary/20">Apply Range</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ScheduleManager({ adminFetch }: { adminFetch: any }) {
    const { content, refreshContent } = useContent();
    const [formData, setFormData] = useState(content.footer_schedule || {
        mini_split_label: "",
        window_ac_label: "",
        mini_split_estimate_date: "",
        mini_split_install_date: "",
        window_ac_estimate_date: "",
        window_ac_install_date: "",
        general_availability_range: ""
    });

    // Date Staleness Validator
    const isDateStale = (dateStr: string) => {
        if (!dateStr) return false;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // 0-indexed
        const oldYearMatch = dateStr.match(/\b(202[0-5])\b/);
        if (oldYearMatch) return true;

        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const lower = dateStr.toLowerCase();
        for (let i = 0; i < months.length; i++) {
            if (lower.includes(months[i])) {
                const hasCurrentOrFutureYear = dateStr.includes(String(currentYear)) || dateStr.includes(String(currentYear + 1));
                if (hasCurrentOrFutureYear && i < currentMonth - 1) {
                    return true;
                }
            }
        }
        return false;
    };

    const hasStaleDates = isDateStale(formData.mini_split_estimate_date) ||
                         isDateStale(formData.mini_split_install_date) ||
                         isDateStale(formData.window_ac_estimate_date) ||
                         isDateStale(formData.window_ac_install_date);

    // FIX: The Hydration Trap Synchronization
    // Sync local form state when the global ContentContext fetches the live DB data.
    // This prevents stale build-time initialContentJson from clobbering the live database when saving.
    useEffect(() => {
        if (content.footer_schedule) {
            setFormData(content.footer_schedule);
        }
    }, [content.footer_schedule]);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        setError('');
        try {
            const res = await adminFetch('/api/v1/admin/schedule', {
                method: 'PATCH',
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                await refreshContent();
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.detail || 'Failed to save schedule updates.');
            }
        } catch (err) {
            console.error('Failed to save schedule', err);
            setError('Connection error. Failed to reach the server.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            key="schedule"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="p-8 pb-[300px]"
        >
            <div className="mb-8">
                <h3 className="text-white font-header font-black uppercase text-xl tracking-widest mb-2">Footer Schedule Availability</h3>
                <p className="text-slate-500 text-xs">Update the availability dates displayed in the footer for customers.</p>
            </div>

            {hasStaleDates && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-400 mb-6 max-w-4xl">
                    <AlertTriangle className="size-5 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                        <p className="font-black uppercase tracking-wider">Date Staleness Alert</p>
                        <p className="text-slate-300 leading-relaxed">
                            One or more availability dates appear to be in the past or older than the current month. Please update footer availability dates to reflect current Oahu installation and estimate capacity so prospective customers see accurate booking timeframes.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSave} className="max-w-4xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mini Split Section */}
                    <div className="space-y-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Mini Split Column</h4>
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Label</label>
                            <input
                                name="mini_split_label"
                                value={formData.mini_split_label}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
                        <DateRangeInput
                            label="Next Available Estimate"
                            name="mini_split_estimate_date"
                            value={formData.mini_split_estimate_date}
                            onChange={handleChange}
                        />
                        <DateRangeInput
                            label="Next Available Install"
                            name="mini_split_install_date"
                            value={formData.mini_split_install_date}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Window AC Section */}
                    <div className="space-y-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Window AC Column</h4>
                        </div>
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Label</label>
                            <input
                                name="window_ac_label"
                                value={formData.window_ac_label}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
                        <DateRangeInput
                            label="Next Available Estimate"
                            name="window_ac_estimate_date"
                            value={formData.window_ac_estimate_date}
                            onChange={handleChange}
                        />
                        <DateRangeInput
                            label="Next Available Install"
                            name="window_ac_install_date"
                            value={formData.window_ac_install_date}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-xs font-bold uppercase tracking-wide bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                        {error}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-primary text-black font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <div className="animate-spin size-4 border-2 border-black border-t-transparent rounded-full" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="size-5" />
                                Save Updates
                            </>
                        )}
                    </button>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                            <CheckCircle2 className="size-4" />
                            Schedule Updated
                        </motion.div>
                    )}
                </div>
            </form>
        </motion.div>
    );
}
