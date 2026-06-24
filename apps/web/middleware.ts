import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1-to-1 Mapping of legacy WooCommerce product IDs to Next.js product slugs
// This preserves specific PageRank for exact models rather than soft 404ing to /shop
const LEGACY_ID_TO_SLUG: Record<string, string> = {
    '2853': '4-lg-dual-inverter-12-000-btu-lw1222ivsm', // 12000 BTU
    '3700': '2-lg-dual-inverter-8-000-btu-lw8022ivsm', // 8000 BTU
    '2909': '7-lg-dual-inverter-23-500-btu-lw2422ivsm', // Approx 23500 BTU
    '3512': '3-lg-dual-inverter-10-000-btu-lw1022ivsm', // Approx 10000
    '2463': '1-lg-dual-inverter-6-000-btu-lw6023ivsm', // Approx 6000
    '2923': '5-lg-dual-inverter-14-000-btu-lw1522ivsm', // Approx 14000
    '2427': '6-lg-dual-inverter-18-000-btu-lw1822ivsm', // Approx 18000
    '2924': '7-lg-dual-inverter-23-500-btu-lw2422ivsm', // Approx 23500
};




const CITIES = [
    'aiea', 'pearl-city', 'mililani', 'waipio-gentry', 'waikele',
    'honolulu', 'kalihi', 'manoa', 'kaimuki', 'hawaii-kai',
    'salt-lake', 'aina-haina', 'kahala', 'mccully', 'makiki',
    'kapolei', 'ewa-beach', 'waipahu', 'kunia',
    'kailua', 'kaneohe', 'kahaluu'
];

function getCitySiphon(urlPath: string): string {
    let hash = 5381;
    for (let i = 0; i < urlPath.length; i++) {
        hash = ((hash << 5) + hash) + urlPath.charCodeAt(i);
    }
    const index = Math.abs(hash) % CITIES.length;
    return `/service-areas/${CITIES[index]}`;
}

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    
    // Direct permanent redirect for /index.html to / to merge domain authority and eliminate duplicate canonical split
    if (url.pathname === '/index.html' || url.pathname.startsWith('/index.html/')) {
        const finalUrl = new URL('/', request.url);
        // Preserve any surviving search parameters (e.g. ?gclid, ?utm_source) for analytics attribution
        url.searchParams.forEach((value, key) => {
            finalUrl.searchParams.append(key, value);
        });
        const response = NextResponse.redirect(finalUrl, 301);
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return response;
    }

    // URL Normalization: Decode percent-encodings and strip trailing slashes to prevent redirect chains
    let rawPathname = url.pathname;
    try {
        rawPathname = decodeURIComponent(url.pathname);
    } catch (e) {
        console.warn('[Middleware] Failed to decode URI component:', url.pathname);
    }

    let cleanPath = rawPathname;
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
        cleanPath = cleanPath.slice(0, -1);
    }

    const pathLower = cleanPath.toLowerCase();

    // 1. Legacy Route Interception (Case-Insensitive Matcher)
    const legacyPrefixes = [
        '/product/', '/product-category/', '/product-tag/', 
        '/wp-content/', '/author/', '/element_category/', 
        '/fusion_tb_category/', '/media/', '/contact-us', 
        '/why-buy-lg', '/cart', '/installations'
    ];
    const isLegacy = legacyPrefixes.some(prefix => pathLower.startsWith(prefix));

    if (isLegacy) {
        let destinationPath = '/shop'; // Default Fallback
        let isSpecificMatch = false;
        
        // 2e. Specific page mapping for new legacy paths
        if (pathLower.startsWith('/contact-us')) {
            destinationPath = '/contact';
            isSpecificMatch = true;
        } else if (pathLower.startsWith('/why-buy-lg')) {
            destinationPath = '/shop#dual_inverter';
            isSpecificMatch = true;
        } else if (pathLower.startsWith('/cart')) {
            destinationPath = '/shop';
            isSpecificMatch = true;
        } else if (pathLower.startsWith('/installations')) {
            destinationPath = '/';
            isSpecificMatch = true;
        }

        // 2a. Category Fallback Mapping (Preserve Category-Level PageRank)
        if (!isSpecificMatch) {
            if (pathLower.includes('dual-inverter') || pathLower.includes('/lg/dual-inverter')) {
                destinationPath = '/shop#dual_inverter';
                isSpecificMatch = true;
            } else if (pathLower.includes('universal-fit')) {
                destinationPath = '/shop#universal_fit';
                isSpecificMatch = true;
            } else if (pathLower.includes('/ge/')) {
                destinationPath = '/shop#ge';
                isSpecificMatch = true;
            } else if (pathLower.includes('casement')) {
                destinationPath = '/shop#casement';
                isSpecificMatch = true;
            } else if (pathLower.includes('/lg/') || pathLower.includes('/window/')) {
                destinationPath = '/shop#dual_inverter';
                isSpecificMatch = true;
            }
        }
        
        // 2b. Prevent Soft-404: Resolve specific product mapping
        if (!isSpecificMatch) {
            const legacyId = url.searchParams.get('add-to-cart');
            if (legacyId && LEGACY_ID_TO_SLUG[legacyId]) {
                destinationPath = `/shop/${LEGACY_ID_TO_SLUG[legacyId]}`;
                isSpecificMatch = true;
            }
        }

        // 2c. Service/Contact Mapping
        if (!isSpecificMatch && (pathLower.includes('repair') || pathLower.includes('maintenance') || pathLower.includes('cleaning'))) {
            if (pathLower.includes('mini-split') || pathLower.includes('split-ac') || pathLower.includes('split_ac')) {
                destinationPath = '/mini_split_ac_maintenance';
            } else {
                destinationPath = '/window_ac_maintenance';
            }
            isSpecificMatch = true;
        }

        // 2d. The Authority Siphon (Hash Distribution for Unmapped "Junk" Legacy URLs)
        if (!isSpecificMatch) {
            destinationPath = getCitySiphon(cleanPath);
        }

        // Loop Safeguard: If the destination matches the current path, bypass redirect to prevent infinite loops
        if (destinationPath === cleanPath || destinationPath === rawPathname) {
            return NextResponse.next();
        }
        
        // 3. Prevent Telemetry Bleed: Selective Parameter Deletion
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
        const finalUrl = new URL(destinationPath, request.url);
        // Preserve any surviving search parameters (e.g. ?gclid)
        url.searchParams.forEach((value, key) => {
            finalUrl.searchParams.append(key, value);
        });
        
        const response = NextResponse.redirect(finalUrl, 301);
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return response;
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
