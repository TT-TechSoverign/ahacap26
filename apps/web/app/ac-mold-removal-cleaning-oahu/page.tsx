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

const FAQS = [
    {
        q: "How does mold grow inside my air conditioner in Hawaii?",
        a: "Oahu's year-round 80%+ humidity combined with dark, damp indoor evaporator coils creates the ideal breeding ground for mold spores like Cladosporium and Aspergillus. Over months, spores colonize the cylindrical blower wheel and drip pan, blowing microscopic allergens into your home every time the unit runs."
    },
    {
        q: "What is the difference between Basic and Premium AC mold cleaning?",
        a: "Our Basic Mini Split AC Cleaning ($175) provides clinical coil sanitization, air filter wash, and condensate drain flush. Our Premium Deep Cleaning (Full Teardown) ($275) completely disassembles the casing to access hidden mold, deep cleans the air scoop, pulls the blower fan wheel for 360-degree decontamination, and scrubs the condensate pan."
    },
    {
        q: "Will the cleaning process make a water mess on my walls or floor?",
        a: "Zero water mess. Our licensed technicians lay protective floor drop cloths directly under the indoor unit. Precision rinse systems capture 100% of dirty water and mold slurry, safely removing all contaminants from your home."
    },
    {
        q: "How often should Oahu homeowners get their AC mold cleaned?",
        a: "In humid island microclimates like Kaneohe, Kailua, Manoa, and coastal Ewa Beach, we recommend deep sanitization every 6 to 12 months to prevent respiratory irritation and preserve system efficiency."
    }
];

export default function AcMoldRemovalCleaningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Mold Removal & Deep Cleaning' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="size-3.5" />
                        <span>Clinical Mold Neutralization &bull; Drop-Cloth Protection</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Mold Removal <span className="text-primary italic">& Deep Cleaning Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Notice black specks on your AC louvers or a sour, musty smell when you turn the unit on? Island humidity breeds hidden mold inside blower wheels and condensate pans. Our licensed technicians perform clinical chemical sanitization that eradicates mold at the source.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book $175 Basic / $275 Premium Clean
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
                            <span className="text-2xl font-black text-white font-header">$175 <span className="text-xs text-slate-400 font-sans font-normal">/ unit</span></span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">Basic Mini Split AC Cleaning</h2>
                        <p className="text-xs text-slate-300 font-sans">
                            Designed for annual maintenance on lightly soiled units showing minor odor or routine dust buildup.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Coil sanitation & antimicrobial treatment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Air filter extraction, chemical wash, & disinfection</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Gravity condensate drain line flush</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Floor drop cloth protection under indoor unit</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Book Basic Service &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-b from-primary/10 to-surface-dark border border-primary/30 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">CLINICAL TEARDOWN</span>
                            <span className="text-2xl font-black text-primary font-header">$275 <span className="text-xs text-slate-400 font-sans font-normal">/ unit</span></span>
                        </div>
                        <h2 className="font-header font-black text-2xl uppercase text-white">Premium Deep Cleaning (Full Teardown)</h2>
                        <p className="text-xs text-slate-300 font-sans">
                            Our gold standard for stubborn mold, black specks on louvers, musty odors, and multi-year neglect.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Complete casing disassembly to access hidden interior dirt</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Deep clean air scoop & 360° blower fan wheel scrub</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>Deep clean & flush condensate drip pan</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>High-volume chemical coil wash restoring 100% velocity</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                                Book Premium Teardown &rarr;
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
                                Chemical cleaning requires water, but none of it touches your floors or furniture. Our licensed technicians lay protective floor drop cloths directly under the indoor unit. Precision rinse systems safely flush out the mold slurry into closed disposal containers.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Contractor License CT-36775:</strong> All sanitization is performed by licensed HVAC professionals, protecting equipment warranties and electrical circuitry.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <ShieldCheck className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Breathe Clean Island Air</h3>
                            <p className="text-xs text-slate-300">
                                Eliminate allergens, spore circulation, and musty odors. Service available island-wide across all 22 Oahu municipalities.
                            </p>
                            <Link href="/mini_split_ac_maintenance" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Schedule Mold Cleaning
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
