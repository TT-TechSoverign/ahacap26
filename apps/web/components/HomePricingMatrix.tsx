'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Phone, Calendar, ArrowRight, ShieldCheck, Sparkles, Wrench } from 'lucide-react';

interface PricingTier {
    title: string;
    price: string;
    priceSubtitle: string;
    badge?: string;
    highlight?: boolean;
    description: string;
    features: string[];
    ctaText: string;
    ctaHref: string;
    ctaVariant: 'primary' | 'secondary' | 'outline';
}

const PRICING_TIERS: PricingTier[] = [
    {
        title: 'Free In-Home Estimate',
        price: '$0',
        priceSubtitle: 'Zero Upfront • By Appointment',
        badge: 'Most Popular',
        highlight: true,
        description: 'Comprehensive on-site evaluation for new ductless mini-split systems or full window AC replacements across Oahu.',
        features: [
            'Oahu-wide in-home heat load assessment',
            'Island microclimate & electrical load review',
            'Hawaii Energy rebate eligibility check ($45–$500+)',
            'Drop-cloth clean home protection guarantee',
            'Zero commitment, transparent written quote'
        ],
        ctaText: 'Book Free Estimate',
        ctaHref: '/contact',
        ctaVariant: 'primary'
    },
    {
        title: 'Diagnostic & Basic Service',
        price: '$175',
        priceSubtitle: 'Applied toward repair if contracted',
        description: 'Complete system troubleshooting, airflow measurement, electrical testing, and basic sanitization for underperforming units.',
        features: [
            'Multi-point refrigerant & compressor diagnosis',
            'Airflow CFM & temperature differential check',
            'Filter & intake sanitization',
            'Capacitor & electrical circuit testing',
            '100% of $175 credited if repair work is contracted'
        ],
        ctaText: 'Schedule Diagnostic',
        ctaHref: '/contact',
        ctaVariant: 'secondary'
    },
    {
        title: 'Deep Shop Teardown & Chemical Flush',
        price: '$275',
        priceSubtitle: 'Waipahu Shop Bench Service',
        description: 'Thorough chemical wash, mold eradication, salt sludge removal, and 24–48 hour performance bench test in our Waipahu shop.',
        features: [
            'Complete chassis teardown to bare coils',
            'Anti-microbial deep coil chemical foam flush',
            'Blower wheel mold & bacterial slime removal',
            'Drain pan & condenser salt oxidation strip',
            '24–48h live wattage & amp draw bench testing'
        ],
        ctaText: 'Book Shop Teardown',
        ctaHref: '/contact',
        ctaVariant: 'secondary'
    },
    {
        title: 'Brand New In-Stock Hardware',
        price: '$504–$1,025',
        priceSubtitle: 'Waipahu Warehouse In Stock',
        badge: 'No Shipping Delay',
        description: 'Direct sale of brand new, factory-sealed LG Dual Inverter and GE window AC units in stock right now in Waipahu.',
        features: [
            '16 premium models (6,000 to 24,000 BTU)',
            'Standard 115V & heavy-duty 230V options',
            'Up to $45 Hawaii Energy cash rebate paperwork',
            'Waipahu pickup or $50 flat island-wide delivery',
            '1-Year manufacturer warranty & support'
        ],
        ctaText: 'Shop In-Stock Units',
        ctaHref: '/shop',
        ctaVariant: 'outline'
    }
];

export function HomePricingMatrix() {
    return (
        <section className="relative py-16 px-4 bg-[#0a0f1d] border-t border-slate-800/80">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles className="size-3 text-primary" />
                        Transparent Oahu Service Pricing • Strict Anti-Upsell Policy
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-header font-black text-white uppercase tracking-tight">
                        Honest, Upfront Pricing for Every Oahu Home
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-slate-300">
                        No surprise diagnostic fees, no hidden travel surcharges, and zero pressure. Review our official service tiers or call our Waipahu shop directly.
                    </p>
                </div>

                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRICING_TIERS.map((tier, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md ${
                                    tier.highlight
                                        ? 'bg-gradient-to-b from-primary/15 via-slate-900/90 to-slate-900 border-2 border-primary shadow-[0_0_35px_rgba(0,174,239,0.2)] md:-translate-y-2'
                                        : 'bg-slate-900/60 border border-white/10 hover:border-white/20'
                                }`}
                            >
                                {tier.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-primary to-cyan-300 text-slate-950 font-header font-black text-[10px] uppercase tracking-wider rounded-full shadow-lg">
                                        {tier.badge}
                                    </div>
                                )}

                                <div>
                                    <div className="space-y-1 mb-4">
                                        <h3 className="font-header font-black text-lg text-white uppercase tracking-wide">
                                            {tier.title}
                                        </h3>
                                        <div className="flex items-baseline gap-1 pt-2">
                                            <span className="text-3xl lg:text-4xl font-header font-black text-white">
                                                {tier.price}
                                            </span>
                                        </div>
                                        <div className="text-xs text-primary font-mono font-medium">
                                            {tier.priceSubtitle}
                                        </div>
                                    </div>

                                    <p className="font-sans text-xs text-slate-300 mb-6 leading-relaxed">
                                        {tier.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-2.5 mb-6 border-t border-white/5 pt-4">
                                        {tier.features.map((feat, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                                <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <div className="pt-2">
                                    <Link
                                        href={tier.ctaHref}
                                        className={`w-full py-3.5 px-4 font-header font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                                            tier.ctaVariant === 'primary'
                                                ? 'bg-primary hover:bg-cyan-300 text-slate-950 shadow-lg shadow-primary/20 hover:scale-[1.02]'
                                                : tier.ctaVariant === 'secondary'
                                                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10 hover:border-primary/40'
                                                : 'bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400'
                                        }`}
                                    >
                                        <span>{tier.ctaText}</span>
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Drop-Cloth Protection & License Footer */}
                <div className="mt-12 bg-slate-900/40 border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                            <ShieldCheck className="size-5 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-white font-header font-bold text-xs uppercase tracking-wider">
                                Drop-Cloth Protection Guarantee • Hawaii Contractor CT-36775
                            </div>
                            <div className="text-slate-400 text-xs">
                                Technicians lay heavy industrial drop-cloths on all floors and furnishings during every service call.
                            </div>
                        </div>
                    </div>

                    <a
                        href="tel:808-488-1111"
                        className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-cyan-200 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-colors shrink-0"
                    >
                        <Phone className="size-3.5" />
                        <span>Questions? Call (808) 488-1111</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
