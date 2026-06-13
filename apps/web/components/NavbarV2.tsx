'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn, isCampaignActive } from '@/lib/utils';
import { useCart } from '../context/CartContext';
import { useContent } from '../lib/context/ContentContext';
import { EditableText } from './EditableText';
import PromoStickyBar from './PromoStickyBar';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function NavbarV2() {
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/checkout')) return null;

    const { items, openCart } = useCart();
    const { content } = useContent();

    // --- Sticky-Free Navigation Logic ---
    const { scrollY } = useScroll();
    const [headerVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";
        if (latest > 50 && direction === "down" && headerVisible && !mobileMenuOpen) {
            setHeaderVisible(false);
        } else if (direction === "up" && !headerVisible) {
            setHeaderVisible(true);
        }
        setLastScrollY(latest);
    });

    const links = content?.navigation?.links || [];

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: (headerVisible || mobileMenuOpen) ? 0 : -400 }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 25,
                delay: (headerVisible || mobileMenuOpen) ? 0.1 : 0
            }}
            className="fixed top-0 w-full z-50 hidden md:flex flex-col pointer-events-none"
        >
            {/* Split Header Container */}
            <div className="pointer-events-auto shadow-md relative flex flex-col">

                {/* Row 1: Logo & Brands (White Background) */}
                <div className="bg-[#0a0e14]/95 backdrop-blur-md border-b border-slate-800/80 text-white z-20 relative">
                    <div className="max-w-7xl mx-auto px-6 py-1 flex flex-col gap-1">
                        <div className="flex justify-between items-center relative py-1 min-h-[100px] md:min-h-0">

                            {/* Mobile Hamburger (Absolute Left) */}
                            <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-30">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-white hover:text-cyan-400 transition-colors p-2"
                                    aria-label="Toggle Menu"
                                >
                                    {mobileMenuOpen ? (
                                        <X className="size-8" />
                                    ) : (
                                        <Menu className="size-8" />
                                    )}
                                </button>
                            </div>

                            {/* Left Brands (Desktop Only: Window & Central Mix) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end pr-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <Link href="/shop" className="text-rose-400 font-sans font-black tracking-tighter text-lg relative group cursor-pointer block">
                                    LG
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link href="/shop" className="text-blue-400 font-serif font-bold tracking-wide text-xs relative group cursor-pointer block">
                                    GE
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link href="/shop#rebate" className="text-[#00B5E2] font-sans font-bold tracking-tight text-sm relative group cursor-pointer block pb-1">
                                    Hawai&apos;i Energy
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00B5E2] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>

                            {/* Center: Prominent Logo */}
                            {/* Mobile: Absolute Center. Desktop: Relative Center */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex md:justify-center z-20">
                                <Link href="/" className="block relative h-16 w-36 md:h-20 md:w-48 group shrink-0 logo-promo-glow">
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
                                <Link href="/mini_split_ac#mitsubishi-electric" className="text-red-500 font-header font-bold tracking-normal uppercase text-[10px] relative group cursor-pointer block">
                                    MITSUBISHI ELECTRIC
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link href="/mini_split_ac#fujitsu" className="text-red-500 font-sans font-bold italic tracking-widest text-xs relative group cursor-pointer block">
                                    FUJITSU
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link href="/mini_split_ac#daikin" className="text-[#00B5E2] font-header font-medium tracking-widest text-xs relative group cursor-pointer block pb-1">
                                    DAIKIN
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00B5E2] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link href="/mini_split_ac#carrier" className="text-blue-400 font-sans font-extrabold tracking-tighter text-xs relative group cursor-pointer block">
                                    CARRIER
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>

                            {/* Mobile Cart (Absolute Right) */}
                            <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30">
                                <button
                                    onClick={openCart}
                                    className="text-white hover:text-cyan-400 transition-colors p-2 relative"
                                    aria-label="Open Cart"
                                >
                                    <ShoppingCart className="size-8" />
                                    {items.length > 0 && (
                                        <span className={cn(
                                            "absolute top-0 right-0 w-4 h-4 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm",
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

                {/* Row 2: Navigation (Dark Blue Background) */}
                <div className="bg-[#0F172A] text-white z-10 relative border-t border-slate-800 hidden md:block">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-1.5">

                            {/* Left Col: Spacer */}
                            <div></div>

                            {/* Center Col: Navigation Links + Contact Us */}
                            <div className="flex justify-center items-center gap-8 md:gap-10">
                                {links.map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap relative group"
                                    >
                                        {/* @ts-ignore */}
                                        {link.text}
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                                    </Link>
                                ))}

                                {/* Vertical Separator */}
                                <div className="h-4 w-px bg-slate-700 mx-2"></div>

                                {/* Contact Us Link */}
                                <Link
                                    href="/contact"
                                    className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap relative group"
                                >
                                    Contact Us
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                                </Link>
                            </div>

                            {/* Right Col: Cart */}
                            <div className="flex justify-end items-center">
                                <button
                                    onClick={openCart}
                                    className="relative group p-1 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                                    aria-label="Open Cart"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-cyan-400 hidden lg:block">Cart</span>
                                    <div className="relative flex items-center">
                                        <ShoppingCart className="size-6 text-white group-hover:text-cyan-400 transition-colors" />
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
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Row 3: Promo Sticky Bar */}
                <PromoStickyBar />
                <div className="navbar-promo-accent w-full" />
            </div>

        </motion.header>
    );
}
