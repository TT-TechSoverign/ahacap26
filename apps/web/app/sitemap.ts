import { MetadataRoute } from 'next';
import { Product } from '@/types/inventory';

// Robust Sitemap Generation
// This ensures the build never fails even if the API is down.
// Force dynamic rendering so this runs at request time (when API is up),
// not at build time (when API is down).
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://affordablehome-ac.com';

    // 1. Define Static Routes (Always included)
    const staticRoutes = [
        '',
        '/shop',
        '/contact',
        '/maintenance',
        '/mini-splits',
        '/central-ac',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Fetch Dynamic Product Routes
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        // STRATEGY: Try fetch, if fail, return empty list (don't break build).
        // Default to internal orchestration URL for server-side fetch
        const apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000/api/v1';

        console.log(`[Sitemap] Fetching products from: ${apiUrl}`);

        // Add a timeout to prevent hanging builds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const res = await fetch(`${apiUrl}/products`, {
            next: { revalidate: 0 }, // No caching for sitemap
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (res.ok) {
            const products: Product[] = await res.json();
            productRoutes = products.map((product) => ({
                url: `${baseUrl}/shop/${product.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));
            console.log(`[Sitemap] Successfully generated ${productRoutes.length} product routes.`);
        } else {
            console.error(`[Sitemap] Failed to fetch products: ${res.status} ${res.statusText} from ${apiUrl}`);
        }
    } catch (error) {
        console.error('[Sitemap] API request failed. Using static routes only.', error);
    }

    // 3. Combine and Return
    return [...staticRoutes, ...productRoutes];
}
