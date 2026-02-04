'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Image Data Interface
interface ProjectImage {
    src: string;
    alt: string;
    description: string;
}

// Ordered List of Projects
const PROJECT_IMAGES: ProjectImage[] = [
    // Hero/Named Projects (from assets/hero-cards/)
    { src: '/assets/hero-cards/unit-lg-plexiglass-installation.jpg', alt: 'Plexiglass Install', description: 'Custom Plexiglass Installation' },
    { src: '/assets/hero-cards/pearlhorizons.jpg', alt: 'Pearl Horizons', description: 'Pearl Horizons Project' },
    { src: '/assets/hero-cards/pearlridge_garden_towers.jpg', alt: 'Pearlridge Gardens', description: 'Pearlridge Garden Towers' },
    { src: '/assets/hero-cards/pearlridge-square-.jpg', alt: 'Pearlridge Square', description: 'Pearlridge Square Installation' },
    { src: '/assets/hero-cards/piikoi_atrium.jpg', alt: 'Piikoi Atrium', description: 'Piikoi Atrium HVAC Upgrade' },
    { src: '/assets/hero-cards/sliding-window.jpg', alt: 'Sliding Window', description: 'Sliding Window Unit Install' },
    { src: '/assets/hero-cards/thru-wall-below-window.jpg', alt: 'Thru-Wall Unit', description: 'Thru-Wall Below Window Setup' },
    { src: '/assets/hero-cards/thru-wall.jpg', alt: 'Wall Mount', description: 'Thru-Wall Air Conditioning' },
    { src: '/assets/hero-cards/thumbnail_IMG_0407.jpg', alt: 'Installation Detail', description: 'Precision Installation Detail' },
    { src: '/assets/hero-cards/thumbnail_IMG_0413.jpg', alt: 'Unit Setup', description: 'Professional Unit Setup' },
    { src: '/assets/hero-cards/thumbnail_IMG_0433.jpg', alt: 'AC Maintenance', description: 'Comprehensive AC Maintenance' },
    { src: '/assets/hero-cards/thumbnail_IMG_0434.jpg', alt: 'System Check', description: 'System Performance Check' },
    { src: '/assets/hero-cards/thumbnail_IMG_0435.jpg', alt: 'Ventilation', description: 'Ventilation Assessment' },
    { src: '/assets/hero-cards/thumbnail_IMG_0436.jpg', alt: 'Cooling System', description: 'Efficient Cooling System' },
    { src: '/assets/hero-cards/thumbnail_IMG_0441.jpg', alt: 'Service Call', description: 'On-Site Service Call' },
    { src: '/assets/hero-cards/thumbnail_IMG_0444.jpg', alt: 'Unit Inspection', description: 'Detailed Unit Inspection' },
    { src: '/assets/hero-cards/thumbnail_IMG_0458.jpg', alt: 'Quality Check', description: 'Final Quality Polish' },
    { src: '/assets/hero-cards/thumbnail_IMG_0460.jpg', alt: 'Happy Client', description: 'Another Successful Project' },
    { src: '/assets/hero-cards/unit-fredrich-plywood.jpg', alt: 'Custom Fit', description: 'Custom Friedrich Plywood Fit' },
    { src: '/assets/hero-cards/unit-fredrich-sliding-window-vertical.jpg', alt: 'Vertical Slider', description: 'Vertical Window AC Install' },
    { src: '/assets/hero-cards/unit-lg-below-window.jpg', alt: 'LG Unit', description: 'LG Below-Window Configuration' },
    { src: '/assets/hero-cards/unit-lg-condowindow1.jpg', alt: 'Condo AC', description: 'Apartment & Condo Solutions' },
    { src: '/assets/hero-cards/unit-lg-makakilio-glass-pic.jpg', alt: 'Makakilo Project', description: 'Glass Mount Installation' },

    // Yelp Photos (from assets/yelpphotos/)
    { src: '/assets/yelpphotos/yelp1.jpg', alt: 'Split AC System', description: 'Modern split system installation' },
    { src: '/assets/yelpphotos/yelp2.jpg', alt: 'Rooftop Unit', description: 'Commercial rooftop HVAC unit' },
    { src: '/assets/yelpphotos/yelp3.jpg', alt: 'Ductless Mini-Split', description: 'Energy efficient ductless setup' },
    { src: '/assets/yelpphotos/yelp4.jpg', alt: 'Central Air', description: 'Central air conditioning system' },
    { src: '/assets/yelpphotos/yelp5.jpg', alt: 'Ventilation', description: 'Industrial ventilation ducts' },
    { src: '/assets/yelpphotos/yelp6.jpg', alt: 'Compressor Unit', description: 'High-capacity compressor' },
    { src: '/assets/yelpphotos/yelp7.jpg', alt: 'Heat Pump', description: 'Heat pump installation' },
    { src: '/assets/yelpphotos/yelp8.jpg', alt: 'Thermostat', description: 'Smart thermostat control' },
    { src: '/assets/yelpphotos/yelp9.jpg', alt: 'Air Handler', description: 'Indoor air handler unit' },
    { src: '/assets/yelpphotos/yelp10.jpg', alt: 'Condenser Coil', description: 'Outdoor condenser coil' },
    { src: '/assets/yelpphotos/yelp11.jpg', alt: 'Ductwork', description: 'Insulated ductwork' },
    { src: '/assets/yelpphotos/yelp12.jpg', alt: 'AC Repair', description: 'AC system repair and maintenance' },
    { src: '/assets/yelpphotos/yelp13.jpg', alt: 'New Installation', description: 'Brand new AC installation' },
    { src: '/assets/yelpphotos/yelp14.jpg', alt: 'System Check', description: 'Routine system checkup' },
    { src: '/assets/yelpphotos/yelp15.jpg', alt: 'Filter Replacement', description: 'Air filter replacement' },
    { src: '/assets/yelpphotos/yelp16.jpg', alt: 'Emergency Service', description: 'Emergency HVAC service' },
    { src: '/assets/yelpphotos/yelp17.jpg', alt: 'Commercial HVAC', description: 'Commercial HVAC solutions' },
    { src: '/assets/yelpphotos/yelp18.jpg', alt: 'Residential cooling', description: 'Residential cooling solutions' },
    { src: '/assets/yelpphotos/yelp19.jpg', alt: 'Heating System', description: 'Heating system maintenance' },
    { src: '/assets/yelpphotos/yelp20.jpg', alt: 'Air Quality', description: 'Indoor air quality improvement' },
    { src: '/assets/yelpphotos/yelp21.jpg', alt: 'Cooling Tower', description: 'Cooling tower maintenance' },
];

export default function Section4Projects() {
    // v2.5 Refinement
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % PROJECT_IMAGES.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length);
    };

    const visibleImages = [
        PROJECT_IMAGES[activeIndex % PROJECT_IMAGES.length],
        PROJECT_IMAGES[(activeIndex + 1) % PROJECT_IMAGES.length],
        PROJECT_IMAGES[(activeIndex + 2) % PROJECT_IMAGES.length],
    ];

    return (
        <section className="relative w-full py-12 overflow-hidden bg-slate-50 h-[700px] flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/yelpphotos/bg-eastside-view1.webp"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-30 pointer-events-none blur-sm"
                    priority
                />
                {/* Subtle Blue/Dark Overlay - Just a tint, not a full wash */}
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-10 max-w-4xl w-full relative z-40 block">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2 uppercase drop-shadow-sm">
                        OUR RECENT PROJECTS
                    </h2>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed drop-shadow-sm max-w-2xl mx-auto">
                        Browse our gallery of recent installations across Oahu. Swipe to explore.
                    </p>
                </div>

                {/* Stack Carousel Container - Resized to fit 700px */}
                <div className="relative w-full max-w-[260px] xs:max-w-[320px] md:max-w-md h-[280px] md:h-[360px] flex items-center justify-center perspective-1000 z-20 mt-4 mb-6">
                    <AnimatePresence mode='popLayout' custom={direction}>
                        {visibleImages.map((project, index) => {
                            const isFront = index === 0;
                            const uniqueKey = isFront
                                ? `front-${activeIndex}`
                                : `stack-${(activeIndex + index) % PROJECT_IMAGES.length}`;

                            return (
                                <motion.div
                                    key={uniqueKey}
                                    layout
                                    custom={direction}
                                    initial={isFront ? { scale: 0.9, opacity: 0, y: 20 } : {}}
                                    animate={{
                                        zIndex: 30 - index * 10,
                                        scale: 1 - index * 0.05,
                                        y: index * -15,
                                        opacity: 1 - index * 0.2,
                                    }}
                                    exit={{
                                        x: direction === 1 ? -200 : 200,
                                        opacity: 0,
                                        rotate: direction === 1 ? -10 : 10
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute w-full h-full shadow-2xl rounded-2xl overflow-hidden bg-white border-2 border-slate-200/50 backdrop-blur-md"
                                >
                                    <div className="relative w-full h-full group">
                                        <Image
                                            src={project.src}
                                            alt={project.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 500px"
                                            priority={isFront}
                                        />

                                        {/* Glassmorphism Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 
                                            bg-black/40 backdrop-blur-md border-t border-white/10
                                            text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 shadow-black/50 drop-shadow-md">
                                                {project.alt}
                                            </p>
                                            <p className="text-xl font-bold leading-tight shadow-black/50 drop-shadow-md">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Number Badge */}
                                    {isFront && (
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {activeIndex + 1} / {PROJECT_IMAGES.length}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Controls & CTA */}
                <div className="flex flex-col items-center gap-6 mt-6 z-30">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={handlePrev}
                            className="p-4 rounded-full bg-white shadow-xl hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-slate-200 group"
                            aria-label="Previous Project"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-900 group-hover:text-cyan-600" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="p-4 rounded-full bg-slate-900 shadow-xl shadow-slate-900/20 hover:bg-black hover:scale-110 active:scale-95 transition-all border border-slate-800 group"
                            aria-label="Next Project"
                        >
                            <ChevronRight className="w-6 h-6 text-white group-hover:text-cyan-400" />
                        </button>
                    </div>

                    <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 transition-all duration-300 bg-cyan-400 rounded-full hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 border border-cyan-300/50 backdrop-blur-sm">
                        <span className="relative z-10">REQUEST A QUOTE</span>
                        <ArrowRight className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1 relative z-10" />
                        <div className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
