'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { 
    Home, 
    Layers, 
    Sparkles, 
    Phone, 
    MessageSquare, 
    CheckCircle2, 
    ArrowRight, 
    ArrowLeft, 
    ShieldCheck, 
    Clock, 
    MapPin, 
    Zap,
    Wind
} from 'lucide-react';

interface MiniSplitEstimatorProps {
    defaultCity?: string;
}

export default function MiniSplitEstimator({ defaultCity = '' }: MiniSplitEstimatorProps) {
    const searchParams = useSearchParams();
    const cityParam = searchParams?.get('city') || defaultCity;

    const [step, setStep] = useState(1);
    const [zones, setZones] = useState('1');
    const [propertyType, setPropertyType] = useState('single_family');
    const [brandPreference, setBrandPreference] = useState('any');
    const [contactPref, setContactPref] = useState<'text' | 'call'>('text');
    const [timeline, setTimeline] = useState('asap');
    
    // Form fields
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState(cityParam);
    const [notes, setNotes] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (cityParam && !city) {
            setCity(cityParam);
        }
    }, [cityParam]);

    const zoneOptions = [
        { 
            id: '1', 
            title: '1 Zone (Single Room)', 
            desc: 'Master bedroom, living area, or home office',
            tag: 'Most Popular'
        },
        { 
            id: '2', 
            title: '2 Zones (Dual Split)', 
            desc: 'Living room + Master suite independent cooling',
            tag: 'Dual Comfort'
        },
        { 
            id: '3', 
            title: '3 Zones (Tri-Split)', 
            desc: 'Primary living area + 2 bedrooms',
            tag: 'Family Favorite'
        },
        { 
            id: '4+', 
            title: '4+ Zones (Whole Home)', 
            desc: 'Complete multi-room ductless comfort system',
            tag: 'Whole Home'
        },
    ];

    const propertyOptions = [
        { 
            id: 'single_family', 
            title: 'Single-Family Home', 
            desc: 'Direct exterior condenser wall/ground mount' 
        },
        { 
            id: 'townhouse_condo', 
            title: 'Townhouse / Condo', 
            desc: 'Includes HOA Architectural Line-Hide Pre-Check' 
        },
        { 
            id: 'commercial_other', 
            title: 'Commercial / Rental', 
            desc: 'Offices, retail, and rental property retrofits' 
        },
    ];

    const brandOptions = [
        { 
            id: 'mitsubishi', 
            name: 'Mitsubishi Electric', 
            highlight: 'Diamond Comfort • Whisper Quiet 19 dBA' 
        },
        { 
            id: 'fujitsu', 
            name: 'Fujitsu Halcyon', 
            highlight: 'Extreme Tropical Efficiency • Coastal Tough' 
        },
        { 
            id: 'daikin', 
            name: 'Daikin Inverter', 
            highlight: 'Smart Inverter Value • Reliable Performance' 
        },
        { 
            id: 'any', 
            name: 'Expert Recommendation', 
            highlight: 'Recommend best system during free in-home survey' 
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const selectedZoneObj = zoneOptions.find(z => z.id === zones);
            const selectedPropObj = propertyOptions.find(p => p.id === propertyType);
            const selectedBrandObj = brandOptions.find(b => b.id === brandPreference);

            const combinedNotes = [
                `--- MINI SPLIT SIZING BUILDER LEAD ---`,
                `Zones Requested: ${selectedZoneObj?.title || zones}`,
                `Property Context: ${selectedPropObj?.title || propertyType}`,
                `Brand Preference: ${selectedBrandObj?.name || brandPreference}`,
                `Contact Preference: ${contactPref === 'text' ? 'TEXT MESSAGE PREFERRED' : 'PHONE CALL PREFERRED'}`,
                `Project Timeline: ${timeline === 'asap' ? 'Immediate / Hot Weather' : timeline === '30days' ? 'Next 30 Days' : 'Planning / Renovation'}`,
                `Oahu City: ${city || 'Oahu (Unspecified)'}`,
                notes ? `Customer Notes: ${notes}` : null
            ].filter(Boolean).join('\n');

            const payload = {
                first_name: fullName.trim().split(' ')[0] || fullName.trim(),
                last_name: fullName.trim().split(' ').slice(1).join(' ') || '',
                phone: phone.trim(),
                email: 'sales@affordablehome-ac.com', // fallback internal routing
                address: city.trim() ? `${city.trim()}, Oahu, HI` : 'Oahu, HI',
                city: city.trim() || 'Oahu',
                service_type: 'Mini Split Installation (New)',
                urgency: timeline === 'asap' ? 'immediate' : 'standard',
                notes: combinedNotes
            };

            const res = await fetch('/api/v1/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                sendGAEvent('event', 'generate_lead', {
                    event_category: 'Mini Split Funnel',
                    event_label: `Step 4 Completed - ${zones} Zones - ${city}`,
                    value: parseInt(zones) || 1
                });
                setIsSuccess(true);
            } else {
                const data = await res.json().catch(() => ({}));
                setErrorMessage(data.detail || 'Failed to transmit estimate request. Please call us directly.');
            }
        } catch (err) {
            console.error('Lead submission failed', err);
            setErrorMessage('Network connection error. Please call (808) 488-1111 directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="system-builder" className="w-full max-w-4xl mx-auto my-12 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600"></div>

            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <Sparkles className="size-3.5" />
                    Interactive Oahu Sizing Tool
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-black uppercase text-white tracking-wide">
                    Oahu Mini-Split <span className="text-cyan-400">System Builder</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
                    Configure your zoned cooling requirements in 30 seconds. Includes our <span className="text-white font-semibold">Free $250 In-Home Sizing & Electrical Load Survey</span> with zero obligation.
                </p>

                {/* Progress bar */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    {[1, 2, 3, 4].map((s) => (
                        <div 
                            key={s} 
                            className={`h-2 rounded-full transition-all duration-300 ${
                                s === step 
                                    ? 'w-10 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]' 
                                    : s < step 
                                        ? 'w-6 bg-cyan-600' 
                                        : 'w-6 bg-slate-800'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Form Steps */}
            {!isSuccess ? (
                <div>
                    {/* STEP 1: ROOMS / ZONES */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <Layers className="size-5 text-cyan-400" />
                                    Step 1: How many rooms need cooling?
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">Each zone operates independently with its own remote thermostat.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {zoneOptions.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        onClick={() => {
                                            setZones(opt.id);
                                            setStep(2);
                                        }}
                                        className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                                            zones === opt.id
                                                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between w-full mb-2">
                                            <span className="font-header font-black text-lg text-white group-hover:text-cyan-300 transition-colors">
                                                {opt.title}
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                                {opt.tag}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            {opt.desc}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all"
                                >
                                    Next: Property Type <ArrowRight className="size-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: PROPERTY & HOA CONTEXT */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <Home className="size-5 text-cyan-400" />
                                    Step 2: What type of property on Oahu?
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">We verify mounting surface, HOA compliance, and line-hide requirements.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3.5">
                                {propertyOptions.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        onClick={() => {
                                            setPropertyType(opt.id);
                                            setStep(3);
                                        }}
                                        className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                                            propertyType === opt.id
                                                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                                        }`}
                                    >
                                        <div>
                                            <span className="font-header font-bold text-base sm:text-lg text-white block mb-1 group-hover:text-cyan-300">
                                                {opt.title}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {opt.desc}
                                            </span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                            propertyType === opt.id ? 'border-cyan-400 bg-cyan-400' : 'border-slate-700'
                                        }`}>
                                            {propertyType === opt.id && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-5 py-2.5 text-slate-400 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                                >
                                    <ArrowLeft className="size-4" /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all"
                                >
                                    Next: Brand Preference <ArrowRight className="size-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: BRAND PREFERENCE */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <Wind className="size-5 text-cyan-400" />
                                    Step 3: Any preferred manufacturer?
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">All brands stocked in our Waipahu warehouse feature 10–12 year factory warranties.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {brandOptions.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        onClick={() => {
                                            setBrandPreference(opt.id);
                                            setStep(4);
                                        }}
                                        className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                                            brandPreference === opt.id
                                                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                                        }`}
                                    >
                                        <span className="font-header font-black text-base text-white group-hover:text-cyan-300 mb-1">
                                            {opt.name}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {opt.highlight}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-5 py-2.5 text-slate-400 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                                >
                                    <ArrowLeft className="size-4" /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all"
                                >
                                    Next: Get Free Survey <ArrowRight className="size-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: CONTACT & SCHEDULING (HIGHEST CONVERTING STEP) */}
                    {step === 4 && (
                        <motion.form
                            key="step4"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-5"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <Zap className="size-5 text-cyan-400" />
                                    Step 4: Lock In Your Free $250 Sizing & Electrical Survey
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">Our CT-36775 licensed specialists inspect room volume and electrical panel capacity with zero sales pressure.</p>
                            </div>

                            {/* Preferred contact mode (Text vs Call) */}
                            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
                                <span className="text-xs font-semibold text-slate-300 block mb-2">How would you prefer we communicate?</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setContactPref('text')}
                                        className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                                            contactPref === 'text'
                                                ? 'bg-cyan-500 text-slate-950 shadow-md'
                                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        }`}
                                    >
                                        <MessageSquare className="size-3.5" /> Text Me My Estimate
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactPref('call')}
                                        className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                                            contactPref === 'call'
                                                ? 'bg-cyan-500 text-slate-950 shadow-md'
                                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        }`}
                                    >
                                        <Phone className="size-3.5" /> Call Me Directly
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="First & Last Name"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Oahu) *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(808) 000-0000"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">City / Oahu Neighborhood *</label>
                                    <input
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="e.g. Ewa Beach, Mililani, Kailua, Honolulu"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Timeline</label>
                                    <select
                                        value={timeline}
                                        onChange={(e) => setTimeline(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                                    >
                                        <option value="asap">Immediate / Hot Weather Relief</option>
                                        <option value="30days">Within the Next 30 Days</option>
                                        <option value="planning">Planning / Renovation Phase</option>
                                    </select>
                                </div>
                            </div>

                            {errorMessage && (
                                <p className="text-red-400 text-xs text-center font-medium">{errorMessage}</p>
                            )}

                            {/* Trust signals strip */}
                            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
                                <span className="flex items-center gap-1"><ShieldCheck className="size-3.5 text-cyan-400" /> CT-36775 Licensed & Insured</span>
                                <span className="flex items-center gap-1"><Clock className="size-3.5 text-cyan-400" /> Waipahu Local Stock</span>
                                <span className="flex items-center gap-1"><Zap className="size-3.5 text-cyan-400" /> Panel Check Included</span>
                            </div>

                            <div className="flex justify-between items-center pt-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="px-5 py-2.5 text-slate-400 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                                >
                                    <ArrowLeft className="size-4" /> Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Transmitting Request...' : 'Claim Free Sizing Survey'}
                                    <ArrowRight className="size-4" />
                                </button>
                            </div>
                        </motion.form>
                    )}
                </div>
            ) : (
                /* SUCCESS STATE */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-5"
                >
                    <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                        <CheckCircle2 className="size-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-header font-black text-white uppercase tracking-wide">
                        Mahalo, {fullName || 'Neighbor'}!
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
                        Your <span className="text-cyan-400 font-bold">{zones} Zone Mini-Split</span> sizing request has been transmitted directly to our Waipahu dispatch office.
                    </p>
                    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-md mx-auto text-xs text-slate-400 space-y-1">
                        <p className="text-white font-semibold">What happens next?</p>
                        <p>A licensed CT-36775 technician will {contactPref === 'text' ? 'send you a text' : 'give you a quick call'} to confirm your {city || 'Oahu'} address and lock in your free in-home load & electrical survey.</p>
                    </div>

                    <div className="pt-4">
                        <a
                            href="tel:808-488-1111"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-sm rounded-xl border border-cyan-500/30 transition-colors"
                        >
                            <Phone className="size-4" /> Need immediate dispatch? Call (808) 488-1111
                        </a>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
