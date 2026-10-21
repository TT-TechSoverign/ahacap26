'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ShoppingCart,
    Warehouse,
    ChevronDown,
    Phone,
    Shield,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/inventory';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';
import { isCampaignActive, generateProductSlug } from '@/lib/utils';

type GuideModel = Product & { idealRoom: string; plugType: string; hecoMonthly: string; specialBadge?: string };

const INITIAL_GE_GUIDE_MODELS: GuideModel[] = [
    {
        id: 13,
        name: 'GE 8,200 BTU (AJCQ08AWJ)',
        key_spec: 'AJCQ08AWJ',
        price: 1000,
        promo_price: null,
        stock: 5,
        category: 'WINDOW_AC',
        subcategory: 'ge',
        btu: 8200,
        voltage: '115V / 15 Amp',
        coverage: 'Up to 350 sq. ft. (AHAM) • Up to 290 sq. ft. (Oahu)',
        noise_level: '54 / 59 dB',
        dehumidification: '2.1 Pts/Hr',
        idealRoom: 'Condo Bedroom / 26" Wall Sleeve',
        plugType: 'Standard 115V (NEMA 5-15P)',
        hecoMonthly: '~$42 / mo',
        image_url: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp',
        specialBadge: 'True 26" Built-In • 2-Yr Full Warranty',
    },
    {
        id: 14,
        name: 'GE 10,000 BTU (AJCQ10AWJ)',
        key_spec: 'AJCQ10AWJ',
        price: 1100,
        promo_price: null,
        stock: 0,
        category: 'WINDOW_AC',
        subcategory: 'ge',
        btu: 10000,
        voltage: '115V / 15 Amp',
        coverage: 'Up to 450 sq. ft. (AHAM) • Up to 340 sq. ft. (Oahu)',
        noise_level: '55 / 61 dB',
        dehumidification: '2.7 Pts/Hr',
        idealRoom: 'Master Suite / Deep Condo Room',
        plugType: 'Standard 115V (NEMA 5-15P)',
        hecoMonthly: '~$49 / mo',
        image_url: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp',
        specialBadge: 'True 26" Built-In • SmartHQ™ WiFi',
    },
    {
        id: 15,
        name: 'GE 12,000 BTU (AJCQ12AXXWA)',
        key_spec: 'AJCQ12AXXWA',
        price: 1200,
        promo_price: null,
        stock: 4,
        category: 'WINDOW_AC',
        subcategory: 'ge',
        btu: 12000,
        voltage: '115V / 15 Amp',
        coverage: 'Up to 550 sq. ft. (AHAM) • Up to 390 sq. ft. (Oahu)',
        noise_level: '48 / 56 dB',
        dehumidification: '3.4 Pts/Hr',
        idealRoom: 'Condo Living Room / 26" Wall Sleeve',
        plugType: 'Standard 115V (NEMA 5-15P)',
        hecoMonthly: '~$52 / mo',
        image_url: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
        specialBadge: '★ Variable-Speed R32 Inverter 115V',
    },
    {
        id: 16,
        name: 'GE RAB26A Wall Casement',
        key_spec: 'RAB26A',
        price: 275,
        promo_price: null,
        stock: 3,
        category: 'WINDOW_AC',
        subcategory: 'casement',
        btu: 0,
        voltage: 'N/A (Structural Wall Sleeve)',
        coverage: 'Universal 26" Standard Thru-Wall Opening',
        noise_level: 'Heavy-Gauge Galvanized Steel',
        dehumidification: 'Includes RAG13A Aluminum Grille',
        idealRoom: '26" Concrete / Wood Wall Cutouts',
        plugType: 'Universal 26" Chassis Fit',
        hecoMonthly: '15.6" H x 26.0" W x 16.9" D',
        image_url: '/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A.webp',
        specialBadge: 'Galvanized Sleeve + Aluminum Grille',
    },
    {
        id: 8,
        name: 'LG 7,600 BTU (LW8023HRSM)',
        key_spec: 'LW8023HRSM',
        price: 650,
        promo_price: null,
        stock: 40,
        category: 'WINDOW_AC',
        subcategory: 'universal_fit',
        btu: 7600,
        voltage: '115V / 15 Amp',
        coverage: 'Up to 320 sq. ft. (AHAM) • Up to 260 sq. ft. (Oahu)',
        noise_level: '50 / 52 dB',
        dehumidification: '2.1 Pts/Hr',
        idealRoom: 'Window or 24"–26" Wall Sleeve (Cool + Heat)',
        plugType: 'Standard 115V (NEMA 5-15P)',
        hecoMonthly: '~$40 / mo',
        image_url: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.webp',
        specialBadge: 'Universal Wall/Window • Cool + Heat',
    },
    {
        id: 9,
        name: 'LG 18,000 BTU (LW1823HRSM)',
        key_spec: 'LW1823HRSM',
        price: 925,
        promo_price: null,
        stock: 10,
        category: 'WINDOW_AC',
        subcategory: 'universal_fit',
        btu: 18000,
        voltage: '208/230V / 20 Amp',
        coverage: 'Up to 1,000 sq. ft. (AHAM) • Up to 600 sq. ft. (Oahu)',
        noise_level: '57 / 61 dB',
        dehumidification: '5.4 Pts/Hr',
        idealRoom: 'Large Living Room / Wall or Window',
        plugType: '208/230V 20A (NEMA 6-20P)',
        hecoMonthly: '~$72 / mo',
        image_url: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW1823HRSM.webp',
        specialBadge: '18k Cool + 12k Heat • Slide-Out Chassis',
    },
];

export default function GeBuiltInWallAcGuidePage() {
    const { addToCart, openCart } = useCart();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'ge_builtin' | 'lg_universal' | 'sleeve'>('all');
    const [allModels, setAllModels] = useState<GuideModel[]>(INITIAL_GE_GUIDE_MODELS);
    const isPromo = isCampaignActive();

    useEffect(() => {
        let isMounted = true;
        fetch('/api/v1/products', { cache: 'no-store' })
            .then((res) => (res.ok ? res.json() : null))
            .then((liveProducts: Product[] | null) => {
                if (!isMounted || !Array.isArray(liveProducts)) return;
                const liveMap = new Map(liveProducts.map((p) => [p.id, p]));
                setAllModels(
                    INITIAL_GE_GUIDE_MODELS.map((m) => {
                        const live = liveMap.get(m.id);
                        if (!live) return m;
                        return {
                            ...m,
                            price: live.price,
                            promo_price: live.promo_price ?? null,
                            stock: live.stock,
                            coverage: live.coverage || m.coverage,
                            noise_level: live.noise_level || m.noise_level,
                            dehumidification: live.dehumidification || m.dehumidification,
                        };
                    })
                );
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, []);

    const filteredModels = allModels.filter((m) => {
        if (selectedFilter === 'ge_builtin') return m.subcategory === 'ge';
        if (selectedFilter === 'lg_universal') return m.subcategory === 'universal_fit';
        if (selectedFilter === 'sleeve') return m.subcategory === 'casement';
        return true;
    });

    const handleBuy = (product: Product) => {
        if (product.stock <= 0) return;
        const activePrice = isPromo && product.promo_price ? product.promo_price : product.price;
        trackFunnelEvent('add_to_cart_ge_guide', {
            product_id: product.id,
            product_name: product.name,
            price: activePrice,
            btu: product.btu,
        });
        addToCart({
            ...product,
            price: activePrice,
        });
        openCart();
    };

    const faqItems = [
        {
            q: 'Why can’t a standard side-vented window AC go inside a 26" condo through-the-wall sleeve?',
            a: 'Standard window air conditioners draw intake air through side louvers along the cabinet body. If slid inside a deep concrete or steel wall sleeve, those side vents are blocked, trapping hot exhaust air and burning out the compressor. GE AJCQ Built-In models feature solid-sided cabinetry with rear-only intake and exhaust engineered specifically for 26" through-the-wall sleeves.',
        },
        {
            q: 'What makes the GE AJCQ12AXXWA 12,000 BTU Built-In AC ideal for Honolulu condos?',
            a: 'The GE AJCQ12AXXWA pairs a True 26" Slide-In Built-In chassis with an R32 Variable-Speed Inverter compressor (6,100–12,400 BTU/Hr) that runs on a standard 115V / 15-Amp household plug. It delivers quiet 48 dB operation, built-in SmartHQ™ WiFi, and a factory 2-Year Full / 5-Year Sealed System Replacement Warranty.',
        },
        {
            q: 'Do you carry replacement 26" wall sleeves for rusted Oahu condo sleeves?',
            a: 'Yes! We stock the GE RAB26A heavy-gauge galvanized steel 26" through-the-wall sleeve ($275) complete with the RAG13A stamped aluminum exterior grille at our Waipahu warehouse. Our technicians can remove rusted sleeves and seal a new RAB26A casing into your wall opening.',
        },
        {
            q: 'How does GE Built-In compare to LG Dual Inverter Window AC units?',
            a: 'If you have a standard jalousie, double-hung, or horizontal sliding window where the AC cabinet extends outdoors, our LG Dual Inverter Window AC lineup (6,000–23,500 BTU, $560–$1,025) offers the quietest 44 dB operation. If you have a recessed 26" through-the-wall sleeve in a condo or townhouse, the GE AJCQ Built-In series ($1,000–$1,200) is the factory-certified solution.',
        },
    ];

    const jsonLdData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'HVACBusiness',
                name: 'Affordable Home A/C - GE 26" Built-In & LG Window AC Oahu Store',
                telephone: '+1-808-488-1111',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: '94-150 Leoleo St. #203',
                    addressLocality: 'Waipahu',
                    addressRegion: 'HI',
                    postalCode: '96797',
                    addressCountry: 'US',
                },
                areaServed: 'Oahu, Hawaii',
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://www.affordablehome-ac.com',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Shop',
                        item: 'https://www.affordablehome-ac.com/shop',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'GE 26" Built-In Through-the-Wall AC Guide',
                        item: 'https://www.affordablehome-ac.com/shop/ge-built-in-wall-ac-oahu',
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqItems.map((item) => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.a,
                    },
                })),
            },
        ],
    };

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[96px] md:pt-[180px] pb-24">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Warehouse className="size-3.5" />
                        Waipahu Warehouse Direct &bull; GE 26&quot; Built-In &amp; LG Window AC Specialists
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Oahu <span className="text-primary">GE 26&quot; Built-In</span> Through-the-Wall &amp; Window AC Guide
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        GE AJCQ08AWJ &bull; AJCQ10AWJ &bull; AJCQ12AXXWA R32 Inverter &bull; RAB26A Wall Sleeve
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Compare every GE True 26&quot; Built-In Through-the-Wall air conditioner, GE RAB26A galvanized wall sleeve, and LG Universal Fit wall/window unit in stock at our Waipahu warehouse. Built for Honolulu high-rises, townhouses, and through-the-wall sleeves.
                    </p>
                </div>

                {/* Filter Navigation */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {[
                        { id: 'all', label: 'All Wall & Built-In Models (6)' },
                        { id: 'ge_builtin', label: 'GE True 26" Built-In (8.2k–12k BTU)' },
                        { id: 'lg_universal', label: 'LG Universal Wall/Window Fit' },
                        { id: 'sleeve', label: 'GE RAB26A 26" Wall Sleeve' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedFilter(tab.id as any)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                                selectedFilter === tab.id
                                    ? 'bg-primary text-slate-950 shadow-md shadow-primary/20'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Model Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {filteredModels.map((product) => {
                        const activePrice = isPromo && product.promo_price ? product.promo_price : product.price;
                        const isOutOfStock = product.stock <= 0;
                        const slug = generateProductSlug(product.id, product.name);
                        return (
                            <div
                                key={product.id}
                                className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl flex flex-col justify-between relative hover:border-cyan-500/40 transition-all group"
                            >
                                {product.specialBadge && (
                                    <div className="absolute -top-3 left-6 z-10">
                                        <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider shadow-lg">
                                            {product.specialBadge}
                                        </span>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="aspect-[4/3] flex items-center justify-center relative p-4 rounded-2xl bg-black/30 border border-white/5 mt-2">
                                        <Image
                                            src={product.image_url!}
                                            alt={product.name}
                                            width={320}
                                            height={220}
                                            className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                                            unoptimized
                                        />
                                        <div className="absolute top-2 right-2">
                                            {isOutOfStock ? (
                                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-bold uppercase">
                                                    Sold Out
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                                                    {product.stock} In Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                                            {product.idealRoom} &bull; {product.coverage}
                                        </div>
                                        <Link href={`/shop/${slug}`}>
                                            <h3 className="text-lg font-header font-black uppercase text-white mt-1 hover:text-cyan-400 transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs space-y-1.5 text-slate-300">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Power / Fit:</span>
                                            <span className="text-white font-bold">{product.voltage}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Sound / Spec:</span>
                                            <span className="text-cyan-300 font-bold">{product.noise_level}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Operating / Dim:</span>
                                            <span className="text-emerald-400 font-bold">{product.hecoMonthly}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Warranty:</span>
                                            <span className="text-emerald-400 font-bold">
                                                {product.subcategory === 'ge' ? '2-Yr Full / 5-Yr Sealed' : '1-Yr Parts & Labor'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-white/10 mt-4 space-y-3">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-2xl font-black text-white font-mono">${activePrice}</span>
                                        <Link
                                            href={`/shop/${slug}`}
                                            className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                                        >
                                            Full Specs <ArrowRight className="size-3" />
                                        </Link>
                                    </div>

                                    {isOutOfStock ? (
                                        <Link
                                            href={`/shop/${slug}`}
                                            className="w-full py-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-amber-500/30 transition-all"
                                        >
                                            Sold Out — View Spec Sheet &amp; Alternatives
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleBuy(product)}
                                            className="w-full py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-md shadow-primary/20"
                                        >
                                            <ShoppingCart className="size-3.5" />
                                            Buy on Stripe (${activePrice})
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Comparison Banner: GE 26" Built-In vs LG Dual Inverter Window AC */}
                <div className="p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl mb-20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
                                <Shield className="size-4" />
                                LG &amp; GE Dual-Brand Oahu Warehouse Authority
                            </div>
                            <h2 className="text-2xl font-header font-black uppercase text-white">
                                Installing in a Jalousie or Sliding Window Instead of a 26&quot; Wall Sleeve?
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                If your home or apartment uses jalousie louvers, double-hung sashes, or horizontal sliding windows, compare our 7 in-stock <strong className="text-white">LG Dual Inverter Window AC models (6,000–23,500 BTU, $560–$1,025)</strong> featuring 44 dB ultra-quiet sleep mode and $45 Hawaii Energy rebates.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 shrink-0">
                            <Link
                                href="/shop/lg-dual-inverter-guide"
                                className="px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all"
                            >
                                View LG Dual Inverter Guide
                            </Link>
                            <Link
                                href="/shop"
                                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-header font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                            >
                                Browse All 16 LG &amp; GE Models
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            GE 26&quot; Built-In &amp; Wall Sleeve FAQ
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">
                            Key engineering facts for Oahu condos, townhouses, and through-the-wall installations
                        </p>
                    </div>
                    {faqItems.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-cyan-400 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown
                                    className={`size-4 shrink-0 transition-transform ${
                                        activeFaq === index ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                                    }`}
                                />
                            </button>
                            {activeFaq === index && (
                                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 text-center space-y-4">
                    <h4 className="text-xl font-header font-black uppercase text-white">
                        Need 26&quot; Wall Sleeve Replacement or Through-the-Wall Installation?
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Schedule a $0 Free In-Home Estimate or reserve your GE Built-In unit for Waipahu warehouse pickup or $50 island-wide delivery.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link
                            href="/window-ac-installation"
                            className="px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                        >
                            Schedule Installation ($0 Upfront)
                        </Link>
                        <a
                            href="tel:808-488-1111"
                            className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Phone className="size-3.5 text-cyan-400" />
                            Call Warehouse: (808) 488-1111
                        </a>
                    </div>
                </div>
            </main>
            <BackToTop />
        </div>
    );
}
