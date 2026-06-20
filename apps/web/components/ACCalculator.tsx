import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

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

    const calculations = useMemo(() => {
        const area = width * length;
        let baseBtu = area * 20; // 20 BTU per sq ft baseline

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

    const sizingStatus = useMemo(() => {
        const { compatibility, recommendedBtu } = calculations;
        if (compatibility === 'UNDERSIZED') {
            return {
                color: 'text-red-400 border-red-500/20 bg-red-500/5',
                title: 'Unit is Under-powered',
                desc: `This ${productBtu.toLocaleString()} BTU unit will struggle to cool this room. It may run continuously, increasing electricity bills. Sizing up is recommended.`,
                icon: AlertTriangle
            };
        } else if (compatibility === 'OVERSIZED') {
            return {
                color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
                title: 'Unit is Oversized',
                desc: `This ${productBtu.toLocaleString()} BTU unit is larger than needed. A standard AC that is too large will short-cycle, leading to high wear and humidity retention.`,
                icon: AlertTriangle
            };
        } else {
            return {
                color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
                title: 'Perfect Sizing Match!',
                desc: `Matches your space's calculated cooling demand of ${recommendedBtu.toLocaleString()} BTU.`,
                icon: CheckCircle2
            };
        }
    }, [calculations, productBtu]);

    const StatusIcon = sizingStatus.icon;

    return (
        <div className="bg-surface-dark border border-border-dark rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none z-0" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Calculator className="size-5 text-primary animate-pulse" />
                <h4 className="font-header font-black uppercase text-sm tracking-wider text-white">Hawaii BTU Sizing Matrix</h4>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans">
                Standard sizing models ignore Hawaii&apos;s humidity. Calculate your room load calibrated for Oahu&apos;s micro-climates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[9px] font-header font-black uppercase tracking-widest text-slate-400 mb-1.5">
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
                                className="w-full accent-primary cursor-pointer"
                            />
                            <input 
                                type="range" 
                                min="8" 
                                max="35" 
                                value={length} 
                                onChange={(e) => setLength(Number(e.target.value))} 
                                className="w-full accent-primary cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <select 
                            value={region} 
                            onChange={(e) => setRegion(e.target.value as any)} 
                            className="bg-[#0b1120] border border-border-dark text-slate-200 rounded-xl px-3 py-2 text-xs focus:border-primary/50 outline-none transition-all cursor-pointer"
                            title="Oahu Micro-Climate Region"
                        >
                            <option value="standard">Standard Oahu</option>
                            <option value="leeward">Leeward (Ewa/Kapolei)</option>
                            <option value="windward">Windward (Kailua/Kaneohe)</option>
                            <option value="urban">Honolulu / Urban</option>
                        </select>
                        <select 
                            value={ceilHeight} 
                            onChange={(e) => setCeilHeight(e.target.value as any)} 
                            className="bg-[#0b1120] border border-border-dark text-slate-200 rounded-xl px-3 py-2 text-xs focus:border-primary/50 outline-none transition-all cursor-pointer"
                        >
                            <option value="standard">8ft Ceilings</option>
                            <option value="high">9-11ft Ceilings</option>
                            <option value="vaulted">12ft+ Ceilings</option>
                        </select>
                        <select 
                            value={sunExposure} 
                            onChange={(e) => setSunExposure(e.target.value as any)} 
                            className="bg-[#0b1120] border border-border-dark text-slate-200 rounded-xl px-3 py-2 text-xs focus:border-primary/50 outline-none transition-all cursor-pointer"
                        >
                            <option value="shaded">North / Shaded</option>
                            <option value="moderate">Moderate Sun</option>
                            <option value="sunny">Sunny / West Oahu</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <label className="text-[10px] text-slate-400 flex items-center gap-1.5 cursor-pointer select-none">
                            <input 
                                type="checkbox" 
                                checked={isKitchen} 
                                onChange={(e) => setIsKitchen(e.target.checked)} 
                                className="rounded border-border-dark text-primary focus:ring-0 accent-primary" 
                            /> 
                            Is Kitchen (+4,000 BTU)
                        </label>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <span>Occupants:</span>
                            <input 
                                type="number" 
                                min="1" 
                                max="10" 
                                value={occupants} 
                                onChange={(e) => setOccupants(Math.max(1, Number(e.target.value)))} 
                                className="w-10 bg-[#0b1120] text-center border border-border-dark rounded p-0.5 text-xs text-white" 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-border-dark/50 pt-4 md:pt-0 md:pl-6 text-center md:text-left">
                    <div>
                        <div className="text-[9px] font-header font-black uppercase tracking-wider text-slate-500">Calculated Demand</div>
                        <div className="text-3xl font-header font-black text-white mt-1">
                            {calculations.recommendedBtu.toLocaleString()} <span className="text-[10px] text-primary font-bold">BTU</span>
                        </div>
                        <div className="text-[9px] text-slate-400 font-sans mt-0.5">Area: {calculations.area} sq. ft.</div>
                    </div>

                    <div className={`mt-4 p-3 rounded-2xl border flex flex-col gap-1 text-left ${sizingStatus.color}`}>
                        <div className="flex items-center gap-1.5 font-header font-black uppercase tracking-wider text-[10px]">
                            <StatusIcon className="size-4" /> {sizingStatus.title}
                        </div>
                        <p className="text-[9px] leading-relaxed text-slate-300 font-sans">
                            {sizingStatus.desc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
