'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { getProductImages } from '../../../lib/product-images';
import { getProductSpecs } from '../../../lib/product-specs';
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

    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        <main className="min-h-screen bg-background-dark text-white pt-10 pb-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center text-xs uppercase tracking-widest text-slate-500 font-bold mb-8">
                    <Link href="/shop" className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group">
                        <span className="bg-white/5 p-1 rounded group-hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-sm block" aria-hidden="true">arrow_back</span>
                        </span>
                        Back to Inventory
                    </Link>
                    <span className="material-symbols-outlined text-[10px] mx-3 text-slate-700">chevron_right</span>
                    <span className="text-white border-b border-white/20 pb-0.5">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Visual Section */}
                    <div className="relative sticky top-24">
                        <div className="aspect-square bg-white/[0.05] rounded-2xl border border-primary/20 flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(0,174,239,0.05)] mb-4 p-12">
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-60 z-0"></div>

                            {/* Neon Glow Behind */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2/3 h-2/3 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {selectedImage ? (
                                <div className="relative w-full h-full z-20">
                                    <Image
                                        src={selectedImage}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                        priority
                                        unoptimized={!!product.image_url && selectedImage === product.image_url}
                                    />
                                </div>
                            ) : (
                                <span className="material-symbols-outlined text-[150px] md:text-[240px] text-slate-800 group-hover:text-primary/80 transition-colors duration-500 relative z-20 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" aria-hidden="true">
                                    {product.category === 'SERVICE' ? 'home_repair_service' : 'ac_unit'}
                                </span>
                            )}

                            {/* Floating Stats */}
                            <div className="absolute bottom-6 left-6 right-6 z-30 flex gap-3">
                                <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-xl flex items-center gap-4 flex-1 shadow-2xl">
                                    <div className="bg-green-500/20 p-2 rounded-lg text-green-500 border border-green-500/20">
                                        <span className="material-symbols-outlined block">energy_savings_leaf</span>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Energy Rating</div>
                                        <div className="font-header font-bold text-white text-lg leading-none">SEER 22+</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {productImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`aspect-square rounded-lg border overflow-hidden relative transition-all ${selectedImage === img ? 'border-primary shadow-[0_0_10px_rgba(0,174,239,0.5)]' : 'border-white/10 hover:border-white/30 bg-white/[0.02]'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 640px) 25vw, 10vw"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col h-full pt-4">
                        <div className="mb-auto">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,174,239,0.1)]">
                                    {product.category.replace('_', ' ')}
                                </span>
                                {product.stock > 0 ? (
                                    <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.5s_infinite]"></div>
                                        In Stock (Waipahu)
                                    </span>
                                ) : (
                                    <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest">
                                        Sold Out
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-header font-bold uppercase leading-none tracking-wide mb-6 text-white drop-shadow-lg">{product.name}</h1>

                            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-10 pb-10 border-b border-white/5">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl md:text-6xl font-header font-bold text-primary tracking-tight decoration-slice drop-shadow-[0_0_15px_rgba(0,174,239,0.3)]">${product.price.toLocaleString()}</span>
                                    <span className="text-lg text-slate-500 font-bold line-through decoration-slate-600 opacity-60">${(product.price * 1.2).toFixed(0).toLocaleString()}</span>
                                </div>
                                <div className="md:mb-4 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wide w-fit">
                                    <span className="material-symbols-outlined text-sm">savings</span>
                                    Save ${(product.price * 0.2).toFixed(0)}
                                </div>
                            </div>

                            <div className="prose prose-invert prose-p:text-slate-300 prose-p:text-base prose-p:leading-relaxed mb-10 max-w-none">
                                <p>
                                    Experience superior climate control with this industrial-grade <strong className="text-white">{product.name}</strong>.
                                    Engineered for maintaining precise temperatures in high-humidity environments.
                                    The ultimate solution for residential or commercial cooling in Hawaii.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-white text-lg font-header font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">settings_applications</span> Technical Specifications
                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Cooling Output</div>
                                        <div className="text-white font-header font-bold text-xl">{specs?.btu}</div>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Coverage</div>
                                        <div className="text-white font-header font-bold text-xl text-primary">{specs?.coolingArea}</div>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Efficiency</div>
                                        <div className="text-white font-header font-bold text-xl">{specs?.eer}</div>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Voltage</div>
                                        <div className="text-white font-header font-bold text-xl">{specs?.voltage}</div>
                                    </div>
                                </div>

                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 mb-6">
                                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Dimensions (H x W x D)</span>
                                            <span className="text-slate-300 font-medium mt-1">{specs?.dimensions}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Net Weight</span>
                                            <span className="text-slate-300 font-medium mt-1">{specs?.weight}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Power</span>
                                            <span className="text-slate-300 font-medium mt-1">{specs?.watts} / {specs?.amps}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Warranty</span>
                                            <span className="text-slate-300 font-medium mt-1">{specs?.warranty}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {specs?.features.map((feature, i) => (
                                         <span key={i} className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                            {feature}
                                         </span>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Documents Card */}
                           {specSheetUrl && (
                                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-xl hover:border-white/10 transition-colors mb-10">
                                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-primary">description</span> Technical Documents
                                    </div>
                                    <button
                                        onClick={() => setIsSpecModalOpen(true)}
                                        className="w-full flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 p-4 rounded-lg group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                             <div className="p-2 bg-red-500/20 rounded text-red-400">
                                                <span className="material-symbols-outlined block">picture_as_pdf</span>
                                             </div>
                                             <div className="text-left">
                                                <div className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-primary transition-colors">Factory Spec Sheet</div>
                                                <div className="text-slate-500 text-[10px]">PDF Document • Official Specifications</div>
                                             </div>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">visibility</span>
                                    </button>
                                </div>
                           )}
                        </div>

                        {/* Action Bar */}
                        <div className="sticky bottom-4 lg:relative lg:bottom-auto bg-surface-dark/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl lg:rounded-none border lg:border-none border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:shadow-none mt-4 z-40">
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-header font-bold uppercase tracking-widest text-lg h-16 rounded-lg transition-all shadow-[0_0_30px_rgba(0,174,239,0.3)] hover:shadow-[0_0_50px_rgba(0,174,239,0.5)] hover:scale-[1.01] flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    Add to Order
                                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">add_shopping_cart</span>
                                </button>
                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                                    <span className="material-symbols-outlined text-sm text-green-500">lock</span>
                                    Secure Checkout • Instant Confirmation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spec Sheet Preview Modal */}
            {isSpecModalOpen && specSheetUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface-dark border border-white/10 w-full h-full md:w-[90vw] md:h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <h3 className="font-header font-bold uppercase text-white tracking-wide">Factory Specification Sheet</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={specSheetUrl}
                                    download
                                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all"
                                >
                                    <span className="material-symbols-outlined text-sm">download</span> Download
                                </a>
                                <button
                                    onClick={() => setIsSpecModalOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - Iframe for PDF */}
                        <div className="flex-1 bg-white/5 relative">
                             <iframe
                                src={`${specSheetUrl}#toolbar=0`}
                                className="w-full h-full"
                                title="Spec Sheet Preview"
                             />

                             {/* Mobile Fallback / Actions (Always visible on mobile since iframe might be tricky) */}
                             <div className="md:hidden absolute bottom-6 left-6 right-6 flex gap-3">
                                 <a
                                    href={specSheetUrl}
                                    download
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-xl shadow-xl"
                                 >
                                    <span className="material-symbols-outlined">download</span> Download PDF
                                 </a>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
