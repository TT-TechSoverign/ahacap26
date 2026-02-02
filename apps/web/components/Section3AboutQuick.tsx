'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EditableText } from './EditableText';
import { useContent } from '../lib/context/ContentContext';
import { ArrowRight } from 'lucide-react';

export default function Section3AboutQuick() {
    const { content } = useContent();

    return (
        <section className="relative py-20 lg:py-32 bg-[#0F172A] overflow-hidden">
            {/* Background Image: Honolulu Skyline */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero-cards/bg-honolulu_skyline.jpg"
                    alt="Honolulu Skyline"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Dark Overlay (80% opacity) */}
                <div className="absolute inset-0 bg-[#0F172A]/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-[#0F172A]/80" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-12 max-w-4xl mx-auto">

                    {/* Header: Centered & Decorated - Scaled to match Section 2 */}
                    <div className="text-center relative px-4">
                        {/* Removed Top Badge per user request */}

                        <h2 className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-header font-black text-white uppercase tracking-tighter leading-none pb-6">
                            {/* Removed "THE" subtitle prefix per user request */}
                            <EditableText contentKey="home_v2.about_quick.title" />
                            <span className="text-primary block md:inline md:ml-3">
                                <EditableText contentKey="home_v2.about_quick.title_highlight" />
                            </span>

                            {/* Cyan Glow Underline - Refined Scale */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] rounded-full"></div>
                        </h2>
                    </div>

                    {/* Image - Scaled Down */}
                    <div className="relative w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900 group max-w-4xl mx-auto">
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <Image
                                src="/assets/hero-cards/videoad-screenshot-van1.png"
                                alt="Historic Service Photo"
                                fill
                                className="object-cover object-center opacity-100 transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Subtle tint */}
                            <div className="absolute inset-0 bg-[#0F172A]/10 pointer-events-none mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Narrative & CTA - Centered */}
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
                        <div className="font-sans text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
                            <EditableText contentKey="home_v2.about_quick.narrative" multiLine />
                        </div>

                        {/* Glassmorphism CTA Button - v2.4 Fix - Inline Style Override */}
                        <Link href="/contact"
                            style={{ backgroundColor: '#22d3ee', color: '#0f172a' }}
                            className="group relative z-20 inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all duration-300 md:w-auto w-full rounded-full hover:bg-white hover:text-slate-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 border border-cyan-300/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                            <span className="relative z-10">CONTACT US</span>
                            <ArrowRight className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1 relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
