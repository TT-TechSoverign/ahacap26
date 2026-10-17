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
    VolumeX, 
    Wifi, 
    DollarSign,
    CheckCircle2,
    Clock,
    Phone,
    ThermometerSnowflake,
    Moon
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';
import { isCampaignActive } from '@/lib/utils';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const INITIAL_PRODUCT_8K: Product = {
    id: 2,
    name: "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
    price: 595,
    promo_price: 535,
    discount_percent: 10,
    stock: 0,
    category: "WINDOW_AC",
    subcategory: "dual_inverter",
    btu: 8000,
    voltage: "115V / 15 Amp",
    coverage: "Up to 350 sq. ft. AHAM (Up to 280 sq. ft. Oahu)",
    noise_level: "44 / 54 dB",
    dehumidification: "2.5 Pts/Hr",
    performance_specs: "15.5 CEER • ThinQ® Smart WiFi • 44dB Sleep Mode",
    key_spec: "LW8022IVSM",
    dimensions: '12.5" H x 19.6" W x 24.5" D',
    weight: "58 lbs",
    warranty: "1 YEAR LIMITED",
    image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
};

export default function Lg8000BtuOahuPage() {
    const { addToCart, openCart } = useCart();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [product8k, setProduct8k] = useState<Product>(INITIAL_PRODUCT_8K);
    const isPromo = isCampaignActive();

    useEffect(() => {
        let isMounted = true;
        fetch('/api/v1/products/2', { cache: 'no-store' })
            .then((res) => (res.ok ? res.json() : null))
            .then((live: Product | null) => {
                if (!isMounted || !live || !live.id) return;
                setProduct8k((prev) => ({
                    ...prev,
                    price: live.price,
                    promo_price: live.promo_price ?? prev.promo_price,
                    stock: live.stock,
                }));
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, []);

    const activePrice = (isPromo && product8k.promo_price) ? product8k.promo_price : product8k.price;
    const isOutOfStock = product8k.stock <= 0;

    const handleBuyNow = () => {
        if (isOutOfStock) return;
        trackFunnelEvent('add_to_cart_8k_upgrade', {
            product_id: product8k.id,
            product_name: product8k.name,
            price: activePrice,
            btu: product8k.btu
        });
        addToCart({
            ...product8k,
            price: activePrice,
        });
        openCart();
    };

    const faqItems = [
        {
            q: "Why is the 8,000 BTU model the best value compared to the 6,000 BTU unit?",
            a: "The 8,000 BTU model (LW8022IVSM) costs just $35 more than the 6,000 BTU model ($595 vs $560), while providing +33% more cooling capacity (up to 350 sq. ft.) and nearly double the moisture removal (2.5 Pts/Hr vs 1.4 Pts/Hr) with the same 15.5 CEER efficiency and 44 dB sleep mode."
        },
        {
            q: "How quiet is the LG Dual Inverter 8,000 BTU in a bedroom?",
            a: "Running in Sleep Mode, it produces just 44 dB of sound—equivalent to the quiet hum of a public library. Traditional rotary window ACs run at 54–60 dB and cycle on and off abruptly with loud clicks. The LG Dual Inverter compressor runs continuously at variable low speeds, delivering uninterrupted sleep in Hawaii's warm trade-wind nights."
        },
        {
            q: "What are the electrical requirements for this unit?",
            a: "The LW8022IVSM operates on standard residential 115-Volt power (15-Amp circuit) using a standard 3-prong NEMA 5-15P plug found in virtually all Oahu homes. No special high-voltage wiring or electrical panel upgrades required."
        },
        {
            q: "How does the $45 Hawaii Energy cash rebate work?",
            a: "Because this unit is ENERGY STAR® certified, it qualifies for a $45 cash rebate from Hawaii Energy. Affordable Home AC provides you with our official pre-approved rebate application form PDF. After purchase, you simply submit the form with your receipt to receive your $45 check, bringing your effective unit cost down to just $550."
        },
        {
            q: "What if the 8,000 BTU Dual Inverter is temporarily out of stock?",
            a: "When the 8,000 BTU Dual Inverter is sold out, Oahu homeowners can pick up the in-stock 10,000 BTU LG Dual Inverter (LW1022IVSM, $650), the 6,000 BTU LG Dual Inverter (LW6023IVSM, $560), or the 8,000 BTU LG Cool+Heat Inverter (LW8023HRSM, $650) or 8,000 BTU LG Standard (LW8024RD, $395) today at our Waipahu warehouse!"
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - LG Dual Inverter 8,000 BTU Oahu",
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
                "description": "LG Dual Inverter 8,000 BTU window AC in Waipahu, Oahu. Library-quiet 44dB operation, ThinQ WiFi, standard 115V plug, and official $45 Hawaii Energy cash rebate."
            },
            {
                "@type": "Product",
                "name": "LG Dual Inverter 8,000 BTU Window Air Conditioner (LW8022IVSM)",
                "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                "description": "Ultra-quiet 8,000 BTU Dual Inverter window air conditioner with smart ThinQ WiFi control. Perfect for Oahu master bedrooms and home offices. Eligible for $45 Hawaii Energy cash rebate.",
                "brand": { "@type": "Brand", "name": "LG" },
                "sku": "LW8022IVSM",
                "mpn": "LW8022IVSM",
                "gtin12": "048231605861",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "84",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "offers": {
                    "@type": "Offer",
                    "url": "https://www.affordablehome-ac.com/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm",
                    "priceCurrency": "USD",
                    "price": activePrice.toFixed(2),
                    "priceValidUntil": "2026-12-31",
                    "availability": isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
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
                        "name": "LG 8,000 BTU Dual Inverter",
                        "item": "https://www.affordablehome-ac.com/shop/lg-dual-inverter-8000-btu-oahu"
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
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Warehouse className="size-3.5" />
                        {isOutOfStock ? 'High Demand Model • View In-Stock 8k & 10k Units Below' : `Waipahu Warehouse In Stock • ${product8k.stock} Units Ready`}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        LG <span className="text-primary">8,000 BTU</span> Dual Inverter Oahu
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        The Master Bedroom Sweet Spot &bull; LW8022IVSM
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Library-quiet 44 dB sleep cooling, ThinQ® Smart WiFi remote control, and up to 40% energy savings under Hawaiian Electric rates. Standard 115V wall plug. Qualifying $45 Hawaii Energy cash rebate PDF included.
                    </p>
                </div>

                {/* The $35 Upgrade Anchor Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900/70 to-slate-950 border border-emerald-500/30 shadow-2xl mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        <div className="lg:col-span-2 space-y-2">
                            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                                <Sparkles className="size-4" /> The $35 Smart Sizing Advantage
                            </div>
                            <h2 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                                Why Oahu Homeowners Upgrade from 6k to 8k or 10k
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                For just <strong>$35 more</strong> than the 6,000 BTU model ($595 vs $560), the 8,000 BTU unit gives you <strong>+33% more cooling capacity</strong> and built-in <strong>LG ThinQ® Smart WiFi</strong>. Pre-cool your bedroom from your smartphone on the H-1 drive home so your room is ice-cold when you walk through the door.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 text-center font-mono space-y-1.5">
                            <div className="text-xs text-slate-400 uppercase">Upgrade Difference</div>
                            <div className="text-3xl sm:text-4xl font-black text-emerald-400">+$35.00</div>
                            <div className="text-[11px] text-slate-300">+2,000 BTU &bull; Smart WiFi Added</div>
                            <div className="text-[11px] text-emerald-400 font-bold">Effective Net Cost: ${activePrice - 45} (after $45 rebate)</div>
                        </div>
                    </div>
                </div>

                {/* Product Detail Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
                    {/* Visual Card */}
                    <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl relative">
                        <div className="absolute top-4 left-4 z-10">
                            {isOutOfStock ? (
                                <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                                    Sold Out &bull; Alternatives Ready
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                                    In Stock &bull; Waipahu Warehouse
                                </span>
                            )}
                        </div>
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                                Standard 115V / 15A Plug
                            </span>
                        </div>

                        <div className="aspect-[4/3] flex items-center justify-center relative my-6">
                            <Image
                                src={product8k.image_url!}
                                alt={product8k.name}
                                width={580}
                                height={420}
                                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                                priority
                                unoptimized
                            />
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <VolumeX className="size-4 mx-auto text-cyan-400 mb-1" />
                                <div className="text-slate-400 text-[10px] uppercase">Quiet Sleep</div>
                                <div className="text-white font-bold text-sm">44 dB</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <Wifi className="size-4 mx-auto text-cyan-400 mb-1" />
                                <div className="text-slate-400 text-[10px] uppercase">Smart Control</div>
                                <div className="text-white font-bold text-sm">ThinQ® App</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <Zap className="size-4 mx-auto text-cyan-400 mb-1" />
                                <div className="text-slate-400 text-[10px] uppercase">Energy Savings</div>
                                <div className="text-emerald-400 font-bold text-sm">Up to 40%</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                <DollarSign className="size-4 mx-auto text-emerald-400 mb-1" />
                                <div className="text-slate-400 text-[10px] uppercase">Cash Rebate</div>
                                <div className="text-emerald-400 font-bold text-sm">$45 Cash</div>
                            </div>
                        </div>
                    </div>

                    {/* Order Column */}
                    <div className="space-y-6">
                        <div>
                            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
                                Model LW8022IVSM &bull; ENERGY STAR® Most Efficient
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                {product8k.name}
                            </h2>
                            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                Specifically designed for bedroom comfort in Oahu homes. The Dual Inverter compressor modulates speed continuously rather than cycling on and off, preventing room temperature swings and eliminating the loud compressor clanks that wake light sleepers.
                            </p>
                        </div>

                        {/* Pricing Box */}
                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                            <div className="flex items-baseline justify-between">
                                <div>
                                    <div className="text-xs font-mono text-slate-400 uppercase">Waipahu Warehouse Direct Price</div>
                                    <div className="flex items-baseline gap-3 mt-1">
                                        <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                                            ${activePrice}
                                        </span>
                                        {isPromo && product8k.promo_price && product8k.price > product8k.promo_price && (
                                            <span className="text-sm font-mono line-through text-slate-500">
                                                ${product8k.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={`text-right font-mono text-xs ${isOutOfStock ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    <span className="block font-bold">{isOutOfStock ? 'Currently Sold Out' : `In Stock (${product8k.stock} Units Available)`}</span>
                                    <span className="text-slate-400 text-[11px]">{isOutOfStock ? 'See In-Stock Options Below' : 'Ready for Pickup/Delivery'}</span>
                                </div>
                            </div>

                            {/* Hawaii Energy Cash Rebate Callout */}
                            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                    <div className="text-xs text-emerald-200">
                                        <strong>$45 Hawaii Energy Cash Rebate</strong> eligible. Net price: <strong>${activePrice - 45}</strong>.
                                    </div>
                                </div>
                                <a 
                                    href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-mono text-emerald-400 underline shrink-0 hover:text-emerald-300 ml-2"
                                >
                                    Download PDF
                                </a>
                            </div>

                            {/* Buy Now Button or In-Stock Rescue Alternatives */}
                            <div className="space-y-3 pt-2">
                                {isOutOfStock ? (
                                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                                        <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                                            ⚡ LW8022IVSM Sold Out — Pick Up an In-Stock Bedroom Unit Today:
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            <Link
                                                href="/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                                                className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all block"
                                            >
                                                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">15 In Stock • 44dB Quiet</div>
                                                <div className="text-xs font-bold text-white mt-0.5">LG 10,000 BTU Dual Inverter</div>
                                                <div className="text-xs font-mono text-cyan-400 font-bold mt-1">$650 • View Unit →</div>
                                            </Link>
                                            <Link
                                                href="/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm"
                                                className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-left transition-all block"
                                            >
                                                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">30 In Stock • 44dB Quiet</div>
                                                <div className="text-xs font-bold text-white mt-0.5">LG 6,000 BTU Dual Inverter</div>
                                                <div className="text-xs font-mono text-cyan-400 font-bold mt-1">$560 • View Unit →</div>
                                            </Link>
                                            <Link
                                                href="/shop/8-lg-7-600-btu-lw8023hrsm"
                                                className="p-3 rounded-xl bg-slate-900/90 border border-white/15 hover:border-cyan-400 text-left transition-all block"
                                            >
                                                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">8 In Stock • 8,000 BTU</div>
                                                <div className="text-xs font-bold text-white mt-0.5">LG 8,000 BTU Dual Inverter + Heat</div>
                                                <div className="text-xs font-mono text-cyan-400 font-bold mt-1">$650 • View Unit →</div>
                                            </Link>
                                            <Link
                                                href="/shop/11-lg-8-000-btu-lw8024rd"
                                                className="p-3 rounded-xl bg-slate-900/90 border border-white/15 hover:border-cyan-400 text-left transition-all block"
                                            >
                                                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">30 In Stock • 8,000 BTU</div>
                                                <div className="text-xs font-bold text-white mt-0.5">LG 8,000 BTU Standard 115V</div>
                                                <div className="text-xs font-mono text-cyan-400 font-bold mt-1">$395 • View Unit →</div>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleBuyNow}
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

                        {/* Optional Installation Add-On */}
                        <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-header font-bold text-xs uppercase tracking-wide text-cyan-300 flex items-center gap-1.5">
                                    <Wrench className="size-3.5" /> Professional Oahu Installation Available
                                </span>
                                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                    $0 Upfront Deposit
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Professional jalousie window retrofit, laser 3/8&quot; pitch leveling, and weather sealing by licensed CT-36775 technicians. Pay only after installation is complete.
                            </p>
                            <Link 
                                href="/window-ac-installation"
                                className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
                            >
                                Book Installation Appointment <ArrowRight className="size-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 6k vs 8k Value Breakdown */}
                <div className="p-6 sm:p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl mb-20 overflow-x-auto">
                    <h3 className="text-xl font-header font-black uppercase text-white mb-4">
                        Comparison: LG 6,000 BTU vs LG 8,000 BTU vs LG 10,000 BTU
                    </h3>
                    <table className="w-full text-left text-xs font-mono border-collapse min-w-[550px]">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase">
                                <th className="py-3 px-4">Feature</th>
                                <th className="py-3 px-4">6,000 BTU (LW6023IVSM)</th>
                                <th className="py-3 px-4 text-emerald-400">8,000 BTU (LW8022IVSM)</th>
                                <th className="py-3 px-4 text-cyan-400">10,000 BTU (LW1022IVSM) ★ IN STOCK</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Waipahu Direct Price</td>
                                <td className="py-3 px-4">$560.00</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">$595.00 (+$35 diff)</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">$650.00</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Cooling Area (AHAM / Oahu)</td>
                                <td className="py-3 px-4">Up to 260 / 220 sq. ft.</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">Up to 350 / 280 sq. ft.</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">Up to 450 / 330 sq. ft.</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Moisture Removal</td>
                                <td className="py-3 px-4">1.4 Pts/Hr</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">2.5 Pts/Hr</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">2.9 Pts/Hr</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Smart WiFi Remote Control</td>
                                <td className="py-3 px-4">Yes (LG ThinQ® App)</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">Yes (LG ThinQ® &amp; Alexa/Google)</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">Yes (LG ThinQ® &amp; Alexa/Google)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Sleep Mode Noise / CEER</td>
                                <td className="py-3 px-4">44 / 54 dB • 15.5 CEER</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">44 / 54 dB • 15.5 CEER</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">44 / 58 dB • 15.5 CEER</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Electrical Plug</td>
                                <td className="py-3 px-4">115V / 15A Standard</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">115V / 15A Standard</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">115V / 15A Standard</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Hawaii Energy Rebate</td>
                                <td className="py-3 px-4 text-emerald-400">$45 Cash Rebate</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">$45 Cash Rebate</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">$45 Cash Rebate</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Net Cost After Rebate</td>
                                <td className="py-3 px-4">$515.00</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">$550.00</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">$605.00</td>
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
                        <p className="text-slate-400 text-xs mt-1">Everything about the LG 8,000 BTU Dual Inverter in Oahu homes</p>
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

                {/* Bottom Order Card */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 text-center space-y-4">
                    <h4 className="text-xl font-header font-black uppercase text-white">
                        Get the Ultimate Bedroom Window AC for Your Oahu Home
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Order online with Stripe for immediate Waipahu warehouse pickup by appointment or $50 island delivery.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        {isOutOfStock ? (
                            <Link
                                href="/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                                className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                            >
                                View In-Stock 10,000 BTU Dual Inverter ($650)
                            </Link>
                        ) : (
                            <button
                                onClick={handleBuyNow}
                                className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                            >
                                Buy LG 8,000 BTU (${activePrice})
                            </button>
                        )}
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
                    modelIds={[11, 1, 8, 3]}
                    title="In-Stock 115V Bedroom & Studio Window ACs ($395–$650)"
                    subheading="Plug-and-play 115V LG Standard & Dual Inverter models in stock in Waipahu. Free warehouse pickup by appointment or $50 flat Oahu delivery."
                />
            </main>
            <BackToTop />
        </div>
    );
}
