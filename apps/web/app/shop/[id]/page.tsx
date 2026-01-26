'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { getProductImages } from '../../../lib/product-images';
import { getProductSpecs } from '../../../lib/product-specs';
import { Product } from '../../../types/inventory';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
    const params = useParams();
    // In Next.js App Router, params are strings. Safe to cast or just use.
    const id = params?.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { content, isEditMode } = useContent();

    const { addToCart, items, openCart } = useCart();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;
            try {
                const apiUrl = '/api/v1';
                const res = await fetch(`${apiUrl}/products/${id}`);

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
        fetchProduct();
    }, [id]);

    const productImages = product ? [
        ...(product.image_url ? [product.image_url] : []),
        ...getProductImages(product.id)
    ] : [];
    const specs = product ? getProductSpecs(product.id) : null;

    // Set initial image
    useEffect(() => {
        if (productImages.length > 0 && !selectedImage) {
            setSelectedImage(productImages[0]);
        }
    }, [product, productImages, selectedImage]);

    // Spec Sheet Mapping
    const specSheetMap: { [key: number]: string } = {
        1: '/assets/specsheets/ge/GE-AJCQ08AWJ-spec-sheet.pdf',
        2: '/assets/specsheets/ge/GE-AJCQ10AWJ-spec-sheet.pdf',
        3: '/assets/specsheets/ge/GE-AJCQ12AWJ-spec-sheet.pdf',
        4: '/assets/specsheets/lg-dual-inverter+wifi/LW6023IVSM_spec_sheet-1.pdf',
        5: '/assets/specsheets/lg-dual-inverter+wifi/LW8022IVSM-Spec-Sheet.pdf',
        6: '/assets/specsheets/lg-dual-inverter+wifi/LW1022IVSM-Spec-Sheet.pdf',
        7: '/assets/specsheets/lg-dual-inverter+wifi/LW1222IVSM-Spec-Sheet.pdf',
        8: '/assets/specsheets/lg-dual-inverter+wifi/LW1522IVSM-Spec-Sheet-1.pdf',
        9: '/assets/specsheets/lg-dual-inverter+wifi/LW1822IVSM-Spec-Sheet-1.pdf',
        10: '/assets/specsheets/lg-dual-inverter+wifi/LW2422IVSM-Spec-Sheet-1.pdf',
        11: '/assets/specsheets/lg-universal-fit+wifi/LW8023HRSM_spec_sheet.pdf',
        12: '/assets/specsheets/lg-universal-fit+wifi/LW1823HRSM_spec_sheet.pdf',
        13: '/assets/specsheets/lg-universal-fit+wifi/LW2423HRSM_spec_sheet.pdf',
    };

    const specSheetUrl = product ? specSheetMap[product.id] : null;

    if (loading) return (
        <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-4 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6 animate-pulse">
                <span className="material-symbols-outlined text-8xl text-primary/50 animate-[spin_3s_linear_infinite]" aria-hidden="true">mode_fan</span>
                <p className="font-header font-bold uppercase tracking-widest text-lg text-slate-500">Loading Specifications...</p>
            </div>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-4 flex items-center justify-center">
            <div className="text-center space-y-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <span className="material-symbols-outlined text-5xl text-red-500" aria-hidden="true">error_outline</span>
                </div>
                <div>
                    <h1 className="text-3xl font-header font-bold uppercase mb-2">Product Not Found</h1>
                    <p className="text-slate-500 max-w-md">The product you are looking for is currently unavailable or has been moved.</p>
                </div>
                <Link href="/shop" className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded text-white font-bold uppercase tracking-widest text-xs transition-all">Return to Inventory</Link>
            </div>
        </div>
    );

    return (
        <div className="bg-background-dark min-h-screen selection:bg-primary/30 text-slate-100">
            <Navbar />

            <main className="pt-48 md:pt-56 pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center md:text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Visual Anchor */}
                    <div className="space-y-8 md:sticky md:top-40">
                        <div className="aspect-square bg-[#0a0e14] rounded-[2rem] border border-white/5 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.6)] ring-1 ring-white/10 flex items-center justify-center p-6 lg:p-10">
                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                            {/* Radial Highlights */}
                            <div className="absolute -left-20 -top-20 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
                            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

                            {selectedImage ? (
                                <div className="relative w-full h-full z-10">
                                    <Image
                                        src={selectedImage}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all duration-1000 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            ) : (
                                <span className="material-symbols-outlined text-[200px] text-white/5">ac_unit</span>
                            )}
                        </div>

                        {/* Thumbnail Bar */}
                        {productImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 justify-center md:justify-start [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary">
                                {productImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={cn(
                                            "relative w-20 h-20 rounded-xl overflow-hidden border transition-all shrink-0",
                                            selectedImage === img ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/20" : "border-white/10 hover:border-white/30 grayscale hover:grayscale-0"
                                        )}
                                    >
                                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Technical Command Center */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                                <span className="px-5 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary text-[11px] font-header font-black uppercase tracking-[0.5em] shadow-[0_0_30px_rgba(0,174,239,0.1)]">
                                    {product.category.replace('_', ' ')}
                                </span>
                                <span className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-[11px] font-header font-black uppercase tracking-[0.5em] flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    Operational Inventory
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-6xl font-header font-black uppercase leading-[0.9] tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3 pt-2 justify-center md:justify-start">
                                <span className="text-3xl md:text-5xl font-header font-black text-primary tracking-tight">
                                    ${product.price.toLocaleString()}
                                </span>
                                <span className="text-xl text-red-500/60 line-through font-bold decoration-red-500/30">
                                    ${(product.price * 1.25).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/10 to-transparent w-full"></div>

                        {/* Bento Specifications Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[9px] font-header font-black uppercase tracking-[0.3em] mb-2 group-hover/spec:text-primary">Performance</div>
                                <div className="text-white font-header font-black text-2xl">{specs?.btu}</div>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[9px] font-header font-black uppercase tracking-[0.3em] mb-2 group-hover/spec:text-primary">Coverage</div>
                                <div className="text-white font-header font-black text-2xl">{specs?.coolingArea}</div>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[9px] font-header font-black uppercase tracking-[0.3em] mb-2 group-hover/spec:text-primary">Efficiency</div>
                                <div className="text-white font-header font-black text-2xl">{specs?.eer}</div>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-6 rounded-2xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[9px] font-header font-black uppercase tracking-[0.3em] mb-2 group-hover/spec:text-primary">Voltage</div>
                                <div className="text-white font-header font-black text-2xl">{specs?.voltage}</div>
                            </div>
                        </div>

                        {/* Secondary Specifications Hub */}
                        <div className="bg-[#0a0e14] border border-white/5 rounded-[2rem] p-6 md:p-8 ring-1 ring-white/10 shadow-2xl relative overflow-hidden group/details">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                            <div className="grid grid-cols-2 gap-y-8 gap-x-4 items-start relative z-10 text-sm md:text-left">
                                <div className="flex flex-col gap-2 items-center md:items-start">
                                    <span className="text-slate-500 text-xs font-header font-black uppercase tracking-widest">Dimensions</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-sm md:text-base">{specs?.dimensions || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-2 items-center md:items-start">
                                    <span className="text-slate-500 text-xs font-header font-black uppercase tracking-widest">Weight</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-sm md:text-base">{specs?.weight || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-2 items-center md:items-start">
                                    <span className="text-slate-500 text-xs font-header font-black uppercase tracking-widest">Warranty Protection</span>
                                    <span className="text-rose-400 font-header font-black uppercase tracking-wide text-sm md:text-base">{specs?.warranty || '1 YEAR LIMITED'}</span>
                                </div>
                                <div className="flex flex-col gap-2 items-center md:items-start">
                                    <span className="text-slate-500 text-xs font-header font-black uppercase tracking-widest">Power Requirement</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-sm md:text-base">{specs?.watts || 'N/A'}W / {specs?.amps || 'N/A'}A</span>
                                </div>
                            </div>
                        </div>

                        {/* Lifestyle & Performance Profile (Renamed from Architectural Profile) */}
                        <div className="space-y-8 border-t border-white/5 pt-10">
                            <div className="flex flex-col items-center md:items-start space-y-2">
                                <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-header font-black uppercase tracking-[0.3em] inline-block shadow-[0_0_20px_rgba(0,174,239,0.1)]">
                                    Technical Resource
                                </div>
                                <h3 className="text-white font-header font-black uppercase tracking-widest text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    At A Glance
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Deployment Card */}
                                <div className="bg-[#0a0e14] border border-white/5 p-6 md:p-8 rounded-3xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:shadow-[0_0_20px_rgba(0,174,239,0.2)] transition-shadow">
                                        <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                                    </div>
                                    <div className="text-primary text-xs font-header font-black uppercase tracking-[0.2em] mb-3">{specs?.deploymentHeader}</div>
                                    <p className="text-slate-300 text-sm leading-relaxed font-medium group-hover:text-white transition-colors">{specs?.idealFor || 'General Residential Cooling'}</p>
                                </div>

                                {/* Feature Card */}
                                <div className="bg-[#0a0e14] border border-white/5 p-6 md:p-8 rounded-3xl hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-shadow">
                                        <span className="material-symbols-outlined text-emerald-500 text-2xl">bolt</span>
                                    </div>
                                    <div className="text-emerald-500 text-xs font-header font-black uppercase tracking-[0.2em] mb-3">{specs?.featureHeader}</div>
                                    <p className="text-slate-300 text-sm leading-relaxed font-medium group-hover:text-white transition-colors">{specs?.benefits || 'High efficiency cooling performance.'}</p>
                                </div>

                                {/* Acoustic Card */}
                                <div className="bg-[#0a0e14] border border-white/5 p-6 md:p-8 rounded-3xl hover:border-blue-400/30 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20 mb-6 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.2)] transition-shadow">
                                        <span className="material-symbols-outlined text-blue-400 text-2xl">graphic_eq</span>
                                    </div>
                                    <div className="text-blue-400 text-xs font-header font-black uppercase tracking-[0.2em] mb-3">{specs?.acousticHeader}</div>
                                    <p className="text-slate-300 text-sm leading-relaxed font-medium group-hover:text-white transition-colors">{specs?.soundProfile || 'Standard Operation'}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Cluster */}
                        <div className="space-y-6 pt-6 relative">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full h-20 bg-gradient-to-r from-primary to-cyan-500 text-white font-header font-black uppercase tracking-[0.5em] text-lg rounded-2xl shadow-[0_20px_50px_rgba(0,174,239,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                            >
                                <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">add_shopping_cart</span>
                                Add to Cart
                            </button>
                            {specSheetUrl && (
                                <button
                                    onClick={() => setIsSpecModalOpen(true)}
                                    className="w-full h-16 bg-white/[0.03] hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white font-header font-black uppercase tracking-[0.4em] text-xs rounded-2xl transition-all flex items-center justify-center gap-4"
                                >
                                    <span className="material-symbols-outlined text-xl">description</span>
                                    Factory Specs (PDF)
                                </button>
                            )}

                            <div className="mt-8 bg-[#0f0505] border border-red-500/20 rounded-xl p-6 flex flex-col items-center text-center shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                                <div className="flex items-center gap-2 mb-3 text-red-500">
                                    <span className="material-symbols-outlined text-lg">policy</span>
                                    <h5 className="font-header font-black uppercase tracking-[0.2em] text-xs">All Sales Final</h5>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-red-400/80 text-[10px] font-bold leading-relaxed uppercase tracking-widest">
                                        No Refunds • No Exchanges
                                    </p>
                                    <p className="text-slate-500 text-[10px] leading-relaxed font-medium max-w-[240px] mx-auto">
                                        All warranty claims & defective units must be processed directly through the manufacturer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            {/* Spec Sheet Preview Modal */}
            {
                isSpecModalOpen && specSheetUrl && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm">
                        <div className="bg-[#0a0e14] border border-white/10 w-full h-full md:w-[90vw] md:h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-white/20">
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h3 className="font-header font-black uppercase text-white tracking-widest text-sm">Specification Analysis</h3>
                                <button onClick={() => setIsSpecModalOpen(false)} className="p-2 text-slate-500 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-3xl">close</span>
                                </button>
                            </div>
                            <div className="grow bg-white/5 relative">
                                <iframe src={specSheetUrl} className="w-full h-full" title="Spec Sheet" />
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    );
}
