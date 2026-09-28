'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Cpu, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Zap,
    Gauge,
    Wrench,
    Flame,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why is my indoor fan running but the outdoor compressor won't kick on?",
        a: "The indoor blower fan and the outdoor compressor operate on separate electrical sub-circuits. Common reasons the compressor fails to start include a blown dual-run capacitor, pitted electrical contactor points, an inverter power module (IPM) error, or a low-pressure refrigerant cutoff."
    },
    {
        q: "Can a bad capacitor cause the compressor to hum and buzz without starting?",
        a: "Yes. A degraded capacitor cannot deliver the microfarad phase-shift boost needed to overcome locked rotor inertia. The compressor will hum for 5-10 seconds, overheat, and trip its internal thermal overload switch."
    },
    {
        q: "Should I turn off the system if the compressor isn't running?",
        a: "Yes, shut off the cooling mode immediately. If the indoor unit calls for cooling while the compressor is locked or repeatedly buzzing, it can burn out compressor motor windings or destroy the control board."
    },
    {
        q: "What does the $175 diagnostic fee cover?",
        a: "Our licensed technician performs on-site electrical multi-meter testing of the capacitor, contactor, circuit board, wiring harness, and compressor terminal resistance (ohms) to pinpoint the exact failure point."
    }
];

const COMPRESSOR_FAILURES = [
    {
        title: "Blown or Bulged Run Capacitor",
        desc: "Hawaii's ambient heat degrades oil-filled capacitors. If capacitance drops below ±10% of rated microfarads, the motor hums but cannot start."
    },
    {
        title: "Burnt or Pitted Contactor Points",
        desc: "Geckos and ants crawling into 240V contactors or natural electrical arcing causes pitted contact points that block high-voltage power."
    },
    {
        title: "DC Inverter IPM Board Fault",
        desc: "On mini splits, the outdoor inverter circuit board converts AC to DC power. Voltage spikes or marine salt corrosion can short the power transistors."
    },
    {
        title: "Thermal Overload Tripped",
        desc: "Clogged condenser coils prevent heat rejection, causing compressor temperatures to exceed 220°F and tripping the internal thermal snap-switch."
    }
];

export default function CompressorNotTurningOnPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Compressor Not Turning On' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <AlertTriangle className="size-3.5" />
                        <span>Fan Running But No Cooling &bull; $175 Flat Diagnostic</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Compressor Not Turning On? <span className="text-primary italic">Oahu Diagnostic & Repair</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        If your indoor vents are blowing warm, room-temperature air while the outdoor condensing unit sits silent or hums loudly, your compressor has failed to start. Our licensed technicians diagnose electrical capacitors, contactors, and inverter boards for a transparent <span className="text-white font-bold">$175 flat rate</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/appointment"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Schedule $175 Diagnostic Call
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Rapid Triage Desk: (808) 488-1111"
                            eventLabel="Compressor Triage Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Common Failure Causes Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">FIELD DIAGNOSTIC CHECKS</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Why AC Compressors Fail to Start
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {COMPRESSOR_FAILURES.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-rose-500/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{item.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing & Honest Assessment */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                ACCURATE ELECTRICAL TESTING
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Honest Testing Before Condemning Equipment
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Many homeowners are told they need a brand-new $6,000 system when only a simple $35 capacitor or burnt contactor wire has failed. We test every electrical component with precision digital multi-meters before recommending replacement.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If the compressor motor itself has seized, we provide transparent, honest replacement pricing with zero pressure.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Diagnostic Troubleshooting</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Replacement In-Home Estimate</span>
                                <span className="font-header font-bold text-xs text-emerald-400">$0 Free In-Home</span>
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
                            Compressor Troubleshooting FAQs
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
                    subtitle="Fast, honest cooling restored across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
