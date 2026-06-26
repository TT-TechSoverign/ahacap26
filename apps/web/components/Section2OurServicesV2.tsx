'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import contentData from '../lib/content/content.json';
import { cn } from '@/lib/utils';

export default function Section2OurServicesV2() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        const handleOutsideClick = () => {
            setExpandedCard(null);
        };
        window.addEventListener('click', handleOutsideClick);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleCardClick = (e: React.MouseEvent, serviceId: string) => {
        if (isMobile) {
            if (expandedCard !== serviceId) {
                e.preventDefault();
                setExpandedCard(serviceId);
            }
        }
    };

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
            cleanImage: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg_dual_inverter_thinq_front_herobg_solutions.webp',
            link: '/shop'
        },
        {
            id: 'mini_split_maintenance',
            defaultTitle: 'Mini Split AC Maintenance',
            defaultDesc: 'Deep cleaning and professional service to keep your ductless system mold-free and efficient.',
            cleanImage: '/assets/yelpphotos/mini_split_blowerwheel_dirty_clean_1.webp',
            link: '/mini_split_ac_maintenance'
        },
        {
            id: 'window_maintenance',
            defaultTitle: 'Window AC Maintenance',
            defaultDesc: 'Cleaning to restore efficiency and air quality.',
            cleanImage: '/assets/yelpphotos/window_ac_maintenance_card_bg.webp',
            link: '/window_ac_maintenance'
        }
    ];

    const renderCard = (service: typeof services[0]) => {
        const isExpanded = expandedCard === service.id;
        return (
            <Link
                key={service.id}
                href={service.link}
                prefetch={false}
                onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(e, service.id);
                }}
                className={cn(
                    "block relative group h-[280px] md:h-[400px] overflow-hidden rounded-2xl border transition-all duration-500 transform hover:-translate-y-1.5 hover:scale-[1.015] active:scale-[0.98]",
                    isExpanded
                        ? "border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                        : "border-white/20 shadow-2xl",
                    "md:border-white/20 md:shadow-2xl md:hover:border-cyan-500/30 md:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                )}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                    <Image
                        src={service.cleanImage}
                        alt={service.defaultTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center opacity-80 group-hover:opacity-60 md:group-hover:blur-[2px] transition-all duration-700"
                    />
                    {/* Primary Dark Blue Overlay (Fixed 20%) */}
                    <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-20" />

                    {/* Refined Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/20 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">

                    {/* Title with Cyan Glow & Underline */}
                    <h3 className={cn(
                        "font-header font-black text-xl md:text-3xl uppercase tracking-tighter mb-2 drop-shadow-lg transition-all duration-300",
                        isExpanded ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" : "text-white",
                        "md:text-white md:group-hover:text-cyan-400 md:group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    )}>
                        {(contentData.landing?.services?.[service.id as keyof typeof contentData.landing.services]?.title || service.defaultTitle)}
                    </h3>
                    
                    {/* Subtle Animated Underline */}
                    <div className={cn(
                        "rounded-full transition-all duration-500",
                        isExpanded ? "w-20 h-1 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] mb-4" : "w-12 h-1 bg-cyan-500/0 mb-0",
                        "md:w-12 md:h-1 md:bg-cyan-500/0 md:mb-0 md:group-hover:bg-cyan-400 md:group-hover:w-20 md:group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] md:group-hover:mb-4"
                    )} />

                    {/* Expandable Content (Description & CTA) */}
                    <div
                        className={cn(
                            "overflow-hidden flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
                            isExpanded ? "max-h-[300px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0",
                            "md:max-h-0 md:opacity-0 md:overflow-hidden md:group-hover:max-h-[300px] md:group-hover:opacity-100 md:group-hover:mt-2"
                        )}
                    >
                        <p className="font-sans text-slate-100 text-base md:text-lg leading-snug drop-shadow-md font-medium mb-6 max-w-xs">
                            {(contentData.landing?.services?.[service.id as keyof typeof contentData.landing.services]?.description || service.defaultDesc)}
                        </p>

                        <div
                            className={cn(
                                "inline-flex items-center gap-2 px-6 py-2.5 border-2 rounded-full transition-all duration-300",
                                isExpanded
                                    ? "border-cyan-400 text-cyan-400 bg-slate-900/80 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                    : "border-white/20 text-white",
                                "md:border-white/20 md:text-white md:bg-transparent md:group-hover:border-cyan-400 md:group-hover:text-cyan-400 md:group-hover:bg-slate-900/80 md:group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            )}
                        >
                            <span>Learn More</span>
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform inline-block" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <section id="services" className="scroll-mt-24 relative w-full bg-transparent pb-12 md:pb-16 pt-0">
            {/* Header Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-6 px-6">
                <h2 className="relative inline-block font-header font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-4 pb-6">
                    <span className="text-white">
                        Our Core
                    </span>{" "}
                    <span className="text-cyan-500 drop-shadow-sm">
                        Services
                    </span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] rounded-full" />
                </h2>

                <p className="font-sans text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-md">
                    {contentData.landing?.services_header?.narrative}
                </p>
            </div>

            {/* Interactive Grid arranged in 2 columns for independent vertical expansion */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
                    {/* Left Column: Mini Split AC & Mini Split AC Maintenance */}
                    <div className="flex-1 flex flex-col gap-6">
                        {renderCard(services[0])}
                        {renderCard(services[2])}
                    </div>
                    {/* Right Column: Window AC Store & Window AC Maintenance */}
                    <div className="flex-1 flex flex-col gap-6">
                        {renderCard(services[1])}
                        {renderCard(services[3])}
                    </div>
                </div>
            </div>
        </section>
    );
}
