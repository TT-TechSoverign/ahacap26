'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Wrench,
    ArrowRight,
    ChevronDown,
    CheckCircle2,
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';

const FAQS = [
    {
        q: 'What is included in your $0 Window AC Diagnostic & Clean-vs-Replace Assessment?',
        a: 'Our on-site window AC evaluation covers complete electrical and thermal troubleshooting: dual-run capacitor microfarad testing, compressor running-load amp (RLA) analysis, LG/GE inverter CH error code diagnostics, supply-to-return Delta-T temperature split verification, and evaporator/condenser biofilm inspection.',
    },
    {
        q: 'Do you require any upfront payment to schedule a Window AC diagnostic visit?',
        a: 'No. We operate strictly By Appointment First with a $0 Free In-Home Estimate and zero upfront booking payment barriers. Dispatch contacts you by phone to confirm your symptom and window setup before any technician rolls.',
    },
    {
        q: 'When does cleaning or repairing beat replacing a window air conditioner in Hawaii?',
        a: 'If your LG or GE window AC is under 5–6 years old with healthy compressor windings and intact copper U-bends, deep coil sanitization or a capacitor/thermistor swap typically restores 18°F–22°F Delta-T cooling. If the sealed refrigerant circuit has leaked or salt-air has rusted through the basepan, replacing it with a brand-new Waipahu warehouse unit ($395–$1,200) is far more economical.',
    },
    {
        q: 'Do your technicians protect interior floors during troubleshooting and service?',
        a: 'Yes. Every technician lays clean protective drop cloths on the floor directly beneath your window or 26-inch wall sleeve before removing the front grille or sliding out the chassis.',
    },
];

const DIAGNOSTIC_STEPS = [
    {
        step: '01',
        title: 'Supply Voltage, LCDI Cord & Capacitor Test',
        desc: 'We verify live wall receptacle voltage (115V NEMA 5-15R or 208/230V NEMA 6-15R/6-20R), inspect the LCDI safety plug for thermal trip damage, and test dual-run capacitors in microfarads (±6% factory tolerance).',
    },
    {
        step: '02',
        title: 'Psychrometric Delta-T & Evaporator Airflow Check',
        desc: 'Using calibrated digital psychrometers, we measure return-to-supply wet-bulb and dry-bulb temperature drop (healthy Oahu target: 18°F–22°F split) to distinguish impacted evaporator biofilm from low refrigerant charge.',
    },
    {
        step: '03',
        title: 'Compressor Running Load Amps (RLA) & Winding Test',
        desc: 'We clamp-meter live compressor amperage against nameplate RLA/LRA specs and megohm-check motor terminals to spot seized rotary compressors or grounded windings immediately.',
    },
    {
        step: '04',
        title: 'LG/GE Inverter PCB & Copper U-Bend Salt Inspection',
        desc: 'We read onboard CH flash codes (CH01–CH67), measure NTC coil thermistor kilohm curves, and inspect coastal condenser copper hairpins and 26-inch wall sleeves for formicary salt-air pitting.',
    },
];

export default function WindowAcDiagnosticAssessmentPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-6">
                    <Breadcrumb
                        items={[
                            { name: 'Window AC Repair Oahu', href: '/ac-repair-oahu' },
                            { name: 'Window AC Diagnostic & Assessment ($0 Estimate)' },
                        ]}
                    />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Wrench className="size-3.5" />
                        <span>Waipahu Warehouse Direct &bull; Insured Oahu Cooling Specialists &bull; Est. 2005</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Window AC Diagnostic &amp; Assessment <span className="text-primary italic">Oahu ($0 Estimate)</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        No mystery service fees, zero upfront booking charges, and zero pressure. Our Oahu cooling technicians perform complete electrical, psychrometric Delta-T, and salt-corrosion diagnostics on LG &amp; GE window and 26&quot; wall-sleeve units — giving you an <strong className="text-white">itemized upfront quote</strong> and an honest comparison against our in-stock Waipahu replacements ($395–$1,200).
                    </p>

                    <nav aria-label="Page Quick Jump" className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[11px] font-mono">
                        <a href="#diagnostic-bench-table" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Meter Benchmarks Table</a>
                        <a href="#4-step-protocol" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">4-Point Field Test</a>
                        <a href="#diagnostic-faqs" className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/10 text-cyan-400 transition-colors">Diagnostic FAQs</a>
                    </nav>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact?service=AC+Diagnostic+%26+Repair"
                            prefetch={false}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            Request $0 Free Assessment
                            <ArrowRight className="size-4" />
                        </Link>
                        <TrackedPhoneLink
                            phone="8084881111"
                            display="Call Dispatch Desk: (808) 488-1111"
                            eventLabel="Diagnostic Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* Semantic Diagnostic Meter Table */}
                <section className="mb-16 rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] font-bold block mb-2">
                        OAHU FIELD ENGINEERING BENCHMARKS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight mb-3">
                        Window AC Symptom vs. Meter Verdict Matrix
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        Because Hawaii&apos;s 74% average humidity and coastal salt air mimic sealed-system failures when coils or blower wheels clog, we measure actual electrical and thermal tolerances before recommending whether to deep-clean, repair, or replace your unit:
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90">
                        <table id="diagnostic-bench-table" className="w-full text-left border-collapse text-xs">
                            <caption className="sr-only">Oahu Window AC diagnostic meter readings, root causes, and recommended Clean vs Repair vs Replace action.</caption>
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.04] font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                    <th scope="col" className="py-3 px-4">Homeowner Symptom</th>
                                    <th scope="col" className="py-3 px-4">Field Meter Finding</th>
                                    <th scope="col" className="py-3 px-4">Oahu Root Cause</th>
                                    <th scope="col" className="py-3 px-4">Honest Verdict</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-200">
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Weak airflow + musty smell</th>
                                    <td className="py-3 px-4 font-mono text-cyan-300">Delta-T &lt; 12°F • Normal RLA</td>
                                    <td className="py-3 px-4">Impacted evaporator &amp; blower wheel biofilm</td>
                                    <td className="py-3 px-4 text-emerald-400 font-semibold">Deep Antimicrobial Coil Wash</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Fan spins, compressor hums/clicks</th>
                                    <td className="py-3 px-4 font-mono text-cyan-300">Capacitor &gt; 10% below µF spec</td>
                                    <td className="py-3 px-4">Heat-swollen start/run capacitor</td>
                                    <td className="py-3 px-4 text-emerald-400 font-semibold">Component Repair (If &lt; 6 Yrs Old)</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Water dripping onto interior sill</th>
                                    <td className="py-3 px-4 font-mono text-cyan-300">Blocked slinger pan / 0° pitch</td>
                                    <td className="py-3 px-4">Algae jelly plug or settled window bracket</td>
                                    <td className="py-3 px-4 text-emerald-400 font-semibold">Drain Purge &amp; 1/4&quot; Rear Pitch Reset</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Blinking CH05 / CH21 / CH61 code</th>
                                    <td className="py-3 px-4 font-mono text-amber-300">Condenser overheat / inverter IPM trip</td>
                                    <td className="py-3 px-4">Salt-crust condenser blanket or open thermistor</td>
                                    <td className="py-3 px-4 text-cyan-300 font-semibold">Sensor Check / Marine Coil Rinse</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-3 px-4 font-bold text-white">Clean coils, blows warm 80°F air</th>
                                    <td className="py-3 px-4 font-mono text-rose-300">Delta-T 0–3°F • RLA 40% under spec</td>
                                    <td className="py-3 px-4">R-32 / R-410A leak at corroded copper U-bend</td>
                                    <td className="py-3 px-4 text-amber-300 font-semibold">Replace w/ New LG or GE ($395–$1,200)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* What We Test Grid */}
                <section id="4-step-protocol" className="scroll-mt-28 md:scroll-mt-48 mb-16">
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider block mb-2">FIELD TROUBLESHOOTING PROTOCOL</span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight">
                            4-Point Oahu Window AC Evaluation
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {DIAGNOSTIC_STEPS.map((s, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/10 hover:border-primary/40 transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                                        {s.step}
                                    </div>
                                    <h3 className="font-header font-bold text-base uppercase text-white">{s.title}</h3>
                                </div>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Honest Pricing Promise + Related Symptom Guides */}
                <section className="mb-16 p-8 rounded-3xl bg-slate-900/80 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                ZERO UPFRONT BARRIERS • DROP-CLOTH PROTECTED
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                                Our By-Appointment-First Promise
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                                Every appointment begins with protective floor drop cloths laid beneath your window or wall sleeve. We explain what failed, show you the live meter readings, and give you a clear itemized quote before any work begins.
                            </p>
                            <ul className="space-y-2 text-xs text-slate-300">
                                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Zero credit card required to request an appointment</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Eligible for $45 Hawaii Energy rebates on new inverter swaps</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Same-week Waipahu warehouse stock ($395–$1,200) if unit is dead</li>
                            </ul>
                            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                                <Link href="/clean-vs-replace-window-ac" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400">Clean vs. Replace Calculator →</Link>
                                <Link href="/window-ac-cleaning-vs-repair-cost-oahu" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400">Age &amp; Cost Decision Matrix →</Link>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">In-Home Estimate &amp; Quote</span>
                                <span className="font-header font-bold text-lg text-emerald-400">$0 Free (By Appt)</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Floor Protection</span>
                                <span className="font-header font-bold text-xs text-white">Clean Drop Cloths Included</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-xs text-slate-300">Oahu Service Area</span>
                                <span className="font-header font-bold text-xs text-white">All 22 Oahu Communities</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">Waipahu Replacement Stock</span>
                                <span className="font-header font-bold text-xs text-cyan-300">16 LG &amp; GE Models ($395–$1,200)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section id="diagnostic-faqs" className="scroll-mt-28 md:scroll-mt-48 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Window AC Diagnostic FAQs
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
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,200)"
                    subheading="Skip uneconomical compressor repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />

                <OahuEEATAuthorityBar topicTitle="Window AC Diagnostic & Clean-vs-Replace Assessment Oahu ($0 Estimate)" />

                <ReviewsPavilion
                    variant="compact"
                    title="Oahu Window AC Diagnostic & Replacement Reviews"
                    subtitle="Verified feedback from Oahu homeowners across 142 5-star reviews"
                />

                <BackToTop />
            </div>
        </main>
    );
}
