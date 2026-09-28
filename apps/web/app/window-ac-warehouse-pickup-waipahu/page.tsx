'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Warehouse, 
    Clock, 
    MapPin, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Truck, 
    ChevronDown, 
    Sparkles, 
    Phone,
    Car,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Where is the Affordable Home AC warehouse located?",
        a: "Our central Oahu warehouse is located at 94-150 Leoleo St. #203, Waipahu, HI 96797. We are easily accessible from H-1 and Farrington Highway, making pickups quick and convenient from Pearl City, Kapolei, Ewa Beach, and Honolulu."
    },
    {
        q: "How does warehouse pickup work?",
        a: "Browse our online Shop and purchase your unit with zero hassle. Select 'Waipahu Warehouse Pickup' at checkout. Our dispatch team will immediately coordinate an appointment window so your unit is pulled, inspected, and ready the moment you pull up."
    },
    {
        q: "Will an 8,000 or 12,000 BTU window AC fit in my car?",
        a: "Yes! 6,000 to 12,000 BTU units easily fit into the trunk or back seat of a standard sedan or compact SUV. 18,000 and 23,500 BTU units fit comfortably in an SUV, minivan, or truck bed."
    },
    {
        q: "Do warehouse pickup orders receive the $45 Hawaii Energy rebate form?",
        a: "Yes! Our warehouse coordinator hands you the official pre-approved $45 Hawaii Energy rebate application form PDF along with your itemized receipt upon pickup."
    }
];

export default function WindowAcWarehousePickupPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Waipahu Warehouse Pickup' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Warehouse className="size-3.5" />
                        <span>Central Oahu Headquarters &bull; 94-150 Leoleo St #203</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Warehouse Pickup <span className="text-primary italic">Waipahu Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Skip mainland shipping delays and avoid crowded big-box store lines. Pick up your in-stock LG Dual Inverter window air conditioner directly from our central Waipahu warehouse by appointment.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop In-Stock Units for Pickup
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Warehouse: (808) 488-1111"
                            eventLabel="Warehouse Pickup Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Benefits Matrix */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Clock className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Fast Pickup by Appointment</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Order online and schedule your pickup. Your unit is inspected, verified, and staged so you are loaded and on your way in minutes.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Factory Inspected Stock</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Every box is verified by our licensed technicians for zero shipping damage, correct voltage, and authentic manufacturer warranty papers.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Car className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Loading Assistance Included</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Our team helps you carefully load the unit into your trunk, back seat, or truck bed with protective cardboard cushioning.
                        </p>
                    </div>
                </section>

                {/* Location & Map Reassurance */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                EASY HIGHWAY ACCESS
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Centrally Located in Waipahu
                            </h2>
                            <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                                <p><strong>Address:</strong> 94-150 Leoleo St. #203, Waipahu, HI 96797</p>
                                <p><strong>Hours:</strong> Monday – Saturday, 8:00 AM – 5:00 PM (By Appointment)</p>
                                <p><strong>Drive Times:</strong> 10 mins from Pearl City &bull; 12 mins from Kapolei &bull; 15 mins from Ewa Beach &bull; 20 mins from Downtown Honolulu</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-emerald-400">
                                Prefer Delivery? Flat $50 island-wide delivery straight to your doorstep across all 22 Oahu municipalities.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-3">
                            <MapPin className="size-12 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Need Directions?</h3>
                            <p className="text-xs text-slate-300">
                                Call our warehouse coordinator if you need assistance locating our facility or coordinating appointment timing.
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="(808) 488-1111"
                                eventLabel="Warehouse Directions Call"
                                className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Warehouse Pickup FAQs
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
                    title="Waipahu Warehouse Pickup Reviews"
                    subtitle="Local homeowners who picked up their units same-day"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
