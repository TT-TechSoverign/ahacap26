import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { BackToTop } from '@/components/BackToTop';
import MiniSplitEstimator from '@/components/MiniSplitEstimator';
import SectionServicesGeneral from '@/components/SectionServicesGeneral';
import { 
    ShieldCheck, 
    Clock, 
    Warehouse, 
    CheckCircle, 
    VolumeX, 
    Zap, 
    Waves, 
    Phone, 
    ArrowRight,
    Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: 'Mini Split AC Installation Oahu | In-Stock in Waipahu | Affordable Home A/C'
    },
    description: 'Ductless mini split AC installation in Oahu. In-stock at our Waipahu warehouse for fast island installation. CT-36775 licensed. Free $250 in-home sizing & electrical survey.',
    alternates: {
        canonical: '/mini_split_ac',
    },
    openGraph: {
        title: 'Mini Split AC Installation Oahu | In-Stock in Waipahu | Affordable Home A/C',
        description: 'Ductless mini split AC installation in Oahu. In-stock at our Waipahu warehouse for fast island installation. CT-36775 licensed. Free in-home sizing survey.',
        url: '/mini_split_ac',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

export default function MiniSplitsPage() {
    const brands = [
        {
            name: "MITSUBISHI ELECTRIC",
            badge: "Diamond Precision",
            className: "font-header font-bold tracking-normal uppercase text-xl text-red-500",
            description: "Mitsubishi Electric is the gold standard for whisper-quiet comfort on Oahu. Operating at sound levels as low as 19 dBA (quieter than a human whisper), their smart 3D i-See Sensor detects room hot spots in real time. Features factory Blue Fin anti-corrosion coil treatment to stand up to Hawaii trade winds.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-mitsubishi-air-handler.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-mitsubishi-condenser.png",
            airHandlerScale: "scale-[1.5]",
            condenserScale: "scale-[1.5]",
            warranty: "10–12 Year Compressor & Parts Warranty",
            buttonClass: "bg-red-600 text-white hover:bg-red-500 border border-red-500/50"
        },
        {
            name: "FUJITSU HALCYON",
            badge: "Tropical High Efficiency",
            className: "font-sans font-bold italic tracking-widest text-2xl text-red-400",
            description: "Engineered specifically for extreme tropical humidity, Fujitsu Halcyon systems offer industry-leading SEER2 efficiency that dramatically slashes monthly HECO power bills. Equipped with factory Blue Fin hydrophilic coil coating and high-capacity inverter scroll compressors designed for years of uninterrupted island cooling.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-fujitsu-air-handler.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-fujitsu-condenser.png",
            airHandlerScale: "scale-[1.4]",
            condenserScale: "scale-100",
            warranty: "10–12 Year Factory Warranty",
            buttonClass: "bg-red-600 text-white hover:bg-red-500 border border-red-500/50"
        },
        {
            name: "DAIKIN INVERTER",
            badge: "Smart Inverter Value",
            className: "font-header font-medium tracking-widest text-2xl text-sky-400",
            description: "Daikin is the global pioneer in variable-speed inverter air conditioning. Their outdoor condensers feature proprietary anti-corrosion acrylic resin Blue Fin heat exchangers tested against ASTM B117 salt spray standards for coastal longevity. Perfect for multi-zone residential cooling across Oahu.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-daikin-condenser.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-daikin-air-handler.png",
            airHandlerScale: "scale-[1.8]",
            condenserScale: "scale-100",
            warranty: "10–12 Year Unit Replacement Warranty",
            buttonClass: "bg-sky-500 text-slate-950 hover:bg-sky-400 border border-sky-400/50"
        },
        {
            name: "CARRIER DUCTLESS",
            badge: "Heavy-Duty Heritage",
            className: "font-sans font-extrabold tracking-tighter text-3xl text-blue-500",
            description: "Carrier invented modern air conditioning, and their ductless mini splits pack heavy-duty cooling power into sleek, compact air handlers. Featuring Golden Fin hydrophilic condenser coatings that prevent salt deposits and microbial buildup, Carrier systems deliver rapid temperature pull-down for large, sunny living spaces.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-carrier-air-handler.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-carrier-condenser.png",
            airHandlerScale: "scale-[1.8]",
            condenserScale: "scale-[1.1]",
            warranty: "10 Year Compressor Warranty",
            buttonClass: "bg-blue-600 text-white hover:bg-blue-500 border border-blue-500/50"
        }
    ];

    const faqs = [
        {
            q: "How fast can you install a mini-split on Oahu?",
            a: "Because we maintain local inventory in our Waipahu warehouse, we do not make homeowners wait 4 to 8 weeks for mainland container shipping. Once your free in-home sizing survey is completed and equipment is selected, installation is typically completed within 3 to 5 business days (subject to scheduling and crew availability)."
        },
        {
            q: "What is Blue Fin coastal protection and why is it essential in Hawaii?",
            a: "Oahu's continuous trade winds carry microscopic ocean salt particles that quickly corrode and pit uncoated aluminum cooling fins within 2 to 4 years. Factory Blue Fin treatment applies a durable acrylic resin and hydrophilic film to the condenser coils, preventing galvanic corrosion, shedding salt spray, and extending system lifespan."
        },
        {
            q: "Will a mini-split work with my older Oahu home's electrical panel?",
            a: "Yes. Many older homes in Kailua, Kaneohe, Pearl City, and Kaimuki have 60A or 100A main panels. During your free $250 in-home survey, our licensed CT-36775 technicians calculate your breaker load and identify subpanel capacity to ensure your installation proceeds smoothly with zero surprise electrician bills."
        },
        {
            q: "Can I install mini-splits in an Oahu townhouse or condo with strict HOA rules?",
            a: "Yes, subject to detailed scope of work, property inspection, and management approval to accept. We specialize in HOA-compliant installations across planned communities like Mililani Mauka, Ewa Beach, Kapolei, and Hawaii Kai. We install color-matched, UV-resistant architectural line-hide conduits that neatly enclose all refrigerant pipes, wiring, and drain lines flush against your exterior walls to pass HOA architectural review."
        },
        {
            q: "Do your mini-splits comply with Honolulu residential noise ordinances?",
            a: "Yes. In dense Oahu neighborhoods and zero-lot-line communities, neighbor noise complaints can be an issue. Our Mitsubishi Electric and Fujitsu inverter systems operate as low as 19 dBA indoors and under 50 dBA outdoors, comfortably surpassing Honolulu Department of Health Title 11 boundary noise standards."
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "HVACService",
        "name": "Ductless Mini Split AC Installation Oahu",
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
        "description": "Professional ductless mini-split AC installation in Oahu. In-stock units in Waipahu warehouse with 10-12 year warranties and factory Blue Fin coastal salt protection."
    };

    return (
        <div className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500 selection:text-slate-950">
            {/* Inject Structured Data for Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            {/* HERO SECTION */}
            <section className="relative pt-[140px] md:pt-[175px] pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
                <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                    
                    {/* Urgency Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Warehouse className="size-4 text-cyan-400" />
                        In-Stock in Waipahu Warehouse • Fast Island Installation
                    </div>

                    {/* High-Impact Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-header font-black uppercase tracking-tight text-white leading-[1.1] mb-6">
                        Beat The Oahu Heat: <br className="hidden sm:inline" />
                        <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                            Ductless Mini Split AC Installation
                        </span>
                    </h1>

                    {/* Narrative Hook */}
                    <p className="text-slate-300 text-base sm:text-xl font-medium max-w-2xl leading-relaxed mb-8">
                        Whisper-quiet zoned cooling engineered specifically for Hawaii’s trade-wind salt air and tropical humidity. No waiting weeks for mainland shipping—units are in-stock locally on Oahu.
                    </p>

                    {/* Hero CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <a
                            href="#system-builder"
                            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-cyan-300 text-slate-950 font-header font-black text-base uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(0,174,239,0.4)] hover:shadow-[0_0_40px_rgba(0,174,239,0.6)] transition-all flex items-center justify-center gap-2"
                        >
                            Build Your System (Free Survey) <ArrowRight className="size-5" />
                        </a>
                        <a
                            href="tel:808-488-1111"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                        >
                            <Phone className="size-5 text-cyan-400" /> (808) 488-1111
                        </a>
                    </div>

                    {/* Micro Trust Strip */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-cyan-400" /> CT-36775 Licensed & Insured</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="size-4 text-cyan-400" /> 10–12 Year Warranties</span>
                        <span className="flex items-center gap-1.5"><VolumeX className="size-4 text-cyan-400" /> 19 dBA Whisper-Quiet</span>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE SYSTEM BUILDER (PRIMARY CONVERSION WIDGET) */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Suspense fallback={<div className="h-[450px] w-full max-w-4xl mx-auto bg-slate-900/50 rounded-3xl animate-pulse" />}>
                    <MiniSplitEstimator />
                </Suspense>
            </section>

            {/* 4 ISLAND ADVANTAGE CARDS */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Engineered For Hawaii</span>
                    <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-wide">
                        Why Oahu Homeowners Choose <span className="text-cyan-400">Affordable Home A/C</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Local Waipahu Stock */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/40 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                            <Warehouse className="size-6" />
                        </div>
                        <h3 className="font-header font-black text-lg text-white uppercase mb-2">On-Island Waipahu Stock</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            No 4 to 8 week Matson mainland freight delays while you suffer in the heat. Our Waipahu warehouse is fully stocked with top brands for rapid installation.
                        </p>
                    </div>

                    {/* Card 2: Free In-Home Sizing & Panel Check */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/40 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                            <Zap className="size-6" />
                        </div>
                        <h3 className="font-header font-black text-lg text-white uppercase mb-2">Free $250 Sizing & Panel Survey</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            We inspect square footage, sun exposure, and older Oahu 60A/100A electrical panels first, ensuring zero surprise electrical bills.
                        </p>
                    </div>

                    {/* Card 3: Factory Blue Fin Coastal Protection */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/40 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                            <Waves className="size-6" />
                        </div>
                        <h3 className="font-header font-black text-lg text-white uppercase mb-2">Factory Blue Fin Protection</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Outdoor coils feature factory-engineered Blue Fin acrylic resin coating tested under ASTM B117 salt spray standards to stop corrosion from Oahu trade winds.
                        </p>
                    </div>

                    {/* Card 4: HOA Architectural Line-Hide */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/40 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                            <ShieldCheck className="size-6" />
                        </div>
                        <h3 className="font-header font-black text-lg text-white uppercase mb-2">HOA Architectural Line-Hide</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Zero messy dangling pipes. We enclose all exterior lines in color-matched, UV-resistant architectural conduit that passes strict Ewa, Mililani, and Kapolei HOA rules.
                        </p>
                    </div>
                </div>
            </section>

            {/* HONOLULU NOISE ORDINANCE CALLOUT */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        <VolumeX className="size-7" />
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                            Honolulu Property Line Noise Compliant (DOH Title 11)
                        </span>
                        <h3 className="text-xl sm:text-2xl font-header font-black text-white uppercase mb-2">
                            Whisper-Quiet Inverter Operation (19 dBA)
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Zero neighbor complaints. In dense zero-lot-line communities across Oahu, our Mitsubishi Electric and Fujitsu inverter systems run quieter than rustling leaves indoors and operate under 50 dBA outdoors, fully satisfying city noise limits.
                        </p>
                    </div>
                </div>
            </section>

            {/* BRAND SHOWCASE WITH DIRECT ACTIONS */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Factory-Authorized Equipment</span>
                    <h2 className="text-2xl sm:text-4xl font-header font-black uppercase text-white tracking-wide">
                        Premium Ductless Brands <span className="text-cyan-400">Stocked on Oahu</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-12 mb-16">
                    {brands.map((brand) => (
                        <div 
                            key={brand.name} 
                            id={brand.name.toLowerCase().replace(/\s+/g, '-')} 
                            className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-12 group even:md:flex-row-reverse hover:border-cyan-500/30 transition-all"
                        >
                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
                                    {brand.badge}
                                </span>
                                <div className="mb-4">
                                    <span className={brand.className}>{brand.name}</span>
                                </div>
                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                                    {brand.description}
                                </p>
                                <div className="text-xs text-slate-400 flex items-center gap-2 mb-6">
                                    <CheckCircle className="size-4 text-cyan-400" />
                                    <span className="font-semibold text-white">{brand.warranty}</span>
                                </div>
                                <a 
                                    href="#system-builder"
                                    className={`inline-flex items-center justify-center px-6 py-3 font-header font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 ${brand.buttonClass}`}
                                >
                                    Configure {brand.name.split(' ')[0]} System <ArrowRight className="size-3.5 ml-1.5" />
                                </a>
                            </div>

                            {/* Image Collage */}
                            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-4 relative w-full h-[280px] md:h-[350px]">
                                <div className="relative w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 z-20 sm:-translate-y-8 sm:translate-x-4 md:-translate-y-12 md:translate-x-8 drop-shadow-2xl hover:scale-105 transition-transform duration-500">
                                    <Image
                                        src={brand.airHandlerImg}
                                        alt={`${brand.name} Air Handler`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className={`object-contain ${brand.airHandlerScale}`}
                                    />
                                </div>
                                <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 z-10 sm:translate-y-12 sm:-translate-x-8 md:translate-y-16 md:-translate-x-12 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                    <Image
                                        src={brand.condenserImg}
                                        alt={`${brand.name} Condenser with Factory Blue Fin Protection`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className={`object-contain ${brand.condenserScale}`}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OAHU INSTALLATION FAQ ACCORDION */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
                <div className="text-center mb-10">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">Got Questions?</span>
                    <h2 className="text-2xl sm:text-3xl font-header font-black uppercase text-white tracking-wide">
                        Oahu Mini-Split Installation <span className="text-cyan-400">FAQ</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx} 
                            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
                        >
                            <h3 className="font-header font-bold text-base sm:text-lg text-white mb-2 flex items-start gap-2">
                                <span className="text-cyan-400 font-mono">Q:</span>
                                {faq.q}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* GENERAL SERVICES BAR */}
            <div className="pb-20">
                <SectionServicesGeneral />
            </div>

            <BackToTop visible={true} />
        </div>
    );
}
