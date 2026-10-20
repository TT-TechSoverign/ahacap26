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
import { isCampaignActive } from '@/lib/utils';

interface WarehouseProduct extends Product {
    slug: string;
    modelNumber: string;
    idealFor: string;
    plugType: string;
    hecoMonthly: string;
    badge?: string;
    rebateAmount: number;
    coverageAham?: string;
    coverageOahu?: string;
    minWindowHeight?: string;
    minWindowWidth?: string;
    maxWindowWidth?: string;
    chassisType?: string;
    netWeight?: string;
}

const WAREHOUSE_INVENTORY: WarehouseProduct[] = [
    {
        id: 1,
        slug: "1-lg-dual-inverter-6-000-btu-lw6023ivsm",
        name: "LG Dual Inverter 6,000 BTU (LW6023IVSM)",
        modelNumber: "LW6023IVSM",
        price: 560,
        promo_price: null,
        stock: 30,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 6000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 260 sq. ft. (AHAM) • Up to 220 sq. ft. (Oahu)",
        coverageAham: "Up to 260 sq. ft.",
        coverageOahu: "Up to 220 sq. ft.",
        minWindowHeight: '13"',
        minWindowWidth: '22"',
        maxWindowWidth: '36"',
        chassisType: "Top-Down Fixed",
        netWeight: "55 lbs",
        noise_level: "44 / 54 dB",
        dehumidification: "1.4 Pts/Hr",
        idealFor: "Small Bedroom / Nursery / Home Office",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$32 / mo",
        rebateAmount: 45,
        badge: "15.5 CEER Whisper Quiet",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 2,
        slug: "2-lg-dual-inverter-8-000-btu-lw8022ivsm",
        name: "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
        modelNumber: "LW8022IVSM",
        price: 595,
        promo_price: null,
        stock: 0,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 8000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 350 sq. ft. (AHAM) • Up to 280 sq. ft. (Oahu)",
        coverageAham: "Up to 350 sq. ft.",
        coverageOahu: "Up to 280 sq. ft.",
        minWindowHeight: '13"',
        minWindowWidth: '22"',
        maxWindowWidth: '36"',
        chassisType: "Top-Down Fixed",
        netWeight: "58 lbs",
        noise_level: "44 / 54 dB",
        dehumidification: "2.5 Pts/Hr",
        idealFor: "Master Bedroom / Standard Suite",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$38 / mo",
        rebateAmount: 45,
        badge: "★ #1 Oahu Best Seller",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 3,
        slug: "3-lg-dual-inverter-10-000-btu-lw1022ivsm",
        name: "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
        modelNumber: "LW1022IVSM",
        price: 650,
        promo_price: null,
        stock: 15,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 10000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 450 sq. ft. (AHAM) • Up to 330 sq. ft. (Oahu)",
        coverageAham: "Up to 450 sq. ft.",
        coverageOahu: "Up to 330 sq. ft.",
        minWindowHeight: '16"',
        minWindowWidth: '27"',
        maxWindowWidth: '39"',
        chassisType: "Slide In-Out",
        netWeight: "87 lbs",
        noise_level: "44 / 58 dB",
        dehumidification: "2.9 Pts/Hr",
        idealFor: "Studio Apartment / Large Master Suite",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$44 / mo",
        rebateAmount: 45,
        badge: "ENERGY STAR® Most Efficient",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 4,
        slug: "4-lg-dual-inverter-12-000-btu-lw1222ivsm",
        name: "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
        modelNumber: "LW1222IVSM",
        price: 745,
        promo_price: null,
        stock: 30,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 12000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 550 sq. ft. (AHAM) • Up to 380 sq. ft. (Oahu)",
        coverageAham: "Up to 550 sq. ft.",
        coverageOahu: "Up to 380 sq. ft.",
        minWindowHeight: '16"',
        minWindowWidth: '27"',
        maxWindowWidth: '39"',
        chassisType: "Slide In-Out",
        netWeight: "85 lbs",
        noise_level: "44 / 58 dB",
        dehumidification: "3.8 Pts/Hr",
        idealFor: "Living Room / Open Lanai Enclosure",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$48 / mo",
        rebateAmount: 45,
        badge: "Gold Fin™ Salt Corrosion Shield",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 5,
        slug: "5-lg-dual-inverter-14-000-btu-lw1522fvsm",
        name: "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
        modelNumber: "LW1522FVSM",
        price: 785,
        promo_price: null,
        stock: 15,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 14000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 700 sq. ft. (AHAM) • Up to 450 sq. ft. (Oahu)",
        coverageAham: "Up to 700 sq. ft.",
        coverageOahu: "Up to 450 sq. ft.",
        minWindowHeight: '16"',
        minWindowWidth: '27"',
        maxWindowWidth: '39"',
        chassisType: "Slide In-Out",
        netWeight: "91 lbs",
        noise_level: "44 / 58 dB",
        dehumidification: "4.2 Pts/Hr",
        idealFor: "Large Living Area / Open Kitchen",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$58 / mo",
        rebateAmount: 45,
        badge: "Maximum Standard 115V Power",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 6,
        slug: "6-lg-dual-inverter-18-000-btu-lw1822ivsm",
        name: "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
        modelNumber: "LW1822IVSM",
        price: 865,
        promo_price: null,
        stock: 20,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 18000,
        voltage: "208/230V / 15 Amp",
        coverage: "Up to 1,000 sq. ft. (AHAM) • Up to 600 sq. ft. (Oahu)",
        coverageAham: "Up to 1,000 sq. ft.",
        coverageOahu: "Up to 600 sq. ft.",
        minWindowHeight: '19"',
        minWindowWidth: '29"',
        maxWindowWidth: '41"',
        chassisType: "Slide In-Out",
        netWeight: "112 lbs",
        noise_level: "44 / 59 dB",
        dehumidification: "4.2 Pts/Hr",
        idealFor: "Open Concept / Vaulted Ceilings",
        plugType: "208/230V 15A (NEMA 6-15P)",
        hecoMonthly: "~$68 / mo",
        rebateAmount: 45,
        badge: "500 CFM High-Velocity Throw",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 7,
        slug: "7-lg-dual-inverter-23-500-btu-lw2422ivsm",
        name: "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
        modelNumber: "LW2422IVSM",
        price: 985,
        promo_price: null,
        stock: 0,
        category: "WINDOW_AC",
        subcategory: "dual_inverter",
        btu: 23500,
        voltage: "208/230V / 15 Amp",
        coverage: "Up to 1,440 sq. ft. (AHAM) • Up to 800 sq. ft. (Oahu)",
        coverageAham: "Up to 1,440 sq. ft.",
        coverageOahu: "Up to 800 sq. ft.",
        minWindowHeight: '19"',
        minWindowWidth: '29"',
        maxWindowWidth: '41"',
        chassisType: "Slide In-Out",
        netWeight: "112 lbs",
        noise_level: "53 / 62 dB",
        dehumidification: "5.6 Pts/Hr",
        idealFor: "Commercial Space / Multi-Room Great Room",
        plugType: "208/230V 15A (NEMA 6-15P)",
        hecoMonthly: "~$82 / mo",
        rebateAmount: 45,
        badge: "Flagship 23,500 BTU Cooling",
        image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    },
    {
        id: 8,
        slug: "8-lg-dual-inverter-cool-heat-8-000-btu-lw8023hrsm",
        name: "LG Dual Inverter Cool + Heat 8,000 BTU (LW8023HRSM)",
        modelNumber: "LW8023HRSM",
        price: 660,
        promo_price: null,
        stock: 8,
        category: "WINDOW_AC",
        subcategory: "cool_plus_heat",
        btu: 8000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 350 sq. ft. (AHAM) • Up to 260 sq. ft. (Oahu)",
        coverageAham: "Up to 350 sq. ft.",
        coverageOahu: "Up to 260 sq. ft.",
        minWindowHeight: '14"',
        minWindowWidth: '25"',
        maxWindowWidth: '36"',
        chassisType: "Slide In-Out",
        netWeight: "66 lbs",
        noise_level: "44 / 53 dB",
        dehumidification: "2.3 Pts/Hr",
        idealFor: "Upland Bedrooms (Mililani / Wahiawa / Nuuanu)",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$39 / mo",
        rebateAmount: 0,
        badge: "Cool + Supplemental Heat",
        image_url: "/assets/window-unit-images/lg-units/lg-cool-and-heat-unit-photos-1600x1000/lg-cool-and-heat-front-1600x1000.webp"
    },
    {
        id: 9,
        slug: "9-lg-dual-inverter-cool-heat-18-000-btu-lw1823hrsm",
        name: "LG Dual Inverter Cool + Heat 18,000 BTU (LW1823HRSM)",
        modelNumber: "LW1823HRSM",
        price: 940,
        promo_price: null,
        stock: 6,
        category: "WINDOW_AC",
        subcategory: "cool_plus_heat",
        btu: 18000,
        voltage: "208/230V / 20 Amp",
        coverage: "Up to 1,000 sq. ft. (AHAM) • Up to 600 sq. ft. (Oahu)",
        coverageAham: "Up to 1,000 sq. ft.",
        coverageOahu: "Up to 600 sq. ft.",
        minWindowHeight: '19"',
        minWindowWidth: '29"',
        maxWindowWidth: '41"',
        chassisType: "Slide In-Out",
        netWeight: "123 lbs",
        noise_level: "44 / 59 dB",
        dehumidification: "5.4 Pts/Hr",
        idealFor: "Large Living Room • Cool + Heat",
        plugType: "208/230V 20A (NEMA 6-20P)",
        hecoMonthly: "~$70 / mo",
        rebateAmount: 0,
        badge: "18k Cool + Heat Mode",
        image_url: "/assets/window-unit-images/lg-units/lg-cool-and-heat-unit-photos-1600x1000/lg-cool-and-heat-front-1600x1000.webp"
    },
    {
        id: 10,
        slug: "10-lg-dual-inverter-cool-heat-23-500-btu-lw2423hrsm",
        name: "LG Dual Inverter Cool + Heat 23,500 BTU (LW2423HRSM)",
        modelNumber: "LW2423HRSM",
        price: 1025,
        promo_price: null,
        stock: 4,
        category: "WINDOW_AC",
        subcategory: "cool_plus_heat",
        btu: 23500,
        voltage: "208/230V / 20 Amp",
        coverage: "Up to 1,400 sq. ft. (AHAM) • Up to 800 sq. ft. (Oahu)",
        coverageAham: "Up to 1,400 sq. ft.",
        coverageOahu: "Up to 800 sq. ft.",
        minWindowHeight: '19"',
        minWindowWidth: '29"',
        maxWindowWidth: '41"',
        chassisType: "Slide In-Out",
        netWeight: "136 lbs",
        noise_level: "47 / 60 dB",
        dehumidification: "6.5 Pts/Hr",
        idealFor: "Great Room / Whole Floor • Cool + Heat",
        plugType: "208/230V 20A (NEMA 6-20P)",
        hecoMonthly: "~$84 / mo",
        rebateAmount: 0,
        badge: "23.5k In-Stock Flagship",
        image_url: "/assets/window-unit-images/lg-units/lg-cool-and-heat-unit-photos-1600x1000/lg-cool-and-heat-front-1600x1000.webp"
    },
    {
        id: 11,
        slug: "11-lg-standard-8-000-btu-lw8024rd",
        name: "LG Standard 8,000 BTU (LW8024RD)",
        modelNumber: "LW8024RD",
        price: 395,
        promo_price: null,
        stock: 30,
        category: "WINDOW_AC",
        subcategory: "standard_universal",
        btu: 8000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 350 sq. ft. (AHAM) • Up to 260 sq. ft. (Oahu)",
        coverageAham: "Up to 350 sq. ft.",
        coverageOahu: "Up to 260 sq. ft.",
        minWindowHeight: '13"',
        minWindowWidth: '22"',
        maxWindowWidth: '36"',
        chassisType: "Top-Down Fixed",
        netWeight: "58 lbs",
        noise_level: "52 / 58 dB",
        dehumidification: "2.2 Pts/Hr",
        idealFor: "Bedroom / Rental / Budget Cooling",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$45 / mo",
        rebateAmount: 0,
        badge: "$395 Waipahu Value Pick",
        image_url: "/assets/window-unit-images/lg-units/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-front-1600x1000.webp"
    },
    {
        id: 12,
        slug: "12-lg-casement-12-000-btu-lw1217ersm1",
        name: "LG Casement 12,000 BTU (LW1217ERSM1)",
        modelNumber: "LW1217ERSM1",
        price: 625,
        promo_price: null,
        stock: 15,
        category: "WINDOW_AC",
        subcategory: "casement_slider",
        btu: 12000,
        voltage: "115V / 15 Amp",
        coverage: "Up to 550 sq. ft. (AHAM) • Up to 380 sq. ft. (Oahu)",
        coverageAham: "Up to 550 sq. ft.",
        coverageOahu: "Up to 380 sq. ft.",
        minWindowHeight: '21"',
        minWindowWidth: '15.5"',
        maxWindowWidth: '16.25"',
        chassisType: "Vertical Casement",
        netWeight: "78 lbs",
        noise_level: "52 / 58 dB",
        dehumidification: "3.3 Pts/Hr",
        idealFor: "Narrow Horizontal Sliders & Casements",
        plugType: "Standard 115V (NEMA 5-15P)",
        hecoMonthly: "~$54 / mo",
        rebateAmount: 0,
        badge: "Narrow Slider & Casement Fit",
        image_url: "/assets/window-unit-images/lg-units/lg-casement-unit-photos-1600x1000/lg-casement-front-1600x1000.webp"
    }
];

export function WarehouseInventoryGrid() {
    const { addToCart, openCart } = useCart();
    const [activeTab, setActiveTab] = useState<'all' | '115v' | '230v' | 'bedroom' | 'living'>('all');
    const [addedId, setAddedId] = useState<number | null>(null);
    const [inventory, setInventory] = useState<WarehouseProduct[]>(WAREHOUSE_INVENTORY);
    const isPromo = isCampaignActive();

    React.useEffect(() => {
        let isMounted = true;
        async function fetchLiveWarehouseStock() {
            try {
                const res = await fetch('/api/v1/products', { cache: 'no-store' });
                if (!res.ok) return;
                const liveProducts: Product[] = await res.json();
                if (!isMounted || !Array.isArray(liveProducts)) return;
                const liveMap = new Map(liveProducts.map((p) => [p.id, p]));
                setInventory(
                    WAREHOUSE_INVENTORY.map((fallback) => {
                        const live = liveMap.get(fallback.id);
                        if (!live) return fallback;
                        return {
                            ...fallback,
                            stock: live.stock,
                            price: live.price,
                            promo_price: live.promo_price ?? null,
                            coverage: live.coverage || fallback.coverage,
                            coverageAham: live.coverage_aham || fallback.coverageAham,
                            coverageOahu: live.coverage_oahu || fallback.coverageOahu,
                            noise_level: live.noise_level || fallback.noise_level,
                            dehumidification: live.dehumidification || fallback.dehumidification
                        };
                    })
                );
            } catch (err) {
                console.error('Failed to sync warehouse inventory:', err);
            }
        }
        fetchLiveWarehouseStock();
        return () => {
            isMounted = false;
        };
    }, []);

    const filtered = inventory
        .filter(item => {
            if (activeTab === '115v') return item.voltage?.includes('115V');
            if (activeTab === '230v') return item.voltage?.includes('230V');
            if (activeTab === 'bedroom') return (item.btu || 0) <= 10000;
            if (activeTab === 'living') return (item.btu || 0) >= 12000;
            return true;
        })
        .sort((a, b) => {
            const aInStock = a.stock > 0 ? 0 : 1;
            const bInStock = b.stock > 0 ? 0 : 1;
            if (aInStock !== bInStock) return aInStock - bInStock;
            return (a.btu || 0) - (b.btu || 0);
        });

    const handleAddToCart = (product: WarehouseProduct) => {
        if (product.stock <= 0) return;
        const activePrice = (isPromo && product.promo_price) ? product.promo_price : product.price;
        trackFunnelEvent('add_to_cart_warehouse', {
            product_id: product.id,
            model: product.modelNumber,
            btu: product.btu,
            price: activePrice,
            location: 'oahu-window-ac-warehouse'
        });

        addToCart({
            id: product.id,
            name: product.name,
            price: activePrice,
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
            {/* Filter Tabs - Mobile Horizontal Scroll Track & Desktop Centered */}
            <div className="w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 px-2 scrollbar-none snap-x sm:justify-center">
                    {[
                        { id: 'all', label: 'All Warehouse Units' },
                        { id: 'bedroom', label: 'Bedrooms & Offices (6k–10k)' },
                        { id: 'living', label: 'Living Rooms (12k–23.5k)' },
                        { id: '115v', label: 'Standard 115V Outlets' },
                        { id: '230v', label: 'Heavy Duty 230V' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all snap-start shrink-0 flex items-center justify-center ${
                                activeTab === tab.id
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => {
                    const price = (isPromo && product.promo_price) ? product.promo_price : product.price;
                    const netAfterRebate = price - product.rebateAmount;
                    const isOutOfStock = product.stock <= 0;

                    return (
                        <div
                            key={product.id}
                            className="flex flex-col bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl relative group"
                        >
                            {/* Product Card Top Badges */}
                            <div className="p-4 pb-2 flex items-center justify-between gap-2">
                                {isOutOfStock ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                                        <Warehouse className="w-3 h-3" />
                                        Out of Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <Warehouse className="w-3 h-3" />
                                        Waipahu: {product.stock} In Stock
                                    </span>
                                )}
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
                                        unoptimized
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

                            {/* Dual Sizing & Spatial Fit Specs Matrix */}
                            <div className="px-5 py-3 mx-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
                                {/* Dual Coverage Header */}
                                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800/70">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Maximize2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span className="text-[11px] font-semibold">Dual Sizing:</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-bold text-emerald-400">
                                            {product.coverageAham || product.coverage} <span className="text-[9px] font-normal text-slate-400">(AHAM)</span>
                                        </div>
                                        <div className="text-[10px] text-amber-300 font-semibold">
                                            {product.coverageOahu || 'Calibrated'} <span className="text-[9px] font-normal text-slate-400">(Island Standard)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Caliper Opening & Electrical Grid */}
                                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                                    <div className="flex items-center gap-1.5">
                                        <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                        <span>Min Fit: <strong className="text-white">{product.minWindowHeight || '16"'} H</strong></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span>{product.voltage?.split('/')[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>{product.noise_level}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] uppercase font-bold text-slate-400">HECO:</span>
                                        <span className="text-emerald-300 font-semibold">{product.hecoMonthly}</span>
                                    </div>
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
                                        {product.rebateAmount > 0 ? (
                                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-0.5">
                                                <Sparkles className="w-3 h-3" />
                                                <span>-${product.rebateAmount} Hawaii Energy Rebate</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mt-0.5">
                                                <span>Waipahu Warehouse Direct Pricing</span>
                                            </div>
                                        )}
                                    </div>

                                    {product.rebateAmount > 0 && (
                                        <div className="text-right">
                                            <div className="text-[10px] uppercase font-bold text-slate-400">Net Cost</div>
                                            <div className="text-base font-black text-emerald-300 font-mono">
                                                ${netAfterRebate}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Pickup & Delivery Fulfillment */}
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
                                        disabled={isOutOfStock}
                                        onClick={() => handleAddToCart(product)}
                                        className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                                            isOutOfStock
                                                ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50'
                                                : 'bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 shadow-md shadow-emerald-500/20'
                                        }`}
                                    >
                                        {isOutOfStock ? (
                                            <span>Out of Stock</span>
                                        ) : addedId === product.id ? (
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
                                        <span>📐 3D Fit, Sizing & Factory Specs</span>
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
