'use client';

import { DispatchWizard } from '@/components/DispatchWizard';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import contentData from '@/lib/content/content.json';

export default function ContactPage() {
    const { content } = useContent();

    return (
        <div className="bg-background-dark min-h-screen text-white selection:bg-primary selection:text-white pb-12 lg:pb-32">
            <main className="max-w-4xl mx-auto px-6 pt-[220px] md:pt-[240px]">
                <div className="text-center mb-8 lg:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/20 rounded-md text-primary font-mono text-[9px] lg:text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-[0_0_20px_rgba(0,174,239,0.1)] backdrop-blur-sm relative overflow-hidden group/badge">
                        <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000"></div>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,174,239,0.5)]"></span>
                        <EditableText contentKey="contact.badge" />
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-header font-bold uppercase tracking-tight mb-6">
                        <EditableText contentKey="contact.title" /> <span className="text-primary italic font-black shadow-primary/20 drop-shadow-2xl">
                            <EditableText contentKey="contact.title_highlight" />
                        </span>
                    </h1>
                    <p className="font-mono text-[10px] md:text-[11px] lg:text-[12px] font-black tracking-[0.3em] uppercase text-white max-w-3xl mx-auto leading-relaxed opacity-90">
                        <EditableText contentKey="contact.description" />
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:gap-12">
                    {/* section 2: Dispatch Wizard - Main Section */}
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-background-dark/50 border border-white/10 p-6 lg:p-8 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-md group max-w-5xl mx-auto">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_30px_rgba(0,174,239,0.3)]"></div>

                            <div className="flex flex-col items-center text-center mb-6 border-b border-white/5 pb-6 relative z-10">
                                <span className="font-mono text-[9px] font-black tracking-[0.5em] uppercase mb-4 text-primary opacity-60">
                                    {contentData.contact.wizard_interface}
                                </span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-header font-bold text-white uppercase tracking-tight mb-4">
                                    <EditableText contentKey="contact.wizard_title" />
                                </h2>
                                <p className="font-mono text-[10px] font-black tracking-[0.4em] uppercase italic text-white opacity-80">
                                    <EditableText contentKey="contact.wizard_subtitle" />
                                </p>
                            </div>

                            <div className="relative z-10 px-0 md:px-4">
                                <DispatchWizard />
                            </div>
                        </div>
                    </div>


                </div>


            </main>


        </div>
    );
}
