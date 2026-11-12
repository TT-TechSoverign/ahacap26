import { PRODUCT_IDENTIFIERS } from './product-identifiers';

/**
 * Telemetry and Funnel Analytics tracking for AHAC.
 * Pushes events to Google Tag Manager (dataLayer), GA4 (gtag),
 * Google Tag (GT-PLTZM3FV), and dispatches beacon events to the Dev OS analytics stream.
 */

export interface FunnelEventParams {
    category?: string;
    action?: string;
    label?: string;
    value?: number;
    units?: number;
    tier?: string;
    brand?: string;
    step?: number | string;
    btu_range?: string;
    severity?: string;
    [key: string]: any;
}

export interface Ga4EcommerceItem {
    item_id: string;
    item_name: string;
    item_brand: string;
    item_variant?: string;
    item_category: string;
    price: number;
    quantity: number;
    index?: number;
}

export interface Ga4SessionIdentifiers {
    gaClientId: string | null;
    gaSessionId: string | null;
}

/**
 * Extracts normalized GA4 Measurement Protocol identifiers from browser cookies:
 * - `_ga`: strips `GA1.x.` prefix -> `"123456789.1700000000"`
 * - `_ga_*`: extracts numeric `session_id` from `GS1.1.<sid>....` or `GS2.1.s<sid>$...`
 */
export function extractGa4SessionIdentifiers(): Ga4SessionIdentifiers {
    if (typeof document === 'undefined') {
        return { gaClientId: null, gaSessionId: null };
    }
    try {
        const cookieStr = `; ${document.cookie}`;
        const gaParts = cookieStr.split('; _ga=');
        const rawGa = gaParts.length === 2 ? gaParts.pop()?.split(';').shift() || null : null;
        let gaClientId: string | null = rawGa;
        if (rawGa) {
            const segments = rawGa.split('.');
            if (segments.length >= 4 && segments[0].startsWith('GA')) {
                gaClientId = segments.slice(-2).join('.');
            }
        }

        let gaSessionId: string | null = null;
        const cookies = document.cookie.split(';');
        for (const rawCookie of cookies) {
            const trimmed = rawCookie.trim();
            if (trimmed.startsWith('_ga_')) {
                const rawVal = trimmed.split('=').slice(1).join('=');
                if (rawVal.startsWith('GS2.')) {
                    const sMatch = rawVal.match(/(?:^|\.)s(\d+)(?:\$|\.)/);
                    gaSessionId = sMatch ? sMatch[1] : rawVal;
                } else if (rawVal.startsWith('GS1.')) {
                    const parts = rawVal.split('.');
                    gaSessionId = parts.length >= 3 ? parts[2] : rawVal;
                } else {
                    gaSessionId = rawVal || null;
                }
                break;
            }
        }

        return { gaClientId, gaSessionId };
    } catch {
        return { gaClientId: null, gaSessionId: null };
    }
}

export function buildGa4EcommerceItem(
    product: { id: number | string; name: string; price: number; promo_price?: number | null; subcategory?: string | null },
    quantity = 1,
    index?: number,
    activePriceOverride?: number
): Ga4EcommerceItem {
    const numId = Number(product.id);
    const ident = PRODUCT_IDENTIFIERS[numId];
    const brand = ident?.brand || (product.name?.startsWith('GE') ? 'GE Appliances' : 'LG');
    const variant = ident?.mpn || undefined;
    const price = typeof activePriceOverride === 'number' ? activePriceOverride : Number(product.price || 0);
    const category = numId === 16 ? 'Air Conditioner Wall Sleeves' : 'Window Air Conditioners';

    return {
        item_id: String(product.id),
        item_name: product.name,
        item_brand: brand,
        ...(variant ? { item_variant: variant } : {}),
        item_category: category,
        price,
        quantity,
        ...(typeof index === 'number' ? { index } : {}),
    };
}

export function trackEcommerceEvent(
    eventName:
        | 'view_item_list'
        | 'select_item'
        | 'view_item'
        | 'add_to_cart'
        | 'remove_from_cart'
        | 'view_cart'
        | 'begin_checkout'
        | 'add_shipping_info'
        | 'purchase',
    ecommercePayload: {
        currency?: string;
        value?: number;
        transaction_id?: string;
        tax?: number;
        shipping?: number;
        shipping_tier?: string;
        item_list_id?: string;
        item_list_name?: string;
        items: Ga4EcommerceItem[];
    }
): void {
    if (typeof window === 'undefined') return;

    try {
        const normalizedPayload = {
            currency: 'USD',
            ...ecommercePayload,
        };

        // 1. Official Google GTM GA4 Ecommerce reset + push
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ ecommerce: null });
        (window as any).dataLayer.push({
            event: eventName,
            ecommerce: normalizedPayload,
        });

        // 2. Direct GA4 (G-MYJZTZFXQV) & Google Tag (GT-PLTZM3FV) gtag dispatch
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', eventName, normalizedPayload);
        }

        // 3. Dev OS Live Telemetry Stream
        const eventData = JSON.stringify({
            event_name: eventName,
            payload: normalizedPayload,
            path: window.location.pathname,
            timestamp: new Date().toISOString(),
        });

        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/v1/dev-os/analytics/event', eventData);
        } else {
            fetch('/api/v1/dev-os/analytics/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: eventData,
                keepalive: true,
            }).catch(() => {});
        }
    } catch {
        // Never allow telemetry errors to disrupt customer checkout
    }
}

const GA_PII_KEYS = new Set([
    'full_name',
    'first_name',
    'last_name',
    'name',
    'phone',
    'email',
    'address',
]);

let lastClickToCallTs = 0;

function sanitizeAnalyticsParams(params: FunnelEventParams): FunnelEventParams {
    const clean: FunnelEventParams = {};
    for (const [k, v] of Object.entries(params)) {
        if (!GA_PII_KEYS.has(k.toLowerCase()) && v !== undefined) {
            clean[k] = v;
        }
    }
    return clean;
}

export function trackFunnelEvent(eventName: string, params: FunnelEventParams = {}): void {
    if (typeof window === 'undefined') return;

    try {
        const timestamp = Date.now();
        if (eventName === 'click_to_call') {
            if (timestamp - lastClickToCallTs < 400) {
                return;
            }
            lastClickToCallTs = timestamp;
        }

        const safeParams = sanitizeAnalyticsParams(params);
        const payload = {
            event: eventName,
            ...safeParams,
            timestamp,
            page_path: window.location.pathname,
            page_title: document.title,
        };

        // 1. Google Tag Manager (GTM dataLayer)
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(payload);

        // 2. Google Analytics 4 (gtag)
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', eventName, safeParams);
        }

        // 3. Dev OS Live Telemetry Stream (fire-and-forget beacon)
        const eventData = JSON.stringify({
            event_name: eventName,
            payload: safeParams,
            path: window.location.pathname,
            timestamp: new Date().toISOString(),
        });

        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/v1/dev-os/analytics/event', eventData);
        } else {
            fetch('/api/v1/dev-os/analytics/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: eventData,
                keepalive: true,
            }).catch(() => {
                // Non-blocking, silence failures in dev/offline
            });
        }

        if (process.env.NODE_ENV === 'development') {
            console.log(`[Telemetry] ${eventName}`, params);
        }
    } catch (err) {
        // Silently prevent any analytics failure from blocking user experience
    }
}
