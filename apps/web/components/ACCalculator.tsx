import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
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
    const [insulation, setInsulation] = useState<'good' | 'poor'>('good');
    const [isKitchen, setIsKitchen] = useState<boolean>(false);
    const [occupants, setOccupants] = useState<number>(2);

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
                if (parsed.insulation) setInsulation(parsed.insulation);
                if (parsed.isKitchen !== undefined) setIsKitchen(Boolean(parsed.isKitchen));
                if (parsed.occupants) setOccupants(Number(parsed.occupants));
            }
        } catch (e) {
            console.error("Failed to load sizing session in ACCalculator", e);
        }
    }, []);

    const calculations = useMemo(() => {
        const area = width * length;
        
        // Piecewise interpolation formula aligned directly to the shop page sizing table
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

        // Ceiling Height Load Modifier
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

        // Sizing Compatibility Check
        const diffPercent = (productBtu - recommendedBtu) / recommendedBtu;
        let compatibility: 'PERFECT' | 'UNDERSIZED' | 'OVERSIZED' = 'PERFECT';
        if (diffPercent < -0.15) compatibility = 'UNDERSIZED';
        else if (diffPercent > 0.25) compatibility = 'OVERSIZED';

        return { area, recommendedBtu, compatibility };
    }, [width, length, ceilHeight, sunExposure, region, insulation, isKitchen, occupants, productBtu]);

    // Write changes back to sessionStorage key 'ahac_sizing_session' when the calculator state updates
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                sessionStorage.setItem('ahac_sizing_session', JSON.stringify({
                    width,
                    length,
                    ceilHeight,
                    sunExposure,
                    region,
                    insulation,
                    isKitchen,
                    occupants,
                    recommendedBtu: calculations.recommendedBtu
                }));
            } catch (e) {
                console.error("Failed to save sizing session in ACCalculator", e);
            }
        }
    }, [width, length, ceilHeight, sunExposure, region, insulation, isKitchen, occupants, calculations.recommendedBtu]);

    const sizingStatus = useMemo(() => {
        const { compatibility, recommendedBtu } = calculations;
        if (compatibility === 'UNDERSIZED') {
            return {
                color: 'text-red-400 border-red-500/25 bg-red-500/5',
                title: 'Unit is Under-powered',
                desc: `This ${productBtu.toLocaleString()} BTU unit will struggle to cool this room. It may run continuously, increasing electricity bills. Sizing up is recommended.`,
                icon: AlertTriangle
            };
        } else if (compatibility === 'OVERSIZED') {
            return {
                color: 'text-amber-400 border-amber-500/25 bg-amber-500/5',
                title: 'Unit is Oversized',
                desc: `This ${productBtu.toLocaleString()} BTU unit is larger than needed. A standard AC that is too large will short-cycle, leading to high wear and humidity retention.`,
                icon: AlertTriangle
            };
        } else {
            return {
                color: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5',
                title: 'Perfect Sizing Match!',
                desc: `Matches your space's calculated cooling demand of ${recommendedBtu.toLocaleString()} BTU.`,
                icon: CheckCircle2
            };
        }
    }, [calculations, productBtu, calculations.recommendedBtu]);

    const StatusIcon = sizingStatus.icon;

    // Get recommended shop link based on BTU mapping
    const recommendedShopLink = useMemo(() => {
        const btu = calculations.recommendedBtu;
        if (btu <= 8500) return "/shop#dual_inverter";
        if (btu <= 13000) return "/shop#dual_inverter"; // 10-12K units
        if (btu <= 17000) return "/shop#dual_inverter"; // 14K units
        return "/shop#universal_fit"; // 18-24K high capacity
    }, [calculations.recommendedBtu]);

    return (
        <div className={cn(
            "bg-slate-900/90 border rounded-3xl p-6 relative overflow-hidden group shadow-xl backdrop-blur-sm transition-all duration-500",
            calculations.compatibility === 'UNDERSIZED' ? "border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]" :
            calculations.compatibility === 'OVERSIZED' ? "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]" :
            "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        )}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none z-0" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Calculator className="size-5 text-primary animate-pulse" />
                <h2 className="font-header font-black uppercase text-sm tracking-wider text-white">Hawaii BTU Sizing Matrix</h2>
            </div>

            <p className="text-slate-200 text-xs leading-relaxed mb-6 font-sans">
                Standard sizing models ignore Hawaii&apos;s humidity. Calculate your room load calibrated for Oahu&apos;s micro-climates.
            </p>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <select 
                            value={region} 
                            onChange={(e) => setRegion(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-500 text-white rounded-xl px-4 py-3 text-sm focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/20 focus:shadow-[0_0_10px_rgba(0,229,255,0.25)] outline-none transition-all cursor-pointer min-h-[48px] w-full"
                            title="Oahu Micro-Climate Region"
                            aria-label="Oahu Micro-Climate Region"
                        >
                            <option value="standard">Standard Oahu</option>
                            <option value="leeward">Leeward (Ewa/Kapolei)</option>
                            <option value="windward">Windward (Kailua/Kaneohe)</option>
                            <option value="urban">Honolulu / Urban</option>
                        </select>
                        <select 
                            value={ceilHeight} 
                            onChange={(e) => setCeilHeight(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-500 text-white rounded-xl px-4 py-3 text-sm focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/20 focus:shadow-[0_0_10px_rgba(0,229,255,0.25)] outline-none transition-all cursor-pointer min-h-[48px] w-full"
                            aria-label="Room Ceiling Height"
                        >
                            <option value="standard">8ft Ceilings</option>
                            <option value="high">9-11ft Ceilings</option>
                            <option value="vaulted">12ft+ Ceilings</option>
                        </select>
                        <select 
                            value={sunExposure} 
                            onChange={(e) => setSunExposure(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-500 text-white rounded-xl px-4 py-3 text-sm focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/20 focus:shadow-[0_0_10px_rgba(0,229,255,0.25)] outline-none transition-all cursor-pointer min-h-[48px] w-full"
                            aria-label="Room Sun Exposure"
                        >
                            <option value="shaded">North / Shaded</option>
                            <option value="moderate">Moderate Sun</option>
                            <option value="sunny">Sunny / West Oahu</option>
                        </select>
                        <select 
                            value={insulation} 
                            onChange={(e) => setInsulation(e.target.value as any)} 
                            className="bg-slate-950 border border-slate-500 text-white rounded-xl px-4 py-3 text-sm focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/20 focus:shadow-[0_0_10px_rgba(0,229,255,0.25)] outline-none transition-all cursor-pointer min-h-[48px] w-full"
                            aria-label="Room Insulation Quality"
                        >
                            <option value="good">Well-Insulated</option>
                            <option value="poor">Poor Insulation</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                        <label className="text-xs md:text-sm text-slate-200 flex items-center gap-2.5 cursor-pointer select-none py-2 min-h-[48px]">
                            <input 
                                type="checkbox" 
                                checked={isKitchen} 
                                onChange={(e) => setIsKitchen(e.target.checked)} 
                                className="size-5 rounded border-slate-500 bg-slate-950 text-primary focus:ring-1 focus:ring-primary focus:ring-offset-0 accent-primary cursor-pointer" 
                                aria-label="Is this room a kitchen?"
                            /> 
                            Is Kitchen (+4,000 BTU)
                        </label>
                        <div className="text-xs md:text-sm text-slate-200 flex items-center gap-3 py-1">
                            <span>Occupants:</span>
                            <div className="flex items-center border border-slate-500 bg-slate-950 rounded-xl overflow-hidden min-h-[48px]">
                                <button 
                                    type="button"
                                    onClick={() => setOccupants(prev => Math.max(1, prev - 1))}
                                    className="w-12 h-full hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-sm font-bold"
                                    aria-label="Decrease occupant count"
                                >
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="10" 
                                    value={occupants} 
                                    onChange={(e) => setOccupants(Math.max(1, Number(e.target.value)))} 
                                    className="w-10 bg-transparent text-center border-none focus:ring-0 text-sm text-white font-bold outline-none" 
                                    aria-label="Number of regular occupants"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setOccupants(prev => Math.min(10, prev + 1))}
                                    className="w-12 h-full hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-sm font-bold"
                                    aria-label="Increase occupant count"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-500/40 pt-6 md:pt-0 md:pl-6 text-center md:text-left">
                    <div>
                        <div className="text-xs font-header font-black uppercase tracking-wider text-slate-100">Calculated Demand</div>
                        <div className="text-3xl font-header font-black text-white mt-1">
                            {calculations.recommendedBtu.toLocaleString()} <span className="text-[10px] text-primary font-bold">BTU</span>
                        </div>
                        <div className="text-xs text-slate-200 font-sans mt-1">Area: {calculations.area} sq. ft.</div>
                    </div>
 
                    <div className="flex flex-col gap-3 mt-4">
                        <div className={`p-4 rounded-2xl border flex flex-col gap-1 text-left ${sizingStatus.color}`}>
                            <div className="flex items-center gap-1.5 font-header font-black uppercase tracking-wider text-xs md:text-sm">
                                <StatusIcon className="size-4" /> {sizingStatus.title}
                            </div>
                            <p className="text-xs leading-relaxed text-slate-200 font-sans mt-1">
                                {sizingStatus.desc}
                            </p>
                        </div>

                        {/* Direct CTA Sizing Action Pathway */}
                        {calculations.compatibility !== 'PERFECT' ? (
                            <div className="flex flex-col gap-2 w-full">
                                <Link 
                                    href={recommendedShopLink} 
                                    className="w-full text-center bg-primary hover:bg-cyan-400 text-white text-xs font-header font-black uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
                                >
                                    <span>Shop {calculations.recommendedBtu.toLocaleString()} BTU Units</span>
                                    <ArrowRight className="size-4 animate-pulse" />
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className="w-full text-center bg-transparent border border-slate-400 hover:border-primary text-slate-100 hover:text-white text-xs font-header font-black uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center min-h-[48px]"
                                >
                                    Request Custom Mini-Split Quote
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
                                    className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-header font-black uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
                                >
                                    <CheckCircle2 className="size-4" />
                                    <span>Perfect Sizing Match - Add to Cart</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
