import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#0a0e14] border-t border-white/5 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-6">
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
                    <div>
                        <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Services</h4>
                        <ul className="space-y-4">
                            {[
                                { text: 'Mini Split AC', href: '/contact' },
                                { text: 'Window AC Shop', href: '/shop' },
                                { text: 'Central AC', href: '/contact' },
                                { text: 'Window AC Cleaning', href: '/contact' }
                            ].map((item) => (
                                <li key={item.text}>
                                    <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { text: 'Mini Split AC', href: '/contact' },
                                { text: 'Shop Inventory', href: '/shop' },
                                { text: 'Central AC', href: '/contact' },
                                { text: 'Window AC Cleaning', href: '/contact' },
                                { text: 'Service Areas', href: '/contact' },
                                { text: 'Contact Us', href: '/contact' }
                            ].map((item) => (
                                <li key={item.text}>
                                    <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-header font-bold uppercase tracking-widest mb-6 text-lg">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                                <div>
                                    <div className="text-white font-bold text-sm uppercase">Shop Location</div>
                                    <a href="https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797" target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors block">
                                        Waipahu Commercial Center<br />94-150 Leoleo St. #203<br />Waipahu, HI 96797
                                    </a>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="material-symbols-outlined text-primary mt-1">call</span>
                                <div>
                                    <div className="text-white font-bold text-sm uppercase">Phone</div>
                                    <a href="tel:808-488-1111" className="text-slate-400 text-sm hover:text-white transition-colors">(808) 488-1111</a>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="material-symbols-outlined text-primary mt-1">mail</span>
                                <div>
                                    <div className="text-white font-bold text-sm uppercase">Email</div>
                                    <a href="mailto:office@affordablehome-ac.com" className="text-slate-400 text-sm hover:text-white transition-colors">office@affordablehome-ac.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                        © 2024 Affordable Home A/C. All rights reserved. <span className="text-primary ml-2">v2.1 (Hotfix Live)</span>
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
