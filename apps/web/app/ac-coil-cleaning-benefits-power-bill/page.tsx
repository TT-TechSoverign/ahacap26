'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Zap, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    DollarSign,
    TrendingDown,
    Percent,
    Sparkles,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does a dirty AC coil increase my electric bill in Hawaii?",
        a: "Dirt, lint, and fungal biofilm act as an insulating blanket on aluminum cooling fins. This prevents heat absorption indoors and heat rejection outdoors, forcing your compressor to draw higher amperage and run up to 40% longer. At Hawaiian Electric's ~44.2¢/kWh rate, this adds up rapidly."
    },
    {
        q: "How much money can I actually save each month by cleaning my coils?",
        a: "For a typical 12,000 BTU unit running 8 hours a day, restoring clean coil heat transfer typically saves 2 to 3 kWh per day—translating to roughly $30 to $45 in monthly savings per air handler. In multi-split households, savings often exceed $100 per month."
    },
    {
        q: "How often should coils be chemically washed on Oahu?",
        a: "Given the continuous trade winds carrying salt spray and red dirt, evaporator and condenser coils should receive professional chemical cleaning every 6 to 12 months depending on your proximity to the coastline."
    },
    {
        q: "What makes professional coil washing different from DIY spray cans?",
        a: "Hardware store aerosol cans often push dirt deeper into the coil slab or leave a sticky residue that attracts more dust. Our licensed technicians apply pH-balanced alkaline foaming agents that expand through the entire 2-to-3 row fin block and rinse it completely out."
    }
];

export default function CoilCleaningPowerBillPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Coil Cleaning & Power Bill Savings' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Zap className="size-3.5" />
                        <span>HECO ~44.2¢/kWh Reality &bull; 20-30% Efficiency Recovery</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Coil Cleaning: <span className="text-primary italic">Cut Your HECO Power Bill</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        With Hawaii residential electricity rates hovering near 44.2¢ per kilowatt-hour, running an air conditioner with dirty, clogged coils is burning cash. Discover the physics of coil insulation and how a single cleaning pays for itself in months.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book Coil Efficiency Clean ($175 / $275)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Efficiency Desk: (808) 488-1111"
                            eventLabel="Coil Power Bill Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* HECO Financial Breakdown Cards */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-3">
                        <span className="font-mono text-xs text-rose-400 uppercase font-bold tracking-wider">THERMAL RESISTANCE</span>
                        <div className="text-3xl font-black text-white font-header">+37%</div>
                        <h3 className="font-header font-bold text-base uppercase text-white">Compressor Workload</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            A mere 0.042-inch layer of grime on aluminum fins insulates heat exchange, spiking system head pressure and electrical draw.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-3">
                        <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">MONTHLY SAVINGS</span>
                        <div className="text-3xl font-black text-emerald-400 font-header">$40–$90</div>
                        <h3 className="font-header font-bold text-base uppercase text-white">Estimated Power Reduction</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            At ~44.2¢/kWh, eliminating 2 to 3 wasted kWh per day puts cash right back into your pocket every single billing cycle.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-3">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">LIFESPAN EXTENSION</span>
                        <div className="text-3xl font-black text-primary font-header">3–5 Yrs</div>
                        <h3 className="font-header font-bold text-base uppercase text-white">Prevent Compressor Burnout</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            Cooler running temperatures prevent inverter board overheating and protect rotary compressor windings from thermal breakdown.
                        </p>
                    </div>
                </section>

                {/* Drop Cloth & Cleaning Assurance */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL SERVICE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Complete Chemical Wash with Drop-Cloth Protection
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our technicians never use destructive high pressure that bends delicate aluminum fins. We use self-rinsing, non-acidic foaming detergents designed specifically for tropical coastal HVAC equipment. Floor drop cloths protect your floors throughout the entire appointment.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Contractor License CT-36775:</strong> Performed by certified technicians who test airflow CFM, delta-T split, and operating amps before and after service.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Basic Mini Split Tune-Up</span>
                                <span className="font-header font-bold text-lg text-white">$175</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Premium Teardown & Overhaul</span>
                                <span className="font-header font-bold text-lg text-primary">$275</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Floor Drop Cloth Protection</span>
                                <span className="font-header font-bold text-xs text-emerald-400">Guaranteed Clean</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Coil Cleaning & Energy FAQs
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
                    title="Energy Savings Reviews"
                    subtitle="See how regular coil cleanings slashed electricity bills for Oahu homeowners"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
