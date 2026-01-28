import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import type { WarehouseProps } from '@/types/puck';

export function Warehouse({
    badge,
    title,
    description,
    addressLabel,
    addressValue,
    directionsLabel,
    directionsValue,
    ctaText,
    mapImage,
    styles
}: WarehouseProps) {
    return (
        <section
            id="warehouse-map"
            className="py-16 md:py-32 bg-charcoal border-t border-white/5"
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase">
                            {badge}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-header font-bold text-white mb-6 uppercase tracking-wide">
                        <span className="text-primary neon-glow">
                            {title}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto uppercase tracking-tighter">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {/* Information Stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/30 transition-all duration-500">
                            <div className="bg-primary/20 p-4 rounded-xl text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">location_on</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-wider mb-2">
                                    {addressLabel}
                                </h4>
                                <div className="text-slate-400 leading-relaxed font-medium">
                                    {addressValue}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-accent/30 transition-all duration-500">
                            <div className="bg-accent/20 p-4 rounded-xl text-accent group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">directions</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold uppercase tracking-wider mb-2">
                                    {directionsLabel}
                                </h4>
                                <div className="text-slate-400 leading-relaxed font-medium italic">
                                    {directionsValue}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Hub */}
                    <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl bg-white/5">
                        <Image
                            src={mapImage || "/assets/ahac-shoplocationv2.svg"}
                            alt="Waipahu Shop Location"
                            fill
                            className="object-contain p-4 transition-all duration-1000"
                        />

                        <div className="absolute bottom-8 left-8 right-8 max-w-md mx-auto">
                            <Link
                                href="https://www.google.com/maps/dir/?api=1&destination=Waipahu+Commercial+Center+94-150+Leoleo+St+Waipahu+HI+96797"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <Button className="w-full h-14 bg-white text-background-dark hover:bg-primary hover:text-white uppercase font-black tracking-[0.2em] shadow-2xl transition-all duration-300">
                                    <span className="material-symbols-outlined mr-3">map</span>
                                    {ctaText}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
