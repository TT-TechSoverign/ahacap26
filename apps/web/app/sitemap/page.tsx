import Link from 'next/link';
import { Metadata } from 'next';
import { Product } from '@/types/inventory';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { generateProductSlug } from '@/lib/utils';
import { BackToTop } from '@/components/BackToTop';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import contentData from '@/lib/content/content.json';
import { Navigation, ArrowRight, Package, MapPin, Wrench, Shield, Home, ShoppingCart, AlertCircle, Sparkles } from 'lucide-react';

export const revalidate = 86400;

export const metadata: Metadata = {
    title: {
        absolute: 'Oahu Window AC Sitemap & Directory ($395–$1,200) | Affordable Home A/C'
    },
    description: 'Browse all 118 pages of Affordable Home A/C: 16 in-stock LG & GE Window ACs ($395–$1,200), 22 Oahu cities, $0 Estimate install & cleaning • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/sitemap',
    },
    openGraph: {
        title: 'Oahu Window AC Sitemap & Directory ($395–$1,200) | Affordable Home A/C',
        description: 'Browse all 118 pages of Affordable Home A/C: 16 in-stock LG & GE Window ACs ($395–$1,200), 22 Oahu cities, $0 Estimate install & cleaning • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/sitemap',
        siteName: 'Affordable Home A/C',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Affordable Home A/C Complete Oahu Window AC Directory',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oahu Window AC Sitemap & Directory ($395–$1,200) | Affordable Home A/C',
        description: 'Browse all 118 pages of Affordable Home A/C: 16 in-stock LG & GE Window ACs ($395–$1,200), 22 Oahu cities, $0 Estimate install & cleaning • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default async function SitemapPage() {
    let products: Product[] = INITIAL_CATALOG_PRODUCTS;
    
    try {
        let apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
        if (!apiUrl.endsWith('/api/v1')) {
            apiUrl = `${apiUrl}/api/v1`;
        }

        const res = await fetch(`${apiUrl}/products`, {
            next: { revalidate: 86400 }
        });

        if (res.ok) {
            const liveProducts = await res.json();
            if (Array.isArray(liveProducts) && liveProducts.length > 0) {
                products = liveProducts;
            }
        }
    } catch (error) {
        console.error('[HTML Sitemap] Failed to fetch products, using INITIAL_CATALOG_PRODUCTS fallback:', error);
    }

    const coreServices = [
        { name: 'Home', path: '/' },
        { name: 'Verified Customer Reviews (142+)', path: '/reviews' },
        { name: 'Shop Inventory ($395–$1,200)', path: '/shop' },
        { name: 'Window AC Installation', path: '/window-ac-installation' },
        { name: 'Window AC Deep Cleaning Oahu', path: '/ac-cleaning-oahu' },
        { name: 'Window AC Repair & Diagnostics', path: '/ac-repair-oahu' },
        { name: 'Clean vs Replace Window AC Guide', path: '/clean-vs-replace-window-ac' },
        { name: 'Interactive AC Sizing Calculator', path: '/sizing' },
        { name: 'Oahu Service Areas Directory', path: '/service-areas' },
        { name: 'Contact Us & Free Assessment', path: '/contact' },
    ];

    const windowAcShoppingGuides = [
        { name: 'Oahu Window AC Warehouse Hub', path: '/shop/oahu-window-ac-warehouse' },
        { name: 'Complete LG Dual Inverter Buyer Guide', path: '/shop/lg-dual-inverter-guide' },
        { name: 'LG Dual Inverter 8,000 BTU Oahu Guide', path: '/shop/lg-dual-inverter-8000-btu-oahu' },
        { name: '10,000–12,000 BTU Master Bedroom & Condo Window ACs', path: '/shop/10000-12000-btu-window-ac-oahu' },
        { name: 'Large Room Window AC (14K–23.5K BTU)', path: '/shop/large-room-window-ac-oahu' },
        { name: 'LG Cool + Heat Window ACs Hawaii (7.6K–23K BTU)', path: '/shop/lg-cool-and-heat-window-ac-hawaii' },
        { name: 'LG Standard Budget Window ACs ($395–$685)', path: '/shop/lg-standard-budget-window-ac-oahu' },
        { name: 'GE 26" Built-In Through-the-Wall AC Guide', path: '/shop/ge-built-in-wall-ac-oahu' },
        { name: '26" Wall Sleeve Dimensions & GE RAB26A Caliper Guide', path: '/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu' },
        { name: '115V vs 230V Window AC Plug Guide', path: '/shop/window-ac-plug-guide' },
        { name: 'Hawaii Energy $45 Window AC Rebate', path: '/hawaii-energy-rebate' },
        { name: 'HECO Window AC Electricity Cost Calculator (44.2¢/kWh)', path: '/window-ac-electricity-cost-heco-calculator-hawaii' },
        { name: 'Portable AC vs Window AC Hawaii Engineering Guide', path: '/portable-ac-vs-window-ac-hawaii' },
        { name: 'Property Manager & Landlord Multi-Unit Window ACs', path: '/property-manager-landlord-window-ac-oahu' },
        { name: 'Window AC Warehouse Pickup Waipahu', path: '/window-ac-warehouse-pickup-waipahu' },
        { name: 'Window AC Flat $50 Delivery Service', path: '/window-ac-delivery-service-oahu' },
        { name: 'Energy Star Window Air Conditioners', path: '/energy-star-window-air-conditioners-hawaii' },
        { name: 'Dual Inverter vs Standard Window AC', path: '/inverter-window-ac-vs-standard-hawaii' },
        { name: 'Quiet Bedroom Window AC (44 dB)', path: '/quiet-bedroom-window-ac-oahu' },
        { name: 'Living Room Window AC (12K–23.5K BTU)', path: '/living-room-window-ac-oahu' },
        { name: 'Small Room Window AC (6K–8K BTU 115V)', path: '/small-room-window-ac-6000-8000-btu' },
        { name: 'Window AC for Studios & Apartments', path: '/window-ac-for-studios-apartments-hawaii' },
        { name: '115V Low-Voltage Window AC Units', path: '/low-voltage-window-ac-115v-oahu' },
        { name: 'Smart Wi-Fi Window AC (LG ThinQ)', path: '/smart-wifi-window-ac-oahu' },
        { name: 'Window AC Replacement & Haul-Away', path: '/window-ac-replacement-oahu' },
        { name: 'Commercial Window AC (Jobsite Trailers & Retail)', path: '/commercial-window-ac-oahu' },
        { name: 'Window AC Warranty & Waipahu Bench Support', path: '/window-ac-warranty-waipahu' },
    ];

    const housingArchitectureGuides = [
        { name: 'Oahu Window AC Installation Cost & Itemized Factors', path: '/window-ac-installation-cost-oahu' },
        { name: '230V Window AC Outlet (NEMA 6-15 & 6-20) Guide', path: '/230v-window-ac-outlet-nema-6-15-6-20-oahu' },
        { name: 'Jalousie Window AC Installation Oahu', path: '/jalousie-window-ac-installation-oahu' },
        { name: 'Horizontal Sliding Window AC Installation', path: '/horizontal-sliding-window-ac-oahu' },
        { name: 'Single-Wall Construction AC Cooling Hawaii', path: '/single-wall-construction-ac-cooling-hawaii' },
        { name: 'AC Exterior Support Brackets & Mounting', path: '/ac-brackets-exterior-security-mounting-oahu' },
        { name: 'Window AC Weather Stripping & Island Seal', path: '/window-ac-weather-stripping-island-seal' },
        { name: 'Condo & Townhouse Window AC HOA Rules', path: '/condo-townhouse-window-ac-hoa-rules-oahu' },
        { name: 'High-Rise Condo Window AC Rules Honolulu', path: '/high-rise-condo-ac-rules-honolulu' },
        { name: 'Renter-Friendly No-Damage AC Installation', path: '/renter-friendly-ac-installation-oahu' },
        { name: 'Double-Hung Sash Window AC Installation', path: '/double-hung-window-ac-installation-hawaii' },
        { name: 'Wood-Frame Window AC Support (Rot Prevention)', path: '/wood-frame-window-ac-support-oahu' },
        { name: 'Vinyl Replacement Window AC Mounting', path: '/vinyl-replacement-window-ac-mounting' },
        { name: 'Security Bars Window AC Installation', path: '/security-bars-window-ac-installation-oahu' },
        { name: 'Narrow Window AC Solutions (Under 22" Wide)', path: '/narrow-window-ac-solutions-hawaii' },
        { name: 'AC Condensation Drain Routing for Condos', path: '/ac-condensation-drain-routing-condos' },
    ];

    const cleaningGuides = [
        { name: 'Window AC Cleaning vs Repair vs Replace Cost Guide', path: '/window-ac-cleaning-vs-repair-cost-oahu' },
        { name: 'AC Mold Removal & Deep Cleaning Oahu', path: '/ac-mold-removal-cleaning-oahu' },
        { name: 'AC Smells Musty & Mildew in Hawaii (Dirty Sock Syndrome)', path: '/ac-smells-musty-mildew-hawaii' },
        { name: 'Black Mold in AC: Health Risks & Spore Eradication', path: '/black-mold-in-ac-health-risks-hawaii' },
        { name: 'Seasonal AC Maintenance Plans Oahu', path: '/seasonal-ac-maintenance-plans-oahu' },
        { name: 'Commercial AC Cleaning (Retail, Dental & Offices)', path: '/commercial-ac-cleaning-oahu' },
        { name: 'AC Coil Cleaning Benefits: Cut HECO Power Bills', path: '/ac-coil-cleaning-benefits-power-bill' },
        { name: 'AC Blower Wheel Cleaning (360° Fan Scrub)', path: '/air-conditioner-blower-wheel-cleaning-hawaii' },
        { name: 'AC Drain Line Clog Clearing & Flushing', path: '/ac-drain-line-clog-clearing-oahu' },
        { name: 'AC Air Filter Cleaning & Care in Hawaii', path: '/clean-air-filter-replacement-hawaii' },
        { name: 'Salt Corrosion & Marine Coil Rinse Hawaii', path: '/salt-corrosion-coil-rinse-hawaii' },
        { name: 'Post-Storm AC Inspection & Cleaning Oahu', path: '/post-storm-ac-inspection-cleaning-oahu' },
        { name: 'Pet Hair & Dander AC Cleaning Oahu', path: '/pet-hair-dander-ac-cleaning-oahu' },
    ];

    const diagnosticGuides = [
        { name: '$0 Window AC Diagnostic & Bench Assessment Oahu', path: '/window-ac-diagnostic-assessment-oahu' },
        { name: 'AC Compressor Not Turning On Oahu', path: '/ac-compressor-not-turning-on-oahu' },
        { name: 'Window AC Making Loud Buzzing Noise', path: '/window-ac-making-loud-buzzing-noise' },
        { name: 'AC Refrigerant Leak Detection & Coil Inspection', path: '/ac-refrigerant-leak-detection-hawaii' },
        { name: 'AC Turning On & Off (Short Cycling)', path: '/ac-turning-on-and-off-rapidly-short-cycling' },
        { name: 'No Power to AC Unit: Breaker & Plug Checks', path: '/no-power-to-ac-unit-hawaii' },
        { name: 'AC Burning Electrical Smell? Emergency Actions', path: '/ac-burning-electrical-smell-oahu' },
        { name: 'Condenser Fan Not Spinning in Hawaii', path: '/outdoor-unit-fan-not-spinning-hawaii' },
        { name: 'AC Blowing Warm Air Troubleshooting', path: '/ac-blowing-warm-air-troubleshooting-oahu' },
        { name: 'AC Freezing Up & Ice on Coils', path: '/ac-freezing-up-ice-on-coils-hawaii' },
        { name: 'AC Dripping Water Inside House Repair', path: '/ac-dripping-water-inside-house-repair' },
        { name: 'AC Keeps Tripping Breaker Hawaii', path: '/ac-keeps-tripping-breaker-hawaii' },
        { name: 'Blinking Light Error Codes AC Repair', path: '/blinking-light-error-codes-ac-repair' },
    ];

    const content = contentData as any;
    const regions = content?.landing_legacy?.service_areas?.regions || [];
    const cityRoutes: { name: string, path: string }[] = [];
    regions.forEach((region: any) => {
        if (region.cities) {
            region.cities.forEach((city: any) => {
                const citySlug = city.name.toLowerCase().replace(/ /g, '-');
                cityRoutes.push({ name: city.name, path: `/service-areas/${citySlug}` });
            });
        }
    });

    cityRoutes.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="bg-[#05070a] min-h-screen text-slate-200">
            <main className="pt-[96px] md:pt-[180px] pb-24 px-4 md:px-8 max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center md:text-left mb-16 space-y-4 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 justify-center md:justify-start">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300">Complete Site Directory</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-header font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">
                        Sitemap & Directory
                    </h1>
                    <p className="text-slate-400 max-w-3xl text-sm md:text-base font-medium leading-relaxed">
                        A comprehensive 118-page directory of Affordable Home A/C&apos;s Oahu cooling infrastructure: 16 in-stock Waipahu LG &amp; GE models ($395–$1,200), specialized Hawaii housing installation guides, antimicrobial cleaning hubs, diagnostic solvers, and all 22 Oahu service areas.
                    </p>

                    <nav aria-label="Sitemap Quick Jump" className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 text-[11px] font-mono">
                        <span className="text-slate-400 uppercase font-bold tracking-wider mr-1">Jump To:</span>
                        <a href="#oahu-sitemap-summary-table" className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Hub Summary Table</a>
                        <a href="#core-services" className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Core Hubs</a>
                        <a href="#in-stock-models" className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">16 LG &amp; GE Models</a>
                        <a href="#city-areas" className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">22 Oahu Cities</a>
                        <a href="#sitemap-faqs" className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Directory FAQs</a>
                    </nav>
                </div>

                {/* Semantic Hub Summary Table for Google Structured Table Snippets */}
                <section className="mb-14 rounded-3xl bg-white/[0.02] border border-white/10 p-6 md:p-8">
                    <h2 className="text-lg md:text-xl font-header font-black uppercase tracking-wider text-white mb-4">
                        Affordable Home A/C — 118-Page Oahu Directory Overview
                    </h2>
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80">
                        <table id="oahu-sitemap-summary-table" className="w-full text-left border-collapse text-xs">
                            <caption className="sr-only">Summary of all 118 canonical pages across Affordable Home A/C Oahu divisions.</caption>
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                    <th scope="col" className="py-2.5 px-4">Oahu Cooling Division</th>
                                    <th scope="col" className="py-2.5 px-4">Primary Hub</th>
                                    <th scope="col" className="py-2.5 px-4">Pricing / Fulfillment</th>
                                    <th scope="col" className="py-2.5 px-4">Indexed Pages</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-200">
                                <tr>
                                    <th scope="row" className="py-2.5 px-4 font-bold text-white">Waipahu LG &amp; GE Window AC Catalog</th>
                                    <td className="py-2.5 px-4"><Link href="/shop" className="text-cyan-400 hover:underline font-semibold">/shop</Link></td>
                                    <td className="py-2.5 px-4 font-mono">$395–$1,200 • Free Pickup / $50 Delivery</td>
                                    <td className="py-2.5 px-4 font-mono">16 Product Pages + 27 Guides</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-2.5 px-4 font-bold text-white">Jalousie, Slider &amp; 26&quot; Wall AC Installation</th>
                                    <td className="py-2.5 px-4"><Link href="/window-ac-installation" className="text-cyan-400 hover:underline font-semibold">/window-ac-installation</Link></td>
                                    <td className="py-2.5 px-4 font-mono">$0 Free In-Home Estimate • By Appointment</td>
                                    <td className="py-2.5 px-4 font-mono">17 Architecture Guides</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-2.5 px-4 font-bold text-white">Antimicrobial Window AC Deep Cleaning</th>
                                    <td className="py-2.5 px-4"><Link href="/ac-cleaning-oahu" className="text-cyan-400 hover:underline font-semibold">/ac-cleaning-oahu</Link></td>
                                    <td className="py-2.5 px-4 font-mono">$0 Free In-Home Estimate • Drop-Cloth Protected</td>
                                    <td className="py-2.5 px-4 font-mono">14 Cleaning &amp; Mold Guides</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-2.5 px-4 font-bold text-white">Clean-vs-Replace Diagnostics &amp; Repair</th>
                                    <td className="py-2.5 px-4"><Link href="/ac-repair-oahu" className="text-cyan-400 hover:underline font-semibold">/ac-repair-oahu</Link></td>
                                    <td className="py-2.5 px-4 font-mono">$0 Free Clean-vs-Replace Assessment</td>
                                    <td className="py-2.5 px-4 font-mono">14 Symptom Solvers</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-2.5 px-4 font-bold text-white">Island-Wide Oahu Service Coverage</th>
                                    <td className="py-2.5 px-4"><Link href="/service-areas" className="text-cyan-400 hover:underline font-semibold">/service-areas</Link></td>
                                    <td className="py-2.5 px-4 font-mono">All 22 Oahu Communities • (808) 488-1111</td>
                                    <td className="py-2.5 px-4 font-mono">22 City Hubs + 8 Core Pages</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Grid of Sections */}
                <div className="space-y-16">
                    
                    {/* Row 1: Core Navigation & Clinical Cleaning */}
                    <div id="core-services" className="scroll-mt-28 md:scroll-mt-48 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Core Services */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Navigation className="text-primary size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Core Cooling Services</h2>
                            </div>
                            <ul className="space-y-2">
                                {coreServices.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
                                            prefetch={false}
                                            className="group flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="size-3 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                                            <span className="font-header uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Silo 4: Clinical Chemical Cleaning & IAQ */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Sparkles className="text-cyan-400 size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Clinical Cleaning & Air Quality</h2>
                            </div>
                            <ul className="space-y-2">
                                {cleaningGuides.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
                                            prefetch={false}
                                            className="group flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="size-3 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                                            <span className="font-header uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Row 2: Window AC E-Commerce & Housing Architecture */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Silo 1: Window AC E-Commerce */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <ShoppingCart className="text-emerald-400 size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Window AC Guides & Inventory</h2>
                            </div>
                            <ul className="space-y-2">
                                {windowAcShoppingGuides.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
                                            prefetch={false}
                                            className="group flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="size-3 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                                            <span className="font-header uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Silo 2: Hawaii Housing Architecture */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Home className="text-primary size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Hawaii Architecture & Framing</h2>
                            </div>
                            <ul className="space-y-2">
                                {housingArchitectureGuides.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
                                            prefetch={false}
                                            className="group flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="size-3 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                                            <span className="font-header uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Row 3: Diagnostic Solvers & Service Areas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Silo 5: Diagnostic Solvers */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Wrench className="text-amber-400 size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Diagnostic & Symptom Solvers</h2>
                            </div>
                            <ul className="space-y-2">
                                {diagnosticGuides.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
                                            prefetch={false}
                                            className="group flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="size-3 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
                                            <span className="font-header uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service Areas (22 Cities) */}
                        <div id="city-areas" className="scroll-mt-28 md:scroll-mt-48 p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <MapPin className="text-blue-400 size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Oahu Service Areas (22 Cities)</h2>
                            </div>
                            <ul className="grid grid-cols-2 gap-2">
                                {cityRoutes.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
                                            prefetch={false}
                                            className="group flex items-center gap-2 py-1 text-xs text-slate-300 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="size-3 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                                            <span className="font-header uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Row 4: Live Catalog Products */}
                    <div id="in-stock-models" className="scroll-mt-28 md:scroll-mt-48 p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Package className="text-emerald-500 size-6" />
                            <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">In-Stock Warehouse Models</h2>
                        </div>
                            {products.length > 0 ? (
                                <ul className="space-y-2">
                                    {products.map((product) => (
                                        <li key={product.id}>
                                            <Link 
                                                href={`/shop/${generateProductSlug(product.id, product.name)}`}
                                                prefetch={false}
                                                className="group flex items-center gap-2 py-1 text-xs text-slate-300 hover:text-white transition-colors"
                                            >
                                                <ArrowRight className="size-3 text-slate-500 group-hover:text-emerald-500 transition-colors shrink-0" />
                                                <span className="font-header uppercase tracking-wider line-clamp-1">{product.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                                    <AlertCircle className="size-6 text-slate-600" />
                                    <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Live inventory available in Shop catalog.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Directory FAQ Accordion for 108/108 FAQPage Parity */}
                    <section id="sitemap-faqs" className="scroll-mt-28 md:scroll-mt-48 mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                        <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">
                            Affordable Home A/C Directory — Frequently Asked Questions
                        </h2>
                        <div className="space-y-4 text-sm text-slate-300">
                            <details open className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                                <summary className="font-header font-bold text-white cursor-pointer">
                                    Where do I order an in-stock LG Dual Inverter or GE 26-inch Built-In Window AC on Oahu?
                                </summary>
                                <p className="mt-2 text-slate-300 leading-relaxed">
                                    Visit our live <Link href="/shop" className="text-cyan-400 hover:underline">/shop</Link> catalog to order any of our 16 LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In Through-the-Wall air conditioners ($395 to $1,200) for Free Waipahu Warehouse Pickup by appointment (94-150 Leoleo St. #203, Waipahu, HI 96797) or $50 flat-rate Oahu delivery.
                                </p>
                            </details>
                            <details className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                                <summary className="font-header font-bold text-white cursor-pointer">
                                    How do I book a $0 Free In-Home Estimate for Window AC installation, cleaning, or repair?
                                </summary>
                                <p className="mt-2 text-slate-300 leading-relaxed">
                                    Affordable Home A/C operates strictly By Appointment First with $0 upfront booking fees. Request service online via <Link href="/window-ac-installation" className="text-cyan-400 hover:underline">/window-ac-installation</Link>, <Link href="/ac-cleaning-oahu" className="text-cyan-400 hover:underline">/ac-cleaning-oahu</Link>, or <Link href="/ac-repair-oahu" className="text-cyan-400 hover:underline">/ac-repair-oahu</Link>, or call Waipahu dispatch at (808) 488-1111.
                                </p>
                            </details>
                            <details className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                                <summary className="font-header font-bold text-white cursor-pointer">
                                    Which Oahu neighborhoods and condo buildings do you serve?
                                </summary>
                                <p className="mt-2 text-slate-300 leading-relaxed">
                                    Our insured Oahu cooling specialists serve all 22 Oahu service areas—including Honolulu, Waikiki, Pearl City, Waipahu, Kapolei, Ewa Beach, Aiea, Mililani, Kailua, Kaneohe, and Hawaii Kai—with floor drop-cloth protection and custom jalousie or 26-inch condo wall sleeve fitting.
                                </p>
                            </details>
                        </div>
                    </section>

                    <OahuEEATAuthorityBar topicTitle="Complete 118-Page Oahu LG & GE Window AC Sales, Installation & Cleaning Directory" />
                </main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Where do I order an in-stock LG Dual Inverter or GE 26-inch Built-In Window AC on Oahu?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Visit https://www.affordablehome-ac.com/shop to order any of our 16 LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In Through-the-Wall air conditioners ($395 to $1,200) for Free Waipahu Warehouse Pickup by appointment (94-150 Leoleo St. #203, Waipahu, HI 96797) or $50 flat-rate Oahu delivery."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How do I book a $0 Free In-Home Estimate for Window AC installation, cleaning, or repair?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Affordable Home A/C operates strictly By Appointment First with $0 upfront booking fees. Request service online via /window-ac-installation, /ac-cleaning-oahu, or /ac-repair-oahu, or call Waipahu dispatch at (808) 488-1111."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Which Oahu neighborhoods and condo buildings do you serve?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Our insured Oahu cooling specialists serve all 22 Oahu service areas—including Honolulu, Waikiki, Pearl City, Waipahu, Kapolei, Ewa Beach, Aiea, Mililani, Kailua, Kaneohe, and Hawaii Kai—with floor drop-cloth protection and custom jalousie or 26-inch condo wall sleeve fitting."
                                    }
                                }
                            ]
                        })
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Oahu Window AC Sitemap & Directory ($395–$1,200) | Affordable Home A/C",
                            "url": "https://www.affordablehome-ac.com/sitemap",
                            "description": "Browse all 118 pages of Affordable Home A/C: 16 in-stock LG & GE Window ACs ($395–$1,200), 22 Oahu cities, $0 Estimate install & cleaning • (808) 488-1111.",
                            "image": [
                                "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                                "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                                "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                                "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                            ]
                        })
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                                { "@type": "ListItem", "position": 2, "name": "Sitemap", "item": "https://www.affordablehome-ac.com/sitemap" }
                            ]
                        })
                    }}
                />
            <BackToTop visible={true} />
        </div>
    );
}
