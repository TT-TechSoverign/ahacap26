'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Volume2, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Wrench,
    Sparkles,
    Warehouse,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why is my window air conditioner making a loud buzzing or vibrating sound?",
        a: "Window AC buzzing is typically caused by four factors: loose sheet metal screws vibrating against the outer cabinet, degraded rubber compressor vibration grommets, the fan blade striking debris or the plastic shroud, or an improper window sill mounting angle."
    },
    {
        q: "Can an unlevel mounting bracket cause the unit to buzz loudly?",
        a: "Yes. If the unit does not have proper neoprene vibration isolation pads between the metal chassis and the exterior sill bracket, compressor harmonic vibration transmits directly into the window frame and wall studs, amplifying the noise throughout the room."
    },
    {
        q: "Is a continuous electrical hum dangerous?",
        a: "A loud 60Hz electrical hum often indicates a locked compressor motor or a failing start capacitor. If the compressor cannot turn, it will overheat and trip the circuit breaker. Turn the unit off and schedule a diagnostic check."
    },
    {
        q: "What options do I have if my window AC is simply too loud to sleep with?",
        a: "If your unit is an older fixed-speed rotary model, it naturally operates at 58–64 dBA. We stock modern Dual Inverter window air conditioners at our Waipahu warehouse running as quietly as 44 dBA—whisper quiet—with an available $45 Hawaii Energy cash rebate."
    }
];

const NOISE_CAUSES = [
    {
        title: "Loose Chassis & Frame Vibration",
        desc: "High-speed compressor cycles rattle un-tightened side accordion panels, loose cabinet screws, or improper jalousie wooden sill mounts."
    },
    {
        title: "Deteriorated Compressor Rubber Feet",
        desc: "Tropical heat rots the rubber isolation grommets beneath the compressor. Metal-to-metal contact sends harsh vibration buzzing into the window frame."
    },
    {
        title: "Fan Blade Obstruction or Bent Shaft",
        desc: "Dried leaves, dirt clods, or a slightly warped blower fan blade clicking against the plastic water slinger ring produces an annoying buzz."
    },
    {
        title: "Capacitor Failure & Motor Stalling",
        desc: "A weak capacitor fails to spin the compressor, creating a loud electrical hum for 10 seconds before the thermal overload switch shuts it off."
    }
];

export default function WindowAcBuzzingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Window AC Making Loud Buzzing Noise' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Volume2 className="size-3.5" />
                        <span>Acoustic Vibration & Noise Solutions &bull; Waipahu Warehouse Support</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Making Loud Buzzing Noise? <span className="text-primary italic">Causes & Fixes Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Can&apos;t sleep because of a rattling window sill, harsh metallic buzzing, or droning motor vibration? Discover the root mechanical causes behind loud window air conditioners and learn how our bracket dampening and whisper-quiet Dual Inverter upgrades restore peace and quiet.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/appointment"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Schedule Noise Diagnostic ($175)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Acoustic Help: (808) 488-1111"
                            eventLabel="Buzzing AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Root Causes Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">DIAGNOSTIC NOISE GUIDE</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The 4 Most Common Sources of Buzzing
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {NOISE_CAUSES.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{item.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Fix Options: Overhaul vs Inverter Upgrade */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                SLEEP PEACEFULLY AGAIN
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Bracket Dampening or Quiet Dual Inverter?
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If the unit rattles inside the frame, installing an exterior support bracket with vibration-dampening neoprene pads often eliminates harmonic buzzing instantly.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If your AC is over 5 years old and the internal motor bearings or compressor are humming loudly, upgrade to an ultra-quiet LG Dual Inverter unit from our Waipahu warehouse starting at $504 with an available <strong className="text-emerald-400">$45 Hawaii Energy rebate</strong>. Dual inverters modulate compressor speeds smoothly down to 44 dBA—whisper quiet.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">On-Site Bracket Dampening Service</span>
                                <span className="font-header font-bold text-lg text-primary">$175 Flat</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">New Whisper-Quiet Inverter AC</span>
                                <span className="font-header font-bold text-xs text-emerald-400">From $504 (-$45 Rebate)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Standard Exterior Brackets</span>
                                <span className="font-header font-bold text-xs text-white">Add-On Installation Option</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Window AC Noise FAQs
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
                    title="Quiet Comfort Reviews"
                    subtitle="Peaceful sleep restored for island homeowners"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
