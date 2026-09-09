import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
    CheckCircle2, 
    Truck, 
    ShieldCheck, 
    Clock, 
    Zap, 
    PackageCheck, 
    ChevronRight, 
    PhoneCall, 
    HelpCircle, 
    CalendarCheck, 
    MapPin, 
    Warehouse, 
    AlertTriangle, 
    Sparkles, 
    Timer, 
    ShoppingBag, 
    ExternalLink 
} from 'lucide-react';
import { WarehouseInventoryGrid } from './inventory-grid';

export const metadata: Metadata = {
    title: 'In-Stock Oahu Window AC Warehouse | Waipahu Pickup & $50 Delivery',
    description: 'Skip the 14-21 day mainland barge shipping wait. In-stock LG Dual Inverter window ACs warehoused locally on Oahu. Free Waipahu warehouse pickup by appointment or $50 flat-rate island delivery.',
    keywords: [
        'in stock window ac oahu',
        'window ac warehouse waipahu',
        'buy window ac honolulu',
        'same day ac pickup hawaii',
        'lg dual inverter window ac oahu',
        'beat mainland shipping ac hawaii',
        'oahu air conditioning inventory'
    ],
    openGraph: {
        title: 'In-Stock Oahu Window AC Warehouse | Skip Mainland Shipping Wait',
        description: 'Locally warehoused LG Dual Inverter window air conditioners ready on Oahu. Free Waipahu pickup by appointment or $50 island-wide delivery. Includes $45 Hawaii Energy rebate form.',
        url: 'https://www.affordablehome-ac.com/shop/oahu-window-ac-warehouse',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg',
                width: 1600,
                height: 1000,
                alt: 'In-Stock LG Dual Inverter Window ACs Waipahu Warehouse Oahu'
            }
        ]
    },
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/oahu-window-ac-warehouse'
    }
};

export default function OahuWindowAcWarehousePage() {
    const warehouseFaqs = [
        {
            q: "How does Waipahu warehouse pickup work?",
            a: "When you place an order online or reserve by phone, our dispatch team confirms your unit's serial number and schedules a designated pickup window at our Waipahu staging facility. Because our warehouse operates an active commercial loading bay, all pickups are arranged by appointment to ensure your unit is pre-staged, inspected, and loaded directly into your vehicle in under 5 minutes."
        },
        {
            q: "How fast is the $50 island-wide flat rate delivery?",
            a: "We deliver across all Oahu zip codes—from Honolulu and Pearl City to Kapolei, Ewa Beach, Kailua, Kaneohe, and the North Shore—for a flat $50. Once your order is placed, our logistics coordinator reaches out to confirm your delivery date and safe placement location. No hidden freight surcharges or fuel add-ons."
        },
        {
            q: "Why should I buy from your Oahu warehouse instead of ordering online from mainland retailers?",
            a: "Mainland orders (Amazon, Home Depot mainland freight, etc.) take 14 to 21 days to cross the Pacific on commercial container barges. Units are repeatedly transferred across docks and heavy sea swells, frequently resulting in bent coil fins, internal refrigerant leaks, or concealed shipping damage that takes weeks to return. We inspect and warehouse genuine factory-sealed LG Dual Inverters directly on Oahu, backed by our local Hawaii support."
        },
        {
            q: "How do I claim the $45 Hawaii Energy cash rebate?",
            a: "Every qualifying Energy Star certified LG Dual Inverter unit purchased from our warehouse comes with a pre-filled Hawaii Energy $45 Instant/Mail-In Rebate Form. Simply submit your proof of purchase to Hawaii Energy, and receive a $45 check back in the mail, reducing your effective equipment investment even further."
        },
        {
            q: "Can you install the window AC for me as well?",
            a: "Yes! If you prefer a turnkey professional installation—including custom weather-sealed Plexiglas filler panels, corrosion-resistant outdoor support brackets, and trade-wind vibration isolation—our Hawaii Licensed HVAC technicians (CT-36775) provide dedicated installation appointments across Oahu. You can book an installation visit online or add installation at checkout."
        },
        {
            q: "What warranty and power requirements do these units carry?",
            a: "All LG Dual Inverters come with a 1-Year LG Parts & Labor Manufacturer Warranty and a 10-Year Inverter Compressor Warranty. Units from 6,000 BTU to 14,000 BTU operate on standard 115V residential wall outlets (15A circuit). Units of 18,000 BTU and 23,500 BTU require 208/230V dedicated circuits (NEMA 6-20P outlet)."
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemPage",
                "@id": "https://www.affordablehome-ac.com/shop/oahu-window-ac-warehouse#webpage",
                "url": "https://www.affordablehome-ac.com/shop/oahu-window-ac-warehouse",
                "name": "In-Stock Oahu Window AC Warehouse | Waipahu Local Inventory",
                "description": "Skip the 14-21 day mainland barge shipping wait. In-stock LG Dual Inverter window ACs warehoused locally on Oahu. Free Waipahu warehouse pickup by appointment or $50 flat-rate island delivery.",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                        { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://www.affordablehome-ac.com/shop" },
                        { "@type": "ListItem", "position": 3, "name": "Oahu AC Warehouse", "item": "https://www.affordablehome-ac.com/shop/oahu-window-ac-warehouse" }
                    ]
                }
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://www.affordablehome-ac.com/#organization",
                "name": "Affordable Home AC - Oahu Distribution Warehouse",
                "telephone": "+1-808-725-3375",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Waipahu Industrial Center",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 21.3865,
                    "longitude": -158.0091
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "opens": "08:00",
                        "closes": "17:00"
                    }
                ],
                "priceRange": "$$"
            },
            {
                "@type": "FAQPage",
                "mainEntity": warehouseFaqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 pt-[140px] md:pt-[165px]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Top Breadcrumb Header */}
            <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-xs text-slate-400">
                    <nav className="flex items-center space-x-2">
                        <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        <Link href="/shop" className="hover:text-emerald-400 transition-colors">Shop</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        <span className="text-emerald-400 font-medium">Oahu AC Warehouse</span>
                    </nav>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                            Live Waipahu Inventory
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Section: Beat the Barge */}
            <section className="relative overflow-hidden py-14 md:py-20 px-4 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-semibold mb-6">
                        <Timer className="w-4 h-4 text-amber-400" />
                        <span>Beat the 14–21 Day Mainland Barge Shipping Wait</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-[1.15]">
                        In-Stock Oahu Window AC Warehouse <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                            Local Waipahu Inventory. Zero Mainland Delay.
                        </span>
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Don't suffer through Oahu's tropical humidity waiting 3 weeks for mainland freight. 
                        We physically stock genuine factory-sealed <strong className="text-white">LG Dual Inverter</strong> window air conditioners right here in Waipahu.
                    </p>

                    {/* Dual Fulfillment Pillars */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                        <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-lg shadow-emerald-950/20">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                    <Warehouse className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">Option 1: Free Pickup</div>
                                    <h3 className="text-lg font-bold text-white mt-0.5">Waipahu Warehouse Pickup</h3>
                                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                                        Conveniently pre-staged & loaded into your vehicle in under 5 minutes. 
                                        <span className="text-slate-400 block mt-1">★ By appointment to ensure rapid loading bay access & availability.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/20">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                                    <Truck className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <div className="text-xs uppercase font-bold tracking-wider text-cyan-400">Option 2: Doorstep Drop</div>
                                    <h3 className="text-lg font-bold text-white mt-0.5">$50 Island-Wide Delivery</h3>
                                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                                        Flat-rate delivery anywhere on Oahu. Honolulu, Kapolei, Kailua, Kaneohe, North Shore—handled safely by our local logistics team.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges Bar */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>Includes <strong>$45 Hawaii Energy Rebate</strong> Form</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>10-Yr Inverter Compressor Warranty</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-emerald-400" />
                            <span>Up to 40% Energy Savings vs Standard ACs</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Local Oahu Warehouse Beats Mainland Retailers Comparison */}
            <section className="py-14 px-4 bg-slate-900/40 border-b border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                            The Reality of Ordering Window ACs to Hawaii
                        </h2>
                        <p className="text-sm md:text-base text-slate-400 mt-2">
                            Why mainland online ordering frequently ends in damaged compressors and weeks of sweltering heat.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
                            <thead className="bg-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-700">
                                <tr>
                                    <th className="py-3.5 px-4">Feature / Experience</th>
                                    <th className="py-3.5 px-4 text-rose-400">Mainland Online Retailers</th>
                                    <th className="py-3.5 px-4 text-emerald-400 bg-emerald-500/10 border-l border-r border-emerald-500/30">
                                        Affordable Home AC Oahu Warehouse
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-slate-300">
                                <tr>
                                    <td className="py-3.5 px-4 font-semibold text-white">Transit Time to Oahu</td>
                                    <td className="py-3.5 px-4 text-rose-300">14 to 21 business days across Pacific barge</td>
                                    <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        In-Stock in Waipahu (Same-Day / Next-Day Scheduled Pickup or Delivery)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-semibold text-white">Freight Damage Risk</td>
                                    <td className="py-3.5 px-4 text-slate-400">High: 4+ dock transfers, rough sea swell vibrations, bent fins</td>
                                    <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        Zero Ocean Risk: Stored in climate-controlled Waipahu facility, pre-inspected
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-semibold text-white">Returns & Replacements</td>
                                    <td className="py-3.5 px-4 text-slate-400">Nightmare: You must repack 70-110 lbs and pay return freight</td>
                                    <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        Local Hawaii Support: 1-Year local warranty support & immediate exchange
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-semibold text-white">Hawaii Energy $45 Rebate</td>
                                    <td className="py-3.5 px-4 text-slate-400">You must search and figure out forms yourself</td>
                                    <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        Pre-filled official $45 Hawaii Energy Rebate Form included in every box
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-semibold text-white">Professional Installation Add-on</td>
                                    <td className="py-3.5 px-4 text-slate-400">None. You are on your own with jalousies and heavy brackets</td>
                                    <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        Optional turnkey installation by Hawaii Licensed HVAC Contractor (CT-36775)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Interactive Live Inventory Showcase */}
            <section id="warehouse-inventory" className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <Warehouse className="w-3.5 h-3.5" />
                            <span>Waipahu Warehouse Catalog</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">
                            Current In-Stock LG Dual Inverter Inventory
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base mt-2">
                            Select your unit size. All units feature whisper-quiet variable-speed inverter compressors, 
                            Energy Star certification, and qualify for the $45 Hawaii Energy cash rebate.
                        </p>
                    </div>

                    {/* Client Component with Filters & Cart Mechanics */}
                    <WarehouseInventoryGrid />
                </div>
            </section>

            {/* Professional Installation Add-on Banner */}
            <section className="py-12 px-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-t border-b border-slate-800">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 text-center md:text-left">
                        <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-wider">
                            Licensed Hawaii HVAC Workmanship
                        </span>
                        <h3 className="text-2xl font-black text-white">
                            Need Professional Window AC Installation on Oahu?
                        </h3>
                        <p className="text-sm text-slate-300 max-w-xl">
                            Have jalousie louvers, sliding windows, or second-story height? 
                            Our licensed technicians (CT-36775) provide custom weatherized Plexiglas louver cutouts, heavy-duty brackets, and precision vibration dampening.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                        <Link
                            href="/window-ac-installation"
                            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 text-center flex items-center justify-center gap-2"
                        >
                            <span>Explore Installation Options</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:8087253375"
                            className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-colors text-center flex items-center justify-center gap-2"
                        >
                            <PhoneCall className="w-4 h-4 text-emerald-400" />
                            <span>(808) 725-3375</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Comprehensive Warehouse FAQs */}
            <section className="py-16 px-4 bg-slate-900/30">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium uppercase tracking-wider mb-2">
                            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                            Everything You Need to Know About Oahu Warehouse Orders
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {warehouseFaqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
                            >
                                <h3 className="text-base md:text-lg font-bold text-white flex items-start gap-3">
                                    <span className="text-emerald-400 font-mono font-black text-sm mt-0.5">0{idx + 1}.</span>
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

            {/* Warehouse Bottom Staging Banner */}
            <section className="py-12 px-4 border-t border-slate-800 bg-slate-950">
                <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-8 md:p-12 border border-emerald-500/20 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <MapPin className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            Ready to Cool Your Home Tonight?
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed">
                            Pick up your brand-new LG Dual Inverter at our Waipahu warehouse by appointment, 
                            or select $50 flat island delivery at checkout.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#warehouse-inventory"
                                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all duration-200 shadow-xl shadow-emerald-500/20"
                            >
                                Browse In-Stock Units
                            </a>
                            <a
                                href="tel:8087253375"
                                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <PhoneCall className="w-4 h-4 text-emerald-400" />
                                <span>Speak with Dispatch: (808) 725-3375</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
