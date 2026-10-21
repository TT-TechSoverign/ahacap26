import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Clean vs Replace Window AC Oahu | Diagnostic Decision Guide | Affordable Home A/C'
    },
    description: 'Should you clean or replace your window AC on Oahu? Compare DIY filter maintenance vs upgrading to an in-stock LG Dual Inverter with $45 Hawaii Energy rebate.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/clean-vs-replace-window-ac',
    },
    openGraph: {
        title: 'Clean vs Replace Window AC Oahu | Diagnostic Decision Guide | Affordable Home A/C',
        description: 'Should you clean or replace your window AC on Oahu? Compare DIY filter maintenance vs upgrading to an in-stock LG Dual Inverter with $45 Hawaii Energy rebate.',
        url: 'https://www.affordablehome-ac.com/clean-vs-replace-window-ac',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Clean vs Replace Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clean vs Replace Window AC Oahu | Diagnostic Decision Guide | Affordable Home A/C',
        description: 'Should you clean or replace your window AC on Oahu? Compare DIY filter maintenance vs upgrading to an in-stock LG Dual Inverter with $45 Hawaii Energy rebate.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

export default function CleanVsReplaceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

