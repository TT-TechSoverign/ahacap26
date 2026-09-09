'use client';

import Link from 'next/link';
import { ShieldCheck, ShoppingBag, Calculator, ClipboardList } from 'lucide-react';

export function QuickJumpBanner() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative z-25 w-full bg-slate-900/95 backdrop-blur-md border-y border-cyan-500/30 py-3 shadow-[0_10px_30px_rgba(0,174,239,0.15)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-2">
                <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Free Estimates ($0 to Book) • Transparent Flat-Rate Servicing
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">
                        Call Office: <a href="tel:808-488-1111" className="text-cyan-400 font-bold hover:underline">(808) 488-1111</a> or <Link href="/contact" className="text-primary hover:underline font-bold">Book Form</Link>
                    </span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-8 lg:gap-12 pt-1 border-t border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                        Quick Pathways:
                    </span>
                    
                    <a 
                        href="#services" 
                        onClick={(e) => handleScroll(e, 'services')}
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[44px] px-3 py-1.5 rounded cursor-pointer"
                    >
                        <ShieldCheck className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Our Services</span>
                    </a>

                    <Link 
                        href="/shop" 
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[48px] px-4 py-2 rounded"
                    >
                        <ShoppingBag className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Shop Window AC</span>
                    </Link>

                    <Link 
                        href="/sizing" 
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[48px] px-4 py-2 rounded"
                    >
                        <Calculator className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>BTU Calculator</span>
                    </Link>

                    <Link 
                        href="/contact" 
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[44px] px-3 py-1.5 rounded"
                    >
                        <ClipboardList className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Book Appt (Zero $)</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
