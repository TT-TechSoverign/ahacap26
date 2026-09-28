'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    DollarSign, 
    ShieldCheck, 
    Zap, 
    CheckCircle2, 
    AlertCircle, 
    Phone, 
    ArrowRight, 
    Calendar, 
    Layers, 
    ChevronDown, 
    Sparkles, 
    Info, 
    Home, 
    Building2,
    Clock,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';

const PRICING_TIERS = [
    {
        name: "Single-Zone Mini Split",
        range: "$3,800 – $5,500",
        idealFor: "Primary bedroom, home office, or studio suite",
        specs: "9,000 to 12,000 BTU • Up to 28 SEER2 • Standard 15A/20A 230V circuit",
        includes: [
            "Inverter outdoor condenser & indoor high-wall air handler",
            "Up to 25 ft premium insulated copper refrigerant line set",
            "Outdoor disconnect switch & whip",
            "Nitrogen pressure decay & deep micron vacuum test",
            "Protective floor drop cloths during indoor work",
            "1-Year AHAC workmanship warranty + manufacturer backing"
        ]
    },
    {
        name: "Dual-Zone Mini Split (2 Rooms)",
        range: "$6,800 – $9,200",
        idealFor: "Two bedrooms or living room + primary bedroom",
        specs: "18,000 to 24,000 BTU • Dual-head inverter system • Independent zone remotes",
        popular: true,
        includes: [
            "1 multi-zone outdoor condenser + 2 indoor high-wall units",
            "Individual room temperature and dehumidification controls",
            "Dual line-set runs with UV-resistant aesthetic line-hide trunking",
            "Condensate gravity drainage routing",
            "Clean floor drop cloth guarantee throughout home",
            "Comprehensive airflow & electrical amp draw calibration"
        ]
    },
    {
        name: "3-Zone Whole Home System",
        range: "$9,500 – $13,500",
        idealFor: "3 bedrooms or living area + 2 bedrooms",
        specs: "24,000 to 36,000 BTU • High-capacity variable-speed inverter",
        includes: [
            "1 compact exterior multi-port condenser + 3 indoor units",
            "Eliminates noisy window units across entire floor plan",
            "Cuts HECO power bills up to 45% compared to central AC",
            "Precision line-hide exterior architectural matching",
            "Clean drop cloth protection & full end-of-day cleanup",
            "Walkthrough demonstration and remote programming"
        ]
    },
    {
        name: "4-Zone+ Custom Executive System",
        range: "$13,800 – $18,000+",
        idealFor: "Large 4-bedroom island residences or luxury multi-story homes",
        specs: "36,000 to 48,000 BTU • Multi-circuit zoning • Optional ceiling cassettes",
        includes: [
            "Engineered multi-zone system with branch box distribution",
            "Long-run line sets with oil-trap engineering",
            "High-amperage dedicated 30A-45A electrical connection",
            "GoldFin anti-corrosion coil coating for coastal salt spray",
            "Complete multi-day white-glove installation with drop cloths",
            "Direct technician follow-up and priority seasonal maintenance"
        ]
    }
];

const FAQS = [
    {
        q: "Why do mini-split installation costs vary between homes on Oahu?",
        a: "Costs depend on four primary variables: (1) Total number of zones (rooms) being cooled, (2) Distance between indoor air handlers and the outdoor condenser, (3) Construction type (plantation single-wall redwood, hollow-tile concrete, or double-wall framing), and (4) Existing electrical panel capacity."
    },
    {
        q: "Does Affordable Home AC provide City & County DPP building permits?",
        a: "No. Affordable Home A/C is a boutique licensed HVAC specialty contractor (CT-36775) focused strictly on mechanical engineering, refrigeration pressure testing, and clean residential retrofits. We do not provide, manage, or promise municipal building permits through the City & County of Honolulu Department of Planning and Permitting. If your HOA or property mandates municipal permitting, homeowners coordinate that directly."
    },
    {
        q: "How does the $0 In-Home Estimate work?",
        a: "We never charge an upfront fee to evaluate your home for a new or replacement mini-split installation. A licensed technician visits your residence, evaluates your room square footage, sun exposure, wall framing, and electrical panel, then gives you an honest, transparent quote with zero sales pressure."
    },
    {
        q: "What is your protective drop-cloth guarantee?",
        a: "We treat your home with the utmost aloha. Our technicians lay clean protective drop cloths beneath all indoor units and drill zones to protect your hardwood, vinyl, tile, or carpeting. We vacuum all work areas and ensure your home is cleaner than when we arrived."
    },
    {
        q: "Should I buy a window AC instead if my budget is tighter?",
        a: "If your budget is under $3,500, a modern in-stock LG Dual Inverter window AC ($504 to $1,025) is an exceptional alternative. They run on standard 115V wall outlets, feature variable-speed compressors that save almost as much HECO electricity as mini-splits, and qualify for our $45 Hawaii Energy cash rebate."
    }
];

export default function MiniSplitInstallationCostPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Lead Form State
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Honolulu');
    const [zones, setZones] = useState('1_zone');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('mini_split_cost_lead', {
                zones,
                city,
                full_name: fullName,
                phone
            });

            const nameParts = fullName.trim().split(/\s+/);
            const payload = {
                first_name: nameParts[0] || 'Customer',
                last_name: nameParts.slice(1).join(' ') || 'Oahu',
                email: 'office@affordablehome-ac.com',
                phone: phone.trim(),
                address: city.trim(),
                city: city.trim(),
                zip: '',
                service_type: 'Mini Split In-Home Estimate',
                urgency: 'flexible',
                notes: `Cost Guide Lead | Zones Requested: ${zones.toUpperCase()} | Notes: ${notes.trim() || 'None'}`
            };

            await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            setIsSuccess(true);
        } catch {
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Mini Split Installation Cost' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="size-3.5" />
                        <span>Licensed Hawaii Contractor CT-36775 &bull; $0 In-Home Estimates</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Mini Split Installation Cost <span className="text-primary italic">Oahu Guide</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Realistic cost ranges for ductless mini-split heat pump installation across Oahu. No artificial price markups, no deceptive rebate games, and zero upfront payment to book an in-home site estimate.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#estimate-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book $0 In-Home Estimate
                        </a>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call (808) 488-1111"
                            eventLabel="Mini Split Cost Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Mandatory Corporate Protection & Permitting Disclosure */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="size-6 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <h3 className="font-header font-bold text-base uppercase text-amber-300">
                                Important Contractor Scope &amp; Permitting Notice
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                Affordable Home A/C is a boutique licensed specialty contractor (License CT-36775). We focus strictly on mechanical refrigeration precision, nitrogen pressure testing, vacuum decay, and clean aesthetic craftsmanship. <strong>We do not handle, pull, or guarantee City &amp; County of Honolulu DPP municipal building permits.</strong> If your specific property, condo board, or HOA mandates municipal permits, homeowners or general contractors coordinate permitting independently.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2026 Pricing Tiers Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-1">
                            BALLPARK ESTIMATES &bull; RESIDENTIAL RANGES
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Typical Turnkey Installation Costs on Oahu
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">Includes equipment, materials, line sets, electrical connection, and labor.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PRICING_TIERS.map((tier, idx) => (
                            <div 
                                key={idx} 
                                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${tier.popular ? 'bg-gradient-to-b from-primary/10 via-surface-dark to-surface-dark border-primary/40 shadow-2xl shadow-primary/5' : 'bg-surface-dark border-white/10'}`}
                            >
                                <div>
                                    {tier.popular && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider mb-4">
                                            Most Popular in Hawaii
                                        </span>
                                    )}
                                    <h3 className="text-xl sm:text-2xl font-header font-black uppercase text-white mb-2">
                                        {tier.name}
                                    </h3>
                                    <div className="text-2xl sm:text-3xl font-header font-black text-primary mb-2">
                                        {tier.range}
                                    </div>
                                    <p className="text-xs font-mono text-emerald-400 mb-4">{tier.idealFor}</p>
                                    <p className="text-[11px] font-mono text-slate-400 mb-6 border-b border-white/10 pb-4">{tier.specs}</p>

                                    <ul className="space-y-2.5 mb-6 text-xs text-slate-300 font-sans">
                                        {tier.includes.map((inc, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                                <span>{inc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a 
                                    href="#estimate-form"
                                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-primary hover:text-slate-950 text-white font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                >
                                    Get Exact Quote for My Home
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Floor Drop-Cloth Protection Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/60 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2 space-y-3">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.3em] font-bold block">
                                SIGNATURE CLEAN JOBSITE PROMISE
                            </span>
                            <h3 className="text-2xl font-header font-black uppercase text-white">
                                Protective Floor Drop Cloths on Every Job
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                We respect your home like our own. During all mini-split drilling, line routing, and wall mounting, our technicians lay clean protective drop cloths directly under the indoor unit. We catch all drywall dust, plaster, and wood shavings, leaving your living room or bedroom cleaner than when we arrived.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                            <ShieldCheck className="size-12 text-emerald-400 mx-auto mb-3" />
                            <div className="font-header font-bold text-sm uppercase text-white">Zero Mess Standard</div>
                            <div className="text-[11px] text-slate-400 mt-1">Full post-install vacuum &amp; inspection</div>
                        </div>
                    </div>
                </section>

                {/* What Determines the Final Cost on Oahu? */}
                <section className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight mb-8 text-center">
                        Key Factors That Impact Your Mini Split Cost
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                                <Zap className="size-4" /> Electrical Panel Capacity
                            </div>
                            <p className="text-slate-300 font-sans text-xs leading-relaxed">
                                Many older Kaimuki, Kailua, and Pearl City homes have 60A or 100A panels. Multi-zone systems require 30A–45A dedicated breakers, which may require a sub-panel addition.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                                <Layers className="size-4" /> Wall Construction Type
                            </div>
                            <p className="text-slate-300 font-sans text-xs leading-relaxed">
                                Hawaiian single-wall redwood homes require different mounting brackets and vibration dampeners than modern double-wall drywall or solid concrete hollow-tile walls.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                                <ShieldCheck className="size-4" /> Marine Salt-Air Defense
                            </div>
                            <p className="text-slate-300 font-sans text-xs leading-relaxed">
                                Coastal residences in Ewa Beach, Kailua, and Hawaii Kai require GoldFin or anti-corrosive hydrophilic condenser coil coatings to withstand ocean trade wind salt spray.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Lead Intake Form */}
                <section id="estimate-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            BY APPOINTMENT FIRST &bull; $0 TO BOOK
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Schedule Your $0 Free In-Home Estimate
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            A licensed technician will inspect your home, measure room volumes, review your electrical panel, and give you an exact turnkey proposal. Zero obligation.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Estimate Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Our Waipahu dispatch coordinator will contact you by phone to confirm a convenient appointment window.
                            </p>
                            <p className="font-mono text-[11px] text-emerald-400">
                                Need faster response? Call (808) 488-1111 directly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                                <input 
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g. Keanu Silva"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number</label>
                                    <input 
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(808) 000-0000"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Oahu Neighborhood</label>
                                    <input 
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="e.g. Kailua, Pearl City"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Number of Rooms / Zones</label>
                                <select 
                                    value={zones}
                                    onChange={(e) => setZones(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="1_zone">1 Room (Single Zone — $3,800 to $5,500)</option>
                                    <option value="2_zone">2 Rooms (Dual Zone — $6,800 to $9,200)</option>
                                    <option value="3_zone">3 Rooms (3-Zone — $9,500 to $13,500)</option>
                                    <option value="4_zone_plus">4+ Rooms / Whole Home ($13,800+)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Additional Notes (Optional)</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Tell us about your home (single wall, double wall, high ceilings, etc.)"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request ($0 Upfront Deposit)'}
                            </button>

                            <p className="text-[10px] font-mono text-slate-400 text-center">
                                Licensed Hawaii Contractor CT-36775 &bull; Drop-Cloth Protection &bull; Zero Upfront Fee
                            </p>
                        </form>
                    )}
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-400 text-xs mt-1">Clear facts on Hawaii mini split pricing and operations</p>
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

                {/* Reviews */}
                <section className="mb-12">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu Mini Split Installation Reviews"
                        subtitle="Real verified reviews from homeowners who chose Affordable Home A/C"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
