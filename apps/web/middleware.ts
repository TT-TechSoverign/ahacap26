import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1-to-1 Mapping of legacy WooCommerce product IDs to Next.js product slugs
// Guarantees direct high-intent conversion for legacy add-to-cart clicks
const LEGACY_ID_TO_SLUG: Record<string, string> = {
    // 6,000 BTU
    '2463': '1-lg-dual-inverter-6-000-btu-lw6023ivsm',
    '2436': '1-lg-dual-inverter-6-000-btu-lw6023ivsm',
    // 8,000 BTU
    '3700': '2-lg-dual-inverter-8-000-btu-lw8022ivsm',
    '2846': '2-lg-dual-inverter-8-000-btu-lw8022ivsm',
    '2454': '2-lg-dual-inverter-8-000-btu-lw8022ivsm',
    // 10,000 BTU
    '3512': '3-lg-dual-inverter-10-000-btu-lw1022ivsm',
    // 12,000 BTU
    '2853': '4-lg-dual-inverter-12-000-btu-lw1222ivsm',
    // 14,000 BTU
    '2923': '5-lg-dual-inverter-14-000-btu-lw1522fvsm',
    '2922': '5-lg-dual-inverter-14-000-btu-lw1522fvsm',
    // 18,000 BTU
    '2427': '6-lg-dual-inverter-18-000-btu-lw1822ivsm',
    // 23,500 BTU
    '2909': '7-lg-dual-inverter-23-500-btu-lw2422ivsm',
    '2924': '7-lg-dual-inverter-23-500-btu-lw2422ivsm',
    // Universal Fit / Warehouse
    '2900': 'oahu-window-ac-warehouse',
};

// Known WooCommerce tracking and faceted navigation parameters to aggressively prune from redirects
const WOOCOMMERCE_BLOAT_PARAMS = [
    'add-to-cart',
    'product_orderby',
    'product_view',
    'product_order',
    'product_count',
    'paged',
    'min_price',
    'max_price',
    'v',
];

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // 1. Decode percent-encodings safely
    let rawPath = url.pathname;
    try {
        rawPath = decodeURIComponent(url.pathname);
    } catch {
        // use raw pathname if malformed URI
    }

    // 2. Trailing slash normalization
    let cleanPath = rawPath;
    const hasTrailingSlash = cleanPath.length > 1 && cleanPath.endsWith('/');
    if (hasTrailingSlash) {
        cleanPath = cleanPath.slice(0, -1);
    }
    const pathLower = cleanPath.toLowerCase();

    // Helper: Build a clean 301 Permanent Redirect response with zero bloat params and zero hash fragments
    const makePermanentRedirect = (destPath: string) => {
        // Strip any accidental hash fragments from destination per RFC 7231 / RFC 3986
        const cleanDest = destPath.split('#')[0];

        // Safeguard against infinite redirect loop
        const hasBloat = WOOCOMMERCE_BLOAT_PARAMS.some(p => url.searchParams.has(p));
        if (cleanDest === rawPath || (cleanDest === cleanPath && !hasTrailingSlash && !hasBloat)) {
            return NextResponse.next();
        }

        const targetUrl = new URL(cleanDest, request.url);

        // Strip bloat query parameters
        WOOCOMMERCE_BLOAT_PARAMS.forEach(p => url.searchParams.delete(p));

        // Append surviving query parameters (e.g. ?gclid, ?utm_source, ?utm_campaign)
        url.searchParams.forEach((value, key) => {
            targetUrl.searchParams.set(key, value);
        });

        const res = NextResponse.redirect(targetUrl, 301);
        res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return res;
    };

    // 3. Exact Root / Index Normalization
    if (pathLower === '/index.html') {
        return makePermanentRedirect('/');
    }

    // 4. Outdated & Short Product Slug Redirects
    const SHORT_SLUG_REDIRECTS: Record<string, string> = {
        '/shop/1-lg-dual-inverter-6-000-btu': '/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm',
        '/shop/2-lg-dual-inverter-8-000-btu': '/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm',
        '/shop/3-lg-dual-inverter-10-000-btu': '/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm',
        '/shop/4-lg-dual-inverter-12-000-btu': '/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm',
        '/shop/5-lg-dual-inverter-14-000-btu': '/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm',
        '/shop/5-lg-dual-inverter-14-000-btu-lw1522ivsm': '/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm',
        '/shop/6-lg-dual-inverter-18-000-btu': '/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm',
        '/shop/9-lg-dual-inverter-18-000-btu-lw1822ivsm': '/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm',
        '/shop/7-lg-dual-inverter-23-500-btu': '/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm',
        '/shop/10-lg-dual-inverter-23-500-btu-lw2422ivsm': '/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm',
        '/shop/8-lg-7-600-btu': '/shop/8-lg-7-600-btu-lw8023hrsm',
        '/shop/8-lg-dual-inverter-cool-heat-8-000-btu-lw8023hrsm': '/shop/8-lg-7-600-btu-lw8023hrsm',
        '/shop/9-lg-18-000-btu': '/shop/9-lg-18-000-btu-lw1823hrsm',
        '/shop/10-lg-23-000-btu': '/shop/10-lg-23-000-btu-lw2423hrsm',
        '/shop/11-lg-8-000-btu': '/shop/11-lg-8-000-btu-lw8024rd',
        '/shop/11-lg-standard-8-000-btu-lw8024rd': '/shop/11-lg-8-000-btu-lw8024rd',
        '/shop/12-lg-12-000-btu': '/shop/12-lg-12-000-btu-lw1217ersm1',
        '/shop/13-ge-8-200-btu': '/shop/13-ge-8-200-btu-ajcq08awj',
        '/shop/14-ge-10-000-btu': '/shop/14-ge-10-000-btu-ajcq10awj',
        '/shop/15-ge-12-000-btu': '/shop/15-ge-12-000-btu-ajcq12axxwa',
        '/shop/15-ge-12-000-btu-ajcq12awj': '/shop/15-ge-12-000-btu-ajcq12axxwa',
    };
    if (SHORT_SLUG_REDIRECTS[pathLower]) {
        return makePermanentRedirect(SHORT_SLUG_REDIRECTS[pathLower]);
    }

    // Decommissioned & Consolidated Canonical Routes (301 Permanent Redirects)
    const CONSOLIDATED_REDIRECTS: Record<string, string> = {
        '/window-ac-deep-cleaning-chemical-overhaul': '/clean-vs-replace-window-ac',
        '/window_ac_maintenance': '/clean-vs-replace-window-ac',
        '/ac-maintenance-service-contract-oahu': '/seasonal-ac-maintenance-plans-oahu',
        '/hawaii-energy-ac-rebates-oahu': '/hawaii-energy-rebate',
        '/thru-the-wall-ac-replacement-oahu': '/shop/ge-built-in-wall-ac-oahu',
        '/waipahu-ac-warehouse-pickup': '/window-ac-warehouse-pickup-waipahu',
        '/central-ac': '/shop',
        '/mini_split_ac': '/shop',
        '/ductless-mini-split-installation-oahu': '/window-ac-installation',
        '/mini-split-estimate': '/sizing',
        '/mini-split-installation-cost-oahu': '/shop',
        '/mini_split_ac_maintenance': '/ac-cleaning-oahu',
        '/premium-mini-split-deep-cleaning-oahu': '/ac-cleaning-oahu',
        '/mini-split-remote-control-not-working': '/ac-repair-oahu',
        '/window-ac-vs-mini-split-oahu': '/shop/lg-dual-inverter-guide',
        '/window-ac-installation-oahu': '/window-ac-installation',
        '/ac-deep-cleaning-service-oahu': '/ac-cleaning-oahu',
        '/maintenance': '/ac-cleaning-oahu',
        '/ac-repair': '/ac-repair-oahu',
        '/large-room-window-ac-18000-24000-btu': '/shop/large-room-window-ac-oahu',
        '/same-day-window-ac-pickup-oahu': '/window-ac-warehouse-pickup-waipahu',
        '/standard-window-ac-brackets-mounting-oahu': '/ac-brackets-exterior-security-mounting-oahu',
        '/appointment': '/contact',
        '/services': '/shop',
    };
    if (CONSOLIDATED_REDIRECTS[pathLower]) {
        return makePermanentRedirect(CONSOLIDATED_REDIRECTS[pathLower]);
    }

    // 5. Legacy Route Detection & Decommissioning
    const deadDebrisPrefixes = [
        '/wp-content/',
        '/author/',
        '/element_category/',
        '/fusion_tb_category/',
        '/media/',
    ];

    if (deadDebrisPrefixes.some(prefix => pathLower.startsWith(prefix))) {
        return new NextResponse(
            '<!DOCTYPE html><html><head><title>410 Gone</title><meta name="robots" content="noindex, nofollow"/></head><body><h1>410 - Resource Permanently Removed</h1><p>This legacy URL has been permanently removed.</p><p><a href="/">Return to Affordable Home A/C</a></p></body></html>',
            {
                status: 410,
                statusText: 'Gone',
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                    'X-Robots-Tag': 'noindex, nofollow',
                }
            }
        );
    }

    const legacyPrefixes = [
        '/product/',
        '/product-category/',
        '/product-tag/',
        '/contact-us',
        '/why-buy-lg',
        '/cart',
        '/installations',
        '/make-an-appointment',
        '/cleaning-and-maintenance',
    ];

    const isLegacy = legacyPrefixes.some(prefix => pathLower === prefix.replace(/\/$/, '') || pathLower.startsWith(prefix));

    if (isLegacy) {
        let destination = '/shop';

        // High-Intent add-to-cart parameter detection
        const addToCartId = url.searchParams.get('add-to-cart');
        if (addToCartId && LEGACY_ID_TO_SLUG[addToCartId]) {
            const targetSlug = LEGACY_ID_TO_SLUG[addToCartId];
            destination = targetSlug.startsWith('oahu-') ? `/shop/${targetSlug}` : `/shop/${targetSlug}`;
            return makePermanentRedirect(destination);
        }

        // Specific legacy page mappings
        if (pathLower === '/why-buy-lg') {
            return makePermanentRedirect('/shop/lg-dual-inverter-guide');
        }
        if (pathLower === '/make-an-appointment' || pathLower === '/contact-us') {
            return makePermanentRedirect('/contact');
        }
        if (pathLower === '/cleaning-and-maintenance') {
            return makePermanentRedirect('/ac-cleaning-oahu');
        }
        if (pathLower === '/cart') {
            return makePermanentRedirect('/shop');
        }
        if (pathLower === '/installations') {
            return makePermanentRedirect('/window-ac-installation');
        }

        // Product URLs: /product/...
        if (pathLower.startsWith('/product/')) {
            const productSlug = pathLower.replace('/product/', '');
            if (productSlug.includes('2421') || productSlug.includes('23000') || productSlug.includes('23500') || productSlug.includes('2422') || productSlug.includes('2423')) {
                destination = '/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm';
            } else if (productSlug.includes('1822') || productSlug.includes('18000') || productSlug.includes('1823')) {
                destination = '/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm';
            } else if (productSlug.includes('1522') || productSlug.includes('14000')) {
                destination = '/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm';
            } else if (productSlug.includes('1222') || productSlug.includes('12000')) {
                destination = '/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm';
            } else if (productSlug.includes('1022') || productSlug.includes('10000')) {
                destination = '/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm';
            } else if (productSlug.includes('8024')) {
                destination = '/shop/11-lg-8-000-btu-lw8024rd';
            } else if (productSlug.includes('8021') || productSlug.includes('7500') || productSlug.includes('8000') || productSlug.includes('8022')) {
                destination = '/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm';
            } else if (productSlug.includes('6023') || productSlug.includes('6000')) {
                destination = '/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm';
            } else {
                destination = '/shop';
            }
            return makePermanentRedirect(destination);
        }

        // Product Tag URLs: /product-tag/...
        if (pathLower.startsWith('/product-tag/')) {
            const tag = pathLower.replace('/product-tag/', '').split('/')[0];
            if (['18000', '23000', '23500'].includes(tag)) {
                destination = '/shop/large-room-window-ac-oahu';
            } else if (tag === '8000') {
                destination = '/shop/lg-dual-inverter-8000-btu-oahu';
            } else if (tag === '12000') {
                destination = '/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm';
            } else if (['dual-inverter', 'btu', 'wifi'].includes(tag)) {
                destination = '/shop/lg-dual-inverter-guide';
            } else if (tag === 'universal-fit') {
                destination = '/shop/oahu-window-ac-warehouse';
            } else {
                destination = '/shop';
            }
            return makePermanentRedirect(destination);
        }

        // Product Category URLs: /product-category/...
        if (pathLower.startsWith('/product-category/')) {
            const cat = pathLower.replace('/product-category/', '');
            if (cat.includes('dual-inverter-wifi') || cat.includes('wifi-enabled')) {
                destination = '/shop/lg-dual-inverter-guide';
            } else if (cat.includes('universal-fit')) {
                destination = '/shop/oahu-window-ac-warehouse';
            } else {
                destination = '/shop';
            }
            return makePermanentRedirect(destination);
        }

        // Service / Maintenance fallbacks
        if (pathLower.includes('repair')) {
            destination = '/ac-repair-oahu';
            return makePermanentRedirect(destination);
        }
        if (pathLower.includes('cleaning') || pathLower.includes('maintenance')) {
            destination = '/ac-cleaning-oahu';
            return makePermanentRedirect(destination);
        }

        // General WordPress debris: /wp-content/, /author/, etc.
        return makePermanentRedirect('/service-areas');
    }

    // 6. Trailing Slash Canonicalization for Valid Static/Dynamic Pages
    // (e.g. /shop/ -> /shop, /contact/ -> /contact, /window-ac-installation/ -> /window-ac-installation)
    if (hasTrailingSlash) {
        return makePermanentRedirect(cleanPath);
    }

    // 7. Prune WooCommerce Bloat Params on Otherwise Valid Pages
    if (WOOCOMMERCE_BLOAT_PARAMS.some(param => url.searchParams.has(param))) {
        return makePermanentRedirect(cleanPath);
    }

    const response = NextResponse.next();

    // 8. X-Robots-Tag: noindex for Internal/Secure Routes, Parameterized Filter/Prefill URLs & All Staging Traffic
    const host = request.headers.get('host') || '';
    const isStagingHost = host.includes('staging') || host.includes('localhost');
    const noIndexPaths = [
        '/admin',
        '/checkout',
        '/maintenance',
        '/dev-os',
        '/puck',
    ];
    const noIndexParams = [
        'capacity',
        'category',
        'voltage',
        'mount',
        'sort',
        'q',
        'service',
        'notes',
        'model',
        '_t',
        '_rsc',
    ];
    const isPrivateRoute = noIndexPaths.some(path => url.pathname.startsWith(path));
    const hasNoIndexParam = noIndexParams.some(param => url.searchParams.has(param));

    if (isStagingHost || isPrivateRoute || hasNoIndexParam) {
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    // 9. Conditional HTTP Caching Protocol (304 Not Modified for Public Routes; Zero-Cache for Admin/Checkout)
    if (isPrivateRoute) {
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
    } else {
        response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
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
