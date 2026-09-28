'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Maximize, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Wrench,
    Layers,
    AlertTriangle,
    ShieldAlert
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Can resting a window AC directly on a vinyl window frame cause damage?",
        a: "Yes! Modern vinyl replacement windows have hollow internal chambers that are not engineered to hold 60 to 120 lbs of dead weight. Resting an AC directly on the thin vinyl sill can permanently bend the track, crack the welded corners, or cause water leakage into the wall."
    },
    {
        q: "How do you safely mount a window AC in a vinyl window?",
        a: "Our technicians install standard exterior window AC support brackets that bear 100% of the unit's weight against the exterior building sill. We bridge the vinyl track with high-density rubber cushion blocks so zero mechanical downward force touches the vinyl frame."
    },
    {
        q: "Does this installation void my vinyl window manufacturer warranty?",
        a: "No. Because our mounting brackets require zero drilling into the vinyl window frame or sills, your window warranty remains completely intact."
    },
    {
        q: "Are support brackets available for vinyl slider windows?",
        a: "Yes! We specialize in both vinyl horizontal sliding windows and single-hung replacement windows across Oahu."
    }
];

export default function VinylReplacementWindowAcMountingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Vinyl Replacement Window AC Mounting' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Maximize className="size-3.5" />
                        <span>Hollow Vinyl Frame Protection &bull; Zero Track Cracking</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Vinyl Replacement Window AC <span className="text-primary italic">Mounting Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Modern double-pane vinyl replacement windows offer great insulation, but their hollow PVC frames crack easily under the weight of an air conditioner. Our specialized load-transfer bracket mounting ensures zero weight rests on delicate vinyl tracks, protecting your investment.
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
                            display="Call Vinyl Window Desk: (808) 488-1111"
                            eventLabel="Vinyl Window Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* The Vinyl Problem & Solution */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldAlert className="size-8 text-rose-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">The Hollow Frame Risk</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Vinyl extrusions have hollow internal chambers. Heavy AC units can warp the lower track, causing sliders to jam and corner welds to crack.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Bridge Cushion Blocks</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We bridge over the hollow track with high-density EPDM rubber blocks, eliminating direct downward pressure on the plastic.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Warranty Preservation</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Our non-invasive mounting requires zero drilling into the vinyl sash or track, preserving your manufacturer window warranty.
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
                                Our licensed HVAC technicians (Contractor License CT-36775) lay protective floor drop cloths under every window during work. We leave your home cleaner than when we arrived, with your vinyl windows fully protected.
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
                                View Inverter Inventory
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Vinyl Window AC FAQs
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
                    title="Vinyl Window Installation Reviews"
                    subtitle="Real reviews from Oahu homeowners with upgraded vinyl windows"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
