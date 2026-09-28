'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Sparkles, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Droplets,
    Wind,
    Wrench,
    Zap,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What is included in the $275 Premium Deep Cleaning Teardown?",
        a: "Our $275 Premium Deep Cleaning includes complete removal of the outer plastic shroud, louvers, and condensate drain pan, detachment of the cylindrical blower fan wheel for 360-degree degreasing, high-pressure antimicrobial coil wash, drain line vacuum flush, and reassembly by a licensed CT-36775 technician."
    },
    {
        q: "How does Premium compare to the $175 Basic Mini Split Cleaning?",
        a: "The $175 Basic Cleaning is recommended for annual preventative care where there is light surface dust. The $275 Premium Teardown is essential if you see black mold flecks blowing out of the unit, detect a sour or musty smell, or notice reduced airflow from clogged fan wheel blades."
    },
    {
        q: "How do you protect my home during the deep wash?",
        a: "Technicians lay protective floor drop cloths directly under the indoor unit. Precision rinse containment systems capture all wash water, mold slurry, and chemical runoff directly into closed disposal buckets. Your walls, trim, and flooring remain 100% dry and protected."
    },
    {
        q: "How long does a premium mini split teardown service take?",
        a: "A full teardown typically requires 75 to 90 minutes per indoor high-wall air handler. We take the time necessary to thoroughly sanitize every component, flush the condensate system, and test airflow and temperature delta."
    }
];

const TEARDOWN_STEPS = [
    {
        step: "01",
        title: "Site Prep & Drop Cloths",
        desc: "Protective floor drop cloths are positioned beneath the indoor air handler to guarantee spotless flooring."
    },
    {
        step: "02",
        title: "Chassis & Drain Pan Removal",
        desc: "The front cover, swing louvers, and condensate pan are completely unclipped and dismantled."
    },
    {
        step: "03",
        title: "Blower Fan Wheel Extraction",
        desc: "The cylindrical squirrel-cage fan wheel is pulled from the motor shaft for 360° decontamination."
    },
    {
        step: "04",
        title: "Clinical Chemical Coil Wash",
        desc: "Deep foaming antimicrobial wash penetrates the entire depth of the evaporator coil matrix."
    },
    {
        step: "05",
        title: "Condensate Drain Vacuum Flush",
        desc: "High-volume vacuum flush eliminates algae jelly, slime, and debris from the condensate drain line."
    },
    {
        step: "06",
        title: "Reassembly & Velocity Test",
        desc: "Unit is reassembled, calibrated, and airflow CFM and temperature split are confirmed by our licensed technician."
    }
];

export default function PremiumMiniSplitCleaningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Premium Mini Split Deep Cleaning' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="size-3.5" />
                        <span>Full Teardown Protocol &bull; $275 Flat Rate Per Head</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Premium Mini Split Deep Cleaning <span className="text-primary italic">Oahu (Full Teardown)</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Wiping the front plastic or rinsing the mesh filters only addresses 5% of your AC&apos;s interior. Our licensed HVAC technicians perform complete mechanical teardowns, extracting the blower fan wheel and drain pan to eliminate hidden black mold and restore icy airflow.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $275 Premium Teardown
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Dispatch Desk: (808) 488-1111"
                            eventLabel="Premium Clean Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Service Comparison Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-slate-400 uppercase font-bold tracking-wider">ANNUAL PREVENTATIVE</span>
                            <span className="text-2xl font-black text-white font-header">$175 <span className="text-xs text-slate-400 font-sans font-normal">/ head</span></span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">Basic Mini Split Cleaning</h2>
                        <p className="text-xs text-slate-300 font-sans">
                            Designed for annual maintenance on systems with normal dust accumulation and light seasonal buildup.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Surface coil sanitization & deodorization</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>High-density mesh filter wash & dry</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Gravity condensate drain flush</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Floor drop cloth protection</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Book Basic Service &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-b from-primary/10 to-surface-dark border border-primary/30 space-y-4 shadow-xl shadow-primary/5">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">MOST POPULAR CLINICAL CLEAN</span>
                            <span className="text-2xl font-black text-primary font-header">$275 <span className="text-xs text-slate-400 font-sans font-normal">/ head</span></span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">Premium Deep Teardown</h2>
                        <p className="text-xs text-slate-300 font-sans">
                            Complete disassembly recommended for musty odors, visible black mold on louvers, or units running 2+ years without service.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Complete casing & drain pan disassembly</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Blower fan wheel detached & deep chemical scrubbed</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>High-pressure antimicrobial deep coil wash</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Drain line vacuum clearing & anti-algae tablet treatment</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Book Premium Teardown &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* The Teardown Protocol */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">PRECISION MECHANICAL CLEAN</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The Full Teardown Step-by-Step
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEARDOWN_STEPS.map((s, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <span className="font-mono text-2xl font-black text-primary/60">{s.step}</span>
                                <h3 className="font-header font-bold text-base uppercase text-white">{s.title}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Drop Cloth Promise Banner */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="size-4" />
                            <span>100% Floor & Wall Protection</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                            Floor Drop-Cloth Clean Jobsite Standard
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
                            We treat your home with the utmost care. Clean drop cloths are laid beneath every unit, capturing 100% of moisture and debris. We leave your living space cleaner than when we arrived.
                        </p>
                    </div>
                    <Link 
                        href="/mini_split_ac_maintenance"
                        className="px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider shrink-0"
                    >
                        Schedule Service
                    </Link>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Frequently Asked Questions
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
                    title="Oahu Mini Split Cleaning Reviews"
                    subtitle="Trusted by homeowners in Honolulu, Pearl City, Kaneohe, and Kailua"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
