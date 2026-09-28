'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Zap, 
    AlertTriangle, 
    ShieldAlert, 
    Wrench, 
    CheckCircle2, 
    Phone, 
    Calendar, 
    ArrowRight, 
    ChevronDown, 
    Sparkles, 
    ShieldCheck, 
    Activity,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';

const TRIP_MODES = [
    {
        type: "Instant Trip (Under 2 Seconds)",
        symptom: "Breaker snaps off immediately with a click or spark as soon as the AC is powered on.",
        causes: [
            "Grounded compressor motor winding (internal electrical insulation melted)",
            "Gecko or lizard short circuit across high-voltage outdoor inverter terminal",
            "Dead short circuit in 230V line-voltage disconnect wiring",
            "Failed contactor or shorted control board"
        ],
        severity: "Critical Electrical Short"
    },
    {
        type: "Delayed Trip (Runs for 5 to 15 Minutes)",
        symptom: "AC turns on, blows cool air for a few minutes, then the breaker trips when the compressor ramps up.",
        causes: [
            "Failing motor capacitor forcing compressor to pull massive starting amps (LRA)",
            "Clogged, salt-crusted condenser coil driving head pressure through the roof",
            "Undersized circuit wire or breaker on older 60A/100A Oahu electrical panel",
            "Outdoor condenser fan motor seized or spinning at half speed"
        ],
        severity: "Thermal Overload / Amp Spike"
    }
];

const FAQS = [
    {
        q: "Why shouldn't I keep flipping the breaker back on?",
        a: "A circuit breaker is a vital fire safety device designed to trip when electrical current exceeds the safe capacity of your home's wiring. If you repeatedly force the breaker on against a grounded compressor or dead short, the wires inside your walls overheat, melting insulation and creating a severe electrical arc flash or structural fire hazard."
    },
    {
        q: "How does a technician test for an electrical short?",
        a: "Our CT-36775 licensed technicians use calibrated digital multimeters and megohmmeters (meggers). We isolate the compressor terminals, measure resistance to ground (checking for infinite resistance), test capacitor microfarads against factory spec, and clamp the live electrical feed to monitor real-time amp draw."
    },
    {
        q: "How much does the diagnostic inspection cost?",
        a: "We charge a transparent flat rate of $175 anywhere on Oahu. This includes electrical testing, troubleshooting the breaker and unit, and providing an upfront itemized repair quote with zero hidden surprise fees."
    }
];

export default function AcTrippingBreakerPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Honolulu');
    const [tripTiming, setTripTiming] = useState('instant');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('symptom_breaker_trip_lead', {
                trip_timing: tripTiming,
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
                service_type: 'AC Electrical Diagnostic (Breaker Trip)',
                urgency: 'high',
                notes: `Symptom: TRIPPING BREAKER | Timing: ${tripTiming.toUpperCase()} | Notes: ${notes.trim() || 'None'}`
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
                    <Breadcrumb items={[{ name: 'AC Keeps Tripping Breaker Hawaii' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Zap className="size-3.5" />
                        <span>Electrical Safety Alert &bull; Licensed Contractor CT-36775</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        AC Keeps Tripping Breaker <span className="text-primary italic">Hawaii Guide</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Does your air conditioner instantly trip your electrical circuit breaker or shut off after running for 10 minutes? Learn what causes electrical overload in Oahu homes and book a $175 diagnostic inspection.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#breaker-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book $175 Electrical Diagnostic
                        </a>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Hotline: (808) 488-1111"
                            eventLabel="Breaker Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Safety Warning Card */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-4">
                        <ShieldAlert className="size-7 text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <h3 className="font-header font-bold text-lg uppercase text-red-300">
                                Safety Caution: Do Not Repeatedly Force the Breaker ON
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                                If a breaker trips twice, <strong>leave it in the OFF position</strong>. A circuit breaker trips because electrical amperage has exceeded safe limits. Repeatedly forcing it on against a short circuit can melt the wiring inside your walls, weld the breaker contacts, or cause an electrical panel fire.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Timing Diagnostic Breakdown */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            Identify Your Tripping Pattern
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">When does your circuit breaker trip?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TRIP_MODES.map((mode, idx) => (
                            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-surface-dark border border-white/10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-primary uppercase font-bold px-2.5 py-1 rounded bg-primary/10 border border-primary/20">
                                        {mode.severity}
                                    </span>
                                </div>
                                <h3 className="font-header font-bold text-xl uppercase text-white">{mode.type}</h3>
                                <p className="text-xs text-slate-300 font-sans italic">{mode.symptom}</p>

                                <div className="space-y-2 border-t border-white/10 pt-4">
                                    <div className="text-xs font-mono text-slate-400 uppercase font-bold">Likely Root Causes:</div>
                                    <ul className="space-y-2 text-xs text-slate-300 font-sans">
                                        {mode.causes.map((c, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Zap className="size-3.5 text-primary shrink-0 mt-0.5" />
                                                <span>{c}</span>
                                            </li>
                                        ))}
                                    </ul>
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
                                LICENSED ELECTRICAL DIAGNOSTIC
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Complete $175 Electrical Inspection
                            </h2>
                            <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Megohmmeter resistance-to-ground test of compressor motor windings</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Capacitance test against manufacturer microfarad tolerances</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Clamp meter live running-load amperage (RLA) and start-up peak monitoring</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>Inspection of disconnect box, fuses, terminal lugs, and gecko barrier</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                            <Activity className="size-12 text-primary mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">Need Technician Help?</h3>
                            <p className="text-xs text-slate-300">
                                Call our Waipahu shop for immediate technician phone advice. We dispatch licensed technicians island-wide.
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="Call (808) 488-1111"
                                eventLabel="Breaker Help Call"
                                className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </section>

                {/* Form */}
                <section id="breaker-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            PREVENT ELECTRICAL FIRE HAZARD &bull; $0 TO BOOK
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Schedule $175 Electrical Diagnostic
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            Fast dispatch by licensed Hawaii contractor CT-36775. Upfront pricing guaranteed.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Service Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Keep the breaker in the OFF position. Our dispatch team will call you shortly.
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
                                    placeholder="e.g. Brandon Lee"
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
                                        placeholder="e.g. Kaimuki, Pearl City"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">When Does the Breaker Trip?</label>
                                <select 
                                    value={tripTiming}
                                    onChange={(e) => setTripTiming(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="instant">Instantly within 2 seconds of turning on</option>
                                    <option value="delayed">After running 5 to 15 minutes</option>
                                    <option value="random">Randomly once or twice a week</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Additional Notes (Optional)</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="AC brand, age of unit, breaker amperage, or any buzzing noises."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request $175 Electrical Diagnostic'}
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
                            Breaker Tripping FAQs
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
                        title="Oahu AC Electrical Repair Reviews"
                        subtitle="Homeowners who got their systems safely repaired"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
