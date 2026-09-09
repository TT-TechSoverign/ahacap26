'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Sparkles, 
    Wrench, 
    ShieldCheck, 
    Clock, 
    Phone, 
    CheckCircle2, 
    ChevronRight, 
    Snowflake, 
    Zap, 
    HelpCircle, 
    Layers, 
    Gauge, 
    Home, 
    Building2, 
    FileText, 
    Check, 
    PhoneCall, 
    Info, 
    AlertCircle,
    SlidersHorizontal,
    ArrowRight
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function DuctlessMiniSplitInstallationOahuPage() {
    const [zones, setZones] = useState<string>('2_zone');
    const [homeType, setHomeType] = useState<string>('single_family');
    const [panelService, setPanelService] = useState<string>('unsure');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Form inputs
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [neighborhood, setNeighborhood] = useState('Honolulu');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const pricingTiers = [
        {
            id: '1_zone',
            name: '1-Zone Primary Room',
            idealFor: 'Master Bedroom, Studio, or Detached ADU / Lanai',
            pricingStatus: 'Subject to On-Site Estimate',
            zones: '1 Indoor Head + 1 Inverter Condenser',
            electrical: 'Single 15A or 20A dedicated circuit (115V or 230V)',
            popular: false
        },
        {
            id: '2_zone',
            name: '2-Zone Split Comfort',
            idealFor: 'Main Living Area + Primary Master Bedroom',
            pricingStatus: 'Subject to On-Site Estimate',
            zones: '2 Indoor Heads + 1 Multi-Zone Condenser',
            electrical: 'Dedicated 20A–25A 230V circuit',
            popular: true
        },
        {
            id: '3_zone',
            name: '3-Zone Whole-Home',
            idealFor: 'Living Room + Master Suite + 2nd Bedroom / Office',
            pricingStatus: 'Subject to On-Site Estimate',
            zones: '3 Indoor Heads + 1 High-Efficiency Multi-Condenser',
            electrical: 'Dedicated 30A 230V circuit',
            popular: false
        },
        {
            id: '4_zone',
            name: '4-Zone Multi-Level',
            idealFor: 'Full 3-4 Bedroom Oahu Residence or Two-Story Home',
            pricingStatus: 'Subject to On-Site Estimate',
            zones: '4 Indoor Heads + Dual Condensers or Titan Multi-Port',
            electrical: 'Dedicated 35A–45A 230V circuit',
            popular: false
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('mini_split_installation_lead', {
                zones,
                home_type: homeType,
                panel_service: panelService,
                neighborhood,
                full_name: fullName,
                phone
            });

            const nameParts = fullName.trim().split(/\s+/);
            const firstName = nameParts[0] || 'Customer';
            const lastName = nameParts.slice(1).join(' ') || 'Oahu';

            const payload = {
                first_name: firstName,
                last_name: lastName,
                email: email.trim() || 'inquiry@affordablehome-ac.com',
                phone: phone.trim(),
                address: address.trim() || 'Oahu, HI',
                city: neighborhood.trim() || 'Honolulu',
                zip: '',
                service_type: 'Mini Split Installation Estimate',
                urgency: 'flexible',
                notes: `Zones Requested: ${zones.toUpperCase()} | Home Type: ${homeType.toUpperCase()} | Electrical Panel: ${panelService.toUpperCase()} | Customer Notes: ${notes.trim() || 'None'}`
            };

            const res = await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                console.warn('Mini-split estimate submission non-200 status', res.status);
            }
            setIsSuccess(true);
        } catch (err) {
            console.error('Mini-split estimate submission error', err);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqItems = [
        {
            q: "Does Hawaii Energy offer rebates for residential ductless mini-split systems?",
            a: "No. Hawaii Energy currently offers 0% cash rebates on residential ductless mini-split systems (rebates are reserved for heat pump water heaters and window ACs). Some contractors dishonestly inflate their initial quotes by thousands of dollars and pretend to give you an exclusive 'discount'. At Affordable Home AC, we provide honest direct-to-consumer contractor pricing with zero markups or phony rebate gimmicks."
        },
        {
            q: "Will my older Oahu home need an expensive electrical panel upgrade for mini-splits?",
            a: "In most cases, NO. Many Oahu homes in older neighborhoods like Waipahu, Kaimuki, and Kalihi have 60-Amp or 100-Amp main electrical panels. Because modern inverter compressors ramp up smoothly without high inrush startup amps, a 1-zone or 2-zone mini-split system often pulls only 8 to 15 Amps of running current. Our licensed technicians conduct a free electrical panel capacity and load calculation during your site assessment to verify compatibility."
        },
        {
            q: "What brands of ductless mini-splits do you install?",
            a: "We install top-tier marine-grade ductless systems engineered for Hawaii's coastal climate, including Mitsubishi Electric (Hyper-Heating & Diamond certified systems), Daikin, Fujitsu, and Carrier. All outdoor units are treated with anti-corrosive coil coatings to resist Pacific salt air breakdown."
        },
        {
            q: "How does the mini-split installation estimate process work?",
            a: "Because every home's copper line run length, electrical panel capacity, and mounting locations differ, all mini-split installations are subject to a free on-site estimate. Our Hawaii Licensed HVAC technicians (CT-36775) survey your property, perform a complimentary electrical panel load audit, map architectural line-hide routing, and provide a clear, guaranteed fixed-price proposal with zero upfront deposit."
        },
        {
            q: "Can I install mini-splits in an Oahu condominium or townhouse?",
            a: "Yes, provided your HOA or Association of Apartment Owners (AOAO) permits exterior penetrations or balcony condenser placement. We have extensive experience preparing architectural review packets, acoustic decibel specs, and engineering drawings for Oahu condo boards across Kakaako, Ala Moana, Salt Lake, and Hawaii Kai."
        },
        {
            q: "How long does the installation take?",
            a: "A typical 1-zone or 2-zone installation is completed in a single working day (6 to 8 hours). Larger 3-zone or 4-zone whole-home systems typically take 1.5 to 2 days with minimal disruption to your daily routine."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": "https://www.affordablehome-ac.com/ductless-mini-split-installation-oahu#service",
                "name": "Ductless Mini-Split Installation Oahu",
                "provider": {
                    "@type": "HVACContractor",
                    "name": "Affordable Home AC",
                    "telephone": "+1-808-488-1111",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "94-150 Leoleo St. #203",
                        "addressLocality": "Waipahu",
                        "addressRegion": "HI",
                        "postalCode": "96797",
                        "addressCountry": "US"
                    }
                },
                "areaServed": {
                    "@type": "State",
                    "name": "Hawaii"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "135",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Oahu Ductless Mini-Split Installation Packages",
                    "itemListElement": pricingTiers.map(tier => ({
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": tier.name,
                            "description": tier.idealFor
                        },
                        "price": tier.pricingStatus
                    }))
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                    { "@type": "ListItem", "position": 2, "name": "Mini-Split Installation Oahu", "item": "https://www.affordablehome-ac.com/ductless-mini-split-installation-oahu" }
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
        <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 pt-[140px] md:pt-[165px]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            {/* Breadcrumb Navigation */}
            <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-xs text-slate-400">
                    <nav className="flex items-center space-x-2">
                        <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        <Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        <span className="text-cyan-400 font-medium">Ductless Mini-Split Installation Oahu</span>
                    </nav>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            License CT-36775
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-14 md:py-20 px-4 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs md:text-sm font-semibold mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Honest Contractor Workmanship • $0 Upfront Deposit Estimate</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-[1.15]">
                        Ductless Mini-Split Installation Oahu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                            Custom Multi-Zone Sizing, On-Site Estimates & Turnkey Engineering
                        </span>
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Say goodbye to noisy window units and high electricity bills. 
                        Affordable Home AC delivers marine-grade, whisper-quiet ductless heat pump systems engineered specifically for Oahu's trade winds and salt air.
                    </p>

                    {/* Trust Pillar Highlights */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                            <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Pricing</div>
                            <div className="text-white font-extrabold text-sm md:text-base mt-1">Subject to Estimate</div>
                            <div className="text-slate-400 text-xs mt-0.5">Free on-site quote</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                            <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Electric Panel</div>
                            <div className="text-white font-extrabold text-sm md:text-base mt-1">Free Load Audit</div>
                            <div className="text-slate-400 text-xs mt-0.5">60A / 100A / 200A</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">Rebates</div>
                            <div className="text-white font-extrabold text-sm md:text-base mt-1">0% Rebate Reality</div>
                            <div className="text-slate-400 text-xs mt-0.5">No inflated gimmicks</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                            <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Warranty</div>
                            <div className="text-white font-extrabold text-sm md:text-base mt-1">10–12 Year Parts</div>
                            <div className="text-slate-400 text-xs mt-0.5">Gold Fin protection</div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#estimate-wizard"
                            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-sm transition-all duration-200 shadow-xl shadow-cyan-500/20"
                        >
                            Request $0 Upfront On-Site Estimate
                        </a>
                        <a
                            href="tel:808-488-1111"
                            className="w-full sm:w-auto px-7 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Phone className="w-4 h-4 text-cyan-400" />
                            <span>(808) 488-1111</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Turnkey Multi-Zone Pricing Guide Section */}
            <section className="py-16 px-4 border-b border-slate-800 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span>Zoned System Architecture</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">
                            Oahu Ductless Mini-Split Configuration &amp; Sizing Options
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base mt-2">
                            Every Oahu home is unique—copper line run distance, electrical panel load capacity, and exterior mounting requirements determine exact project needs. All installations are <strong className="text-white">subject to a free on-site estimate</strong> with $0 upfront deposit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingTiers.map(tier => (
                            <div
                                key={tier.id}
                                className={`flex flex-col rounded-2xl bg-slate-900/90 border p-6 relative transition-all duration-300 shadow-xl ${
                                    tier.popular
                                        ? 'border-cyan-500 shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                                        : 'border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                {tier.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                                        Most Popular on Oahu
                                    </span>
                                )}

                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                                    <p className="text-xs text-slate-400 min-h-[32px]">{tier.idealFor}</p>
                                </div>

                                <div className="my-5 py-4 border-t border-b border-slate-800">
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Installation Pricing</div>
                                    <div className="text-lg font-black text-cyan-400 mt-1">
                                        {tier.pricingStatus}
                                    </div>
                                    <div className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                        <span>Free On-Site Survey ($0 Deposit)</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-xs text-slate-300 flex-1">
                                    <div>
                                        <span className="text-slate-500 block font-semibold">Configuration:</span>
                                        <span className="font-medium text-white">{tier.zones}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block font-semibold">Electrical Requirement:</span>
                                        <span className="font-medium text-white">{tier.electrical}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setZones(tier.id);
                                        const el = document.getElementById('estimate-wizard');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                        tier.popular
                                            ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold'
                                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                                    }`}
                                >
                                    <span>Request Free Estimate</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* What Turnkey Includes Checklist */}
                    <div className="mt-12 p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
                        <h4 className="text-base md:text-lg font-bold text-white flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-cyan-400" />
                            <span>Every Affordable Home AC Turnkey Installation Includes:</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs text-slate-300">
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>High-SEER Inverter outdoor condenser with marine-grade coil protection</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>Whisper-quiet indoor wall units with multi-stage air filtration</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>Heavy-duty vibration-dampening rubber ground risers or stainless wall brackets</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>Architectural UV-resistant SlimDuct line covers painted/matched to your home</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>Outdoor electrical disconnect switch & whole-system surge protector</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>500 PSI Nitrogen pressure test & deep vacuum evacuation to under 500 microns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Oahu Electrical Panel Reality Check & Rebate Truth */}
            <section className="py-14 px-4 bg-slate-950 border-b border-slate-800">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Panel Capacity Reality */}
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            Oahu Electrical Panels: 60A, 100A, or 200A?
                        </h3>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                            Many older plantation homes in Waipahu, Kalihi, Kaimuki, and Kailua operate on 60-Amp or 100-Amp electrical service. 
                            Other contractors will quickly insist on an expensive $4,000+ panel upgrade.
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                            Because modern DC inverter compressors lack brutal startup spikes and ramp up gently, a 1-zone or 2-zone mini-split system only draws 8–15 Amps. 
                            We calculate your panel's exact continuous capacity during your free site survey to keep your project affordable.
                        </p>
                        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-300 text-xs font-medium">
                            ★ Free continuous electrical load calculation included during on-site survey.
                        </div>
                    </div>

                    {/* Rebate Honesty */}
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Info className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            The Hawaii Energy 0% Rebate Fact Check
                        </h3>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                            Be aware of HVAC contractors who advertise "$2,000 instant mini-split energy rebates." 
                            Hawaii Energy currently offers <strong className="text-white">0% cash rebates</strong> for residential ductless mini-split systems.
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                            Instead of inflating our prices by thousands just to offer a fake "discount," Affordable Home AC passes along direct wholesale equipment pricing and honest Hawaii contractor rates.
                        </p>
                        <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
                            ★ Need instant cash rebates? Our qualifying Energy Star Window AC units come with a $45 Hawaii Energy cash rebate.
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive $0 Upfront Estimate Intake Wizard */}
            <section id="estimate-wizard" className="py-16 px-4 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950 border-b border-slate-800">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>100% Free • $0 Upfront Deposit</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            Request Your Turnkey Mini-Split On-Site Estimate
                        </h2>
                        <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl mx-auto">
                            Our licensed technicians will assess your room square footage, sun exposure, line hide routing, 
                            and electrical panel to deliver a guaranteed fixed-price proposal.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 md:p-12 rounded-3xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-4 shadow-2xl">
                            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500 text-cyan-400 flex items-center justify-center mx-auto">
                                <Check className="w-8 h-8 stroke-[3]" />
                            </div>
                            <h3 className="text-2xl font-black text-white">Estimate Request Received!</h3>
                            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                                Thank you, <strong className="text-white">{fullName || 'Neighbor'}</strong>. Our Oahu estimating team will call you at <strong className="text-cyan-400">{phone}</strong> within 1 business day to confirm your convenient on-site walk-through window.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="tel:808-488-1111"
                                    className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm"
                                >
                                    Call Direct: (808) 488-1111
                                </a>
                                <Link
                                    href="/window-ac-vs-mini-split-oahu"
                                    className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl text-sm hover:bg-slate-700"
                                >
                                    Compare Window AC vs Mini-Split
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8"
                        >
                            {/* Step 1: Zones Selection */}
                            <div className="space-y-3">
                                <label className="text-xs uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1.5">
                                    <span>Step 1: How Many Zones / Rooms Need Cooling?</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { id: '1_zone', label: '1 Zone (Studio/Master)' },
                                        { id: '2_zone', label: '2 Zones (Living + Bed)' },
                                        { id: '3_zone', label: '3 Zones (Whole Home)' },
                                        { id: '4_zone', label: '4+ Zones (Multi-Story)' }
                                    ].map(item => (
                                        <button
                                            type="button"
                                            key={item.id}
                                            onClick={() => setZones(item.id)}
                                            className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                                                zones === item.id
                                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Home Type */}
                            <div className="space-y-3">
                                <label className="text-xs uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1.5">
                                    <span>Step 2: Property Type on Oahu</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { id: 'single_family', label: 'Single-Family Home' },
                                        { id: 'townhome', label: 'Townhome / CPR' },
                                        { id: 'condo', label: 'Condo / High-Rise' },
                                        { id: 'adu', label: 'ADU / Ohana / Lanai' }
                                    ].map(item => (
                                        <button
                                            type="button"
                                            key={item.id}
                                            onClick={() => setHomeType(item.id)}
                                            className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                                                homeType === item.id
                                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Electrical Panel */}
                            <div className="space-y-3">
                                <label className="text-xs uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1.5">
                                    <span>Step 3: Approximate Electrical Panel Rating</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { id: '100a', label: '100 Amp' },
                                        { id: '200a', label: '200 Amp Modern' },
                                        { id: '60a', label: '60 Amp Older' },
                                        { id: 'unsure', label: 'Not Sure (Audit for Me)' }
                                    ].map(item => (
                                        <button
                                            type="button"
                                            key={item.id}
                                            onClick={() => setPanelService(item.id)}
                                            className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                                                panelService === item.id
                                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 4: Contact & Location */}
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                                    Step 4: Contact Information & Location
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-300 block mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)}
                                            placeholder="e.g. Keanu Akana"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-slate-300 block mb-1">Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            placeholder="e.g. (808) 555-0199"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-300 block mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="e.g. keanu@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-slate-300 block mb-1">Oahu Neighborhood / City *</label>
                                        <select
                                            value={neighborhood}
                                            onChange={e => setNeighborhood(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none"
                                        >
                                            {['Honolulu', 'Waipahu', 'Pearl City', 'Kapolei', 'Ewa Beach', 'Mililani', 'Kailua', 'Kaneohe', 'Aiea', 'Hawaii Kai', 'Kaimuki', 'Manoa', 'North Shore'].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-slate-300 block mb-1">Street Address (Optional for preliminary quote)</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="e.g. 94-123 Farrington Hwy"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-slate-300 block mb-1">Project Details or Specific Questions</label>
                                    <textarea
                                        rows={3}
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                        placeholder="e.g. Looking to cool primary bedroom and living room. High ceilings in living area."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.99] text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <span>Transmitting Request...</span>
                                ) : (
                                    <>
                                        <span>Submit Free Estimate Request ($0 Upfront)</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-[11px] text-slate-500">
                                Zero obligation. No payment required. Your information is strictly held confidential and never shared.
                            </p>
                        </form>
                    )}
                </div>
            </section>

            {/* Need Cooling Today? Window AC Alternative Gateway */}
            <section className="py-12 px-4 bg-slate-900/50 border-b border-slate-800">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-900 border border-emerald-500/30">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Immediate Heat Relief
                        </span>
                        <h3 className="text-xl font-bold text-white">Need Cooling Tonight Instead of a Multi-Day Project?</h3>
                        <p className="text-xs text-slate-300 max-w-xl">
                            If you need fast cooling on a budget without running high-voltage wiring, check our locally warehoused LG Dual Inverter window air conditioners. Available for same-day Waipahu pickup by appointment or $50 delivery.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <Link
                            href="/shop/oahu-window-ac-warehouse"
                            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all text-center"
                        >
                            Explore Warehouse Stock
                        </Link>
                        <Link
                            href="/window-ac-vs-mini-split-oahu"
                            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors text-center"
                        >
                            Compare Financials
                        </Link>
                    </div>
                </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="py-16 px-4 bg-slate-950">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium uppercase tracking-wider mb-2">
                            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                            Oahu Ductless Mini-Split Installation Guidance
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqItems.map((faq, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
                            >
                                <h3 className="text-base md:text-lg font-bold text-white flex items-start gap-3">
                                    <span className="text-cyan-400 font-mono font-black text-sm mt-0.5">0{idx + 1}.</span>
                                    <span>{faq.q}</span>
                                </h3>
                                <p className="mt-3 text-sm text-slate-300 leading-relaxed pl-7">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BackToTop />
        </main>
    );
}
