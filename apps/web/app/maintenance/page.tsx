'use client';

import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { EditableText } from '@/components/EditableText';
import { useContent } from '@/lib/context/ContentContext';
import contentData from '../../content.json';

export default function MaintenancePage() {
    const { content } = useContent();

    return (
        <div className="bg-navy-deep text-slate-100 selection:bg-primary selection:text-white min-h-screen font-sans">
            {/* Header */}
            <header className="fixed top-9 w-full z-50 glass-header">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-20 w-80">
                            <Link href="/">
                                <Image
                                    src="/assets/ahac-logo-header-hv3.svg"
                                    alt="Affordable Home A/C"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </Link>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/shop" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">SHOP INVENTORY</Link>
                        <Link href="/maintenance" className="nav-link text-sm tracking-widest hover:text-primary transition-colors text-primary">AC CLEANING</Link>
                        <Link href="/mini-splits" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">MINI SPLITS</Link>
                        <Link href="/central-ac" className="nav-link text-sm tracking-widest hover:text-primary transition-colors">CENTRAL AC</Link>
                    </nav>
                    <Button className="uppercase">
                        Contact Us
                    </Button>
                </div>
            </header>
            <main className="pt-[116px]">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center">
                    <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcVdFY3rHs14g2-_QA7wRHU-vcgZckJP0be7QAsq2RCyag57umMKrw6azbu9TgP6l6Q1-76RYDTGDAxgvXt9Go3auTit553tQ1FsWe2T3HD1CVhY5Xg_I64wM8ipf8rtQY8IzMyjA5VOfq5QDVxP4F5g0oNiLj1TO8pimFeQldwv5G5easf3EbH5IWihuU_6T0g_Pcky_o4gcfvVwq1pDnFDoqd7rIrzOURx4kkiQ3Z_u12M1kNm43JkQ1u1M03lChyrrunm1QZiKP')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-transparent"></div>

                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-xs font-bold tracking-widest mb-6">
                                <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                                <EditableText contentKey="maintenance.hero.badge" />
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-header font-bold leading-tight mb-6 text-white uppercase">
                                <EditableText contentKey="maintenance.hero.title" /> <span className="text-primary neon-glow"><EditableText contentKey="maintenance.hero.title_highlight" /></span> <EditableText contentKey="maintenance.hero.title_suffix" />
                            </h1>
                            <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-display">
                                <EditableText contentKey="maintenance.hero.description" />
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-primary text-navy-deep px-8 py-4 rounded font-bold tracking-widest hover:bg-accent transition-all uppercase flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">calendar_today</span>
                                    <EditableText contentKey="maintenance.hero.cta_schedule" />
                                </button>
                                <button className="border border-white/20 text-white px-8 py-4 rounded font-bold tracking-widest hover:bg-white/10 transition-all uppercase">
                                    <EditableText contentKey="maintenance.hero.cta_rates" />
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="bg-navy-matte/80 backdrop-blur-md p-8 border border-white/10 rounded-2xl shadow-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-16 rounded-full border-2 border-primary overflow-hidden relative">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUciOGlRsd5Zlpf42tGU5Z5_GEsFBo7XAS3MF7_NyaRFZF1gqz9A6xa-vFT3WYe-oeeIibBmAnrSHqHGwjYMTwvyOwsQWU2lLk6mFNjNY--1wdWEbA66Vwqc23A1dK7S7gUkoPTwhFvWij7unWjCZX0yv4LKjEIKxmWB6gjOZLX58-eFg_G7T0ddCvJHU8Ka2JXPtSz561j8d6ZJmncYGTVtuTq7hG_ILXukfVwjNvK9OyeJfk2ohzGxc2tNNpafybhi7T-b9E1ly0"
                                            alt="Chris Martinez"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-tight"><EditableText contentKey="maintenance.technician.name" /></h4>
                                        <p className="text-primary text-xs font-bold uppercase tracking-widest"><EditableText contentKey="maintenance.technician.title" /></p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <span className="material-symbols-outlined text-accent">verified</span>
                                        <span><EditableText contentKey="maintenance.technician.cert1" /></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <span className="material-symbols-outlined text-accent">verified</span>
                                        <span><EditableText contentKey="maintenance.technician.cert2" /></span>
                                    </div>
                                    <p className="italic text-slate-400 text-sm"><EditableText contentKey="maintenance.technician.quote" /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits / Process Video */}
                <section className="bg-charcoal border-y border-white/5 py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-sm font-bold text-primary tracking-[0.4em] mb-4">ENGINEERING EXCELLENCE</h2>
                            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-black">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=1"
                                    title="Deep Cleaning Process Demonstration"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: "eco", title: "MOLD FREE", sub: "Guaranteed Remediation", color: "text-primary" },
                                { icon: "thunderstorm", title: "SALT PROTECT", sub: "Corrosion Barrier", color: "text-accent" },
                                { icon: "speed", title: "30% MORE CFM", sub: "Efficiency Restored", color: "text-primary" },
                                { icon: "medical_services", title: "HYGIENIC AIR", sub: "Pathogen Neutralization", color: "text-accent" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className={`material-symbols-outlined text-4xl ${item.color}`}>{item.icon}</span>
                                    <div>
                                        <p className="text-white font-header text-xl">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Professional Section */}
                <section className="py-24 bg-navy-deep">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl font-header font-bold text-white mb-8"><EditableText contentKey="maintenance.climate.title" /> <span className="text-primary"><EditableText contentKey="maintenance.climate.title_highlight" /></span> <EditableText contentKey="maintenance.climate.title_suffix" /></h2>
                            <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                                <p><EditableText contentKey="maintenance.climate.description_p1" /></p>
                                <p><EditableText contentKey="maintenance.climate.description_p2_prefix" /> <span className="text-white font-bold"><EditableText contentKey="maintenance.climate.description_p2_highlight" /></span> <EditableText contentKey="maintenance.climate.description_p2_suffix" /></p>
                                <p><EditableText contentKey="maintenance.climate.description_p3_prefix" /> <span className="text-accent font-bold"><EditableText contentKey="maintenance.climate.description_p3_highlight" /></span> <EditableText contentKey="maintenance.climate.description_p3_suffix" /></p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { val: "90%", label: "Efficiency Drop from Dirty Coils", color: "text-primary" },
                                { val: "24h", label: "Mold Spore Replication Cycle", color: "text-accent" },
                                { val: "-$15/mo", label: "Avg Energy Bill Reduction", color: "text-white" },
                                { val: "100%", label: "Odor Elimination", color: "text-primary" },
                            ].map((stat, i) => (
                                <div key={i} className="industrial-card p-6 rounded-xl flex flex-col justify-center text-center bg-[#1a2333] border border-white/5">
                                    <p className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.val}</p>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-24 bg-charcoal/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl font-header font-bold text-white mb-4 uppercase">OUR PROPRIETARY 25-POINT <span className="text-primary">SANITIZATION</span> PROCESS</h2>
                            <p className="text-slate-500 tracking-widest text-sm uppercase">Medical-Grade Restoration for Residential Window Units</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2 md:row-span-2 industrial-card rounded-2xl p-8 border-l-4 border-l-primary relative overflow-hidden group bg-[#1a2333]">
                                <div className="absolute -right-10 -top-10 text-[120px] opacity-5 text-white select-none pointer-events-none font-header">01</div>
                                <span className="material-symbols-outlined text-5xl text-primary mb-6">sanitizer</span>
                                <h3 className="text-2xl font-bold font-header text-white mb-4"><EditableText contentKey="maintenance.process.step1_title" /></h3>
                                <p className="text-slate-400 leading-relaxed mb-6"><EditableText contentKey="maintenance.process.step1_description" /></p>
                                <ul className="space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2"><span className="size-1.5 bg-primary rounded-full"></span> <EditableText contentKey="maintenance.process.step1_point1" /></li>
                                    <li className="flex items-center gap-2"><span className="size-1.5 bg-primary rounded-full"></span> <EditableText contentKey="maintenance.process.step1_point2" /></li>
                                </ul>
                            </div>

                            {[
                                { title: "BLOWER WHEEL REBALANCING", desc: "Removing buildup from fan blades to eliminate vibrations and motor strain.", icon: "settings_suggest", color: "text-accent", border: "border-t-4 border-t-accent" },
                                { title: "DRAIN CHANNEL FLUSH", desc: "Clearing standing water paths to prevent rust and overflow leaks.", icon: "waves", color: "text-primary", border: "" },
                                { title: "FIN COMBING", desc: "Precision alignment of aluminum fins for maximum thermodynamic exchange.", icon: "shield", color: "text-accent", border: "" },
                                { title: "DELTA T TESTING", desc: "Digital verification of intake vs. output temps to confirm peak delta performance.", icon: "thermostat", color: "text-primary", border: "border-b-4 border-b-primary" },
                            ].map((step, i) => (
                                <div key={i} className={`industrial-card rounded-2xl p-6 bg-[#1a2333] ${step.border}`}>
                                    <span className={`material-symbols-outlined text-3xl mb-4 ${step.color}`}>{step.icon}</span>
                                    <h3 className="font-bold font-header text-white mb-2">{step.title}</h3>
                                    <p className="text-xs text-slate-400">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Before & After */}
                <section className="py-24 bg-navy-deep">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-header font-bold text-white mb-12 uppercase text-center">BEFORE & AFTER <span className="text-primary">TRANSFORMATION</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <div className="aspect-video bg-navy-matte rounded-xl overflow-hidden border border-white/10 relative">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuADp9AwPk9zIh--yIFy3crR9WQdrvevCbG2jAHfVnx7OVhOcERWE-glp_DgktMJ72_fFDgAlQh-JchW1kaIlD4ig7nDNyPDIFE3VjJnjo6ZicLG8rSNH2rDTLyy2MiLxuRO58kzzW_LTOU8YvrdepJt4ZRM0LUYzYvThtAXMvRtXHkDJt3kZAXFTkgKquZ0K3phnkWEsilmK8N69qWMkaOYcWmk_aapyBQJWL69l7NQSvu9-Hukuf-gj4tmfDmYT6JQOZZhibqzx_rM"
                                        alt="Dirty Coil"
                                        fill
                                        className="object-cover grayscale opacity-50"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-black/80 px-4 py-2 text-xs font-bold tracking-widest border border-white/20">MOLD CONTAMINATION</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Initial Assessment</span>
                                    <span className="text-xs font-bold text-red-500 uppercase">Pre-Sanitization</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-video bg-navy-matte rounded-xl overflow-hidden border border-primary/30 relative">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuADp9AwPk9zIh--yIFy3crR9WQdrvevCbG2jAHfVnx7OVhOcERWE-glp_DgktMJ72_fFDgAlQh-JchW1kaIlD4ig7nDNyPDIFE3VjJnjo6ZicLG8rSNH2rDTLyy2MiLxuRO58kzzW_LTOU8YvrdepJt4ZRM0LUYzYvThtAXMvRtXHkDJt3kZAXFTkgKquZ0K3phnkWEsilmK8N69qWMkaOYcWmk_aapyBQJWL69l7NQSvu9-Hukuf-gj4tmfDmYT6JQOZZhibqzx_rM"
                                        alt="Clean Coil"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-primary/10"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-primary/90 text-navy-deep px-4 py-2 text-xs font-bold tracking-widest">CLINICAL CLEAN</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Post-Service</span>
                                    <span className="text-xs font-bold text-accent uppercase">Efficiency Restored</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Coverage Map */}
                <section className="py-24 bg-charcoal">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5">
                            <h2 className="text-4xl font-header font-bold text-white mb-6 uppercase">OAHU SERVICE <span className="text-primary">COVERAGE</span></h2>
                            <p className="text-slate-400 mb-8">Rapid dispatch available for the following communities:</p>
                            <div className="grid grid-cols-2 gap-y-4">
                                {["HONOLULU", "AIEA", "KANEOHE", "KAPOLEI", "EWA BEACH", "PEARL CITY", "KAILUA", "MILILANI"].map((city) => (
                                    <a key={city} className="text-slate-300 hover:text-primary transition-colors flex items-center gap-2" href="#">
                                        <span className="material-symbols-outlined text-sm">location_on</span> {city}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 grayscale contrast-125 opacity-70 min-h-[400px] relative">
                            <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuADp9AwPk9zIh--yIFy3crR9WQdrvevCbG2jAHfVnx7OVhOcERWE-glp_DgktMJ72_fFDgAlQh-JchW1kaIlD4ig7nDNyPDIFE3VjJnjo6ZicLG8rSNH2rDTLyy2MiLxuRO58kzzW_LTOU8YvrdepJt4ZRM0LUYzYvThtAXMvRtXHkDJt3kZAXFTkgKquZ0K3phnkWEsilmK8N69qWMkaOYcWmk_aapyBQJWL69l7NQSvu9-Hukuf-gj4tmfDmYT6JQOZZhibqzx_rM')] bg-cover bg-center"></div>
                            <div className="absolute inset-0 bg-navy-deep/80"></div>
                            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                <span className="material-symbols-outlined text-5xl text-primary animate-bounce">location_away</span>
                                <p className="mt-4 font-bold tracking-widest text-white uppercase">Island-Wide Mobile Units</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Hub */}
                <section className="py-24 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-xl font-header font-bold text-white mb-8 tracking-widest text-center uppercase"><EditableText contentKey="maintenance.tech_hub.title" /></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { text: content?.maintenance?.tech_hub?.link1 || "Energy Star Maintenance Guidelines", icon: "menu_book" },
                                { text: content?.maintenance?.tech_hub?.link2 || "EPA Indoor Air Quality Standards", icon: "policy" },
                                { text: content?.maintenance?.tech_hub?.link3 || "Official Service Manuals & Diagrams", icon: "support_agent" }
                            ].map((item, i) => (
                                <a key={i} className="industrial-card p-6 rounded-xl flex items-center gap-4 group bg-[#1a2333]" href="#">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
                                    <span className="text-sm font-bold tracking-tight text-slate-300 group-hover:text-primary">{item.text}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-navy-deep">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-header font-bold text-white mb-12 text-center uppercase">FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span></h2>
                        <div className="space-y-6">
                            {[
                                { q: "How often should I have my window A/C professionally cleaned in Oahu?", a: "Due to our high humidity and salt-air concentration, we recommend a deep clinical sanitization every 6-12 months for primary living spaces to prevent mold buildup and corrosion." },
                                { q: "Does dirty window A/C impact electricity bills?", a: "Yes. Clogged coils force the compressor to work 30-50% harder to achieve the same cooling effect, leading to significantly higher MECO/HECO bills and premature motor failure." },
                                { q: "Can I just use a spray bottle from the hardware store?", a: "Hardware store sprays only treat the surface. Our process involves full teardown and internal decontamination of the blower wheel and drain pan where 90% of mold actually resides." }
                            ].map((faq, i) => (
                                <div key={i} className="border-b border-white/10 pb-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-primary text-navy-deep p-4 rounded-full shadow-2xl flex items-center gap-3 font-bold hover:scale-105 transition-all group">
                    <span className="hidden group-hover:inline ml-2 uppercase text-xs tracking-widest"><EditableText contentKey="maintenance.floating_cta" /></span>
                    <span className="material-symbols-outlined">rocket_launch</span>
                </button>
            </div>
        </div>
    );
}
