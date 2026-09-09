'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import MobileDrawerMenu from './MobileDrawerMenu';
import { cn, isCampaignActive } from '@/lib/utils';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';

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
                    style={{ 
                        paddingBottom: isScrolled ? '0.35rem' : '0.5rem', 
                        paddingTop: isScrolled ? 'calc(env(safe-area-inset-top, 0px) + 0.35rem)' : 'calc(env(safe-area-inset-top, 0px) + 0.5rem)' 
                    }}
                >
                    <div className="px-4 sm:px-6 flex justify-between items-center relative">
                        {/* Hamburger Button (Accessible Touch Target) */}
                        <div className="z-30">
                            <button
                                onClick={handleToggleMenu}
                                className="text-white hover:text-primary transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 rounded-lg active:bg-white/5"
                                aria-label="Toggle Menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="size-7" />
                                ) : (
                                    <Menu className="size-7" />
                                )}
                            </button>
                        </div>

                        {/* Center Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block relative transition-all duration-300 logo-promo-glow ${isScrolled ? 'h-9 w-24' : 'h-12 w-28 sm:h-14 sm:w-32'}`}>
                                <Image
                                    src="/assets/logo.svg"
                                    alt="AHAC Logo"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </Link>
                        </div>

                        {/* Right Action: Cart (Symmetrically Balanced with Left Hamburger) */}
                        <div className="z-30">
                            <button
                                onClick={handleOpenCart}
                                className="text-white hover:text-cyan-400 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 relative rounded-lg active:bg-white/5"
                                aria-label="Open Cart"
                            >
                                <ShoppingCart className="size-6" />
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
