import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalServiceFunnel from '@/components/LocalServiceFunnel';
import LocalizedSEOBody from '@/components/LocalizedSEOBody';
import { BackToTop } from '@/components/BackToTop';
import contentData from '@/lib/content/content.json';
import Image from 'next/image';

interface Props {
    params: { city: string };
}

import fs from 'fs';
import path from 'path';

// Helper to extract cities AND their regional context for anti-duplicate content
function getValidCities() {
    let data = contentData;
    try {
        const livePath = path.join(process.cwd(), 'lib/content/content.json.LIVE');
        if (fs.existsSync(livePath)) {
            const raw = fs.readFileSync(livePath, 'utf8');
            data = JSON.parse(raw);
        }
    } catch (e) {
        // Fallback to static import
        console.warn('[Local SEO] Failed to read .LIVE content, falling back to static build-time content.');
    }

    const regions = (data as any).landing_legacy?.service_areas?.regions || [];
    const validCities: { slug: string; name: string; regionId: string; regionTitle: string }[] = [];
    
    regions.forEach((region: any) => {
        if (region.cities) {
            region.cities.forEach((city: any) => {
                const slug = city.name.toLowerCase().replace(/ /g, '-');
                validCities.push({ 
                    slug, 
                    name: city.name,
                    regionId: region.id,
                    regionTitle: region.title
                });
            });
        }
    });
    
    return validCities;
}

export function generateStaticParams() {
    const validCities = getValidCities();
    return validCities.map((c) => ({
        city: c.slug,
    }));
}

export function generateMetadata({ params }: Props): Metadata {
    const validCities = getValidCities();
    const cityData = validCities.find(c => c.slug === params.city.toLowerCase());
    
    if (!cityData) return { title: 'Service Area Not Found' };

    return {
        title: `Affordable Air Conditioning & Split AC Installation in ${cityData.name}, Oahu`,
        description: `Need AC repair near me in ${cityData.name}? We provide affordable air conditioning, split AC installation, and window AC cleaning services across Oahu.`,
        openGraph: {
            title: `Affordable Air Conditioning in ${cityData.name}`,
            description: `Looking for split ac units Hawaii? We provide premium ductless mini-splits and window ac cleaning services in ${cityData.name}.`,
            url: `https://www.affordablehome-ac.com/service-areas/${params.city.toLowerCase()}`,
            siteName: 'Affordable Home A/C',
            locale: 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: `https://www.affordablehome-ac.com/service-areas/${params.city.toLowerCase()}`,
        },
    };
}

export default function LocalServiceAreaPage({ params }: Props) {
    const validCities = getValidCities();
    const cityData = validCities.find(c => c.slug === params.city.toLowerCase());

    if (!cityData) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col">
            
            {/* 1. LOCALIZED HERO SECTION */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden pt-[140px] pb-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/hero-cards/ahac-hero-background-2.webp"
                        alt={`HVAC Services in ${cityData.name}`}
                        fill
                        sizes="100vw"
                        className="object-cover object-center opacity-60 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6 mt-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                            Now Servicing {cityData.regionTitle}
                        </span>
                    </div>
                    
                    <h1 className="font-header font-black text-5xl md:text-7xl text-white uppercase tracking-tighter drop-shadow-2xl leading-[1.1]">
                        Reliable Air Conditioning <br className="hidden md:block"/>
                        Solutions in <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">{cityData.name}</span>
                    </h1>
                    
                    <p className="font-sans text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                        From ultra-quiet mini-splits to premium window units, we engineer cooling systems specifically designed to handle Hawaii&apos;s extreme humidity and coastal air.
                    </p>
                </div>
            </section>

            {/* 2. QUAD-CONVERSION FUNNEL */}
            <LocalServiceFunnel city={cityData.name} />

            {/* 3. DYNAMIC EDUCATIONAL SEO BODY */}
            <LocalizedSEOBody city={cityData.name} regionId={cityData.regionId} />
            
            {/* 4. DYNAMIC SCHEMA.ORG MARKUP */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HVACBusiness",
                        "name": "Affordable Home A/C",
                        "image": "https://www.affordablehome-ac.com/assets/logo.png",
                        "url": "https://www.affordablehome-ac.com",
                        "areaServed": {
                            "@type": "City",
                            "name": cityData.name,
                            "containedInPlace": {
                                "@type": "State",
                                "name": "Hawaii"
                            }
                        },
                        "priceRange": "$$",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Air Conditioning Services",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Affordable Air Conditioning" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Split AC Installation Oahu" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window AC Cleaning Service" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AC Repair Near Me" } }
                            ]
                        }
                    })
                }}
            />

            {/* 5. DYNAMIC BREADCRUMB SCHEMA.ORG */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                                "name": "Service Areas",
                                "item": "https://www.affordablehome-ac.com/service-areas"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": cityData.name,
                                "item": `https://www.affordablehome-ac.com/service-areas/${params.city.toLowerCase()}`
                            }
                        ]
                    })
                }}
            />
            
            <BackToTop visible={true} />
        </main>
    );
}
