import Link from 'next/link';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import { BackToTop } from '@/components/BackToTop';
import contentData from '@/lib/content/content.json';
import { Navigation, ArrowRight, Package, MapPin, Wrench, Shield, Home, ShoppingCart, AlertCircle, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SitemapPage() {
    let products: Product[] = [];
    
    try {
        let apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
        if (!apiUrl.endsWith('/api/v1')) {
            apiUrl = `${apiUrl}/api/v1`;
        }

        const res = await fetch(`${apiUrl}/products`, {
            next: { revalidate: 0 }
        });

        if (res.ok) {
            products = await res.json();
        }
    } catch (error) {
        console.error('[HTML Sitemap] Failed to fetch products:', error);
    }

    const coreServices = [
        { name: 'Home', path: '/' },
        { name: 'Verified Customer Reviews (142+)', path: '/reviews' },
        { name: 'Shop Inventory', path: '/shop' },
        { name: 'Window AC Installation', path: '/window-ac-installation' },
        { name: 'Mini Split AC Overview', path: '/mini_split_ac' },
        { name: 'Ductless Mini Split Installation', path: '/ductless-mini-split-installation-oahu' },
        { name: 'Instant Mini Split Estimate ($0 Free)', path: '/mini-split-estimate' },
        { name: 'Mini Split Installation Cost Breakdown', path: '/mini-split-installation-cost-oahu' },
        { name: 'Mini Split AC Deep Cleaning Oahu', path: '/ac-cleaning-oahu' },
        { name: 'Mini Split AC Repair & Diagnostics', path: '/ac-repair-oahu' },
        { name: 'Clean vs Replace Window AC Guide', path: '/clean-vs-replace-window-ac' },
        { name: 'Window AC vs Ductless Mini Split Oahu', path: '/window-ac-vs-mini-split-oahu' },
        { name: 'Interactive AC Sizing Calculator', path: '/sizing' },
        { name: 'Oahu Service Areas Directory', path: '/service-areas' },
        { name: 'Contact Us & Free Assessment', path: '/contact' },
    ];

    const windowAcShoppingGuides = [
        { name: 'Hawaii Energy $45 Window AC Rebate', path: '/hawaii-energy-rebate' },
        { name: 'Window AC Warehouse Pickup Waipahu', path: '/window-ac-warehouse-pickup-waipahu' },
        { name: 'Window AC Flat $50 Delivery Service', path: '/window-ac-delivery-service-oahu' },
        { name: 'Same-Day Window AC Pickup Oahu', path: '/same-day-window-ac-pickup-oahu' },
        { name: 'Energy Star Window Air Conditioners', path: '/energy-star-window-air-conditioners-hawaii' },
        { name: 'Dual Inverter vs Standard Window AC', path: '/inverter-window-ac-vs-standard-hawaii' },
        { name: 'Quiet Bedroom Window AC (44 dB)', path: '/quiet-bedroom-window-ac-oahu' },
        { name: 'Living Room Window AC (10K–23.5K BTU)', path: '/living-room-window-ac-oahu' },
        { name: 'Large Room Window AC (18K–23.5K BTU 230V)', path: '/large-room-window-ac-18000-24000-btu' },
        { name: 'Small Room Window AC (6K–8K BTU 115V)', path: '/small-room-window-ac-6000-8000-btu' },
        { name: 'Window AC for Studios & Apartments', path: '/window-ac-for-studios-apartments-hawaii' },
        { name: '115V Low-Voltage Window AC Units', path: '/low-voltage-window-ac-115v-oahu' },
        { name: 'Smart Wi-Fi Window AC (LG ThinQ)', path: '/smart-wifi-window-ac-oahu' },
        { name: 'Window AC Replacement & Haul-Away', path: '/window-ac-replacement-oahu' },
        { name: 'Commercial Window AC (Jobsite Trailers & Retail)', path: '/commercial-window-ac-oahu' },
        { name: 'Window AC Warranty & Waipahu Bench Support', path: '/window-ac-warranty-waipahu' },
    ];

    const housingArchitectureGuides = [
        { name: 'Jalousie Window AC Installation Oahu', path: '/jalousie-window-ac-installation-oahu' },
        { name: 'Horizontal Sliding Window AC Installation', path: '/horizontal-sliding-window-ac-oahu' },
        { name: 'Single-Wall Construction AC Cooling Hawaii', path: '/single-wall-construction-ac-cooling-hawaii' },
        { name: 'AC Exterior Support Brackets & Mounting', path: '/ac-brackets-exterior-security-mounting-oahu' },
        { name: 'Standard Window AC Brackets & Mounting', path: '/standard-window-ac-brackets-mounting-oahu' },
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
        { name: 'AC Mold Removal & Deep Cleaning Oahu', path: '/ac-mold-removal-cleaning-oahu' },
        { name: 'Premium Mini Split Deep Cleaning (Full Teardown $275)', path: '/premium-mini-split-deep-cleaning-oahu' },
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
        { name: 'AC Diagnostic Service ($175 Flat Rate)', path: '/ac-diagnostic-service-175-flat-rate' },
        { name: 'AC Compressor Not Turning On Oahu', path: '/ac-compressor-not-turning-on-oahu' },
        { name: 'Window AC Making Loud Buzzing Noise', path: '/window-ac-making-loud-buzzing-noise' },
        { name: 'Mini Split Remote Control Not Working', path: '/mini-split-remote-control-not-working' },
        { name: 'AC Refrigerant Leak Detection & Flare Repair', path: '/ac-refrigerant-leak-detection-hawaii' },
        { name: 'AC Turning On & Off (Short Cycling)', path: '/ac-turning-on-and-off-rapidly-short-cycling' },
        { name: 'No Power to AC Unit: Breaker & Disconnect Checks', path: '/no-power-to-ac-unit-hawaii' },
        { name: 'AC Burning Electrical Smell? Emergency Actions', path: '/ac-burning-electrical-smell-oahu' },
        { name: 'Outdoor AC Fan Not Spinning in Hawaii', path: '/outdoor-unit-fan-not-spinning-hawaii' },
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
            <main className="pt-[140px] md:pt-[165px] lg:pt-[175px] pb-24 px-4 md:px-8 max-w-7xl mx-auto">
                
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
                        A comprehensive directory of Affordable Home A/C&apos;s digital infrastructure. Access in-stock warehouse models, specialized Hawaii housing guides, clinical diagnostic solvers, and localized Oahu service areas.
                    </p>
                </div>

                {/* Grid of Sections */}
                <div className="space-y-16">
                    
                    {/* Row 1: Core Navigation & Clinical Cleaning */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <MapPin className="text-blue-400 size-6" />
                                <h2 className="text-xl font-header font-black uppercase tracking-wider text-white">Oahu Service Areas (22 Cities)</h2>
                            </div>
                            <ul className="grid grid-cols-2 gap-2">
                                {cityRoutes.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={link.path}
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
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
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
                </main>
            <BackToTop visible={true} />
        </div>
    );
}
