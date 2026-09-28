'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    ShieldCheck, 
    Lock, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Ruler,
    Wind,
    Wrench,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Can a window AC be installed if my window has exterior security bars?",
        a: "Yes! Many Oahu residences in Kalihi, Waipahu, Palama, and McCully have wrought-iron security bars. If the bar clearance is at least 10 to 14 inches from the window sash, a compact unit can slide into place. If clearances are tighter, our technicians use specialized bracket mounting or interior slide-in configurations."
    },
    {
        q: "Does installing an AC compromise my home's window security?",
        a: "No. We install sash-locking security hardware and heavy-gauge steel bracket ties that prevent the unit or window sash from being pushed inward from the outside, keeping your home fully secure."
    },
    {
        q: "Do security bars restrict the air conditioner's exhaust airflow?",
        a: "Our technicians verify at least 4 to 6 inches of clearance between the outdoor condenser coil and the security bar metal to prevent warm air recirculation, ensuring peak cooling efficiency."
    },
    {
        q: "What window AC size fits best behind security bars?",
        a: "Compact 6,000 to 10,000 BTU LG Dual Inverter models feature shallower outdoor chassis depths, making them the easiest and most versatile units to fit behind exterior burglar bars."
    }
];

export default function SecurityBarsWindowAcInstallationPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Security Bars Window AC Installation' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Lock className="size-3.5" />
                        <span>Kalihi &bull; Waipahu &bull; Palama &bull; Burglar Grille Clearance Experts</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Security Bars Window AC <span className="text-primary italic">Installation Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Exterior wrought-iron security bars provide essential peace of mind, but installing a window air conditioner around them requires precise clearance engineering and airflow calibration. We fit shallow-depth LG Dual Inverters securely without compromising your home’s security.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Shallow-Depth Inverters
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Consult Tech: (808) 488-1111"
                            eventLabel="Security Bars AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Technical Clearance Pillars */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Ruler className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Depth Calibration</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We match shallow-chassis 6,000 to 10,000 BTU models to fit perfectly within the narrow space between your window glass and exterior bars.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wind className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Airflow Clearance</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Ensures the outdoor compressor fan has unobstructed exhaust clearance, preventing thermal overheat and compressor shutdown.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Intrusion Locking</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Anti-push window sash locks and heavy steel anchors ensure the AC cannot be dislodged or removed by outside intruders.
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
                                View Inverter Inventory
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Security Bar AC Installation FAQs
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
                    title="Security Bar AC Reviews"
                    subtitle="Trusted installations across Kalihi, Waipahu & urban Honolulu homes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
