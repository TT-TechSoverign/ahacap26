'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '../context/CartContext';
import { useContent } from '../lib/context/ContentContext';
import { EditableText } from './EditableText';

export default function Navbar() {
    const { items, openCart } = useCart();
    const { content, isEditMode } = useContent();

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
            className="fixed top-0 md:top-9 w-full z-50 flex flex-col pointer-events-none"
        >
            {/* Top Bar: Gradient Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-background-dark via-primary to-background-dark pointer-events-auto"></div>

            {/* Main Header Container */}
            <div className="pointer-events-auto bg-background-dark/80 backdrop-blur-md border-b border-white/5 relative">
                {/* Desktop: 3-Column Layout */}
                <div className="max-w-7xl mx-auto px-6 h-20 md:h-32 grid grid-cols-2 md:grid-cols-3 items-center">

                    {/* Left: Navigation (Desktop) / Spacer (Mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.slice(0, 2).map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors"
                            >
                                <EditableText contentKey={`navigation.links.${i}.text`} />
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo (Absolute Center) */}
                    <div className="flex justify-start md:justify-center relative">
                        <Link href="/" className="relative h-12 w-12 md:h-32 md:w-32 group">
                            <div className="absolute inset-0 bg-primary/40 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Image
                                src="/assets/ahac-logo-bus-500x500xv2.svg"
                                alt="AHAC Logo"
                                fill
                                className="object-contain relative z-10"
                            />
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex justify-end items-center gap-4 md:gap-6">
                        {/* Desktop: Remaining Links */}
                        <div className="hidden md:flex items-center gap-8 mr-4">
                            {links.slice(2).map((link: any, i: number) => (
                                <Link
                                    key={i + 2}
                                    href={link.href}
                                    className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors"
                                >
                                    <EditableText contentKey={`navigation.links.${i + 2}.text`} />
                                </Link>
                            ))}
                        </div>

                        {/* Cart Toggle */}
                        <button
                            onClick={openCart}
                            className="relative group p-2 hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Open Cart"
                        >
                            <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">shopping_cart</span>
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,174,239,0.5)]">
                                    {items.length}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white hover:text-primary transition-colors p-2"
                        >
                            <span className="material-symbols-outlined text-3xl">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 top-[84px] z-40 bg-background-dark/95 pointer-events-auto md:hidden overflow-hidden flex flex-col"
                    >
                        {/* Cyberpunk Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

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
                                        className="text-3xl font-header font-black uppercase tracking-widest text-white hover:text-primary transition-all flex items-center gap-4 group"
                                    >
                                        <span className="w-0 group-hover:w-8 h-1 bg-primary transition-all duration-300"></span>
                                        <span className="group-hover:neon-glow transition-all text-center">
                                            <EditableText contentKey={`navigation.links.${i}.text`} />
                                        </span>
                                        <span className="w-0 group-hover:w-8 h-1 bg-primary transition-all duration-300"></span>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"
                            ></motion.div>

                            {/* Quick Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-4 w-full max-w-xs"
                            >
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="bg-white/5 border border-white/10 hover:border-primary/50 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Call Us</span>
                                </Link>
                                <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="bg-white/5 border border-white/10 hover:border-accent/50 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                    <span className="material-symbols-outlined text-accent group-hover:scale-110 transition-transform">storefront</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Shop</span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
