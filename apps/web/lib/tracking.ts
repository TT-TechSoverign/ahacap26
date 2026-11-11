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

export function trackFunnelEvent(eventName: string, params: FunnelEventParams = {}): void {
    if (typeof window === 'undefined') return;

    try {
        const timestamp = Date.now();
        const payload = {
            event: eventName,
            ...params,
            timestamp,
            page_path: window.location.pathname,
            page_title: document.title,
        };

        // 1. Google Tag Manager (GTM dataLayer)
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(payload);

        // 2. Google Analytics 4 (gtag)
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', eventName, params);
        }

        // 3. Dev OS Live Telemetry Stream (fire-and-forget beacon)
        const eventData = JSON.stringify({
            event_name: eventName,
            payload: params,
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
