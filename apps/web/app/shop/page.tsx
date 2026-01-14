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
                                        className="industrial-card group flex flex-col bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,174,239,0.15)] hover:bg-white/[0.04] transition-all duration-300 relative h-full animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >



                                            {/* Image Area */}
                                            <div className="w-full aspect-[5/4] bg-white/[0.05] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border-b border-primary/10 shadow-[inset_0_0_20px_rgba(0,174,239,0.05)] p-6">
                                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 z-0"></div>

                                                {getProductImages(item.id).length > 0 ? (
                                                    <Image
                                                        src={getProductImages(item.id)[0]}
                                                        alt={item.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                        className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-32 h-32 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                                                        <span className="material-symbols-outlined text-8xl text-slate-800 group-hover:text-primary transition-colors duration-300 relative z-0" aria-hidden="true">
                                                            {item.category === 'SERVICE' ? 'home_repair_service' : 'ac_unit'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                        <div className="p-6 flex flex-col grow relative z-20">
                                            {/* Status Line */}
                                            <div className="flex items-center justify-between gap-3 mb-2">
                                                <div className="flex items-center gap-3">
                                                    {item.stock > 0 ? (
                                                        <div className="flex items-center gap-2 text-green-500">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider leading-none mt-0.5">In Stock</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-red-500">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider leading-none mt-0.5">Sold Out</span>
                                                        </div>
                                                    )}
                                                    <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                                    <div className="flex items-center gap-2 text-accent opacity-90">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider leading-none mt-0.5">Pickup: Waipahu</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-white/10 px-2 py-1 rounded w-fit">
                                                        {item.category.replace('_', ' ')}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-accent">
                                                        <span className="material-symbols-outlined text-sm">star</span>
                                                        <span className="font-bold text-xs">4.8</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-white text-xl font-header font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wide">{item.name}</h3>

                                                <div className="flex items-baseline gap-2 mt-3">
                                                    <span className="text-2xl font-header font-bold text-white tracking-wide">${item.price.toLocaleString()}</span>
                                                    <span className="text-sm text-slate-500 font-medium line-through">${(item.price * 1.2).toFixed(0).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto grid grid-cols-1 gap-3">
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-dark font-bold uppercase tracking-widest text-[11px] h-12 rounded transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.5)] hover:scale-[1.02]"
                                                >
                                                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                                    Add to Order
                                                </button>
                                                <Link
                                                    href={`/shop/${item.id}`}
                                                    className="w-full flex items-center justify-center gap-2 bg-transparent text-slate-400 hover:text-white border border-white/10 hover:border-white/30 font-bold uppercase tracking-widest text-[10px] h-10 rounded transition-all"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
