import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Standard Window AC Support Brackets Oahu ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Heavy-duty exterior support brackets for 6,000–23,500 BTU Window ACs on Oahu. Relieves window sill weight & vibration.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-brackets-exterior-security-mounting-oahu',
    },
    openGraph: {
        title: 'Standard Window AC Support Brackets Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Heavy-duty exterior support brackets for 6,000–23,500 BTU Window ACs on Oahu. Relieves window sill weight & vibration.',
        url: 'https://www.affordablehome-ac.com/ac-brackets-exterior-security-mounting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Standard Window AC Brackets Mounting Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Standard Window AC Support Brackets Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Heavy-duty exterior support brackets for 6,000–23,500 BTU Window ACs on Oahu. Relieves window sill weight & vibration.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const standardBracketsFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What are standard window AC support brackets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard window AC support brackets are exterior triangular steel braces that mount under your air conditioner against the outdoor sill or wall. They support the heavy rear compressor section of the unit, transferring stress away from your window sash and sill."
            }
        },
        {
            "@type": "Question",
            "name": "Do all LG & GE window air conditioners need support brackets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "While small 6,000 to 8,000 BTU units can often rest on sturdy wooden sills, medium and large units (10,000 to 23,500 BTU weighing 70 to 140 lbs), units mounted in vinyl windows, and second-story installations require standard exterior brackets for safety."
            }
        },
        {
            "@type": "Question",
            "name": "Are standard brackets included in the installation price?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard window AC installation covers standard direct sash mounting. Where structural support brackets are needed for heavy units, vinyl frames, or second-story safety, standard exterior support brackets are available as an additional cost option with installation."
            }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
        { "@type": "ListItem", "position": 2, "name": "Window AC Installation", "item": "https://www.affordablehome-ac.com/window-ac-installation" },
        { "@type": "ListItem", "position": 3, "name": "Standard Window AC Support Brackets", "item": "https://www.affordablehome-ac.com/ac-brackets-exterior-security-mounting-oahu" }
    ]
};

export default function StandardWindowBracketsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(standardBracketsFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
