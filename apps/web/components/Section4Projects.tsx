'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EditableText } from './EditableText';

// Image Data Interface
interface ProjectImage {
    src: string;
    alt: string;
    description: string;
    location?: string;
}

// Data Array
const PROJECT_IMAGES: ProjectImage[] = [
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
    { src: '/assets/yelpphotos/yelp22.jpg', alt: 'HVAC Tech', description: 'Professional HVAC technician' },
    { src: '/assets/yelpphotos/yelp23.jpg', alt: 'Maintenance Plan', description: 'Preventative maintenance plan' },
    { src: '/assets/yelpphotos/yelp24.jpg', alt: 'Energy Savings', description: 'Energy saving HVAC upgrades' },
    { src: '/assets/yelpphotos/yelp25.jpg', alt: 'Warranty Service', description: 'Warranty service and repair' },
    { src: '/assets/yelpphotos/yelp26.jpg', alt: 'Happy Customer', description: 'Satisfied customer with new AC' },
    { src: '/assets/yelpphotos/yelp27.jpg', alt: 'Efficient Cooling', description: 'Efficient cooling for homes' },
    { src: '/assets/yelpphotos/yelp28.jpg', alt: 'Reliable Comfort', description: 'Reliable home comfort' },
    { src: '/assets/yelpphotos/yelp29.jpg', alt: 'Tech at work', description: 'Technician inspecting unit' },
    { src: '/assets/yelpphotos/yelp30.jpg', alt: 'Completed Job', description: 'Successfully completed job' },
];

export default function Section4Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % PROJECT_IMAGES.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length);
    };

    // Calculate the indices of the cards to show in the stack (Front, +1, +2)
    const visibleImages = [
        PROJECT_IMAGES[activeIndex % PROJECT_IMAGES.length],
        PROJECT_IMAGES[(activeIndex + 1) % PROJECT_IMAGES.length],
        PROJECT_IMAGES[(activeIndex + 2) % PROJECT_IMAGES.length],
    ];

    return (
        <section className="relative w-full py-24 overflow-hidden bg-gray-50">
            {/* Background Image - Absolute & Stretched */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/yelpphotos/bg-eastside-view1.webp"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-60 pointer-events-none"
                    priority
                />
                {/* Gradient Overlay for Fade Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 uppercase">
                        <EditableText
                            contentKey="section4-title"
                            defaultText="OUR RECENT PROJECTS"
                        />
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        <EditableText
                            contentKey="section4-subtitle"
                            defaultText="Browse our gallery of recent installations across Oahu. Swipe to explore."
                        />
                    </p>
                </div>

                {/* Stack Carousel Container */}
                <div className="relative w-full max-w-md h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
                    <AnimatePresence mode='popLayout' custom={direction}>
                        {visibleImages.map((project, index) => {
                            // index 0 is front, 1 is middle, 2 is back
                            const isFront = index === 0;
                            // We only animate the "Front" card swapping. 
                            // The background cards just naturally flow into position as the array shifts.

                            // Key needs to be unique to the *content* to trigger animation on shift
                            // If index is 0, it's the current active image.
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
                                        scale: 1 - index * 0.05, // 1, 0.95, 0.9
                                        y: index * -15,   // 0, -15, -30 (Stacking upwards)
                                        opacity: 1 - index * 0.2, // 1, 0.8, 0.6
                                    }}
                                    exit={{
                                        x: direction === 1 ? -200 : 200,
                                        opacity: 0,
                                        rotate: direction === 1 ? -10 : 10
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute w-full h-full shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-200"
                                    style={{
                                        // Slight rotation for stack effect? Maybe too messy.
                                        // transformOrigin: "bottom center"
                                    }}
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

                                        {/* Overlay Content (Only visible on front card usually, or all?) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                                                {project.alt}
                                            </p>
                                            <p className="text-xl font-bold leading-tight">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Number Badge */}
                                    {isFront && (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {activeIndex + 1} / {PROJECT_IMAGES.length}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-8 mt-12 z-20">
                    <button
                        onClick={handlePrev}
                        className="p-4 rounded-full bg-white shadow-xl hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-gray-100 group"
                        aria-label="Previous Project"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-black" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="p-4 rounded-full bg-gray-900 shadow-xl shadow-gray-900/20 hover:bg-black hover:scale-110 active:scale-95 transition-all border border-gray-800 group"
                        aria-label="Next Project"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
}

