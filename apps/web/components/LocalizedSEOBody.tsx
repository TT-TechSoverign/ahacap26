'use client';

import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

interface SEOBodyProps {
    city: string;
    regionId: string; // 'central', 'metro', 'leeward', or 'windward'
}

export default function LocalizedSEOBody({ city, regionId }: SEOBodyProps) {
    
    // DYNAMIC PERSONALIZATION LOGIC (Anti-Duplicate Content)
    // We alter the HVAC diagnosis narrative based on the micro-climate of the region.
    const getRegionalContext = () => {
        switch(regionId) {
            case 'leeward':
                return {
                    climateChallenge: "intense afternoon sun and dry, relentless heat",
                    techFocus: "high-capacity cooling blocks and UV-resistant chassis designs",
                    benefit: "rapidly pull down temperatures during peak afternoon hours without spiking your HECO bill."
                };
            case 'windward':
                return {
                    climateChallenge: "constant trade winds pushing corrosive salt air and heavy moisture",
                    techFocus: "Gold-Fin anti-corrosion coatings and extreme dehumidification cycles",
                    benefit: "protect your investment from premature rusting and eliminate indoor mold growth."
                };
            case 'metro':
                return {
                    climateChallenge: "urban heat island effects and dense neighborhood spacing",
                    techFocus: "ultra-quiet Dual Inverter compressors and compact high-efficiency systems",
                    benefit: "deliver whisper-quiet operation so you can sleep perfectly without disturbing your neighbors."
                };
            case 'central':
            default:
                return {
                    climateChallenge: "fluctuating upland temperatures and trapped valley humidity",
                    techFocus: "precision variable-speed drives and automated climate sensors",
                    benefit: "maintain a stable, crisp indoor environment while dramatically lowering monthly power consumption."
                };
        }
    };

    const context = getRegionalContext();

    return (
        <section data-version="v28.2" className="relative w-full bg-[#0F172A] py-20 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto flex flex-col gap-12">
                
                <div className="text-center mb-4">
                    <h2 className="font-header font-black text-3xl md:text-4xl text-white uppercase tracking-tight drop-shadow-lg">
                        Dedicated AC Services for <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">{city}</span> Homes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Educational Block 1: Hitting Clusters 1, 2 & 3 (Affordability, Local, Oahu Broad) */}
                    <div className="p-8 rounded-sm bg-slate-900 border border-slate-800 hover:border-[#00E5FF]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h3 className="font-header font-black text-xl md:text-2xl text-white uppercase mb-6 flex items-center gap-3 tracking-widest relative z-10">
                            <LucideIcons.ThermometerSun className="w-6 h-6 text-[#00E5FF]" />
                            Climate Adaptation
                        </h3>
                        <div className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light relative z-10 space-y-4">
                            <p>
                                When residents search for reliable, <Link href="/contact" className="font-bold text-[#00E5FF] hover:underline">affordable air conditioning</Link> built for the islands, they quickly realize that standard off-the-shelf units won&apos;t survive. 
                            </p>
                            <p>
                                In {city}, your HVAC system is constantly battling <strong>{context.climateChallenge}</strong>. This unique micro-climate forces standard compressors to overwork, leading to high electricity bills and the inevitable need for <Link href="/ac-repair-oahu" className="font-bold text-[#00E5FF] hover:underline">ac repair near me</Link>.
                            </p>
                            <p>
                                Instead of gambling with unvetted installers, trust the established specialists for <Link href="/" className="font-bold text-[#00E5FF] hover:underline">air conditioning Oahu</Link> relies on.
                            </p>
                        </div>
                    </div>

                    {/* Educational Block 2: Hitting Clusters 4 & 5 (Products, Dual Inverters, Thru-The-Wall) */}
                    <div className="p-8 rounded-sm bg-slate-900 border border-slate-800 hover:border-[#00E5FF]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h3 className="font-header font-black text-xl md:text-2xl text-white uppercase mb-6 flex items-center gap-3 tracking-widest relative z-10">
                            <LucideIcons.Settings className="w-6 h-6 text-[#00E5FF]" />
                            Specialized Cooling
                        </h3>
                        <div className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light relative z-10 space-y-4">
                            <p>
                                At Affordable Home A/C, we don&apos;t just sell boxes from a local <Link href="/shop" className="font-bold text-[#00E5FF] hover:underline">ac shop</Link>; we deploy specialized LG &amp; GE cooling units built for Hawaii&apos;s climate.
                            </p>
                            <p>
                                When island residents look for the most efficient <Link href="/shop" className="font-bold text-[#00E5FF] hover:underline">window ac units Hawaii</Link> has to offer, they trust our dedicated Waipahu warehouse team. Whether you need a whisper-quiet <Link href="/shop/lg-dual-inverter-guide" className="font-bold text-[#00E5FF] hover:underline">dual inverter air conditioner</Link> for a bedroom or living area, or custom <Link href={`/window-ac-installation?city=${encodeURIComponent(city)}`} prefetch={false} className="font-bold text-[#00E5FF] hover:underline">window ac installation Oahu</Link> homes require for jalousie louvers and 26&quot; wall sleeves.
                            </p>
                            <p>
                                We utilize <strong>{context.techFocus}</strong> so your system is equipped to {context.benefit}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Educational Block 3: The Deep Cleaning Necessity (Maintenance Intent) */}
                <div className="p-8 rounded-sm bg-slate-900 border border-slate-800 hover:border-[#00E5FF]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 relative overflow-hidden group mt-4">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00E5FF]/5 to-transparent blur-[30px] pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100" />
                    
                    <h3 className="font-header font-black text-xl md:text-2xl text-white uppercase mb-6 flex items-center gap-3 tracking-widest relative z-10">
                        <LucideIcons.AlertTriangle className="w-6 h-6 text-[#00E5FF]" />
                        The Silent Threat: Salt Air & Mold
                    </h3>
                    <div className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light relative z-10 space-y-4">
                        <p>
                            Did you know that the humidity in {city} can cause toxic mold to grow deep inside your unit? Combined with silent salt-air corrosion, an unmaintained window AC quickly becomes a health hazard and leads to unexpected breakdowns. 
                        </p>
                        <p>
                            Whether you need urgent <Link href="/ac-repair-oahu" className="font-bold text-[#00E5FF] hover:underline">air conditioning troubleshooting Oahu</Link> homeowners trust, routine <Link href="/ac-cleaning-oahu" className="font-bold text-[#00E5FF] hover:underline">affordable window ac cleaning</Link>, or a comprehensive <Link href="/seasonal-ac-maintenance-plans-oahu" className="font-bold text-[#00E5FF] hover:underline">window ac maintenance plan</Link>, our Oahu specialists are ready. 
                        </p>
                        <p>
                            Our <Link href="/clean-vs-replace-window-ac" className="font-bold text-[#00E5FF] hover:underline">clean vs replace guidance</Link> and window AC sanitization protocols clear mold, dust, and salt-air buildup to restore crisp airflow and extend the life of your equipment.
                        </p>
                    </div>
                </div>

                {/* First-Hand Oahu Engineering & BTU Dual-Sizing Matrix (E-E-A-T Information Gain) */}
                <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-cyan-500/20 shadow-xl mt-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                        <div>
                            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                                Island Microclimate Calibration™ • HECO ~44.2¢/kWh Verified
                            </span>
                            <h3 className="font-header font-black text-xl md:text-2xl text-white uppercase tracking-tight">
                                {city} Window AC Dual-Sizing &amp; In-Stock Model Guide
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            <Link
                                href="/shop"
                                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider transition-all"
                            >
                                Order Window AC ($395–$1,200) &rarr;
                            </Link>
                            <Link
                                href="/ac-cleaning-oahu"
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 font-header font-bold text-xs uppercase tracking-wider transition-all"
                            >
                                Book Window AC Cleaning &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm font-sans">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                                    <th className="py-3 pr-4">Room Type in {city}</th>
                                    <th className="py-3 px-4">Oahu Single-Wall Sq. Ft.</th>
                                    <th className="py-3 px-4">Recommended LG / GE Model</th>
                                    <th className="py-3 pl-4">Rebate &amp; HECO Impact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/70 text-slate-300">
                                <tr>
                                    <td className="py-3.5 pr-4 font-bold text-white">Bedroom / Home Office</td>
                                    <td className="py-3.5 px-4">120 – 280 sq. ft. (6k–8k BTU)</td>
                                    <td className="py-3.5 px-4">
                                        <Link href="/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm" className="text-cyan-400 hover:underline font-semibold">
                                            LG LW8022IVSM (8,000 BTU 115V)
                                        </Link>
                                    </td>
                                    <td className="py-3.5 pl-4 text-emerald-400 font-medium">$45 Rebate • 44dB Sleep-Quiet</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 pr-4 font-bold text-white">Master Bedroom / Studio</td>
                                    <td className="py-3.5 px-4">280 – 450 sq. ft. (10k–12k BTU)</td>
                                    <td className="py-3.5 px-4">
                                        <Link href="/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm" className="text-cyan-400 hover:underline font-semibold">
                                            LG LW1222IVSM (12,000 BTU 115V)
                                        </Link>
                                    </td>
                                    <td className="py-3.5 pl-4 text-emerald-400 font-medium">$45 Rebate • Saves ~$424/yr</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 pr-4 font-bold text-white">26&quot; Condo Thru-the-Wall Sleeve</td>
                                    <td className="py-3.5 px-4">250 – 450 sq. ft. (8.2k–12k BTU)</td>
                                    <td className="py-3.5 px-4">
                                        <Link href="/shop/15-ge-12-000-btu-ajcq12axxwa" className="text-cyan-400 hover:underline font-semibold">
                                            GE AJCQ12AXXWA (R-32 Inverter)
                                        </Link>
                                    </td>
                                    <td className="py-3.5 pl-4 text-cyan-300 font-medium">True 26&quot; Wall Sleeve Fit</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 pr-4 font-bold text-white">Living Room / Open Layout</td>
                                    <td className="py-3.5 px-4">500 – 1,000+ sq. ft. (18k–23.5k BTU)</td>
                                    <td className="py-3.5 px-4">
                                        <Link href="/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm" className="text-cyan-400 hover:underline font-semibold">
                                            LG LW1822IVSM (18,000 BTU 230V)
                                        </Link>
                                    </td>
                                    <td className="py-3.5 pl-4 text-emerald-400 font-medium">$45 Rebate • Heavy Dehumidification</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Trust & Standards Section: Reinforcing the Local Entity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-800/50 mt-4">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                        <LucideIcons.Truck className="w-10 h-10 text-[#00E5FF] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                        <h4 className="font-header font-black text-lg text-white uppercase tracking-widest">Fast Dispatch</h4>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">We maintain a localized fleet ready to service the {city} area with protective floor drop cloths and $0 Free In-Home Estimates.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                        <LucideIcons.Package className="w-10 h-10 text-[#00E5FF] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                        <h4 className="font-header font-black text-lg text-white uppercase tracking-widest">Waipahu Warehouse</h4>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">16 LG &amp; GE models ($395–$1,200) stocked at 94-150 Leoleo St. #203, Waipahu for free pickup by appointment or $50 {city} delivery.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                        <LucideIcons.ShieldCheck className="w-10 h-10 text-[#00E5FF] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                        <h4 className="font-header font-black text-lg text-white uppercase tracking-widest">Trusted Since 2005</h4>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">Waipahu Warehouse Direct &bull; Insured Oahu Cooling Specialists &bull; Est. 2005 (4.9★ across 142 Oahu homeowner reviews).</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
