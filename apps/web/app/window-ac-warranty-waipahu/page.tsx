'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    ShieldCheck, 
    Wrench, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Award,
    FileText,
    HelpCircle
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What warranty comes with LG Dual Inverter window air conditioners?",
        a: "Every new LG Dual Inverter window AC purchased from Affordable Home A/C includes a 1-year limited manufacturer warranty on parts and labor, plus an extended limited warranty on the Dual Inverter compressor component."
    },
    {
        q: "Do I have to ship my broken unit to the mainland for warranty service?",
        a: "No! Unlike buying online from mainland websites where returns and warranty claims require expensive ocean freight shipping, Affordable Home A/C provides local diagnostic support and bench-testing right here at our Waipahu facility (94-150 Leoleo St #203)."
    },
    {
        q: "What happens if my unit needs service during the warranty period?",
        a: "Simply call our Waipahu office at (808) 488-1111 with your purchase receipt. Our licensed HVAC technicians can diagnose issues on-site or at our facility using authentic manufacturer replacement parts."
    },
    {
        q: "Is Affordable Home A/C a licensed HVAC contractor in Hawaii?",
        a: "Yes. Affordable Home A/C is fully licensed (Hawaii Contractor License CT-36775) and insured, ensuring all installations, diagnostics, and repairs comply with Hawaii state building and electrical standards."
    }
];

export default function WindowAcWarrantyWaipahuPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Window AC Warranty & Support' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <ShieldCheck className="size-3.5" />
                        <span>Hawaii Contractor License CT-36775 &bull; Local Waipahu Support</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Warranty <span className="text-primary italic">& Local Support</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Never worry about mainland warranty runarounds. When you buy from Affordable Home A/C, your investment is protected by a 1-year manufacturer warranty and backed by our dedicated Waipahu warehouse team and local licensed technicians.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Warranty-Protected Inventory
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Warranty Help: (808) 488-1111"
                            eventLabel="Warranty Help Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 3 Pillars of Local Support */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Award className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">1-Year Warranty</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Full manufacturer coverage against mechanical defects, compressor issues, and electronic board failures on every new unit.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Local Support</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            No mailing units back to California. Coordinate an appointment with our Waipahu warehouse team for local warranty assistance.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Contractor CT-36775</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            All installation and service work is conducted by licensed Hawaii HVAC professionals adhering to the highest island standards.
                        </p>
                    </div>
                </section>

                {/* Mainland vs Local Callout */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                THE ISLAND ADVANTAGE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Mainland Website vs Local Oahu Support
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Ordering a heavy window air conditioner from an online mainland retailer might look convenient until something goes wrong. Returning an 80 lb unit via ocean freight can cost hundreds and take weeks. With Affordable Home A/C, you have a physical warehouse in Waipahu and local technicians you can talk to directly.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Clean Jobsite Standard:</strong> During installation, our technicians lay protective floor drop cloths under every unit and leave your home cleaner than when we arrived.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Facility</h3>
                            <p className="text-xs text-slate-300">
                                94-150 Leoleo St #203, Waipahu, HI 96797<br />Open Monday – Saturday by Appointment
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View In-Stock AC Units
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Warranty & Support FAQs
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
                    title="Customer Proof & Local Service"
                    subtitle="Real reviews from Oahu homeowners who trust our warranty and service"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
