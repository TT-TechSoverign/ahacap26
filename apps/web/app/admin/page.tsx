'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import content from '@/lib/content/content.json';
import { AdminCalendar } from '@/components/AdminCalendar';
import { useContent } from '@/lib/context/ContentContext';
import NavbarV2 from '@/components/NavbarV2';

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
    performance_specs?: string;
    key_spec?: string;
    noise_level?: string;
    dehumidification?: string;
    dimensions?: string;
    weight?: string;
    warranty?: string;
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

    const adminFetch = useCallback(async (url: string, options: RequestInit = {}) => {
        const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': token } : {}),
            ...options.headers,
        };
        return fetch(url, { ...options, headers });
    }, []);

    // --- Scroll Sync Logic (Matches NavbarV2) ---
    const { scrollY } = useScroll();
    const [headerVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Sync header visibility with scroll direction
    // calculate direction and toggle visibility
    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";
        if (latest > 50 && direction === "down" && headerVisible) {
            setHeaderVisible(false);
        } else if (direction === "up" && !headerVisible) {
            setHeaderVisible(true);
        }
        setLastScrollY(latest);
    });

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
                                <span className="material-symbols-outlined text-3xl text-primary">lock</span>
                            </div>
                            <h1 className="text-2xl font-header font-black uppercase tracking-tight mb-2 text-white">AHAC Admin</h1>
                            <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">Authorized Access Only</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest ml-1">{content.admin.login.label}</label>
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-center text-xl tracking-[1em] text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder-transparent"
                                    maxLength={4}
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
        <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans pb-20 pt-[120px] md:pt-[250px]">
            {/* Admin Header - Fixed below global Navbar */}
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: headerVisible ? 0 : -400 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    delay: headerVisible ? 0.1 : 0
                }}
                className="fixed top-[130px] md:top-[260px] left-0 right-0 z-40 bg-[#0a0e14]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 shadow-2xl"
            >
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-black font-bold">settings_suggest</span>
                            </div>
                            <div className="hidden sm:block">
                                <h2 className="text-white font-header font-black tracking-widest uppercase text-lg leading-none">{content.admin.nav.title}</h2>
                                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">{content.admin.nav.subtitle}</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <nav className="flex items-center bg-black/40 p-1 rounded-xl border border-white/5">
                            {(['inventory', 'orders', 'leads', 'schedule'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    //@ts-ignore
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                                >
                                    {tab === 'schedule' ? 'Schedule' : content.admin.tabs[tab as keyof typeof content.admin.tabs]}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {activeTab === 'inventory' && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-white text-black px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">add</span> {content.admin.nav.add_product}
                            </button>
                        )}
                        <Link href="/shop" className="text-slate-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-lg hidden md:block">{content.admin.nav.view_shop}</Link>
                        <button onClick={handleLogout} className="text-red-500/50 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined">power_settings_new</span>
                        </button>
                    </div>
                </div>
            </motion.header>

            <main className="max-w-[1440px] mx-auto px-6 pt-12">
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
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-8 py-4">Image</th>
                                                <th className="px-8 py-4">Product Name</th>
                                                <th className="px-8 py-4 text-center">Category</th>
                                                <th className="px-8 py-4 text-right">Price</th>
                                                <th className="px-8 py-4 text-center">Stock</th>
                                                <th className="px-8 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {products.map(product => (
                                                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="size-20 bg-black rounded-lg border border-white/10 overflow-hidden relative">
                                                            {product.image_url ? (
                                                                <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
                                                            ) : (
                                                                <div className="absolute inset-0 flex items-center justify-center text-slate-800">
                                                                    <span className="material-symbols-outlined text-4xl">image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="text-white font-bold uppercase tracking-wide">{product.name}</div>
                                                        <div className="text-slate-500 text-[9px] font-black tracking-widest uppercase mt-1">ID: {product.id}</div>
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/10">{product.category}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right font-header font-bold text-lg text-white">${product.price}</td>
                                                    <td className="px-8 py-6 text-center">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <div className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-slate-400'}`}>{product.stock}</div>
                                                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                                {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => setEditingProduct(product)} className="size-10 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-black transition-all flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-sm">edit</span>
                                                            </button>
                                                            <button onClick={() => handleDelete(product.id)} className="size-10 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-sm">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}

                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-8 py-4">Order ID</th>
                                                <th className="px-8 py-4">Customer</th>
                                                <th className="px-8 py-4 text-center">Date</th>
                                                <th className="px-8 py-4 text-center">Status</th>
                                                <th className="px-8 py-4 text-right">Total</th>
                                                <th className="px-8 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {orders.map(order => (
                                                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-6 font-mono text-[10px] text-primary">{order.id}</td>
                                                    <td className="px-8 py-6">
                                                        <div className="text-white font-bold">{order.customer_name || 'Anonymous User'}</div>
                                                        <div className="text-slate-500 text-[9px] font-black tracking-widest mt-1">{order.customer_email || 'No email provided'}</div>
                                                    </td>
                                                    <td className="px-8 py-6 text-center text-[10px] text-slate-500">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                            order.status === 'SHIPPED' ? 'bg-primary/10 text-primary border-primary/20' :
                                                                order.status === 'DELIVERED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                                    order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right font-header font-bold text-white">${(order.total_cents / 100).toLocaleString()}</td>
                                                    <td className="px-8 py-6 text-right">
                                                        <button onClick={() => setViewingOrder(order)} className="size-10 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center ml-auto">
                                                            <span className="material-symbols-outlined text-sm">visibility</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}

                            {activeTab === 'leads' && (
                                <motion.div
                                    key="leads"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-8 py-4">Requestor</th>
                                                <th className="px-8 py-4">Service Type</th>
                                                <th className="px-8 py-4 text-center">Urgency</th>
                                                <th className="px-8 py-4 text-center">Status</th>
                                                <th className="px-8 py-4 text-center">Date</th>
                                                <th className="px-8 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {leads.map(lead => (
                                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="text-white font-bold uppercase tracking-wide">{lead.first_name} {lead.last_name}</div>
                                                        <div className="text-slate-500 text-[9px] font-black tracking-widest mt-1">{lead.email}</div>
                                                        <div className="text-primary text-[9px] font-mono mt-0.5">{lead.phone}</div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="text-slate-300 text-xs max-w-[200px] truncate">{lead.service_type}</div>
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20 text-white/50 bg-white/5`}>
                                                            {lead.urgency || 'STANDARD'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]' :
                                                            lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                                lead.status === 'SCHEDULED' ? 'bg-primary/10 text-primary border-primary/20' :
                                                                    lead.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                        'bg-slate-500/10 text-slate-500 border-white/10'
                                                            }`}>
                                                            {lead.status || 'NEW'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-center text-[10px] text-slate-500">
                                                        <span className="font-mono">{new Date(lead.created_at).toLocaleDateString()}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <button onClick={() => setViewingLead(lead)} className="size-10 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center ml-auto">
                                                            <span className="material-symbols-outlined text-sm">manage_accounts</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}

                            {activeTab === 'schedule' && (
                                <ScheduleManager />
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
                            onClose={() => { setIsAdding(false); setEditingProduct(null); }}
                            onSave={() => { setIsAdding(false); setEditingProduct(null); fetchProducts(); }}
                        />
                    )
                }
                {
                    viewingLead && (
                        <LeadDetailModal
                            lead={viewingLead}
                            onClose={() => setViewingLead(null)}
                            onSave={() => { setViewingLead(null); fetchLeads(); }}
                        />
                    )
                }
                {
                    viewingOrder && (
                        <OrderDetailModal
                            order={viewingOrder}
                            onClose={() => setViewingOrder(null)}
                            onSave={() => { setViewingOrder(null); fetchOrders(); }}
                        />
                    )
                }
            </AnimatePresence >
        </div >
    );
}

function LeadDetailModal({ lead, onClose, onSave }: { lead: Lead, onClose: () => void, onSave: () => void }) {
    const [status, setStatus] = useState(lead.status);
    const [notes, setNotes] = useState(lead.notes || '');

    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem('admin_token');
            const res = await fetch(`/api/v1/admin/leads/${lead.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': token } : {})
                },
                body: JSON.stringify({ status, notes })
            });
            if (res.ok) onSave();
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div>
                        <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{content.admin.leads.modal.title}</h2>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">Lead ID: {lead.id}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-8 flex flex-col gap-8">
                    {/* Status Top Row */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 shadow-inner">
                        <label className="text-primary text-[10px] font-black uppercase tracking-widest block mb-3 text-center sm:text-left">{content.admin.leads.modal.status}</label>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-black/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-primary/50 outline-none appearance-none font-bold uppercase tracking-widest text-xs shadow-lg"
                            >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="SCHEDULED">SCHEDULED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2 text-center sm:text-left">{content.admin.leads.modal.contact_info}</label>
                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-lg">person</span>
                                    <span className="text-white font-bold">{lead.first_name} {lead.last_name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-500 text-lg">mail</span>
                                    <span className="text-slate-300 text-sm">{lead.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-500 text-lg">call</span>
                                    <span className="text-slate-300 text-sm font-mono">{lead.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2 text-center sm:text-left">{content.admin.leads.modal.location}</label>
                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3 h-[calc(100%-24px)]">
                                <span className="material-symbols-outlined text-slate-500 text-lg">location_on</span>
                                <span className="text-slate-300 text-sm leading-relaxed">{lead.address}, {lead.city}, {lead.zip}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col pt-2 border-t border-white/5 min-h-[300px]">
                        <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-3 text-center sm:text-left">{content.admin.leads.modal.notes}</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="flex-1 w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-primary/50 outline-none text-sm leading-relaxed resize-y min-h-[250px] shadow-inner"
                            placeholder="Add your internal notes, tracking IDs, or service updates here..."
                        ></textarea>
                    </div>
                </div>
                <div className="p-8 border-t border-white/5 bg-white/[0.01] flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-slate-400 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/5">Close</button>
                    <button onClick={handleUpdate} className="flex-1 py-4 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 hover:bg-white transition-all">{content.admin.leads.modal.update}</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function OrderDetailModal({ order, onClose, onSave }: { order: Order, onClose: () => void, onSave: () => void }) {
    const [status, setStatus] = useState(order.status);
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

    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem('admin_token');
            const res = await fetch(`/api/v1/admin/orders/${order.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': token } : {})
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) onSave();
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 max-h-[90vh] overflow-y-auto">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] sticky top-0 z-10 backdrop-blur-lg">
                    <div>
                        <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{content.admin.orders.modal.title}</h2>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">Order ID: {order.id}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">Customer Details</label>
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg">person</span>
                                        <span className="text-white font-bold">{order.customer_name || 'Anonymous User'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-500 text-lg">mail</span>
                                        <span className="text-slate-300 text-sm">{order.customer_email || 'No email provided'}</span>
                                    </div>
                                    {order.customer_phone && (
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-500 text-lg">call</span>
                                            <span className="text-slate-300 text-sm font-mono">{order.customer_phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {address && address.line1 && (
                                <div>
                                    <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">Shipping / Service Address</label>
                                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-500 text-lg">location_on</span>
                                        <div className="text-slate-300 text-sm">
                                            <div>{address.line1} {address.line2}</div>
                                            <div>{address.city}, {address.state} {address.postal_code}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">{content.admin.orders.modal.transition}</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none font-bold uppercase tracking-widest text-[10px]"
                            >
                                <option value="AWAIT_PAYMENT">AWAIT PAYMENT</option>
                                <option value="PAID">PAID</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="DELIVERED">DELIVERED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-4 text-center sm:text-left">{content.admin.orders.modal.manifest}</label>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[8px] font-black uppercase text-slate-500 tracking-widest">
                                    <tr>
                                        <th className="px-6 py-3">Item</th>
                                        <th className="px-6 py-3 text-center">Qty</th>
                                        <th className="px-6 py-3 text-right">Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {items.map((item: any, i: number) => (
                                        <tr key={i} className="text-xs text-slate-300">
                                            <td className="px-6 py-4">{item.name}</td>
                                            <td className="px-6 py-4 text-center">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right">${(item.price / 100).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-white/5 font-bold text-white uppercase text-[10px]">
                                    <tr>
                                        <td colSpan={2} className="px-6 py-4 text-right">Manifest Total</td>
                                        <td className="px-6 py-4 text-right text-primary">${(order.total_cents / 100).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="p-8 border-t border-white/5 bg-white/[0.01] flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-slate-400 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/5">Dismiss</button>
                    <button onClick={handleUpdate} className="flex-1 py-4 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 hover:bg-white transition-all">{content.admin.orders.modal.update_status}</button>
                </div>
            </motion.div>
        </motion.div>
    );
}




// AvailabilityManager removed


function ProductModal({ product, onClose, onSave }: { product?: Product, onClose: () => void, onSave: () => void }) {
    const [activeTab, setActiveTab] = useState<'basic' | 'specs'>('basic');
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
        const url = product
            ? `/api/v1/products/${product.id}`
            : `/api/v1/products`;

        const method = product ? 'PUT' : 'POST';

        // Prepare payload
        const payload = {
            ...formData,
            price: Math.round(parseFloat(formData.price || '0')),
            promo_price: formData.promo_price ? Math.round(parseFloat(formData.promo_price)) : null,
            discount_percent: formData.discount_percent ? parseInt(formData.discount_percent) : null
        };

        try {
            const token = sessionStorage.getItem('admin_token');
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': token } : {})
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) onSave();
        } catch (err) {
            console.error('Save failed', err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 max-h-[90vh] flex flex-col"
            >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{product ? content.admin.products.modal.edit : content.admin.products.modal.new}</h2>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">{content.admin.products.modal.subtitle}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-8 pt-6 flex gap-4 border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'basic' ? 'text-white' : 'text-slate-500 hover:text-white'
                            }`}
                    >
                        Basic Info
                        {activeTab === 'basic' && (
                            <motion.div layoutId="tab-highlight" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('specs')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'specs' ? 'text-white' : 'text-slate-500 hover:text-white'
                            }`}
                    >
                        Technical Specs
                        {activeTab === 'specs' && (
                            <motion.div layoutId="tab-highlight" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                </div>

                <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'basic' ? (
                            <motion.div
                                key="basic"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.name}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-700"
                                            placeholder="e.g. LG 8000 BTU Window Unit"
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
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Promotion Price (USD)</label>
                                        <input
                                            type="text"
                                            value={displayPromoPrice}
                                            onChange={handlePromoPriceChange}
                                            onBlur={handlePromoPriceBlur}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. $899.00"
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
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
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
                                            onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.category}</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all appearance-none"
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
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all appearance-none"
                                        >
                                            <option value="dual_inverter">Dual Inverter</option>
                                            <option value="universal_fit">Universal Fit</option>
                                            <option value="base">Base</option>
                                            <option value="ge">GE</option>
                                            <option value="casement">Casement</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.image}</label>
                                        <input
                                            type="text"
                                            value={formData.image_url}
                                            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-700"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    {/* Image Preview */}
                                    {formData.image_url && (
                                        <div className="col-span-2 mt-2 bg-black rounded-xl border border-white/10 p-4 flex items-center justify-center relative h-40">
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
                        ) : (
                            <motion.div
                                key="specs"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Cooling Capacity (BTU)</label>
                                        <input
                                            type="number"
                                            value={formData.btu}
                                            onChange={e => setFormData({ ...formData, btu: parseInt(e.target.value) })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 8000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Voltage</label>
                                        <input
                                            type="text"
                                            value={formData.voltage}
                                            onChange={e => setFormData({ ...formData, voltage: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 115V"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Room Coverage</label>
                                        <input
                                            type="text"
                                            value={formData.coverage}
                                            onChange={e => setFormData({ ...formData, coverage: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 350 sq ft"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Noise Level</label>
                                        <input
                                            type="text"
                                            value={formData.noise_level}
                                            onChange={e => setFormData({ ...formData, noise_level: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 52 dBA"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Key Spec (Highlight)</label>
                                        <input
                                            type="text"
                                            value={formData.key_spec}
                                            onChange={e => setFormData({ ...formData, key_spec: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. Dual Inverter Compressor"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Performance Specs</label>
                                        <textarea
                                            value={formData.performance_specs}
                                            onChange={e => setFormData({ ...formData, performance_specs: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all min-h-[80px]"
                                            placeholder="e.g. 12.0 CEER / 11.2 EER"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Dehumidification</label>
                                        <input
                                            type="text"
                                            value={formData.dehumidification}
                                            onChange={e => setFormData({ ...formData, dehumidification: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 2.2 pts/hr"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Dimensions</label>
                                        <input
                                            type="text"
                                            value={formData.dimensions}
                                            onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 23.6 x 14.9 x 24.8"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Weight</label>
                                        <input
                                            type="text"
                                            value={formData.weight}
                                            onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 89"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Warranty</label>
                                        <input
                                            type="text"
                                            value={formData.warranty}
                                            onChange={e => setFormData({ ...formData, warranty: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. 1 YEAR LIMITED"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="pt-6 flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 border border-white/10 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 transition-all">{content.admin.products.modal.cancel}</button>
                        <button type="submit" className="flex-2 bg-primary text-black font-black uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/20">
                            {product ? content.admin.products.modal.save_edit : content.admin.products.modal.save_new}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}


function ScheduleManager() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        try {
            const token = sessionStorage.getItem('admin_token');
            const res = await fetch('/api/v1/admin/schedule', {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': token } : {})
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                await refreshContent();
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            console.error('Failed to save schedule', err);
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
            className="p-8"
        >
            <div className="mb-8">
                <h3 className="text-white font-header font-black uppercase text-xl tracking-widest mb-2">Footer Schedule Availability</h3>
                <p className="text-slate-500 text-xs">Update the availability dates displayed in the footer for customers.</p>
            </div>

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
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Estimate Date</label>
                            <input
                                name="mini_split_estimate_date"
                                value={formData.mini_split_estimate_date}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Install Date</label>
                            <input
                                name="mini_split_install_date"
                                value={formData.mini_split_install_date}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
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
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Estimate Date</label>
                            <input
                                name="window_ac_estimate_date"
                                value={formData.window_ac_estimate_date}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Install Date</label>
                            <input
                                name="window_ac_install_date"
                                value={formData.window_ac_install_date}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>
                </div>



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
                                <span className="material-symbols-outlined text-lg">save</span>
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
                            <span className="material-symbols-outlined">check_circle</span>
                            Schedule Updated
                        </motion.div>
                    )}
                </div>
            </form>
        </motion.div>
    );
}
