'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn, isCampaignActive } from '@/lib/utils';
import { useCart } from '../context/CartContext';
import { useContent } from '../lib/context/ContentContext';
import { EditableText } from './EditableText';
import { 
    ShoppingCart, 
    Wind, 
    Sparkles, 
    Store, 
    Wrench, 
    ShieldCheck, 
    MapPin, 
    Compass, 
    Calendar,
    Phone
} from 'lucide-react';

const getNavIcon = (href: string, text: string) => {
    const h = (href || '').toLowerCase();
    const t = (text || '').toLowerCase();
    if (h.includes('mini_split_ac_maintenance') || t.includes('split ac clean')) return Sparkles;
    if (h.includes('mini_split') || t.includes('mini split')) return Wind;
    if (h.includes('shop') || t.includes('shop') || t.includes('inventory')) return Store;
    if (h.includes('repair') || t.includes('repair')) return Wrench;
    if (h.includes('window_ac') || t.includes('window ac clean')) return ShieldCheck;
    if (h.includes('service-areas') || t.includes('service')) return MapPin;
    if (h.includes('sizing') || t.includes('sizing')) return Compass;
    return Compass;
};

export default function NavbarV2() {
    const pathname = usePathname();
    const { items, openCart } = useCart();
    const { content } = useContent();

    // --- Sticky-Free Navigation Logic ---
    const [headerVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const latest = window.scrollY;
            const direction = latest > lastScrollY ? "down" : "up";
            if (latest > 50 && direction === "down" && headerVisible) {
                setHeaderVisible(false);
            } else if (direction === "up" && !headerVisible) {
                setHeaderVisible(true);
            }
            setLastScrollY(latest);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, headerVisible]);

    if (pathname && pathname.startsWith('/checkout')) return null;

    const links = content?.navigation?.links || [];

    return (
        <header
            style={{
                transform: headerVisible ? 'translateY(0)' : 'translateY(-400px)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: headerVisible ? '0.1s' : '0s'
            }}
            className="fixed top-0 w-full z-50 hidden md:flex flex-col pointer-events-none"
        >
            {/* Split Header Container */}
            <div className="pointer-events-auto shadow-md relative flex flex-col">

                {/* Row 0: Top Trust & Dispatch Utility Ribbon */}
                <div className="bg-[#05080e] border-b border-slate-800/80 text-[11px] font-mono text-slate-300 py-1.5 px-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-2.5 text-slate-400">
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                                ⭐ <span>4.9/5 Rating (142+ Reviews)</span>
                            </span>
                            <span className="text-slate-600">•</span>
                            <span>Licensed Oahu Contractor CT-36775</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-emerald-400 font-bold">Free Estimates ($0 to Book)</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400">Waipahu Warehouse Preorders</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a 
                                href="tel:808-488-1111" 
                                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold tracking-wide transition-colors"
                                title="Direct Dispatch (808) 488-1111"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Office: (808) 488-1111</span>
                            </a>
                            <span className="text-slate-700">|</span>
                            <a 
                                href="mailto:office@affordablehome-ac.com" 
                                className="text-slate-400 hover:text-cyan-300 transition-colors"
                            >
                                office@affordablehome-ac.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Row 1: Logo & Partner Brands */}
                <div className="bg-[#0a0e14]/95 backdrop-blur-md border-b border-slate-800/80 text-white z-20 relative">
                    <div className="max-w-7xl mx-auto px-6 py-1">
                        <div className="flex justify-between items-center relative py-1">

                            {/* Left Brands (Desktop Only: Window & Central Mix) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end pr-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <Link prefetch={false} href="/shop" className="text-rose-400 font-sans font-black tracking-tighter text-lg relative group cursor-pointer block">
                                    LG
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/shop" className="text-blue-400 font-serif font-bold tracking-wide text-xs relative group cursor-pointer block">
                                    GE
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/shop#rebate" className="text-[#00B5E2] font-sans font-bold tracking-tight text-sm relative group cursor-pointer block pb-1">
                                    Hawai&apos;i Energy
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00B5E2] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>

                            {/* Center: Prominent Logo */}
                            <div className="flex justify-center z-20">
                                <Link prefetch={false} href="/" className="block relative h-16 w-36 md:h-20 md:w-48 group shrink-0 logo-promo-glow">
                                    <Image
                                        src="/assets/logo.svg"
                                        alt="AHAC Logo"
                                        fill
                                        className="object-contain relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                </Link>
                            </div>

                            {/* Right Brands (Desktop Only: Mini Splits) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-start pl-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <Link prefetch={false} href="/mini_split_ac#mitsubishi-electric" className="text-red-500 font-header font-bold tracking-normal uppercase text-[10px] relative group cursor-pointer block">
                                    MITSUBISHI ELECTRIC
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/mini_split_ac#fujitsu" className="text-red-500 font-sans font-bold italic tracking-widest text-xs relative group cursor-pointer block">
                                    FUJITSU
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/mini_split_ac#daikin" className="text-[#00B5E2] font-header font-medium tracking-widest text-xs relative group cursor-pointer block pb-1">
                                    DAIKIN
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00B5E2] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/mini_split_ac#carrier" className="text-blue-400 font-sans font-extrabold tracking-tighter text-xs relative group cursor-pointer block">
                                    CARRIER
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Navigation Menu Bar */}
                <div className="bg-[#0B1120]/95 backdrop-blur-md text-white z-10 relative border-t border-slate-800/80 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full flex items-center justify-between py-1.5">

                        {/* Navigation Items (Interactive Nav Pills with Icons & Active Highlights) */}
                        <nav className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
                            {links.map((link: any, i: number) => {
                                const Icon = getNavIcon(link.href, link.text);
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={i}
                                        prefetch={false}
                                        href={link.href}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap relative group",
                                            isActive 
                                                ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 shadow-[0_0_10px_rgba(0,174,239,0.15)]" 
                                                : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                                        )}
                                    >
                                        <Icon className={cn(
                                            "size-3.5 shrink-0 transition-transform group-hover:scale-110",
                                            isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-300"
                                        )} />
                                        <span>{link.text}</span>
                                        {isActive && (
                                            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Actions: High-Converting CTA Button & Cart */}
                        <div className="flex items-center gap-3 shrink-0">
                            {/* Contact / Free Estimate CTA Button */}
                            <Link
                                prefetch={false}
                                href="/contact"
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm active:scale-95",
                                    pathname === '/contact'
                                        ? "bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(0,174,239,0.6)]"
                                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_12px_rgba(0,174,239,0.3)] hover:shadow-[0_0_18px_rgba(0,174,239,0.5)]"
                                )}
                            >
                                <Calendar className="size-3.5 shrink-0" />
                                <span>Free Estimate ($0)</span>
                            </Link>

                            {/* Cart Button */}
                            <button
                                onClick={openCart}
                                className="relative group p-1.5 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5 text-slate-300 hover:text-cyan-400"
                                aria-label="Open Cart"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-cyan-400 hidden xl:block">Cart</span>
                                <div className="relative flex items-center">
                                    <ShoppingCart className="size-5 text-white group-hover:text-cyan-400 transition-colors" />
                                    {items.length > 0 && (
                                        <span className={cn(
                                            "absolute -top-1.5 -right-2 w-4 h-4 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm",
                                            (isCampaignActive() && items.some(item => item.promo_price && item.promo_price > 0))
                                                ? "cart-promo-badge-pulse text-white"
                                                : "bg-cyan-400 text-black"
                                        )}>
                                            {items.length}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}
