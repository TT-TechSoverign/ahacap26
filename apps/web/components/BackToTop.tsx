'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BackToTopProps {
    visible: boolean;
}

export function BackToTop({ visible }: BackToTopProps) {
    const pathname = usePathname();
    const [isScrollVisible, setIsScrollVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsScrollVisible(true);
            } else {
                setIsScrollVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility(); // Initial check
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Determine if the current page displays the mobile sticky bottom bar
    const excludedPaths = ['/contact', '/checkout', '/admin'];
    const hasBottomBar = !excludedPaths.some(path => pathname?.startsWith(path));

    return (
        <AnimatePresence>
            {(visible && isScrollVisible) && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,174,239,0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed right-6 md:right-8 z-[60] size-12 md:size-14 rounded-full md:rounded-2xl bg-background-dark/80 backdrop-blur-xl border border-primary/30 flex items-center justify-center text-primary shadow-2xl group overflow-hidden",
                        hasBottomBar ? "bottom-24 md:bottom-8" : "bottom-6 md:bottom-8"
                    )}
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
