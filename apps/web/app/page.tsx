import Section2OurServicesV2 from '@/components/Section2OurServicesV2';
import Section1HeroHomeV2 from '@/components/Section1HeroHomeV2';
import { QuickJumpBanner } from '@/components/QuickJumpBanner';
import { BackToTop } from '@/components/BackToTop';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { HomeFeaturedInventory } from '@/components/HomeFeaturedInventory';
import { HomePricingMatrix } from '@/components/HomePricingMatrix';
import { HomeServiceAreasHub } from '@/components/HomeServiceAreasHub';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Affordable Home A/C | Window AC Installation & Split AC Oahu',
    description: 'Expert window air conditioner installation, split AC installation, and window AC cleaning services across Oahu. Authorized LG, GE, Carrier dealer in Waipahu. License CT-36775.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com',
    },
    openGraph: {
        title: 'Affordable Home A/C | Window AC Installation & Split AC Oahu',
        description: 'Affordable home air conditioning, expert AC installation Oahu, and reliable AC repair Oahu. Your local HVAC Oahu cooling experts for split and window units.',
        url: '/',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

export default function Homepage() {
    return (
        <div className="relative font-sans bg-slate-950">
            {/* Global Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assets/hero-cards/ahac-hero-background-2.webp"
                    alt="Expert HVAC Installation by Affordable Home A/C"
                    fill
                    sizes="(max-width: 768px) 180vh, 100vw"
                    className="object-cover object-center translate-y-0 scale-100 md:translate-y-[-10%] md:scale-110 [transform:translateZ(0)]" // Disable zoom/translate on mobile to prevent blurriness
                    priority
                    quality={85} // Higher quality to avoid compression artifacts
                />
                <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-20" />
                {/* Secondary subtle blur & darkening */}
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
            </div>

            <main className="relative z-10 pt-[80px] md:pt-[130px]">
                {/* Google WebSite & Sitelinks Search Box Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "@id": "https://www.affordablehome-ac.com/#website",
                            "url": "https://www.affordablehome-ac.com",
                            "name": "Affordable Home A/C",
                            "description": "Affordable window air conditioner installation, split AC installation, and window AC cleaning services across Oahu, Hawaii.",
                            "publisher": {
                                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
                            },
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "https://www.affordablehome-ac.com/shop?q={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />

                {/* Google HVACBusiness & LocalBusiness Structured Data Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "HVACBusiness",
                            "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
                            "name": "Affordable Home A/C",
                            "legalName": "Affordable Home A/C LLC",
                            "url": "https://www.affordablehome-ac.com",
                            "logo": "https://www.affordablehome-ac.com/assets/logo/ahac-logo-bus-500x500xv2.png",
                            "image": "https://www.affordablehome-ac.com/assets/hero-cards/ahac-hero-background-2.webp",
                            "telephone": "+1-808-488-1111",
                            "email": "office@affordablehome-ac.com",
                            "priceRange": "$$",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "94-474 Ukee St",
                                "addressLocality": "Waipahu",
                                "addressRegion": "HI",
                                "postalCode": "96797",
                                "addressCountry": "US"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 21.3868,
                                "longitude": -158.0092
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
                                    "dayOfWeek": "Saturday",
                                    "opens": "09:00",
                                    "closes": "14:00"
                                }
                            ],
                            "hasCredential": [
                                {
                                    "@type": "EducationalOccupationalCredential",
                                    "credentialCategory": "State Contractor License",
                                    "name": "Hawaii Specialty Contractor CT-36775",
                                    "recognizedBy": {
                                        "@type": "Organization",
                                        "name": "State of Hawaii Professional and Vocational Licensing"
                                    }
                                }
                            ],
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "reviewCount": "142",
                                "bestRating": "5",
                                "worstRating": "1"
                            },
                            "areaServed": [
                                { "@type": "City", "name": "Honolulu" },
                                { "@type": "City", "name": "Waipahu" },
                                { "@type": "City", "name": "Kapolei" },
                                { "@type": "City", "name": "Ewa Beach" },
                                { "@type": "City", "name": "Pearl City" },
                                { "@type": "City", "name": "Aiea" },
                                { "@type": "City", "name": "Mililani" },
                                { "@type": "City", "name": "Kailua" },
                                { "@type": "City", "name": "Kaneohe" },
                                { "@type": "City", "name": "Manoa" },
                                { "@type": "City", "name": "Kaimuki" },
                                { "@type": "City", "name": "Hawaii Kai" },
                                { "@type": "City", "name": "Salt Lake" },
                                { "@type": "City", "name": "Kunia" }
                            ]
                        })
                    }}
                />

                <h1 className="sr-only">Affordable Air Conditioning & Ductless Mini Split Installation in Hawaii</h1>

                {/* 1. Aloha Hero & Conversion Anchors */}
                <Section1HeroHomeV2 />

                {/* 2. Quick Jump Navigation Banner */}
                <QuickJumpBanner />

                {/* 3. Featured In-Stock Oahu Inventory (Waipahu Warehouse Direct) */}
                <HomeFeaturedInventory />

                {/* 4. Dual-Pathway Services (Mini-Split vs Window AC) */}
                <Section2OurServicesV2 />

                {/* 5. Official Oahu Transparent Service Pricing Matrix ($0 Estimate, $175 Diagnostic, $275 Teardown) */}
                <HomePricingMatrix />

                {/* 6. Island Verified Customer Reviews Pavilion */}
                <div className="border-t border-slate-800/80 bg-[#070b12]/95 backdrop-blur-sm">
                    <ReviewsPavilion 
                        variant="full" 
                        title="Island Verified Customer Stories"
                        subtitle="Hear how Oahu homeowners beat the humidity with whisper-quiet ductless mini-splits and energy-efficient window ACs."
                        showFlywheel={true}
                    />
                </div>

                {/* 7. 22-City Oahu Regional Service Areas Hub */}
                <HomeServiceAreasHub />
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
