import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Product } from '../../../types/inventory'; // Adjust path if necessary

export async function POST(req: Request) {
    try {
        const { items, customerEmail, fulfillmentMode } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        const line_items = items.map((item: Product & { quantity: number }) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: item.image_url && item.image_url.startsWith('http') ? [item.image_url] : undefined,
                    metadata: {
                        model_number: item.name.match(/\(([^)]+)\)/)?.[1] || 'N/A', // Extract model from name e.g. (LW6023IVSM)
                        btu: item.btu?.toString() || 'N/A',
                        category: item.category,
                    },
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        }));

        // ADD DELIVERY FEE IF SELECTED
        if (fulfillmentMode === 'delivery') {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Oahu Island-Wide Delivery',
                        description: 'Flat rate delivery to residential zones (excluding North Shore/Waianae/Waikiki/Waimanalo)',
                        images: ['https://staging.affordablehome-ac.com/delivery-icon.png'], // Optional icon
                    },
                    unit_amount: 5000, // $50.00
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            automatic_payment_methods: { enabled: true },
            line_items,
            customer_email: customerEmail, // Pre-fill email in Stripe
            // FORCE USD ONLY - Disable Dynamic Currency Conversion
            payment_method_options: {
                card: {
                    request_three_d_secure: 'automatic',
                },
            },
            success_url: `${req.headers.get('origin')}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/shop?canceled=true`,
            shipping_address_collection: {
                allowed_countries: ['US'], // Restrict to US (Hawaii focus)
            },
            custom_text: {
                shipping_address: {
                    message: 'FULFILLMENT NOTICE: Unit pricing reflects Local Pickup at our Waipahu Distribution Center (94-150 Leoleo St. #203). WARNING: Our facility is an active distribution hub; unscheduled arrivals cannot be accommodated. A coordinator will contact you within 24 business hours to schedule a specific window. Optional Island-Wide Delivery is available for a flat $50.00 fee to most residential zones (excluding North Shore, Waianae, Waikiki, and Waimanalo).'
                },
                submit: {
                    message: 'By confirming, you agree to the All Sales Final policy.'
                }
            },
            metadata: {
                source: 'web_checkout',
                fulfillment_mode: fulfillmentMode,
            },
            billing_address_collection: 'required',
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
