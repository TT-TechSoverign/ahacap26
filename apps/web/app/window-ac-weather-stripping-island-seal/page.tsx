'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Wind, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Bug,
    CloudRain,
    Lock,
    Zap
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why is proper weather sealing critical for window ACs in Hawaii?",
        a: "Unsealed window gaps allow chilled air to escape and hot humid trade winds to blow in, forcing your AC to run continuously and driving up your HECO bill. Gaps also invite geckos, ants, and flying insects inside."
    },
    {
        q: "What materials do you use to seal around the window AC?",
        a: "We use high-density closed-cell marine-grade weather stripping foam, UV-resistant vinyl gaskets, and rigid insulated side panels rather than cheap open-cell sponge foam that degrades under tropical sunlight."
    },
    {
        q: "Does weather stripping prevent rainwater from leaking inside during storms?",
        a: "Yes. Our technicians install compression gaskets along top and bottom sashes and verify proper 1/4-inch backward pitch so wind-driven tropical rains drain safely outside away from your interior sills."
    },
    {
        q: "Can this be added to my existing window AC installation?",
        a: "Yes! If you have drafts, gecko intrusion, or rattling accordion curtains, our technicians can reseal your existing unit with premium island-grade materials."
    }
];

export default function WindowAcWeatherStrippingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Window AC Weather Stripping & Island Seal' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Wind className="size-3.5" />
                        <span>Airtight Thermal Barrier &bull; Bug & Gecko Defense</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Weather Stripping <span className="text-primary italic">& Island Seal Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        A high-efficiency air conditioner is only as good as the seal around it. Cheap factory foam strips dry out under Oahu’s UV rays, leaking expensive cooled air and letting in rain, trade wind dust, and geckos. Our high-density closed-cell sealing locks your cool air inside.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Units with Professional Sealing
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Sealing Specialist: (808) 488-1111"
                            eventLabel="Weather Seal Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* The 3 Hazards of Poor Sealing */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Zap className="size-8 text-rose-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Expensive Cold Air Leaks</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Drafts around accordion curtains force your unit to run overtime on Oahu’s ~44.2¢/kWh tariff, wasting up to $40/month in lost electricity.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Bug className="size-8 text-amber-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Geckos & Island Insects</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Gaps as thin as 1/8 inch are highway corridors for geckos, mosquitoes, and centipedes crawling in from outside garden foliage.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <CloudRain className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Tropical Rain Intrusion</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Driving trade wind rains can soak interior window sills, rotting wood framing and promoting toxic black mold growth behind drywall.
                        </p>
                    </div>
                </section>

                {/* Island Grade Materials & Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL INSTALLATION BENEFIT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Marine-Grade Closed-Cell Foam
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                When our licensed technicians install your window AC, we don’t use flimsy paper-thin factory foam. We install durable, UV-stabilized closed-cell neoprene gaskets and custom insulated backer panels that resist tropical humidity and trade wind pressure.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> Our technicians lay clean floor drop cloths under every window and leave your home cleaner than when we arrived.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <ShieldCheck className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Hawaii Contractor License CT-36775</h3>
                            <p className="text-xs text-slate-300">
                                Expert weather sealing included with all professional window AC installations across Oahu.
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
                            Weather Sealing FAQs
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
                    title="Sealing & Installation Reviews"
                    subtitle="Real reviews from Oahu homeowners enjoying draft-free cooling"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
