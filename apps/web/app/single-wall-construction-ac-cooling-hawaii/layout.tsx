import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Single-Wall Home Window AC Sizing Hawaii ($0 Estimate) | LG & GE ACs'
    },
    description: '$0 Free Estimate • (808) 488-1111. Island Microclimate BTU sizing & jalousie installation for uninsulated Hawaii single-wall redwood homes. In-stock ACs $395+.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii',
    },
    openGraph: {
        title: 'Single-Wall Home Window AC Sizing Hawaii ($0 Estimate) | LG & GE ACs',
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
        title: 'Single-Wall Home Window AC Sizing Hawaii ($0 Estimate) | LG & GE ACs',
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

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii#service",
    "name": "Single-Wall Home AC Sizing & Cooling Hawaii ($0 Estimate)",
    "serviceType": "Single-Wall Home AC Sizing & Cooling Hawaii ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Island Microclimate BTU sizing & jalousie installation for uninsulated Hawaii single-wall redwood homes. In-stock ACs $395+.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/single-wall-construction-ac-cooling-hawaii#localbusiness",
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
