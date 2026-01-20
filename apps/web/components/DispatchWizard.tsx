'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { EditableText } from './EditableText';
import { useContent } from '@/lib/context/ContentContext';

export function DispatchWizard() {
    const { content } = useContent();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleChange = () => {
        // Simple handler to ensure controlled inputs work
    };

    const services = content?.contact?.wizard?.services_list || [
        "Window AC Installation",
        "Window AC Cleaning",
        "Mini Split Estimate (New)",
        "Mini Split Estimate (Replace)",
        "Mini Split Maintenance",
        "Mini Split Diagnosis/Repair",
        "Central AC Estimate",
        "Central AC Maintenance",
        "Central AC Diag/Repair"
    ];

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-8 lg:gap-16 mb-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[60%] h-0.5 bg-white/5 -z-10"></div>
                <div
                    className="active-step-line absolute top-1/2 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 60}%` }}
                ></div>

                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-3 cursor-pointer relative z-10 group/step" onClick={() => setStep(s)}>
                        <div className={`size-10 lg:size-12 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-500 ${step >= s ? 'bg-primary border-primary text-black shadow-[0_0_20px_rgba(0,174,239,0.4)]' : 'bg-background-dark border-white/10 text-slate-600 group-hover/step:border-white/20'}`}>
                            {s === 1 ? <span className="material-symbols-outlined text-base lg:text-lg font-black">settings</span> : s === 2 ? <span className="material-symbols-outlined text-base lg:text-lg font-black">schedule</span> : <span className="material-symbols-outlined text-base lg:text-lg font-black">person</span>}
                        </div>
                        <span className={`font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-black transition-colors duration-300 ${step >= s ? 'text-white' : 'text-slate-600 group-hover/step:text-slate-400'}`}>
                            {s === 1 ? 'Service' : s === 2 ? 'Urgency' : 'Details'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step 1: Service Needs */}
            {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center mb-10 lg:mb-12">
                        <h3 className="text-2xl lg:text-3xl font-header font-black text-white uppercase tracking-tight mb-4">
                            <EditableText contentKey="contact.wizard.step1_title" />
                        </h3>
                        <p className="font-mono text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-60">
                            <EditableText contentKey="contact.wizard.step1_subtitle" />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {services.map((service: string, i: number) => (
                            <label key={i} className="cursor-pointer group relative">
                                <input type="checkbox" className="peer hidden" onChange={handleChange} />
                                <div className="flex items-center gap-4 p-5 lg:p-6 border border-white/10 rounded-xl bg-white/[0.03] transition-all duration-300 hover:bg-white/[0.08] hover:border-primary/40 peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:shadow-[0_0_25px_rgba(0,174,239,0.15)] h-full group-active:scale-[0.98]">
                                    <div className="size-5 rounded-full border-2 border-slate-600 flex items-center justify-center transition-all peer-checked:border-primary peer-checked:bg-primary">
                                        <span className="material-symbols-outlined text-[12px] text-black font-black opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                                    </div>
                                    <span className="text-sm lg:text-base font-black text-slate-300 peer-checked:text-white uppercase tracking-tight leading-tight group-hover:text-white transition-colors">
                                        <EditableText contentKey={`contact.wizard.services_list.${i}`} />
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                    <Button onClick={() => setStep(2)} className="w-full mt-6 py-4 uppercase font-bold tracking-widest text-sm hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)]">
                        <EditableText contentKey="contact.wizard.btn_next_urgency" /> <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                    </Button>
                </div>
            )}

            {/* Step 2: Urgency & Timing */}
            {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl lg:text-3xl font-header font-black text-white uppercase tracking-tight mb-4">
                            <EditableText contentKey="contact.wizard.step2_title" />
                        </h3>
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-60">
                            <EditableText contentKey="contact.wizard.step2_subtitle" />
                        </p>
                    </div>

                    {/* Time Frame */}
                    <div className="space-y-6 flex flex-col items-center">
                        <label className="font-mono text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black opacity-80 text-center mb-4">
                            <EditableText contentKey="contact.wizard.step2_urgency_label" /> <span className="text-primary">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                            {["ASAP", "Within 30 days", "No rush, shopping"].map((time, i) => (
                                <label key={i} className="cursor-pointer group">
                                    <input type="radio" name="time_frame" className="peer hidden" onChange={handleChange} />
                                    <div className="flex flex-col items-center justify-center p-6 lg:p-8 border border-white/10 rounded-xl bg-white/[0.03] text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-primary/40 peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:shadow-[0_0_25px_rgba(0,174,239,0.15)] h-full group-active:scale-[0.98]">
                                        <div className={`size-14 rounded-full mb-4 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-primary/30 peer-checked:border-primary/50 shadow-inner ${i === 0 ? 'text-primary bg-primary/5' : i === 1 ? 'text-accent bg-accent/5' : 'text-slate-400 bg-white/5'}`}>
                                            <span className="material-symbols-outlined text-2xl lg:text-3xl group-hover:scale-110 transition-transform">
                                                {i === 0 ? 'bolt' : i === 1 ? 'calendar_month' : 'shopping_bag'}
                                            </span>
                                        </div>
                                        <span className="text-[10px] lg:text-[11px] font-mono font-black text-slate-300 peer-checked:text-white uppercase tracking-[0.3em] group-hover:text-white transition-colors">{time}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Best Time */}
                    <div className="space-y-6 flex flex-col items-center">
                        <label className="font-mono text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black opacity-80 text-center mb-4">
                            <EditableText contentKey="contact.wizard.step2_contact_time_label" /> <span className="text-primary">*</span>
                        </label>
                        <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl">
                            {["Weekdays", "Weekends", "Morning", "Evening", "Afternoon"].map((time, i) => (
                                <label key={i} className="cursor-pointer min-w-[130px]">
                                    <input type="checkbox" className="peer hidden" onChange={handleChange} />
                                    <div className="text-center py-4 px-6 border border-white/10 rounded-lg bg-white/[0.03] text-slate-500 font-mono text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-white/[0.08] hover:text-white peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-white peer-checked:shadow-[0_0_20px_rgba(0,174,239,0.1)]">
                                        {time}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="ghost" type="button" onClick={() => setStep(1)} className="flex-1 py-4 uppercase font-bold tracking-widest text-sm border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white">
                            <EditableText contentKey="contact.wizard.btn_back" />
                        </Button>
                        <Button onClick={() => setStep(3)} className="flex-[2] py-4 uppercase font-bold tracking-widest text-sm hover:scale-[1.02] shadow-[0_0_20px_rgba(0,174,239,0.2)]">
                            <EditableText contentKey="contact.wizard.btn_next_contact" /> <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Logistics & Review */}
            {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl lg:text-3xl font-header font-black text-white uppercase tracking-tight mb-4">
                            <EditableText contentKey="contact.wizard.step3_title" />
                        </h3>
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-60">
                            <EditableText contentKey="contact.wizard.step3_subtitle" />
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 group">
                            <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                <EditableText contentKey="contact.wizard.field_first_name" /> <span className="text-primary">*</span>
                            </label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange} />
                        </div>
                        <div className="space-y-2 group">
                            <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                <EditableText contentKey="contact.wizard.field_last_name" /> <span className="text-primary">*</span>
                            </label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 group">
                            <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                <EditableText contentKey="contact.wizard.field_email" /> <span className="text-primary">*</span>
                            </label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="email" required onChange={handleChange} />
                        </div>
                        <div className="space-y-2 group">
                            <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                <EditableText contentKey="contact.wizard.field_phone" /> <span className="text-primary">*</span>
                            </label>
                            <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="tel" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 group">
                                <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                    <EditableText contentKey="contact.wizard.field_address" /> <span className="text-primary">*</span>
                                </label>
                                <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 group">
                                    <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                        <EditableText contentKey="contact.wizard.field_city" />
                                    </label>
                                    <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange} />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black group-hover:text-primary transition-colors">
                                        <EditableText contentKey="contact.wizard.field_zip" />
                                    </label>
                                    <input className="w-full bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20" type="text" required onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Source & Other */}
                    <div className="space-y-4 pt-4 border-t border-white/5 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar flex flex-col">
                        <div className="space-y-2 flex flex-col items-center">
                            <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black text-center mb-4">
                                <EditableText contentKey="contact.wizard.field_source" />
                            </label>
                            <select className="w-full max-w-md bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-2 text-slate-300 text-center">
                                <option>Google</option>
                                <option>Social Media</option>
                                <option>Referral</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-2 flex flex-col items-center">
                            <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black text-center mb-4">
                                <EditableText contentKey="contact.wizard.field_notes" />
                            </label>
                            <textarea className="w-full max-w-2xl bg-transparent border border-white/10 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm p-3 text-white placeholder-slate-600 transition-all hover:border-white/20 text-center" rows={1}></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                        <Button variant="ghost" type="button" onClick={() => setStep(2)} className="w-full sm:flex-1 py-4 lg:py-5 uppercase font-black tracking-[0.3em] text-[10px] border border-white/10 hover:bg-white/5 text-slate-500 hover:text-white transition-all rounded-xl order-2 sm:order-1">
                            <span className="material-symbols-outlined mr-2 text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                            <EditableText contentKey="contact.wizard.btn_back" />
                        </Button>
                        <Button className="w-full sm:flex-[2] py-4 lg:py-5 text-[11px] lg:text-xs font-black tracking-[0.4em] uppercase hover:scale-[1.02] shadow-[0_0_30px_rgba(0,174,239,0.2)] hover:shadow-[0_0_50px_rgba(0,174,239,0.4)] transition-all rounded-xl order-1 sm:order-2">
                            <EditableText contentKey="contact.wizard.btn_submit" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
