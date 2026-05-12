import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Product } from '@/types/inventory'; // Adjusted to use alias

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        console.log('--- CHECKOUT SESSION START ---');
        console.log('Headers:', Object.fromEntries(req.headers));
        const { items, customerEmail, fulfillmentMode, gaClientId, gaSessionId } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        // 1. HARD GUARDRAIL: Real-Time Inventory Validation
        const apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
        const payload = {
            items: items.map((item: any) => ({
                product_id: item.id,
                requested_quantity: item.quantity
            }))
        };

        const validateRes = await fetch(`${apiUrl}/api/v1/products/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!validateRes.ok) {
            return NextResponse.json({ error: 'Failed to validate inventory' }, { status: 500 });
        }

        const validationData = await validateRes.json();
        
        if (!validationData.valid) {
            return NextResponse.json({ error: 'out_of_stock' }, { status: 409 });
        }

        // Use Canonical Pricing from validation response
        const line_items = items.map((clientItem: Product & { quantity: number }) => {
            const canonicalItem = validationData.results.find((r: any) => r.product_id === clientItem.id);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: canonicalItem.name, // Use backend name
                        images: clientItem.image_url && clientItem.image_url.startsWith('http') ? [clientItem.image_url] : undefined,
                        metadata: {
                            product_id: canonicalItem.product_id.toString(), // CRITICAL FOR WEBHOOK IDEMPOTENCY
                            model_number: canonicalItem.name.match(/\(([^)]+)\)/)?.[1] || 'N/A', 
                            category: clientItem.category,
                        },
                    },
                    unit_amount: Math.round(canonicalItem.price * 100), // CANONICAL PRICE
                },
                quantity: clientItem.quantity,
            };
        });

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

        // CALCULATE HAWAII STATE TAX (4.712%)
        // Sum current line items (Products + Delivery)
        const subtotalCents = line_items.reduce((acc: number, item: any) => acc + (item.price_data.unit_amount * item.quantity), 0);
        const taxAmountCents = Math.round(subtotalCents * 0.04712);

        if (taxAmountCents > 0) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Hawaii State Tax (4.712%)',
                        description: 'General Excise Tax (GET)',
                    },
                    unit_amount: taxAmountCents,
                },
                quantity: 1,
            });
        }

        // Determine origin with fallbacks
        const envUrl = process.env.NEXT_PUBLIC_URL;
        const headerOrigin = req.headers.get('origin');
        const defaultOrigin = 'https://staging.affordablehome-ac.com';

        const origin = envUrl || headerOrigin || defaultOrigin;

        console.log('Origin Resolution:', { envUrl, headerOrigin, defaultOrigin, finalOrigin: origin });

        const expiresAt = Math.floor(Date.now() / 1000) + (30 * 60); // 30 minutes lock

        const session = await stripe.checkout.sessions.create({

            mode: 'payment',
            payment_method_types: ['card'], // Strict Card Only
            line_items,
            expires_at: expiresAt,

            // FORCE USD ONLY - Disable Dynamic Currency Conversion
            payment_method_options: {
                card: {
                    request_three_d_secure: 'automatic',
                },
            },
            ...(customerEmail && { customer_email: customerEmail }), // Only pre-fill if provided
            // CRITICAL: Pass metadata to PaymentIntent for Backend Webhook (Email Native)
            payment_intent_data: {
                metadata: {
                    fulfillment_mode: fulfillmentMode,
                    customer_email: customerEmail,
                    source: 'web_checkout_v2',
                    ...(gaClientId && { ga_client_id: gaClientId }),
                    ...(gaSessionId && { ga_session_id: gaSessionId }),
                }
            },
            success_url: `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/shop?canceled=true`,
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
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                source: 'web_checkout',
                fulfillment_mode: fulfillmentMode,
                ...(gaClientId && { ga_client_id: gaClientId }),
                ...(gaSessionId && { ga_session_id: gaSessionId }),
            },
            billing_address_collection: 'required',
        });

        console.log('Session Created:', { id: session.id, url: session.url, success_url: session.success_url });
        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
