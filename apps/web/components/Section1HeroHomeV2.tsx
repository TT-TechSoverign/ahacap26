'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Section1HeroHomeV2() {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* <Image
                    src="/assets/yelpphotos/yelp1.jpg"
                    alt="Expert HVAC Installation by Affordable Home A/C"
                    fill
                    className="object-cover object-center opacity-90"
                    priority
                /> */}
                {/* Fallback BG */}
                <div className="absolute inset-0 bg-slate-800" />

                {/* Primary Dark Blue Overlay with Blend Mode */}
                <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-80" />

                {/* Gradient Overlay for Depth  */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center h-full pt-20">
                <div className="max-w-3xl flex flex-col gap-6">

                    {/* Header */}
                    <h1 className="font-header font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
                        ELITE COOLING <br />
                        <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">PERFORMANCE</span>
                    </h1>

                    {/* Narrative */}
                    <p className="font-sans text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow-md border-l-4 border-cyan-400 pl-6">
                        Experience the gold standard in climate control. From precision window unit expertise to commercial-grade installations, we engineer comfort that masters Oahu's unique micro-climates.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                        <Link
                            href="/shop"
                            className="group relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-white font-header font-black text-xl uppercase tracking-widest py-5 px-10 rounded shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all transform hover:-translate-y-1 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Shop Window AC Units
                                <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </Link>

                        <Link
                            href="/contact"
                            className="group relative overflow-hidden bg-transparent border-2 border-white hover:border-cyan-400 text-white hover:text-cyan-400 font-header font-black text-xl uppercase tracking-widest py-5 px-10 rounded transition-all transform hover:-translate-y-1 backdrop-blur-sm text-center"
                        >
                            <span className="relative z-10">Request A Quote</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
