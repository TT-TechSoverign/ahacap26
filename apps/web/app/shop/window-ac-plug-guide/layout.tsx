import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Plug & Voltage Guide Oahu (115V vs 230V NEMA Chart) | Affordable Home A/C',
    },
    description: 'Match your Hawaii wall outlet (115V NEMA 5-15P standard 3-prong vs 208/230V NEMA 6-15P & 6-20P) to the right in-stock LG or GE window air conditioner ($395–$1,025) in Waipahu, Oahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/window-ac-plug-guide',
    },
    openGraph: {
        title: 'Window AC Plug & Voltage Guide Oahu (115V vs 230V NEMA Chart) | Affordable Home A/C',
        description: 'Check your Oahu wall outlet before buying. Complete 115V vs 230V NEMA plug chart with live in-stock LG & GE window AC models.',
        url: 'https://www.affordablehome-ac.com/shop/window-ac-plug-guide',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Oahu Window AC 115V vs 230V Plug Compatibility Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Plug & Voltage Guide Oahu (115V vs 230V NEMA Chart)',
        description: 'Match your 115V or 230V wall outlet to in-stock Waipahu window air conditioners.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function WindowAcPlugGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
