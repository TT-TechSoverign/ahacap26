'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Filter, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Droplets,
    Wind,
    Sun,
    Sparkles,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How often should I clean my mini split or window AC filters in Hawaii?",
        a: "In Hawaii, washable mesh filters should be rinsed every 2 to 4 weeks. If you live in an area prone to volcanic haze (vog), open windows frequently near red dirt, or have indoor pets, bi-weekly washing is recommended to maintain airflow."
    },
    {
        q: "How do I properly wash a reusable mini split screen filter?",
        a: "Unlatch the front panel, slide the mesh screens out, and rinse them with lukewarm water from the back side forward so dust washes away from the mesh. Allow them to dry 100% in the shade before sliding back in to prevent mildew."
    },
    {
        q: "Why shouldn't I dry my filters in direct midday Hawaii sunlight?",
        a: "Hawaii's intense UV radiation can warp the delicate polypropylene mesh and make the thin plastic mounting perimeter brittle, causing it to snap when bent back into the air handler channels."
    },
    {
        q: "Does washing the filters clean the whole AC?",
        a: "No. Filters only trap 15-20% of airborne particles. Fine dust, cooking vapors, and mold spores bypass the mesh and adhere directly to the cold evaporator coils and blower wheel. That requires professional chemical cleaning ($175 Basic or $275 Premium Teardown)."
    }
];

const WASH_STEPS = [
    {
        step: "01",
        title: "Power Off & Remove Mesh",
        desc: "Turn off the AC unit. Gently unclip the front cover and slide out the two curved nylon screen filters."
    },
    {
        step: "02",
        title: "Reverse Water Flow Rinse",
        desc: "Rinse under a sink faucet or gentle garden hose from the clean side to the dirty side so debris washes off easily."
    },
    {
        step: "03",
        title: "Shake & Air Dry in Shade",
        desc: "Gently shake excess water off. Prop upright in a shaded, well-ventilated area until completely dry before reinstalling."
    }
];

export default function AirFilterCarePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Air Filter Cleaning & Replacement' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Filter className="size-3.5" />
                        <span>Vog, Dust & Pet Dander Defense &bull; Island Care Protocol</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Air Filter Cleaning <span className="text-primary italic">& Care in Hawaii</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Did you know that dirty filters can double your air conditioner&apos;s energy consumption while reducing room cooling by half? Learn the right way to wash your reusable screens, when to replace them, and why filter washing is only step one in complete indoor air defense.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book Professional Tune-Up ($175)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Service Line: (808) 488-1111"
                            eventLabel="Filter Care Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* How to Wash Correctly */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">DIY 3-STEP GUIDE</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            How to Wash Your Reusable Filters
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {WASH_STEPS.map((s, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <span className="font-mono text-2xl font-black text-primary/60">{s.step}</span>
                                <h3 className="font-header font-bold text-base uppercase text-white">{s.title}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Filter vs Coil Reality */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                BEYOND THE SURFACE MESH
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                What Filters Can&apos;t Catch
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Even the best washable mesh screens allow microscopic pollen, cooking grease, and mold spores to pass right through. Once inside, they stick to the moist evaporator coil fins and colonize the dark blower fan wheel.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                If you wash your filters every month but your AC still smells musty or blows weak air, it&apos;s time for our $175 Basic or $275 Premium Deep Teardown cleaning with drop-cloth protection.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Basic Mini Split Tune-Up</span>
                                <span className="font-header font-bold text-lg text-white">$175 / unit</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Premium Deep Teardown</span>
                                <span className="font-header font-bold text-lg text-primary">$275 / unit</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Window AC Replacement (LG Inverter)</span>
                                <span className="font-header font-bold text-sm text-cyan-400">From $504 (-$45 Rebate)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Air Filter Care FAQs
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
                    title="Clean Air Reviews"
                    subtitle="Honolulu homeowners breathing easier with maintained air handlers"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
