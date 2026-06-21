'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { getProductImages } from '@/lib/product-images';
import { getProductSpecs } from '@/lib/product-specs';
import { Product } from '@/types/inventory';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn, isCampaignActive as isCampaignActiveChecker } from '@/lib/utils';
import { Fan, AlertCircle, Snowflake, ShoppingCart, FileText, ShieldAlert, X, Phone } from 'lucide-react';
import { StockBadge } from '@/components/StockBadge';
import dynamic from 'next/dynamic';

// Lazy load interactive widgets to minimize main-thread JS payload
const ACCalculator = dynamic(() => import('@/components/ACCalculator').then(mod => mod.ACCalculator), {
    ssr: false,
    loading: () => <div className="h-44 bg-surface-dark/50 rounded-2xl animate-pulse border border-border-dark" />
});

const YelpReviews = dynamic(() => import('@/components/YelpReviews').then(mod => mod.YelpReviews), {
    ssr: false,
    loading: () => <div className="h-44 bg-surface-dark/50 rounded-2xl animate-pulse border border-border-dark" />
});

const FAQAccordion = dynamic(() => import('@/components/FAQAccordion').then(mod => mod.FAQAccordion), {
    ssr: false,
    loading: () => <div className="h-44 bg-surface-dark/50 rounded-2xl animate-pulse border border-border-dark" />
});

const RelatedProducts = dynamic(() => import('@/components/RelatedProducts').then(mod => mod.RelatedProducts), {
    ssr: false,
    loading: () => <div className="h-44 bg-surface-dark/50 rounded-2xl animate-pulse border border-border-dark" />
});

// Progressive Skeleton UI Loader to guarantee 0 CLS during data hydration
function ProductPageSkeleton() {
    return (
        <div className="bg-background-dark min-h-screen pt-[140px] md:pt-[165px] pb-12 px-4 md:px-8 max-w-6xl mx-auto animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Image Placeholder */}
                <div className="space-y-6">
                    <div className="aspect-square bg-slate-900 rounded-[2rem] w-full" />
                    <div className="flex gap-3 justify-center md:justify-start">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="w-16 h-16 bg-slate-900 rounded-lg shrink-0" />
                        ))}
                    </div>
                </div>
                {/* Details Placeholder */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="h-6 w-32 bg-slate-900 rounded" />
                        <div className="h-10 w-3/4 bg-slate-900 rounded" />
                        <div className="h-8 w-1/3 bg-slate-900 rounded" />
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-16 bg-slate-900 rounded-xl" />
                        ))}
                    </div>
                    <div className="h-28 bg-slate-900 rounded-2xl" />
                    <div className="space-y-3">
                        <div className="h-16 bg-slate-900 rounded-xl w-full" />
                        <div className="h-12 bg-slate-900 rounded-xl w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// High-Performance 3D Card Tilt utilizing Motion Values to bypass the React reconciliation loop
function TiltCard({ children, isPromo, isTouchDevice }: { children: React.ReactNode; isPromo: boolean; isTouchDevice: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [sparks, setSparks] = useState<{ id: number; left: string; delay: string; duration: string; drift: string; color: string }[]>([]);
    
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // Dynamic transform hooks with specific damping / stiffness for extreme fluidity
    const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { damping: 25, stiffness: 120 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { damping: 25, stiffness: 120 });
    const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), { damping: 25, stiffness: 120 });
    const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), { damping: 25, stiffness: 120 });
    const glareOpacity = useSpring(useTransform(x, [0, 1], [0, 0.15]), { damping: 25, stiffness: 120 });

    useEffect(() => {
        if (isPromo) {
            const colors = ['#EF4444', '#FFFFFF', '#3B82F6'];
            const list = Array.from({ length: 8 }).map((_, i) => ({
                id: i,
                left: `${15 + Math.random() * 70}%`,
                delay: `${Math.random() * -3}s`,
                duration: `${1.5 + Math.random() * 2}s`,
                drift: `${(Math.random() - 0.5) * 60}px`,
                color: colors[i % colors.length]
            }));
            setSparks(list);
        }
    }, [isPromo]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseEnter = () => {
        if (isTouchDevice) return;
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
            className={cn(
                "aspect-square bg-surface-dark rounded-[2rem] relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center p-6 lg:p-8 card-hover-trigger transition-all duration-700 border border-border-dark",
                isPromo ? "animate-patriotic-glow" : "ring-1 ring-white/5"
            )}
        >
            {/* Liquid Neon Cursor-Follow Glow */}
            {isPromo && isHovered && !isTouchDevice && (
                <div 
                    className="absolute inset-[-1px] rounded-[2rem] pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(circle 150px at ${x.get() * 400}px ${y.get() * 400}px, rgba(239, 68, 68, 0.8), rgba(255, 255, 255, 0.5), rgba(59, 130, 246, 0.8), transparent 70%)`,
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                    }}
                />
            )}

            {/* 3D Reflective Glare Overlay */}
            <motion.div
                style={{
                    background: useTransform(
                        [glareX, glareY],
                        ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`
                    ),
                    opacity: glareOpacity,
                }}
                className="absolute inset-0 pointer-events-none z-20"
            />

            {/* Micro-Spark Cascade (Hover Particle Effect) */}
            {isPromo && isHovered && !isTouchDevice && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {sparks.map(spark => (
                        <div
                            key={spark.id}
                            className="absolute w-1 h-1 rounded-full animate-spark"
                            style={{
                                left: spark.left,
                                top: '-5px',
                                backgroundColor: spark.color,
                                boxShadow: `0 0 6px ${spark.color}`,
                                animationDelay: spark.delay,
                                animationDuration: spark.duration,
                                '--drift-x': spark.drift,
                                opacity: 0.8
                            } as any}
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"></div>

            {/* Radial Highlights */}
            <div className="absolute -left-20 -top-20 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Patriotic radial glow behind promo product images */}
            {isPromo && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,rgba(59,130,246,0.08)_60%,transparent_100%)] opacity-80 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0"></div>
            )}

            {children}

            {/* Celebrating America Badge Overlay on Main Image */}
            {isPromo && (
                <div className="absolute bottom-0 left-0 z-20 bg-gradient-to-r from-red-600 via-slate-900 to-blue-600 text-white font-header font-black text-[9px] sm:text-[10px] md:text-[11px] px-3 py-2 sm:px-4 sm:py-2.5 rounded-tr-2xl uppercase tracking-[0.2em] shadow-lg border-t border-r border-white/10 animate-pulse-slow">
                    🇺🇸 CELEBRATING AMERICA 10% OFF
                </div>
            )}
        </motion.div>
    );
}

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    
    // Extract ID (everything before the first hyphen)
    const id = slug ? slug.split('-')[0] : null;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { content } = useContent();

    const { addToCart, openCart } = useCart();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
    
    const [mounted, setMounted] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsTouchDevice(
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            window.matchMedia('(pointer: coarse)').matches
        );
    }, []);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;
            try {
                const apiUrl = '/api/v1';
                const timestamp = new Date().getTime();
                const res = await fetch(`${apiUrl}/products/${id}?_t=${timestamp}`, {
                    cache: 'no-store',
                    headers: {
                        'Pragma': 'no-cache',
                        'Cache-Control': 'no-cache'
                    }
                });

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

    // Format product images fallback replacing SVG with WebP to keep payloads ultra light
    const productImages = useMemo(() => {
        if (!product) return [];
        const gallery = getProductImages(product.id);
        if (gallery.length > 0) {
            return gallery.map(img => img.endsWith('.svg') ? img.replace('.svg', '.webp') : img);
        }
        if (product.image_url) {
            return [product.image_url.endsWith('.svg') ? product.image_url.replace('.svg', '.webp') : product.image_url];
        }
        return [];
    }, [product]);

    const baseSpecs = product ? getProductSpecs(product.id) : null;
    const specs = useMemo(() => {
        if (!baseSpecs || !product) return null;
        return {
            ...baseSpecs,
            btu: product.btu ? `${product.btu.toLocaleString()} BTU` : baseSpecs.btu,
            coolingArea: product.coverage || baseSpecs.coolingArea,
            eer: product.performance_specs || baseSpecs.eer,
            voltage: product.voltage || baseSpecs.voltage,
            soundProfile: product.noise_level || baseSpecs.soundProfile,
            keyFeature: product.key_spec || baseSpecs.keyFeature
        };
    }, [baseSpecs, product]);

    // Set initial image
    useEffect(() => {
        if (productImages.length > 0 && !selectedImage) {
            setSelectedImage(productImages[0]);
        }
    }, [productImages, selectedImage]);

    // Spec Sheet Mapping
    const specSheetMap: { [key: number]: string } = {
        1: '/assets/specsheets/lg-dual-inverter+wifi/LW6023IVSM_spec_sheet-1.pdf',
        2: '/assets/specsheets/lg-dual-inverter+wifi/LW8022IVSM-Spec-Sheet.pdf',
        3: '/assets/specsheets/lg-dual-inverter+wifi/LW1022IVSM-Spec-Sheet.pdf',
        4: '/assets/specsheets/lg-dual-inverter+wifi/LW1222IVSM-Spec-Sheet.pdf',
        5: '/assets/specsheets/lg-dual-inverter+wifi/LW1522IVSM-Spec-Sheet-1.pdf',
        6: '/assets/specsheets/lg-dual-inverter+wifi/LW1822IVSM-Spec-Sheet-1.pdf',
        7: '/assets/specsheets/lg-dual-inverter+wifi/LW2422IVSM-Spec-Sheet-1.pdf',
        8: '/assets/specsheets/lg-universal-fit+wifi/LW8023HRSM_spec_sheet.pdf',
        9: '/assets/specsheets/lg-universal-fit+wifi/LW1823HRSM_spec_sheet.pdf',
        10: '/assets/specsheets/lg-universal-fit+wifi/LW2423HRSM_spec_sheet.pdf',
        13: '/assets/specsheets/ge/GE-AJCQ08AWJ-spec-sheet.pdf',
        14: '/assets/specsheets/ge/GE-AJCQ10AWJ-spec-sheet.pdf',
        15: '/assets/specsheets/ge/GE-AJCQ12AWJ-spec-sheet.pdf',
    };

    const specSheetUrl = product ? specSheetMap[product.id] : null;

    if (loading) return <ProductPageSkeleton />;

    if (error || !product) return (
        <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-4 flex items-center justify-center">
            <div className="text-center space-y-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <AlertCircle className="size-12 text-red-500" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="text-3xl font-header font-bold uppercase mb-2">Product Not Found</h1>
                    <p className="text-slate-400 max-w-md font-sans">The product you are looking for is currently unavailable or has been moved.</p>
                </div>
                <Link href="/shop" className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded text-white font-bold uppercase tracking-widest text-xs transition-all font-header">Return to Inventory</Link>
            </div>
        </div>
    );

    const isCampaignActive = mounted && isCampaignActiveChecker();
    const isPromo = isCampaignActive && !!product && !!product.promo_price && product.promo_price > 0;

    return (
        <div className="bg-background-dark min-h-screen selection:bg-primary/30 text-slate-100">
            <main className="pt-[140px] md:pt-[165px] pb-12 px-4 md:px-8 max-w-6xl mx-auto text-center md:text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Visual Anchor */}
                    <div className="space-y-6 md:sticky md:top-36">
                        <TiltCard isPromo={isPromo} isTouchDevice={isTouchDevice}>
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
                                <Snowflake className="size-36 text-white/5 z-10" />
                            )}
                        </TiltCard>

                        {/* Encapsulated micro-spark animation styles */}
                        <style jsx global>{`
                            @keyframes spark-fall {
                                0% {
                                    transform: translateY(-20px) translateX(0) scale(1);
                                    opacity: 1;
                                }
                                50% {
                                    transform: translateY(150px) translateX(var(--drift-x)) scale(0.8);
                                    opacity: 0.8;
                                }
                                100% {
                                    transform: translateY(300px) translateX(calc(var(--drift-x) * 2)) scale(0.4);
                                    opacity: 0;
                                }
                            }
                            .animate-spark {
                                animation: spark-fall var(--fall-duration, 2.5s) linear infinite;
                            }
                        `}</style>

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

                    {/* Technical Command Center */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                                <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary text-[8px] font-header font-black uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(0,174,239,0.1)]">
                                    {product.category.replace('_', ' ')}
                                </span>
                                {isPromo && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-red-600 via-slate-900 to-blue-600 border border-white/10 rounded-md text-white text-[10px] md:text-[11px] font-header font-black uppercase tracking-[0.2em] shadow-lg animate-pulse-slow">
                                        🇺🇸 CELEBRATING AMERICA 10% OFF
                                    </span>
                                )}
                            </div>

                            {/* Stock Badge - Dynamic status */}
                            <StockBadge stock={product.stock} />

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-header font-black uppercase leading-[0.95] tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3 pt-1 justify-center md:justify-start">
                                {isPromo ? (
                                    <div className="flex flex-col items-center md:items-start gap-1.5 font-header">
                                        <div className="flex items-baseline gap-2.5 justify-center md:justify-start">
                                            <span className="text-sm md:text-base text-slate-500 line-through decoration-red-500 decoration-[1.5px] font-medium">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <span className="text-3xl md:text-4xl font-black text-cyan-400 tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.35)] animate-pulse-slow">
                                                ${product.promo_price.toLocaleString()}
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shadow-inner animate-pulse-slow">
                                            SAVE ${(product.price - product.promo_price).toLocaleString()}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-2xl md:text-3xl font-header font-black text-primary tracking-tight">
                                        ${product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/10 to-transparent w-full"></div>

                        {/* Bento Specifications Grid - Standardized to design tokens */}
                        <div className="grid grid-cols-2 gap-2 font-sans">
                            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Performance</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.btu}</div>
                            </div>
                            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Coverage</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.coolingArea}</div>
                            </div>
                            <div className="col-span-2 bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Voltage</div>
                                <div className="text-white font-header font-black text-base md:text-lg">{specs?.voltage}</div>
                            </div>
                        </div>

                        {/* Secondary Specifications Hub */}
                        <div className="bg-surface-dark border border-border-dark rounded-2xl p-4 md:p-5 shadow-xl relative overflow-hidden group/details font-sans">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 items-start relative z-10 text-xs md:text-left">
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Dimensions</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{product.dimensions || specs?.dimensions || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Weight</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{product.weight ? `${product.weight} LBS` : specs?.weight || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Manufacturer Warranty</span>
                                    <span className="text-rose-400 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{product.warranty || specs?.warranty || '1 YEAR LIMITED'}</span>
                                </div>
                                {product.dehumidification && (
                                    <div className="flex flex-col gap-1 items-center md:items-start">
                                        <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Dehumidification</span>
                                        <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{product.dehumidification}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA Cluster */}
                        <div className="space-y-3 pt-2 relative font-header">
                            {product.stock > 0 ? (
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        openCart();
                                    }}
                                    className="w-full h-16 bg-gradient-to-r from-primary to-cyan-500 text-white font-black uppercase tracking-[0.4em] text-sm rounded-xl shadow-[0_20px_50px_rgba(0,174,239,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                >
                                    <ShoppingCart className="size-5 group-hover:rotate-12 transition-transform" />
                                    Add to Cart
                                </button>
                            ) : (
                                <a
                                    href="tel:8084254554"
                                    className="w-full h-16 bg-gradient-to-r from-red-600 to-amber-600 text-white font-black uppercase tracking-[0.3em] text-xs rounded-xl shadow-[0_20px_50px_rgba(220,38,38,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Phone className="size-5 group-hover:animate-bounce" />
                                    Call Waipahu Warehouse to Pre-order
                                </a>
                            )}
                            
                            {specSheetUrl && (
                                <button
                                    onClick={() => setIsSpecModalOpen(true)}
                                    className="w-full h-12 bg-white/[0.03] hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-xl transition-all flex items-center justify-center gap-3"
                                >
                                    <FileText className="size-4.5" />
                                    Factory Specs (PDF)
                                </button>
                            )}

                            {/* Reframed Warranty / Policies Warning Card */}
                            <div className="mt-6 bg-[#0f0505] border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] font-sans">
                                <div className="flex items-center gap-2 mb-2 text-red-500">
                                    <ShieldAlert className="size-4" />
                                    <h5 className="font-header font-black uppercase tracking-[0.2em] text-[10px]">Manufacturer Warranty Coverage</h5>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-red-400/80 text-[9px] font-bold leading-relaxed uppercase tracking-widest">
                                        All systems are brand new and factory-sealed.
                                    </p>
                                    <p className="text-slate-400 text-[9px] leading-relaxed font-medium max-w-[280px] mx-auto">
                                        Under federal regulations, all sales are final. Technical warranty claims are fully backed and processed directly through the manufacturer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Splitter */}
            <div className="h-px bg-gradient-to-r from-border-dark via-transparent to-transparent w-full my-12 max-w-6xl mx-auto"></div>

            {/* Technical & Verification Grid */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column (66% Width / Span 2) */}
                    <div className="lg:col-span-2 space-y-12">
                        <ACCalculator productBtu={product.btu || 8000} productName={product.name} />
                        <YelpReviews productId={product.id} />
                    </div>
                    {/* Right Column (33% Width / Span 1) */}
                    <div className="lg:col-span-1">
                        <FAQAccordion productName={product.name} />
                    </div>
                </div>
            </section>

            {/* Related Products Snap Slider */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto mb-16">
                <RelatedProducts currentProduct={product} />
            </section>

            {/* Spec Sheet Preview Modal */}
            {isSpecModalOpen && specSheetUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm">
                    <div className="bg-surface-dark border border-border-dark w-full h-full md:w-[90vw] md:h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-white/20">
                        <div className="flex items-center justify-between p-6 border-b border-border-dark">
                            <h3 className="font-header font-black uppercase text-white tracking-widest text-sm">Specification Analysis</h3>
                            <button onClick={() => setIsSpecModalOpen(false)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                                <X className="size-8" />
                            </button>
                        </div>
                        <div className="grow bg-white/5 relative">
                            <iframe src={specSheetUrl} className="w-full h-full" title="Product Specifications PDF" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
