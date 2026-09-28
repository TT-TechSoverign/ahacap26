'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Maximize2, 
    Zap, 
    Layers, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    Truck, 
    ShieldCheck, 
    ChevronDown, 
    Sparkles, 
    Sun,
    AlertCircle,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const LIVING_MODELS = [
    {
        btu: '12,000 BTU',
        model: 'LW1222IVSM',
        coverage: 'Medium Living Rooms (450–550 sq. ft.)',
        voltage: '115V / 15A Standard Household Plug',
        ceer: 'CEER 12.0 Energy Star',
        price: '$670',
        afterRebate: '$625 after $45 rebate',
        plugType: 'NEMA 5-15P (Standard 3-prong)',
        popular: true
    },
    {
        btu: '14,000 BTU',
        model: 'LW1522FVSM',
        coverage: 'Open Living & Dining Areas (550–700 sq. ft.)',
        voltage: '115V / 15A Standard Household Plug',
        ceer: 'CEER 11.8 Energy Star',
        price: '$759',
        afterRebate: '$714 after $45 rebate',
        plugType: 'NEMA 5-15P (Standard 3-prong)'
    },
    {
        btu: '18,000 BTU',
        model: 'LW1822IVSM',
        coverage: 'Large Open Floor Plans (700–1,000 sq. ft.)',
        voltage: '208/230V Dedicated 15A Circuit',
        ceer: 'CEER 11.8 Energy Star',
        price: '$890',
        afterRebate: '$845 after $45 rebate',
        plugType: 'NEMA 6-15P (Horizontal pins)'
    },
    {
        btu: '23,500 BTU',
        model: 'LW2422IVSM',
        coverage: 'Expansive Living Areas & High Ceilings (1,000–1,400 sq. ft.)',
        voltage: '208/230V Dedicated 20A Circuit',
        ceer: 'CEER 10.4 Energy Star',
        price: '$1,025',
        afterRebate: '$980 after $45 rebate',
        plugType: 'NEMA 6-20P (Perpendicular pins)'
    }
];

const FAQS = [
    {
        q: "Can a window AC really cool an open living room in Hawaii?",
        a: "Yes! High-capacity LG Dual Inverter models (12,000 to 23,500 BTU) produce massive cubic-feet-per-minute (CFM) airflow designed specifically for large open-concept floor plans. Because they use variable-speed inverter compressors, they maintain steady cooling throughout the day without the sudden temperature swings of older units."
    },
    {
        q: "What electrical outlet do I need for a 12,000 or 14,000 BTU unit?",
        a: "Both the 12,000 BTU (LW1222IVSM) and 14,000 BTU (LW1522FVSM) operate on standard 115V 15-amp household electrical outlets (standard 3-prong NEMA 5-15P plug). You do NOT need 230V wiring or an electrician for these two models."
    },
    {
        q: "When do I need a 230V outlet?",
        a: "The 18,000 BTU model requires a 208/230V 15A circuit, while the 23,500 BTU model requires a 208/230V 20A circuit. If your living room already has a horizontal-pin AC outlet, these heavy-duty units plug directly in."
    },
    {
        q: "Do these high-capacity units qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! All four models featured here are Energy Star certified and qualify for the $45 Hawaii Energy cash rebate."
    }
];

export default function LivingRoomWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Living Room Window AC' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Maximize2 className="size-3.5" />
                        <span>High-Capacity Cooling &bull; 12,000 to 23,500 BTU</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Living Room Window ACs <span className="text-primary italic">Oahu Guide</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Cool open island living rooms, connected kitchen/dining spaces, and vaulted plantation ceilings without spending $6,000+ on split AC systems. High-capacity Dual Inverters stocked in Waipahu.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Living Room Inverters
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call (808) 488-1111"
                            eventLabel="Living Room Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Hawaii Thermal Soak Factor Card */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-3">
                            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-[0.3em] font-bold block">
                                OAHU CLIMATE REALITY
                            </span>
                            <h2 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                                Why Living Rooms Need Proper BTU Sizing in Hawaii
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                Standard mainland BTU charts assume 8-foot drywall ceilings with thick fiberglass insulation. On Oahu, uninsulated single-wall redwood construction, afternoon trade-wind glass exposure, and open kitchen stoves create heavy midday thermal heat soak. Sizing up 10%–20% ensures your unit hits target temperature comfortably without continuous strain.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Sun className="size-4 text-amber-400" />
                                <span>Island Sizing Quick Rules</span>
                            </div>
                            <ul className="space-y-2 text-slate-300 text-[11px] font-sans">
                                <li>&bull; <strong>450–550 sq. ft.:</strong> 12,000 BTU (LW1222IVSM)</li>
                                <li>&bull; <strong>550–700 sq. ft.:</strong> 14,000 BTU (LW1522FVSM)</li>
                                <li>&bull; <strong>700–1,000 sq. ft.:</strong> 18,000 BTU (LW1822IVSM — 230V)</li>
                                <li>&bull; <strong>1,000+ sq. ft. / Vaulted:</strong> 23,500 BTU (LW2422IVSM — 230V)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4 Models Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-1">
                            WAIPAHU WAREHOUSE DIRECT
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            High-Capacity Living Room AC Models
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {LIVING_MODELS.map((item, idx) => (
                            <div 
                                key={idx}
                                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${item.popular ? 'bg-gradient-to-b from-primary/10 via-surface-dark to-surface-dark border-primary/40 shadow-xl' : 'bg-surface-dark border-white/10'}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs text-primary font-bold">{item.btu}</span>
                                        <span className="font-mono text-xs text-emerald-400 font-bold">$45 Rebate Eligible</span>
                                    </div>
                                    <h3 className="font-header font-bold text-xl uppercase text-white mb-1">
                                        LG {item.model}
                                    </h3>
                                    <p className="text-xs text-slate-300 mb-4">{item.coverage}</p>

                                    <div className="space-y-1.5 text-[11px] font-mono text-slate-400 border-t border-white/10 pt-3 mb-6">
                                        <div className="text-slate-200">&bull; {item.voltage}</div>
                                        <div>&bull; {item.plugType}</div>
                                        <div>&bull; {item.ceer}</div>
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
                                        Order Online in Shop
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Electrical Plug Compatibility Guide */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10">
                    <h2 className="text-xl sm:text-2xl font-header font-black uppercase text-white tracking-tight mb-4 text-center">
                        Electrical Plug Compatibility Guide
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 text-center max-w-2xl mx-auto mb-8 font-sans">
                        Check your living room wall outlet before ordering to ensure seamless plug-and-play installation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="text-emerald-400 font-bold uppercase">Standard 115V / 15A Outlet</div>
                            <div className="text-white font-bold text-sm">Fits: 12,000 BTU &amp; 14,000 BTU</div>
                            <p className="text-slate-400 font-sans text-xs leading-relaxed">
                                Standard 3-prong household outlet found in every Hawaiian living room. Zero special electrical work needed.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase">Dedicated 208/230V Circuit</div>
                            <div className="text-white font-bold text-sm">Fits: 18,000 BTU &amp; 23,500 BTU</div>
                            <p className="text-slate-400 font-sans text-xs leading-relaxed">
                                Features horizontal pin configuration. Delivers commercial cooling power for large open floor plans.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Living Room Window AC FAQs
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
                        title="Oahu Living Room Cooling Reviews"
                        subtitle="Homeowners who stay comfortable all day with Dual Inverter ACs"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
