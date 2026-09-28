import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Single-Wall Construction AC Cooling Hawaii | Sizing & Install | Affordable Home A/C'
    },
    description: 'Specialized air conditioning sizing and installation for uninsulated single-wall redwood plantation homes on Oahu. Overcome thermal heat soak with Dual Inverters.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii',
    },
    openGraph: {
        title: 'Single-Wall Construction AC Cooling Hawaii | Sizing & Install | Affordable Home A/C',
        description: 'Specialized air conditioning sizing and installation for uninsulated single-wall redwood plantation homes on Oahu. Overcome thermal heat soak with Dual Inverters.',
        url: 'https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Single Wall Construction AC Cooling Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Single-Wall Construction AC Cooling Hawaii | Sizing & Install | Affordable Home A/C',
        description: 'Specialized air conditioning sizing and installation for uninsulated single-wall redwood plantation homes on Oahu. Overcome thermal heat soak with Dual Inverters.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const singleWallFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why do single-wall homes in Hawaii require larger AC units?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Historic single-wall plantation homes built between 1920 and 1970 use single 3/4-inch tongue-and-groove cedar or redwood boards with zero fiberglass insulation or wall cavities. By mid-afternoon, intense tropical sunlight radiates heat directly through the exterior walls. Sizing must factor in this thermal load with our Island Microclimate Calibration."
            }
        },
        {
            "@type": "Question",
            "name": "Can older electrical wiring in single-wall homes handle modern air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, when paired with LG Dual Inverter technology. Inverter compressors feature soft-start electronics that eliminate the 30-amp inrush current spike of older units, running safely on older 15-amp residential circuits without tripping breakers."
            }
        },
        {
            "@type": "Question",
            "name": "Can you install an AC in a single-wall home with jalousie windows?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians specialize in custom jalousie window framing and standard exterior support brackets, ensuring an airtight, weatherproof fit that protects historic wooden window frames."
            }
        }
    ]
};

export default function SingleWallAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(singleWallFaqSchema) }}
            />
            {children}
        </>
    );
}
