'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Star3D = ({ color, duration, isHovered, sizeClass = "size-5", className }: { color: string; duration: string; isHovered: boolean; sizeClass?: string; className: string }) => (
    <div 
        className={`pointer-events-none transition-all duration-700 select-none ${className}`}
        style={{ 
            perspective: '200px',
            opacity: isHovered ? 0.35 : 0.12,
            transform: isHovered ? 'scale(1.15) rotate(10deg)' : 'scale(1)'
        }}
    >
        <svg 
            viewBox="0 0 24 24" 
            className={`star-3d-y ${sizeClass}`}
            style={{ 
                color,
                filter: `drop-shadow(0 0 6px ${color})`,
                animationDuration: isHovered ? '1.5s' : duration
            }}
        >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" fill="currentColor" />
        </svg>
    </div>
);

export default function PromoRibbonCallout() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [tiltStyle, setTiltStyle] = useState({});
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: 'translate(-50%, -50%)' });
    const [sparks, setSparks] = useState<{ id: number; left: string; top: string; delay: string; duration: string; driftY: string; color: string }[]>([]);

    const cardRef = useRef<HTMLDivElement>(null);
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

        // Generate sparks distributed across the banner
        const colors = ['#EF4444', '#FFFFFF', '#3B82F6'];
        const list = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            left: `${60 + Math.random() * 35}%`, // Cluster near the right/center
            top: `${15 + Math.random() * 70}%`,
            delay: `${Math.random() * -3}s`,
            duration: `${3 + Math.random() * 2}s`,
            driftY: `${(Math.random() - 0.5) * 30}px`,
            color: colors[i % colors.length]
        }));
        setSparks(list);

        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Very subtle rotation since ribbon is extremely wide (max 2.5 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 2.5;
        const rotateY = ((x - centerX) / centerX) * 2.5;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`,
            transition: 'transform 0.1s ease-out',
        });

        // Dynamic glare position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setGlareStyle({
            opacity: 0.1,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            transform: 'scale(1.3)',
            transition: 'opacity 0.2s ease',
        } as any);
    };

    const handleMouseEnter = () => {
        if (isTouchDevice) return;
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s ease',
        });
        setGlareStyle({
            opacity: 0,
            transform: 'scale(1)',
            transition: 'opacity 0.5s ease',
        } as any);
    };

    if (!mounted) return null;

    const now = new Date();
    if (now.getTime() > targetDate.getTime()) return null;

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="w-full bg-[#0a0e14]/90 backdrop-blur-md border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden animate-patriotic-glow mb-10 flex flex-col md:flex-row items-center justify-between gap-4 card-hover-trigger cursor-pointer"
        >
            {/* 3D Reflective Glare Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none z-10"
                style={glareStyle as any}
            />

            {/* Red and Blue Glow overlay */}
            <div className="absolute top-0 left-0 w-32 h-full bg-red-500/5 blur-[50px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-blue-500/5 blur-[50px] rounded-full pointer-events-none z-0"></div>

            {/* Animated Cool Air Currents (Wind currents flowing horizontally) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg 
                    viewBox="0 0 400 60" 
                    className="absolute inset-0 w-full h-full opacity-[0.05] text-white"
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M-20,15 Q80,25 200,15 T420,20" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeDasharray="12 12" 
                        className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                    />
                    <path 
                        d="M-20,35 Q100,20 220,40 T420,30" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeDasharray="15 10" 
                        className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                        style={{ animationDelay: '-1s', animationDirection: 'reverse' } as any}
                    />
                    <path 
                        d="M-20,50 Q60,40 180,55 T420,45" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeDasharray="10 15" 
                        className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                        style={{ animationDelay: '-2s' } as any}
                    />
                </svg>
            </div>

            {/* 3D Spinning Stars (Patriotic Red/White/Blue) */}
            <Star3D color="#EF4444" duration="7s" isHovered={isHovered} className="absolute left-[38%] top-[20%] z-0" />
            <Star3D color="#FFFFFF" duration="9s" isHovered={isHovered} className="absolute left-[58%] bottom-[15%] z-0" sizeClass="size-3.5" />
            <Star3D color="#3B82F6" duration="6s" isHovered={isHovered} className="absolute right-[35%] top-[30%] z-0" sizeClass="size-4.5" />

            {/* Drifting Horizontal Sparks */}
            {isHovered && !isTouchDevice && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    {sparks.map(spark => (
                        <div
                            key={spark.id}
                            className="absolute w-1 h-1 rounded-full bento-spark-horizontal"
                            style={{
                                left: spark.left,
                                top: spark.top,
                                backgroundColor: spark.color,
                                boxShadow: `0 0 6px ${spark.color}`,
                                animationDelay: spark.delay,
                                animationDuration: spark.duration,
                                '--drift-y': spark.driftY,
                                opacity: 0.7
                            } as any}
                        />
                    ))}
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative z-10">
                {/* Dynamic Icon Shroud: Spins on Hover */}
                <div className="size-10 rounded-xl bg-gradient-to-br from-red-600 via-slate-900 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg border border-white/10 overflow-hidden relative group/icon">
                    <div className={`absolute inset-0 bg-black/20 opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none`} />
                    <span className={`material-symbols-outlined text-lg ${isHovered ? 'fan-spin-fast text-cyan-400' : 'animate-pulse-slow'}`}>
                        ac_unit
                    </span>
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
                    className="w-full sm:w-auto text-center px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-header font-black uppercase tracking-[0.2em] text-[9px] rounded-lg transition-all shadow-md active:scale-95 btn-shimmer"
                >
                    Claim 10% Off
                </Link>
            </div>
        </div>
    );
}
