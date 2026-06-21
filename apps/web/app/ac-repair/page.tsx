import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ACRepairFunnel from '@/components/ACRepairFunnel';
import { BackToTop } from '@/components/BackToTop';
import { 
    Wrench, 
    Snowflake, 
    Droplets, 
    AlertTriangle, 
    ShieldCheck, 
    Truck, 
    Clock, 
    CheckCircle,
    MapPin,
    HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Oahu AC Repair & Diagnostic Services | Affordable Home A/C',
    description: 'Need AC repair near me in Honolulu, Pearl City, or Kapolei? We provide expert troubleshooting, leak repairs, and diagnostic services across Oahu, Hawaii.',
    alternates: {
        canonical: '/ac-repair',
    },
    openGraph: {
        title: 'Oahu AC Repair & Diagnostic Services | Affordable Home A/C',
        description: 'Need AC repair near me in Honolulu, Pearl City, or Kapolei? We provide expert troubleshooting, leak repairs, and diagnostic services across Oahu, Hawaii.',
        url: '/ac-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

const serviceAreas = [
    'Aiea', 'Pearl City', 'Mililani', 'Waipio Gentry', 'Waikele',
    'Honolulu', 'Kalihi', 'Manoa', 'Kaimuki', 'Hawaii Kai', 
    'Salt Lake', 'Aina Haina', 'Kahala', 'McCully', 'Makiki',
    'Kapolei', 'Ewa Beach', 'Waipahu', 'Kunia',
    'Kailua', 'Kaneohe', 'Kahaluu'
];

export default function ACRepairPage() {
    const repairSolutions = [
        {
            title: 'System Not Cooling',
            desc: 'Compressor failures, refrigerant leaks, or fan issues blowing warm air instead of cooling.',
            icon: Snowflake
        },
        {
            title: 'Water Leaks / Condensation',
            desc: 'Clogged drain lines, frozen coils, or pump malfunctions causing pooling water.',
            icon: Droplets
        },
        {
            title: 'Electrical & Power Faults',
            desc: 'Tripped breakers, wiring corrosion, or control board short circuits.',
            icon: AlertTriangle
        },
        {
            title: 'Weird Noises & Vibrations',
            desc: 'Rattling blower assemblies, worn bearings, or debris hitting internal fans.',
            icon: Wrench
        }
    ];

    const repairFaqs = [
        {
            q: 'How quickly can a technician be dispatched for a repair?',
            a: 'We offer prompt scheduling across Oahu. We typically schedule technicians within 24-48 hours depending on volume. Schedule online using our diagnostic wizard for prompt service.'
        },
        {
            q: 'What is your diagnostic service fee?',
            a: 'We charge a flat-rate diagnostic fee to cover the trip charge and complete system inspection. This fee is credited towards any approved repair solutions we perform.'
        },
        {
            q: 'Do you repair all AC brands?',
            a: 'Yes, our licensed technicians are trained to repair all major brands, including Fujitsu, Mitsubishi, Daikin, Carrier, LG, and GE, for both ductless mini-split and window systems.'
        },
        {
            q: 'Is there a warranty on your repair work?',
            a: 'Yes! We stand behind our quality of service. All repair work includes a 1-year warranty on parts replaced by our team and our standard craftsmanship guarantee.'
        }
    ];

    return (
        <div className="min-h-screen bg-background-dark font-sans text-white pb-24 relative overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            {/* 1. HERO SECTION */}
            <section className="relative z-10 pt-[140px] md:pt-[165px] lg:pt-[175px] pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Expert AC Diagnostics
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-header font-black tracking-tight uppercase leading-none max-w-4xl">
                        Expert A/C Repair <br />
                        <span className="text-primary drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]">Island-wide Oahu</span>
                    </h1>
                    
                    <div className="w-24 h-1 bg-primary shadow-[0_0_10px_rgba(0,174,239,0.5)]"></div>
                    
                    <p className="max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Don&apos;t let Hawaii&apos;s humidity take over. From quick window AC troubleshooting to complete ductless mini-split diagnostics, our licensed HVAC technicians restore comfort fast.
                    </p>
                </div>
            </section>

            {/* 2. SOLUTIONS & DIAGNOSTIC WIZARD GRID */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
                
                {/* Left Side: Services List & Trust Badges */}
                <div className="lg:col-span-6 space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-header font-black uppercase tracking-wider text-white">
                            Common A/C Failures We Solve
                        </h2>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">
                            Hawaii&apos;s heavy salt air and heat accelerate wear. We target and resolve these common cooling system issues:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {repairSolutions.map((sol, index) => {
                            const Icon = sol.icon;
                            return (
                                <div key={index} className="p-6 bg-surface-dark/60 border border-border-dark rounded-2xl group hover:border-primary/20 hover:shadow-[0_0_20px_rgba(0,174,239,0.05)] transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-header font-black text-sm uppercase text-white mb-2 tracking-wider">
                                        {sol.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                                        {sol.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border-dark">
                        <div className="flex gap-3 items-center">
                            <Truck className="w-8 h-8 text-primary shrink-0" />
                            <div>
                                <h4 className="font-header font-black text-[10px] uppercase text-white tracking-widest">Fast Dispatch</h4>
                                <p className="text-[9px] text-slate-400 font-sans">Island-wide fleet ready</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                            <div>
                                <h4 className="font-header font-black text-[10px] uppercase text-white tracking-widest">Licensed Pros</h4>
                                <p className="text-[9px] text-slate-400 font-sans">Fully bonded & insured</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Clock className="w-8 h-8 text-primary shrink-0" />
                            <div>
                                <h4 className="font-header font-black text-[10px] uppercase text-white tracking-widest">1-Yr Warranty</h4>
                                <p className="text-[9px] text-slate-400 font-sans">All repair work covered</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive Diagnostics Wizard */}
                <div className="lg:col-span-6">
                    <ACRepairFunnel />
                </div>
            </section>

            {/* 3. FAQ SECTION */}
            <section className="relative z-10 max-w-4xl mx-auto px-6 mt-24">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-header font-black uppercase tracking-wider text-white">
                        Repair FAQ
                    </h2>
                    <div className="w-16 h-0.5 bg-primary mx-auto mt-3 shadow-[0_0_8px_rgba(0,174,239,0.4)]"></div>
                </div>

                <div className="space-y-4">
                    {repairFaqs.map((faq, index) => (
                        <div key={index} className="p-6 bg-surface-dark/40 border border-border-dark rounded-2xl space-y-2">
                            <h3 className="font-header font-black text-xs uppercase tracking-wider text-white flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                                {faq.q}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light pl-6">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. GEOGRAPHICAL COVERAGE (22 CITIES) */}
            <section className="relative z-10 max-w-5xl mx-auto px-6 mt-24 border-t border-border-dark pt-16">
                <div className="text-center mb-10">
                    <h2 className="text-xl md:text-2xl font-header font-black uppercase tracking-widest text-primary">
                        Oahu Coverage Areas
                    </h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">
                        Professional diagnostic dispatch across 22 serviced cities
                    </p>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {serviceAreas.map((city) => (
                        <li key={city}>
                            <Link 
                                href={`/service-areas/${city.toLowerCase().replace(/ /g, '-')}`}
                                className="p-3 bg-surface-dark/50 border border-border-dark rounded-xl flex items-center gap-2 text-xs text-slate-300 hover:border-primary/40 hover:text-white transition-all group cursor-pointer"
                                aria-label={`AC repair services in ${city}`}
                            >
                                <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                                <span className="truncate">{city}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <BackToTop visible={true} />
        </div>
    );
}
