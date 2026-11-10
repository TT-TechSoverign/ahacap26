import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '8,000 BTU Window AC Oahu (LG LW8022IVSM & LW8024RD) — From $395 | Waipahu Warehouse | Affordable Home A/C',
    },
    description: 'Compare and buy 8,000 BTU 115V bedroom window air conditioners in Oahu: LG Standard LW8024RD ($395), LG Cool+Heat LW8023HRSM ($650), LG Dual Inverter LW8022IVSM ($595), and GE 8,200 BTU Built-In AJCQ08AWJ ($1,000). Free Waipahu pickup or $50 delivery.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/lg-dual-inverter-8000-btu-oahu',
    },
    openGraph: {
        title: '8,000 BTU Window AC Oahu (LG LW8022IVSM & LW8024RD) — From $395 | Waipahu Warehouse | Affordable Home A/C',
        description: 'Compare and buy 8,000 BTU 115V bedroom window air conditioners in Oahu: LG Standard LW8024RD ($395), LG Cool+Heat LW8023HRSM ($650), LG Dual Inverter LW8022IVSM ($595), and GE 8,200 BTU Built-In AJCQ08AWJ ($1,000). Free Waipahu pickup or $50 delivery.',
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
        title: '8,000 BTU Window AC Oahu (LG LW8022IVSM & LW8024RD) — From $395 | Waipahu Warehouse | Affordable Home A/C',
        description: 'Compare and buy 8,000 BTU 115V bedroom window air conditioners in Oahu: LG Standard LW8024RD ($395), LG Cool+Heat LW8023HRSM ($650), LG Dual Inverter LW8022IVSM ($595), and GE 8,200 BTU Built-In AJCQ08AWJ ($1,000). Free Waipahu pickup or $50 delivery.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function Lg8000BtuShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
