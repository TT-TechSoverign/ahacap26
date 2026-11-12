'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { safeStorage } from '../lib/safe-storage';
import { buildGa4EcommerceItem, extractGa4SessionIdentifiers, trackEcommerceEvent } from '../lib/tracking';
import { Loader2, Lock } from 'lucide-react';

interface CheckoutFormProps {
    totalAmount: number;
    items: any[];
    customerEmail?: string;
    fulfillmentMode: 'pickup' | 'delivery';
    onSuccess: () => void;
}

export default function CheckoutForm({ totalAmount, items, customerEmail, fulfillmentMode, onSuccess }: CheckoutFormProps) {
    const { syncInventory, updateQuantity, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hasInventoryConflict = items.some((it) => (it.stock ?? 0) <= 0 || it.quantity > (it.stock ?? 0));

    const handleAutoFix = () => {
        for (const it of items) {
            const avail = it.stock ?? 0;
            if (avail <= 0) {
                removeFromCart(it.id);
            } else if (it.quantity > avail) {
                updateQuantity(it.id, avail);
            }
        }
        setError('');
    };

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            // Extract normalized GA4 identifiers for server-side Measurement Protocol stitching
            const { gaClientId, gaSessionId } = extractGa4SessionIdentifiers();

            const utmSource = safeStorage.getItem('utm_source', 'session');
            const utmMedium = safeStorage.getItem('utm_medium', 'session');
            const utmCampaign = safeStorage.getItem('utm_campaign', 'session');

            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    items, 
                    customerEmail, 
                    fulfillmentMode,
                    gaClientId,
                    gaSessionId,
                    utmSource,
                    utmMedium,
                    utmCampaign
                }),
            });

            const { url, error: apiError } = await response.json();

            if (apiError) throw new Error(apiError);
            if (!url) throw new Error('Checkout URL missing');

            // Persist pending order snapshot so post-Stripe redirect purchase telemetry has 100% accurate items & totals
            try {
                const ga4Items = items.map((it, idx) => buildGa4EcommerceItem(it, it.quantity || 1, idx, it.price));
                const shippingFee = fulfillmentMode === 'delivery' ? 50 : 0;
                const shippingTier = fulfillmentMode === 'delivery' ? 'Oahu Flat-Rate $50 Delivery' : 'Waipahu Free Warehouse Pickup';
                trackEcommerceEvent('add_shipping_info', {
                    currency: 'USD',
                    value: totalAmount,
                    shipping_tier: shippingTier,
                    items: ga4Items,
                });
                safeStorage.setItem(
                    'ahac_pending_order',
                    JSON.stringify({
                        items: ga4Items,
                        totalAmount,
                        shippingFee,
                        fulfillmentMode,
                        createdAt: Date.now(),
                    }),
                    'local'
                );
            } catch {
                // Non-blocking storage snapshot
            }

            // Redirect to Stripe Hosted Checkout
            window.location.href = url;
        } catch (err: any) {
            if (err.message === 'out_of_stock') {
                setError('INVENTORY ALERT: An item in your cart was just sold. Click Auto-Fix Cart Availability below or adjust quantities in your Order Summary to continue.');
                syncInventory();
            } else {
                setError(err.message || 'Checkout connection failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="text-center space-y-2 mb-6">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Total Due Now (Incl. 4.712% HI GET)</p>
                <div className="text-4xl md:text-5xl font-header font-black text-white tracking-tighter shadow-cyan-glow">
                    ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-[10px] font-bold">
                        Apple Pay
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-[10px] font-bold">
                        Google Pay
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
                        US Visa • Mastercard • Amex • Discover
                    </span>
                </div>
            </div>

            {hasInventoryConflict && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs space-y-2.5 text-center">
                    <p className="font-bold">
                        One or more items in your cart exceed live Waipahu warehouse stock.
                    </p>
                    <button
                        type="button"
                        onClick={handleAutoFix}
                        className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-header font-black text-[11px] uppercase tracking-wider transition-all"
                    >
                        Auto-Fix Cart Availability
                    </button>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center">
                    {error}
                </div>
            )}

            <button
                onClick={handleCheckout}
                disabled={loading || hasInventoryConflict}
                className="w-full py-5 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-header font-black uppercase tracking-[0.18em] text-sm rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <span>Pay Now • Apple Pay / Google Pay / Card</span>
                            <Lock className="size-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] font-mono tracking-wider text-emerald-950 font-bold">
                            US-Issued Cards Only (50 US States)
                        </span>
                    </>
                )}
            </button>

            <div className="flex flex-col items-center justify-center gap-1.5 text-slate-400 mt-3">
                <div className="flex items-center gap-2 text-slate-500">
                    <Lock className="size-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold text-center">
                        US-Issued Cards Only (50 US States) • 256-Bit Stripe SSL
                    </span>
                </div>
                <span className="text-[10px] text-slate-500 text-center">
                    International &amp; US-territory issued cards are not accepted. Billing &amp; shipping address required in US.
                </span>
            </div>
        </div>
    );
}
