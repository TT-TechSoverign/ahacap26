'use client';

import { useState, useEffect } from 'react';
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
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { useCart } from '@/context/CartContext';
import { useLiveInventorySummary } from '@/lib/use-live-inventory';
import { ShoppingCart } from 'lucide-react';
import { trackFunnelEvent } from '@/lib/tracking';

import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

export default function WindowAcInstallationPage() {
    const { addToCart, openCart } = useCart();
    const { products: liveProducts } = useLiveInventorySummary();
    const [windowType, setWindowType] = useState<string>('jalousie');
    const [includeBracket, setIncludeBracket] = useState<boolean>(true);
    const [unitStatus, setUnitStatus] = useState<string>('need_unit');
    const [selectedBtu, setSelectedBtu] = useState<string>('8000');
    const [city, setCity] = useState<string>('Waipahu');
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const cityParam = params.get('city');
        const btuParam = params.get('btu');
        const windowParam = params.get('window');
        const unitParam = params.get('unit');
        const notesParam = params.get('notes');
        if (cityParam) setCity(cityParam);
        if (btuParam && ['6000', '8000', '10000', '12000', '14000', '18000', '24000'].includes(btuParam)) {
            setSelectedBtu(btuParam);
        }
        if (windowParam && ['jalousie', 'hung', 'slider'].includes(windowParam)) {
            setWindowType(windowParam);
        }
        if (unitParam === 'already_own' || unitParam === 'purchased') {
            setUnitStatus('already_own');
        } else if (unitParam === 'need_unit') {
            setUnitStatus('need_unit');
        }
        if (notesParam) setNotes(notesParam);
    }, []);

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
            });
            trackFunnelEvent('generate_lead', {
                currency: 'USD',
                value: 0,
                lead_type: 'window_ac_installation',
                form_name: 'window_ac_installation_form',
                window_type: windowType,
                btu: selectedBtu,
                city,
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
                service_type: 'Window AC Installation',
                urgency: 'standard',
                notes: `Window Style: ${windowType.toUpperCase()} | Bracket: ${includeBracket ? 'Cantilever Bracket Requested (Tech Assessed)' : 'Standard Sill Mount (No Bracket Needed)'} | Equipment: ${unitStatus === 'need_unit' ? `Bundle In-Stock LG Unit (${selectedBtu} BTU)` : 'Customer Already Owns Unit'} | Notes: ${notes.trim() || 'None'}`
            };

            const res = await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let errDetail = 'Unable to submit right now. Please check your phone number or call dispatch at (808) 488-1111.';
                try {
                    const errBody = await res.json();
                    if (typeof errBody?.detail === 'string') errDetail = errBody.detail;
                } catch {
                    // Fallback message
                }
                setSubmitError(errDetail);
                return;
            }

            setSubmitError(null);
            setIsSuccess(true);
        } catch (err) {
            console.error('Lead submission network error', err);
            setSubmitError('Connection interrupted. Please retry or call Waipahu dispatch directly at (808) 488-1111.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqItems = [
        {
            q: "How does Affordable Home AC safely install window ACs in Oahu jalousie windows?",
            a: "Over 60% of homes across Honolulu, Kailua, Kaneohe, and Waipahu feature jalousie louver windows. Our specialist technicians safely remove only the necessary glass louvers, precision-cut and seal custom marine-grade clear acrylic baffles with anti-vibration gaskets, and anchor the installation so zero mechanical stress is placed on the fragile aluminum jalousie tracks."
        },
        {
            q: "Is an exterior support bracket included with window AC installation?",
            a: "Our technicians inspect your window sill and wall framing during your initial consultation. If you have a sturdy concrete or wood sill, no exterior bracket is needed. For jalousie windows, second-story mounts, or heavier units (10,000 to 23,500 BTU weighing 75 to 99 lbs), our technician will evaluate and install the appropriate heavy-duty cantilever support bracket to protect your home's structural framing."
        },
        {
            q: "Why is 3/8-inch trade-wind leveling pitch critical in Hawaii's climate?",
            a: "Oahu's high 74%+ relative humidity causes high-efficiency window ACs to pull 1.5 to 2.5 gallons of moisture from the air daily. If an AC is installed flat or tilted inward, condensate pools inside the unit and overflows into interior drywall, causing costly structural rot and toxic Cladosporium mold. Our technicians laser-calibrate an exact 3/8-inch backward pitch so all drainage discharges cleanly outside."
        },
        {
            q: "Can I bundle an in-stock LG Dual Inverter & GE Built-In with installation?",
            a: "Yes! That is our most popular option. You can purchase any in-stock LG Dual Inverter & GE Built-In directly through our online Shop using Stripe. You can select Free Waipahu Warehouse Pickup (subject to scheduling & inventory availability by appointment) OR $50 Flat Island-Wide Delivery directly to your doorstep. Every qualifying Energy Star unit includes our pre-approved official Hawaii Energy $45 cash rebate application form PDF."
        },
        {
            q: "Do I have to pay upfront when booking an installation appointment?",
            a: "No! Affordable Home AC operates strictly By Appointment First with ZERO upfront payment required to book your installation. You pay the technician only after your window AC has been installed, sealed, laser-leveled, and field-tested cold."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": "https://www.affordablehome-ac.com/window-ac-installation#service",
                "url": "https://www.affordablehome-ac.com/window-ac-installation",
                "image": [
                    "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                    "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                    "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                    "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                ],
                "name": "Professional Window AC Installation Oahu",
                "serviceType": "Window AC & Jalousie Installation",
                "provider": {
                    "@type": "HVACBusiness",
                    "@id": "https://www.affordablehome-ac.com/window-ac-installation#localbusiness",
        "parentOrganization": { "@id": "https://www.affordablehome-ac.com/#hvacbusiness" },
                    "name": "Affordable Home A/C",
                    "image": [
                        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                    ],
                    "telephone": "+1-808-488-1111",
                    "priceRange": "$395 - $1,200",
                    "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": "142",
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "review": [
                        {
                            "@type": "Review",
                            "author": { "@type": "Person", "name": "Kimo M. — Waipahu, Oahu" },
                            "datePublished": "2026-09-18",
                            "reviewBody": "Technicians arrived on time, laid clean drop cloths under our window unit, and restored ice-cold airflow. Honest pricing and aloha service!",
                            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                        },
                        {
                            "@type": "Review",
                            "author": { "@type": "Person", "name": "Leilani K. — Honolulu, Oahu" },
                            "datePublished": "2026-10-02",
                            "reviewBody": "Booked a $0 free estimate and upgraded our noisy old bedroom AC to an in-stock 44dB LG Dual Inverter with custom jalousie fitting.",
                            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                        },
                        {
                            "@type": "Review",
                            "author": { "@type": "Person", "name": "David C. — Pearl City, Oahu" },
                            "datePublished": "2026-10-14",
                            "reviewBody": "Fast Waipahu warehouse pickup and expert Oahu window AC support. Qualified for the $45 Hawaii Energy rebate and cut our HECO bill immediately.",
                            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                        }
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "94-150 Leoleo St. #203",
                        "addressLocality": "Waipahu",
                        "addressRegion": "HI",
                        "postalCode": "96797",
                        "addressCountry": "US"
                    }
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Insured Oahu cooling specialists providing professional window AC installation, custom jalousie acrylic baffle retrofits, cantilever exterior support brackets, and 26-inch wall sleeve installations ($0 Free In-Home Estimate) across Honolulu, Waipahu, and all Oahu.",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Oahu Window AC Installation & In-Stock Replacements",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "$0 Free In-Home Window AC Installation & Fit Estimate (By Appointment First)"
                            },
                            "price": "0.00",
                            "priceCurrency": "USD"
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Waipahu Warehouse Direct LG & GE Window AC Replacement Supply ($395–$1,200)",
                                "description": "Factory-sealed LG Dual Inverter & GE 26-inch Built-In Window ACs in stock in Waipahu for free pickup by appointment, $50 Oahu delivery, or custom installation."
                            },
                            "priceSpecification": {
                                "@type": "PriceSpecification",
                                "minPrice": "395.00",
                                "maxPrice": "1200.00",
                                "priceCurrency": "USD"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                    { "@type": "ListItem", "position": 2, "name": "Window AC Installation Oahu", "item": "https://www.affordablehome-ac.com/window-ac-installation" }
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
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Wrench className="size-3.5" />
                        Insured Oahu Window AC Specialists
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Professional <span className="text-primary">Window AC</span> Installation Oahu
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Jalousie Window AC Mounting Honolulu &amp; Island-Wide
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Precision jalousie louver acrylic retrofits, cantilever exterior support bracket mounting, and laser-calibrated 3/8&quot; trade-wind pitch leveling. Complimentary window structural assessment and zero upfront deposit backed by insured local workmanship.
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
                            href="/shop"
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
                            title: "Cantilever Support Bracket",
                            desc: "Modern Dual Inverters weigh up to 99 lbs. Our heavy-duty exterior cantilever support bracket anchors directly into exterior building studs, preventing fragile jalousie tracks from bending or collapsing."
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
                                    <span>Custom jalousie, hung, or sliding window mount with acrylic baffle</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                                    <span>Cantilever exterior support bracket (assessed on-site by technician)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                                    <span>Complimentary window sizing &amp; electrical circuit verification</span>
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
                                href="/shop"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider transition-all"
                            >
                                Shop In-Stock Dual Inverters <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Interactive Booking & Configuration Section */}
                <section id="booking_form" className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 mb-20 backdrop-blur-xl shadow-2xl relative overflow-hidden scroll-mt-28 md:scroll-mt-[192px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Selector & Specs */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-4 text-xs text-slate-300">
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck className="size-5 text-cyan-400 shrink-0" />
                                    <span>
                                        <strong>Honest Oahu Workmanship:</strong> Every installation is performed by our experienced Oahu window AC team. Your technician verifies your window measurements, electrical circuit, and bracket fit before beginning—with <strong>$0 upfront deposit</strong>.
                                    </span>
                                </div>
                                <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-400 uppercase font-bold bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 whitespace-nowrap">
                                    Upfront Estimates
                                </span>
                            </div>

                            <h2 className="text-xl font-header font-black uppercase tracking-wider text-white flex items-center gap-2.5">
                                <span className="flex items-center justify-center size-7 rounded-lg bg-primary/20 text-primary text-xs font-mono">01</span>
                                Configure Your Window AC Installation
                            </h2>

                            {/* Window Type */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                        Window Architecture
                                    </label>
                                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Custom Precision Fit</span>
                                </div>
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

                            {/* BRACKET OPTION */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                        Exterior Support Bracket Option
                                    </label>
                                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Complimentary Sizing</span>
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
                                                Cantilever Support Bracket
                                            </span>
                                            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                                                Recommended for Jalousie
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">
                                            Heavy-duty corrosion-resistant powder-coated steel bracket with dual legs. Anchors directly into building studs to protect fragile jalousie tracks from 64–99 lb unit weight. Technician will inspect structural fit on-site.
                                        </p>
                                        <div className="mt-2 text-[10px] text-cyan-300 font-mono flex items-center gap-1">
                                            <Sparkles className="size-3" /> Recommended for Jalousie &amp; 10k–24k Units &bull; Assessed on-site
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
                                                Standard Sill / Existing Hardware
                                            </span>
                                            <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                                                No Bracket Needed
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">
                                            Select this option if you already have an existing exterior bracket or a deep concrete/wood sill that safely supports the unit weight without window frame stress.
                                        </p>
                                        <div className="mt-2 text-[10px] text-slate-500 font-mono">
                                            Applies to standard hung sills or customer hardware
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Unit Status */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                        Equipment Source
                                    </label>
                                </div>
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
                                            Installation labor, laser pitch leveling, and custom window baffling retrofit.
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
                                        <div className="text-slate-400">Mounting Hardware: <span className="text-cyan-400 font-bold">{includeBracket ? 'Cantilever Bracket (Tech Assessed)' : 'Standard Sill Mount'}</span></div>
                                        <div className="text-slate-400">Consultation: <span className="text-emerald-400 font-bold">Free Structural Assessment</span></div>
                                        <div className="text-slate-400">Deposit Due: <span className="text-emerald-400 font-bold">$0.00 (Zero Upfront)</span></div>
                                    </div>
                                    <div className="pt-4">
                                        <a
                                            href="tel:808-488-1111"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase"
                                        >
                                            <Phone className="size-3.5" />
                                            Call Dispatch Now: (808) 488-1111
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="border-b border-white/10 pb-3 mb-2">
                                        <h3 className="text-lg font-header font-black uppercase text-white">Schedule Installation Service</h3>
                                        <p className="text-slate-400 text-xs">Zero upfront deposit. Pay technician only after completion &amp; cold-air test.</p>
                                    </div>

                                    {/* Summary Pill */}
                                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[11px] space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Window Style:</span>
                                            <span className="text-white font-mono uppercase font-bold">{windowType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Mounting Hardware:</span>
                                            <span className="text-cyan-400 font-mono font-bold">{includeBracket ? 'Cantilever Bracket' : 'Standard Sill Mount'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Workmanship:</span>
                                            <span className="text-cyan-300 font-mono font-bold">Insured Oahu Specialists</span>
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

                                    {submitError && (
                                        <div role="alert" className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs leading-relaxed">
                                            {submitError}{' '}
                                            <a href="tel:8084881111" className="underline font-bold text-white">Call (808) 488-1111</a>
                                        </div>
                                    )}

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
                                            Need a unit right away? <Link href="/shop" className="text-primary hover:underline">Shop In-Stock LG Inverters with Stripe</Link>
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
                            Waipahu Warehouse Pickup (subject to scheduling &amp; inventory availability by appointment) OR $50 Flat Oahu Residential Delivery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                id: 1,
                                model: "LW6023IVSM",
                                slug: "1-lg-dual-inverter-6-000-btu-lw6023ivsm",
                                btu: "6,000 BTU",
                                sqft: "Up to 260 sq. ft.",
                                voltage: "115V (NEMA 5-15P)",
                                price: "$560",
                                netPrice: "$515 after $45 rebate",
                                badgePrefix: "Bedrooms & Studios",
                                highlight: "44 dB ultra-quiet operation, dual inverter variable compressor, and smart Wi-Fi control."
                            },
                            {
                                id: 3,
                                model: "LW1022IVSM",
                                slug: "3-lg-dual-inverter-10-000-btu-lw1022ivsm",
                                btu: "10,000 BTU",
                                sqft: "Up to 450 sq. ft.",
                                voltage: "115V (NEMA 5-15P)",
                                price: "$650",
                                netPrice: "$605 after $45 rebate",
                                badgePrefix: "Master Bedrooms",
                                highlight: "Ideal for Oahu bedrooms & single-wall homes with 15.0 CEER efficiency and ThinQ Wi-Fi smart scheduling."
                            },
                            {
                                id: 4,
                                model: "LW1222IVSM",
                                slug: "4-lg-dual-inverter-12-000-btu-lw1222ivsm",
                                btu: "12,000 BTU",
                                sqft: "Up to 550 sq. ft.",
                                voltage: "115V (NEMA 5-15P)",
                                price: "$745",
                                netPrice: "$700 after $45 rebate",
                                badgePrefix: "Master Suites & Living",
                                highlight: "High airflow for open apartments, saves over $424/year in HECO power against old rotary window units."
                            }
                        ].map((unit, idx) => {
                            const liveProd = liveProducts.find(p => p.id === unit.id);
                            const isInStock = liveProd ? liveProd.stock > 0 : true;
                            const activePrice = liveProd
                                ? (liveProd.promo_price && liveProd.promo_price > 0 && liveProd.promo_price < liveProd.price ? liveProd.promo_price : liveProd.price)
                                : null;
                            const displayPrice = activePrice ? `$${activePrice.toLocaleString()}` : unit.price;
                            return (
                            <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                                            {unit.badgePrefix} ({liveProd ? (liveProd.stock > 0 ? `${liveProd.stock} In Stock` : 'Out of Stock') : 'In Stock'})
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
                                            <span className="text-white font-bold">{displayPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-emerald-400 font-bold">
                                            <span>After Hawaii Energy Rebate:</span>
                                            <span>{activePrice ? `$${(activePrice - 45).toLocaleString()} after $45 rebate` : unit.netPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            disabled={!isInStock}
                                            onClick={() => {
                                                if (liveProd && liveProd.stock > 0) {
                                                    addToCart(liveProd);
                                                    openCart();
                                                }
                                            }}
                                            className="w-full py-2.5 px-2 rounded-xl bg-primary hover:bg-cyan-300 disabled:opacity-40 text-slate-950 font-header font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-md"
                                        >
                                            <ShoppingCart className="size-3.5 shrink-0" />
                                            <span>{isInStock ? `Buy (${displayPrice})` : 'Sold Out'}</span>
                                        </button>
                                        <Link
                                            href={`/shop/${unit.slug}`}
                                            className="w-full py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-header font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                                        >
                                            <span>View Specs</span>
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                    <div className="text-[10px] text-center text-slate-500">
                                        Free Waipahu Pickup (by appointment) or $50 Oahu Delivery
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>

                    <WindowAcQuickShop title="Live Waipahu Window AC Inventory — Bundle & Save" />
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
                                When you buy and install an Energy Star LG Dual Inverter through Affordable Home AC, we provide our official pre-approved Hawaii Energy application form PDF for your $45 cash rebate.
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
                                <div className={`px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 ${activeFaq === idx ? 'block' : 'hidden'}`}>
                                        {item.a}
                                    </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Contextual Hawaii Window & Condo Architecture Engineering Guides */}
                <section aria-label="Oahu Window AC Installation & Condo Architecture Guides" className="max-w-6xl mx-auto mb-16 pt-8 border-t border-white/10">
                    <div className="text-center mb-8">
                        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.25em] block mb-1.5">
                            HAWAII FRAMING &amp; ELECTRICAL ENGINEERING
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Oahu Window, Condo &amp; <span className="text-primary">230V Circuit Guides</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {[
                            { title: 'Oahu Window AC Installation Cost Guide', sub: '$0 Free Estimate • Itemized Labor Factors', href: '/window-ac-installation-cost-oahu' },
                            { title: 'Jalousie Glass Louver Retrofits', sub: 'Custom Clear Acrylic Baffle Sealing', href: '/jalousie-window-ac-installation-oahu' },
                            { title: '230V NEMA 6-15 & 6-20 Outlet Guide', sub: '18k–23.5k BTU Plug & Licensed Subcontractor Rules', href: '/230v-window-ac-outlet-nema-6-15-6-20-oahu' },
                            { title: '26" Wall Sleeve Dimensions (RAB26A)', sub: 'GE AJCQ & LG Universal Fit Condo Chassis', href: '/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu' },
                            { title: 'Property Manager & Landlord AC Program', sub: 'Multi-Unit Rental Replacements & Scheduling', href: '/property-manager-landlord-window-ac-oahu' },
                            { title: 'Honolulu High-Rise Condo HOA Rules', sub: 'AOAO Noise, Drip Routing & Exterior Brackets', href: '/high-rise-condo-ac-rules-honolulu' },
                            { title: 'Single-Wall Redwood Home Sizing', sub: 'Uninsulated Plantation Heat-Soak Calibration', href: '/single-wall-construction-ac-cooling-hawaii' },
                            { title: 'Horizontal Sliding Window Mounting', sub: 'Vertical Acrylic Filler & Security Track Lock', href: '/horizontal-sliding-window-ac-oahu' },
                        ].map((g) => (
                            <Link
                                key={g.href}
                                href={g.href}
                                className="p-4 rounded-2xl bg-slate-900/60 hover:bg-primary/10 border border-white/10 hover:border-primary/40 transition-all group"
                            >
                                <div className="font-header font-bold text-xs sm:text-sm uppercase text-white group-hover:text-cyan-300 transition-colors">
                                    {g.title} &rarr;
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 mt-1">
                                    {g.sub}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

<ReviewsPavilion variant="compact" />
                <OahuEEATAuthorityBar topicTitle="Oahu Window & Jalousie AC Installation Guide ($0 Free In-Home Estimate)" />
            </main>

                <BackToTop />
        </div>
    );
}
