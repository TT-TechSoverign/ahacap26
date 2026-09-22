'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function RouteTrackerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
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
    }, [pathname, searchParams]);

    return null;
}

export function GTMRouteTracker() {
    return (
        <Suspense fallback={null}>
            <RouteTrackerContent />
        </Suspense>
    );
}
