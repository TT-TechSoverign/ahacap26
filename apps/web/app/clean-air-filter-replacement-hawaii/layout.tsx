import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Air Filter Cleaning & Replacement Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Learn how to clean and replace LG & GE window AC air filters in Hawaii homes. Protect against vog, red dirt, and.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/clean-air-filter-replacement-hawaii',
    },
    openGraph: {
        title: 'AC Air Filter Cleaning & Replacement Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Learn how to clean and replace LG & GE window AC air filters in Hawaii homes. Protect against vog, red dirt, and.',
        url: 'https://www.affordablehome-ac.com/clean-air-filter-replacement-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Clean Air Filter Replacement Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Air Filter Cleaning & Replacement Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Learn how to clean and replace LG & GE window AC air filters in Hawaii homes. Protect against vog, red dirt, and.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const filterCareFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How often should I clean my window AC filters in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii, washable mesh window AC filters should be rinsed every 2 to 4 weeks. If you live in an area prone to volcanic haze (vog), open windows frequently near red dirt, or have indoor pets, bi-weekly washing is recommended to maintain airflow."
            }
        },
        {
            "@type": "Question",
            "name": "How do I properly wash a reusable window AC mesh filter?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unlatch the front intake grille, slide the mesh screen out, and rinse it with lukewarm water from the back side forward so dust washes away from the mesh. Allow it to dry 100% in the shade before sliding back in to prevent mildew."
            }
        },
        {
            "@type": "Question",
            "name": "When should an AC filter be completely replaced rather than cleaned?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reusable filters should be replaced if the plastic frame is cracked or if tears or holes have formed in the nylon mesh."
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
            "name": "Window AC Filter & Coil Maintenance",
            "item": "https://www.affordablehome-ac.com/clean-air-filter-replacement-hawaii"
        }
    ]
};

export default function AirFilterCareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(filterCareFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
