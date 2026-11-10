import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Exterior Support Brackets & Mounting Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Heavy-duty standard exterior window AC support brackets and secure mounting on Oahu. Support 6,000 to 23,500 BTU.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-brackets-exterior-security-mounting-oahu',
    },
    openGraph: {
        title: 'AC Exterior Support Brackets & Mounting Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Heavy-duty standard exterior window AC support brackets and secure mounting on Oahu. Support 6,000 to 23,500 BTU.',
        url: 'https://www.affordablehome-ac.com/ac-brackets-exterior-security-mounting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Exterior Support Brackets Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Exterior Support Brackets & Mounting Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Heavy-duty standard exterior window AC support brackets and secure mounting on Oahu. Support 6,000 to 23,500 BTU.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const acBracketsFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why are standard exterior support brackets necessary for window ACs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window air conditioners weigh between 50 and 140 lbs, with over 70% of the weight hanging outside the window. Standard exterior support brackets anchor to the exterior wall sill to bear this cantilever load, preventing your window frame or vinyl sill from warping, cracking, or collapsing."
            }
        },
        {
            "@type": "Question",
            "name": "Are exterior window AC brackets required for second-story installations?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. On second-story installations, exterior support brackets are essential for safety, ensuring the unit cannot tip backwards or shift during severe trade wind storms."
            }
        },
        {
            "@type": "Question",
            "name": "Are brackets included with installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard LG & GE window AC installation covers standard mounting. Heavy-duty standard exterior support brackets and custom sill anchoring hardware are available as an additional cost option depending on window frame and exterior wall construction."
            }
        }
    ]
};

export default function AcBracketsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(acBracketsFaqSchema) }}
            />
            {children}
        </>
    );
}
