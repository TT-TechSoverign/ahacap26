'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// Fix import path: go up two levels to 'web', then into 'context'
import { useCart } from '../../context/CartContext';
import { getProductImages } from '../../lib/product-images';
import { Product } from '../../types';

export default function ShopPage() {
    const { addToCart, items, openCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Fetch Products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

                let url = `${apiUrl}/products`;
                const params = new URLSearchParams();
                if (searchQuery) params.append('name', searchQuery);
                if (selectedCategory) params.append('category', selectedCategory);
                if (params.toString()) url += `?${params.toString()}`;

                console.log('Fetching products from:', url);
                const res = await fetch(url);

                if (!res.ok) throw new Error(`Failed to fetch inventory (Status: ${res.status})`);

                const data = await res.json();
                setProducts(data);
            } catch (err: any) {
                console.error("Inventory Load Error:", err);
                setError(err.message || 'Unable to load inventory.');
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchProducts, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
            {/* Header / Nav */}
            <header className="sticky top-0 z-40 w-full bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-primary to-cyan-400 rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                            <span className="material-symbols-outlined text-white text-2xl animate-[spin_10s_linear_infinite]" aria-hidden="true">mode_fan</span>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-black uppercase tracking-tighter leading-none text-white">
                                Affordable Home A/C
                            </h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Precision Climate Control</p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined">search</span>
                        <input
                            type="text"
                            placeholder="SEARCH INVENTORY..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-lg py-3 pl-12 pr-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-bold uppercase tracking-wider hover:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(0,174,239,0.3)]"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,174,239,0.8)]"></div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={openCart}
                            className="relative group p-2 hover:bg-white/5 rounded-xl transition-colors"
                            aria-label="Open Shopping Cart"
                        >
                            <span className="material-symbols-outlined text-2xl text-slate-300 group-hover:text-white transition-colors" aria-hidden="true">shopping_cart</span>
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-lg shadow-primary/50 border border-background-dark transform scale-100 group-hover:scale-110 transition-transform">
                                    {items.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-12 flex-grow">
                {/* Page Heading */}
                {/* Page Heading */}
                <div className="flex flex-col items-center text-center gap-8 mb-16 border-b border-white/5 pb-16 relative">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                    <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold bg-white/[0.03] backdrop-blur-md border border-white/10 w-fit px-6 py-2.5 rounded-full shadow-2xl hover:border-primary/30 transition-colors group">
                        <Link href="/" className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm group-hover:text-primary transition-colors">home</span>
                            <span className="mt-0.5">Home</span>
                        </Link>
                        <span className="material-symbols-outlined text-[10px] mx-3 text-slate-700">chevron_right</span>
                        <span className="text-white mt-0.5 font-black tracking-[0.25em]">Shop</span>
                    </nav>

                    <h1 className="text-white text-5xl md:text-7xl font-header font-black leading-[0.9] tracking-tighter uppercase max-w-5xl mx-auto drop-shadow-[0_0_45px_rgba(0,174,239,0.5)] animate-subtle-pulse">
                        Window Air Conditioners <br className="hidden md:block" />
                        <span className="text-slate-400">&</span> <span className="text-cyan-400">AC Services</span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed tracking-wide">
                        Shop Hawaii&apos;s highest-rated inventory of <span className="text-white font-bold">GE</span> & <span className="text-white font-bold">LG</span> energy-efficient units.
                        <br className="hidden md:block" />
                        Available for <span className="text-accent font-bold uppercase tracking-wider">Scheduled Pickup</span> at our <span className="text-primary font-bold border-b border-primary/30 hover:border-primary transition-all cursor-default">Waipahu Warehouse</span>.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-8 lg:sticky lg:top-24 h-fit">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white text-xl font-header font-bold uppercase tracking-wide flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">tune</span> Filters
                            </h3>
                            <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="text-xs font-bold uppercase text-slate-500 hover:text-primary transition-colors tracking-wider">Clear All</button>
                        </div>
                        {/* Brand/Category Filter */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400 uppercase text-xs font-bold tracking-widest">
                                <span className="material-symbols-outlined text-sm">category</span> Category
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setSelectedCategory(selectedCategory === 'WINDOW_AC' ? null : 'WINDOW_AC')}
                                    className={`relative group flex h-14 items-center justify-between rounded px-4 text-xs font-bold uppercase tracking-widest transition-all overflow-hidden border ${selectedCategory === 'WINDOW_AC' ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,174,239,0.2)]' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}`}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        <span className={`material-symbols-outlined text-lg ${selectedCategory === 'WINDOW_AC' ? 'text-primary' : 'text-slate-500 group-hover:text-white'}`}>ac_unit</span>
                                        Window AC
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${selectedCategory === 'WINDOW_AC' ? 'bg-primary shadow-[0_0_10px_rgba(0,174,239,1)] animate-pulse' : 'bg-slate-700'}`}></div>
                                    {selectedCategory === 'WINDOW_AC' && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50"></div>}
                                </button>
                                <button
                                    onClick={() => setSelectedCategory(selectedCategory === 'SERVICE' ? null : 'SERVICE')}
                                    className={`relative group flex h-14 items-center justify-between rounded px-4 text-xs font-bold uppercase tracking-widest transition-all overflow-hidden border ${selectedCategory === 'SERVICE' ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,174,239,0.2)]' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}`}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        <span className={`material-symbols-outlined text-lg ${selectedCategory === 'SERVICE' ? 'text-primary' : 'text-slate-500 group-hover:text-white'}`}>home_repair_service</span>
                                        Services
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${selectedCategory === 'SERVICE' ? 'bg-primary shadow-[0_0_10px_rgba(0,174,239,1)] animate-pulse' : 'bg-slate-700'}`}></div>
                                    {selectedCategory === 'SERVICE' && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50"></div>}
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-accent/[0.03] border border-accent/20 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-8xl text-accent">support_agent</span>
                            </div>
                            <p className="text-accent text-lg font-header font-bold flex items-center gap-2 mb-2 relative z-10 uppercase tracking-wide">
                                <span className="material-symbols-outlined text-2xl">verified</span> Expert Support
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                                Unsure about sizing? Call us or verify your room dimensions at the warehouse.
                            </p>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Inventory Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white/[0.02] p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2 uppercase tracking-wide">
                                <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                                Showing <span className="text-white font-bold text-lg">{loading ? '...' : products.length}</span> units in <span className="text-primary font-bold uppercase">Waipahu</span>
                            </p>
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                                <span className="text-slate-500">Sort:</span>
                                <select aria-label="Sort products" className="bg-black/40 border border-white/10 rounded text-white focus:ring-1 focus:ring-primary focus:border-primary px-3 py-2 cursor-pointer outline-none transition-all hover:border-primary/50 font-bold uppercase text-xs">
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-[420px] bg-white/[0.05] animate-pulse rounded-xl border border-white/5"></div>
                                ))
                            ) : error ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-xl bg-white/[0.02] border border-white/10 border-dashed backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-6xl text-red-500/50">wifi_off</span>
                                    <div className="text-red-400 font-bold text-lg font-header uppercase tracking-wide">Unable to load inventory</div>
                                    <p className="text-slate-500 text-sm">{error}</p>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-xl bg-white/[0.02] border border-white/10 border-dashed backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-6xl text-slate-700">search_off</span>
                                    <div className="text-white font-bold text-lg font-header uppercase tracking-wide">No products found</div>
                                    <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="text-primary hover:underline text-sm font-bold uppercase tracking-widest">Clear Filters</button>
                                </div>
                            ) : (
                                products.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="industrial-card group flex flex-col bg-[#0f131a] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,174,239,0.1)] transition-all duration-500 relative h-full animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards ring-1 ring-white/5"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                            {/* Image Area */}
                                            <div className="w-full aspect-[5/4] bg-[#090b10] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 border-b border-white/5 p-6">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f131a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

                                                {/* Tech Overlay Pattern */}
                                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0">
                                                     <div className="flex gap-1">
                                                         <div className="w-1 h-1 bg-primary rounded-full"></div>
                                                         <div className="w-1 h-1 bg-primary rounded-full"></div>
                                                         <div className="w-1 h-1 bg-primary rounded-full"></div>
                                                     </div>
                                                </div>

                                                {(() => {
                                                    const displayImage = item.image_url || getProductImages(item.id)?.[0];
                                                    return displayImage ? (
                                                        <Image
                                                            src={displayImage}
                                                            alt={item.name}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                            className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl relative z-10"
                                                            unoptimized={!!item.image_url}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-40 h-40 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                                                            <span className="material-symbols-outlined text-8xl text-slate-800 group-hover:text-primary transition-colors duration-500 relative z-10 drop-shadow-lg" aria-hidden="true">
                                                                {item.category === 'SERVICE' ? 'home_repair_service' : 'ac_unit'}
                                                            </span>
                                                        </div>
                                                    );
                                                })()}
                                            </div>

                                        <div className="p-6 flex flex-col grow relative z-20">
                                            {/* Status Line */}
                                            <div className="flex items-center justify-between gap-3 mb-4">
                                                <div className="flex items-center gap-3">
                                                    {item.stock > 0 ? (
                                                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
                                                            <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">In Stock</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-rose-500 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                                            <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">Sold Out</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-500 group-hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-base">warehouse</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Waipahu</span>
                                                </div>
                                            </div>

                                            <div className="mb-6 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-white/5 pb-1">
                                                        {item.category.replace('_', ' ')}
                                                    </p>
                                                    {item.name.includes("Dual Inverter") && (
                                                         <span className="text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20 shadow-[0_0_10px_rgba(57,181,74,0.1)]">Inverter Tech</span>
                                                    )}
                                                </div>

                                                <h3 className="text-white text-xl font-header font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight drop-shadow-sm h-[3.6rem]">
                                                    {item.name.replace(/\(.*\)/, '')}
                                                </h3>

                                                {/* Model Number Extraction - Placed below title for better layout */}
                                                {item.name.match(/\((.*?)\)/) && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-mono text-slate-500 font-medium tracking-widest uppercase border border-white/10 px-1.5 py-0.5 rounded">
                                                            Model: <span className="text-slate-300 group-hover:text-white transition-colors">{item.name.match(/\((.*?)\)/)?.[1]}</span>
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex items-baseline gap-3 pt-1">
                                                    <span className="text-3xl font-header font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400 tracking-tight group-hover:to-primary transition-all duration-500">${item.price.toLocaleString()}</span>
                                                    <span className="text-xs text-slate-600 font-bold line-throughdecoration-2 decoration-red-500/30">${(item.price * 1.25).toFixed(0).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto grid grid-cols-1 gap-3">
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-cyan-500 text-white font-bold uppercase tracking-widest text-[10px] h-12 rounded-lg transition-all shadow-[0_0_20px_rgba(0,174,239,0.15)] hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] hover:-translate-y-0.5 border border-white/10 group-hover:border-white/20"
                                                >
                                                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                                    Add to Order
                                                </button>
                                                <Link
                                                    href={`/shop/${item.id}`}
                                                    className="w-full flex items-center justify-center gap-2 bg-transparent text-slate-400 hover:text-white border border-white/5 hover:border-white/20 font-bold uppercase tracking-widest text-[10px] h-10 rounded-lg transition-all hover:bg-white/[0.03]"
                                                >
                                                    View Specs
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* --- SEO CONTENT EXPANSION --- */}

                {/* 1. Local Authority Section */}
                <section className="mt-24 bg-gradient-to-br from-charcoal via-[#0f172a] to-navy-900 rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden group shadow-2xl ring-1 ring-white/5">
                     <div className="absolute inset-0 bg-[url('/assets/pattern-dots.svg')] opacity-5 mix-blend-overlay"></div>
                     {/* Glow effects - stronger dynamics */}
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                     <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity duration-1000"></div>

                     <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,174,239,0.1)] backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Waipahu Distribution Center
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-header font-black text-white uppercase leading-[0.85] tracking-tighter drop-shadow-2xl">
                                Don&apos;t Buy <br/>
                                <span className="outline-text text-transparent/20">&quot;Big Box&quot;</span> <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-primary bg-300% animate-shine">Buy Local Expert.</span>
                            </h2>

                            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                                Why risk shipping damage or waiting weeks for mainland freight? Affordable Home A/C stocks thousands of units right here in <strong className="text-white">Waipahu, HI</strong>.
                                We don&apos;t just sell boxes; we&apos;re Oahu&apos;s authorized warranty center for LG and GE.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/10 hover:bg-white/[0.05] hover:border-accent/50 transition-all duration-300 group/item cursor-default hover:shadow-[0_0_30px_rgba(57,181,74,0.1)]">
                                    <div className="size-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:scale-110 group-hover/item:rotate-3 transition-transform duration-300 border border-accent/20">
                                        <span className="material-symbols-outlined text-3xl">local_shipping</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold uppercase text-sm tracking-wide group-hover/item:text-accent transition-colors">Same-Day Pickup</div>
                                        <div className="text-slate-500 text-xs font-medium">Skip the shipping wait</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/10 hover:bg-white/[0.05] hover:border-primary/50 transition-all duration-300 group/item cursor-default hover:shadow-[0_0_30px_rgba(0,174,239,0.1)]">
                                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 group-hover/item:-rotate-3 transition-transform duration-300 border border-primary/20">
                                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold uppercase text-sm tracking-wide group-hover/item:text-primary transition-colors">Local Warranty</div>
                                        <div className="text-slate-500 text-xs font-medium">We honor it right here</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         {/* Visual Representation of Warehouse */}
                        <div className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all duration-500 shadow-2xl">
                             {/* Abstract "Warehouse" Representation using gradients and icons */}
                            <div className="absolute inset-0 bg-[#0f172a]"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 p-8 text-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-slow"></div>
                                    <span className="material-symbols-outlined text-[120px] text-white/5 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">warehouse</span>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-primary font-bold tracking-[0.4em] uppercase text-xs">Oahu Inventory Hub</div>
                                    <div className="text-white font-header font-black text-4xl uppercase tracking-widest">Waipahu, HI</div>
                                </div>

                                <div className="mt-8 p-6 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 w-full max-w-sm hover:bg-white/[0.05] transition-colors">
                                    <div className="flex items-start gap-4 text-left">
                                        <span className="material-symbols-outlined text-primary text-2xl mt-1">pin_drop</span>
                                        <div>
                                            <div className="text-white font-bold text-lg uppercase tracking-wide">94-150 Leoleo St.</div>
                                            <div className="text-slate-400 text-sm font-medium">Waipahu Industrial Park</div>
                                            <div className="text-primary/80 text-xs font-bold mt-2 uppercase tracking-widest">Mon-Fri: 8am - 4pm</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </section>

                {/* 2. Brand Spotlight (LG & GE) */}
                <section className="mt-24">
                     <div className="flex items-center justify-between mb-12">
                         <h2 className="text-3xl font-header font-bold text-white uppercase tracking-tight">Premuim Brands</h2>
                         <div className="h-px bg-white/10 flex-1 ml-8"></div>
                     </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* LG Card */}
                        <div className="industrial-card rounded-3xl p-10 relative overflow-hidden group hover:border-rose-500/50 transition-all duration-500 flex flex-col h-full bg-[#120f14]">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="absolute -right-20 -top-20 size-64 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors duration-700"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-rose-500 font-black text-5xl tracking-tighter drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">LG</h3>
                                    <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]">Authorized Dealer</span>
                                </div>

                                <h4 className="text-2xl font-header font-bold text-white mb-4 uppercase tracking-wide">Dual Inverter Technology</h4>
                                <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                                    LG&apos;s revolutionary <strong className="text-white">Dual Inverter Compressor™</strong> eliminates the noisy stop-and-start cycle.
                                    <span className="block mt-2 text-rose-400 font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">bolt</span> Saves 40% Energy
                                    </span>
                                </p>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    <li className="flex items-center gap-4 text-sm text-slate-300 group/list p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <div className="size-10 shrink-0 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover/list:text-white group-hover/list:bg-rose-500 transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">volume_off</span>
                                        </div>
                                        <span className="font-medium">LoDecibel™ Operation (Sleep Mode)</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-sm text-slate-300 group/list p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <div className="size-10 shrink-0 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover/list:text-white group-hover/list:bg-rose-500 transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">wifi</span>
                                        </div>
                                        <span className="font-medium">ThinQ® WiFi Control</span>
                                    </li>
                                </ul>

                                <button
                                    onClick={() => { setSelectedCategory('WINDOW_AC'); setSearchQuery('LG'); }}
                                    className="w-full py-5 bg-rose-600/10 border border-rose-500/30 rounded-xl text-rose-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg"
                                >
                                    Shop LG Units <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* GE Card */}
                        <div className="industrial-card rounded-3xl p-10 relative overflow-hidden group hover:border-blue-400/50 transition-all duration-500 flex flex-col h-full bg-[#0f131a]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                             <div className="absolute -right-20 -top-20 size-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                     <h3 className="text-blue-400 font-serif font-bold text-3xl tracking-wide drop-shadow-[0_0_20px_rgba(96,165,250,0.3)]">GE APPLIANCES</h3>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded border border-blue-500/20 shadow-[0_0_10px_rgba(96,165,250,0.1)]">Profile Series</span>
                                </div>

                                <h4 className="text-2xl font-header font-bold text-white mb-4 uppercase tracking-wide">Ultra-Quiet Comfort</h4>
                                <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                                    <strong className="text-white">GE Profile™</strong> brings whisper-quiet cooling designed for bedrooms. Easy installation, maximum airflow visibility.
                                    <span className="block mt-2 text-blue-400 font-bold flex items-center gap-2">
                                         <span className="material-symbols-outlined text-sm">trophy</span> #1 for Island Reliability
                                    </span>
                                </p>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    <li className="flex items-center gap-4 text-sm text-slate-300 group/list p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <div className="size-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover/list:text-white group-hover/list:bg-blue-500 transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">dark_mode</span>
                                        </div>
                                        <span className="font-medium">Dimming LED Display</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-sm text-slate-300 group/list p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <div className="size-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover/list:text-white group-hover/list:bg-blue-500 transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">install_desktop</span>
                                        </div>
                                        <span className="font-medium">EZ Mount Installation</span>
                                    </li>
                                </ul>

                                <button
                                    onClick={() => { setSelectedCategory('WINDOW_AC'); setSearchQuery('GE'); }}
                                    className="w-full py-5 bg-blue-600/10 border border-blue-500/30 rounded-xl text-blue-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg"
                                >
                                    Shop GE Units <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Sizing Guide (Table) */}
                <section className="mt-24">
                     <div className="text-center mb-16 px-4">
                         <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Technical Resource</div>
                         <h2 className="text-3xl md:text-6xl font-header font-black text-white mb-6 uppercase tracking-tighter">Hawaii Room <span className="text-primary">Sizing Guide</span></h2>
                         <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">Don&apos;t guess. Undersized units run constantly without cooling; oversized units cycle too fast and leave humidity. <span className="text-white font-bold">Find your perfect match.</span></p>
                     </div>

                     <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-charcoal relative">
                        {/* Table Header Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-80"></div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/10">
                                    <th className="p-6 md:p-8 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/4">Room Size (Sq. Ft.)</th>
                                    <th className="p-6 md:p-8 text-xs font-bold text-primary uppercase tracking-widest w-1/4">Recommended BTU</th>
                                    <th className="p-6 md:p-8 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Typical Application</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-background-dark/50">
                                {[
                                    { sq: "100 - 150", btu: "5,000 - 6,000", app: "Small Bedroom / Office" },
                                    { sq: "150 - 250", btu: "6,000 - 8,000", app: "Master Bedroom / Studio" },
                                    { sq: "250 - 350", btu: "8,000 - 10,000", app: "Large Master / Living Area" },
                                    { sq: "350 - 450", btu: "10,000 - 12,000", app: "Living Room / Ohana Unit" },
                                    { sq: "450 - 550", btu: "14,000 - 15,000", app: "Open Concept Living / Dining" },
                                    { sq: "550 - 1,000+", btu: "18,000 - 24,000", app: "Whole Floor / Large Open Space" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-primary/[0.03] transition-colors group">
                                        <td className="p-6 md:p-8 text-slate-300 font-bold group-hover:text-white transition-colors border-l-2 border-transparent group-hover:border-primary/50">{row.sq} sq. ft.</td>
                                        <td className="p-6 md:p-8">
                                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-header font-bold text-lg rounded md:text-xl border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_10px_rgba(0,174,239,0.1)] group-hover:shadow-[0_0_15px_rgba(0,174,239,0.4)]">
                                                {row.btu}
                                            </span>
                                        </td>
                                        <td className="p-6 md:p-8 text-slate-500 text-sm hidden md:table-cell font-medium group-hover:text-slate-400 transition-colors">{row.app}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>

                     <div className="mt-8 flex items-start gap-4 justify-center text-slate-500 max-w-2xl mx-auto bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
                        <span className="material-symbols-outlined text-accent text-2xl shrink-0 mt-0.5 animate-pulse">info</span>
                        <div className="text-left">
                            <p className="text-xs uppercase tracking-widest font-bold text-slate-300 mb-1">High Ceiling / Sun Exposure?</p>
                            <p className="text-sm text-slate-500 leading-normal">
                                For rooms with high ceilings (9ft+) or direct afternoon sun, we recommend <span className="text-white font-bold decoration-accent decoration-2 underline underline-offset-4">sizing up by 10%</span> to ensure efficiency.
                            </p>
                        </div>
                     </div>
                </section>

                 {/* 4. FAQ SEO */}
                 <section className="mt-24 mb-24 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <h2 className="text-2xl md:text-3xl font-header font-bold text-white uppercase tracking-wide text-center">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid gap-4">
                        {[
                            { q: "Do you offer installation for Window ACs?", a: "Unless specified, Window ACs are cash-and-carry. However, we offer professional installation services for an additional fee, especially for second-story windows or custom mounting requirements." },
                            { q: "What is your return policy?", a: "Unopened units can be returned within 30 days. Defective units are covered under the manufacturer&apos;s warranty, which we service directly here in Waipahu as an authorized center." },
                            { q: "How do I know if I have a 115V or 230V outlet?", a: "Standard household plugs are 115V (parallel prongs). 230V outlets are typically larger with horizontal or T-shaped prongs and are required for units 18,000 BTU and above. Check your wall socket before buying!" },
                        ].map((faq, i) => (
                            <details key={i} className="group bg-charcoal border border-white/5 rounded-2xl overflow-hidden open:bg-white/[0.02] open:border-primary/40 open:shadow-[0_0_30px_rgba(0,174,239,0.05)] transition-all duration-300 hover:border-white/10">
                                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-300 hover:text-white transition-colors select-none text-sm md:text-base uppercase tracking-wide">
                                    {faq.q}
                                    <span className="material-symbols-outlined text-slate-500 group-open:rotate-180 group-open:text-primary transition-all duration-300 bg-white/5 rounded-full p-2 group-hover:bg-white/10">expand_more</span>
                                </summary>
                                <div className="px-6 pb-8 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-6 animate-in fade-in slide-in-from-top-2">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                 </section>
            </main>
        </div>
    );
}
