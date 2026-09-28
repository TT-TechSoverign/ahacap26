'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Repeat, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Zap,
    Thermometer,
    Droplets,
    Wrench,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What is air conditioner short cycling?",
        a: "Short cycling occurs when an air conditioner starts up, runs for only 2 to 5 minutes, shuts down abruptly before completing a full cooling cycle, and repeats this sequence continuously. This prevents proper room dehumidification and causes high electrical wear."
    },
    {
        q: "Why does short cycling make my room feel clammy or muggy?",
        a: "Dehumidification requires at least 15 to 20 minutes of continuous coil contact time to condense moisture out of Hawaii's humid air. When an AC shuts off after 3 minutes, it cools the air but leaves the moisture behind, resulting in a cold, clammy, mold-friendly environment."
    },
    {
        q: "Can a dirty air filter cause short cycling?",
        a: "Yes. Restricted airflow prevents room heat from reaching the cooling coils. The evaporator temperature plunges, freezing the coils and triggering the low-pressure or freeze-protection sensor to shut the compressor off prematurely."
    },
    {
        q: "What does your $175 diagnostic cover for short cycling?",
        a: "Our licensed technician tests thermistor resistance against factory temperature curves, checks capacitor microfarad ratings, measures refrigerant pressures, and verifies proper BTU sizing for your room."
    }
];

const SHORT_CYCLE_CAUSES = [
    {
        title: "Dislodged or Defective Thermistor",
        desc: "The ambient temperature sensor clipped to the front of the coil can slip and touch cold aluminum fins directly, tricking the computer board into thinking the room reached setpoint."
    },
    {
        title: "Oversized BTU Cooling Capacity",
        desc: "Installing an 18,000 BTU unit in an 110 sq ft bedroom chills the air in 3 minutes without removing humidity, causing constant rapid on/off cycling."
    },
    {
        title: "Refrigerant Charge Imbalance",
        desc: "Low refrigerant levels or thermal expansion valve (TXV) restrictions trigger high- or low-pressure safety limit switches, killing compressor power."
    },
    {
        title: "Overheating Compressor Motor",
        desc: "Dirty outdoor condenser coils or a failing fan motor causes head pressure to spike, tripping the compressor's internal thermal overload switch."
    }
];

export default function ShortCyclingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Turning On & Off (Short Cycling)' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Repeat className="size-3.5" />
                        <span>Compressor Cycle Protection &bull; Sensor & Electrical Triage</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Turning On and Off Rapidly? <span className="text-primary italic">Short Cycling Fixes Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        If your air conditioner kicks on for a couple of minutes, suddenly shuts down, and repeats this cycle over and over, it is short cycling. This burns out compressors, spikes HECO electric bills, and leaves rooms cold and clammy. Discover how our $175 diagnostic solves it.
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
                            display="Diagnostic Line: (808) 488-1111"
                            eventLabel="Short Cycling Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Root Causes Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">COMMON FAILURE MODES</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The 4 Culprits Behind Rapid Cycling
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SHORT_CYCLE_CAUSES.map((item, idx) => (
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

                {/* Diagnostic Assurance */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL SENSOR TESTING
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Multi-Meter Calibration & Room Sizing
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our licensed technicians test thermistor resistance (k-ohms) at specific temperatures to verify if temperature sensors are drifting out of calibration.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                We also inspect refrigerant subcooling and superheat to confirm the system isn&apos;t cycling on a low-pressure cutoff. If a simple sensor repositioning or replacement is required, we resolve it on the spot.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Complete Diagnostic Fee</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Island-Wide Coverage</span>
                                <span className="font-header font-bold text-xs text-white">All 22 Oahu Cities</span>
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
                            Short Cycling FAQs
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
                    title="Repair Customer Reviews"
                    subtitle="Smooth, continuous cooling restored across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
