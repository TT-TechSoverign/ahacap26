import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Mold Removal & Deep Cleaning Oahu | Clinical Sanitization | Affordable Home A/C'
    },
    description: 'Clinical LG & GE window AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold from blower wheels and coils. Insured Oahu Specialists.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-mold-removal-cleaning-oahu',
    },
    openGraph: {
        title: 'AC Mold Removal & Deep Cleaning Oahu | Clinical Sanitization | Affordable Home A/C',
        description: 'Clinical LG & GE window AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold from blower wheels and coils. Insured Oahu Specialists.',
        url: 'https://www.affordablehome-ac.com/ac-mold-removal-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Mold Removal Cleaning Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Mold Removal & Deep Cleaning Oahu | Clinical Sanitization | Affordable Home A/C',
        description: 'Clinical window AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold from blower wheels and coils. Insured Oahu Specialists.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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

export default function AcMoldRemovalLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(acMoldFaqSchema) }}
            />
            {children}
        </>
    );
}
