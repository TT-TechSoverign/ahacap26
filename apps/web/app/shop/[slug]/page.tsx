'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { getProductImages } from '@/lib/product-images';
import { getProductSpecs } from '@/lib/product-specs';
import { Product } from '@/types/inventory';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn, generateProductSlug, isCampaignActive as isCampaignActiveChecker } from '@/lib/utils';
import { 
    Fan, 
    AlertCircle, 
    Snowflake, 
    ShoppingCart, 
    FileText, 
    ShieldAlert, 
    X, 
    Phone, 
    Check, 
    Calendar, 
    Mail,
    Ruler,
    ShieldCheck,
    ChevronDown,
    ChevronUp,
    Layers,
    Info,
    Maximize2,
    Zap,
    SlidersHorizontal,
    Sparkles,
    ExternalLink,
    ZoomIn,
    ZoomOut
} from 'lucide-react';
import { StockBadge } from '@/components/StockBadge';
import { SpatialCaliperHUD } from '@/components/SpatialCaliperHUD';
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
        <div className="bg-background-dark min-h-screen pt-[85px] md:pt-[165px] pb-36 md:pb-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Image Placeholder */}
                <div className="space-y-6 animate-pulse">
                    <div className="aspect-square bg-slate-900 rounded-[2rem] w-full" />
                    <div className="flex gap-3 justify-center md:justify-start">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="w-16 h-16 bg-slate-900 rounded-lg shrink-0" />
                        ))}
                    </div>
                </div>
                {/* Details Placeholder */}
                <div className="space-y-6">
                    <div className="space-y-3 animate-pulse">
                        <div className="h-6 w-32 bg-slate-900 rounded" />
                        <div className="h-10 w-3/4 bg-slate-900 rounded" />
                        <div className="h-8 w-1/3 bg-slate-900 rounded" />
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="grid grid-cols-2 gap-2 animate-pulse">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-16 bg-slate-900 rounded-xl" />
                        ))}
                    </div>
                    <div className="h-28 bg-slate-900 rounded-2xl animate-pulse" />
                    <div className="space-y-3 animate-pulse">
                        <div className="h-16 bg-slate-900 rounded-xl w-full" />
                        <div className="h-12 bg-slate-900 rounded-xl w-full" />
                    </div>

                    {/* Island Trust & Fulfillment Microcopy Chips - SSR Instant */}
                    <div className="pt-2 pb-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left font-sans text-xs">
                        <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                            <Check className="size-4 text-emerald-400 shrink-0" />
                            <span className="font-medium text-[11px] leading-tight">Waipahu Warehouse Pickup by Appt</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                            <Check className="size-4 text-emerald-400 shrink-0" />
                            <span className="font-medium text-[11px] leading-tight">$50 Flat Island-Wide Delivery</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                            <Check className="size-4 text-emerald-400 shrink-0" />
                            <span className="font-medium text-[11px] leading-tight">$45 Hawaii Energy Rebate Form</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                            <Check className="size-4 text-emerald-400 shrink-0" />
                            <span className="font-medium text-[11px] leading-tight">Zero Upfront Estimate Fee</span>
                        </div>
                    </div>
                    <div className="text-center pt-2">
                        <a href="tel:808-488-1111" className="text-xs text-slate-400 hover:text-primary font-medium tracking-wide">
                            Questions? Call Waipahu Warehouse: <span className="text-white font-bold">(808) 488-1111</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// High-Performance 3D Card Tilt utilizing Motion Values to bypass the React reconciliation loop
function TiltCard({ children, isPromo, isTouchDevice }: { children: React.ReactNode; isPromo: boolean; isTouchDevice: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // Dynamic transform hooks with specific damping / stiffness for extreme fluidity
    const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { damping: 25, stiffness: 120 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { damping: 25, stiffness: 120 });
    const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), { damping: 25, stiffness: 120 });
    const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), { damping: 25, stiffness: 120 });
    const glareOpacity = useSpring(useTransform(x, [0, 1], [0, 0.15]), { damping: 25, stiffness: 120 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
            className="aspect-square bg-surface-dark rounded-[2rem] relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center p-6 lg:p-8 card-hover-trigger transition-all duration-700 border border-border-dark ring-1 ring-white/5"
        >
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

            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"></div>

            {/* Radial Highlights */}
            <div className="absolute -left-20 -top-20 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {children}
        </motion.div>
    );
}

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    
    // Extract ID (everything before the first hyphen)
    const id = slug ? slug.split('-')[0] : null;
    const initialSeedProduct = id ? (INITIAL_CATALOG_PRODUCTS.find(p => p.id === Number(id)) || null) : null;

    const [product, setProduct] = useState<Product | null>(initialSeedProduct);
    const [loading, setLoading] = useState(!initialSeedProduct);
    const [error, setError] = useState('');
    const { content } = useContent();

    const { addToCart, openCart } = useCart();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
    const [isPurchaseBarSticky, setIsPurchaseBarSticky] = useState(false);
    
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
        if (typeof window === 'undefined' || loading) return;
        const targetEl = document.getElementById('product-purchase-section');
        if (!targetEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPurchaseBarSticky(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(targetEl);
        return () => observer.disconnect();
    }, [loading, product?.id]);

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

                // GTM E-Commerce view_item push
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    const activePrice = (isCampaignActiveChecker() && data.promo_price && data.promo_price > 0) ? data.promo_price : data.price;
                    (window as any).dataLayer.push({
                        event: 'view_item',
                        ecommerce: {
                            currency: 'USD',
                            value: activePrice,
                            items: [
                                {
                                    item_id: String(data.id),
                                    item_name: data.name,
                                    price: activePrice,
                                    item_brand: data.category?.replace('_', ' ') || 'Window AC',
                                }
                            ]
                        }
                    });
                }
            } catch (err) {
                console.error("Product Fetch Error:", err);
                if (!initialSeedProduct) {
                    setError('Unable to load product details.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id, initialSeedProduct]);

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
        const rawShipWeight = baseSpecs.shippingWeight || product.shipping_weight || '96 lbs';
        const formattedShipWeight = rawShipWeight.toLowerCase().includes('lb') ? rawShipWeight : `${rawShipWeight} lbs`;
        return {
            ...baseSpecs,
            btu: product.btu ? `${product.btu.toLocaleString()} BTU` : baseSpecs.btu,
            coolingArea: product.coverage || baseSpecs.coolingArea,
            coolingAreaAham: product.coverage_aham || baseSpecs.coolingAreaAham || 'Up to 550 sq. ft.',
            coolingAreaOahu: product.coverage_oahu || baseSpecs.coolingAreaOahu || '250–380 sq. ft.',
            sizingNotes: baseSpecs.sizingNotes || product.sizing_notes,
            minWindowHeight: product.min_window_height || baseSpecs.windowFit?.minHeight || '16.0"',
            minWindowWidth: product.min_window_width || baseSpecs.windowFit?.minWidth || '27"',
            maxWindowWidth: product.max_window_width || baseSpecs.windowFit?.maxWidth || '39"',
            chassisType: baseSpecs.chassisType || product.chassis_type || 'Slide In-Out',
            shippingWeight: formattedShipWeight,
            ceerRating: product.ceer_rating || baseSpecs.ceerRating || '15.0',
            dryAirFlowCfm: product.dry_air_flow_cfm || baseSpecs.dryAirFlowCfm,
            plugType: baseSpecs.plugType || (product.voltage?.includes('230V') ? 'NEMA 6-20P (208/230V)' : 'NEMA 5-15P (Standard 115V)'),
            eer: baseSpecs.eer || product.performance_specs,
            voltage: baseSpecs.voltage || product.voltage,
            soundProfile: baseSpecs.soundProfile || product.noise_level,
            keyFeature: baseSpecs.keyFeature || product.key_spec,
            warranty: baseSpecs.warranty || product.warranty || '1 YEAR LIMITED'
        };
    }, [baseSpecs, product]);

    const [mediaView, setMediaView] = useState<'photos' | 'cutaway' | 'specs'>('photos');
    const [isSizingExplainerOpen, setIsSizingExplainerOpen] = useState(false);
    const [isCaliperLightboxOpen, setIsCaliperLightboxOpen] = useState(false);
    const [isMobilePdfZoomed, setIsMobilePdfZoomed] = useState(false);
    const mobilePdfScrollRef = useRef<HTMLDivElement>(null);

    // High-Resolution 3D Spatial Window Fit Cutaway Mapping (Bespoke Model-Matched Assets)
    const cutawayImageMap: { [key: number]: string } = {
        1: '/assets/window-unit-images/3d-fit/product_1_fit_cutaway.webp',
        2: '/assets/window-unit-images/3d-fit/product_2_fit_cutaway.webp',
        3: '/assets/window-unit-images/3d-fit/product_3_fit_cutaway.webp',
        4: '/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
        5: '/assets/window-unit-images/3d-fit/product_5_fit_cutaway.webp',
        6: '/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp',
        7: '/assets/window-unit-images/3d-fit/product_7_fit_cutaway.webp',
        8: '/assets/window-unit-images/3d-fit/product_8_fit_cutaway.webp',
        9: '/assets/window-unit-images/3d-fit/product_9_fit_cutaway.webp',
        10: '/assets/window-unit-images/3d-fit/product_10_fit_cutaway.webp',
        11: '/assets/window-unit-images/3d-fit/product_11_fit_cutaway.webp',
        12: '/assets/window-unit-images/3d-fit/product_12_fit_cutaway.webp',
        13: '/assets/window-unit-images/3d-fit/product_13_fit_cutaway.webp',
        14: '/assets/window-unit-images/3d-fit/product_14_fit_cutaway.webp',
        15: '/assets/window-unit-images/3d-fit/product_15_fit_cutaway.webp',
        16: '/assets/window-unit-images/3d-fit/product_16_fit_cutaway.webp'
    };
    const cutawayImageUrl = product ? (cutawayImageMap[product.id] || `/assets/window-unit-images/3d-fit/product_${product.id}_fit_cutaway.webp`) : null;

    // Set initial image
    useEffect(() => {
        if (productImages.length > 0 && !selectedImage) {
            setSelectedImage(productImages[0]);
        }
    }, [productImages, selectedImage]);

    // Spec Sheet Mapping (All 16 Catalog Products)
    const specSheetMap: { [key: number]: string } = {
        1: '/assets/specsheets/lg-dual-inverter+wifi/LW6023IVSM_spec_sheet-1.pdf',
        2: '/assets/specsheets/lg-dual-inverter+wifi/LW8022IVSM-Spec-Sheet.pdf',
        3: '/assets/specsheets/lg-dual-inverter+wifi/LW1022IVSM-Spec-Sheet.pdf',
        4: '/assets/specsheets/lg-dual-inverter+wifi/LW1222IVSM-Spec-Sheet.pdf',
        5: '/assets/specsheets/lg-dual-inverter+wifi/LW1522FVSM-Spec-Sheet.pdf',
        6: '/assets/specsheets/lg-dual-inverter+wifi/LW1822IVSM-Spec-Sheet-1.pdf',
        7: '/assets/specsheets/lg-dual-inverter+wifi/LW2422IVSM-Spec-Sheet-1.pdf',
        8: '/assets/specsheets/lg-universal-fit+wifi/LW8023HRSM_spec_sheet.pdf',
        9: '/assets/specsheets/lg-universal-fit+wifi/LW1823HRSM_spec_sheet.pdf',
        10: '/assets/specsheets/lg-universal-fit+wifi/LW2423HRSM_spec_sheet.pdf',
        11: '/assets/specsheets/lg-base/LW8024RD-Spec-Sheet.pdf',
        12: '/assets/specsheets/lg-base/LW1217ERSM1-Spec-Sheet.pdf',
        13: '/assets/specsheets/ge/GE-AJCQ08AWJ-spec-sheet.pdf',
        14: '/assets/specsheets/ge/GE-AJCQ10AWJ-spec-sheet.pdf',
        15: '/assets/specsheets/ge/GE-AJCQ12AXXWA-spec-sheet.pdf',
        16: '/assets/specsheets/ge/GE-RAB26A-spec-sheet.pdf',
    };

    const specSheetPageCountMap: { [key: number]: number } = {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 3,
        14: 3,
        15: 20,
        16: 2,
    };

    const specSheetUrl = product ? specSheetMap[product.id] : null;
    const specSheetPageCount = product ? (specSheetPageCountMap[product.id] || 1) : 1;

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
    const isWallSleeve = product.subcategory === 'ge' || product.subcategory === 'casement';

    return (
        <div className="bg-background-dark min-h-screen selection:bg-primary/30 text-slate-100">
            <main className="pt-[85px] md:pt-[165px] pb-36 md:pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center md:text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Visual Anchor & 3D Spatial Center */}
                    <div className="space-y-4 md:sticky md:top-36">
                        {/* Media View Tab Switcher */}
                        <div className="flex items-center gap-1.5 p-1 bg-surface-dark/90 border border-border-dark rounded-xl text-xs font-header font-bold uppercase tracking-wider shadow-md">
                            <button
                                onClick={() => setMediaView('photos')}
                                className={cn(
                                    "flex-1 min-h-[40px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all text-[11px]",
                                    mediaView === 'photos'
                                        ? "bg-primary text-slate-950 font-black shadow-md shadow-primary/20"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                <span>📷 Studio Photos</span>
                            </button>
                            <button
                                onClick={() => setMediaView('cutaway')}
                                className={cn(
                                    "flex-1 min-h-[40px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all text-[11px]",
                                    mediaView === 'cutaway'
                                        ? "bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                <Ruler className="size-3.5" />
                                <span>{isWallSleeve ? '📐 3D Wall Sleeve Fit' : '📐 3D Window Fit'}</span>
                            </button>
                            {specSheetUrl && (
                                <button
                                    onClick={() => setIsSpecModalOpen(true)}
                                    className="flex-1 min-h-[40px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition-all text-[11px]"
                                >
                                    <FileText className="size-3.5" />
                                    <span>Specs PDF</span>
                                </button>
                            )}
                        </div>

                        {/* Interactive Main Visual Display */}
                        <TiltCard isPromo={isPromo} isTouchDevice={isTouchDevice}>
                            {mediaView === 'cutaway' && cutawayImageUrl ? (
                                <div 
                                    onClick={() => setIsCaliperLightboxOpen(true)}
                                    className="relative w-full h-full z-10 flex flex-col items-center justify-center cursor-zoom-in group/cutaway"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={cutawayImageUrl}
                                            alt={`${product.name} 3D Spatial Fit`}
                                            fill
                                            className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover/cutaway:scale-105"
                                            priority
                                            unoptimized
                                        />
                                    </div>
                                    <div className="absolute top-2 left-2 z-20 px-2.5 py-1 rounded-md bg-cyan-500/90 text-slate-950 text-[9px] font-header font-black uppercase tracking-wider shadow-md">
                                        {isWallSleeve ? '3D Wall Sleeve Spatial Fit' : '3D Architectural Spatial Fit'}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             setIsCaliperLightboxOpen(true);
                                        }}
                                        className="absolute top-2 right-2 z-30 px-2 py-1 rounded-md bg-black/80 hover:bg-black text-cyan-300 hover:text-white border border-white/20 text-[9px] font-header font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-md active:scale-95"
                                        title="Expand Fullscreen 3D Calipers & Geometry"
                                    >
                                        <Maximize2 className="size-3" />
                                        <span>Expand Calipers</span>
                                    </button>
                                    <div className="absolute bottom-2 right-2 z-20 px-2.5 py-1 rounded-md bg-slate-950/85 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono font-bold shadow-md">
                                        {isWallSleeve
                                            ? `Fits 26" Wall Sleeve (${specs?.minWindowHeight || '15.8"'} H × 26" W)`
                                            : `Min Opening: ${specs?.minWindowHeight || '16.0"'} H`}
                                    </div>
                                </div>
                            ) : selectedImage ? (
                                <div className="relative w-full h-full z-10">
                                    <Image
                                        src={selectedImage}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all duration-1000 group-hover:scale-105"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <Snowflake className="size-36 text-white/5 z-10" />
                            )}
                        </TiltCard>

                        {/* Mode-Dependent Sub-Bar */}
                        {mediaView === 'cutaway' ? (
                            <div className="space-y-3">
                                {specs && (
                                    <SpatialCaliperHUD
                                        specs={{
                                            modelName: product.name,
                                            btu: specs.btu,
                                            minWindowHeight: specs.minWindowHeight,
                                            minWindowWidth: specs.minWindowWidth,
                                            maxWindowWidth: specs.maxWindowWidth,
                                            chassisType: specs.chassisType,
                                            dimensions: specs.dimensions || product.dimensions || '',
                                            weight: specs.shippingWeight || product.weight || '85',
                                            voltage: specs.voltage || product.voltage || '115V',
                                            plugType: specs.plugType,
                                            coverageAham: specs.coolingAreaAham,
                                            coverageOahu: specs.coolingAreaOahu,
                                            noiseLevel: specs.soundProfile,
                                            isWallSleeve
                                        }}
                                        onExpand={() => setIsCaliperLightboxOpen(true)}
                                    />
                                )}
                            </div>
                        ) : productImages.length > 1 && (
                            <div 
                                className="flex gap-3 overflow-x-auto pb-2 justify-start md:justify-start [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                {productImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={cn(
                                            "relative w-16 h-16 rounded-lg overflow-hidden border transition-all shrink-0",
                                            selectedImage === img ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/20" : "border-white/10 hover:border-white/30 grayscale hover:grayscale-0"
                                        )}
                                    >
                                        <Image src={img} alt="Thumbnail" fill className="object-cover" unoptimized />
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
                                    {product.id === 16 ? '26" STRUCTURAL WALL SLEEVE' : isWallSleeve ? 'BUILT-IN WALL SLEEVE AC' : product.category.replace('_', ' ')}
                                </span>
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

                            {/* HECO Island Electricity Savings / Structural Callout */}
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-sans w-fit mx-auto md:mx-0 shadow-sm">
                                <Zap className="size-3.5 text-amber-400 shrink-0 animate-pulse" />
                                {product.id === 16 ? (
                                    <span>Heavy-gauge galvanized steel <strong className="text-white font-bold">26&quot; wall sleeve</strong> • Includes RAG13A aluminum grille</span>
                                ) : (product.subcategory === 'dual_inverter' || product.id === 15) ? (
                                    <span>Inverter efficiency saves up to <strong className="text-white font-bold">$424/year</strong> under HECO ~44.2¢/kWh rates</span>
                                ) : (
                                    <span>High-efficiency <strong className="text-white font-bold">R32 cooling</strong> calibrated for Oahu residential circuits</span>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/10 to-transparent w-full"></div>

                        {/* Dual-Sizing Bento Specifications Grid */}
                        <div className="grid grid-cols-2 gap-2 font-sans">
                            {/* Performance Card */}
                            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">
                                    {product.id === 16 ? 'Construction' : 'Performance'}
                                </div>
                                <div className="text-white font-header font-black text-base md:text-lg">
                                    {product.id === 16 ? '26" Wall Case' : specs?.btu}
                                </div>
                                {product.id === 16 ? (
                                    <span className="text-[10px] font-mono text-emerald-400 mt-0.5">
                                        Galvanized Steel • RAG13A Grille
                                    </span>
                                ) : specs?.ceerRating && (
                                    <span className="text-[10px] font-mono text-emerald-400 mt-0.5">
                                        {specs.ceerRating} CEER{product.id === 15 ? ' • R32 Inverter' : ''}
                                    </span>
                                )}
                            </div>

                            {/* Dual Coverage Card */}
                            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-emerald-500/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-emerald-400">Dual Sizing</div>
                                <div className="text-emerald-300 font-header font-black text-xs md:text-sm">{specs?.coolingAreaAham} <span className="text-[9px] font-normal text-slate-400 font-mono">(AHAM)</span></div>
                                <div className="text-amber-300 font-header font-black text-xs md:text-sm">{specs?.coolingAreaOahu} <span className="text-[9px] font-normal text-slate-400 font-mono">(Island)</span></div>
                            </div>

                            {/* Voltage & Circuit Card */}
                            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-primary/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-primary">Electrical Circuit</div>
                                <div className="text-white font-header font-black text-xs md:text-sm">
                                    {specs?.voltage}{specs?.amps && specs.amps !== 'N/A' ? ` (${specs.amps})` : ''}
                                </div>
                                <span className="text-[10px] font-mono text-cyan-300 truncate max-w-full">{specs?.plugType}</span>
                            </div>

                            {/* Window Opening or Wall Sleeve Fit Card */}
                            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-lg group/spec hover:border-cyan-500/50 transition-all duration-500 flex flex-col items-center md:items-start">
                                <div className="text-slate-400 text-[8px] font-header font-black uppercase tracking-[0.3em] mb-1 group-hover/spec:text-cyan-400">
                                    {isWallSleeve ? 'Wall Sleeve Fit' : 'Window Opening Fit'}
                                </div>
                                <div className="text-white font-header font-black text-xs md:text-sm">
                                    {isWallSleeve ? '26" Wall Sleeve' : `Min ${specs?.minWindowHeight} H`}
                                </div>
                                <span className="text-[10px] font-mono text-slate-300">
                                    {isWallSleeve
                                        ? `${specs?.minWindowHeight} H × 26.0" W (GE RAB26A)`
                                        : `${specs?.minWindowWidth}–${specs?.maxWindowWidth} Width Span`}
                                </span>
                            </div>
                        </div>

                        {/* Expandable Dual-Sizing Advisory Accordion */}
                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden font-sans">
                            <button
                                onClick={() => setIsSizingExplainerOpen(!isSizingExplainerOpen)}
                                className="w-full p-3 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <Info className="size-3.5 text-amber-400 shrink-0" />
                                    <span>Why Two Sizing Standards? (Island Microclimate Advisory)</span>
                                </span>
                                {isSizingExplainerOpen ? <ChevronUp className="size-4 text-slate-400 shrink-0" /> : <ChevronDown className="size-4 text-slate-400 shrink-0" />}
                            </button>
                            {isSizingExplainerOpen && (
                                <div className="px-4 pb-3.5 pt-1 text-[11px] text-slate-400 space-y-2 border-t border-slate-800/80 leading-relaxed">
                                    <p>
                                        <strong className="text-emerald-400 font-bold">1. AHAM Factory Rating ({specs?.coolingAreaAham}):</strong> The certified mainland baseline for modern, insulated construction with double-pane glass and zero air infiltration.
                                    </p>
                                    <p>
                                        <strong className="text-amber-400 font-bold">2. Island Microclimate Calibration™ ({specs?.coolingAreaOahu}):</strong> Hawaii homes frequently feature uninsulated single-wall redwood and louvered jalousie windows that increase infiltration heat load by 35–45%. Our Island standard delivers rapid pull-down without continuous compressor burnout or inflated HECO electric bills.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 3-Point Pre-Purchase Confidence Checklist */}
                        <div className="bg-surface-dark border border-border-dark rounded-2xl p-4 md:p-5 shadow-xl font-sans space-y-3">
                            <div className="flex items-center justify-between border-b border-border-dark pb-2">
                                <span className="font-header font-black uppercase text-xs tracking-wider text-white flex items-center gap-1.5">
                                    <ShieldCheck className="size-4 text-emerald-400" />
                                    Pre-Purchase Fit Checklist
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                    Recommended Compatibility
                                </span>
                            </div>

                            {isWallSleeve ? (
                                <div className="space-y-2.5 text-xs">
                                    <div className="flex items-start gap-2.5">
                                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-slate-200 font-bold block">1. 26&quot; Wall Sleeve Compatibility:</strong>
                                            <span className="text-slate-400 text-[11px]">
                                                Designed for standard <strong className="text-white">26&quot; through-the-wall sleeves</strong> (<strong className="text-white">{specs?.minWindowHeight || '15.8"'} H × 26.0&quot; W</strong> opening). Directly fits <strong className="text-cyan-300">GE RAB26A / RAB46B</strong> wall sleeves with <strong className="text-white">RAG13A</strong> rear grille.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-slate-200 font-bold block">2. Electrical Outlet Matching:</strong>
                                            <span className="text-slate-400 text-[11px]">
                                                Powered by <strong className="text-white">{specs?.voltage}</strong>{specs?.amps && specs.amps !== 'N/A' ? <> (<strong className="text-white">{specs.amps} / {specs.watts}</strong>)</> : null} using <strong className="text-cyan-300">{specs?.plugType}</strong>. Includes 75&quot; power cord with LCDI safety plug.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-slate-200 font-bold block">3. Slide-In Chassis &amp; Security Brackets:</strong>
                                            <span className="text-slate-400 text-[11px]">
                                                <strong className="text-white">{specs?.chassisType}</strong> solid-side architecture (<strong className="text-white">{specs?.weight || '92.2 lbs'} net / {specs?.shippingWeight || '94 lbs'} ship</strong>). Secures directly to the wall sleeve using the 2 included metal retention brackets.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2.5 text-xs">
                                    <div className="flex items-start gap-2.5">
                                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-slate-200 font-bold block">1. Window Opening Clearance:</strong>
                                            <span className="text-slate-400 text-[11px]">Requires minimum <strong className="text-white">{specs?.minWindowHeight}</strong> vertical height and <strong className="text-white">{specs?.minWindowWidth} to {specs?.maxWindowWidth}</strong> width span. Compatible with jalousies, sliders, and double-hung frames.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-slate-200 font-bold block">2. Electrical Outlet Matching:</strong>
                                            <span className="text-slate-400 text-[11px]">Powered by <strong className="text-white">{specs?.voltage}</strong> using <strong className="text-cyan-300">{specs?.plugType}</strong>. Verify your wall outlet receptacle before ordering.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-slate-200 font-bold block">3. Chassis Handling &amp; Safety:</strong>
                                            <span className="text-slate-400 text-[11px]"><strong className="text-white">{specs?.chassisType}</strong> chassis architecture ({specs?.weight || (product.weight ? `${product.weight} lbs` : '85 lbs')} net). Outer mounting sleeve installs into window first for secure handling.</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Secondary Specifications Hub */}
                        <div className="bg-surface-dark border border-border-dark rounded-2xl p-4 md:p-5 shadow-xl relative overflow-hidden group/details font-sans">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 items-start relative z-10 text-xs md:text-left">
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Unit Dimensions</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs?.dimensions || product.dimensions || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Weight (Net / Ship)</span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs?.weight || (product.weight ? `${product.weight} lbs` : '85 lbs')} / {specs?.shippingWeight || '96 lbs'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Manufacturer Warranty</span>
                                    <span className="text-rose-400 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs?.warranty || product.warranty || '1 YEAR LIMITED'}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">
                                        {product.id === 16 ? 'Exterior Grille' : 'Dehumidification'}
                                    </span>
                                    <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">
                                        {product.id === 16 ? 'RAG13A Aluminum Included' : (product.dehumidification || (specs as any)?.dehumidification || '3.8 Pts/Hr')}
                                    </span>
                                </div>
                                {specs?.amps && specs.amps !== 'N/A' && (
                                    <div className="flex flex-col gap-1 items-center md:items-start">
                                        <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Amps / Watts</span>
                                        <span className="text-slate-200 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs.amps} / {specs.watts}</span>
                                    </div>
                                )}
                                {specs?.amps && specs.amps !== 'N/A' && (
                                    <div className="flex flex-col gap-1 items-center md:items-start">
                                        <span className="text-slate-400 text-[9px] font-header font-black uppercase tracking-widest">Airflow / Sound</span>
                                        <span className="text-emerald-300 font-header font-black uppercase tracking-wide text-[10px] md:text-xs">{specs.dryAirFlowCfm || '310 CFM'} • {specs.soundProfile || '48 / 56 dB'}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dual-Action Purchase & Appointment Hub */}
                        <div id="product-purchase-section" className="space-y-3 pt-2 relative font-header">
                            {product.stock > 0 ? (
                                <div className="space-y-2.5">
                                    {/* Primary Action: Direct Hardware Purchase (Waipahu Warehouse Pickup or Delivery) */}
                                    <button
                                        onClick={() => {
                                            addToCart(product);
                                            openCart();
                                        }}
                                        className="w-full h-15 py-4 bg-gradient-to-r from-primary to-cyan-500 text-white font-black uppercase tracking-[0.25em] text-xs sm:text-sm rounded-xl shadow-[0_20px_50px_rgba(0,174,239,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <ShoppingCart className="size-5 group-hover:rotate-12 transition-transform shrink-0" />
                                        <span>Buy Now & Pick Up in Waipahu</span>
                                    </button>
                                    <div className="flex items-center justify-between px-1 text-[11px] text-slate-400 font-sans">
                                        <span>Free Waipahu Warehouse Pickup</span>
                                        <span>$50 Flat Island Delivery</span>
                                    </div>

                                    {/* Secondary Action: $0 In-Home Estimate & Professional Installation */}
                                    <Link
                                        href={`/contact?service=window_ac_purchase&notes=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                                        className="w-full h-13 py-3 px-4 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] text-center"
                                    >
                                        <Calendar className="size-4 text-cyan-400 shrink-0" />
                                        <span>Request $0 In-Home Fit Assessment & Installation</span>
                                    </Link>
                                    <div className="text-center text-[10px] font-mono text-emerald-400">
                                        Zero Upfront Deposit • Hawaii CT-36775 Licensed Installation
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {/* High-Converting Out-of-Stock In-Stock Alternative Rescue Bridge */}
                                    {(() => {
                                        const altIds = product.id === 2 ? [3, 11, 1]
                                            : (product.id === 7 || product.id === 10) ? [6, 9, 5]
                                            : product.id === 14 ? [15, 13]
                                            : [4, 3, 1];
                                        const alternatives = altIds
                                            .map(aid => INITIAL_CATALOG_PRODUCTS.find(p => p.id === aid))
                                            .filter((p): p is Product => Boolean(p && p.stock > 0))
                                            .slice(0, 2);

                                        return alternatives.length > 0 ? (
                                            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4 space-y-2.5 text-left shadow-[0_0_25px_rgba(16,185,129,0.12)]">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[10px] font-header font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                                                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                        In-Stock Alternatives Ready for Waipahu Pickup Today
                                                    </span>
                                                    <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                                                        In Stock Now
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {alternatives.map(alt => {
                                                        const altPrice = (isCampaignActiveChecker() && alt.promo_price && alt.promo_price > 0) ? alt.promo_price : alt.price;
                                                        return (
                                                            <Link
                                                                key={alt.id}
                                                                href={`/shop/${generateProductSlug(alt.id, alt.name)}`}
                                                                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-emerald-500/15 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-between gap-2 group/alt"
                                                            >
                                                                <div className="min-w-0">
                                                                    <div className="text-[11px] font-header font-black text-white group-hover/alt:text-emerald-300 truncate">
                                                                        {alt.name}
                                                                    </div>
                                                                    <div className="text-[10px] font-mono text-slate-400">
                                                                        {alt.coverage_oahu || alt.coverage} • {alt.voltage?.split('/')[0]?.trim() || '115V'}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right shrink-0">
                                                                    <div className="text-sm font-header font-black text-emerald-400">
                                                                        ${altPrice}
                                                                    </div>
                                                                    <div className="text-[9px] font-mono text-cyan-300 uppercase">
                                                                        View &rarr;
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : null;
                                    })()}
                                    <a 
                                        href="tel:808-488-1111"
                                        className="w-full h-14 bg-gradient-to-r from-red-600 to-amber-600 text-white font-black uppercase tracking-[0.25em] text-xs rounded-xl shadow-[0_20px_50px_rgba(220,38,38,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <Phone className="size-5 group-hover:animate-bounce" />
                                        Call Waipahu Warehouse to Reserve Next Shipment
                                    </a>
                                </div>
                            )}

                            {/* By Appointment First • Free Sizing Estimates & Dispatch Callout */}
                            <div className="bg-gradient-to-br from-primary/15 via-slate-900/90 to-slate-900 border border-primary/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xl text-left">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span className="font-header font-black text-xs uppercase tracking-wider text-emerald-300">
                                            By Appointment First • Free Estimates ($0 to Book)
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                                        Free Sizing Estimate
                                    </span>
                                </div>
                                <p className="text-slate-200 text-xs font-sans leading-relaxed">
                                    Prefer to verify your room sizing, electrical compatibility (115V vs 230V), or installation requirements before purchasing? It is <strong className="text-white font-bold">zero cost to book an appointment for estimates</strong> on new or replacement installations! Call us, email us, or submit the form below to reserve your appointment window.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                    <a
                                        href="tel:808-488-1111"
                                        className="w-full py-3.5 px-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,174,239,0.3)] active:scale-95 text-center"
                                    >
                                        <Phone className="size-4 shrink-0" />
                                        <span>Call (808) 488-1111</span>
                                    </a>
                                    <Link
                                        href={`/contact?service=window_ac_purchase&notes=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                                        className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
                                    >
                                        <Calendar className="size-4 text-cyan-400 shrink-0" />
                                        <span>Book Appt Form</span>
                                    </Link>
                                </div>
                                <div className="text-center pt-1">
                                    <a 
                                        href={`mailto:office@affordablehome-ac.com?subject=${encodeURIComponent('Appointment Inquiry: ' + product.name)}`}
                                        className="text-[11px] text-slate-400 hover:text-cyan-300 font-mono tracking-wide underline inline-flex items-center gap-1.5 transition-colors"
                                    >
                                        <Mail className="size-3.5" />
                                        Email Dispatch: office@affordablehome-ac.com
                                    </a>
                                </div>
                            </div>
                            
                            {/* Island Trust & Fulfillment Microcopy Chips */}
                            <div className="pt-2 pb-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left font-sans text-xs">
                                <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                                    <Check className="size-4 text-emerald-400 shrink-0" />
                                    <span className="font-medium text-[11px] leading-tight">Waipahu Warehouse Pickup by Appt</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                                    <Check className="size-4 text-emerald-400 shrink-0" />
                                    <span className="font-medium text-[11px] leading-tight">$50 Flat Island-Wide Delivery</span>
                                </div>
                                <a 
                                    href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 rounded-xl p-2.5 shadow-inner transition-colors group cursor-pointer"
                                >
                                    <Check className="size-4 text-emerald-400 shrink-0" />
                                    <span className="font-medium text-[11px] leading-tight flex items-center gap-1">
                                        <span>$45 Hawaii Energy Rebate Form</span>
                                        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider group-hover:underline">(PDF)</span>
                                    </span>
                                </a>
                                <div className="flex items-center gap-2 text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl p-2.5 shadow-inner">
                                    <Check className="size-4 text-emerald-400 shrink-0" />
                                    <span className="font-medium text-[11px] leading-tight">Zero Upfront Estimate Fee</span>
                                </div>
                            </div>

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
                                    <span className="font-header font-black uppercase tracking-[0.2em] text-[10px]">Manufacturer Warranty Coverage</span>
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
                        {product.id !== 16 && (
                            <ACCalculator productBtu={product.btu || 8000} productName={product.name} />
                        )}
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

            {/* Spec Sheet Preview Modal (Desktop Iframe + Mobile Multi-Page Touch Scroll Viewer) */}
            {isSpecModalOpen && specSheetUrl && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/90 backdrop-blur-md">
                    <div className="bg-surface-dark border border-border-dark w-full h-[94dvh] md:w-[90vw] md:h-[90vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-white/20">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-3 md:p-6 border-b border-border-dark bg-slate-950/90 shrink-0 gap-2">
                            <div className="min-w-0 text-left">
                                <h3 className="font-header font-black uppercase text-white tracking-widest text-xs md:text-sm truncate">
                                    Factory Specification Sheet
                                </h3>
                                <p className="text-[10px] font-mono text-cyan-400 truncate">
                                    {product.name} • {specSheetPageCount} {specSheetPageCount === 1 ? 'Page' : 'Pages'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={specSheetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-header font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 transition-colors"
                                >
                                    <ExternalLink className="size-3.5" />
                                    <span>Open PDF</span>
                                </a>
                                <button
                                    onClick={() => {
                                        setIsSpecModalOpen(false);
                                        setIsMobilePdfZoomed(false);
                                    }}
                                    aria-label="Close Specification Modal"
                                    className="p-1.5 md:p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="size-6 md:size-7" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Quick-Jump & Zoom Toolbar (Visible on Mobile / Touch Devices) */}
                        <div className={cn("bg-slate-900/95 border-b border-white/10 px-3 py-2 flex items-center justify-between gap-2 shrink-0", !isTouchDevice && "md:hidden")}>
                            <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-0.5">
                                {product.id === 15 ? (
                                    [
                                        { label: 'p.1 Cover', page: 1 },
                                        { label: 'p.5 R32 Safety', page: 5 },
                                        { label: 'p.9 Controls', page: 9 },
                                        { label: 'p.12 WiFi', page: 12 },
                                        { label: 'p.15 Wall Sleeve Install', page: 15 },
                                        { label: 'p.18 Warranty', page: 18 },
                                    ].map((jump) => (
                                        <button
                                            key={jump.page}
                                            type="button"
                                            onClick={() => {
                                                const el = document.getElementById(`mobile-pdf-page-${jump.page}`);
                                                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="px-2 py-1 rounded bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-[10px] font-mono text-slate-200 whitespace-nowrap shrink-0 transition-colors"
                                        >
                                            {jump.label}
                                        </button>
                                    ))
                                ) : specSheetPageCount > 1 ? (
                                    Array.from({ length: specSheetPageCount }, (_, idx) => idx + 1).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            type="button"
                                            onClick={() => {
                                                const el = document.getElementById(`mobile-pdf-page-${pageNum}`);
                                                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-[10px] font-mono text-slate-200 whitespace-nowrap shrink-0"
                                        >
                                            Page {pageNum}
                                        </button>
                                    ))
                                ) : (
                                    <span className="text-[10px] font-mono text-slate-400">
                                        Scroll or pinch-zoom to inspect factory specs
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMobilePdfZoomed(!isMobilePdfZoomed)}
                                className="px-2.5 py-1 rounded bg-primary/15 border border-primary/30 text-cyan-300 text-[10px] font-mono font-bold flex items-center gap-1 shrink-0"
                            >
                                {isMobilePdfZoomed ? <ZoomOut className="size-3.5" /> : <ZoomIn className="size-3.5" />}
                                <span>{isMobilePdfZoomed ? '1x Fit' : '1.5x Zoom'}</span>
                            </button>
                        </div>

                        {/* Viewer Body: Native Multi-Page Scroll on Mobile/Touch, Native PDF Iframe on Desktop */}
                        <div className="grow relative overflow-hidden bg-slate-950">
                            {/* Mobile / Touch Multi-Page High-Res WebP Stack (Fixes Mobile PDF Page 1 Lockup) */}
                            <div
                                ref={mobilePdfScrollRef}
                                className={cn(
                                    "w-full h-full overflow-y-auto overflow-x-auto overscroll-contain p-2 sm:p-4 space-y-4 bg-slate-950",
                                    !isTouchDevice && "md:hidden"
                                )}
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                {Array.from({ length: specSheetPageCount }, (_, idx) => idx + 1).map((pageNum) => (
                                    <div
                                        key={pageNum}
                                        id={`mobile-pdf-page-${pageNum}`}
                                        className={cn(
                                            "mx-auto bg-white rounded-xl overflow-hidden shadow-xl border border-white/15 transition-all",
                                            isMobilePdfZoomed ? "w-[145%] max-w-none" : "w-full max-w-3xl"
                                        )}
                                    >
                                        <div className="bg-slate-900 px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
                                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                                                Page {pageNum} of {specSheetPageCount}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-400">
                                                {product.name}
                                            </span>
                                        </div>
                                        <img
                                            src={`/assets/specsheets/mobile-pages/${product.id}/page-${pageNum}.webp`}
                                            alt={`${product.name} Factory Specification Sheet - Page ${pageNum} of ${specSheetPageCount}`}
                                            loading={pageNum <= 2 ? "eager" : "lazy"}
                                            className="w-full h-auto block select-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Native PDF Iframe (Preserved 100% intact for non-touch desktop) */}
                            {!isTouchDevice && (
                                <iframe
                                    src={specSheetUrl}
                                    className="hidden md:block w-full h-full"
                                    title="Product Specifications PDF"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 3D Caliper Lightbox Modal */}
            {isCaliperLightboxOpen && cutawayImageUrl && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md">
                    <div className="bg-[#0a0e14] border border-cyan-500/30 w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-cyan-500/20">
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-surface-dark/90">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                    <Ruler className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-header font-black uppercase text-white tracking-widest text-sm md:text-base">
                                        3D Spatial Fit &amp; Dimension Calipers
                                    </h3>
                                    <p className="text-[10px] text-cyan-400 font-mono">
                                        {product.name} • {isWallSleeve ? '26" Wall Sleeve Spatial Fit' : '3D Spatial Architectural Fit'}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsCaliperLightboxOpen(false)} 
                                className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl bg-white/5 hover:bg-white/10"
                            >
                                <X className="size-6" />
                            </button>
                        </div>
                        <div className="relative w-full aspect-[16/10] max-h-[65vh] bg-[#05070a] p-4 flex items-center justify-center overflow-hidden">
                            <Image 
                                src={cutawayImageUrl} 
                                alt={`${product.name} 3D Caliper Dimensions`} 
                                fill 
                                className="object-contain p-2 md:p-4" 
                                priority
                                unoptimized
                            />
                        </div>
                        <div className="p-4 md:p-6 border-t border-white/10 bg-surface-dark/90 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                                    {isWallSleeve ? 'Wall Sleeve Height' : 'Min Window Height'}
                                </div>
                                <div className="text-sm font-bold font-mono text-white mt-0.5">{specs?.minWindowHeight || '16.0"'} H</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                                    {isWallSleeve ? 'Wall Sleeve Width' : 'Window Width Span'}
                                </div>
                                <div className="text-sm font-bold font-mono text-white mt-0.5">
                                    {isWallSleeve ? '26.0" Standard (RAB26A)' : `${specs?.minWindowWidth || '27"'} – ${specs?.maxWindowWidth || '39"'}`}
                                </div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Chassis Type</div>
                                <div className="text-sm font-bold font-header text-cyan-300 mt-0.5">{specs?.chassisType || 'Slide-Out Chassis'}</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Oahu Sizing Standard</div>
                                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{product.coverage_oahu || 'Calibrated'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile & Desktop Sticky Product Purchase Bar */}
            {product && (
                <>
                    {/* Mobile Dock (Pinned Bottom on Mobile Viewports) */}
                    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-cyan-500/20 px-3.5 py-2.5 shadow-2xl flex items-center justify-between gap-2.5">
                        <div className="flex flex-col min-w-0 pr-1">
                            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[110px]">
                                {product.name}
                            </span>
                            <span className="text-base font-header font-black text-cyan-400">
                                ${((isPromo && product.promo_price) ? product.promo_price : product.price).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 grow justify-end">
                            {product.stock > 0 ? (
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        openCart();
                                    }}
                                    className="h-11 px-3.5 bg-gradient-to-r from-primary to-cyan-500 text-white font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 flex items-center justify-center gap-1.5 grow max-w-[150px]"
                                >
                                    <ShoppingCart className="size-4 shrink-0" />
                                    <span>Buy Now</span>
                                </button>
                            ) : (
                                (() => {
                                    const primaryAltId = product.id === 2 ? 3 : (product.id === 7 || product.id === 10) ? 6 : product.id === 14 ? 15 : 4;
                                    const primaryAlt = INITIAL_CATALOG_PRODUCTS.find(p => p.id === primaryAltId);
                                    return primaryAlt ? (
                                        <Link
                                            href={`/shop/${generateProductSlug(primaryAlt.id, primaryAlt.name)}`}
                                            className="h-11 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-[11px] uppercase tracking-wider rounded-xl shadow-lg active:scale-95 flex items-center justify-center gap-1 grow max-w-[155px]"
                                        >
                                            <span>In-Stock Alt &rarr;</span>
                                        </Link>
                                    ) : null;
                                })()
                            )}
                            <Link
                                href={`/contact?service=window_ac_purchase&notes=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                                className="h-11 px-3 bg-slate-900 border border-cyan-500/40 text-cyan-300 font-header font-bold text-xs uppercase tracking-wider rounded-xl active:scale-95 flex items-center justify-center gap-1 shrink-0"
                            >
                                <span>$0 Estimate</span>
                            </Link>
                            <a
                                href="tel:808-488-1111"
                                className="h-11 w-11 shrink-0 bg-slate-800 border border-white/10 text-white rounded-xl flex items-center justify-center active:scale-95"
                                aria-label="Call Waipahu Warehouse Dispatch"
                            >
                                <Phone className="size-4 text-cyan-400" />
                            </a>
                        </div>
                    </div>

                    {/* Desktop Sticky Purchase Bar (Slides in smoothly when #product-purchase-section scrolls out of view) */}
                    <div
                        className={cn(
                            "hidden md:block fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/25 shadow-[0_-15px_40px_rgba(0,0,0,0.75)] transition-all duration-300",
                            isPurchaseBarSticky
                                ? "translate-y-0 opacity-100"
                                : "translate-y-full opacity-0 pointer-events-none"
                        )}
                    >
                        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4 min-w-0">
                                {productImages[0] && (
                                    <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-white/10 overflow-hidden shrink-0">
                                        <Image src={productImages[0]} alt={product.name} fill className="object-contain p-1" unoptimized />
                                    </div>
                                )}
                                <div className="min-w-0 text-left">
                                    <div className="flex items-center gap-2.5">
                                        <span className="font-header font-black text-white text-sm uppercase tracking-tight truncate">
                                            {product.name}
                                        </span>
                                        <StockBadge stock={product.stock} />
                                    </div>
                                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-3 mt-0.5">
                                        <span>{specs?.coolingAreaOahu} (Island)</span>
                                        <span>•</span>
                                        <span>{specs?.voltage}</span>
                                        <span>•</span>
                                        <span className="text-emerald-400">Free Waipahu Pickup or $50 Delivery</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right pr-2">
                                    <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Warehouse Direct</div>
                                    <div className="text-2xl font-header font-black text-cyan-400 leading-none">
                                        ${((isPromo && product.promo_price) ? product.promo_price : product.price).toLocaleString()}
                                    </div>
                                </div>
                                {product.stock > 0 ? (
                                    <button
                                        onClick={() => {
                                            addToCart(product);
                                            openCart();
                                        }}
                                        className="h-11 px-6 bg-gradient-to-r from-primary to-cyan-500 hover:from-cyan-400 hover:to-primary text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,174,239,0.35)] active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <ShoppingCart className="size-4 shrink-0" />
                                        <span>Buy Now & Pick Up</span>
                                    </button>
                                ) : (
                                    (() => {
                                        const primaryAltId = product.id === 2 ? 3 : (product.id === 7 || product.id === 10) ? 6 : product.id === 14 ? 15 : 4;
                                        const primaryAlt = INITIAL_CATALOG_PRODUCTS.find(p => p.id === primaryAltId);
                                        return primaryAlt ? (
                                            <Link
                                                href={`/shop/${generateProductSlug(primaryAlt.id, primaryAlt.name)}`}
                                                className="h-11 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
                                            >
                                                <span>View In-Stock Alternative (${primaryAlt.price}) &rarr;</span>
                                            </Link>
                                        ) : null;
                                    })()
                                )}
                                <Link
                                    href={`/contact?service=window_ac_purchase&notes=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                                    className="h-11 px-4 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 hover:text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                                >
                                    <Calendar className="size-3.5 text-cyan-400" />
                                    <span>$0 Fit Estimate</span>
                                </Link>
                                <a
                                    href="tel:808-488-1111"
                                    className="h-11 px-4 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                                >
                                    <Phone className="size-3.5 text-cyan-400" />
                                    <span>(808) 488-1111</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
