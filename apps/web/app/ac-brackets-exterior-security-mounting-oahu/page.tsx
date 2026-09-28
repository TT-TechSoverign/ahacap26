'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    ShieldCheck, 
    Wrench, 
    ArrowRight, 
    Anchor, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Ruler,
    Layers,
    AlertTriangle
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why are standard exterior support brackets necessary for window ACs?",
        a: "Window air conditioners weigh between 50 and 140 lbs, with over 70% of the weight hanging outside the window. Standard exterior support brackets anchor to the exterior wall sill to bear this cantilever load, preventing your window frame or vinyl sill from warping, cracking, or collapsing."
    },
    {
        q: "Are exterior window AC brackets required for second-story installations?",
        a: "Yes. On second-story installations, exterior support brackets are essential for safety, ensuring the unit cannot tip backwards or shift during severe trade wind storms."
    },
    {
        q: "Are brackets included with installation?",
        a: "Standard window AC installation covers standard mounting. Heavy-duty standard exterior support brackets and custom sill anchoring hardware are available as an additional cost option depending on window frame and exterior wall construction."
    },
    {
        q: "Will bracket installation damage my window sill?",
        a: "Our technicians use rubber-dampened foot pads and precision mounting screws that distribute the weight without crushing wooden sills or puncturing vinyl water channels."
    }
];

export default function AcBracketsExteriorSecurityMountingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Exterior Support Brackets & Mounting' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Anchor className="size-3.5" />
                        <span>Cantilever Load Engineering &bull; Sill Protection &bull; Second-Story Safety</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Exterior Support Brackets <span className="text-primary italic">& Mounting Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Over 70% of a window AC’s heavy weight hangs outside your home. Without proper cantilever support, units can warp vinyl sills, crush wooden frames, or create hazardous fall risks on second-story lanais. Our licensed technicians install standard exterior window AC support brackets engineered for island conditions.
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
                            display="Call Bracket Specialists: (808) 488-1111"
                            eventLabel="Bracket Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Why Brackets Matter */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Cantilever Weight Transfer</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Heavy 18,000 and 23,500 BTU units (110–140 lbs) place immense downward pressure on sills. Brackets transfer 100% of this force safely into exterior wall studs.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Layers className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Protects Window Tracks</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Modern vinyl and aluminum sliding tracks are easily cracked or bent by direct AC weight. Exterior brackets elevate the chassis clear of the track.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Anchor className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Second-Story Security</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Mandatory for second-story bedroom windows, townhomes, and high-rise walk-ups to prevent catastrophic accidental drops.
                        </p>
                    </div>
                </section>

                {/* Installation Scope & Bracket Options */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                UPFRONT OPTIONS & ESTIMATES
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Standard Support Brackets (Additional Cost Option)
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Standard window AC installation covers direct sash mounting. Where structural support brackets are needed for heavy units, second stories, or delicate vinyl sills, our technicians supply and install standard exterior window AC brackets as an additional cost option with installation.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> Our licensed technicians lay protective floor drop cloths under every unit and leave your home cleaner than when we arrived.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Wrench className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Hawaii Licensed Contractor CT-36775</h3>
                            <p className="text-xs text-slate-300">
                                Installed by licensed HVAC technicians adhering to Hawaii safety standards and building practices.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View Window AC Models
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Support Bracket FAQs
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
                    title="Window AC Installation Reviews"
                    subtitle="Trusted mounting and installation across Oahu residences"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
