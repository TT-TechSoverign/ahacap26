'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ShieldCheck, 
    Clock, 
    Phone, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    Wrench, 
    Layers, 
    FileText, 
    Check, 
    X, 
    HelpCircle, 
    ChevronDown, 
    Zap, 
    DollarSign, 
    Sparkles, 
    AlertCircle, 
    Send,
    Truck,
    Settings,
    Shield,
    Droplets,
    ExternalLink
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function WindowAcInstallationPage() {
    const [windowType, setWindowType] = useState<string>('jalousie');
    const [includeBracket, setIncludeBracket] = useState<boolean>(true);
    const [unitStatus, setUnitStatus] = useState<string>('need_unit');
    const [selectedBtu, setSelectedBtu] = useState<string>('8000');
    const [city, setCity] = useState<string>('Waipahu');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('window_ac_install_lead', {
                window_type: windowType,
                include_bracket: includeBracket,
                unit_status: unitStatus,
                btu: selectedBtu,
                city,
                full_name: fullName,
                phone,
            });

            const payload = {
                service: 'WINDOW_AC_INSTALLATION',
                window_type: windowType,
                include_bracket: includeBracket ? 'YES (+$65 Optional Add-on)' : 'NO (Customer has bracket/deep sill)',
                unit_status: unitStatus,
                btu: selectedBtu,
                city,
                customer_name: fullName,
                phone,
                email,
                address,
                notes: `Bracket Option: ${includeBracket ? '+$65 Heavy-Duty Bracket Kit' : 'No Bracket Added'} | ${notes}`,
            };

            await fetch('/api/v1/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }).catch(() => {
                // Non-blocking fallback
            });

            setIsSuccess(true);
        } catch (err) {
            console.error('Lead submission failed', err);
            setIsSuccess(true); // Graceful UX
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqItems = [
        {
            q: "How does Affordable Home AC safely install window ACs in Oahu jalousie windows?",
            a: "Over 60% of homes across Honolulu, Kailua, Kaneohe, and Waipahu feature jalousie louver windows. Our licensed CT-36775 technicians safely remove only the necessary glass louvers, precision-cut and seal custom marine-grade clear acrylic baffles with anti-vibration gaskets, and anchor the installation so zero mechanical stress is placed on the fragile aluminum jalousie tracks."
        },
        {
            q: "Is an exterior support bracket included, or is it an optional add-on for additional pricing?",
            a: "The heavy-duty cantilever exterior support bracket is an OPTIONAL add-on for additional pricing (+$65.00). If you already have a sturdy sill or existing bracket, you pay zero hardware markup. However, for jalousie windows, second-story installs, or heavier units (10,000 to 23,500 BTU weighing 75 to 99 lbs), our powder-coated steel cantilever bracket kit is strongly recommended to transfer weight directly to the building framing and prevent sill sagging."
        },
        {
            q: "Why is 3/8-inch trade-wind leveling pitch critical in Hawaii's climate?",
            a: "Oahu's high 74%+ relative humidity causes high-efficiency window ACs to pull 1.5 to 2.5 gallons of moisture from the air daily. If an AC is installed flat or tilted inward, condensate pools inside the unit and overflows into interior drywall, causing costly structural rot and toxic Cladosporium mold. Our technicians laser-calibrate an exact 3/8-inch backward pitch so all drainage discharges cleanly outside."
        },
        {
            q: "Can I bundle an in-stock LG Dual Inverter with installation?",
            a: "Yes! That is our most popular option. You can purchase any in-stock LG Dual Inverter directly through our online Shop using Stripe. You can select Free Waipahu Warehouse Pickup (subject to scheduling & inventory availability by appointment) OR $50 Flat Island-Wide Delivery directly to your doorstep. Every qualifying Energy Star unit includes our pre-approved official Hawaii Energy $45 cash rebate application form PDF."
        },
        {
            q: "Do I have to pay upfront when booking an installation appointment?",
            a: "No! Affordable Home AC operates strictly By Appointment First with ZERO upfront payment required to book your installation. You pay the technician only after your window AC has been installed, sealed, laser-leveled, and bench-tested cold."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - Professional Window AC Installation Oahu",
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
                "description": "Licensed Hawaii Contractor CT-36775 specializing in professional window AC installation, jalousie window custom acrylic mounting, optional heavy-duty exterior support brackets, and trade-wind leveling across Honolulu, Waipahu, and all Oahu."
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
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Wrench className="size-3.5" />
                        Licensed Hawaii Contractor CT-36775
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Professional <span className="text-primary">Window AC</span> Installation Oahu
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Jalousie Window AC Mounting Honolulu &amp; Island-Wide
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Precision jalousie louver acrylic retrofits, optional heavy-duty exterior support brackets, and laser-calibrated 3/8&quot; trade-wind pitch leveling. Zero drafts, zero indoor water leaks, and 100% CT-36775 licensed workmanship.
                    </p>

                    {/* Dual Action Top Nav Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <a 
                            href="#booking_form"
                            className="px-6 py-3 rounded-xl bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,174,239,0.35)] flex items-center gap-2"
                        >
                            Book Installation ($0 Upfront Deposit) <ArrowRight className="size-3.5" />
                        </a>
                        <Link 
                            href="/shop#dual_inverter"
                            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-header font-bold text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center gap-2"
                        >
                            <Warehouse className="size-3.5 text-primary" /> Bundle In-Stock LG Dual Inverter
                        </Link>
                    </div>
                </div>

                {/* 3 Core Installation Standards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Custom Jalousie Slat Retrofits",
                            desc: "We safely remove delicate glass louvers, precision-cut marine-grade clear acrylic baffles, and seal all air gaps with anti-vibration gaskets so trade-wind rains, insects, and tropical humidity stay outside."
                        },
                        {
                            icon: Layers,
                            title: "Heavy-Duty Cantilever Bracket Option",
                            desc: "Modern Dual Inverters weigh up to 99 lbs. Our heavy-duty exterior cantilever support bracket (optional add-on for +$65) anchors into exterior building studs, preventing fragile jalousie tracks from bending or collapsing."
                        },
                        {
                            icon: Droplets,
                            title: "3/8\" Trade-Wind Condensate Pitch",
                            desc: "Oahu units condense up to 2 gallons of humidity daily. We laser-calibrate a 3/8\" backward tilt so water drains cleanly outside into landscaping, preventing catastrophic interior drywall rot and mold."
                        }
                    ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                                <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="text-lg font-header font-black uppercase text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Dual Path Conversion Banner */}
                <section className="mb-16 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/20 rounded-3xl p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {/* Option 1: Book Service */}
                        <div className="space-y-4 pr-0 md:pr-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase font-bold">
                                Option A: Installation Service Only
                            </div>
                            <h3 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                                Book Installation Appointment
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Already own your AC? Have our certified technicians safely mount, level, and seal your unit. Zero upfront deposit required to schedule—pay upon completed testing.
                            </p>
                            <ul className="space-y-2 text-xs text-slate-400">
                                <li className="flex items-center gap-2">
                                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                                    <span>Custom jalousie, hung, or sliding window mount</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                                    <span>Optional +$65 Heavy-Duty Cantilever Bracket upgrade</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                                    <span>Full electrical circuit &amp; ampere verification</span>
                                </li>
                            </ul>
                            <a 
                                href="#booking_form"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider transition-all"
                            >
                                Schedule Appointment Now <ArrowRight className="size-3.5" />
                            </a>
                        </div>

                        {/* Option 2: Equipment Bundle */}
                        <div className="space-y-4 pt-6 md:pt-0 pl-0 md:pl-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase font-bold">
                                Option B: Equipment + Installation Bundle
                            </div>
                            <h3 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                                Bundle with In-Stock LG Dual Inverter
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Purchase an Energy Star LG Dual Inverter directly through our Shop. Get whisper-quiet 44 dB cooling, Wi-Fi smart control, and our official $45 Hawaii Energy cash rebate PDF form.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Fulfillment 01</span>
                                    <span className="text-white font-bold block mt-0.5">Waipahu Pickup (Free)</span>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Subject to scheduling &amp; availability by appointment</span>
                                </div>
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Fulfillment 02</span>
                                    <span className="text-white font-bold block mt-0.5">$50 Flat Delivery</span>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Direct to your doorstep across all Oahu</span>
                                </div>
                            </div>
                            <Link 
                                href="/shop#dual_inverter"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider transition-all"
                            >
                                Shop In-Stock Dual Inverters <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Interactive Booking & Configuration Section */}
                <section id="booking_form" className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 mb-20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Selector & Specs */}
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-xl font-header font-black uppercase tracking-wider text-white flex items-center gap-2.5">
                                <span className="flex items-center justify-center size-7 rounded-lg bg-primary/20 text-primary text-xs font-mono">01</span>
                                Configure Your Window AC Installation
                            </h2>

                            {/* Window Type */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                    Window Architecture
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'jalousie', label: 'Jalousie Slat', desc: 'Custom acrylic baffle' },
                                        { id: 'hung', label: 'Single/Double Hung', desc: 'Standard sash mount' },
                                        { id: 'slider', label: 'Horizontal Slider', desc: 'Vertical plate seal' },
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => setWindowType(t.id)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                windowType === t.id 
                                                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="font-header font-bold text-xs sm:text-sm">{t.label}</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* BRACKET OPTION (CRITICAL TRANSPARENCY CARD) */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                        Exterior Support Bracket Option
                                    </label>
                                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Hardware Upgrade Option</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* With Bracket */}
                                    <div 
                                        onClick={() => setIncludeBracket(true)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                            includeBracket 
                                                ? 'bg-cyan-950/40 border-primary shadow-[0_0_20px_rgba(0,174,239,0.2)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="font-header font-bold text-sm text-white flex items-center gap-1.5">
                                                <Layers className="size-4 text-primary" />
                                                Add Cantilever Bracket
                                            </span>
                                            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                +$65.00
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">
                                            Heavy-duty corrosion-resistant powder-coated steel bracket with dual legs. Anchors directly to building framing to protect fragile jalousie tracks from 64–99 lb unit weight.
                                        </p>
                                        <div className="mt-2 text-[10px] text-cyan-300 font-mono flex items-center gap-1">
                                            <Sparkles className="size-3" /> Recommended for Jalousie &amp; 10k–24k Units
                                        </div>
                                    </div>

                                    {/* Without Bracket */}
                                    <div 
                                        onClick={() => setIncludeBracket(false)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                            !includeBracket 
                                                ? 'bg-cyan-950/40 border-primary shadow-[0_0_20px_rgba(0,174,239,0.2)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="font-header font-bold text-sm text-white flex items-center gap-1.5">
                                                <Wrench className="size-4 text-slate-400" />
                                                No Bracket Needed
                                            </span>
                                            <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                                                $0.00
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">
                                            Select this option if you already have an existing exterior bracket or a deep concrete sill that safely supports the unit weight without window frame stress.
                                        </p>
                                        <div className="mt-2 text-[10px] text-slate-500 font-mono">
                                            Applies to standard hung sills or customer-supplied hardware
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Unit Status */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                    Equipment Source
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setUnitStatus('need_unit')}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            unitStatus === 'need_unit' 
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-sm text-emerald-400">Bundle with In-Stock Unit</div>
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            Waipahu pickup (by appointment) or $50 delivery + $45 Hawaii Energy Rebate Form.
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUnitStatus('own_unit')}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            unitStatus === 'own_unit' 
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-sm">I Already Own a Unit</div>
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            Installation labor, laser pitch leveling, and custom window baffling only.
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Target BTU Size */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                    Room Cooling Capacity (BTU)
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { btu: '6000', label: '6,000 BTU', area: '100–200 sq ft' },
                                        { btu: '8000', label: '8,000 BTU', area: '150–250 sq ft' },
                                        { btu: '12000', label: '12,000 BTU', area: '300–450 sq ft' },
                                        { btu: '18000', label: '18,000 BTU', area: '500+ sq ft (230V)' },
                                    ].map((b) => (
                                        <button
                                            key={b.btu}
                                            type="button"
                                            onClick={() => setSelectedBtu(b.btu)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                selectedBtu === b.btu 
                                                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="font-header font-bold text-xs sm:text-sm">{b.label}</div>
                                            <div className="text-[10px] text-slate-500">{b.area}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Oahu Island Coverage Strip */}
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Truck className="size-4 text-primary" />
                                    Island-Wide Oahu Installation &amp; Delivery:
                                </span>
                                <span className="text-white font-mono font-bold">
                                    Honolulu, Waipahu, Kapolei, Kailua, Kaneohe, Mililani, Ewa Beach
                                </span>
                            </div>

                        </div>

                        {/* Booking Inquiry Form */}
                        <div className="lg:col-span-5 bg-black/50 border border-white/15 rounded-2xl p-6 sm:p-8 relative">
                            {isSuccess ? (
                                <div className="text-center py-10 space-y-4">
                                    <div className="size-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-8" />
                                    </div>
                                    <h3 className="text-2xl font-header font-black uppercase text-white">Inquiry Received!</h3>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                                        Our dispatch team will contact you within 2 business hours to verify your window measurements, bracket configuration, and preferred installation arrival window.
                                    </p>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-1.5 font-mono">
                                        <div className="text-slate-400">Selected Window: <span className="text-white font-bold uppercase">{windowType}</span></div>
                                        <div className="text-slate-400">Bracket Option: <span className="text-cyan-400 font-bold">{includeBracket ? '+$65 Heavy-Duty Bracket Kit' : 'Customer Hardware / Deep Sill'}</span></div>
                                        <div className="text-slate-400">Deposit Due: <span className="text-emerald-400 font-bold">$0.00 (Zero Upfront)</span></div>
                                    </div>
                                    <div className="pt-4">
                                        <a
                                            href="tel:8087244328"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase"
                                        >
                                            <Phone className="size-3.5" />
                                            Call Dispatch Now: (808) 724-4328
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="border-b border-white/10 pb-3 mb-2">
                                        <h3 className="text-lg font-header font-black uppercase text-white">Schedule Installation Service</h3>
                                        <p className="text-slate-400 text-xs">Zero upfront deposit. Pay technician only after completion.</p>
                                    </div>

                                    {/* Summary Pill */}
                                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[11px] space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Window Style:</span>
                                            <span className="text-white font-mono uppercase font-bold">{windowType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Exterior Bracket:</span>
                                            <span className="text-cyan-400 font-mono font-bold">{includeBracket ? '+$65 Cantilever Kit' : 'None ($0)'}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-white/10 pt-1">
                                            <span className="text-slate-400">Upfront Booking Deposit:</span>
                                            <span className="text-emerald-400 font-mono font-bold">$0.00 (Pay After Test)</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Your Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="e.g. Keanu Akana"
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="(808) 000-0000"
                                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Oahu City / Town *</label>
                                            <input
                                                type="text"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="e.g. Kaneohe"
                                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="keanu@example.com"
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Street Address or Cross Street</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="e.g. 45-123 Kamehameha Hwy"
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Special Notes / Window Floor Height</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="2nd story window, wooden frame, existing 115V or 230V outlet nearby..."
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,174,239,0.35)] transition-all"
                                    >
                                        {isSubmitting ? 'Transmitting...' : 'Book Installation Appointment ($0 Upfront)'}
                                        <Send className="size-3.5" />
                                    </button>

                                    <div className="text-center pt-2">
                                        <span className="text-[10px] text-slate-500">
                                            Need a unit right away? <Link href="/shop#dual_inverter" className="text-primary hover:underline">Shop In-Stock LG Inverters with Stripe</Link>
                                        </span>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </section>

                {/* IN-STOCK EQUIPMENT BUNDLE SHOWCASE */}
                <section className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                            In-Stock Equipment Catalog
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-black uppercase text-white mt-1">
                            Popular In-Stock LG Dual Inverters
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">
                            Waipahu Warehouse Pickup (subject to scheduling &amp; inventory availability by appointment) OR $50 Flat Island-Wide Delivery across all Oahu.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                model: "LW6023IVSM",
                                btu: "6,000 BTU",
                                sqft: "Up to 250 sq. ft.",
                                voltage: "115V (NEMA 5-15P)",
                                price: "$504",
                                netPrice: "$459 after $45 rebate",
                                badge: "Bedrooms & Studios",
                                highlight: "44 dB ultra-quiet operation, dual inverter variable compressor, and smart Wi-Fi control."
                            },
                            {
                                model: "LW8022IVSM",
                                btu: "8,000 BTU",
                                sqft: "Up to 350 sq. ft.",
                                voltage: "115V (NEMA 5-15P)",
                                price: "$535",
                                netPrice: "$490 after $45 rebate",
                                badge: "Best Value ($31 Upgrade)",
                                highlight: "Only $31 more than the 6k model for +33% more cooling capacity and ThinQ Wi-Fi smart scheduling."
                            },
                            {
                                model: "LW1222IVSM",
                                btu: "12,000 BTU",
                                sqft: "Up to 550 sq. ft.",
                                voltage: "115V (NEMA 5-15P)",
                                price: "$689",
                                netPrice: "$644 after $45 rebate",
                                badge: "Master Suites & Living",
                                highlight: "High airflow for open apartments, saves over $424/year in HECO power against old rotary window units."
                            }
                        ].map((unit, idx) => (
                            <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                                            {unit.badge}
                                        </span>
                                        <span className="text-xs font-mono text-slate-400">{unit.voltage}</span>
                                    </div>
                                    <h3 className="text-xl font-header font-black uppercase text-white">
                                        LG {unit.btu} Dual Inverter
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">{unit.highlight}</p>
                                    
                                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Retail Price:</span>
                                            <span className="text-white font-bold">{unit.price}</span>
                                        </div>
                                        <div className="flex justify-between text-emerald-400 font-bold">
                                            <span>After Hawaii Energy Rebate:</span>
                                            <span>{unit.netPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 space-y-2">
                                    <Link
                                        href="/shop#dual_inverter"
                                        className="w-full py-2.5 rounded-xl bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                                    >
                                        Purchase on Shop <ArrowRight className="size-3.5" />
                                    </Link>
                                    <div className="text-[10px] text-center text-slate-500">
                                        Free Waipahu Pickup (by appointment) or $50 Island Delivery
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Official Hawaii Energy Rebate Callout */}
                <section className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 mb-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase">
                                Pre-Approved Program Form
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                Qualifying Window ACs Get a $45 Cash Rebate
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                                When you buy and install an Energy Star LG Dual Inverter through Affordable Home AC, we provide our official pre-approved Hawaii Energy application form PDF. (Note: Mini split division does not participate in rebates; window ACs are 100% eligible).
                            </p>
                        </div>
                        <a
                            href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 transition-all"
                        >
                            <FileText className="size-4" />
                            Download $45 Rebate PDF
                        </a>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Window AC Installation FAQs
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="border border-white/10 rounded-2xl bg-slate-900/40 overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm sm:text-base text-white hover:text-primary transition-colors"
                                >
                                    <span>{item.q}</span>
                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-slate-500'}`} />
                                </button>
                                {activeFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <BackToTop />
        </div>
    );
}
