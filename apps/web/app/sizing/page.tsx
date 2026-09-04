import { Metadata } from 'next';
import { ACSelectorWizard } from '@/components/ACSelectorWizard';
import { EditableText } from '@/components/EditableText';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: {
        absolute: 'Oahu AC Sizing Calculator & BTU Sizing Wizard | Affordable Home A/C'
    },
    description: 'Calculate the exact BTU cooling load for your Oahu home. Calibrated room load calculations for Kapolei, Ewa Beach, Kailua, and Honolulu micro-climates. Zero typing required.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/sizing',
    },
    openGraph: {
        title: 'Oahu AC Sizing Calculator & BTU Sizing Wizard | Affordable Home A/C',
        description: 'Calculate the exact BTU cooling load for your Oahu home. Calibrated room load calculations for Kapolei, Ewa Beach, Kailua, and Honolulu micro-climates. Zero typing required.',
        url: 'https://www.affordablehome-ac.com/sizing',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Hawaii AC Sizing Wizard & Calculator',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oahu AC Sizing Calculator & BTU Sizing Wizard | Affordable Home A/C',
        description: 'Calculate the exact BTU cooling load for your Oahu home. Calibrated room load calculations for Kapolei, Ewa Beach, Kailua, and Honolulu micro-climates. Zero typing required.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const sizingAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Oahu AC Sizing Calculator",
    "url": "https://www.affordablehome-ac.com/sizing",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Interactive room BTU sizing wizard calibrated for Hawaii humidity and Oahu micro-climates."
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
            <main className="max-w-4xl mx-auto px-6 pt-[140px] md:pt-[165px]">
                {/* Header branding */}
                <div className="text-center mb-8 lg:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Link 
                        href="/shop"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white mb-6 group transition-colors"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to Shop Inventory
                    </Link>

                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/20 rounded-md text-primary font-mono text-[9px] lg:text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-[0_0_20px_rgba(0,174,239,0.1)] backdrop-blur-sm relative overflow-hidden group/badge">
                            <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000"></div>
                            <Calculator className="size-4 text-primary" />
                            <span>Hawaii BTU Sizing Matrix</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-header font-bold uppercase tracking-tight mb-6">
                        Oahu A/C <span className="text-primary italic font-black shadow-primary/20 drop-shadow-2xl">Sizing Wizard</span>
                    </h1>
                    
                    <p className="font-mono text-[10px] md:text-[11px] lg:text-[12px] font-black tracking-[0.3em] uppercase text-white max-w-3xl mx-auto leading-relaxed opacity-90">
                        CALIBRATED FOR HAWAII HUMIDITY & REGIONAL MICRO-CLIMATES
                    </p>
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

            </main>
        </div>
    );
}
