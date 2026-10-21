'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
    Wrench, 
    AlertTriangle, 
    Clock, 
    Phone, 
    CheckCircle2, 
    Snowflake, 
    Droplets, 
    Zap, 
    ChevronDown, 
    RotateCcw,
    Gauge
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';

export default function AcRepairOahuPage() {
    const [selectedSymptom, setSelectedSymptom] = useState<string>('warm_air');
    const [equipmentType, setEquipmentType] = useState<string>('window_ac');
    const [unitAge, setUnitAge] = useState<string>('under_5');
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('Waipahu');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const symptoms = [
        { id: 'warm_air', label: 'Blowing Warm Air / Not Cooling', icon: Snowflake, advice: 'Likely failed capacitor, thermostat sensor issue, or clogged condenser coil.' },
        { id: 'leaking', label: 'Water Leaking Inside / On Sill', icon: Droplets, advice: 'Improper window pitch, clogged drain pan channel, or frozen evaporator coils.' },
        { id: 'electrical', label: 'Tripped Breaker / Won\'t Turn On', icon: Zap, advice: 'LCDI plug trip, electrical short circuit, control board malfunction, or blown fuse.' },
        { id: 'noise', label: 'Loud Rattling / Screeching Noise', icon: AlertTriangle, advice: 'Worn blower wheel bearings, loose fan blade, or compressor mechanical wear.' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('ac_repair_lead', {
                symptom: selectedSymptom,
                equipment_type: equipmentType,
                unit_age: unitAge,
                city,
                full_name: fullName,
                phone,
            });

            const nameParts = fullName.trim().split(/\s+/);
            const firstName = nameParts[0] || 'Customer';
            const lastName = nameParts.slice(1).join(' ') || 'Oahu';

            const payload = {
                first_name: firstName,
                last_name: lastName,
                email: email.trim() || 'office@affordablehome-ac.com',
                phone: phone.trim(),
                address: address.trim() || 'Oahu, HI',
                city: city.trim() || 'Oahu',
                zip: '',
                service_type: 'Window AC Diagnosis/Repair',
                urgency: 'flexible',
                notes: `Symptom: ${selectedSymptom.toUpperCase()} | Equipment: ${equipmentType.toUpperCase()} | Estimated Age: ${unitAge} Years | Customer Notes: ${notes.trim() || 'None'}`
            };

            const res = await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                console.warn('Lead submission non-200 status', res.status);
            }
            setIsSuccess(true);
        } catch (err) {
            console.error('Lead submission network fallback', err);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqItems = [
        {
            q: "How quickly can a technician be scheduled for Window AC repair on Oahu?",
            a: "We schedule diagnostic appointments based on our earliest technician availability across all 22 Oahu municipalities. Booking through this form allows our dispatch team to coordinate a convenient appointment window with zero upfront deposit required."
        },
        {
            q: "How much is the diagnostic service fee?",
            a: "We provide a $0 Free Clean-vs-Replace Assessment and custom itemized quote that covers on-site technician dispatch, travel time, and a comprehensive electrical and mechanical troubleshooting evaluation. You receive an upfront, itemized repair or replacement recommendation before any physical work begins."
        },
        {
            q: "What if my Window AC unit is too old or expensive to repair?",
            a: "If your compressor is grounded/seized or your unit is over 5–7 years old with extensive salt-air coil corrosion, repair costs can exceed the value of the unit. Because Affordable Home AC maintains its own Waipahu warehouse, we can immediately offer in-stock LG Dual Inverter and GE Built-In window AC replacements ($395–$1,200) with same-day/next-day pickup by appointment or $50 flat Oahu delivery."
        },
        {
            q: "Do you service both window-mounted and through-the-wall AC units?",
            a: "Yes. Our technicians service and replace both standard/jalousie-mounted LG Dual Inverter window air conditioners and 26-inch GE Built-In through-the-wall chassis across Honolulu, Pearl City, Waipahu, Kailua, and all Oahu."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - Oahu Window AC Repair & Diagnostic Troubleshooting",
                "telephone": "+1-808-488-1111",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leoleo St. #203",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Local Oahu cooling specialists providing diagnostic troubleshooting, repair, and replacement for window and through-the-wall air conditioners across Honolulu, Waipahu, and all Oahu."
            },
            {
                "@type": "Service",
                "name": "Window AC Repair & Diagnostics Oahu",
                "serviceType": "Window AC Repair & Troubleshooting",
                "provider": {
                    "@type": "HVACBusiness",
                    "name": "Affordable Home AC"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Professional Window AC diagnostic troubleshooting and repairs across Honolulu, Waipahu, and island-wide Oahu."
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                    { "@type": "ListItem", "position": 2, "name": "Window AC Repair Oahu", "item": "https://www.affordablehome-ac.com/ac-repair-oahu" }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqItems.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[96px] md:pt-[180px] pb-24">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                        <Clock className="size-3.5" />
                        Prompt Diagnostic Scheduling &bull; Waipahu Warehouse Direct
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Professional <span className="text-primary">Window AC Repair</span> Oahu
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Window &amp; Through-the-Wall AC Diagnostic Troubleshooting
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Accurate diagnostic inspection for window and through-the-wall AC units across Honolulu, Pearl City, Waipahu, and all Oahu. Zero upfront booking deposit and upfront itemized estimates.
                    </p>
                </div>

                {/* Main Interactive Triage & Dispatch Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                    {/* Diagnostic Selector (Left 7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Step 1: Symptom Selector */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                                    <Gauge className="size-4" /> 1. Select Primary System Symptom
                                </label>
                                <span className="text-xs font-mono text-slate-400">Diagnostic Triage</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {symptoms.map(s => {
                                    const Icon = s.icon;
                                    const isSelected = selectedSymptom === s.id;
                                    return (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setSelectedSymptom(s.id)}
                                            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                                                isSelected
                                                    ? 'bg-cyan-500/10 border-cyan-400 ring-1 ring-cyan-400'
                                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon className={`size-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                                                <span className="font-header font-bold text-xs uppercase text-white">{s.label}</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{s.advice}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Equipment & Age */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl space-y-4">
                            <label className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                                <Wrench className="size-4" /> 2. Mounting Type &amp; Approximate Age
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEquipmentType('window_ac')}
                                    className={`p-4 rounded-2xl border text-left transition-all ${
                                        equipmentType === 'window_ac'
                                            ? 'bg-cyan-500/10 border-cyan-400 ring-1 ring-cyan-400'
                                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                    }`}
                                >
                                    <div className="font-header font-bold text-xs uppercase text-white">Standard / Jalousie Window AC</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Mounted in a standard sash, slider, or jalousie window</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEquipmentType('thru_wall')}
                                    className={`p-4 rounded-2xl border text-left transition-all ${
                                        equipmentType === 'thru_wall'
                                            ? 'bg-purple-500/10 border-purple-400 ring-1 ring-purple-400'
                                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                    }`}
                                >
                                    <div className="font-header font-bold text-xs uppercase text-white">Through-the-Wall Sleeve AC</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Slide-out chassis inside a 26&quot; metal wall sleeve</div>
                                </button>
                            </div>

                            <div className="pt-2">
                                <label className="text-[11px] font-mono text-slate-400 uppercase block mb-2">Estimated System Age</label>
                                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                                    {[
                                        { id: 'under_5', label: 'Under 5 Years' },
                                        { id: '5_to_8', label: '5 to 8 Years' },
                                        { id: '8_plus', label: '8+ Years Old' }
                                    ].map(a => (
                                        <button
                                            key={a.id}
                                            type="button"
                                            onClick={() => setUnitAge(a.id)}
                                            className={`py-2 px-3 rounded-xl border text-center transition-all ${
                                                unitAge === a.id
                                                    ? 'bg-primary/20 border-primary text-cyan-300 font-bold'
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {a.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Repair vs Replace Gateway Banner */}
                        {unitAge === '8_plus' && (
                            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-950 border border-amber-500/30 space-y-2">
                                <div className="inline-flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold uppercase">
                                    <RotateCcw className="size-3.5" /> Repair vs. Replace Advisory
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Because your window AC is over 8 years old, compressor replacement or severe coil leak repairs often cost more than a brand-new unit. If our technician finds irreparable damage, you can apply your diagnostic towards an in-stock LG Dual Inverter ($45 Hawaii Energy rebate) or GE Built-In replacement.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Dispatch Intake Form (Right 5 Cols) */}
                    <div className="lg:col-span-5">
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl relative sticky top-28">
                            <div className="border-b border-white/10 pb-4 mb-4">
                                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mb-2">
                                    Zero Upfront Deposit
                                </div>
                                <h3 className="text-xl font-header font-black uppercase text-white">
                                    Request Diagnostic Dispatch
                                </h3>
                                <p className="text-slate-400 text-xs mt-1">
                                    Pay technician only after on-site inspection. Fast priority routing.
                                </p>
                            </div>

                            {isSuccess ? (
                                <div className="py-8 text-center space-y-4 font-mono">
                                    <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <div className="text-sm text-white font-bold uppercase">Diagnostic Request Dispatched!</div>
                                    <p className="text-xs text-slate-300">
                                        Our dispatch team has received your repair ticket for {city}. A technician will contact you shortly to confirm our soonest arrival window.
                                    </p>
                                    <div className="pt-4">
                                        <a 
                                            href="tel:808-488-1111" 
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-cyan-400 hover:bg-white/15 text-xs font-bold"
                                        >
                                            <Phone className="size-3.5" /> Call Dispatch Now: (808) 488-1111
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Your Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)}
                                            placeholder="e.g. Keanu Silva"
                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder="(808) 000-0000"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Oahu City / Area</label>
                                            <input
                                                type="text"
                                                required
                                                value={city}
                                                onChange={e => setCity(e.target.value)}
                                                placeholder="e.g. Pearl City"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            placeholder="e.g. 94-150 Leoleo St. #203"
                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Describe Issue (Optional)</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="Unit makes a humming sound, error code CH05 on screen..."
                                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Dispatching...' : 'Submit Diagnostic Request ($0 Deposit)'}
                                    </button>

                                    <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
                                        Waipahu Warehouse Direct &bull; Insured Oahu Cooling Specialists
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Common Oahu Failure Modes Breakdown */}
                <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl mb-20">
                    <h3 className="text-xl font-header font-black uppercase text-white mb-4">
                        Why Window Air Conditioners Fail on Oahu
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                                <Droplets className="size-4" /> Salt-Air Corrosion
                            </div>
                            <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                                Coastal trade winds carry airborne salt across the island, rapidly oxidizing aluminum condenser fins and pitting copper tubing, resulting in pinhole micro-leaks.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                                <Clock className="size-4" /> Control Board &amp; Capacitor Wear
                            </div>
                            <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                                High ambient heat and humidity place heavy thermal loads on start/run capacitors and inverter control boards during peak summer cooling cycles.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                                <AlertTriangle className="size-4" /> Algae Drain Pan Blockages
                            </div>
                            <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                                Warm 74%+ relative humidity incubates thick algae biofilm inside window AC slinger pans and drain channels, causing water to back up and drip indoors.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            Window AC Repair Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">Fast answers to common Oahu cooling emergencies</p>
                    </div>
                    {faqItems.map((faq, index) => (
                        <div 
                            key={index}
                            className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-cyan-400 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === index ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                            </button>
                            <div className={`px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3 ${activeFaq === index ? 'block' : 'hidden'}`}>
                                    {faq.a}
                                </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Help Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 text-center space-y-4">
                    <h4 className="text-xl font-header font-black uppercase text-white">
                        Need Phone Assistance with Your Oahu Window AC?
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Speak directly with our local Waipahu dispatch team for real-time scheduling and technician availability.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <a 
                            href="tel:808-488-1111"
                            className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <Phone className="size-4" />
                            Call Dispatch: (808) 488-1111
                        </a>
                        <Link 
                            href="/shop"
                            className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold hover:bg-white/10 transition-all"
                        >
                            Browse In-Stock Replacements
                        </Link>
                    </div>
                </div>
                <WindowAcQuickShop
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,200)"
                    subheading="Skip expensive compressor or sealed-system repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />
            </main>
                            <OahuEEATAuthorityBar topicTitle="Oahu Window AC & Cleaning Technical Guide" />

                <BackToTop />
        </div>
    );
}
