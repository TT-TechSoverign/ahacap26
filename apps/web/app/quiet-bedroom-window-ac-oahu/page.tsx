'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Moon, 
    Volume2, 
    Zap, 
    DollarSign, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    Truck, 
    Sparkles, 
    ChevronDown, 
    Clock,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const BEDROOM_MODELS = [
    {
        btu: '6,000 BTU',
        model: 'LW6023IVSM',
        roomSize: 'Standard Bedrooms (Up to 250 sq. ft.)',
        noise: '44 dB Sleep Mode',
        ceer: 'CEER 11.5 Energy Star',
        plug: 'Standard 115V / 15A Plug',
        price: '$504',
        afterRebate: '$459 after $45 rebate',
        slug: '1-lg-dual-inverter-6-000-btu-lw6023ivsm'
    },
    {
        btu: '8,000 BTU',
        model: 'LW8022IVSM',
        roomSize: 'Master Bedrooms (Up to 350 sq. ft.)',
        noise: '44 dB Sleep Mode',
        ceer: 'CEER 12.0 Energy Star',
        plug: 'Standard 115V / 15A Plug',
        price: '$545',
        afterRebate: '$500 after $45 rebate',
        popular: true,
        slug: '2-lg-dual-inverter-8-000-btu-lw8022ivsm'
    },
    {
        btu: '10,000 BTU',
        model: 'LW1022IVSM',
        roomSize: 'Large Master Suites (Up to 450 sq. ft.)',
        noise: '44 dB Sleep Mode',
        ceer: 'CEER 12.0 Energy Star',
        plug: 'Standard 115V / 15A Plug',
        price: '$614',
        afterRebate: '$569 after $45 rebate',
        slug: '3-lg-dual-inverter-10-000-btu-lw1022ivsm'
    }
];

const FAQS = [
    {
        q: "Why are traditional window ACs so loud in bedrooms?",
        a: "Old-style single-speed window ACs cycle their compressors strictly on and off. Whenever room temperature rises, the compressor engages with a loud mechanical 'thunk' and runs at 100% capacity (58–64 dB), shuddering the window frame and waking light sleepers. LG Dual Inverters use twin-rotary brushless motors that gently modulate speed, eliminating start-stop noise."
    },
    {
        q: "What does 44 decibels (dB) sound like?",
        a: "44 dB is quieter than a normal conversational voice (60 dB) and comparable to a quiet suburban library or light rain rustling leaves. You hear only a gentle, steady whoosh of cool conditioned air."
    },
    {
        q: "Can I run this unit on my existing bedroom outlet?",
        a: "Yes! All three bedroom models (6k, 8k, and 10k BTU) operate on standard 115V 15-amp household wall outlets. No special 230V wiring or expensive electrical upgrades are required."
    },
    {
        q: "Do these bedroom units qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! Every model featured here is Energy Star certified and qualifies for a $45 Hawaii Energy cash rebate. We provide the official pre-approved application form PDF with your purchase."
    }
];

export default function QuietBedroomWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Quiet Bedroom Window AC' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Moon className="size-3.5" />
                        <span>44 dB Sleep Mode &bull; Dual Inverter Technology</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Ultra-Quiet Bedroom <span className="text-primary italic">Window ACs Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Stop waking up to loud compressor shudder and rattling window frames. Our in-stock LG Dual Inverter bedroom units operate at a whisper-quiet <strong>44 dB</strong> while slashing overnight HECO electric power bills.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Bedroom Inverter ACs
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call (808) 488-1111"
                            eventLabel="Quiet Bedroom Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Decibel Acoustic Comparison Visualizer */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-1">
                            ACOUSTIC SPECTRUM COMPARISON
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            How Loud Is 44 Decibels Compared to Other Sounds?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <span className="text-2xl font-header font-black text-slate-400">30 dB</span>
                            <div className="font-header font-bold text-sm uppercase text-white">Whisper / Quiet Library</div>
                            <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                Barely audible background room acoustics.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-primary/10 border border-primary/40 space-y-2 relative overflow-hidden">
                            <span className="text-2xl font-header font-black text-primary">44 dB</span>
                            <div className="font-header font-bold text-sm uppercase text-white">LG Dual Inverter Sleep Mode</div>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed">
                                Gentle, steady airflow whisper. Zero abrupt compressor start-up shudder.
                            </p>
                            <span className="absolute top-2 right-2 text-[9px] font-mono uppercase bg-primary text-slate-950 font-bold px-2 py-0.5 rounded-full">
                                Our Units
                            </span>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <span className="text-2xl font-header font-black text-slate-400">55 dB</span>
                            <div className="font-header font-bold text-sm uppercase text-white">Kitchen Refrigerator</div>
                            <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                Standard refrigerator motor humming in quiet room.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
                            <span className="text-2xl font-header font-black text-red-400">62+ dB</span>
                            <div className="font-header font-bold text-sm uppercase text-white">Old Window AC</div>
                            <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                Abrupt loud compressor cycle that shudders window louvers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Overnight HECO Economics (~44.2¢/kWh) */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/70 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.3em] font-bold block">
                                SLEEP COOL &bull; SAVE MONEY
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Run Overnight for Under $1.10 per Night
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                Hawaii has the highest electricity tariff in America (~44.2¢/kWh). Running an old, inefficient 10 SEER window AC all night burns through cash. The LG Dual Inverter throttles its motor down to low speed once the bedroom reaches setpoint, drawing just 250–320 Watts.
                            </p>
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                                <strong>Average Household Savings:</strong> $62 to $78 monthly when replacing an old bedroom unit.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="text-xs font-mono uppercase text-slate-400">Overnight 8-Hour Run Cost (Oahu HECO Rates)</div>
                            <div className="space-y-3 font-mono text-xs">
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex justify-between items-center">
                                    <span className="text-slate-300">Older Single-Speed 8K BTU:</span>
                                    <span className="text-red-400 font-bold">~$3.18 / Night</span>
                                </div>
                                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center">
                                    <span className="text-slate-200">LG Dual Inverter 8K BTU:</span>
                                    <span className="text-emerald-400 font-bold">~$0.98 / Night</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 font-sans text-center">
                                Qualifies for a <strong className="text-white">$45 Hawaii Energy cash rebate</strong> on qualifying models.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Curated Bedroom Models */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-1">
                            IN-STOCK WAIPAHU WAREHOUSE
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Ultra-Quiet Bedroom Inverter Lineup
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {BEDROOM_MODELS.map((item, idx) => (
                            <div 
                                key={idx}
                                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${item.popular ? 'bg-gradient-to-b from-primary/10 via-surface-dark to-surface-dark border-primary/40 shadow-xl' : 'bg-surface-dark border-white/10'}`}
                            >
                                <div>
                                    {item.popular && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider mb-3">
                                            #1 Bedroom Pick on Oahu
                                        </span>
                                    )}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs text-primary font-bold">{item.btu}</span>
                                        <span className="font-mono text-xs text-emerald-400 font-bold">$45 Rebate</span>
                                    </div>
                                    <h3 className="font-header font-bold text-xl uppercase text-white mb-1">
                                        LG {item.model}
                                    </h3>
                                    <p className="text-xs text-slate-300 mb-4">{item.roomSize}</p>

                                    <div className="space-y-1.5 text-[11px] font-mono text-slate-400 border-t border-white/10 pt-3 mb-6">
                                        <div className="flex items-center gap-1.5 text-primary">
                                            <Volume2 className="size-3.5" />
                                            <span>{item.noise}</span>
                                        </div>
                                        <div>&bull; {item.ceer}</div>
                                        <div>&bull; {item.plug}</div>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex items-baseline justify-between mb-3">
                                        <span className="text-2xl font-header font-black text-white">{item.price}</span>
                                        <span className="text-xs font-mono text-emerald-400">{item.afterRebate}</span>
                                    </div>
                                    <Link 
                                        href="/shop"
                                        className="w-full py-3 rounded-xl bg-primary hover:bg-cyan-300 text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                                    >
                                        Buy Now in Shop
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pickup & Delivery Reassurance */}
                <section className="mb-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center flex flex-col sm:flex-row items-center justify-around gap-4 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                        <Warehouse className="size-4 text-primary shrink-0" />
                        <span>Free Central Waipahu Pickup (by appointment)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Truck className="size-4 text-primary shrink-0" />
                        <span>Flat $50 Island-Wide Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                        <span>1-Year Manufacturer Warranty</span>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Quiet Bedroom AC FAQs
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

                {/* Reviews */}
                <section className="mb-12">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu Light Sleepers Rest Easy"
                        subtitle="Homeowners who upgraded their bedrooms to quiet Dual Inverters"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
