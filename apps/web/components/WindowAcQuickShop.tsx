'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Warehouse, Truck, ShoppingCart, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { generateProductSlug, isCampaignActive } from '@/lib/utils';
import { buildGa4EcommerceItem, trackEcommerceEvent, trackFunnelEvent } from '@/lib/tracking';
import { useLiveInventorySummary } from '@/lib/use-live-inventory';
import { getProductImages } from '@/lib/product-images';

interface WindowAcQuickShopProps {
    cityName?: string;
    title?: string;
    heading?: string;
    subheading?: string;
    modelIds?: number[];
}

const DEFAULT_IDS = [11, 1, 3, 4]; // $395 8k Standard (ID 11), $560 6k Dual Inv (ID 1), $650 10k Dual Inv (ID 3), $745 12k Dual Inv (ID 4)

const OOS_FALLBACK_MAP: Record<number, number[]> = {
    2: [11, 3, 1, 8],
    10: [7, 9, 6],
    14: [15, 13, 8],
};

type QuickShopCategory = 'featured' | 'bedroom' | 'large' | 'wall';

export function WindowAcQuickShop({ cityName, title, heading, subheading, modelIds }: WindowAcQuickShopProps) {
    const { addToCart, openCart } = useCart();
    const [addedId, setAddedId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<QuickShopCategory>('featured');
    const isPromo = isCampaignActive();
    const { products: allLiveProducts, inStockAcProducts, inStockAcCount, totalPhysicalAcUnits, minPrice, maxPrice } = useLiveInventorySummary();

    const units = useMemo(() => {
        const byId = new Map<number, Product>(allLiveProducts.map((p) => [p.id, p]));
        const explicitSet = new Set<number>(activeCategory === 'featured' && modelIds ? modelIds : []);
        let targetIds: number[];

        if (activeCategory === 'bedroom') {
            targetIds = [11, 1, 3, 4, 8, 12];
        } else if (activeCategory === 'large') {
            targetIds = [5, 6, 7, 9, 4, 12];
        } else if (activeCategory === 'wall') {
            targetIds = [15, 13, 8, 9, 4];
        } else {
            targetIds = modelIds && modelIds.length > 0 ? modelIds : DEFAULT_IDS;
        }

        const selected: Product[] = [];
        const usedIds = new Set<number>();

        const trySelect = (id: number): boolean => {
            if (usedIds.has(id)) return false;
            const match = byId.get(id);
            if (match && match.stock > 0 && ((match.btu || 0) > 0 || explicitSet.has(id))) {
                selected.push(match);
                usedIds.add(match.id);
                return true;
            }
            return false;
        };

        for (const id of targetIds) {
            if (!trySelect(id)) {
                const fallbacks = OOS_FALLBACK_MAP[id] || [];
                for (const fbId of fallbacks) {
                    if (trySelect(fbId)) break;
                }
            }
            if (selected.length === 4) break;
        }

        if (selected.length < 4) {
            for (const candidate of inStockAcProducts) {
                if (!usedIds.has(candidate.id) && candidate.stock > 0 && (candidate.btu || 0) > 0) {
                    selected.push(candidate);
                    usedIds.add(candidate.id);
                    if (selected.length === 4) break;
                }
            }
        }

        return selected;
    }, [allLiveProducts, inStockAcProducts, modelIds, activeCategory]);

    const handleAdd = (product: Product) => {
        if (product.stock <= 0) return;
        const activePrice = isPromo && product.promo_price ? product.promo_price : product.price;
        trackFunnelEvent('add_to_cart_quick_shop', {
            product_id: product.id,
            product_name: product.name,
            price: activePrice,
            city: cityName || 'oahu',
            category_tab: activeCategory,
        });
        addToCart({
            ...product,
            price: activePrice,
            image_url: getProductImages(product.id)[0] || product.image_url,
        });
        setAddedId(product.id);
        openCart();
        setTimeout(() => setAddedId(null), 2200);
    };

    const rawHeading =
        title ||
        heading ||
        (cityName
            ? `In-Stock Window ACs Ready for ${cityName} Delivery or Pickup`
            : 'In-Stock Waipahu Window ACs — Order Online Now');

    const resolvedHeading = rawHeading.replace(/\$395[–\-?]\$(?:1,025|1,200)/g, `$${minPrice}–$${maxPrice.toLocaleString()}`);

    const rawSubheading =
        subheading ||
        (cityName
            ? `Order brand-new LG & GE Window ACs online for $50 flat delivery to ${cityName} or free pickup at our Waipahu warehouse (94-150 Leoleo St #203).`
            : 'Brand-new factory-sealed LG & GE units in stock at our Waipahu warehouse. Free pickup by appointment or $50 flat Oahu delivery.');

    const resolvedSubheading = rawSubheading.replace(/\$395[–\-?]\$(?:1,025|1,200)/g, `$${minPrice}–$${maxPrice.toLocaleString()}`);

    return (
        <section id="in-stock-waipahu-models" className="py-12 px-4 sm:px-6 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl my-12">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Crawlable Google SERP Quick-Jump Sitelink Anchor Bar */}
                <nav aria-label="On-Page Quick Jump" className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/10 text-[11px] font-mono">
                    <span className="text-slate-400 uppercase font-bold tracking-wider mr-1">Jump To:</span>
                    <a href="#in-stock-waipahu-models" className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-primary/15 border border-white/10 text-cyan-400 hover:text-cyan-300 transition-colors">
                        In-Stock Units (${minPrice}–${maxPrice.toLocaleString()})
                    </a>
                    <a href="#oahu-window-ac-comparison-table" className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-primary/15 border border-white/10 text-cyan-400 hover:text-cyan-300 transition-colors">
                        Oahu Price &amp; BTU Spec Table
                    </a>
                    <a href="#oahu-service-options-summary" className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-primary/15 border border-white/10 text-cyan-400 hover:text-cyan-300 transition-colors">
                        $0 Estimate Install &amp; Cleaning
                    </a>
                    <a href="#oahu-window-ac-directory" className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-primary/15 border border-white/10 text-cyan-400 hover:text-cyan-300 transition-colors">
                        Complete Oahu AC Directory
                    </a>
                </nav>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                            <Warehouse className="size-3.5" />
                            <span>
                                Live Waipahu Warehouse: {inStockAcCount} AC Models ({totalPhysicalAcUnits} Units) In Stock • $45 HECO Rebate
                            </span>
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
                        prefetch={false}
                        className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-3 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/40 text-primary font-header font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                    >
                        <span>View All {inStockAcCount} In-Stock Models (${minPrice}–${maxPrice.toLocaleString()})</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Interactive Room & BTU Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-white/10">
                    {[
                        { id: 'featured', label: '★ Top Oahu Picks ($395+)' },
                        { id: 'bedroom', label: 'Bedrooms & 115V (6k–12k BTU)' },
                        { id: 'large', label: 'Large Living Rooms (14k–23.5k BTU)' },
                        { id: 'wall', label: '26" Thru-Wall Condo Fit (GE & LG)' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveCategory(tab.id as QuickShopCategory)}
                            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl font-header font-bold text-[11px] uppercase tracking-wider whitespace-nowrap shrink-0 transition-all border ${
                                activeCategory === tab.id
                                    ? 'bg-primary text-slate-950 border-cyan-400 shadow-md shadow-primary/20'
                                    : 'bg-slate-950/80 text-slate-300 border-white/10 hover:text-white hover:border-primary/40'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {units.map((unit) => {
                        const slug = generateProductSlug(unit.id, unit.name);
                        const activePrice = isPromo && unit.promo_price ? unit.promo_price : unit.price;
                        const isAdded = addedId === unit.id;
                        const imgSrc =
                            getProductImages(unit.id)[0] ||
                            unit.image_url ||
                            '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp';

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
                                        prefetch={false}
                                        onClick={() => {
                                            trackEcommerceEvent('select_item', {
                                                item_list_id: cityName ? `city_quick_shop_${cityName.toLowerCase().replace(/\s+/g, '_')}` : `quick_shop_${activeCategory}`,
                                                item_list_name: cityName ? `${cityName} Quick Shop` : 'Window AC Quick Shop',
                                                items: [buildGa4EcommerceItem(unit, 1, 0, activePrice)],
                                            });
                                        }}
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
                                        {unit.btu ? `${unit.btu.toLocaleString()} BTU • ${unit.coverage_oahu || 'Oahu Calibrated'}` : '26" Structural Wall Sleeve • Condo Fit'}
                                    </div>
                                    <Link href={`/shop/${slug}`} prefetch={false}>
                                        <h3 className="text-sm font-header font-black uppercase text-white mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                                            {unit.name}
                                        </h3>
                                    </Link>
                                </div>

                                <div className="pt-3 mt-3 border-t border-white/10 space-y-2.5">
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <span className="text-xl font-header font-black text-white">${activePrice.toLocaleString()}</span>
                                            <span className="text-[10px] text-slate-400 ml-1">Waipahu Direct</span>
                                        </div>
                                        {(unit.subcategory === 'dual_inverter' || unit.id === 15) && (
                                            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-0.5">
                                                <Sparkles className="size-2.5" /> -$45 Rebate
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            href={`/shop/${slug}`}
                                            prefetch={false}
                                            className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-header font-bold text-[11px] uppercase tracking-wider text-center transition-colors"
                                        >
                                            Specs
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleAdd(unit)}
                                            className={`py-2.5 px-3 rounded-xl font-header font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                                                isAdded
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

                {/* Crawlable Direct Model Catalog Strip (Passes SSR PageRank & Direct Anchor Text to All In-Stock Models) */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Direct In-Stock Waipahu Model Links (Order Online or Pickup at 94-150 Leoleo St #203):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {inStockAcProducts.map((model) => {
                            const modelSlug = generateProductSlug(model.id, model.name);
                            const shortCode = model.key_spec || model.name.match(/\(([^)]+)\)/)?.[1] || `ID-${model.id}`;
                            const btuText = model.btu ? `${(model.btu / 1000).toFixed(model.btu % 1000 === 0 ? 0 : 1)}k BTU` : '26" Fit';
                            return (
                                <Link
                                    key={model.id}
                                    href={`/shop/${modelSlug}`}
                                    prefetch={false}
                                    className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-primary/15 border border-white/10 hover:border-primary/40 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                                >
                                    {model.name.startsWith('GE') ? 'GE' : 'LG'} {btuText} ({shortCode}) • ${model.price.toLocaleString()}
                                </Link>
                            );
                        })}
                        <Link
                            href="/shop/16-ge-rab26a-wall-casement"
                            prefetch={false}
                            className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-primary/15 border border-white/10 hover:border-primary/40 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                            GE RAB26A 26&quot; Wall Sleeve • $275
                        </Link>
                    </div>
                </div>

                {/* Semantic HTML Comparison Table for Google SERP Rich Table Snippets & Featured Snippets */}
                <div className="pt-5 border-t border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-header font-black uppercase text-white tracking-wide">
                            Oahu In-Stock LG &amp; GE Window AC Price, BTU &amp; Specification Comparison Table
                        </h3>
                        <span className="text-[11px] font-mono text-emerald-400">
                            4.9★ (142 Oahu Reviews) • Free Waipahu Pickup or $50 Delivery
                        </span>
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90">
                        <table id="oahu-window-ac-comparison-table" className="w-full text-left border-collapse text-xs">
                            <caption className="sr-only">
                                Complete comparison of in-stock LG Dual Inverter, LG Cool+Heat, LG Standard, and GE 26-Inch Built-In Window Air Conditioners ($395 to $1,200) at Affordable Home A/C in Waipahu, Oahu.
                            </caption>
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                    <th scope="col" className="py-2.5 px-3">Model &amp; MPN</th>
                                    <th scope="col" className="py-2.5 px-3">Cooling BTU</th>
                                    <th scope="col" className="py-2.5 px-3">Oahu Room Size (AHAM)</th>
                                    <th scope="col" className="py-2.5 px-3">Voltage / Circuit</th>
                                    <th scope="col" className="py-2.5 px-3">Noise / Efficiency</th>
                                    <th scope="col" className="py-2.5 px-3">Waipahu Price &amp; Rebate</th>
                                    <th scope="col" className="py-2.5 px-3">Stock &amp; Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-sans text-slate-200">
                                {inStockAcProducts.map((model) => {
                                    const modelSlug = generateProductSlug(model.id, model.name);
                                    const hasRebate = model.subcategory === 'dual_inverter' || model.id === 15;
                                    return (
                                        <tr key={model.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-2 px-3 font-bold text-white">
                                                <Link href={`/shop/${modelSlug}`} prefetch={false} className="hover:text-primary underline decoration-white/20">
                                                    {model.name}
                                                </Link>
                                            </td>
                                            <td className="py-2 px-3 font-mono text-cyan-400 whitespace-nowrap">
                                                {model.btu ? `${model.btu.toLocaleString()} BTU` : '26" Sleeve'}
                                            </td>
                                            <td className="py-2 px-3 text-slate-300">
                                                {model.coverage_oahu || 'Oahu Calibrated'} <span className="text-slate-500 text-[11px]">({model.coverage_aham || model.coverage})</span>
                                            </td>
                                            <td className="py-2 px-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                                                {model.voltage || '115V / 15A'}
                                            </td>
                                            <td className="py-2 px-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                                                {model.noise_level || '44 dB'} • {model.ceer_rating ? `${model.ceer_rating} CEER` : 'R-32'}
                                            </td>
                                            <td className="py-2 px-3 font-mono whitespace-nowrap">
                                                <span className="font-bold text-white">${model.price.toLocaleString()}</span>
                                                {hasRebate && (
                                                    <span className="ml-1.5 text-[10px] text-emerald-400 font-bold">(-$45 Rebate)</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-3 font-mono text-[11px] whitespace-nowrap">
                                                <Link href={`/shop/${modelSlug}`} prefetch={false} className="text-emerald-400 hover:text-cyan-300 font-bold">
                                                    {model.stock} In Stock &rarr;
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Oahu Service & Installation Options Summary Block */}
                <div id="oahu-service-options-summary" className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <Link href="/window-ac-installation" prefetch={false} className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-white/10 hover:border-primary/40 transition-colors">
                        <div className="font-header font-bold uppercase text-white">Window &amp; Jalousie AC Installation</div>
                        <div className="text-[11px] text-emerald-400 font-mono mt-0.5">$0 Free In-Home Estimate • Custom Louver &amp; 26&quot; Wall Fit</div>
                    </Link>
                    <Link href="/ac-cleaning-oahu" prefetch={false} className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-white/10 hover:border-primary/40 transition-colors">
                        <div className="font-header font-bold uppercase text-white">Window AC Deep Mold &amp; Coil Cleaning</div>
                        <div className="text-[11px] text-emerald-400 font-mono mt-0.5">$0 Free Estimate • Floor Drop-Cloth Protection</div>
                    </Link>
                    <Link href="/clean-vs-replace-window-ac" prefetch={false} className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-white/10 hover:border-primary/40 transition-colors">
                        <div className="font-header font-bold uppercase text-white">Clean vs. Replace AC Assessment</div>
                        <div className="text-[11px] text-emerald-400 font-mono mt-0.5">$0 Honest Evaluation • Cut HECO Bills 40% + $45 Rebate</div>
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
                    <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <Warehouse className="size-3.5 text-emerald-400" />
                        Free Waipahu Pickup (94-150 Leoleo St #203, by appt)
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <Truck className="size-3.5 text-cyan-400" />
                        $50 Flat Oahu Delivery • US-Issued Cards Only
                    </span>
                </div>
            </div>
        </section>
    );
}
