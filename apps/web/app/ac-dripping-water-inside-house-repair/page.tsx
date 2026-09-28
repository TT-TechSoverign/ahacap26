'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Droplets, 
    AlertTriangle, 
    Wrench, 
    CheckCircle2, 
    Clock, 
    Phone, 
    Calendar, 
    ArrowRight, 
    ChevronDown, 
    Sparkles, 
    ShieldCheck, 
    Home,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';

const LEAK_CAUSES = [
    {
        title: "Algae Slime Drain Line Blockage",
        freq: "Over 65% of Oahu Leaks",
        desc: "Hawaii's tropical 74%+ humidity and airborne spore counts cause thick, gelatinous algae biofilm to incubate inside the gravity drain hose. Condensate cannot flow out, so water backs up and pours down interior drywall.",
        fix: "Commercial vacuum extraction, dedicated drain line flushing, and anti-algae pan treatment."
    },
    {
        title: "Improper Mounting Pitch",
        freq: "Common on Older Installations",
        desc: "Mini-split indoor heads must be mounted strictly level or pitched slightly toward the drain port. Window units require a 3/8-inch backward tilt. If an installer mounted it tilted forward, gravity forces water inside the room.",
        fix: "Precision laser leveling, bracket realignment, and wall anchor reinforcement."
    },
    {
        title: "Cracked or Warped Condensate Pan",
        freq: "Aged Units (6+ Years)",
        desc: "Years of heat cycles and vibration can cause hairline cracks in the plastic condensate pan beneath the evaporator coil, allowing droplets to seep through the bottom casing.",
        fix: "Marine epoxy sealant repair or factory drain pan replacement."
    },
    {
        title: "Coil Ice Thaw Overflow",
        freq: "Refrigerant or Airflow Issues",
        desc: "When frozen coils melt suddenly after the unit is powered down, the volume of water overwhelms the drain pan channel and spills over the sides.",
        fix: "Coil leak repair, refrigerant recharge, and drain clearing."
    }
];

const FAQS = [
    {
        q: "What should I do right now if water is pouring from my AC?",
        a: "Immediately turn off the air conditioner at the remote and flip the circuit breaker off. Unplug electronics located beneath the unit, place buckets or thick towels beneath the leak, and wipe down wet drywall to prevent mold and bubbling paint."
    },
    {
        q: "How much does it cost to clear an AC drain clog on Oahu?",
        a: "We charge a transparent flat rate of $175 for our complete diagnostic inspection and drain line clearing service. This includes clearing and flushing the line with professional vacuum extraction, testing the drain flow with water, and checking the overall health of the system."
    },
    {
        q: "Can I pour bleach down my mini split drain line myself?",
        a: "We strongly advise against bleach. Bleach fumes are corrosive to aluminum coil fins, can degrade rubber O-rings, and if splashed on wallpaper or upholstery causes permanent discoloration. Our technicians use specialized non-corrosive HVAC pan tablets and enzyme clearers."
    }
];

export default function AcDrippingWaterPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Honolulu');
    const [leakLocation, setLeakLocation] = useState('mini_split_wall');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('symptom_water_leak_lead', {
                leak_location: leakLocation,
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
                service_type: 'AC Diagnostic (Water Leak)',
                urgency: 'high',
                notes: `Symptom: WATER LEAKING INSIDE | Location: ${leakLocation.toUpperCase()} | Notes: ${notes.trim() || 'None'}`
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
                    <Breadcrumb items={[{ name: 'AC Dripping Water Inside House Repair' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Droplets className="size-3.5" />
                        <span>Fast Leak Resolution &bull; Stop Drywall Water Damage</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Dripping Water Inside House <span className="text-primary italic">Repair Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Water leaking down your bedroom drywall or pooling on window sills? Don&apos;t let algae-clogged lines rot your home&apos;s framing. Book a flat-rate $175 diagnostic and drain clearing dispatch with licensed contractor CT-36775.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#leak-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book $175 Drain Clearing Dispatch
                        </a>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Hotline: (808) 488-1111"
                            eventLabel="Water Leak Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 4 Causes of Leaks */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Why Air Conditioners Leak Inside Oahu Homes
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {LEAK_CAUSES.map((cause, idx) => (
                            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                                        {cause.freq}
                                    </span>
                                </div>
                                <h3 className="font-header font-bold text-xl uppercase text-white">{cause.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">{cause.desc}</p>
                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-emerald-400">
                                    <strong>Our Repair Protocol:</strong> {cause.fix}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What $175 Service Includes */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                PROFESSIONAL DRAIN LINE PROTOCOL
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Complete $175 Leak Diagnostic &amp; Clearing
                            </h2>
                            <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Commercial vacuum extraction and thorough drain line flushing to dislodge stubborn algae plugs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Commercial wet-vacuum extraction to clear drain discharge exits</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Digital level verification of wall bracket pitch and gravity slope</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Full water flow drainage verification before leaving your home</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Clean drop cloth protection laid beneath your indoor unit</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                            <ShieldCheck className="size-12 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Protect Your Home</h3>
                            <p className="text-xs text-slate-300">
                                Leaking condensate trapped behind drywall can breed toxic black mold in under 48 hours. Let our licensed technicians resolve the leak today.
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="Call (808) 488-1111"
                                eventLabel="Water Leak Hotline Call"
                                className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </section>

                {/* Lead Form */}
                <section id="leak-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            RAPID DISPATCH QUEUE &bull; $0 DEPOSIT TO BOOK
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Book $175 Water Leak Service
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            Fast appointment dispatch anywhere on Oahu. Zero upfront fee.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Our dispatch team will call you shortly to confirm technician arrival.
                            </p>
                            <p className="font-mono text-[11px] text-emerald-400">
                                Call (808) 488-1111 for urgent phone assistance.
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
                                    placeholder="e.g. Rachel Chun"
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
                                        placeholder="e.g. Honolulu, Ewa Beach"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Where Is the Water Leaking?</label>
                                <select 
                                    value={leakLocation}
                                    onChange={(e) => setLeakLocation(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="mini_split_wall">Mini Split (Leaking down interior wall)</option>
                                    <option value="window_ac_sill">Window AC (Dripping onto window sill / floor)</option>
                                    <option value="ceiling_duct">Ceiling / Attic Ducted System</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Details (Optional)</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Is it a steady drip or heavy pouring? Have you turned the unit off?"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request $175 Leak Service Dispatch'}
                            </button>

                            <p className="text-[10px] font-mono text-slate-400 text-center">
                                $175 Flat Rate &bull; CT-36775 Licensed &bull; Drop-Cloth Protection Standard
                            </p>
                        </form>
                    )}
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Water Leak FAQs
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
                        title="Oahu Emergency Repair Customer Reviews"
                        subtitle="Homeowners who stopped leaks before drywall damage occurred"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
