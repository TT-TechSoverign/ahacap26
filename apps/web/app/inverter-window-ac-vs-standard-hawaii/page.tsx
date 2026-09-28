'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Cpu, 
    Zap, 
    ArrowRight, 
    Volume2, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    XCircle,
    TrendingDown,
    Activity
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does an inverter window AC differ from a traditional window AC?",
        a: "A standard AC compressor operates at only one speed: 100% full blast or completely OFF. When your room warms up, it turns on with a loud clunk, overcools, and shuts down. A Dual Inverter compressor uses variable-speed twin rotaries that continuously modulate speed from 20% to 100%, maintaining a perfectly constant room temperature while consuming far less electricity."
    },
    {
        q: "Is an inverter window AC really worth the higher upfront price in Hawaii?",
        a: "Yes, absolutely. Because Hawaii has the highest electricity rates in the nation (~44.2¢/kWh), the 35% to 40% energy reduction of an inverter window AC saves $25 to $60 every single month. In just 6 to 9 months of island operation, the energy savings completely offset the price difference."
    },
    {
        q: "How much quieter is a Dual Inverter window AC?",
        a: "Standard window ACs typically produce 55 to 60 dB of noise, similar to a loud conversation or dishwasher. LG Dual Inverter units run at just 44 dB in sleep mode—quieter than a library whisper—and eliminate the loud mechanical kick every time the compressor cycles."
    },
    {
        q: "Do Dual Inverter window ACs qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! Qualifying Energy Star certified LG Dual Inverter models qualify for an official $45 cash rebate from Hawaii Energy. We provide the application PDF upon purchase."
    }
];

export default function InverterVsStandardWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Inverter vs Standard Window AC' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Cpu className="size-3.5" />
                        <span>Engineering Breakdown &bull; HECO 44.2¢/kWh Analysis</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Dual Inverter vs <span className="text-primary italic">Standard Window AC</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Why are Oahu homeowners upgrading from older rotary units to variable-speed LG Dual Inverter technology? Understand the difference between on/off cycling and smooth inverter modulation—and see how it cuts your electric bill by up to 40%.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Dual Inverter Inventory
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Waipahu Desk: (808) 488-1111"
                            eventLabel="Inverter Comparison Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Side-by-Side Comparison Matrix */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Direct Technology Comparison
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Standard AC */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-rose-500/20 space-y-4">
                            <div className="flex items-center gap-2 text-rose-400 font-header font-bold text-xl uppercase">
                                <XCircle className="size-6 shrink-0" />
                                <span>Standard Rotary Window AC</span>
                            </div>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-400 font-bold">&bull;</span>
                                    <span><strong>Single Speed:</strong> 100% full blast or 0% off. Constant hard mechanical cycling.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-400 font-bold">&bull;</span>
                                    <span><strong>Power Spikes:</strong> Draws massive startup current, spiking HECO bills and tripping breakers.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-400 font-bold">&bull;</span>
                                    <span><strong>Loud Operation:</strong> 55 to 60 dB. Loud rattling and buzzing every time compressor starts.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-400 font-bold">&bull;</span>
                                    <span><strong>Temperature Swings:</strong> Overcools by 3 degrees, then allows room to warm up before kicking back on.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Dual Inverter */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-emerald-500/30 space-y-4">
                            <div className="flex items-center gap-2 text-emerald-400 font-header font-bold text-xl uppercase">
                                <CheckCircle2 className="size-6 shrink-0" />
                                <span>LG Dual Inverter Window AC</span>
                            </div>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold">&bull;</span>
                                    <span><strong>Variable Speed:</strong> Modulates compressor output seamlessly from 20% to 100%.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold">&bull;</span>
                                    <span><strong>Soft-Start:</strong> Smooth ramp up draws minimal electrical current; saves up to 40% energy.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold">&bull;</span>
                                    <span><strong>Whisper Quiet:</strong> 44 dB in sleep mode. Quieter than a quiet conversational whisper.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold">&bull;</span>
                                    <span><strong>Precision Temp:</strong> Maintains exact temperature within 0.5°F without cold drafts or hot spots.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Savings Callout */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono text-xs">
                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <TrendingDown className="size-8 text-emerald-400 mx-auto" />
                            <div className="text-2xl font-header font-black text-white">40% Less Power</div>
                            <p className="text-slate-300 font-sans text-xs">Consumes far fewer kilowatt-hours on Oahu’s ~44.2¢ rate.</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <Volume2 className="size-8 text-primary mx-auto" />
                            <div className="text-2xl font-header font-black text-white">44 dB Silence</div>
                            <p className="text-slate-300 font-sans text-xs">Sleep peacefully through hot nights with zero window vibration.</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <Sparkles className="size-8 text-emerald-400 mx-auto" />
                            <div className="text-2xl font-header font-black text-white">$45 Cash Rebate</div>
                            <p className="text-slate-300 font-sans text-xs">Official Hawaii Energy cash rebate on qualifying units.</p>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Inverter AC FAQs
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
                    title="Homeowners on Dual Inverter Comfort"
                    subtitle="Real reviews from Oahu residents who made the switch"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
