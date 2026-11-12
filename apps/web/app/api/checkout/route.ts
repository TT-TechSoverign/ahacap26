import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { Product } from '@/types/inventory'; // Adjusted to use alias
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';

export const dynamic = 'force-dynamic';

const ALLOWED_CHECKOUT_ORIGINS = new Set([
    'https://www.affordablehome-ac.com',
    'https://affordablehome-ac.com',
    'https://staging.affordablehome-ac.com',
    'http://localhost:3000',
    'http://localhost:3001',
]);

function resolveTrustedOrigin(headerOrigin: string | null): string {
    const defaultOrigin = 'https://www.affordablehome-ac.com';
    const envUrl = (process.env.NEXT_PUBLIC_URL || '').trim().replace(/\/+$/, '');
    if (envUrl && ALLOWED_CHECKOUT_ORIGINS.has(envUrl)) {
        return envUrl;
    }
    const cleanHeader = (headerOrigin || '').trim().replace(/\/+$/, '');
    if (cleanHeader && ALLOWED_CHECKOUT_ORIGINS.has(cleanHeader)) {
        return cleanHeader;
    }
    return defaultOrigin;
}

export async function POST(req: Request) {
    try {
        const { items, customerEmail, fulfillmentMode } = await req.json();

        if (!Array.isArray(items) || items.length === 0 || items.length > 25) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        for (const it of items) {
            const qty = Number(it?.quantity);
            if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
                return NextResponse.json({ error: 'Invalid item quantity' }, { status: 400 });
            }
        }

        const safeFulfillment = fulfillmentMode === 'delivery' ? 'delivery' : 'pickup';
        const safeCustomerEmail =
            typeof customerEmail === 'string' &&
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/.test(customerEmail.trim())
                ? customerEmail.trim()
                : undefined;

        // 1. HARD GUARDRAIL: Real-Time Inventory Validation
        const apiUrl = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://prod-api:8000';
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
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((clientItem: Product & { quantity: number }) => {
            const canonicalItem = validationData.results.find((r: any) => r.product_id === clientItem.id);
            const mpn = PRODUCT_IDENTIFIERS[canonicalItem.product_id]?.mpn || canonicalItem.name.match(/\(([^)]+)\)/)?.[1] || 'N/A';
            const displayName = mpn !== 'N/A' && !canonicalItem.name.includes(mpn)
                ? `${canonicalItem.name} (${mpn})`
                : canonicalItem.name;
            const resolvedImg = clientItem.image_url
                ? (clientItem.image_url.startsWith('http') ? clientItem.image_url : `https://www.affordablehome-ac.com${clientItem.image_url}`)
                : undefined;
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: displayName, // Use backend name + canonical model code
                        images: resolvedImg ? [resolvedImg] : undefined,
                        metadata: {
                            product_id: canonicalItem.product_id.toString(), // CRITICAL FOR WEBHOOK IDEMPOTENCY
                            model_number: mpn, 
                            category: clientItem.category,
                        },
                    },
                    unit_amount: Math.round(canonicalItem.price * 100), // CANONICAL PRICE
                },
                quantity: clientItem.quantity,
            };
        });

        // ADD DELIVERY FEE IF SELECTED
        if (safeFulfillment === 'delivery') {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Oahu Island-Wide Delivery',
                        description: 'Flat rate delivery to residential zones (excluding North Shore/Waianae/Waikiki/Waimanalo)',
                    },
                    unit_amount: 5000, // $50.00
                },
                quantity: 1,
            });
        }

        // CALCULATE HAWAII STATE TAX (4.712%)
        // Sum current line items (Products + Delivery)
        const subtotalCents = line_items.reduce((acc: number, item) => acc + ((item.price_data?.unit_amount ?? 0) * (item.quantity ?? 1)), 0);
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

        // Strict origin allowlist resolution (prevents open redirect / session_id leak)
        const origin = resolveTrustedOrigin(req.headers.get('origin'));

        const expiresAt = Math.floor(Date.now() / 1000) + (30 * 60); // 30 minutes lock

        const session = await stripe.checkout.sessions.create({

            mode: 'payment',
            line_items,
            expires_at: expiresAt,

            // FORCE USD ONLY - Disable Dynamic Currency Conversion
            payment_method_options: {
                card: {
                    request_three_d_secure: 'automatic',
                },
            },
            ...(safeCustomerEmail && { customer_email: safeCustomerEmail }), // Only pre-fill if validated
            // CRITICAL: Pass metadata to PaymentIntent for Backend Webhook (Email Native)
            payment_intent_data: {
                metadata: {
                    fulfillment_mode: safeFulfillment,
                    customer_email: safeCustomerEmail || '',
                    source: 'web_checkout_v2'
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
                    message: 'US-Issued Cards Only (50 US States). International & territory cards are not accepted. By confirming, you agree to the All Sales Final policy.'
                }
            },
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                source: 'web_checkout',
                fulfillment_mode: safeFulfillment,
            },
            billing_address_collection: 'required',
        });

        console.log('Checkout Session Created:', { id: session.id });
        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err?.message || err);
        return NextResponse.json({ error: 'Unable to initialize checkout session. Please try again or call (808) 488-1111.' }, { status: 500 });
    }
}
