import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import type { HeroProps } from '@/types/puck';

export function Hero({
    badge,
    titleLine1,
    titleHighlight1,
    titleHighlight2,
    subBadges,
    ctaShop,
    ctaEstimate,
    styles
}: HeroProps) {
    return (
        <section
            className="relative min-h-[60vh] flex items-center overflow-hidden transition-all duration-700"
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background-dark to-background-dark pointer-events-none opacity-50"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                <div className="inline-block px-4 py-2 mb-8 bg-accent/10 border border-accent/20 rounded shadow-[0_0_15px_rgba(57,181,74,0.2)] text-accent text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                    {badge}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-header font-black leading-[1.05] md:leading-[1.1] mb-10 text-white uppercase tracking-tight">
                    {titleLine1} <br />
                    <span className="text-primary neon-glow">{titleHighlight1}</span> <br />
                    <span className="text-primary neon-glow">{titleHighlight2}</span>
                </h1>

                <div className="flex flex-wrap justify-center gap-3 mb-12 lg:gap-4">
                    {(subBadges || []).map((badge, i) => (
                        <div key={i} className={cn(
                            "px-4 py-2 border-l-4 rounded-r shadow-[0_0_30px_rgba(0,174,239,0.1)] text-white font-header font-bold text-base md:text-xl lg:text-2xl uppercase tracking-wide backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300",
                            i === 1 ? "bg-orange-500/10 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.1)]" :
                                i === 2 ? "bg-accent/10 border-accent shadow-[0_0_30px_rgba(57,181,74,0.1)]" :
                                    "bg-primary/10 border-primary"
                        )}>
                            {badge.text}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center items-stretch sm:items-center">
                    <Button size="lg" className="px-10 py-6 lg:py-8 h-auto text-sm lg:text-lg font-black tracking-widest shadow-[0_0_30_rgba(0,174,239,0.3)] hover:shadow-[0_0_50px_rgba(0,174,239,0.5)] transition-all" asChild>
                        <Link href={ctaShop?.href || '#'}>
                            {ctaShop?.text || 'Shop'}
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="px-10 py-6 lg:py-8 h-auto text-sm lg:text-lg font-black tracking-widest border-white/20 hover:bg-white/5 hover:border-white/40 transition-all" asChild>
                        <Link href={ctaEstimate?.href || '#'}>
                            {ctaEstimate?.text || 'Estimate'}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
