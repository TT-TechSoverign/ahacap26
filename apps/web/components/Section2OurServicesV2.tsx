'use client';

import Image from 'next/image';
import Link from 'next/link';
import contentData from '../lib/content/content.json';
import { cn } from '@/lib/utils';

export default function Section2OurServicesV2() {

    const services = [
        {
            id: 'mini_split',
            defaultTitle: 'Mini Split AC',
            defaultDesc: 'Whisper-quiet, ductless cooling for ultimate efficient comfort in any room.',
            cleanImage: '/assets/yelpphotos/yelp9.jpg',
            link: '/contact'
        },
        {
            id: 'window_shop',
            defaultTitle: 'Window AC Shop',
            defaultDesc: 'Browse our massive inventory of LG & GE units, ready for immediate pickup.',
            cleanImage: '/assets/hero-cards/unit-lg-plexiglass-installation.jpg',
            link: '/contact'
        },
        {
            id: 'mini_split_maintenance',
            defaultTitle: 'Mini Split AC Maintenance',
            defaultDesc: 'Deep cleaning and professional service to keep your ductless system mold-free and efficient.',
            cleanImage: '/assets/yelpphotos/yelp13.jpg',
            link: '/contact'
        },
        {
            id: 'window_maintenance',
            defaultTitle: 'Window AC Maintenance',
            defaultDesc: 'EPA-certified deep cleaning to restore efficiency and air quality.',
            cleanImage: '/assets/hero-cards/window-ac-maintenance-foam-front-1.jpg',
            link: '/contact'
        }
    ];

    return (
        <section className="relative w-full bg-white overflow-hidden py-12 md:py-16">

            {/* Header Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 px-6">
                <h2 className="relative inline-block font-header font-black text-4xl md:text-6xl text-slate-900 uppercase tracking-tighter mb-4 pb-6">
                    <span className="text-slate-900">
                        Premium Cooling
                    </span>{" "}
                    <span className="text-cyan-500 drop-shadow-sm">
                        Solutions
                    </span>

                    {/* Glow Underline - Centered & Matches Section 3 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] rounded-full" />
                </h2>

                <p className="font-sans text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                    {contentData.home_v2?.services_header?.narrative || "We don’t just sell ACs—we provide complete climate ecosystems. Whether you need a whisper-quiet mini-split for your bedroom or an industrial fleet for your property, we have the inventory and expertise to keep you cool."}
                </p>
            </div>

            {/* Interactive Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px] max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="relative group h-[280px] md:h-full overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-slate-900"
                        >
                            {/* Background Image - Restored Visibility */}
                            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src={service.cleanImage}
                                    alt={service.defaultTitle}
                                    fill
                                    className="object-cover object-center opacity-90 group-hover:opacity-60 group-hover:blur-[3px] transition-all duration-700"
                                />
                                {/* Refined Gradient: Stronger at bottom/center for text readability, but transparent enough to see image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 transition-all duration-500">
                                {/* Title with Cyan Glow & Underline */}
                                <div className="transform transition-transform duration-500 flex flex-col items-center group-hover:-translate-y-2">
                                    <h3 className="font-header font-black text-2xl md:text-4xl text-white uppercase tracking-tighter mb-1 drop-shadow-lg transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                                        {/* @ts-ignore */}
                                        {contentData.home_v2?.services?.[service.id]?.title || service.defaultTitle}
                                    </h3>
                                    {/* Subtle Animated Underline */}
                                    <div className="w-8 h-1 bg-cyan-500/0 group-hover:bg-cyan-400 rounded-full mb-3 transition-all duration-500 group-hover:w-16 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                                    {/* Description - Hidden by default, reveals on hover */}
                                    <div className="max-w-xs mx-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 mb-6">
                                        <p className="font-sans text-slate-100 text-base md:text-lg leading-snug drop-shadow-md font-medium">
                                            {/* @ts-ignore */}
                                            {contentData.home_v2?.services?.[service.id]?.description || service.defaultDesc}
                                        </p>
                                    </div>

                                    {/* CTA Button - Hidden by default, reveals on hover */}
                                    <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                        <Link
                                            href={service.link}
                                            className={cn(
                                                "inline-flex items-center gap-2 px-6 py-2.5 border-2 border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-black uppercase tracking-widest text-xs md:text-sm rounded-full transition-all duration-300 hover:bg-slate-900/80 backdrop-blur-sm"
                                            )}
                                        >
                                            <span>Learn More</span>
                                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
