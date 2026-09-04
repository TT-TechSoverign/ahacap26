import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ACRepairFunnel = dynamic(() => import('@/components/ACRepairFunnel'), {
    ssr: false,
    loading: () => <div className="min-h-[400px] bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex items-center justify-center text-slate-400 font-mono text-xs uppercase tracking-widest animate-pulse">Loading System Diagnostic Wizard...</div>
});
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
    HelpCircle,
    Phone,
    ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: 'Mini Split AC Repair Oahu | Diagnostic Troubleshooting | CT-36775 Licensed | Affordable Home A/C'
    },
    description: 'Fast diagnostic troubleshooting & repairs for ductless mini splits across Oahu. Licensed CT-36775 HVAC technicians pinpoint compressor faults, leaks, and sensor codes. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-repair',
    },
    openGraph: {
        title: 'Mini Split AC Repair Oahu | Diagnostic Troubleshooting | CT-36775 Licensed | Affordable Home A/C',
        description: 'Fast diagnostic troubleshooting & repairs for ductless mini splits across Oahu. Licensed CT-36775 HVAC technicians pinpoint compressor faults, leaks, and sensor codes. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Oahu Mini Split AC Repair and Diagnostics',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mini Split AC Repair Oahu | Diagnostic Troubleshooting | CT-36775 Licensed | Affordable Home A/C',
        description: 'Fast diagnostic troubleshooting & repairs for ductless mini splits across Oahu. Licensed CT-36775 HVAC technicians pinpoint compressor faults, leaks, and sensor codes. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
            q: 'How quickly can a technician be dispatched for an AC repair on Oahu?',
            a: 'We offer diagnostic dispatch across Oahu based on our soonest availability (subject to current scheduling, technician availability, and seasonal demand). Peak summer volume may result in booking queues several weeks out. Use our online diagnostic wizard to submit your request and secure the next open slot.'
        },
        {
            q: 'What does your diagnostic service fee cover?',
            a: 'We charge a flat-rate diagnostic fee that covers our licensed technician\'s on-site dispatch, dedicated travel time, and a comprehensive electrical and mechanical inspection to pinpoint the exact root cause of your system failure (subject to technician scheduling and on-site physical inspection). Our technician provides an upfront, itemized repair estimate before any repair work begins so you have complete cost transparency with zero surprises.'
        },
        {
            q: 'Do you repair all ductless mini-split brands?',
            a: 'Yes. Our CT-36775 licensed technicians are trained to diagnose and repair all major ductless mini-split brands on Oahu, including Mitsubishi Electric, Fujitsu Halcyon, Daikin, and Carrier (subject to manufacturer OEM parts availability, unit age, and overall equipment condition).'
        },
        {
            q: 'Is there a warranty on your repair work?',
            a: 'Yes! We stand behind our workmanship. All qualifying repair work includes a 14-day warranty on labor craftsmanship and newly installed replacement parts (subject to normal residential operating conditions, pre-existing system defects, and manufacturer component terms).'
        },
        {
            q: 'Do you repair window air conditioners or central AC systems?',
            a: 'Our repair and diagnostic services are dedicated specifically to ductless mini-split heat pumps and air handlers. For window AC units, we provide full chemical teardown cleaning and rust-inhibitor servicing ($275 flat rate) at our Waipahu warehouse, but we do not perform sealed-refrigerant or compressor rebuilds on window units. All service acceptances are subject to an initial phone consultation, detailed scope of work, and management approval to accept.'
        },
        {
            q: 'Can every mini-split problem be resolved on the initial diagnostic visit?',
            a: 'Many common issues—such as clogged condensate lines, electrical contactors, run capacitors, or sensor calibration—can often be resolved during the initial visit. More extensive repairs requiring specialized OEM inverter circuit boards, proprietary electronic expansion valves, or replacement condenser coils are subject to manufacturer factory parts delivery and follow-up crew scheduling.'
        }
    ];

    const repairFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": repairFaqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    const repairServiceSchema = {
        "@context": "https://schema.org",
        "@type": "HVACService",
        "name": "Oahu AC Repair & Diagnostic Services",
        "provider": {
            "@type": "HVACBusiness",
            "name": "Affordable Home A/C",
            "telephone": "+1-808-488-1111",
            "licenseNumber": "CT-36775",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "94-150 Leoleo St. #203",
                "addressLocality": "Waipahu",
                "addressRegion": "HI",
                "postalCode": "96797",
                "addressCountry": "US"
            }
        },
        "areaServed": "Oahu",
        "description": "Expert air conditioning troubleshooting, refrigerant leak detection, and electrical diagnostics across Oahu (subject to scheduling and parts availability)."
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.affordablehome-ac.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "AC Repair & Diagnostics",
                "item": "https://www.affordablehome-ac.com/ac-repair"
            }
        ]
    };

    return (
        <main className="min-h-screen bg-background-dark font-sans text-white pb-24 relative overflow-hidden">
            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(repairFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(repairServiceSchema) }}
            />

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
                        Expert AC Diagnostics • CT-36775 Licensed
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-header font-black tracking-tight uppercase leading-none max-w-4xl">
                        Expert A/C Repair <br />
                        <span className="text-primary drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]">Island-wide Oahu</span>
                    </h1>
                    
                    <div className="w-24 h-1 bg-primary shadow-[0_0_10px_rgba(0,174,239,0.5)]"></div>
                    
                    <p className="max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Don&apos;t let Hawaii&apos;s humidity take over. Our CT-36775 licensed HVAC specialists provide complete ductless mini-split diagnostics and troubleshooting across Oahu, restoring cool comfort fast (subject to technician scheduling and crew availability).
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                        <a
                            href="#diagnostic-wizard"
                            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,174,239,0.4)] hover:shadow-[0_0_35px_rgba(0,174,239,0.6)] transition-all flex items-center justify-center gap-2"
                        >
                            Start Diagnostic Wizard <Wrench className="size-4" />
                        </a>
                        <a
                            href="tel:808-488-1111"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                        >
                            <Phone className="size-4 text-primary" /> (808) 488-1111
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. COMMON A/C FAILURES WE SOLVE SECTION */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-header font-black uppercase tracking-wider text-white">
                        Common A/C Failures We Solve
                    </h2>
                    <div className="w-16 h-1 bg-primary mx-auto shadow-[0_0_10px_rgba(0,174,239,0.5)]"></div>
                    <p className="text-sm text-slate-400 font-sans leading-relaxed">
                        Hawaii&apos;s heavy salt air and heat accelerate wear. We target and resolve these common cooling system issues (all repairs subject to on-site physical diagnostic inspection and scope of work):
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-border-dark max-w-4xl mx-auto">
                    <div className="flex gap-3 items-center">
                        <Truck className="w-8 h-8 text-primary shrink-0" />
                        <div>
                            <h4 className="font-header font-black text-[10px] uppercase text-white tracking-widest">Soonest Availability</h4>
                            <p className="text-[9px] text-slate-400 font-sans">Subject to scheduling & crew capacity</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                        <div>
                            <h4 className="font-header font-black text-[10px] uppercase text-white tracking-widest">Licensed Pros</h4>
                            <p className="text-[9px] text-slate-400 font-sans">CT-36775 Licensed, bonded & insured</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Clock className="w-8 h-8 text-primary shrink-0" />
                        <div>
                            <h4 className="font-header font-black text-[10px] uppercase text-white tracking-widest">14-Day Warranty</h4>
                            <p className="text-[9px] text-slate-400 font-sans">Subject to qualifying repair terms</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SYSTEM DIAGNOSTIC WIZARD SECTION */}
            <section id="diagnostic-wizard" className="relative z-10 max-w-4xl mx-auto px-6 mt-24">
                <ACRepairFunnel />
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
        </main>
    );
}
