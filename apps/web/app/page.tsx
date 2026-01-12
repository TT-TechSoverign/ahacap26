'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <main className="pt-20">
            {/* Header / Nav */}
            <header className="fixed top-0 w-full z-50 glass-header bg-[#0b1120]/85 backdrop-blur-md border-b border-[#00AEEF]/20">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            alt="Affordable Home A/C Logo"
                            className="h-14 w-auto object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxHGx0EFSphxgpJhWyjXMSXCNX3vHtZxduWyCukjwL0uX1WDgyacjjBkfEEDQPogdeAC6dDohPwy0Vkj261MdlJjzOZKT-zZkNhJyyFLPScYdMrOmn7UPk0ppPdXGx5Y2DMBBKCJRfDg6Ci740gTFuua7k9jZZdxD5dGu2UNv2OPFwTDGEInNkhQ4IA_RDUCrm7UI6EPggpmAGTh5JhLDMe8C1uE2_hb7NmwPxbe_sR03beou7F8fUS9Q76pnEczEG7F_m-QQgdcTN"
                        />
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/shop" className="nav-link text-sm tracking-widest hover:text-primary transition-colors font-header font-bold text-white uppercase">SHOP INVENTORY</Link>
                        <Link href="#" className="nav-link text-sm tracking-widest hover:text-primary transition-colors font-header font-bold text-white uppercase">MAINTENANCE</Link>
                        <Link href="#" className="nav-link text-sm tracking-widest hover:text-primary transition-colors font-header font-bold text-white uppercase">MINI SPLITS</Link>
                        <Link href="#" className="nav-link text-sm tracking-widest hover:text-primary transition-colors font-header font-bold text-white uppercase">CENTRAL AC</Link>
                    </nav>
                    <button className="bg-primary text-background-dark px-6 py-2.5 rounded font-bold text-sm tracking-widest hover:bg-accent hover:text-white transition-all transform active:scale-95 uppercase font-header">
                        Book Online
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
                    <div className="z-10">
                        <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded text-accent text-xs font-bold tracking-widest mb-6">
                            EST. 2005 • OAHU, HI
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white uppercase font-header">
                            PRECISION <span className="text-primary neon-glow" style={{ textShadow: '0 0 10px rgba(0, 174, 239, 0.5)' }}>CLIMATE</span> CONTROL FOR THE ALOHA STATE
                        </h1>
                        <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-display">
                            Authorized Dealer. Engineering specialized cooling solutions for Hawaii's unique humidity. Since 2005, keeping Honolulu and Aiea homes cool and efficient.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/shop">
                                <button className="bg-primary text-background-dark px-8 py-4 rounded font-bold tracking-widest hover:bg-accent hover:text-white transition-all uppercase font-header">
                                    SHOP WINDOW UNITS (PICKUP ONLY)
                                </button>
                            </Link>
                            <button className="border border-white/20 text-white px-8 py-4 rounded font-bold tracking-widest hover:bg-white/10 transition-all uppercase font-header">
                                FREE ESTIMATE
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-all duration-700"></div>
                            <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcVdFY3rHs14g2-_QA7wRHU-vcgZckJP0be7QAsq2RCyag57umMKrw6azbu9TgP6l6Q1-76RYDTGDAxgvXt9Go3auTit553tQ1FsWe2T3HD1CVhY5Xg_I64wM8ipf8rtQY8IzMyjA5VOfq5QDVxP4F5g0oNiLj1TO8pimFeQldwv5G5easf3EbH5IWihuU_6T0g_Pcky_o4gcfvVwq1pDnFDoqd7rIrzOURx4kkiQ3Z_u12M1kNm43JkQ1u1M03lChyrrunm1QZiKP')" }}></div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-primary/30"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-accent/30"></div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-charcoal border-y border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <div>
                                <p className="text-white font-header text-xl leading-none font-bold">EST. 2005</p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Years Experience</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded border border-white/10 flex items-center justify-center text-accent group-hover:border-accent transition-colors">
                                <span className="material-symbols-outlined text-3xl">grade</span>
                            </div>
                            <div>
                                <p className="text-white font-header text-xl leading-none font-bold">5-STAR</p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Customer Rated</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                                <span className="material-symbols-outlined text-3xl">military_tech</span>
                            </div>
                            <div>
                                <p className="text-white font-header text-xl leading-none font-bold">ELITE</p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Dealer Status</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded border border-white/10 flex items-center justify-center text-accent group-hover:border-accent transition-colors">
                                <span className="material-symbols-outlined text-3xl">bolt</span>
                            </div>
                            <div>
                                <p className="text-white font-header text-xl leading-none font-bold">INSTANT</p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Emergency Dispatch</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-16 bg-background-dark overflow-hidden">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-black">
                        <iframe
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=1"
                            title="Affordable Home A/C Commercial"
                        >
                        </iframe>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="bg-charcoal/50 border-y border-white/5 py-8 overflow-hidden">
                <div className="relative flex items-center overflow-x-hidden">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-24" style={{ animation: 'scroll 30s linear infinite' }}>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">LG</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">GE APPLIANCES</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">MITSUBISHI ELECTRIC</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">FUJITSU</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">RHEEM</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">BOSCH</span>
                        {/* Duplicate for marquee effect */}
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">LG</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">GE APPLIANCES</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">MITSUBISHI ELECTRIC</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">FUJITSU</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">RHEEM</span>
                        <span className="text-2xl font-header text-slate-500 hover:text-primary transition-colors font-bold opacity-70 cursor-default">BOSCH</span>
                    </div>
                </div>
                <style jsx>{`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: flex;
                        width: 200%;
                    }
                `}</style>
            </section>

            {/* Core Services */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4 font-header">OUR CORE <span className="text-primary">SERVICES</span></h2>
                    <div className="h-1 w-20 bg-accent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#1a2333] p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-[#00AEEF] hover:shadow-[0_0_20px_rgba(0,174,239,0.15)] transition-all duration-300">
                        <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded">LOCAL PICKUP ONLY</div>
                        <div className="text-primary mb-2">
                            <span className="material-symbols-outlined text-5xl">storefront</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-header">RETAIL SHOP</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">Browse our live inventory of window units and portable A/C systems. Skip the shipping wait times—buy online and collect from our Aiea warehouse today.</p>
                            <Link href="/shop" className="text-primary flex items-center gap-2 text-sm font-bold tracking-widest group-hover:gap-4 transition-all uppercase font-header">
                                View Inventory <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#1a2333] p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-[#00AEEF] hover:shadow-[0_0_20px_rgba(0,174,239,0.15)] transition-all duration-300">
                        <div className="text-accent mb-2">
                            <span className="material-symbols-outlined text-5xl">engineering</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-header">EXPERT MAINTENANCE</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">Personalized service led by Chris Martinez. Our maintenance plans extend the life of your equipment and keep energy bills low in Hawaii's salt-air environment.</p>
                            <a className="text-accent flex items-center gap-2 text-sm font-bold tracking-widest group-hover:gap-4 transition-all uppercase font-header" href="#">
                                Meet the Team <span className="material-symbols-outlined">arrow_forward</span>
                            </a>
                        </div>
                    </div>

                    <div className="bg-[#1a2333] p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-[#00AEEF] hover:shadow-[0_0_20px_rgba(0,174,239,0.15)] transition-all duration-300">
                        <div className="text-primary mb-2">
                            <span className="material-symbols-outlined text-5xl">settings_input_component</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-header">DUCTLESS MINI SPLITS</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">Precision zone cooling with industry-leading 10-year warranties. Perfect for individual rooms or whole-home retrofits without invasive ductwork.</p>
                            <a className="text-primary flex items-center gap-2 text-sm font-bold tracking-widest group-hover:gap-4 transition-all uppercase font-header" href="#">
                                Warranty Info <span className="material-symbols-outlined">arrow_forward</span>
                            </a>
                        </div>
                    </div>

                    <div className="bg-[#1a2333] p-8 border border-white/5 rounded-lg flex flex-col gap-6 relative overflow-hidden group hover:border-[#00AEEF] hover:shadow-[0_0_20px_rgba(0,174,239,0.15)] transition-all duration-300">
                        <div className="text-accent mb-2">
                            <span className="material-symbols-outlined text-5xl">heat_pump</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-header">CENTRAL A/C SYSTEMS</h3>
                            <p className="text-slate-400 leading-relaxed mb-4">Full system replacements and new installations. We specialize in high-efficiency retrofits that can handle the toughest tropical heatwaves.</p>
                            <a className="text-accent flex items-center gap-2 text-sm font-bold tracking-widest group-hover:gap-4 transition-all uppercase font-header" href="#">
                                Retrofit Options <span className="material-symbols-outlined">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dispatch Ticket / Map Section */}
            <section className="py-24 bg-charcoal/50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Ticket Form */}
                    <div className="lg:col-span-5 bg-background-dark border border-white/10 p-8 rounded-lg shadow-xl relative">
                        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter font-header">DISPATCH TICKET</h2>
                            <span className="text-primary font-mono text-sm">#TX-2024-HI</span>
                        </div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">CLIENT NAME</label>
                                    <input className="w-full bg-charcoal border border-white/10 rounded focus:ring-primary focus:border-primary text-sm p-3 text-white" placeholder="John Doe" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SERVICE LOCATION</label>
                                    <input className="w-full bg-charcoal border border-white/10 rounded focus:ring-primary focus:border-primary text-sm p-3 text-white" placeholder="Oahu Neighborhood" type="text" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">UNIT TYPE</label>
                                <select className="w-full bg-charcoal border border-white/10 rounded focus:ring-primary focus:border-primary text-sm p-3 text-slate-400">
                                    <option>Central AC</option>
                                    <option>Mini Split</option>
                                    <option>Window Unit</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">URGENCY LEVEL</label>
                                <div className="flex gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input defaultChecked className="hidden peer" name="urgency" type="radio" />
                                        <div className="text-center p-3 border border-white/10 rounded peer-checked:border-primary peer-checked:text-primary text-xs font-bold transition-all uppercase">NORMAL</div>
                                    </label>
                                    <label className="flex-1 cursor-pointer">
                                        <input className="hidden peer" name="urgency" type="radio" />
                                        <div className="text-center p-3 border border-white/10 rounded peer-checked:border-accent peer-checked:text-accent text-xs font-bold transition-all uppercase">EMERGENCY</div>
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SYMPTOMS</label>
                                <textarea className="w-full bg-charcoal border border-white/10 rounded focus:ring-primary focus:border-primary text-sm p-3 text-white" placeholder="Describe the issue..." rows={3}></textarea>
                            </div>
                            <button className="w-full bg-primary text-background-dark font-bold py-4 rounded hover:bg-accent hover:text-white transition-all tracking-widest uppercase font-header">
                                Submit Ticket
                            </button>
                        </form>
                    </div>

                    {/* Warehouse Map Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="h-full flex flex-col">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2 uppercase font-header">Aiea Warehouse</h2>
                                <p className="text-slate-400 tracking-wide">98-1234 Kaahumanu St, Aiea, HI 96701</p>
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden border border-white/10 relative group min-h-[350px]">
                                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center bg-center bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADp9AwPk9zIh--yIFy3crR9WQdrvevCbG2jAHfVnx7OVhOcERWE-glp_DgktMJ72_fFDgAlQh-JchW1kaIlD4ig7nDNyPDIFE3VjJnjo6ZicLG8rSNH2rDTLyy2MiLxuRO58kzzW_LTOU8YvrdepJt4ZRM0LUYzYvThtAXMvRtXHkDJt3kZAXFTkgKquZ0K3phnkWEsilmK8N69qWMkaOYcWmk_aapyBQJWL69l7NQSvu9-Hukuf-gj4tmfDmYT6JQOZZhibqzx_rM')" }}>
                                    <div className="absolute inset-0 bg-background-dark/70"></div>
                                    <div className="relative flex flex-col items-center">
                                        <div className="size-12 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(0,174,239,0.5)]">
                                            <span className="material-symbols-outlined text-background-dark font-bold">location_on</span>
                                        </div>
                                        <div className="mt-4 bg-background-dark border border-primary px-4 py-2 rounded text-xs font-bold text-white tracking-widest uppercase font-header">
                                            Pickup Point Alpha
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 bg-background-dark/90 backdrop-blur p-4 border border-white/5 rounded flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-accent">schedule</span>
                                        <span className="text-sm font-bold text-white uppercase tracking-widest">Mon-Fri: 8AM - 5PM</span>
                                    </div>
                                    <button className="text-primary text-xs font-bold uppercase hover:text-accent transition-colors font-header">Get Directions</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background-dark border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
                        <div className="flex items-center gap-4">
                            <img alt="Affordable Home A/C Logo" className="h-20 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ1q-syCmDF1LjZFWGd9CheIzKTaKfwQ5fNDANVSKq9pv2w40ZoQSRFyGtUu2bF8-rN9zZLvGR5DcCkkayOvZRwg-Vg3Wcz6SF8Wfqz-fmNnBF4Itk0fpcWhMBBVUok36v_zwIZPGVIJjHRv1sGingYcEGj9xx07n_IIeDwRctfaM17yX4ET8kLlr1wyewCgzMWMTzPm4x2lhpOz-7FGnY4iSBJf-6R9XwF9YoP-IPDwGs0n203CGO1t1-VR9nHjpfqeyjsyGtGDx3" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 text-xs text-slate-500 font-bold tracking-widest uppercase">
                            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Service Areas</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Careers</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Request Quote</Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
                        <p className="text-[10px] text-slate-600 uppercase tracking-widest">© 2024 Affordable Home A/C. All rights reserved. LIC# 34211</p>
                        <div className="text-[10px] text-slate-600 uppercase tracking-widest">
                            Authorized Dealer • Serving Hawaii Since 2005
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
