'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    RefreshCw, 
    ShieldCheck, 
    ArrowRight, 
    Trash2, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    VolumeX,
    TrendingDown,
    Wrench
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "When should I replace my window AC instead of cleaning or repairing it?",
        a: "If your window AC is over 4 to 5 years old, has severe chassis rust from salt air, is making loud bearing grinding noises, or is an older non-inverter unit driving up your HECO bill, replacing it with an LG Dual Inverter ($504 to $1,025) is far more economical than expensive component repairs."
    },
    {
        q: "Can you haul away and dispose of my old window AC?",
        a: "Yes! When you book our professional installation service with your new unit, our licensed technicians can safely remove and haul away your old rusted air conditioner for certified eco-friendly recycling."
    },
    {
        q: "Will the new window unit fit my existing opening?",
        a: "Our technicians measure your window or jalousie opening to ensure proper fitment. We install new side accordion panels or custom filler materials to guarantee an airtight, insect-proof seal."
    },
    {
        q: "Does my replacement unit qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! All qualifying Energy Star certified LG Dual Inverter models qualify for an official $45 cash rebate from Hawaii Energy. We provide the application PDF with your receipt."
    }
];

export default function WindowAcReplacementPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Window AC Replacement Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <RefreshCw className="size-3.5" />
                        <span>Swap Old Rattling Units &bull; Haul-Away Available</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Replacement <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your current window air conditioner rattling, blowing lukewarm air, covered in coil rust, or driving your electric bill over \$300? Swap it out for a modern, whisper-quiet LG Dual Inverter with professional replacement and old-unit haul-away.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Replacement Inverter Units
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Replacement Desk: (808) 488-1111"
                            eventLabel="AC Replacement Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Clean vs Replace Decision Matrix */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-2">
                            THE 4-YEAR DECISION MATRIX
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Should You Clean It or Replace It?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-400 font-header font-bold text-lg uppercase">
                                <Wrench className="size-5" />
                                <span>Rinse Washable Filter ($0 Free DIY)</span>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-300 font-sans">
                                <li>&bull; Unit is under 3 years old and cooling well</li>
                                <li>&bull; Only front mesh filter has lint or dust accumulation</li>
                                <li>&bull; Coils and internal fan are clean with no deep mildew odor</li>
                                <li>&bull; Restores full airflow in 10 minutes at zero cost</li>
                            </ul>
                            <div className="pt-2">
                                <Link href="/clean-vs-replace-window-ac" className="text-xs text-primary underline">
                                    Read full Clean vs Replace Guide &rarr;
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                            <div className="flex items-center gap-2 text-primary font-header font-bold text-lg uppercase">
                                <RefreshCw className="size-5" />
                                <span>Replace with New Inverter ($504 - $1,025)</span>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-300 font-sans">
                                <li>&bull; Unit is 4+ years old with crumbling aluminum fins</li>
                                <li>&bull; Compressor groans, clicks, or shakes window frame</li>
                                <li>&bull; Fixed-speed non-inverter consuming massive HECO power</li>
                                <li>&bull; Replacement qualifies for $45 cash rebate</li>
                            </ul>
                            <div className="pt-2">
                                <Link href="/shop" className="text-xs text-primary underline">
                                    Browse In-Stock Replacement Models &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Replacement Service Features */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <VolumeX className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Eliminate Window Rattle</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Dual Inverter compressors eliminate heavy startup vibration, ending the constant buzzing against your window glass.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Trash2 className="size-8 text-rose-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Old Unit Haul-Away</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Don’t let your heavy old unit clutter your garage or lanai. Our team can safely haul it away for licensed disposal.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <TrendingDown className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Slash Power Bills</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Modern CEER 14.5–15.0 units cut electrical waste immediately, saving up to 40% on running costs.
                        </p>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL INSTALLATION ADD-ON
                            </span>
                            <h3 className="text-2xl font-header font-black uppercase text-white">
                                Drop-Cloth Clean Jobsite Standard
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Swapping an old window unit can be messy—years of trapped dust, dried leaves, and rust can fall when the old unit is pulled. Our licensed technicians (Contractor License CT-36775) lay protective floor drop cloths under every unit and leave your home cleaner than when we arrived.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Standard Brackets:</strong> We inspect your sill and install standard exterior window AC brackets when needed for solid exterior support.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h4 className="font-header font-bold text-base uppercase text-white">Waipahu Warehouse Ready</h4>
                            <p className="text-xs text-slate-300">
                                Pick up your new unit today in Waipahu or choose flat $50 island-wide delivery with installation scheduling.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Choose Replacement Model
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Window AC Replacement FAQs
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
                    title="AC Replacement Success Stories"
                    subtitle="Real reviews from Oahu homeowners who swapped out old units"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
