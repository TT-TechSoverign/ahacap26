'use client';

import { useEffect, useState, useRef } from 'react';
import { isCampaignActive } from '../lib/utils';

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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setMounted(true);
        
        const isActive = isCampaignActive();
        if (isActive) {
            document.body.classList.add('promo-active');
        } else {
            return;
        }
        
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

        // --- Canvas Click Firework Sparks Logic ---
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        interface Spark {
            x: number;
            y: number;
            vx: number;
            vy: number;
            color: string;
            size: number;
            alpha: number;
            decay: number;
            gravity: number;
            drag: number;
        }

        let activeSparks: Spark[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const sparkColors = [
            'rgba(239, 68, 68, ',   // Red
            'rgba(255, 255, 255, ', // White
            'rgba(59, 130, 246, ',  // Blue
            'rgba(245, 158, 11, '   // Gold
        ];

        const tick = () => {
            if (activeSparks.length === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            activeSparks = activeSparks.filter(s => {
                s.vx *= s.drag;
                s.vy += s.gravity;
                s.vy *= s.drag;
                s.x += s.vx;
                s.y += s.vy;
                s.alpha -= s.decay;

                if (s.alpha <= 0) return false;

                ctx.save();
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.color + s.alpha + ')';
                
                ctx.shadowBlur = 8;
                ctx.shadowColor = s.color + s.alpha + ')';
                
                ctx.fill();
                ctx.restore();

                return true;
            });

            animationFrameId = requestAnimationFrame(tick);
        };

        const handleGlobalClick = (e: MouseEvent) => {
            const numSparks = 14 + Math.floor(Math.random() * 6);
            const newSparks: Spark[] = Array.from({ length: numSparks }).map(() => {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 4.5;
                const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                return {
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1,
                    color,
                    size: 1.5 + Math.random() * 2,
                    alpha: 1,
                    decay: 0.015 + Math.random() * 0.02,
                    gravity: 0.08,
                    drag: 0.98
                };
            });

            const wasEmpty = activeSparks.length === 0;
            activeSparks.push(...newSparks);
            
            if (activeSparks.length > 120) {
                activeSparks = activeSparks.slice(-120);
            }

            if (wasEmpty) {
                tick();
            }
        };

        window.addEventListener('click', handleGlobalClick);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('click', handleGlobalClick);
            cancelAnimationFrame(animationFrameId);
            document.body.classList.remove('promo-active');
        };
    }, []);

    if (!mounted) return null;

    if (!isCampaignActive()) return null;

    return (
        <>
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
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
            />
        </>
    );
}

