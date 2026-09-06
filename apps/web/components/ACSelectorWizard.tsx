'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { isCampaignActive } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { sendGAEvent } from '@next/third-parties/google';
import { trackFunnelEvent } from '@/lib/tracking';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Settings, 
    Home, 
    Sun, 
    User, 
    Check, 
    ArrowRight, 
    ArrowLeft, 
    Zap, 
    ShoppingBag, 
    Sparkles, 
    Wrench, 
    Wind, 
    Shield, 
    Truck, 
    Plus, 
    Minus, 
    AlertTriangle,
    Snowflake,
    Flame
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    subcategory?: string;
    stock: number;
    image_url?: string;
    btu?: number;
    voltage?: string;
    coverage?: string;
    noise_level?: string;
    dehumidification?: string;
    performance_specs?: string;
    key_spec?: string;
    dimensions?: string;
    weight?: string;
    warranty?: string;
    promo_price?: number;
    discount_percent?: number;
}

export function ACSelectorWizard() {
    const { addToCart } = useCart();
    
    // Step state
    const [step, setStep] = useState(1);
    
    // Core parameters (Defaults matching typical rooms)
    const [width, setWidth] = useState<number>(12);
    const [length, setLength] = useState<number>(15);
    const [isKitchen, setIsKitchen] = useState<boolean>(false);
    const [ceilHeight, setCeilHeight] = useState<'standard' | 'high' | 'vaulted'>('standard');
    const [insulation, setInsulation] = useState<'good' | 'poor'>('good');
    const [region, setRegion] = useState<'standard' | 'leeward' | 'windward' | 'urban'>('standard');
    const [sunExposure, setSunExposure] = useState<'shaded' | 'moderate' | 'sunny'>('moderate');
    const [occupants, setOccupants] = useState<number>(2);

    // Catalog state
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
    const [loadError, setLoadError] = useState<string>('');

    // Load products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/v1/products');
                if (!res.ok) throw new Error('Could not fetch catalog inventory.');
                const data = await res.json();
                setProducts(data);
            } catch (err: any) {
                console.error("Error loading products in ACSelectorWizard:", err);
                setLoadError(err.message || 'Unable to retrieve inventory.');
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
        
        // Track wizard start event in GA4
        sendGAEvent('event', 'sizing_wizard_start', { event_category: 'Sizing', event_label: 'AC Sizing Wizard Opened' });
    }, []);

    // Load previously calculated session on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem('ahac_sizing_session');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.width) setWidth(Number(parsed.width));
                if (parsed.length) setLength(Number(parsed.length));
                if (parsed.isKitchen !== undefined) setIsKitchen(Boolean(parsed.isKitchen));
                if (parsed.ceilHeight) setCeilHeight(parsed.ceilHeight);
                if (parsed.insulation) setInsulation(parsed.insulation);
                if (parsed.region) setRegion(parsed.region);
                if (parsed.sunExposure) setSunExposure(parsed.sunExposure);
                if (parsed.occupants) setOccupants(Number(parsed.occupants));
            }
        } catch (e) {
            console.error("Failed to restore sizing session:", e);
        }
    }, []);

    // Sizing Calculation & Persistence
    const calculation = useMemo(() => {
        const area = width * length;
        
        // Base BTU Sizing Chart Alignment
        let baseBtu = 6000;
        if (area >= 100 && area <= 200) {
            baseBtu = 6000 + ((area - 100) / 100) * 2000;
        } else if (area > 200 && area <= 250) {
            baseBtu = 10000 + ((area - 200) / 50) * 2000;
        } else if (area > 250 && area <= 350) {
            baseBtu = 14000 + ((area - 250) / 100) * 1000;
        } else if (area > 350 && area <= 400) {
            baseBtu = 15000 + ((area - 350) / 50) * 3000;
        } else if (area > 400) {
            baseBtu = 18000 + ((area - 400) / 200) * 6000;
        }

        // Ceiling Height Modifier
        if (ceilHeight === 'high') baseBtu *= 1.10;
        if (ceilHeight === 'vaulted') baseBtu *= 1.20;

        // Sun Exposure Modifier
        if (sunExposure === 'shaded') baseBtu *= 0.90;
        if (sunExposure === 'sunny') baseBtu *= 1.10;

        // Oahu Micro-climate Region Modifier
        let regionModifier = 1.0;
        if (region === 'leeward') regionModifier = 1.15; // +15% for Kapolei, Ewa Beach, Waianae (intense sun & heat)
        if (region === 'windward') regionModifier = 0.95; // -5% for Kailua, Kaneohe (cooling trade winds)
        if (region === 'urban') regionModifier = 1.10;    // +10% for Honolulu Metro (urban heat island effect)
        baseBtu *= regionModifier;

        // Insulation Modifier
        if (insulation === 'poor') baseBtu *= 1.15;

        // Kitchen cooking load adjustment
        if (isKitchen) baseBtu += 4000;

        // Occupant heat load adjustment
        if (occupants > 2) baseBtu += (occupants - 2) * 600;

        const recommendedBtu = Math.round(baseBtu);

        // Save session state to sessionStorage
        if (typeof window !== 'undefined') {
            try {
                sessionStorage.setItem('ahac_sizing_session', JSON.stringify({
                    width, length, isKitchen, ceilHeight, insulation, region, sunExposure, occupants, recommendedBtu
                }));
            } catch (e) {
                console.error("sessionStorage write failed", e);
            }
        }

        return { area, recommendedBtu };
    }, [width, length, isKitchen, ceilHeight, insulation, region, sunExposure, occupants]);

    // Match products with sizing rules
    const matches = useMemo(() => {
        const reqBtu = calculation.recommendedBtu;
        
        // Filter out non-cooling sleeve accessories and invalid entries
        const coolingUnits = products.filter(
            p => p.btu && p.btu > 0 && p.subcategory !== 'casement' && p.category === 'WINDOW_AC'
        );

        return coolingUnits.map(product => {
            const productBtu = product.btu || 0;
            const diffPercent = (productBtu - reqBtu) / reqBtu;
            
            let compatibility: 'PERFECT' | 'OVERSIZED' | 'UNDERSIZED' | 'EXTREME' = 'PERFECT';
            if (diffPercent < -0.15) {
                compatibility = 'UNDERSIZED';
            } else if (diffPercent > 0.40) {
                compatibility = 'EXTREME';
            } else if (diffPercent > 0.25) {
                compatibility = 'OVERSIZED';
            }

            return {
                ...product,
                diffPercent,
                compatibility
            };
        }).filter(p => p.compatibility === 'PERFECT' || p.compatibility === 'OVERSIZED'); // Hide undersized or extremely oversized
    }, [products, calculation.recommendedBtu]);

    // Handle complete sizing calculation step
    useEffect(() => {
        if (step === 5) {
            sendGAEvent('event', 'sizing_wizard_complete', {
                event_category: 'Sizing',
                event_label: 'AC Sizing Calculation Shown',
                value: calculation.recommendedBtu,
                custom_area: calculation.area,
                custom_region: region
            });
            trackFunnelEvent('sizing_load_calculated', {
                btu: calculation.recommendedBtu,
                area: calculation.area,
                region: region,
                room_width: width,
                room_length: length,
            });
        }
    }, [step, calculation.recommendedBtu, calculation.area, region, width, length]);

    // Handle pro help dispatch click
    const handleProHelpClick = () => {
        sendGAEvent('event', 'sizing_wizard_pro_lead', {
            event_category: 'Lead',
            event_label: 'AC Sizing Redirected to Dispatch'
        });
        trackFunnelEvent('sizing_pro_lead_click', {
            btu: calculation.recommendedBtu,
            area: calculation.area,
            region: region,
        });
    };

    // Helper text formatting for the dispatch notes
    const getDispatchNotes = () => {
        const activeRegionLabel = 
            region === 'leeward' ? 'Leeward Oahu (Kapolei/Ewa)' :
            region === 'windward' ? 'Windward Oahu (Kailua/Kaneohe)' :
            region === 'urban' ? 'Honolulu / Urban Metro' : 'Standard Oahu';

        return `Oahu Sizing Wizard Result: Room size is ${width}x${length} ft (${calculation.area} sq ft). Calculated load is ${calculation.recommendedBtu.toLocaleString()} BTU. Ceiling: ${ceilHeight}, Insulation: ${insulation}, Exposure: ${sunExposure}, Kitchen: ${isKitchen ? 'Yes' : 'No'}, Occupants: ${occupants}, Region: ${activeRegionLabel}.`;
    };

    // Animations config
    const variants: any = {
        enter: { opacity: 0, x: 20 },
        center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className="w-full">
            {/* Progress Ribbon */}
            <div className="flex items-center justify-center gap-6 lg:gap-12 mb-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-white/5 -z-10"></div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-500 -z-10"
                    style={{ width: `${((step - 1) / 4) * 70}%` }}
                ></div>

                {[1, 2, 3, 4, 5].map((s) => (
                    <button
                        key={s}
                        onClick={() => step > s && setStep(s)}
                        disabled={step < s}
                        className="flex flex-col items-center gap-2 cursor-pointer z-10 group/step outline-none disabled:cursor-not-allowed"
                    >
                        <div className={`size-8 lg:size-10 rounded-full flex items-center justify-center text-[10px] lg:text-xs font-black border-2 transition-all duration-500 ${step >= s ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(0,174,239,0.35)]' : 'bg-background-dark border-white/10 text-slate-400'}`}>
                            {s === 1 ? <Settings className="size-3.5" /> : 
                             s === 2 ? <Home className="size-3.5" /> : 
                             s === 3 ? <Sun className="size-3.5" /> : 
                             s === 4 ? <User className="size-3.5" /> : 
                             <Check className="size-3.5" />}
                        </div>
                        <span className={`font-mono text-[8px] lg:text-[9px] uppercase tracking-[0.2em] font-black transition-colors duration-300 ${step >= s ? 'text-white' : 'text-slate-500'}`}>
                            {s === 1 ? 'Space' : s === 2 ? 'Room' : s === 3 ? 'Sun' : s === 4 ? 'Users' : 'Match'}
                        </span>
                    </button>
                ))}
            </div>

            {/* Step Body wrapper with AnimatePresence */}
            <div className="min-h-[350px]">
                <AnimatePresence mode="wait">
                    {/* Step 1: Dimensions */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight mb-2">Space Dimensions</h3>
                                <p className="font-mono text-[9px] lg:text-[10px] uppercase tracking-wider text-slate-400">Step 1 of 5: Establish baseline floor area</p>
                            </div>

                            <div className="space-y-6 max-w-xl mx-auto">
                                {/* Width control */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-header font-black text-xs uppercase tracking-widest text-slate-300">Room Width</span>
                                        <span className="text-lg font-mono font-black text-primary">{width} Feet</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            type="button"
                                            onClick={() => setWidth(prev => Math.max(8, prev - 1))}
                                            className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
                                        >
                                            <Minus className="size-4" />
                                        </button>
                                        <input 
                                            type="range" 
                                            min="8" 
                                            max="35" 
                                            value={width} 
                                            onChange={(e) => setWidth(Number(e.target.value))} 
                                            className="flex-1 accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                            aria-label="Room Width in Feet"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setWidth(prev => Math.min(35, prev + 1))}
                                            className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
                                        >
                                            <Plus className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Length control */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-header font-black text-xs uppercase tracking-widest text-slate-300">Room Length</span>
                                        <span className="text-lg font-mono font-black text-primary">{length} Feet</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            type="button"
                                            onClick={() => setLength(prev => Math.max(8, prev - 1))}
                                            className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
                                        >
                                            <Minus className="size-4" />
                                        </button>
                                        <input 
                                            type="range" 
                                            min="8" 
                                            max="35" 
                                            value={length} 
                                            onChange={(e) => setLength(Number(e.target.value))} 
                                            className="flex-1 accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                            aria-label="Room Length in Feet"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setLength(prev => Math.min(35, prev + 1))}
                                            className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
                                        >
                                            <Plus className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Kitchen Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setIsKitchen(prev => !prev)}
                                    className={`w-full p-5 border rounded-2xl flex items-center justify-between text-left transition-all duration-300 group active:scale-[0.99] ${isKitchen ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${isKitchen ? 'bg-primary text-black' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                                            <Flame className="size-5" />
                                        </div>
                                        <div>
                                            <p className="font-header font-black text-xs uppercase tracking-wider text-white">This room is a Kitchen</p>
                                            <p className="font-sans text-[10px] text-slate-400 mt-0.5">Adds heat load buffer (+4,000 BTU) for cooking appliances</p>
                                        </div>
                                    </div>
                                    <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${isKitchen ? 'border-primary bg-primary' : 'border-slate-600'}`}>
                                        <Check className={`size-3 text-black stroke-[3px] transition-opacity ${isKitchen ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                </button>
                            </div>

                            <div className="pt-4 flex justify-end max-w-xl mx-auto">
                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-full sm:w-auto py-3 px-10 uppercase font-bold tracking-widest text-[11px] hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)] ml-auto"
                                >
                                    Next Step <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Ceiling & Insulation */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight mb-2">Room Structure</h3>
                                <p className="font-mono text-[9px] lg:text-[10px] uppercase tracking-wider text-slate-400">Step 2 of 5: Evaluate heights & insulation</p>
                            </div>

                            <div className="space-y-8 max-w-xl mx-auto">
                                {/* Ceiling Height Options */}
                                <div className="space-y-3">
                                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black block">Ceiling Height</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            { key: 'standard', label: 'Standard (8ft)', desc: 'Standard residential scale', factor: 'x 1.0' },
                                            { key: 'high', label: 'High (9-11ft)', desc: 'Spacious flat ceiling', factor: '+10% load' },
                                            { key: 'vaulted', label: 'Vaulted (12ft+)', desc: 'Large vertical volume', factor: '+20% load' }
                                        ].map((item) => (
                                            <button
                                                key={item.key}
                                                type="button"
                                                onClick={() => setCeilHeight(item.key as any)}
                                                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 h-28 group active:scale-[0.98] ${ceilHeight === item.key ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className="font-header font-black text-xs uppercase tracking-wider text-white">{item.label}</span>
                                                    <span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded ${ceilHeight === item.key ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>{item.factor}</span>
                                                </div>
                                                <span className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed">{item.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Insulation Quality Options */}
                                <div className="space-y-3">
                                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black block">Insulation Status</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { key: 'good', label: 'Well-Insulated / Modern', desc: 'Double-pane windows, sealed gaps, solid insulation panels.', factor: 'x 1.0' },
                                            { key: 'poor', label: 'Poorly Insulated / Older', desc: 'Single-pane jalousies, drafty walls, typical older Hawaii construction.', factor: '+15% load' }
                                        ].map((item) => (
                                            <button
                                                key={item.key}
                                                type="button"
                                                onClick={() => setInsulation(item.key as any)}
                                                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 h-28 group active:scale-[0.98] ${insulation === item.key ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className="font-header font-black text-xs uppercase tracking-wider text-white">{item.label}</span>
                                                    <span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded ${insulation === item.key ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>{item.factor}</span>
                                                </div>
                                                <span className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed">{item.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between max-w-xl mx-auto gap-4">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="py-3 px-8 uppercase font-bold tracking-widest text-[11px] border border-white/10 hover:bg-white/5 text-slate-400"
                                >
                                    <ArrowLeft className="mr-2 size-4" /> Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="py-3 px-10 uppercase font-bold tracking-widest text-[11px] hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)]"
                                >
                                    Next Step <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Climate & Sun */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight mb-2">Climate Factors</h3>
                                <p className="font-mono text-[9px] lg:text-[10px] uppercase tracking-wider text-slate-400">Step 3 of 5: Microclimate region & solar exposure</p>
                            </div>

                            <div className="space-y-8 max-w-xl mx-auto">
                                {/* Oahu Region */}
                                <div className="space-y-3">
                                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black block">Oahu Micro-Climate Region</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { key: 'standard', label: 'Standard Oahu', desc: 'Central Oahu, Mililani, standard climate loads.', factor: 'x 1.0' },
                                            { key: 'leeward', label: 'Leeward (Kapolei/Ewa/Waianae)', desc: 'Intense direct heat, dry conditions, highly saline wind.', factor: '+15% load' },
                                            { key: 'windward', label: 'Windward (Kailua/Kaneohe)', desc: 'Cooling trade winds, high humidity but lower heat index.', factor: '-5% load' },
                                            { key: 'urban', label: 'Honolulu Metro / Urban', desc: 'Honolulu downtown urban heat island effect.', factor: '+10% load' }
                                        ].map((item) => (
                                            <button
                                                key={item.key}
                                                type="button"
                                                onClick={() => setRegion(item.key as any)}
                                                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 h-28 group active:scale-[0.98] ${region === item.key ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className="font-header font-black text-xs uppercase tracking-wider text-white">{item.label}</span>
                                                    <span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded ${region === item.key ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>{item.factor}</span>
                                                </div>
                                                <span className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed">{item.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sun Exposure */}
                                <div className="space-y-3">
                                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black block">Daytime Solar Exposure</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            { key: 'shaded', label: 'Heavy Shaded / North', desc: 'Heavily shaded, North facing windows.', factor: '-10% load' },
                                            { key: 'moderate', label: 'Moderate Sun', desc: 'Average solar exposure.', factor: 'x 1.0' },
                                            { key: 'sunny', label: 'Sunny / West Facing', desc: 'Direct intense afternoon sun.', factor: '+10% load' }
                                        ].map((item) => (
                                            <button
                                                key={item.key}
                                                type="button"
                                                onClick={() => setSunExposure(item.key as any)}
                                                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 h-28 group active:scale-[0.98] ${sunExposure === item.key ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className="font-header font-black text-xs uppercase tracking-wider text-white">{item.label}</span>
                                                    <span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded ${sunExposure === item.key ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>{item.factor}</span>
                                                </div>
                                                <span className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed">{item.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between max-w-xl mx-auto gap-4">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="py-3 px-8 uppercase font-bold tracking-widest text-[11px] border border-white/10 hover:bg-white/5 text-slate-400"
                                >
                                    <ArrowLeft className="mr-2 size-4" /> Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    className="py-3 px-10 uppercase font-bold tracking-widest text-[11px] hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)]"
                                >
                                    Next Step <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Occupancy */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-tight mb-2">Room Occupancy</h3>
                                <p className="font-mono text-[9px] lg:text-[10px] uppercase tracking-wider text-slate-400">Step 4 of 5: Estimate human heat load</p>
                            </div>

                            <div className="space-y-6 max-w-xl mx-auto">
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center space-y-6">
                                    <div>
                                        <span className="font-header font-black text-sm uppercase tracking-widest text-slate-400 block mb-1">Daily Room Occupants</span>
                                        <p className="font-sans text-[10px] text-slate-400">Calculations include a baseline of 2 people. Each additional occupant adds +600 BTU demand.</p>
                                    </div>

                                    <div className="text-5xl font-header font-black text-primary py-2">{occupants} <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">People</span></div>

                                    <div className="flex items-center justify-center gap-6 max-w-xs mx-auto">
                                        <button 
                                            type="button"
                                            onClick={() => setOccupants(prev => Math.max(1, prev - 1))}
                                            className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
                                        >
                                            <Minus className="size-5" />
                                        </button>
                                        
                                        <button 
                                            type="button"
                                            onClick={() => setOccupants(prev => Math.min(10, prev + 1))}
                                            className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
                                        >
                                            <Plus className="size-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-between max-w-xl mx-auto gap-4">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="py-3 px-8 uppercase font-bold tracking-widest text-[11px] border border-white/10 hover:bg-white/5 text-slate-400"
                                >
                                    <ArrowLeft className="mr-2 size-4" /> Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(5)}
                                    className="py-3 px-10 uppercase font-bold tracking-widest text-[11px] hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.3)] bg-gradient-to-r from-primary to-cyan-500"
                                >
                                    Calculate Sizing Match <Sparkles className="ml-2 size-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 5: Recommendations Panel */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-primary">Calculation Complete</span>
                                <h3 className="text-2xl md:text-3xl font-header font-black text-white uppercase tracking-tight mt-1">Recommended Cooling Capacity</h3>
                            </div>

                            {/* Sizing result hero card */}
                            <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-6 lg:p-8 max-w-3xl mx-auto relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-0" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-center">
                                    <div className="space-y-3 text-center md:text-left">
                                        <p className="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Calculated Load Demand</p>
                                        <h2 className="text-4xl lg:text-5xl font-header font-black text-white leading-none">
                                            {calculation.recommendedBtu.toLocaleString()} <span className="text-lg text-primary uppercase font-bold">BTU</span>
                                        </h2>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 text-[10px] text-slate-400 font-mono">
                                            <span className="px-2 py-1 bg-white/5 rounded border border-white/5">Area: {calculation.area} sq. ft.</span>
                                            <span className="px-2 py-1 bg-white/5 rounded border border-white/5">Region: {region.toUpperCase()}</span>
                                        </div>
                                    </div>

                                    <div className="border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 text-xs text-slate-300 font-sans space-y-3 leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <p>This sizing profile is optimized for <strong>Oahu&apos;s humidity</strong> and includes regional modifiers for the <strong>{region === 'leeward' ? 'intense Leeward sun' : region === 'windward' ? 'cooling Windward trades' : region === 'urban' ? 'Honolulu urban core heat' : 'Standard Oahu baseline'}</strong>.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <p>It includes adjustments for <strong>{ceilHeight === 'standard' ? 'standard 8ft ceilings' : 'increased ceiling volume'}</strong> and <strong>{occupants} daily occupants</strong>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendations container */}
                            <div className="space-y-6 max-w-5xl mx-auto">
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <span className="font-header font-black text-xs uppercase tracking-widest text-slate-400">Perfect & Safe Matches</span>
                                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Found {matches.length} matching units</span>
                                </div>

                                {loadingProducts ? (
                                    <div className="py-20 text-center text-primary font-mono text-[10px] uppercase tracking-widest animate-pulse">
                                        Scanning inventory for compatible units...
                                    </div>
                                ) : loadError ? (
                                    <div className="py-12 text-center bg-red-500/5 border border-red-500/20 rounded-2xl p-6 text-red-400 font-bold uppercase tracking-wider text-xs">
                                        {loadError}
                                    </div>
                                ) : matches.length === 0 ? (
                                    /* Fallback UI: BTU demand is too high for standard window units (> 24,000 BTU) */
                                    <div className="bg-[#1f1717] border border-red-500/20 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-6">
                                        <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20">
                                            <AlertTriangle className="size-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-header font-black text-xl text-white uppercase tracking-tight">Demand Exceeds Window Unit Limits</h4>
                                            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                                                A calculated demand of {calculation.recommendedBtu.toLocaleString()} BTU exceeds the cooling limit of standard window A/C units. We highly recommend a high-efficiency Ductless Mini-Split system to cool this space comfortably and efficiently.
                                            </p>
                                        </div>
                                        
                                        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                                            <Link 
                                                href={`/contact?service=Mini+Split+Estimate+(New)&notes=${encodeURIComponent(getDispatchNotes())}`}
                                                onClick={handleProHelpClick}
                                                className="px-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-[1.02] flex items-center justify-center gap-2"
                                            >
                                                Request Free Mini-Split Quote <Wrench className="size-4" />
                                            </Link>
                                            <button 
                                                onClick={() => setStep(1)}
                                                className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[10px] uppercase tracking-widest rounded-xl transition-all"
                                            >
                                                Start Sizing Over
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Recommendations list */
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {matches.map((product) => {
                                            const isPromo = isCampaignActive() && product.promo_price && product.promo_price > 0;
                                            const activePrice = isPromo ? product.promo_price! : product.price;

                                            return (
                                                <div 
                                                    key={product.id}
                                                    className={`bg-surface-dark border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${product.compatibility === 'PERFECT' ? 'border-emerald-500/20 hover:border-emerald-500/40 shadow-inner' : 'border-amber-500/20 hover:border-amber-500/40'}`}
                                                >
                                                    {/* Compatibility ribbon */}
                                                    <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl font-mono text-[8px] font-black uppercase tracking-wider ${product.compatibility === 'PERFECT' ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-amber-500 text-black'}`}>
                                                        {product.compatibility === 'PERFECT' ? 'Perfect Match' : 'Slightly Oversized'}
                                                    </div>

                                                    <div className="space-y-4">
                                                        {/* Product Image & Specs Summary */}
                                                        <div className="flex gap-4 items-start">
                                                            <div className="relative size-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                                                                <Image 
                                                                    src={product.image_url || '/assets/logo.svg'} 
                                                                    alt={product.name} 
                                                                    fill
                                                                    className="object-contain p-2"
                                                                    unoptimized
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">{product.subcategory?.replace('_', ' ')}</span>
                                                                <h4 className="font-header font-black text-sm text-white uppercase tracking-tight group-hover:text-primary transition-colors pr-20">{product.name}</h4>
                                                                <p className="text-lg font-header font-black text-white mt-1">
                                                                    {isPromo && (
                                                                        <span className="text-xs text-slate-500 line-through mr-2 font-medium">${product.price}</span>
                                                                    )}
                                                                    ${activePrice}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Specs Grid */}
                                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] font-sans text-slate-400">
                                                            <div>⚡ **Voltage:** {product.voltage || '115V'}</div>
                                                            <div>❄️ **BTU Capacity:** {product.btu?.toLocaleString() || 'N/A'}</div>
                                                            <div>📐 **Dimensions:** {product.dimensions || 'N/A'}</div>
                                                            <div>🛡️ **Warranty:** {product.warranty || '1 Year Limited'}</div>
                                                        </div>

                                                        {/* Policies Disclosure Footer */}
                                                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-[9px] font-sans text-slate-400 space-y-1 mt-2">
                                                            <div className="flex items-center gap-1.5 text-slate-500"><Truck className="size-3" /> Pickup: **Waipahu Warehouse ($0)** | Delivery: **Oahu Flat-Rate ($50)**</div>
                                                            <div className="flex items-center gap-1.5 text-slate-500"><Shield className="size-3" /> Returns: **Final Sale / No Returns** (Federal AC Regulations)</div>
                                                        </div>
                                                    </div>

                                                    {/* CTA Actions */}
                                                    <div className="flex gap-3 pt-6 mt-4 border-t border-white/5">
                                                        <button
                                                            onClick={() => {
                                                                addToCart(product);
                                                                trackFunnelEvent('sizing_add_to_cart', {
                                                                    product_id: product.id,
                                                                    name: product.name,
                                                                    price: activePrice,
                                                                    btu: product.btu
                                                                });
                                                            }}
                                                            disabled={product.stock === 0}
                                                            className="flex-1 py-3 bg-primary hover:bg-primary/95 hover:scale-[1.02] disabled:opacity-50 text-black font-black uppercase text-[10px] tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,174,239,0.15)] flex items-center justify-center gap-1"
                                                        >
                                                            <ShoppingBag className="size-3.5" /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                                        </button>
                                                        <Link
                                                            href={`/shop/${product.id}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}
                                                            className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[9px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center"
                                                        >
                                                            Specs
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Pro help prompt */}
                            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 text-center max-w-xl mx-auto space-y-4">
                                <h4 className="font-header font-black text-sm uppercase tracking-wider text-white">Prefer a Professional Assessment?</h4>
                                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                                    Want our certified technicians to inspect your window framing, electrical panels, or recommend a mini-split setup? We can pre-fill our dispatch ticket with your room sizing calculations instantly.
                                </p>
                                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <Link 
                                        href={`/contact?service=Window+AC+Installation&notes=${encodeURIComponent(getDispatchNotes())}`}
                                        onClick={handleProHelpClick}
                                        className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 hover:border-primary/50 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        Pre-fill & Route to Dispatch <Wrench className="size-3.5 text-primary" />
                                    </Link>
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-white/5 text-slate-400 font-mono text-[9px] uppercase tracking-widest rounded-xl transition-all"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
