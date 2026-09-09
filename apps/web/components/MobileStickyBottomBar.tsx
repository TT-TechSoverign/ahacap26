'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { Phone, Calendar, ShoppingCart, Sparkles, Wrench, ArrowRight } from 'lucide-react';

export default function MobileStickyBottomBar() {
    const pathname = usePathname() || '';
    const [isVisible, setIsVisible] = useState(false);

    // Path-based UI Exclusion
    const excludedPaths = ['/contact', '/checkout', '/admin'];
    const isExcluded = excludedPaths.some(path => pathname.startsWith(path));

    // Scroll delay to prevent Hero Decision Fatigue
    useEffect(() => {
        const handleScroll = () => {
            const latest = window.scrollY;
            if (latest > 300 && !isVisible) setIsVisible(true);
            if (latest <= 300 && isVisible) setIsVisible(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    if (isExcluded) return null;

    // Context-Aware CTA Resolver
    const getCtaConfig = () => {
        // 1. Specific Product Detail & Product Landing Pages
        if (pathname.startsWith('/shop/') && !pathname.endsWith('/window-ac-plug-guide') && !pathname.endsWith('/lg-dual-inverter-guide')) {
            return {
                text: 'Book Appt (Zero $)',
                icon: Calendar,
                href: '/contact?service=window_ac_purchase',
                gaEvent: 'click_to_book_product',
                gaLabel: 'Sticky Bottom Product Appt'
            };
        }

        // 2. Main Shop Catalog
        if (pathname === '/shop') {
            return {
                text: 'Book Appt Form',
                icon: Calendar,
                href: '/contact',
                gaEvent: 'click_to_book_catalog',
                gaLabel: 'Sticky Bottom Catalog Appt'
            };
        }

        // 3. Cleaning & Maintenance
        if (pathname.includes('cleaning') || pathname.includes('maintenance')) {
            return {
                text: 'Book $275 Teardown',
                icon: Sparkles,
                href: '/contact?service=cleaning',
                gaEvent: 'click_to_book_cleaning',
                gaLabel: 'Sticky Bottom Book Cleaning'
            };
        }

        // 4. AC Repair
        if (pathname.includes('repair')) {
            return {
                text: 'Diagnose AC Fault',
                icon: Wrench,
                href: '/contact?service=repair',
                gaEvent: 'click_to_book_repair',
                gaLabel: 'Sticky Bottom Book Repair'
            };
        }

        // 5. Mini Split Pages
        if (pathname === '/mini_split_ac') {
            return {
                text: 'Free Survey (Zero $)',
                icon: Calendar,
                scrollTarget: 'system-builder',
                href: '/mini_split_ac#system-builder',
                gaEvent: 'click_to_estimate',
                gaLabel: 'Sticky Bottom Mini Split Builder'
            };
        }

        if (pathname.includes('mini-split')) {
            return {
                text: 'Free Survey (Zero $)',
                icon: Calendar,
                href: '/mini-split-estimate',
                gaEvent: 'click_to_estimate',
                gaLabel: 'Sticky Bottom Mini Split Estimate'
            };
        }

        // 6. Sizing, Comparisons & Guides
        if (pathname === '/sizing' || pathname.includes('guide') || pathname.includes('vs')) {
            return {
                text: 'Book Consultation',
                icon: Calendar,
                href: '/contact',
                gaEvent: 'click_to_book_consult',
                gaLabel: 'Sticky Bottom Guide Consult'
            };
        }

        // 7. Default Site-Wide CTA
        return {
            text: 'Book Appt (Zero $)',
            icon: Calendar,
            href: '/contact',
            gaEvent: 'click_to_book',
            gaLabel: 'Sticky Bottom Book'
        };
    };

    const cta = getCtaConfig();

    return (
        <div
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)'
            }}
            className="fixed bottom-0 left-0 w-full z-50 flex flex-col md:hidden bg-slate-900 border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
        >
            {/* By Appointment First • Friction-Free Trust Banner */}
            <div className="w-full bg-slate-950/95 border-b border-white/10 px-3 py-1 flex items-center justify-between text-[10px] text-slate-300">
                <div className="flex items-center gap-1.5 font-medium truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-[9px]">By Appt First</span>
                    <span className="text-slate-500">•</span>
                    <span className="truncate text-slate-200">Zero Online Payment Required</span>
                </div>
                <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-wider shrink-0 pl-1">
                    Better Phone Cost
                </span>
            </div>

            <div className="flex w-full p-2 gap-2">
                {/* Call Now (DNI Tracking & Better Cost Framing) */}
                <a 
                    href="tel:808-488-1111"
                    onClick={() => sendGAEvent('event', 'click_to_call', { event_category: 'Mobile Conversion', event_label: 'Sticky Bottom Call' })}
                    className="ctm-track-number flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-wider text-xs py-2 min-h-[48px] rounded-lg flex flex-col items-center justify-center transition-colors border border-slate-700 active:scale-95 leading-tight"
                >
                    <div className="flex items-center gap-1.5">
                        <Phone className="size-3.5 text-primary shrink-0" />
                        <span>Call (Best Cost)</span>
                    </div>
                    <span className="text-[9px] text-cyan-300 font-normal normal-case tracking-normal">(808) 488-1111</span>
                </a>
                
                {/* Dynamic Context Action CTA */}
                {cta.scrollTarget ? (
                    <a 
                        href={`#${cta.scrollTarget}`}
                        onClick={(e) => {
                            const el = document.getElementById(cta.scrollTarget!);
                            if (el) {
                                e.preventDefault();
                                el.scrollIntoView({ behavior: 'smooth' });
                            }
                            sendGAEvent('event', cta.gaEvent, { event_category: 'Mobile Conversion', event_label: cta.gaLabel });
                        }}
                        className="flex-1 bg-primary hover:bg-cyan-300 text-slate-950 font-black uppercase tracking-wider text-xs py-3 min-h-[48px] rounded-lg flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(0,174,239,0.4)] active:scale-95 btn-promo-glow btn-shimmer"
                    >
                        <cta.icon className="size-4 shrink-0" />
                        <span className="truncate">{cta.text}</span>
                    </a>
                ) : (
                    <Link 
                        href={cta.href}
                        prefetch={false}
                        onClick={() => sendGAEvent('event', cta.gaEvent, { event_category: 'Mobile Conversion', event_label: cta.gaLabel })}
                        className="flex-1 bg-primary hover:bg-cyan-300 text-slate-950 font-black uppercase tracking-wider text-xs py-3 min-h-[48px] rounded-lg flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(0,174,239,0.4)] active:scale-95 btn-promo-glow btn-shimmer"
                    >
                        <cta.icon className="size-4 shrink-0" />
                        <span className="truncate">{cta.text}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
