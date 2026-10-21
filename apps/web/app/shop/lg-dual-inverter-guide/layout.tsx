import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG Dual Inverter Window AC Guide Oahu (6,000–23,500 BTU) — $560–$1,025 | In-Stock Waipahu | Affordable Home A/C',
    },
    description: 'Complete Oahu buyer guide and live Waipahu inventory for all 7 LG Dual Inverter Smart ThinQ window air conditioners (6,000 to 23,500 BTU, $560–$1,025), plus GE 26" Built-In wall sleeve options. Qualifies for $45 Hawaii Energy cash rebate.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-guide',
    },
    openGraph: {
        title: 'LG Dual Inverter Window AC Guide Oahu (6,000–23,500 BTU) — $560–$1,025 | In-Stock Waipahu',
        description: 'Compare all 7 LG Dual Inverter window ACs in stock in Waipahu, Oahu. Whisper-quiet 44 dB sleep mode, up to 40% HECO bill savings, and $45 Hawaii Energy rebate.',
        url: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-guide',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'LG Dual Inverter Window AC Lineup Oahu',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LG Dual Inverter Window AC Guide Oahu (6,000–23,500 BTU) — $560–$1,025',
        description: 'Compare all 7 LG Dual Inverter window AC models in stock at our Waipahu warehouse.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function LgDualInverterGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
