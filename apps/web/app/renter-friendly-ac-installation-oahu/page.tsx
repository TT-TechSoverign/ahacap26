'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Key, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Lock,
    Undo2,
    DollarSign,
    Zap
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "Can I install a window AC in a rental home without losing my security deposit?",
        a: "Yes! Our technicians use zero-damage installation methods. Instead of screwing directly into your landlord's window sashes or frames, we use compression-fit support brackets and non-adhesive foam compression seals that leave zero holes, scratches, or residue when removed."
    },
    {
        q: "How easily can I take the window AC with me when I move?",
        a: "Our installation is 100% reversible. When your lease ends, the unit and brackets can be disassembled in 15 minutes, returning the window to its original untouched condition."
    },
    {
        q: "Can renters claim the $45 Hawaii Energy rebate?",
        a: "Yes! Anyone who pays an electric utility bill or lives in an eligible residential dwelling on Oahu can claim the $45 Hawaii Energy cash rebate on qualifying Energy Star window ACs."
    },
    {
        q: "What if my rental has horizontal sliding windows or jalousies?",
        a: "We specialize in both! We build custom tension-fit slider panels and louver brackets that mount securely without drilling into the window frame."
    }
];

export default function RenterFriendlyWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Renter-Friendly Window AC Installation' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Key className="size-3.5" />
                        <span>Security Deposit Protection &bull; Zero-Drill Mounting Techniques</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Renter-Friendly Window AC <span className="text-primary italic">Installation Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Renting on Oahu doesn’t mean you have to suffer through 90°F summer nights. Our non-invasive window AC installations use compression brackets, rubber-padded sills, and removable seals that leave zero holes or frame damage—protecting your security deposit 100%.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Renter-Friendly Inverters
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Renter Desk: (808) 488-1111"
                            eventLabel="Renter Install Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Deposit Protection Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Zero Frame Drilling</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            No screw holes in your landlord’s window frame or sills. We use rubber-cushioned compression brackets.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Undo2 className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">100% Reversible</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            When your lease is up, disassemble the unit in minutes. The window returns to its original condition with zero residue.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <DollarSign className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Keep Your Deposit</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Landlords inspect window tracks closely. Our protective installation ensures you get 100% of your deposit back.
                        </p>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL INSTALLATION BENEFIT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth Standard
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our licensed technicians treat your rental apartment with the highest level of care. We lay protective floor drop cloths under every window during work, preventing scuffs on hardwood or stains on rental carpet.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>$45 Hawaii Energy Rebate:</strong> Even as a renter, you qualify for the official $45 cash rebate on eligible Energy Star units!
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up same-day at 94-150 Leoleo St #203 by appointment, or choose flat $50 island-wide delivery.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View Inverter Inventory
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Renter AC Installation FAQs
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
                    title="Renter & Tenant Reviews"
                    subtitle="Real stories from Oahu renters who kept their security deposits intact"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
