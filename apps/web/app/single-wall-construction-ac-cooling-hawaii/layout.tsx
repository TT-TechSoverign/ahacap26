import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Single-Wall Home AC Sizing & Cooling Hawaii ($0 Estimate) | In-Stock LG & GE ACs'
    },
    description: '$0 Free Estimate • (808) 488-1111. Island Microclimate BTU sizing & jalousie installation for uninsulated Hawaii single-wall redwood homes. In-stock ACs $395+.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii',
    },
    openGraph: {
        title: 'Single-Wall Home AC Sizing & Cooling Hawaii ($0 Estimate) | In-Stock LG & GE ACs',
        description: '$0 Free Estimate • (808) 488-1111. Island Microclimate BTU sizing & jalousie installation for uninsulated Hawaii single-wall redwood homes. In-stock ACs $395+.',
        url: 'https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Single Wall Construction AC Cooling Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Single-Wall Home AC Sizing & Cooling Hawaii ($0 Estimate) | In-Stock LG & GE ACs',
        description: '$0 Free Estimate • (808) 488-1111. Island Microclimate BTU sizing & jalousie installation for uninsulated Hawaii single-wall redwood homes. In-stock ACs $395+.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
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
                "text": "Yes, when paired with LG Dual Inverter & GE R32 Inverter technology. Inverter compressors feature soft-start electronics that eliminate the 30-amp inrush current spike of older units, running safely on older 15-amp residential circuits without tripping breakers."
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Single-Wall Redwood Home AC Sizing & Mounting",
            "item": "https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
