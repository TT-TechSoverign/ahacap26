'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Sparkles, 
    Zap, 
    Shield, 
    Check, 
    X,
    ArrowRight, 
    DollarSign, 
    Scale, 
    HelpCircle, 
    ChevronDown, 
    Wrench, 
    Clock, 
    Droplets, 
    CheckCircle2, 
    AlertCircle, 
    ShoppingCart, 
    FileText,
    Warehouse,
    Phone
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function WindowAcVsMiniSplitPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [selectedRoomSize, setSelectedRoomSize] = useState<'single' | 'whole_home'>('single');

    const comparisonData = [
        {
            feature: "Upfront Installed Cost",
            windowAc: "$504 – $922 (Equipment + $0 deposit install option)",
            miniSplit: "$3,800 – $7,500+ per zone installed",
            winner: "window",
            note: "Window AC saves $3,000–$6,500 upfront per room."
        },
        {
            feature: "Monthly HECO Power Cost (44.2¢/kWh)",
            windowAc: "~$38 – $55 / month (Dual Inverter variable speed)",
            miniSplit: "~$32 – $48 / month (High SEER2 inverter)",
            winner: "tie",
            note: "Dual Inverter technology eliminates the old efficiency gap."
        },
        {
            feature: "Installation Lead Time",
            windowAc: "Same-Day / 24–48 Hrs (In-stock in Waipahu)",
            miniSplit: "1 – 3 Weeks (Permits, 240V lines, line-set boring)",
            winner: "window",
            note: "Window AC provides immediate heat relief."
        },
        {
            feature: "Architectural & HOA Impact",
            windowAc: "Mounts in window with custom acrylic baffle",
            miniSplit: "Requires exterior condenser, wall hole, and lineset hide",
            winner: "tie",
            note: "Many Oahu condos restrict exterior condenser placement."
        },
        {
            feature: "Hawaii Energy Rebate",
            windowAc: "$45 Instant/Mail-In Cash Rebate (Pre-approved PDF)",
            miniSplit: "0% Rebate Participation (Transparent direct pricing)",
            winner: "window",
            note: "Official AHAC window AC cash rebate form included."
        },
        {
            feature: "Salt-Air & Mold Maintenance",
            windowAc: "Easy removal for $275 full teardown immersion cleaning",
            miniSplit: "Requires on-wall $175–$275 bag cleaning & coil flush",
            winner: "tie",
            note: "Both require annual deep cleaning in Oahu's 74% humidity."
        }
    ];

    const faqItems = [
        {
            q: "Is a mini-split really more energy efficient than an LG Dual Inverter window AC?",
            a: "Historically, standard window ACs ran at fixed high speeds and consumed massive electricity. However, modern LG Dual Inverter window ACs utilize the exact same twin-rotary inverter technology as mini-split compressors. Operating at variable speeds, an LG Dual Inverter uses up to 40% less electricity than standard window units, resulting in a monthly HECO operating cost difference of just $6–$10 compared to a ductless mini split."
        },
        {
            q: "Why does a mini-split installation cost $4,000+ on Oahu?",
            a: "A ductless mini split requires installing an outdoor condenser pad/bracket, running high-voltage 208/240V wiring from your main electrical panel, drilling a 3-inch penetration through exterior walls, pulling and flaring copper refrigerant lines, vacuum-testing the lineset, and brazing. On Oahu, electrician and HVAC contractor labor rates plus permitting make standard mini split installs run between $3,800 and $7,500 per zone."
        },
        {
            q: "Can I install an LG Dual Inverter window AC in Hawaii jalousie windows?",
            a: "Yes! Over 60% of homes on Oahu feature jalousie louver windows. Our licensed CT-36775 technicians remove only the necessary glass louvers, precision-cut marine-grade clear acrylic baffles, and anchor the unit with heavy-duty cantilever exterior brackets so zero load rests on the aluminum jalousie frames."
        },
        {
            q: "When is a ductless mini-split the better choice?",
            a: "A ductless mini-split is the ideal choice if you have zero suitable windows (or only narrow casement windows that cannot be modified), if you are building an architectural new construction home with integrated wall aesthetics, or if you require whisper-silent cooling below 35 dB for a recording studio or high-end luxury master suite."
        },
        {
            q: "What is Affordable Home AC's rebate policy for both systems?",
            a: "For qualifying ENERGY STAR® window ACs (LG Dual Inverters), you receive our pre-approved official Hawaii Energy $45 cash rebate application form PDF. For our mini-split division, Affordable Home AC does not participate in third-party rebate programs, avoiding inflated equipment markups and voucher delays to give Oahu homeowners honest, upfront CT-36775 direct pricing."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "headline": "Window AC vs Mini Split Oahu: Honest Cost & Energy Comparison (2026)",
                "description": "Comprehensive guide comparing window air conditioners to ductless mini-split systems for Oahu homeowners. Upfront costs, HECO electric bills, installation speed, and rebates.",
                "author": {
                    "@type": "Organization",
                    "name": "Affordable Home AC",
                    "url": "https://www.affordablehome-ac.com"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Affordable Home AC",
                    "url": "https://www.affordablehome-ac.com"
                }
            },
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC",
                "telephone": "+1-808-488-1111",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leoleo St. #203",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "122",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
                    { "@type": "ListItem", "position": 2, "name": "Window AC vs Mini-Split", "item": "https://www.affordablehome-ac.com/window-ac-vs-mini-split-oahu" }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqItems.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] md:pt-[150px] pb-24">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Scale className="size-3.5" />
                        Oahu Cooling Decision Guide &bull; Licensed CT-36775
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Window AC <span className="text-primary">vs</span> Mini Split Oahu
                    </h1>
                    <p className="text-slate-300 font-header font-bold text-base sm:text-lg uppercase tracking-wide text-cyan-400">
                        Honest Cost, HECO Electric Bills &amp; Installation Comparison
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Should you install a ductless mini-split or buy an in-stock LG Dual Inverter window AC? We break down upfront hardware costs, Hawaiian Electric operating bills, installation lead times, and rebate realities.
                    </p>
                </div>

                {/* Quick Decision Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {/* Window AC Card */}
                    <div className="p-8 rounded-3xl bg-slate-900/70 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="size-3.5" /> Best for Immediate Budget &amp; Room Cooling
                            </div>
                            <h2 className="text-2xl font-header font-black uppercase text-white">
                                LG Dual Inverter Window AC
                            </h2>
                            <div className="font-mono text-xs text-slate-300 space-y-2 py-2">
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Upfront Equipment:</span>
                                    <span className="text-emerald-400 font-bold">$504 – $922</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Installation Deposit:</span>
                                    <span className="text-emerald-400 font-bold">$0.00 Upfront</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Lead Time:</span>
                                    <span className="text-white font-bold">Same-Day / 24–48 Hrs</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Cash Rebate:</span>
                                    <span className="text-emerald-400 font-bold">$45 Hawaii Energy PDF</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Ideal for single bedrooms, rentals, jalousie retrofits, and homeowners looking to cool their rooms immediately without spending $5,000+ per room.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Link 
                                href="/shop"
                                className="w-full py-3.5 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                            >
                                Shop In-Stock Units on Stripe <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Mini Split Card */}
                    <div className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                                <Shield className="size-3.5" /> Best for Whole-Home Architectural Value
                            </div>
                            <h2 className="text-2xl font-header font-black uppercase text-white">
                                Ductless Mini-Split System
                            </h2>
                            <div className="font-mono text-xs text-slate-300 space-y-2 py-2">
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Installed Cost:</span>
                                    <span className="text-purple-300 font-bold">$3,800 – $7,500+ / zone</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Acoustic Level:</span>
                                    <span className="text-white font-bold">Whisper Quiet (22–38 dB)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Installation Lead Time:</span>
                                    <span className="text-slate-300">1 – 3 Weeks</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="text-slate-400">Contractor License:</span>
                                    <span className="text-purple-300 font-bold">100% CT-36775 Guaranteed</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Ideal for primary residences undergoing full renovations, rooms without usable windows, and homeowners who prioritize seamless wall aesthetics.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Link 
                                href="/mini-split-estimate"
                                className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                                Get Free In-Home Estimate ($0 Deposit) <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Comprehensive Feature-by-Feature Table */}
                <div className="p-6 sm:p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl mb-20 overflow-x-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-header font-black uppercase text-white">
                                Head-to-Head Architectural &amp; Operational Comparison
                            </h3>
                            <p className="text-slate-400 text-xs mt-1">Direct contractor analysis for Oahu residential properties</p>
                        </div>
                    </div>
                    <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase">
                                <th className="py-3 px-4">Evaluation Factor</th>
                                <th className="py-3 px-4 text-cyan-400">LG Dual Inverter Window AC</th>
                                <th className="py-3 px-4 text-purple-400">Ductless Mini Split System</th>
                                <th className="py-3 px-4 text-slate-400">Oahu Climate Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            {comparisonData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 px-4 font-bold text-white">
                                        {row.feature}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="font-bold text-slate-200">{row.windowAc}</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="font-bold text-slate-200">{row.miniSplit}</div>
                                    </td>
                                    <td className="py-4 px-4 text-slate-400 text-[11px]">
                                        {row.note}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* The Electricity Truth Box: Hawaiian Electric Calculations */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-black border border-white/10 shadow-2xl mb-20">
                    <div className="max-w-3xl space-y-4">
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                            <Zap className="size-4" /> The Hawaiian Electric Baseline Truth
                        </div>
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            Does a Mini Split Save Enough on HECO to Justify $5,000+ Extra?
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Under Oahu&apos;s current residential electric rate of <strong>~44.2¢ per kWh</strong>, electricity efficiency is paramount. However, because modern LG Dual Inverter window ACs use variable-frequency compressor technology, the annual operating cost difference between a Dual Inverter window AC and a ductless mini-split is typically only <strong>$60 to $110 per year</strong>.
                        </p>
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1.5 text-slate-300">
                            <div>&bull; <strong>Mini Split (20 SEER2)</strong>: ~$420 / yr in electrical energy (8 hrs/day nightly bedroom cooling)</div>
                            <div>&bull; <strong>LG Dual Inverter (15.0 CEER)</strong>: ~$510 / yr in electrical energy</div>
                            <div className="text-emerald-400 font-bold pt-1">
                                &bull; Net Annual Savings with Mini Split: ~$90 / year
                            </div>
                            <div className="text-slate-400 text-[11px]">
                                &bull; Payback Period to recoup $4,500 upfront installation premium: <strong>50 Years</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-header font-black uppercase text-white">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">Honest answers to common Oahu homeowner dilemmas</p>
                    </div>
                    {faqItems.map((faq, index) => (
                        <div 
                            key={index}
                            className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-cyan-400 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === index ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                            </button>
                            {activeFaq === index && (
                                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Dual Path Conversion Banner */}
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 text-center space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                        Which Cooling Pathway is Right for Your Oahu Home?
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Whether you want an in-stock LG Dual Inverter window unit today or a licensed in-home mini-split estimate, Affordable Home AC delivers licensed CT-36775 workmanship.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/shop"
                            className="px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <ShoppingCart className="size-4" />
                            Buy In-Stock Window AC on Stripe
                        </Link>
                        <Link
                            href="/mini-split-estimate"
                            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-header font-bold text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2"
                        >
                            <Wrench className="size-4 text-purple-400" />
                            Schedule Free Mini-Split Estimate
                        </Link>
                    </div>
                </div>
            </main>
            <BackToTop />
        </div>
    );
}
