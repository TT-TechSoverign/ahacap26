'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackToTopProps {
    visible: boolean;
}

export function BackToTop({ visible }: BackToTopProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,174,239,0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] size-12 md:size-14 rounded-full md:rounded-2xl bg-background-dark/80 backdrop-blur-xl border border-primary/30 flex items-center justify-center text-primary shadow-2xl group overflow-hidden"
                    aria-label="Back to top"
                >
                    {/* Neon Glow Pulse */}
                    <div className="absolute inset-0 bg-primary/20 animate-pulse opacity-50"></div>

                    {/* Industrial Icon */}
                    <span className="material-symbols-outlined text-2xl md:text-3xl relative z-10 font-bold group-hover:-translate-y-1 transition-transform">
                        vertical_align_top
                    </span>

                    {/* Glass Reflection */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
