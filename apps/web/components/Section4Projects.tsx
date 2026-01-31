'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'; // Added ArrowRight for CTA
import { EditableText } from './EditableText';
import Link from 'next/link';

// Image Data Interface
interface ProjectImage {
    src: string;
    alt: string;
    description: string;
}

// Full Data Array (50 Images)
// Generated to cover all assets found in directory.
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
    // Extended Set (31-50) with generic descriptions
    { src: '/assets/yelpphotos/yelp31.jpg', alt: 'Quality Install', description: 'High-quality installation standards' },
    { src: '/assets/yelpphotos/yelp32.jpg', alt: 'Local Experts', description: 'Trusted local HVAC experts' },
    { src: '/assets/yelpphotos/yelp33.jpg', alt: 'Precision Work', description: 'Precision in every detail' },
    { src: '/assets/yelpphotos/yelp34.jpg', alt: 'Clean Finish', description: 'Clean and tidy finish' },
    { src: '/assets/yelpphotos/yelp35.jpg', alt: 'System Upgrade', description: 'Modern system upgrade' },
    { src: '/assets/yelpphotos/yelp36.jpg', alt: 'Climate Control', description: 'Advanced climate control' },
    { src: '/assets/yelpphotos/yelp37.jpg', alt: 'Rapid Response', description: 'Quick response time services' },
    { src: '/assets/yelpphotos/yelp38.jpg', alt: 'Expert Diagnosis', description: 'Accurate system diagnosis' },
    { src: '/assets/yelpphotos/yelp39.jpg', alt: 'Duca Repair', description: 'Ductwork repair and sealing' },
    { src: '/assets/yelpphotos/yelp40.jpg', alt: 'Unit Replacement', description: 'Old unit replacement' },
    { src: '/assets/yelpphotos/yelp41.jpg', alt: 'Safety Check', description: 'Comprehensive safety check' },
    { src: '/assets/yelpphotos/yelp42.jpg', alt: 'Performance Tuning', description: 'System performance tuning' },
    { src: '/assets/yelpphotos/yelp43.jpg', alt: 'Smart Home', description: 'Smart home integration' },
    { src: '/assets/yelpphotos/yelp44.jpg', alt: 'Year-Round Comfort', description: 'Comfort for every season' },
    { src: '/assets/yelpphotos/yelp45.jpg', alt: 'Eco-Friendly', description: 'Eco-friendly refrigerant solutions' },
    { src: '/assets/yelpphotos/yelp46.jpg', alt: 'Quiet Operation', description: 'Low-noise system installation' },
    { src: '/assets/yelpphotos/yelp47.jpg', alt: 'Custom Solution', description: 'Customized HVAC solutions' },
    { src: '/assets/yelpphotos/yelp48.jpg', alt: 'Professional Team', description: 'Dedicated professional team' },
    { src: '/assets/yelpphotos/yelp49.jpg', alt: 'Service Excellence', description: 'Commitment to service excellence' },
    { src: '/assets/yelpphotos/yelp50.jpg', alt: 'Oahu Choice', description: 'The preferred choice in Oahu' },
];

export default function Section4Projects() {
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
        <section className="relative w-full py-24 overflow-hidden bg-gray-50 h-[900px] flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/yelpphotos/bg-eastside-view1.webp"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-90 pointer-events-none"
                    priority
                />
                {/* Updated Gradient: White mixed with Dark Blue hints */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-900/5 to-white/90" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                {/* Header - Explicit z-index to ensure visibility */}
                <div className="text-center mb-16 max-w-2xl relative z-30">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase drop-shadow-sm">
                        <EditableText
                            contentKey="section4-title"
                            defaultText="OUR RECENT PROJECTS"
                        />
                    </h2>
                    <p className="text-lg text-slate-700 font-medium leading-relaxed drop-shadow-sm">
                        <EditableText
                            contentKey="section4-subtitle"
                            defaultText="Browse our gallery of recent installations across Oahu. Swipe to explore."
                        />
                    </p>
                </div>

                {/* Stack Carousel Container */}
                <div className="relative w-full max-w-md h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 z-20">
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
                                    className="absolute w-full h-full shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100"
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
                <div className="flex flex-col items-center gap-8 mt-12 z-30">
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-8">
                        <button
                            onClick={handlePrev}
                            className="p-4 rounded-full bg-white shadow-xl hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all border border-gray-100 group"
                            aria-label="Previous Project"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-black" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="p-4 rounded-full bg-slate-900 shadow-xl shadow-slate-900/20 hover:bg-black hover:scale-110 active:scale-95 transition-all border border-slate-800 group"
                            aria-label="Next Project"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* CTA Button */}
                    <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all duration-200 bg-cyan-400 rounded-full hover:bg-cyan-300 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400">
                        <span>REQUEST A QUOTE</span>
                        <ArrowRight className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
