'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ArrowRight, ShieldCheck, Sun, Building2, Trees, Wind } from 'lucide-react';

interface CityItem {
    name: string;
    slug: string;
}

interface RegionGroup {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    cities: CityItem[];
}

const OAHU_REGIONS: RegionGroup[] = [
    {
        title: 'Metro Honolulu',
        description: 'Dense urban high-rises, historic single-wall residences, and coastal condos.',
        icon: Building2,
        accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
        cities: [
            { name: 'Honolulu', slug: 'honolulu' },
            { name: 'Kalihi', slug: 'kalihi' },
            { name: 'Manoa', slug: 'manoa' },
            { name: 'Kaimuki', slug: 'kaimuki' },
            { name: 'Hawaii Kai', slug: 'hawaii-kai' },
            { name: 'Salt Lake', slug: 'salt-lake' },
            { name: 'Aina Haina', slug: 'aina-haina' },
            { name: 'Kahala', slug: 'kahala' },
            { name: 'McCully', slug: 'mccully' },
            { name: 'Makiki', slug: 'makiki' }
        ]
    },
    {
        title: 'Leeward & West Oahu',
        description: 'High afternoon sun exposure, master-planned developments, and Waipahu shop base.',
        icon: Sun,
        accentColor: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
        cities: [
            { name: 'Kapolei', slug: 'kapolei' },
            { name: 'Ewa Beach', slug: 'ewa-beach' },
            { name: 'Waipahu', slug: 'waipahu' },
            { name: 'Kunia', slug: 'kunia' }
        ]
    },
    {
        title: 'Central Oahu',
        description: 'Upland residential communities, cooler evening trade winds, and family neighborhoods.',
        icon: Trees,
        accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
        cities: [
            { name: 'Aiea', slug: 'aiea' },
            { name: 'Pearl City', slug: 'pearl-city' },
            { name: 'Mililani', slug: 'mililani' },
            { name: 'Waipio Gentry', slug: 'waipio-gentry' },
            { name: 'Waikele', slug: 'waikele' }
        ]
    },
    {
        title: 'Windward Oahu',
        description: 'Lush tropical rainfall, high humidity, and marine salt air along the coastline.',
        icon: Wind,
        accentColor: 'text-teal-400 border-teal-500/30 bg-teal-950/20',
        cities: [
            { name: 'Kailua', slug: 'kailua' },
            { name: 'Kaneohe', slug: 'kaneohe' },
            { name: 'Kahaluu', slug: 'kahaluu' }
        ]
    }
];

export function HomeServiceAreasHub() {
    return (
        <section className="relative py-16 px-4 bg-slate-950 border-t border-slate-800/80">
            {/* Background Map Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                        <Navigation className="size-3 text-cyan-400" />
                        22 Oahu Neighborhoods • Licensed Island Dispatch
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-header font-black text-white uppercase tracking-tight">
                        Serving Every Corner of Oahu
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-slate-300">
                        Our technicians are stationed across the island. From Kapolei to Hawaii Kai and Kailua to Mililani, get fast local response times and zero mainland waiting.
                    </p>
                </div>

                {/* 4 Regional Hub Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {OAHU_REGIONS.map((region, rIdx) => {
                        const Icon = region.icon;
                        return (
                            <div
                                key={rIdx}
                                className="bg-slate-900/60 border border-white/10 hover:border-primary/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,174,239,0.1)] backdrop-blur-md"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${region.accentColor}`}>
                                            <Icon className="size-4" />
                                        </div>
                                        <h3 className="font-header font-black text-white text-base uppercase tracking-wide">
                                            {region.title}
                                        </h3>
                                    </div>

                                    <p className="font-sans text-xs text-slate-400 mb-5 leading-relaxed">
                                        {region.description}
                                    </p>

                                    {/* City Pills List */}
                                    <div className="space-y-1.5 border-t border-white/5 pt-4">
                                        {region.cities.map((city, cIdx) => (
                                            <Link
                                                key={cIdx}
                                                href={`/service-areas/${city.slug}`}
                                                className="group/city flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-primary/30 transition-all text-xs text-slate-300 hover:text-white"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="size-3 text-primary group-hover/city:text-cyan-300 transition-colors" />
                                                    <span className="font-medium">{city.name}</span>
                                                </div>
                                                <ArrowRight className="size-3 text-slate-500 group-hover/city:text-primary group-hover/city:translate-x-0.5 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5">
                                    <Link
                                        href={`/service-areas/${region.cities[0].slug}`}
                                        className="text-[11px] font-mono font-bold text-primary hover:text-cyan-300 inline-flex items-center gap-1 group"
                                    >
                                        <span>Explore {region.title} Hub</span>
                                        <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Local Dispatch Banner */}
                <div className="mt-12 bg-gradient-to-r from-slate-900 via-primary/10 to-slate-900 border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Same-Island Dispatch Available Mon–Sat</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-header font-black text-white uppercase tracking-tight">
                            Don't See Your Specific Neighborhood?
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl">
                            We provide service, estimates, and window AC deliveries across the entire island of Oahu. Call our dispatch desk to confirm technician availability for your street.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="tel:808-488-1111"
                            className="px-6 py-3.5 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Call (808) 488-1111
                        </a>
                        <Link
                            href="/contact"
                            className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 transition-colors"
                        >
                            Contact Form
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
