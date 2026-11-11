import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Won\'t Turn On Oahu ($0 Estimate) | LCDI Plug & Breaker Check'
    },
    description: '$0 Free Estimate • (808) 488-1111. Oahu Window AC dead with no power or lights? Check your LCDI reset plug & breaker, or book a $0 Clean-vs-Replace assessment.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
    },
    openGraph: {
        title: 'Window AC Won\'t Turn On Oahu ($0 Estimate) | LCDI Plug & Breaker Check',
        description: '$0 Free Estimate • (808) 488-1111. Oahu Window AC dead with no power or lights? Check your LCDI reset plug & breaker, or book a $0 Clean-vs-Replace assessment.',
        url: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'No Power to AC Unit Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Won\'t Turn On Oahu ($0 Estimate) | LCDI Plug & Breaker Check',
        description: '$0 Free Estimate • (808) 488-1111. Oahu Window AC dead with no power or lights? Check your LCDI reset plug & breaker, or book a $0 Clean-vs-Replace assessment.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const noPowerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my LG & GE window air conditioner completely dead with no display lights or sound?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When a window AC has zero power, the most common causes are a tripped LCDI safety button on the power cord plug head, a tripped circuit breaker in your electrical panel, or a blown low-voltage fuse on the internal control board."
            }
        },
        {
            "@type": "Question",
            "name": "How does the LCDI safety plug on my window AC cord work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "High-efficiency window units incorporate a Leakage Current Detection Interrupter (LCDI) on the plug head. If a power surge or cord damage occurs, the button pops out and cuts power immediately to prevent electrical hazards."
            }
        },
        {
            "@type": "Question",
            "name": "What should I do if the circuit breaker trips immediately when I reset it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never force a breaker to stay in the ON position or repeatedly reset it. An instantaneous trip signifies a hard direct short to ground in the compressor windings or an inverter power module failure."
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
            "name": "Dead Window AC No-Power Troubleshooting",
            "item": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii#service",
    "name": "Window AC Won't Turn On Oahu ($0 Estimate) | LCDI Plug & Breaker Check",
    "serviceType": "Window AC Won't Turn On Oahu ($0 Estimate) | LCDI Plug & Breaker Check",
    "url": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Oahu Window AC dead with no power or lights? Check your LCDI reset plug & breaker, or book a $0 Clean-vs-Replace assessment.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii#localbusiness",
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

export default function NoPowerAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(noPowerFaqSchema) }}
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
