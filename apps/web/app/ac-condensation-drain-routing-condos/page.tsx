'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Droplets, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Building2,
    Pipette,
    AlertCircle,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why is AC condensation drainage a serious issue in Oahu condos?",
        a: "During humid Hawaiian summers, a single window AC can extract 2 to 5 gallons of water daily from indoor air. If left to drip freely, water falls onto downstairs neighbors' balconies, patio furniture, or public building walkways, triggering immediate HOA citations and neighbor disputes."
    },
    {
        q: "How does professional condensation drain routing work?",
        a: "Our technicians install a sealed drain pan adapter nozzle on the base of your window AC and connect reinforced, UV-resistant vinyl tubing. We route the hose cleanly along the wall or railing to a dedicated lanai floor drain, drainage scupper, or discrete collection container."
    },
    {
        q: "Does drain routing affect cooling efficiency?",
        a: "No. Modern window ACs are engineered with dual drain ports or sling fans. Our technicians install drain kits in compliance with factory guidelines to ensure smooth water evacuation without hindering condenser coil heat dissipation."
    },
    {
        q: "Can this be added to my existing window AC installation?",
        a: "Yes! If you received an HOA violation letter or your neighbor complained about dripping water, we can retrofit a clean condensation drainage routing kit onto your existing air conditioner."
    }
];

export default function AcCondensationDrainRoutingCondosPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Condensation Drain Routing for Condos' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Droplets className="size-3.5" />
                        <span>Stop Balcony Dripping &bull; HOA Citation Prevention &bull; Clean Routing</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Condensation Drain Routing <span className="text-primary italic">for Oahu Condos</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        In Hawaii’s humid climate, a window air conditioner pulls up to 5 gallons of water every day from the air. Dripping water onto your downstairs neighbor’s lanai or walkway leads to costly HOA fines and friction. Our custom drain routing kits channel condensation safely away.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Units with Drain Kits
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Drainage Specialist: (808) 488-1111"
                            eventLabel="Condo Drain Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* The 3 Drain Routing Features */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Pipette className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Sealed Base Nozzle</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            A sealed brass or PVC drain nozzle installs into the unit’s base pan, capturing 100% of condensation before it overflows.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Building2 className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">HOA Fine Defense</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Zero dripping over building ledges. Satisfies strict condo association covenants in Honolulu, Salt Lake, and Waikiki.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Clean Wall Routing</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            UV-stabilized clear or neutral-colored tubing is clipped neatly along the exterior railing straight to a floor drain or planter.
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
                                Our licensed technicians treat your condo with the highest level of care. We lay protective floor drop cloths under every window during installation, testing drain line water flow thoroughly before completing the job.
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
                            Condo Drainage FAQs
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
                    title="Condo AC Drainage Reviews"
                    subtitle="Real reviews from Oahu residents who solved balcony water dripping"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
