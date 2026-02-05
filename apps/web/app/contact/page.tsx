'use client';

import { DispatchWizard } from '@/components/DispatchWizard';

import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import contentData from '@/lib/content/content.json';

export default function ContactPage() {
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

    return (
        <div className="bg-background-dark min-h-screen text-white selection:bg-primary selection:text-white pb-12 lg:pb-32">
            {/* Standard Premium Header (Matches Landing Page) */}
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: (headerVisible || mobileMenuOpen) ? 0 : -400 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    delay: (headerVisible || mobileMenuOpen) ? 0.1 : 0
                }}
                className="fixed top-9 w-full z-50 glass-header flex flex-col"
            >
                {/* Top Section: Logo (Centered) */}
                <div className="w-full border-b border-white/5 flex justify-between md:justify-center items-center py-2 md:py-6 px-6 bg-background-dark/30 backdrop-blur-md">
                    <div className="w-10 md:hidden"></div> {/* Spacer for symmetry */}
                    <Link href="/" className="relative h-40 w-40 md:h-48 md:w-48 transition-transform hover:scale-105 active:scale-95 group">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] md:blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <Image
                            src="/assets/ahac-logo-bus-500x500xv2.svg"
                            alt="Affordable Home A/C"
                            fill
                            className="object-contain relative z-10"
                            priority
                        />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-primary p-2 hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Bottom Section: Navigation (Centered) */}
                <div className={cn(
                    "w-full bg-background-dark/60 md:bg-background-dark/20 backdrop-blur-xl md:backdrop-blur-sm transition-all duration-300 overflow-hidden",
                    mobileMenuOpen ? "h-[calc(100vh-100px)] opacity-100" : "h-0 md:h-16 opacity-0 md:opacity-100"
                )}>
                    <div className="relative flex flex-col md:flex-row items-center justify-center max-w-7xl h-full mx-auto px-6 py-12 md:py-0">
                        <div className="md:absolute left-6 mb-8 md:mb-0">
                            <Link
                                href="/"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                }}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-primary transition-all flex items-center gap-2 group/back"
                            >
                                <span className="material-symbols-outlined text-sm transition-transform group-hover/back:-translate-x-1">arrow_back</span>
                                <EditableText contentKey="navigation.back_to_home" />
                            </Link>
                        </div>

                        <nav className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 w-full md:w-auto">
                            {(content?.navigation?.links || []).map((link: { text: string; href: string }, i: number) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                    className="nav-link text-base md:text-[10px] lg:text-[11px] font-black tracking-[0.3em] text-slate-400 hover:text-primary transition-all uppercase whitespace-nowrap text-center p-4 md:p-0"
                                >
                                    <EditableText contentKey={`navigation.links.${i}.text`} />
                                </Link>
                            ))}
                        </nav>

                        <div className="md:absolute right-6 mt-12 md:mt-0 flex items-center h-full">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 cursor-default font-mono hidden md:inline">
                                <EditableText contentKey="navigation.service_center" />
                            </span>
                        </div>
                    </div>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-6 pt-[212px] md:pt-[340px]">
                <div className="text-center mb-12 lg:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/20 rounded-md text-primary font-mono text-[10px] lg:text-[11px] font-black tracking-[0.4em] uppercase mb-10 shadow-[0_0_20px_rgba(0,174,239,0.1)] backdrop-blur-sm relative overflow-hidden group/badge">
                        <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000"></div>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,174,239,0.5)]"></span>
                        <EditableText contentKey="contact.badge" />
                    </div>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-header font-bold uppercase tracking-tight mb-8">
                        <EditableText contentKey="contact.title" /> <span className="text-primary italic font-black shadow-primary/20 drop-shadow-2xl">
                            <EditableText contentKey="contact.title_highlight" />
                        </span>
                    </h1>
                    <p className="font-mono text-[11px] md:text-[12px] lg:text-[13px] font-black tracking-[0.3em] uppercase text-slate-500 max-w-3xl mx-auto leading-relaxed opacity-80">
                        <EditableText contentKey="contact.description" />
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:gap-12">
                    {/* section 2: Dispatch Wizard - Main Section */}
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-background-dark/50 border border-white/10 p-6 lg:p-8 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-md group max-w-5xl mx-auto">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_30px_rgba(0,174,239,0.3)]"></div>

                            <div className="flex flex-col items-center text-center mb-6 border-b border-white/5 pb-6 relative z-10">
                                <span className="font-mono text-[9px] font-black tracking-[0.5em] uppercase mb-4 text-primary opacity-60">
                                    {contentData.contact.wizard_interface}
                                </span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-header font-bold text-white uppercase tracking-tight mb-4">
                                    <EditableText contentKey="contact.wizard_title" />
                                </h2>
                                <p className="font-mono text-[10px] font-black tracking-[0.4em] uppercase italic opacity-50 text-slate-500">
                                    <EditableText contentKey="contact.wizard_subtitle" />
                                </p>
                            </div>

                            <div className="relative z-10 px-0 md:px-4">
                                <DispatchWizard />
                            </div>
                        </div>
                    </div>


                </div>


            </main>


        </div>
    );
}
