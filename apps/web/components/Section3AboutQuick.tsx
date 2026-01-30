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
                <div className="flex flex-col gap-12 max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-sm">history_edu</span>
                            <EditableText contentKey="home_v2.about_quick.badge" />
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-header font-bold text-white uppercase tracking-tight leading-none">
                            <span className="block text-slate-400 opacity-60 text-2xl md:text-3xl mb-2 tracking-widest font-sans font-black">
                                <EditableText contentKey="home_v2.about_quick.subtitle_prefix" />
                            </span>
                            <EditableText contentKey="home_v2.about_quick.title" />
                            <span className="text-primary block md:inline md:ml-4">
                                <EditableText contentKey="home_v2.about_quick.title_highlight" />
                            </span>
                        </h2>
                    </div>

                    {/* Image - Embedded & Wide */}
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <Image
                                src="/assets/hero-cards/videoad-screenshot-van1.png"
                                alt="Historic Service Photo"
                                fill
                                className="object-cover object-center opacity-80 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Subtle Gradient Overlay for integration */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/20 opacity-80 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Narrative & Stats - Split Bottom */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                        <div className="md:col-span-2 prose prose-lg prose-invert text-slate-300 font-sans leading-relaxed opacity-90">
                            <p className="text-base md:text-lg lg:text-xl font-light tracking-wide">
                                <EditableText contentKey="home_v2.about_quick.narrative" />
                            </p>
                        </div>

                        {/* Stats - Grid on Mobile, Vertical Stack on Desktop */}
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-6 md:gap-10 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10 w-full md:w-auto">
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-3xl md:text-4xl font-black text-white font-header tracking-tight">
                                    <EditableText contentKey="home_v2.about_quick.stat1_value" />
                                </span>
                                <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest mt-1">
                                    <EditableText contentKey="home_v2.about_quick.stat1_label" />
                                </span>
                            </div>
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-3xl md:text-4xl font-black text-white font-header tracking-tight">
                                    <EditableText contentKey="home_v2.about_quick.stat2_value" />
                                </span>
                                <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest mt-1">
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
