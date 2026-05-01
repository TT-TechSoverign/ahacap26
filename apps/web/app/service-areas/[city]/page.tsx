import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalTriFunnel from '@/components/LocalTriFunnel';
import LocalizedSEOBody from '@/components/LocalizedSEOBody';
import contentData from '@/lib/content/content.json';
import Image from 'next/image';

interface Props {
    params: { city: string };
}

// Helper to extract cities AND their regional context for anti-duplicate content
function getValidCities() {
    const regions = contentData.landing_legacy?.service_areas?.regions || [];
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
        title: `Reliable Air Conditioning Services in ${cityData.name}, Oahu | Affordable Home A/C`,
        description: `Top-rated Mini-Split Installation, Window AC Sales, and Deep Cleaning services for ${cityData.name} residents. Local ${cityData.regionTitle} inventory available.`,
        openGraph: {
            title: `Reliable Air Conditioning Services in ${cityData.name}`,
            description: `Need AC repair or a new unit in ${cityData.name}? We provide premium ductless mini-splits and window units across Oahu.`,
            url: `https://www.affordablehome-ac.com/service-areas/${params.city}`,
            siteName: 'Affordable Home A/C',
            locale: 'en_US',
            type: 'website',
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
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/hero-cards/ahac-hero-background-2.png"
                        alt={`HVAC Services in ${cityData.name}`}
                        fill
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

            {/* 2. TRI-CONVERSION FUNNEL */}
            <LocalTriFunnel city={cityData.name} />

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
                        "priceRange": "$$"
                    })
                }}
            />
        </main>
    );
}
