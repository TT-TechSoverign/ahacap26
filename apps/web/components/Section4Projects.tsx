'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EditableText } from './EditableText';

// Image Data Interface
interface ProjectImage {
    src: string;
    description: string;
    location?: string;
}

// Raw Image List (Will be shuffled)
const RAW_PROJECTS: ProjectImage[] = [
    { src: '/assets/hero-cards/unit-lg-plexiglass-installation.jpg', description: 'Custom plexiglass installation for seamless window unit integration.' },
    { src: '/assets/hero-cards/pearlhorizons.jpg', description: 'High-efficiency cooling solutions for Pearl Horizons residents.' },
    { src: '/assets/hero-cards/pearlridge_garden_towers.jpg', description: 'Pearlridge Garden Towers climate control upgrade.' },
    { src: '/assets/hero-cards/pearlridge-square-.jpg', description: 'Modern AC installation at Pearlridge Square.' },
    { src: '/assets/hero-cards/piikoi_atrium.jpg', description: 'Piikoi Atrium unit upgrade ensuring year-round comfort.' },
    { src: '/assets/hero-cards/sliding-window.jpg', description: 'Perfect fit sliding window installation for maximum efficiency.' },
    { src: '/assets/hero-cards/thru-wall-below-window.jpg', description: 'Discreet thru-wall installation preserving window views.' },
    { src: '/assets/hero-cards/thru-wall.jpg', description: 'Professional thru-wall AC sleeve installation.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0407.jpg', description: 'Precision ductwork and ventilation setup.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0413.jpg', description: 'Compact and powerful cooling for modern condos.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0433.jpg', description: 'Clean, professional installation with minimal interior impact.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0434.jpg', description: 'Energy-efficient upgrades for older residential buildings.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0435.jpg', description: 'Seamless integration with existing window frames.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0436.jpg', description: 'High-performance units tailored for Hawaii climate.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0441.jpg', description: 'Custom mounting solutions for challenging window types.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0444.jpg', description: 'Secure and weather-sealed window unit installation.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0458.jpg', description: 'Modern aesthetic upgrades for condo living.' },
    { src: '/assets/hero-cards/thumbnail_IMG_0460.jpg', description: 'Enhanced airflow installation for maximum cooling.' },
    { src: '/assets/hero-cards/unit-fredrich-plywood.jpg', description: 'Secure custom paneling for specialized window sizes.' },
    { src: '/assets/hero-cards/unit-fredrich-sliding-window-vertical.jpg', description: 'Vertical window adaptation for Friedrich units.' },
    { src: '/assets/hero-cards/unit-lg-below-window.jpg', description: 'Low-profile LG unit installation.' },
    { src: '/assets/hero-cards/unit-lg-condowindow1.jpg', description: 'Condo-approved LG window unit setup.' },
    { src: '/assets/hero-cards/unit-lg-makakilio-glass-pic.jpg', description: 'Makakilo glass mounting for unobstructed views.' },
    { src: '/assets/yelpphotos/yelp30.jpg', description: 'Showcase installation demonstrating our premium finish qualities.', location: 'East Oahu' },
    { src: '/assets/yelpphotos/yelp1.jpg', description: 'Commercial-grade reliability for residential comfort.' },
    { src: '/assets/yelpphotos/yelp2.jpg', description: 'Expert technician ensuring perfect calibration.' },
    { src: '/assets/yelpphotos/yelp3.jpg', description: 'Precision mounting for vibration-free operation.' },
    { src: '/assets/yelpphotos/yelp4.jpg', description: 'Clean, detailed finish on every project.' },
    { src: '/assets/yelpphotos/yelp5.jpg', description: 'Handling complex installations with ease.' },
    { src: '/assets/yelpphotos/yelp6.jpg', description: 'Top-tier equipment for long-lasting cooling.' },
    { src: '/assets/yelpphotos/yelp7.jpg', description: 'Professional service you can trust.' },
    { src: '/assets/yelpphotos/yelp8.jpg', description: 'Ensuring perfect seals for maximum efficiency.' },
    { src: '/assets/yelpphotos/yelp9.jpg', description: 'Upgrade your home with whisper-quiet cooling.' },
    { src: '/assets/yelpphotos/yelp10.jpg', description: 'Reliable cooling for Hawaii hot summers.' },
    { src: '/assets/yelpphotos/yelp11.jpg', description: 'Expert craftsmanship in every detail.' },
    { src: '/assets/yelpphotos/yelp12.jpg', description: 'Delivering superior comfort to Oahu homes.' },
    { src: '/assets/yelpphotos/yelp13.jpg', description: 'Quality assurance checked on every job.' },
    { src: '/assets/yelpphotos/yelp14.jpg', description: 'Seamless interior and exterior finish.' },
    { src: '/assets/yelpphotos/yelp15.jpg', description: 'Optimized airflow for whole-room comfort.' },
    { src: '/assets/yelpphotos/yelp16.jpg', description: 'Modern solutions for classic architecture.' },
    { src: '/assets/yelpphotos/yelp17.jpg', description: 'Efficient, elegant, and effective cooling.' },
    { src: '/assets/yelpphotos/yelp18.jpg', description: 'Detailed planning for perfect execution.' },
    { src: '/assets/yelpphotos/yelp19.jpg', description: 'Your partner in home climate control.' },
    { src: '/assets/yelpphotos/yelp20.jpg', description: 'Excellence in every installation.' },
    { src: '/assets/yelpphotos/yelp21.jpg', description: 'Trusted by neighbors across Oahu.', location: 'Oahu, HI' },
];

export default function Section4Projects() {
    const [projects, setProjects] = useState<ProjectImage[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Shuffle on mount, but keep yelp30.jpg first
    useEffect(() => {
        const featuredImage = '/assets/yelpphotos/yelp30.jpg';
        const shufflable = RAW_PROJECTS.filter(p => p.src !== featuredImage);
        const featured = RAW_PROJECTS.find(p => p.src === featuredImage);

        const shuffled = shufflable
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        setProjects(featured ? [featured, ...shuffled] : shuffled);

        // Initial Center: Scroll to index 0 after render
        setTimeout(() => scrollToIndex(0), 100);
    }, []);

    // Robust Scroll-To-Center Logic
    const scrollToIndex = useCallback((index: number) => {
        const container = containerRef.current;
        if (!container) return;

        // Clamp index
        const targetIndex = Math.max(0, Math.min(index, RAW_PROJECTS.length - 1)); // Use RAW_PROJECTS.length is safe or projects.length if set

        // Find the item
        const items = container.querySelectorAll('[data-carousel-item]');
        const targetItem = items[targetIndex] as HTMLElement;

        if (targetItem) {
            // Update Active Index immediately for UI feedback
            setActiveIndex(targetIndex);

            // Calculate exact center position
            const containerCenter = container.clientWidth / 2;
            const itemCenter = targetItem.offsetWidth / 2;
            const itemLeft = targetItem.offsetLeft;

            // Standard centering formula:
            // ScrollTarget = ItemLeftPosition - (ContainerHalfWidth) + (ItemHalfWidth)
            const scrollTo = itemLeft - containerCenter + itemCenter;

            container.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    }, []); // Removed projects dependency to keep stable reference

    // Intersection Observer for Scroll Detection
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: container,
                threshold: 0.5, // 50% visibility
                rootMargin: '-10% 0px -10% 0px' // Narrow connection
            }
        );

        const items = container.querySelectorAll('[data-carousel-item]');
        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, [projects]);


    if (projects.length === 0) return null;

    return (
        <section className="relative w-full bg-white py-24 overflow-hidden min-h-[900px] flex flex-col justify-center">
            {/* Background Image: Eastside View SVG */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/yelpphotos/bg-eastside-view1-1600x1000.svg"
                    alt="Eastside View Background"
                    fill
                    className="object-cover object-center opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center gap-12">

                {/* Header */}
                <div className="text-center max-w-3xl px-6">
                    <h2 className="font-header font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tighter leading-none mb-6">
                        <EditableText contentKey="home_v2.projects.title" defaultValue="OUR RECENT" />
                        <span className="text-cyan-500 block md:inline md:ml-3">
                            <EditableText contentKey="home_v2.projects.title_highlight" defaultValue="PROJECTS" />
                        </span>
                    </h2>
                    <div className="font-sans text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        <EditableText
                            contentKey="home_v2.projects.narrative"
                            defaultValue="Browse our gallery of recent installations across Oahu. Swipe to explore."
                            multiLine
                        />
                    </div>
                </div>

                {/* CSS Scroll Snap Carousel - Redesigned for Gaps & Centering */}
                <div className="relative w-full">

                    {/* The Scroll Container 
                        - gap-6 (24px) for consistency
                        - Padding Logic:
                          - To center the FIRST item: padding-left = 50% of container - 50% of item width
                          - To center the LAST item: padding-right = 50% of container - 50% of item width
                        - We use calc() in CSS or tailwind arbitrarily.
                        - Container width: 100vw usually.
                        - Item width: 280px (mobile), 350px (md), 400px (lg)
                    */}
                    <div
                        ref={containerRef}
                        className="
                            flex overflow-x-auto items-center py-12 gap-8
                            snap-x snap-mandatory scroll-smooth
                            no-scrollbar
                            w-full
                            px-[50vw] // Fallback, will be overridden by style for precision?
                            // Actually, let's use a safe padding approach: 
                            // box-border with massive padding is tricky.
                            // Better: spacer divs? No.
                            // Let's rely on the JS scrollTo for the initial center, and use CSS for spacing.
                            // If we want pure CSS snap center for first item, we DO need padding.
                            // Let's use `px-[calc(50%-140px)]` for mobile (280/2), `md:px-[calc(50%-175px)]`...
                        "
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {/* We use padding on the container to facilitate "first item in center" */}
                        {/* Tailwind arbitrary values work well here */}
                        {/* Padding logic moved to global styles */}

                        {projects.map((project, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={index}
                                    data-index={index}
                                    data-carousel-item
                                    className={`
                                        flex-shrink-0 relative
                                        snap-center
                                        transition-all duration-500 ease-out
                                        w-[280px] md:w-[350px] lg:w-[400px]
                                        aspect-[3/4]
                                        cursor-pointer
                                        ${isActive ? 'scale-100 opacity-100 z-20' : 'scale-[0.85] opacity-60 z-10 blur-[0.5px] grayscale-[0.3]'}
                                    `}
                                    onClick={() => scrollToIndex(index)}
                                >
                                    {/* Image Wrapper */}
                                    <div className={`
                                        relative w-full h-full rounded-2xl overflow-hidden
                                        border-[4px] md:border-[6px] border-white
                                        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]
                                        transition-all duration-500
                                        ${isActive ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_-5px_rgba(6,182,212,0.6)] ring-1 ring-cyan-400/30' : ''}
                                    `}>
                                        <Image
                                            src={project.src}
                                            alt={project.description}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 280px, 400px"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className={`
                                            absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pointer-events-none
                                            transition-opacity duration-300
                                            ${isActive ? 'opacity-100' : 'opacity-0'}
                                        `} />

                                        {/* Content */}
                                        <div className={`
                                            absolute bottom-0 left-0 right-0 p-6 text-center
                                            transition-all duration-500 delay-100
                                            ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                                        `}>
                                            <h3 className="text-white font-bold text-lg leading-tight mb-2 drop-shadow-md">
                                                {project.description}
                                            </h3>
                                            {project.location && (
                                                <p className="text-cyan-400 text-xs font-mono uppercase tracking-widest font-bold">
                                                    {project.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scrollToIndex(activeIndex - 1)}
                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-slate-900 p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-slate-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
                        disabled={activeIndex === 0}
                        aria-label="Previous"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={() => scrollToIndex(activeIndex + 1)}
                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-slate-900 p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-slate-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
                        disabled={activeIndex === projects.length - 1}
                        aria-label="Next"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 right-4 md:right-20 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 text-slate-900 font-mono text-xs font-bold shadow-sm z-30">
                        {activeIndex + 1} / {projects.length}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                /* Dynamic Padding for Centering */
                [data-carousel-container] {
                    padding-left: calc(50vw - 140px);
                    padding-right: calc(50vw - 140px);
                }
                @media (min-width: 768px) {
                    [data-carousel-container] {
                        padding-left: calc(50% - 175px);
                        padding-right: calc(50% - 175px);
                    }
                }
                @media (min-width: 1024px) {
                    [data-carousel-container] {
                        padding-left: calc(50% - 200px);
                        padding-right: calc(50% - 200px);
                    }
                }
            `}</style>
        </section>
    );
}
