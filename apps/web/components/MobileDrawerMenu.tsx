'use client';

import Link from 'next/link';
import { useContent } from '../lib/context/ContentContext';
import { X, Phone, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileDrawerMenu({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const { content } = useContent();
    const links = content?.navigation?.links || [];

    const regions = content?.landing_legacy?.service_areas?.regions || [];
    const dynamicCities: string[] = [];
    regions.forEach((region: any) => {
        if (region.cities) {
            region.cities.forEach((city: any) => {
                dynamicCities.push(city.name);
            });
        }
    });

    const serviceAreas = dynamicCities.length > 0 ? dynamicCities : [
        'Aiea', 'Pearl City', 'Mililani', 'Waipio Gentry', 'Waikele',
        'Honolulu', 'Kalihi', 'Manoa', 'Kaimuki', 'Hawaii Kai', 
        'Salt Lake', 'Aina Haina', 'Kahala', 'McCully', 'Makiki',
        'Kapolei', 'Ewa Beach', 'Waipahu', 'Kunia',
        'Kailua', 'Kaneohe', 'Kahaluu'
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden h-[100dvh] transition-opacity duration-300 ease-in-out",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 w-[85vw] max-w-sm bg-slate-900 border-l border-slate-800 z-[60] h-[100dvh] md:hidden overflow-y-auto flex flex-col shadow-2xl transition-transform duration-300 ease-out transform",
                    isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
                )}
            >
                <div className="flex justify-end p-4 border-b border-white/5 pt-[max(env(safe-area-inset-top,1rem),1rem)]">
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-2">
                        <X className="size-8" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col p-6 gap-8">
                    {/* Main Navigation */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Navigation</h3>
                        {links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-xl font-header font-black uppercase tracking-widest text-white hover:text-primary transition-all group"
                            >
                                {link.text}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-header font-black uppercase tracking-widest text-white hover:text-primary transition-all group"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="w-full h-px bg-white/5"></div>

                    {/* Service Areas */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Service Areas</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {serviceAreas.map((city) => (
                                <Link 
                                    key={city} 
                                    href={`/service-areas/${city.toLowerCase().replace(/ /g, '-')}`} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-primary transition-colors text-xs flex items-center gap-1.5"
                                >
                                    <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0"></span>
                                    <span className="truncate">{city}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Quick Actions */}
                <div className="p-6 border-t border-white/5 bg-slate-950/50 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="bg-white/5 border border-white/10 hover:border-primary/50 p-3 rounded-xl flex flex-col items-center gap-2 group transition-all">
                            <Phone className="text-primary size-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary">Call Us</span>
                        </Link>
                        <Link href="/shop" onClick={() => setIsOpen(false)} className="bg-white/5 border border-white/10 hover:border-primary/50 p-3 rounded-xl flex flex-col items-center gap-2 group transition-all">
                            <Store className="text-primary size-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary">Shop</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
