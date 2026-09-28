'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Dog, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Heart,
    Sparkles,
    Wind,
    Droplets,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does pet hair damage an air conditioner?",
        a: "Microscopic dog and cat hair slips past coarse mesh filters and sticks to the wet evaporator coils. Mixed with dust and moisture, it forms a dense, felt-like blanket that insulates the aluminum fins, restricts airflow, and creates a breeding ground for foul pet-odor bacteria."
    },
    {
        q: "Why doesn't vacuuming the filter get rid of the animal smell?",
        a: "The pet smell originates from animal dander and dried oils that have bonded deep within the cooling fins and on the cylindrical blower fan wheel. Surface vacuuming only clears loose hair on the outer screen, leaving 90% of the odor source inside the machine."
    },
    {
        q: "How often should pet owners have their AC professionally cleaned?",
        a: "On Oahu, households with one shedding dog or cat should have their system serviced annually. Households with two or more pets or long-haired breeds (like Golden Retrievers or Huskies) benefit greatly from every-6-month cleanings to maintain fresh indoor air."
    },
    {
        q: "Will your technicians protect my floors from dirty pet hair runoff?",
        a: "100% yes. Technicians lay protective floor drop cloths directly under the indoor unit. Precision rinse containment systems capture all water, hair mats, and dander slurry into closed disposal containers."
    }
];

const PET_IMPACTS = [
    {
        title: "Hair 'Matting' on Evaporator Fins",
        desc: "Shed hair adheres to wet aluminum fins, forming an impenetrable felt blanket that blocks air passage and forces the system to run constantly."
    },
    {
        title: "Dander Recirculation in Bedrooms",
        desc: "Fine microscopic pet dander bypasses loose filter edges and gets blasted back into the bedroom, triggering sneezing, congestion, and asthma."
    },
    {
        title: "Wet Animal Smell on Startup",
        desc: "Organic skin oils and pet saliva dry onto the cooling coils. When condensation forms during startup, a pungent 'wet dog' odor fills the room."
    },
    {
        title: "Clogged Drain Lines & Pan Overflow",
        desc: "Loose animal hair washes into the condensate pan, binding with algae slime to create fibrous plugs that cause internal water leaks."
    }
];

export default function PetHairCleaningPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Pet Hair & Dander AC Cleaning Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Dog className="size-3.5" />
                        <span>Pet-Friendly Deep Decontamination &bull; Allergy Relief</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Pet Hair & Dander <span className="text-primary italic">AC Cleaning Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        We love our island dogs and cats, but their shed fur and microscopic dander can choke air conditioner coils, produce pungent animal odors, and trigger chronic allergies. Our full teardown sanitization extracts pet hair mats and restores crisp, fresh air.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book Pet Allergy Deep Clean ($275)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Pet Care Desk: (808) 488-1111"
                            eventLabel="Pet Hair Cleaning Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Pet Impact Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">INDOOR AIR REALITY</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            How Pets Impact Your Air Conditioner
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PET_IMPACTS.map((p, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{p.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Drop Cloth & Cleaning Assurance */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                TOTAL DECONTAMINATION
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Complete Teardown with Drop Cloths
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Pet dander contains sticky lipids that adhere stubborn hair mats to coil aluminum. We apply veterinary-safe enzymatic and foaming cleaners that liquefy organic proteins without harsh fumes.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Technicians lay protective floor drop cloths to capture 100% of hair sludge, leaving your home spotless and your indoor air pure.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Basic Pet Care Clean</span>
                                <span className="font-header font-bold text-lg text-white">$175 / unit</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Premium Deep Teardown</span>
                                <span className="font-header font-bold text-lg text-primary">$275 / unit</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Floor Drop Cloth Protection</span>
                                <span className="font-header font-bold text-xs text-emerald-400">Guaranteed Clean</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Pet Hair & AC FAQs
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
                    title="Pet Owner Reviews"
                    subtitle="Fresher rooms and reduced allergy symptoms across pet-friendly Oahu homes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
