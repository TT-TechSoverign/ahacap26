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
 
    const title = `${cityData.name} Split AC Repair & HVAC | Affordable Home A/C`;
    
    let description = `AC broken in ${cityData.name}? Get licensed HVAC technicians for split AC installation, window AC cleaning, and $150 mini-split diagnostics.`;
    if (cityData.regionId === 'windward') {
        description = `Salt-air rust protection. Expert split AC installation, window AC cleaning & $150 mini-split diagnostics in ${cityData.name}, Oahu. Licensed HVAC technicians.`;
    } else if (cityData.regionId === 'leeward') {
        description = `Local heat relief. Expert split AC installation, window AC cleaning & $150 mini-split diagnostics in ${cityData.name}, Oahu. Licensed HVAC technicians.`;
    } else if (cityData.regionId === 'metro') {
        description = `Quiet operation cooling. Expert split AC installation, window AC cleaning & $150 mini-split diagnostics in ${cityData.name}, Oahu. Licensed HVAC technicians.`;
    } else if (cityData.regionId === 'central') {
        description = `Valley dehumidification cooling. Expert split AC installation, window AC cleaning & $150 mini-split diagnostics in ${cityData.name}, Oahu. Licensed HVAC technicians.`;
    }
 
    return {
        title: { absolute: title },
        description,
        openGraph: {
            title,
            description,
            url: `https://www.affordablehome-ac.com/service-areas/${params.city.toLowerCase()}`,
            siteName: 'Affordable Home A/C',
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                    width: 800,
                    height: 600,
                    alt: 'Affordable Home A/C Logo',
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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

            {/* 2. SYSTEM DIAGNOSTIC SCHEDULER */}
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
                        "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
                        "name": "Affordable Home A/C",
                        "image": "https://www.affordablehome-ac.com/assets/logo-new.png",
                        "logo": "https://www.affordablehome-ac.com/assets/logo.svg",
                        "url": "https://www.affordablehome-ac.com",
                        "telephone": "+1-808-488-1111",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "94-150 Leoleo St. #203",
                            "addressLocality": "Waipahu",
                            "addressRegion": "HI",
                            "postalCode": "96797",
                            "addressCountry": "US"
                        },
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

            {/* 6. DYNAMIC FAQ PAGE SCHEMA.ORG */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": `What is the most efficient AC unit for ${cityData.name}'s high humidity?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `For ${cityData.name}'s tropical climate, we highly recommend systems with variable-speed inverter compressors, such as the LG Dual Inverter window AC or a Mitsubishi mini-split. These systems adjust cooling capacity dynamically, which keeps energy bills low while continuously pulling moisture out of the air to maintain a dry, comfortable indoor environment.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `How often do window and split AC systems need cleaning in ${cityData.name}?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `Due to ${cityData.name}'s salt-air exposure and humidity, we recommend a professional deep clean every 6 to 12 months. Regular maintenance cleanings remove accumulated mold, dust, and coastal salt deposits, restoring airflow efficiency by up to 30% and extending your system's life.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `Does Affordable Home A/C deliver products and dispatch technicians to ${cityData.name}?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `Yes! We provide full dispatch of licensed technicians for split AC estimates and window AC cleanings directly to ${cityData.name}. For window AC purchases, we offer Oahu flat-rate delivery for $50, or you can opt for free local pickup from our Waipahu Distribution Center.`
                                }
                            }
                        ]
                    })
                }}
            />
            
            <BackToTop visible={true} />
        </main>
    );
}
