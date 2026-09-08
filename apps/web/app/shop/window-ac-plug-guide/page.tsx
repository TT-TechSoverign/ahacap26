'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Zap, 
    Plug, 
    ShieldCheck, 
    ArrowRight, 
    Check, 
    AlertTriangle, 
    HelpCircle, 
    ChevronDown, 
    FileText, 
    ShoppingCart, 
    Eye, 
    Wind, 
    Info,
    Warehouse,
    Sparkles
} from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function WindowAcPlugGuidePage() {
    const { addToCart } = useCart();
    const [selectedPlug, setSelectedPlug] = useState<'115v' | '230v'>('230v');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Specific in-stock models
    const units230V = [
        {
            id: 9,
            name: "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
            price: 875,
            promoPrice: 815,
            stock: 28,
            voltage: "208/230V - 20A (NEMA 6-20P)",
            coverage: "550 – 1,000 sq. ft. (Large Living Room / Open Concept)",
            noise: "44 / 52 dB",
            dehumid: "5.5 Pts/Hr",
            rebate: "$45 Hawaii Energy Form Included",
            slug: "9-lg-dual-inverter-18-000-btu-lw1822ivsm",
            plugType: "NEMA 6-20P (T-Blade / Horizontal)"
        },
        {
            id: 10,
            name: "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
            price: 975,
            promoPrice: 922,
            stock: 18,
            voltage: "208/230V - 20A (NEMA 6-20P)",
            coverage: "1,000 – 1,450 sq. ft. (Industrial Titan Open Floor)",
            noise: "44 / 53 dB",
            dehumid: "7.1 Pts/Hr",
            rebate: "$45 Hawaii Energy Form Included",
            slug: "10-lg-dual-inverter-24-000-btu-lw2422ivsm",
            plugType: "NEMA 6-20P (T-Blade / Horizontal)"
        }
    ];

    const units115V = [
        {
            id: 5,
            name: "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
            price: 575,
            promoPrice: 535,
            stock: 50,
            voltage: "115V - 15A (Standard NEMA 5-15P)",
            coverage: "250 – 350 sq. ft. (Master Bedroom / Studio)",
            noise: "44 / 50 dB",
            dehumid: "2.8 Pts/Hr",
            rebate: "$45 Hawaii Energy Form Included",
            slug: "5-lg-dual-inverter-8-000-btu-lw8022ivsm",
            plugType: "Standard 3-Prong 115V Wall Plug"
        },
        {
            id: 6,
            name: "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
            price: 625,
            promoPrice: 585,
            stock: 50,
            voltage: "115V - 15A (Standard NEMA 5-15P)",
            coverage: "350 – 450 sq. ft. (Large Bedroom / Living Room)",
            noise: "44 / 52 dB",
            dehumid: "3.3 Pts/Hr",
            rebate: "$45 Hawaii Energy Form Included",
            slug: "6-lg-dual-inverter-10-000-btu-lw1022ivsm",
            plugType: "Standard 3-Prong 115V Wall Plug"
        },
        {
            id: 7,
            name: "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
            price: 700,
            promoPrice: 650,
            stock: 50,
            voltage: "115V - 15A (Standard NEMA 5-15P)",
            coverage: "450 – 550 sq. ft. (Living Room / Open Kitchen)",
            noise: "44 / 53 dB",
            dehumid: "3.8 Pts/Hr",
            rebate: "$45 Hawaii Energy Form Included",
            slug: "7-lg-dual-inverter-12-000-btu-lw1222ivsm",
            plugType: "Standard 3-Prong 115V Wall Plug"
        }
    ];

    const faqItems = [
        {
            q: "Can I plug an 18,000 or 23,500 BTU window AC into a regular 115V outlet?",
            a: "No. High-capacity 18,000 BTU (LW1822IVSM) and 23,500 BTU (LW2422IVSM) window air conditioners require a 208V/230V 20-Amp circuit with a NEMA 6-20P plug (featuring horizontal blades). Attempting to use an adapter on a 115V outlet is dangerous and will damage the unit's variable inverter motor."
        },
        {
            q: "Why are 18k and 23.5k units 230V instead of 115V?",
            a: "Physics and electrical efficiency! Running an 18,000 BTU compressor on 115V would require over 16 to 18 continuous Amps, which would overheat standard home wiring and trip 15A household breakers. Running at 230V cuts the electrical current (amperage) directly in half (drawing only 7–8 Amps maximum, and as little as 3.2 Amps once modulating). This prevents wire heat, saves electricity, and ensures ice-cold cooling across 1,000+ sq ft spaces."
        },
        {
            q: "What if my Oahu living room only has standard 115V outlets?",
            a: "You have two great options: 1) A licensed Oahu electrician can quickly convert a dedicated 15A or 20A breaker in your main panel into a 230V receptacle (frequently costing only $150–$250 in single-story homes). 2) Or, you can choose our maximum-capacity 115V model—the LG Dual Inverter 12,000 BTU (LW1222IVSM)—which plugs directly into any standard wall outlet and easily cools up to 550 sq. ft."
        },
        {
            q: "Do the 18,000 and 23,500 BTU LG Dual Inverters qualify for Hawaii Energy rebates?",
            a: "Yes! Every Energy Star LG Dual Inverter purchased from our Waipahu warehouse qualifies for a $45 Hawaii Energy cash rebate. We include our pre-approved official application form PDF directly with your order."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HowTo",
                "name": "How to Identify 115V vs 230V Window AC Plug Types in Hawaii",
                "description": "Visual guide to identify NEMA 5-15P 115V plugs and NEMA 6-20P 230V outlets before purchasing 18,000 or 23,500 BTU LG Dual Inverter window air conditioners.",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Look at the Wall Receptacle Blades",
                        "text": "Check your outlet. Two vertical slots indicate a standard 115V 15A outlet. One horizontal slot and one vertical or T-slot indicates a 230V 20A circuit."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Match with AC BTU Size",
                        "text": "Units from 6,000 to 12,000 BTU run on 115V. Heavy-duty 18,000 and 23,500 BTU units require 230V for safe, energy-efficient operation."
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
                        <Plug className="size-3.5" />
                        Oahu Electrical Voltage & Sizing Guide
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        115V vs. 230V <span className="text-primary">Window AC Plug</span> Matcher
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Don&apos;t let outlet confusion hold you back from living room cooling. Identify your wall plug in 10 seconds and unlock high-power 18k and 23.5k Dual Inverters ready for Waipahu warehouse pickup (subject to scheduling &amp; availability by appointment) or $50 flat island delivery.
                    </p>
                </div>

                {/* Visual Plug Comparison Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    
                    {/* 115V Card */}
                    <div 
                        onClick={() => setSelectedPlug('115v')}
                        className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                            selectedPlug === '115v'
                                ? 'bg-slate-900/80 border-primary shadow-[0_0_35px_rgba(0,174,239,0.25)]'
                                : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase font-bold">
                                Standard Residential (115V)
                            </span>
                            <span className="text-xs font-mono text-slate-500">NEMA 5-15P</span>
                        </div>

                        <h3 className="text-2xl font-header font-black uppercase text-white mb-2">
                            Standard 3-Prong 115V Plug
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-6">
                            The standard wall outlet found in 99% of bedrooms and apartments across Oahu. Features two parallel vertical slots plus a round ground pin.
                        </p>

                        {/* Visual SVG Diagram */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center mb-6">
                            <div className="size-24 rounded-full border-2 border-slate-600 bg-slate-950 flex flex-col items-center justify-center relative shadow-inner">
                                <div className="flex gap-4 mb-2">
                                    <div className="w-1.5 h-6 bg-slate-400 rounded-sm"></div>
                                    <div className="w-1.5 h-6 bg-slate-400 rounded-sm"></div>
                                </div>
                                <div className="size-3.5 rounded-full bg-slate-400"></div>
                            </div>
                            <span className="text-[11px] font-mono uppercase text-slate-400 mt-3">2 Vertical Slots + Round Ground</span>
                        </div>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">Supported BTU Ratings:</span>
                                <span className="text-white font-mono font-bold">6,000 / 8,000 / 10,000 / 12,000 BTU</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">Typical Coverage:</span>
                                <span className="text-white font-mono font-bold">100 to 550 sq. ft.</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                                <span className="text-slate-400">Typical Rooms:</span>
                                <span className="text-cyan-400 font-bold">Bedrooms, Offices, Studios</span>
                            </div>
                        </div>
                    </div>

                    {/* 230V Card */}
                    <div 
                        onClick={() => setSelectedPlug('230v')}
                        className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                            selectedPlug === '230v'
                                ? 'bg-slate-900/80 border-primary shadow-[0_0_35px_rgba(0,174,239,0.25)]'
                                : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase font-bold">
                                High Power Titan (208/230V)
                            </span>
                            <span className="text-xs font-mono text-slate-500">NEMA 6-20P</span>
                        </div>

                        <h3 className="text-2xl font-header font-black uppercase text-white mb-2">
                            Tandem Horizontal 230V Plug
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-6">
                            Dedicated heavy-duty outlet with horizontal or T-shaped blade slots. Engineered for maximum airflow in large living rooms and open-concept homes.
                        </p>

                        {/* Visual SVG Diagram */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center mb-6">
                            <div className="size-24 rounded-full border-2 border-emerald-500/50 bg-slate-950 flex flex-col items-center justify-center relative shadow-inner">
                                <div className="flex gap-4 items-center mb-2">
                                    <div className="w-6 h-1.5 bg-emerald-400 rounded-sm"></div>
                                    <div className="w-6 h-1.5 bg-emerald-400 rounded-sm"></div>
                                </div>
                                <div className="size-3.5 rounded-full bg-emerald-400"></div>
                            </div>
                            <span className="text-[11px] font-mono uppercase text-emerald-400 mt-3 font-bold">Horizontal Blades + Round Ground</span>
                        </div>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">Supported BTU Ratings:</span>
                                <span className="text-emerald-400 font-mono font-bold">18,000 BTU / 23,500 BTU</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">Typical Coverage:</span>
                                <span className="text-emerald-400 font-mono font-bold">600 to 1,450 sq. ft.</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                                <span className="text-slate-400">Typical Rooms:</span>
                                <span className="text-emerald-400 font-bold">Open Living Rooms, Great Rooms, High Ceilings</span>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Featured In-Stock Units for Selected Plug */}
                <section className="mb-20">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                {selectedPlug === '230v' ? 'In-Stock 230V High-Capacity Dual Inverters' : 'In-Stock 115V Standard Plug Dual Inverters'}
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                Available for Waipahu warehouse pickup (subject to scheduling &amp; inventory availability by appointment) or $50 flat island-wide Oahu delivery.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedPlug('230v')}
                                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                                    selectedPlug === '230v'
                                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                        : 'bg-white/[0.05] text-slate-400 hover:text-white'
                                }`}
                            >
                                View 230V Units ({units230V.length})
                            </button>
                            <button
                                onClick={() => setSelectedPlug('115v')}
                                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                                    selectedPlug === '115v'
                                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.3)]'
                                        : 'bg-white/[0.05] text-slate-400 hover:text-white'
                                }`}
                            >
                                View 115V Units ({units115V.length})
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(selectedPlug === '230v' ? units230V : units115V).map((unit) => (
                            <div 
                                key={unit.id}
                                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 relative group"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                                            {unit.stock} In Stock Waipahu
                                        </span>
                                        <span className="text-slate-400 font-mono text-[11px]">{unit.voltage}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-header font-black uppercase text-white group-hover:text-primary transition-colors">
                                            {unit.name}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-1">{unit.coverage}</p>
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Sound Mode:</span>
                                            <span className="text-white font-mono">{unit.noise} (Ultra-Quiet)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Dehumidification:</span>
                                            <span className="text-white font-mono">{unit.dehumid}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Plug Configuration:</span>
                                            <span className="text-primary font-mono text-[11px] font-bold">{unit.plugType}</span>
                                        </div>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
                                        <FileText className="size-3.5 shrink-0" />
                                        <span>{unit.rebate}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                                    <div>
                                        <span className="text-xs text-slate-500 line-through mr-2">${unit.price}</span>
                                        <span className="text-2xl font-header font-black text-cyan-400">${unit.promoPrice}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/shop/${unit.slug}`}
                                            className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 transition-all"
                                            title="View Specs"
                                        >
                                            <Eye className="size-4" />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                addToCart({
                                                    id: unit.id,
                                                    name: unit.name,
                                                    price: unit.price,
                                                    promo_price: unit.promoPrice,
                                                    stock: unit.stock,
                                                    category: 'WINDOW_AC',
                                                    subcategory: 'dual_inverter',
                                                });
                                                trackFunnelEvent('plug_guide_add_to_cart', { unit_id: unit.id, name: unit.name, voltage: unit.voltage });
                                            }}
                                            className="px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-header font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,174,239,0.3)] transition-all"
                                        >
                                            <ShoppingCart className="size-3.5" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What if you don't have 230V? Solution Banner */}
                <section className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        <div className="lg:col-span-2 space-y-2">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase font-bold">
                                Have a Big Living Room but No 230V Outlet?
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                Two Island Workarounds That Work Perfectly
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                <strong>Option 1: Quick Breaker Conversion.</strong> A licensed Oahu electrician can convert a dedicated 15A/20A breaker to 230V in under 1 hour.<br />
                                <strong>Option 2: High-Power 115V LG Dual Inverter 12k.</strong> Our 12,000 BTU unit (LW1222IVSM) plugs into any normal wall outlet and pushes up to 550 sq. ft. of cooling!
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/shop/7-lg-dual-inverter-12-000-btu-lw1222ivsm"
                                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-header font-black text-xs uppercase tracking-wider text-center transition-all"
                            >
                                View 12,000 BTU 115V Champion
                            </Link>
                            <a
                                href="tel:8087244328"
                                className="px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-header font-bold text-xs uppercase tracking-wider text-center transition-all"
                            >
                                Consult an AC Specialist
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Voltage & Plug FAQs
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="border border-white/10 rounded-2xl bg-slate-900/40 overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm sm:text-base text-white hover:text-primary transition-colors"
                                >
                                    <span>{item.q}</span>
                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-slate-500'}`} />
                                </button>
                                {activeFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <BackToTop />
        </div>
    );
}
