'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Waves, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    AlertTriangle,
    Droplets,
    Shield,
    Sparkles,
    Phone
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does ocean salt air damage air conditioners in Hawaii?",
        a: "Airborne sodium chloride from ocean spray deposits on outdoor condenser coils. Moisture in our humid air creates an electrolyte solution that triggers galvanic corrosion between copper tubes and aluminum fins. This eats away heat-transfer surfaces and causes pinhole refrigerant leaks."
    },
    {
        q: "Can I spray my outdoor condenser unit with a regular garden hose?",
        a: "A gentle, low-pressure fresh water spray directly downward through the rear fins every 2 to 4 weeks helps rinse loose salt deposits. Never use high-pressure nozzles, which bend the razor-thin aluminum fins and permanently restrict airflow."
    },
    {
        q: "What is the difference between Blue Fin / Gold Fin and standard coils?",
        a: "Blue Fin and Gold Fin refer to hydrophilic epoxy coatings applied at the factory to aluminum fins. They repel water and salt adhesion, extending coil lifespan in marine environments like Kailua, Hawaii Kai, and Ewa Beach by up to 2-3 times longer than uncoated coils."
    },
    {
        q: "How does Affordable Home A/C protect coastal systems?",
        a: "Our seasonal service includes pH-neutralizing salt dissolves, gentle freshwater reverse flushes, anti-corrosive protective film application, and inspection of outdoor disconnect boxes and copper flare connections."
    }
];

const CORROSION_ZONES = [
    {
        zone: "Zone 1: Extreme Marine (0–0.5 mi)",
        areas: "Kailua Beach, Lanikai, Diamond Head, Waikiki, North Shore, Hawaii Kai Marina",
        risk: "Severe galvanic rot within 2-3 years without bi-monthly rinses and anti-corrosion coatings."
    },
    {
        zone: "Zone 2: Coastal Windward (0.5–2 mi)",
        areas: "Kaneohe, Ewa Beach, Waimanalo, Kahala, Kakaako",
        risk: "Moderate salt mist deposition; requires bi-annual professional chemical rinse and coil check."
    },
    {
        zone: "Zone 3: Central Valley & Leeward (> 2 mi)",
        areas: "Waipahu, Pearl City, Mililani, Kapolei, Makakilo",
        risk: "Lower salt concentration, but exposed to red dirt and high ambient heat demanding seasonal coil washing."
    }
];

export default function SaltCorrosionPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Salt Corrosion & Coil Rinse Hawaii' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Waves className="size-3.5" />
                        <span>Marine Environment Protection &bull; Anti-Corrosion Defense</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Salt Corrosion & Coil Rinse <span className="text-primary italic">Hawaii (Marine AC Care)</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Living near the ocean comes with a heavy price for air conditioners: airborne marine salts dissolve aluminum fins and cause microscopic refrigerant pinhole leaks. Learn how to protect your outdoor condenser with proper coil rinsing and protective care.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/mini_split_ac_maintenance"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Schedule Coil Protection Service
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Coastal Care Desk: (808) 488-1111"
                            eventLabel="Salt Corrosion Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Oahu Coastal Corrosion Zones */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">ISLAND EXPOSURE MAP</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Oahu Marine Exposure Zones
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {CORROSION_ZONES.map((z, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">{z.zone}</span>
                                <h3 className="font-header font-bold text-sm text-white">{z.areas}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{z.risk}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Professional Defense Overview */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PREVENTATIVE SHIELD
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                How We Neutralize Marine Salt
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Fresh water alone doesn&apos;t dissolve deeply bonded marine salts and galvanic oxides. We apply specialized non-acidic neutralizing foaming agents that bind to sodium chloride crystals and float them out of the fin pack without attacking the aluminum metal.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Our technicians also inspect outdoor flare fittings, apply anti-corrosive barrier coatings to electrical contacts, and check compressor mounting isolation pads.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Routine Salt Coil Wash</span>
                                <span className="font-header font-bold text-lg text-white">$175 / unit</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Teardown & Neutralization</span>
                                <span className="font-header font-bold text-lg text-primary">$275 / unit</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Contractor Verification</span>
                                <span className="font-header font-bold text-xs text-emerald-400">Licensed CT-36775</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Salt Corrosion FAQs
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
                    title="Coastal Customer Reviews"
                    subtitle="Reliable cooling preserved in oceanfront neighborhoods across Oahu"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
