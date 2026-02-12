import { Render } from "@measured/puck";
import config from "../puck.config";

import Section2OurServicesV2 from '@/components/Section2OurServicesV2';
import Section4Projects from '@/components/Section4Projects';
import { BackToTop } from '@/components/BackToTop';

// Force dynamic since we want to ensure fresh rendering
// v2.5 Visual Refinements Force Rebuild
export const dynamic = 'force-dynamic';

import Image from 'next/image';

export default function Homepage() {
    return (
        <div className="relative min-h-screen font-sans bg-slate-950">
            {/* Global Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assets/hero-cards/bg-honolulu_skyline.jpg"
                    alt="Honolulu Skyline"
                    fill
                    className="object-cover object-center translate-y-[-10%] scale-110" // Slight shift to align visually
                    priority
                />
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]" />
            </div>

            <main className="relative z-10 pt-[180px]">
                <Section2OurServicesV2 />
                {/* <Section4Projects /> */}
                {/* <Render config={config} data={v2Data} /> */}
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
