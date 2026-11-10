import Section1HeroHomeV2 from '@/components/Section1HeroHomeV2';
import { QuickJumpBanner } from '@/components/QuickJumpBanner';
import { BackToTop } from '@/components/BackToTop';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { HomeFeaturedInventory } from '@/components/HomeFeaturedInventory';
import { HomeServicesDivisions } from '@/components/HomeServicesDivisions';
import { HomeServiceAreasHub } from '@/components/HomeServiceAreasHub';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: {
        absolute: 'In-Stock LG & GE Window ACs Oahu ($395–$1,200) | Install & Cleaning | (808) 488-1111',
    },
    description: '$0 Free Estimate • (808) 488-1111. Shop 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), jalousie install & cleaning.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com',
    },
    openGraph: {
        title: 'In-Stock LG & GE Window ACs Oahu ($395–$1,200) | Install & Cleaning | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Shop 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), jalousie install & cleaning.',
        url: 'https://www.affordablehome-ac.com',
        siteName: 'Affordable Home A/C',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'In-Stock LG Dual Inverter & GE Window ACs Oahu ($395–$1,200) — Affordable Home A/C',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'In-Stock LG & GE Window ACs Oahu ($395–$1,200) | Install & Cleaning | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Shop 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), jalousie install & cleaning.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

export default function Homepage() {
    return (
        <div className="relative font-sans bg-slate-950">
            {/* Global Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assets/hero-cards/ahac-hero-background-2.webp"
                    alt="Expert Window AC Installation & Cleaning by Affordable Home A/C"
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

            <main className="relative z-10 pt-[88px] md:pt-[176px]">
                {/* Google WebSite, Sitelinks Search Box & Homepage AggregateRating Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "WebSite",
                                    "@id": "https://www.affordablehome-ac.com/#website",
                                    "url": "https://www.affordablehome-ac.com",
                                    "name": "Affordable Home A/C",
                                    "description": "In-stock LG Dual Inverter & GE Window ACs ($395–$1,200), custom jalousie window AC installation, and window AC deep cleaning across Oahu, Hawaii.",
                                    "publisher": {
                                        "@type": "Organization",
                                        "name": "Affordable Home A/C",
                                        "url": "https://www.affordablehome-ac.com"
                                    },
                                    "potentialAction": {
                                        "@type": "SearchAction",
                                        "target": {
                                            "@type": "EntryPoint",
                                            "urlTemplate": "https://www.affordablehome-ac.com/shop?q={search_term_string}"
                                        },
                                        "query-input": "required name=search_term_string"
                                    }
                                },
                                {
                                    "@type": "HVACBusiness",
                                    "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
                                    "name": "Affordable Home A/C",
                                    "url": "https://www.affordablehome-ac.com",
                                    "telephone": "+1-808-488-1111",
                                    "priceRange": "$395 - $1,200",
                                    "aggregateRating": {
                                        "@type": "AggregateRating",
                                        "ratingValue": "4.9",
                                        "reviewCount": "142",
                                        "bestRating": "5",
                                        "worstRating": "1"
                                    }
                                },
                                {
                                    "@type": "FAQPage",
                                    "mainEntity": [
                                        {
                                            "@type": "Question",
                                            "name": "Where can I buy an LG Dual Inverter or GE 26-inch Built-In Window AC in stock on Oahu?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Affordable Home A/C stocks 16 LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In Through-the-Wall air conditioners ($395 to $1,200) at our central Waipahu warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797). Order online for free Waipahu warehouse pickup by appointment or $50 flat-rate Oahu delivery."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Do you install Window ACs in Hawaiian jalousie louver windows and 26-inch condo wall sleeves?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Yes. Our insured Oahu cooling specialists custom-fit LG and GE window air conditioners into Hawaiian jalousie glass louver windows, standard sliders, double-hung windows, and 26-inch through-the-wall condo sleeves with floor drop-cloth protection and a $0 Free In-Home Estimate."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Do your in-stock Window ACs qualify for the $45 Hawaii Energy cash rebate?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Yes! Qualifying ENERGY STAR® LG Dual Inverter and GE R-32 Inverter window air conditioners include our official Hawaii Energy $45 cash rebate form PDF and reduce HECO cooling electricity use by up to 40% (~$424/yr)."
                                            }
                                        }
                                    ]
                                }
                            ]
                        })
                    }}
                />

                {/* 1. Aloha Hero & Conversion Anchors */}
                <Section1HeroHomeV2 />

                {/* 2. Quick Jump Navigation Banner */}
                <QuickJumpBanner />

                {/* 3. Featured In-Stock Oahu Inventory (Waipahu Warehouse Direct) */}
                <HomeFeaturedInventory />

                {/* 4. Dedicated Window AC & Cleaning Divisions */}
                <HomeServicesDivisions />

                {/* 6. Island Verified Customer Reviews Pavilion */}
                <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-[#070b12]/95 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <ReviewsPavilion 
                            variant="featured" 
                            limit={6}
                            title="Island Verified Customer Stories"
                            subtitle="Hear how Oahu homeowners beat the humidity with whisper-quiet LG Dual Inverter and GE Built-In window ACs and professional deep cleaning."
                            showFlywheel={true}
                        />
                    </div>
                </section>

                {/* 7. 22-City Oahu Regional Service Areas Hub */}
                <HomeServiceAreasHub />
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
