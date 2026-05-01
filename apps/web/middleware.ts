import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1-to-1 Mapping of legacy WooCommerce product IDs to Next.js product slugs
// This preserves specific PageRank for exact models rather than soft 404ing to /shop
const LEGACY_ID_TO_SLUG: Record<string, string> = {
    '2853': '4-lg-dual-inverter-12000-btu-lw1222ivsm', // 12000 BTU
    '3700': '2-lg-dual-inverter-8000-btu-lw8022ivsm', // 8000 BTU
    '2909': '7-lg-dual-inverter-24000-btu-lw2422ivsm', // Approx 23000/24000 BTU
    '3512': '3-lg-dual-inverter-10000-btu-lw1022ivsm', // Approx 10000
    '2463': '1-lg-dual-inverter-6000-btu-lw6023ivsm', // Approx 6000
    '2923': '5-lg-dual-inverter-14000-btu-lw1522ivsm', // Approx 14000
    '2427': '6-lg-dual-inverter-18000-btu-lw1822ivsm', // Approx 18000
    '2924': '7-lg-dual-inverter-24000-btu-lw2422ivsm', // Approx 23500/24000
};

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    
    // 1. Legacy Route Interception
    if (url.pathname.startsWith('/product/') || 
        url.pathname.startsWith('/product-category/') || 
        url.pathname.startsWith('/product-tag/')) {
        
        let destinationPath = '/shop'; // Safe Fallback
        
        // 2a. Category Fallback Mapping (Preserve Category-Level PageRank)
        const pathLower = url.pathname.toLowerCase();
        if (pathLower.includes('dual-inverter') || pathLower.includes('/lg/dual-inverter')) {
            destinationPath = '/shop#dual_inverter';
        } else if (pathLower.includes('universal-fit')) {
            destinationPath = '/shop#universal_fit';
        } else if (pathLower.includes('/ge/')) {
            destinationPath = '/shop#ge';
        } else if (pathLower.includes('casement')) {
            destinationPath = '/shop#casement';
        } else if (pathLower.includes('/lg/') || pathLower.includes('/window/')) {
            destinationPath = '/shop#dual_inverter';
        }
        
        // 2b. Prevent Soft-404: Resolve specific product mapping
        const legacyId = url.searchParams.get('add-to-cart');
        if (legacyId && LEGACY_ID_TO_SLUG[legacyId]) {
            destinationPath = `/shop/${LEGACY_ID_TO_SLUG[legacyId]}`;
        }
        
        // 3. Prevent Telemetry Bleed: Selective Parameter Deletion
        // Do NOT wipe url.search. Only remove known WooCommerce parameters.
        // This preserves ?utm_source, ?gclid, ?fbclid, etc. for analytics attribution.
        const bloatParams = [
            'add-to-cart', 'product_orderby', 'product_view', 
            'product_order', 'product_count', 'paged', 
            'min_price', 'max_price'
        ];
        
        bloatParams.forEach(param => {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
            }
        });

        // 4. Execute 301 Permanent Redirect
        url.pathname = destinationPath;
        return NextResponse.redirect(url, 301);
    }

    const response = NextResponse.next();

    // 5. X-Robots-Tag: noindex for Internal/Secure Routes
    const noIndexPaths = ['/admin', '/checkout', '/maintenance'];
    const isNoIndex = noIndexPaths.some(path => url.pathname.startsWith(path));

    if (isNoIndex) {
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (static files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
