'use client';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { stripePromise } from '../lib/stripe';
import { CartItem } from '../types';

interface CheckoutFormProps {
    clientSecret: string;
    totalAmount: number;
}

function CheckoutFormContent({ totalAmount, theme }: { totalAmount: number, theme: 'night' | 'stripe' }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/shop`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const buttonClass = "bg-cyan-500 text-black hover:bg-cyan-400";

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={`w-full py-4 rounded-xl font-header font-black tracking-widest transition-all uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-[0.98] ${buttonClass}`}
            >
                <span id="button-text">
                    {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : `Pay $${totalAmount.toFixed(2)}`}
                </span>
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm font-bold">{message}</div>}
        </form>
    );
}


// Define minimal CartItem interface for props if not imported
// Removed in favor of shared type

export default function CheckoutWrapper({ totalAmount, items, customerEmail, onSuccess }: { totalAmount: number, items: CartItem[], customerEmail?: string, onSuccess?: () => void }) {
    const [clientSecret, setClientSecret] = useState("");
    const [theme, setTheme] = useState<'night' | 'stripe'>('night');

    // Detect OS Theme Preference
    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            setTheme(e.matches ? 'night' : 'stripe');
        };

        // Initial check
        updateTheme(darkModeQuery);

        // Listener
        darkModeQuery.addEventListener('change', updateTheme);
        return () => darkModeQuery.removeEventListener('change', updateTheme);
    }, []);

    const [error, setError] = useState<string | null>(null);

    // Fetch PaymentIntent on mount
    useEffect(() => {
        // Map frontend items to API expected schema
        const payloadItems = items.map(item => ({
            product_id: item.id,
            category: "mixed", // dummy
            name: item.name,
            quantity: item.quantity
        }));

        const idempotencyKey = crypto.randomUUID();

        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/payments/create-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify({
                items: payloadItems,
                client_total_cents: Math.round(totalAmount * 100),
                customer_email: customerEmail // [NEW]
            }),
        })
        .then((res) => {
            if (!res.ok) return res.json().then(json => { throw new Error(json.detail || "Payment Init Failed") });
            return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch(err => {
            console.error("Init Error:", err);
            setError(err.message);
        });
    }, [totalAmount, items, customerEmail]);

    const options = {
        clientSecret,
        appearance: {
            theme: 'night',
            variables: {
                colorPrimary: '#06b6d4', // Cyan-500
                colorBackground: '#0f172a', // Slate-900
                colorText: '#f1f5f9', // Slate-100
                colorDanger: '#ef4444', // Red-500
                fontFamily: 'Oswald, sans-serif', // Header font
                spacingUnit: '4px',
                borderRadius: '8px',
                iconColor: '#22d3ee', // Cyan-400
            },
            rules: {
                '.Input': {
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: '#1e293b', // Slate-800
                },
                '.Input:focus': {
                    border: '1px solid #06b6d4',
                    boxShadow: '0 0 0 2px rgba(6,182,212,0.2)',
                },
                '.Label': {
                    color: '#94a3b8', // Slate-400
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                }
            }
        },
    };

    if (error) {
         return (
             <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <span className="material-symbols-outlined text-red-500 text-4xl">error</span>
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest">Connection Error</h3>
                    <p className="text-slate-400 text-xs mt-1">{error}</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => window.location.reload()} className="text-cyan-400 text-xs uppercase font-bold hover:underline">Retry Connection</button>
                </div>
            </div>
        );
    }

    if (!clientSecret) {
        return (
             <div className="flex justify-center p-8">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
        );
    }

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutFormContent totalAmount={totalAmount} theme={theme} />
        </Elements>
    );
}
