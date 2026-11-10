import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC for Studios & Apartments Hawaii ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Space-saving, whisper-quiet window air conditioners designed for Honolulu studio apartments, Waikiki walk-ups, and.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii',
    },
    openGraph: {
        title: 'Window AC for Studios & Apartments Hawaii ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Space-saving, whisper-quiet window air conditioners designed for Honolulu studio apartments, Waikiki walk-ups, and.',
        url: 'https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC for Studios and Apartments Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC for Studios & Apartments Hawaii ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Space-saving, whisper-quiet window air conditioners designed for Honolulu studio apartments, Waikiki walk-ups, and.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    }
};

const studioApartmentFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What size window AC is best for a studio apartment on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For typical Honolulu studio apartments ranging from 350 to 550 sq ft, an 8,000 to 10,000 BTU LG Dual Inverter or GE Built-In unit is ideal. It provides sufficient cooling capacity for island humidity while running on a standard 115V circuit."
            }
        },
        {
            "@type": "Question",
            "name": "Why is low decibel sound important in a studio apartment?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In a studio apartment, your living room, home office, and bed are in the same room. A traditional loud window AC (55+ dB) makes sleeping or watching TV difficult. Our 44 dB Dual Inverter units run at a gentle whisper."
            }
        },
        {
            "@type": "Question",
            "name": "Can I install this in a rental apartment without damaging the window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians use non-destructive compression brackets and foam gaskets that protect window sills and frames, making removal easy when moving out so your security deposit is protected."
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
            "name": "Oahu Window AC Shop",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Studio & Apartment Window ACs",
            "item": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii"
        }
    ]
};

export default function StudioApartmentAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(studioApartmentFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
