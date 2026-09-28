'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Building2, 
    HardHat, 
    ArrowRight, 
    Truck, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    FileText,
    Receipt,
    ShieldCheck
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Do you provide window air conditioners for construction jobsite trailers on Oahu?",
        a: "Yes! Construction trailers and mobile offices are exposed to extreme sun and high heat. We supply durable, high-BTU window units (12,000 to 23,500 BTU) in stock for immediate jobsite pickup or delivery."
    },
    {
        q: "Can you provide commercial invoice billing for business accounts?",
        a: "Yes. We work directly with general contractors, property managers, and commercial business accounts across Oahu, providing itemized invoices with Hawaii GET tax documentation."
    },
    {
        q: "Are commercial purchases eligible for the $45 Hawaii Energy rebate?",
        a: "Qualifying Energy Star certified window AC models are eligible for the $45 Hawaii Energy cash rebate on qualifying utility meters. We supply the pre-approved application form PDF."
    },
    {
        q: "How fast can we pick up units for a commercial jobsite?",
        a: "Units in our Waipahu warehouse are available for same-day pickup by appointment. For multi-unit jobsite deliveries, we coordinate island-wide flat-rate transport directly to your site."
    }
];

export default function CommercialWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Commercial Window AC Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Building2 className="size-3.5" />
                        <span>Jobsite Trailers &bull; Offices &bull; Retail &bull; Waipahu Stock</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Commercial Window AC <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Reliable heavy-duty cooling for construction jobsite trailers, security guard shacks, industrial offices, and retail boutiques across Oahu. In-stock inventory in Waipahu with commercial invoicing and rapid delivery.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Commercial Grade Units
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Commercial Desk: (808) 488-1111"
                            eventLabel="Commercial AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Commercial Use Cases */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <HardHat className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Construction Trailers</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Mobile jobsite trailers absorb intense direct sun. Our 14,000 to 23,500 BTU inverter units provide continuous, heavy-duty cooling in dusty environments.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Security Guard Shacks</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Compact 6,000 to 8,000 BTU models keep guard stations cool 24/7 on standard 115V circuits with minimal electric draw.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Building2 className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Retail & Small Offices</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            44 dB ultra-quiet Dual Inverters ensure customers and employees stay cool without disruptive compressor roar.
                        </p>
                    </div>
                </section>

                {/* Commercial Account Perks */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                CONTRACTOR & BUSINESS SERVICE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Streamlined Commercial Purchasing
                            </h2>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Detailed commercial PDF receipts with Hawaii GET documentation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Same-day warehouse pickup for urgent jobsite replacements</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Standard exterior window AC brackets and clean jobsite installation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Pre-approved $45 Hawaii Energy rebate documentation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                            <Receipt className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Need a Commercial Quote?</h3>
                            <p className="text-xs text-slate-300">
                                Contact our Waipahu headquarters for multi-unit commercial orders or jobsite trailer cooling setups.
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="(808) 488-1111"
                                eventLabel="Commercial Quote Call"
                                className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Commercial Window AC FAQs
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
                    title="Commercial & Office Client Reviews"
                    subtitle="Trusted by businesses and contractors across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
