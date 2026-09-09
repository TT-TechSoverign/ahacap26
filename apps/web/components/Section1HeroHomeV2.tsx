'use client';

import Link from 'next/link';
import { EditableText } from './EditableText';
import { ArrowRight } from 'lucide-react';

export default function Section1HeroHomeV2() {
    return (
        <section className="relative w-full min-h-[520px] md:h-[650px] flex items-center justify-center bg-transparent py-8 md:py-0">
            {/* Readability Overlay over global background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/70 pointer-events-none" />

            {/* Content Container - Centered and Mobile Optimized */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-full text-center">
                <div className="max-w-4xl flex flex-col items-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                    {/* Header */}
                    <h1 className="font-header font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] md:leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
                        <EditableText
                            contentKey="home_v2.hero.title_line1"
                            defaultValue="COMFORT FOR"
                        /> <br />
                        <span className="relative inline-block text-cyan-400 drop-shadow-[0_0_25px_rgba(0,174,239,0.5)]">
                            <EditableText
                                contentKey="home_v2.hero.title_highlight"
                                defaultValue="YOUR OHANA"
                            />
                            {/* Glow Underline */}
                            <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] rounded-full" />
                        </span>
                    </h1>

                    {/* Narrative */}
                    <div className="font-sans text-base sm:text-lg md:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow-md mx-auto px-2">
                        <EditableText
                            contentKey="home_v2.hero.narrative"
                            as="p"
                            multiLine={true}
                            defaultValue="Building comfort for our community, one project at a time. Whether you're a homeowner, realtor, or contractor, we master the dynamics of residential and commercial cooling—from HOA-compliant upgrades to new construction—so you can focus on what matters most."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-6 w-full sm:w-auto justify-center items-center">
                        <Link
                            href="/shop"
                            className="w-full sm:w-auto group relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-white font-header font-black text-base sm:text-xl uppercase tracking-widest py-3.5 px-6 sm:py-5 sm:px-10 rounded shadow-[0_10px_30px_rgba(0,174,239,0.4)] transition-all transform hover:-translate-y-1 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <EditableText contentKey="home_v2.hero.cta_shop" defaultValue="Shop Window AC Units" />
                                <ArrowRight className="size-5 sm:size-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="/contact"
                            className="w-full sm:w-auto group relative overflow-hidden bg-transparent border-2 border-white hover:border-cyan-400 text-white hover:text-cyan-400 font-header font-black text-base sm:text-xl uppercase tracking-widest py-3.5 px-6 sm:py-5 sm:px-10 rounded transition-all transform hover:-translate-y-1 backdrop-blur-sm text-center"
                        >
                            <span className="relative z-10">
                                <EditableText contentKey="home_v2.hero.cta_quote" defaultValue="Request A Quote" />
                            </span>
                        </Link>
                    </div>

                    {/* Free In-Home Estimates ($0 to Book) Trust Badge */}
                    <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-slate-900/90 border border-cyan-500/30 rounded-2xl backdrop-blur-md shadow-lg mt-2 sm:mt-4 text-center">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Free In-Home Estimates ($0 to Book) • New &amp; Replacement Installations
                        </div>
                        <span className="hidden sm:inline text-slate-500">•</span>
                        <span className="text-slate-300 text-[11px] sm:text-xs font-sans">
                            Direct Dispatch: <a href="tel:808-488-1111" className="text-cyan-300 font-bold hover:underline">(808) 488-1111</a>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
