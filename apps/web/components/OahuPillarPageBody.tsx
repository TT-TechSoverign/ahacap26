'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ShieldCheck,
    Warehouse,
    Wrench,
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

export interface PillarBreadcrumbItem {
    name: string;
    href?: string;
}

export interface PillarTableData {
    id: string;
    eyebrow: string;
    heading: string;
    intro: string;
    caption: string;
    columns: string[];
    rows: {
        rowHeader: string;
        cells: string[];
        highlight?: boolean;
    }[];
    footnote?: string;
}

export interface PillarSectionCard {
    code: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
}

export interface PillarChecklistBox {
    eyebrow: string;
    heading: string;
    description: string;
    items: string[];
    relatedLinks: { label: string; href: string }[];
}

export interface PillarFaqItem {
    q: string;
    a: string;
}

export interface OahuPillarPageProps {
    breadcrumbs: PillarBreadcrumbItem[];
    badge: string;
    h1Main: string;
    h1Highlight: string;
    leadParagraph: string;
    primaryCta: { label: string; href: string };
    phoneEventLabel: string;
    table: PillarTableData;
    deepDiveEyebrow: string;
    deepDiveHeading: string;
    deepDiveIntro: string;
    cards: PillarSectionCard[];
    checklist: PillarChecklistBox;
    faqsHeading: string;
    faqs: PillarFaqItem[];
    quickShopModelIds: number[];
    quickShopTitle: string;
    quickShopSubheading: string;
    eeatTopicTitle: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
}

export function OahuPillarPageBody({
    breadcrumbs,
    badge,
    h1Main,
    h1Highlight,
    leadParagraph,
    primaryCta,
    phoneEventLabel,
    table,
    deepDiveEyebrow,
    deepDiveHeading,
    deepDiveIntro,
    cards,
    checklist,
    faqsHeading,
    faqs,
    quickShopModelIds,
    quickShopTitle,
    quickShopSubheading,
    eeatTopicTitle,
    reviewsTitle,
    reviewsSubtitle,
}: OahuPillarPageProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
                <Breadcrumb items={breadcrumbs} />
            </div>

            {/* Hero */}
            <section className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                    <Warehouse className="size-3.5 shrink-0" />
                    <span>{badge}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                    {h1Main} <span className="text-primary italic">{h1Highlight}</span>
                </h1>

                <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {leadParagraph}
                </p>

                <nav
                    aria-label="Guide Quick Jump"
                    className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[11px] font-mono"
                >
                    <a
                        href={`#${table.id}`}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors"
                    >
                        Comparison &amp; Spec Table
                    </a>
                    <a
                        href="#oahu-engineering-analysis"
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors"
                    >
                        Oahu Technical Breakdown
                    </a>
                    <a
                        href="#oahu-field-checklist"
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors"
                    >
                        Buyer &amp; Homeowner Checklist
                    </a>
                    <a
                        href="#guide-faqs"
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors"
                    >
                        Expert FAQs
                    </a>
                </nav>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={primaryCta.href}
                        prefetch={false}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                    >
                        {primaryCta.label}
                        <ArrowRight className="size-4" />
                    </Link>
                    <TrackedPhoneLink
                        phone="8084881111"
                        display="Call Waipahu Desk: (808) 488-1111"
                        eventLabel={phoneEventLabel}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    />
                </div>
            </section>

            {/* Semantic Comparison / Engineering Table */}
            <section className="mb-16 rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8">
                <span className="font-mono text-[10px] text-primary uppercase tracking-[0.28em] font-bold block mb-2">
                    {table.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight mb-3">
                    {table.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {table.intro}
                </p>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90">
                    <table id={table.id} className="scroll-mt-28 md:scroll-mt-48 w-full text-left border-collapse text-xs">
                        <caption className="sr-only">{table.caption}</caption>
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.04] font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                {table.columns.map((col, idx) => (
                                    <th key={idx} scope="col" className="py-3 px-4">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-200">
                            {table.rows.map((row, rIdx) => (
                                <tr
                                    key={rIdx}
                                    className={row.highlight ? 'bg-cyan-500/[0.06]' : 'hover:bg-white/[0.02]'}
                                >
                                    <th scope="row" className="py-3 px-4 font-bold text-white whitespace-nowrap">
                                        {row.rowHeader}
                                    </th>
                                    {row.cells.map((cell, cIdx) => (
                                        <td
                                            key={cIdx}
                                            className={`py-3 px-4 ${
                                                cIdx === 0 ? 'font-mono text-cyan-300' : 'text-slate-200'
                                            }`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {table.footnote && (
                    <p className="text-[11px] text-slate-400 font-mono mt-4 leading-relaxed">
                        {table.footnote}
                    </p>
                )}
            </section>

            {/* 4-Card Oahu Engineering Deep-Dive */}
            <section id="oahu-engineering-analysis" className="scroll-mt-28 md:scroll-mt-48 mb-16">
                <div className="text-center mb-10">
                    <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">
                        {deepDiveEyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                        {deepDiveHeading}
                    </h2>
                    <p className="max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {deepDiveIntro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card, idx) => (
                        <article
                            key={idx}
                            className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono font-bold text-xs shrink-0">
                                    {card.code}
                                </div>
                                <h3 className="font-header font-bold text-base uppercase text-white">
                                    {card.title}
                                </h3>
                            </div>
                            {card.paragraphs.map((p, pIdx) => (
                                <p key={pIdx} className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                    {p}
                                </p>
                            ))}
                            {card.bullets && card.bullets.length > 0 && (
                                <ul className="space-y-1.5 pt-1 text-xs text-slate-200">
                                    {card.bullets.map((b, bIdx) => (
                                        <li key={bIdx} className="flex items-start gap-2">
                                            <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {/* Oahu Field Checklist & Related Canonical Hubs */}
            <section
                id="oahu-field-checklist"
                className="scroll-mt-28 md:scroll-mt-48 mb-16 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
                            <ShieldCheck className="size-4" />
                            <span>{checklist.eyebrow}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            {checklist.heading}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {checklist.description}
                        </p>
                        <ul className="space-y-2.5 pt-1">
                            {checklist.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400 font-header font-bold text-sm uppercase">
                            <Wrench className="size-4" />
                            <span>Related Oahu Cooling Guides</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                             Waipahu Warehouse Direct &bull; Insured Oahu Cooling Specialists &bull; Est. 2005. Explore connected sizing, installation, and fulfillment guides:
                        </p>
                        <div className="space-y-2">
                            {checklist.relatedLinks.map((rl, idx) => (
                                <Link
                                    key={idx}
                                    href={rl.href}
                                    prefetch={false}
                                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/70 hover:bg-primary/15 border border-white/10 hover:border-primary/40 text-xs font-semibold text-white hover:text-cyan-300 transition-all"
                                >
                                    <span>{rl.label}</span>
                                    <ArrowRight className="size-3.5 shrink-0 text-cyan-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section id="guide-faqs" className="scroll-mt-28 md:scroll-mt-48 mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                        {faqsHeading}
                    </h2>
                </div>

                <div className="space-y-3 max-w-3xl mx-auto">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm text-white hover:text-primary transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown
                                    className={`size-4 shrink-0 transition-transform ${
                                        openFaq === idx ? 'rotate-180 text-primary' : 'text-slate-400'
                                    }`}
                                />
                            </button>
                            <div
                                className={`px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3 ${
                                    openFaq === idx ? 'block' : 'hidden'
                                }`}
                            >
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <WindowAcQuickShop
                modelIds={quickShopModelIds}
                title={quickShopTitle}
                subheading={quickShopSubheading}
            />

            <OahuEEATAuthorityBar topicTitle={eeatTopicTitle} />

            <ReviewsPavilion
                variant="compact"
                title={reviewsTitle}
                subtitle={reviewsSubtitle}
            />

            <BackToTop />
        </div>
    );
}
