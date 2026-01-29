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
    const { content, isEditMode, setEditMode, saveChanges, discardChanges } = useContent();

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
                        <div className="flex justify-between items-center relative py-1">

                            {/* Hidden Mobile Hamburger (Absolute Left for V2 mobile) */}
                            <div className="md:hidden"></div>

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
                                <span className="text-red-600 font-header font-bold tracking-tight text-2xl relative group cursor-default">
                                    RHEEM
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <span className="text-sky-600 font-mono font-bold tracking-[0.2em] text-lg relative group cursor-default">
                                    BOSCH
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-sky-200 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </div>

                            {/* Center: Prominent Logo */}
                            <Link href="/" className="relative h-28 w-56 md:h-36 md:w-72 group shrink-0">
                                {/* Light Mode Logo - Standard */}
                                <Image
                                    src="/assets/ahac-logo-bus-500x500xv2.svg"
                                    alt="AHAC Logo"
                                    fill
                                    className="object-contain relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                            </Link>

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

                            {/* Mobile Hamburger (Absolute Right) */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-slate-900 hover:text-primary transition-colors p-2"
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        {mobileMenuOpen ? 'close' : 'menu'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Navigation (Dark Blue Background) */}
                <div className="bg-[#0F172A] text-white z-10 relative border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="hidden md:grid grid-cols-3 items-center py-3">

                            {/* Left Col: Spacer (to balance Cart) */}
                            <div className="hidden md:block"></div>

                            {/* Center Col: Navigation Links */}
                            <div className="flex justify-center items-center gap-8 md:gap-10">
                                {[...links, { href: '/contact', text: 'Contact Us' }].map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap relative group"
                                    >
                                        {link.contentKey ? <EditableText contentKey={link.contentKey} /> : link.text}
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                                    </Link>
                                ))}
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

                            {/* Edit Mode Toggle (Prototype Only) */}
                            <div className="flex justify-end items-center ml-4 pl-4 border-l border-slate-700">
                                <button
                                    onClick={() => isEditMode ? saveChanges() : setEditMode(true)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                                        isEditMode
                                            ? "bg-green-500 text-white hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                                            : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                                    )}
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {isEditMode ? 'save' : 'edit'}
                                    </span>
                                    <span>{isEditMode ? 'Save' : 'Edit'}</span>
                                </button>
                                {isEditMode && (
                                    <button
                                        onClick={() => {
                                            if (confirm('Discard unsaved changes?')) {
                                                discardChanges();
                                                setEditMode(false);
                                            }
                                        }}
                                        className="ml-2 p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                                        title="Discard Changes"
                                    >
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                )}
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
                                        <EditableText contentKey={`navigation.links.${i}.text`} />
                                    </Link>
                                </motion.div>
                            ))}

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
                                <button
                                    onClick={() => {
                                        if (isEditMode) saveChanges();
                                        else setEditMode(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={cn(
                                        "col-span-2 border p-4 rounded-xl flex flex-col items-center gap-2 group transition-all",
                                        isEditMode
                                            ? "bg-green-50 border-green-500/50"
                                            : "bg-slate-50 border-slate-200 hover:border-primary/50"
                                    )}
                                >
                                    <span className={cn("material-symbols-outlined transition-transform group-hover:scale-110", isEditMode ? "text-green-600" : "text-slate-500")}>
                                        {isEditMode ? 'save' : 'edit'}
                                    </span>
                                    <span className={cn("text-[10px] font-black uppercase tracking-widest", isEditMode ? "text-green-600" : "text-slate-500")}>
                                        {isEditMode ? 'Save Changes' : 'Enable Editing'}
                                    </span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
