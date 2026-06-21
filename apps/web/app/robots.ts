import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/checkout/', '/maintenance/'],
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
