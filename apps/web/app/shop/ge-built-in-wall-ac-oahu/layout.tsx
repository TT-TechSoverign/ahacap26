import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'GE 26" Built-In Wall AC Oahu ($1,000–$1,200) | RAB26A In-Stock',
    },
    description: 'In-Stock GE 26" Built-In Wall ACs (AJCQ08/10/12AXXWA, $1,000–$1,200) & RAB26A Sleeves ($275) in Waipahu, Oahu. $0 Estimate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/ge-built-in-wall-ac-oahu',
    },
    openGraph: {
        title: 'GE 26" Built-In Wall AC Oahu ($1,000–$1,200) | RAB26A In-Stock',
        description: 'In-Stock GE 26" Built-In Wall ACs (AJCQ08/10/12AXXWA, $1,000–$1,200) & RAB26A Sleeves ($275) in Waipahu, Oahu. $0 Estimate • (808) 488-1111.',
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
        title: 'GE 26" Built-In Wall AC Oahu ($1,000–$1,200) | RAB26A In-Stock',
        description: 'In-Stock GE 26" Built-In Wall ACs (AJCQ08/10/12AXXWA, $1,000–$1,200) & RAB26A Sleeves ($275) in Waipahu, Oahu. $0 Estimate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    },
};

export default function GeBuiltInWallAcGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
