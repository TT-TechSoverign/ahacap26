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
            <div className="pt-[140px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-oswald uppercase tracking-tight text-white mb-4">
                        Mini Split AC Maintenance
                    </h1>
                </div>

                {/* Hero Cards (Comparison) - side-by-side flex layout (md:flex-row) */}
                <div className="flex flex-col md:flex-row gap-8 mb-24">
                    {/* Basic Service */}
                    <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800">
                            <Image 
                                src="https://placehold.co/800x800/222222/666666?text=Basic+Service" 
                                alt="Basic Mini Split AC Service" 
                                fill 
                                className="object-cover scale-[1.2] transition-transform duration-700 hover:scale-[1.25]"
                            />
                        </div>
                        <div className="p-8">
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
                    </div>

                    {/* Premium Service */}
                    <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800">
                            <Image 
                                src="https://placehold.co/800x800/1e293b/0ea5e9?text=Premium+Service" 
                                alt="Premium Mini Split AC Service" 
                                fill 
                                className="object-cover scale-[1.2] transition-transform duration-700 hover:scale-[1.25]"
                            />
                        </div>
                        <div className="p-8">
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
                    </div>
                </div>

                {/* Vertical Service Sections */}
                <div className="space-y-16">
                    {Object.entries(data.sections).map(([key, section]: [string, any], index: number) => (
                        <div key={key} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 group`}>
                            {/* Visual Placeholder (1200x800px) */}
                            <div className="flex-1 w-full relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-800 shadow-xl bg-slate-800">
                                <Image 
                                    src={`https://placehold.co/1200x800/222222/666666?text=${encodeURIComponent(section.title)}`}
                                    alt={section.title}
                                    fill
                                    className="object-cover scale-[1.2] transition-transform duration-700 group-hover:scale-[1.25]"
                                />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <h3 className="text-3xl md:text-4xl font-black font-oswald uppercase tracking-tight text-primary">
                                    {section.title}
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
