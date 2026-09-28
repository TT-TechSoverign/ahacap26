'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Minimize2, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Ruler,
    Wrench,
    Volume2,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What is the smallest window width that can fit an air conditioner?",
        a: "By removing standard side accordion curtains and using our custom narrow-mounting brackets, our compact 6,000 BTU LG Dual Inverter unit (chassis width 19.5 inches) can fit into window openings as narrow as 20 to 21 inches wide."
    },
    {
        q: "Can you install an AC in a tall, narrow slider or casement window?",
        a: "Yes! For tall, skinny openings, we build custom acrylic or insulated vertical filler panels above the unit, sealing the vertical height while fitting the narrow width perfectly."
    },
    {
        q: "Does a narrow window AC provide enough cooling for an Oahu bedroom?",
        a: "Yes! A compact 6,000 to 8,000 BTU Dual Inverter unit delivers ample cooling power for bedrooms up to 350 sq ft, while running quietly at 44 dB."
    },
    {
        q: "Do narrow window ACs qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! Qualifying Energy Star certified Dual Inverter models qualify for the official $45 cash rebate from Hawaii Energy. We provide the application PDF with your receipt."
    }
];

export default function NarrowWindowAcSolutionsPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Narrow Window AC Solutions' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Minimize2 className="size-3.5" />
                        <span>Fits Openings Under 22 Inches &bull; Custom Vertical Framing</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Narrow Window AC Solutions <span className="text-primary italic">Hawaii</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Have a tight, narrow window opening that standard big-box store air conditioners won’t fit into? Our compact 19.5-inch chassis LG Dual Inverters, combined with custom narrow-frame installation techniques, deliver whisper-quiet 44 dB cooling into tight island window openings.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Compact Inverter Models
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Narrow Window Desk: (808) 488-1111"
                            eventLabel="Narrow Window Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Narrow Engineering Features */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Ruler className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">19.5&quot; Slim Chassis</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Our compact 6,000 BTU models have an ultra-slim footprint designed to squeeze into narrow window frames with ease.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Accordion Removal</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We remove bulky side accordion curtains and custom-fabricate ultra-slim foam perimeter seals for ultra-tight fits.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Volume2 className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">44 dB Whisper Sleep</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Compact size does not mean loud operation. Enjoy whisper cooling ideal for bedrooms and home offices.
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
                                Our licensed technicians treat your home with great care. We lay protective floor drop cloths under every window during installation and leave your home cleaner than when we arrived.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Standard Brackets:</strong> We supply and install standard exterior window AC support brackets as an additional cost option with installation to safely support heavy units.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up in Waipahu or choose flat $50 island-wide delivery with installation scheduling.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View Compact Models
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Narrow Window AC FAQs
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
                    title="Narrow Window AC Reviews"
                    subtitle="Real reviews from Oahu homeowners with compact window openings"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
