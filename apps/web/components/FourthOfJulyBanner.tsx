'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
}

import { isCampaignActive } from '../lib/utils';

export default function FourthOfJulyBanner() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [tiltStyle, setTiltStyle] = useState({});
    
    const bannerRef = useRef<HTMLDivElement>(null);
    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST

    useEffect(() => {
        setMounted(true);
        setIsTouchDevice(
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            window.matchMedia('(pointer: coarse)').matches
        );

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

    // Particle Animation Loop
    useEffect(() => {
        if (particles.length === 0) return;

        const frame = requestAnimationFrame(() => {
            setParticles(prev => 
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.15, // gravity
                        vx: p.vx * 0.98, // drag
                        size: Math.max(0, p.size - 0.15)
                    }))
                    .filter(p => p.size > 0)
            );
        });

        return () => cancelAnimationFrame(frame);
    }, [particles]);

    const handleInteraction = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
        if (!bannerRef.current) return;
        const rect = bannerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Generate firework particles (denser, high-density spark bursts)
        const colors = ['#EF4444', '#FFFFFF', '#3B82F6', '#F59E0B', '#10B981'];
        const numSparks = isTouchDevice ? 10 : 25;
        const newParticles: Particle[] = Array.from({ length: numSparks }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / numSparks + (Math.random() - 0.5) * 0.5;
            const speed = 2 + Math.random() * 4;
            return {
                id: Date.now() + Math.random(),
                x: clickX,
                y: clickY,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 3 + Math.random() * 4,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2 // initially upwards
            };
        });

        setParticles(prev => [...prev, ...newParticles].slice(-120)); // Cap particles at 120
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Trigger firework sparks
        handleInteraction(e);

        if (isTouchDevice || !bannerRef.current) return;
        const rect = bannerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Subtle 3D tilt (capped at 4 degrees)
        const rotateX = ((centerY - y) / centerY) * 4;
        const rotateY = ((x - centerX) / centerX) * 4;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
            transition: 'transform 0.1s ease-out',
        });
    };

    const handleMouseLeave = () => {
        if (isTouchDevice) return;
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s ease',
        });
    };

    if (!isCampaignActive()) return null;

    return (
        <div 
            ref={bannerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="w-full relative bg-slate-950 border border-red-500/30 rounded-3xl p-6 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)] group card-hover-trigger"
        >
            {/* Dynamic Grid Background with Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
            
            {/* Red and Blue Glow Orbs */}
            <div className="absolute -top-24 -left-24 size-96 bg-red-600/10 blur-[100px] rounded-full group-hover:bg-red-600/20 transition-colors duration-1000"></div>
            <div className="absolute -bottom-24 -right-24 size-96 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-colors duration-1000"></div>

            {/* Firework Particles Canvas Layer */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute rounded-full shadow-[0_0_10px_currentColor]"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            color: p.color,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Waving Flag & Core Text */}
                <div className="space-y-4 text-center lg:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        {/* CSS Waving Flag */}
                        <div className="flex gap-[2px] h-8 w-12 shrink-0 overflow-hidden rounded-[2px] shadow-lg border border-white/5 relative bg-slate-900">
                            {/* Blue canton with stars */}
                            <div className="w-5 h-5 bg-blue-700 relative flex flex-wrap gap-[1px] p-[1.5px] shrink-0 z-10">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="size-[2px] bg-white rounded-full animate-pulse-slow" style={{ animationDelay: `${i * 100}ms` }} />
                                ))}
                            </div>
                            {/* 13 Stripes */}
                            <div className="absolute inset-0 flex flex-col">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <div key={i} className="w-full h-[4.57%] bg-red-600" style={{ marginTop: i === 0 ? '0' : '9.14%' }} />
                                ))}
                            </div>
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent mix-blend-overlay animate-wave" />
                        </div>
                        
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-red-500 bg-red-950/40 border border-red-500/20 px-3 py-1.5 rounded-full shadow-inner flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-red-500 animate-ping"></span>
                            4th of July Celebration
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-header font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] leading-none chrome-heading-shimmer">
                        Celebrating <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-400">America</span>
                    </h2>
                    
                    <p className="text-slate-400 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                        Beat the summer heat with a historic <span className="text-white font-bold">10% promotional discount</span> on all premium ductless mini-split units. Install by July to lock in your seasonal rates.
                    </p>
                </div>

                {/* Countdown & Action Button */}
                <div className="flex flex-col items-center lg:items-end gap-6 shrink-0 w-full lg:w-auto">
                    <div className="grid grid-cols-4 gap-3 text-center">
                        {[
                            { label: 'Days', val: timeLeft.days },
                            { label: 'Hours', val: timeLeft.hours },
                            { label: 'Mins', val: timeLeft.minutes },
                            { label: 'Secs', val: timeLeft.seconds }
                        ].map((t, idx) => (
                            <div key={idx} className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl min-w-[70px] md:min-w-[85px] shadow-xl relative overflow-hidden group/card">
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 opacity-30 group-hover/card:opacity-100 transition-opacity"></div>
                                <span className="block text-2xl md:text-3xl font-header font-black text-white" suppressHydrationWarning>{t.val.toString().padStart(2, '0')}</span>
                                <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{t.label}</span>
                            </div>
                        ))}
                    </div>

                    <Link 
                        href="/shop"
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-header font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-[0_4px_30px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_40px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                    >
                        {/* Shimmer light bar */}
                        <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000"></div>
                        Shop Sale Units
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

            </div>

            {/* Custom WAVING Animation Injected in Style Tag */}
            <style jsx global>{`
                @keyframes wave-flag {
                    0% { transform: skewY(-1deg) translateY(0); }
                    50% { transform: skewY(1deg) translateY(-2px); }
                    100% { transform: skewY(-1deg) translateY(0); }
                }
                .animate-wave {
                    animation: wave-flag 2.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
