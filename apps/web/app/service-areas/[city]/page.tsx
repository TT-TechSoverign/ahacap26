import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalServiceFunnel from '@/components/LocalServiceFunnel';
import LocalizedSEOBody from '@/components/LocalizedSEOBody';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { getReviewsByCity } from '@/lib/product-reviews';
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
 
    const title = `${cityData.name} Window AC Sales, Installation & Cleaning | (808) 488-1111`;
    
    let description = `Fast ${cityData.name} Window AC installation, deep cleaning & in-stock LG & GE Window ACs ($395–$1,200) ready for Waipahu pickup or $50 delivery. Call (808) 488-1111.`;
    if (cityData.regionId === 'windward') {
        description = `Salt-air protection & tropical cooling in ${cityData.name}, Oahu. Custom jalousie window AC installation, deep coil cleaning & in-stock LG Dual Inverter window ACs. Call (808) 488-1111.`;
    } else if (cityData.regionId === 'leeward') {
        description = `High-efficiency heat relief in ${cityData.name}, Oahu. Custom window AC installation, deep cleaning & in-stock Waipahu window ACs ($395–$1,200). Call (808) 488-1111.`;
    } else if (cityData.regionId === 'metro') {
        description = `Whisper-quiet window & through-the-wall cooling in ${cityData.name}, Oahu. Jalousie & sleeve window AC installation, deep cleaning & in-stock LG & GE window ACs. Call (808) 488-1111.`;
    } else {
        description = `Precision dehumidification cooling in ${cityData.name}, Oahu. In-stock Waipahu window ACs ($395–$1,200), custom window installation & deep window AC cleaning. Call (808) 488-1111.`;
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
                        alt={`Window AC Services in ${cityData.name}`}
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
                        From whisper-quiet LG Dual Inverter window units to GE Built-In through-the-wall systems and deep cleaning, we deliver cooling solutions engineered for Hawaii&apos;s extreme humidity and coastal air.
                    </p>
                </div>
            </section>

            {/* 2. SYSTEM DIAGNOSTIC SCHEDULER */}
            <LocalServiceFunnel city={cityData.name} />

            {/* 2b. IN-STOCK WINDOW AC QUICK SHOP */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                <WindowAcQuickShop cityName={cityData.name} />
            </div>

            {/* 3. DYNAMIC EDUCATIONAL SEO BODY */}
            <LocalizedSEOBody city={cityData.name} regionId={cityData.regionId} />
            
            {/* 3b. VISIBLE LOCALIZED FAQ ACCORDION (Google Rich Snippet Visibility Standard) */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 my-14 w-full">
                <div className="text-center mb-8">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                        {cityData.name} Climate Advisory
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-header font-black text-white uppercase tracking-tight mt-3">
                        Frequently Asked Questions in {cityData.name}
                    </h2>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
                        Honest answers from local Oahu cooling specialists grounded in Hawaii&apos;s coastal climate.
                    </p>
                </div>

                <div className="space-y-4">
                    <details className="group bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-5 transition-all [&_svg]:open:-rotate-180">
                        <summary className="flex items-center justify-between cursor-pointer list-none text-white font-header font-bold text-sm sm:text-base select-none">
                            <span>What is the most efficient AC unit for {cityData.name}&apos;s high humidity?</span>
                            <span className="text-cyan-400 ml-4 shrink-0 transition-transform duration-300">
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-4 font-sans">
                            For {cityData.name}&apos;s tropical climate, we highly recommend units with variable-speed inverter compressors, such as the LG Dual Inverter window AC or GE Built-In inverter series. These units adjust cooling capacity dynamically, which keeps HECO energy bills up to 40% lower while continuously pulling moisture out of the air.
                        </p>
                    </details>

                    <details className="group bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-5 transition-all [&_svg]:open:-rotate-180">
                        <summary className="flex items-center justify-between cursor-pointer list-none text-white font-header font-bold text-sm sm:text-base select-none">
                            <span>How often do window AC units need cleaning in {cityData.name}?</span>
                            <span className="text-cyan-400 ml-4 shrink-0 transition-transform duration-300">
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-4 font-sans">
                            Due to {cityData.name}&apos;s salt-air exposure and humidity, we recommend rinsing your slide-out mesh filter every 2 to 4 weeks and scheduling a professional window AC deep clean every 6 to 12 months. Regular maintenance removes accumulated mold, dust, and coastal salt deposits, restoring airflow efficiency by up to 30%.
                        </p>
                    </details>

                    <details className="group bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-5 transition-all [&_svg]:open:-rotate-180">
                        <summary className="flex items-center justify-between cursor-pointer list-none text-white font-header font-bold text-sm sm:text-base select-none">
                            <span>Does Affordable Home A/C deliver products and dispatch technicians to {cityData.name}?</span>
                            <span className="text-cyan-400 ml-4 shrink-0 transition-transform duration-300">
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-4 font-sans">
                            Yes! We provide full on-site dispatch of technicians for custom jalousie and standard window AC installation, window AC deep cleaning, and clean-vs-replace assessments directly to {cityData.name}. We also offer Oahu flat-rate $50 delivery or free local Waipahu warehouse pickup on all in-stock window AC purchases.
                        </p>
                    </details>
                </div>
            </section>

            {/* 3c. LOCALIZED ISLAND REVIEWS */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
                <ReviewsPavilion 
                    variant="compact"
                    reviews={getReviewsByCity(cityData.name, 3)}
                    title={`${cityData.name} Verified Reviews`}
                    subtitle={`Customer Feedback from Homeowners in ${cityData.name}, Oahu`}
                />
            </section>

            {/* 4. DYNAMIC SCHEMA.ORG MARKUP */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HVACBusiness",
                        "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
                        "name": "Affordable Home A/C",
                        "alternateName": "Affordable Home Air Conditioning",
                        "image": "https://www.affordablehome-ac.com/assets/logo-new.png",
                        "logo": "https://www.affordablehome-ac.com/assets/AFORDABLE_LOGO_2026_500x500_blkblugrn.png",
                        "url": "https://www.affordablehome-ac.com",
                        "telephone": "+1-808-488-1111",
                        "email": "office@affordablehome-ac.com",
                        "hasMap": "https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797",
                        "sameAs": [
                            "https://www.yelp.com/biz/affordable-home-air-conditioning-waipahu",
                            "https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797"
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "94-150 Leoleo St. #203",
                            "addressLocality": "Waipahu",
                            "addressRegion": "HI",
                            "postalCode": "96797",
                            "addressCountry": "US"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "21.3855",
                            "longitude": "-158.0076"
                        },
                        "openingHoursSpecification": [
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                "opens": "08:00",
                                "closes": "17:00"
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Saturday"],
                                "opens": "09:00",
                                "closes": "14:00"
                            }
                        ],
                        "paymentAccepted": "Cash, Credit Card, Debit Card, Visa, Mastercard, American Express, Discover",
                        "currenciesAccepted": "USD",
                        "priceRange": "$$",
                        "areaServed": {
                            "@type": "City",
                            "name": cityData.name,
                            "containedInPlace": {
                                "@type": "State",
                                "name": "Hawaii"
                            }
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": `Window AC Sales, Installation & Cleaning in ${cityData.name}`,
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `In-Stock LG & GE Window AC Sales & Delivery in ${cityData.name} ($395–$1,200)` } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Window AC & Jalousie Installation in ${cityData.name}` } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Window AC Deep Cleaning & Repair in ${cityData.name}` } }
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
                                    "text": `For ${cityData.name}'s tropical climate, we highly recommend units with variable-speed inverter compressors, such as the LG Dual Inverter window AC or GE Built-In inverter series. These units adjust cooling capacity dynamically, which keeps HECO energy bills up to 40% lower while continuously pulling moisture out of the air.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `How often do window AC units need cleaning in ${cityData.name}?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `Due to ${cityData.name}'s salt-air exposure and humidity, we recommend rinsing your slide-out mesh filter every 2 to 4 weeks and scheduling a professional window AC deep clean every 6 to 12 months. Regular maintenance removes accumulated mold, dust, and coastal salt deposits, restoring airflow efficiency by up to 30%.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `Does Affordable Home A/C deliver products and dispatch technicians to ${cityData.name}?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `Yes! We provide full on-site dispatch of technicians for custom jalousie and standard window AC installation, window AC deep cleaning, and clean-vs-replace assessments directly to ${cityData.name}. We also offer Oahu flat-rate $50 delivery or free local Waipahu warehouse pickup on all in-stock window AC purchases.`
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
