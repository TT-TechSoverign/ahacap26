'use client';

import Image from 'next/image';
import { EditableText } from './EditableText';
import { useContent } from '../lib/context/ContentContext';

export default function Section3AboutQuick() {
    const { content } = useContent();

    return (
        <section className="relative py-20 lg:py-32 bg-[#0F172A] overflow-hidden">
            {/* Background Texture/Glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-16 max-w-5xl mx-auto">

                    {/* Header: Centered & Decorated */}
                    <div className="text-center relative">
                        {/* Removed Top Badge per user request */}

                        <h2 className="relative inline-block text-5xl md:text-6xl lg:text-8xl font-header font-bold text-white uppercase tracking-tight leading-none pb-8">
                            {/* Removed "THE" subtitle prefix per user request */}
                            <EditableText contentKey="home_v2.about_quick.title" />
                            <span className="text-primary block md:inline md:ml-4">
                                <EditableText contentKey="home_v2.about_quick.title_highlight" />
                            </span>

                            {/* Cyan Glow Underline */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] rounded-full"></div>
                        </h2>
                    </div>

                    {/* Image - Embedded & Wide with Lighter Overlay */}
                    <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <Image
                                src="/assets/hero-cards/videoad-screenshot-van1.png"
                                alt="Historic Service Photo"
                                fill
                                className="object-cover object-center opacity-100 transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Extremely subtle tint for better text contrast if overlaying things, or just unification. 
                                User asked for "less is more", "subtle blend". */}
                            <div className="absolute inset-0 bg-[#0F172A]/20 pointer-events-none mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Narrative & Stats - Split Bottom */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                        <div className="md:col-span-2 prose prose-lg prose-invert font-sans leading-relaxed">
                            {/* Professional Web Formatting: Serif-like elegance or sturdy styling */}
                            <p className="text-xl md:text-2xl font-light text-slate-200 tracking-wide">
                                <span className="font-semibold text-white">
                                    <EditableText contentKey="home_v2.about_quick.narrative" />
                                </span>
                            </p>
                        </div>

                        {/* Stats - Grid on Mobile, Vertical Stack on Desktop - Cleaned up spacing */}
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 w-full md:w-auto">
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-4xl md:text-5xl font-black text-white font-header tracking-tighter">
                                    <EditableText contentKey="home_v2.about_quick.stat1_value" />
                                </span>
                                <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mt-2">
                                    <EditableText contentKey="home_v2.about_quick.stat1_label" />
                                </span>
                            </div>
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-4xl md:text-5xl font-black text-white font-header tracking-tighter">
                                    <EditableText contentKey="home_v2.about_quick.stat2_value" />
                                </span>
                                <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mt-2">
                                    <EditableText contentKey="home_v2.about_quick.stat2_label" />
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
