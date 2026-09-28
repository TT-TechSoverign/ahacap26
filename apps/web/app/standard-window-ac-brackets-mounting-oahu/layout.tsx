import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Standard Window AC Brackets & Mounting Oahu | Exterior Support | Affordable Home A/C'
    },
    description: 'Standard exterior window AC support brackets on Oahu. Sized for 6,000 to 23,500 BTU units, relieving weight from window sills. Additional cost option with installation.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/standard-window-ac-brackets-mounting-oahu',
    },
    openGraph: {
        title: 'Standard Window AC Brackets & Mounting Oahu | Exterior Support | Affordable Home A/C',
        description: 'Standard exterior window AC support brackets on Oahu. Sized for 6,000 to 23,500 BTU units, relieving weight from window sills. Additional cost option with installation.',
        url: 'https://www.affordablehome-ac.com/standard-window-ac-brackets-mounting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Standard Window AC Brackets Mounting Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Standard Window AC Brackets & Mounting Oahu | Exterior Support | Affordable Home A/C',
        description: 'Standard exterior window AC support brackets on Oahu. Sized for 6,000 to 23,500 BTU units, relieving weight from window sills. Additional cost option with installation.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
            "name": "Do all window air conditioners need support brackets?",
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

export default function StandardWindowBracketsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(standardBracketsFaqSchema) }}
            />
            {children}
        </>
    );
}
