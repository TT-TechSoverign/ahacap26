'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Download, 
    FileCheck2, 
    Zap, 
    DollarSign, 
    ShieldCheck, 
    AlertCircle, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    Truck, 
    ChevronDown, 
    Sparkles, 
    Phone,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';

const REBATE_PDF_URL = '/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf';

const QUALIFYING_MODELS = [
    {
        btu: '6,000 BTU',
        model: 'LW6023IVSM',
        coverage: 'Up to 250 sq. ft. (Bedrooms)',
        efficiency: 'CEER 11.5 • Ultra-Quiet 44 dB',
        price: '$504',
        rebatePrice: '$459 after $45 rebate',
        voltage: '115V / 15A Standard Plug',
    },
    {
        btu: '8,000 BTU',
        model: 'LW8022IVSM',
        coverage: 'Up to 350 sq. ft. (Master Bedrooms)',
        efficiency: 'CEER 12.0 • Ultra-Quiet 44 dB',
        price: '$545',
        rebatePrice: '$500 after $45 rebate',
        voltage: '115V / 15A Standard Plug',
    },
    {
        btu: '10,000 BTU',
        model: 'LW1022IVSM',
        coverage: 'Up to 450 sq. ft. (Living Rooms)',
        efficiency: 'CEER 12.0 • Dual Inverter',
        price: '$614',
        rebatePrice: '$569 after $45 rebate',
        voltage: '115V / 15A Standard Plug',
    },
    {
        btu: '12,000 BTU',
        model: 'LW1222IVSM',
        coverage: 'Up to 550 sq. ft. (Open Living Areas)',
        efficiency: 'CEER 12.0 • Dual Inverter',
        price: '$670',
        rebatePrice: '$625 after $45 rebate',
        voltage: '115V / 15A Standard Plug',
    },
    {
        btu: '14,000 BTU',
        model: 'LW1522FVSM',
        coverage: 'Up to 700 sq. ft. (Large Open Suites)',
        efficiency: 'CEER 11.8 • Dual Inverter',
        price: '$759',
        rebatePrice: '$714 after $45 rebate',
        voltage: '115V / 15A Standard Plug',
    },
    {
        btu: '18,000 BTU',
        model: 'LW1822IVSM',
        coverage: 'Up to 1,000 sq. ft. (Whole Floor Plans)',
        efficiency: 'CEER 11.8 • Heavy-Duty 230V',
        price: '$890',
        rebatePrice: '$845 after $45 rebate',
        voltage: '208/230V 15A Circuit',
    },
    {
        btu: '23,500 BTU',
        model: 'LW2422IVSM',
        coverage: 'Up to 1,400 sq. ft. (High Ceilings)',
        efficiency: 'CEER 10.4 • Max Capacity',
        price: '$1,025',
        rebatePrice: '$980 after $45 rebate',
        voltage: '208/230V 20A Circuit',
    }
];

const FAQS = [
    {
        q: "What is the exact amount of the Hawaii Energy window AC rebate?",
        a: "The Hawaii Energy rebate is exactly $45 for qualifying Energy Star certified room window air conditioners. It comes as a direct cash rebate check mailed to your Oahu address or credited via your HECO account."
    },
    {
        q: "Are mini-split air conditioners eligible for this rebate?",
        a: "No. This program is strictly for qualifying Energy Star window AC units. Hawaii Energy offers 0% cash rebates for residential ductless mini-split systems on Oahu. At Affordable Home A/C, we provide transparent, honest CT-36775 direct contractor pricing rather than inflating initial quotes."
    },
    {
        q: "Do I get the official pre-approved rebate application with my purchase?",
        a: "Yes! Affordable Home A/C provides our official pre-approved Hawaii Energy Rebate Application (Version 4) with every eligible in-stock window unit purchase. You can also download the application form right here on this page."
    },
    {
        q: "What documentation do I need to submit with the rebate form?",
        a: "You simply need: (1) Your completed Hawaii Energy application form with your HECO electric account number, and (2) Your itemized purchase receipt from Affordable Home A/C showing the qualifying Energy Star model number and purchase date."
    },
    {
        q: "How can I purchase an eligible unit today?",
        a: "You can purchase directly online through our Shop. Select Free Waipahu Warehouse Pickup (by appointment at 94-150 Leoleo St #203) or flat-rate $50 island-wide delivery from Hawaii Kai to Haleiwa."
    }
];

export default function HawaiiEnergyRebatePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleDownloadPdf = () => {
        trackFunnelEvent('download_rebate_pdf', {
            document: 'Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf',
            rebate_amount: 45
        });
    };

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Visual Breadcrumb Navigation */}
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Hawaii Energy $45 Rebate' }]} />
                </div>

                {/* Hero Section */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="size-3.5" />
                        <span>Official Hawaii Energy Retail Partner • Energy Star Certified</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        $45 Hawaii Energy <span className="text-primary italic">Window AC</span> Cash Rebate
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Upgrade your Oahu home to an ultra-efficient LG Dual Inverter window air conditioner and claim an official <strong className="text-white">$45 cash rebate</strong> from Hawaii Energy. Cut your monthly HECO electric bill up to 40% while staying ice-cold.
                    </p>

                    {/* Dual Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href={REBATE_PDF_URL}
                            download="Affordable-Home-AC-Hawaii-Energy-Rebate-Form.pdf"
                            onClick={handleDownloadPdf}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Download className="size-4" />
                            Download Pre-Approved Rebate PDF ($45)
                        </a>
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            Shop Qualifying In-Stock Units
                            <ArrowRight className="size-4 text-primary" />
                        </Link>
                    </div>

                    <p className="text-[11px] font-mono text-slate-400 mt-4">
                        Official Form: Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4 &bull; Hawaii Energy Pre-Approved
                    </p>
                </section>

                {/* Important Policy Guardrail / Scope Notice */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                            <div className="flex items-center gap-2 text-emerald-400 font-header font-bold text-base uppercase mb-2">
                                <CheckCircle2 className="size-5 shrink-0" />
                                Window AC Units: $45 Cash Rebate
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                Applies to all qualifying Energy Star certified room window air conditioners. Every eligible LG Dual Inverter purchased through Affordable Home A/C comes with the required documentation for instant qualification.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                            <div className="flex items-center gap-2 text-amber-400 font-header font-bold text-base uppercase mb-2">
                                <AlertCircle className="size-5 shrink-0" />
                                Mini-Split Systems: Direct Pricing Overview
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                Hawaii Energy currently offers <strong className="text-white">0% cash rebates</strong> for residential ductless mini-split systems. We do not participate in deceptive inflated contractor quotes—we provide honest direct CT-36775 contractor pricing.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4 Simple Steps to Claim */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            How to Claim Your $45 Rebate Check
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">Zero hassle. Direct cash back to your household.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                step: "01",
                                title: "Buy Qualifying Unit",
                                desc: "Choose any Energy Star LG Dual Inverter from our Waipahu warehouse inventory ($504 to $1,025)."
                            },
                            {
                                step: "02",
                                title: "Get Pre-Approved PDF",
                                desc: "Receive the official pre-approved application form PDF with your itemized purchase receipt."
                            },
                            {
                                step: "03",
                                title: "Enter HECO Account",
                                desc: "Fill in your Hawaiian Electric residential account number and installation address."
                            },
                            {
                                step: "04",
                                title: "Receive $45 Check",
                                desc: "Submit via mail or online portal and receive your $45 rebate check directly from Hawaii Energy."
                            }
                        ].map((s, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative">
                                <span className="text-3xl font-header font-black text-primary/40 block mb-2">{s.step}</span>
                                <h3 className="font-header font-bold text-base uppercase text-white mb-2">{s.title}</h3>
                                <p className="text-xs text-slate-300 leading-relaxed font-sans">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* In-Stock Qualifying Units Grid */}
                <section className="mb-16">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-1">
                                WAREHOUSE INVENTORY &bull; WAIPAHU, HI
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                                In-Stock Qualifying Window AC Models
                            </h2>
                        </div>
                        <Link 
                            href="/shop"
                            className="text-xs font-mono font-bold text-primary hover:underline flex items-center gap-1.5"
                        >
                            View Full 16-Model Catalog <ArrowRight className="size-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {QUALIFYING_MODELS.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] font-bold uppercase">
                                            {item.btu}
                                        </span>
                                        <span className="font-mono text-xs text-emerald-400 font-bold">
                                            $45 Rebate Eligible
                                        </span>
                                    </div>
                                    <h3 className="font-header font-bold text-lg uppercase text-white mb-1">
                                        LG Dual Inverter {item.model}
                                    </h3>
                                    <p className="text-xs text-slate-300 mb-3">{item.coverage}</p>
                                    <div className="space-y-1 text-[11px] font-mono text-slate-400 mb-4 border-t border-white/5 pt-3">
                                        <div>&bull; {item.efficiency}</div>
                                        <div>&bull; {item.voltage}</div>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex items-baseline justify-between mb-3">
                                        <span className="text-xl font-header font-black text-white">{item.price}</span>
                                        <span className="text-xs font-mono text-emerald-400 font-semibold">{item.rebatePrice}</span>
                                    </div>
                                    <Link 
                                        href="/shop"
                                        className="w-full py-2.5 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                                    >
                                        Select in Shop
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Warehouse & Fulfillment Proof */}
                <section className="mb-16 p-8 rounded-3xl bg-surface-dark border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                                NO SHIPPING DELAYS &bull; CENTRAL OAHU PICKUP
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight mb-4">
                                Waipahu Warehouse Pickup or $50 Island Delivery
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                                Skip the mainland shipping wait and big-box store lines. Our central Oahu warehouse stocks units ready for immediate deployment. Every unit is unboxed and factory inspected by our technicians.
                            </p>
                            <div className="space-y-3 font-mono text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Warehouse className="size-4 text-primary shrink-0" />
                                    <span><strong>Waipahu Warehouse:</strong> 94-150 Leoleo St #203 (Pickup by appointment)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="size-4 text-primary shrink-0" />
                                    <span><strong>Island Delivery:</strong> Flat $50 anywhere on Oahu (Hawaii Kai to North Shore)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                                    <span><strong>License CT-36775:</strong> Full 1-Year Manufacturer Warranty + Local Support</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col justify-center items-center">
                            <FileText className="size-12 text-primary mb-4" />
                            <h3 className="font-header font-bold text-lg uppercase text-white mb-2">
                                Need Assistance With Your Rebate?
                            </h3>
                            <p className="text-xs text-slate-300 mb-6 max-w-sm">
                                Our Waipahu office staff will gladly help verify your model eligibility and assist you in completing the Hawaii Energy paperwork.
                            </p>
                            <TrackedPhoneLink 
                                phone="8084881111"
                                display="(808) 488-1111"
                                eventLabel="Hawaii Energy Rebate Call"
                                className="px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Hawaii Energy Rebate FAQs
                        </h2>
                        <p className="text-slate-400 text-xs mt-1">Clear answers to your energy rebate questions</p>
                    </div>

                    <div className="space-y-3 max-w-3xl mx-auto">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-primary transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Social Proof Pavilion */}
                <section className="mb-12">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu Homeowners Love Their Dual Inverter ACs"
                        subtitle="Real verified reviews from local customers saving on their HECO electric bills"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
