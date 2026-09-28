'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Maximize2, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Lock,
    Droplets,
    Wrench,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does window AC installation work in a double-hung window?",
        a: "In a traditional double-hung window, the bottom sash slides up. The AC unit rests securely on the sill, the top mounting rail hooks behind the lowered sash to lock the unit in place, and accordion side curtains expand to fill the left and right openings."
    },
    {
        q: "Why is proper backward pitch important for double-hung AC mounting?",
        a: "Window ACs must be installed with a slight 1/4-inch to 1/2-inch downward pitch toward the outside of the home. This ensures that tropical condensation drains outdoors rather than spilling into your window sill and walls."
    },
    {
        q: "Do double-hung window installations need exterior support brackets?",
        a: "For lightweight 6,000 to 8,000 BTU units, the window sash and sill provide sufficient support. For heavier 10,000 to 23,500 BTU models (weighing 70 to 140 lbs), our technicians install standard exterior window AC brackets to prevent sill damage."
    },
    {
        q: "How much is professional double-hung window AC installation?",
        a: "Standard window AC installation starts at $275. Our licensed technicians handle complete mounting, precision pitch leveling, side panel foam insulation, and electrical safety testing."
    }
];

export default function DoubleHungWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Double-Hung Window AC Installation' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Maximize2 className="size-3.5" />
                        <span>Traditional Sash Windows &bull; Precision Pitch & Sealing</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Double-Hung Window AC <span className="text-primary italic">Installation Hawaii</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Traditional up-and-down double-hung sash windows require exact leveling, secure top-rail locking, and closed-cell foam insulation to prevent drafts and rainwater intrusion. Our licensed HVAC professionals deliver clean, secure, and airtight installations across Oahu.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Units with Installation
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Book Installation: (808) 488-1111"
                            eventLabel="Double Hung Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Core Installation Steps */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Lock className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Top-Rail Sash Locking</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            The unit’s top flange interlocks firmly behind the lowered sash frame, preventing forward tipping or displacement in high trade winds.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Droplets className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Precision Gravity Pitch</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We calibrate a clean 1/4-inch backward angle to ensure tropical condensation drains outside rather than pooling on your window sill.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Standard Brackets</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            For units over 10,000 BTU, we install standard exterior window AC brackets to relieve load stress from older sash frames.
                        </p>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                SIGNATURE ALOHA CRAFTSMANSHIP
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth Standard
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our licensed technicians lay protective floor drop cloths under every window during work and vacuum any incidental dust or wood shavings, leaving your home cleaner than when we arrived.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>$45 Rebate Qualified:</strong> All qualifying Energy Star Dual Inverter window models come with the pre-approved Hawaii Energy application PDF.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up in Waipahu or choose flat $50 island-wide delivery with professional installation scheduling.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View In-Stock Window ACs
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Double-Hung Window AC FAQs
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
                    title="Double-Hung Window AC Reviews"
                    subtitle="Real reviews from Oahu homeowners with traditional sash windows"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
