'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Home, 
    Sun, 
    ArrowRight, 
    ShieldCheck, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Flame,
    Zap,
    ThermometerSnowflake
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why do single-wall homes in Hawaii require larger AC units?",
        a: "Historic single-wall plantation homes built between 1920 and 1970 use single 3/4-inch tongue-and-groove cedar or redwood boards with zero fiberglass insulation or wall cavities. By mid-afternoon, intense tropical sunlight radiates heat directly through the exterior walls. Sizing must factor in this thermal load with our Island Microclimate Calibration."
    },
    {
        q: "Can older electrical wiring in single-wall homes handle modern air conditioners?",
        a: "Yes, when paired with LG Dual Inverter technology. Inverter compressors feature soft-start electronics that eliminate the 30-amp inrush current spike of older units, running safely on older 15-amp residential circuits without tripping breakers."
    },
    {
        q: "Can you install an AC in a single-wall home with jalousie windows?",
        a: "Yes! Our technicians specialize in custom jalousie window framing and standard exterior support brackets, ensuring an airtight, weatherproof fit that protects historic wooden window frames."
    },
    {
        q: "Do units for single-wall homes qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! All qualifying Energy Star certified LG Dual Inverter models qualify for an official $45 cash rebate from Hawaii Energy. We provide the application PDF with your receipt."
    }
];

export default function SingleWallConstructionAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Single-Wall Construction AC Cooling' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Home className="size-3.5" />
                        <span>Plantation Redwood Architecture &bull; Island Microclimate Calibration</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Single-Wall Construction <span className="text-primary italic">AC Cooling Hawaii</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Plantation homes across Kaimuki, Manoa, Kalihi, Pearl City, and Wahiawa have uninsulated single-board walls that absorb intense afternoon heat. Mainstream mainland sizing charts fail here. Our Island Microclimate Calibration ensures your rooms stay cool without tripping older electrical breakers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Calibrated Inverter Units
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Plantation Sizing Desk: (808) 488-1111"
                            eventLabel="Single Wall Sizing Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Single Wall Physics Breakdown */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-2">
                            HAWAII ARCHITECTURE CHALLENGES
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Why Mainland Sizing Rules Fail on Oahu
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <Flame className="size-8 text-amber-400" />
                            <h3 className="font-header font-bold text-base uppercase text-white">Thermal Wall Heat Soak</h3>
                            <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                Single 3/4&quot; tongue-and-groove redwood has an R-value of just R-1. Afternoon sun turns exterior walls into radiating radiators.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <Zap className="size-8 text-rose-400" />
                            <h3 className="font-header font-bold text-base uppercase text-white">Older 15A Electrical Circuits</h3>
                            <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                Plantation homes often share a single 15-amp breaker across multiple bedrooms. High startup amp spikes cause frequent breaker trips.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <ThermometerSnowflake className="size-8 text-primary" />
                            <h3 className="font-header font-bold text-base uppercase text-white">Island Microclimate Fix</h3>
                            <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                We bump capacity by 20–30% with variable-speed Dual Inverters, cooling the heat soak while modulating down to save electricity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sizing Comparison Table */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10">
                    <h3 className="font-header font-bold text-xl uppercase text-white mb-4">
                        Single-Wall Sizing Recommendation Guide
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                            <thead>
                                <tr className="border-b border-white/10 text-primary">
                                    <th className="pb-3">Room Type</th>
                                    <th className="pb-3">Square Feet</th>
                                    <th className="pb-3">Standard Mainland Rec</th>
                                    <th className="pb-3 text-emerald-400">Hawaii Single-Wall Rec</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300 font-sans">
                                <tr>
                                    <td className="py-3 font-semibold text-white">Small Bedroom / Nursery</td>
                                    <td className="py-3 font-mono">100–150 sq ft</td>
                                    <td className="py-3 font-mono">5,000 BTU</td>
                                    <td className="py-3 font-mono font-bold text-emerald-400">6,000 – 8,000 BTU Inverter</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-white">Master Bedroom</td>
                                    <td className="py-3 font-mono">150–250 sq ft</td>
                                    <td className="py-3 font-mono">6,000 BTU</td>
                                    <td className="py-3 font-mono font-bold text-emerald-400">8,000 – 10,000 BTU Inverter</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-white">Open Living Room</td>
                                    <td className="py-3 font-mono">350–550 sq ft</td>
                                    <td className="py-3 font-mono">10,000 BTU</td>
                                    <td className="py-3 font-mono font-bold text-emerald-400">12,000 – 14,000 BTU Inverter</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-semibold text-white">Combined Living / Dining</td>
                                    <td className="py-3 font-mono">600–900+ sq ft</td>
                                    <td className="py-3 font-mono">14,000 BTU</td>
                                    <td className="py-3 font-mono font-bold text-emerald-400">18,000 – 23,500 BTU (230V)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                RESPECTING HISTORIC HAWAII HOMES
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth Standard
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our licensed technicians treat historic Douglas fir and redwood woodwork with extreme care. We lay protective floor drop cloths under every window and seal openings cleanly without damaging original wood trims.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Standard Brackets:</strong> We install standard exterior window AC support brackets anchored securely to outside sills, relieving mechanical strain from older single-wall window frames.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">In Stock in Waipahu</h3>
                            <p className="text-xs text-slate-300">
                                Pick up at 94-150 Leoleo St #203 by appointment, or choose flat $50 island-wide delivery with installation.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View Calibrated Inventory
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Single-Wall AC FAQs
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
                    title="Plantation Home AC Reviews"
                    subtitle="Real reviews from Oahu homeowners in classic single-wall homes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
