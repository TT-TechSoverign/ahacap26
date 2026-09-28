'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    CalendarCheck, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Sun,
    CloudRain,
    Wind,
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
        q: "How often does an air conditioner need maintenance on Oahu?",
        a: "Because Oahu combines high humidity (often 80%+) with airborne sea salt particles, units degrade much faster than on the mainland. We recommend servicing living areas every 6 months and bedroom units at least once a year."
    },
    {
        q: "Will regular maintenance lower my HECO electricity bill?",
        a: "Absolutely. A 1/16-inch layer of dirt and mold on your evaporator coil forces your compressor to run 30% longer to achieve the same cooling effect. At HECO's ~44.2¢/kWh residential rate, regular cleanings can save $40 to $90 every single month."
    },
    {
        q: "Are there restrictive long-term auto-renewal contracts?",
        a: "Zero restrictive contracts. We provide on-demand seasonal maintenance with straightforward flat rates ($175 Basic, $275 Premium Teardown) whenever you are ready. We also offer automated courtesy email/SMS reminders when your seasonal window approaches."
    },
    {
        q: "What brands and equipment do you maintain?",
        a: "We service all major mini split ductless systems (Mitsubishi, Daikin, Fujitsu, Gree, Pioneer, LG) as well as all residential window air conditioner units."
    }
];

const SEASONS = [
    {
        icon: Sun,
        title: "Spring Pre-Summer Prep (April - May)",
        desc: "Deep coil wash and refrigerant level check before peak summer humidity and 90°F+ afternoon temperatures strike Oahu."
    },
    {
        icon: CloudRain,
        title: "Kona Weather & Vog Defense (August - October)",
        desc: "Flush humid drain lines and scrub bio-growth accelerated by stagnant south winds and volcanic smog."
    },
    {
        icon: Wind,
        title: "Winter Salt-Air Neutralization (December - January)",
        desc: "Post-winter storm rinse to remove corrosive marine salt crusting on outdoor condenser coils and fan motor housings."
    }
];

export default function SeasonalMaintenancePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Seasonal AC Maintenance Plans Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <CalendarCheck className="size-3.5" />
                        <span>Year-Round Island Protection &bull; Zero Binding Contracts</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Seasonal AC Maintenance <span className="text-primary italic">Plans Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Salt spray from the Pacific, red dirt from the plains, and 80%+ relative humidity attack your air conditioning system 365 days a year. Our proactive seasonal maintenance plans protect efficiency, lower HECO electric bills, and extend equipment life by up to 5 years.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Schedule Seasonal Service
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Speak with Dispatch: (808) 488-1111"
                            eventLabel="Seasonal Maintenance Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Seasonal Cycle Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">OAHU CLIMATE CALENDAR</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Tailored to Island Microclimates
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SEASONS.map((s, idx) => {
                            const IconComponent = s.icon;
                            return (
                                <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                    <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                        <IconComponent className="size-5" />
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{s.title}</h3>
                                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{s.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Service Menu */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">ANNUAL ROUTINE</span>
                            <span className="text-2xl font-black text-white font-header">$175 <span className="text-xs text-slate-400 font-sans font-normal">/ unit</span></span>
                        </div>
                        <h3 className="font-header font-black text-xl uppercase text-white">Basic Mini Split Tune-Up</h3>
                        <p className="text-xs text-slate-300 font-sans">
                            Complete electrical check, operating amp draw verification, filter cleaning, surface coil sanitization, and gravity drain flush.
                        </p>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline">
                                Book Basic Tune-Up &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-cyan-400 uppercase font-bold tracking-wider">DEEP TEARDOWN</span>
                            <span className="text-2xl font-black text-cyan-400 font-header">$275 <span className="text-xs text-slate-400 font-sans font-normal">/ unit</span></span>
                        </div>
                        <h3 className="font-header font-black text-xl uppercase text-white">Premium Deep Teardown Cleaning</h3>
                        <p className="text-xs text-slate-300 font-sans">
                            Full casing disassembly, blower wheel cylinder extracted for a 360-degree bath, and coil scrub. Floor drop cloth protection under every unit.
                        </p>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-cyan-400 hover:underline">
                                Book Premium Teardown &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Maintenance Plan FAQs
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
                    title="Seasonal Service Reviews"
                    subtitle="Reliable cooling verified across residential communities island-wide"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
