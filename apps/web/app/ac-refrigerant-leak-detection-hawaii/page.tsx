'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Gauge, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Search,
    Snowflake,
    Zap,
    Wrench,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How can I tell if my air conditioner has a refrigerant leak?",
        a: "The most common symptoms are ice forming on the indoor evaporator coils or thin copper service valves, the system running for hours without lowering the room temperature, a faint hissing sound near flare fittings, or dark oily residue coating the copper connections."
    },
    {
        q: "Why shouldn't I just ask a technician to add freon without fixing the leak?",
        a: "Air conditioning systems are hermetically sealed closed loops. Refrigerant is never consumed or 'used up.' If your system is low, a physical hole or loose flare exists. Simply adding refrigerant without repairing the leak violates EPA Section 608 guidelines and will leak out again within weeks."
    },
    {
        q: "Where do leaks most frequently occur in Hawaii?",
        a: "Over 80% of ductless mini split leaks occur at the flared copper nut connections at either the indoor wall unit or the outdoor service valves due to thermal cycling or improper torque. The remaining 20% occur in the aluminum coil U-bends from marine salt galvanic corrosion."
    },
    {
        q: "What does the $175 diagnostic include?",
        a: "Our certified technician attaches digital gauges to read saturated suction temperatures, measures superheat and subcooling, tests flare fittings with electronic halogen sniffers, and pinpoints the leak location."
    }
];

const LEAK_SIGNS = [
    {
        icon: Snowflake,
        title: "Ice Accumulation on Coils or Valves",
        desc: "Low refrigerant pressure causes the evaporator saturation temperature to drop below 32°F, freezing ambient moisture into a solid block of ice."
    },
    {
        icon: Search,
        title: "Dark Oily Stains on Copper Fittings",
        desc: "Polyolester (POE) compressor oil circulates with the refrigerant. When gas escapes through a leak, telltale oily residue is left behind on flares."
    },
    {
        icon: Zap,
        title: "Soaring HECO Electric Bills",
        desc: "A undercharged system runs 24 hours a day trying to reach the setpoint, burning massive amounts of electricity at ~44.2¢/kWh without cooling."
    },
    {
        icon: AlertTriangle,
        title: "Hissing or Bubbling Sound",
        desc: "Pressurized gas escaping through a cracked flare connection or pinhole corrosion pit often produces an audible hissing noise."
    }
];

export default function RefrigerantLeakPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Refrigerant Leak Detection' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Gauge className="size-3.5" />
                        <span>EPA Section 608 Certified &bull; Electronic Halogen Sniffers</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Refrigerant Leak Detection <span className="text-primary italic">Hawaii (Flare & Coil Repair)</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your AC blowing room-temperature air or freezing into a block of ice? Air conditioners do not consume freon—if your refrigerant is low, you have a physical leak. Our EPA-certified technicians use electronic sniffer technology to locate leaks and re-flare copper lines.
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
                            display="Leak Desk: (808) 488-1111"
                            eventLabel="Refrigerant Leak Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Warning Signs Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">COMMON SYMPTOMS</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Signs of an Escaping Refrigerant Charge
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {LEAK_SIGNS.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-cyan-400/40 transition-all space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                            <IconComponent className="size-5" />
                                        </div>
                                        <h3 className="font-header font-bold text-base uppercase text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Repair Protocol */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PERMANENT REPAIR PROTOCOL
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Precision Flaring & Pressure Decay Testing
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                We don&apos;t just tighten leaking brass nuts until they strip. When a flare fails, we cut the copper square, ream out burrs, spin a brand-new 45-degree R410A eccentric flare, and torque it to exact foot-pounds with digital torque wrenches.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Before recharging, we pressurize the line set with dry nitrogen to verify zero pressure drop, pull a deep vacuum below 500 microns, and weigh in factory-exact virgin refrigerant.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Diagnostic & Leak Sniffer Test</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">EPA 608 Universal Certified</span>
                                <span className="font-header font-bold text-xs text-white">Full Compliance</span>
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
                            Refrigerant Leak FAQs
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
                    title="Leak Repair Reviews"
                    subtitle="Long-term refrigerant seals verified across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
