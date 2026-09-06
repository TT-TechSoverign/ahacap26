'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContent } from '@/lib/context/ContentContext';
import { BackToTop } from '@/components/BackToTop';
import { 
    CheckCircle, 
    ArrowRight, 
    Wrench, 
    Zap, 
    Wind, 
    Droplets, 
    ShieldCheck, 
    Phone,
    Calculator,
    AlertTriangle,
    ChevronDown,
    Sparkles,
    Check,
    CheckCircle2
} from 'lucide-react';
import { trackFunnelEvent } from '@/lib/tracking';

export default function MiniSplitACMaintenancePage() {
    const { content } = useContent();
    const data = content?.mini_split_ac_maintenance;

    // Interactive Calculator State
    const [calcTier, setCalcTier] = useState<'basic' | 'premium'>('premium');
    const [calcUnits, setCalcUnits] = useState<number>(2);

    // Interactive Symptom Checker State
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
        'smell',
        'airflow'
    ]);

    // Interactive FAQ Accordion State
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    if (!data) return null;

    const unitPrice = calcTier === 'basic' ? 175 : 275;
    const totalPrice = unitPrice * calcUnits;
    const tierName = calcTier === 'basic' ? 'Basic Maintenance' : 'Clinical Chemical Teardown';

    const symptomsList = [
        {
            id: 'smell',
            label: 'Musty, damp odor when AC turns on',
            severity: 2,
            detail: 'Spore growth and stagnant condensation in the drain pan'
        },
        {
            id: 'specks',
            label: 'Black specks or dusty mold on louvers/blower',
            severity: 3,
            detail: 'Visible Cladosporium or Aspergillus mold colony on the barrel fan'
        },
        {
            id: 'airflow',
            label: 'Airflow feels weak or room cools slowly',
            severity: 2,
            detail: 'Cooling coil fins choked with lint, pet hair, and salt crust'
        },
        {
            id: 'leak',
            label: 'Water dripping from indoor unit onto wall/floor',
            severity: 3,
            detail: 'Algae biofilm blocking gravity condensate drain line'
        },
        {
            id: 'bills',
            label: 'Noticeable jump in monthly HECO power bill',
            severity: 2,
            detail: 'Inverter compressor overworking at high RPM to compensate for restriction'
        }
    ];

    const toggleSymptom = (id: string) => {
        const isAdding = !selectedSymptoms.includes(id);
        const nextSymptoms = isAdding
            ? [...selectedSymptoms, id]
            : selectedSymptoms.filter(s => s !== id);
        setSelectedSymptoms(nextSymptoms);
        trackFunnelEvent('symptom_checked', {
            symptom_id: id,
            checked: isAdding,
            total_selected: nextSymptoms.length
        });
    };

    const totalSeverity = selectedSymptoms.reduce((acc, curr) => {
        const item = symptomsList.find(s => s.id === curr);
        return acc + (item ? item.severity : 0);
    }, 0);

    const faqs = [
        {
            q: "How much does ductless mini-split cleaning cost in Oahu?",
            a: "Our routine basic mini-split sanitization is $175 per unit, and our full clinical deep chemical teardown is $275 per unit. Multi-unit residential appointments can be serviced during the same visit."
        },
        {
            q: "How often should mini-split AC units be cleaned in Hawaii?",
            a: "Due to Oahu's year-round 80%+ humidity and trade-wind salt exposure, professional deep cleanings are recommended every 6 to 12 months. This prevents toxic black mold colonies from spreading through your ductless system."
        },
        {
            q: "Does professional cleaning remove black mold from the internal blower wheel?",
            a: "Yes! Over 90% of mold lives deep inside the cylindrical squirrel-cage blower fan. Our specialized multi-point teardown, high-precision rinse systems, and deep-cleansing sanitizing flushes dissolve and extract mold and biofilm completely—restoring clean, icy-cold airflow."
        },
        {
            q: "Can a dirty mini-split AC increase my HECO power bill?",
            a: "Yes. Mold and grime choking the coil fins and blower fan cut heat exchange efficiency. Your inverter compressor is forced to draw 20% to 30% more power continuously to reach your set temperature."
        },
        {
            q: "Will the chemical cleaning make a water mess inside my home?",
            a: "Zero water mess. Our technicians lay down clean, heavy-duty floor drop cloths directly beneath your unit and use precision rinses. All dirty water and mold slurry are safely contained and removed from your home with zero water mess on your floors."
        }
    ];

    return (
        <div className="bg-background-dark min-h-screen text-white font-sans selection:bg-primary selection:text-slate-950">
            {/* Adjusted padding and expanded container for world-class breathing room */}
            <div className="pt-[140px] md:pt-[165px] lg:pt-[175px] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                
                {/* HERO HEADER */}
                <div className="text-center mb-12 border-b border-white/5 pb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(0,174,239,0.2)]">
                        <ShieldCheck className="size-3.5 text-primary" />
                        Zero Water Mess • Deep Mold Eradication
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-header font-black uppercase tracking-widest text-white mb-4 neon-glow">
                        Mini Split AC <span className="text-primary">Deep Cleaning</span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
                        Eradicate black mold, musty trade-wind odors, and salt-air buildup. Restores 100% cooling capacity and whisper-quiet airflow efficiency across Oahu.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a 
                            href="#calculator"
                            className="px-6 py-3.5 bg-primary hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-all flex items-center gap-2"
                        >
                            <Calculator className="size-4" /> Multi-Unit Calculator
                        </a>
                        <Link 
                            href="/contact?service=Mini+Split+Maintenance"
                            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
                        >
                            Book Oahu Service
                        </Link>
                        <a 
                            href="tel:808-488-1111"
                            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
                        >
                            <Phone className="size-4 text-primary" /> (808) 488-1111
                        </a>
                    </div>
                </div>

                {/* SERVICE TIER CARDS (Basic vs Premium Teardown) */}
                <div className="flex flex-col md:flex-row gap-8 mb-20">
                    
                    {/* Basic Service ($175) */}
                    <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-slate-700 transition-colors">
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800 group/image">
                            <Image 
                                src="/assets/minisplitacphotos/mini-split-basic-maintenance.png" 
                                alt="Basic Mini Split AC Service Before and After" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                            <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/10 pointer-events-none"></div>
                            <div className="absolute inset-0 flex pointer-events-none">
                                <div className="w-1/2 flex items-end justify-end pr-2 md:pr-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Before</span>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-end justify-start pl-2 md:pl-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">After</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 flex-1">
                            <div className="inline-block px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                                Routine Filter & Coil Care
                            </div>
                            <h2 className="text-xl md:text-2xl font-header font-black uppercase tracking-widest text-primary mb-3 drop-shadow-md">
                                {data.hero_basic.title}
                            </h2>
                            <p className="text-slate-400 text-sm mb-5 leading-relaxed font-medium">
                                {data.hero_basic.description}
                            </p>
                            <ul className="space-y-2 mb-6">
                                {data.hero_basic.checklist.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <CheckCircle className="text-primary mt-0.5 shrink-0 size-4" />
                                        <span className="text-slate-300 text-xs sm:text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-6 pb-6 mt-auto">
                            <div className="border-t border-dashed border-slate-700/50 pt-5 flex items-center justify-between">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-header font-black text-white">$175</span>
                                        <span className="text-slate-500 text-xs font-bold uppercase">/ unit</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400">Routine Tune-Up</span>
                                </div>
                                <Link 
                                    href="/contact?service=Mini+Split+Maintenance&notes=Basic+Cleaning+$175" 
                                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5"
                                >
                                    Book Basic <ArrowRight className="size-3.5 text-primary" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Premium Service ($275 - Best Value / Full Teardown) */}
                    <div className="flex-1 bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-cyan-500/40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col relative">
                        <div className="absolute top-3 right-3 z-30 bg-primary text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Most Popular • 100% Mold Purge
                        </div>
                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800 group/image">
                            <Image 
                                src="/assets/minisplitacphotos/mini-split-premium-maintenance-before-after-800x800.png" 
                                alt="Premium Mini Split AC Service Before and After" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                            <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/10 pointer-events-none"></div>
                            <div className="absolute inset-0 flex pointer-events-none">
                                <div className="w-1/2 flex items-end justify-end pr-2 md:pr-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Before</span>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-end justify-start pl-2 md:pl-4">
                                    <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-t-xl border-t border-l border-r border-slate-700/50 flex items-center shadow-xl">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">After</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 flex-1">
                            <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-cyan-500/30">
                                Full Clinical Teardown
                            </div>
                            <h2 className="text-xl md:text-2xl font-header font-black uppercase tracking-widest text-primary mb-3 drop-shadow-md">
                                {data.hero_premium.title}
                            </h2>
                            <p className="text-slate-400 text-sm mb-5 leading-relaxed font-medium">
                                {data.hero_premium.description}
                            </p>
                            <ul className="space-y-2 mb-6">
                                {data.hero_premium.checklist.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <CheckCircle className="text-primary mt-0.5 shrink-0 size-4" />
                                        <span className="text-slate-300 text-xs sm:text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-6 pb-6 mt-auto">
                            <div className="border-t border-dashed border-cyan-500/30 pt-5 flex items-center justify-between">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-header font-black text-cyan-400">$275</span>
                                        <span className="text-slate-400 text-xs font-bold uppercase">/ unit</span>
                                    </div>
                                    <span className="text-[10px] text-cyan-300">Complete Chemical Flush</span>
                                </div>
                                <Link 
                                    href="/contact?service=Mini+Split+Maintenance&notes=Premium+Chemical+Teardown+$275" 
                                    className="px-5 py-2.5 bg-primary hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(0,174,239,0.3)] flex items-center gap-1.5"
                                >
                                    Book Premium <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. INTERACTIVE MULTI-UNIT PRICING CALCULATOR */}
                <section id="calculator" className="mb-20 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Calculator className="size-4" /> Interactive Pricing Calculator
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-wide">
                            Estimate Your <span className="text-cyan-400">Oahu Cleaning Investment</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            Select your preferred service level and number of indoor air handler zones.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Selector Controls */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* Step A: Choose Service Tier */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                                    1. Choose Cleaning Level:
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCalcTier('basic');
                                            trackFunnelEvent('maintenance_tier_toggle', { tier: 'basic', price: 175 });
                                        }}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            calcTier === 'basic'
                                                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-header font-bold text-white text-base">Basic Clean</span>
                                            <span className="text-xs font-mono font-bold text-cyan-400">$175/unit</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">Filter wash, drain flush & coil wipe</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCalcTier('premium');
                                            trackFunnelEvent('maintenance_tier_toggle', { tier: 'premium', price: 275 });
                                        }}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            calcTier === 'premium'
                                                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-header font-bold text-white text-base">Full Teardown</span>
                                            <span className="text-xs font-mono font-bold text-cyan-400">$275/unit</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">Pressurized blower extraction & mold flush</p>
                                    </button>
                                </div>
                            </div>

                            {/* Step B: Choose Number of Units */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                                    2. How Many Indoor Units on Oahu?
                                </label>
                                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                    {[1, 2, 3, 4].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => {
                                                setCalcUnits(num);
                                                trackFunnelEvent('maintenance_units_select', {
                                                    units: num,
                                                    tier: calcTier,
                                                    total: (calcTier === 'basic' ? 175 : 275) * num
                                                });
                                            }}
                                            className={`py-3.5 rounded-xl border font-header font-black text-center transition-all ${
                                                calcUnits === num
                                                    ? 'bg-primary text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,174,239,0.4)]'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="text-lg sm:text-xl">{num} {num === 4 ? '+' : ''}</div>
                                            <div className="text-[10px] uppercase font-bold tracking-tight">
                                                {num === 1 ? 'Unit' : 'Units'}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-400 italic">
                                * Multi-unit appointments serviced in a single scheduled visit across Oahu. Zero water mess guaranteed.
                            </p>
                        </div>

                        {/* Calculation Summary Box */}
                        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                                    Estimated Investment
                                </span>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl sm:text-5xl font-header font-black text-white">
                                        ${totalPrice}
                                    </span>
                                    <span className="text-slate-400 text-xs font-semibold">
                                        ({calcUnits} {calcUnits === 1 ? 'unit' : 'units'} @ ${unitPrice}/ea)
                                    </span>
                                </div>

                                <div className="space-y-2 py-4 border-y border-slate-800 text-xs text-slate-300">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Service Level:</span>
                                        <span className="font-bold text-white">{tierName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Indoor Protection:</span>
                                        <span className="font-bold text-emerald-400">Floor Drop-Cloth Protection (Zero Mess)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Estimated Duration:</span>
                                        <span className="font-bold text-white">
                                            {calcTier === 'premium'
                                                ? (calcUnits === 1 ? '~1.5 Hours (90 mins)' : `~${calcUnits * 1.5} Hours Total`)
                                                : (calcUnits === 1 ? '~1.0 Hour (60 mins)' : `~${calcUnits} Hours Total`)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={`/contact?service=Mini+Split+Maintenance&tier=${encodeURIComponent(tierName)}&units=${calcUnits}&total=$${totalPrice}`}
                                    onClick={() => trackFunnelEvent('maintenance_book_click', {
                                        tier: calcTier,
                                        units: calcUnits,
                                        total: totalPrice,
                                        source: 'calculator'
                                    })}
                                    className="w-full py-3.5 px-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] flex items-center justify-center gap-2"
                                >
                                    Book {calcUnits} {calcUnits === 1 ? 'Unit' : 'Units'} (${totalPrice}) <ArrowRight className="size-4" />
                                </Link>
                                <div className="text-center mt-2.5">
                                    <a
                                        href="tel:808-488-1111"
                                        onClick={() => trackFunnelEvent('click_to_call', { source: 'mini_split_calculator' })}
                                        className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                                    >
                                        Or call (808) 488-1111 to schedule directly
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 2. INTERACTIVE MOLD & AIRFLOW SELF-DIAGNOSTIC CHECKLIST */}
                <section className="mb-20 bg-gradient-to-r from-slate-900/80 via-slate-950 to-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <AlertTriangle className="size-4" /> Indoor Air Quality Check
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-wide">
                            Does Your Mini-Split <span className="text-amber-400">Need Cleaning?</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            Select any symptoms your household is experiencing to get an immediate health & performance diagnosis.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Symptoms Checklist */}
                        <div className="lg:col-span-7 space-y-3">
                            {symptomsList.map((sym) => {
                                const isSelected = selectedSymptoms.includes(sym.id);
                                return (
                                    <div
                                        key={sym.id}
                                        onClick={() => toggleSymptom(sym.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                                            isSelected 
                                                ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className={`mt-0.5 size-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                            isSelected ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-700 bg-slate-950'
                                        }`}>
                                            {isSelected && <Check className="size-3.5 stroke-[3]" />}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white leading-tight">
                                                {sym.label}
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {sym.detail}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Diagnostic Outcome Card */}
                        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                                    System Contamination Analysis
                                </span>
                                
                                {totalSeverity === 0 ? (
                                    <div className="text-emerald-400 font-header font-bold text-xl uppercase mb-3">
                                        Baseline / Normal Airflow
                                    </div>
                                ) : totalSeverity <= 4 ? (
                                    <div className="text-amber-400 font-header font-bold text-xl uppercase mb-3 flex items-center gap-2">
                                        <AlertTriangle className="size-5" /> Moderate Grime & Biofilm
                                    </div>
                                ) : (
                                    <div className="text-rose-400 font-header font-bold text-xl uppercase mb-3 flex items-center gap-2">
                                        <AlertTriangle className="size-5 text-rose-500 animate-pulse" /> Urgent: Heavy Mold Colonization
                                    </div>
                                )}

                                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                    {totalSeverity === 0 
                                        ? "No critical symptoms reported. Maintain scheduled preventative filter wash every 6–12 months to avoid tropical buildup."
                                        : totalSeverity <= 4
                                        ? "Biofilm and salt-air grime are accumulating on your evaporator coils and drain pan. Recommended: Basic $175 clean to prevent severe mold colonies."
                                        : "Your indoor squirrel-cage blower fan and drain channels are heavily colonized with mold spores. Recommended: $275 Full Teardown & Chemical Power Flush to sanitize the air your family breathes."
                                    }
                                </p>

                                <div className="space-y-2 py-3 border-y border-slate-800 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Symptoms Flagged:</span>
                                        <span className="font-bold text-white">{selectedSymptoms.length} of {symptomsList.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Recommended Action:</span>
                                        <span className={`font-bold ${totalSeverity > 4 ? 'text-cyan-400' : 'text-slate-200'}`}>
                                            {totalSeverity > 4 ? 'Clinical Chemical Teardown ($275)' : 'Basic Maintenance ($175)'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={`/contact?service=Mini+Split+Maintenance&notes=${encodeURIComponent(`Diagnostic: ${selectedSymptoms.join(', ')} (Severity: ${totalSeverity})`)}`}
                                    onClick={() => trackFunnelEvent('symptom_diagnosis_book_click', {
                                        symptoms: selectedSymptoms,
                                        severity: totalSeverity,
                                        recommendation: totalSeverity > 4 ? 'teardown' : 'basic'
                                    })}
                                    className="w-full py-3.5 px-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] flex items-center justify-center gap-2"
                                >
                                    Book Recommended Clean <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 2x2 VALUE HIGHLIGHTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {Object.entries(data.sections).map(([key, section]: [string, any]) => {
                        const iconMap: Record<string, React.ComponentType<any>> = {
                            deep_clean: Wrench,
                            energy: Zap,
                            air_quality: Wind,
                            salt_dust: Droplets,
                        };
                        const IconComponent = iconMap[key] || ShieldCheck;

                        return (
                            <div key={key} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col items-center text-center group hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="size-6 text-primary" />
                                </div>
                                <h3 className="text-lg md:text-xl font-header font-black uppercase tracking-widest text-primary mb-3 drop-shadow-md">
                                    {section.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                    {section.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* 4. INTERACTIVE FAQ ACCORDION */}
                <section className="mb-12 max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Got Questions?</span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-wide">
                            Mini Split Cleaning <span className="text-cyan-400">FAQ</span>
                        </h2>
                    </div>

                    <div className="space-y-3.5">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-slate-700"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-white text-base sm:text-lg"
                                    >
                                        <span className="flex items-start gap-2.5">
                                            <span className="text-cyan-400 font-mono text-sm">Q:</span>
                                            {faq.q}
                                        </span>
                                        <ChevronDown className={`size-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`} />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pl-10">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
            <BackToTop visible={true} />
        </div>
    );
}
