'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Zap, 
    ShieldCheck, 
    ArrowRight, 
    Maximize2, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    FileText,
    Flame,
    Home,
    AlertTriangle
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What electrical outlet is required for an 18,000 or 23,500 BTU window AC?",
        a: "18,000 and 23,500 BTU window AC units require a dedicated 208/230-volt circuit with a NEMA 6-15P or NEMA 6-20P outlet. They cannot be plugged into a standard 115V 3-prong household outlet."
    },
    {
        q: "How much square footage does a 23,500 BTU window AC cool in Hawaii?",
        a: "In mainland conditions, 23,500 BTU is rated for up to 1,400 sq ft. However, under Hawaii's Island Microclimate Calibration (factoring uninsulated single-wall redwood framing and solar heat gain), it comfortably cools 1,000 to 1,250 sq ft of open-concept living space."
    },
    {
        q: "Do these heavy window units require exterior mounting brackets?",
        a: "Yes. Units weighing 110 to 140 lbs require heavy-duty standard exterior window AC support brackets to securely bear the cantilever weight against the outer wall sill, preventing window frame strain."
    },
    {
        q: "Are these large window air conditioners eligible for the Hawaii Energy rebate?",
        a: "Yes! Qualifying Energy Star certified Dual Inverter models qualify for an official $45 cash rebate from Hawaii Energy. We provide the pre-approved application form PDF with your purchase."
    }
];

export default function LargeRoomWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Large Room Window AC (18,000 - 23,500 BTU)' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Maximize2 className="size-3.5" />
                        <span>High-Capacity Island Cooling &bull; 230V Heavy Duty</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Large Room Window AC <span className="text-primary italic">18,000 to 23,500 BTU</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Engineered for expansive Hawaiian living rooms, cathedral ceiling spaces, and open-concept floor plans. Featuring variable-speed LG Dual Inverter compressors that slash electricity costs on HECO’s ~44.2¢/kWh tariff while providing whisper-quiet comfort.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop 18,000 & 23,500 BTU Models
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Sizing Specialist: (808) 488-1111"
                            eventLabel="Large Room AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Sizing & Spec Guide */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">MODEL: LW1822IVSM</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">$45 Rebate Qualified</span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">LG Dual Inverter 18,000 BTU</h2>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Cooling Range:</strong> 750 to 1,000 sq ft (Hawaii Calibrated)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Electrical:</strong> 208/230V &bull; NEMA 6-15P Plug &bull; 15A Breaker</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Sound Level:</strong> As low as 44 dB in quiet sleep mode</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Wi-Fi Control:</strong> LG ThinQ app enabled</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/shop" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                View in Shop Catalog &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">MODEL: LW2422IVSM</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">$45 Rebate Qualified</span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">LG Dual Inverter 23,500 BTU</h2>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Cooling Range:</strong> 1,000 to 1,400+ sq ft open floor plans</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Electrical:</strong> 208/230V &bull; NEMA 6-20P Plug &bull; 20A Breaker</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Maximum Airflow:</strong> 530 CFM high-velocity circulation</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Energy Star:</strong> CEER 14.7 high-efficiency rating</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/shop" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                View in Shop Catalog &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Electrical & Installation Notice */}
                <section className="mb-16 p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="size-8 text-amber-400 shrink-0 mt-1" />
                        <div className="space-y-2">
                            <h3 className="font-header font-black text-lg uppercase text-white">Important 230V Electrical Requirement</h3>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                High-capacity 18,000 and 23,500 BTU units require a dedicated 208/230V power receptacle (NEMA 6-15P or 6-20P). They cannot run on ordinary 115V wall outlets. If you do not have a 230V outlet near your window, please consult an electrician or consider our <Link href="/low-voltage-window-ac-115v-oahu" className="text-primary underline">115V high-efficiency models</Link> up to 14,000 BTU.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Standard Brackets & Clean Jobsite Promise */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL INSTALLATION ADD-ON
                            </span>
                            <h3 className="text-2xl font-header font-black uppercase text-white">
                                Standard Exterior Support Brackets
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Because 18,000 and 23,500 BTU window units weigh over 110 lbs, our licensed technicians install standard exterior window AC support brackets. These heavy-gauge steel brackets anchor to your home’s outer sill, transferring the mechanical load away from fragile window frames.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Our Clean Jobsite Standard:</strong> Our technicians lay protective floor drop cloths under every unit and leave your home cleaner than when we arrived.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <ShieldCheck className="size-10 text-emerald-400 mx-auto" />
                            <h4 className="font-header font-bold text-base uppercase text-white">Oahu Delivery & Warehouse Pickup</h4>
                            <p className="text-xs text-slate-300">
                                Pick up same-day at our Waipahu warehouse (94-150 Leoleo St #203) or choose flat $50 island-wide delivery.
                            </p>
                            <div className="pt-2 flex flex-col gap-2">
                                <Link href="/shop" className="px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                    Reserve In-Stock Unit
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Large Room Window AC FAQs
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
                    title="Customer Proof: Living Room & High Capacity"
                    subtitle="Real 5-star reviews from Oahu homeowners with large living spaces"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
