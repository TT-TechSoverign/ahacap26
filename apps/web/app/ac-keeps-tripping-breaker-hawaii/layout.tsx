import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Tripping Breaker Oahu ($0 Estimate) | 115V Inverter Upgrades'
    },
    description: '$0 Free Estimate • (808) 488-1111. Window AC tripping your breaker on Oahu? Diagnose amp draw or upgrade to a low-amp 115V LG Dual Inverter ($560+, $45 Rebate).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii',
    },
    openGraph: {
        title: 'Window AC Tripping Breaker Oahu ($0 Estimate) | 115V Inverter Upgrades',
        description: '$0 Free Estimate • (808) 488-1111. Window AC tripping your breaker on Oahu? Diagnose amp draw or upgrade to a low-amp 115V LG Dual Inverter ($560+, $45 Rebate).',
        url: 'https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Tripping Breaker Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Tripping Breaker Oahu ($0 Estimate) | 115V Inverter Upgrades',
        description: '$0 Free Estimate • (808) 488-1111. Window AC tripping your breaker on Oahu? Diagnose amp draw or upgrade to a low-amp 115V LG Dual Inverter ($560+, $45 Rebate).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const breakerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why shouldn't I keep flipping the breaker back on?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A circuit breaker is a vital fire safety device designed to trip when electrical current exceeds the safe capacity of your home's wiring. If you repeatedly force the breaker on against a grounded compressor or dead short, the wires inside your walls overheat, melting insulation and creating a severe electrical arc flash or structural fire hazard."
            }
        },
        {
            "@type": "Question",
            "name": "How does a technician test for an electrical short?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians use calibrated digital multimeters and megohmmeters (meggers). We isolate the compressor terminals, measure resistance to ground (checking for infinite resistance), test capacitor microfarads against factory spec, and clamp the live electrical feed to monitor real-time amp draw."
            }
        },
        {
            "@type": "Question",
            "name": "How much does the diagnostic inspection cost?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide upfront diagnostic troubleshooting anywhere on Oahu. This includes electrical testing, troubleshooting the breaker and unit, and providing an upfront itemized recommendation with zero hidden surprise fees."
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
            "name": "Window AC Repair & Assessment",
            "item": "https://www.affordablehome-ac.com/ac-repair-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Tripping Breaker Troubleshooting",
            "item": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii#service",
    "name": "Window AC Tripping Breaker Oahu ($0 Estimate) | 115V Inverter Upgrades",
    "serviceType": "Window AC Tripping Breaker Oahu ($0 Estimate) | 115V Inverter Upgrades",
    "url": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Window AC tripping your breaker on Oahu? Diagnose amp draw or upgrade to a low-amp 115V LG Dual Inverter ($560+, $45 Rebate).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii#localbusiness",
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

export default function AcTrippingBreakerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breakerFaqSchema) }}
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
