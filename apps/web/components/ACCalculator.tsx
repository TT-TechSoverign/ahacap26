import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ACCalculatorProps {
    productBtu: number;
    productName: string;
}

export function ACCalculator({ productBtu, productName }: ACCalculatorProps) {
    const [width, setWidth] = useState<number>(12);
    const [length, setLength] = useState<number>(15);
    const [ceilHeight, setCeilHeight] = useState<'standard' | 'high' | 'vaulted'>('standard');
    const [sunExposure, setSunExposure] = useState<'shaded' | 'moderate' | 'sunny'>('moderate');
    const [region, setRegion] = useState<'standard' | 'leeward' | 'windward' | 'urban'>('standard');
    const [homeType, setHomeType] = useState<'single_wall' | 'jalousie' | 'modern'>('single_wall');
    const [isKitchen, setIsKitchen] = useState<boolean>(false);
    const [occupants, setOccupants] = useState<number>(2);
    const [showGuide, setShowGuide] = useState<boolean>(false);

    // Load from sessionStorage if available to persist user sizing selections cross-page
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem('ahac_sizing_session');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.width) setWidth(Number(parsed.width));
                if (parsed.length) setLength(Number(parsed.length));
                if (parsed.ceilHeight) setCeilHeight(parsed.ceilHeight);
                if (parsed.sunExposure) setSunExposure(parsed.sunExposure);
                if (parsed.region) setRegion(parsed.region);
                if (parsed.homeType) setHomeType(parsed.homeType);
                if (parsed.isKitchen !== undefined) setIsKitchen(Boolean(parsed.isKitchen));
                if (parsed.occupants) setOccupants(Number(parsed.occupants));
            }
        } catch (e) {
            console.error("Failed to load sizing session in ACCalculator", e);
        }
    }, []);

    const calculations = useMemo(() => {
        const area = width * length;
        
        // 1. Factory AHAM / Energy Star Baseline (Modern Insulated Standard)
        let ahamBaseBtu = 6000;
        if (area <= 150) ahamBaseBtu = 5000;
        else if (area <= 250) ahamBaseBtu = 6000;
        else if (area <= 350) ahamBaseBtu = 8000;
        else if (area <= 450) ahamBaseBtu = 10000;
        else if (area <= 550) ahamBaseBtu = 12000;
        else if (area <= 700) ahamBaseBtu = 14000;
        else if (area <= 1000) ahamBaseBtu = 18000;
        else ahamBaseBtu = 23500;

        // 2. Island Microclimate Calibration™ Base (Oahu Field Standard)
        let islandBaseBtu = 6000;
        if (area <= 180) islandBaseBtu = 6000;
        else if (area <= 250) islandBaseBtu = 8000;
        else if (area <= 320) islandBaseBtu = 10000;
        else if (area <= 380) islandBaseBtu = 12000;
        else if (area <= 500) islandBaseBtu = 14000;
        else if (area <= 750) islandBaseBtu = 18000;
        else islandBaseBtu = 23500;

        let workingBtu = homeType === 'modern' ? ahamBaseBtu : islandBaseBtu;

        // Ceiling Height Load Modifier
        if (ceilHeight === 'high') workingBtu *= 1.10;
        if (ceilHeight === 'vaulted') workingBtu *= 1.20;

        // Sun Exposure Modifier
        if (sunExposure === 'shaded') workingBtu *= 0.90;
        if (sunExposure === 'sunny') workingBtu *= 1.10;

        // Oahu Micro-climate Region Modifier
        let regionModifier = 1.0;
        if (region === 'leeward') regionModifier = 1.15; // +15% for Kapolei, Ewa Beach, Waianae (intense solar radiation)
        if (region === 'windward') regionModifier = 0.95; // -5% for Kailua, Kaneohe (cooling trade winds)
        if (region === 'urban') regionModifier = 1.10;    // +10% for Honolulu Metro (urban heat island effect)
        workingBtu *= regionModifier;

        // Home Construction Modifier
        if (homeType === 'single_wall') workingBtu *= 1.15; // Single-wall redwood heat conduction
        if (homeType === 'jalousie') workingBtu *= 1.25;    // Jalousie louver air infiltration

        // Kitchen cooking load adjustment
        if (isKitchen) workingBtu += 4000;

        // Occupant heat load adjustment
        if (occupants > 2) workingBtu += (occupants - 2) * 600;

        const recommendedBtu = Math.round(workingBtu);

        // Sizing Compatibility Check
        const diffPercent = (productBtu - recommendedBtu) / recommendedBtu;
        let compatibility: 'PERFECT' | 'UNDERSIZED' | 'OVERSIZED' = 'PERFECT';
        if (diffPercent < -0.15) compatibility = 'UNDERSIZED';
        else if (diffPercent > 0.25) compatibility = 'OVERSIZED';

        return { area, recommendedBtu, ahamBaseBtu, compatibility };
    }, [width, length, ceilHeight, sunExposure, region, homeType, isKitchen, occupants, productBtu]);

    // Write changes back to sessionStorage key 'ahac_sizing_session'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                sessionStorage.setItem('ahac_sizing_session', JSON.stringify({
                    width,
                    length,
                    ceilHeight,
                    sunExposure,
                    region,
                    homeType,
                    isKitchen,
                    occupants,
                    recommendedBtu: calculations.recommendedBtu
                }));
            } catch (e) {
                console.error("Failed to save sizing session in ACCalculator", e);
            }
        }
    }, [width, length, ceilHeight, sunExposure, region, homeType, isKitchen, occupants, calculations.recommendedBtu]);

    const sizingStatus = useMemo(() => {
        const { compatibility, recommendedBtu } = calculations;
        if (compatibility === 'UNDERSIZED') {
            return {
                color: 'text-red-400 border-red-500/25 bg-red-500/5',
                title: 'Unit is Undersized for This Room',
                desc: `This ${productBtu.toLocaleString()} BTU unit will struggle to overcome heat gain in this ${calculations.area} sq. ft. space, especially with Oahu sun exposure. Sizing up is recommended.`,
                icon: AlertTriangle
            };
        } else if (compatibility === 'OVERSIZED') {
            return {
                color: 'text-amber-400 border-amber-500/25 bg-amber-500/5',
                title: 'Unit is Oversized',
                desc: `This ${productBtu.toLocaleString()} BTU unit exceeds the ${recommendedBtu.toLocaleString()} BTU requirement. With LG Dual Inverters, variable compressor speed reduces short-cycling risk, but sizing accurately saves upfront cost.`,
                icon: AlertTriangle
            };
        } else {
            return {
                color: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5',
                title: 'Perfect Sizing Match!',
                desc: `Matches your space's calculated cooling demand of ${recommendedBtu.toLocaleString()} BTU under Island Microclimate conditions.`,
                icon: CheckCircle2
            };
        }
    }, [calculations, productBtu]);

    const StatusIcon = sizingStatus.icon;

    // Get recommended shop link based on BTU mapping
    const recommendedShopLink = useMemo(() => {
        const btu = calculations.recommendedBtu;
        if (btu <= 8500) return "/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm";
        if (btu <= 13000) return "/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm";
        if (btu <= 16000) return "/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm";
        return "/shop/oahu-window-ac-warehouse";
    }, [calculations.recommendedBtu]);

    return (
        <div className={cn(
            "bg-slate-900/90 border rounded-3xl p-6 relative overflow-hidden group shadow-xl backdrop-blur-sm transition-all duration-500",
            calculations.compatibility === 'UNDERSIZED' ? "border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]" :
            calculations.compatibility === 'OVERSIZED' ? "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]" :
            "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        )}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none z-0" />
            
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
                <div className="flex items-center gap-2">
                    <Calculator className="size-5 text-primary animate-pulse" />
                    <h2 className="font-header font-black uppercase text-sm tracking-wider text-white">Hawaii BTU Sizing Matrix</h2>
                </div>
                <button 
                    onClick={() => setShowGuide(!showGuide)}
                    className="text-[11px] font-mono text-cyan-400 hover:text-white flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full transition-colors"
                >
                    <HelpCircle className="size-3.5" />
                    <span>Dual-Sizing Guide</span>
                </button>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-4 font-sans">
                Standard mainland sizing charts ignore Hawaii&apos;s humidity and single-wall thermal bleed. Calculate your exact BTU load calibrated for Oahu microclimates.
            </p>

            {/* Expandable Dual Sizing Doctrine Explanation */}
            {showGuide && (
                <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
                    <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                        <ShieldCheck className="size-4 text-emerald-400" />
                        <span>Why We Display Dual Sizing Ratings on Oahu:</span>
                    </div>
                    <p className="leading-relaxed">
                        • <strong className="text-white">AHAM Certified Baseline</strong>: Factory rating tested in sealed, insulated mainland laboratories with double-pane glass.
                    </p>
                    <p className="leading-relaxed">
                        • <strong className="text-white">Island Microclimate Calibration™</strong>: Field-tested standard for Hawaii single-wall redwood construction, unsealed jalousie windows, and intense Leeward / Honolulu solar heat gain. Sizing up by 25–35% prevents continuous compressor strain and keeps electric bills low.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs font-header font-black uppercase tracking-widest text-slate-200 mb-2">
                            <span>Width: {width} Feet</span>
                            <span>Length: {length} Feet</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <input 
                                type="range" 
                                min="8" 
                                max="35" 
                                value={width} 
                                onChange={(e) => setWidth(Number(e.target.value))} 
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                aria-label="Room Width in Feet"
                            />
                            <input 
                                type="range" 
                                min="8" 
                                max="35" 
                                value={length} 
                                onChange={(e) => setLength(Number(e.target.value))} 
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                aria-label="Room Length in Feet"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select 
                            value={homeType} 
                            onChange={(e) => setHomeType(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:border-cyan-400 outline-none transition-all cursor-pointer min-h-[44px] w-full"
                            title="Hawaii Home Construction"
                            aria-label="Hawaii Home Construction"
                        >
                            <option value="single_wall">Single-Wall Redwood (+20%)</option>
                            <option value="jalousie">Single-Wall + Jalousies (+30%)</option>
                            <option value="modern">Modern Insulated / Condo (1.0x)</option>
                        </select>
                        <select 
                            value={region} 
                            onChange={(e) => setRegion(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:border-cyan-400 outline-none transition-all cursor-pointer min-h-[44px] w-full"
                            title="Oahu Micro-Climate Region"
                            aria-label="Oahu Micro-Climate Region"
                        >
                            <option value="standard">Standard Oahu</option>
                            <option value="leeward">Leeward (Ewa/Kapolei +15%)</option>
                            <option value="urban">Honolulu Urban (+10%)</option>
                            <option value="windward">Windward Trade Winds (-5%)</option>
                        </select>
                        <select 
                            value={ceilHeight} 
                            onChange={(e) => setCeilHeight(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:border-cyan-400 outline-none transition-all cursor-pointer min-h-[44px] w-full"
                            aria-label="Room Ceiling Height"
                        >
                            <option value="standard">8ft Standard Ceilings</option>
                            <option value="high">9-11ft High Ceilings</option>
                            <option value="vaulted">12ft+ Vaulted Ceilings</option>
                        </select>
                        <select 
                            value={sunExposure} 
                            onChange={(e) => setSunExposure(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:border-cyan-400 outline-none transition-all cursor-pointer min-h-[44px] w-full"
                            aria-label="Room Sun Exposure"
                        >
                            <option value="moderate">Moderate Sun Exposure</option>
                            <option value="sunny">Intense Afternoon Sun</option>
                            <option value="shaded">North-Facing / Shaded</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                        <label className="text-xs text-slate-200 flex items-center gap-2 cursor-pointer select-none py-1">
                            <input 
                                type="checkbox" 
                                checked={isKitchen} 
                                onChange={(e) => setIsKitchen(e.target.checked)} 
                                className="size-4 rounded border-slate-700 bg-slate-950 text-primary focus:ring-1 focus:ring-primary accent-primary cursor-pointer" 
                                aria-label="Is this room a kitchen?"
                            /> 
                            Kitchen Area (+4,000 BTU)
                        </label>
                        <div className="text-xs text-slate-200 flex items-center gap-2">
                            <span>Occupants:</span>
                            <div className="flex items-center border border-slate-700 bg-slate-950 rounded-lg overflow-hidden h-9">
                                <button 
                                    type="button"
                                    onClick={() => setOccupants(prev => Math.max(1, prev - 1))}
                                    className="w-8 h-full hover:bg-slate-800 text-slate-200 transition-colors text-xs font-bold"
                                    aria-label="Decrease occupant count"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center text-xs text-white font-bold">
                                    {occupants}
                                </span>
                                <button 
                                    type="button"
                                    onClick={() => setOccupants(prev => Math.min(10, prev + 1))}
                                    className="w-8 h-full hover:bg-slate-800 text-slate-200 transition-colors text-xs font-bold"
                                    aria-label="Increase occupant count"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-700/50 pt-5 md:pt-0 md:pl-6 text-center md:text-left">
                    <div>
                        <div className="text-[11px] font-header font-black uppercase tracking-wider text-slate-400">Calculated Demand ({calculations.area} sq. ft.)</div>
                        <div className="text-3xl font-header font-black text-white mt-1">
                            {calculations.recommendedBtu.toLocaleString()} <span className="text-[11px] text-cyan-400 font-bold">BTU (Island)</span>
                        </div>
                        <div className="text-xs text-slate-400 font-sans mt-0.5">
                            Factory AHAM Baseline: <span className="text-slate-300 font-semibold">{calculations.ahamBaseBtu.toLocaleString()} BTU</span>
                        </div>
                    </div>
 
                    <div className="flex flex-col gap-3 mt-4">
                        <div className={`p-3.5 rounded-2xl border flex flex-col gap-1 text-left ${sizingStatus.color}`}>
                            <div className="flex items-center gap-1.5 font-header font-black uppercase tracking-wider text-xs">
                                <StatusIcon className="size-4 shrink-0" /> {sizingStatus.title}
                            </div>
                            <p className="text-xs leading-relaxed text-slate-300 font-sans mt-0.5">
                                {sizingStatus.desc}
                            </p>
                        </div>

                        {/* Direct CTA Sizing Action Pathway */}
                        {calculations.compatibility !== 'PERFECT' ? (
                            <div className="flex flex-col gap-2 w-full">
                                <Link 
                                    href={recommendedShopLink} 
                                    className="w-full text-center bg-primary hover:bg-cyan-400 text-slate-950 text-xs font-header font-black uppercase tracking-widest py-3 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px]"
                                >
                                    <span>Browse {calculations.recommendedBtu.toLocaleString()} BTU In-Stock Units</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className="w-full text-center bg-transparent border border-slate-600 hover:border-primary text-slate-300 hover:text-white text-xs font-header font-black uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center min-h-[40px]"
                                >
                                    Free In-Home Sizing Assessment ($0)
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full">
                                <button 
                                    onClick={() => {
                                        const el = document.getElementById('product-purchase-section');
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        } else {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    className="w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-header font-black uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px]"
                                >
                                    <CheckCircle2 className="size-4 text-slate-950" />
                                    <span>Perfect Sizing Match - Reserve Unit</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
