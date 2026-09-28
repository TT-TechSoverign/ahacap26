'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Radio, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Camera,
    BatteryCharging,
    Power,
    Wrench,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How can I test if my remote is emitting an infrared signal?",
        a: "Open your smartphone camera (the selfie or rear camera), point the clear LED tip of the remote straight into the camera lens, and press any button. Because digital cameras detect infrared radiation, you will see a bright purple/white pulsing flash on your phone screen if the remote is working."
    },
    {
        q: "How do I turn on my AC if my remote is lost or broken?",
        a: "Lift the front cover of the indoor unit. On the right side near the electrical box, there is a small manual button labeled 'Auto/Cool', 'Emergency Run', or an icon of a finger pressing a button. Press it once to start the unit in automatic cooling mode (typically preset to 72°F)."
    },
    {
        q: "Why does the remote display show numbers but the AC doesn't beep?",
        a: "The LCD display on the remote only requires tiny microamps to show text, but transmitting an infrared burst requires full battery voltage. Weak batteries can power the screen while failing to transmit. Replace both AAA batteries with fresh name-brand alkaline cells."
    },
    {
        q: "What if fresh batteries and the camera test pass, but the unit still won't respond?",
        a: "The issue is almost certainly a defective IR receiver board on the indoor air handler or a loose ribbon cable connection. Our licensed technician can diagnose the display PCB and replace faulty receiver diodes during a $175 service call."
    }
];

const DIY_STEPS = [
    {
        step: "01",
        title: "The Smartphone Camera Trick",
        desc: "Point the remote diode into your phone's camera and press power. If you see a flashing violet light on screen, the remote is transmitting properly."
    },
    {
        step: "02",
        title: "Battery Terminal Corrosion Check",
        desc: "Pop open the battery door. Hawaii humidity often forms white acid crust on copper spring terminals. Clean with a dry cotton swab and install fresh alkalines."
    },
    {
        step: "03",
        title: "Check for Child Lock or Timer Mode",
        desc: "Look for a tiny padlock icon on the remote LCD. Press and hold '+' and '-' together for 3-5 seconds to disengage accidental keylock."
    },
    {
        step: "04",
        title: "Use the Emergency Manual Run Button",
        desc: "Lift the indoor air handler's front panel and press the recessed manual operation button to restore cold air while diagnosing the controller."
    }
];

export default function RemoteNotWorkingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Mini Split Remote Control Troubleshooting' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Radio className="size-3.5" />
                        <span>Infrared & PCB Diagnostics &bull; Emergency Run Guide</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Mini Split Remote Not Working? <span className="text-primary italic">Troubleshooting & Fixes Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Stuck in the heat because your indoor air handler won&apos;t beep or turn on when you press the remote? Try our fast 4-step DIY diagnostic guide, learn how to activate emergency cooling without a remote, and know when to call a licensed technician.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/appointment"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Schedule Diagnostic ($175)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Remote Help Desk: (808) 488-1111"
                            eventLabel="Remote Troubleshooting Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 4-Step DIY Guide */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">QUICK 2-MINUTE CHECKS</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Try These 4 Steps Before Calling
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {DIY_STEPS.map((s, idx) => (
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

                {/* When You Need a Technician */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL CIRCUIT DIAGNOSTICS
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Display Board & Receiver Sensor Repairs
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If the remote emits light through a camera but the AC never registers the signal, the photo-diode on the indoor display printed circuit board (PCB) has likely burnt out or corroded from salt air.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our $175 diagnostic fee covers complete testing of the receiver board, low-voltage wiring harnesses, and communication links between indoor and outdoor units.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Complete Diagnostic Call</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Replacement Remote Sourcing</span>
                                <span className="font-header font-bold text-xs text-white">OEM & Universal In Stock</span>
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
                            Remote Control FAQs
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
                    title="Control & Electrical Reviews"
                    subtitle="Fast resolution of electronic controls across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
