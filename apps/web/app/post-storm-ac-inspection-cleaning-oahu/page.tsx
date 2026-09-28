'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    CloudLightning, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Wind,
    Droplets,
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
        q: "Should I turn off my AC during a storm?",
        a: "Yes. High wind gusts can cause head pressure spikes that force outdoor fans to stall, and island grid brownouts or lightning surges can instantly destroy expensive DC inverter control boards. Switch off the circuit breaker until winds pass."
    },
    {
        q: "What damage can a Kona storm cause to an outdoor AC condenser?",
        a: "Kona storms blow heavy southern marine salt spray, palm fronds, gravel, and standing water into condenser housings. This corrodes electrical disconnect terminals, clogs heat-exchange fins, and can jam the outdoor fan motor."
    },
    {
        q: "What is included in a post-storm AC inspection by Affordable Home A/C?",
        a: "We clear internal debris, flush wind-driven salt from coils, test the disconnect switch and contactor, inspect refrigerant line insulation, test electrical capacitor ratings, and run a full operational cycle for a $175 flat rate."
    },
    {
        q: "What if my AC won't power back on after the storm?",
        a: "First check your main electrical panel to see if the two-pole AC breaker tripped. If resetting it immediately causes it to trip again, do not force it—a short circuit or grounded motor winding may be present. Call our dispatch desk for emergency diagnostics."
    }
];

const STORM_CHECKLIST = [
    {
        title: "Salt Encrustation & Debris Extraction",
        desc: "High winds pack leaves, twigs, and a heavy crust of sea salt into the condenser coil. We flush the coil matrix clean with fresh water and foaming cleaner."
    },
    {
        title: "Electrical Box Moisture Check",
        desc: "Driving rain often penetrates outdoor disconnect boxes and whip conduits. We dry and seal electrical connections to prevent short circuits."
    },
    {
        title: "Fan Blade & Motor Free-Spin Test",
        desc: "We manually verify the fan rotates smoothly on its bearings without bent blades rubbing against fan grilles or storm debris."
    },
    {
        title: "Inverter Board Voltage & Capacitance Test",
        desc: "Power surges during island storms stress capacitors. We test microfarad ratings and DC inverter voltages against factory specifications."
    }
];

export default function PostStormInspectionPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Post-Storm AC Inspection & Cleaning' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <CloudLightning className="size-3.5" />
                        <span>Kona Storm Recovery &bull; $175 Comprehensive Inspection</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Post-Storm AC Inspection <span className="text-primary italic">& Cleaning Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Heavy Kona storm winds, torrential tropical downpours, and flying marine salt can cripple your air conditioner&apos;s outdoor condenser. Our licensed technicians inspect electrical components, clear debris, and flush salt crusting for safe restart.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/ac-repair-oahu"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $175 Post-Storm Inspection
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Storm Dispatch: (808) 488-1111"
                            eventLabel="Post Storm Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Inspection Checklist */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">FIELD DIAGNOSTIC PROTOCOL</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The 4 Critical Storm Safety Checks
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {STORM_CHECKLIST.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-amber-400/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{item.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing & Guarantee */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                RAPID RECOVERY
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Honest Diagnostics with No Pressure
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our $175 flat-rate diagnostic covers the complete inspection of outdoor and indoor components. If simple clearing or electrical re-sealing is needed, we do it on the spot. If major storm damage requires parts, we provide a transparent quote before any repair proceeds.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Contractor License CT-36775:</strong> Professional diagnosis by licensed Hawaii technicians.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Storm Diagnostic & Inspection</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Exterior Coil Salt Wash</span>
                                <span className="font-header font-bold text-xs text-white">Included</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Drop-Cloth Protection Indoors</span>
                                <span className="font-header font-bold text-xs text-emerald-400">100% Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Post-Storm FAQs
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
                    title="Storm Recovery Reviews"
                    subtitle="Fast response and verified cooling restored following island storms"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
