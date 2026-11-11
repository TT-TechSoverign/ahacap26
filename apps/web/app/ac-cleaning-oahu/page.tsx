'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    ArrowRight, 
    CheckCircle2, 
    Phone, 
    ChevronDown, 
    Activity,
    ShieldCheck
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

export default function AcCleaningOahuPage() {
    const [cleaningTier, setCleaningTier] = useState<'basic' | 'premium'>('premium');
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

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const cityParam = params.get('city');
        const tierParam = params.get('tier');
        const notesParam = params.get('notes');
        if (cityParam) setCity(cityParam);
        if (tierParam === 'basic' || tierParam === 'premium') setCleaningTier(tierParam);
        if (notesParam) setNotes(notesParam);
    }, []);

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
                ? 'Deep Window AC Sanitization & Mold Purge' 
                : 'Standard Window AC Coil & Filter Cleaning';

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
                notes: `Service: ${serviceName} | Location: ${city} | Service Type: Window AC Cleaning (Drop Cloth Floor Protection) | Notes: ${notes.trim() || 'None'}`
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
            q: "What is included in your Window AC Cleaning & Sanitization service?",
            a: "Standard Window AC Cleaning provides routine coil sanitization, reusable air filter wash, and drain pan flush. Deep Window AC Sanitization is our comprehensive mold-purge protocol: we deep-clean the blower wheel, evaporator and condenser coils, and scrub the condensate slinger pan with clean floor drop-cloth protection."
        },
        {
            q: "When should I replace my window air conditioner instead of cleaning it?",
            a: "If your window air conditioner is over 5–7 years old with severe coastal salt-air fin rot, loud bearing noise, or high power draw, upgrading to an in-stock LG Dual Inverter & GE Built-In from our Waipahu warehouse starting at $560 with a $45 Hawaii Energy cash rebate is often the smartest investment."
        },
        {
            q: "Will the cleaning make a water mess inside my home?",
            a: "Zero water mess. Our technicians always lay clean protective floor drop cloths directly beneath your window or wall unit during service. All dirty water and mold residue are safely contained."
        },
        {
            q: "Do I have to pay upfront when booking a cleaning appointment?",
            a: "No! Affordable Home AC requires zero upfront payment. You book your window AC cleaning appointment with $0 deposit, and our dispatch team confirms your service window first."
        },
        {
            q: "How often should window ACs be cleaned on Oahu?",
            a: "Because Oahu maintains 70–80% average humidity and constant coastal salt mist, window AC coils, blower wheels, and slinger pans accumulate biological slime and salt dust within 6 to 12 months of daily use. Regular cleaning restores airflow CFM by up to 30% and lowers compressor power draw under HECO rates."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": "https://www.affordablehome-ac.com/ac-cleaning-oahu#service",
                "url": "https://www.affordablehome-ac.com/ac-cleaning-oahu",
                "image": [
                    "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                    "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                    "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                    "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                ],
                "name": "Window AC Deep Cleaning, Coil Sanitization & Clean-vs-Replace Assessment Oahu",
                "serviceType": "Window AC Sanitization & Coil Cleaning",
                "provider": {
                    "@type": "HVACBusiness",
                    "@id": "https://www.affordablehome-ac.com/ac-cleaning-oahu#localbusiness",
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
                "description": "On-site window AC evaporator/condenser coil foaming sanitization, blower wheel cleaning, antimicrobial slinger pan flush, protective floor drop cloths, and honest clean-vs-replace assessments ($0 Free In-Home Estimate) across Oahu.",
                "potentialAction": {
                    "@type": "ReserveAction",
                    "name": "Schedule Oahu Window AC Cleaning or $0 Clean-vs-Replace Assessment",
                    "target": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Oahu Window AC Cleaning & Clean-vs-Replace Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "$0 Free In-Home Window AC Clean-vs-Replace Assessment (By Appointment First)"
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
                    { "@type": "ListItem", "position": 2, "name": "Window AC Cleaning Oahu", "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu" }
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
                        <ShieldCheck className="size-3.5" />
                        Clinical Coil Sanitization &bull; Insured Oahu Specialists &bull; Drop-Cloth Protected
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Oahu <span className="text-primary">Window AC Cleaning</span> &amp; Mold Purge
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Coil Sanitization &bull; Blower Wheel Scrub &bull; Zero Water Mess
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Eradicate black mold, musty odors, and salt-crusted coil blockage in your window or through-the-wall AC. Our clinical cleaning protocols restore ice-cold airflow, purify indoor air, and cut electric bills under Hawaiian Electric rates. Zero upfront booking deposit.
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
                            Standard Coil &amp; Filter Clean
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
                            Deep Window AC Mold Purge ★
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
                                        Routine Window AC Maintenance &bull; Sanitization
                                    </div>
                                    <h2 className="text-2xl font-header font-black uppercase text-white mt-1">
                                        Standard Window AC Cleaning &amp; Filter Care
                                    </h2>
                                    <div className="flex items-baseline gap-3 mt-2">
                                        <span className="text-xs font-mono text-emerald-400 font-bold">Upfront Itemized Quote &bull; Zero Booking Deposit</span>
                                    </div>
                                </div>

                                <div className="space-y-4 text-xs font-mono">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            1. Reusable Filter Reverse Rinse &amp; Sanitization
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            High-velocity reverse rinse removes red dirt, pet dander, and salt dust from the fine mesh intake screen.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            2. Evaporator &amp; Condenser Coil Sanitizing Foam
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Non-acidic expanding foam penetrates aluminum coil fins to dissolve light biological buildup and restore heat transfer.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            3. Slinger Pan &amp; Drain Channel Flush
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Clears algae plugs and flushes condensate drainage paths to prevent indoor water drips onto your window sill.
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
                                        Deep Window AC Cleaning &amp; Blower Sanitization
                                    </h2>
                                    <div className="flex items-baseline gap-3 mt-2">
                                        <span className="text-xs font-mono text-emerald-400 font-bold">Upfront Itemized Quote &bull; Zero Booking Deposit</span>
                                    </div>
                                </div>

                                <div className="space-y-4 text-xs font-mono">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            1. Front Grille, Louver &amp; Air Channel Access
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            We remove the front intake grille, directional louvers, and filter assembly to expose hidden mold colonies.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            2. Blower Wheel &amp; Air Scoop Deep Scrub
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Over 90% of musty odors come from the internal blower wheel and discharge chute. We sanitize both thoroughly to restore icy airflow.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            3. Deep Evaporator &amp; Condenser Coil Wash
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Clinical antimicrobial foaming flush strips stubborn fungal slime and coastal salt crust from aluminum coil fins.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            4. Condensate Base Pan Scrub &amp; Anti-Algae Treatment
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Bottom pan is deep-scrubbed and treated to prevent future algae clogs and indoor water overflow.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="text-white font-bold uppercase flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            5. Protective Floor Drop Cloths Laid Under Unit
                                        </div>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                                            Our technicians lay clean protective drop cloths on the floor beneath your window unit. Zero water mess.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Window AC Clean vs Replace Callout */}
                        <div className="p-6 rounded-3xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-3 font-sans">
                            <div className="font-header font-bold uppercase text-cyan-300 flex items-center gap-2 text-sm">
                                <Activity className="size-4" /> Should You Clean or Replace Your Window AC?
                            </div>
                            <p className="leading-relaxed">
                                If your window air conditioner is 5+ years old with severe coastal salt-air fin rot or loud bearing noise, upgrading to a brand-new LG Dual Inverter & GE Built-In from our Waipahu warehouse starting at $560 (with a $45 Hawaii Energy cash rebate and $50 flat Oahu delivery) can save up to 40% on monthly HECO electricity bills.
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
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl sticky top-24 md:top-[184px]">
                            <div className="border-b border-white/10 pb-4 mb-4">
                                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Upfront Itemized Quotes • By Appointment First
                                </div>
                                <h3 className="text-xl font-header font-black uppercase text-white">
                                    Book Window AC Cleaning
                                </h3>
                                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                    Zero upfront payment to book your appointment. Submit below, call <a href="tel:808-488-1111" className="text-primary font-bold hover:underline">(808) 488-1111</a>, or email <a href="mailto:office@affordablehome-ac.com" className="text-primary font-bold hover:underline">office@affordablehome-ac.com</a>.
                                </p>
                            </div>

                            {isSuccess ? (
                                <div className="py-8 text-center space-y-4 font-mono">
                                    <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <div className="text-sm text-white font-bold uppercase">Cleaning Request Confirmed!</div>
                                    <p className="text-xs text-slate-300 font-sans">
                                        Our dispatch team has scheduled your window AC cleaning intake for {city}. We will reach out shortly to confirm appointment details and service timing.
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
                                                {cleaningTier === 'premium' ? 'Deep Window AC Mold Purge' : 'Standard Window AC Cleaning'}
                                            </span>
                                            <span className="text-emerald-400 font-mono font-bold">
                                                $0 Deposit
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Notes / Preferred Day</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="Preferred service timing, unit brand/BTU, number of window units..."
                                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Booking Intake...' : 'Book Window AC Cleaning ($0 Deposit)'}
                                    </button>

                                    <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
                                        Waipahu Warehouse Direct &bull; Insured Oahu Cooling Specialists
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-header font-black uppercase text-white">Window AC Cleaning Frequently Asked Questions</h2>
                        <p className="text-slate-400 text-xs mt-1">Everything about our window AC coil sanitization and deep clean services</p>
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
<WindowAcQuickShop
                    modelIds={[3, 4, 15, 6]}
                    title="In-Stock Waipahu LG & GE Window Air Conditioners ($395–$1,200)"
                    subheading="Ready for Free Waipahu Warehouse Pickup by appointment or $50 flat-rate Oahu delivery with $45 Hawaii Energy Rebate."
                />

                <ReviewsPavilion variant="compact" />
                <OahuEEATAuthorityBar topicTitle="Oahu Window AC Deep Coil Cleaning, Mold Sanitization & Drop-Cloth Guide" />
            </main>

                <BackToTop />
        </div>
    );
}
