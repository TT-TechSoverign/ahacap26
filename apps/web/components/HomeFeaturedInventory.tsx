'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Snowflake, Warehouse, ShieldCheck, Leaf, ArrowRight, ShoppingCart, Check, Zap } from 'lucide-react';
import { generateProductSlug, isCampaignActive } from '@/lib/utils';
import { Product } from '../types/inventory';

// Curated 4 top-selling in-stock Oahu models directly from the verified catalog (fallback before live API hydration)
const FEATURED_MODELS: Product[] = [
    {
        id: 4,
        category: 'WINDOW_AC',
        name: 'LG Dual Inverter 12,000 BTU (LW1222IVSM)',
        stock: 30,
        btu: 12000,
        coverage: 'Up to 550 sq. ft. (AHAM) • Up to 380 sq. ft. (Oahu)',
        coverage_aham: 'Up to 550 sq. ft.',
        coverage_oahu: 'Up to 380 sq. ft.',
        sizing_notes: 'Factory AHAM certified up to 550 sq. ft. Calibrated for up to 380 sq. ft. in uninsulated Hawaii single-wall structures facing afternoon Leeward/Honolulu sun.',
        key_spec: 'Gold Fin™ Anti-Corrosive Salt Shield • Slide In-Out Chassis',
        noise_level: '44 / 58 dB',
        subcategory: 'dual_inverter',
        price: 745,
        promo_price: 670,
        discount_percent: 10,
        image_url: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        voltage: '115V / 15 Amp',
        performance_specs: 'Gold Fin™ Anti-Corrosive Coating (CEER 15.0)',
        ceer_rating: '15.0',
        dehumidification: '3.8 Pts/Hr',
        dimensions: '15.0" H x 23.6" W x 28.8" D',
        weight: '85',
        shipping_weight: '96',
        min_window_width: '27"',
        max_window_width: '39"',
        min_window_height: '16"',
        chassis_type: 'Slide In-Out',
        dry_air_flow_cfm: '310 CFM',
        warranty: '1 YEAR LIMITED'
    },
    {
        id: 3,
        category: 'WINDOW_AC',
        name: 'LG Dual Inverter 10,000 BTU (LW1022IVSM)',
        stock: 15,
        btu: 10000,
        coverage: 'Up to 450 sq. ft. (AHAM) • Up to 330 sq. ft. (Oahu)',
        coverage_aham: 'Up to 450 sq. ft.',
        coverage_oahu: 'Up to 330 sq. ft.',
        sizing_notes: 'Factory AHAM rated up to 450 sq. ft. Calibrated for up to 330 sq. ft. in typical Oahu master bedrooms and studios with single-wall construction.',
        key_spec: 'ThinQ® Smart Wi-Fi • 44dB Whisper Quiet Master Suite',
        noise_level: '44 / 58 dB',
        subcategory: 'dual_inverter',
        price: 650,
        promo_price: 585,
        discount_percent: 10,
        image_url: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        voltage: '115V / 15 Amp',
        performance_specs: 'ThinQ® Smart Control (CEER 15.5)',
        ceer_rating: '15.5',
        dehumidification: '2.9 Pts/Hr',
        dimensions: '15.0" H x 23.6" W x 28.8" D',
        weight: '87',
        shipping_weight: '98',
        min_window_width: '27"',
        max_window_width: '39"',
        min_window_height: '16"',
        chassis_type: 'Slide In-Out',
        dry_air_flow_cfm: '295 CFM',
        warranty: '1 YEAR LIMITED'
    },
    {
        id: 1,
        category: 'WINDOW_AC',
        name: 'LG Dual Inverter 6,000 BTU (LW6023IVSM)',
        stock: 30,
        btu: 6000,
        coverage: 'Up to 260 sq. ft. (AHAM) • Up to 220 sq. ft. (Oahu)',
        coverage_aham: 'Up to 260 sq. ft.',
        coverage_oahu: 'Up to 220 sq. ft.',
        sizing_notes: 'Factory AHAM rated up to 260 sq. ft. For uninsulated single-wall Hawaii homes with jalousie airflow, calibrated for up to 220 sq. ft. bedroom sanctuaries.',
        key_spec: '#1 Oahu Bedroom Bestseller • Standard 115V Plug',
        noise_level: '44 / 54 dB',
        subcategory: 'dual_inverter',
        price: 560,
        promo_price: 504,
        discount_percent: 10,
        image_url: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        voltage: '115V / 15 Amp',
        performance_specs: '44dB Ultra-Quiet Mode (CEER 15.5)',
        ceer_rating: '15.5',
        dehumidification: '1.4 Pts/Hr',
        dimensions: '12.5" H x 19.6" W x 24.5" D',
        weight: '55',
        shipping_weight: '62',
        min_window_width: '22"',
        max_window_width: '36"',
        min_window_height: '13"',
        chassis_type: 'Top-Down Fixed',
        dry_air_flow_cfm: '195 CFM',
        warranty: '1 YEAR LIMITED'
    },
    {
        id: 6,
        category: 'WINDOW_AC',
        name: 'LG Dual Inverter 18,000 BTU (LW1822IVSM)',
        stock: 20,
        btu: 18000,
        coverage: 'Up to 1,000 sq. ft. (AHAM) • Up to 600 sq. ft. (Oahu)',
        coverage_aham: 'Up to 1,000 sq. ft.',
        coverage_oahu: 'Up to 600 sq. ft.',
        sizing_notes: '500 CFM high-velocity air throw for open-concept Oahu living rooms and vaulted ceilings.',
        key_spec: '500 CFM High-Velocity Throw • 208/230V 15A Plug',
        noise_level: '44 / 59 dB',
        subcategory: 'dual_inverter',
        price: 865,
        promo_price: 778,
        discount_percent: 10,
        image_url: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        voltage: '208/230V / 15 Amp',
        performance_specs: 'High-Velocity 500 CFM Airflow (CEER 14.7)',
        ceer_rating: '14.7',
        dehumidification: '4.2 Pts/Hr',
        dimensions: '17.7" H x 26.0" W x 30.7" D',
        weight: '112',
        shipping_weight: '124',
        min_window_width: '29"',
        max_window_width: '41"',
        min_window_height: '19"',
        chassis_type: 'Slide In-Out',
        dry_air_flow_cfm: '500 CFM',
        warranty: '1 YEAR LIMITED'
    }
];

export function HomeFeaturedInventory() {
    const { addToCart, openCart } = useCart();
    const [addedId, setAddedId] = React.useState<number | null>(null);
    const [featuredModels, setFeaturedModels] = React.useState<Product[]>(FEATURED_MODELS);
    const isPromo = isCampaignActive();

    React.useEffect(() => {
        let isMounted = true;
        async function fetchLiveInventory() {
            try {
                const res = await fetch('/api/v1/products', { cache: 'no-store' });
                if (!res.ok) return;
                const liveProducts: Product[] = await res.json();
                if (!isMounted || !Array.isArray(liveProducts)) return;
                const liveMap = new Map(liveProducts.map((p) => [p.id, p]));
                const usedIds = new Set<number>();

                const hydrated = FEATURED_MODELS.map((fallback) => {
                    const live = liveMap.get(fallback.id);
                    const merged = live ? { ...fallback, ...live } : fallback;
                    usedIds.add(merged.id);
                    return merged;
                });

                // Auto-substitute any out-of-stock slot with an in-stock unit from liveProducts so homepage always shows 4 buyable units
                const finalFeatured = hydrated.map((item) => {
                    if (item.stock > 0) return item;
                    const replacement = liveProducts.find((p) => p.stock > 0 && !usedIds.has(p.id));
                    if (replacement) {
                        usedIds.add(replacement.id);
                        return {
                            ...replacement,
                            image_url: replacement.image_url?.endsWith('.svg')
                                ? replacement.image_url.replace('.svg', '.webp')
                                : replacement.image_url,
                        };
                    }
                    return item;
                });

                setFeaturedModels(finalFeatured);
            } catch (err) {
                console.error('Failed to sync live featured inventory:', err);
            }
        }
        fetchLiveInventory();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
        e.preventDefault();
        if (product.stock <= 0) return;
        const activePrice = (isPromo && product.promo_price) ? product.promo_price : product.price;
        addToCart({
            ...product,
            price: activePrice,
        });
        setAddedId(product.id);
        openCart();
        setTimeout(() => setAddedId(null), 2500);
    };

    return (
        <section className="relative py-16 px-4 bg-slate-950/80 border-t border-slate-800/80">
            {/* Subtle island ambient gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Waipahu In-Stock Warehouse • Ready for Same-Day Pickup
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-header font-black text-white uppercase tracking-tight">
                            Featured Oahu In-Stock Inventory
                        </h2>
                        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl">
                            Brand-new factory-sealed units warehoused locally on Oahu. Pick up by appointment at our Waipahu warehouse or get $50 flat-rate island-wide delivery.
                        </p>
                    </div>

                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/60 text-primary font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-all group"
                    >
                        <span>Explore Full 16-Model Catalog</span>
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 4-Card Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredModels.map((product) => {
                        const slug = generateProductSlug(product.id, product.name);
                        const isLgInverter = product.subcategory === 'dual_inverter';
                        const isAdded = addedId === product.id;
                        const isOutOfStock = product.stock <= 0;

                        return (
                            <div
                                key={product.id}
                                className="group relative bg-slate-900/70 border border-white/10 hover:border-primary/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,174,239,0.15)] hover:-translate-y-1 backdrop-blur-md"
                            >
                                {/* Top Badges */}
                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center justify-between gap-2">
                                        {isOutOfStock ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[10px] font-bold uppercase rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                                Out of Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                {product.stock} In Stock Waipahu
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                                            {product.voltage?.split('/')[0]?.trim() || '115V'}
                                        </span>
                                    </div>

                                    {isLgInverter && (
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold rounded-md">
                                            <Leaf className="size-3 text-emerald-400 shrink-0" />
                                            <span>$45 Hawaii Energy Rebate</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Image */}
                                <Link href={`/shop/${slug}`} className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950/60 border border-white/5 mb-4 group-hover:border-primary/20 transition-colors">
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                    />
                                </Link>

                                {/* Product Info */}
                                <div className="space-y-3 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                                            {product.btu?.toLocaleString()} BTU • {product.subcategory?.replace('_', ' ').toUpperCase()}
                                        </div>
                                        <Link href={`/shop/${slug}`} className="hover:text-primary transition-colors">
                                            <h3 className="font-header font-black text-white text-base leading-snug line-clamp-2 mt-1">
                                                {product.name}
                                            </h3>
                                        </Link>
                                    </div>

                                    {/* Dual-Sizing Island Architecture Badge */}
                                    <div className="bg-slate-950/70 border border-white/5 rounded-xl p-2.5 space-y-1 text-[11px]">
                                        <div className="flex items-center justify-between text-slate-400">
                                            <span>AHAM Certified:</span>
                                            <span className="font-semibold text-slate-200">{product.coverage_aham}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-cyan-300 font-semibold border-t border-white/5 pt-1">
                                            <span className="flex items-center gap-1">
                                                <Zap className="size-3 text-cyan-400" />
                                                <span>Island Calibrated™:</span>
                                            </span>
                                            <span className="text-cyan-200">{product.coverage_oahu}</span>
                                        </div>
                                    </div>

                                    {/* Pricing & Key Spec */}
                                    <div className="pt-2 border-t border-white/5">
                                        <div className="flex items-baseline justify-between mb-1">
                                            <div>
                                                <span className="text-xl font-header font-black text-white">
                                                    ${product.price}
                                                </span>
                                                <span className="text-[10px] text-slate-400 ml-1.5">tax incl. at check</span>
                                            </div>
                                            {product.ceer_rating && (
                                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                                                    CEER {product.ceer_rating}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 line-clamp-1">
                                            {product.key_spec}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <Link
                                            href={`/shop/${slug}`}
                                            className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center border border-white/10"
                                        >
                                            Specs
                                        </Link>
                                        <button
                                            type="button"
                                            disabled={isOutOfStock}
                                            onClick={(e) => handleQuickAdd(product, e)}
                                            className={`px-3 py-2.5 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md ${
                                                isOutOfStock
                                                    ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-white/5 shadow-none'
                                                    : isAdded
                                                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                                                    : 'bg-primary hover:bg-cyan-300 text-slate-950 shadow-primary/20 hover:scale-[1.02]'
                                            }`}
                                        >
                                            {isOutOfStock ? (
                                                <span>Out of Stock</span>
                                            ) : isAdded ? (
                                                <>
                                                    <Check className="size-3.5" />
                                                    <span>Added!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="size-3.5" />
                                                    <span>Add Unit</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Trust Assurance */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-3">
                        <Warehouse className="size-5 text-cyan-400 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">Waipahu Warehouse Pickup by Appointment</span>
                    </div>
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-3">
                        <ShieldCheck className="size-5 text-emerald-400 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">1-Year Factory Warranty & Support</span>
                    </div>
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-3">
                        <Leaf className="size-5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">$45 Hawaii Energy Rebate Paperwork Included</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
