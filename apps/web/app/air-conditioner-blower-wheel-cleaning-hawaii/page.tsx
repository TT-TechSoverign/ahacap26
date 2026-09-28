'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Disc3, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Wind,
    Volume2,
    Sparkles,
    Gauge,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why does the AC blower wheel get coated in black dirt and mold?",
        a: "The crossflow blower wheel spins thousands of rotations per hour, pulling humid room air directly across wet cooling coils. Microscopic dust, skin cells, and pet dander stick to the damp curved fan blades, creating a dense fungal crust that chokes airflow."
    },
    {
        q: "Can you clean a mini split blower wheel without removing it?",
        a: "Surface spray-down in place only cleans the exposed top edge and can wash mold slurry into the fan motor bearings. Our $275 Premium Teardown extracts the wheel completely from the housing for a 360-degree degreasing bath."
    },
    {
        q: "What are the signs that my blower wheel is clogged?",
        a: "Key symptoms include weak air velocity even on high fan speed, a rhythmic pulsating or roaring whoosh sound, black flecks blowing onto your bed or couch, and an unbalanced rattling vibration from the indoor air handler."
    },
    {
        q: "Does a clogged fan wheel increase power consumption?",
        a: "Yes. When the concave curvature of the fan blades is packed with dirt, the wheel loses aerodynamic lift. The motor draws more amps trying to push air, while room cooling times double, wasting electricity at HECO's ~44.2¢/kWh rate."
    }
];

export default function BlowerWheelCleaningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Air Conditioner Blower Wheel Cleaning' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Disc3 className="size-3.5" />
                        <span>360° Fan Barrel Extraction &bull; 100% CFM Restored</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Blower Wheel Cleaning <span className="text-primary italic">Hawaii (Deep Fan Scrub)</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your AC blowing weak air or making an uneven whistling sound? If you shine a flashlight into the louver opening, you&apos;ll likely see a thick black crust choking every blade of the blower wheel. Our full teardown service extracts the wheel for complete clinical sanitization.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $275 Teardown Service
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Service Desk: (808) 488-1111"
                            eventLabel="Blower Wheel Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Symptom Cards */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-3">
                        <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <Wind className="size-5" />
                        </div>
                        <h3 className="font-header font-bold text-base uppercase text-white">Choked Airflow (CFM Drop)</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            Caked dirt flattens the aerodynamic cup of each blade, cutting airflow output by up to 50% even at high fan settings.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-3">
                        <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <Volume2 className="size-5" />
                        </div>
                        <h3 className="font-header font-bold text-base uppercase text-white">Whooshing & Vibration</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            Uneven mold weight distribution creates dynamic imbalance, causing the fan motor to vibrate and produce an audible pulsing drone.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-surface-dark border border-white/10 space-y-3">
                        <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <Sparkles className="size-5" />
                        </div>
                        <h3 className="font-header font-bold text-base uppercase text-white">Flying Black Specks</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            Dry fungal clusters break loose at high velocity, dusting your bedding, curtains, and floors with black bio-particles.
                        </p>
                    </div>
                </section>

                {/* Teardown Service Breakdown */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                THE ANATOMY OF A PROPER CLEAN
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Mechanical Extraction vs. In-Place Sprays
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Spraying an aerosol into a mounted blower wheel cannot reach the back 180 degrees of the cylinder. It merely liquefies the surface dirt into a sticky sludge that fouls the motor shaft bearing.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our $275 Premium Deep Cleaning involves disconnecting the motor coupling, sliding the entire wheel out, and pressure-scrubbing all 300+ miniature blades in an isolated wash container. Floor drop cloths guarantee no mess.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Contractor License CT-36775:</strong> Motor alignment and set screws are torqued to manufacturer specs upon reassembly to prevent shaft play.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Mini Split Wheel Teardown Clean</span>
                                <span className="font-header font-bold text-lg text-primary">$275 / head</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Mini Split Basic Coil & Filter Clean</span>
                                <span className="font-header font-bold text-lg text-cyan-400">$175 / head</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Drop Cloth Protection</span>
                                <span className="font-header font-bold text-xs text-emerald-400">Guaranteed Clean</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Blower Wheel Cleaning FAQs
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
                    title="Airflow Restoration Reviews"
                    subtitle="Hear how quiet, powerful airflow was restored for island homes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
