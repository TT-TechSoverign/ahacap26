'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Truck,
    ShieldCheck,
    ArrowRight,
    ChevronDown,
    DollarSign,
    Clock,
    Home,
    Warehouse,
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';

const FAQS = [
    {
        q: 'How much does window AC delivery cost on Oahu and which areas are covered?',
        a: 'We charge a flat $50 delivery fee across 15 primary Oahu residential municipalities — including Waipahu, Kapolei, Ewa Beach, Pearl City, Aiea, Mililani, Kunia, Salt Lake, Honolulu, Makiki, Manoa, Kaimuki, Hawaii Kai, Kailua, and Kaneohe. Standard $50 curbside delivery excludes North Shore, Waianae, Waikiki, and Waimanalo (customers in those areas can use Free Waipahu Warehouse Pickup by appointment at 94-150 Leoleo St #203).',
    },
    {
        q: 'How quickly is an in-stock LG or GE window AC delivered?',
        a: 'Units in stock at our Waipahu warehouse are typically dispatched within 24 to 48 hours after online checkout. Our dispatch desk calls you directly to confirm a convenient 2-hour arrival window.',
    },
    {
        q: 'How do I schedule installation if I also want my new window AC mounted?',
        a: 'We never bundle hidden installation fees at checkout. Simply request a $0 Free In-Home Estimate by appointment on our Window AC Installation page or call (808) 488-1111 — our Oahu cooling specialists lay protective floor drop cloths and provide an upfront itemized quote for your exact jalousie, slider, or 26-inch wall sleeve opening.',
    },
    {
        q: 'Can I pick up my window AC for free at your Waipahu warehouse instead?',
        a: 'Yes. Warehouse pickup at 94-150 Leoleo St. #203, Waipahu, HI 96797 is 100% free ($0) by appointment, and our team loads the factory-sealed carton upright into your truck, van, or SUV.',
    },
];

export default function WindowAcDeliveryServicePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Shop Window ACs', href: '/shop' }, { name: '$50 Oahu Delivery Service' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Truck className="size-3.5" />
                        <span>Waipahu Warehouse Direct &bull; Upright Compressor-Safe Transit</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        $50 Window AC Delivery Service <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        Don&apos;t have a pickup truck, cargo SUV, or help lifting a 72–154 lb air conditioner box? Order any in-stock LG Dual Inverter or GE 26&quot; Built-In Window AC ($395–$1,200) online and select <strong className="text-white">Flat $50 Oahu Curbside Delivery</strong> across 15 residential municipalities — transported strictly upright from our central Waipahu warehouse.
                    </p>

                    <nav aria-label="Delivery Page Quick Jump" className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[11px] font-mono">
                        <a href="#oahu-window-ac-delivery-zone-table" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">15-Town Zone &amp; Carton Table</a>
                        <a href="#upright-handling-protocol" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Upright Oil Protocol</a>
                        <a href="#delivery-faqs" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Delivery FAQs</a>
                    </nav>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Order Online ($50 Delivery or $0 Pickup)
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink
                            phone="8084881111"
                            display="Call Dispatch: (808) 488-1111"
                            eventLabel="AC Delivery Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Pricing & Guarantee Banner */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono text-xs">
                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <DollarSign className="size-8 text-primary mx-auto" />
                            <div className="text-2xl font-header font-black text-white">Flat $50 Delivery</div>
                            <p className="text-slate-300 font-sans text-xs">Single $50 checkout fee across 15 Oahu towns — zero per-mile surcharges.</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <Clock className="size-8 text-emerald-400 mx-auto" />
                            <div className="text-2xl font-header font-black text-white">24–48 Hr Dispatch</div>
                            <p className="text-slate-300 font-sans text-xs">Phone confirmation with a scheduled 2-hour arrival window from Waipahu.</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02]">
                            <ShieldCheck className="size-8 text-primary mx-auto" />
                            <div className="text-2xl font-header font-black text-white">Upright Oil Guard</div>
                            <p className="text-slate-300 font-sans text-xs">Strapped vertically so R-32 rotary compressor POE oil never migrates into suction lines.</p>
                        </div>
                    </div>
                </section>

                {/* Semantic Zone & Shipping Weight Table */}
                <section className="mb-16 rounded-3xl bg-surface-dark border border-white/10 p-6 sm:p-8">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                        OAHU FULFILLMENT &amp; CARTON LOGISTICS MATRIX
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight mb-3">
                        Covered Oahu Delivery Zones, Exclusions &amp; Box Weights
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        Unlike mainland parcel couriers that tumble heavy air conditioners on conveyor belts, our local Waipahu crew delivers factory-sealed LG and GE cartons upright directly to your home or building loading zone:
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90 mb-6">
                        <table id="oahu-window-ac-delivery-zone-table" className="w-full text-left border-collapse text-xs">
                            <caption className="sr-only">Oahu $50 Window AC delivery zones, excluded outer zones, and Waipahu free pickup comparison.</caption>
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.04] font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                    <th scope="col" className="py-3 px-4">Oahu Region</th>
                                    <th scope="col" className="py-3 px-4">Communities Included</th>
                                    <th scope="col" className="py-3 px-4">Fulfillment Fee</th>
                                    <th scope="col" className="py-3 px-4">Typical Dispatch</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-200">
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Waipahu Warehouse Will-Call</th>
                                    <td className="py-3 px-4">94-150 Leoleo St. #203, Waipahu, HI 96797 (All Oahu residents welcome)</td>
                                    <td className="py-3 px-4 font-mono text-emerald-400 font-bold">$0 Free (By Appt)</td>
                                    <td className="py-3 px-4 font-mono">Same-Day / Next-Day</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Central &amp; Leeward Oahu</th>
                                    <td className="py-3 px-4">Waipahu, Kapolei, Ewa Beach, Pearl City, Aiea, Mililani, Kunia</td>
                                    <td className="py-3 px-4 font-mono text-cyan-300 font-bold">$50 Flat Rate</td>
                                    <td className="py-3 px-4 font-mono">24–48 Hours</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Metro &amp; East Honolulu</th>
                                    <td className="py-3 px-4">Honolulu (Ala Moana / Kakaako / Downtown / Nuuanu), Salt Lake, Makiki, Manoa, Kaimuki, Hawaii Kai</td>
                                    <td className="py-3 px-4 font-mono text-cyan-300 font-bold">$50 Flat Rate</td>
                                    <td className="py-3 px-4 font-mono">24–48 Hours</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Windward Koolau</th>
                                    <td className="py-3 px-4">Kailua &amp; Kaneohe</td>
                                    <td className="py-3 px-4 font-mono text-cyan-300 font-bold">$50 Flat Rate</td>
                                    <td className="py-3 px-4 font-mono">24–48 Hours</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-amber-300">Excluded Standard Delivery Zones</th>
                                    <td className="py-3 px-4 text-slate-300">North Shore (Haleiwa/Waialua/Kahuku), Waianae Coast, Waikiki Resort Zone &amp; Waimanalo</td>
                                    <td className="py-3 px-4 font-mono text-amber-300">Use $0 Waipahu Pickup</td>
                                    <td className="py-3 px-4 font-mono">Call (808) 488-1111</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="upright-handling-protocol" className="scroll-mt-28 md:scroll-mt-48 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <div className="flex items-center gap-2 text-cyan-400 font-header font-bold text-sm uppercase">
                                <Warehouse className="size-4" />
                                <span>Why Upright Transport Matters for R-32 Inverters</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Modern LG Dual Inverter (63–112 lbs net, 72–128 lbs boxed) and GE 26&quot; Built-In (74–94 lbs) compressors sit in a synthetic POE oil sump. Laying a box flat in a sedan trunk drains oil into the evaporator tubing and can cause dry-start scoring if plugged in immediately. Our delivery van transports every carton upright so it is ready for safe startup.
                            </p>
                            <Link href="/window-ac-warehouse-pickup-waipahu" className="inline-block text-[11px] font-mono text-cyan-400 hover:underline pt-1">
                                Prefer Free Waipahu Pickup? View Vehicle Loading Dimensions →
                            </Link>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-400 font-header font-bold text-sm uppercase">
                                <Home className="size-4" />
                                <span>Need Installation Too? Book by Appointment ($0 Estimate)</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                We never force installation add-ons during online unit checkout. If you want custom Hawaiian jalousie glass retrofitting, exterior cantilever brackets, or a 26&quot; condo wall-sleeve swap, request a <strong className="text-white">$0 Free In-Home Estimate</strong> — our technicians lay clean floor drop cloths and quote your exact opening upfront.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/window-ac-installation" className="inline-flex px-4 py-2 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                    Request $0 Install Estimate
                                </Link>
                                <Link href="/window-ac-installation-cost-oahu" className="inline-flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs hover:bg-white/10">
                                    View Oahu Install Cost Factors
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section id="delivery-faqs" className="scroll-mt-28 md:scroll-mt-48 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Oahu Window AC Delivery FAQs
                        </h2>
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
                                <div className={`px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3 ${openFaq === idx ? 'block' : 'hidden'}`}>
                                    {faq.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <WindowAcQuickShop
                    title="In-Stock Waipahu Window ACs — Order Online ($395–$1,200)"
                    subheading="Brand-new factory-sealed LG & GE units in stock at our Waipahu warehouse (94-150 Leoleo St #203). Free pickup by appointment or $50 flat Oahu delivery."
                />

                <OahuEEATAuthorityBar topicTitle="$50 Flat-Rate Oahu Window AC Delivery Service — Waipahu Warehouse Direct" />

                <ReviewsPavilion
                    variant="compact"
                    title="Oahu Delivery & Waipahu Warehouse Reviews"
                    subtitle="Verified feedback from Oahu homeowners across 142 5-star reviews"
                />

                <BackToTop />
            </div>
        </main>
    );
}
