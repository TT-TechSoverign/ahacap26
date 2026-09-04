'use client';

import React from 'react';
import Image from 'next/image';
import { useContent } from '@/lib/context/ContentContext';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { BackToTop } from '@/components/BackToTop';

export default function ServiceAreasPage() {
    const { content } = useContent();
    const serviceAreas = (content as any)?.landing_legacy?.service_areas;

    if (!serviceAreas || !serviceAreas.regions) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
                <h1 className="text-3xl font-header font-bold text-white mb-4">Service Areas Not Found</h1>
                <p className="text-slate-400">Please check the content configuration.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans pb-24 relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
            {/* Dark background grid texture overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* Header Section */}
            <div className="relative z-10 pt-[140px] md:pt-[165px] lg:pt-[175px] pb-16 px-6 md:px-12 max-w-7xl mx-auto">
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
                </div>
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
                        <div key={region.id} className="scroll-mt-32" id={region.id}>
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
            </div>

            <BackToTop visible={true} />
        </div>
    );
}
