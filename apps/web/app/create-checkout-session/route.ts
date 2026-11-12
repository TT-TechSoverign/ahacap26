import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { getProductImages } from '@/lib/product-images';

export const dynamic = 'force-dynamic';

const ALLOWED_CHECKOUT_ORIGINS = new Set([
    'https://www.affordablehome-ac.com',
    'https://affordablehome-ac.com',
    'https://staging.affordablehome-ac.com',
    'http://localhost:3000',
    'http://localhost:3001',
]);

const CHECKOUT_RATE_WINDOW_MS = 5 * 60 * 1000;
const CHECKOUT_RATE_LIMIT = 20;
const checkoutRateBuckets = new Map<string, { count: number; resetAt: number }>();

function checkCheckoutRateLimit(req: Request): boolean {
    const rawIp =
        req.headers.get('x-real-ip') ||
        req.headers.get('x-forwarded-for')?.split(',')[0] ||
        'unknown';
    const ip = rawIp.trim().slice(0, 64) || 'unknown';
    const now = Date.now();

    if (checkoutRateBuckets.size > 5000) {
        checkoutRateBuckets.forEach((bucket, key) => {
            if (bucket.resetAt <= now) checkoutRateBuckets.delete(key);
        });
    }

    const current = checkoutRateBuckets.get(ip);
    if (!current || current.resetAt <= now) {
        checkoutRateBuckets.set(ip, { count: 1, resetAt: now + CHECKOUT_RATE_WINDOW_MS });
        return true;
    }
    if (current.count >= CHECKOUT_RATE_LIMIT) {
        return false;
    }
    current.count += 1;
    return true;
}

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

function sanitizeMetaField(val: unknown, maxLen = 120): string | undefined {
    if (typeof val !== 'string') return undefined;
    const cleaned = val.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLen);
    return cleaned || undefined;
}

export async function POST(req: Request) {
    try {
        if (!checkCheckoutRateLimit(req)) {
            return NextResponse.json(
                { error: 'Too many checkout attempts. Please wait a few minutes or call (808) 488-1111.' },
                { status: 429 }
            );
        }

        const body = await req.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid checkout request' }, { status: 400 });
        }

        const {
            items,
            customerEmail,
            fulfillmentMode,
            gaClientId,
            gaSessionId,
            utmSource,
            utmMedium,
            utmCampaign,
        } = body as Record<string, unknown>;

        if (!Array.isArray(items) || items.length === 0 || items.length > 25) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        // Aggregate duplicate product IDs and enforce strict integer bounds (1..20)
        const aggregatedById = new Map<number, { id: number; quantity: number; category?: string }>();
        for (const rawItem of items) {
            const productId = Number((rawItem as any)?.id);
            const qty = Number((rawItem as any)?.quantity);
            if (!Number.isInteger(productId) || productId < 1 || !Number.isInteger(qty) || qty < 1 || qty > 20) {
                return NextResponse.json({ error: 'Invalid item quantity or product ID' }, { status: 400 });
            }
            const existing = aggregatedById.get(productId);
            const nextQty = (existing?.quantity || 0) + qty;
            if (nextQty > 20) {
                return NextResponse.json({ error: 'Maximum quantity per model exceeded' }, { status: 400 });
            }
            const safeCategory = sanitizeMetaField((rawItem as any)?.category, 40);
            aggregatedById.set(productId, {
                id: productId,
                quantity: nextQty,
                category: existing?.category || safeCategory,
            });
        }

        const normalizedItems = Array.from(aggregatedById.values());
        const safeFulfillment: 'delivery' | 'pickup' =
            String(fulfillmentMode || '').toLowerCase().trim() === 'delivery' ? 'delivery' : 'pickup';

        const trimmedEmail = typeof customerEmail === 'string' ? customerEmail.trim() : '';
        const safeCustomerEmail =
            trimmedEmail.length <= 254 &&
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/.test(trimmedEmail)
                ? trimmedEmail
                : undefined;

        const safeGaClientId = sanitizeMetaField(gaClientId, 120);
        const safeGaSessionId = sanitizeMetaField(gaSessionId, 120);
        const safeUtmSource = sanitizeMetaField(utmSource, 120);
        const safeUtmMedium = sanitizeMetaField(utmMedium, 120);
        const safeUtmCampaign = sanitizeMetaField(utmCampaign, 120);

        // 1. HARD GUARDRAIL: Real-Time Inventory Validation
        const apiUrl = (process.env.API_INTERNAL_URL || 'http://prod-api:8000').replace(/\/api\/v1\/?$/, '');
        const payload = {
            items: normalizedItems.map((item) => ({
                product_id: item.id,
                requested_quantity: item.quantity,
            })),
        };

        const validateRes = await fetch(`${apiUrl}/api/v1/products/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
        });

        if (!validateRes.ok) {
            return NextResponse.json({ error: 'Failed to validate inventory' }, { status: 500 });
        }

        const validationData = await validateRes.json();
        if (!validationData.valid) {
            return NextResponse.json({ error: 'out_of_stock' }, { status: 409 });
        }

        // 2. Canonical Pricing & Server-Resolved Product Images
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = normalizedItems.map((clientItem) => {
            const canonicalItem = validationData.results.find((r: any) => r.product_id === clientItem.id);
            if (!canonicalItem) {
                throw new Error(`Missing canonical validation result for product ${clientItem.id}`);
            }
            const mpn =
                PRODUCT_IDENTIFIERS[canonicalItem.product_id]?.mpn ||
                canonicalItem.name.match(/\(([^)]+)\)/)?.[1] ||
                'N/A';
            const displayName =
                mpn !== 'N/A' && !canonicalItem.name.includes(mpn)
                    ? `${canonicalItem.name} (${mpn})`
                    : canonicalItem.name;

            const serverImages = getProductImages(canonicalItem.product_id).map((img) =>
                img.replace(/\.svg$/i, '.webp')
            );
            const primaryImg = serverImages[0];
            const resolvedImg = primaryImg
                ? primaryImg.startsWith('http')
                    ? primaryImg
                    : `https://www.affordablehome-ac.com${primaryImg}`
                : undefined;

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: displayName,
                        images: resolvedImg ? [resolvedImg] : undefined,
                        metadata: {
                            product_id: canonicalItem.product_id.toString(),
                            model_number: mpn,
                            category: clientItem.category || 'WINDOW_AC',
                        },
                    },
                    unit_amount: Math.round(Number(canonicalItem.price) * 100),
                },
                quantity: clientItem.quantity,
            };
        });

        // 3. ADD DELIVERY FEE IF SELECTED
        if (safeFulfillment === 'delivery') {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Oahu Island-Wide Delivery',
                        description:
                            'Flat rate delivery to residential zones (excluding North Shore/Waianae/Waikiki/Waimanalo)',
                    },
                    unit_amount: 5000, // $50.00
                },
                quantity: 1,
            });
        }

        // 4. CALCULATE HAWAII STATE TAX (4.712%)
        const subtotalCents = line_items.reduce(
            (acc, item) => acc + (item.price_data?.unit_amount ?? 0) * (item.quantity ?? 1),
            0
        );
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

        // 5. Strict origin allowlist resolution (prevents open redirect / session_id leak)
        const origin = resolveTrustedOrigin(req.headers.get('origin'));
        const expiresAt = Math.floor(Date.now() / 1000) + 30 * 60; // 30 minutes lock

        const sharedTrackingMeta: Record<string, string> = {
            ...(safeGaClientId ? { ga_client_id: safeGaClientId } : {}),
            ...(safeGaSessionId ? { ga_session_id: safeGaSessionId } : {}),
            ...(safeUtmSource ? { utm_source: safeUtmSource } : {}),
            ...(safeUtmMedium ? { utm_medium: safeUtmMedium } : {}),
            ...(safeUtmCampaign ? { utm_campaign: safeUtmCampaign } : {}),
        };

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items,
            expires_at: expiresAt,
            payment_method_options: {
                card: {
                    request_three_d_secure: 'automatic',
                },
            },
            ...(safeCustomerEmail && { customer_email: safeCustomerEmail }),
            payment_intent_data: {
                metadata: {
                    fulfillment_mode: safeFulfillment,
                    ...(safeCustomerEmail && { customer_email: safeCustomerEmail }),
                    source: 'web_checkout_v2',
                    ...sharedTrackingMeta,
                },
            },
            success_url: `${origin}/checkout?success=true&fulfillment=${encodeURIComponent(safeFulfillment)}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/shop?canceled=true`,
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            custom_text: {
                shipping_address: {
                    message:
                        safeFulfillment === 'delivery'
                            ? 'OAHU ISLAND-WIDE DELIVERY ($50.00 INCLUDED): Enter your Oahu residential delivery street address above (excludes North Shore, Waianae, Waikiki & Waimanalo). Our Waipahu dispatch coordinator will call you within 24 business hours to confirm your delivery window.'
                            : 'FREE WAIPAHU WAREHOUSE PICKUP (94-150 Leoleo St. #203, Waipahu, HI 96797): Enter your contact/billing address above. Because our Waipahu hub is an active loading bay, our coordinator will call you within 24 business hours to schedule your 5-minute pre-staged pickup window.',
                },
                submit: {
                    message:
                        'US-Issued Cards Only (50 US States). International & territory cards are not accepted. Backed by 1-Year Manufacturer Warranty • All Sales Final.',
                },
            },
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                source: 'web_checkout',
                fulfillment_mode: safeFulfillment,
                ...sharedTrackingMeta,
            },
            billing_address_collection: 'required',
        });

        console.log('Checkout Session Created:', { id: session.id, fulfillment: safeFulfillment });
        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err?.message || 'Unknown error');
        return NextResponse.json(
            { error: 'Unable to initialize checkout session. Please try again or call (808) 488-1111.' },
            { status: 500 }
        );
    }
}
