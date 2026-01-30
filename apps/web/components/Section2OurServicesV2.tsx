'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EditableText } from './EditableText';
import { cn } from '@/lib/utils';
import { useContent } from '../lib/context/ContentContext';

export default function Section2OurServicesV2() {
    const { isEditMode } = useContent();

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
            link: '/shop'
        },
        {
            id: 'central_ac',
            defaultTitle: 'Central AC',
            defaultDesc: 'Complete whole-home climate control systems for new construction and retrofits.',
            cleanImage: '/assets/yelpphotos/yelp13.jpg',
            link: '/contact'
        },
        {
            id: 'window_maintenance',
            defaultTitle: 'Window AC Maintenance',
            defaultDesc: 'EPA-certified deep cleaning to restore efficiency and air quality.',
            cleanImage: '/assets/hero-cards/window-ac-maintenance-foam-front-1.jpg',
            link: '/maintenance'
        }
    ];

    return (
        <section className="relative w-full bg-white overflow-hidden py-12 md:py-16">

            {/* Header Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 px-6">
                <h2 className="font-header font-black text-4xl md:text-6xl text-slate-900 uppercase tracking-tighter mb-4">
                    <span className="text-slate-900">
                        <EditableText contentKey="home_v2.services_header.title" defaultValue="ELITE COOLING" />
                    </span>
                    <span className="block text-cyan-500 drop-shadow-sm">
                        <EditableText contentKey="home_v2.services_header.title_highlight" defaultValue="SOLUTIONS" />
                    </span>
                </h2>

                <div className="font-sans text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                    <EditableText
                        contentKey="home_v2.services_header.narrative"
                        as="p"
                        multiLine={true}
                        defaultValue="We don’t just sell ACs—we provide complete climate ecosystems. Whether you need a whisper-quiet mini-split for your bedroom or an industrial fleet for your property, we have the inventory and expertise to keep you cool."
                    />
                </div>
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
                                    <h3 className="font-header font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-2 drop-shadow-lg transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                                        <EditableText
                                            contentKey={`home_v2.services.${service.id}.title`}
                                            defaultValue={service.defaultTitle}
                                        />
                                    </h3>
                                    {/* Subtle Animated Underline */}
                                    <div className="w-12 h-1 bg-cyan-500/0 group-hover:bg-cyan-400 rounded-full mb-4 transition-all duration-500 group-hover:w-24 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                                    {/* Description - Hidden by default, reveals on hover */}
                                    <div className="max-w-xs mx-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 mb-6">
                                        <EditableText
                                            contentKey={`home_v2.services.${service.id}.description`}
                                            as="p"
                                            multiLine={true}
                                            defaultValue={service.defaultDesc}
                                            className="font-sans text-slate-100 text-base md:text-lg leading-snug drop-shadow-md font-medium"
                                        />
                                    </div>

                                    {/* CTA Button - Hidden by default, reveals on hover */}
                                    <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                        <Link
                                            href={service.link}
                                            className={cn(
                                                "inline-flex items-center gap-2 px-6 py-2.5 border-2 border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-black uppercase tracking-widest text-xs md:text-sm rounded-full transition-all duration-300 hover:bg-slate-900/80 backdrop-blur-sm",
                                                isEditMode ? "pointer-events-none opacity-50" : ""
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
