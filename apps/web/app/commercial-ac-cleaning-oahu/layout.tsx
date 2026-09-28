import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Commercial AC Cleaning Oahu | Boutique Retail, Offices & Clinics | Affordable Home A/C'
    },
    description: 'Specialized commercial mini split and wall AC cleaning for Oahu boutiques, medical clinics, dental offices, and professional spaces. Drop-cloth protection. Licensed CT-36775.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/commercial-ac-cleaning-oahu',
    },
    openGraph: {
        title: 'Commercial AC Cleaning Oahu | Boutique Retail, Offices & Clinics | Affordable Home A/C',
        description: 'Specialized commercial mini split and wall AC cleaning for Oahu boutiques, medical clinics, dental offices, and professional spaces. Drop-cloth protection. Licensed CT-36775.',
        url: 'https://www.affordablehome-ac.com/commercial-ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Commercial AC Cleaning Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Commercial AC Cleaning Oahu | Boutique Retail, Offices & Clinics | Affordable Home A/C',
        description: 'Specialized commercial mini split and wall AC cleaning for Oahu boutiques, medical clinics, dental offices, and professional spaces. Drop-cloth protection. Licensed CT-36775.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const commercialCleaningFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does scheduling work for Oahu businesses during operating hours?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We operate during standard daytime hours. Because our technicians lay protective drop cloths beneath every unit and utilize self-contained, quiet washing equipment with zero water runoff, many offices, boutiques, and clinics schedule during normal morning hours without client disruption. Contact our dispatch desk at (808) 488-1111 to discuss your schedule."
            }
        },
        {
            "@type": "Question",
            "name": "Can you provide documentation and invoicing for commercial accounting?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We provide complete itemized invoicing detailing all work performed, licensed contractor CT-36775 verification, and Hawaii GET compliance for your business expense records."
            }
        },
        {
            "@type": "Question",
            "name": "How do you protect computers, merchandise, and clinic floors?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians lay heavy-duty protective floor drop cloths and poly shrouds over adjacent desks, inventory, and dental chairs. Precision drain containment captures all wastewater safely."
            }
        }
    ]
};

export default function CommercialAcCleaningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialCleaningFaqSchema) }}
            />
            {children}
        </>
    );
}
