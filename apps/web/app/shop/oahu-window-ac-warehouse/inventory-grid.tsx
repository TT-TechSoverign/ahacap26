'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Check, 
    ShoppingCart, 
    Zap, 
    Volume2, 
    Maximize2, 
    Truck, 
    Warehouse, 
    Sparkles, 
    ChevronRight,
    SlidersHorizontal,
    Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { trackFunnelEvent } from '@/lib/tracking';

interface WarehouseProduct extends Product {
    slug: string;
    modelNumber: string;
    idealFor: string;
    plugType: string;
    hecoMonthly: string;
    badge?: string;
    rebateAmount: number;
}

const WAREHOUSE_INVENTORY: WarehouseProduct[] = [
    {
        id: 1,
        slug: "1-lg-dual-inverter-6-000-btu-lw6023ivsm",
        name: "LG Dual Inverter 6,000 BTU",
        modelNumber: "LW6023IVSM",
        price: 560,
        promo_price: 504,
        stock: 12,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 6000,
        voltage: "115V / 15 Amp",
        coverage: "100–200 sq. ft.",
        noise_level: "44 / 56 dB",
        dehumidification: "2.3 Pts/Hr",
        idealFor: "Small Bedroom / Nursery / Home Office",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$32 / mo",
        rebateAmount: 45,
        badge: "Whisper Quiet Sleep",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    },
    {
        id: 2,
        slug: "2-lg-dual-inverter-8-000-btu-lw8022ivsm",
        name: "LG Dual Inverter 8,000 BTU",
        modelNumber: "LW8022IVSM",
        price: 595,
        promo_price: 535,
        stock: 16,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 8000,
        voltage: "115V / 15 Amp",
        coverage: "100–350 sq. ft.",
        noise_level: "44 / 58 dB",
        dehumidification: "2.8 Pts/Hr",
        idealFor: "Master Bedroom / Standard Suite",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$38 / mo",
        rebateAmount: 45,
        badge: "★ #1 Oahu Best Seller",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    },
    {
        id: 3,
        slug: "3-lg-dual-inverter-10-000-btu-lw1022ivsm",
        name: "LG Dual Inverter 10,000 BTU",
        modelNumber: "LW1022IVSM",
        price: 685,
        promo_price: 616,
        stock: 8,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 10000,
        voltage: "115V / 15 Amp",
        coverage: "200–250 sq. ft.",
        noise_level: "44 / 58 dB",
        dehumidification: "3.2 Pts/Hr",
        idealFor: "Studio Apartment / Large Master Suite",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$44 / mo",
        rebateAmount: 45,
        badge: "Energy Star Most Efficient",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    },
    {
        id: 4,
        slug: "4-lg-dual-inverter-12-000-btu-lw1222ivsm",
        name: "LG Dual Inverter 12,000 BTU",
        modelNumber: "LW1222IVSM",
        price: 745,
        promo_price: 670,
        stock: 14,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 12000,
        voltage: "115V / 15 Amp",
        coverage: "200–250 sq. ft.",
        noise_level: "44 / 59 dB",
        dehumidification: "3.8 Pts/Hr",
        idealFor: "Living Room / Open Lanai Enclosure",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$48 / mo",
        rebateAmount: 45,
        badge: "Gold Fin™ Salt Corrosion Shield",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    },
    {
        id: 5,
        slug: "5-lg-dual-inverter-14-000-btu-lw1522fvsm",
        name: "LG Dual Inverter 14,000 BTU",
        modelNumber: "LW1522FVSM",
        price: 785,
        promo_price: 706,
        stock: 18,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 14000,
        voltage: "115V / 15 Amp",
        coverage: "250–350 sq. ft.",
        noise_level: "52 / 62 dB",
        dehumidification: "4.4 Pts/Hr",
        idealFor: "Large Living Area / Open Kitchen",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$58 / mo",
        rebateAmount: 45,
        badge: "Maximum Standard 115V Power",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    },
    {
        id: 6,
        slug: "6-lg-dual-inverter-18-000-btu-lw1822ivsm",
        name: "LG Dual Inverter 18,000 BTU",
        modelNumber: "LW1822IVSM",
        price: 925,
        promo_price: 832,
        stock: 9,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 18000,
        voltage: "208/230V / 20 Amp",
        coverage: "400+ sq. ft.",
        noise_level: "52 / 63 dB",
        dehumidification: "5.5 Pts/Hr",
        idealFor: "Open Concept / Vaulted Ceilings",
        plugType: "208/230V (NEMA 6-20P)",
        hecoMonthly: "~$68 / mo",
        rebateAmount: 45,
        badge: "Heavy-Duty 230V Whole Floor",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    },
    {
        id: 7,
        slug: "7-lg-dual-inverter-23-500-btu-lw2422ivsm",
        name: "LG Dual Inverter 23,500 BTU",
        modelNumber: "LW2422IVSM",
        price: 1025,
        promo_price: 922,
        stock: 7,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 23500,
        voltage: "208/230V / 20 Amp",
        coverage: "550–1,500 sq. ft.",
        noise_level: "53 / 64 dB",
        dehumidification: "7.1 Pts/Hr",
        idealFor: "Commercial Space / Multi-Room Great Room",
        plugType: "208/230V (NEMA 6-20P)",
        hecoMonthly: "~$82 / mo",
        rebateAmount: 45,
        badge: "Titan Maximum Cooling",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg"
    }
];

export function WarehouseInventoryGrid() {
    const { addToCart, openCart } = useCart();
    const [activeTab, setActiveTab] = useState<'all' | '115v' | '230v' | 'bedroom' | 'living'>('all');
    const [addedId, setAddedId] = useState<number | null>(null);

    const filtered = WAREHOUSE_INVENTORY.filter(item => {
        if (activeTab === '115v') return item.voltage?.includes('115V');
        if (activeTab === '230v') return item.voltage?.includes('230V');
        if (activeTab === 'bedroom') return (item.btu || 0) <= 10000;
        if (activeTab === 'living') return (item.btu || 0) >= 12000;
        return true;
    });

    const handleAddToCart = (product: WarehouseProduct) => {
        trackFunnelEvent('add_to_cart_warehouse', {
            product_id: product.id,
            model: product.modelNumber,
            btu: product.btu,
            price: product.promo_price || product.price,
            location: 'oahu-window-ac-warehouse'
        });

        addToCart({
            id: product.id,
            name: product.name,
            price: product.promo_price || product.price,
            stock: product.stock,
            category: product.category,
            subcategory: product.subcategory,
            image_url: product.image_url,
            btu: product.btu,
            voltage: product.voltage
        });

        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 2500);
        openCart();
    };

    return (
        <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                {[
                    { id: 'all', label: 'All In-Stock Units' },
                    { id: 'bedroom', label: 'Bedrooms & Offices (6k–10k)' },
                    { id: 'living', label: 'Living Rooms (12k–14k)' },
                    { id: '115v', label: 'Standard 115V Outlets' },
                    { id: '230v', label: 'Heavy Duty 230V' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === tab.id
                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => {
                    const price = product.promo_price || product.price;
                    const netAfterRebate = price - product.rebateAmount;

                    return (
                        <div
                            key={product.id}
                            className="flex flex-col bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl relative group"
                        >
                            {/* Product Card Top Badges */}
                            <div className="p-4 pb-2 flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <Warehouse className="w-3 h-3" />
                                    Waipahu: {product.stock} In Stock
                                </span>
                                {product.badge && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                        {product.badge}
                                    </span>
                                )}
                            </div>

                            {/* Image & Title */}
                            <div className="px-6 py-4 flex flex-col items-center text-center">
                                <div className="relative w-48 h-32 my-2 transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src={product.image_url || '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg'}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />
                                </div>
                                <h3 className="text-lg font-extrabold text-white mt-2">
                                    {product.name}
                                </h3>
                                <p className="text-xs font-mono text-emerald-400 mt-0.5">
                                    Model {product.modelNumber}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {product.idealFor}
                                </p>
                            </div>

                            {/* Specs Matrix */}
                            <div className="px-5 py-3 mx-4 rounded-xl bg-slate-950/70 border border-slate-800/80 grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span>{product.coverage}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span>{product.noise_level}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    <span>{product.voltage}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">HECO Est:</span>
                                    <span className="text-emerald-300 font-semibold">{product.hecoMonthly}</span>
                                </div>
                            </div>

                            {/* Pricing & Hawaii Energy Rebate Breakdown */}
                            <div className="p-5 mt-auto border-t border-slate-800/80 bg-slate-900/50">
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-black text-white">
                                                ${price}
                                            </span>
                                            {product.price > price && (
                                                <span className="text-xs text-slate-500 line-through">
                                                    ${product.price}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-0.5">
                                            <Sparkles className="w-3 h-3" />
                                            <span>-${product.rebateAmount} Hawaii Energy Rebate</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Net Cost</div>
                                        <div className="text-base font-black text-emerald-300 font-mono">
                                            ${netAfterRebate}
                                        </div>
                                    </div>
                                </div>

                                {/* Pickup & Delivery Guarantee */}
                                <div className="mt-3.5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-slate-300">
                                        <Warehouse className="w-3 h-3 text-emerald-400" />
                                        Free Waipahu Pickup
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-slate-300">
                                        <Truck className="w-3 h-3 text-cyan-400" />
                                        $50 Island Delivery
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 flex flex-col gap-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
                                    >
                                        {addedId === product.id ? (
                                            <>
                                                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                                                <span>Added to Order!</span>
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4 text-slate-950" />
                                                <span>Add to Order / Checkout</span>
                                            </>
                                        )}
                                    </button>

                                    <Link
                                        href={`/shop/${product.slug}`}
                                        className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <span>Full Specs & PDF Dimensions</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
