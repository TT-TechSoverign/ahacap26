'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CheckoutFormProps {
    totalAmount: number;
    items: any[];
    customerEmail: string;
    onSuccess: () => void;
}

export default function CheckoutForm({ totalAmount, items, customerEmail, onSuccess }: CheckoutFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const { url, error: apiError } = await response.json();

            if (apiError) throw new Error(apiError);
            if (!url) throw new Error('Checkout URL missing');

            // Redirect to Stripe Hosted Checkout
            window.location.href = url;
        } catch (err: any) {
            setError(err.message || 'Checkout connection failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2 mb-8">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Total Due Now</p>
                <div className="text-5xl font-header font-black text-white tracking-tighter shadow-cyan-glow">
                    ${totalAmount.toLocaleString()}
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
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                    <>
                        <span>Confirm & Pay</span>
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">lock_person</span>
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-600 mt-4">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="text-[10px] font-mono uppercase tracking-widest">Processed securely by Stripe</span>
            </div>
        </div>
    );
}
