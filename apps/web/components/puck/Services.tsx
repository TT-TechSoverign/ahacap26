import { cn } from '@/lib/utils';
import { Snowflake, Store, Wind, Brush, ArrowRight, AlertTriangle } from 'lucide-react';

const LucideIconMap: Record<string, React.ComponentType<any>> = {
    ac_unit: Snowflake,
    storefront: Store,
    hvac: Wind,
    cleaning_services: Brush,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = LucideIconMap[name];
    if (!IconComponent) {
        console.warn(`Icon ${name} not found in LucideIconMap`);
        return <AlertTriangle className={className} />;
    }
    return <IconComponent className={className} />;
}
import Link from 'next/link';
import type { ServicesGridProps } from '@/types/puck';

export function Services({
    title,
    titleHighlight,
    backlinks,
    items,
    mode = 'dark',
    styles
}: ServicesGridProps) {
    const isLight = mode === 'light';

    return (
        <section
            className={cn(
                "py-12 md:py-16 lg:py-24 border-y relative overflow-hidden transition-colors duration-500",
                isLight ? "bg-slate-50 border-slate-200" : "bg-charcoal/30 border-white/5"
            )}
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className={cn(
                "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l pointer-events-none",
                isLight ? "from-primary/5 to-transparent" : "from-primary/5 to-transparent"
            )}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 gap-8 text-center lg:mb-24">
                    <div className="max-w-4xl">
                        <h2 className={cn(
                            "mb-6 md:mb-10 font-header font-black uppercase tracking-[-.02em] leading-none text-4xl md:text-6xl",
                            isLight ? "text-slate-900" : "text-white"
                        )}>
                            {title} <br />
                            <span className="text-primary neon-glow inline-block">{titleHighlight}</span>
                        </h2>
                        <div className="relative px-4">
                            <div className={cn(
                                "absolute -left-4 top-0 w-1 h-full bg-gradient-to-b",
                                isLight ? "from-primary/50 to-transparent" : "from-primary/50 to-transparent"
                            )}></div>
                            <div className={cn(
                                "text-sm md:text-base leading-loose tracking-wide font-medium text-center md:text-justify uppercase [word-spacing:0.2em] max-w-4xl mx-auto",
                                isLight ? "text-slate-600" : "text-slate-400"
                            )}>
                                {(backlinks || []).map((link, i) => (
                                    <span key={i}>
                                        {link.href ? (
                                            <Link href={link.href} className="text-primary hover:text-primary/70 transition-colors underline decoration-primary/30 underline-offset-4 mx-1">
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
                                "relative group flex flex-col items-center text-center gap-8 h-full p-8 overflow-hidden rounded-2xl border transition-all duration-700 industrial-card lg:p-10",
                                isLight
                                    ? "bg-white border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
                                    : "bg-white/[0.02] backdrop-blur-sm border-white/5",
                                item.color === 'primary'
                                    ? (isLight ? "hover:border-primary/30" : "border-primary/10 hover:border-primary/40 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)]")
                                    : (isLight ? "hover:border-accent/30" : "border-accent/10 hover:border-accent/40 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)]")
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
                                    <DynamicIcon name={item.icon || 'ac_unit'} className={cn(
                                        "size-12",
                                        item.color === 'primary'
                                            ? (isLight ? "drop-shadow-sm" : "drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]")
                                            : (isLight ? "drop-shadow-sm" : "drop-shadow-[0_0_10px_rgba(57,181,74,0.5)]")
                                    )} />
                                </div>

                                <div className="flex-1 flex flex-col items-center">
                                    <h3 className={cn(
                                        "text-xl font-header font-bold mb-3 uppercase tracking-wide transition-colors",
                                        isLight ? "text-slate-900" : "text-white",
                                        item.color === 'primary' ? "group-hover:text-primary" : "group-hover:text-accent"
                                    )}>
                                        {item.title}
                                    </h3>
                                    <p className={cn(
                                        "text-sm leading-relaxed mb-6 flex-1 italic max-w-[280px] md:max-w-none",
                                        isLight ? "text-slate-500" : "text-slate-400"
                                    )}>
                                        {item.description}
                                    </p>
                                    <div className={cn(
                                        "flex items-center justify-center gap-2 text-[10px] font-black tracking-widest group-hover:gap-4 transition-all uppercase border-t pt-4 w-full",
                                        isLight ? "border-slate-100" : "border-white/5",
                                        item.color === 'primary' ? "text-primary" : "text-accent"
                                    )}>
                                        {item.linkText} <ArrowRight className="size-3.5" />
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
