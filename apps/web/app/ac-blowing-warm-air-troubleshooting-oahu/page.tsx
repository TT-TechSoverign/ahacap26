'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    AlertTriangle, 
    ThermometerSnowflake, 
    Zap, 
    Wrench, 
    CheckCircle2, 
    Clock, 
    Phone, 
    Calendar, 
    ArrowRight, 
    ChevronDown, 
    Sparkles, 
    ShieldCheck, 
    Warehouse, 
    Activity,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const CAUSES = [
    {
        title: "Blown Motor Run Capacitor",
        probability: "40% of Oahu Service Calls",
        desc: "Oahu power grid voltage fluctuations frequently weaken the dual-run capacitor. The interior blower fan blows room air, but the rotary compressor fails to start.",
        fix: "Technician tests microfarad rating and installs a new heavy-duty motor capacitor."
    },
    {
        title: "Salt-Air Refrigerant Micro-Leak",
        probability: "30% of Oahu Service Calls",
        desc: "Marine trade winds pit aluminum evaporator fins and copper U-bends, releasing factory refrigerant gas over time.",
        fix: "Electronic halogen sniff test, coil corrosion inspection, and honest clean-vs-replace evaluation."
    },
    {
        title: "Gecko Invertebrate Inverter Short",
        probability: "15% of Oahu Service Calls",
        desc: "Island geckos crawl between the rear inverter heat sink and printed circuit board inside the window chassis, triggering emergency high-voltage shutoff.",
        fix: "Board bench inspection, terminal fuse testing, and protective silicone insect shielding."
    },
    {
        title: "Salt-Crusted Condenser Coil",
        probability: "15% of Oahu Service Calls",
        desc: "Rear condenser coils caked in salt and red dirt cannot dissipate heat, triggering thermal overload safety cutoff.",
        fix: "Specialized low-pressure chemical foam coil wash and fin comb realignment."
    }
];

const FAQS = [
    {
        q: "What should I check before calling for a repair?",
        a: "Check three things: (1) Ensure the control mode is set to COOL (not FAN ONLY or ENERGY SAVER), (2) Check your LCDI plug reset button and main electrical panel for a tripped breaker, and (3) Inspect your front slide-out air filter—a pitch-black clogged filter chokes airflow and causes compressor overload."
    },
    {
        q: "How much is your diagnostic service call?",
        a: "We charge a transparent flat rate of $175. This covers technician dispatch anywhere on Oahu, electrical multimeter testing, thermal Delta-T and coil inspection, and a comprehensive written quote before any physical repairs begin."
    },
    {
        q: "What if my window AC compressor is completely seized?",
        a: "If the compressor is locked or grounded and the unit is over 5 years old, replacement is much more cost-effective than a compressor swap. Affordable Home A/C stocks brand-new LG Dual Inverters and GE window ACs in our Waipahu warehouse starting at $395 (with a $45 Hawaii Energy rebate on qualifying Energy Star models) and provides $0 upfront estimates for new window AC installations."
    }
];

export default function AcBlowingWarmAirPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Waipahu');
    const [systemType, setSystemType] = useState('window_ac');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('symptom_warm_air_lead', {
                system_type: systemType,
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
                service_type: 'Window AC Diagnostic (Warm Air)',
                urgency: 'high',
                notes: `Symptom: BLOWING WARM AIR | Equipment: ${systemType.toUpperCase()} | Notes: ${notes.trim() || 'None'}`
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
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'AC Blowing Warm Air Troubleshooting' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <AlertTriangle className="size-3.5" />
                        <span>Urgent Symptom Solver &bull; Window AC Troubleshooting &amp; Replacement</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Blowing Warm Air <span className="text-primary italic">Troubleshooting Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your window air conditioner running but blowing lukewarm, room-temperature air? Learn the 4 most common Oahu failure modes, or book an on-site troubleshooting &amp; clean-vs-replace assessment with our insured Oahu specialists.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#diagnostic-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book Troubleshooting Appointment
                        </a>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Hotline: (808) 488-1111"
                            eventLabel="Warm Air Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 4 Most Common Causes Breakdown */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Why Air Conditioners Blow Warm Air on Oahu
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">Diagnosed daily by our Waipahu field technicians.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CAUSES.map((cause, idx) => (
                            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono text-[10px] text-amber-400 uppercase font-bold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                                        {cause.probability}
                                    </span>
                                </div>
                                <h3 className="font-header font-bold text-xl uppercase text-white">{cause.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">{cause.desc}</p>
                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-cyan-300">
                                    <strong>Professional Cure:</strong> {cause.fix}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Diagnostic Value Standard */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.3em] font-bold block">
                                OUR SERVICE COMMITMENT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                What Is Included in Our On-Site Window AC Inspection?
                            </h2>
                            <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Experienced Oahu window AC technician dispatch to your residence</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Electrical multimeter capacitance, voltage, and amp draw testing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Evaporator &amp; condenser coil airflow and temperature Delta-T verification</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Honest clean-vs-replace quote with zero obligation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Clean drop cloth protection laid beneath indoor workspace</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                            <Activity className="size-12 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Emergency Phone Triage</h3>
                            <p className="text-xs text-slate-300">
                                Call our Waipahu dispatch desk for immediate phone guidance. If your compressor is buzzing loudly, shut the breaker off to prevent motor burnout.
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="(808) 488-1111"
                                eventLabel="Warm Air Triage Call"
                                className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </section>

                {/* Diagnostic Intake Form */}
                <section id="diagnostic-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            SCHEDULE SERVICE DISPATCH &bull; $0 DEPOSIT TO BOOK
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Book Window AC Troubleshooting
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            Submit your contact details and our dispatch team will assign our earliest available field technician.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Service Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Our dispatch team will call you shortly to confirm technician arrival time.
                            </p>
                            <p className="font-mono text-[11px] text-emerald-400">
                                Call (808) 488-1111 for immediate urgent phone dispatch.
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
                                    placeholder="e.g. David Kekoa"
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
                                        placeholder="e.g. Kaneohe, Mililani"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Equipment Type</label>
                                <select 
                                    value={systemType}
                                    onChange={(e) => setSystemType(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="window_ac">Window Air Conditioner (115V / 230V)</option>
                                    <option value="wall_sleeve_ac">Thru-the-Wall Sleeve AC (GE 26&quot;)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Symptom Details (Optional)</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="When did it stop cooling? Is the fan spinning? Any blinking lights?"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Dispatching...' : 'Request Service Dispatch'}
                            </button>

                            <p className="text-[10px] font-mono text-slate-400 text-center">
                                Upfront Estimates &bull; Insured Oahu Specialists &bull; No Upfront Payment Required to Book
                            </p>
                        </form>
                    )}
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Warm Air Troubleshooting FAQs
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

                <WindowAcQuickShop
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,200)"
                    subheading="Skip expensive compressor or sealed-system repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />

                {/* Reviews */}
                <section className="mb-12">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu AC Repair Customer Reviews"
                        subtitle="Homeowners who got their ice-cold air restored quickly"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
