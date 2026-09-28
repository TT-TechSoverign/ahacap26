'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Briefcase, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Building2,
    Sparkles,
    Clock,
    FileText,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does scheduling work for businesses during operating hours?",
        a: "We perform all appointments during standard daytime business hours. Because our technicians lay protective drop cloths beneath every unit and utilize quiet, self-contained washing equipment with zero water runoff, many Oahu offices, boutiques, and clinics easily schedule during normal morning hours or quiet mid-day windows without client disruption. If you have specific scheduling constraints, contact our dispatch desk at (808) 488-1111 or submit an inquiry to see if we are able to assist your location."
    },
    {
        q: "How does dirty AC affect commercial environments?",
        a: "Dirty coils and moldy blower wheels cause musty smells that clients notice immediately, degrade employee cognitive performance, and drive up HECO commercial electric bills substantially. Regular cleaning protects customer satisfaction and brand reputation."
    },
    {
        q: "Do you service both ductless mini split systems and window ACs?",
        a: "Yes. We service high-wall mini splits on-site with floor drop cloths ($175 Basic, $275 Premium Teardown). For commercial window units, we provide on-site diagnostics, filter servicing, and direct warehouse replacement installations."
    },
    {
        q: "Are you fully licensed and insured for commercial property management?",
        a: "Yes. Affordable Home A/C is fully licensed (Hawaii Contractor License CT-36775) and carry comprehensive general liability and workers' compensation coverage suitable for commercial leases and HOA requirements."
    }
];

const INDUSTRIES = [
    {
        title: "Medical & Dental Practices",
        desc: "Strict clinical hygiene requirements. We eradicate microbial biofilm and fungal spores from treatment room air handlers."
    },
    {
        title: "Boutique Retail & Showrooms",
        desc: "Protect valuable inventory from moisture and airborne dust while providing an odorless, welcoming customer atmosphere."
    },
    {
        title: "Hair Salons & Spas",
        desc: "Remove aerosol hairspray buildup, skin flakes, and humidity from clogged salon split systems to restore high airflow."
    },
    {
        title: "Offices & Coworking Suites",
        desc: "Ensure crisp, silent, reliable cooling that keeps employees focused and reduces sick days caused by stale indoor air."
    }
];

export default function CommercialAcCleaningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Commercial AC Cleaning Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Building2 className="size-3.5" />
                        <span>Professional Daytime Care &bull; Clean Drop-Cloth Standard</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Commercial AC Cleaning <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Boutique retailers, dental clinics, salons, and professional offices across Honolulu and Oahu trust our licensed technicians for clean, courteous daytime mini split cleaning and maintenance. Spotless floor drop-cloth protection guaranteed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Inquire About Commercial Service
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Commercial Inquiries: (808) 488-1111"
                            eventLabel="Commercial AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Industry Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">TARGETED COMMERCIAL SOLUTIONS</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Tailored for Oahu Small Businesses
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {INDUSTRIES.map((ind, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{ind.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Commercial Assurance Box */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                ZERO PROPERTY IMPACT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth & Equipment Shrouding
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                We protect your computers, display merchandise, dental chairs, and fine flooring. Every service includes complete floor drop cloths and closed containment buckets to guarantee zero water runoff.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Licensed CT-36775 & Insured:</strong> Full compliance documentation, W-9, and certificates of insurance provided upon request for commercial leases and property managers.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <FileText className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Itemized Business Receipts</h3>
                            <p className="text-xs text-slate-300">
                                Detailed breakdown of each unit serviced, licensed contractor CT-36775 verification, and Hawaii GET compliance for your business expense records.
                            </p>
                            <Link href="/contact" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                Contact Dispatch to Inquire
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Commercial Cleaning FAQs
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
                    title="Commercial Client Reviews"
                    subtitle="Trusted by local businesses, retailers, and medical offices across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
