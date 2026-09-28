'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Zap, 
    ShieldCheck, 
    ArrowRight, 
    Moon, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Volume2,
    Bed,
    Plug
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Can a 6,000 or 8,000 BTU window AC plug into a regular wall outlet?",
        a: "Yes! Both 6,000 and 8,000 BTU units use standard 115-volt 3-prong household plugs (NEMA 5-15P) and draw very low running amps, so they operate safely on standard 15-amp residential circuits without tripping breakers."
    },
    {
        q: "What room size does an 8,000 BTU window AC cool in Hawaii?",
        a: "An 8,000 BTU unit cools bedrooms up to 350 sq ft comfortably, even in uninsulated single-wall plantation homes with morning or afternoon sun exposure."
    },
    {
        q: "How quiet are the 6,000 and 8,000 BTU LG Dual Inverter models?",
        a: "In low sleep mode, LG Dual Inverter models operate at just 44 dB—quieter than a normal conversational whisper and significantly quieter than traditional rotary compressors."
    },
    {
        q: "Do these models qualify for the $45 Hawaii Energy cash rebate?",
        a: "Yes! Qualifying Energy Star certified Dual Inverter window ACs qualify for an official $45 cash rebate from Hawaii Energy. We provide the official pre-approved application form PDF."
    }
];

export default function SmallRoomWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Small Room Window AC (6,000 - 8,000 BTU)' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Bed className="size-3.5" />
                        <span>Bedroom & Office Cooling &bull; Standard 115V Plug</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Small Room Window AC <span className="text-primary italic">6,000 to 8,000 BTU</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        The ultimate cooling solution for bedrooms, home offices, and nursery rooms across Oahu. Operates quietly at 44 dB on standard 115V outlets without overloading older plantation home wiring.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop 6,000 & 8,000 BTU Models
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Waipahu Warehouse: (808) 488-1111"
                            eventLabel="Small Room AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Feature Highlights */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Volume2 className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">44 dB Whisper Sleep</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Dual Inverter technology eliminates harsh compressor clunks and hums, ensuring uninterrupted sleep for light sleepers.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Plug className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Standard 115V Outlet</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Plugs straight into any standard 3-prong household outlet. No 230V sub-panel upgrade or specialized wiring required.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Zap className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Cuts HECO Power Use</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Save up to 40% on monthly electric bills compared to older non-inverter units under Oahu’s ~44.2¢/kWh residential rate.
                        </p>
                    </div>
                </section>

                {/* Model Comparison Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">MODEL: LW6023IVSM</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">$45 Rebate Qualified</span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">LG Dual Inverter 6,000 BTU</h2>
                        <p className="text-xs text-slate-300 font-sans">Ideal for small bedrooms, baby nurseries, and compact home offices up to 250 sq ft.</p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Electrical:</strong> 115V &bull; 4.6 Amps Running Current</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Sound Level:</strong> 44 dB in Sleep Mode</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Controls:</strong> Wi-Fi ThinQ smartphone enabled</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/shop" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Check Stock in Shop &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">MODEL: LW8022IVSM</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">$45 Rebate Qualified</span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">LG Dual Inverter 8,000 BTU</h2>
                        <p className="text-xs text-slate-300 font-sans">Our #1 best-selling bedroom unit. Effortlessly cools master bedrooms and studio suites up to 350 sq ft.</p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Electrical:</strong> 115V &bull; 6.3 Amps Running Current</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Sound Level:</strong> 44 dB Low Fan Mode</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span><strong>Energy Star:</strong> CEER 15.0 certified rating</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/shop" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Check Stock in Shop &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Professional Installation & Clean Jobsite Promise */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL INSTALLATION OPTIONS
                            </span>
                            <h3 className="text-2xl font-header font-black uppercase text-white">
                                Standard Window Mounting & Brackets
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Need help installing into your window or jalousie louvers? Our licensed technicians provide professional window installation. We use standard window AC brackets for secure exterior sill support when required.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> Our technicians lay clean floor drop cloths under every unit during work, leaving your bedroom cleaner than when we arrived.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h4 className="font-header font-bold text-base uppercase text-white">In Stock at Waipahu Warehouse</h4>
                            <p className="text-xs text-slate-300">
                                Pick up today at 94-150 Leoleo St #203 by appointment, or choose flat $50 delivery anywhere on Oahu.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Order 6,000 or 8,000 BTU Unit
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Small Room Window AC FAQs
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
                    title="Small Room & Bedroom AC Reviews"
                    subtitle="Real 5-star reviews from Oahu homeowners enjoying cool, quiet sleep"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
