'use client';

import confetti from 'canvas-confetti';
import { loadStripe } from '@stripe/stripe-js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { isCampaignActive } from '../lib/utils';
import { getProductImages } from '../lib/product-images';
import { ShoppingCart, X, Snowflake, AlertCircle, Warehouse, Trash2, AlertTriangle, Loader2, Lock, Phone, Calendar } from 'lucide-react';

function cn(...inputs: (string | undefined)[]) {
    return twMerge(clsx(inputs));
}

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal, clearCart, syncInventory } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    // Email state removed - handled by Stripe Hosted Checkout
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Sync Inventory / Reset state & Body Scroll Lock
    useEffect(() => {
        if (isOpen) {
            syncInventory();
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';

            // GTM E-Commerce view_cart push
            if (items.length > 0 && typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: 'view_cart',
                    ecommerce: {
                        currency: 'USD',
                        value: cartTotal,
                        items: items.map((item, index) => ({
                            item_id: String(item.id),
                            item_name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            index: index
                        }))
                    }
                });
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') closeCart();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            };
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            // Slight delay to allow animation to finish before resetting state logic
            const tm = setTimeout(() => {
                setIsCheckout(false);
                setOrderSuccess(false);
                setError('');
            }, 300);
            return () => clearTimeout(tm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleCheckout = () => {
        closeCart();
        window.location.href = '/checkout';
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const campaignActive = isCampaignActive();
        const colors = campaignActive ? ['#EF4444', '#FFFFFF', '#3B82F6'] : undefined;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200, colors };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const hasIssue = items.some(item => (item.stock || 0) < item.quantity);
    const validTotal = items.reduce((acc, item) => {
        if ((item.stock || 0) >= item.quantity) {
            const campaignActive = isCampaignActive();
            const activePrice = (campaignActive && item.promo_price && item.promo_price > 0) ? item.promo_price : item.price;
            return acc + (activePrice * item.quantity);
        }
        return acc;
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex justify-end isolate" key="cart-portal">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        key="backdrop"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
                        className="relative z-10 w-full max-w-md bg-slate-950 h-[100dvh] shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col border-l border-cyan-500/20"
                        key="panel"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-cyan-500/10 bg-slate-900/50 backdrop-blur-xl">
                            <h2 className="text-white text-2xl font-header font-black uppercase tracking-widest flex items-center gap-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                <ShoppingCart className="size-6 text-cyan-400 animate-pulse-slow" />
                                Cart
                            </h2>
                            <button
                                onClick={closeCart}
                                className="size-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all active:scale-90"
                                aria-label="Close Cart"
                            >
                                <X className="size-6" />
                            </button>
                        </div>


                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-cyan-900">
                            {items.length === 0 && !orderSuccess ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-6">
                                    <div className="size-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                                        <ShoppingCart className="size-16 opacity-20 text-cyan-500" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="font-header font-bold uppercase tracking-[0.2em] text-lg text-slate-400">System Empty</p>
                                        <p className="text-xs text-slate-600 font-mono">No units detected in holding.</p>
                                    </div>
                                    <button
                                        onClick={closeCart}
                                        className="px-6 py-3 bg-cyan-950/30 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500 hover:text-black transition-all font-bold uppercase tracking-wider text-xs"
                                    >
                                        Initialize Inventory
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => {
                                        const thumbSrc = (item.image_url || getProductImages(item.id)?.[0] || '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp').replace(/\.(png|jpg|jpeg)$/i, '.webp');
                                        return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className={`group relative flex gap-4 bg-slate-900/80 border p-4 rounded-xl transition-colors shadow-lg shadow-black/20 ${item.quantity > (item.stock || 0) ? 'border-red-500/50 bg-red-950/10' : 'border-white/5 hover:border-cyan-500/30'}`}
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent rounded-xl transition-all duration-500" />

                                            <div className="relative size-20 shrink-0 bg-black/40 rounded-lg flex items-center justify-center text-slate-600 border border-white/5 overflow-hidden p-1.5">
                                                <Snowflake className="size-8 z-0 text-slate-700" />
                                                <img
                                                    src={thumbSrc}
                                                    alt={item.name}
                                                    className="absolute inset-0 w-full h-full object-contain p-1.5 z-10"
                                                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>

                                            <div className="flex-1 relative z-10 pr-6">
                                                <h4 className="text-slate-200 font-bold leading-tight mb-1 line-clamp-2 text-xs sm:text-sm">{item.name}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    {(isCampaignActive() && item.promo_price && item.promo_price > 0) ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-xs text-red-500 line-through font-bold opacity-60">
                                                                ${item.price.toLocaleString()}
                                                            </span>
                                                            <span className="font-header font-black text-lg tracking-wide text-cyan-400 shadow-cyan-glow">
                                                                ${item.promo_price.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className={`font-header font-black text-lg tracking-wide ${item.quantity > (item.stock || 0) ? 'text-red-500 line-through opacity-60' : 'text-cyan-400 shadow-cyan-glow'}`}>
                                                            ${item.price.toLocaleString()}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-slate-500 font-mono uppercase">USD</span>
                                                </div>

                                                <div className="flex items-center gap-3 mt-3">
                                                    <div className={`flex items-center gap-1.5 rounded-lg px-1.5 py-0.5 border ${item.quantity > (item.stock || 0) ? 'bg-red-500/20 border-red-500 ring-1 ring-red-500/50' : 'bg-black/40 border-white/10'}`}>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="size-6 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/10 font-mono font-bold text-xs transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            -
                                                        </button>
                                                        <span className={`font-mono text-xs font-bold min-w-[1.25rem] text-center ${item.quantity > (item.stock || 0) ? 'text-red-200' : 'text-white'}`}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= (item.stock || 1)}
                                                            className="size-6 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 font-mono font-bold text-xs transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {item.quantity > (item.stock || 0) ? (
                                                        <span className="text-red-500 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1 animate-pulse">
                                                            <AlertCircle className="size-3" />
                                                            Sold Out
                                                        </span>
                                                    ) : (
                                                        <span className="text-amber-500/90 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
                                                            <Warehouse className="size-2.5" />
                                                            Pickup / $50 Delivery
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="absolute top-2 right-2 z-20 size-11 flex items-center justify-center rounded-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <Trash2 className="size-5" />
                                            </button>
                                        </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer / Checkout (Thumb Zone) */}
                        {(items.length > 0) && (
                            <div 
                                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
                                className="p-6 border-t border-cyan-500/10 bg-slate-900/80 backdrop-blur-xl space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] z-20"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            <span>Subtotal {hasIssue && '(In-Stock Only)'}</span>
                                            <span className="font-mono text-slate-500">{items.reduce((sum, i) => sum + i.quantity, 0)} Units</span>
                                        </div>
                                        <div className="flex items-end justify-between gap-2">
                                            <span className={`text-3xl font-header font-black tracking-tighter shadow-white-glow ${hasIssue ? 'text-amber-500' : 'text-white'}`}>
                                                ${validTotal.toLocaleString()}
                                            </span>
                                            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider mb-1 text-right leading-tight">
                                                Free Waipahu Pickup or $50 Delivery<br />+ 4.712% HI GET Tax
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar (Visual Flair) */}
                                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full w-[60%] shadow-[0_0_10px_currentColor] transition-colors ${hasIssue ? 'bg-red-500' : 'bg-cyan-500'}`} />
                                    </div>

                                    {/* Critical Inventory Warning */}
                                    {hasIssue && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                                            <div className="flex items-start gap-3 relative z-10">
                                                <AlertTriangle className="size-5 text-red-500 animate-bounce" />
                                                <div className="space-y-1">
                                                    <p className="text-red-400 font-black uppercase text-[10px] tracking-[0.2em]">Action Required</p>
                                                    <p className="text-slate-300 text-xs font-bold leading-relaxed">
                                                        Out-of-stock items detected. Please remove them to proceed.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Free Sizing Estimates & Direct Dispatch Alternative */}
                                    <div className="p-3.5 bg-slate-950/80 border border-emerald-500/30 rounded-xl space-y-2 text-left shadow-inner">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                By Appt First • Free Sizing Estimates
                                            </div>
                                            <span className="text-[9px] text-cyan-400 font-mono uppercase">Direct Dispatch</span>
                                        </div>
                                        <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                                            Want to confirm window sizing, 115V vs 230V electrical fit, or pickup details before purchasing? Call our office or submit an appointment inquiry ($0 for estimates).
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <a 
                                                href="tel:808-488-1111"
                                                className="py-2 px-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-emerald-500/30 text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                                            >
                                                <Phone className="size-3 text-emerald-400 shrink-0" />
                                                <span>Call (808) 488-1111</span>
                                            </a>
                                            <Link 
                                                href="/contact?service=window_ac_purchase"
                                                onClick={closeCart}
                                                className="py-2 px-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg border border-white/10 text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                                            >
                                                <Calendar className="size-3 text-cyan-400 shrink-0" />
                                                <span>Book via Form</span>
                                            </Link>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={loading || hasIssue}
                                        className={`w-full h-16 text-white font-header font-black uppercase tracking-[0.2em] text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-0.5 group disabled:opacity-50 disabled:cursor-not-allowed ${hasIssue ? 'bg-slate-800 cursor-not-allowed border border-white/5' : 'bg-gradient-to-r from-primary to-cyan-500 shadow-[0_0_30px_rgba(0,174,239,0.3)]'}`}
                                    >
                                        {loading ? (
                                            <Loader2 className="size-5 animate-spin" />
                                        ) : hasIssue ? (
                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-500">Inventory Locked</span>
                                                <Lock className="size-5 text-slate-600" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <span>Secure Checkout</span>
                                                    <Lock className="size-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                                <span className="text-[9px] font-mono tracking-wider text-slate-950 font-bold">
                                                    US-Issued Cards Only (50 US States)
                                                </span>
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-slate-500">
                                        <Lock className="size-3.5 inline-block text-emerald-400" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest">256-bit TLS via Stripe • US Cards Only</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
