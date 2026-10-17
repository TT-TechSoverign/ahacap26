import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '8,000 BTU Window AC Oahu (LG LW8022IVSM & LW8024RD) — From $395 | Waipahu Warehouse | Affordable Home A/C',
    },
    description: 'Compare and buy 8,000 BTU 115V bedroom window air conditioners in Oahu: LG Standard LW8024RD ($395), LG Cool+Heat LW8023HRSM ($660), and LG Dual Inverter LW8022IVSM ($595). Free Waipahu pickup or $50 delivery.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-8000-btu-oahu',
    },
    openGraph: {
        title: '8,000 BTU Window AC Oahu (LG LW8022IVSM & LW8024RD) — From $395 | In-Stock Waipahu',
        description: 'Oahu #1 bedroom window AC size (8,000 BTU 115V). Compare in-stock LG models ready for Waipahu warehouse pickup or $50 flat island delivery.',
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
        title: '8,000 BTU Window AC Oahu (LG LW8022IVSM & LW8024RD) — From $395',
        description: 'Compare 8,000 BTU 115V bedroom window ACs in stock at our Waipahu warehouse.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function Lg8000BtuShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
