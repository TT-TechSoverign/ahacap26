'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Warehouse, Truck, ShoppingCart, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { generateProductSlug, isCampaignActive } from '@/lib/utils';
import { trackFunnelEvent } from '@/lib/tracking';

interface WindowAcQuickShopProps {
    cityName?: string;
    title?: string;
    heading?: string;
    subheading?: string;
}

const DEFAULT_IDS = [6, 1, 3, 4]; // $395 6k Standard, $560 6k Dual Inv, $650 10k Dual Inv, $755 12k Dual Inv

export function WindowAcQuickShop({ cityName, title, heading, subheading }: WindowAcQuickShopProps) {
    const { addToCart, openCart } = useCart();
    const [addedId, setAddedId] = useState<number | null>(null);
    const isPromo = isCampaignActive();

    const [units, setUnits] = useState<Product[]>(() =>
        DEFAULT_IDS.map((id) => INITIAL_CATALOG_PRODUCTS.find((p) => p.id === id)!).filter(Boolean)
    );

    useEffect(() => {
        let isMounted = true;
        fetch('/api/v1/products', { cache: 'no-store' })
            .then((res) => (res.ok ? res.json() : null))
            .then((liveProducts: Product[] | null) => {
                if (!isMounted || !Array.isArray(liveProducts)) return;
                const liveMap = new Map(liveProducts.map((p) => [p.id, p]));
                const usedIds = new Set<number>();

                const initialSelection = DEFAULT_IDS.map((id) => {
                    const live = liveMap.get(id);
                    const fallback = INITIAL_CATALOG_PRODUCTS.find((p) => p.id === id)!;
                    const merged = live ? { ...fallback, ...live } : fallback;
                    usedIds.add(merged.id);
                    return merged;
                });

                const finalSelection = initialSelection.map((item) => {
                    if (item.stock > 0) return item;
                    const replacement = liveProducts.find((p) => p.stock > 0 && !usedIds.has(p.id));
                    if (replacement) {
                        usedIds.add(replacement.id);
                        return replacement;
                    }
                    return item;
                });

                setUnits(finalSelection);
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, []);

    const handleAdd = (product: Product) => {
        if (product.stock <= 0) return;
        const activePrice = (isPromo && product.promo_price) ? product.promo_price : product.price;
        trackFunnelEvent('add_to_cart_quick_shop', {
            product_id: product.id,
            product_name: product.name,
            price: activePrice,
            city: cityName || 'oahu',
        });
        addToCart({
            ...product,
            price: activePrice,
            image_url: product.image_url?.endsWith('.svg')
                ? product.image_url.replace('.svg', '.webp')
                : product.image_url,
        });
        setAddedId(product.id);
        openCart();
        setTimeout(() => setAddedId(null), 2200);
    };

    const resolvedHeading =
        title ||
        heading ||
        (cityName
            ? `In-Stock Window ACs Ready for ${cityName} Delivery or Pickup`
            : 'In-Stock Waipahu Window ACs — Order Online Now');

    const resolvedSubheading =
        subheading ||
        (cityName
            ? `Skip big-box backorders. Order brand-new LG & GE Window ACs online for $50 flat delivery to ${cityName} or free pickup at our Waipahu warehouse (94-150 Leoleo St #203).`
            : 'Brand-new factory-sealed LG & GE units in stock at our Waipahu warehouse. Free pickup by appointment or $50 flat island-wide Oahu delivery.');

    return (
        <section className="py-12 px-4 sm:px-6 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl my-12">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                            <Warehouse className="size-3.5" />
                            <span>Live Waipahu Warehouse Stock • $45 HECO Rebate Eligible</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            {resolvedHeading}
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                            {resolvedSubheading}
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-3 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/40 text-primary font-header font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                    >
                        <span>View All 16 Models</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {units.map((unit) => {
                        const slug = generateProductSlug(unit.id, unit.name);
                        const activePrice = (isPromo && unit.promo_price) ? unit.promo_price : unit.price;
                        const isOutOfStock = unit.stock <= 0;
                        const isAdded = addedId === unit.id;
                        const imgSrc = unit.image_url?.endsWith('.svg')
                            ? unit.image_url.replace('.svg', '.webp')
                            : unit.image_url || '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp';

                        return (
                            <div
                                key={unit.id}
                                className="flex flex-col justify-between p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-primary/40 transition-all group"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                                            {unit.stock} In Stock
                                        </span>
                                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                                            {unit.voltage?.split('/')[0]?.trim() || '115V'}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/shop/${slug}`}
                                        className="relative block aspect-[16/10] w-full rounded-xl bg-slate-900/90 border border-white/5 overflow-hidden mb-3"
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={unit.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                                            unoptimized
                                        />
                                    </Link>

                                    <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                                        {unit.btu?.toLocaleString()} BTU • {unit.coverage_oahu || 'Oahu Calibrated'}
                                    </div>
                                    <Link href={`/shop/${slug}`}>
                                        <h3 className="text-sm font-header font-black uppercase text-white mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                                            {unit.name}
                                        </h3>
                                    </Link>
                                </div>

                                <div className="pt-3 mt-3 border-t border-white/10 space-y-2.5">
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <span className="text-xl font-header font-black text-white">${activePrice}</span>
                                            <span className="text-[10px] text-slate-400 ml-1">Waipahu Direct</span>
                                        </div>
                                        {unit.subcategory === 'dual_inverter' && (
                                            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-0.5">
                                                <Sparkles className="size-2.5" /> -$45 Rebate
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            href={`/shop/${slug}`}
                                            className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-header font-bold text-[11px] uppercase tracking-wider text-center transition-colors"
                                        >
                                            Specs
                                        </Link>
                                        <button
                                            type="button"
                                            disabled={isOutOfStock}
                                            onClick={() => handleAdd(unit)}
                                            className={`py-2.5 px-3 rounded-xl font-header font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                                                isOutOfStock
                                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                    : isAdded
                                                    ? 'bg-emerald-500 text-slate-950'
                                                    : 'bg-primary hover:bg-cyan-300 text-slate-950 shadow-md shadow-primary/20'
                                            }`}
                                        >
                                            {isAdded ? (
                                                <>
                                                    <Check className="size-3.5" />
                                                    <span>Added</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="size-3.5" />
                                                    <span>Buy Now</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
                    <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <Warehouse className="size-3.5 text-emerald-400" />
                        Free Waipahu Pickup (94-150 Leoleo St #203, by appt)
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <Truck className="size-3.5 text-cyan-400" />
                        $50 Flat Island-Wide Oahu Delivery • US-Issued Cards Only
                    </span>
                </div>
            </div>
        </section>
    );
}
