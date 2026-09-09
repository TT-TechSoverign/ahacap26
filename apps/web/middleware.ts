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

    // 4. Outdated Product Slug Redirects
    if (pathLower === '/shop/5-lg-dual-inverter-14-000-btu-lw1522ivsm') {
        return makePermanentRedirect('/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm');
    }

    // 5. Legacy Route Detection
    const legacyPrefixes = [
        '/product/',
        '/product-category/',
        '/product-tag/',
        '/wp-content/',
        '/author/',
        '/element_category/',
        '/fusion_tb_category/',
        '/media/',
        '/contact-us',
        '/why-buy-lg',
        '/cart',
        '/installations',
        '/hawaii-energy-rebate',
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
        if (pathLower === '/why-buy-lg' || pathLower === '/hawaii-energy-rebate') {
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
            } else if (productSlug.includes('8021') || productSlug.includes('7500') || productSlug.includes('8000') || productSlug.includes('8022') || productSlug.includes('8024')) {
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
            if (pathLower.includes('mini-split') || pathLower.includes('split-ac') || pathLower.includes('split_ac')) {
                destination = '/mini_split_ac_maintenance';
            } else {
                destination = '/ac-cleaning-oahu';
            }
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

    // 8. X-Robots-Tag: noindex for Internal/Secure Routes
    const noIndexPaths = [
        '/admin',
        '/checkout',
        '/maintenance',
        '/dev-os',
        '/puck',
    ];
    if (noIndexPaths.some(path => url.pathname.startsWith(path))) {
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
