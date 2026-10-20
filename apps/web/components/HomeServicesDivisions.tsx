'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Wind, 
    Wrench, 
    Sparkles, 
    ShieldCheck, 
    Warehouse, 
    Truck, 
    ArrowRight, 
    Phone, 
    Calendar, 
    RotateCcw,
    SlidersHorizontal,
    Layers
} from 'lucide-react';
import { useLiveInventorySummary } from '@/lib/use-live-inventory';

interface ServiceItem {
    title: string;
    desc: string;
    href: string;
    cta: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
}

interface Division {
    id: string;
    name: string;
    badge: string;
    tagline: string;
    description: string;
    theme: {
        accent: string;
        badgeBg: string;
        border: string;
        glow: string;
        btnBg: string;
        iconColor: string;
    };
    services: ServiceItem[];
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
}

export function HomeServicesDivisions() {
    const [activeTab, setActiveTab] = useState<'all' | 'window-ac' | 'window-cleaning'>('all');
    const { inStockAcCount, minPrice, maxPrice } = useLiveInventorySummary();

    const divisions: Division[] = [
        {
            id: 'window-ac',
            name: 'Window AC Sales & Install Division',
            badge: 'Waipahu Warehouse Direct',
            tagline: 'In-Stock LG & GE Sales, Custom Jalousie Mounting & 26" Sleeve Replacements',
            description: `From whisper-quiet LG Dual Inverter and GE Thru-The-Wall units in stock in Waipahu ($${minPrice}–$${maxPrice.toLocaleString()}) to custom jalousie security brackets and precision mounting, our Window AC Sales & Install division keeps Oahu homes cool without mainland shipping delays.`,
            theme: {
                accent: 'cyan',
                badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
                border: 'border-cyan-500/30 hover:border-cyan-400',
                glow: 'shadow-[0_0_35px_rgba(6,182,212,0.15)]',
                btnBg: 'bg-primary hover:bg-cyan-300 text-slate-950',
                iconColor: 'text-cyan-400',
            },
            services: [
                {
                    title: 'In-Stock Units & Warehouse Sales',
                    desc: `Brand new LG Dual Inverter & GE 26" Built-In units in stock in Waipahu ($${minPrice}–$${maxPrice.toLocaleString()}). Same-day warehouse pickup by appointment or $50 flat delivery.`,
                    href: '/shop',
                    cta: 'Browse In-Stock Units',
                    icon: Warehouse,
                    badge: `${inStockAcCount} Models In-Stock in Waipahu`
                },
                {
                    title: 'Professional Window AC Installation',
                    desc: 'Expert mounting for jalousie windows (custom security brackets), horizontal sliders, standard hung sashes, and 26" through-the-wall sleeves ($0 Free Estimate).',
                    href: '/window-ac-installation',
                    cta: 'Installation Details',
                    icon: Wrench,
                    badge: '$0 Free Estimate'
                },
                {
                    title: 'Window AC Delivery & Warehouse Pickup',
                    desc: '$50 flat delivery across Honolulu, West, Central & Windward Oahu or same-day vehicle loading at our Waipahu warehouse. Factory-sealed with 1-Yr / 2-Yr warranty.',
                    href: '/oahu-curbside-ac-delivery',
                    cta: 'Delivery & Pickup Info',
                    icon: Truck,
                    badge: '$50 Flat Delivery'
                },
                {
                    title: '26" Thru-The-Wall Sleeve Replacement',
                    desc: 'Direct drop-in GE AJCQ & LG LT replacements for Oahu high-rises, condos, and townhomes with existing 26-inch wall sleeves.',
                    href: '/thru-the-wall-ac-replacement-oahu',
                    cta: 'View 26" Sleeve Units',
                    icon: Wind,
                    badge: 'GE & LG Chassis'
                }
            ],
            primaryCta: {
                text: 'Shop In-Stock Window ACs',
                href: '/shop'
            },
            secondaryCta: {
                text: 'Book Window AC Install',
                href: '/contact'
            }
        },
        {
            id: 'window-cleaning',
            name: 'Window AC Cleaning & Care Division',
            badge: 'Antimicrobial Coil & Mold Flush',
            tagline: 'Deep Window AC Cleaning, Airflow Restoration & Clean-vs-Replace Guidance',
            description: 'Dedicated Window AC cleaning and maintenance specialists restoring icy airflow, eliminating musty tropical mildew, and lowering HECO power bills across Oahu. Free estimates ($0) with floor drop-cloth protection.',
            theme: {
                accent: 'emerald',
                badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                border: 'border-emerald-500/30 hover:border-emerald-400',
                glow: 'shadow-[0_0_35px_rgba(16,185,129,0.15)]',
                btnBg: 'bg-emerald-400 hover:bg-emerald-300 text-slate-950',
                iconColor: 'text-emerald-400',
            },
            services: [
                {
                    title: 'Window AC Deep Cleaning & Sanitization',
                    desc: 'Antimicrobial evaporator & condenser coil wash, blower wheel & slinger fan cleaning, and algae drain pan treatment with floor drop-cloth protection.',
                    href: '/ac-cleaning-oahu',
                    cta: 'Explore Window AC Cleaning',
                    icon: Sparkles,
                    badge: 'Mold & Coil Wash'
                },
                {
                    title: 'Seasonal Window AC Maintenance',
                    desc: 'Preventative salt-air coil rinse, filter replacement, weep-hole clearing, and airflow temperature verification for residential & commercial window units.',
                    href: '/maintenance',
                    cta: 'Window AC Maintenance',
                    icon: ShieldCheck,
                    badge: 'Extend Unit Life'
                },
                {
                    title: 'Window AC Troubleshooting & Diagnostics',
                    desc: 'Diagnosis for warm air, ice on coils, water dripping indoors, loud fan vibration, breaker tripping, and LED filter/chassis error codes.',
                    href: '/ac-repair-oahu',
                    cta: 'Troubleshooting Guide',
                    icon: Wrench,
                    badge: 'Airflow & Cooling'
                },
                {
                    title: 'Clean vs. Replace & BTU Sizing Guide',
                    desc: 'Honest evaluation on whether an older window AC is worth cleaning or if upgrading to an LG Dual Inverter ($45 rebate) pays for itself in HECO savings.',
                    href: '/clean-vs-replace-window-ac',
                    cta: 'Compare Clean vs Replace',
                    icon: RotateCcw,
                    badge: 'Save on HECO Power'
                }
            ],
            primaryCta: {
                text: 'Book Window AC Cleaning ($0)',
                href: '/contact'
            },
            secondaryCta: {
                text: 'Cleaning Process Details',
                href: '/ac-cleaning-oahu'
            }
        }
    ];

    return (
        <section id="services" className="scroll-mt-24 relative py-16 px-4 bg-[#080d19] border-t border-slate-800/80">
            {/* Ambient Island Gradients */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                        <Layers className="size-3.5 text-cyan-400" />
                        Waipahu Warehouse Direct • Two Specialized Window AC Divisions
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-header font-black text-white uppercase tracking-tight">
                        Our Window AC Divisions &amp; Services
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                        Dedicated Oahu teams specializing in LG &amp; GE Window Air Conditioners. Whether you need an in-stock Dual Inverter unit with custom jalousie installation or deep antimicrobial Window AC cleaning, we have you covered across Oahu.
                    </p>

                    {/* Mobile Division Filter Buttons */}
                    <div className="flex md:hidden items-center justify-center gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('all')}
                            className={`px-3 py-1.5 rounded-xl font-header font-bold text-xs uppercase tracking-wider transition-all ${
                                activeTab === 'all'
                                    ? 'bg-white/10 text-white border border-white/20'
                                    : 'bg-transparent text-slate-400 border border-white/5'
                            }`}
                        >
                            All Services
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('window-ac')}
                            className={`px-3 py-1.5 rounded-xl font-header font-bold text-xs uppercase tracking-wider transition-all ${
                                activeTab === 'window-ac'
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                    : 'bg-transparent text-slate-400 border border-white/5'
                            }`}
                        >
                            Sales &amp; Install
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('window-cleaning')}
                            className={`px-3 py-1.5 rounded-xl font-header font-bold text-xs uppercase tracking-wider transition-all ${
                                activeTab === 'window-cleaning'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-transparent text-slate-400 border border-white/5'
                            }`}
                        >
                            AC Cleaning
                        </button>
                    </div>
                </div>

                {/* Symmetrical Two-Division Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {divisions.filter(div => activeTab === 'all' || activeTab === div.id).map((div) => {
                        return (
                            <div
                                key={div.id}
                                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md bg-slate-900/70 border ${div.theme.border} ${div.theme.glow}`}
                            >
                                {/* Division Top Header */}
                                <div>
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${div.theme.badgeBg}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                            {div.badge}
                                        </span>
                                        <span className="text-[11px] font-mono text-slate-400">
                                            {div.services.length} Core Services
                                        </span>
                                    </div>

                                    <h3 className="font-header font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
                                        {div.name}
                                    </h3>
                                    <p className={`font-mono text-xs font-bold uppercase tracking-wide mb-3 ${div.theme.iconColor}`}>
                                        {div.tagline}
                                    </p>
                                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                                        {div.description}
                                    </p>

                                    {/* 4 Services Grid inside Division */}
                                    <div className="space-y-3 mb-6">
                                        {div.services.map((svc, sIdx) => {
                                            const Icon = svc.icon;
                                            return (
                                                <Link
                                                    key={sIdx}
                                                    href={svc.href}
                                                    className="group/item block p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-200"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${div.theme.badgeBg}`}>
                                                                <Icon className="size-4" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-header font-bold text-sm text-white group-hover/item:text-cyan-300 transition-colors">
                                                                        {svc.title}
                                                                    </h4>
                                                                    <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                                                                        {svc.badge}
                                                                    </span>
                                                                </div>
                                                                <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                                                                    {svc.desc}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="shrink-0 pt-1 text-slate-500 group-hover/item:text-primary transition-colors">
                                                            <ArrowRight className="size-4 group-hover/item:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Division Bottom CTAs */}
                                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                                    <Link
                                        href={div.primaryCta.href}
                                        className={`w-full sm:w-auto flex-1 py-3.5 px-6 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${div.theme.btnBg} hover:scale-[1.02]`}
                                    >
                                        <span>{div.primaryCta.text}</span>
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                    <Link
                                        href={div.secondaryCta.href}
                                        className="w-full sm:w-auto py-3.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-header font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 transition-colors text-center"
                                    >
                                        {div.secondaryCta.text}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Drop-Cloth Protection Guarantee & Trust Grounding */}
                <div className="mt-12 bg-slate-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4 text-center lg:text-left">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mx-auto lg:mx-0">
                            <ShieldCheck className="size-6 text-emerald-400" />
                        </div>
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Floor Drop-Cloth Protection • Waipahu Warehouse Direct
                            </div>
                            <h4 className="font-header font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                                By Appointment First • Free Installation Estimates ($0 to Book)
                            </h4>
                            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                                Our technicians protect your home by laying drop cloths on the floor under the unit during every service call. Zero upfront payment barriers—we evaluate your space first before any work begins.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                        <a
                            href="tel:808-488-1111"
                            className="w-full sm:w-auto px-6 py-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Phone className="size-4 shrink-0" />
                            <span>Call (808) 488-1111</span>
                        </a>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-header font-bold uppercase text-xs tracking-wider rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Calendar className="size-4 text-cyan-400 shrink-0" />
                            <span>Book Appt Form</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
