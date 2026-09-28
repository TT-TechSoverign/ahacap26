import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Drain Line Clog Clearing Oahu | Algae Slime Flush | Affordable Home A/C'
    },
    description: 'Fast, professional AC condensate drain line clearing on Oahu. Vacuum extraction, dedicated line flushing, and anti-algae treatment stop indoor water leaks. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-drain-line-clog-clearing-oahu',
    },
    openGraph: {
        title: 'AC Drain Line Clog Clearing Oahu | Algae Slime Flush | Affordable Home A/C',
        description: 'Fast, professional AC condensate drain line clearing on Oahu. Vacuum extraction, dedicated line flushing, and anti-algae treatment stop indoor water leaks. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-drain-line-clog-clearing-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Drain Line Clog Clearing Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Drain Line Clog Clearing Oahu | Algae Slime Flush | Affordable Home A/C',
        description: 'Fast, professional AC condensate drain line clearing on Oahu. Vacuum extraction, dedicated line flushing, and anti-algae treatment stop indoor water leaks. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
                "text": "Hawaii's warm ambient air combined with constant condensation creates the perfect breeding environment for bacterial slime called zooglea and airborne algae spores. Over 6 to 12 months, this forms a gelatinous plug that blocks the 5/8-inch or 3/4-inch condensate pipe."
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

export default function DrainLineClogLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(drainLineFaqSchema) }}
            />
            {children}
        </>
    );
}
