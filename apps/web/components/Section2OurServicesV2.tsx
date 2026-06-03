'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import contentData from '../lib/content/content.json';
import { cn } from '@/lib/utils';

const MotionLink = motion(Link);

export default function Section2OurServicesV2() {

    const services = [
        {
            id: 'mini_split',
            defaultTitle: 'Mini Split AC',
            defaultDesc: 'Whisper-quiet, ductless cooling for ultimate efficient comfort in any room.',
            cleanImage: '/assets/yelpphotos/yelp9.jpg',
            link: '/mini_split_ac'
        },
        {
            id: 'window_shop',
            defaultTitle: 'Window AC Store',
            defaultDesc: 'Browse our massive inventory of LG & GE units.',
            cleanImage: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-herobg-solutions.svg',
            link: '/shop'
        },
        {
            id: 'mini_split_maintenance',
            defaultTitle: 'Mini Split AC Maintenance',
            defaultDesc: 'Deep cleaning and professional service to keep your ductless system mold-free and efficient.',
            cleanImage: '/assets/yelpphotos/mini-split-blowerwheel-dirty-clean-1.svg',
            link: '/mini_split_ac_maintenance'
        },
        {
            id: 'window_maintenance',
            defaultTitle: 'Window AC Maintenance',
            defaultDesc: 'Cleaning to restore efficiency and air quality.',
            cleanImage: '/assets/yelpphotos/window-ac-maintenance-card-bg.svg',
            link: '/window_ac_maintenance'
        }
    ];

    return (
        <section className="relative w-full bg-transparent pb-12 md:pb-16 pt-0">

            {/* Background Image Removed - Now Global in page.tsx */}

            {/* Header Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-6 px-6">
                <h1 className="sr-only">Affordable Air Conditioning & Ductless Mini Split Installation in Hawaii</h1>
                <h2 className="relative inline-block font-header font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-4 pb-6">
                    <span className="text-white">
                        Our Core
                    </span>{" "}
                    <span className="text-cyan-500 drop-shadow-sm">
                        Services
                    </span>

                    {/* Glow Underline - Centered & Matches Section 3 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] rounded-full" />
                </h2>

                <p className="font-sans text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-md">
                    {contentData.landing?.services_header?.narrative}
                </p>
            </div>

            {/* Interactive Grid */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[420px] max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <MotionLink
                            key={service.id}
                            href={service.link}
                            whileHover={{ y: -6, scale: 1.015 }}
                            whileTap={{ scale: 0.98 }}
                            className="block relative group h-[280px] md:h-full overflow-hidden rounded-2xl border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] md:border-white/20 md:shadow-2xl md:hover:border-cyan-500/30 md:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500"
                        >
                            {/* Background Image - Restored Visibility */}
                            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src={service.cleanImage}
                                    alt={service.defaultTitle}
                                    fill
                                    className="object-cover object-center opacity-80 group-hover:opacity-60 md:group-hover:blur-[2px] transition-all duration-700"
                                />
                                {/* Primary Dark Blue Overlay (Fixed 20%) */}
                                <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-20" />

                                {/* Refined Gradient: Stronger at bottom/center for text readability, but transparent enough to see image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/20 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />
                            </div>

                            {/* Content Wrapper - Centered Vertically */}
                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">

                                {/* Title with Cyan Glow & Underline */}
                                <h3 className="font-header font-black text-xl md:text-3xl text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] md:text-white uppercase tracking-tighter mb-2 drop-shadow-lg transition-all duration-300 md:group-hover:text-cyan-400 md:group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                                    {(contentData.landing?.services?.[service.id as keyof typeof contentData.landing.services]?.title || service.defaultTitle)}
                                </h3>
                                {/* Subtle Animated Underline */}
                                <div className="w-20 h-1 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] mb-4 md:w-12 md:bg-cyan-500/0 md:mb-0 md:group-hover:bg-cyan-400 rounded-full transition-all duration-500 md:group-hover:w-20 md:group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] md:group-hover:mb-4" />

                                {/* Expandable Content (Description & CTA) - Fully visible on mobile, expandable hover on desktop */}
                                <div className="max-h-[300px] opacity-100 md:max-h-0 md:opacity-0 md:overflow-hidden md:transition-all md:duration-700 md:ease-[cubic-bezier(0.25,0.8,0.25,1)] md:group-hover:max-h-[300px] md:group-hover:opacity-100 flex flex-col items-center">
                                    <p className="font-sans text-slate-100 text-base md:text-lg leading-snug drop-shadow-md font-medium mb-6 max-w-xs">
                                        {/* Force local content effectively for Shop to ensure link/title integrity */}
                                        {(contentData.landing?.services?.[service.id as keyof typeof contentData.landing.services]?.description || service.defaultDesc)}
                                    </p>

                                    <div
                                        className={cn(
                                            "inline-flex items-center gap-2 px-6 py-2.5 border-2 border-cyan-400/85 text-cyan-300 font-black uppercase tracking-widest text-xs md:text-sm rounded-full bg-slate-900/80 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)] md:border-white/20 md:text-white md:bg-transparent md:shadow-none md:group-hover:border-cyan-400 md:group-hover:text-cyan-400 md:group-hover:bg-slate-900/80 md:group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
                                        )}
                                    >
                                        <span>Learn More</span>
                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </MotionLink>
                    ))}
                </div>
            </div>
        </section>
    );
}
