'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Sparkles, 
    Zap, 
    Shield, 
    Check, 
    ArrowRight, 
    ShoppingCart, 
    FileText, 
    Warehouse, 
    Truck, 
    Wrench, 
    ChevronDown, 
    HelpCircle, 
    Info, 
    Wind,
    DollarSign,
    CheckCircle2,
    Layers,
    Clock,
    Phone
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';
import { isCampaignActive } from '@/lib/utils';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const INITIAL_UNIT_18K: Product = {
    id: 6,
    name: "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
    price: 925,
    promo_price: null,
    stock: 5,
    category: "WINDOW_AC",
    subcategory: "dual_inverter",
    btu: 18000,
    voltage: "208/230V / 15 Amp",
    coverage: "Up to 1,000 sq. ft. AHAM (Up to 600 sq. ft. Oahu)",
    noise_level: "44 / 59 dB",
    dehumidification: "4.2 Pts/Hr",
    performance_specs: "500 CFM High-Velocity • 14.7 CEER • Dual Inverter",
    key_spec: "LW1822IVSM",
    dimensions: '17.7" H x 26.0" W x 30.7" D',
    weight: "112 lbs",
    warranty: "1 YEAR LIMITED",
    image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
};

const INITIAL_UNIT_23K: Product = {
    id: 7,
    name: "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
    price: 1025,
    promo_price: null,
    stock: 15,
    category: "WINDOW_AC",
    subcategory: "dual_inverter",
    btu: 23500,
    voltage: "208/230V / 15 Amp",
    coverage: "Up to 1,440 sq. ft. AHAM (Up to 800 sq. ft. Oahu)",
    noise_level: "53 / 62 dB",
    dehumidification: "5.6 Pts/Hr",
    performance_specs: "Flagship 23,500 BTU • 14.5 CEER • 5.6 Pts/Hr Extraction",
    key_spec: "LW2422IVSM",
    dimensions: '17.7" H x 26.0" W x 30.7" D',
    weight: "112 lbs",
    warranty: "1 YEAR LIMITED",
    image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
};

export default function LargeRoomWindowAcPage() {
    const { addToCart, openCart } = useCart();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<'18k' | '23k'>('18k');
    const [unit18k, setUnit18k] = useState<Product>(INITIAL_UNIT_18K);
    const [unit23k, setUnit23k] = useState<Product>(INITIAL_UNIT_23K);
    const isPromo = isCampaignActive();

    useEffect(() => {
        let isMounted = true;
        fetch('/api/v1/products', { cache: 'no-store' })
            .then((res) => (res.ok ? res.json() : null))
            .then((liveProducts: Product[] | null) => {
                if (!isMounted || !Array.isArray(liveProducts)) return;
                const live18 = liveProducts.find((p) => p.id === 6);
                const live23 = liveProducts.find((p) => p.id === 7);
                if (live18) {
                    setUnit18k((prev) => ({
                        ...prev,
                        price: live18.price,
                        promo_price: live18.promo_price ?? prev.promo_price,
                        stock: live18.stock,
                    }));
                }
                if (live23) {
                    setUnit23k((prev) => ({
                        ...prev,
                        price: live23.price,
                        promo_price: live23.promo_price ?? prev.promo_price,
                        stock: live23.stock,
                    }));
                }
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, []);

    const activeUnit = selectedUnit === '18k' ? unit18k : unit23k;
    const activePrice = (isPromo && activeUnit.promo_price) ? activeUnit.promo_price : activeUnit.price;
    const isOutOfStock = activeUnit.stock <= 0;

    const handleBuyNow = (product: Product) => {
        if (product.stock <= 0) return;
        const pPrice = (isPromo && product.promo_price) ? product.promo_price : product.price;
        trackFunnelEvent('add_to_cart_high_capacity', {
            product_id: product.id,
            product_name: product.name,
            price: pPrice,
            btu: product.btu
        });
        addToCart({
            ...product,
            price: pPrice,
        });
        openCart();
    };

    const faqItems = [
        {
            q: "How does installing an 18k or 23.5k window AC save $4,000–$6,000 vs a mini-split?",
            a: "A multi-zone 18k to 24k ductless mini-split system on Oahu typically costs $5,500 to $8,500 installed, requiring high-voltage electrical line pulls, wall penetrations, and refrigerant line brazing. An in-stock LG Dual Inverter 18k ($925) or 23.5k ($1,025) delivers equal or greater cooling volume with 500 CFM air throw, cooling entire living areas and high-ceiling spaces at a fraction of the cost."
        },
        {
            q: "What type of electrical outlet do the 18,000 and 23,500 BTU units require?",
            a: "Both the 18k (LW1822IVSM) and 23.5k (LW2422IVSM) Dual Inverter units operate on a dedicated 208/230V 15-Amp circuit using a NEMA 6-15P tandem plug (and are also compatible with 208/230V 20-Amp NEMA 6-20R receptacles). If you need confirmation, review our visual 115V vs 230V Plug Guide or our technicians can assess it on-site."
        },
        {
            q: "Do large 112 lb window units require an exterior support bracket?",
            a: "Yes, for 112 lb Slide In-Out chassis units, a heavy-duty exterior support bracket is strongly recommended to relieve structural load from your window sill and framing. Our CT-36775 licensed technicians evaluate your wall construction on-site during installation ($0 upfront booking deposit)."
        },
        {
            q: "How fast can I get one of these units on Oahu?",
            a: "Our 18,000 BTU and 23,500 BTU models are in stock now at our Waipahu Central Warehouse (94-150 Leoleo St. #203). You can select Free Waipahu Warehouse Pickup (by appointment, subject to scheduling & inventory availability) OR $50 Flat Delivery across Honolulu, Metro, Central, Windward, and West Oahu."
        },
        {
            q: "Do these high-capacity models qualify for the Hawaii Energy cash rebate?",
            a: "Yes! Both ENERGY STAR® rated LG Dual Inverters qualify for the official $45 Hawaii Energy cash rebate. Every purchase includes our pre-approved official Hawaii Energy application form PDF ready to submit."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - High-Capacity Window AC Sales Oahu",
                "telephone": "+1-808-488-1111",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leoleo St. #203",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "In-stock 18,000 BTU and 23,500 BTU LG Dual Inverter window air conditioners in Waipahu, Oahu. Heavy-duty living room and whole-floor cooling with $45 Hawaii Energy cash rebates."
            },
            {
                "@type": "Product",
                "name": "LG Dual Inverter 18,000 BTU Window Air Conditioner (LW1822IVSM)",
                "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                "description": "High-capacity 18,000 BTU Dual Inverter window AC for large rooms and open-concept layouts. 208/230V NEMA 6-15P. $45 Hawaii Energy Rebate eligible.",
                "brand": { "@type": "Brand", "name": "LG" },
                "sku": "LW1822IVSM",
                "mpn": "LW1822IVSM",
                "gtin12": "048231605908",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "92",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "offers": {
                    "@type": "Offer",
                    "url": "https://www.affordablehome-ac.com/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm",
                    "priceCurrency": "USD",
                    "price": ((isPromo && unit18k.promo_price) ? unit18k.promo_price : unit18k.price).toFixed(2),
                    "priceValidUntil": "2026-12-31",
                    "availability": unit18k.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                    "itemCondition": "https://schema.org/NewCondition"
                }
            },
            {
                "@type": "Product",
                "name": "LG Dual Inverter 23,500 BTU Window Air Conditioner (LW2422IVSM)",
                "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                "description": "Titan-grade 23,500 BTU Dual Inverter window AC for whole-home open areas up to 1,440 sq ft. 208/230V NEMA 6-15P. $45 Hawaii Energy Rebate eligible.",
                "brand": { "@type": "Brand", "name": "LG" },
                "sku": "LW2422IVSM",
                "mpn": "LW2422IVSM",
                "gtin12": "048231605915",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "78",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "offers": {
                    "@type": "Offer",
                    "url": "https://www.affordablehome-ac.com/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm",
                    "priceCurrency": "USD",
                    "price": ((isPromo && unit23k.promo_price) ? unit23k.promo_price : unit23k.price).toFixed(2),
                    "priceValidUntil": "2026-12-31",
                    "availability": unit23k.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                    "itemCondition": "https://schema.org/NewCondition"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.affordablehome-ac.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Shop",
                        "item": "https://www.affordablehome-ac.com/shop"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Large Room Window AC Oahu",
                        "item": "https://www.affordablehome-ac.com/shop/large-room-window-ac-oahu"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqItems.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] md:pt-[150px] pb-24">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Warehouse className="size-3.5" />
                        {unit18k.stock + unit23k.stock} High-Capacity Units In Stock &bull; Waipahu Warehouse
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Large Room <span className="text-primary">Window AC</span> Oahu
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        18,000 BTU &amp; 23,500 BTU LG Dual Inverters &bull; Open-Concept Power
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Cool open living rooms, vaulted ceilings, and whole floorplans without spending $6,000+ on a ductless mini-split. In-stock for free Waipahu warehouse pickup by appointment or $50 island delivery. Includes pre-approved $45 Hawaii Energy cash rebate PDF.
                    </p>
                </div>

                {/* ROI Highlight Card: Window AC vs Mini Split */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-950 border border-cyan-500/20 shadow-2xl mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        <div className="lg:col-span-2 space-y-3">
                            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                                <DollarSign className="size-4" /> The Oahu Open-Concept Cost Reality
                            </div>
                            <h2 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                                Why Spend $6,500+ When You Can Cool Your Living Room for $925–$1,025?
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Standard ductless mini-splits for an open floor plan cost thousands in electrical panel upgrades, line sets, and installation labor. Our heavy-duty 18,000 &amp; 23,500 BTU LG Dual Inverters pull 4.2 to 5.6 pints of moisture per hour, circulate air up to 40 feet, and slash cooling energy by up to 40% under Hawaiian Electric&apos;s ~44.2¢/kWh baseline.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-center font-mono">
                            <div className="text-xs text-slate-400 uppercase">Average Customer Savings</div>
                            <div className="text-3xl sm:text-4xl font-black text-emerald-400">$4,500+</div>
                            <div className="text-[11px] text-slate-400">Upfront Savings vs 24k Ductless Mini Split</div>
                            <div className="pt-2">
                                <Link 
                                    href="/shop/window-ac-plug-guide" 
                                    className="text-xs text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 font-sans font-medium"
                                >
                                    Check 230V Plug Compatibility <ArrowRight className="size-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Model Selector Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-2">
                        <button
                            onClick={() => setSelectedUnit('18k')}
                            className={`px-6 py-2.5 rounded-xl font-header font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                                selectedUnit === '18k'
                                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            18,000 BTU (LW1822IVSM) &bull; {unit18k.stock > 0 ? `${unit18k.stock} in Stock` : 'Sold Out'}
                        </button>
                        <button
                            onClick={() => setSelectedUnit('23k')}
                            className={`px-6 py-2.5 rounded-xl font-header font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                                selectedUnit === '23k'
                                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            23,500 BTU (LW2422IVSM) &bull; {unit23k.stock > 0 ? `${unit23k.stock} in Stock` : 'Sold Out'}
                        </button>
                    </div>
                </div>

                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
                    {/* Visual Card */}
                    <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl relative">
                        <div className="absolute top-4 left-4 z-10">
                            {isOutOfStock ? (
                                <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                                    Sold Out &bull; 18k In Stock
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                                    In Stock &bull; Waipahu Warehouse
                                </span>
                            )}
                        </div>
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                                208/230V &bull; NEMA 6-15P
                            </span>
                        </div>
                        
                        <div className="aspect-[4/3] flex items-center justify-center relative my-6">
                            <Image
                                src={activeUnit.image_url!}
                                alt={activeUnit.name}
                                width={600}
                                height={450}
                                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                                priority
                                unoptimized
                            />
                        </div>

                        {/* Specs Matrix */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <div className="text-slate-400 text-[10px] uppercase">Cooling Power</div>
                                <div className="text-white font-bold text-sm mt-0.5">{selectedUnit === '18k' ? '18,000 BTU' : '23,500 BTU'}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <div className="text-slate-400 text-[10px] uppercase">Voltage</div>
                                <div className="text-cyan-400 font-bold text-sm mt-0.5">208/230V</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <div className="text-slate-400 text-[10px] uppercase">Moisture Out</div>
                                <div className="text-white font-bold text-sm mt-0.5">{selectedUnit === '18k' ? '4.2 Pts/Hr' : '5.6 Pts/Hr'}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <div className="text-slate-400 text-[10px] uppercase">Rebate PDF</div>
                                <div className="text-emerald-400 font-bold text-sm mt-0.5">$45 Cash</div>
                            </div>
                        </div>
                    </div>

                    {/* Order & Value Column */}
                    <div className="space-y-6">
                        <div>
                            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
                                {selectedUnit === '18k' ? 'LW1822IVSM • Open Floor Plan Titan' : 'LW2422IVSM • Whole Home Titan Cooling'}
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                {activeUnit.name}
                            </h2>
                            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                {selectedUnit === '18k' 
                                    ? 'Engineered for vaulted ceilings and open living-dining areas. Maximum vertical airflow momentum eliminates hot pockets, while LG Dual Inverter technology variable compressor speed saves up to 40% on electricity.'
                                    : 'Our most powerful window AC. Delivers industrial-grade 23,500 BTU cooling and rapid moisture extraction (5.6 pts/hr) for large residential spaces, high solar-heat-load living rooms, and multi-room layouts.'
                                }
                            </p>
                        </div>

                        {/* Pricing & Promo Box */}
                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                            <div className="flex items-baseline justify-between">
                                <div>
                                    <div className="text-xs font-mono text-slate-400 uppercase">Waipahu Warehouse Direct Price</div>
                                    <div className="flex items-baseline gap-3 mt-1">
                                        <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                                            ${activePrice}
                                        </span>
                                        {isPromo && activeUnit.promo_price && activeUnit.price > activeUnit.promo_price && (
                                            <span className="text-sm font-mono line-through text-slate-500">
                                                ${activeUnit.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={`text-right font-mono text-xs ${isOutOfStock ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    <span className="block font-bold">{isOutOfStock ? 'Currently Sold Out' : `In Stock (${activeUnit.stock} Available)`}</span>
                                    <span className="text-slate-400 text-[11px]">{isOutOfStock ? '18,000 BTU In Stock Now' : 'Ready for Pickup/Delivery'}</span>
                                </div>
                            </div>

                            {/* Hawaii Energy Rebate Callout */}
                            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                    <div className="text-xs text-emerald-200">
                                        <strong>$45 Hawaii Energy Cash Rebate</strong> applies to this Energy Star model.
                                    </div>
                                </div>
                                <a 
                                    href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-mono text-emerald-400 underline shrink-0 hover:text-emerald-300 ml-2"
                                >
                                    View PDF
                                </a>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2">
                                {isOutOfStock ? (
                                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                                        <div className="text-xs font-mono font-bold text-amber-300 uppercase">
                                            ⚡ Temporarily Sold Out — Pick Up an In-Stock Heavy-Duty Unit Today:
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            <button
                                                onClick={() => setSelectedUnit('18k')}
                                                className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all"
                                            >
                                                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{unit18k.stock} In Stock • 208/230V</div>
                                                <div className="text-xs font-bold text-white mt-0.5">LG 18,000 BTU Dual Inverter</div>
                                                <div className="text-xs font-mono text-cyan-400 font-bold mt-1">${(isPromo && unit18k.promo_price) ? unit18k.promo_price : unit18k.price} • Switch to 18k →</div>
                                            </button>
                                            <Link
                                                href="/shop/9-lg-18-000-btu-lw1823hrsm"
                                                className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-left transition-all block"
                                            >
                                                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">10 In Stock • 18,000 BTU</div>
                                                <div className="text-xs font-bold text-white mt-0.5">LG 18,000 BTU Cool+Heat Unit</div>
                                                <div className="text-xs font-mono text-cyan-400 font-bold mt-1">$925 • View Unit →</div>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleBuyNow(activeUnit)}
                                        className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.01]"
                                    >
                                        <ShoppingCart className="size-4" />
                                        Buy Now with Stripe (${activePrice})
                                    </button>
                                )}
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center text-xs font-mono">
                                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-center justify-center gap-1.5">
                                        <Warehouse className="size-3.5 text-cyan-400" />
                                        Free Waipahu Pickup (by appt)
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-center justify-center gap-1.5">
                                        <Truck className="size-3.5 text-cyan-400" />
                                        $50 Flat Island Delivery
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Optional Installation Add-On Bridge */}
                        <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-header font-bold text-xs uppercase tracking-wide text-cyan-300 flex items-center gap-1.5">
                                    <Wrench className="size-3.5" /> Need Professional Installation?
                                </span>
                                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                    $0 Upfront Deposit
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Our CT-36775 licensed technicians provide cantilever exterior bracket anchoring, laser 3/8&quot; trade-wind slope leveling, and custom window retrofits. Pay the technician only after installation is complete and cooling cold.
                            </p>
                            <Link 
                                href="/window-ac-installation"
                                className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
                            >
                                Schedule Installation Service <ArrowRight className="size-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Technical Comparison Table */}
                <div className="p-6 sm:p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl mb-20 overflow-x-auto">
                    <h3 className="text-xl font-header font-black uppercase text-white mb-6">
                        High-Capacity LG Dual Inverter Specifications
                    </h3>
                    <table className="w-full text-left text-xs font-mono border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase">
                                <th className="py-3 px-4">Feature / Specification</th>
                                <th className="py-3 px-4 text-cyan-400">18,000 BTU (LW1822IVSM)</th>
                                <th className="py-3 px-4 text-cyan-400">23,500 BTU (LW2422IVSM)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Cooling Square Footage</td>
                                <td className="py-3 px-4">Up to 1,000 sq. ft. (600 sq. ft. Oahu)</td>
                                <td className="py-3 px-4">Up to 1,440 sq. ft. (800 sq. ft. Oahu)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Electrical Circuit</td>
                                <td className="py-3 px-4 text-emerald-400">208/230V / 15 Amp (NEMA 6-15P)</td>
                                <td className="py-3 px-4 text-emerald-400">208/230V / 15 Amp (NEMA 6-15P)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Dehumidification Capacity</td>
                                <td className="py-3 px-4">4.2 Pints / Hour</td>
                                <td className="py-3 px-4">5.6 Pints / Hour</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Unit Weight</td>
                                <td className="py-3 px-4">112 lbs</td>
                                <td className="py-3 px-4">112 lbs</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Smart WiFi Control</td>
                                <td className="py-3 px-4">LG ThinQ® &amp; Voice Compatible</td>
                                <td className="py-3 px-4">LG ThinQ® &amp; Voice Compatible</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Hawaii Energy Cash Rebate</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">$45 Instant / Mail-In</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">$45 Instant / Mail-In</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Waipahu Warehouse Stock</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">{unit18k.stock > 0 ? `${unit18k.stock} Units Available` : 'Sold Out'}</td>
                                <td className={`py-3 px-4 font-bold ${unit23k.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{unit23k.stock > 0 ? `${unit23k.stock} Units Available` : 'Sold Out (18k In Stock)'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">Everything you need to know about heavy-duty Oahu window ACs</p>
                    </div>
                    {faqItems.map((faq, index) => (
                        <div 
                            key={index}
                            className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-cyan-400 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === index ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                            </button>
                            {activeFaq === index && (
                                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Trust & Dispatch Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 text-center space-y-4">
                    <h4 className="text-xl font-header font-black uppercase text-white">
                        Ready for Heavy-Duty Cooling in Your Oahu Home?
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Pick up your unit today at our Waipahu warehouse (by appointment) or have it delivered across Honolulu, Metro, Central, Windward, and West Oahu for $50 flat.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <button
                            onClick={() => handleBuyNow(unit18k)}
                            className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                        >
                            Order In-Stock 18,000 BTU (${(isPromo && unit18k.promo_price) ? unit18k.promo_price : unit18k.price})
                        </button>
                        <a 
                            href="tel:808-488-1111"
                            className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Phone className="size-3.5 text-cyan-400" />
                            Call Warehouse: (808) 488-1111
                        </a>
                    </div>
                </div>
                            <WindowAcQuickShop
                    modelIds={[6, 7, 5, 4]}
                    title="In-Stock High-Capacity Window ACs (12,000 – 23,500 BTU)"
                    subheading="Heavy-duty LG Dual Inverter units in stock at our Waipahu warehouse. Order online for free Waipahu pickup or $50 flat Oahu delivery."
                />
            </main>
            <BackToTop />
        </div>
    );
}
