'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Fan, ShieldCheck, Flame, Gift, ArrowRight } from 'lucide-react';

const Star3D = ({ color, duration, isHovered, sizeClass = "size-5", className, style }: { color: string; duration: string; isHovered: boolean; sizeClass?: string; className: string; style?: React.CSSProperties }) => (
    <div 
        className={`pointer-events-none transition-all duration-700 select-none ${className}`}
        style={{ 
            perspective: '200px',
            opacity: isHovered ? 0.35 : 0.12,
            transform: isHovered ? 'translateZ(45px) scale(1.15) rotate(10deg)' : 'translateZ(0px) scale(1) rotate(0deg)',
            ...style
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

export default function PromoHeroShowcase() {
    const [mounted, setMounted] = useState(false);
    const [isCampaignActive, setIsCampaignActive] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [tiltStyle, setTiltStyle] = useState({});
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: 'translate(-50%, -50%)' });
    const [sparks, setSparks] = useState<{ id: number; left: string; top: string; delay: string; duration: string; driftY: string; color: string }[]>([]);
    
    const cardRef = useRef<HTMLDivElement>(null);
    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST

    useEffect(() => {
        setMounted(true);
        
        // Touch device detection
        const checkTouch = () => {
            setIsTouchDevice(
                'ontouchstart' in window || 
                navigator.maxTouchPoints > 0 || 
                window.matchMedia('(pointer: coarse)').matches
            );
        };
        checkTouch();

        // Check if campaign is active
        const checkActive = () => {
            const now = new Date();
            const active = now.getTime() <= targetDate.getTime();
            setIsCampaignActive(active);
            return active;
        };

        const active = checkActive();
        if (!active) return;

        // Countdown Timer
        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            
            if (diff <= 0) {
                setIsCampaignActive(false);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        // Generate sparks distributed across the hero
        const colors = ['#EF4444', '#FFFFFF', '#3B82F6'];
        const list = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            left: `${60 + Math.random() * 35}%`, // Cluster near the right/center
            top: `${15 + Math.random() * 70}%`,
            delay: `${Math.random() * -3}s`,
            duration: `${3.5 + Math.random() * 2}s`,
            driftY: `${(Math.random() - 0.5) * 40}px`,
            color: colors[i % colors.length]
        }));
        setSparks(list);

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation angles (capped at 6 degrees for premium subtlety)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'transform 0.1s ease-out',
        });

        // Dynamic glare position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setGlareStyle({
            opacity: 0.18,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            transform: 'scale(1.5)',
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

    if (!mounted || !isCampaignActive) return null;

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-6">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8 shadow-2xl transition-all duration-300 card-hover-trigger btn-promo-glow"
            >
                {/* 3D Reflective Glare Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={glareStyle as any}
                />

                {/* Ambient Glowing Background Elements */}
                <div className="absolute -left-20 -top-20 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full pointer-events-none z-0" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none z-0" />

                {/* Animated Cool Air Currents (Wind currents flowing horizontally) */}
                <div 
                    className="absolute inset-0 pointer-events-none overflow-hidden z-0"
                    style={{
                        transform: isHovered ? 'translateZ(-15px) scale(1.03)' : 'translateZ(0px)',
                        transition: 'transform 0.5s ease'
                    }}
                >
                    <svg 
                        viewBox="0 0 500 100" 
                        className="absolute inset-0 w-full h-full opacity-[0.03] text-white"
                        preserveAspectRatio="none"
                    >
                        <path 
                            d="M-20,25 Q120,40 250,25 T520,30" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeDasharray="12 12" 
                            className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                        />
                        <path 
                            d="M-20,55 Q150,30 280,65 T520,50" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeDasharray="15 10" 
                            className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                            style={{ animationDelay: '-1s', animationDirection: 'reverse' } as any}
                        />
                        <path 
                            d="M-20,80 Q90,65 220,85 T520,70" 
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
                <Star3D color="#EF4444" duration="8s" isHovered={isHovered} className="absolute left-[40%] top-[25%] z-0" sizeClass="size-5" />
                <Star3D color="#FFFFFF" duration="10s" isHovered={isHovered} className="absolute left-[52%] bottom-[20%] z-0" sizeClass="size-3.5" />
                <Star3D color="#3B82F6" duration="7s" isHovered={isHovered} className="absolute right-[45%] top-[15%] z-0" sizeClass="size-4.5" />

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
                                }}
                            />
                        ))}
                    </div>
                )}

                <div 
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20"
                    style={{
                        transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
                        transition: 'transform 0.3s ease'
                    }}
                >
                    {/* Left Column: Promotion Info */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            <span className="chrome-heading-shimmer">Celebrating America Promo</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight text-white">
                            Breathe Free & Cool <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-500">
                                This Summer Season
                            </span>
                        </h2>

                        <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                            Save up to <strong className="text-white">$1,000</strong> on high-efficiency central A/C and mini-split installations. Guaranteed premium comfort with local professional service.
                        </p>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-lg bg-red-950/30 border border-red-900/30">
                                    <Gift className="w-4.5 h-4.5 text-red-500" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-slate-200">Up to $1K Off</p>
                                    <p className="text-xs text-slate-400">Selected Split units</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-900/30">
                                    <ShieldCheck className="w-4.5 h-4.5 text-blue-500" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-slate-200">10-Year Warranty</p>
                                    <p className="text-xs text-slate-400">Parts & labor included</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA & Countdown Container */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide transition-all shadow-lg hover:shadow-blue-500/20 btn-shimmer active:scale-95 group text-sm"
                            >
                                Claim Savings
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Offer expires in:</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 min-w-[36px] text-center">
                                        <span className="text-sm font-bold text-white block">{String(countdown.days).padStart(2, '0')}</span>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-tight block">Days</span>
                                    </div>
                                    <span className="text-slate-600 font-bold">:</span>
                                    <div className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 min-w-[36px] text-center">
                                        <span className="text-sm font-bold text-white block">{String(countdown.hours).padStart(2, '0')}</span>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-tight block">Hrs</span>
                                    </div>
                                    <span className="text-slate-600 font-bold">:</span>
                                    <div className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 min-w-[36px] text-center">
                                        <span className="text-sm font-bold text-white block">{String(countdown.minutes).padStart(2, '0')}</span>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-tight block">Min</span>
                                    </div>
                                    <span className="text-slate-600 font-bold">:</span>
                                    <div className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 min-w-[36px] text-center">
                                        <span className="text-sm font-bold text-red-400 block">{String(countdown.seconds).padStart(2, '0')}</span>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-tight block">Sec</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Animated HVAC Vent Frame & Fan */}
                    <div 
                        className="lg:col-span-5 flex justify-center items-center"
                        style={{
                            transform: isHovered ? 'translateZ(30px) scale(1.02)' : 'translateZ(0px)',
                            transition: 'transform 0.4s ease'
                        }}
                    >
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center p-4 shadow-inner group-hover:border-blue-500/30 transition-colors">
                            
                            {/* Blue/Cyan Cool Air Flow Expansion Ring */}
                            <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/20 air-vapor-ring pointer-events-none" />
                            
                            {/* Concentric Vent Shroud Ring with Shifting Glowing Border */}
                            <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-red-500/20 via-white/10 to-blue-500/20 pointer-events-none" />
                            
                            {/* Animated spinning fan overlay */}
                            <div className={`relative transition-all duration-700 ${isHovered ? 'fan-spin-fast text-cyan-400' : 'fan-spin-idle text-slate-600'}`}>
                                <Fan className="w-32 h-32 md:w-40 md:h-40 stroke-[1]" />
                            </div>

                            {/* Center HVAC badge */}
                            <div className="absolute w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg pointer-events-none">
                                <span className="text-[9px] font-bold text-blue-400 tracking-wider">AHAC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
