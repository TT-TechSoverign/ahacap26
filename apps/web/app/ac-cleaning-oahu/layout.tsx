import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Cleaning Oahu | Coil Sanitization & Deep Clean | Affordable Home A/C'
    },
    description: 'Breathe cleaner air and restore ice-cold airflow with professional Window AC cleaning and sanitization on Oahu. Floor drop-cloth protection & clean-vs-replace evaluation. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
    },
    openGraph: {
        title: 'Window AC Cleaning Oahu | Coil Sanitization & Deep Clean | Affordable Home A/C',
        description: 'Breathe cleaner air and restore ice-cold airflow with professional Window AC cleaning and sanitization on Oahu. Floor drop-cloth protection & clean-vs-replace evaluation. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Cleaning Oahu Coil Sanitization',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Cleaning Oahu | Coil Sanitization & Deep Clean | Affordable Home A/C',
        description: 'Breathe cleaner air and restore ice-cold airflow with professional Window AC cleaning and sanitization on Oahu. Floor drop-cloth protection & clean-vs-replace evaluation. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

export default function AcCleaningOahuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

