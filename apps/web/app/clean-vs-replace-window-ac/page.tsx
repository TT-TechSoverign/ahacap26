'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    AlertTriangle, 
    FileText, 
    Check, 
    X, 
    Warehouse, 
    Layers, 
    HelpCircle, 
    ChevronDown, 
    RotateCcw,
    Gauge,
    Flame
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function CleanVsReplacePage() {
    // Interactive Decision State
    const [age, setAge] = useState<string>('3-5');
    const [condition, setCondition] = useState<string>('mold');
    const [techType, setTechType] = useState<string>('standard');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Dynamic Decision Logic
    const isReplaceRecommended = () => {
        if (age === '8+' || age === '5-8') return true;
        if (condition === 'rust' || condition === 'leaking') return true;
        if (techType === 'standard' && age !== 'under-3') return true;
        return false;
    };

    const recommendReplace = isReplaceRecommended();

    const getEstimatedSavings = () => {
        if (techType === 'inverter') return { hecoMonthly: '$42', annualSavings: '$180', recommendation: 'Keep & Maintain' };
        if (age === '8+') return { hecoMonthly: '$98', annualSavings: '$512', recommendation: 'Immediate Replace' };
        if (age === '5-8') return { hecoMonthly: '$86', annualSavings: '$424', recommendation: 'Strong Replace' };
        return { hecoMonthly: '$74', annualSavings: '$310', recommendation: 'Clean or Upgrade' };
    };

    const stats = getEstimatedSavings();

    const faqItems = [
        {
            q: "How do I know if my window AC is worth cleaning or replacing on Oahu?",
            a: "If your unit is under 4 years old, cools well, and the aluminum coils have zero flaking rust, our $275 Waipahu bench immersion teardown restores like-new airflow and completely eradicates black mold. However, if your unit is 5+ years old, has rusted coil fins from salt air, or is an older single-speed 10 SEER model, cleaning is often throwing good money away. Upgrading to an LG Dual Inverter saves up to $424/year on your HECO bill and qualifies for a $45 Hawaii Energy cash rebate."
        },
        {
            q: "How much does a professional window AC deep cleaning cost in Hawaii?",
            a: "Our complete off-site bench teardown is $275 flat rate at our Waipahu warehouse facility. We fully dismantle the chassis, chemically strip and pressure flush the evaporator and condenser coils, sanitize the mold-choked squirrel cage blower wheel, treat against salt-air rust, and bench-test electrical draw before you pick it up. Turnaround is 24 to 48 hours."
        },
        {
            q: "Does Affordable Home AC participate in Hawaii Energy rebates for window ACs?",
            a: "Yes! While our mini split division does not participate in rebates (offering direct honest contractor pricing instead), every qualifying Energy Star LG Dual Inverter window AC purchased from our shop qualifies for a $45 Hawaii Energy cash rebate. We provide our own pre-approved official Hawaii Energy application form PDF with your purchase."
        },
        {
            q: "How much electricity does an LG Dual Inverter save compared to an old window unit?",
            a: "Old single-speed window ACs draw 1,100–1,400 Watts continuously whenever the compressor kicks on. LG Dual Inverters vary motor speed smoothly, dropping to 280–520 Watts once room temperature stabilizes. At HECO's current ~44.2¢/kWh residential tariff, running an LG Dual Inverter 8 hours a night saves Oahu homeowners $32 to $45 every single month—paying for itself in under 18 months."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HowTo",
                "name": "How to Decide Whether to Clean or Replace Your Window AC on Oahu",
                "description": "Step-by-step diagnostic guide to evaluate window air conditioner age, coil condition, mold severity, and HECO electric power consumption to decide between a $275 bench teardown or upgrading to an LG Dual Inverter.",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Check Unit Age",
                        "text": "Identify manufacture date on the unit side badge. Units over 5 years old on Oahu generally exhibit accelerated salt-air corrosion."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Inspect Coil & Blower Wheel Fins",
                        "text": "Shine a flashlight into the blower louvers. If you see black spotted mildew, it can be cleaned. If aluminum fins are crumbling or rusted, replace the unit."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Calculate HECO Power Cost",
                        "text": "Evaluate your monthly electric bill. An older 10 SEER unit consumes ~$86/month in power versus ~$42/month for an LG Dual Inverter."
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqItems.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
            {/* SEO Structured Data Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] md:pt-[150px] pb-24">
                
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-12 relative">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Gauge className="size-3.5 animate-pulse" />
                        Oahu Climate Diagnostic Engine
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Clean vs. Replace: <span className="text-primary">Window AC</span> Decision Matrix
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Don&apos;t waste $275 cleaning an obsolete, rusted power hog—and don&apos;t throw away a salvageable 2-year-old AC. Use our calibrated island calculator to make the financially smart move.
                    </p>
                </div>

                {/* Interactive Diagnostic Calculator */}
                <section className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 mb-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Inputs Column */}
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-xl font-header font-black uppercase tracking-wider text-white flex items-center gap-2.5">
                                <span className="flex items-center justify-center size-7 rounded-lg bg-primary/20 text-primary text-xs font-mono">01</span>
                                Evaluate Your Current Air Conditioner
                            </h2>

                            {/* Criterion 1: Unit Age */}
                            <div className="space-y-2.5">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center justify-between">
                                    <span>Unit Age in Hawaii Salt Air</span>
                                    <span className="text-primary font-bold">{age === 'under-3' ? '< 3 Years' : age === '3-5' ? '3–5 Years' : age === '5-8' ? '5–8 Years' : '8+ Years'}</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { id: 'under-3', label: '< 3 Yrs', sub: 'Like-New' },
                                        { id: '3-5', label: '3–5 Yrs', sub: 'Mid-Life' },
                                        { id: '5-8', label: '5–8 Yrs', sub: 'Aging' },
                                        { id: '8+', label: '8+ Yrs', sub: 'Obsolete' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setAge(opt.id)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                age === opt.id 
                                                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.25)]' 
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="font-header font-bold text-sm sm:text-base">{opt.label}</div>
                                            <div className="text-[10px] text-slate-500 font-mono">{opt.sub}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Criterion 2: Physical Condition */}
                            <div className="space-y-2.5">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center justify-between">
                                    <span>Observed Condition & Symptoms</span>
                                    <span className="text-primary font-bold">
                                        {condition === 'dust' ? 'Dust Only' : condition === 'mold' ? 'Black Mold / Odor' : condition === 'rust' ? 'Corroded / Rusted Fins' : 'Warm Air / Leaking'}
                                    </span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {[
                                        { id: 'dust', label: 'Light Surface Dust / Lint', icon: Wind, desc: 'Coils clear, blower clean, cooling fine' },
                                        { id: 'mold', label: 'Black Mold & Musty Odor', icon: Sparkles, desc: 'Blower wheel caked with black fungus spores' },
                                        { id: 'rust', label: 'Salt Corrosion / Flaking Fins', icon: AlertTriangle, desc: 'Rusted bottom pan, crumbling aluminum coil' },
                                        { id: 'leaking', label: 'Warm Air / Refrigerant Leak', icon: Flame, desc: 'Compressor buzzes, coils freeze or blow warm' },
                                    ].map((opt) => {
                                        const Icon = opt.icon;
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => setCondition(opt.id)}
                                                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                                                    condition === opt.id 
                                                        ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.25)]' 
                                                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                                }`}
                                            >
                                                <Icon className={`size-5 mt-0.5 shrink-0 ${condition === opt.id ? 'text-primary' : 'text-slate-500'}`} />
                                                <div>
                                                    <div className="font-header font-bold text-sm">{opt.label}</div>
                                                    <div className="text-[11px] text-slate-500 leading-snug">{opt.desc}</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Criterion 3: Technology Type */}
                            <div className="space-y-2.5">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center justify-between">
                                    <span>Compressor Technology</span>
                                    <span className="text-primary font-bold">{techType === 'standard' ? 'Old Single-Speed (10 SEER)' : 'Modern Inverter (Dual Inverter)'}</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setTechType('standard')}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            techType === 'standard' 
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.25)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-sm">Standard Single-Speed</div>
                                        <div className="text-[11px] text-slate-500 leading-snug">Cycles loud on/off. Consumes 1,200W constant power.</div>
                                    </button>
                                    <button
                                        onClick={() => setTechType('inverter')}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            techType === 'inverter' 
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(0,174,239,0.25)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-sm">Variable Dual Inverter</div>
                                        <div className="text-[11px] text-slate-500 leading-snug">Modulates smooth 280W–540W. Whisper-quiet 44 dBA.</div>
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Recommendation Verdict Card */}
                        <div className="lg:col-span-5 bg-black/40 border border-white/15 rounded-2xl p-6 lg:p-8 flex flex-col justify-between h-full relative overflow-hidden">
                            <div className="space-y-6">
                                
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Diagnostic Verdict</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase font-black tracking-wider ${
                                        recommendReplace 
                                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                                            : 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400'
                                    }`}>
                                        {recommendReplace ? 'Upgrade Recommended' : 'Clean & Maintain'}
                                    </span>
                                </div>

                                {recommendReplace ? (
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                <RotateCcw className="size-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-header font-black uppercase text-white">Upgrade to LG Dual Inverter</h3>
                                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                    Your unit&apos;s age, coil condition, or energy draw makes a $275 teardown economically unviable. Investing in a brand new LG Dual Inverter ($504–$670) pays for itself quickly.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Estimated HECO Power Savings:</span>
                                                <span className="text-emerald-400 font-mono font-bold text-sm">~{stats.annualSavings}/Year</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Hawaii Energy Cash Rebate:</span>
                                                <span className="text-emerald-400 font-mono font-bold text-sm">$45 Pre-Approved Form</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Sound Reduction:</span>
                                                <span className="text-white font-mono font-bold">Down to 44 dBA (Whisper)</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Salt-Air Shield:</span>
                                                <span className="text-white font-mono font-bold">Gold Fin™ Anti-Corrosion</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <Link
                                                href="/shop#dual_inverter"
                                                onClick={() => trackFunnelEvent('decision_matrix_cta_shop', { choice: 'replace', age, condition })}
                                                className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-header font-black text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,174,239,0.35)] transition-all"
                                            >
                                                Shop In-Stock LG Dual Inverters
                                                <ArrowRight className="size-4" />
                                            </Link>
                                            <a
                                                href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 border border-white/10 transition-all"
                                            >
                                                <FileText className="size-3.5 text-emerald-400" />
                                                Download $45 Rebate Form PDF
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                                <Sparkles className="size-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-header font-black uppercase text-white">Keep & Book $275 Waipahu Teardown</h3>
                                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                    Your unit is structurally sound. Our 24–48hr off-site warehouse immersion flush will eradicate black mold, restore 30% airflow, and extend its island lifespan.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Service Fee:</span>
                                                <span className="text-cyan-400 font-mono font-bold text-sm">$275 Flat Rate</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Facility Location:</span>
                                                <span className="text-white font-mono font-bold">Waipahu Warehouse</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Turnaround Time:</span>
                                                <span className="text-white font-mono font-bold">24–48 Hours</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Mold Eradication:</span>
                                                <span className="text-emerald-400 font-mono font-bold">100% Guaranteed</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <Link
                                                href="/window_ac_maintenance"
                                                onClick={() => trackFunnelEvent('decision_matrix_cta_clean', { choice: 'clean', age, condition })}
                                                className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-header font-black text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all"
                                            >
                                                Book $275 Waipahu Teardown
                                                <ArrowRight className="size-4" />
                                            </Link>
                                            <a
                                                href="tel:8087244328"
                                                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 border border-white/10 transition-all"
                                            >
                                                <Phone className="size-3.5 text-primary" />
                                                Call Warehouse: (808) 724-4328
                                            </a>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </section>

                {/* Head-to-Head Comparison Matrix Table */}
                <section className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Oahu Economics: <span className="text-primary">Old Unit Cleaned</span> vs. <span className="text-emerald-400">New LG Dual Inverter</span>
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">
                            Comparing a 5-year-old cleaned single-speed window AC against a new 14.7+ CEER LG Dual Inverter over a 24-month horizon.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-white/10 rounded-2xl overflow-hidden bg-slate-900/40 text-left text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-white/[0.04] border-b border-white/10 font-mono uppercase text-slate-400 text-[11px] tracking-wider">
                                    <th className="p-4 sm:p-5">Performance Metric</th>
                                    <th className="p-4 sm:p-5 text-slate-300">5+ Yr Old Cleaned AC</th>
                                    <th className="p-4 sm:p-5 text-emerald-400 bg-emerald-500/5 border-l border-r border-emerald-500/20">Brand New LG Dual Inverter</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-sans">
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <DollarSign className="size-4 text-primary" /> Upfront Expense
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-300">$275 (Bench Cleaning)</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        $504 – $670 (Minus $45 Rebate)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <Zap className="size-4 text-yellow-400" /> Continuous Power Draw
                                    </td>
                                    <td className="p-4 sm:p-5 text-red-400 font-mono">1,150W – 1,350W (Full blast)</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-mono font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        280W – 540W (Variable frequency)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <DollarSign className="size-4 text-emerald-400" /> Monthly HECO Power Cost
                                    </td>
                                    <td className="p-4 sm:p-5 text-red-400 font-mono">~$86 / month (8 hrs/night)</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-mono font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        ~$42 / month (Saves $44/mo)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <VolumeX className="size-4 text-cyan-400" /> Nighttime Noise Level
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-300">58 – 64 dBA (Heavy humming)</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        44 dBA (Quieter than a library whisper)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <Shield className="size-4 text-primary" /> Anti-Corrosion Treatment
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-400">Surface aerosol barrier only</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        Factory Gold Fin™ Hydrophilic Coating
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <FileText className="size-4 text-emerald-400" /> Hawaii Energy Rebate
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-500">Not Eligible ($0)</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        $45 Cash Rebate (Pre-Approved AHAC Form)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                                        <Clock className="size-4 text-slate-400" /> Net 2-Year Total Cost
                                    </td>
                                    <td className="p-4 sm:p-5 text-red-400 font-mono font-bold">$2,339 (Cleaning + HECO power)</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 font-mono font-bold bg-emerald-500/5 border-l border-r border-emerald-500/20">
                                        $1,467 (Unit cost + HECO power - Rebate)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Hawaii Energy Rebate Callout */}
                <section className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 mb-20 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase">
                                Pre-Approved Contractor Partner
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                Claim Your $45 Hawaii Energy Rebate
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                                Every qualifying Energy Star LG Dual Inverter window unit comes with our pre-approved official Hawaii Energy application form. Simply fill out your name and HECO account number—we handle the rest.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <a
                                href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
                            >
                                <FileText className="size-4" />
                                Download Form PDF
                            </a>
                            <Link
                                href="/shop#dual_inverter"
                                className="px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                            >
                                View Eligible Models
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Accordion Section */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                            Everything Oahu homeowners need to know before choosing between maintenance or replacement.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="border border-white/10 rounded-2xl bg-slate-900/40 overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm sm:text-base text-white hover:text-primary transition-colors"
                                >
                                    <span>{item.q}</span>
                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-slate-500'}`} />
                                </button>
                                {activeFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final Dual CTA Section */}
                <section className="text-center bg-gradient-to-b from-slate-900/60 to-black border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-header font-black uppercase text-white">
                            Ready to Resolve Your Window AC?
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            Whether you need an off-site $275 teardown in Waipahu or want a brand new whisper-quiet LG Dual Inverter picked up today, Affordable Home AC has you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                            <Link
                                href="/window_ac_maintenance"
                                className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-header font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all"
                            >
                                Book $275 Teardown Service
                                <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href="/shop#dual_inverter"
                                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-header font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,174,239,0.3)] transition-all"
                            >
                                Shop In-Stock Dual Inverters
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <BackToTop />
        </div>
    );
}
