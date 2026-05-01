'use client';

import React from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import * as LucideIcons from 'lucide-react';

interface LocalServiceFunnelProps {
    city: string;
}

export default function LocalServiceFunnel({ city }: LocalServiceFunnelProps) {
    const fireAnalytics = (category: string) => {
        sendGAEvent('event', 'generate_lead', {
            event_category: category,
            event_label: `${city} Page`
        });
    };

    const services = [
        {
            id: 'mini-split-installs',
            title: 'Mini-Split Installs',
            description: `Whisper-quiet, highly efficient ductless cooling designed specifically for your home in ${city}.`,
            icon: LucideIcons.Fan,
            ctaText: 'GET A FREE QUOTE',
            route: `/contact?city=${encodeURIComponent(city)}&service=Mini+Split+Estimate+(New)`,
            gaCategory: 'Split Service',
            ariaLabel: `Get a free quote for mini-split installation in ${city}`
        },
        {
            id: 'mini-split-cleaning',
            title: 'Mini-Split AC Cleaning',
            description: `Deep cleaning and professional sanitization to keep your ductless system mold-free and efficient in ${city}.`,
            icon: LucideIcons.Sparkles,
            ctaText: 'BOOK A CLEANING',
            route: `/mini_split_ac_maintenance?city=${encodeURIComponent(city)}`,
            gaCategory: 'Split Cleaning',
            ariaLabel: `Book a mini-split AC cleaning service in ${city}`
        },
        {
            id: 'window-ac-upgrades',
            title: 'Window AC Upgrades',
            description: `Premium window AC units stocked locally and ready for fast delivery to ${city}. Upgrade your cooling today.`,
            icon: LucideIcons.Store,
            ctaText: 'SHOP LOCAL INVENTORY',
            route: `/shop`,
            gaCategory: 'Retail',
            ariaLabel: `Shop local window AC inventory for ${city}`
        },
        {
            id: 'window-ac-cleaning',
            title: 'Window AC Cleaning',
            description: `Complete teardown and chemical cleaning to eradicate salt-air corrosion and restore peak airflow in ${city}.`,
            icon: LucideIcons.Droplets,
            ctaText: 'BOOK A CLEANING',
            route: `/window_ac_maintenance?city=${encodeURIComponent(city)}`,
            gaCategory: 'Window Cleaning',
            ariaLabel: `Book a window AC deep cleaning service in ${city}`
        }
    ];

    return (
        <section data-version="v28.2" className="relative w-full bg-[#0F172A] py-20 px-6 border-t border-white/5 overflow-hidden">
            {/* Dark background grid texture overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-3xl md:text-5xl font-header font-black tracking-widest text-white uppercase drop-shadow-lg">
                        Reliable AC Services in <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">{city}</span>
                    </h2>
                    <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div 
                                key={service.id} 
                                className="w-full group bg-slate-900 border border-slate-800 rounded-sm p-6 md:p-8 hover:border-[#00E5FF]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                            >
                                {/* Top right decorative accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="flex flex-col items-center gap-4 mb-6">
                                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-sm text-[#00E5FF] group-hover:bg-[#00E5FF]/10 transition-colors duration-300">
                                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-header font-bold text-white tracking-widest uppercase mt-2">
                                        {service.title}
                                    </h3>
                                </div>
                                
                                <p className="text-slate-300 text-sm leading-relaxed font-light flex-grow">
                                    {service.description}
                                </p>

                                <Link 
                                    href={service.route}
                                    onClick={() => fireAnalytics(service.gaCategory)}
                                    aria-label={service.ariaLabel}
                                    className="mt-8 pt-6 w-full border-t border-slate-800/50 flex justify-center items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity hover:text-[#00E5FF] cursor-pointer"
                                >
                                    <span className="text-[10px] text-[#00E5FF] uppercase tracking-widest font-bold">{service.ctaText}</span>
                                    <LucideIcons.ArrowRight className="w-4 h-4 text-[#00E5FF]" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
