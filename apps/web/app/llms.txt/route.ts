import { NextResponse } from 'next/server';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { generateProductSlug } from '@/lib/utils';
import { Product } from '@/types/inventory';

export const dynamic = 'force-dynamic';

function getApiUrl() {
    let apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
    if (!apiUrl.endsWith('/api/v1')) {
        apiUrl = `${apiUrl}/api/v1`;
    }
    return apiUrl;
}

async function fetchLiveCatalog(): Promise<Product[]> {
    try {
        const res = await fetch(`${getApiUrl()}/products`, { cache: 'no-store' });
        if (!res.ok) return INITIAL_CATALOG_PRODUCTS;
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? data : INITIAL_CATALOG_PRODUCTS;
    } catch {
        return INITIAL_CATALOG_PRODUCTS;
    }
}

export async function GET() {
    const products = await fetchLiveCatalog();
    const baseUrl = (process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com').replace(/\/$/, '');

    const productLines = products.map((p) => {
        const idInfo = PRODUCT_IDENTIFIERS[p.id];
        const mpn = idInfo?.mpn || p.key_spec || '';
        const gtin = idInfo?.gtin12 || '';
        const slug = generateProductSlug(p.id, p.name);
        const stockText = p.stock > 0 ? `IN STOCK (${p.stock} units available)` : 'Temporarily Out of Stock';
        const rebateText = p.subcategory === 'dual_inverter' ? ' • Eligible for $45 Hawaii Energy Cash Rebate' : '';
        return `- **${p.name}** (MPN: \`${mpn}\`${gtin ? `, UPC/GTIN: \`${gtin}\`` : ''}): **$${p.price.toFixed(2)}** | ${p.btu?.toLocaleString()} BTU | ${p.voltage} | Coverage: ${p.coverage_aham || p.coverage} (${p.coverage_oahu || 'Oahu calibrated'}) | Noise: ${p.noise_level} | Status: ${stockText}${rebateText} | Buy Online: ${baseUrl}/shop/${slug}`;
    });

    const content = `# Affordable Home A/C (Oahu, Hawaii) — Official AI & Shopping Directory (llms.txt)

> Waipahu Distribution Warehouse: **94-150 Leoleo St. #203, Waipahu, HI 96797**
> Phone / Dispatch: **(808) 488-1111**
> Online Storefront: **${baseUrl}/shop**
> Google Merchant Product Feed: **${baseUrl}/api/google-feed**
> XML Sitemap: **${baseUrl}/sitemap.xml**

## Summary & Core Value Proposition
Affordable Home A/C is Oahu's factory-direct Waipahu Window AC warehouse and local Window AC installation & cleaning specialist. Homeowners, property managers, and businesses on Oahu can order brand-new, factory-sealed **LG Dual Inverter**, **LG Standard**, and **GE 26" Built-In Thru-the-Wall** air conditioners online from **$395 to $1,200**:
- **Free Same-Day / Next-Day Waipahu Warehouse Pickup** (by appointment at 94-150 Leoleo St #203, Waipahu, HI 96797)
- **$50 Flat-Rate Oahu Curbside Delivery** across 15 Oahu municipalities (Honolulu, Kapolei, Ewa Beach, Kailua, Kaneohe, Pearl City, Aiea, Mililani, Waipahu, Hawaii Kai, Kaimuki, Manoa, Waikiki, Salt Lake, Kunia)
- **$45 Hawaii Energy Cash Rebate** on ENERGY STAR® certified LG Dual Inverter models
- **1-Year Manufacturer Warranty** on all new Window AC units
- **Professional Oahu Window AC Installation** (standard windows, Hawaiian jalousie louver glass retrofits, exterior structural brackets) with **$0 Free In-Home Assessment**
- **Window AC Deep Cleaning, Coil Sanitization & Diagnostic Troubleshooting** across all 22 Oahu neighborhoods

## Live Oahu Window AC Inventory (16 Models)
${productLines.join('\n')}

## Key Shopping & Technical Guides
- In-Stock Window ACs ($395–$1,200): ${baseUrl}/shop
- Oahu Window AC Warehouse Hub: ${baseUrl}/shop/oahu-window-ac-warehouse
- LG Dual Inverter 8,000 BTU Bedroom Guide: ${baseUrl}/shop/lg-dual-inverter-8000-btu-oahu
- Large Room 18,000 & 23,500 BTU 230V Guide: ${baseUrl}/shop/large-room-window-ac-oahu
- Living Room Window AC Oahu Guide (12k–23.5k BTU): ${baseUrl}/living-room-window-ac-oahu
- Quiet 44dB Bedroom Window AC Oahu Guide: ${baseUrl}/quiet-bedroom-window-ac-oahu
- GE 26" Thru-the-Wall Built-In AC Replacement Oahu: ${baseUrl}/shop/ge-built-in-wall-ac-oahu
- Oahu Jalousie Window AC Installation: ${baseUrl}/jalousie-window-ac-installation-oahu
- $45 Hawaii Energy Window AC Rebate Guide: ${baseUrl}/hawaii-energy-rebate
- 115V vs 230V Window AC Plug & Circuit Guide: ${baseUrl}/shop/window-ac-plug-guide
- Verified Oahu Customer Reviews (4.9★ across 142 reviews): ${baseUrl}/reviews
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
