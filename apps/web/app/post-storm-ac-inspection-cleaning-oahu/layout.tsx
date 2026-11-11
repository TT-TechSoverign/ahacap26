import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Post-Storm Window AC Inspection & Coil Wash Oahu ($0 Estimate)'
    },
    description: '$0 Free Estimate • (808) 488-1111. Post-storm Oahu Window AC inspection and freshwater coil wash to remove heavy salt spray, wind debris & moisture intrusion.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu',
    },
    openGraph: {
        title: 'Post-Storm Window AC Inspection & Coil Wash Oahu ($0 Estimate)',
        description: '$0 Free Estimate • (808) 488-1111. Post-storm Oahu Window AC inspection and freshwater coil wash to remove heavy salt spray, wind debris & moisture intrusion.',
        url: 'https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Post Storm AC Inspection Cleaning Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Post-Storm Window AC Inspection & Coil Wash Oahu ($0 Estimate)',
        description: '$0 Free Estimate • (808) 488-1111. Post-storm Oahu Window AC inspection and freshwater coil wash to remove heavy salt spray, wind debris & moisture intrusion.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
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
                "text": "It is best to turn off your AC at the breaker during severe tropical storms or hurricanes. Severe wind gusts can stall rear condenser fan blades while electrical voltage fluctuations and lightning surges can burn out sensitive inverter circuit boards."
            }
        },
        {
            "@type": "Question",
            "name": "What damage can a Kona storm cause to an AC condenser?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kona storms blow heavy southern marine salt spray, palm fronds, gravel, and standing water into rear condenser housings. This corrodes electrical terminals, clogs heat-exchange fins, and can jam the condenser fan motor."
            }
        },
        {
            "@type": "Question",
            "name": "What is included in a post-storm AC inspection by Affordable Home A/C?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We clear internal debris, flush wind-driven salt from coils, test the LCDI power cord and control relays, inspect window weather-seals, test electrical capacitor ratings, and run a full operational cycle for a $0 Free Estimate flat rate."
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
            "name": "Post-Storm & Kona Wind Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu#service",
    "name": "Post-Storm Window AC Inspection & Coil Wash Oahu ($0 Estimate)",
    "serviceType": "Post-Storm Window AC Inspection & Coil Wash Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Post-storm Oahu Window AC inspection and freshwater coil wash to remove heavy salt spray, wind debris & moisture intrusion.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/post-storm-ac-inspection-cleaning-oahu#localbusiness",
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
                    "@type": "Product",
                    "name": "In-Stock LG Dual Inverter & GE 26-Inch Built-In Window ACs ($395–$1,200)"
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

export default function PostStormInspectionLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(stormInspectionFaqSchema) }}
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
