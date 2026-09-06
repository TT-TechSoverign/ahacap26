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

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/', 
                    '/checkout/', 
                    '/maintenance/',
                    '/dev-os/',
                    '/puck/'
                ],
            },
            {
                userAgent: 'GPTBot',
                disallow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
            {
                userAgent: 'AhrefsBot',
                disallow: '/',
            },
            {
                userAgent: 'SemrushBot',
                disallow: '/',
            },
            {
                userAgent: 'PetalBot',
                disallow: '/',
            },
            {
                userAgent: 'DotBot',
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
