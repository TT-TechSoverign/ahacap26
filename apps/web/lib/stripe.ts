import Stripe from 'stripe';

// Use a placeholder for build time if missing. Runtime MUST have the key.
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_build_placeholder';

export const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-12-15.clover', // Updated to match installed SDK types
    typescript: true,
});
