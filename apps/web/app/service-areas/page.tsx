'use client';

import React from 'react';
import Image from 'next/image';
import { useContent } from '@/lib/context/ContentContext';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { BackToTop } from '@/components/BackToTop';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

export default function ServiceAreasPage() {
    const { content } = useContent();
    const serviceAreas = (content as any)?.landing_legacy?.service_areas;

    if (!serviceAreas || !serviceAreas.regions) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
                <h2 className="text-3xl font-header font-bold text-white mb-4">Service Areas Not Found</h2>
                <p className="text-slate-400">Please check the content configuration.</p>
            </div>
        );
    }

    const allSortedCities: { name: string; slug: string }[] = Array.from(
        new Map<string, { name: string; slug: string }>(
            serviceAreas.regions
                .flatMap((r: any) => r.cities || [])
                .filter((c: any) => c?.name)
                .map((c: any) => {
                    const slug = c.name.toLowerCase().replace(/ /g, '-');
                    return [slug, { name: c.name, slug }] as [string, { name: string; slug: string }];
                })
        ).values()
    ).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <main className="min-h-screen bg-slate-950 font-sans pb-24 relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "HVACBusiness",
                                "@id": "https://www.affordablehome-ac.com/service-areas#localbusiness",
        "parentOrganization": { "@id": "https://www.affordablehome-ac.com/#hvacbusiness" },
                                "name": "Affordable Home A/C — All 22 Oahu Service Areas",
                                "url": "https://www.affordablehome-ac.com/service-areas",
                                "image": [
                                    "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                                    "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                                    "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                                    "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                                ],
                                "telephone": "+1-808-488-1111",
                                "priceRange": "$395 - $1,200",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "94-150 Leoleo St. #203",
                                    "addressLocality": "Waipahu",
                                    "addressRegion": "HI",
                                    "postalCode": "96797",
                                    "addressCountry": "US"
                                },
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
                                        "reviewBody": "Picked up a 12,000 BTU LG Dual Inverter directly from their Waipahu warehouse and had Brian's team custom-install it in our jalousie window with floor drop cloths. Whisper quiet and dropped our HECO bill immediately.",
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Leilani K. — Honolulu, Oahu" },
                                        "datePublished": "2026-10-04",
                                        "reviewBody": "Zero upfront payment to get an honest in-home assessment. They deep-cleaned our bedroom window AC coils and replaced our corroded 26-inch living room wall sleeve unit with a new GE R-32 inverter.",
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "David C. — Pearl City, Oahu" },
                                        "datePublished": "2026-10-19",
                                        "reviewBody": "Fast island-wide delivery, direct Waipahu warehouse pricing, and they handed us the pre-filled $45 Hawaii Energy rebate form at checkout.",
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://www.affordablehome-ac.com"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Service Areas",
                                        "item": "https://www.affordablehome-ac.com/service-areas"
                                    }
                                ]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Which Oahu cities does Affordable Home A/C serve?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Affordable Home A/C serves all 22 Oahu communities across Metro Honolulu, Central Oahu, Leeward/West Oahu, Windward Oahu, East Honolulu, and the North Shore—including Honolulu, Waipahu, Kapolei, Ewa Beach, Mililani, Pearl City, Aiea, Kailua, Kaneohe, and Hawaii Kai."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How much is island-wide Window AC delivery or Waipahu warehouse pickup?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Waipahu warehouse pickup at 94-150 Leoleo St. #203 is $0 (free by appointment), and island-wide residential delivery across all 22 Oahu service areas is a flat $50."
                                        }
                                    },
        {
            "@type": "Question",
            "name": "Do you charge upfront to book an in-home Window AC estimate in my neighborhood?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never. Across all 22 Oahu service areas—from Hawaii Kai and Kailua to Kapolei, Ewa Beach, Mililani, and Waipahu—we operate strictly By Appointment First with $0 Free In-Home Estimates and protective floor drop cloths under every serviced unit."
            }
        }
    ]
                            }
                        ]
                    })
                }}
            />
            {/* Dark background grid texture overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* Header Section */}
            <div className="relative z-10 pt-[96px] md:pt-[180px] pb-12 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em]">
                        <LucideIcons.MapPin className="size-3.5 text-cyan-400" />
                        Oahu Coverage Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-header font-black tracking-widest text-white uppercase drop-shadow-lg">
                        ISLAND-WIDE <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">SERVICE</span>
                    </h1>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.6)] rounded-full"></div>
                    <p className="max-w-3xl mx-auto text-slate-300 md:text-lg tracking-wide leading-relaxed font-light">
                        {serviceAreas.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-header font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
                        >
                            <LucideIcons.ShoppingBag className="size-4" />
                            <span>Shop In-Stock Window ACs ($395+)</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-header font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
                        >
                            <LucideIcons.Calendar className="size-4 text-emerald-400" />
                            <span>Book $0 Free Estimate</span>
                        </Link>
                        <a
                            href="tel:808-488-1111"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold transition-all"
                        >
                            <LucideIcons.Phone className="size-4 text-cyan-400" />
                            <span>Call (808) 488-1111</span>
                        </a>
                    </div>
                </div>

                {/* 22-City A–Z Instant Oahu Neighborhood Jump Bar */}
                {allSortedCities.length > 0 && (
                    <nav
                        aria-label="All 22 Oahu Service Areas A to Z"
                        className="mt-10 p-5 md:p-6 rounded-2xl bg-slate-900/75 border border-slate-800/90 shadow-xl"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-1.5">
                                <LucideIcons.Compass className="size-3.5" />
                                Jump Directly to Your Oahu Neighborhood (A–Z):
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                                $0 Free Estimate &bull; Free Waipahu Pickup or $50 Oahu Delivery
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {allSortedCities.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/service-areas/${city.slug}`}
                                    prefetch={false}
                                    className="px-3 py-1.5 rounded-lg bg-slate-950/90 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 text-xs font-header font-bold uppercase tracking-wider transition-all"
                                >
                                    {city.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </div>

            {/* Regions Layout */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
                {serviceAreas.regions.map((region: any) => {
                    // Safe dynamic icon rendering for region header
                    let RegionIcon = LucideIcons.MapPin;
                    if (region.icon && region.icon in LucideIcons) {
                        RegionIcon = (LucideIcons as any)[region.icon];
                    }

                    return (
                        <div key={region.id} className="scroll-mt-24 md:scroll-mt-48" id={region.id}>
                            {/* Region Header */}
                            <div className="flex flex-col items-center text-center gap-4 mb-10">
                                <RegionIcon className="w-10 h-10 text-cyan-400 mb-2" strokeWidth={1.5} />
                                <h2 className="text-3xl md:text-4xl font-header font-bold tracking-wider text-white uppercase">
                                    {region.title}
                                </h2>
                                <div className="w-16 h-0.5 bg-slate-800 rounded-full"></div>
                            </div>

                            {/* City Cards Grid */}
                            <div className="flex flex-wrap justify-center items-stretch gap-6 md:gap-8">
                                {region.cities && region.cities.map((city: any, cityIndex: number) => {
                                    // Safe dynamic icon rendering for city cards
                                    let CityIcon = LucideIcons.MapPin;
                                    if (city.icon && city.icon in LucideIcons) {
                                        CityIcon = (LucideIcons as any)[city.icon];
                                    }

                                    return (
                                        <div 
                                            key={cityIndex} 
                                            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                                        >
                                            {/* Top right decorative accent */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-2xl"></div>

                                            <div className="flex flex-col items-center gap-4 mb-6">
                                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                                                    <CityIcon className="w-8 h-8" strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-xl font-header font-bold text-white tracking-widest uppercase mt-2">
                                                    {city.name}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-slate-300 text-sm leading-relaxed font-light flex-grow">
                                                {city.description}
                                            </p>

                                            <Link 
                                                href={`/service-areas/${city.name.toLowerCase().replace(/ /g, '-')}`}
                                                prefetch={false}
                                                className="mt-8 pt-6 w-full border-t border-slate-800/80 flex justify-center items-center gap-3 opacity-70 group-hover:opacity-100 transition-all text-cyan-400 hover:text-cyan-300 cursor-pointer"
                                            >
                                                <span className="text-xs uppercase tracking-widest font-bold">View Local Services</span>
                                                <LucideIcons.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* Island-Wide Conversion Callout */}
                <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                        <LucideIcons.ShieldCheck className="size-3.5" />
                        Insured Oahu LG &amp; GE Window AC Specialists • Waipahu Warehouse Direct
                    </div>
                    <h3 className="text-2xl md:text-3xl font-header font-black text-white uppercase tracking-wide">
                        Don&apos;t See Your Neighborhood Listed?
                    </h3>
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
                        We dispatch specialist LG &amp; GE window AC technicians across all Oahu residential communities from Hawaii Kai to Haleiwa. Call our Waipahu office directly or request a consultation with zero upfront payment.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <a 
                            href="tel:808-488-1111" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-header font-bold text-sm tracking-wider uppercase hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                        >
                            <LucideIcons.Phone className="size-4" />
                            Call (808) 488-1111
                        </a>
                        <Link 
                            href="/contact" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-header font-bold text-sm tracking-wider uppercase hover:bg-slate-700 hover:border-cyan-500/40 transition-all"
                        >
                            Schedule Consultation
                            <LucideIcons.ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>

                <WindowAcQuickShop
                    title="In-Stock Waipahu LG & GE Window Air Conditioners ($395–$1,200)"
                    subheading="Available for Free Waipahu Pickup by appointment or $50 flat-rate delivery across all 22 Oahu communities."
                />

                <ReviewsPavilion variant="compact" title="Verified Oahu Homeowner Reviews Across All 22 Service Areas" subtitle="Rated 4.9★ across 142+ installations, cleanings & warehouse pickups island-wide" limit={6} />

                <OahuEEATAuthorityBar topicTitle="Oahu Island-Wide LG & GE Window AC Sales, Installation & Cleaning Coverage Directory" />
            </div>

            <BackToTop visible={true} />
        </main>
    );
}
