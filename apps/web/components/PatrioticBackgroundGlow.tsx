'use client';

import { useEffect, useState } from 'react';

interface Star {
    id: number;
    left: string;
    top: string;
    size: number;
    delay: string;
    duration: string;
    color: string;
}

export default function PatrioticBackgroundGlow() {
    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<Star[]>([]);
    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST

    useEffect(() => {
        setMounted(true);
        
        // Generate soft star-like background spark particles
        const colors = ['rgba(239, 68, 68, 0.15)', 'rgba(255, 255, 255, 0.1)', 'rgba(59, 130, 246, 0.15)'];
        const list: Star[] = Array.from({ length: 24 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: 1.5 + Math.random() * 3,
            delay: `${Math.random() * -20}s`,
            duration: `${20 + Math.random() * 20}s`,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setStars(list);
    }, []);

    if (!mounted) return null;

    const now = new Date();
    if (now.getTime() > targetDate.getTime()) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
            {/* Soft, slow moving background glowing ambient orbs */}
            <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-red-600/3 blur-[150px] rounded-full animate-float-slow pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] max-w-[650px] bg-blue-600/3 blur-[150px] rounded-full animate-float-slower pointer-events-none"></div>

            {/* Drifting Stars / Spark particles */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute rounded-full shadow-[0_0_8px_currentColor]"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.color,
                        color: star.color,
                        animation: `drift ${star.duration} linear infinite`,
                        animationDelay: star.delay,
                        opacity: 0.6
                    }}
                />
            ))}

            <style jsx>{`
                @keyframes drift {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-150px) translateX(30px) rotate(360deg);
                        opacity: 0;
                    }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(3%, 4%) scale(1.05); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0) scale(1.05); }
                    50% { transform: translate(-4%, -3%) scale(0.95); }
                }
                .animate-float-slow {
                    animation: float-slow 20s ease-in-out infinite;
                }
                .animate-float-slower {
                    animation: float-slower 25s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
