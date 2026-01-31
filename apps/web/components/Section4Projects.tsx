'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    // Shuffle on mount, but keep yelp30.jpg first
    useEffect(() => {
        const featuredImage = '/assets/yelpphotos/yelp30.jpg';

        // Filter out the featured image from the shuffle pool
        const shufflable = RAW_PROJECTS.filter(p => p.src !== featuredImage);

        // Find the featured image object
        const featured = RAW_PROJECTS.find(p => p.src === featuredImage);

        const shuffled = shufflable
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        // Prepend featured image if found, otherwise just show shuffled
        setProjects(featured ? [featured, ...shuffled] : shuffled);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, [projects.length]);

    // Autoplay Logic: ONLY when hovered
    useEffect(() => {
        if (isHovered) {
            autoplayRef.current = setInterval(() => {
                nextSlide();
            }, 3000); // 3 seconds per slide on hover
        } else {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        }

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [isHovered, nextSlide]);

    if (projects.length === 0) return null; // Wait for hydration

    return (
        <section className="relative w-full bg-white py-24 overflow-hidden">
            {/* Background Image: Eastside View with White Blend */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/yelpphotos/bg-eastside-view1.webp"
                    alt="Eastside View Background"
                    fill
                    className="object-cover object-center opacity-40"
                />
                {/* Heavy White Overlay to keep 'Light Theme' */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">

                {/* Header */}
                <div className="text-center max-w-3xl">
                    <h2 className="font-header font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tighter leading-none mb-6">
                        <EditableText contentKey="home_v2.projects.title" defaultValue="OUR RECENT" />
                        <span className="text-cyan-500 block md:inline md:ml-3">
                            <EditableText contentKey="home_v2.projects.title_highlight" defaultValue="PROJECTS" />
                        </span>
                    </h2>
                    <div className="font-sans text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        <EditableText
                            contentKey="home_v2.projects.narrative"
                            defaultValue="Browse our gallery of recent installations across Oahu. From condo upgrades to full home retrofits, see the difference quality craftsmanship makes."
                            multiLine
                        />
                    </div>
                </div>

                {/* Carousel Stage - Refined: Cyan Glow, Emboss, No-Crop */}
                <div
                    className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden group 
                    border-[6px] border-white 
                    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_30px_-5px_rgba(6,182,212,0.4)] 
                    ring-1 ring-slate-900/5 transform transition-transform duration-500 hover:scale-[1.01]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full bg-slate-900"
                        >
                            {/* Layer 1: Blurred Background (Fills container) */}
                            <Image
                                src={projects[currentIndex].src}
                                alt="Background Blur"
                                fill
                                className="object-cover opacity-30 blur-2xl scale-110"
                            />

                            {/* Layer 2: Main Image (No Crop - Contain) */}
                            <div className="absolute inset-0 flex items-center justify-center p-2">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={projects[currentIndex].src}
                                        alt={projects[currentIndex].description}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority={currentIndex === 0}
                                    />
                                </div>
                            </div>

                            {/* Overlay Gradient (Subtle, only at bottom for text) */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-center md:text-left z-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-white text-lg md:text-2xl font-bold tracking-tight drop-shadow-md leading-tight">
                                        {projects[currentIndex].description}
                                    </p>
                                    {projects[currentIndex].location && (
                                        <p className="text-cyan-400 text-sm md:text-base font-mono uppercase tracking-widest mt-2 font-bold">
                                            {projects[currentIndex].location}
                                        </p>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows (Visible on Hover or Mobile Focus) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-cyan-600 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-lg border border-white/20 hover:border-white hover:scale-110 z-20"
                        aria-label="Previous Project"
                    >
                        <ChevronLeft size={32} strokeWidth={3} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-cyan-600 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-lg border border-white/20 hover:border-white hover:scale-110 z-20"
                        aria-label="Next Project"
                    >
                        <ChevronRight size={32} strokeWidth={3} />
                    </button>

                    {/* Progress Indicator */}
                    <div className="absolute top-6 right-6 flex gap-1.5 z-20 bg-black/30 p-2 rounded-full backdrop-blur-sm border border-white/10">
                        {projects.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-1.5 bg-white/30'
                                    }`}
                            // Only show limited dots if list is huge? No, user has 40 images. Displaying 40 dots is too much.
                            // Rendering 40 dots might be clutter. Let's hide this or make it a counter?
                            // Switched to minimal counter or just current active bar?
                            // Let's keep it simple: No dots for 40 items. Maybe just a counter.
                            />
                        ))}
                    </div>

                    {/* Clean Counter instead of 40 dots */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white font-mono text-xs tracking-widest z-20">
                        {currentIndex + 1} / {projects.length}
                    </div>
                </div>

                {/* Thumbnails Row (Optional - maybe too heavy for 40 images? Let's skip for now per "flow" request and stick to carousel) */}
            </div>
        </section>
    );
}
