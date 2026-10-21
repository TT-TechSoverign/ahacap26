import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Warehouse, Sparkles, Wrench, Phone, CheckCircle2 } from 'lucide-react';

interface OahuEEATAuthorityBarProps {
    topicTitle?: string;
}

export function OahuEEATAuthorityBar({ topicTitle = 'Oahu Window AC & Cleaning Technical Guide' }: OahuEEATAuthorityBarProps) {
    const eeatJsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": topicTitle,
        "datePublished": "2026-01-15",
        "dateModified": "2026-10-21",
        "inLanguage": "en-US",
        "author": {
            "@type": "Organization",
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
            "name": "Affordable Home A/C Oahu Cooling Specialists (Brian, Chris, Makoa & Omar)",
            "url": "https://www.affordablehome-ac.com/reviews"
        },
        "reviewedBy": {
            "@type": "Organization",
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
            "name": "Affordable Home A/C — Waipahu Warehouse Direct & Insured Oahu Cooling Specialists (Est. 2005)",
            "url": "https://www.affordablehome-ac.com"
        },
        "publisher": {
            "@type": "Organization",
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
            "name": "Affordable Home A/C",
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
        "about": [
            { "@type": "Thing", "name": "LG Dual Inverter Window Air Conditioners ($560–$1,200)" },
            { "@type": "Thing", "name": "GE 26-Inch Built-In Through-the-Wall Air Conditioners" },
            { "@type": "Thing", "name": "Oahu Window AC Deep Cleaning & Mold Sanitization" },
            { "@type": "Thing", "name": "Hawaiian Jalousie Window AC Installation ($0 Free Estimate)" }
        ],
        "potentialAction": [
            {
                "@type": "OrderAction",
                "name": "Order In-Stock LG & GE Window AC Units Online ($395–$1,200)",
                "target": "https://www.affordablehome-ac.com/shop"
            },
            {
                "@type": "ReserveAction",
                "name": "Schedule Oahu Window AC Deep Cleaning & Coil Sanitization",
                "target": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
            }
        ]
    };

    return (
        <aside
            aria-label="Oahu Field Engineering Verification & Direct Ordering Hub"
            className="my-12 rounded-3xl bg-slate-900/90 border border-cyan-500/25 p-6 sm:p-8 shadow-2xl"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eeatJsonLd) }}
            />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                        <ShieldCheck className="size-3.5" />
                        <span>First-Hand Oahu Field Experience &bull; Verified Technical Guide</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-header font-black uppercase tracking-tight text-white">
                        Waipahu Warehouse Direct &bull; Insured Oahu Cooling Specialists &bull; Est. 2005
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
                        Field-tested and reviewed by our local Oahu window AC specialist team (<strong className="text-white">Brian, Chris, Makoa &amp; Omar</strong> &mdash; <Link href="/reviews" className="text-cyan-400 hover:underline font-semibold">4.9&#9733; across 142 verified Oahu homeowner reviews</Link>). All sizing and service specifications are calibrated for Hawaii single-wall redwood framing, jalousie glass louvers, 26&quot; condo wall sleeves, coastal salt-air protection, and <strong className="text-white">HECO ~44.2&cent;/kWh</strong> electricity rates.
                    </p>
                </div>

                <div className="shrink-0 p-4 rounded-2xl bg-slate-950/90 border border-white/10 text-xs font-mono space-y-1.5">
                    <div className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Warehouse className="size-3.5" />
                        <span>Waipahu Distribution Hub</span>
                    </div>
                    <div className="text-white font-semibold">94-150 Leoleo St. #203, Waipahu, HI 96797</div>
                    <div className="text-slate-400">Free Pickup by Appt &bull; $50 Flat Oahu Delivery</div>
                    <div className="pt-1">
                        <a href="tel:8084881111" className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1.5">
                            <Phone className="size-3.5" />
                            <span>Dispatch Hotline: (808) 488-1111</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-6">
                <Link
                    href="/shop"
                    className="p-4 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 transition-all group flex flex-col justify-between gap-2"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">16 In-Stock LG &amp; GE Models</span>
                        <Warehouse className="size-4 text-cyan-400" />
                    </div>
                    <div className="font-header font-black text-sm sm:text-base uppercase text-white group-hover:text-cyan-300 transition-colors">
                        Order Window AC Units ($395&ndash;$1,200) &rarr;
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                        LG Dual Inverter (6k&ndash;23.5k BTU), LG Cool+Heat &amp; GE 26&quot; Built-In units. Eligible for <strong className="text-emerald-400">$45 Hawaii Energy Rebate</strong>.
                    </p>
                </Link>

                <Link
                    href="/ac-cleaning-oahu"
                    className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all group flex flex-col justify-between gap-2"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">Drop-Cloth Protected Service</span>
                        <Sparkles className="size-4 text-emerald-400" />
                    </div>
                    <div className="font-header font-black text-sm sm:text-base uppercase text-white group-hover:text-emerald-300 transition-colors">
                        Book Oahu Window AC Cleaning &rarr;
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                        On-site evaporator &amp; condenser coil foaming sanitization, antimicrobial pan flush &amp; mold removal across all 22 Oahu cities.
                    </p>
                </Link>

                <Link
                    href="/window-ac-installation"
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/15 transition-all group flex flex-col justify-between gap-2"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">$0 Upfront Booking Barrier</span>
                        <Wrench className="size-4 text-amber-400" />
                    </div>
                    <div className="font-header font-black text-sm sm:text-base uppercase text-white group-hover:text-amber-300 transition-colors">
                        $0 Free Installation / Clean-vs-Replace Estimate &rarr;
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                        Custom Hawaiian jalousie louver acrylic baffles, horizontal slider mounts, exterior support brackets &amp; 26&quot; wall sleeve swaps.
                    </p>
                </Link>
            </div>
        </aside>
    );
}
