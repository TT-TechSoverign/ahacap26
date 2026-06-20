'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Loader2, Lock } from 'lucide-react';

interface CheckoutFormProps {
    totalAmount: number;
    items: any[];
    customerEmail?: string;
    fulfillmentMode: 'pickup' | 'delivery';
    onSuccess: () => void;
}

export default function CheckoutForm({ totalAmount, items, customerEmail, fulfillmentMode, onSuccess }: CheckoutFormProps) {
    const { syncInventory } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            // Extract GA4 cookies for server-side telemetry stitching
            const getCookie = (name: string) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop()?.split(';').shift();
                return null;
            };

            const getGaSessionCookie = () => {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.startsWith('_ga_')) {
                        return cookie.split('=')[1];
                    }
                }
                return null;
            };

            const gaClientId = getCookie('_ga');
            const gaSessionId = getGaSessionCookie();

            const utmSource = sessionStorage.getItem('utm_source');
            const utmMedium = sessionStorage.getItem('utm_medium');
            const utmCampaign = sessionStorage.getItem('utm_campaign');

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

            // Redirect to Stripe Hosted Checkout
            window.location.href = url;
        } catch (err: any) {
            if (err.message === 'out_of_stock') {
                setError('INVENTORY ALERT: An item in your cart was just sold to another customer. Please close this checkout drawer to review the updated availability.');
                // Trigger a sync so the parent drawer UI immediately reflects the dead stock
                syncInventory();
            } else {
                setError(err.message || 'Checkout connection failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2 mb-8">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Total Due Now</p>
                <div className="text-5xl font-header font-black text-white tracking-tighter shadow-cyan-glow">
                    ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-slate-500 font-mono uppercase">
                    Secure 256-bit Encrypted Connection
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center">
                    {error}
                </div>
            )}

            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-header font-black uppercase tracking-[0.25em] text-sm rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                ) : (
                    <>
                        <span>Confirm & Pay</span>
                        <Lock className="size-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-600 mt-4">
                <Lock className="size-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Processed securely by Stripe</span>
            </div>
        </div>
    );
}
