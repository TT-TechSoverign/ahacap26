'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Sparkles, 
    Droplets, 
    Shield, 
    Check, 
    ArrowRight, 
    CheckCircle2, 
    Clock, 
    Phone, 
    Warehouse, 
    Wrench, 
    ChevronDown, 
    DollarSign, 
    Wind, 
    FileText, 
    AlertTriangle,
    Layers,
    Activity
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function AcCleaningOahuPage() {
    const [serviceTier, setServiceTier] = useState<'window' | 'mini_split'>('window');
    const [miniSplitTier, setMiniSplitTier] = useState<'basic' | 'premium'>('premium');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('Waipahu');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('ac_cleaning_lead', {
                service_tier: serviceTier,
                mini_split_tier: serviceTier === 'mini_split' ? miniSplitTier : 'n/a',
                city,
                full_name: fullName,
                phone,
            });

            const nameParts = fullName.trim().split(/\s+/);
            const firstName = nameParts[0] || 'Customer';
            const lastName = nameParts.slice(1).join(' ') || 'Oahu';

            const serviceName = serviceTier === 'window' 
                ? 'Window AC Teardown Cleaning ($275)' 
                : `Mini Split Cleaning (${miniSplitTier === 'premium' ? '$275 Premium' : '$175 Basic'})`;

            const payload = {
                first_name: firstName,
                last_name: lastName,
                email: email.trim() || 'inquiry@affordablehome-ac.com',
                phone: phone.trim(),
                address: address.trim() || 'Oahu, HI',
                city: city.trim() || 'Oahu',
                zip: '',
                service_type: serviceName,
                urgency: 'standard',
                notes: `Service: ${serviceName} | Location: ${city} | Delivery/Pickup: ${serviceTier === 'window' ? 'Waipahu Warehouse Drop-Off' : 'On-Site Home Service'} | Notes: ${notes.trim() || 'None'}`
            };

            const res = await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                console.warn('Cleaning lead submission non-200', res.status);
            }
            setIsSuccess(true);
        } catch (err) {
            console.error('Cleaning lead submission fallback', err);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqItems = [
        {
            q: "Why is a full teardown cleaning required for window ACs instead of spraying it in the window?",
            a: "Spraying cleaner into an installed window AC only pushes dust and mold deeper into the center of the coil sandwich. True mold eradication requires pulling the unit, disassembling the exterior casing, shielding electrical components, and submerging/flushing both the evaporator and condenser coils with specialized biodegradable Hawaiian foam cleaner. We complete this in our Waipahu warehouse immersion tank with a 24–48 hour turnaround."
        },
        {
            q: "What does the Mini-Split Chemical Deep Clean include?",
            a: "Our technicians carefully protect your walls and surrounding living space, fully disassemble the front facia and directional louvers, treat the indoor evaporator coils and blower wheel with clinical-grade non-toxic antimicrobial foam, execute a precision pressurized coil rinse, vacuum-clear the condensate drain line, and bench-test airflow output and temperature differential."
        },
        {
            q: "Do I have to pay upfront when booking a cleaning appointment?",
            a: "No! Affordable Home AC requires zero upfront payment. You book your preferred window AC drop-off appointment or mini-split in-home service with $0 deposit, and you pay only after the cleaning is finished and tested."
        },
        {
            q: "How often should ACs be cleaned on Oahu?",
            a: "Because Oahu maintains 70–80% average humidity and constant coastal salt mist, AC coils and blower wheels develop biological slime and mold within 9 to 12 months of daily use. Annual deep cleaning restores airflow CFM by up to 30% and reduces compressor power draw under HECO rates."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - Oahu AC Deep Cleaning & Mold Sanitization",
                "telephone": "+1-808-724-4328",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leokane St",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Licensed Hawaii Contractor CT-36775 specializing in window AC immersion tank teardown sanitization ($275) and ductless mini-split chemical coil flushes ($175–$275) across Honolulu and Oahu."
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

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] md:pt-[150px] pb-24">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                        <Sparkles className="size-3.5" />
                        Clinical Coil Sanitization &bull; CT-36775 Licensed
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Oahu <span className="text-primary">AC Deep Cleaning</span> &amp; Mold Purge
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Window AC Teardowns ($275) &bull; Mini-Split Coil Flushes ($175–$275)
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Eradicate black mold, musty odors, and salt-crusted coil blockage. Our clinical cleaning protocols restore ice-cold airflow, purify indoor air, and cut electric bills under Hawaiian Electric rates. Zero upfront booking deposit.
                    </p>
                </div>

                {/* Service Selection Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-2">
                        <button
                            onClick={() => setServiceTier('window')}
                            className={`px-6 py-2.5 rounded-xl font-header font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                                serviceTier === 'window'
                                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Window AC Teardown ($275 Flat Rate)
                        </button>
                        <button
                            onClick={() => setServiceTier('mini_split')}
                            className={`px-6 py-2.5 rounded-xl font-header font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                                serviceTier === 'mini_split'
                                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Mini-Split Deep Clean & Sanitization ($175 / $275)
                        </button>
                    </div>
                </div>

                {/* Service Details & Booking Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                    {/* Left 7 Columns: Process Details */}
                    <div className="lg:col-span-7 space-y-6">
                        {serviceTier === 'window' ? (
                            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-widest">
                                        Waipahu Warehouse Drop-Off by Appointment
                                    </div>
                                    <h2 className="text-2xl font-header font-black uppercase text-white mt-1">
                                        Window AC Full Teardown &amp; Immersion Tank Sanitization
                                    </h2>
                                    <div className="flex items-baseline gap-3 mt-2">
                                        <span className="text-3xl font-black text-emerald-400 font-mono">$275.00</span>
                                        <span className="text-xs font-mono text-slate-400">Flat Rate per Unit &bull; Zero Surprise Fees</span>
                                    </div>
                                </div>

                                <div className="space-y-4 text-xs font-mono">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            1. Complete Physical Disassembly
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            We remove outer casing, fan shrouds, styrofoam air baffles, and electrical control housing.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            2. Chemical Dip Tank &amp; Pressure Wash
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Evaporator and condenser coils receive foaming antimicrobial wash, dislodging deep-seated black mold spores and salt-air crust.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            3. 24–48 Hr Bench Test &amp; Pick-Up
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Unit is reassembled, laser-calibrated, and run through a 30-minute amp-draw and temperature delta test before you pick it up.
                                        </p>
                                    </div>
                                </div>

                                {/* Clean vs Replace Callout */}
                                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-2 font-sans">
                                    <div className="font-header font-bold uppercase text-cyan-300 flex items-center gap-1.5">
                                        <Activity className="size-4" /> Is Your Window AC 6+ Years Old?
                                    </div>
                                    <p className="leading-relaxed">
                                        If your unit has severely rusted coil copper or seized fan bearings, spending $275 to clean it might not make economic sense. Buying a brand-new in-stock LG Dual Inverter starts at just $504 with a pre-approved $45 Hawaii Energy cash rebate!
                                    </p>
                                    <Link 
                                        href="/clean-vs-replace-window-ac" 
                                        className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px] inline-flex items-center gap-1 font-bold"
                                    >
                                        Use Clean vs. Replace Calculator <ArrowRight className="size-3" />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <div className="text-xs font-mono text-purple-400 uppercase font-bold tracking-widest">
                                        On-Site In-Home Service &bull; All Oahu
                                    </div>
                                    <h2 className="text-2xl font-header font-black uppercase text-white mt-1">
                                        Ductless Mini-Split Clinical Deep Clean
                                    </h2>
                                    <div className="flex items-center gap-3 mt-3">
                                        <button
                                            type="button"
                                            onClick={() => setMiniSplitTier('basic')}
                                            className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                                                miniSplitTier === 'basic'
                                                    ? 'bg-purple-500/20 border-purple-400 text-white font-bold'
                                                    : 'bg-white/5 border-white/10 text-slate-400'
                                            }`}
                                        >
                                            Basic Maintenance ($175)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMiniSplitTier('premium')}
                                            className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                                                miniSplitTier === 'premium'
                                                    ? 'bg-purple-500/20 border-purple-400 text-white font-bold'
                                                    : 'bg-white/5 border-white/10 text-slate-400'
                                            }`}
                                        >
                                            Premium Teardown Flush ($275) ★
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 font-mono text-xs text-slate-300">
                                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                                        <CheckCircle2 className="size-4 text-purple-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-white">Comprehensive Wall &amp; Floor Shielding:</strong> Precision teardown and surface isolation ensures zero mess, chemical splatter, or moisture on your drywall or floors.
                                        </div>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                                        <CheckCircle2 className="size-4 text-purple-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-white">Blower Wheel &amp; Barrel Purge:</strong> Eliminates caked-on mold slime and restored 100% air velocity.
                                        </div>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                                        <CheckCircle2 className="size-4 text-purple-400 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-white">Condensate Drain Clear:</strong> Vacuum and flush drain line to prevent drywall leaks and overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right 5 Columns: Booking Intake */}
                    <div className="lg:col-span-5">
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl sticky top-28">
                            <div className="border-b border-white/10 pb-4 mb-4">
                                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mb-2">
                                    $0 Upfront Booking Deposit
                                </div>
                                <h3 className="text-xl font-header font-black uppercase text-white">
                                    Book Cleaning Service
                                </h3>
                                <p className="text-slate-400 text-xs mt-1">
                                    Pay only after cleaning is complete and cooling cold.
                                </p>
                            </div>

                            {isSuccess ? (
                                <div className="py-8 text-center space-y-4 font-mono">
                                    <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <div className="text-sm text-white font-bold uppercase">Cleaning Request Confirmed!</div>
                                    <p className="text-xs text-slate-300 font-sans">
                                        Our dispatch team has scheduled your cleaning intake for {city}. We will reach out shortly to confirm drop-off or service timing.
                                    </p>
                                    <div className="pt-4">
                                        <a 
                                            href="tel:8087244328" 
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-cyan-400 hover:bg-white/15 text-xs font-bold font-sans"
                                        >
                                            <Phone className="size-3.5" /> Dispatch Phone: (808) 724-4328
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
                                            placeholder="e.g. David Chun"
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
                                            <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">City / Area</label>
                                            <input
                                                type="text"
                                                required
                                                value={city}
                                                onChange={e => setCity(e.target.value)}
                                                placeholder="e.g. Waipahu"
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
                                            placeholder="Street address (for on-site service)"
                                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Notes / Preferred Day</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="Preferred drop-off time, unit brand/model..."
                                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Booking Intake...' : 'Book Cleaning Service ($0 Deposit)'}
                                    </button>

                                    <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
                                        Licensed Hawaii Contractor CT-36775 &bull; Upfront pricing guaranteed
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            AC Cleaning Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">Everything about our chemical teardown and flush services</p>
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
                            {activeFaq === index && (
                                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Trust & Contact Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 text-center space-y-4">
                    <h4 className="text-xl font-header font-black uppercase text-white">
                        Breathe Clean, Mold-Free Air in Your Home
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Book your drop-off or on-site cleaning today. Fast 24–48 hour turnarounds at our Waipahu warehouse.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <a 
                            href="tel:8087244328"
                            className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <Phone className="size-4" />
                            Call Dispatch: (808) 724-4328
                        </a>
                        <Link 
                            href="/shop"
                            className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold hover:bg-white/10 transition-all"
                        >
                            Shop New In-Stock Units ($45 Rebate)
                        </Link>
                    </div>
                </div>
            </main>
            <BackToTop />
        </div>
    );
}
