import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Warehouse, Sparkles, Wrench, Phone, CheckCircle2 } from 'lucide-react';

interface OahuEEATAuthorityBarProps {
    topicTitle?: string;
}

export function OahuEEATAuthorityBar({ topicTitle = 'Oahu Window AC & Cleaning Technical Guide' }: OahuEEATAuthorityBarProps) {
    const normalizedTopicTitle = topicTitle.replace(/\s+\?\s+/g, " — ");
    const eeatJsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": normalizedTopicTitle,
        "image": [
            "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
            "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
            "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
            "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
        ],
        "datePublished": "2026-01-15",
        "dateModified": "2026-11-10",
        "inLanguage": "en-US",
        "author": {
            "@type": "Organization",
            "name": "Affordable Home A/C Oahu Cooling Specialists (Brian, Chris, Makoa & Omar)",
            "url": "https://www.affordablehome-ac.com/reviews"
        },
        "reviewedBy": {
            "@type": "Organization",
            "name": "Affordable Home A/C — Waipahu Warehouse Direct & Insured Oahu Cooling Specialists (Est. 2005)",
            "url": "https://www.affordablehome-ac.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Affordable Home A/C",
            "url": "https://www.affordablehome-ac.com",
            "telephone": "+1-808-488-1111",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.affordablehome-ac.com/assets/AFORDABLE_LOGO_2026_500x500_blkblugrn.png",
                "width": 500,
                "height": 500
            },
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
            id="oahu-window-ac-directory"
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

            {/* Topical Authority Silo Cross-Link Matrix (Connects all 59 commercial guides & hubs for crawler discovery and user navigation) */}
            <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
                    Complete Oahu Window AC Buying, Installation, Cleaning &amp; Troubleshooting Directory
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] font-sans">
                    <div className="space-y-1.5">
                        <div className="font-header font-bold uppercase text-white text-xs tracking-wide border-b border-white/10 pb-1">
                            Shop &amp; Buyer Guides ($395+)
                        </div>
                        <ul className="space-y-1 text-slate-300">
                            <li><Link href="/shop/oahu-window-ac-warehouse" className="hover:text-cyan-300 transition-colors">Waipahu Window AC Warehouse</Link></li>
                            <li><Link href="/shop/lg-dual-inverter-guide" className="hover:text-cyan-300 transition-colors">LG Dual Inverter Buyer Guide</Link></li>
                            <li><Link href="/shop/lg-dual-inverter-8000-btu-oahu" className="hover:text-cyan-300 transition-colors">8,000 BTU LG Dual Inverter Guide</Link></li>
                            <li><Link href="/shop/large-room-window-ac-oahu" className="hover:text-cyan-300 transition-colors">Large Room 14k–23.5k BTU Units</Link></li>
                            <li><Link href="/shop/ge-built-in-wall-ac-oahu" className="hover:text-cyan-300 transition-colors">GE 26&quot; Built-In Wall Sleeve ACs</Link></li>
                            <li><Link href="/shop/window-ac-plug-guide" className="hover:text-cyan-300 transition-colors">115V vs 230V Window AC Plug Guide</Link></li>
                            <li><Link href="/hawaii-energy-rebate" className="hover:text-cyan-300 transition-colors">$45 Hawaii Energy Cash Rebate</Link></li>
                            <li><Link href="/quiet-bedroom-window-ac-oahu" className="hover:text-cyan-300 transition-colors">Quiet 44dB Bedroom Window ACs</Link></li>
                            <li><Link href="/living-room-window-ac-oahu" className="hover:text-cyan-300 transition-colors">Living Room Window ACs Oahu</Link></li>
                            <li><Link href="/small-room-window-ac-6000-8000-btu" className="hover:text-cyan-300 transition-colors">Small Room 6,000–8,000 BTU ACs</Link></li>
                            <li><Link href="/energy-star-window-air-conditioners-hawaii" className="hover:text-cyan-300 transition-colors">ENERGY STAR Window ACs Hawaii</Link></li>
                            <li><Link href="/smart-wifi-window-ac-oahu" className="hover:text-cyan-300 transition-colors">Smart WiFi Window ACs (ThinQ/SmartHQ)</Link></li>
                            <li><Link href="/low-voltage-window-ac-115v-oahu" className="hover:text-cyan-300 transition-colors">115V Standard Plug Window ACs</Link></li>
                            <li><Link href="/inverter-window-ac-vs-standard-hawaii" className="hover:text-cyan-300 transition-colors">Inverter vs Standard Window AC</Link></li>
                            <li><Link href="/window-ac-for-studios-apartments-hawaii" className="hover:text-cyan-300 transition-colors">Studio &amp; Apartment Window ACs</Link></li>
                            <li><Link href="/commercial-window-ac-oahu" className="hover:text-cyan-300 transition-colors">Commercial &amp; Office Window ACs</Link></li>
                            <li><Link href="/window-ac-replacement-oahu" className="hover:text-cyan-300 transition-colors">Window AC Replacement Oahu</Link></li>
                            <li><Link href="/window-ac-warehouse-pickup-waipahu" className="hover:text-cyan-300 transition-colors">Waipahu Warehouse Free Pickup</Link></li>
                            <li><Link href="/window-ac-delivery-service-oahu" className="hover:text-cyan-300 transition-colors">$50 Flat-Rate Oahu AC Delivery</Link></li>
                            <li><Link href="/window-ac-warranty-waipahu" className="hover:text-cyan-300 transition-colors">1–5 Yr Factory Warranty Support</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-1.5">
                        <div className="font-header font-bold uppercase text-white text-xs tracking-wide border-b border-white/10 pb-1">
                            Jalousie &amp; Condo Installation
                        </div>
                        <ul className="space-y-1 text-slate-300">
                            <li><Link href="/jalousie-window-ac-installation-oahu" className="hover:text-cyan-300 transition-colors">Jalousie Louver Window AC Install</Link></li>
                            <li><Link href="/single-wall-construction-ac-cooling-hawaii" className="hover:text-cyan-300 transition-colors">Single-Wall Redwood Home Sizing</Link></li>
                            <li><Link href="/horizontal-sliding-window-ac-oahu" className="hover:text-cyan-300 transition-colors">Horizontal Sliding Window AC Mount</Link></li>
                            <li><Link href="/double-hung-window-ac-installation-hawaii" className="hover:text-cyan-300 transition-colors">Double-Hung Window AC Install</Link></li>
                            <li><Link href="/ac-brackets-exterior-security-mounting-oahu" className="hover:text-cyan-300 transition-colors">Exterior Support Brackets Oahu</Link></li>
                            <li><Link href="/window-ac-weather-stripping-island-seal" className="hover:text-cyan-300 transition-colors">Trade-Wind Weather Stripping Seal</Link></li>
                            <li><Link href="/condo-townhouse-window-ac-hoa-rules-oahu" className="hover:text-cyan-300 transition-colors">Condo &amp; Townhouse HOA AC Rules</Link></li>
                            <li><Link href="/high-rise-condo-ac-rules-honolulu" className="hover:text-cyan-300 transition-colors">Honolulu High-Rise Condo AC Fit</Link></li>
                            <li><Link href="/renter-friendly-ac-installation-oahu" className="hover:text-cyan-300 transition-colors">Renter-Friendly Window AC Mount</Link></li>
                            <li><Link href="/wood-frame-window-ac-support-oahu" className="hover:text-cyan-300 transition-colors">Wood-Frame Window Sill Support</Link></li>
                            <li><Link href="/vinyl-replacement-window-ac-mounting" className="hover:text-cyan-300 transition-colors">Vinyl Window AC Track Protection</Link></li>
                            <li><Link href="/security-bars-window-ac-installation-oahu" className="hover:text-cyan-300 transition-colors">Security Bars Window AC Clearance</Link></li>
                            <li><Link href="/narrow-window-ac-solutions-hawaii" className="hover:text-cyan-300 transition-colors">Narrow Window AC Fit Solutions</Link></li>
                            <li><Link href="/ac-condensation-drain-routing-condos" className="hover:text-cyan-300 transition-colors">Condo Condensate Drain Routing</Link></li>
                            <li><Link href="/sizing" className="hover:text-cyan-300 transition-colors">Oahu BTU &amp; Window Fit Calculator</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-1.5">
                        <div className="font-header font-bold uppercase text-white text-xs tracking-wide border-b border-white/10 pb-1">
                            Deep Coil &amp; Mold Cleaning
                        </div>
                        <ul className="space-y-1 text-slate-300">
                            <li><Link href="/clean-vs-replace-window-ac" className="hover:text-cyan-300 transition-colors">$0 Clean-vs-Replace Assessment</Link></li>
                            <li><Link href="/ac-mold-removal-cleaning-oahu" className="hover:text-cyan-300 transition-colors">Window AC Mold Removal &amp; Wash</Link></li>
                            <li><Link href="/ac-smells-musty-mildew-hawaii" className="hover:text-cyan-300 transition-colors">Musty Mildew AC Odor Treatment</Link></li>
                            <li><Link href="/black-mold-in-ac-health-risks-hawaii" className="hover:text-cyan-300 transition-colors">Black Mold in Window AC Purge</Link></li>
                            <li><Link href="/ac-coil-cleaning-benefits-power-bill" className="hover:text-cyan-300 transition-colors">Coil Cleaning HECO Bill Savings</Link></li>
                            <li><Link href="/air-conditioner-blower-wheel-cleaning-hawaii" className="hover:text-cyan-300 transition-colors">Blower Wheel Deep Scrubbing</Link></li>
                            <li><Link href="/ac-drain-line-clog-clearing-oahu" className="hover:text-cyan-300 transition-colors">Drain Pan &amp; Slinger Clearing</Link></li>
                            <li><Link href="/clean-air-filter-replacement-hawaii" className="hover:text-cyan-300 transition-colors">Air Filter Wash &amp; Sanitization</Link></li>
                            <li><Link href="/salt-corrosion-coil-rinse-hawaii" className="hover:text-cyan-300 transition-colors">Coastal Salt-Air Coil Rinse</Link></li>
                            <li><Link href="/post-storm-ac-inspection-cleaning-oahu" className="hover:text-cyan-300 transition-colors">Post-Storm &amp; Kona Wind AC Wash</Link></li>
                            <li><Link href="/pet-hair-dander-ac-cleaning-oahu" className="hover:text-cyan-300 transition-colors">Pet Hair &amp; Dander Coil Cleaning</Link></li>
                            <li><Link href="/seasonal-ac-maintenance-plans-oahu" className="hover:text-cyan-300 transition-colors">6/12-Month Window AC Maintenance</Link></li>
                            <li><Link href="/commercial-ac-cleaning-oahu" className="hover:text-cyan-300 transition-colors">Commercial Office Window AC Wash</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-1.5">
                        <div className="font-header font-bold uppercase text-white text-xs tracking-wide border-b border-white/10 pb-1">
                            Symptoms &amp; Troubleshooting
                        </div>
                        <ul className="space-y-1 text-slate-300">
                            <li><Link href="/ac-repair-oahu" className="hover:text-cyan-300 transition-colors">Oahu Window AC Repair Hub</Link></li>
                            <li><Link href="/ac-blowing-warm-air-troubleshooting-oahu" className="hover:text-cyan-300 transition-colors">Window AC Blowing Warm Air Fix</Link></li>
                            <li><Link href="/ac-freezing-up-ice-on-coils-hawaii" className="hover:text-cyan-300 transition-colors">Frozen Evaporator Coils &amp; Ice</Link></li>
                            <li><Link href="/ac-dripping-water-inside-house-repair" className="hover:text-cyan-300 transition-colors">Window AC Leaking Water Inside</Link></li>
                            <li><Link href="/ac-keeps-tripping-breaker-hawaii" className="hover:text-cyan-300 transition-colors">AC Tripping Breaker / LCDI Plug</Link></li>
                            <li><Link href="/blinking-light-error-codes-ac-repair" className="hover:text-cyan-300 transition-colors">LG/GE Blinking Filter &amp; CH Codes</Link></li>
                            <li><Link href="/ac-diagnostic-service-175-flat-rate" className="hover:text-cyan-300 transition-colors">$0 Free Diagnostic &amp; Quote</Link></li>
                            <li><Link href="/ac-compressor-not-turning-on-oahu" className="hover:text-cyan-300 transition-colors">Compressor Not Kicking On</Link></li>
                            <li><Link href="/window-ac-making-loud-buzzing-noise" className="hover:text-cyan-300 transition-colors">Loud Rattling or Buzzing Noise</Link></li>
                            <li><Link href="/ac-refrigerant-leak-detection-hawaii" className="hover:text-cyan-300 transition-colors">Sealed System Refrigerant Loss</Link></li>
                            <li><Link href="/ac-turning-on-and-off-rapidly-short-cycling" className="hover:text-cyan-300 transition-colors">Rapid On/Off Short Cycling Fix</Link></li>
                            <li><Link href="/no-power-to-ac-unit-hawaii" className="hover:text-cyan-300 transition-colors">Dead Window AC / No Power</Link></li>
                            <li><Link href="/ac-burning-electrical-smell-oahu" className="hover:text-cyan-300 transition-colors">Electrical or Burning Smell</Link></li>
                            <li><Link href="/outdoor-unit-fan-not-spinning-hawaii" className="hover:text-cyan-300 transition-colors">Condenser Fan Motor Not Spinning</Link></li>
                            <li><Link href="/service-areas" className="hover:text-cyan-300 transition-colors">All 22 Oahu Service Areas &rarr;</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
}
