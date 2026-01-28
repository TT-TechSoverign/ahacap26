import Link from 'next/link';
import type { PartnershipsProps } from '@/types/puck';

export function Partnerships({
    title,
    titleHighlight,
    narrativeParam,
    brandsWindow,
    brandsMiniSplit,
    brandsCentral,
    styles
}: PartnershipsProps) {
    return (
        <section
            className="bg-charcoal/50 border-y border-white/5 py-24 md:py-32 overflow-hidden relative"
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-white font-header font-black text-4xl md:text-6xl mb-4 tracking-[-.02em] leading-none uppercase">
                        {title}
                    </h2>
                    <h3 className="text-primary font-header font-bold text-lg md:text-2xl uppercase tracking-widest neon-glow drop-shadow-[0_0_20px_rgba(0,174,239,0.5)]">
                        {titleHighlight}
                    </h3>
                </div>

                <div className="relative max-w-4xl mx-auto mb-20 px-4">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                    <p className="text-slate-400 text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em] relative z-10 whitespace-pre-wrap">
                        {narrativeParam}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Window AC */}
                    <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <div className="relative z-10 pb-6 border-b border-white/5 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2 text-primary group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl">ac_unit</span>
                                <h3 className="font-header font-bold text-2xl uppercase tracking-wide">Window AC</h3>
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-primary/30 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-10 flex-1 relative z-10 py-4">
                            {(brandsWindow || []).map((brand, i) => (
                                <Link key={i} href="/contact" className="cursor-pointer transition-all duration-300 transform hover:scale-110 hover:brightness-125">
                                    <span className={`${brand.colorClass} ${brand.fontClass} drop-shadow-xl`}>
                                        {brand.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mini Splits */}
                    <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <div className="relative z-10 pb-6 border-b border-white/5 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2 text-accent group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl">mode_fan</span>
                                <h3 className="font-header font-bold text-2xl uppercase tracking-wide">Mini Splits</h3>
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-accent/30 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-10 items-center justify-items-center flex-1 relative z-10 py-4">
                            {(brandsMiniSplit || []).map((brand, i) => (
                                <Link key={i} href="/contact" className="transition-all duration-300 hover:scale-110 hover:brightness-125">
                                    <span className={`${brand.colorClass} ${brand.fontClass} drop-shadow-xl`}>
                                        {brand.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Central AC */}
                    <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <div className="relative z-10 pb-6 border-b border-white/5 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2 text-primary group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-3xl">hvac</span>
                                <h3 className="font-header font-bold text-2xl uppercase tracking-wide">Central AC</h3>
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-primary/30 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-10 flex-1 relative z-10 py-4">
                            {(brandsCentral || []).map((brand, i) => (
                                <Link key={i} href="/contact" className="cursor-pointer transition-all duration-300 transform hover:scale-110 hover:brightness-125">
                                    <span className={`${brand.colorClass} ${brand.fontClass} drop-shadow-xl`}>
                                        {brand.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
