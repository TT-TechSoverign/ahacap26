import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Mold Removal & Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Clinical LG & GE window AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-mold-removal-cleaning-oahu',
    },
    openGraph: {
        title: 'AC Mold Removal & Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Clinical LG & GE window AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold.',
        url: 'https://www.affordablehome-ac.com/ac-mold-removal-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Mold Removal Cleaning Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Mold Removal & Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Clinical LG & GE window AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const acMoldFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does mold grow inside my air conditioner in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oahu's year-round 80%+ humidity combined with dark, damp indoor evaporator coils creates the ideal breeding ground for mold spores like Cladosporium and Aspergillus. Over months, spores colonize the blower wheel and drip pan, blowing microscopic allergens into your home every time the unit runs."
            }
        },
        {
            "@type": "Question",
            "name": "What is included in your on-site window AC mold cleaning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our on-site Window AC Cleaning provides clinical evaporator and condenser coil sanitization, air filter wash, blower wheel scrubbing, and condensate pan flush—with honest clean-vs-replace assessments if a chassis is heavily corroded."
            }
        },
        {
            "@type": "Question",
            "name": "Will the cleaning process make a water mess on my walls or floor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zero water mess. Our technicians lay protective floor drop cloths directly under the window opening during service, safely containing all moisture and debris."
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
            "name": "Window AC Mold & Mildew Deep Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-mold-removal-cleaning-oahu"
        }
    ]
};

export default function AcMoldRemovalLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(acMoldFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
