'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    TreePine, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Droplets,
    Wrench,
    Home,
    AlertCircle
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How do you prevent window AC condensation from rotting wooden sills?",
        a: "We install impermeable waterproof neoprene sill barriers between the AC chassis and the wooden sill, and calibrate a precise 1/4-inch backward pitch so all condensate flows outside away from the wood structure."
    },
    {
        q: "Can older wooden window sills support a heavy air conditioner?",
        a: "Older wooden sills can crack or splinter under the concentrated weight of a 70 to 140 lb unit. Our technicians install standard exterior window AC support brackets that anchor to the exterior wall framing, transferring the load away from the wooden sill."
    },
    {
        q: "Do you treat or protect damaged wood before installation?",
        a: "Our technicians inspect the wood for existing moisture damage or termite activity before mounting, and apply protective flashing pads to prevent further wear."
    },
    {
        q: "Can you install an AC on historic plantation home wood windows without damaging them?",
        a: "Yes! We specialize in vintage Douglas fir and redwood windows, using non-invasive mounting brackets that preserve historic molding and framing."
    }
];

export default function WoodFrameWindowAcSupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Wood-Frame Window AC Support' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <TreePine className="size-3.5" />
                        <span>Douglas Fir & Redwood Preservation &bull; Moisture Rot Prevention</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Wood-Frame Window AC <span className="text-primary italic">Support Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Historic Hawaiian plantation homes feature beautiful, irreplaceable old-growth redwood and Douglas fir window framing. Improper AC installation can rot wooden sills with stagnant condensation or split fragile vintage wood. Our specialized wood preservation mounting guarantees lifetime sill protection.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop In-Stock Window ACs
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Wood Frame Desk: (808) 488-1111"
                            eventLabel="Wood Frame AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Wood Protection Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Droplets className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Neoprene Moisture Barrier</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Impermeable marine membrane prevents condensation and outdoor rainwater from soaking into raw wood fibers.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Wrench className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Load-Relief Brackets</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Standard exterior brackets transfer mechanical weight directly to building studs, preventing cracked vintage sills.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <ShieldCheck className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Historic Preservation</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Non-destructive fasteners ensure your plantation architecture remains pristine and structurally sound.
                        </p>
                    </div>
                </section>

                {/* Clean Jobsite Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                SIGNATURE ALOHA CRAFTSMANSHIP
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Protective Drop-Cloth Standard
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our licensed technicians treat historic homes with deep care. We lay protective floor drop cloths under every window during work, vacuum all sawdust, and ensure clean execution without marking your historic moldings.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>$45 Rebate Qualified:</strong> All qualifying Energy Star Dual Inverter window models come with the pre-approved Hawaii Energy application PDF.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                            <Warehouse className="size-10 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Waipahu Warehouse Direct</h3>
                            <p className="text-xs text-slate-300">
                                Pick up in Waipahu or choose flat $50 island-wide delivery with professional installation scheduling.
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
                            Wood-Frame Window AC FAQs
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
                    title="Historic Home AC Reviews"
                    subtitle="Real reviews from Oahu homeowners in classic wooden plantation homes"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
