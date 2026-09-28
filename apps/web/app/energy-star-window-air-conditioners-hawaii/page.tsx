'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Zap, 
    ShieldCheck, 
    ArrowRight, 
    DollarSign, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    FileText,
    Leaf,
    Download
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How much electricity does an Energy Star window AC save in Hawaii?",
        a: "Because Hawaiian Electric (HECO) residential electricity rates average around 44.2¢ per kilowatt-hour, an Energy Star certified Dual Inverter window AC uses up to 35% to 40% less energy than standard models, saving $25 to $60 every month per unit."
    },
    {
        q: "What is CEER rating and why does it matter on Oahu?",
        a: "CEER stands for Combined Energy Efficiency Ratio. Unlike older EER ratings, CEER measures energy use both while cooling and while in standby/off mode. High CEER ratings (14.5 to 15.0+) ensure your unit isn't bleeding phantom power while idle."
    },
    {
        q: "How do I claim the $45 Hawaii Energy cash rebate?",
        a: "When you purchase an eligible Energy Star window AC from Affordable Home AC, we provide the pre-approved Hawaii Energy application form PDF. Simply attach your itemized receipt and submit online or by mail for your $45 cash rebate check."
    },
    {
        q: "Are mini-split AC units eligible for this $45 rebate?",
        a: "No. The $45 cash rebate is strictly for qualifying Energy Star certified Window Air Conditioners. Affordable Home A/C does not participate in mini-split rebates."
    }
];

export default function EnergyStarWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Energy Star Window AC Hawaii' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Leaf className="size-3.5" />
                        <span>High CEER Efficiency &bull; $45 Hawaii Energy Rebate Eligible</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Energy Star Window AC <span className="text-primary italic">Hawaii</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        With Oahu electric rates near ~44.2¢/kWh, running an inefficient, legacy window AC can add over $120 a month to your HECO bill. Our Energy Star certified LG Dual Inverter window air conditioners slash power draw by up to 40% while keeping your home ice cold.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Energy Star In-Stock Units
                            <ArrowRight className="size-4" />
                        </Link>
                        <a 
                            href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            <Download className="size-4" />
                            Download $45 Rebate PDF
                        </a>
                    </div>
                </section>

                {/* Economics Breakdown */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-2">
                            THE HECO 44.2¢ / KWH REALITY
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            How Inverter Tech Cuts Your Electric Bill
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <span className="text-xs font-mono text-slate-400 uppercase">Standard Fixed Compressor</span>
                            <div className="text-2xl font-black text-rose-400 font-header">High Power Spikes</div>
                            <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                Traditional ACs cycle 100% ON and 100% OFF constantly, drawing huge inrush currents and wasting power every time the compressor kicks on.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <span className="text-xs font-mono text-slate-400 uppercase">LG Dual Inverter</span>
                            <div className="text-2xl font-black text-emerald-400 font-header">Modulating Speed</div>
                            <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                Variable-speed twin rotaries ramp down once your room is cool, maintaining exact temperatures while drawing as little as 25% power.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <span className="text-xs font-mono text-slate-400 uppercase">Estimated Savings</span>
                            <div className="text-2xl font-black text-primary font-header">$25–$60 / mo</div>
                            <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                Over a typical Oahu summer, an Energy Star Dual Inverter window unit easily pays back its initial cost in electricity savings alone.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Hawaii Energy Rebate Banner */}
                <section className="mb-16 p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest block">
                                OFFICIAL PARTICIPATING RETAILER
                            </span>
                            <h3 className="text-2xl font-header font-black uppercase text-white">
                                Instant $45 Cash Rebate on Window ACs
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Hawaii Energy offers a <strong>$45 cash rebate</strong> for qualifying Energy Star certified window air conditioners. As a trusted local distributor, Affordable Home A/C provides the official pre-approved application form and receipt with your purchase.
                            </p>
                            <p className="text-xs text-slate-400 font-sans">
                                <em>Note: Cash rebates apply strictly to qualifying window air conditioners. Mini-split ACs are not eligible.</em>
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-black/40 border border-emerald-500/20 text-center space-y-4">
                            <FileText className="size-10 text-emerald-400 mx-auto" />
                            <h4 className="font-header font-bold text-base uppercase text-white">Pre-Approved Form PDF</h4>
                            <p className="text-xs text-slate-300">
                                Download version 4 of the official Hawaii Energy Window AC Purchase Application directly:
                            </p>
                            <a 
                                href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                            >
                                <Download className="size-4" />
                                Download Form PDF
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Energy Star AC FAQs
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
                    title="Homeowners Saving on HECO Bills"
                    subtitle="Real reviews from Oahu residents who upgraded to Energy Star units"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
