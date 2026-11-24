import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { getProductImages } from '@/lib/product-images';
import { generateProductSlug, isCampaignActive } from '@/lib/utils';
import { Product } from '@/types/inventory';

export const dynamic = 'force-dynamic';

const QUALIFYING_REBATE_IDS = new Set<number>([1, 2, 3, 4, 5, 6, 7, 15]);

const OAHU_SERVICE_CITIES = [
    'Aiea', 'Ewa Beach', 'Haleiwa', 'Hauula', 'Hawaii Kai', 'Honolulu',
    'Kailua', 'Kaimuki', 'Kaneohe', 'Kapolei', 'Kunia', 'Manoa',
    'Mililani', 'Nanakuli', 'Pearl City', 'Salt Lake', 'Wahiawa',
    'Waialua', 'Waianae', 'Waikiki', 'Waimanalo', 'Waipahu',
];

function getApiUrl(): string {
    let apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
    if (!apiUrl.endsWith('/api/v1')) {
        apiUrl = `${apiUrl}/api/v1`;
    }
    return apiUrl;
}

function mergeWithCanonicalSeed(liveData: Product[]): Product[] {
    const byId = new Map<number, Product>(liveData.map((p) => [Number(p.id), p]));
    return INITIAL_CATALOG_PRODUCTS.map((seed) => {
        const live = byId.get(seed.id);
        if (!live) return seed;
        return {
            ...seed,
            ...live,
            coverage_aham: live.coverage_aham || seed.coverage_aham,
            coverage_oahu: live.coverage_oahu || seed.coverage_oahu,
            sizing_notes: live.sizing_notes || seed.sizing_notes,
            ceer_rating: live.ceer_rating || seed.ceer_rating,
            dimensions: live.dimensions || seed.dimensions,
            min_window_width: live.min_window_width || seed.min_window_width,
            max_window_width: live.max_window_width || seed.max_window_width,
            min_window_height: live.min_window_height || seed.min_window_height,
            chassis_type: live.chassis_type || seed.chassis_type,
            image_url: live.image_url || seed.image_url,
        };
    });
}

async function fetchLiveProducts(): Promise<Product[]> {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return INITIAL_CATALOG_PRODUCTS;
    }
    try {
        const res = await fetch(`${getApiUrl()}/products`, { cache: 'no-store' });
        if (!res.ok) return INITIAL_CATALOG_PRODUCTS;
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? mergeWithCanonicalSeed(data) : INITIAL_CATALOG_PRODUCTS;
    } catch {
        return INITIAL_CATALOG_PRODUCTS;
    }
}

export async function GET(request: NextRequest) {
    const products = await fetchLiveProducts();
    const domain = (process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com').replace(/\/$/, '');
    const campaignActive = isCampaignActive();
    const format = (request.nextUrl.searchParams.get('format') || '').toLowerCase();

    const items = products.map((product) => {
        const ident = PRODUCT_IDENTIFIERS[product.id];
        const mpn = ident?.mpn || product.key_spec || `AHAC-${product.id}`;
        const gtin = ident?.gtin12 || '';
        const brand = ident?.brand === 'GE' ? 'GE Appliances' : (ident?.brand || (product.name.startsWith('GE') ? 'GE Appliances' : 'LG'));
        const slug = generateProductSlug(product.id, product.name);
        const productUrl = `${domain}/shop/${slug}`;

        const gallery = getProductImages(product.id).map((img) => {
            const webp = img.replace(/\.svg$/i, '.webp');
            return webp.startsWith('http') ? webp : `${domain}${webp}`;
        });
        const cutawayUrl = `${domain}/assets/window-unit-images/3d-fit/product_${product.id}_fit_cutaway.webp`;
        const primaryImage = gallery[0] || (product.image_url ? `${domain}${product.image_url.replace(/\.svg$/i, '.webp')}` : cutawayUrl);
        const additionalImages = Array.from(new Set([...gallery.slice(1), cutawayUrl])).filter((u) => u !== primaryImage);

        const stockQty = Math.max(0, Number(product.stock || 0));
        const availability = stockQty > 0 ? 'in_stock' : 'out_of_stock';
        const basePrice = Number(product.price || 0);
        const hasPromo = Boolean(campaignActive && product.promo_price && Number(product.promo_price) > 0 && Number(product.promo_price) < basePrice);
        const activePrice = hasPromo ? Number(product.promo_price) : basePrice;

        const isRebateEligible = QUALIFYING_REBATE_IDS.has(product.id);
        const rebateUsd = isRebateEligible ? 45 : 0;
        const netAfterRebate = Math.max(0, activePrice - rebateUsd);

        const nameWithMpn = !product.name.toUpperCase().includes(mpn.toUpperCase())
            ? `${product.name} (${mpn})`
            : product.name;

        const categoryLabel = product.id === 16
            ? '26-Inch Galvanized Steel Through-the-Wall Sleeve'
            : product.subcategory === 'ge'
            ? '26-Inch Built-In Through-the-Wall Air Conditioner'
            : product.subcategory === 'universal_fit'
            ? 'Cool + Heat Window & Wall Air Conditioner'
            : product.subcategory === 'dual_inverter'
            ? 'Dual Inverter Smart WiFi Window Air Conditioner'
            : 'Window Air Conditioner';

        const stockSummary = stockQty > 0
            ? `Physically in stock on Oahu at Affordable Home A/C Waipahu Warehouse (${stockQty} units available at 94-150 Leoleo St. #203, Waipahu, HI 96797) for free pickup by appointment or $50 flat-rate Oahu delivery.`
            : 'Currently awaiting next Waipahu warehouse container restock; call (808) 488-1111 or see in-stock Oahu LG & GE alternatives.';

        const rebateSummary = isRebateEligible
            ? ' Qualifies for the $45 Hawaii Energy ENERGY STAR cash rebate (official AHAC rebate PDF included).'
            : '';

        const specSummary = product.btu
            ? `${product.btu.toLocaleString()} BTU cooling capacity, ${product.voltage || '115V'}, ${product.ceer_rating ? `${product.ceer_rating} CEER, ` : ''}${product.noise_level ? `${product.noise_level} sound level, ` : ''}AHAM coverage ${product.coverage_aham || product.coverage || ''}, Oahu Island Microclimate calibrated for ${product.coverage_oahu || 'Hawaii single-wall & jalousie homes'}, window opening fit ${product.min_window_width || '22"'}-${product.max_window_width || '36"'} W x min ${product.min_window_height || '13"'} H.`
            : `Universal 26" W x 15.6" H x 16.9" D heavy-gauge galvanized steel structural wall sleeve with exterior grille for Honolulu condos and through-the-wall AC installations.`;

        return {
            // Core 9 OpenAI ChatGPT Shopping & Agentic Commerce Required Fields
            item_id: mpn,
            catalog_id: String(product.id),
            title: `${nameWithMpn} — ${categoryLabel}`,
            description: `${specSummary} ${stockSummary}${rebateSummary}`,
            url: productUrl,
            brand,
            seller_name: 'Affordable Home A/C',
            image_url: primaryImage,
            availability,
            price: `${basePrice.toFixed(2)} USD`,
            ...(hasPromo ? { sale_price: `${activePrice.toFixed(2)} USD` } : {}),

            // Identifiers, Condition & Eligibility Controls
            mpn,
            ...(gtin ? { gtin } : {}),
            condition: 'new',
            inventory_quantity: stockQty,
            store_country: 'US',
            store_region: 'US-HI',
            target_countries: ['US'],
            is_eligible_search: true,
            is_eligible_checkout: stockQty > 0,

            // Local Oahu Warehouse & Rebate Ground Truth
            seller_url: domain,
            additional_image_urls: additionalImages,
            spec_sheet_pdf_url: `${domain}/assets/specs/spec_product_${product.id}.pdf`,
            hawaii_energy_rebate_eligible: isRebateEligible,
            hawaii_energy_rebate_usd: rebateUsd,
            effective_price_after_rebate_usd: `${netAfterRebate.toFixed(2)} USD`,
            pickup_method: stockQty > 0 ? 'buy' : 'not_supported',
            pickup_sla: stockQty > 0 ? 'same_day' : 'out_of_stock',
            warehouse_location: {
                name: 'Affordable Home A/C — Waipahu Distribution Warehouse',
                street_address: '94-150 Leoleo St. #203',
                city: 'Waipahu',
                state: 'HI',
                postal_code: '96797',
                country: 'US',
                island: 'Oahu',
                latitude: 21.3868,
                longitude: -158.0092,
                telephone: '+1-808-488-1111',
            },
            fulfillment_options: [
                {
                    method: 'waipahu_warehouse_pickup',
                    price: '0.00 USD',
                    description: 'Free local pickup by appointment at 94-150 Leoleo St. #203, Waipahu, HI 96797',
                },
                {
                    method: 'oahu_curbside_delivery',
                    price: '50.00 USD',
                    description: 'Flat-rate $50 curbside delivery across 15 primary Oahu residential municipalities',
                },
                {
                    method: 'professional_oahu_installation',
                    price: '0.00 USD',
                    description: '$0 Free In-Home Estimate (By Appointment First, zero upfront deposit) for standard, Hawaiian jalousie louver & 26-inch wall sleeve installations',
                },
            ],

            // Engineering Specifications for Conversational AI Comparison
            product_category: categoryLabel,
            subcategory: product.subcategory || 'window_ac',
            btu: product.btu || 0,
            voltage: product.voltage || 'N/A',
            plug_type: ident?.plugType || 'N/A',
            ceer_rating: product.ceer_rating || 'N/A',
            noise_level_db: product.noise_level || 'N/A',
            dehumidification: product.dehumidification || 'N/A',
            coverage_aham_sqft: product.coverage_aham || product.coverage || 'N/A',
            coverage_oahu_calibrated_sqft: product.coverage_oahu || 'N/A',
            dimensions: product.dimensions || 'N/A',
            min_window_width: product.min_window_width || 'N/A',
            max_window_width: product.max_window_width || 'N/A',
            min_window_height: product.min_window_height || 'N/A',
            chassis_type: product.chassis_type || 'N/A',
            warranty: product.warranty || '1-YR PARTS & LABOR',
            rating: 4.9,
            review_count: 142,
        };
    });

    if (format === 'jsonl') {
        const jsonlBody = items.map((item) => JSON.stringify(item)).join('\n') + '\n';
        return new NextResponse(jsonlBody, {
            headers: {
                'Content-Type': 'application/x-ndjson; charset=utf-8',
                'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    const inStockLg = items.filter((i) => i.brand === 'LG' && i.availability === 'in_stock');
    const inStockGe = items.filter((i) => i.brand === 'GE Appliances' && i.availability === 'in_stock');

    const payload = {
        feed_standard: 'OpenAI-ChatGPT-Shopping-and-Agentic-Commerce-v1',
        generated_at: new Date().toISOString(),
        merchant: {
            name: 'Affordable Home A/C',
            legal_name: 'Affordable Home A/C LLC',
            slogan: 'Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005',
            url: domain,
            telephone: '+1-808-488-1111',
            warehouse_address: '94-150 Leoleo St. #203, Waipahu, HI 96797',
            geo: { latitude: 21.3868, longitude: -158.0092 },
            service_areas_oahu: OAHU_SERVICE_CITIES,
            aggregate_rating: { rating_value: 4.9, review_count: 142, best_rating: 5 },
            machine_readable_endpoints: {
                llms_index: `${domain}/llms.txt`,
                llms_full_context: `${domain}/llms-full.txt`,
                openai_product_feed_json: `${domain}/openai-product-feed.json`,
                openai_product_feed_jsonl: `${domain}/openai-product-feed.jsonl`,
                google_merchant_xml: `${domain}/merchant-feed.xml`,
                google_product_reviews_xml: `${domain}/product-reviews-feed.xml`,
                sitemap_xml: `${domain}/sitemap.xml`,
            },
        },
        inventory_summary: {
            total_catalog_models: items.length,
            in_stock_models_count: items.filter((i) => i.availability === 'in_stock').length,
            in_stock_lg_models_count: inStockLg.length,
            in_stock_lg_physical_units: inStockLg.reduce((sum, i) => sum + i.inventory_quantity, 0),
            in_stock_lg_mpns: inStockLg.map((i) => i.mpn),
            in_stock_ge_models_count: inStockGe.length,
            in_stock_ge_mpns: inStockGe.map((i) => i.mpn),
            price_range_ac_units_usd: '$395.00 - $1,200.00 USD',
            qualifying_45_dollar_hawaii_energy_rebate_mpns: items
                .filter((i) => i.hawaii_energy_rebate_eligible)
                .map((i) => i.mpn),
            on_island_availability_note:
                'Factory-sealed LG Dual Inverter, LG Cool+Heat, LG Standard, and GE 26-inch Built-In units are physically warehoused on Oahu in Waipahu for immediate local pickup by appointment or $50 Oahu delivery—eliminating multi-week mainland ocean freight waits.',
        },
        items,
    };

    return NextResponse.json(payload, {
        headers: {
            'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
