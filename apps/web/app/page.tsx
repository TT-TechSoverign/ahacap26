import { Render } from "@measured/puck";
import config from "../puck.config";

import Section2OurServicesV2 from '@/components/Section2OurServicesV2';
import Section4Projects from '@/components/Section4Projects';
import { BackToTop } from '@/components/BackToTop';
import FourthOfJulyBanner from '@/components/FourthOfJulyBanner';

// Force dynamic since we want to ensure fresh rendering
// v2.5 Visual Refinements Force Rebuild
// export const dynamic = 'force-dynamic'; // Removed to unlock SSG Edge Caching

import Image from 'next/image';

export default function Homepage() {
    return (
        <div className="relative font-sans bg-slate-950">
            {/* Global Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assets/hero-cards/ahac-hero-background-2.png"
                    alt="Expert HVAC Installation by Affordable Home A/C"
                    fill
                    className="object-cover object-center translate-y-[-10%] scale-110" // Slight shift to align visually
                    priority
                />
                <div className="absolute inset-0 bg-[#0F172A] mix-blend-multiply opacity-20" />
                {/* Secondary subtle blur & darkening */}
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
            </div>

            <main className="relative z-10 pt-[140px] md:pt-[165px]">
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <FourthOfJulyBanner />
                </div>
                <Section2OurServicesV2 />
                {/* <Section4Projects /> */}
                {/* <Render config={config} data={v2Data} /> */}
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
