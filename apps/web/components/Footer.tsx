'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/lib/context/ContentContext';

export default function Footer() {
    const { content } = useContent();
    const schedule = content.footer_schedule || {
        mini_split_label: "MINI SPLIT AC",
        window_ac_label: "WINDOW AC",
        mini_split_estimate_date: "Next Available Estimate: Feb 6",
        mini_split_install_date: "Next Available Install: Feb 12",
        window_ac_estimate_date: "Next Available Estimate: Feb 5",
        window_ac_install_date: "Next Available Install: Feb 8",
        general_availability_range: "Scheduling for week of February 2-9, 2026"
    };

    return (
        <footer className="bg-[#0a0e14] border-t border-white/5 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Availability Schedule Section */}
                <div className="border-b border-white/5 pb-6 mb-6">
                    {/* Glassmorphic Header Pill */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-1 rounded-full">
                            <p className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">SCHEDULING / AVAILABILITY</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-center">
                        {/* Line 1: Columns */}
                        <div className="grid grid-cols-2 max-w-4xl mx-auto w-full">
                            <h5 className="text-white font-header font-black uppercase tracking-widest text-base md:text-lg">
                                {schedule.mini_split_label}
                            </h5>
                            <h5 className="text-white font-header font-black uppercase tracking-widest text-base md:text-lg">
                                {schedule.window_ac_label}
                            </h5>
                        </div>

                        {/* Line 2: Specific Dates - Mobile Optimized (Stacked) */}
                        <div className="grid grid-cols-2 max-w-4xl mx-auto w-full gap-y-2">
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-primary font-bold uppercase tracking-wider text-[10px] md:text-xs flex flex-col md:block">
                                    <span className="opacity-80 mr-0 md:mr-2">Next Available Estimate:</span>
                                    <span>{schedule.mini_split_estimate_date.split(':').pop()?.trim()}</span>
                                </p>
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] md:text-xs flex flex-col md:block">
                                    <span className="opacity-80 mr-0 md:mr-2">Next Available Install:</span>
                                    <span>{schedule.mini_split_install_date.split(':').pop()?.trim()}</span>
                                </p>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-primary font-bold uppercase tracking-wider text-[10px] md:text-xs flex flex-col md:block">
                                    <span className="opacity-80 mr-0 md:mr-2">Next Available Estimate:</span>
                                    <span>{schedule.window_ac_estimate_date.split(':').pop()?.trim()}</span>
                                </p>
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] md:text-xs flex flex-col md:block">
                                    <span className="opacity-80 mr-0 md:mr-2">Next Available Install:</span>
                                    <span>{schedule.window_ac_install_date.split(':').pop()?.trim()}</span>
                                </p>
                            </div>
                        </div>

                        {/* Line 3: CTA Button (Replaces old date range) */}
                        <div className="pt-2 w-full flex justify-center">
                            <Link href="/contact" className="group">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-2 rounded-full group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                                    <p className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs group-hover:text-primary transition-colors">CONTACT US TO SET APPOINTMENT</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="relative h-32 w-32 -mb-2">
                            <Image
                                src="/assets/ahac-logo-bus-500x500xv2.svg"
                                alt="Affordable Home A/C"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Oahu&apos;s quality provider of energy-efficient cooling solutions. Specializing in Window Units, Mini-Split AC and Central AC services for island living.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Services</h4>
                        <ul className="space-y-4 w-full">
                            {[
                                { text: 'Mini Split AC', href: '/contact' },
                                { text: 'Window AC Shop', href: '/shop' },
                                { text: 'Mini Split AC Maintenance', href: '/contact' },
                                { text: 'Window AC Cleaning', href: '/contact' }
                            ].map((item) => (
                                <li key={item.text}>
                                    <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4 w-full">
                            {[
                                { text: 'Mini Split AC', href: '/contact' },
                                { text: 'Shop Inventory', href: '/shop' },
                                { text: 'Mini Split AC Maintenance', href: '/contact' },
                                { text: 'Window AC Cleaning', href: '/contact' },
                                { text: 'Service Areas', href: '/contact' },
                                { text: 'Contact Us', href: '/contact' }
                            ].map((item) => (
                                <li key={item.text}>
                                    <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Contact</h4>
                        <ul className="space-y-6 w-full">
                            <li className="flex gap-4 justify-center md:justify-start text-left">
                                <span className="material-symbols-outlined text-primary mt-1 shrink-0">location_on</span>
                                <div>
                                    <div className="text-white font-bold text-sm uppercase">Shop Location</div>
                                    <a href="https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797" target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors block">
                                        Waipahu Commercial Center<br />94-150 Leoleo St. #203<br />Waipahu, HI 96797
                                    </a>
                                    <div className="text-red-500 font-bold text-[10px] uppercase tracking-widest mt-1">By Appointment Only</div>
                                </div>
                            </li>
                            <li className="flex gap-4 justify-center md:justify-start text-left">
                                <span className="material-symbols-outlined text-primary mt-1 shrink-0">call</span>
                                <div>
                                    <div className="text-white font-bold text-sm uppercase">Phone</div>
                                    <a href="tel:808-488-1111" className="text-slate-400 text-sm hover:text-white transition-colors">(808) 488-1111</a>
                                </div>
                            </li>
                            <li className="flex gap-4 justify-center md:justify-start text-left">
                                <span className="material-symbols-outlined text-primary mt-1 shrink-0">mail</span>
                                <div>
                                    <div className="text-white font-bold text-sm uppercase">Email</div>
                                    <a href="mailto:office@affordablehome-ac.com" className="text-slate-400 text-sm hover:text-white transition-colors">office@affordablehome-ac.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Availability Schedule Section Moved to Top */}

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                        © 2026 Affordable Home A/C. All rights reserved.
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                            <span className="material-symbols-outlined text-sm text-primary">verified</span>
                            LIC# CT-36775
                        </span>
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                            <span className="material-symbols-outlined text-sm text-primary">shield</span>
                            Licensed | Insured | Bonded
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
