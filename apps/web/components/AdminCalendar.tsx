'use client';

import { EditableText } from './EditableText';
import contentData from '../content.json';
import { useContent } from '../lib/context/ContentContext';

export function AdminCalendar() {
    const { content } = useContent();

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="industrial-card p-6 lg:p-8 border border-white/10 rounded-2xl bg-white/[0.02] relative overflow-hidden group/card shadow-2xl border-primary/20 bg-primary/[0.03] max-w-5xl mx-auto backdrop-blur-md">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4 relative z-10">
                    <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,174,239,0.5)]"></span>
                        <EditableText contentKey="contact.calendar.title" />
                    </h4>
                    <span className="font-mono text-[9px] font-black tracking-[0.2em] px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded uppercase">
                        {contentData.contact.badge_label}
                    </span>
                </div>

                <div className="flex flex-col gap-2 relative z-10 px-0 md:px-8 lg:px-12">
                    {/* Split / Central - Cyan Theme */}
                    <div className="group/item relative flex flex-col items-center text-center w-full max-w-4xl mx-auto py-0">
                        {/* Radial Glow Background */}
                        <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full -z-10 opacity-50 group-hover/item:opacity-100 transition-opacity"></div>

                        <div className="flex items-center gap-6 mb-4 w-full justify-center">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                            <div className="font-mono text-[9px] lg:text-[10px] font-black text-primary uppercase tracking-[0.4em] px-6 py-2 border border-primary/30 rounded-full bg-primary/5 shadow-[0_0_20px_rgba(0,174,239,0.1)] backdrop-blur-sm">
                                <EditableText contentKey="contact.calendar.split_section_title" />
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                            <div className="flex flex-col items-center p-5 border-2 border-primary/10 rounded-2xl bg-gradient-to-br from-primary/[0.05] to-transparent shadow-[shadow-inner,0_0_30px_rgba(0,174,239,0.05)] group/date hover:border-primary/40 hover:bg-primary/[0.1] transition-all duration-500">
                                <div className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5 group-hover/date:text-primary transition-colors">
                                    <EditableText contentKey="contact.calendar.split_estimate_label" />
                                </div>
                                <div className="text-white font-black text-2xl lg:text-4xl tracking-tight drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]">
                                    <EditableText contentKey="contact.calendar.split_estimate_value" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center p-5 border-2 border-primary/10 rounded-2xl bg-gradient-to-br from-primary/[0.05] to-transparent shadow-[shadow-inner,0_0_30px_rgba(0,174,239,0.05)] group/date hover:border-primary/40 hover:bg-primary/[0.1] transition-all duration-500">
                                <div className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5 group-hover/date:text-primary transition-colors">
                                    <EditableText contentKey="contact.calendar.split_install_label" />
                                </div>
                                <div className="text-white font-black text-2xl lg:text-4xl tracking-tight drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]">
                                    <EditableText contentKey="contact.calendar.split_install_value" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Window AC - Green Theme */}
                    <div className="group/item relative flex flex-col items-center text-center w-full max-w-4xl mx-auto border-t border-white/10 pt-4 pb-0">
                        {/* Radial Glow Background */}
                        <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full -z-10 opacity-50 group-hover/item:opacity-100 transition-opacity mt-4"></div>

                        <div className="flex items-center gap-6 mb-4 w-full justify-center">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                            <div className="font-mono text-[9px] lg:text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] px-6 py-2 border border-emerald-500/30 rounded-full bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-sm">
                                <EditableText contentKey="contact.calendar.window_section_title" />
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                            <div className="flex flex-col items-center p-5 border-2 border-emerald-500/10 rounded-2xl bg-gradient-to-br from-emerald-500/[0.05] to-transparent shadow-[shadow-inner,0_0_30px_rgba(16,185,129,0.05)] group/date hover:border-emerald-500/40 hover:bg-emerald-500/[0.1] transition-all duration-500">
                                <div className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5 group-hover/date:text-emerald-400 transition-colors">
                                    <EditableText contentKey="contact.calendar.window_estimate_label" />
                                </div>
                                <div className="text-white font-black text-2xl lg:text-4xl tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                    <EditableText contentKey="contact.calendar.window_estimate_value" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center p-5 border-2 border-emerald-500/10 rounded-2xl bg-gradient-to-br from-emerald-500/[0.05] to-transparent shadow-[shadow-inner,0_0_30px_rgba(16,185,129,0.05)] group/date hover:border-emerald-500/40 hover:bg-emerald-500/[0.1] transition-all duration-500">
                                <div className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5 group-hover/date:text-emerald-400 transition-colors">
                                    <EditableText contentKey="contact.calendar.window_install_label" />
                                </div>
                                <div className="text-white font-black text-2xl lg:text-4xl tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                    <EditableText contentKey="contact.calendar.window_install_value" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
