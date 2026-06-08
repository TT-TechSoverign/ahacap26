'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Fix import path: go up two levels to 'web', then into 'context'
import { useCart } from '../../context/CartContext';
import { getProductImages } from '../../lib/product-images';
import { Product } from '../../types/inventory';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import { Reorder, motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { BackToTop } from '@/components/BackToTop';
import { cn, generateProductSlug } from '@/lib/utils';
import contentData from '@/lib/content/content.json';




export default function ShopPage() {
    const { addToCart, items, openCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { content } = useContent();

    const sectionOrder = content?.shop?.sections || [
        "dual_inverter", "universal_fit", "base", "ge", "casement", "logistics", "sizing-guide"
    ];



    // const moveSection = ... (Removed)

    const sectionMap: Record<string, React.ReactNode> = {
        "dual_inverter": (
            <div id="dual_inverter" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.dual_inverter"
                    icon="energy_savings_leaf"
                    badge="$45 Hawaii Energy Rebate"
                    narrativeKey="dual_inverter"
                    hideDescription={true}
                />
                <ProductGrid
                    products={products.filter(p => p.subcategory === 'dual_inverter')}
                    onQuickAdd={addToCart}
                    rebate="$45 Hawaii Energy Rebate"
                />
            </div>
        ),
        "universal_fit": (
            <div id="universal_fit" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.universal_fit"
                    icon="settings_overscan"
                    narrativeKey="universal_fit"
                    hideDescription={true}
                />
                <ProductGrid
                    products={products.filter(p => p.subcategory === 'universal_fit')}
                    onQuickAdd={addToCart}
                />
            </div>
        ),

        "base": (
            <div id="base" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.base"
                    icon="ac_unit"
                    narrativeKey="base"
                    hideDescription={true}
                />
                <ProductGrid
                    products={products.filter(p => p.subcategory === 'base')}
                    onQuickAdd={addToCart}
                />
            </div>
        ),
        "ge": (
            <div id="ge" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.ge"
                    icon="token"
                    narrativeKey="ge"
                    narrativeColor="accent"
                    hideDescription={true}
                />
                <ProductGrid
                    products={products.filter(p => p.subcategory === 'ge')}
                    onQuickAdd={addToCart}
                />
            </div>
        ),
        "casement": (
            <div id="casement" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.casement"
                    icon="vertical_split"
                    narrativeKey="casement"
                    hideDescription={true}
                />
                <ProductGrid
                    products={products.filter(p => p.subcategory === 'casement')}
                    onQuickAdd={addToCart}
                />
            </div>
        ),

        "logistics": (
            <div id="logistics_container" className="space-y-4">
                <SectionHeader
                    contentKey="shop.logistics"
                    icon="local_shipping"
                    narrativeKey="logistics"
                    hideDescription={true}
                    contentKeyOverride="logistics.pickup"
                    titleHighlightKey="logistics.pickup.title_highlight"
                    topElement={
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] md:text-[10px] font-header font-black tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(0,174,239,0.15)] mb-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            <EditableText contentKey="logistics.badge" />
                        </div>
                    }
                />
                <LogisticsSection />
            </div>
        ),
        "sizing-guide": <SizingGuideSection />,
        "rebate": <RebateSection />,

    };

    // Fetch Products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = '/api/v1';

                let url = `${apiUrl}/products`;
                const params = new URLSearchParams();
                if (searchQuery) params.append('name', searchQuery);
                // Add cache-buster to ensure we get fresh data after seeding
                params.append('_t', Date.now().toString());
                if (params.toString()) url += `?${params.toString()}`;

                console.log('Fetching products from:', url);
                const res = await fetch(url, {
                    cache: 'no-store',
                    headers: {
                        'Pragma': 'no-cache',
                        'Cache-Control': 'no-cache'
                    }
                });

                if (!res.ok) throw new Error(`Failed to fetch inventory (Status: ${res.status})`);

                const data = await res.json();
                setProducts(data);
            } catch (err: any) {
                console.error("Inventory Load Error:", err);
                setError(err.message || 'Unable to load inventory.');
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchProducts, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">

            <main className="max-w-[1600px] mx-auto w-full px-6 md:px-12 pt-[200px] md:pt-[340px] pb-20 flex-grow">
                {/* Hero Branding Section (Centered Vertical Axis) */}
                <div className="flex flex-col items-center text-center gap-2 md:gap-4 mb-6 md:mb-8 border-b border-white/5 pb-6 md:pb-8 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 opacity-30"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

                    <div className="space-y-2 w-full max-w-7xl mx-auto flex flex-col items-center">

                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-header font-black leading-[0.9] tracking-tighter uppercase px-4 neon-glow">
                            <span className="text-white">
                                <EditableText contentKey="shop.hero.title_word1" />
                            </span>{" "}
                            <span className="text-primary">
                                <EditableText contentKey="shop.hero.title_word2" />
                            </span>
                            <br />
                            <span className="text-primary">
                                <EditableText contentKey="shop.hero.title_word3" />
                            </span>{" "}
                            <span className="text-white">
                                <EditableText contentKey="shop.hero.title_word4" />
                            </span>
                        </h1>
                        {/* Only render description if it exists (allows full removal via JSON) */}
                        {!!content?.shop?.hero?.description && (
                            <p className="text-slate-400 max-w-2xl mx-auto font-medium tracking-wide text-[10px] md:text-sm leading-relaxed uppercase [word-spacing:0.15em] opacity-80 px-4">
                                <EditableText contentKey="shop.hero.description" />
                            </p>
                        )}
                    </div>
                </div>

                {/* Dynamic Reorderable Sections */}
                <div className="space-y-8 md:space-y-10">
                    {error ? (
                        <div className="py-20 text-center space-y-4 max-w-lg mx-auto bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                            <span className="material-symbols-outlined text-red-500 text-5xl">warning</span>
                            <h2 className="text-xl font-header font-black text-red-400 tracking-widest uppercase">Live Connection Failure</h2>
                            <p className="text-slate-400 text-xs tracking-widest uppercase font-bold">{error}</p>
                            <p className="text-slate-500 text-[10px] tracking-widest uppercase mt-4">Review the backend API container health.</p>
                        </div>
                    ) : (
                        sectionOrder.map((sectionId, index) => (
                            <div
                                key={sectionId}
                                className="relative group/section"
                            >
                                {/* Section Control Suite (Edit Mode) */}
                                {/* Section Control Suite Removed */}
                                {sectionMap[sectionId] || null}
                            </div>
                        ))
                    )}
                </div>

            </main>


            {/* --- VISUAL EDITOR CONTROL SUITE REMOVED --- */}

            {/* Footer */}
            {/* Footer Removed (Handled by Global Layout) */}
            <BackToTop visible={true} />
        </div >
    );
}

// --- Sovereign Component Suite ---

function BacklinkedText({ narrativeKey, narrativeColor = 'primary', contentKey }: { narrativeKey: string; narrativeColor?: 'primary' | 'accent', contentKey?: string }) {
    const { content } = useContent();
    const colorA = narrativeColor;
    const colorB = narrativeColor === 'primary' ? 'accent' : 'primary';

    // Hardcoded defaults for "Original Texts" integration
    const defaults: Record<string, Record<string, string>> = {
        dual_inverter: {
            part1: "LG’S DUAL INVERTER™ TECHNOLOGY IS ENGINEERED FOR THE ",
            link1: "HIGH-SALINITY AND HIGH-HUMIDITY ENVIRONMENTS",
            part2: " OF OAHU. BY UTILIZING ",
            link2: "VARIABLE-SPEED COMPRESSORS",
            part3: ", THESE UNITS SLASH ENERGY CONSUMPTION BY UP TO 40%. EVERY MODEL IN THIS SECTION IS ",
            link3: "$45 HAWAII ENERGY REBATE QUALIFIED",
            part4: "."
        },
        universal_fit: {
            part1: "DESIGNED FOR ",
            link1: "EXISTING WALL SLEEVES",
            part2: ", THESE HIGH-PERFORMANCE UNITS PROVIDE A ",
            link2: "CLEAN, PROFESSIONAL LOOK",
            part3: " WITHOUT SACRIFICIAL WINDOW SPACE. BUILT FOR ",
            link3: "HAWAII'S SALT-AIR DURABILITY",
            part4: "."
        },
        base: {
            part1: "OUR ",
            link1: "STANDARD LG WINDOW UNITS",
            part2: " PROVIDE DEPENDABLE COOLING WITH ",
            link2: "INDUSTRIAL RELIABILITY",
            part3: ". BUILT WITH ",
            link3: "ANTI-CORROSIVE COATINGS",
            part4: " FOR LONG-TERM ISLAND DUTY."
        },
        ge: {
            part1: "ENGINEERED FOR ",
            link1: "PERMANENT THROUGH-THE-WALL INSTALLATION",
            part2: ", THE GE BUILT-IN SERIES PROVIDES ",
            link2: "HIGH-OUTPUT COOLING",
            part3: " FOR OAHU’S MOST DEMANDING RESIDENTIAL ENVIRONMENTS. THESE UNITS FEATURE A ",
            link3: "TRUE UNIVERSAL FIT CHASSIS",
            part4: " AND ADVANCED DEHUMIDIFICATION CYCLES."
        },
        casement: {
            part1: "THE ",
            link1: "GE 26\" QUICK SNAP SLEEVE",
            part2: " IS THE STRUCTURAL FOUNDATION FOR THE ",
            link2: "GE BUILT-IN SERIES",
            part3: " (AJCQ MODELS) AND MODERN ",
            link3: "LG UNIVERSAL FIT UNITS",
            part4: ". IT PROVIDES A RIGID, WEATHER-SEALED PORTAL."
        },
        logistics: {
            part1: "OUR ",
            link1: "OAHU LOGISTICS HUB",
            part2: " ENSURES RAPID DEPLOYMENT. COORDINATE YOUR ",
            link2: "DISTRIBUTION PROTOCOLS",
            part3: " WITH OUR ",
            link3: "WAIPAHU TERMINAL INFRASTRUCTURE",
            part4: "."
        },
        bento: {
            part1: "OUR STRATEGIC PARTNERSHIPS WITH ",
            link1: "LG & GE SOLUTIONS",
            part2: " PROVIDE UNSURPASSED ",
            link2: "TECHNOLOGICAL REDUNDANCY",
            part3: " FOR ",
            link3: "ISLAND-WIDE COMFORT",
            part4: "."
        },
        sizing_guide: {
            part1: "STANDARD SIZING CHARTS FAIL TO ACCOUNT FOR ",
            link1: "HAWAII’S HIGH HUMIDITY & HEAT LOADS",
            part2: ". AN INCORRECTLY SIZED UNIT LEADS TO INCREASED COSTS. USE OUR ",
            link2: "PROPRIETARY SIZING MATRIX",
            part3: " TO ENSURE MAX EFFICIENCY AND ",
            link3: "LONG-TERM DURABILITY",
            part4: "."
        },
        educational_benefits: {
            part1: "",
            link1: "ENERGY STAR® CERTIFIED LG UNITS",
            part2: " USE UP TO ",
            link2: "15% LESS ENERGY",
            part3: " THAN STANDARD MODELS. SAVINGS ADD UP FOR BOTH ",
            link3: "YOUR WALLET AND THE PLANET",
            part4: "."
        },
        rebate: {
            part1: "GET UP TO ",
            link1: "$45 BACK",
            part2: " WHEN YOU UPGRADE TO AN ",
            link2: "ENERGY-EFFICIENT WINDOW AC",
            part3: ". WE MAKE THE ",
            link3: "APPLICATION PROCESS SEAMLESS",
            part4: " FOR OAHU RESIDENTS."
        }
    };

    const s = defaults[narrativeKey];
    if (!s) return <EditableText contentKey={contentKey || `${narrativeKey}.description`} />;

    const cKey = contentKey || `shop.backlinking.${narrativeKey}`;

    return (
        <div className="uppercase [word-spacing:0.2em] relative">
            <div className={cn(
                "absolute -left-4 md:-left-10 top-0 bottom-0 w-1 bg-gradient-to-b to-transparent",
                narrativeColor === 'primary' ? "from-primary/50" : "from-accent/50"
            )}></div>
            <EditableText contentKey={`${cKey}.part1`} defaultValue={s.part1} />
            <Link href="/contact" className={cn(
                "hover:text-white transition-colors underline underline-offset-4",
                colorA === 'primary' ? "text-primary decoration-primary/30" : "text-accent decoration-accent/30"
            )}>
                <EditableText contentKey={`${cKey}.link1`} defaultValue={s.link1} />
            </Link>
            <EditableText contentKey={`${cKey}.part2`} defaultValue={s.part2} />
            <Link href="/contact" className={cn(
                "hover:text-white transition-colors underline underline-offset-4",
                colorB === 'primary' ? "text-primary decoration-primary/30" : "text-accent decoration-accent/30"
            )}>
                <EditableText contentKey={`${cKey}.link2`} defaultValue={s.link2} />
            </Link>
            <EditableText contentKey={`${cKey}.part3`} defaultValue={s.part3} />
            <Link href="/contact" className={cn(
                "hover:text-white transition-colors underline underline-offset-4",
                colorA === 'primary' ? "text-primary decoration-primary/30" : "text-accent decoration-accent/30"
            )}>
                <EditableText contentKey={`${cKey}.link3`} defaultValue={s.link3} />
            </Link>
            <EditableText contentKey={`${cKey}.part4`} defaultValue={s.part4} />
        </div>
    );
}

function SectionHeader({
    contentKey,
    icon,
    badge,
    narrativeKey,
    narrativeColor = 'primary',
    hideDescription = false,
    contentKeyOverride,
    titleHighlightKey,
    subtitleKey,
    topElement,
    noBlur,
    forceBreak
}: {
    contentKey: string;
    icon: string;
    badge?: string;
    narrativeKey?: string;
    narrativeColor?: 'primary' | 'accent';
    hideDescription?: boolean;
    contentKeyOverride?: string;
    titleHighlightKey?: string;
    subtitleKey?: string;
    topElement?: React.ReactNode;
    noBlur?: boolean;
    forceBreak?: boolean;
}) {
    const { content } = useContent();

    // specificKey takes precedence over contentKey for title lookups
    const effectiveKey = contentKeyOverride || contentKey;

    // Helper to get nested value from content object
    const getValue = (path: string, obj: any): string => {
        return path.split('.').reduce((prev, curr) => prev && prev[curr], obj) as string || '';
    };

    const hasItalic = !!getValue(`${effectiveKey}.title_italic`, content);
    const hasHighlight = !!titleHighlightKey && !!getValue(titleHighlightKey, content);

    return (
        <div className="max-w-4xl mx-auto text-center space-y-3 px-4 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-primary/0 to-primary/40"></div>

            <div className="space-y-3 flex flex-col items-center">
                {topElement ? (
                    topElement
                ) : (
                    <p className="text-primary font-header font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-2 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[12px]">{icon}</span>
                        <EditableText contentKey={subtitleKey || `${effectiveKey}.subtitle`} />
                    </p>
                )}

                <h2 className="text-xl md:text-3xl font-header font-black text-white uppercase tracking-tight leading-[0.95] transition-colors duration-500 drop-shadow-[0_0_40px_rgba(0,174,239,0.25)] group-hover/section:text-primary">
                    <EditableText contentKey={`${effectiveKey}.title`} />
                    {hasHighlight ? (
                        <>
                            <br className={forceBreak ? "" : "md:hidden"} />
                            <span className={cn(
                                noBlur ? "text-cyan-400" : "text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400",
                                noBlur ? "" : "neon-glow"
                            )}>
                                <EditableText contentKey={titleHighlightKey} />
                            </span>
                        </>
                    ) : (hasItalic && (
                        <> <br className="md:hidden" /> <span className="text-slate-600 italic"><EditableText contentKey={`${effectiveKey}.title_italic`} /></span></>
                    ))}
                </h2>
                {badge && (
                    <div className="inline-block mt-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <span className="text-emerald-400 font-header font-black text-[8px] md:text-[9px] uppercase tracking-[0.3em]">{badge}</span>
                    </div>
                )}
            </div>
            {!hideDescription && (
                <div className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium max-w-2xl mx-auto px-6 border-x border-primary/10 py-0.5 mt-3">
                    {narrativeKey ? (
                        <BacklinkedText narrativeKey={narrativeKey} narrativeColor={narrativeColor} />
                    ) : (
                        <EditableText contentKey={`${effectiveKey}.description`} />
                    )}
                </div>
            )}

        </div>
    );
}

function LogisticsSection() {
    const { content } = useContent();
    const logistics = content?.logistics;

    if (!logistics) return null;

    return (

        <section id="logistics" className="relative group">

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 space-y-6 md:space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch relative">
                    {/* Inner Container Glow - Intensified */}
                    <div className="absolute inset-0 bg-orange-500/10 blur-[120px] rounded-full opacity-60 pointer-events-none -z-10 mix-blend-screen"></div>

                    {/* Pickup Card */}
                    <div className="bg-[#0a0e14]/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group/item shadow-2xl h-full flex flex-col transition-all duration-700 hover:border-orange-500/50 hover:shadow-[0_0_50px_rgba(249,115,22,0.2)] hover:-translate-y-1">
                        {/* Orange Inner Glow (Hover) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15)_0%,transparent_60%)] opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>

                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/item:opacity-20 transition-all duration-700 group-hover/item:scale-110">
                            <span className="material-symbols-outlined text-9xl text-primary">warehouse</span>
                        </div>
                        <div className="flex items-center gap-4 text-primary relative z-10">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover/item:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-3xl group-hover/item:scale-110 transition-transform">warehouse</span>
                            </div>
                            <h3 className="text-xl font-header font-black uppercase tracking-widest text-white group-hover/item:text-primary transition-colors">
                                <EditableText contentKey="logistics.pickup.title" />
                            </h3>
                        </div>
                        <div className="space-y-4 relative z-10 flex-grow">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-2 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_15px_rgba(0,174,239,0.1)]">
                                <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em] opacity-70">
                                    <EditableText contentKey="logistics.pickup.label" />
                                </span>
                                <p className="text-[11px] text-slate-300 leading-relaxed font-bold uppercase tracking-tight">
                                    <EditableText contentKey="logistics.pickup.process" />
                                </p>
                            </div>
                            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-lg flex gap-3 items-start hover:border-orange-500/30 transition-all duration-500">
                                <span className="material-symbols-outlined text-orange-500 text-sm pt-0.5 animate-pulse">warning</span>
                                <p className="text-[10px] text-orange-500/70 font-bold uppercase tracking-widest leading-relaxed">
                                    <EditableText contentKey="logistics.pickup.warning" />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Card */}
                    <div className="bg-[#0a0e14]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group/item shadow-2xl h-full flex flex-col transition-all duration-700 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] hover:-translate-y-1">
                        {/* Orange Inner Glow (Hover) */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1)_0%,transparent_60%)] opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>

                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/item:opacity-20 transition-all duration-700 group-hover/item:scale-110">
                            <span className="material-symbols-outlined text-9xl text-primary">local_shipping</span>
                        </div>
                        <div className="flex items-center gap-4 text-primary relative z-10">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover/item:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-3xl group-hover/item:scale-110 transition-transform">local_shipping</span>
                            </div>
                            <h3 className="text-xl font-header font-black uppercase tracking-widest text-white group-hover/item:text-primary transition-colors">
                                <EditableText contentKey="logistics.delivery.title" />
                            </h3>
                        </div>
                        <div className="space-y-4 relative z-10 flex-grow">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_15px_rgba(0,174,239,0.1)]">
                                <span className="text-[11px] font-black uppercase text-white/90 tracking-[0.2em] opacity-70">
                                    <EditableText contentKey="logistics.delivery.price_label" />
                                </span>
                                <span className="text-lg font-header font-black text-primary tracking-tighter">
                                    <EditableText contentKey="logistics.delivery.price_value" />
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest px-2 group-hover/item:text-slate-300 transition-colors">
                                <EditableText contentKey="logistics.delivery.coverage" />
                            </p>
                            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg hover:border-red-500/20 transition-all duration-500">
                                <h4 className="text-red-400 font-bold uppercase text-[10px] tracking-widest mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">block</span>
                                    <EditableText contentKey="logistics.delivery.exclusions_label" />
                                </h4>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
                                    <EditableText contentKey="logistics.delivery.exclusions" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function RebateSection() {
    return (
        <section id="rebate" className="relative pb-8 pt-0 overflow-hidden group">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            <div className="absolute inset-0 bg-emerald-500/[0.02] rounded-[2rem] mx-4 md:mx-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-2 md:space-y-4">
                {/* Header */}
                <SectionHeader
                    contentKey="shop.rebate"
                    icon="eco"
                    narrativeKey="rebate"
                    titleHighlightKey="shop.rebate.title_highlight"
                    noBlur={true}
                    forceBreak={true}
                    topElement={
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-cyan-500 border border-cyan-500 rounded-full text-white text-[10px] font-header font-black tracking-widest uppercase mb-2">
                            <span className="material-symbols-outlined text-sm">eco</span>
                            <EditableText contentKey="shop.rebate.badge" />
                        </div>
                    }
                />

                {/* 3-Step Process */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {[0, 1, 2].map((i) => {
                        const isDownload = i === 1;
                        const isDualInverterLink = i === 0;

                        if (isDualInverterLink) {
                            return (
                                <Link
                                    key={i}
                                    href="#dual_inverter"
                                    className="industrial-card p-6 bg-[#0f131a] border border-white/5 rounded-2xl relative z-20 group/card flex flex-col items-center text-center space-y-4 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover/card:bg-emerald-500/20 transition-all duration-500">
                                        <span className="material-symbols-outlined text-emerald-500 text-3xl group-hover/card:scale-110 transition-transform">
                                            <EditableText contentKey={`shop.rebate.steps.${i}.icon`} />
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-white font-header font-black uppercase tracking-widest text-base group-hover/card:text-emerald-400 transition-colors group-hover/card:underline decoration-emerald-500 underline-offset-4">
                                            <EditableText contentKey={`shop.rebate.steps.${i}.title`} />
                                        </h3>
                                        <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-widest font-medium group-hover/card:text-slate-400 transition-colors">
                                            <EditableText contentKey={`shop.rebate.steps.${i}.description`} />
                                        </p>
                                    </div>
                                </Link>
                            );
                        }

                        if (isDownload) {
                            return (
                                <a
                                    key={i}
                                    href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="industrial-card p-6 bg-[#0f131a] border border-white/5 rounded-2xl relative z-20 group/card flex flex-col items-center text-center space-y-4 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover/card:bg-emerald-500/20 transition-all duration-500">
                                        <span className="material-symbols-outlined text-emerald-500 text-3xl group-hover/card:scale-110 transition-transform">
                                            <EditableText contentKey={`shop.rebate.steps.${i}.icon`} />
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-white font-header font-black uppercase tracking-widest text-base group-hover/card:text-emerald-400 transition-colors group-hover/card:underline decoration-emerald-500 underline-offset-4">
                                            <EditableText contentKey={`shop.rebate.steps.${i}.title`} />
                                        </h3>
                                        <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-widest font-medium group-hover/card:text-slate-400 transition-colors">
                                            <EditableText contentKey={`shop.rebate.steps.${i}.description`} />
                                        </p>
                                    </div>
                                </a>
                            );
                        }
                        return (
                            <div key={i} className="industrial-card p-6 bg-[#0f131a] border border-white/5 rounded-2xl relative group/card flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover/card:bg-emerald-500/20 transition-all duration-500">
                                    <span className="material-symbols-outlined text-emerald-500 text-3xl group-hover/card:scale-110 transition-transform">
                                        <EditableText contentKey={`shop.rebate.steps.${i}.icon`} />
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-white font-header font-black uppercase tracking-widest text-base">
                                        <EditableText contentKey={`shop.rebate.steps.${i}.title`} />
                                    </h3>
                                    <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-widest font-medium">
                                        <EditableText contentKey={`shop.rebate.steps.${i}.description`} />
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </section>
    );
}



function SizingGuideSection() {
    const sizingData = [
        {
            sq: "100 - 200",
            btu: "6,000 - 8,000",
            app: "Small Bedroom / Office",
            models: [
                { name: "LW6023IVSM", link: "#dual_inverter" },
                { name: "LW8022IVSM", link: "#dual_inverter" },
                { name: "AJCQ08AWJ", link: "#ge" },
                { name: "LW8023HRSM", link: "#universal_fit" },
                { name: "LW8024RD", link: "#base" }
            ]
        },
        {
            sq: "200 - 250",
            btu: "10,000 - 12,000",
            app: "Master / Studio",
            models: [
                { name: "LW1022IVSM", link: "#dual_inverter" },
                { name: "LW1222IVSM", link: "#dual_inverter" },
                { name: "AJCQ10AWJ", link: "#ge" },
                { name: "AJCQ12AWJ", link: "#ge" },
                { name: "LW1017ERSM1", link: "#base" },
                { name: "LW1217ERSM1", link: "#base" }
            ]
        },
        {
            sq: "250 - 350",
            btu: "14,000 - 15,000",
            app: "Living / Large Master",
            models: [
                { name: "LW1522IVSM", link: "#dual_inverter" }
            ]
        },
        {
            sq: "400+",
            btu: "18,000 - 24,000",
            app: "Whole Floor / Large Open Space",
            models: [
                { name: "LW1822IVSM", link: "#dual_inverter" },
                { name: "LW2422IVSM", link: "#dual_inverter" },
                { name: "LW1823HRSM", link: "#universal_fit" },
                { name: "LW2423HRSM", link: "#universal_fit" }
            ]
        },
    ];

    return (
        <section id="sizing-guide" className="scroll-mt-20 px-4">
            <SectionHeader
                contentKey="shop.guide"
                icon="straighten"
                narrativeKey="sizing_guide"
                hideDescription={true}
                topElement={
                    <div className="inline-block px-5 py-2 bg-white/5 rounded-md border border-white/10 text-[10px] md:text-[11px] font-header font-black uppercase tracking-[0.5em] text-primary mb-4 shadow-[0_0_20px_rgba(0,174,239,0.1)]">
                        <EditableText contentKey="shop.guide.subtitle" />
                    </div>
                }
            />

            {/* Desktop Table View */}
            <div className="!hidden md:!block mt-8 md:mt-12 overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-charcoal relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-80"></div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.03] border-b border-white/10">
                            <th className="p-6 md:p-8 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/4">Coverage Area</th>
                            <th className="p-6 md:p-8 text-xs font-bold text-primary uppercase tracking-widest w-1/4">Recommended BTU</th>
                            <th className="p-6 md:p-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Units</th>
                            <th className="p-6 md:p-8 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Ideal Application</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-background-dark/50">
                        {sizingData.map((row, i) => (
                            <tr key={i} className="hover:bg-primary/[0.03] transition-colors group">
                                <td className="p-6 md:p-8 text-white font-black group-hover:text-primary transition-colors border-l-2 border-transparent group-hover:border-primary/50">{row.sq} sq. ft.</td>
                                <td className="p-6 md:p-8">
                                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-header font-bold text-lg rounded md:text-xl border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_15px_rgba(0,174,239,0.15)] group-hover:shadow-[0_0_25px_rgba(0,174,239,0.5)] group-hover:scale-105 transform">
                                        {row.btu}
                                    </span>
                                </td>
                                <td className="p-6 md:p-8">
                                    <div className="flex flex-wrap gap-2">
                                        {sizingData[i].models.map((m, idx) => (
                                            <Link
                                                key={idx}
                                                href={m.link}
                                                className="px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-md text-[9px] font-black text-slate-400 hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(0,174,239,0.2)]"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                                                {m.name}
                                            </Link>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-6 md:p-8 text-slate-400 text-xs hidden lg:table-cell font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">{row.app}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {sizingData.map((row, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-40"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Coverage</p>
                                <h3 className="text-xl font-header font-black text-white uppercase">{row.sq} sq. ft.</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Capacity</p>
                                <span className="text-lg font-header font-black text-white">{row.btu} <span className="text-[10px] text-primary">BTU</span></span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Application</p>
                            <p className="text-slate-400 text-sm font-medium">{row.app}</p>
                        </div>
                        <div className="pt-3 border-t border-white/5 bg-white/[0.01] -mx-4 -mb-4 p-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Recommended Models</p>
                            <div className="grid grid-cols-2 gap-2">
                                {sizingData[i].models.map((m, idx) => (
                                    <Link
                                        key={idx}
                                        href={m.link}
                                        className="px-2 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-white hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[10px] text-primary">ac_unit</span>
                                        <span className="truncate">{m.name}</span>
                                        <span className="material-symbols-outlined text-[10px] text-slate-600">north_east</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Advanced Technical Sizing Variables */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 }
                    }
                }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
            >
                {[
                    {
                        title: "Humidity Load Factor",
                        icon: "humidity_mid",
                        desc: <>If the room has <span className="text-primary/90 font-bold">high ceilings (over 8ft)</span> or lacks significant insulation, we recommend <span className="text-white font-bold italic underline decoration-primary/30 underline-offset-4">&quot;sizing up&quot;</span> within these conservative ranges to ensure the unit doesn&apos;t run at 100% capacity continuously.</>
                    },
                    {
                        title: "Solar Exposure",
                        icon: "wb_sunny",
                        desc: <>For rooms facing west with <span className="text-primary/90 font-bold">heavy afternoon sun</span>, add an <span className="text-primary font-black scale-105 inline-block mx-1">additional 10%</span> to your calculated square footage before selecting a BTU tier.</>
                    },
                    {
                        title: "Inverter Advantage",
                        icon: "speed",
                        desc: <>Units in the <span className="text-white font-bold italic">LG DUAL Inverter series</span> can modulate their speed, making them <span className="text-primary/90 font-bold">more forgiving</span> if you slightly &quot;oversize&quot; for a space compared to a standard single-speed unit.</>
                    }
                ].map((factor, idx) => (
                    <motion.div
                        key={idx}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="bg-[#0f172a]/40 border border-white/10 rounded-2xl p-7 hover:border-primary/50 hover:bg-[#1e293b]/40 transition-all duration-500 group/factor shadow-lg hover:shadow-[0_0_40px_rgba(0,174,239,0.1)] relative overflow-hidden h-full"
                    >
                        {/* Industrial Accent Line */}
                        <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-primary to-transparent opacity-40 group-hover/factor:opacity-100 group-hover/factor:w-24 transition-all duration-700"></div>

                        <div className="flex items-center gap-4 mb-5 relative z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover/factor:scale-150 transition-transform duration-700"></div>
                                <span className="material-symbols-outlined text-primary text-3xl group-hover/factor:scale-110 transition-transform duration-500 relative z-10">{factor.icon}</span>
                            </div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-white/90 group-hover/factor:text-primary transition-colors duration-500 text-shadow-sm">{factor.title}</h4>
                        </div>
                        <p className="text-slate-400 text-[13px] leading-relaxed font-medium relative z-10">
                            {factor.desc}
                        </p>

                        {/* Mesh decoration subtle backdrop */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover/factor:bg-primary/10 transition-colors duration-700"></div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}



function ProductGrid({ products, onQuickAdd, rebate }: { products: Product[]; onQuickAdd: (p: Product) => void; rebate?: string }) {
    if (products.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Section Updating / No Units Matching Filter</p>
                <div className="h-px w-12 bg-white/5 mx-auto mt-4"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
            {products.map(product => (
                <motion.div
                    key={product.id}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                    }}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-[360px]"
                >
                    <ProductCard product={product} onQuickAdd={() => onQuickAdd(product)} rebate={rebate} />
                </motion.div>
            ))}
        </motion.div>
    );
}

function ProductCard({ product, onQuickAdd, rebate }: { product: Product; onQuickAdd: () => void; rebate?: string }) {
    const router = useRouter();
    const isPromo = product.promo_price !== undefined && product.promo_price !== null && product.promo_price > 0;
    
    const borderClass = isPromo 
        ? "border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15),_inset_0_0_15px_rgba(59,130,246,0.1)] hover:border-red-500/70 hover:shadow-[0_0_35px_rgba(239,68,68,0.3),_inset_0_0_25px_rgba(59,130,246,0.2)]"
        : "border-white/5 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(0,174,239,0.15)]";

    return (
        <div
            onClick={() => router.push(`/shop/${generateProductSlug(product.id, product.name)}`)}
            className={cn(
                "industrial-card group flex flex-col bg-[#0f131a] rounded-2xl overflow-hidden transition-all duration-700 relative h-full ring-1 ring-white/5 active:scale-[0.98] cursor-pointer",
                borderClass
            )}
        >
            {/* Image Area with Luminous Hover & Immersive Blending */}
            <div className="w-full aspect-[16/10] bg-[#05070a] relative overflow-hidden transition-all duration-700 border-b border-white/5 p-4 flex items-center justify-center">
                {/* Immersive radial depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.15)_0%,transparent_75%)] opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
                {/* Floor shadow/reflection simulation */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f131a]/95 to-transparent z-10"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"></div>

                {isPromo && (
                    <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-red-600 via-slate-900 to-blue-600 text-white font-header font-black text-[8px] md:text-[9px] px-3 py-1.5 rounded-br-2xl uppercase tracking-[0.2em] shadow-lg border-b border-r border-white/10 animate-pulse-slow">
                        🇺🇸 Celebrating America
                    </div>
                )}

                {rebate && (
                    <div className="absolute top-0 right-0 z-20 bg-emerald-500 text-white font-header font-black text-[8px] md:text-[9px] px-3 py-1.5 rounded-bl-2xl uppercase tracking-[0.2em] shadow-lg border-b border-l border-emerald-400/30">
                        {rebate}
                    </div>
                )}

                {/* Stock Badge */}
                <div className="absolute bottom-0 right-0 z-20">
                    {product.stock > 0 ? (
                        <div className="bg-emerald-500/10 text-emerald-500 border-t border-l border-emerald-500/20 font-header font-black text-[8px] md:text-[9px] px-4 py-2 rounded-tl-2xl uppercase tracking-[0.2em] backdrop-blur-md">
                            In Stock
                        </div>
                    ) : (
                        <div className="bg-red-500/10 text-red-500 border-t border-l border-red-500/20 font-header font-black text-[8px] md:text-[9px] px-4 py-2 rounded-tl-2xl uppercase tracking-[0.2em] backdrop-blur-md">
                            Out of Stock
                        </div>
                    )}
                </div>

                {(() => {
                    const displayImage = product.image_url || getProductImages(product.id)?.[0];
                    return displayImage ? (
                        <Image
                            src={displayImage}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10 p-4 md:p-6"
                            unoptimized={!!product.image_url}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-700 relative z-10">
                            <span className="material-symbols-outlined text-6xl">ac_unit</span>
                            <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40">Industrial Unit [STAGED]</span>
                        </div>
                    );
                })()}
            </div>

            {/* Identity & Specs (Centered Axis) */}
            <div className="p-3 md:p-5 flex flex-col flex-grow items-center text-center relative">
                <div className="mb-3 w-full flex flex-col items-center">
                    <div className="text-primary font-header font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] mb-1.5 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity justify-center">
                        <span className="w-2 h-px bg-primary/30 group-hover:w-4 transition-all"></span>
                        {product.category || 'AC UNIT'}
                        <span className="w-2 h-px bg-primary/30 group-hover:w-4 transition-all"></span>
                    </div>
                    <h3 className="text-white text-base md:text-lg font-header font-black leading-tight group-hover:text-primary transition-colors duration-500 uppercase tracking-tight">
                        {product.name}
                    </h3>
                </div>

                {/* Technical Specs (Noise & Voltage Only) */}
                <div className="grid grid-cols-2 gap-1.5 w-full mb-4">
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                        <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Noise Level</span>
                        <span className="text-white text-[10px] font-bold font-header lowercase">{product.noise_level || 'N/A'}</span>
                    </div>
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                        <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Voltage</span>
                        <span className="text-white text-[10px] font-bold font-header">{product.voltage || '115V'}</span>
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-white/5 flex flex-col items-center gap-3 w-full">
                    <div className="flex items-center gap-2 justify-center">
                        {isPromo ? (
                            <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[10px] text-red-500 font-bold line-through decoration-red-500/80">
                                    ${product.price.toLocaleString()}
                                </span>
                                <div className="text-xl md:text-2xl font-header font-black text-cyan-400 tracking-tighter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                    ${product.promo_price?.toLocaleString()}
                                </div>
                            </div>
                        ) : (
                            <div className="text-xl md:text-2xl font-header font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:text-primary transition-colors">
                                ${product.price.toLocaleString()}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/shop/${generateProductSlug(product.id, product.name)}`);
                            }}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-header font-black text-[8px] py-3 rounded-lg text-center uppercase tracking-widest transition-all border border-red-500/20 hover:border-red-500/40 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        >
                            <span className="material-symbols-outlined text-[12px]">visibility</span>
                            SPECS
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (product.stock > 0) onQuickAdd();
                            }}
                            disabled={product.stock <= 0}
                            className={cn(
                                "font-header font-black text-[8px] py-3 rounded-lg text-center uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                                product.stock > 0
                                    ? "bg-primary text-white hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] active:scale-95"
                                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                            )}
                        >
                            <span className="material-symbols-outlined text-[12px]">
                                {product.stock > 0 ? 'add_shopping_cart' : 'block'}
                            </span>
                            {product.stock > 0 ? 'SECURE' : 'SOLD OUT'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


