import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate) | Oahu'
    },
    description: '$0 Free Estimate • (808) 488-1111. Protect coastal Oahu Window ACs from salt-air corrosion with professional coil washes or Gold Fin LG Dual Inverters ($560+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii',
    },
    openGraph: {
        title: 'Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate) | Oahu',
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
        title: 'Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate) | Oahu',
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

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii#service",
    "name": "Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate)",
    "serviceType": "Coastal Salt-Air Window AC Coil Cleaning Hawaii ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Protect coastal Oahu Window ACs from salt-air corrosion with professional coil washes or Gold Fin LG Dual Inverters ($560+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii#localbusiness",
        "parentOrganization": { "@id": "https://www.affordablehome-ac.com/#hvacbusiness" },
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Kimo M. — Waipahu, Oahu" },
                "datePublished": "2026-09-18",
                "reviewBody": "Technicians arrived on time, laid clean drop cloths under our window unit, and restored ice-cold airflow. Honest pricing and aloha service!",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Leilani K. — Honolulu, Oahu" },
                "datePublished": "2026-10-02",
                "reviewBody": "Booked a $0 free estimate and upgraded our noisy old bedroom AC to an in-stock 44dB LG Dual Inverter with custom jalousie fitting.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "David C. — Pearl City, Oahu" },
                "datePublished": "2026-10-14",
                "reviewBody": "Fast Waipahu warehouse pickup and expert Oahu window AC support. Qualified for the $45 Hawaii Energy rebate and cut our HECO bill immediately.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        ],
        "url": "https://www.affordablehome-ac.com",
        "telephone": "+1-808-488-1111",
        "priceRange": "$395 - $1,200",
        "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Oahu Window AC Services & In-Stock Replacements",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "$0 Free In-Home Window AC Estimate & Clean-vs-Replace Assessment (By Appointment First)"
                },
                "price": "0.00",
                "priceCurrency": "USD"
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Waipahu Warehouse Direct LG & GE Window AC Replacement Supply ($395–$1,200)",
                    "description": "Factory-sealed LG Dual Inverter & GE 26-inch Built-In Window ACs in stock in Waipahu for free pickup by appointment, $50 Oahu delivery, or custom installation."
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "395.00",
                    "maxPrice": "1200.00",
                    "priceCurrency": "USD"
                }
            }
        ]
    }
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
