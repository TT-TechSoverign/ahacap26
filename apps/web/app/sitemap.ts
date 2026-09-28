import { MetadataRoute } from 'next';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import contentData from '@/lib/content/content.json';
import fs from 'fs';
import path from 'path';

// Robust Sitemap Generation
// This ensures the build never fails even if the API is down.
// Force dynamic rendering so this runs at request time (when API is up),
// not at build time (when API is down).
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com';

    let data = contentData;
    try {
        // Monorepo-aware path resolution
        const pathsToTry = [
            path.join(process.cwd(), 'lib/content/content.json.LIVE'),
            path.join(process.cwd(), 'apps/web/lib/content/content.json.LIVE'),
        ];
        
        let resolvedPath = '';
        for (const p of pathsToTry) {
            if (fs.existsSync(p)) {
                resolvedPath = p;
                break;
            }
        }

        if (resolvedPath) {
            const raw = fs.readFileSync(resolvedPath, 'utf8');
            data = JSON.parse(raw);
            console.log(`[Sitemap] Successfully read live content from ${resolvedPath}`);
        } else {
            console.warn('[Sitemap] content.json.LIVE not found in known paths, falling back to static build-time content.');
        }
    } catch (e) {
        console.warn('[Sitemap] Failed to read live content, falling back to static content.', e);
    }

    // Extract service area cities
    const content = data as any;
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

    // Sort alphabetically
    cityRoutes.sort((a, b) => a.localeCompare(b));

    // 1. Define Static Routes (Always included)
    // NOTE: Routes with hash fragments (e.g., /shop#dual_inverter) have been removed 
    // to comply with Google Sitemap protocol and avoid "Crawled - currently not indexed" bloat.
    const highYieldRoutes = [
        '/clean-vs-replace-window-ac',
        '/window-ac-installation',
        '/shop/window-ac-plug-guide',
        '/mini-split-estimate',
        '/shop/large-room-window-ac-oahu',
        '/shop/lg-dual-inverter-8000-btu-oahu',
        '/window-ac-vs-mini-split-oahu',
        '/shop/lg-dual-inverter-guide',
        '/ac-repair-oahu',
        '/ac-cleaning-oahu',
        '/shop/oahu-window-ac-warehouse',
        '/ductless-mini-split-installation-oahu',
        '/reviews',
        '/hawaii-energy-rebate',
        '/mini-split-installation-cost-oahu',
        '/jalousie-window-ac-installation-oahu',
        '/quiet-bedroom-window-ac-oahu',
        '/living-room-window-ac-oahu',
        '/ac-blowing-warm-air-troubleshooting-oahu',
        '/ac-freezing-up-ice-on-coils-hawaii',
        '/ac-dripping-water-inside-house-repair',
        '/ac-keeps-tripping-breaker-hawaii',
        '/blinking-light-error-codes-ac-repair',
        '/window-ac-warehouse-pickup-waipahu',
        '/large-room-window-ac-18000-24000-btu',
        '/small-room-window-ac-6000-8000-btu',
        '/energy-star-window-air-conditioners-hawaii',
        '/smart-wifi-window-ac-oahu',
        '/window-ac-replacement-oahu',
        '/commercial-window-ac-oahu',
        '/window-ac-for-studios-apartments-hawaii',
        '/low-voltage-window-ac-115v-oahu',
        '/inverter-window-ac-vs-standard-hawaii',
        '/same-day-window-ac-pickup-oahu',
        '/window-ac-warranty-waipahu',
        '/window-ac-delivery-service-oahu',
        '/horizontal-sliding-window-ac-oahu',
        '/single-wall-construction-ac-cooling-hawaii',
        '/ac-brackets-exterior-security-mounting-oahu',
        '/window-ac-weather-stripping-island-seal',
        '/condo-townhouse-window-ac-hoa-rules-oahu',
        '/renter-friendly-ac-installation-oahu',
        '/double-hung-window-ac-installation-hawaii',
        '/wood-frame-window-ac-support-oahu',
        '/vinyl-replacement-window-ac-mounting',
        '/high-rise-condo-ac-rules-honolulu',
        '/security-bars-window-ac-installation-oahu',
        '/standard-window-ac-brackets-mounting-oahu',
        '/narrow-window-ac-solutions-hawaii',
        '/ac-condensation-drain-routing-condos',
        '/ac-mold-removal-cleaning-oahu',
        '/premium-mini-split-deep-cleaning-oahu',
        '/ac-smells-musty-mildew-hawaii',
        '/black-mold-in-ac-health-risks-hawaii',
        '/seasonal-ac-maintenance-plans-oahu',
        '/commercial-ac-cleaning-oahu',
        '/ac-coil-cleaning-benefits-power-bill',
        '/air-conditioner-blower-wheel-cleaning-hawaii',
        '/ac-drain-line-clog-clearing-oahu',
        '/clean-air-filter-replacement-hawaii',
        '/salt-corrosion-coil-rinse-hawaii',
        '/post-storm-ac-inspection-cleaning-oahu',
        '/pet-hair-dander-ac-cleaning-oahu',
        '/ac-diagnostic-service-175-flat-rate',
        '/ac-compressor-not-turning-on-oahu',
        '/window-ac-making-loud-buzzing-noise',
        '/mini-split-remote-control-not-working',
        '/ac-refrigerant-leak-detection-hawaii',
        '/ac-turning-on-and-off-rapidly-short-cycling',
        '/no-power-to-ac-unit-hawaii',
        '/ac-burning-electrical-smell-oahu',
        '/outdoor-unit-fan-not-spinning-hawaii'
    ];

    const staticRoutes = [
        '',
        '/shop',
        '/contact',
        '/ac-repair',
        '/mini_split_ac',
        '/mini_split_ac_maintenance',
        '/sizing',
        '/service-areas',
        ...highYieldRoutes,
        ...cityRoutes
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : (highYieldRoutes.includes(route) ? 0.9 : (route.startsWith('/service-areas/') ? 0.7 : 0.8)),
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
