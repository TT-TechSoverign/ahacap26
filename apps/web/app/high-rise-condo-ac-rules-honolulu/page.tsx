'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Building2, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Anchor,
    Droplets,
    FileText,
    Volume2
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What safety precautions are required when installing a window AC in a Honolulu high-rise?",
        a: "In high-rise towers, our licensed technicians use industrial safety tether lanyards that anchor the AC chassis to the interior building structure throughout the entire mounting process, mathematically eliminating any risk of falling debris or equipment drop onto sidewalks or lanais below."
    },
    {
        q: "How is condensation handled in high-rise condominiums?",
        a: "High-rise condo bylaws strictly forbid water dripping onto lower balconies or street traffic. Our technicians install sealed condensation drain tubing connected to internal drain traps or collection reservoirs."
    },
    {
        q: "Do you coordinate with building management and freight elevators?",
        a: "Yes! We coordinate directly with building managers, security, and resident associations across Waikiki, Kakaako, and urban Honolulu, providing Certificates of Insurance (COI) and booking freight elevator windows."
    },
    {
        q: "Are LG Dual Inverters approved for high-rise condos?",
        a: "Yes! At 44 dB, they comply with strict multi-unit decibel limits and run on standard 115V circuits."
    }
];

export default function HighRiseCondoAcRulesHonoluluPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'High-Rise Condo Window AC Rules Honolulu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Building2 className="size-3.5" />
                        <span>Waikiki &bull; Kakaako &bull; Makiki Towers &bull; Safety Tether Protocol</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        High-Rise Condo Window AC <span className="text-primary italic">Rules Honolulu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Installing a window air conditioner 15 stories above Ala Moana or Waikiki demands rigorous safety protocols and complete AOAO/HOA compliance. We manage building management coordination, COI issuance, safety lanyard rigging, and zero-drip drain routing.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop High-Rise Ready Units
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="High-Rise Desk: (808) 488-1111"
                            eventLabel="High Rise AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* High-Rise Safety Pillars */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Anchor className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Safety Tether Protocol</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Units are tethered to internal anchor points with heavy-duty safety cables throughout installation, ensuring 0% risk of exterior drops.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Droplets className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Zero-Drip Drain Routing</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We install enclosed condensate tubing routing drainage away from lower balconies, preventing HOA fines and water complaints.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <FileText className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">COI & Management</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            We provide Certificates of Insurance (COI) directly to your resident manager and book freight elevator logistics seamlessly.
                        </p>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                RESPECTING LUXURY CONDO LIVING
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth Standard
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our technicians protect your flooring, furniture, and common condo corridors. We lay clean floor drop cloths under every window during work and leave your residence cleaner than when we arrived.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>$45 Rebate Qualified:</strong> All qualifying Energy Star Dual Inverter window models come with the pre-approved Hawaii Energy application PDF.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up in Waipahu or choose flat $50 island-wide delivery with coordinated freight elevator arrival.
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
                            High-Rise Condo AC FAQs
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
                    title="High-Rise Resident Reviews"
                    subtitle="Trusted in towers across Waikiki, Kakaako & Makiki"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
