'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PromoRibbonCallout() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST

    useEffect(() => {
        setMounted(true);
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
    if (now.getTime() > targetDate.getTime()) return null;

    return (
        <div className="w-full bg-[#0a0e14]/90 backdrop-blur-md border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden animate-patriotic-glow mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Red and Blue Glow overlay */}
            <div className="absolute top-0 left-0 w-32 h-full bg-red-500/5 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-blue-500/5 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative z-10">
                <div className="size-10 rounded-xl bg-gradient-to-br from-red-600 via-slate-900 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg border border-white/10">
                    <span className="material-symbols-outlined text-lg animate-pulse-slow">ac_unit</span>
                </div>
                <div>
                    <h4 className="text-sm md:text-base font-header font-black uppercase tracking-wider text-white">
                        🇺🇸 Celebrating America Sale: <span className="text-cyan-400">10% OFF ALL AC UNITS</span>
                    </h4>
                    <p className="text-[10px] md:text-xs text-slate-400 font-medium">Book your service, place a holding down payment, and install in July to lock in seasonal promo rates.</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0 relative z-10">
                {/* Live Countdown */}
                <div className="flex items-center gap-2 bg-slate-950 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono font-black text-cyan-400 shadow-inner">
                    <span className="text-slate-500 text-[8px] uppercase tracking-widest">Ends In:</span>
                    <span>{timeLeft.days}D</span>
                    <span>:</span>
                    <span>{timeLeft.hours.toString().padStart(2, '0')}H</span>
                    <span>:</span>
                    <span>{timeLeft.minutes.toString().padStart(2, '0')}M</span>
                    <span>:</span>
                    <span>{timeLeft.seconds.toString().padStart(2, '0')}S</span>
                </div>

                <Link 
                    href="/shop"
                    className="w-full sm:w-auto text-center px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-header font-black uppercase tracking-[0.2em] text-[9px] rounded-lg transition-all shadow-md active:scale-95"
                >
                    Claim 10% Off
                </Link>
            </div>
        </div>
    );
}
