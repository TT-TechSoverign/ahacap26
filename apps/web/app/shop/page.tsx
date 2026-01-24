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
import { cn } from '@/lib/utils';
import contentData from '../../content.json';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ShopPage() {
    const { addToCart, items, openCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { content, isEditMode, setEditMode, isDirty, isSaving, saveChanges, discardChanges, setLayoutOrder } = useContent();

    const sectionOrder = content?.shop?.sections || [
        "dual_inverter", "universal_fit", "base", "ge", "casement", "logistics", "brand-spotlight", "sizing-guide", "faq"
    ];

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...sectionOrder];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newOrder.length) return;

        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        setLayoutOrder('shop.sections', newOrder);
    };

    const sectionMap: Record<string, React.ReactNode> = {
        "dual_inverter": (
            <div id="dual_inverter" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.dual_inverter"
                    icon="energy_savings_leaf"
                    badge="$45 Hawaii Energy Rebate"
                    narrativeKey="dual_inverter"
                />
                <ProductGrid
                    products={products.filter(p => {
                        const name = p.name || '';
                        return name.includes('Dual Inverter') || name.includes('IVSM');
                    })}
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
                />
                <ProductGrid
                    products={products.filter(p => {
                        const name = p.name || '';
                        return (name.includes('LT') || name.includes('Universal Fit')) && !name.includes('Dual Inverter');
                    })}
                    onQuickAdd={addToCart}
                />
            </div>
        ),
        "educational-benefits": <EducationalBenefitsSection />,
        "base": (
            <div id="base" className="relative space-y-12">
                <SectionHeader
                    contentKey="shop.base"
                    icon="ac_unit"
                    narrativeKey="base"
                />
                <ProductGrid
                    products={products.filter(p => {
                        const name = p.name || '';
                        return (name.includes('LW8024RD') || name.includes('LW1017ERSM1') || name.includes('LW1217ERSM1')) &&
                            !name.includes('Universal Fit');
                    })}
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
                />
                <ProductGrid
                    products={products.filter(p => p.name.includes('AJCQ'))}
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
                />
                <ProductGrid
                    products={products.filter(p => p.name.includes('RAB26A'))}
                    onQuickAdd={addToCart}
                />
            </div>
        ),
        "brand-spotlight": (
            <div id="brand-spotlight-container" className="space-y-12">
                <SectionHeader
                    contentKey="shop.bento"
                    icon="verified"
                    narrativeKey="bento"
                    contentKeyOverride="shop.brand_spotlight"
                    subtitleKey="shop.brand_spotlight.badge"
                />
                <BrandSpotlightSection />
            </div>
        ),
        "logistics": (
            <div id="logistics_container" className="space-y-12">
                <SectionHeader
                    contentKey="shop.logistics"
                    icon="local_shipping"
                    narrativeKey="logistics"
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
        "faq": <FAQSection />
    };

    // Fetch Products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

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
            <Navbar />
            <main className="max-w-[1600px] mx-auto w-full px-6 md:px-12 pt-[180px] md:pt-[300px] pb-32 flex-grow">
                {/* Hero Branding Section (Centered Vertical Axis) */}
                <div className="flex flex-col items-center text-center gap-3 md:gap-6 mb-6 md:mb-10 border-b border-white/5 pb-6 md:pb-10 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 opacity-30"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

                    <div className="space-y-3 w-full max-w-7xl mx-auto flex flex-col items-center">
                        <span className="text-primary font-header font-black uppercase tracking-[0.6em] text-[8px] md:text-[9px] block animate-pulse">
                            <EditableText contentKey="shop.hero.subtitle" />
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-header font-black leading-[0.85] tracking-tighter uppercase px-4 neon-glow">
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
                        <p className="text-slate-400 max-w-2xl mx-auto font-medium tracking-wide text-xs md:text-base leading-relaxed uppercase [word-spacing:0.15em] opacity-80 px-4">
                            <EditableText contentKey="shop.hero.description" />
                        </p>
                    </div>
                </div>

                {/* Dynamic Reorderable Sections */}
                <div className="space-y-16 md:space-y-24">
                    {sectionOrder.map((sectionId, index) => (
                        <div
                            key={sectionId}
                            className="relative group/section"
                        >
                            {/* Section Control Suite (Edit Mode) */}
                            {isEditMode && (
                                <div className="absolute -top-12 right-0 z-[60] flex items-center gap-3">
                                    {/* Move Controls */}
                                    <div className="flex items-center bg-[#0f131a]/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                                        <button
                                            onClick={() => moveSection(index, 'up')}
                                            disabled={index === 0}
                                            className={cn(
                                                "p-2.5 flex items-center justify-center transition-all",
                                                index === 0 ? "text-slate-700 cursor-not-allowed" : "text-primary hover:bg-primary/10 active:scale-90"
                                            )}
                                            title="Move Up"
                                        >
                                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                        </button>
                                        <div className="w-px h-4 bg-white/10"></div>
                                        <button
                                            onClick={() => moveSection(index, 'down')}
                                            disabled={index === sectionOrder.length - 1}
                                            className={cn(
                                                "p-2.5 flex items-center justify-center transition-all",
                                                index === sectionOrder.length - 1 ? "text-slate-700 cursor-not-allowed" : "text-primary hover:bg-primary/10 active:scale-90"
                                            )}
                                            title="Move Down"
                                        >
                                            <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                        </button>
                                    </div>

                                    {/* Section Badge */}
                                    <div className="bg-[#0f131a] border border-primary/30 px-3 py-2 rounded-lg shadow-[0_0_20px_rgba(0,174,239,0.2)] opacity-0 group-hover/section:opacity-100 transition-all duration-500 ring-1 ring-primary/20 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-[10px] animate-pulse">settings_input_component</span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/70">{sectionId.replace(/[-_]/g, ' ')}</span>
                                    </div>
                                </div>
                            )}
                            {sectionMap[sectionId] || null}
                        </div>
                    ))}
                </div>

            </main>


            {/* --- VISUAL EDITOR CONTROL SUITE --- */}
            <AnimatePresence>
                {/* Floating Edit Toggle (Executive Style) */}
                {!isEditMode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-8 right-8 z-[100]"
                    >
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-[#0f131a] border border-primary/30 p-4 rounded-full shadow-[0_0_30px_rgba(0,174,239,0.3)] hover:shadow-[0_0_50px_rgba(0,174,239,0.5)] hover:border-primary transition-all group"
                        >
                            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">edit_note</span>
                        </button>
                    </motion.div>
                )}

                {/* Persistent Persistence Bar */}
                {isEditMode && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 inset-x-0 z-[100] p-6 flex justify-center"
                    >
                        <div className="bg-[#0f131a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex items-center gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                            <div className="flex items-center gap-3 px-4 border-r border-white/10">
                                <div className={cn(
                                    "w-2 h-2 rounded-full animate-pulse",
                                    isDirty ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                                )}></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                    {isDirty ? 'UNSAVED CHANGES' : 'ALL SYNCED'}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={discardChanges}
                                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all"
                                >
                                    DISCARD
                                </button>
                                <button
                                    onClick={saveChanges}
                                    disabled={!isDirty || isSaving}
                                    className={cn(
                                        "px-8 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                        isDirty
                                            ? "bg-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.4)] hover:shadow-[0_0_30px_rgba(0,174,239,0.6)]"
                                            : "bg-white/5 text-slate-600 cursor-not-allowed"
                                    )}
                                >
                                    {isSaving ? (
                                        <>
                                            <span className="animate-spin material-symbols-outlined text-xs">sync</span>
                                            SAVING...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-xs">save</span>
                                            SAVE CHANGES
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="p-2.5 text-slate-600 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="bg-[#0a0e14] border-t border-white/5 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="relative h-32 w-32 -mb-2">
                                <Image
                                    src="/assets/ahac-logo-bus-500x500xv2.svg"
                                    alt="Affordable Home A/C"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Oahu&apos;s quality provider of energy-efficient cooling solutions. Specializing in Window Units, Mini-Split AC and Central AC services for island living.
                            </p>
                        </div>

                        {/* Services Column */}
                        <div>
                            <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Services</h4>
                            <ul className="space-y-4">
                                {[
                                    { text: 'Mini Split AC', href: '/contact' },
                                    { text: 'Window AC Shop', href: '/shop' },
                                    { text: 'Central AC', href: '/contact' },
                                    { text: 'Window AC Cleaning', href: '/contact' }
                                ].map((item) => (
                                    <li key={item.text}>
                                        <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div>
                            <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Quick Links</h4>
                            <ul className="space-y-4">
                                {[
                                    { text: 'Mini Split AC', href: '/contact' },
                                    { text: 'Shop Inventory', href: '/shop' },
                                    { text: 'Central AC', href: '/contact' },
                                    { text: 'Window AC Cleaning', href: '/contact' },
                                    { text: 'Service Areas', href: '/contact' },
                                    { text: 'Contact Us', href: '/contact' }
                                ].map((item) => (
                                    <li key={item.text}>
                                        <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div>
                            <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Contact</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">Shop Location</div>
                                        <div className="text-slate-400 text-sm">Waipahu Commercial Center<br />94-150 Leoleo St. #203<br />Waipahu, HI 96797</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">call</span>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">Phone</div>
                                        <a href="tel:808-488-1111" className="text-slate-400 text-sm hover:text-white transition-colors">(808) 488-1111</a>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">mail</span>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">Email</div>
                                        <a href="mailto:office@affordablehome-ac.com" className="text-slate-400 text-sm hover:text-white transition-colors">office@affordablehome-ac.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                            © 2024 Affordable Home A/C. All rights reserved.
                        </p>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                                <span className="material-symbols-outlined text-sm text-primary">verified</span>
                                LIC# CT-36775
                            </span>
                            <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                                <span className="material-symbols-outlined text-sm text-primary">shield</span>
                                Licensed | Insured | Bonded
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
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
    topElement
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

                <h2 className="text-2xl md:text-4xl font-header font-black text-white uppercase tracking-tight leading-[0.95] transition-colors duration-500 drop-shadow-[0_0_40px_rgba(0,174,239,0.25)] group-hover/section:text-primary">
                    <EditableText contentKey={`${effectiveKey}.title`} />
                    {hasHighlight ? (
                        <>
                            <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 neon-glow">
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
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center pt-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-[60px] hidden md:block"></div>
                <Link href="#sizing-guide" className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all flex items-center gap-2 active:scale-95 group-hover/section:text-primary">
                    <span className="material-symbols-outlined text-base">straighten</span>
                    Verify Room Sizing
                </Link>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-[60px] hidden md:block"></div>
            </div>
        </div>
    );
}

function LogisticsSection() {
    const { content } = useContent();
    const logistics = content?.logistics;

    if (!logistics) return null;

    return (
        <section id="logistics" className="relative py-12 md:py-20 group">
            <div className="absolute inset-0 bg-[#0f131a] rounded-[2rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] ring-1 ring-white/10 mx-4 md:mx-0"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 space-y-16">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
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

function EducationalBenefitsSection() {
    function EducationalBenefitsSection() {
        return (
            <section id="calendar-booking" className="relative py-12 overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <AdminCalendar />
            </section>
        );
    }

    function RebateSection() {
        return (
            <section id="rebate" className="relative py-12 md:py-20 overflow-hidden group">
                {/* Background elements */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                <div className="absolute inset-0 bg-emerald-500/[0.02] rounded-[2rem] mx-4 md:mx-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-[10px] font-header font-black tracking-widest uppercase">
                            <span className="material-symbols-outlined text-sm">eco</span>
                            <EditableText contentKey="shop.rebate.badge" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-header font-black text-white uppercase tracking-tighter leading-none">
                            <EditableText contentKey="shop.rebate.title" /><br />
                            <span className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <EditableText contentKey="shop.rebate.title_highlight" />
                            </span>
                        </h2>
                        <div className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium uppercase tracking-widest opacity-80">
                            <BacklinkedText narrativeKey="rebate" />
                        </div>
                    </div>

                    {/* 3-Step Process */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[0, 1, 2].map((i) => {
                            const isDownload = i === 1;
                            if (isDownload) {
                                return (
                                    <a
                                        key={i}
                                        href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="industrial-card p-8 bg-[#0f131a] border border-white/5 rounded-2xl relative z-20 group/card flex flex-col items-center text-center space-y-6 hover:border-emerald-500/50 transition-all hover:-translate-y-1 block cursor-pointer"
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
                                <div key={i} className="industrial-card p-8 bg-[#0f131a] border border-white/5 rounded-2xl relative group/card flex flex-col items-center text-center space-y-6">
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

                    {/* Why It Matters (Bento Highlights) */}
                    <div className="bg-[#0f131a]/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 md:p-12 space-y-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50"></div>

                        <div className="relative z-10 text-center space-y-4">
                            <h4 className="text-emerald-500 font-header font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px]">
                                <EditableText contentKey="shop.rebate.why_matters.title" />
                            </h4>
                            <h3 className="text-2xl md:text-4xl font-header font-black text-white uppercase tracking-tighter">
                                <EditableText contentKey="shop.rebate.why_matters.title_highlight" />
                            </h3>
                            <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-medium uppercase tracking-widest opacity-80">
                                <EditableText contentKey="shop.rebate.why_matters.description" />
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group/item">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover/item:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">
                                            <EditableText contentKey={`shop.rebate.why_matters.highlights.${i}.icon`} />
                                        </span>
                                    </div>
                                    <span className="text-[10px] md:text-[11px] font-header font-black uppercase tracking-[0.2em] text-white/90 text-center">
                                        <EditableText contentKey={`shop.rebate.why_matters.highlights.${i}.title`} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    function BrandSpotlightSection() {
        return (
            <section className="relative">

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
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(380px,auto)]"
                >
                    {/* LG Bento Cell (Large/Primary) */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.98 },
                            show: { opacity: 1, scale: 1 }
                        }}
                        className="lg:col-span-7 bg-[#0a0e14] border border-white/5 rounded-[2rem] p-6 md:p-10 relative overflow-hidden group/lg ring-1 ring-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center text-center transition-all duration-700 hover:border-rose-500/40"
                    >
                        {/* Intensified Luminous LG Backdrop */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(211,18,69,0.12)_0%,transparent_60%)] opacity-0 group-hover/lg:opacity-100 transition-opacity duration-1000"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(211,18,69,0.06)_0%,transparent_50%)] opacity-30 group-hover/lg:opacity-100 transition-opacity duration-1000"></div>

                        {/* LG Industrial Accent */}
                        <div className="absolute top-0 left-0 w-24 h-[1.5px] bg-gradient-to-r from-rose-600 to-transparent opacity-30 group-hover/lg:w-48 group-hover/lg:opacity-100 transition-all duration-1000"></div>

                        <div className="relative z-10 w-full flex flex-col items-center">
                            <div className="flex items-center justify-between w-full mb-10">
                                <div className="relative mb-2 transition-transform duration-700 group-hover/lg:scale-110">
                                    <span className="text-rose-500 font-sans font-black tracking-tighter text-6xl drop-shadow-xl">LG</span>
                                </div>
                                <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-500 text-[8px] font-header font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(211,18,69,0.1)] group-hover/lg:shadow-[0_0_20px_rgba(211,18,69,0.25)] transition-all">Authorized Dealer</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-header font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter group-hover/lg:text-rose-50 transition-colors duration-500">
                                <EditableText contentKey="shop.bento.lg.title" defaultValue="DUAL INVERTER INFRASTRUCTURE" />
                            </h3>
                            <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-lg mb-10 uppercase tracking-wider [word-spacing:0.1em] opacity-80 group-hover/lg:opacity-100 transition-opacity">
                                <EditableText contentKey="shop.bento.lg.description" defaultValue="LG'S REVOLUTIONARY DUAL INVERTER COMPRESSOR™ ELIMINATES THE NOISY STOP-AND-START CYCLE, SAVING UP TO 40% MORE ENERGY." />
                            </p>
                            <ul className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
                                <li className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/[0.03] transition-all duration-500 group/item">
                                    <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_12px_rgba(211,18,69,0.3)] transition-all">
                                        <span className="material-symbols-outlined text-xl">volume_off</span>
                                    </div>
                                    <span className="text-[10px] font-header font-black uppercase tracking-widest text-white/70 group-hover/item:text-white transition-colors">
                                        <EditableText contentKey="shop.bento.lg.feature1" defaultValue="LODECIBEL™ SILENT MODE" />
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/[0.03] transition-all duration-500 group/item">
                                    <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_12px_rgba(211,18,69,0.3)] transition-all">
                                        <span className="material-symbols-outlined text-xl">wifi</span>
                                    </div>
                                    <span className="text-[10px] font-header font-black uppercase tracking-widest text-white/70 group-hover/item:text-white transition-colors">
                                        <EditableText contentKey="shop.bento.lg.feature2" defaultValue="THINQ® SMART CONTROL" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <Link href="/shop?brand=LG" className="mt-10 w-full md:w-fit px-10 h-14 bg-white/5 hover:bg-rose-600 border border-white/10 hover:border-rose-500 rounded-xl flex items-center justify-center gap-3 text-white font-header font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(211,18,69,0.25)] active:scale-95 relative overflow-hidden group/btn">
                            <span className="relative z-10">Explore LG Range</span>
                            <span className="material-symbols-outlined text-xs relative z-10 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </motion.div>

                    {/* GE Bento Cell (Secondary/Detailed) */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.98 },
                            show: { opacity: 1, scale: 1 }
                        }}
                        className="lg:col-span-5 bg-[#0a0e14] border border-white/5 rounded-[2rem] p-6 md:p-10 relative overflow-hidden group/ge ring-1 ring-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col items-center text-center transition-all duration-700 hover:border-blue-500/40"
                    >
                        {/* Intensified Luminous GE Backdrop */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,94,184,0.12)_0%,transparent_60%)] opacity-0 group-hover/ge:opacity-100 transition-opacity duration-1000"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,94,184,0.06)_0%,transparent_50%)] opacity-30 group-hover/ge:opacity-100 transition-opacity duration-1000"></div>

                        {/* GE Industrial Accent */}
                        <div className="absolute top-0 right-0 w-24 h-[1.5px] bg-gradient-to-l from-blue-600 to-transparent opacity-30 group-hover/ge:w-48 group-hover/ge:opacity-100 transition-all duration-1000"></div>

                        <div className="relative z-10 flex flex-col items-center h-full w-full">
                            <div className="flex items-center justify-between w-full mb-10">
                                <div className="relative mb-2 transition-transform duration-700 group-hover/ge:scale-110">
                                    <span className="text-blue-400 font-serif font-bold tracking-wide text-3xl drop-shadow-xl">GE APPLIANCES</span>
                                </div>
                                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[8px] font-header font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,94,184,0.1)] group-hover/ge:shadow-[0_0_20px_rgba(0,94,184,0.25)] transition-all">Island Verified</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-header font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter group-hover/ge:text-blue-50 transition-colors duration-500">
                                <EditableText contentKey="shop.bento.ge.title" defaultValue="INDUSTRIAL COMMAND SUITE" />
                            </h3>
                            <p className="text-slate-400 text-xs md:text-base leading-relaxed mb-10 uppercase tracking-wider opacity-80 max-w-sm group-hover/ge:opacity-100 transition-opacity">
                                <EditableText contentKey="shop.bento.ge.description" defaultValue="ENGINEERED FOR STEADY-STATE PERFORMANCE IN HIGH-SALINITY MARITIME ENVIRONMENTS. PRECISION BUILT FOR HAWAII REGIONS." />
                            </p>
                            <ul className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
                                <li className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/[0.03] transition-all duration-500 group/item">
                                    <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 group-hover/item:scale-110 group-hover/item:shadow-[0_0_12px_rgba(0,94,184,0.3)] transition-all">
                                        <span className="material-symbols-outlined text-xl">dark_mode</span>
                                    </div>
                                    <span className="text-[10px] font-header font-black uppercase tracking-widest text-white/70 group-hover/item:text-white transition-colors">
                                        <EditableText contentKey="shop.bento.ge.feature1" defaultValue="NIGHT MODE DIMMING" />
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/[0.03] transition-all duration-500 group/item">
                                    <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 group-hover/item:scale-110 group-hover/item:shadow-[0_0_12px_rgba(0,94,184,0.3)] transition-all">
                                        <span className="material-symbols-outlined text-xl">install_desktop</span>
                                    </div>
                                    <span className="text-[10px] font-header font-black uppercase tracking-widest text-white/70 group-hover/item:text-white transition-colors">
                                        <EditableText contentKey="shop.bento.ge.feature2" defaultValue="EZ MOUNT CALIBRATION" />
                                    </span>
                                </li>
                            </ul>
                            <Link href="/shop?brand=GE" className="mt-10 w-full md:w-fit px-10 h-14 bg-white/5 hover:bg-blue-700 border border-white/10 hover:border-blue-600 rounded-xl flex items-center justify-center gap-3 text-white font-header font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,94,184,0.25)] active:scale-95 relative overflow-hidden group/btn">
                                <span className="relative z-10">Shop GE Units</span>
                                <span className="material-symbols-outlined text-xs relative z-10 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
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
                    { name: "AJCQ08AWJ", link: "#ge" }
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
                    { name: "AJCQ12AWJ", link: "#ge" }
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
                    { name: "LW2422IVSM", link: "#dual_inverter" }
                ]
            },
        ];

        return (
            <section id="sizing-guide" className="scroll-mt-20 px-4">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-block px-5 py-2 bg-white/5 rounded-md border border-white/10 text-[10px] md:text-[11px] font-header font-black uppercase tracking-[0.5em] text-primary mb-4 shadow-[0_0_20px_rgba(0,174,239,0.1)]">
                        <EditableText contentKey="shop.guide.subtitle" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-header font-black text-white mb-6 uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <EditableText contentKey="shop.guide.title" />
                    </h2>
                    <div className="text-slate-400 max-w-4xl mx-auto text-sm md:text-base leading-relaxed font-medium opacity-80 uppercase tracking-widest [word-spacing:0.12em]">
                        <BacklinkedText narrativeKey="sizing_guide" />
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="!hidden md:!block overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-charcoal relative">
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
                        <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-40"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Coverage Area</p>
                                    <h3 className="text-xl font-header font-black text-white uppercase">{row.sq} sq. ft.</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Capacity</p>
                                    <span className="text-lg font-header font-black text-white">{row.btu} <span className="text-[10px] text-primary">BTU</span></span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Ideal Application</p>
                                <p className="text-slate-400 text-sm font-medium">{row.app}</p>
                            </div>
                            <div className="pt-4 border-t border-white/5 bg-white/[0.01] -mx-6 -mb-6 p-6">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Recommended Models</p>
                                <div className="flex flex-wrap gap-2">
                                    {sizingData[i].models.map((m, idx) => (
                                        <Link
                                            key={idx}
                                            href={m.link}
                                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-center gap-3 flex-1 min-w-[140px] shadow-lg active:scale-95"
                                        >
                                            <span className="material-symbols-outlined text-xs text-primary">ac_unit</span>
                                            {m.name}
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
                            desc: <>If the room has <span className="text-primary/90 font-bold">high ceilings (over 8ft)</span> or lacks significant insulation, we recommend <span className="text-white font-bold italic underline decoration-primary/30 underline-offset-4">"sizing up"</span> within these conservative ranges to ensure the unit doesn't run at 100% capacity continuously.</>
                        },
                        {
                            title: "Solar Exposure",
                            icon: "wb_sunny",
                            desc: <>For rooms facing west with <span className="text-primary/90 font-bold">heavy afternoon sun</span>, add an <span className="text-primary font-black scale-105 inline-block mx-1">additional 10%</span> to your calculated square footage before selecting a BTU tier.</>
                        },
                        {
                            title: "Inverter Advantage",
                            icon: "speed",
                            desc: <>Units in the <span className="text-white font-bold italic">LG DUAL Inverter series</span> can modulate their speed, making them <span className="text-primary/90 font-bold">more forgiving</span> if you slightly "oversize" for a space compared to a standard single-speed unit.</>
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

    function FAQSection() {
        return (
            <section className="mb-20 max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center gap-6 mb-12 text-center">
                    <span className="text-primary font-header font-black uppercase tracking-[0.6em] text-[10px] md:text-[11px] block opacity-70">
                        Knowledge Infrastructure
                    </span>
                    <h2 className="text-4xl md:text-6xl font-header font-black text-white uppercase tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <EditableText contentKey="shop.faq.title" />
                    </h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                </div>

                <div className="grid gap-4">
                    {[
                        { q: "Do you offer installation for Window ACs?", a: "Unless specified, Window ACs are cash-and-carry. However, we offer professional installation services for an additional fee, especially for second-story windows or custom mounting requirements." },
                        { q: "What is your return policy?", a: "Unopened units can be returned within 30 days. Defective units are covered under the manufacturer&apos;s warranty, which we service directly here in Waipahu as an authorized center." },
                        { q: "How do I know if I have a 115V or 230V outlet?", a: "Standard household plugs are 115V (parallel prongs). 230V outlets are typically larger with horizontal or T-shaped prongs and are required for units 18,000 BTU and above. Check your wall socket before buying!" },
                    ].map((faq, i) => (
                        <details key={i} className="group bg-charcoal border border-white/5 rounded-2xl overflow-hidden open:bg-white/[0.02] open:border-primary/40 open:shadow-[0_0_30px_rgba(0,174,239,0.05)] transition-all duration-300 hover:border-white/10">
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-300 hover:text-white transition-colors select-none text-sm md:text-base uppercase tracking-wide">
                                {faq.q}
                                <span className="material-symbols-outlined text-slate-500 group-open:rotate-180 group-open:text-primary transition-all duration-300 bg-white/5 rounded-full p-2 group-hover:bg-white/10">expand_more</span>
                            </summary>
                            <div className="px-6 pb-8 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-6 animate-in fade-in slide-in-from-top-2">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
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
                className="flex flex-wrap justify-center gap-4 md:gap-5"
            >
                {products.map(product => (
                    <motion.div
                        key={product.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[360px]"
                    >
                        <ProductCard product={product} onQuickAdd={() => onQuickAdd(product)} rebate={rebate} />
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    function ProductCard({ product, onQuickAdd, rebate }: { product: Product; onQuickAdd: () => void; rebate?: string }) {
        const router = useRouter();

        return (
            <div
                onClick={() => router.push(`/shop/${product.id}`)}
                className="industrial-card group flex flex-col bg-[#0f131a] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_50px_rgba(0,174,239,0.15)] transition-all duration-700 relative h-full ring-1 ring-white/5 active:scale-[0.98] cursor-pointer"
            >
                {/* Image Area with Luminous Hover & Immersive Blending */}
                <div className="w-full aspect-[16/10] bg-[#05070a] relative overflow-hidden transition-all duration-700 border-b border-white/5 p-4 flex items-center justify-center">
                    {/* Immersive radial depth */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.15)_0%,transparent_75%)] opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
                    {/* Floor shadow/reflection simulation */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f131a]/95 to-transparent z-10"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"></div>

                    {rebate && (
                        <div className="absolute top-0 left-0 z-20 bg-emerald-500 text-white font-header font-black text-[8px] md:text-[9px] px-4 py-2 rounded-br-2xl uppercase tracking-[0.2em] shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.2)] border-b border-r border-emerald-400/30">
                            {rebate}
                        </div>
                    )}

                    {/* Stock Badge */}
                    {/* Stock Badge - Seamless Integration */}
                    <div className="absolute top-0 right-0 z-20">
                        {product.stock > 0 ? (
                            <div className="bg-emerald-500/10 text-emerald-500 border-b border-l border-emerald-500/20 font-header font-black text-[8px] md:text-[9px] px-4 py-2 rounded-bl-2xl uppercase tracking-[0.2em] backdrop-blur-md">
                                In Stock
                            </div>
                        ) : (
                            <div className="bg-red-500/10 text-red-500 border-b border-l border-red-500/20 font-header font-black text-[8px] md:text-[9px] px-4 py-2 rounded-bl-2xl uppercase tracking-[0.2em] backdrop-blur-md">
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
                        <h3 className="text-white text-lg md:text-xl font-header font-black leading-tight group-hover:text-primary transition-colors duration-500 uppercase tracking-tight">
                            {product.name}
                        </h3>
                    </div>

                    {/* Technical Specs (2x2 Grid Layout) */}
                    <div className="grid grid-cols-2 gap-1.5 w-full mb-4">
                        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Cooling</span>
                            <span className="text-white text-[10px] font-bold font-header">{product.btu ? `${product.btu.toLocaleString()} BTU` : 'N/A'}</span>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Voltage</span>
                            <span className="text-white text-[10px] font-bold font-header">{product.voltage || '115V'}</span>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Noise Level</span>
                            <span className="text-white text-[10px] font-bold font-header lowercase">{product.noise_level || 'N/A'}</span>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Dehumidification</span>
                            <span className="text-white text-[10px] font-bold font-header">{product.dehumidification || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Transaction Hub (Centered) */}
                    <div className="mt-auto pt-3 border-t border-white/5 flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center gap-2 justify-center">
                            <div className="text-red-500/60 text-[9px] font-black uppercase tracking-widest line-through decoration-red-500/30 opacity-80">
                                ${(product.price * 1.15).toLocaleString()}
                            </div>
                            <div className="text-xl md:text-2xl font-header font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:text-primary transition-colors">
                                ${product.price.toLocaleString()}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 w-full">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/shop/${product.id}`);
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
                                    onQuickAdd();
                                }}
                                className="bg-primary text-white font-header font-black text-[8px] py-3 rounded-lg text-center uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[12px]">add_shopping_cart</span>
                                SECURE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
