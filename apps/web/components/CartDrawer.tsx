'use client';

import confetti from 'canvas-confetti';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useCart } from '../context/CartContext';
import CheckoutWrapper from './CheckoutForm';

function cn(...inputs: (string | undefined)[]) {
    return twMerge(clsx(inputs));
}

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, cartTotal, clearCart, submitOrder } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Reset state on close
    useEffect(() => {
        if (!isOpen) {
            // Slight delay to allow animation to finish before resetting state logic
            const tm = setTimeout(() => {
                setIsCheckout(false);
                setOrderSuccess(false);
                setError('');
                setEmail('');
            }, 300);
            return () => clearTimeout(tm);
        }
    }, [isOpen]);

    const handleCheckout = async () => {
        if (!email) {
            setError('Email is required.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await submitOrder(email);
            setOrderSuccess(true);
            triggerConfetti();
        } catch (err: any) {
            setError(err.message || 'Checkout failed.');
        } finally {
            setLoading(false);
        }
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

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
                        className="relative z-10 w-full max-w-md bg-slate-950 h-full shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col border-l border-cyan-500/20"
                        key="panel"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-cyan-500/10 bg-slate-900/50 backdrop-blur-xl">
                            <h2 className="text-white text-2xl font-header font-black uppercase tracking-widest flex items-center gap-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                <span className="material-symbols-outlined text-cyan-400 animate-pulse-slow">shopping_cart</span>
                                Cart_v2.0
                            </h2>
                            <button
                                onClick={closeCart}
                                className="size-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all active:scale-90"
                                aria-label="Close Cart"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-cyan-900">
                            {items.length === 0 && !orderSuccess ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-6">
                                    <div className="size-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                                        <span className="material-symbols-outlined text-6xl opacity-20 text-cyan-500">production_quantity_limits</span>
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
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className="group relative flex gap-4 bg-slate-900/80 border border-white/5 p-4 rounded-xl hover:border-cyan-500/30 transition-colors shadow-lg shadow-black/20"
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent rounded-xl transition-all duration-500" />

                                            <div className="relative size-20 bg-black/40 rounded-lg flex items-center justify-center text-slate-600 border border-white/5 overflow-hidden">
                                                {/* Fallback Icon */}
                                                <span className="material-symbols-outlined text-3xl z-0">ac_unit</span>
                                                {/* Image Support (Future Proofing) */}
                                                {/* <img src={...} className="absolute inset-0 w-full h-full object-cover z-10" /> */}
                                            </div>

                                            <div className="flex-1 relative z-10">
                                                <h4 className="text-slate-200 font-bold leading-tight mb-1 line-clamp-2 md:line-clamp-1">{item.name}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-cyan-400 font-header font-black text-lg tracking-wide shadow-cyan-glow">${item.price.toLocaleString()}</span>
                                                    <span className="text-[10px] text-slate-500 font-mono uppercase">USD</span>
                                                </div>

                                                <div className="flex items-center gap-3 mt-3">
                                                    <div className="flex items-center gap-2 bg-black/40 rounded px-2 py-1 border border-white/5">
                                                        <span className="text-xs text-slate-400 font-bold uppercase">Qty</span>
                                                        <span className="text-white font-mono text-xs">{item.quantity}</span>
                                                    </div>
                                                    <span className="text-amber-500/90 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[10px]">warehouse</span>
                                                        Pickup
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="absolute top-2 right-2 p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer / Checkout (Thumb Zone) */}
                        {(items.length > 0 || orderSuccess) && (
                            <div className="p-6 border-t border-cyan-500/10 bg-slate-900/80 backdrop-blur-xl space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] z-20 pb-8 md:pb-6">
                                <AnimatePresence mode="wait">
                                    {!isCheckout ? (
                                        <motion.div
                                            key="summary"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-5"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
                                                    <span>Subtotal</span>
                                                    <span className="font-mono text-slate-500">{items.length} Units</span>
                                                </div>
                                                <div className="flex items-end justify-between">
                                                    <span className="text-white text-3xl font-header font-black tracking-tighter shadow-white-glow">
                                                        ${cartTotal.toLocaleString()}
                                                    </span>
                                                    <span className="text-xs text-cyan-500 font-bold uppercase tracking-wider mb-1">
                                                        Calculated at Refresh
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Progress Bar (Visual Flair) */}
                                            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-cyan-500 w-[60%] shadow-[0_0_10px_#06b6d4]" />
                                            </div>

                                            <button
                                                onClick={() => setIsCheckout(true)}
                                                className="w-full relative group overflow-hidden rounded-xl"
                                            >
                                                <div className="absolute inset-0 bg-cyan-500 group-hover:bg-cyan-400 transition-colors duration-300" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                                <div className="relative flex items-center justify-between px-6 py-4">
                                                    <span className="text-black font-header font-black uppercase tracking-widest text-lg">
                                                        Initiate Checkout
                                                    </span>
                                                    <div className="bg-black/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                                                        <span className="material-symbols-outlined text-black font-bold">arrow_forward</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="checkout"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="flex flex-col h-full"
                                        >
                                            {orderSuccess ? (
                                                <div className="text-center space-y-6 py-8">
                                                     <div className="relative">
                                                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: 'spring', delay: 0.2 }}
                                                            className="relative size-24 bg-slate-900 border-2 border-cyan-500 rounded-full flex items-center justify-center mx-auto"
                                                        >
                                                            <span className="material-symbols-outlined text-5xl text-cyan-400">check_circle</span>
                                                        </motion.div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h3 className="text-white font-header font-black uppercase text-2xl tracking-wide">
                                                            Order Authorized
                                                        </h3>
                                                        <p className="text-slate-400 max-w-[250px] mx-auto text-sm leading-relaxed">
                                                            Confirmation vector sent to target email. Pickup access granted.
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={closeCart}
                                                        className="text-cyan-400 text-xs font-bold uppercase hover:text-white tracking-widest border-b border-cyan-500/30 pb-1 hover:border-cyan-400"
                                                    >
                                                        Terminate Session
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="size-2 rounded-full bg-cyan-500 animate-pulse" />
                                                            <h3 className="text-white font-bold uppercase tracking-widest text-sm">Secure Link Active</h3>
                                                        </div>
                                                        <button
                                                            onClick={() => setIsCheckout(false)}
                                                            className="text-slate-500 text-xs font-bold uppercase hover:text-white transition-colors flex items-center gap-1"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                                                            Return
                                                        </button>
                                                    </div>

                                                    <div className="bg-slate-950/50 rounded-xl border border-white/5 p-4">
                                                        {/* Stripe Checkout Integrated */}
                                                        <CheckoutWrapper
                                                            totalAmount={cartTotal}
                                                            items={items}
                                                            onSuccess={() => {
                                                                setOrderSuccess(true);
                                                                triggerConfetti();
                                                                clearCart(); // Simulate post-payment clear
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2 mt-6 text-slate-600">
                                                        <span className="material-symbols-outlined text-sm">lock</span>
                                                        <span className="text-[10px] font-mono uppercase tracking-widest">256-bit TLS Encryption</span>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
