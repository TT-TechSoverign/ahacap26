'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Warehouse, ShieldCheck, Leaf, ArrowRight, ShoppingCart, Check, Zap, Sparkles, SlidersHorizontal } from 'lucide-react';
import { generateProductSlug, isCampaignActive } from '@/lib/utils';
import { Product } from '../types/inventory';
import { useLiveInventorySummary } from '@/lib/use-live-inventory';
import { getProductImages } from '@/lib/product-images';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';

type FeaturedTabId = 'bestsellers' | 'dual_inverter' | 'bedroom_115v' | 'large_wall';

interface TabConfig {
    id: FeaturedTabId;
    label: string;
    shortLabel: string;
    title: string;
    subtitle: string;
    ctaText: (count: number) => string;
    ctaHref: string;
    priorityIds: number[];
    filterFn: (p: Product) => boolean;
}

const FEATURED_TABS: TabConfig[] = [
    {
        id: 'bestsellers',
        label: 'Top In-Stock Bestsellers',
        shortLabel: 'Bestsellers',
        title: 'Featured Oahu In-Stock Bestsellers',
        subtitle:
            'Our most-requested in-stock Waipahu units across LG Dual Inverter ($45 Rebate), LG Standard ($395+), and GE Thru-The-Wall series—ready for same-day pickup or $50 flat-rate delivery.',
        ctaText: (count) => `Explore All ${count} In-Stock Models`,
        ctaHref: '/shop',
        // Curated cross-series mix: 12k Dual Inverter ($745), 10k Dual Inverter ($650), 6k Dual Inverter ($560), 8k Standard Value ($395), followed by fallback in-stock priority
        priorityIds: [4, 3, 1, 11, 5, 6, 7, 12, 8, 15, 9, 13],
        filterFn: () => true,
    },
    {
        id: 'dual_inverter',
        label: 'LG Dual Inverter ($45 Rebate)',
        shortLabel: 'Dual Inverter',
        title: 'In-Stock LG Dual Inverter Units ($45 Rebate)',
        subtitle:
            'Whisper-quiet 44dB variable-speed Dual Inverter units in stock at our Waipahu warehouse. Every model in this view qualifies for the $45 Hawaii Energy instant rebate.',
        ctaText: () => 'Shop All LG Dual Inverters',
        ctaHref: '/shop?category=dual_inverter',
        priorityIds: [4, 3, 1, 5, 6, 7],
        filterFn: (p) => p.subcategory === 'dual_inverter',
    },
    {
        id: 'bedroom_115v',
        label: 'Bedrooms & 115V Plug (6k–12k)',
        shortLabel: 'Bedrooms (115V)',
        title: 'In-Stock Bedroom & Standard 115V Window ACs',
        subtitle:
            'Plug-and-play 115V / 15A units (6,000–12,000 BTU) engineered for Oahu bedrooms, studios, and home offices—zero 230V electrical rewiring required.',
        ctaText: () => 'View All Bedroom & 115V Units',
        ctaHref: '/shop?capacity=BEDROOM',
        priorityIds: [1, 11, 3, 4, 8, 12, 13, 15],
        filterFn: (p) => (p.btu || 0) <= 12000 && Boolean(p.voltage?.includes('115V')),
    },
    {
        id: 'large_wall',
        label: 'Large Room & 26" Wall Units',
        shortLabel: 'Large & 26" Wall',
        title: 'In-Stock Large Room (14k–23.5k BTU) & 26" Wall Units',
        subtitle:
            'High-capacity cooling for open Oahu living rooms plus true 26" built-in replacements (GE AJCQ & LG Universal Fit Cool+Heat) for Honolulu condos and townhomes.',
        ctaText: () => 'View Large Room & 26" Wall Catalog',
        ctaHref: '/shop?capacity=LARGE',
        priorityIds: [5, 6, 7, 15, 9, 13, 8],
        filterFn: (p) =>
            (p.btu || 0) >= 14000 ||
            p.subcategory === 'ge' ||
            p.subcategory === 'universal_fit',
    },
];

function formatSeriesBadge(product: Product): string {
    switch (product.subcategory) {
        case 'dual_inverter':
            return 'LG DUAL INVERTER';
        case 'base':
            return 'LG STANDARD SERIES';
        case 'universal_fit':
            return 'LG UNIVERSAL FIT • COOL + HEAT';
        case 'ge':
            return 'GE BUILT-IN • 26" SLEEVE';
        default:
            return 'WINDOW AC';
    }
}

export function HomeFeaturedInventory() {
    const { addToCart, openCart } = useCart();
    const [addedId, setAddedId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<FeaturedTabId>('bestsellers');
    const isPromo = isCampaignActive();

    const {
        inStockAcProducts,
        inStockAcCount,
        totalPhysicalAcUnits,
        minPrice,
        maxPrice,
    } = useLiveInventorySummary();

    const currentTabConfig = useMemo(
        () => FEATURED_TABS.find((t) => t.id === activeTab) || FEATURED_TABS[0],
        [activeTab]
    );

    // Strictly select up to 4 IN-STOCK cooling units matching the active tab in priority order
    const displayedUnits = useMemo(() => {
        const matchingInStock = inStockAcProducts.filter(currentTabConfig.filterFn);
        const byId = new Map<number, Product>(matchingInStock.map((p) => [p.id, p]));
        const selected: Product[] = [];
        const usedIds = new Set<number>();

        for (const id of currentTabConfig.priorityIds) {
            const match = byId.get(id);
            if (match && match.stock > 0 && (match.btu || 0) > 0) {
                selected.push(match);
                usedIds.add(match.id);
                if (selected.length === 4) break;
            }
        }

        if (selected.length < 4) {
            for (const item of matchingInStock) {
                if (!usedIds.has(item.id) && item.stock > 0 && (item.btu || 0) > 0) {
                    selected.push(item);
                    usedIds.add(item.id);
                    if (selected.length === 4) break;
                }
            }
        }

        return selected;
    }, [inStockAcProducts, currentTabConfig]);

    const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
        e.preventDefault();
        if (product.stock <= 0) return;
        const activePrice = isPromo && product.promo_price ? product.promo_price : product.price;
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
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                    <div className="space-y-3">
                        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>
                                Waipahu Warehouse Live: {inStockAcCount} AC Models ({totalPhysicalAcUnits} Units) In Stock • ${minPrice}–${maxPrice.toLocaleString()}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-header font-black text-white uppercase tracking-tight">
                            {currentTabConfig.title}
                        </h2>
                        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-3xl">
                            {currentTabConfig.subtitle}
                        </p>
                    </div>

                    <Link
                        href={currentTabConfig.ctaHref}
                        className="inline-flex items-center gap-2 self-start lg:self-auto px-5 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/60 text-primary font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-all group shrink-0"
                    >
                        <span>{currentTabConfig.ctaText(inStockAcCount)}</span>
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Dynamic Category / Room-Size Filter Tabs (Swipeable on Mobile, Centered/Left on Desktop) */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 border-b border-white/10">
                    <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 shrink-0">
                        <SlidersHorizontal className="size-3.5 text-cyan-400" />
                        Filter View:
                    </span>
                    {FEATURED_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const matchingCount = inStockAcProducts.filter(tab.filterFn).length;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`min-h-[44px] px-4 py-2 rounded-xl font-header font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 border ${
                                    isActive
                                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/10 hover:border-cyan-500/40'
                                }`}
                            >
                                <span className="sm:hidden">{tab.shortLabel}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span
                                    className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                        isActive
                                            ? 'bg-slate-950/20 text-slate-950'
                                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                    }`}
                                >
                                    {matchingCount} In Stock
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* 4-Card Responsive Grid (Strictly In-Stock Units Only) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedUnits.map((product) => {
                        const slug = generateProductSlug(product.id, product.name);
                        const isLgInverter = product.subcategory === 'dual_inverter';
                        const isGeBuiltIn = product.subcategory === 'ge';
                        const isUniversalHeat = product.subcategory === 'universal_fit';
                        const isAdded = addedId === product.id;
                        const primaryPhoto = getProductImages(product.id)[0] || product.image_url;
                        const specTagline =
                            product.performance_specs ||
                            PRODUCT_IDENTIFIERS[product.id]?.catalystBadge ||
                            'Factory-Sealed Waipahu Inventory';

                        return (
                            <div
                                key={product.id}
                                className="group relative bg-slate-900/70 border border-white/10 hover:border-primary/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,174,239,0.15)] hover:-translate-y-1 backdrop-blur-md"
                            >
                                {/* Top Badges */}
                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            {product.stock} In Stock Waipahu
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                                            {product.voltage?.split('/')[0]?.trim() || '115V'}
                                        </span>
                                    </div>

                                    {isLgInverter ? (
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold rounded-md">
                                            <Leaf className="size-3 text-emerald-400 shrink-0" />
                                            <span>$45 Hawaii Energy Rebate</span>
                                        </div>
                                    ) : isGeBuiltIn ? (
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-semibold rounded-md">
                                            <ShieldCheck className="size-3 text-cyan-400 shrink-0" />
                                            <span>True 26&quot; Wall Fit • 2-Yr Full Warranty</span>
                                        </div>
                                    ) : isUniversalHeat ? (
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[10px] font-semibold rounded-md">
                                            <Sparkles className="size-3 text-amber-400 shrink-0" />
                                            <span>Dual-Climate Cool + Heat • 26&quot; Fit</span>
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800/80 border border-white/10 text-slate-300 text-[10px] font-semibold rounded-md">
                                            <Warehouse className="size-3 text-cyan-400 shrink-0" />
                                            <span>Gold Fin™ Anti-Corrosion • 115V Plug</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Image */}
                                <Link
                                    href={`/shop/${slug}`}
                                    className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950/60 border border-white/5 mb-4 group-hover:border-primary/20 transition-colors"
                                >
                                    <Image
                                        src={primaryPhoto}
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
                                        <div className="text-[10px] font-mono uppercase text-cyan-400/90 font-semibold tracking-wider">
                                            {product.btu?.toLocaleString()} BTU • {formatSeriesBadge(product)}
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
                                                    ${product.price.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] text-slate-400 ml-1.5">+ 4.712% GET</span>
                                            </div>
                                            {product.ceer_rating && product.ceer_rating !== 'N/A' && (
                                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                                                    CEER {product.ceer_rating}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-300 line-clamp-1" title={specTagline}>
                                            {specTagline}
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
                                            onClick={(e) => handleQuickAdd(product, e)}
                                            className={`px-3 py-2.5 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md ${
                                                isAdded
                                                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                                                    : 'bg-primary hover:bg-cyan-300 text-slate-950 shadow-primary/20 hover:scale-[1.02]'
                                            }`}
                                        >
                                            {isAdded ? (
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
                        <span className="text-xs text-slate-300 font-medium">
                            Same-Day Waipahu Pickup or $50 Delivery
                        </span>
                    </div>
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-3">
                        <ShieldCheck className="size-5 text-emerald-400 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">
                            1-Yr LG &amp; 2-Yr GE Factory Warranty • Lic #CT-36775
                        </span>
                    </div>
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-3">
                        <Leaf className="size-5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">
                            $45 Hawaii Energy Rebate on All LG Dual Inverters
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
