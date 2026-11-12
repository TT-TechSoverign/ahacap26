import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
    const reqHeaders = headers();
    const host = (reqHeaders.get('x-forwarded-host') || reqHeaders.get('host') || '').toLowerCase();
    const baseUrl = (process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com').replace(/\/+$/, '');
    const envName = (process.env.ENVIRONMENT || '').toLowerCase();
    const isStaging =
        envName === 'staging' ||
        host.includes('staging.') ||
        baseUrl.includes('staging.');

    if (isStaging) {
        return {
            rules: [
                {
                    userAgent: '*',
                    disallow: '/',
                },
            ],
        };
    }

    // Note: Legacy WordPress paths (/wp-content/, /author/, /element_category/, /fusion_tb_category/),
    // WooCommerce params (?add-to-cart=, ?product_orderby=, etc.), and storefront UI filter/prefill
    // query params (?capacity=, ?category=, ?service=, etc.) are intentionally NOT disallowed here so
    // Googlebot can crawl them and honor middleware.ts's 301 Permanent Redirects, 410 Gone headers,
    // X-Robots-Tag: noindex, follow headers, and clean base <link rel="canonical"> consolidation.
    const sharedDisallows = [
        '/admin',
        '/admin/',
        '/admin/*',
        '/dev-os',
        '/dev-os/',
        '/dev-os/*',
        '/api/v1/',
        '/api/v1/*',
        '/api/checkout',
        '/api/revalidate',
        '/api/indexnow',
        '/api/puck',
        '/create-checkout-session',
        '/checkout',
        '/checkout/',
        '/checkout/*',
        '/puck',
        '/puck/',
        '/*?*_rsc=*',
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/llms.txt', '/api/sitemap-xml', '/api/google-feed', '/merchant-feed.xml', '/api/google-reviews-feed', '/product-reviews-feed.xml'],
                disallow: sharedDisallows,
            },
            {
                userAgent: [
                    'Google-Extended',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'GPTBot',
                    'PerplexityBot',
                    'ClaudeBot',
                    'Applebot-Extended',
                    'Amazonbot',
                    'FacebookBot',
                    'meta-externalagent'
                ],
                allow: ['/', '/llms.txt', '/api/sitemap-xml', '/api/google-feed', '/merchant-feed.xml', '/api/google-reviews-feed', '/product-reviews-feed.xml'],
                disallow: sharedDisallows,
            },
            {
                userAgent: [
                    'Bytespider',
                    'CCBot',
                    'AhrefsBot',
                    'SemrushBot',
                    'PetalBot',
                    'DotBot',
                    'MJ12bot',
                    'BLEXBot',
                    'DataForSeoBot',
                    'SeekportBot',
                    'ZoominfoBot',
                    'YandexBot',
                    'Baiduspider',
                    'SeznamBot',
                    'Sogou'
                ],
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
