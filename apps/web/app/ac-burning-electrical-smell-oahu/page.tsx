'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Flame, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Zap,
    Power,
    ShieldAlert,
    Wrench,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What should I do immediately if I smell burning electrical plastic from my AC?",
        a: "Immediately shut off the air conditioner at the remote or thermostat, and go straight to your main electrical panel to switch the 240V AC breaker completely OFF. Do not leave the system energized, as overheating wires can ignite surrounding building materials."
    },
    {
        q: "What causes an air conditioner to produce a burning electrical odor?",
        a: "The most frequent causes are high-resistance electrical connections where terminal screws have loosened, causing wire insulation to melt; an overheating blower fan motor with seized bearings; or a ruptured capacitor leaking hot dielectric fluid."
    },
    {
        q: "Why does a burning electrical issue sometimes smell like dead fish?",
        a: "When the plastic and resin binders in electrical circuit breakers, contactors, or terminal blocks overheat, they release pungent amine compounds that produce a strong, unmistakable fish-like chemical odor."
    },
    {
        q: "Can I turn the AC back on if the smell dissipates?",
        a: "No. The smell may decrease once the unit stops running, but the melted wiring, compromised insulation, or damaged capacitor remains a severe fire hazard. Keep the breaker OFF until a licensed HVAC technician inspects the terminals."
    }
];

const EMERGENCY_ACTIONS = [
    {
        step: "01",
        title: "Shut Off the System",
        desc: "Turn off the cooling mode via the handheld remote or wall thermostat immediately to kill the run signal."
    },
    {
        step: "02",
        title: "Flip the 240V Breaker OFF",
        desc: "Walk to your main electrical panel and switch the double-pole AC breaker completely to the OFF position."
    },
    {
        step: "03",
        title: "Evacuate the Room if Smoke Appears",
        desc: "If visible gray smoke or sparks are observed, evacuate the room and ensure all family members are safe."
    },
    {
        step: "04",
        title: "Call Emergency Dispatch",
        desc: "Call (808) 488-1111 for rapid electrical triage by a licensed CT-36775 HVAC technician."
    }
];

export default function AcBurningSmellPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Burning Electrical Smell' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Flame className="size-3.5" />
                        <span>Immediate Safety Advisory &bull; Breaker Shutoff Protocol</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Burning Electrical Smell? <span className="text-primary italic">Emergency Actions & Repair Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Smelling acrid burning plastic, melted wire coating, or an unmistakable fishy chemical odor from your AC vents? This is an electrical emergency. Follow our critical shutoff safety steps and contact our licensed technicians immediately.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/appointment"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-rose-500 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-400 transition-all shadow-lg shadow-rose-500/20 hover:scale-[1.02]"
                        >
                            Book Emergency Diagnostic ($175)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Emergency Desk: (808) 488-1111"
                            eventLabel="Burning Smell Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 4 Emergency Steps */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-rose-400 uppercase font-bold tracking-wider block mb-2">DO THIS RIGHT NOW</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Immediate Safety Protocol
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {EMERGENCY_ACTIONS.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-rose-500/40 transition-all space-y-3">
                                <span className="font-mono text-2xl font-black text-rose-400">{item.step}</span>
                                <h3 className="font-header font-bold text-sm uppercase text-white">{item.title}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Professional Inspection Details */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL ELECTRICAL AUDIT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Thermal Imaging & Terminal Tightening
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our technicians use infrared thermal imaging cameras to inspect contactors, terminal strips, and capacitor connections for hot spots.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                We replace heat-damaged spade connectors, clip back oxidized copper wire to fresh strands, and torque all high-voltage electrical lugs to manufacturer specifications to eliminate future fire hazards.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Diagnostic Fee</span>
                                <span className="font-header font-bold text-lg text-rose-400">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Thermal Imaging Inspection</span>
                                <span className="font-header font-bold text-xs text-white">Included</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Hawaii Contractor License</span>
                                <span className="font-header font-bold text-xs text-emerald-400">CT-36775</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Burning Smell FAQs
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
                    title="Safety Repair Reviews"
                    subtitle="Fast response and safe electrical restoration across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
