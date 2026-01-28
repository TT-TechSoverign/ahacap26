import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ServicesGridProps } from '@/types/puck';

export function Services({
    title,
    titleHighlight,
    backlinks,
    items,
    styles
}: ServicesGridProps) {
    return (
        <section
            className="py-12 md:py-16 lg:py-24 bg-charcoal/30 border-y border-white/5 relative overflow-hidden"
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 gap-8 text-center lg:mb-24">
                    <div className="max-w-4xl">
                        <h2 className="mb-6 md:mb-10 font-header font-black text-white uppercase tracking-[-.02em] leading-none text-4xl md:text-6xl">
                            {title} <br />
                            <span className="text-primary neon-glow inline-block">{titleHighlight}</span>
                        </h2>
                        <div className="relative px-4">
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                            <div className="text-slate-400 text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em] max-w-4xl mx-auto">
                                {(backlinks || []).map((link, i) => (
                                    <span key={i}>
                                        {link.href ? (
                                            <Link href={link.href} className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4 mx-1">
                                                {link.text}
                                            </Link>
                                        ) : (
                                            link.text
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto w-full px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr md:gap-8">
                    {(items || []).map((item, index) => (
                        <div key={index} className="relative h-full">
                            <div className={cn(
                                "relative group flex flex-col items-center text-center gap-8 h-full p-8 overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-700 industrial-card lg:p-10",
                                item.color === 'primary'
                                    ? "border-primary/10 hover:border-primary/40 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)]"
                                    : "border-accent/10 hover:border-accent/40 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)]"
                            )}>
                                <Link href={item.href} className="absolute inset-0 z-10" aria-label={item.title}>
                                    <span className="sr-only">{item.title}</span>
                                </Link>

                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                                    item.color === 'primary'
                                        ? "bg-[radial-gradient(circle_at_50%_0%,rgba(0,174,239,0.1),transparent_70%)]"
                                        : "bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_70%)]"
                                )}></div>

                                {item.badge && (
                                    <div className="absolute top-4 right-4 bg-primary/20 border border-primary/50 text-table-primary text-[9px] font-black px-3 py-1 rounded shadow-[0_0_10px_rgba(0,174,239,0.2)] tracking-[0.2em] uppercase">
                                        {item.badge}
                                    </div>
                                )}

                                <div className={cn(
                                    "transition-transform duration-500 group-hover:scale-110",
                                    item.color === 'primary' ? "text-primary" : "text-accent"
                                )}>
                                    <span className={cn(
                                        "material-symbols-outlined text-4xl lg:text-5xl",
                                        item.color === 'primary' ? "drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]" : "drop-shadow-[0_0_10px_rgba(57,181,74,0.5)]"
                                    )}>{item.icon}</span>
                                </div>

                                <div className="flex-1 flex flex-col items-center">
                                    <h3 className={cn(
                                        "text-xl font-header font-bold text-white mb-3 uppercase tracking-wide transition-colors",
                                        item.color === 'primary' ? "group-hover:text-primary" : "group-hover:text-accent"
                                    )}>
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 italic max-w-[280px] md:max-w-none">
                                        {item.description}
                                    </p>
                                    <div className={cn(
                                        "flex items-center justify-center gap-2 text-[10px] font-black tracking-widest group-hover:gap-4 transition-all uppercase border-t border-white/5 pt-4 w-full",
                                        item.color === 'primary' ? "text-primary" : "text-accent"
                                    )}>
                                        {item.linkText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
