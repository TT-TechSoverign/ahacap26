import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Cleaning Oahu ($0 Estimate) | Coil & Mold Wash'
    },
    description: '$0 Free Estimate • (808) 488-1111. Professional Oahu Window AC deep coil cleaning, mold sanitization, drain clearing & honest clean-vs-replace evaluation.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
    },
    openGraph: {
        title: 'Window AC Cleaning Oahu ($0 Estimate) | Coil & Mold Wash',
        description: '$0 Free Estimate • (808) 488-1111. Professional Oahu Window AC deep coil cleaning, mold sanitization, drain clearing & honest clean-vs-replace evaluation.',
        url: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Cleaning Oahu Coil Sanitization',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Cleaning Oahu ($0 Estimate) | Coil & Mold Wash',
        description: '$0 Free Estimate • (808) 488-1111. Professional Oahu Window AC deep coil cleaning, mold sanitization, drain clearing & honest clean-vs-replace evaluation.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

export default function AcCleaningOahuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

