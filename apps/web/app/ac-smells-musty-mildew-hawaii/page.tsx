'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    AlertTriangle, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Droplets,
    Wind,
    Sparkles,
    Flame,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Why does my air conditioner smell like dirty socks or sour mildew?",
        a: "Known in the HVAC trade as 'Dirty Sock Syndrome,' this odor occurs when bacteria and mold colonize damp evaporator coils and stagnant condensate pan water. Hawaii's 80%+ humidity and warm ambient temperatures provide constant fuel for this biofilm to fester."
    },
    {
        q: "Is it dangerous to breathe air from an AC that smells musty?",
        a: "Yes. The odor is caused by volatile organic compounds released by active fungal and bacterial colonies. Breathing this air continuously can cause sinus congestion, morning headaches, throat irritation, and trigger asthma attacks, especially in children and elderly island residents."
    },
    {
        q: "Can I just spray Lysol or bleach into the front grille?",
        a: "Never spray bleach or household disinfectants directly into an AC. Bleach causes rapid galvanic corrosion of aluminum fins and copper tubing, leading to costly refrigerant pinhole leaks. True eradication requires commercial, non-acidic coil cleaner applied by a licensed technician."
    },
    {
        q: "What service eliminates this musty smell completely?",
        a: "For ductless mini splits, our $275 Premium Deep Teardown pulls the drain pan and blower wheel out, pressure-washes the coils, and flushes the drain line with floor drop cloth protection. For window units with heavy internal mold, we recommend cleaning your washable filter or upgrading to a high-efficiency LG Dual Inverter starting at $504 with a $45 Hawaii Energy cash rebate."
    }
];

const CAUSES = [
    {
        title: "Bacterial Biofilm on Evaporator Coils",
        desc: "Dust particles mix with constant condensation on chilled cooling fins, forming a slimy bacterial film that releases sour vapors whenever the blower motor kicks on."
    },
    {
        title: "Stagnant Drain Pan Sludge",
        desc: "Condensate water that fails to drain quickly becomes warm and stagnant. Algae, fungus, and dust gather in the pan, creating a foul cesspool inside your air handler."
    },
    {
        title: "Mold Encrustation on Blower Wheels",
        desc: "The cylindrical squirrel-cage fan wheel pulls moist air across every blade. Over time, black mold coats the curved blades, spraying spores directly into your living room."
    },
    {
        title: "Clogged Condensate Drain Lines",
        desc: "Jelly-like algae plugs the gravity drain hose. Water backs up into the internal trough, creating a humid mold nursery that smells pungent throughout the home."
    }
];

export default function AcSmellsMustyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Smells Musty & Mildew in Hawaii' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <AlertTriangle className="size-3.5" />
                        <span>Dirty Sock Syndrome &bull; Clinical Microbial Neutralization</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Smells Musty & Mildew <span className="text-primary italic">in Hawaii? Here is the Fix</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        That sour, vinegar, or dirty-sock stench coming from your air conditioner isn&apos;t just unpleasant—it&apos;s active bacterial biofilm and mold spores cycling through your indoor air. Discover what causes it and how our clinical sanitization restores sweet, fresh air.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Book Odor Elimination Service
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Triage Desk: (808) 488-1111"
                            eventLabel="Musty AC Smell Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Root Causes Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">DIAGNOSTIC ANATOMY</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The 4 Culprits Behind the Stench
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CAUSES.map((c, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-amber-400/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{c.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Treatment Protocols */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block">DUCTLESS MINI SPLITS</span>
                        <h3 className="text-2xl font-header font-black uppercase text-white">$275 Premium Deep Teardown</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            We dismantle the front housing, drop the drain pan, extract the blower wheel, and apply professional antimicrobial foam to destroy the bacterial slime layer. Floor drop cloths protect your room.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Blower wheel deep pressure scrub</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Drain pan disinfectant wash</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                                <span>Drain line vacuum & treatment</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/mini_split_ac_maintenance" className="text-xs font-header font-bold uppercase tracking-wider text-primary hover:underline">
                                Schedule Mini Split Teardown &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                        <span className="font-mono text-xs text-cyan-400 uppercase font-bold tracking-wider block">WINDOW AIR CONDITIONERS</span>
                        <h3 className="text-2xl font-header font-black uppercase text-white">Clean vs. Replace Evaluation</h3>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            Window ACs with heavy mold on unsealed internal components are often uneconomical to repair. Upgrading to a whisper-quiet, factory-sealed LG Dual Inverter cuts power bills and qualifies for a $45 rebate.
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-cyan-400 shrink-0" />
                                <span>Reusable washable anti-dust filter care</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-cyan-400 shrink-0" />
                                <span>$45 Hawaii Energy cash rebate on new units</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-cyan-400 shrink-0" />
                                <span>Same-day Waipahu pickup or $50 delivery</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link href="/clean-vs-replace-window-ac" className="text-xs font-header font-bold uppercase tracking-wider text-cyan-400 hover:underline">
                                Read Clean vs Replace Guide &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Musty AC Odor FAQs
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
                    title="Fresh Air Customer Reviews"
                    subtitle="Honolulu & Oahu families enjoying clean, odorless cooling"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
