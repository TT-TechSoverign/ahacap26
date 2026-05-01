'use client';

import React from 'react';

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
        <section className="relative w-full bg-[#05070A] py-20 px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto flex flex-col gap-12">
                
                {/* Educational Block 1: Hitting Clusters 1, 2 & 3 (Affordability, Local, Oahu Broad) */}
                <div className="space-y-6">
                    <h2 className="font-header font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
                        Engineering Comfort for <span className="text-cyan-500">{city}</span> Homes
                    </h2>
                    <p className="font-sans text-lg text-slate-300 leading-relaxed font-medium">
                        When residents search for reliable, <strong>affordable air conditioning</strong> built for the islands, they quickly realize that standard off-the-shelf units won&apos;t survive. In {city}, your HVAC system is constantly battling {context.climateChallenge}. This unique micro-climate forces standard compressors to overwork, leading to high electricity bills and the inevitable need for <strong>ac repair near me</strong>. Instead of gambling with unvetted contractors, trust the established authority for <strong>air conditioning Oahu</strong> relies on.
                    </p>
                </div>

                {/* Educational Block 2: Hitting Clusters 4 & 5 (Products, Split Systems, Inverters) */}
                <div className="space-y-6">
                    <p className="font-sans text-lg text-slate-300 leading-relaxed font-medium">
                        At Affordable Home A/C, we don&apos;t just sell boxes from a local <strong>ac shop</strong>; we deploy specialized cooling infrastructure. When island residents look for the most efficient <strong>split ac units Hawaii</strong> has to offer, they trust our dedicated team. Whether you need a premium <strong>dual inverter air conditioner</strong> for a single room, or the seamless <strong>split ac installation Oahu</strong> homes require for whole-house cooling, we utilize {context.techFocus} so your system is equipped to {context.benefit}
                    </p>
                </div>

                {/* Educational Block 3: The Deep Cleaning Necessity (Maintenance Intent) */}
                <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 relative overflow-hidden mt-4 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />
                    
                    <h3 className="font-header font-black text-2xl text-white uppercase mb-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-cyan-400">warning</span>
                        The Silent Threat: Salt Air & Mold
                    </h3>
                    <p className="font-sans text-base text-slate-400 leading-relaxed">
                        Did you know that the humidity in {city} can cause toxic mold to grow deep inside your unit? Combined with silent salt-air corrosion, an unmaintained system quickly becomes a health hazard and leads to unexpected breakdowns. Whether you need urgent <strong>air conditioning repair Oahu</strong> homeowners trust, routine <strong>affordable ac maintenance</strong>, or a comprehensive <strong>split ac service</strong>, our licensed technicians are ready. Our intensive <strong>window ac cleaning service</strong> and ductless sanitization protocols destroy mold at the root and apply specialized corrosion inhibitors to extend the life of your equipment.
                    </p>
                </div>

                {/* Trust & Guarantee Section: Reinforcing the Local Entity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-4">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                        <span className="material-symbols-outlined text-cyan-500 text-4xl">local_shipping</span>
                        <h4 className="font-header font-black text-xl text-white uppercase">Fast Dispatch</h4>
                        <p className="text-sm text-slate-400 font-medium">We maintain a localized fleet ready to service the {city} area swiftly and professionally.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                        <span className="material-symbols-outlined text-cyan-500 text-4xl">inventory_2</span>
                        <h4 className="font-header font-black text-xl text-white uppercase">Local Inventory</h4>
                        <p className="text-sm text-slate-400 font-medium">No waiting for mainland freight. We stock premium LG & GE units on-island for immediate deployment.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                        <span className="material-symbols-outlined text-cyan-500 text-4xl">verified</span>
                        <h4 className="font-header font-black text-xl text-white uppercase">Licensed Professionals</h4>
                        <p className="text-sm text-slate-400 font-medium">Fully licensed, bonded, and insured. Oahu&apos;s trusted HVAC contractor for over 20 years.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
