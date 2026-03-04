import { MetadataRoute } from 'next';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import contentData from '@/lib/content/content.json';

// Robust Sitemap Generation
// This ensures the build never fails even if the API is down.
// Force dynamic rendering so this runs at request time (when API is up),
// not at build time (when API is down).
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://affordablehome-ac.com';

    // Extract service area cities
    const content = contentData as any;
    const regions = content?.landing_legacy?.service_areas?.regions || [];
    const cityRoutes: string[] = [];
    regions.forEach((region: any) => {
        if (region.cities) {
            region.cities.forEach((city: any) => {
                const citySlug = city.name.toLowerCase().replace(/ /g, '-');
                cityRoutes.push(`/service-areas/${citySlug}`);
            });
        }
    });

    // 1. Define Static Routes (Always included)
    const staticRoutes = [
        '',
        '/shop',
        '/contact',
        '/mini_split_ac',
        '/mini_split_ac_maintenance',
        '/window_ac_maintenance',
        '/service-areas',
        ...cityRoutes
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : (route.startsWith('/service-areas/') ? 0.7 : 0.8),
    }));

    // 2. Fetch Dynamic Product Routes
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        // STRATEGY: Robustly determine API URL.
        // Env var might be 'http://prod-api:8000' (no suffix) or '.../api/v1'.
        // We ensure we target the /api/v1/products endpoint.
        let apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
        if (!apiUrl.endsWith('/api/v1')) {
            apiUrl = `${apiUrl}/api/v1`;
        }

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
                url: `${baseUrl}/shop/${generateProductSlug(product.id, product.name)}`,
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
