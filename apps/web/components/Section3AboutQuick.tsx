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

                    {/* Narrative & Stats - Compact Split */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-4xl mx-auto">
                        <div className="md:col-span-2 prose prose-invert font-sans leading-relaxed">
                            {/* Matched Section 2 Scale: text-lg md:text-xl */}
                            <p className="text-lg md:text-xl font-medium text-slate-300 tracking-normal text-center md:text-left">
                                <span className="text-slate-100">
                                    <EditableText contentKey="home_v2.about_quick.narrative" />
                                </span>
                            </p>
                        </div>

                        {/* Stats - Compact */}
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 w-full md:w-auto">
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-3xl md:text-4xl font-black text-white font-header tracking-tight">
                                    <EditableText contentKey="home_v2.about_quick.stat1_value" />
                                </span>
                                <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-widest mt-1">
                                    <EditableText contentKey="home_v2.about_quick.stat1_label" />
                                </span>
                            </div>
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-3xl md:text-4xl font-black text-white font-header tracking-tight">
                                    <EditableText contentKey="home_v2.about_quick.stat2_value" />
                                </span>
                                <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-widest mt-1">
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
