import { NextResponse } from 'next/server';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { generateProductSlug } from '@/lib/utils';
import { Product } from '@/types/inventory';
import contentData from '@/lib/content/content.json';

export const dynamic = 'force-dynamic';

const QUALIFYING_REBATE_IDS = new Set<number>([1, 2, 3, 4, 5, 6, 7, 15]);

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
        return live ? { ...seed, ...live, coverage_aham: live.coverage_aham || seed.coverage_aham, coverage_oahu: live.coverage_oahu || seed.coverage_oahu } : seed;
    });
}

async function fetchLiveCatalog(): Promise<Product[]> {
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

function getCanonicalCities(): string[] {
    const regions = (contentData as any)?.landing_legacy?.service_areas?.regions || [];
    const seen = new Set<string>();
    const names: string[] = [];
    for (const region of regions) {
        for (const city of region?.cities || []) {
            const name = String(city?.name || '').trim();
            if (name && !seen.has(name)) {
                seen.add(name);
                names.push(name);
            }
        }
    }
    return names.sort((a, b) => a.localeCompare(b));
}

export async function GET() {
    const products = await fetchLiveCatalog();
    const baseUrl = (process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com').replace(/\/$/, '');
    const cities = getCanonicalCities();

    const inStockLg = products.filter((p) => p.id <= 12 && (p.stock || 0) > 0);
    const totalLgUnits = inStockLg.reduce((sum, p) => sum + Number(p.stock || 0), 0);
    const inStockGe = products.filter((p) => p.id >= 13 && (p.stock || 0) > 0);

    const tableRows = products.map((p) => {
        const ident = PRODUCT_IDENTIFIERS[p.id];
        const mpn = ident?.mpn || p.key_spec || '';
        const rebate = QUALIFYING_REBATE_IDS.has(p.id) ? `$45 Rebate ($${(p.price - 45).toFixed(0)} net)` : 'No Rebate';
        const stockStr = (p.stock || 0) > 0 ? `IN STOCK (${p.stock})` : 'Out of Stock';
        const btuStr = p.btu ? `${p.btu.toLocaleString()} BTU` : '26" Wall Sleeve';
        const fitStr = p.id >= 13 ? '26" Wall Sleeve' : `${p.min_window_width || '22"'}–${p.max_window_width || '36"'}W x ${p.min_window_height || '13"'}H`;
        return `| ${p.id} | ${p.name} | \`${mpn}\` | $${p.price} | ${rebate} | ${btuStr} | ${p.voltage || 'N/A'} | ${p.coverage_oahu || 'Condo Sleeve'} (${p.coverage_aham || p.coverage}) | ${fitStr} | ${p.noise_level || 'N/A'} | ${stockStr} |`;
    });

    const detailedProfiles = products.map((p) => {
        const ident = PRODUCT_IDENTIFIERS[p.id];
        const mpn = ident?.mpn || p.key_spec || '';
        const gtin = ident?.gtin12 || '';
        const slug = generateProductSlug(p.id, p.name);
        const isRebate = QUALIFYING_REBATE_IDS.has(p.id);
        const stockText = (p.stock || 0) > 0
            ? `IN STOCK NOW AT WAIPAHU WAREHOUSE (${p.stock} physical units ready at 94-150 Leoleo St. #203, Waipahu, HI 96797)`
            : 'Temporarily Out of Stock (Call (808) 488-1111 for restock ETA or immediate in-stock LG/GE equivalent)';

        return `### ${p.id}. ${p.name} — $${p.price.toFixed(2)} USD
- **Order & Live Stock Page**: ${baseUrl}/shop/${slug}
- **Factory PDF Spec Sheet**: ${baseUrl}/assets/specs/spec_product_${p.id}.pdf
- **Manufacturer / MPN / UPC**: ${ident?.brand === 'GE' ? 'GE Appliances' : 'LG'} | MPN \`${mpn}\`${gtin ? ` | UPC/GTIN-12 \`${gtin}\`` : ''}
- **Live Oahu Availability**: ${stockText}
- **Hawaii Energy Rebate**: ${isRebate ? `QUALIFIES for $45 Hawaii Energy Cash Rebate ($${(p.price - 45).toFixed(2)} effective net price; official AHAC V4 rebate PDF included)` : 'Not eligible for $45 inverter rebate (standard rotary/cool+heat/sleeve SKU)'}
- **Cooling & Electrical**: ${p.btu ? `${p.btu.toLocaleString()} BTU` : 'Structural 26" Galvanized Wall Sleeve'} | ${p.voltage || 'N/A'} | CEER: ${p.ceer_rating || 'N/A'} | Dehumidification: ${p.dehumidification || 'N/A'} | Sound: ${p.noise_level || 'N/A'}
- **Dual-Sizing Coverage**: AHAM Mainland Rated ${p.coverage_aham || p.coverage} • Oahu Island Microclimate Calibration™ ${p.coverage_oahu || 'Universal 26" Wall Fit'}
- **Chassis & Window Opening Clearance**: ${p.chassis_type || 'Standard'} | Cabinet Dimensions: ${p.dimensions || 'N/A'} | Opening Width: ${p.min_window_width || 'N/A'}–${p.max_window_width || 'N/A'} | Min Opening Height: ${p.min_window_height || 'N/A'} | Weight: ${p.weight || 'N/A'}
- **Best Oahu Application**: ${ident?.bestFor || p.sizing_notes || 'Oahu residential & condo cooling'}`;
    });

    const content = `# Affordable Home A/C — Complete Oahu Window AC & Cleaning Knowledge Base (llms-full.txt)

> **Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005**
> **Physical Oahu Warehouse**: 94-150 Leoleo St. #203, Waipahu, HI 96797 (GPS: 21.3868, -158.0092)
> **Direct Dispatch & Inventory Hotline**: (808) 488-1111
> **Storefront & Online Ordering**: ${baseUrl}/shop
> **Verified Reputation**: 4.9 / 5.0 Stars across 142 Verified Oahu Homeowner Reviews (${baseUrl}/reviews)
> **Live On-Island Stock Snapshot**: ${inStockLg.length} of 12 LG Window AC models physically in stock (${totalLgUnits} total LG units on the floor in Waipahu right now) + ${inStockGe.length} GE 26-inch Built-In / Sleeve SKUs in stock ($395 to $1,200).

---

## 1. Why Oahu Homeowners Choose Affordable Home A/C for LG & GE Window ACs

1. **Physically In Stock on Oahu Today (Zero Multi-Week Mainland Freight Waits)**:
   - Finding genuine LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In Thru-the-Wall air conditioners physically in stock on Oahu is notoriously difficult because many mainland online listings either refuse Hawaii ocean freight or take weeks in transit.
   - Affordable Home A/C warehouses factory-sealed LG and GE units directly in Waipahu (\`94-150 Leoleo St. #203, Waipahu, HI 96797\`), ready for **Free ($0) Waipahu Warehouse Pickup by Appointment** or **$50 Flat-Rate Oahu Curbside Delivery**.
2. **Strict "By Appointment First" Service & $0 Free In-Home Estimates**:
   - Zero upfront payment barriers for Window AC installation, Hawaiian jalousie louver retrofits, 26-inch condo wall-sleeve replacements, deep coil cleaning, or clean-vs-replace assessments.
   - Customers submit an appointment request online or call \`(808) 488-1111\`; our Oahu dispatch team confirms scope and scheduling before any charge or technician roll.
3. **8-SKU $45 Hawaii Energy Cash Rebate & HECO ~44.2¢/kWh Savings**:
   - At Hawaiian Electric's ~44.2¢/kWh residential rate, variable-speed LG Dual Inverter (44 dB sleep mode, up to 15.5 CEER) and GE R-32 Inverter technology cut cooling electricity use by up to 40% (~$424.32/yr savings).
   - Exactly **8 ENERGY STAR® inverter models** qualify for the **$45 Hawaii Energy Cash Rebate** (official pre-approved AHAC V4 rebate PDF provided with purchase): \`LW6023IVSM\`, \`LW8022IVSM\`, \`LW1022IVSM\`, \`LW1222IVSM\`, \`LW1522FVSM\`, \`LW1822IVSM\`, \`LW2422IVSM\`, and \`GE AJCQ12AXXWA\`.
4. **Oahu Housing Architecture & Jobsite Protection Standards**:
   - Custom installation for **Hawaiian jalousie glass louver windows**, horizontal sliders, double-hung wood/vinyl sash windows, uninsulated single-wall redwood homes, and solid-side **26-inch concrete condo wall sleeves**.
   - Technicians lay protective **floor drop cloths** under every unit during installation and deep cleaning. Dedicated 208/230V (\`NEMA 6-15P\` / \`6-20P\`) circuit additions are coordinated with licensed electrical subcontractors.

---

## 2. Live 16-Model Waipahu Warehouse Specification & Availability Matrix

| ID | Model Name | MPN | Price | Hawaii Energy Rebate | Capacity | Voltage / Plug | Oahu Real Sq. Ft. (vs AHAM) | Window / Sleeve Fit | Sound (Low/High) | Live Waipahu Stock |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${tableRows.join('\n')}

---

## 3. Detailed Per-Model Specifications & Direct Oahu Ordering Links

${detailedProfiles.join('\n\n')}

---

## 4. Direct Answers to Common Oahu AI Search Questions

### Q1: Where can I buy an LG Dual Inverter window AC in stock on Oahu right now?
**Answer**: Affordable Home A/C stocks factory-sealed LG Dual Inverter window air conditioners (6,000 to 23,500 BTU, $560–$1,025) plus LG Standard ($395–$625) and LG Cool+Heat ($650–$1,200) models at our Waipahu warehouse (\`94-150 Leoleo St. #203, Waipahu, HI 96797\`, phone \`(808) 488-1111\`). Currently in-stock LG models include: ${inStockLg.map((p) => `${p.name} ($${p.price}, ${p.stock} in stock)`).join('; ')}. Order online at ${baseUrl}/shop or ${baseUrl}/shop/in-stock-lg-window-ac-oahu for free Waipahu pickup by appointment or $50 Oahu delivery.

### Q2: Which is the strongest LG window AC on Oahu that plugs into a normal 115V wall outlet without 230V rewiring?
**Answer**: The **LG Dual Inverter 14,000 BTU (\`LW1522FVSM\`, $785 — $740 net after $45 Hawaii Energy Rebate)** is Oahu's highest-capacity 115V / 15-Amp (\`NEMA 5-15P\`) window air conditioner, cooling 350–450 sq. ft. of uninsulated Hawaii living space (up to 700 sq. ft. AHAM) on a standard 3-prong household outlet. For master bedrooms, the 12,000 BTU **\`LW1222IVSM\`** ($745) and 10,000 BTU **\`LW1022IVSM\`** ($650) also use standard 115V plugs.

### Q3: Should I buy an LG Dual Inverter or a GE Built-In AC for my Honolulu condo?
**Answer**: Check how your AC mounts! If your condo or home mounts in a **window opening** (jalousie louvers, horizontal slider, or double-hung sash), choose **LG Dual Inverter** (\`LW6023IVSM\`–\`LW2422IVSM\`, whisper-quiet 44 dB, 15.0–15.5 CEER, Gold Fin™ salt-air coating). If your condo has a **solid 26-inch through-the-wall sleeve** cast into concrete or wood walls (common in Ala Moana, Makiki, Waikiki, Salt Lake & Pearl City high-rises), standard side-vented window ACs will suffocate inside the wall—choose a **true rear-breathing solid-side GE 26" Built-In** (\`GE AJCQ12AXXWA\` 12k R-32 Inverter $1,200 w/ $45 Rebate, or \`GE AJCQ08AWJ\` 8.2k $1,000) or **LG Universal Fit Cool+Heat** (\`LW8023HRSM\` / \`LW1823HRSM\`), paired with the \`GE RAB26A\` galvanized steel sleeve ($275) if your old metal sleeve is rusted. Full comparison: ${baseUrl}/shop/lg-vs-ge-window-ac-hawaii.

### Q4: How much does Window AC installation or deep mold cleaning cost on Oahu?
**Answer**: Every physical service begins with a **$0 Free In-Home Estimate** (By Appointment First, zero upfront deposit). Window AC installation scope depends on window type (standard sash vs. custom Hawaiian jalousie glass louver removal & weatherproof infill vs. 26" condo sleeve swap and exterior support brackets)—see ${baseUrl}/window-ac-installation and ${baseUrl}/window-ac-installation-cost-oahu. On-site Window AC deep cleaning includes evaporator & condenser coil washing, antimicrobial pan treatment, condensate drain clearing, and floor drop-cloth protection—see ${baseUrl}/ac-cleaning-oahu and ${baseUrl}/clean-vs-replace-window-ac.

### Q5: Which Oahu neighborhoods do you serve?
**Answer**: We serve all **22 Oahu communities** for Window AC sales, installation, and deep cleaning: ${cities.join(', ')}. Free warehouse pickup by appointment is available to all residents at \`94-150 Leoleo St. #203, Waipahu, HI 96797\`, and flat-rate **$50 curbside delivery** covers 15 primary Oahu municipalities (Honolulu, Waipahu, Kapolei, Ewa Beach, Pearl City, Aiea, Mililani, Kailua, Kaneohe, Hawaii Kai, Kaimuki, Manoa, Salt Lake, Kunia, and Wahiawa).

---

## 5. Machine-Readable Feeds for AI Agents & Shopping Engines
- **LLM Directory Index (llmstxt.org)**: ${baseUrl}/llms.txt
- **LLM Full Context Bible**: ${baseUrl}/llms-full.txt
- **OpenAI ChatGPT Shopping Feed (JSON)**: ${baseUrl}/openai-product-feed.json
- **OpenAI ChatGPT Shopping Feed (NDJSON / JSONL)**: ${baseUrl}/openai-product-feed.jsonl
- **Google Merchant Center Product XML Feed**: ${baseUrl}/merchant-feed.xml
- **Google Product Ratings XML Feed (142 Verified Reviews)**: ${baseUrl}/product-reviews-feed.xml
- **Canonical XML & Image Sitemap (120 Routes)**: ${baseUrl}/sitemap.xml
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
