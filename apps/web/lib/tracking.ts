/**
 * Telemetry and Funnel Analytics tracking for AHAC.
 * Pushes events to Google Tag Manager (dataLayer), GA4 (gtag),
 * and dispatches beacon events to the Dev OS analytics stream.
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
