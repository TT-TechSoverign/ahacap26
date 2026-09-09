'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useContent } from '../lib/context/ContentContext';
import { X, Phone, Store, Calendar, Sparkles, Wrench, Compass, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendGAEvent } from '@next/third-parties/google';

export default function MobileDrawerMenu({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    const { content } = useContent();

    // Lock body scroll and prevent pull-to-refresh when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'unset';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    const regions = content?.landing_legacy?.service_areas?.regions || [];
    const dynamicCities: string[] = [];
    regions.forEach((region: any) => {
        if (region.cities) {
            region.cities.forEach((city: any) => {
                dynamicCities.push(city.name);
            });
        }
    });

    const topCities = dynamicCities.length > 0 ? dynamicCities.slice(0, 8) : [
        'Waipahu', 'Honolulu', 'Pearl City', 'Aiea', 
        'Kapolei', 'Ewa Beach', 'Mililani', 'Kailua'
    ];

    const navSections = [
        {
            title: 'Cooling & Inventory',
            links: [
                { text: 'In-Stock Window ACs', href: '/shop', icon: Store, badge: '$45 Rebate' },
                { text: 'Ductless Mini-Splits', href: '/mini_split_ac', icon: Compass },
                { text: 'Free Survey & Estimate', href: '/mini-split-estimate', icon: Calendar, highlight: true },
            ]
        },
        {
            title: 'Services & Teardowns',
            links: [
                { text: 'Window AC Deep Cleaning', href: '/ac-cleaning-oahu', icon: Sparkles, badge: '$275 Teardown' },
                { text: 'AC Diagnostic & Repair', href: '/ac-repair-oahu', icon: Wrench },
                { text: 'Mini Split Maintenance', href: '/mini_split_ac_maintenance', icon: ShieldCheck },
            ]
        },
        {
            title: 'Tools & Guides',
            links: [
                { text: 'Room AC Sizing Wizard', href: '/sizing', icon: Compass },
                { text: 'Clean vs. Replace Guide', href: '/clean-vs-replace-window-ac', icon: Compass },
                { text: 'Island Service Areas', href: '/service-areas', icon: MapPin },
            ]
        }
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={cn(
                    "fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] md:hidden h-[100dvh] transition-opacity duration-300 ease-in-out",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 w-[88vw] max-w-sm bg-slate-950 border-l border-slate-800/80 z-[60] h-[100dvh] md:hidden overflow-y-auto flex flex-col shadow-2xl transition-transform duration-300 ease-out transform touch-scroll",
                    isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 pt-[calc(env(safe-area-inset-top,0px)+1rem)]">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-bold">Island Navigation</span>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-slate-400 hover:text-white p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg active:bg-white/5" 
                        aria-label="Close menu"
                    >
                        <X className="size-7" />
                    </button>
                </div>

                {/* Body Links */}
                <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
                    {navSections.map((section, sIdx) => (
                        <div key={sIdx} className="flex flex-col gap-2.5">
                            <h3 className="text-slate-500 font-mono font-bold uppercase tracking-widest text-[10px]">{section.title}</h3>
                            <div className="flex flex-col gap-1.5">
                                {section.links.map((link, lIdx) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <Link
                                            key={lIdx}
                                            href={link.href}
                                            prefetch={false}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between p-3 rounded-xl transition-all border group",
                                                link.highlight 
                                                    ? "bg-primary/10 border-primary/30 text-white hover:bg-primary/20" 
                                                    : "bg-white/[0.02] border-white/5 text-slate-200 hover:bg-white/5 hover:border-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComponent className={cn("size-4.5 shrink-0", link.highlight ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
                                                <span className="font-header font-bold text-sm uppercase tracking-wider">{link.text}</span>
                                            </div>
                                            {link.badge && (
                                                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                                                    {link.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Top Service Areas */}
                    <div className="flex flex-col gap-2.5 pt-2 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-slate-500 font-mono font-bold uppercase tracking-widest text-[10px]">Service Areas</h3>
                            <Link 
                                href="/service-areas" 
                                onClick={() => setIsOpen(false)}
                                className="text-[10px] font-mono uppercase text-primary hover:underline"
                            >
                                All 22 Cities →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {topCities.map((city) => (
                                <Link 
                                    key={city} 
                                    href={`/service-areas/${city.toLowerCase().replace(/ /g, '-')}`} 
                                    prefetch={false}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-primary transition-colors text-xs p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5 truncate"
                                >
                                    <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0"></span>
                                    <span className="truncate">{city}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Warehouse Location Info Card */}
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-left space-y-1">
                        <div className="flex items-center gap-1.5 text-primary text-[10px] font-mono uppercase tracking-widest font-bold">
                            <MapPin className="size-3.5 shrink-0" />
                            Waipahu Warehouse
                        </div>
                        <p className="text-xs text-slate-300 font-medium">94-150 Leoleo St. #203, Waipahu, HI 96797</p>
                        <p className="text-[10px] text-slate-500">Pickups by appointment • Licensed LIC# CT-36775</p>
                    </div>
                </div>
                
                {/* Bottom Quick Actions (Direct Dial & Catalog) */}
                <div className="p-4 border-t border-white/10 bg-slate-900/80 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                    <div className="grid grid-cols-2 gap-3">
                        <a 
                            href="tel:808-488-1111" 
                            onClick={() => {
                                sendGAEvent('event', 'click_to_call', { event_category: 'Mobile Conversion', event_label: 'Drawer Call Button' });
                                setIsOpen(false);
                            }} 
                            className="bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 p-3 rounded-xl flex items-center justify-center gap-2 group transition-all"
                        >
                            <Phone className="text-emerald-400 size-5 group-hover:scale-110 transition-transform shrink-0" />
                            <div className="text-left">
                                <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">Call Dispatch</div>
                                <div className="text-xs font-black text-white font-header tracking-wider">(808) 488-1111</div>
                            </div>
                        </a>
                        <Link 
                            href="/shop" 
                            prefetch={false} 
                            onClick={() => setIsOpen(false)} 
                            className="bg-primary/10 border border-primary/30 hover:bg-primary/20 p-3 rounded-xl flex items-center justify-center gap-2 group transition-all"
                        >
                            <Store className="text-primary size-5 group-hover:scale-110 transition-transform shrink-0" />
                            <div className="text-left">
                                <div className="text-[9px] font-mono uppercase tracking-wider text-primary">In-Stock ACs</div>
                                <div className="text-xs font-black text-white font-header tracking-wider">Shop Now</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
