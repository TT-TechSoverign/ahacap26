'use client';

import { useState } from 'react';
import { useContent } from '@/lib/context/ContentContext';
import Link from 'next/link';
import Image from 'next/image';
import { BackToTop } from '@/components/BackToTop';
import { 
    Sparkles, 
    Droplets, 
    Clock, 
    Phone, 
    ArrowRight, 
    CheckCircle2, 
    Zap,
    Wind, 
    VolumeX, 
    DollarSign, 
    Shield, 
    Check, 
    X, 
    HelpCircle, 
    ChevronDown, 
    ThermometerSnowflake, 
    ShieldCheck,
    Calendar,
    MapPin,
    Warehouse,
    Info
} from 'lucide-react';

export default function WindowAcMaintenancePage() {
    const { content } = useContent();
    const data = content?.window_ac;

    const [selectedBtu, setSelectedBtu] = useState<string>('10k-12k');
    const [dropoffTiming, setDropoffTiming] = useState<string>('morning');

    if (!data) return null;

    const conversionBenefits = [
        {
            icon: Wind,
            title: "Ice-Cold Airflow Restored",
            stat: "Up to +30% CFM",
            description: "Caked-on dirt, pet hair, and salt crust choke aluminum coil fins, cutting airflow by up to 40%. Our deep pressurized flush frees every fin passage to restore maximum CFM and blast icy-cold air in minutes."
        },
        {
            icon: Sparkles,
            title: "100% Black Mold & Odor Purge",
            stat: "Odor-Free Air",
            description: "Hawaii's 80%+ humidity turns damp blower wheels into breeding grounds for black mold and mildew. We completely extract and sanitize the blower assembly, eliminating musty smells so your family breathes pure, clean air."
        },
        {
            icon: DollarSign,
            title: "Lower Hawaii Electric Bills",
            stat: "~44¢/kWh Savings",
            description: "When coils are blocked, your compressor runs overtime just to cool the room. Restoring heat exchange efficiency reduces compressor workload and slashes wasteful power draw on Oahu's costly electric grid."
        },
        {
            icon: VolumeX,
            title: "Whisper-Quiet Restful Sleep",
            stat: "Zero Rattles",
            description: "Uneven mold and grime buildup unbalances the squirrel-cage blower fan, causing annoying vibrations and motor droning. Thorough descaling restores smooth, quiet rotation for silent nighttime comfort."
        },
        {
            icon: Shield,
            title: "Salt-Air Rust Protection",
            stat: "Extended Lifespan",
            description: "Coastal trade winds deposit corrosive salt spray that eats through aluminum fins and causes expensive refrigerant leaks. Our deep wash neutralizes salt crust and applies an anti-corrosion barrier."
        },
        {
            icon: Droplets,
            title: "Clean Off-Site Warehouse Care",
            stat: "24-48hr Turnaround",
            description: "Never worry about water pooling on your floors or harsh chemical smells lingering in your bedroom. Drop off your unit at our Waipahu facility for a complete, mess-free teardown and test."
        }
    ];

    const comparisonItems = [
        {
            feature: "Reaches Hidden Blower Fan & Wheel",
            diy: false,
            teardown: true,
            detail: "DIY spray only touches the front; 90% of mold lives on the internal blower wheel."
        },
        {
            feature: "Dual-Direction Pressurized Coil Bath",
            diy: false,
            teardown: true,
            detail: "Sprays push grime deeper into coils; teardown flushes dirt out from the reverse side."
        },
        {
            feature: "100% Safe Electrical Isolation",
            diy: false,
            teardown: true,
            detail: "Chassis removal completely isolates circuit boards and motor from moisture."
        },
        {
            feature: "Drain Pan Slime & Mold Flush",
            diy: false,
            teardown: true,
            detail: "Clears algae and biofilm buildup in the bottom pan to prevent indoor overflow leaks."
        },
        {
            feature: "Anti-Corrosion Salt-Air Shield",
            diy: false,
            teardown: true,
            detail: "Applies a protective barrier to neutralize Hawaii's aggressive ocean trade winds."
        },
        {
            feature: "Digital Airflow & Delta-T Performance Test",
            diy: false,
            teardown: true,
            detail: "Digital verification that intake vs. output temps achieve peak 20°F+ cooling split."
        }
    ];

    const faqs = [
        {
            q: "Why does a window AC require a full teardown instead of a quick surface clean?",
            a: "Over 80% of mold, bacteria, and salt crust accumulates inside the dark blower wheel and inner condenser coils—areas completely inaccessible from the outside. Spraying foam from the front merely drives surface grime deeper into the coil fins. Our full teardown extracts the internal chassis to wash the unit from the inside out."
        },
        {
            q: "How do I know if my window AC has black mold inside?",
            a: "If you notice a sour, musty smell when first turning on the AC, see black speckles on the front louvers, or hear weaker airflow despite a clean filter, black mold has almost certainly colonized the blower wheel and drain pan. A professional teardown permanently eliminates these spores."
        },
        {
            q: "How does this service help lower my Hawaiian Electric bill?",
            a: "Oahu electricity is among the most expensive in the nation at ~44¢/kWh. When coils are caked with grime and salt, heat cannot transfer properly, forcing your compressor to run almost continuously. Clearing the coils restores thermodynamic efficiency, allowing the unit to reach your set temperature much faster with lower wattage draw."
        },
        {
            q: "How does the Waipahu warehouse drop-off process work?",
            a: "Give our office a quick call or submit our cleaning form to schedule your drop-off window. Bring your window AC to our Waipahu Distribution Center (94-150 Leoleo St. #203). Our technicians perform a full teardown, deep sanitization, and bench test, with turnaround typically within 24 to 48 hours."
        }
    ];

    return (
        <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
            {/* HERO SECTION */}
            <div className="pt-[140px] md:pt-[165px] lg:pt-[175px] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="text-center mb-12 border-b border-white/5 pb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <ThermometerSnowflake className="size-3.5 text-cyan-400" />
                        Oahu Window AC Deep Teardown • Like-New Restoration
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-header font-black uppercase tracking-widest text-white mb-4">
                        Window AC <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">Deep Cleaning</span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Restore ice-cold airflow, eliminate sour musty odors, and lower your energy bill. Our complete teardown deep clean strips away hidden black mold, clears trade-wind salt crust, and restores whisper-quiet factory performance—making your window AC feel and smell brand new again (subject to initial phone consultation and drop-off scheduling).
                    </p>

                    {/* Pricing & CTA Banner */}
                    <div className="max-w-xl mx-auto bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">Complete Teardown & Sanitization</span>
                            <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                                <span className="text-4xl font-header font-black text-white">$275</span>
                                <span className="text-xs text-slate-400 font-medium">/ unit (Waipahu Drop-off)</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1">Subject to initial phone call & drop-off scheduling</span>
                        </div>
                        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                            <Link 
                                href="/contact?service=Window+AC+Cleaning&notes=Chemical+Teardown+$275"
                                className="px-6 py-3 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-all flex items-center justify-center gap-1.5 text-center"
                            >
                                Schedule Cleaning <ArrowRight className="size-3.5" />
                            </Link>
                            <a 
                                href="tel:808-488-1111"
                                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <Phone className="size-3.5 text-cyan-400" /> (808) 488-1111
                            </a>
                        </div>
                    </div>

                    {/* Micro Benefit Signals */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium pt-2">
                        <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <Wind className="size-3.5 text-cyan-400" /> Ice-Cold Airflow Restored
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <Sparkles className="size-3.5 text-cyan-400" /> 100% Mold & Odor Purge
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <Zap className="size-3.5 text-cyan-400" /> Lower Power Draw
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <Clock className="size-3.5 text-cyan-400" /> 24-48hr Turnaround
                        </span>
                    </div>
                </div>
            </div>

            {/* KEY CONVERSION BENEFITS GRID */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Proven Results</span>
                    <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-wide">
                        Why Oahu Homeowners Choose <span className="text-cyan-400">Full Teardown Cleaning</span>
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 font-light">
                        Surface sprays only wash the outside. Our full teardown restores factory cooling and purges mold colonies from the inside out.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conversionBenefits.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                            <div 
                                key={idx}
                                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                                            <Icon className="size-6" />
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                                            {benefit.stat}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-header font-black tracking-wide text-white uppercase mb-2 group-hover:text-cyan-400 transition-colors">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FULL TEARDOWN VS DIY COMPARISON SECTION */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">The Difference</span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-wide">
                            Full Warehouse Teardown <span className="text-cyan-400">vs.</span> DIY Retail Sprays
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2 font-light">
                            Store-bought cans cannot reach the blower wheel and risk destroying your electronics. Here is why professional teardown is essential:
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs font-header font-black tracking-wider uppercase">
                                    <th className="py-3 px-4 text-slate-300">Restoration Feature</th>
                                    <th className="py-3 px-4 text-rose-400 text-center w-36">DIY Store Spray</th>
                                    <th className="py-3 px-4 text-cyan-400 text-center w-44 bg-cyan-500/5 rounded-t-xl">AHAC Teardown ($275)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                                {comparisonItems.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-white block">{item.feature}</span>
                                            <span className="text-[11px] text-slate-400 font-light hidden sm:block">{item.detail}</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <div className="inline-flex items-center justify-center size-6 rounded-full bg-rose-500/10 text-rose-400">
                                                <X className="size-4" />
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-center bg-cyan-500/5 font-semibold text-cyan-300">
                                            <div className="inline-flex items-center justify-center size-6 rounded-full bg-cyan-500/20 text-cyan-400">
                                                <Check className="size-4" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 text-center">
                        <Link 
                            href="/contact?service=Window+AC+Cleaning&notes=Chemical+Teardown+$275"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-all"
                        >
                            Book Your $275 Teardown Service <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FULL DEEP CLEANING HERO CARD */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex flex-col md:flex-row bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative hover:border-cyan-500/30 transition-all">
                    {/* Left text block */}
                    <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10 shrink-0">
                        <div className="w-12 h-1 bg-cyan-400 mb-6 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
                        <h2 className="text-2xl sm:text-4xl font-header font-black tracking-wide text-white mb-4 uppercase leading-tight">
                            {data.hero.title}
                        </h2>
                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-light">
                            {data.hero.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link 
                                href="/contact?service=Window+AC+Cleaning&notes=Chemical+Teardown+$275" 
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.4)] text-xs"
                            >
                                Book Your Teardown Cleaning
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right image block */}
                    <div className="flex-1 w-full min-h-[300px] md:min-h-[420px] relative overflow-hidden group">
                        <Image 
                            src={data.hero.image}
                            alt={data.hero.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-cover object-[75%_center] transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* INTERACTIVE WAIPAHU DROP-OFF ESTIMATOR */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="bg-gradient-to-r from-slate-900/80 via-slate-950 to-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Clock className="size-4" /> Drop-Off Turnaround Calculator
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-wide">
                            Waipahu Warehouse <span className="text-cyan-400">Drop-Off Readiness</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            Select your window AC capacity to view turnaround estimates and drop-off guidelines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* BTU Selector */}
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                                    Select Your Unit Size / BTU Class:
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { id: '6k-8k', title: '6,000 – 8,000 BTU', desc: 'Small bedroom / studio', weight: '~45 lbs' },
                                        { id: '10k-12k', title: '10,000 – 12,000 BTU', desc: 'Master bedroom / living room', weight: '~65 lbs' },
                                        { id: '14k-18k', title: '14,000 – 18,000 BTU', desc: 'Large open living area', weight: '~85 lbs' },
                                        { id: '24k+', title: '24,000+ BTU Heavy-Duty', desc: 'Commercial / whole floor', weight: '~115 lbs' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setSelectedBtu(opt.id)}
                                            className={`p-4 rounded-xl border text-left transition-all ${
                                                selectedBtu === opt.id
                                                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-header font-bold text-white text-sm">{opt.title}</span>
                                                <span className="text-[10px] font-mono text-cyan-400 font-semibold">{opt.weight}</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400">{opt.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Drop-off guidelines checklist */}
                            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-2.5 text-xs text-slate-300">
                                <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider text-[11px] mb-1">
                                    <Warehouse className="size-4 text-cyan-400" /> Waipahu Drop-Off Instructions
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Bring the complete AC chassis with intact power cord.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Remote controls, exterior mounting brackets, and side accordion curtains are not needed.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="size-4 text-cyan-400 mt-0.5 shrink-0" />
                                    <span>Warehouse Facility: <strong>94-150 Leoleo St. #203, Waipahu, HI 96797</strong> (subject to phone scheduling).</span>
                                </div>
                            </div>
                        </div>

                        {/* Summary & Booking Card */}
                        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                                    Fixed Warehouse Rate
                                </span>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl sm:text-5xl font-header font-black text-white">$275</span>
                                    <span className="text-slate-400 text-xs font-semibold">/ unit flat rate</span>
                                </div>

                                <div className="space-y-2.5 py-4 border-y border-slate-800 text-xs text-slate-300">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Selected Capacity:</span>
                                        <span className="font-bold text-white uppercase">{selectedBtu} BTU</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Standard Turnaround:</span>
                                        <span className="font-bold text-cyan-400">24 – 48 Hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Service Scope:</span>
                                        <span className="font-bold text-emerald-400">Full Teardown & Rust Barrier</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Delta-T Performance Test:</span>
                                        <span className="font-bold text-white">Included Before Pickup</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={`/contact?service=Window+AC+Cleaning&unitSize=${encodeURIComponent(selectedBtu)}&notes=Waipahu+Warehouse+Teardown+$275`}
                                    className="w-full py-3.5 px-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] flex items-center justify-center gap-2"
                                >
                                    Schedule {selectedBtu} Drop-Off ($275) <ArrowRight className="size-4" />
                                </Link>
                                <div className="text-center mt-2.5">
                                    <a href="tel:808-488-1111" className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors">
                                        Or call (808) 488-1111 to coordinate drop-off
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 4-PHASE CLEANING PROCESS */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
                <div className="mb-16 text-center">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Our Method</span>
                    <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-wide">
                        The Chemical Teardown <span className="text-cyan-400">Process</span>
                    </h2>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {data.phases?.map((phase: any, index: number) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div 
                                key={phase.id} 
                                className={`flex flex-col ${!isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 hover:border-cyan-500/30 transition-all`}
                            >
                                {/* Text Container */}
                                <div className="w-full md:w-1/2 space-y-4 relative">
                                    <div className="text-5xl font-sans font-black text-cyan-500/20 select-none">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-header font-black tracking-wide text-white uppercase">
                                        {phase.title}
                                    </h3>
                                    <div className="w-12 h-0.5 bg-cyan-400/60 rounded-full"></div>
                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                                        {phase.description}
                                    </p>
                                </div>

                                {/* Image Container */}
                                <div className="w-full md:w-1/2 relative h-[250px] sm:h-[320px] rounded-2xl overflow-hidden group">
                                    <Image
                                        src={phase.image}
                                        alt={phase.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 500px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl pointer-events-none"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="text-center mb-12">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Got Questions?</span>
                    <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-wide">
                        Window AC Cleaning <span className="text-cyan-400">FAQ</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details 
                            key={idx}
                            className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30"
                        >
                            <summary className="flex items-center justify-between text-left font-header font-black uppercase text-sm sm:text-base text-white tracking-wide cursor-pointer list-none select-none">
                                <span className="flex items-center gap-2.5">
                                    <HelpCircle className="size-4 text-cyan-400 shrink-0" />
                                    {faq.q}
                                </span>
                                <ChevronDown className="size-4 text-slate-400 group-open:rotate-180 group-open:text-cyan-400 transition-transform duration-300 shrink-0 ml-4" />
                            </summary>
                            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light pl-6.5 border-t border-white/5 pt-4">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>

                {/* Final CTA Strip */}
                <div className="mt-14 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-xl sm:text-2xl font-header font-black uppercase tracking-wide text-white mb-2">
                        Ready for Ice-Cold, Odor-Free Air?
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6 font-light">
                        Drop off your window AC at our Waipahu warehouse. Flat rate $275 per unit with fast 24-48hr turnaround.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link 
                            href="/contact?service=Window+AC+Cleaning&notes=Chemical+Teardown+$275"
                            className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-all flex items-center justify-center gap-1.5"
                        >
                            Schedule Drop-Off <ArrowRight className="size-3.5" />
                        </Link>
                        <a 
                            href="tel:808-488-1111"
                            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                        >
                            <Phone className="size-3.5 text-cyan-400" /> Call (808) 488-1111
                        </a>
                    </div>
                </div>
            </div>
            
            <BackToTop visible={true} />
        </div>
    );
}
