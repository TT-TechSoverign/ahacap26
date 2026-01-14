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
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        key="backdrop"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative z-10 w-full max-w-md bg-[#0a0e14] h-full shadow-2xl flex flex-col border-l border-border-dark"
                        key="panel"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border-dark bg-[#161b22]">
                            <h2 className="text-white text-xl font-black uppercase tracking-wider flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary" aria-hidden="true">shopping_cart</span>
                                Your Order
                            </h2>
                            <button onClick={closeCart} className="text-slate-400 hover:text-white transition-colors" aria-label="Close Cart">
                                <span className="material-symbols-outlined text-3xl" aria-hidden="true">close</span>
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                                    <span className="material-symbols-outlined text-6xl opacity-20">production_quantity_limits</span>
                                    <p className="font-bold uppercase tracking-widest text-sm">Cart is Empty</p>
                                    <button onClick={closeCart} className="text-primary hover:underline text-sm font-bold">Browse Inventory</button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            className="flex gap-4 bg-surface-dark border border-border-dark p-4 rounded-xl group relative"
                                        >
                                            <div className="size-20 bg-black/30 rounded-lg flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined text-3xl">ac_unit</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-bold leading-tight mb-1">{item.name}</h4>
                                                <div className="text-primary font-black">${item.price.toLocaleString()}</div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                                                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Qty: {item.quantity}</span>
                                                    <span className="text-yellow-500 font-bold uppercase text-[10px] tracking-wider">Pickup Only</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors"
                                                aria-label={`Remove ${item.name} from cart`}
                                            >
                                                <span className="material-symbols-outlined text-lg" aria-hidden="true">delete</span>
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border-dark bg-[#161b22] space-y-4 relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {!isCheckout ? (
                                        <motion.div
                                            key="summary"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center justify-between text-slate-400 text-sm font-bold uppercase tracking-wider">
                                                <span>Subtotal</span>
                                                <span className="text-white text-xl">${cartTotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                <span>Taxes (Estimated)</span>
                                                <span>$0.00</span>
                                            </div>

                                            <div className="pt-4 border-t border-slate-800">
                                                <button
                                                    onClick={() => setIsCheckout(true)}
                                                    className="w-full bg-primary hover:bg-white hover:text-primary text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-none flex items-center justify-center gap-2 group"
                                                >
                                                    Secure Checkout
                                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="checkout"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-4"
                                        >
                                            {orderSuccess ? (
                                                <div className="text-center space-y-4 py-8">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', delay: 0.2 }}
                                                        className="size-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto"
                                                    >
                                                        <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
                                                    </motion.div>
                                                    <div>
                                                        <h3 className="text-white font-bold uppercase text-lg">Order Confirmed!</h3>
                                                        <p className="text-slate-400 text-sm mt-1">Check your email for instructions.</p>
                                                    </div>
                                                    <button onClick={closeCart} className="text-primary text-xs font-bold uppercase hover:underline mt-2">Close Window</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-white text-sm font-bold uppercase">Secure Payment</h3>
                                                        <button onClick={() => setIsCheckout(false)} className="text-slate-500 text-xs hover:text-white">Back</button>
                                                    </div>

                                                    {/* Stripe Checkout Integrated */}
                                                    <CheckoutWrapper totalAmount={cartTotal} items={items} />

                                                    <p className="text-center text-[10px] text-slate-500 mt-4">
                                                        <span className="material-symbols-outlined text-xs align-middle mr-1">lock</span>
                                                        Encrypted by Stripe. Pickup at Aiea Warehouse.
                                                    </p>
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
