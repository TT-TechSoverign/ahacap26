'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Home, 
    ShieldCheck, 
    ArrowRight, 
    Volume2, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Building,
    Key,
    Plug
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "What size window AC is best for a studio apartment on Oahu?",
        a: "For typical Honolulu studio apartments ranging from 350 to 550 sq ft, an 8,000 to 10,000 BTU LG Dual Inverter unit is ideal. It provides sufficient cooling capacity for island humidity while running on a standard 115V circuit."
    },
    {
        q: "Why is low decibel sound important in a studio apartment?",
        a: "In a studio apartment, your living room, home office, and bed are in the same room. A traditional loud window AC (55+ dB) makes sleeping or watching TV difficult. Our 44 dB Dual Inverter units run at a gentle whisper."
    },
    {
        q: "Can I install this in a rental apartment without damaging the window?",
        a: "Yes! Our technicians use non-destructive compression brackets and foam gaskets that protect window sills and frames, making removal easy when moving out so your security deposit is protected."
    },
    {
        q: "Do studio apartment window ACs qualify for the $45 Hawaii Energy rebate?",
        a: "Yes! Qualifying Energy Star certified Dual Inverter window models qualify for an official $45 cash rebate from Hawaii Energy. We provide the application form PDF upon purchase."
    }
];

export default function StudioApartmentWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Window AC for Studios & Apartments' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Building className="size-3.5" />
                        <span>Honolulu Studios &bull; Waikiki Walk-Ups &bull; 115V Plug-and-Play</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC for Studios <span className="text-primary italic">& Apartments</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        In an open studio or urban apartment, your air conditioner sits just feet away from your bed and sofa. Our 8,000 to 10,000 BTU LG Dual Inverter window units deliver 44 dB whisper cooling that won’t drown out your TV or conversations, while running on standard 115V power.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Studio-Friendly Units
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Waipahu Desk: (808) 488-1111"
                            eventLabel="Studio AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Why Studios Need Inverter Tech */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Volume2 className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">44 dB Whisper Sleep</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            No hard compressor clunks right next to your bed. Sleep deeply through humid Honolulu summer nights.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Plug className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Standard 115V Circuit</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            No expensive electrical panel upgrades required. Plugs into any normal 3-prong apartment outlet safely.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Key className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Renter-Safe Mounting</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Non-destructive installation brackets preserve window frames, sills, and your security deposit.
                        </p>
                    </div>
                </section>

                {/* Apartment Logistics & Pickup */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                EASY TRANSPORT & SIZING
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Fits In Any Car Trunk
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our compact 8,000 and 10,000 BTU models weigh under 65 lbs and easily fit into the trunk or back seat of a standard sedan. Pick up at our Waipahu warehouse (94-150 Leoleo St #203) or have it delivered directly to your apartment building for a flat $50 island-wide fee.
                            </p>
                            <p className="text-xs text-slate-300 font-sans">
                                <strong>Our Clean Jobsite Standard:</strong> When you book professional installation, our technicians lay protective drop cloths under the window and leave your apartment cleaner than when we arrived.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">In Stock in Waipahu</h3>
                            <p className="text-xs text-slate-300">
                                Ready for immediate pickup by appointment or doorstep delivery to McCully, Waikiki, Makiki, and across Oahu.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View Studio AC Models
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Studio Apartment AC FAQs
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
                    title="Studio & Apartment Resident Reviews"
                    subtitle="Real reviews from Honolulu condo and apartment dwellers"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
