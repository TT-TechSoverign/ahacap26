'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    PowerOff, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Zap,
    ToggleRight,
    Droplets,
    Wrench,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';

const FAQS = [
    {
        q: "Why is my air conditioner completely dead with no lights or beeps?",
        a: "When a window AC has zero power, the most common causes are a tripped circuit breaker in your electrical service panel, a tripped LCDI safety button on the power plug, a blown low-voltage fuse on the control board, or a tripped condensate overflow safety switch."
    },
    {
        q: "How does a clogged drain pan cause the AC to lose all power?",
        a: "Modern high-efficiency window units incorporate a water level or float safety switch. When water backs up in the drain pan, the switch cuts the 12V control circuit, shutting down power to prevent water overflow into your home."
    },
    {
        q: "What should I do if the circuit breaker trips immediately when I reset it?",
        a: "Never force a breaker to stay in the ON position or repeatedly reset it. An instantaneous trip signifies a hard direct short to ground in the compressor windings, an inverter power transistor failure, or a damaged LCDI power cord."
    },
    {
        q: "What is the reset button on a window AC power cord?",
        a: "Window AC cords have an LCDI (Leakage Current Detection and Interrupter) protective head. If current leaks, the test button pops out. Press the 'RESET' button firmly. If it will not stay depressed, the power cord or compressor has an internal short."
    }
];

const POWER_CHECKS = [
    {
        step: "01",
        title: "Main Electrical Panel (Circuit Breaker)",
        desc: "Look for the dedicated 15A to 30A breaker (115V or 240V) labeled 'A/C'. If the switch is in the center 'tripped' position, switch it firmly OFF, then back ON."
    },
    {
        step: "02",
        title: "Window AC LCDI Plug Reset",
        desc: "For window units, verify the indicator light on the wall plug. Press the 'RESET' button firmly until it clicks to re-engage power."
    },
    {
        step: "03",
        title: "Wall Receptacle & Dedicated Outlet",
        desc: "Inspect the wall receptacle for loose blades or heat discoloration, and verify the plug is seated firmly without extension cords."
    },
    {
        step: "04",
        title: "Condensate Float Safety Switch",
        desc: "If your drain pan is clogged with algae jelly, the overflow safety switch cuts power to protect your home from water damage."
    }
];

export default function NoPowerAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'No Power to AC Unit in Hawaii' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <PowerOff className="size-3.5" />
                        <span>Electrical Triage & Safety &bull; $0 Clean-vs-Replace Assessment</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        No Power to AC Unit? <span className="text-primary italic">Breaker &amp; Plug Checks Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your air conditioner completely dead with no lights, sounds, or response? Before panicking, follow our HVAC electrical troubleshooting steps to check breakers, LCDI reset plugs, and safety switches across Oahu.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/contact?service=AC+Diagnostic+%26+Repair"
                            prefetch={false}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $0 Assessment / Service Call
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Electrical Desk: (808) 488-1111"
                            eventLabel="No Power AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 4-Step Electrical Checklist */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">HOMEOWNER SAFETY PROTOCOL</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The 4 Quick Power Checks
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {POWER_CHECKS.map((item, idx) => (
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

                {/* Professional Electrical Assurance */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL ELECTRICAL SAFETY
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                High-Voltage Safety Standards (115V &amp; 240V)
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Large-capacity window air conditioners run on dedicated 115V or high-voltage 208V/240V power lines capable of causing severe electric shock or fire. Never touch exposed wiring or disassemble electrical control boxes yourself.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our HVAC technicians safely test line-voltage drop, control transformer output, PCB surge fuses, and safety interlocks with calibrated digital multimeters.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Complete Diagnostic Fee</span>
                                <span className="font-header font-bold text-lg text-primary">By Appointment ($0 Estimate)</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Voltage Verification</span>
                                <span className="font-header font-bold text-xs text-white">Full 115V/240V &amp; PCB Check</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Waipahu Warehouse Stock</span>
                                <span className="font-header font-bold text-xs text-emerald-400">LG &amp; GE In Stock</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Power Loss FAQs
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
                                <div className={`px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3 ${openFaq === idx ? 'block' : 'hidden'}`}>
                                        {faq.a}
                                    </div>
                            </div>
                        ))}
                    </div>
                </section>

                <WindowAcQuickShop
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,200)"
                    subheading="Skip expensive compressor or sealed-system repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />

                                <OahuEEATAuthorityBar topicTitle="No Power to AC Unit in Hawaii ? Oahu Technical & Buying Guide" />

                <ReviewsPavilion 
                    variant="marquee" 
                    title="Electrical Repair Reviews"
                    subtitle="Reliable power and cooling restored safely across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
