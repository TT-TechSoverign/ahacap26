'use client';

import React, { useState, useMemo } from 'react';
import { Ruler, CheckCircle2, AlertTriangle, Phone, ExternalLink, Zap, Shield, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export interface SpatialCaliperSpecs {
    modelName: string;
    btu: number | string;
    minWindowHeight: string;
    minWindowWidth: string;
    maxWindowWidth: string;
    chassisType: string;
    dimensions: string;
    weight: string;
    voltage: string;
    plugType?: string;
    coverageAham?: string;
    coverageOahu?: string;
    noiseLevel?: string;
    isWallSleeve?: boolean;
}

interface SpatialCaliperHUDProps {
    specs: SpatialCaliperSpecs;
    compact?: boolean;
    onExpand?: () => void;
}

export function SpatialCaliperHUD({ specs, compact = false, onExpand }: SpatialCaliperHUDProps) {
    const [unitSystem, setUnitSystem] = useState<'in' | 'cm'>('in');
    const [userHeight, setUserHeight] = useState<string>('');
    const [userWidth, setUserWidth] = useState<string>('');
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
    const [showCalculator, setShowCalculator] = useState(false);

    // Numeric parsing helper
    const parseNum = (str: string): number => {
        const match = str.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    };

    const minH_num = parseNum(specs.minWindowHeight || '16');
    const minW_num = parseNum(specs.minWindowWidth || '27');
    const maxW_num = parseNum(specs.maxWindowWidth || '39');

    // Unit conversion formatting
    const formatDim = (valInInches: number | string): string => {
        if (typeof valInInches === 'string') {
            const num = parseNum(valInInches);
            if (isNaN(num) || num === 0) return valInInches;
            if (unitSystem === 'cm') {
                return `${(num * 2.54).toFixed(1)} cm`;
            }
            return `${num.toFixed(1)}"`;
        }
        if (unitSystem === 'cm') {
            return `${(valInInches * 2.54).toFixed(1)} cm`;
        }
        return `${valInInches.toFixed(1)}"`;
    };

    // Live Window Fit Evaluation
    const fitEvaluation = useMemo(() => {
        const h = parseFloat(userHeight);
        const w = parseFloat(userWidth);

        if (!h && !w) return null;

        if (h > 0 && h < minH_num) {
            return {
                status: 'warning',
                title: 'Below Recommended Sash Height',
                message: `Your window height (${h}") is below the ${specs.minWindowHeight} manufacturer recommendation. A compact chassis (13.0" min) is recommended.`,
                actionLink: '/shop#base',
                actionText: 'View Compact Series (13" Min)'
            };
        }

        if (w > 0 && (w < minW_num || (maxW_num > minW_num && w > maxW_num))) {
            return {
                status: 'warning',
                title: 'Outside Recommended Width Span',
                message: `Your window width (${w}") is outside the recommended ${specs.minWindowWidth}–${specs.maxWindowWidth} curtain span. Custom seal fillers may be required.`,
                actionLink: '/contact',
                actionText: 'Consult Waipahu Dispatch'
            };
        }

        if (h >= minH_num && (w >= minW_num && (maxW_num === minW_num || w <= maxW_num))) {
            return {
                status: 'success',
                title: 'Optimal Fit Recommendation',
                message: `Your dimensions (${h}" H × ${w}" W) match recommended manufacturer specifications with recommended clearance.`,
                actionLink: null,
                actionText: null
            };
        }

        if (h >= minH_num) {
            return {
                status: 'info',
                title: 'Sash Clearance Recommended',
                message: `Vertical lift (${h}") clears the ${specs.minWindowHeight} minimum requirement. Enter width to verify accordion curtains.`,
                actionLink: null,
                actionText: null
            };
        }

        return null;
    }, [userHeight, userWidth, minH_num, minW_num, maxW_num, specs]);

    return (
        <div className="w-full relative select-none">
            {/* Top Control Bar: Unit Switcher & Quick Caliper Badges */}
            <div className="flex items-center justify-between gap-2 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-xs font-mono mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
                        <Ruler className="size-3.5" />
                        <span>Architectural Sizing:</span>
                    </span>
                    <span className="text-white font-bold text-[11px]">
                        {formatDim(minH_num)} H Min × {formatDim(minW_num)}–{formatDim(maxW_num)} W
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    {/* Unit Switcher */}
                    <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 text-[9px] font-bold">
                        <button
                            type="button"
                            onClick={() => setUnitSystem('in')}
                            className={`px-2 py-0.5 rounded transition-all ${unitSystem === 'in' ? 'bg-cyan-500 text-black font-black shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            IN
                        </button>
                        <button
                            type="button"
                            onClick={() => setUnitSystem('cm')}
                            className={`px-2 py-0.5 rounded transition-all ${unitSystem === 'cm' ? 'bg-cyan-500 text-black font-black shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            CM
                        </button>
                    </div>

                    {/* Check My Window Trigger */}
                    <button
                        type="button"
                        onClick={() => setShowCalculator(!showCalculator)}
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-header font-black uppercase tracking-wider transition-all border ${showCalculator ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-white/5 hover:bg-white/10 text-emerald-300 border-emerald-500/30'}`}
                    >
                        Check My Window
                    </button>
                </div>
            </div>

            {/* Interactive "Check My Window" Instant Sizing Validator Drawer */}
            {showCalculator && (
                <div className="mb-3 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-xs font-header font-black uppercase tracking-wider text-white">
                                Instant Window Fit Assessment
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowCalculator(false)}
                            className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="size-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-cyan-300 uppercase flex items-center justify-between">
                                <span>Your Window Opening Height ({unitSystem === 'in' ? 'inches' : 'cm'})</span>
                                <span className="text-slate-400 text-[9px]">Min: {formatDim(minH_num)}</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={unitSystem === 'in' ? 'e.g. 17.5' : 'e.g. 44.5'}
                                    value={userHeight}
                                    onChange={(e) => setUserHeight(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-xs focus:border-cyan-400 focus:outline-none transition-all placeholder:text-slate-600"
                                />
                                <span className="absolute right-3 top-2 text-slate-500 text-xs font-mono">{unitSystem}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-emerald-300 uppercase flex items-center justify-between">
                                <span>Your Window Width ({unitSystem === 'in' ? 'inches' : 'cm'})</span>
                                <span className="text-slate-400 text-[9px]">Span: {formatDim(minW_num)}–{formatDim(maxW_num)}</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={unitSystem === 'in' ? 'e.g. 32.0' : 'e.g. 81.3'}
                                    value={userWidth}
                                    onChange={(e) => setUserWidth(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-xs focus:border-emerald-400 focus:outline-none transition-all placeholder:text-slate-600"
                                />
                                <span className="absolute right-3 top-2 text-slate-500 text-xs font-mono">{unitSystem}</span>
                            </div>
                        </div>
                    </div>

                    {/* Instant Evaluation Feedback */}
                    {fitEvaluation && (
                        <div className={`p-3 rounded-xl border mb-3 flex items-start gap-2.5 text-left text-xs ${fitEvaluation.status === 'success' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : fitEvaluation.status === 'warning' ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'}`}>
                            {fitEvaluation.status === 'success' ? (
                                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : fitEvaluation.status === 'warning' ? (
                                <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
                            ) : (
                                <Ruler className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 space-y-1">
                                <div className="font-header font-black uppercase text-[11px] tracking-wide">
                                    {fitEvaluation.title}
                                </div>
                                <p className="text-[11px] leading-relaxed opacity-90 font-sans">
                                    {fitEvaluation.message}
                                </p>
                                {fitEvaluation.actionLink && fitEvaluation.actionText && (
                                    <Link
                                        href={fitEvaluation.actionLink}
                                        className="inline-flex items-center gap-1 text-[10px] font-bold text-white underline hover:text-amber-300 pt-1"
                                    >
                                        <span>{fitEvaluation.actionText}</span>
                                        <ArrowRight className="size-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 1-Click Dispatch Verification Action */}
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-slate-400 font-sans">
                            Unsure about single-wall redwood or jalousie trim?
                        </span>
                        <a
                            href={`sms:8084881111?body=Aloha AHAC Dispatch, please verify my window fit for ${specs.modelName}. Window height: ${userHeight || '___'} in, width: ${userWidth || '___'} in.`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg font-mono font-bold transition-all"
                        >
                            <Phone className="size-3" />
                            <span>Text Dispatch for Free Review</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Architectural Clearance Telemetry Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                <div
                    onClick={() => setActiveHotspot(activeHotspot === 'sash' ? null : 'sash')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeHotspot === 'sash' ? 'bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400/50' : 'bg-white/[0.03] border-white/10 hover:border-cyan-500/40'}`}
                >
                    <div className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-between">
                        <span>Min Sash Lift</span>
                        <span className="size-1.5 rounded-full bg-cyan-400" />
                    </div>
                    <div className="text-xs font-bold font-mono text-white mt-1">
                        {formatDim(minH_num)}
                    </div>
                    <div className="text-[8px] text-slate-400 font-sans mt-0.5">
                        Clear vertical opening
                    </div>
                </div>

                <div
                    onClick={() => setActiveHotspot(activeHotspot === 'width' ? null : 'width')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeHotspot === 'width' ? 'bg-emerald-950/60 border-emerald-400 ring-1 ring-emerald-400/50' : 'bg-white/[0.03] border-white/10 hover:border-emerald-500/40'}`}
                >
                    <div className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest flex items-center justify-between">
                        <span>Width Opening</span>
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-xs font-bold font-mono text-white mt-1">
                        {formatDim(minW_num)}–{formatDim(maxW_num)}
                    </div>
                    <div className="text-[8px] text-slate-400 font-sans mt-0.5">
                        With side curtains
                    </div>
                </div>

                <div
                    onClick={() => setActiveHotspot(activeHotspot === 'chassis' ? null : 'chassis')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeHotspot === 'chassis' ? 'bg-amber-950/60 border-amber-400 ring-1 ring-amber-400/50' : 'bg-white/[0.03] border-white/10 hover:border-amber-500/40'}`}
                >
                    <div className="text-[8px] font-mono text-amber-400 uppercase tracking-widest flex items-center justify-between">
                        <span>Chassis Style</span>
                        <span className="size-1.5 rounded-full bg-amber-400" />
                    </div>
                    <div className="text-xs font-bold font-mono text-white mt-1 truncate">
                        {specs.chassisType}
                    </div>
                    <div className="text-[8px] text-slate-400 font-sans mt-0.5">
                        Weight: {specs.weight} lbs
                    </div>
                </div>

                <div
                    onClick={() => setActiveHotspot(activeHotspot === 'power' ? null : 'power')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeHotspot === 'power' ? 'bg-purple-950/60 border-purple-400 ring-1 ring-purple-400/50' : 'bg-white/[0.03] border-white/10 hover:border-purple-500/40'}`}
                >
                    <div className="text-[8px] font-mono text-purple-400 uppercase tracking-widest flex items-center justify-between">
                        <span>Electrical</span>
                        <Zap className="size-2.5 text-purple-400" />
                    </div>
                    <div className="text-xs font-bold font-mono text-white mt-1 truncate">
                        {specs.voltage?.split('/')?.[0]?.trim() || '115V'}
                    </div>
                    <div className="text-[8px] text-slate-400 font-sans mt-0.5 truncate">
                        {specs.plugType || 'NEMA Standard'}
                    </div>
                </div>
            </div>

            {/* Active Hotspot Explainer Modal / Drawer */}
            {activeHotspot && (
                <div className="mt-2 p-3 rounded-xl bg-slate-900/95 border border-white/15 text-left text-xs space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                        <span className="font-header font-black uppercase text-cyan-300 text-[10px] tracking-wider">
                            {activeHotspot === 'sash' && 'Vertical Sash Clearance Guide'}
                            {activeHotspot === 'width' && 'Window Sill Span & Curtain Extension'}
                            {activeHotspot === 'chassis' && 'Chassis Architecture & Hawaii Single-Wall Balance'}
                            {activeHotspot === 'power' && 'Oahu Electrical & Circuit Grounding'}
                        </span>
                        <button
                            type="button"
                            onClick={() => setActiveHotspot(null)}
                            className="text-slate-400 hover:text-white"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {activeHotspot === 'sash' && `This ${specs.modelName} requires a minimum clear vertical opening of ${formatDim(minH_num)} from the sill to the raised bottom edge of your sash frame. Standard Hawaii double-hung sashes lift 18"–22".`}
                        {activeHotspot === 'width' && `The unit includes heavy-duty side accordion curtain panels that expand from ${formatDim(minW_num)} up to ${formatDim(maxW_num)} to create an airtight seal in standard Oahu window casings.`}
                        {activeHotspot === 'chassis' && `${specs.chassisType} design balances weight across standard Hawaii window stools. In uninsulated single-wall construction, the cabinet rests securely without custom carpentry.`}
                        {activeHotspot === 'power' && `Operates on ${specs.voltage}. Calibrated against HECO residential ~44.2¢/kWh power rates. Qualifies for the $45 Hawaii Energy cash rebate.`}
                    </p>
                </div>
            )}

            {/* Hawaii Grounding Footer */}
            <div className="mt-2.5 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 font-mono text-center sm:text-left">
                <span className="flex items-center gap-1.5">
                    <Shield className="size-3 text-emerald-400 shrink-0" />
                    <span>Oahu Single-Wall &amp; Jalousie Calibrated • CT-36775 Grounded</span>
                </span>
                <Link
                    href="/shop/window-ac-plug-guide"
                    className="text-cyan-400 hover:text-white underline flex items-center gap-1 shrink-0"
                >
                    <span>View Oahu Plug Guide</span>
                    <ExternalLink className="size-2.5" />
                </Link>
            </div>
        </div>
    );
}
