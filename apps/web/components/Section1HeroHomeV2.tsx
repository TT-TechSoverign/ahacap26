'use client';

import Link from 'next/link';
import { EditableText } from './EditableText';
import { ArrowRight } from 'lucide-react';

export default function Section1HeroHomeV2() {
    return (
        <section className="relative w-full h-[650px] min-h-[500px] flex items-center justify-center overflow-hidden bg-transparent">
            {/* Readability Overlay over global background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/70 pointer-events-none" />

            {/* Content Container - Centered and Mobile Optimized */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full pt-10 text-center">
                <div className="max-w-4xl flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                    {/* Header */}
                    <h1 className="font-header font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
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
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] rounded-full" />
                        </span>
                    </h1>

                    {/* Narrative */}
                    <div className="font-sans text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow-md mx-auto">
                        <EditableText
                            contentKey="home_v2.hero.narrative"
                            as="p"
                            multiLine={true}
                            defaultValue="Building comfort for our community, one project at a time. Whether you're a homeowner, realtor, or contractor, we master the dynamics of residential and commercial cooling—from HOA-compliant upgrades to new construction—so you can focus on what matters most."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center items-center">
                        <Link
                            href="/shop"
                            className="w-full sm:w-auto group relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-white font-header font-black text-xl uppercase tracking-widest py-5 px-10 rounded shadow-[0_10px_30px_rgba(0,174,239,0.4)] transition-all transform hover:-translate-y-1 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <EditableText contentKey="home_v2.hero.cta_shop" defaultValue="Shop Window AC Units" />
                                <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="/contact"
                            className="w-full sm:w-auto group relative overflow-hidden bg-transparent border-2 border-white hover:border-cyan-400 text-white hover:text-cyan-400 font-header font-black text-xl uppercase tracking-widest py-5 px-10 rounded transition-all transform hover:-translate-y-1 backdrop-blur-sm text-center"
                        >
                            <span className="relative z-10">
                                <EditableText contentKey="home_v2.hero.cta_quote" defaultValue="Request A Quote" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
