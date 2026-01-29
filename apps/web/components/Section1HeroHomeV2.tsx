'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EditableText } from './EditableText';

export default function Section1HeroHomeV2() {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/yelpphotos/svg-yelp-photos/section1v2-bg-1600x1000.svg"
                    alt="Expert HVAC Installation by Affordable Home A/C"
                    fill
                    className="object-cover object-center opacity-80"
                    priority
                />

                {/* Primary Dark Blue Overlay with Blend Mode for Seamless Reading */}
                <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-90" />

                {/* Gradient Overlay for Depth and Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/80" />
            </div>

            {/* Content Container - Centered and Mobile Optimized */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full pt-10 text-center">
                <div className="max-w-4xl flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">

                    {/* Header */}
                    <h1 className="font-header font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
                        <EditableText
                            contentKey="home_v2.hero.title_line1"
                            defaultValue="COMFORT FOR"
                        /> <br />
                        <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,174,239,0.5)]">
                            <EditableText
                                contentKey="home_v2.hero.title_highlight"
                                defaultValue="YOUR OHANA"
                            />
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
                                <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
