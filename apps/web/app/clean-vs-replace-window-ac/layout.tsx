import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Clean vs Replace Window AC Oahu ($0 Estimate) | $395+ New AC'
    },
    description: '$0 Free Estimate • (808) 488-1111. Should you clean or replace your Oahu Window AC? Compare deep coil cleaning vs in-stock LG Dual Inverters ($395+, $45 Rebate).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/clean-vs-replace-window-ac',
    },
    openGraph: {
        title: 'Clean vs Replace Window AC Oahu ($0 Estimate) | $395+ New AC',
        description: '$0 Free Estimate • (808) 488-1111. Should you clean or replace your Oahu Window AC? Compare deep coil cleaning vs in-stock LG Dual Inverters ($395+, $45 Rebate).',
        url: 'https://www.affordablehome-ac.com/clean-vs-replace-window-ac',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Clean vs Replace Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clean vs Replace Window AC Oahu ($0 Estimate) | $395+ New AC',
        description: '$0 Free Estimate • (808) 488-1111. Should you clean or replace your Oahu Window AC? Compare deep coil cleaning vs in-stock LG Dual Inverters ($395+, $45 Rebate).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

export default function CleanVsReplaceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

