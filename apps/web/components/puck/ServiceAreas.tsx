import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ServiceAreasProps } from '@/types/puck';

export function ServiceAreas({
    badge,
    title,
    titleHighlight,
    description,
    regions,
    styles
}: ServiceAreasProps) {
    return (
        <section
            id="service-areas"
            className="py-16 md:py-24 bg-background-dark border-t border-white/5 relative overflow-hidden"
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className="absolute inset-0 bg-[#0f172a] opacity-50"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-block mb-8">
                    <span className="py-3 px-8 rounded-full bg-primary/10 border border-primary text-primary text-xl font-header font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(0,174,239,0.2)]">
                        {badge}
                    </span>
                </div>
                <h2 className="mb-6 md:mb-10 font-header font-black text-white uppercase tracking-[-.02em] leading-none text-4xl md:text-6xl">
                    {title} <br />
                    <span className="text-primary neon-glow inline-block">{titleHighlight}</span>
                </h2>
                <div className="relative max-w-4xl mx-auto mb-16 px-4">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                    <div className="text-slate-400 text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em]">
                        {description}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {(regions || []).map((region, rIndex) => (
                        <div
                            key={region.id || rIndex}
                            className={cn(
                                "industrial-card p-6 md:p-8 border-y border-r border-white/5 rounded-r-lg flex flex-col gap-6 relative overflow-hidden group transition-all duration-500 bg-white/[0.02]",
                                region.id === 'central' || region.id === 'leeward'
                                    ? "border-l-4 border-l-primary/50 hover:border-l-primary hover:shadow-[0_0_40px_-10px_rgba(0,174,239,0.2)]"
                                    : "border-l-4 border-l-accent/50 hover:border-l-accent hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                region.id === 'central' || region.id === 'leeward'
                                    ? "bg-gradient-to-br from-primary/5 via-transparent to-transparent"
                                    : "bg-gradient-to-br from-accent/5 via-transparent to-transparent"
                            )}></div>

                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className={cn(
                                    "mb-8 flex items-center justify-center gap-4 transition-transform duration-500 group-hover:scale-105",
                                    region.id === 'central' || region.id === 'leeward' ? "text-primary" : "text-accent"
                                )}>
                                    <span className={cn(
                                        "material-symbols-outlined text-4xl",
                                        region.id === 'central' || region.id === 'leeward' ? "drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]" : "drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    )}>{region.icon}</span>
                                    <h3 className="text-2xl font-header font-black text-white uppercase tracking-wider transition-colors">
                                        {region.title}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5 justify-center w-full max-w-2xl mx-auto">
                                    {(region.cities || []).map((city, cIndex: number) => (
                                        <Link
                                            key={cIndex}
                                            href="/contact"
                                            className={cn(
                                                "inline-flex items-center justify-center text-center px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-slate-300 font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110",
                                                region.id === 'central' || region.id === 'leeward'
                                                    ? "hover:bg-primary hover:border-primary hover:text-black hover:shadow-[0_0_15px_rgba(0,174,239,0.4)]"
                                                    : "hover:bg-accent hover:border-accent hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                            )}
                                        >
                                            {city.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
