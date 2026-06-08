'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { isCampaignActive } from '../lib/utils';

export default function PromoStickyBar() {
    const [mounted, setMounted] = useState(false);
    const [dismissed, setDismissed] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST

    useEffect(() => {
        setMounted(true);
        const isDismissed = localStorage.getItem('promo_dismissed') === 'true';
        setDismissed(isDismissed);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    const now = new Date();
    const isExpired = now.getTime() > targetDate.getTime();

    if (dismissed || isExpired || !isCampaignActive()) return null;

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        localStorage.setItem('promo_dismissed', 'true');
        setDismissed(true);
    };

    return (
        <div className="relative z-[9999] w-full bg-gradient-to-r from-red-600 via-white to-blue-600 p-[1.5px] shadow-[0_4px_30px_rgba(239,68,68,0.2)] animate-pulse-slow">
            <Link href="/shop" className="block w-full bg-slate-950/95 hover:bg-slate-950/80 transition-colors py-1.5 sm:py-2 px-4 text-center text-white relative group overflow-hidden">
                {/* Wavy background glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <div className="max-w-7xl mx-auto flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-0.5 text-[10px] sm:text-xs md:text-sm font-header uppercase tracking-wider relative z-10">
                    <div className="flex items-center gap-2 justify-center">
                        {/* Mini Waving CSS Flag */}
                        <div className="flex gap-[1px] h-3.5 w-5 shrink-0 overflow-hidden rounded-[1px] border border-white/10 relative bg-slate-900 shadow-md">
                            {/* Blue canton with stars */}
                            <div className="w-2.5 h-2 bg-blue-700 relative flex flex-wrap gap-[0.5px] p-[0.5px] shrink-0 z-10">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="size-[0.8px] bg-white rounded-full animate-pulse-slow" style={{ animationDelay: `${i * 100}ms` }} />
                                ))}
                            </div>
                            {/* Stripes */}
                            <div className="absolute inset-0 flex flex-col">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="w-full h-[8%] bg-red-600" style={{ marginTop: i === 0 ? '0' : '12%' }} />
                                ))}
                            </div>
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent mix-blend-overlay animate-wave" />
                        </div>
 
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-slate-100 to-blue-400 animate-shimmer">
                            Celebrating America Sale: 10% OFF all AC units!
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 bg-slate-900/90 border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-mono font-black text-cyan-400 shadow-inner">
                        <span>HURRY, ENDS IN:</span>
                        <span>{timeLeft.days}D</span>
                        <span>:</span>
                        <span>{timeLeft.hours.toString().padStart(2, '0')}H</span>
                        <span>:</span>
                        <span>{timeLeft.minutes.toString().padStart(2, '0')}M</span>
                        <span>:</span>
                        <span>{timeLeft.seconds.toString().padStart(2, '0')}S</span>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes wave-flag {
                        0% { transform: skewY(-1deg) translateY(0); }
                        50% { transform: skewY(1deg) translateY(-2px); }
                        100% { transform: skewY(-1deg) translateY(0); }
                    }
                    .animate-wave {
                        animation: wave-flag 2.5s ease-in-out infinite;
                    }
                `}</style>

                <button 
                    onClick={handleDismiss}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors duration-200"
                    title="Dismiss alert"
                >
                    <span className="material-symbols-outlined text-base md:text-lg">close</span>
                </button>
            </Link>
        </div>
    );
}
