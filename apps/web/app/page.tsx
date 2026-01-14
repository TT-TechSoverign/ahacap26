'use client';

import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white min-h-screen">
            {/* Header */}
            <header className="fixed top-9 w-full z-50 glass-header">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-20 w-80">
                             <Image
                                src="/assets/ahac-logo-header-hv3.svg"
                                alt="Affordable Home A/C"
                                fill
                                className="object-contain object-left"
                                priority
                             />
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/shop" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">SHOP INVENTORY</Link>
                        <Link href="/maintenance" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">MAINTENANCE</Link>
                        <Link href="/mini-splits" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">MINI SPLITS</Link>
                        <Link href="/central-ac" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">CENTRAL AC</Link>
                    </nav>
                    <Button className="uppercase">
                        Contact Us
                    </Button>
                </div>
            </header>

            <main className="pt-[116px]">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
                        <div className="z-10">
                            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/50 rounded text-accent font-bold tracking-widest mb-6 animate-pulse shadow-[0_0_15px_rgba(57,181,74,0.3)]">
                                EST. 2005 • OAHU, HI
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-header font-bold leading-tight mb-8 text-white uppercase tracking-wide">
                                OAHU’S PREMIER <br />
                                <span className="text-primary neon-glow whitespace-nowrap">HVAC CONTRACTOR</span> <br />
                                <span className="text-primary neon-glow">& AC SPECIALISTS</span>
                            </h1>
                            <div className="text-xl text-slate-400 max-w-4xl mb-12 leading-relaxed space-y-8">
                                <div className="border-l-2 border-white/10 pl-8 flex flex-col gap-6">
                                    {/* Group: Badges */}
                                    <div className="flex flex-col gap-4 items-start w-full max-w-2xl">
                                        <div className="inline-block px-5 py-2 bg-primary/10 border-l-4 border-primary rounded-r text-white font-header font-bold text-2xl lg:text-3xl uppercase tracking-wide shadow-[0_0_30px_rgba(0,174,239,0.15)] hover:scale-[1.02] transition-transform duration-300 whitespace-nowrap">
                                            EXCLUSIVE LG VENDOR & INSTALLER
                                        </div>

                                        <div className="inline-block px-5 py-2 bg-orange-500/10 border-l-4 border-orange-500 rounded-r text-white font-header font-bold text-2xl lg:text-3xl uppercase tracking-wide shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:scale-[1.02] transition-transform duration-300 whitespace-nowrap">
                                            LICENSED, INSURED, BONDED
                                        </div>

                                         <div className="inline-block px-5 py-2 bg-accent/10 border-l-4 border-accent rounded-r text-white font-header font-bold text-2xl lg:text-3xl uppercase tracking-wide shadow-[0_0_30px_rgba(57,181,74,0.15)] hover:scale-[1.02] transition-transform duration-300 whitespace-nowrap">
                                            HIGH-EFFICIENCY, ENERGY SAVING UNITS
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="px-8 py-6 h-auto text-center" asChild>
                                    <Link href="/shop?category=WINDOW_AC">
                                        SHOP WINDOW AC (PICKUP ONLY)
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" className="px-8 py-6 h-auto">
                                    FREE ESTIMATE
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            {/* Card 1: Shop */}
                            <div className="industrial-card p-8 border border-primary/20 rounded-xl flex flex-col gap-6 relative overflow-hidden group bg-primary/[0.03] hover:bg-primary/[0.05] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,174,239,0.15)] transition-all">
                                <div className="absolute top-4 right-4 bg-primary/20 border border-primary/50 text-primary text-[10px] font-bold px-3 py-1 rounded shadow-[0_0_10px_rgba(0,174,239,0.2)]">PICKUP</div>
                                <div className="text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]">storefront</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">SHOP INVENTORY</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">Live inventory of window units & portable A/C. Buy online, pickup in Aiea.</p>
                                    <Link href="/shop" className="text-primary flex items-center gap-2 text-xs font-bold tracking-widest group-hover:gap-3 transition-all uppercase">
                                        View Shop <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Card 2: Maintenance */}
                            <div className="industrial-card p-8 border border-accent/20 rounded-xl flex flex-col gap-6 relative overflow-hidden group bg-accent/[0.03] hover:bg-accent/[0.05] hover:border-accent/50 hover:shadow-[0_0_30px_rgba(57,181,74,0.15)] transition-all">
                                <div className="text-accent mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(57,181,74,0.5)]">engineering</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-bold text-white mb-2 uppercase tracking-wide group-hover:text-accent transition-colors">MAINTENANCE</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">Expert service led by Chris Martinez. Extend equipment life in Hawaii&apos;s salt air.</p>
                                    <Link href="/maintenance" className="text-accent flex items-center gap-2 text-xs font-bold tracking-widest group-hover:gap-3 transition-all uppercase">
                                        Service Plans <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Card 3: Mini Splits */}
                            <div className="industrial-card p-8 border border-primary/20 rounded-xl flex flex-col gap-6 relative overflow-hidden group bg-primary/[0.03] hover:bg-primary/[0.05] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,174,239,0.15)] transition-all">
                                <div className="text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]">settings_input_component</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">MINI SPLITS</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">Precision zone cooling. Perfect for individual rooms without invasive ductwork.</p>
                                    <Link href="/mini-splits" className="text-primary flex items-center gap-2 text-xs font-bold tracking-widest group-hover:gap-3 transition-all uppercase">
                                        10-Year Warranty <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Card 4: Central AC */}
                            <div className="industrial-card p-8 border border-accent/20 rounded-xl flex flex-col gap-6 relative overflow-hidden group bg-accent/[0.03] hover:bg-accent/[0.05] hover:border-accent/50 hover:shadow-[0_0_30px_rgba(57,181,74,0.15)] transition-all">
                                <div className="text-accent mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(57,181,74,0.5)]">heat_pump</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-bold text-white mb-2 uppercase tracking-wide group-hover:text-accent transition-colors">CENTRAL AC</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">High-efficiency retrofits handling tropical heatwaves. Full system replacements.</p>
                                    <Link href="/central-ac" className="text-accent flex items-center gap-2 text-xs font-bold tracking-widest group-hover:gap-3 transition-all uppercase">
                                        Retrofit Options <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="bg-charcoal border-y border-white/5 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: "verified", title: "EST. 2005", sub: "20+ Years Experience", color: "text-primary" },
                                { icon: "grade", title: "5-STAR", sub: "Customer Rated", color: "text-accent" },
                                { icon: "military_tech", title: "ELITE", sub: "Dealer Status", color: "text-primary" },
                                { icon: "bolt", title: "INSTANT", sub: "Emergency Dispatch", color: "text-accent" }
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className={`size-12 rounded border border-white/10 flex items-center justify-center ${badge.color} group-hover:border-current transition-colors`}>
                                        <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-header text-xl leading-none">{badge.title}</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest">{badge.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-16 bg-background-dark overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-black group">
                            <video
                                src="/hero.mp4"
                                controls
                                playsInline
                                className="object-cover w-full h-full"
                            >
                                Your browser does not support the video tag.
                            </video>
                            {/* Overlay Text - Removed as per user request */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </section>

                {/* Marquee */}
                <section className="bg-charcoal/50 border-y border-white/5 py-16 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 max-w-7xl mx-auto">
                            {/* Window AC */}
                            <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="text-center border-b border-white/5 pb-6 relative z-10">
                                    <div className="inline-flex items-center gap-3 justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-3xl">ac_unit</span>
                                        <h3 className="text-2xl font-header font-bold uppercase tracking-wide">Window AC</h3>
                                    </div>
                                    <div className="h-0.5 w-12 bg-primary/30 mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-10 flex-1 relative z-10 py-4">
                                    {[
                                        { name: "LG", color: "text-rose-500", style: "font-sans font-black tracking-tighter text-6xl" },
                                        { name: "GE APPLIANCES", color: "text-blue-400", style: "font-serif font-bold tracking-wide text-3xl" },
                                        { name: "Hawai'i Energy", color: "text-[#00FFFF]", style: "font-sans font-bold tracking-tight text-4xl" },
                                    ].map((brand, i) => (
                                        <span key={i} className={`cursor-default transition-all duration-300 ${brand.color} ${brand.style} drop-shadow-xl hover:scale-110 hover:brightness-125 transform`}>
                                            {brand.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Mini Splits */}
                            <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="text-center border-b border-white/5 pb-6 relative z-10">
                                    <div className="inline-flex items-center gap-3 justify-center text-accent mb-2 group-hover:scale-110 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-3xl">mode_fan</span>
                                        <h3 className="text-2xl font-header font-bold uppercase tracking-wide">Mini Splits</h3>
                                    </div>
                                    <div className="h-0.5 w-12 bg-accent/30 mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
                                </div>

                                <div className="grid grid-cols-1 gap-10 items-center justify-items-center flex-1 relative z-10 py-4">
                                    <div className="flex gap-8 items-center justify-center w-full">
                                        <span className="text-red-600 font-header font-bold tracking-normal uppercase text-xl cursor-default drop-shadow-xl hover:scale-110 hover:brightness-125 transition-all">MITSUBISHI<br/>ELECTRIC</span>
                                        <span className="text-red-500 font-sans font-bold italic tracking-widest text-3xl cursor-default drop-shadow-xl hover:scale-110 hover:brightness-125 transition-all">FUJITSU</span>
                                    </div>
                                    <div className="flex gap-12 items-center justify-center w-full">
                                        <span className="text-sky-400 font-header font-medium tracking-widest text-2xl cursor-default drop-shadow-xl hover:scale-110 hover:brightness-125 transition-all">DAIKIN</span>
                                        <span className="text-blue-600 font-sans font-extrabold tracking-tighter text-3xl cursor-default drop-shadow-xl hover:scale-110 hover:brightness-125 transition-all">CARRIER</span>
                                    </div>
                                </div>
                            </div>

                            {/* Central AC */}
                            <div className="industrial-card p-10 border border-white/5 rounded-2xl flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02] min-h-[300px]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="text-center border-b border-white/5 pb-6 relative z-10">
                                    <div className="inline-flex items-center gap-3 justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-3xl">hvac</span>
                                        <h3 className="text-2xl font-header font-bold uppercase tracking-wide">Central AC</h3>
                                    </div>
                                    <div className="h-0.5 w-12 bg-primary/30 mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-10 flex-1 relative z-10 py-4">
                                    {[
                                        { name: "RHEEM", color: "text-red-500", style: "font-header font-bold tracking-tight text-5xl" },
                                        { name: "BOSCH", color: "text-cyan-500", style: "font-mono font-bold tracking-[0.2em] text-3xl" },
                                    ].map((brand, i) => (
                                        <span key={i} className={`cursor-default transition-all duration-300 ${brand.color} ${brand.style} drop-shadow-xl hover:scale-110 hover:brightness-125 transform`}>
                                            {brand.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Dispatch / Location */}
                <section id="locations" className="py-24 bg-charcoal/50 border-t border-white/5 relative overflow-hidden mt-12">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-background-dark to-background-dark pointer-events-none"></div>
                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        {/* Form */}
                        <div className="bg-background-dark border border-white/10 p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-[shimmer_2s_infinite]"></div>
                            <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                                <div>
                                    <h2 className="text-3xl font-header font-bold text-white uppercase tracking-wide mb-1">Request Service</h2>
                                    <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Start your repair ticket</p>
                                </div>
                                <div className="bg-charcoal px-3 py-1 rounded border border-white/5">
                                    <span className="text-primary font-mono text-sm tracking-widest">#TX-2024-HI</span>
                                </div>
                            </div>
                            <DispatchWizardComponent />
                        </div>
                    </div>
                </section>

                {/* Service Areas */}
                <section id="service-areas" className="py-24 bg-background-dark border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0f172a] opacity-50"></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-block mb-8">
                            <span className="py-3 px-8 rounded-full bg-primary/10 border border-primary text-primary text-xl font-header font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(0,174,239,0.2)]">
                                Island-Wide Coverage
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-header font-bold text-white mb-6 uppercase tracking-wide">
                            Oahu&apos;s Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">HVAC Authority</span>
                        </h2>
                        <p className="text-slate-400 max-w-3xl mx-auto mb-16 text-lg md:text-xl leading-relaxed">
                            Licensed experts delivering hospital-grade air quality and precision cooling. Trusted by homeowner associations and families island-wide for rapid response and superior craftsmanship.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            {/* Central Oahu */}
                            <div className="industrial-card p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_40px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="relative z-10 w-full">
                                    <div className="text-primary mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]">warehouse</span>
                                        <h3 className="text-2xl font-header font-bold text-white uppercase tracking-wide group-hover:text-primary transition-colors">Central Oahu</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {["Aiea", "Pearl City", "Mililani", "Wahiawa"].map((city, i) => (
                                            <span key={i} className="flex-1 text-center min-w-[100px] px-4 py-3 rounded bg-white/5 border border-white/10 text-sm text-slate-300 font-bold uppercase tracking-wider hover:bg-primary hover:border-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,174,239,0.6)] hover:scale-105 transition-all duration-300 backdrop-blur-sm cursor-default">
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Metro Honolulu */}
                            <div className="industrial-card p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] transition-all duration-500 bg-white/[0.02]">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="relative z-10 w-full">
                                    <div className="text-accent mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">apartment</span>
                                        <h3 className="text-2xl font-header font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors">Metro Honolulu</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {["Honolulu", "Kalihi", "Manoa", "Kaimuki", "Hawaii Kai"].map((city, i) => (
                                            <span key={i} className="flex-1 text-center min-w-[100px] px-4 py-3 rounded bg-white/5 border border-white/10 text-sm text-slate-300 font-bold uppercase tracking-wider hover:bg-accent hover:border-accent hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300 backdrop-blur-sm cursor-default">
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Leeward Side */}
                            <div className="industrial-card p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_40px_-10px_rgba(0,174,239,0.3)] transition-all duration-500 bg-white/[0.02]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 animate-[pulse_4.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="relative z-10 w-full">
                                    <div className="text-primary mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]">sunny</span>
                                        <h3 className="text-2xl font-header font-bold text-white uppercase tracking-wide group-hover:text-primary transition-colors">Leeward Side</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {["Kapolei", "Ewa Beach", "Waipahu", "Waianae", "Kunia"].map((city, i) => (
                                            <span key={i} className="flex-1 text-center min-w-[100px] px-4 py-3 rounded bg-white/5 border border-white/10 text-sm text-slate-300 font-bold uppercase tracking-wider hover:bg-primary hover:border-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,174,239,0.6)] hover:scale-105 transition-all duration-300 backdrop-blur-sm cursor-default">
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Windward & North Shore */}
                            <div className="industrial-card p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] transition-all duration-500 bg-white/[0.02]">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500 animate-[pulse_5.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                                <div className="relative z-10 w-full">
                                    <div className="text-accent mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">waves</span>
                                        <h3 className="text-2xl font-header font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors">Windward & North</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {["Kailua", "Kaneohe", "Laie", "Kahuku", "Waialua"].map((city, i) => (
                                            <span key={i} className="flex-1 text-center min-w-[100px] px-4 py-3 rounded bg-white/5 border border-white/10 text-sm text-slate-300 font-bold uppercase tracking-wider hover:bg-accent hover:border-accent hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300 backdrop-blur-sm cursor-default">
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Warehouse Location Section (Moved) */}
                <section id="warehouse-map" className="py-24 bg-charcoal border-t border-white/5">
                     <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-block mb-6">
                                    <span className="py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase">
                                        Local Pickup Center
                                    </span>
                                </div>
                                <h2 className="text-4xl font-header font-bold text-white mb-6 uppercase tracking-wide">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Shop Location</span>
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    Our shop is stocked with window units. Order yours today
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-6 rounded-lg bg-background-dark border border-white/5 group hover:border-primary/30 transition-colors">
                                        <div className="bg-primary/20 p-3 rounded text-primary group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">location_on</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wide mb-1">Address</h4>
                                            <p className="text-slate-400">94-150 Leoleo St. #203<br/>Waipahu, HI 96797</p>
                                        </div>
                                    </div>

                                     <div className="flex items-start gap-4 p-6 rounded-lg bg-background-dark border border-white/5 group hover:border-accent/30 transition-colors">
                                        <div className="bg-accent/20 p-3 rounded text-accent group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wide mb-1">Hours</h4>
                                            <p className="text-slate-400">Monday - Friday: 8:00 AM - 5:00 PM<br/>Saturday: 9:00 AM - 1:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[500px] rounded-2xl overflow-hidden border border-white/10 relative group">
                                <Image
                                    src="/oahu-map.jpg"
                                    alt="Aiea Warehouse Location"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent pointer-events-none"></div>

                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="relative">
                                        <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center animate-[ping_2s_infinite]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="size-12 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,174,239,0.8)] border-4 border-background-dark">
                                                <span className="material-symbols-outlined text-white font-bold text-xl">warehouse</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                     <Button className="w-full bg-white text-background-dark hover:bg-slate-200 uppercase font-bold tracking-widest shadow-xl">
                                        <span className="material-symbols-outlined mr-2">directions</span> Get Directions
                                    </Button>
                                </div>
                            </div>
                        </div>
                     </div>
                </section>
            </main>

             {/* Footer */}
            {/* Footer */}
            <footer className="bg-[#0a0e14] border-t border-white/5 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="relative h-16 w-48">
                                <Image
                                    src="/assets/ahac-logo-header-hv3.svg"
                                    alt="Affordable Home A/C"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Oahu&apos;s quality provider of energy-efficient cooling solutions. Specializing in Window Units, Mini-Split AC and Central AC services for island living.
                            </p>
                            <div className="flex gap-4">
                                {['facebook', 'instagram', 'twitter'].map((social) => (
                                    <a key={social} href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-lg">public</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services Column */}
                        <div>
                            <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Services</h4>
                            <ul className="space-y-4">
                                {['Window AC Installation', 'Mini Split Systems', 'System Maintenance', 'Commercial Cooling', 'Emergency Repair'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div>
                            <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Company</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Service Areas', 'Careers', 'Financing', 'Privacy Policy'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div>
                            <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Contact</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">Shop Location</div>
                                        <div className="text-slate-400 text-sm">Waipahu Commercial Center<br/>94-150 Leoleo St. #203<br/>Waipahu, HI 96797</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">call</span>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">Phone</div>
                                        <a href="tel:808-123-4567" className="text-slate-400 text-sm hover:text-white transition-colors">(808) 123-4567</a>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">schedule</span>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">Hours</div>
                                        <div className="text-slate-400 text-sm">Mon-Fri: 8am - 5pm<br/>Sat: 9am - 1pm</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                            © 2024 Affordable Home A/C. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <span className="text-slate-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                LIC# C-34211
                            </span>
                            <span className="text-slate-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">shield</span>
                                Bonded & Insured
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function DispatchWizardComponent() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        // Simple handler to ensure controlled inputs work (even if we don't fully validate yet)
        // In a real app, you'd update formData
    };

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10"></div>
                <div className={`active-step-line absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setStep(s)}>
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${step >= s ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(0,174,239,0.5)]' : 'bg-background-dark border-white/10 text-slate-500'}`}>
                            {s}
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= s ? 'text-white' : 'text-slate-600'}`}>
                            {s === 1 ? 'Service' : s === 2 ? 'Urgency' : 'Details'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step 1: Service Needs */}
            {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">How can we help?</h3>
                        <p className="text-slate-400 text-sm">Select the specific services you need so we can prepare the right tailored solutions for you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            "Window AC Installation", "Window AC Cleaning",
                            "Mini Split Estimate (New)", "Mini Split Estimate (Replace)",
                            "Mini Split Maintenance", "Mini Split Diagnosis/Repair",
                            "Mini Split Warranty Diag", "Mini Split Warranty Repair",
                            "Central AC Estimate", "Central AC Maintenance",
                            "Central AC Diag/Repair", "Central AC Warranty Diag",
                            "Central AC Warranty Repair"
                        ].map((service, i) => (
                            <label key={i} className="cursor-pointer group relative">
                                <input type="checkbox" className="peer hidden" onChange={handleChange} />
                                <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg bg-white/5 transition-all hover:bg-white/10 hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:shadow-[0_0_15px_rgba(0,174,239,0.3)] h-full">
                                    <div className="size-3 rounded-full bg-slate-600 peer-checked:bg-primary transition-colors ring-2 ring-transparent peer-checked:ring-primary/50"></div>
                                    <span className="text-sm font-bold text-slate-300 peer-checked:text-white uppercase tracking-tight leading-tight group-hover:text-white transition-colors">{service}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                     <Button onClick={() => setStep(2)} className="w-full mt-6 py-4 uppercase font-bold tracking-widest text-sm hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)]">
                        Next: Urgency & Timing <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                    </Button>
                </div>
            )}

            {/* Step 2: Urgency & Timing */}
            {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                     <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">When do you need us?</h3>
                        <p className="text-slate-400 text-sm">Help us prioritize your request by telling us your timeline and availability.</p>
                    </div>

                    {/* Time Frame */}
                    <div className="space-y-4">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Urgency Level <span className="text-primary">*</span></label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {["ASAP", "Within 30 days", "No rush, shopping"].map((time, i) => (
                                <label key={i} className="cursor-pointer group">
                                    <input type="radio" name="time_frame" className="peer hidden" onChange={handleChange} />
                                    <div className="flex flex-col items-center justify-center p-4 border border-white/10 rounded-lg bg-white/5 text-center transition-all hover:bg-white/10 hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:shadow-[0_0_15px_rgba(0,174,239,0.3)] h-full">
                                        <span className="material-symbols-outlined mb-2 text-slate-400 peer-checked:text-primary group-hover:text-white transition-colors">
                                            {i === 0 ? 'bolt' : i === 1 ? 'calendar_month' : 'shopping_bag'}
                                        </span>
                                        <span className="text-sm font-bold text-slate-300 peer-checked:text-white uppercase tracking-wider group-hover:text-white transition-colors">{time}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                     {/* Best Time */}
                    <div className="space-y-4">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Best Contact Time <span className="text-primary">*</span></label>
                        <div className="flex flex-wrap gap-2">
                             {["Weekdays", "Weekends", "Morning", "Evening", "Afternoon"].map((time, i) => (
                                <label key={i} className="cursor-pointer flex-grow">
                                    <input type="checkbox" className="peer hidden" onChange={handleChange} />
                                    <div className="text-center py-3 px-4 border border-white/10 rounded-md bg-white/5 text-slate-400 text-xs font-bold uppercase transition-all hover:bg-white/10 hover:text-white peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-white peer-checked:shadow-[0_0_15px_rgba(0,174,239,0.3)]">
                                        {time}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="ghost" type="button" onClick={() => setStep(1)} className="flex-1 py-4 uppercase font-bold tracking-widest text-sm border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white">
                             Back
                        </Button>
                        <Button onClick={() => setStep(3)} className="flex-[2] py-4 uppercase font-bold tracking-widest text-sm hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)]">
                            Next: Contact Logistics <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Logistics & Review */}
            {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">Final Details</h3>
                        <p className="text-slate-400 text-sm">Where should our team go? We&apos;ll confirm the appointment shortly.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 group">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">First Name <span className="text-primary">*</span></label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange}/>
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Last Name <span className="text-primary">*</span></label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 group">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Email <span className="text-primary">*</span></label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="email" required onChange={handleChange}/>
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Phone <span className="text-primary">*</span></label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="tel" required onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2 group">
                                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Address <span className="text-primary">*</span></label>
                                <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange}/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">City</label>
                                    <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange}/>
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Zip</label>
                                    <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Source & Other */}
                    <div className="space-y-4 pt-4 border-t border-white/5 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                         <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">How did you hear about us?</label>
                            <select className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-2 text-slate-300">
                                <option>Google</option>
                                <option>Social Media</option>
                                <option>Referral</option>
                                <option>Other</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Additional Notes</label>
                            <textarea className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" rows={1}></textarea>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <Button variant="ghost" type="button" onClick={() => setStep(2)} className="flex-1 py-4 uppercase font-bold tracking-widest text-sm border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white">
                             Back
                        </Button>
                        <Button className="flex-[2] py-4 text-lg font-bold tracking-widest uppercase hover:scale-[1.02] shadow-[0_0_30px_rgba(0,174,239,0.2)] hover:shadow-[0_0_50px_rgba(0,174,239,0.4)] transition-all">
                            Submit Request
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
