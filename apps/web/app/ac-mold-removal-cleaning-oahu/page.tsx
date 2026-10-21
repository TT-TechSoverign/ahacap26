'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Sparkles, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    AlertTriangle,
    Wind,
    Wrench,
    Droplets,
    Phone,
    Home
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const FAQS = [
    {
        q: "How does mold grow inside my air conditioner in Hawaii?",
        a: "Oahu's year-round 80%+ humidity combined with dark, damp indoor evaporator coils creates the ideal breeding ground for mold spores like Cladosporium and Aspergillus. Over months, spores colonize the cylindrical blower wheel and drip pan, blowing microscopic allergens into your home every time the unit runs."
    },
    {
        q: "What is the best solution for mold inside a Window AC?",
        a: "For lightly soiled newer window units, routine filter washing, surface coil sanitization, and drain pan treatment keep mold away. For older window units with heavy black mold caked inside the sealed Styrofoam air channels, upgrading to a brand-new factory-sealed LG Dual Inverter ($560+ with a $45 Hawaii Energy rebate) is the cleanest and most economical long-term solution."
    },
    {
        q: "Will the service process make a water mess on my walls or floor?",
        a: "Zero water mess. Our technicians lay protective floor drop cloths directly under the window opening during service or unit replacement, keeping your home spotless."
    },
    {
        q: "How often should Oahu homeowners clean their AC filters and coils?",
        a: "In humid island microclimates like Kaneohe, Kailua, Manoa, and coastal Ewa Beach, we recommend washing slide-out filters every 2–4 weeks and scheduling seasonal maintenance every 6 to 12 months."
    }
];

export default function AcMoldRemovalCleaningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Mold Removal & Deep Cleaning' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="size-3.5" />
                        <span>Window AC Cleaning &amp; Replacement &bull; Drop-Cloth Protection</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Mold Removal <span className="text-primary italic">&amp; Cleaning Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Notice black specks on your AC louvers or a sour, musty smell when you turn the unit on? Island humidity breeds hidden mold inside damp air channels and condensate pans. Learn when to clean your window AC and when to upgrade to a fresh, factory-sealed LG Dual Inverter.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/ac-cleaning-oahu"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Explore Window AC Cleaning &amp; Care
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Triage Desk: (808) 488-1111"
                            eventLabel="Mold Cleaning Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Service Tiers Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">ROUTINE SANITIZATION</span>
                            <span className="text-2xl font-black text-white font-header">By Appt</span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">Window AC Cleaning &amp; Tune-Up</h2>
                        <p className="text-xs text-slate-300 font-sans">
                            Designed for routine maintenance on lightly soiled window units showing minor odor or surface dust buildup.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Surface coil sanitation &amp; antimicrobial treatment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Air filter extraction, wash, &amp; disinfection</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Condensate pan &amp; drain channel flush</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Floor drop cloth protection under window unit</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/ac-cleaning-oahu" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Book Window AC Cleaning &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-b from-primary/10 to-surface-dark border border-primary/30 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">FACTORY-SEALED UPGRADE</span>
                            <span className="text-2xl font-black text-primary font-header">$395–$1,200</span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">New LG &amp; GE Window AC Upgrade</h2>
                        <p className="text-xs text-slate-300 font-sans">
                            Our #1 recommendation for older window units with stubborn internal mold, rusted pans, and high HECO electric draw.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>100% spore-free, factory-sealed LG Dual Inverter &amp; GE units</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Gold Fin™ anti-corrosion coating for Hawaii coastal air</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Up to 40% HECO electric bill savings + $45 Hawaii Energy Rebate</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Free Waipahu warehouse pickup or $50 flat Oahu delivery</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/shop" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Shop In-Stock Window ACs &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                ZERO WATER MESS PROMISE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth Standard
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Every on-site service and window unit installation includes protective floor drop cloths laid directly under your window opening to keep your floors and furniture spotless.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Insured Oahu Cooling Specialists:</strong> All service and installation work is performed by experienced local technicians, protecting equipment warranties and electrical safety.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <ShieldCheck className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Breathe Clean Island Air</h3>
                            <p className="text-xs text-slate-300">
                                Eliminate allergens, spore circulation, and musty odors. Service available island-wide across all 22 Oahu municipalities.
                            </p>
                            <Link href="/ac-cleaning-oahu" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Schedule Window AC Service
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            AC Mold Removal FAQs
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

                <WindowAcQuickShop
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,200)"
                    subheading="Skip expensive compressor or sealed-system repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />

                <ReviewsPavilion 
                    variant="marquee" 
                    title="Clean Air & Mold Removal Reviews"
                    subtitle="Real stories from Oahu families breathing clean, fresh air again"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
