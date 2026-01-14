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

    const buttonClass = theme === 'night'
        ? "bg-primary text-background-dark hover:bg-accent hover:text-white"
        : "bg-slate-900 text-white hover:bg-black";

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={`w-full py-4 rounded font-bold tracking-widest transition-all uppercase font-header flex items-center justify-center gap-2 ${buttonClass}`}
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

export default function CheckoutWrapper({ totalAmount, items }: { totalAmount: number, items: CartItem[] }) {
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

    // Fetch PaymentIntent on mount
    useEffect(() => {
        // Map frontend items to API expected schema
        // Frontend CartContext (CartDrawer.tsx) uses: id (which is product_id usually?), quantity.
        // Let's assume item.id is the product ID based on CartContext usage.
        const payloadItems = items.map(item => ({
            product_id: item.id,
            category: "mixed", // dummy
            name: item.name,
            quantity: item.quantity
        }));

        // Generate or retrieve Idempotency Key (Scoped to this session/cart total)
        // Ideally, this should persist if the user refreshes but wants the SAME transaction.
        // For now, a new key per checkout mount is acceptable as retry logic usually happens within the same component lifecycle.
        // If we wanted robust persistence, we'd store in localStorage keyed by cart hash.
        const idempotencyKey = crypto.randomUUID();

        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/payments/create-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify({
                items: payloadItems,
                client_total_cents: Math.round(totalAmount * 100)
            }),
        })
        .then((res) => {
            if (!res.ok) throw new Error("Payment init failed");
            return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch(err => console.error("Init Error:", err));
    }, [totalAmount, items]);

    const options = {
        clientSecret,
        appearance: {
            theme: theme,
            variables: {
                colorPrimary: '#00AEEF',
                colorBackground: theme === 'night' ? '#0b1120' : '#ffffff',
                colorText: theme === 'night' ? '#ffffff' : '#1e293b',
                colorDanger: '#df1b41',
                fontFamily: 'Inter, system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '4px',
            },
        },
    };

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
