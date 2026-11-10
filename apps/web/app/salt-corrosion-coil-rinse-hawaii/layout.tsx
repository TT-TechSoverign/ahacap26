import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate) | Gold Fin LG ACs'
    },
    description: '$0 Free Estimate • (808) 488-1111. Protect coastal Oahu Window ACs from salt-air corrosion with professional coil washes or Gold Fin LG Dual Inverters ($560+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii',
    },
    openGraph: {
        title: 'Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate) | Gold Fin LG ACs',
        description: '$0 Free Estimate • (808) 488-1111. Protect coastal Oahu Window ACs from salt-air corrosion with professional coil washes or Gold Fin LG Dual Inverters ($560+).',
        url: 'https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Salt Corrosion Coil Rinse Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate) | Gold Fin LG ACs',
        description: '$0 Free Estimate • (808) 488-1111. Protect coastal Oahu Window ACs from salt-air corrosion with professional coil washes or Gold Fin LG Dual Inverters ($560+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const saltCorrosionFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does ocean salt air damage air conditioners in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Airborne sodium chloride from ocean spray deposits on exterior condenser coils. Moisture in our humid air creates an electrolyte solution that triggers galvanic corrosion between copper tubes and aluminum fins. This eats away heat-transfer surfaces and causes pinhole refrigerant leaks."
            }
        },
        {
            "@type": "Question",
            "name": "Can I spray my window AC exterior condenser section with a regular garden hose?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A gentle, low-pressure fresh water spray directly downward through the rear fins every 2 to 4 weeks helps rinse loose salt deposits. Never use high-pressure nozzles, which bend the razor-thin aluminum fins and permanently restrict airflow."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between Blue Fin / Gold Fin and standard coils?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Blue Fin and Gold Fin refer to hydrophilic epoxy coatings applied at the factory to aluminum fins. They repel water and salt adhesion, extending coil lifespan in marine environments like Kailua, Hawaii Kai, and Ewa Beach by up to 2-3 times longer than uncoated coils."
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
            "name": "Coastal Salt-Air Condenser Coil Rinse",
            "item": "https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii"
        }
    ]
};

export default function SaltCorrosionLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(saltCorrosionFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
