'use client';

import { useState } from 'react';
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
    Filter,
    Layers,
    Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function LgDualInverterGuidePage() {
    const { addToCart, openCart } = useCart();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | '115v' | '230v' | 'bedroom' | 'living'>('all');

    const allModels: (Product & { idealRoom: string; plugType: string; hecoMonthly: string; specialBadge?: string })[] = [
        {
            id: 1,
            name: "LG Dual Inverter 6,000 BTU (LW6023IVSM)",
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
            idealRoom: "Small Bedroom / Office",
            plugType: "Standard 115V (NEMA 5-15P)",
            hecoMonthly: "~$32 / mo",
            image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
            specialBadge: "Entry Level Quiet"
        },
        {
            id: 2,
            name: "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
            price: 595,
            promo_price: 535,
            stock: 10,
            category: "WINDOW_AC",
            subcategory: "dual_inverter",
            btu: 8000,
            voltage: "115V / 15 Amp",
            coverage: "100–350 sq. ft.",
            noise_level: "44 / 58 dB",
            dehumidification: "2.8 Pts/Hr",
            idealRoom: "Master Bedroom / Nursery",
            plugType: "Standard 115V (NEMA 5-15P)",
            hecoMonthly: "~$38 / mo",
            image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
            specialBadge: "★ Best Value Bedroom ($31 Upgrade)"
        },
        {
            id: 4,
            name: "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
            price: 745,
            promo_price: 670,
            stock: 10,
            category: "WINDOW_AC",
            subcategory: "dual_inverter",
            btu: 12000,
            voltage: "115V / 15 Amp",
            coverage: "200–250 sq. ft.",
            noise_level: "44 / 59 dB",
            dehumidification: "3.8 Pts/Hr",
            idealRoom: "Studio / Master Suite",
            plugType: "Standard 115V (NEMA 5-15P)",
            hecoMonthly: "~$48 / mo",
            image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
            specialBadge: "Gold Fin™ Salt Protection"
        },
        {
            id: 5,
            name: "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
            price: 785,
            promo_price: 706,
            stock: 50,
            category: "WINDOW_AC",
            subcategory: "dual_inverter",
            btu: 14000,
            voltage: "115V / 15 Amp",
            coverage: "250–350 sq. ft.",
            noise_level: "52 / 62 dB",
            dehumidification: "4.4 Pts/Hr",
            idealRoom: "Living Area / Dining Room",
            plugType: "Standard 115V (NEMA 5-15P)",
            hecoMonthly: "~$58 / mo",
            image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
            specialBadge: "Maximum 115V Cooling"
        },
        {
            id: 6,
            name: "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
            price: 925,
            promo_price: 832,
            stock: 30,
            category: "WINDOW_AC",
            subcategory: "dual_inverter",
            btu: 18000,
            voltage: "208/230V / 20 Amp",
            coverage: "400+ sq. ft.",
            noise_level: "52 / 63 dB",
            dehumidification: "5.5 Pts/Hr",
            idealRoom: "Open Concept / Vaulted Ceilings",
            plugType: "208/230V (NEMA 6-20P)",
            hecoMonthly: "~$68 / mo",
            image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
            specialBadge: "Open Floor Plan Titan"
        },
        {
            id: 7,
            name: "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
            price: 1025,
            promo_price: 922,
            stock: 20,
            category: "WINDOW_AC",
            subcategory: "dual_inverter",
            btu: 23500,
            voltage: "208/230V / 20 Amp",
            coverage: "550–1,500 sq. ft.",
            noise_level: "53 / 64 dB",
            dehumidification: "7.1 Pts/Hr",
            idealRoom: "Whole-Home Open Layout",
            plugType: "208/230V (NEMA 6-20P)",
            hecoMonthly: "~$82 / mo",
            image_url: "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
            specialBadge: "Industrial Titan Cooling"
        }
    ];

    const filteredModels = allModels.filter(m => {
        if (selectedFilter === '115v') return m.voltage?.includes('115V');
        if (selectedFilter === '230v') return m.voltage?.includes('230V');
        if (selectedFilter === 'bedroom') return (m.btu || 0) <= 10000;
        if (selectedFilter === 'living') return (m.btu || 0) >= 12000;
        return true;
    });

    const handleBuy = (product: Product) => {
        trackFunnelEvent('add_to_cart_guide', {
            product_id: product.id,
            product_name: product.name,
            price: product.promo_price || product.price,
            btu: product.btu
        });
        addToCart(product);
        openCart();
    };

    const faqItems = [
        {
            q: "How does LG Dual Inverter technology cut HECO electricity bills by 40%?",
            a: "Standard window ACs run single-speed rotary compressors that constantly turn on at 100% capacity and abruptly shut off. This causes massive power spikes and temperature swings. LG's Dual Inverter compressor uses twin rotaries that continuously vary speed to maintain exact room temperature, consuming up to 40% less electricity."
        },
        {
            q: "Which LG Dual Inverter model can plug into a standard household wall outlet?",
            a: "The 6,000 BTU, 8,000 BTU, 10,000 BTU, 12,000 BTU, and 14,000 BTU models all operate on standard 115-Volt / 15-Amp circuits (NEMA 5-15P plug). Only the 18,000 BTU and 23,500 BTU models require a dedicated 208/230V 20-Amp circuit (NEMA 6-20P plug)."
        },
        {
            q: "Can Affordable Home AC install these units in Oahu jalousie windows?",
            a: "Yes! Our CT-36775 licensed technicians specialize in jalousie louver retrofits across all 22 Oahu municipalities. We safely remove only the necessary glass louvers, precision-fit custom clear acrylic baffles, and anchor exterior cantilever brackets so your window structure is 100% protected."
        },
        {
            q: "How do I claim the $45 Hawaii Energy cash rebate?",
            a: "All ENERGY STAR® certified models in this guide qualify for the $45 cash rebate. Affordable Home AC provides you with our official pre-approved rebate application form PDF with your purchase."
        },
        {
            q: "Where is your warehouse located for local pickup?",
            a: "Our central warehouse is located at 94-150 Leoleo St. #203 in Waipahu. Warehouse pickup is free and available by appointment (subject to scheduling & inventory availability). We also offer $50 Flat Island-Wide Delivery directly to your doorstep."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - LG Dual Inverter Oahu Guide & Store",
                "telephone": "+1-808-488-1111",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leoleo St. #203",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "112",
                    "bestRating": "5",
                    "worstRating": "1"
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
                        "name": "LG Dual Inverter Guide",
                        "item": "https://www.affordablehome-ac.com/shop/lg-dual-inverter-guide"
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
                        In-Stock Waipahu Warehouse Inventory &bull; All Sizes Ready
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Oahu <span className="text-primary">LG Dual Inverter</span> Buyer&apos;s Guide
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        6,000 to 23,500 BTU Models Compared &bull; 40% HECO Electric Savings
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Compare every LG Dual Inverter model in stock at our Waipahu warehouse. Room square footage, voltage requirements, Hawaiian Electric operating costs, and direct 1-click Stripe ordering. Includes official $45 Hawaii Energy cash rebate PDF.
                    </p>
                </div>

                {/* Filter Navigation */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {[
                        { id: 'all', label: 'All Models (6k–23.5k)' },
                        { id: 'bedroom', label: 'Bedrooms (6k & 8k)' },
                        { id: 'living', label: 'Living Rooms (12k–23.5k)' },
                        { id: '115v', label: '115V Standard Plugs' },
                        { id: '230v', label: '230V High-Capacity Plugs' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedFilter(tab.id as any)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                                selectedFilter === tab.id
                                    ? 'bg-primary text-slate-950 shadow-md shadow-primary/20'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Model Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {filteredModels.map(product => (
                        <div 
                            key={product.id}
                            className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl flex flex-col justify-between relative hover:border-cyan-500/40 transition-all group"
                        >
                            {product.specialBadge && (
                                <div className="absolute -top-3 left-6 z-10">
                                    <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider shadow-lg">
                                        {product.specialBadge}
                                    </span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="aspect-[4/3] flex items-center justify-center relative p-4 rounded-2xl bg-black/30 border border-white/5 mt-2">
                                    <Image
                                        src={product.image_url!}
                                        alt={product.name}
                                        width={320}
                                        height={220}
                                        className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                                            {product.stock} In Stock
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                                        {product.idealRoom} &bull; {product.coverage}
                                    </div>
                                    <h3 className="text-lg font-header font-black uppercase text-white mt-1">
                                        {product.name}
                                    </h3>
                                </div>

                                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs space-y-1.5 text-slate-300">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Power Plug:</span>
                                        <span className="text-white font-bold">{product.voltage}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Noise Level:</span>
                                        <span className="text-cyan-300 font-bold">{product.noise_level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">HECO Est.:</span>
                                        <span className="text-emerald-400 font-bold">{product.hecoMonthly}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Cash Rebate:</span>
                                        <span className="text-emerald-400 font-bold">$45 Cash PDF</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Buy Button */}
                            <div className="pt-5 border-t border-white/10 mt-4 space-y-3">
                                <div className="flex items-baseline justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black text-white font-mono">
                                            ${product.promo_price}
                                        </span>
                                        <span className="text-xs font-mono line-through text-slate-500">
                                            ${product.price}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                                        Net: ${(product.promo_price || product.price) - 45} (after rebate)
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleBuy(product)}
                                    className="w-full py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-md shadow-primary/20"
                                >
                                    <ShoppingCart className="size-3.5" />
                                    Buy on Stripe (${product.promo_price})
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sizing & BTU Decision Matrix */}
                <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl mb-20 overflow-x-auto">
                    <h3 className="text-xl font-header font-black uppercase text-white mb-2">
                        Oahu Climate Sizing Matrix (High Humidity &amp; Trade Winds)
                    </h3>
                    <p className="text-slate-400 text-xs mb-6">
                        In Hawaii&apos;s 74%+ humidity, proper BTU sizing ensures effective dehumidification without short-cycling.
                    </p>
                    <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase">
                                <th className="py-3 px-4">Room Type &amp; Dimensions</th>
                                <th className="py-3 px-4">Square Footage</th>
                                <th className="py-3 px-4 text-cyan-400">Recommended Model</th>
                                <th className="py-3 px-4">Electrical Requirement</th>
                                <th className="py-3 px-4">Waipahu Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Small Bedroom / Office (10x12)</td>
                                <td className="py-3 px-4">100 - 180 sq. ft.</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">6,000 BTU (LW6023IVSM)</td>
                                <td className="py-3 px-4">115V / 15A Standard</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">12 In Stock</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Master Bedroom / Nursery (12x15)</td>
                                <td className="py-3 px-4">150 - 350 sq. ft.</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">8,000 BTU (LW8022IVSM) ★</td>
                                <td className="py-3 px-4">115V / 15A Standard</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">10 In Stock</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Master Suite / Studio (15x18)</td>
                                <td className="py-3 px-4">250 - 450 sq. ft.</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">12,000 BTU (LW1222IVSM)</td>
                                <td className="py-3 px-4">115V / 15A Standard</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">10 In Stock</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Living &amp; Dining Area (18x20)</td>
                                <td className="py-3 px-4">350 - 550 sq. ft.</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">14,000 BTU (LW1522FVSM)</td>
                                <td className="py-3 px-4">115V / 15A Standard</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">50 In Stock</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Vaulted Open Floor Plan (20x25)</td>
                                <td className="py-3 px-4">400 - 1,000 sq. ft.</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">18,000 BTU (LW1822IVSM)</td>
                                <td className="py-3 px-4 text-purple-400 font-bold">208/230V / 20A (6-20P)</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">30 In Stock</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold text-white">Whole Home Open Layout (25x30+)</td>
                                <td className="py-3 px-4">550 - 1,500+ sq. ft.</td>
                                <td className="py-3 px-4 text-cyan-400 font-bold">23,500 BTU (LW2422IVSM)</td>
                                <td className="py-3 px-4 text-purple-400 font-bold">208/230V / 20A (6-20P)</td>
                                <td className="py-3 px-4 text-emerald-400 font-bold">20 In Stock</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">Common questions about selecting an LG Dual Inverter for Oahu homes</p>
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

                {/* Bottom Call to Action */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 text-center space-y-4">
                    <h4 className="text-xl font-header font-black uppercase text-white">
                        Need Guidance on Sizing or Installation?
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Visit our Waipahu warehouse by appointment or call our licensed HVAC dispatch team to confirm measurements and scheduling.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link
                            href="/window-ac-installation"
                            className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                        >
                            Schedule Installation ($0 Upfront)
                        </Link>
                        <a 
                            href="tel:808-488-1111"
                            className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Phone className="size-3.5 text-cyan-400" />
                            Call Warehouse: (808) 488-1111
                        </a>
                    </div>
                </div>
            </main>
            <BackToTop />
        </div>
    );
}
