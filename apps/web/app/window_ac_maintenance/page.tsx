'use client';

import { useContent } from '@/lib/context/ContentContext';

export default function WindowAcMaintenancePage() {
    const { content } = useContent();
    const data = content?.window_ac;

    if (!data) return null;

    return (
        <div className="bg-background-dark min-h-screen text-white font-sans">
            {/* Page Header */}
            <div className="pt-[140px] md:pt-[180px] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="text-center mb-10 border-b border-white/5 pb-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-header font-black uppercase tracking-widest text-white mb-2 neon-glow">
                        Window AC <span className="text-primary">Cleaning</span>
                    </h1>
                </div>
            </div>

            {/* Task 1: Full Deep Cleaning Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex flex-col md:flex-row bg-[#0F172A] border border-slate-800 rounded-sm overflow-hidden shadow-2xl relative">
                    {/* Left text block */}
                    <div className="flex-1 p-8 md:p-14 lg:p-20 flex flex-col justify-center relative z-10">
                        <div className="w-12 h-1 bg-[#00E5FF] mb-6"></div>
                        <h2 className="text-3xl md:text-5xl font-header font-black tracking-widest text-white mb-6 uppercase leading-tight drop-shadow-sm">
                            {data.hero.title}
                        </h2>
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg font-light">
                            {data.hero.description}
                        </p>
                    </div>
                    
                    {/* Right image block */}
                    <div className="flex-1 w-full min-h-[350px] md:min-h-full relative overflow-hidden group">
                        {/* Fake placeholder data logic: since the JSON doesn't map to real placehold.co images easily locally, hardcoding realistic unpkg paths or placehold via absolute URL */}
                        <img 
                            src="https://placehold.co/800x800/1e293b/00e5ff?text=Hero+Before+After+800x800"
                            alt={data.hero.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Corner overlay detail to match industrial vibe */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-background-dark/80 to-transparent z-10 hidden md:block"></div>
                    </div>
                </div>
            </div>

            {/* Task 2: 4-Phase Scaffolding Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="mb-16 text-center">
                    <h2 className="text-xl md:text-2xl font-header font-medium tracking-[0.3em] text-slate-400 uppercase">
                        The Cleaning Process
                    </h2>
                </div>

                <div className="space-y-12 md:space-y-32">
                    {data.phases?.map((phase: any, index: number) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={phase.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}>
                                
                                {/* Image Container */}
                                <div className="flex-1 w-full relative h-[300px] md:h-[500px] group">
                                    <img
                                        src={`https://placehold.co/1200x800/1e293b/cbd5e1?text=Phase+${index + 1}+Process+1200x800`}
                                        alt={phase.title}
                                        className="w-full h-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                </div>

                                {/* Text Container */}
                                <div className="flex-1 space-y-6 relative">
                                    <div className="absolute -left-4 -top-8 text-7xl font-sans font-black text-slate-800/20 select-none hidden md:block">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-header font-bold tracking-widest text-[#00E5FF] uppercase relative z-10">
                                        {phase.title}
                                    </h3>
                                    <div className="w-16 h-px bg-[#00E5FF]/40"></div>
                                    <p className="text-slate-300 text-lg leading-relaxed relative z-10 font-light">
                                        {phase.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </div>
    );
}
