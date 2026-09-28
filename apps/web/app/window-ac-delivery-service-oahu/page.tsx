'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Truck, 
    ShieldCheck, 
    ArrowRight, 
    MapPin, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    DollarSign,
    Clock,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How much does window AC delivery cost on Oahu?",
        a: "We charge a flat rate of $50 for delivery anywhere on Oahu, from Hawaii Kai and urban Honolulu to Ewa Beach, Kapolei, Kailua, and the North Shore."
    },
    {
        q: "How quickly can my window AC be delivered?",
        a: "Units in stock at our Waipahu warehouse are typically scheduled for delivery within 24 to 48 hours. Our dispatch team coordinates a 2-hour delivery window directly with you."
    },
    {
        q: "Can you install the window AC when you deliver it?",
        a: "Yes! You can choose our professional window AC installation add-on at checkout. Our licensed technicians will deliver the unit, lay protective floor drop cloths, securely mount the unit with standard brackets if required, and test cooling operation before leaving."
    },
    {
        q: "Can I pick up the unit myself instead of paying for delivery?",
        a: "Yes! Warehouse pickup at our Waipahu facility (94-150 Leoleo St #203) is completely free ($0) by appointment."
    }
];

export default function WindowAcDeliveryServicePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Window AC Delivery Service' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Truck className="size-3.5" />
                        <span>Island-Wide Flat Rate &bull; Straight To Your Doorstep</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Delivery Service <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Need an air conditioner but don’t have an SUV, truck, or time to drive to Waipahu? We provide flat \$50 island-wide delivery from our central warehouse to any residence on Oahu, with optional professional installation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Inventory with $50 Delivery
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Dispatch: (808) 488-1111"
                            eventLabel="AC Delivery Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Pricing & Guarantee Banner */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono text-xs">
                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <DollarSign className="size-8 text-primary mx-auto" />
                            <div className="text-2xl font-header font-black text-white">Flat $50 Island-Wide</div>
                            <p className="text-slate-300 font-sans text-xs">No mileage fees or distance markups anywhere on Oahu.</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <Clock className="size-8 text-emerald-400 mx-auto" />
                            <div className="text-2xl font-header font-black text-white">24-48 Hr Dispatch</div>
                            <p className="text-slate-300 font-sans text-xs">Fast delivery coordination with a 2-hour arrival window.</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <ShieldCheck className="size-8 text-primary mx-auto" />
                            <div className="text-2xl font-header font-black text-white">Damage-Free Transit</div>
                            <p className="text-slate-300 font-sans text-xs">Transported upright and cushioned by HVAC technicians.</p>
                        </div>
                    </div>
                </section>

                {/* Island Coverage Matrix */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                ALL 22 OAHU MUNICIPALITIES
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Delivering Island-Wide
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                From urban Honolulu high-rises to rural North Shore plantation homes, our delivery team covers the entire island of Oahu for a simple flat fee of $50:
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                                <div>&bull; Honolulu / Waikiki / McCully</div>
                                <div>&bull; Ewa Beach / Kapolei / Waipahu</div>
                                <div>&bull; Kailua / Kaneohe / Waimanalo</div>
                                <div>&bull; Mililani / Wahiawa / Kunia</div>
                                <div>&bull; Pearl City / Aiea / Halawa</div>
                                <div>&bull; Haleiwa / Waialua / Hauula</div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Home className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Add Installation at Checkout</h3>
                            <p className="text-xs text-slate-300">
                                Have your unit professionally mounted and weather-sealed upon delivery. Our technicians lay clean floor drop cloths under every window.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Order Unit with Delivery
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Delivery Service FAQs
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
                    title="Island Delivery Reviews"
                    subtitle="Hear from customers who had units delivered across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
