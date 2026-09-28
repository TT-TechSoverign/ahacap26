'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Snowflake, 
    AlertTriangle, 
    Droplets, 
    Wind, 
    CheckCircle2, 
    ArrowRight, 
    Phone, 
    Calendar, 
    ChevronDown, 
    Sparkles, 
    ShieldCheck, 
    Wrench,
    Clock,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';

const ROOT_CAUSES = [
    {
        title: "Low Refrigerant (Freon) Leak",
        desc: "Marine salt air corrodes copper U-bends and aluminum fin joints. When refrigerant pressure drops, the remaining liquid boils below 32°F, freezing ambient humidity onto the coil surface.",
        action: "Electronic leak sniff test, flare joint resealing, nitrogen pressure test, and R-410A recharge."
    },
    {
        title: "Choked Airflow (Mold & Dirty Filters)",
        desc: "Hawaii's tropical moisture causes black mold and dust to cake onto the squirrel-cage blower wheel fan blades. Air cannot pass across the cold coil, so heat transfer stops and frost accumulates.",
        action: "Full teardown chemical wash and blower wheel sanitization ($275 flat rate)."
    },
    {
        title: "Faulty Fan Motor or Capacitor",
        desc: "If the indoor blower motor slows down or stops spinning due to a burned-out capacitor, cold refrigerant continues circulating without airflow, rapidly freezing the entire indoor unit.",
        action: "Capacitor replacement and blower motor voltage bench diagnostic."
    }
];

const FAQS = [
    {
        q: "Why should I never scrape ice off the AC coils with a tool?",
        a: "The aluminum cooling fins and copper refrigerant tubes inside your air conditioner are extremely delicate (often only 0.028 inches thick). Using a knife, screwdriver, or ice pick will instantly puncture the pressurized copper tube, releasing toxic refrigerant gas and turning an inexpensive repair into a total coil replacement."
    },
    {
        q: "How long does it take for a frozen AC coil to completely thaw?",
        a: "Depending on ice thickness, running the system in 'FAN ONLY' mode takes between 2 to 5 hours to safely melt the ice block. Turning the unit completely off takes longer (4 to 8 hours). Always keep towels beneath the unit to catch the water."
    },
    {
        q: "Will my AC work normally again after it thaws out?",
        a: "Rarely without fixing the underlying issue. Melting the ice temporarily clears the physical blockage, but as soon as the compressor kicks back on, the underlying root cause (low refrigerant leak or dirty coils) will cause ice to reform within 30 to 90 minutes. Professional diagnosis is necessary to prevent compressor motor burnout."
    }
];

export default function AcFreezingUpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Honolulu');
    const [unitType, setUnitType] = useState('mini_split');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('symptom_frozen_ac_lead', {
                unit_type: unitType,
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
                service_type: 'AC Diagnostic (Frozen Coils)',
                urgency: 'high',
                notes: `Symptom: FROZEN COILS / ICE | Equipment: ${unitType.toUpperCase()} | Notes: ${notes.trim() || 'None'}`
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
                    <Breadcrumb items={[{ name: 'AC Freezing Up Ice on Coils' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Snowflake className="size-3.5" />
                        <span>Emergency Symptom Guide &bull; Fast $175 Diagnostic Dispatch</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Freezing Up Ice on Coils <span className="text-primary italic">Hawaii Guide</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your window unit or mini-split covered in frost or a solid block of ice? Follow our safe emergency thaw procedure to prevent costly compressor failure, then schedule a professional inspection.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#diagnostic-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book $175 Diagnostic Inspection
                        </a>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Emergency Line: (808) 488-1111"
                            eventLabel="Frozen Coil Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Immediate Safe Thaw Warning Card */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="size-7 text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-3">
                            <h3 className="font-header font-bold text-lg uppercase text-red-300">
                                Emergency Rule: NEVER Chip Ice with Metal Tools
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                                Scraping ice with a kitchen knife or screwdriver will puncture the delicate copper tubing and release toxic R-410A refrigerant gas. Follow these 3 safe steps:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                                    <span className="text-primary font-bold block mb-1">Step 1: Set to Fan Only</span>
                                    <span className="text-slate-300 text-[11px] font-sans">Turns off the compressor while using room air to melt the ice safely.</span>
                                </div>
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                                    <span className="text-primary font-bold block mb-1">Step 2: Place Towels</span>
                                    <span className="text-slate-300 text-[11px] font-sans">Catch dripping water before it overflows into interior drywall.</span>
                                </div>
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                                    <span className="text-primary font-bold block mb-1">Step 3: Schedule Service</span>
                                    <span className="text-slate-300 text-[11px] font-sans">Book a $175 diagnostic to identify the underlying pressure or airflow leak.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 Root Causes on Oahu */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            The 3 Causes of Frozen AC Coils in Hawaii
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ROOT_CAUSES.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-surface-dark border border-white/10 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="size-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-header font-bold text-lg uppercase text-white">{item.title}</h3>
                                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10 text-[11px] font-mono text-emerald-400">
                                    <strong>Solution:</strong> {item.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Diagnostic Intake Form */}
                <section id="diagnostic-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            PREVENT COMPRESSOR BURNOUT &bull; $0 TO BOOK
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Schedule Frozen AC Diagnostic Inspection
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            A licensed technician will test pressures, inspect fan motors, and provide a clear upfront repair quote.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Service Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Our dispatch desk will contact you to coordinate earliest technician arrival.
                            </p>
                            <p className="font-mono text-[11px] text-emerald-400">
                                Call (808) 488-1111 for urgent phone triage.
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
                                    placeholder="e.g. Jason Akana"
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
                                        placeholder="e.g. Pearl City, Kailua"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">AC System Type</label>
                                <select 
                                    value={unitType}
                                    onChange={(e) => setUnitType(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="mini_split">Ductless Mini Split System</option>
                                    <option value="window_ac">Window Unit Air Conditioner</option>
                                    <option value="central_ac">Attic Central AC System</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Additional Symptoms (Optional)</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Where is the ice (indoor coils, outdoor copper line, or both)? Is water leaking inside?"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request $175 Diagnostic Inspection'}
                            </button>

                            <p className="text-[10px] font-mono text-slate-400 text-center">
                                $175 Flat Rate &bull; Licensed Contractor CT-36775 &bull; Drop-Cloth Protection Standard
                            </p>
                        </form>
                    )}
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Frozen AC FAQs
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
                        title="Oahu Homeowner Service Reviews"
                        subtitle="Fast diagnostic repairs across all 22 Oahu communities"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
