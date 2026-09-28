'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Droplets, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Wrench,
    Wind,
    Sparkles,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What causes AC drain lines to clog so quickly in Hawaii?",
        a: "Hawaii's warm ambient air combined with constant condensation creates the perfect breeding environment for bacterial slime called zooglea and airborne algae spores. Over 6 to 12 months, this forms a gelatinous plug that blocks the 5/8-inch or 3/4-inch condensate pipe."
    },
    {
        q: "How does Affordable Home A/C clear clogged condensate drains?",
        a: "We use dual-action extraction: industrial high-vacuum suction from the exterior termination point paired with dedicated condensate line flushing, followed by an antimicrobial pan flush and slow-dissolving drain pan treatment tablets."
    },
    {
        q: "Can pouring vinegar down the drain prevent clogs?",
        a: "A cup of white vinegar every few months can help slow minor bacterial growth, but once a dense algae jelly plug has established, mechanical vacuum extraction and dedicated line flushing are required to prevent overflow."
    },
    {
        q: "How quickly can you dispatch for an active water leak?",
        a: "We prioritize emergency drain overflow calls across Oahu. When an air conditioner is dripping water inside onto drywall, wood flooring, or electronics, call our dispatch desk immediately at (808) 488-1111."
    }
];

const EMERGENCY_STEPS = [
    {
        step: "01",
        title: "Turn Off Your AC Immediately",
        desc: "Shut off the unit via the remote or wall thermostat to stop condensate production and prevent further water overflow onto drywall."
    },
    {
        step: "02",
        title: "Place Towels Under the Air Handler",
        desc: "Catch dripping water to protect baseboards, hardwood flooring, and nearby electrical outlets."
    },
    {
        step: "03",
        title: "Call Our Rapid Response Desk",
        desc: "Contact (808) 488-1111 for $175 flat-rate emergency drain clearing and comprehensive leak diagnostics."
    }
];

export default function DrainLineClogPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Drain Line Clog Clearing Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Droplets className="size-3.5" />
                        <span>Professional Line Flush & Wet Vac &bull; $175 Flat Rate Clearing</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Drain Line Clog <span className="text-primary italic">Clearing Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is water leaking down your wall from your mini split or pooling beneath your window unit? In Hawaii&apos;s tropical heat, algae jelly quickly blocks narrow drain pipes. Our licensed technicians clear clogs with high-vacuum extraction and thorough line flushing.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $175 Drain Clearing
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Emergency Leak Desk: (808) 488-1111"
                            eventLabel="Drain Clog Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Emergency Protocol */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-rose-400 uppercase font-bold tracking-wider block mb-2">ACTIVE WATER LEAK?</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Take These 3 Steps Right Now
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {EMERGENCY_STEPS.map((s, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-rose-500/40 transition-all space-y-3">
                                <span className="font-mono text-2xl font-black text-rose-400">{s.step}</span>
                                <h3 className="font-header font-bold text-base uppercase text-white">{s.title}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Clearing Process Box */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL RESTORATION
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                How We Clear Hawaii Drain Lines
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Simply poking a wire into the drain pipe often punctures flexible tubing or packs the slime tighter into fittings. We use commercial high-vacuum extraction from outside combined with dedicated condensate line flushing from inside.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Once clear, we treat the drain pan with slow-release biocidal pan tablets that prevent algae colonies from reforming for up to 6 months. Floor drop cloths protect your living space throughout.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Diagnostic & Drain Clear</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Included in Full Teardown</span>
                                <span className="font-header font-bold text-xs text-white">Included in $275</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Biocidal Pan Tablets</span>
                                <span className="font-header font-bold text-xs text-emerald-400">Included</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Hawaii Contractor License</span>
                                <span className="font-header font-bold text-xs text-white">CT-36775</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Drain Line Clearing FAQs
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
                    title="Drain Clearing Reviews"
                    subtitle="Saved walls and restored dry floors across Oahu communities"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
