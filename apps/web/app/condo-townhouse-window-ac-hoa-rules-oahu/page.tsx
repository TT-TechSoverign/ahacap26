'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Building, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Volume2,
    Eye,
    Droplets,
    FileCheck
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What are common HOA rules for window air conditioners on Oahu?",
        a: "Most Oahu condo boards and townhouse HOAs enforce three main rules: (1) Noise limits—units cannot exceed 50 to 55 dB to avoid disturbing neighbors; (2) Facade appearance—side panels must be neutral white or matching frame colors without unsightly cardboard or duct tape; and (3) Condensation drainage—water cannot drip onto lower lanais, common walkways, or building walls."
    },
    {
        q: "Do LG Dual Inverter window ACs pass strict HOA noise rules?",
        a: "Yes! Operating at as low as 44 dB, LG Dual Inverter units are significantly quieter than older rotary ACs (58+ dB) and pass even the strictest residential decibel rules in Honolulu and Salt Lake condos."
    },
    {
        q: "How do you satisfy HOA condensation drainage requirements?",
        a: "Our licensed technicians can attach custom condensate drain lines to route water safely to a drainage basin, container, or interior drain rather than letting it drip down the building exterior."
    },
    {
        q: "Will you provide documentation for our HOA Architectural Review Committee (ARC)?",
        a: "Yes! We can provide manufacturer specification cut-sheets, dimensions, decibel ratings, and our Hawaii Contractor License (CT-36775) documentation for quick HOA approval."
    }
];

export default function CondoTownhouseWindowAcHoaRulesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Condo & Townhouse Window AC HOA Rules' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Building className="size-3.5" />
                        <span>HOA Compliance Specialists &bull; 44 dB Noise Approval</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Condo & Townhouse Window AC <span className="text-primary italic">HOA Rules Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Installing a window air conditioner in an Oahu condominium or townhouse association requires strict adherence to HOA covenants. Avoid fines and neighbor disputes with our HOA-approved whisper-quiet (44 dB) LG Dual Inverters, clean aesthetic paneling, and managed condensation drainage.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop HOA-Compliant Models
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call HOA Specialist: (808) 488-1111"
                            eventLabel="HOA AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* The 3 HOA Commandments */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Volume2 className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">44 dB Noise Compliance</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Townhome and condo walls are close. Our 44 dB Dual Inverters operate below HOA noise thresholds, preventing neighbor complaints.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Eye className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Facade Aesthetics</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We install clean, uniform white or color-matched acrylic side panels. Zero messy tape, cardboard, or unsightly makeshift fills.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Droplets className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Drainage Management</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Water dripping on downstairs lanais or public sidewalks is the #1 HOA citation. We install drain routing hoses when needed.
                        </p>
                    </div>
                </section>

                {/* HOA Package & Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                ARCHITECTURAL REVIEW SUPPORT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Hassle-Free HOA Approvals
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Need to submit an Architectural Review Form to your board? We can supply product specification sheets verifying dimensions, decibel limits, and electrical draws, alongside our Hawaii Contractor License (CT-36775) and insurance certificate.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> During installation, our technicians lay protective floor drop cloths under every window and leave your home cleaner than when we arrived.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <FileCheck className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Full Compliance Guarantee</h3>
                            <p className="text-xs text-slate-300">
                                In-stock units in Waipahu ready for immediate pickup or flat $50 island-wide delivery and installation.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View Compliant Inverter Units
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Condo HOA AC FAQs
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
                    title="Condo & Townhome Reviews"
                    subtitle="Real reviews from Oahu residents in Salt Lake, Kapolei & Honolulu complexes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
