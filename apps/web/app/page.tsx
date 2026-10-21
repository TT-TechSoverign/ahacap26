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
        absolute: 'LG & GE Window ACs & Window AC Cleaning Oahu | In-Stock $395+ | Affordable Home A/C',
    },
    description: 'Shop in-stock LG Dual Inverter & GE Built-In Window ACs from $395 (Waipahu Pickup or $50 Oahu Delivery), Jalousie Window AC Installation & Deep Window AC Cleaning • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com',
    },
    openGraph: {
        title: 'LG & GE Window ACs & Window AC Cleaning Oahu | In-Stock $395+ | Affordable Home A/C',
        description: 'Shop in-stock LG Dual Inverter & GE Built-In Window ACs from $395 (Waipahu Pickup or $50 Oahu Delivery), Jalousie Window AC Installation & Deep Window AC Cleaning • (808) 488-1111.',
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
                            "description": "In-stock LG Dual Inverter & GE Window ACs ($395–$1,200), custom jalousie window AC installation, and window AC deep cleaning across Oahu, Hawaii.",
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
