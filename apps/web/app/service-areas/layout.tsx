import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '22 Oahu AC Service Areas | In-Stock Window ACs ($395+) & Window AC Cleaning | Affordable Home A/C',
    },
    description: '$0 Free Estimate across all 22 Oahu cities • (808) 488-1111. In-stock LG & GE Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), install & deep cleaning.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/service-areas',
    },
    openGraph: {
        title: '22 Oahu Window AC Service Areas ($0 Estimate) | In-Stock ACs ($395+), Install & Clean',
        description: '$0 Free Estimate across all 22 Oahu cities • (808) 488-1111. In-stock LG & GE Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), install & deep cleaning.',
        url: 'https://www.affordablehome-ac.com/service-areas',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Affordable Home A/C Logo',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '22 Oahu Window AC Service Areas ($0 Estimate) | In-Stock ACs ($395+), Install & Clean',
        description: '$0 Free Estimate across all 22 Oahu cities • (808) 488-1111. In-stock LG & GE Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), install & deep cleaning.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

export default function ServiceAreasLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
