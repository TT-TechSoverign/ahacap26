'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ShieldCheck, 
    Zap, 
    Layers, 
    Phone, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    Wrench, 
    VolumeX, 
    Waves, 
    Sparkles, 
    FileText, 
    ChevronDown, 
    Calendar,
    AlertCircle,
    Info,
    Send,
    DollarSign
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import MiniSplitEstimator from '@/components/MiniSplitEstimator';
import { trackFunnelEvent } from '@/lib/tracking';

export default function MiniSplitEstimatePage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqItems = [
        {
            q: "Does Affordable Home AC participate in Hawaii Energy rebates for mini splits?",
            a: "No. Affordable Home AC does not participate in Hawaii Energy rebates for our mini split division. Rebate programs frequently require contractors to artificially inflate base retail equipment prices, restrict equipment choices, and subject homeowners to months of bureaucratic voucher approvals. Instead, we offer upfront, honest Hawaii Contractor CT-36775 direct pricing—delivering genuine value with zero red tape."
        },
        {
            q: "What electrical panel capacity do I need for a ductless mini split on Oahu?",
            a: "A single-zone mini split typically requires a dedicated 15A or 20A 208/230V breaker. However, multi-zone systems (3 to 5 heads) draw 30A to 45A. Many classic Oahu homes in Kaimuki, Kailua, Kalihi, and Pearl City have older 60A or 100A electrical service panels. Every in-home estimate from Affordable Home AC includes a complimentary electrical panel load assessment to ensure your system operates safely without tripping your main service."
        },
        {
            q: "How much can a high-SEER2 mini split save on Hawaii HECO electric bills?",
            a: "Oahu has the highest residential electricity rates in the nation (~44.2¢/kWh). Replacing an aging central AC or multiple inefficient single-speed window units with a 24 to 28 SEER2 variable-speed inverter mini split (such as Mitsubishi Electric or Fujitsu Halcyon) typically slashes monthly cooling costs by 40% to 50%—saving the average household $1,200 to $2,400 every year."
        },
        {
            q: "How long does a typical ductless mini split installation take?",
            a: "Most single-zone installations are completed in a single day (4 to 6 hours). Multi-zone installations (3 to 5 rooms) typically require 2 to 3 days, including line-set hide fabrication, vacuum pressure decay decay testing, and personalized system commissioning."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - Mini Split Installation Oahu",
                "telephone": "+1-808-724-4328",
                "priceRange": "$$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leokane St",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Hawaii Contractor CT-36775 providing honest, transparent ductless mini split installation, electrical panel assessment, and multi-zone climate design across Oahu."
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
                        <ShieldCheck className="size-3.5" />
                        Hawaii Contractor License CT-36775
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Oahu <span className="text-primary">Ductless Mini Split</span> Sizing & Estimate
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Honest contractor pricing, whisper-quiet 19 dBA luxury, and a complimentary 60A/100A electrical panel assessment. Zero rebate bureaucracy—just transparent, premium engineering.
                    </p>
                </div>

                {/* Grounded Rebate Truth & Island Reality Banner */}
                <section className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 mb-16 backdrop-blur-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400 font-header font-black text-sm uppercase">
                                <DollarSign className="size-4" />
                                0% Rebate Red Tape
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                We do not participate in mini split Hawaii Energy rebates. Instead of inflated manufacturer MSRPs and 6-month voucher delays, we pass honest direct contractor pricing straight to you.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-yellow-400 font-header font-black text-sm uppercase">
                                <Zap className="size-4" />
                                60A / 100A Panel Assessment
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Many Oahu homes have 60A or 100A main service panels. Every estimate includes a free comprehensive electrical load calculation to prevent breaker tripping.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-cyan-400 font-header font-black text-sm uppercase">
                                <Waves className="size-4" />
                                Coastal Blue Fin Coils
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                All our premium systems (Mitsubishi Electric, Fujitsu, Daikin) feature factory anti-corrosion hydrophilic coil treatments built specifically for corrosive Hawaii salt air.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Interactive Multi-Step Estimator Engine */}
                <section className="mb-20">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <span className="text-xs font-mono uppercase text-primary font-bold tracking-widest">
                            Step-By-Step Island Sizing
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white mt-1">
                            Calculate Your System & Book Your Free Assessment
                        </h2>
                    </div>

                    <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
                        <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono text-sm animate-pulse">Loading Island Sizing Wizard...</div>}>
                            <MiniSplitEstimator />
                        </Suspense>
                    </div>
                </section>

                {/* 3 Gold Standard Island Brands */}
                <section className="mb-20">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Engineered for Hawaii Trade Winds
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                            We install exclusively tier-1 inverter brands proven against Oahu humidity and salt air.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                brand: "Mitsubishi Electric Diamond",
                                badge: "Whisper Sanctuary",
                                noise: "As low as 19 dBA",
                                efficiency: "Up to 28 SEER2",
                                warranty: "12-Year Compressor Warranty",
                                highlight: "3D i-See Sensor scans thermal hot spots and automatically redirects cooling.",
                                border: "border-red-500/30"
                            },
                            {
                                brand: "Fujitsu Halcyon",
                                badge: "Tropical Efficiency",
                                noise: "21 dBA Quiet Mode",
                                efficiency: "Up to 27 SEER2",
                                warranty: "10-12 Year Factory Warranty",
                                highlight: "High-capacity variable inverter scroll compressors engineered for constant 80%+ humidity.",
                                border: "border-red-400/30"
                            },
                            {
                                brand: "Daikin Inverter",
                                badge: "Pioneer Reliability",
                                noise: "19–22 dBA Silent Operation",
                                efficiency: "Up to 24.5 SEER2",
                                warranty: "10-12 Year Limited Warranty",
                                highlight: "ASTM B117 salt spray tested acrylic resin Blue Fin heat exchangers for coastal longevity.",
                                border: "border-sky-500/30"
                            }
                        ].map((b, idx) => (
                            <div key={idx} className={`bg-slate-900/50 border ${b.border} rounded-2xl p-6 flex flex-col justify-between`}>
                                <div className="space-y-3">
                                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 font-mono text-[10px] uppercase">
                                        {b.badge}
                                    </span>
                                    <h3 className="text-xl font-header font-black uppercase text-white">{b.brand}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">{b.highlight}</p>
                                    
                                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-1.5 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Sound:</span>
                                            <span className="text-white font-mono font-bold">{b.noise}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Efficiency:</span>
                                            <span className="text-emerald-400 font-mono font-bold">{b.efficiency}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Warranty:</span>
                                            <span className="text-white font-mono">{b.warranty}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-white/5">
                                    <a
                                        href="tel:8087244328"
                                        className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-header font-bold text-xs uppercase flex items-center justify-center gap-1.5 border border-white/10 transition-all"
                                    >
                                        <Phone className="size-3 text-primary" />
                                        Inquire About {b.brand.split(' ')[0]}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Mini Split Estimates & Installation FAQs
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

                {/* Final Callout */}
                <section className="text-center bg-gradient-to-b from-slate-900/60 to-black border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-header font-black uppercase text-white">
                            Ready for Whisper-Quiet Island Comfort?
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            Book your free in-home sizing and electrical load assessment across Oahu today. We bring sample hardware, measure line sets, and provide guaranteed upfront pricing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                            <a
                                href="tel:8087244328"
                                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-header font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,174,239,0.3)] transition-all"
                            >
                                <Phone className="size-4" />
                                Call Our Estimator: (808) 724-4328
                            </a>
                            <Link
                                href="/mini_split_ac"
                                className="px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                            >
                                Learn More About Mini Splits
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <BackToTop />
        </div>
    );
}
