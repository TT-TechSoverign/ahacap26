import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Drain Line Clog Clearing Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Fast, professional LG & GE window AC condensate drain line clearing on Oahu. Vacuum extraction, dedicated line.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-drain-line-clog-clearing-oahu',
    },
    openGraph: {
        title: 'AC Drain Line Clog Clearing Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Fast, professional LG & GE window AC condensate drain line clearing on Oahu. Vacuum extraction, dedicated line.',
        url: 'https://www.affordablehome-ac.com/ac-drain-line-clog-clearing-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Drain Line Clog Clearing Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Drain Line Clog Clearing Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: 'Fast, professional AC condensate drain line clearing on Oahu. Vacuum extraction, dedicated line flushing, and anti-algae treatment stop indoor water leaks.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const drainLineFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What causes AC drain lines to clog so quickly in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hawaii's warm ambient air combined with constant condensation creates the perfect breeding environment for bacterial slime called zooglea and airborne algae spores. Over 6 to 12 months, this forms a gelatinous plug that blocks the rear condensate drain port, internal slinger channels, or attached drain tubing."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C clear clogged condensate drains?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use dual-action extraction: industrial high-vacuum suction from the exterior termination point paired with dedicated condensate line flushing, followed by an antimicrobial pan flush and slow-dissolving drain pan treatment tablets."
            }
        },
        {
            "@type": "Question",
            "name": "Can pouring vinegar down the drain prevent clogs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A cup of white vinegar every few months can help slow minor bacterial growth, but once a dense algae jelly plug has established, mechanical vacuum extraction and pressure clearing are required to prevent overflow."
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
            "name": "Window AC Condensate Drain Pan & Line Clearing",
            "item": "https://www.affordablehome-ac.com/ac-drain-line-clog-clearing-oahu"
        }
    ]
};

export default function DrainLineClogLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(drainLineFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
