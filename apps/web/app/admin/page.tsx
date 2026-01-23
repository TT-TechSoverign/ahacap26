'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import content from '../../content.json';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    image_url?: string;
}

interface Order {
    id: string;
    status: string;
    total_cents: number;
    customer_email?: string;
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

type Tab = 'inventory' | 'orders' | 'leads';

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

    const MASTER_PIN = '8081'; // Discrete PIN

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === MASTER_PIN) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('INVALID ACCESS CODE');
            setPin('');
        }
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/products`);
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
            const res = await fetch(`/api/v1/admin/orders`);
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/admin/leads`);
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (err) {
            console.error('Failed to fetch leads', err);
        } finally {
            setLoading(false);
        }
    }, []);

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
            const res = await fetch(`/api/v1/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) fetchProducts();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#05070a] flex items-center justify-center font-sans pt-9">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md p-8 bg-[#0a0e14] border border-white/5 rounded-2xl shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                        </div>
                        <h1 className="text-white font-header font-black tracking-[0.3em] uppercase text-xl">{content.admin.login.title}</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-4 py-1 bg-white/5 rounded-full inline-block">{content.admin.login.subtitle}</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.login.label}</label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[1em] focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                placeholder="••••"
                                maxLength={4}
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">{content.admin.login.error}</p>}
                        <button className="w-full bg-primary text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/20">
                            {content.admin.login.button}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-[9px] text-slate-700 font-bold uppercase tracking-widest">
                        {content.admin.login.version}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans pb-20 pt-9">
            {/* Admin Header */}
            <header className="sticky top-9 z-50 w-full bg-[#0a0e14]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
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
                            {(['inventory', 'orders', 'leads'] as Tab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                                >
                                    {content.admin.tabs[tab as keyof typeof content.admin.tabs]}
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
                        <button onClick={() => setIsAuthenticated(false)} className="text-red-500/50 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined">power_settings_new</span>
                        </button>
                    </div>
                </div>
            </header>

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
                    {loading ? (
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
                                                        <div className="text-white font-bold">{order.customer_email || 'N/A'}</div>
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
                                                <th className="px-8 py-4 text-right">Date</th>
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
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]' :
                                                            lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                                lead.status === 'SCHEDULED' ? 'bg-primary/10 text-primary border-primary/20' :
                                                                    lead.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                        'bg-slate-500/10 text-slate-500 border-white/10'
                                                            }`}>
                                                            {lead.status || 'NEW'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right text-[10px] text-slate-500">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <span className="font-mono">{new Date(lead.created_at).toLocaleDateString()}</span>
                                                            <button onClick={() => setViewingLead(lead)} className="size-10 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-sm">manage_accounts</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </main>

            {/* Modals */}
            <AnimatePresence>
                {(isAdding || editingProduct) && (
                    <ProductModal
                        product={editingProduct || undefined}
                        onClose={() => { setIsAdding(false); setEditingProduct(null); }}
                        onSave={() => { setIsAdding(false); setEditingProduct(null); fetchProducts(); }}
                    />
                )}
                {viewingLead && (
                    <LeadDetailModal
                        lead={viewingLead}
                        onClose={() => setViewingLead(null)}
                        onSave={() => { setViewingLead(null); fetchLeads(); }}
                    />
                )}
                {viewingOrder && (
                    <OrderDetailModal
                        order={viewingOrder}
                        onClose={() => setViewingOrder(null)}
                        onSave={() => { setViewingOrder(null); fetchOrders(); }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function LeadDetailModal({ lead, onClose, onSave }: { lead: Lead, onClose: () => void, onSave: () => void }) {
    const [status, setStatus] = useState(lead.status);
    const [notes, setNotes] = useState(lead.notes || '');

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/v1/admin/leads/${lead.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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
                <div className="p-8 grid grid-cols-2 gap-8">
                    <div className="space-y-6">
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
                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-500 text-lg">location_on</span>
                                <span className="text-slate-300 text-sm">{lead.address}, {lead.city}, {lead.zip}</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block text-center sm:text-left">{content.admin.leads.modal.status}</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none font-bold uppercase tracking-widest text-[10px]"
                            >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="SCHEDULED">SCHEDULED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block text-center sm:text-left">{content.admin.leads.modal.notes}</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none min-h-[120px] text-sm"
                                placeholder="..."
                            ></textarea>
                        </div>
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

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/v1/admin/orders/${order.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
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
                        <h2 className="text-white font-header font-black text-2xl uppercase tracking-tighter">{content.admin.orders.modal.title}</h2>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">Order ID: {order.id}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-2">Customer</label>
                            <div className="text-white font-bold">{order.customer_email || 'Anonymous'}</div>
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

function ProductModal({ product, onClose, onSave }: { product?: Product, onClose: () => void, onSave: () => void }) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || 0,
        category: product?.category || 'WINDOW_AC',
        stock: product?.stock || 0,
        image_url: product?.image_url || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = product
            ? `${process.env.NEXT_PUBLIC_API_URL || '/api/v1'}/products/${product.id}`
            : `${process.env.NEXT_PUBLIC_API_URL || '/api/v1'}/products`;

        const method = product ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
                className="w-full max-w-xl bg-[#0a0e14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
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

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                                type="number"
                                required
                                value={formData.price}
                                min={0}
                                onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
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
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">{content.admin.products.modal.image}</label>
                            <input
                                type="text"
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-700"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

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
