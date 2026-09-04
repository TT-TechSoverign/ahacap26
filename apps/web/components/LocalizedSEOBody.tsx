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
                                In {city}, your HVAC system is constantly battling <strong>{context.climateChallenge}</strong>. This unique micro-climate forces standard compressors to overwork, leading to high electricity bills and the inevitable need for <Link href="/ac-repair" className="font-bold text-[#00E5FF] hover:underline">ac repair near me</Link>.
                            </p>
                            <p>
                                Instead of gambling with unvetted contractors, trust the established authority for <Link href="/" className="font-bold text-[#00E5FF] hover:underline">air conditioning Oahu</Link> relies on.
                            </p>
                        </div>
                    </div>

                    {/* Educational Block 2: Hitting Clusters 4 & 5 (Products, Split Systems, Inverters) */}
                    <div className="p-8 rounded-sm bg-slate-900 border border-slate-800 hover:border-[#00E5FF]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h3 className="font-header font-black text-xl md:text-2xl text-white uppercase mb-6 flex items-center gap-3 tracking-widest relative z-10">
                            <LucideIcons.Settings className="w-6 h-6 text-[#00E5FF]" />
                            Specialized Cooling
                        </h3>
                        <div className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light relative z-10 space-y-4">
                            <p>
                                At Affordable Home A/C, we don&apos;t just sell boxes from a local <Link href="/shop" className="font-bold text-[#00E5FF] hover:underline">ac shop</Link>; we deploy specialized cooling infrastructure designed to last.
                            </p>
                            <p>
                                When island residents look for the most efficient <Link href="/mini_split_ac" className="font-bold text-[#00E5FF] hover:underline">split ac units Hawaii</Link> has to offer, they trust our dedicated team. Whether you need a premium <Link href="/shop#dual_inverter" className="font-bold text-[#00E5FF] hover:underline">dual inverter air conditioner</Link> for a single room, or the seamless <Link href={`/contact?city=${city}&service=Mini+Split+Estimate+(New)`} className="font-bold text-[#00E5FF] hover:underline">split ac installation Oahu</Link> homes require for whole-house cooling.
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
                            Did you know that the humidity in {city} can cause toxic mold to grow deep inside your unit? Combined with silent salt-air corrosion, an unmaintained system quickly becomes a health hazard and leads to unexpected breakdowns. 
                        </p>
                        <p>
                            Whether you need urgent <Link href="/ac-repair" className="font-bold text-[#00E5FF] hover:underline">air conditioning repair Oahu</Link> homeowners trust, routine <Link href="/mini_split_ac_maintenance" className="font-bold text-[#00E5FF] hover:underline">affordable ac maintenance</Link>, or a comprehensive <Link href="/mini_split_ac_maintenance" className="font-bold text-[#00E5FF] hover:underline">split ac service</Link>, our licensed technicians are ready. 
                        </p>
                        <p>
                            Our intensive <Link href="/window_ac_maintenance" className="font-bold text-[#00E5FF] hover:underline">window ac cleaning service</Link> and ductless sanitization protocols destroy mold at the root and apply specialized corrosion inhibitors to extend the life of your equipment.
                        </p>
                    </div>
                </div>

                {/* Trust & Guarantee Section: Reinforcing the Local Entity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-800/50 mt-4">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                        <LucideIcons.Truck className="w-10 h-10 text-[#00E5FF] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                        <h4 className="font-header font-black text-lg text-white uppercase tracking-widest">Fast Dispatch</h4>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">We maintain a localized fleet ready to service the {city} area swiftly and professionally.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                        <LucideIcons.Package className="w-10 h-10 text-[#00E5FF] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                        <h4 className="font-header font-black text-lg text-white uppercase tracking-widest">Local Inventory</h4>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">No waiting for mainland freight. We stock premium LG & GE units on-island for immediate deployment.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                        <LucideIcons.ShieldCheck className="w-10 h-10 text-[#00E5FF] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                        <h4 className="font-header font-black text-lg text-white uppercase tracking-widest">Licensed Professionals</h4>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">Fully licensed, bonded, and insured. Oahu&apos;s trusted HVAC contractor for over 20 years.</p>
                    </div>
                </div>

                {/* Localized FAQ Accordion Block */}
                <div className="pt-12 border-t border-slate-800/50 mt-4">
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <LucideIcons.HelpCircle className="size-5 text-[#00E5FF]" />
                            <h3 className="font-header font-black uppercase text-sm tracking-wider text-white">Frequently Asked Questions for {city} Residents</h3>
                        </div>

                        <div className="space-y-4 font-sans">
                            {[
                                {
                                    q: `What is the most efficient AC unit for ${city}'s high humidity?`,
                                    a: `For ${city}'s tropical climate, we highly recommend systems with variable-speed inverter compressors, such as the LG Dual Inverter window AC or a Mitsubishi mini-split. These systems adjust cooling capacity dynamically, which keeps energy bills low while continuously pulling moisture out of the air to maintain a dry, comfortable indoor environment.`
                                },
                                {
                                    q: `How often do window and split AC systems need cleaning in ${city}?`,
                                    a: `Due to ${city}'s salt-air exposure and humidity, we recommend a professional deep clean every 6 to 12 months. Regular maintenance cleanings remove accumulated mold, dust, and coastal salt deposits, restoring airflow efficiency by up to 30% and extending your system's life.`
                                },
                                {
                                    q: `Does Affordable Home A/C deliver products and dispatch technicians to ${city}?`,
                                    a: `Yes! We provide full on-site dispatch of licensed technicians for ductless split AC installations, sizing estimates, and mini-split cleaning directly to ${city}. For window AC units, we provide professional full teardown cleaning ($275 flat rate) at our Waipahu warehouse, as well as Oahu flat-rate $50 delivery or free local pickup on new window AC purchases.`
                                }
                            ].map((faq, idx) => (
                                <details 
                                    key={idx} 
                                    className="group border-b border-slate-800 last:border-0 pb-4 last:pb-0"
                                >
                                    <summary className="flex items-center justify-between text-left font-header font-black uppercase text-xs md:text-sm text-slate-200 tracking-wider hover:text-[#00E5FF] transition-colors cursor-pointer list-none py-2 select-none focus:outline-none">
                                        <span>{faq.q}</span>
                                        <LucideIcons.ChevronDown className="size-4 text-slate-400 group-open:rotate-180 group-open:text-[#00E5FF] transition-transform duration-300 shrink-0 ml-4" />
                                    </summary>
                                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans pt-2 pl-1 max-w-4xl">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
