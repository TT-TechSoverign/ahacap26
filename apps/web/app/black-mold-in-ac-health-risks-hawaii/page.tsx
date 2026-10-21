'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    AlertOctagon, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    HeartPulse,
    Sparkles,
    Wind,
    Eye,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const FAQS = [
    {
        q: "What are the health risks of black mold inside an air conditioner?",
        a: "When mold colonies establish inside your AC blower wheel, mycotoxins and millions of microscopic spores are propelled into the room. This can cause persistent coughing, wheezing, watery eyes, sinus infections, chronic fatigue, and severe asthma attacks in sensitive individuals."
    },
    {
        q: "How do I know if black spots on my AC vents are mold?",
        a: "Common HVAC molds in Oahu include Cladosporium, Penicillium, and Aspergillus. If you see black, dark green, or fuzzy speckles coating the air outlet louvers, inside the fan barrel, or along the bottom edge of the plastic chassis, active colonization has taken place."
    },
    {
        q: "Why does mold love Hawaii air conditioners so much?",
        a: "Our year-round high humidity (often 75% to 85%), combined with dark, damp indoor coils during cooling cycles and tropical ambient warmth, creates an ideal incubator. Units left uncleaned for over 12 months in windward or coastal areas almost universally harbor mold."
    },
    {
        q: "How does Affordable Home A/C safely resolve moldy Window ACs?",
        a: "For lightly soiled newer window units, we provide on-site coil and filter sanitization with floor drop cloths to protect your home. For older window units with deep black mold colonization inside the sealed air channels, we supply and install brand-new, spore-free LG Dual Inverter and GE window units directly from our Waipahu warehouse."
    }
];

const HEALTH_SYMPTOMS = [
    {
        icon: AlertOctagon,
        title: "Morning Congestion & Sneezing",
        desc: "Waking up with a stuffy nose, scratchy throat, or dry cough that improves when you leave the house."
    },
    {
        icon: HeartPulse,
        title: "Asthma & Allergy Flares",
        desc: "Unexplained increase in inhaler usage, wheezing, or tightness in the chest when sleeping with the AC on."
    },
    {
        icon: Eye,
        title: "Eye & Skin Irritation",
        desc: "Red, watery, or itchy eyes and contact dermatitis from airborne mycotoxins circulating in closed rooms."
    },
    {
        icon: Wind,
        title: "Chronic Fatigue & Headaches",
        desc: "Low-level immune response from fighting airborne fungal spores, leading to sluggishness and brain fog."
    }
];

export default function BlackMoldAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Black Mold in AC: Health Risks & Removal' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <AlertOctagon className="size-3.5" />
                        <span>Respiratory Health Advisory &bull; Clean Air Solutions</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Black Mold in AC: <span className="text-primary italic">Health Risks &amp; Removal Hawaii</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Are black specks blowing onto your bed or furniture? In Hawaii&apos;s humid climate, mold colonies thrive inside dark AC blower wheels and coils, releasing millions of spores into your family&apos;s lungs. Learn the health signs and discover our Window AC cleaning and replacement solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/ac-cleaning-oahu"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Explore Window AC Cleaning &amp; Replacement
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Clinical Triage: (808) 488-1111"
                            eventLabel="Black Mold Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Health Warning Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-rose-400 uppercase font-bold tracking-wider block mb-2">COMMON SYMPTOMS</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Signs Mold Is Affecting Your Household
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {HEALTH_SYMPTOMS.map((h, idx) => {
                            const IconComponent = h.icon;
                            return (
                                <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-rose-500/40 transition-all space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                                            <IconComponent className="size-5" />
                                        </div>
                                        <h3 className="font-header font-bold text-base uppercase text-white">{h.title}</h3>
                                    </div>
                                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{h.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Sanitization Options */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL PROTOCOL
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                How We Restore Spore-Free Indoor Air
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Conventional wipe-downs only clean the outer plastic grille. Depending on the age and condition of your window unit, we provide targeted coil and pan sanitization or replace heavily molded legacy units with brand-new LG Dual Inverter units.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                <strong>Clean Jobsite Guarantee:</strong> Drop cloths are laid beneath the window opening to catch every drop of dust and debris, leaving your living room pristine.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Window AC Cleaning &amp; Tune-Up</span>
                                <span className="font-header font-bold text-lg text-primary">By Appointment</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">New Spore-Free Window AC</span>
                                <span className="font-header font-bold text-sm text-white">$395–$1,200 In Stock</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Drop-Cloth Protection</span>
                                <span className="font-header font-bold text-xs text-emerald-400">100% Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Black Mold Removal FAQs
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
                    title="Healthy Home Reviews"
                    subtitle="Read how our deep sanitization eliminated respiratory irritation for Oahu families"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
