'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCart } from '../context/CartContext';
import MobileDrawerMenu from './MobileDrawerMenu';

export default function MobileStickyHeader() {
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/checkout')) return null;

    const { items, openCart, isOpen: isCartOpen, closeCart } = useCart();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && !isScrolled) setIsScrolled(true);
        if (latest <= 50 && isScrolled) setIsScrolled(false);
    });

    const handleOpenCart = () => {
        if (mobileMenuOpen) setMobileMenuOpen(false); // Mutual Exclusion
        openCart();
    };

    const handleToggleMenu = () => {
        if (!mobileMenuOpen && isCartOpen) closeCart(); // Mutual Exclusion
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <header className="fixed top-0 w-full z-[60] flex md:hidden flex-col pointer-events-none">
                <div 
                    className="pointer-events-auto bg-[#0a0e14]/95 backdrop-blur-md border-b border-slate-800 text-white relative transition-all duration-300 shadow-md"
                    style={{ padding: isScrolled ? '0.5rem 0' : '1rem 0' }}
                >
                    <div className="px-6 flex justify-between items-center relative">
                        {/* Hamburger */}
                        <div className="z-30">
                            <button
                                onClick={handleToggleMenu}
                                className="text-white hover:text-primary transition-colors py-2 pr-4 pl-0"
                            >
                                <span className="material-symbols-outlined text-3xl">
                                    {mobileMenuOpen ? 'close' : 'menu'}
                                </span>
                            </button>
                        </div>

                        {/* Center Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block relative transition-all duration-300 ${isScrolled ? 'h-10 w-24' : 'h-16 w-36'}`}>
                                <Image
                                    src="/assets/logo.svg"
                                    alt="AHAC Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Cart */}
                        <div className="z-30">
                            <button
                                onClick={handleOpenCart}
                                className="text-white hover:text-primary transition-colors py-2 pl-4 pr-0 relative"
                            >
                                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                                {items.length > 0 && (
                                    <span className="absolute top-1 right-0 w-4 h-4 bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm">
                                        {items.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <MobileDrawerMenu 
                isOpen={mobileMenuOpen} 
                setIsOpen={setMobileMenuOpen} 
            />
        </>
    );
}
