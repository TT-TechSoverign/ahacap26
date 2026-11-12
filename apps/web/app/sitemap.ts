import { MetadataRoute } from 'next';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import { getProductImages } from '@/lib/product-images';
import contentData from '@/lib/content/content.json';
import fs from 'fs';
import path from 'path';

// Robust Sitemap Generation
// This ensures the build never fails even if the API is down.
// Force dynamic rendering so this runs at request time (when API is up),
// not at build time (when API is down).
export const revalidate = 86400;
const PASS17_LAST_MODIFIED = '2026-11-12';
const CORE_LAST_MODIFIED = '2026-11-11';
const CITY_AND_GUIDE_LAST_MODIFIED = '2026-11-08';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com';
    const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

    let data = contentData;
    if (!isBuildPhase) {
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
            }
        } catch (e) {
            console.warn('[Sitemap] Failed to read live content, falling back to static content.', e);
        }
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

    // 1. Define Canonical Static Routes (Zero redirected/doorway routes — 118 total canonical routes)
    const coreServiceHubs = new Set([
        '/contact',
        '/sizing',
        '/service-areas',
        '/window-ac-installation',
        '/ac-repair-oahu',
        '/ac-cleaning-oahu',
        '/reviews',
        '/shop/oahu-window-ac-warehouse',
        '/shop/ge-built-in-wall-ac-oahu',
        '/shop/10000-12000-btu-window-ac-oahu',
        '/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu',
        '/window-ac-installation-cost-oahu',
        '/window-ac-electricity-cost-heco-calculator-hawaii',
    ]);

    const pass17UpdatedRoutes = new Set([
        '',
        '/shop',
        '/sizing',
        '/sitemap',
        '/window-ac-installation',
        '/ac-cleaning-oahu',
        '/ac-repair-oahu',
        '/living-room-window-ac-oahu',
        '/window-ac-delivery-service-oahu',
        '/window-ac-diagnostic-assessment-oahu',
        '/hawaii-energy-rebate',
        '/window-ac-replacement-oahu',
        '/window-ac-warehouse-pickup-waipahu',
        '/window-ac-warranty-waipahu',
        '/commercial-window-ac-oahu',
        '/energy-star-window-air-conditioners-hawaii',
        '/inverter-window-ac-vs-standard-hawaii',
        '/low-voltage-window-ac-115v-oahu',
        '/quiet-bedroom-window-ac-oahu',
        '/small-room-window-ac-6000-8000-btu',
        '/smart-wifi-window-ac-oahu',
        '/window-ac-for-studios-apartments-hawaii',
        '/shop/ge-built-in-wall-ac-oahu',
        '/shop/large-room-window-ac-oahu',
        '/shop/lg-dual-inverter-8000-btu-oahu',
        '/shop/lg-dual-inverter-guide',
        '/shop/oahu-window-ac-warehouse',
        '/shop/window-ac-plug-guide',
        '/shop/10000-12000-btu-window-ac-oahu',
        '/shop/lg-cool-and-heat-window-ac-hawaii',
        '/shop/lg-standard-budget-window-ac-oahu',
        '/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu',
        '/window-ac-installation-cost-oahu',
        '/window-ac-electricity-cost-heco-calculator-hawaii',
        '/portable-ac-vs-window-ac-hawaii',
        '/230v-window-ac-outlet-nema-6-15-6-20-oahu',
        '/window-ac-cleaning-vs-repair-cost-oahu',
        '/property-manager-landlord-window-ac-oahu',
    ]);

    const highYieldRoutes = [
        '/clean-vs-replace-window-ac',
        '/window-ac-installation',
        '/window-ac-installation-cost-oahu',
        '/shop/window-ac-plug-guide',
        '/230v-window-ac-outlet-nema-6-15-6-20-oahu',
        '/shop/10000-12000-btu-window-ac-oahu',
        '/shop/large-room-window-ac-oahu',
        '/shop/lg-dual-inverter-8000-btu-oahu',
        '/shop/lg-dual-inverter-guide',
        '/shop/lg-cool-and-heat-window-ac-hawaii',
        '/shop/lg-standard-budget-window-ac-oahu',
        '/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu',
        '/ac-repair-oahu',
        '/ac-cleaning-oahu',
        '/window-ac-cleaning-vs-repair-cost-oahu',
        '/shop/oahu-window-ac-warehouse',
        '/shop/ge-built-in-wall-ac-oahu',
        '/reviews',
        '/hawaii-energy-rebate',
        '/window-ac-electricity-cost-heco-calculator-hawaii',
        '/portable-ac-vs-window-ac-hawaii',
        '/property-manager-landlord-window-ac-oahu',
        '/jalousie-window-ac-installation-oahu',
        '/quiet-bedroom-window-ac-oahu',
        '/living-room-window-ac-oahu',
        '/ac-blowing-warm-air-troubleshooting-oahu',
        '/ac-freezing-up-ice-on-coils-hawaii',
        '/ac-dripping-water-inside-house-repair',
        '/ac-keeps-tripping-breaker-hawaii',
        '/blinking-light-error-codes-ac-repair',
        '/window-ac-warehouse-pickup-waipahu',
        '/small-room-window-ac-6000-8000-btu',
        '/energy-star-window-air-conditioners-hawaii',
        '/smart-wifi-window-ac-oahu',
        '/window-ac-replacement-oahu',
        '/commercial-window-ac-oahu',
        '/window-ac-for-studios-apartments-hawaii',
        '/low-voltage-window-ac-115v-oahu',
        '/inverter-window-ac-vs-standard-hawaii',
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
        '/narrow-window-ac-solutions-hawaii',
        '/ac-condensation-drain-routing-condos',
        '/ac-mold-removal-cleaning-oahu',
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
        '/window-ac-diagnostic-assessment-oahu',
        '/ac-compressor-not-turning-on-oahu',
        '/window-ac-making-loud-buzzing-noise',
        '/ac-refrigerant-leak-detection-hawaii',
        '/ac-turning-on-and-off-rapidly-short-cycling',
        '/no-power-to-ac-unit-hawaii',
        '/ac-burning-electrical-smell-oahu',
        '/outdoor-unit-fan-not-spinning-hawaii'
    ];

    const getStaticRouteImages = (route: string): string[] => {
        const r = route.toLowerCase();
        if (r.includes('ge-built-in') || r.includes('wall') || r.includes('condo') || r.includes('sleeve') || r.includes('rab26a')) {
            return [
                `${baseUrl}/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp`,
                `${baseUrl}/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp`,
                `${baseUrl}/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A.webp`,
                `${baseUrl}/assets/window-unit-images/3d-fit/product_15_fit_cutaway.webp`,
            ];
        }
        if (
            r.includes('clean') || r.includes('mold') || r.includes('musty') ||
            r.includes('maintenance') || r.includes('coil') || r.includes('blower') ||
            r.includes('drain') || r.includes('filter') || r.includes('salt') ||
            r.includes('storm') || r.includes('pet') || r.includes('repair') ||
            r.includes('diagnostic') || r.includes('compressor') || r.includes('buzzing') ||
            r.includes('leak') || r.includes('cycling') || r.includes('power') ||
            r.includes('smell') || r.includes('fan') || r.includes('warm-air') ||
            r.includes('freezing') || r.includes('dripping') || r.includes('breaker') ||
            r.includes('blinking')
        ) {
            return [
                `${baseUrl}/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp`,
                `${baseUrl}/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-filter-1600x1000.webp`,
                `${baseUrl}/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp`,
                `${baseUrl}/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp`,
            ];
        }
        if (
            r.includes('install') || r.includes('jalousie') || r.includes('bracket') ||
            r.includes('sliding') || r.includes('weather') || r.includes('renter') ||
            r.includes('double-hung') || r.includes('wood-frame') || r.includes('vinyl') ||
            r.includes('security-bars') || r.includes('narrow') || r.includes('sizing') ||
            r.includes('230v') || r.includes('nema')
        ) {
            return [
                `${baseUrl}/assets/window-unit-images/3d-fit/lw1222ivsm-window-fit-cutaway.webp`,
                `${baseUrl}/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp`,
                `${baseUrl}/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp`,
                `${baseUrl}/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp`,
            ];
        }
        return [
            `${baseUrl}/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp`,
            `${baseUrl}/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp`,
            `${baseUrl}/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-1600x1000.webp`,
            `${baseUrl}/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.webp`,
        ];
    };

    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/shop',
        '/contact',
        '/sizing',
        '/service-areas',
        '/sitemap',
        ...highYieldRoutes,
        ...cityRoutes
    ].map((route) => {
        const changeFrequency: 'weekly' | 'monthly' =
            (route === '' || route === '/shop' || route === '/reviews' || route.startsWith('/shop/') || coreServiceHubs.has(route))
                ? 'weekly'
                : 'monthly';

        const routeLastMod = pass17UpdatedRoutes.has(route)
            ? PASS17_LAST_MODIFIED
            : (coreServiceHubs.has(route) ? CORE_LAST_MODIFIED : CITY_AND_GUIDE_LAST_MODIFIED);

        return {
            url: `${baseUrl}${route}`,
            lastModified: routeLastMod,
            changeFrequency,
            priority: route === '' ? 1.0 : (highYieldRoutes.includes(route) ? 0.9 : (route.startsWith('/service-areas/') ? 0.8 : 0.85)),
            images: getStaticRouteImages(route),
        };
    });

    // 2. Fetch Dynamic Product Routes (with INITIAL_CATALOG_PRODUCTS fallback)
    const { INITIAL_CATALOG_PRODUCTS } = await import('@/lib/catalog-seed');
    let products: Product[] = INITIAL_CATALOG_PRODUCTS;
    if (!isBuildPhase) {
        try {
            const baseApi = (process.env.API_INTERNAL_URL || 'http://prod-api:8000').replace(/\/api\/v1\/?$/, '');
            const apiUrl = `${baseApi}/api/v1`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const res = await fetch(`${apiUrl}/products`, {
                next: { revalidate: 86400 },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (res.ok) {
                const liveProducts: Product[] = await res.json();
                if (Array.isArray(liveProducts) && liveProducts.length > 0) {
                    products = liveProducts;
                }
            }
        } catch (error) {
            console.error('[Sitemap] API request failed, using INITIAL_CATALOG_PRODUCTS fallback.', error);
        }
    }

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => {
        const galleryUrls = getProductImages(product.id).map((img) => {
            const clean = img.replace(/\.svg$/i, '.webp');
            return clean.startsWith('http') ? clean : `${baseUrl}${clean}`;
        });
        const cutawayUrl = `${baseUrl}/assets/window-unit-images/3d-fit/product_${product.id}_fit_cutaway.webp`;
        const specPageUrl = `${baseUrl}/assets/specsheets/mobile-pages/${product.id}/page-1.webp`;
        const uniqueImages = Array.from(new Set([...galleryUrls, cutawayUrl, specPageUrl]));

        return {
            url: `${baseUrl}/shop/${generateProductSlug(product.id, product.name)}`,
            lastModified: CORE_LAST_MODIFIED,
            changeFrequency: 'weekly' as const,
            priority: 0.95,
            images: uniqueImages,
        };
    });

    // 3. Combine and Return
    return [...staticRoutes, ...productRoutes];
}
