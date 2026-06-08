'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PromoBentoCard() {
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
        <div className="w-full bg-[#0a0e14]/90 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden animate-patriotic-glow mb-12">
            {/* Ambient gradients */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-6 mb-6">
                <div className="text-center md:text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 bg-red-950/40 border border-red-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2.5">
                        <span className="size-1 bg-red-500 rounded-full animate-ping"></span>
                        Limited-Time Event
                    </span>
                    <h3 className="text-xl md:text-2xl font-header font-black uppercase tracking-tight text-white">
                        Celebrating <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-400">America</span> Promo
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Get 10% off any air conditioner, schedule installation for July.</p>
                </div>
                
                {/* Live Countdown */}
                <div className="flex items-center gap-2.5 bg-slate-950 border border-white/10 px-4 py-2 rounded-2xl shadow-inner">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Ends In:</span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] md:text-xs font-black text-cyan-400">
                        <span>{timeLeft.days}d</span>
                        <span>:</span>
                        <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
                        <span>:</span>
                        <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
                        <span>:</span>
                        <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
                    </div>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl relative overflow-hidden group/item hover:border-red-500/20 transition-all">
                    <div className="size-8 rounded-lg bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-500 mb-3 shadow-inner">
                        <span className="material-symbols-outlined text-lg">local_offer</span>
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-1">10% OFF all AC Units</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Automatic promo discount is applied on checkout to all mini splits and window AC inventory.</p>
                </div>

                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl relative overflow-hidden group/item hover:border-slate-500/20 transition-all">
                    <div className="size-8 rounded-lg bg-slate-850 border border-white/10 flex items-center justify-center text-white mb-3 shadow-inner">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-1">July Install Window</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Schedule your installation appointment for July to secure your discount lock-in.</p>
                </div>

                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl relative overflow-hidden group/item hover:border-blue-500/20 transition-all">
                    <div className="size-8 rounded-lg bg-blue-950/40 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                        <span className="material-symbols-outlined text-lg">payments</span>
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-1">Down Payment Guard</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Coordinate a small holding down payment with our representatives after checkout booking.</p>
                </div>
            </div>

            <div className="flex justify-center relative z-10">
                <Link 
                    href="/shop"
                    className="w-full sm:w-auto text-center px-6 py-3.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-header font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all shadow-[0_4px_20px_rgba(220,38,38,0.2)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95"
                >
                    Shop Staged Inventory
                </Link>
            </div>
        </div>
    );
}
