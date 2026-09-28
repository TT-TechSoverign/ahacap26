'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Maximize, 
    ShieldCheck, 
    ArrowRight, 
    Sliders, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Ruler,
    Wrench,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Can you install a standard window AC in a horizontal sliding window?",
        a: "Yes! Because standard window ACs are designed for up-and-down hung windows, installing them in horizontal sliders leaves an open vertical space above the unit. Our technicians fabricate clean vertical filler panels (acrylic or insulated paneling) and install standard exterior support brackets to ensure an airtight, secure fit."
    },
    {
        q: "How is the weight supported in a sliding window?",
        a: "Sliding window tracks are made of vinyl or aluminum and are not engineered to hold a 60 to 120 lb air conditioner. We install standard exterior sill support brackets that bear the load securely against the home's exterior sill, protecting the window track from cracking."
    },
    {
        q: "Does this seal against trade wind rain and island geckos?",
        a: "Yes. We apply high-density closed-cell weather stripping around the slider sash and custom filler panel, blocking rain, trade wind drafts, and island insects."
    },
    {
        q: "How much does slider window installation cost?",
        a: "Standard window AC installation starts at $275, with custom vertical filler panels and standard exterior brackets available as an additional cost option depending on window height and track profile."
    }
];

export default function HorizontalSlidingWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Horizontal Sliding Window AC Installation' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sliders className="size-3.5" />
                        <span>Ewa Beach &bull; Kapolei &bull; Mililani Townhomes</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Horizontal Sliding Window AC <span className="text-primary italic">Installation Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Most Oahu townhomes and modern subdivisions feature horizontal sliding windows rather than traditional sash windows. Our licensed technicians fabricate custom vertical filler panels and install standard exterior support brackets for a flawless, weather-tight installation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop In-Stock Window ACs
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Book Slider Install: (808) 488-1111"
                            eventLabel="Slider Install Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Technical Engineering Pillars */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Ruler className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Vertical Filler Panels</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We precision-cut clear acrylic or insulated rigid foam to seal the open vertical channel above the unit cleanly.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Standard Exterior Brackets</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Transfers the unit’s heavy cantilever weight to the outer building sill, completely protecting delicate vinyl sliding tracks.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Weather & Gecko Seal</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Closed-cell perimeter foam prevents tropical moisture intrusion, wind drafts, and island insects from entering your home.
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
                                Our licensed HVAC technicians (Contractor License CT-36775) treat your home with the utmost respect. We lay clean floor drop cloths under every window opening during installation and clean up all debris, leaving your home spotless.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>$45 Rebate Qualified:</strong> All qualifying Energy Star Dual Inverter window models come with the pre-approved Hawaii Energy application PDF.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up in Waipahu or choose flat $50 island-wide delivery with installation scheduling.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Choose Your Inverter Unit
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Sliding Window AC FAQs
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
                    title="Slider Window Installation Reviews"
                    subtitle="Real reviews from townhome owners across Ewa Beach, Kapolei & Mililani"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
