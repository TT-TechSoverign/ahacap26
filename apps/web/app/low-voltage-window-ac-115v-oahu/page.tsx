'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Plug, 
    Zap, 
    ArrowRight, 
    ShieldCheck, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    AlertCircle,
    Home,
    Check
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What is the largest BTU window AC that runs on a standard 115V outlet?",
        a: "Thanks to LG Dual Inverter variable-speed compressor technology, units up to 14,000 BTU (such as the LW1522IVSM) can operate on a standard 115V 15-amp circuit with a standard NEMA 5-15P plug, cooling up to 800 sq ft without requiring a 230V line."
    },
    {
        q: "Will a 115V Dual Inverter window AC trip my home's circuit breaker?",
        a: "Traditional non-inverter units draw massive startup current spikes (often 30 to 40 amps for a split second) when the compressor kicks on, tripping older breakers. LG Dual Inverters feature soft-start electronics that gradually ramp up power, virtually eliminating breaker trips."
    },
    {
        q: "Can I use an extension cord with a 115V window air conditioner?",
        a: "We strongly recommend plugging directly into a wall receptacle. If necessary, only use a heavy-duty, 14-gauge or 12-gauge appliance-rated extension cord rated for 15 amps to prevent overheating and voltage drop."
    },
    {
        q: "Do 115V window ACs qualify for the $45 Hawaii Energy cash rebate?",
        a: "Yes! All qualifying Energy Star certified Dual Inverter window models (6,000, 8,000, 10,000, 12,000, and 14,000 BTU) qualify for an official $45 cash rebate from Hawaii Energy."
    }
];

export default function LowVoltageWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: '115V Standard Plug Window AC' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Plug className="size-3.5" />
                        <span>NEMA 5-15P Standard Wall Plug &bull; Up to 14,000 BTU</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        115V Window AC Units <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        No electrician required. No expensive 230-volt rewiring. Plug our high-efficiency LG Dual Inverter window air conditioners directly into any standard 15-amp, 3-prong household outlet. Available from 6,000 up to 14,000 BTU.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop 115V In-Stock Models
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Waipahu Desk: (808) 488-1111"
                            eventLabel="115V AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 115V Lineup Grid */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-2">
                            IN-STOCK WAIPAHU INVENTORY
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Standard 115V Models by Room Size
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-2">
                            <span className="text-primary font-mono text-xs font-bold uppercase">6,000 BTU</span>
                            <h3 className="font-header font-bold text-lg text-white">LW6023IVSM</h3>
                            <p className="text-xs text-slate-300 font-sans">Cooling up to 250 sq ft. Draws only 4.6 amps.</p>
                            <div className="text-xs font-mono text-emerald-400">$45 Rebate Eligible</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-2">
                            <span className="text-primary font-mono text-xs font-bold uppercase">8,000 BTU</span>
                            <h3 className="font-header font-bold text-lg text-white">LW8022IVSM</h3>
                            <p className="text-xs text-slate-300 font-sans">Cooling up to 350 sq ft. Draws only 6.3 amps.</p>
                            <div className="text-xs font-mono text-emerald-400">$45 Rebate Eligible</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-2">
                            <span className="text-primary font-mono text-xs font-bold uppercase">10,000 BTU</span>
                            <h3 className="font-header font-bold text-lg text-white">LW1022IVSM</h3>
                            <p className="text-xs text-slate-300 font-sans">Cooling up to 450 sq ft. Draws only 8.2 amps.</p>
                            <div className="text-xs font-mono text-emerald-400">$45 Rebate Eligible</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-2">
                            <span className="text-primary font-mono text-xs font-bold uppercase">14,000 BTU</span>
                            <h3 className="font-header font-bold text-lg text-white">LW1522IVSM</h3>
                            <p className="text-xs text-slate-300 font-sans">Cooling up to 800 sq ft on a 115V 15A plug!</p>
                            <div className="text-xs font-mono text-emerald-400">$45 Rebate Eligible</div>
                        </div>
                    </div>
                </section>

                {/* Breaker Tripping Breakdown */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                SOFT-START INVERTER TECHNOLOGY
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Stop Tripping Older Plantation Home Breakers
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Many historic homes in Kaimuki, Kalihi, Pearl City, and Kailua have older 15-amp wiring. When a conventional AC compressor clicks on, it creates a massive electrical surge that trips the breaker. Our LG Dual Inverter compressors ramp up smoothly from zero, eliminating inrush current spikes.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> Our technicians lay protective floor drop cloths under every unit during work, leaving your home cleaner than when we arrived.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Same-Day Waipahu Pickup</h3>
                            <p className="text-xs text-slate-300">
                                Reserve online and pick up at 94-150 Leoleo St #203 by appointment, or choose flat $50 island-wide delivery.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Browse 115V Catalog
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            115V Window AC FAQs
                        </h2>
                    </div>

                    <div className="space-y-3 max-w-3xl mx-auto">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-primary transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <ReviewsPavilion 
                    variant="marquee" 
                    title="115V Window AC Customer Reviews"
                    subtitle="Oahu homeowners enjoying effortless plug-and-play cooling"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
