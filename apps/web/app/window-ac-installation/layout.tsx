import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Installation Oahu | Jalousie & Slider Mounting • $0 Estimate | Affordable Home A/C'
    },
    description: 'Professional window AC installation on Oahu ($0 Free Estimate). Custom jalousie louver acrylic baffles, horizontal slider panels, exterior brackets & drop cloth protection. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-installation',
    },
    openGraph: {
        title: 'Window AC Installation Oahu | Jalousie & Slider Mounting • $0 Estimate | Affordable Home A/C',
        description: 'Professional window AC installation on Oahu ($0 Free Estimate). Custom jalousie louver acrylic baffles, horizontal slider panels, exterior brackets & drop cloth protection. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-installation',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Installation Oahu Jalousie Mounting',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Installation Oahu | Jalousie & Slider Mounting • $0 Estimate | Affordable Home A/C',
        description: 'Professional window AC installation on Oahu ($0 Free Estimate). Custom jalousie louver acrylic baffles, horizontal slider panels, exterior brackets & drop cloth protection. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

export default function WindowAcInstallationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

