'use client';

import Image from 'next/image';
import { useContent } from '@/lib/context/ContentContext';

export default function MiniSplitACMaintenancePage() {
    const { content } = useContent();
    const data = content?.mini_split_ac_maintenance;

    if (!data) return null;

    return (
        <div className="bg-background-dark min-h-screen text-white font-sans">
            {/* Using pt-[140px] to match the global header offset seen in other pages, and ensure it clears over the header. */}
            <div className="pt-[140px] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-oswald uppercase tracking-tight text-white mb-4">
                        Mini Split AC Maintenance
                    </h1>
                </div>

                {/* Hero Cards (Comparison) - side-by-side flex layout (md:flex-row) */}
                <div className="flex flex-col md:flex-row gap-8 mb-24">
                    {/* Basic Service */}
                    <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800 group/image">
                            <Image 
                                src="/assets/minisplitacphotos/mini-split-basic-maintenance.png" 
                                alt="Basic Mini Split AC Service Before and After" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                            />
                            {/* Blend Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                            
                            {/* Center Divider Line */}
                            <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/10 pointer-events-none"></div>

                            {/* Before/After Labels */}
                            <div className="absolute inset-0 flex pointer-events-none">
                                <div className="w-1/2 flex items-end justify-end pr-2 md:pr-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-200">Before</span>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-end justify-start pl-2 md:pl-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-200">After</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 flex-1">
                            <h2 className="text-3xl font-black font-oswald uppercase tracking-tight text-primary mb-4">
                                {data.hero_basic.title}
                            </h2>
                            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                {data.hero_basic.description}
                            </p>
                            <ul className="space-y-3">
                                {data.hero_basic.checklist.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary mt-1 shrink-0">check_circle</span>
                                        <span className="text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cutout Price & CTA Section */}
                        <div className="px-8 pb-8 mt-auto">
                            <div className="border-t-2 border-dashed border-slate-700/50 relative pt-8 mt-2">
                                {/* Side Cutouts */}
                                <div className="absolute -top-[17px] -left-[49px] w-8 h-8 rounded-full bg-background-dark border-r-2 border-slate-700/50 pointer-events-none z-10"></div>
                                <div className="absolute -top-[17px] -right-[49px] w-8 h-8 rounded-full bg-background-dark border-l-2 border-slate-700/50 pointer-events-none z-10"></div>

                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl md:text-5xl font-black font-oswald text-white tracking-tight">$175</span>
                                        <span className="text-slate-400 font-medium mb-1.5 object-bottom tracking-wide">/ unit</span>
                                    </div>
                                </div>
                                <a href="/contact" className="group/btn flex items-center justify-center gap-2 w-full py-4 px-6 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]">
                                    Schedule Basic Service
                                    <span className="material-symbols-outlined transform transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Premium Service */}
                    <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800 group/image">
                            <Image 
                                src="/assets/minisplitacphotos/mini-split-premium-maintenance-before-after-800x800.png" 
                                alt="Premium Mini Split AC Service Before and After" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                            />
                            {/* Blend Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                            
                            {/* Center Divider Line */}
                            <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/10 pointer-events-none"></div>

                            {/* Before/After Labels */}
                            <div className="absolute inset-0 flex pointer-events-none">
                                <div className="w-1/2 flex items-end justify-end pr-2 md:pr-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-200">Before</span>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-end justify-start pl-2 md:pl-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-200">After</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 flex-1">
                            <h2 className="text-3xl font-black font-oswald uppercase tracking-tight text-primary mb-4">
                                {data.hero_premium.title}
                            </h2>
                            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                {data.hero_premium.description}
                            </p>
                            <ul className="space-y-3">
                                {data.hero_premium.checklist.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary mt-1 shrink-0">check_circle</span>
                                        <span className="text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cutout Price & CTA Section */}
                        <div className="px-8 pb-8 mt-auto">
                            <div className="border-t-2 border-dashed border-slate-700/50 relative pt-8 mt-2">
                                {/* Side Cutouts */}
                                <div className="absolute -top-[17px] -left-[49px] w-8 h-8 rounded-full bg-background-dark border-r-2 border-slate-700/50 pointer-events-none z-10"></div>
                                <div className="absolute -top-[17px] -right-[49px] w-8 h-8 rounded-full bg-background-dark border-l-2 border-slate-700/50 pointer-events-none z-10"></div>

                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl md:text-5xl font-black font-oswald text-white tracking-tight">$275</span>
                                        <span className="text-slate-400 font-medium mb-1.5 tracking-wide">/ unit</span>
                                    </div>
                                </div>
                                <a href="/contact" className="group/btn flex items-center justify-center gap-2 w-full py-4 px-6 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]">
                                    Schedule Premium Service
                                    <span className="material-symbols-outlined transform transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2x2 Service Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(data.sections).map(([key, section]: [string, any]) => {
                        // Map specific keys to relevant material symbols
                        const iconMap: Record<string, string> = {
                            deep_clean: 'cleaning_services',
                            energy: 'bolt',
                            air_quality: 'air',
                            salt_dust: 'water_drop',
                        };
                        const icon = iconMap[key] || 'verified_user';

                        return (
                            <div key={key} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 lg:p-10 shadow-xl flex flex-col items-center text-center group hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black font-oswald uppercase tracking-tight text-white mb-4">
                                    {section.title}
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    {section.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
