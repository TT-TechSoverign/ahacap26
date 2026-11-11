import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '115V vs 230V Window AC Plug Guide Oahu ($395+) | 5-15P & 6-15P',
    },
    description: 'Match your Oahu wall outlet (115V 15A vs 208/230V 15A/20A NEMA chart) to in-stock LG & GE Window ACs ($395–$1,200) in Waipahu. $0 Free Estimate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/window-ac-plug-guide',
    },
    openGraph: {
        title: '115V vs 230V Window AC Plug Guide Oahu ($395+) | 5-15P & 6-15P',
        description: 'Match your Oahu wall outlet (115V 15A vs 208/230V 15A/20A NEMA chart) to in-stock LG & GE Window ACs ($395–$1,200) in Waipahu. $0 Free Estimate • (808) 488-1111.',
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
        title: '115V vs 230V Window AC Plug Guide Oahu ($395+) | 5-15P & 6-15P',
        description: 'Match your Oahu wall outlet (115V 15A vs 208/230V 15A/20A NEMA chart) to in-stock LG & GE Window ACs ($395–$1,200) in Waipahu. $0 Free Estimate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function WindowAcPlugGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
