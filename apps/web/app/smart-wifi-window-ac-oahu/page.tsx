'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Wifi, 
    Smartphone, 
    ArrowRight, 
    Clock, 
    CheckCircle2, 
    Warehouse, 
    ChevronDown, 
    Sparkles, 
    Mic,
    ShieldCheck,
    SunMedium
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

const FAQS = [
    {
        q: "How does Wi-Fi smartphone control work on a window AC?",
        a: "LG Dual Inverter smart models connect directly to your home's 2.4 GHz Wi-Fi network. Using the free LG ThinQ mobile app on iOS or Android, you can power your unit on, adjust temperatures, change fan speeds, and set timers from anywhere on Oahu or across the world."
    },
    {
        q: "Can I connect the smart window AC to Google Assistant or Amazon Alexa?",
        a: "Yes! LG ThinQ integrates with Google Assistant and Amazon Alexa, allowing you to control your room cooling with voice commands like 'Hey Google, set bedroom AC to 72 degrees.'"
    },
    {
        q: "How does smart Wi-Fi scheduling help lower HECO electric bills?",
        a: "With smart scheduling, you can set your AC to turn off automatically when you leave for work in the morning and turn back on 15 minutes before you return, eliminating 8 to 10 hours of unnecessary daytime power consumption."
    },
    {
        q: "Do I need a hub or bridge to connect the window AC to Wi-Fi?",
        a: "No! The Wi-Fi receiver is built right into the AC unit itself. You only need your home Wi-Fi password and the free LG ThinQ app on your smartphone."
    }
];

export default function SmartWifiWindowAcPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Smart Wi-Fi Window AC Oahu' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Wifi className="size-3.5" />
                        <span>LG ThinQ Enabled &bull; Voice & Smartphone Control</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Smart Wi-Fi Window AC <span className="text-primary italic">Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Never walk into a sweltering home again. Turn on your air conditioner from your smartphone while heading back from downtown Honolulu on the H-1. Enjoy whisper-quiet cooling, smart voice integration, and customized energy-saving routines.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Shop Smart Wi-Fi Inverter Models
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Call Waipahu Warehouse: (808) 488-1111"
                            eventLabel="Smart WiFi AC Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Smartphone className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">LG ThinQ Mobile App</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Control power, mode, fan speed, and temperature anywhere from iOS or Android. Monitor energy usage right on your phone.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Mic className="size-8 text-emerald-400" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Voice Assistant Ready</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Works with Google Assistant and Amazon Alexa. Adjust room temperature hands-free without looking for the remote.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-surface-dark border border-white/10 space-y-3">
                        <Clock className="size-8 text-primary" />
                        <h3 className="font-header font-bold text-lg text-white uppercase">Automated Scheduling</h3>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">
                            Program customized weekday and weekend routines to automatically turn off when you leave and cool down before bed.
                        </p>
                    </div>
                </section>

                {/* Commuter Scenario Callout */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                BUILT FOR THE OAHU COMMUTE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Cool Your Room Before You Cross The Viaduct
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Trapped in afternoon H-1 traffic from town heading west? Open the LG ThinQ app from your passenger seat or dashboard and turn your window unit on. By the time you pull into your driveway in Waipahu, Kapolei, or Mililani, your bedroom is crisp and cold at 72°F.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans">
                                <strong>Energy Savings:</strong> You never have to leave the AC running all day while nobody is home just to avoid a hot bedroom at night.
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                            <ShieldCheck className="size-10 text-emerald-400 mx-auto" />
                            <h3 className="font-header font-bold text-lg uppercase text-white">All Models in Stock</h3>
                            <p className="text-xs text-slate-300">
                                Every LG Dual Inverter window AC we stock (8,000 to 23,500 BTU) features integrated Wi-Fi and qualifies for the $45 Hawaii Energy cash rebate.
                            </p>
                            <Link href="/shop" className="inline-flex px-6 py-3 rounded-xl bg-primary text-slate-950 font-header font-bold text-xs uppercase tracking-wider">
                                View In-Stock Wi-Fi Units
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Smart Wi-Fi AC FAQs
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
                                {openFaq === idx && (
                                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <ReviewsPavilion 
                    variant="marquee" 
                    title="Smart Wi-Fi Window AC Reviews"
                    subtitle="Honolulu and Oahu homeowners loving app-controlled comfort"
                    limit={6}
                />

                <BackToTop />
            </div>
        </div>
    );
}
