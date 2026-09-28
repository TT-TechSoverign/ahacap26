import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Post-Storm AC Inspection & Cleaning Oahu | Kona Storm Check | Affordable Home A/C'
    },
    description: 'Post-storm AC inspection and emergency cleaning across Oahu. Remove salt crust, leaf debris, and water intrusion after Kona storms and high winds. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu',
    },
    openGraph: {
        title: 'Post-Storm AC Inspection & Cleaning Oahu | Kona Storm Check | Affordable Home A/C',
        description: 'Post-storm AC inspection and emergency cleaning across Oahu. Remove salt crust, leaf debris, and water intrusion after Kona storms and high winds. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Post Storm AC Inspection Cleaning Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Post-Storm AC Inspection & Cleaning Oahu | Kona Storm Check | Affordable Home A/C',
        description: 'Post-storm AC inspection and emergency cleaning across Oahu. Remove salt crust, leaf debris, and water intrusion after Kona storms and high winds. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const stormInspectionFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Should I run my air conditioner during a severe storm or tropical system?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "It is best to turn off your AC at the breaker during severe tropical storms or hurricanes. Severe wind gusts can stall outdoor fan blades while electrical voltage fluctuations and lightning surges can burn out sensitive inverter circuit boards."
            }
        },
        {
            "@type": "Question",
            "name": "What damage can a Kona storm cause to an outdoor AC condenser?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kona storms blow heavy southern marine salt spray, palm fronds, gravel, and standing water into condenser housings. This corrodes electrical disconnect terminals, clogs heat-exchange fins, and can jam the outdoor fan motor."
            }
        },
        {
            "@type": "Question",
            "name": "What is included in a post-storm AC inspection by Affordable Home A/C?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We clear internal debris, flush wind-driven salt from coils, test the disconnect switch and contactor, inspect refrigerant line insulation, test electrical capacitor ratings, and run a full operational cycle for a $175 flat rate."
            }
        }
    ]
};

export default function PostStormInspectionLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(stormInspectionFaqSchema) }}
            />
            {children}
        </>
    );
}
