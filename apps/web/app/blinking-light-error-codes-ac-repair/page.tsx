'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    AlertCircle, 
    Zap, 
    RotateCcw, 
    CheckCircle2, 
    Phone, 
    Calendar, 
    ArrowRight, 
    ChevronDown, 
    Sparkles, 
    ShieldCheck, 
    Activity, 
    Cpu,
    FileText
} from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { TrackedPhoneLink } from '@/components/TrackedPhoneLink';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { trackFunnelEvent } from '@/lib/tracking';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';

const LG_CODES = [
    { code: "CH01 / 1 Blink", desc: "Indoor Room Air Thermistor Open/Short", fix: "Ohm-test room thermistor resistance (10k ohms at 77°F) and replace sensor clip." },
    { code: "CH02 / 2 Blinks", desc: "Evaporator Pipe Thermistor Error", fix: "Inspect copper evaporator tube clip contact, test resistance (5k ohms at 77°F)." },
    { code: "CH05 / 5 Blinks", desc: "Main Control Board to Inverter Module Signal Error", fix: "Inspect internal wire harness between front display PCB and inverter control board." },
    { code: "CH06 / 6 Blinks", desc: "Inverter DC Peak / High Discharge Temperature", fix: "Clean clogged condenser coils, verify fan blade rotation, and check inverter module." },
    { code: "CH21 / 21 Blinks", desc: "Compressor Overcurrent / Locked Rotor Protection", fix: "Verify 115V/230V supply voltage, inspect inverter power board, or evaluate replacement." }
];

const GE_CODES = [
    { code: "F1 / E1", desc: "Room Temperature Sensor Fault", fix: "Inspect front intake thermistor plug on control board and replace sensor if open." },
    { code: "F2 / E2", desc: "Evaporator Frost Sensor Fault", fix: "Thaw frozen evaporator coil, clean air filter, and test coil thermistor resistance." },
    { code: "E4 / E5", desc: "Outdoor Condenser Coil Over-Temperature / Fan Fault", fix: "Clear exterior louver blockage, rinse salt-crusted condenser fins, and test fan motor." },
    { code: "FL / E8", desc: "Base Pan High Water Level / Drain Plug Alert", fix: "Clear rear condensate drain port and verify 3/8-inch exterior tilt pitch." }
];

const FAQS = [
    {
        q: "How do I read the blinking lights or digital error codes on my window AC?",
        a: "On LG Dual Inverter and GE digital window units, the LED display will show a 2-character code (such as CH01, CH02, CH21, F1, or F2) or blink the Clean Filter / Power LED in a repeating sequence. Count the flashes between pauses or note the digital code shown on the front panel."
    },
    {
        q: "Can I clear the error code by unplugging the unit or resetting the breaker?",
        a: "Yes! Unplug the window unit (or press the RESET button on the LCDI plug head) and wait 5 full minutes to let the internal inverter capacitors discharge. Plug it back in and press RESET. If the error was caused by a temporary HECO island voltage flicker, the unit may reboot normally. If the code returns immediately, a sensor or board fault exists."
    },
    {
        q: "What if theClean Filter LED is blinking?",
        a: "On LG and GE window air conditioners, a steady or blinking Filter LED triggers automatically after 250 hours of fan operation as a reminder to wash the front mesh screen. Pull out the filter, rinse it with warm water, reinstall it, and hold the Filter / Temp buttons for 3 seconds to clear the light."
    }
];

export default function BlinkingLightErrorCodesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Honolulu');
    const [brand, setBrand] = useState('lg');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            trackFunnelEvent('symptom_blinking_code_lead', {
                brand,
                city,
                full_name: fullName,
                phone
            });

            const nameParts = fullName.trim().split(/\s+/);
            const payload = {
                first_name: nameParts[0] || 'Customer',
                last_name: nameParts.slice(1).join(' ') || 'Oahu',
                email: 'office@affordablehome-ac.com',
                phone: phone.trim(),
                address: city.trim(),
                city: city.trim(),
                zip: '',
                service_type: 'Window AC Error Code Diagnostic',
                urgency: 'high',
                notes: `Symptom: BLINKING ERROR CODES | Brand: ${brand.toUpperCase()} | Code Notes: ${notes.trim() || 'None'}`
            };

            await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            setIsSuccess(true);
        } catch {
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[85px] md:pt-[165px] pb-36 lg:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={[{ name: 'Blinking Light Error Codes AC Repair' }]} />
                </div>

                {/* Hero */}
                <section className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-6">
                        <Cpu className="size-3.5" />
                        <span>Diagnostic Fault Decoder &bull; LG Dual Inverter &amp; GE Window AC</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-black uppercase tracking-tight text-white mb-6 leading-tight">
                        Blinking Light Error Codes <span className="text-primary italic">AC Repair Oahu</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        Is your window AC LED blinking in a repeated pattern or displaying a CH or F error code? Decode your diagnostic fault code below and schedule an on-site inspection or replacement consultation with our Oahu window AC specialists.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#error-form"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        >
                            <Calendar className="size-4" />
                            Book Diagnostic Inspection
                        </a>
                        <TrackedPhoneLink 
                            phone="8084881111"
                            display="Technician Triage: (808) 488-1111"
                            eventLabel="Error Code Page Call"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        />
                    </div>
                </section>

                {/* 5-Minute Hard Reset Protocol */}
                <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2 space-y-2">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block">
                                TRY THIS FIRST
                            </span>
                            <h2 className="text-xl sm:text-2xl font-header font-black uppercase text-white">
                                The 5-Minute Power Reset Procedure
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                Voltage sags on the HECO power grid can lock up microprocessors. Unplug your window AC (or turn OFF its circuit breaker), wait <strong>5 full minutes</strong> for memory buffers to clear, then plug it back in and press RESET on the plug head. If the error code flashes again, a physical sensor or board inspection is required.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                            <RotateCcw className="size-10 text-primary mx-auto mb-2" />
                            <div className="font-header font-bold text-sm uppercase text-white">Wait 5 Full Minutes</div>
                            <div className="text-[11px] text-slate-400 mt-1">Discharges internal capacitors</div>
                        </div>
                    </div>
                </section>

                {/* LG Error Code Table */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold uppercase">
                            Brand Guide
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            LG Dual Inverter Window AC Error Codes
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {LG_CODES.map((item, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-surface-dark border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="font-mono text-xs text-primary font-bold">{item.code}</div>
                                    <div className="font-header font-bold text-base text-white uppercase">{item.desc}</div>
                                </div>
                                <div className="text-xs text-slate-400 font-sans md:max-w-md bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                    <strong className="text-slate-200">Technician Solution:</strong> {item.fix}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GE Error Code Table */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase">
                            Brand Guide
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            GE Window &amp; Built-In Wall Sleeve Error Codes
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {GE_CODES.map((item, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-surface-dark border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="font-mono text-xs text-cyan-400 font-bold">{item.code}</div>
                                    <div className="font-header font-bold text-base text-white uppercase">{item.desc}</div>
                                </div>
                                <div className="text-xs text-slate-400 font-sans md:max-w-md bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                    <strong className="text-slate-200">Technician Solution:</strong> {item.fix}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form */}
                <section id="error-form" className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface-dark border border-primary/30 shadow-2xl relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center mb-8">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold block mb-2">
                            FAST SERVICE DISPATCH &bull; $0 DEPOSIT TO BOOK
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-tight mb-3">
                            Schedule Error Code Diagnostic
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans">
                            Our technicians carry digital test equipment and can evaluate whether an in-place sensor fix or unit upgrade is most cost-effective.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-lg mx-auto">
                            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
                            <h3 className="font-header font-black text-xl uppercase text-white mb-2">Service Request Received!</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Our dispatch coordinator will contact you to coordinate technician arrival.
                            </p>
                            <p className="font-mono text-[11px] text-emerald-400">
                                Call (808) 488-1111 for urgent phone triage.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                                <input 
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g. Michael Souza"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number</label>
                                    <input 
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(808) 000-0000"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Oahu Neighborhood</label>
                                    <input 
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="e.g. Honolulu, Pearl City"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Window AC Brand</label>
                                <select 
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                >
                                    <option value="lg">LG (Dual Inverter / Cool+Heat / Standard)</option>
                                    <option value="ge">GE (Built-In 26&quot; Wall Sleeve / Window AC)</option>
                                    <option value="other">Other Window AC Brand</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Error Code or Blink Count</label>
                                <textarea 
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="What code is shown on the front panel (e.g. CH01, CH21, F1)?"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-header font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request Error Code Diagnostic'}
                            </button>

                            <p className="text-[10px] font-mono text-slate-400 text-center">
                                Upfront Estimates &bull; Insured Oahu Specialists &bull; Drop-Cloth Protection Standard
                            </p>
                        </form>
                    )}
                </section>

                {/* FAQs */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-tight">
                            Error Code FAQs
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

                <WindowAcQuickShop
                    title="Old AC Beyond Repair? Order an In-Stock Replacement Today ($395–$1,025)"
                    subheading="Skip expensive compressor or sealed-system repairs on older window units. Order a brand-new factory-sealed LG or GE Window AC online for free Waipahu pickup or $50 flat Oahu delivery."
                />

                {/* Reviews */}
                <section className="mb-12">
                    <ReviewsPavilion 
                        variant="marquee" 
                        title="Oahu Homeowner Service Reviews"
                        subtitle="Homeowners who got accurate diagnostic answers without deceptive upselling"
                        limit={6}
                    />
                </section>

                <BackToTop />
            </div>
        </div>
    );
}
