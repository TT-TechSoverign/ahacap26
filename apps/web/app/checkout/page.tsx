'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { EditableText } from '../../components/EditableText';
import CheckoutWrapper from '../../components/CheckoutForm';
import { useCart } from '../../context/CartContext';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { getProductImages } from '../../lib/product-images';

function CheckoutContent() {
    const { items, clearCart, cartTotal } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
    const [email, setEmail] = useState('');
    const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');

    const searchParams = useSearchParams();
    const router = useRouter();

    const deliveryFee = fulfillment === 'delivery' ? 50 : 0;
    const subtotal = cartTotal + deliveryFee;
    const taxAmount = subtotal * 0.04712; // 4.712% HI Tax
    const finalTotal = subtotal + taxAmount;

    const handleSuccess = () => {
        setStep('success');
        clearCart();
    };

    useEffect(() => {
        console.log('CheckoutPage: params check', {
            val: searchParams.get('success'),
            hasSucc: searchParams.has('success')
        });

        if (searchParams.get('success') === 'true') {
            console.log('CheckoutPage: SUCCESS DETECTED -> Triggering Success View');
            handleSuccess();
        }
    }, [searchParams]);

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
                            Thank you for your business. A confirmation email has been sent to the address provided.
                        </p>
                    </div>

                    <div className="bg-[#0a0e14]/80 backdrop-blur-2xl border border-primary/30 p-4 rounded-xl text-left space-y-3 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>
                        <h4 className="text-primary font-header font-black uppercase text-xs tracking-widest flex items-center gap-2 relative z-10">
                            <span className="material-symbols-outlined text-sm animate-pulse">info</span>
                            <EditableText contentKey="logistics.pickup.label" />
                        </h4>
                        <p className="text-slate-300 text-[11px] leading-relaxed uppercase font-bold tracking-tight relative z-10">
                            {fulfillment === 'pickup'
                                ? <EditableText contentKey="logistics.pickup.process" />
                                : <EditableText contentKey="logistics.delivery.coverage" />
                            }
                        </p>
                    </div>

                    <div className="bg-[#05070a] rounded border border-white/5 p-4 font-mono text-xs text-slate-500">
                        <p className="uppercase tracking-widest text-[10px] mb-2 opacity-50 text-center">Deployment ID Hash</p>
                        <p className="text-primary text-center font-black">{crypto.randomUUID().slice(0, 18).toUpperCase()}</p>
                    </div>

                    <Link href="/shop" className="block w-full py-4 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white font-header font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-lg active:scale-95 text-center">
                        Return to Shop
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#0a0e14] pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-red-500 font-header font-black uppercase tracking-[0.6em] text-[10px] block animate-pulse">
                            YES I'M <span className="italic">HOT!</span>
                        </span>
                        <h1 className="text-4xl md:text-6xl font-header font-black text-white uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] leading-none">
                            Checkout
                        </h1>
                    </div>
                    <div className="flex items-center gap-6 text-slate-500 font-header font-black text-[10px] uppercase tracking-[0.3em]">
                        <span className={step === 'shipping' ? 'text-cyan-400' : 'opacity-40'}>01. Fulfillment</span>
                        <div className="h-px w-8 bg-white/10"></div>
                        <span className={step === 'payment' ? 'text-primary' : 'opacity-40'}>02. Payment</span>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN - FORMS (Bento Grid) */}
                    <div className="contents lg:block lg:col-span-8 lg:space-y-6">



                        {/* 2. Fulfillment Selector Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#0f131a] border border-cyan-500/20 bg-cyan-900/5 p-8 rounded-2xl shadow-xl relative overflow-hidden group ring-1 ring-white/5 order-1 lg:order-none"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
                                <span className="material-symbols-outlined text-9xl text-cyan-400">local_shipping</span>
                            </div>

                            <h2 className="text-xl font-header font-black text-white uppercase tracking-widest mb-8 flex items-center gap-4">
                                <span className="flex items-center justify-center size-10 rounded-xl bg-cyan-400/10 text-cyan-400 text-sm font-black border border-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">01</span>
                                Fulfillment Selection
                            </h2>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setFulfillment('pickup')}
                                    className={`p-8 rounded-3xl border transition-all duration-500 text-center flex flex-col items-center justify-center space-y-6 group/btn relative overflow-hidden ${fulfillment === 'pickup' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30' : 'bg-[#05070a] border-white/5 hover:border-emerald-500/30'}`}
                                >
                                    <div className={`p-4 rounded-2xl transition-colors mb-2 ${fulfillment === 'pickup' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover/btn:text-emerald-400 group-hover/btn:bg-emerald-500/10'}`}>
                                        <span className="material-symbols-outlined text-4xl group-hover/btn:scale-110 transition-transform">warehouse</span>
                                    </div>
                                    <div className="space-y-2 relative z-10 w-full">
                                        <div className="flex justify-center">
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${fulfillment === 'pickup' ? 'bg-emerald-500 text-[#05070a]' : 'bg-white/5 text-slate-600'}`}>FREE PICKUP</span>
                                        </div>
                                        <h3 className={`text-lg font-header font-black uppercase tracking-wider transition-colors mt-2 ${fulfillment === 'pickup' ? 'text-white' : 'text-slate-400'}`}>Waipahu Center</h3>
                                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold group-hover/btn:text-slate-400 transition-colors">
                                            <EditableText contentKey="logistics.pickup.pricing_notice" />
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setFulfillment('delivery')}
                                    className={`p-8 rounded-3xl border transition-all duration-500 text-center flex flex-col items-center justify-center space-y-6 group/btn relative overflow-hidden ${fulfillment === 'delivery' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30' : 'bg-[#05070a] border-white/5 hover:border-emerald-500/30'}`}
                                >
                                    <div className={`p-4 rounded-2xl transition-colors mb-2 ${fulfillment === 'delivery' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover/btn:text-emerald-400 group-hover/btn:bg-emerald-500/10'}`}>
                                        <span className="material-symbols-outlined text-4xl group-hover/btn:scale-110 transition-transform">local_shipping</span>
                                    </div>
                                    <div className="space-y-2 relative z-10 w-full">
                                        <div className="flex justify-center">
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${fulfillment === 'delivery' ? 'bg-emerald-500 text-[#05070a]' : 'bg-white/5 text-slate-600'}`}>$50.00 FLAT RATE</span>
                                        </div>
                                        <h3 className={`text-lg font-header font-black uppercase tracking-wider transition-colors mt-2 ${fulfillment === 'delivery' ? 'text-white' : 'text-slate-400'}`}>Oahu Delivery</h3>
                                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold group-hover/btn:text-slate-400 transition-colors">
                                            <EditableText contentKey="logistics.delivery.coverage" />
                                        </p>
                                    </div>
                                </button>
                            </div>

                            {fulfillment === 'pickup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-6 p-5 rounded-xl border border-orange-500/20 bg-orange-500/5 text-orange-500/80"
                                >
                                    <div className="flex gap-4 items-start">
                                        <span className="material-symbols-outlined text-sm pt-0.5 animate-pulse">warning</span>
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                            <EditableText contentKey="logistics.pickup.warning" />
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {fulfillment === 'delivery' && (
                                <div className="mt-8 space-y-8 relative z-10 p-8 border border-white/5 bg-black/20 rounded-2xl ring-1 ring-white/5">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 flex items-center justify-between">
                                                Street Address
                                                <span className="text-cyan-500 flex items-center gap-2 animate-pulse">
                                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                                    Island Coverage Check
                                                </span>
                                            </label>
                                            <input type="text" placeholder="Enter delivery address..." className="w-full bg-[#05070a] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-all font-medium text-sm" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">City</label>
                                                <input type="text" placeholder="City" className="w-full bg-[#05070a] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-all font-medium text-sm" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Zip Code</label>
                                                <input type="text" placeholder="Zip" className="w-full bg-[#05070a] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-all font-medium text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-xl">
                                        <h4 className="text-red-400 font-black uppercase text-[10px] tracking-[0.2em] mb-3 flex items-center gap-3">
                                            <span className="material-symbols-outlined text-sm">block</span>
                                            <EditableText contentKey="logistics.delivery.exclusions_label" />
                                        </h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose ml-1">
                                            <EditableText contentKey="logistics.delivery.exclusions" />
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* 3. Payment Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`bg-[#0f131a] border border-emerald-500/20 bg-emerald-900/5 p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-700 ring-1 ring-white/5 order-3 lg:order-none ${step === 'payment' ? 'ring-2 ring-emerald-500 border-emerald-500/50' : 'opacity-40 grayscale'}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
                                <span className="material-symbols-outlined text-9xl text-emerald-500">payments</span>
                            </div>

                            <h2 className="text-xl font-header font-black text-white uppercase tracking-widest mb-8 flex items-center gap-4">
                                <span className="flex items-center justify-center size-10 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-black border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">02</span>
                                Secure Payment
                            </h2>

                            <div className="relative z-10">
                                {step === 'payment' ? (
                                    <CheckoutWrapper
                                        totalAmount={finalTotal}
                                        items={items}
                                        customerEmail={email}
                                        fulfillmentMode={fulfillment}
                                        onSuccess={handleSuccess}
                                    />
                                ) : (
                                    <button
                                        onClick={() => {
                                            setStep('payment');
                                        }}
                                        className="w-full py-5 bg-primary text-white font-header font-black uppercase tracking-[0.3em] text-xs rounded-xl transition-all shadow-lg hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        Next Phase: Payment Architecture
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN - SUMMARY (Sticky) */}
                    <div className="lg:col-span-4 order-2 lg:order-none">
                        <div className="sticky top-28 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[#0f131a] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>
                                <h3 className="text-lg font-header font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4 relative z-10">
                                    Order Summary
                                </h3>

                                <div className="space-y-5 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 relative z-10">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-4 group/item">
                                            <div className="size-14 bg-[#05070a] rounded-xl flex items-center justify-center border border-white/5 group-hover/item:border-primary/30 transition-colors relative overflow-hidden">
                                                {item.image_url || getProductImages(item.id)?.[0] ? (
                                                    <Image
                                                        src={item.image_url || getProductImages(item.id)[0]}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                ) : (
                                                    <span className="material-symbols-outlined text-slate-700 group-hover/item:text-primary transition-colors">ac_unit</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xs font-black text-white/80 line-clamp-1 uppercase tracking-tighter group-hover/item:text-white transition-colors">{item.name}</h4>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Qty: {item.quantity}</span>
                                                    <span className="text-primary font-header font-black text-xs">${item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                                    <div className="flex justify-between text-[11px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-white/80">${cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>Fulfillment</span>
                                        <span className={fulfillment === 'delivery' ? 'text-cyan-400' : 'text-emerald-400'}>
                                            {fulfillment === 'delivery' ? `$${deliveryFee.toFixed(2)}` : 'FREE PICKUP'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>HI State Tax (4.712%)</span>
                                        <span className="text-white/80">${taxAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-end relative z-10">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Total</span>
                                    <span className="text-4xl font-header font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                                        ${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </motion.div>

                            <div className="p-8 rounded-3xl border border-red-900/40 bg-[#0f0505] flex flex-col items-center text-center space-y-4 shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent opacity-50"></div>
                                <div className="p-3 rounded-xl bg-red-950/50 text-red-500 border border-red-900/50 shadow-inner relative z-10">
                                    <span className="material-symbols-outlined text-2xl">shield_lock</span>
                                </div>
                                <div className="relative z-10 space-y-2">
                                    <h4 className="text-red-500 font-header font-black uppercase text-xs tracking-[0.3em]">All Sales Final</h4>
                                    <p className="text-white font-bold uppercase text-[10px] tracking-widest">
                                        No Refunds <span className="text-red-800 mx-2">•</span> No Exchanges
                                    </p>
                                    <p className="text-slate-500 text-[10px] font-medium leading-relaxed max-w-[250px] mx-auto pt-2 border-t border-red-900/30 mt-2">
                                        All warranty claims & defective units must be processed directly through the manufacturer.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0f131a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-40 group-hover:opacity-100 transition-opacity"></div>
                                <h4 className="text-slate-500 font-header font-black uppercase text-[9px] tracking-[0.3em] mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-xs">local_shipping</span>
                                    Logistics Protocol
                                </h4>
                                <p className="text-[9px] text-slate-600 leading-relaxed uppercase tracking-widest font-bold group-hover:text-slate-400 transition-colors">
                                    <EditableText contentKey="logistics.pickup.warning" />
                                    <span className="block mt-1 text-primary opacity-60">
                                        <EditableText contentKey="logistics.delivery.price_label" />: <EditableText contentKey="logistics.delivery.price_value" />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0e14] pt-24 pb-12 px-4 md:px-8 flex items-center justify-center">
                <div className="text-primary font-header font-black uppercase tracking-[0.3em] animate-pulse">Initializing Secure Tunnel...</div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
