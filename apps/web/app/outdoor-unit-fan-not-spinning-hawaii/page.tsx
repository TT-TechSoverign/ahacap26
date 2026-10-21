'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Fan, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Zap,
    Thermometer,
    Wrench,
    Gauge,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const FAQS = [
    {
        q: "What happens if the rear condenser fan stops spinning while the AC is running?",
        a: "Without the fan drawing air across the condenser coils, high-pressure hot refrigerant gas cannot condense into liquid. Head pressure and temperatures skyrocket within 2 to 3 minutes, forcing the compressor into high-pressure thermal overload cutoff and risking permanent motor damage."
    },
    {
        q: "What is the most common reason a condenser fan motor stops spinning?",
        a: "In Hawaii, the leading cause is a failed dual-run capacitor where the 'FAN' terminal has lost microfarad rating due to high ambient heat. Other frequent causes include bearing seizure from salt air corrosion or a shorted DC brushless fan motor on inverter units."
    },
    {
        q: "Should I turn off the air conditioner right away?",
        a: "Yes. Running an air conditioner with a dead condenser fan will quickly overheat the compressor, degrade expensive compressor lubricant, and can permanently burn out the motor windings. Shut down the system immediately."
    },
    {
        q: "What does your $175 diagnostic include?",
        a: "Our technician tests fan capacitor microfarads, measures winding resistance between common, start, and run poles, tests DC pulse voltages from the inverter board, and inspects the physical shaft bearings."
    }
];

const FAN_FAILURES = [
    {
        title: "Dead Run Capacitor (FAN Terminal)",
        desc: "The dual-run capacitor provides the phase shift to spin the fan. When heat degrades the capacitor below tolerance, the fan motor buzzes but remains motionless."
    },
    {
        title: "Seized Bearing from Marine Salt Spray",
        desc: "Airborne salt deposits penetrate non-sealed sleeve or ball bearings in rear condenser motors, causing rust lockup and seizing the fan shaft completely."
    },
    {
        title: "DC Inverter Motor Driver Failure",
        desc: "Inverter units use variable-speed DC brushless fan motors. Blown output transistors on the main control board prevent control signals from reaching the motor."
    },
    {
        title: "Thermal Limit Cutout Tripped",
        desc: "Internal thermal overload switches inside the fan motor casing can trip if the motor overheats, cutting power until the unit cools down."
    }
];

export default function OutdoorFanNotSpinningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Condenser Fan Not Spinning in Hawaii' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Fan className="size-3.5" />
                        <span>Compressor Overheat Warning &bull; $175 Diagnostic Triage</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Condenser Fan Not Spinning? <span className="text-primary italic">Causes &amp; Repair Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        If your condenser fan is sitting still while the compressor hums or the unit repeatedly shuts down after a few minutes, head pressure is dangerously high. Our technicians diagnose capacitors, motor bearings, and inverter boards for a transparent <span className="text-white font-bold">$175 flat rate</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/contact?service=AC+Diagnostic+%26+Repair"
                            prefetch={false}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Schedule $175 Diagnostic Call
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Condenser Triage Desk: (808) 488-1111"
                            eventLabel="Condenser Fan Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Common Failure Causes */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">DIAGNOSTIC FAILURE MODES</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Why the Condenser Fan Stops Spinning
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FAN_FAILURES.map((item, idx) => (
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

                {/* Honest Assessment & Parts Stock */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                TRUCK-STOCKED REPAIRS
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Fast On-Site Capacitor &amp; Motor Diagnostics
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Over 60% of non-spinning condenser fans on Oahu are resolved by simply replacing a degraded dual-run capacitor. Our technicians carry universal capacitors and test microfarad ratings on the spot.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If the motor itself has seized from salt-air corrosion on an older window unit, we provide direct Waipahu warehouse replacement options ($395–$1,200) so you never overpay for an uneconomical repair.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Complete Diagnostic Call</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat Rate</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Capacitor Testing &amp; Replacement</span>
                                <span className="font-header font-bold text-xs text-white">Truck Stock Available</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Waipahu Replacement Stock</span>
                                <span className="font-header font-bold text-xs text-emerald-400">LG &amp; GE In Stock</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Condenser Fan FAQs
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

                <WindowAcQuickShop
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,200)"
                    subheading="Skip expensive compressor or sealed-system repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />

                <ReviewsPavilion 
                    variant="marquee" 
                    title="Condenser Repair Reviews"
                    subtitle="Fast motor replacements and ice-cold cooling restored across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
