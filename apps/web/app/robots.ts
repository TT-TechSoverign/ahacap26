import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com';
    const isStaging = baseUrl.includes('staging');

    if (isStaging) {
        return {
            rules: [
                {
                    userAgent: '*',
                    disallow: '/',
                }
            ],
            sitemap: `${baseUrl}/sitemap.xml`,
        };
    }

    // Note: Legacy WordPress paths (/wp-content/, /author/, /element_category/, /fusion_tb_category/)
    // and WooCommerce params (?add-to-cart=, ?product_orderby=, etc.) are intentionally NOT disallowed
    // here so Googlebot can crawl them and honor middleware.ts's 301 Permanent Redirects and 410 Gone headers.
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
        '/create-checkout-session',
        '/checkout',
        '/checkout/',
        '/checkout/*',
        '/puck',
        '/puck/',
        '/*?*_rsc=*',
        '/*?*_t=*',
        '/*?*capacity=*',
        '/*?*category=*',
        '/*?*voltage=*',
        '/*?*mount=*',
        '/*?*sort=*',
        '/*?*q=*',
        '/contact?*',
        '/*?*service=*',
        '/*?*notes=*',
        '/*?*model=*',
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/llms.txt', '/api/google-feed', '/merchant-feed.xml', '/api/google-reviews-feed', '/product-reviews-feed.xml'],
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
                allow: ['/', '/llms.txt', '/api/google-feed', '/merchant-feed.xml', '/api/google-reviews-feed', '/product-reviews-feed.xml'],
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
