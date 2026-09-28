'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ShieldCheck, 
    Wrench, 
    Droplets, 
    Zap, 
    CheckCircle2, 
    ArrowRight, 
    Phone, 
    Calendar, 
    ChevronDown, 
    Sparkles, 
    Warehouse, 
    Truck, 
    Layers, 
    SlidersHorizontal,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';

const FAQS = [
    {
        q: "Why can't I just rest a window AC directly on my jalousie window frame?",
        a: "Jalousie tracks are made of lightweight aluminum louvers designed only to hold glass slats. A 50 to 90 lb air conditioner resting directly on the tracks will bend the metal, crack the glass channels, cause severe trade-wind air leaks, and risk falling out during heavy Kona wind gusts."
    },
    {
        q: "Are custom fabrication options and security brackets available?",
        a: "Yes. Custom fabrication options and security brackets are available for an additional cost with installation. Our technician evaluates your window sill and exterior wall construction to design the ideal custom acrylic baffle and cantilever support bracket."
    },
    {
        q: "How do you stop trade wind rain and geckos from getting in?",
        a: "We custom cut clear marine-grade acrylic baffles to fit the exact open section of your window, sealing the edges with closed-cell neoprene weather stripping and silicone gaskets. This forms an airtight, water-tight, and gecko-proof barrier."
    },
    {
        q: "What is your floor drop-cloth guarantee?",
        a: "Our technicians always lay clean protective drop cloths directly under the window workspace to catch glass dust, acrylic shavings, or debris. We vacuum the work area and ensure your home is left cleaner than when we arrived."
    },
    {
        q: "Can I bundle a new in-stock LG Dual Inverter with installation?",
        a: "Yes! You can order any qualifying Energy Star LG Dual Inverter ($504 to $1,025) through our Shop and select professional installation. Your unit will qualify for the $45 Hawaii Energy cash rebate."
    }
];

export default function JalousieWindowAcInstallationPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Honolulu');
    const [bracketNeeded, setBracketNeeded] = useState('yes');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('jalousie_install_lead', {
                city,
                bracket_needed: bracketNeeded,
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
                service_type: 'Jalousie Window AC Installation',
                urgency: 'flexible',
                notes: `Jalousie Lead | Bracket Requested: ${bracketNeeded} | Notes: ${notes.trim() || 'None'}`
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
                    <Breadcrumb items={[{ name: 'Jalousie Window AC Installation' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="size-3.5" />
                        <span>Oahu Louver Specialists &bull; Licensed Contractor CT-36775</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Jalousie Window AC <span className="text-primary italic">Installation Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Over 60% of homes on Oahu feature classic jalousie glass louvers. We safely remove the necessary glass, install custom acrylic baffles, calibrate backward drainage pitch, and secure your unit with heavy-duty brackets.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#install-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book Installation Appointment ($0 Deposit)
                        </a>
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            Shop In-Stock Window ACs ($45 Rebate)
                            <ArrowRight className="size-4 text-primary" />
                        </Link>
                    </div>
                </section>

                {/* Custom Fabrication & Bracket Standard Card */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-center gap-2 text-primary font-header font-bold text-base uppercase mb-2">
                                <Wrench className="size-5 shrink-0" />
                                Custom Fabrication &amp; Brackets
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                Custom fabrication options and security brackets are available as <strong>additional cost options with installation</strong>. Our technicians assess your window sill and wall framing to engineer a rock-solid, vibration-free installation that protects your window tracks.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                            <div className="flex items-center gap-2 text-emerald-400 font-header font-bold text-base uppercase mb-2">
                                <ShieldCheck className="size-5 shrink-0" />
                                Drop-Cloth Clean Jobsite Promise
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                Our licensed technicians always lay clean protective floor drop cloths under every unit and workspace. We catch all dust, shavings, and debris, <strong>leaving the jobsite cleaner and better than upon arrival</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3D Spatial Window Fit Showcase */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-1">
                            ENGINEERED SPATIAL ACCURACY
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Engineered Jalousie Cutaway Mounting
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">Precision alignment ensuring zero pressure on aluminum louver mechanisms.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 relative overflow-hidden group">
                            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-950/60 mb-4 border border-white/5">
                                <Image 
                                    src="/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp" 
                                    alt="Compact Jalousie Window AC 3D Cutaway" 
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-mono text-primary uppercase font-bold">Standard 6K–8K BTU Mount</div>
                                <h3 className="font-header font-bold text-lg text-white uppercase">Compact Acrylic Baffle Fit</h3>
                                <p className="text-xs text-slate-300 font-sans">
                                    Fits neatly inside narrow Hawaiian louver openings with laser-cut acrylic top and side filler panels.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 relative overflow-hidden group">
                            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-950/60 mb-4 border border-white/5">
                                <Image 
                                    src="/assets/window-unit-images/3d-fit/lw1222ivsm-window-fit-cutaway.webp" 
                                    alt="Heavy Duty Jalousie Window AC 3D Cutaway" 
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-mono text-primary uppercase font-bold">High Capacity 10K–14K BTU Mount</div>
                                <h3 className="font-header font-bold text-lg text-white uppercase">Reinforced Cantilever Bracket</h3>
                                <p className="text-xs text-slate-300 font-sans">
                                    Exterior load-bearing bracket transfers 100% of unit weight to the building exterior sill and stud framing.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4-Step Jalousie Precision Process */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Our 4-Step Jalousie Installation Protocol
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                step: "1",
                                title: "Louver Extraction",
                                desc: "We safely remove only the necessary glass louvers, labeling and wrapping your spare glass for safe keeping."
                            },
                            {
                                step: "2",
                                title: "Custom Acrylic Baffle",
                                desc: "Custom acrylic panels are precision-cut and lined with closed-cell neoprene to block rain, trade winds, and geckos."
                            },
                            {
                                step: "3",
                                title: "Laser Pitch Calibration",
                                desc: "Calibrated to an exact 3/8-inch backward tilt so all condensation drains cleanly outdoors away from your interior wall."
                            },
                            {
                                step: "4",
                                title: "Clean Vacuum & Test",
                                desc: "Protective drop cloths are packed up, the area vacuumed spotless, and the AC cold-tested before technician sign-off."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="size-8 rounded-full bg-primary/20 text-primary font-mono font-bold text-sm flex items-center justify-center mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-header font-bold text-base uppercase text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Lead Form */}
                <section id="install-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            ZERO UPFRONT PAYMENT &bull; PAY AFTER INSTALLATION
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Schedule Jalousie Window AC Installation
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            Book an appointment with our licensed technicians. Zero deposit required.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Appointment Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Our dispatch team will call you to confirm your window measurements and schedule your appointment.
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
                                        placeholder="e.g. Waipahu, Honolulu"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Do You Need an Exterior Security Bracket?</label>
                                <select 
                                    value={bracketNeeded}
                                    onChange={(e) => setBracketNeeded(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="yes">Yes, include security bracket evaluation (recommended for 10K+ BTU)</option>
                                    <option value="unsure">Unsure / Let technician inspect on site</option>
                                    <option value="no">No, standard sill mount only</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Window &amp; Home Details (Optional)</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Window height/width, number of glass slats, or if you already own a unit."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Installation Request ($0 Upfront)'}
                            </button>

                            <p className="text-[10px] font-mono text-slate-400 text-center">
                                Licensed Hawaii Contractor CT-36775 &bull; Drop-Cloth Clean Guarantee &bull; Pay After Installation
                            </p>
                        </form>
                    )}
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Jalousie Window AC FAQs
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

                {/* Reviews */}
                <section className="mb-12">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu Jalousie Installation Reviews"
                        subtitle="Homeowners who trusted us with their Hawaiian louver windows"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
