'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { getProductImages } from '../../../lib/product-images';
import { getProductSpecs } from '../../../lib/product-specs';
import { Product } from '../../../types/inventory';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';



export default function ProductDetailPage() {
    const params = useParams();
    // In Next.js App Router, params are strings. Safe to cast or just use.
    const slug = params?.slug as string;
    
    // Extract ID (everything before the first hyphen)
    const id = slug ? slug.split('-')[0] : null;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { content } = useContent();

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

    const productImages = useMemo(() => {
        return product ? [
            ...(product.image_url ? [product.image_url] : []),
            ...getProductImages(product.id)
        ] : [];
    }, [product]);
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


            <main className="pt-[200px] md:pt-[340px] pb-12 px-4 md:px-8 max-w-6xl mx-auto text-center md:text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Visual Anchor */}
                    <div className="space-y-6 md:sticky md:top-36">
                        <div className="aspect-square bg-[#0a0e14] rounded-[2rem] border border-white/5 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.6)] ring-1 ring-white/10 flex items-center justify-center p-6 lg:p-8">
                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                            {/* Radial Highlights */}
                            <div className="absolute -left-20 -top-20 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                            <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

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
                                <span className="material-symbols-outlined text-[150px] text-white/5">ac_unit</span>
                            )}
                        </div>

                        {/* Thumbnail Bar */}
                        {productImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 justify-center md:justify-start [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary">
                                {productImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={cn(
                                            "relative w-16 h-16 rounded-lg overflow-hidden border transition-all shrink-0",
                                            selectedImage === img ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/20" : "border-white/10 hover:border-white/30 grayscale hover:grayscale-0"
                                        )}
                                    >
                                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Technical Command Center - Compacted */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                                <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary text-[8px] font-header font-black uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(0,174,239,0.1)]">
                                    {product.category.replace('_', ' ')}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-header font-black uppercase leading-[0.95] tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3 pt-1 justify-center md:justify-start">
                                <span className="text-xl md:text-3xl font-header font-black text-primary tracking-tight">
                                    ${product.price.toLocaleString()}
                                </span>

                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/10 to-transparent w-full"></div>

                        {/* Bento Specifications Grid - Condensed */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#0a0e14] border border-white/5 p-3 rounded-xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Performance</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.btu}</div>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-3 rounded-xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Coverage</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.coolingArea}</div>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-3 rounded-xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Efficiency</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.eer}</div>
                            </div>
                            <div className="bg-[#0a0e14] border border-white/5 p-3 rounded-xl ring-1 ring-white/10 shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-500 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Voltage</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.voltage}</div>
                            </div>
                        </div>

                        {/* Secondary Specifications Hub - Compacted */}
                        <div className="bg-[#0a0e14] border border-white/5 rounded-2xl p-4 md:p-5 ring-1 ring-white/10 shadow-xl relative overflow-hidden group/details">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 items-start relative z-10 text-xs md:text-left">
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-500 text-[9px] font-header font-black uppercase tracking-widest">Dimensions</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs?.dimensions || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-500 text-[9px] font-header font-black uppercase tracking-widest">Weight</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs?.weight || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-500 text-[9px] font-header font-black uppercase tracking-widest">Manufacturer Warranty</span>
                                    <span className="text-rose-400 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs?.warranty || '1 YEAR LIMITED'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-500 text-[9px] font-header font-black uppercase tracking-widest">Primary Feature</span>
                                    <span className="font-header font-black uppercase tracking-wide text-[10px] md:text-xs text-primary">{specs?.keyFeature || 'Standard Cooling'}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Cluster */}
                        <div className="space-y-3 pt-2 relative">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full h-16 bg-gradient-to-r from-primary to-cyan-500 text-white font-header font-black uppercase tracking-[0.4em] text-sm rounded-xl shadow-[0_20px_50px_rgba(0,174,239,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                            >
                                <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">add_shopping_cart</span>
                                Add to Cart
                            </button>
                            {specSheetUrl && (
                                <button
                                    onClick={() => setIsSpecModalOpen(true)}
                                    className="w-full h-12 bg-white/[0.03] hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white font-header font-black uppercase tracking-[0.3em] text-[10px] rounded-xl transition-all flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-lg">description</span>
                                    Factory Specs (PDF)
                                </button>
                            )}

                            <div className="mt-6 bg-[#0f0505] border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                                <div className="flex items-center gap-2 mb-2 text-red-500">
                                    <span className="material-symbols-outlined text-base">policy</span>
                                    <h5 className="font-header font-black uppercase tracking-[0.2em] text-[10px]">All Sales Final</h5>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-red-400/80 text-[9px] font-bold leading-relaxed uppercase tracking-widest">
                                        No Refunds • No Exchanges
                                    </p>
                                    <p className="text-slate-500 text-[9px] leading-relaxed font-medium max-w-[200px] mx-auto">
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
