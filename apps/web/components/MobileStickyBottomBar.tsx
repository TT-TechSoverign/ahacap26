'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { sendGAEvent } from '@next/third-parties/google';
import { Phone, Calendar } from 'lucide-react';

export default function MobileStickyBottomBar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Path-based UI Exclusion
    const excludedPaths = ['/contact', '/checkout', '/admin'];
    const isExcluded = excludedPaths.some(path => pathname?.startsWith(path));

    // Scroll delay to prevent Hero Decision Fatigue
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 300 && !isVisible) setIsVisible(true);
        if (latest <= 300 && isVisible) setIsVisible(false);
    });

    if (isExcluded) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 w-full z-50 flex md:hidden pb-[env(safe-area-inset-bottom)] bg-slate-900 border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
                >
                    <div className="flex w-full p-2 gap-2">
                        {/* Call Now (DNI Tracking) */}
                        <a 
                            href="tel:808-488-1111"
                            onClick={() => sendGAEvent('event', 'click_to_call', { event_category: 'Mobile Conversion', event_label: 'Sticky Bottom Call' })}
                            className="ctm-track-number flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-widest text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-700"
                        >
                            <Phone className="size-4 text-primary" />
                            Call Now
                        </a>
                        
                        {/* Book Online */}
                        <Link 
                            href="/contact"
                            onClick={() => sendGAEvent('event', 'click_to_book', { event_category: 'Mobile Conversion', event_label: 'Sticky Bottom Book' })}
                            className="flex-1 bg-primary hover:bg-cyan-300 text-slate-900 font-black uppercase tracking-widest text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-colors btn-promo-glow btn-shimmer"
                        >
                            <Calendar className="size-4" />
                            Book Online
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
