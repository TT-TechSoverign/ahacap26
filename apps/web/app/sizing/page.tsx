import { Metadata } from 'next';
import { ACSelectorWizard } from '@/components/ACSelectorWizard';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { EditableText } from '@/components/EditableText';
import Link from 'next/link';
import { ArrowLeft, Calculator, ShoppingCart, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: {
        absolute: 'Oahu Window AC BTU Sizing Calculator ($395+ In-Stock) | (808) 488-1111'
    },
    description: 'Calculate the exact BTU Window AC for your Oahu room in 30 seconds! Hawaii single-wall sizing, in-stock LG & GE ACs ($395–$1,200) • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/sizing',
    },
    openGraph: {
        title: 'Oahu Window AC BTU Sizing Calculator ($395+ In-Stock) | (808) 488-1111',
        description: 'Calculate the exact BTU Window AC for your Oahu room in 30 seconds! Hawaii single-wall sizing, in-stock LG & GE ACs ($395–$1,200) • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/sizing',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Hawaii AC Sizing Wizard & Calculator',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oahu Window AC BTU Sizing Calculator ($395+ In-Stock) | (808) 488-1111',
        description: 'Calculate the exact BTU Window AC for your Oahu room in 30 seconds! Hawaii single-wall sizing, in-stock LG & GE ACs ($395–$1,200) • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const sizingAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Oahu Window AC BTU Sizing Calculator",
    "url": "https://www.affordablehome-ac.com/sizing",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Interactive room BTU sizing wizard calibrated for Hawaii humidity and Oahu micro-climates.",
    "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "142",
        "bestRating": "5",
        "worstRating": "1"
    }
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
            "name": "AC Sizing Wizard",
            "item": "https://www.affordablehome-ac.com/sizing"
        }
    ]
};

const sizingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How many BTUs do I need for a single-wall redwood home in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Uninsulated single-wall redwood and tongue-and-groove Hawaii homes absorb 20% to 35% more solar heat than mainland drywall rooms. We recommend 6,000–8,000 BTU for bedrooms (100–250 sq. ft.), 10,000–12,000 BTU for master bedrooms and studios (220–380 sq. ft.), and 14,000–23,500 BTU for living rooms and open layouts (380–800+ sq. ft.)."
            }
        },
        {
            "@type": "Question",
            "name": "What is the largest Window AC that runs on a standard 115V household outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The LG Dual Inverter 14,000 BTU (LW1522FVSM, $785) and 12,000 BTU (LW1222IVSM, $745) are the highest-capacity Window ACs that plug directly into a standard 115V / 15-Amp household NEMA 5-15R receptacle. Units rated 18,000 BTU and 23,500 BTU require a 208/230V circuit."
            }
        },
        {
            "@type": "Question",
            "name": "Do I need a 26-inch wall sleeve unit for an Oahu condo or high-rise?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Many Honolulu, Waikiki, Makiki, and Ala Moana concrete condos use a built-in 26-inch through-the-wall sleeve instead of a jalousie window. We stock direct-fit GE 26-inch Built-In Wall ACs (8,200–12,000 BTU, including the R-32 Inverter AJCQ12AXXWA) and the GE RAB26A galvanized sleeve in Waipahu."
            }
        }
    ]
};

const sizingHowToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Size a Window Air Conditioner for Oahu Single-Wall & Condo Rooms",
    "description": "3-step Hawaii BTU sizing method accounting for single-wall redwood framing, trade-wind humidity, solar exposure, and 115V vs 230V electrical outlets.",
    "totalTime": "PT1M",
    "step": [
        {
            "@type": "HowToStep",
            "position": 1,
            "name": "Measure Room Square Footage",
            "text": "Multiply room length by width in feet (e.g., 12 ft x 12 ft = 144 sq ft bedroom; 20 ft x 20 ft = 400 sq ft living room)."
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Apply Hawaii Microclimate Heat-Load Factor",
            "text": "Add 15%–25% BTU capacity for uninsulated single-wall redwood homes, jalousie windows, afternoon west-facing Leeward sun, or high ceilings."
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Match Wall Outlet Voltage & Window Opening",
            "text": "Choose 115V standard 15A models (6,000–14,000 BTU, $395–$785) for standard outlets, 208/230V models (18,000–23,500 BTU, $925–$1,025) for heavy-duty circuits, or 26-inch GE Built-In models ($1,000–$1,200) for existing condo wall sleeves."
        }
    ]
};

export default function SizingPage() {
    return (
        <div className="bg-background-dark min-h-screen text-white selection:bg-primary selection:text-white pb-12 lg:pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sizingAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sizingFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sizingHowToSchema) }}
            />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-[96px] md:pt-[180px]">
                {/* Compact Above-the-Fold Header + Instant Oahu Room Quick-Picks */}
                <div className="text-center mb-5 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                        <Link 
                            href="/shop"
                            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-white group transition-colors"
                        >
                            <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Shop Inventory
                        </Link>
                        <span className="text-slate-700">•</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/25 rounded-full text-primary font-mono text-[9px] lg:text-[10px] font-black tracking-[0.25em] uppercase">
                            <Calculator className="size-3.5 text-primary" />
                            <span>Hawaii BTU Sizing Matrix</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-header font-bold uppercase tracking-tight mb-2">
                        Oahu A/C <span className="text-primary italic font-black shadow-primary/20 drop-shadow-2xl">Sizing Wizard</span>
                    </h1>
                    
                    <p className="font-mono text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
                        Calibrated for Hawaii Single-Wall Homes &amp; Regional Micro-Climates
                    </p>

                    {/* 1-Tap Instant Oahu Room Quick-Shop Jumps */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-3xl mx-auto text-left">
                        <Link
                            href="/shop?capacity=BEDROOM"
                            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-primary/15 border border-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="text-[9px] font-mono text-cyan-400 uppercase font-bold">Up to 250 sq ft</div>
                            <div className="text-xs font-header font-black text-white uppercase flex items-center justify-between">
                                <span>Bedrooms</span>
                                <ArrowRight className="size-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div className="text-[10px] text-emerald-400 font-mono font-bold">6k–8k • From $395</div>
                        </Link>
                        <Link
                            href="/shop?capacity=MASTER"
                            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-primary/15 border border-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="text-[9px] font-mono text-cyan-400 uppercase font-bold">250–450 sq ft</div>
                            <div className="text-xs font-header font-black text-white uppercase flex items-center justify-between">
                                <span>Master / Studio</span>
                                <ArrowRight className="size-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div className="text-[10px] text-emerald-400 font-mono font-bold">10k–12k • From $625</div>
                        </Link>
                        <Link
                            href="/shop?capacity=LIVING"
                            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-primary/15 border border-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="text-[9px] font-mono text-cyan-400 uppercase font-bold">450–1,000+ sq ft</div>
                            <div className="text-xs font-header font-black text-white uppercase flex items-center justify-between">
                                <span>Living Rooms</span>
                                <ArrowRight className="size-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div className="text-[10px] text-emerald-400 font-mono font-bold">14k–23.5k • $785+</div>
                        </Link>
                        <Link
                            href="/shop?category=ge"
                            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-primary/15 border border-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="text-[9px] font-mono text-cyan-400 uppercase font-bold">26&quot; Condo Sleeve</div>
                            <div className="text-xs font-header font-black text-white uppercase flex items-center justify-between">
                                <span>Built-In Wall</span>
                                <ArrowRight className="size-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div className="text-[10px] text-emerald-400 font-mono font-bold">GE Series • $1,000+</div>
                        </Link>
                    </div>
                </div>


                {/* Sizing Wizard - Main Container */}
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 mt-8">
                    <div className="bg-background-dark/50 border border-white/10 p-6 lg:p-8 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-md group max-w-5xl mx-auto">
                        
                        {/* Decorative Top Accent line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_30px_rgba(0,174,239,0.3)]"></div>

                        <div className="flex flex-col items-center text-center mb-6 border-b border-white/5 pb-6 relative z-10">
                            <span className="font-mono text-[9px] font-black tracking-[0.5em] uppercase mb-2 text-primary opacity-60">
                                Sizing & Recommendation Engine
                            </span>
                            <h2 className="text-2xl md:text-4xl font-header font-bold text-white uppercase tracking-tight mb-2">
                                Find Your Perfect Unit
                            </h2>
                            <p className="font-mono text-[10px] font-black tracking-[0.2em] uppercase italic text-white opacity-80">
                                Zero typing required — select your room features below
                            </p>
                        </div>

                        <div className="relative z-10 px-0 md:px-4">
                            <Suspense fallback={<div className="p-8 text-center text-primary font-mono text-[10px] uppercase tracking-widest animate-pulse">Loading Wizard Interface...</div>}>
                                <ACSelectorWizard />
                            </Suspense>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <WindowAcQuickShop
                        title="In-Stock Waipahu LG & GE Window Air Conditioners ($395–$1,200)"
                        subheading="Already know your room size? Order online for Free Waipahu Pickup by appointment or $50 flat Island-Wide Delivery."
                    />
                </div>

                <OahuEEATAuthorityBar topicTitle="Oahu Window AC BTU Sizing Wizard & Microclimate Heat-Load Calculator" />

            </main>
        </div>
    );
}
