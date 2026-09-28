import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Mold Removal & Deep Cleaning Oahu | Clinical Sanitization | Affordable Home A/C'
    },
    description: 'Clinical AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold from blower wheels and coils. $175 Basic / $275 Premium Teardown. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-mold-removal-cleaning-oahu',
    },
    openGraph: {
        title: 'AC Mold Removal & Deep Cleaning Oahu | Clinical Sanitization | Affordable Home A/C',
        description: 'Clinical AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold from blower wheels and coils. $175 Basic / $275 Premium Teardown. CT-36775 licensed.',
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
        description: 'Clinical AC mold removal and deep cleaning for Oahu homes. Eliminate Cladosporium and black mold from blower wheels and coils. $175 Basic / $275 Premium Teardown. CT-36775 licensed.',
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
                "text": "Oahu's year-round 80%+ humidity combined with dark, damp indoor evaporator coils creates the ideal breeding ground for mold spores like Cladosporium and Aspergillus. Over months, spores colonize the cylindrical blower wheel and drip pan, blowing microscopic allergens into your home every time the unit runs."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between Basic and Premium AC mold cleaning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Basic Mini Split AC Cleaning ($175) provides clinical coil sanitization, air filter wash, and condensate drain flush. Our Premium Deep Cleaning (Full Teardown) ($275) completely disassembles the casing to access hidden mold, deep cleans the air scoop, pulls the blower fan wheel for 360-degree decontamination, and scrubs the condensate pan."
            }
        },
        {
            "@type": "Question",
            "name": "Will the cleaning process make a water mess on my walls or floor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zero water mess. Our licensed technicians lay protective floor drop cloths directly under the indoor unit. Precision rinse systems capture 100% of dirty water and mold slurry, safely removing all contaminants from your home."
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
