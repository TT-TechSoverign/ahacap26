'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import CheckoutWrapper from '../../components/CheckoutForm';
import { useCart } from '../../context/CartContext';


export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
    const [email, setEmail] = useState('');

    const handleSuccess = () => {
        setStep('success');
        clearCart();
    };

    if (step === 'success') {
        return (
            <main className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-4 md:px-8 flex items-center justify-center">
                 <div className="max-w-md w-full text-center space-y-8 p-8 border border-cyan-500/20 rounded-2xl bg-slate-900/50 backdrop-blur shadow-[0_0_50px_rgba(6,182,212,0.1)]">
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

                    <div className="space-y-4">
                        <h1 className="text-white font-header font-black uppercase text-3xl tracking-wide drop-shadow-lg">
                            Order <span className="text-cyan-400">Confirmed</span>
                        </h1>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Thank you for your business. A confirmation email has been sent to <span className="text-white font-mono">{email}</span>.
                        </p>
                    </div>

                     <div className="bg-slate-950 rounded border border-slate-800 p-4 font-mono text-xs text-slate-500">
                        <p className="uppercase tracking-widest text-[10px] mb-2">Transaction ID</p>
                        <p className="text-cyan-500">{crypto.randomUUID().slice(0, 18).toUpperCase()}</p>
                    </div>

                    <Link href="/shop" className="block w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-500/20">
                        Return to Shop
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <h1 className="text-4xl md:text-6xl font-header font-black text-white uppercase tracking-tighter drop-shadow-lg">
                        Secure <span className="text-cyan-400">Checkout</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-4 text-slate-500 font-mono text-sm uppercase tracking-widest">
                        <span className={step === 'shipping' ? 'text-cyan-400 font-bold' : ''}>01. Shipping</span>
                        <span className="text-slate-700">/</span>
                        <span className={step === 'payment' ? 'text-cyan-400 font-bold' : ''}>02. Payment</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN - FORMS (Bento Grid) */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* 1. Contact Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-9xl text-cyan-500">contact_mail</span>
                            </div>

                            <h2 className="text-2xl font-header font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center size-8 rounded bg-cyan-500/10 text-cyan-400 text-sm font-black border border-cyan-500/20">01</span>
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                                    <input type="tel" placeholder="(808) 555-0123" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Shipping Address Card (Google Places Placeholder) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden group"
                        >
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-9xl text-purple-500">local_shipping</span>
                            </div>

                            <h2 className="text-2xl font-header font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center size-8 rounded bg-purple-500/10 text-purple-400 text-sm font-black border border-purple-500/20">02</span>
                                Shipping Destination
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                        Street Address
                                        <span className="text-[10px] text-cyan-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[10px]">location_on</span>
                                            Google Verified
                                        </span>
                                    </label>
                                    <input type="text" placeholder="Start typing address..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">City</label>
                                        <input type="text" defaultValue="Honolulu" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Zip Code</label>
                                        <input type="text" placeholder="96819" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Payment Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all ${step === 'payment' ? 'ring-2 ring-cyan-500' : 'opacity-50 grayscale'}`}
                        >
                             <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-9xl text-green-500">payments</span>
                            </div>

                            <h2 className="text-2xl font-header font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center size-8 rounded bg-green-500/10 text-green-400 text-sm font-black border border-green-500/20">03</span>
                                Secure Payment
                            </h2>

                            <div className="relative z-10">
                                {step === 'payment' ? (
                                    <CheckoutWrapper
                                        totalAmount={cartTotal}
                                        items={items}
                                        customerEmail={email}
                                        onSuccess={handleSuccess}
                                    />
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (email) setStep('payment');
                                            else alert('Please enter an email address.');
                                        }}
                                        className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        Continue to Payment
                                        <span className="material-symbols-outlined">arrow_downward</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN - SUMMARY (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-2xl"
                            >
                                <h3 className="text-xl font-header font-bold text-white uppercase tracking-wide mb-6 border-b border-white/5 pb-4">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="size-16 bg-slate-950 rounded-lg flex items-center justify-center border border-white/5">
                                                 <span className="material-symbols-outlined text-slate-600">ac_unit</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-white line-clamp-2">{item.name}</h4>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs text-slate-500 font-mono">Qty: {item.quantity}</span>
                                                    <span className="text-cyan-400 font-bold text-sm">${item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <div className="flex justify-between text-sm text-slate-400 uppercase font-bold tracking-wider">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toLocaleString()}</span>
                                    </div>
                                     <div className="flex justify-between text-sm text-slate-400 uppercase font-bold tracking-wider">
                                        <span>Shipping</span>
                                        <span className="text-green-400">Free</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-400 uppercase font-bold tracking-wider">
                                        <span>Tax</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-end">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-header font-black text-white tracking-tighter shadow-cyan-glow">
                                        ${cartTotal.toLocaleString()}
                                    </span>
                                </div>
                            </motion.div>

                            <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start">
                                <span className="material-symbols-outlined text-blue-400 mt-0.5">verified_user</span>
                                <div>
                                    <h4 className="text-blue-400 font-bold uppercase text-xs tracking-wider mb-1">Satisfaction Guaranteed</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Every unit backed by our local Waipahu warranty center. No-hassle returns within 30 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
