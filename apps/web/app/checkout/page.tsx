'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, Suspense } from 'react';
import { EditableText } from '../../components/EditableText';
import CheckoutWrapper from '../../components/CheckoutForm';
import { useCart } from '../../context/CartContext';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { getProductImages } from '../../lib/product-images';
import { isCampaignActive } from '../../lib/utils';
import { safeStorage } from '../../lib/safe-storage';
import { buildGa4EcommerceItem, trackEcommerceEvent, Ga4EcommerceItem } from '../../lib/tracking';

import { 
    CheckCircle, Info, Star, Calendar, Truck, Warehouse, AlertTriangle, MapPin, Ban, CreditCard, ArrowRight, ArrowLeft, Snowflake, Lock, ShieldCheck, FileText, Phone, ShoppingCart, Trash2 
} from 'lucide-react';

function CheckoutContent() {
    const { items, clearCart, cartTotal, syncInventory, updateQuantity, removeFromCart } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
    const [email, setEmail] = useState('');
    const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
    const [confirmedSessionId, setConfirmedSessionId] = useState<string>('');
    const hasTrackedBeginCheckoutRef = useRef(false);

    useEffect(() => {
        syncInventory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const urlFulfillment = searchParams.get('fulfillment');
        if (urlFulfillment === 'delivery' || urlFulfillment === 'pickup') {
            setFulfillment(urlFulfillment);
        }
    }, [searchParams]);

    const deliveryFee = fulfillment === 'delivery' ? 50 : 0;
    const subtotal = cartTotal + deliveryFee;
    const taxAmount = subtotal * 0.04712; // 4.712% HI Tax
    const finalTotal = subtotal + taxAmount;

    const handleSuccess = () => {
        // Retrieve session_id and fulfillment mode for transaction alignment
        const sessionId = searchParams.get('session_id') || `AHAC-${Math.floor(Math.random() * 90000) + 10000}`;
        const urlFulfillment = searchParams.get('fulfillment');
        if (urlFulfillment === 'delivery' || urlFulfillment === 'pickup') {
            setFulfillment(urlFulfillment);
        }
        setConfirmedSessionId(sessionId);

        // Idempotent GA4 + Google Tag + GTM E-Commerce purchase push hydrated from pre-Stripe localStorage snapshot
        if (typeof window !== 'undefined') {
            const purchaseGuardKey = `ahac_purchased_${sessionId}`;
            const alreadyTracked = safeStorage.getItem(purchaseGuardKey, 'local') === '1';

            if (!alreadyTracked) {
                let purchaseItems: Ga4EcommerceItem[] = [];
                let purchaseTotal = finalTotal;
                let purchaseShipping = urlFulfillment === 'delivery' ? 50 : (urlFulfillment === 'pickup' ? 0 : deliveryFee);
                let purchaseTax = taxAmount;

                try {
                    const pendingRaw = safeStorage.getItem('ahac_pending_order', 'local');
                    if (pendingRaw) {
                        const parsed = JSON.parse(pendingRaw);
                        if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
                            purchaseItems = parsed.items;
                            if (typeof parsed.shippingFee === 'number') {
                                purchaseShipping = parsed.shippingFee;
                            }
                            if (typeof parsed.totalAmount === 'number' && parsed.totalAmount > 0) {
                                purchaseTotal = parsed.totalAmount;
                                const preTax = purchaseTotal / 1.04712;
                                purchaseTax = Math.max(0, purchaseTotal - preTax);
                            }
                        }
                    }

                    if (purchaseItems.length === 0 && items.length > 0) {
                        purchaseItems = items.map((item, index) => buildGa4EcommerceItem(item, item.quantity, index, item.price));
                        const sub = items.reduce((acc, it) => acc + (Number(it.price || 0) * (it.quantity || 1)), 0) + purchaseShipping;
                        purchaseTax = sub * 0.04712;
                        purchaseTotal = sub + purchaseTax;
                    }

                    if (purchaseItems.length === 0) {
                        const savedCartRaw = safeStorage.getItem('ahac_cart', 'local');
                        if (savedCartRaw) {
                            const savedCart = JSON.parse(savedCartRaw);
                            if (Array.isArray(savedCart) && savedCart.length > 0) {
                                purchaseItems = savedCart.map((item: any, index: number) =>
                                    buildGa4EcommerceItem(item, item.quantity || 1, index, item.price)
                                );
                                const sub = savedCart.reduce((acc: number, it: any) => acc + (Number(it.price || 0) * (it.quantity || 1)), 0) + purchaseShipping;
                                purchaseTax = sub * 0.04712;
                                purchaseTotal = sub + purchaseTax;
                            }
                        }
                    }
                } catch {
                    // Fallback safely if JSON parse fails
                }

                trackEcommerceEvent('purchase', {
                    transaction_id: sessionId,
                    currency: 'USD',
                    value: Number(purchaseTotal.toFixed(2)),
                    tax: Number(purchaseTax.toFixed(2)),
                    shipping: Number(purchaseShipping.toFixed(2)),
                    items: purchaseItems,
                });

                safeStorage.setItem(purchaseGuardKey, '1', 'local');
                safeStorage.removeItem('ahac_pending_order', 'local');
            }
        }

        setStep('success');
        clearCart();
    };

    // Track begin_checkout (once per checkout visit, skipped on Stripe success return)
    useEffect(() => {
        if (
            items.length > 0 &&
            searchParams.get('success') !== 'true' &&
            !hasTrackedBeginCheckoutRef.current &&
            typeof window !== 'undefined'
        ) {
            hasTrackedBeginCheckoutRef.current = true;
            trackEcommerceEvent('begin_checkout', {
                currency: 'USD',
                value: Number(cartTotal.toFixed(2)),
                items: items.map((item, index) => buildGa4EcommerceItem(item, item.quantity, index, item.price)),
            });
        }
    }, [items, cartTotal, searchParams]);

    useEffect(() => {
        console.log('CheckoutPage: params check', {
            val: searchParams.get('success'),
            hasSucc: searchParams.has('success')
        });

        if (searchParams.get('success') === 'true') {
            console.log('CheckoutPage: SUCCESS DETECTED -> Triggering Success View');
            handleSuccess();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    if (step === 'success') {
        const displayRef = (confirmedSessionId || searchParams.get('session_id') || 'AHAC-VERIFIED').slice(-16).toUpperCase();
        return (
            <main className="min-h-screen bg-[#0f172a] pt-[104px] md:pt-[188px] pb-16 px-4 md:px-8 flex items-center justify-center">
                <div className="max-w-lg w-full text-center space-y-6 p-6 sm:p-8 border border-cyan-500/20 rounded-2xl bg-slate-900/50 backdrop-blur shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="relative size-20 bg-slate-900 border-2 border-cyan-500 rounded-full flex items-center justify-center mx-auto"
                        >
                            <CheckCircle className="size-10 text-cyan-400" />
                        </motion.div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-white font-header font-black uppercase text-3xl tracking-wide drop-shadow-lg">
                            Order <span className="text-cyan-400">Confirmed</span>
                        </h1>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            Mahalo for your order! Your itemized receipt and fulfillment instructions have been sent to your email.
                        </p>
                    </div>

                    <div className="bg-[#0a0e14]/80 backdrop-blur-2xl border border-primary/30 p-4 rounded-xl text-left space-y-2.5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>
                        <h4 className="text-primary font-header font-black uppercase text-xs tracking-widest flex items-center gap-2 relative z-10">
                            <Info className="size-4 animate-pulse shrink-0" />
                            <span>
                                {fulfillment === 'delivery'
                                    ? 'Oahu Island-Wide Delivery ($50 Flat Rate)'
                                    : <EditableText contentKey="logistics.pickup.label" />
                                }
                            </span>
                        </h4>
                        <p className="text-slate-300 text-[11px] leading-relaxed uppercase font-bold tracking-tight relative z-10">
                            {fulfillment === 'pickup'
                                ? <EditableText contentKey="logistics.pickup.process" />
                                : <EditableText contentKey="logistics.delivery.coverage" />
                            }
                        </p>
                        <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
                            <span>Waipahu Warehouse: <strong className="text-white">94-150 Leoleo St. #203, Waipahu, HI 96797</strong></span>
                            <a
                                href="tel:8084881111"
                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-white font-mono font-bold shrink-0"
                            >
                                <Phone className="size-3" /> (808) 488-1111
                            </a>
                        </div>
                    </div>

                    {/* Post-Purchase Next Steps: $45 Rebate Form & $0 Installation Estimate */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                        <a
                            href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex flex-col justify-between gap-2"
                        >
                            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                                <FileText className="size-3.5 shrink-0" />
                                <span>$45 Cash Rebate PDF</span>
                            </div>
                            <span className="text-white font-header font-bold text-xs uppercase">Download Hawaii Energy Rebate Form &rarr;</span>
                        </a>
                        <Link
                            href="/window-ac-installation?unit=already_own"
                            className="p-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex flex-col justify-between gap-2"
                        >
                            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px] font-bold uppercase">
                                <Calendar className="size-3.5 shrink-0" />
                                <span>Need Installation?</span>
                            </div>
                            <span className="text-white font-header font-bold text-xs uppercase">Book $0 Free Install Estimate &rarr;</span>
                        </Link>
                    </div>

                    <div className="bg-[#05070a] rounded-xl border border-white/5 p-3 font-mono text-xs text-slate-500">
                        <p className="uppercase tracking-widest text-[9px] mb-1 opacity-60 text-center">Order Reference ID</p>
                        <p className="text-primary text-center font-black">{displayRef}</p>
                    </div>

                    <Link href="/shop" className="block w-full py-4 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white hover:text-slate-950 font-header font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-lg active:scale-95 text-center">
                        Return to Shop
                    </Link>
                </div>
            </main>
        );
    }

    if (items.length === 0 && !searchParams.get('success')) {
        return (
            <main className="min-h-screen bg-[#0a0e14] pt-[104px] md:pt-[188px] pb-16 px-4 md:px-8 flex items-center justify-center">
                <div className="max-w-md w-full text-center space-y-6 p-8 border border-white/10 rounded-3xl bg-slate-900/60 backdrop-blur shadow-2xl">
                    <div className="size-20 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center mx-auto text-cyan-400">
                        <ShoppingCart className="size-9 opacity-60" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-header font-black uppercase text-white tracking-tight">Your Cart Is Empty</h1>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">
                            Select an in-stock LG Dual Inverter or GE Built-In Window AC ($395–$1,200) from our Waipahu warehouse to begin checkout.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Link
                            href="/shop"
                            className="w-full py-3.5 px-6 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,174,239,0.3)]"
                        >
                            <Warehouse className="size-4" />
                            <span>Shop In-Stock Window ACs</span>
                        </Link>
                        <Link
                            href="/sizing"
                            className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-header font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Snowflake className="size-4 text-cyan-400" />
                            <span>Run Oahu BTU Sizing Calculator</span>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a0e14] pb-12 px-4 md:px-8 pt-[88px] md:pt-[180px]">
            {/* Dedicated Secure Express Checkout Header Bar (NavbarV2 is intentionally hidden on /checkout) */}
            <header className="fixed top-0 inset-x-0 z-50 bg-[#060a12] border-b border-white/10 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 text-xs font-header font-black uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft className="size-4 text-cyan-400 shrink-0" />
                        <span>Continue Shopping</span>
                    </Link>

                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
                        <Lock className="size-3.5 shrink-0" />
                        <span>256-Bit Stripe SSL • Apple Pay &amp; Google Pay Ready</span>
                    </div>

                    <a
                        href="tel:8084881111"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-mono font-bold transition-colors"
                    >
                        <Phone className="size-3.5 text-emerald-400 shrink-0" />
                        <span>(808) 488-1111</span>
                    </a>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-red-500 font-header font-black uppercase tracking-[0.6em] text-[10px] block animate-pulse">
                            YES I&apos;M <span className="italic">HOT!</span>
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
                            className="bg-[#0f131a] border border-cyan-500/20 bg-cyan-900/5 p-4 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group ring-1 ring-white/5 order-1 lg:order-none"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
                                <Truck className="size-32 text-cyan-400" />
                            </div>

                            <h2 className="text-lg md:text-xl font-header font-black text-white uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                                <span className="flex items-center justify-center size-8 md:size-10 rounded-xl bg-cyan-400/10 text-cyan-400 text-xs md:text-sm font-black border border-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">01</span>
                                Fulfillment Selection
                            </h2>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <button
                                    onClick={() => setFulfillment('pickup')}
                                    className={`p-4 md:p-8 rounded-3xl border transition-all duration-500 text-center flex flex-col items-center justify-center space-y-4 md:space-y-6 group/btn relative overflow-hidden ${fulfillment === 'pickup' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30' : 'bg-[#05070a] border-white/5 hover:border-emerald-500/30'}`}
                                >
                                    <div className={`p-3 md:p-4 rounded-2xl transition-colors mb-2 ${fulfillment === 'pickup' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover/btn:text-emerald-400 group-hover/btn:bg-emerald-500/10'}`}>
                                        <Warehouse className="size-9 group-hover/btn:scale-110 transition-transform" />
                                    </div>
                                    <div className="space-y-1 md:space-y-2 relative z-10 w-full">
                                        <div className="flex justify-center">
                                            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${fulfillment === 'pickup' ? 'bg-emerald-500 text-[#05070a]' : 'bg-white/5 text-slate-600'}`}>FREE PICKUP</span>
                                        </div>
                                        <h3 className={`text-base md:text-lg font-header font-black uppercase tracking-wider transition-colors mt-2 ${fulfillment === 'pickup' ? 'text-white' : 'text-slate-400'}`}>Waipahu Center</h3>
                                        <p className="hidden md:block text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold group-hover/btn:text-slate-400 transition-colors">
                                            <EditableText contentKey="logistics.pickup.pricing_notice" />
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setFulfillment('delivery')}
                                    className={`p-4 md:p-8 rounded-3xl border transition-all duration-500 text-center flex flex-col items-center justify-center space-y-4 md:space-y-6 group/btn relative overflow-hidden ${fulfillment === 'delivery' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30' : 'bg-[#05070a] border-white/5 hover:border-emerald-500/30'}`}
                                >
                                    <div className={`p-3 md:p-4 rounded-2xl transition-colors mb-2 ${fulfillment === 'delivery' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover/btn:text-emerald-400 group-hover/btn:bg-emerald-500/10'}`}>
                                        <Truck className="size-9 group-hover/btn:scale-110 transition-transform" />
                                    </div>
                                    <div className="space-y-1 md:space-y-2 relative z-10 w-full">
                                        <div className="flex justify-center">
                                            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${fulfillment === 'delivery' ? 'bg-emerald-500 text-[#05070a]' : 'bg-white/5 text-slate-600'}`}>$50.00 FLAT RATE</span>
                                        </div>
                                        <h3 className={`text-base md:text-lg font-header font-black uppercase tracking-wider transition-colors mt-2 ${fulfillment === 'delivery' ? 'text-white' : 'text-slate-400'}`}>Oahu Delivery</h3>
                                        <p className="hidden md:block text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold group-hover/btn:text-slate-400 transition-colors">
                                            <EditableText contentKey="logistics.delivery.coverage" />
                                        </p>
                                    </div>
                                </button>
                            </div>

                            {fulfillment === 'pickup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 md:mt-6 p-4 md:p-5 rounded-xl border border-orange-500/20 bg-orange-500/5 text-orange-500/80"
                                >
                                    <div className="flex gap-3 md:gap-4 items-start">
                                        <AlertTriangle className="text-orange-500 size-4 pt-0.5 animate-pulse" />
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                            <EditableText contentKey="logistics.pickup.warning" />
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {fulfillment === 'delivery' && (
                                <div className="mt-6 md:mt-8 space-y-4 relative z-10 p-4 md:p-6 border border-white/5 bg-black/20 rounded-2xl ring-1 ring-white/5">
                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-left">
                                        <MapPin className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-white uppercase tracking-wider">
                                                Oahu Delivery Address Collected on Next Screen
                                            </p>
                                            <p className="text-[11px] text-slate-300 leading-relaxed">
                                                Your Oahu street address and phone number are securely collected once inside Stripe Checkout (or 1-tap via Apple Pay / Google Pay).
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-5 bg-red-500/5 border border-red-500/10 rounded-xl">
                                        <h4 className="text-red-400 font-black uppercase text-[10px] tracking-[0.2em] mb-2 md:mb-3 flex items-center gap-3">
                                            <Ban className="size-4" />
                                            <span className="truncate"><EditableText contentKey="logistics.delivery.exclusions_label" /></span>
                                        </h4>
                                        <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose ml-1">
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
                            className="bg-[#0f131a] border border-emerald-500/30 bg-emerald-900/5 p-4 md:p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-700 ring-1 ring-emerald-500/30 order-3 lg:order-none"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
                                <CreditCard className="size-32 text-emerald-500" />
                            </div>

                            <h2 className="text-lg md:text-xl font-header font-black text-white uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                                <span className="flex items-center justify-center size-8 md:size-10 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs md:text-sm font-black border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">02</span>
                                Secure Payment — US-Issued Cards Only (50 US States)
                            </h2>

                            <div className="relative z-10">
                                <CheckoutWrapper
                                    totalAmount={finalTotal}
                                    items={items}
                                    customerEmail={email}
                                    fulfillmentMode={fulfillment}
                                    onSuccess={handleSuccess}
                                />
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN - SUMMARY (Sticky) */}
                    <div className="lg:col-span-4 order-2 lg:order-none">
                        <div className="sticky top-24 md:top-[184px] space-y-4 md:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[#0f131a] border border-white/5 p-4 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>
                                <h3 className="text-base md:text-lg font-header font-black text-white uppercase tracking-widest mb-4 md:mb-6 border-b border-white/5 pb-3 md:pb-4 relative z-10">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 md:space-y-5 mb-6 md:mb-8 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 relative z-10">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-3 md:gap-4 group/item bg-black/25 border border-white/5 rounded-xl p-2.5">
                                            <div className="size-12 md:size-14 bg-[#05070a] rounded-xl flex items-center justify-center border border-white/5 group-hover/item:border-primary/30 transition-colors relative overflow-hidden shrink-0">
                                                {item.image_url || getProductImages(item.id)?.[0] ? (
                                                    <Image
                                                        src={item.image_url || getProductImages(item.id)[0]}
                                                        alt={item.name}
                                                        fill
                                                        sizes="56px"
                                                        className="object-contain p-1"
                                                    />
                                                ) : (
                                                    <Snowflake className="text-slate-700 group-hover/item:text-primary transition-colors size-6" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="text-[10px] md:text-xs font-black text-white/90 line-clamp-1 uppercase tracking-tighter group-hover/item:text-white transition-colors">{item.name}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-500 hover:text-red-400 p-0.5 rounded transition-colors shrink-0"
                                                        aria-label={`Remove ${item.name}`}
                                                        title="Remove item"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-1.5 gap-2">
                                                    <div className="flex items-center gap-1 rounded-lg bg-slate-900 border border-white/10 px-1 py-0.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="size-5 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/10 font-mono font-bold text-xs transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-mono text-[11px] font-bold text-white min-w-[1.25rem] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= (item.stock || 1)}
                                                            className="size-5 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 font-mono font-bold text-xs transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {(isCampaignActive() && item.promo_price && item.promo_price > 0) ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[10px] text-red-500 line-through font-bold opacity-60">
                                                                ${(item.price * item.quantity).toLocaleString()}
                                                            </span>
                                                            <span className="text-primary font-header font-black text-xs">
                                                                ${(item.promo_price * item.quantity).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-primary font-header font-black text-xs">${(item.price * item.quantity).toLocaleString()}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 md:space-y-3 pt-4 md:pt-6 border-t border-white/10 relative z-10">
                                    <div className="flex justify-between text-[10px] md:text-[11px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-white/80">${cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] md:text-[11px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>Fulfillment</span>
                                        <span className={fulfillment === 'delivery' ? 'text-cyan-400' : 'text-emerald-400'}>
                                            {fulfillment === 'delivery' ? `$${deliveryFee.toFixed(2)}` : 'FREE PICKUP'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[10px] md:text-[11px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>HI State Tax (4.712%)</span>
                                        <span className="text-white/80">${taxAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 flex justify-between items-end relative z-10">
                                    <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Total</span>
                                    <span className="text-3xl md:text-4xl font-header font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                                        ${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </motion.div>

                            <div className="p-4 md:p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 flex flex-col items-center text-center space-y-3 shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-60"></div>
                                <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/40 shadow-inner relative z-10">
                                    <ShieldCheck className="size-6" />
                                </div>
                                <div className="relative z-10 space-y-1.5">
                                    <h4 className="text-white font-header font-black uppercase text-[11px] md:text-xs tracking-[0.25em]">Waipahu Warehouse Verified</h4>
                                    <p className="text-cyan-400 font-bold uppercase text-[9px] md:text-[10px] tracking-wider flex items-center justify-center gap-1.5">
                                        <span>1-Year Warranty</span>
                                        <span className="text-slate-600">•</span>
                                        <span>Factory Sealed</span>
                                        <span className="text-slate-600">•</span>
                                        <span>Free In-Store Pickup</span>
                                    </p>
                                    <p className="text-slate-400 text-[10px] leading-relaxed max-w-[260px] mx-auto pt-2 border-t border-white/10 mt-2">
                                        All AC units are brand-new, factory-sealed, and backed by a 1-year manufacturer compressor & parts warranty. Questions? Call Waipahu Dispatch: <a href="tel:8084881111" className="text-cyan-300 font-bold hover:underline">(808) 488-1111</a>
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
