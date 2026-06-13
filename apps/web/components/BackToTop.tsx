'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';

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

    const active = visible && isScrollVisible;

    return (
        <button
            onClick={scrollToTop}
            className={cn(
                "fixed right-6 md:right-8 z-[60] size-12 md:size-14 rounded-full md:rounded-2xl bg-background-dark/80 backdrop-blur-xl border border-primary/30 flex items-center justify-center text-primary shadow-2xl group overflow-hidden transition-all duration-300 ease-out transform hover:scale-110 active:scale-95",
                active 
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 scale-50 translate-y-5 pointer-events-none",
                hasBottomBar ? "bottom-24 md:bottom-8" : "bottom-6 md:bottom-8"
            )}
            style={{
                boxShadow: active ? '0 0 20px rgba(0, 174, 239, 0.15)' : 'none'
            }}
            aria-label="Back to top"
        >
            {/* Neon Glow Pulse */}
            <div className="absolute inset-0 bg-primary/20 animate-pulse opacity-50"></div>

            {/* Industrial Icon */}
            <ArrowUp className="size-6 md:size-8 relative z-10 font-bold group-hover:-translate-y-1 transition-transform" />

            {/* Glass Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        </button>
    );
}
