'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wrench, 
    Sparkles, 
    Snowflake, 
    Droplets, 
    Activity, 
    Volume2, 
    HelpCircle, 
    ArrowRight, 
    ArrowLeft, 
    Check, 
    Wind 
} from 'lucide-react';

export default function ACRepairFunnel() {
    const [step, setStep] = useState<number>(1);
    const [systemType, setSystemType] = useState<'Mini Split' | 'Window AC' | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [customNotes, setCustomNotes] = useState<string>('');

    const symptomsList = [
        { id: 'not_cooling', text: 'System Not Cooling / Blowing Warm Air', icon: Snowflake },
        { id: 'water_leak', text: 'Water Leaking (Indoor or Outdoor)', icon: Droplets },
        { id: 'weird_noises', text: 'Strange Noises (Rattling, Squealing, Grinding)', icon: Volume2 },
        { id: 'electrical_fault', text: 'Power Issues / Tripping Breakers', icon: Activity },
        { id: 'bad_odor', text: 'Musty Smell / Poor Air Quality', icon: Wind }
    ];

    const toggleSymptom = (text: string) => {
        if (selectedSymptoms.includes(text)) {
            setSelectedSymptoms(prev => prev.filter(s => s !== text));
        } else {
            setSelectedSymptoms(prev => [...prev, text]);
        }
    };

    const getContactLink = () => {
        const service = systemType === 'Mini Split' 
            ? 'Mini Split Diagnosis/Repair' 
            : 'Window AC Diagnosis/Repair';
        
        let notes = `Selected Symptoms: ${selectedSymptoms.join(', ')}.`;
        if (customNotes.trim()) {
            notes += ` Additional Notes: ${customNotes.trim()}`;
        }

        return `/contact?service=${encodeURIComponent(service)}&notes=${encodeURIComponent(notes)}`;
    };

    const variants = {
        enter: { opacity: 0, x: 20 },
        center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className="w-full bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_20px_rgba(0,229,255,0.4)]"></div>

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5 relative z-10">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-[#00E5FF]/70">
                    DIAGNOSTIC FUNNEL WIZARD
                </span>
                <span className="font-mono text-[9px] font-black text-slate-400">
                    STEP {step} OF 3
                </span>
            </div>

            <div className="relative z-10 min-h-[300px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-6"
                        >
                            <div className="text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-wider">
                                    What system needs repair?
                                </h3>
                                <p className="text-xs text-slate-400 font-sans mt-1">
                                    Select your system type to calibrate the diagnostic routine.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { type: 'Mini Split' as const, label: 'Ductless Mini Split', desc: 'Wall-mounted unit with outdoor condenser' },
                                    { type: 'Window AC' as const, label: 'Window / Sleeve AC', desc: 'Unit mounted in window frame or wall sleeve' }
                                ].map((sys) => (
                                    <button
                                        key={sys.type}
                                        type="button"
                                        onClick={() => setSystemType(sys.type)}
                                        className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 h-32 active:scale-[0.98] ${systemType === sys.type ? 'bg-[#00E5FF]/5 border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'}`}
                                        aria-label={`Select ${sys.label}`}
                                    >
                                        <div className="flex justify-between items-center w-full">
                                            <span className="font-header font-black text-sm uppercase tracking-widest text-white">{sys.label}</span>
                                            {systemType === sys.type && (
                                                <div className="w-5 h-5 rounded-full bg-[#00E5FF]/20 flex items-center justify-center border border-[#00E5FF]/40 text-[#00E5FF]">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2 font-sans font-light leading-relaxed">{sys.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    disabled={!systemType}
                                    onClick={() => setStep(2)}
                                    className="px-6 py-3 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-slate-950 font-header font-black uppercase text-[10px] tracking-widest rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                                    aria-label="Proceed to symptoms selection"
                                >
                                    Select Symptoms
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-6"
                        >
                            <div className="text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-wider">
                                    What symptoms are you experiencing?
                                </h3>
                                <p className="text-xs text-slate-400 font-sans mt-1">
                                    Select all that apply to help us prepare the right parts for your dispatch.
                                </p>
                            </div>

                            <div className="space-y-2 max-w-2xl mx-auto">
                                {symptomsList.map((sym) => {
                                    const Icon = sym.icon;
                                    const isSelected = selectedSymptoms.includes(sym.text);
                                    return (
                                        <button
                                            key={sym.id}
                                            type="button"
                                            onClick={() => toggleSymptom(sym.text)}
                                            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 text-left active:scale-[0.99] ${isSelected ? 'bg-[#00E5FF]/5 border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.05)]' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                                            aria-label={`Symptom: ${sym.text}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg border ${isSelected ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]' : 'bg-slate-950 border-white/5 text-slate-400'}`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-header font-bold text-xs uppercase tracking-wider text-white">{sym.text}</span>
                                            </div>
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#00E5FF]/20 border-[#00E5FF]/40 text-[#00E5FF]' : 'border-white/10'}`}>
                                                {isSelected && <Check className="w-3 h-3" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between pt-4 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-header font-black uppercase text-[10px] tracking-widest rounded-lg flex items-center gap-2 transition-all"
                                    aria-label="Go back to system type selection"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    type="button"
                                    disabled={selectedSymptoms.length === 0}
                                    onClick={() => setStep(3)}
                                    className="px-6 py-3 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-slate-950 font-header font-black uppercase text-[10px] tracking-widest rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                                    aria-label="Proceed to confirmation notes"
                                >
                                    Add Notes
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            className="space-y-6"
                        >
                            <div className="text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-wider">
                                    Any additional details?
                                </h3>
                                <p className="text-xs text-slate-400 font-sans mt-1">
                                    Describe any specific notes (brand of unit, error codes, height of installation).
                                </p>
                            </div>

                            <div className="max-w-xl mx-auto space-y-4">
                                <textarea
                                    value={customNotes}
                                    onChange={(e) => setCustomNotes(e.target.value)}
                                    className="w-full h-32 bg-slate-950 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#00E5FF]/50 outline-none transition-colors font-sans resize-none placeholder:text-slate-600"
                                    placeholder="Examples: unit is a Fujitsu model, flashing green light on display, installed on the second floor wall..."
                                    aria-label="Additional diagnostic notes"
                                />

                                <div className="p-4 bg-slate-950/60 border border-white/5 rounded-xl text-left space-y-2">
                                    <h4 className="font-header font-black uppercase text-[10px] tracking-widest text-[#00E5FF]">Symptom Summary</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                                        <strong>System:</strong> {systemType}<br/>
                                        <strong>Symptoms Selected:</strong> {selectedSymptoms.join(', ')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-header font-black uppercase text-[10px] tracking-widest rounded-lg flex items-center gap-2 transition-all"
                                    aria-label="Go back to symptoms selection"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <Link
                                    href={getContactLink()}
                                    className="px-8 py-3 bg-gradient-to-r from-[#00E5FF] to-cyan-500 hover:scale-[1.02] text-slate-950 font-header font-black uppercase text-[10px] tracking-widest rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                                    aria-label="Book Diagnostic Appointment"
                                >
                                    Book Diagnostic Appointment
                                    <Sparkles className="w-4 h-4 text-slate-950" />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
