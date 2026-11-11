import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG Dual Inverter Window ACs Oahu ($560–$1,025) | 6k–23.5k BTU & $45 Rebate',
    },
    description: 'In-Stock LG Dual Inverter Window ACs ($560–$1,025, 6k–23.5k BTU) in Waipahu, Oahu. 44dB quiet, 40% HECO savings, $45 Rebate & $50 Oahu delivery • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-guide',
    },
    openGraph: {
        title: 'LG Dual Inverter Window ACs Oahu ($560–$1,025) | 6k–23.5k BTU & $45 Rebate',
        description: 'In-Stock LG Dual Inverter Window ACs ($560–$1,025, 6k–23.5k BTU) in Waipahu, Oahu. 44dB quiet, 40% HECO savings, $45 Rebate & $50 Oahu delivery • (808) 488-1111.',
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
        title: 'LG Dual Inverter Window ACs Oahu ($560–$1,025) | 6k–23.5k BTU & $45 Rebate',
        description: 'In-Stock LG Dual Inverter Window ACs ($560–$1,025, 6k–23.5k BTU) in Waipahu, Oahu. 44dB quiet, 40% HECO savings, $45 Rebate & $50 Oahu delivery • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function LgDualInverterGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
