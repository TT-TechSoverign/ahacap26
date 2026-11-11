import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Repair Oahu ($0 Estimate) | Clean or $395+ New AC'
    },
    description: '$0 Free Estimate • (808) 488-1111. Oahu Window AC repair, troubleshooting, deep coil cleaning & same-day Waipahu LG/GE replacements ($395–$1,200, $45 Rebate).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-repair-oahu',
    },
    openGraph: {
        title: 'Window AC Repair Oahu ($0 Estimate) | Clean or $395+ New AC',
        description: '$0 Free Estimate • (808) 488-1111. Oahu Window AC repair, troubleshooting, deep coil cleaning & same-day Waipahu LG/GE replacements ($395–$1,200, $45 Rebate).',
        url: 'https://www.affordablehome-ac.com/ac-repair-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Repair & Clean-vs-Replace Assessment Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Repair Oahu ($0 Estimate) | Clean or $395+ New AC',
        description: '$0 Free Estimate • (808) 488-1111. Oahu Window AC repair, troubleshooting, deep coil cleaning & same-day Waipahu LG/GE replacements ($395–$1,200, $45 Rebate).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

export default function AcRepairOahuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

