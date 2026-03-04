import Link from 'next/link';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import { BackToTop } from '@/components/BackToTop';
import contentData from '@/lib/content/content.json';

// Revalidate occasionally, or force dynamic if needed, to match sitemap.ts
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

    const staticLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop / Inventory', path: '/shop' },
        { name: '└ LG Dual Inverter Window AC', path: '/shop#dual_inverter' },
        { name: '└ GE Profile Window AC', path: '/shop#ge' },
        { name: '└ Hawai\'i Energy Cash Rebates', path: '/shop#rebate' },
        { name: 'Mini Split AC', path: '/mini_split_ac' },
        { name: '└ Mitsubishi Electric', path: '/mini_split_ac#mitsubishi-electric' },
        { name: '└ Fujitsu', path: '/mini_split_ac#fujitsu' },
        { name: '└ Daikin', path: '/mini_split_ac#daikin' },
        { name: '└ Carrier', path: '/mini_split_ac#carrier' },
        { name: 'Mini Split AC Cleaning', path: '/mini_split_ac_maintenance' },
        { name: 'Window AC Cleaning', path: '/window_ac_maintenance' },
        { name: 'Service Areas', path: '/service-areas' },
        { name: 'Contact Us', path: '/contact' },
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

    // Sort alphabetically by city name
    cityRoutes.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="bg-[#05070a] min-h-screen text-slate-200">
            <main className="pt-[200px] md:pt-[350px] lg:pt-[380px] pb-24 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header Sequence */}
                <div className="text-center md:text-left mb-16 space-y-4 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 justify-center md:justify-start">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300">Site Directory</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-header font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">
                        Sitemap
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
                        A complete index of Affordable Home AC&apos;s digital infrastructure. Access all core services, product inventory, and operational pages.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* Core Navigation Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="material-symbols-outlined text-primary text-2xl">route</span>
                            <h2 className="text-2xl font-header font-black uppercase tracking-widest text-white">Core Navigation</h2>
                        </div>
                        <ul className="space-y-3">
                            {staticLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link 
                                        href={link.path}
                                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                                    >
                                        <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-primary transition-colors">arrow_forward</span>
                                        <span className="font-header font-bold uppercase tracking-widest text-xs md:text-sm group-hover:text-white transition-colors">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Inventory Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="material-symbols-outlined text-emerald-500 text-2xl">inventory_2</span>
                            <h2 className="text-2xl font-header font-black uppercase tracking-widest text-white">Inventory Index</h2>
                        </div>
                        {products.length > 0 ? (
                            <ul className="space-y-3">
                                {products.map((product) => (
                                    <li key={product.id}>
                                        <Link 
                                            href={`/shop/${generateProductSlug(product.id, product.name)}`}
                                            className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-emerald-500 transition-colors">arrow_forward</span>
                                                <span className="font-header font-bold uppercase tracking-widest text-[10px] md:text-xs text-slate-400 group-hover:text-white transition-colors line-clamp-1">{product.name}</span>
                                            </div>
                                            <span className="pl-7 text-[9px] font-mono text-slate-600 uppercase tracking-widest block">{product.category.replace('_', ' ')}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                                <span className="material-symbols-outlined text-3xl text-slate-600">sync_problem</span>
                                <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Live inventory temporarily unavailable.</p>
                            </div>
                        )}
                    </div>

                    {/* Service Areas Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="material-symbols-outlined text-blue-400 text-2xl">pin_drop</span>
                            <h2 className="text-xl md:text-2xl font-header font-black uppercase tracking-widest text-white">Service Areas (A-Z)</h2>
                        </div>
                        <ul className="space-y-3">
                            {cityRoutes.map((link, idx) => (
                                <li key={idx}>
                                    <Link 
                                        href={link.path}
                                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                                    >
                                        <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-blue-400 transition-colors">arrow_forward</span>
                                        <span className="font-header font-bold uppercase tracking-widest text-xs md:text-sm group-hover:text-white transition-colors">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
