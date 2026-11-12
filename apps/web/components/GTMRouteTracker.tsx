'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { trackFunnelEvent } from '@/lib/tracking';

function RouteTrackerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
                const search = searchParams?.toString();
                const pagePath = pathname + (search ? `?${search}` : '');

                (window as any).dataLayer.push({
                    event: 'page_view',
                    page_path: pagePath,
                    page_title: document.title,
                });

                if (typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'page_view', {
                        page_path: pagePath,
                        page_title: document.title,
                    });
                }
            }
        } catch (e) {
            // Silently swallow tracking exceptions on strict privacy browsers
        }
    }, [pathname, searchParams]);

    // Universal delegated click_to_call attribution across all 108 canonical routes
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const handleDocumentClick = (e: MouseEvent) => {
            try {
                const target = e.target as HTMLElement | null;
                const anchor = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
                if (!anchor) return;

                const rawHref = anchor.getAttribute('href') || '';
                const phoneNumber = rawHref.replace(/^tel:/i, '').trim();
                const linkText = (anchor.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 64);
                const inNav = Boolean(anchor.closest('header, nav'));
                const inFooter = Boolean(anchor.closest('footer'));
                const ctaLocation = inNav ? 'header_nav' : inFooter ? 'footer' : 'page_body';

                trackFunnelEvent('click_to_call', {
                    category: 'Phone Conversion',
                    phone_number: phoneNumber || '808-488-1111',
                    cta_location: ctaLocation,
                    label: linkText || 'Phone Link',
                });
            } catch {
                // Never block native tel: navigation
            }
        };

        document.addEventListener('click', handleDocumentClick, { passive: true });
        return () => document.removeEventListener('click', handleDocumentClick);
    }, []);

    return null;
}

export function GTMRouteTracker() {
    return (
        <Suspense fallback={null}>
            <RouteTrackerContent />
        </Suspense>
    );
}
