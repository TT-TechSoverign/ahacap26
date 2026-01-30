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
        <section className="relative w-full bg-slate-900 border-t border-slate-800">
            {/* Header Section */}
            <div className="relative py-24 px-6 md:px-12 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />
                    {/* Subtle grid pattern or similar could go here */}
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="font-header font-black text-4xl md:text-6xl text-white uppercase tracking-tighter mb-8">
                        <span className="text-white">
                            <EditableText contentKey="home_v2.services_header.title" defaultValue="ELITE COOLING" />
                        </span>
                        <span className="block text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            <EditableText contentKey="home_v2.services_header.title_highlight" defaultValue="SOLUTIONS" />
                        </span>
                    </h2>

                    <div className="font-sans text-xl text-slate-300 leading-relaxed font-medium">
                        <EditableText
                            contentKey="home_v2.services_header.narrative"
                            as="p"
                            multiLine={true}
                            defaultValue="We don’t just sell ACs—we provide complete climate ecosystems. Whether you need a whisper-quiet mini-split for your bedroom or an industrial fleet for your property, we have the inventory and expertise to keep you cool."
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Grid */}
            {/* Interactive Grid */}
            <div className="container mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px] max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="relative group h-[300px] md:h-full overflow-hidden rounded-2xl border border-slate-800 shadow-2xl"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={service.cleanImage}
                                    alt={service.defaultTitle}
                                    fill
                                    className="object-cover object-center opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                                />
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30 opacity-90" />
                                {/* Cyan Hover Glow */}
                                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/20 transition-colors duration-500 mix-blend-overlay" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 md:p-12 transition-all duration-500">
                                {/* Title */}
                                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                    <h3 className="font-header font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-4 drop-shadow-lg group-hover:text-cyan-400 transition-colors">
                                        <EditableText
                                            contentKey={`home_v2.services.${service.id}.title`}
                                            defaultValue={service.defaultTitle}
                                        />
                                    </h3>

                                    {/* Description */}
                                    <div className="max-w-sm mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500 mb-8">
                                        <EditableText
                                            contentKey={`home_v2.services.${service.id}.description`}
                                            as="p"
                                            multiLine={true}
                                            defaultValue={service.defaultDesc}
                                            className="font-sans text-slate-200 text-lg leading-relaxed"
                                        />
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href={service.link}
                                        className={cn(
                                            "inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-slate-400 text-slate-100 font-bold uppercase tracking-widest text-sm rounded-full transition-all duration-300",
                                            "group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-black group-hover:scale-105",
                                            isEditMode ? "pointer-events-none opacity-50" : ""
                                        )}
                                    >
                                        <span>Learn More</span>
                                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
