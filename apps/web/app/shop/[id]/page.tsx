'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { Product } from '../../../types';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProduct() {
            try {
                // Use relative URL or env var
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
                const res = await fetch(`${apiUrl}/products/${params.id}`);

                if (!res.ok) throw new Error('Product not found');
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error("Product Fetch Error:", err);
                setError('Unable to load product details.');
            } finally {
                setLoading(false);
            }
        }
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) return (
        <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-4 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <span className="material-symbols-outlined text-6xl text-primary animate-spin">fan</span>
                <p className="font-bold uppercase tracking-widest text-sm text-slate-500">Loading Specifications...</p>
            </div>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-4 flex items-center justify-center">
            <div className="text-center space-y-4">
                <span className="material-symbols-outlined text-6xl text-red-500/50">error</span>
                <h1 className="text-2xl font-black uppercase">Product Not Found</h1>
                <Link href="/shop" className="text-primary hover:underline font-bold uppercase tracking-wider text-sm">Return to Inventory</Link>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-background-dark text-white pt-10 pb-20 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <Link href="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 font-bold uppercase tracking-wider text-xs transition-colors group">
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Inventory
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Visual Section */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-surface-dark rounded-3xl border border-border-dark flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-surface-dark via-transparent to-transparent z-10"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>

                            <span className="material-symbols-outlined text-[120px] md:text-[200px] text-slate-800 group-hover:text-slate-700 transition-colors duration-500 relative z-0">
                                {product.category === 'SERVICE' ? 'home_repair_service' : 'ac_unit'}
                            </span>

                            {/* Floating Stats */}
                            <div className="absolute bottom-8 left-8 z-20 space-y-2">
                                <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">energy_savings_leaf</span>
                                    <div className="text-xs">
                                        <div className="text-slate-400 font-bold uppercase tracking-wider">Energy Rating</div>
                                        <div className="font-black text-white">Efficiency Class A</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col h-full">
                        <div className="mb-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                                    {product.category.replace('_', ' ')}
                                </span>
                                {product.stock > 0 ? (
                                    <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        In Stock (Aiea)
                                    </span>
                                ) : (
                                    <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                                        Sold Out
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight mb-4">{product.name}</h1>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-black text-primary">${product.price.toLocaleString()}</span>
                                <div className="text-sm text-slate-500 font-bold">
                                    <span className="block mb-1">Unit Price (Tax included in cart)</span>
                                    <span className="text-green-500 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">savings</span>
                                        Save ${(product.price * 0.2).toFixed(0)} vs Retail
                                    </span>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-p:text-slate-400 prose-p:text-sm prose-p:leading-relaxed mb-8">
                                <p>
                                    Experience superior climate control with this industrial-grade {product.name}.
                                    Engineered for maintaining precise temperatures in humid environments.
                                    Perfect for residential or commercial application in Hawaii.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-surface-dark border border-border-dark p-4 rounded-xl">
                                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Cooling Output</div>
                                    <div className="text-white font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">mode_fan</span>
                                        High Capacity
                                    </div>
                                </div>
                                <div className="bg-surface-dark border border-border-dark p-4 rounded-xl">
                                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Warranty</div>
                                    <div className="text-white font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">verified_user</span>
                                        1 Year Local
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="sticky bottom-4 lg:relative lg:bottom-auto bg-surface-dark/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl lg:rounded-none border lg:border-none border-border-dark shadow-2xl lg:shadow-none mt-8 z-30">
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full bg-white hover:bg-slate-200 text-black font-black uppercase tracking-widest text-sm h-14 rounded-xl transition-all shadow-xl shadow-white/5 hover:shadow-white/10 flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    Add to Order
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                                <p className="text-center text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                    Secure Checkout • Instant Confirmation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
