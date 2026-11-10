import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Commercial AC Cleaning Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Specialized commercial LG & GE window and thru-wall AC cleaning for Oahu boutiques, medical clinics, dental.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/commercial-ac-cleaning-oahu',
    },
    openGraph: {
        title: 'Commercial AC Cleaning Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Specialized commercial LG & GE window and thru-wall AC cleaning for Oahu boutiques, medical clinics, dental.',
        url: 'https://www.affordablehome-ac.com/commercial-ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Commercial AC Cleaning Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Commercial AC Cleaning Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: 'Specialized commercial window and thru-wall AC cleaning for Oahu boutiques, medical clinics, dental offices, and professional spaces. Drop-cloth protection.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
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
                "text": "Yes. We provide complete itemized invoicing detailing all work performed, certificate of insurance verification, and Hawaii GET compliance for your business expense records."
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

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.affordablehome-ac.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Commercial Window AC Fleet Cleaning",
            "item": "https://www.affordablehome-ac.com/commercial-ac-cleaning-oahu"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
