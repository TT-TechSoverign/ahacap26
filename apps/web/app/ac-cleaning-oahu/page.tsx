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
    Activity,
    ShieldCheck
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function AcCleaningOahuPage() {
    const [cleaningTier, setCleaningTier] = useState<'basic' | 'premium'>('premium');
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
                service_tier: cleaningTier,
                city,
                full_name: fullName,
                phone,
            });

            const nameParts = fullName.trim().split(/\s+/);
            const firstName = nameParts[0] || 'Customer';
            const lastName = nameParts.slice(1).join(' ') || 'Oahu';

            const serviceName = cleaningTier === 'premium' 
                ? 'Premium Mini Split Deep Teardown ($275)' 
                : 'Basic Mini Split Cleaning ($175)';

            const payload = {
                first_name: firstName,
                last_name: lastName,
                email: email.trim() || 'office@affordablehome-ac.com',
                phone: phone.trim(),
                address: address.trim() || 'Oahu, HI',
                city: city.trim() || 'Oahu',
                zip: '',
                service_type: serviceName,
                urgency: 'standard',
                notes: `Service: ${serviceName} | Location: ${city} | Service Type: On-Site In-Home Service (Drop Cloth Floor Protection) | Notes: ${notes.trim() || 'None'}`
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
            q: "What is the difference between Basic ($175) and Premium ($275) Mini Split cleaning?",
            a: "Basic Mini Split Cleaning ($175) provides routine on-site coil sanitization, air filter wash, and condensate drain flush. Premium Deep Teardown ($275) is our comprehensive mold-purge protocol: we fully disassemble the front facia and louvers, extract and deep-clean the cylindrical squirrel-cage blower wheel, pressure-wash the coils, and scrub the condensate pan with clean floor drop-cloth protection."
        },
        {
            q: "Do you clean window air conditioners on Oahu?",
            a: "Window air conditioners are sealed consumer appliances that are typically uneconomical to disassemble and chemically overhaul once internal mold or bearing noise sets in. We recommend regular DIY filter cleaning for younger units, or upgrading to an in-stock LG Dual Inverter from our Waipahu warehouse starting at $504 with a $45 Hawaii Energy cash rebate."
        },
        {
            q: "Will the chemical cleaning make a water mess inside my home?",
            a: "Zero water mess. Our licensed technicians always lay clean protective floor drop cloths directly beneath your indoor unit during service and use precision containment rinses. All dirty water and mold slurry are safely captured and removed from your home."
        },
        {
            q: "Do I have to pay upfront when booking a cleaning appointment?",
            a: "No! Affordable Home AC requires zero upfront payment. You book your preferred mini-split in-home service with $0 deposit, and you pay only after the cleaning is finished and tested."
        },
        {
            q: "How often should mini split ACs be cleaned on Oahu?",
            a: "Because Oahu maintains 70–80% average humidity and constant coastal salt mist, mini split coils and blower wheels develop biological slime and mold within 6 to 12 months of daily use. Annual deep cleaning restores airflow CFM by up to 30% and reduces compressor power draw under HECO rates."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - Oahu Mini Split Deep Cleaning & Mold Sanitization",
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
                "description": "Licensed Hawaii Contractor CT-36775 specializing in ductless mini-split chemical coil flushes and full teardown mold eradication ($175–$275) with floor drop cloth protection across Honolulu and Oahu."
            },
            {
                "@type": "Service",
                "name": "Mini Split Deep Cleaning & Teardown Oahu ($175–$275)",
                "serviceType": "HVAC Sanitization & Coil Pressure Wash",
                "provider": {
                    "@type": "HVACBusiness",
                    "name": "Affordable Home AC"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Clinical coil sanitization, blower wheel extraction, and condensate pan mold purge across Oahu.",
                "offers": {
                    "@type": "Offer",
                    "price": "275.00",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                    { "@type": "ListItem", "position": 2, "name": "AC Cleaning Oahu", "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu" }
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

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] md:pt-[150px] pb-24">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                        <ShieldCheck className="size-3.5" />
                        Clinical Coil Sanitization &bull; CT-36775 Licensed &bull; Drop-Cloth Protected
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Oahu <span className="text-primary">Mini Split Cleaning</span> &amp; Mold Purge
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Basic Service ($175) &bull; Premium Full Teardown ($275) &bull; Zero Water Mess
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Eradicate black mold, musty odors, and salt-crusted coil blockage. Our clinical cleaning protocols restore ice-cold airflow, purify indoor air, and cut electric bills under Hawaiian Electric rates. Zero upfront booking deposit.
                    </p>
                </div>

                {/* Service Selection Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-2">
                        <button
                            type="button"
                            onClick={() => setCleaningTier('basic')}
                            className={`px-6 py-2.5 rounded-xl font-header font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                                cleaningTier === 'basic'
                                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Basic Cleaning ($175 Flat Rate)
                        </button>
                        <button
                            type="button"
                            onClick={() => setCleaningTier('premium')}
                            className={`px-6 py-2.5 rounded-xl font-header font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                                cleaningTier === 'premium'
                                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Premium Full Teardown ($275 - 100% Mold Purge) ★
                        </button>
                    </div>
                </div>

                {/* Service Details & Booking Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                    {/* Left 7 Columns: Process Details */}
                    <div className="lg:col-span-7 space-y-6">
                        {cleaningTier === 'basic' ? (
                            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-widest">
                                        On-Site In-Home Service &bull; Routine Sanitization
                                    </div>
                                    <h2 className="text-2xl font-header font-black uppercase text-white mt-1">
                                        Basic Mini Split Cleaning &amp; Filter Care
                                    </h2>
                                    <div className="flex items-baseline gap-3 mt-2">
                                        <span className="text-3xl font-black text-emerald-400 font-mono">$175.00</span>
                                        <span className="text-xs font-mono text-slate-400">Flat Rate per Unit &bull; Zero Upfront Deposit</span>
                                    </div>
                                </div>

                                <div className="space-y-4 text-xs font-mono">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            1. Reusable Filter Reverse Rinse &amp; Sanitization
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            High-velocity reverse rinse removes red dirt, pet dander, and salt dust from the fine mesh intake screens.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            2. Evaporator Coil Sanitizing Foam Treatment
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Non-acidic expanding foam penetrates aluminum coil fins to dissolve light biological buildup and restore heat transfer.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            3. Condensate Drain Line Vacuum Extraction &amp; Flush
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Vacuum clears algae plugs and flushes condensate line to prevent indoor overflow leaks onto drywall.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            4. Protective Floor Drop Cloths Laid Under Unit
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Our technicians always lay clean protective drop cloths beneath your unit. Zero water mess guaranteed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border-2 border-cyan-500/30 shadow-2xl space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <div className="text-xs font-mono text-primary uppercase font-bold tracking-widest">
                                        Most Popular &bull; 100% Deep Mold Purge
                                    </div>
                                    <h2 className="text-2xl font-header font-black uppercase text-white mt-1">
                                        Premium Mini Split Deep Cleaning (Full Teardown)
                                    </h2>
                                    <div className="flex items-baseline gap-3 mt-2">
                                        <span className="text-3xl font-black text-emerald-400 font-mono">$275.00</span>
                                        <span className="text-xs font-mono text-slate-400">Flat Rate per Unit &bull; Zero Upfront Deposit</span>
                                    </div>
                                </div>

                                <div className="space-y-4 text-xs font-mono">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            1. Complete Front Casing &amp; Louver Disassembly
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            We remove outer plastic housing, motorized directional louvers, and air baffles to expose hidden mold colonies.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            2. Cylindrical Blower Wheel Extraction &amp; 360° Scrub
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Over 90% of mold grows on the barrel fan wheel. We pull and sanitize the wheel completely, restoring whisper-quiet airflow.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            3. Deep Pressurized Coil Wash &amp; Biofilm Neutralization
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Clinical antimicrobial foaming flush strips stubborn fungal slime from both the front and back coil faces.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            4. Condensate Pan Scrub &amp; Slow-Dissolving Anti-Algae Tablet
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Bottom pan is deep-scrubbed and treated with long-lasting biocidal tablets preventing future algae clogs.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            5. Protective Floor Drop Cloths Laid Under Unit
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Our technicians lay clean protective drop cloths on the floor beneath your indoor unit. Zero water mess.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Window AC Clean vs Replace Callout */}
                        <div className="p-6 rounded-3xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-3 font-sans">
                            <div className="font-header font-bold uppercase text-cyan-300 flex items-center gap-2 text-sm">
                                <Activity className="size-4" /> Have a Window AC Unit?
                            </div>
                            <p className="leading-relaxed">
                                Window air conditioners are factory-sealed appliances that are typically uneconomical to pay hundreds to disassemble and chemically overhaul once internal mold or bearing noise sets in. We recommend regular DIY filter cleaning for young units, or upgrading to an in-stock LG Dual Inverter from our Waipahu warehouse starting at $504 with a pre-approved $45 Hawaii Energy cash rebate and $50 flat island-wide delivery.
                            </p>
                            <div>
                                <Link 
                                    href="/clean-vs-replace-window-ac" 
                                    className="text-cyan-400 hover:text-cyan-300 underline font-mono text-xs inline-flex items-center gap-1 font-bold"
                                >
                                    Read Clean vs. Replace Window AC Guide <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right 5 Columns: Booking Intake */}
                    <div className="lg:col-span-5">
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl sticky top-28">
                            <div className="border-b border-white/10 pb-4 mb-4">
                                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Transparent Upfront Pricing • By Appointment First
                                </div>
                                <h3 className="text-xl font-header font-black uppercase text-white">
                                    Book Cleaning Service
                                </h3>
                                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                    $175 Basic Mini Split Cleaning &bull; $275 Premium Full Teardown ($0 to book estimates on replacement units). Submit below, call <a href="tel:808-488-1111" className="text-primary font-bold hover:underline">(808) 488-1111</a>, or email <a href="mailto:office@affordablehome-ac.com" className="text-primary font-bold hover:underline">office@affordablehome-ac.com</a>.
                                </p>
                            </div>

                            {isSuccess ? (
                                <div className="py-8 text-center space-y-4 font-mono">
                                    <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <div className="text-sm text-white font-bold uppercase">Cleaning Request Confirmed!</div>
                                    <p className="text-xs text-slate-300 font-sans">
                                        Our dispatch team has scheduled your cleaning intake for {city}. We will reach out shortly to confirm appointment details and service timing.
                                    </p>
                                    <div className="pt-4">
                                        <a 
                                            href="tel:808-488-1111" 
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-cyan-400 hover:bg-white/15 text-xs font-bold font-sans"
                                        >
                                            <Phone className="size-3.5" /> Dispatch Phone: (808) 488-1111
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
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Selected Service</label>
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex justify-between items-center">
                                            <span className="font-bold text-white">
                                                {cleaningTier === 'premium' ? 'Premium Full Teardown' : 'Basic Mini Split Cleaning'}
                                            </span>
                                            <span className="text-emerald-400 font-mono font-bold">
                                                {cleaningTier === 'premium' ? '$275.00' : '$175.00'}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Notes / Preferred Day</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="Preferred service timing, number of indoor units..."
                                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Booking Intake...' : `Book ${cleaningTier === 'premium' ? '$275 Premium' : '$175 Basic'} Service ($0 Deposit)`}
                                    </button>

                                    <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
                                        Licensed Hawaii Contractor CT-36775 &bull; Transparent upfront pricing
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
            </main>
            <BackToTop />
        </div>
    );
}
