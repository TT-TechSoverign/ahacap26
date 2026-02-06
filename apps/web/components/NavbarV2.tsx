'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '../context/CartContext';
import { useContent } from '../lib/context/ContentContext';
import { EditableText } from './EditableText';

export default function NavbarV2() {
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
            className="fixed top-0 w-full z-50 flex flex-col pointer-events-none"
        >
            {/* Split Header Container */}
            <div className="pointer-events-auto shadow-md relative flex flex-col">

                {/* Row 1: Logo & Brands (White Background) */}
                <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 text-slate-900 z-20 relative">
                    <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col gap-2">
                        <div className="flex justify-between items-center relative py-1 min-h-[100px] md:min-h-0">

                            {/* Mobile Hamburger (Absolute Left) */}
                            <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-30">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-slate-900 hover:text-primary transition-colors p-2"
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        {mobileMenuOpen ? 'close' : 'menu'}
                                    </span>
                                </button>
                            </div>

                            {/* Left Brands (Desktop Only: Window & Central Mix) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end pr-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-rose-500 font-sans font-black tracking-tighter text-2xl relative group cursor-default">
                                    LG
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-rose-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <span className="text-blue-600 font-serif font-bold tracking-wide text-lg relative group cursor-default">
                                    GE
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <span className="text-[#00B5E2] font-sans font-bold tracking-tight text-xl relative group cursor-default">
                                    Hawai'i Energy
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </div>

                            {/* Center: Prominent Logo */}
                            {/* Mobile: Absolute Center. Desktop: Relative Center */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex md:justify-center z-20">
                                <Link href="/" className="block relative h-24 w-48 md:h-44 md:w-80 group shrink-0">
                                    <Image
                                        src="/assets/ahac-logo-bus-500x500xv2.svg"
                                        alt="AHAC Logo"
                                        fill
                                        className="object-contain relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* Right Brands (Desktop Only: Mini Splits) */}
                            <div className="hidden lg:flex items-center gap-6 flex-1 justify-start pl-8 opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-red-600 font-header font-bold tracking-normal uppercase text-sm relative group cursor-default">
                                    MITSUBISHI ELECTRIC
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <span className="text-red-600 font-sans font-bold italic tracking-widest text-xl relative group cursor-default">
                                    FUJITSU
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <span className="text-[#00B5E2] font-header font-medium tracking-widest text-lg relative group cursor-default">
                                    DAIKIN
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <span className="text-blue-700 font-sans font-extrabold tracking-tighter text-xl relative group cursor-default">
                                    CARRIER
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </div>

                            {/* Mobile Cart (Absolute Right) */}
                            <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30">
                                <button
                                    onClick={openCart}
                                    className="text-slate-900 hover:text-primary transition-colors p-2 relative"
                                >
                                    <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                                    {items.length > 0 && (
                                        <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm">
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
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-3">

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
                                    className="relative group p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                                    aria-label="Open Cart"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-cyan-400 hidden lg:block">Cart</span>
                                    <div className="relative">
                                        <span className="material-symbols-outlined text-2xl text-white group-hover:text-cyan-400 transition-colors">shopping_cart</span>
                                        {items.length > 0 && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm">
                                                {items.length}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay (Light Mode) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 top-[100px] z-40 bg-white/95 pointer-events-auto md:hidden overflow-hidden flex flex-col"
                    >
                        <div className="flex-1 flex flex-col justify-center items-center gap-8 relative z-10 px-6">
                            {links.map((link: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-3xl font-header font-black uppercase tracking-widest text-slate-900 hover:text-primary transition-all flex items-center gap-4 group"
                                    >
                                        {link.text}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: links.length * 0.1 }}
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-header font-black uppercase tracking-widest text-slate-900 hover:text-primary transition-all flex items-center gap-4 group"
                                >
                                    Contact Us
                                </Link>
                            </motion.div>

                            <div className="w-full h-px bg-slate-200 my-4 max-w-[200px]"></div>

                            {/* Quick Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-4 w-full max-w-xs"
                            >
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="bg-slate-50 border border-slate-200 hover:border-primary/50 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary">Call Us</span>
                                </Link>
                                <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="bg-slate-50 border border-slate-200 hover:border-primary/50 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">storefront</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary">Shop</span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
