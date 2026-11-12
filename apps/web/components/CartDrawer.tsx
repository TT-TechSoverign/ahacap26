'use client';

import { loadStripe } from '@stripe/stripe-js';
import confetti from 'canvas-confetti';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { isCampaignActive } from '../lib/utils';
import { getProductImages } from '../lib/product-images';
import { safeStorage } from '../lib/safe-storage';
import { buildGa4EcommerceItem, extractGa4SessionIdentifiers, trackEcommerceEvent } from '../lib/tracking';
import { ShoppingCart, X, Snowflake, AlertCircle, Warehouse, Truck, Trash2, AlertTriangle, Loader2, Lock, Phone, Calendar, ArrowRight } from 'lucide-react';

function cn(...inputs: (string | undefined)[]) {
    return twMerge(clsx(inputs));
}

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal, clearCart, syncInventory } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const [fulfillmentMode, setFulfillmentMode] = useState<'pickup' | 'delivery'>('pickup');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Sync Inventory / Reset state & Body Scroll Lock
    useEffect(() => {
        if (isOpen) {
            syncInventory();
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';

            // GA4 + GTM E-Commerce view_cart dispatch
            if (items.length > 0) {
                trackEcommerceEvent('view_cart', {
                    currency: 'USD',
                    value: cartTotal,
                    items: items.map((item, index) => buildGa4EcommerceItem(item, item.quantity, index, item.price)),
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

    const handleFullReviewPage = () => {
        closeCart();
        window.location.href = `/checkout?fulfillment=${fulfillmentMode}`;
    };

    const handleExpressStripeCheckout = async () => {
        if (loading || hasIssue || items.length === 0) return;
        setLoading(true);
        setError('');
        try {
            const { gaClientId, gaSessionId } = extractGa4SessionIdentifiers();
            const utmSource = safeStorage.getItem('utm_source', 'session');
            const utmMedium = safeStorage.getItem('utm_medium', 'session');
            const utmCampaign = safeStorage.getItem('utm_campaign', 'session');

            const ga4Items = items.map((it, idx) => buildGa4EcommerceItem(it, it.quantity || 1, idx, it.price));
            trackEcommerceEvent('begin_checkout', {
                currency: 'USD',
                value: Number(validTotal.toFixed(2)),
                items: ga4Items,
            });

            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    fulfillmentMode,
                    gaClientId,
                    gaSessionId,
                    utmSource,
                    utmMedium,
                    utmCampaign,
                }),
            });

            const { url, error: apiError } = await response.json();
            if (apiError) throw new Error(apiError);
            if (!url) throw new Error('Checkout URL missing');

            try {
                const shippingFee = fulfillmentMode === 'delivery' ? 50 : 0;
                const shippingTier = fulfillmentMode === 'delivery' ? 'Oahu Flat-Rate $50 Delivery' : 'Waipahu Free Warehouse Pickup';
                trackEcommerceEvent('add_shipping_info', {
                    currency: 'USD',
                    value: Number(expressFinalTotal.toFixed(2)),
                    shipping_tier: shippingTier,
                    items: ga4Items,
                });
                safeStorage.setItem(
                    'ahac_pending_order',
                    JSON.stringify({
                        items: ga4Items,
                        totalAmount: Number(expressFinalTotal.toFixed(2)),
                        shippingFee,
                        fulfillmentMode,
                        createdAt: Date.now(),
                    }),
                    'local'
                );
            } catch {
                // Non-blocking storage snapshot
            }

            window.location.href = url;
        } catch (err: any) {
            if (err.message === 'out_of_stock') {
                setError('INVENTORY ALERT: An item in your cart was just sold. Availability has been refreshed below.');
                syncInventory();
            } else {
                setError(err.message || 'Express checkout connection failed. Please try again.');
            }
            setLoading(false);
        }
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
    const expressDeliveryFee = fulfillmentMode === 'delivery' ? 50 : 0;
    const expressTaxableSubtotal = validTotal + expressDeliveryFee;
    const expressTaxAmount = expressTaxableSubtotal * 0.04712;
    const expressFinalTotal = expressTaxableSubtotal + expressTaxAmount;

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
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-6 px-2">
                                    <div className="size-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                                        <ShoppingCart className="size-16 opacity-20 text-cyan-500" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="font-header font-bold uppercase tracking-[0.2em] text-lg text-slate-300">Your Cart Is Empty</p>
                                        <p className="text-xs text-slate-400 font-sans max-w-xs leading-relaxed">
                                            Explore our in-stock Waipahu warehouse LG Dual Inverter &amp; GE Window ACs ($395–$1,200) with $0 warehouse pickup or $50 flat Oahu delivery.
                                        </p>
                                    </div>
                                    <div className="w-full space-y-2.5">
                                        <Link
                                            href="/shop"
                                            onClick={closeCart}
                                            className="w-full py-3.5 px-6 bg-primary hover:bg-cyan-300 text-slate-950 rounded-xl transition-all font-header font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,174,239,0.25)]"
                                        >
                                            <Warehouse className="size-4" />
                                            <span>Shop In-Stock Window ACs</span>
                                        </Link>
                                        <Link
                                            href="/sizing"
                                            onClick={closeCart}
                                            className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl transition-all font-header font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                                        >
                                            <Snowflake className="size-3.5 text-cyan-400" />
                                            <span>Run Oahu BTU Sizing Calculator</span>
                                        </Link>
                                    </div>
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
                                                            className="size-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/10 font-mono font-bold text-xs transition-colors"
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
                                                            className="size-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 font-mono font-bold text-xs transition-colors"
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

                        {/* Footer / Express Checkout (Thumb Zone) */}
                        {(items.length > 0) && (
                            <div 
                                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
                                className="p-4 sm:p-5 border-t border-cyan-500/15 bg-slate-900/95 backdrop-blur-xl space-y-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20"
                            >
                                <div className="space-y-3">
                                    {/* Inline 1-Tap Fulfillment Toggle */}
                                    <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-950 border border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => setFulfillmentMode('pickup')}
                                            className={cn(
                                                "py-2 px-2 rounded-lg text-[10px] font-header font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all",
                                                fulfillmentMode === 'pickup'
                                                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                                    : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            <Warehouse className="size-3.5 shrink-0" />
                                            <span>Waipahu Pickup ($0)</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFulfillmentMode('delivery')}
                                            className={cn(
                                                "py-2 px-2 rounded-lg text-[10px] font-header font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all",
                                                fulfillmentMode === 'delivery'
                                                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                                    : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            <Truck className="size-3.5 shrink-0" />
                                            <span>Oahu Delivery ($50)</span>
                                        </button>
                                    </div>

                                    {/* Live Itemized Breakdown */}
                                    <div className="space-y-1 bg-slate-950/60 border border-white/5 rounded-xl px-3.5 py-2.5">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                            <span>Equipment ({items.reduce((sum, i) => sum + i.quantity, 0)} {items.reduce((sum, i) => sum + i.quantity, 0) === 1 ? 'Unit' : 'Units'})</span>
                                            <span className="text-slate-200 font-bold">${validTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                            <span>{fulfillmentMode === 'delivery' ? 'Flat-Rate Oahu Delivery' : 'Waipahu Pickup (By Appt)'} + 4.712% Tax</span>
                                            <span className="text-cyan-300 font-bold">
                                                {fulfillmentMode === 'delivery' ? `+$50.00 + $${expressTaxAmount.toFixed(2)}` : `$0 + $${expressTaxAmount.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="flex items-baseline justify-between pt-1.5 border-t border-white/10">
                                            <span className="text-[11px] font-header font-black uppercase tracking-wider text-white">
                                                Total {hasIssue && '(In-Stock Only)'}
                                            </span>
                                            <span className={`text-2xl font-header font-black tracking-tight ${hasIssue ? 'text-amber-500' : 'text-white'}`}>
                                                ${expressFinalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Critical Inventory Warning */}
                                    {hasIssue && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl relative overflow-hidden group space-y-2"
                                        >
                                            <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                                            <div className="flex items-start gap-2.5 relative z-10">
                                                <AlertTriangle className="size-4 text-red-500 animate-bounce shrink-0 mt-0.5" />
                                                <p className="text-slate-200 text-[11px] font-bold leading-snug">
                                                    Out-of-stock or over-limit items detected. Auto-adjust availability to proceed.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    items.forEach(i => {
                                                        const avail = i.stock || 0;
                                                        if (avail <= 0) {
                                                            removeFromCart(i.id);
                                                        } else if (i.quantity > avail) {
                                                            updateQuantity(i.id, avail);
                                                        }
                                                    });
                                                }}
                                                className="relative z-10 w-full py-2 px-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-200 font-header font-black uppercase tracking-wider text-[10px] transition-all"
                                            >
                                                Auto-Fix Cart Availability
                                            </button>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* 1-Tap Express Stripe Checkout CTA */}
                                    <button
                                        type="button"
                                        onClick={handleExpressStripeCheckout}
                                        disabled={loading || hasIssue}
                                        className={`w-full h-14 text-slate-950 font-header font-black uppercase tracking-[0.14em] text-xs sm:text-sm rounded-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-0.5 group disabled:opacity-50 disabled:cursor-not-allowed ${hasIssue ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-white/5' : 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-primary shadow-[0_0_28px_rgba(16,185,129,0.35)]'}`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2 text-slate-950">
                                                <Loader2 className="size-4 animate-spin" />
                                                <span>Opening Secure Stripe Checkout...</span>
                                            </div>
                                        ) : hasIssue ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-400">Inventory Locked</span>
                                                <Lock className="size-4 text-slate-500" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <Lock className="size-3.5 shrink-0" />
                                                    <span>Express Pay • Apple Pay / Google Pay / Card</span>
                                                </div>
                                                <span className="text-[9px] font-mono tracking-wider text-slate-900 font-bold">
                                                    US-Issued Cards Only (50 US States) • 1-Yr Warranty
                                                </span>
                                            </>
                                        )}
                                    </button>

                                    {/* Secondary Actions: Full Order Review + Free Sizing Help */}
                                    <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                                        <button
                                            type="button"
                                            onClick={handleFullReviewPage}
                                            disabled={hasIssue}
                                            className="py-2 px-2 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-white/10 text-center flex items-center justify-center gap-1 active:scale-95 transition-all disabled:opacity-40"
                                        >
                                            <span>Full Review</span>
                                            <ArrowRight className="size-3 text-cyan-400 shrink-0" />
                                        </button>
                                        <a 
                                            href="tel:808-488-1111"
                                            className="py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-emerald-500/25 text-center flex items-center justify-center gap-1 active:scale-95 transition-all"
                                        >
                                            <Phone className="size-3 text-emerald-400 shrink-0" />
                                            <span>(808) 488-1111</span>
                                        </a>
                                        <Link 
                                            href="/contact?service=window_ac_purchase"
                                            onClick={closeCart}
                                            className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-white/10 text-center flex items-center justify-center gap-1 active:scale-95 transition-all"
                                        >
                                            <Calendar className="size-3 text-cyan-400 shrink-0" />
                                            <span>$0 Estimate</span>
                                        </Link>
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
