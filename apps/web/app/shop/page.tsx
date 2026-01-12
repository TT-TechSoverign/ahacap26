'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
// Fix import path: go up two levels to 'web', then into 'context'
import { useCart } from '../../context/CartContext';
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
                            <span className="material-symbols-outlined text-white text-2xl animate-[spin_10s_linear_infinite]">mode_fan</span>
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
                            placeholder="Search brands, BTUs, or SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-xl shadow-black/20 hover:bg-surface-dark hover:border-white/20"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={openCart}
                            className="relative group p-2 hover:bg-white/5 rounded-xl transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl text-slate-300 group-hover:text-white transition-colors">shopping_cart</span>
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
                <div className="flex flex-wrap justify-between items-end gap-6 mb-12 border-b border-white/10 pb-8">
                    <div className="flex flex-col gap-3">
                        <nav className="flex text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                            <Link href="/" className="hover:text-primary cursor-pointer transition-colors">Home</Link>
                            <span className="mx-2 text-slate-700">/</span>
                            <span className="text-primary">Shop Inventory</span>
                        </nav>
                        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase">Window AC Oahu Inventory</h1>
                        <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
                            High-performance cooling solutions optimized for the Hawaii climate. <br className="hidden md:block" />Available for immediate pickup at our <span className="text-white font-bold">Aiea Warehouse</span>.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-8 lg:sticky lg:top-24 h-fit">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">tune</span> Filters
                            </h3>
                            <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="text-xs font-bold uppercase text-slate-500 hover:text-white transition-colors">Clear All</button>
                        </div>
                        {/* Brand/Category Filter */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400 uppercase text-xs font-black tracking-wider">
                                <span className="material-symbols-outlined text-sm">category</span> Category
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedCategory(selectedCategory === 'WINDOW_AC' ? null : 'WINDOW_AC')}
                                    className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-xs font-bold transition-all ${selectedCategory === 'WINDOW_AC' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' : 'bg-surface-dark border-border-dark text-slate-400 hover:border-primary hover:text-white'}`}
                                >
                                    Window AC
                                </button>
                                <button
                                    onClick={() => setSelectedCategory(selectedCategory === 'SERVICE' ? null : 'SERVICE')}
                                    className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-xs font-bold transition-all ${selectedCategory === 'SERVICE' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' : 'bg-surface-dark border-border-dark text-slate-400 hover:border-primary hover:text-white'}`}
                                >
                                    Services
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-surface-dark border border-border-dark rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-primary">support_agent</span>
                            </div>
                            <p className="text-white text-sm font-bold flex items-center gap-2 mb-2 relative z-10">
                                <span className="material-symbols-outlined text-primary">verified</span> Expert Support
                            </p>
                            <p className="text-slate-400 text-xs leading-relaxed relative z-10">
                                Unsure about sizing? Calls us or verify your room dimensions at the warehouse.
                            </p>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Inventory Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-surface-dark p-4 rounded-xl border border-border-dark shadow-sm">
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-500">inventory_2</span>
                                Showing <span className="text-white font-bold text-lg">{loading ? '...' : products.length}</span> units in <span className="text-primary font-bold uppercase">Aiea</span>
                            </p>
                            <div className="flex items-center gap-3 text-xs font-bold uppercase">
                                <span className="text-slate-500">Sort:</span>
                                <select className="bg-background-dark border border-border-dark rounded-lg text-white focus:ring-1 focus:ring-primary focus:border-primary px-3 py-2 cursor-pointer outline-none transition-all hover:border-primary/50">
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-[420px] bg-surface-dark animate-pulse rounded-2xl border border-border-dark"></div>
                                ))
                            ) : error ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-surface-dark border border-border-dark border-dashed">
                                    <span className="material-symbols-outlined text-6xl text-red-500/50">wifi_off</span>
                                    <div className="text-red-400 font-bold text-lg">Unable to load inventory</div>
                                    <p className="text-slate-500 text-sm">{error}</p>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-surface-dark border border-border-dark border-dashed">
                                    <span className="material-symbols-outlined text-6xl text-slate-700">search_off</span>
                                    <div className="text-white font-bold text-lg">No products found</div>
                                    <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="text-primary hover:underline text-sm font-bold">Clear Filters</button>
                                </div>
                            ) : (
                                products.map((item) => (
                                    <div key={item.id} className="group flex flex-col bg-surface-dark border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-glow hover:shadow-primary/5 transition-all duration-300 relative h-full">

                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            {item.stock > 0 ? (
                                                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-white text-[10px] font-bold uppercase tracking-wide">In Stock</span>
                                                </div>
                                            ) : (
                                                <div className="bg-red-500/90 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-lg">Sold Out</div>
                                            )}
                                        </div>

                                        <div className="absolute top-[18px] right-[-32px] rotate-45 w-[120px] bg-yellow-400/90 backdrop-blur-md text-black text-center font-black text-[10px] py-1 shadow-lg z-20 tracking-wider">
                                            PICKUP
                                        </div>

                                        {/* Image Area */}
                                        <div className="w-full aspect-[5/4] bg-background-dark relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-60 z-10"></div>

                                            {/* Abstract Graphic Placeholder */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-32 h-32 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                                                <span className="material-symbols-outlined text-8xl text-slate-800 group-hover:text-primary transition-colors duration-300 relative z-0">
                                                    {item.category === 'SERVICE' ? 'home_repair_service' : 'ac_unit'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col grow relative z-20 -mt-2">
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest bg-background-dark/50 px-2 py-1 rounded w-fit">
                                                        {item.category.replace('_', ' ')}
                                                    </p>
                                                    <div className="flex text-yellow-500 text-[10px] gap-0.5">
                                                        <span className="material-symbols-outlined text-sm -mt-0.5">star</span>
                                                        <span className="font-bold text-slate-300">4.8</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-white text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">{item.name}</h3>

                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-black text-white tracking-tight">${item.price.toLocaleString()}</span>
                                                    <span className="text-xs text-slate-500 font-medium line-through decoration-slate-600">${(item.price * 1.2).toFixed(0).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto grid grid-cols-1 gap-3">
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] h-11 rounded-xl transition-all shadow-lg hover:shadow-primary/50 active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                                    Add to Order
                                                </button>
                                                <Link
                                                    href={`/shop/${item.id}`}
                                                    className="w-full flex items-center justify-center gap-2 bg-background-dark text-slate-300 hover:text-white border border-border-dark hover:border-slate-500 font-bold uppercase tracking-wider text-[10px] h-11 rounded-xl transition-all"
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

            </main>
        </div>
    );
}
