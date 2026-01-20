'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { EditableText } from './EditableText';

interface CarouselSlide {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    category?: string;
    location?: string;
}

interface ImageCarouselProps {
    slides: CarouselSlide[];
}

export function ImageCarousel({ slides }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
        })
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-advance
    useEffect(() => {
        // Only run timer if the section is in view
        if (!isInView) return;

        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [slides.length, isInView]);

    if (!slides || slides.length === 0) return null;

    return (
        <section
            ref={containerRef}
            className="bg-background-dark py-12 lg:py-16 border-y border-white/5 overflow-hidden relative"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] pointer-events-none opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header (Compact) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 border-l-2 border-primary text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-3">
                            Project Showcase
                        </div>
                        <h2 className="text-3xl md:text-5xl font-header font-bold text-white uppercase tracking-tight leading-none">
                            INNOVATION IN <span className="text-primary italic font-black">PRACTICE</span>
                        </h2>
                    </div>
                </div>

                {/* Gallery Stage (Innovation Stack) */}
                <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full bg-black rounded-3xl border border-white/10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] group cursor-grab active:cursor-grabbing">

                    {/* Layer 1: Frosted Blur Background */}
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={`bg-${currentIndex}`}
                            custom={direction}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-0"
                        >
                            <Image
                                src={slides[currentIndex].image}
                                alt="blur-bg"
                                fill
                                className="object-cover blur-[80px] scale-110 opacity-60"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Layer 2: High-Fidelity Foreground */}
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;
                                if (swipe) {
                                    if (offset.x > 0) prevSlide();
                                    else nextSlide();
                                }
                            }}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 }
                            }}
                            className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-12 touch-pan-y"
                        >
                            <div className="relative h-full w-full pointer-events-none select-none">
                                <Image
                                    src={slides[currentIndex].image}
                                    alt={slides[currentIndex].title}
                                    fill
                                    className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Integrated Narrative Dock (Bottom) */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <div className="max-w-4xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="pointer-events-auto"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase bg-primary/20 backdrop-blur-md px-3 py-1 rounded border border-primary/20">
                                            <EditableText contentKey={`landing.services.carousel.${currentIndex}.category`} />
                                        </span>
                                        <span className="text-white/60 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1 rounded border border-white/5">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            <EditableText contentKey={`landing.services.carousel.${currentIndex}.location`} />
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-header font-bold text-white uppercase mb-2 tracking-tight drop-shadow-lg">
                                        <EditableText contentKey={`landing.services.carousel.${currentIndex}.title`} />
                                    </h3>
                                    <p className="text-slate-200 text-sm md:text-base italic leading-relaxed max-w-2xl drop-shadow-md opacity-90">
                                        <EditableText contentKey={`landing.services.carousel.${currentIndex}.subtitle`} />
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Pagination Dock (Center Right) */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3 p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > currentIndex ? 1 : -1);
                                    setCurrentIndex(i);
                                }}
                                className={cn(
                                    "transition-all duration-500 rounded-full w-2",
                                    i === currentIndex
                                        ? "h-10 bg-primary shadow-[0_0_15px_rgba(0,174,239,0.8)]"
                                        : "h-2 bg-white/20 hover:bg-white/40"
                                )}
                            />
                        ))}
                    </div>

                    {/* Progress Bar (Bottom Edge) */}
                    <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full overflow-hidden z-40">
                        <motion.div
                            key={currentIndex + (isInView ? '-active' : '-paused')}
                            initial={{ width: "0%" }}
                            animate={{ width: isInView ? "100%" : "0%" }}
                            transition={{ duration: isInView ? 8 : 0, ease: "linear" }}
                            className="h-full bg-primary shadow-[0_0_15px_rgba(0,174,239,0.6)]"
                        />
                    </div>

                    {/* Navigation Arrows (Large Screen - Subtle corners) */}
                    <div className="absolute top-8 right-8 z-30 hidden md:flex items-center gap-3">
                        <button onClick={prevSlide} className="size-12 rounded-full border border-white/10 bg-black/40 text-white flex items-center justify-center hover:bg-primary hover:text-black transition-all backdrop-blur-xl group/btn active:scale-95">
                            <span className="material-symbols-outlined text-2xl group-hover/btn:-translate-x-0.5 transition-transform">chevron_left</span>
                        </button>
                        <button onClick={nextSlide} className="size-12 rounded-full border border-white/10 bg-black/40 text-white flex items-center justify-center hover:bg-primary hover:text-black transition-all backdrop-blur-xl group/btn active:scale-95">
                            <span className="material-symbols-outlined text-2xl group-hover/btn:translate-x-0.5 transition-transform">chevron_right</span>
                        </button>
                    </div>

                    {/* Mobile Navigation Guard */}
                    <div className="absolute top-6 left-6 z-30 pointer-events-none opacity-40 select-none">
                        <div className="text-[10px] font-mono text-primary flex items-center gap-2 tracking-[0.3em]">
                            <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,174,239,1)]"></span>
                            STAGED_ACTIVE
                        </div>
                    </div>
                </div>

                {/* Mobile Controls (Docked below for ergonomics) */}
                <div className="flex md:hidden justify-between items-center mt-6 gap-4">
                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <div key={i} className={cn("size-1.5 rounded-full transition-all duration-300", i === currentIndex ? "w-6 bg-primary" : "bg-white/20")} />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-primary transition-all">
                            <span className="material-symbols-outlined text-2xl">chevron_left</span>
                        </button>
                        <button onClick={nextSlide} className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-primary transition-all">
                            <span className="material-symbols-outlined text-2xl">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
