'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
// Fix import path: go up two levels to 'web', then into 'context'
import { useCart } from '../../context/CartContext';
import { getProductImages } from '../../lib/product-images';
import { Product } from '../../types/inventory';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import { Reorder, motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { BackToTop } from '@/components/BackToTop';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { cn, generateProductSlug, isCampaignActive as isCampaignActiveChecker } from '@/lib/utils';
import contentData from '@/lib/content/content.json';

import { 
    AlertTriangle, Warehouse, Truck, Ban, Leaf, Wind, ArrowUpRight, Eye, Check, X,
    Maximize2, Snowflake, Cpu, LayoutGrid, ShoppingCart, FileText, Mail, Droplets, Sun, Gauge,
    Plug, Wrench, Sparkles, RotateCcw, Phone, Calendar, Search, SlidersHorizontal, ArrowUpDown,
    Layers, Filter, ShieldCheck, ChevronDown
} from 'lucide-react';

const LucideIconMap: Record<string, React.ComponentType<any>> = {
    energy_savings_leaf: Leaf,
    settings_overscan: Maximize2,
    ac_unit: Snowflake,
    token: Cpu,
    vertical_split: LayoutGrid,
    local_shipping: Truck,
    warehouse: Warehouse,
    warning: AlertTriangle,
    block: Ban,
    eco: Leaf,
    shopping_cart: ShoppingCart,
    description: FileText,
    mail: Mail,
    north_east: ArrowUpRight,
    humidity_mid: Droplets,
    wb_sunny: Sun,
    speed: Gauge,
    visibility: Eye,
    add_shopping_cart: ShoppingCart,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = LucideIconMap[name];
    if (!IconComponent) {
        console.warn(`Icon ${name} not found in LucideIconMap`);
        return <AlertTriangle className={className} />;
    }
    return <IconComponent className={className} />;
}

function ShopPageContent() {
    const { addToCart, items, openCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { content } = useContent();

    // Multi-tier filter states
    const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'dual_inverter' | 'base' | 'casement' | 'ge' | 'universal_fit'>('ALL');
    const [selectedCapacity, setSelectedCapacity] = useState<'ALL' | 'BEDROOM' | 'MASTER' | 'LIVING'>('ALL');
    const [selectedVoltage, setSelectedVoltage] = useState<'ALL' | '115V' | '230V'>('ALL');
    const [selectedMount, setSelectedMount] = useState<'ALL' | 'HUNG' | 'SLIDER' | 'SLEEVE'>('ALL');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    const [sortOption, setSortOption] = useState<'featured' | 'price_asc' | 'price_desc' | 'btu_asc' | 'btu_desc' | 'ceer'>('featured');
    const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState<boolean>(false);

    // Comparison drawer state
    const [compareList, setCompareList] = useState<Product[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

    const handleToggleCompare = (product: Product) => {
        setCompareList(prev => {
            const exists = prev.some(p => p.id === product.id);
            if (exists) {
                return prev.filter(p => p.id !== product.id);
            }
            if (prev.length >= 3) {
                return [...prev.slice(1), product];
            }
            return [...prev, product];
        });
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('ALL');
        setSelectedCapacity('ALL');
        setSelectedVoltage('ALL');
        setSelectedMount('ALL');
        setInStockOnly(false);
        setSortOption('featured');
        setIsMoreFiltersOpen(false);
    };

    const activeSecondaryFilterCount = (selectedCapacity !== 'ALL' ? 1 : 0) + (selectedVoltage !== 'ALL' ? 1 : 0) + (selectedMount !== 'ALL' ? 1 : 0);

    const isFiltered = Boolean(
        searchQuery.trim() ||
        selectedCategory !== 'ALL' ||
        selectedCapacity !== 'ALL' ||
        selectedVoltage !== 'ALL' ||
        selectedMount !== 'ALL' ||
        inStockOnly ||
        sortOption !== 'featured'
    );

    const filteredProducts = useMemo(() => {
        let result = products.filter(p => {
            // Search query across specifications
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchName = (p.name || '').toLowerCase().includes(q);
                const matchCat = (p.category || '').toLowerCase().includes(q);
                const matchSub = (p.subcategory || '').toLowerCase().includes(q);
                const matchBtu = p.btu ? p.btu.toString().includes(q) : false;
                const matchVolt = (p.voltage || '').toLowerCase().includes(q);
                const matchCovAham = (p.coverage_aham || '').toLowerCase().includes(q);
                const matchCovOahu = (p.coverage_oahu || '').toLowerCase().includes(q);
                const matchChassis = (p.chassis_type || '').toLowerCase().includes(q);
                if (!matchName && !matchCat && !matchSub && !matchBtu && !matchVolt && !matchCovAham && !matchCovOahu && !matchChassis) {
                    return false;
                }
            }

            // Category filter
            if (selectedCategory !== 'ALL') {
                if (p.subcategory !== selectedCategory) return false;
            }

            // Voltage filter
            if (selectedVoltage === '115V') {
                if (p.voltage && !p.voltage.includes('115V')) return false;
            } else if (selectedVoltage === '230V') {
                if (p.voltage && !p.voltage.includes('230V') && !p.voltage.includes('208')) return false;
            }

            // Room sizing capacity filter
            if (selectedCapacity === 'BEDROOM') {
                if (p.btu && p.btu > 8500) return false;
            } else if (selectedCapacity === 'MASTER') {
                if (p.btu && (p.btu < 9000 || p.btu > 14500)) return false;
            } else if (selectedCapacity === 'LIVING') {
                if (p.btu && p.btu < 15000) return false;
            }

            // Window mounting type filter
            if (selectedMount === 'SLIDER') {
                if (p.subcategory !== 'casement') return false;
            } else if (selectedMount === 'SLEEVE') {
                if (p.subcategory !== 'universal_fit') return false;
            } else if (selectedMount === 'HUNG') {
                if (p.subcategory === 'casement' || p.subcategory === 'universal_fit') return false;
            }

            // In-stock only filter
            if (inStockOnly && p.stock <= 0) {
                return false;
            }

            return true;
        });

        // Sorting
        return result.sort((a, b) => {
            if (sortOption === 'price_asc') return a.price - b.price;
            if (sortOption === 'price_desc') return b.price - a.price;
            if (sortOption === 'btu_asc') return (a.btu || 0) - (b.btu || 0);
            if (sortOption === 'btu_desc') return (b.btu || 0) - (a.btu || 0);
            if (sortOption === 'ceer') {
                const ceerA = parseFloat(a.ceer_rating || '0');
                const ceerB = parseFloat(b.ceer_rating || '0');
                return ceerB - ceerA;
            }
            return 0;
        });
    }, [products, searchQuery, selectedCategory, selectedCapacity, selectedVoltage, selectedMount, inStockOnly, sortOption]);

    const CATEGORIES = [
        { id: 'ALL', label: 'All Units', count: products.length },
        { id: 'dual_inverter', label: 'LG DUAL Inverter', count: products.filter(p => p.subcategory === 'dual_inverter').length },
        { id: 'base', label: 'Frigidaire Standard', count: products.filter(p => p.subcategory === 'base').length },
        { id: 'casement', label: 'Slider / Casement', count: products.filter(p => p.subcategory === 'casement').length },
        { id: 'ge', label: 'GE Inverter', count: products.filter(p => p.subcategory === 'ge').length },
        { id: 'universal_fit', label: 'Universal Fit (Sleeve)', count: products.filter(p => p.subcategory === 'universal_fit').length },
    ];

    const sectionOrder = (content?.shop?.sections && content.shop.sections.includes("sizing-banner"))
        ? content.shop.sections
        : [
            "dual_inverter", "sizing-banner", "universal_fit", "base", "ge", "casement", "appointment-banner", "logistics", "sizing-guide"
        ];

    const sectionMap: Record<string, React.ReactNode> = {
        "dual_inverter": (
            <div id="dual_inverter" className="relative space-y-8">
                <SectionHeader
                    contentKey="shop.dual_inverter"
                    icon="energy_savings_leaf"
                    badge="$45 Hawaii Energy Rebate"
                    narrativeKey="dual_inverter"
                    hideDescription={true}
                />

                {/* Conversion Quick Bridges */}
                <div className="max-w-4xl mx-auto bg-slate-900/40 border border-white/5 rounded-2xl p-3.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <Link 
                            href="/window-ac-installation" 
                            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
                        >
                            <Wrench className="size-3 text-primary" />
                            <span>Need Installation? Jalousie & Bracket Service</span>
                        </Link>
                        <Link 
                            href="/clean-vs-replace-window-ac" 
                            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-400/40 transition-colors"
                        >
                            <RotateCcw className="size-3 text-cyan-400" />
                            <span>Clean vs Replace Calculator</span>
                        </Link>
                    </div>
                    <a 
                        href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono text-[11px] font-bold hover:underline"
                    >
                        <FileText className="size-3.5" />
                        <span>$45 Hawaii Energy Rebate Form PDF &rarr;</span>
                    </a>
                </div>

                <ProductGrid
                    products={products.filter(p => p.subcategory === 'dual_inverter')}
                    onQuickAdd={addToCart}
                    rebate="$45 Hawaii Energy Rebate"
                    compareList={compareList}
                    onToggleCompare={handleToggleCompare}
                />
            </div>
        ),

        "sizing-banner": (
            <div id="sizing-banner" className="relative my-8">
                <div className="bg-[#0b1120]/60 border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md shadow-lg shadow-primary/5 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none z-0" />
                    <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-primary to-transparent opacity-50 group-hover:w-24 transition-all duration-500"></div>

                    <div className="space-y-2 relative z-10 text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-mono uppercase tracking-widest">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            Calibrated Oahu Sizing Matrix
                        </div>
                        <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight">Not Sure What AC Size You Need?</h3>
                        <p className="font-sans text-xs text-slate-400 max-w-xl">
                            Skip the guesswork. Run our interactive, step-by-step sizing wizard calibrated for Hawaii humidity and Oahu micro-climates. Zero typing required.
                        </p>
                    </div>

                    <Link 
                        href="/sizing"
                        className="w-full md:w-auto px-8 py-3.5 bg-primary hover:bg-primary/95 text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.2)] hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0 group active:scale-98 relative z-10"
                    >
                        Launch Sizing Wizard <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
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
                    compareList={compareList}
                    onToggleCompare={handleToggleCompare}
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
                    compareList={compareList}
                    onToggleCompare={handleToggleCompare}
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
                    compareList={compareList}
                    onToggleCompare={handleToggleCompare}
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
                    compareList={compareList}
                    onToggleCompare={handleToggleCompare}
                />
            </div>
        ),

        "appointment-banner": (
            <div id="appointment-banner" className="relative my-8">
                <div className="bg-gradient-to-r from-slate-900 via-primary/10 to-slate-900 border border-primary/30 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,174,239,0.1)]">
                    <div className="space-y-2 text-center lg:text-left flex-1">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            By Appointment First • Free Installation & Replacement Estimates
                        </div>
                        <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight">
                            Need Professional Sizing or Installation Advice?
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                            It is <strong className="text-white">zero cost to book an appointment for estimates</strong> on new or replacement mini split and window AC installations! Call our office directly at <a href="tel:808-488-1111" className="text-cyan-300 font-bold hover:underline">(808) 488-1111</a>, email <a href="mailto:office@affordablehome-ac.com" className="text-cyan-300 font-bold hover:underline">office@affordablehome-ac.com</a>, or submit the appointment form.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                        <a 
                            href="tel:808-488-1111"
                            className="w-full sm:w-auto px-6 py-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Phone className="size-4 shrink-0" />
                            <span>Call (808) 488-1111</span>
                        </a>
                        <Link 
                            href="/contact"
                            className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-header font-bold uppercase text-xs tracking-wider rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Calendar className="size-4 text-cyan-400 shrink-0" />
                            <span>Book Appt Form</span>
                        </Link>
                    </div>
                </div>
            </div>
        ),

        "logistics": (
            <div id="logistics_container" className="space-y-6">
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

                {/* 4 Trust & Service Delivery Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-slate-900/60 border border-white/10 hover:border-primary/40 rounded-2xl p-3.5 flex items-center gap-3 transition-colors shadow-inner">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <Warehouse className="size-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-header font-black text-xs uppercase tracking-wider">Waipahu Pickup</div>
                            <div className="text-slate-400 text-[10px] leading-tight">By Appointment (Leoleo St)</div>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-white/10 hover:border-primary/40 rounded-2xl p-3.5 flex items-center gap-3 transition-colors shadow-inner">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                            <Truck className="size-5 text-cyan-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-header font-black text-xs uppercase tracking-wider">$50 Flat Delivery</div>
                            <div className="text-slate-400 text-[10px] leading-tight">Island-Wide Direct to Door</div>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-white/10 hover:border-primary/40 rounded-2xl p-3.5 flex items-center gap-3 transition-colors shadow-inner">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                            <Leaf className="size-5 text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-header font-black text-xs uppercase tracking-wider">$45 Cash Rebate</div>
                            <div className="text-slate-400 text-[10px] leading-tight">Hawaii Energy Form Included</div>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-white/10 hover:border-primary/40 rounded-2xl p-3.5 flex items-center gap-3 transition-colors shadow-inner">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <Wrench className="size-5 text-amber-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-header font-black text-xs uppercase tracking-wider">Zero Upfront Fee</div>
                            <div className="text-slate-400 text-[10px] leading-tight">Free Installation Estimates</div>
                        </div>
                    </div>
                </div>

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
                if (searchQuery) params.append('q', searchQuery);
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

            <main className="max-w-[1600px] mx-auto w-full px-4 md:px-12 pt-[70px] md:pt-[105px] pb-36 md:pb-20 flex-grow">
                {/* Compact Shop Hero & Micro-Trust Bar */}
                <div className="flex flex-col items-center text-center gap-1.5 md:gap-2 mb-4 border-b border-white/5 pb-3 md:pb-4 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10 opacity-25"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-black leading-tight tracking-tight uppercase px-4 neon-glow">
                            <span className="text-white">
                                <EditableText contentKey="shop.hero.title_word1" />
                            </span>{" "}
                            <span className="text-primary">
                                <EditableText contentKey="shop.hero.title_word2" />
                            </span>{" "}
                            <span className="text-primary">
                                <EditableText contentKey="shop.hero.title_word3" />
                            </span>{" "}
                            <span className="text-white">
                                <EditableText contentKey="shop.hero.title_word4" />
                            </span>
                        </h1>

                        {/* 1-Line Sleek Micro-Trust Strip */}
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] md:text-xs font-mono text-slate-300">
                            <span className="inline-flex items-center gap-1.5 text-primary">
                                <Warehouse className="size-3.5 shrink-0" />
                                <span>Waipahu Warehouse Pickup</span>
                            </span>
                            <span className="text-white/20 hidden sm:inline">•</span>
                            <span className="inline-flex items-center gap-1.5 text-cyan-400">
                                <Truck className="size-3.5 shrink-0" />
                                <span>$50 Flat Island Delivery</span>
                            </span>
                            <span className="text-white/20 hidden sm:inline">•</span>
                            <span className="inline-flex items-center gap-1.5 text-emerald-400">
                                <Leaf className="size-3.5 shrink-0" />
                                <span>$45 Hawaii Energy Rebates</span>
                            </span>
                            <span className="text-white/20 hidden md:inline">•</span>
                            <span className="inline-flex items-center gap-1.5 text-amber-400">
                                <ShieldCheck className="size-3.5 shrink-0" />
                                <span>1-Yr Warranty &amp; CT-36775</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Compact Master Toolbar: Category Tabs + Quick Controls + Collapsible Drawer */}
                <div id="catalog-controls" className="max-w-7xl mx-auto px-2 sm:px-4 mb-5">
                    <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-2.5 sm:p-3.5 backdrop-blur-xl shadow-xl space-y-2.5">
                        
                        {/* Row 1: Horizontal Category Tabs + Sizing Shortcut */}
                        <div className="flex items-center justify-between gap-2 overflow-hidden">
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-1">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id as any)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-xl text-xs font-header font-black uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5",
                                            selectedCategory === cat.id
                                                ? "bg-primary text-slate-950 shadow-[0_0_15px_rgba(0,174,239,0.35)] scale-[1.02]"
                                                : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/5"
                                        )}
                                    >
                                        <span>{cat.label}</span>
                                        <span className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded-md font-mono",
                                            selectedCategory === cat.id
                                                ? "bg-slate-950/20 text-slate-950 font-black"
                                                : "bg-white/10 text-slate-400"
                                        )}>
                                            {cat.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <Link
                                href="/sizing"
                                className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-[11px] font-mono uppercase tracking-wider shrink-0 transition-all hover:scale-[1.02]"
                            >
                                <Sparkles className="size-3" />
                                <span>Sizing Wizard &rarr;</span>
                            </Link>
                        </div>

                        {/* Row 2: Search + In-Stock + Sort + Expand Filters Button */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                            {/* Search Input */}
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search 16 models by brand, BTU, plug..."
                                    className="w-full pl-9 pr-8 py-2 bg-slate-950/70 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all font-sans"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                                        title="Clear search"
                                    >
                                        <X className="size-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* In-Stock Toggle */}
                            <button
                                type="button"
                                onClick={() => setInStockOnly(!inStockOnly)}
                                className={cn(
                                    "px-3 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0",
                                    inStockOnly
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                                        : "bg-slate-950/70 border-white/10 text-slate-400 hover:text-white"
                                )}
                            >
                                <span className={cn("size-2 rounded-full", inStockOnly ? "bg-emerald-400 animate-pulse" : "bg-slate-600")} />
                                <span>In-Stock</span>
                            </button>

                            {/* Sort Selector */}
                            <div className="relative flex items-center shrink-0">
                                <ArrowUpDown className="absolute left-2.5 size-3 text-slate-400 pointer-events-none" />
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value as any)}
                                    className="pl-7 pr-6 py-2 bg-slate-950/70 border border-white/10 rounded-xl text-xs font-mono text-slate-200 uppercase tracking-wider focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    <option value="featured">Sort: Featured</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="btu_asc">Capacity: Low to High</option>
                                    <option value="btu_desc">Capacity: High to Low</option>
                                    <option value="ceer">Efficiency (CEER)</option>
                                </select>
                            </div>

                            {/* More Filters Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setIsMoreFiltersOpen(!isMoreFiltersOpen)}
                                className={cn(
                                    "px-3 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0",
                                    isMoreFiltersOpen || activeSecondaryFilterCount > 0
                                        ? "bg-primary/15 border-primary/50 text-primary shadow-[0_0_12px_rgba(0,174,239,0.2)]"
                                        : "bg-slate-950/70 border-white/10 text-slate-400 hover:text-white"
                                )}
                            >
                                <Filter className="size-3" />
                                <span className="hidden sm:inline">Filters</span>
                                {activeSecondaryFilterCount > 0 && (
                                    <span className="px-1.5 py-0.2 rounded-full bg-primary text-slate-950 font-black text-[10px]">
                                        {activeSecondaryFilterCount}
                                    </span>
                                )}
                                <ChevronDown className={cn("size-3 transition-transform duration-200", isMoreFiltersOpen && "rotate-180")} />
                            </button>
                        </div>

                        {/* Collapsible Secondary Filter Drawer */}
                        {isMoreFiltersOpen && (
                            <div className="pt-3 border-t border-white/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Multi-Dimensional Filter Strips: Room Sizer, Wall Plug Voltage, Mount */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {/* Room Sizer */}
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Room Sizer</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {[
                                                { id: 'ALL', label: 'All Sizes' },
                                                { id: 'BEDROOM', label: 'Bedrooms (6k-8k)' },
                                                { id: 'MASTER', label: 'Master (10k-14k)' },
                                                { id: 'LIVING', label: 'Great Rooms (18k+)' },
                                            ].map(f => (
                                                <button
                                                    key={f.id}
                                                    type="button"
                                                    onClick={() => setSelectedCapacity(f.id as any)}
                                                    className={cn(
                                                        "px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all",
                                                        selectedCapacity === f.id
                                                            ? "bg-primary text-slate-950 font-bold shadow-[0_0_12px_rgba(0,174,239,0.3)]"
                                                            : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
                                                    )}
                                                >
                                                    {f.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Wall Plug Voltage */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Plug Voltage</span>
                                            <Link href="/shop/window-ac-plug-guide" className="text-[10px] text-primary hover:underline font-mono uppercase flex items-center gap-1">
                                                <Plug className="size-2.5" />
                                                Guide &rarr;
                                            </Link>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {[
                                                { id: 'ALL', label: 'All Plugs' },
                                                { id: '115V', label: '115V Standard (15A)' },
                                                { id: '230V', label: '230V Heavy Duty (20A+)' },
                                            ].map(v => (
                                                <button
                                                    key={v.id}
                                                    type="button"
                                                    onClick={() => setSelectedVoltage(v.id as any)}
                                                    className={cn(
                                                        "px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all",
                                                        selectedVoltage === v.id
                                                            ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                                            : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
                                                    )}
                                                >
                                                    {v.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mounting / Window Type */}
                                    <div className="space-y-1.5">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Window Fitment</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {[
                                                { id: 'ALL', label: 'All Mounts' },
                                                { id: 'HUNG', label: 'Standard Sash' },
                                                { id: 'SLIDER', label: 'Slider / Casement' },
                                                { id: 'SLEEVE', label: 'Thru-the-Wall Sleeve' },
                                            ].map(m => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => setSelectedMount(m.id as any)}
                                                    className={cn(
                                                        "px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all",
                                                        selectedMount === m.id
                                                            ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                                                            : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
                                                    )}
                                                >
                                                    {m.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Popular Quick Queries inside drawer */}
                                <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none text-[11px]">
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                                        <Sparkles className="size-3 text-primary" />
                                        Popular:
                                    </span>
                                    {[
                                        { label: '12,000 BTU Inverter', query: '12,000' },
                                        { label: '115V Standard Plug', query: '115V' },
                                        { label: 'Quiet Dual Inverter', query: 'dual inverter' },
                                        { label: 'Casement / Slider', query: 'casement' },
                                        { label: '230V Great Room', query: '230V' },
                                    ].map(s => (
                                        <button
                                            key={s.label}
                                            type="button"
                                            onClick={() => setSearchQuery(s.query)}
                                            className="px-2 py-0.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-primary/30 text-slate-300 hover:text-white shrink-0 font-mono text-[10px] transition-colors"
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Active Filter Status Bar & Dismissal Chips */}
                {isFiltered && (
                    <div className="max-w-7xl mx-auto px-4 mb-6 animate-in fade-in duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-header font-black uppercase text-white tracking-wider">
                                    Showing {filteredProducts.length} of {products.length} Models
                                </span>

                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono">
                                        Search: &quot;{searchQuery}&quot;
                                        <button onClick={() => setSearchQuery('')} className="hover:text-white"><X className="size-3" /></button>
                                    </span>
                                )}

                                {selectedCategory !== 'ALL' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono">
                                        {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                                        <button onClick={() => setSelectedCategory('ALL')} className="hover:text-white"><X className="size-3" /></button>
                                    </span>
                                )}

                                {selectedCapacity !== 'ALL' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono">
                                        Room: {selectedCapacity}
                                        <button onClick={() => setSelectedCapacity('ALL')} className="hover:text-white"><X className="size-3" /></button>
                                    </span>
                                )}

                                {selectedVoltage !== 'ALL' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                                        Voltage: {selectedVoltage}
                                        <button onClick={() => setSelectedVoltage('ALL')} className="hover:text-white"><X className="size-3" /></button>
                                    </span>
                                )}

                                {selectedMount !== 'ALL' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono">
                                        Mount: {selectedMount}
                                        <button onClick={() => setSelectedMount('ALL')} className="hover:text-white"><X className="size-3" /></button>
                                    </span>
                                )}

                                {inStockOnly && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                                        In Stock Only
                                        <button onClick={() => setInStockOnly(false)} className="hover:text-white"><X className="size-3" /></button>
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={handleResetFilters}
                                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono uppercase tracking-wider transition-colors hover:underline"
                            >
                                <RotateCcw className="size-3" />
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Catalog Display: Filtered Grid or Curated Sections */}
                <div className="space-y-8 md:space-y-10">
                    {error ? (
                        <div className="py-20 text-center space-y-4 max-w-lg mx-auto bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                            <AlertTriangle className="text-red-500 size-12 mx-auto mb-2" />
                            <h2 className="text-xl font-header font-black text-red-400 tracking-widest uppercase">Live Connection Failure</h2>
                            <p className="text-slate-400 text-xs tracking-widest uppercase font-bold">{error}</p>
                            <p className="text-slate-500 text-[10px] tracking-widest uppercase mt-4">Review the backend API container health.</p>
                        </div>
                    ) : isFiltered ? (
                        filteredProducts.length === 0 ? (
                            <div className="py-16 md:py-24 text-center max-w-lg mx-auto bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-5 animate-in fade-in duration-300">
                                <div className="size-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                    <Snowflake className="size-8 animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight">
                                        No Units Matching Filter Combination
                                    </h3>
                                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                        Most Oahu residential spaces use standard 115V units between 8,000–12,000 BTU. Reset filters to browse our full inventory or call our Waipahu shop for custom sizing.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                                    <button
                                        onClick={handleResetFilters}
                                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,174,239,0.3)] flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw className="size-3.5" />
                                        <span>Reset All Filters</span>
                                    </button>
                                    <a
                                        href="tel:8084881111"
                                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-header font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Phone className="size-3.5 text-cyan-400" />
                                        <span>Call (808) 488-1111</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ProductGrid
                                    products={filteredProducts}
                                    onQuickAdd={addToCart}
                                    rebate="$45 Hawaii Energy Rebate"
                                    compareList={compareList}
                                    onToggleCompare={handleToggleCompare}
                                />
                                {sectionMap["appointment-banner"]}
                            </>
                        )
                    ) : (
                        sectionOrder.map((sectionId) => (
                            <div
                                key={sectionId}
                                className="relative group/section"
                            >
                                {sectionMap[sectionId] || null}
                            </div>
                        ))
                    )}
                </div>

                {/* Island Social Proof Marquee */}
                <div className="mt-12 border-t border-white/5 pt-8">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu Verified Customer Stories"
                        subtitle="Read feedback from homeowners who upgraded to whisper-quiet window ACs in Waipahu, Honolulu, and Kailua."
                    />
                </div>

            </main>

            {/* Floating Side-by-Side Comparison Dock */}
            {compareList.length > 0 && (
                <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-slate-950/95 border border-primary/40 rounded-2xl p-3 md:p-4 shadow-[0_0_40px_rgba(0,174,239,0.3)] backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center -space-x-2">
                                {compareList.map(c => {
                                    const img = c.image_url || getProductImages(c.id)?.[0];
                                    return (
                                        <div key={c.id} className="size-9 rounded-lg bg-slate-900 border border-primary/50 overflow-hidden relative shadow-md">
                                            {img ? (
                                                <Image src={img} alt={c.name} fill className="object-contain p-1" />
                                            ) : (
                                                <Snowflake className="size-4 m-auto text-primary" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <div className="text-white text-xs font-header font-black uppercase tracking-wider">
                                    Compare Models ({compareList.length}/3)
                                </div>
                                <div className="text-slate-400 text-[10px] hidden sm:block">
                                    Side-by-side AHAM vs Island Microclimate™ comparison
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsCompareOpen(true)}
                                className="px-4 py-2 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,174,239,0.3)]"
                            >
                                Compare Now
                            </button>
                            <button
                                onClick={() => setCompareList([])}
                                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                title="Clear comparison"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Compare Modal */}
            {isCompareOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-slate-950 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <div>
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight">
                                    Oahu Window AC Specification Comparison
                                </h3>
                                <p className="text-xs text-slate-400 font-mono">
                                    AHAM Factory Certified &bull; Island Microclimate Calibration™
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCompareOpen(false)}
                                className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {compareList.map(item => {
                                const img = item.image_url || getProductImages(item.id)?.[0];
                                return (
                                    <div key={item.id} className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                                        <div>
                                            <div className="relative w-full aspect-[4/3] bg-black/40 rounded-xl mb-3 overflow-hidden">
                                                {img && <Image src={img} alt={item.name} fill className="object-contain p-2" />}
                                            </div>
                                            <div className="text-[10px] font-mono text-primary uppercase">{item.category}</div>
                                            <h4 className="text-sm font-header font-black text-white uppercase mb-2 line-clamp-2">{item.name}</h4>
                                            <div className="text-xl font-header font-black text-cyan-400 mb-4">${item.price.toLocaleString()}</div>

                                            <div className="space-y-2 text-xs border-t border-white/5 pt-3">
                                                <div className="flex justify-between py-1 border-b border-white/5">
                                                    <span className="text-slate-400 text-[10px] uppercase font-mono">AHAM Factory:</span>
                                                    <span className="text-white font-semibold">{item.coverage_aham || item.coverage || 'Factory Rated'}</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-white/5">
                                                    <span className="text-cyan-400 text-[10px] uppercase font-mono">Island Sizing:</span>
                                                    <span className="text-cyan-300 font-bold">{item.coverage_oahu || 'Calibrated'}</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-white/5">
                                                    <span className="text-slate-400 text-[10px] uppercase font-mono">Capacity:</span>
                                                    <span className="text-white font-semibold">{item.btu?.toLocaleString() || 'N/A'} BTU</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-white/5">
                                                    <span className="text-slate-400 text-[10px] uppercase font-mono">Voltage:</span>
                                                    <span className="text-white font-semibold">{item.voltage || '115V'}</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-white/5">
                                                    <span className="text-slate-400 text-[10px] uppercase font-mono">Min Window:</span>
                                                    <span className="text-white font-semibold">{item.min_window_height ? `${item.min_window_height} H` : '16" H'}</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-white/5">
                                                    <span className="text-slate-400 text-[10px] uppercase font-mono">CEER Rating:</span>
                                                    <span className="text-emerald-400 font-bold">{item.ceer_rating || 'High Efficiency'}</span>
                                                </div>
                                                <div className="flex justify-between py-1">
                                                    <span className="text-slate-400 text-[10px] uppercase font-mono">Noise:</span>
                                                    <span className="text-white font-semibold">{item.noise_level || 'Ultra Quiet'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-white/5">
                                            <button
                                                onClick={() => {
                                                    addToCart(item);
                                                    setIsCompareOpen(false);
                                                }}
                                                className="w-full py-2.5 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,174,239,0.3)]"
                                            >
                                                Add to Cart (${item.price})
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            <BackToTop visible={true} />
        </div >
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">Loading Oahu Catalog...</span>
                </div>
            </div>
        }>
            <ShopPageContent />
        </Suspense>
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
                        <DynamicIcon name={icon} className="size-3" />
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
                            <Warehouse className="size-32 text-primary" />
                        </div>
                        <div className="flex items-center gap-4 text-primary relative z-10">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover/item:bg-primary/20 transition-colors">
                                <Warehouse className="size-8 group-hover/item:scale-110 transition-transform" />
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
                                <AlertTriangle className="text-orange-500 size-4 pt-0.5 animate-pulse" />
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
                                <Truck className="size-32 text-primary" />
                        </div>
                        <div className="flex items-center gap-4 text-primary relative z-10">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover/item:bg-primary/20 transition-colors">
                                <Truck className="size-8 group-hover/item:scale-110 transition-transform" />
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
                                    <Ban className="size-4" />
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
    const { content } = useContent();
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
                            <Leaf className="size-4" />
                            <EditableText contentKey="shop.rebate.badge" />
                        </div>
                    }
                />

                {/* 3-Step Process */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {[0, 1, 2].map((i) => {
                        const isDownload = i === 1;
                        const isDualInverterLink = i === 0;
                        const stepIconName = content?.shop?.rebate?.steps?.[i]?.icon || contentData.shop.rebate.steps[i].icon;

                        if (isDualInverterLink) {
                            return (
                                <Link
                                    key={i}
                                    href="#dual_inverter"
                                    className="industrial-card p-6 bg-[#0f131a] border border-white/5 rounded-2xl relative z-20 group/card flex flex-col items-center text-center space-y-4 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover/card:bg-emerald-500/20 transition-all duration-500">
                                        <DynamicIcon name={stepIconName} className="text-emerald-500 size-8 group-hover/card:scale-110 transition-transform" />
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
                                        <DynamicIcon name={stepIconName} className="text-emerald-500 size-8 group-hover/card:scale-110 transition-transform" />
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
                                    <DynamicIcon name={stepIconName} className="text-emerald-500 size-8 group-hover/card:scale-110 transition-transform" />
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
                { name: "LW1522FVSM", link: "#dual_inverter" }
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

            {/* Interactive Sizing Wizard Launcher */}
            <div className="mt-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative overflow-hidden">
                    <div className="space-y-1">
                        <h4 className="font-header font-black text-sm uppercase tracking-wider text-white">Oahu Interactive Sizing Tool</h4>
                        <p className="font-sans text-xs text-slate-400">
                            Have high ceilings, sun-facing windows, or multiple occupants? Get an exact calibrated BTU recommendation.
                        </p>
                    </div>
                    <Link
                        href="/sizing"
                        className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 shrink-0 group"
                    >
                        Start Wizard <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

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
                                        <Snowflake className="size-2.5 text-primary" />
                                        <span className="truncate">{m.name}</span>
                                        <ArrowUpRight className="size-2.5 text-slate-600" />
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
                                <DynamicIcon name={factor.icon} className="text-primary size-8 group-hover/factor:scale-110 transition-transform duration-500 relative z-10" />
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



function ProductGrid({ 
    products, 
    onQuickAdd, 
    rebate,
    compareList = [],
    onToggleCompare
}: { 
    products: Product[]; 
    onQuickAdd: (p: Product) => void; 
    rebate?: string;
    compareList?: Product[];
    onToggleCompare?: (p: Product) => void;
}) {
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
                    <ProductCard 
                        product={product} 
                        onQuickAdd={() => onQuickAdd(product)} 
                        rebate={rebate}
                        isComparing={compareList.some(c => c.id === product.id)}
                        onToggleCompare={onToggleCompare}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}

function ProductCard({ 
    product, 
    onQuickAdd, 
    rebate,
    isComparing = false,
    onToggleCompare
}: { 
    product: Product; 
    onQuickAdd: () => void; 
    rebate?: string;
    isComparing?: boolean;
    onToggleCompare?: (p: Product) => void;
}) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [viewMode, setViewMode] = useState<'studio' | 'cutaway'>('studio');
    const [tiltStyle, setTiltStyle] = useState({});
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: 'translate(-50%, -50%)' });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [sparks, setSparks] = useState<{ id: number; left: string; delay: string; duration: string; drift: string; color: string }[]>([]);

    const cutawayImageMap: Record<number, string> = {
        1: '/assets/window-unit-images/3d-fit/product_1_fit_cutaway.webp',
        2: '/assets/window-unit-images/3d-fit/product_2_fit_cutaway.webp',
        3: '/assets/window-unit-images/3d-fit/product_3_fit_cutaway.webp',
        4: '/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
        5: '/assets/window-unit-images/3d-fit/product_5_fit_cutaway.webp',
        6: '/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp',
        7: '/assets/window-unit-images/3d-fit/product_7_fit_cutaway.webp',
        8: '/assets/window-unit-images/3d-fit/product_8_fit_cutaway.webp',
        9: '/assets/window-unit-images/3d-fit/product_9_fit_cutaway.webp',
        10: '/assets/window-unit-images/3d-fit/product_10_fit_cutaway.webp',
        11: '/assets/window-unit-images/3d-fit/product_11_fit_cutaway.webp',
        12: '/assets/window-unit-images/3d-fit/product_12_fit_cutaway.webp',
        13: '/assets/window-unit-images/3d-fit/product_13_fit_cutaway.webp',
        14: '/assets/window-unit-images/3d-fit/product_14_fit_cutaway.webp',
        15: '/assets/window-unit-images/3d-fit/product_15_fit_cutaway.webp',
        16: '/assets/window-unit-images/3d-fit/product_16_fit_cutaway.webp',
    };
    const cutawayImage = cutawayImageMap[product.id] || `/assets/window-unit-images/3d-fit/product_${product.id}_fit_cutaway.webp`;

    const cardRef = useRef<HTMLDivElement>(null);
    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST
    const isCampaignActive = isCampaignActiveChecker();
    const isPromo = isCampaignActive && product.promo_price !== undefined && product.promo_price !== null && product.promo_price > 0;

    useEffect(() => {
        setMounted(true);
        // Detect touch device
        setIsTouchDevice(
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            window.matchMedia('(pointer: coarse)').matches
        );

        // Generate static properties for sparks
        const colors = ['#EF4444', '#FFFFFF', '#3B82F6'];
        const list = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            left: `${15 + Math.random() * 70}%`,
            delay: `${Math.random() * -3}s`,
            duration: `${1.5 + Math.random() * 2}s`,
            drift: `${(Math.random() - 0.5) * 60}px`,
            color: colors[i % colors.length]
        }));
        setSparks(list);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCursorPos({ x, y });

        // Calculate rotation angles (capped at 6 degrees for premium subtlety)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
            transition: 'transform 0.1s ease-out',
        });

        // Dynamic glare position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setGlareStyle({
            opacity: 0.15,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`,
            transform: 'scale(1.3)',
            transition: 'opacity 0.2s ease',
        } as any);
    };

    const handleMouseEnter = () => {
        if (isTouchDevice) return;
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s ease',
        });
        setGlareStyle({
            opacity: 0,
            transform: 'scale(1)',
            transition: 'opacity 0.5s ease',
        } as any);
    };

    const borderClass = isPromo 
        ? "animate-patriotic-glow"
        : "border-white/5 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(0,174,239,0.15)]";

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            onClick={() => router.push(`/shop/${generateProductSlug(product.id, product.name)}`)}
            className={cn(
                "industrial-card group flex flex-col bg-[#0f131a] rounded-2xl overflow-hidden transition-all duration-700 relative h-full ring-1 ring-white/5 active:scale-[0.98] cursor-pointer card-hover-trigger",
                borderClass
            )}
        >
            {/* Liquid Neon Cursor-Follow Glow */}
            {isPromo && isHovered && !isTouchDevice && (
                <div 
                    className="absolute inset-[-1px] rounded-2xl pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(circle 120px at ${cursorPos.x}px ${cursorPos.y}px, rgba(239, 68, 68, 0.8), rgba(255, 255, 255, 0.5), rgba(59, 130, 246, 0.8), transparent 70%)`,
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                    }}
                />
            )}

            {/* 3D Reflective Glare Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none z-20"
                style={glareStyle as any}
            />

            {/* Micro-Spark Cascade (Hover Particle Effect) */}
            {isPromo && isHovered && !isTouchDevice && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {sparks.map(spark => (
                        <div
                            key={spark.id}
                            className="absolute w-1 h-1 rounded-full animate-spark"
                            style={{
                                left: spark.left,
                                top: '-5px',
                                backgroundColor: spark.color,
                                boxShadow: `0 0 6px ${spark.color}`,
                                animationDelay: spark.delay,
                                animationDuration: spark.duration,
                                '--drift-x': spark.drift,
                                opacity: 0.8
                            } as any}
                        />
                    ))}
                </div>
            )}

            {/* Image Area with Luminous Hover & Immersive Blending */}
            <div className="w-full aspect-[16/10] bg-[#05070a] relative overflow-hidden transition-all duration-700 border-b border-white/5 p-4 flex items-center justify-center">
                {/* Immersive radial depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.15)_0%,transparent_75%)] opacity-60 group-hover:opacity-100 transition-all duration-700 z-10"></div>
                
                {/* Patriotic radial glow behind promo product images */}
                {isPromo && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,rgba(59,130,246,0.08)_60%,transparent_100%)] opacity-80 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-10"></div>
                )}

                {/* Spinning HVAC Fan Background with Radial Blur */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.09] transition-opacity duration-500 z-0 overflow-hidden">
                    <div className={cn(
                        "w-48 h-48 transition-all duration-700",
                        isHovered ? "fan-spin-fast text-cyan-400 blur-[0.5px]" : "fan-spin-idle text-slate-500"
                    )}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
                            <path d="M12 2v20M2 12h20M12 12a4 4 0 100-8 4 4 0 000 8z" />
                            <path d="M7 7l10 10M17 7L7 10" />
                        </svg>
                    </div>
                </div>

                {/* Cool Air AC Vapor & Thermal Glow ring on hover */}
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-cyan-500/20 air-vapor-ring pointer-events-none z-0" />

                {/* Floor shadow/reflection simulation */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f131a]/95 to-transparent z-10"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"></div>

                {isPromo && (
                    <div className="absolute bottom-0 left-0 z-20 bg-gradient-to-r from-red-600 via-slate-900 to-blue-600 text-white font-header font-black text-[9px] sm:text-[10px] md:text-[11px] px-3 py-2 sm:px-4 sm:py-2.5 rounded-tr-2xl uppercase tracking-[0.2em] shadow-lg border-t border-r border-white/10 animate-pulse-slow">
                        🇺🇸 CELEBRATING AMERICA 10% OFF
                    </div>
                )}

                {/* 3D Window Fit & Studio View Switcher Pills */}
                <div className="absolute top-2 left-2 z-30 flex items-center bg-black/85 backdrop-blur-md rounded-lg p-0.5 border border-white/10 shadow-lg">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('studio');
                        }}
                        className={cn(
                            "px-2 py-1 rounded text-[8px] font-header font-black uppercase tracking-wider transition-all",
                            viewMode === 'studio' 
                                ? "bg-primary text-black shadow-sm" 
                                : "text-slate-400 hover:text-white"
                        )}
                        title="View Studio Unit Photos"
                    >
                        📷 Studio
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('cutaway');
                        }}
                        className={cn(
                            "px-2 py-1 rounded text-[8px] font-header font-black uppercase tracking-wider transition-all flex items-center gap-1",
                            viewMode === 'cutaway' 
                                ? "bg-cyan-400 text-black shadow-sm" 
                                : "text-slate-400 hover:text-white"
                        )}
                        title="View 3D Spatial Window Fit & Dimension Calipers"
                    >
                        <span>📐 3D Fit</span>
                    </button>
                </div>

                {/* Compare Quick Toggle Pill */}
                {onToggleCompare && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(product);
                        }}
                        className={cn(
                            "absolute top-2 right-2 z-30 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider backdrop-blur-md border transition-all shadow-lg",
                            isComparing
                                ? "bg-primary text-slate-950 font-black border-primary shadow-[0_0_15px_rgba(0,174,239,0.5)]"
                                : "bg-black/75 text-slate-300 hover:text-white border-white/10 hover:border-primary/40"
                        )}
                        title={isComparing ? "Remove from comparison" : "Compare with other units"}
                    >
                        <Layers className="size-3" />
                        <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                    </button>
                )}

                {rebate && !onToggleCompare && (
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
                    const studioImg = product.image_url || getProductImages(product.id)?.[0];
                    const activeImg = viewMode === 'cutaway' ? cutawayImage : studioImg;

                    return activeImg ? (
                        <Image
                            key={`${product.id}-${viewMode}`}
                            src={activeImg}
                            alt={viewMode === 'cutaway' ? `${product.name} 3D Window Fit Cutaway` : product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className={cn(
                                "object-contain transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10",
                                viewMode === 'cutaway' ? "p-1 md:p-2 scale-100 group-hover:scale-105" : "p-4 md:p-6 group-hover:scale-110"
                            )}
                            unoptimized={activeImg?.endsWith('.svg')}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-700 relative z-10">
                            <Snowflake className="size-16" />
                            <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40">Industrial Unit [STAGED]</span>
                        </div>
                    );
                })()}
            </div>

            {/* Identity & Specs (Centered Axis) */}
            <div className="p-3 md:p-5 flex flex-col flex-grow items-center text-center relative z-10">
                <div className="mb-2 w-full flex flex-col items-center">
                    <div className="text-primary font-header font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] mb-1 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity justify-center">
                        <span className="w-2 h-px bg-primary/30 group-hover:w-4 transition-all"></span>
                        {product.category || 'AC UNIT'}
                        <span className="w-2 h-px bg-primary/30 group-hover:w-4 transition-all"></span>
                    </div>
                    <h3 className="text-white text-base md:text-lg font-header font-black leading-tight group-hover:text-primary transition-colors duration-500 uppercase tracking-tight">
                        {product.name}
                    </h3>
                </div>

                {/* Dual-Sizing Architecture (AHAM vs Island Microclimate™) */}
                <div className="w-full mb-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-left">
                    <div className="flex items-center justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase tracking-wider">AHAM Factory:</span>
                        <span className="text-white font-bold">{product.coverage_aham || product.coverage || 'Factory Rated'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[8px] font-mono">
                        <span className="text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="size-1 rounded-full bg-cyan-400 animate-pulse"></span>
                            Island Sizing:
                        </span>
                        <span className="text-cyan-300 font-bold">{product.coverage_oahu || 'Calibrated'}</span>
                    </div>
                </div>

                {/* Technical Specs & Window Fit Clearance */}
                <div className="grid grid-cols-3 gap-1 w-full mb-2.5">
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                        <span className="text-slate-500 text-[7px] font-black uppercase tracking-widest mb-0.5">Noise</span>
                        <span className="text-white text-[9px] font-bold font-header lowercase truncate">{product.noise_level || 'N/A'}</span>
                    </div>
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                        <span className="text-slate-500 text-[7px] font-black uppercase tracking-widest mb-0.5">Voltage</span>
                        <span className="text-white text-[9px] font-bold font-header">{product.voltage?.split('/')?.[0]?.trim() || '115V'}</span>
                    </div>
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center group-hover:border-cyan-500/20 transition-all duration-500 shadow-inner">
                        <span className="text-slate-500 text-[7px] font-black uppercase tracking-widest mb-0.5">Min Window</span>
                        <span className="text-cyan-300 text-[9px] font-bold font-mono">{product.min_window_height ? `${product.min_window_height} H` : '16" H'}</span>
                    </div>
                </div>

                {/* High-Intent Conversion Catalysts */}
                {(() => {
                    const identifier = PRODUCT_IDENTIFIERS[product.id];
                    const badge = identifier?.catalystBadge;
                    const is230V = product.voltage?.includes('230V') || (product.btu && product.btu >= 18000);
                    return (
                        <div className="w-full mb-3 space-y-1.5">
                            {badge && (
                                <div className={cn(
                                    "w-full px-2 py-1 rounded-lg font-mono text-[9px] font-bold text-center uppercase tracking-wider",
                                    product.id === 1 ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]" :
                                    product.id === 2 ? "bg-amber-500/10 border border-amber-500/30 text-amber-300" :
                                    product.id === 3 ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" :
                                    product.id === 4 ? "bg-blue-500/10 border border-blue-500/30 text-blue-300" :
                                    product.id === 5 ? "bg-purple-500/10 border border-purple-500/30 text-purple-300" :
                                    is230V ? "bg-sky-500/10 border border-sky-500/30 text-sky-300" :
                                    "bg-white/[0.04] border border-white/10 text-slate-300"
                                )}>
                                    {badge}
                                </div>
                            )}
                            {is230V && (
                                <div className="w-full px-2 py-0.5 rounded bg-sky-950/40 border border-sky-500/20 text-sky-300 font-mono text-[8px] flex items-center justify-center gap-1.5">
                                    <span>Requires 230V Heavy-Duty Outlet</span>
                                    <Link 
                                        href="/shop/window-ac-plug-guide" 
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-white underline hover:text-cyan-300"
                                    >
                                        Plug Guide &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    );
                })()}

                <div className="mt-auto pt-3 border-t border-white/5 flex flex-col items-center gap-3 w-full">
                    <div className="flex items-center gap-2 justify-center w-full">
                        {isPromo ? (
                            <div className="flex flex-col items-center gap-1.5 w-full">
                                <div className="flex items-baseline gap-2.5 justify-center">
                                    <span className="text-xs md:text-sm text-slate-500 line-through decoration-red-500 decoration-[1.5px] font-medium">
                                        ${product.price.toLocaleString()}
                                    </span>
                                    <span className="text-2xl md:text-3xl font-header font-black text-cyan-400 tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]">
                                        ${product.promo_price?.toLocaleString()}
                                    </span>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shadow-inner animate-pulse-slow">
                                    SAVE ${(product.price - (product.promo_price || 0)).toLocaleString()}
                                </span>
                            </div>
                        ) : (
                            <div className="text-2xl md:text-3xl font-header font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:text-primary transition-colors py-4">
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
                            <Eye className="size-3" />
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
                            {product.stock > 0 ? (
                                <ShoppingCart className="size-3" />
                            ) : (
                                <Ban className="size-3" />
                            )}
                            {product.stock > 0 ? 'SECURE' : 'SOLD OUT'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Encapsulated micro-spark animation styles */}
            <style jsx>{`
                @keyframes spark-fall {
                    0% {
                        transform: translateY(-20px) translateX(0) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(120px) translateX(var(--drift-x)) scale(0.8);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(240px) translateX(calc(var(--drift-x) * 2)) scale(0.4);
                        opacity: 0;
                    }
                }
                .animate-spark {
                    animation: spark-fall var(--fall-duration, 2.5s) linear infinite;
                }
            `}</style>
        </div>
    );
}


