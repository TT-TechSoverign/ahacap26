import Section2OurServicesV2 from '@/components/Section2OurServicesV2';
import Section1HeroHomeV2 from '@/components/Section1HeroHomeV2';
import { QuickJumpBanner } from '@/components/QuickJumpBanner';
import { BackToTop } from '@/components/BackToTop';
import FourthOfJulyBanner from '@/components/FourthOfJulyBanner';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Affordable Home A/C | Window AC Installation & Split AC Oahu',
    description: 'Expert window air conditioner installation, split AC installation, and window AC cleaning services across Oahu. Authorized LG, GE, Carrier dealer in Waipahu.',
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
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover object-center translate-y-0 scale-100 md:translate-y-[-10%] md:scale-110 [transform:translateZ(0)]" // Disable zoom/translate on mobile to prevent blurriness
                    priority
                    quality={85} // Higher quality to avoid compression artifacts
                />
                <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-20" />
                {/* Secondary subtle blur & darkening */}
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
            </div>

            <main className="relative z-10 pt-[110px] md:pt-[130px]">
                <h1 className="sr-only">Affordable Air Conditioning & Ductless Mini Split Installation in Hawaii</h1>
                <Section1HeroHomeV2 />
                <QuickJumpBanner />
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <FourthOfJulyBanner />
                </div>
                <Section2OurServicesV2 />
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
