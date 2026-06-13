'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Tag, Calendar, CreditCard } from 'lucide-react';

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

interface BentoSubCardProps {
    title: string;
    description: string;
    icon: 'local_offer' | 'calendar_today' | 'payments';
    themeColor: 'red' | 'white' | 'blue';
}

function BentoSubCard({ title, description, icon, themeColor }: BentoSubCardProps) {
    const IconComponent = {
        local_offer: Tag,
        calendar_today: Calendar,
        payments: CreditCard,
    }[icon] || Tag;
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [tiltStyle, setTiltStyle] = useState({});
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: 'translate(-50%, -50%)' });
    const [sparks, setSparks] = useState<{ id: number; left: string; delay: string; duration: string; drift: string }[]>([]);

    useEffect(() => {
        setIsTouchDevice(
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            window.matchMedia('(pointer: coarse)').matches
        );

        // Generate static properties for sparks
        const list = Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            left: `${15 + Math.random() * 70}%`,
            delay: `${Math.random() * -3}s`,
            duration: `${1.8 + Math.random() * 1.5}s`,
            drift: `${(Math.random() - 0.5) * 45}px`
        }));
        setSparks(list);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation angles (capped at 5 degrees for premium subtlety)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setTiltStyle({
            transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'transform 0.1s ease-out',
        });

        // Dynamic glare position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setGlareStyle({
            opacity: 0.12,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            transform: 'scale(1.2)',
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
            transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s ease',
        });
        setGlareStyle({
            opacity: 0,
            transform: 'scale(1)',
            transition: 'opacity 0.5s ease',
        } as any);
    };

    // Color theme mappings
    const themeStyles = {
        red: {
            borderClass: "hover:border-red-500/30",
            iconBg: "bg-red-950/40 border-red-500/20 text-red-500",
            glowColor: "rgba(239, 68, 68, 0.08)",
            glowColorHover: "rgba(239, 68, 68, 0.16)",
            sparkColor: "#EF4444",
            ambientGlow: "bg-red-500/5"
        },
        white: {
            borderClass: "hover:border-white/30",
            iconBg: "bg-slate-850 border-white/10 text-white",
            glowColor: "rgba(255, 255, 255, 0.05)",
            glowColorHover: "rgba(255, 255, 255, 0.12)",
            sparkColor: "#FFFFFF",
            ambientGlow: "bg-slate-500/5"
        },
        blue: {
            borderClass: "hover:border-blue-500/30",
            iconBg: "bg-blue-950/40 border-blue-500/20 text-blue-400",
            glowColor: "rgba(59, 130, 246, 0.08)",
            glowColorHover: "rgba(59, 130, 246, 0.16)",
            sparkColor: "#3B82F6",
            ambientGlow: "bg-blue-500/5"
        }
    }[themeColor];

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
            className={`bg-[#0c121d]/90 border border-white/5 p-4 rounded-2xl relative overflow-hidden group/item transition-all duration-300 card-hover-trigger cursor-pointer ${themeStyles.borderClass}`}
        >
            {/* Soft Radial Ambient Glow */}
            <div 
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${isHovered ? themeStyles.glowColorHover : themeStyles.glowColor} 0%, transparent 70%)`
                }}
            />

            {/* 3D Reflective Glare */}
            <div 
                className="absolute inset-0 pointer-events-none z-20"
                style={glareStyle as any}
            />

            {/* Animated HVAC Background */}
            {themeColor === 'white' ? (
                /* White Card: Cool Air Currents (Wind currents flowing) */
                <div 
                    className="absolute inset-0 pointer-events-none overflow-hidden z-0"
                    style={{
                        transform: isHovered ? 'translateZ(-15px) scale(1.05)' : 'translateZ(0px)',
                        transition: 'transform 0.5s ease'
                    }}
                >
                    <svg 
                        viewBox="0 0 120 80" 
                        className="absolute inset-0 w-full h-full opacity-[0.06] text-white"
                        preserveAspectRatio="none"
                    >
                        <path 
                            d="M-20,20 Q20,35 60,20 T140,25" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeDasharray="10 10" 
                            className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                        />
                        <path 
                            d="M-20,40 Q30,20 70,50 T140,35" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeDasharray="12 8" 
                            className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                            style={{ animationDelay: '-1.5s', animationDirection: 'reverse' } as any}
                        />
                        <path 
                            d="M-20,60 Q10,45 50,65 T140,50" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeDasharray="8 12" 
                            className={`wind-flow-line ${isHovered ? 'wind-flow-line-fast' : ''}`}
                            style={{ animationDelay: '-3s' } as any}
                        />
                    </svg>
                </div>
            ) : (
                /* Red/Blue Cards: Spinning HVAC Fan Vectors */
                <div 
                    className="absolute inset-0 pointer-events-none overflow-hidden z-0"
                    style={{
                        transform: isHovered ? 'translateZ(-15px) scale(1.05)' : 'translateZ(0px)',
                        transition: 'transform 0.5s ease'
                    }}
                >
                    <svg 
                        viewBox="0 0 100 100" 
                        className={`absolute bottom-[-15px] right-[-15px] size-28 opacity-[0.05] transition-all duration-1000 ${
                            themeColor === 'red' ? 'text-red-500' : 'text-blue-500'
                        } ${isHovered ? 'fan-spin-fast' : 'fan-spin-idle'}`}
                    >
                        <circle cx="50" cy="50" r="8" fill="currentColor" />
                        <path d="M50,50 Q40,20 50,10 Q60,20 50,50 Z" fill="currentColor" />
                        <path d="M50,50 Q80,40 90,50 Q80,60 50,50 Z" fill="currentColor" />
                        <path d="M50,50 Q60,80 50,90 Q40,80 50,50 Z" fill="currentColor" />
                        <path d="M50,50 Q20,60 10,50 Q20,40 50,50 Z" fill="currentColor" />
                    </svg>
                </div>
            )}

            {/* 3D Spinning Star (Color-matched to sub-card theme) */}
            <Star3D 
                color={themeStyles.sparkColor} 
                duration="6.5s" 
                isHovered={isHovered} 
                className="absolute right-[22%] top-[15%] z-0" 
                sizeClass="size-4.5"
            />

            {/* Hover Floating Sparks (Patriotic themed) */}
            {isHovered && !isTouchDevice && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    {sparks.map(spark => (
                        <div
                            key={spark.id}
                            className="absolute w-1 h-1 rounded-full bento-spark"
                            style={{
                                left: spark.left,
                                bottom: '-5px',
                                backgroundColor: themeStyles.sparkColor,
                                boxShadow: `0 0 6px ${themeStyles.sparkColor}`,
                                animationDelay: spark.delay,
                                animationDuration: spark.duration,
                                '--drift-x': spark.drift,
                                opacity: 0.7
                            } as any}
                        />
                    ))}
                </div>
            )}

            {/* Card Content */}
            <div 
                className="relative z-10"
                style={{
                    transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
                    transition: 'transform 0.3s ease'
                }}
            >
                <div className={`size-8 rounded-lg ${themeStyles.iconBg} flex items-center justify-center mb-3 shadow-inner`}>
                    <IconComponent className="size-5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-1">{title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{description}</p>
            </div>
        </div>
    );
}

import { isCampaignActive } from '../lib/utils';

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

    if (!isCampaignActive()) return null;

    return (
        <div className="w-full bg-[#0a0e14]/90 backdrop-blur-md border border-white/5 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden animate-patriotic-glow mb-8">
            {/* Ambient gradients */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full"></div>
 
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-4 mb-4">
                <div className="text-center md:text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 bg-red-950/40 border border-red-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
                        <span className="size-1 bg-red-500 rounded-full animate-ping"></span>
                        Limited-Time Event
                    </span>
                    <h3 className="text-lg md:text-xl font-header font-black uppercase tracking-tight text-white">
                        Celebrating <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-400">America</span> Promo
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Get 10% off any air conditioner, schedule installation for July.</p>
                </div>
                
                {/* Live Countdown */}
                <div className="flex items-center gap-2 bg-slate-950 border border-white/10 px-3 py-1.5 rounded-xl shadow-inner">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Ends In:</span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] md:text-xs font-black text-cyan-400" suppressHydrationWarning>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 relative z-10">
                <BentoSubCard 
                    title="10% OFF all AC Units"
                    description="Automatic promo discount is applied on checkout to all mini splits and window AC inventory."
                    icon="local_offer"
                    themeColor="red"
                />
                <BentoSubCard 
                    title="July Install Window"
                    description="Schedule your installation appointment for July to secure your discount lock-in."
                    icon="calendar_today"
                    themeColor="white"
                />
                <BentoSubCard 
                    title="Down Payment Guard"
                    description="Coordinate a small holding down payment with our representatives after checkout booking."
                    icon="payments"
                    themeColor="blue"
                />
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
