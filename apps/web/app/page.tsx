'use client';

import { EditableText } from '@/components/EditableText';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { useContent } from '@/lib/context/ContentContext';
import { cn } from '@/lib/utils';
import { Reorder, motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ImageCarousel } from '@/components/ImageCarousel';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BackToTop } from '@/components/BackToTop';
import Navbar from '@/components/Navbar';
import { AdminCalendar } from '@/components/AdminCalendar';

export default function LandingPage() {
    const { content, isEditMode, setLayoutOrder } = useContent();
    const gridData = content?.landing?.services?.grid;
    const services = Array.isArray(gridData) ? gridData : [];

    const sectionOrder = content?.landing?.sections || [
        "hero", "services", "video", "partnerships", "service-areas", "calendar", "warehouse-map"
    ];

    const handleReorder = (newOrder: unknown[]) => {
        setLayoutOrder('landing.services.grid', newOrder);
    };

    const handleSectionReorder = (newOrder: string[]) => {
        setLayoutOrder('landing.sections', newOrder);
    };

    // # Services Card Alignment & Mobile Polish
    // - [x] Center-align card content (Icons, Titles, Descriptions, CTAs)
    // - [x] Refine mobile grid stacking and vertical rhythms
    // - [x] Audit touch-targets and interaction padding on mobile

    // # Service Areas Symmetrization & Editor Access
    // - [x] Inject Service Area data into `content.json`
    // - [x] Refactor `ServiceAreasSection` for center-alignment
    // - [x] Integrate `EditableText` for all region titles and city names
    // - [x] Update regional listings as per user request (Central, Metro, Windward/North, Leeward)

    const sectionMap: Record<string, React.ReactNode> = {
        "hero": <HeroSection isEditMode={isEditMode} />,
        "services": <ServicesSection isEditMode={isEditMode} services={services} handleReorder={handleReorder} />,
        "video": <VideoSection />,
        "partnerships": <PartnershipsSection />,
        "service-areas": <ServiceAreasSection isEditMode={isEditMode} content={content} />,
        "calendar": <CalendarSection />,
        "warehouse-map": <WarehouseSection />
    };

    // --- Sticky-Free Navigation Logic ---
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white min-h-screen">
            <Navbar />

            <main className="pt-[140px] md:pt-[240px]">
                <Reorder.Group
                    axis="y"
                    values={sectionOrder}
                    onReorder={handleSectionReorder}
                    className="flex flex-col"
                >
                    {sectionOrder.map((sectionId) => (
                        <Reorder.Item
                            key={sectionId}
                            value={sectionId}
                            dragListener={isEditMode}
                            className="relative group/section"
                        >
                            {/* Section Reorder Handle */}
                            {isEditMode && (
                                <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/80 border border-white/20 p-2 rounded shadow-2xl opacity-0 group-hover/section:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                                    <span className="material-symbols-outlined text-primary text-sm shadow-[0_0_10px_rgba(0,174,239,1)]">drag_indicator</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{sectionId}</span>
                                </div>
                            )}
                            {sectionMap[sectionId] || null}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </main>

            {/* Footer */}
            {/* Footer */}


            {/* Back to Top (Thumb-Zone Trigger) */}
            {/* Back to Top (Thumb-Zone Trigger) */}
            <BackToTop visible={true} />
        </div>
    );
}


function HeroSection({ isEditMode }: { isEditMode: boolean }) {
    return (
        <section className="relative min-h-[60vh] flex items-center overflow-hidden py-12 lg:py-24 transition-all duration-700">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background-dark to-background-dark pointer-events-none opacity-50"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                <div className="inline-block px-4 py-2 mb-8 bg-accent/10 border border-accent/20 rounded shadow-[0_0_15px_rgba(57,181,74,0.2)] text-accent text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                    <EditableText contentKey="landing.hero.badge" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-header font-black leading-[1.05] md:leading-[1.1] mb-10 text-white uppercase tracking-tight">
                    <EditableText contentKey="landing.hero.title_line1" /> <br />
                    <EditableText contentKey="landing.hero.title_highlight1" className="text-primary neon-glow" /> <br />
                    <EditableText contentKey="landing.hero.title_highlight2" className="text-primary neon-glow" />
                </h1>

                <div className="flex flex-wrap justify-center gap-3 mb-12 lg:gap-4">
                    <div className="px-4 py-2 bg-primary/10 border-l-4 border-primary rounded-r shadow-[0_0_30px_rgba(0,174,239,0.1)] text-white font-header font-bold text-base md:text-xl lg:text-2xl uppercase tracking-wide backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300">
                        <EditableText contentKey="landing.hero.badges.lg" />
                    </div>
                    <div className="px-4 py-2 bg-orange-500/10 border-l-4 border-orange-500 rounded-r shadow-[0_0_30px_rgba(249,115,22,0.1)] text-white font-header font-bold text-base md:text-xl lg:text-2xl uppercase tracking-wide backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300">
                        <EditableText contentKey="landing.hero.badges.licensed" />
                    </div>
                    <div className="px-4 py-2 bg-accent/10 border-l-4 border-accent rounded-r shadow-[0_0_30px_rgba(57,181,74,0.1)] text-white font-header font-bold text-base md:text-xl lg:text-2xl uppercase tracking-wide backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300">
                        <EditableText contentKey="landing.hero.badges.energy" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center items-stretch sm:items-center">
                    <Button size="lg" onClick={(e) => isEditMode && e.preventDefault()} className="px-10 py-6 lg:py-8 h-auto text-sm lg:text-lg font-black tracking-widest shadow-[0_0_30_rgba(0,174,239,0.3)] hover:shadow-[0_0_50px_rgba(0,174,239,0.5)] transition-all" asChild={!isEditMode}>
                        {isEditMode ? (
                            <EditableText contentKey="landing.hero.cta_shop" />
                        ) : (
                            <Link href="/shop?category=WINDOW_AC">
                                <EditableText contentKey="landing.hero.cta_shop" />
                            </Link>
                        )}
                    </Button>
                    <Button variant="outline" size="lg" onClick={(e) => isEditMode && e.preventDefault()} className={cn("px-10 py-6 lg:py-8 h-auto text-sm lg:text-lg font-black tracking-widest border-white/20 hover:bg-white/5 hover:border-white/40 transition-all", isEditMode && "cursor-default")} asChild={!isEditMode}>
                        {isEditMode ? (
                            <EditableText contentKey="landing.hero.cta_estimate" />
                        ) : (
                            <Link href="/contact">
                                <EditableText contentKey="landing.hero.cta_estimate" />
                            </Link>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    );
}

function ServicesSection({ isEditMode, services, handleReorder }: { isEditMode: boolean, services: import('@/types/content').ServiceItem[], handleReorder: (newOrder: import('@/types/content').ServiceItem[]) => void }) {
    return (
        <section className="py-12 md:py-16 lg:py-24 bg-charcoal/30 border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 gap-8 text-center lg:mb-24">
                    <div className="max-w-4xl">
                        <h2 className="mb-6 md:mb-10 font-header font-black text-white uppercase tracking-[-.02em] leading-none text-4xl md:text-6xl">
                            <EditableText contentKey="landing.services.title" /> <br />
                            <EditableText
                                contentKey="landing.services.title_highlight"
                                className="text-primary neon-glow inline-block"
                            />
                        </h2>
                        <div className="relative px-4">
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                            <div className="text-slate-400 text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em] max-w-4xl mx-auto">
                                <EditableText contentKey="landing.services.backlinking.part1" />
                                <Link href="/shop" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
                                    <EditableText contentKey="landing.services.backlinking.link1_text" />
                                </Link>
                                <EditableText contentKey="landing.services.backlinking.part2" />
                                <Link href="/mini-splits" className="text-accent hover:text-white transition-colors underline decoration-accent/30 underline-offset-4">
                                    <EditableText contentKey="landing.services.backlinking.link2_text" />
                                </Link>
                                <EditableText contentKey="landing.services.backlinking.part3" />
                                <Link href="/central-ac" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
                                    <EditableText contentKey="landing.services.backlinking.link3_text" />
                                </Link>
                                <EditableText contentKey="landing.services.backlinking.part4" />
                                <Link href="/maintenance" className="text-accent hover:text-white transition-colors underline decoration-accent/30 underline-offset-4">
                                    <EditableText contentKey="landing.services.backlinking.link4_text" />
                                </Link>
                                <EditableText contentKey="landing.services.backlinking.part5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto w-full">
                <Reorder.Group
                    axis="y"
                    values={services}
                    onReorder={handleReorder}
                    layoutScroll
                    className={cn(
                        "grid grid-cols-1 gap-6 auto-rows-fr md:gap-8",
                        isEditMode ? "max-w-2xl mx-auto" : "sm:grid-cols-2"
                    )}
                >
                    {services.map((item, index) => (
                        <Reorder.Item
                            key={item.id}
                            value={item}
                            dragListener={isEditMode}
                            className="relative h-full"
                            whileDrag={{ scale: 1.02, zIndex: 50 }}
                        >
                            <div className={cn(
                                "relative group flex flex-col items-center text-center gap-8 h-full p-8 overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-700 industrial-card lg:p-10",
                                item.color === 'primary'
                                    ? "border-primary/10 hover:border-primary/40 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)]"
                                    : "border-accent/10 hover:border-accent/40 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)]"
                            )}>
                                {/* Link Overlay for UX Connectivity */}
                                {!isEditMode && (
                                    <Link href={item.href} className="absolute inset-0 z-10" aria-label={item.title}>
                                        <span className="sr-only">{item.title}</span>
                                    </Link>
                                )}

                                {/* Premium Hover Glow */}
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                                    item.color === 'primary'
                                        ? "bg-[radial-gradient(circle_at_50%_0%,rgba(0,174,239,0.1),transparent_70%)]"
                                        : "bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_70%)]"
                                )}></div>
                                {/* Draggable Neon Handle */}
                                {isEditMode && (
                                    <div className="absolute top-4 left-4 size-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-20">
                                        <div className="flex flex-col gap-0.5">
                                            <div className="w-4 h-0.5 bg-primary/50 shadow-[0_0_5px_rgba(0,174,239,1)]"></div>
                                            <div className="w-4 h-0.5 bg-primary/50 shadow-[0_0_5px_rgba(0,174,239,1)]"></div>
                                            <div className="w-4 h-0.5 bg-primary/50 shadow-[0_0_5px_rgba(0,174,239,1)]"></div>
                                        </div>
                                    </div>
                                )}

                                {item.badge && (
                                    <div className="absolute top-4 right-4 bg-primary/20 border border-primary/50 text-table-primary text-[9px] font-black px-3 py-1 rounded shadow-[0_0_10px_rgba(0,174,239,0.2)] tracking-[0.2em] uppercase">
                                        <EditableText contentKey={`landing.services.grid.${index}.badge`} />
                                    </div>
                                )}

                                <div className={cn(
                                    "transition-transform duration-500 group-hover:scale-110",
                                    item.color === 'primary' ? "text-primary" : "text-accent"
                                )}>
                                    <span className={cn(
                                        "material-symbols-outlined text-4xl lg:text-5xl",
                                        item.color === 'primary' ? "drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]" : "drop-shadow-[0_0_10px_rgba(57,181,74,0.5)]"
                                    )}>{item.icon}</span>
                                </div>

                                <div className="flex-1 flex flex-col items-center">
                                    <h3 className={cn(
                                        "text-xl font-header font-bold text-white mb-3 uppercase tracking-wide transition-colors",
                                        item.color === 'primary' ? "group-hover:text-primary" : "group-hover:text-accent"
                                    )}>
                                        <EditableText contentKey={`landing.services.grid.${index}.title`} />
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 italic max-w-[280px] md:max-w-none">
                                        <EditableText contentKey={`landing.services.grid.${index}.description`} />
                                    </p>
                                    <div className={cn(
                                        "flex items-center justify-center gap-2 text-[10px] font-black tracking-widest group-hover:gap-4 transition-all uppercase border-t border-white/5 pt-4 w-full",
                                        item.color === 'primary' ? "text-primary" : "text-accent"
                                    )}>
                                        <EditableText contentKey={`landing.services.grid.${index}.link`} /> <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </section>
    );
}

function GallerySection({ slides }: { slides: import('@/types/content').CarouselSlide[] }) {
    return <ImageCarousel slides={slides} />;
}

function VideoSection() {
    return (
        <section className="py-10 md:py-16 bg-background-dark overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-black group">
                    <video
                        src="/hero.mp4"
                        controls
                        playsInline
                        className="object-cover w-full h-full"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}

function PartnershipsSection() {
    return (
        <section className="bg-charcoal/50 border-y border-white/5 py-24 md:py-32 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* 1. Header Block */}
                <div className="text-center mb-16">
                    <h2 className="text-white font-header font-black text-4xl md:text-6xl mb-4 tracking-[-.02em] leading-none uppercase">
                        <EditableText contentKey="landing.partnerships.title" />
                    </h2>
                    <h3 className="text-primary font-header font-bold text-lg md:text-2xl uppercase tracking-widest neon-glow drop-shadow-[0_0_20px_rgba(0,174,239,0.5)]">
                        <EditableText contentKey="landing.partnerships.title_highlight" />
                    </h3>
                </div>

                {/* 2. Narrative Anchor */}
                <div className="relative max-w-4xl mx-auto mb-20 px-4">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                    <p className="text-slate-400 text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em] relative z-10">
                        <EditableText contentKey="landing.partnerships.backlinking.part1" />
                        <Link href="/contact" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
                            <EditableText contentKey="landing.partnerships.backlinking.link1_text" />
                        </Link>
                        <EditableText contentKey="landing.partnerships.backlinking.part2" />
                        <Link href="/contact" className="text-accent hover:text-white transition-colors underline decoration-accent/30 underline-offset-4">
                            <EditableText contentKey="landing.partnerships.backlinking.link2_text" />
                        </Link>
                        <EditableText contentKey="landing.partnerships.backlinking.part3" />
                        <Link href="/contact" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
                            <EditableText contentKey="landing.partnerships.backlinking.link3_text" />
                        </Link>
                        <EditableText contentKey="landing.partnerships.backlinking.part4" />
                    </p>
                </div>

                {/* 3. Brand Industrial Grid (Restored) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Window AC */}
                    <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <div className="relative z-10 pb-6 border-b border-white/5 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2 text-primary group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl">ac_unit</span>
                                <h3 className="font-header font-bold text-2xl uppercase tracking-wide">Window AC</h3>
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-primary/30 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-10 flex-1 relative z-10 py-4">
                            {[
                                { name: "LG", color: "text-rose-500", style: "font-sans font-black tracking-tighter text-6xl" },
                                { name: "GE APPLIANCES", color: "text-blue-400", style: "font-serif font-bold tracking-wide text-3xl" },
                                { name: "Hawai'i Energy", color: "text-[#00FFFF]", style: "font-sans font-bold tracking-tight text-4xl" },
                            ].map((brand, i) => (
                                <Link key={i} href="/contact" className="cursor-pointer transition-all duration-300 transform hover:scale-110 hover:brightness-125">
                                    <span className={`${brand.color} ${brand.style} drop-shadow-xl`}>
                                        {brand.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mini Splits */}
                    <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <div className="relative z-10 pb-6 border-b border-white/5 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2 text-accent group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl">mode_fan</span>
                                <h3 className="font-header font-bold text-2xl uppercase tracking-wide">Mini Splits</h3>
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-accent/30 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-10 items-center justify-items-center flex-1 relative z-10 py-4">
                            <div className="flex gap-8 items-center justify-center w-full">
                                <Link href="/contact" className="transition-all duration-300 hover:scale-110 hover:brightness-125">
                                    <span className="text-red-600 font-header font-bold tracking-normal uppercase text-xl cursor-default drop-shadow-xl text-center block">MITSUBISHI<br />ELECTRIC</span>
                                </Link>
                                <Link href="/contact" className="transition-all duration-300 hover:scale-110 hover:brightness-125">
                                    <span className="text-red-500 font-sans font-bold italic tracking-widest text-3xl cursor-default drop-shadow-xl">FUJITSU</span>
                                </Link>
                            </div>
                            <div className="flex gap-12 items-center justify-center w-full">
                                <Link href="/contact" className="transition-all duration-300 hover:scale-110 hover:brightness-125">
                                    <span className="text-sky-400 font-header font-medium tracking-widest text-2xl cursor-default drop-shadow-xl text-center block">DAIKIN</span>
                                </Link>
                                <Link href="/contact" className="transition-all duration-300 hover:scale-110 hover:brightness-125">
                                    <span className="text-blue-600 font-sans font-extrabold tracking-tighter text-3xl cursor-default drop-shadow-xl text-center block">CARRIER</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Central AC */}
                    <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <div className="relative z-10 pb-6 border-b border-white/5 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2 text-primary group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl">hvac</span>
                                <h3 className="font-header font-bold text-2xl uppercase tracking-wide">Central AC</h3>
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-primary/30 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-10 flex-1 relative z-10 py-4">
                            {[
                                { name: "RHEEM", color: "text-red-500", style: "font-header font-bold tracking-tight text-5xl" },
                                { name: "BOSCH", color: "text-cyan-500", style: "font-mono font-bold tracking-[0.2em] text-3xl" },
                            ].map((brand, i) => (
                                <Link key={i} href="/contact" className="cursor-pointer transition-all duration-300 transform hover:scale-110 hover:brightness-125">
                                    <span className={`${brand.color} ${brand.style} drop-shadow-xl`}>
                                        {brand.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function ServiceAreasSection({ isEditMode, content }: { isEditMode: boolean, content: any }) {
    const regions = content?.landing?.service_areas?.regions || [];

    return (
        <section id="service-areas" className="py-16 md:py-24 bg-background-dark border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0f172a] opacity-50"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-block mb-8">
                    <span className="py-3 px-8 rounded-full bg-primary/10 border border-primary text-primary text-xl font-header font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(0,174,239,0.2)]">
                        <EditableText contentKey="landing.service_areas.badge" />
                    </span>
                </div>
                <h2 className="mb-6 md:mb-10 font-header font-black text-white uppercase tracking-[-.02em] leading-none text-4xl md:text-6xl">
                    <EditableText contentKey="landing.service_areas.title" /> <br />
                    <EditableText
                        contentKey="landing.service_areas.title_highlight"
                        className="text-primary neon-glow inline-block"
                    />
                </h2>
                <div className="relative max-w-4xl mx-auto mb-16 px-4">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                    <div className="text-slate-400 text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em]">
                        <EditableText contentKey="landing.service_areas.backlinking.part1" />
                        <Link href="/contact" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">
                            <EditableText contentKey="landing.service_areas.backlinking.link1_text" />
                        </Link>
                        <EditableText contentKey="landing.service_areas.backlinking.part2" />
                        <Link href="/shop" className="text-accent hover:text-white transition-colors underline decoration-accent/30 underline-offset-4">
                            <EditableText contentKey="landing.service_areas.backlinking.link2_text" />
                        </Link>
                        <EditableText contentKey="landing.service_areas.backlinking.part3" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {regions.map((region: any, rIndex: number) => (
                        <div
                            key={region.id}
                            className={cn(
                                "industrial-card p-6 md:p-8 border-y border-r border-white/5 rounded-r-lg flex flex-col gap-6 relative overflow-hidden group transition-all duration-500 bg-white/[0.02]",
                                region.id === 'central' || region.id === 'leeward'
                                    ? "border-l-4 border-l-primary/50 hover:border-l-primary hover:shadow-[0_0_40px_-10px_rgba(0,174,239,0.2)]"
                                    : "border-l-4 border-l-accent/50 hover:border-l-accent hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                region.id === 'central' || region.id === 'leeward'
                                    ? "bg-gradient-to-br from-primary/5 via-transparent to-transparent"
                                    : "bg-gradient-to-br from-accent/5 via-transparent to-transparent"
                            )}></div>

                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className={cn(
                                    "mb-8 flex items-center justify-center gap-4 transition-transform duration-500 group-hover:scale-105",
                                    region.id === 'central' || region.id === 'leeward' ? "text-primary" : "text-accent"
                                )}>
                                    <span className={cn(
                                        "material-symbols-outlined text-4xl",
                                        region.id === 'central' || region.id === 'leeward' ? "drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]" : "drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    )}>{region.icon}</span>
                                    <h3 className="text-2xl font-header font-black text-white uppercase tracking-wider transition-colors">
                                        <EditableText contentKey={`landing.service_areas.regions.${rIndex}.title`} />
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5 justify-center w-full max-w-2xl mx-auto">
                                    {(region.cities || []).map((city: string, cIndex: number) => (
                                        <Link
                                            key={cIndex}
                                            href={isEditMode ? "#" : "/contact"}
                                            className={cn(
                                                "inline-flex items-center justify-center text-center px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-slate-300 font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110",
                                                region.id === 'central' || region.id === 'leeward'
                                                    ? "hover:bg-primary hover:border-primary hover:text-black hover:shadow-[0_0_15px_rgba(0,174,239,0.4)]"
                                                    : "hover:bg-accent hover:border-accent hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                            )}
                                        >
                                            <EditableText contentKey={`landing.service_areas.regions.${rIndex}.cities.${cIndex}`} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WarehouseSection() {
    return (
        <section id="warehouse-map" className="py-16 md:py-32 bg-charcoal border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase">
                            <EditableText contentKey="landing.warehouse.badge" />
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-header font-bold text-white mb-6 uppercase tracking-wide">
                        <span className="text-primary neon-glow">
                            <EditableText contentKey="landing.warehouse.title" />
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto uppercase tracking-tighter">
                        <EditableText contentKey="landing.warehouse.description" />
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {/* Information Stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/30 transition-all duration-500">
                            <div className="bg-primary/20 p-4 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">location_on</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-wider mb-2">
                                    <EditableText contentKey="landing.warehouse.address_label" />
                                </h4>
                                <div className="text-slate-400 leading-relaxed font-medium">
                                    <EditableText contentKey="landing.warehouse.address_value" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-accent/30 transition-all duration-500">
                            <div className="bg-accent/20 p-4 rounded-xl text-accent group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">directions</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold uppercase tracking-wider mb-2">
                                    <EditableText contentKey="landing.warehouse.directions_label" />
                                </h4>
                                <div className="text-slate-400 leading-relaxed font-medium italic">
                                    <EditableText contentKey="landing.warehouse.directions_value" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Hub */}
                    <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl bg-white/5">
                        <Image
                            src="/assets/ahac-shoplocationv2.svg"
                            alt="Waipahu Shop Location"
                            fill
                            className="object-contain p-4 transition-all duration-1000"
                        />

                        <div className="absolute bottom-8 left-8 right-8 max-w-md mx-auto">
                            <Link
                                href="https://www.google.com/maps/dir/?api=1&destination=Waipahu+Commercial+Center+94-150+Leoleo+St+Waipahu+HI+96797"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <Button className="w-full h-14 bg-white text-background-dark hover:bg-primary hover:text-white uppercase font-black tracking-[0.2em] shadow-2xl transition-all duration-300">
                                    <span className="material-symbols-outlined mr-3">map</span>
                                    <EditableText contentKey="landing.warehouse.cta_text" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CalendarSection() {
    return (
        <section id="calendar" className="py-16 md:py-24 bg-background-light dark:bg-background-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <AdminCalendar />
            </div>
        </section>
    );
}
