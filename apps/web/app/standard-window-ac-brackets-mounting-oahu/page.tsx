'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Anchor, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Wrench,
    Layers,
    DollarSign,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What are standard window AC support brackets?",
        a: "Standard window AC support brackets are exterior triangular steel braces that mount under your air conditioner against the outdoor sill or wall. They support the heavy rear compressor section of the unit, transferring stress away from your window sash and sill."
    },
    {
        q: "Do all window air conditioners need support brackets?",
        a: "While small 6,000 to 8,000 BTU units can often rest on sturdy wooden sills, medium and large units (10,000 to 23,500 BTU weighing 70 to 140 lbs), units mounted in vinyl windows, and second-story installations require standard exterior brackets for safety."
    },
    {
        q: "Are standard brackets included in the installation price?",
        a: "Standard window AC installation covers standard direct sash mounting. Where structural support brackets are needed for heavy units, vinyl frames, or second-story safety, standard exterior support brackets are available as an additional cost option with installation."
    },
    {
        q: "Can standard brackets be installed on concrete or stucco walls?",
        a: "Yes! Our technicians carry specialized masonry and stucco expansion anchors designed for secure mounting into Hawaiian hollow tile or concrete walls."
    }
];

export default function StandardWindowAcBracketsMountingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Standard Window AC Brackets & Mounting' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Anchor className="size-3.5" />
                        <span>Sized for 6,000 to 23,500 BTU &bull; Sill Relief &bull; Safe Exterior Support</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Standard Window AC Brackets <span className="text-primary italic">& Mounting Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Ensure rock-solid safety and protect your window sills from warping or collapse. We supply and install heavy-duty standard exterior window AC support brackets sized perfectly for 6,000 to 23,500 BTU units, available as an additional cost option with professional installation.
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
                            display="Call Bracket Team: (808) 488-1111"
                            eventLabel="Standard Bracket Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Sizing & Capacity Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">6,000 – 10,000 BTU</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Compact steel brackets rated for up to 80 lbs. Ideal for vinyl sills and second-story bedroom safety.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Anchor className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">12,000 – 14,000 BTU</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Medium-duty heavy-gauge steel rated for up to 130 lbs. Features precision rubber leveling feet.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">18,000 – 23,500 BTU</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Heavy-duty commercial-grade triangular brackets rated for up to 200 lbs with dual-point exterior anchoring.
                        </p>
                    </div>
                </section>

                {/* Additional Cost Option Notice & Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                OUR SERVICE COMMITMENT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Additional Cost Option with Installation
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Standard window AC installation covers standard direct sash mounting. Where structural support brackets are needed for heavy units, vinyl frames, or second-story safety, standard exterior support brackets are available as an additional cost option with installation.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> Our technicians lay clean floor drop cloths under every unit and leave your home cleaner than when we arrived.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up in Waipahu or choose flat $50 island-wide delivery with installation scheduling.
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
                            Standard Bracket FAQs
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
                    title="Mounting & Installation Reviews"
                    subtitle="Trusted window AC installations across Oahu homes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
