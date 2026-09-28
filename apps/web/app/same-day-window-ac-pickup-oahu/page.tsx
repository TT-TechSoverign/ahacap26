'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Clock, 
    Warehouse, 
    ArrowRight, 
    ShieldCheck, 
    CheckCircle2, 
    Car, 
    ChevronDown, 
    Sparkles, 
    Phone,
    Flame,
    Zap
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Can I pick up a window AC today on Oahu?",
        a: "Yes! All in-stock models listed on our website are physically stored in our Waipahu warehouse at 94-150 Leoleo St #203. Simply place your order online and our dispatch team will coordinate your same-day pickup appointment."
    },
    {
        q: "How fast is the pickup process once I arrive?",
        a: "Because pickups are arranged by appointment, your unit is pulled from the shelf, inspected, and waiting on the loading dock when you arrive. Our team assists with loading into your vehicle in under 10 minutes."
    },
    {
        q: "What if I can't pick it up myself today?",
        a: "We offer island-wide flat-rate $50 delivery to any Oahu address from Hawaii Kai to Haleiwa, with prompt dispatch options."
    },
    {
        q: "Do I get the $45 Hawaii Energy rebate on same-day pickups?",
        a: "Yes! We hand you the pre-approved Hawaii Energy application PDF and an itemized purchase receipt directly at our warehouse."
    }
];

export default function SameDayWindowAcPickupPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Same-Day Window AC Pickup' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Flame className="size-3.5" />
                        <span>Emergency Island Heatwave Relief &bull; Fast Waipahu Loading</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Same-Day Window AC Pickup <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        AC died in the middle of a muggy Kona heatwave? Don’t suffer through the night or wait weeks for mainland shipping. Order online and pick up an in-stock LG Dual Inverter window unit directly at our central Waipahu warehouse by appointment.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Today’s In-Stock Inventory
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Emergency Pickup: (808) 488-1111"
                            eventLabel="Same Day Pickup Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 3 Step Process */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-2">
                            FAST & HASSLE-FREE
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            How Same-Day Pickup Works
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                        <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                            <span className="text-2xl font-black text-primary font-header">01</span>
                            <h3 className="font-header font-bold text-lg text-white uppercase">Order Online</h3>
                            <p className="text-slate-300 font-sans text-xs leading-relaxed">
                                Select your model in our Shop ($504 to $1,025) and choose Waipahu Warehouse Pickup at checkout.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                            <span className="text-2xl font-black text-primary font-header">02</span>
                            <h3 className="font-header font-bold text-lg text-white uppercase">Instant Confirmation</h3>
                            <p className="text-slate-300 font-sans text-xs leading-relaxed">
                                Our dispatch team contacts you to set your appointment window and stage your inspected unit.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                            <span className="text-2xl font-black text-primary font-header">03</span>
                            <h3 className="font-header font-bold text-lg text-white uppercase">Drive Up & Load</h3>
                            <p className="text-slate-300 font-sans text-xs leading-relaxed">
                                Pull into 94-150 Leoleo St #203. Our team loads your vehicle in under 10 minutes so you head home to cool relief.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Warehouse Location Info */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                CONVENIENT CENTRAL WAIPAHU
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Minutes From Everywhere
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Centrally situated right off Farrington Highway near Leeward Community College, our warehouse is an easy 10 to 20 minute drive from Kapolei, Ewa Beach, Mililani, Pearl City, Aiea, and Honolulu.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Loading Assistance:</strong> We supply protective cardboard cushioning and load the boxed unit safely into your vehicle.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Call Ahead For Pickup</h3>
                            <p className="text-xs text-slate-300">
                                Need an immediate pickup window right now? Call our warehouse coordinator directly:
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="(808) 488-1111"
                                eventLabel="Direct Warehouse Call"
                                className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Same-Day Pickup FAQs
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
                    title="Same-Day Pickup Reviews"
                    subtitle="Real stories from Oahu residents who needed fast relief from the heat"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
