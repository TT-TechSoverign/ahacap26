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
        '/maintenance',
        '/maintenance/',
        '/central-ac',
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
        '/*?*add-to-cart=*',
        '/*?*product_orderby=*',
        '/*?*product_view=*',
        '/*?*min_price=*',
        '/*?*max_price=*',
        '/*?*v=*',
        '/author/',
        '/wp-content/',
        '/element_category/',
        '/fusion_tb_category/'
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/api/google-feed', '/merchant-feed.xml'],
                disallow: sharedDisallows,
            },
            {
                userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot'],
                allow: ['/', '/api/google-feed', '/merchant-feed.xml'],
                disallow: sharedDisallows,
                crawlDelay: 10,
            },
            {
                userAgent: [
                    'GPTBot',
                    'ClaudeBot',
                    'Google-Extended',
                    'Applebot-Extended',
                    'Bytespider',
                    'Amazonbot',
                    'FacebookBot',
                    'meta-externalagent',
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
