'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Wrench, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Zap,
    Gauge,
    DollarSign,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What is included in the $175 AC Diagnostic Service?",
        a: "Our $175 flat-rate diagnostic covers complete on-site troubleshooting: digital refrigerant pressure checks, electrical capacitor microfarad testing, compressor winding amp draw analysis, inverter circuit board error code diagnosis, and temperature delta-T split evaluation."
    },
    {
        q: "Are there extra hidden fees or trip charges depending on my Oahu town?",
        a: "No hidden trip charges. Our $175 diagnostic fee is transparent across all 22 Oahu municipalities, from Honolulu and Pearl City to Kailua, Kaneohe, Kapolei, and the North Shore."
    },
    {
        q: "How quickly can a technician arrive for emergency diagnostics?",
        a: "We maintain daily dispatch across Oahu. When an air conditioner stops cooling during humid summer days, call (808) 488-1111 for same-day or next-day priority triage."
    },
    {
        q: "What if the repair is simple—is it done during the visit?",
        a: "Yes. Our service vans are stocked with common run capacitors, contactors, fuses, thermistors, and condensate fittings. If your issue is a simple component failure, we can often repair it on the spot with upfront pricing."
    }
];

const DIAGNOSTIC_STEPS = [
    {
        step: "01",
        title: "Electrical Circuit Analysis",
        desc: "We test incoming supply voltage (115V/230V), inspect disconnect switches, check contactors for pitting, and verify capacitor capacitance."
    },
    {
        step: "02",
        title: "Refrigerant & Thermal Pressures",
        desc: "Using digital HVAC gauges, we read subcooling and superheat levels to detect slow refrigerant leaks, restrictions, or thermal expansion valve faults."
    },
    {
        step: "03",
        title: "Compressor Amperage & Winding Test",
        desc: "We measure running load amps (RLA) and locked rotor amps (LRA) to verify compressor motor health and ensure no grounded windings."
    },
    {
        step: "04",
        title: "Inverter Logic & Sensor Check",
        desc: "For mini splits, we read onboard LED error flash codes and test thermistor resistance across evaporator and outdoor ambient sensors."
    }
];

export default function AcDiagnosticPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Diagnostic Service ($175 Flat Rate)' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Wrench className="size-3.5" />
                        <span>Licensed Contractor CT-36775 &bull; Island-Wide Flat Rate Service</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Diagnostic Service <span className="text-primary italic">Oahu ($175 Flat Rate)</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        No mystery quotes, surprise travel fees, or pushy sales tactics. Our licensed HVAC technicians perform complete electrical, refrigerant, and mechanical troubleshooting on ductless mini splits and window units for a clear <span className="text-white font-bold">$175 flat rate</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/appointment"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $175 Diagnostic Call
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Dispatch Desk: (808) 488-1111"
                            eventLabel="Diagnostic Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* What We Test Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">FIELD TROUBLESHOOTING PROTOCOL</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            What the $175 Diagnostic Covers
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {DIAGNOSTIC_STEPS.map((s, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{s.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Honest Pricing Promise */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                NO SURPRISE INVOICING
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Our By-Appointment-First Guarantee
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                We believe in 100% upfront clarity. We explain what failed, show you the meter readings, and provide an exact, itemized estimate before any tools touch your machine.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If your equipment is beyond repair, we guide you toward energy-efficient replacement options from our Waipahu warehouse with available <strong className="text-emerald-400">$45 Hawaii Energy rebates</strong> on qualifying window ACs.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Complete Diagnostic Fee</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Oahu Coverage</span>
                                <span className="font-header font-bold text-xs text-white">All 22 Municipalities</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">In-Home Mini Split Estimate</span>
                                <span className="font-header font-bold text-xs text-emerald-400">$0 Free</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Hawaii Contractor License</span>
                                <span className="font-header font-bold text-xs text-white">CT-36775</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Diagnostic Service FAQs
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
                    title="Diagnostic & Repair Reviews"
                    subtitle="Honest troubleshooting verified across Oahu neighborhoods"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
