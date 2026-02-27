'use client';

import React from 'react';
import Image from 'next/image';
import { useContent } from '@/lib/context/ContentContext';
import * as LucideIcons from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';

export default function ServiceAreasPage() {
    const { content } = useContent();
    const serviceAreas = (content as any)?.landing_legacy?.service_areas;

    if (!serviceAreas || !serviceAreas.regions) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-8">
                <h1 className="text-3xl font-header font-bold text-white mb-4">Service Areas Not Found</h1>
                <p className="text-slate-400">Please check the content configuration.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F172A] font-sans pb-24 relative overflow-hidden">
            {/* Dark background grid texture overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* Header Section */}
            <div className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="inline-block border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-4 py-1.5 rounded-sm">
                        <span className="text-[#00E5FF] font-bold tracking-widest text-xs uppercase shadow-sm">
                            {serviceAreas.badge || "Island-Wide Coverage"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-header font-black tracking-widest text-white uppercase drop-shadow-lg">
                        {serviceAreas.title} <span className="text-[#00E5FF]">{serviceAreas.title_highlight}</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                    <p className="max-w-3xl mx-auto text-slate-300 md:text-lg tracking-wide leading-relaxed font-light">
                        {serviceAreas.description}
                    </p>
                </div>
            </div>

            {/* Regions Layout */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
                {serviceAreas.regions.map((region: any, index: number) => {
                    // Safe dynamic icon rendering for region header
                    let RegionIcon = LucideIcons.MapPin;
                    if (region.icon && region.icon in LucideIcons) {
                        RegionIcon = (LucideIcons as any)[region.icon];
                    }

                    return (
                        <div key={region.id} className="scroll-mt-32" id={region.id}>
                            {/* Region Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <RegionIcon className="w-8 h-8 text-[#00E5FF]" />
                                <h2 className="text-3xl md:text-4xl font-header font-bold tracking-wider text-white uppercase">
                                    {region.title}
                                </h2>
                                <div className="flex-1 h-px bg-slate-800 ml-4 hidden md:block"></div>
                            </div>

                            {/* City Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {region.cities && region.cities.map((city: any, cityIndex: number) => {
                                    
                                    // Safe dynamic icon rendering for city cards
                                    let CityIcon = LucideIcons.MapPin;
                                    if (city.icon && city.icon in LucideIcons) {
                                        CityIcon = (LucideIcons as any)[city.icon];
                                    }

                                    return (
                                        <div 
                                            key={cityIndex} 
                                            className="group bg-slate-900 border border-slate-800 rounded-sm p-6 md:p-8 hover:border-[#00E5FF]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                                        >
                                            {/* Top right decorative accent */}
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="p-3 bg-slate-950 border border-slate-800 rounded-sm text-[#00E5FF] group-hover:bg-[#00E5FF]/10 transition-colors duration-300">
                                                    <CityIcon className="w-6 h-6" strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-xl font-header font-bold text-white tracking-widest uppercase mt-2">
                                                    {city.name}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-slate-400 text-sm leading-relaxed font-light flex-grow">
                                                {city.description}
                                            </p>

                                            <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] text-[#00E5FF] uppercase tracking-widest font-bold">Available Now</span>
                                                <LucideIcons.ArrowRight className="w-4 h-4 text-[#00E5FF]" />
                                            </div>
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
