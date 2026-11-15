'use client';

import { useEffect } from 'react';

interface DeferredGoogleTagsProps {
    gtmId: string;
    gaIds: string[];
}

let tagsInjected = false;

function injectScript(src: string) {
    if (typeof document === 'undefined') return;
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
}

/**
 * DeferredGoogleTags:
 * Preserves 100% GA4 + Google Tag + GTM attribution via the synchronous `<head>`
 * `window.dataLayer` / `window.gtag` command queue while deferring ~712 KiB of
 * third-party script downloads off the critical mobile FCP/LCP/TBT path.
 * - Loads immediately on `/checkout` so post-Stripe redirect `purchase` events dispatch at t=0.
 * - Loads immediately on first human interaction (touch, scroll, pointer, key, click).
 * - Falls back to post-load idle injection for passive non-scrolling sessions.
 */
export function DeferredGoogleTags({ gtmId, gaIds }: DeferredGoogleTagsProps) {
    useEffect(() => {
        if (typeof window === 'undefined' || tagsInjected) return;

        const loadAllTags = () => {
            if (tagsInjected) return;
            tagsInjected = true;
            cleanupListeners();

            const w = window as any;
            w.dataLayer = w.dataLayer || [];
            w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

            if (gtmId) {
                injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
            }
            for (const id of gaIds) {
                if (id) {
                    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
                }
            }
        };

        const interactionEvents: Array<keyof WindowEventMap> = [
            'pointerdown',
            'touchstart',
            'scroll',
            'keydown',
            'click',
        ];

        const cleanupListeners = () => {
            for (const evt of interactionEvents) {
                window.removeEventListener(evt, loadAllTags);
            }
        };

        // Immediate dispatch on checkout / post-payment routes
        if (window.location.pathname.startsWith('/checkout')) {
            loadAllTags();
            return;
        }

        for (const evt of interactionEvents) {
            window.addEventListener(evt, loadAllTags, { once: true, passive: true });
        }

        let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
        const scheduleFallback = () => {
            fallbackTimer = setTimeout(() => {
                if ('requestIdleCallback' in window) {
                    (window as any).requestIdleCallback(loadAllTags, { timeout: 2000 });
                } else {
                    loadAllTags();
                }
            }, 5500);
        };

        if (document.readyState === 'complete') {
            scheduleFallback();
        } else {
            window.addEventListener('load', scheduleFallback, { once: true });
        }

        return () => {
            cleanupListeners();
            window.removeEventListener('load', scheduleFallback);
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };
    }, [gtmId, gaIds]);

    return null;
}
