'use client';

import { useContent } from '@/lib/context/ContentContext';
import Link from 'next/link';
import Image from 'next/image';
import { BackToTop } from '@/components/BackToTop';
import { 
    Sparkles, 
    Droplets, 
    ShieldCheck, 
    Wrench, 
    Clock, 
    Phone, 
    ArrowRight, 
    CheckCircle2, 
    Zap 
} from 'lucide-react';

export default function WindowAcMaintenancePage() {
    const { content } = useContent();
    const data = content?.window_ac;

    if (!data) return null;

    return (
        <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
            {/* HERO SECTION */}
            <div className="pt-[140px] md:pt-[165px] lg:pt-[175px] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="text-center mb-12 border-b border-white/5 pb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <Droplets className="size-3.5 text-cyan-400" />
                        Oahu Chemical Teardown & Mold Sanitization
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-header font-black uppercase tracking-widest text-white mb-4">
                        Window AC <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">Deep Cleaning</span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Restore factory airflow and eliminate musty salt-air odors. Our EPA-certified chemical immersion dissolves corrosive salt spray and toxic black mold.
                    </p>

                    {/* Pricing & CTA Banner */}
                    <div className="max-w-xl mx-auto bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">Flat Rate Service</span>
                            <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                                <span className="text-4xl font-header font-black text-white">$149</span>
                                <span className="text-xs text-slate-400 font-medium">/ unit (Drop-off)</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1">Optional $50 Island-Wide Roundtrip Pickup</span>
                        </div>
                        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                            <Link 
                                href="/contact?service=Window+AC+Cleaning&notes=Chemical+Teardown+$149"
                                className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-1.5 text-center"
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

                    {/* Micro Trust Signals */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium pt-2">
                        <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-cyan-400" /> CT-36775 Licensed & Insured</span>
                        <span className="flex items-center gap-1.5"><Zap className="size-4 text-cyan-400" /> Rust Inhibitor Coating</span>
                        <span className="flex items-center gap-1.5"><Clock className="size-4 text-cyan-400" /> 24-48hr Turnaround</span>
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
                                href="/contact?service=Window+AC+Cleaning" 
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-header tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] text-xs"
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

            {/* 4-PHASE CLEANING PROCESS */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
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
            
            <BackToTop visible={true} />
        </div>
    );
}
