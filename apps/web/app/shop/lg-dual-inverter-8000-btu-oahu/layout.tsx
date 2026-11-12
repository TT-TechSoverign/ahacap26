import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '8,000 BTU Window ACs Oahu ($395–$1,000) | LG & GE In-Stock',
    },
    description: 'Compare 8,000 BTU 115V Oahu Window ACs: LG Standard ($395), LG Cool+Heat ($650), LG Inverter ($595) & GE 26" ($1,000) in Waipahu • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-8000-btu-oahu',
    },
    openGraph: {
        title: '8,000 BTU Window ACs Oahu ($395–$1,000) | LG & GE In-Stock',
        description: 'Compare 8,000 BTU 115V Oahu Window ACs: LG Standard ($395), LG Cool+Heat ($650), LG Inverter ($595) & GE 26" ($1,000) in Waipahu • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-8000-btu-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'LG 8,000 BTU Window Air Conditioners Oahu',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '8,000 BTU Window ACs Oahu ($395–$1,000) | LG & GE In-Stock',
        description: 'Compare 8,000 BTU 115V Oahu Window ACs: LG Standard ($395), LG Cool+Heat ($650), LG Inverter ($595) & GE 26" ($1,000) in Waipahu • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function Lg8000BtuShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
