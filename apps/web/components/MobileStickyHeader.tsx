'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import MobileDrawerMenu from './MobileDrawerMenu';
import { cn, isCampaignActive } from '@/lib/utils';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function MobileStickyHeader() {
    const pathname = usePathname();
    const { items, openCart, isOpen: isCartOpen, closeCart } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const latest = window.scrollY;
            if (latest > 50 && !isScrolled) setIsScrolled(true);
            if (latest <= 50 && isScrolled) setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    if (pathname && pathname.startsWith('/checkout')) return null;

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
                    style={{ padding: isScrolled ? '0.3rem 0' : '0.5rem 0' }}
                >
                    <div className="px-6 flex justify-between items-center relative">
                        {/* Hamburger */}
                        <div className="z-30">
                            <button
                                onClick={handleToggleMenu}
                                className="text-white hover:text-primary transition-colors py-2 pr-4 pl-0"
                                aria-label="Toggle Menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="size-8" />
                                ) : (
                                    <Menu className="size-8" />
                                )}
                            </button>
                        </div>

                        {/* Center Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block relative transition-all duration-300 logo-promo-glow ${isScrolled ? 'h-10 w-24' : 'h-14 w-32'}`}>
                                <Image
                                    src="/assets/logo.svg"
                                    alt="AHAC Logo"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </Link>
                        </div>

                        {/* Cart */}
                        <div className="z-30">
                            <button
                                onClick={handleOpenCart}
                                className="text-white hover:text-primary transition-colors py-2 pl-4 pr-0 relative"
                                aria-label="Open Cart"
                            >
                                <ShoppingCart className="size-8" />
                                {items.length > 0 && (
                                    <span className={cn(
                                        "absolute top-1 right-0 w-4 h-4 text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-sm",
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
                <div className="pointer-events-auto">

                </div>
            </header>

            <MobileDrawerMenu 
                isOpen={mobileMenuOpen} 
                setIsOpen={setMobileMenuOpen} 
            />
        </>
    );
}
