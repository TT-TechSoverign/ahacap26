import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Narrow Window AC Solutions Hawaii | Small Openings Under 22" | Affordable Home A/C'
    },
    description: 'Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom vertical framing and compact Inverters in stock in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii',
    },
    openGraph: {
        title: 'Narrow Window AC Solutions Hawaii | Small Openings Under 22" | Affordable Home A/C',
        description: 'Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom vertical framing and compact Inverters in stock in Waipahu.',
        url: 'https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Narrow Window AC Solutions Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Narrow Window AC Solutions Hawaii | Small Openings Under 22" | Affordable Home A/C',
        description: 'Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom vertical framing and compact Inverters in stock in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const narrowWindowFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the smallest window width that can fit an air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "By removing standard side accordion curtains and using our custom narrow-mounting brackets, our compact 6,000 BTU LG Dual Inverter unit (chassis width 19.5 inches) can fit into window openings as narrow as 20 to 21 inches wide."
            }
        },
        {
            "@type": "Question",
            "name": "Can you install an AC in a tall, narrow slider or casement window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! For tall, skinny openings, we build custom acrylic or insulated vertical filler panels above the unit, sealing the vertical height while fitting the narrow width perfectly."
            }
        },
        {
            "@type": "Question",
            "name": "Does a narrow window AC provide enough cooling for an Oahu bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! A compact 6,000 to 8,000 BTU Dual Inverter unit delivers ample cooling power for bedrooms up to 350 sq ft, while running quietly at 44 dB."
            }
        }
    ]
};

export default function NarrowWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(narrowWindowFaqSchema) }}
            />
            {children}
        </>
    );
}
