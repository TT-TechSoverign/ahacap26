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
        <div className="relative z-25 w-full bg-slate-900/90 backdrop-blur-md border-y border-cyan-500/30 py-4 shadow-[0_10px_30px_rgba(0,174,239,0.15)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                        Quick Pathways:
                    </span>
                    
                    <a 
                        href="#services" 
                        onClick={(e) => handleScroll(e, 'services')}
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[40px] px-3 py-1 rounded cursor-pointer"
                    >
                        <ShieldCheck className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Our Services</span>
                    </a>

                    <Link 
                        href="/shop" 
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[40px] px-3 py-1 rounded"
                    >
                        <ShoppingBag className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Shop Window AC</span>
                    </Link>

                    <Link 
                        href="/sizing" 
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[40px] px-3 py-1 rounded"
                    >
                        <Calculator className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>BTU Calculator</span>
                    </Link>

                    <Link 
                        href="/contact" 
                        className="group flex items-center gap-2 text-white hover:text-cyan-400 font-header font-bold text-sm md:text-base uppercase tracking-wider transition-colors min-h-[40px] px-3 py-1 rounded"
                    >
                        <ClipboardList className="size-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Request A Quote</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
