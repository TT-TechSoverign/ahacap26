'use client';

import React from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

interface LocalTriFunnelProps {
    city: string; // Expects formatted city name (e.g. "Ewa Beach")
}

export default function LocalTriFunnel({ city }: LocalTriFunnelProps) {
    return (
        <section className="relative w-full bg-slate-950 py-16 md:py-24 overflow-hidden border-t border-white/5">
            {/* Global background glow */}
            <div className="absolute inset-0 bg-[#0F172A] opacity-80 z-0" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="font-header font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-4">
                    Reliable AC Services in <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">{city}</span>
                </h2>
                <div className="w-24 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] rounded-full mx-auto" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Path A: Split Systems (Lead Gen) */}
                <div className="group relative h-[400px] flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-transparent z-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0" />
                    
                    <div className="relative z-10 flex flex-col gap-4">
                        <span className="material-symbols-outlined text-cyan-400 text-5xl">ac_unit</span>
                        <h3 className="font-header font-black text-2xl text-white uppercase tracking-wider">Mini-Split Installs & Repair</h3>
                        <p className="text-slate-300 font-sans text-base leading-relaxed">
                            Whisper-quiet, highly efficient ductless cooling for your home in {city}. Professional installation and rapid repair services.
                        </p>
                    </div>

                    <Link 
                        href="/contact"
                        onClick={() => sendGAEvent('event', 'generate_lead', { 
                            event_category: 'Split Service', 
                            event_label: `${city} Page` 
                        })}
                        className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm rounded transition-all duration-300 shadow-[0_5px_20px_rgba(0,174,239,0.3)] hover:-translate-y-1"
                    >
                        <span>Get a Free Quote</span>
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                </div>

                {/* Path B: Retail Store (E-Commerce) */}
                <div className="group relative h-[400px] flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-transparent z-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0" />
                    
                    <div className="relative z-10 flex flex-col gap-4">
                        <span className="material-symbols-outlined text-white text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">storefront</span>
                        <h3 className="font-header font-black text-2xl text-white uppercase tracking-wider">Window AC Upgrades</h3>
                        <p className="text-slate-300 font-sans text-base leading-relaxed">
                            Browse our massive local inventory of premium LG & GE units ready for immediate pickup or delivery in {city}.
                        </p>
                    </div>

                    <Link 
                        href="/shop"
                        onClick={() => sendGAEvent('event', 'view_item_list', { 
                            event_category: 'Retail', 
                            event_label: `${city} Page` 
                        })}
                        className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-4 border-2 border-white text-white hover:bg-white hover:text-slate-950 font-black uppercase tracking-widest text-sm rounded transition-all duration-300 hover:-translate-y-1"
                    >
                        <span>Shop Local Inventory</span>
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    </Link>
                </div>

                {/* Path C: Window Maintenance (Lead Gen) */}
                <div className="group relative h-[400px] flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-transparent z-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0" />
                    
                    <div className="relative z-10 flex flex-col gap-4">
                        <span className="material-symbols-outlined text-cyan-400 text-5xl">water_drop</span>
                        <h3 className="font-header font-black text-2xl text-white uppercase tracking-wider">Window AC Deep Cleaning</h3>
                        <p className="text-slate-300 font-sans text-base leading-relaxed">
                            Restore efficiency and air quality. Our professional deep cleaning eliminates mold and buildup for healthy air in {city}.
                        </p>
                    </div>

                    <Link 
                        href="/contact"
                        onClick={() => sendGAEvent('event', 'generate_lead', { 
                            event_category: 'Window Cleaning', 
                            event_label: `${city} Page` 
                        })}
                        className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-black uppercase tracking-widest text-sm rounded transition-all duration-300 shadow-[0_5px_20px_rgba(0,174,239,0.1)] hover:-translate-y-1"
                    >
                        <span>Book a Cleaning</span>
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
