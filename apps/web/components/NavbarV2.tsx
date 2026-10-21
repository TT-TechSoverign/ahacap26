'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn, isCampaignActive } from '@/lib/utils';
import { useCart } from '../context/CartContext';
import { useLiveInventorySummary } from '@/lib/use-live-inventory';
import { 
    ShoppingCart, 
    Wind, 
    Sparkles, 
    Store, 
    Wrench, 
    ShieldCheck, 
    MapPin, 
    Compass, 
    Calendar
} from 'lucide-react';

const getNavIcon = (href: string, text: string) => {
    const h = (href || '').toLowerCase();
    const t = (text || '').toLowerCase();
    if (h.includes('cleaning') || t.includes('clean')) return Sparkles;
    if (h.includes('install') || t.includes('install')) return Wrench;
    if (h.includes('shop') || t.includes('shop') || t.includes('inventory')) return Store;
    if (h.includes('repair') || t.includes('repair')) return Wrench;
    if (h.includes('replace') || t.includes('window ac')) return ShieldCheck;
    if (h.includes('service-areas') || t.includes('service')) return MapPin;
    if (h.includes('sizing') || t.includes('btu')) return Compass;
    return Compass;
};

export default function NavbarV2() {
    const pathname = usePathname();
    const { items, openCart } = useCart();
    const { inStockAcCount, minPrice, maxPrice } = useLiveInventorySummary();

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

    const PRIMARY_NAV_LINKS = [
        { text: "Shop Window AC", href: "/shop" },
        { text: "Window AC Cleaning", href: "/ac-cleaning-oahu" },
        { text: "Window AC Install", href: "/window-ac-installation" },
        { text: "Clean vs Replace", href: "/clean-vs-replace-window-ac" },
        { text: "BTU Calculator", href: "/sizing" },
        { text: "Service Areas", href: "/service-areas" },
    ];
    const links = PRIMARY_NAV_LINKS;

    return (
        <header
            style={{
                transform: headerVisible ? 'translateY(0)' : 'translateY(-400px)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: headerVisible ? '0.1s' : '0s'
            }}
            className="fixed top-0 w-full z-[100] hidden md:flex flex-col pointer-events-none"
        >
            {/* Header Container */}
            <div className="pointer-events-auto shadow-md relative flex flex-col">

                {/* Row 0: Top Trust & Dispatch Utility Ribbon */}
                <div className="bg-[#05080e] border-b border-slate-800/80 text-[10.5px] font-mono tracking-tight text-slate-300 py-1.5 px-4 lg:px-6 z-30 relative">
                    <div className="max-w-7xl mx-auto flex justify-between items-center gap-3 whitespace-nowrap overflow-hidden">
                        <div className="flex items-center gap-2 text-slate-400 whitespace-nowrap">
                            <Link 
                                href="/reviews" 
                                prefetch={false}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors group cursor-pointer hover:underline decoration-amber-400/50 underline-offset-2 shrink-0"
                                title="Read 142+ Verified Customer Reviews"
                            >
                                ⭐ <span>4.9/5 (142+ Reviews)</span>
                            </Link>
                            <span className="text-slate-600">•</span>
                            <span className="hidden xl:inline shrink-0">Insured Oahu Cooling Specialists • Est. 2005</span>
                            <span className="xl:hidden shrink-0">Insured Oahu • Est. 2005</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-emerald-400 font-bold shrink-0">Free Estimates ($0)</span>
                            <span className="text-slate-600 hidden lg:inline">•</span>
                            <Link
                                href="/shop"
                                prefetch={false}
                                className="hidden lg:inline text-cyan-300 hover:text-white font-bold transition-colors hover:underline shrink-0"
                            >
                                {inStockAcCount} Models In-Stock (${minPrice}–${maxPrice.toLocaleString()})
                            </Link>
                        </div>
                        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
                            <a 
                                href="tel:808-488-1111" 
                                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold tracking-wide transition-colors shrink-0"
                                title="Direct Dispatch (808) 488-1111"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                                <span>Office: (808) 488-1111</span>
                            </a>
                            <span className="text-slate-700 hidden xl:inline">|</span>
                            <a 
                                href="mailto:office@affordablehome-ac.com" 
                                className="text-slate-400 hover:text-cyan-300 transition-colors hidden xl:inline shrink-0"
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

                            {/* Left Brands (Desktop Only: Window & Built-In Mix) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end pr-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <Link prefetch={false} href="/shop" className="text-rose-400 font-sans font-black tracking-tighter text-lg relative group cursor-pointer block">
                                    LG
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/shop?category=ge" className="text-blue-400 font-serif font-bold tracking-wide text-xs relative group cursor-pointer block">
                                    GE
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/hawaii-energy-rebate" className="text-[#00B5E2] font-sans font-bold tracking-tight text-sm relative group cursor-pointer block pb-1">
                                    Hawai&apos;i Energy
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00B5E2] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>

                            {/* Center: Prominent Logo */}
                            <div className="flex justify-center z-20">
                                <Link prefetch={false} href="/" className="block relative h-16 w-36 md:h-20 md:w-48 group shrink-0">
                                    <Image
                                        src="/assets/logo.svg"
                                        alt="AHAC Logo"
                                        fill
                                        className="object-contain relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                </Link>
                            </div>

                            {/* Right Pillars (Desktop Only: Window AC & Cleaning Highlights) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-start pl-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <Link prefetch={false} href="/shop?capacity=MASTER" className="text-rose-400 font-header font-bold tracking-normal uppercase text-[10px] relative group cursor-pointer block">
                                    DUAL INVERTER
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/shop/ge-built-in-wall-ac-oahu" className="text-blue-400 font-sans font-bold italic tracking-widest text-xs relative group cursor-pointer block">
                                    26&quot; THRU-THE-WALL
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/ac-cleaning-oahu" className="text-[#00B5E2] font-header font-medium tracking-widest text-xs relative group cursor-pointer block pb-1">
                                    WINDOW AC CLEANING
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00B5E2] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link prefetch={false} href="/window-ac-warehouse-pickup-waipahu" className="text-emerald-400 font-sans font-extrabold tracking-tighter text-xs relative group cursor-pointer block">
                                    WAIPAHU PICKUP
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Navigation Menu Bar - Symmetrically Centered & Evenly Spaced */}
                <div className="bg-[#0B1120] text-white z-30 relative border-t border-slate-800/80 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full flex items-center justify-between py-1.5">

                        {/* Left Balance Spacer (Matches right cart w-10 for exact mathematical centering) */}
                        <div className="w-10 hidden md:block shrink-0" aria-hidden="true" />

                        {/* Centered Navigation Flow (Evenly Distributed Nav Pills + Integrated CTA) */}
                        <nav className="flex-1 flex items-center justify-center gap-1 lg:gap-1.5 xl:gap-2.5 overflow-visible">
                            {links.map((link: any, i: number) => {
                                const Icon = getNavIcon(link.href, link.text);
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                const isShopLink = link.href === '/shop';
                                return (
                                    <div key={i} className="relative group/navitem shrink-0">
                                        <Link
                                            prefetch={false}
                                            href={link.href}
                                            className={cn(
                                                "inline-flex items-center gap-1.5 px-2 lg:px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap relative group shrink-0",
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
                                            {isShopLink && (
                                                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] font-black tracking-normal">
                                                    In-Stock
                                                </span>
                                            )}
                                            {isActive && (
                                                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                            )}
                                        </Link>

                                        {isShopLink && (
                                            <div className="invisible opacity-0 group-hover/navitem:visible group-hover/navitem:opacity-100 transition-all duration-150 absolute left-0 top-full pt-2.5 w-80 z-[120]">
                                                <div
                                                    style={{ backgroundColor: '#060a12' }}
                                                    className="bg-[#060a12] border border-cyan-500/40 border-t-2 border-t-cyan-400 rounded-2xl p-3.5 shadow-[0_28px_70px_rgba(0,0,0,0.96),0_0_30px_rgba(0,174,239,0.22)] ring-1 ring-white/10 space-y-1.5 text-left"
                                                >
                                                    <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-slate-800 flex items-center justify-between">
                                                        <span>Waipahu Warehouse</span>
                                                        <span className="text-cyan-300">${minPrice}–${maxPrice.toLocaleString()}</span>
                                                    </div>
                                                    {[
                                                        { label: `All ${inStockAcCount} In-Stock Window ACs`, sub: 'Free Pickup or $50 Oahu Delivery', href: '/shop' },
                                                        { label: 'Bedroom 115V (6k–8k BTU)', sub: 'From $395 • Standard 3-Prong Plug', href: '/shop?capacity=BEDROOM' },
                                                        { label: 'Living Room (10k–14k BTU)', sub: '$625–$785 • 115V Dual Inverters', href: '/shop?capacity=MASTER' },
                                                        { label: 'Large Room 230V (18k–23.5k)', sub: '$925–$1,025 • High-Velocity Cooling', href: '/shop?capacity=LIVING' },
                                                        { label: '26" Thru-the-Wall (GE)', sub: '$1,000–$1,200 • Fits RAB26A Sleeves', href: '/shop?category=ge' },
                                                        { label: '$45 Hawaii Energy Rebates', sub: 'Official Rebate Form & Qualifying Units', href: '/shop#rebate' },
                                                    ].map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            prefetch={false}
                                                            className="block px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/40 transition-all group/dropitem"
                                                        >
                                                            <div className="text-xs font-header font-bold uppercase text-white group-hover/dropitem:text-cyan-300 transition-colors">
                                                                {item.label}
                                                            </div>
                                                            <div className="text-[10px] font-mono text-slate-400 group-hover/dropitem:text-slate-300">
                                                                {item.sub}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Contact / Free Estimate CTA Nav Pill (Evenly Spaced) */}
                            <Link
                                prefetch={false}
                                href="/contact"
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm active:scale-95 ml-0.5 shrink-0",
                                    pathname === '/contact'
                                        ? "bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(0,174,239,0.6)]"
                                        : "bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/35 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,174,239,0.15)]"
                                )}
                            >
                                <Calendar className="size-3.5 shrink-0" />
                                <span>Free Estimate ($0)</span>
                            </Link>
                        </nav>

                        {/* Right: Cart Button (Subtle, balanced, matching the left spacer) */}
                        <div className="w-10 flex items-center justify-end shrink-0">
                            <button
                                onClick={openCart}
                                className="relative group p-1.5 hover:bg-white/5 rounded-lg transition-colors flex items-center text-slate-300 hover:text-cyan-400"
                                aria-label="Open Cart"
                            >
                                <ShoppingCart className="size-5 text-white group-hover:text-cyan-400 transition-colors" />
                                {items.length > 0 && (
                                    <span className={cn(
                                        "absolute -top-1 -right-1 w-4 h-4 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm",
                                        (isCampaignActive() && items.some(item => item.promo_price && item.promo_price > 0))
                                            ? "cart-promo-badge-pulse text-white"
                                            : "bg-cyan-400 text-black"
                                    )}>
                                        {items.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}
