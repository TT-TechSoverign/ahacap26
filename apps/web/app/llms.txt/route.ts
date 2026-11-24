import { NextResponse } from 'next/server';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { generateProductSlug } from '@/lib/utils';
import { Product } from '@/types/inventory';
import contentData from '@/lib/content/content.json';

export const dynamic = 'force-dynamic';

function getCanonicalCities(): { name: string; slug: string }[] {
    const regions = (contentData as any)?.landing_legacy?.service_areas?.regions || [];
    const seen = new Set<string>();
    const cities: { name: string; slug: string }[] = [];
    for (const region of regions) {
        for (const city of region?.cities || []) {
            const name = String(city?.name || '').trim();
            if (!name) continue;
            const slug = name.toLowerCase().replace(/\s+/g, '-');
            if (!seen.has(slug)) {
                seen.add(slug);
                cities.push({ name, slug });
            }
        }
    }
    return cities.sort((a, b) => a.name.localeCompare(b.name));
}

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
        const rebateText = (p.subcategory === 'dual_inverter' || p.id === 15) ? ' • Eligible for $45 Hawaii Energy Cash Rebate' : '';
        return `- [${p.name}](${baseUrl}/shop/${slug}): MPN ${mpn}${gtin ? `, UPC/GTIN ${gtin}` : ''} — $${p.price.toFixed(2)} | ${p.btu?.toLocaleString() || '26-Inch Sleeve'} BTU | ${p.voltage} | Coverage: ${p.coverage_aham || p.coverage} (${p.coverage_oahu || 'Oahu calibrated'}) | Noise: ${p.noise_level} | ${stockText}${rebateText}`;
    });

    const inStockLgCount = products.filter((p) => p.id <= 12 && (p.stock || 0) > 0).length;
    const totalLgUnits = products.filter((p) => p.id <= 12 && (p.stock || 0) > 0).reduce((s, p) => s + Number(p.stock || 0), 0);

    const content = `# Affordable Home A/C

> Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005. Official Oahu distribution warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797 • (808) 488-1111) with ${inStockLgCount} LG Window AC models (${totalLgUnits} physical LG units) plus GE 26-inch Built-In Thru-the-Wall air conditioners ($395 to $1,200) physically in stock on Oahu right now—ready for free Waipahu pickup by appointment, $50 Oahu delivery, custom Hawaiian jalousie louver & condo wall-sleeve installation ($0 Free In-Home Estimate), and antimicrobial Window AC deep coil cleaning across all 22 Oahu neighborhoods (4.9★ across 142 verified Oahu reviews).

Affordable Home A/C provides same-day/next-day free Waipahu warehouse pickup by appointment, $50 flat-rate Oahu curbside delivery across primary residential municipalities, $45 Hawaii Energy cash rebates on 8 qualifying ENERGY STAR inverter models (saving up to $424.32/yr at HECO's ~44.2¢/kWh rate), 1-year manufacturer warranties (2-year full / 5-year sealed system on GE AJCQ built-ins), and zero-upfront-fee ($0) in-home installation, cleaning, and clean-vs-replace assessments with mandatory floor drop-cloth protection.

## Core Storefront, Booking & Machine-Readable Feeds
- [Oahu Window AC Storefront ($395–$1,200)](${baseUrl}/shop): Order 16 factory-sealed LG Dual Inverter & GE 26" Built-In Window ACs online for Waipahu Pickup or $50 Oahu Delivery
- [In-Stock LG Window ACs on Oahu (All 12 Waipahu Models)](${baseUrl}/shop/in-stock-lg-window-ac-oahu): Live Oahu inventory of LG Dual Inverter, LG Cool+Heat & LG Standard units ($395–$1,200) with zero mainland freight wait
- [LG vs. GE Window & 26" Wall ACs Hawaii Comparison](${baseUrl}/shop/lg-vs-ge-window-ac-hawaii): Engineering comparison of side-vented LG Dual Inverters vs solid-side rear-breathing GE 26" condo built-ins
- [Window AC Deep Cleaning & Mold Sanitization](${baseUrl}/ac-cleaning-oahu): Book on-site Oahu evaporator/condenser coil cleaning, antimicrobial pan treatment & drain flushing ($0 Free Estimate)
- [Window AC & Hawaiian Jalousie Installation](${baseUrl}/window-ac-installation): Request a $0 Free In-Home Estimate for standard windows, jalousie glass louver retrofits & 26" condo sleeves
- [Clean vs Replace Window AC Assessment](${baseUrl}/clean-vs-replace-window-ac): Honest $0 on-site diagnostic comparing deep cleaning vs upgrading to an ENERGY STAR inverter unit
- [Full-Context AI & LLM Knowledge Base (llms-full.txt)](${baseUrl}/llms-full.txt): Complete single-file specification matrix, live Waipahu LG/GE stock counts, sizing rules & Oahu Q&A
- [OpenAI ChatGPT Shopping & Agentic Feed (JSON)](${baseUrl}/openai-product-feed.json): Live 16-SKU OpenAI Agentic Commerce JSON catalog with Waipahu inventory quantities & geo-coordinates
- [OpenAI ChatGPT Shopping Feed (NDJSON / JSONL)](${baseUrl}/openai-product-feed.jsonl): Line-delimited JSONL product stream for AI shopping ingestion
- [Google Merchant Center Product XML Feed](${baseUrl}/merchant-feed.xml): Live 16-SKU price, stock, GTIN/MPN & $45 rebate feed
- [Google Product Ratings XML Feed](${baseUrl}/product-reviews-feed.xml): 142 verified 5-star Oahu homeowner Window AC & cleaning reviews
- [Canonical XML & Image Sitemap](${baseUrl}/sitemap.xml): All 120 canonical Oahu Window AC routes

## Live Oahu Window AC Inventory (16 Models)
${productLines.join('\n')}

## Complete E-Commerce & BTU Buying Guides (30 Guides)
- [Oahu Window AC Storefront ($395–$1,200)](${baseUrl}/shop): Full interactive catalog with Island Microclimate Calibration™ & 3D window fit calipers
- [In-Stock LG Window ACs Oahu ($395–$1,200)](${baseUrl}/shop/in-stock-lg-window-ac-oahu): All 12 factory-sealed LG Dual Inverter, Cool+Heat & Standard models warehoused in Waipahu
- [LG vs. GE Window & 26" Wall ACs Hawaii Guide](${baseUrl}/shop/lg-vs-ge-window-ac-hawaii): Window sash/jalousie vs concrete condo 26-inch wall sleeve selection matrix
- [Oahu Window AC Warehouse Hub](${baseUrl}/shop/oahu-window-ac-warehouse): Central Waipahu distribution center overview & pickup logistics
- [Complete LG Dual Inverter Buyer Guide](${baseUrl}/shop/lg-dual-inverter-guide): Whisper-quiet 44dB variable-speed LG Dual Inverter lineup (6k–23.5k BTU)
- [LG Dual Inverter 8,000 BTU Bedroom Guide](${baseUrl}/shop/lg-dual-inverter-8000-btu-oahu): Oahu's #1 115V bedroom & studio inverter AC (LW8022IVSM)
- [10,000–12,000 BTU Master Bedroom & Condo Window AC Guide](${baseUrl}/shop/10000-12000-btu-window-ac-oahu): 115V standard-plug master bedroom & condo cooling (LW1022IVSM, LW1222IVSM, AJCQ12AXXWA)
- [Large Room 14,000–23,500 BTU Window AC Guide](${baseUrl}/shop/large-room-window-ac-oahu): Open-concept Oahu living room & commercial cooling (LW1522FVSM, LW1822IVSM, LW2422IVSM)
- [LG Cool + Heat Window AC Hawaii Guide](${baseUrl}/shop/lg-cool-and-heat-window-ac-hawaii): Year-round cooling + supplemental heating for Mililani, Wahiawa, Manoa & Nuuanu (7.6k–23k BTU)
- [LG Standard Budget Window AC Oahu Guide ($395–$625)](${baseUrl}/shop/lg-standard-budget-window-ac-oahu): Reliable rotary-compressor bedroom & rental units (LW8024RSMX, LW1217ERSM1)
- [GE 26" Thru-the-Wall Built-In AC Replacement Oahu](${baseUrl}/shop/ge-built-in-wall-ac-oahu): True 26" built-in condo & townhome chassis replacements (AJCQ10AWJ, AJCQ12AWJ, AJCQ12AXXWA)
- [26" Wall Sleeve Dimensions & GE RAB26A Caliper Guide](${baseUrl}/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu): Exact 26" W x 15-5/8" H x 16-7/8" D wall sleeve geometry & rust replacement
- [115V vs 230V Window AC Plug & Circuit Guide](${baseUrl}/shop/window-ac-plug-guide): NEMA 5-15P, 6-15P & 6-20P receptacle verification before ordering
- [$45 Hawaii Energy Window AC Rebate Guide](${baseUrl}/hawaii-energy-rebate): Official 8-SKU ENERGY STAR® inverter cash rebate eligibility & PDF form
- [HECO Window AC Electricity Cost Calculator (44.2¢/kWh)](${baseUrl}/window-ac-electricity-cost-heco-calculator-hawaii): Monthly Oahu kWh operating cost comparison across BTU sizes
- [Portable AC vs Window AC Hawaii Engineering Comparison](${baseUrl}/portable-ac-vs-window-ac-hawaii): Why dual-ductless window ACs outperform single-hose portable units in Hawaii humidity
- [Property Manager & Landlord Multi-Unit Window AC Program](${baseUrl}/property-manager-landlord-window-ac-oahu): Standardized rental fleet replacements & Waipahu staging
- [Quiet 44dB Bedroom Window AC Oahu Guide](${baseUrl}/quiet-bedroom-window-ac-oahu): Ultra-quiet sleep-mode inverter air conditioners
- [Living Room Window AC Oahu Guide (12k–23.5k BTU)](${baseUrl}/living-room-window-ac-oahu): High-airflow cooling for Hawaiian great rooms
- [Small Room 6,000–8,000 BTU 115V Window ACs](${baseUrl}/small-room-window-ac-6000-8000-btu): Compact bedroom, nursery & home office cooling
- [ENERGY STAR Window Air Conditioners Hawaii](${baseUrl}/energy-star-window-air-conditioners-hawaii): High-CEER inverter units engineered for HECO rate relief
- [Smart WiFi Window ACs (LG ThinQ & GE SmartHQ)](${baseUrl}/smart-wifi-window-ac-oahu): App-controlled scheduling & kWh energy monitoring
- [115V Standard Plug Low-Voltage Window ACs](${baseUrl}/low-voltage-window-ac-115v-oahu): Plug-and-play 115V / 15A household outlet models up to 14,000 BTU
- [Inverter vs Standard Window AC Comparison](${baseUrl}/inverter-window-ac-vs-standard-hawaii): Variable-speed compressor vs fixed-speed rotary payback math
- [Studio & Apartment Window ACs Hawaii](${baseUrl}/window-ac-for-studios-apartments-hawaii): Compact Honolulu apartment & walk-up cooling solutions
- [Commercial & Office Window ACs Oahu](${baseUrl}/commercial-window-ac-oahu): Heavy-duty cooling for Oahu offices, clinics, shops & jobsite trailers
- [Window AC Replacement Oahu](${baseUrl}/window-ac-replacement-oahu): Haul-away & direct swap upgrades for aging rusted units
- [Waipahu Warehouse Free Pickup by Appointment](${baseUrl}/window-ac-warehouse-pickup-waipahu): Same-day staging at 94-150 Leoleo St #203, Waipahu
- [$50 Flat-Rate Oahu Window AC Delivery](${baseUrl}/window-ac-delivery-service-oahu): Island curbside delivery schedule & municipality coverage
- [1–5 Yr Factory Warranty & Local Waipahu Support](${baseUrl}/window-ac-warranty-waipahu): LG & GE manufacturer warranty coverage details

## Hawaii Architecture, Jalousie & Condo Installation Guides (18 Guides)
- [Oahu Window AC Installation Hub ($0 Free Estimate)](${baseUrl}/window-ac-installation): Professional Oahu window, jalousie & thru-the-wall installation
- [Oahu Window AC Installation Cost & Itemized Factors Guide](${baseUrl}/window-ac-installation-cost-oahu): Transparent scope factors for standard, jalousie & sleeve retrofits
- [230V Window AC Outlet (NEMA 6-15 & 6-20) Guide](${baseUrl}/230v-window-ac-outlet-nema-6-15-6-20-oahu): High-voltage circuit requirements & licensed electrical subcontractor coordination
- [Oahu BTU & Window Fit Sizing Calculator](${baseUrl}/sizing): Interactive heat-load & window opening dimension wizard
- [Hawaiian Jalousie Louver Window AC Installation](${baseUrl}/jalousie-window-ac-installation-oahu): Custom louver glass removal, framing & weatherproof perimeter sealing
- [Single-Wall Redwood Construction AC Sizing Hawaii](${baseUrl}/single-wall-construction-ac-cooling-hawaii): Uninsulated tongue-and-groove heat gain calibration
- [Horizontal Sliding Window AC Installation Oahu](${baseUrl}/horizontal-sliding-window-ac-oahu): Vertical track bracing & custom upper filler panels
- [Double-Hung Sash Window AC Installation Hawaii](${baseUrl}/double-hung-window-ac-installation-hawaii): Sash lock stabilization & tilt-angle condensate pitch
- [Exterior Cantilever Support Brackets & Mounting](${baseUrl}/ac-brackets-exterior-security-mounting-oahu): Heavy-duty load transfer off fragile window sills
- [Trade-Wind Weather Stripping & Island Seal](${baseUrl}/window-ac-weather-stripping-island-seal): Blocking humid trade-wind air leaks, geckos & insects
- [Condo & Townhouse Window AC HOA Rules Oahu](${baseUrl}/condo-townhouse-window-ac-hoa-rules-oahu): AOAO architectural approval, decibel limits & flush exterior fit
- [High-Rise Condo Window AC Rules Honolulu](${baseUrl}/high-rise-condo-ac-rules-honolulu): Non-protruding 26" wall-sleeve & condensate compliance
- [Renter-Friendly No-Damage Window AC Mounting](${baseUrl}/renter-friendly-ac-installation-oahu): Reversible lease-compliant installation methods
- [Wood-Frame Window Sill Support & Rot Prevention](${baseUrl}/wood-frame-window-ac-support-oahu): Protecting classic Hawaii wood window frames from moisture
- [Vinyl Replacement Window AC Track Protection](${baseUrl}/vinyl-replacement-window-ac-mounting): Distributing chassis weight safely across hollow vinyl sills
- [Security Bars Window AC Clearance & Installation](${baseUrl}/security-bars-window-ac-installation-oahu): Measuring burglar-bar depth & condenser airflow clearance
- [Narrow Window AC Fit Solutions (<22" Wide)](${baseUrl}/narrow-window-ac-solutions-hawaii): Compact-chassis models for tight Oahu window openings
- [Condo Condensate Drain Routing & Drip Control](${baseUrl}/ac-condensation-drain-routing-condos): Preventing lanai & facade water dripping violations

## Window AC Deep Coil Cleaning & Mold Remediation Guides (15 Guides)
- [Oahu Window AC Deep Cleaning Hub ($0 Estimate)](${baseUrl}/ac-cleaning-oahu): Complete evaporator/condenser coil wash & antimicrobial treatment
- [Window AC Cleaning vs Repair vs Replacement Cost Guide](${baseUrl}/window-ac-cleaning-vs-repair-cost-oahu): Honest economic break-even framework for Oahu homeowners
- [$0 Free Clean-vs-Replace Window AC Assessment](${baseUrl}/clean-vs-replace-window-ac): On-site inspection before you spend money cleaning an aging unit
- [Window AC Mold Removal & Deep Cleaning Oahu](${baseUrl}/ac-mold-removal-cleaning-oahu): Remediating tropical biofilm inside blower wheels & air tunnels
- [Musty Mildew Odor & Dirty Sock Syndrome Fix](${baseUrl}/ac-smells-musty-mildew-hawaii): Eliminating sour startup odors on humid Oahu days
- [Black Mold in Window AC Health Risks & Purge](${baseUrl}/black-mold-in-ac-health-risks-hawaii): Deep internal sanitization vs DIY surface wiping
- [Coil Cleaning Benefits for HECO Power Bills](${baseUrl}/ac-coil-cleaning-benefits-power-bill): Restoring heat-transfer efficiency & lowering kWh draw
- [Blower Wheel 360-Degree Fan Scrubbing](${baseUrl}/air-conditioner-blower-wheel-cleaning-hawaii): Restoring full CFM airflow on caked squirrel-cage fans
- [Condensate Drain Line & Slinger Pan Clearing](${baseUrl}/ac-drain-line-clog-clearing-oahu): Flushing algae sludge to stop indoor water leaks
- [Reusable Air Filter Wash & Sanitization](${baseUrl}/clean-air-filter-replacement-hawaii): Monthly filter maintenance for Oahu dust & salt air
- [Coastal Salt-Air Corrosion Coil Rinse](${baseUrl}/salt-corrosion-coil-rinse-hawaii): Protecting aluminum condenser fins in Kailua, Ewa, Hawaii Kai & Waianae
- [Post-Storm & Kona Wind Window AC Cleaning](${baseUrl}/post-storm-ac-inspection-cleaning-oahu): Clearing red dirt, vog & storm debris from outdoor coils
- [Pet Hair & Dander Coil Cleaning Oahu](${baseUrl}/pet-hair-dander-ac-cleaning-oahu): Removing matted pet fur from evaporator fins
- [6 & 12-Month Seasonal AC Maintenance Plans](${baseUrl}/seasonal-ac-maintenance-plans-oahu): Proactive island humidity & coil hygiene recalls
- [Commercial Office & Retail Window AC Cleaning](${baseUrl}/commercial-ac-cleaning-oahu): Multi-unit scheduled maintenance for Oahu businesses

## Window AC Repair & Symptom Troubleshooting Guides (14 Guides)
- [Oahu Window AC Repair & Diagnostics Hub](${baseUrl}/ac-repair-oahu): Window AC symptom triage & honest repair-vs-replace guidance
- [$0 Window AC Diagnostic & Bench Assessment Oahu](${baseUrl}/window-ac-diagnostic-assessment-oahu): Zero-upfront-cost troubleshooting across Oahu
- [Window AC Blowing Warm Air Troubleshooting](${baseUrl}/ac-blowing-warm-air-troubleshooting-oahu): Diagnosing dirty coils, thermal overload vs compressor failure
- [Frozen Evaporator Coils & Ice Buildup Fix](${baseUrl}/ac-freezing-up-ice-on-coils-hawaii): Airflow restriction vs low-charge sealed-system icing
- [Window AC Leaking or Dripping Water Inside](${baseUrl}/ac-dripping-water-inside-house-repair): Fixing negative pitch, clogged drain channels & slinger rings
- [Window AC Keeps Tripping Breaker / LCDI Plug](${baseUrl}/ac-keeps-tripping-breaker-hawaii): Shared-circuit overload vs shorted compressor diagnosis
- [Blinking Filter Light & LG/GE CH Error Codes](${baseUrl}/blinking-light-error-codes-ac-repair): Decoding CH01–CH67 thermistor & inverter fault codes
- [Window AC Compressor Not Turning On Oahu](${baseUrl}/ac-compressor-not-turning-on-oahu): Start capacitor, relay & overload protector checks
- [Window AC Making Loud Buzzing or Rattling Noise](${baseUrl}/window-ac-making-loud-buzzing-noise): Isolating loose jalousie glass, fan shrouds & compressor mounts
- [Sealed System Refrigerant Leak Evaluation](${baseUrl}/ac-refrigerant-leak-detection-hawaii): Why sealed R-32/R-410A window AC leaks favor warehouse-direct replacement
- [Rapid On/Off Short Cycling Troubleshooting](${baseUrl}/ac-turning-on-and-off-rapidly-short-cycling): Fixing blocked airflow, thermistor placement & oversized cycling
- [No Power to Window AC Unit Troubleshooting](${baseUrl}/no-power-to-ac-unit-hawaii): LCDI plug reset, GFCI outlet & breaker checks
- [Burning Electrical Smell Emergency Guide](${baseUrl}/ac-burning-electrical-smell-oahu): Immediate safety shutoff & motor/wiring inspection
- [Condenser Fan Motor Not Spinning Fix](${baseUrl}/outdoor-unit-fan-not-spinning-hawaii): Seized coastal fan bearings & capacitor diagnostics

## All 22 Oahu Service Areas & Trust Hubs
- [All Oahu Service Areas Directory](${baseUrl}/service-areas): Island-wide Window AC delivery, installation & cleaning coverage
- [Verified Oahu Customer Reviews (4.9★ across 142 reviews)](${baseUrl}/reviews): Authentic neighborhood reviews from Oahu homeowners
- [Contact & $0 Free In-Home Estimate Booking](${baseUrl}/contact): By-Appointment-First scheduling & Waipahu pickup requests
- [Complete HTML Sitemap](${baseUrl}/sitemap): Full directory of all 120 canonical routes
${getCanonicalCities().map((c) => `- [${c.name} Window ACs, Installation & Cleaning](${baseUrl}/service-areas/${c.slug}): Local LG & GE Window AC inventory, jalousie installation & deep cleaning in ${c.name}, Oahu`).join('\n')}
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
