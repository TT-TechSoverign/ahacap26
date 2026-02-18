import { MetadataRoute } from 'next';
import { Product } from '@/types/inventory';

// Robust Sitemap Generation
// This ensures the build never fails even if the API is down.
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
        // '/puck/edit', // Exclude internal/admin routes
        // '/admin',     // Exclude internal/admin routes
        // '/login',     // Exclude internal/admin routes
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Fetch Dynamic Product Routes
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        // Use internal URL for SSG if available, fallback to public
        // During build time inside Docker, we might need to access the API service directly
        // However, static generation happens at build time, so we might need to rely on the public URL or mock if API isn't up
        // In a monorepo build, API might not be running. We need to be careful.

        // STRATEGY: Try fetch, if fail, return empty list (don't break build).
        const apiUrl = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

        // Add a timeout to prevent hanging builds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const res = await fetch(`${apiUrl}/products`, {
            next: { revalidate: 3600 }, // Revalidate every hour
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
            console.warn(`[Sitemap] Failed to fetch products: ${res.status} ${res.statusText}. Using static routes only.`);
        }
    } catch (error) {
        console.warn('[Sitemap] API request failed or timed out. Using static routes only.', error);
        // Explicitly suppress error to allow build to succeed
    }

    // 3. Combine and Return
    return [...staticRoutes, ...productRoutes];
}
