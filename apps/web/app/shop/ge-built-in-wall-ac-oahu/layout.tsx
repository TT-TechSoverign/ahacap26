import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'GE 26" Built-In Through-the-Wall & Window AC Guide Oahu (8,200–12,000 BTU) | In-Stock Waipahu | Affordable Home A/C',
    },
    description: 'Complete Oahu buyer guide and live Waipahu warehouse inventory for GE Built-In 26" Through-the-Wall ACs (AJCQ08AWJ, AJCQ10AWJ, AJCQ12AXXWA R32 Inverter), GE RAB26A wall sleeves, and LG Universal Fit wall/window units.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/ge-built-in-wall-ac-oahu',
    },
    openGraph: {
        title: 'GE 26" Built-In Through-the-Wall & Window AC Guide Oahu (8,200–12,000 BTU) | In-Stock Waipahu',
        description: 'Compare GE True 26" Built-In Through-the-Wall air conditioners (AJCQ08AWJ, AJCQ10AWJ, AJCQ12AXXWA Variable-Speed Inverter), GE RAB26A sleeves, and LG Universal Fit units in stock in Waipahu, Oahu.',
        url: 'https://www.affordablehome-ac.com/shop/ge-built-in-wall-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'GE 26" Built-In Through-the-Wall & Window AC Lineup Oahu',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GE 26" Built-In Through-the-Wall & Window AC Guide Oahu (8,200–12,000 BTU)',
        description: 'Compare GE 26" Built-In Through-the-Wall AC models, RAB26A sleeves, and LG Universal Fit units in stock at our Waipahu warehouse.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    },
};

export default function GeBuiltInWallAcGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
