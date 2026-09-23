'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Phone, Home, Snowflake } from 'lucide-react';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error for diagnostic tracking
        console.error('Next.js Client Boundary Captured Exception:', error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#070b12] text-white">
            <div className="max-w-md w-full bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center space-y-6">
                <div className="size-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_25px_rgba(0,174,239,0.3)]">
                    <Snowflake className="size-8 animate-pulse text-cyan-400" />
                </div>

                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                        <span>Affordable Home A/C Oahu</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-header font-black uppercase tracking-tight text-white">
                        Connection Refresh Needed
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        Your mobile browser session encountered a temporary display issue. Tap below to reload the fresh Oahu cooling portal.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.location.reload();
                            } else {
                                reset();
                            }
                        }}
                        className="flex-1 py-3 px-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="size-4" />
                        <span>Reload Portal</span>
                    </button>

                    <a
                        href="tel:808-488-1111"
                        className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <Phone className="size-4 text-cyan-400" />
                        <span>(808) 488-1111</span>
                    </a>
                </div>

                <div className="pt-2 border-t border-white/5">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors"
                    >
                        <Home className="size-3.5" />
                        <span>Return to Storefront</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
