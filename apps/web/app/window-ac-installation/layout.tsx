import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Installation Oahu ($0 Estimate) | Jalousie & Wall | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Custom Oahu jalousie louver baffles, 26" condo wall sleeve swaps, brackets & in-stock LG/GE ACs ($395–$1,200).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-installation',
    },
    openGraph: {
        title: 'Window AC Installation Oahu ($0 Estimate) | Jalousie & Wall | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Custom Oahu jalousie louver baffles, 26" condo wall sleeve swaps, brackets & in-stock LG/GE ACs ($395–$1,200).',
        url: 'https://www.affordablehome-ac.com/window-ac-installation',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Installation Oahu Jalousie Mounting',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Installation Oahu ($0 Estimate) | Jalousie & Wall | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Custom Oahu jalousie louver baffles, 26" condo wall sleeve swaps, brackets & in-stock LG/GE ACs ($395–$1,200).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

export default function WindowAcInstallationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

