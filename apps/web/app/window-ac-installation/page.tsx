'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ShieldCheck, 
    Clock, 
    Phone, 
    ArrowRight, 
    CheckCircle2, 
    Warehouse, 
    Wrench, 
    Layers, 
    FileText, 
    Check, 
    X, 
    HelpCircle, 
    ChevronDown, 
    Zap, 
    DollarSign, 
    Sparkles, 
    AlertCircle, 
    Send,
    Truck,
    Settings,
    Shield,
    Droplets
} from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';
import { trackFunnelEvent } from '@/lib/tracking';

export default function WindowAcInstallationPage() {
    const [windowType, setWindowType] = useState<string>('jalousie');
    const [unitStatus, setUnitStatus] = useState<string>('need_unit');
    const [selectedBtu, setSelectedBtu] = useState<string>('8000');
    const [city, setCity] = useState<string>('Waipahu');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('window_ac_install_lead', {
                window_type: windowType,
                unit_status: unitStatus,
                btu: selectedBtu,
                city,
                full_name: fullName,
                phone,
            });

            // Simulate / POST to backend lead intake
            const payload = {
                service: 'WINDOW_AC_INSTALLATION',
                window_type: windowType,
                unit_status: unitStatus,
                btu: selectedBtu,
                city,
                customer_name: fullName,
                phone,
                email,
                address,
                notes,
            };

            await fetch('/api/v1/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }).catch(() => {
                // Non-blocking fallback
            });

            setIsSuccess(true);
        } catch (err) {
            console.error('Lead submission failed', err);
            setIsSuccess(true); // Graceful UX
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqItems = [
        {
            q: "Can a window AC be safely installed in Oahu jalousie windows?",
            a: "Yes! Over 60% of homes on Oahu have jalousie slat windows. Our certified technicians carefully remove the necessary glass louvers, build a custom marine-grade weather-sealed acrylic or plexiglass baffle, and anchor a heavy-duty cantilever exterior support bracket so zero weight stresses the fragile aluminum jalousie frame."
        },
        {
            q: "Why is professional installation necessary for an LG Dual Inverter window AC?",
            a: "Modern LG Dual Inverters weigh between 64 lbs (6k model) and 99 lbs (23.5k model). Installing them without proper exterior brackets causes window sill bowing and air leakage. More critically, units must be pitched exactly 3/8-inch backward: improper leveling causes condensate water to pool forward, draining into interior drywall and sparking toxic black mold inside your home."
        },
        {
            q: "Can I purchase the AC unit directly from you and have you install it?",
            a: "Yes! That is our most popular option. You can purchase any in-stock LG Dual Inverter from our Waipahu warehouse on our Shop page with Stripe, and add our 1-click installation service. Our technicians will deliver the unit to your door across Oahu and complete the installation in a single visit."
        },
        {
            q: "Do your window AC installations qualify for Hawaii Energy rebates?",
            a: "Yes! Every qualifying Energy Star LG Dual Inverter window unit we supply and install comes with our pre-approved official Hawaii Energy $45 application form PDF. Note: While our mini split division does not participate in rebates (offering direct honest contractor rates instead), window ACs are 100% eligible for the $45 cash rebate."
        }
    ];

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HVACBusiness",
                "name": "Affordable Home AC - Window AC Installation Oahu",
                "telephone": "+1-808-724-4328",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "94-150 Leokane St",
                    "addressLocality": "Waipahu",
                    "addressRegion": "HI",
                    "postalCode": "96797",
                    "addressCountry": "US"
                },
                "areaServed": "Oahu, Hawaii",
                "description": "Licensed Hawaii Contractor CT-36775 specializing in precision window air conditioning installation, jalousie window custom mounting, and heavy-duty exterior support brackets."
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
                <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                        <Wrench className="size-3.5" />
                        Licensed Hawaii Contractor CT-36775
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase leading-[0.95] text-white">
                        Precision <span className="text-primary">Window AC</span> Installation Oahu
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        From tricky jalousie window retrofits to heavy-duty 99 lb dual inverter bracket mounts—we ensure zero drafts, perfect trade-wind drainage pitch, and airtight security.
                    </p>
                </div>

                {/* 3 Oahu Installation Standards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Custom Jalousie Slat Retrofits",
                            desc: "We safely remove delicate glass louvers, precision-cut marine-grade acrylic baffles, and seal all air gaps with anti-vibration gaskets so bugs, rain, and humidity stay outside."
                        },
                        {
                            icon: Layers,
                            title: "Heavy-Duty Cantilever Brackets",
                            desc: "Modern LG Dual Inverters weigh up to 99 lbs. We install heavy-duty exterior steel support brackets anchored into your building structure, preventing dangerous frame collapse."
                        },
                        {
                            icon: Droplets,
                            title: "Anti-Mold Condensate Pitch",
                            desc: "We calibrate a precise 3/8\" backward tilt so condensation flows cleanly outside away from interior walls, preventing costly drywall water damage and toxic mold."
                        }
                    ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                                <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="text-lg font-header font-black uppercase text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Interactive Booking & Sizing Section */}
                <section className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 mb-20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Selector & Specs */}
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-xl font-header font-black uppercase tracking-wider text-white flex items-center gap-2.5">
                                <span className="flex items-center justify-center size-7 rounded-lg bg-primary/20 text-primary text-xs font-mono">01</span>
                                Configure Your Installation
                            </h2>

                            {/* Window Type */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                    Window Style
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'jalousie', label: 'Jalousie Slat', desc: 'Custom cut acrylic baffle' },
                                        { id: 'hung', label: 'Single / Double Hung', desc: 'Standard sash mount' },
                                        { id: 'slider', label: 'Horizontal Slider', desc: 'Vertical filler plate' },
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => setWindowType(t.id)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                windowType === t.id 
                                                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="font-header font-bold text-xs sm:text-sm">{t.label}</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Unit Status */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                    Equipment Source
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setUnitStatus('need_unit')}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            unitStatus === 'need_unit' 
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-sm text-emerald-400">Bundle with In-Stock Unit</div>
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            Pick up or get delivery of an LG Dual Inverter + $45 Hawaii Energy Rebate Form.
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUnitStatus('own_unit')}
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                            unitStatus === 'own_unit' 
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-sm">I Already Own a Unit</div>
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            Installation labor, bracket, and custom window baffling only.
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Target BTU Size */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                    Room Size & Target BTU
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { btu: '6000', label: '6,000 BTU', area: '100–200 sq ft' },
                                        { btu: '8000', label: '8,000 BTU', area: '150–250 sq ft' },
                                        { btu: '12000', label: '12,000 BTU', area: '300–450 sq ft' },
                                        { btu: '18000', label: '18,000 BTU', area: '500+ sq ft (230V)' },
                                    ].map((b) => (
                                        <button
                                            key={b.btu}
                                            type="button"
                                            onClick={() => setSelectedBtu(b.btu)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                selectedBtu === b.btu 
                                                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(0,174,239,0.25)]' 
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-header font-bold text-xs sm:text-sm">{b.label}</div>
                                        <div className="text-[10px] text-slate-500">{b.area}</div>
                                    </button>
                                    ))}
                                </div>
                            </div>

                            {/* Oahu Island Coverage */}
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Truck className="size-4 text-primary" />
                                    Island-Wide Oahu Service Area:
                                </span>
                                <span className="text-white font-mono font-bold">
                                    Honolulu, Waipahu, Kapolei, Kailua, Kaneohe, Mililani, Ewa Beach
                                </span>
                            </div>

                        </div>

                        {/* Booking Inquiry Form */}
                        <div className="lg:col-span-5 bg-black/50 border border-white/15 rounded-2xl p-6 sm:p-8 relative">
                            {isSuccess ? (
                                <div className="text-center py-10 space-y-4">
                                    <div className="size-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-8" />
                                    </div>
                                    <h3 className="text-2xl font-header font-black uppercase text-white">Inquiry Received!</h3>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                                        Our dispatch team will contact you within 2 business hours to confirm your window measurements, unit reservation, and preferred installation date.
                                    </p>
                                    <div className="pt-4">
                                        <a
                                            href="tel:8087244328"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-header font-bold text-xs uppercase"
                                        >
                                            <Phone className="size-3.5" />
                                            Call Dispatch Now: (808) 724-4328
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="border-b border-white/10 pb-3 mb-2">
                                        <h3 className="text-lg font-header font-black uppercase text-white">Schedule Installation Service</h3>
                                        <p className="text-slate-500 text-xs">Zero upfront deposit required. Licensed CT-36775.</p>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Your Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="e.g. Keanu Akana"
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="(808) 000-0000"
                                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Oahu City / Town *</label>
                                            <input
                                                type="text"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="e.g. Kaneohe"
                                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="keanu@example.com"
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Special Notes / Window Height</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="2nd story window, wooden frame, existing outlet nearby..."
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-header font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,174,239,0.35)] transition-all"
                                    >
                                        {isSubmitting ? 'Transmitting...' : 'Request Professional Installation'}
                                        <Send className="size-3.5" />
                                    </button>

                                    <div className="text-center pt-2">
                                        <span className="text-[10px] text-slate-500">
                                            Need a unit right away? <Link href="/shop#dual_inverter" className="text-primary hover:underline">Shop online & order with Stripe</Link>
                                        </span>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </section>

                {/* Official Hawaii Energy Rebate Callout */}
                <section className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 mb-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase">
                                Pre-Approved Program Form
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                                Qualifying Window ACs Get a $45 Cash Rebate
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                                When you buy and install an Energy Star LG Dual Inverter through Affordable Home AC, we provide our pre-approved official Hawaii Energy application form directly to you.
                            </p>
                        </div>
                        <a
                            href="/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-header font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 transition-all"
                        >
                            <FileText className="size-4" />
                            Download $45 Rebate PDF
                        </a>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white">
                            Window AC Installation FAQs
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="border border-white/10 rounded-2xl bg-slate-900/40 overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-header font-bold text-sm sm:text-base text-white hover:text-primary transition-colors"
                                >
                                    <span>{item.q}</span>
                                    <ChevronDown className={`size-4 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-slate-500'}`} />
                                </button>
                                {activeFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <BackToTop />
        </div>
    );
}
