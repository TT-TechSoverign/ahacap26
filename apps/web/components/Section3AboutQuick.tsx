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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Content */}
                    <div className="order-2 lg:order-1 flex flex-col gap-6 lg:gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-sm">history_edu</span>
                                <EditableText contentKey="home_v2.about_quick.badge" />
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-header font-bold text-white uppercase tracking-tight leading-none mb-6">
                                <span className="block text-slate-400 opacity-60 text-2xl md:text-3xl mb-2 tracking-widest font-sans font-black">
                                    <EditableText contentKey="home_v2.about_quick.subtitle_prefix" />
                                </span>
                                <EditableText contentKey="home_v2.about_quick.title" />
                                <span className="text-primary block mt-2">
                                    <EditableText contentKey="home_v2.about_quick.title_highlight" />
                                </span>
                            </h2>
                        </div>

                        <div className="prose prose-lg prose-invert text-slate-300 font-sans leading-relaxed opacity-90">
                            <p className="text-sm md:text-base lg:text-lg font-light tracking-wide">
                                <EditableText contentKey="home_v2.about_quick.narrative" />
                            </p>
                        </div>

                        {/* Stats / Credentials Grid */}
                        <div className="grid grid-cols-2 gap-6 mt-4 pt-6 border-t border-white/10">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white font-header tracking-tight">
                                    <EditableText contentKey="home_v2.about_quick.stat1_value" />
                                </span>
                                <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest mt-1">
                                    <EditableText contentKey="home_v2.about_quick.stat1_label" />
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white font-header tracking-tight">
                                    <EditableText contentKey="home_v2.about_quick.stat2_value" />
                                </span>
                                <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest mt-1">
                                    <EditableText contentKey="home_v2.about_quick.stat2_label" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
                            {/* Placeholder generic image or use content key if we want to make it editable later, 
                                but hardcoding a nice placeholder for now until user puts in real image */}
                            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600 font-mono text-xs uppercase tracking-widest">
                                {/* <span className="z-10 bg-black/50 p-4 rounded backdrop-blur">
                                    [ <EditableText contentKey="home_v2.about_quick.image_alt" /> ]
                                </span> */}
                                <Image
                                    src="/assets/hero-cards/videoad-screenshot-van1.png"
                                    alt="Historic Service Photo"
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent mix-blend-multiply"></div>
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
